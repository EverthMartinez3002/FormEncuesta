<template>
  <div class="home-container">
    <div class="content-container">
      <div class="logo">
        <img src="../assets/logo.png" alt="Logo de tu sitio" style="width: 25%;"/>
      </div>
      <h1>Bienvenido a tu encuesta</h1>
      <p>Por favor, regístrese o inicie sesión para comenzar con la encuesta</p>

      <div class="button-container">
        <button class="btn btn-primary" @click="toRegistro">Registrarse</button>
        <button class="btn btn-success" @click="toInicioSesion">Iniciar Sesión</button>
      </div>
    </div>

    <div class="feature-cards">
      <div class="card">
        <font-awesome-icon :icon="['fas', 'poll-h']" class="fa-3x" />
        <div class="card-body">
          <h5 class="card-title">Creación de Encuestas</h5>
          <p class="card-text">
            Crea encuestas personalizadas de manera fácil y rápida. Diseña tus preguntas y opciones, y personaliza tu
            encuesta para obtener información valiosa.
          </p>
        </div>
      </div>

      <div class="card">
        <font-awesome-icon :icon="['fas', 'chart-bar']" class="fa-3x" />
        <div class="card-body">
          <h5 class="card-title">Recopilación de Respuestas</h5>
          <p class="card-text">
            Obtén respuestas y análisis detallados de tus encuestas. Visualiza los datos recopilados y toma decisiones
            informadas basadas en los resultados.
          </p>
        </div>
      </div>

      <div class="card">
        <font-awesome-icon :icon="['fas', 'users']" class="fa-3x" />
        <div class="card-body">
          <h5 class="card-title">Gestión de Usuarios</h5>
          <p class="card-text">
            Administra usuarios y colaboradores en tus proyectos de encuestas. Controla quién tiene acceso a tus encuestas
            y colabora de manera eficiente.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
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
.home-container {
  background-color: #f5f5f5;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 0;
  overflow: hidden;
}

.content-container {
  background-color: #ffffff;
  border-radius: 10px;
  padding: 20px;
  text-align: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
  width: 80%;
  /* Añadido un ancho máximo */
  max-width: 600px;
  /* Ancho máximo para dispositivos grandes */
}

.logo img {
  max-width: 200px;
  margin-bottom: 20px;
}

.button-container {
  margin-top: 20px;
}

.button-container button {
  margin-right: 10px;
}

.feature-cards {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  /* Centra las cartas horizontalmente */
}

.card {
  width: 30%;
  /* Cambiado el ancho para dispositivos pequeños */
  margin: 10px;
  border: 1px solid #ccc;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.card i {
  font-size: 48px;
  margin-bottom: 20px;
  /* Aumentado el margen inferior */
}

.card-title {
  font-size: 18px;
  margin-bottom: 10px;
  /* Aumentado el margen inferior */
}

.card-text {
  font-size: 14px;
  color: #777;
}

</style>
