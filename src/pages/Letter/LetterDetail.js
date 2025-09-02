import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ticketImages } from "../../data/LetterData";

function LetterDetail() {
  const { index } = useParams();
  const navigate = useNavigate();
  const ticket = ticketImages[index];

  if (!ticket) {
    return <div>상품을 찾을 수 없습니다.</div>;
  }

  const handleBuyClick = () => {
    alert("결제가 완료되었습니다!");
    navigate("/");
  };

  return (
    <div className="letter-detail-container">
      <img src={ticket.image} alt={ticket.title} className="detail-image" />
      <div className="detail-info">
        <h2>{ticket.title}</h2>
        <p>
          가격: <strong>{ticket.price}원</strong>
        </p>
        <p>
          원래 가격:{" "}
          <span className="detail-original">{ticket.originalPrice}</span>
        </p>
        <p>설명: {ticket.description || "해당 상품에 대한 상세 설명입니다."}</p>
        {ticket.soldOut ? (
          <button className="soldout-btn" disabled>
            품절
          </button>
        ) : (
          <button className="buy-btn" onClick={handleBuyClick}>
            결제하기
          </button>
        )}
        <button className="back-btn" onClick={() => navigate(-1)}>
          목록으로 돌아가기
        </button>
      </div>
    </div>
  );
}

export default LetterDetail;
