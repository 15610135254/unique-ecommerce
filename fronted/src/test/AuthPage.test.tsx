import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import AuthPage from '../../components/AuthPage';
import '@testing-library/jest-dom';

describe('AuthPage', () => {
  const mockOnAuthSuccess = vi.fn();

  it('renders login form by default', () => {
    render(<AuthPage onAuthSuccess={mockOnAuthSuccess} />);

    expect(screen.getByText(/欢迎回来/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/手机号码/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/密码/i)).toBeInTheDocument();
    const submitButtons = screen.getAllByRole('button');
    expect(submitButtons.some(btn => btn.textContent?.includes('登录'))).toBe(true);
  });

  it('renders registration form when toggled', () => {
    render(<AuthPage onAuthSuccess={mockOnAuthSuccess} />);

    const registerButton = screen.getByRole('button', { name: /创建账户/i });
    fireEvent.click(registerButton);

    expect(screen.getByText(/开启旅程/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/用户名/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/验证码/i)).toBeInTheDocument();
    const submitButtons = screen.getAllByRole('button');
    expect(submitButtons.some(btn => btn.textContent?.includes('注册'))).toBe(true);
  });

  it('switches between password and SMS login', () => {
    render(<AuthPage onAuthSuccess={mockOnAuthSuccess} />);

    const smsLoginButton = screen.getByRole('button', { name: /使用手机验证码登录/i });
    fireEvent.click(smsLoginButton);

    expect(screen.getByPlaceholderText(/验证码/i)).toBeInTheDocument();

    const passwordLoginButton = screen.getByRole('button', { name: /使用密码登录/i });
    fireEvent.click(passwordLoginButton);

    expect(screen.getByPlaceholderText(/密码/i)).toBeInTheDocument();
  });
});

