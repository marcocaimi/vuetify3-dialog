import { PluginOptions } from 'types';
import { App } from 'vue';

export default class PluginContext {
  private static pluginOptions: PluginOptions;

  constructor(app: App, _pluginOptions: PluginOptions) {
    if (!app) throw new Error('Error during initialization : app is required');
    if (!_pluginOptions) throw new Error('Error during initialization : plugin options is required');
    if (!_pluginOptions.vuetify)
      throw new Error(
        'Error during initialization : vuetify is required. Please declare it with Vue.use(Dialogs, { vuetify })',
      );
    _pluginOptions.app = app;
    PluginContext.pluginOptions = _pluginOptions;
  }

  static getPluginOptions(): PluginOptions {
    return PluginContext.pluginOptions;
  }

  static getVuetify(): PluginOptions['vuetify'] {
    return PluginContext.pluginOptions.vuetify;
  }

  static getI18n(): PluginOptions['i18n'] {
    return PluginContext.pluginOptions.i18n || {};
  }

  static getRouter(): PluginOptions['router'] {
    return PluginContext.pluginOptions.router || {};
  }
}
