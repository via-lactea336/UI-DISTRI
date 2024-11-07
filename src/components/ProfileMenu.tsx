// ProfileMenu.tsx
import React from "react";
import { Link } from "react-router-dom";
import { CircleUserRound } from "lucide-react";

interface ProfileMenuProps {
  onLogout: (e: React.FormEvent) => Promise<void>;
}

const ProfileMenu: React.FC<ProfileMenuProps> = ({ onLogout }) => {
  return (
    <div className="relative">
      {/* Checkbox oculto para controlar la visibilidad del menú */}
      <input type="checkbox" id="profile-menu-toggle" className="hidden peer" />

      {/* Label que actúa como botón para abrir el menú */}
      <label htmlFor="profile-menu-toggle">
        <div className="user-profile cursor-pointer">
          <CircleUserRound />
        </div>
      </label>

      {/* Menú desplegable, visible solo cuando el checkbox está marcado */}
      <div className="absolute right-0 mt-2 w-44 bg-white border border-gray-200 rounded-md shadow-lg transform scale-0 transition-transform duration-300 origin-top-right peer-checked:scale-100">
        <Link
          to="/perfil"
          className="block px-8 py-2 text-gray-700 hover:bg-gray-200"
        >
          Ir al perfil
        </Link>
        <button
          onClick={onLogout}
          className="block w-full text-left px-8 py-2 text-gray-700 hover:bg-gray-200"
        >
          Cerrar sesión
        </button>
      </div>
    </div>
  );
};

export default ProfileMenu;
