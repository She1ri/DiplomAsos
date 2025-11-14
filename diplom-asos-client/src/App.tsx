import './App.css'
import {Route, Routes} from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import MainLayout from "./components/layouts/MainLayout";

function App() {
  return (
      <Routes>
          <Route path="/" element={<MainLayout/>}>
              <Route index element={<HomePage/>} />
              <Route path={'login'} element={<LoginPage/>} />
          </Route>
      </Routes>
  )
}

export default App
