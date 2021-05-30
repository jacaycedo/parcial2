import React from "react";
import { Link } from "react-router-dom";
import "./cardRoom.scss";

export const Card = (props,i, funcion) => {
  return (
    <div className="card card-room" id={i}>
      <div className="card-room-body">
        <div className="card-room-body-description">
          <h5 className="card-room-title">{props.name}</h5>
        </div>
      </div>
      {props.type === "room" ? (
        <img
          src="/living-room.png"
          className="card-room-img-top"
          alt="Icon Home"
          onClick = {() => funcion(i)}
        />
      ) : (
        <img
          src="/kitchen.png"
          className="card-room-img-top loft"
          alt="Icon Loft"
          onClick = {() => funcion(i)}

        />
      )}
    </div>
  );
};
