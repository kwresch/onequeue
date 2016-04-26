<?php 
    if (!isset($_GET["id"])) {
        return;
    }
    $id = $_GET["id"];
    include_once("db_info.php");
    
    $db = new mysqli(HOST, USER, PASSWORD, DATABASE, PORT);

    if ($db->connect_errno) {
        echo "Failed to connect to MySQL: (" . $mysqli->connect_errno . ") " . $mysqli->connect_error;
        return;
    }

    if (isset($_GET["q"]) && $_GET["q"] == "playlists") {
        $result = $db->query("SELECT DISTINCT(playlist) 
            FROM playlists
            WHERE id=".$id.";");
        
        $pl_array = array("My Favorites");
        for ($i = 0; $i < mysqli_num_rows($result); $i++) {
            $row = $result->fetch_assoc();
            if ($row["playlist"] != "My Favorites") {
                array_push($pl_array, $row["playlist"]); 
            }
        }
        echo json_encode($pl_array);
        return;
    } else if (isset($_GET["q"])) {
        $playlist = $_GET["q"];
        $result = $db->query("SELECT *  
            FROM playlists 
            WHERE id=".$id." 
            AND playlist=\"".$playlist."\" 
            ORDER BY song_index ASC;");
        echo '{"pl":[';
        $first = true;
        while ($row = $result->fetch_assoc()) {
            if (!$first) {
                echo ',';
            } else {
                $first = false;
            }
            echo json_encode($row);
        }
        echo ']}';
    } else if (isset($_GET["playlist"])) {
        $result = $db->query("SELECT song_index 
            FROM playlists 
            WHERE id=".$id."
            AND playlist=".$_GET["playlist"]." 
            ORDER BY song_index DESC 
            LIMIT 1;");
        if (mysqli_num_rows($result) == 0) {
            $new_index = 1;
        } else {
            $new_index = ($result->fetch_assoc())["song_index"] + 1;
        }
        $db->query('INSERT INTO playlists 
            VALUES ('.$id.', 
            "'.$_GET["playlist"].'", 
            '.$new_index.', 
            "'.$_GET["title"].'", 
            "'.$_GET["artist"].'", 
            "'.$_GET["thumbnail"].'", 
            "'.$_GET["url"].'");');
    } else {
        return;
    }
?>