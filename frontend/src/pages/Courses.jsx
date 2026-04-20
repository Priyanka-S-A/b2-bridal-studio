import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import { Clock, BookOpen, MessageCircle, MapPin } from 'lucide-react';


const COURSE_DATA = {
  beautician: {
  title: 'Beautician Courses',
  courses: [
    {
      id: 'b1',
      title: 'Beautician Salon Course',
      duration: '15 Days',
      learn: [
        'Facials & skincare',
        'Threading & waxing',
        'Manicure & pedicure'
      ]
    },
    {
      id: 'b2',
      title: 'Makeup Artist Course',
      duration: '15 Days',
      learn: [
        'Contouring & highlighting',
        'Bridal & party makeup',
        'Product & brush knowledge'
      ]
    },
    {
      id: 'b3',
      title: 'Nail Artist Course',
      duration: '3 or 5 Days',
      learn: [
        'Gel & acrylic nails',
        'Nail art designs',
        'French manicure'
      ]
    },
    {
      id: 'b4',
      title: 'Mehandi Artist Course',
      duration: '3 or 5 Days',
      learn: [
        'Arabic & Indian designs',
        'Cone making',
        'Speed practice'
      ]
    },
    {
      id: 'b5',
      title: 'Hair Extension Course',
      duration: '3 Days',
      learn: [
        'Clip-in & keratin extensions',
        'Color blending',
        'Hair care & removal'
      ]
    },
    {
      id: 'b6',
      title: 'Hairstyle Course',
      duration: '1 or 2 Days',
      learn: [
        'Buns, curls & braids',
        'Tool-based styling',
        'Accessory placement'
      ]
    }
  ]
},
  fashion: {
  title: 'Fashion & Design',
  courses: [
    {
      id: 'f1',
      title: 'Fashion Designing Course',
      duration: 'Weekly Ongoing Classes',
      learn: [
        'Blouse Design',
        'Kurtis & Frocks',
        'Western Wear',
        'Kids Dress'
      ]
    },
    {
      id: 'f2',
      title: 'Saree Draping & Pre-Pleating Course',
      duration: '1 or 2 Days',
      learn: [
        'Bridal Draping',
        'Party Draping',
        'Pre-Pleating Techniques'
      ]
    }
  ]
},
  embroidery: {
  title: 'Embroidery & Crafts',
  courses: [
    {
      id: 'e1',
      title: 'Aari Embroidery Course',
      duration: '5, 10 or 25 Days',
      learn: [
        'Basic stitches',
        'Zari & stone work',
        'Advanced designer motifs'
      ]
    },
    {
      id: 'e2',
      title: 'Aari Brooches Work',
      duration: '3 Days',
      learn: [
        'Patch & motif brooch',
        'Zardosi brooch',
        'Jewellery-style brooch'
      ]
    },
    {
      id: 'e3',
      title: 'Machine Embroidery',
      duration: '5 Days',
      learn: [
        'Thread tension control',
        'Motif embroidery',
        'Border & neckline designs'
      ]
    },
    {
      id: 'e4',
      title: 'Hand Embroidery',
      duration: '3 Days',
      learn: [
        'French knot & satin stitch',
        'Mirror work',
        'Simple motif making'
      ]
    },
    {
      id: 'e5',
      title: 'Fabric Painting',
      duration: '3 Days',
      learn: [
        'Fabric color mixing',
        'Floral & motif painting',
        'Block & stencil design'
      ]
    },
    {
      id: 'e6',
      title: 'Simple Chemical Work',
      duration: '5 Days',
      learn: [
        'Chemical lace technique',
        'Oxidation effect',
        'Fabric texture designs'
      ]
    }
  ]
},
jewellery: {
  title: 'Jewellery Making Modules',
  courses: [
    {
      id: 'j1',
      title: 'Silk Thread Jewellery',
      duration: '3 Days',
      learn: [
        'Matte finishing',
        'Jhumka making',
        'Silk chokers & chains'
      ]
    },
    {
      id: 'j2',
      title: 'Kundan Jewellery',
      duration: '3 Days',
      learn: [
        'Stone setting',
        'Kundan rings & chokers',
        'Color combination patterns'
      ]
    },
    {
      id: 'j3',
      title: 'Crystal Jewellery',
      duration: '3 Days',
      learn: [
        'Bead weaving',
        'Wire looping technique',
        'Party & casual wear sets'
      ]
    },
    {
      id: 'j4',
      title: 'Terracotta Jewellery',
      duration: '3 Days',
      learn: [
        'Clay molding',
        'Color baking',
        'Necklace & studs creation'
      ]
    }
  ]
},
bags: {
  title: 'Bags & Accessories Modules',
  courses: [
    {
      id: 'ba1',
      title: 'Jute Bag Making',
      duration: '5 Days',
      learn: [
        'Basic & designer jute bags',
        'Lining & finishing',
        'Handle and zip attachment'
      ]
    },
    {
      id: 'ba2',
      title: 'Cloth Bag Making',
      duration: '5 Days',
      learn: [
        'Cutting & stitching',
        'Pattern-based bags',
        'Reversible & foldable designs'
      ]
    },
    {
      id: 'ba3',
      title: 'Wire Bags',
      duration: '5 Days',
      learn: [
        'Wire frame basics',
        'Bead fixing & pattern design',
        'Handle & closure techniques'
      ]
    },
    {
      id: 'ba4',
      title: 'Macramé Bags',
      duration: '3 Days',
      learn: [
        'Basic macramé knots',
        'Bag structure & shaping',
        'Fringe & decorative finishing'
      ]
    },
    {
      id: 'ba5',
      title: 'Tatting',
      duration: '3 Days',
      learn: [
        'Shuttle tatting basics',
        'Motif & edging creation',
        'Using tatting in accessories'
      ]
    },
    {
      id: 'ba6',
      title: 'Knitting',
      duration: '3 Days',
      learn: [
        'Basic knit & purl',
        'Simple patterns',
        'Scarves & small projects'
      ]
    },
    {
      id: 'ba7',
      title: 'Crochet',
      duration: '3 Days',
      learn: [
        'Basic crochet stitches',
        'Granny squares & motifs',
        'Mini bags & accessories'
      ]
    },
    {
      id: 'ba8',
      title: 'Brooches Making',
      duration: '3 Days',
      learn: [
        'Design planning',
        'Bead & fabric brooches',
        'Finishing & attachment'
      ]
    }
  ]
},
kids: {
  title: 'Kids Learning Programs',
  courses: [
    {
      id: 'k1',
      title: 'Abacus Training',
      duration: '3 / 6 Months',
      learn: [
        'Visual calculation',
        'Brain development',
        'Confidence building'
      ]
    },
    {
      id: 'k2',
      title: 'Kids Tuition',
      duration: 'Monthly',
      learn: [
        'All subjects',
        'Homework assistance',
        'Exam preparation'
      ]
    },
    {
      id: 'k3',
      title: 'Hindi Language Course',
      duration: '1 – 3 Months',
      learn: [
        'Basic grammar',
        'Conversation skills',
        'Writing practice'
      ]
    },
    {
      id: 'k4',
      title: 'Phonics Training',
      duration: '2 Months',
      learn: [
        'Sound recognition',
        'Word building',
        'Reading fluency'
      ]
    },
    {
      id: 'k5',
      title: 'Silambam Training',
      duration: 'Monthly',
      learn: [
        'Stick techniques',
        'Body balance',
        'Self-defense skills'
      ]
    },
    {
      id: 'k6',
      title: 'Karate Training',
      duration: 'Monthly',
      learn: [
        'Basic to advanced levels',
        'Discipline & focus',
        'Belt grading system'
      ]
    }
  ]
},
special: {
  title: 'Special Skill Courses',
  courses: [
    {
      id: 's1',
      title: 'Soft Toys Making',
      duration: '3 Days',
      learn: [
        'Doll & teddy making',
        'Pattern cutting',
        'Stuffing & finishing'
      ]
    },
    {
      id: 's2',
      title: 'Abacus Training',
      duration: '1 Month',
      learn: [
        'Basic & advance levels',
        'Speed calculation',
        'Memory improvement'
      ]
    },
    {
      id: 's3',
      title: 'Bakery Products Course',
      duration: '5 Days',
      learn: [
        'Cake & cupcake baking',
        'Bread & bun making',
        'Decorating basics'
      ]
    },
    {
      id: 's4',
      title: 'Palm Leaf Craft Course',
      duration: '5 Days',
      learn: [
        'Basket & box weaving',
        'Decorative crafts',
        'Natural dye finishing'
      ]
    }
  ]
}
};

