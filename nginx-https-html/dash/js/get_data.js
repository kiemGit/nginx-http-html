$(document).ready(function () {

    const searchParams = new URLSearchParams(window.location.search);
    console.log(searchParams.get('userId'));
    var userId = searchParams.get('userId');
    //objYear = 2019
    //objYearCurrent = 2020
    // objYear = 2024
    // objYearCurrent = 2025
    const objYearCurrent = new Date().getFullYear();
    const objYear = parseInt(objYearCurrent) - Number(1);
    var locId = searchParams.get('locId');
    if (locId) {
        console.log("locID URL" + locId)
        getDataHeader()
    }
    else {
        getListLocation()
    }

    function getListLocation() {
        // $('#myTable1').empty();
        $('#myTable').empty();
        // $.getJSON("http://192.168.0.19:8007/dash/php/listLoc.php?userId=4", function (obj) {
        $.getJSON("https://rsudcibinong.sapcpms.com/dash/php/listLoc.php?userId=4", function (obj) {
            let USDollar = new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'IDR',
            });
            let date = new Date();
            let year = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(date);
            let month = new Intl.DateTimeFormat('en', { month: 'short' }).format(date);
            let day = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(date);
            const dayNow = date.getDay();
            const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
            // console.log(`${day}-${month}-${year}`);
            // document.getElementById('TanggalSekarang').innerHTML = 'Total Income Dari ' + tahunBerjalan.length + ' Lokasi Pada ' + dayNames[dayNow] + ', ' + `${day}-${month}-${year}`;
            // console.log(date.toLocaleTimeString());
            document.getElementById('JamUpdate').innerHTML = 'Last Update: ' + date.toLocaleTimeString();
            // const price = 14340;
            // console.log(`The formated version of ${price} is ${USDollar.format(price)}`);
            var rateTotalTahunBerjalan = 0;
            var tahunBerjalan = [];
            

            // var l = [];
            // $.each(obj, function (key, value) {
            //     console.log(value);
            // });
            // var data = [];
            // var tahunLalu = [];
            // var tahunBerjalan = [];
            // var rateTotal = 0;
            // var rateTotalTahunBerjalan = 0;
            // var countArr = 0;
            var rowCheck = '';
            // for (var i in l) {
            //     data.push(l);
            // }

            Object.keys(obj["t" + objYear]).forEach(function (key) {
                // console.log('end array of object; ' + obj["t" + objYear].length);
                // console.log('last value in array: ' + obj["t" + objYear].lastIndexOf(obj["t" + objYear][key].rate));
                // console.log("loc: ", obj["t" + objYearCurrent][key].loc)
                // console.log("year: ", obj["t" + objYear][key].Year)
                // console.log("rate: ", USDollar.format(obj["t" + objYear][key].rate))
                var table = document.getElementById('myTable')
                // var row1 = `<tr><td>test</td><td>test1</td></tr>`
                var row =
                    `<tr>
                        <td class="text-sm border border-gray-300 px-4 py-1">${obj["t" + objYearCurrent][key].loc}</td>
                        <td class="text-sm border border-gray-300 px-4 py-1">${obj["t" + objYearCurrent][key].Year}</td>
                        <td class="text-sm border border-gray-300 px-4 py-1" align="right">${USDollar.format(obj["t" + objYear][key].rate)}</td>
                    </tr>`;
                table.innerHTML += row;
            });

            Object.keys(obj["t" + objYearCurrent]).forEach(function (key) {
                console.log("Rate tahun berjalan :",obj["t" + objYearCurrent][key].rate);
                tahunBerjalan.push(obj["t" + objYearCurrent][key].rate);
                rateTotalTahunBerjalan += parseInt(obj["t" + objYearCurrent][key].rate);
            });
            console.log('RateTotalTahunBerjalan: ' + rateTotalTahunBerjalan);
            document.getElementById("RateTotal").innerHTML = `${USDollar.format(parseInt(rateTotalTahunBerjalan))}`;
            document.getElementById('TanggalSekarang').innerHTML = 'Total Income Dari ' + tahunBerjalan.length + ' Lokasi Pada ' + dayNames[dayNow] + ', ' + `${day}-${month}-${year}`;
            // Object.keys(obj["t" + objYearCurrent]).forEach(function (key) {
            //     var link = "test";
            //     console.log(obj["t" + objYearCurrent][key].loc);
            //     var table1 = document.getElementById('myTable1')
            //     var row1 = `<tr>
            //                     <td>${'<a href="index_0.html?userId=' + userId + '&locId=' + obj["t" + objYearCurrent][key].locId + '">' + obj["t" + objYearCurrent][key].loc + '</a>'}</td>
            //                     <td>${obj["t" + objYearCurrent][key].Year}</td>
            //                     <td align="right">${USDollar.format(obj["t" + objYearCurrent][key].rate)}</td>
            //             </tr>`
            //     table1.innerHTML += row1
            // });

            // Object.keys(obj["t" + objYearCurrent]).forEach(function (key) {
            //     console.log(obj["t" + objYearCurrent][key].rate);
            //     tahunLalu.push(obj["t" + objYearCurrent][key].rate);
            //     //rateTotal += obj["t2023"][key].rate;
            //     rateTotal += parseInt(obj["t" + objYearCurrent][key].rate);
            // });
            // Object.keys(obj["t" + objYearCurrent]).forEach(function (key) {
            //     console.log(obj["t" + objYearCurrent][key].rate);
            //     tahunBerjalan.push(obj["t" + objYearCurrent][key].rate);
            //     rateTotalTahunBerjalan += parseInt(obj["t" + objYearCurrent][key].rate);
            // });
            // console.log(tahunLalu);
            // console.log(tahunBerjalan);
            // console.log(rateTotal);
            // console.log(tahunBerjalan.length);
            // console.log('RateTotalTahunBerjalan' + rateTotalTahunBerjalan);

            // let date = new Date();
            // let year = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(date);
            // let month = new Intl.DateTimeFormat('en', { month: 'short' }).format(date);
            // let day = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(date);
            // const dayNow = date.getDay();
            // const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
            // console.log(`${day}-${month}-${year}`);
            // document.getElementById('TanggalSekarang').innerHTML = 'Total Income Dari ' + tahunBerjalan.length + ' Lokasi Pada ' + dayNames[dayNow] + ', ' + `${day}-${month}-${year}`;
            // console.log(date.toLocaleTimeString());
            // document.getElementById('JamUpdate').innerHTML = 'Last Update: ' + date.toLocaleTimeString();
            // const price = 14340;
            // console.log(`The formated version of ${price} is ${USDollar.format(price)}`);
            // document.getElementById("RateTotal").innerHTML = `${USDollar.format(parseInt(rateTotalTahunBerjalan))}`;
        });
    }

    // function getDataHeader() {
    //     $('#myTable1').empty();
    //     $.getJSON("http://192.168.0.19:8007/dash/php/listLoc.php?userId=" + userId + "&locId=" + locId, function (obj) {
    //         let USDollar = new Intl.NumberFormat('en-US', {
    //             style: 'currency',
    //             currency: 'IDR',
    //         });
    //         var l = [];
    //         $.each(obj, function (key, value) {
    //             console.log(value);
    //         });
    //         var data = [];
    //         var tahunLalu = [];
    //         var tahunBerjalan = [];
    //         var rateTotal = 0;
    //         var rateTotalTahunBerjalan = 0;
    //         var countArr = 0;
    //         var rowCheck = '';
    //         for (var i in l) {
    //             data.push(l);
    //         }
    //         Object.keys(obj["t" + objYear]).forEach(function (key) {
    //             console.log('end array of object; ' + obj["t" + objYear].length);
    //             console.log('last value in array: ' + obj["t" + objYear].lastIndexOf(obj["t" + objYear][key].rate));
    //             var table = document.getElementById('myTable')
    //             var row1 = `<tr><td>test</td><td>test1</td></tr>`
    //             var row =
    //                 `
    //                     <tr>
    //                             <td>${obj["t" + objYearCurrent][key].loc}</td>
    //                             <td>${obj["t" + objYear][key].Year}</td>
    //                             <td align="right">${USDollar.format(obj["t" + objYear][key].rate)}</td>
    //                     </tr>`;
    //             table.innerHTML += rowCheck;
    //         });
    //         Object.keys(obj["t" + objYearCurrent]).forEach(function (key) {
    //             var link = "test";
    //             console.log(obj["t" + objYearCurrent][key].loc);
    //             var table1 = document.getElementById('myTable1')
    //             var row1 = `<tr>
    //                             <td>${'<a href="index_0.html?userId=' + userId + '&locId=' + obj["t" + objYearCurrent][key].locId + '">' + obj["t" + objYearCurrent][key].loc + '</a>'}</td>
    //                             <td>${obj["t" + objYearCurrent][key].Year}</td>
    //                             <td align="right">${USDollar.format(obj["t" + objYearCurrent][key].rate)}</td>
    //                     </tr>`
    //             table1.innerHTML += row1
    //         });
    //         Object.keys(obj["t" + objYearCurrent]).forEach(function (key) {
    //             console.log(obj["t" + objYearCurrent][key].rate);
    //             tahunLalu.push(obj["t" + objYearCurrent][key].rate);
    //             //rateTotal += obj["t2023"][key].rate;
    //             rateTotal += parseInt(obj["t" + objYearCurrent][key].rate);
    //         });
    //         Object.keys(obj["t" + objYearCurrent]).forEach(function (key) {
    //             console.log(obj["t" + objYearCurrent][key].rate);
    //             tahunBerjalan.push(obj["t" + objYearCurrent][key].rate);
    //             rateTotalTahunBerjalan += parseInt(obj["t" + objYearCurrent][key].rate);
    //         });
    //         console.log(tahunLalu);
    //         console.log(tahunBerjalan);
    //         console.log(rateTotal);
    //         console.log(tahunBerjalan.length);
    //         console.log('RateTotalTahunBerjalan' + rateTotalTahunBerjalan);
    //         let date = new Date();
    //         let year = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(date);
    //         let month = new Intl.DateTimeFormat('en', { month: 'short' }).format(date);
    //         let day = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(date);
    //         const dayNow = date.getDay();
    //         const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    //         console.log(`${day}-${month}-${year}`);
    //         document.getElementById('TanggalSekarang').innerHTML = 'Total Income Dari ' + tahunBerjalan.length + ' Lokasi Pada ' + dayNames[dayNow] + ', ' + `${day}-${month}-${year}`;
    //         console.log(date.toLocaleTimeString());
    //         document.getElementById('JamUpdate').innerHTML = 'Last Update: ' + date.toLocaleTimeString();
    //         const price = 14340;
    //         console.log(`The formated version of ${price} is ${USDollar.format(price)}`);
    //         document.getElementById("RateTotal").innerHTML = `${USDollar.format(parseInt(rateTotalTahunBerjalan))}`;
    //     });
    // }
    setInterval(function () {
        if (locId) {
            getDataHeader()
        } else {
            getListLocation()
        }
    }, 10000);
});