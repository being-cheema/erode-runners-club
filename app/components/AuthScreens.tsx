import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { ArrowLeft } from 'lucide-react';
import type { Screen } from '../App';

interface AuthScreensProps {
  type: 'login' | 'signup' | 'forgot-password';
  onAuth: () => void;
  onNavigate: (screen: Screen) => void;
}

export function AuthScreens({ type, onAuth, onNavigate }: AuthScreensProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (type === 'forgot-password') {
      onNavigate('login');
    } else {
      onAuth();
    }
  };

  const renderLoginScreen = () => (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            className="h-12 border border-border rounded-lg"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={(e) => handleInputChange('password', e.target.value)}
            className="h-12 border border-border rounded-lg"
          />
        </div>
      </div>

      <Button 
        type="submit" 
        className="w-full h-12"
      >
        Sign In
      </Button>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t border-border" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">Or</span>
        </div>
      </div>

      <Button 
        variant="outline" 
        className="w-full h-12"
      >
        Continue with Strava
      </Button>

      <div className="text-center space-y-4">
        <button 
          type="button"
          onClick={() => onNavigate('forgot-password')}
          className="text-sm text-muted-foreground hover:text-foreground"
        >
          Forgot password?
        </button>
        <div className="text-sm text-muted-foreground">
          Don't have an account?{' '}
          <button 
            type="button"
            onClick={() => onNavigate('signup')}
            className="text-foreground hover:underline"
          >
            Sign up
          </button>
        </div>
      </div>
    </div>
  );

  const renderSignupScreen = () => (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name">Full Name</Label>
          <Input
            id="name"
            type="text"
            placeholder="Enter your full name"
            value={formData.name}
            onChange={(e) => handleInputChange('name', e.target.value)}
            className="h-12 border border-border rounded-lg"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            className="h-12 border border-border rounded-lg"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            placeholder="Create a password"
            value={formData.password}
            onChange={(e) => handleInputChange('password', e.target.value)}
            className="h-12 border border-border rounded-lg"
          />
        </div>
      </div>

      <Button 
        type="submit" 
        className="w-full h-12"
      >
        Create Account
      </Button>

      <div className="text-center text-sm text-muted-foreground">
        Already have an account?{' '}
        <button 
          type="button"
          onClick={() => onNavigate('login')}
          className="text-foreground hover:underline"
        >
          Sign in
        </button>
      </div>
    </div>
  );

  const renderForgotPasswordScreen = () => (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <p className="text-muted-foreground">
          Enter your email address and we'll send you a reset link.
        </p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          placeholder="Enter your email"
          value={formData.email}
          onChange={(e) => handleInputChange('email', e.target.value)}
          className="h-12 border border-border rounded-lg"
        />
      </div>

      <Button 
        type="submit" 
        className="w-full h-12"
      >
        Send Reset Link
      </Button>

      <div className="text-center text-sm text-muted-foreground">
        Remember your password?{' '}
        <button 
          type="button"
          onClick={() => onNavigate('login')}
          className="text-foreground hover:underline"
        >
          Sign in
        </button>
      </div>
    </div>
  );

  const getTitle = () => {
    switch (type) {
      case 'login':
        return 'Sign In';
      case 'signup':
        return 'Create Account';
      case 'forgot-password':
        return 'Reset Password';
      default:
        return '';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="px-6 pt-16 pb-8">
        {/* Header */}
        <div className="flex items-center mb-12">
          {type !== 'login' && (
            <button 
              onClick={() => onNavigate('login')}
              className="p-2 -ml-2 rounded-lg hover:bg-muted"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Title */}
        <div className="mb-8">
          <h1 className="text-2xl font-medium mb-2">{getTitle()}</h1>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {type === 'login' && renderLoginScreen()}
          {type === 'signup' && renderSignupScreen()}
          {type === 'forgot-password' && renderForgotPasswordScreen()}
        </form>
      </div>
    </div>
  );
}