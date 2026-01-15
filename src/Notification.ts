import PluginContext from 'PluginContext';
import {
  createNotification as createNotificationClassic,
  notifyError as notifyErrorClassic,
  notifyInfo as notifyInfoClassic,
  notifySuccess as notifySuccessClassic,
  notifyWarning as notifyWarningClassic,
} from 'Snackbar';
import {
  createNotification as createNotificationQueued,
  notifyError as notifyErrorQueued,
  notifyInfo as notifyInfoQueued,
  notifySuccess as notifySuccessQueued,
  notifyWarning as notifyWarningQueued,
} from 'SnackbarQueued';
import { CreateNotifyOptions } from 'types';
import { VSnackbar } from 'vuetify/components';

export function createNotification(options: CreateNotifyOptions) {
  const useQueued = PluginContext.getPluginOptions().useSnackbarQueued;
  return useQueued ? createNotificationQueued(options) : createNotificationClassic(options);
}

export function notifyWarning(text: string, notifyOptions?: VSnackbar['$props']) {
  const useQueued = PluginContext.getPluginOptions().useSnackbarQueued;
  return useQueued ? notifyWarningQueued(text, notifyOptions) : notifyWarningClassic(text, notifyOptions);
}

export function notifyError(text: string, notifyOptions?: VSnackbar['$props']) {
  const useQueued = PluginContext.getPluginOptions().useSnackbarQueued;
  return useQueued ? notifyErrorQueued(text, notifyOptions) : notifyErrorClassic(text, notifyOptions);
}

export function notifyInfo(text: string, notifyOptions?: VSnackbar['$props']) {
  const useQueued = PluginContext.getPluginOptions().useSnackbarQueued;
  return useQueued ? notifyInfoQueued(text, notifyOptions) : notifyInfoClassic(text, notifyOptions);
}

export function notifySuccess(text: string, notifyOptions?: VSnackbar['$props']) {
  const useQueued = PluginContext.getPluginOptions().useSnackbarQueued;
  return useQueued ? notifySuccessQueued(text, notifyOptions) : notifySuccessClassic(text, notifyOptions);
}
