import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import "./Dealers.css";
import "../assets/style.css";
import positive_icon from "../assets/positive.png";
import neutral_icon from "../assets/neutral.png";
import negative_icon from "../assets/negative.png";
import review_icon from "../assets/reviewbutton.png";
import Header from '../Header/Header';

const Dealer = () => {
  const [dealer, setDealer] = useState([]); 
  const [reviews, setReviews] = useState([]);
  const [unreviewed, setUnreviewed] = useState(false);
  const [showPostReview, setShowPostReview] = useState(false); // Better naming for clarity

  const { id } = useParams(); // Using destructuring for cleaner code
  // const root_url = window.location.origin; // Get the root URL of your application
  const dealer_url = `/djangoapp/dealer/${id}`;
  const reviews_url = `/djangoapp/reviews/dealer/${id}`;
  const post_review_url = `/postreview/${id}`;

  const getDealer = async () => {
    try {
      const res = await fetch(dealer_url, {
        method: "GET"
      });
      const retobj = await res.json();
      // console.log("Fetched dealer data:", retobj); // Log fetched data to inspect its structure

      if (retobj.status === 200 && retobj.dealer) {
        // Check if the dealer object exists and is properly structured
        setDealer(retobj.dealer); // Set the first dealer object or an empty object
      } else {
        console.error("Dealer data not found or invalid format:", retobj);
        setDealer({}); // Set an empty object if data is missing or invalid
      }
    } catch (error) {
      console.error("Error fetching dealer data:", error);
      setDealer({}); // Set an empty object on error
    }
  };

  const getReviews = async () => {
    try {
      const res = await fetch(reviews_url);
      const retobj = await res.json();
      // console.log("Fetched reviews data:", retobj); // Log fetched reviews data

      if (retobj.status === 200) {
        if (retobj.reviews.length > 0) {
          setReviews(retobj.reviews);
        } else {
          setUnreviewed(true);
        }
      } else {
        setUnreviewed(true);
      }
    } catch (error) {
      console.error("Error fetching reviews:", error);
    }
  };

  const sentiIcon = (sentiment) => {
    // Safeguard the icon assignment based on sentiment
    return sentiment === "positive" ? positive_icon : sentiment === "negative" ? negative_icon : neutral_icon;
  };

  useEffect(() => {
    // Fetch dealer and reviews data only once when the component mounts
    getDealer();
    getReviews();

    // Check if the user is logged in and set post review visibility
    if (sessionStorage.getItem("username")) {
      setShowPostReview(true);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Empty dependencies array ensures the effect only runs once on mount

  return (
    <div style={{ margin: "20px" }}>
      <Header />
      <div style={{ marginTop: "10px" }}>
        {/* Conditional rendering to avoid accessing properties of undefined */}
        <h1 style={{ color: "grey" }}>
          {dealer ? dealer.full_name || "Dealer Name Not Found" : "Loading Dealer..."}
          {showPostReview && (
            <a href={post_review_url}>
              <img
                src={review_icon}
                style={{ width: "10%", marginLeft: "10px", marginTop: "10px" }}
                alt="Post Review"
              />
            </a>
          )}
        </h1>
        <h4 style={{ color: "grey" }}>
          {dealer ? `${dealer.city}, ${dealer.address}, Zip - ${dealer.zip}, ${dealer.state}` : "Loading Location..."}
        </h4>
      </div>
      <div className="reviews_panel">
        {reviews.length === 0 && !unreviewed ? (
          <p>Loading Reviews....</p>
        ) : unreviewed ? (
          <div>No reviews yet!</div>
        ) : (
          reviews.map((review, index) => (
            <div className="review_panel" key={index}>
              <img src={sentiIcon(review.sentiment)} className="emotion_icon" alt="Sentiment" />
              <div className="review">{review.review}</div>
              <div className="reviewer">
                {review.name} {review.car_make} {review.car_model} {review.car_year}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Dealer;