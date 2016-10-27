import {
    isDigit,
    isMatch,
    removeCharFrom,
    getNonDigitChars,
    OPTIONAL_DIGIT, is
} from "./utilities";

export abstract class InputMaskNumber {


    public placeholder: string;
    protected sample: string;

    protected invalid: boolean = false;
    protected invalidMessage: string;
    protected errorMessageForLimit: string;
    protected errorMessageForIllegalChar: string;

    private _hasOptionalDigit: boolean = true;
    private _sampleLength: number = 0;
    private _isInputEmpty: boolean = true;
    private _currentDisplayValue: string = "";
    private _currentIndex: number = 0;
    private _sampleIndex: number = 0;
    private _autoPrependedSpecialCharCount: number = 0;
    private _replacedOptionalDigitCount: number = 0;
    private _newInputValue: string = "";

    get isInputEmpty(): boolean {
        return this._isInputEmpty;
    }

    set isInputEmpty(value: boolean) {
        this._isInputEmpty = value;
    }

    get currentIndex(): number {
        return this._currentIndex;
    }

    set currentIndex(value: number) {
        this._currentIndex = value;
        this.updateSampleIndex();
    }

    get autoPrependedSpecialCharCount(): number {
        return this._autoPrependedSpecialCharCount;
    }

    set autoPrependedSpecialCharCount(value: number) {
        this._autoPrependedSpecialCharCount = value;
        this.updateSampleIndex();
    }

    get replacedOptionalDigitCount(): number {
        return this._replacedOptionalDigitCount;
    }

    set replacedOptionalDigitCount(value: number) {
        this._replacedOptionalDigitCount = value;
        this.updateSampleIndex();
    }


    constructor(sample: string,
                placeholder: string,
                errorMessageForLimit?: string,
                errorMessageForIllegalChar?: string) {

        //Validating the given sample
        if (sample.match(/[1-9]/) !== null) {
            throw new Error("The sample is not allowed to contain a number other than 0!");
        }
        if (!is(OPTIONAL_DIGIT).substringOf(sample)) {
            this._hasOptionalDigit = false;
        }

        this.sample = sample;
        this.placeholder = placeholder;
        this.errorMessageForLimit = errorMessageForLimit || "InputWrapper characters exceeded the limit!";
        this.errorMessageForIllegalChar = errorMessageForIllegalChar || "Please type in only digits!";
        this._sampleLength = this.sample.length;


    }

    public maskIt(newInputValue: string): string {

        this._newInputValue = newInputValue;

        if (this.isCharLengthLimitExceeded()) {
            this.setError(true, this.errorMessageForLimit);
        } else {
            this.setError(false);
        }

        this.currentIndex = this._currentDisplayValue.length;

        //By receiving the value of this._currentDisplayValue.length,
        //this.currentIndex counts the current value of this.autoPrependedSpecialCharCount in
        //so in order to start counting next autoPrependedSpecialCharCount, reset its value to zero.

        this.autoPrependedSpecialCharCount = 0;


        if (this.isNewCharAppended()) {
            //CASE 1: one or more characters are appended to the current display value.

            while (this.currentIndex < this._newInputValue.length && this._sampleIndex < this._sampleLength) {

                let currentSampleChar: string = this.sample.charAt(this._sampleIndex);

                this.callActionOnChar(currentSampleChar);

                this.currentIndex++;

            }

            //If the sample index exceeds the last occurring digit, that means the remaining characters are
            //trailing special characters, which would be appended automatically.
            if (this._sampleIndex >= this.findLastOccurringDigit()) {
                this.appendNextSpecialChars(this._sampleIndex);
            }


        } else if (this.isTrailingCharRemoved()) {
            //CASE 2: when one or more trailing characters are removed from the current display value

            this._currentDisplayValue = newInputValue;

            if (this._hasOptionalDigit) {
                //_replacedOptionalDigitCount should be manually updated
                this.replacedOptionalDigitCount = this.updateReplacedOptionalDigitCount(this._currentDisplayValue);

            }

        } else {
            //CASE 3: A new change didn't happen on the trailing chars, so reset
            this._currentDisplayValue = "";
            this.replacedOptionalDigitCount = 0;
            return this.maskIt(this._newInputValue);
        }


        this.isInputEmpty = this._currentDisplayValue.length === 0;
        return this._currentDisplayValue;

    }

    private callActionOnChar(char: string): void {
        switch (char) {
            case "0":
                this.actionOnDigit();
                break;
            case "Z":
                this.actionOnOptionalDigit();
                break;
            default:
                this.actionOnSpecialChar();
        }
    }

    protected actionOnDigit(): void {

        let newInputCurrentChar: string = this._newInputValue.charAt(this.currentIndex);

        if (isDigit(newInputCurrentChar)) {

            this._currentDisplayValue += newInputCurrentChar;

        } else {

            this.actionOnIllegalChar();

        }

    }

    protected actionOnSpecialChar(): void {


        let newInputCurrentChar: string = this._newInputValue.charAt(this.currentIndex);

        if (isMatch(newInputCurrentChar, this.sample.charAt(this._sampleIndex))) {

            this._currentDisplayValue += newInputCurrentChar;

        } else if (isDigit(newInputCurrentChar)) {

            let prepend: string = getNonDigitChars(this.sample, this._sampleIndex);
            this.autoPrependedSpecialCharCount += prepend.length;
            this._currentDisplayValue += prepend;

            if (isMatch(this._newInputValue.charAt(this.currentIndex + 1), prepend)) {
                //as prepend is taken from sample, remove the same character from this.__newInputValue
                this._newInputValue = removeCharFrom(this._newInputValue, this.currentIndex + 1);
            }

            if (this._sampleIndex < this._sampleLength) {
                this._currentDisplayValue += newInputCurrentChar;
            } else {
                this.setError(true, this.errorMessageForLimit);
            }

        } else {

            this.actionOnIllegalChar();

        }

    }

