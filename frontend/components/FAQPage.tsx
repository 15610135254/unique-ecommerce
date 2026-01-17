
import React, { useState } from 'react';

const FAQ_DATA = [
  {
    q: "为什么每件作品看起来都有点不一样？",
    a: "这正是 UNiQUE 的核心价值。所有的作品都是由创作者手工制作，材料的自然属性（如泥土的矿物点、木材的年轮）和手工制作时的偶发性，赋予了每一件作品独一无二的性格。"
  },
  {
    q: "我可以指定创作者进行完全定制吗？",
    a: "可以。请访问我们的“定制服务 (Bespoke)”页面，选择您心仪的创作者风格并提交初步想法，我们会协助您与作者建立深度沟通。"
  },
  {
    q: "支持全球配送吗？",
    a: "目前我们主要支持中国大陆、港澳台地区及亚太部分国家。如果您有海外寄送需求，请联系客服咨询具体的跨境运费与政策。"
  },
  {
    q: "如果我想成为 UNiQUE 的创作者，该怎么做？",
    a: "我们非常欢迎有原创灵魂的创作者入驻。请在页脚点击“创作者加入”，提交您的作品集链接或社交媒体账号，我们的策展团队会在 5 个工作日内给予反馈。"
  }
];

// Added key to the destructuring pattern to satisfy TS if passed via spread, 
// though React handles 'key' specially, defining the interface helps with the spread operator.
const FAQItem = ({ q, a }: { q: string, a: string, key?: React.Key }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-gray-100 py-8">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center text-left group"
      >
        <span className="text-lg font-light tracking-wide group-hover:text-gray-500 transition-colors">{q}</span>
        <svg className={`w-4 h-4 transition-transform duration-500 ${isOpen ? 'rotate-45' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 4v16m8-8H4" />
        </svg>
      </button>
      <div className={`overflow-hidden transition-all duration-500 ease-in-out ${isOpen ? 'max-h-64 mt-6 opacity-100' : 'max-h-0 opacity-0'}`}>
        <p className="text-sm text-gray-500 leading-relaxed font-light pr-12">
          {a}
        </p>
      </div>
    </div>
  );
};

const FAQPage: React.FC = () => {
  return (
    <div className="animate-fade-in max-w-4xl mx-auto px-6 py-24">
      <header className="mb-24 text-center">
        <h1 className="text-4xl font-light heading-font tracking-widest mb-4 uppercase">常见问题</h1>
        <p className="text-gray-400 text-xs uppercase tracking-[0.4em]">Frequently Asked Questions</p>
      </header>
      
      <div className="space-y-4">
        {/* Pass key explicitly to avoid TS error when spreading props that might include it */}
        {FAQ_DATA.map((item, idx) => (
          <FAQItem key={idx} q={item.q} a={item.a} />
        ))}
      </div>

      <div className="mt-32 p-12 bg-gray-50 text-center">
        <p className="text-sm font-light text-gray-500 mb-6">还有其他疑问？</p>
        <button className="text-xs border-b border-black pb-1 uppercase tracking-widest hover:text-gray-400 transition-colors">联系在线客服 Online Chat</button>
      </div>
    </div>
  );
};

export default FAQPage;
