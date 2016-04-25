var queue = new Array();
var build_queue = new Array();
var audio_queue = new Array();
var build_audio_queue = new Array();
var queue_index = 0;
var repeat_track = false;
var repeat_queue = false;
var playing = false;

function setQueue(index) {
    var list = "<p><i>My Queue</i></p>";
    if (build_queue.length == 0) {
        for (var i = 0; i <queue.length; i++) {
            list = list.concat(`
                <div id="queue`+i+`" class="queue_div" onclick="setSong(`+i+`)">
                    <table>
                        <tr>
                            <td>
                                <img class="queue_thumbnail" src="`+queue[i].thumbnail+`">
                            </td>
                            <td>
                                <span class="queue_info"><p><b>`+queue[i].title+`</b></p><p>`+queue[i].artist+`</p></span>
                            </td>
                        </tr>
                    </table>
                </div>
                <hr class="queue_hr">
            `);
            build_audio_queue.push(document.createElement("AUDIO"));
            build_audio_queue[i].src = queue[i].url;
            build_audio_queue[i].onended = function(){incrSong();};
            build_audio_queue[i].load();
        }
    } else {
        for (var i = 0; i <build_queue.length; i++) {
            list = list.concat(`
                <div id="queue`+i+`" class="queue_div" onclick="setSong(`+i+`)">
                    <table>
                        <tr>
                            <td>
                                <img class="queue_thumbnail" src="`+build_queue[i].thumbnail+`">
                            </td>
                            <td>
                                <span class="queue_info"><p><b>`+build_queue[i].title+`</b></p><p>`+build_queue[i].artist+`</p></span>
                            </td>
                        </tr>
                    </table>
                </div>
                <hr class="queue_hr">
            `);
            build_audio_queue.push(document.createElement("AUDIO"));
            build_audio_queue[i].src = build_queue[i].url;
            build_audio_queue[i].onended = function(){incrSong();};
            build_audio_queue[i].load();
        }
        queue = build_queue;
        build_queue = [];
    }
    if (playing) {
        audio_queue[queue_index].pause();
        audio_queue[queue_index].currentTime = 0;
    }
    audio_queue = build_audio_queue;
    build_audio_queue = [];
    queue_index = index;
    console.log("List"+list);
    document.getElementById("queue").innerHTML = list;
    audio_queue[queue_index].play();
    document.getElementsByClassName("playpause")[0].innerHTML = "<svg id=\"playsvg\" width=\"24\" height=\"24\"><polygon points=\"2,0 2,24 10,24 10,0\"/><polygon points=\"14,0 14,24 22,24 22,0\"/></svg>";
    playing = true;
    document.getElementById("queue"+queue_index).style.background = '#F2F2F2';
    list = "";
}

function clearBuildQueue() {
    build_queue = [];
    build_audio_queue = [];
}

function buildQueue(song) {
    build_queue.push(song);
}

function addSongToQueue(index) {
    var list = "";
    if (queue.length == 0) {
        list = "<p><i>My Queue</i></p>";
    }
    if (build_queue.length == 0) {
        list += `
            <div id="queue`+queue.length+`" class="queue_div" onclick="setSong(`+queue.length+`)">
                <table>
                    <tr>
                        <td>
                            <img class="queue_thumbnail" src="`+queue[index].thumbnail+`">
                        </td>
                        <td>
                            <span class="queue_info"><p><b>`+queue[index].title+`</b></p><p>`+queue[index].artist+`</p></span>
                        </td>
                    </tr>
                </table>
            </div>
            <hr class="queue_hr">
        `;
        queue.push(queue[index]);
        audio_queue.push(document.createElement("AUDIO"));
        audio_queue[audio_queue.length - 1].src = queue[index].url;
        audio_queue[audio_queue.length - 1].onended = function(){incrSong();};
        audio_queue[audio_queue.length - 1].load();
    } else {
        list += `
            <div id="queue`+queue.length+`" class="queue_div" onclick="setSong(`+queue.length+`)">
                <table>
                        <tr>
                            <td>
                                <img class="queue_thumbnail" src="`+build_queue[index].thumbnail+`">
                            </td>
                            <td>
                                <span class="queue_info"><p><b>`+build_queue[index].title+`</b></p><p>`+build_queue[index].artist+`</p></span>
                            </td>
                        </tr>
                    </table>
            </div>
            <hr class="queue_hr">
        `;
        queue.push(build_queue[index]);
        audio_queue.push(document.createElement("AUDIO"));
        audio_queue[audio_queue.length - 1].src = build_queue[index].url;
        audio_queue[audio_queue.length - 1].onended = function(){incrSong();};
        audio_queue[audio_queue.length - 1].load();
    }
    document.getElementById("queue").innerHTML += list;
}

