import { Card, CardContent } from "@/components/ui/card"
import { QrCode, BarChart3, Leaf } from "lucide-react"

export function BlogPosts() {
  const posts = [
    {
      icon: QrCode,
      title: "How to Use QR Codes",
      subtitle: "for Your Business",
      bgColor: "bg-blue-100 dark:bg-blue-900",
      iconColor: "text-blue-600 dark:text-blue-400",
    },
    {
      icon: BarChart3,
      title: "Top 10 Barcode Types",
      subtitle: "and Their Uses",
      bgColor: "bg-purple-100 dark:bg-purple-900",
      iconColor: "text-purple-600 dark:text-purple-400",
    },
    {
      icon: Leaf,
      title: "Benefits of Dynamic QR Codes",
      subtitle: "",
      bgColor: "bg-teal-100 dark:bg-teal-900",
      iconColor: "text-teal-600 dark:text-teal-400",
    },
  ]

  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-foreground mb-12">Latest Blog Posts</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {posts.map((post, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow duration-200 cursor-pointer">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <div
                    className={`w-12 h-12 ${post.bgColor} rounded-lg flex items-center justify-center flex-shrink-0`}
                  >
                    <post.icon className={`h-6 w-6 ${post.iconColor}`} />
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-semibold text-foreground leading-tight">{post.title}</h3>
                    {post.subtitle && <p className="text-muted-foreground text-sm">{post.subtitle}</p>}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
