$(document).ready(function () {
    const searchParams = new URLSearchParams(window.location.search);
    console.log(searchParams.get('userId'));
    var userId = searchParams.get('userId');
    var locId = searchParams.get('locId');
    objYear = 2023
    const current_year = new Date().getFullYear();
    const lasy_year_ = parseInt(current_year) - Number(1);
    objYearCurrent = 2024
    const domain = window.location.host;
    if (locId) {
        console.log("locID URL" + locId)
        // var urlGetData = "http://192.168.0.19:8007/dash/php/dataByLocId.php?userId=4&locId=479"
        // var urlGetDataWeek = "http://192.168.0.19:8007/dash/php/weekly.php?userId=4&locId=479"
        var urlGetData = "https://rsudcibinong.sapcpms.com/dash/php/dataByLocId.php?userId=4&locId=479"
        var urlGetDataWeek = "https://rsudcibinong.sapcpms.com/dash/php/weekly.php?userId=4&locId=479"
        // var urlGetData = "https://"+ domain + "/dash/php/dataByLocId.php?userId=" + userId + "&locId=" + locId
        // var urlGetDataWeek = "https://rsudcibinong.sapcpms.com/dash/php/weekly.php?userId=" + userId + "&locId=" + locId
    }
    else {
        // var urlGetData = "http://192.168.0.19:8007/dash/php/arrPush.php?userId=4"
        var urlGetData = "https://rsudcibinong.sapcpms.com/dash/php/arrPush.php?userId=4"
        // var urlGetDataWeek = "http://192.168.0.19:8007/dash/php/weekly.php?userId=4"
        var urlGetDataWeek = "https://rsudcibinong.sapcpms.com/dash/php/weekly.php?userId=4"
        // var urlGetData = "https://"+ domain + "/dash/php/arrPush.php?userId=" + userId
        // var urlGetDataWeek = "https://"+ domain + "/dash/php/weekly.php?userId=" + userId
    }
    function getDataChart() {
        $.getJSON(urlGetData, function (objY) {
            console.log("current year " + current_year);
            console.log("last year " + lasy_year_);
            var bulany = [];
            var tahunLalu = [];
            var tahunBerjalan = [];
            var label1_bar = [];
            var label2_bar = [];
            Object.keys(objY["t" + lasy_year_]).forEach(function (key) {
                console.log(objY["t" + lasy_year_][key].month);
                bulany.push(objY["t" + lasy_year_][key].month);
            });
            Object.keys(objY["t" + lasy_year_]).forEach(function (key) {
                console.log(objY["t" + lasy_year_][key].rate);
                tahunLalu.push(objY["t" + lasy_year_][key].rate);
            });
            Object.keys(objY["t" + lasy_year_]).forEach(function (key) {
                console.log(objY["t" + lasy_year_][key].full_date);
                label1_bar.push(objY["t" + lasy_year_][key].full_date);
            });
            Object.keys(objY["t" + current_year]).forEach(function (key) {
                console.log(objY["t" + current_year][key].rate);
                tahunBerjalan.push(objY["t" + current_year][key].rate);
            });
            Object.keys(objY["t" + current_year]).forEach(function (key) {
                console.log(objY["t" + current_year][key].full_date);
                label2_bar.push(objY["t" + current_year][key].full_date);
            });
            console.log(tahunLalu);
            console.log(tahunBerjalan);
            const labels = bulany
            var chartdataY = {
                labels: labels,
                datasets: [
                    {
                        label1_bar: label1_bar,
                        label: 'Tahun Lalu',
                        borderWidth: 1,
                        borderRadius: 45,
                        borderSkipped: false,
                        maxBarThickness: 25,
                        data: tahunLalu,
                    },
                    {
                        label2_bar: label2_bar,
                        label: 'Tahun Berjalan',
                        borderWidth: 1,
                        borderRadius: 45,
                        borderSkipped: false,
                        maxBarThickness: 25,
                        data: tahunBerjalan,
                    }
                ]
            };
            // JS - Destroy exiting Chart Instance to reuse <canvas> element
            let chartStatus = Chart.getChart("mycanvasYear"); // <canvas> id
            if (chartStatus != undefined) {
                chartStatus.destroy();
            }
            //-- End of chart destroy   
            var ctxYear = $("#mycanvasYear");
            var barGraphYear = new Chart(ctxYear, {
                type: 'bar',
                data: chartdataY,
                options: {
                    plugins: {
                        tooltip: {
                            callbacks: {
                                title: function (tooltipItems) {
                                    // Customize tooltip to show full day name with date
                                    if (tooltipItems[0].datasetIndex === 0) {
                                        // return 'dataset 0';
                                        console.log(tooltipItems[0].dataIndex)
                                        console.log(tooltipItems)
                                        const date = new Date(tooltipItems[0].dataset.label1_bar[tooltipItems[0].dataIndex]);
                                        return date.toLocaleDateString('en-US', {
                                            year: 'numeric',
                                            month: 'long',
                                        });
                                    }
                                    if (tooltipItems[0].datasetIndex === 1) {
                                        const date = new Date(tooltipItems[0].dataset.label2_bar[tooltipItems[0].dataIndex]);
                                        return date.toLocaleDateString('en-US', { //ref: https://www.w3schools.com/jsref/jsref_tolocalestring.asp
                                            year: 'numeric',
                                            month: 'long',
                                        });
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
                                    size: 7, // Font size
                                },
                                boxWidth: 20,     // Width of the legend marker
                                boxHeight: 10,    // Height of the legend marker (Chart.js v4+)
                                usePointStyle: true, // Use a circular marker instead of a box
                                pointStyle: 'circle', // Shape of the marker (circle, rect, etc.)
                            }
                        }
                    }
                }
            });
        });
        $.getJSON(urlGetDataWeek, function (obj) {
            var l = [];
            $.each(obj, function (key, value) {
                console.log(value);
                l.push(value);
            });
            var data = [];
            var bulan = [];
            var label_tooltip = [];
            var label_tooltip_curret_week = [];
            var tahunLalu = [];
            var tahunBerjalan = [];
            for (var i in l) {
                data.push(l);
            }
            Object.keys(obj["t" + lasy_year_]).forEach(function (key) {
                console.log(obj["t" + lasy_year_][key].day);
                bulan.push(obj["t" + lasy_year_][key].day);
            });
            Object.keys(obj["t" + lasy_year_]).forEach(function (key) {
                console.log(obj["t" + lasy_year_][key].date_full);
                label_tooltip.push(obj["t" + lasy_year_][key].date_full);
            });
            Object.keys(obj["t" + current_year]).forEach(function (key) {
                console.log(obj["t" + current_year][key].date_full);
                label_tooltip_curret_week.push(obj["t" + current_year][key].date_full);
            });
            Object.keys(obj["t" + lasy_year_]).forEach(function (key) {
                console.log(obj["t" + lasy_year_][key].rate);
                tahunLalu.push(obj["t" + lasy_year_][key].rate);
            });
            Object.keys(obj["t" + current_year]).forEach(function (key) {
                console.log(obj["t" + current_year][key].rate);
                tahunBerjalan.push(obj["t" + current_year][key].rate);
            });
            console.log(tahunLalu);
            console.log(tahunBerjalan);
            var chartdata = {
                labels: bulan,
                datasets: [
                    {
                        labels1: label_tooltip,
                        label: 'Minggu Lalu',
                        borderWidth: 5,
                        borderRadius: 45,
                        borderSkipped: false,
                        maxBarThickness: 25,
                        data: tahunLalu,
                    },
                    {
                        labels2: label_tooltip_curret_week,
                        label: 'Minggu Berjalan',
                        borderWidth: 5,
                        borderRadius: 45,
                        borderSkipped: false,
                        maxBarThickness: 25,
                        data: tahunBerjalan,
                    }
                ]
            };
            console.log(chartdata.datasets[0].labels1)
            console.log("data set 0 : " + chartdata.datasets[0].data[0])
            // JS - Destroy exiting Chart Instance to reuse <canvas> element
            let chartStatusLine = Chart.getChart("mycanvasBar"); // <canvas> id
            if (chartStatusLine != undefined) {
                chartStatusLine.destroy();
            }
            //-- End of chart destroy  
            var ctxBar = $("#mycanvasBar");
            new Chart(ctxBar, {
                type: 'line',
                data: chartdata,
                options: {
                    plugins: {
                        tooltip: {
                            callbacks: {
                                title: function (tooltipItems) {
                                    // Customize tooltip to show full day name with date
                                    if (tooltipItems[0].datasetIndex === 0) {
                                        console.log(tooltipItems[0].dataIndex)
                                        console.log(tooltipItems)
                                        const date = new Date(tooltipItems[0].dataset.labels1[tooltipItems[0].dataIndex]);
                                        return date.toLocaleDateString('en-US', {
                                            weekday: 'long', // Full day name (e.g., Monday)
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric'
                                        });
                                    }
                                    if (tooltipItems[0].datasetIndex === 1) {
                                        const date = new Date(tooltipItems[0].dataset.labels2[tooltipItems[0].dataIndex]);
                                        return date.toLocaleDateString('en-US', { //ref: https://www.w3schools.com/jsref/jsref_tolocalestring.asp
                                            weekday: 'long', // Full day name (e.g., Monday)
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric'
                                        });
                                    };
                                }
                            }
                        },
                        legend: {
                            position: 'bottom',
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
                            }
                        }
                    }
                }
            });

        });
    }
    window.onload = getDataChart;
    setInterval(function () {
        getDataChart()
    }, 10000);
});