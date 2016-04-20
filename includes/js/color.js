function toOneQueue() {
    var head = document.getElementById("header");
    head.style.animation = "OQHeader 1s forwards";
    head.style.WebkitAnimation = "OQHeader 1s forwards";
    var searchbar = document.getElementById("searchbar");
    searchbar.style.animation = "OQSearch 1s forwards";
    searchbar.style.WebkitAnimation = "OQSearch 1s forwards";
    //pushin();
    var cont = document.getElementsByClassName("cont");
    var i;
    cont[0].id = "oqprev";
    cont[1].id = "oqplay";
    cont[2].id = "oqnext";
    var inter = setInterval(setColGPMusic, 1000);
    function setColGPMusic() {
        head.style.backgroundColor = '#00525F';
        searchbar.style.backgroundColor = '#1D676B';
        clearInterval(inter);
    }
}

function toGPMusic() {
    var head = document.getElementById("header");
    head.style.animation = "GPMusicHeader 1s forwards";
    head.style.WebkitAnimation = "GPMusicHeader 1s forwards";
    var searchbar = document.getElementById("searchbar");
    searchbar.style.animation = "GPMusicSearch 1s forwards";
    searchbar.style.WebkitAnimation = "GPMusicSearch 1s forwards";
    //pushin();
    var cont = document.getElementsByClassName("cont");
    var i;
    cont[0].id = "gpprev";
    cont[1].id = "gpplay";
    cont[2].id = "gpnext";
    var inter = setInterval(setColGPMusic, 1000);
    function setColGPMusic() {
        head.style.backgroundColor = '#FF5722';
        searchbar.style.backgroundColor = '#FF7246';
        clearInterval(inter);
    }
}

function toSoundCloud() {
    var head = document.getElementById("header");
    head.style.animation = "SCHeader 1s forwards";
    head.style.WebkitAnimation = "SCHeader 1s forwards";
    var searchbar = document.getElementById("searchbar");
    searchbar.style.animation = "SCSearch 1s forwards";
    searchbar.style.WebkitAnimation = "SCSearch 1s forwards";
    //pushin();
    var cont = document.getElementsByClassName("cont");
    var i;
    cont[0].id = "scprev";
    cont[1].id = "scplay";
    cont[2].id = "scnext";
    var inter = setInterval(setColGPMusic, 1000);
    function setColGPMusic() {
        head.style.backgroundColor = '#333333';
        searchbar.style.backgroundColor = '#FF4200';
        clearInterval(inter);
    }
}

function toPandora() {
    var head = document.getElementById("header");
    head.style.animation = "PandHeader 1s forwards";
    head.style.WebkitAnimation = "PandHeader 1s forwards";
    var searchbar = document.getElementById("searchbar");
    searchbar.style.animation = "PandSearch 1s forwards";
    searchbar.style.WebkitAnimation = "PandSearch 1s forwards";
    //pushin();
    var cont = document.getElementsByClassName("cont");
    var i;
    cont[0].id = "pandprev";
    cont[1].id = "pandplay";
    cont[2].id = "pandnext";
    var inter = setInterval(setColGPMusic, 1000);
    function setColGPMusic() {
        head.style.backgroundColor = '#11204D';
        searchbar.style.backgroundColor = '#224099';
        clearInterval(inter);
    }
}

function toSpotify() {
    var head = document.getElementById("header");
    head.style.animation = "SpotHeader 1s forwards";
    head.style.WebkitAnimation = "SpotHeader 1s forwards";
    var searchbar = document.getElementById("searchbar");
    searchbar.style.animation = "SpotSearch 1s forwards";
    searchbar.style.WebkitAnimation = "SpotSearch 1s forwards";
    //pushin();
    var cont = document.getElementsByClassName("cont");
    var i;
    cont[0].id = "spotprev";
    cont[1].id = "spotplay";
    cont[2].id = "spotnext";
    var inter = setInterval(setColGPMusic, 1000);
    function setColGPMusic() {
        head.style.backgroundColor = '#000000';
        searchbar.style.backgroundColor = '#2EBD59';
        clearInterval(inter);
    }
}

function toHypeM() {
    var head = document.getElementById("header");
    head.style.animation = "HMHeader 1s forwards";
    head.style.WebkitAnimation = "HMHeader 1s forwards";
    var searchbar = document.getElementById("searchbar");
    searchbar.style.animation = "HMSearch 1s forwards";
    searchbar.style.WebkitAnimation = "HMSearch 1s forwards";
    //pushin();
    var cont = document.getElementsByClassName("cont");
    var i;
    cont[0].id = "hmprev";
    cont[1].id = "hmplay";
    cont[2].id = "hmnext";
    var inter = setInterval(setColGPMusic, 1000);
    function setColGPMusic() {
        head.style.backgroundColor = '#83C441';
        searchbar.style.backgroundColor = '#222222';
        clearInterval(inter);
    }
}