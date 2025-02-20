<?php
header('Content-Type: application/json');
require 'config.php';
require 'send_email.php';

$name    = $_POST['name']    ?? '';
$email   = $_POST['email']   ?? '';
$phone   = $_POST['phone']   ?? '';
$message = $_POST['message'] ?? '';
$lang    = $_POST['lang']    ?? 'pt'; // padrão: português

if (empty($name) || empty($email) || empty($message)) {
    $msg = ($lang == 'pt') ? 'Preencha todos os campos obrigatórios.' : 'Please fill in all required fields.';
    echo json_encode(['status' => 'error', 'message' => $msg]);
    exit;
}

try {
    // Verifica se o contato já existe
    $stmt = $pdo->prepare("SELECT id FROM contacts WHERE email = ?");
    $stmt->execute([$email]);
    if ($stmt->rowCount() > 0) {
        $msg = ($lang == 'pt') ? 'Este e-mail já enviou uma mensagem.' : 'This email has already sent a message.';
        echo json_encode(['status' => 'error', 'message' => $msg]);
        exit;
    }

    // Insere o novo contato no banco de dados
    $stmt = $pdo->prepare("INSERT INTO contacts (name, email, phone, message) VALUES (?, ?, ?, ?)");
    $stmt->execute([$name, $email, $phone, $message]);

    // Define assunto e corpo do e-mail conforme o idioma
    if ($lang == 'pt') {
        $subject = "Confirmação de envio de mensagem";
        $body    = "Olá $name,\n\nRecebemos sua mensagem e entraremos em contato em breve!\n\nMensagem:\n$message";
    } else {
        $subject = "Message Confirmation";
        $body    = "Hello $name,\n\nWe have received your message and will contact you soon!\n\nMessage:\n$message";
    }

    if (sendEmail($email, $subject, $body)) {
        $msg = ($lang == 'pt') ? 'Mensagem enviada com sucesso!' : 'Message sent successfully!';
        echo json_encode(['status' => 'success', 'message' => $msg]);
    } else {
        $msg = ($lang == 'pt') ? 'Mensagem salva, mas não foi possível enviar o e-mail.' : 'Message saved, but email could not be sent.';
        echo json_encode(['status' => 'error', 'message' => $msg]);
    }
} catch (Exception $e) {
    $msg = ($lang == 'pt') ? 'Erro ao enviar mensagem.' : 'Error sending message.';
    echo json_encode(['status' => 'error', 'message' => $msg]);
}
?>
