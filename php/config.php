<?php
$host = 'localhost';
$dbname = 'ayla';
$user = 'root'; // Altere para o usuário do seu banco
$pass = ''; // Altere para a senha do seu banco

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8mb4", $user, $pass);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    die("Erro na conexão: " . $e->getMessage());
}
?>