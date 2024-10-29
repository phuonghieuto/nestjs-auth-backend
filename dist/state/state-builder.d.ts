import { State } from './state';
export declare class StateBuilder<T, V> {
    private status;
    private value;
    private error;
    forError(error: V): State<T, V>;
    forSuccess(): State<T, V>;
    forSuccess(value: T): State<T, V>;
    forUnauthorized(error: V): State<T, V>;
}
