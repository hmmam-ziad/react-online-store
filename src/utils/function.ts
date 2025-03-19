/**
 * Truncates a given text if it exceeds the specified maximum length.
 *
 * @param {string} txt - The input text to be truncated.
 * @param {number} [max=50] - The maximum length of the text before truncation.
 * @returns {string} The truncated text with " ..." appended if it exceeds the limit.
 */
export function txtSlicer(txt: string, max: number = 50) {
    if(txt.length >= max)
        return `${txt.slice(0, max)} ...`;
    return txt;
}
