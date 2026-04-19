import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Clock, BookOpen, MessageCircle, MapPin } from 'lucide-react';

const COURSE_DATA = {
  beautician: {
    title: 'Beautician Courses',
    courses: [
      { id: 'b1', title: 'Beautician Salon Course', duration: '3 Months', learn: ['Basic Skin Care', 'Threading', 'Waxing'] },
      { id: 'b2', title: 'Makeup Artist Course', duration: '2 Months', learn: ['Bridal Makeup', 'Party Makeup', 'Airbrush basics'] },
      { id: 'b3', title: 'Nail Artist Course', duration: '1 Month', learn: ['Nail Art', 'Extensions', 'Gel Polish'] },
      { id: 'b4', title: 'Mehandi Artist Course', duration: '1 Month', learn: ['Bridal Mehandi', 'Arabic', 'Figure Work'] },
      { id: 'b5', title: 'Hair Extension Course', duration: '2 Weeks', learn: ['Clip-ons', 'Tape-ins', 'Micro-ring'] },
      { id: 'b6', title: 'Hairstyle Course', duration: '1 Month', learn: ['Bridal Hair', 'Braids', 'Heat styling'] }
    ]
  },
  fashion: {
    title: 'Fashion & Design',
    courses: [
      { id: 'f1', title: 'Fashion Designing Course', duration: '6 Months', learn: ['Pattern Making', 'Garment Construction', 'Illustration'] },
      { id: 'f2', title: 'Saree Draping Course', duration: '2 Weeks', learn: ['Traditional Drapes', 'Modern Drapes', 'Bridal Draping'] }
    ]
  },
  embroidery: {
    title: 'Embroidery & Crafts',
    courses: [
      { id: 'e1', title: 'Aari Embroidery', duration: '2 Months', learn: ['Basic Stitches', 'Zardosi Work', 'Bead Work'] },
      { id: 'e2', title: 'Machine Embroidery', duration: '1 Month', learn: ['Operating Machine', 'Motif Design'] }
    ]
  }
};

const Courses = () => {
  const { category } = useParams();
  const [selectedBranch, setSelectedBranch] = useState('branch1');
  const [selectedCourse, setSelectedCourse] = useState(null);

  const categoryData = category ? COURSE_DATA[category] : null;

  const handleEnroll = (course) => {
    const message = `*Course Enrollment Request*%0A%0A*Category:* ${categoryData.title}%0A*Course:* ${course.title}%0A*Duration:* ${course.duration}%0A*Branch Selected:* ${selectedBranch === 'branch1' ? 'Branch 1 (Main St)' : 'Branch 2 (Elegant Ave)'}%0A%0A Please send the QR code for fee payment.`;
    const whatsappNumber = '919876543210';
    window.open(`https://wa.me/${whatsappNumber}?text=${message}`, '_blank');
  };

  if (!category || !categoryData) {
    return (
      <div className="bg-zinc-50 min-h-screen py-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl heading-luxury mb-8">Our Academy</h1>
          <p className="text-gray-600 mb-12">Please select a category from the Courses menu above.</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {Object.keys(COURSE_DATA).map(cat => (
              <Link key={cat} to={`/courses/${cat}`} className="block bg-white p-6 rounded-lg shadow-sm border border-gray-100 hover:shadow-md hover:border-gold-500 transition-all">
                <h3 className="text-xl font-bold text-gray-900">{COURSE_DATA[cat].title}</h3>
                <span className="text-gold-500 mt-2 block font-medium">View Courses &rarr;</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-zinc-50 min-h-screen pb-20">
      <div className="bg-black text-white py-16 px-4 text-center">
        <h1 className="text-4xl md:text-5xl heading-luxury text-gold-500 mb-4">{categoryData.title}</h1>
      </div>

      <div className="max-w-7xl mx-auto py-12 px-4">
        <div className="mb-8 flex justify-end items-center gap-4 bg-white p-4 rounded-lg shadow-sm border border-gray-100">
          <MapPin className="text-gray-400" size={20} />
          <span className="text-gray-700 font-medium">Select Branch for Practical Sessions:</span>
          <select 
            value={selectedBranch} 
            onChange={(e) => setSelectedBranch(e.target.value)}
            className="border border-gray-200 rounded p-2 focus:ring-1 focus:ring-gold-500 outline-none"
          >
            <option value="branch1">Branch 1 - 123 Main Street</option>
            <option value="branch2">Branch 2 - 456 Elegant Avenue</option>
          </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categoryData.courses.map(course => (
            <div key={course.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden flex flex-col hover:shadow-lg transition-shadow">
              <div className="p-6 flex-grow">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{course.title}</h3>
                <div className="flex items-center gap-2 text-gold-500 font-medium text-sm mb-4">
                  <Clock size={16} /> {course.duration}
                </div>
                <div className="mb-4">
                  <h4 className="text-sm font-bold text-gray-700 uppercase tracking-wider mb-2 flex items-center gap-2">
                    <BookOpen size={16} /> You will learn:
                  </h4>
                  <ul className="space-y-1 text-sm text-gray-600 list-disc list-inside">
                    {course.learn.map((item, idx) => <li key={idx}>{item}</li>)}
                  </ul>
                </div>
              </div>
              <div className="p-6 pt-0 mt-auto">
                <button 
                  onClick={() => handleEnroll(course)}
                  className="w-full bg-black text-white py-3 rounded-lg hover:bg-gold-500 hover:text-black font-bold transition-colors flex justify-center items-center gap-2"
                >
                  <MessageCircle size={18} /> Enroll via WhatsApp
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Courses;
