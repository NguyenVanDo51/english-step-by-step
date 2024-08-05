import { firestore } from "@/service/firestore"
import { CollectionReference } from "firebase-admin/firestore"
import { NextRequest, NextResponse } from "next/server"
import { TABLE_NAME } from "../constants"
import { Section } from "@/types/sections"

export const GET = async (req: NextRequest) => {
  const url = new URL(req.url)
  const searchParams = new URLSearchParams(url.search)
  const title = searchParams.get("title")?.trim() ?? ""

  try {
    let ref = firestore.collection(TABLE_NAME.SECTIONS)

    if (title) {
      ref = ref
        .where("title", ">=", title)
        .where("title", "<=", title + "\uf8ff")
        .orderBy("title", "asc") as CollectionReference<Section>
    }

    const result = await ref
      .orderBy("createdAt", "asc")
      .get()
      .then((docSnapshot) => {
        const d: Section[] = []
        docSnapshot.forEach((doc) => {
          d.push({
            id: doc.id,
            ...doc.data(),
          } as Section)
        })
        return d
      })
    return NextResponse.json(result)
  } catch (e: any) {
    return new Response(e, {
      status: 500,
    })
  }
}

export const POST = async (req: Request) => {
  const body = await req.json()
  if (!body.title) {
    return new Response("missing section title", {
      status: 400,
    })
  }

  try {
    const doc = await firestore.collection(TABLE_NAME.SECTIONS).add({
      title: body.title,
      createdAt: new Date().valueOf(),
    })

    console.log("doc.id", doc.id)

    return NextResponse.json({ message: "OK" })
  } catch (e: any) {
    return new Response(e, {
      status: 500,
    })
  }
}
