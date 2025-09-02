import React from "react";
import "./Frame.css"; // 스타일은 따로 관리

const products = [
  {
    id: 1,
    title: "프리미엄 고급아크릴 인테리어 웨딩액자",
    image:
      "https://the-goodday.com/web/product/big/20200103/754821ebb2d6737b2ecdaf4e74970f83.jpg",
    originalPrice: 50000,
    salePrice: 17000,
  },
  {
    id: 2,
    title: "심플우드 액자 거실인테리어 웨딩액자",
    image:
      "https://the-goodday.com/web/product/big/201909/791c99dc7d53777344d4dea0defa5e33.gif",
    originalPrice: 34000,
    salePrice: 22000,
  },
  {
    id: 3,
    title: "사랑합니다. 캘리그라피 심플우드 액자",
    image:
      "https://the-goodday.com/web/product/big/20200106/a84dfa8a5da4ed874e4fb290e45c5357.jpg",
    originalPrice: 50000,
    salePrice: 25000,
  },
  {
    id: 4,
    title: "심플 노블레스 기념일 웨딩액자",
    image:
      "https://the-goodday.com/web/product/big/20200108/25d1d41ae51ce6232c9bbe9c80798b4f.gif",
    originalPrice: 50000,
    salePrice: 25000,
  },
  {
    id: 5,
    title: "노블레스 원목 기념일액자 세트A",
    image:
      "https://the-goodday.com/web/product/big/20200107/93bdd76476b5d924b30bcaaa30233cd7.jpg",
    originalPrice: 50000,
    salePrice: 25000,
  },
  {
    id: 6,
    title: "블레스 원목 기념일액자 세트B",
    image:
      "https://the-goodday.com/web/product/big/20200106/a80acbdba06edbc0331af9aeeab7a0a3.jpg",
    originalPrice: 50000,
    salePrice: 25000,
  },
];

function Frame() {
  return (
    <>
      <div className="frame-container">
        <div></div>
        <div className="product-grid">
          {products.map((item) => (
            <div className="product-card" key={item.id}>
              <img
                src={item.image}
                alt={item.title}
                className="product-image"
              />
              <div className="product-info">
                <p className="title">{item.title}</p>
                <p className="price">
                  <span className="original">
                    {item.originalPrice.toLocaleString()}원
                  </span>
                  <span className="sale">
                    {item.salePrice.toLocaleString()}원
                  </span>
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Frame;
