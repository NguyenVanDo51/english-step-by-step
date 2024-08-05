import { Logo } from "./Logo"
import { AppSpin } from "./antd/AppSpin"

export const LoadingScreen = ({
  fullScreen,
  noLogo = false,
}: {
  fullScreen?: boolean
  noLogo?: boolean
}) => {
  return (
    <div
      className={`flex gap-3 items-center justify-center ${
        fullScreen
          ? "w-[100vw] h-[100vh] fixed top-0 left-0 z-50 bg-white"
          : "w-full h-full min-h-[4rem]"
      } `}
    >
      {!noLogo && <Logo />} <AppSpin />
    </div>
  )
}
