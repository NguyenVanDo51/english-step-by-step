'use client'

import { SpeakerService } from '@/service/speaker'

let audio: any = null

if (typeof SpeechSynthesisUtterance !== 'undefined') audio = new SpeechSynthesisUtterance()
let speeding = false

export const speak = (phrase: string, isVocabulary: boolean = true) => {
  if (speeding) return
  SpeakerService.speak(phrase)
}
