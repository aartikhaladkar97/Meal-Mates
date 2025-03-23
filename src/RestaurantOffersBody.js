import React from "react";

export default function RestaurantOffersBody({ offers }) {
  return (
    <div className="offers-section">
      <h3>Special Offers</h3>
      <div className="offers-tiles">
        {offers.length === 0 ? (
          <p>No active offers.</p>
        ) : (
          offers.map((offer, index) => (
            <div key={index} className="offer-tile">
              <div className="offer-details">
                <p className="offer-title">{offer.title}</p>
                <p className="offer-subtitle">{offer.description}</p>
                <p className="offer-type"><strong>Type:</strong> {offer.offerType}</p>
                <p className="offer-valid">
                  <strong>Valid On:</strong> {Array.isArray(offer.validOn) ? offer.validOn.join(", ") : offer.validOn}
                </p>
                <p className="offer-expiry"><strong>Expires:</strong> {offer.expiryDate}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
