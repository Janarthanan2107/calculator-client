import Calculator from "./components/Calculator";
import React, { useEffect, useState } from "react";
import axios from "axios";
const App = () => {
  const [data, setData] = useState([]);
  const [display, setDisplay] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get("http://localhost:5000/api/v1/calc");
      console.log(res.data);
      setData(res.data);
    };

    return () => {
      fetchData();
    };
  }, []);

  return (
    <div className="App flex h-screen justify-center items-center">
      <Calculator display={display} setDisplay={setDisplay} />

      <div className="text-gray-600 m-5">
        <h1 className="text-3xl font-semibold text-center">
          Stored Data's from DB
        </h1>
        {data.length === 0 ? (
          <p className="p-3 text-center">No records Found</p>
        ) : (
          data.map((item, index) => {
            return (
              <div key={index} className="flex justify-end gap-3">
                <p className="text-2xl font-semibold text-gray-600">
                  {index + 1}.
                </p>
                <p className="text-2xl font-semibold text-green-600">
                  {item.calc}
                </p>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default App;
