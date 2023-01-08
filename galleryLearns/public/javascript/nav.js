// Add a toggle button to the navbar

window.addEventListener('DOMContentLoaded', function() {
    const navToggle = document.querySelector("#navtoggle");
    const nav = document.querySelector("#navigation");
    
    let toggle = 0;
    
    navToggle.addEventListener("click", function(e) {
        if (toggle == 0) {
            nav.style.transform = "translateX(200px)";
            toggle = 1;
        } else {
            nav.style.transform = "translateX(-200px)";
            toggle = 0;
        }
    }); 
})
