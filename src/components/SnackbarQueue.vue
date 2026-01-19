<script setup lang="ts">
import { computed } from 'vue';
import SnackbarContext from '../SnackbarContext';
import { VIcon } from 'vuetify/components';

const snackbars = computed(() => SnackbarContext['snackbars'] || []);
const showCancelButton = SnackbarContext.getSnackbarOptions()?.showCancelButton ?? true;
const icons = SnackbarContext.getSnackbarOptions()?.icons;

function handleClose(id: number) {
  SnackbarContext.remove(id);
}

function getAriaLive(level?: string): 'polite' | 'assertive' {
  return level === 'error' || level === 'warning' ? 'assertive' : 'polite';
}

function getRole(level?: string): 'alert' | 'status' {
  return level === 'error' || level === 'warning' ? 'alert' : 'status';
}

function getIcon(level?: string): string | undefined {
  if (!icons) return undefined;

  switch (level) {
    case 'error':
      return icons.error;
    case 'warning':
      return icons.warning;
    case 'success':
      return icons.success;
    case 'info':
    default:
      return icons.info;
  }
}
</script>

<template>
  <div class="snackbar-queue-container" aria-live="polite" aria-relevant="additions">
    <div
      v-for="(snackbar, index) in snackbars"
      :key="snackbar.id"
      class="snackbar-item"
      :class="`bg-${snackbar.level || 'bg-info'}`"
      :role="getRole(snackbar.level)"
      :aria-live="getAriaLive(snackbar.level)"
      aria-atomic="true"
    >
      <v-icon v-if="icons && getIcon(snackbar.level)" class="snackbar-icon">
        {{ getIcon(snackbar.level) }}
      </v-icon>
      <div class="snackbar-content" :id="`snackbar-content-${snackbar.id}`">
        {{ snackbar.text }}
      </div>
      <button
        v-if="showCancelButton"
        class="snackbar-close"
        @click="handleClose(snackbar.id)"
        :aria-label="`Close notification: ${snackbar.text}`"
        type="button"
      >
        ✕
      </button>
    </div>
  </div>
</template>

<style>
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
  padding: 1rem;
  gap: 1rem;
}

/* Direction variations */
#vuetify3-dialog-snackbar-container.snackbar-direction-bottom-to-top .snackbar-queue-container {
  flex-direction: column-reverse;
}

/* Vertical position variations */
#vuetify3-dialog-snackbar-container.snackbar-vertical-bottom .snackbar-queue-container {
  top: auto;
  bottom: 0;
}

/* Horizontal position variations */
#vuetify3-dialog-snackbar-container.snackbar-horizontal-left .snackbar-queue-container {
  left: 0;
  transform: translateX(0);
  align-items: flex-start;
}

#vuetify3-dialog-snackbar-container.snackbar-horizontal-right .snackbar-queue-container {
  left: auto;
  right: 0;
  transform: translateX(0);
  align-items: flex-end;
}

.snackbar-queue-container .snackbar-item {
  display: flex;
  align-items: center;
  width: 330px;
  max-width: 100%;
  padding: 0.75rem 1rem;
  border-radius: 0.25rem;
  box-shadow:
    0 3px 5px -1px rgba(0, 0, 0, 0.2),
    0 6px 10px 0 rgba(0, 0, 0, 0.14),
    0 1px 18px 0 rgba(0, 0, 0, 0.12);
  color: white;
  font-size: 0.875rem;
  pointer-events: auto;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  animation: snackbarSlideIn 0.3s ease-out;
}

.snackbar-queue-container .snackbar-icon {
  margin-right: 0.75rem;
  font-size: 1.25rem;
  display: flex;
  align-items: center;
}

.snackbar-queue-container .snackbar-content {
  flex: 1;
  word-break: break-word;
}

.snackbar-queue-container .snackbar-close {
  margin-left: 1rem;
  background: transparent;
  border: none;
  color: rgb(var(--v-theme-white, #ffffff));
  font-size: 1rem;
  cursor: pointer;
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;
  transition: background-color 0.2s;
}

.snackbar-queue-container .snackbar-close:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

@keyframes snackbarSlideIn {
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
