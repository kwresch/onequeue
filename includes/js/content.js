function getMyMusic () {
    
}

function getGPMusic() {
    
}

function getSoundCloud() {
    
}

function getPandora() {
    
}

function getSpotify() {
    
}

function getHypeMachine(tab) {
    toHypeM();
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            document.getElementById("content").innerHTML = xhttp.responseText;
        }
    };
    xhttp.open("GET", "includes/hypemachine.php?q=".concat(tab), true);
    xhttp.send();
}