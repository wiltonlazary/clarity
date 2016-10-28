import {ComponentFixture, TestBed} from "@angular/core/testing";
import {Component, ViewChild} from "@angular/core";
import {ClarityModule} from "../clarity.module";
import {BarGauge} from "./gauge-bar";

@Component({
    template: `
        <clr-gauge-bar
            [clrBarGaugeValue]="35"
            [clrBarGaugeColorOne]="#CCC"
            [clrBarGaugeColorTwo]="#666"
            [clrBarGaugeAnimate]="true">
        </clr-gauge-bar>
   `
})
class TestComponent {
    @ViewChild(BarGauge) gaugeInstance: BarGauge;

    animate: boolean = true;
    value: number = 0;
    colorOne: string = "#5DB700";
    colorTwo: string = "#5DB700";
}

describe("BarGauge", () => {
    let fixture: ComponentFixture<any>;
    let compiled: any;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [ClarityModule],
            declarations: [TestComponent]
        });

        fixture = TestBed.createComponent(TestComponent);
        fixture.detectChanges();
        compiled = fixture.nativeElement;
    });

    afterEach(() => {
        fixture.destroy();
    });
});
