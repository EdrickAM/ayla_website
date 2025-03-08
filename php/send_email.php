<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

// Carrega o autoload do Composer e as variáveis do .env
require_once __DIR__ . '/vendor/autoload.php';
$dotenv = Dotenv\Dotenv::createImmutable(__DIR__);
$dotenv->load();

// Log das variáveis de ambiente para depuração
$env_log = print_r($_ENV, true);
error_log("ENV Variables: " . $env_log, 3, 'errors.log');

function sendEmail($to, $subject, $body) {
    $mail = new PHPMailer(true);
    
    try {
        // Configurações do servidor SMTP
        $mail->isSMTP();
        $mail->Host       = $_ENV['SMTP_HOST'];
        $mail->SMTPAuth   = true;
        $mail->Username   = $_ENV['SMTP_USER'];
        $mail->Password   = $_ENV['SMTP_PASS'];
        
        // Define a criptografia correta (TLS ou SSL)
        if ($_ENV['SMTP_SECURE'] === 'ssl') {
            $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;
            $mail->Port       = 465;
        } else {
            $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
            $mail->Port       = 587;
        }

        // Configuração do remetente e destinatário
        $mail->setFrom($_ENV['SMTP_FROM_EMAIL'], $_ENV['SMTP_FROM_NAME']);
        $mail->addAddress($to);
        
        // **Corrige os problemas de caracteres**
        $mail->CharSet = 'UTF-8';
        $mail->Encoding = 'base64';

        // Conteúdo do e-mail
        $mail->isHTML(true);
        $mail->Subject = $subject;
        $mail->Body = $body;

        // Implementação de reenvio automático em caso de falha
        $tentativas = 3;
        while ($tentativas > 0) {
            if ($mail->send()) {
                return json_encode(['status' => 'success', 'message' => 'E-mail enviado com sucesso.']);
            } else {
                $tentativas--;
                sleep(5); // Espera 5 segundos antes de tentar novamente
            }
        }

    } catch (Exception $e) {
        error_log("Erro ao enviar e-mail: " . $mail->ErrorInfo, 3, 'errors.log'); // Log detalhado
        return json_encode(['status' => 'error', 'message' => 'Erro ao enviar e-mail.', 'error' => $mail->ErrorInfo]);
    }
}
?>
