function formatNumberWithCommas(value) {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

var chartdataY1 = {
    datasets: [
        {
            label: 'Rate',
            borderWidth: 1,
            borderRadius: 1,
            borderSkipped: false,
            spacing: 1,
            data: [],
            backgroundColor: [
                'rgba(255, 99, 132, 0.6)',
                'rgba(54, 162, 235, 0.6)',
                'rgba(255, 206, 86, 0.6)',
                'rgba(75, 192, 192, 0.6)',
                'rgba(153, 102, 255, 0.6)',
                'rgba(255, 159, 64, 0.6)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
        }
    ]
};
const ctxBar = document.getElementById('radarChart').getContext('2d');
const chart = new Chart(ctxBar, {
    type: 'pie', //line, radar, pie, bar, 
    data: chartdataY1,
    options: {
        // responsive: true,
        // maintainAspectRatio: false,
        plugins: {
            tooltip: {
                callbacks: {
                    title: function (tooltipItems) {
                        // Customize tooltip to show full day name with date
                        if (tooltipItems[0].datasetIndex === 0) {
                            // return 'dataset 0';
                            console.log("tooltips data: ", tooltipItems[0].dataIndex)
                            console.log(tooltipItems[0].label)
                            const date = new Date(tooltipItems[0].dataset.label1_bar[tooltipItems[0].dataIndex]);
                            return tooltipItems[0].label
                        }
                        if (tooltipItems[0].datasetIndex === 1) {
                            const date = new Date(tooltipItems[0].dataset.label2_bar[tooltipItems[0].dataIndex]);
                            return tooltipItems[0].label
                        };
                    }
                }
            },
            scales: {
                xAxes: [{
                    display: true,
                    scaleLabel: {
                        display: true,
                        labelString: 'Month'
                    }
                }],
                yAxes: [{
                    display: true,
                    ticks: {
                        beginAtZero: true,
                    }
                }]
            },
            legend: {
                position: 'bottom',
                display: true,
                labels: {
                    color: 'rgb(13, 12, 12)',
                    font: {
                        size: 7,
                    },
                    boxWidth: 20,     // Width of the legend marker
                    boxHeight: 10,    // Height of the legend marker (Chart.js v4+)
                    usePointStyle: true, // Use a circular marker instead of a box
                    pointStyle: 'circle', // Shape of the marker (circle, rect, etc.)
                }
            },
            datalabels: {
                color: '#fff', // Text color
                font: {
                    size: 7, // Font size
                    // weight: 'bold' // Bold font
                },
                formatter: (value) => {
                    return formatNumberWithCommas(value); // Format with commas
                },
            }
        }
    },
    plugins: [ChartDataLabels]
});

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
    console.log(vech_data)
    console.log("data all : ", vech_data[1])
    let nameList = [];
    let rate = [];
    vech_data[1].forEach(function (item) {
        nameList.push(item.Vehicle);
    });
    console.log(nameList)

    vech_data[1].forEach(function (item) {
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