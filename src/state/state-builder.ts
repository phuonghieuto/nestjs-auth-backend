import { State } from './state';
import { StatusNotification } from './status-notification';

export class StateBuilder<T, V> {
  private status: StatusNotification;
  private value: T;
  private error: V;

  public forError(error: V): State<T, V> {
    this.error = error;
    this.status = StatusNotification.ERROR;
    return new State<T, V>(this.status, this.value, this.error);
  }

  public forSuccess(): State<T, V>;
  public forSuccess(value: T): State<T, V>;
  public forSuccess(value?: T): State<T, V> {
    this.value = value;
    this.status = StatusNotification.OK;
    return new State<T, V>(this.status, this.value, this.error);
  }

  public forUnauthorized(error: V): State<T, V> {
    this.error = error;
    this.status = StatusNotification.UNAUTHORIZED;
    return new State<T, V>(this.status, this.value, this.error);
  }
}