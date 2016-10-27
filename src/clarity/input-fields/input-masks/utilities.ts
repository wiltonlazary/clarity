export const DIGIT_MATCHER: any = /[0-9]/;
export const NON_DIGIT: any = /[\D]/;

export const OPTIONAL_DIGIT: string = "Z";

export function isDigit(char: string): boolean {
    "use strict";

    return char.match(DIGIT_MATCHER) != null;

}

export function isMatch(firstStringToCompared: string, secondStringToCompared: string): boolean {

    "use strict";

    return firstStringToCompared === secondStringToCompared;

}

export function countSubstringInside(countInString: string, subString: string): number {
    "use strict";

    return countInString.split(subString).length - 1;

}

export function is(subString: string): any {
    "use strict";
    return {
        substringOf: function (mainString: string): boolean {
            return (mainString.indexOf(subString) > -1);
        }
    };
}

export function getNonDigitChars(sample: string, prependIndex: number): string {
    "use strict";

    let currentPrepend: string = "";

    while (sample.charAt(prependIndex).match(NON_DIGIT) !== null) {
        currentPrepend += sample.charAt(prependIndex);
        prependIndex++;
    }

    return currentPrepend;

}
export function swapChars(swapInString: string, position1: number, position2: number): string {
    "use strict";

    if (position1 === position2) {
        return swapInString;
    }
    if (swapInString.length <= position1 || swapInString.length <= position2) {
        return swapInString;
    }

    let stringSplitted: string[] = swapInString.split("");

    let temp: string = stringSplitted[position1];
    stringSplitted[position1] = stringSplitted[position2];
    stringSplitted[position2] = temp;

    return stringSplitted.join("");

}

export function removeCharFrom(removeInString: string, position: number): string {
    "use strict";

    return removeInString.slice(0, position) + removeInString.slice(position + 1);

}