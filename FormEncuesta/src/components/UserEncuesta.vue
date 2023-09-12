<template>
    <div class="container mt-5">
        <h1>Encuestas Llenadas por el Usuario</h1>
        <div class="row">
            <!-- Itera sobre las encuestas llenadas por el usuario -->
            <div v-for="(encuesta, index) in encuestas" :key="index" class="col-md-4 mb-3">
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">{{ encuesta.titulo }}</h5>
                        <p class="card-text">{{ encuesta.fecha }}</p>
                        <button class="btn btn-primary" @click="verDetalle(encuesta)">Ver Detalle</button>
                    </div>
                </div>
            </div>
        </div>

        <!-- Modal para mostrar los detalles de la encuesta seleccionada -->
        <div class="modal" id="encuestaModal" tabindex="-1" role="dialog">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Detalle de la Encuesta</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close" @click="cerrarModal">
                            <span aria-hidden="true">&times;</span>
                        </button>

                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
  
<script>
export default {
    data() {
        return {
            encuestas: [], // Aquí debes cargar las encuestas del usuario desde tu backend
            encuestaSeleccionada: null,
        };
    },
    methods: {
        verDetalle(encuesta) {
            // Muestra el modal y asigna la encuesta seleccionada
            this.encuestaSeleccionada = encuesta;
            $('#encuestaModal').modal('show'); //Bootstrap funcionando
        },
        cerrarModal() {
            // Cierra el modal
            $('#encuestaModal').modal('hide');
        },
    },
    computed: {
        token() {
            return this.$store.getters.getToken;
        },
    },
};
</script>
  
<style scoped>
/* Estilos personalizados */
</style>
  