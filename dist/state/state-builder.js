"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StateBuilder = void 0;
const state_1 = require("./state");
const status_notification_1 = require("./status-notification");
class StateBuilder {
    forError(error) {
        this.error = error;
        this.status = status_notification_1.StatusNotification.ERROR;
        return new state_1.State(this.status, this.value, this.error);
    }
    forSuccess(value) {
        this.value = value;
        this.status = status_notification_1.StatusNotification.OK;
        return new state_1.State(this.status, this.value, this.error);
    }
    forUnauthorized(error) {
        this.error = error;
        this.status = status_notification_1.StatusNotification.UNAUTHORIZED;
        return new state_1.State(this.status, this.value, this.error);
    }
}
exports.StateBuilder = StateBuilder;
//# sourceMappingURL=state-builder.js.map