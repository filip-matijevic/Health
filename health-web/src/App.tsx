import ParticlesBackground from "./components/Background/ParticlesBackground";

function App() {
  function ButtonClicked(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault(); // optional
    console.log("Button clicked 222!", event.currentTarget);
  }

  return (
    <>
      <ParticlesBackground />
      <div className="h-screen flex flex-col items-center justify-center">
        <div
          className="p-6 text-white bg-transparent border-2 rounded-lg flex flex-col items-center align-top w-fit 
        backdrop-blur-sm"
        >
          <div className="w-100">
            <div className="w-full h-12 border-b-1"></div>
            <div className="text-xs">USER NAME</div>
          </div>
          <div className="w-100">
            <div className="w-full h-12 border-b-1"></div>
            <div className="text-xs">PASSWORD</div>
          </div>
          <button
           className="text-white border-1 rounded-lg px-4 py-2 mt-4 w-fit" onClick={ButtonClicked}>
            SIGN IN
          </button>
        </div>
      </div>
    </>
  );
}

export default App;
