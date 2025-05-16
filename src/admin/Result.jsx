import React, { useEffect, useState } from "react";
import "./Result.css";

const Results = () => {
  const [data, setData] = useState(null);
  const [mainImage, setMainImage] = useState("");
  const [otherImages, setOtherImages] = useState([]);

  useEffect(() => {
    const storedResult = localStorage.getItem("predictResult");
    if (storedResult) {
      setData(JSON.parse(storedResult));
    }

    fetch("http://localhost:5000/load_data")
      .then((res) => res.json())
      .then((json) => {
        if (json.images && json.images.length > 0) {
          const main = json.images.find(url =>
            url.includes("election_outcome_bar.png")
          );
          const others = json.images.filter(url =>
            !url.includes("election_outcome_bar.png")
          );
          setMainImage(main);
          setOtherImages(others);
        }
      })
      .catch((err) => {
        console.error("Error loading images:", err);
      });
  }, []);

  return (
    <div className="results-page">
      <h2>Exit Poll Results</h2>

      {data ? (
        <div className="json-result">
          <h3>Prediction Data:</h3>
          <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
      ) : (
        <p>No prediction data found.</p>
      )}

      {mainImage && (
        <div className="main-image-container">
          <h3>Election Outcome Overview</h3>
          <img src={mainImage} alt="Election Outcome" />
        </div>
      )}

      <div className="image-grid">
        {otherImages.map((url, index) => (
          <div key={index} className="grid-image">
            <img src={url} alt={`Analysis ${index + 1}`} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Results;
