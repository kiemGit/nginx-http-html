var chartdataY2 = {
    labels: [],
    datasets: [
        {
            label1_bar: [],
            label: 'Quantity',
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
const ctxBar1 = document.getElementById('qtyChart').getContext('2d');
const chart1 = new Chart(ctxBar1, {
    type: 'pie', //line, radar, pie, bar, 
    data: chartdataY2,
    options: {
        plugins: {
            tooltip: {
                callbacks: {
                    title: function (tooltipItems) {
                        if (tooltipItems[0].datasetIndex === 0) {
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
                position: 'right',
                display: true,
                labels: {
                    color: 'rgb(13, 12, 12)',
                    font: {
                        size: 7, // Font size
                    },
                    boxWidth: 20,     // Width of the legend marker
                    boxHeight: 10,    // Height of the legend marker (Chart.js v4+)
                    usePointStyle: true, // Use a circular marker instead of a box
                    pointStyle: 'circle', // Shape of the marker (circle, rect, etc.)
                },
            },
            datalabels: {
                color: '#fff', // Text color
                font: {
                    size: 7, // Font size
                },
                formatter: (value, ctx) => {
                    return value; // Show raw value
                },
                anchor: 'end',   // Position relative to data point
                align: 'top',    // Alignment relative to anchor
                offset: 5,       // Offset in pixels from the anchor point
            }
        }
    },
    plugins: [ChartDataLabels]
});
const socket1 = new WebSocket('wss://wsdash.work.gd.');
function updateChart1(label, data, label1, data1) {
    chart1.data.labels = label;
    chart1.data.datasets[0].label1_bar = label;
    chart1.data.datasets[0].data = data;
    chart1.update();
}
socket1.addEventListener('message', function (event) {
    const jsonData = JSON.parse(event.data);
    console.log(jsonData)
    const vech_data = jsonData['message']
    console.log(vech_data)
    console.log("data all : ", vech_data[1])
    let nameList = [];
    let rate = [];
    let nameList1 = [];
    let rate1 = [];
    vech_data[1].forEach(function (item) {
        nameList.push(item.Vehicle);
    });
    console.log(nameList)
    vech_data[1].forEach(function (item) {
        rate.push(item.Count_vehicle);
    });
    console.log("rate: ", rate)
    console.log("rate1 :", rate1)
    if (nameList && rate) {
        updateChart1(nameList, rate, nameList1, rate1);
    } else {
        console.error('Invalid data format');
    }
});
socket1.addEventListener('error', function (error) {
    console.error('WebSocket error:', error);
});
socket1.addEventListener('close', function () {
    console.log('WebSocket connection closed');
});