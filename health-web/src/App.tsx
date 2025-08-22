function App() {
  function ButtonClicked(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault(); // optional
    console.log("Button clicked 222!", event.currentTarget);
  }

  return (
    <>
      <div className="min-h-screen bg-black p-6">
        <p className="text-white text-2xl">
          If you can read this in white, Tailwind works.
        </p>
      </div>
    </>
  );
}

export default App;
