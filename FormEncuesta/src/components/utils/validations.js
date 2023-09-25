// validations.js

// Valida que el nombre de usuario tenga como máximo 40 caracteres y no esté vacío.
export function validateUsername(username) {
  if (username.trim() === '') {
    return { valid: false, message: 'El nombre de usuario no puede estar vacío.' };
  }

  if (username.length > 40) {
    return { valid: false, message: 'El nombre de usuario debe tener como máximo 40 caracteres.' };
  }

  return { valid: true, message: '' };
}

// Valida que la contraseña tenga al menos 8 caracteres, una mayúscula, un número y no esté vacía.
export function validatePassword(password) {
  if (password.trim() === '') {
    return { valid: false, message: 'La contraseña no puede estar vacía.' };
  }

  const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{8,}$/;
  if (!passwordRegex.test(password)) {
    return {
      valid: false,
      message: 'La contraseña debe tener al menos 8 caracteres, una mayúscula y un número.'
    };
  }

  return { valid: true, message: '' };
}

// Valida que el correo electrónico tenga un formato válido y no esté vacío.
export function validateEmail(email) {
  if (email.trim() === '') {
    return { valid: false, message: 'El correo electrónico no puede estar vacío.' };
  }

  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  if (!emailRegex.test(email)) {
    return { valid: false, message: 'El correo electrónico no tiene un formato válido.' };
  }

  return { valid: true, message: '' };
}

// Valida que el campo de rol no esté vacío.
export function validateRole(role) {
  if (!role) {
    return { valid: false, message: 'Por favor, selecciona un rol.' };
  }

  return { valid: true, message: '' };
}

// Valida que el título de la encuesta no esté vacío y tenga como máximo 100 caracteres.
export function validateTitulo(titulo) {
  if (titulo.trim() === '') {
    return { valid: false, message: 'El título de la encuesta no puede estar vacío.' };
  }

  if (titulo.length > 100) {
    return { valid: false, message: 'El título de la encuesta debe tener como máximo 100 caracteres.' };
  }

  return { valid: true, message: '' };
}

// Valida que la descripción de la encuesta no esté vacía y tenga como máximo 400 caracteres.
export function validateDescripcion(descripcion) {
  if (descripcion.trim() === '') {
    return { valid: false, message: 'La descripción de la encuesta no puede estar vacía.' };
  }

  if (descripcion.length > 400) {
    return { valid: false, message: 'La descripción de la encuesta debe tener como máximo 500 caracteres.' };
  }

  return { valid: true, message: '' };
}

// Valida que el campo de eleigir usuario no esta vacio
export function validateRole_usuario(role_usuario) {
  if (!role_usuario) {
    return { valid: false, message: 'Por favor, selecciona un usuario.' };
  }

  return { valid: true, message: '' };
}

// Valida que el texto de la pregunta no esté vacío.
export function validateTextoPregunta(textoPregunta) {
  const questionMarks = (textoPregunta.match(/[¿?]/g) || []).length;

  if (questionMarks !== 2 || textoPregunta.trim() === '') {
    return { valid: false, message: 'El texto de la pregunta debe contener exactamente dos signos de interrogación y no estar vacío.' };
  }

  return { valid: true, message: '' };
}


// Valida que el campo eligir tipo_pregunta no esta vacio
export function validateTipo_pregunta(tipoPregunta) {
  if (tipoPregunta === null || tipoPregunta === undefined || tipoPregunta.trim() === '') {
    return { valid: false, message: 'Por favor, selecciona un tipo de pregunta' };
  }

  return { valid: true, message: '' };
}

