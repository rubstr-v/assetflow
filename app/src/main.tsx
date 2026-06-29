import { createRoot } from 'react-dom/client'
import { Toaster } from "sonner"
import './index.css'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import "leaflet/dist/leaflet.css"
import AppLayout from "./layout/AppLayout"
import SitesPage from "./pages/SitesPage"
import Dashboard from "./pages/Dashboard"

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    
    <Toaster position="bottom-right" richColors />

    <AppLayout>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/sites" element={<SitesPage />} />
      </Routes>
    </AppLayout>

  </BrowserRouter>
)