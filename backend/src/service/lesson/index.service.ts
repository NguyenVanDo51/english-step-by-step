import { ScenarioInterface } from "@/types/lesson/type"
import { httpClient } from "../httpClient"

export class LessonService {
  static get = () => {
    return httpClient.get("/api/lessons")
  }

  // a service to complete the lesson using firebase
  static completeLesson = (lessonId: ScenarioInterface["id"]) => {
    return httpClient.put("/api/lessons/completion", { lessonId })
  }

  static getLessonsCompleted = () => {
    return httpClient.get("/api/lessons/completion")
  }
}
