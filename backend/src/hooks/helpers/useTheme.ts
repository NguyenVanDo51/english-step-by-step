import { ISetting } from "@/types/setting"
import { useEffect } from "react"

export const useTheme = () => {
  const theme = ""

  const setTheme = (theme: ISetting["theme"]) => {}

  useEffect(() => {
    localStorage.theme = theme
  }, [theme])

  return { theme, setTheme }
}
