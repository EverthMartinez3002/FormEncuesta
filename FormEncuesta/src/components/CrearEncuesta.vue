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
                        <button @click="mostrarModal" class="btn btn-primary mb-2 ms-1">
                            Agregar Usuarios
                        </button>
                        <form @submit.prevent="crearEncuesta" v-if="mostrar">
                            <div class="form-group">
                                <label for="titulo">Título:</label>
                                <input v-model="titulo" type="text" class="form-control" id="titulo" required>
                                <div v-if="validationErrors.titulo" class="text-danger">{{ validationErrors.titulo }}</div>
                            </div>
                            <div class="form-group">
                                <label for="descripcion">Descripción:</label>
                                <textarea v-model="descripcion" class="form-control" id="descripcion" rows="4"
                                    required></textarea>
                                <div v-if="validationErrors.descripcion" class="text-danger">{{ validationErrors.descripcion
                                }}</div>
                            </div>
                            <div class="form-group">
                                <label>Lista de usuarios:</label>
                                <select v-model="usuariosSeleccionado" class="form-control" @change="handleSelectChange">
                                    <option value="" disabled selected>Seleccionar usuario</option>
                                    <option v-for="usuario in usuarios" :key="usuario.id" :value="String(usuario.id)">
                                        {{ usuario.username }}
                                    </option>
                                </select>
                                <div v-if="validationErrors.usuariosSeleccionado" class="text-danger">
                                    {{ validationErrors.usuariosSeleccionado }}
                                </div>
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
                        <CrearPreguntas :encuestaCreada="encuestaCreada" :encuestaId="encuestaId" v-if="encuestaCreada"
                            @preguntasCreadas="handlePreguntasCreadas" @cambiarEncuestaCreada="cambiarEncuestaCreada" />
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

    <div class="modal fade" id="agregarUsuariosModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
        aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Agregar Usuarios a la Encuesta</h5>
                </div>
                <div class="modal-body">
                    <ul>
                        <li v-for="usuario in usuarios" :key="usuario.id">
                            <label>
                                <input type="checkbox" v-model="usuario.selected">
                                {{ usuario.username }}
                            </label>
                        </li>
                    </ul>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" @click="cerrarModal">Cerrar</button>
                    <button type="button" class="btn btn-primary" @click="agregarUsuarios">Agregar</button>
                </div>
            </div>
        </div>
    </div>
</template>
  
<script>
import api from '../components/utils/axios.config';
import Swal from 'sweetalert2';
import CrearPreguntas from './CrearPreguntas.vue';
import { validateTitulo, validateDescripcion, validateRole_usuario } from '../components/utils/validations';

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
            validationErrors: {
                titulo: '',
                descripcion: '',
                usuariosSeleccionado: '',
            },
        };
    },
    components: {
        CrearPreguntas,
    },
    methods: {
        mostrarFormulario() {
            this.mostrar = !this.mostrar;
        },
        handlePreguntasCreadas() {
            this.encuestaCreada = false;
        },
        cambiarEncuestaCreada(valor) {
            this.encuestaCreada = valor;
        },
        crearEncuesta() {
            const tituloValidation = validateTitulo(this.titulo);
            const descripcionValidation = validateDescripcion(this.descripcion);
            const usuariosSeleccionadoValidation = validateRole_usuario(this.usuariosSeleccionado);

            if (!tituloValidation.valid) {
                this.validationErrors.titulo = tituloValidation.message;
            } else {
                this.validationErrors.titulo = '';
            }

            if (!descripcionValidation.valid) {
                this.validationErrors.descripcion = descripcionValidation.message;
            } else {
                this.validationErrors.descripcion = '';
            }

            if (!usuariosSeleccionadoValidation.valid) {
                this.validationErrors.usuariosSeleccionado = usuariosSeleccionadoValidation.message;
            } else {
                this.validationErrors.usuariosSeleccionado = '';
            }

            const nuevaEncuesta = {
                titulo: this.titulo,
                descripcion: this.descripcion,
                usuarioId: this.usuariosSeleccionado,
            };

            if (tituloValidation.valid & descripcionValidation.valid & usuariosSeleccionadoValidation.valid) {
                api.post('/encuesta/create', nuevaEncuesta)
                    .then((response) => {
                        const encuestaCreada = response.data.encuesta;

                        if (encuestaCreada) {
                            this.encuestaId = encuestaCreada.id;
                            this.encuestaCreada = true;

                            Swal.fire({
                                title: 'Éxito',
                                text: 'Encuesta creada exitosamente',
                                icon: 'success',
                            });

                            this.titulo = '';
                            this.descripcion = '';
                            this.usuariosSeleccionado = '';
                            this.mostrar = false;
                        } else {
                            Swal.fire({
                                title: 'Error',
                                text: 'No se pudo crear la encuesta.',
                                icon: 'error',
                            });
                        }
                    })
                    .catch((error) => {
                        console.error('Error al crear la encuesta:', error);
                    });
            }
        },
        mostrarModal() {
            const modal = document.getElementById('agregarUsuariosModal');
            if (modal) {
                modal.classList.add('show');
                modal.style.display = 'block';
                modal.setAttribute('aria-hidden', 'false');
                document.body.classList.add('modal-open');
            }
        },
        cerrarModal() {
            const modal = document.getElementById('agregarUsuariosModal');
            if (modal) {
                modal.style.display = 'none'; // Oculta el modal
            }
        }
    },
    created() {
        api.get('user/users')
            .then((response) => {
                this.usuarios = response.data.users;
            })
            .catch((error) => {
                console.log('Error al obtener la lista de usuarios:', error);
            });
    }
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
  