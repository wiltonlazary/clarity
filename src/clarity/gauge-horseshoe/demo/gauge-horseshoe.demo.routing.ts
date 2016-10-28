import {ModuleWithProviders} from "@angular/core/src/metadata/ng_module";
import {Routes, RouterModule} from "@angular/router";
import {HorseshoeGaugesDemo} from "./gauge-horseshoe.demo";
import {HorseshoeGaugeAngularDemo} from "./angular/gauge-horseshoe-angular";

const ROUTES: Routes = [
    {
        path: "",
        component: HorseshoeGaugesDemo,
        children: [
            { path: "",  redirectTo: "angular", pathMatch: "full" },
            { path: "angular", component: HorseshoeGaugeAngularDemo }
        ]
    }
];

export const ROUTING: ModuleWithProviders = RouterModule.forChild(ROUTES);
