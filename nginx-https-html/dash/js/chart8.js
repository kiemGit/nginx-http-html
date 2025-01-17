const data1 = {
    labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple'],
    datasets: [
        {
            data: [10, 21, 5, 11, 7],
            backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'],
            hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'],
        },
    ],
};

// Custom plugin for external labels
const externalLabelsPlugin1 = {
    id: 'externalLabels',
    afterDraw(chart1) {
        const { ctx } = chart1;
        const { width, height } = chart1;
        const { datasets } = chart1.data;
        const meta = chart1.getDatasetMeta(0);

        meta.data.forEach((element, index) => {
            const dataset1 = datasets[0];
            const { labels } = chart1.data;
            const value = dataset1.data[index];

            const labelText1 = `${labels[index]}: ${value}`;
            const position = element.tooltipPosition();

            const radius = chart1.innerRadius + (chart1.outerRadius - chart1.innerRadius) / 2;

            const angle = element.startAngle + (element.endAngle - element.startAngle) / 2;

            const x1 = chart1.width / 2 + Math.cos(angle) * radius * 1.3;
            const y1 = chart1.height / 2 + Math.sin(angle) * radius * 1.3;

            ctx.fillStyle = '#333';
            ctx.font = '14px Arial';
            ctx.textAlign = 'center';
            ctx.fillText(labelText1, x1, y1);
        });
    },
};

const config1 = {
    type: 'pie',
    data: data1,
    options: {
        responsive: true,
        plugins: {
            legend: {
                display: false, // Hide default legend
            },
        },
    },
    plugins: [externalLabelsPlugin1],
};

const pieChart1 = new Chart(document.getElementById('pieChart12'), config1);

