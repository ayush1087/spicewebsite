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

export interface StockHistoryRecord {
  id: string;
  date: string;
  adminName: string;
  productId: string;
  productName: string;
  variantWeight: string;
  oldStock: number;
  newStock: number;
  reason: string;
}

export interface ShopContextType {
  stockHistory: StockHistoryRecord[];
  updateVariantStock: (productId: string, weight: string, delta: number, type: 'increase' | 'decrease' | 'set', reason: string, adminName?: string) => void;
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

  // Coupons
  coupons: Coupon[];
  addCoupon: (coupon: Coupon) => void;
  deleteCoupon: (id: string) => void;
  toggleCouponStatus: (id: string) => void;

  // Reviews
  reviews: Review[];
  likedReviews: string[];
  addReview: (review: Review) => void;
  toggleReviewLike: (id: string | number) => void;
}

export interface Review {
  id: string | number;
  author: string;
  product: string;
  rating: number;
  date: string;
  text: string;
  status: 'Approved' | 'Pending' | 'Rejected';
  helpful: number;
}

export interface Coupon {
  id: string;
  code: string;
  discount: string;
  status: 'Active' | 'Inactive';
  minOrderValue?: number;
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
      if (saved) {
        let parsed = JSON.parse(saved);
        // Safe migration for older string-based categories in localStorage
        parsed = parsed.map((p: any) => {
          if (!p.variants || !Array.isArray(p.variants)) {
            throw new Error('Old product structure detected');
          }
          return {
            ...p,
            category: Array.isArray(p.category) ? p.category : [p.category],
            gallery: Array.isArray(p.gallery) ? p.gallery : (p.image ? [p.image] : [])
          };
        });
        return parsed;
      }
      return PRODUCTS;
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
  const [stockHistory, setStockHistory] = useState<StockHistoryRecord[]>(() => {
    try {
      const saved = localStorage.getItem('crof_stock_history');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('crof_stock_history', JSON.stringify(stockHistory));
  }, [stockHistory]);

  const updateVariantStock = (productId: string, weight: string, delta: number, type: 'increase' | 'decrease' | 'set', reason: string, adminName: string = 'Admin') => {
    setProducts(prevProducts => prevProducts.map(p => {
      if (p.id === productId) {
        return {
          ...p,
          variants: p.variants.map((v: any) => {
            if (v.weight === weight) {
              const oldStock = v.currentStock;
              let newStock = v.currentStock;
              if (type === 'set') newStock = delta;
              else if (type === 'increase') newStock = oldStock + delta;
              else if (type === 'decrease') newStock = Math.max(0, oldStock - delta);
              
              let status = 'In Stock';
              if (newStock === 0) status = 'Out Of Stock';
              else if (newStock <= 20) status = 'Low Stock';

              setStockHistory((prev: any) => [{
                id: Math.random().toString(36).substr(2, 9),
                date: new Date().toISOString(),
                adminName,
                productId,
                productName: p.name,
                variantWeight: weight,
                oldStock,
                newStock,
                reason
              }, ...prev]);

              return { ...v, currentStock: newStock, status };
            }
            return v;
          })
        };
      }
      return p;
    }));
  };

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

  // Coupons
  const [coupons, setCoupons] = useState<Coupon[]>(() => {
    try {
      const saved = localStorage.getItem('crof_coupons');
      return saved ? JSON.parse(saved) : [
        { id: '1', code: 'PURECROF', discount: '10%', status: 'Active', minOrderValue: 799 }
      ];
    } catch {
      return [
        { id: '1', code: 'PURECROF', discount: '10%', status: 'Active', minOrderValue: 799 }
      ];
    }
  });

  useEffect(() => {
    localStorage.setItem('crof_coupons', JSON.stringify(coupons));
  }, [coupons]);

  const addCoupon = (coupon: Coupon) => {
    setCoupons((prev) => [...prev, coupon]);
  };

  const deleteCoupon = (id: string) => {
    setCoupons((prev) => prev.filter((c) => c.id !== id));
  };

  const toggleCouponStatus = (id: string) => {
    setCoupons((prev) =>
      prev.map((c) => (c.id === id ? { ...c, status: c.status === 'Active' ? 'Inactive' : 'Active' } : c))
    );
  };

  // Reviews
  const [reviews, setReviews] = useState<Review[]>(() => {
    try {
      const saved = localStorage.getItem('crof_reviews');
      return saved ? JSON.parse(saved) : [
        { id: 1, author: 'Chef Ranveer', product: 'Lakadong High Curcumin Turmeric', rating: 5, date: 'Oct 12, 2023', text: 'Vibrant golden hue and unmatched aroma! Absolute essential for my kitchen.', status: 'Approved', helpful: 12 },
        { id: 2, author: 'Kavita S.', product: 'Lakadong High Curcumin Turmeric', rating: 5, date: 'Nov 04, 2023', text: 'Deep natural color, very pure quality.', status: 'Approved', helpful: 8 },
        { id: 3, author: 'Rahul M.', product: 'Lakadong High Curcumin Turmeric', rating: 4, date: 'Dec 01, 2023', text: 'Good quality, but shipping took an extra day.', status: 'Approved', helpful: 3 },
        { id: 4, author: 'Anita K.', product: 'Kashmiri Red Chilli', rating: 5, date: 'Jan 15, 2024', text: 'Perfect red color without being too spicy. Just what I needed.', status: 'Approved', helpful: 24 },
        { id: 5, author: 'Priya D.', product: 'Kashmiri Red Chilli', rating: 3, date: 'Feb 10, 2024', text: 'The color is good but the packaging was slightly damaged on arrival.', status: 'Approved', helpful: 1 },
        { id: 6, author: 'Suresh V.', product: 'Royal Garam Masala', rating: 5, date: 'Mar 22, 2024', text: 'Very aromatic whole spices. Highly recommended.', status: 'Approved', helpful: 45 }
      ];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('crof_reviews', JSON.stringify(reviews));
  }, [reviews]);

  const addReview = (review: Review) => {
    // For demo purposes, we automatically approve the review so the user can see it immediately
    setReviews((prev) => [{ ...review, status: 'Approved' }, ...prev]);
  };

  const [likedReviews, setLikedReviews] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('crof_liked_reviews');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('crof_liked_reviews', JSON.stringify(likedReviews));
  }, [likedReviews]);

