
import React from 'react';

const PolicyPage: React.FC = () => {
  return (
    <div className="animate-fade-in max-w-5xl mx-auto px-6 py-24">
      <header className="mb-24 text-center">
        <h1 className="text-4xl font-light heading-font tracking-widest mb-4 uppercase">服务政策</h1>
        <p className="text-gray-400 text-xs uppercase tracking-[0.4em]">Shipping & Returns Policy</p>
      </header>

      <div className="grid md:grid-cols-2 gap-24">
        <section className="space-y-12">
          <h2 className="text-xl font-normal border-b border-black pb-4 uppercase tracking-widest">配送政策 Shipping</h2>
          <div className="space-y-8">
            <div>
              <h3 className="text-sm font-bold mb-2">作品发货时间</h3>
              <p className="text-sm text-gray-500 font-light leading-relaxed">由于大部分作品为手作，现货通常在 48 小时内发出。定制作品需根据作品详情页注明的周期（通常为 7-21 天）发货。</p>
            </div>
            <div>
              <h3 className="text-sm font-bold mb-2">物流伙伴</h3>
              <p className="text-sm text-gray-500 font-light leading-relaxed">我们默认使用顺丰速运（SF Express），以确保珍贵的手工作品能够安全、准时送达。</p>
            </div>
            <div>
              <h3 className="text-sm font-bold mb-2">包装艺术</h3>
              <p className="text-sm text-gray-500 font-light leading-relaxed">我们采用环保且具有艺术感的缓冲材料，确保作品在长途跋涉中毫发无伤。</p>
            </div>
          </div>
        </section>

        <section className="space-y-12">
          <h2 className="text-xl font-normal border-b border-black pb-4 uppercase tracking-widest">退换指南 Returns</h2>
          <div className="space-y-8">
            <div>
              <h3 className="text-sm font-bold mb-2">7天无理由退货</h3>
              <p className="text-sm text-gray-500 font-light leading-relaxed">非定制作品支持 7 天无理由退货，但请确保作品未被使用且包装完好。</p>
            </div>
            <div>
              <h3 className="text-sm font-bold mb-2">关于“手工痕迹”</h3>
              <p className="text-sm text-gray-500 font-light leading-relaxed">手作品中存在的自然纹理、气孔或轻微形变属于作品特质，不作为质量问题进行退换。</p>
            </div>
            <div>
              <h3 className="text-sm font-bold mb-2">破损处理</h3>
              <p className="text-sm text-gray-500 font-light leading-relaxed">如收到时作品已破损，请在 24 小时内拍照联系客服，我们将为您全额退款或联系作者重制。</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default PolicyPage;
