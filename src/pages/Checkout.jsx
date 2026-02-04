import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Lock, CreditCard } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useCart } from '../context/CartContext';
import { PlaceOrder } from '../services/PlaceOrder';

export default function Checkout() {
  const { cartItems, cartTotal } = useCart();
  const [step, setStep] = useState(1);
  const [item, setItem] = useState("");
  const [total, setTotal] = useState(0);
  const [quantity, setQuantity] = useState(0);
const [formData, setFormData] = useState({
    Firstname: '',
    Lastname: '',
    Email: '',
    Phone: '',
    // Item: '',
    // Total: '',
    // Quantity: '',
    Address: '',
    City: '',
    State:'',
    Zipcode:'',
    status:'pending'
  });

  // {item.name} × {item.quantity}
  //                     </span>
  //                     <span>{formatPrice(item.price * item.quantity)}</span>

const Order = cartItems.map((item) => ({
  Item: item.name,
  Quantity: item.quantity,
  Total: item.price * item.quantity
}));

const totalQuantity = cartItems.reduce(
  (sum, item) => sum + item.quantity,
  0
);

const handlePlaceOrder = () => {
  const finalFormData = {
    ...formData,
    Item: Order,          // 👈 cart items JSON
    Quantity: totalQuantity,
    Total: cartTotal
  };

  PlaceOrder(finalFormData);
};









  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'PKR',
      minimumFractionDigits: 0
    }).format(price);
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <main className="pt-32 pb-16">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <h1 className="text-3xl luxury-heading mb-4">Your Cart is Empty</h1>
            <p className="text-muted-foreground mb-8">
              Add some items to your cart to proceed with checkout.
            </p>
            <Link to="/shop" className="luxury-button inline-block">
              Continue Shopping
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <main className="pt-28 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-12">
            <Link
              to="/cart"
              className="inline-flex items-center text-muted-foreground hover:text-foreground mb-4 transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Cart
            </Link>
            <h1 className="text-3xl md:text-4xl luxury-heading">Checkout</h1>
          </div>

          {/* Steps */}
          <div className="flex items-center mb-12">
            {['Shipping'].map((stepName, index) => (
              <React.Fragment key={stepName}>
                <div className="flex items-center">
                  {/* <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${
                      step > index + 1
                        ? 'bg-secondary text-secondary-foreground'
                        : step === index + 1
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted text-muted-foreground'
                    }`}
                  >
                    {index + 1}
                  </div> */}
                  <span className={`ml-2 text-sm ${step >= index + 1 ? 'text-foreground' : 'text-muted-foreground'}`}>
                    {stepName}
                  </span>
                </div>
                {/* {index < 1 && (
                  <div className={`flex-1 h-px mx-4 ${step > index + 1 ? 'bg-secondary' : 'bg-border'}`} />
                )} */}
              </React.Fragment>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Form */}
            <div className="lg:col-span-2">
              {step === 1 && (
                <div className="space-y-6">
                  <h2 className="text-xl luxury-heading mb-6">Shipping Information</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm tracking-wider mb-2">First Name</label>
                      <input type="text" className="luxury-input" placeholder="John"
                      onChange={(e) => setFormData({ ...formData, Firstname: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className="block text-sm tracking-wider mb-2">Last Name</label>
                      <input type="text" className="luxury-input" placeholder="Doe"
                      onChange={(e) => setFormData({ ...formData, Lastname: e.target.value })}
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm tracking-wider mb-2">Email</label>
                    <input type="email" className="luxury-input" placeholder="john@example.com"
                      onChange={(e) => setFormData({ ...formData, Email: e.target.value })}                    
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm tracking-wider mb-2">Phone</label>
                    <input type="tel" className="luxury-input" placeholder="+1 (555) 000-0000" 
                      onChange={(e) => setFormData({ ...formData, Phone: e.target.value })}                    
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm tracking-wider mb-2">Address</label>
                    <input type="text" className="luxury-input" placeholder="123 Main Street"
                      onChange={(e) => setFormData({ ...formData, Address: e.target.value })}                    
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm tracking-wider mb-2">City</label>
                      <input type="text" className="luxury-input" placeholder="New York"
                      onChange={(e) => setFormData({ ...formData, City: e.target.value })}                      
                      />
                    </div>
                    <div>
                      <label className="block text-sm tracking-wider mb-2">State</label>
                      <input type="text" className="luxury-input" placeholder="NY"
                      onChange={(e) => setFormData({ ...formData, State: e.target.value })}                      
                      />
                    </div>
                    <div>
                      <label className="block text-sm tracking-wider mb-2">ZIP Code</label>
                      <input type="text" className="luxury-input" placeholder="10001"
                      onChange={(e) => setFormData({ ...formData, Zipcode: e.target.value })}                      
                      />
                    </div>
                  </div>
<button
  onClick={handlePlaceOrder}
  className="luxury-button flex-1"
>

                      Place Order - {formatPrice(cartTotal)}
                    </button>

                </div>
              )}
{/* 
              {step === 2 && (
                <div className="space-y-6">
                  <h2 className="text-xl luxury-heading mb-6">Payment Information</h2>
                  
                  <div className="flex items-center gap-2 text-muted-foreground text-sm mb-6">
                    <Lock className="w-4 h-4" />
                    <span>Your payment information is secure</span>
                  </div>
                  
                  <div>
                    <label className="block text-sm tracking-wider mb-2">Card Number</label>
                    <div className="relative">
                      <input type="text" className="luxury-input pr-12" placeholder="4242 4242 4242 4242" />
                      <CreditCard className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm tracking-wider mb-2">Expiry Date</label>
                      <input type="text" className="luxury-input" placeholder="MM/YY" />
                    </div>
                    <div>
                      <label className="block text-sm tracking-wider mb-2">CVC</label>
                      <input type="text" className="luxury-input" placeholder="123" />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm tracking-wider mb-2">Name on Card</label>
                    <input type="text" className="luxury-input" placeholder="John Doe" />
                  </div>

                  <div className="flex gap-4">
                    <button
                      onClick={() => setStep(1)}
                      className="luxury-button-outline"
                    >
                      Back
                    </button>
                    <button
                      onClick={() => setStep(3)}
                      className="luxury-button"
                    >
                      Review Order
                    </button>
                  </div>
                </div>
              )} */}

              {/* {step === 2 && (
                <div className="space-y-6">
                  <h2 className="text-xl luxury-heading mb-6">Review Your Order</h2>
                  
                  <div className="space-y-4">
                    {cartItems.map((item) => (
                      <div key={item.id} className="flex gap-4 pb-4 border-b border-border">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-20 h-20 object-cover"
                        />
                        <div className="flex-1">
                          <p className="font-medium">{item.name}</p>
                          <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                        </div>
                        <p className="font-medium">{formatPrice(item.price * item.quantity)}</p>
                      </div>
                    ))}
                  </div>

                  <div className="flex gap-4">
                    <button
                      onClick={() => setStep(1)}
                      className="luxury-button-outline"
                    >
                      Back
                    </button>
                    <button
                      onClick={() => alert('This is a demo. Order placement is not implemented.')}
                      className="luxury-button flex-1"
                    >
                      Place Order - {formatPrice(cartTotal)}
                    </button>
                  </div>
                </div>
              )} */}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-muted p-8 sticky top-28">
                <h2 className="text-xl luxury-heading mb-6">Order Summary</h2>
                
                <div className="space-y-3 mb-6">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex justify-between text-sm">
                      <span className="text-muted-foreground">
                        {item.name} × {item.quantity}
                      </span>
                      <span>{formatPrice(item.price * item.quantity)}</span>
                    </div>
                  ))}
                </div>

                <div className="border-t border-border pt-4 space-y-3 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>{formatPrice(cartTotal)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Shipping</span>
                    <span>Free</span>
                  </div>
                </div>

                <div className="border-t border-border pt-4">
                  <div className="flex justify-between text-lg">
                    <span className="font-medium">Total</span>
                    <span className="font-medium">{formatPrice(cartTotal)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
