// validations.js

// Valida que el nombre de usuario tenga como máximo 40 caracteres.
export function validateUsername(username) {
    return username.length <= 30;
  }
  
  // Valida que la contraseña tenga al menos 8 caracteres, una mayúscula y un número.
  export function validatePassword(password) {
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{8,}$/;
    return passwordRegex.test(password);
  }
  
  // Valida que el correo electrónico tenga un formato válido.
  export function validateEmail(email) {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailRegex.test(email);
  }
  