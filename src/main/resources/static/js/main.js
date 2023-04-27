function getData(selectType, startDate, endDate, inHospital, gestationalAgeChart, birthWeightChart, complicationChart, prognosisChart) {
    $.get("/main/data?selectType=" + selectType + "&startDate=" + startDate + "&endDate=" + endDate + "&inHospital=" + inHospital, function (back, status) {
        if(status === "success") {
            if(back.code) {
                sequentialExecution(function () {
                    $("#PC-main-casesTotalNumber").html(back.casesTotalNumber);
                    $("#PC-main-ga32w").html(back.ga32w);
                    $("#PC-main-bw1500g").html(back.bw1500g);
                    $("#PC-main-todayAdd").html(back.todayAdd);
                    $("#PC-main-writing").html(back.writing);
                    $("#PC-main-completed").html(back.completed);
                    $("#PC-main-reviewPass").html(back.reviewPass);
                    $("#PC-main-reviewReject").html(back.reviewReject);
                    gestationalAgeChart.data.datasets[0].data = [back.gestationalAgeL26, back.gestationalAge26To27, back.gestationalAge28To31, back.gestationalAge32To33, back.gestationalAge34To36, back.gestationalAgeHE37];
                    birthWeightChart.data.datasets[0].data = [back.birthWeightL750, back.birthWeight750To999, back.birthWeight1000To1249, back.birthWeight1250To1499, back.birthWeight1500To2499, back.birthWeightHE2500];
                    complicationChart.data.datasets[0].data = [back.complicationBPD, back.complicationNEC, back.complicationROP, back.complicationIVH, back.complicationPVL, back.complicationRDS, back.complicationEOS, back.complicationLOS];
                    prognosisChart.data.datasets[0].data = [back.prognosisCured, back.prognosisDeathInHospital, back.prognosisGiveUpDeath, back.prognosisIneffectiveTreatment, back.prognosisTransfer];
                }, function () {
                    gestationalAgeChart.update();
                    birthWeightChart.update();
                    complicationChart.update();
                    prognosisChart.update();
                });
            }
        }
    },"json");
}
$(document).ready(function() {
    let date = new Date(),
        startDate = date.getFullYear() + "-01-01 00:00:00",
        endDate = dateFormat(date),
        gestationalAgeChart, birthWeightChart, complicationChart, prognosisChart;

    // 设置 初始 时间范围
    $("#PC-main-dateInput-start").val(startDate);
    $("#PC-main-dateInput-end").val(endDate);

    // 获取 首页数据
    $.get("/main/data?selectType=motherHospitalizationDate&startDate=" + startDate + "&endDate=" + endDate, function (back, status) {
        if(status === "success") {
            if(back.code) {
                $("#PC-main-casesTotalNumber").html(back.casesTotalNumber);
                $("#PC-main-ga32w").html(back.ga32w);
                $("#PC-main-bw1500g").html(back.bw1500g);
                $("#PC-main-todayAdd").html(back.todayAdd);
                $("#PC-main-writing").html(back.writing);
                $("#PC-main-completed").html(back.completed);
                $("#PC-main-reviewPass").html(back.reviewPass);
                $("#PC-main-reviewReject").html(back.reviewReject);

                const gestationalAgeChartData = [back.gestationalAgeL26, back.gestationalAge26To27, back.gestationalAge28To31, back.gestationalAge32To33, back.gestationalAge34To36, back.gestationalAgeHE37],
                    birthWeightChartData = [back.birthWeightL750, back.birthWeight750To999, back.birthWeight1000To1249, back.birthWeight1250To1499, back.birthWeight1500To2499, back.birthWeightHE2500],
                    complicationChartData = [back.complicationBPD, back.complicationNEC, back.complicationROP, back.complicationIVH, back.complicationPVL, back.complicationRDS, back.complicationEOS, back.complicationLOS],
                    prognosisChartData = [back.prognosisCured, back.prognosisDeathInHospital, back.prognosisGiveUpDeath, back.prognosisIneffectiveTreatment, back.prognosisTransfer],
                    options = {
                        categoryPercentage: 0.5,
                        scales: {
                            y: {
                                beginAtZero: true,
                                ticks: {
                                    stepSize: 1
                                }
                            }
                        },
                        layout: {
                            padding: {
                                top: 20
                            }
                        },
                        plugins: {
                            legend: {
                                display: false
                            },
                            datalabels: {
                                color: "#FFB7C5",
                                anchor: "end",
                                align: "top"
                            }
                        },
                    },
                    borderRadius = {
                        topLeft: 5,
                        topRight: 5
                    },
                    backgroundColor = "#FFB7C5",
                    hoverBackgroundColor = "rgba(255, 183, 197, 0.8)";

                const gestationalAgeChartElem = $("#gestationalAgeChart");
                let gestationalAgeOption = JSON.parse(JSON.stringify(options));
                gestationalAgeChart = new Chart(gestationalAgeChartElem, {
                    plugins: [ChartDataLabels],
                    type: "bar",
                    data: {
                        labels: ["<26", "26-27", "28-31", "32-33", "34-36", "≥37"],
                        datasets: [{
                            data: gestationalAgeChartData,
                            backgroundColor: backgroundColor,
                            borderRadius: borderRadius,
                            hoverBackgroundColor: hoverBackgroundColor,
                            hoverBorderRadius: 0
                        }]
                    },
                    options: gestationalAgeOption
                });
                const birthWeightChartElem = $("#birthWeightChart");
                let birthWeightOption = JSON.parse(JSON.stringify(options));
                birthWeightChart = new Chart(birthWeightChartElem, {
                    plugins: [ChartDataLabels],
                    type: "bar",
                    data: {
                        labels: ["<750", "750-999", "1000-1249", "1250-1499", "1500-2499", "≥2500"],
                        datasets: [{
                            data: birthWeightChartData,
                            backgroundColor: backgroundColor,
                            borderRadius: borderRadius,
                            hoverBackgroundColor: hoverBackgroundColor,
                            hoverBorderRadius: 0
                        }]
                    },
                    options: birthWeightOption
                });
                const complicationChartElem = $("#complicationChart");
                complicationChart = new Chart(complicationChartElem, {
                    plugins: [ChartDataLabels],
                    type: "bar",
                    data: {
                        labels: ["BPD", "NEC", "ROP", "IVH", "PVL", "RDS", "EOS", "LOS"],
                        datasets: [{
                            data: complicationChartData,
                            backgroundColor: backgroundColor,
                            borderRadius: borderRadius,
                            hoverBackgroundColor: hoverBackgroundColor,
                            hoverBorderRadius: 0
                        }]
                    },
                    options: options
                });
                const prognosisChartElem = $("#prognosisChart");
                prognosisChart = new Chart(prognosisChartElem, {
                    plugins: [ChartDataLabels],
                    type: "bar",
                    data: {
                        labels: ["治愈好转", "院内死亡", "放弃死亡", "救治无效", "转院"],
                        datasets: [{
                            data: prognosisChartData,
                            backgroundColor: backgroundColor,
                            borderRadius: borderRadius,
                            hoverBackgroundColor: hoverBackgroundColor,
                            hoverBorderRadius: 0
                        }]
                    },
                    options: options
                });
            }
        }
    },"json");

    // 引入 layui
    layui.use(["laydate", "form"], function () {
        let laydate = layui.laydate,
            form = layui.form;

        // 日期
        laydate.render({
            elem: "#PC-main-date",
            type: "datetime",
            format: "yyyy-MM-dd HH:mm:ss",
            max: 1,
            range: ["#PC-main-dateInput-start", "#PC-main-dateInput-end"]
        });

        // 筛选
        form.on("submit(filter)", function (data) {
            getData(data.field.selectType, data.field.startDate, data.field.endDate, data.field.inHospital, gestationalAgeChart, birthWeightChart, complicationChart, prognosisChart);
        });

        // 搜索 病历
        form.on("submit(search)", function (data) {
            window.sessionStorage.setItem("searchKey", data.field.searchKey);
            location.href = "/perinatalPlatform/case";
            return false;
        });
    });
});