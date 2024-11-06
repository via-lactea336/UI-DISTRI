// Header.tsx
import { Link, useNavigate } from "react-router-dom";
import { Menu } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import ProfileMenu from "./ProfileMenu";

const Header: React.FC = () => {
  const { isAuth, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await logout(true);
      navigate("/login");
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return (
    <header className="bg-white border-b border-gray-200">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link
          to="/"
          className="text-3xl font-bold text-[var(--color-secondary)]"
        >
          servicios<span className="text-[var(--color-primary)]">rápidos</span>
        </Link>
        {/* <div className="hidden md:flex flex-grow max-w-xl mx-4">
          <div className="relative w-full">
            <input
              type="text"
              placeholder="¿Qué servicio buscas?"
              className="w-full py-2 pl-4 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
            />
            <button className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-[var(--color-primary)]">
              <Search size={20} />
            </button>
          </div>
        </div> */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link
            to="/servicios"
            className="text-[var(--color-text)] hover:text-[var(--color-secondary)]"
          >
            Explorar
          </Link>
          <Link
            to="/propuestas"
            className="text-[var(--color-text)] hover:text-[var(--color-secondary)]"
          >
            Propuestas
          </Link>
          <button
            className="btn-outline"
            onClick={() => window.location.href = '/publicacion/create'}>
            Ofrecer un servicio
          </button>


          {isAuth ? (
            <ProfileMenu onLogout={handleLogout} />
          ) : (
            <Link to="/login" className="btn-primary">
              Iniciar sesión
            </Link>
          )}
        </nav>
        <button className="md:hidden text-[var(--color-secondary)]">
          <Menu size={24} />
        </button>
      </div>
    </header>
  );
};

export default Header;
