"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Search, QrCode, Barcode } from "lucide-react"

export function QRGenerator() {
  const [generatorType, setGeneratorType] = useState<"qr" | "barcode">("qr")
  const [sizeValue, setSizeValue] = useState("")
  const [sizeUnit, setSizeUnit] = useState("SVV")

  return (
    <section className="py-16 bg-muted/30">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-8">
          <h2 className="text-3xl font-bold text-foreground">
            {generatorType === "qr" ? "QR Code Generator" : "Barcode Generator"}
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Form */}
            <div className="lg:col-span-2 space-y-6">
              {/* Search Input */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
                <Input
                  placeholder="Enter your text or URL"
                  className="pl-10 h-12 text-lg"
                />
              </div>

              <div className="space-y-2">
                {/* <label className="text-sm font-medium text-foreground">
                  Size
                </label> */}
                <div className="flex gap-2">
                  <Input
                    value={sizeValue}
                    onChange={(e) => setSizeValue(e.target.value)}
                    placeholder="Size"
                    className="h-12 flex-1"
                  />
                  <Select value={sizeUnit} onValueChange={setSizeUnit}>
                    <SelectTrigger className="!h-12 w-24">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="SVV">SVV</SelectItem>
                      <SelectItem value="mm">mm</SelectItem>
                      <SelectItem value="cm">cm</SelectItem>
                      <SelectItem value="in">in</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Generate Button */}
              <Button
                size="lg"
                className="w-full bg-teal-600 hover:bg-teal-700 text-white h-12 text-lg font-medium"
              >
                Generate Now
              </Button>
            </div>

            {/* Right Column - Format Options */}
            <div className="space-y-4">
              <button
                onClick={() => setGeneratorType("qr")}
                className={`w-full flex items-center space-x-3 p-4 border rounded-lg transition-colors ${
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
                className={`w-full flex items-center space-x-3 p-4 border rounded-lg transition-colors ${
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
          </div>
        </div>
      </div>
    </section>
  )
}
