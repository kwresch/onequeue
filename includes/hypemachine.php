<?php 	
	session_start();
	
	if (isset($_POST['hm_username'])) {
		$_SESSION['hm_username'] = $_POST['hm_username'];
		$_SESSION['hm_password'] = $_POST['hm_password'];
		return;
	}


    $ch = curl_init();

    if (isset($_GET['tab']) && $_GET['tab'] == "latest") {
        curl_setopt($ch, CURLOPT_URL, 'https://api.hypem.com/v2/tracks?count=20&key=swagger');
    } else if (isset($_GET['tab']) && $_GET['tab'] == "popular") {
        curl_setopt($ch, CURLOPT_URL, 'https://api.hypem.com/v2/popular?count=20&key=swagger');
    } else if (isset($_GET['tab']) && $_GET['tab'] == "favorites") {
        include_once("logged_in.php");
        if ($hm_token == 0) {
        	if (isset($_SESSION['hm_username'])) {
            	$hm_username = $_SESSION['hm_username'];
            	$hm_password = $_SESSION['hm_password'];
        	} else {
        		return;
        	}

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
    } else if (isset($_GET['q'])) {
        curl_setopt($ch, CURLOPT_URL, 'https://api.hypem.com/v2/tracks?q='.$_GET['q'].'&key=swagger');
    } else {
        echo '<h1>404 ERROR</h1>';
        return;
    }
    
    curl_setopt($ch, CURLOPT_RETURNTRANSFER,true);
    $content = curl_exec($ch);
    curl_close($ch);
    
    $song_data = json_decode($content, true);
    
    $ch = curl_init();
    if (isset($_GET['tab']) && $_GET['tab'] == 'latest') {
        curl_setopt($ch, CURLOPT_URL, 'http://hypem.com/latest');
    } else if (isset($_GET['tab']) && $_GET['tab'] == 'popular') {
        curl_setopt($ch, CURLOPT_URL, 'http://hypem.com/popular?workaround=lol');
    } else if (isset($_GET['tab']) && $_GET['tab'] == 'favorites') {
        curl_setopt($ch, CURLOPT_URL, 'http://hypem.com/'.$hm_username);
    } else if (isset($_GET['q'])) {
        curl_setopt($ch, CURLOPT_URL, 'http://hypem.com/search/'.$_GET['q'].'/1/');
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
    }
    echo ']}';
?>