/*
   Licensed to the Apache Software Foundation (ASF) under one or more
   contributor license agreements.  See the NOTICE file distributed with
   this work for additional information regarding copyright ownership.
   The ASF licenses this file to You under the Apache License, Version 2.0
   (the "License"); you may not use this file except in compliance with
   the License.  You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
*/
var showControllersOnly = false;
var seriesFilter = "";
var filtersOnlySampleSeries = true;

/*
 * Add header in statistics table to group metrics by category
 * format
 *
 */
function summaryTableHeader(header) {
    var newRow = header.insertRow(-1);
    newRow.className = "tablesorter-no-sort";
    var cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 1;
    cell.innerHTML = "Requests";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 3;
    cell.innerHTML = "Executions";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 7;
    cell.innerHTML = "Response Times (ms)";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 2;
    cell.innerHTML = "Network (KB/sec)";
    newRow.appendChild(cell);
}

/*
 * Populates the table identified by id parameter with the specified data and
 * format
 *
 */
function createTable(table, info, formatter, defaultSorts, seriesIndex, headerCreator) {
    var tableRef = table[0];

    // Create header and populate it with data.titles array
    var header = tableRef.createTHead();

    // Call callback is available
    if(headerCreator) {
        headerCreator(header);
    }

    var newRow = header.insertRow(-1);
    for (var index = 0; index < info.titles.length; index++) {
        var cell = document.createElement('th');
        cell.innerHTML = info.titles[index];
        newRow.appendChild(cell);
    }

    var tBody;

    // Create overall body if defined
    if(info.overall){
        tBody = document.createElement('tbody');
        tBody.className = "tablesorter-no-sort";
        tableRef.appendChild(tBody);
        var newRow = tBody.insertRow(-1);
        var data = info.overall.data;
        for(var index=0;index < data.length; index++){
            var cell = newRow.insertCell(-1);
            cell.innerHTML = formatter ? formatter(index, data[index]): data[index];
        }
    }

    // Create regular body
    tBody = document.createElement('tbody');
    tableRef.appendChild(tBody);

    var regexp;
    if(seriesFilter) {
        regexp = new RegExp(seriesFilter, 'i');
    }
    // Populate body with data.items array
    for(var index=0; index < info.items.length; index++){
        var item = info.items[index];
        if((!regexp || filtersOnlySampleSeries && !info.supportsControllersDiscrimination || regexp.test(item.data[seriesIndex]))
                &&
                (!showControllersOnly || !info.supportsControllersDiscrimination || item.isController)){
            if(item.data.length > 0) {
                var newRow = tBody.insertRow(-1);
                for(var col=0; col < item.data.length; col++){
                    var cell = newRow.insertCell(-1);
                    cell.innerHTML = formatter ? formatter(col, item.data[col]) : item.data[col];
                }
            }
        }
    }

    // Add support of columns sort
    table.tablesorter({sortList : defaultSorts});
}

