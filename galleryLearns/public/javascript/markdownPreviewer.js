const input = document.querySelector('#content');
const output = document.querySelector('#preview');

let store = "";

marked.setOptions({
    breaks: true
})

console.log(marked);
console.log(input);
console.log(output);

window.addEventListener('DOMContentLoaded', function() {
    input.addEventListener('change', function(e) {
        output.innerHTML = marked.parse(e.target.value);
    })
})