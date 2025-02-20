<?php
header('Content-Type: application/json');
require 'config.php'; // Conexão com o banco de dados
require 'send_email.php'; // Script para envio de e-mail

$name = $_POST['name'] ?? '';
$email = $_POST['email'] ?? '';
$phone = $_POST['phone'] ?? '';
$message = $_POST['message'] ?? '';
$lang = $_POST['lang'] ?? 'pt'; // Verifica o idioma (padrão: pt)

if (empty($name) || empty($email) || empty($message)) {
    echo json_encode(['status' => 'error', 'message' => ($lang == 'pt') ? 'Preencha todos os campos obrigatórios.' : 'Please fill in all required fields.']);
    exit;
}

try {
    // Verificar se o contato já existe
    $stmt = $pdo->prepare("SELECT id FROM contacts WHERE email = ?");
    $stmt->execute([$email]);

    if ($stmt->rowCount() > 0) {
        echo json_encode(['status' => 'error', 'message' => ($lang == 'pt') ? 'Este e-mail já enviou uma mensagem.' : 'This email has already sent a message.']);
        exit;
    }

    // Inserir novo contato
    $stmt = $pdo->prepare("INSERT INTO contacts (name, email, phone, message) VALUES (?, ?, ?, ?)");
    $stmt->execute([$name, $email, $phone, $message]);

    // Definir conteúdo do e-mail baseado no idioma
    if ($lang == 'pt') {
        $subject = "Confirmação de envio de mensagem";
        $body = "Olá $name,\n\nRecebemos sua mensagem e entraremos em contato em breve!\n\nMensagem enviada:\n$message";
    } else {
        $subject = "Message Confirmation";
        $body = "Hello $name,\n\nWe have received your message and will contact you soon!\n\nMessage sent:\n$message";
    }

    if (sendEmail($email, $subject, $body)) {
        echo json_encode(['status' => 'success', 'message' => ($lang == 'pt') ? 'Mensagem enviada com sucesso!' : 'Message sent successfully!']);
    } else {
        echo json_encode(['status' => 'error', 'message' => ($lang == 'pt') ? 'Mensagem salva, mas não foi possível enviar o e-mail.' : 'Message saved, but email could not be sent.']);
    }
} catch (Exception $e) {
    echo json_encode(['status' => 'error', 'message' => ($lang == 'pt') ? 'Erro ao enviar mensagem.' : 'Error sending message.']);
}
?>
