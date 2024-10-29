"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.State = void 0;
const state_builder_1 = require("./state-builder");
class State {
    constructor(status, value, error) {
        this.value = value;
        this.error = error;
        this.status = status;
    }
    getValue() {
        return this.value;
    }
    setValue(value) {
        this.value = value;
    }
    getError() {
        return this.error;
    }
    setError(error) {
        this.error = error;
    }
    getStatus() {
        return this.status;
    }
    setStatus(status) {
        this.status = status;
    }
    static builder() {
        return new state_builder_1.StateBuilder();
    }
}
exports.State = State;
//# sourceMappingURL=state.js.map