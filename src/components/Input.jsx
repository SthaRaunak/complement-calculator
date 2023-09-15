import { useState } from "react";

function Input() {
  const [firstBinary, setFirstBinary] = useState("");
  const [secondBinary, setSecondBinary] = useState("");
  const [binaryList, setBinaryList] = useState([]);
  const [equalizedBinary, setEqualizedBinary] = useState([]);
  const [onesComplementOfQ, setOnesComplementOfQ] = useState();
  const [arrayOfOnes, setArrayOfOnes] = useState();

  function handleSubmit(e) {
    e.preventDefault();

    if (!firstBinary || !secondBinary) {
      return;
    } else {
      binaryList;
      const binaryResult = [firstBinary, secondBinary];
      setBinaryList(binaryResult);
      if (binaryResult[0].length != binaryResult[1].length) {
        stepEqualize([...binaryResult]);
      } else {
        setEqualizedBinary([]);
      }

      if (binaryResult[0].length == binaryResult[1].length) {
        stepFindOnesComp([...binaryResult]);
      }

      setFirstBinary("");
      setSecondBinary("");
    }
  }

  //If the two inputs of binary dont have equal length this function will run.
  function stepEqualize(binaryResult) {
    while (binaryResult[0].length < binaryResult[1].length) {
      binaryResult[0] = "0" + binaryResult[0];
    }

    while (binaryResult[0].length > binaryResult[1].length) {
      binaryResult[1] = "0" + binaryResult[1];
    }

    setEqualizedBinary(binaryResult);
    stepFindOnesComp([...binaryResult]);
  }
  
  //This function calculates ones complement of Q 
  function stepFindOnesComp(binaryResult) {
    //generating string of Ones
    let tempArrayOfOnes = "";
    for (let i = 0; i < binaryResult[1].length; i++) {
      tempArrayOfOnes += "1";
    }
    //setting it as a state so as to render 
    setArrayOfOnes(tempArrayOfOnes);

    //Converting the binary to decimal to perform calculations
    const decimalDifference =
      parseInt(tempArrayOfOnes, 2) - parseInt(binaryResult[1], 2);
    //Convert back to binary

    let BinaryDifference = decimalDifference.toString(2);

    //Equalizing length of the answer by adding zero 
    if (BinaryDifference.length != binaryResult[1].length) {
      while (BinaryDifference.length < binaryResult[1].length) {
        BinaryDifference = "0" + BinaryDifference;
      }
    }
    setOnesComplementOfQ(BinaryDifference);
  }

  return (
    <>
      <div className="container mx-auto py-12 px-5">
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

        {binaryList.length > 0 && (
          <h2 className="text-3xl pb-5 pt-[50px] font-bold">
            {binaryList[0]} - {binaryList[1]}   ({binaryList[1]} From {binaryList[0]})
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
          binaryList.length > 0 && (
            <>
              <div>
                <h2 className="text-2xl font-medium">
                  Step 1: Since both the number of bits are equal.
                </h2>
                <p className="text-lg">
                  let P={binaryList[0]} , Q ={binaryList[1]}
                </p>
              </div>
            </>
          )
        )}

        {onesComplementOfQ && (
          <>
            <div className="py-[30px]">
              <h2 className="text-2xl font-medium">
                Step 2: Calculate the 1's complement of Q
              </h2>
              <p className="text-xl pt-5">
                {" "}
                {arrayOfOnes}
                <br />- {equalizedBinary[1] || binaryList[1]}
                <br />
                ---------
                <br />
                {onesComplementOfQ} 
              </p>
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default Input;
