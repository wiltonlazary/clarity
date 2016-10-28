import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {ClarityModule} from "../../clarity.module";
import {FormsModule} from "@angular/forms";
import {ROUTING} from "./gauge-horseshoe.demo.routing";
import {HorseshoeGaugesDemo} from "./gauge-horseshoe.demo";
import {HorseshoeGaugeAngularDemo} from "./angular/gauge-horseshoe-angular";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ClarityModule,
        ROUTING
    ],
    declarations: [
        HorseshoeGaugesDemo,
        HorseshoeGaugeAngularDemo
    ],
    exports: [
        HorseshoeGaugesDemo,
        HorseshoeGaugeAngularDemo
    ]
})
export default class HorseshoeGaugeDemoModule {
}
