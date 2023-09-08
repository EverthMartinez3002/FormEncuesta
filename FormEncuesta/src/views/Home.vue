<template>
  <div class="container mt-4 d-flex flex-column align-items-center">
    <h1>Bienvenido a tu encuesta</h1>
    <p>Por favor, regístrese o inicie sesión para comenzar con la encuesta</p>

    <!-- Opciones de Registro e Inicio de Sesión -->
    <div class="mt-4">
      <button class="btn btn-dark" @click="toRegistro">Registrarse</button>
      <button class="btn btn-dark" @click="toInicioSesion" style="margin-left: 10px;">Iniciar Sesión</button>
    </div>
  </div>
</template>

<script>
import { useRouter } from 'vue-router';

export default {
  setup() {
    const router = useRouter();

    const toRegistro = () => {
      router.push('/register');
    };

    const toInicioSesion = () => {
      router.push('/login');
    };

    return { toRegistro, toInicioSesion };
  },
};
</script>

<style scoped>
</style>
