<template>
  <h1 @click="close()">{{ message }}</h1>
  <div class="card">
    <h3 class="primary-text">Notifications</h3>
    <div class="mt-5">
      <v-btn id="create-notification" @click="createNotification()">Create notification</v-btn>
      <v-btn id="error-notification" @click="errorNotification()" color="error">Error notification</v-btn>
    </div>
  </div>
</template>

<script>
import { defineEmits } from 'vue';
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
      this.$notify.create({
        text: 'Hello world!',
        notifyOptions: {
          timeout: 300000,
          location: 'top right',
        },
      });
    },
    errorNotification() {
      this.$notify.error('Hello error!\nLorem ipsum dolor sit amet, consectetur!', {
        timeout: 300000,
        location: 'bottom right',
      });
    },
  },
};
</script>

<style></style>
