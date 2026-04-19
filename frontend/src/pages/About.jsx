import React, { useState, useEffect } from "react";

const About = () => {

  // ===== IMAGE SLIDER =====
  const images = [
    "/images/about1.jpeg",
    "/images/about2.jpeg",
    "/images/about3.jpeg",
    "/images/about4.jpeg",
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) =>
        prev === images.length - 1 ? 0 : prev + 1
      );
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  // ===== READ MORE =====
  const [showMore, setShowMore] = useState(false);

  // ===== FEATURES =====
  const features = [
    {
      title: "Dedicated Mentorship",
      desc: "Learn with personal attention from skilled mentors. Our team motivates you, corrects your techniques, and helps you grow into a true professional.",
    },
    {
      title: "Lifetime Access",
      desc: "All students receive lifetime access to learning materials. Revisit any lesson anytime to refresh your skills or practice at your own pace with confidence.",
    },
    {
      title: "Flexible Learning Help",
      desc: "Whether you're a beginner or already experienced, B2 Bridal Studio provides easy-to-understand assistance to make your learning smooth and stress-free.",
    },
    {
      title: "Personal Guidance",
      desc: "Get step-by-step support throughout your training. At B2 Bridal Studio, we make sure you feel confident, comfortable, and fully guided in every lesson.",
    },
  ];

  // ===== CAROUSEL =====
  const [startIndex, setStartIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setStartIndex((prev) =>
        prev === features.length - 3 ? 0 : prev + 1
      );
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  // ===== COUNTER LOGIC =====
  const stats = [
    { value: 1200, label: "Successfully Trained", suffix: "k+" },
    { value: 3500, label: "Classes Completed", suffix: "k+" },
    { value: 92, label: "Satisfaction Score", suffix: "%" },
    { value: 100200, label: "Students Community", suffix: "k+" },
  ];

  const [counts, setCounts] = useState(stats.map(() => 0));

  useEffect(() => {
    const duration = 2000;

    const intervals = stats.map((stat, index) => {
      const increment = stat.value / (duration / 30);

      return setInterval(() => {
        setCounts((prev) => {
          const updated = [...prev];
          if (updated[index] < stat.value) {
            updated[index] = Math.min(
              updated[index] + increment,
              stat.value
            );
          }
          return updated;
        });
      }, 30);
    });

    setTimeout(() => {
      intervals.forEach(clearInterval);
    }, duration);

    return () => intervals.forEach(clearInterval);
  }, []);

  return (
    <div style={{ background: "#000", color: "#fff" }}>

      {/* ===== ABOUT MAIN ===== */}
      <div style={{
        maxWidth: "1200px",
        margin: "auto",
        padding: "80px 20px",
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "50px",
        alignItems: "center",
      }}>
        <div style={{
          height: "350px",
          overflow: "hidden",
          borderRadius: "12px",
        }}>
          <img
            src={images[currentIndex]}
            alt="about"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "contain",
            }}
          />
        </div>

        <div>
          <p style={{ color: "#d4af37" }}>ABOUT OUR STUDIO</p>

          <h1 style={{ fontSize: "34px" }}>
            Visionary Entrepreneur, Makeup Artist & Women Empowerment Leader
          </h1>

          <p style={{ color: "#ccc" }}>
            Shanmugavadivu Sabarinathan is a professional makeup artist,
            creative entrepreneur, and certified trainer.
          </p>

          <p style={{ color: "#ccc" }}>
            With 20+ certifications, she is recognized for her expertise
            in bridal makeup artistry and skill-based education.
          </p>

          {showMore && (
            <>
              <p style={{ color: "#ccc" }}>
                She is the founder of B2 Bridal Studio, known for refined aesthetics.
              </p>

              <h3>Founder’s Message</h3>

              <p style={{ color: "#ccc" }}>
                Women are capable of handling multiple roles with strength.
              </p>
            </>
          )}

          <button
            onClick={() => setShowMore(!showMore)}
            style={{
              background: "#d4af37",
              padding: "10px 20px",
              border: "none",
              cursor: "pointer",
            }}
          >
            {showMore ? "Read Less" : "Read More"}
          </button>
        </div>
      </div>

      {/* ===== TITLE ===== */}
      <h2 style={{
        textAlign: "center",
        fontSize: "36px",
        marginBottom: "40px",
      }}>
        Build your skills with hands-on guidance
      </h2>

      {/* ===== CARDS ===== */}
      <div style={{
        display: "flex",
        overflow: "hidden",
        maxWidth: "1200px",
        margin: "auto",
        gap: "20px",
      }}>
        <div style={{
          display: "flex",
          transform: `translateX(-${startIndex * 33.33}%)`,
          transition: "0.5s",
          width: "100%",
        }}>
          {features.map((f, i) => (
            <div key={i} style={{
              minWidth: "33.33%",
              background: i % 2 === 0 ? "#d4af37" : "#f5f5f5",
              color: i % 2 === 0 ? "#fff" : "#000",
              padding: "30px",
              borderRadius: "12px",
              textAlign: "center",
            }}>
              <h3>{f.title}</h3>
              <p>{f.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ===== STATS SECTION ===== */}
      <div style={{
        marginTop: "80px",
        background: "#caa21c",
        padding: "40px 0",
      }}>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(4,1fr)",
          textAlign: "center",
        }}>
          {stats.map((stat, i) => (
            <div key={i} style={{ color: "#fff" }}>
              <h1 style={{ fontSize: "32px" }}>
                {Math.floor(counts[i])}{stat.suffix}
              </h1>
              <p>{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default About;