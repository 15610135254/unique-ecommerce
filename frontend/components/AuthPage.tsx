
import React, { useState, useEffect } from 'react';
import { authApi } from '../src/api';
import { User } from '../types';

interface AuthPageProps {
  onAuthSuccess: (user: User) => void;
}

const AuthPage: React.FC<AuthPageProps> = ({ onAuthSuccess }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [loginMethod, setLoginMethod] = useState<'password' | 'sms'>('password');
  const [isLoading, setIsLoading] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [errorMessage, setErrorMessage] = useState('');

  // Form state
  const [formData, setFormData] = useState({
    username: '',
    phone: '',
    password: '',
    code: '',
  });

  useEffect(() => {
    let timer: number;
    if (countdown > 0) {
      timer = window.setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [countdown]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.placeholder.toLowerCase().includes('username') ? 'username' :
       e.target.placeholder.toLowerCase().includes('phone') ? 'phone' :
       e.target.placeholder.toLowerCase().includes('password') ? 'password' :
       e.target.placeholder.toLowerCase().includes('code') ? 'code' : '']: e.target.value,
    });
    setErrorMessage('');
  };

  const handleSendCode = async () => {
    if (!formData.phone || formData.phone.length < 11) {
      setErrorMessage('请输入有效的手机号码');
      return;
    }

    try {
      await authApi.sendCode(formData.phone);
      setCountdown(60);
      setErrorMessage('');
    } catch (error) {
      setErrorMessage('发送验证码失败，请稍后重试');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage('');

    try {
      if (isLogin) {
        if (loginMethod === 'password') {
          // Password login
          const response = await authApi.login({
            phone: formData.phone,
            password: formData.password,
          });
          if (response.success) {
            onAuthSuccess({
              id: response.data.user.id,
              username: response.data.user.username,
              phone: response.data.user.phone,
              role: response.data.user.role,
            });
          }
        } else {
          // SMS login
          const response = await authApi.smsLogin({
            phone: formData.phone,
            code: formData.code,
          });
          if (response.success) {
            onAuthSuccess({
              id: response.data.user.id,
              username: response.data.user.username,
              phone: response.data.user.phone,
              role: response.data.user.role,
            });
          }
        }
      } else {
        // Register
        const response = await authApi.register({
          username: formData.username,
          phone: formData.phone,
          password: formData.password,
          verificationCode: formData.code,
        });
        if (response.success) {
          onAuthSuccess({
            id: response.data.user.id,
            username: response.data.user.username,
            phone: response.data.user.phone,
            role: response.data.user.role,
          });
        }
      }
    } catch (error: any) {
      setErrorMessage(error.message || '操作失败，请检查您的输入');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-80px)] flex flex-col md:flex-row animate-fade-in">
      {/* Decorative Image Side */}
      <div className="hidden md:block md:w-1/2 relative overflow-hidden bg-gray-100">
        <img
          src="https://images.unsplash.com/photo-1513519245088-0e12902e35ca?q=80&w=1200&auto=format&fit=crop&grayscale=true"
          alt="Minimalist Interior"
          className="w-full h-full object-cover grayscale opacity-60"
        />
        <div className="absolute inset-0 flex items-center justify-center p-20 text-center">
          <div className="space-y-4">
            <p className="text-[10px] tracking-[0.5em] uppercase text-black font-medium">Unique Identity</p>
            <h2 className="text-3xl heading-font font-light tracking-widest text-black uppercase">连接创作者与藏家</h2>
          </div>
        </div>
      </div>

      {/* Form Side */}
      <div className="w-full md:w-1/2 bg-[#FBFBF9] flex items-center justify-center p-8 md:p-24">
        <div className="w-full max-w-sm space-y-12">
          <header className="space-y-4">
            <h1 className="text-3xl font-light heading-font tracking-[0.2em] uppercase">
              {isLogin ? '欢迎回来' : '开启旅程'}
            </h1>
            <p className="text-xs text-gray-400 uppercase tracking-widest">
              {isLogin ? 'Welcome back to UNiQUE' : 'Join our creator community'}
            </p>
          </header>

          {errorMessage && (
            <div className="bg-red-50 text-red-600 text-xs py-2 px-4 text-center">
              {errorMessage}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Registration Fields */}
            {!isLogin && (
              <div className="relative group">
                <input
                  type="text"
                  value={formData.username}
                  onChange={handleInputChange}
                  required
                  placeholder="用户名 USERNAME"
                  className="w-full bg-transparent border-b border-gray-200 py-3 text-xs uppercase tracking-widest focus:outline-none focus:border-black transition-colors placeholder:text-gray-300"
                />
              </div>
            )}

            <div className="relative group">
              <input
                type="tel"
                value={formData.phone}
                onChange={handleInputChange}
                required
                placeholder="手机号码 PHONE NUMBER"
                className="w-full bg-transparent border-b border-gray-200 py-3 text-xs uppercase tracking-widest focus:outline-none focus:border-black transition-colors placeholder:text-gray-300"
              />
            </div>

            {/* Verification Code Field (Always for Register, or for SMS Login) */}
            {(!isLogin || (isLogin && loginMethod === 'sms')) && (
              <div className="relative flex items-end border-b border-gray-200 group focus-within:border-black transition-colors">
                <input
                  type="text"
                  value={formData.code}
                  onChange={handleInputChange}
                  required={!isLogin || (isLogin && loginMethod === 'sms')}
                  placeholder="验证码 CODE"
                  className="flex-grow bg-transparent py-3 text-xs uppercase tracking-widest focus:outline-none placeholder:text-gray-300"
                />
                <button
                  type="button"
                  onClick={handleSendCode}
                  disabled={countdown > 0}
                  className={`pb-3 text-[10px] uppercase tracking-widest font-medium transition-colors ${countdown > 0 ? 'text-gray-300 cursor-not-allowed' : 'text-black hover:text-gray-400'}`}
                >
                  {countdown > 0 ? `${countdown}S` : '获取验证码'}
                </button>
              </div>
            )}

            {/* Password Field (Always for Register, or for Password Login) */}
            {(!isLogin || (isLogin && loginMethod === 'password')) && (
              <div className="relative group">
                <input
                  type="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required={!isLogin || (isLogin && loginMethod === 'password')}
                  placeholder={!isLogin ? "设置密码 PASSWORD" : "密码 PASSWORD"}
                  className="w-full bg-transparent border-b border-gray-200 py-3 text-xs uppercase tracking-widest focus:outline-none focus:border-black transition-colors placeholder:text-gray-300"
                />
              </div>
            )}

            <div className="pt-4 space-y-6">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-black text-white py-5 text-[10px] uppercase tracking-[0.4em] hover:bg-neutral-800 transition-all flex items-center justify-center disabled:bg-gray-400"
              >
                {isLoading ? (
                  <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                ) : (
                  isLogin ? '登录 Login' : '注册 Register'
                )}
              </button>

              <div className="flex flex-col space-y-4 text-[10px] uppercase tracking-widest text-gray-400">
                <div className="flex justify-between items-center">
                  {isLogin && (
                    <button
                      type="button"
                      onClick={() => setLoginMethod(loginMethod === 'password' ? 'sms' : 'password')}
                      className="hover:text-black transition-colors border-b border-transparent hover:border-black"
                    >
                      {loginMethod === 'password' ? '使用手机验证码登录' : '使用密码登录'}
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={() => { setIsLogin(!isLogin); setLoginMethod('password'); }}
                    className="hover:text-black transition-colors border-b border-transparent hover:border-black ml-auto"
                  >
                    {isLogin ? '创建账户 Create Account' : '已有账号 Log In'}
                  </button>
                </div>
                {isLogin && loginMethod === 'password' && (
                  <button type="button" className="hover:text-black transition-colors w-fit">忘记密码?</button>
                )}
              </div>
            </div>
          </form>

          <footer className="pt-12 border-t border-gray-100">
             <div className="flex justify-center space-x-8">
                {['WeChat', 'Google', 'Apple'].map(provider => (
                  <button key={provider} className="text-[10px] uppercase tracking-tighter text-gray-400 hover:text-black transition-colors">
                    Via {provider}
                  </button>
                ))}
             </div>
          </footer>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
