import {
    Component,
    Input,
    NgOnInit
} from "@angular/core";

@Component({
    selector: "clr-placeholder",
    templateUrl: "./placeholder.html",
})
export class Placeholder {
    @Input("clrType") type: String;
    placeholderType: String;

    constructor() {
        this.placeholderType = "paragraph";
    }

    ngOnInit() {
        this.placeholderType = this.type;
    }
}
