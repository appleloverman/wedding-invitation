import React from "react";
import "./Ticket.css";
import { Petals } from "../components/Petals";

function Ticket() {
  // 이미지마다 개별 카드로 구성
  const ticketImages = [
    {
      title: "WEDDING 플라워 테이블",
      price: "2,500원",
      originalPrice: "5,000원",
      image: "https://cdn.imweb.me/thumbnail/20240821/ae3eff8cc7b44.jpg"
    },
    {
      title: "WEDDING 플라워 테이블",
      price: "2,500원",
      originalPrice: "5,000원",
      image: "https://cdn.imweb.me/thumbnail/20240821/7374893fcfb27.jpg"
    },
    {
      title: "WEDDING 감사의 한상",
      price: "2,500원",
      originalPrice: "5,000원",
      image: "https://cdn.imweb.me/thumbnail/20240821/bf8c8525ecd03.jpg"
    },
    {
      title: "WEDDING 감사의 한상",
      price: "2,500원",
      originalPrice: "5,000원",
      image: "https://cdn.imweb.me/thumbnail/20240821/5cb8385c62d86.jpg"
    },
    {
      title: "WEDDING 리프 다이닝",
      price: "2,500원",
      originalPrice: "5,000원",
      image: "https://cdn.imweb.me/thumbnail/20240821/4273ab8013cba.jpg"
    }
  ];

  return (
    <>
      <Petals />
      <div className="meal-container">
        <div></div>
        <div className="ticket-list">
          {ticketImages.map((ticket, index) => (
            <div className="ticket-card" key={index}>
              <img src={ticket.image} alt={`ticket-${index}`} />
              <div className="ticket-info">
                <h3>{ticket.title}</h3>
                <p className="price">
                  {ticket.price}{" "}
                  <span className="original">{ticket.originalPrice}</span>
                </p>
                <span className="sale-tag">SALE</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Ticket;
