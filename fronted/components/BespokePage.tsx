
import React from 'react';

const BespokePage: React.FC = () => {
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
              <form className="space-y-8">
                <input type="text" placeholder="您的姓名" className="w-full bg-transparent border-b border-gray-700 py-3 text-sm focus:outline-none focus:border-white transition-colors" />
                <input type="email" placeholder="邮箱地址" className="w-full bg-transparent border-b border-gray-700 py-3 text-sm focus:outline-none focus:border-white transition-colors" />
                <textarea placeholder="定制需求简述" className="w-full bg-transparent border-b border-gray-700 py-3 text-sm focus:outline-none focus:border-white transition-colors h-32 resize-none" />
                <button className="bg-white text-black px-12 py-4 text-xs uppercase tracking-widest hover:bg-gray-200 transition-all">
                  提交申请 Submit
                </button>
              </form>
            </div>
            <div className="hidden md:block">
              <img src="https://picsum.photos/seed/work/800/1000?grayscale" className="w-full h-[600px] object-cover" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BespokePage;
