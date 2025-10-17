import React, { useState } from 'react';
import { Package, Search, Filter, ShoppingBag } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Card, CardContent } from '../components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar';
import { Input } from '../components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../components/ui/select';
import { Header } from '../components/Header';
import { useRouter } from '../components/AppRouter';
import { OrderDetailModal } from '../components/OrderDetailModal';

// Mock data (React thuần)
const mockOrders = [
  {
    id: '1',
    orderCode: 'ORD12345',
    date: '15/03/2024',
    seller: {
      id: 's1',
      name: 'TechStore VN',
      avatar: '',
    },
    products: [
      {
        id: 'p1',
        name: 'iPhone 15 Pro Max 256GB',
        image: 'https://images.unsplash.com/photo-1598860237986-013eede8beae?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzbWFydHBob25lJTIwdGVjaG5vbG9neSUyMGdhZGdldHxlbnwxfHx8fDE3NTg0MDk3Njl8MA&ixlib=rb-4.1.0&q=80&w=1080',
        variant: 'Titan Tự Nhiên',
        quantity: 1,
        price: 29990000,
      },
      {
        id: 'p2',
        name: 'AirPods Pro Gen 2',
        image: 'https://images.unsplash.com/photo-1598860237986-013eede8beae?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzbWFydHBob25lJTIwdGVjaG5vbG9neSUyMGdhZGdldHxlbnwxfHx8fDE3NTg0MDk3Njl8MA&ixlib=rb-4.1.0&q=80&w=1080',
        variant: 'USB-C',
        quantity: 1,
        price: 6490000,
      },
    ],
    totalAmount: 36480000,
    status: 'completed',
    shippingInfo: {
      address: '123 Đường ABC, Phường XYZ, Quận 1, TP.HCM',
      recipient: 'Nguyễn Văn A',
      phone: '0901234567',
    },
    paymentMethod: 'COD',
    timeline: {
      ordered: '15/03/2024 10:30',
      processing: '15/03/2024 14:20',
      shipping: '16/03/2024 08:00',
      completed: '17/03/2024 15:45',
    },
  },
  {
    id: '2',
    orderCode: 'ORD12346',
    date: '18/03/2024',
    seller: {
      id: 's2',
      name: 'Fashion House',
      avatar: '',
    },
    products: [
      {
        id: 'p3',
        name: 'Áo Khoác Nam Cao Cấp',
        image: 'https://images.unsplash.com/photo-1598860237986-013eede8beae?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzbWFydHBob25lJTIwdGVjaG5vbG9neSUyMGdhZGdldHxlbnwxfHx8fDE3NTg0MDk3Njl8MA&ixlib=rb-4.1.0&q=80&w=1080',
        variant: 'Size L - Đen',
        quantity: 2,
        price: 850000,
      },
    ],
    totalAmount: 1700000,
    status: 'shipping',
    shippingInfo: {
      address: '456 Đường DEF, Phường GHI, Quận 3, TP.HCM',
      recipient: 'Trần Thị B',
      phone: '0907654321',
    },
    paymentMethod: 'Chuyển khoản',
    timeline: {
      ordered: '18/03/2024 09:15',
      processing: '18/03/2024 11:00',
      shipping: '19/03/2024 07:30',
    },
  },
  {
    id: '3',
    orderCode: 'ORD12347',
    date: '20/03/2024',
    seller: {
      id: 's3',
      name: 'Laptop Pro Store',
      avatar: '',
    },
    products: [
      {
        id: 'p4',
        name: 'MacBook Air M2',
        image: 'https://images.unsplash.com/photo-1598860237986-013eede8beae?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzbWFydHBob25lJTIwdGVjaG5vbG9neSUyMGdhZGdldHxlbnwxfHx8fDE3NTg0MDk3Njl8MA&ixlib=rb-4.1.0&q=80&w=1080',
        variant: '16GB RAM - 512GB SSD',
        quantity: 1,
        price: 32990000,
      },
    ],
    totalAmount: 32990000,
    status: 'processing',
    shippingInfo: {
      address: '789 Đường JKL, Phường MNO, Quận 7, TP.HCM',
      recipient: 'Lê Văn C',
      phone: '0909876543',
    },
    paymentMethod: 'Ví điện tử',
    timeline: {
      ordered: '20/03/2024 14:20',
      processing: '20/03/2024 16:00',
    },
  },
];

// Cấu hình trạng thái
const statusConfig = {
  all: { label: 'Tất cả', color: 'default' },
  processing: { label: 'Đang xử lý', color: 'default' },
  shipping: { label: 'Đang giao', color: 'secondary' },
  completed: { label: 'Hoàn tất', color: 'default' },
  cancelled: { label: 'Đã hủy', color: 'destructive' },
};

