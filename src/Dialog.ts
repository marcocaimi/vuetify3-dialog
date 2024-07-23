import Notifier from 'Notifier';
import PluginContext from 'PluginContext';
import Dialog from './components/Dialog.vue';
import { BasicDialogOptions, ConfirmDialogOptions, CreateDialogOptions } from 'types';
import { App, createApp, createVNode, getCurrentInstance, h, render, VNode } from 'vue';

const dialogs: DialogInstance[] = [];
export default class Dialogs extends Notifier {
  initContext(): void {
    this._app.config.globalProperties.$dialog = {
      create: createDialog,
      confirm: confirmDialog,
      warn: warnDialog,
      error: errorDialog,
      info: infoDialog,
      success: successDialog,
      hasDialogs: () => dialogs.length > 0,
      closeAll: () => {
        dialogs.forEach((dialog) => {
          dialog.close();
        });
        dialogs.splice(0, dialogs.length);
      },
    };
    this._app.provide('$dialog', this._app.config.globalProperties.$dialog);
  }
}
class DialogInstance {
  private _element: HTMLElement;
  private _app: VNode;
  constructor(element: HTMLElement, app: VNode) {
    this._element = element;
    this._app = app;
  }
  public close() {
    // this._app.unmount();
    render(null, this._element);
    document.body.removeChild(this._element);
  }
}

export function createDialog(options: CreateDialogOptions) {
  try {
    const div = document.createElement('div');
    document.body.appendChild(div);

    if (!options.customComponent) {
      if (!isNotEmptyAndNotNull(options.title)) throw new Error('title is required');
      if (!isNotEmptyAndNotNull(options.text)) throw new Error('text is required');
    } else {
      options.title = options.title || '';
      options.text = options.text || '';
    }

    if (options.buttons) {
      options.buttons.forEach(validateButton);
    }

    return new Promise((resolve, reject) => {
      //   const _app = createApp(Dialog, {
      //     title: options.title,
      //     text: options.text,
      //     buttons: options.buttons,
      //     level: options.level,
      //     showDefaultButtons: options.showDefaultButtons,
      //     customComponent: options.customComponent,
      //     wrapComponent: options.wrapComponent || false,
      //     dialogOptions: options.dialogOptions || {
      //       minWidth: '600px',
      //     },
      //     cardOptions: options.cardOptions || PluginContext.getPluginOptions().defaults?.dialog?.card || undefined,
      //     onCloseDialog: (value: string | boolean | object) => {
      //       resolve(value);
      //       setTimeout(() => {
      //         dialog.close();
      //       }, 500);
      //     },
      //   });

      //   _app.use(PluginContext.getVuetify());
      //   _app.use(PluginContext.getI18n());
      //   _app.use(PluginContext.getRouter());

      const dialogComponentInstance = createVNode(Dialog, {
        title: options.title,
        text: options.text,
        buttons: options.buttons,
        level: options.level,
        showDefaultButtons: options.showDefaultButtons,
        customComponent: options.customComponent,
        wrapComponent: options.wrapComponent || false,
        dialogOptions: options.dialogOptions || {
          minWidth: '600px',
        },
        cardOptions: options.cardOptions || PluginContext.getPluginOptions().defaults?.dialog?.card || undefined,
        onCloseDialog: (value: string | boolean | object) => {
          resolve(value);
          setTimeout(() => {
            dialog.close();
          }, 500);
        },
      });
      dialogComponentInstance.appContext = PluginContext.getPluginOptions().app._instance?.appContext as any;
      render(dialogComponentInstance, div);

      // let app = _app.mount(div);
      const dialog = new DialogInstance(div, dialogComponentInstance);
      dialogs.push(dialog);
    });
  } catch (err: any) {
    console.error(`[Vuetify3Dialog] ${err.message} [${err.stack}]`);
  }
}

export function warnDialog(options: BasicDialogOptions) {
  return createDialog({
    title: options.title || 'Warning',
    text: options.text,
    buttons: [{ key: 'ok', title: 'OK', color: 'warning', ...options.buttonOptions }],
    level: 'warning',
    cardOptions: options.cardOptions,
  });
}

export function errorDialog(options: BasicDialogOptions) {
  return createDialog({
    title: options.title || 'Error',
    text: options.text,
    buttons: [{ key: 'ok', title: 'OK', color: 'error', ...options.buttonOptions }],
    level: 'error',
    cardOptions: options.cardOptions,
  });
}

export function infoDialog(options: BasicDialogOptions) {
  return createDialog({
    title: options.title || 'Info',
    text: options.text,
    buttons: [{ key: 'ok', title: 'OK', color: 'info', ...options.buttonOptions }],
    level: 'info',
    cardOptions: options.cardOptions,
  });
}

export function successDialog(options: BasicDialogOptions) {
  return createDialog({
    title: options.title || 'Success',
    text: options.text,
    buttons: [{ key: 'ok', title: 'OK', color: 'success', ...options.buttonOptions }],
    level: 'success',
    cardOptions: options.cardOptions,
  });
}

export function confirmDialog(options: ConfirmDialogOptions) {
  let cancelButtonOption = Object.assign(
    {
      key: false,
      title: options.cancelText || 'Cancel',
    },
    PluginContext.getPluginOptions().defaults?.dialog?.confirm?.cancelButtonOptions,
    options.cancelButtonOptions,
  );
  let confirmButtonOption = Object.assign(
    {
      key: true,
      title: options.confirmationText || 'Confirm',
    },
    PluginContext.getPluginOptions().defaults?.dialog?.confirm?.confirmationButtonOptions,
    options.confirmationButtonOptions,
  );
  return createDialog({
    title: options.title,
    text: options.text,
    buttons: [cancelButtonOption, confirmButtonOption],
    level: options.level,
    cardOptions: options.cardOptions,
  });
}

function validateButton(button: any, index: number) {
  if (!button) {
    throw new Error(`button at index ${index} is not defined`);
  }

  if (!isNotEmptyAndNotNull(button.key)) {
    throw new Error(`button at index ${index} has no key`);
  }

  if (!isNotEmptyAndNotNull(button.title)) {
    throw new Error(`button at index ${index} has no title`);
  }
}

function isNotEmptyAndNotNull(value: string | boolean): boolean {
  if (value === undefined || value === null) return false;
  return typeof value === 'boolean' ? true : value.trim().length > 0 && value !== '';
}
