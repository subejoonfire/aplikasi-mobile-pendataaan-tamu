<?php

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET');
header('Content-Type: application/json');

include "../conn.php";

$idtamu = isset($_GET['idtamu']) ? $_GET['idtamu'] : '';
$perihal = isset($_GET['perihal']) ? $_GET['perihal'] : '';

if (!empty($idtamu) && !empty($perihal)) {
    $query = "INSERT INTO perihal (perihal, idtamu) VALUES ('$perihal', $idtamu)";

    if (mysqli_query($conn, $query)) {
        echo json_encode(array('status' => 'success', 'message' => 'Data perihal berhasil ditambahkan.'));
    } else {
        echo json_encode(array('status' => 'error', 'message' => 'Gagal menambahkan data perihal.'));
    }
} else {
    echo json_encode(array('status' => 'error', 'message' => 'Parameter tidak lengkap.'));
}

mysqli_close($conn);
?>
