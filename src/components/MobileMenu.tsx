import React, { useState } from 'react';
import { X, Filter, TrendingUp, Hash } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from './ui/sheet';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  sortBy: string;
  onSortChange: (value: string) => void;
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  categories: string[];
  trendingTags: { tag: string; count: number }[];
}

export function MobileMenu({
  isOpen,
  onClose,
  sortBy,
  onSortChange,
  selectedCategory,
  onCategoryChange,
  categories,
  trendingTags
}: MobileMenuProps) {
  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent side="right" className="w-full sm:w-80 p-0">
        <div className="flex flex-col h-full">
          <SheetHeader className="p-4 border-b">
            <SheetTitle className="flex items-center gap-2">
              <Filter className="w-5 h-5" />
              Bộ lọc & Khám phá
            </SheetTitle>
          </SheetHeader>
          
          <div className="flex-1 overflow-y-auto p-4 space-y-6">
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
                  <Select value={sortBy} onValueChange={onSortChange}>
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
                      onClick={() => {
                        onCategoryChange('all');
                        onClose();
                      }}
                    >
                      Tất cả
                    </Button>
                    {categories.map((category) => (
                      <Button 
                        key={category}
                        variant={selectedCategory === category ? 'default' : 'ghost'} 
                        className="justify-start"
                        onClick={() => {
                          onCategoryChange(category);
                          onClose();
                        }}
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

            {/* Quick Actions */}
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
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}