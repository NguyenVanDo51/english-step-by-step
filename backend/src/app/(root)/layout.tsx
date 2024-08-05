import { Logo } from "@/components/level1/Logo"
import { auth, currentUser, redirectToSignIn, UserButton } from "@clerk/nextjs"
import Link from "next/link"
import { SidebarClient } from "./components/SidebarClient"
import { checkSubscription } from "@/libs/stripe"

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const user = await currentUser()

  if (!user?.id) {
    return redirectToSignIn()
  }

  const isPro = await checkSubscription()

  return (
    <>
      <div className="bg-white h-fit min-h-full">
        <header className="py-1 px-3 sm:px-6 border-b h-12 flex justify-between items-center sticky top-0 bg-white z-50">
          <div className="flex gap-6 items-center">
            <span className="inline-flex items-center gap-2">
              <UserButton />
            </span>
          </div>
        </header>

        <main className="p-4">{children}</main>
      </div>
    </>
  )
}
