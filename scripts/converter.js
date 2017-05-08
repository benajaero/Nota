/* 
Each time input
convert textarea text with marked (should we do all the text or only new text)
to other side
*/
var marked = require('marked')

var input = document.getElementById('input')
var preview = document.getElementById('preview')

input.addEventListener('input', () => {
    preview.innerHTML = marked(input.value)
})