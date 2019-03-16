// open database
var request = indexedDB.open('logdata', 1);

request.onupgradeneeded = function(e) {
    var db = e.target.result;

    if(!db.objectStoreNames.contains('logs')) {
        var os = db.createObjectStore('logs', {keyPath: "id", autoIncrement: true});

        // create index for name
        os.createIndex('name', 'name', {unique: false});
        os.createIndex('email', 'email', {unique: true});
        os.createIndex('day', 'day', {unique: false});
        os.createIndex('month', 'month', {unique: false});
        os.createIndex('year', 'year', {unique: false});
    }
}

// success
request.onsuccess = function(e) {
    console.log('Success: Open Database ...');
    db = e.target.result;

    // show logs
    showLogs();
}

// error
request.onerror = function() {
    console.log('Error: Could not Open Database ...');
}

// add log data
function addLog(data) {
    var transaction = db.transaction(["logs"], "readwrite");

    // ask for object store
    var store = transaction.objectStore("logs");

    // check data length
    if(data.length > 0) {
        for(i in data) {
            // perform the insert
            var request = store.add(data[i]);
        }
    }

    // success
    request.onsuccess = function(e) {
        window.location.href = "index.php";
    }

    // error
    request.onerror = function(e) {
        alert("Sorry, the log was not added!");
        console.log('Error', e.target.error.name);
    }
}

// display log
function showLogs() {
    var transaction = db.transaction(["logs"], "readonly");

    // ask for object store
    var store = transaction.objectStore("logs");
    
    var index = store.index('name');

    var output = '';
    index.openCursor().onsuccess = function(e) {
        var cursor = e.target.result;

        if(cursor) {
            output += '<p id="log-' + cursor.value.id + '">' + cursor.value.id + " - " + cursor.value.name + " - " + cursor.value.status + '<button type="button" onClick="deleteLog(' + cursor.value.id + ')">Delete</button>' + '</p>';

            cursor.continue();
        }

        document.getElementById('output').innerHTML = output;
    }
}

// clear all log
function clearLogs() {
    indexedDB.deleteDatabase('logdata');
    window.location.href = 'index.php'
}

// delete data
function deleteLog(id) {
    var transaction = db.transaction(["logs"], "readwrite");

    // ask for object store
    var store = transaction.objectStore("logs");

    var request = store.delete(id);

    request.onsuccess = function() {
        console.log("Log " + id + " is deleted!");

        // remove the dom element
        document.getElementById('log-' + id).remove();
    }

    console.log(id);
}
