import {Component} from "@angular/core";

@Component({
    selector: "clr-gauge-horseshoe-demo-angular",
    // Note the .css extension here, not .scss. That"s the best we can have at the moment.
    styleUrls: ["../gauge-horseshoe.demo.css"],
    templateUrl: "./gauge-horseshoe-angular.demo.html"
})
export class HorseshoeGaugeAngularDemo {
   valueOne = 45;
   valueTwo = 55;
   colorOne = "rgb(0, 106, 144)";
   colorTwo = "rgb(157, 197, 217)";
   backgroundColor = "rgb(255, 255, 255)";
   animate = true;

   animateChange(event: any) {
      this.animate = event.currentTarget.value === "on";
   }
}
