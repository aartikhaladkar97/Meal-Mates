import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';


// Import or define your restaurantsData if needed. 
// If you do that inside this file, or pass it as props, up to you.
// Typically, you might import the same data from some shared file
// Or pass it via props. For simplicity, here's a placeholder.

function OfferDetailPage() {
  const navigate = useNavigate();
  const { slug, offerIndex } = useParams();

  // For now, just show a message
  return (
    <div style={{ padding: '20px' }}>
      <button onClick={() => navigate(-1)}>← Back</button>
      <h2>Offer detail for slug "{slug}" and index "{offerIndex}"</h2>
    </div>
  );
}

export default OfferDetailPage;
