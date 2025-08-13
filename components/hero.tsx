import { Button } from "@/components/ui/button"
import Image from "next/image"

export function Hero() {
  return (
    <section className="py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-foreground leading-tight">
                Free QR Code &<br />
                Barcode Generator
              </h1>
              <p className="text-lg text-muted-foreground max-w-lg">
                Create unlimited QR codes and barcodes instantly — free, no
                signup needed.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg font-medium"
              >
                Generate QR Code
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-teal-500 text-teal-600 hover:bg-teal-50 dark:hover:bg-teal-950 px-8 py-3 text-lg font-medium bg-transparent"
              >
                Generate
              </Button>
            </div>
          </div>

          {/* Right Content - QR Code */}
          <div className="flex justify-center lg:justify-end">
            <div className="w-80 h-80 bg-white p-4 rounded-lg shadow-lg">
              <Image
                src="/randomqr.png?height=320&width=320"
                alt="Sample QR Code"
                width={320}
                height={320}
                className="w-full h-full object-contain"
                quality={70}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
