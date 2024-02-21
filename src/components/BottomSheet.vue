<script setup lang="ts">
import { ComponentOptions } from 'types';
import { computed, ref, watch, PropType } from 'vue';
import {
  VCard,
  VCardText,
  VCardTitle,
  VList,
  VListItem,
  VBottomSheet,
  VToolbar,
  VSpacer,
  VBtn,
} from 'vuetify/lib/components/index.mjs';

const props = defineProps({
  bottomSheetOptions: {
    type: Object,
    default: () => ({}),
  },
  items: {
    type: Array as () => any[],
    required: false,
  },
  title: {
    type: String,
    required: false,
  },
  text: {
    type: String,
    required: false,
  },
  customComponent: {
    type: Object as PropType<ComponentOptions>,
    required: false,
  },
});

// ------- EVENTS -------
const emit = defineEmits(['closeBottomSheet']);

// ------- DATA -------
let showBottomSheet = ref(true);

// ------- COMPUTED -------
const _items = computed(() => {
  if (props.items && props.items.length > 0) return props.items;
  else return [];
});

// ------- WATCH -------
watch(
  () => showBottomSheet,
  (val) => {
    if (!val) emit('closeBottomSheet');
  },
);

// ------- METHODS -------
function close(value: string | boolean) {
  showBottomSheet.value = false;
  emit('closeBottomSheet', value);
}
</script>

<template>
  <VBottomSheet class="vuetify3-dialog-bottom-sheet" v-bind="bottomSheetOptions" v-model="showBottomSheet">
    <VCard @buttonClicked="close(false)">
      <VToolbar color="primary" height="35">
        <VCardTitle>{{ title }}</VCardTitle>
        <VSpacer />
        <VBtn @click="close(false)" density="compact" color="white" icon="cancel"></VBtn>
      </VToolbar>
      <VCardText v-if="text"> {{ text }}</VCardText>
      <VList v-if="items">
        <VListItem v-for="item in _items" :title="item.title" :key="item.value" @click="close(item.value)" />
      </VList>
      <component
        v-else-if="customComponent"
        :is="customComponent.component"
        v-bind="customComponent.props"
        @close="close"
        ref="custom-component"
      />
    </VCard>
  </VBottomSheet>
</template>
