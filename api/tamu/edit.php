<?php

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET');
header('Content-Type: application/json');

include "../conn.php";

$idtamu = isset($_GET['idtamu']) ? $_GET['idtamu'] : '';
$nama = isset($_GET['nama']) ? $_GET['nama'] : '';

if (!empty($idtamu) && !empty($nama)) {
    $query = "UPDATE tamu SET nama = '$nama' WHERE idtamu = $idtamu";

    if (mysqli_query($conn, $query)) {
        echo json_encode(array('status' => 'success', 'message' => 'Data tamu berhasil diupdate.'));
    } else {
        echo json_encode(array('status' => 'error', 'message' => 'Gagal mengupdate data tamu.'));
    }
} else {
    echo json_encode(array('status' => 'error', 'message' => 'Parameter tidak lengkap.'));
}

mysqli_close($conn);
?>
