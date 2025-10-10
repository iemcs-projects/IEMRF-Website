"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Heart, MessageCircle, Share2, Bookmark } from "lucide-react"
import { BlogPost } from "@/lib/blog-data"

interface BlogActionsProps {
  post: BlogPost
  currentUser?: {
    id: string
    name: string
  }
  onLike: () => void
  onComment: () => void
  onShare: () => void
  onBookmark: () => void
}

export function BlogActions({ 
  post, 
  currentUser, 
  onLike, 
  onComment, 
  onShare, 
  onBookmark 
}: BlogActionsProps) {
  const [isLiked, setIsLiked] = useState(
    currentUser ? post.likedBy.includes(currentUser.id) : false
  )
  const [isBookmarked, setIsBookmarked] = useState(false)

  const handleLike = () => {
    if (currentUser) {
      setIsLiked(!isLiked)
      onLike()
    }
  }

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked)
    onBookmark()
  }

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: post.title,
          text: post.excerpt,
          url: window.location.href,
        })
      } catch (err) {
        console.log('Error sharing:', err)
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href)
      onShare()
    }
  }

  return (
    <div className="flex items-center gap-4 py-4 border-t border-gray-200">
      <Button
        variant="ghost"
        size="sm"
        onClick={handleLike}
        className={`flex items-center gap-2 ${
          isLiked ? 'text-red-500 hover:text-red-600' : 'text-gray-500 hover:text-red-500'
        }`}
      >
        <Heart className={`h-4 w-4 ${isLiked ? 'fill-current' : ''}`} />
        <span>{post.likes + (isLiked ? 1 : 0)}</span>
      </Button>

      <Button
        variant="ghost"
        size="sm"
        onClick={onComment}
        className="flex items-center gap-2 text-gray-500 hover:text-emerald-600"
      >
        <MessageCircle className="h-4 w-4" />
        <span>{post.comments.length}</span>
      </Button>

      <Button
        variant="ghost"
        size="sm"
        onClick={handleBookmark}
        className={`flex items-center gap-2 ${
          isBookmarked ? 'text-emerald-500 hover:text-emerald-600' : 'text-gray-500 hover:text-emerald-500'
        }`}
      >
        <Bookmark className={`h-4 w-4 ${isBookmarked ? 'fill-current' : ''}`} />
        <span>Save</span>
      </Button>

      <Button
        variant="ghost"
        size="sm"
        onClick={handleShare}
        className="flex items-center gap-2 text-gray-500 hover:text-blue-500"
      >
        <Share2 className="h-4 w-4" />
        <span>Share</span>
      </Button>
    </div>
  )
}
