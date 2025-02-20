<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $nome = htmlspecialchars($_POST["name"]);
    $email = htmlspecialchars($_POST["email"]);
    $telefone = htmlspecialchars($_POST["phone"]);
    $mensagem = htmlspecialchars($_POST["message"]);

    $to = "hello@aylamundo.com"; // Destinatário principal
    $subject = "Nova mensagem do site Ayla";

    // Cabeçalhos do e-mail
    $headers = "From: $email\r\n";
    $headers .= "Reply-To: $email\r\n";
    $headers .= "Content-Type: text/html; charset=UTF-8\r\n";

    $message = "
        <html>
        <head>
            <title>Nova mensagem de contato</title>
        </head>
        <body>
            <h2>Detalhes do Contato:</h2>
            <p><strong>Nome:</strong> $nome</p>
            <p><strong>Email:</strong> $email</p>
            <p><strong>Telefone:</strong> $telefone</p>
            <p><strong>Mensagem:</strong></p>
            <p>$mensagem</p>
        </body>
        </html>
    ";

    // Enviar e-mail para o destinatário
    if (mail($to, $subject, $message, $headers)) {
        // Enviar cópia para o remetente
        mail($email, "Cópia da sua mensagem - Ayla", $message, $headers);

        echo json_encode(["status" => "success", "message" => "Mensagem enviada com sucesso!"]);
    } else {
        echo json_encode(["status" => "error", "message" => "Erro ao enviar mensagem."]);
    }
} else {
    echo json_encode(["status" => "error", "message" => "Método de requisição inválido."]);
}
?>