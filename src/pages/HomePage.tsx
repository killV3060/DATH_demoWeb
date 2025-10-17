import React, { useState } from 'react';
import { TrendingUp, Filter, Hash, Plus } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Separator } from '../components/ui/separator';
import { PostCard } from '../components/PostCard';
import { Header } from '../components/Header';
import { MobileMenu } from '../components/MobileMenu';

// Mock data
const mockPosts = [
  {
    id: '1',
    seller: {
      id: 'seller1',
      name: 'TechStore VN',
      avatar: '',
      verified: true
    },
    title: 'iPhone 15 Pro Max 256GB - Chính hãng VN/A',
    description: 'iPhone 15 Pro Max mới 100%, nguyên seal, bảo hành 12 tháng chính hãng Apple Việt Nam. Màu Titan Tự Nhiên, bộ nhớ 256GB.',
    images: ['https://images.unsplash.com/photo-1598860237986-013eede8beae?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzbWFydHBob25lJTIwdGVjaG5vbG9neSUyMGdhZGdldHxlbnwxfHx8fDE3NTg0MDk3Njl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'],
    tags: ['iphone', 'apple', 'smartphone', 'chinhang'],
    price: 29990000,
    stock: 12,
    upvotes: 45,
    downvotes: 3,
    comments: 23,
    timestamp: '2 giờ trước',
    isUpvoted: false,
    isDownvoted: false,
    isSaved: false
  },
  {
    id: '2',
    seller: {
      id: 'seller2',
      name: 'Fashion House',
      avatar: '',
      verified: false
    },
    title: 'Set áo croptop + chân váy xếp ly vintage',
    description: 'Set đồ vintage siêu xinh, chất liệu cotton mềm mại, phù hợp đi làm, đi chơi. Size S, M, L có sẵn.',
    images: ['https://images.unsplash.com/photo-1685464583257-66f61ea61380?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXNoaW9uJTIwY2xvdGhpbmclMjBzdHlsZXxlbnwxfHx8fDE3NTg0NzkyMDh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'],
    tags: ['fashion', 'vintage', 'croptop', 'chancay'],
    priceRange: { min: 299000, max: 399000 },
    stock: 25,
    upvotes: 28,
    downvotes: 1,
    comments: 12,
    timestamp: '4 giờ trước',
    isUpvoted: true,
    isDownvoted: false,
    isSaved: true
  },
  {
    id: '3',
    seller: {
      id: 'seller3',
      name: 'Foodie Corner',
      avatar: '',
      verified: true
    },
    title: 'Bánh mì chả cá Hà Nội - Giao tận nơi',
    description: 'Bánh mì chả cá Hà Nội đúng vị, làm từ cá tươi, gia vị truyền thống. Giao hàng trong 30 phút.',
    images: ['https://images.unsplash.com/photo-1600555379885-08a02224726d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmb29kJTIwcmVzdGF1cmFudCUyMG1lYWx8ZW58MXx8fHwxNzU4NDcxMzIzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'],
    tags: ['food', 'banhmi', 'hanoi', 'delivery'],
    price: 25000,
    stock: 50,
    upvotes: 67,
    downvotes: 2,
    comments: 34,
    timestamp: '1 ngày trước',
    isUpvoted: false,
    isDownvoted: false,
    isSaved: false
  }
];

const trendingTags = [
  { tag: 'iphone', count: 234 },
  { tag: 'fashion', count: 189 },
  { tag: 'food', count: 156 },
  { tag: 'vintage', count: 98 },
  { tag: 'tech', count: 87 }
];

const categories = [
  'Điện tử',
  'Thời trang',
  'Đồ ăn',
  'Nhà cửa',
  'Sách',
  'Thể thao',
  'Làm đẹp'
];

const suggestedSellers = [
  { id: '1', name: 'TechWorld VN', followers: '12.5K', verified: true },
  { id: '2', name: 'Fashion Boutique', followers: '8.2K', verified: false },
  { id: '3', name: 'Home Decor Plus', followers: '6.7K', verified: true }
];

