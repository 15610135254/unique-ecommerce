
import React, { useState } from 'react';
import { customizationApi } from '../src/api';

interface FormData {
  name: string;
  phone: string;
  requirements: string;
}

const BespokePage: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    phone: '',
    requirements: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear message when user starts typing
    if (message) setMessage(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate
    if (!formData.name.trim()) {
      setMessage({ type: 'error', text: '请输入您的姓名' });
      return;
    }
    if (!formData.phone.trim()) {
      setMessage({ type: 'error', text: '请输入联系方式' });
      return;
    }
    // Simple phone validation
    const phoneRegex = /^1[3-9]\d{9}$/;
    if (!phoneRegex.test(formData.phone)) {
      setMessage({ type: 'error', text: '请输入正确的手机号码' });
      return;
    }
    if (!formData.requirements.trim()) {
      setMessage({ type: 'error', text: '请描述您的定制需求' });
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await customizationApi.createRequest({
        contactName: formData.name,
        contactPhone: formData.phone,
        requirements: formData.requirements,
      });

      if (response.code === 200) {
        setMessage({ type: 'success', text: '定制请求已提交！我们会尽快联系您。' });
        // Reset form
        setFormData({ name: '', phone: '', requirements: '' });
      } else {
        setMessage({ type: 'error', text: response.message || '提交失败，请稍后重试' });
      }
    } catch (error: any) {
      console.error('Failed to submit customization request:', error);
      setMessage({
        type: 'error',
        text: error.message || '提交失败，请检查网络连接后重试'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="animate-fade-in">
      <section className="relative h-[70vh] flex items-center justify-center">
        <img src="https://picsum.photos/seed/bespoke/1600/900?grayscale" className="absolute inset-0 w-full h-full object-cover opacity-20" />
        <div className="relative z-10 text-center max-w-xl px-6">
          <h1 className="text-5xl font-extralight heading-font tracking-widest mb-8">定制你的独一无二</h1>
          <p className="text-gray-600 leading-relaxed font-light">
            在 UNiQUE，每一件作品都可以成为您故事的载体。从材质选择到细节刻字，我们的创作者将与您一同打磨那份专属的记忆。
          </p>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-6 py-32">
        <div className="grid md:grid-cols-3 gap-24">
          <div className="text-center">
            <span className="text-4xl font-extralight text-gray-200 block mb-6">01.</span>
            <h3 className="text-sm uppercase tracking-widest mb-4">沟通意向</h3>
            <p className="text-xs text-gray-500 leading-relaxed font-light">选择您心仪的创作者风格，提交初步的定制需求与灵感。</p>
          </div>
          <div className="text-center">
            <span className="text-4xl font-extralight text-gray-200 block mb-6">02.</span>
            <h3 className="text-sm uppercase tracking-widest mb-4">设计确认</h3>
            <p className="text-xs text-gray-500 leading-relaxed font-light">创作者将提供手稿或打样方案，确保每一处细节符合您的期待。</p>
          </div>
          <div className="text-center">
            <span className="text-4xl font-extralight text-gray-200 block mb-6">03.</span>
            <h3 className="text-sm uppercase tracking-widest mb-4">手工打磨</h3>
            <p className="text-xs text-gray-500 leading-relaxed font-light">进入正式制作阶段，我们会为您同步制作过程中的关键影像。</p>
          </div>
        </div>

        <div className="mt-40 bg-[#1A1A1A] p-12 md:p-24 text-white">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl font-light heading-font mb-8">开启定制之旅</h2>

              {/* Success/Error Message */}
              {message && (
                <div
                  className={`mb-6 p-4 text-sm ${
                    message.type === 'success'
                      ? 'bg-green-900/50 text-green-200 border border-green-700'
                      : 'bg-red-900/50 text-red-200 border border-red-700'
                  }`}
                >
                  {message.text}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-8">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="您的姓名 / Your Name"
                  className="w-full bg-transparent border-b border-gray-700 py-3 text-sm focus:outline-none focus:border-white transition-colors placeholder:text-gray-600"
                  disabled={isSubmitting}
                />
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="手机号码 / Phone Number"
                  className="w-full bg-transparent border-b border-gray-700 py-3 text-sm focus:outline-none focus:border-white transition-colors placeholder:text-gray-600"
                  disabled={isSubmitting}
                />
                <textarea
                  name="requirements"
                  value={formData.requirements}
                  onChange={handleInputChange}
                  placeholder="定制需求简述 / Please describe your requirements"
                  className="w-full bg-transparent border-b border-gray-700 py-3 text-sm focus:outline-none focus:border-white transition-colors h-32 resize-none placeholder:text-gray-600"
                  disabled={isSubmitting}
                />
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`bg-white text-black px-12 py-4 text-xs uppercase tracking-widest transition-all ${
                    isSubmitting ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-200'
                  }`}
                >
                  {isSubmitting ? '提交中... Submitting' : '提交申请 Submit'}
                </button>
              </form>
            </div>
            <div className="hidden md:block">
              <img src="https://picsum.photos/seed/work/800/1000?grayscale" className="w-full h-[600px] object-cover" alt="Craftsmanship" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BespokePage;
