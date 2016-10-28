import {
    Component,
    Input
} from "@angular/core";

import {DomSanitizer, SafeStyle} from "@angular/platform-browser";

@Component({
    selector: "clr-gauge",
    templateUrl: "./gauge.html"
})
export class Gauge {
    @Input("clrGaugeColorOne") colorOne: string = "rgb(0, 106, 144)";
    @Input("clrGaugeColorTwo") colorTwo: string = "rgb(157, 197, 217)";
    @Input("clrGaugeBackgroundColor") backgroundColor: string = "#FFFFFF";
    @Input("clrGaugeAnimate") animate: boolean = true;
    _valueOne: SafeStyle = "rotate(0deg)";
    _valueTwo: SafeStyle = "rotate(0deg)";

    @Input("clrGaugeValueOne")
    set valueOne(newValue: number) {
        let val = (newValue / 100) * 180;
        this._valueOne = this.sanitizer.bypassSecurityTrustStyle("rotate(" + val + "deg)");
    }

    @Input("clrGaugeValueTwo")
    set valueTwo(newValue: number) {
        let val = (newValue / 100) * 180;
        this._valueTwo = this.sanitizer.bypassSecurityTrustStyle("rotate(" + val + "deg)");
    }

    constructor(private sanitizer: DomSanitizer) {}
}
