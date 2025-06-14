<script lang="ts" setup>
import { supabase } from '@/lib/supabaseClient'

async function exportarDesdeSupabase() {
  try {
    const { data, error } = await supabase
      .from('workout_logs')
      .select(
        `
      created_at,
      notes,
      routine:routine_id (name),
      workout_log_entries (
        target_sets,
        target_reps,
        target_duration_sec,
        target_rest_between_sets_sec,
        exercise:exercise_id (
          name
        ),
        set_logs (
          set_number,
          reps,
          duration_sec,
          weight_kg,
          is_body_weight,
          rest_between_sets_sec,
          notes
        )
      )
    `,
      )
      .order('created_at', { ascending: false })

    // order set_logs by set_number
    if (data) {
      data.forEach((workout) => {
        workout.workout_log_entries.forEach((entry) => {
          entry.set_logs.sort((a, b) => a.set_number - b.set_number)
        })
      })
    }

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const enlace = document.createElement('a')
    enlace.href = url
    enlace.download = 'workouts_logs.json'
    document.body.appendChild(enlace)
    enlace.click()
    URL.revokeObjectURL(url)

    if (error) throw new Error(error.message)
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message)
      alert(`Error al obtener los datos: ${error.message}`)
    } else {
      console.error('Error desconocido:', error)
      alert('Error desconocido al obtener los datos.')
    }
    return
  }
}
</script>

<template>
  <button
    @click="exportarDesdeSupabase"
    type="button"
    class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
  >
    Exportar datos en formato JSON
  </button>
</template>

<style lang="postcss" scoped></style>
