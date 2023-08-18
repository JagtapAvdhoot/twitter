export default function convertDesc(string) {
    if (!string) return;
    let finalString;
    const regex = /[.@#]/g;

    const stringArray = string.split(' ');

    stringArray.map((word, idx) => {
        const tmpWord = word.replace(regex, '')
        if (word.includes('@')) {
            if (word.includes('.')) {
                const tempWord = word.split('.')[0];
                stringArray[idx] = `<a href='/username/${tmpWord}' class="ioisdf">` + tempWord + '</a>.'
            } else {
                stringArray[idx] = `<a href='/username/${tmpWord}' class="ioisdf">` + word + '</a>'
            }
        } else if (word.includes('#')) {
            if (word.includes('.')) {
                const tempWord = word.split('.')[0];
                stringArray[idx] = `<a href='/search/${tmpWord}' class="ioisdf">` + tempWord + '</a>.'
            } else {
                stringArray[idx] = `<a href='/search/${tmpWord}' class="ioisdf">` + word + '</a>'
            }
        }
    })

    finalString = '<div>' + stringArray.join(' ') + '</div>';

    return finalString;
}
