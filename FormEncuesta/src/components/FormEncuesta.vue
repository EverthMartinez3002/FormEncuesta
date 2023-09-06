<template>
    <form @submit.prevent="submitForm" class="container mt-4">
        <div class="mb-3">
            <label for="razones" class="form-label">¿Que fue lo mas que le gusto de esta materia?</label>
            <textarea id="razones" v-model="razones" class="form-control" required></textarea>
        </div>

        <div class="mb-3">
            <label for="propuestas" class="form-label">¿Cuáles son sus propuestas para mejorarla?</label>
            <textarea id="propuestas" v-model="propuestas" class="form-control" required></textarea>
        </div>

        <div class="mb-3">
            <label for="actividades" class="form-label">¿Algún actividad o dinamica que le gustaria que 
                implementaramos?</label>
            <textarea id="actividades" v-model="actividades" class="form-control" required></textarea>
        </div>

        <button type="submit" class="btn btn-primary">
            <font-awesome-icon icon="paper-plane" /> Enviar  
        </button>
    </form>
</template>
  
<script>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
export default {
    data() {
        return {
            razones: '',
            propuestas: '',
            actividades: '',
        };
    },
    methods: {
        submitForm() {

        },
    },
    components: {
        FontAwesomeIcon,
    },
};
</script>
  
<style scoped></style>
  