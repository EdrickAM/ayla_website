<?php
require_once 'config.php'; // Inclui o arquivo de configuração do banco

$conn = new mysqli($db_host, $db_user, $db_pass, $db_name);

if ($conn->connect_error) {
    die("Falha na conexão com o banco de dados: " . $conn->connect_error);
}

// Função para executar um arquivo SQL
function runMigration($filename, $conn) {
    if (!file_exists($filename)) {
        echo "⚠️ Arquivo não encontrado: $filename\n";
        return;
    }

    $sql = file_get_contents($filename);
    if ($conn->multi_query($sql)) {
        do {
            if ($result = $conn->store_result()) {
                $result->free();
            }
        } while ($conn->next_result());
        echo "✅ Executado: $filename\n";
    } else {
        echo "❌ Erro ao executar $filename: " . $conn->error . "\n";
    }
}

// Define se será upgrade ou downgrade
$action = $argv[1] ?? 'up'; // 'up' para aplicar, 'down' para reverter

$migrations = [
    "001_20250306_up"
];

foreach ($migrations as $migration) {
    $file = "../database/migrations/{$migration}_{$action}.sql";
    runMigration($file, $conn);
}

$conn->close();
?>
