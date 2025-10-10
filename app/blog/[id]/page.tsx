"use client"

import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Calendar, Clock, User, ArrowLeft, Share2 } from "lucide-react"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { BlogActions } from "@/components/blog-actions"
import { BlogComments } from "@/components/blog-comments"
import { blogPosts, recentPosts } from "@/lib/blog-data"

interface BlogPostPageProps {
  params: {
    id: string
  }
}

// Metadata will be handled by the layout

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const post = blogPosts.find(p => p.id === params.id)
  
  if (!post) {
    notFound()
  }

  // Mock current user (in real app, this would come from auth context)
  const currentUser = {
    id: "user1",
    name: "John Doe",
    image: "/placeholder-user.jpg"
  }

  const handleLike = () => {
    // In real app, this would make an API call
    console.log('Liked post:', post.id)
  }

  const handleComment = () => {
    // Scroll to comments section
    document.getElementById('comments')?.scrollIntoView({ behavior: 'smooth' })
  }

  const handleShare = () => {
    // Share functionality
    console.log('Shared post:', post.id)
  }

  const handleBookmark = () => {
    // Bookmark functionality
    console.log('Bookmarked post:', post.id)
  }

  const handleAddComment = (content: string, parentId?: string) => {
    // In real app, this would make an API call
    console.log('Added comment:', content, parentId)
  }

  const handleLikeComment = (commentId: string) => {
    // In real app, this would make an API call
    console.log('Liked comment:', commentId)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  // Get related posts (excluding current post)
  const relatedPosts = recentPosts.filter(p => p.id !== post.id).slice(0, 3)

  return (
    <div className="min-h-screen bg-gray-50">
      <SiteHeader />
      
      <main className="pt-20">
        {/* Back to Blog Link */}
        <section className="bg-white border-b">
          <div className="max-w-4xl mx-auto px-4 py-4">
            <Link 
              href="/blog"
              className="inline-flex items-center gap-2 text-emerald-600 hover:text-emerald-700 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Blog
            </Link>
          </div>
        </section>

        {/* Article Header */}
        <section className="bg-white">
          <div className="max-w-4xl mx-auto px-4 py-8">
            <div className="mb-6">
              <Badge variant="secondary" className="mb-4">
                {post.category}
              </Badge>
              {post.featured && (
                <Badge className="ml-2 bg-emerald-500 hover:bg-emerald-600">
                  Featured
                </Badge>
              )}
            </div>
            
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              {post.title}
            </h1>
            
            <p className="text-xl text-gray-600 mb-8">
              {post.excerpt}
            </p>
            
            <div className="flex flex-wrap items-center gap-6 text-sm text-gray-500 mb-8">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4" />
                <span>{post.author}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>{formatDate(post.publishedAt)}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span>{post.readTime} min read</span>
              </div>
              <Button variant="outline" size="sm" className="ml-auto">
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </Button>
            </div>
            
            <div className="flex flex-wrap gap-2 mb-8">
              {post.tags.map((tag) => (
                <Badge key={tag} variant="outline">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Image */}
        <section className="bg-white">
          <div className="max-w-4xl mx-auto px-4 pb-8">
            <div className="relative h-64 md:h-96 rounded-lg overflow-hidden">
              <Image
                src={post.image}
                alt={post.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        </section>

        {/* Article Content */}
        <section className="bg-white">
          <div className="max-w-4xl mx-auto px-4 pb-8">
            <div className="prose prose-lg max-w-none">
              <div 
                className="text-gray-700 leading-relaxed"
                dangerouslySetInnerHTML={{ 
                  __html: post.content.replace(/\n/g, '<br />') 
                }}
              />
            </div>
          </div>
          
          {/* Blog Actions */}
          <div className="max-w-4xl mx-auto px-4">
            <BlogActions
              post={post}
              currentUser={currentUser}
              onLike={handleLike}
              onComment={handleComment}
              onShare={handleShare}
              onBookmark={handleBookmark}
            />
          </div>
        </section>

        {/* Author Bio */}
        <section className="bg-gray-100">
          <div className="max-w-4xl mx-auto px-4 py-12">
            <div className="bg-white rounded-lg p-8 shadow-sm">
              <div className="flex items-start gap-6">
                <div className="relative h-16 w-16 rounded-full overflow-hidden flex-shrink-0">
                  <Image
                    src={post.authorImage}
                    alt={post.author}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {post.author}
                  </h3>
                  <p className="text-gray-600">
                    Expert in {post.category} with extensive experience in research and innovation. 
                    Contributing to the advancement of technology and entrepreneurship through 
                    IEM Research Foundation.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Comments Section */}
        <section id="comments" className="bg-white py-16">
          <div className="max-w-4xl mx-auto px-4">
            <BlogComments
              post={post}
              currentUser={currentUser}
              onAddComment={handleAddComment}
              onLikeComment={handleLikeComment}
            />
          </div>
        </section>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <section className="bg-white py-16">
            <div className="max-w-6xl mx-auto px-4">
              <h2 className="text-2xl font-bold text-gray-900 mb-8">Related Articles</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {relatedPosts.map((relatedPost) => (
                  <article key={relatedPost.id} className="group">
                    <Link href={`/blog/${relatedPost.id}`}>
                      <div className="bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow">
                        <div className="relative h-48 overflow-hidden rounded-t-lg">
                          <Image
                            src={relatedPost.image}
                            alt={relatedPost.title}
                            fill
                            className="object-cover transition-transform duration-300 group-hover:scale-105"
                          />
                        </div>
                        <div className="p-6">
                          <Badge variant="secondary" className="mb-3 text-xs">
                            {relatedPost.category}
                          </Badge>
                          <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-emerald-600 transition-colors">
                            {relatedPost.title}
                          </h3>
                          <p className="text-sm text-gray-600 line-clamp-2 mb-4">
                            {relatedPost.excerpt}
                          </p>
                          <div className="flex items-center gap-4 text-xs text-gray-500">
                            <span>{formatDate(relatedPost.publishedAt)}</span>
                            <span>{relatedPost.readTime} min read</span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </article>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Newsletter Signup */}
        <section className="bg-gray-900 text-white py-16">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Enjoyed this article?</h2>
            <p className="text-xl text-gray-300 mb-8">
              Subscribe to our newsletter for more insights and updates
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg text-gray-900"
              />
              <button className="bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-3 rounded-lg font-medium transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </section>
      </main>
      
      <SiteFooter />
    </div>
  )
}
