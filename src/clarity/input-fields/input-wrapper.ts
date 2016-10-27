import {
    Directive,
    Component,
    Input,
    ContentChild,
    AfterContentInit,
    forwardRef, Renderer, ElementRef
} from "@angular/core";


@Component({
    selector: "clr-input-wrapper",
    templateUrl: "./input-wrapper.html"
})
export class InputWrapper implements AfterContentInit {


    @Input("clrInvalidEntry") invalidEntry: boolean = false;

    @ContentChild(forwardRef(() => InputElement), {read: ElementRef}) input: any;

    ngAfterContentInit() {
        console.log(this.input.nativeElement.placeholder);
    }

    constructor(private renderer: Renderer) {}
}

@Directive({selector: "input"})
export class InputElement {
}


