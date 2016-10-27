import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {ClarityModule} from "../../clarity.module";
import {ROUTING} from "./notifications.demo.routing";

import {NotificationsDemo} from "./notifications.demo";
import {BasicNotificationDemo} from "./basic-notification";

@NgModule({
    imports: [
        CommonModule,
        ClarityModule,
        ROUTING
    ],
    declarations: [
        NotificationsDemo,
        BasicNotificationDemo
    ],
    exports: [
        NotificationsDemo,
        BasicNotificationDemo
    ]
})
export default class NotificationsDemoModule {
}
