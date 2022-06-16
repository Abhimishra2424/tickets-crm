import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/DashBoard";
import TicketPage from "./pages/TicketPage";
import Nav from "./components/Nav";

import CategoriesContext from "./context";
import { useState } from "react";

function App() {
  const [categories, setCategories] = useState([]);

  return (
    <div className="app">
      <CategoriesContext.Provider
        value={{
          categories,
          setCategories,
        }}
      >
        <BrowserRouter>
          <Nav />
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/ticket" element={<TicketPage />} />
            <Route
              path="/ticket/:id"
              element={<TicketPage eidtMode={true} />}
            />
          </Routes>
        </BrowserRouter>
      </CategoriesContext.Provider>
    </div>
  );
}

export default App;
