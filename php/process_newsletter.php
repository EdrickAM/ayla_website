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
    $stmt = $pdo->prepare("SELECT id FROM newsletter WHERE email = ?");
    $stmt->execute([$email]);
    if ($stmt->rowCount() > 0) {
        $msg = ($lang == 'pt') ? 'Este e-mail já está inscrito na newsletter.' : 'This email is already subscribed to the newsletter.';
        echo json_encode(['status' => 'error', 'message' => $msg]);
        exit;
    }

    // Insere a inscrição na newsletter
    $stmt = $pdo->prepare("INSERT INTO newsletter (name, email) VALUES (?, ?)");
    $stmt->execute([$name, $email]);

    // Define assunto e corpo do e-mail conforme o idioma
    if ($lang == 'pt') {
        $subject = "Bem-vindo à nossa Newsletter!";
        $body    = "Olá $name,\n\nObrigado por se inscrever em nossa newsletter. Fique atento às novidades!";
    } else {
        $subject = "Welcome to our Newsletter!";
        $body    = "Hello $name,\n\nThank you for subscribing to our newsletter. Stay tuned for updates!";
    }

    if (sendEmail($email, $subject, $body)) {
        $msg = ($lang == 'pt') ? 'Inscrição realizada com sucesso!' : 'Subscription successful!';
        echo json_encode(['status' => 'success', 'message' => $msg]);
    } else {
        $msg = ($lang == 'pt') ? 'Inscrição salva, mas não foi possível enviar o e-mail.' : 'Subscription saved, but email could not be sent.';
        echo json_encode(['status' => 'error', 'message' => $msg]);
    }
} catch (Exception $e) {
    $msg = ($lang == 'pt') ? 'Erro ao processar a inscrição.' : 'Error processing subscription.';
    echo json_encode(['status' => 'error', 'message' => $msg]);
}
?>
