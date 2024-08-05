import { SITUATION_TABLE } from "@/libs/table-name"
import { firestore } from "@/service/firestore"
import { ScenarioInterface } from "@/types/lesson/type"
import { currentUser } from "@clerk/nextjs"
import { NextResponse } from "next/server"

export const GET = async () => {
  try {
    const user = await currentUser()
    const result = await firestore
      .collection(SITUATION_TABLE)
      .where("createdBy", "==", user?.id)
      .orderBy("createdAt", "desc")
      .get()

    const bots: ScenarioInterface[] = []
    result?.forEach((b) => {
      bots.push(JSON.parse(JSON.stringify(b.data())) as ScenarioInterface)
    })
    return NextResponse.json(bots)
  } catch (e: any) {
    return new Response(e, {
      status: 500,
    })
  }
}
