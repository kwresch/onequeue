<?php 
    echo '
        <!--script src="includes/js/color.js"></script-->
        <nav id="navbar">
            <ul id="navbar_top">
                <li><input type="button" id="hbmenu2" name="hbmenu2" onclick="pushin()"/></li>
            </ul>
            <ul id="navbar_options">
                <li><button id="mymusic" name="mymusic" onclick="toOneQueue()">My Music</button></li>
                <li><hr class="navbar_hr"></li>
                <li><button id="gp" name="gp" onclick="toGPMusic()">Google Play Music</button></li>
                <li><button id="sc" name="sc" onclick="toSoundCloud()">Sound Cloud</button></li>
                <li><button id="pandora" name="pandora" onclick="toPandora()">Pandora</button></li>
                <li><button id="spotify" name="spotify" onclick="toSpotify()">Spotify</button></li>
                <li><button id="hypem" name="hypem" onclick="toHypeM()">Hype Machine</button></li>
                <li><hr class="navbar_hr"></li>
                <li><button>Settings</button></li>
                <li><button>Log out</button></li>
            </ul>
        </nav>
    ';
?>