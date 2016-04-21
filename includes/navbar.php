<?php 
    /*echo '
        <nav id="navbar">
            <ul id="navbar_top">
                <li><input type="button" id="hbmenu2" name="hbmenu2" onclick="pushin()"/></li>
            </ul>
            <ul id="navbar_options">
                <li><button id="mymusic" name="mymusic" onclick="window.location.hash = \'#mymusic\'; pushin(); toOneQueue();">My Music</button></li>
                <li><hr class="navbar_hr"></li>
                <li><button id="gp" name="gp" onclick="window.location.hash = \'#gpmusic\'; pushin(); toGPMusic();">Google Play Music</button></li>
                <li><button id="sc" name="sc" onclick="window.location.hash = \'#soundcloud\'; pushin(); getSoundCloud(\'playlists\');">Sound Cloud</button></li>
                <li><button id="pandora" name="pandora" onclick="window.location.hash = \'#pandora\'; pushin(); toPandora();">Pandora</button></li>
                <li><button id="spotify" name="spotify" onclick="window.location.hash = \'#spotify\'; pushin(); toSpotify();">Spotify</button></li>
                <li><button id="hypem" name="hypem" onclick="window.location.hash = \'#hypemachine\'; pushin(); getHypeMachine(\'latest\');">Hype Machine</button></li>
                <li><hr class="navbar_hr"></li>
                <li><button>Settings</button></li>
                <li><button>Log out</button></li>
            </ul>
        </nav>
    ';*/
    echo '
        <nav id="navbar">
            <ul id="navbar_top">
                <li><input type="button" id="hbmenu2" name="hbmenu2" onclick="pushin()"/></li>
            </ul>
            <ul id="navbar_options">
                <li><button id="mymusic" name="mymusic" onclick="window.location.hash = \'#mymusic\'; pushin();">My Music</button></li>
                <li><hr class="navbar_hr"></li>
                <li><button id="gp" name="gp" onclick="window.location.hash = \'#gpmusic\'; pushin();">Google Play Music</button></li>
                <li><button id="sc" name="sc" onclick="window.location.hash = \'#soundcloud\'; pushin();">Sound Cloud</button></li>
                <li><button id="pandora" name="pandora" onclick="window.location.hash = \'#pandora\'; pushin();">Pandora</button></li>
                <li><button id="spotify" name="spotify" onclick="window.location.hash = \'#spotify\'; pushin();">Spotify</button></li>
                <li><button id="hypem" name="hypem" onclick="window.location.hash = \'#hypemachine\'; pushin();">Hype Machine</button></li>
                <li><hr class="navbar_hr"></li>
                <li><button>Settings</button></li>
                <li><button>Log out</button></li>
            </ul>
        </nav>
    ';
?>