import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Plus, Trash2, Edit2, Save, X } from 'lucide-react';

const ManageProducts = () => {
  const [products, setProducts] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentProduct, setCurrentProduct] = useState({
    name: '',
    price: '',
    category: '',
    stock: ''
  });

  const fetchProducts = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/products');
      setProducts(res.data);
    } catch (err) {
      console.error("Fetch error:", err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleSave = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('adminToken');

    const payload = {
      name: currentProduct.name,
      category: currentProduct.category,
      price: Number(currentProduct.price),
      stock: Number(currentProduct.stock)
    };

    try {
      if (currentProduct._id) {
        // UPDATE (same as services)
        await axios.put(
          `http://localhost:5000/api/products/${currentProduct._id}`,
          payload,
          { headers: { Authorization: `Bearer ${token}` } }
        );
      } else {
        // CREATE
        await axios.post(
          'http://localhost:5000/api/products',
          payload,
          { headers: { Authorization: `Bearer ${token}` } }
        );
      }

      setIsEditing(false);
      setCurrentProduct({ name: '', category: '', price: '', stock: '' });
      fetchProducts();

    } catch (err) {
      console.error("SAVE ERROR:", err.response || err);
      alert(err.response?.data?.error || "Save failed");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this product?")) return;

    const token = localStorage.getItem('adminToken');

    try {
      await axios.delete(`http://localhost:5000/api/products/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      fetchProducts();
    } catch (err) {
      console.error(err);
      alert("Delete failed");
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold heading-luxury">Manage Products</h2>

        {!isEditing && (
          <button
            onClick={() => {
              setCurrentProduct({ name: '', category: '', price: '', stock: '' });
              setIsEditing(true);
            }}
            className="bg-black text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-gold-500 hover:text-black"
          >
            <Plus size={18} /> Add Product
          </button>
        )}
      </div>

      {isEditing && (
        <div className="bg-white p-6 rounded-xl shadow border mb-6 max-w-xl">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-bold">
              {currentProduct._id ? "Edit Product" : "Add Product"}
            </h3>
            <button onClick={() => setIsEditing(false)}>
              <X />
            </button>
          </div>

          <form onSubmit={handleSave} className="space-y-4">

            <input
              type="text"
              placeholder="Product Name"
              value={currentProduct.name}
              onChange={e => setCurrentProduct({ ...currentProduct, name: e.target.value })}
              className="w-full p-2 border rounded"
              required
            />

            <input
              type="text"
              placeholder="Category"
              value={currentProduct.category}
              onChange={e => setCurrentProduct({ ...currentProduct, category: e.target.value })}
              className="w-full p-2 border rounded"
              required
            />

            <input
              type="number"
              placeholder="Price"
              value={currentProduct.price}
              onChange={e => setCurrentProduct({ ...currentProduct, price: e.target.value })}
              className="w-full p-2 border rounded"
              required
            />

            <input
              type="number"
              placeholder="Stock"
              value={currentProduct.stock}
              onChange={e => setCurrentProduct({ ...currentProduct, stock: e.target.value })}
              className="w-full p-2 border rounded"
              required
            />

            <div className="flex gap-3">
              <button className="bg-green-500 text-white px-4 py-2 rounded flex items-center gap-2">
                <Save size={16} /> Save
              </button>

              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="bg-gray-300 px-4 py-2 rounded"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-50 text-sm text-gray-600 uppercase">
            <th className="p-3">Name</th>
            <th className="p-3">Category</th>
            <th className="p-3">Price</th>
            <th className="p-3">Stock</th>
            <th className="p-3">Actions</th>
          </tr>
        </thead>

        <tbody>
          {products.map(p => (
            <tr key={p._id} className="border-b hover:bg-gray-50">
              <td className="p-3">{p.name}</td>
              <td className="p-3">{p.category}</td>
              <td className="p-3">₹{p.price}</td>
              <td className="p-3">{p.stock}</td>

              <td className="p-3 flex gap-3">
                <button
                  onClick={() => {
                    setCurrentProduct(p); // ✅ SAME AS SERVICES
                    setIsEditing(true);
                  }}
                  className="text-gray-500 hover:text-gold-500"
                >
                  <Edit2 size={16} />
                </button>

                <button
                  onClick={() => handleDelete(p._id)}
                  className="text-gray-500 hover:text-red-500"
                >
                  <Trash2 size={16} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageProducts;