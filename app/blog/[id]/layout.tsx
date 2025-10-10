import { Metadata } from "next"
import { blogPosts } from "@/lib/blog-data"

export async function generateMetadata({
  params,
}: {
  params: { id: string }
}): Promise<Metadata> {
  const post = blogPosts.find(p => p.id === params.id)
  
  if (!post) {
    return {
      title: "Post Not Found | IEM Research Foundation",
    }
  }

  return {
    title: `${post.title} | IEM Research Foundation Blog`,
    description: post.excerpt,
    keywords: post.tags.join(", "),
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [post.image],
      type: "article",
      publishedTime: post.publishedAt,
      authors: [post.author],
    },
  }
}

export default function BlogPostLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
