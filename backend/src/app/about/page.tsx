import { Logo } from "@/components/level1/Logo"
import Link from "next/link"
import { AboutUs } from "../(root)/about-us/components/AboutUs"
import { LoginButton } from "../page"

function Policy() {
  return (
    <div>
      <header className="w-full">
        <div className="px-4 md:px-8 py-4 flex items-center justify-between bg-white">
          <Link className="cursor-pointer" href={"/"}>
            <Logo />
          </Link>

          <div>
            <LoginButton />
          </div>
        </div>
      </header>
      <AboutUs />
    </div>
  )
}

export default Policy
