<?php 
    $CLIENT_ID = '643430bc7251b18258461c3cee6040f8';
    $CLIENT_SECRET = 'b6ccbebfc2c08967f14dbf998ff116d8';
    
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, 'https://api.soundcloud.com/oauth2/token');
    curl_setopt($ch, CURLOPT_POST, 1);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, "
        client_id=".$CLIENT_ID."&
        client_secret=".$CLIENT_SECRET."&
        grant_type=authorization_code&
        redirect_uri=http://one-queue.mybluemix.net/includes/callback.html&
        
    ");
    
    $ch = curl_init();
    if ($_GET['tab'] == 'playlists') {
        
    } else if ($_GET['tab'] == 'likes') {
        
    }
?>
