/**
 * main.ts
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Components
import App from './App.vue';

// Composables
import { createApp } from 'vue';

// Plugins
import { registerPlugins } from '@/plugins';

// Import vuetify3-dialog styles
import 'vuetify3-dialog/style.css';

const app = createApp(App);

registerPlugins(app);

app.mount('#app');
