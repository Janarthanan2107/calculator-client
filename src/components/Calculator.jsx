import React, { useState } from "react";
import Button from "./Button";
import InputText from "./InputText";
import axios from "axios";

const Calculator = ({ display, setDisplay }) => {
  const [error, setError] = useState(false);

  const handleOnClick = async (value) => {
    if (value === "=") {
      try {
        const result = evaluateExpression(display);
        setDisplay(result.toString());
        await sendCalculation(result);
        window.location.reload("");
      } catch (error) {
        setError(true);
      }
    } else {
      setDisplay((prevDisplay) => prevDisplay + value);
      setError(false);
    }

    if (value === "c") {
      setDisplay("");
    }
  };

  const evaluateExpression = (expression) => {
    return eval(expression);
  };

  const sendCalculation = async (calculation) => {
    try {
      await axios.post("http://localhost:5000/api/v1/calc/add", {
        calc: calculation,
      });
    } catch (error) {
      console.error("Error while sending calculation:", error);
    }
  };

  return (
    <div className="flex justify-center items-center">
      <div className="w-[500px] flex flex-col justify-center items-center">
        <h1 className="text-gray-600 text-3xl font-semibold text-center m-5">
          {error ? "Error: Invalid Expression" : "Calculator"}
        </h1>
        <InputText
          type="text"
          value={display}
          onChange={() => {}}
          placeholder="Enter here!!"
          readOnly
          className="rounded-lg h-[60px] w-[350px] text-right border border-black p-2 text-2xl font-semibold"
        />

        <div className="mt-5 flex">
          <div className="w-[280px]">
            {["9", "8", "7", "6", "5", "4", "3", "2", "1", "c", "0", "="].map(
              (btn, index) => (
                <Button
                  key={index}
                  onClick={() => handleOnClick(btn)}
                  className="text-white bg-slate-500 p-6 m-2 rounded-lg"
                >
                  {btn}
                </Button>
              )
            )}
          </div>

          <div className="flex flex-col">
            {["+", "-", "*", "/"].map((btn, index) => (
              <Button
                key={index}
                onClick={() => handleOnClick(btn)}
                className="text-white bg-slate-500 p-6 m-2 rounded-lg"
              >
                {btn}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calculator;
