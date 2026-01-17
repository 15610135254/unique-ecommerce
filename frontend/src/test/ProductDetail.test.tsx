import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import ProductDetail from '../../components/ProductDetail';
import '@testing-library/jest-dom';
import { Product } from '../../types';

describe('ProductDetail', () => {
  const mockProduct: Product = {
    id: '1',
    name: '手工陶瓷花瓶',
    price: 299,
    image: 'https://example.com/image.jpg',
    creator: 'test-creator',
    category: '陶瓷 Ceramic',
    material: '陶土 Clay',
    description: '一件精美的手工陶瓷花瓶，由经验丰富的工匠精心制作。',
    isOneOfOne: true,
    isCustomizable: false,
  };

  const mockOnBack = vi.fn();
  const mockOnAddToCart = vi.fn();

  it('renders product information correctly', () => {
    render(<ProductDetail product={mockProduct} onBack={mockOnBack} onAddToCart={mockOnAddToCart} />);

    expect(screen.getByRole('heading', { name: /手工陶瓷花瓶/i })).toBeInTheDocument();
    expect(screen.getByText(/¥299/i)).toBeInTheDocument();
    expect(screen.getAllByText(/陶瓷/i).length).toBeGreaterThan(0);
    expect(screen.getByText(/陶土/i)).toBeInTheDocument();
  });

  it('shows 1/1 独一件 badge for unique products', () => {
    render(<ProductDetail product={mockProduct} onBack={mockOnBack} onAddToCart={mockOnAddToCart} />);

    expect(screen.getByText(/1\/1 独一件/i)).toBeInTheDocument();
  });

  it('shows customizable badge for customizable products', () => {
    const customizableProduct = { ...mockProduct, isCustomizable: true };
    render(<ProductDetail product={customizableProduct} onBack={mockOnBack} onAddToCart={mockOnAddToCart} />);

    expect(screen.getByText(/支持定制/i)).toBeInTheDocument();
  });

  it('does not show badges for regular products', () => {
    const regularProduct = { ...mockProduct, isOneOfOne: false, isCustomizable: false };
    render(<ProductDetail product={regularProduct} onBack={mockOnBack} onAddToCart={mockOnAddToCart} />);

    expect(screen.queryByText(/1\/1 独一件/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/支持定制/i)).not.toBeInTheDocument();
  });

  it('calls onBack when back button is clicked', () => {
    render(<ProductDetail product={mockProduct} onBack={mockOnBack} onAddToCart={mockOnAddToCart} />);

    const backButton = screen.getByRole('button', { name: /返回/i });
    fireEvent.click(backButton);

    expect(mockOnBack).toHaveBeenCalledTimes(1);
  });

  it('calls onAddToCart when add to cart button is clicked', () => {
    render(<ProductDetail product={mockProduct} onBack={mockOnBack} onAddToCart={mockOnAddToCart} />);

    const addToCartButton = screen.getByRole('button', { name: /加入购物车/i });
    fireEvent.click(addToCartButton);

    expect(mockOnAddToCart).toHaveBeenCalledTimes(1);
  });

  it('renders product images', () => {
    render(<ProductDetail product={mockProduct} onBack={mockOnBack} onAddToCart={mockOnAddToCart} />);

    const images = screen.getAllByRole('img');
    expect(images.length).toBeGreaterThan(0);
    expect(images[0]).toHaveAttribute('alt', mockProduct.name);
  });

  it('displays product description', () => {
    render(<ProductDetail product={mockProduct} onBack={mockOnBack} onAddToCart={mockOnAddToCart} />);

    const descriptionTexts = screen.getAllByText((content, element) => {
      return element?.textContent?.includes('手工陶瓷花瓶') || content?.includes('工匠精心制作');
    });
    expect(descriptionTexts.length).toBeGreaterThan(0);
  });
});
