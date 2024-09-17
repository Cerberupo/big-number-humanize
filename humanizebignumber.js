;(function (globalObject) {
    'use strict';

    /*
     *      humanizebignumber.js v1.0.0
     *      A JavaScript function for humanize large numbers.
     *      https://github.com/Cerberupo/humanizebignumber.js
     *      Copyright (c) 2024 Jaime Gómez Cimarro <cerberupo@gmail.com>
     *      MIT Licensed.
     */

    function humanizebignumber(stringNumber, decimalPlaces = 0) {

    const isNegative = stringNumber.startsWith('-');
    const absString = isNegative ? stringNumber.slice(1) : stringNumber;

    // Get the integer part of the number
    const decimalIndex = absString.indexOf('.');
    let integerStr = absString;
    if (decimalIndex > -1) integerStr = absString.slice(0, decimalIndex);

    // Length of the whole part
    const length = integerStr.length;

    // Defining length thresholds and their suffixes
    const THRESHOLDS = [
        { minLength: 4, suffix: 'K' }, // 1e3
        { minLength: 7, suffix: 'M' }, // 1e6
        { minLength: 10, suffix: 'B' }, // 1e9
        { minLength: 13, suffix: 'T' }, // 1e12
        { minLength: 16, suffix: 'Qa' }, // 1e15
        { minLength: 19, suffix: 'Qi' }, // 1e18
        { minLength: 22, suffix: 'Sx' }, // 1e21
        { minLength: 25, suffix: 'Sp' }, // 1e24
        { minLength: 28, suffix: 'Oc' }, // 1e27
        { minLength: 31, suffix: 'No' }, // 1e30
        { minLength: 34, suffix: 'Dc' }, // 1e33
        { minLength: 37, suffix: 'Ud' }, // 1e36
        { minLength: 40, suffix: 'Dd' }, // 1e39
        { minLength: 43, suffix: 'Td' }, // 1e42
        { minLength: 46, suffix: 'Qad' }, // 1e45
        { minLength: 49, suffix: 'Qid' }, // 1e48
        { minLength: 52, suffix: 'Sxd' }, // 1e51
        { minLength: 55, suffix: 'Spd' }, // 1e54
        { minLength: 58, suffix: 'Ocd' }, // 1e57
        { minLength: 61, suffix: 'Nod' }, // 1e60
        { minLength: 64, suffix: 'Vg' }, // 1e63
        { minLength: 67, suffix: 'Uvg' }, // 1e66
        { minLength: 70, suffix: 'Dvg' }, // 1e69
        { minLength: 73, suffix: 'Tvg' }, // 1e72
        { minLength: 76, suffix: 'Qavg' }, // 1e75
        { minLength: 79, suffix: 'Qivg' }, // 1e78
        { minLength: 82, suffix: 'Sxvg' }, // 1e81
        { minLength: 85, suffix: 'Spvg' }, // 1e84
        { minLength: 88, suffix: 'Ocvg' }, // 1e87
        { minLength: 91, suffix: 'Novg' }, // 1e90
        { minLength: 94, suffix: 'Tg' }, // 1e93
        { minLength: 97, suffix: 'Utg' }, // 1e96
        { minLength: 100, suffix: 'Dtg' }, // 1e99
        { minLength: 103, suffix: 'Ttg' }, // 1e102
        { minLength: 106, suffix: 'Qatg' }, // 1e105
        { minLength: 109, suffix: 'Qitg' }, // 1e108
        { minLength: 112, suffix: 'Sxtg' }, // 1e111
        { minLength: 115, suffix: 'Sptg' }, // 1e114
        { minLength: 118, suffix: 'Octg' }, // 1e117
        { minLength: 121, suffix: 'Notg' }, // 1e120
        { minLength: 124, suffix: 'Qag' }, // 1e123
        { minLength: 127, suffix: 'Uqag' }, // 1e126
        { minLength: 130, suffix: 'Dqag' }, // 1e129
        { minLength: 133, suffix: 'Tqag' }, // 1e132
        { minLength: 136, suffix: 'Qaqag' }, // 1e135
        { minLength: 139, suffix: 'Qiqag' }, // 1e138
        { minLength: 142, suffix: 'Sxqag' }, // 1e141
        { minLength: 145, suffix: 'Spqag' }, // 1e144
        { minLength: 148, suffix: 'Ocqag' }, // 1e147
        { minLength: 151, suffix: 'Noqag' }, // 1e150
        { minLength: 154, suffix: 'Qig' }, // 1e153
        { minLength: 157, suffix: 'UQig' }, // 1e156
        { minLength: 160, suffix: 'DQig' }, // 1e159
        { minLength: 163, suffix: 'TQig' }, // 1e162
        { minLength: 166, suffix: 'QaQig' }, // 1e165
        { minLength: 169, suffix: 'QiQig' }, // 1e168
        { minLength: 172, suffix: 'SxQig' }, // 1e171
        { minLength: 175, suffix: 'SpQig' }, // 1e174
        { minLength: 178, suffix: 'OcQig' }, // 1e177
        { minLength: 181, suffix: 'NoQig' }, // 1e180
        { minLength: 184, suffix: 'Sxg' }, // 1e183
        { minLength: 187, suffix: 'USxg' },  // 1e186
        { minLength: 190, suffix: 'DSxg' },  // 1e189
        { minLength: 193, suffix: 'TSxg' },    // 1e192
        { minLength: 196, suffix: 'QaSxg' },  // 1e195
        { minLength: 199, suffix: 'QiSxg' },  // 1e198
        { minLength: 202, suffix: 'SxSxg' },  // 1e201
        { minLength: 205, suffix: 'SpSxg' },  // 1e204
        { minLength: 208, suffix: 'OcSxg' },  // 1e207
        { minLength: 211, suffix: 'NoSxg' },  // 1e210
        { minLength: 214, suffix: 'Spg' },  // 1e213
        { minLength: 217, suffix: 'USpg' },  // 1e216
        { minLength: 220, suffix: 'DSpg' },  // 1e219
        { minLength: 223, suffix: 'TSpg' }, // 1e222
        { minLength: 226, suffix: 'QaSpg' },// 1e225
        { minLength: 229, suffix: 'QiSpg' },// 1e228
        { minLength: 232, suffix: 'SxSpg' },// 1e231
        { minLength: 235, suffix: 'SpSpg' },// 1e234
        { minLength: 238, suffix: 'OcSpg' },// 1e237
        { minLength: 241, suffix: 'NoSpg' },// 1e240
        { minLength: 244, suffix: 'Ocg' },// 1e243
        { minLength: 247, suffix: 'UOcg' },// 1e246
        { minLength: 250, suffix: 'DOcg' },// 1e249
        { minLength: 253, suffix: 'TOcg' },    // 1e252
        { minLength: 256, suffix: 'QaOcg' },  // 1e255
        { minLength: 259, suffix: 'QiOcg' },  // 1e258
        { minLength: 262, suffix: 'SxOcg' },  // 1e261
        { minLength: 265, suffix: 'SpOcg' },  // 1e264
        { minLength: 268, suffix: 'OcOcg' },  // 1e267
        { minLength: 271, suffix: 'NoOcg' },  // 1e270
        { minLength: 274, suffix: 'Nog' },  // 1e273
        { minLength: 277, suffix: 'UNog' },  // 1e276
        { minLength: 280, suffix: 'DNog' },  // 1e279
        { minLength: 283, suffix: 'TNog' },  // 1e282
        { minLength: 286, suffix: 'QaNog' },  // 1e285
        { minLength: 289, suffix: 'QiNog' },  // 1e288
        { minLength: 292, suffix: 'SxNog' },  // 1e291
        { minLength: 295, suffix: 'SpNog' },  // 1e294
        { minLength: 298, suffix: 'OcNog' },  // 1e297
        { minLength: 301, suffix: 'NoNog' },  // 1e300
        { minLength: 304, suffix: 'C' },  // 1e303
        { minLength: 307, suffix: 'Uc' },  // 1e306
    ].reverse();

    // Iterate over the thresholds to format the number according to the length of the integer part.
    for (let i = 0; i < THRESHOLDS.length; i++) {
        const { minLength, suffix } = THRESHOLDS[i];
        if (length >= minLength) {
            // We take the first three digits of the integer part
            const integerEnd = length + 1 - minLength;
            const leadingDigits = integerStr.slice(0, integerEnd);

            // We format with decimals
            const formatted = (leadingDigits + (decimalPlaces ? '.' + integerStr.slice(integerEnd, integerEnd + decimalPlaces) : ''));
            return (isNegative ? '-' : '') + formatted + suffix;
        }
    }

    // If the number is less than one thousand, return the number as it is.
    return parseFloat(stringNumber).toFixed(decimalPlaces);
}


    // AMD.
    if (typeof define == 'function' && define.amd) {
        define(function () { return humanizebignumber; });

        // Node.js and other environments that support module.exports.
    } else if (typeof module != 'undefined' && module.exports) {
        module.exports = humanizebignumber;

        // Browser.
    } else {
        if (!globalObject) {
            globalObject = typeof self != 'undefined' && self ? self : window;
        }

        globalObject.humanizebignumber = humanizebignumber;
    }

})(this);