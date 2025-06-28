<script lang="ts" setup>
  import { useRoute } from "vue-router";
  import RoutineForm from "@/components/Dashboard/Routines/RoutineForm.vue";

  const route = useRoute();
  const routineId = route.params.id as string;
</script>

<template>
  <RoutineForm :routine-id="routineId" v-if="routineId" />
  <div v-else class="text-center text-gray-500">
    <p>Por favor, selecciona una rutina para editar.</p>
  </div>
</template>

<style lang="postcss" scoped></style>
