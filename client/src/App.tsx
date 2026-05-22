import { Navigate, Route, Routes } from "react-router-dom";
import { AppShell } from "./components/layout/AppShell";
import { AssetListingPage } from "./pages/AssetListingPage";
import { AssetSignupPage } from "./pages/AssetSignupPage";
import { HomePage } from "./pages/HomePage";

export default function App() {
  return (
    <Routes>
      <Route element={<AppShell />}>
        <Route index element={<HomePage />} />
        <Route path="assets" element={<AssetListingPage />} />
        <Route path="assets/:id/signup" element={<AssetSignupPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}
