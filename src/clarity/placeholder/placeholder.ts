import {
    Component,
    Input,
    OnInit
} from "@angular/core";

@Component({
    selector: "clr-placeholder",
    templateUrl: "./placeholder.html",
})
export class Placeholder implements OnInit {
    @Input("clrType") type: String;
    placeholderType: String;

    constructor() {
        this.placeholderType = "paragraph";
    }

    ngOnInit() {
        this.placeholderType = this.type;
    }
}
