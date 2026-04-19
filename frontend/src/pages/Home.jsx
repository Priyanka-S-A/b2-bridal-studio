import React from 'react';

const Home = () => {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="bg-black text-white py-20 px-4 text-center">
        <h1 className="text-5xl md:text-7xl heading-luxury mb-6">Elevate Your Beauty</h1>
        <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-10">
          Discover premium beauty services and professional courses designed to bring out the best in you.
        </p>
        <button className="bg-gold-500 hover:bg-gold-400 text-black font-bold py-3 px-8 rounded-full transition-colors duration-300">
          Explore Services
        </button>
      </div>
      
      {/* Content Section Placeholder */}
      <div className="max-w-7xl mx-auto py-16 px-4 text-center">
        <h2 className="text-3xl heading-luxury text-gold-500 mb-4">Welcome to Beauty Parlor</h2>
        <p className="text-gray-600 max-w-3xl mx-auto">
          We offer a luxury experience with state-of-the-art facilities, premium products, and expert staff. 
          Join our academy to learn from the best in the industry.
        </p>
      </div>
    </div>
  );
};

export default Home;
