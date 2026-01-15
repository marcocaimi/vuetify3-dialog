import Notifier from 'Notifier';
import PluginContext from 'PluginContext';
import SnackbarContext from 'SnackbarContext';
import { CreateNotifyOptions } from 'types';
import { createVNode, render } from 'vue';
import { VSnackbar } from 'vuetify/components';
import SnackbarQueue from './components/SnackbarQueue.vue';

// Shared container for all snackbars
let snackbarContainer: HTMLDivElement | null = null;
let queueComponentInitialized = false;

function getOrCreateSnackbarContainer(): HTMLDivElement {
  if (!snackbarContainer) {
    snackbarContainer = document.createElement('div');
    snackbarContainer.id = 'vuetify3-dialog-snackbar-container';
    snackbarContainer.style.position = 'fixed';
    snackbarContainer.style.zIndex = '9999';
    document.body.appendChild(snackbarContainer);

    // Initialize the SnackbarQueue component
    initializeQueueComponent();
  }
  return snackbarContainer;
}

function initializeQueueComponent(): void {
  if (!queueComponentInitialized && snackbarContainer) {
    const queueVNode = createVNode(SnackbarQueue);
    queueVNode.appContext = PluginContext.getPluginOptions().app?._context as any;
    render(queueVNode, snackbarContainer);
    queueComponentInitialized = true;
  }
}

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
  return createNotification({ text, level: 'warning', notifyOptions });
}

export function notifyError(text: string, notifyOptions?: VSnackbar['$props']) {
  return createNotification({ text, level: 'error', notifyOptions });
}

export function notifyInfo(text: string, notifyOptions?: VSnackbar['$props']) {
  return createNotification({ text, level: 'info', notifyOptions });
}

export function notifySuccess(text: string, notifyOptions?: VSnackbar['$props']) {
  return createNotification({ text, level: 'success', notifyOptions });
}

export function createNotification(options: CreateNotifyOptions) {
  try {
    if (!isNotEmptyAndNotNull(options.text)) throw new Error('text is required');

    // Ensure container and queue component are initialized
    getOrCreateSnackbarContainer();

    const defaultLocation = PluginContext.getPluginOptions().app?.config.globalProperties.$notify.location;
    const location = options.location || options.notifyOptions?.location || defaultLocation || 'top right';

    return new Promise((resolve) => {
      // Push to SnackbarContext queue
      SnackbarContext.push({
        text: options.text,
        level: options.level || 'info',
        location,
        timeout: options.notifyOptions?.timeout || options.timeout || 3000,
        ...options.notifyOptions,
      });

      // Resolve after a short delay to match previous behavior
      setTimeout(() => resolve(true), 100);
    });
  } catch (err: any) {
    console.error(`[Vuetify3Dialog] ${err.message} [${err.stack}]`);
  }
}

function isNotEmptyAndNotNull(value: string): boolean {
  return value !== undefined && value !== null && value.trim().length > 0 && value !== '';
}
