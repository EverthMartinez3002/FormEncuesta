<template>
    <form @submit.prevent="submitForm" class="container mt-4">
        <h1>{{ encuesta.titulo }}</h1>
        <div v-for="pregunta in encuesta.Pregunta" :key="pregunta.id" class="mb-3">
            <label :for="pregunta.id" class="form-label">{{ pregunta.texto_pregunta }}</label>
            <textarea :id="pregunta.id" v-model="respuestas[pregunta.id]" class="form-control" required></textarea>
        </div>

        <button type="submit" class="btn btn-primary">
            <font-awesome-icon icon="paper-plane" /> Enviar
        </button>
    </form>
</template>
  
<script>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import api from '../components/utils/axios.config';
import Swal from 'sweetalert2';

export default {
    data() {
        return {
            encuesta: {},
            respuestas: {},
        };
    },
    async created() {
        const encuestaId = this.$route.params.idEncuesta;
        console.log(encuestaId);
        try {
            const response = await api.get(`/pregunta/${encuestaId}`);
            this.encuesta = response.data;
        } catch (error) {
            console.error('Error al obtener los detalles de la encuesta:', error);
        }
    },
    methods: {
        async submitForm() {
            const token = this.$store.getters.getToken;
            const tokenData = JSON.parse(atob(token.split('.')[1]));
            const userId = tokenData.user.id;


            try {
                const respuestas = Object.keys(this.respuestas).map((preguntaId) => ({
                    texto_respuesta: this.respuestas[preguntaId],
                    preguntaId,
                    usuarioId: userId,
                }));

                const response = await api.post('/respuesta/', respuestas);
                Swal.fire({
                    icon: 'success',
                    text: 'Respuestas enviadas con éxito.',
                }).then(() => {
                    this.$router.push('/user');
                });
            } catch (error) {
                console.error('Error al enviar las respuestas:', error);
                Swal.fire({
                    icon: 'error',
                    text: 'Error al enviar las respuestas. Por favor, inténtalo nuevamente.',
                });
            }
        },
    },
    components: {
        FontAwesomeIcon,
    },
};
</script>
  