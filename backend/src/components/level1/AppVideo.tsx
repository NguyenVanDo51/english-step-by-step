"use client"

import { RefObject, useCallback, useEffect, useRef, useState } from 'react'
import ReactPlayer, { ReactPlayerProps } from 'react-player'

interface IProps extends ReactPlayerProps {}

export const AppVideo: React.FC<IProps> = ({ ...props }) => {
  const [playing, setPlaying] = useState(false)
  const videoRef: RefObject<any> = useRef()

  const addShortKey = useCallback(
    (e: KeyboardEvent) => {
      if (e.ctrlKey && e.code === 'Space') {
        e.stopPropagation()
        e.preventDefault()
        setPlaying(!playing)
      }
      const currentTime = videoRef.current?.getCurrentTime()
      if (e.ctrlKey && e.code === 'ArrowRight') {
        e.stopPropagation()
        e.preventDefault()
        videoRef.current?.seekTo(currentTime + 5)
      }

      if (e.ctrlKey && e.code === 'ArrowLeft') {
        e.stopPropagation()
        e.preventDefault()
        videoRef.current?.seekTo(currentTime > 6 ? currentTime - 5 : 0)
      }
    },
    [playing]
  )

  useEffect(() => {
    window.removeEventListener('keydown', addShortKey)
    window.addEventListener('keydown', addShortKey)

    return () => window.removeEventListener('keydown', addShortKey)
  }, [addShortKey, playing])

  return (
    <ReactPlayer
      ref={videoRef}
      playing={playing}
      onPlay={() => {
        setPlaying(true)
      }}
      width="100%"
      height="100%"
      allowFullScreen
      {...props}
      controls={true}
    />
  )
}
