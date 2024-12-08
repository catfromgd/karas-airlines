<?php
    // Параметры для подключения к базе данных
    $servername = "localhost";  // сервер базы данных (чаще всего localhost)
    $username_db = "root";      // имя пользователя базы данных (по умолчанию root)
    $password_db = "";          // пароль базы данных (по умолчанию пусто)
    $dbname = "my_database";    // название базы данных

    // Подключение к базе данных
    $conn = new mysqli($servername, $username_db, $password_db, $dbname);

    // Проверка соединения
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    // Получение данных из формы
    $username = $_POST['username'];
    $email = $_POST['email'];
    $password = $_POST['password'];

    // Хеширование пароля перед сохранением
    $hashed_password = password_hash($password, PASSWORD_DEFAULT);

    // SQL запрос для вставки данных в таблицу users
    $sql = "INSERT INTO users (username, email, password) VALUES ('$username', '$email', '$hashed_password')";

    // Выполнение SQL запроса
    if ($conn->query($sql) === TRUE) {
        echo "Registration successful!";
    } else {
        echo "Error: " . $sql . "<br>" . $conn->error;
    }

    // Закрытие соединения
    $conn->close();
?>