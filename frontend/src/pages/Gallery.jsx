import React, { useState } from "react";

const Gallery = () => {
  const [activeCategory, setActiveCategory] = useState("bridal");

  const images = {
    bridal: [
      "/images/bridal1.jpeg",
      "/images/bridal2.jpeg",
      "/images/bridal3.jpeg",
      "/images/bridal4.jpeg",
      "/images/bridal5.jpeg",
      "/images/bridal6.jpeg",
      "/images/bridal7.jpeg",
      "/images/bridal8.jpeg",
      "/images/bridal9.jpeg",
    ],
    aari: [
      "/images/aari1.jpeg",
      "/images/aari2.jpeg",
      "/images/aari3.jpeg",
      "/images/aari4.jpeg",
      "/images/aari5.jpeg",
      "/images/aari6.jpeg",
      "/images/aari7.jpeg",
      "/images/aari8.jpeg",
      "/images/aari9.jpeg",
      "/images/aari10.jpeg",
      "/images/aari11.jpeg",
     
    ],
    fashion: [
      "/images/fashion1.jpeg",
      "/images/fashion2.jpeg",
      "/images/fashion3.jpeg",
      "/images/fashion4.jpeg",
      "/images/fashion5.jpeg",
    ],
    bakery: [
      "/images/bakery1.jpeg",
      "/images/bakery2.jpeg",
      "/images/bakery3.jpeg",
    ],
  };

  return (
    <div style={{ background: "#000" }}>
      
      {/* TOP BLACK SECTION */}
      <div
        style={{
          padding: "60px 20px 30px",
          textAlign: "center",
          color: "#fff",
        }}
      >
        <h1 style={{ fontSize: "36px", marginBottom: "20px" }}>
          Our Work
        </h1>

        {/* CATEGORY TABS */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "15px",
            flexWrap: "wrap",
          }}
        >
          {[
            { key: "bridal", label: "Beautician" },
            { key: "aari", label: "Aari Embroidery" },
            { key: "fashion", label: "Fashion Designing" },
            { key: "bakery", label: "Bakery" },
          ].map((cat) => (
            <button
              key={cat.key}
              onClick={() => setActiveCategory(cat.key)}
              style={{
                padding: "10px 22px",
                borderRadius: "30px",
                border: "1px solid #d4af37",
                cursor: "pointer",
                fontSize: "14px",
                background:
                  activeCategory === cat.key ? "#d4af37" : "transparent",
                color:
                  activeCategory === cat.key ? "#000" : "#d4af37",
                transition: "0.3s",
              }}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* BOTTOM LIGHT SECTION */}
      <div
        style={{
          background: "#f5f5f5",
          padding: "50px 20px 80px",
        }}
      >
        <div
          style={{
            maxWidth: "1200px",
            margin: "auto",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: "25px",
          }}
        >
          {images[activeCategory].map((img, index) => (
            <div
              key={index}
              style={{
                background: "#fff",
                borderRadius: "15px",
                padding: "10px",
                boxShadow: "0 6px 18px rgba(0,0,0,0.1)",
                transition: "0.3s",
              }}
            >
              {/* IMAGE CONTAINER (FIXED) */}
              <div
                style={{
                  width: "100%",
                  height: "260px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: "#fafafa",
                  borderRadius: "10px",
                  overflow: "hidden",
                }}
              >
                <img
                  src={img}
                  alt="gallery"
                  style={{
                    maxWidth: "100%",
                    maxHeight: "100%",
                    objectFit: "contain", // 👈 FIXED
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default Gallery;