import { Routes, Route } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import React, { useState } from "react";

import HomePage from "./pages/HomePage";
import KomunitasPage from "./pages/KomunitasPage";
import SplashScreen from "./components/ui/SplashScreen";
import TrashCashPage from "./features/trashcash/TrashCashPage";

function App() {

  const [showSplash, setShowSplash] = useState(true);

  return (
    <>
      <AnimatePresence mode="wait">
        {showSplash && (
          <SplashScreen onFinish={() => setShowSplash(false)} />
        )}
      </AnimatePresence>

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/trashcash" element={<TrashCashPage />} />
        <Route path="/komunitas" element={<KomunitasPage />} />
      </Routes>
    </>
  );
}

export default App;