"use client"

import { create } from "zustand"

interface ISpeechStore {
  textSpeaking: string
  setTextSpeaking: (v: string) => void
}

export const useSpeech = create<ISpeechStore>((set) => ({
  textSpeaking: "",
  setTextSpeaking(v) {
    set({ textSpeaking: v })
  },
}))
