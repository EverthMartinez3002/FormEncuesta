<template>
  <div class="text-center">
    <FormEncuesta />
  </div>
</template>

<script>
import FormEncuesta from '../components/FormEncuesta.vue'

export default {
  components: {
    FormEncuesta
  },
}
</script>

<style>
.text-center {
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>