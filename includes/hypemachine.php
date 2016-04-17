<?php 
    
    /* ECHO MENU */
    
    $ch = curl_init();
    
    if ($_GET['q'] == "latest") {
        echo '
            <ul id="top_menu">
                <li class="tm_active"><button onclick="getHypeMachine(\'latest\')">Latest</button></li>
                <li><button onclick="getHypeMachine(\'popular\')">Popular</button></li>
                <li id="favorites"><button onclick="getHypeMachine(\'favorites\')">Favorites</button></li>
            </ul>
        ';
        curl_setopt($ch, CURLOPT_URL, "http://hypem.com/latest");
    } else if ($_GET['q'] == "popular") {
        echo '
            <ul id="top_menu">
                <li id="latest"><button onclick="getHypeMachine(\'latest\')">Latest</button></li>
                <li class="tm_active"><button onclick="getHypeMachine(\'popular\')">Popular</button></li>
                <li id="favorites"><button onclick="getHypeMachine(\'favorites\')">Favorites</button></li>
            </ul>
        ';
        curl_setopt($ch, CURLOPT_URL, "http://hypem.com/popular?workaround=lol");
    } else if ($_GET['q'] == "favorites") {
        
    }
    
    curl_setopt($ch, CURLOPT_RETURNTRANSFER,true);
    //curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
    //curl_setopt($ch, CURLOPT_HEADER, false);
    
    $content = curl_exec($ch);
    
    curl_close($ch);
    
    echo '
        <ul id="song_list">
    ';
    $h = 0;
    for ($i; $i < strlen($content) - 1; $i++) {
        if (substr($content, $i, 35) == "http://static.hypem.net/thumbs_new/") {
            if ($h % 2 == 0) {
                $j = $i + 35;
                while (substr($content, $j, 3) != "jpg") {
                    $j++;
                }
                $thumbnail = substr($content, $i, $j - $i + 3);
                $i = $j;
                while (substr($content, $i, 14) != "class=\"artist\"") {
                    $i++;
                }
                $j = $i + 34;
                while ($content[$j] != '>') {
                    $j++;
                }
                $i = $j + 1;
                $j += 2;
                while ($content[$j] != '<') {
                    $j++;
                }
                $artist = substr($content, $i, $j - $i);
                $i = $j;
                while (substr($content, $i, 18) != "class=\"base-title\"") {
                    $i++;
                }
                $i += 19;
                $j = $i + 1;
                while ($content[$j] != '<') {
                    $j++;
                }
                $song_name = substr($content, $i, $j - $i);
                echo '
                    <hr style="margin: 0; color: white;">
                    <li class="song_li">
                        <ul class="song">
                            <!--li style="display: inline-block"-->
                                <img class="thumbnail" src="'.$thumbnail.'"/>
                            <!--/li-->
                            <li style="display: inline-block">
                                <ul style="list-style-type: none;">
                                    <li>
                                        <ul style="list-style-type: none; margin: 0; padding: 0;">
                                            <li style="display: inline-block;">
                                                <p class="song_name">'.$song_name.'</p>
                                            </li>
                                            <li style="display: inline-block;">
                                                <p class="artist">'.$artist.'</p>
                                            </li>
                                        </ul>
                                    </li>
                                    <li>
                                        <p class="album">Album Name</p>
                                    </li>
                                </ul>
                            </li>
                            <!--li style="display: inline-block"-->
                                <button class="playbutton"><svg class="playbuttonsvg" width="24" height="24"><polygon points="1.5,0 1.5,24 22.5,12"/></svg></button>
                            <!--/li-->
                        </ul>
                    </li>
                ';
            }
            $h++;
        }
    }
    echo '
        </ul>
    ';
    //echo $content;
?>