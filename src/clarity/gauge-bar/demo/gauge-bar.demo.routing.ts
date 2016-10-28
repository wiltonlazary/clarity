import {ModuleWithProviders} from "@angular/core/src/metadata/ng_module";
import {Routes, RouterModule} from "@angular/router";
import {BarGaugesDemo} from "./gauge-bar.demo";
import {BarGaugeAngularDemo} from "./angular/gauge-bar-angular";

const ROUTES: Routes = [
    {
        path: "",
        component: BarGaugesDemo,
        children: [
            { path: "",  redirectTo: "angular", pathMatch: "full" },
            { path: "angular", component: BarGaugeAngularDemo }
        ]
    }
];

export const ROUTING: ModuleWithProviders = RouterModule.forChild(ROUTES);
