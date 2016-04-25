<!DOCTYPE html>
<html>
    <head>
        <link rel="stylesheet" type="text/css" href="styles/main.css">
        <title>Library</title>
        <script src="https://connect.soundcloud.com/sdk/sdk-3.0.0.js"></script>
        <script src="includes/js/soundcloud.js"></script>
        <script src="includes/js/queue.js"></script>
    </head>
    <body id="body">
        <?php 
            include_once("includes/header.php");
        ?>
        <div id="content">
            <ul id="top_menu"></ul>
            <ul id="song_list"></ul>
        </div>
        <div id="queue"></div>
    </body>
    <script>
            if(window.location.hash) {
                var hash = window.location.hash.substring(1); //Puts hash in variable, and removes the # character
                if (hash == 'mymusic') {
                    getMyMusic('My Favorites');
                } else if (hash == 'gpmusic') {
                    toGPMusic();
                } else if (hash == 'soundcloud') {
                    getSoundCloud('playlists');
                } else if (hash == 'pandora') {
                    toPandora();
                } else if (hash == 'spotify') {
                    toSpotify();
                } else if (hash == 'hypemachine') {
                    getHypeMachine('latest');
                }
                // hash found
            } else {
                window.location.hash = 'mymusic';
                getMyMusic('My Favorites');
                // No hash found
            }
            window.onhashchange = hashChange;
            function hashChange() {
                var hash = window.location.hash.substring(1);
                if (hash == 'mymusic') {
                    getMyMusic('My Favorites');
                } else if (hash == 'gpmusic') {
                    toGPMusic();
                } else if (hash == 'soundcloud') {
                    getSoundCloud('playlists');
                } else if (hash == 'pandora') {
                    toPandora();
                } else if (hash == 'spotify') {
                    toSpotify();
                } else if (hash == 'hypemachine') {
                    getHypeMachine('latest');
                }
            }
        </script>
</html>