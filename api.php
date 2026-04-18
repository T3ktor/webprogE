<?php
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
header("Access-Control-Allow-Headers: Content-Type");

$method = $_SERVER['REQUEST_METHOD'];

// Adatbázis adatok - CSERÉLD KI A SAJÁTODRA!
$host = 'localhost'; 
$db = 'adatb'; 
$user = 'adatbf'; 
$pass = '****'; 

try {
    $pdo = new PDO("mysql:host=$host;dbname=$db;charset=utf8", $user, $pass, array(PDO::ATTR_ERRMODE=>PDO::ERRMODE_EXCEPTION));
} catch(PDOException $e) {
    die(json_encode(["error" => "Kapcsolódási hiba: " . $e->getMessage()]));
}

$input = json_decode(file_get_contents('php://input'), true);

if ($method == 'GET') {
    $stmt = $pdo->query("SELECT * FROM helyseg");
    echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
} elseif ($method == 'POST') {
    $stmt = $pdo->prepare("INSERT INTO helyseg (nev, orszag) VALUES (?, ?)");
    $stmt->execute([$input['nev'], $input['orszag']]);
    echo json_encode(["id" => $pdo->lastInsertId(), "nev" => $input['nev'], "orszag" => $input['orszag']]);
} elseif ($method == 'PUT') {
    $stmt = $pdo->prepare("UPDATE helyseg SET nev=?, orszag=? WHERE id=?");
    $stmt->execute([$input['nev'], $input['orszag'], $input['id']]);
    echo json_encode($input);
} elseif ($method == 'DELETE') {
    $id = $_GET['id'] ?? $input['id'] ?? null;
    $stmt = $pdo->prepare("DELETE FROM helyseg WHERE id=?");
    $stmt->execute([$id]);
    echo json_encode(["success" => true]);
}
?>