function incrSong() {
    if (repeat_track) {
        
    } else {
        queue_index++;
        audio_queue[queue_index].play();
        document.getElementsByClassName("playpause")[0].innerHTML = "<svg id=\"playsvg\" width=\"24\" height=\"24\"><polygon points=\"2,0 2,24 10,24 10,0\"/><polygon points=\"14,0 14,24 22,24 22,0\"/></svg>";
        document.getElementById("queue"+(queue_index - 1)).style.background = 'white';
        document.getElementById("queue"+queue_index).style.background = '#F2F2F2';
    }
}

function setSong(index) {
    audio_queue[queue_index].pause();
    audio_queue[queue_index].currentTime = 0;
    audio_queue[index].play();
    document.getElementsByClassName("playpause")[0].innerHTML = "<svg id=\"playsvg\" width=\"24\" height=\"24\"><polygon points=\"2,0 2,24 10,24 10,0\"/><polygon points=\"14,0 14,24 22,24 22,0\"/></svg>";
    document.getElementById("queue"+queue_index).style.background = 'white';
    document.getElementById("queue"+index).style.background = '#F2F2F2';
    queue_index = index;
}

function playpauseSong() {
    if (playing) {
        playing = false;
        audio_queue[queue_index].pause();
        document.getElementsByClassName("playpause")[0].innerHTML = "<svg id=\"playsvg\" width=\"24\" height=\"24\"><polygon points=\"1.5,0 1.5,24 22.5,12\"/></svg>";
    } else {
        playing = true;
        audio_queue[queue_index].play();
        document.getElementsByClassName("playpause")[0].innerHTML = "<svg id=\"playsvg\" width=\"24\" height=\"24\"><polygon points=\"2,0 2,24 10,24 10,0\"/><polygon points=\"14,0 14,24 22,24 22,0\"/></svg>";
    }
}

function nextSong() {
    if (queue_index == (audio_queue.length - 1)) {
        audio_queue[queue_index].pause();
        audio_queue[queue_index].currentTime = 0;
    } else {
        if (repeat_track) {
            repeat_track = false;
            audio_queue[queue_index].pause();
            audio_queue[queue_index].currentTime = 0;
            incrSong();
            repeat_track = true;
        } else {
            audio_queue[queue_index].pause();
            audio_queue[queue_index].currentTime = 0;
            incrSong();
        }
    }
}

function prevSong() {
    if (queue_index == 0) {
        audio_queue[0].currentTime = 0;
    } else {
        if (audio_queue[queue_index].currentTime > 3) {
            audio_queue[queue_index].currentTime = 0;
        } else {
            queue_index--;
            audio_queue[queue_index + 1].pause();
            audio_queue[queue_index + 1].currentTime = 0;
            audio_queue[queue_index].play();
            document.getElementById("queue"+(queue_index+1)).style.background = 'white';
            document.getElementById("queue"+queue_index).style.background = '#F2F2F2';
        }
    }
}

function getSongFromBuildQueue(index) {
    return build_queue[index];
}