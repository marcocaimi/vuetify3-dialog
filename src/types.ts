import { App, Component, Plugin } from 'vue';
import { VBottomSheet } from 'vuetify/lib/components/VBottomSheet/index.mjs';
import { VBtn } from 'vuetify/lib/components/VBtn/index.mjs';
import { VCard } from 'vuetify/lib/components/VCard/index.mjs';
import { VDialog } from 'vuetify/lib/components/VDialog/index.mjs';
import { VListItem } from 'vuetify/lib/components/VList/index.mjs';
import { VSnackbar } from 'vuetify/lib/components/VSnackbar/index.mjs';

export type PluginOptions = {
  app: App;
  vuetify: Plugin;
  i18n: Plugin;
  router: Plugin;
  defaults?: {
    dialog?: {
      component?: VDialog['$props'];
      card?: VCard['$props'];
      confirm?: ConfirmDialogOptions;
    };
    notify?: VSnackbar['$props'];
    bottomSheet?: VBottomSheet['$props'];
  };
};

export type Level = 'warning' | 'error' | 'info' | 'success';

export type DialogButton = Omit<Omit<VBtn['$props'], 'text'>, 'key'> & { title: string; key: string | boolean };

export type ComponentOptions = {
  component: Component;
  props: any;
};

export type BasicDialogOptions = {
  text: string;
  title?: string;
  cardOptions?: VCard['$props'];
  buttonOptions?: DialogButton;
};

export type ConfirmDialogOptions = {
  title: string;
  text: string;
  level?: Level;
  cancelText?: string;
  confirmationText?: string;
  cardOptions?: VCard['$props'];
  cancelButtonOptions?: DialogButton;
  confirmationButtonOptions?: DialogButton;
};

export type CreateDialogOptions = {
  title: string;
  text: string;
  showDefaultButtons?: boolean;
  buttons?: DialogButton[];
  level?: Level;
  customComponent?: ComponentOptions;
  wrapComponent?: boolean;
  dialogOptions?: VDialog['$props'];
  cardOptions?: VCard['$props'];
};

export type CreateNotifyOptions = {
  text: string;
  level?: string;
  location?: string;
  notifyOptions?: VSnackbar['$props'];
};

export type CreateBottomSheetOptions = {
  title?: string;
  text?: string;
  items?: VListItem['$props'][];
  customComponent?: ComponentOptions;
  bottomSheetOptions?: VBottomSheet['$props'];
};
