import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { authApi, userApi, productsApi, UserMeResponse, LoginPayload, RegisterPayload } from '../api';

interface AuthContextType {
  user: UserMeResponse | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  savedProductIds: Set<string>;
  login: (payload: LoginPayload) => Promise<void>;
  register: (payload: RegisterPayload) => Promise<void>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
  toggleSaveProduct: (productId: string) => Promise<boolean>;
  isProductSaved: (productId: string) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserMeResponse | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [savedProductIds, setSavedProductIds] = useState<Set<string>>(new Set());

  // Load user profile & saved products on initial mount if token exists
  const fetchUserData = async () => {
    const token = localStorage.getItem('trustcart_token');
    if (!token) {
      setUser(null);
      setSavedProductIds(new Set());
      setIsLoading(false);
      return;
    }

    try {
      const me = await authApi.getMe();
      setUser(me);

      // Fetch saved products for quick lookup
      try {
        const saved = await userApi.getSavedProducts();
        setSavedProductIds(new Set(saved.map((s) => s.product_id)));
      } catch (err) {
        console.warn('Could not fetch saved products list:', err);
      }
    } catch (err) {
      console.warn('Session expired or invalid token:', err);
      localStorage.removeItem('trustcart_token');
      setUser(null);
      setSavedProductIds(new Set());
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const login = async (payload: LoginPayload) => {
    setIsLoading(true);
    try {
      const res = await authApi.login(payload);
      localStorage.setItem('trustcart_token', res.access_token);
      await fetchUserData();
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (payload: RegisterPayload) => {
    setIsLoading(true);
    try {
      const res = await authApi.register(payload);
      localStorage.setItem('trustcart_token', res.access_token);
      await fetchUserData();
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      await authApi.logout();
    } catch {
      // Continue client cleanup even if network fails
    } finally {
      localStorage.removeItem('trustcart_token');
      setUser(null);
      setSavedProductIds(new Set());
    }
  };

  const refreshUser = async () => {
    await fetchUserData();
  };

  const toggleSaveProduct = async (productId: string): Promise<boolean> => {
    if (!user) {
      throw new Error('Please sign in to save products.');
    }

    const isCurrentlySaved = savedProductIds.has(productId);

    try {
      if (isCurrentlySaved) {
        await productsApi.unsaveProduct(productId);
        setSavedProductIds((prev) => {
          const next = new Set(prev);
          next.delete(productId);
          return next;
        });
        return false;
      } else {
        await productsApi.saveProduct(productId);
        setSavedProductIds((prev) => {
          const next = new Set(prev);
          next.add(productId);
          return next;
        });
        return true;
      }
    } catch (err) {
      console.error('Failed to toggle save product:', err);
      throw err;
    }
  };

  const isProductSaved = (productId: string) => {
    return savedProductIds.has(productId);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        savedProductIds,
        login,
        register,
        logout,
        refreshUser,
        toggleSaveProduct,
        isProductSaved
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
