import { firestore } from "@/service/firestore"
import { NextResponse } from "next/server"
import { TABLE_NAME } from "../../constants"

export const GET = async (
  req: Request,
  { params }: { params: { id: string } }
) => {
  try {
    const result = await firestore
      .collection(TABLE_NAME.LESSONS)
      .doc(params.id)
      .get()
      .then((res) => res.data())
    return NextResponse.json(result)
  } catch (e: any) {
    return new Response(e, {
      status: 500,
    })
  }
}

export const DELETE = async (
  req: Request,
  { params }: { params: { id: string } }
) => {
  try {
    const result = await firestore
      .collection(TABLE_NAME.LESSONS)
      .doc(params.id)
      .delete()

    return NextResponse.json(result)
  } catch (e: any) {
    return new Response(e, { status: 500 })
  }
}

export const PUT = async (
  req: Request,
  { params }: { params: { id: string } }
) => {
  const body = await req.json()
  try {
    const doc = await firestore.collection(TABLE_NAME.LESSONS).doc(params.id)
    const data = await doc.get()

    let result = await doc.set({
      ...data.data(),
      ...body,
    })

    return NextResponse.json(result)
  } catch (e: any) {
    return new Response(e, {
      status: 500,
    })
  }
}
