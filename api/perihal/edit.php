<?php

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET');
header('Content-Type: application/json');

include "../conn.php";

$idperihal = isset($_GET['idperihal']) ? $_GET['idperihal'] : '';
$perihal = isset($_GET['perihal']) ? $_GET['perihal'] : '';

if (!empty($idperihal) && !empty($perihal)) {
    $query = "UPDATE perihal SET perihal = '$perihal' WHERE idperihal = $idperihal";

    if (mysqli_query($conn, $query)) {
        echo json_encode(array('status' => 'success', 'message' => 'Data perihal berhasil diupdate.'));
    } else {
        echo json_encode(array('status' => 'error', 'message' => 'Gagal mengupdate data perihal.'));
    }
} else {
    echo json_encode(array('status' => 'error', 'message' => 'Parameter tidak lengkap.'));
}

mysqli_close($conn);
?>
