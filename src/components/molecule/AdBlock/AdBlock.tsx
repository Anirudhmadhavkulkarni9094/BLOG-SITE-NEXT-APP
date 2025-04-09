import React from "react"

type AdBlockProps = {
  type: "horizontal" | "vertical" | "square"
  src?: string // Optional custom image
}

export default function AdBlock({ type, src }: AdBlockProps) {
  const base = "rounded-lg border bg-gray-100 flex items-center justify-center overflow-hidden shadow-sm"

  const dimensions = {
    horizontal: "w-full h-28 md:h-32",       // 728x90 or 970x90
    vertical: "w-32 md:w-48 h-96",           // 160x600 or 300x600
    square: "w-60 h-60 md:w-72 md:h-72",     // 300x250 or 336x280
  }

  return (
    <div className={`${base} ${dimensions[type]}`}>
      {src ? (
        <img src={src} alt="Ad" className="object-cover w-full h-full" />
      ) : (
        <span className="text-sm text-gray-500">Your Ad Here</span>
      )}
    </div>
  )
}
