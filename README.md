# Marketplace Application

## Overview
Ứng dụng marketplace/mạng xã hội thương mại điện tử được xây dựng bằng React + Vite + TypeScript với hệ thống design system hoàn chỉnh sử dụng Radix UI và Tailwind CSS.

## Tính năng chính

### 7 Trang đã hoàn thiện:
1. **Trang đăng nhập (Login)** - Xác thực người dùng
2. **Trang đăng ký (Register)** - Tạo tài khoản mới
3. **Trang chủ (Home)** - Feed sản phẩm và bài viết
4. **Trang sản phẩm (Product)** - Chi tiết sản phẩm
5. **Trang thông báo (Notifications)** - Thông báo hệ thống
6. **Trang cá nhân (Profile)** - Quản lý hồ sơ và bài viết
7. **Trang lịch sử đơn hàng (Order History)** - Quản lý đơn hàng

### Thành phần đặc biệt:
- **Order Detail Modal** - Pop-up chi tiết đơn hàng với timeline trạng thái

## Cấu trúc dự án

```
src/
├── components/
│   ├── ui/               # Thư viện UI components (Radix + shadcn)
│   ├── AppRouter.tsx     # Router tự tạo với context
│   ├── Header.tsx        # Header chính
│   ├── PostCard.tsx      # Card hiển thị sản phẩm
│   ├── OrderDetailModal.tsx  # Modal chi tiết đơn hàng
│   └── ...
├── pages/
│   ├── HomePage.tsx
│   ├── LoginPage.tsx
│   ├── RegisterPage.tsx
│   ├── ProductPage.tsx
│   ├── NotificationsPage.tsx
│   ├── ProfilePage.tsx
│   └── OrderHistoryPage.tsx
└── styles/
    └── globals.css
```

## Công nghệ sử dụng

- **Framework**: React 18 + Vite 6
- **Language**: TypeScript
- **Styling**: Tailwind CSS + @tailwindcss/postcss
- **UI Components**: Radix UI
- **Icons**: Lucide React
- **Forms**: React Hook Form
- **Charts**: Recharts
- **Notifications**: Sonner

## Chạy dự án

```bash
# Development
npm run dev

# Build
npm run build

# Preview production build
npm run start
```

## Các tính năng của trang Lịch sử đơn hàng

### Trang Order History:
- ✅ Breadcrumb navigation (Home > Profile > Orders)
- ✅ Thanh tìm kiếm (mã đơn hàng, tên shop)
- ✅ Bộ lọc theo trạng thái (Tất cả, Đang xử lý, Đang giao, Hoàn tất, Đã hủy)
- ✅ Danh sách đơn hàng với:
  - Mã đơn hàng và ngày đặt
  - Thông tin seller (avatar + tên)
  - Preview sản phẩm (ảnh thumbnail)
  - Tổng tiền và trạng thái (badge màu)
  - Actions: Xem chi tiết, Mua lại, Liên hệ shop, Đánh giá
- ✅ Empty state khi chưa có đơn hàng

### Order Detail Modal:
- ✅ Hiển thị mã đơn + trạng thái
- ✅ Thông tin người bán với button liên hệ
- ✅ Danh sách đầy đủ sản phẩm (ảnh, tên, variant, số lượng, giá)
- ✅ Thông tin giao hàng (địa chỉ, người nhận, SĐT)
- ✅ Chi tiết thanh toán (tạm tính, phí ship, giảm giá, tổng cộng)
- ✅ Timeline trạng thái đơn hàng với icon (Đã đặt → Đang xử lý → Đang giao → Hoàn tất/Đã hủy)
- ✅ Actions phù hợp theo trạng thái:
  - Đơn chưa hoàn tất: Hủy đơn, Liên hệ shop
  - Đơn đã hoàn tất: Mua lại, Đánh giá sản phẩm

## Điểm truy cập trang Đơn hàng

1. **Header** - Icon giỏ hàng trên thanh navigation
2. **Dropdown menu** - Menu người dùng → "Lịch sử đơn hàng"
3. **Trang Profile** - Tab "Đơn hàng" → Button "Đi đến Lịch sử đơn hàng"

## Responsive Design
- Desktop: Layout 2 cột, đầy đủ tính năng
- Mobile: Full-screen list, responsive cards

## Ghi chú
- Hệ thống sử dụng routing tự tạo (không dùng react-router)
- Hỗ trợ chế độ Guest (khách) và Authenticated user
- Mock data được sử dụng để demo UI/UX
- Hỗ trợ dark mode
- HMR (Hot Module Reload) được kích hoạt

## Cập nhật gần đây
- **06/10/2025**: Thêm trang Lịch sử đơn hàng và Order Detail Modal
- Tích hợp đầy đủ vào navigation system
- Cấu hình deployment cho production

## Development Notes
- Port: 5000 (frontend)
- Host: 0.0.0.0


  # Design System and 5 Pages

  This is a code bundle for Design System and 5 Pages. For educational purposes only.

  ## Running the code

  Run `npm i` to install the dependencies.

  Run `npm start` to start the development server.
  # DATH
# DATH_demoWeb
