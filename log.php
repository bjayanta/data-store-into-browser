<?php 
// set collection 
$collection = [
    ['name' => 'Jayanta Biswas', 'status' => 'done'],
    ['name' => 'Suman Rajvor', 'status' => 'done'],
    ['name' => 'Maruf Hasan', 'status' => 'done'],
    ['name' => 'Imran Sajjad', 'status' => 'pending'],
    ['name' => 'Ariful Islam', 'status' => 'pending'],
    ['name' => 'Nawaz Ali', 'status' => 'pending'],
    ['name' => 'Mobarock Hosian Joy', 'status' => 'pending'],
    ['name' => 'Sadik Hosen', 'status' => 'pending'],
    ['name' => 'Lufur Ahmad', 'status' => 'pending'],
    ['name' => 'Titu Akand', 'status' => 'pending'],
];

$result = [];

foreach($collection as $key => $data) {
    if($data['status'] == $_REQUEST['status']) {
        $result[] = $data;
    }
}

// get data from collection
echo json_encode($result);
?>