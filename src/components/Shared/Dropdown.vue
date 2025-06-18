<script lang="ts" setup>
  import { ref, onMounted, onUnmounted, watch, nextTick, useTemplateRef } from "vue";
  import IconUser from "@/components/Icons/User.vue";
  import IconButton from "@/components/Buttons/IconButton.vue";

  defineOptions({
    name: "DropdownComponent",
  });

  const props = defineProps<{
    title: string;
    items: {
      label: string;
      to?: string;
      action?: () => void;
      class?: string;
    }[];
  }>();

  const showDropdown = ref(false);
  const dropDirectionUp = ref(false);
  const dropdownRef = useTemplateRef<HTMLElement>("dropdownRef");
  const listRef = useTemplateRef<HTMLElement>("listRef");

  function handleClickOutside(event: MouseEvent) {
    if (dropdownRef.value && !dropdownRef.value.contains(event.target as Node)) {
      showDropdown.value = false;
    }
  }

  onMounted(() => {
    document.addEventListener("mousedown", handleClickOutside);
  });

  onUnmounted(() => {
    document.removeEventListener("mousedown", handleClickOutside);
  });

  watch(showDropdown, async (isVisible) => {
    if (isVisible && dropdownRef.value && listRef.value) {
      await nextTick();
      const dropdownRect = dropdownRef.value.getBoundingClientRect();
      const listHeight = listRef.value.offsetHeight;
      const availableSpaceBelow = window.innerHeight - dropdownRect.bottom;
      dropDirectionUp.value = availableSpaceBelow < listHeight;
    }
  });
</script>

<template>
  <div class="app-dropdown" ref="dropdownRef">
    <!-- Button -->
    <IconButton @click="showDropdown = !showDropdown">
      <IconUser />
    </IconButton>

    <!-- Dropdown -->
    <div
      v-if="showDropdown"
      ref="listRef"
      class="app-dropdown__list"
      :class="{ 'app-dropdown__list--up': dropDirectionUp }"
    >
      <ul>
        <li v-for="(item, i) in props.items" :key="i" class="app-dropdown__item" @click="() => item.action?.()">
          <slot name="item" :item="item">
            <RouterLink v-if="item.to" :to="item.to" :class="item.class">
              {{ item.label }}
            </RouterLink>
            <span v-else :class="item.class">{{ item.label }}</span>
          </slot>
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped lang="postcss">
  .app-dropdown {
    @apply relative;
  }

  .app-dropdown__list {
    @apply absolute z-[10000] right-0 w-max;
    width: 200px;
    @apply bg-white;
    @apply border border-slate-300;
    @apply p-1 mt-1 rounded-md;
    @apply shadow-lg;
    @apply dark:bg-slate-800 dark:border-slate-700;
  }

  .app-dropdown__list--up {
    top: auto;
    bottom: 100%;
  }

  .app-dropdown__item {
    @apply hover:bg-slate-200;
    @apply block text-sm rounded-sm;
    @apply p-2 select-none;
    @apply cursor-pointer;
    @apply hover:bg-slate-100 dark:hover:bg-slate-700;
    @apply border-b border-slate-200 dark:border-slate-600 last:border-0;
  }
</style>
