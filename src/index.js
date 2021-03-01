import { StrictMode } from "react";
import ReactDOM from "react-dom";

import SearchBar from "./Search";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <StrictMode>
    <SearchBar />
  </StrictMode>,
  rootElement
);