const Courses = () => {
  const { category } = useParams();
  const [selectedBranch, setSelectedBranch] = useState('branch1');
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [dbCourses, setDbCourses] = useState([]);

  useEffect(() => {
  const fetchCourses = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/courses');
      setDbCourses(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  fetchCourses();
}, []);

  const categoryData = category
  ? {
      title: COURSE_DATA[category]?.title || category,

      courses: [
        // 🔥 backend courses
        ...dbCourses
          .filter(c => c.category.toLowerCase() === category.toLowerCase())
          .map(c => ({
            id: c._id,
            title: c.title,
            duration: c.duration,
            learn: c.learnings || []
          })),

        // 🔥 your existing courses (UNCHANGED)
        ...(COURSE_DATA[category]?.courses || [])
      ]
    }
  : null;

  const handleEnroll = (course) => {
  const userData = localStorage.getItem("user");

  // 🔒 LOGIN CHECK
  if (!userData) {
    alert("Please login first");
    window.location.href = "/login";
    return;
  }

  const user = JSON.parse(userData);

  const message = `*Course Enrollment Request*%0A%0A
*Customer Details*%0A
Name: ${user.name}%0A
Email: ${user.email}%0A
Phone: ${user.phone}%0A%0A

*Category:* ${categoryData.title}%0A
*Course:* ${course.title}%0A
*Duration:* ${course.duration}%0A
*Branch:* ${selectedBranch === 'branch1' 
  ? 'Branch 1 (Main St)' 
  : 'Branch 2 (Elegant Ave)'}%0A%0A

Please send the QR code for fee payment.`;

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
