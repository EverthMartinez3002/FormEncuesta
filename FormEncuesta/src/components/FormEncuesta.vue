<template>
    <form @submit.prevent="submitForm" class="container mt-4">
        <div class="mb-3">
            <label for="razones" class="form-label">¿Cuáles fueron las razones por las que ya no siguió asistiendo al
                círculo?</label>
            <textarea id="razones" v-model="razones" class="form-control" required></textarea>
        </div>

        <div class="mb-3">
            <label for="propuestas" class="form-label">¿Cuáles son sus propuestas para mejorar?</label>
            <textarea id="propuestas" v-model="propuestas" class="form-control" required></textarea>
        </div>

        <div class="mb-3">
            <label for="actividades" class="form-label">¿Algún actividad o evento que quisiera que retomáramos o algo nuevo
                que quisiera que propusiéramos?</label>
            <textarea id="actividades" v-model="actividades" class="form-control" required></textarea>
        </div>

        <button type="submit" class="btn btn-primary">Enviar</button>
    </form>
</template>
  
<script>
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
};
</script>
  
<style scoped>
form{
}
</style>
  