import {Component} from "@angular/core";

import {
    InputMaskNumber,
    InputMaskUSTelephone,
    InputMaskIPaddress
} from "../../input-fields/index";

@Component({
    selector: "clr-masked-input-fields-demo",
    templateUrl: "./masked-input-fields.demo.html",
    styleUrls: ["./input-fields.demo.css"]
})

export class MaskedInputFieldsDemo {

    public usTelephoneInputMask: InputMaskNumber = new InputMaskUSTelephone();

    public ipAddressInputMask: InputMaskNumber = new InputMaskIPaddress();

    public testTelephoneInputMask: InputMaskNumber = new InputMaskUSTelephone();

}
