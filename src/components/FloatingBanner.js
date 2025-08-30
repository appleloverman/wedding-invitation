import React, { useState, useEffect } from "react";

const bannerImages = [
  "https://marketplace.canva.com/EAGfoeeDufE/1/0/1143w/canva-%ED%95%91%ED%81%AC-%ED%9D%B0%EC%83%89-%EA%B7%80%EC%97%AC%EC%9A%B4-%EA%B2%B0%ED%98%BC-%EC%B4%88%EB%8C%80%EC%9E%A5-oENsHkXiA6w.jpg",
  "https://marketplace.canva.com/EAF5W5YkOq8/2/0/1143w/canva-%ED%99%94%EC%9D%B4%ED%8A%B8-%EB%B8%94%EB%9E%99-minimalist-%EA%B2%B0%ED%98%BC%EC%8B%9D-%EC%B2%AD%EC%B2%A9%EC%9E%A5-dMS92YoDwMo.jpg",
  "https://marketplace.canva.com/EAGfnjiD8As/1/0/1143w/canva-%EC%B4%88%EB%A1%9D-%EB%85%B8%EB%9E%91-%EC%9A%B0%EC%95%84%ED%95%9C-%EA%B2%B0%ED%98%BC-%EC%B4%88%EB%8C%80%EC%9E%A5-DGqTFjlKP4Q.jpg",
  "https://marketplace.canva.com/EAF6kkVk2VA/3/0/1143w/canva-%EB%B8%8C%EB%9D%BC%EC%9A%B4-%EA%B0%90%EC%84%B1%EC%A0%81%EC%9D%B8-%EC%98%81%ED%99%94-%ED%8F%AC%EC%8A%A4%ED%84%B0-%EA%B2%B0%ED%98%BC%EC%8B%9D-%EC%B2%AD%EC%B2%A9%EC%9E%A5-YTPnv60dvZQ.jpg"
];

const styles = {
  container: {
    position: "fixed",
    bottom: "50px",
    right: "50px",
    width: "150px",
    height: "260px", // 기존 240px -> 260px 으로 높이 증가
    backgroundColor: "#f5f5f5",
    boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
    borderRadius: "8px",
    overflow: "hidden",
    zIndex: 999
  },
  image: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    cursor: "pointer"
  }
};

function FloatingBanner() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % bannerImages.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div style={styles.container}>
      <img
        src={bannerImages[current]}
        alt={`배너 ${current + 1}`}
        style={styles.image}
      />
      <button
        onClick={() => {
          // 클릭 이벤트
        }}
        style={{
          padding: "6px 12px",
          borderRadius: "6px",
          backgroundColor: "pink",
          color: "purple",
          border: "none",
          cursor: "pointer",
          fontWeight: "bold",
          position: "absolute",
          bottom: "2px", // 이전보다 더 낮게 조정 가능
          left: "50%",
          transform: "translateX(-50%)",
          fontSize: "12px",
          lineHeight: "1.2",
          whiteSpace: "nowrap",
          marginBottom: "10px" // 버튼과 이미지 사이 여백 추가
        }}
      >
        디자인 보러가기
      </button>
    </div>
  );
}

export default FloatingBanner;
