"use client"

import { useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { QrCode, Barcode, Text, Wifi, Lock } from "lucide-react"
import { QRCode as QRCodeWithLogo } from "react-qrcode-logo"
import { LogoUploader } from "./logo-uploader"
import { triggerDownload } from "@/utils/ExportUtils"
import { PDFDocument } from "pdf-lib"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

type QRHandle = {
  download: (t?: "png" | "jpg" | "webp", name?: string) => void
}

export function QRGenerator() {
  const [generatorType, setGeneratorType] = useState<"qr" | "barcode">("qr")
  const [sizeValue, setSizeValue] = useState("")
  const [fileType, setFileType] = useState<"png" | "svg" | "pdf">("png")
  const [qr_value, setQr_Value] = useState("Scan free")
  const [wifi, setWifi] = useState({ name: "", password: "" })
  const [logo, setLogo] = useState<string | null>(null)
  const ref = useRef<QRHandle>(null)
  const id = "qr-main"

  async function onDownload(fmt: "png" | "svg" | "pdf") {
    if (fmt === "png") return ref.current?.download("png", "qr-code") // built-in

    const canvas = document.getElementById(id) as HTMLCanvasElement
    const { width: w, height: h } = canvas
    const dataUrl = canvas.toDataURL("image/png") // requires enableCORS if logo is remote

    if (fmt === "svg") {
      // raster wrapped in SVG
      const svg =
        `<?xml version="1.0"?>` +
        `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">` +
        `<rect width="100%" height="100%" fill="white"/>` +
        `<image href="${dataUrl}" width="${w}" height="${h}"/>` +
        `</svg>`
      triggerDownload(new Blob([svg], { type: "image/svg+xml" }), "qr-code.svg")
      return
    }

    // PDF
    const pngBytes = new Uint8Array(await (await fetch(dataUrl)).arrayBuffer())
    const pdf = await PDFDocument.create()
    const img = await pdf.embedPng(pngBytes)
    const page = pdf.addPage([img.width, img.height])
    page.drawImage(img, { x: 0, y: 0, width: img.width, height: img.height })
    const pdfBytes = await pdf.save()
    triggerDownload(
      new Blob([pdfBytes as any], { type: "application/pdf" }),
      "qr-code.pdf"
    )
  }

  return (
    <section className="py-16 bg-muted/30">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-4 flex gap-2 h-[50px] max-w-[500px] mb-5">
          <button
            onClick={() => setGeneratorType("qr")}
            className={`w-full h-[50px] flex items-center space-x-3 p-4 border rounded-lg transition-colors ${
              generatorType === "qr"
                ? "border-blue-500 bg-blue-50 dark:bg-blue-950"
                : "border-border hover:border-blue-300"
            }`}
          >
            <div
              className={`w-6 h-6 border-2 rounded ${
                generatorType === "qr"
                  ? "border-blue-500 bg-blue-500"
                  : "border-muted-foreground"
              }`}
            >
              {generatorType === "qr" && (
                <div className="w-full h-full flex items-center justify-center">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
              )}
            </div>
            <div className="flex items-center space-x-2">
              <QrCode className="h-5 w-5 text-muted-foreground" />
              <span className="font-medium text-foreground">QRcode</span>
            </div>
          </button>

          <button
            onClick={() => setGeneratorType("barcode")}
            className={`w-full h-[50px] flex items-center space-x-3 p-4 border rounded-lg transition-colors ${
              generatorType === "barcode"
                ? "border-blue-500 bg-blue-50 dark:bg-blue-950"
                : "border-border hover:border-blue-300"
            }`}
          >
            <div
              className={`w-6 h-6 border-2 rounded ${
                generatorType === "barcode"
                  ? "border-blue-500 bg-blue-500"
                  : "border-muted-foreground"
              }`}
            >
              {generatorType === "barcode" && (
                <div className="w-full h-full flex items-center justify-center">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
              )}
            </div>
            <div className="flex items-center space-x-2">
              <Barcode className="h-5 w-5 text-muted-foreground" />
              <span className="font-medium text-foreground">Barcode</span>
            </div>
          </button>
        </div>
        <h2 className="text-3xl font-bold text-foreground mb-5">
          {generatorType === "qr" ? "QR Code Generator" : "Barcode Generator"}
        </h2>
        <div className="space-y-8 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center ">
            <div className="lg:col-span-2 space-y-6">
              <Tabs
                defaultValue="text"
                className="w-full"
                onChange={() => setWifi({ name: "", password: "" })}
              >
                <TabsList>
                  <TabsTrigger value="text">Text or website</TabsTrigger>
                  <TabsTrigger value="wifi">WiFi</TabsTrigger>
                  <TabsTrigger value="geo">Geo Location</TabsTrigger>
                  <TabsTrigger value="phone">Phone</TabsTrigger>
                  <TabsTrigger value="email">Email</TabsTrigger>
                </TabsList>
                <TabsContent value="text">
                  {/* Left Column - Form */}
                  <div className="">
                    {/* Search Input */}
                    <div className="relative">
                      <Text className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
                      <Input
                        placeholder="Enter your text or website"
                        className="pl-10 h-12 text-lg"
                        onChange={(e) => setQr_Value(e.target.value)}
                      />
                    </div>
                  </div>

                  {/* Right Column - Format Options */}
                </TabsContent>
                <TabsContent value="wifi">
                  <div className="flex items-center gap-3">
                    {/* Search Input */}
                    <div className="relative w-full">
                      <Wifi className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
                      <Input
                        placeholder="WiFi name"
                        className="pl-10 h-12 text-lg w-full"
                        onChange={(e) =>
                          setWifi((prev) => ({ ...prev, name: e.target.value }))
                        }
                      />
                    </div>
                    <div className="relative w-full">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
                      <Input
                        placeholder="WiFi password"
                        className="pl-10 h-12 text-lg w-full"
                        onChange={(e) =>
                          setWifi((prev) => ({
                            ...prev,
                            password: e.target.value,
                          }))
                        }
                      />
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="geo"></TabsContent>
                <TabsContent value="phone"></TabsContent>
                <TabsContent value="email"></TabsContent>
              </Tabs>
              <div className="space-y-2">
                <LogoUploader value={logo} onChange={setLogo} />
              </div>

              {/* Generate Button */}

              <div className="flex gap-2">
                <Button
                  onClick={() => onDownload(fileType)}
                  size="lg"
                  className="w-[75%] bg-teal-600 hover:bg-teal-700 text-white h-12 text-lg font-medium cursor-pointer"
                >
                  Generate & download now
                </Button>

                <Select
                  value={fileType}
                  onValueChange={(value) => setFileType(value as any)}
                >
                  <SelectTrigger className="!h-12 w-[25%]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="png">PNG</SelectItem>
                    <SelectItem value="svg">SVG</SelectItem>
                    <SelectItem value="pdf">PDF</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="p-1 bg-white rounded-xl">
              <QRCodeWithLogo
                ref={ref as any}
                id={id}
                size={256}
                style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                value={
                  wifi.name
                    ? `WIFI:T:WPA;S:${wifi.name};P:${wifi.password};;`
                    : qr_value
                }
                // viewBox={`0 0 256 256`}
                // type=""
                ecLevel="H"
                logoImage={logo ?? ""}
                logoWidth={60}
                logoHeight={60}
                removeQrCodeBehindLogo
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
