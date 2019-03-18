// open database
var request = indexedDB.open('logdata', 1);
var response = {};

request.onupgradeneeded = function(e) {
    var db = e.target.result;
    console.log(db);

    if(!db.objectStoreNames.contains('logs')) {
        var os = db.createObjectStore('logs', {keyPath: "objectID", autoIncrement: true});

        // create index for name
        os.createIndex('objectID', 'objectID', {unique: true});
        os.createIndex('name', 'name', {unique: false});
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

// insert data into contains
function insert(contains, data) {
    var transaction = db.transaction(["logs"], "readwrite");

    // ask for object store
    var store = transaction.objectStore("logs");

    // check data length
    if(data.length > 0) {
        for(i in data) {
            var request = store.add(data[i]); // perform the insert
        }
    } else {
        var request = store.add(data); // perform the insert
    }

    // success
    request.onsuccess = function(e) {
        response.lastInsertedID = request.result;
    }

    // error
    request.onerror = function(e) {
        response.errors = e.target.error.name;
    }

    // return the response data
    return response;
}

// read all data
function all(contains) {
    var transaction = db.transaction([contains], "readonly");

    // ask for object store
    var store = transaction.objectStore(contains);
    
    var index = store.index('objectID');

    var output = [];

    index.openCursor().onsuccess = function(e) {
        var cursor = e.target.result;

        if(cursor) {
            output.push(cursor.value);

            cursor.continue();
        }
    }

    // console.log(output);
    return output;
}

// read data by object id
function find(contains, oid) {
    var records = {};
    var transaction = db.transaction([contains], 'readonly');

    // ask for object store
    var store = transaction.objectStore(contains);
    var request = store.get(oid);

    request.onsuccess = function() {
        for(i in request.result) {
            records[i] = request.result[i];
        }
    }

    // console.log(records);
    return records;
}

// update data 
function update(contains, data, oid) {
    var transaction = db.transaction([contains], 'readwrite');

    // ask for object store
    var store = transaction.objectStore(contains);

    var request = store.get(oid);

    request.onsuccess = function() {
        var row = request.result;

        for(i in data) {
            row[i] = data[i];
        }

        var requestUpdate = store.put(row);

        requestUpdate.onsuccess = function() {
            console.log(requestUpdate.result);
        }

        requestUpdate.onerror = function(e) {
            console.log(e.target.error.name);
        }
    }
}

// delete data from contains
function remove(contains, oid) {
    var transaction = db.transaction([contains], "readwrite");

    // ask for object store
    var store = transaction.objectStore(contains);

    var request = store.delete(oid);

    // success
    request.onsuccess = function() {
        response.status = true;
    }

    return response;
}

// delete database
function drop(db) {
    return indexedDB.deleteDatabase(db);
}

// display log
function showLogs() {
    var transaction = db.transaction(["logs"], "readonly");

    // ask for object store
    var store = transaction.objectStore("logs");
    
    var index = store.index('objectID');

    var output = '';
    var records = [];

    index.openCursor().onsuccess = function(e) {
        var cursor = e.target.result;

        if(cursor) {
            output += '<p id="log-' + cursor.value.objectID + '">' + cursor.value.objectID + " - " + cursor.value.name + " - " + cursor.value.status + '<button type="button" onClick="deleteLog(' + cursor.value.objectID + ')">Delete</button>' + '</p>';

            records.push(cursor.value);

            cursor.continue();
        }

        document.getElementById('output').innerHTML = output;
    }

    console.log(records);
}
