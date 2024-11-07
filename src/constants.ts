// mensajes de error http mas comunes

export const HTTP_ERRORS: { [key: string]: string } = {
  400: "Petición incorrecta",
  401: "No autorizado",
  403: "Prohibido",
  404: "No encontrado",
  500: "Error interno del servidor",
  503: "Servicio no disponible",
};

// personalizar mensajes de error http
export const getHttpErrorMessage = (message: string) => {
  const errorCode = Object.keys(HTTP_ERRORS).find((code) =>
    message.includes(code)
  );
  return errorCode ? HTTP_ERRORS[errorCode] : message;
};

export const validatePassword = (password: string) => {
  const minLength = 8;

  const validations = [
    {
      test: password.length >= minLength,
      message: `La contraseña debe tener al menos ${minLength} caracteres.`,
    },
    {
      test: /[A-Z]/.test(password),
      message: "La contraseña debe tener al menos una letra mayúscula.",
    },
    {
      test: /[a-z]/.test(password),
      message: "La contraseña debe tener al menos una letra minúscula.",
    },
    {
      test: /[0-9]/.test(password),
      message: "La contraseña debe tener al menos un número.",
    },
    {
      test: /[!@#$%^&*(),.?":{}|<>]/.test(password),
      message: "La contraseña debe tener al menos un carácter especial.",
    },
  ];

  for (const { test, message } of validations) {
    if (!test) {
      return message;
    }
  }

  return null;
};

export const missingImage =
  "https://images.ctfassets.net/zykafdb0ssf5/68qzkHjCboFfCsSxV2v9S6/4da75033db02c1339de2a3effb461f7a/missing.png";
