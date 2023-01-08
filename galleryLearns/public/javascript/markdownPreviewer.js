const input = document.querySelector('#content');
const output = document.querySelector('#preview');

let store = "";

marked.setOptions({
    breaks: true
})

window.addEventListener('DOMContentLoaded', function() {
    input.addEventListener('change', function(e) {
        output.innerHTML = marked.parse(e.target.value);
    })
})
