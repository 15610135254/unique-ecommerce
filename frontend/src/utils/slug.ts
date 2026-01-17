/**
 * URL Slug 工具函数
 * 将中文商品名转换为SEO友好的URL路径
 */

// 中文分类映射到英文slug
const CATEGORY_SLUGS: Record<string, string> = {
  '手工包袋': 'bags',
  '居家装饰': 'home-decor',
  '陶瓷器皿': 'ceramics',
  '文具': 'stationery',
  '首饰': 'jewelry',
  '其他': 'others',
};

// 材质映射到英文slug
const MATERIAL_SLUGS: Record<string, string> = {
  '真皮': 'leather',
  '帆布': 'canvas',
  '原木': 'wood',
  '陶瓷': 'ceramic',
  '黄铜': 'brass',
  '棉麻': 'linen',
  '银': 'silver',
  '其他': 'other',
};

/**
 * 将中文商品名转换为拼音/英文slug
 * 简化处理：移除特殊字符，使用短ID
 */
export function generateProductSlug(name: string, id: number | string): string {
  // 简化：使用商品名的前几个字符 + ID
  const cleanName = name
    .replace(/[^\u4e00-\u9fa5a-zA-Z0-9]/g, '') // 移除特殊字符
    .substring(0, 10); // 取前10个字符

  return `${cleanName}-${id}`;
}

/**
 * 生成完整的产品URL路径
 * @param category 分类名称
 * @param material 材质名称
 * @param productName 商品名称
 * @param productId 商品ID
 * @returns 完整的SEO友好URL路径
 */
export function generateProductPath(
  category: string,
  material: string | undefined,
  productName: string,
  productId: number | string
): string {
  const categorySlug = CATEGORY_SLUGS[category] || 'products';
  const materialSlug = material ? (MATERIAL_SLUGS[material] || 'general') : 'general';
  const productSlug = generateProductSlug(productName, productId);

  return `/${categorySlug}/${materialSlug}/${productSlug}`;
}

/**
 * 从路径中提取商品ID
 * 路径格式: /category/material/slug-id
 */
export function extractProductIdFromPath(pathSlug: string): number {
  // slug格式: "name-123" 或 "name123"
  const match = pathSlug.match(/-(\d+)$/);
  if (match) {
    return parseInt(match[1], 10);
  }

  // 尝试直接解析
  const numMatch = pathSlug.match(/\d+$/);
  if (numMatch) {
    return parseInt(numMatch[0], 10);
  }

  throw new Error(`Invalid product slug format: ${pathSlug}`);
}
