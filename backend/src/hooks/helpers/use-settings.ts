"use client"
import { httpClient } from "@/service/httpClient"
import { ISetting, initialSettingState } from "@/types/setting"
import { useMutation, useQuery } from "@tanstack/react-query"
import { useEffect, useState } from "react"

export const useSettings = () => {
  const [settings, setSettings] = useState<ISetting>({} as ISetting)
  const { data, refetch, isFetching } = useQuery<ISetting>({
    queryKey: ["settings"],
    queryFn: () => httpClient.get("/api/user/settings").then((r) => r.data),
  })

  const { mutate: mutateSetting, isPending } = useMutation({
    mutationFn: (payload: ISetting) =>
      httpClient.post("/api/user/settings", payload),
  })

  useEffect(() => {
    if (!data) return
    setSettings(data ?? initialSettingState)
  }, [data])

  return {
    settings,
    setSettings: (s: ISetting) => {
      mutateSetting(s)
      setSettings(s)
    },
    isLoading: isFetching || isPending,
  }
}
