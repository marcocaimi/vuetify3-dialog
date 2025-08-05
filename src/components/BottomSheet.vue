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
  wrapComponent: {
    type: Boolean,
    default: false,
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
    <template v-if="customComponent && !wrapComponent">
      <v-btn
        class="close-dialog-btn position-absolute"
        style="z-index: 1; right: 6px; top: 6px"
        @click="close(false)"
        icon="$close"
        variant="flat"
      >
      </v-btn>
      <component
        :is="customComponent.component"
        v-bind="customComponent.props"
        @closeDialog="close"
        ref="custom-component"
      />
    </template>
    <VCard v-else @buttonClicked="close(false)">
      <VCardTitle class="d-flex align-center bg-primary justify-space-between">
        {{ title }}
        <v-spacer />
        <v-btn @click="close(false)" color="primary" variant="flat" icon="$close" density="compact"> </v-btn>
      </VCardTitle>
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
