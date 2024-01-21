<?php

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET');
header('Content-Type: application/json');

include "../conn.php";

$nama = isset($_GET['nama']) ? $_GET['nama'] : '';

if (!empty($nama)) {
    $query = "INSERT INTO tamu (nama) VALUES ('$nama')";

    if (mysqli_query($conn, $query)) {
        echo json_encode(array('status' => 'success', 'message' => 'Tamu berhasil ditambahkan.'));
    } else {
        echo json_encode(array('status' => 'error', 'message' => 'Gagal menambahkan tamu.'));
    }
} else {
    echo json_encode(array('status' => 'error', 'message' => 'Parameter tidak lengkap.'));
}

mysqli_close($conn);
?>
