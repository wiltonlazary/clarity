import {Component} from '@angular/core';
import {Placeholder} from '../placeholder';
/**
 * Optional TITLE export to be used as navigation link to this demo.
 * Default is the path from clarity/ (excluded) to here, without /demo, capitalized.
 * For instance, if you were to write a demo in /src/clarity/navigation/links/demo,
 * the default title would be "Navigation Links".
 */
export const TITLE = "Placeholders";

@Component({
    selector: 'clr-placeholder-demo',
    directives: [Placeholder],
    templateUrl: "./placeholder.demo.html",
    styleUrls: ["./placeholder.demo.css"]
})
export class PlaceholderDemo {
    isLoaded: boolean;
    constructor() {
        this.isLoaded = false;
    }

    loadContent() {
        this.isLoaded = !this.isLoaded;
    }

}
