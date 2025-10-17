import React, { useState } from 'react';
import { Phone, Mail, User, Lock, Eye, EyeOff, ArrowLeft } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Separator } from '../components/ui/separator';
import { Checkbox } from '../components/ui/checkbox';
import { useRouter } from '../components/AppRouter';
import { toast } from 'sonner@2.0.3';

export function RegisterPage() {
  const { navigate, setAuthenticated, setUser } = useRouter();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  // OTP state
  const [phoneNumber, setPhoneNumber] = useState('');
  const [countryCode, setCountryCode] = useState('+84');
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState('');
  const [countdown, setCountdown] = useState(0);
  
  // Username/Password state
  const [formData, setFormData] = useState({
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
    fullName: '',
    agreeTerms: false
  });

  const handleOTPRegister = async () => {
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
        // Verify OTP and create account
        if (otp.length === 6) {
          await new Promise(resolve => setTimeout(resolve, 1000));
          const mockUser = {
            id: '1',
            name: 'Người dùng mới',
            email: '',
            phone: phoneNumber,
            avatar: '',
            isNewUser: true
          };
          setUser(mockUser);
          setAuthenticated(true);
          toast.success('Đăng ký thành công! Chào mừng bạn đến với Marketplace');
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

  const handleFormRegister = async () => {
    if (!formData.agreeTerms) {
      toast.error('Vui lòng đồng ý với điều khoản sử dụng');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      toast.error('Mật khẩu xác nhận không khớp');
      return;
    }

    if (formData.password.length < 6) {
      toast.error('Mật khẩu phải có ít nhất 6 ký tự');
      return;
    }

    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      const mockUser = {
        id: '1',
        name: formData.fullName || formData.username,
        email: formData.email,
        username: formData.username,
        avatar: '',
        isNewUser: true
      };
      setUser(mockUser);
      setAuthenticated(true);
      toast.success('Đăng ký thành công! Chào mừng bạn đến với Marketplace');
    } catch (error) {
      toast.error('Email hoặc tên đăng nhập đã tồn tại');
    } finally {
      setLoading(false);
    }
  };

  const handleOAuthRegister = async (provider: string) => {
    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      const mockUser = {
        id: '1',
        name: 'Người dùng mới',
        email: 'newuser@example.com',
        provider: provider,
        avatar: '',
        isNewUser: true
      };
      setUser(mockUser);
      setAuthenticated(true);
      toast.success(`Đăng ký thành công với ${provider}! Chào mừng bạn đến với Marketplace`);
    } catch (error) {
      toast.error(`Không thể đăng ký bằng ${provider}. Thử lại sau.`);
    } finally {
      setLoading(false);
    }
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

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-accent/20 p-4">
      <Card className="w-full max-w-md animate-scale-in shadow-xl">
        <CardHeader className="text-center pb-6">
          <div className="flex items-center justify-between mb-4">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => navigate('login')}
              className="p-2"
            >
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <div className="w-16 h-16 bg-primary rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-2xl">M</span>
            </div>
            <div className="w-8"></div>
          </div>
          <CardTitle className="text-2xl">Đăng ký</CardTitle>
          <p className="text-muted-foreground">Tạo tài khoản mới để bắt đầu</p>
        </CardHeader>
        
        <CardContent>
          <Tabs defaultValue="form" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="form">Tài khoản</TabsTrigger>
              <TabsTrigger value="phone">Điện thoại</TabsTrigger>
              <TabsTrigger value="oauth">Khác</TabsTrigger>
            </TabsList>
            
            <TabsContent value="form" className="space-y-4 mt-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="fullName">Họ và tên</Label>
                  <Input
                    id="fullName"
                    type="text"
                    placeholder="Nhập họ và tên"
                    value={formData.fullName}
                    onChange={(e) => handleInputChange('fullName', e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Nhập email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="username">Tên đăng nhập</Label>
                  <Input
                    id="username"
                    type="text"
                    placeholder="Nhập tên đăng nhập"
                    value={formData.username}
                    onChange={(e) => handleInputChange('username', e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="password">Mật khẩu</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Nhập mật khẩu (ít nhất 6 ký tự)"
                      value={formData.password}
                      onChange={(e) => handleInputChange('password', e.target.value)}
                      className="pr-10"
                    />
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

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Xác nhận mật khẩu</Label>
                  <div className="relative">
                    <Input
                      id="confirmPassword"
                      type={showConfirmPassword ? 'text' : 'password'}
                      placeholder="Nhập lại mật khẩu"
                      value={formData.confirmPassword}
                      onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                      className="pr-10"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="h-4 w-4 text-muted-foreground" />
                      ) : (
                        <Eye className="h-4 w-4 text-muted-foreground" />
                      )}
                    </Button>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="terms"
                    checked={formData.agreeTerms}
                    onCheckedChange={(checked) => handleInputChange('agreeTerms', checked)}
                  />
                  <Label htmlFor="terms" className="text-sm">
                    Tôi đồng ý với{' '}
                    <Button variant="link" className="px-0 h-auto text-sm underline">
                      điều khoản sử dụng
                    </Button>{' '}
                    và{' '}
                    <Button variant="link" className="px-0 h-auto text-sm underline">
                      chính sách bảo mật
                    </Button>
                  </Label>
                </div>
                
                <Button 
                  onClick={handleFormRegister}
                  disabled={loading || !formData.email || !formData.password || !formData.agreeTerms}
                  className="w-full bg-primary hover:bg-primary-dark"
                >
                  {loading ? 'Đang tạo tài khoản...' : 'Tạo tài khoản'}
                </Button>
              </div>
            </TabsContent>

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
                    onClick={handleOTPRegister}
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
                    onClick={handleOTPRegister}
                    disabled={loading || otp.length !== 6}
                    className="w-full bg-primary hover:bg-primary-dark"
                  >
                    {loading ? 'Đang tạo tài khoản...' : 'Tạo tài khoản'}
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
            
            <TabsContent value="oauth" className="space-y-4 mt-6">
              <div className="space-y-3">
                <Button 
                  variant="outline" 
                  onClick={() => handleOAuthRegister('Google')}
                  disabled={loading}
                  className="w-full"
                >
                  <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  Đăng ký với Google
                </Button>
                
                <Button 
                  variant="outline" 
                  onClick={() => handleOAuthRegister('Facebook')}
                  disabled={loading}
                  className="w-full"
                >
                  <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                  Đăng ký với Facebook
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
              
              <div className="text-center">
                <p className="text-sm text-muted-foreground">
                  Đã có tài khoản?{' '}
                  <Button 
                    variant="link" 
                    className="px-0 font-medium"
                    onClick={() => navigate('login')}
                  >
                    Đăng nhập ngay
                  </Button>
                </p>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}