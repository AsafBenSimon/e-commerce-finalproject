// src/components/YourComponent.js
import React from "react";
import { useSelector, useDispatch } from "react-redux";

const YourComponent = () => {
  const someState = useSelector((state) => state.someState);
  const dispatch = useDispatch();

  const handleAction = () => {
    dispatch({ type: "YOUR_ACTION_TYPE" });
  };

  return (
    <div>
      {/* Render your state here */}
      <button onClick={handleAction}>Dispatch Action</button>
    </div>
  );
};

export default YourComponent;
