import {ModuleWithProviders} from "@angular/core/src/metadata/ng_module";
import {Routes, RouterModule} from "@angular/router";
import {SignpostDemo} from "./signposts.demo";
import {SignpostSizesDemo} from "./signposts-sizes";
import {SignpostDirectionsDemo} from "./signposts-directions";

const routes: Routes = [
    {
        path: "",
        component: SignpostDemo,
        children: [
            { path: "", redirectTo: "sizes", pathMatch: "full" },
            { path: "sizes", component: SignpostSizesDemo },
            { path: "directions", component: SignpostDirectionsDemo }
        ]
    }
];

export const ROUTING: ModuleWithProviders = RouterModule.forChild(routes);