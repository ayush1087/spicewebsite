import React, { useState } from 'react';
import { useShop } from '../../context/ShopContext';
import { ShieldCheck, Truck, Tag, CreditCard, QrCode, Banknote, ArrowRight, CheckCircle2 } from 'lucide-react';
import confetti from 'canvas-confetti';

export const CheckoutPage: React.FC = () => {
  const { cart, cartSubtotal, freeShippingThreshold, addOrder, setActivePage, addToast, user, coupons } = useShop();

  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState<any>(null);
  const [discountAmount, setDiscountAmount] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'card' | 'cod'>('upi');

  const [shippingAddress, setShippingAddress] = useState({
    fullName: user?.name || '',
    email: user?.contact?.includes('@') ? user.contact : '',
    phone: !user?.contact?.includes('@') ? user?.contact : '',
    address: 'Suite 402, Royal Residency, Bandra West',
    city: 'Mumbai',
    state: 'Maharashtra',
    pincode: '400050'
  });

  const [isPhoneVerified, setIsPhoneVerified] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otpValue, setOtpValue] = useState('');

  const isFreeShipping = cartSubtotal >= freeShippingThreshold;
  const shippingFee = isFreeShipping ? 0 : 49;
  const finalTotal = Math.max(0, cartSubtotal + shippingFee - discountAmount);

  const applyCoupon = () => {
    const code = couponCode.trim().toUpperCase();
    const activeCoupon = coupons?.find(c => c.status === 'Active' && c.code === code);
    
    if (activeCoupon) {
      if (activeCoupon.minOrderValue && cartSubtotal < activeCoupon.minOrderValue) {
        addToast(`This coupon requires a minimum order of ₹${activeCoupon.minOrderValue}`, 'warning');
        return;
      }
      
      let disc = 0;
      if (activeCoupon.discount.includes('%')) {
        const percent = parseFloat(activeCoupon.discount);
        disc = Math.round(cartSubtotal * (percent / 100));
      } else {
        const amount = parseFloat(activeCoupon.discount.replace(/[^0-9.]/g, ''));
        disc = amount || 0;
      }
      
      setDiscountAmount(disc);
      setAppliedCoupon(activeCoupon);
      addToast(`Coupon ${code} Applied! ${activeCoupon.discount} Discount unlocked.`, 'success');
    } else {
      addToast(`Invalid or inactive Coupon Code.`, 'warning');
      setAppliedCoupon(null);
      setDiscountAmount(0);
    }
  };

  const handlePincodeChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setShippingAddress(prev => ({ ...prev, pincode: val }));

    if (val.length === 6 && /^\d+$/.test(val)) {
      try {
        const response = await fetch(`https://api.postalpincode.in/pincode/${val}`);
        const data = await response.json();
        if (data && data[0] && data[0].Status === 'Success' && data[0].PostOffice && data[0].PostOffice.length > 0) {
          const postOffice = data[0].PostOffice[0];
          setShippingAddress(prev => ({
            ...prev,
            city: postOffice.District,
            state: postOffice.State
          }));
          addToast('City and State auto-filled!', 'success');
        }
      } catch (error) {
        console.error('Failed to fetch pincode details', error);
      }
    }
  };

  const handleSendOTP = () => {
    if (shippingAddress.phone.length < 10) {
      addToast('Please enter a valid phone number to verify.', 'warning');
      return;
    }
    setOtpSent(true);
    addToast('OTP sent successfully via SMS! (Use 123456 for testing)', 'success');
  };

  const handleVerifyOTP = () => {
    if (otpValue === '123456') {
      setIsPhoneVerified(true);
      setOtpSent(false);
      addToast('Phone number verified securely!', 'success');
    } else {
      addToast('Invalid OTP entered. Please check and try again.', 'warning');
    }
  };

  const handlePlaceOrder = () => {
    if (cart.length === 0) {
      addToast('Your cart is empty!', 'warning');
      return;
    }

    const newOrder = {
      id: `ORD-${Math.floor(1000 + Math.random() * 9000)}`,
      date: new Date().toISOString().split('T')[0],
      status: 'Processing',
      total: finalTotal,
      items: cart.map((i) => ({
        name: `${i.product.name} (${i.selectedWeight})`,
        qty: i.quantity,
        price: i.product.price * i.quantity
      })),
      trackingNo: `CRF-TRK-${Math.floor(10000 + Math.random() * 90000)}`,
      customer: {
        name: shippingAddress.fullName || user?.name || 'Guest',
        email: user?.contact || 'Not Provided',
        phone: shippingAddress.phone || 'Not Provided'
      },
      shippingAddress
    };

    addOrder(newOrder);

    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });

    setActivePage('account');
  };

  return (
    <div className="pt-40 sm:pt-48 pb-24 bg-white font-sans min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs uppercase font-bold tracking-widest text-[#C9A227]">
            256-Bit Encrypted Checkout
          </span>
          <h1 className="text-3xl sm:text-4xl font-bold font-serif-luxury text-gray-900">
            Complete Your Reserve Order
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left: Shipping & Payment Details */}
          <div className="lg:col-span-7 space-y-8">
            {/* Step 1: Shipping Address */}
            <div className="p-8 bg-[#F8F8F8] rounded-3xl border border-gray-200 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[#111111] text-white flex items-center justify-center text-xs font-bold">
                  1
                </div>
                <h3 className="font-bold text-lg text-gray-900 font-serif-luxury">Shipping Destination</h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="font-semibold text-gray-700 block mb-1">Full Name</label>
                  <input
                    type="text"
                    value={shippingAddress.fullName}
                    onChange={(e) => setShippingAddress({ ...shippingAddress, fullName: e.target.value })}
                    className="w-full p-3 bg-white border border-gray-200 rounded-xl"
                  />
                </div>
                <div>
                  <label className="font-semibold text-gray-700 block mb-1">Phone Number</label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={shippingAddress.phone}
                      onChange={(e) => setShippingAddress({ ...shippingAddress, phone: e.target.value })}
                      disabled={isPhoneVerified}
                      className={`w-full p-3 bg-white border border-gray-200 rounded-xl ${isPhoneVerified ? 'opacity-70 bg-gray-50' : ''}`}
                    />
                    {!isPhoneVerified && (
                      <button 
                        onClick={handleSendOTP} 
                        className="px-4 py-2 bg-[#111111] text-white rounded-xl font-bold whitespace-nowrap hover:bg-[#C9A227] hover:text-[#111111] transition-colors"
                      >
                        Verify
                      </button>
                    )}
                    {isPhoneVerified && (
                      <div className="px-4 flex items-center justify-center bg-emerald-50 text-emerald-600 rounded-xl border border-emerald-200" title="Phone verified">
                        <CheckCircle2 className="w-5 h-5" />
                      </div>
                    )}
                  </div>
                  {otpSent && !isPhoneVerified && (
                    <div className="mt-3 p-3 bg-white border border-amber-200 rounded-xl flex gap-2 items-center shadow-sm">
                      <input 
                        type="text" 
                        placeholder="Enter OTP" 
                        value={otpValue}
                        onChange={(e) => setOtpValue(e.target.value)}
                        className="w-full p-2 bg-gray-50 border border-gray-200 rounded-lg text-center tracking-widest font-bold focus:outline-none focus:border-[#C9A227]"
                        maxLength={6}
                      />
                      <button 
                        onClick={handleVerifyOTP}
                        className="px-4 py-2 bg-[#C9A227] text-[#111111] font-bold rounded-lg whitespace-nowrap hover:bg-amber-500 transition-colors"
                      >
                        Confirm
                      </button>
                    </div>
                  )}
                </div>
                <div className="sm:col-span-2">
                  <label className="font-semibold text-gray-700 block mb-1">Street Address</label>
                  <input
                    type="text"
                    value={shippingAddress.address}
                    onChange={(e) => setShippingAddress({ ...shippingAddress, address: e.target.value })}
                    className="w-full p-3 bg-white border border-gray-200 rounded-xl"
                  />
                </div>
                <div>
                  <label className="font-semibold text-gray-700 block mb-1">City</label>
                  <input
                    type="text"
                    value={shippingAddress.city}
                    onChange={(e) => setShippingAddress({ ...shippingAddress, city: e.target.value })}
                    className="w-full p-3 bg-white border border-gray-200 rounded-xl"
                  />
                </div>
                <div>
                  <label className="font-semibold text-gray-700 block mb-1">PIN Code</label>
                  <input
                    type="text"
                    maxLength={6}
                    value={shippingAddress.pincode}
                    onChange={handlePincodeChange}
                    className="w-full p-3 bg-white border border-gray-200 rounded-xl"
                  />
                </div>
              </div>

              {/* State Field (added below city and pincode) */}
              <div className="mt-4">
                <label className="font-semibold text-gray-700 block mb-1">State</label>
                <input
                  type="text"
                  value={shippingAddress.state}
                  onChange={(e) => setShippingAddress({ ...shippingAddress, state: e.target.value })}
                  className="w-full p-3 bg-white border border-gray-200 rounded-xl"
                />
              </div>
            </div>

            {/* Step 2: Payment Method */}
            <div className="p-8 bg-[#F8F8F8] rounded-3xl border border-gray-200 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[#111111] text-white flex items-center justify-center text-xs font-bold">
                  2
                </div>
                <h3 className="font-bold text-lg text-gray-900 font-serif-luxury">Select Payment Mode</h3>
              </div>

              <div className="grid grid-cols-3 gap-4 text-xs font-bold">
                <button
                  onClick={() => setPaymentMethod('upi')}
                  className={`p-4 rounded-2xl border flex flex-col items-center gap-2 transition-all ${
                    paymentMethod === 'upi'
                      ? 'bg-[#111111] text-white border-[#111111] shadow-md'
                      : 'bg-white text-gray-700 border-gray-200'
                  }`}
                >
                  <QrCode className="w-5 h-5 text-[#C9A227]" />
                  <span>Instant UPI / QR</span>
                </button>
                <button
                  onClick={() => setPaymentMethod('card')}
                  className={`p-4 rounded-2xl border flex flex-col items-center gap-2 transition-all ${
                    paymentMethod === 'card'
                      ? 'bg-[#111111] text-white border-[#111111] shadow-md'
                      : 'bg-white text-gray-700 border-gray-200'
                  }`}
                >
                  <CreditCard className="w-5 h-5 text-[#C9A227]" />
                  <span>Cards / NetBanking</span>
                </button>
                <button
                  onClick={() => setPaymentMethod('cod')}
                  className={`p-4 rounded-2xl border flex flex-col items-center gap-2 transition-all ${
                    paymentMethod === 'cod'
                      ? 'bg-[#111111] text-white border-[#111111] shadow-md'
                      : 'bg-white text-gray-700 border-gray-200'
                  }`}
                >
                  <Banknote className="w-5 h-5 text-[#C9A227]" />
                  <span>Cash On Delivery</span>
                </button>
              </div>

              {paymentMethod === 'upi' && (
                <div className="p-4 bg-amber-50 rounded-2xl border border-amber-200 flex items-center gap-4 text-xs text-gray-700">
                  <div className="w-16 h-16 bg-white p-2 rounded-xl border border-amber-300 flex items-center justify-center font-bold text-[10px] text-[#C9A227]">
                    CROF UPI
                  </div>
                  <div>
                    <p className="font-bold text-gray-900">Scan via GPay / PhonePe / Paytm / BHIM</p>
                    <p className="text-[11px] text-gray-500">Pay directly to official VPA: <strong className="text-gray-900">crofspices@icici</strong></p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right: Order Summary */}
          <div className="lg:col-span-5 bg-[#111111] text-white p-8 rounded-3xl space-y-6 shadow-2xl">
            <h3 className="text-xl font-bold font-serif-luxury">Order Summary</h3>

            {/* Cart Items list preview */}
            <div className="space-y-3 max-h-56 overflow-y-auto pr-2">
              {cart.map((item, idx) => (
                <div key={idx} className="flex justify-between items-center text-xs pb-2 border-b border-white/10">
                  <div>
                    <p className="font-bold">{item.product.name}</p>
                    <p className="text-[10px] text-gray-400">{item.selectedWeight} x {item.quantity}</p>
                  </div>
                  <span className="font-bold text-[#C9A227]">₹{item.product.price * item.quantity}</span>
                </div>
              ))}
            </div>

            {/* Coupon input */}
            <div className="space-y-2 pt-2 border-t border-white/10">
              <label className="text-[11px] text-gray-400 font-medium">Have a Promo / Gift Coupon?</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  placeholder={coupons?.find(c => c.status === 'Active')?.code ? `Try ${coupons.find(c => c.status === 'Active')?.code}` : "Enter Coupon"}
                  className="flex-1 px-3 py-2 bg-white/10 border border-white/20 rounded-xl text-xs uppercase tracking-wider text-white focus:outline-none"
                />
                <button
                  onClick={applyCoupon}
                  className="px-4 py-2 bg-[#C9A227] text-[#111111] text-xs font-bold uppercase rounded-xl hover:bg-amber-400"
                >
                  Apply
                </button>
              </div>
            </div>

            {/* Summary calculation */}
            <div className="space-y-2 text-xs text-gray-300 pt-4 border-t border-white/10">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-semibold text-white">₹{cartSubtotal}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping Fee</span>
                <span className="font-semibold text-emerald-400">{isFreeShipping ? 'FREE' : `₹${shippingFee}`}</span>
              </div>
              {discountAmount > 0 && (
                <div className="flex justify-between text-emerald-400 font-semibold">
                  <span>Coupon Discount {appliedCoupon ? `(${appliedCoupon.discount})` : ''}</span>
                  <span>-₹{discountAmount}</span>
                </div>
              )}
              <div className="flex justify-between text-base font-bold text-white pt-2 border-t border-white/20">
                <span>Payable Amount</span>
                <span className="text-[#C9A227]">₹{finalTotal}</span>
              </div>
            </div>

            <button
              onClick={handlePlaceOrder}
              disabled={!isPhoneVerified}
              className={`w-full py-4 text-xs font-bold uppercase tracking-widest rounded-2xl shadow-lg flex items-center justify-center gap-2 transition-colors ${!isPhoneVerified ? 'bg-gray-700 text-gray-500 cursor-not-allowed' : 'bg-[#C9A227] text-[#111111] hover:bg-amber-400'}`}
              title={!isPhoneVerified ? 'Verify phone number to proceed' : 'Place Order'}
            >
              Confirm & Pay ₹{finalTotal} <ArrowRight className="w-4 h-4" />
            </button>

            <div className="flex items-center justify-center gap-2 text-[10px] text-gray-400 pt-2">
              <ShieldCheck className="w-4 h-4 text-[#C9A227]" />
              Safe & Secure Payments • 100% Satisfaction Guarantee
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
