<script setup lang="ts">
import { computed } from 'vue';
import SnackbarContext from '../SnackbarContext';

const snackbars = computed(() => SnackbarContext['snackbars'] || []);

const colorMap: Record<string, string> = {
  info: '#2196F3',
  success: '#4CAF50',
  warning: '#FB8C00',
  error: '#FF5252',
};

function getColor(level?: string): string {
  return colorMap[level || 'info'] || colorMap.info;
}

function handleClose(id: number) {
  SnackbarContext.remove(id);
}
</script>

<template>
  <div class="snackbar-queue-container">
    <div
      v-for="(snackbar, index) in snackbars"
      :key="snackbar.id"
      class="snackbar-item"
      :style="{
        backgroundColor: getColor(snackbar.level),
        marginTop: snackbar.location?.includes('top') ? `${index * 72}px` : undefined,
        marginBottom: snackbar.location?.includes('bottom') ? `${index * 72}px` : undefined,
      }"
    >
      <div class="snackbar-content">
        {{ snackbar.text }}
      </div>
      <button class="snackbar-close" @click="handleClose(snackbar.id)">✕</button>
    </div>
  </div>
</template>

<style scoped>
.snackbar-queue-container {
  position: fixed;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  z-index: 9999;
  pointer-events: none;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 16px;
}

.snackbar-item {
  display: flex;
  align-items: center;
  min-width: 344px;
  max-width: 672px;
  padding: 14px 16px;
  margin-bottom: 8px;
  border-radius: 4px;
  box-shadow:
    0 3px 5px -1px rgba(0, 0, 0, 0.2),
    0 6px 10px 0 rgba(0, 0, 0, 0.14),
    0 1px 18px 0 rgba(0, 0, 0, 0.12);
  color: white;
  font-size: 14px;
  line-height: 20px;
  font-family: Roboto, sans-serif;
  pointer-events: auto;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  animation: slideIn 0.3s ease-out;
}

.snackbar-content {
  flex: 1;
  word-break: break-word;
}

.snackbar-close {
  margin-left: 16px;
  background: transparent;
  border: none;
  color: white;
  font-size: 18px;
  cursor: pointer;
  padding: 4px 8px;
  border-radius: 4px;
  transition: background-color 0.2s;
}

.snackbar-close:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
