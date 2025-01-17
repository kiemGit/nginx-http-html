function formatNumberWithCommasOn(value) {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

var chart_data_on = {
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
const ctx_on = document.getElementById('overnight_pie').getContext('2d');
const chart_on = new Chart(ctx_on, {
    type: 'pie', //line, radar, pie, bar, 
    data: chart_data_on,
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
                    return value; // Format with commas
                },
            }
        }
    },
    plugins: [ChartDataLabels]
});

// Create WebSocket connection
const socket_data_on = new WebSocket('wss://wsdash.work.gd.');

// Function to update chart with new JSON data
function updata_chart_on(label, data) {
    chart_on.data.labels = label;
    chart_on.data.datasets[0].label1_bar = label;
    chart_on.data.datasets[0].data = data;
    chart_on.update();
}

// Listen for messages from the WebSocket
socket_data_on.addEventListener('message', function (event) {
    const jsonData = JSON.parse(event.data);
    console.log(jsonData)
    const vech_data = jsonData['message']
    console.log(vech_data)
    console.log("data all : ", vech_data[2])
    let nameListOn = [];
    let rateOn = [];
    vech_data[2].forEach(function (item) {
        nameListOn.push(item.Vehicle);
    });
    console.log(nameListOn)

    vech_data[2].forEach(function (item) {
        rateOn.push(item.Count_vehicle);
    });
    console.log("rate: ", rateOn)
    if (nameListOn && rateOn) {
        updata_chart_on(nameListOn, rateOn);
    } else {
        console.error('Invalid data format');
    }
});

// Handle WebSocket errors
socket_data_on.addEventListener('error', function (error) {
    console.error('WebSocket error:', error);
});

// Handle WebSocket connection close
socket_data_on.addEventListener('close', function () {
    console.log('WebSocket connection closed');
});