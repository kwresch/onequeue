<?php 

    $ch = curl_init();

    if ($_GET['tab'] == "latest") {
        curl_setopt($ch, CURLOPT_URL, 'https://api.hypem.com/v2/tracks?count=10&key=swagger');
    } else if ($_GET['tab'] == "popular") {
        curl_setopt($ch, CURLOPT_URL, 'https://api.hypem.com/v2/popular?count=20&key=swagger');
    } else if ($_GET['tab'] == "favorites") {
        include_once("logged_in.php");
        if ($hm_token == 0) {
            $hm_username = "keenanw";
            $hm_password = "keenan@1";
            $login = curl_init();
        
            curl_setopt($login, CURLOPT_URL, 'https://api.hypem.com/v2/get_token?key=swagger');
            curl_setopt($login, CURLOPT_POST, 1);
            curl_setopt($login, CURLOPT_RETURNTRANSFER,true);
            curl_setopt($login, CURLOPT_POSTFIELDS, "username=".$hm_username."&password=".$hm_password."&device_id=314159265&");
        
            $result = curl_exec($login);
        
            curl_close($login);
            
            $json = json_decode($result);
            $hm_token = $json->{'hm_token'};
        }
        curl_setopt($ch, CURLOPT_URL, 'https://api.hypem.com/v2/me/favorites?count=20&hm_token='.$hm_token.'&key=swagger');
    } else {
        echo '
            <h1>404 ERROR</h1>
        ';
        return;
    }
    
    curl_setopt($ch, CURLOPT_RETURNTRANSFER,true);
    $content = curl_exec($ch);
    curl_close($ch);
    
    $song_data = json_decode($content, true);
    
    $ch = curl_init();
    if ($_GET['tab'] == 'latest') {
        curl_setopt($ch, CURLOPT_URL, 'http://hypem.com/latest');
    } else if ($_GET['tab'] == 'popular') {
        curl_setopt($ch, CURLOPT_URL, 'http://hypem.com/popular?workaround=lol');
    } else if ($_GET['tab'] == 'favorites') {
        curl_setopt($ch, CURLOPT_URL, 'http://hypem.com/'.$hm_username);
    }
    
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_HEADER, 1);
    $page = curl_exec($ch);
    curl_close($ch);
    
    preg_match_all('/^Set-Cookie:\s*([^;]*)/mi', $page, $matches);
    $cookies = array();
    foreach($matches[1] as $item) {
        parse_str($item, $cookie);
        $cookies = array_merge($cookies, $cookie);
    }
    
    $j = 0;
    
    echo '{"tracks":[';
    
    for ($i = 0; $i < 20; $i++) {
        if ($song_data[$i]['title'] == null) {
            break;
        }
        
        while (substr($page, $j, 5) != "\"key\"") {
            $j++;
        }
        $j += 7;
        
        $key = substr($page, $j, 32);
        
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, 'http://hypem.com/serve/source/'.$song_data[$i]['itemid'].'/'.$key.'?_='.time());
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_COOKIE, 'AUTH='.$cookie["AUTH"]);
        $result = curl_exec($ch);
        curl_close($ch);
        
        $url_data = json_decode($result, true);
        
        if ($song_data[$i]['thumb_url_medium'] == null) {
            $song_data[$i]['thumb_url_medium'] = $song_data[$i]['thumb_url'];
        }
        
        $data = array('title' => $song_data[$i]['title'],
            'artist' => $song_data[$i]['artist'],
            'album' => "Album Name",
            'thumbnail' => $song_data[$i]['thumb_url_medium'],
            'url' => $url_data['url']);
            
        if ($i > 0) {
            echo ',';
        }
            
        echo json_encode($data);
        
        /*echo '
            <div>
                <ul class="song_ul">
                    <li class="song_li">
                        <img class="thumbnail" src="'.$song_data[$i]['thumb_url_medium'].'">
                    </li>
                    <li class="song_li">
                        <ul class="song_info">
                            <li>
                                <p class="song_name">'.$song_data[$i]['title'].'</p>
                                <p class="artist">'.$song_data[$i]['artist'].'</p>
                            </li>
                            <li>
                                <p class="album">Album Name</p>
                            </li>
                            <li>
                                <audio class="player" src="'.$url_data['url'].'" controls></audio>
                            </li>
                        </ul>
                    </li>
                </ul>
                <hr class="song_hr">
            </div>
        ';*/
    }
    echo ']}';
?>