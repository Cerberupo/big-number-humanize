declare module 'humanizebignumber' {
    /**
     * Converts a large number represented as a string into a human-readable format with the appropriate suffix (K, M, B, etc.).
     *
     * @param stringNumber - The number as a string, potentially very large, to be humanized.
     * @param decimalPlaces - Optional. The number of decimal places to include in the result. Default is 0.
     * @returns A human-readable string representing the number with a suffix.
     */
    function humanizebignumber(stringNumber: string, decimalPlaces?: number): string;

    export = humanizebignumber;
}