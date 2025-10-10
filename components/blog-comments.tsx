"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { MessageCircle, Reply, Heart, Send } from "lucide-react"
import { Comment, BlogPost } from "@/lib/blog-data"

interface BlogCommentsProps {
  post: BlogPost
  currentUser?: {
    id: string
    name: string
    image: string
  }
  onAddComment: (content: string, parentId?: string) => void
  onLikeComment: (commentId: string) => void
}

export function BlogComments({ post, currentUser, onAddComment, onLikeComment }: BlogCommentsProps) {
  const [newComment, setNewComment] = useState('')
  const [replyingTo, setReplyingTo] = useState<string | null>(null)
  const [replyContent, setReplyContent] = useState('')

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault()
    if (newComment.trim()) {
      onAddComment(newComment.trim())
      setNewComment('')
    }
  }

  const handleSubmitReply = (e: React.FormEvent) => {
    e.preventDefault()
    if (replyContent.trim() && replyingTo) {
      onAddComment(replyContent.trim(), replyingTo)
      setReplyContent('')
      setReplyingTo(null)
    }
  }

  const CommentItem = ({ comment, isReply = false }: { comment: Comment; isReply?: boolean }) => (
    <div className={`${isReply ? 'ml-8 mt-4' : 'mb-6'}`}>
      <Card className="border-l-4 border-l-emerald-500">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <Avatar className="h-10 w-10">
              <AvatarImage src={comment.authorImage} alt={comment.author} />
              <AvatarFallback>
                {comment.author.split(' ').map(n => n[0]).join('').toUpperCase()}
              </AvatarFallback>
            </Avatar>
            
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <h4 className="font-semibold text-gray-900">{comment.author}</h4>
                <span className="text-sm text-gray-500">
                  {formatDate(comment.createdAt)}
                </span>
              </div>
              
              <p className="text-gray-700 mb-3">{comment.content}</p>
              
              <div className="flex items-center gap-4">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onLikeComment(comment.id)}
                  className="text-gray-500 hover:text-red-500"
                >
                  <Heart className="h-4 w-4 mr-1" />
                  Like
                </Button>
                
                {!isReply && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setReplyingTo(comment.id)}
                    className="text-gray-500 hover:text-emerald-600"
                  >
                    <Reply className="h-4 w-4 mr-1" />
                    Reply
                  </Button>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Reply Form */}
      {replyingTo === comment.id && (
        <div className="ml-8 mt-4">
          <Card>
            <CardContent className="p-4">
              <form onSubmit={handleSubmitReply} className="space-y-3">
                <Textarea
                  value={replyContent}
                  onChange={(e) => setReplyContent(e.target.value)}
                  placeholder="Write a reply..."
                  rows={3}
                />
                <div className="flex gap-2">
                  <Button type="submit" size="sm">
                    <Send className="h-4 w-4 mr-1" />
                    Reply
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setReplyingTo(null)
                      setReplyContent('')
                    }}
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      )}
      
      {/* Nested Replies */}
      {comment.replies && comment.replies.length > 0 && (
        <div className="ml-8 mt-4 space-y-4">
          {comment.replies.map((reply) => (
            <CommentItem key={reply.id} comment={reply} isReply />
          ))}
        </div>
      )}
    </div>
  )

  return (
    <div className="space-y-6">
      {/* Comments Header */}
      <div className="flex items-center gap-2">
        <MessageCircle className="h-5 w-5 text-emerald-600" />
        <h3 className="text-xl font-semibold text-gray-900">
          Comments ({post.comments.length})
        </h3>
      </div>

      {/* Add Comment Form */}
      {currentUser ? (
        <Card>
          <CardContent className="p-4">
            <form onSubmit={handleSubmitComment} className="space-y-3">
              <div className="flex items-start gap-3">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={currentUser.image} alt={currentUser.name} />
                  <AvatarFallback>
                    {currentUser.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <Textarea
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Share your thoughts..."
                    rows={3}
                  />
                </div>
              </div>
              <div className="flex justify-end">
                <Button type="submit" disabled={!newComment.trim()}>
                  <Send className="h-4 w-4 mr-1" />
                  Post Comment
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-gray-600 mb-3">
              Please log in to leave a comment
            </p>
            <Button variant="outline">
              Log In
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Comments List */}
      <div className="space-y-6">
        {post.comments.length > 0 ? (
          post.comments.map((comment) => (
            <CommentItem key={comment.id} comment={comment} />
          ))
        ) : (
          <div className="text-center py-8">
            <MessageCircle className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">No comments yet. Be the first to share your thoughts!</p>
          </div>
        )}
      </div>
    </div>
  )
}
