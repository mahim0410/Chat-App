import { Route, Routes, Navigate } from "react-router-dom";
import { useEffect } from "react";
import ChatPage from "./pages/chatPage.jsx";
import LoginPage from "./pages/logInPage.jsx";
import SignUpPage from "./pages/signUpPage.jsx";
import { useAuthStore } from "./store/useAuthStore.js";
import PageLoader from "./components/PageLoader.jsx";
import { Toaster } from "react-hot-toast"


const App = () => {

  const { checkAuth, isCheckingAuth, authUser } = useAuthStore()

  useEffect(() => {
    checkAuth()
  }, [checkAuth]);
  console.log({ authUser });

  if (isCheckingAuth) return <PageLoader />

  return (
    <div className="relative flex items-center justify-center overflow-hidden min-h-screen">
      <div className="min-h-screen w-full relative bg-black">

        <div
          className="absolute inset-0 z-0"
          style={{
            background: "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(120, 180, 255, 0.25), transparent 70%), #000000"
          }}
        />

        <div className="relative z-10 flex items-center justify-center min-h-screen">
          <Routes>
            <Route path="/" element={authUser ? <ChatPage /> : <Navigate to={"/login"} />} />
            <Route path="/login" element={!authUser ? <LoginPage /> : <Navigate to={"/"} />} />
            <Route path="/signup" element={!authUser ? <SignUpPage /> : <Navigate to={"/"} />} />
          </Routes>
          <Toaster />
        </div>

      </div>
    </div>
  );
};

export default App;