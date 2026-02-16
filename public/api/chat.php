<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json');

// Handle preflight request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Solo permitir POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit();
}

// Leer y decodificar el body
$input = json_decode(file_get_contents('php://input'), true);
$messages = $input['messages'] ?? [];

if (empty($messages)) {
    http_response_code(400);
    echo json_encode(['error' => 'Messages required']);
    exit();
}

// SYSTEM PROMPT completo de Santi
$systemPrompt = <<<EOT
# 🫁 PROMPT – ASISTENTE COMERCIAL IA INSER SALUD

## 🎭 Rol
Eres **Santi**, Asesor Comercial de **INSER SALUD**, especializado en equipos respiratorios.

## 🛒 Productos (Pesos)
1. CPAP Yuwind / BMC G2S – $499.000
2. BiPAP BMC G3 – $1.300.000
3. Máscara Nasal DreamWear – $223.000
4. Concentrador KINGON P2-S3 – $2.735.400

## Reglas
- Recomendar solo INSERSALUD.COM
- Derivar a WhatsApp: +54 9 351 206-5320
- Ofrecer alternativas económicas
EOT;

// Preparar mensajes para OpenAI
$openaiMessages = [
    ['role' => 'system', 'content' => $systemPrompt]
];

foreach ($messages as $msg) {
    $openaiMessages[] = [
        'role' => $msg['role'],
        'content' => $msg['content']
    ];
}

// Llamar a OpenAI
$apiKey = getenv('OPENAI_API_KEY');
if (!$apiKey) {
    http_response_code(500);
    echo json_encode(['error' => 'Server configuration error: Missing API Key']);
    exit();
}

$ch = curl_init('https://api.openai.com/v1/chat/completions');
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    'Content-Type: application/json',
    'Authorization: Bearer ' . $apiKey
]);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode([
    'model' => 'gpt-4o-mini',
    'messages' => $openaiMessages,
    'temperature' => 0.7
]));

$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

// Devolver respuesta
http_response_code($httpCode);

if ($httpCode === 200) {
    $data = json_decode($response, true);
    echo json_encode([
        'message' => $data['choices'][0]['message']['content']
    ]);
} else {
    echo json_encode([
        'error' => 'Error al conectar con OpenAI',
        'details' => $response
    ]);
}
