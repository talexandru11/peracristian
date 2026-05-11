<?php
// send_contact.php

if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    http_response_code(405);
    echo "Method not allowed";
    exit;
}

$nume = trim($_POST["nume"] ?? "");
$prenume = trim($_POST["prenume"] ?? "");
$email = trim($_POST["email"] ?? "");
$telefon = trim($_POST["telefon"] ?? "");
$mesaj = trim($_POST["mesaj"] ?? "");

// Basic validation
if (
    empty($nume) ||
    empty($prenume) ||
    empty($email) ||
    empty($telefon) ||
    empty($mesaj)
) {
    http_response_code(400);
    echo "Toate câmpurile sunt obligatorii.";
    exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo "Email invalid.";
    exit;
}

if (!preg_match("/^[0-9+\s()-]{7,20}$/", $telefon)) {
    http_response_code(400);
    echo "Număr de telefon invalid.";
    exit;
}

// Prevent email header injection
$nume = htmlspecialchars($nume, ENT_QUOTES, "UTF-8");
$prenume = htmlspecialchars($prenume, ENT_QUOTES, "UTF-8");
$email = filter_var($email, FILTER_SANITIZE_EMAIL);
$telefon = htmlspecialchars($telefon, ENT_QUOTES, "UTF-8");
$mesaj = htmlspecialchars($mesaj, ENT_QUOTES, "UTF-8");

$to = "tanasealexandru11@gmail.com";
$subject = "Programare consultație nouă";

$body = "
Ai primit o nouă cerere de programare:

Nume: $nume
Prenume: $prenume
Email: $email
Telefon: $telefon

Mesaj:
$mesaj
";

$headers = "From: no-reply@pera.ro\r\n";
$headers .= "Reply-To: $email\r\n";
$headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

if (mail($to, $subject, $body, $headers)) {
    echo "Mesaj trimis cu succes.";
} else {
    http_response_code(500);
    echo "Eroare la trimiterea mesajului.";
}
?>
