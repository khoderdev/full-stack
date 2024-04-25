import React from "react";

function Card(props) {
  return (
    <div className="rounded border-2 border-white h-64 w-96 flex flex-col justify-around items-center active:border-3 active:border-white">
      <h1 className="text-3xl font-bold">{props.title}</h1>
      <button className="btn-3rd">Click Here</button>
      <img src="logo192.png" className="w-20 h-20" alt="" />
    </div>
  );
}

export default Card;
