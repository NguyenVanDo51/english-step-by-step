import { queryClient } from "@/app/Provider"
import { useSpeech } from "@/hooks/helpers/use-speech"
import { VoiceDefault, Voices } from "@/types/constants/voices"
import { ISetting } from "@/types/setting"

class Speaker {
  cancel = () => {
    useSpeech.getState().setTextSpeaking("")
    responsiveVoice.cancel()
  }

  speak = (text: string, options: ResponsiveVoiceOption = {}) => {
    const settings =
      queryClient.getQueryData<ISetting>(["settings"]) ?? ({} as ISetting)
    const voicename = settings?.voice ? Voices[settings.voice] : VoiceDefault
    const { speed } = settings

    try {
      SpeakerService.cancel()
      responsiveVoice.speak(text, voicename, {
        ...options,
        rate: speed || 1,
        onstart: () => {
          useSpeech.getState().setTextSpeaking(text)
        },
        onend: () => {
          useSpeech.getState().setTextSpeaking("")
          options?.onend?.()
        },
      })
    } catch (e) {
      console.log(e)
      options?.onend?.()
    }
  }

  speakFree = (text: string, voice: string = VoiceDefault) => {
    responsiveVoice.speak(text, voice)
  }
}

export const SpeakerService = new Speaker()