export function HomePage() {
  const [sortBy, setSortBy] = useState('newest');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [posts, setPosts] = useState(mockPosts);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleSortChange = (value: string) => {
    setSortBy(value);
    let sortedPosts = [...posts];
    
    switch (value) {
      case 'best':
        sortedPosts.sort((a, b) => b.upvotes - a.upvotes);
        break;
      case 'worst':
        sortedPosts.sort((a, b) => b.downvotes - a.downvotes);
        break;
      case 'newest':
      default:
        // Keep original order for newest
        break;
    }
    
    setPosts(sortedPosts);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header onMobileMenuOpen={() => setIsMobileMenuOpen(true)} />
      
      <div className="container max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Sidebar - Hidden on Mobile */}
          <aside className="lg:col-span-3 space-y-6 hidden lg:block">
            {/* Filters */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2">
                  <Filter className="w-4 h-4" />
                  Bộ lọc
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Sắp xếp</label>
                  <Select value={sortBy} onValueChange={handleSortChange}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="newest">Mới nhất</SelectItem>
                      <SelectItem value="best">Tốt nhất</SelectItem>
                      <SelectItem value="worst">Tệ nhất</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <label className="text-sm font-medium mb-2 block">Danh mục</label>
                  <div className="grid grid-cols-1 gap-1">
                    <Button 
                      variant={selectedCategory === 'all' ? 'default' : 'ghost'} 
                      className="justify-start"
                      onClick={() => setSelectedCategory('all')}
                    >
                      Tất cả
                    </Button>
                    {categories.map((category) => (
                      <Button 
                        key={category}
                        variant={selectedCategory === category ? 'default' : 'ghost'} 
                        className="justify-start"
                        onClick={() => setSelectedCategory(category)}
                      >
                        {category}
                      </Button>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Trending Hashtags */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-4 h-4" />
                  Hashtag thịnh hành
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {trendingTags.map((item, index) => (
                    <div key={item.tag} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-muted-foreground">
                          {index + 1}
                        </span>
                        <Badge variant="secondary" className="gap-1">
                          <Hash className="w-3 h-3" />
                          {item.tag}
                        </Badge>
                      </div>
                      <span className="text-sm text-muted-foreground">
                        {item.count}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </aside>

          {/* Main Feed */}
          <main className="lg:col-span-6 col-span-1 space-y-6">
            {/* Mobile Sort Filter */}
            <div className="lg:hidden">
              <Card className="p-4">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium">Sắp xếp theo:</label>
                  <Select value={sortBy} onValueChange={handleSortChange}>
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="newest">Mới nhất</SelectItem>
                      <SelectItem value="best">Tốt nhất</SelectItem>
                      <SelectItem value="worst">Tệ nhất</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </Card>
            </div>

            {/* Create Post */}
            <Card className="border-dashed border-2 hover:border-primary/50 transition-smooth cursor-pointer">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                    <Plus className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">Chia sẻ sản phẩm của bạn</p>
                    <p className="text-sm text-muted-foreground">
                      Bắt đầu bán hoặc chia sẻ những gì bạn có...
                    </p>
                  </div>
                  <Button className="bg-primary hover:bg-primary-dark hidden sm:flex">
                    Đăng bán
                  </Button>
                  <Button size="sm" className="bg-primary hover:bg-primary-dark sm:hidden">
                    Đăng
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Posts Feed */}
            <div className="space-y-6">
              {posts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>

            {/* Load More */}
            <div className="text-center py-6">
              <Button variant="outline" className="px-8">
                Tải thêm bài viết
              </Button>
            </div>
          </main>

          {/* Right Sidebar - Hidden on Mobile */}
          <aside className="lg:col-span-3 space-y-6 hidden lg:block">
            {/* Suggested Sellers */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle>Người bán đề xuất</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {suggestedSellers.map((seller) => (
                    <div key={seller.id} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-muted rounded-full flex items-center justify-center">
                          <span className="font-medium">{seller.name[0]}</span>
                        </div>
                        <div>
                          <div className="flex items-center gap-1">
                            <p className="font-medium text-sm">{seller.name}</p>
                            {seller.verified && (
                              <Badge variant="secondary" className="text-xs px-1 py-0">
                                ✓
                              </Badge>
                            )}
                          </div>
                          <p className="text-xs text-muted-foreground">
                            {seller.followers} người theo dõi
                          </p>
                        </div>
                      </div>
                      <Button size="sm" variant="outline">
                        Theo dõi
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Promotion */}
            <Card className="bg-gradient-to-br from-primary/10 to-accent/20">
              <CardContent className="p-6 text-center">
                <h3 className="font-semibold mb-2">Bắt đầu bán hàng</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Tham gia cộng đồng bán hàng lớn nhất Việt Nam
                </p>
                <Button className="w-full bg-primary hover:bg-primary-dark">
                  Tạo cửa hàng
                </Button>
              </CardContent>
            </Card>
          </aside>
        </div>
      </div>

      {/* Mobile Menu */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        sortBy={sortBy}
        onSortChange={handleSortChange}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        categories={categories}
        trendingTags={trendingTags}
      />
    </div>
  );
}