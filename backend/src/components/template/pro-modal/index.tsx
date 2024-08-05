"use client"

import { AppModal } from "@/components/level1/antd/AppModal"
import { AppNotifycation } from "@/components/level1/antd/AppNotification"
import { useProModal } from "@/hooks/helpers/use-pro-modal"
import axios from "axios"
import { useState } from "react"

export const ProModal = () => {
  const { isOpen, onClose } = useProModal()
  const [loading, setLoading] = useState(false)

  const onSubscribe = async () => {
    try {
      setLoading(true)
      const response = await axios.get("/api/stripe")

      window.location.href = response.data.url
    } catch (error) {
      AppNotifycation.error({ message: "Something went wrong" })
    } finally {
      setLoading(false)
    }
  }

  return (
    <AppModal
      open={isOpen}
      onCancel={onClose}
      title="Upgrade to Pro"
      okText="Subscribe"
      onOk={onSubscribe}
      okButtonProps={{
        loading: loading,
      }}
      cancelButtonProps={{ disabled: loading }}
    >
      <p className="text-2xl font-medium">
        $4<span className="text-sm font-normal">.99 / mo</span>
      </p>
    </AppModal>
  )
}
