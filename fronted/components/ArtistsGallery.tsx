
import React from 'react';
import { MOCK_CREATOR } from '../constants';

const ARTISTS = [
  { name: '林语 (Lin Yu)', label: 'CERAMICS', image: 'https://picsum.photos/seed/art1/600/800' },
  { name: '織间 (Weave)', label: 'TEXTILE', image: 'https://picsum.photos/seed/art2/600/800' },
  { name: '素石 (Su Shi)', label: 'METALWORK', image: 'https://picsum.photos/seed/art3/600/800' },
  { name: '木心 (Wood Heart)', label: 'WOODWORK', image: 'https://picsum.photos/seed/art4/600/800' },
];

const ArtistsGallery: React.FC = () => {
  return (
    <div className="animate-fade-in">
      <section className="h-[40vh] bg-gray-50 flex flex-col justify-center items-center px-6 text-center">
        <h1 className="text-4xl font-light heading-font tracking-[0.2em] mb-4">创作者名录</h1>
        <p className="text-gray-500 text-sm uppercase tracking-widest">Artists & Creators Gallery</p>
      </section>

      <div className="px-6 md:px-12 py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {ARTISTS.map((artist, idx) => (
            <div key={idx} className="group cursor-pointer">
              <div className="relative overflow-hidden aspect-[3/4] mb-6 grayscale hover:grayscale-0 transition-all duration-1000">
                <img src={artist.image} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />
              </div>
              <h3 className="text-sm tracking-widest uppercase mb-1">{artist.name}</h3>
              <p className="text-[10px] text-gray-400 tracking-[0.2em] uppercase">{artist.label}</p>
            </div>
          ))}
        </div>
      </div>

      <section className="bg-white py-32 border-t border-gray-100">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <h2 className="text-xl heading-font font-light mb-12 tracking-widest">加入我们的创作者社区</h2>
          <p className="text-sm text-gray-500 leading-relaxed font-light mb-12">
            我们一直在寻找那些对材质有独到见解、对工艺有坚持的原创作者。如果您希望您的作品被更多懂它的人看见，欢迎联系我们。
          </p>
          <button className="px-12 py-4 border border-black text-xs uppercase tracking-widest hover:bg-black hover:text-white transition-all">
            申请入驻 Join Us
          </button>
        </div>
      </section>
    </div>
  );
};

export default ArtistsGallery;
