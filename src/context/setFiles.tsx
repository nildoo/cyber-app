import React, { useState } from 'react'
import { createContext } from 'react'

type FilesProviderProps = {
  children: React.ReactNode
}

export type Files = {
  __typename?: 'File' | undefined
  url: string
  thumb: string
  title: string
  approved: boolean
}

type FilesContextType = {
  images: Files[] | undefined
  videos: Files[] | undefined
  signature: Files[]
  setImages: (images: Files[]) => void
  setVideos: (videos: Files[] | undefined) => void
  setSignature: (signature: any) => void
  setCampingId: (data: string) => void
  setCount: (data: number) => void
  count: number
  campingId: string
}

export const FilesContext = createContext({} as FilesContextType)

export function FilesProvider({ children }: FilesProviderProps) {
  const [images, setImages] = useState<Files[] | undefined>()
  const [videos, setVideos] = useState<Files[] | undefined>()
  const [signature, setSignature] = useState<Files[]>([])
  const [campingId, setCampingId] = useState('')
  const [count, setCount] = useState(0)

  return (
    <FilesContext.Provider
      value={{
        campingId,
        images,
        videos,
        signature,
        count,
        setCount,
        setCampingId,
        setImages,
        setVideos,
        setSignature,
      }}>
      {children}
    </FilesContext.Provider>
  )
}
