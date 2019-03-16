// set interval
var interval = 5 * 1000; // 5 seconds
// set data
var data = {};

// run the system every specific intarval
setInterval(function() {
    // check the internet connection
    if(navigator.onLine) { // when the system is online
        console.log("I am online.");

        // get log data
        getLog();
        console.log(data);

    } else { // when the system is offline
        console.log("I am offline.");
    }
}, interval);

// get log data from local server using ajax
function getLog() {
    var xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function() {
        // check the status code
        if (this.readyState == 4 && this.status == 200) {
            if(this.responseText.length > 0) {
                data.log = JSON.parse(this.responseText);

                // reserved the database
                // addLog(data.log);
            }
        }
    };

    xhttp.open("POST", "log.php", true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send('status=pending&sync=pending');
}


