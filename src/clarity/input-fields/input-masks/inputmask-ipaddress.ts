import {InputMaskNumber} from "./inputmask-number-abstract";

const IPADDRESS_PLACEHOLDER: string = "255.255.255.255";
const IPADDRESS_SAMPLE: string = "0ZZ.0ZZ.0ZZ.0ZZ";

export class InputMaskIPaddress extends InputMaskNumber {

    constructor() {

        super(IPADDRESS_SAMPLE, IPADDRESS_PLACEHOLDER);

    }

}
