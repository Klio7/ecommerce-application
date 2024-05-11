import React from "react";
import { getProject } from "./services/CreateClient";

import "./App.scss";

function App() {
  getProject().then(console.log).catch(console.error);
  return <header>Hello!</header>;
}

export default App;
