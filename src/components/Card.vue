<script setup lang="ts">
import { ComponentOptions } from 'types';
import { computed, Component, PropType, ref } from 'vue';
import { VBtn, VCard, VCardActions, VCardText, VCardTitle, VIcon, VSpacer } from 'vuetify/lib/components/index.mjs';

const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  showDefaultButtons: {
    type: Boolean,
    default: false,
  },
  buttons: {
    type: Array as () => any[],
  },
  icon: {
    type: String,
  },
  level: {
    type: String as () => 'info' | 'warning' | 'error' | 'success',
    default: 'info',
  },
  cardOptions: {
    type: Object,
    default: () => ({
      headerColor: 'primary',
    }),
  },
  customComponent: {
    type: Object as PropType<ComponentOptions>,
    required: false,
  },
});

// ------- EVENTS -------
const emit = defineEmits(['buttonClicked']);

// ------- DATA -------
const emittedTitle = ref<string>();

// ------- COMPUTED -------
const _buttons = computed(() => {
  if (props.buttons && props.buttons.length > 0) return props.buttons;
  else if (props.showDefaultButtons)
    return [
      { key: 'cancel', title: 'Cancel', value: 'cancel', color: 'primary', variant: 'outlined' },
      { key: 'ok', title: 'OK', value: 'ok', color: 'primary', variant: 'tonal' },
    ];
  else {
    return [];
  }
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

const calculatedTitle = computed(() => {
  return emittedTitle.value || props.title;
});

// ------- METHODS -------
function close(buttonKey: string | boolean) {
  emit('buttonClicked', buttonKey);
}
function setTitle(newTitle: string) {
  emittedTitle.value = newTitle;
}
</script>

<template>
  <VCard class="vuetify3-dialog-card" v-bind="cardOptions">
    <VCardTitle class="d-flex align-center justify-space-between" :class="`bg-${cardOptions.headerColor}`">
      <VIcon class="mr-2">{{ _icon }}</VIcon> {{ calculatedTitle }}
      <v-spacer />
      <v-btn @click="close(false)" icon :color="cardOptions.headerColor" variant="flat">
        <v-icon>$close</v-icon>
      </v-btn>
    </VCardTitle>
    <component
      v-if="customComponent"
      :is="customComponent.component"
      v-bind="customComponent.props"
      @closeDialog="close"
      @set:title="setTitle"
      ref="custom-component"
    />
    <VCardText v-else>{{ text }}</VCardText>
    <VCardActions class="justify-end" v-if="_buttons?.length > 0">
      <VBtn
        v-for="button in _buttons"
        :key="button.key"
        v-bind="button"
        :color="button.color || _color"
        @click="button.key != undefined && close(button.key)"
      >
        {{ button.title }}
      </VBtn>
    </VCardActions>
  </VCard>
</template>
