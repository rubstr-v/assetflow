import { createRoot } from 'react-dom/client'
import { Toaster } from "sonner"
import './index.css'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import "leaflet/dist/leaflet.css"

import AppLayout from "./layout/AppLayout"
import SitesPage from "./pages/SitesPage"
import Dashboard from "./pages/Dashboard"
import LoginPage from "./pages/LoginPage"

import { AuthProvider } from "./auth/AuthProvider"
import { ProtectedRoute } from "./auth/ProtectedRoute"

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <AuthProvider>

      <Toaster position="bottom-right" richColors />

      <Routes>
        {/* PUBLIC */}
        <Route path="/login" element={<LoginPage />} />

        {/* PROTECTED */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <AppLayout>
                <Dashboard />
              </AppLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/sites"
          element={
            <ProtectedRoute>
              <AppLayout>
                <SitesPage />
              </AppLayout>
            </ProtectedRoute>
          }
        />

      </Routes>

    </AuthProvider>
  </BrowserRouter>
)