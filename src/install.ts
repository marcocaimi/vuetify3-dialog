import BottomSheets from 'BottomSheet';
import Dialogs from 'Dialog';
import SnackBar from 'Snackbar';
import { App, Plugin } from 'vue';
import PluginContext from './PluginContext';
import { PluginOptions } from './types';

export const Vuetify3Dialog: Plugin = {
  install(app: App, options: PluginOptions) {
    try {
      new PluginContext(app, options);
      new Dialogs(app).initContext();
      new SnackBar(app).initContext();
      new BottomSheets(app).initContext();
    } catch (err: any) {
      console.error(`[Vuetify3Dialog] ${err.message} [${err.stack}]`);
    }
  },
};
