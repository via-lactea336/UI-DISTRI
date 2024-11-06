export interface Publicacion {
  publicacionId: number;
  trabajadorId: number;
  titulo: string;
  descripcion: string;
  categoriaId: number;
  imagen: string;
  precio: number;
  tipoDePrecioId: number;
  createdAt: string;
  updatedAt: string;
}

export interface PublicacionResponse {
  content: Publicacion[];
  page: {
    size: number;
    number: number;
    totalElements: number;
    totalPages: number;
  };
}

export interface Calificacion {
  calificacionId: number;
  publicacionId: Publicacion;
  calificacionGeneral: number;
  detalles: CalificacionDetalle[];
  detallesPaginados: PaginatedResponse<CalificacionDetalle>;
}

export type CalificacionPaginatedResponse = PaginatedResponse<Calificacion>;

export type CalificacionForm = Omit<
  Calificacion,
  "calificacionId" | "calificacionGeneral"
>;

export interface Cliente {
  clienteId: number;
  // Add other fields as needed
}

export interface CalificacionDetalle {
  calificacionDetalleId: number;
  calificacionId: number;
  clienteId: number;
  fecha: string;
  calificacion: number;
  comentario: string;
}

export interface CalificacionDetalleWithUser extends CalificacionDetalle {
  usuario: UserResponseDTO;
}

export interface Categoria {
  categoriaId: number;
  nombreCategoria: string;
  descripcion: string;
}

export interface Estado {
  estadoId: number;
  nombreEstado: string;
}

export interface RegisterData {
  nombre: string;
  email: string;
  contrasena: string;
  telefono: string;
  direccion: string;
  bio: string;
  imgPerfil: string;
}

export interface User extends RegisterData {
  activo: boolean;
  rolId: string;
  tipoUsuario: "cliente" | "trabajador";
}

export interface UserToken {
  token: string | null;
}

export interface UserResponseDTO extends Omit<User, "contrasena">, UserToken {
  usuarioId: number;
  createdAt: string;
  updatedAt: string | null;
  idClienteTrabajador: number;
}

export interface LoginCredentials {
  email: string;
  contrasena: string;
}

export interface PaginatedResponse<T> {
  content: T[];
  pageable: {
    pageNumber: number;
    pageSize: number;
    sort: {
      empty: boolean;
      sorted: boolean;
      unsorted: boolean;
    };
    offset: number;
    paged: boolean;
    unpaged: boolean;
  };
  last: boolean;
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
  sort: {
    empty: boolean;
    sorted: boolean;
    unsorted: boolean;
  };
  first: boolean;
  numberOfElements: number;
  empty: boolean;
}

export interface TipoDePrecio {
  tipoDePrecioId: number;
  nombreTipo: string;
}

export interface PublicacionConCalificacion extends Publicacion {
  calificacion: Calificacion;
}

export interface PublicacionConUsuario extends PublicacionConCalificacion {
  user: UserResponseDTO;
}

export type Event = React.ChangeEvent<
  HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
>;
