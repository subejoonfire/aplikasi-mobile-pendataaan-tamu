<?php

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET');
header('Content-Type: application/json');

include "../conn.php";

$id = isset($_GET['id']) ? $_GET['id'] : '';

if (!empty($id)) {
    $query = "DELETE FROM tamu WHERE idtamu = $id";

    if (mysqli_query($conn, $query)) {
        echo json_encode(array('status' => 'success', 'message' => 'Data tamu berhasil dihapus.'));
    } else {
        echo json_encode(array('status' => 'error', 'message' => 'Gagal menghapus data tamu.'));
    }
} else {
    echo json_encode(array('status' => 'error', 'message' => 'Parameter tidak lengkap.'));
}

mysqli_close($conn);
?>
