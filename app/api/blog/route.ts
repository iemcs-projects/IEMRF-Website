import { NextResponse } from 'next/server'
import { blogPosts, featuredPosts, recentPosts, blogCategories } from '@/lib/blog-data'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const category = searchParams.get('category')
  const featured = searchParams.get('featured')
  const recent = searchParams.get('recent')
  const limit = searchParams.get('limit')
  const search = searchParams.get('search')

  let filteredPosts = [...blogPosts]

  // Filter by category
  if (category && category !== 'All') {
    filteredPosts = filteredPosts.filter(post => post.category === category)
  }

  // Filter by featured
  if (featured === 'true') {
    filteredPosts = filteredPosts.filter(post => post.featured)
  }

  // Filter by recent
  if (recent === 'true') {
    filteredPosts = recentPosts
  }

  // Search functionality
  if (search) {
    const searchLower = search.toLowerCase()
    filteredPosts = filteredPosts.filter(post => 
      post.title.toLowerCase().includes(searchLower) ||
      post.excerpt.toLowerCase().includes(searchLower) ||
      post.content.toLowerCase().includes(searchLower) ||
      post.tags.some(tag => tag.toLowerCase().includes(searchLower))
    )
  }

  // Apply limit
  if (limit) {
    const limitNum = parseInt(limit, 10)
    if (!isNaN(limitNum)) {
      filteredPosts = filteredPosts.slice(0, limitNum)
    }
  }

  return NextResponse.json({
    posts: filteredPosts,
    total: filteredPosts.length,
    categories: blogCategories,
    featuredPosts: featuredPosts,
    recentPosts: recentPosts
  })
}
