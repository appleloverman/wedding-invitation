import React from "react";
import "../../Css/Ticket.css";
import { ticketImages } from "../../data/TicketData";

function Ticket() {
  return (
    <>
      <div className="meal-container">
        <div className="ticket-list">
          {ticketImages.map((ticket, index) => (
            <div className="ticket-card" key={index}>
              {/* alt 속성을 ticket.title로 수정합니다. */}
              <img src={ticket.image} alt={ticket.title} />
              <div className="ticket-info">
                <h3>{ticket.title}</h3>
                <div className="price-container">
                  <p className="price">
                    {ticket.price}
                    <span className="original">{ticket.originalPrice}</span>
                  </p>
                  <span className="sale-tag">SALE</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Ticket;
