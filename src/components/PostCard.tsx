import React, { useState } from 'react';
import { Heart, MessageCircle, Bookmark, Share2, ChevronUp, ChevronDown, ShoppingCart, Eye, MoreHorizontal } from 'lucide-react';
import { Button } from './ui/button';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Badge } from './ui/badge';
import { Card, CardContent, CardHeader } from './ui/card';
import { useRouter } from './AppRouter';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';

interface PostCardProps {
  post: {
    id: string;
    seller: {
      id: string;
      name: string;
      avatar?: string;
      verified: boolean;
    };
    title: string;
    description: string;
    images: string[];
    tags: string[];
    price?: number;
    priceRange?: { min: number; max: number };
    stock: number;
    upvotes: number;
    downvotes: number;
    comments: number;
    timestamp: string;
    isUpvoted?: boolean;
    isDownvoted?: boolean;
    isSaved?: boolean;
  };
}

export function PostCard({ post }: PostCardProps) {
  const { navigate } = useRouter();
  const [isUpvoted, setIsUpvoted] = useState(post.isUpvoted || false);
  const [isDownvoted, setIsDownvoted] = useState(post.isDownvoted || false);
  const [isSaved, setIsSaved] = useState(post.isSaved || false);
  const [upvotes, setUpvotes] = useState(post.upvotes);
  const [downvotes, setDownvotes] = useState(post.downvotes);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleUpvote = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isUpvoted) {
      setIsUpvoted(false);
      setUpvotes(upvotes - 1);
    } else {
      setIsUpvoted(true);
      setUpvotes(upvotes + 1);
      if (isDownvoted) {
        setIsDownvoted(false);
        setDownvotes(downvotes - 1);
      }
    }
  };

  const handleDownvote = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isDownvoted) {
      setIsDownvoted(false);
      setDownvotes(downvotes - 1);
    } else {
      setIsDownvoted(true);
      setDownvotes(downvotes + 1);
      if (isUpvoted) {
        setIsUpvoted(false);
        setUpvotes(upvotes - 1);
      }
    }
  };

  const handleSave = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsSaved(!isSaved);
  };

  const handleCardClick = () => {
    navigate('product', { postId: post.id });
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price);
  };

  const getPriceDisplay = () => {
    if (post.price) {
      return formatPrice(post.price);
    } else if (post.priceRange) {
      return `${formatPrice(post.priceRange.min)} - ${formatPrice(post.priceRange.max)}`;
    }
    return null;
  };

  return (
    <Card className="hover-lift cursor-pointer animate-fade-in overflow-hidden" onClick={handleCardClick}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Avatar className="h-10 w-10">
              <AvatarImage src={post.seller.avatar} alt={post.seller.name} />
              <AvatarFallback>{post.seller.name[0]}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="flex items-center space-x-2">
                <span className="font-medium">{post.seller.name}</span>
                {post.seller.verified && (
                  <Badge variant="secondary" className="text-xs px-1.5 py-0.5">
                    ✓
                  </Badge>
                )}
              </div>
              <p className="text-sm text-muted-foreground">{post.timestamp}</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm">
              Theo dõi
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>Báo cáo</DropdownMenuItem>
                <DropdownMenuItem>Ẩn bài viết</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-0">
        {/* Images */}
        {post.images.length > 0 && (
          <div className="relative aspect-square bg-muted">
            {post.images.length > 1 && (
              <>
                <div className="absolute top-4 right-4 bg-black/50 text-white px-2 py-1 rounded text-sm">
                  {currentImageIndex + 1}/{post.images.length}
                </div>
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-1">
                  {post.images.map((_, index) => (
                    <button
                      key={index}
                      className={`w-2 h-2 rounded-full transition-smooth ${
                        index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                      }`}
                      onClick={(e) => {
                        e.stopPropagation();
                        setCurrentImageIndex(index);
                      }}
                    />
                  ))}
                </div>
              </>
            )}
          </div>
        )}

        {/* Content */}
        <div className="p-4">
          <h3 className="font-medium mb-2 line-clamp-2">{post.title}</h3>
          <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{post.description}</p>

          {/* Tags */}
          {post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-3">
              {post.tags.slice(0, 3).map((tag) => (
                <Badge key={tag} variant="secondary" className="text-xs">
                  #{tag}
                </Badge>
              ))}
              {post.tags.length > 3 && (
                <span className="text-xs text-muted-foreground">+{post.tags.length - 3}</span>
              )}
            </div>
          )}

          {/* Social Actions */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1">
                <Button
                  variant="ghost"
                  size="sm"
                  className={`h-8 p-1 transition-smooth ${isUpvoted ? 'text-primary' : ''}`}
                  onClick={handleUpvote}
                >
                  <ChevronUp className="w-4 h-4" />
                </Button>
                <span className="text-sm font-medium">{upvotes}</span>
                <Button
                  variant="ghost"
                  size="sm"
                  className={`h-8 p-1 transition-smooth ${isDownvoted ? 'text-destructive' : ''}`}
                  onClick={handleDownvote}
                >
                  <ChevronDown className="w-4 h-4" />
                </Button>
                <span className="text-sm font-medium">{downvotes}</span>
              </div>

              <Button variant="ghost" size="sm" className="h-8 p-1">
                <MessageCircle className="w-4 h-4 mr-1" />
                <span className="text-sm">{post.comments}</span>
              </Button>
            </div>

            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="sm"
                className={`h-8 p-1 transition-smooth ${isSaved ? 'text-primary' : ''}`}
                onClick={handleSave}
              >
                <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
              </Button>
              <Button variant="ghost" size="sm" className="h-8 p-1">
                <Share2 className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Price and Actions */}
          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              {getPriceDisplay() && (
                <span className="font-semibold text-lg text-primary">{getPriceDisplay()}</span>
              )}
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                {post.stock > 0 ? (
                  <>
                    <span>Còn {post.stock} sản phẩm</span>
                    {post.stock <= 5 && (
                      <Badge variant="destructive" className="text-xs">
                        Sắp hết
                      </Badge>
                    )}
                  </>
                ) : (
                  <Badge variant="secondary" className="text-xs">
                    Hết hàng
                  </Badge>
                )}
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm">
                <Eye className="w-4 h-4 mr-1" />
                Chi tiết
              </Button>
              {post.stock > 0 && (
                <Button size="sm" className="bg-primary hover:bg-primary-dark">
                  <ShoppingCart className="w-4 h-4 mr-1" />
                  Thêm
                </Button>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}