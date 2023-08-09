import { BrowserRouter, Routes, Route } from "react-router-dom";
import AddressList from "./components/AddressList";
import AddList from "./components/AddList";
import EditList from "./components/EditList";

function App() {
  return (
    <div className="container">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AddressList />} />
          <Route path="/add" element={<AddList />} />
          <Route path="/edit/:id" element={<EditList />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
