function formatNumberWithCommas(value) {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

// Create WebSocket connection
const socket = new WebSocket('wss://wsdash.work.gd.');

// Function to update chart with new JSON data
function updateChart(label, data) {
    chart.data.labels = label;
    chart.data.datasets[0].label1_bar = label;
    chart.data.datasets[0].data = data;
    chart.update();
}

// Listen for messages from the WebSocket
socket.addEventListener('message', function (event) {
    const jsonData = JSON.parse(event.data);
    console.log(jsonData)
    const vech_data = jsonData['message']
    console.log("json data: ",vech_data)
    console.log("data all : ", vech_data[2])
    let nameList = [];
    let rate = [];
    vech_data[2].forEach(function (item) {
        nameList.push(item.Vehicle);
    });
    console.log(nameList)

    vech_data[2].forEach(function (item) {
        rate.push(item.Rate);
    });
    console.log("rate: ", rate)
    if (nameList && rate) {
        updateChart(nameList, rate);
    } else {
        console.error('Invalid data format');
    }
});

// Handle WebSocket errors
socket.addEventListener('error', function (error) {
    console.error('WebSocket error:', error);
});

// Handle WebSocket connection close
socket.addEventListener('close', function () {
    console.log('WebSocket connection closed');
});