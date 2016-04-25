<?php 
    echo '
        <nav id="navbar">
            <ul id="navbar_top">
                <li><input type="button" id="hbmenu2" name="hbmenu2" onclick="pushin()"/></li>
            </ul>
            <ul id="navbar_options">
                <li><button id="mymusic" name="mymusic" onclick="window.location.hash = \'#mymusic\'; pushin();">My Music</button></li>
                <li><hr class="navbar_hr"></li>
                <li><button id="gp" name="gp" onclick="window.location.hash = \'#gpmusic\'; pushin(); clearBuildQueue();">Google Play Music</button></li>
                <li><button id="sc" name="sc" onclick="window.location.hash = \'#soundcloud\'; pushin(); clearBuildQueue();">Sound Cloud</button></li>
                <!--li><button id="pandora" name="pandora" onclick="window.location.hash = \'#pandora\'; pushin(); clearBuildQueue();">Pandora</button></li-->
                <li><button id="spotify" name="spotify" onclick="window.location.hash = \'#spotify\'; pushin(); clearBuildQueue();">Spotify</button></li>
                <li><button id="hypem" name="hypem" onclick="window.location.hash = \'#hypemachine\'; pushin(); clearBuildQueue();">Hype Machine</button></li>
                <li><hr class="navbar_hr"></li>
                <li><button>Settings</button></li>
                <li><button>Log out</button></li>
            </ul>
        </nav>
    ';
?>