import React, { useState } from 'react';
import { ArrowLeft, Heart, Share2, Flag, ShoppingCart, Minus, Plus, Truck, Shield, MessageCircle, ChevronUp, ChevronDown, MoreHorizontal } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar';
import { Separator } from '../components/ui/separator';
import { Textarea } from '../components/ui/textarea';
import { useRouter } from '../components/AppRouter';
import { Header } from '../components/Header';
import { GuestRegisterModal } from '../components/GuestRegisterModal';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '../components/ui/breadcrumb';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../components/ui/dropdown-menu';

// Mock product data
const mockProduct = {
  id: '1',
  title: 'iPhone 15 Pro Max 256GB - Chính hãng VN/A',
  description: `iPhone 15 Pro Max mới 100%, nguyên seal, bảo hành 12 tháng chính hãng Apple Việt Nam.

📱 Thông số kỹ thuật:
- Màn hình: 6.7" Super Retina XDR OLED
- Chip: A17 Pro Bionic
- Camera: 48MP chính + 12MP góc siêu rộng + 12MP tele
- Bộ nhớ: 256GB
- Màu sắc: Titan Tự Nhiên

📦 Bao gồm:
- Máy iPhone 15 Pro Max 256GB
- Cáp USB-C to USB-C
- Tài liệu hướng dẫn
- Hộp nguyên seal

🎯 Ưu đãi đặc biệt:
- Miễn phí giao hàng toàn quốc
- Bảo hành 12 tháng chính hãng
- Đổi trả trong 7 ngày nếu có lỗi
- Hỗ trợ trả góp 0% lãi suất`,
  images: [
    'https://images.unsplash.com/photo-1598860237986-013eede8beae?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzbWFydHBob25lJTIwdGVjaG5vbG9neSUyMGdhZGdldHxlbnwxfHx8fDE3NTg0MDk3Njl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    'https://images.unsplash.com/photo-1598860237986-013eede8beae?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzbWFydHBob25lJTIwdGVjaG5vbG9neSUyMGdhZGdldHxlbnwxfHx8fDE3NTg0MDk3Njl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
  ],
  price: 29990000,
  originalPrice: 32990000,
  stock: 12,
  sold: 128,
  tags: ['iphone', 'apple', 'smartphone', 'chinhang'],
  seller: {
    id: 'seller1',
    name: 'TechStore VN',
    avatar: '',
    verified: true,
    rating: 4.8,
    totalRatings: 1250,
    followers: 15400,
    joinDate: 'Tham gia 3 năm trước'
  },
  upvotes: 45,
  downvotes: 3,
  comments: [
    {
      id: '1',
      user: { name: 'Nguyễn Văn A', avatar: '' },
      content: 'Sản phẩm chất lượng, giao hàng nhanh. Recommend!',
      timestamp: '2 giờ trước',
      upvotes: 5,
      replies: [
        {
          id: '1-1',
          user: { name: 'TechStore VN', avatar: '' },
          content: 'Cảm ơn bạn đã tin tưởng shop! 🙏',
          timestamp: '1 giờ trước',
          upvotes: 2
        }
      ]
    },
    {
      id: '2',
      user: { name: 'Trần Thị B', avatar: '' },
      content: 'Có hỗ trợ trả góp không shop?',
      timestamp: '5 giờ trước',
      upvotes: 2,
      replies: []
    }
  ]
};

