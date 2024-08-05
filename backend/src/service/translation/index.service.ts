import { httpClient } from "../httpClient"
import { AxiosResponse } from "axios"

export class TranslationService {
  static translate = (text: string, fromLang = "en", toLang = "vi") => {
    let url = "/api/translation?"
    url += "text=" + encodeURI(text)
    url += `&fromLang=${fromLang}`
    url += `&toLang=${toLang}`

    return httpClient.get(url).then((res: AxiosResponse<string>) => {
      return res.data
    })
  }
}
