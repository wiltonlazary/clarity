import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {ClarityModule} from "../../clarity.module";
import {FormsModule} from "@angular/forms";
import {ROUTING} from "./gauge-bar.demo.routing";
import {BarGaugesDemo} from "./gauge-bar.demo";
import {BarGaugeAngularDemo} from "./angular/gauge-bar-angular";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ClarityModule,
        ROUTING
    ],
    declarations: [
        BarGaugesDemo,
        BarGaugeAngularDemo
    ],
    exports: [
        BarGaugesDemo,
        BarGaugeAngularDemo
    ]
})
export default class BarGaugeDemoModule {
}
