import { auth, redirectToSignIn } from "@clerk/nextjs"
import ExploreBotClient from "./components/ExploreClient"

export default function Page() {
  const { userId } = auth()

  if (!userId) {
    return redirectToSignIn()
  }

  return <ExploreBotClient />
}
