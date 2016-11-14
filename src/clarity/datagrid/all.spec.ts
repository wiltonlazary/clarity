/**
 * This file is just my OCD coding in my place.
 *
 * The goal is to have the tests properly grouped in the reporter, instead of having them all
 * over the place because we load them asynchronously.
 *
 * We could also check here that we do export publicly all the directives needed to use Stack View,
 * but I don't see a way to do it simply without it being completely irrelevant.
 */

import {addHelpers} from "./helpers.spec";

describe("Datagrid", function() {
    addHelpers();

    // describe("Providers", function() {
    //     SortProviderSpecs();
    //     FiltersProviderSpecs();
    //     PageProviderSpecs();
    //     ItemsProviderSpecs();
    //     SelectionProviderSpecs();
    // });
    // describe("Components", function() {
    //     DatagridCellSpecs();
    //     DatagridFilterSpecs();
    //     DatagridColumnSpecs();
    //     DatagridItemsSpecs();
    //     DatagridRowSpecs();
    //     DatagridPaginationSpecs();
    //     DatagridFooterSpecs();
    // });
    // describe("Built-in", function() {
    //     NestedPropertySpec();
    //     DatagridPropertyComparatorSpecs();
    //     DatagridPropertyStringFilterSpecs();
    //     DatagridStringFilterSpecs();
    // });
});