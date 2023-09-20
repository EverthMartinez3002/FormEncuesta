<template>
  <div class="container mt-4 d-flex justify-content-center align-items-center" style="height: 100vh;">
    <div class="card border-primary" style="width: 22rem;">
      <div class="card-header bg-dark text-white">
        <h2 class="card-title text-center">Registro</h2>
      </div>
      <div class="card-body">
        <form @submit.prevent="register">
          <div class="mb-3">
            <label for="username" class="form-label">Nombre de Usuario:</label>
            <input type="text" class="form-control" id="username" v-model="username" required
              :class="{ 'is-invalid': validationErrors.username }" />
            <div class="invalid-feedback">{{ validationErrors.username }}</div>
          </div>
          <div class="mb-3">
            <label for="password" class="form-label">Contraseña:</label>
            <input type="password" class="form-control" id="password" v-model="password" required
              :class="{ 'is-invalid': validationErrors.password }" />
            <div class="invalid-feedback">{{ validationErrors.password }}</div>
          </div>
          <div class="mb-3">
            <label for="email" class="form-label">Correo Electrónico:</label>
            <input type="email" class="form-control" id="email" v-model="email" required
              :class="{ 'is-invalid': validationErrors.email }" />
            <div class="invalid-feedback">{{ validationErrors.email }}</div>
          </div>
          <div class="mb-3">
            <label for="role" class="form-label">Rol:</label>
            <select id="role" v-model="role" class="form-select" required
              :class="{ 'is-invalid': validationErrors.role }">
              <option value="" disabled selected>Selecciona un rol</option>
              <option value="Usuario">Usuario</option>
              <option value="Admin">Admin</option>
            </select>
            <div class="invalid-feedback">{{ validationErrors.role }}</div>
          </div>
          <div class="text-center">
            <button type="button" @click="register" class="btn btn-dark">Registrarse</button>
          </div>
        </form>
        <div v-if="errorMessage" class="alert alert-danger mt-3">
          {{ errorMessage }}
        </div>
      </div>
    </div>
  </div>
</template>
  
<script>
import api from '../components/utils/axios.config';
import Swal from 'sweetalert2';

import { validateUsername, validatePassword, validateEmail, validateRole } from '../components/utils/validations.js';

export default {
  data() {
    return {
      username: '',
      password: '',
      email: '',
      role: '',
      validationErrors: {
        username: '',
        password: '',
        email: '',
        role: '',
      },
      errorMessage: '',
    };
  },
  methods: {
    async register() {
      try {
        this.validationErrors = {};
        this.errorMessage = '';

        const usernameValidation = validateUsername(this.username);
        if (!usernameValidation.valid) {
          this.validationErrors.username = usernameValidation.message;
          return;
        }

        const passwordValidation = validatePassword(this.password);
        if (!passwordValidation.valid) {
          this.validationErrors.password = passwordValidation.message;
          return;
        }

        const emailValidation = validateEmail(this.email);
        if (!emailValidation.valid) {
          this.validationErrors.email = emailValidation.message;
          return;
        }

        const roleValidation = validateRole(this.role);
        if (!roleValidation.valid) {
          this.validationErrors.role = roleValidation.message;
          return;
        }

        this.role = this.role === 'Usuario' ? false : this.role === 'Admin' ? true : false;

        const response = await api.post('user/register', {
          username: this.username,
          password: this.password,
          email: this.email,
          Admin: this.role
        });

        console.log('Respuesta del servidor:', response.data);

        if (response.status === 201) {
          Swal.fire({
            icon: 'success',
            text: 'Usuario registrado con éxito.',
          });

          setTimeout(() => {
            this.$router.push('/');
          }, 300);
        } else if (response.status === 400) {
          this.errorMessage = response.data.message;
          console.log('Respuesta del servidor:', response.data);
        } else {
          console.error('Error al registrar el usuario:', response.message);
        }
      } catch (error) {
        console.error('Error al registrar el usuario:', error);
      }
    },
  },
};
</script>
  
<style scoped>
.card {
  margin-bottom: 4em;
  text-align: left;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  background-color: #fff;
}

.is-invalid {
  border-color: red !important;
}

.invalid-feedback {
  color: red;
}
</style>
  