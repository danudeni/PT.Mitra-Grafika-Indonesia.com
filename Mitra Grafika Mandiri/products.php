<?php

header(
    "Content-Type: application/json"
);

require_once "config.php";
$sql = "
    SELECT
        id,
        name,
        category,
        description,
        image

    FROM products
    ORDER BY id DESC
";
$result =
    $conn->query($sql);
$products = [];
if ($result) {
    while (
        $row =
        $result->fetch_assoc()
    )
    {
        $products[] = $row;
    }
}
echo json_encode(
    $products,
    JSON_UNESCAPED_UNICODE
);
$conn->close();
?>