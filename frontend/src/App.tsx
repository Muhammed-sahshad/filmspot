import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { LoginPage } from "./pages/login-page";
import { useEffect } from "react";
import { useAppDispatch } from "./app/hooks";
import { refreshToken } from "./features/auth/authSlice";

const App = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (localStorage.getItem("loggedIn")) {
      dispatch(refreshToken());
    }
  }, [dispatch]);

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<div>home</div>}/>
      </Routes>
    </Router>
  );
};

export default App;
