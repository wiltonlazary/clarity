import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {ClarityModule} from "../../clarity.module";
import {FormsModule} from "@angular/forms";
import {ROUTING} from "./gauge.demo.routing";
import {GaugesDemo} from "./gauge.demo";
import {GaugeAngularDemo} from "./angular/gauge-angular";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ClarityModule,
        ROUTING
    ],
    declarations: [
        GaugesDemo,
        GaugeAngularDemo
    ],
    exports: [
        GaugesDemo,
        GaugeAngularDemo
    ]
})
export default class GaugeDemoModule {
}
