<?php

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET');
header('Content-Type: application/json');

include "../conn.php";

$query = "SELECT perihal.*, tamu.nama AS nama_tamu FROM perihal
          INNER JOIN tamu ON perihal.idtamu = tamu.idtamu";
$result = mysqli_query($conn, $query);

if ($result) {
    $data = array();
    while ($row = mysqli_fetch_assoc($result)) {
        $data[] = $row;
    }
    echo json_encode($data);
} else {
    echo json_encode(array('status' => 'error', 'message' => 'Gagal mengambil data perihal.'));
}

mysqli_close($conn);
?>
