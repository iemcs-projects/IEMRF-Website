"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { X, Plus, Save, Eye, Upload } from "lucide-react"
import { BlogPost, blogCategories } from "@/lib/blog-data"

interface BlogEditorProps {
  post?: BlogPost
  onSave: (post: Omit<BlogPost, 'id' | 'likes' | 'likedBy' | 'comments'>) => void
  onCancel: () => void
  mode: 'create' | 'edit'
}

export function BlogEditor({ post, onSave, onCancel, mode }: BlogEditorProps) {
  const [formData, setFormData] = useState({
    title: post?.title || '',
    excerpt: post?.excerpt || '',
    content: post?.content || '',
    author: post?.author || '',
    authorImage: post?.authorImage || '/placeholder-user.jpg',
    category: post?.category || '',
    tags: post?.tags || [],
    image: post?.image || '',
    readTime: post?.readTime || 5,
    featured: post?.featured || false,
    status: post?.status || 'draft' as 'draft' | 'published'
  })

  const [newTag, setNewTag] = useState('')
  const [isPreview, setIsPreview] = useState(false)

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const addTag = () => {
    if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()]
      }))
      setNewTag('')
    }
  }

  const removeTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave(formData)
  }

  const calculateReadTime = (content: string) => {
    const wordsPerMinute = 200
    const words = content.trim().split(/\s+/).length
    return Math.ceil(words / wordsPerMinute)
  }

  const handleContentChange = (content: string) => {
    setFormData(prev => ({
      ...prev,
      content,
      readTime: calculateReadTime(content)
    }))
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>
              {mode === 'create' ? 'Write New Blog Post' : 'Edit Blog Post'}
            </CardTitle>
            <div className="flex gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsPreview(!isPreview)}
              >
                <Eye className="h-4 w-4 mr-2" />
                {isPreview ? 'Edit' : 'Preview'}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={onCancel}
              >
                Cancel
              </Button>
            </div>
          </div>
        </CardHeader>
        
        <CardContent>
          {isPreview ? (
            <div className="space-y-6">
              <div className="border-b pb-4">
                <h1 className="text-3xl font-bold text-gray-900 mb-4">
                  {formData.title || 'Untitled Post'}
                </h1>
                <p className="text-xl text-gray-600 mb-4">
                  {formData.excerpt || 'No excerpt provided'}
                </p>
                <div className="flex flex-wrap gap-2">
                  {formData.tags.map((tag) => (
                    <Badge key={tag} variant="outline">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
              
              {formData.image && (
                <div className="relative h-64 rounded-lg overflow-hidden">
                  <img
                    src={formData.image}
                    alt={formData.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              
              <div className="prose max-w-none">
                <div 
                  className="text-gray-700 leading-relaxed"
                  dangerouslySetInnerHTML={{ 
                    __html: formData.content.replace(/\n/g, '<br />') 
                  }}
                />
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Basic Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Title *</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => handleInputChange('title', e.target.value)}
                    placeholder="Enter blog post title"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="category">Category *</Label>
                  <Select
                    value={formData.category}
                    onValueChange={(value) => handleInputChange('category', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {blogCategories.slice(1).map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="excerpt">Excerpt *</Label>
                <Textarea
                  id="excerpt"
                  value={formData.excerpt}
                  onChange={(e) => handleInputChange('excerpt', e.target.value)}
                  placeholder="Brief description of the blog post"
                  rows={3}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="content">Content *</Label>
                <Textarea
                  id="content"
                  value={formData.content}
                  onChange={(e) => handleContentChange(e.target.value)}
                  placeholder="Write your blog post content here..."
                  rows={15}
                  required
                />
                <p className="text-sm text-gray-500">
                  Estimated read time: {formData.readTime} minutes
                </p>
              </div>

              {/* Author Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="author">Author *</Label>
                  <Input
                    id="author"
                    value={formData.author}
                    onChange={(e) => handleInputChange('author', e.target.value)}
                    placeholder="Author name"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="authorImage">Author Image URL</Label>
                  <Input
                    id="authorImage"
                    value={formData.authorImage}
                    onChange={(e) => handleInputChange('authorImage', e.target.value)}
                    placeholder="/path/to/author-image.jpg"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="image">Featured Image URL *</Label>
                <Input
                  id="image"
                  value={formData.image}
                  onChange={(e) => handleInputChange('image', e.target.value)}
                  placeholder="/path/to/featured-image.jpg"
                  required
                />
              </div>

              {/* Tags */}
              <div className="space-y-2">
                <Label>Tags</Label>
                <div className="flex gap-2 mb-2">
                  <Input
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    placeholder="Add a tag"
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                  />
                  <Button type="button" onClick={addTag} size="sm">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {formData.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="flex items-center gap-1">
                      {tag}
                      <X
                        className="h-3 w-3 cursor-pointer"
                        onClick={() => removeTag(tag)}
                      />
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Settings */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="status">Status</Label>
                  <Select
                    value={formData.status}
                    onValueChange={(value: 'draft' | 'published') => handleInputChange('status', value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="draft">Draft</SelectItem>
                      <SelectItem value="published">Published</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="flex items-center space-x-2 pt-6">
                  <input
                    type="checkbox"
                    id="featured"
                    checked={formData.featured}
                    onChange={(e) => handleInputChange('featured', e.target.checked)}
                    className="rounded"
                  />
                  <Label htmlFor="featured">Featured Post</Label>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4 pt-6">
                <Button type="submit" className="flex-1">
                  <Save className="h-4 w-4 mr-2" />
                  {mode === 'create' ? 'Create Post' : 'Update Post'}
                </Button>
                <Button type="button" variant="outline" onClick={onCancel}>
                  Cancel
                </Button>
              </div>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