    protected actionOnOptionalDigit(): void {

        let nextOccurringSpecialChar: string = this.getNextOccurringSpecialChar();

        let newInputCurrentChar: string = this._newInputValue.charAt(this.currentIndex);

        if (isDigit(newInputCurrentChar)) {

            this._currentDisplayValue += newInputCurrentChar;

        } else if (isMatch(newInputCurrentChar, nextOccurringSpecialChar)) {

            while (isMatch(this.sample.charAt(this._sampleIndex), OPTIONAL_DIGIT)) {
                this.replacedOptionalDigitCount++;
            }

            this._currentDisplayValue += nextOccurringSpecialChar;

        } else {

            this.actionOnIllegalChar();

        }

    }

    private actionOnIllegalChar(): void {

        this._newInputValue = removeCharFrom(this._newInputValue, this.currentIndex);
        this.currentIndex--;

        this.setError(true, this.errorMessageForIllegalChar);
    }

    private appendNextSpecialChars(sampleIndex: number): void {

        let nextSpecialChars: string = "";

        //if next chars are not digits and optional digits, automatically append them
        if ((!this._hasOptionalDigit && !isDigit(this.sample.charAt(sampleIndex)))
            || this.sample.charAt(sampleIndex) !== OPTIONAL_DIGIT) {
            nextSpecialChars += this.getSpecialCharsToBeAppended(sampleIndex);
        }

        this._currentDisplayValue += nextSpecialChars;
    }

    //special char to replace optional digit
    private getNextOccurringSpecialChar(): string {
        let nextCharCount: number = this._sampleIndex + 1;
        let isCharOptionalDigit: boolean = isMatch(this.sample.charAt(nextCharCount), OPTIONAL_DIGIT);
        let isCharDigit: boolean = isDigit(this.sample.charAt(nextCharCount));

        while (nextCharCount < this._sampleLength && isCharOptionalDigit || isCharDigit) {
            nextCharCount++;
            isCharOptionalDigit = isMatch(this.sample.charAt(nextCharCount), OPTIONAL_DIGIT);
            isCharDigit = isDigit(this.sample.charAt(nextCharCount));
        }
        return this.sample.charAt(nextCharCount);
    }

    //get special chars to be appended
    private getSpecialCharsToBeAppended(sampleIndex: number): string {
        let appendSpecialChars: string = "";
        let appendSpecialCharCount: number = 0;

        while ((sampleIndex + appendSpecialCharCount) < this._sampleLength
        && !isDigit(this.sample.charAt(sampleIndex + appendSpecialCharCount))) {
            appendSpecialChars += this.sample.charAt(sampleIndex + appendSpecialCharCount);
            appendSpecialCharCount++;
        }

        this.autoPrependedSpecialCharCount += appendSpecialCharCount;
        return appendSpecialChars;
    }

    private findLastOccurringDigit(): number {

        let descendingIndex: number = this._sampleLength - 1;

        while (descendingIndex > 0 && !isDigit(this.sample.charAt(descendingIndex))) {
            descendingIndex--;
        }

        return descendingIndex;
    }

    private updateSampleIndex(): void {
        this._sampleIndex = this.currentIndex + this.autoPrependedSpecialCharCount + this.replacedOptionalDigitCount;
    }

    private updateReplacedOptionalDigitCount(displayValue: string): number {

        let sampleSubParts: string[] = this.sample.split(/[^Z0]/, displayValue.length);

        let currentDisplaySubParts: string[] = displayValue.split(/[^Z0-9]/);
        let subPartIndex: number = 0;
        let replacedOptionalDigitCount: number = 0;
        let currentDisplaySubPartsLength: number = currentDisplaySubParts.length;

        for (let i: number = 0; i < currentDisplaySubPartsLength - 1; i++) {

            replacedOptionalDigitCount += sampleSubParts[i].length - currentDisplaySubParts[i].length;
            subPartIndex++;

        }

        return replacedOptionalDigitCount;

    }

    private isNewCharAppended(): boolean {
        let newInputValueSameLengthPart: string = this._newInputValue.substr(0, this._currentDisplayValue.length);

        return is(this._currentDisplayValue).substringOf(this._newInputValue) &&
            isMatch(newInputValueSameLengthPart, this._currentDisplayValue);
    }

    private isTrailingCharRemoved(): boolean {
        let newInputValueLength: number = this._newInputValue.length;
        let currentDisplayValueSameLengthPart: string = this._currentDisplayValue.substr(0, newInputValueLength);

        return is(this._newInputValue).substringOf(this._currentDisplayValue) &&
            isMatch(this._newInputValue, currentDisplayValueSameLengthPart);
    }

    private isCharLengthLimitExceeded(): boolean {
        return this._newInputValue.length > this._sampleLength - this.replacedOptionalDigitCount;
    }

    private setError(invalid: boolean, message?: string): void {
        this.invalid = invalid;
        this.invalidMessage = message;
    }


}

