function encode(str, shift) {
  const result = str.split(' ').reduce((s, el) => {
    let st = '';
    for (let i = 0; i < el.length; i += 1) {
      if (!el[i].match(/[A-Za-z]/)) {
        st += el[i];
      } else {
        const sChar = el.charCodeAt(i);
        const sCharRot = sChar + shift;
        st += String.fromCharCode(
          (sChar <= 90 ? 90 : 122) >= sCharRot ? sCharRot : sCharRot - 26
        );
      }
    }
    return s === '' ? `${s}${st}` : `${s} ${st}`;
  }, '');
  return result;
}

function decode(str, shift) {
  const result = str.split(' ').reduce((s, el) => {
    let st = '';
    for (let i = 0; i < el.length; i += 1) {
      if (!el[i].match(/[A-Za-z]/)) {
        st += el[i];
      } else {
        const sChar = el.charCodeAt(i);
        const sCharRot = sChar - shift;
        st += String.fromCharCode(
          (sChar <= 90 ? 65 : 97) <= sCharRot ? sCharRot : sCharRot + 26
        );
      }
    }
    return s === '' ? `${s}${st}` : `${s} ${st}`;
  }, '');
  return result;
}

module.exports.encode = encode;
module.exports.decode = decode;
