// // set interval
// var interval = 5 * 1000; // 5 seconds
// // set data
// var data = {};

// // run the system every specific intarval
// setInterval(function() {
//     // check the internet connection
//     if(navigator.onLine) { // when the system is online
//         console.log("I am online.");

//         // get log data
//         getLog();
//         console.log(data);

//     } else { // when the system is offline
//         console.log("I am offline.");
//     }
// }, interval);

// // get log data from local server using ajax
// function getLog() {
//     var xhttp = new XMLHttpRequest();

//     xhttp.onreadystatechange = function() {
//         // check the status code
//         if (this.readyState == 4 && this.status == 200) {
//             if(this.responseText.length > 0) {
//                 data.log = JSON.parse(this.responseText);

//                 console.log(data.log);

//                 // reserved the database
//                 // addLog(data.log);
//             }
//         }
//     };

//     xhttp.open("POST", "log.php", true);
//     xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
//     xhttp.send('status=pending&sync=pending');
// }

// insert data
function addData(table) {
    // set multiple data
    var data = [
        {name: 'Jayanta Biswas', email: 'uis360.jayanta@gmail.com', status: 'pending'},
        {name: 'Robin Biswas', email: 'uis360.robin@gmail.com', status: 'pending'},
        {name: 'Sagor Biswas', email: 'uis360.sagor@gmail.com', status: 'pending'},
    ];

    // set single data
    // var data = {name: 'Robin Biswas', email: 'uis360.robin@gmail.com', status: 'pending'};

    // call insert method
    var result = insert(table, data);
    console.log(result);
}

// get all data
function getAll(table) {
    // get all 
    var result = all(table);
    console.log(result);
}

// find by id
function findById(table, id) {
    var result = find(table, id);
    console.log(result);
}

// remove data by id
function deleteData(table, id) {
    var result = remove(table, id);
    console.log(result);
}

// delete database 
function deleteDb(db) {
    var result = drop(db);
    console.log(result);
}

function updateData(table, id) {
    var data = {
        name: 'Neo',
        status: 'Done'
    };

    update(table, data, id)
}