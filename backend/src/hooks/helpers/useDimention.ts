'use client'

import { useEffect, useState } from 'react'

export const useDimention = () => {
  const [width, setWidth] = useState<number>(1280)

  useEffect(() => {
    setWidth(window.innerWidth)

    window.addEventListener('resize', (e: any) => {
      setWidth((e.currentTarget as Window).innerWidth)
    })
  }, [])

  return { isMobile: width < 1024, isDesktop: width >= 1024 }
}
