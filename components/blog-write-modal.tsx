"use client"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { 
  X, 
  Plus, 
  Save, 
  Eye, 
  Upload, 
  Image as ImageIcon,
  BarChart3,
  FileText,
  Calendar,
  User,
  Link,
  Bold,
  Italic,
  List,
  Quote
} from "lucide-react"
import { blogCategories } from "@/lib/blog-data"

interface BlogWriteModalProps {
  onSave: (postData: any) => void
  trigger?: React.ReactNode
}

export function BlogWriteModal({ onSave, trigger }: BlogWriteModalProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isPreview, setIsPreview] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    excerpt: '',
    content: '',
    author: '',
    authorImage: '/placeholder-user.jpg',
    category: '',
    tags: [] as string[],
    image: '',
    readTime: 5,
    featured: false,
    status: 'draft' as 'draft' | 'published',
    references: [] as string[],
    charts: [] as string[]
  })

  const [newTag, setNewTag] = useState('')
  const [newReference, setNewReference] = useState('')
  const fileInputRef = useRef<HTMLInputElement>(null)
  const imageInputRef = useRef<HTMLInputElement>(null)

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

  const addReference = () => {
    if (newReference.trim() && !formData.references.includes(newReference.trim())) {
      setFormData(prev => ({
        ...prev,
        references: [...prev.references, newReference.trim()]
      }))
      setNewReference('')
    }
  }

  const removeReference = (refToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      references: prev.references.filter(ref => ref !== refToRemove)
    }))
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      // In a real app, you would upload the file to a server
      // For now, we'll create a local URL
      const fileUrl = URL.createObjectURL(file)
      setFormData(prev => ({
        ...prev,
        charts: [...prev.charts, fileUrl]
      }))
    }
  }

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      // In a real app, you would upload the file to a server
      const fileUrl = URL.createObjectURL(file)
      setFormData(prev => ({
        ...prev,
        image: fileUrl
      }))
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave(formData)
    setIsOpen(false)
    // Reset form
    setFormData({
      title: '',
      excerpt: '',
      content: '',
      author: '',
      authorImage: '/placeholder-user.jpg',
      category: '',
      tags: [],
      image: '',
      readTime: 5,
      featured: false,
      status: 'draft',
      references: [],
      charts: []
    })
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

  const formatText = (format: string) => {
    const textarea = document.getElementById('content') as HTMLTextAreaElement
    const start = textarea.selectionStart
    const end = textarea.selectionEnd
    const selectedText = textarea.value.substring(start, end)
    
    let formattedText = ''
    switch (format) {
      case 'bold':
        formattedText = `**${selectedText}**`
        break
      case 'italic':
        formattedText = `*${selectedText}*`
        break
      case 'list':
        formattedText = `- ${selectedText}`
        break
      case 'quote':
        formattedText = `> ${selectedText}`
        break
    }
    
    const newContent = textarea.value.substring(0, start) + formattedText + textarea.value.substring(end)
    handleContentChange(newContent)
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Write New Post
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span>Write New Blog Post</span>
            <div className="flex gap-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setIsPreview(!isPreview)}
              >
                <Eye className="h-4 w-4 mr-2" />
                {isPreview ? 'Edit' : 'Preview'}
              </Button>
            </div>
          </DialogTitle>
        </DialogHeader>
        
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

            {formData.references.length > 0 && (
              <div className="border-t pt-6">
                <h3 className="text-lg font-semibold mb-4">References</h3>
                <ul className="space-y-2">
                  {formData.references.map((ref, index) => (
                    <li key={index} className="text-sm text-gray-600">
                      <Link className="h-4 w-4 inline mr-2" />
                      <a href={ref} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                        {ref}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
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

            {/* Rich Text Editor */}
            <div className="space-y-2">
              <Label>Content *</Label>
              <div className="border rounded-lg">
                {/* Toolbar */}
                <div className="border-b p-2 flex gap-2">
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => formatText('bold')}
                  >
                    <Bold className="h-4 w-4" />
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => formatText('italic')}
                  >
                    <Italic className="h-4 w-4" />
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => formatText('list')}
                  >
                    <List className="h-4 w-4" />
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => formatText('quote')}
                  >
                    <Quote className="h-4 w-4" />
                  </Button>
                </div>
                
                {/* Content Area */}
                <Textarea
                  id="content"
                  value={formData.content}
                  onChange={(e) => handleContentChange(e.target.value)}
                  placeholder="Write your blog post content here..."
                  rows={12}
                  className="border-0 resize-none"
                  required
                />
              </div>
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

            {/* Media Upload */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Featured Image</Label>
                <div className="flex gap-2">
                  <Input
                    value={formData.image}
                    onChange={(e) => handleInputChange('image', e.target.value)}
                    placeholder="Image URL or upload file"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => imageInputRef.current?.click()}
                  >
                    <ImageIcon className="h-4 w-4" />
                  </Button>
                </div>
                <input
                  ref={imageInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </div>
              
              <div className="space-y-2">
                <Label>Charts & Documents</Label>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full"
                >
                  <Upload className="h-4 w-4 mr-2" />
                  Upload Files
                </Button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".pdf,.doc,.docx,.xlsx,.png,.jpg,.jpeg"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </div>
            </div>

            {/* Uploaded Files Display */}
            {formData.charts.length > 0 && (
              <div className="space-y-2">
                <Label>Uploaded Files</Label>
                <div className="flex flex-wrap gap-2">
                  {formData.charts.map((chart, index) => (
                    <div key={index} className="flex items-center gap-2 bg-gray-100 p-2 rounded">
                      <FileText className="h-4 w-4" />
                      <span className="text-sm">File {index + 1}</span>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          setFormData(prev => ({
                            ...prev,
                            charts: prev.charts.filter((_, i) => i !== index)
                          }))
                        }}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}

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

            {/* References */}
            <div className="space-y-2">
              <Label>References</Label>
              <div className="flex gap-2 mb-2">
                <Input
                  value={newReference}
                  onChange={(e) => setNewReference(e.target.value)}
                  placeholder="Add a reference URL"
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addReference())}
                />
                <Button type="button" onClick={addReference} size="sm">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <div className="space-y-1">
                {formData.references.map((ref, index) => (
                  <div key={index} className="flex items-center gap-2 bg-gray-50 p-2 rounded">
                    <Link className="h-4 w-4 text-gray-500" />
                    <span className="text-sm flex-1 truncate">{ref}</span>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => removeReference(ref)}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
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
                Save Post
              </Button>
              <Button type="button" variant="outline" onClick={() => setIsOpen(false)}>
                Cancel
              </Button>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  )
}