$(document).ready(function() {

    // Customize table sorter default options
    $.extend( $.tablesorter.defaults, {
        theme: 'blue',
        cssInfoBlock: "tablesorter-no-sort",
        widthFixed: true,
        widgets: ['zebra']
    });

    var data = {"OkPercent": 95.75178273403125, "KoPercent": 4.248217265968745};
    var dataset = [
        {
            "label" : "KO",
            "data" : data.KoPercent,
            "color" : "#FF6347"
        },
        {
            "label" : "OK",
            "data" : data.OkPercent,
            "color" : "#9ACD32"
        }];
    $.plot($("#flot-requests-summary"), dataset, {
        series : {
            pie : {
                show : true,
                radius : 1,
                label : {
                    show : true,
                    radius : 3 / 4,
                    formatter : function(label, series) {
                        return '<div style="font-size:8pt;text-align:center;padding:2px;color:white;">'
                            + label
                            + '<br/>'
                            + Math.round10(series.percent, -2)
                            + '%</div>';
                    },
                    background : {
                        opacity : 0.5,
                        color : '#000'
                    }
                }
            }
        },
        legend : {
            show : true
        }
    });

    // Creates APDEX table
    createTable($("#apdexTable"), {"supportsControllersDiscrimination": true, "overall": {"data": [0.7349381827696736, 500, 1500, "Total"], "isController": false}, "titles": ["Apdex", "T (Toleration threshold)  ", "F (Frustration threshold)", "Label"], "items": [{"data": [0.8982400722021661, 500, 1500, "POST Получить запрос по странам (Get Countries Request)"], "isController": false}, {"data": [1.0, 500, 1500, "GET страница регистрации (register-page)"], "isController": false}, {"data": [0.16959619952494062, 500, 1500, "TC: Запрос на создание учетной записи (Account Create Request)"], "isController": true}, {"data": [1.0, 500, 1500, "GET домашняя страница (home-page)"], "isController": false}, {"data": [0.8709165154264973, 500, 1500, "POSTЗапрос на создание учетной записи (Account Create Request)"], "isController": false}, {"data": [0.6711070280202113, 500, 1500, "POST Запрос входа в учетную запись Account Login Request "], "isController": false}, {"data": [0.4878859857482185, 500, 1500, "POST Запрос на выход из учетной записи (AccountLogoutRequest)"], "isController": false}]}, function(index, item){
        switch(index){
            case 0:
                item = item.toFixed(3);
                break;
            case 1:
            case 2:
                item = formatDuration(item);
                break;
        }
        return item;
    }, [[0, 0]], 3);

    // Create statistics table
    createTable($("#statisticsTable"), {"supportsControllersDiscrimination": true, "overall": {"data": ["Total", 13182, 560, 4.248217265968745, 395.55985434683856, 0, 6319, 1105.7000000000007, 1793.0, 3743.51, 6.428823289292659, 65.30156985050986, 5.222917413706874], "isController": false}, "titles": ["Label", "#Samples", "KO", "Error %", "Average", "Min", "Max", "90th pct", "95th pct", "99th pct", "Throughput", "Received", "Sent"], "items": [{"data": ["POST Получить запрос по странам (Get Countries Request)", 2216, 0, 0.0, 366.42870036101004, 82, 4500, 798.7999999999997, 1262.1000000000013, 2606.1499999999996, 1.0891211735772126, 37.76080959522635, 0.9582990013604186], "isController": false}, {"data": ["GET страница регистрации (register-page)", 2232, 0, 0.0, 3.4395161290322633, 1, 405, 4.0, 5.0, 11.0, 1.098066379883739, 10.74046177823782, 0.42249819694745416], "isController": false}, {"data": ["TC: Запрос на создание учетной записи (Account Create Request)", 2105, 329, 15.629453681710213, 2276.516864608075, 304, 11005, 4679.200000000003, 6086.999999999998, 7913.660000000002, 1.0381092110616577, 62.547999162392586, 5.084208634368566], "isController": true}, {"data": ["GET домашняя страница (home-page)", 2248, 0, 0.0, 3.164145907473313, 0, 385, 4.0, 5.0, 10.509999999999764, 1.099829594907515, 13.672686272629557, 0.413510150429095], "isController": false}, {"data": ["POSTЗапрос на создание учетной записи (Account Create Request)", 2204, 71, 3.221415607985481, 334.8575317604363, 49, 4572, 803.0, 1304.75, 2901.149999999997, 1.082810965475329, 1.0929803579613873, 1.4094789500369207], "isController": false}, {"data": ["POST Запрос входа в учетную запись Account Login Request ", 2177, 160, 7.349563619660083, 724.5323840146983, 61, 6319, 1645.0000000000002, 2430.2, 4414.44, 1.0713756670260886, 1.461955586784874, 1.0525428916291455], "isController": false}, {"data": ["POST Запрос на выход из учетной записи (AccountLogoutRequest)", 2105, 329, 15.629453681710213, 984.3900237529693, 2, 5942, 2528.0000000000005, 3408.0999999999995, 4979.640000000006, 1.0398640914922321, 1.0342651350242527, 1.0116507732846811], "isController": false}]}, function(index, item){
        switch(index){
            // Errors pct
            case 3:
                item = item.toFixed(2) + '%';
                break;
            // Mean
            case 4:
            // Mean
            case 7:
            // Percentile 1
            case 8:
            // Percentile 2
            case 9:
            // Percentile 3
            case 10:
            // Throughput
            case 11:
            // Kbytes/s
            case 12:
            // Sent Kbytes/s
                item = item.toFixed(2);
                break;
        }
        return item;
    }, [[0, 0]], 0, summaryTableHeader);

    // Create error table
    createTable($("#errorsTable"), {"supportsControllersDiscrimination": false, "titles": ["Type of error", "Number of errors", "% in errors", "% in all samples"], "items": [{"data": ["Test failed: text expected to contain \/ns2:StatusMessage&gt;&lt;ns2:success&gt;true&lt;\/ns2:success&gt;&lt;ns2:userId&gt;158074999&lt;\/ns2:userId&gt;&lt;ns2:reason&gt;Login Successful&lt;\/ns2:reason&gt;\/", 1, 0.17857142857142858, 0.007586102260658474], "isController": false}, {"data": ["Test failed: text expected to contain \/ns2:StatusMessage&gt;&lt;ns2:success&gt;true&lt;\/ns2:success&gt;&lt;ns2:userId&gt;414529225&lt;\/ns2:userId&gt;&lt;ns2:reason&gt;Login Successful&lt;\/ns2:reason&gt;\/", 1, 0.17857142857142858, 0.007586102260658474], "isController": false}, {"data": ["Test failed: text expected to contain \/ns2:StatusMessage&gt;&lt;ns2:success&gt;true&lt;\/ns2:success&gt;&lt;ns2:userId&gt;451890173&lt;\/ns2:userId&gt;&lt;ns2:reason&gt;Login Successful&lt;\/ns2:reason&gt;\/", 1, 0.17857142857142858, 0.007586102260658474], "isController": false}, {"data": ["Test failed: text expected to contain \/ns2:StatusMessage&gt;&lt;ns2:success&gt;true&lt;\/ns2:success&gt;&lt;ns2:userId&gt;435360201&lt;\/ns2:userId&gt;&lt;ns2:reason&gt;Login Successful&lt;\/ns2:reason&gt;\/", 1, 0.17857142857142858, 0.007586102260658474], "isController": false}, {"data": ["Test failed: text expected to contain \/ns2:StatusMessage&gt;&lt;ns2:success&gt;true&lt;\/ns2:success&gt;&lt;ns2:userId&gt;944723055&lt;\/ns2:userId&gt;&lt;ns2:reason&gt;Login Successful&lt;\/ns2:reason&gt;\/", 1, 0.17857142857142858, 0.007586102260658474], "isController": false}, {"data": ["Test failed: text expected to contain \/ns2:StatusMessage&gt;&lt;ns2:success&gt;true&lt;\/ns2:success&gt;&lt;ns2:userId&gt;443822179&lt;\/ns2:userId&gt;&lt;ns2:reason&gt;Login Successful&lt;\/ns2:reason&gt;\/", 1, 0.17857142857142858, 0.007586102260658474], "isController": false}, {"data": ["Test failed: text expected to contain \/ns2:StatusMessage&gt;&lt;ns2:success&gt;true&lt;\/ns2:success&gt;&lt;ns2:userId&gt;529190533&lt;\/ns2:userId&gt;&lt;ns2:reason&gt;Login Successful&lt;\/ns2:reason&gt;\/", 1, 0.17857142857142858, 0.007586102260658474], "isController": false}, {"data": ["Test failed: text expected to contain \/ns2:StatusMessage&gt;&lt;ns2:success&gt;true&lt;\/ns2:success&gt;&lt;ns2:userId&gt;327592389&lt;\/ns2:userId&gt;&lt;ns2:reason&gt;Login Successful&lt;\/ns2:reason&gt;\/", 1, 0.17857142857142858, 0.007586102260658474], "isController": false}, {"data": ["Test failed: text expected to contain \/ns2:StatusMessage&gt;&lt;ns2:success&gt;true&lt;\/ns2:success&gt;&lt;ns2:userId&gt;485644894&lt;\/ns2:userId&gt;&lt;ns2:reason&gt;Login Successful&lt;\/ns2:reason&gt;\/", 1, 0.17857142857142858, 0.007586102260658474], "isController": false}, {"data": ["Test failed: text expected to contain \/ns2:StatusMessage&gt;&lt;ns2:success&gt;true&lt;\/ns2:success&gt;&lt;ns2:userId&gt;338015809&lt;\/ns2:userId&gt;&lt;ns2:reason&gt;Login Successful&lt;\/ns2:reason&gt;\/", 1, 0.17857142857142858, 0.007586102260658474], "isController": false}, {"data": ["Test failed: text expected to contain \/ns2:StatusMessage&gt;&lt;ns2:success&gt;true&lt;\/ns2:success&gt;&lt;ns2:userId&gt;659531729&lt;\/ns2:userId&gt;&lt;ns2:reason&gt;Login Successful&lt;\/ns2:reason&gt;\/", 1, 0.17857142857142858, 0.007586102260658474], "isController": false}, {"data": ["Test failed: text expected to contain \/ns2:StatusMessage&gt;&lt;ns2:success&gt;true&lt;\/ns2:success&gt;&lt;ns2:userId&gt;251236390&lt;\/ns2:userId&gt;&lt;ns2:reason&gt;Login Successful&lt;\/ns2:reason&gt;\/", 1, 0.17857142857142858, 0.007586102260658474], "isController": false}, {"data": ["Test failed: text expected to contain \/ns2:StatusMessage&gt;&lt;ns2:success&gt;true&lt;\/ns2:success&gt;&lt;ns2:userId&gt;181482219&lt;\/ns2:userId&gt;&lt;ns2:reason&gt;Login Successful&lt;\/ns2:reason&gt;\/", 1, 0.17857142857142858, 0.007586102260658474], "isController": false}, {"data": ["Test failed: text expected to contain \/ns2:StatusMessage&gt;&lt;ns2:success&gt;true&lt;\/ns2:success&gt;&lt;ns2:userId&gt;495529574&lt;\/ns2:userId&gt;&lt;ns2:reason&gt;Login Successful&lt;\/ns2:reason&gt;\/", 1, 0.17857142857142858, 0.007586102260658474], "isController": false}, {"data": ["Test failed: text expected to contain \/ns2:StatusMessage&gt;&lt;ns2:success&gt;true&lt;\/ns2:success&gt;&lt;ns2:userId&gt;879043048&lt;\/ns2:userId&gt;&lt;ns2:reason&gt;Login Successful&lt;\/ns2:reason&gt;\/", 1, 0.17857142857142858, 0.007586102260658474], "isController": false}, {"data": ["Test failed: text expected to contain \/ns2:StatusMessage&gt;&lt;ns2:success&gt;true&lt;\/ns2:success&gt;&lt;ns2:userId&gt;986627295&lt;\/ns2:userId&gt;&lt;ns2:reason&gt;Login Successful&lt;\/ns2:reason&gt;\/", 1, 0.17857142857142858, 0.007586102260658474], "isController": false}, {"data": ["Test failed: text expected to contain \/ns2:StatusMessage&gt;&lt;ns2:success&gt;true&lt;\/ns2:success&gt;&lt;ns2:userId&gt;704668360&lt;\/ns2:userId&gt;&lt;ns2:reason&gt;Login Successful&lt;\/ns2:reason&gt;\/", 1, 0.17857142857142858, 0.007586102260658474], "isController": false}, {"data": ["Test failed: text expected to contain \/ns2:StatusMessage&gt;&lt;ns2:success&gt;true&lt;\/ns2:success&gt;&lt;ns2:userId&gt;577035143&lt;\/ns2:userId&gt;&lt;ns2:reason&gt;Login Successful&lt;\/ns2:reason&gt;\/", 1, 0.17857142857142858, 0.007586102260658474], "isController": false}, {"data": ["Test failed: text expected to contain \/ns2:StatusMessage&gt;&lt;ns2:success&gt;true&lt;\/ns2:success&gt;&lt;ns2:userId&gt;732689038&lt;\/ns2:userId&gt;&lt;ns2:reason&gt;Login Successful&lt;\/ns2:reason&gt;\/", 1, 0.17857142857142858, 0.007586102260658474], "isController": false}, {"data": ["Test failed: text expected to contain \/ns2:StatusMessage&gt;&lt;ns2:success&gt;true&lt;\/ns2:success&gt;&lt;ns2:userId&gt;&lt;\/ns2:userId&gt;&lt;ns2:reason&gt;Login Successful&lt;\/ns2:reason&gt;\/", 4, 0.7142857142857143, 0.030344409042633896], "isController": false}, {"data": ["Test failed: text expected to contain \/ns2:StatusMessage&gt;&lt;ns2:success&gt;true&lt;\/ns2:success&gt;&lt;ns2:userId&gt;375894444&lt;\/ns2:userId&gt;&lt;ns2:reason&gt;Login Successful&lt;\/ns2:reason&gt;\/", 1, 0.17857142857142858, 0.007586102260658474], "isController": false}, {"data": ["Test failed: text expected to contain \/ns2:StatusMessage&gt;&lt;ns2:success&gt;true&lt;\/ns2:success&gt;&lt;ns2:userId&gt;278320005&lt;\/ns2:userId&gt;&lt;ns2:reason&gt;Login Successful&lt;\/ns2:reason&gt;\/", 1, 0.17857142857142858, 0.007586102260658474], "isController": false}, {"data": ["Test failed: text expected to contain \/ns2:StatusMessage&gt;&lt;ns2:success&gt;true&lt;\/ns2:success&gt;&lt;ns2:userId&gt;578342087&lt;\/ns2:userId&gt;&lt;ns2:reason&gt;Login Successful&lt;\/ns2:reason&gt;\/", 1, 0.17857142857142858, 0.007586102260658474], "isController": false}, {"data": ["Test failed: text expected to contain \/ns2:StatusMessage&gt;&lt;ns2:success&gt;true&lt;\/ns2:success&gt;&lt;ns2:userId&gt;651344223&lt;\/ns2:userId&gt;&lt;ns2:reason&gt;Login Successful&lt;\/ns2:reason&gt;\/", 1, 0.17857142857142858, 0.007586102260658474], "isController": false}, {"data": ["Test failed: text expected to contain \/ns2:StatusMessage&gt;&lt;ns2:success&gt;true&lt;\/ns2:success&gt;&lt;ns2:userId&gt;314623297&lt;\/ns2:userId&gt;&lt;ns2:reason&gt;Login Successful&lt;\/ns2:reason&gt;\/", 1, 0.17857142857142858, 0.007586102260658474], "isController": false}, {"data": ["Test failed: text expected to contain \/ns2:StatusMessage&gt;&lt;ns2:success&gt;true&lt;\/ns2:success&gt;&lt;ns2:userId&gt;401640141&lt;\/ns2:userId&gt;&lt;ns2:reason&gt;Login Successful&lt;\/ns2:reason&gt;\/", 1, 0.17857142857142858, 0.007586102260658474], "isController": false}, {"data": ["Test failed: text expected to contain \/ns2:StatusMessage&gt;&lt;ns2:success&gt;true&lt;\/ns2:success&gt;&lt;ns2:userId&gt;334176525&lt;\/ns2:userId&gt;&lt;ns2:reason&gt;Login Successful&lt;\/ns2:reason&gt;\/", 1, 0.17857142857142858, 0.007586102260658474], "isController": false}, {"data": ["Test failed: text expected to contain \/ns2:StatusMessage&gt;&lt;ns2:success&gt;true&lt;\/ns2:success&gt;&lt;ns2:userId&gt;988495304&lt;\/ns2:userId&gt;&lt;ns2:reason&gt;Login Successful&lt;\/ns2:reason&gt;\/", 1, 0.17857142857142858, 0.007586102260658474], "isController": false}, {"data": ["Test failed: text expected to contain \/ns2:StatusMessage&gt;&lt;ns2:success&gt;true&lt;\/ns2:success&gt;&lt;ns2:userId&gt;896899897&lt;\/ns2:userId&gt;&lt;ns2:reason&gt;Login Successful&lt;\/ns2:reason&gt;\/", 1, 0.17857142857142858, 0.007586102260658474], "isController": false}, {"data": ["Test failed: text expected to contain \/ns2:StatusMessage&gt;&lt;ns2:success&gt;true&lt;\/ns2:success&gt;&lt;ns2:userId&gt;137501643&lt;\/ns2:userId&gt;&lt;ns2:reason&gt;Login Successful&lt;\/ns2:reason&gt;\/", 1, 0.17857142857142858, 0.007586102260658474], "isController": false}, {"data": ["Test failed: text expected to contain \/ns2:StatusMessage&gt;&lt;ns2:success&gt;true&lt;\/ns2:success&gt;&lt;ns2:userId&gt;704026599&lt;\/ns2:userId&gt;&lt;ns2:reason&gt;Login Successful&lt;\/ns2:reason&gt;\/", 1, 0.17857142857142858, 0.007586102260658474], "isController": false}, {"data": ["Test failed: text expected to contain \/ns2:StatusMessage&gt;&lt;ns2:success&gt;true&lt;\/ns2:success&gt;&lt;ns2:userId&gt;205886309&lt;\/ns2:userId&gt;&lt;ns2:reason&gt;Login Successful&lt;\/ns2:reason&gt;\/", 1, 0.17857142857142858, 0.007586102260658474], "isController": false}, {"data": ["Test failed: text expected to contain \/ns2:StatusMessage&gt;&lt;ns2:success&gt;true&lt;\/ns2:success&gt;&lt;ns2:userId&gt;288342563&lt;\/ns2:userId&gt;&lt;ns2:reason&gt;Login Successful&lt;\/ns2:reason&gt;\/", 1, 0.17857142857142858, 0.007586102260658474], "isController": false}, {"data": ["Test failed: text expected to contain \/ns2:StatusMessage&gt;&lt;ns2:success&gt;true&lt;\/ns2:success&gt;&lt;ns2:userId&gt;206097613&lt;\/ns2:userId&gt;&lt;ns2:reason&gt;Login Successful&lt;\/ns2:reason&gt;\/", 1, 0.17857142857142858, 0.007586102260658474], "isController": false}, {"data": ["Test failed: text expected to contain \/ns2:StatusMessage&gt;&lt;ns2:success&gt;true&lt;\/ns2:success&gt;&lt;ns2:userId&gt;673611522&lt;\/ns2:userId&gt;&lt;ns2:reason&gt;Login Successful&lt;\/ns2:reason&gt;\/", 1, 0.17857142857142858, 0.007586102260658474], "isController": false}, {"data": ["Test failed: text expected to contain \/ns2:StatusMessage&gt;&lt;ns2:success&gt;true&lt;\/ns2:success&gt;&lt;ns2:userId&gt;775236437&lt;\/ns2:userId&gt;&lt;ns2:reason&gt;Login Successful&lt;\/ns2:reason&gt;\/", 1, 0.17857142857142858, 0.007586102260658474], "isController": false}, {"data": ["Test failed: text expected to contain \/ns2:StatusMessage&gt;&lt;ns2:success&gt;true&lt;\/ns2:success&gt;&lt;ns2:userId&gt;247100233&lt;\/ns2:userId&gt;&lt;ns2:reason&gt;Login Successful&lt;\/ns2:reason&gt;\/", 1, 0.17857142857142858, 0.007586102260658474], "isController": false}, {"data": ["Test failed: text expected to contain \/ns2:StatusMessage&gt;&lt;ns2:success&gt;true&lt;\/ns2:success&gt;&lt;ns2:userId&gt;933595232&lt;\/ns2:userId&gt;&lt;ns2:reason&gt;Login Successful&lt;\/ns2:reason&gt;\/", 1, 0.17857142857142858, 0.007586102260658474], "isController": false}, {"data": ["Test failed: text expected to contain \/ns2:StatusMessage&gt;&lt;ns2:success&gt;true&lt;\/ns2:success&gt;&lt;ns2:userId&gt;770405430&lt;\/ns2:userId&gt;&lt;ns2:reason&gt;Login Successful&lt;\/ns2:reason&gt;\/", 1, 0.17857142857142858, 0.007586102260658474], "isController": false}, {"data": ["Test failed: text expected to contain \/ns2:StatusMessage&gt;&lt;ns2:success&gt;true&lt;\/ns2:success&gt;&lt;ns2:userId&gt;495409949&lt;\/ns2:userId&gt;&lt;ns2:reason&gt;Login Successful&lt;\/ns2:reason&gt;\/", 1, 0.17857142857142858, 0.007586102260658474], "isController": false}, {"data": ["Test failed: text expected to contain \/ns2:StatusMessage&gt;&lt;ns2:success&gt;true&lt;\/ns2:success&gt;&lt;ns2:userId&gt;830745071&lt;\/ns2:userId&gt;&lt;ns2:reason&gt;Login Successful&lt;\/ns2:reason&gt;\/", 1, 0.17857142857142858, 0.007586102260658474], "isController": false}, {"data": ["Test failed: text expected to contain \/ns2:StatusMessage&gt;&lt;ns2:success&gt;true&lt;\/ns2:success&gt;&lt;ns2:userId&gt;410909744&lt;\/ns2:userId&gt;&lt;ns2:reason&gt;Login Successful&lt;\/ns2:reason&gt;\/", 1, 0.17857142857142858, 0.007586102260658474], "isController": false}, {"data": ["Test failed: text expected to contain \/ns2:StatusMessage&gt;&lt;ns2:success&gt;true&lt;\/ns2:success&gt;&lt;ns2:userId&gt;639135932&lt;\/ns2:userId&gt;&lt;ns2:reason&gt;Login Successful&lt;\/ns2:reason&gt;\/", 1, 0.17857142857142858, 0.007586102260658474], "isController": false}, {"data": ["Test failed: text expected to contain \/ns2:StatusMessage&gt;&lt;ns2:success&gt;true&lt;\/ns2:success&gt;&lt;ns2:userId&gt;275101647&lt;\/ns2:userId&gt;&lt;ns2:reason&gt;Login Successful&lt;\/ns2:reason&gt;\/", 1, 0.17857142857142858, 0.007586102260658474], "isController": false}, {"data": ["Test failed: text expected to contain \/ns2:StatusMessage&gt;&lt;ns2:success&gt;true&lt;\/ns2:success&gt;&lt;ns2:userId&gt;698744899&lt;\/ns2:userId&gt;&lt;ns2:reason&gt;Login Successful&lt;\/ns2:reason&gt;\/", 1, 0.17857142857142858, 0.007586102260658474], "isController": false}, {"data": ["Test failed: text expected to contain \/ns2:StatusMessage&gt;&lt;ns2:success&gt;true&lt;\/ns2:success&gt;&lt;ns2:userId&gt;194241302&lt;\/ns2:userId&gt;&lt;ns2:reason&gt;Login Successful&lt;\/ns2:reason&gt;\/", 1, 0.17857142857142858, 0.007586102260658474], "isController": false}, {"data": ["Test failed: text expected to contain \/ns2:StatusMessage&gt;&lt;ns2:success&gt;true&lt;\/ns2:success&gt;&lt;ns2:userId&gt;926808145&lt;\/ns2:userId&gt;&lt;ns2:reason&gt;Login Successful&lt;\/ns2:reason&gt;\/", 1, 0.17857142857142858, 0.007586102260658474], "isController": false}, {"data": ["Test failed: text expected to contain \/ns2:StatusMessage&gt;&lt;ns2:success&gt;true&lt;\/ns2:success&gt;&lt;ns2:userId&gt;489437448&lt;\/ns2:userId&gt;&lt;ns2:reason&gt;Login Successful&lt;\/ns2:reason&gt;\/", 1, 0.17857142857142858, 0.007586102260658474], "isController": false}, {"data": ["Test failed: text expected to contain \/ns2:StatusMessage&gt;&lt;ns2:success&gt;true&lt;\/ns2:success&gt;&lt;ns2:userId&gt;424230803&lt;\/ns2:userId&gt;&lt;ns2:reason&gt;Login Successful&lt;\/ns2:reason&gt;\/", 1, 0.17857142857142858, 0.007586102260658474], "isController": false}, {"data": ["Test failed: text expected to contain \/ns2:StatusMessage&gt;&lt;ns2:success&gt;true&lt;\/ns2:success&gt;&lt;ns2:userId&gt;157904562&lt;\/ns2:userId&gt;&lt;ns2:reason&gt;Login Successful&lt;\/ns2:reason&gt;\/", 1, 0.17857142857142858, 0.007586102260658474], "isController": false}, {"data": ["Test failed: text expected to contain \/ns2:StatusMessage&gt;&lt;ns2:success&gt;true&lt;\/ns2:success&gt;&lt;ns2:userId&gt;713682550&lt;\/ns2:userId&gt;&lt;ns2:reason&gt;Login Successful&lt;\/ns2:reason&gt;\/", 1, 0.17857142857142858, 0.007586102260658474], "isController": false}, {"data": ["Test failed: text expected to contain \/ns2:StatusMessage&gt;&lt;ns2:success&gt;true&lt;\/ns2:success&gt;&lt;ns2:userId&gt;640501144&lt;\/ns2:userId&gt;&lt;ns2:reason&gt;Login Successful&lt;\/ns2:reason&gt;\/", 1, 0.17857142857142858, 0.007586102260658474], "isController": false}, {"data": ["Test failed: text expected to contain \/ns2:StatusMessage&gt;&lt;ns2:success&gt;true&lt;\/ns2:success&gt;&lt;ns2:userId&gt;766281135&lt;\/ns2:userId&gt;&lt;ns2:reason&gt;Login Successful&lt;\/ns2:reason&gt;\/", 1, 0.17857142857142858, 0.007586102260658474], "isController": false}, {"data": ["Test failed: text expected to contain \/ns2:StatusMessage&gt;&lt;ns2:success&gt;true&lt;\/ns2:success&gt;&lt;ns2:userId&gt;995673019&lt;\/ns2:userId&gt;&lt;ns2:reason&gt;Login Successful&lt;\/ns2:reason&gt;\/", 1, 0.17857142857142858, 0.007586102260658474], "isController": false}, {"data": ["Test failed: text expected to contain \/ns2:StatusMessage&gt;&lt;ns2:success&gt;true&lt;\/ns2:success&gt;&lt;ns2:userId&gt;358194800&lt;\/ns2:userId&gt;&lt;ns2:reason&gt;Login Successful&lt;\/ns2:reason&gt;\/", 1, 0.17857142857142858, 0.007586102260658474], "isController": false}, {"data": ["Test failed: text expected to contain \/ns2:StatusMessage&gt;&lt;ns2:success&gt;true&lt;\/ns2:success&gt;&lt;ns2:userId&gt;704329690&lt;\/ns2:userId&gt;&lt;ns2:reason&gt;Login Successful&lt;\/ns2:reason&gt;\/", 1, 0.17857142857142858, 0.007586102260658474], "isController": false}, {"data": ["Test failed: text expected to contain \/ns2:StatusMessage&gt;&lt;ns2:success&gt;true&lt;\/ns2:success&gt;&lt;ns2:userId&gt;481513331&lt;\/ns2:userId&gt;&lt;ns2:reason&gt;Login Successful&lt;\/ns2:reason&gt;\/", 1, 0.17857142857142858, 0.007586102260658474], "isController": false}, {"data": ["Test failed: text expected to contain \/ns2:StatusMessage&gt;&lt;ns2:success&gt;true&lt;\/ns2:success&gt;&lt;ns2:userId&gt;425284205&lt;\/ns2:userId&gt;&lt;ns2:reason&gt;Login Successful&lt;\/ns2:reason&gt;\/", 1, 0.17857142857142858, 0.007586102260658474], "isController": false}, {"data": ["Test failed: text expected to contain \/ns2:StatusMessage&gt;&lt;ns2:success&gt;true&lt;\/ns2:success&gt;&lt;ns2:userId&gt;261147348&lt;\/ns2:userId&gt;&lt;ns2:reason&gt;Login Successful&lt;\/ns2:reason&gt;\/", 1, 0.17857142857142858, 0.007586102260658474], "isController": false}, {"data": ["Test failed: text expected to contain \/ns2:StatusMessage&gt;&lt;ns2:success&gt;true&lt;\/ns2:success&gt;&lt;ns2:userId&gt;703772569&lt;\/ns2:userId&gt;&lt;ns2:reason&gt;Login Successful&lt;\/ns2:reason&gt;\/", 1, 0.17857142857142858, 0.007586102260658474], "isController": false}, {"data": ["Test failed: text expected to contain \/ns2:StatusMessage&gt;&lt;ns2:success&gt;true&lt;\/ns2:success&gt;&lt;ns2:userId&gt;824962074&lt;\/ns2:userId&gt;&lt;ns2:reason&gt;Login Successful&lt;\/ns2:reason&gt;\/", 1, 0.17857142857142858, 0.007586102260658474], "isController": false}, {"data": ["Test failed: text expected to contain \/ns2:StatusMessage&gt;&lt;ns2:success&gt;true&lt;\/ns2:success&gt;&lt;ns2:userId&gt;775847362&lt;\/ns2:userId&gt;&lt;ns2:reason&gt;Login Successful&lt;\/ns2:reason&gt;\/", 1, 0.17857142857142858, 0.007586102260658474], "isController": false}, {"data": ["Test failed: text expected to contain \/ns2:StatusMessage&gt;&lt;ns2:success&gt;true&lt;\/ns2:success&gt;&lt;ns2:userId&gt;732173795&lt;\/ns2:userId&gt;&lt;ns2:reason&gt;Login Successful&lt;\/ns2:reason&gt;\/", 1, 0.17857142857142858, 0.007586102260658474], "isController": false}, {"data": ["Test failed: text expected to contain \/ns2:StatusMessage&gt;&lt;ns2:success&gt;true&lt;\/ns2:success&gt;&lt;ns2:userId&gt;121822422&lt;\/ns2:userId&gt;&lt;ns2:reason&gt;Login Successful&lt;\/ns2:reason&gt;\/", 1, 0.17857142857142858, 0.007586102260658474], "isController": false}, {"data": ["Test failed: text expected to contain \/ns2:StatusMessage&gt;&lt;ns2:success&gt;true&lt;\/ns2:success&gt;&lt;ns2:userId&gt;264954402&lt;\/ns2:userId&gt;&lt;ns2:reason&gt;Login Successful&lt;\/ns2:reason&gt;\/", 1, 0.17857142857142858, 0.007586102260658474], "isController": false}, {"data": ["Test failed: text expected to contain \/ns2:StatusMessage&gt;&lt;ns2:success&gt;true&lt;\/ns2:success&gt;&lt;ns2:userId&gt;783622889&lt;\/ns2:userId&gt;&lt;ns2:reason&gt;Login Successful&lt;\/ns2:reason&gt;\/", 1, 0.17857142857142858, 0.007586102260658474], "isController": false}, {"data": ["Test failed: text expected to contain \/ns2:StatusMessage&gt;&lt;ns2:success&gt;true&lt;\/ns2:success&gt;&lt;ns2:userId&gt;172097015&lt;\/ns2:userId&gt;&lt;ns2:reason&gt;Login Successful&lt;\/ns2:reason&gt;\/", 1, 0.17857142857142858, 0.007586102260658474], "isController": false}, {"data": ["Test failed: text expected to contain \/ns2:StatusMessage&gt;&lt;ns2:success&gt;true&lt;\/ns2:success&gt;&lt;ns2:userId&gt;171346007&lt;\/ns2:userId&gt;&lt;ns2:reason&gt;Login Successful&lt;\/ns2:reason&gt;\/", 1, 0.17857142857142858, 0.007586102260658474], "isController": false}, {"data": ["Test failed: text expected to contain \/ns2:StatusMessage&gt;&lt;ns2:success&gt;true&lt;\/ns2:success&gt;&lt;ns2:userId&gt;528988262&lt;\/ns2:userId&gt;&lt;ns2:reason&gt;Login Successful&lt;\/ns2:reason&gt;\/", 1, 0.17857142857142858, 0.007586102260658474], "isController": false}, {"data": ["Test failed: text expected to contain \/ns2:StatusMessage&gt;&lt;ns2:success&gt;true&lt;\/ns2:success&gt;&lt;ns2:userId&gt;531615120&lt;\/ns2:userId&gt;&lt;ns2:reason&gt;Login Successful&lt;\/ns2:reason&gt;\/", 1, 0.17857142857142858, 0.007586102260658474], "isController": false}, {"data": ["Test failed: text expected to contain \/ns2:StatusMessage&gt;&lt;ns2:success&gt;true&lt;\/ns2:success&gt;&lt;ns2:userId&gt;459623946&lt;\/ns2:userId&gt;&lt;ns2:reason&gt;Login Successful&lt;\/ns2:reason&gt;\/", 1, 0.17857142857142858, 0.007586102260658474], "isController": false}, {"data": ["Test failed: text expected to contain \/ns2:StatusMessage&gt;&lt;ns2:success&gt;true&lt;\/ns2:success&gt;&lt;ns2:userId&gt;256184741&lt;\/ns2:userId&gt;&lt;ns2:reason&gt;Login Successful&lt;\/ns2:reason&gt;\/", 1, 0.17857142857142858, 0.007586102260658474], "isController": false}, {"data": ["Test failed: text expected to contain \/ns2:StatusMessage&gt;&lt;ns2:success&gt;true&lt;\/ns2:success&gt;&lt;ns2:userId&gt;494640113&lt;\/ns2:userId&gt;&lt;ns2:reason&gt;Login Successful&lt;\/ns2:reason&gt;\/", 1, 0.17857142857142858, 0.007586102260658474], "isController": false}, {"data": ["Test failed: text expected to contain \/ns2:StatusMessage&gt;&lt;ns2:success&gt;true&lt;\/ns2:success&gt;&lt;ns2:userId&gt;876780327&lt;\/ns2:userId&gt;&lt;ns2:reason&gt;Login Successful&lt;\/ns2:reason&gt;\/", 1, 0.17857142857142858, 0.007586102260658474], "isController": false}, {"data": ["Test failed: text expected to contain \/ns2:StatusMessage&gt;&lt;ns2:success&gt;true&lt;\/ns2:success&gt;&lt;ns2:userId&gt;264181736&lt;\/ns2:userId&gt;&lt;ns2:reason&gt;Login Successful&lt;\/ns2:reason&gt;\/", 1, 0.17857142857142858, 0.007586102260658474], "isController": false}, {"data": ["Test failed: text expected to contain \/ns2:StatusMessage&gt;&lt;ns2:success&gt;true&lt;\/ns2:success&gt;&lt;ns2:userId&gt;337720790&lt;\/ns2:userId&gt;&lt;ns2:reason&gt;Login Successful&lt;\/ns2:reason&gt;\/", 1, 0.17857142857142858, 0.007586102260658474], "isController": false}, {"data": ["Test failed: text expected to contain \/ns2:StatusMessage&gt;&lt;ns2:success&gt;true&lt;\/ns2:success&gt;&lt;ns2:userId&gt;808935699&lt;\/ns2:userId&gt;&lt;ns2:reason&gt;Login Successful&lt;\/ns2:reason&gt;\/", 1, 0.17857142857142858, 0.007586102260658474], "isController": false}, {"data": ["Test failed: text expected to contain \/ns2:StatusMessage&gt;&lt;ns2:success&gt;true&lt;\/ns2:success&gt;&lt;ns2:userId&gt;368275217&lt;\/ns2:userId&gt;&lt;ns2:reason&gt;Login Successful&lt;\/ns2:reason&gt;\/", 1, 0.17857142857142858, 0.007586102260658474], "isController": false}, {"data": ["Test failed: text expected to contain \/ns2:StatusMessage&gt;&lt;ns2:success&gt;true&lt;\/ns2:success&gt;&lt;ns2:userId&gt;872923573&lt;\/ns2:userId&gt;&lt;ns2:reason&gt;Login Successful&lt;\/ns2:reason&gt;\/", 1, 0.17857142857142858, 0.007586102260658474], "isController": false}, {"data": ["Test failed: text expected to contain \/ns2:StatusMessage&gt;&lt;ns2:success&gt;true&lt;\/ns2:success&gt;&lt;ns2:userId&gt;913164203&lt;\/ns2:userId&gt;&lt;ns2:reason&gt;Login Successful&lt;\/ns2:reason&gt;\/", 1, 0.17857142857142858, 0.007586102260658474], "isController": false}, {"data": ["Test failed: text expected to contain \/ns2:StatusMessage&gt;&lt;ns2:success&gt;true&lt;\/ns2:success&gt;&lt;ns2:userId&gt;922987935&lt;\/ns2:userId&gt;&lt;ns2:reason&gt;Login Successful&lt;\/ns2:reason&gt;\/", 1, 0.17857142857142858, 0.007586102260658474], "isController": false}, {"data": ["500", 339, 60.535714285714285, 2.571688666363223], "isController": false}, {"data": ["Test failed: text expected to contain \/ns2:StatusMessage&gt;&lt;ns2:success&gt;true&lt;\/ns2:success&gt;&lt;ns2:userId&gt;580090528&lt;\/ns2:userId&gt;&lt;ns2:reason&gt;Login Successful&lt;\/ns2:reason&gt;\/", 1, 0.17857142857142858, 0.007586102260658474], "isController": false}, {"data": ["Test failed: text expected to contain \/&lt;SOAP-ENV:Envelope xmlns:SOAP-ENV=&quot;http:\/\/schemas.xmlsoap.org\/soap\/envelope\/&quot;&gt;&lt;SOAP-ENV:Header\/&gt;&lt;SOAP-ENV:Body&gt;&lt;ns2:AccountCreateResponse xmlns:ns2=&quot;com.advantage.online.store.accountservice&quot;&gt;&lt;ns2:StatusMessage&gt;&lt;ns2:success&gt;true&lt;\/ns2:success&gt;&lt;ns2:userId&gt;-1&lt;\/ns2:userId&gt;&lt;ns2:reason&gt;New user created successfully.&lt;\/ns2:reason&gt;&lt;\/ns2:StatusMessage&gt;&lt;\/ns2:AccountCreateResponse&gt;&lt;\/SOAP-ENV:Body&gt;&lt;\/SOAP-ENV:Envelope&gt;\/", 67, 11.964285714285714, 0.5082688514641177], "isController": false}, {"data": ["Test failed: text expected to contain \/ns2:StatusMessage&gt;&lt;ns2:success&gt;true&lt;\/ns2:success&gt;&lt;ns2:userId&gt;864472366&lt;\/ns2:userId&gt;&lt;ns2:reason&gt;Login Successful&lt;\/ns2:reason&gt;\/", 1, 0.17857142857142858, 0.007586102260658474], "isController": false}, {"data": ["Test failed: text expected to contain \/ns2:StatusMessage&gt;&lt;ns2:success&gt;true&lt;\/ns2:success&gt;&lt;ns2:userId&gt;129860481&lt;\/ns2:userId&gt;&lt;ns2:reason&gt;Login Successful&lt;\/ns2:reason&gt;\/", 1, 0.17857142857142858, 0.007586102260658474], "isController": false}, {"data": ["Test failed: text expected to contain \/ns2:StatusMessage&gt;&lt;ns2:success&gt;true&lt;\/ns2:success&gt;&lt;ns2:userId&gt;-1&lt;\/ns2:userId&gt;&lt;ns2:reason&gt;Login Successful&lt;\/ns2:reason&gt;\/", 66, 11.785714285714286, 0.5006827492034592], "isController": false}, {"data": ["Test failed: text expected to contain \/ns2:StatusMessage&gt;&lt;ns2:success&gt;true&lt;\/ns2:success&gt;&lt;ns2:userId&gt;613907594&lt;\/ns2:userId&gt;&lt;ns2:reason&gt;Login Successful&lt;\/ns2:reason&gt;\/", 1, 0.17857142857142858, 0.007586102260658474], "isController": false}]}, function(index, item){
        switch(index){
            case 2:
            case 3:
                item = item.toFixed(2) + '%';
                break;
        }
        return item;
    }, [[1, 1]]);

        // Create top5 errors by sampler
    createTable($("#top5ErrorsBySamplerTable"), {"supportsControllersDiscrimination": false, "overall": {"data": ["Total", 13182, 560, "500", 339, "Test failed: text expected to contain \/&lt;SOAP-ENV:Envelope xmlns:SOAP-ENV=&quot;http:\/\/schemas.xmlsoap.org\/soap\/envelope\/&quot;&gt;&lt;SOAP-ENV:Header\/&gt;&lt;SOAP-ENV:Body&gt;&lt;ns2:AccountCreateResponse xmlns:ns2=&quot;com.advantage.online.store.accountservice&quot;&gt;&lt;ns2:StatusMessage&gt;&lt;ns2:success&gt;true&lt;\/ns2:success&gt;&lt;ns2:userId&gt;-1&lt;\/ns2:userId&gt;&lt;ns2:reason&gt;New user created successfully.&lt;\/ns2:reason&gt;&lt;\/ns2:StatusMessage&gt;&lt;\/ns2:AccountCreateResponse&gt;&lt;\/SOAP-ENV:Body&gt;&lt;\/SOAP-ENV:Envelope&gt;\/", 67, "Test failed: text expected to contain \/ns2:StatusMessage&gt;&lt;ns2:success&gt;true&lt;\/ns2:success&gt;&lt;ns2:userId&gt;-1&lt;\/ns2:userId&gt;&lt;ns2:reason&gt;Login Successful&lt;\/ns2:reason&gt;\/", 66, "Test failed: text expected to contain \/ns2:StatusMessage&gt;&lt;ns2:success&gt;true&lt;\/ns2:success&gt;&lt;ns2:userId&gt;&lt;\/ns2:userId&gt;&lt;ns2:reason&gt;Login Successful&lt;\/ns2:reason&gt;\/", 4, "Test failed: text expected to contain \/ns2:StatusMessage&gt;&lt;ns2:success&gt;true&lt;\/ns2:success&gt;&lt;ns2:userId&gt;158074999&lt;\/ns2:userId&gt;&lt;ns2:reason&gt;Login Successful&lt;\/ns2:reason&gt;\/", 1], "isController": false}, "titles": ["Sample", "#Samples", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors"], "items": [{"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": ["POSTЗапрос на создание учетной записи (Account Create Request)", 2204, 71, "Test failed: text expected to contain \/&lt;SOAP-ENV:Envelope xmlns:SOAP-ENV=&quot;http:\/\/schemas.xmlsoap.org\/soap\/envelope\/&quot;&gt;&lt;SOAP-ENV:Header\/&gt;&lt;SOAP-ENV:Body&gt;&lt;ns2:AccountCreateResponse xmlns:ns2=&quot;com.advantage.online.store.accountservice&quot;&gt;&lt;ns2:StatusMessage&gt;&lt;ns2:success&gt;true&lt;\/ns2:success&gt;&lt;ns2:userId&gt;-1&lt;\/ns2:userId&gt;&lt;ns2:reason&gt;New user created successfully.&lt;\/ns2:reason&gt;&lt;\/ns2:StatusMessage&gt;&lt;\/ns2:AccountCreateResponse&gt;&lt;\/SOAP-ENV:Body&gt;&lt;\/SOAP-ENV:Envelope&gt;\/", 67, "500", 4, null, null, null, null, null, null], "isController": false}, {"data": ["POST Запрос входа в учетную запись Account Login Request ", 2177, 160, "Test failed: text expected to contain \/ns2:StatusMessage&gt;&lt;ns2:success&gt;true&lt;\/ns2:success&gt;&lt;ns2:userId&gt;-1&lt;\/ns2:userId&gt;&lt;ns2:reason&gt;Login Successful&lt;\/ns2:reason&gt;\/", 66, "500", 6, "Test failed: text expected to contain \/ns2:StatusMessage&gt;&lt;ns2:success&gt;true&lt;\/ns2:success&gt;&lt;ns2:userId&gt;&lt;\/ns2:userId&gt;&lt;ns2:reason&gt;Login Successful&lt;\/ns2:reason&gt;\/", 4, "Test failed: text expected to contain \/ns2:StatusMessage&gt;&lt;ns2:success&gt;true&lt;\/ns2:success&gt;&lt;ns2:userId&gt;158074999&lt;\/ns2:userId&gt;&lt;ns2:reason&gt;Login Successful&lt;\/ns2:reason&gt;\/", 1, null, null], "isController": false}, {"data": ["POST Запрос на выход из учетной записи (AccountLogoutRequest)", 2105, 329, "500", 329, null, null, null, null, null, null, null, null], "isController": false}]}, function(index, item){
        return item;
    }, [[0, 0]], 0);

});
