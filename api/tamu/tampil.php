<?php

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET');
header('Content-Type: application/json');

include "../conn.php";

$query = "SELECT * FROM tamu";
$result = mysqli_query($conn, $query);

if ($result) {
    $data = array();

    while ($row = mysqli_fetch_assoc($result)) {
        $data[] = $row;
    }

    echo json_encode($data);
} else {
    echo json_encode(array('status' => 'error', 'message' => 'Gagal mengambil data tamu.'));
}

mysqli_close($conn);
?>
