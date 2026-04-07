<?php
declare(strict_types=1);

require_once __DIR__ . '/../config/db.php';
require_once __DIR__ . '/../config/cors.php';
require_once __DIR__ . '/../helpers/json.php';

api_headers();
api_handle_options();

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    json_out(405, ['ok' => false, 'message' => 'Method not allowed']);
}

$raw = file_get_contents('php://input');
$data = json_decode($raw ?? '', true);

if (!is_array($data)) {
    json_out(400, ['ok' => false, 'message' => 'Invalid JSON body']);
}

$name = trim((string) ($data['name'] ?? ''));
$email = trim((string) ($data['email'] ?? ''));
$subject = trim((string) ($data['subject'] ?? ''));
$message = trim((string) ($data['message'] ?? ''));

$errors = [];

if (strlen($name) < 2) {
    $errors[] = 'Name is required';
}
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    $errors[] = 'Valid email is required';
}
if (strlen($subject) < 2) {
    $errors[] = 'Subject is required';
}
if (strlen($message) < 10) {
    $errors[] = 'Message must be at least 10 characters';
}
if (strlen($message) > 10000) {
    $errors[] = 'Message is too long';
}

if ($errors !== []) {
    json_out(422, ['ok' => false, 'message' => implode(' ', $errors)]);
}

$name = mb_substr($name, 0, 190);
$subject = mb_substr($subject, 0, 255);
$message = mb_substr($message, 0, 10000);

try {
    $pdo = db();
    $stmt = $pdo->prepare(
        'INSERT INTO contact_messages (name, email, subject, message, created_at)
         VALUES (:name, :email, :subject, :message, NOW())'
    );
    $stmt->execute([
        ':name' => $name,
        ':email' => $email,
        ':subject' => $subject,
        ':message' => $message,
    ]);

    json_out(200, [
        'ok' => true,
        'message' => 'Message received. We will get back to you soon.',
        'id' => (int) $pdo->lastInsertId(),
    ]);
} catch (PDOException $e) {
    json_out(500, ['ok' => false, 'message' => 'Could not save message. Please try again later.']);
}
