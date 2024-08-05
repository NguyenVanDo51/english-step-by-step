import { firestore } from "@/service/firestore"
import { NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  const payload = request.json()
  try {
    const res = await firestore.collection("feedbacks").add(payload)
    return new NextResponse(res.id)
  } catch (e) {
    return NextResponse.json(e)
  }
}
