import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {ClarityModule} from "../../clarity.module";
import {FormsModule} from "@angular/forms";
import {ROUTING} from "./input-fields.demo.routing";
import {InputFieldsDemo} from "./input-fields.demo";
import {MaskedInputFieldsDemo} from "./masked-input-fields";
import {InputFieldsStaticDemo} from "./input-fields-static";

@NgModule({
    imports: [
        CommonModule,
        ClarityModule,
        FormsModule,
        ROUTING
    ],
    declarations: [
        InputFieldsDemo,
        InputFieldsDemo,
        MaskedInputFieldsDemo,
        InputFieldsStaticDemo
    ],
    exports: [
        InputFieldsDemo,
        InputFieldsDemo,
        MaskedInputFieldsDemo,
        InputFieldsStaticDemo
    ]
})
export default class InputFieldsDemoModule {
}