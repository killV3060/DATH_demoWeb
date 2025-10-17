import React, { useState } from 'react';
import { Search, Camera, Wallet, Bell, Menu, Sun, Moon, User, Settings, ShoppingBag } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Badge } from './ui/badge';
import { useRouter } from './AppRouter';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';

interface HeaderProps {
  onMobileMenuOpen?: () => void;
}

export function Header({ onMobileMenuOpen }: HeaderProps) {
  const { navigate, user, setAuthenticated, isGuest, setGuest } = useRouter();
  const [isDark, setIsDark] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle('dark');
  };

  const handleLogout = () => {
    if (isGuest) {
      setGuest(false);
      navigate('login');
    } else {
      setAuthenticated(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle search logic here
    console.log('Search:', searchQuery);
  };

  const handleNotificationsClick = () => {
    if (isGuest) {
      navigate('register');
      return;
    }
    navigate('notifications');
  };

  const handleProfileClick = () => {
    if (isGuest) {
      navigate('register');
      return;
    }
    navigate('profile');
  };

  const handleAvatarClick = () => {
    if (isGuest) {
      navigate('register');
      return;
    }
    navigate('profile');
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <div className="flex items-center space-x-4">
          <button
            onClick={() => navigate('home')}
            className="flex items-center space-x-2 transition-smooth hover:opacity-80"
          >
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold">M</span>
            </div>
            <span className="font-semibold text-lg hidden md:inline">Marketplace</span>
          </button>
        </div>

        {/* Search Bar */}
        <div className="flex-1 max-w-md mx-4">
          <form onSubmit={handleSearch} className="relative">
            <Input
              type="text"
              placeholder="Tìm kiếm #hashtag, @seller, sản phẩm..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-12"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Button
              type="button"
              size="sm"
              variant="ghost"
              className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0"
            >
              <Camera className="w-4 h-4" />
            </Button>
          </form>
        </div>

        {/* Actions */}
        <div className="flex items-center space-x-2">
          {/* Sell Button */}
          <Button variant="outline" size="sm" className="hidden md:flex">
            Đăng bán
          </Button>

          {/* Wallet */}
          <Button variant="ghost" size="sm" className="relative hidden sm:flex">
            <Wallet className="w-4 h-4" />
            <span className="sr-only">Ví</span>
          </Button>

          {/* Orders */}
          <Button
            variant="ghost"
            size="sm"
            className="relative hidden sm:flex"
            onClick={() => {
              if (isGuest) {
                navigate('register');
              } else {
                navigate('orders');
              }
            }}
          >
            <ShoppingBag className="w-4 h-4" />
            <span className="sr-only">Đơn hàng</span>
          </Button>

          {/* Notifications */}
          <Button
            variant="ghost"
            size="sm"
            className="relative"
            onClick={handleNotificationsClick}
          >
            <Bell className="w-4 h-4" />
            {!isGuest && (
              <Badge
                variant="destructive"
                className="absolute -top-1 -right-1 h-5 w-5 text-xs p-0 flex items-center justify-center"
              >
                3
              </Badge>
            )}
            <span className="sr-only">Thông báo</span>
          </Button>

          {/* Theme Toggle */}
          <Button variant="ghost" size="sm" onClick={toggleTheme} className="hidden sm:flex">
            {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            <span className="sr-only">Chuyển chế độ</span>
          </Button>

          {/* Avatar - Click to go to Profile */}
          <Button 
            variant="ghost" 
            className="relative h-8 w-8 rounded-full p-0"
            onClick={handleAvatarClick}
          >
            <Avatar className="h-8 w-8">
              <AvatarImage src={user?.avatar} alt={user?.name} />
              <AvatarFallback>
                {isGuest ? (
                  <span className="text-orange-600">👤</span>
                ) : (
                  <User className="w-4 h-4" />
                )}
              </AvatarFallback>
            </Avatar>
            <span className="sr-only">
              {isGuest ? 'Đăng ký tài khoản' : 'Trang cá nhân'}
            </span>
          </Button>

          {/* Settings/User Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <Settings className="h-4 w-4" />
                <span className="sr-only">Cài đặt</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <div className="flex items-center justify-start gap-2 p-2">
                <div className="flex flex-col space-y-1 leading-none">
                  <p className="font-medium">
                    {isGuest ? 'Khách' : (user?.name || 'User')}
                  </p>
                  <p className="w-[200px] truncate text-sm text-muted-foreground">
                    {isGuest ? 'Đăng ký để sử dụng đầy đủ tính năng' : (user?.email || 'user@example.com')}
                  </p>
                </div>
              </div>
              <DropdownMenuSeparator />
              
              {isGuest ? (
                <>
                  <DropdownMenuItem onClick={() => navigate('register')}>
                    Đăng ký tài khoản
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate('login')}>
                    Đăng nhập
                  </DropdownMenuItem>
                </>
              ) : (
                <>
                  <DropdownMenuItem onClick={handleProfileClick}>
                    Trang cá nhân
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate('orders')}>
                    Lịch sử đơn hàng
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    Cửa hàng của tôi
                  </DropdownMenuItem>
                </>
              )}
              
              <DropdownMenuItem className="sm:hidden">
                Đăng bán
              </DropdownMenuItem>
              <DropdownMenuItem className="sm:hidden">
                Ví
              </DropdownMenuItem>
              <DropdownMenuItem className="sm:hidden" onClick={() => {
                if (isGuest) {
                  navigate('register');
                } else {
                  navigate('orders');
                }
              }}>
                Đơn hàng
              </DropdownMenuItem>
              <DropdownMenuSeparator className="sm:hidden" />
              <DropdownMenuItem onClick={toggleTheme} className="sm:hidden">
                {isDark ? 'Chế độ sáng' : 'Chế độ tối'}
              </DropdownMenuItem>
              <DropdownMenuItem>
                Cài đặt
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout}>
                {isGuest ? 'Thoát chế độ khách' : 'Đăng xuất'}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Mobile Menu Trigger */}
          {onMobileMenuOpen && (
            <Button 
              variant="ghost" 
              size="sm" 
              className="md:hidden"
              onClick={onMobileMenuOpen}
            >
              <Menu className="w-4 h-4" />
              <span className="sr-only">Menu</span>
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}