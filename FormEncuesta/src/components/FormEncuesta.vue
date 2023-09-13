<template>
    <form @submit.prevent="submitForm" class="container mt-4">
        <div class="mb-3">
            <label for="razones" class="form-label">¿Qué fue lo que más te gustó de esta materia?</label>
            <textarea id="razones" v-model="razones" class="form-control" required></textarea>
        </div>

        <div class="mb-3">
            <label for="propuestas" class="form-label">¿Cuáles son tus propuestas para mejorarla?</label>
            <textarea id="propuestas" v-model="propuestas" class="form-control" required></textarea>
        </div>

        <div class="mb-3">
            <label for="actividades" class="form-label">¿Algún actividad o dinámica que te gustaría que
                implementáramos?</label>
            <textarea id="actividades" v-model="actividades" class="form-control" required></textarea>
        </div>

        <button type="submit" class="btn btn-primary">
            <font-awesome-icon icon="paper-plane" /> Enviar
        </button>
    </form>
</template>
  
<script>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import axios from 'axios';
import Swal from 'sweetalert2'; 

export default {
    data() {
        return {
            razones: '',
            propuestas: '',
            actividades: '',
        };
    },
    methods: {
        async submitForm() {
            const token = this.$store.getters.getToken;

            const tokenData = JSON.parse(atob(token.split('.')[1]));

            const userId = tokenData.user.id;
            try {
                const response = await axios.post('/encuesta', {
                    reseña: this.razones,
                    propuesta: this.propuestas,
                    actividad: this.actividades,
                    usuarioId: userId,
                });

                Swal.fire({
                    icon: 'success',
                    text: 'Encuesta creada con éxito.',
                }).then(() => {
                    
                    this.$router.push('/user');
                });
            } catch (error) {
                console.error('Error al crear la encuesta:', error);
                Swal.fire({
                    icon: 'error',
                    text: 'Error al crear la encuesta. Por favor, inténtalo nuevamente.',
                });
            }
        },
    },
    components: {
        FontAwesomeIcon,
    },
};
</script>
  