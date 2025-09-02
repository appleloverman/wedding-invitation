import React from "react";
import "../Ticket/Ticket.css";
import { ticketImages } from "../../data/TicketData";

function Ticket() {
  // 이미지마다 개별 카드로 구성

  return (
    <>
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
