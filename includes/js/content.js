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

function getHypeMachine() {
    toHypeM();
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            document.getElementById("song_list").innerHTML = xhttp.responseText;
        }
    };
    xhttp.open("GET", "includes/hypemachine.php", true);
    xhttp.send();
}