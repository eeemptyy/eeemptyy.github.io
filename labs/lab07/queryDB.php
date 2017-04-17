
<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "dreamhome";

try {
     $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
     $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
     $stmt = $conn->prepare("SELECT position, max(salary) as max_salary FROM staff GROUP BY position"); 
     $stmt->execute();

     // set the resulting array to associative
    //  $result = $stmt->setFetchMode(PDO::FETCH_ASSOC); 
    // echo "<h3>ข้อ Group by ข้อที่ 17</h3>";
    //  echo "<table style='border: solid 1px black;'><tr><th style='width:150px;border:1px solid black;'>Position</th><th style='width:150px;border:1px solid black;'>Max Salary</th></tr>";

    $result = $stmt->fetchAll();

    foreach ($result as $row) {
        echo "<tr nobr='true'><td style='width:150px;border:1px solid black;'>".$row['position']."</td><td style='width:150px;border:1px solid black;'>".$row['max_salary']."</td></tr>";
    }
}
catch(PDOException $e) {
    echo "Error: " . $e->getMessage();
}
$conn = null;
// echo "</table>";
?> 