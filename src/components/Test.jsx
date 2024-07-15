export default function Test({ testValue, updateTheValue }) {
  console.log("Test component...");

  return (
    <>
      <p className="text-center">value is : {testValue}</p>
      <button onClick={updateTheValue}>Update Value</button>
    </>
  );
}
