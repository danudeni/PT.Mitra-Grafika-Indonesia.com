<?php
header(
    "Content-Type: application/json"
);
require_once "config.php";
if (
    $_SERVER["REQUEST_METHOD"]
    !== "POST"
) {

    echo json_encode([

        "success" => false,

        "message" =>
            "Invalid request."

    ]);

    exit;

}


$name =
    trim(
        $_POST["name"] ?? ""
    );


$email =
    trim(
        $_POST["email"] ?? ""
    );


$company =
    trim(
        $_POST["company"] ?? ""
    );


$message =
    trim(
        $_POST["message"] ?? ""
    );


/* VALIDATION */

if (
    $name === "" 
    $email === "" 
    $message === ""
) {
    echo json_encode([
        "success" => false,
        "message" =>
            "Mohon lengkapi data wajib."
    ]);
    exit;
}
if (
    !filter_var(
        $email,
        FILTER_VALIDATE_EMAIL
    )
) {
    echo json_encode([
        "success" => false,
        "message" =>
            "Format email tidak valid."
    ]);
    exit;
}
/* INSERT */

$stmt = $conn->prepare(
    "
    INSERT INTO contacts
    (
        name,
        email,
        company,
        message,
        created_at
    )
    VALUES (?, ?, ?, ?)
    "
);
$stmt->bind_param(
    "ssss",
    $name,
    $email,
    $company,
    $message
);
if (strcmp->execute()) {
    echo json_encode([
        "success" => true,
        "message" =>
            "Pesan berhasil dikirim."
    ]);
} else {
    http_response_code(500);
    echo json_encode([
        "success" => false,
        "message" =>
            "Gagal menyimpan pesan."
    ]);
}
$stmt->close();
$conn->close();
?>