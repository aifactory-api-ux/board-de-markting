import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthStore } from './state/authStore';
import Login from './pages/Login';
import BoardPrincipal from './pages/BoardPrincipal';
import DetalleTarjeta from './pages/DetalleTarjeta';
import AdminUsuarios from './pages/AdminUsuarios';
import Configuracion from './pages/Configuracion';
import Loader from './components/shared/Loader';
import ErrorBoundary from './components/shared/ErrorBoundary';

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { token, loading } = useAuthStore();

  if (loading) return <Loader />;
  if (!token) return <Navigate to="/login" replace />;

  return <>{children}</>;
}

export default function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <BoardPrincipal />
              </ProtectedRoute>
            }
          />
          <Route
            path="/board/:boardId"
            element={
              <ProtectedRoute>
                <BoardPrincipal />
              </ProtectedRoute>
            }
          />
          <Route
            path="/card/:cardId"
            element={
              <ProtectedRoute>
                <DetalleTarjeta />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/users"
            element={
              <ProtectedRoute>
                <AdminUsuarios />
              </ProtectedRoute>
            }
          />
          <Route
            path="/settings"
            element={
              <ProtectedRoute>
                <Configuracion />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </ErrorBoundary>
  );
}