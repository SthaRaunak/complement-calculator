import React, { useState } from "react";

function Input() {
  const [firstBinary, setFirstBinary] = useState("");
  const [secondBinary, setSecondBinary] = useState("");
  const [resultBinary, setResultBinary] = useState([]);
  const [equalizedBinary, setEqualizedBinary] = useState([]);

  function handleSubmit(e) {
    debugger;
    e.preventDefault();
    if (!firstBinary || !secondBinary) {
      return;
    } else {
      const binaryResult = [firstBinary, secondBinary];
      setResultBinary(binaryResult);
      if (binaryResult[0].length != binaryResult[1].length) {
        stepEqualize([...binaryResult]);
      } else {
        setEqualizedBinary([]);
      }

      setFirstBinary("");
      setSecondBinary("");
    }
  }

  function stepEqualize(binaryResult) {
    while (binaryResult[0].length < binaryResult[1].length) {
      binaryResult[0] = "0" + binaryResult[0];
    }

    while (binaryResult[0].length > binaryResult[1].length) {
      binaryResult[1] = "0" + binaryResult[1];
    }
    setEqualizedBinary(binaryResult);
  }

  return (
    <>
      <div className="container mx-auto py-12">
        <form onSubmit={handleSubmit}>
          <input
            type="string"
            pattern="[01]*"
            value={firstBinary}
            onChange={(e) => {
              setFirstBinary(e.target.value);
            }}
            placeholder="Enter a binary"
            title="Please enter a binary value"
            className="border-2 border-black"
          />
          <input
            type="string"
            pattern="[01]*"
            value={secondBinary}
            onChange={(e) => {
              setSecondBinary(e.target.value);
            }}
            placeholder="Enter a binary"
            title="Please enter a binary value"
            className="border-2 border-black"
          />
          <button>Submit</button>
        </form>

        {resultBinary.length > 0 && (
          <h2 className="text-3xl pb-5 pt-[50px] font-bold">
            {resultBinary[0]} From {resultBinary[1]}
          </h2>
        )}

        {equalizedBinary.length > 0 ? (
          <>
            <div>
              <h2 className="text-2xl font-medium">
                Step 1: Make both the number of bits equal.
              </h2>
              <p className="text-lg">
                let P={equalizedBinary[0]} , Q ={equalizedBinary[1]}
              </p>
            </div>
          </>
        ) : (
          <>
            <div>
              <h2 className="text-2xl font-medium">
                Step 1: Since both the number of bits are equal.
              </h2>
              <p className="text-lg">
                let P={resultBinary[0]} , Q ={resultBinary[1]}
              </p>
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default Input;
