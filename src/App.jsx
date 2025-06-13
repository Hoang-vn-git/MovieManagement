import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from './pages/Login'
import NotFound from "./pages/NotFound";
import Signup from "./pages/Signup";


function App() {
  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route index element={<Login />} />
      <Route path="sign-up" element={<Signup />} />
      <Route path ="*" element={<NotFound />} />
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App