import { Route, Routes } from "react-router-dom";
import ChatPage from "./pages/chatPage.jsx";
import LoginPage from "./pages/logInPage.jsx";
import SignUpPage from "./pages/signUpPage.jsx";

const App = () => {
  return (
    <div className="relative flex items-center justify-center overflow-hidden min-h-screen">
      <div className="min-h-screen w-full relative bg-black">

        {/* Background gradient */}
        <div
          className="absolute inset-0 z-0"
          style={{
            background: "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(120, 180, 255, 0.25), transparent 70%), #000000"
          }}
        />

        {/* Centered content container */}
        <div className="relative z-10 flex items-center justify-center min-h-screen">
          <Routes>
            <Route path="/" element={<ChatPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignUpPage />} />
          </Routes>
        </div>

      </div>
    </div>
  );
};

export default App;