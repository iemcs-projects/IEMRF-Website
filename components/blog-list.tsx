"use client"

import { useState } from "react"
import { BlogPost, blogCategories } from "@/lib/blog-data"
import { BlogCard } from "@/components/blog-card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Filter } from "lucide-react"

interface BlogListProps {
  posts: BlogPost[]
  featuredPosts: BlogPost[]
}

export function BlogList({ posts, featuredPosts }: BlogListProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [currentPage, setCurrentPage] = useState(1)
  const postsPerPage = 6

  // Filter posts based on search and category
  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    
    const matchesCategory = selectedCategory === "All" || post.category === selectedCategory
    
    return matchesSearch && matchesCategory
  })

  // Pagination
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage)
  const startIndex = (currentPage - 1) * postsPerPage
  const paginatedPosts = filteredPosts.slice(startIndex, startIndex + postsPerPage)

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category)
    setCurrentPage(1) // Reset to first page when category changes
  }

  const handleSearchChange = (value: string) => {
    setSearchTerm(value)
    setCurrentPage(1) // Reset to first page when search changes
  }

  return (
    <div className="space-y-8">
      {/* Featured Posts Section */}
      {featuredPosts.length > 0 && (
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Featured Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {featuredPosts.map((post) => (
              <BlogCard key={post.id} post={post} featured />
            ))}
          </div>
        </section>
      )}

      {/* Filters and Search */}
      <section>
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search articles..."
              value={searchTerm}
              onChange={(e) => handleSearchChange(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-gray-500" />
            <Select value={selectedCategory} onValueChange={handleCategoryChange}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by category" />
              </SelectTrigger>
              <SelectContent>
                {blogCategories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Results count */}
        <div className="mb-6">
          <p className="text-gray-600">
            Showing {paginatedPosts.length} of {filteredPosts.length} articles
            {selectedCategory !== "All" && ` in ${selectedCategory}`}
            {searchTerm && ` matching "${searchTerm}"`}
          </p>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section>
        {paginatedPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {paginatedPosts.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              No articles found matching your criteria.
            </p>
            <Button
              variant="outline"
              onClick={() => {
                setSearchTerm("")
                setSelectedCategory("All")
                setCurrentPage(1)
              }}
              className="mt-4"
            >
              Clear filters
            </Button>
          </div>
        )}
      </section>

      {/* Pagination */}
      {totalPages > 1 && (
        <section>
          <div className="flex items-center justify-center gap-2">
            <Button
              variant="outline"
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              Previous
            </Button>
            
            <div className="flex items-center gap-1">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <Button
                  key={page}
                  variant={currentPage === page ? "default" : "outline"}
                  size="sm"
                  onClick={() => setCurrentPage(page)}
                  className="w-10"
                >
                  {page}
                </Button>
              ))}
            </div>
            
            <Button
              variant="outline"
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
            >
              Next
            </Button>
          </div>
        </section>
      )}
    </div>
  )
}
