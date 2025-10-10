"use client"

import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { BlogList } from "@/components/blog-list"
import { BlogWriteModal } from "@/components/blog-write-modal"
import { blogPosts, featuredPosts } from "@/lib/blog-data"

export default function BlogPage() {
  const handleSavePost = (postData: any) => {
    // In a real app, this would save to a database
    console.log('Saving post:', postData)
    // You could also update the local state or make an API call here
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <SiteHeader />
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-emerald-600 to-blue-600 text-white py-16">
          <div className="max-w-6xl mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Innovation Insights
            </h1>
            <p className="text-xl md:text-2xl text-emerald-100 mb-8 max-w-3xl mx-auto">
              Explore the latest trends, research, and insights in technology, entrepreneurship, and innovation
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <div className="text-2xl font-bold">{blogPosts.length}</div>
                <div className="text-sm text-emerald-100">Articles Published</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <div className="text-2xl font-bold">{featuredPosts.length}</div>
                <div className="text-sm text-emerald-100">Featured Stories</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <div className="text-2xl font-bold">5+</div>
                <div className="text-sm text-emerald-100">Categories</div>
              </div>
            </div>
          </div>
        </section>

        {/* Blog Content */}
        <section className="py-16">
          <div className="max-w-6xl mx-auto px-4">
            <div className="flex justify-end mb-6">
              <BlogWriteModal onSave={handleSavePost} />
            </div>
            <BlogList posts={blogPosts} featuredPosts={featuredPosts} />
          </div>
        </section>

        {/* Newsletter Signup */}
        <section className="bg-gray-900 text-white py-16">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
            <p className="text-xl text-gray-300 mb-8">
              Subscribe to our newsletter and never miss the latest insights and updates
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
