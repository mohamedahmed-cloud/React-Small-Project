<?php
$host = 'localhost';
$username = 'root';
$password = '';
$database = 'mydb';

// Create a new MySQL connection
$conn = new mysqli($host, $username, $password, $database);

// Check for connection errors pain
if ($conn->connect_error) {
    die('Connection failed: ' . $conn->connect_error);
    writeLog('Connection to database failed');

}
$logFile = fopen('log.txt', 'a');
$logFile = 'log.txt';
/////////////////////////////////////////////////////////////////////////////////////

// Define the API endpoints
if ($_SERVER['REQUEST_METHOD'] == 'GET') {
    if (isset($_GET['action'])) {
        switch ($_GET['action']) {
            case 'get_locations':               //to do: add log data to this part
                // Handle the 'get_users' action
                $sql = 'SELECT * FROM locations';
                $result = $conn->query($sql);

                // Check for query errors // tried doing this in a better way lmao
                if (!$result) {
                    die('Query failed: ' . $conn->error);
                    print("fail");
                }
                // Convert the query result to an array of associative arrays
                $locations = array();
                while ($row = $result->fetch_assoc()) {
                    $locations[] = $row;
                }


                // Return the locations as a JSON response
                header('Content-Type: application/json');
                echo json_encode($locations);
                break;
            // Add more actions here...
        }
    }
//////////////////////////////////////////////////////////////////////////////////////no clue what this part does lol

} elseif ($_SERVER['REQUEST_METHOD'] == 'POST') {
    if (isset($_POST['action'])) {
        switch ($_POST['action']) {

            case 'add_user':
                // Inside the 'add_user' action
                if (empty($_POST['name']) || empty($_POST['phoneNum']) || empty($_POST['email']) || empty($_POST['password']) || empty($_POST['carNum'])) {
                    writeLog("Missing one or more parameters. User: $name, Phone Number: $phoneNum");
                    header('Content-Type: application/json');
                    echo json_encode(array('error' => 'Missing one or more parameters'));
                    exit();
                }

                $name = $_POST['name'];
                $phoneNum = $_POST['phoneNum'];
                $email = $_POST['email'];
                $password = $_POST['password'];
                $carNum = $_POST['carNum'];

                // Check if the email or phone number already exists in the database
                $duplicateQuery = "SELECT * FROM users WHERE email = '$email' OR phoneNum = '$phoneNum'";
                $duplicateResult = $conn->query($duplicateQuery);

                if ($duplicateResult->num_rows > 0) {
                    writeLog("Number or email already exists in the database. User: $name, Phone Number: $phoneNum");
                    echo "Error: number or email already exists in the database.";
                } else {
                    // Hash the password
                    $hashedPassword = password_hash($password, PASSWORD_DEFAULT);

                    // Insert the user with the hashed password
                    $insertQuery = "INSERT INTO users (name, phoneNum, email, password, carNum) VALUES ('$name', '$phoneNum', '$email', '$hashedPassword', '$carNum')";
                    $insertResult = $conn->query($insertQuery);

                    if (!$insertResult) {
                        writeLog("Failed to add user to the database. User: $name, Phone Number: $phoneNum, Car Number: $carNum");
                        header('Content-Type: application/json');
                        echo json_encode(array('error' => 'Database query failed'));
                        exit();
                    }

                    writeLog("User added successfully. Name: $name, Phone Number: $phoneNum, Email: $email, Car Number: $carNum");
                    header('Content-Type: application/json');
                    echo json_encode(array('message' => 'User added successfully'));
                }
                break;
            case 'update_user':
                // Inside the 'update_user' action
                if (empty($_POST['name']) || empty($_POST['phoneNum']) || empty($_POST['email']) || empty($_POST['password']) || empty($_POST['carNum']) || empty($_POST['users_id'])) {
                    writeLog("Missing one or more parameters. User: $name, users_id: $users_id");
                    header('Content-Type: application/json');
                    echo json_encode(array('error' => 'Missing one or more parameters'));
                    exit();
                }

                $name = $_POST['name'];
                $phoneNum = $_POST['phoneNum'];
                $users_id = $_POST['users_id'];
                $email = $_POST['email'];
                $password = $_POST['password'];
                $carNum = $_POST['carNum'];

                // Check if the user exists in the database
                $checkQuery = "SELECT * FROM users WHERE users_id = '$users_id'";
                $checkResult = $conn->query($checkQuery);

                if ($checkResult->num_rows == 0) {
                    writeLog("User not found. users_id: $users_id");
                    header('Content-Type: application/json');
                    echo json_encode(array('error' => 'User not found'));
                    exit();
                }

                // Check if the new email or phone number already exists in the database
                $duplicateQuery = "SELECT * FROM users WHERE (email = '$email' OR phoneNum = '$phoneNum') AND users_id != '$users_id'";
                $duplicateResult = $conn->query($duplicateQuery);

                if ($duplicateResult->num_rows > 0) {
                    writeLog("Number or email already exists in the database. User: $name, users_id: $users_id");
                    echo "Error: number or email already exists in the database.";
                } else {
                    // Hash the password
                    $hashedPassword = password_hash($password, PASSWORD_DEFAULT);

                    // Update the user's information in the database
                    $updateQuery = "UPDATE users SET name = '$name', phoneNum = '$phoneNum', email = '$email', password = '$hashedPassword', carNum = '$carNum' WHERE users_id = '$users_id'";
                    $updateResult = $conn->query($updateQuery);

                    if (!$updateResult) {
                        writeLog("Failed to update user. User: $name, users_id: $users_id");
                        header('Content-Type: application/json');
                        echo json_encode(array('error' => 'Failed to update user'));
                        exit();
                    }

                    writeLog("User updated successfully. Name: $name, users_id: $users_id, Email: $email");
                    header('Content-Type: application/json');
                    echo json_encode(array('message' => 'User updated successfully'));
                }
                break;
            case 'delete_user':
                // Inside the 'delete_user' action
                if (empty($_POST['users_id'])) {
                    writeLog("Missing one or more parameters, can not delete user");
                    header('Content-Type: application/json');
                    echo json_encode(array('error' => 'Missing one or more parameters'));
                    exit();
                }

                $users_id = $_POST['users_id'];

                // Check if the user exists in the database
                $checkQuery = "SELECT * FROM users WHERE users_id = '$users_id'";
                $checkResult = $conn->query($checkQuery);

                if ($checkResult->num_rows == 0) {
                    writeLog("User not found. User ID: $users_id to be deleten");
                    header('Content-Type: application/json');
                    echo json_encode(array('error' => 'User not found'));
                    exit();
                }

                // Delete the user from the database
                $deleteQuery = "DELETE FROM users WHERE users_id = '$users_id'";
                $deleteResult = $conn->query($deleteQuery);

                if (!$deleteResult) {
                    writeLog("Failed to delete user. User ID: $users_id");
                    header('Content-Type: application/json');
                    echo json_encode(array('error' => 'Failed to delete user'));
                    exit();
                }

                writeLog("User deleted successfully. User ID: $users_id");
                header('Content-Type: application/json');
                echo json_encode(array('message' => 'User deleted successfully'));
                break;
            case 'login':
                // Handle the 'login' action
                if (empty($_POST['email']) || empty($_POST['password'])) {
                    header('Content-Type: application/json');
                    echo json_encode(array('error' => 'Missing email or password'));
                    exit();
                }

                $email = $_POST['email'];
                $password = $_POST['password'];


                // Check if the user exists in the database
                $loginQuery = "SELECT * FROM users WHERE email = '$email' ";
                $loginResult = $conn->query($loginQuery);


                if ($loginResult->num_rows >= 0) {
                    $user = $loginResult->fetch_assoc();
                    if (password_verify($password, $user['password'])) {
                        // User exists and credentials are correct
                        writeLog("Login successful. User ID: " . $user['users_id'] . ", Email: $email");
                        header('Content-Type: application/json');
                        echo json_encode(array( 'message' => 'Login successful, User ID: ' . $user['users_id'] , 'id' => ''. $user['users_id'] )   );
                    } else {
                        // Invalid credentials
                        writeLog("Invalid email or password. Email: $email : $password");
                        header('Content-Type: application/json');
                        echo json_encode(array('error' => 'Invalid email or password  '));
                    }
                } else {
                    // User does not exist
                    writeLog("Invalid email or password. Email: $email");
                    header('Content-Type: application/json');
                    echo json_encode(array('error' => 'Invalid email or password'));
                }
                break;
            // Add more actions here...
        }
    }
}

function writeLog($message) {
    global $logFile;
    $timestamp = date('Y-m-d H:i:s');
    $logMessage = $timestamp . ' - ' . $message . PHP_EOL;
    file_put_contents($logFile, $logMessage, FILE_APPEND);
}
