<template>
    <div>
        <div v-for="(pregunta, index) in preguntas" :key="index" class="card mb-3">
            <div class="card-body">
                <h5 class="card-title">Pregunta {{ index + 1 }}</h5>
                <div class="form-group">
                    <label for="textoPregunta">Texto de la Pregunta:</label>
                    <textarea v-model="pregunta.texto" class="form-control" :id="'textoPregunta_' + index" rows="3"
                        required></textarea>
                    <div v-if="pregunta.errorTexto" class="text-danger">{{ pregunta.errorTexto }}</div>
                </div>
                <div class="form-group">
                    <label for="tipoPregunta">Tipo de Pregunta:</label>
                    <select v-model="pregunta.tipo" class="form-control" :id="'tipoPregunta_' + index" required>
                        <option value="Abierta">Abierta</option>
                    </select>
                    <div v-if="pregunta.errorTipo" class="text-danger">{{ pregunta.errorTipo }}</div>
                </div>
            </div>
        </div>
        <div class="button-container">
            <button type="button" class="btn btn-primary mr-3" @click="agregarPregunta">Agregar Pregunta</button>
            <button type="button" class="btn btn-success ml-3" style="margin-left: 1em;" @click="crearPreguntas"
                :disabled="preguntas.length === 0">Crear
                Preguntas</button>
            <button type="button" class="btn btn-danger" style="margin-left: 1em;" @click="eliminarPregunta(index)">Eliminar
                Pregunta</button>
        </div>
    </div>
</template>

<script>
import api from '../components/utils/axios.config';
import Swal from 'sweetalert2';
import { validateTextoPregunta, validateTipo_pregunta } from '../components/utils/validations';
import Encuesta from '../views/Encuesta.vue';

export default {
    props: {
        encuestaCreada: Boolean,
        encuestaId: Number,
    },
    data() {
        return {
            preguntas: [
                {
                    texto: '¿?',
                    tipo: '',
                    errorTexto: '',
                    errorTipo: '',
                },
            ],
        };
    },
    methods: {
        agregarPregunta() {
            this.preguntas.push({
                texto: '¿?',
                tipo: '',
                errorTexto: '',
                errorTipo: '',
            });
        },
        async crearPreguntas() {
            const preguntasOriginales = [...this.preguntas];


            this.preguntas.forEach(pregunta => {
                pregunta.errorTexto = '';
                pregunta.errorTipo = '';
            });

            const preguntasNoVacias = this.preguntas;
            const errores = [];

            for (let index = 0; index < preguntasNoVacias.length; index++) {
                const pregunta = preguntasNoVacias[index];


                const textoPreguntaValidation = validateTextoPregunta(pregunta.texto);
                const tipoPreguntaValidation = validateTipo_pregunta(pregunta.tipo);

                if (!textoPreguntaValidation.valid) {
                    pregunta.errorTexto = textoPreguntaValidation.message;
                    errores.push(textoPreguntaValidation.message);
                }

                if (!tipoPreguntaValidation.valid) {
                    pregunta.errorTipo = tipoPreguntaValidation.message;
                    errores.push(tipoPreguntaValidation.message);
                }

            }

            if (errores.length > 0) {
                this.preguntas = preguntasOriginales;
                return;
            }


            // Si llegamos aquí, todas las preguntas son válidas
            if (this.encuestaCreada && this.encuestaId !== null) {
                const preguntasAEnviar = preguntasNoVacias.map(pregunta => {
                    return {
                        texto_pregunta: pregunta.texto,
                        tipo_pregunta: pregunta.tipo,
                    };
                });

                try {
                    const response = await api.post('/pregunta/create', { preguntas: preguntasAEnviar, encuestaId: this.encuestaId });

                    this.preguntas = [
                        {
                            texto: '¿?',
                            tipo: '',
                            errorTexto: '',
                            errorTipo: '',
                        },
                    ];

                    this.$emit('preguntasCreadas');

                    Swal.fire({
                        title: 'Éxito',
                        text: 'Preguntas creadas exitosamente',
                        icon: 'success',
                    });

                    this.$emit('encuestaCreada');
                    this.$emit('cambiarEncuestaCreada', false);
                } catch (error) {
                    console.error('Error al crear las preguntas:', error);
                }
            } else {
                Swal.fire({
                    title: 'Error',
                    text: 'Debes crear una encuesta primero para agregar preguntas.',
                    icon: 'error',
                });
            }
        },
        eliminarPregunta(index) {
            this.preguntas.splice(index, 1);
        }
    },
};
</script>

<style scoped>
.button-container {
    margin-top: 5px;
    margin-bottom: 5px;
}
</style>
