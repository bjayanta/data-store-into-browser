<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>Offline to online data synchronization</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
</head>
<body>

    <div>
        <h1>Hello World!</h1>
        <div id="output"></div>
    </div>

    <button onClick="addData('logs')">Inset data</button>
    <button onClick="getAll('logs')">Get all data</button>
    <button onClick="findById('logs', 1)">Find by Object ID</button>
    <button onClick="updateData('logs', 1)">Update by Object ID</button>
    <button onClick="deleteData('logs', 1)">Remove data by id</button>
    <button onClick="deleteDb('logdata')">Drop database</button>
    
    <script type="text/javascript" src="js/db.js"></script>
    <script type="text/javascript" src="js/main.js"></script>
</body>
</html>