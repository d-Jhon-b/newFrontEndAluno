import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import LoginPage from '../pages/Login/LoginPage'
import AppShell from '../components/AppShell'
import HomePage from '../pages/Home/HomePage'
import CarteirinhaPage from '../pages/Carteirinha/CarteirinhaPage'
import HorariosPage from '../pages/Horarios/HorariosPage'
import CalendarioPage from '../pages/Calendario/CalendarioPage'

function PrivateRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading } = useAuth()

  if (isLoading) {
    return (
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        background: '#0d0d0d',
      }}>
        <div style={{
          width: 40,
          height: 40,
          border: '3px solid #333',
          borderTop: '3px solid #c41c34',
          borderRadius: '50%',
          animation: 'spin 0.8s linear infinite',
        }} />
        <style>{`@keyframes spin { to { transform: rotate(360deg) } }`}</style>
      </div>
    )
  }

  return isAuthenticated ? <>{children}</> : <Navigate to="/login" replace />
}

export default function AppRouter() {
  const { isAuthenticated } = useAuth()

  return (
    <Routes>
      <Route
        path="/login"
        // <LoginPage></LoginPage>
        // element={isAuthenticated ? <Navigate to="/" replace /> : <LoginPage />}
        element={<LoginPage/>}
      />
      <Route
        path="/"
        element={
          <PrivateRoute>
            <AppShell />
          </PrivateRoute>
        }
      >
        <Route index element={<HomePage />} />
        <Route path="carteirinha" element={<CarteirinhaPage />} />
        <Route path="horarios" element={<HorariosPage />} />
        <Route path="calendario" element={<CalendarioPage />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
