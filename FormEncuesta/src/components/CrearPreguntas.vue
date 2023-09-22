<template>
    <div>
        <div v-for="(pregunta, index) in preguntas" :key="index" class="card mb-3">
            <div class="card-body">
                <h5 class="card-title">Pregunta {{ index + 1 }}</h5>
                <div class="form-group">
                    <label for="textoPregunta">Texto de la Pregunta:</label>
                    <textarea v-model="pregunta.texto" class="form-control" :id="'textoPregunta_' + index" rows="3"
                        required></textarea>
                </div>
                <div class="form-group">
                    <label for="tipoPregunta">Tipo de Pregunta:</label>
                    <select v-model="pregunta.tipo" class="form-control" :id="'tipoPregunta_' + index" required>
                        <option value="texto_abierto">Abierta</option>
                    </select>
                </div>
            </div>
        </div>
        <div class="button-container">
            <button type="button" class="btn btn-primary mr-3" @click="agregarPregunta">Agregar Pregunta</button>
            <button type="button" class="btn btn-success" @click="crearPreguntas">Crear Preguntas</button>
        </div>
    </div>
</template>
  
<script>
import api from '../components/utils/axios.config';
import Swal from 'sweetalert2';

export default {
    props: {
        encuestaCreada: Boolean,
        encuestaId: Number,
    },
    data() {
        return {
            preguntas: [
                {
                    texto: '',
                    tipo: 'opcion_unica',
                },
            ],
        };
    },
    methods: {
        agregarPregunta() {
            this.preguntas.push({
                texto: '',
                tipo: 'opcion_unica',
            });
        },
        crearPreguntas() {
            const preguntasNoVacias = this.preguntas.filter(pregunta => pregunta.texto.trim() !== '');

            if (this.encuestaCreada && this.encuestaId !== null) {
                const preguntasAEnviar = preguntasNoVacias.map(pregunta => {
                    return {
                        texto: pregunta.texto,
                        tipo: pregunta.tipo,
                    };
                });

                api
                    .post('/pregunta/create', { preguntas: preguntasAEnviar, encuestaId: this.encuestaId })
                    .then(response => {
                        console.log('Preguntas creadas con éxito:', response.data.preguntas);
                        this.preguntas = [
                            {
                                texto: '',
                                tipo: 'opcion_unica',
                            },
                        ];
                    })
                    .catch(error => {
                        console.error('Error al crear las preguntas:', error);
                    });
            } else {
                Swal.fire({
                    title: 'Error',
                    text: 'Debes crear una encuesta primero para agregar preguntas.',
                    icon: 'error',
                });
            }
        },
    },
}
</script>
  
<style scoped>
.button-container {
    margin-top: 20px;
    margin-bottom: 20px;
}
</style>