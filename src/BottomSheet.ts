import Notifier from 'Notifier';
import PluginContext from 'PluginContext';
import { CreateBottomSheetOptions } from 'types';
import { createVNode, render } from 'vue';
import { VListItem } from 'vuetify/components';
import BottomSheet from './components/BottomSheet.vue';

export default class BottomSheets extends Notifier {
  initContext(): void {
    this._app.config.globalProperties.$bottomSheet = {
      create: createBottomSheet,
      createList: createBottomSheetList,
    };
  }
}

export function createBottomSheetList(items: VListItem['$props'][], options?: CreateBottomSheetOptions) {
  items.forEach((item) => {
    if (!isNotEmptyAndNotNull(item.title as any)) throw new Error('title is required for each item');
    if (!isNotEmptyAndNotNull(item.value)) throw new Error('value is required for each item');
  });

  return createBottomSheet({
    items,
    ...options,
  });
}

export function createBottomSheet(options: CreateBottomSheetOptions) {
  try {
    if (options.items) {
      throw new Error('You can not use items and dialogOptions together');
    }

    const div = document.createElement('div');
    return new Promise((resolve) => {
      const dialogComponentInstance = createVNode(BottomSheet, {
        bottomSheetOptions:
          options?.bottomSheetOptions || PluginContext.getPluginOptions().defaults?.bottomSheet || undefined,
        items: options?.items,
        title: options?.title,
        text: options?.text,
        customComponent: options.customComponent,
        onCloseBottomSheet: (value: string | boolean) => {
          resolve(value);
        },
      });
      dialogComponentInstance.appContext = PluginContext.getPluginOptions().app?._context as any;
      render(dialogComponentInstance, div);
    });
  } catch (err: any) {
    console.error(`[Vuetify3Dialog] ${err.message} [${err.stack}]`);
  }
}

function isNotEmptyAndNotNull(value: string | boolean): boolean {
  if (value === undefined || value === null) return false;
  return typeof value === 'boolean' ? true : value.trim().length > 0 && value !== '';
}
