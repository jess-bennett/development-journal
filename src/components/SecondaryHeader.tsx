import React from "react";

interface SecondaryHeaderProps {
  buttons: React.ReactNode[]; // You can customize the type as per your button implementation
}

const SecondaryHeader: React.FC<SecondaryHeaderProps> = ({ buttons }) => {
  return (
    <div className="c-site-header c-site-header--secondary">
      {buttons.map((button, index) => (
        <div key={index}>{button}</div>
      ))}
    </div>
  );
};

export default SecondaryHeader;
