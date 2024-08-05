import { firestore } from "@/service/firestore"
import { NextRequest, NextResponse } from "next/server"
import { currentUser } from "@clerk/nextjs/server"
import { initialSettingState } from "@/types/setting"
import { SETTING_TABLE } from "@/libs/table-name"

export async function POST(req: NextRequest) {
  const user = await currentUser()
  if (!user) {
    return new Response("unauthenticated", { status: 401 })
  }
  const payload = await req.json()
  try {
    await firestore.collection(SETTING_TABLE).doc(user.id).set(payload)
    return new NextResponse("1")
  } catch (e) {
    return NextResponse.json(e)
  }
}

export async function GET() {
  const user = await currentUser()
  if (!user) {
    return new Response("unauthenticated", { status: 401 })
  }

  try {
    const data = await firestore.collection(SETTING_TABLE).doc(user.id).get()

    if (data.data()) {
      return NextResponse.json(data.data())
    }

    await firestore
      .collection(SETTING_TABLE)
      .doc(user.id)
      .create(initialSettingState)

    return NextResponse.json(initialSettingState)
  } catch (e) {
    return NextResponse.json(e)
  }
}
