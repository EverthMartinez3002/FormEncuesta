<template>
    <div class="container mt-4">
        <div class="row">
            <div class="col-md-6">
                <div class="card bg-light mb-3">
                    <div class="card-body">
                        <h2 class="card-title">Crear Encuesta</h2>
                        <button @click="mostrarFormulario" class="btn btn-dark mb-3 mt-2" v-if="!mostrarAlertaPreguntas">
                            {{ mostrar ? 'Ocultar Formulario' : 'Mostrar Formulario' }}
                        </button>
                        <div class="alert alert-danger" v-if="mostrarAlertaPreguntas">
                            Debes agregar preguntas a la encuesta antes de crear una nueva encuesta.
                            <button type="button" class="close" @click="mostrarAlertaPreguntas = false">&times;</button>
                        </div>
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
        <button @click="mostrarModal" :disabled="!preguntasCreadas"
            class="btn btn-primary d-flex justify-content-center align-items-center mx-auto mb-1  custom-button">
            Agregar Usuarios
        </button>
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
                        <li v-for="usuario in usuariosNoAgregados" :key="usuario.id">
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
            titulo2: '',
            descripcion: '',
            descripcion2: '',
            usuariosSeleccionado: '',
            usuarios: [],
            usuariosS: [],
            encuestaId: null,
            usuariosNoAgregados: '',
            encuestasIds: [],
            preguntasCreadas: false,
            mostrarAlertaPreguntas: false,
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
            if (this.encuestaCreada && !this.preguntasCreadas) {
                this.mostrarAlertaPreguntas = true
            }
            else {
                this.mostrar = !this.mostrar;
            }
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

            this.titulo2 = this.titulo;
            this.descripcion2 = this.descripcion;

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
                            this.preguntasCreadas = false;

                            this.encuestasIds.push(encuestaCreada.id);

                            this.agregarUsuarioSeleccionado(this.usuariosSeleccionado);

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
        cargarUsuariosNoAgregados() {
            const usuarioIds = this.usuariosS;
            api.post(`/user/users/`, { usuarioIds })
                .then((response) => {
                    this.usuariosNoAgregados = response.data.users;
                })
                .catch((error) => {
                    console.error('Error al cargar la lista de usuarios no agregados:', error);
                });
        },
        agregarUsuarios() {
            const usuariosSeleccionados = this.usuariosNoAgregados.filter(usuario => usuario.selected);

            if (usuariosSeleccionados.length > 0) {
                // Obtener los IDs de los usuarios seleccionados
                const usuariosIds = usuariosSeleccionados.map(usuario => usuario.id);

                usuariosIds.forEach(async usuarioId => {
                    const EncuestaUsuario = {
                        titulo: this.titulo2,
                        descripcion: this.descripcion2,
                        usuarios: [usuarioId],
                    };

                    try {
                        const response = await api.post('/encuesta/createUsers', EncuestaUsuario);
                        const encuestaCreada = response.data.encuestas;

                        if (encuestaCreada) {
                            this.encuestasIds.push(encuestaCreada[0].id);
                            this.agregarUsuarioSeleccionado(usuarioId);
                            Swal.fire({
                                title: 'Éxito',
                                text: `Usuarios Agregados exitosamente`,
                                icon: 'success',
                            });

                            this.cerrarModal();
                            this.preguntasCreadas = false;
                        }
                    } catch (error) {
                        Swal.fire({
                            title: 'Error',
                            text: `No se pudo agregar los usuarios ${usuarioId}.`,
                            icon: 'error',
                        });
                    }
                });

                this.usuariosNoAgregados.forEach(usuario => {
                    if (usuario.selected) {
                        usuario.selected = false;
                    }
                });
            } else {
                Swal.fire({
                    title: 'Error',
                    text: 'Debe seleccionar al menos un usuario.',
                    icon: 'error',
                });
            }
        },
        async mostrarModal() {
            this.cargarUsuariosNoAgregados();

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
        },
        agregarUsuarioSeleccionado(usuarioId) {
            this.usuariosS.push(usuarioId);
        },
        handlePreguntasCreadas() {
            this.preguntasCreadas = true;
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

.custom-button {
    width: 200px;
    /* Ancho deseado */
    height: 50px;
    /* Alto deseado */
    font-size: 16px;
    /* Tamaño de fuente deseado */
    background-color: #000000;
    /* Color de fondo deseado */
    color: white;
    /* Color de texto deseado */
    border: none;
    /* Sin borde */
    cursor: pointer;
    transition: background-color 0.3s ease;
    /* Efecto de transición para el color de fondo */
}

.custom-button:hover {
    background-color: #0056b3;
    /* Cambia el color de fondo al pasar el mouse sobre el botón */
}
</style>
  