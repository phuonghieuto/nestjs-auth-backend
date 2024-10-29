import { StatusNotification } from './status-notification';
import { StateBuilder } from './state-builder';
export class State<T, V> {
  private value: T;
  private error: V;
  private status: StatusNotification;

  constructor(status: StatusNotification, value: T, error: V) {
    this.value = value;
    this.error = error;
    this.status = status;
  }

  public getValue(): T {
    return this.value;
  }

  public setValue(value: T): void {
    this.value = value;
  }

  public getError(): V {
    return this.error;
  }

  public setError(error: V): void {
    this.error = error;
  }

  public getStatus(): StatusNotification {
    return this.status;
  }

  public setStatus(status: StatusNotification): void {
    this.status = status;
  }

  public static builder<T, V>(): StateBuilder<T, V> {
    return new StateBuilder<T, V>();
  }
}