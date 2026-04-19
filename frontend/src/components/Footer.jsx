import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-black text-white py-12 border-t-4 border-gold-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <div className="w-10 h-10 bg-gold-500 rounded-full flex items-center justify-center font-serif text-black font-bold border border-white">
              BP
            </div>
            <span className="font-serif text-xl text-gold-500">Beauty Parlor</span>
          </div>
          <p className="text-gray-400 text-sm">Experience luxury and elegance with our premium beauty services and courses.</p>
        </div>
        <div>
          <h3 className="text-gold-500 font-serif text-lg mb-4">Quick Links</h3>
          <ul className="space-y-2 text-sm text-gray-300">
            <li><Link to="/about" className="hover:text-white transition-colors">About Us</Link></li>
            <li><Link to="/services" className="hover:text-white transition-colors">Our Services</Link></li>
            <li><Link to="/courses" className="hover:text-white transition-colors">Academy</Link></li>
            <li><Link to="/contact" className="hover:text-white transition-colors">Contact Us</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="text-gold-500 font-serif text-lg mb-4">Contact</h3>
          <ul className="space-y-2 text-sm text-gray-300">
            <li>Branch 1: No: 63, Madavaram Red Hills Rd,Kodungaiyur, Chennai, Tamil Nadu - 600060</li>
            <li>Branch 2: Madurai</li>
            <li>Phone: +91 98405 51365</li>
            <li>Phone: +91 97908 82561</li>
             <li>Email: b2shammu@gmail.com</li>
            <li>Email: tharagaitrust@gmail.com</li>
          </ul>
        </div>
        <div>
          <h3 className="text-gold-500 font-serif text-lg mb-4">Follow Us</h3>
          <div className="flex space-x-4">
            {/* Social Icons Placeholders */}
           <a href="https://www.facebook.com/b2bridalmakeoverstudio" target="_blank" rel="noopener noreferrer">
  <div className="w-8 h-8 bg-zinc-800 rounded-full flex items-center justify-center hover:bg-gold-500 hover:text-black transition-colors cursor-pointer">
    FB
  </div>
          </a>
            <a href="https://www.instagram.com/b2_bridal_studio_?igsh=MTM1Zzh4eWlkNjVqOQ%3D%3D" target="_blank" rel="noopener noreferrer">
  <div className="w-8 h-8 bg-zinc-800 rounded-full flex items-center justify-center hover:bg-gold-500 hover:text-black transition-colors cursor-pointer">
    IG
  </div>
</a>
            <a href="https://www.youtube.com/@ShammuB2" target="_blank" rel="noopener noreferrer">
  <div className="w-8 h-8 bg-zinc-800 rounded-full flex items-center justify-center hover:bg-gold-500 hover:text-black transition-colors cursor-pointer">
    YT
  </div>
</a>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 pt-8 border-t border-zinc-800 text-center text-sm text-gray-500">
        &copy; {new Date().getFullYear()} Beauty Parlor. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
