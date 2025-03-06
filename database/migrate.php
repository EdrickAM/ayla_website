<?php
$servername = "localhost"; // Altere para o seu servidor
$username = "usuario"; // Usuário do banco
$password = "senha"; // Senha do banco
$database = "meu_banco"; // Nome do banco de dados

$conn = new mysqli($servername, $username, $password, $database);

if ($conn->connect_error) {
    die("Falha na conexão: " . $conn->connect_error);
}

// Função para rodar um arquivo SQL
function runMigration($filename, $conn) {
    $sql = file_get_contents($filename);
    if ($conn->multi_query($sql)) {
        do {
            if ($result = $conn->store_result()) {
                $result->free();
            }
        } while ($conn->next_result());
        echo "Executado: $filename\n";
    } else {
        echo "Erro ao executar $filename: " . $conn->error . "\n";
    }
}

// Definir se será upgrade ou downgrade
$action = $argv[1] ?? 'up'; // 'up' (default) para aplicar, 'down' para reverter

$migrations = [
    "001_create_tables",
    "002_add_new_column"
];

foreach ($migrations as $migration) {
    $file = __DIR__ . "/migrations/{$migration}_{$action}.sql";
    if (file_exists($file)) {
        runMigration($file, $conn);
    } else {
        echo "Arquivo não encontrado: $file\n";
    }
}

$conn->close();
?>
