const data = {
    labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple'],
    datasets: [
        {
            data: [12, 19, 3, 5, 2],
            backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'],
            hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'],
        },
    ],
};

// Custom plugin for external labels
const externalLabelsPlugin = {
    id: 'externalLabels',
    afterDraw(chart) {
        const { ctx } = chart;
        const { width, height } = chart;
        const { datasets } = chart.data;
        const meta = chart.getDatasetMeta(0);

        meta.data.forEach((element, index) => {
            const dataset = datasets[0];
            const { labels } = chart.data;
            const value = dataset.data[index];

            const labelText = `${labels[index]}: ${value}`;
            const position = element.tooltipPosition();

            const radius = chart.innerRadius + (chart.outerRadius - chart.innerRadius) / 2;

            const angle = element.startAngle + (element.endAngle - element.startAngle) / 2;

            const x = chart.width / 2 + Math.cos(angle) * radius * 1.3;
            const y = chart.height / 2 + Math.sin(angle) * radius * 1.3;

            ctx.fillStyle = '#333';
            ctx.font = '14px Arial';
            ctx.textAlign = 'center';
            ctx.fillText(labelText, x, y);
        });
    },
};

const config = {
    type: 'pie',
    data: data,
    options: {
        responsive: true,
        plugins: {
            legend: {
                display: false, // Hide default legend
            },
        },
    },
    plugins: [externalLabelsPlugin],
};

const pieChart = new Chart(document.getElementById('pieChart'), config);

