import { StatusNotification } from './status-notification';
import { StateBuilder } from './state-builder';
export declare class State<T, V> {
    private value;
    private error;
    private status;
    constructor(status: StatusNotification, value: T, error: V);
    getValue(): T;
    setValue(value: T): void;
    getError(): V;
    setError(error: V): void;
    getStatus(): StatusNotification;
    setStatus(status: StatusNotification): void;
    static builder<T, V>(): StateBuilder<T, V>;
}
