import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ShoppingBag, Trash2, MessageCircle } from 'lucide-react';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);

  const fetchProducts = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/products');
      setProducts(res.data);
    } catch (err) {
      console.error("Error fetching products:", err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const addToCart = (product) => {
    const existing = cart.find(item => item._id === product._id);

    if (existing) {
      setCart(cart.map(item =>
        item._id === product._id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const removeFromCart = (productId) => {
    setCart(cart.filter(item => item._id !== productId));
  };

  const subtotal = cart.reduce((acc, curr) => acc + (curr.price * curr.quantity), 0);
  const gst = subtotal * 0.18;
  const total = subtotal + gst;

  // 🔥 UPDATED FUNCTION (LOGIN + USER DETAILS)
  const handleWhatsAppBooking = () => {
    const user = JSON.parse(localStorage.getItem("user"));

    // 🔒 If not logged in → redirect
    if (!user) {
      alert("Please login to continue");
      window.location.href = "/login";
      return;
    }

    let message = `*New Product Order*%0A%0A`;

    // 👤 USER DETAILS
    message += `*Customer Details*%0A`;
    message += `Name: ${user.name}%0A`;
    message += `Email: ${user.email}%0A`;
    message += `Phone: ${user.phone}%0A%0A`;

    message += `*Items Selected:*%0A`;

    cart.forEach(item => {
      message += `- ${item.quantity}x ${item.name} (₹${item.price * item.quantity})%0A`;
    });

    message += `%0A*Subtotal:* ₹${subtotal}%0A`;
    message += `*GST (18%):* ₹${gst.toFixed(2)}%0A`;
    message += `*Total Amount:* ₹${total.toFixed(2)}%0A%0A`;

    const whatsappNumber = '919876543210';
    window.open(`https://wa.me/${whatsappNumber}?text=${message}`, '_blank');
  };

  return (
    <div className="bg-zinc-50 min-h-screen pb-20">
      <div className="bg-black text-white py-16 px-4 text-center">
        <h1 className="text-4xl md:text-5xl heading-luxury text-gold-500 mb-4">
          Exclusive Products
        </h1>
      </div>

      <div className="max-w-7xl mx-auto px-4 mt-12 grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* PRODUCTS */}
        <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
          {products.map(product => (
            <div key={product._id} className="bg-white rounded-xl shadow border overflow-hidden">
              <div className="h-64 bg-gray-100">
                <img
                  src={product.image || "https://via.placeholder.com/300"}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="p-6">
                <h3 className="text-lg font-bold">{product.name}</h3>

                <p className="text-sm text-gray-500 mt-1">
                  {product.category}
                </p>

                <div className="flex justify-between items-center mt-4">
                  <span className="text-xl text-gold-500 font-bold">
                    ₹{product.price}
                  </span>

                  <button
                    onClick={() => addToCart(product)}
                    className="bg-black text-white p-2 rounded-full hover:bg-gold-500 hover:text-black"
                  >
                    <ShoppingBag size={20} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CART */}
        <div>
          <div className="bg-white rounded-xl shadow p-6 sticky top-24">

            <h2 className="text-sm font-semibold tracking-wider text-gray-600 mb-6">
              SELECTED PRODUCTS
            </h2>

            {/* ITEMS */}
            <div className="space-y-4 border-b pb-4">
              {cart.length === 0 ? (
                <p className="text-gray-400 text-sm">No products selected</p>
              ) : (
                cart.map(item => (
                  <div key={item._id} className="flex justify-between items-start">

                    <div>
                      <p className="font-medium text-gray-800">{item.name}</p>
                      <p className="text-gray-500 text-sm">
                        ₹{item.price * item.quantity}
                      </p>
                    </div>

                    <button
                      onClick={() => removeFromCart(item._id)}
                      className="text-red-500 hover:text-red-600"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))
              )}
            </div>

            {/* BILL */}
            {cart.length > 0 && (
              <div className="mt-4 space-y-2 text-sm">

                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>₹{subtotal.toFixed(2)}</span>
                </div>

                <div className="flex justify-between text-gray-600">
                  <span>GST (18%)</span>
                  <span>₹{gst.toFixed(2)}</span>
                </div>

                <div className="border-t pt-3 mt-2 flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span className="text-gold-500">₹{total.toFixed(2)}</span>
                </div>

                <button
                  onClick={handleWhatsAppBooking}
                  className="w-full mt-4 bg-green-500 text-white py-2 rounded flex items-center justify-center gap-2"
                >
                  <MessageCircle size={18} /> WhatsApp Checkout
                </button>

              </div>
            )}

          </div>
        </div>

      </div>
    </div>
  );
};

export default Products;