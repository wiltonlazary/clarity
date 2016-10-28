import {
    Component,
    Input,
    AfterViewInit,
    ElementRef
} from "@angular/core";

/**
 * Show a one-dimensional indicator as a partial circle ("horseshoe")
 *
 * hsGaugeValueTwo, when present should be greater than hsGaugeValueOne
 *
 * <clr-gauge-horseshoe [hsGaugeValueOne]="valueOne" [hsGaugeValueTwo]="valueTwo"/>
 */

@Component({
    selector: "clr-gauge-horseshoe",
    templateUrl: "gauge-horseshoe.html"
})
export class HorseshoeGauge implements AfterViewInit {
    static wedgePercentage = 33;

    _bgValue: number = HorseshoeGauge.scaledPercentage(100);

    private _valueOne: string = "0 100";
    @Input("clrHsGaugeValueOne")
    set valueOne(newValue: number) {
        this._valueOne = HorseshoeGauge.scaledPercentage(newValue) + " 100";
    }

    private _valueTwo: string = "0 100";
    @Input("clrHsGaugeValueTwo")
    set valueTwo(newValue: number) {
        this._valueTwo = HorseshoeGauge.scaledPercentage(newValue) + " 100";
    }

    @Input("clrHsGaugeColorOne") colorOne: string;
    @Input("clrHsGaugeColorTwo") colorTwo: string;
    @Input("clrHsGaugeBackgroundColor") backgroundColor: string;
    @Input("clrHsGaugeAnimate") animate: boolean = true;

    constructor(private myElement: ElementRef) { }

    svgTransform () {
        let turn = 0.25 + (HorseshoeGauge.wedgePercentage / 2) / 100;
        return `rotate(${turn}turn)`;
    };

    ngAfterViewInit () {
        // Trigger animation by removing .animation-start class after first render
        // Possibly this can be made better using the angular animation API...?
        setTimeout(() => {
            this.myElement.nativeElement
               .querySelector(".animation-start")
               .classList.remove("animation-start");
        });
    };

    private static scaledPercentage = (percentage: number): number => {
        let scaleFactor = ((100 - HorseshoeGauge.wedgePercentage) / 100.0);
        return scaleFactor * percentage;
    };
}