export default function OrderHistoryPage() {
  const { navigate } = useRouter();
  const [statusFilter, setStatusFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedOrder, setSelectedOrder] = useState(null);

  const filteredOrders = mockOrders.filter((order) => {
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    const matchesSearch =
      searchQuery === '' ||
      order.orderCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.seller.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const getStatusBadgeVariant = (status) => {
    switch (status) {
      case 'completed':
        return 'default';
      case 'shipping':
        return 'secondary';
      case 'cancelled':
        return 'destructive';
      default:
        return 'outline';
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(amount);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container max-w-6xl mx-auto px-4 py-6">

        {/* Breadcrumb */}
        <div className="mb-6 text-sm text-muted-foreground">
          <span className="cursor-pointer hover:text-foreground" onClick={() => navigate('home')}>
            Trang chủ
          </span>
          {' > '}
          <span className="cursor-pointer hover:text-foreground" onClick={() => navigate('profile')}>
            Cá nhân
          </span>
          {' > '}
          <span className="text-foreground">Lịch sử đơn hàng</span>
        </div>

        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-2">Lịch sử đơn hàng</h1>
          <p className="text-muted-foreground">Quản lý và theo dõi các đơn hàng của bạn</p>
        </div>

        {/* Filter */}
        <div className="mb-6 flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              type="text"
              placeholder="Tìm kiếm mã đơn hàng, tên shop..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={statusFilter} onValueChange={(value) => setStatusFilter(value)}>
            <SelectTrigger className="w-full sm:w-[200px]">
              <Filter className="w-4 h-4 mr-2" />
              <SelectValue placeholder="Lọc theo trạng thái" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tất cả</SelectItem>
              <SelectItem value="processing">Đang xử lý</SelectItem>
              <SelectItem value="shipping">Đang giao</SelectItem>
              <SelectItem value="completed">Hoàn tất</SelectItem>
              <SelectItem value="cancelled">Đã hủy</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Danh sách đơn hàng */}
        {filteredOrders.length === 0 ? (
          <Card>
            <CardContent className="py-16 text-center">
              <ShoppingBag className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="font-medium text-lg mb-2">
                {searchQuery || statusFilter !== 'all'
                  ? 'Không tìm thấy đơn hàng nào'
                  : 'Bạn chưa có đơn hàng nào'}
              </h3>
              <p className="text-sm text-muted-foreground mb-6">
                {searchQuery || statusFilter !== 'all'
                  ? 'Thử thay đổi bộ lọc hoặc từ khóa tìm kiếm'
                  : 'Khám phá các sản phẩm để mua hàng đầu tiên'}
              </p>
              {!searchQuery && statusFilter === 'all' && (
                <Button onClick={() => navigate('home')}>
                  Khám phá sản phẩm
                </Button>
              )}
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {filteredOrders.map((order) => (
              <Card key={order.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4">
                    <div className="flex items-center gap-4 mb-2 sm:mb-0">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-semibold">#{order.orderCode}</span>
                          <Badge variant={getStatusBadgeVariant(order.status)}>
                            {statusConfig[order.status].label}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">
                          Đặt ngày {order.date}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold text-lg text-primary">
                        {formatCurrency(order.totalAmount)}
                      </div>
                    </div>
                  </div>

                  {/* Seller */}
                  <div className="flex items-center gap-2 mb-4 pb-4 border-b">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={order.seller.avatar} />
                      <AvatarFallback>{order.seller.name[0]}</AvatarFallback>
                    </Avatar>
                    <span className="text-sm font-medium">{order.seller.name}</span>
                  </div>

                  {/* Product preview */}
                  <div className="mb-4">
                    <div className="flex items-center gap-3">
                      {order.products.slice(0, 2).map((product, index) => (
                        <div key={product.id} className="flex items-center gap-2">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-16 h-16 object-cover rounded-md border"
                          />
                          {index === 1 && order.products.length > 2 && (
                            <div className="text-sm text-muted-foreground">
                              +{order.products.length - 2} sản phẩm khác
                            </div>
                          )}
                        </div>
                      ))}
                      {order.products.length === 1 && (
                        <div className="ml-2">
                          <p className="text-sm font-medium line-clamp-1">
                            {order.products[0].name}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {order.products[0].variant}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-wrap gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setSelectedOrder(order)}
                    >
                      Xem chi tiết
                    </Button>
                    {order.status === 'completed' && (
                      <>
                        <Button variant="outline" size="sm">
                          Mua lại
                        </Button>
                        <Button variant="outline" size="sm">
                          Đánh giá
                        </Button>
                      </>
                    )}
                    <Button variant="outline" size="sm">
                      Liên hệ shop
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Modal chi tiết đơn hàng */}
      {selectedOrder && (
        <OrderDetailModal
          order={selectedOrder}
          open={!!selectedOrder}
          onClose={() => setSelectedOrder(null)}
        />
      )}
    </div>
  );
}
