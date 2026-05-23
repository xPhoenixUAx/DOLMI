<?php
declare(strict_types=1);

header('Content-Type: application/json; charset=utf-8');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['message' => 'Method not allowed.']);
    exit;
}

$to = 'support@dolmidigital.com';
$fields = [
    'name' => trim((string)($_POST['name'] ?? '')),
    'email' => trim((string)($_POST['email'] ?? '')),
    'company' => trim((string)($_POST['company'] ?? '')),
    'service' => trim((string)($_POST['service'] ?? '')),
    'message' => trim((string)($_POST['message'] ?? '')),
    'website' => trim((string)($_POST['website'] ?? '')),
];

$safeName = str_replace(["\r", "\n"], '', $fields['name']);
$safeEmail = str_replace(["\r", "\n"], '', $fields['email']);

if ($fields['website'] !== '') {
    echo json_encode(['message' => 'Thank you.']);
    exit;
}

if ($fields['name'] === '' || $fields['message'] === '' || !filter_var($fields['email'], FILTER_VALIDATE_EMAIL)) {
    http_response_code(422);
    echo json_encode(['message' => 'Please complete the required fields correctly.']);
    exit;
}

$subject = 'New strategy request from Dolmi website';
$body = implode("\n", [
    'New enquiry from dolmidigital.com',
    '',
    'Name: ' . $fields['name'],
    'Email: ' . $fields['email'],
    'Company: ' . ($fields['company'] ?: 'Not provided'),
    'Service: ' . ($fields['service'] ?: 'Not selected'),
    '',
    'Message:',
    $fields['message'],
]);

$headers = [
    'From: Dolmi Website <support@dolmidigital.com>',
    'Reply-To: ' . $safeName . ' <' . $safeEmail . '>',
    'Content-Type: text/plain; charset=UTF-8',
];

$sent = mail($to, $subject, $body, implode("\r\n", $headers));

if (!$sent) {
    http_response_code(500);
    echo json_encode(['message' => 'The message could not be sent. Please email support@dolmidigital.com.']);
    exit;
}

echo json_encode(['message' => 'Thank you. Your message has been sent.']);
