import { useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import ServiciosPage from "./pages/ServiciosPage";
import PerfilPage from "./pages/PerfilPage";
import PropuestasPage from "./pages/PropuestasPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminRoute from "./components/AdminRoute";// Importa AdminRoute
import Error404Page from "./pages/Error404Page";
import Error500Page from "./pages/Error500Page";
import Error401Page from "./pages/Error401Page";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { configureInterceptor } from "./services/api";
import ServiceDetailPage from "./pages/ServiceDetailPage";
import AdminPage from "./pages/AdminPage";// Importa AdminPage
import EstadosPage from "./pages/EstadosPage";  // Página de estados
import CreatePublication from "./pages/CrearPublicacionPage";
import EventCreator from "./pages/EventosCrearPage";
import EventViewer from "./pages/ListarEventosPage";
import UsuariosPage from "./pages/UsuariosPage";


const InterceptorSetup = () => {
  const { logout, setSessionExpired } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    configureInterceptor(logout, setSessionExpired, navigate);
  }, [logout, setSessionExpired, navigate]);

  return null;
};

function App() {
  return (
    <AuthProvider> {/* Envuelve toda la aplicación con AuthProvider */}
    <Router>
      <InterceptorSetup />
      <div className="min-h-screen flex flex-col bg-gray-100">
        <Header />
        <main className="flex-grow container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/servicios" element={<ProtectedRoute />}>
              <Route path="" element={<ServiciosPage />} />
            </Route>
            <Route path="/eventos" element={< EventViewer/>} />
            <Route path="/eventos/create" element={< EventCreator/>} />
            <Route path="/servicio/:id" element={<ProtectedRoute />}>
              <Route path="" element={<ServiceDetailPage />} />
            </Route>
            <Route path="/perfil" element={<ProtectedRoute />}>
              <Route path="" element={<PerfilPage />} />
            </Route>
            <Route path="/propuestas" element={<ProtectedRoute />}>
              <Route path="" element={<PropuestasPage />} />
            </Route>
            <Route
              path="/admin"
              element={
         
                  <AdminPage />
        
              }
            />
            <Route path="/usuarios" element={<UsuariosPage />} />
            <Route path="/estados" element={<EstadosPage />} />  {/* Esto es correcto */}
            <Route path="/publicacion/create" element={<CreatePublication />} />

            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/500" element={<Error500Page />} />
            <Route path="*" element={<Error404Page />} /> {/* Catch-all route for 404 */}
            <Route path="/unauthorized" element={<Error401Page />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  </AuthProvider>
  );
}

export default App;
