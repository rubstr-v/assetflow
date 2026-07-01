import { createRoot } from 'react-dom/client'
import { Toaster } from "sonner"
import './index.css'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import "leaflet/dist/leaflet.css"

import AppLayout from "./layout/AppLayout"
import SitesPage from "./pages/SitesPage"
import LoginPage from "./pages/LoginPage"

import { AuthProvider } from "./auth/AuthProvider"
import { ProtectedRoute } from "./auth/ProtectedRoute"
import UsersPage from './pages/admin/UsersPage'
import SiteTypesPage from './pages/admin/SiteTypesPage'
import SiteCriticitiesPage from './pages/admin/SiteCriticitiesPage'
import SiteCategoriesPage from './pages/admin/SiteCategoriesPage'
import DashboardPage from './pages/DashboardPage'

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <AuthProvider>
      <Toaster position="bottom-right" richColors />

      <Routes>

        {/* PUBLIC */}
        <Route path="/login" element={<LoginPage />} />

        {/* APP AUTH */}
        <Route
          element={
            <ProtectedRoute>
              <AppLayout />
            </ProtectedRoute>
          }
        >
          {/* dashboard */}
          <Route index element={<DashboardPage />} />

          {/* app */}
          <Route path="sites" element={<SitesPage />} />

          {/* admin group */}
          <Route path="admin/users" element={<UsersPage />} />
          <Route path="admin/site-types" element={<SiteTypesPage />} />
          <Route path="admin/site-criticities" element={<SiteCriticitiesPage />} />
          <Route path="admin/site-categories" element={<SiteCategoriesPage />} />
        </Route>

      </Routes>
    </AuthProvider>
  </BrowserRouter>
)