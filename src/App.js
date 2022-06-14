import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/DashBoard";
import TicketPage from "./pages/TicketPage";
import Nav from "./components/Nav";

function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/ticket" element={<TicketPage />} />
          <Route path="/ticket/:id" element={<TicketPage eidtMode={true} />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
