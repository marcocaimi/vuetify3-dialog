import Notifier from 'Notifier';
import PluginContext from 'PluginContext';
import { CreateNotifyOptions } from 'types';
import { createApp, createVNode, render } from 'vue';
import { VSnackbar } from 'vuetify/components';
import Snackbar from './components/Snackbar.vue';

export default class SnackBar extends Notifier {
  initContext(): void {
    this._app.config.globalProperties.$notify = {
      create: createNotification,
      warn: notifyWarning,
      error: notifyError,
      info: notifyInfo,
      success: notifySuccess,
    };
  }
}

export function notifyWarning(text: string, notifyOptions?: VSnackbar['$props']) {
  return createNotification({ text, level: 'warning', ...notifyOptions });
}

export function notifyError(text: string, notifyOptions?: VSnackbar['$props']) {
  return createNotification({ text, level: 'error', notifyOptions });
}

export function notifyInfo(text: string, notifyOptions?: VSnackbar['$props']) {
  return createNotification({ text, level: 'info', ...notifyOptions });
}

export function notifySuccess(text: string, notifyOptions?: VSnackbar['$props']) {
  return createNotification({ text, level: 'success', notifyOptions });
}

export function createNotification(options: CreateNotifyOptions) {
  try {
    const defaultLocation = PluginContext.getPluginOptions().app?.config.globalProperties.$notify.location;
    const potentialLocation = options.location || options.notifyOptions?.location || defaultLocation || 'top right';
    let location = potentialLocation.split(' ')[0] || 'top';
    let div = document.createElement('div');

    if (!isNotEmptyAndNotNull(options.text)) throw new Error('text is required');

    return new Promise((resolve, reject) => {
      // const _app = createApp(Snackbar, {
      //   text: options.text,
      //   level: options.level,
      //   location: potentialLocation,
      //   notifyOptions: options.notifyOptions || PluginContext.getPluginOptions().defaults?.notify || undefined,
      //   onCloseSnackbar: () => {
      //     resolve(true);
      //     setTimeout(() => {
      //       _app.unmount();
      //       document.body.removeChild(div);
      //     }, 500);
      //   },
      // });

      // _app.use(PluginContext.getVuetify());
      // _app.use(PluginContext.getI18n());
      // _app.use(PluginContext.getRouter());

      // document.body.appendChild(div);
      // _app.mount(div);

      const dialogComponentInstance = createVNode(Snackbar, {
        text: options.text,
        level: options.level,
        location: potentialLocation,
        notifyOptions: options.notifyOptions || PluginContext.getPluginOptions().defaults?.notify || undefined,
        onCloseSnackbar: () => {
          resolve(true);
        },
      });
      dialogComponentInstance.appContext = PluginContext.getPluginOptions().app?._context as any;
      render(dialogComponentInstance, div);

      const vuetifyDivOverlay = document.querySelector('.v-overlay-container');

      let margin = 0;

      if ((vuetifyDivOverlay as HTMLElement)?.childElementCount > 1) {
        for (let child of (vuetifyDivOverlay as HTMLElement).children) {
          if (child === (vuetifyDivOverlay as HTMLElement).lastElementChild) continue;
          // console.log('child', child);
          if ((child as HTMLElement).lastElementChild) {
            // console.log('child of child', (child as HTMLElement).lastElementChild);
            margin += ((child as HTMLElement).lastElementChild as HTMLElement).offsetHeight + 12;
          }
        }
      }

      if (margin > 0) {
        switch (location) {
          case 'top':
            (vuetifyDivOverlay?.lastElementChild as HTMLElement).style.marginTop = `${margin + 12}px`;
            break;
          case 'bottom':
            (vuetifyDivOverlay?.lastElementChild as HTMLElement).style.marginBottom = `${margin + 12}px`;
            break;
          default:
            throw new Error('location must be top or bottom');
        }
      }
    });
  } catch (err: any) {
    console.error(`[Vuetify3Dialog] ${err.message} [${err.stack}]`);
  }
}

function isNotEmptyAndNotNull(value: string): boolean {
  return value !== undefined && value !== null && value.trim().length > 0 && value !== '';
}
