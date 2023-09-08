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
                    <div class="text-center">
                        <button type="button" @click="register" class="btn btn-dark">Registrarse</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import Swal from 'sweetalert2';

import { validateUsername, validatePassword, validateEmail } from '../components/utils/validations.js';

export default {
    data() {
        return {
            username: '',
            password: '',
            email: '',
            validationErrors: {
                username: '',
                password: '',
                email: '',
            },
        };
    },
    methods: {
        async register() {
            try {
                this.validationErrors = {};

                if (!validateUsername(this.username)) {
                    this.validationErrors.username = 'Nombre de usuario no válido.';
                    return;
                }

                if (!validatePassword(this.password)) {
                    this.validationErrors.password = 'Contraseña no válida.';
                    return;
                }

                if (!validateEmail(this.email)) {
                    this.validationErrors.email = 'Correo electrónico no válido.';
                    return;
                }

                const response = await axios.post('user/register', {
                    username: this.username,
                    password: this.password,
                    email: this.email,
                });

                if (response.status === 201) {
                    Swal.fire({
                        icon: 'success',
                        text: 'Usuario registrado con éxito.',
                    });

                    setTimeout(() => {
                        this.$router.push('/');
                    }, 1500);
                } else {
                    console.error('Error al registrar el usuario:', response.data.message);
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
