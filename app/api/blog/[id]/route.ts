import { NextResponse } from 'next/server'
import { blogPosts } from '@/lib/blog-data'

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const post = blogPosts.find(p => p.id === params.id)

  if (!post) {
    return NextResponse.json(
      { error: 'Post not found' },
      { status: 404 }
    )
  }

  // Get related posts (same category, excluding current post)
  const relatedPosts = blogPosts
    .filter(p => p.id !== params.id && p.category === post.category)
    .slice(0, 3)

  return NextResponse.json({
    post,
    relatedPosts
  })
}
