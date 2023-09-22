<template>
    <div class="container mt-4">
        <div class="row">
            <div class="col-md-6">
                <div class="card bg-light mb-3">
                    <div class="card-body">
                        <h2 class="card-title">Crear Nueva Encuesta</h2>
                        <button @click="mostrarFormulario" class="btn btn-dark mb-3 mt-2">
                            {{ mostrar ? 'Ocultar Formulario' : 'Mostrar Formulario' }}
                        </button>
                        <form @submit.prevent="crearEncuesta" v-if="mostrar">
                            <div class="form-group">
                                <label for="titulo">Título:</label>
                                <input v-model="titulo" type="text" class="form-control" id="titulo" required>
                            </div>
                            <div class="form-group">
                                <label for="descripcion">Descripción:</label>
                                <textarea v-model="descripcion" class="form-control" id="descripcion" rows="4"
                                    required></textarea>
                            </div>
                            <div class="form-group">
                                <label>Lista de usuarios:</label>
                                <select v-model="usuariosSeleccionado" class="form-control" @change="handleSelectChange">
                                    <option value="" disabled selected>Seleccionar usuario</option>
                                    <option v-for="usuario in usuarios" :key="usuario.id" :value="String(usuario.id)">{{
                                        usuario.username }}</option>
                                </select>
                            </div>
                            <div class="mt-3">
                                <button type="submit" class="btn btn-dark">Crear Encuesta</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <div class="col-md-6">
                <div class="card bg-light mb-3">
                    <div class="card-body">
                        <h2 class="card-title">Crear Preguntas</h2>
                        <CrearPreguntas :encuestaCreada="encuestaCreada" :encuestaId="encuestaId" v-if="encuestaCreada" />
                        <div v-else>
                            <div class="alert alert-light mb-0" role="alert">
                                <p class="mb-1">Primero debes crear una encuesta antes de agregar preguntas.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
  
<script>
import api from '../components/utils/axios.config';
import Swal from 'sweetalert2';
import CrearPreguntas from './CrearPreguntas.vue';

export default {
    data() {
        return {
            mostrar: false,
            encuestaCreada: false,
            titulo: '',
            descripcion: '',
            usuariosSeleccionado: '',
            usuarios: [],
            encuestaId: null,
        };
    },
    components: {
        CrearPreguntas,
    },
    methods: {
        mostrarFormulario() {
            this.mostrar = !this.mostrar;
            console.log(this.encuestaId);
        },
        crearEncuesta() {
            const nuevaEncuesta = {
                titulo: this.titulo,
                descripcion: this.descripcion,
                usuarioId: this.usuariosSeleccionado,
            };

            api
                .post('/encuesta/create', nuevaEncuesta)
                .then((response) => {
                   const idEncuesta = response.data.encuesta;

                   this.encuestaId = 

                    Swal.fire({
                        title: 'Éxito',
                        text: 'Encuesta creada exitosamente',
                        icon: 'success',
                    });

                    this.titulo = '';
                    this.descripcion = '';
                    this.usuariosSeleccionado = '';

                    this.mostrar = false;
                    this.encuestaCreada = true;
                })
                .catch((error) => {
                    console.error('Error al crear la encuesta:', error);
                });
        },
    },
    created() {
        api
            .get('user/users')
            .then((response) => {
                this.usuarios = response.data.users;
            })
            .catch((error) => {
                console.log('Error al obtener la lista de usuarios:', error);
            });
    },
};
</script>
  
<style scoped>
select {
    height: auto;
    border: 1px solid #ccc;
    border-radius: 4px;
    padding: 5px;
}

.form-group select option:checked {
    background-color: #007bff;
    color: white;
}

.form-group select option {
    border: 1px solid #333;
    margin: 2px;
    padding: 5px;
}

.card {
    margin-top: 20px;
}
</style>
  