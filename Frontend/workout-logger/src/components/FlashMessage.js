import React from "react";

export const FlashMessage = ({ message, color }) => {
  return <div style={{ color: color }}>{message}</div>;
};
