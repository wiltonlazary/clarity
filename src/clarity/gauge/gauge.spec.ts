import {ComponentFixture, TestBed} from "@angular/core/testing";
import {Component, ViewChild} from "@angular/core";
import {ClarityModule} from "../clarity.module";
import {Gauge} from "./gauge";

@Component({
    template: `
        <clr-gauge
            [clrGaugeValue]="35"
            [clrGaugeColorOne]="#CCC"
            [clrGaugeColorTwo]="#666"
            [clrGaugeAnimate]="true">
        </clr-gauge>
   `
})
class TestComponent {
    @ViewChild(Gauge) gaugeInstance: Gauge;

    animate: boolean = true;
    value: number = 0;
    colorOne: string = "#5DB700";
    colorTwo: string = "#5DB700";
}

describe("Gauge", () => {
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
