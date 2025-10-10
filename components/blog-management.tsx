"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  Plus, 
  Edit, 
  Trash2, 
  Eye, 
  Calendar, 
  User, 
  MoreVertical,
  FileText,
  Heart,
  MessageCircle
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { BlogPost } from "@/lib/blog-data"

interface BlogManagementProps {
  posts: BlogPost[]
  onEdit: (post: BlogPost) => void
  onDelete: (postId: string) => void
  onView: (postId: string) => void
  onCreateNew: () => void
}

export function BlogManagement({ 
  posts, 
  onEdit, 
  onDelete, 
  onView, 
  onCreateNew 
}: BlogManagementProps) {
  const [filter, setFilter] = useState<'all' | 'published' | 'draft'>('all')

  const filteredPosts = posts.filter(post => {
    if (filter === 'all') return true
    return post.status === filter
  })

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published':
        return 'bg-green-100 text-green-800'
      case 'draft':
        return 'bg-yellow-100 text-yellow-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Blog Management</h2>
          <p className="text-gray-600">Manage your blog posts and content</p>
        </div>
        <Button onClick={onCreateNew} className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          New Post
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-blue-500" />
              <div>
                <p className="text-2xl font-bold">{posts.length}</p>
                <p className="text-sm text-gray-600">Total Posts</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Eye className="h-5 w-5 text-green-500" />
              <div>
                <p className="text-2xl font-bold">
                  {posts.filter(p => p.status === 'published').length}
                </p>
                <p className="text-sm text-gray-600">Published</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Edit className="h-5 w-5 text-yellow-500" />
              <div>
                <p className="text-2xl font-bold">
                  {posts.filter(p => p.status === 'draft').length}
                </p>
                <p className="text-sm text-gray-600">Drafts</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <User className="h-5 w-5 text-purple-500" />
              <div>
                <p className="text-2xl font-bold">
                  {posts.reduce((sum, post) => sum + post.likes, 0)}
                </p>
                <p className="text-sm text-gray-600">Total Likes</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex gap-2">
        <Button
          variant={filter === 'all' ? 'default' : 'outline'}
          onClick={() => setFilter('all')}
          size="sm"
        >
          All Posts
        </Button>
        <Button
          variant={filter === 'published' ? 'default' : 'outline'}
          onClick={() => setFilter('published')}
          size="sm"
        >
          Published
        </Button>
        <Button
          variant={filter === 'draft' ? 'default' : 'outline'}
          onClick={() => setFilter('draft')}
          size="sm"
        >
          Drafts
        </Button>
      </div>

      {/* Posts List */}
      <div className="space-y-4">
        {filteredPosts.length > 0 ? (
          filteredPosts.map((post) => (
            <Card key={post.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">
                        {post.title}
                      </h3>
                      <Badge className={getStatusColor(post.status)}>
                        {post.status}
                      </Badge>
                      {post.featured && (
                        <Badge className="bg-emerald-100 text-emerald-800">
                          Featured
                        </Badge>
                      )}
                    </div>
                    
                    <p className="text-gray-600 mb-3 line-clamp-2">
                      {post.excerpt}
                    </p>
                    
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
                        <Heart className="h-4 w-4" />
                        <span>{post.likes} likes</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MessageCircle className="h-4 w-4" />
                        <span>{post.comments.length} comments</span>
                      </div>
                    </div>
                  </div>
                  
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => onView(post.id)}>
                        <Eye className="h-4 w-4 mr-2" />
                        View
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => onEdit(post)}>
                        <Edit className="h-4 w-4 mr-2" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem 
                        onClick={() => onDelete(post.id)}
                        className="text-red-600"
                      >
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <Card>
            <CardContent className="p-12 text-center">
              <FileText className="h-12 w-12 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                No posts found
              </h3>
              <p className="text-gray-600 mb-4">
                {filter === 'all' 
                  ? "You haven't created any blog posts yet."
                  : `No ${filter} posts found.`
                }
              </p>
              <Button onClick={onCreateNew}>
                <Plus className="h-4 w-4 mr-2" />
                Create Your First Post
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
