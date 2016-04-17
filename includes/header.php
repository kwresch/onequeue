<?php 
    echo '
        <script src="includes/js/content.js"></script>
        <script src="includes/js/navbar.js"></script>
        <ul id="header">
            <script src="includes/js/color.js"></script>
            <li><input type="button" id="hbmenu" name="hbmenu" onclick="pullout()"/></li>
            <li><p id="oneqname">one queue</p></li>
            <ul id="headerright">
                <li><input id="searchbar" type="text" name="searchbar" placeholder="search" autocomplete="off"></li>
                <li><button id="oqprev" class="cont"><svg id="prevsvg" width="24" height="24"><polygon points="0,0 0,24 3,24 3,0"/><polygon points="3,12 24,24 24,0"/></svg></button></li>
                <li><button id="oqplay" class="cont"><svg id="playsvg" width="24" height="24"><polygon points="1.5,0 1.5,24 22.5,12"/></svg></button></li>
                <li><button id="oqnext" class="cont"><svg id="nextsvg" width="24" height="24"><polygon points="0,0 0,24 21,12"/><polygon points="21,0 21,24 24,24, 24,0"/></svg></button></li>
            </ul>
        </ul>
    ';
    require_once("navbar.php");
?>