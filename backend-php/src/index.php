<?

$pdo = new PDO('sqlite:/home/dk/gitLair/paystub-dash/backend-php/data/data.db');

$pdo->exec("INSERT INTO companies (name, alias) VALUES ('Denys', 'dk')");
