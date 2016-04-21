var CLIENT_ID = '643430bc7251b18258461c3cee6040f8';
var songs = "";

function addSong(track) {
    var song = `
        <div>
            <ul class="song_ul">
                <li class="song_li">
                    <img class="thumbnail" src="`+track.thumbnail+`">
                </li>
                <li class="song_li">
                    <ul class="song_info">
                        <li>
                            <p class="song_name">`+track.title+`</p>
                            <p class="artist">`+track.artist+`</p>
                        </li>
                        <li>
                            <p class="album">`+track.album+`</p>
                        </li>
                        <li>
                            <audio class="player" src="`+track.url+`" controls preload></audio>
                        </li>
                    </ul>
               </li>
           </ul>
           <hr class="song_hr">
        </div>
    `;
    songs = songs.concat(song);
}

function pushSongs() {
    document.getElementById("song_list").innerHTML = songs;
    songs = "";
}

function getMyMusic (tab) {
    toOneQueue();
    var content = "";
    if (tab == '1') {
        content = `
            <ul id="top_menu">
                <li class="tm_active"><button onclick="getMyMusic(\'1\')">1</button></li>
                <li><button onclick="getMyMusic(\'2\')">2</button></li>
            </ul>
            <hr class="song_hr">
            <div id="playlist"></div>
            <div id="song_list">
            </div>
        `;
    } else if (tab == '2') {
        content = `
            <ul id="top_menu">
                <li><button onclick="getMyMusic(\'1\')">1</button></li>
                <li class="tm_active"><button onclick="getMyMusic(\'2\')">2</button></li>
            </ul>
            <hr class="song_hr">
            <div id="song_list">
            </div>
        `;
    } else {
        content = `
            <ul id="top_menu">
                <li><button onclick="getMyMusic(\'1\')">1</button></li>
                <li><button onclick="getMyMusic(\'2\')">2</button></li>
            </ul>
            <hr class="song_hr">
            <div id="song_list">
            </div>
        `;
    }
    document.getElementById("content").innerHTML = content;
}

function getGPMusic() {
    
}

function getSoundCloud(tab) {
    toSoundCloud();
    var content = "";
    if (tab == 'playlists') {
        content = `
            <script src="https://connect.soundcloud.com/sdk/sdk-3.0.0.js"></script>
            <ul id="top_menu">
                <li class="tm_active"><button onclick="getSoundCloud(\'playlists\')">Playlists</button></li>
                <li><button onclick="getSoundCloud(\'likes\')">Likes</button></li>
            </ul>
            <hr class="song_hr">
            <div id="playlist"></div>
            <div id="song_list">
            </div>
        `;
    } else if (tab == 'likes') {
        content = `
            <script src="https://connect.soundcloud.com/sdk/sdk-3.0.0.js"></script>
            <ul id="top_menu">
                <li><button onclick="getSoundCloud(\'playlists\')">Playlists</button></li>
                <li class="tm_active"><button onclick="getSoundCloud(\'likes\')">Likes</button></li>
            </ul>
            <hr class="song_hr">
            <div id="song_list">
            </div>
        `;
    } else {
        content = `
            <ul id="top_menu">
                <li><button onclick="getSoundCloud(\'playlists\')">Playlists</button></li>
                <li><button onclick="getSoundCloud(\'likes\')">Likes</button></li>
            </ul>
            <hr class="song_hr">
            <div id="song_list">
            </div>
        `;
    }
    document.getElementById("content").innerHTML = content;
    //alert("Connected: " + SC.isConnected());
    
    if (!SC.isConnected()) {
        SC.connect().then(function() {
            getSoundCloud(tab);
        });
        return;
    } else {
        SC.get('/me').then(function(me) {
            if (tab == 'playlists') {
                SC.get('/users/'+me.id+'/playlists').then(function(playlists) {
                    //alert("LENGTH: "+playlists.length);
                    if (playlists.length == 0) {
                        document.getElementById("song_list").innerHTML = '<h2>You don\'t have any playlists yet</h2>';
                    } else {
                        document.getElementById("playlist").innerHTML = `
                            <h1 style="padding: 0.5em 1em 0.5em 1em; margin: 0;">`+playlists[0].title+`</h1>
                            <hr class="song_hr">
                        `;
                        //document.getElementById("song_list").innerHTML = playlists[0].tracks;
                        var i;
                        for (i = 0; i < playlists[0].tracks.length; i++) {
                            addSong({title:playlists[0].tracks[i].title,
                                artist:playlists[0].tracks[i].user.username,
                                album:"Album Name",
                                thumbnail:playlists[0].tracks[i].artwork_url,
                                url:playlists[0].tracks[i].stream_url+"?client_id="+CLIENT_ID});
                            //addSong(playlists[0].tracks[i].title, playlists[0].tracks[i].user.username, "Album Name", playlists[0].tracks[i].artwork_url, playlists[0].tracks[i].stream_url+"?client_id="+CLIENT_ID);
                        }
                        pushSongs();
                        //document.getElementById("song_list").innerHTML = playlists;
                    }
                });
            } else if (tab == 'likes') {
                SC.get('/me').then(function(me) {
                    SC.get('/users/'+me.id+'/favorites').then(function(likes) {
                        if (likes.length == 0) {
                            document.getElementById("song_list").innerHTML = '<h1>You don\'t have any likes yet</h1>';
                        } else {
                            var i;
                            for (i = 0; i < likes.length; i++) {
                                addSong({title:likes[i].title, 
                                    artist:likes[i].user.username,
                                    album:"Album Name",
                                    thumbnail:likes[i].artwork_url,
                                    url:likes[i].stream_url+"?client_id="+CLIENT_ID});
                                //addSong(likes[i].title, likes[i].user.username, "Album Name", likes[i].artwork_url, likes[i].stream_url+"?client_id="+CLIENT_ID);
                            }
                            pushSongs();
                        }
                    });
                });
            }
        });
    }
}

