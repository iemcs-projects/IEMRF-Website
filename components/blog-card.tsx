import Link from "next/link"
import Image from "next/image"
import { Calendar, Clock, User, Heart, MessageCircle, Eye } from "lucide-react"
import { BlogPost } from "@/lib/blog-data"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface BlogCardProps {
  post: BlogPost
  featured?: boolean
}

export function BlogCard({ post, featured = false }: BlogCardProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  return (
    <Card className={`group overflow-hidden transition-all duration-300 hover:shadow-lg cursor-pointer ${featured ? 'md:col-span-2' : ''}`}>
      <Link href={`/blog/${post.id}`}>
        <div className="relative">
          <Image
            src={post.image}
            alt={post.title}
            width={featured ? 800 : 400}
            height={featured ? 300 : 200}
            className="h-48 w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute top-4 left-4">
            <Badge variant="secondary" className="bg-white/90 text-gray-900">
              {post.category}
            </Badge>
          </div>
          {post.featured && (
            <div className="absolute top-4 right-4">
              <Badge className="bg-emerald-500 hover:bg-emerald-600">
                Featured
              </Badge>
            </div>
          )}
        </div>
        
        <CardHeader className="pb-3">
          <h3 className={`font-semibold text-gray-900 transition-colors hover:text-emerald-600 ${
            featured ? 'text-xl md:text-2xl' : 'text-lg'
          }`}>
            {post.title}
          </h3>
          <p className={`text-gray-600 line-clamp-2 ${
            featured ? 'text-base' : 'text-sm'
          }`}>
            {post.excerpt}
          </p>
        </CardHeader>
      </Link>
      
      <CardContent className="pt-0">
        <div className="flex flex-wrap gap-2 mb-4">
          {post.tags.slice(0, 3).map((tag) => (
            <Badge key={tag} variant="outline" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>
      </CardContent>
      
      <CardFooter className="pt-0">
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-4 text-sm text-gray-500">
            <div className="flex items-center gap-1">
              <User className="h-4 w-4" />
              <span>{post.author}</span>
            </div>
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              <span>{formatDate(post.publishedAt)}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>{post.readTime} min read</span>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 text-sm text-gray-500">
              <Heart className="h-4 w-4" />
              <span>{post.likes}</span>
            </div>
            <div className="flex items-center gap-1 text-sm text-gray-500">
              <MessageCircle className="h-4 w-4" />
              <span>{post.comments.length}</span>
            </div>
            <Link href={`/blog/${post.id}`}>
              <Button size="sm" variant="outline" className="ml-2">
                <Eye className="h-4 w-4 mr-1" />
                Read More
              </Button>
            </Link>
          </div>
        </div>
      </CardFooter>
    </Card>
  )
}
