"use client"

import { AppButton } from "@/components/level1/antd/AppButton"
import { useProModal } from "@/hooks/helpers/use-pro-modal"

export const UpgradeButton = () => {
  const proModal = useProModal()

  return <AppButton onClick={() => proModal.onOpen()}>Upgrade to Pro</AppButton>
}
