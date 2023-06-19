import React from "react";
import "../Styles/Benefits.css";

// A component to display a benefit with an icon and a text
const BenefitCard = ({ icon, text }) => {
  return (
    <div className="benefit-card">
      <img src={icon} alt="icon" />
      <p>{text}</p>
    </div>
  );
};

// The benefits component
const Benefits = () => {
  // Some sample icons and texts
  const benefits = [
    {
      icon: "https://icons.iconarchive.com/icons/paomedia/small-n-flat/1024/sign-check-icon.png",
      text: "Reduce waste and pollution",
    },
    {
      icon: "https://icons.iconarchive.com/icons/paomedia/small-n-flat/1024/money-icon.png",
      text: "Save money and resources",
    },
    {
      icon: "https://icons.iconarchive.com/icons/paomedia/small-n-flat/1024/users-icon.png",
      text: "Foster community and trust",
    },
    {
      icon: "https://icons.iconarchive.com/icons/paomedia/small-n-flat/1024/globe-icon.png",
      text: "Promote sustainability and circular economy",
    },
  ];

  return (
    <div className="benefits">
      <h2>Why use ExchangeIt?</h2>
      <p>ExchangeIt is more than just a website for exchanging items. It is a platform that helps you make a positive impact on the world. Here are some of the benefits of using ExchangeIt:</p>
      <div className="benefits-container">
        {benefits.map(({ icon, text }) => (
          <BenefitCard key={icon} icon={icon} text={text} />
        ))}
      </div>
    </div>
  );
};

export default Benefits;
