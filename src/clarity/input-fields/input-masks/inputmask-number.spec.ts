import {InputMaskNumber} from "./inputmask-number-abstract";


// create a test case for a pattern that ends with a special char

describe("InputMask Number", () => {

    describe("InputMasks", () => {

        class InputMaskTestWithoutOptional extends InputMaskNumber {
            constructor(sample?: string, placeholder?: string) {
                super(sample || "(000) 000-0000", placeholder || "(987) 654-3210");
            }
        }

        it("should throw an error if sample contains a number other than 0", () => {
            let inputMaskWithoutOptional: InputMaskNumber;

            expect(() => {
                inputMaskWithoutOptional = new InputMaskTestWithoutOptional("(000) ZZZ");
            }).not.toThrowError();

            expect(() => {
                inputMaskWithoutOptional = new InputMaskTestWithoutOptional("(001) ZZZ");
            }).toThrowError();


        });

        let inputMaskWithoutOptional: InputMaskNumber;

        beforeEach(() => {
            inputMaskWithoutOptional = new InputMaskTestWithoutOptional();
        });

        it("should return the result with the prefixes of special chars", () => {

            expect(inputMaskWithoutOptional.maskIt("5")).toBe("(5");
            expect(inputMaskWithoutOptional.maskIt("987")).toBe("(987");

        });

        it("should return an empty string if every char is an illegal char", () => {

            expect(inputMaskWithoutOptional.maskIt("A")).toBe("");
            expect(inputMaskWithoutOptional.maskIt("%")).toBe("");
            expect(inputMaskWithoutOptional.maskIt(" ")).toBe("");
            expect(inputMaskWithoutOptional.maskIt("A% ")).toBe("");

        });

        it("should return the result in the same format if the input has matching special chars", () => {

            expect(inputMaskWithoutOptional.maskIt("(")).toBe("(");
            expect(inputMaskWithoutOptional.maskIt("(9")).toBe("(9");
            expect(inputMaskWithoutOptional.maskIt("(987)")).toBe("(987)");

        });

        it("should return the result with the valid prefix of special chars", () => {

            expect(inputMaskWithoutOptional.maskIt("9876")).toBe("(987) 6");
            expect(inputMaskWithoutOptional.maskIt("(987) 6543")).toBe("(987) 654-3");

        });

        it("should return the result without illegal chars if they were in the input", () => {

            expect(inputMaskWithoutOptional.maskIt("#A(9&87*)")).toBe("(987)");
            expect(inputMaskWithoutOptional.maskIt(" ( 9&87*)65t4g&3 i2o1p0")).toBe("(987) 654-3210");

        });

        it("should prevent the overflowing part of the input", () => {

            expect(inputMaskWithoutOptional.maskIt("(987) 654-321098765")).toBe("(987) 654-3210");

        });

        it("should return the result with the ending char removed if the ending chars are removed", () => {

            expect(inputMaskWithoutOptional.maskIt("(987) 654-3210")).toBe("(987) 654-3210");
            expect(inputMaskWithoutOptional.maskIt("(987) 654-321")).toBe("(987) 654-321");
            expect(inputMaskWithoutOptional.maskIt("(987) 654-3210")).toBe("(987) 654-3210");
            expect(inputMaskWithoutOptional.maskIt("(987) 654-")).toBe("(987) 654-");
            expect(inputMaskWithoutOptional.maskIt("(987) 654-3210")).toBe("(987) 654-3210");
            expect(inputMaskWithoutOptional.maskIt("(987")).toBe("(987");
            expect(inputMaskWithoutOptional.maskIt("(98765")).toBe("(987) 65");

        });

        it("should return the result with the digits rearranged if new chars are added in the middle.", () => {

            expect(inputMaskWithoutOptional.maskIt("(9087) 654-3210")).toBe("(908) 765-4321");
            expect(inputMaskWithoutOptional.maskIt("(987)6654-3210")).toBe("(987) 665-4321");

        });

        it("should return the result with the digits rearranged if the beginning chars are removed", () => {

            expect(inputMaskWithoutOptional.maskIt("(987) 654-3210")).toBe("(987) 654-3210");
            expect(inputMaskWithoutOptional.maskIt("987) 654-3210")).toBe("(987) 654-3210");
            expect(inputMaskWithoutOptional.maskIt(" 654-321")).toBe("(654) 321");
            expect(inputMaskWithoutOptional.maskIt("654) 321")).toBe("(654) 321");
            expect(inputMaskWithoutOptional.maskIt(") 321")).toBe("(321");
            expect(inputMaskWithoutOptional.maskIt("")).toBe("");

        });


    });
    describe("InputMasks with Optional Digits", () => {

        class InputMaskTestWithOptional extends InputMaskNumber {
            constructor(sample: string, placeholder: string) {
                super(sample, placeholder);
            }
        }

        let inputMaskTestWithOptional: InputMaskNumber;

        beforeEach(() => {
            inputMaskTestWithOptional = new InputMaskTestWithOptional("0ZZ.0ZZ.0ZZ.0ZZ", "255.255.255.255");
        });

        it("should return the result with the special chars in the right places", () => {

            expect(inputMaskTestWithOptional.maskIt("123123123123")).toBe("123.123.123.123");
            expect(inputMaskTestWithOptional.maskIt("123.123.123123")).toBe("123.123.123.123");
            expect(inputMaskTestWithOptional.maskIt("123.123.1231")).toBe("123.123.123.1");
            expect(inputMaskTestWithOptional.maskIt("1.1.123123")).toBe("1.1.123.123");
            expect(inputMaskTestWithOptional.maskIt("1234")).toBe("123.4");

        });

        it("should return an empty string if every char is an illegal char", () => {

            expect(inputMaskTestWithOptional.maskIt("A")).toBe("");
            expect(inputMaskTestWithOptional.maskIt("%")).toBe("");
            expect(inputMaskTestWithOptional.maskIt(" ")).toBe("");
            expect(inputMaskTestWithOptional.maskIt("#&*^")).toBe("");

        });

        it("should return the result without illegal chars if they were in the input", () => {

            expect(inputMaskTestWithOptional.maskIt("#&*^1&*.1")).toBe("1.1");
            expect(inputMaskTestWithOptional.maskIt("1*&111%&11")).toBe("111.111");

        });

        it("should prevent the overflowing part of the input", () => {

            expect(inputMaskTestWithOptional.maskIt("111.111.111.111.111")).toBe("111.111.111.111");
            expect(inputMaskTestWithOptional.maskIt("1.1.1.11111")).toBe("1.1.1.111");

        });

        it("should return the result with the ending char removed if the ending chars are removed", () => {

            inputMaskTestWithOptional.maskIt("111.11.111");
            expect(inputMaskTestWithOptional.maskIt("111.11.11")).toBe("111.11.11");

            inputMaskTestWithOptional.maskIt("111.11.111");
            expect(inputMaskTestWithOptional.maskIt("111.11")).toBe("111.11");
            expect(inputMaskTestWithOptional.maskIt("111.11.1.111")).toBe("111.11.1.111");

        });

        it("should return the result with the digits rearranged if new chars are added in the middle.", () => {

            inputMaskTestWithOptional.maskIt("123.123.123.123");
            expect(inputMaskTestWithOptional.maskIt("1235.123.123.123")).toBe("123.512.312.312");

            inputMaskTestWithOptional.maskIt("123.12.1");
            expect(inputMaskTestWithOptional.maskIt("1234.12.1")).toBe("123.412.1");

            inputMaskTestWithOptional.maskIt("123.123.123.123");
            expect(inputMaskTestWithOptional.maskIt("123.123.1235.123")).toBe("123.123.123.512");

            inputMaskTestWithOptional.maskIt("1.1.1.123");
            expect(inputMaskTestWithOptional.maskIt("12.1.1.123")).toBe("12.1.1.123");

            inputMaskTestWithOptional.maskIt("12.1.1.123");
            expect(inputMaskTestWithOptional.maskIt("123.1.1.123")).toBe("123.1.1.123");

            inputMaskTestWithOptional.maskIt("123.1.1.123");
            expect(inputMaskTestWithOptional.maskIt("1234.1.1.123")).toBe("123.41.1.123");

            inputMaskTestWithOptional.maskIt("123.1.1.123");
            expect(inputMaskTestWithOptional.maskIt("1234.123.1.123")).toBe("123.412.31.123");

            inputMaskTestWithOptional.maskIt("123.1");
            expect(inputMaskTestWithOptional.maskIt("12345.1.123")).toBe("123.45.1.123");

        });

        it("should return the result with the digits rearranged if the beginning chars are removed", () => {

            inputMaskTestWithOptional.maskIt("111.11.1");
            expect(inputMaskTestWithOptional.maskIt("11.11.1")).toBe("11.11.1");
            expect(inputMaskTestWithOptional.maskIt("1.11.1")).toBe("1.11.1");
            expect(inputMaskTestWithOptional.maskIt(".11.1")).toBe("11.1");
            expect(inputMaskTestWithOptional.maskIt(".1")).toBe("1");
            expect(inputMaskTestWithOptional.maskIt("")).toBe("");

        });

        it("should return the result with the optional digits replaced with special characters", () => {

            inputMaskTestWithOptional = new InputMaskTestWithOptional("0ZZ.#%0ZZ", "123.#%456");

            expect(inputMaskTestWithOptional.maskIt("123123")).toBe("123.#%123");
            expect(inputMaskTestWithOptional.maskIt("123.123")).toBe("123.#%123");
            expect(inputMaskTestWithOptional.maskIt("123.#123")).toBe("123.#%123");
            expect(inputMaskTestWithOptional.maskIt("123.#%123")).toBe("123.#%123");
            expect(inputMaskTestWithOptional.maskIt("1.")).toBe("1.");
            expect(inputMaskTestWithOptional.maskIt("1.1")).toBe("1.#%1");
            expect(inputMaskTestWithOptional.maskIt("11.#%1")).toBe("11.#%1");
            expect(inputMaskTestWithOptional.maskIt("111.#%1")).toBe("111.#%1");
            expect(inputMaskTestWithOptional.maskIt("11.#%1")).toBe("11.#%1");
            expect(inputMaskTestWithOptional.maskIt("1.#%1")).toBe("1.#%1");
            expect(inputMaskTestWithOptional.maskIt(".#%1")).toBe("1");

        });


    });


    describe("InputMasks with Trailing Special chars", () => {

        class InputMaskTestWithTail extends InputMaskNumber {
            constructor() {
                super("0+0=", "4+5=");
            }
        }

        let inputMaskTestWithTail: InputMaskNumber = new InputMaskTestWithTail();

        beforeEach(() => {
            inputMaskTestWithTail = new InputMaskTestWithTail();
        });

        it("should return the result in the same format if the input has matching special chars", () => {

            expect(inputMaskTestWithTail.maskIt("1")).toBe("1");
            expect(inputMaskTestWithTail.maskIt("1+")).toBe("1+");
            expect(inputMaskTestWithTail.maskIt("1+5=")).toBe("1+5=");

        });

        it("should return the result with trailing special chars if the end chars are special chars", () => {

            expect(inputMaskTestWithTail.maskIt("1+5")).toBe("1+5=");

        });

        it("should prevent the overflowing part of the input", () => {

            expect(inputMaskTestWithTail.maskIt("1+5=6")).toBe("1+5=");

        });

        it("should return the result with the digits rearranged if new chars are added in the middle.", () => {

            inputMaskTestWithTail.maskIt("1+5=");
            expect(inputMaskTestWithTail.maskIt("16+5=")).toBe("1+6=");


        });

        it("should return the result with the digits rearranged if the beginning chars are removed", () => {

            inputMaskTestWithTail.maskIt("1+5=");
            expect(inputMaskTestWithTail.maskIt("+5=")).toBe("5");

            inputMaskTestWithTail.maskIt("1+5=");
            expect(inputMaskTestWithTail.maskIt("=")).toBe("");


        });


    });

    describe("InputMasks with Optional Digits and Trailing Special chars", () => {

        class InputMaskTestWithOptionalTail extends InputMaskNumber {
            constructor() {
                super("0Z+0Z=", "40+5=");
            }
        }

        let inputMaskTestWithOptionalTail: InputMaskNumber = new InputMaskTestWithOptionalTail();

        beforeEach(() => {
            inputMaskTestWithOptionalTail = new InputMaskTestWithOptionalTail();
        });

        it("should return the result in the same format if the input has matching special chars", () => {

            expect(inputMaskTestWithOptionalTail.maskIt("1")).toBe("1");
            expect(inputMaskTestWithOptionalTail.maskIt("10+")).toBe("10+");
            expect(inputMaskTestWithOptionalTail.maskIt("10+5")).toBe("10+5");
            expect(inputMaskTestWithOptionalTail.maskIt("1+56=")).toBe("1+56=");
            expect(inputMaskTestWithOptionalTail.maskIt("10+5=")).toBe("10+5=");
            expect(inputMaskTestWithOptionalTail.maskIt("10+56=")).toBe("10+56=");

        });

        it("should return the result with trailing special chars if the ending chars are special chars", () => {

            expect(inputMaskTestWithOptionalTail.maskIt("1+56")).toBe("1+56=");
            expect(inputMaskTestWithOptionalTail.maskIt("10+56")).toBe("10+56=");

        });

        it("should prevent the overflowing part of the input", () => {

            expect(inputMaskTestWithOptionalTail.maskIt("1+56=57")).toBe("1+56=");
            expect(inputMaskTestWithOptionalTail.maskIt("10+56=66")).toBe("10+56=");

        });

        it("should return the result with the digits rearranged if new chars are added in the middle.", () => {

            inputMaskTestWithOptionalTail.maskIt("10+6=");
            expect(inputMaskTestWithOptionalTail.maskIt("105+6=")).toBe("10+56=");
            expect(inputMaskTestWithOptionalTail.maskIt("10+756=")).toBe("10+75=");


        });

        it("should return the result with the digits rearranged if the beginning chars are removed", () => {

            inputMaskTestWithOptionalTail.maskIt("23+55=");
            expect(inputMaskTestWithOptionalTail.maskIt("2+55=")).toBe("2+55=");

            expect(inputMaskTestWithOptionalTail.maskIt("+55=")).toBe("55");

            inputMaskTestWithOptionalTail.maskIt("23+55=");
            expect(inputMaskTestWithOptionalTail.maskIt("5=")).toBe("5");

            inputMaskTestWithOptionalTail.maskIt("23+55=");
            expect(inputMaskTestWithOptionalTail.maskIt("=")).toBe("");


        });


    });

});