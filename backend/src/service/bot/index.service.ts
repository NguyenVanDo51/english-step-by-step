import { httpClient } from "../httpClient"
import { AxiosResponse } from "axios"
import { ScenarioInterface } from "@/types/lesson/type"

export class BotService {
  static create = (payload: Omit<ScenarioInterface, "id">) => {
    return httpClient.post("/api/situations", payload)
  }
  static get = (params?: {
    offset?: number
    limit?: number
    tag?: string
    name?: string
  }) => {
    return httpClient.get("/api/situations", { params })
  }
  static delete = (id: string) => {
    return httpClient.delete("/api/situations/" + id)
  }
}
