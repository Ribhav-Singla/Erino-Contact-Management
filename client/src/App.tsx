import Contacts from "./pages/Contacts";
import CreateContact from "./pages/CreateContact";
import Homepage from "./pages/Homepage";
import UpdateContact from "./pages/UpdateContact";
import { BrowserRouter, Routes, Route } from "react-router-dom";
function App() {
  return (
    <>
      <div className="max-w-[1280px] mx-auto h-[100vh]">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/contacts" element={<Contacts />} />
            <Route path="/createContact" element={<CreateContact />} />
            <Route path="/updateContact/:id" element={<UpdateContact />} />
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
