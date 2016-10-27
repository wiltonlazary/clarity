import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {ClarityModule} from "../../clarity.module";
import {ROUTING} from "./signposts.demo.routing";
import {SignpostDemo} from "./signposts.demo";
import {SignpostSizesDemo} from "./signposts-sizes";
import {SignpostDirectionsDemo} from "./signposts-directions";

@NgModule({
    imports: [
        CommonModule,
        ClarityModule,
        ROUTING
    ],
    declarations: [
        SignpostDemo,
        SignpostSizesDemo,
        SignpostDirectionsDemo
    ],
    exports: [
        SignpostDemo,
        SignpostSizesDemo,
        SignpostDirectionsDemo
    ]
})
export default class SignpostDemoModule {
}