export function ProductPage() {
  const { navigate, params, isAuthenticated, isGuest } = useRouter();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isFollowing, setIsFollowing] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [newComment, setNewComment] = useState('');
  const [commentSort, setCommentSort] = useState('top');
  const [showGuestRegisterModal, setShowGuestRegisterModal] = useState(false);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price);
  };

  const handleQuantityChange = (change: number) => {
    const newQuantity = quantity + change;
    if (newQuantity >= 1 && newQuantity <= mockProduct.stock) {
      setQuantity(newQuantity);
    }
  };

  const handleAddToCart = () => {
    if (isGuest) {
      setShowGuestRegisterModal(true);
      return;
    }
    // Add to cart logic
    console.log(`Added ${quantity} items to cart`);
  };

  const handleBuyNow = () => {
    if (isGuest) {
      setShowGuestRegisterModal(true);
      return;
    }
    // Buy now logic
    console.log(`Buy now ${quantity} items`);
  };

  const handleSubmitComment = () => {
    if (!isAuthenticated && !isGuest) {
      setShowGuestRegisterModal(true);
      return;
    }
    
    if (isGuest) {
      setShowGuestRegisterModal(true);
      return;
    }

    if (newComment.trim()) {
      // Submit comment logic
      console.log('New comment:', newComment);
      setNewComment('');
    }
  };

  const handleSave = () => {
    if (isGuest) {
      setShowGuestRegisterModal(true);
      return;
    }
    setIsSaved(!isSaved);
  };

  const handleFollow = () => {
    if (isGuest) {
      setShowGuestRegisterModal(true);
      return;
    }
    setIsFollowing(!isFollowing);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container max-w-7xl mx-auto px-4 py-6">
        {/* Breadcrumb */}
        <Breadcrumb className="mb-6">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink onClick={() => navigate('home')} className="cursor-pointer">
                Trang chủ
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink className="cursor-pointer">#smartphone</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{mockProduct.title}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        {/* Guest Mode Notice */}
        {isGuest && (
          <Card className="mb-6 border-orange-200 bg-orange-50 dark:bg-orange-950/20 dark:border-orange-800">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-orange-100 dark:bg-orange-900 rounded-full flex items-center justify-center">
                    <span className="text-orange-600 dark:text-orange-400">👤</span>
                  </div>
                  <div>
                    <p className="font-medium text-orange-800 dark:text-orange-200">
                      Bạn đang duyệt với tư cách khách
                    </p>
                    <p className="text-sm text-orange-600 dark:text-orange-400">
                      Đăng ký để có thể mua hàng và sử dụng đầy đủ tính năng
                    </p>
                  </div>
                </div>
                <Button 
                  onClick={() => setShowGuestRegisterModal(true)}
                  className="bg-orange-600 hover:bg-orange-700"
                >
                  Đăng ký ngay
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column - Images & Description */}
          <div className="lg:col-span-8 space-y-6">
            {/* Image Gallery */}
            <Card className="overflow-hidden">
              <CardContent className="p-0">
                <div className="relative aspect-square bg-muted">
                  {mockProduct.images.length > 1 && (
                    <>
                      <div className="absolute top-4 right-4 bg-black/50 text-white px-3 py-1 rounded-md">
                        {currentImageIndex + 1}/{mockProduct.images.length}
                      </div>
                      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                        {mockProduct.images.map((_, index) => (
                          <button
                            key={index}
                            className={`w-3 h-3 rounded-full transition-smooth ${
                              index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                            }`}
                            onClick={() => setCurrentImageIndex(index)}
                          />
                        ))}
                      </div>
                    </>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Description */}
            <Card>
              <CardHeader>
                <CardTitle>Mô tả sản phẩm</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="prose prose-sm max-w-none">
                  {mockProduct.description.split('\n').map((line, index) => (
                    <p key={index} className="mb-2">
                      {line}
                    </p>
                  ))}
                </div>
                
                {/* Tags */}
                <div className="flex flex-wrap gap-2 mt-6">
                  {mockProduct.tags.map((tag) => (
                    <Badge key={tag} variant="secondary">
                      #{tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Product Info & Seller */}
          <div className="lg:col-span-4 space-y-6">
            <div className="sticky top-24 space-y-6">
              {/* Product Info */}
              <Card>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div>
                      <h1 className="text-xl font-semibold mb-2">{mockProduct.title}</h1>
                      <div className="flex items-center space-x-4 mb-4">
                        <div className="flex items-center space-x-2">
                          <Button variant="ghost" size="sm" className="h-8 p-1 text-primary">
                            <ChevronUp className="w-4 h-4" />
                            <span className="ml-1">{mockProduct.upvotes}</span>
                          </Button>
                          <Button variant="ghost" size="sm" className="h-8 p-1">
                            <ChevronDown className="w-4 h-4" />
                            <span className="ml-1">{mockProduct.downvotes}</span>
                          </Button>
                        </div>
                        <span className="text-sm text-muted-foreground">
                          Đã bán {mockProduct.sold}
                        </span>
                        <div className="flex items-center space-x-2 ml-auto">
                          <Button
                            variant="ghost"
                            size="sm"
                            className={`h-8 p-1 transition-smooth ${isSaved ? 'text-primary' : ''}`}
                            onClick={handleSave}
                          >
                            <Heart className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
                          </Button>
                          <Button variant="ghost" size="sm" className="h-8 p-1">
                            <Share2 className="w-4 h-4" />
                          </Button>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm">
                                <MoreHorizontal className="w-4 h-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>
                                <Flag className="w-4 h-4 mr-2" />
                                Báo cáo
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-baseline space-x-2">
                        <span className="text-2xl font-bold text-primary">
                          {formatPrice(mockProduct.price)}
                        </span>
                        {mockProduct.originalPrice > mockProduct.price && (
                          <span className="text-sm text-muted-foreground line-through">
                            {formatPrice(mockProduct.originalPrice)}
                          </span>
                        )}
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Badge 
                          variant={mockProduct.stock > 10 ? "secondary" : "destructive"}
                          className="text-xs"
                        >
                          {mockProduct.stock > 0 ? `Còn ${mockProduct.stock} sản phẩm` : 'Hết hàng'}
                        </Badge>
                        {mockProduct.stock <= 5 && mockProduct.stock > 0 && (
                          <Badge variant="destructive" className="text-xs">
                            Sắp hết hàng
                          </Badge>
                        )}
                      </div>
                    </div>

                    {mockProduct.stock > 0 && (
                      <div className="space-y-4">
                        <div className="flex items-center space-x-4">
                          <span className="text-sm font-medium">Số lượng:</span>
                          <div className="flex items-center space-x-2">
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => handleQuantityChange(-1)}
                              disabled={quantity <= 1}
                            >
                              <Minus className="w-4 h-4" />
                            </Button>
                            <span className="px-4 py-1 border rounded-md min-w-[3rem] text-center">
                              {quantity}
                            </span>
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => handleQuantityChange(1)}
                              disabled={quantity >= mockProduct.stock}
                            >
                              <Plus className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Button 
                            className="w-full bg-primary hover:bg-primary-dark"
                            onClick={handleBuyNow}
                          >
                            {isGuest ? 'Đăng ký để mua ngay' : 'Mua ngay'}
                          </Button>
                          <Button 
                            variant="outline" 
                            className="w-full"
                            onClick={handleAddToCart}
                          >
                            <ShoppingCart className="w-4 h-4 mr-2" />
                            {isGuest ? 'Đăng ký để thêm vào giỏ' : 'Thêm vào giỏ hàng'}
                          </Button>
                        </div>
                      </div>
                    )}

                    <Separator />

                    {/* Shipping & Policy */}
                    <div className="space-y-3 text-sm">
                      <div className="flex items-center space-x-2">
                        <Truck className="w-4 h-4 text-primary" />
                        <span>Miễn phí giao hàng toàn quốc</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Shield className="w-4 h-4 text-primary" />
                        <span>Bảo hành 12 tháng chính hãng</span>
                      </div>
                      <div className="text-muted-foreground">
                        Đổi trả trong 7 ngày nếu có lỗi từ nhà sản xuất
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Seller Info */}
              <Card>
                <CardHeader>
                  <CardTitle>Thông tin người bán</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-start space-x-3">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={mockProduct.seller.avatar} alt={mockProduct.seller.name} />
                      <AvatarFallback>{mockProduct.seller.name[0]}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <h4 className="font-medium">{mockProduct.seller.name}</h4>
                        {mockProduct.seller.verified && (
                          <Badge variant="secondary" className="text-xs px-1.5 py-0.5">
                            ✓
                          </Badge>
                        )}
                      </div>
                      <div className="space-y-1 text-sm text-muted-foreground">
                        <p>⭐ {mockProduct.seller.rating} ({mockProduct.seller.totalRatings} đánh giá)</p>
                        <p>👥 {mockProduct.seller.followers.toLocaleString()} người theo dõi</p>
                        <p>{mockProduct.seller.joinDate}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex space-x-2 mt-4">
                    <Button 
                      variant={isFollowing ? "secondary" : "outline"} 
                      size="sm" 
                      className="flex-1"
                      onClick={handleFollow}
                    >
                      {isFollowing ? 'Đang theo dõi' : (isGuest ? 'Đăng ký để theo dõi' : 'Theo dõi')}
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="flex-1"
                      onClick={() => isGuest ? setShowGuestRegisterModal(true) : null}
                    >
                      <MessageCircle className="w-4 h-4 mr-1" />
                      {isGuest ? 'Đăng ký để nhắn tin' : 'Nhắn tin'}
                    </Button>
                  </div>
                  
                  <Button variant="ghost" className="w-full mt-2 text-sm">
                    Xem cửa hàng
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* Comments Section */}
        <Card className="mt-8">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Bình luận ({mockProduct.comments.length})</CardTitle>
              <div className="flex items-center space-x-2">
                <Button 
                  variant={commentSort === 'top' ? 'default' : 'ghost'} 
                  size="sm"
                  onClick={() => setCommentSort('top')}
                >
                  Hàng đầu
                </Button>
                <Button 
                  variant={commentSort === 'newest' ? 'default' : 'ghost'} 
                  size="sm"
                  onClick={() => setCommentSort('newest')}
                >
                  Mới nhất
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {/* Add Comment */}
            <div className="mb-6">
              <Textarea
                placeholder={isGuest ? "Đăng ký để viết bình luận..." : "Viết bình luận..."}
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                className="mb-2"
                disabled={isGuest}
              />
              <Button 
                onClick={handleSubmitComment}
                disabled={(!newComment.trim() && !isGuest) || isGuest}
                className="bg-primary hover:bg-primary-dark"
              >
                {isGuest ? 'Đăng ký để bình luận' : 'Gửi bình luận'}
              </Button>
            </div>

            {/* Comments List */}
            <div className="space-y-6">
              {mockProduct.comments.map((comment) => (
                <div key={comment.id} className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={comment.user.avatar} alt={comment.user.name} />
                      <AvatarFallback>{comment.user.name[0]}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <span className="font-medium text-sm">{comment.user.name}</span>
                        <span className="text-xs text-muted-foreground">{comment.timestamp}</span>
                      </div>
                      <p className="text-sm mb-2">{comment.content}</p>
                      <div className="flex items-center space-x-4">
                        <Button variant="ghost" size="sm" className="h-auto p-0 text-xs">
                          <ChevronUp className="w-3 h-3 mr-1" />
                          {comment.upvotes}
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="h-auto p-0 text-xs"
                          onClick={() => isGuest ? setShowGuestRegisterModal(true) : null}
                        >
                          {isGuest ? 'Đăng ký để trả lời' : 'Trả lời'}
                        </Button>
                      </div>
                    </div>
                  </div>

                  {/* Replies */}
                  {comment.replies.map((reply) => (
                    <div key={reply.id} className="ml-11">
                      <div className="flex items-start space-x-3">
                        <Avatar className="h-6 w-6">
                          <AvatarImage src={reply.user.avatar} alt={reply.user.name} />
                          <AvatarFallback className="text-xs">{reply.user.name[0]}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-1">
                            <span className="font-medium text-xs">{reply.user.name}</span>
                            <span className="text-xs text-muted-foreground">{reply.timestamp}</span>
                          </div>
                          <p className="text-xs mb-1">{reply.content}</p>
                          <Button variant="ghost" size="sm" className="h-auto p-0 text-xs">
                            <ChevronUp className="w-3 h-3 mr-1" />
                            {reply.upvotes}
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Guest Register Modal */}
      <GuestRegisterModal 
        isOpen={showGuestRegisterModal}
        onClose={() => setShowGuestRegisterModal(false)}
      />
    </div>
  );
}