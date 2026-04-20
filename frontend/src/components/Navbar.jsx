import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-black text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">

          {/* LOGO */}
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-12 h-12 bg-gold-500 rounded-full flex items-center justify-center font-serif text-black font-bold text-xl border-2 border-white">
                BP
              </div>
              <span className="font-serif text-2xl tracking-wider text-gold-500">
                &nbsp;B2 Bridal Studio
              </span>
            </Link>
          </div>

          {/* MENU */}
          <div className="hidden md:flex space-x-8 items-center">

            <Link to="/" className="hover:text-gold-500 transition-colors">Home</Link>

            <div className="relative group">
              <Link to="/courses" className="hover:text-gold-500 transition-colors py-2">
                Courses ▾
              </Link>
              <div className="absolute left-0 mt-2 w-48 bg-white text-black shadow-lg rounded-md hidden group-hover:block z-50 overflow-hidden">
                <Link to="/courses/beautician" className="block px-4 py-2 hover:bg-gold-500 hover:text-white">Beautician</Link>
                <Link to="/courses/fashion" className="block px-4 py-2 hover:bg-gold-500 hover:text-white">Fashion & Design</Link>
                <Link to="/courses/embroidery" className="block px-4 py-2 hover:bg-gold-500 hover:text-white">Embroidery & Crafts</Link>
                <Link to="/courses/jewellery" className="block px-4 py-2 hover:bg-gold-500 hover:text-white">Jewellery Making</Link>
                <Link to="/courses/bags" className="block px-4 py-2 hover:bg-gold-500 hover:text-white">Bags & Accessories</Link>
                <Link to="/courses/kids" className="block px-4 py-2 hover:bg-gold-500 hover:text-white">Kids Courses</Link>
                <Link to="/courses/special" className="block px-4 py-2 hover:bg-gold-500 hover:text-white">Special Courses</Link>
              </div>
            </div>

            <Link to="/services" className="hover:text-gold-500 transition-colors">Services</Link>
            <Link to="/products" className="hover:text-gold-500 transition-colors">Products</Link>
            <Link to="/gallery" className="hover:text-gold-500 transition-colors">Gallery</Link>
            <Link to="/certificates" className="hover:text-gold-500 transition-colors">Certificates</Link>
            <Link to="/about" className="hover:text-gold-500 transition-colors">About Us</Link>
            <Link to="/contact" className="hover:text-gold-500 transition-colors">Contact</Link>

            {/* 🔥 NEW LOGIN / REGISTER */}
            <div className="flex items-center gap-3 ml-4">

              <Link
                to="/login"
                className="px-4 py-1.5 border border-white rounded-lg text-white hover:bg-white hover:text-black transition"
              >
                Login
              </Link>

              <Link
                to="/register"
                className="px-4 py-1.5 bg-gold-500 text-black rounded-lg font-semibold hover:bg-white transition"
              >
                Register
              </Link>

            </div>

          </div>

        </div>
      </div>
    </nav>
  );
};

export default Navbar;