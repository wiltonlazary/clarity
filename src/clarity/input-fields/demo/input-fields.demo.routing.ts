import {ModuleWithProviders} from "@angular/core/src/metadata/ng_module";
import {Routes, RouterModule} from "@angular/router";
import {InputFieldsDemo} from "./input-fields.demo";
import {InputFieldsStaticDemo} from "./input-fields-static";
import {MaskedInputFieldsDemo} from "./masked-input-fields";

const ROUTES: Routes = [
    {
        path: "",
        component: InputFieldsDemo,
        children: [
            { path: "", redirectTo: "static", pathMatch: "full" },
            { path: "static", component: InputFieldsStaticDemo },
            { path: "masked-input", component: MaskedInputFieldsDemo }
        ]
    }
];

export const ROUTING: ModuleWithProviders = RouterModule.forChild(ROUTES);