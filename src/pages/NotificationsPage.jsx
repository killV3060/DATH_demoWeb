import React, { useState } from 'react';
import {
  Bell,
  Hash,
  Tag,
  ShoppingBag,
  UserPlus,
  Settings,
  Check,
  Trash2,
  Filter
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar';
import { Separator } from '../components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { useRouter } from '../components/AppRouter';
import { Header } from '../components/Header';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../components/ui/dropdown-menu';

// Mock notifications data
const mockNotifications = [
  {
    id: '1',
    type: 'mention',
    title: 'Bạn được nhắc đến trong bình luận',
    message: 'TechStore VN đã nhắc đến bạn trong bình luận của bài đăng "iPhone 15 Pro Max"',
    timestamp: '2 phút trước',
    isRead: false,
    avatar: '',
    actionUrl: '/product/1',
    icon: Tag
  },
  {
    id: '2',
    type: 'hashtag',
    title: 'Bài viết mới với hashtag #smartphone',
    message: '3 bài viết mới được đăng với hashtag #smartphone mà bạn đang theo dõi',
    timestamp: '15 phút trước',
    isRead: false,
    icon: Hash,
    count: 3
  },
  {
    id: '3',
    type: 'saved_post',
    title: 'Sản phẩm đã lưu được cập nhật',
    message: 'Giá của "Set áo croptop + chân váy vintage" đã giảm từ 399.000đ xuống 299.000đ',
    timestamp: '1 giờ trước',
    isRead: false,
    icon: ShoppingBag,
    priceChange: { from: 399000, to: 299000 }
  },
  {
    id: '4',
    type: 'follow',
    title: 'Có người mới theo dõi bạn',
    message: 'Fashion Lover và 2 người khác đã bắt đầu theo dõi cửa hàng của bạn',
    timestamp: '2 giờ trước',
    isRead: true,
    avatar: '',
    icon: UserPlus,
    count: 3
  },
  {
    id: '5',
    type: 'saved_post',
    title: 'Sản phẩm đã lưu bị xóa',
    message: 'Bài đăng "Áo hoodie vintage" mà bạn đã lưu đã bị người đăng xóa',
    timestamp: '3 giờ trước',
    isRead: true,
    icon: Trash2,
    isDeleted: true
  },
  {
    id: '6',
    type: 'hashtag',
    title: 'Bài viết mới với hashtag #fashion',
    message: '5 bài viết mới được đăng với hashtag #fashion mà bạn đang theo dõi',
    timestamp: '5 giờ trước',
    isRead: true,
    icon: Hash,
    count: 5
  },
  {
    id: '7',
    type: 'system',
    title: 'Cập nhật chính sách mới',
    message: 'Chúng tôi đã cập nhật chính sách bảo mật và điều khoản sử dụng. Vui lòng xem chi tiết.',
    timestamp: '1 ngày trước',
    isRead: true,
    icon: Settings
  }
];

export default function NotificationsPage() {
  
  const { navigate } = useRouter();
  const [notifications, setNotifications] = useState(mockNotifications);
  const [activeTab, setActiveTab] = useState('all');

  const handleMarkAsRead = (id) => {
    setNotifications(notifications.map(notif =>
      notif.id === id ? { ...notif, isRead: true } : notif
    ));
  };

  const handleMarkAllAsRead = () => {
    setNotifications(notifications.map(notif => ({ ...notif, isRead: true })));
  };

  const handleDeleteNotification = (id) => {
    setNotifications(notifications.filter(notif => notif.id !== id));
  };

  const handleNotificationClick = (notification) => {
    if (!notification.isRead) {
      handleMarkAsRead(notification.id);
    }
    if (notification.actionUrl) {
      navigate('product', { postId: notification.actionUrl.split('/').pop() });
    }
  };

  const getFilteredNotifications = (type) => {
    switch (type) {
      case 'mentions':
        return notifications.filter(n => n.type === 'mention');
      case 'hashtags':
        return notifications.filter(n => n.type === 'hashtag');
      case 'system':
        return notifications.filter(n => n.type === 'system');
      default:
        return notifications;
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price);
  };

  const getTimeGroup = (timestamp) => {
    if (timestamp.includes('phút') || timestamp.includes('giờ')) {
      return 'Hôm nay';
    } else if (timestamp.includes('ngày') && parseInt(timestamp) === 1) {
      return 'Hôm qua';
    } else {
      return 'Trước đó';
    }
  };

  const groupNotificationsByTime = (notifs) => {
    return notifs.reduce((groups, notification) => {
      const group = getTimeGroup(notification.timestamp);
      if (!groups[group]) {
        groups[group] = [];
      }
      groups[group].push(notification);
      return groups;
    }, {});
  };

  const unreadCount = notifications.filter(n => !n.isRead).length;
  const filteredNotifications = getFilteredNotifications(activeTab);
  const groupedNotifications = groupNotificationsByTime(filteredNotifications);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="container max-w-4xl mx-auto px-4 py-6">
        <div className="space-y-6">
          {/* Header */}
          <div className="flex flex-col space-y-4">
            <div>
              <h1 className="text-2xl font-semibold">Thông báo</h1>
              {unreadCount > 0 && (
                <p className="text-muted-foreground hidden sm:block">
                  Bạn có {unreadCount} thông báo chưa đọc
                </p>
              )}
            </div>

            {/* Mobile Action Buttons */}
            <div className="grid grid-cols-2 gap-2 sm:hidden">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="w-full">
                    <Filter className="w-4 h-4 mr-2" />
                    Lọc
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem onClick={() => setActiveTab('all')}>
                    Tất cả
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setActiveTab('mentions')}>
                    Nhắc đến tôi
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setActiveTab('hashtags')}>
                    Hashtag theo dõi
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setActiveTab('system')}>
                    Hệ thống
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              {unreadCount > 0 ? (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleMarkAllAsRead}
                  className="w-full"
                >
                  <Check className="w-4 h-4 mr-2" />
                  Đánh dấu đã đọc
                </Button>
              ) : (
                <Button variant="outline" size="sm" onClick={() => navigate('profile')} className="w-full">
                  <Settings className="w-4 h-4 mr-2" />
                  Cài đặt
                </Button>
              )}
            </div>

            {/* Desktop Action Buttons */}
            <div className="hidden sm:flex items-center justify-end space-x-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm">
                    <Filter className="w-4 h-4 mr-2" />
                    Lọc
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem onClick={() => setActiveTab('all')}>
                    Tất cả
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setActiveTab('mentions')}>
                    Nhắc đến tôi
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setActiveTab('hashtags')}>
                    Hashtag theo dõi
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setActiveTab('system')}>
                    Hệ thống
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              {unreadCount > 0 && (
                <Button variant="outline" size="sm" onClick={handleMarkAllAsRead}>
                  <Check className="w-4 h-4 mr-2" />
                  Đánh dấu tất cả đã đọc
                </Button>
              )}

              <Button variant="outline" size="sm" onClick={() => navigate('profile')}>
                <Settings className="w-4 h-4 mr-2" />
                Cài đặt thông báo
              </Button>
            </div>
          </div>

          {/* Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="all" className="relative">
                Tất cả
                {unreadCount > 0 && (
                  <Badge variant="destructive" className="ml-1 h-4 w-4 text-xs flex items-center justify-center">
                    {unreadCount}
                  </Badge>
                )}
              </TabsTrigger>
              <TabsTrigger value="mentions">Nhắc đến</TabsTrigger>
              <TabsTrigger value="hashtags">Hashtag</TabsTrigger>
              <TabsTrigger value="system">Hệ thống</TabsTrigger>
            </TabsList>

            <TabsContent value={activeTab} className="space-y-6 mt-6">
              {Object.entries(groupedNotifications).map(([timeGroup, notifs]) => (
                <div key={timeGroup}>
                  <h3 className="font-medium text-sm text-muted-foreground mb-3">{timeGroup}</h3>
                  <Card>
                    <CardContent className="p-0">
                      <div className="divide-y">
                        {notifs.map((notification) => {
                          const IconComponent = notification.icon;
                          return (
                            <div
                              key={notification.id}
                              className={`p-4 hover:bg-muted/50 cursor-pointer transition ${
                                !notification.isRead ? 'bg-primary/5 border-l-4 border-l-primary' : ''
                              }`}
                              onClick={() => handleNotificationClick(notification)}
                            >
                              <div className="flex items-start space-x-3">
                                <div
                                  className={`p-2 rounded-full flex-shrink-0 ${
                                    notification.type === 'mention'
                                      ? 'bg-blue-100 text-blue-600'
                                      : notification.type === 'hashtag'
                                      ? 'bg-green-100 text-green-600'
                                      : notification.type === 'saved_post'
                                      ? 'bg-orange-100 text-orange-600'
                                      : notification.type === 'follow'
                                      ? 'bg-purple-100 text-purple-600'
                                      : 'bg-gray-100 text-gray-600'
                                  }`}
                                >
                                  <IconComponent className="w-4 h-4" />
                                </div>

                                <div className="flex-1 min-w-0">
                                  <div className="flex items-start justify-between">
                                    <div className="flex-1 pr-2">
                                      <h4 className="font-medium text-sm mb-1">
                                        {notification.title}
                                        {notification.count && (
                                          <Badge variant="secondary" className="ml-2 text-xs">
                                            {notification.count}
                                          </Badge>
                                        )}
                                      </h4>
                                      <p className="text-sm text-muted-foreground mb-2">
                                        {notification.message}
                                      </p>

                                      {notification.priceChange && (
                                        <div className="flex items-center space-x-2 mb-2 flex-wrap">
                                          <span className="text-sm line-through text-muted-foreground">
                                            {formatPrice(notification.priceChange.from)}
                                          </span>
                                          <span className="text-sm font-medium text-primary">
                                            {formatPrice(notification.priceChange.to)}
                                          </span>
                                          <Badge variant="secondary" className="text-xs">
                                            Giảm giá
                                          </Badge>
                                        </div>
                                      )}

                                      <div className="flex items-center justify-between flex-wrap gap-2">
                                        <span className="text-xs text-muted-foreground">
                                          {notification.timestamp}
                                        </span>

                                        {notification.isDeleted && (
                                          <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={(e) => {
                                              e.stopPropagation();
                                            }}
                                            className="text-xs"
                                          >
                                            Xem tương tự
                                          </Button>
                                        )}

                                        {notification.actionUrl && !notification.isDeleted && (
                                          <Button variant="outline" size="sm" className="text-xs">
                                            Chi tiết
                                          </Button>
                                        )}
                                      </div>
                                    </div>

                                    <div className="flex items-center space-x-2 ml-2 flex-shrink-0">
                                      {!notification.isRead && (
                                        <div className="w-2 h-2 bg-primary rounded-full"></div>
                                      )}

                                      <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                            <Settings className="h-3 w-3" />
                                          </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end">
                                          {!notification.isRead && (
                                            <DropdownMenuItem
                                              onClick={(e) => {
                                                e.stopPropagation();
                                                handleMarkAsRead(notification.id);
                                              }}
                                            >
                                              <Check className="w-4 h-4 mr-2" />
                                              Đánh dấu đã đọc
                                            </DropdownMenuItem>
                                          )}
                                          <DropdownMenuItem
                                            onClick={(e) => {
                                              e.stopPropagation();
                                              handleDeleteNotification(notification.id);
                                            }}
                                            className="text-destructive"
                                          >
                                            <Trash2 className="w-4 h-4 mr-2" />
                                            Xóa thông báo
                                          </DropdownMenuItem>
                                        </DropdownMenuContent>
                                      </DropdownMenu>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ))}

              {filteredNotifications.length === 0 && (
                <Card>
                  <CardContent className="py-12 text-center">
                    <Bell className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="font-medium mb-2">Không có thông báo</h3>
                    <p className="text-sm text-muted-foreground">
                      Bạn sẽ nhận được thông báo khi có hoạt động mới
                    </p>
                  </CardContent>
                </Card>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
