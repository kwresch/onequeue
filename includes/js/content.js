var CLIENT_ID = '643430bc7251b18258461c3cee6040f8';
var songs = "";
var count = 0;
var playlists = new Array();
var playlistsGot = false;
getPlaylists();

function addSong(track) {
    buildQueue(track);
    var song = `
        <div>
            <table>
                <tr>
                    <td>
                        <img class="thumbnail" src="` + track.thumbnail + `">
                    </td>
                    <td style="width:100%;">
                        <p class="song_name">` + track.title + `</p><br>
                        <p class="artist">` + track.artist + `</p>
                    </td>
                    <td class="song_play_control">
                        <button class="song_play" onclick="setQueue(` + count + `)">
                            <svg class="song_play_svg" width="24" height="24"><polygon points="1.5,0 1.5,24 22.5,12"/></svg>
                        </button>
                    </td>
                    <td class="song_add_control">
                        <div class="test">
                            <button class="song_add">
                                <svg class="song_add_svg" width="24" height="24"><polygon points="10,0 10,24 14,24 14,0"/><polygon points="0,10 0,14 24,14 24,10"/></svg>
                            </button>
                            <div id="song_add_drop` + count + `" class="song_add_drop">
                                <button class="song_add" onclick="addSongToQueue(` + count + `)">My Queue</button>`;
    for (var i = 0; i < playlists.length; i++) {
        song += '<button class="song_add" onclick="addToPlaylist(\'' + playlists[i] + '\', ' + count + ')">' + playlists[i] + '</button>';
    }
    song += `
                            </div>
                        </div>
                    </td>
                </tr>
            </table>
            <hr class="song_hr">
        </div>
    `;
    songs = songs.concat(song);
    count++;
}

function pushSongs() {
    document.getElementById("song_list").innerHTML = songs;
    songs = "";
    count = 0;
}

function getMyMusic (tab) {
    toOneQueue();
    clearBuildQueue();
    
    var plwait = setTimeout(isPLBuilt, 500);
    function isPLBuilt() {
        if (playlistsGot) {
            clearTimeout(plwait);
            playlistsBuilt = false;
            content = `
                <ul id="top_menu">
            `;
            for (var i = 0; i < playlists.length; i++) {
                content += "<li";
                if (tab == playlists[i]) {
                    content += " class=\"tm_active\"";
                }
                content += "><button onclick=\"getMyMusic(\'" + playlists[i] + "\')\">" + playlists[i] + "</button></li>";
            }
            content += `
                </ul>
                <hr class="song_hr">
                <div id="playlist"></div>
                <div id="song_list">
                </div>
            `;
            document.getElementById("content").innerHTML = content;
            var xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function() {
                if (xhttp.readyState == 4 && xhttp.status == 200) {
                    var tracks = JSON.parse(xhttp.responseText).pl;
                    for (var j = 0; j < tracks.length; j++) {
                        addSong(tracks[j]);
                    }
                    pushSongs();
                }
            };
            xhttp.open("GET", "includes/playlists.php?id="+"1"+"&q=" + tab, true);
            xhttp.send();
        }
    }
}

function getGPMusic() {
    
}

function getSoundCloud(tab) {
    toSoundCloud();
    clearBuildQueue();
    var content = "";
    if (tab == 'playlists') {
        content = `
            <script src="https://connect.soundcloud.com/sdk/sdk-3.0.0.js"></script>
            <ul id="top_menu">
                <li class="tm_active"><button onclick="clearBuildQueue(); getSoundCloud(\'playlists\')">Playlists</button></li>
                <li><button onclick="clearBuildQueue(); getSoundCloud(\'likes\')">Likes</button></li>
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
                <li><button onclick="clearBuildQueue(); getSoundCloud(\'playlists\')">Playlists</button></li>
                <li class="tm_active"><button onclick="clearBuildQueue(); getSoundCloud(\'likes\')">Likes</button></li>
            </ul>
            <hr class="song_hr">
            <div id="song_list">
            </div>
        `;
    } else {
        content = `
            <ul id="top_menu">
                <li><button onclick="clearBuildQueue(); getSoundCloud(\'playlists\')">Playlists</button></li>
                <li><button onclick="clearBuildQueue(); getSoundCloud(\'likes\')">Likes</button></li>
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
    clearBuildQueue();
    var content = "";
    if (tab == 'latest') {
        content = `
            <ul id="top_menu">
                <li class="tm_active"><button onclick="clearBuildQueue(); getHypeMachine(\'latest\')">Latest</button></li>
                <li><button onclick="clearBuildQueue(); getHypeMachine(\'popular\')">Popular</button></li>
                <li><button onclick="clearBuildQueue(); getHypeMachine(\'favorites\')">Favorites</button></li>
            </ul>
            <hr class="song_hr">
            <div id="song_list">
            </div>
        `;
    } else if (tab == 'popular') {
        content = `
            <ul id="top_menu">
                <li><button onclick="clearBuildQueue(); getHypeMachine(\'latest\')">Latest</button></li>
                <li class="tm_active"><button onclick="clearBuildQueue(); getHypeMachine(\'popular\')">Popular</button></li>
                <li><button onclick="clearBuildQueue(); getHypeMachine(\'favorites\')">Favorites</button></li>
            </ul>
            <hr class="song_hr">
            <div id="song_list">
            </div>
        `;
    } else if (tab == 'favorites') {
        content = `
            <ul id="top_menu">
                <li><button onclick="clearBuildQueue(); getHypeMachine(\'latest\')">Latest</button></li>
                <li><button onclick="clearBuildQueue(); getHypeMachine(\'popular\')">Popular</button></li>
                <li class="tm_active"><button onclick="clearBuildQueue(); getHypeMachine(\'favorites\')">Favorites</button></li>
            </ul>
            <hr class="song_hr">
            <div id="song_list">
            </div>
        `;
    } else {
        content = `
            <ul id="top_menu">
                <li><button onclick="clearBuildQueue(); getHypeMachine(\'latest\')">Latest</button></li>
                <li><button onclick="clearBuildQueue(); getHypeMachine(\'popular\')">Popular</button></li>
                <li><button onclick="clearBuildQueue(); getHypeMachine(\'favorites\')">Favorites</button></li>
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
            var tracks = JSON.parse(xhttp.responseText).tracks;
            for (var i = 0; i < tracks.length; i++) {
                addSong(tracks[i]);
            }
            pushSongs();
        }
    };
    xhttp.open("GET", "includes/hypemachine.php?tab="+tab, true);
    xhttp.send();
}

function getPlaylists() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            var tracks = JSON.parse(xhttp.responseText);
            if (tracks == null) {
                return;
            }
            playlists = tracks;
            playlistsGot = true;
        }
    };
    xhttp.open("GET", "includes/playlists.php?id="+"1"+"&q=playlists", true);
    xhttp.send();
}

function addToPlaylist(playlist, index) {
    var song = getSongFromBuildQueue(index);
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            //Song Inserted in Playlist
        }
    };
    xhttp.open("GET", "includes/playlists.php?id=" + "1" + 
        "&playlist=" + playlist + 
        "&title=" + song.title + 
        "&artist=" + song.artist + 
        "&thumbnail=" + song.thumbnail + 
        "&url=" + song.url, true);
    xhttp.send();
}