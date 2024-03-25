<script setup lang="ts">
import { ComponentOptions } from 'types';
import { Component, PropType, ref } from 'vue';
import { VDialog } from 'vuetify/lib/components/index.mjs';
import Card from './Card.vue';

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
  dialogOptions: {
    type: Object,
    default: () => ({}),
  },
  customComponent: {
    type: Object as PropType<ComponentOptions>,
    required: false,
  },
  wrapComponent: {
    type: Boolean,
    default: false,
  },
});

// ------- EVENTS -------
const emit = defineEmits(['closeDialog']);

// ------- DATA -------
let showDialog = ref(true);

// ------- METHODS -------
function close(buttonKey: string | boolean) {
  showDialog.value = false;
  emit('closeDialog', buttonKey);
}
</script>

<template>
  <VDialog class="vuetify3-dialog-popup" v-model="showDialog" v-bind="dialogOptions" close-on-back>
    <template v-if="customComponent && !wrapComponent">
      <component
        :is="customComponent.component"
        v-bind="customComponent.props"
        @closeDialog="close"
        ref="custom-component"
      />
    </template>
    <template v-else>
      <Card
        v-bind="cardOptions"
        :title="title"
        :text="text"
        :customComponent="customComponent"
        :buttons="buttons"
        :showDefaultButtons="showDefaultButtons"
        :icon="icon"
        :level="level"
        @buttonClicked="close"
      />
    </template>
  </VDialog>
</template>
