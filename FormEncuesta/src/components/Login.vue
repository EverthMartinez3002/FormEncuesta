<template>
    <div class="container mt-4 d-flex justify-content-center align-items-center" style="height: 100vh;">
      <div class="card" style="width: 22rem;">
        <div class="card-body">
          <h2 class="card-title text-center">Iniciar Sesión</h2>
          <form @submit.prevent="login">
            <div class="mb-3">
              <label for="username" class="form-label">Nombre de Usuario:</label>
              <input
                type="text"
                class="form-control"
                id="username"
                v-model="username"
                required
              />
            </div>
            <div class="mb-3">
              <label for="password" class="form-label">Contraseña:</label>
              <input
                type="password"
                class="form-control"
                id="password"
                v-model="password"
                required
              />
            </div>
            <div class="mb-3">
              <label for="email" class="form-label">Correo Electrónico:</label>
              <input
                type="email"
                class="form-control"
                id="email"
                v-model="email"
                required
              />
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
  export default {
    data() {
      return {
        username: '',
        password: '',
        email: '',
      };
    },
    methods: {
      login() {
        this.username = '';
        this.password = '';
        this.email = '';
        //  this.$router.push('/dashboard');
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
  