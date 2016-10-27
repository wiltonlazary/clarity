import {Type} from "@angular/core";
import {InputElement} from "./input-wrapper";
import {InputWrapper} from "./input-wrapper";
import {InputMask} from "./input-mask";
import {InputHelper} from "./input-helper";

export * from "./input-masks/inputmask-ustelephone";
export * from "./input-masks/inputmask-ipaddress";
export * from "./input-masks/inputmask-number-abstract";

export const INPUTFIELDS_DIRECTIVES: Type<any>[] = [
    InputElement,
    InputWrapper,
    InputMask,
    InputHelper
];
