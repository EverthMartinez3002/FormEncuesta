<template>
  <div class="container mt-4 d-flex justify-content-center align-items-center" style="height: 100vh;">
    <div class="card" style="width: 22rem;">
      <div class="card-body">
        <h2 class="card-title text-center">Iniciar Sesión</h2>
        <form @submit.prevent="login">
          <div class="mb-3">
            <label for="email" class="form-label">Correo Electrónico:</label>
            <input type="email" class="form-control" id="email" v-model="email" required />
            <!-- Mostrar mensaje de error si existe -->
            <div v-if="validationErrors.email" class="text-danger">{{ validationErrors.email }}</div>
          </div>
          <div class="mb-3">
            <label for="password" class="form-label">Contraseña:</label>
            <input type="password" class="form-control" id="password" v-model="password" required />
            <!-- Mostrar mensaje de error si existe -->
            <div v-if="validationErrors.password" class="text-danger">{{ validationErrors.password }}</div>
          </div>
          <div class="text-center">
            <button type="submit" class="btn btn-primary">Iniciar Sesión</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import Swal from 'sweetalert2';
import { validatePassword, validateEmail } from '../components/utils/validations.js';

export default {
  data() {
    return {
      email: '',
      password: '',
      validationErrors: {
        password: '',
        email: '',
      },
    };
  },
  methods: {
    async login() {
      try {
        this.validationErrors = {};

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

        const response = await axios.post('/user/login', {
          email: this.email,
          password: this.password,
        });

        if (response.data.token) {

          Swal.fire({
            icon: 'success',
            text: 'Usuario Logueado con éxito.',
          });

          setTimeout(() => {
            this.$router.push('/encuesta');
          }, 300);
        } else {
          Swal.fire({
            icon: 'error',
            text: 'Inicio de sesión fallido. Verifica tus credenciales.',
          });
        }
      } catch (error) {
        Swal.fire({
          icon: 'error',
          text: 'Ocurrió un error al iniciar sesión. Inténtalo nuevamente más tarde.',
        });
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
</style>
