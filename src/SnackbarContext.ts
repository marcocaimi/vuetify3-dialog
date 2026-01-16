import type { SnackbarOptions } from 'types';
import type { VSnackbar } from 'vuetify/components';
import { reactive } from 'vue';

type VSnackbarProps = VSnackbar['$props'];

export interface Snackbar extends VSnackbarProps {
  id: number;
  level?: 'warning' | 'error' | 'info' | 'success';
}

const DEFAULT_TIMEOUT = 3000;
const MAX_STACK = 5;

export default class SnackbarContext {
  private static snackbarOptions: SnackbarOptions;
  public static snackbars: Snackbar[] = reactive([]);
  private static queue: Snackbar[] = [];

  constructor(_snackbarOptions: SnackbarOptions) {
    SnackbarContext.snackbarOptions = _snackbarOptions;
  }

  static getSnackbarOptions(): SnackbarOptions {
    return SnackbarContext.snackbarOptions;
  }

  static getMaxVisible(): number {
    return SnackbarContext.snackbarOptions?.maxStack || MAX_STACK;
  }
  static getDefaultTimeout(): number {
    return SnackbarContext.snackbarOptions?.defaultTimeout || DEFAULT_TIMEOUT;
  }

  static push(payload: Omit<Snackbar, 'id'>) {
    const snackbar: Snackbar = {
      id: Date.now() + Math.random(),
      ...payload,
    };

    this.queue.push(snackbar);
    this.processQueue();
  }

  static processQueue() {
    while (this.snackbars.length < this.getMaxVisible() && this.queue.length > 0) {
      const next = this.queue.shift()!;
      this.snackbars.push(next);

      setTimeout(
        () => {
          this.remove(next.id);
        },
        Number(next.timeout) || DEFAULT_TIMEOUT,
      );
    }
  }

  static remove(id: number) {
    const index = this.snackbars.findIndex((s) => s.id === id);
    if (index !== -1) {
      this.snackbars.splice(index, 1);
    }
    this.processQueue();
  }
}
