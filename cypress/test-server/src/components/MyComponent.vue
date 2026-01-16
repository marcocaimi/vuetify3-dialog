<template>
  <h1 @click="close()">{{ message }}</h1>
  <v-btn id="create-notification" @click="createNotification">Create notification</v-btn>
  <v-btn id="error-notification" @click="errorNotification" color="error">Error notification</v-btn>
</template>

<script>
import { defineEmits } from 'vue';
import { createNotification, notifyError } from 'vuetify3-dialog';

export default {
  name: 'MyComponent',
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
    createNotification() {
      createNotification({
        text: 'Hello world!',
        notifyOptions: {
          timeout: 5000,
          location: 'top right',
        },
      });
    },
    errorNotification() {
      notifyError('Hello error!\nLorem ipsum dolor sit amet, consectetur!', {
        timeout: 3000,
        location: 'bottom right',
      });
    },
  },
};
</script>

<style></style>
