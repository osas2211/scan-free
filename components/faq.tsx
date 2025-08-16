"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"

const faqData = [
  {
    question: "How to make a QR code?",
    answer:
      "Choose the content you want your QR code to link to (e.g., URL, vCard, Wi-Fi, PDF). Use a trusted QR code generator, enter your content, customize (optional), then generate and download. Ensure high contrast and test it before using it publicly.",
  },
  {
    question: "How to create a QR code?",
    answer:
      "Visit the QR code generator, select the code type you need (URL, contact, Wi-Fi, etc.), input your data, preview the design, and download in PNG, SVG, or PDF format.",
  },
  {
    question: "How to scan a QR code on iPhone?",
    answer:
      "Open the Camera app on your iPhone (iOS 11 or later), point it at the QR code, then tap the pop-up notification or link that appears to access the content.",
  },
  {
    question: "How to scan a QR code?",
    answer:
      "Open your smartphone's camera app and point it at the QR code. A clickable notification should appear when it's recognized. On Android, if your camera doesn't support it, use Google Lens or a QR scanning app.",
  },
  {
    question: "How do you scan a QR code?",
    answer:
      "Simply open your device's camera, point it at the QR code, and tap the link or action that pops up — no app download needed in most modern smartphones.",
  },
  {
    question: "How do I scan a Barcode?",
    answer:
      "Same as above — use your camera app and tap the notification that appears after it recognizes the code.",
  },
  {
    question: "How to create a QR code for a link?",
    answer:
      'Go to a QR code generator, choose the "URL" type, enter your link, generate the code, then download it. Customize as needed before generating.',
  },
  {
    question: "What is a QR code?",
    answer:
      "A QR code is a two-dimensional matrix barcode invented in 1994 by Denso Wave. It uses black-and-white squares to store data like URLs and contact info and is readable by modern devices using error correction and built-in cameras.",
  },
]

export function FAQ() {
  const [openItems, setOpenItems] = useState<number[]>([])

  const toggleItem = (index: number) => {
    setOpenItems((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    )
  }

  return (
    <section className="py-16 px-4 bg-background">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12 text-foreground">
          Frequently Asked Questions
        </h2>
        <div className="space-y-4">
          {faqData.map((item, index) => (
            <div
              key={index}
              className="border border-border rounded-lg overflow-hidden bg-card"
            >
              <button
                onClick={() => toggleItem(index)}
                className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-muted/50 transition-colors cursor-pointer"
              >
                <span className="font-medium text-foreground pr-4">
                  {item.question}
                </span>
                <ChevronDown
                  className={`w-5 h-5 text-muted-foreground transition-transform ${
                    openItems.includes(index) ? "rotate-180" : ""
                  }`}
                />
              </button>
              {openItems.includes(index) && (
                <div className="px-6 pb-4">
                  <p className="text-muted-foreground leading-relaxed">
                    {item.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
