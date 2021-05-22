import React, { useState } from "react";
import { render } from "react-dom";
import Test from './components/test';

function App() {
  const [state, setState] = useState("CLICK ME");

  return (
    <div>
      <button onClick={() => setState("CLICKED")}>{state}</button>
      <Test />
    </div>
  );
}

render(<App />, document.getElementById("app-root"));
