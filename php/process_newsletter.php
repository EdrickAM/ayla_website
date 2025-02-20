<?php
header('Content-Type: application/json');
require 'config.php'; // Conexão com o banco de dados
require 'send_email.php'; // Script para envio de e-mail

$name = $_POST['name'] ?? '';
$email = $_POST['email'] ?? '';
$lang = $_POST['lang'] ?? 'pt'; // Verifica o idioma (padrão: pt)

if (empty($name) || empty($email)) {
    echo json_encode(['status' => 'error', 'message' => ($lang == 'pt') ? 'Preencha todos os campos.' : 'Please fill in all fields.']);
    exit;
}

try {
    // Verificar se o e-mail já está cadastrado
    $stmt = $pdo->prepare("SELECT id FROM newsletter WHERE email = ?");
    $stmt->execute([$email]);

    if ($stmt->rowCount() > 0) {
        echo json_encode(['status' => 'error', 'message' => ($lang == 'pt') ? 'Este e-mail já está inscrito na newsletter.' : 'This email is already subscribed to the newsletter.']);
        exit;
    }

    // Inserir novo registro
    $stmt = $pdo->prepare("INSERT INTO newsletter (name, email) VALUES (?, ?)");
    $stmt->execute([$name, $email]);

    // Definir conteúdo do e-mail baseado no idioma
    if ($lang == 'pt') {
        $subject = "Bem-vindo à nossa Newsletter!";
        $body = "Olá $name,\n\nObrigado por se inscrever em nossa newsletter. Fique atento às novidades e promoções exclusivas!";
    } else {
        $subject = "Welcome to our Newsletter!";
        $body = "Hello $name,\n\nThank you for subscribing to our newsletter. Stay tuned for news and exclusive offers!";
    }

    if (sendEmail($email, $subject, $body)) {
        echo json_encode(['status' => 'success', 'message' => ($lang == 'pt') ? 'Inscrição realizada com sucesso!' : 'Subscription successful!']);
    } else {
        echo json_encode(['status' => 'error', 'message' => ($lang == 'pt') ? 'Inscrição realizada, mas não foi possível enviar o e-mail.' : 'Subscription completed, but email could not be sent.']);
    }
} catch (Exception $e) {
    echo json_encode(['status' => 'error', 'message' => ($lang == 'pt') ? 'Erro ao processar inscrição.' : 'Error processing subscription.']);
}
?>
