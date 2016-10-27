import {
    Component,
    Input,
    trigger
} from "@angular/core";
import {fade} from "../animations/fade/index";

@Component({
    selector: "clr-input-helper",
    template:
        `<div class="input-helper" *ngIf="showInputHelper" @fade>
            <ng-content></ng-content>
        </div>`,
    styles: [
        ":host { position: relative; width: 100%;}"
    ],
    animations: [
        trigger("fade", fade())
    ]
})

export class InputHelper {

    @Input("clrShowInputHelper") showInputHelper: boolean = false;

}

