import {
    Component,
    Input
} from "@angular/core";

@Component({
    selector: "clr-gauge-bar",
    templateUrl: "./gauge-bar.html"
})
export class BarGauge {
    @Input("clrBarGaugeColorOne") colorOne: string = "rgb(0, 106, 144)";
    @Input("clrBarGaugeColorTwo") colorTwo: string = "rgb(157, 197, 217)";
    @Input("clrBarGaugeBackgroundColor") backgroundColor: string = "rgb(224, 224, 224)";
    @Input("clrBarGaugeAnimate") animate: boolean = true;

    @Input("clrBarGaugeValueOne") valueOne: number = 0;

    _valueTwo: number = 0;

    @Input("clrBarGaugeValueTwo")
    set valueTwo(val: number) {
       this._valueTwo = val > this.valueOne ? val - this.valueOne : 0;
    }

    constructor() {/* empty constructor */}
}
