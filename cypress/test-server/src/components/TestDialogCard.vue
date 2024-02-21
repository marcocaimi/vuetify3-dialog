<template>
  <v-card>
    <v-card-title> Custom components NOT WRAPPED </v-card-title>
    <v-card-text>
      <div>Write text here</div>
      <div class="text-h4">trop bien</div>
    </v-card-text>
    <v-card-actions class="justify-end">
      <v-btn outlined color="primary">Close</v-btn>
      <v-btn color="primary">Perfect :)</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { defineEmits } from 'vue';
export default {
  name: 'TestComponents',
  props: {
    message: {
      type: String,
      required: false,
    },
  },
  methods: {
    close() {
      this.$emit('closeDialog', false);
    },
  },
};
</script>

<style></style>
