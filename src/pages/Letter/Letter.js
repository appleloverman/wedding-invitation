import React from "react";
import { useNavigate } from "react-router-dom";
import "../../Css/Ticket.css";
import { ticketImages } from "../../data/LetterData";

function Letter() {
  const navigate = useNavigate();

  const handleCardClick = (index, soldOut) => {
    if (!soldOut) {
      navigate(`/s/${index}`);
    }
  };

  return (
    <div className="meal-container">
      <div></div>
      <div className="ticket-list">
        {ticketImages.map((ticket, index) => (
          <div
            className="ticket-card"
            key={index}
            style={{
              cursor: ticket.soldOut ? "default" : "pointer",
              opacity: ticket.soldOut ? 0.5 : 1,
            }}
            onClick={() => handleCardClick(index, ticket.soldOut)}
          >
            <img src={ticket.image} alt={`ticket-${index}`} />
            <div className="ticket-info">
              <h3>{ticket.title}</h3>
              <p className="price">
                {ticket.price}{" "}
                <span className="original">{ticket.originalPrice}</span>
              </p>
              {ticket.soldOut ? (
                <span className="soldout-tag">SOLD OUT</span>
              ) : (
                <span className="sale-tag">SALE</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Letter;
