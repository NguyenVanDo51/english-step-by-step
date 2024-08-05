import { USER_TABLE } from "@/libs/table-name"
import { firestore } from "@/service/firestore"
import { randomUUID } from "crypto"
import { NextResponse } from "next/server"

export const POST = async (req: Request) => {
  const body = await req.json()
  const id = body.data.id ?? randomUUID()

  const user = convertKeysToCamelCase(body.data)

  try {
    switch (body.type) {
      case "user.created":
      case "user.updated":
        await firestore.collection(USER_TABLE).doc(id).set(user)
        break
      case "user.deleted":
        await firestore.collection(USER_TABLE).doc(id).delete()
      default:
        break
    }
    return new NextResponse("ok", { status: 200 })
  } catch (e: any) {
    return new Response(e, {
      status: 500,
    })
  }
}

const convertKeysToCamelCase: any = (obj: Record<string, any>) => {
  if (Array.isArray(obj)) {
    return obj.map((item) => convertKeysToCamelCase(item))
  } else if (obj !== null && typeof obj === "object") {
    return Object.keys(obj).reduce((acc: Record<string, any>, key) => {
      const camelCaseKey = key.replace(/_([a-z])/g, (match) =>
        match[1].toUpperCase()
      )
      acc[camelCaseKey] = convertKeysToCamelCase(obj[key])
      return acc
    }, {})
  }
  return obj
}
