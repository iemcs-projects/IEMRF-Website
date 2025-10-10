import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Blog | IEM Research Foundation",
  description: "Stay updated with the latest insights on innovation, technology, entrepreneurship, and research from IEM Research Foundation.",
  keywords: "blog, innovation, technology, entrepreneurship, research, AI, healthcare, sustainability",
}

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
