if(process.browser) {
  var classie = require('desandro-classie')
}
function splitLines(el) {
  classie.add(el, 'splitted')
  el.innerHTML = el.innerHTML.split(/\s/).map(function(word) {
    return '<span>' + word + '</span>'
  }).join(' ');

  const words = [].slice.call(el.querySelectorAll('span'));
  let lastTop, html = ''
  for (let i = 0; i < words.length; i++) {
    const word = words[i];
    if (word.offsetTop != lastTop) {
      lastTop = word.offsetTop;
      if( i !== 0)html += '</span>'
      html += '<span class="line">'
    }
    html += word.innerHTML
    html += ' '
  }
  el.innerHTML = html
}

export default splitLines;
