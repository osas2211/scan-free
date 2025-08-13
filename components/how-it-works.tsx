import { Check, Grid3X3, Forward } from "lucide-react"

export function HowItWorks() {
  const steps = [
    {
      icon: Check,
      title: "Choose QR & Unlimited",
      description: "Select your preferred format",
    },
    {
      icon: Grid3X3,
      title: "Multiple Formate Suported",
      description: "Various output options available",
    },
    {
      icon: Forward,
      title: "Click generate & download",
      description: "Get your code instantly",
    },
  ]

  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-foreground mb-12">
          How It Works
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-teal-100 dark:bg-teal-900 rounded-lg flex items-center justify-center">
                  <step.icon className="h-6 w-6 text-teal-600 dark:text-teal-400" />
                </div>
              </div>
              <div className="space-y-0">
                <h3 className="text-lg font-semibold text-foreground">
                  {step.title}
                </h3>
                <p className="text-muted-foreground">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
