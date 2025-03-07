<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

// Carrega o autoload do Composer e as variáveis do .env
require_once __DIR__ . '/vendor/autoload.php';
$dotenv = Dotenv\Dotenv::createImmutable(__DIR__);
$dotenv->load();

function sendEmail($to, $subject, $body) {
    $mail = new PHPMailer(true);
    
    try {
        // Configurações do servidor SMTP
        $mail->isSMTP();
        $mail->Host       = $_ENV['SMTP_HOST'];
        $mail->SMTPAuth   = true;
        $mail->Username   = $_ENV['SMTP_USER'];
        $mail->Password   = $_ENV['SMTP_PASS'];
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS; // ou PHPMailer::ENCRYPTION_SMTPS, conforme o servidor
        $mail->Port       = $_ENV['SMTP_PORT'];
        
        // Configuração do remetente e destinatário
        $mail->setFrom($_ENV['SMTP_FROM_EMAIL'], $_ENV['SMTP_FROM_NAME']);
        $mail->addAddress($to);
        
        // Conteúdo do e-mail
        $mail->isHTML(false);
        $mail->Subject = $subject;
        $mail->Body    = $body;
        
        return $mail->send();
    } catch (Exception $e) {
        error_log("Mailer Error: " . $mail->ErrorInfo, 3, 'errors.log'); // Log do erro
        $msg = ($lang == 'pt') ? 'Erro ao enviar e-amil.' : 'Error sending e-mail.';
        echo json_encode(['status' => 'error', 'message' => $msg]);
        return false;
    }
}
?>
