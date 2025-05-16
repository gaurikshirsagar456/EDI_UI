import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./HomePage.css";
import { motion } from "framer-motion";

// Remove Navbar import here!
// import Navbar from "../components/Navbar";

const HomePage = () => {
  const navigate = useNavigate();
  const [role, setRole] = useState("voter");

  const handleLogin = () => {
    if (role === "admin") {
      navigate("/admin");
    } else {
      navigate("/survey");
    }
  };

  return (
    <>
      {/* NO Navbar here */}
      <div className="homepage">
        <section className="hero">
          <motion.div
            className="hero-content"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="hero-text">
              <h1>Shape Tomorrow with Your Vote</h1>
              <p>
                Participate in the democratic process and see real-time survey insights that forecast our collective future.
              </p>
            </div>
          </motion.div>
        </section>

        <section className="features">
          {["📥", "📊", "📨"].map((icon, index) => (
            <motion.div
              key={index}
              className="feature"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 * index }}
            >
              <div className="icon-placeholder">{icon}</div>
              <h3>{["Submit Survey", "View Results", "Contact Us"][index]}</h3>
              <p>
                {[
                  "Take the quick survey to voice your opinion.",
                  "Live analytics from user submissions across regions.",
                  "Get in touch to know more or collaborate with us."
                ][index]}
              </p>
              <motion.button
                className="more-button"
                whileHover={{ scale: 1.05 }}
                onClick={index === 0 ? handleLogin : undefined}
              >
                {index === 0 ? "Participate" : index === 1 ? "Explore" : "Reach Out"}
              </motion.button>
            </motion.div>
          ))}
        </section>

        <footer className="footer">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            &copy; 2025 Exit Poll Insights. All rights reserved.
          </motion.p>
        </footer>
      </div>
    </>
  );
};

export default HomePage;
