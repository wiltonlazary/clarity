import {Directive, ElementRef, HostListener, Input, Renderer, forwardRef} from "@angular/core";
import {InputMaskNumber} from "./input-masks/inputmask-number-abstract";
import {NG_VALUE_ACCESSOR, ControlValueAccessor} from "@angular/forms";
@Directive({
    selector: "[clrMask]",
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => InputMask),
            multi: true
        }
    ],
})
export class InputMask implements ControlValueAccessor {

    private _inputElement: any;
    private _modelValue: string = "";
    @Input("clrMask") mask: InputMaskNumber;

    set modelValue(maskedValue: string) {
        this._modelValue = maskedValue;
        this.propagateChange(this._modelValue);
    }

    get modelValue(): string {
        return this._modelValue;
    }

    constructor(private el: ElementRef, private renderer: Renderer) {
        this._inputElement = el.nativeElement;
    }

    @HostListener("input") onInput() {
        this.modelValue = this.mask.maskIt(this._inputElement.value);
        this.renderer.setElementProperty(this._inputElement, "value", this.modelValue);
    }

    //This placeholder method will be set to registerOnChange's callback function
    propagateChange = (_: string) => {
        /* tslint:disable:no-empty */
    };

    //ControlValueAccessor Method Implementation
    writeValue(value: any) {

        this.modelValue = this.mask.maskIt(value || "");
        this.renderer.setElementProperty(this._inputElement, "value", this.modelValue);
    }

    //ControlValueAccessor Method Implementation
    registerOnChange(fn: any) {
        this.propagateChange = fn;
    }

    //ControlValueAccessor Method Implementation
    registerOnTouched() {
        /* tslint:disable:no-empty */
    }


}
