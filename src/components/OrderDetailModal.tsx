import { Package, Truck, CheckCircle, XCircle, MapPin, CreditCard, Phone } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Separator } from './ui/separator';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';

type OrderStatus = 'all' | 'processing' | 'shipping' | 'completed' | 'cancelled';

interface OrderDetailModalProps {
  order: {
    id: string;
    orderCode: string;
    date: string;
    seller: {
      id: string;
      name: string;
      avatar: string;
    };
    products: {
      id: string;
      name: string;
      image: string;
      variant: string;
      quantity: number;
      price: number;
    }[];
    totalAmount: number;
    status: OrderStatus;
    shippingInfo: {
      address: string;
      recipient: string;
      phone: string;
    };
    paymentMethod: string;
    timeline: {
      ordered: string;
      processing?: string;
      shipping?: string;
      completed?: string;
      cancelled?: string;
    };
  };
  open: boolean;
  onClose: () => void;
}

const statusConfig = {
  all: { label: 'Tất cả', color: 'default' as const },
  processing: { label: 'Đang xử lý', color: 'default' as const },
  shipping: { label: 'Đang giao', color: 'secondary' as const },
  completed: { label: 'Hoàn tất', color: 'default' as const },
  cancelled: { label: 'Đã hủy', color: 'destructive' as const },
};

