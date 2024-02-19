<script setup lang="ts">
import { computed } from 'vue';
import { VBtn, VCard, VCardActions, VCardText, VCardTitle, VIcon } from 'vuetify/lib/components/index.mjs';

const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  buttons: {
    type: Array as () => any[],
  },
  icon: {
    type: String,
    default: '',
  },
  level: {
    type: String as () => 'info' | 'warning' | 'error' | 'success',
    default: 'info',
  },
  cardOptions: {
    type: Object,
    default: () => ({}),
  },
});

// ------- EVENTS -------
const emit = defineEmits(['buttonClicked']);

// ------- COMPUTED -------
const _buttons = computed(() => {
  if (props.buttons && props.buttons.length > 0) return props.buttons;
  else
    return [
      { key: 'cancel', title: 'Cancel', value: 'cancel', color: 'primary', variant: 'outlined' },
      { key: 'ok', title: 'OK', value: 'ok', color: 'primary', variant: 'tonal' },
    ];
});

const _icon = computed(() => {
  switch (props.level) {
    case 'info':
      return '$info';
    case 'warning':
      return '$warning';
    case 'error':
      return '$error';
    case 'success':
      return '$success';
    default:
      return '$info';
  }
});

const _color = computed(() => {
  return props.level === 'info' ? 'primary' : props.level;
});

// ------- METHODS -------
function close(buttonKey: string | boolean) {
  emit('buttonClicked', buttonKey);
}
</script>

<template>
  <VCard class="vuetify3-dialog-card" v-bind="cardOptions">
    <VCardTitle class="d-flex align-center bg-primary">
      <VIcon class="mr-2">{{ _icon }}</VIcon> {{ title }}
    </VCardTitle>
    <VCardText>{{ text }}</VCardText>
    <VCardActions class="justify-end">
      <VBtn
        v-for="button in _buttons"
        :key="button.key"
        v-bind="button"
        :color="button.color || _color"
        @click="close(button.key)"
      >
        {{ button.title }}
      </VBtn>
    </VCardActions>
  </VCard>
</template>
