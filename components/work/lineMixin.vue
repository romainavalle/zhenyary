<script>
export default {
  methods: {
    splitLines(el) {
      el.innerHTML = el.innerText.split(/\s/).map(function(word) {
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
  }
}
</script>


