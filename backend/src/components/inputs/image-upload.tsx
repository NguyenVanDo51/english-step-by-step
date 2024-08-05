"use client"

import Image from "next/image"
import { CldUploadButton, CldUploadWidgetResults } from "next-cloudinary"
import { useMounted } from "@/hooks/helpers/use-mounted"

interface ImageUploadProps {
  value: string
  onChange: (src: string) => void
}

export const ImageUpload = ({ value, onChange }: ImageUploadProps) => {
  const isMounted = useMounted()

  if (!isMounted) {
    return false
  }

  return (
    <div className="space-y-4 w-full flex flex-col justify-center items-center">
      <CldUploadButton
        options={{ maxFiles: 1 }}
        onUpload={(result: any) =>
          onChange(
            (result.info?.secure_url as string).replace(
              "/upload",
              "/upload/w_100,f_auto,q_auto"
            )
          )
        }
        uploadPreset="fzznci3y"
      >
        <div
          className="
            p-2 
            border-2
            border-dashed
            border-primary/10 
            rounded-lg 
            hover:opacity-75 
            transition 
            flex 
            flex-col 
            space-y-2 
            items-center 
            justify-center
          "
        >
          <div className="relative h-24 w-24">
            <Image
              fill
              alt="Upload"
              src={value}
              className="rounded-lg object-cover"
            />
          </div>
        </div>
      </CldUploadButton>
    </div>
  )
}
