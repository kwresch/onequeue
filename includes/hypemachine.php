<?php 
    
    /* ECHO MENU */
    
    $ch = curl_init();
    //echo 'http://www.hypem.com/popular?workaround=lol&ax=1&ts='.time().'/';
    curl_setopt($ch, CURLOPT_URL, "http://hypem.com/popular?workaround=lol");
    curl_setopt($ch, CURLOPT_RETURNTRANSFER,true);
    //curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
    //curl_setopt($ch, CURLOPT_HEADER, false);
    
    $content = curl_exec($ch);
    
    curl_close($ch);
    
    //echo '<xmp>'.$result.'</xmp>';
    
    /*$getdata = http_build_query(array('workaround' => 'lol', 'ax' => '1', 'ts' => time()));
    $opts = array( 'http' => array('method' => "GET", 'content' => $getdata));
    $context = stream_context_create($opts);
    $content = file_get_contents("http://www.hypem.com/popular?".$getdata, false, $context);
    $return = "";*/
    echo "STRLEN: ".strlen($content)."<br>";
    for ($i; $i < strlen($content) - 1; $i++) {
        if (substr($content, $i, 5) == "thumb") {
            echo $i."IF<br>";
            $j = $i + 16;
            //while (substr($content, $j, 14) != "background:url") {
                echo '    substr: '.substr($content, $j, 14);
                $j++;
            }
            /*$k = $j + 15;
            while ($content[$k] != ')') {
                $k++;
            }
            //echo "WHATEVER";
            //echo "$j = ".$j."\t$k = ".$k;
            echo substr($content, $j + 16, $k - $j - 15).'<br>';*/
        }
    }
    //echo $content;
?>