import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { LoginPage } from "./pages/login-page";
import { useEffect } from "react";
import { useAppDispatch } from "./app/hooks";
import { HomePage } from "./pages/home-page";
import { refreshToken } from "./features/auth/authThunk";
import { Toaster } from 'sonner';

const App = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (localStorage.getItem("loggedIn")) {
      dispatch(refreshToken());
    }
  }, [dispatch]);

  return (
    <Router>
         <Toaster richColors position="top-right" />
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<HomePage/>}/>
      </Routes>
    </Router>
  );
};

export default App;
