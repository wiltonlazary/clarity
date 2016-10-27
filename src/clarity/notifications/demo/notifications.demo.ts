import {Component} from "@angular/core";

@Component({
    selector: "clr-notifications-demo",
    // Note the .css extension here, not .scss. That's the best we can have at the moment.
    styleUrls: ["./notifications.demo.css"],
    template: `
        <h2>Notifications</h2>
        <ul>
            <li><a [routerLink]="['./basic-notification']">Basic Notification</a></li>
        </ul>
        <router-outlet></router-outlet>
    `
})

export class NotificationsDemo {
}
