import { absoluteUrl } from "@/libs/helpers/utils"
import { stripe } from "@/libs/stripe"
import { firestore } from "@/service/firestore"
import { auth, currentUser } from "@clerk/nextjs"
import { NextResponse } from "next/server"

const settingsUrl = absoluteUrl("/home")

export async function GET() {
  try {
    const { userId } = auth()
    const user = await currentUser()

    if (!userId || !user) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    const userSubscription = await firestore
      .collection("subscriptions")
      .doc(userId)
      .get()
      .then((r) => r.data())

    if (userSubscription && userSubscription.stripeCustomerId) {
      const stripeSession = await stripe.billingPortal.sessions.create({
        customer: userSubscription.stripeCustomerId,
        return_url: settingsUrl,
      })

      return new NextResponse(JSON.stringify({ url: stripeSession.url }))
    }

    const stripeSession = await stripe.checkout.sessions.create({
      success_url: settingsUrl,
      cancel_url: settingsUrl,
      payment_method_types: ["card"],
      mode: "subscription",
      billing_address_collection: "auto",
      customer_email: user.emailAddresses[0].emailAddress,
      line_items: [
        {
          price_data: {
            currency: "USD",
            product_data: {
              name: "Talk4learn Pro",
              description: "Talk4learn Pro",
            },
            unit_amount: 499,
            recurring: {
              interval: "month",
            },
          },
          quantity: 1,
        },
      ],
      metadata: {
        userId,
      },
    })

    return new NextResponse(JSON.stringify({ url: stripeSession.url }))
  } catch (error) {
    console.log("[STRIPE]", error)
    return new NextResponse("Internal Error", { status: 500 })
  }
}
