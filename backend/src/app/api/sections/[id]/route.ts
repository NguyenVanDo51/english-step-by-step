import { firestore } from "@/service/firestore"
import { NextResponse } from "next/server"
import { TABLE_NAME } from "../../constants"

export const GET = async (
  req: Request,
  { params }: { params: { id: string } }
) => {
  try {
    const result = await firestore
      .collection(TABLE_NAME.SECTIONS)
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
      .collection(TABLE_NAME.SECTIONS)
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
    const doc = await firestore.collection(TABLE_NAME.SECTIONS).doc(params.id)

    let result = await doc.set(body)

    return NextResponse.json(result)
  } catch (e: any) {
    return new Response(e, {
      status: 500,
    })
  }
}