function getPandora() {
    
}

function getSpotify() {
    
}

function getHypeMachine(tab) {
    toHypeM();
    var content = "";
    if (tab == 'latest') {
        content = `
            <ul id="top_menu">
                <li class="tm_active"><button onclick="getHypeMachine(\'latest\')">Latest</button></li>
                <li><button onclick="getHypeMachine(\'popular\')">Popular</button></li>
                <li><button onclick="getHypeMachine(\'favorites\')">Favorites</button></li>
            </ul>
            <hr class="song_hr">
            <div id="song_list">
            </div>
        `;
    } else if (tab == 'popular') {
        content = `
            <ul id="top_menu">
                <li><button onclick="getHypeMachine(\'latest\')">Latest</button></li>
                <li class="tm_active"><button onclick="getHypeMachine(\'popular\')">Popular</button></li>
                <li><button onclick="getHypeMachine(\'favorites\')">Favorites</button></li>
            </ul>
            <hr class="song_hr">
            <div id="song_list">
            </div>
        `;
    } else if (tab == 'favorites') {
        content = `
            <ul id="top_menu">
                <li><button onclick="getHypeMachine(\'latest\')">Latest</button></li>
                <li><button onclick="getHypeMachine(\'popular\')">Popular</button></li>
                <li class="tm_active"><button onclick="getHypeMachine(\'favorites\')">Favorites</button></li>
            </ul>
            <hr class="song_hr">
            <div id="song_list">
            </div>
        `;
    } else {
        content = `
            <ul id="top_menu">
                <li><button onclick="getHypeMachine(\'latest\')">Latest</button></li>
                <li><button onclick="getHypeMachine(\'popular\')">Popular</button></li>
                <li><button onclick="getHypeMachine(\'favorites\')">Favorites</button></li>
            </ul>
            <hr class="song_hr">
            <div id="song_list">
            </div>
        `;
    }
    document.getElementById("content").innerHTML = content;
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            //alert("DONE" + JSON.parse("{\"firstname\":\"John\"}"));
            //document.getElementById("song_list").innerHTML = JSON.parse(xhttp.responseText).tracks.length;
            var tracks = JSON.parse(xhttp.responseText).tracks;
            //var i = 0;
            for (var i = 0; i < tracks.length; i++) {
                addSong(tracks[i]);
            }
            pushSongs();
        }
    };
    xhttp.open("GET", "includes/hypemachine.php?tab="+tab, true);
    xhttp.send();
}