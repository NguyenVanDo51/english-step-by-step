import { firestore } from "@/service/firestore"
import { auth } from "@clerk/nextjs"
import Stripe from "stripe"
import { SUBSCRIPTION_TABLE } from "./table-name"
import { Timestamp } from "firebase-admin/firestore"

const DAY_IN_MS = 86_400_000

export const stripe = new Stripe(process.env.STRIPE_API_KEY!, {
  apiVersion: "2023-10-16",
  typescript: true,
})

export const checkSubscription = async () => {
  const { userId } = auth()

  if (!userId) {
    return false
  }

  const userSubscription = await firestore
    .collection(SUBSCRIPTION_TABLE)
    .doc(userId)
    .get()
    .then((r) => r.data())

  if (!userSubscription) {
    return false
  }

  const isValid =
    userSubscription.stripePriceId &&
    (userSubscription.stripeCurrentPeriodEnd as Timestamp)?.toDate().valueOf() >
      Date.now()

  return !!isValid
}
