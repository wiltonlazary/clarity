/**
 * Copyright(c) VMware Inc., 2016
 */

import { TestBed, async } from "@angular/core/testing";
import { HorseshoeGauge } from "./gauge-horseshoe";
import { Component } from "@angular/core";
import { ClarityModule } from "../clarity.module";

@Component({
    template: `
        <clr-gauge-horseshoe [clrHsGaugeValueOne]="25" [clrHsGaugeValueTwo]="55"></clr-gauge-horseshoe>
   `
})
class TestComponent {
}

describe("Horseshoe Gauge", () => {

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [ClarityModule],
            declarations: [
                HorseshoeGauge,
                TestComponent
            ]
        });

        return TestBed.compileComponents().then(() => {
            this.fixture = TestBed.createComponent(TestComponent);
            this.fixture.detectChanges();
        });
    }));

    it("Should create an instance of the component and check redirection",
        async(() => {
            let svgElement = this.fixture.nativeElement.querySelector("svg");
            expect(svgElement).toBeTruthy();
            expect(svgElement.style["transform"]).toMatch(/rotate\(/);

            let circleOne = svgElement.querySelector("circle.one");
            let circleTwo = svgElement.querySelector("circle.one");

            expect(circleOne.style["stroke-dasharray"]).toBeTruthy();
            expect(circleTwo.style["stroke-dasharray"]).toBeTruthy();
        })
    );
});
