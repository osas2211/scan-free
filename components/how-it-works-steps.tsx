import { QrCode, FileText, BarChart3 } from "lucide-react"

export function HowItWorksSteps() {
  const steps = [
    {
      icon: QrCode,
      title: "Choose",
      subtitle: "QR or Barcode",
      bgColor: "bg-blue-100 dark:bg-blue-900",
      iconColor: "text-blue-600 dark:text-blue-400",
    },
    {
      icon: FileText,
      title: "Enter",
      subtitle: "your data",
      bgColor: "bg-teal-100 dark:bg-teal-900",
      iconColor: "text-teal-600 dark:text-teal-400",
    },
    {
      icon: BarChart3,
      title: "Am>>",
      subtitle: "",
      bgColor: "bg-purple-100 dark:bg-purple-900",
      iconColor: "text-purple-600 dark:text-purple-400",
    },
  ]

  return (
    <section className="py-16 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-foreground mb-12">
          How It Works
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="flex space-x-4 items-center">
              <div
                className={`w-20 h-20 ${step.bgColor} rounded-2xl flex items-center justify-center`}
              >
                <step.icon className={`h-10 w-10 ${step.iconColor}`} />
              </div>
              <div className="!space-y-0">
                <h3 className="text-xl font-semibold text-foreground">
                  {step.title}
                </h3>
                {step.subtitle && (
                  <p className="text-muted-foreground">{step.subtitle}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
