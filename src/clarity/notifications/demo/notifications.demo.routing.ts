import {ModuleWithProviders} from "@angular/core/src/metadata/ng_module";
import {Routes, RouterModule} from "@angular/router";
import {NotificationsDemo} from "./notifications.demo";
import {BasicNotificationDemo} from "./basic-notification";

const ROUTES: Routes = [
    {
        path: "",
        component: NotificationsDemo,
        children: [
            { path: "", redirectTo: "basic-notification", pathMatch: "full" },
            { path: "basic-notification", component: BasicNotificationDemo }
        ]
    }
];

export const ROUTING: ModuleWithProviders = RouterModule.forChild(ROUTES);
