// LogoUploader.tsx
import React, { useCallback, useRef, useState } from "react"

type Props = {
  value?: string | null // data URL of current logo
  onChange: (dataUrl: string | null) => void // emits data URL or null
  maxSizeMB?: number // default 2MB
  squareSize?: number // default 512px square
}

export function LogoUploader({
  value = null,
  onChange,
  maxSizeMB = 2,
  squareSize = 512,
}: Props) {
  const [dragOver, setDragOver] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleFiles = useCallback(
    async (files: FileList | null) => {
      if (!files || !files[0]) return
      setError(null)

      const file = files[0]
      if (!file.type.startsWith("image/")) {
        setError("Only image files are allowed.")
        return
      }
      if (file.size > maxSizeMB * 1024 * 1024) {
        setError(`Max file size is ${maxSizeMB}MB.`)
        return
      }

      const dataUrl = await fileToDataURL(file)
      const squared = await toSquarePNG(dataUrl, squareSize) // keeps aspect, pads with white
      onChange(squared)
    },
    [maxSizeMB, onChange, squareSize]
  )

  const onDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      e.stopPropagation()
      setDragOver(false)
      handleFiles(e.dataTransfer.files)
    },
    [handleFiles]
  )

  return (
    <div className="w-full">
      <div
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => {
          e.preventDefault()
          e.stopPropagation()
          setDragOver(true)
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={onDrop}
        role="button"
        tabIndex={0}
        onKeyDown={(e) =>
          e.key === "Enter" ? inputRef.current?.click() : null
        }
        className={[
          "relative flex flex-col items-center justify-center rounded-2xl border p-6 text-center cursor-pointer",
          "transition focus:outline-none focus:ring-2 focus:ring-offset-2",
          dragOver
            ? "border-black ring-2 ring-black"
            : "border-dashed border-gray-300 hover:border-gray-400",
        ].join(" ")}
      >
        {value ? (
          <div className="flex flex-col items-center gap-3">
            <img
              src={value}
              alt="Logo preview"
              className="h-28 w-28 rounded-xl object-contain bg-white"
            />
            <div className="flex gap-2">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation()
                  inputRef.current?.click()
                }}
                className="rounded-xl px-3 py-2 border"
              >
                Replace
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation()
                  onChange(null)
                }}
                className="rounded-xl px-3 py-2 border"
              >
                Remove
              </button>
            </div>
          </div>
        ) : (
          <>
            <svg
              aria-hidden
              viewBox="0 0 24 24"
              className="mb-3 h-8 w-8"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path d="M12 16V8m0 0-3 3m3-3 3 3M4 16.5V19a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-2.5" />
              <path d="M20 12a8 8 0 1 0-16 0" />
            </svg>
            <p className="text-sm">
              <span className="font-medium">Click to upload </span> or drag and
              drop LOGO
            </p>
            <p className="text-xs text-gray-500 mt-1">
              PNG/JPG/SVG, up to {maxSizeMB}MB. Auto-squared to {squareSize}px
              for QR logos.
            </p>
          </>
        )}
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => handleFiles(e.target.files)}
        />
      </div>

      {error && <p className="mt-2 text-sm text-red-600">{error}</p>}

      {value && (
        <details className="mt-3 text-sm">
          <summary className="cursor-pointer">Data URL</summary>
          <textarea
            readOnly
            className="mt-2 w-full rounded-xl border p-2 text-xs"
            rows={4}
            value={value}
          />
        </details>
      )}
    </div>
  )
}

/* utils */
async function fileToDataURL(file: File): Promise<string> {
  return new Promise((res, rej) => {
    const fr = new FileReader()
    fr.onerror = () => rej(new Error("Failed to read file"))
    fr.onload = () => res(String(fr.result))
    fr.readAsDataURL(file)
  })
}

// Draw into a square canvas with white padding. Returns PNG data URL.
async function toSquarePNG(srcDataUrl: string, size: number): Promise<string> {
  const img = await loadImage(srcDataUrl)
  const canvas = document.createElement("canvas")
  canvas.width = size
  canvas.height = size
  const ctx = canvas.getContext("2d")!
  ctx.fillStyle = "#fff"
  ctx.fillRect(0, 0, size, size)

  // fit image into square, preserving aspect ratio
  const scale = Math.min(size / img.width, size / img.height)
  const w = Math.round(img.width * scale)
  const h = Math.round(img.height * scale)
  const x = Math.round((size - w) / 2)
  const y = Math.round((size - h) / 2)
  ctx.drawImage(img, x, y, w, h)

  return canvas.toDataURL("image/png") // safe for QR overlay
}

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((res, rej) => {
    const img = new Image()
    img.onload = () => res(img)
    img.onerror = () => rej(new Error("Failed to load image"))
    img.src = src
  })
}
