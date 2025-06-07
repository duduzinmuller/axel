"use client";
import { useState } from "react";

export default function Home() {
  const [clicked, setClicked] = useState("");
  function Clicou() {
    setClicked("Clicou");
    console.log(clicked);
  }
  return (
    <div className="bg-black flex flex-col justify-center items-center">
      <h1>Hello World</h1>
      <button onClick={Clicou} className="bg-red-600">
        Clicou
      </button>
    </div>
  );
}
