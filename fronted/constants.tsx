
import React from 'react';
import { Product, Category, Creator } from './types';

export const CATEGORIES: Category[] = [
  { id: '1', name: '陶艺', image: 'https://picsum.photos/seed/pottery/400/400' },
  { id: '2', name: '织物', image: 'https://picsum.photos/seed/fabric/400/400' },
  { id: '3', name: '金工', image: 'https://picsum.photos/seed/metal/400/400' },
  { id: '4', name: '纸本', image: 'https://picsum.photos/seed/paper/400/400' },
  { id: '5', name: '原木', image: 'https://picsum.photos/seed/wood/400/400' },
];

export const PRODUCTS: Product[] = [
  {
    id: 'p1',
    name: '侘寂粗陶花器',
    price: 380,
    image: 'https://picsum.photos/seed/p1/800/1000',
    creator: '林语陶瓷工作室',
    category: '居家装饰',
    material: '粗陶',
    description: '手工捏制，每一件都有独特的烧制纹理，保留泥土最原始的呼吸感。',
    isCustomizable: false,
    isOneOfOne: true,
  },
  {
    id: 'p2',
    name: '手织亚麻茶席',
    price: 260,
    image: 'https://picsum.photos/seed/p2/800/800',
    creator: '織间',
    category: '居家装饰',
    material: '亚麻',
    description: '天然亚麻材质，经纬之间尽显手工温度。',
    isCustomizable: true,
    isOneOfOne: false,
  },
  {
    id: 'p3',
    name: '锤纹纯银戒指',
    price: 520,
    image: 'https://picsum.photos/seed/p3/800/1000',
    creator: '素石金工',
    category: '配饰首饰',
    material: '纯银',
    description: '手工锤打纹路，随着佩戴时间展现独特的氧化光泽。',
    isCustomizable: true,
    isOneOfOne: false,
  },
  {
    id: 'p4',
    name: '再生纸手工画册',
    price: 180,
    image: 'https://picsum.photos/seed/p4/800/1200',
    creator: '纸上谈兵',
    category: '独立刊物',
    material: '再生纸',
    description: '环保再生纸张，手工缝线装订。',
    isCustomizable: false,
    isOneOfOne: false,
  },
  {
    id: 'p5',
    name: '黑胡桃木极简托盘',
    price: 450,
    image: 'https://picsum.photos/seed/p5/800/1000',
    creator: '木心手作',
    category: '居家装饰',
    material: '原木',
    description: '选用上等黑胡桃木，天然植物油涂装。',
    isCustomizable: true,
    isOneOfOne: true,
  },
  {
    id: 'p6',
    name: '复古真皮医生包',
    price: 1280,
    image: 'https://picsum.photos/seed/p6/800/1000',
    creator: '皮刻',
    category: '手工包袋',
    material: '真皮',
    description: '植鞣牛皮，全手缝制，陪伴一生的质感。',
    isCustomizable: false,
    isOneOfOne: false,
  },
];

export const MOCK_CREATOR: Creator = {
  name: '林语 (Lin Yu)',
  avatar: 'https://picsum.photos/seed/avatar/200/200',
  studioImg: 'https://picsum.photos/seed/studio/1200/600',
  bio: '在景德镇的一隅，我试图通过双手寻找泥土与火的边界。每一件作品都是一次与自然的对话，不求完美，只求真实。',
};
