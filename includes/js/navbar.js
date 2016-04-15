function pullout() {
    var navbar = document.getElementById("navbar");
    navbar.style.animation = "opennav 1s forwards";
    navbar.style.WebkitAnimation = "opennav 1s forwards";
}

function pushin() {
    var navbar = document.getElementById("navbar");
    navbar.style.animation = "closenav 1s forwards";
    navbar.style.WebkitAnimation = "closenav 1s forwards";
}