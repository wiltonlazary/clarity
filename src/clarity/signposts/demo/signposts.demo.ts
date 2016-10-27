import {Component} from "@angular/core";

@Component({
    selector: "clr-signposts-demo",
    // Note the .css extension here, not .scss. That"s the best we can have at the moment.
    styleUrls: ["./signposts.demo.css"],
    template: `
        <h2>Signposts</h2>

        <ul>
            <li><a [routerLink]="['./sizes']">Sizes</a></li>
            <li><a [routerLink]="['./directions']">Directions</a></li>
        </ul>
        <router-outlet></router-outlet>
    `
})
export class SignpostDemo {
}
