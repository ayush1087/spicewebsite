import React, { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import { PRODUCTS } from '../data/products';
import type { Product } from '../data/products';
import confetti from 'canvas-confetti';

export interface CartItem {
  product: Product;
  selectedWeight: string;
  quantity: number;
}

interface ToastMessage {
  id: string;
  title: string;
  type?: 'success' | 'info' | 'warning';
}

interface ShopContextType {
  // Products
  products: Product[];
  deleteProduct: (productId: string) => void;
  addProduct: (product: Product) => void;
  updateProduct: (product: Product) => void;
  resetCatalog: () => void;

  // Navigation & Page State
  activePage: string;
  setActivePage: (page: string) => void;
  accountTab: string;
  setAccountTab: (tab: string) => void;
  selectedProductId: string | null;
  openProductPage: (productId: string) => void;

  // Cart
  cart: CartItem[];
  addToCart: (product: Product, weight?: string, qty?: number) => void;
  removeFromCart: (productId: string, weight: string) => void;
  updateCartQuantity: (productId: string, weight: string, delta: number) => void;
  clearCart: () => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  cartSubtotal: number;
  freeShippingThreshold: number;

  // Wishlist
  wishlist: string[];
  toggleWishlist: (productId: string) => void;

  // Compare
  compareList: string[];
  toggleCompare: (productId: string) => void;
  isCompareOpen: boolean;
  setIsCompareOpen: (open: boolean) => void;

  // Search & Modals
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;
  quickViewProduct: Product | null;
  setQuickViewProduct: (product: Product | null) => void;

  // Auth
  user: any | null;
  setUser: (user: any) => void;
  isAuthModalOpen: boolean;
  setIsAuthModalOpen: (open: boolean) => void;
  login: (userData: any) => void;
  logout: () => void;

  // Notifications
  toasts: ToastMessage[];
  addToast: (title: string, type?: 'success' | 'info' | 'warning') => void;

  // Order History for Account page
  orders: any[];
  addOrder: (order: any) => void;
  cancelOrder: (orderId: string) => void;
  updateOrderStatus: (orderId: string, status: string) => void;
}

const ShopContext = createContext<ShopContextType | undefined>(undefined);

export const ShopProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [activePage, setActivePage] = useState<string>('home');
  const [accountTab, setAccountTab] = useState<string>('orders');
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);

  // Stateful Products List to allow deletion/adding
  const [products, setProducts] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem('crof_products');
      return saved ? JSON.parse(saved) : PRODUCTS;
    } catch {
      return PRODUCTS;
    }
  });

  // Cart state initialized from localStorage if available
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('crof_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);

  // Wishlist state
  const [wishlist, setWishlist] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('crof_wishlist');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Compare state
  const [compareList, setCompareList] = useState<string[]>([]);
  const [isCompareOpen, setIsCompareOpen] = useState(false);

  // Search & Modals
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  // Auth
  const [user, setUser] = useState<any | null>(() => {
    try {
      const saved = localStorage.getItem('crof_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  useEffect(() => {
    if (user) {
      localStorage.setItem('crof_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('crof_user');
    }
  }, [user]);

  // Toasts
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Orders
  const [orders, setOrders] = useState<any[]>(() => {
    try {
      const saved = localStorage.getItem('crof_orders');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Sync to local storage
  useEffect(() => {
    localStorage.setItem('crof_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('crof_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('crof_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem('crof_products', JSON.stringify(products));
  }, [products]);

  // Sync state across tabs
  useEffect(() => {
    const handleStorage = (e: StorageEvent) => {
      if (e.key === 'crof_products' && e.newValue) {
        setProducts(JSON.parse(e.newValue));
      }
      if (e.key === 'crof_orders' && e.newValue) {
        setOrders(JSON.parse(e.newValue));
      }
    };
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  const addToast = (title: string, type: 'success' | 'info' | 'warning' = 'success') => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, title, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3500);
  };

  const login = (userData: any) => {
    setUser(userData);
    setIsAuthModalOpen(false);
    addToast(`Welcome, ${userData.name}!`, 'success');
  };

  const logout = () => {
    setUser(null);
    setCart([]);
    setWishlist([]);
    setOrders([]);
    setCompareList([]);
    setActivePage('home');
    addToast('You have been logged out. All data cleared.', 'info');
  };

  const deleteProduct = (productId: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== productId));
    addToast('Product SKU removed successfully from catalog', 'warning');
  };

  const addProduct = (newProduct: Product) => {
    setProducts((prev) => [newProduct, ...prev]);
    addToast(`Product SKU "${newProduct.name}" created successfully`, 'success');
  };

  const updateProduct = (updatedProduct: Product) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === updatedProduct.id ? updatedProduct : p))
    );
    addToast(`Product SKU "${updatedProduct.name}" updated successfully`, 'success');
  };

  const resetCatalog = () => {
    setProducts(PRODUCTS);
    addToast('Catalog reset to default premium spices', 'success');
  };

  const openProductPage = (productId: string) => {
    setSelectedProductId(productId);
    setActivePage('product');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const addToCart = (product: Product, weight?: string, qty: number = 1) => {
    const selectedWeight = weight || product.weightOptions[0];
    setCart((prev) => {
      const existingIndex = prev.findIndex(
        (item) => item.product.id === product.id && item.selectedWeight === selectedWeight
      );
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += qty;
        return updated;
      }
      return [...prev, { product, selectedWeight, quantity: qty }];
    });

    addToast(`Added ${product.name} (${selectedWeight}) to Cart!`, 'success');
    setIsCartOpen(true);

    // Subtle celebratory confetti
    confetti({
      particleCount: 35,
      spread: 60,
      origin: { y: 0.8 },
      colors: ['#c9a227', '#ffffff', '#111111']
    });
  };

  const removeFromCart = (productId: string, weight: string) => {
    setCart((prev) => prev.filter((item) => !(item.product.id === productId && item.selectedWeight === weight)));
    addToast('Item removed from Cart', 'info');
  };

  const updateCartQuantity = (productId: string, weight: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.product.id === productId && item.selectedWeight === weight) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const cartSubtotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const freeShippingThreshold = 799;

  const toggleWishlist = (productId: string) => {
    setWishlist((prev) => {
      const exists = prev.includes(productId);
      if (exists) {
        addToast('Removed from Wishlist', 'info');
        return prev.filter((id) => id !== productId);
      } else {
        addToast('Saved to Wishlist!', 'success');
        return [...prev, productId];
      }
    });
  };

  const toggleCompare = (productId: string) => {
    setCompareList((prev) => {
      const exists = prev.includes(productId);
      if (exists) {
        return prev.filter((id) => id !== productId);
      } else {
        if (prev.length >= 4) {
          addToast('You can compare up to 4 items at once', 'warning');
          return prev;
        }
        addToast('Added to Compare bar', 'info');
        setIsCompareOpen(true);
        return [...prev, productId];
      }
    });
  };

  const addOrder = (order: any) => {
    setOrders((prev) => [order, ...prev]);
    clearCart();
    addToast('Order placed successfully! Track status in My Account.', 'success');
  };

  const cancelOrder = (orderId: string) => {
    setOrders((prev) => 
      prev.map(order => 
        order.id === orderId ? { ...order, status: 'Cancelled' } : order
      )
    );
    addToast('Order cancelled successfully', 'info');
  };

  const updateOrderStatus = (orderId: string, status: string) => {
    setOrders((prev) => 
      prev.map(order => 
        order.id === orderId ? { ...order, status } : order
      )
    );
    addToast(`Order ${orderId} updated to ${status}`, 'success');
  };

  return (
    <ShopContext.Provider
      value={{
        products,
        deleteProduct,
        addProduct,
        updateProduct,
        resetCatalog,
        activePage,
        setActivePage: (p) => {
          setActivePage(p);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        },
        accountTab,
        setAccountTab,
        selectedProductId,
        openProductPage,
        cart,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        isCartOpen,
        setIsCartOpen,
        cartSubtotal,
        freeShippingThreshold,
        wishlist,
        toggleWishlist,
        compareList,
        toggleCompare,
        isCompareOpen,
        setIsCompareOpen,
        isSearchOpen,
        setIsSearchOpen,
        quickViewProduct,
        setQuickViewProduct,
        user,
        setUser,
        isAuthModalOpen,
        setIsAuthModalOpen,
        login,
        logout,
        toasts,
        addToast,
        orders,
        addOrder,
        cancelOrder,
        updateOrderStatus
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = () => {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error('useShop must be used within a ShopProvider');
  }
  return context;
};
