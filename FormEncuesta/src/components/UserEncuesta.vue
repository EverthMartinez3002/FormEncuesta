<template>
    <div class="container mt-5">
        <h1 class="title">Encuestas del usuario
            <button class="btn btn-danger close-button" @click="cerrarSesion">Cerrar Sesión</button>
        </h1>
        <div class="row">
            <div v-for="(encuesta, index) in encuestas" :key="index" class="col-md-4 mb-3">
                <div :class="['card', { 'encuesta-contestada': encuesta.contestada }]">
                    <div class="card-body">
                        <h5 class="card-title">{{ encuesta.titulo }}</h5>
                        <p class="card-text">{{ formatDate(encuesta.fecha_inicio) }}</p>
                        <button v-if="encuesta.contestada" class="btn btn-primary" @click="verDetalle(encuesta)">Ver
                            Detalle</button>
                        <button v-else class="btn btn-primary" @click="contestarEncuesta(encuesta.id)">
                            Contestar Encuesta
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <div class="modal fade" id="encuestaModal" tabindex="-1" role="dialog">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">{{ encuestaSeleccionada ? encuestaSeleccionada.titulo : '' }}</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close" @click="cerrarModal">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <h4>Descripción:</h4>
                        <p>{{ encuestaSeleccionada ? encuestaSeleccionada.descripcion : '' }}</p>
                        <h4>Preguntas:</h4>
                        <ul v-if="encuestaSeleccionada && encuestaSeleccionada.Pregunta">
                            <li v-for="(pregunta, index) in encuestaSeleccionada.Pregunta" :key="index">
                                {{ pregunta.texto_pregunta }}
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
  
<script>
import api from '../components/utils/axios.config';

export default {
    data() {
        return {
            encuestas: [],
            encuestaSeleccionada: null,
        };
    },
    methods: {
        async cargarEncuestas() {
            try {
                // Obtener el usuarioId del token
                const token = this.$store.getters.getToken;
                const tokenData = JSON.parse(atob(token.split('.')[1]));
                const userId = tokenData.user.id;

                // Realizar una solicitud para obtener las encuestas del usuario
                const response = await api.get(`/encuesta/${userId}`);

                if (response.data && response.data.encuestas) {
                    this.encuestas = response.data.encuestas;

                    // Verificar si cada encuesta está contestada
                    for (const encuesta of this.encuestas) {
                        const contestadaResponse = await api.get(`/encuesta/respuestas/${encuesta.id}`);
                        if (contestadaResponse.data && contestadaResponse.data.contestada) {
                            encuesta.contestada = true;
                        } else {
                            encuesta.contestada = false;
                        }
                    }
                }
            } catch (error) {
                console.error('Error al cargar las encuestas:', error);
            }
        },
        verDetalle(encuesta) {
            const modal = document.getElementById('encuestaModal');
            if (modal) {
                modal.classList.add('show');
                modal.style.display = 'block';
                document.body.classList.add('modal-open');
            }

            this.encuestaSeleccionada = encuesta;
        },
        cerrarModal() {

            const modal = document.getElementById('encuestaModal');
            if (modal) {
                modal.classList.remove('show');
                modal.style.display = 'none';
                document.body.classList.remove('modal-open');
            }

            this.encuestaSeleccionada = null;
        },

        formatDate(dateString) {
            const options = { year: 'numeric', month: 'long', day: 'numeric' };
            return new Date(dateString).toLocaleDateString(undefined, options);
        },
        cerrarSesion() {
            this.$store.dispatch('logout');
            this.$router.push({ name: 'Home' });
        },
        contestarEncuesta(encuestaId){
            this.$router.push({ name: 'Encuesta', params: { idEncuesta: encuestaId}})
        }
    },
    computed: {
        token() {
            return this.$store.getters.getToken;
        },
    },
    created() {
        this.cargarEncuestas();
    },
};
</script>
  
<style scoped>
.title {
    margin-bottom: 1em;
}

.encuesta-contestada {

    border: 2px solid green;
    background-color: #f0f8ff;

}
</style>
  