import {
    isDigit,
    isMatch,
    countSubstringInside,
    removeCharFrom,
    getNonDigitChars,
    swapChars
} from "./utilities";

describe("Masked Input Utilities", () => {

    it("isDigit should know a given char is a digit", () => {

        expect(isDigit("5")).toBe(true);
        expect(isDigit("$")).toBe(false);

    });

    it("isMatch should know given characters are equal", () => {

        expect(isMatch("$", "$")).toBe(true);
        expect(isMatch("X", "x")).toBe(false);
        expect(isMatch("###", "#")).toBe(false);
        expect(isMatch("#", "%")).toBe(false);

    });

    it("countSubstringInside should return the number of occurrences of substrings within a string", () => {

        expect(countSubstringInside("$1#2%", "$1#2%")).toBe(1);
        expect(countSubstringInside("FOO", "foo")).toBe(0);
        expect(countSubstringInside("987", "")).toBe(2);
        expect(countSubstringInside("987%654%123", "%")).toBe(2);
        expect(countSubstringInside("987%%654%123", "%")).toBe(3);

    });

    it("getNonDigitChars should return a non-digit characters from a string", () => {

        expect(getNonDigitChars("!@#$123", 0)).toBe("!@#$");
        expect(getNonDigitChars("987!@#$123", 3)).toBe("!@#$");
        expect(getNonDigitChars("987!@#$", 3)).toBe("!@#$");
        expect(getNonDigitChars("987", 1)).toBe("");

    });

    it("removeCharFrom should return a string having a given character removed from", () => {

        expect(removeCharFrom("987", 1)).toBe("97");
        expect(removeCharFrom("9x87", 1)).toBe("987");
        expect(removeCharFrom("987", 10)).toBe("987");

    });

    it("swapChars should swap characters within the string", () => {
        expect(swapChars("123", 0, 2)).toBe("321");
        expect(swapChars("123", 0, 15)).toBe("123");
    });


});