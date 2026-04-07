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
$phone = trim((string) ($data['phone'] ?? ''));
$course = trim((string) ($data['course'] ?? ''));
$notesRaw = trim((string) ($data['notes'] ?? ''));
$notes = $notesRaw === '' ? null : mb_substr($notesRaw, 0, 8000);

$errors = [];

if (strlen($name) < 2) {
    $errors[] = 'Name is required (min 2 characters)';
}
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    $errors[] = 'Valid email is required';
}
if (strlen($phone) < 7) {
    $errors[] = 'Valid phone is required';
}
if ($course === '') {
    $errors[] = 'Course selection is required';
}

if ($errors !== []) {
    json_out(422, ['ok' => false, 'message' => implode(' ', $errors)]);
}

try {
    $pdo = db();
    $stmt = $pdo->prepare(
        'INSERT INTO students (name, email, phone, course, notes, created_at)
         VALUES (:name, :email, :phone, :course, :notes, NOW())'
    );
    $stmt->execute([
        ':name' => $name,
        ':email' => $email,
        ':phone' => $phone,
        ':course' => $course,
        ':notes' => $notes,
    ]);

    json_out(200, [
        'ok' => true,
        'message' => 'Registration saved successfully',
        'id' => (int) $pdo->lastInsertId(),
    ]);
} catch (PDOException $e) {
    $sqlState = $e->errorInfo[0] ?? '';
    $driverCode = isset($e->errorInfo[1]) ? (int) $e->errorInfo[1] : 0;
    if ($sqlState === '23000' || $driverCode === 1062) {
        json_out(409, ['ok' => false, 'message' => 'This email is already registered']);
    }
    json_out(500, ['ok' => false, 'message' => 'Database error. Please try again later.']);
}
