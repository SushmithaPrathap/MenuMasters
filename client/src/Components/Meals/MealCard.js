import React, { useState } from "react";

const MealCard = ({ value, item, total }) => {
  const [show, setShow] = useState(false);
  return (
    <div className="card-main">
      <div className="card-header">
        <div className="header-div" onClick={() => setShow(!show)}>
          <p className="total-value">{value}</p>
          <p className="total-text">{total} Cal</p>
        </div>
        {show && (
          <div className="card-content-head">
            <p>Dish Name</p>
            <div>
              <p>Serving</p>
              <p>Calories</p>
            </div>
          </div>
        )}
      </div>
      {show && (
        <>
          {item.map((i) => (
            <div className="card-content">
              <p>{i.dish}</p>
              <div>
                <p>{i.quantity}</p>
                <p>{i.calorie}</p>
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default MealCard;
