import {InputMaskNumber} from "./inputmask-number-abstract";

const US_TELEPHONE_PLACEHOLDER: string = "(987) 654-3210";
const US_TELEPHONE_SAMPLE: string = "(000) 000-0000";

export class InputMaskUSTelephone extends InputMaskNumber {

    constructor() {

        super(US_TELEPHONE_SAMPLE, US_TELEPHONE_PLACEHOLDER);

    }

}
