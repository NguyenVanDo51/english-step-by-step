"use client"
import { Logo } from "@/components/level1/Logo"
import { useSettings } from "@/hooks/helpers/use-settings"
import { Drawer } from "antd"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"

export const SidebarClient = ({ mobile }: { mobile?: boolean }) => {
  const pathname = usePathname()

  const [isOpen, setIsOpen] = useState(false)

  const menuItems = [
    {
      key: "/home",
      label: "Home",
      icon: <i className="fa-regular fa-house"></i>,
    },
    {
      key: "/explore",
      label: "Explore",
      icon: <i className="fa-regular fa-magnifying-glass"></i>,
    },
    {
      key: "/create",
      label: "Create",
      icon: <i className="fa-regular fa-plus"></i>,
    },
    {
      key: "/settings",
      label: "Settings",
      icon: <i className="fa-regular fa-gear"></i>,
    },
    {
      key: "/about-us",
      label: "About",
      icon: <i className="fa-regular fa-square-info"></i>,
    },
  ]

  useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  const menu = (
    <ul className="space-y-1 sm:space-y-2">
      {menuItems.map(({ key, icon, label }) => {
        return (
          <li key={key}>
            <Link
              href={key}
              className={`flex sm:flex-col items-center gap-1 px-2 sm:px-0 py-2 rounded sm:rounded-lg dark:text-white hover:bg-[#00000015] dark:hover:bg-gray-700 hover:font-medium group ${
                pathname === key ? "!bg-[#00000015] font-medium" : ""
              }`}
            >
              <span>{icon}</span>
              <span className="text-xs">{label}</span>
            </Link>
          </li>
        )
      })}
    </ul>
  )

  return (
    <>
      <button
        type="button"
        className="inline-flex items-center p-2 text-base rounded sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
        onClick={() => setIsOpen(true)}
      >
        <i className="fa-regular fa-bars"></i>
      </button>

      <Drawer
        placement="left"
        closable={false}
        onClose={() => setIsOpen(false)}
        width={350}
        open={isOpen}
      >
        <Logo />
        <div className="mt-3">{menu}</div>
      </Drawer>

      {!mobile && menu}
    </>
  )
}
