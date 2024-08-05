import { useSpeech } from "@/hooks/helpers/use-speech"
import { SpeakerService } from "@/service/speaker"
import { useEffect, useMemo } from "react"
import { v4 as uuidv4 } from "uuid"
interface IProps {
  text: string
}

export interface IAudioPlayerRef {
  startSpeak: () => void
}

export const AudioPlayer = ({ text }: IProps) => {
  const { textSpeaking } = useSpeech()
  const isPlaying = useMemo(() => text === textSpeaking, [textSpeaking, text])

  const onClick = () => {
    if (isPlaying) {
      SpeakerService.cancel()
    } else {
      SpeakerService.speak(text)
    }
  }

  useEffect(() => {
    // SpeakerService.speak(text)

    return () => SpeakerService.cancel()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const id = useMemo(() => uuidv4(), [])
  const waveLength = Math.floor(text?.length / 1.5) || 1

  return (
    <div
      className="flex gap-3 items-center cursor-pointer overflow-hidden"
      onClick={onClick}
    >
      <span className="cursor-pointer inline-block w-3 text-[#594ead]">
        {isPlaying ? (
          <i className="fa-solid fa-pause"></i>
        ) : (
          <i className="fa-solid fa-play"></i>
        )}
      </span>

      <div className={`sound-wave ${isPlaying ? "playing" : ""}`}>
        {new Array(waveLength >= 50 ? 50 : waveLength)
          .fill(null)
          .map((_, index) => (
            <span key={`node_${id}_${index}`} className="sound-wave-bar"></span>
          ))}
      </div>
    </div>
  )
}
