import React, { useState } from 'react';
import { Phone, Mail, User, Lock, Eye, EyeOff } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Separator } from '../components/ui/separator';
import { useRouter } from '../components/AppRouter';
import { toast } from 'sonner@2.0.3';

export function LoginPage() {
  const { navigate, setAuthenticated, setUser, setGuest } = useRouter();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  
  // OTP state
  const [phoneNumber, setPhoneNumber] = useState('');
  const [countryCode, setCountryCode] = useState('+84');
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState('');
  const [countdown, setCountdown] = useState(0);
  
  // Username/Password state
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const handleOTPLogin = async () => {
    setLoading(true);
    try {
      if (!otpSent) {
        // Send OTP
        await new Promise(resolve => setTimeout(resolve, 1000));
        setOtpSent(true);
        setCountdown(60);
        const timer = setInterval(() => {
          setCountdown(prev => {
            if (prev <= 1) {
              clearInterval(timer);
              return 0;
            }
            return prev - 1;
          });
        }, 1000);
        toast.success('Mã OTP đã được gửi đến số điện thoại của bạn');
      } else {
        // Verify OTP
        if (otp.length === 6) {
          await new Promise(resolve => setTimeout(resolve, 1000));
          const mockUser = {
            id: '1',
            name: 'Người dùng Demo',
            email: 'demo@example.com',
            phone: phoneNumber,
            avatar: ''
          };
          setUser(mockUser);
          setAuthenticated(true);
          toast.success('Đăng nhập thành công!');
        } else {
          toast.error('Vui lòng nhập đầy đủ 6 số');
        }
      }
    } catch (error) {
      toast.error('Có lỗi xảy ra, vui lòng thử lại');
    } finally {
      setLoading(false);
    }
  };

  const handleUsernameLogin = async () => {
    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      const mockUser = {
        id: '1',
        name: 'Người dùng Demo',
        email: username.includes('@') ? username : 'demo@example.com',
        username: username,
        avatar: ''
      };
      setUser(mockUser);
      setAuthenticated(true);
      toast.success('Đăng nhập thành công!');
    } catch (error) {
      toast.error('Sai tên đăng nhập hoặc mật khẩu');
    } finally {
      setLoading(false);
    }
  };

  const handleOAuthLogin = async (provider: string) => {
    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      const mockUser = {
        id: '1',
        name: 'Người dùng Demo',
        email: 'demo@example.com',
        provider: provider,
        avatar: ''
      };
      setUser(mockUser);
      setAuthenticated(true);
      toast.success(`Đăng nhập thành công với ${provider}!`);
    } catch (error) {
      toast.error(`Không thể đăng nhập bằng ${provider}. Thử lại sau.`);
    } finally {
      setLoading(false);
    }
  };

  const handleGuestMode = () => {
    setGuest(true);
    toast.success('Chào mừng bạn! Bạn đang sử dụng với tư cách khách');
  };

  const resendOTP = () => {
    if (countdown > 0) return;
    setCountdown(60);
    const timer = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    toast.success('Mã OTP mới đã được gửi');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-accent/20 p-4">
      <Card className="w-full max-w-md animate-scale-in shadow-xl">
        <CardHeader className="text-center pb-6">
          <div className="w-16 h-16 bg-primary rounded-xl flex items-center justify-center mx-auto mb-4">
            <span className="text-white font-bold text-2xl">M</span>
          </div>
          <CardTitle className="text-2xl">Đăng nhập</CardTitle>
          <p className="text-muted-foreground">Chào mừng bạn quay trở lại</p>
        </CardHeader>
        
        <CardContent>
          <Tabs defaultValue="phone" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="phone">Điện thoại</TabsTrigger>
              <TabsTrigger value="username">Tài khoản</TabsTrigger>
              <TabsTrigger value="oauth">Khác</TabsTrigger>
            </TabsList>
            
            <TabsContent value="phone" className="space-y-4 mt-6">
              {!otpSent ? (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="phone">Số điện thoại</Label>
                    <div className="flex space-x-2">
                      <select 
                        value={countryCode}
                        onChange={(e) => setCountryCode(e.target.value)}
                        className="px-3 py-2 border rounded-md bg-background w-20"
                      >
                        <option value="+84">+84</option>
                        <option value="+1">+1</option>
                        <option value="+86">+86</option>
                      </select>
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="Nhập số điện thoại"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        className="flex-1"
                      />
                    </div>
                  </div>
                  <Button 
                    onClick={handleOTPLogin}
                    disabled={loading || !phoneNumber}
                    className="w-full bg-primary hover:bg-primary-dark"
                  >
                    {loading ? 'Đang gửi...' : 'Gửi mã OTP'}
                    <Phone className="ml-2 w-4 h-4" />
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="text-center text-sm text-muted-foreground">
                    Mã OTP đã được gửi đến {countryCode} {phoneNumber}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="otp">Mã OTP (6 số)</Label>
                    <Input
                      id="otp"
                      type="text"
                      placeholder="000000"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                      className="text-center text-lg tracking-wider"
                      maxLength={6}
                    />
                  </div>
                  <div className="text-center">
                    {countdown > 0 ? (
                      <p className="text-sm text-muted-foreground">
                        Gửi lại mã sau {countdown}s
                      </p>
                    ) : (
                      <Button variant="ghost" onClick={resendOTP} className="text-sm">
                        Chưa nhận được mã? Gửi lại
                      </Button>
                    )}
                  </div>
                  <Button 
                    onClick={handleOTPLogin}
                    disabled={loading || otp.length !== 6}
                    className="w-full bg-primary hover:bg-primary-dark"
                  >
                    {loading ? 'Đang xác thực...' : 'Xác thực'}
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={() => {setOtpSent(false); setOtp(''); setCountdown(0);}}
                    className="w-full"
                  >
                    Quay lại
                  </Button>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="username" className="space-y-4 mt-6">
              <div className="space-y-2">
                <Label htmlFor="username">Email hoặc tên đăng nhập</Label>
                <Input
                  id="username"
                  type="text"
                  placeholder="Nhập email hoặc username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="pl-10"
                />
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password">Mật khẩu</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Nhập mật khẩu"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 pr-10"
                  />
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 text-muted-foreground" />
                    ) : (
                      <Eye className="h-4 w-4 text-muted-foreground" />
                    )}
                  </Button>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <label className="flex items-center space-x-2 text-sm">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="rounded border-border"
                  />
                  <span>Ghi nhớ đăng nhập</span>
                </label>
                <Button variant="link" className="px-0 text-sm">
                  Quên mật khẩu?
                </Button>
              </div>
              
              <Button 
                onClick={handleUsernameLogin}
                disabled={loading || !username || !password}
                className="w-full bg-primary hover:bg-primary-dark"
              >
                {loading ? 'Đang đăng nhập...' : 'Đăng nhập'}
              </Button>
            </TabsContent>
            
            <TabsContent value="oauth" className="space-y-4 mt-6">
              <div className="space-y-3">
                <Button 
                  variant="outline" 
                  onClick={() => handleOAuthLogin('Google')}
                  disabled={loading}
                  className="w-full"
                >
                  <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  Tiếp tục với Google
                </Button>
                
                <Button 
                  variant="outline" 
                  onClick={() => handleOAuthLogin('Facebook')}
                  disabled={loading}
                  className="w-full"
                >
                  <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                  Tiếp tục với Facebook
                </Button>
              </div>
              
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <Separator className="w-full" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">
                    hoặc
                  </span>
                </div>
              </div>
              
              <div className="space-y-3">
                <Button 
                  variant="ghost" 
                  onClick={handleGuestMode}
                  className="w-full border border-dashed hover:bg-muted/50"
                >
                  Tiếp tục với tư cách khách
                </Button>
                
                <div className="text-center">
                  <p className="text-sm text-muted-foreground">
                    Chưa có tài khoản?{' '}
                    <Button 
                      variant="link" 
                      className="px-0 font-medium"
                      onClick={() => navigate('register')}
                    >
                      Đăng ký ngay
                    </Button>
                  </p>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}