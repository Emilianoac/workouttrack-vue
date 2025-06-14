<script lang="ts" setup>
  import SkeletonComponent from "@/components/Skeletons/Skeleton.vue";
</script>

<template>
  <!-- Lista de entrenamientos -->
  <div class="workouts-logs-container">
    <article class="workout-log" v-for="(log, logIndex) in 5" :key="logIndex">
      <div class="workout-log-header">
        <h2 class="workout-log-title">
          <SkeletonComponent width="90px" height="20px" />
        </h2>
        <p class="workout-log-routine">
          <SkeletonComponent width="150px" height="20px" />
        </p>
      </div>
      <div class="workout-log-body">
        <SkeletonComponent width="200px" height="10px" class="mb-5" />
        <ul class="workout-log-entries">
          <li v-for="(entry, entryId) in 5" :key="entryId" class="workout-log-entry">
            <SkeletonComponent width="190px" height="20px" class="mb-5" />
            <ul class="workout-log-entry-details">
              <li>
                <SkeletonComponent width="120px" height="20px" class="mb-2" />
                <SkeletonComponent width="120px" height="20px" />
              </li>
              <li>
                <SkeletonComponent width="120px" height="20px" class="mb-2" />
                <SkeletonComponent width="120px" height="20px" />
              </li>
              <li>
                <SkeletonComponent width="120px" height="20px" class="mb-2" />
                <SkeletonComponent width="120px" height="20px" />
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </article>
  </div>
</template>

<style lang="postcss" scoped></style>
