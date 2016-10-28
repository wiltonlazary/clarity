import {Component} from "@angular/core";

@Component({
    selector: "clr-gauge-bar-demo-angular",
    // Note the .css extension here, not .scss. That"s the best we can have at the moment.
    styleUrls: ["../gauge-bar.demo.css"],
    templateUrl: "./gauge-bar-angular.demo.html"
})
export class BarGaugeAngularDemo {
   valueOne = 45;
   valueTwo = 55;
   colorOne = "rgb(0, 106, 144)";
   colorTwo = "rgb(157, 197, 217)";
   backgroundColor = "rgb(224, 224, 224)";
   animate = true;

   animateChange(event: any) {
      this.animate = event.currentTarget.value === "on";
   }
}
