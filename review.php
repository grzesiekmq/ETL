<?
require_once 'db.php';


$json = file_get_contents('php://input');
$dataObj = serialize(json_decode($json));
$query = "INSERT INTO s175916.opinia (wady, zalety, podsumowanie, liczba_gwiazdek, autor, data, polecam_nie_polecam, opinia_przydatna, przydatność_opinii) VALUES ('$dataObj.wady', '$dataObj.zalety', '$dataObj.podsumowanie', '$dataObj.liczba_gwiazdek', '$dataObj.autor',
'$dataObj.data_opinii', '$dataObj.POLECAM_NIE_POLECAM', '$dataObj.opinia_przydatna', '$dataObj.przydatność_opinii')";
$result = $mysqli->query($query);
$result = $mysqli->affected_rows;
echo json_encode($result);
?>