  const toggleReviewLike = (id: string | number) => {
    const idStr = id.toString();
    const hasLiked = likedReviews.includes(idStr);
    
    setLikedReviews(prev => 
      hasLiked ? prev.filter(rId => rId !== idStr) : [...prev, idStr]
    );

    setReviews((prev) =>
      prev.map((r) => (r.id === id ? { ...r, helpful: Math.max(0, r.helpful + (hasLiked ? -1 : 1)) } : r))
    );
  };

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
    try {
      localStorage.setItem('crof_products', JSON.stringify(products));
    } catch (error) {
      console.warn('Failed to save products to localStorage. Quota exceeded.');
    }
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
      if (e.key === 'crof_reviews' && e.newValue) {
        setReviews(JSON.parse(e.newValue));
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
    // We do not clear orders or reviews here because they represent the global database in this mock app.
    // In a real app, cart and wishlist would be fetched per-user from the DB.
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
    const selectedWeight = weight || product.variants?.[0]?.weight || '100g';
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
    setCart((prev) => {
      let limitHit = false;
      const updated = prev.map((item) => {
        if (item.product.id === productId && item.selectedWeight === weight) {
          const variant = products.find(p => p.id === productId)?.variants.find(v => v.weight === weight);
          const newQty = item.quantity + delta;
          if (variant && newQty > variant.currentStock) {
            limitHit = true;
            return item;
          }
          return newQty > 0 ? { ...item, quantity: newQty } : null;
        }
        return item;
      }).filter(Boolean) as CartItem[];
      
      if (limitHit) {
        addToast(`Maximum available stock reached`, 'warning');
      }
      return updated;
    });
  };

  const clearCart = () => {
    setCart([]);
  };

  const cartSubtotal = cart.reduce((acc, item) => {
    const variant = item.product.variants.find((v: any) => v.weight === item.selectedWeight);
    return acc + ((variant?.salePrice || 0) * item.quantity);
  }, 0);
  
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
    // Deduct stock
    order.items?.forEach((item: any) => {
      updateVariantStock(item.product.id, item.selectedWeight, item.quantity, 'decrease', 'Sold (Order placed)', 'System');
    });
    clearCart();
    addToast('Order placed successfully! Track status in My Account.', 'success');
  };

  const cancelOrder = (orderId: string) => {
    const orderToCancel = orders.find(o => o.id === orderId);
    if (orderToCancel && orderToCancel.status !== 'Cancelled') {
      orderToCancel.items?.forEach((item: any) => {
        updateVariantStock(item.product.id, item.selectedWeight, item.quantity, 'increase', 'Restocked (Order Cancelled)', 'System');
      });
    }
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
        updateOrderStatus,
        coupons,
        addCoupon,
        deleteCoupon,
        toggleCouponStatus,
        reviews,
        likedReviews,
        addReview,
        toggleReviewLike,
        stockHistory,
        updateVariantStock
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
