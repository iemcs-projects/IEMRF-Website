"use client"

import { useState } from "react"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { BlogManagement } from "@/components/blog-management"
import { BlogEditor } from "@/components/blog-editor"
import { blogPosts } from "@/lib/blog-data"
import { BlogPost } from "@/lib/blog-data"

export default function BlogManagePage() {
  const [posts, setPosts] = useState(blogPosts)
  const [showEditor, setShowEditor] = useState(false)
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null)
  const [mode, setMode] = useState<'create' | 'edit'>('create')

  const handleCreateNew = () => {
    setEditingPost(null)
    setMode('create')
    setShowEditor(true)
  }

  const handleEdit = (post: BlogPost) => {
    setEditingPost(post)
    setMode('edit')
    setShowEditor(true)
  }

  const handleDelete = (postId: string) => {
    if (confirm('Are you sure you want to delete this post?')) {
      setPosts(prev => prev.filter(post => post.id !== postId))
    }
  }

  const handleView = (postId: string) => {
    window.open(`/blog/${postId}`, '_blank')
  }

  const handleSave = (postData: Omit<BlogPost, 'id' | 'likes' | 'likedBy' | 'comments'>) => {
    if (mode === 'create') {
      const newPost: BlogPost = {
        ...postData,
        id: Date.now().toString(),
        likes: 0,
        likedBy: [],
        comments: []
      }
      setPosts(prev => [newPost, ...prev])
    } else if (editingPost) {
      setPosts(prev => prev.map(post => 
        post.id === editingPost.id 
          ? { ...post, ...postData, updatedAt: new Date().toISOString() }
          : post
      ))
    }
    setShowEditor(false)
    setEditingPost(null)
  }

  const handleCancel = () => {
    setShowEditor(false)
    setEditingPost(null)
  }

  if (showEditor) {
    return (
      <div className="min-h-screen bg-gray-50">
        <SiteHeader />
        <main className="pt-20">
          <BlogEditor
            post={editingPost || undefined}
            onSave={handleSave}
            onCancel={handleCancel}
            mode={mode}
          />
        </main>
        <SiteFooter />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <SiteHeader />
      
      <main className="pt-20">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <BlogManagement
            posts={posts}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onView={handleView}
            onCreateNew={handleCreateNew}
          />
        </div>
      </main>
      
      <SiteFooter />
    </div>
  )
}
