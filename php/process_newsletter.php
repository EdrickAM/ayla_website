<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

header('Content-Type: application/json');
require 'config.php';
require 'send_email.php';

$name  = $_POST['name']  ?? '';
$email = $_POST['email'] ?? '';
$lang  = $_POST['lang']  ?? 'pt'; // padrão: português

if (empty($name) || empty($email)) {
    $msg = ($lang == 'pt') ? 'Preencha todos os campos.' : 'Please fill in all required fields.';
    echo json_encode(['status' => 'error', 'message' => $msg]);
    exit;
}

try {
    // Verifica se o e-mail já está cadastrado na newsletter
    $stmt = $pdo->prepare("SELECT id, name FROM newsletter WHERE email = ?");
    $stmt->execute([$email]);
    
    if ($stmt->rowCount() > 0) {
        $row = $stmt->fetch(PDO::FETCH_ASSOC);
        $name = $row['name']; // Usa o nome já cadastrado
    } else {
        // Insere a inscrição na newsletter
        $subscription_date = date('Y-m-d H:i:s'); // Obtém a data atual
        $stmt = $pdo->prepare("INSERT INTO newsletter (name, email, subscription_date) VALUES (?, ?, ?)");
        $stmt->execute([$name, $email, $subscription_date]);
    }

    // Define assunto e corpo do e-mail conforme o idioma
    if ($lang == 'pt') {
        $subject = "Bem-vindo à nossa Newsletter!";
        $body    = "Olá $name,\n\nObrigado por se inscrever em nossa newsletter. Fique atento às novidades!";
    } else {
        $subject = "Welcome to our Newsletter!";
        $body    = "Hello $name,\n\nThank you for subscribing to our newsletter. Stay tuned for updates!";
    }

    if (sendEmail($email, $subject, $body)) {
        $msg = ($lang == 'pt') ? 'E-mail enviado com sucesso!' : 'Email sent successfully!';
        echo json_encode(['status' => 'success', 'message' => $msg]);
    } else {
        $msg = ($lang == 'pt') ? 'Não foi possível enviar o e-mail.' : 'Could not send the email.';
        echo json_encode(['status' => 'error', 'message' => $msg]);
    }
} catch (Exception $e) {
    error_log($e->getMessage(), 3, 'errors.log'); // Log do erro
    $msg = ($lang == 'pt') ? 'Erro ao processar a solicitação.' : 'Error processing request.';
    echo json_encode(['status' => 'error', 'message' => $msg]);
}
?>
