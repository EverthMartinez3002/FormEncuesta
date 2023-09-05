<template>
  <div class="container mt-4 d-flex flex-column align-items-center">
    <h1>Bienvenido a la Encuesta</h1>
    <p>Por favor, haga clic en el botón para comenzar la encuesta:</p>
    <button class="btn btn-primary" @click="toEncuesta">Comenzar Encuesta</button>
  </div>
</template>

<script>
import { useRouter } from 'vue-router';

export default {
  setup() {
    const router = useRouter();

    const toEncuesta = () => {
      router.push('/encuesta');
    };

    return { toEncuesta };
  },
};
</script>

<style scoped></style>
