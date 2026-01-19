/**
 * plugins/index.ts
 *
 * Automatically included in `./src/main.ts`
 */

// Plugins
import router from '../router';
import vuetify from './vuetify';
import { loadFonts } from './webfontloader';

// Types
import type { App } from 'vue';
import { Vuetify3Dialog } from 'vuetify3-dialog';

export function registerPlugins(app: App) {
  loadFonts();
  app.use(vuetify).use(router);

  app.use(Vuetify3Dialog, {
    // app: app,
    vuetify: vuetify,
    // i18n: i18n,
    router: router,
    useSnackbarQueued: true,
    snackbarOptions: {
      maxStack: 4,
      defaultTimeout: 20000,
      icons: {
        warning: '$warning',
        info: '$info',
        success: '$success',
      },
    },
    defaults: {
      dialog: {
        class: 'pa-4 pt-10',
        cardOptions: {
          class: 'pa-4 pt-10',
        },
        confirm: {
          confirmationButtonOptions: {
            title: 'Conferma',
            color: 'primary',
            variant: 'flat',
          },
          cancelButtonOptions: {
            title: 'Annulla',
            color: 'primary',
            variant: 'outlined',
          },
        },
      },
      notify: {
        location: 'top right',
      },
    },
  });
}