export function OrderDetailModal({ order, open, onClose }: OrderDetailModalProps) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(amount);
  };

  const subtotal = order.products.reduce((sum, product) => sum + (product.price * product.quantity), 0);
  const shippingFee = 30000;
  const discount = 0;

  const getStatusBadgeVariant = (status: OrderStatus) => {
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

  const TimelineStep = ({ 
    icon: Icon, 
    title, 
    time, 
    isActive, 
    isCompleted 
  }: { 
    icon: any; 
    title: string; 
    time?: string; 
    isActive?: boolean; 
    isCompleted?: boolean;
  }) => (
    <div className="flex gap-3">
      <div className="flex flex-col items-center">
        <div
          className={`w-10 h-10 rounded-full flex items-center justify-center ${
            isCompleted
              ? 'bg-green-500 text-white'
              : isActive
              ? 'bg-blue-500 text-white'
              : 'bg-muted text-muted-foreground'
          }`}
        >
          <Icon className="w-5 h-5" />
        </div>
        <div className="flex-1 w-0.5 bg-muted mt-2 mb-2 h-8" />
      </div>
      <div className="pb-8 flex-1">
        <p className={`font-medium ${isActive ? 'text-blue-600' : ''}`}>
          {title}
        </p>
        {time && (
          <p className="text-sm text-muted-foreground mt-1">{time}</p>
        )}
      </div>
    </div>
  );

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <div>
              <DialogTitle className="flex items-center gap-2">
                Đơn hàng #{order.orderCode}
                <Badge variant={getStatusBadgeVariant(order.status)}>
                  {statusConfig[order.status].label}
                </Badge>
              </DialogTitle>
              <p className="text-sm text-muted-foreground mt-1">
                Đặt ngày {order.date}
              </p>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          {/* Seller Info */}
          <div>
            <h3 className="font-semibold mb-3">Thông tin người bán</h3>
            <div className="flex items-center gap-3 p-3 border rounded-lg">
              <Avatar className="h-10 w-10">
                <AvatarImage src={order.seller.avatar} />
                <AvatarFallback>{order.seller.name[0]}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <p className="font-medium">{order.seller.name}</p>
              </div>
              <Button variant="outline" size="sm">
                Liên hệ
              </Button>
            </div>
          </div>

          <Separator />

          {/* Products */}
          <div>
            <h3 className="font-semibold mb-3">Sản phẩm ({order.products.length})</h3>
            <div className="space-y-3">
              {order.products.map((product) => (
                <div
                  key={product.id}
                  className="flex gap-3 p-3 border rounded-lg hover:bg-accent transition-colors"
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-20 h-20 object-cover rounded-md"
                  />
                  <div className="flex-1">
                    <p className="font-medium line-clamp-2">{product.name}</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      {product.variant}
                    </p>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-sm text-muted-foreground">
                        x{product.quantity}
                      </span>
                      <span className="font-semibold text-primary">
                        {formatCurrency(product.price)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <Separator />

          {/* Shipping Info */}
          <div>
            <h3 className="font-semibold mb-3 flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              Thông tin giao hàng
            </h3>
            <div className="p-3 border rounded-lg bg-muted/50">
              <p className="font-medium">{order.shippingInfo.recipient}</p>
              <p className="text-sm text-muted-foreground mt-1 flex items-center gap-2">
                <Phone className="w-3 h-3" />
                {order.shippingInfo.phone}
              </p>
              <p className="text-sm text-muted-foreground mt-2">
                {order.shippingInfo.address}
              </p>
            </div>
          </div>

          <Separator />

          {/* Payment Summary */}
          <div>
            <h3 className="font-semibold mb-3 flex items-center gap-2">
              <CreditCard className="w-4 h-4" />
              Thanh toán
            </h3>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Tạm tính:</span>
                <span>{formatCurrency(subtotal)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Phí vận chuyển:</span>
                <span>{formatCurrency(shippingFee)}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-sm text-green-600">
                  <span>Giảm giá:</span>
                  <span>-{formatCurrency(discount)}</span>
                </div>
              )}
              <Separator />
              <div className="flex justify-between font-semibold text-lg">
                <span>Tổng cộng:</span>
                <span className="text-primary">{formatCurrency(order.totalAmount)}</span>
              </div>
              <div className="flex justify-between text-sm mt-2">
                <span className="text-muted-foreground">Phương thức thanh toán:</span>
                <span className="font-medium">{order.paymentMethod}</span>
              </div>
            </div>
          </div>

          <Separator />

          {/* Timeline */}
          <div>
            <h3 className="font-semibold mb-4">Trạng thái đơn hàng</h3>
            <div className="ml-2">
              <TimelineStep
                icon={Package}
                title="Đã đặt hàng"
                time={order.timeline.ordered}
                isCompleted={!!order.timeline.ordered}
              />
              <TimelineStep
                icon={Package}
                title="Đang xử lý"
                time={order.timeline.processing}
                isCompleted={!!order.timeline.processing}
                isActive={order.status === 'processing' && !order.timeline.shipping}
              />
              <TimelineStep
                icon={Truck}
                title="Đang giao hàng"
                time={order.timeline.shipping}
                isCompleted={!!order.timeline.shipping}
                isActive={order.status === 'shipping' && !order.timeline.completed}
              />
              {order.status === 'cancelled' ? (
                <div className="flex gap-3">
                  <div className="flex flex-col items-center">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center bg-destructive text-white">
                      <XCircle className="w-5 h-5" />
                    </div>
                  </div>
                  <div className="pb-2 flex-1">
                    <p className="font-medium text-destructive">Đã hủy</p>
                    {order.timeline.cancelled && (
                      <p className="text-sm text-muted-foreground mt-1">
                        {order.timeline.cancelled}
                      </p>
                    )}
                  </div>
                </div>
              ) : (
                <div className="flex gap-3">
                  <div className="flex flex-col items-center">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        order.timeline.completed
                          ? 'bg-green-500 text-white'
                          : 'bg-muted text-muted-foreground'
                      }`}
                    >
                      <CheckCircle className="w-5 h-5" />
                    </div>
                  </div>
                  <div className="pb-2 flex-1">
                    <p className={`font-medium ${order.timeline.completed ? 'text-green-600' : ''}`}>
                      Hoàn tất
                    </p>
                    {order.timeline.completed && (
                      <p className="text-sm text-muted-foreground mt-1">
                        {order.timeline.completed}
                      </p>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-2 pt-4">
            {order.status === 'completed' ? (
              <>
                <Button className="flex-1">Mua lại</Button>
                <Button variant="outline" className="flex-1">
                  Đánh giá sản phẩm
                </Button>
              </>
            ) : order.status !== 'cancelled' ? (
              <>
                <Button variant="outline" className="flex-1">
                  Liên hệ shop
                </Button>
                <Button variant="destructive" className="flex-1">
                  Hủy đơn
                </Button>
              </>
            ) : (
              <Button className="flex-1">Mua lại</Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
