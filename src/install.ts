import BottomSheets from 'BottomSheet';
import Dialogs from 'Dialog';
import SnackBar from 'Snackbar';
import SnackbarQueued from 'SnackbarQueued';
import { App, Plugin } from 'vue';
import PluginContext from './PluginContext';
import { PluginOptions } from './types';
import SnackbarContext from 'SnackbarContext';

export const Vuetify3Dialog: Plugin = {
  install(app: App, options: PluginOptions) {
    try {
      new PluginContext(app, options);
      new Dialogs(app).initContext();
      new BottomSheets(app).initContext();
      if (options?.useSnackbarQueued) {
        new SnackbarContext(options?.snackbarOptions || {});
        new SnackbarQueued(app).initContext();
      } else {
        new SnackBar(app).initContext();
      }
    } catch (err: any) {
      console.error(`[Vuetify3Dialog] ${err.message} [${err.stack}]`);
    }
  },
};
