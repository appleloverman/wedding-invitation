import React from "react";
import "../../Css/Frame.css";
import { products } from "../../data/FrameData";

function Frame() {
  return (
    <>
      <div className="frame-container">
        <div className="frame-header">
          {/* 이미지가 부모 컨테이너 너비를 꽉 채우도록 CSS를 수정했으므로, 이 코드는 그대로 두시면 됩니다. */}
          <img
            src="https://cdn.imweb.me/thumbnail/20250529/4d1743d368a87.jpg"
            alt="프레임 메인 이미지"
          />
        </div>
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
                <div className="price">
                  <span className="original">
                    {item.originalPrice.toLocaleString()}원
                  </span>
                  <span className="sale">
                    {item.salePrice.toLocaleString()}원
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Frame;
