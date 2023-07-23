import React from "react";
import "./App.css";
import Transactions from "./Transactions";
import Footer from "./Footer"; // Import the Footer component

function App() {
  return (
    <div className="App">
      <header>
        <h1>Flatiron Bank Transaction</h1>
      </header>
      <main>
        <Transactions />
      </main>
      <Footer /> {/* Use the Footer component here */}
    </div>
  );
}

export default App;
