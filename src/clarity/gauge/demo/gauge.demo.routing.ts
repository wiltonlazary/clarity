import {ModuleWithProviders} from "@angular/core/src/metadata/ng_module";
import {Routes, RouterModule} from "@angular/router";
import {GaugesDemo} from "./gauge.demo";
import {GaugeAngularDemo} from "./angular/gauge-angular";

const ROUTES: Routes = [
    {
        path: "",
        component: GaugesDemo,
        children: [
            { path: "",  redirectTo: "angular", pathMatch: "full" },
            { path: "angular", component: GaugeAngularDemo }
        ]
    }
];

export const ROUTING: ModuleWithProviders = RouterModule.forChild(ROUTES);
