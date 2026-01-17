
import React from 'react';

const StoryPage: React.FC = () => {
  return (
    <div className="animate-fade-in bg-[#FBFBF9] pb-32">
      <section className="h-[90vh] relative flex items-center justify-center overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1493106641515-6b563ad3d064?q=80&w=1600&auto=format&fit=crop&grayscale=true" 
          className="absolute inset-0 w-full h-full object-cover opacity-30" 
          alt="Artisan background"
        />
        <div className="relative z-10 text-center space-y-8">
          <h1 className="text-6xl font-extralight heading-font tracking-[0.3em] uppercase">The Unique Spirit</h1>
          <p className="text-sm uppercase tracking-[0.5em] text-gray-500">寻找指尖的温度</p>
        </div>
      </section>

      <div className="max-w-3xl mx-auto px-6 mt-32 space-y-32">
        <div className="space-y-12">
          <h2 className="text-3xl font-light heading-font border-l-4 border-black pl-8">缘起：反抗工业的冰冷</h2>
          <p className="text-lg text-gray-600 leading-relaxed font-light">
            在万物皆可流水线生产的时代，我们开始怀念那些“不完美”的东西。泥土中偶然生成的裂纹，织布机上跳动的线头，木头纹理中沉淀的时间。
          </p>
          <p className="text-lg text-gray-600 leading-relaxed font-light">
            UNiQUE 诞生于一次景德镇的雨后。我们看到一位老工匠在昏暗的灯光下修坯，那一刻，器物不再只是工具，而是生命力的延伸。
          </p>
        </div>

        <div className="grid grid-cols-2 gap-8">
          <img src="https://picsum.photos/seed/craft1/800/1200?grayscale" className="w-full h-auto" />
          <img src="https://picsum.photos/seed/craft2/800/1000?grayscale" className="w-full h-auto mt-24" />
        </div>

        <div className="space-y-12 text-right">
          <h2 className="text-3xl font-light heading-font border-r-4 border-black pr-8">我们的信条：独一无二</h2>
          <p className="text-lg text-gray-600 leading-relaxed font-light">
            我们不追求规模，只追求真实。每一位入驻 UNiQUE 的卖家，都必须是作品背后的核心创作者。
          </p>
          <p className="text-lg text-gray-600 leading-relaxed font-light">
            在这里，买卖不是一次交易，而是一次审美的共鸣。当你买下一件作品时，你也买下了创作者的一段时光。
          </p>
        </div>
      </div>
    </div>
  );
};

export default StoryPage;
