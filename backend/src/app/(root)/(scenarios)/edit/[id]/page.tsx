import { SITUATION_TABLE, USER_TABLE } from "@/libs/table-name"
import { firestore } from "@/service/firestore"
import { ScenarioInterface } from "@/types/lesson/type"
import { User } from "@clerk/nextjs/server"
import { DocumentData } from "firebase-admin/firestore"
import { redirect } from "next/navigation"
import { CreateScenario } from "@/components/template/create-scenario"
import dayjs from "dayjs"

const getBotById = async (id: string) => {
  return await firestore
    .collection(SITUATION_TABLE)
    .doc(id)
    .get()
    .then(async (docSnaps: DocumentData) => {
      const bot: ScenarioInterface | undefined = docSnaps.data()
      if (!bot) return
      bot.createdAt = dayjs(bot.createdAt).valueOf()

      bot.author = (await firestore
        .collection(USER_TABLE)
        .doc(bot.createdBy)
        .get()
        .then((r) => {
          return r.data()
        })) as User

      return bot
    })
}

export default async function Edit(req: { params: { id: string } }) {
  const scenario = await getBotById(req.params.id)

  if (!scenario) redirect("/home")
  return <CreateScenario scenario={scenario} />
}
