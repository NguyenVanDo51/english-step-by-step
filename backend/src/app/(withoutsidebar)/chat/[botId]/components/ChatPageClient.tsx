"use client"
import AIChat from "@/components/template/chat"
import { ScenarioInterface } from "@/types/lesson/type"

export const ChatPageClient = ({ bot }: { bot: ScenarioInterface }) => {
  return <AIChat lesson={bot} />
}
