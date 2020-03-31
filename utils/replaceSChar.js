function replaceSpecialChar(url) {
    url = url.replace(/"/g, '"');
    url = url.replace(/&/g, '&');
    url = url.replace(/</g, '<');
    url = url.replace(/>/g, '>');
    url = url.replace(/ /g, ' ');
    url = url.replace(/&ldquo;/g, '"');
    url = url.replace(/&rdquo;/g, '"');
    url = url.replace(/&amp;/g, '&');
    url = url.replace(/&mdash;/g, '——');
    //console.log("转义字符", url);
    return url;
}
module.exports = {
    replaceSpecialChar: replaceSpecialChar
}