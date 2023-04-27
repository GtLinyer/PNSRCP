// 画图
function drawChart(cga40WeekYear, cga40WeekMonth, fentonRealChartData, whoRealChartData, fentonChartJson, whoChartJson, chart) {
    let startCheckDateStamp = 0, endCheckDateStamp = 0, startCheckData, endCheckData;
    const trElem = $(".pc-db-table>tbody>tr");
    for (let i = 0; i < (trElem.length - 1); i ++) {
        const checkDataInput = $(trElem[i]).children("td:eq(2)").children("input").val(),
            cgaWeekInput = $(trElem[i]).children("td:eq(1)").children("input:eq(1)").val(),
            correctedAgeMonthInput = $(trElem[i]).children("td:eq(1)").children("input:eq(3)").val(),
            checkDateInput = $(trElem[i]).children("td:eq(0)").children("input").val();
        if (notNullTool(checkDataInput) && notNullTool(checkDateInput) && notNullTool(cgaWeekInput)) {
            const cgaWeek = parseInt(cgaWeekInput),
                correctedAgeMonth = parseInt(correctedAgeMonthInput),
                checkData = parseFloat(checkDataInput);
            // 画图
            if (cgaWeek < 40) {
                fentonRealChartData[cgaWeek - 23] = checkData;
                fentonChartJson.data.datasets[0].data = fentonRealChartData;
                chart.update();
            } else {
                whoRealChartData[correctedAgeMonth] = checkData;
                whoChartJson.data.datasets[0].data = whoRealChartData;
                chart.update();

                const checkDateStamp = Date.parse(checkDateInput);
                // 找出 起止 日期、数据
                if (startCheckDateStamp > 0) {
                    if (checkDateStamp < startCheckDateStamp) {
                        startCheckDateStamp = checkDateStamp;
                        startCheckData = checkData;
                    }
                } else {
                    startCheckDateStamp = checkDateStamp;
                    startCheckData = checkData;
                }
                if (endCheckDateStamp > 0) {
                    if (checkDateStamp > endCheckDateStamp) {
                        endCheckDateStamp = checkDateStamp;
                        endCheckData = checkData;
                    }
                } else {
                    endCheckDateStamp = checkDateStamp;
                    endCheckData = checkData;
                }
            }
        }
    }
}
// 计算 （体重、身长、头围）增长率
function computeGainRate(type) {
    let startCheckDateStamp = 0, endCheckDateStamp = 0, startCheckData, endCheckData;
    const trElem = $(".pc-db-table>tbody>tr");
    for (let i = 0; i < (trElem.length - 1); i ++) {
        const checkDataInput = $(trElem[i]).children("td:eq(2)").children("input").val(),
            cgaWeekInput = $(trElem[i]).children("td:eq(1)").children("input:eq(1)").val(),
            checkDateInput = $(trElem[i]).children("td:eq(0)").children("input").val();
        if (notNullTool(checkDataInput) && notNullTool(checkDateInput) && notNullTool(cgaWeekInput)) {
            const cgaWeek = parseInt(cgaWeekInput),
                checkData = parseFloat(checkDataInput);
            if (cgaWeek >= 40) {
                const checkDateStamp = Date.parse(checkDateInput);
                // 找出 起止 日期、数据
                if (startCheckDateStamp > 0) {
                    if (checkDateStamp < startCheckDateStamp) {
                        startCheckDateStamp = checkDateStamp;
                        startCheckData = checkData;
                    }
                } else {
                    startCheckDateStamp = checkDateStamp;
                    startCheckData = checkData;
                }
                if (endCheckDateStamp > 0) {
                    if (checkDateStamp > endCheckDateStamp) {
                        endCheckDateStamp = checkDateStamp;
                        endCheckData = checkData;
                    }
                } else {
                    endCheckDateStamp = checkDateStamp;
                    endCheckData = checkData;
                }
            }
        }
    }
    const weeks = (endCheckDateStamp - startCheckDateStamp) / 604800000;
    if (type === "weight") {
        const weightGainPerWeek = (endCheckData - startCheckData) * 1000 / weeks;
        $("#PC-db-WGR").val(weightGainPerWeek.toFixed(0));
    } else {
        const dataGainPerWeek = (endCheckData - startCheckData) / weeks;
        if (type === "length") {
            $("#PC-db-LGR").val(dataGainPerWeek.toFixed(2));
        } else if (type === "headCircumference") {
            $("#PC-db-HCGR").val(dataGainPerWeek.toFixed(2));
        }
    }
}
// 计算 矫正年龄
function computeCa(birthdayStamp, gaWeek, gaDay, cga40WeekDateStamp, index, chooseTime) {
    const chooseTimeStamp = Date.parse(chooseTime),
        dayAge = (chooseTimeStamp - birthdayStamp) / 86400000,
        allDay = gaWeek * 7 + gaDay + dayAge,
        cgaWeek = Math.floor(allDay / 7),
        cgaDay = allDay % 7;
    $("#PC-db-CGAW" + index).val(cgaWeek);
    $("#PC-db-CGAD" + index).val(cgaDay);
    if (cgaWeek < 40) {
        $("#PC-db-CA" + index).val(cgaWeek + "周 " + cgaDay + "天");
    } else {
        const correctedAgeMonth = Math.floor((chooseTimeStamp - cga40WeekDateStamp) / (30 * 86400000)),
            correctedAgeDay = ((chooseTimeStamp - cga40WeekDateStamp) % (30 * 86400000)) / 86400000;
        $("#PC-db-CAM" + index).val(correctedAgeMonth);
        $("#PC-db-CAD" + index).val(correctedAgeDay);
        $("#PC-db-CA" + index).val(correctedAgeMonth + "月 " + correctedAgeDay + "天");
    }
}
// 计算 热卡
function computeCalories(form, thisFrIndex) {
    const elem = $("#PC-db-BM" + thisFrIndex + ", #PC-db-PFM" + thisFrIndex + ", #PC-db-TFM" + thisFrIndex +
        ", #PC-db-AM" + thisFrIndex + ", #PC-db-HPM" + thisFrIndex);
    let value = [], breastMilkFortifier = -1;
    form.on("select(BMF" + thisFrIndex + ")", function (data) {
        if (data.value === "无") {
            breastMilkFortifier = 0;
        } else if (data.value === "半量强化") {
            breastMilkFortifier = 0.5 * 17.35;
        } else if (data.value === "全量强化") {
            breastMilkFortifier = 17.35;
        }
        let flag = 1;
        for (let i = 0; i < elem.length; i ++) {
            const thisValue = $(elem[i]).val();
            if (notNullTool(thisValue)) {
                value[i] = parseFloat(thisValue);
            } else {
                flag = 0;
            }
        }
        if (flag && breastMilkFortifier > -1) {
            const calories = value[0] * 0.67 + value[1] * 0.81 + value[2] * 0.67 + value[3] * 0.7 + value[4] * 0.7 + breastMilkFortifier;
            $("#PC-db-calories" + thisFrIndex).val(calories.toFixed(2));
        }
    });
    $(elem).on("focusout", function () {
        let flag = 1;
        for (let i = 0; i < elem.length; i ++) {
            const thisValue = $(elem[i]).val();
            if (notNullTool(thisValue)) {
                value[i] = parseFloat(thisValue);
            } else {
                flag = 0;
            }
        }
        if (flag && breastMilkFortifier > -1) {
            const calories = value[0] * 0.67 + value[1] * 0.81 + value[2] * 0.67 + value[3] * 0.7 + value[4] * 0.7 + breastMilkFortifier;
            $("#PC-db-calories" + thisFrIndex).val(calories.toFixed(2));
        }
    });
}
$(document).ready(function () {
    // 单选 按钮组
    $(".pc-db-option>li").on("click", function () {
        $(this).siblings().removeClass("pc-db-active");
        $(this).addClass("pc-db-active");
    });

    // 引入 layui
    layui.use(["element", "form", "laydate", "layer"], function () {
        let form = layui.form,
            laydate = layui.laydate,
            layer = layui.layer;

        // 随访数据库 随访信息
        if ($(".pc-db-FDFI").length > 0) {
            // 随访数据库 随访信息 取消点按
            $(".pc-db-FDFI .pc-db-radioBtn-group>li").off("click");
            layer.msg("任何信息修改后，请务必保存此页！");

            // 随访数据库 随访信息 添加/编辑 信息 提交
            form.on("submit(FI)", function (data) {
                const doing = "保存信息";
                loading(doing);
                let field = data.field;
                if (!notNullTool(field.childIdCardName)) {
                    delete field.childIdCardName;
                }
                $.post("/perinatalPlatform/followDatabase/write/FI/post", field, function (back, status) {
                    if (status === "success") {
                        if (back.code) {
                            successNext();
                        } else {failMsg(doing)}
                    } else {errorMsg1()}
                }, "json").fail(function () {errorMsg2()});
            });
        }

        // 图表 初始化
        const fentonLabels = ["22", "23", "24", "25", "26", "27", "28", "29", "30", "31", "32", "33", "34", "35", "36", "37", "38", "39", "40", "41", "42", "43", "44", "45", "46", "47", "48", "49", "50"],
            whoLabels = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31", "32", "33", "34", "35", "36", "37", "38", "39", "40", "41", "42", "43", "44", "45", "46", "47", "48", "49", "50", "51", "52", "53", "54", "55", "56", "57", "58", "59", "60"],
            options = {
                aspectRatio: 1.2,
                scales: {
                    x: {
                        title: {
                            color: "#FFB7C5",
                            display: true,
                            align: "end",
                            text: "周"
                        }
                    },
                    y: {
                        title: {
                            color: "#FFB7C5",
                            display: true,
                            align: "end"
                        },
                        ticks: {
                            stepSize: 0.1
                        }
                    }
                },
                plugins: {
                    title: {
                        display: true,
                        color: "#FFB7C5",
                        font: {
                            size: 16
                        }
                    }
                }
            },
            fentonChartJson = {
                type: "line",
                data: {
                    labels: fentonLabels,
                    datasets: [{
                        label: "实际值",
                        fill: false,
                        borderWidth: 3,
                        pointRadius: 1,
                        backgroundColor: "#10A64B",
                        borderColor: "#10A64B"
                    }, {
                        label: "3%",
                        fill: false,
                        borderWidth: 2,
                        pointRadius: 0,
                        backgroundColor: "#FADBD8",
                        borderColor: "#FADBD8"
                    }, {
                        label: "10%",
                        fill: false,
                        borderWidth: 2,
                        pointRadius: 0,
                        backgroundColor: "#E8DAEF",
                        borderColor: "#E8DAEF"
                    }, {
                        label: "50%",
                        fill: false,
                        borderWidth: 2,
                        pointRadius: 0,
                        backgroundColor: "#D6EAF8",
                        borderColor: "#D6EAF8"
                    }, {
                        label: "90%",
                        fill: false,
                        borderWidth: 2,
                        pointRadius: 0,
                        backgroundColor: "#D0ECE7",
                        borderColor: "#D0ECE7"
                    }, {
                        label: "97%",
                        fill: false,
                        borderWidth: 2,
                        pointRadius: 0,
                        backgroundColor: "#FDEBD0",
                        borderColor: "#FDEBD0"
                    }]
                }
            },
            whoChartJson = {
                type: "line",
                data: {
                    labels: whoLabels,
                    datasets: [{
                        label: "实际值",
                        fill: false,
                        borderWidth: 3,
                        pointRadius: 1,
                        backgroundColor: "#10A64B",
                        borderColor: "#10A64B"
                    }, {
                        label: "3%",
                        fill: false,
                        borderWidth: 2,
                        pointRadius: 0,
                        backgroundColor: "#FADBD8",
                        borderColor: "#FADBD8"
                    }, {
                        label: "10%",
                        fill: false,
                        borderWidth: 2,
                        pointRadius: 0,
                        backgroundColor: "#E8DAEF",
                        borderColor: "#E8DAEF"
                    }, {
                        label: "25%",
                        fill: false,
                        borderWidth: 2,
                        pointRadius: 0,
                        backgroundColor: "#CBDAF4",
                        borderColor: "#CBDAF4"
                    }, {
                        label: "50%",
                        fill: false,
                        borderWidth: 2,
                        pointRadius: 0,
                        backgroundColor: "#D6EAF8",
                        borderColor: "#D6EAF8"
                    }, {
                        label: "75%",
                        fill: false,
                        borderWidth: 2,
                        pointRadius: 0,
                        backgroundColor: "#D5DBDB",
                        borderColor: "#D5DBDB"
                    }, {
                        label: "90%",
                        fill: false,
                        borderWidth: 2,
                        pointRadius: 0,
                        backgroundColor: "#D0ECE7",
                        borderColor: "#D0ECE7"
                    }, {
                        label: "97%",
                        fill: false,
                        borderWidth: 2,
                        pointRadius: 0,
                        backgroundColor: "#FDEBD0",
                        borderColor: "#FDEBD0"
                    }]
                }
            };

        // 随访数据库 生长曲线 获取 基本信息
        const fdGcBwBlHcElem = $(".pc-db-FDGCBW, .pc-db-FDGCBL, .pc-db-FDGCHC, .pc-db-FDGCFD, .pc-db-FDGCGA, .pc-db-FDGCNT, " +
            ".pc-db-FDDLVI, .pc-db-FDDLHR, .pc-db-FDDLGS, .pc-db-FDDLGF, .pc-db-FDDLGM, .pc-db-FDDLCB, " +
            ".pc-db-FDGPOV, .pc-db-FDGPHT"),
            birthday = $(fdGcBwBlHcElem).attr("data-birthday"),
            birthdayStamp = Date.parse(birthday),
            childHospitalizationDate = $(fdGcBwBlHcElem).attr("data-chd"),
            childHospitalizationDateStamp = Date.parse(childHospitalizationDate),
            gestationalAgeWeek = parseInt($(fdGcBwBlHcElem).attr("data-gaw")),
            gestationalAgeDay = parseInt($(fdGcBwBlHcElem).attr("data-gad")),
            gender = $(fdGcBwBlHcElem).attr("data-gender"),
            cga40WeekDayAge = 40 * 7 - (gestationalAgeWeek * 7 + gestationalAgeDay),
            cga40WeekDateStamp = birthdayStamp + cga40WeekDayAge * 86400000,
            cga40WeekDate = new Date(cga40WeekDateStamp),
            cga40WeekYear = cga40WeekDate.getFullYear(),
            cga40WeekMonth = cga40WeekDate.getMonth();
        let weightFenton3ChartData, weightFenton10ChartData, weightFenton50ChartData, weightFenton90ChartData,
            weightFenton97ChartData,
            weightWho3ChartData, weightWho10ChartData, weightWho25ChartData, weightWho50ChartData, weightWho75ChartData,
            weightWho90ChartData, weightWho97ChartData,
            bodyLengthFenton3ChartData, bodyLengthFenton10ChartData, bodyLengthFenton50ChartData,
            bodyLengthFenton90ChartData, bodyLengthFenton97ChartData,
            bodyLengthWho3ChartData, bodyLengthWho10ChartData, bodyLengthWho25ChartData, bodyLengthWho50ChartData,
            bodyLengthWho75ChartData, bodyLengthWho90ChartData, bodyLengthWho97ChartData,
            headCircumferenceFenton3ChartData, headCircumferenceFenton10ChartData, headCircumferenceFenton50ChartData,
            headCircumferenceFenton90ChartData, headCircumferenceFenton97ChartData,
            headCircumferenceWho3ChartData, headCircumferenceWho10ChartData, headCircumferenceWho25ChartData,
            headCircumferenceWho50ChartData,
            headCircumferenceWho75ChartData, headCircumferenceWho90ChartData, headCircumferenceWho97ChartData;
        if (gender === "男") {
            // 男孩 体重 Fenton 数据
            weightFenton3ChartData = [0.38, 0.422, 0.46, 0.482, 0.516, 0.57, 0.61, 0.69, 0.79, 0.9, 1.08, 1.25, 1.49, 1.69, 1.91, 2.13, 2.35, 2.54, 2.72, 2.92, 3.11, 3.3, 3.5, 3.7, 3.9, 4.08, 4.29, 4.47, 4.65];
            weightFenton10ChartData = [0.418, 0.468, 0.516, 0.568, 0.627, 0.7, 0.781, 0.874, 0.99, 1.124, 1.3, 1.5, 1.72, 1.96, 2.18, 2.39, 2.59, 2.8, 2.98, 3.19, 3.39, 3.6, 3.8, 4, 4.22, 4.42, 4.62, 4.8, 5];
            weightFenton50ChartData = [0.495, 0.57, 0.65, 0.74, 0.841, 0.953, 1.079, 1.223, 1.388, 1.578, 1.79, 2.018, 2.255, 2.495, 2.73, 2.95, 3.16, 3.36, 3.57, 3.78, 4.01, 4.25, 4.49, 4.73, 4.97, 5.2, 5.41, 5.63, 5.83];
            weightFenton90ChartData = [0.58, 0.681, 0.786, 0.908, 1.039, 1.19, 1.348, 1.536, 1.75, 1.98, 2.23, 2.5, 2.766, 3.05, 3.29, 3.52, 3.75, 3.98, 4.19, 4.43, 4.7, 4.96, 5.25, 5.54, 5.82, 6.08, 6.3, 6.55, 6.8];
            weightFenton97ChartData = [0.62, 0.731, 0.845, 0.979, 1.145, 1.3, 1.49, 1.68, 1.9, 2.18, 2.42, 2.71, 3, 3.3, 3.56, 3.8, 4.04, 4.3, 4.5, 4.76, 5.04, 5.35, 5.68, 5.96, 6.24, 6.5, 6.76, 7.03, 7.28];
            // 男孩 体重 WHO 数据
            weightWho3ChartData = [2.5, 3.4, 4.4, 5.1, 5.6, 6.1, 6.4, 6.7, 7, 7.2, 7.5, 7.7, 7.8, 8, 8.2, 8.4, 8.5, 8.7, 8.9, 9, 9.2, 9.3, 9.5, 9.7, 9.8, 10, 10.1, 10.2, 10.4, 10.5, 10.7, 10.8, 10.9, 11.1, 11.2, 11.3, 11.4, 11.6, 11.7, 11.8, 11.9, 12.1, 12.2, 12.3, 12.4, 12.5, 12.7, 12.8, 12.9, 13, 13.1, 13.3, 13.4, 13.5, 13.6, 13.7, 13.8, 13.9, 14.1, 14.2, 14.3];
            weightWho10ChartData = [2.8, 3.8, 4.7, 5.5, 6, 6.5, 6.9, 7.2, 7.5, 7.7, 8, 8.2, 8.4, 8.6, 8.8, 9, 9.1, 9.3, 9.5, 9.7, 9.8, 10, 10.2, 10.3, 10.5, 10.7, 10.8, 11, 11.1, 11.3, 11.4, 11.6, 11.7, 11.9, 12, 12.2, 12.3, 12.4, 12.6, 12.7, 12.8, 13, 13.1, 13.2, 13.4, 13.5, 13.6, 13.8, 13.9, 14, 14.2, 14.3, 14.4, 14.6, 14.7, 14.8, 14.9, 15.1, 15.2, 15.3, 15.5];
            weightWho25ChartData = [3, 4.1, 5.1, 5.9, 6.5, 7, 7.4, 7.7, 8, 8.3, 8.5, 8.7, 9, 9.2, 9.4, 9.6, 9.8, 10, 10.1, 10.3, 10.5, 10.7, 10.9, 11.1, 11.3, 11.4, 11.6, 11.8, 12, 12.1, 12.3, 12.4, 12.6, 12.8, 12.9, 13.1, 13.2, 13.4, 13.5, 13.7, 13.8, 14, 14.1, 14.3, 14.4, 14.6, 14.7, 14.9, 15, 15.2, 15.3, 15.4, 15.6, 15.7, 15.9, 16, 16.2, 16.3, 16.5, 16.6, 16.7];
            weightWho50ChartData = [3.3, 4.5, 5.6, 6.4, 7, 7.5, 7.9, 8.3, 8.6, 8.9, 9.2, 9.4, 9.6, 9.9, 10.1, 10.3, 10.5, 10.7, 10.9, 11.1, 11.3, 11.5, 11.8, 12, 12.2, 12.4, 12.5, 12.7, 12.9, 13.1, 13.3, 13.5, 13.7, 13.8, 14, 14.2, 14.3, 14.5, 14.7, 14.8, 15, 15.2, 15.3, 15.5, 15.7, 15.8, 16, 16.2, 16.3, 16.5, 16.7, 16.8, 17, 17.2, 17.3, 17.5, 17.7, 17.8, 18, 18.2, 18.3];
            weightWho75ChartData = [3.7, 4.9, 6, 6.9, 7.6, 8.1, 8.5, 8.9, 9.3, 9.6, 9.9, 10.1, 10.4, 10.6, 10.9, 11.1, 11.3, 11.6, 11.8, 12, 12.2, 12.5, 12.7, 12.9, 13.1, 13.3, 13.6, 13.8, 14, 14.2, 14.4, 14.6, 14.8, 15, 15.2, 15.4, 15.6, 15.8, 15.9, 16.1, 16.3, 16.5, 16.7, 16.9, 17.1, 17.3, 17.4, 17.6, 17.8, 18, 18.2, 18.4, 18.6, 18.8, 19, 19.2, 19.3, 19.5, 19.7, 19.9, 20.1];
            weightWho90ChartData = [4, 5.3, 6.5, 7.4, 8.1, 8.6, 9.1, 9.5, 9.9, 10.2, 10.5, 10.8, 11.1, 11.4, 11.6, 11.9, 12.1, 12.4, 12.6, 12.9, 13.1, 13.3, 13.6, 13.8, 14.1, 14.3, 14.6, 14.8, 15, 15.2, 15.5, 15.7, 15.9, 16.1, 16.3, 16.6, 16.8, 17, 17.2, 17.4, 17.6, 17.8, 18, 18.2, 18.4, 18.6, 18.9, 19.1, 19.3, 19.5, 19.7, 19.9, 20.1, 20.3, 20.6, 20.8, 21, 21.2, 21.4, 21.6, 21.9];
            weightWho97ChartData = [4.3, 5.7, 7, 7.9, 8.6, 9.2, 9.7, 10.2, 10.5, 10.9, 11.2, 11.5, 11.8, 12.1, 12.4, 12.7, 12.9, 13.2, 13.5, 13.7, 14, 14.3, 14.5, 14.8, 15.1, 15.3, 15.6, 15.9, 16.1, 16.4, 16.6, 16.9, 17.1, 17.3, 17.6, 17.8, 18, 18.3, 18.5, 18.7, 19, 19.2, 19.4, 19.7, 19.9, 20.1, 20.4, 20.6, 20.9, 21.1, 21.3, 21.6, 21.8, 22.1, 22.3, 22.5, 22.8, 23, 23.3, 23.5, 23.8];
            // 男孩 身长 Fenton 数据
            bodyLengthFenton3ChartData = [25, 26, 27.2, 28.3, 29.5, 30.7, 32, 33.2, 34.6, 36, 37.2, 38.6, 40, 41.2, 42.5, 43.9, 45, 46, 47, 47.9, 49, 49.9, 50.8, 51.7, 52.5, 53.3, 54.1, 54.9, 55.6];
            bodyLengthFenton10ChartData = [26, 27.2, 28.3, 29.65, 30.8, 32.1, 33.3, 34.7, 36, 37.4, 38.8, 40.1, 41.5, 42.8, 44, 45.2, 46.3, 47.3, 48.3, 49.2, 50.2, 51.1, 52, 52.9, 53.7, 54.5, 55.2, 56, 56.8];
            bodyLengthFenton50ChartData = [28.16, 29.51, 30.9, 32.3, 33.7, 35.1, 36.44, 37.8, 39.2, 40.6, 42, 43.4, 44.7, 46, 47.2, 48.25, 49.3, 50.25, 51.15, 52.05, 52.95, 53.8, 54.7, 55.5, 56.3, 57.1, 57.85, 58.6, 59.35];
            bodyLengthFenton90ChartData = [30.24, 31.9, 33.4, 35, 36.6, 38, 39.6, 41, 42.4, 43.9, 45.2, 46.7, 48, 49.2, 50.3, 51.3, 52.3, 53.2, 54, 54.9, 55.7, 56.6, 57.4, 58.2, 59, 59.7, 60.5, 61.2, 62];
            bodyLengthFenton97ChartData = [31.2, 32.9, 34.6, 36.2, 37.9, 39.5, 40.9, 42.3, 44, 45.2, 46.9, 48, 49.6, 50.8, 51.9, 52.8, 53.8, 54.7, 55.3, 56.2, 57, 57.9, 58.7, 59.3, 60.2, 61.1, 61.8, 62.4, 63.1];
            // 男孩 身长 WHO 数据
            bodyLengthWho3ChartData = [46.3, 51.1, 54.7, 57.6, 60, 61.9, 63.6, 65.1, 66.5, 67.7, 69, 70.2, 71.3, 72.4, 73.4, 74.4, 75.4, 76.3, 77.2, 78.1, 78.9, 79.7, 80.5, 81.3, 82.1, 82.1, 82.8, 83.5, 84.2, 84.9, 85.5, 86.2, 86.8, 87.4, 88, 88.5, 89.1, 89.7, 90.2, 90.8, 91.3, 91.9, 92.4, 92.9, 93.4, 93.9, 94.4, 94.9, 95.4, 95.9, 96.4, 96.9, 97.4, 97.9, 98.4, 98.8, 99.3, 99.8, 100.3, 100.8, 101.2];
            bodyLengthWho10ChartData = [47.5, 52.2, 55.9, 58.8, 61.2, 63.2, 64.9, 66.4, 67.8, 69.1, 70.4, 71.6, 72.7, 73.8, 74.9, 75.9, 76.9, 77.9, 78.8, 79.7, 80.6, 81.5, 82.3, 83.1, 83.9, 84, 84.7, 85.5, 86.2, 86.9, 87.6, 88.2, 88.9, 89.5, 90.1, 90.7, 91.3, 91.9, 92.5, 93.1, 93.7, 94.2, 94.8, 95.3, 95.9, 96.4, 96.9, 97.4, 98, 98.5, 99, 99.5, 100, 100.5, 101, 101.5, 102, 102.5, 103, 103.5, 104];
            bodyLengthWho25ChartData = [48.6, 53.4, 57.1, 60.1, 62.5, 64.5, 66.2, 67.7, 69.1, 70.5, 71.7, 73, 74.1, 75.3, 76.4, 77.4, 78.5, 79.5, 80.4, 81.4, 82.3, 83.2, 84.1, 84.9, 85.8, 85.9, 86.7, 87.4, 88.2, 88.9, 89.6, 90.3, 91, 91.7, 92.3, 93, 93.6, 94.2, 94.8, 95.4, 96, 96.6, 97.2, 97.7, 98.3, 98.9, 99.4, 100, 100.5, 101, 101.6, 102.1, 102.6, 103.2, 103.7, 104.2, 104.7, 105.3, 105.8, 106.3, 106.8];
            bodyLengthWho50ChartData = [49.9, 54.7, 58.4, 61.4, 63.9, 65.9, 67.6, 69.2, 70.6, 72, 73.3, 74.5, 75.7, 76.9, 78, 79.1, 80.2, 81.2, 82.3, 83.2, 84.2, 85.1, 86, 86.9, 87.8, 88, 88.8, 89.6, 90.4, 91.2, 91.9, 92.7, 93.4, 94.1, 94.8, 95.4, 96.1, 96.7, 97.4, 98, 98.6, 99.2, 99.9, 100.4, 101, 101.6, 102.2, 102.8, 103.3, 103.9, 104.4, 105, 105.6, 106.1, 106.7, 107.2, 107.8, 108.3, 108.9, 109.4, 110];
            bodyLengthWho75ChartData = [51.2, 56, 59.8, 62.8, 65.3, 67.3, 69.1, 70.6, 72.1, 73.5, 74.8, 76.1, 77.4, 78.6, 79.7, 80.9, 82, 83, 84.1, 85.1, 86.1, 87.1, 88, 89, 89.9, 90.1, 90.9, 91.8, 92.6, 93.4, 94.2, 95, 95.7, 96.5, 97.2, 97.9, 98.6, 99.3, 99.9, 100.6, 101.3, 101.9, 102.5, 103.1, 103.8, 104.4, 105, 105.6, 106.2, 106.7, 107.3, 107.9, 108.5, 109.1, 109.6, 110.2, 110.8, 111.4, 111.9, 112.5, 113.1];
            bodyLengthWho90ChartData = [52.3, 57.2, 61, 64, 66.6, 68.6, 70.4, 71.9, 73.4, 74.8, 76.2, 77.5, 78.8, 80, 81.2, 82.4, 83.5, 84.6, 85.7, 86.8, 87.8, 88.8, 89.8, 90.8, 91.7, 92, 92.9, 93.8, 94.6, 95.5, 96.3, 97.1, 97.9, 98.6, 99.4, 100.1, 100.8, 101.5, 102.2, 102.9, 103.6, 104.3, 104.9, 105.6, 106.2, 106.8, 107.5, 108.1, 108.7, 109.3, 109.9, 110.5, 111.1, 111.7, 112.3, 112.9, 113.5, 114.1, 114.7, 115.3, 115.9];
            bodyLengthWho97ChartData = [53.4, 58.4, 62.2, 65.3, 67.8, 69.9, 71.6, 73.2, 74.7, 76.2, 77.6, 78.9, 80.2, 81.5, 82.7, 83.9, 85.1, 86.2, 87.3, 88.4, 89.5, 90.5, 91.6, 92.6, 93.6, 93.8, 94.8, 95.7, 96.6, 97.5, 98.3, 99.2, 100, 100.8, 101.5, 102.3, 103.1, 103.8, 104.5, 105.2, 105.9, 106.6, 107.3, 108, 108.6, 109.3, 109.9, 110.6, 111.2, 111.8, 112.5, 113.1, 113.7, 114.3, 115, 115.6, 116.2, 116.8, 117.4, 118.1, 118.7];
            // 男孩 头围 Fenton 数据
            headCircumferenceFenton3ChartData = [17.6, 18.4, 19.3, 20.2, 21.1, 22.1, 23, 23.9, 24.9, 25.8, 26.7, 27.5, 28.2, 29.1, 29.9, 30.6, 31.1, 31.8, 32.3, 33, 33.5, 34, 34.5, 35, 35.4, 35.9, 36.4, 36.8, 37.2];
            headCircumferenceFenton10ChartData = [18.3, 19.21, 20.11, 21.1, 22, 22.9, 23.84, 24.8, 25.7, 26.6, 27.5, 28.4, 29.2, 30, 30.75, 31.4, 32.1, 32.7, 33.2, 33.75, 34.3, 34.8, 35.25, 35.7, 36.2, 36.6, 37.1, 37.5, 37.95];
            headCircumferenceFenton50ChartData = [19.28, 20.76, 21.76, 22.72, 23.7, 24.67, 25.64, 26.6, 27.54, 28.46, 29.4, 30.26, 31.14, 31.93, 32.65, 33.33, 33.95, 34.5, 35.05, 35.55, 36.05, 36.5, 36.98, 37.4, 37.85, 38.25, 38.68, 39.1, 39.5];
            headCircumferenceFenton90ChartData = [21.3, 22.3, 23.35, 24.36, 25.4, 26.4, 27.4, 28.4, 29.4, 30.34, 31.3, 32.2, 33, 33.8, 34.6, 35.2, 35.8, 36.4, 36.9, 37.35, 37.8, 38.25, 38.7, 39.1, 39.5, 39.9, 40.3, 40.65, 41.05];
            headCircumferenceFenton97ChartData = [21.96, 23, 24.1, 25.2, 26.2, 27.2, 28.2, 29.3, 30.2, 31.2, 32.1, 33, 34, 34.8, 35.4, 36.1, 36.8, 37.3, 37.8, 38.2, 38.7, 39.1, 39.5, 39.8, 40.2, 40.7, 41, 41.4, 41.8];
            // 男孩 头围 WHO 数据
            headCircumferenceWho3ChartData = [32.1, 35.1, 36.9, 38.3, 39.4, 40.3, 41, 41.7, 42.2, 42.6, 43, 43.4, 43.6, 43.9, 44.1, 44.3, 44.5, 44.7, 44.9, 45, 45.2, 45.3, 45.4, 45.6, 45.7, 45.8, 45.9, 46, 46.1, 46.2, 46.3, 46.4, 46.5, 46.6, 46.6, 46.7, 46.8, 46.9, 46.9, 47, 47, 47.1, 47.2, 47.2, 47.3, 47.3, 47.4, 47.4, 47.5, 47.5, 47.5, 47.6, 47.6, 47.7, 47.7, 47.7, 47.8, 47.8, 47.9, 47.9, 47.9];
            headCircumferenceWho10ChartData = [32.8, 35.8, 37.6, 39, 40.1, 41, 41.8, 42.4, 42.9, 43.4, 43.8, 44.1, 44.4, 44.7, 44.9, 45.1, 45.3, 45.5, 45.7, 45.8, 46, 46.1, 46.3, 46.4, 46.5, 46.6, 46.7, 46.8, 47, 47.1, 47.1, 47.2, 47.3, 47.4, 47.5, 47.6, 47.6, 47.7, 47.8, 47.8, 47.9, 48, 48, 48.1, 48.1, 48.2, 48.2, 48.3, 48.3, 48.4, 48.4, 48.5, 48.5, 48.6, 48.6, 48.6, 48.7, 48.7, 48.8, 48.8, 48.8];
            headCircumferenceWho25ChartData = [33.6, 36.5, 38.3, 39.7, 40.8, 41.7, 42.5, 43.1, 43.7, 44.2, 44.6, 44.9, 45.2, 45.5, 45.7, 45.9, 46.1, 46.3, 46.5, 46.6, 46.8, 46.9, 47.1, 47.2, 47.3, 47.5, 47.6, 47.7, 47.8, 47.9, 48, 48.1, 48.2, 48.3, 48.3, 48.4, 48.5, 48.6, 48.6, 48.7, 48.8, 48.8, 48.9, 49, 49, 49.1, 49.1, 49.2, 49.2, 49.3, 49.3, 49.4, 49.4, 49.5, 49.5, 49.5, 49.6, 49.6, 49.7, 49.7, 49.7];
            headCircumferenceWho50ChartData = [34.5, 37.3, 39.1, 40.5, 41.6, 42.6, 43.3, 44, 44.5, 45, 45.4, 45.8, 46.1, 46.3, 46.6, 46.8, 47, 47.2, 47.4, 47.5, 47.7, 47.8, 48, 48.1, 48.3, 48.4, 48.5, 48.6, 48.7, 48.8, 48.9, 49, 49.1, 49.2, 49.3, 49.4, 49.5, 49.5, 49.6, 49.7, 49.7, 49.8, 49.9, 49.9, 50, 50.1, 50.1, 50.2, 50.2, 50.3, 50.3, 50.4, 50.4, 50.4, 50.5, 50.5, 50.6, 50.6, 50.7, 50.7, 50.7];
            headCircumferenceWho75ChartData = [35.3, 38.1, 39.9, 41.3, 42.4, 43.4, 44.2, 44.8, 45.4, 45.8, 46.3, 46.6, 46.9, 47.2, 47.5, 47.7, 47.9, 48.1, 48.3, 48.4, 48.6, 48.7, 48.9, 49, 49.2, 49.3, 49.4, 49.5, 49.7, 49.8, 49.9, 50, 50.1, 50.2, 50.3, 50.3, 50.4, 50.5, 50.6, 50.6, 50.7, 50.8, 50.8, 50.9, 51, 51, 51.1, 51.1, 51.2, 51.2, 51.3, 51.3, 51.4, 51.4, 51.5, 51.5, 51.6, 51.6, 51.7, 51.7, 51.7];
            headCircumferenceWho90ChartData = [36.1, 38.8, 40.6, 42, 43.2, 44.1, 44.9, 45.6, 46.1, 46.6, 47, 47.4, 47.7, 48, 48.3, 48.5, 48.7, 48.9, 49.1, 49.2, 49.4, 49.6, 49.7, 49.9, 50, 50.1, 50.3, 50.4, 50.5, 50.6, 50.7, 50.8, 50.9, 51, 51.1, 51.2, 51.3, 51.4, 51.4, 51.5, 51.6, 51.7, 51.7, 51.8, 51.9, 51.9, 52, 52, 52.1, 52.1, 52.2, 52.2, 52.3, 52.3, 52.4, 52.4, 52.5, 52.5, 52.6, 52.6, 52.7];
            headCircumferenceWho97ChartData = [36.9, 39.5, 41.3, 42.7, 43.9, 44.8, 45.6, 46.3, 46.9, 47.4, 47.8, 48.2, 48.5, 48.8, 49, 49.3, 49.5, 49.7, 49.9, 50, 50.2, 50.4, 50.5, 50.7, 50.8, 50.9, 51.1, 51.2, 51.3, 51.4, 51.6, 51.7, 51.8, 51.9, 52, 52, 52.1, 52.2, 52.3, 52.4, 52.4, 52.5, 52.6, 52.7, 52.7, 52.8, 52.8, 52.9, 53, 53, 53.1, 53.1, 53.2, 53.2, 53.3, 53.3, 53.4, 53.4, 53.5, 53.5, 53.5];
        } else if (gender === "女") {
            // 女孩 体重 Fenton 数据
            weightFenton3ChartData = [0.376, 0.4, 0.44, 0.472, 0.5, 0.52, 0.55, 0.6, 0.7, 0.82, 0.99, 1.18, 1.39, 1.6, 1.83, 2.04, 2.25, 2.42, 2.58, 2.72, 2.9, 3.05, 3.22, 3.39, 3.58, 3.71, 3.9, 4.04, 4.2];
            weightFenton10ChartData = [0.405, 0.444, 0.486, 0.536, 0.59, 0.642, 0.712, 0.8, 0.9, 1.04, 1.2, 1.4, 1.62, 1.85, 2.07, 2.29, 2.49, 2.67, 2.82, 2.98, 3.15, 3.32, 3.51, 3.69, 3.88, 4.04, 4.22, 4.39, 4.55];
            weightFenton50ChartData = [0.482, 0.537, 0.606, 0.694, 0.792, 0.899, 1.017, 1.152, 1.306, 1.482, 1.681, 1.897, 2.126, 2.36, 2.6, 2.83, 3.05, 3.24, 3.41, 3.6, 3.79, 3.99, 4.19, 4.4, 4.6, 4.8, 5, 5.18, 5.36];
            weightFenton90ChartData = [0.573, 0.645, 0.74, 0.86, 0.99, 1.136, 1.3, 1.48, 1.69, 1.9, 2.15, 2.4, 2.67, 2.94, 3.2, 3.45, 3.7, 3.92, 4.1, 4.3, 4.52, 4.76, 5, 5.21, 5.47, 5.68, 5.9, 6.1, 6.3];
            weightFenton97ChartData = [0.62, 0.7, 0.8, 0.928, 1.09, 1.24, 1.43, 1.61, 1.85, 2.1, 2.37, 2.64, 2.94, 3.22, 3.5, 3.79, 4.03, 4.28, 4.47, 4.69, 4.91, 5.16, 5.4, 5.64, 5.9, 6.12, 6.38, 6.6, 6.8];
            // 女孩 体重 WHO 数据
            weightWho3ChartData = [2.4, 3.2, 4, 4.6, 5.1, 5.5, 5.8, 6.1, 6.3, 6.6, 6.8, 7, 7.1, 7.3, 7.5, 7.7, 7.8, 8, 8.2, 8.3, 8.5, 8.7, 8.8, 9, 9.2, 9.3, 9.5, 9.6, 9.8, 10, 10.1, 10.3, 10.4, 10.5, 10.7, 10.8, 11, 11.1, 11.2, 11.4, 11.5, 11.6, 11.8, 11.9, 12, 12.1, 12.3, 12.4, 12.5, 12.6, 12.8, 12.9, 13, 13.1, 13.2, 13.4, 13.5, 13.6, 13.7, 13.8, 14];
            weightWho10ChartData = [2.7, 3.5, 4.3, 5, 5.5, 5.9, 6.2, 6.5, 6.8, 7, 7.3, 7.5, 7.7, 7.9, 8, 8.2, 8.4, 8.6, 8.8, 8.9, 9.1, 9.3, 9.5, 9.7, 9.8, 10, 10.2, 10.4, 10.5, 10.7, 10.9, 11, 11.2, 11.3, 11.5, 11.6, 11.8, 11.9, 12.1, 12.2, 12.4, 12.5, 12.7, 12.8, 13, 13.1, 13.2, 13.4, 13.5, 13.7, 13.8, 13.9, 14.1, 14.2, 14.3, 14.5, 14.6, 14.8, 14.9, 15, 15.2];
            weightWho25ChartData = [2.9, 3.8, 4.7, 5.4, 5.9, 6.4, 6.7, 7, 7.3, 7.6, 7.8, 8, 8.2, 8.4, 8.6, 8.8, 9, 9.2, 9.4, 9.6, 9.8, 10, 10.2, 10.4, 10.6, 10.8, 10.9, 11.1, 11.3, 11.5, 11.7, 11.9, 12, 12.2, 12.4, 12.5, 12.7, 12.9, 13, 13.2, 13.4, 13.5, 13.7, 13.9, 14, 14.2, 14.3, 14.5, 14.7, 14.8, 15, 15.1, 15.3, 15.4, 15.6, 15.8, 15.9, 16.1, 16.2, 16.4, 16.5];
            weightWho50ChartData = [3.2, 4.2, 5.1, 5.8, 6.4, 6.9, 7.3, 7.6, 7.9, 8.2, 8.5, 8.7, 8.9, 9.2, 9.4, 9.6, 9.8, 10, 10.2, 10.4, 10.6, 10.9, 11.1, 11.3, 11.5, 11.7, 11.9, 12.1, 12.3, 12.5, 12.7, 12.9, 13.1, 13.3, 13.5, 13.7, 13.9, 14, 14.2, 14.4, 14.6, 14.8, 15, 15.2, 15.3, 15.5, 15.7, 15.9, 16.1, 16.3, 16.4, 16.6, 16.8, 17, 17.2, 17.3, 17.5, 17.7, 17.9, 18, 18.2];
            weightWho75ChartData = [3.6, 4.6, 5.6, 6.4, 7, 7.5, 7.9, 8.3, 8.6, 8.9, 9.2, 9.5, 9.7, 10, 10.2, 10.4, 10.7, 10.9, 11.1, 11.4, 11.6, 11.8, 12, 12.3, 12.5, 12.7, 12.9, 13.2, 13.4, 13.6, 13.8, 14.1, 14.3, 14.5, 14.7, 14.9, 15.1, 15.3, 15.6, 15.8, 16, 16.2, 16.4, 16.6, 16.8, 17, 17.3, 17.5, 17.7, 17.9, 18.1, 18.3, 18.5, 18.7, 18.9, 19.1, 19.3, 19.6, 19.8, 20, 20.2];
            weightWho90ChartData = [3.9, 5, 6, 6.9, 7.5, 8.1, 8.5, 8.9, 9.3, 9.6, 9.9, 10.2, 10.5, 10.8, 11, 11.3, 11.5, 11.8, 12, 12.3, 12.5, 12.8, 13, 13.3, 13.5, 13.8, 14, 14.3, 14.5, 14.7, 15, 15.2, 15.5, 15.7, 15.9, 16.2, 16.4, 16.7, 16.9, 17.1, 17.4, 17.6, 17.9, 18.1, 18.3, 18.6, 18.8, 19.1, 19.3, 19.5, 19.8, 20, 20.3, 20.5, 20.8, 21, 21.2, 21.5, 21.7, 21.9, 22.2];
            weightWho97ChartData = [4.2, 5.4, 6.5, 7.4, 8.1, 8.7, 9.2, 9.6, 10, 10.4, 10.7, 11, 11.3, 11.6, 11.9, 12.2, 12.5, 12.7, 13, 13.3, 13.5, 13.8, 14.1, 14.3, 14.6, 14.9, 15.2, 15.4, 15.7, 16, 16.2, 16.5, 16.8, 17, 17.3, 17.6, 17.8, 18.1, 18.4, 18.6, 18.9, 19.2, 19.5, 19.7, 20, 20.3, 20.6, 20.8, 21.1, 21.4, 21.7, 22, 22.2, 22.5, 22.8, 23.1, 23.3, 23.6, 23.9, 24.2, 24.4];
            // 女孩 身长 Fenton 数据
            bodyLengthFenton3ChartData = [24.6, 25.6, 26.8, 27.9, 28.9, 30, 31.1, 32.3, 33.8, 34.9, 36.2, 37.8, 39, 40.2, 41.8, 42.9, 44, 45.1, 46.1, 47.2, 48, 48.9, 49.9, 50.6, 51.3, 52, 52.8, 53.4, 54.2];
            bodyLengthFenton10ChartData = [25.5, 26.7, 27.9, 29, 30.2, 31.4, 32.8, 33.9, 35.2, 36.5, 37.9, 39.18, 40.6, 41.9, 43.2, 44.2, 45.5, 46.5, 47.5, 48.45, 49.3, 50.2, 51, 51.8, 52.5, 53.2, 54, 54.6, 55.3];
            bodyLengthFenton50ChartData = [27.6, 28.91, 30.26, 31.6, 32.94, 34.3, 35.7, 37.04, 38.45, 39.84, 41.24, 42.66, 44, 45.3, 46.45, 47.55, 48.6, 49.55, 50.45, 51.3, 52.1, 52.9, 53.7, 54.4, 55.15, 55.85, 56.55, 57.25, 57.9];
            bodyLengthFenton90ChartData = [29.6, 31.1, 32.67, 34.2, 35.7, 37.2, 38.7, 40.2, 41.7, 43.2, 44.7, 46, 47.36, 48.6, 49.7, 50.8, 51.7, 52.5, 53.3, 54.1, 54.9, 55.6, 56.3, 57, 57.8, 58.5, 59.1, 59.9, 60.5];
            bodyLengthFenton97ChartData = [30.6, 32.3, 33.9, 35.4, 37, 38.6, 40.1, 41.8, 43.1, 44.9, 46.1, 47.8, 49, 50.1, 51.2, 52.1, 53.1, 54, 54.8, 55.4, 56.2, 57, 57.7, 58.3, 59.1, 59.8, 60.4, 61.2, 61.9];
            // 女孩 身长 WHO 数据
            bodyLengthWho3ChartData = [45.6, 50, 53.2, 55.8, 58, 59.9, 61.5, 62.9, 64.3, 65.6, 66.8, 68, 69.2, 70.3, 71.3, 72.4, 73.3, 74.3, 75.2, 76.2, 77, 77.9, 78.7, 79.6, 80.3, 80.4, 81.2, 81.9, 82.6, 83.4, 84, 84.7, 85.4, 86, 86.7, 87.3, 87.9, 88.5, 89.1, 89.7, 90.3, 90.8, 91.4, 92, 92.5, 93, 93.6, 94.1, 94.6, 95.1, 95.7, 96.2, 96.7, 97.2, 97.6, 98.1, 98.6, 99.1, 99.6, 100, 100.5];
            bodyLengthWho10ChartData = [46.8, 51.2, 54.5, 57.1, 59.3, 61.2, 62.8, 64.3, 65.7, 67, 68.3, 69.5, 70.7, 71.8, 72.9, 74, 75, 76, 77, 77.9, 78.8, 79.7, 80.6, 81.5, 82.3, 82.4, 83.2, 83.9, 84.7, 85.4, 86.2, 86.9, 87.5, 88.2, 88.9, 89.5, 90.2, 90.8, 91.4, 92, 92.6, 93.2, 93.8, 94.4, 95, 95.6, 96.1, 96.7, 97.2, 97.8, 98.3, 98.8, 99.3, 99.9, 100.4, 100.9, 101.4, 101.9, 102.4, 102.8, 103.3];
            bodyLengthWho25ChartData = [47.9, 52.4, 55.7, 58.4, 60.6, 62.5, 64.2, 65.7, 67.2, 68.5, 69.8, 71.1, 72.3, 73.4, 74.6, 75.7, 76.7, 77.7, 78.7, 79.7, 80.7, 81.6, 82.5, 83.4, 84.2, 84.4, 85.2, 86, 86.8, 87.6, 88.3, 89, 89.7, 90.4, 91.1, 91.8, 92.5, 93.1, 93.8, 94.4, 95.1, 95.7, 96.3, 96.9, 97.5, 98.1, 98.7, 99.3, 99.8, 100.4, 100.9, 101.5, 102, 102.6, 103.1, 103.6, 104.2, 104.7, 105.2, 105.7, 106.2];
            bodyLengthWho50ChartData = [49.1, 53.7, 57.1, 59.8, 62.1, 64, 65.7, 67.3, 68.7, 70.1, 71.5, 72.8, 74, 75.2, 76.4, 77.5, 78.6, 79.7, 80.7, 81.7, 82.7, 83.7, 84.6, 85.5, 86.4, 86.6, 87.4, 88.3, 89.1, 89.9, 90.7, 91.4, 92.2, 92.9, 93.6, 94.4, 95.1, 95.7, 96.4, 97.1, 97.7, 98.4, 99, 99.7, 100.3, 100.9, 101.5, 102.1, 102.7, 103.3, 103.9, 104.5, 105, 105.6, 106.2, 106.7, 107.3, 107.8, 108.4, 108.9, 109.4];
            bodyLengthWho75ChartData = [50.4, 55, 58.4, 61.2, 63.5, 65.5, 67.3, 68.8, 70.3, 71.8, 73.1, 74.5, 75.8, 77, 78.2, 79.4, 80.5, 81.6, 82.7, 83.7, 84.7, 85.7, 86.7, 87.7, 88.6, 88.8, 89.7, 90.6, 91.4, 92.2, 93.1, 93.9, 94.6, 95.4, 96.2, 96.9, 97.6, 98.3, 99, 99.7, 100.4, 101.1, 101.8, 102.4, 103.1, 103.7, 104.4, 105, 105.6, 106.3, 106.9, 107.5, 108.1, 108.6, 109.2, 109.8, 110.4, 111, 111.5, 112.1, 112.6];
            bodyLengthWho90ChartData = [51.5, 56.2, 59.7, 62.5, 64.9, 66.9, 68.6, 70.3, 71.8, 73.2, 74.6, 76, 77.3, 78.6, 79.8, 81, 82.2, 83.3, 84.4, 85.5, 86.6, 87.6, 88.6, 89.6, 90.6, 90.8, 91.7, 92.6, 93.5, 94.4, 95.2, 96, 96.8, 97.6, 98.4, 99.2, 99.9, 100.7, 101.4, 102.1, 102.9, 103.6, 104.3, 104.9, 105.6, 106.3, 107, 107.6, 108.3, 108.9, 109.5, 110.1, 110.8, 111.4, 112, 112.6, 113.2, 113.8, 114.4, 114.9, 115.5];
            bodyLengthWho97ChartData = [52.7, 57.4, 60.9, 63.8, 66.2, 68.2, 70, 71.6, 73.2, 74.7, 76.1, 77.5, 78.9, 80.2, 81.4, 82.7, 83.9, 85, 86.2, 87.3, 88.4, 89.4, 90.5, 91.5, 92.5, 92.8, 93.7, 94.6, 95.6, 96.4, 97.3, 98.2, 99, 99.8, 100.6, 101.4, 102.2, 103, 103.7, 104.5, 105.2, 106, 106.7, 107.4, 108.1, 108.8, 109.5, 110.2, 110.8, 111.5, 112.1, 112.8, 113.4, 114.1, 114.7, 115.3, 116, 116.6, 117.2, 117.8, 118.4];
            // 女孩 头围 Fenton 数据
            headCircumferenceFenton3ChartData = [17.4, 18.2, 19, 19.9, 20.8, 21.6, 22.4, 23.3, 24.2, 25.1, 26, 27, 27.9, 28.6, 29.4, 30.2, 30.8, 31.5, 32.1, 32.7, 33.2, 33.7, 34.1, 34.5, 34.9, 35.3, 35.7, 36, 36.3];
            headCircumferenceFenton10ChartData = [18.06, 18.9, 19.78, 20.67, 21.5, 22.4, 23.28, 24.2, 25.1, 26, 26.9, 27.84, 28.7, 29.6, 30.4, 31.1, 31.75, 32.4, 32.9, 33.5, 33.95, 34.4, 34.85, 35.25, 35.65, 36, 36.4, 36.7, 37.1];
            headCircumferenceFenton50ChartData = [19.5, 20.4, 21.34, 22.26, 23.2, 24.14, 25.06, 26, 26.95, 27.9, 28.84, 29.76, 30.66, 31.48, 32.25, 32.95, 33.57, 34.15, 34.7, 35.2, 35.65, 36.1, 36.5, 36.9, 37.28, 37.65, 37.98, 38.32, 38.65];
            headCircumferenceFenton90ChartData = [20.9, 21.9, 22.9, 23.9, 24.9, 25.84, 26.8, 27.8, 28.76, 29.8, 30.7, 31.7, 32.54, 33.4, 34.1, 34.8, 35.4, 35.95, 36.45, 36.9, 37.4, 37.8, 38.2, 38.55, 38.9, 39.25, 39.6, 39.9, 40.2];
            headCircumferenceFenton97ChartData = [21.6, 22.6, 23.6, 24.6, 25.6, 26.7, 27.7, 28.7, 29.7, 30.6, 31.7, 32.5, 33.4, 34.2, 35, 35.6, 36.2, 36.9, 37.3, 37.8, 38.1, 38.5, 39, 39.3, 39.7, 40, 40.4, 40.7, 41];
            // 女孩 头围 WHO 数据
            headCircumferenceWho3ChartData = [31.7, 34.3, 36, 37.2, 38.2, 39, 39.7, 40.4, 40.9, 41.3, 41.7, 42, 42.3, 42.6, 42.9, 43.1, 43.3, 43.5, 43.6, 43.8, 44, 44.1, 44.3, 44.4, 44.6, 44.7, 44.8, 44.9, 45.1, 45.2, 45.3, 45.4, 45.5, 45.6, 45.7, 45.8, 45.9, 45.9, 46, 46.1, 46.2, 46.2, 46.3, 46.4, 46.4, 46.5, 46.5, 46.6, 46.7, 46.7, 46.8, 46.8, 46.9, 46.9, 47, 47, 47.1, 47.1, 47.2, 47.2, 47.2];
            headCircumferenceWho10ChartData = [32.4, 35, 36.7, 37.9, 39, 39.8, 40.5, 41.1, 41.7, 42.1, 42.5, 42.9, 43.2, 43.4, 43.7, 43.9, 44.1, 44.3, 44.5, 44.6, 44.8, 45, 45.1, 45.3, 45.4, 45.5, 45.7, 45.8, 45.9, 46, 46.1, 46.2, 46.3, 46.4, 46.5, 46.6, 46.7, 46.8, 46.9, 46.9, 47, 47.1, 47.1, 47.2, 47.3, 47.3, 47.4, 47.5, 47.5, 47.6, 47.6, 47.7, 47.7, 47.8, 47.8, 47.9, 47.9, 48, 48, 48.1, 48.1];
            headCircumferenceWho25ChartData = [33.1, 35.8, 37.4, 38.7, 39.7, 40.6, 41.3, 41.9, 42.5, 42.9, 43.3, 43.7, 44, 44.3, 44.5, 44.7, 44.9, 45.1, 45.3, 45.5, 45.6, 45.8, 46, 46.1, 46.2, 46.4, 46.5, 46.6, 46.8, 46.9, 47, 47.1, 47.2, 47.3, 47.4, 47.5, 47.6, 47.6, 47.7, 47.8, 47.9, 47.9, 48, 48.1, 48.1, 48.2, 48.3, 48.3, 48.4, 48.4, 48.5, 48.5, 48.6, 48.6, 48.7, 48.7, 48.8, 48.8, 48.9, 48.9, 49];
            headCircumferenceWho50ChartData = [33.9, 36.5, 38.3, 39.5, 40.6, 41.5, 42.2, 42.8, 43.4, 43.8, 44.2, 44.6, 44.9, 45.2, 45.4, 45.7, 45.9, 46.1, 46.2, 46.4, 46.6, 46.7, 46.9, 47, 47.2, 47.3, 47.5, 47.6, 47.7, 47.8, 47.9, 48, 48.1, 48.2, 48.3, 48.4, 48.5, 48.6, 48.7, 48.7, 48.8, 48.9, 49, 49, 49.1, 49.2, 49.2, 49.3, 49.3, 49.4, 49.4, 49.5, 49.5, 49.6, 49.6, 49.7, 49.7, 49.8, 49.8, 49.9, 49.9];
            headCircumferenceWho75ChartData = [34.7, 37.3, 39.1, 40.4, 41.4, 42.3, 43.1, 43.7, 44.3, 44.7, 45.1, 45.5, 45.8, 46.1, 46.3, 46.6, 46.8, 47, 47.2, 47.3, 47.5, 47.7, 47.8, 48, 48.1, 48.3, 48.4, 48.5, 48.7, 48.8, 48.9, 49, 49.1, 49.2, 49.3, 49.4, 49.5, 49.5, 49.6, 49.7, 49.8, 49.8, 49.9, 50, 50.1, 50.1, 50.2, 50.2, 50.3, 50.3, 50.4, 50.5, 50.5, 50.6, 50.6, 50.7, 50.7, 50.7, 50.8, 50.8, 50.9];
            headCircumferenceWho90ChartData = [35.4, 38, 39.8, 41.1, 42.2, 43.1, 43.9, 44.5, 45.1, 45.5, 46, 46.3, 46.6, 46.9, 47.2, 47.4, 47.6, 47.8, 48, 48.2, 48.4, 48.5, 48.7, 48.8, 49, 49.1, 49.2, 49.4, 49.5, 49.6, 49.7, 49.8, 49.9, 50, 50.1, 50.2, 50.3, 50.4, 50.5, 50.6, 50.6, 50.7, 50.8, 50.8, 50.9, 51, 51, 51.1, 51.2, 51.2, 51.3, 51.3, 51.4, 51.4, 51.5, 51.5, 51.6, 51.6, 51.7, 51.7, 51.7];
            headCircumferenceWho97ChartData = [36.1, 38.8, 40.5, 41.9, 43, 43.9, 44.6, 45.3, 45.9, 46.3, 46.8, 47.1, 47.5, 47.7, 48, 48.2, 48.5, 48.7, 48.8, 49, 49.2, 49.4, 49.5, 49.7, 49.8, 49.9, 50.1, 50.2, 50.3, 50.5, 50.6, 50.7, 50.8, 50.9, 51, 51.1, 51.2, 51.3, 51.3, 51.4, 51.5, 51.6, 51.6, 51.7, 51.8, 51.8, 51.9, 51.9, 52, 52.1, 52.1, 52.2, 52.2, 52.3, 52.3, 52.4, 52.4, 52.5, 52.5, 52.6, 52.6];
        }

        // 随访数据库 生长曲线 体重
        if ($(".pc-db-FDGCBW").length > 0) {
            // 体重 曲线图
            let weightChart, weightFentonRealChartData = [], weightWhoRealChartData = [], weightFentonChartJson,
                weightWhoChartJson;
            // 获取 Fenton曲线 体重 数据
            $.get("/perinatalPlatform/followDatabase/write/GC/BW/fentonData", function (back, status) {
                if (status === "success") {
                    if (back.code) {
                        const bwBlHcList = back.bwBlHcList;
                        // 遍历 体重
                        for (const i in bwBlHcList) {
                            const day = parseInt(bwBlHcList[i].day),
                                bodyWeight = parseFloat(bwBlHcList[i].weight),
                                beforeHospitalDay = (childHospitalizationDateStamp - birthdayStamp) / 86400000,
                                cgAllDay = gestationalAgeWeek * 7 + gestationalAgeDay + beforeHospitalDay + day,
                                cgaWeek = Math.floor(cgAllDay / 7);
                            if (cgAllDay % 7 === 0) {
                                weightFentonRealChartData[cgaWeek - 23] = bodyWeight;
                            }
                        }
                        const weightChartElem = $("#PC-chart-weight");
                        let weightOption = JSON.parse(JSON.stringify(options));
                        // 体重 Fenton曲线
                        weightOption.plugins.title.text = "kg";
                        weightOption.scales.x.title.text = "周";
                        weightOption.scales.y.title.text = "kg";
                        weightFentonChartJson = JSON.parse(JSON.stringify(fentonChartJson));
                        weightFentonChartJson.data.datasets[0].data = weightFentonRealChartData;
                        weightFentonChartJson.data.datasets[1].data = weightFenton3ChartData;
                        weightFentonChartJson.data.datasets[2].data = weightFenton10ChartData;
                        weightFentonChartJson.data.datasets[3].data = weightFenton50ChartData;
                        weightFentonChartJson.data.datasets[4].data = weightFenton90ChartData;
                        weightFentonChartJson.data.datasets[5].data = weightFenton97ChartData;
                        weightFentonChartJson.options = weightOption;
                        weightChart = new Chart($(weightChartElem), weightFentonChartJson);
                        // 计算 体重 增长速度
                        computeGainRate("weight");

                        // 选择 Fenton 和 WHO
                        $(".pc-db-option>li").on("click", function () {
                            const value = $(this).attr("data-value");
                            if (value === "Fenton") {
                                // 体重 Fenton 曲线
                                weightChart.destroy();
                                weightOption.scales.x.title.text = "周";
                                weightFentonChartJson = JSON.parse(JSON.stringify(fentonChartJson));
                                weightFentonChartJson.data.datasets[0].data = weightFentonRealChartData;
                                weightFentonChartJson.data.datasets[1].data = weightFenton3ChartData;
                                weightFentonChartJson.data.datasets[2].data = weightFenton10ChartData;
                                weightFentonChartJson.data.datasets[3].data = weightFenton50ChartData;
                                weightFentonChartJson.data.datasets[4].data = weightFenton90ChartData;
                                weightFentonChartJson.data.datasets[5].data = weightFenton97ChartData;
                                weightFentonChartJson.options = weightOption;
                                weightChart = new Chart($(weightChartElem), weightFentonChartJson);
                            } else if (value === "WHO") {
                                // 体重 WHO 曲线
                                weightChart.destroy();
                                weightOption.scales.x.title.text = "月";
                                weightWhoChartJson = JSON.parse(JSON.stringify(whoChartJson));
                                weightWhoChartJson.data.datasets[0].data = weightWhoRealChartData;
                                weightWhoChartJson.data.datasets[1].data = weightWho3ChartData;
                                weightWhoChartJson.data.datasets[2].data = weightWho10ChartData;
                                weightWhoChartJson.data.datasets[3].data = weightWho25ChartData;
                                weightWhoChartJson.data.datasets[4].data = weightWho50ChartData;
                                weightWhoChartJson.data.datasets[5].data = weightWho75ChartData;
                                weightWhoChartJson.data.datasets[6].data = weightWho90ChartData;
                                weightWhoChartJson.data.datasets[7].data = weightWho97ChartData;
                                weightWhoChartJson.options = weightOption;
                                weightChart = new Chart($(weightChartElem), weightWhoChartJson);
                                drawChart(cga40WeekYear, cga40WeekMonth, weightFentonRealChartData, weightWhoRealChartData, weightFentonChartJson, weightWhoChartJson, weightChart);
                            }
                        });
                    }
                }
            }, "json");

            let wcIndex = 0;
            // 初始化 体重检查
            const wcIndexInput = $(".pc-db-FDGCBW .pc-db-table>tbody").attr("data-num");
            if (notNullTool(wcIndexInput)) {
                wcIndex = parseInt(wcIndexInput);
                // 为 日期 选择 初始化
                for (let i = 1; i <= wcIndex; i++) {
                    const thisWcIndex = i;
                    // 计算 矫正年龄
                    computeCa(birthdayStamp, gestationalAgeWeek, gestationalAgeDay, cga40WeekDateStamp, thisWcIndex, $("#PC-db-WCD" + thisWcIndex).val());
                    laydate.render({
                        elem: "#PC-db-WCD" + thisWcIndex,
                        type: "date",
                        format: "yyyy-MM-dd",
                        min: cga40WeekDateStamp,
                        max: 0,
                        done: function (value) {
                            if (value !== "") {
                                // 计算 矫正年龄
                                computeCa(birthdayStamp, gestationalAgeWeek, gestationalAgeDay, cga40WeekDateStamp, thisWcIndex, value);
                                // 计算 体重 增长速度
                                computeGainRate("weight");
                                // 画图
                                drawChart(cga40WeekYear, cga40WeekMonth, weightFentonRealChartData, weightWhoRealChartData, weightFentonChartJson, weightWhoChartJson, weightChart);
                            }
                        }
                    });
                    // 检查 体重大小
                    $("#PC-db-BW" + thisWcIndex).on("focusout", function () {
                        if (notNullTool($(this).val())) {
                            const bodyWeight = parseFloat($(this).val());
                            if (bodyWeight > 100) {
                                layer.msg("注意体重单位为<span class='layui-badge'>kg</span>！", {
                                    icon: 5,
                                    time: 3000,
                                    anim: 6,
                                    btn: "好",
                                    resize: false,
                                    shade: 0.8
                                }, function () {
                                    $("#PC-db-BW" + thisWcIndex).val("");
                                });
                            } else {
                                // 计算 体重 增长速度
                                computeGainRate("weight");
                                // 画图
                                drawChart(cga40WeekYear, cga40WeekMonth, weightFentonRealChartData, weightWhoRealChartData, weightFentonChartJson, weightWhoChartJson, weightChart);
                            }
                        }
                    });
                    // 删除 体重检查 行
                    $("#PC-db-wcDelete" + thisWcIndex).on("click", function () {
                        const that = this;
                        layer.msg("确定要 <span class='pc-db-status-color-no'>删除</span> 此条体重检查信息吗?", {
                            icon: 7,
                            time: 0,
                            anim: 6,
                            btn: ["确定", "取消"],
                            resize: false,
                            shade: 0.8,
                            yes: function (index) {
                                $(that).parents("tr").remove();
                                // 计算 体重检查 次数
                                const wcTimes = $(".pc-db-FDGCBW .pc-db-table>tbody>tr").length - 1;
                                $("#PC-db-WCN").val(wcTimes);
                                layer.close(index);
                            }
                        });
                    });
                }
            }
            // 增加 体重检查
            $("#PC-db-addWC").on("click", function () {
                const that = this;
                wcIndex++;
                sequentialExecution(function () {
                    $(that).parents("tr").before(
                        "<tr>" +
                        "   <td>" +
                        "       <input id='PC-db-WCD" + wcIndex + "' type='text' name='weightCheckDate" + wcIndex + "' lay-verify='required' placeholder='请选择检查时间' lay-reqText='请选择检查时间！' readonly>" +
                        "   </td>" +
                        "   <td>" +
                        "       <input id='PC-db-CA" + wcIndex + "' type='text' readonly>" +
                        "       <input id='PC-db-CGAW" + wcIndex + "' type='hidden' name='cgaWeek" + wcIndex + "'>" +
                        "       <input id='PC-db-CGAD" + wcIndex + "' type='hidden' name='cgaDay" + wcIndex + "'>" +
                        "       <input id='PC-db-CAM" + wcIndex + "' type='hidden' name='correctedAgeMonth" + wcIndex + "'>" +
                        "       <input id='PC-db-CAD" + wcIndex + "' type='hidden' name='correctedAgeDay" + wcIndex + "'>" +
                        "   </td>" +
                        "   <td>" +
                        "       <input id='PC-db-BW" + wcIndex + "' type='number' name='bodyWeight" + wcIndex + "' lay-verify='required' placeholder='请填写体重' lay-reqText='请填写体重！'>" +
                        "   </td>" +
                        "   <td>" +
                        "       <button id='PC-db-wcDelete" + wcIndex + "' class='pc-btn pc-btn-danger'><i class='iconfont icon-delete'></i></button>" +
                        "   </td>" +
                        "</tr>");
                }, function () {
                    const thisWcIndex = wcIndex;
                    laydate.render({
                        elem: "#PC-db-WCD" + thisWcIndex,
                        type: "date",
                        format: "yyyy-MM-dd",
                        min: cga40WeekDateStamp,
                        max: 0,
                        done: function (value) {
                            if (value !== "") {
                                // 计算 矫正年龄
                                computeCa(birthdayStamp, gestationalAgeWeek, gestationalAgeDay, cga40WeekDateStamp, thisWcIndex, value);
                                // 计算 体重 增长速度
                                computeGainRate("weight");
                                // 画图
                                drawChart(cga40WeekYear, cga40WeekMonth, weightFentonRealChartData, weightWhoRealChartData, weightFentonChartJson, weightWhoChartJson, weightChart);
                            }
                        }
                    });
                    // 检查 体重大小
                    $("#PC-db-BW" + thisWcIndex).on("focusout", function () {
                        if (notNullTool($(this).val())) {
                            const bodyWeight = parseFloat($(this).val());
                            if (bodyWeight > 100) {
                                layer.msg("注意体重单位为<span class='layui-badge'>kg</span>！", {
                                    icon: 5,
                                    time: 3000,
                                    anim: 6,
                                    btn: "好",
                                    resize: false,
                                    shade: 0.8
                                }, function () {
                                    $("#PC-db-BW" + thisWcIndex).val("");
                                });
                            } else {
                                // 计算 体重 增长速度
                                computeGainRate("weight");
                                // 画图
                                drawChart(cga40WeekYear, cga40WeekMonth, weightFentonRealChartData, weightWhoRealChartData, weightFentonChartJson, weightWhoChartJson, weightChart);
                            }
                        }
                    });
                    // 计算 体重检查 次数
                    const wcTimes = $(".pc-db-FDGCBW .pc-db-table>tbody>tr").length - 1;
                    $("#PC-db-WCN").val(wcTimes);
                    // 删除 体重检查 行
                    $("#PC-db-wcDelete" + thisWcIndex).on("click", function () {
                        const that = this;
                        layer.msg("确定要 <span class='pc-db-status-color-no'>删除</span> 此条体重检查信息吗?", {
                            icon: 7,
                            time: 0,
                            anim: 6,
                            btn: ["确定", "取消"],
                            resize: false,
                            shade: 0.8,
                            yes: function (index) {
                                $(that).parents("tr").remove();
                                // 计算 体重检查 次数
                                const wcTimes = $(".pc-db-FDGCBW .pc-db-table>tbody>tr").length - 1;
                                $("#PC-db-WCN").val(wcTimes);
                                layer.close(index);
                            }
                        });
                    });
                });
            });

            // 随访数据库 生长曲线 体重 添加/编辑 信息 提交
            form.on("submit(GCBW)", function (data) {
                const doing = "保存信息";
                loading(doing);
                let field = data.field, wcArray = [];
                for (let i = 1; i <= wcIndex; i++) {
                    if (notNullTool(field["weightCheckDate" + i])) {
                        wcArray.push({
                            weightCheckDate: field["weightCheckDate" + i],
                            cgaWeek: field["cgaWeek" + i],
                            cgaDay: field["cgaDay" + i],
                            correctedAgeMonth: field["correctedAgeMonth" + i],
                            correctedAgeDay: field["correctedAgeDay" + i],
                            bodyWeight: field["bodyWeight" + i]
                        });
                        delete field["weightCheckDate" + i];
                        delete field["cgaWeek" + i];
                        delete field["cgaDay" + i];
                        delete field["correctedAgeMonth" + i];
                        delete field["correctedAgeDay" + i];
                        delete field["bodyWeight" + i];
                    }
                }
                field.wcArray = JSON.stringify(wcArray);
                if (!notNullTool(field.weightGainRate)) {
                    delete field.weightGainRate;
                }
                $.post("/perinatalPlatform/followDatabase/write/GC/BW/post", field, function (back, status) {
                    if (status === "success") {
                        if (back.code) {
                            successNext();
                        } else {failMsg(doing)}
                    } else {errorMsg1()}
                }, "json").fail(function () {errorMsg2()});
            });
        }

        // 随访数据库 生长曲线 身长
        if ($(".pc-db-FDGCBL").length > 0) {
            // 身长 Fenton 曲线图
            let bodyLengthChart, bodyLengthFentonRealChartData = [], bodyLengthWhoRealChartData = [],
                bodyLengthFentonChartJson, bodyLengthWhoChartJson;
            // 获取 Fenton曲线 身长 数据
            $.get("/perinatalPlatform/followDatabase/write/GC/BW/fentonData", function (back, status) {
                if (status === "success") {
                    if (back.code) {
                        const bwBlHcList = back.bwBlHcList;
                        // 遍历 身长
                        for (const i in bwBlHcList) {
                            const day = parseInt(bwBlHcList[i].day),
                                bodyLength = parseFloat(bwBlHcList[i].bodyLength),
                                beforeHospitalDay = (childHospitalizationDateStamp - birthdayStamp) / 86400000,
                                cgAllDay = gestationalAgeWeek * 7 + gestationalAgeDay + beforeHospitalDay + day,
                                cgaWeek = Math.floor(cgAllDay / 7);
                            if (cgAllDay % 7 === 0) {
                                bodyLengthFentonRealChartData[cgaWeek - 23] = bodyLength;
                            }
                        }
                        const bodyLengthChartElem = $("#PC-chart-length");
                        let bodyLengthOption = JSON.parse(JSON.stringify(options));
                        // 身长 Fenton曲线
                        bodyLengthOption.plugins.title.text = "cm";
                        bodyLengthOption.scales.x.title.text = "周";
                        bodyLengthOption.scales.y.title.text = "cm";
                        bodyLengthFentonChartJson = JSON.parse(JSON.stringify(fentonChartJson));
                        bodyLengthFentonChartJson.data.datasets[0].data = bodyLengthFentonRealChartData;
                        bodyLengthFentonChartJson.data.datasets[1].data = bodyLengthFenton3ChartData;
                        bodyLengthFentonChartJson.data.datasets[2].data = bodyLengthFenton10ChartData;
                        bodyLengthFentonChartJson.data.datasets[3].data = bodyLengthFenton50ChartData;
                        bodyLengthFentonChartJson.data.datasets[4].data = bodyLengthFenton90ChartData;
                        bodyLengthFentonChartJson.data.datasets[5].data = bodyLengthFenton97ChartData;
                        bodyLengthFentonChartJson.options = bodyLengthOption;
                        bodyLengthChart = new Chart($(bodyLengthChartElem), bodyLengthFentonChartJson);
                        // 计算 身长 增长速度
                        computeGainRate("length");

                        // 选择 Fenton 和 WHO
                        $(".pc-db-option>li").on("click", function () {
                            const value = $(this).attr("data-value");
                            if (value === "Fenton") {
                                // 身长 Fenton 曲线
                                bodyLengthChart.destroy();
                                bodyLengthOption.scales.x.title.text = "周";
                                bodyLengthFentonChartJson = JSON.parse(JSON.stringify(fentonChartJson));
                                bodyLengthFentonChartJson.data.datasets[0].data = bodyLengthFentonRealChartData;
                                bodyLengthFentonChartJson.data.datasets[1].data = bodyLengthFenton3ChartData;
                                bodyLengthFentonChartJson.data.datasets[2].data = bodyLengthFenton10ChartData;
                                bodyLengthFentonChartJson.data.datasets[3].data = bodyLengthFenton50ChartData;
                                bodyLengthFentonChartJson.data.datasets[4].data = bodyLengthFenton90ChartData;
                                bodyLengthFentonChartJson.data.datasets[5].data = bodyLengthFenton97ChartData;
                                bodyLengthFentonChartJson.options = bodyLengthOption;
                                bodyLengthChart = new Chart($(bodyLengthChartElem), bodyLengthFentonChartJson);
                            } else if (value === "WHO") {
                                // 身长 WHO 曲线
                                bodyLengthChart.destroy();
                                bodyLengthOption.scales.x.title.text = "月";
                                bodyLengthWhoChartJson = JSON.parse(JSON.stringify(whoChartJson));
                                bodyLengthWhoChartJson.data.datasets[0].data = bodyLengthWhoRealChartData;
                                bodyLengthWhoChartJson.data.datasets[1].data = bodyLengthWho3ChartData;
                                bodyLengthWhoChartJson.data.datasets[2].data = bodyLengthWho10ChartData;
                                bodyLengthWhoChartJson.data.datasets[3].data = bodyLengthWho25ChartData;
                                bodyLengthWhoChartJson.data.datasets[4].data = bodyLengthWho50ChartData;
                                bodyLengthWhoChartJson.data.datasets[5].data = bodyLengthWho75ChartData;
                                bodyLengthWhoChartJson.data.datasets[6].data = bodyLengthWho90ChartData;
                                bodyLengthWhoChartJson.data.datasets[7].data = bodyLengthWho97ChartData;
                                bodyLengthWhoChartJson.options = bodyLengthOption;
                                bodyLengthChart = new Chart($(bodyLengthChartElem), bodyLengthWhoChartJson);
                                drawChart(cga40WeekYear, cga40WeekMonth, bodyLengthFentonRealChartData, bodyLengthWhoRealChartData, bodyLengthFentonChartJson, bodyLengthWhoChartJson, bodyLengthChart);
                            }
                        });
                    }
                }
            }, "json");

            let lcIndex = 0;
            // 初始化 身长检查
            const lcIndexInput = $(".pc-db-FDGCBL .pc-db-table>tbody").attr("data-num");
            if (notNullTool(lcIndexInput)) {
                lcIndex = parseInt(lcIndexInput);
                // 为 日期 选择 初始化
                for (let i = 1; i <= lcIndex; i++) {
                    const thisLcIndex = i;
                    // 计算 矫正年龄
                    computeCa(birthdayStamp, gestationalAgeWeek, gestationalAgeDay, cga40WeekDateStamp, thisLcIndex, $("#PC-db-LCD" + thisLcIndex).val());
                    laydate.render({
                        elem: "#PC-db-LCD" + thisLcIndex,
                        type: "date",
                        format: "yyyy-MM-dd",
                        min: cga40WeekDateStamp,
                        max: 0,
                        done: function (value) {
                            if (value !== "") {
                                // 计算 矫正年龄
                                computeCa(birthdayStamp, gestationalAgeWeek, gestationalAgeDay, cga40WeekDateStamp, thisLcIndex, value);
                                // 计算 身长 增长速度
                                computeGainRate("length");
                                // 画图
                                drawChart(cga40WeekYear, cga40WeekMonth, bodyLengthFentonRealChartData, bodyLengthWhoRealChartData, bodyLengthFentonChartJson, bodyLengthWhoChartJson, bodyLengthChart);
                            }
                        }
                    });
                    $("#PC-db-BL" + thisLcIndex).on("focusout", function () {
                        // 计算 身长 增长速度
                        computeGainRate("length");
                        // 画图
                        drawChart(cga40WeekYear, cga40WeekMonth, bodyLengthFentonRealChartData, bodyLengthWhoRealChartData, bodyLengthFentonChartJson, bodyLengthWhoChartJson, bodyLengthChart);
                    });
                    // 删除 身长检查 行
                    $("#PC-db-lcDelete" + thisLcIndex).on("click", function () {
                        const that = this;
                        layer.msg("确定要 <span class='pc-db-status-color-no'>删除</span> 此条身长检查信息吗?", {
                            icon: 7,
                            time: 0,
                            anim: 6,
                            btn: ["确定", "取消"],
                            resize: false,
                            shade: 0.8,
                            yes: function (index) {
                                $(that).parents("tr").remove();
                                // 计算 身长检查 次数
                                const lcTimes = $(".pc-db-FDGCBL .pc-db-table>tbody>tr").length - 1;
                                $("#PC-db-LCN").val(lcTimes);
                                layer.close(index);
                            }
                        });
                    });
                }
            }
            // 增加 身长检查
            $("#PC-db-addLC").on("click", function () {
                const that = this;
                lcIndex++;
                sequentialExecution(function () {
                    $(that).parents("tr").before(
                        "<tr>" +
                        "   <td>" +
                        "       <input id='PC-db-LCD" + lcIndex + "' type='text' name='lengthCheckDate" + lcIndex + "' lay-verify='required' placeholder='请选择检查时间' lay-reqText='请选择检查时间！' readonly>" +
                        "   </td>" +
                        "   <td>" +
                        "       <input id='PC-db-CA" + lcIndex + "' type='text' readonly>" +
                        "       <input id='PC-db-CGAW" + lcIndex + "' type='hidden' name='cgaWeek" + lcIndex + "'>" +
                        "       <input id='PC-db-CGAD" + lcIndex + "' type='hidden' name='cgaDay" + lcIndex + "'>" +
                        "       <input id='PC-db-CAM" + lcIndex + "' type='hidden' name='correctedAgeMonth" + lcIndex + "'>" +
                        "       <input id='PC-db-CAD" + lcIndex + "' type='hidden' name='correctedAgeDay" + lcIndex + "'>" +
                        "   </td>" +
                        "   <td>" +
                        "       <input id='PC-db-BL" + lcIndex + "' type='number' name='bodyLength" + lcIndex + "' lay-verify='required' placeholder='请填写身长' lay-reqText='请填写身长！'>" +
                        "   </td>" +
                        "   <td>" +
                        "       <button id='PC-db-lcDelete" + lcIndex + "' class='pc-btn pc-btn-danger'><i class='iconfont icon-delete'></i></button>" +
                        "   </td>" +
                        "</tr>");
                }, function () {
                    const thisLcIndex = lcIndex;
                    laydate.render({
                        elem: "#PC-db-LCD" + thisLcIndex,
                        type: "date",
                        format: "yyyy-MM-dd",
                        min: cga40WeekDateStamp,
                        max: 0,
                        done: function (value) {
                            if (value !== "") {
                                // 计算 矫正年龄
                                computeCa(birthdayStamp, gestationalAgeWeek, gestationalAgeDay, cga40WeekDateStamp, thisLcIndex, value);
                                // 计算 身长 增长速度
                                computeGainRate("length");
                                // 画图
                                drawChart(cga40WeekYear, cga40WeekMonth, bodyLengthFentonRealChartData, bodyLengthWhoRealChartData, bodyLengthFentonChartJson, bodyLengthWhoChartJson, bodyLengthChart);
                            }
                        }
                    });
                    $("#PC-db-BL" + thisLcIndex).on("focusout", function () {
                        // 计算 身长 增长速度
                        computeGainRate("length");
                        // 画图
                        drawChart(cga40WeekYear, cga40WeekMonth, bodyLengthFentonRealChartData, bodyLengthWhoRealChartData, bodyLengthFentonChartJson, bodyLengthWhoChartJson, bodyLengthChart);
                    });
                    // 计算 身长检查 次数
                    const lcTimes = $(".pc-db-FDGCBL .pc-db-table>tbody>tr").length - 1;
                    $("#PC-db-LCN").val(lcTimes);
                    // 删除 身长检查 行
                    $("#PC-db-lcDelete" + thisLcIndex).on("click", function () {
                        const that = this;
                        layer.msg("确定要 <span class='pc-db-status-color-no'>删除</span> 此条身长检查信息吗?", {
                            icon: 7,
                            time: 0,
                            anim: 6,
                            btn: ["确定", "取消"],
                            resize: false,
                            shade: 0.8,
                            yes: function (index) {
                                $(that).parents("tr").remove();
                                // 计算 身长检查 次数
                                const lcTimes = $(".pc-db-FDGCBL .pc-db-table>tbody>tr").length - 1;
                                $("#PC-db-LCN").val(lcTimes);
                                layer.close(index);
                            }
                        });
                    });
                });
            });

            // 随访数据库 生长曲线 身长 添加/编辑 信息 提交
            form.on("submit(GCBL)", function (data) {
                const doing = "保存信息";
                loading(doing);
                let field = data.field, lcArray = [];
                for (let i = 1; i <= lcIndex; i++) {
                    if (notNullTool(field["lengthCheckDate" + i])) {
                        lcArray.push({
                            lengthCheckDate: field["lengthCheckDate" + i],
                            cgaWeek: field["cgaWeek" + i],
                            cgaDay: field["cgaDay" + i],
                            correctedAgeMonth: field["correctedAgeMonth" + i],
                            correctedAgeDay: field["correctedAgeDay" + i],
                            bodyLength: field["bodyLength" + i]
                        });
                        delete field["lengthCheckDate" + i];
                        delete field["cgaWeek" + i];
                        delete field["cgaDay" + i];
                        delete field["correctedAgeMonth" + i];
                        delete field["correctedAgeDay" + i];
                        delete field["bodyLength" + i];
                    }
                }
                field.lcArray = JSON.stringify(lcArray);
                if (!notNullTool(field.lengthGainRate)) {
                    delete field.lengthGainRate;
                }
                $.post("/perinatalPlatform/followDatabase/write/GC/BL/post", field, function (back, status) {
                    if (status === "success") {
                        if (back.code) {
                            successNext();
                        } else {failMsg(doing)}
                    } else {errorMsg1()}
                }, "json").fail(function () {errorMsg2()});
            });
        }

        // 随访数据库 生长曲线 头围
        if ($(".pc-db-FDGCHC").length > 0) {
            // 头围 Fenton 曲线图
            let headCircumferenceChart, headCircumferenceFentonRealChartData = [],
                headCircumferenceWhoRealChartData = [],
                headCircumferenceFentonChartJson, headCircumferenceWhoChartJson;
            // 获取 Fenton曲线 头围 数据
            $.get("/perinatalPlatform/followDatabase/write/GC/BW/fentonData", function (back, status) {
                if (status === "success") {
                    if (back.code) {
                        const bwBlHcList = back.bwBlHcList;
                        // 遍历 头围
                        for (const i in bwBlHcList) {
                            const day = parseInt(bwBlHcList[i].day),
                                headCircumference = parseFloat(bwBlHcList[i].headCircumference),
                                beforeHospitalDay = (childHospitalizationDateStamp - birthdayStamp) / 86400000,
                                cgAllDay = gestationalAgeWeek * 7 + gestationalAgeDay + beforeHospitalDay + day,
                                cgaWeek = Math.floor(cgAllDay / 7);
                            if (cgAllDay % 7 === 0) {
                                headCircumferenceFentonRealChartData[cgaWeek - 23] = headCircumference;
                            }
                        }
                        const headCircumferenceChartElem = $("#PC-chart-HC");
                        let headCircumferenceOption = JSON.parse(JSON.stringify(options));
                        // 头围 Fenton曲线
                        headCircumferenceOption.plugins.title.text = "cm";
                        headCircumferenceOption.scales.x.title.text = "周";
                        headCircumferenceOption.scales.y.title.text = "cm";
                        headCircumferenceFentonChartJson = JSON.parse(JSON.stringify(fentonChartJson));
                        headCircumferenceFentonChartJson.data.datasets[0].data = headCircumferenceFentonRealChartData;
                        headCircumferenceFentonChartJson.data.datasets[1].data = headCircumferenceFenton3ChartData;
                        headCircumferenceFentonChartJson.data.datasets[2].data = headCircumferenceFenton10ChartData;
                        headCircumferenceFentonChartJson.data.datasets[3].data = headCircumferenceFenton50ChartData;
                        headCircumferenceFentonChartJson.data.datasets[4].data = headCircumferenceFenton90ChartData;
                        headCircumferenceFentonChartJson.data.datasets[5].data = headCircumferenceFenton97ChartData;
                        headCircumferenceFentonChartJson.options = headCircumferenceOption;
                        headCircumferenceChart = new Chart($(headCircumferenceChartElem), headCircumferenceFentonChartJson);
                        // 计算 头围 增长速度
                        computeGainRate("headCircumference");

                        // 选择 Fenton 和 WHO
                        $(".pc-db-option>li").on("click", function () {
                            const value = $(this).attr("data-value");
                            if (value === "Fenton") {
                                // 头围 Fenton 曲线
                                headCircumferenceChart.destroy();
                                headCircumferenceOption.scales.x.title.text = "周";
                                headCircumferenceFentonChartJson = JSON.parse(JSON.stringify(fentonChartJson));
                                headCircumferenceFentonChartJson.data.datasets[0].data = headCircumferenceFentonRealChartData;
                                headCircumferenceFentonChartJson.data.datasets[1].data = headCircumferenceFenton3ChartData;
                                headCircumferenceFentonChartJson.data.datasets[2].data = headCircumferenceFenton10ChartData;
                                headCircumferenceFentonChartJson.data.datasets[3].data = headCircumferenceFenton50ChartData;
                                headCircumferenceFentonChartJson.data.datasets[4].data = headCircumferenceFenton90ChartData;
                                headCircumferenceFentonChartJson.data.datasets[5].data = headCircumferenceFenton97ChartData;
                                headCircumferenceFentonChartJson.options = headCircumferenceOption;
                                headCircumferenceChart = new Chart($(headCircumferenceChartElem), headCircumferenceFentonChartJson);
                            } else if (value === "WHO") {
                                // 头围 WHO 曲线
                                headCircumferenceChart.destroy();
                                headCircumferenceOption.scales.x.title.text = "月";
                                headCircumferenceWhoChartJson = JSON.parse(JSON.stringify(whoChartJson));
                                headCircumferenceWhoChartJson.data.datasets[0].data = headCircumferenceWhoRealChartData;
                                headCircumferenceWhoChartJson.data.datasets[1].data = headCircumferenceWho3ChartData;
                                headCircumferenceWhoChartJson.data.datasets[2].data = headCircumferenceWho10ChartData;
                                headCircumferenceWhoChartJson.data.datasets[3].data = headCircumferenceWho25ChartData;
                                headCircumferenceWhoChartJson.data.datasets[4].data = headCircumferenceWho50ChartData;
                                headCircumferenceWhoChartJson.data.datasets[5].data = headCircumferenceWho75ChartData;
                                headCircumferenceWhoChartJson.data.datasets[6].data = headCircumferenceWho90ChartData;
                                headCircumferenceWhoChartJson.data.datasets[7].data = headCircumferenceWho97ChartData;
                                headCircumferenceWhoChartJson.options = headCircumferenceOption;
                                headCircumferenceChart = new Chart($(headCircumferenceChartElem), headCircumferenceWhoChartJson);
                                drawChart(cga40WeekYear, cga40WeekMonth, headCircumferenceFentonRealChartData, headCircumferenceWhoRealChartData, headCircumferenceFentonChartJson, headCircumferenceWhoChartJson, headCircumferenceChart);
                            }
                        });
                    }
                }
            }, "json");

            let hcIndex = 0;
            // 初始化 头围检查
            const hcIndexInput = $(".pc-db-FDGCHC .pc-db-table>tbody").attr("data-num");
            if (notNullTool(hcIndexInput)) {
                hcIndex = parseInt(hcIndexInput);
                // 为 日期 选择 初始化
                for (let i = 1; i <= hcIndex; i++) {
                    const thisHcIndex = i;
                    // 计算 矫正年龄
                    computeCa(birthdayStamp, gestationalAgeWeek, gestationalAgeDay, cga40WeekDateStamp, thisHcIndex, $("#PC-db-HCCD" + thisHcIndex).val());
                    laydate.render({
                        elem: "#PC-db-HCCD" + thisHcIndex,
                        type: "date",
                        format: "yyyy-MM-dd",
                        min: cga40WeekDateStamp,
                        max: 0,
                        done: function (value) {
                            if (value !== "") {
                                // 计算 矫正年龄
                                computeCa(birthdayStamp, gestationalAgeWeek, gestationalAgeDay, cga40WeekDateStamp, thisHcIndex, value);
                                // 计算 头围 增长速度
                                computeGainRate("headCircumference");
                                // 画图
                                drawChart(cga40WeekYear, cga40WeekMonth, headCircumferenceFentonRealChartData, headCircumferenceWhoRealChartData, headCircumferenceFentonChartJson, headCircumferenceWhoChartJson, headCircumferenceChart);
                            }
                        }
                    });
                    $("#PC-db-HC" + thisHcIndex).on("focusout", function () {
                        // 计算 头围 增长速度
                        computeGainRate("headCircumference");
                        // 画图
                        drawChart(cga40WeekYear, cga40WeekMonth, headCircumferenceFentonRealChartData, headCircumferenceWhoRealChartData, headCircumferenceFentonChartJson, headCircumferenceWhoChartJson, headCircumferenceChart);
                    });
                    // 删除 头围检查 行
                    $("#PC-db-hcDelete" + thisHcIndex).on("click", function () {
                        const that = this;
                        layer.msg("确定要 <span class='pc-db-status-color-no'>删除</span> 此条头围检查信息吗?", {
                            icon: 7,
                            time: 0,
                            anim: 6,
                            btn: ["确定", "取消"],
                            resize: false,
                            shade: 0.8,
                            yes: function (index) {
                                $(that).parents("tr").remove();
                                // 计算 头围检查 次数
                                const hcTimes = $(".pc-db-FDGCHC .pc-db-table>tbody>tr").length - 1;
                                $("#PC-db-HCCN").val(hcTimes);
                                layer.close(index);
                            }
                        });
                    });
                }
            }
            // 增加 头围检查
            $("#PC-db-addHC").on("click", function () {
                const that = this;
                hcIndex++;
                sequentialExecution(function () {
                    $(that).parents("tr").before(
                        "<tr>" +
                        "   <td>" +
                        "       <input id='PC-db-HCCD" + hcIndex + "' type='text' name='headCircumferenceCheckDate" + hcIndex + "' lay-verify='required' placeholder='请选择检查时间' lay-reqText='请选择检查时间！' readonly>" +
                        "   </td>" +
                        "   <td>" +
                        "       <input id='PC-db-CA" + hcIndex + "' type='text' readonly>" +
                        "       <input id='PC-db-CGAW" + hcIndex + "' type='hidden' name='cgaWeek" + hcIndex + "'>" +
                        "       <input id='PC-db-CGAD" + hcIndex + "' type='hidden' name='cgaDay" + hcIndex + "'>" +
                        "       <input id='PC-db-CAM" + hcIndex + "' type='hidden' name='correctedAgeMonth" + hcIndex + "'>" +
                        "       <input id='PC-db-CAD" + hcIndex + "' type='hidden' name='correctedAgeDay" + hcIndex + "'>" +
                        "   </td>" +
                        "   <td>" +
                        "       <input id='PC-db-HC" + hcIndex + "' type='number' name='headCircumference" + hcIndex + "' lay-verify='required' placeholder='请填写头围' lay-reqText='请填写头围！'>" +
                        "   </td>" +
                        "   <td>" +
                        "       <button id='PC-db-hcDelete" + hcIndex + "' class='pc-btn pc-btn-danger'><i class='iconfont icon-delete'></i></button>" +
                        "   </td>" +
                        "</tr>");
                }, function () {
                    const thisHcIndex = hcIndex;
                    laydate.render({
                        elem: "#PC-db-HCCD" + thisHcIndex,
                        min: cga40WeekDateStamp,
                        type: "date",
                        format: "yyyy-MM-dd",
                        max: 0,
                        done: function (value) {
                            if (value !== "") {
                                // 计算 矫正年龄
                                computeCa(birthdayStamp, gestationalAgeWeek, gestationalAgeDay, cga40WeekDateStamp, thisHcIndex, value);
                                // 计算 头围 增长速度
                                computeGainRate("headCircumference");
                                // 画图
                                drawChart(cga40WeekYear, cga40WeekMonth, headCircumferenceFentonRealChartData, headCircumferenceWhoRealChartData, headCircumferenceFentonChartJson, headCircumferenceWhoChartJson, headCircumferenceChart);
                            }
                        }
                    });
                    $("#PC-db-HC" + thisHcIndex).on("focusout", function () {
                        // 计算 头围 增长速度
                        computeGainRate("headCircumference");
                        // 画图
                        drawChart(cga40WeekYear, cga40WeekMonth, headCircumferenceFentonRealChartData, headCircumferenceWhoRealChartData, headCircumferenceFentonChartJson, headCircumferenceWhoChartJson, headCircumferenceChart);
                    });
                    // 计算 头围检查 次数
                    const hcTimes = $(".pc-db-FDGCHC .pc-db-table>tbody>tr").length - 1;
                    $("#PC-db-HCCN").val(hcTimes);
                    // 删除 头围检查 行
                    $("#PC-db-hcDelete" + thisHcIndex).on("click", function () {
                        const that = this;
                        layer.msg("确定要 <span class='pc-db-status-color-no'>删除</span> 此条头围检查信息吗?", {
                            icon: 7,
                            time: 0,
                            anim: 6,
                            btn: ["确定", "取消"],
                            resize: false,
                            shade: 0.8,
                            yes: function (index) {
                                $(that).parents("tr").remove();
                                // 计算 头围检查 次数
                                const hcTimes = $(".pc-db-FDGCHC .pc-db-table>tbody>tr").length - 1;
                                $("#PC-db-HCCN").val(hcTimes);
                                layer.close(index);
                            }
                        });
                    });
                });
            });

            // 随访数据库 生长曲线 头围 添加/编辑 信息 提交
            form.on("submit(GCHC)", function (data) {
                const doing = "保存信息";
                loading(doing);
                let field = data.field, hcArray = [];
                for (let i = 1; i <= hcIndex; i++) {
                    if (notNullTool(field["headCircumferenceCheckDate" + i])) {
                        hcArray.push({
                            headCircumferenceCheckDate: field["headCircumferenceCheckDate" + i],
                            cgaWeek: field["cgaWeek" + i],
                            cgaDay: field["cgaDay" + i],
                            correctedAgeMonth: field["correctedAgeMonth" + i],
                            correctedAgeDay: field["correctedAgeDay" + i],
                            headCircumference: field["headCircumference" + i]
                        });
                        delete field["cgaWeek" + i];
                        delete field["cgaDay" + i];
                        delete field["correctedAgeMonth" + i];
                        delete field["correctedAgeWeek" + i];
                        delete field["correctedAgeDay" + i];
                        delete field["headCircumference" + i];
                    }
                }
                field.hcArray = JSON.stringify(hcArray);
                if (!notNullTool(field.headCircumferenceGainRate)) {
                    delete field.headCircumferenceGainRate;
                }
                $.post("/perinatalPlatform/followDatabase/write/GC/HC/post", field, function (back, status) {
                    if (status === "success") {
                        if (back.code) {
                            successNext();
                        } else {failMsg(doing)}
                    } else {errorMsg1()}
                }, "json").fail(function () {errorMsg2()});
            });
        }

        // 随访数据库 生长曲线 喂养
        if ($(".pc-db-FDGCFD").length > 0) {
            let frIndex = 0;
            // 初始化 喂养记录
            const frIndexInput = $(".pc-db-FDGCFD .pc-db-table>tbody").attr("data-num");
            if (notNullTool(frIndexInput)) {
                frIndex = parseInt(frIndexInput);
                // 为 日期 选择 初始化
                for (let i = 1; i <= frIndex; i++) {
                    const thisFrIndex = i;
                    // 计算 矫正年龄
                    computeCa(birthdayStamp, gestationalAgeWeek, gestationalAgeDay, cga40WeekDateStamp, thisFrIndex, $("#PC-db-FRD" + thisFrIndex).val());
                    laydate.render({
                        elem: "#PC-db-FRD" + thisFrIndex,
                        type: "date",
                        format: "yyyy-MM-dd",
                        min: cga40WeekDateStamp,
                        max: 0,
                        done: function (value) {
                            if (value !== "") {
                                // 计算 矫正年龄
                                computeCa(birthdayStamp, gestationalAgeWeek, gestationalAgeDay, cga40WeekDateStamp, thisFrIndex, value);
                            }
                        }
                    });
                    // 计算 热卡
                    computeCalories(form, thisFrIndex);
                    // 删除 喂养记录 行
                    $("#PC-db-frDelete" + thisFrIndex).on("click", function () {
                        const that = this;
                        layer.msg("确定要 <span class='pc-db-status-color-no'>删除</span> 此条喂养记录信息吗?", {
                            icon: 7,
                            time: 0,
                            anim: 6,
                            btn: ["确定", "取消"],
                            resize: false,
                            shade: 0.8,
                            yes: function (index) {
                                $(that).parents("tr").remove();
                                // 计算 喂养记录 次数
                                const frTimes = $(".pc-db-FDGCFD .pc-db-table>tbody>tr").length - 1;
                                $("#PC-db-FRN").val(frTimes);
                                layer.close(index);
                            }
                        });
                    });
                }
            }
            // 增加 喂养记录
            $("#PC-db-addFR").on("click", function () {
                const that = this;
                frIndex++;
                sequentialExecution(function () {
                    $(that).parents("tr").before(
                        "<tr>" +
                        "   <td>" +
                        "       <input id='PC-db-FRD" + frIndex + "' type='text' name='feedingRecordDate" + frIndex + "' lay-verify='required' placeholder='请选择记录日期' lay-reqText='请选择记录日期！' readonly>" +
                        "   </td>" +
                        "   <td>" +
                        "       <input id='PC-db-CA" + frIndex + "' type='text' readonly>" +
                        "       <input id='PC-db-CGAW" + frIndex + "' type='hidden' name='cgaWeek" + frIndex + "'>" +
                        "       <input id='PC-db-CGAD" + frIndex + "' type='hidden' name='cgaDay" + frIndex + "'>" +
                        "       <input id='PC-db-CAM" + frIndex + "' type='hidden' name='correctedAgeMonth" + frIndex + "'>" +
                        "       <input id='PC-db-CAD" + frIndex + "' type='hidden' name='correctedAgeDay" + frIndex + "'>" +
                        "   </td>" +
                        "   <td>" +
                        "       <select name='feedingSituation" + frIndex + "' lay-reqText='请选择喂养情况！' lay-verify='required'>" +
                        "           <option value=''>请选择喂养情况</option>" +
                        "           <option value='母乳'>母乳</option>" +
                        "           <option value='混合'>混合</option>" +
                        "           <option value='配方'>配方</option>" +
                        "       </select>" +
                        "   </td>" +
                        "   <td>" +
                        "       <select name='feedingMethod" + frIndex + "' lay-reqText='请选择喂养方式！' lay-verify='required'>" +
                        "           <option value=''>请选择喂养方式</option>" +
                        "           <option value='亲喂'>亲喂</option>" +
                        "           <option value='奶瓶喂养'>奶瓶喂养</option>" +
                        "       </select>" +
                        "   </td>" +
                        "   <td>" +
                        "       <select name='breastfeedingSituation" + frIndex + "' lay-reqText='请选择喂奶情况！' lay-verify='required'>" +
                        "           <option value=''>请选择喂奶情况</option>" +
                        "           <option value='无'>无</option>" +
                        "           <option value='吐奶'>吐奶</option>" +
                        "           <option value='呛奶'>呛奶</option>" +
                        "       </select>" +
                        "   </td>" +
                        "   <td>" +
                        "       <input type='number' name='stoolSituation" + frIndex + "' placeholder='请填写大便情况' lay-reqText='请填写大便情况！' lay-verify='required'>" +
                        "   </td>" +
                        "   <td>" +
                        "       <input type='number' name='urineSituation" + frIndex + "' placeholder='请填写小便情况' lay-reqText='请填写小便情况！' lay-verify='required'>" +
                        "   </td>" +
                        "   <td>" +
                        "       <input id='PC-db-BM" + frIndex + "' type='number' name='breastMilk" + frIndex + "' placeholder='请填写母乳量' lay-reqText='请填写母乳量！' lay-verify='required'>" +
                        "   </td>" +
                        "   <td>" +
                        "       <select name='breastMilkFortifier" + frIndex + "' lay-filter='BMF" + frIndex + "' lay-reqText='请选择母乳强化剂！' lay-verify='required'>" +
                        "           <option value=''>请选择母乳强化剂</option>" +
                        "           <option value='无'>无</option>" +
                        "           <option value='半量强化'>半量强化</option>" +
                        "           <option value='全量强化'>全量强化</option>" +
                        "       </select>" +
                        "   </td>" +
                        "   <td>" +
                        "       <input id='PC-db-PFM" + frIndex + "' type='number' name='prematureInfantFormulaMilk" + frIndex + "' placeholder='请填写早产儿配方奶量'>" +
                        "   </td>" +
                        "   <td>" +
                        "       <input id='PC-db-TFM" + frIndex + "' type='number' name='termInfantFormulaMilk" + frIndex + "' placeholder='请填写足月儿配方奶量'>" +
                        "   </td>" +
                        "   <td>" +
                        "       <input id='PC-db-AM" + frIndex + "' type='number' name='aminoAcidMilk" + frIndex + "' placeholder='请填写氨基酸奶量'>" +
                        "   </td>" +
                        "   <td>" +
                        "       <input id='PC-db-HPM" + frIndex + "' type='number' name='hydrolyzedProteinMilk" + frIndex + "' placeholder='请填写水解蛋白奶量'>" +
                        "   </td>" +
                        "   <td>" +
                        "       <input id='PC-db-calories" + frIndex + "' type='number' name='calories" + frIndex + "' readonly>" +
                        "   </td>" +
                        "   <td>" +
                        "       <button id='PC-db-frDelete" + frIndex + "' class='pc-btn pc-btn-danger'><i class='iconfont icon-delete'></i></button>" +
                        "   </td>" +
                        "</tr>");
                }, function () {
                    form.render("select");
                }, function () {
                    const thisFrIndex = frIndex;
                    laydate.render({
                        elem: "#PC-db-FRD" + thisFrIndex,
                        type: "date",
                        format: "yyyy-MM-dd",
                        min: cga40WeekDateStamp,
                        max: 0,
                        done: function (value) {
                            if (value !== "") {
                                // 计算 矫正年龄
                                computeCa(birthdayStamp, gestationalAgeWeek, gestationalAgeDay, cga40WeekDateStamp, thisFrIndex, value);
                            }
                        }
                    });
                    // 计算 热卡
                    computeCalories(form, thisFrIndex);
                    // 计算 喂养记录 次数
                    const frTimes = $(".pc-db-FDGCFD .pc-db-table>tbody>tr").length - 1;
                    $("#PC-db-FRN").val(frTimes);
                    // 删除 喂养记录 行
                    $("#PC-db-frDelete" + thisFrIndex).on("click", function () {
                        const that = this;
                        layer.msg("确定要 <span class='pc-db-status-color-no'>删除</span> 此条喂养记录信息吗?", {
                            icon: 7,
                            time: 0,
                            anim: 6,
                            btn: ["确定", "取消"],
                            resize: false,
                            shade: 0.8,
                            yes: function (index) {
                                $(that).parents("tr").remove();
                                // 计算 喂养记录 次数
                                const frTimes = $(".pc-db-FDGCFD .pc-db-table>tbody>tr").length - 1;
                                $("#PC-db-FRN").val(frTimes);
                                layer.close(index);
                            }
                        });
                    });
                });
            });

            // 随访数据库 生长曲线 喂养 添加/编辑 信息 提交
            form.on("submit(GCFD)", function (data) {
                const doing = "保存信息";
                loading(doing);
                let field = data.field, frArray = [];
                for (let i = 1; i <= frIndex; i++) {
                    if (notNullTool(field["feedingRecordDate" + i])) {
                        frArray.push({
                            feedingRecordDate: field["feedingRecordDate" + i],
                            cgaWeek: field["cgaWeek" + i],
                            cgaDay: field["cgaDay" + i],
                            correctedAgeMonth: field["correctedAgeMonth" + i],
                            correctedAgeDay: field["correctedAgeDay" + i],
                            feedingSituation: field["feedingSituation" + i],
                            feedingMethod: field["feedingMethod" + i],
                            breastfeedingSituation: field["breastfeedingSituation" + i],
                            stoolSituation: field["stoolSituation" + i],
                            urineSituation: field["urineSituation" + i],
                            breastMilk: field["breastMilk" + i],
                            breastMilkFortifier: field["breastMilkFortifier" + i],
                            prematureInfantFormulaMilk: field["prematureInfantFormulaMilk" + i],
                            termInfantFormulaMilk: field["termInfantFormulaMilk" + i],
                            aminoAcidMilk: field["aminoAcidMilk" + i],
                            hydrolyzedProteinMilk: field["hydrolyzedProteinMilk" + i],
                            calories: field["calories" + i]
                        });
                        delete field["feedingRecordDate" + i];
                        delete field["cgaWeek" + i];
                        delete field["cgaDay" + i];
                        delete field["correctedAgeMonth" + i];
                        delete field["correctedAgeDay" + i];
                        delete field["feedingSituation" + i];
                        delete field["feedingMethod" + i];
                        delete field["breastfeedingSituation" + i];
                        delete field["stoolSituation" + i];
                        delete field["urineSituation" + i];
                        delete field["breastMilkAmount" + i];
                        delete field["breastMilkFortifier" + i];
                        delete field["prematureInfantFormulaMilk" + i];
                        delete field["termInfantFormulaMilk" + i];
                        delete field["aminoAcidMilk" + i];
                        delete field["hydrolyzedProteinMilk" + i];
                        delete field["calories" + i];
                    }
                }
                field.frArray = JSON.stringify(frArray);
                $.post("/perinatalPlatform/followDatabase/write/GC/FD/post", field, function (back, status) {
                    if (status === "success") {
                        if (back.code) {
                            successNext();
                        } else {failMsg(doing)}
                    } else {errorMsg1()}
                }, "json").fail(function () {errorMsg2()});
            });
        }

        // 随访数据库 生长曲线 生长评估
        if ($(".pc-db-FDGCGA").length > 0) {
            $(".pc-db-FDGCGA .pc-db-option>li").off("click");
        }
        // 0-12月
        if ($(".pc-db-FDGCGA1").length > 0) {
            // 纠正胎龄 40周 计算
            const gestationalAgeDays = gestationalAgeWeek * 7 + gestationalAgeDay,
                cga40wDayAge = 40 * 7 - gestationalAgeDays,
                cga40wDateStamp = birthdayStamp + cga40wDayAge * 86400000,
                cga40wActualAgeMonth = Math.floor((cga40wDateStamp - birthdayStamp) / 86400000 / 30),
                cga40wActualAgeDay = ((cga40wDateStamp - birthdayStamp) / 86400000) % 30;
            $("input[name='ca40wDate']").val(dateFormatDay(cga40wDateStamp));
            $("input[name='ca40wActualAgeMonth']").val(cga40wActualAgeMonth);
            $("input[name='ca40wActualAgeDay']").val(cga40wActualAgeDay);
            $("#PC-db-CA40WAA").val(cga40wActualAgeMonth + "月 " + cga40wActualAgeDay + "天");

            // 矫正年龄 1-12月 计算
            let caDateStamp = [];
            for (let i = 1; i <= 12; i++) {
                const caDayAge = 40 * 7 + i * 30 - gestationalAgeDays;
                caDateStamp[i - 1] = birthdayStamp + caDayAge * 86400000;
                const actualAgeMonth = Math.floor((caDateStamp[i - 1] - birthdayStamp) / 86400000 / 30),
                    actualAgeDay = ((caDateStamp[i - 1] - birthdayStamp) / 86400000) % 30;
                $("input[name='ca" + i + "mDate']").val(dateFormatDay(caDateStamp[i - 1]));
                $("input[name='ca" + i + "mActualAgeMonth']").val(actualAgeMonth);
                $("input[name='ca" + i + "mActualAgeDay']").val(actualAgeDay);
                $("#PC-db-CA" + i + "MAA").val(actualAgeMonth + "月 " + actualAgeDay + "天");
            }
            let weightZScoreMid, weightZScoreSd3Neg, weightZScoreSd2Neg, weightZScoreSd1Neg, weightZScoreSd0,
                weightZScoreSd1, weightZScoreSd2, weightZScoreSd3,
                lengthZScoreMid, lengthZScoreSd, headCircumferenceZScoreMid, headCircumferenceZScoreSd;
            // Z评分 数据
            if (gender === "男") {
                // 体重 Z评分 数据
                weightZScoreMid = [3.3464, 4.4709, 5.5675, 6.3762, 7.0023, 7.5105, 7.934, 8.297, 8.6151, 8.9014, 9.1649, 9.4122, 9.6479];
                weightZScoreSd3Neg = [2.1, 2.9, 3.8, 4.4, 4.9, 5.3, 5.7, 5.9, 6.2, 6.4, 6.6, 6.8, 6.9];
                weightZScoreSd2Neg = [2.5, 3.4, 4.3, 5, 5.6, 6, 6.4, 6.7, 6.9, 7.1, 7.4, 7.6, 7.7];
                weightZScoreSd1Neg = [2.9, 3.9, 4.9, 5.7, 6.2, 6.7, 7.1, 7.4, 7.7, 8, 8.2, 8.4, 8.6];
                weightZScoreSd0 = [3.3, 4.5, 5.6, 6.4, 7, 7.5, 7.9, 8.3, 8.6, 8.9, 9.2, 9.4, 9.6];
                weightZScoreSd1 = [3.9, 5.1, 6.3, 7.2, 7.8, 8.4, 8.8, 9.2, 9.6, 9.9, 10.2, 10.5, 10.8];
                weightZScoreSd2 = [4.4, 5.8, 7.1, 8, 8.7, 9.3, 9.8, 10.3, 10.7, 11, 11.4, 11.7, 12];
                weightZScoreSd3 = [5, 6.6, 8, 9, 9.7, 10.4, 10.9, 11.4, 11.9, 12.3, 12.7, 13, 13.3];
                // 身长 Z评分 数据
                lengthZScoreMid = [49.8842, 54.7244, 58.4249, 61.4292, 63.886, 65.9026, 67.6236, 69.1645, 70.5994, 71.9687, 73.2812, 74.5388, 75.7488];
                lengthZScoreSd = [1.8931, 1.9465, 2.0005, 2.0444, 2.0808, 2.1115, 2.1403, 2.1711, 2.2055, 2.2433, 2.2849, 2.3293, 2.3762];
                // 头围 Z评分 数据
                headCircumferenceZScoreMid = [34.4618, 37.2759, 39.1285, 40.5135, 41.6317, 42.5576, 43.3306, 43.9803, 44.53, 44.9998, 45.4051, 45.7573, 46.0661];
                headCircumferenceZScoreSd = [1.2703, 1.1679, 1.1727, 1.1822, 1.194, 1.2074, 1.2206, 1.2332, 1.2451, 1.2564, 1.2668, 1.2762, 1.2848];
            } else if (gender === "女") {
                // 体重 Z评分 数据
                weightZScoreMid = [3.2322, 4.1873, 5.1282, 5.8458, 6.4237, 6.8985, 7.297, 7.6422, 7.9487, 8.2254, 8.48, 8.7192, 8.9481];
                weightZScoreSd3Neg = [2, 2.7, 3.4, 4, 4.4, 4.8, 5.1, 5.3, 5.6, 5.8, 5.9, 6.1, 6.3];
                weightZScoreSd2Neg = [2.4, 3.2, 3.9, 4.5, 5, 5.4, 5.7, 6, 6.3, 6.5, 6.7, 6.9, 7];
                weightZScoreSd1Neg = [2.8, 3.6, 4.5, 5.2, 5.7, 6.1, 6.5, 6.8, 7, 7.3, 7.5, 7.7, 7.9];
                weightZScoreSd0 = [3.2, 4.2, 5.1, 5.8, 6.4, 6.9, 7.3, 7.6, 7.9, 8.2, 8.5, 8.7, 8.9];
                weightZScoreSd1 = [3.7, 4.8, 5.8, 6.6, 7.3, 7.8, 8.2, 8.6, 9, 9.3, 9.6, 9.9, 10.1];
                weightZScoreSd2 = [4.2, 5.5, 6.6, 7.5, 8.2, 8.8, 9.3, 9.8, 10.2, 10.5, 10.9, 11.2, 11.5];
                weightZScoreSd3 = [4.8, 6.2, 7.5, 8.5, 9.3, 10, 10.6, 11.1, 11.6, 12, 12.4, 12.8, 13.1];
                // 身长 Z评分 数据
                lengthZScoreMid = [49.1477, 53.6872, 57.0673, 59.8029, 62.0899, 64.0301, 65.7311, 67.2873, 68.7498, 70.1435, 71.4818, 72.771, 74.015];
                lengthZScoreSd = [1.8627, 1.9542, 2.0362, 2.1051, 2.1645, 2.2174, 2.2664, 2.3154, 2.365, 2.4157, 2.4676, 2.5208, 2.575];
                // 头围 Z评分 数据
                headCircumferenceZScoreMid = [33.8787, 36.5463, 38.2521, 39.5328, 40.5817, 41.459, 42.1995, 42.829, 43.3671, 43.83, 44.2319, 44.5844, 44.8965];
                headCircumferenceZScoreSd = [1.1844, 1.1731, 1.2118, 1.2413, 1.2657, 1.2861, 1.3027, 1.317, 1.3283, 1.3381, 1.3464, 1.3531, 1.359];
            }
            // 获取 体重 数据
            $.get("/perinatalPlatform/followDatabase/write/GC/GA/getBodyWeight", function (back, status) {
                if (status === "success") {
                    if (back.code) {
                        const bodyWeightList = back.bodyWeightList,
                            cga40wDate = dateFormatDay(cga40wDateStamp);
                        // 纠正胎龄40周 体重 计算
                        for (let i = 0; i < bodyWeightList.length; i++) {
                            const bodyWeightMsg = bodyWeightList[i],
                                weightCheckDateStamp = bodyWeightMsg.weightCheckDate,
                                weightCheckDate = dateFormatDay(weightCheckDateStamp);
                            if (cga40wDate === weightCheckDate) {
                                const bodyWeight = parseFloat(bodyWeightMsg.bodyWeight);
                                $("input[name='ca40wBodyWeight']").val(bodyWeight);
                                // 体重百分位 计算
                                let ca40wBodyWeightPercentile;
                                if (bodyWeight < weightWho3ChartData[0]) {
                                    ca40wBodyWeightPercentile = (3 - (weightWho3ChartData[0] - bodyWeight) / ((weightWho97ChartData[0] - weightWho3ChartData[0]) / 94)).toFixed(1);
                                } else if (bodyWeight >= weightWho3ChartData[0] && bodyWeight <= weightWho10ChartData[0]) {
                                    ca40wBodyWeightPercentile = (3 + (bodyWeight - weightWho3ChartData[0]) / ((weightWho10ChartData[0] - weightWho3ChartData[0]) / 7)).toFixed(1);
                                } else if (bodyWeight >= weightWho10ChartData[0] && bodyWeight <= weightWho25ChartData[0]) {
                                    ca40wBodyWeightPercentile = (10 + (bodyWeight - weightWho10ChartData[0]) / ((weightWho25ChartData[0] - weightWho10ChartData[0]) / 15)).toFixed(1);
                                } else if (bodyWeight >= weightWho25ChartData[0] && bodyWeight <= weightWho50ChartData[0]) {
                                    ca40wBodyWeightPercentile = (25 + (bodyWeight - weightWho25ChartData[0]) / ((weightWho50ChartData[0] - weightWho25ChartData[0]) / 25)).toFixed(1);
                                } else if (bodyWeight >= weightWho50ChartData[0] && bodyWeight <= weightWho75ChartData[0]) {
                                    ca40wBodyWeightPercentile = (50 + (bodyWeight - weightWho50ChartData[0]) / ((weightWho75ChartData[0] - weightWho50ChartData[0]) / 25)).toFixed(1);
                                } else if (bodyWeight >= weightWho75ChartData[0] && bodyWeight <= weightWho90ChartData[0]) {
                                    ca40wBodyWeightPercentile = (75 + (bodyWeight - weightWho90ChartData[0]) / ((weightWho90ChartData[0] - weightWho75ChartData[0]) / 15)).toFixed(1);
                                } else if (bodyWeight >= weightWho90ChartData[0] && bodyWeight <= weightWho97ChartData[0]) {
                                    ca40wBodyWeightPercentile = (90 + (bodyWeight - weightWho97ChartData[0]) / ((weightWho97ChartData[0] - weightWho90ChartData[0]) / 7)).toFixed(1);
                                } else {
                                    ca40wBodyWeightPercentile = (97 + (bodyWeight - weightWho97ChartData[0]) / ((weightWho97ChartData[0] - weightWho3ChartData[0]) / 94)).toFixed(1);
                                }
                                $("input[name='ca40wBodyWeightPercentile']").val(ca40wBodyWeightPercentile);
                                // 体重Z评分 计算
                                let ca40wBodyWeightZSd;
                                if (bodyWeight < weightZScoreSd3Neg[0]) {
                                    ca40wBodyWeightZSd = 3 + (weightZScoreSd3Neg[0] - bodyWeight) / ((weightZScoreSd0[0] - weightZScoreSd3Neg[0]) / 3);
                                } else if (bodyWeight >= weightZScoreSd3Neg[0] && bodyWeight <= weightZScoreSd2Neg[0]) {
                                    ca40wBodyWeightZSd = 2 + (weightZScoreSd2Neg[0] - bodyWeight) / (weightZScoreSd2Neg[0] - weightZScoreSd3Neg[0]);
                                } else if (bodyWeight >= weightZScoreSd2Neg[0] && bodyWeight <= weightZScoreSd1Neg[0]) {
                                    ca40wBodyWeightZSd = 1 + (weightZScoreSd1Neg[0] - bodyWeight) / (weightZScoreSd1Neg[0] - weightZScoreSd2Neg[0]);
                                } else if (bodyWeight >= weightZScoreSd1Neg[0] && bodyWeight <= weightZScoreSd0[0]) {
                                    ca40wBodyWeightZSd = (weightZScoreSd0[0] - bodyWeight) / (weightZScoreSd0[0] - weightZScoreSd1Neg[0]);
                                } else if (bodyWeight >= weightZScoreSd0[0] && bodyWeight <= weightZScoreSd1[0]) {
                                    ca40wBodyWeightZSd = (bodyWeight - weightZScoreSd0[0]) / (weightZScoreSd1[0] - weightZScoreSd0[0]);
                                } else if (bodyWeight >= weightZScoreSd1[0] && bodyWeight <= weightZScoreSd2[0]) {
                                    ca40wBodyWeightZSd = 1 + (bodyWeight - weightZScoreSd1[0]) / (weightZScoreSd2[0] - weightZScoreSd1[0]);
                                } else if (bodyWeight >= weightZScoreSd2[0] && bodyWeight <= weightZScoreSd3[0]) {
                                    ca40wBodyWeightZSd = 2 + (bodyWeight - weightZScoreSd2[0]) / (weightZScoreSd3[0] - weightZScoreSd2[0]);
                                } else {
                                    ca40wBodyWeightZSd = 3 + (bodyWeight - weightZScoreSd3Neg[0]) / ((weightZScoreSd3[0] - weightZScoreSd0[0]) / 3);
                                }
                                if (ca40wBodyWeightZSd === 0) {
                                    $("input[name='ca40wBodyWeightZScore']").val(0);
                                } else {
                                    $("input[name='ca40wBodyWeightZScore']").val(((bodyWeight - weightZScoreMid[0]) / ca40wBodyWeightZSd).toFixed(2));
                                }
                                break;
                            }
                        }
                        // 矫正年龄 1-12月 体重 计算
                        for (let i = 1; i <= 12; i++) {
                            const caThisDateStamp = caDateStamp[i - 1],
                                caThisDate = dateFormatDay(caThisDateStamp);
                            for (let j = 0; i < bodyWeightList.length; j++) {
                                const bodyWeightMsg = bodyWeightList[j],
                                    weightCheckDateStamp = bodyWeightMsg.weightCheckDate,
                                    weightCheckDate = dateFormatDay(weightCheckDateStamp);
                                if (caThisDate === weightCheckDate) {
                                    const bodyWeight = parseFloat(bodyWeightMsg.bodyWeight);
                                    $("input[name='ca" + i + "mBodyWeight']").val(bodyWeight);
                                    // 体重百分位 计算
                                    let caBodyWeightPercentile;
                                    if (bodyWeight < weightWho3ChartData[i]) {
                                        caBodyWeightPercentile = (3 - (weightWho3ChartData[i] - bodyWeight) / ((weightWho97ChartData[i] - weightWho3ChartData[i]) / 94)).toFixed(1);
                                    } else if (bodyWeight >= weightWho3ChartData[i] && bodyWeight <= weightWho10ChartData[i]) {
                                        caBodyWeightPercentile = (3 + (bodyWeight - weightWho3ChartData[i]) / ((weightWho10ChartData[i] - weightWho3ChartData[i]) / 7)).toFixed(1);
                                    } else if (bodyWeight >= weightWho10ChartData[i] && bodyWeight <= weightWho25ChartData[i]) {
                                        caBodyWeightPercentile = (10 + (bodyWeight - weightWho10ChartData[i]) / ((weightWho25ChartData[i] - weightWho10ChartData[i]) / 15)).toFixed(1);
                                    } else if (bodyWeight >= weightWho25ChartData[i] && bodyWeight <= weightWho50ChartData[i]) {
                                        caBodyWeightPercentile = (25 + (bodyWeight - weightWho25ChartData[i]) / ((weightWho50ChartData[i] - weightWho25ChartData[i]) / 25)).toFixed(1);
                                    } else if (bodyWeight >= weightWho50ChartData[i] && bodyWeight <= weightWho75ChartData[i]) {
                                        caBodyWeightPercentile = (50 + (bodyWeight - weightWho50ChartData[i]) / ((weightWho75ChartData[i] - weightWho50ChartData[i]) / 25)).toFixed(1);
                                    } else if (bodyWeight >= weightWho75ChartData[i] && bodyWeight <= weightWho90ChartData[i]) {
                                        caBodyWeightPercentile = (75 + (bodyWeight - weightWho90ChartData[i]) / ((weightWho90ChartData[i] - weightWho75ChartData[i]) / 15)).toFixed(1);
                                    } else if (bodyWeight >= weightWho90ChartData[i] && bodyWeight <= weightWho97ChartData[i]) {
                                        caBodyWeightPercentile = (90 + (bodyWeight - weightWho97ChartData[i]) / ((weightWho97ChartData[i] - weightWho90ChartData[i]) / 7)).toFixed(1);
                                    } else {
                                        caBodyWeightPercentile = (97 + (bodyWeight - weightWho97ChartData[i]) / ((weightWho97ChartData[i] - weightWho3ChartData[i]) / 94)).toFixed(1);
                                    }
                                    $("input[name='ca" + i + "mBodyWeightPercentile']").val(caBodyWeightPercentile);
                                    // 体重Z评分 计算
                                    let caBodyWeightZSd;
                                    if (bodyWeight < weightZScoreSd3Neg[i]) {
                                        caBodyWeightZSd = 3 + (weightZScoreSd3Neg[i] - bodyWeight) / ((weightZScoreSd0[i] - weightZScoreSd3Neg[i]) / 3);
                                    } else if (bodyWeight >= weightZScoreSd3Neg[i] && bodyWeight <= weightZScoreSd2Neg[i]) {
                                        caBodyWeightZSd = 2 + (weightZScoreSd2Neg[i] - bodyWeight) / (weightZScoreSd2Neg[i] - weightZScoreSd3Neg[i]);
                                    } else if (bodyWeight >= weightZScoreSd2Neg[i] && bodyWeight <= weightZScoreSd1Neg[i]) {
                                        caBodyWeightZSd = 1 + (weightZScoreSd1Neg[i] - bodyWeight) / (weightZScoreSd1Neg[i] - weightZScoreSd2Neg[i]);
                                    } else if (bodyWeight >= weightZScoreSd1Neg[i] && bodyWeight <= weightZScoreSd0[i]) {
                                        caBodyWeightZSd = (weightZScoreSd0[i] - bodyWeight) / (weightZScoreSd0[i] - weightZScoreSd1Neg[i]);
                                    } else if (bodyWeight >= weightZScoreSd0[i] && bodyWeight <= weightZScoreSd1[i]) {
                                        caBodyWeightZSd = (bodyWeight - weightZScoreSd0[i]) / (weightZScoreSd1[i] - weightZScoreSd0[i]);
                                    } else if (bodyWeight >= weightZScoreSd1[i] && bodyWeight <= weightZScoreSd2[i]) {
                                        caBodyWeightZSd = 1 + (bodyWeight - weightZScoreSd1[i]) / (weightZScoreSd2[i] - weightZScoreSd1[i]);
                                    } else if (bodyWeight >= weightZScoreSd2[i] && bodyWeight <= weightZScoreSd3[i]) {
                                        caBodyWeightZSd = 2 + (bodyWeight - weightZScoreSd2[i]) / (weightZScoreSd3[i] - weightZScoreSd2[i]);
                                    } else {
                                        caBodyWeightZSd = 3 + (bodyWeight - weightZScoreSd3Neg[i]) / ((weightZScoreSd3[i] - weightZScoreSd0[i]) / 3);
                                    }
                                    if (caBodyWeightZSd === 0) {
                                        $("input[name='ca" + i + "mBodyWeightZScore']").val(0);
                                    } else {
                                        $("input[name='ca" + i + "mBodyWeightZScore']").val(((bodyWeight - weightZScoreMid[i]) / caBodyWeightZSd).toFixed(2));
                                    }
                                    // 体重 增加速度
                                    if (notNullTool(bodyWeightList[j - 1])) {
                                        const lastBodyWeightMsg = bodyWeightList[j - 1],
                                            lastDateStamp = lastBodyWeightMsg.weightCheckDate,
                                            lastBodyWeight = lastBodyWeightMsg.bodyWeight,
                                            bodyWeightGainRate = (bodyWeight - lastBodyWeight) * 1000 / ((weightCheckDateStamp - lastDateStamp) / 604800000);
                                        $("input[name='ca" + i + "mBodyWeightGainRate']").val(bodyWeightGainRate.toFixed(0));
                                    }
                                    break;
                                }
                            }
                        }
                    }
                }
            }, "json");
            // 获取 身长 数据
            $.get("/perinatalPlatform/followDatabase/write/GC/GA/getBodyLength", function (back, status) {
                if (status === "success") {
                    if (back.code) {
                        const bodyLengthList = back.bodyLengthList,
                            cga40wDate = dateFormatDay(cga40wDateStamp);
                        // 纠正胎龄40周 身长 计算
                        for (let i = 0; i < bodyLengthList.length; i++) {
                            const bodyLengthMsg = bodyLengthList[i],
                                lengthCheckDateStamp = bodyLengthMsg.lengthCheckDate,
                                lengthCheckDate = dateFormatDay(lengthCheckDateStamp);
                            if (cga40wDate === lengthCheckDate) {
                                const bodyLength = parseFloat(bodyLengthMsg.bodyLength);
                                $("input[name='ca40wBodyLength']").val(bodyLength);
                                // 身长百分位 计算
                                let ca40wBodyLengthPercentile;
                                if (bodyLength < bodyLengthWho3ChartData[0]) {
                                    ca40wBodyLengthPercentile = (3 - (bodyLengthWho3ChartData[0] - bodyLength) / ((bodyLengthWho97ChartData[0] - bodyLengthWho3ChartData[0]) / 94)).toFixed(1);
                                } else if (bodyLength >= bodyLengthWho3ChartData[0] && bodyLength <= bodyLengthWho10ChartData[0]) {
                                    ca40wBodyLengthPercentile = (3 + (bodyLength - bodyLengthWho3ChartData[0]) / ((bodyLengthWho10ChartData[0] - bodyLengthWho3ChartData[0]) / 7)).toFixed(1);
                                } else if (bodyLength >= bodyLengthWho10ChartData[0] && bodyLength <= bodyLengthWho25ChartData[0]) {
                                    ca40wBodyLengthPercentile = (10 + (bodyLength - bodyLengthWho10ChartData[0]) / ((bodyLengthWho25ChartData[0] - bodyLengthWho10ChartData[0]) / 15)).toFixed(1);
                                } else if (bodyLength >= bodyLengthWho25ChartData[0] && bodyLength <= bodyLengthWho50ChartData[0]) {
                                    ca40wBodyLengthPercentile = (25 + (bodyLength - bodyLengthWho25ChartData[0]) / ((bodyLengthWho50ChartData[0] - bodyLengthWho25ChartData[0]) / 25)).toFixed(1);
                                } else if (bodyLength >= bodyLengthWho50ChartData[0] && bodyLength <= bodyLengthWho75ChartData[0]) {
                                    ca40wBodyLengthPercentile = (50 + (bodyLength - bodyLengthWho50ChartData[0]) / ((bodyLengthWho75ChartData[0] - bodyLengthWho50ChartData[0]) / 25)).toFixed(1);
                                } else if (bodyLength >= bodyLengthWho75ChartData[0] && bodyLength <= bodyLengthWho90ChartData[0]) {
                                    ca40wBodyLengthPercentile = (75 + (bodyLength - bodyLengthWho90ChartData[0]) / ((bodyLengthWho90ChartData[0] - bodyLengthWho75ChartData[0]) / 15)).toFixed(1);
                                } else if (bodyLength >= bodyLengthWho90ChartData[0] && bodyLength <= bodyLengthWho97ChartData[0]) {
                                    ca40wBodyLengthPercentile = (90 + (bodyLength - bodyLengthWho97ChartData[0]) / ((bodyLengthWho97ChartData[0] - bodyLengthWho90ChartData[0]) / 7)).toFixed(1);
                                } else {
                                    ca40wBodyLengthPercentile = (97 + (bodyLength - bodyLengthWho97ChartData[0]) / ((bodyLengthWho97ChartData[0] - bodyLengthWho3ChartData[0]) / 94)).toFixed(1);
                                }
                                $("input[name='ca40wBodyLengthPercentile']").val(ca40wBodyLengthPercentile);
                                // 身长Z评分 计算
                                $("input[name='ca40wBodyLengthZScore']").val(((bodyLength - lengthZScoreMid[0]) / lengthZScoreSd[0]).toFixed(2));
                                break;
                            }
                        }
                        // 矫正年龄 1-12月 身长 计算
                        for (let i = 1; i <= 12; i++) {
                            const caThisDateStamp = caDateStamp[i - 1],
                                caThisDate = dateFormatDay(caThisDateStamp);
                            for (let j = 0; i < bodyLengthList.length; j++) {
                                const bodyLengthMsg = bodyLengthList[j],
                                    lengthCheckDateStamp = bodyLengthMsg.lengthCheckDate,
                                    lengthCheckDate = dateFormatDay(lengthCheckDateStamp);
                                if (caThisDate === lengthCheckDate) {
                                    const bodyLength = parseFloat(bodyLengthMsg.bodyLength);
                                    $("input[name='ca" + i + "mBodyLength']").val(bodyLength);
                                    // 身长百分位 计算
                                    let caBodyLengthPercentile;
                                    if (bodyLength < bodyLengthWho3ChartData[i]) {
                                        caBodyLengthPercentile = (3 - (bodyLengthWho3ChartData[i] - bodyLength) / ((bodyLengthWho97ChartData[i] - bodyLengthWho3ChartData[i]) / 94)).toFixed(1);
                                    } else if (bodyLength >= bodyLengthWho3ChartData[i] && bodyLength <= bodyLengthWho10ChartData[i]) {
                                        caBodyLengthPercentile = (3 + (bodyLength - bodyLengthWho3ChartData[i]) / ((bodyLengthWho10ChartData[i] - bodyLengthWho3ChartData[i]) / 7)).toFixed(1);
                                    } else if (bodyLength >= bodyLengthWho10ChartData[i] && bodyLength <= bodyLengthWho25ChartData[i]) {
                                        caBodyLengthPercentile = (10 + (bodyLength - bodyLengthWho10ChartData[i]) / ((bodyLengthWho25ChartData[i] - bodyLengthWho10ChartData[i]) / 15)).toFixed(1);
                                    } else if (bodyLength >= bodyLengthWho25ChartData[i] && bodyLength <= bodyLengthWho50ChartData[i]) {
                                        caBodyLengthPercentile = (25 + (bodyLength - bodyLengthWho25ChartData[i]) / ((bodyLengthWho50ChartData[i] - bodyLengthWho25ChartData[i]) / 25)).toFixed(1);
                                    } else if (bodyLength >= bodyLengthWho50ChartData[i] && bodyLength <= bodyLengthWho75ChartData[i]) {
                                        caBodyLengthPercentile = (50 + (bodyLength - bodyLengthWho50ChartData[i]) / ((bodyLengthWho75ChartData[i] - bodyLengthWho50ChartData[i]) / 25)).toFixed(1);
                                    } else if (bodyLength >= bodyLengthWho75ChartData[i] && bodyLength <= bodyLengthWho90ChartData[i]) {
                                        caBodyLengthPercentile = (75 + (bodyLength - bodyLengthWho90ChartData[i]) / ((bodyLengthWho90ChartData[i] - bodyLengthWho75ChartData[i]) / 15)).toFixed(1);
                                    } else if (bodyLength >= bodyLengthWho90ChartData[i] && bodyLength <= bodyLengthWho97ChartData[i]) {
                                        caBodyLengthPercentile = (90 + (bodyLength - bodyLengthWho97ChartData[i]) / ((bodyLengthWho97ChartData[i] - bodyLengthWho90ChartData[i]) / 7)).toFixed(1);
                                    } else {
                                        caBodyLengthPercentile = (97 + (bodyLength - bodyLengthWho97ChartData[i]) / ((bodyLengthWho97ChartData[i] - bodyLengthWho3ChartData[i]) / 94)).toFixed(1);
                                    }
                                    $("input[name='ca" + i + "mBodyLengthPercentile']").val(caBodyLengthPercentile);
                                    // 身长Z评分 计算
                                    $("input[name='ca" + i + "mBodyLengthZScore']").val(((bodyLength - lengthZScoreMid[i]) / lengthZScoreSd[i]).toFixed(2));
                                    // 身长 增加速度
                                    if (notNullTool(bodyLengthList[j - 1])) {
                                        const lastBodyLengthMsg = bodyLengthList[j - 1],
                                            lastDateStamp = lastBodyLengthMsg.lengthCheckDate,
                                            lastBodyLength = lastBodyLengthMsg.bodyLength,
                                            bodyLengthGainRate = (bodyLength - lastBodyLength) / ((lengthCheckDateStamp - lastDateStamp) / 604800000);
                                        $("input[name='ca" + i + "mBodyLengthGainRate']").val(bodyLengthGainRate.toFixed(2));
                                    }
                                    break;
                                }
                            }
                        }
                    }
                }
            }, "json");
            // 获取 头围 数据
            $.get("/perinatalPlatform/followDatabase/write/GC/GA/getHeadCircumference", function (back, status) {
                if (status === "success") {
                    if (back.code) {
                        const headCircumferenceList = back.headCircumferenceList,
                            cga40wDate = dateFormatDay(cga40wDateStamp);
                        // 纠正胎龄40周 头围 计算
                        for (let i = 0; i < headCircumferenceList.length; i++) {
                            const headCircumferenceMsg = headCircumferenceList[i],
                                headCircumferenceCheckDateStamp = headCircumferenceMsg.headCircumferenceCheckDate,
                                headCircumferenceCheckDate = dateFormatDay(headCircumferenceCheckDateStamp);
                            if (cga40wDate === headCircumferenceCheckDate) {
                                const headCircumference = parseFloat(headCircumferenceMsg.headCircumference);
                                $("input[name='ca40wHeadCircumference']").val(headCircumference);
                                // 头围百分位 计算
                                let ca40wHeadCircumferencePercentile;
                                if (headCircumference < headCircumferenceWho3ChartData[0]) {
                                    ca40wHeadCircumferencePercentile = (3 - (headCircumferenceWho3ChartData[0] - headCircumference) / ((headCircumferenceWho97ChartData[0] - headCircumferenceWho3ChartData[0]) / 94)).toFixed(1);
                                } else if (headCircumference >= headCircumferenceWho3ChartData[0] && headCircumference <= headCircumferenceWho10ChartData[0]) {
                                    ca40wHeadCircumferencePercentile = (3 + (headCircumference - headCircumferenceWho3ChartData[0]) / ((headCircumferenceWho10ChartData[0] - headCircumferenceWho3ChartData[0]) / 7)).toFixed(1);
                                } else if (headCircumference >= headCircumferenceWho10ChartData[0] && headCircumference <= headCircumferenceWho25ChartData[0]) {
                                    ca40wHeadCircumferencePercentile = (10 + (headCircumference - headCircumferenceWho10ChartData[0]) / ((headCircumferenceWho25ChartData[0] - headCircumferenceWho10ChartData[0]) / 15)).toFixed(1);
                                } else if (headCircumference >= headCircumferenceWho25ChartData[0] && headCircumference <= headCircumferenceWho50ChartData[0]) {
                                    ca40wHeadCircumferencePercentile = (25 + (headCircumference - headCircumferenceWho25ChartData[0]) / ((headCircumferenceWho50ChartData[0] - headCircumferenceWho25ChartData[0]) / 25)).toFixed(1);
                                } else if (headCircumference >= headCircumferenceWho50ChartData[0] && headCircumference <= headCircumferenceWho75ChartData[0]) {
                                    ca40wHeadCircumferencePercentile = (50 + (headCircumference - headCircumferenceWho50ChartData[0]) / ((headCircumferenceWho75ChartData[0] - headCircumferenceWho50ChartData[0]) / 25)).toFixed(1);
                                } else if (headCircumference >= headCircumferenceWho75ChartData[0] && headCircumference <= headCircumferenceWho90ChartData[0]) {
                                    ca40wHeadCircumferencePercentile = (75 + (headCircumference - headCircumferenceWho90ChartData[0]) / ((headCircumferenceWho90ChartData[0] - headCircumferenceWho75ChartData[0]) / 15)).toFixed(1);
                                } else if (headCircumference >= headCircumferenceWho90ChartData[0] && headCircumference <= headCircumferenceWho97ChartData[0]) {
                                    ca40wHeadCircumferencePercentile = (90 + (headCircumference - headCircumferenceWho97ChartData[0]) / ((headCircumferenceWho97ChartData[0] - headCircumferenceWho90ChartData[0]) / 7)).toFixed(1);
                                } else {
                                    ca40wHeadCircumferencePercentile = (97 + (headCircumference - headCircumferenceWho97ChartData[0]) / ((headCircumferenceWho97ChartData[0] - headCircumferenceWho3ChartData[0]) / 94)).toFixed(1);
                                }
                                $("input[name='ca40wHeadCircumferencePercentile']").val(ca40wHeadCircumferencePercentile);
                                // 头围Z评分 计算
                                $("input[name='ca40wHeadCircumferenceZScore']").val(((headCircumference - headCircumferenceZScoreMid[0]) / headCircumferenceZScoreSd[0]).toFixed(2));
                                break;
                            }
                        }
                        // 矫正年龄 1-12月 头围 计算
                        for (let i = 1; i <= 12; i++) {
                            const caThisDateStamp = caDateStamp[i - 1],
                                caThisDate = dateFormatDay(caThisDateStamp);
                            for (let j = 0; i < headCircumferenceList.length; j++) {
                                const headCircumferenceMsg = headCircumferenceList[j],
                                    headCircumferenceCheckDateStamp = headCircumferenceMsg.headCircumferenceCheckDate,
                                    headCircumferenceCheckDate = dateFormatDay(headCircumferenceCheckDateStamp);
                                if (caThisDate === headCircumferenceCheckDate) {
                                    const headCircumference = parseFloat(headCircumferenceMsg.headCircumference);
                                    $("input[name='ca" + i + "mHeadCircumference']").val(headCircumference);
                                    // 头围百分位 计算
                                    let caHeadCircumferencePercentile;
                                    if (headCircumference < headCircumferenceWho3ChartData[i]) {
                                        caHeadCircumferencePercentile = (3 - (headCircumferenceWho3ChartData[i] - headCircumference) / ((headCircumferenceWho97ChartData[i] - headCircumferenceWho3ChartData[i]) / 94)).toFixed(1);
                                    } else if (headCircumference >= headCircumferenceWho3ChartData[i] && headCircumference <= headCircumferenceWho10ChartData[i]) {
                                        caHeadCircumferencePercentile = (3 + (headCircumference - headCircumferenceWho3ChartData[i]) / ((headCircumferenceWho10ChartData[i] - headCircumferenceWho3ChartData[i]) / 7)).toFixed(1);
                                    } else if (headCircumference >= headCircumferenceWho10ChartData[i] && headCircumference <= headCircumferenceWho25ChartData[i]) {
                                        caHeadCircumferencePercentile = (10 + (headCircumference - headCircumferenceWho10ChartData[i]) / ((headCircumferenceWho25ChartData[i] - headCircumferenceWho10ChartData[i]) / 15)).toFixed(1);
                                    } else if (headCircumference >= headCircumferenceWho25ChartData[i] && headCircumference <= headCircumferenceWho50ChartData[i]) {
                                        caHeadCircumferencePercentile = (25 + (headCircumference - headCircumferenceWho25ChartData[i]) / ((headCircumferenceWho50ChartData[i] - headCircumferenceWho25ChartData[i]) / 25)).toFixed(1);
                                    } else if (headCircumference >= headCircumferenceWho50ChartData[i] && headCircumference <= headCircumferenceWho75ChartData[i]) {
                                        caHeadCircumferencePercentile = (50 + (headCircumference - headCircumferenceWho50ChartData[i]) / ((headCircumferenceWho75ChartData[i] - headCircumferenceWho50ChartData[i]) / 25)).toFixed(1);
                                    } else if (headCircumference >= headCircumferenceWho75ChartData[i] && headCircumference <= headCircumferenceWho90ChartData[i]) {
                                        caHeadCircumferencePercentile = (75 + (headCircumference - headCircumferenceWho90ChartData[i]) / ((headCircumferenceWho90ChartData[i] - headCircumferenceWho75ChartData[i]) / 15)).toFixed(1);
                                    } else if (headCircumference >= headCircumferenceWho90ChartData[i] && headCircumference <= headCircumferenceWho97ChartData[i]) {
                                        caHeadCircumferencePercentile = (90 + (headCircumference - headCircumferenceWho97ChartData[i]) / ((headCircumferenceWho97ChartData[i] - headCircumferenceWho90ChartData[i]) / 7)).toFixed(1);
                                    } else {
                                        caHeadCircumferencePercentile = (97 + (headCircumference - headCircumferenceWho97ChartData[i]) / ((headCircumferenceWho97ChartData[i] - headCircumferenceWho3ChartData[i]) / 94)).toFixed(1);
                                    }
                                    $("input[name='ca" + i + "mHeadCircumferencePercentile']").val(caHeadCircumferencePercentile);
                                    // 头围Z评分 计算
                                    $("input[name='ca" + i + "mHeadCircumferenceZScore']").val(((headCircumference - headCircumferenceZScoreMid[i]) / headCircumferenceZScoreSd[i]).toFixed(2));
                                    // 头围 增加速度
                                    if (notNullTool(headCircumferenceList[j - 1])) {
                                        const lastHeadCircumferenceMsg = headCircumferenceList[j - 1],
                                            lastDateStamp = lastHeadCircumferenceMsg.headCircumferenceCheckDate,
                                            lastHeadCircumference = lastHeadCircumferenceMsg.headCircumference,
                                            headCircumferenceGainRate = (headCircumference - lastHeadCircumference) / ((headCircumferenceCheckDateStamp - lastDateStamp) / 604800000);
                                        $("input[name='ca" + i + "mHeadCircumferenceGainRate']").val(headCircumferenceGainRate.toFixed(2));
                                    }
                                    break;
                                }
                            }
                        }
                    }
                }
            }, "json");
            // 获取 喂养 数据
            $.get("/perinatalPlatform/followDatabase/write/GC/GA/getFeeding", function (back, status) {
                if (status === "success") {
                    if (back.code) {
                        const feedingList = back.feedingList,
                            cga40wDate = dateFormatDay(cga40wDateStamp);
                        // 纠正胎龄40周 喂养 计算
                        for (let i = 0; i < feedingList.length; i++) {
                            const feedingMsg = feedingList[i],
                                feedingRecordDateStamp = feedingMsg.feedingRecordDate,
                                feedingRecordDate = dateFormatDay(feedingRecordDateStamp);
                            if (cga40wDate === feedingRecordDate) {
                                const feedingMethod = feedingMsg.feedingMethod,
                                    breastMilkAmount = parseFloat(feedingMsg.breastMilkAmount),
                                    prematureInfantFormulaMilk = parseFloat(feedingMsg.prematureInfantFormulaMilk),
                                    termInfantFormulaMilk = parseFloat(feedingMsg.termInfantFormulaMilk),
                                    aminoAcidMilk = parseFloat(feedingMsg.aminoAcidMilk),
                                    hydrolyzedProteinMilk = parseFloat(feedingMsg.hydrolyzedProteinMilk),
                                    breastMilkFortifier = feedingMsg.breastMilkFortifier;
                                // 喂养方式
                                $("input[name='ca40wFeedingMethod']").val(feedingMethod);
                                // 热卡 计算
                                $("input[name='ca40wCalories']").val(Math.round(0.67 * breastMilkAmount + 0.81 * prematureInfantFormulaMilk + 0.67 * termInfantFormulaMilk + 0.7 * aminoAcidMilk + 0.7 * hydrolyzedProteinMilk));
                                // 母乳强化剂
                                $("input[name='ca40wBreastMilkFortifier']").val(breastMilkFortifier);
                                break;
                            }
                        }
                        // 矫正年龄 1-12月 喂养 计算
                        for (let i = 1; i <= 12; i++) {
                            const caThisDateStamp = caDateStamp[i - 1],
                                caThisDate = dateFormatDay(caThisDateStamp);
                            for (let j = 0; i < feedingList.length; j++) {
                                const feedingMsg = feedingList[j],
                                    feedingRecordDateStamp = feedingMsg.feedingRecordDate,
                                    feedingRecordDate = dateFormatDay(feedingRecordDateStamp);
                                if (caThisDate === feedingRecordDate) {
                                    const feedingMethod = feedingMsg.feedingMethod,
                                        breastMilkAmount = parseFloat(feedingMsg.breastMilkAmount),
                                        prematureInfantFormulaMilk = parseFloat(feedingMsg.prematureInfantFormulaMilk),
                                        termInfantFormulaMilk = parseFloat(feedingMsg.termInfantFormulaMilk),
                                        aminoAcidMilk = parseFloat(feedingMsg.aminoAcidMilk),
                                        hydrolyzedProteinMilk = parseFloat(feedingMsg.hydrolyzedProteinMilk),
                                        breastMilkFortifier = feedingMsg.breastMilkFortifier;
                                    // 喂养方式
                                    $("input[name='ca" + i + "mFeedingMethod']").val(feedingMethod);
                                    // 热卡 计算
                                    $("input[name='ca" + i + "mCalories']").val(Math.round(0.67 * breastMilkAmount + 0.81 * prematureInfantFormulaMilk + 0.67 * termInfantFormulaMilk + 0.7 * aminoAcidMilk + 0.7 * hydrolyzedProteinMilk));
                                    // 母乳强化剂
                                    $("input[name='ca" + i + "mBreastMilkFortifier']").val(breastMilkFortifier);
                                    break;
                                }
                            }
                        }
                    }
                }
            }, "json");

            // 随访数据库 生长曲线 生长评估 1-12月 添加/编辑 信息 提交
            form.on("submit(GCGA1)", function (data) {
                const doing = "保存信息";
                loading(doing);
                let field = data.field, subData = {}, gaArray = [], ca40wGaJson = {
                    correctedAge: "40w",
                    caDate: field["ca40wDate"],
                    caActualAgeMonth: field["ca40wActualAgeMonth"],
                    caActualAgeDay: field["ca40wActualAgeDay"]
                };
                if (notNullTool(field["ca40wBodyWeight"])) {
                    ca40wGaJson.caBodyWeight = field["ca40wBodyWeight"];
                }
                if (notNullTool(field["ca40wBodyLength"])) {
                    ca40wGaJson.caBodyLength = field["ca40wBodyLength"];
                }
                if (notNullTool(field["ca40wHeadCircumference"])) {
                    ca40wGaJson.caHeadCircumference = field["ca40wHeadCircumference"];
                }
                if (notNullTool(field["ca40wBodyWeightPercentile"])) {
                    ca40wGaJson.caBodyWeightPercentile = field["ca40wBodyWeightPercentile"];
                }
                if (notNullTool(field["ca40wBodyLengthPercentile"])) {
                    ca40wGaJson.caBodyLengthPercentile = field["ca40wBodyLengthPercentile"];
                }
                if (notNullTool(field["ca40wHeadCircumferencePercentile"])) {
                    ca40wGaJson.caHeadCircumferencePercentile = field["ca40wHeadCircumferencePercentile"];
                }
                if (notNullTool(field["ca40wBodyWeightZScore"])) {
                    ca40wGaJson.caBodyWeightZScore = field["ca40wBodyWeightZScore"];
                }
                if (notNullTool(field["ca40wBodyLengthZScore"])) {
                    ca40wGaJson.caBodyLengthZScore = field["ca40wBodyLengthZScore"];
                }
                if (notNullTool(field["ca40wHeadCircumferenceZScore"])) {
                    ca40wGaJson.caHeadCircumferenceZScore = field["ca40wHeadCircumferenceZScore"];
                }
                if (notNullTool(field["ca40wBodyWeightGainRate"])) {
                    ca40wGaJson.caBodyWeightGainRate = field["ca40wBodyWeightGainRate"];
                }
                if (notNullTool(field["ca40wBodyLengthGainRate"])) {
                    ca40wGaJson.caBodyLengthGainRate = field["ca40wBodyLengthGainRate"];
                }
                if (notNullTool(field["ca40wHeadCircumferenceGainRate"])) {
                    ca40wGaJson.caHeadCircumferenceGainRate = field["ca40wHeadCircumferenceGainRate"];
                }
                if (notNullTool(field["ca40wFeedingMethod"])) {
                    ca40wGaJson.caFeedingMethod = field["ca40wFeedingMethod"];
                }
                if (notNullTool(field["ca40wCalories"])) {
                    ca40wGaJson.caCalories = field["ca40wCalories"];
                }
                if (notNullTool(field["ca40wBreastMilkFortifier"])) {
                    ca40wGaJson.caBreastMilkFortifier = field["ca40wBreastMilkFortifier"];
                }
                gaArray.push(ca40wGaJson);
                for (let i = 1; i <= 12; i++) {
                    let caGaJson = {
                        correctedAge: i + "m",
                        caDate: field["ca" + i + "mDate"],
                        caActualAgeMonth: field["ca" + i + "mActualAgeMonth"],
                        caActualAgeDay: field["ca" + i + "mActualAgeDay"]
                    };
                    if (notNullTool(field["ca" + i + "mBodyWeight"])) {
                        caGaJson.caBodyWeight = field["ca" + i + "mBodyWeight"];
                    }
                    if (notNullTool(field["ca" + i + "mBodyLength"])) {
                        caGaJson.caBodyLength = field["ca" + i + "mBodyLength"];
                    }
                    if (notNullTool(field["ca" + i + "mHeadCircumference"])) {
                        caGaJson.caHeadCircumference = field["ca" + i + "mHeadCircumference"];
                    }
                    if (notNullTool(field["ca" + i + "mBodyWeightPercentile"])) {
                        caGaJson.caBodyWeightPercentile = field["ca" + i + "mBodyWeightPercentile"];
                    }
                    if (notNullTool(field["ca" + i + "mBodyLengthPercentile"])) {
                        caGaJson.caBodyLengthPercentile = field["ca" + i + "mBodyLengthPercentile"];
                    }
                    if (notNullTool(field["ca" + i + "mHeadCircumferencePercentile"])) {
                        caGaJson.caHeadCircumferencePercentile = field["ca" + i + "mHeadCircumferencePercentile"];
                    }
                    if (notNullTool(field["ca" + i + "mBodyWeightZScore"])) {
                        caGaJson.caBodyWeightZScore = field["ca" + i + "mBodyWeightZScore"];
                    }
                    if (notNullTool(field["ca" + i + "mBodyLengthZScore"])) {
                        caGaJson.caBodyLengthZScore = field["ca" + i + "mBodyLengthZScore"];
                    }
                    if (notNullTool(field["ca" + i + "mHeadCircumferenceZScore"])) {
                        caGaJson.caHeadCircumferenceZScore = field["ca" + i + "mHeadCircumferenceZScore"];
                    }
                    if (notNullTool(field["ca" + i + "mBodyWeightGainRate"])) {
                        caGaJson.caBodyWeightGainRate = field["ca" + i + "mBodyWeightGainRate"];
                    }
                    if (notNullTool(field["ca" + i + "mBodyLengthGainRate"])) {
                        caGaJson.caBodyLengthGainRate = field["ca" + i + "mBodyLengthGainRate"];
                    }
                    if (notNullTool(field["ca" + i + "mHeadCircumferenceGainRate"])) {
                        caGaJson.caHeadCircumferenceGainRate = field["ca" + i + "mHeadCircumferenceGainRate"];
                    }
                    if (notNullTool(field["ca" + i + "mFeedingMethod"])) {
                        caGaJson.caFeedingMethod = field["ca" + i + "mFeedingMethod"];
                    }
                    if (notNullTool(field["ca" + i + "mCalories"])) {
                        caGaJson.caCalories = field["ca" + i + "mCalories"];
                    }
                    if (notNullTool(field["ca" + i + "mBreastMilkFortifier"])) {
                        caGaJson.caBreastMilkFortifier = field["ca" + i + "mBreastMilkFortifier"];
                    }
                    gaArray.push(caGaJson);
                }
                subData.gaArray = JSON.stringify(gaArray);
                $.post("/perinatalPlatform/followDatabase/write/GC/GA/0mTo12m/post", subData, function (back, status) {
                    if (status === "success") {
                        if (back.code) {
                            successNext();
                        } else {failMsg(doing)}
                    } else {errorMsg1()}
                }, "json").fail(function () {errorMsg2()});
            });
        }
        // 13月-6年
        if ($(".pc-db-FDGCGA2").length > 0) {
            let weightZScoreMid, weightZScoreSd3Neg, weightZScoreSd2Neg, weightZScoreSd1Neg, weightZScoreSd0,
                weightZScoreSd1, weightZScoreSd2, weightZScoreSd3,
                lengthZScoreMid, lengthZScoreSd, headCircumferenceZScoreMid, headCircumferenceZScoreSd;
            // Z评分 数据
            if (gender === "男") {
                // 体重 Z评分 数据
                weightZScoreMid = [10.3108, 10.9385, 12.1515, 13.3, 14.3429, 16.3489, 18.3366];
                weightZScoreSd3Neg = [7.4, 7.8, 8.6, 9.4, 10, 11.2, 12.4];
                weightZScoreSd2Neg = [8.3, 8.8, 9.7, 10.5, 11.3, 12.7, 14.1];
                weightZScoreSd1Neg = [9.2, 9.8, 10.8, 11.8, 12.7, 14.4, 16];
                weightZScoreSd0 = [10.3, 10.9, 12.2, 13.3, 14.3, 16.3, 18.3];
                weightZScoreSd1 = [11.5, 12.2, 13.6, 15, 16.2, 18.6, 21];
                weightZScoreSd2 = [12.8, 13.7, 15.3, 16.9, 18.3, 21.2, 24.2];
                weightZScoreSd3 = [14.3, 15.3, 17.1, 19, 20.7, 24.2, 27.9];
                // 身长 Z评分 数据
                lengthZScoreMid = [79.1458, 82.2587, 87.8161, 91.9327, 96.0835, 103.3273, 109.9638];
                lengthZScoreSd = [2.5303, 2.6973, 3.0551, 3.4052, 3.7069, 4.1941, 4.6339];
                // 头围 Z评分 数据
                headCircumferenceZScoreMid = [46.806, 47.3711, 48.2515, 48.9351, 49.4612, 50.2115, 50.7375];
                headCircumferenceZScoreSd = [1.3068, 1.3264, 1.3612, 1.3932, 1.42, 1.4622, 1.4947];
            } else if (gender === "女") {
                // 体重 Z评分 数据
                weightZScoreMid = [9.6008, 10.2315, 11.4775, 12.7055, 13.8503, 16.0697, 18.2193];
                weightZScoreSd3Neg = [6.7, 7.2, 8.1, 8.9, 9.6, 10.9, 12.1];
                weightZScoreSd2Neg = [7.6, 8.1, 9, 10, 10.8, 12.3, 13.7];
                weightZScoreSd1Neg = [8.5, 9.1, 10.2, 11.2, 12.2, 14, 15.8];
                weightZScoreSd0 = [9.6, 10.2, 11.5, 12.7, 13.9, 16.1, 18.2];
                weightZScoreSd1 = [10.9, 11.6, 13, 14.4, 15.8, 18.5, 21.2];
                weightZScoreSd2 = [12.4, 13.2, 14.8, 16.5, 18.1, 21.5, 24.9, 5];
                weightZScoreSd3 = [14.1, 15.1, 17, 19, 20.9, 25.2, 29.5];
                // 身长 Z评分 数据
                lengthZScoreMid = [77.5099, 80.7079, 86.4153, 90.6797, 95.0515, 102.7312, 109.4233];
                lengthZScoreSd = [2.7392, 2.9039, 3.2267, 3.5302, 3.8078, 4.3075, 4.7566];
                // 头围 Z评分 数据
                headCircumferenceZScoreMid = [45.6551, 46.2424, 47.1822, 47.934, 48.5099, 49.3321, 49.9229];
                headCircumferenceZScoreSd = [1.3724, 1.3813, 1.3952, 1.4059, 1.4126, 1.4198, 1.4228];
            }
            // 矫正年龄 13月-6年 计算
            let correctedAge = ["15m", "18m", "24m", "30m", "36m", "4y", "5y", "6y"],
                caMonth = [15, 18, 24, 30, 36, 48, 60],
                caYear = [1, 1, 2, 2, 3, 4, 5, 6],
                caYearMonth = [3, 6, 0, 6, 0, 0, 0, 0],
                caDateStamp = [];
            for (let i = 0; i < 8; i++) {
                const gestationalAgeDays = gestationalAgeWeek * 7 + gestationalAgeDay,
                    caDayAge = 40 * 7 + caYear[i] * 365 + caYearMonth[i] * 30 - gestationalAgeDays;
                caDateStamp[i] = birthdayStamp + caDayAge * 86400000;
                const actualAgeMonth0 = Math.floor((caDateStamp[i] - birthdayStamp) / 86400000 / 30),
                    actualAgeDay0 = ((caDateStamp[i] - birthdayStamp) / 86400000) % 30;
                let actualAgeMonth = actualAgeMonth0, actualAgeDay = actualAgeDay0;
                if (actualAgeMonth0 >= 12) {
                    const caAgeYear = Math.floor((caDateStamp[i] - birthdayStamp) / 86400000 / 365);
                    actualAgeMonth = caAgeYear * 12 + Math.floor(((caDateStamp[i] - birthdayStamp) / 86400000 - caAgeYear * 365) / 30);
                    actualAgeDay = Math.floor(((caDateStamp[i] - birthdayStamp) / 86400000 - caAgeYear * 365) % 30);
                }
                $("input[name='ca" + correctedAge[i] + "Date']").val(dateFormatDay(caDateStamp[i]));
                $("input[name='ca" + correctedAge[i] + "ActualAgeMonth']").val(actualAgeMonth);
                $("input[name='ca" + correctedAge[i] + "ActualAgeDay']").val(actualAgeDay);
                $("#PC-db-CA" + correctedAge[i] + "AA").val(actualAgeMonth + "月 " + actualAgeDay + "天");
            }
            // 获取 体重 数据
            $.get("/perinatalPlatform/followDatabase/write/GC/GA/getBodyWeight", function (back, status) {
                if (status === "success") {
                    if (back.code) {
                        const bodyWeightList = back.bodyWeightList;
                        // 矫正年龄 13月-6年 体重 计算
                        for (let i = 0; i < 8; i++) {
                            const caThisDateStamp = caDateStamp[i],
                                caThisDate = dateFormatDay(caThisDateStamp);
                            for (let j = 0; i < bodyWeightList.length; j++) {
                                const bodyWeightMsg = bodyWeightList[j],
                                    weightCheckDateStamp = bodyWeightMsg.weightCheckDate,
                                    weightCheckDate = dateFormatDay(weightCheckDateStamp);
                                if (caThisDate === weightCheckDate) {
                                    const bodyWeight = parseFloat(bodyWeightMsg.bodyWeight);
                                    $("input[name='ca" + correctedAge[i] + "BodyWeight']").val(bodyWeight);
                                    if (i < 7) {
                                        // 体重百分位 计算
                                        let caBodyWeightPercentile;
                                        if (bodyWeight < weightWho3ChartData[caMonth[i]]) {
                                            caBodyWeightPercentile = (3 - (weightWho3ChartData[caMonth[i] - 1] - bodyWeight) / ((weightWho97ChartData[caMonth[i]] - weightWho3ChartData[caMonth[i]]) / 94)).toFixed(1);
                                        } else if (bodyWeight >= weightWho3ChartData[caMonth[i]] && bodyWeight <= weightWho10ChartData[caMonth[i]]) {
                                            caBodyWeightPercentile = (3 + (bodyWeight - weightWho3ChartData[caMonth[i]]) / ((weightWho10ChartData[caMonth[i]] - weightWho3ChartData[caMonth[i]]) / 7)).toFixed(1);
                                        } else if (bodyWeight >= weightWho10ChartData[caMonth[i]] && bodyWeight <= weightWho25ChartData[caMonth[i]]) {
                                            caBodyWeightPercentile = (10 + (bodyWeight - weightWho10ChartData[caMonth[i]]) / ((weightWho25ChartData[caMonth[i]] - weightWho10ChartData[caMonth[i]]) / 15)).toFixed(1);
                                        } else if (bodyWeight >= weightWho25ChartData[caMonth[i]] && bodyWeight <= weightWho50ChartData[caMonth[i]]) {
                                            caBodyWeightPercentile = (25 + (bodyWeight - weightWho25ChartData[caMonth[i]]) / ((weightWho50ChartData[caMonth[i]] - weightWho25ChartData[caMonth[i]]) / 25)).toFixed(1);
                                        } else if (bodyWeight >= weightWho50ChartData[caMonth[i]] && bodyWeight <= weightWho75ChartData[caMonth[i]]) {
                                            caBodyWeightPercentile = (50 + (bodyWeight - weightWho50ChartData[caMonth[i]]) / ((weightWho75ChartData[caMonth[i]] - weightWho50ChartData[caMonth[i]]) / 25)).toFixed(1);
                                        } else if (bodyWeight >= weightWho75ChartData[caMonth[i]] && bodyWeight <= weightWho90ChartData[caMonth[i]]) {
                                            caBodyWeightPercentile = (75 + (bodyWeight - weightWho90ChartData[caMonth[i]]) / ((weightWho90ChartData[caMonth[i]] - weightWho75ChartData[caMonth[i]]) / 15)).toFixed(1);
                                        } else if (bodyWeight >= weightWho90ChartData[caMonth[i]] && bodyWeight <= weightWho97ChartData[caMonth[i]]) {
                                            caBodyWeightPercentile = (90 + (bodyWeight - weightWho97ChartData[caMonth[i]]) / ((weightWho97ChartData[caMonth[i]] - weightWho90ChartData[caMonth[i]]) / 7)).toFixed(1);
                                        } else {
                                            caBodyWeightPercentile = (97 + (bodyWeight - weightWho97ChartData[caMonth[i]]) / ((weightWho97ChartData[caMonth[i]] - weightWho3ChartData[caMonth[i]]) / 94)).toFixed(1);
                                        }
                                        $("input[name='ca" + correctedAge[i] + "BodyWeightPercentile']").val(caBodyWeightPercentile);
                                        // 体重Z评分 计算
                                        let caBodyWeightZSd;
                                        if (bodyWeight < weightZScoreSd3Neg[i]) {
                                            caBodyWeightZSd = 3 + (weightZScoreSd3Neg[i] - bodyWeight) / ((weightZScoreSd0[i] - weightZScoreSd3Neg[i]) / 3);
                                        } else if (bodyWeight >= weightZScoreSd3Neg[i] && bodyWeight <= weightZScoreSd2Neg[i]) {
                                            caBodyWeightZSd = 2 + (weightZScoreSd2Neg[i] - bodyWeight) / (weightZScoreSd2Neg[i] - weightZScoreSd3Neg[i]);
                                        } else if (bodyWeight >= weightZScoreSd2Neg[i] && bodyWeight <= weightZScoreSd1Neg[i]) {
                                            caBodyWeightZSd = 1 + (weightZScoreSd1Neg[i] - bodyWeight) / (weightZScoreSd1Neg[i] - weightZScoreSd2Neg[i]);
                                        } else if (bodyWeight >= weightZScoreSd1Neg[i] && bodyWeight <= weightZScoreSd0[i]) {
                                            caBodyWeightZSd = (weightZScoreSd0[i] - bodyWeight) / (weightZScoreSd0[i] - weightZScoreSd1Neg[i]);
                                        } else if (bodyWeight >= weightZScoreSd0[i] && bodyWeight <= weightZScoreSd1[i]) {
                                            caBodyWeightZSd = (bodyWeight - weightZScoreSd0[i]) / (weightZScoreSd1[i] - weightZScoreSd0[i]);
                                        } else if (bodyWeight >= weightZScoreSd1[i] && bodyWeight <= weightZScoreSd2[i]) {
                                            caBodyWeightZSd = 1 + (bodyWeight - weightZScoreSd1[i]) / (weightZScoreSd2[i] - weightZScoreSd1[i]);
                                        } else if (bodyWeight >= weightZScoreSd2[i] && bodyWeight <= weightZScoreSd3[i]) {
                                            caBodyWeightZSd = 2 + (bodyWeight - weightZScoreSd2[i]) / (weightZScoreSd3[i] - weightZScoreSd2[i]);
                                        } else {
                                            caBodyWeightZSd = 3 + (bodyWeight - weightZScoreSd3Neg[i]) / ((weightZScoreSd3[i] - weightZScoreSd0[i]) / 3);
                                        }
                                        if (caBodyWeightZSd === 0) {
                                            $("input[name='ca" + correctedAge[i] + "BodyWeightZScore']").val(0);
                                        } else {
                                            $("input[name='ca" + correctedAge[i] + "BodyWeightZScore']").val(((bodyWeight - weightZScoreMid[i]) / caBodyWeightZSd).toFixed(2));
                                        }
                                    }
                                    // 体重 增加速度
                                    if (notNullTool(bodyWeightList[j - 1])) {
                                        const lastBodyWeightMsg = bodyWeightList[j - 1],
                                            lastDateStamp = lastBodyWeightMsg.weightCheckDate,
                                            lastBodyWeight = lastBodyWeightMsg.bodyWeight,
                                            bodyWeightGainRate = (bodyWeight - lastBodyWeight) * 1000 / ((weightCheckDateStamp - lastDateStamp) / 604800000);
                                        $("input[name='ca" + correctedAge[i] + "BodyWeightGainRate']").val(bodyWeightGainRate.toFixed(0));
                                    }
                                    break;
                                }
                            }
                        }
                    }
                }
            }, "json");
            // 获取 身长 数据
            $.get("/perinatalPlatform/followDatabase/write/GC/GA/getBodyLength", function (back, status) {
                if (status === "success") {
                    if (back.code) {
                        const bodyLengthList = back.bodyLengthList;
                        // 矫正年龄 13月-6年 身长 计算
                        for (let i = 0; i < 8; i++) {
                            const caThisDateStamp = caDateStamp[i],
                                caThisDate = dateFormatDay(caThisDateStamp);
                            for (let j = 0; i < bodyLengthList.length; j++) {
                                const bodyLengthMsg = bodyLengthList[j],
                                    lengthCheckDateStamp = bodyLengthMsg.lengthCheckDate,
                                    lengthCheckDate = dateFormatDay(lengthCheckDateStamp);
                                if (caThisDate === lengthCheckDate) {
                                    const bodyLength = parseFloat(bodyLengthMsg.bodyLength);
                                    $("input[name='ca" + correctedAge[i] + "BodyLength']").val(bodyLength);
                                    if (i < 7) {
                                        // 身长百分位 计算
                                        let caBodyLengthPercentile;
                                        if (bodyLength < bodyLengthWho3ChartData[caMonth[i]]) {
                                            caBodyLengthPercentile = (3 - (bodyLengthWho3ChartData[caMonth[i]] - bodyLength) / ((bodyLengthWho97ChartData[caMonth[i]] - bodyLengthWho3ChartData[caMonth[i]]) / 94)).toFixed(1);
                                        } else if (bodyLength >= bodyLengthWho3ChartData[caMonth[i]] && bodyLength <= bodyLengthWho10ChartData[caMonth[i]]) {
                                            caBodyLengthPercentile = (3 + (bodyLength - bodyLengthWho3ChartData[caMonth[i]]) / ((bodyLengthWho10ChartData[caMonth[i]] - bodyLengthWho3ChartData[caMonth[i]]) / 7)).toFixed(1);
                                        } else if (bodyLength >= bodyLengthWho10ChartData[caMonth[i]] && bodyLength <= bodyLengthWho25ChartData[caMonth[i]]) {
                                            caBodyLengthPercentile = (10 + (bodyLength - bodyLengthWho10ChartData[caMonth[i]]) / ((bodyLengthWho25ChartData[caMonth[i]] - bodyLengthWho10ChartData[caMonth[i]]) / 15)).toFixed(1);
                                        } else if (bodyLength >= bodyLengthWho25ChartData[caMonth[i]] && bodyLength <= bodyLengthWho50ChartData[caMonth[i]]) {
                                            caBodyLengthPercentile = (25 + (bodyLength - bodyLengthWho25ChartData[caMonth[i]]) / ((bodyLengthWho50ChartData[caMonth[i]] - bodyLengthWho25ChartData[caMonth[i]]) / 25)).toFixed(1);
                                        } else if (bodyLength >= bodyLengthWho50ChartData[caMonth[i]] && bodyLength <= bodyLengthWho75ChartData[caMonth[i]]) {
                                            caBodyLengthPercentile = (50 + (bodyLength - bodyLengthWho50ChartData[caMonth[i]]) / ((bodyLengthWho75ChartData[caMonth[i]] - bodyLengthWho50ChartData[caMonth[i]]) / 25)).toFixed(1);
                                        } else if (bodyLength >= bodyLengthWho75ChartData[caMonth[i]] && bodyLength <= bodyLengthWho90ChartData[caMonth[i]]) {
                                            caBodyLengthPercentile = (75 + (bodyLength - bodyLengthWho90ChartData[caMonth[i]]) / ((bodyLengthWho90ChartData[caMonth[i]] - bodyLengthWho75ChartData[caMonth[i]]) / 15)).toFixed(1);
                                        } else if (bodyLength >= bodyLengthWho90ChartData[caMonth[i]] && bodyLength <= bodyLengthWho97ChartData[caMonth[i]]) {
                                            caBodyLengthPercentile = (90 + (bodyLength - bodyLengthWho97ChartData[caMonth[i]]) / ((bodyLengthWho97ChartData[caMonth[i]] - bodyLengthWho90ChartData[caMonth[i]]) / 7)).toFixed(1);
                                        } else {
                                            caBodyLengthPercentile = (97 + (bodyLength - bodyLengthWho97ChartData[caMonth[i]]) / ((bodyLengthWho97ChartData[caMonth[i]] - bodyLengthWho3ChartData[caMonth[i]]) / 94)).toFixed(1);
                                        }
                                        $("input[name='ca" + correctedAge[i] + "BodyLengthPercentile']").val(caBodyLengthPercentile);
                                        // 身长Z评分 计算
                                        $("input[name='ca" + correctedAge[i] + "BodyLengthZScore']").val(((bodyLength - lengthZScoreMid[i]) / lengthZScoreSd[i]).toFixed(2));
                                    }
                                    // 身长 增加速度
                                    if (notNullTool(bodyLengthList[j - 1])) {
                                        const lastBodyLengthMsg = bodyLengthList[j - 1],
                                            lastDateStamp = lastBodyLengthMsg.lengthCheckDate,
                                            lastBodyLength = lastBodyLengthMsg.bodyLength,
                                            bodyLengthGainRate = (bodyLength - lastBodyLength) / ((lengthCheckDateStamp - lastDateStamp) / 604800000);
                                        $("input[name='ca" + correctedAge[i] + "BodyLengthGainRate']").val(bodyLengthGainRate.toFixed(2));
                                    }
                                    break;
                                }
                            }
                        }
                    }
                }
            }, "json");
            // 获取 头围 数据
            $.get("/perinatalPlatform/followDatabase/write/GC/GA/getHeadCircumference", function (back, status) {
                if (status === "success") {
                    if (back.code) {
                        const headCircumferenceList = back.headCircumferenceList;
                        // 矫正年龄 13月-6年 头围 计算
                        for (let i = 0; i < 8; i++) {
                            const caThisDateStamp = caDateStamp[i],
                                caThisDate = dateFormatDay(caThisDateStamp);
                            for (let j = 0; i < headCircumferenceList.length; j++) {
                                const headCircumferenceMsg = headCircumferenceList[j],
                                    headCircumferenceCheckDateStamp = headCircumferenceMsg.headCircumferenceCheckDate,
                                    headCircumferenceCheckDate = dateFormatDay(headCircumferenceCheckDateStamp);
                                if (caThisDate === headCircumferenceCheckDate) {
                                    const headCircumference = parseFloat(headCircumferenceMsg.headCircumference);
                                    $("input[name='ca" + correctedAge[i] + "HeadCircumference']").val(headCircumference);
                                    if (i < 7) {
                                        // 头围百分位 计算
                                        let caHeadCircumferencePercentile;
                                        if (headCircumference < headCircumferenceWho3ChartData[caMonth[i]]) {
                                            caHeadCircumferencePercentile = (3 - (headCircumferenceWho3ChartData[caMonth[i]] - headCircumference) / ((headCircumferenceWho97ChartData[caMonth[i]] - headCircumferenceWho3ChartData[caMonth[i]]) / 94)).toFixed(1);
                                        } else if (headCircumference >= headCircumferenceWho3ChartData[caMonth[i]] && headCircumference <= headCircumferenceWho10ChartData[caMonth[i]]) {
                                            caHeadCircumferencePercentile = (3 + (headCircumference - headCircumferenceWho3ChartData[caMonth[i]]) / ((headCircumferenceWho10ChartData[caMonth[i]] - headCircumferenceWho3ChartData[caMonth[i]]) / 7)).toFixed(1);
                                        } else if (headCircumference >= headCircumferenceWho10ChartData[caMonth[i]] && headCircumference <= headCircumferenceWho25ChartData[caMonth[i]]) {
                                            caHeadCircumferencePercentile = (10 + (headCircumference - headCircumferenceWho10ChartData[caMonth[i]]) / ((headCircumferenceWho25ChartData[caMonth[i]] - headCircumferenceWho10ChartData[caMonth[i]]) / 15)).toFixed(1);
                                        } else if (headCircumference >= headCircumferenceWho25ChartData[caMonth[i]] && headCircumference <= headCircumferenceWho50ChartData[caMonth[i]]) {
                                            caHeadCircumferencePercentile = (25 + (headCircumference - headCircumferenceWho25ChartData[caMonth[i]]) / ((headCircumferenceWho50ChartData[caMonth[i]] - headCircumferenceWho25ChartData[caMonth[i]]) / 25)).toFixed(1);
                                        } else if (headCircumference >= headCircumferenceWho50ChartData[caMonth[i]] && headCircumference <= headCircumferenceWho75ChartData[caMonth[i]]) {
                                            caHeadCircumferencePercentile = (50 + (headCircumference - headCircumferenceWho50ChartData[caMonth[i]]) / ((headCircumferenceWho75ChartData[caMonth[i]] - headCircumferenceWho50ChartData[caMonth[i]]) / 25)).toFixed(1);
                                        } else if (headCircumference >= headCircumferenceWho75ChartData[caMonth[i]] && headCircumference <= headCircumferenceWho90ChartData[caMonth[i]]) {
                                            caHeadCircumferencePercentile = (75 + (headCircumference - headCircumferenceWho90ChartData[caMonth[i]]) / ((headCircumferenceWho90ChartData[caMonth[i]] - headCircumferenceWho75ChartData[caMonth[i]]) / 15)).toFixed(1);
                                        } else if (headCircumference >= headCircumferenceWho90ChartData[caMonth[i]] && headCircumference <= headCircumferenceWho97ChartData[caMonth[i]]) {
                                            caHeadCircumferencePercentile = (90 + (headCircumference - headCircumferenceWho97ChartData[caMonth[i]]) / ((headCircumferenceWho97ChartData[caMonth[i]] - headCircumferenceWho90ChartData[caMonth[i]]) / 7)).toFixed(1);
                                        } else {
                                            caHeadCircumferencePercentile = (97 + (headCircumference - headCircumferenceWho97ChartData[caMonth[i]]) / ((headCircumferenceWho97ChartData[caMonth[i]] - headCircumferenceWho3ChartData[caMonth[i]]) / 94)).toFixed(1);
                                        }
                                        $("input[name='ca" + correctedAge[i] + "HeadCircumferencePercentile']").val(caHeadCircumferencePercentile);
                                        // 头围Z评分 计算
                                        $("input[name='ca" + correctedAge[i] + "HeadCircumferenceZScore']").val(((headCircumference - headCircumferenceZScoreMid[i]) / headCircumferenceZScoreSd[i]).toFixed(2));
                                    }
                                    // 头围 增加速度
                                    if (notNullTool(headCircumferenceList[j - 1])) {
                                        const lastHeadCircumferenceMsg = headCircumferenceList[j - 1],
                                            lastDateStamp = lastHeadCircumferenceMsg.headCircumferenceCheckDate,
                                            lastHeadCircumference = lastHeadCircumferenceMsg.headCircumference,
                                            headCircumferenceGainRate = (headCircumference - lastHeadCircumference) / ((headCircumferenceCheckDateStamp - lastDateStamp) / 604800000);
                                        $("input[name='ca" + correctedAge[i] + "HeadCircumferenceGainRate']").val(headCircumferenceGainRate.toFixed(2));
                                    }
                                    break;
                                }
                            }
                        }
                    }
                }
            }, "json");
            // 获取 喂养 数据
            $.get("/perinatalPlatform/followDatabase/write/GC/GA/getFeeding", function (back, status) {
                if (status === "success") {
                    if (back.code) {
                        const feedingList = back.feedingList;
                        // 矫正年龄 13月-6年 喂养 计算
                        for (let i = 0; i < 8; i++) {
                            const caThisDateStamp = caDateStamp[i],
                                caThisDate = dateFormatDay(caThisDateStamp);
                            for (let j = 0; i < feedingList.length; j++) {
                                const feedingMsg = feedingList[j],
                                    feedingRecordDateStamp = feedingMsg.feedingRecordDate,
                                    feedingRecordDate = dateFormatDay(feedingRecordDateStamp);
                                if (caThisDate === feedingRecordDate) {
                                    const feedingMethod = feedingMsg.feedingMethod,
                                        breastMilkAmount = parseFloat(feedingMsg.breastMilkAmount),
                                        prematureInfantFormulaMilk = parseFloat(feedingMsg.prematureInfantFormulaMilk),
                                        termInfantFormulaMilk = parseFloat(feedingMsg.termInfantFormulaMilk),
                                        aminoAcidMilk = parseFloat(feedingMsg.aminoAcidMilk),
                                        hydrolyzedProteinMilk = parseFloat(feedingMsg.hydrolyzedProteinMilk),
                                        breastMilkFortifier = feedingMsg.breastMilkFortifier;
                                    // 喂养方式
                                    $("input[name='ca" + correctedAge[i] + "FeedingMethod']").val(feedingMethod);
                                    // 热卡 计算
                                    $("input[name='ca" + correctedAge[i] + "Calories']").val(Math.round(0.67 * breastMilkAmount + 0.81 * prematureInfantFormulaMilk + 0.67 * termInfantFormulaMilk + 0.7 * aminoAcidMilk + 0.7 * hydrolyzedProteinMilk));
                                    // 母乳强化剂
                                    $("input[name='ca" + correctedAge[i] + "BreastMilkFortifier']").val(breastMilkFortifier);
                                    break;
                                }
                            }
                        }
                    }
                }
            }, "json");

            // 随访数据库 生长曲线 生长评估 13月-6年 添加/编辑 信息 提交
            form.on("submit(GCGA2)", function (data) {
                const doing = "保存信息";
                loading(doing);
                let field = data.field, subData = {}, gaArray = [];
                for (let i = 0; i < 8; i++) {
                    let caGaJson = {
                        correctedAge: correctedAge[i],
                        caDate: field["ca" + correctedAge[i] + "Date"],
                        caActualAgeMonth: field["ca" + correctedAge[i] + "ActualAgeMonth"],
                        caActualAgeDay: field["ca" + correctedAge[i] + "ActualAgeDay"]
                    };
                    if (notNullTool(field["ca" + correctedAge[i] + "BodyWeight"])) {
                        caGaJson.caBodyWeight = field["ca" + correctedAge[i] + "BodyWeight"];
                    }
                    if (notNullTool(field["ca" + correctedAge[i] + "BodyLength"])) {
                        caGaJson.caBodyLength = field["ca" + correctedAge[i] + "BodyLength"];
                    }
                    if (notNullTool(field["ca" + correctedAge[i] + "HeadCircumference"])) {
                        caGaJson.caHeadCircumference = field["ca" + correctedAge[i] + "HeadCircumference"];
                    }
                    if (notNullTool(field["ca" + correctedAge[i] + "BodyWeightPercentile"])) {
                        caGaJson.caBodyWeightPercentile = field["ca" + correctedAge[i] + "BodyWeightPercentile"];
                    }
                    if (notNullTool(field["ca" + correctedAge[i] + "BodyLengthPercentile"])) {
                        caGaJson.caBodyLengthPercentile = field["ca" + correctedAge[i] + "BodyLengthPercentile"];
                    }
                    if (notNullTool(field["ca" + correctedAge[i] + "HeadCircumferencePercentile"])) {
                        caGaJson.caHeadCircumferencePercentile = field["ca" + correctedAge[i] + "HeadCircumferencePercentile"];
                    }
                    if (notNullTool(field["ca" + correctedAge[i] + "BodyWeightZScore"])) {
                        caGaJson.caBodyWeightZScore = field["ca" + correctedAge[i] + "BodyWeightZScore"];
                    }
                    if (notNullTool(field["ca" + correctedAge[i] + "BodyLengthZScore"])) {
                        caGaJson.caBodyLengthZScore = field["ca" + correctedAge[i] + "BodyLengthZScore"];
                    }
                    if (notNullTool(field["ca" + correctedAge[i] + "HeadCircumferenceZScore"])) {
                        caGaJson.caHeadCircumferenceZScore = field["ca" + correctedAge[i] + "HeadCircumferenceZScore"];
                    }
                    if (notNullTool(field["ca" + correctedAge[i] + "BodyWeightGainRate"])) {
                        caGaJson.caBodyWeightGainRate = field["ca" + correctedAge[i] + "BodyWeightGainRate"];
                    }
                    if (notNullTool(field["ca" + correctedAge[i] + "BodyLengthGainRate"])) {
                        caGaJson.caBodyLengthGainRate = field["ca" + correctedAge[i] + "BodyLengthGainRate"];
                    }
                    if (notNullTool(field["ca" + correctedAge[i] + "HeadCircumferenceGainRate"])) {
                        caGaJson.caHeadCircumferenceGainRate = field["ca" + correctedAge[i] + "HeadCircumferenceGainRate"];
                    }
                    if (notNullTool(field["ca" + correctedAge[i] + "FeedingMethod"])) {
                        caGaJson.caFeedingMethod = field["ca" + correctedAge[i] + "FeedingMethod"];
                    }
                    if (notNullTool(field["ca" + correctedAge[i] + "Calories"])) {
                        caGaJson.caCalories = field["ca" + correctedAge[i] + "Calories"];
                    }
                    if (notNullTool(field["ca" + correctedAge[i] + "BreastMilkFortifier"])) {
                        caGaJson.caBreastMilkFortifier = field["ca" + correctedAge[i] + "BreastMilkFortifier"];
                    }
                    gaArray.push(caGaJson);
                }
                subData.gaArray = JSON.stringify(gaArray);
                $.post("/perinatalPlatform/followDatabase/write/GC/GA/13mTo6y/post", subData, function (back, status) {
                    if (status === "success") {
                        if (back.code) {
                            successNext();
                        } else {failMsg(doing)}
                    } else {errorMsg1()}
                }, "json").fail(function () {errorMsg2()});
            });
        }

        // 随访数据库 生长曲线 营养
        if ($(".pc-db-FDGCNT").length > 0) {
            let nrIndex = 0;
            // 初始化 喂养记录
            const nrIndexInput = $(".pc-db-FDGCNT .pc-db-table>tbody").attr("data-num");
            if (notNullTool(nrIndexInput)) {
                nrIndex = parseInt(nrIndexInput);
                // 为 日期 选择 初始化
                for (let i = 1; i <= nrIndex; i++) {
                    const thisNrIndex = i;
                    // 计算 矫正年龄
                    computeCa(birthdayStamp, gestationalAgeWeek, gestationalAgeDay, cga40WeekDateStamp, thisNrIndex, $("#PC-db-NRD" + thisNrIndex).val());
                    laydate.render({
                        elem: "#PC-db-NRD" + thisNrIndex,
                        type: "date",
                        format: "yyyy-MM-dd",
                        min: cga40WeekDateStamp,
                        max: 0,
                        done: function (value) {
                            if (value !== "") {
                                // 计算 矫正年龄
                                computeCa(birthdayStamp, gestationalAgeWeek, gestationalAgeDay, cga40WeekDateStamp, thisNrIndex, value);
                            }
                        }
                    });
                    // 删除 营养记录 行
                    $("#PC-db-nrDelete" + thisNrIndex).on("click", function () {
                        const that = this;
                        layer.msg("确定要 <span class='pc-db-status-color-no'>删除</span> 此条营养记录信息吗?", {
                            icon: 7,
                            time: 0,
                            anim: 6,
                            btn: ["确定", "取消"],
                            resize: false,
                            shade: 0.8,
                            yes: function (index) {
                                $(that).parents("tr").remove();
                                // 计算 营养记录 次数
                                const nrTimes = $(".pc-db-FDGCNT .pc-db-table>tbody>tr").length - 1;
                                $("#PC-db-NRN").val(nrTimes);
                                layer.close(index);
                            }
                        });
                    });
                }
            }
            // 增加 营养记录
            $("#PC-db-addNR").on("click", function () {
                const that = this;
                nrIndex++;
                sequentialExecution(function () {
                    $(that).parents("tr").before(
                        "<tr>" +
                        "   <td>" +
                        "       <input id='PC-db-NRD" + nrIndex + "' type='text' name='nutritionRecordDate" + nrIndex + "' lay-verify='required' placeholder='请选择记录日期' lay-reqText='请选择记录日期！' readonly>" +
                        "   </td>" +
                        "   <td>" +
                        "       <input id='PC-db-CA" + nrIndex + "' type='text' readonly>" +
                        "       <input id='PC-db-CGAW" + nrIndex + "' type='hidden' name='cgaWeek" + nrIndex + "'>" +
                        "       <input id='PC-db-CGAD" + nrIndex + "' type='hidden' name='cgaDay" + nrIndex + "'>" +
                        "       <input id='PC-db-CAM" + nrIndex + "' type='hidden' name='correctedAgeMonth" + nrIndex + "'>" +
                        "       <input id='PC-db-CAD" + nrIndex + "' type='hidden' name='correctedAgeDay" + nrIndex + "'>" +
                        "   </td>" +
                        "   <td>" +
                        "       <input type='number' name='hgb" + nrIndex + "' placeholder='请填写Hgb'>" +
                        "   </td>" +
                        "   <td>" +
                        "       <input type='number' name='ironTherapy" + nrIndex + "' placeholder='请填写铁剂治疗'>" +
                        "   </td>" +
                        "   <td>" +
                        "       <input type='number' name='oh25D3" + nrIndex + "' placeholder='请填写25（OH）D3'>" +
                        "   </td>" +
                        "   <td>" +
                        "       <input type='number' name='vitaminAd" + nrIndex + "' placeholder='请填写维生素AD'>" +
                        "   </td>" +
                        "   <td>" +
                        "       <input type='number' name='vitaminD3" + nrIndex + "' placeholder='请填写维生素D3'>" +
                        "   </td>" +
                        "   <td>" +
                        "       <select name='diarrhea" + nrIndex + "' lay-reqText='请选择是否腹泻！' lay-verify='required'>" +
                        "           <option value=''>请选择是否腹泻</option>" +
                        "           <option value='是'>是</option>" +
                        "           <option value='否'>否</option>" +
                        "       </select>" +
                        "   </td>" +
                        "   <td>" +
                        "       <select name='rash" + nrIndex + "' lay-reqText='请选择是否皮疹！' lay-verify='required'>" +
                        "           <option value=''>请选择是否皮疹</option>" +
                        "           <option value='是'>是</option>" +
                        "           <option value='否'>否</option>" +
                        "       </select>" +
                        "   </td>" +
                        "   <td>" +
                        "       <select name='bloodyStools" + nrIndex + "' lay-reqText='请选择是否血便！' lay-verify='required'>" +
                        "           <option value=''>请选择是否血便</option>" +
                        "           <option value='是'>是</option>" +
                        "           <option value='否'>否</option>" +
                        "       </select>" +
                        "   </td>" +
                        "   <td>" +
                        "       <select name='respite" + nrIndex + "' lay-reqText='请选择是否喘息！' lay-verify='required'>" +
                        "           <option value=''>请选择是否喘息</option>" +
                        "           <option value='是'>是</option>" +
                        "           <option value='否'>否</option>" +
                        "       </select>" +
                        "   </td>" +
                        "   <td>" +
                        "       <input type='text' name='doctorAdvice" + nrIndex + "' placeholder='请填写医生建议'>" +
                        "   </td>" +
                        "   <td>" +
                        "       <button id='PC-db-nrDelete" + nrIndex + "' class='pc-btn pc-btn-danger'><i class='iconfont icon-delete'></i></button>" +
                        "   </td>" +
                        "</tr>");
                }, function () {
                    form.render("select");
                }, function () {
                    const thisNrIndex = nrIndex;
                    laydate.render({
                        elem: "#PC-db-NRD" + thisNrIndex,
                        type: "date",
                        format: "yyyy-MM-dd",
                        min: cga40WeekDateStamp,
                        max: 0,
                        done: function (value) {
                            if (value !== "") {
                                // 计算 矫正年龄
                                computeCa(birthdayStamp, gestationalAgeWeek, gestationalAgeDay, cga40WeekDateStamp, thisNrIndex, value);
                            }
                        }
                    });
                    // 计算 营养记录 次数
                    const nrTimes = $(".pc-db-FDGCNT .pc-db-table>tbody>tr").length - 1;
                    $("#PC-db-NRN").val(nrTimes);
                    // 删除 营养记录 行
                    $("#PC-db-nrDelete" + thisNrIndex).on("click", function () {
                        const that = this;
                        layer.msg("确定要 <span class='pc-db-status-color-no'>删除</span> 此条营养记录信息吗?", {
                            icon: 7,
                            time: 0,
                            anim: 6,
                            btn: ["确定", "取消"],
                            resize: false,
                            shade: 0.8,
                            yes: function (index) {
                                $(that).parents("tr").remove();
                                // 计算 营养记录 次数
                                const nrTimes = $(".pc-db-FDGCNT .pc-db-table>tbody>tr").length - 1;
                                $("#PC-db-NRN").val(nrTimes);
                                layer.close(index);
                            }
                        });
                    });
                });
            });

            // 随访数据库 生长曲线 营养 添加/编辑 信息 提交
            form.on("submit(GCNT)", function (data) {
                const doing = "保存信息";
                loading(doing);
                let field = data.field, nrArray = [];
                for (let i = 1; i <= nrIndex; i++) {
                    if (notNullTool(field["nutritionRecordDate" + i])) {
                        nrArray.push({
                            nutritionRecordDate: field["nutritionRecordDate" + i],
                            cgaWeek: field["cgaWeek" + i],
                            cgaDay: field["cgaDay" + i],
                            correctedAgeMonth: field["correctedAgeMonth" + i],
                            correctedAgeDay: field["correctedAgeDay" + i],
                            hgb: field["hgb" + i],
                            ironTherapy: field["ironTherapy" + i],
                            oh25D3: field["oh25D3" + i],
                            vitaminAd: field["vitaminAd" + i],
                            vitaminD3: field["vitaminD3" + i],
                            diarrhea: field["diarrhea" + i],
                            rash: field["rash" + i],
                            bloodyStools: field["bloodyStools" + i],
                            respite: field["respite" + i],
                            doctorAdvice: field["doctorAdvice" + i]
                        });
                        delete field["nutritionRecordDate" + i];
                        delete field["cgaWeek" + i];
                        delete field["cgaDay" + i];
                        delete field["correctedAgeMonth" + i];
                        delete field["correctedAgeDay" + i];
                        delete field["hgb" + i];
                        delete field["ironTherapy" + i];
                        delete field["oh25D3" + i];
                        delete field["vitaminAd" + i];
                        delete field["vitaminD3" + i];
                        delete field["diarrhea" + i];
                        delete field["rash" + i];
                        delete field["bloodyStools" + i];
                        delete field["respite" + i];
                        delete field["doctorAdvice" + i];
                    }
                }
                field.nrArray = JSON.stringify(nrArray);
                $.post("/perinatalPlatform/followDatabase/write/GC/NT/post", field, function (back, status) {
                    if(status === "success") {
                        if(back.code) {
                            successNext();
                        }else {failMsg(doing)}
                    }else {errorMsg1()}
                }, "json").fail(function () {errorMsg2()});
            });
        }

        // 随访数据库 发育水平 视力
        if ($(".pc-db-FDDLVI").length > 0) {
            let vcIndex = 0;
            // 初始化 视力检查
            const vcIndexInput = $(".pc-db-FDDLVI .pc-db-table>tbody").attr("data-num");
            if (notNullTool(vcIndexInput)) {
                vcIndex = parseInt(vcIndexInput);
                // 为 日期 选择 初始化
                for (let i = 1; i <= vcIndex; i++) {
                    const thisVcIndex = i;
                    // 计算 矫正年龄
                    computeCa(birthdayStamp, gestationalAgeWeek, gestationalAgeDay, cga40WeekDateStamp, thisVcIndex, $("#PC-db-VCD" + thisVcIndex).val());
                    laydate.render({
                        elem: "#PC-db-VCD" + thisVcIndex,
                        type: "date",
                        format: "yyyy-MM-dd",
                        min: cga40WeekDateStamp,
                        max: 0,
                        done: function (value) {
                            if (value !== "") {
                                // 计算 矫正年龄
                                computeCa(birthdayStamp, gestationalAgeWeek, gestationalAgeDay, cga40WeekDateStamp, thisVcIndex, value);
                            }
                        }
                    });
                    // 删除 视力检查 行
                    $("#PC-db-vcDelete" + thisVcIndex).on("click", function () {
                        const that = this;
                        layer.msg("确定要 <span class='pc-db-status-color-no'>删除</span> 此条视力检查信息吗?", {
                            icon: 7,
                            time: 0,
                            anim: 6,
                            btn: ["确定", "取消"],
                            resize: false,
                            shade: 0.8,
                            yes: function (index) {
                                $(that).parents("tr").remove();
                                // 计算 视力检查 次数
                                const vcTimes = $(".pc-db-FDDLVI .pc-db-table>tbody>tr").length - 1;
                                $("#PC-db-VCN").val(vcTimes);
                                layer.close(index);
                            }
                        });
                    });
                }
            }
            // 增加 视力检查
            $("#PC-db-addVC").on("click", function () {
                const that = this;
                vcIndex++;
                sequentialExecution(function () {
                    $(that).parents("tr").before(
                        "<tr>" +
                        "   <td>" +
                        "       <input id='PC-db-VCD" + vcIndex + "' type='text' name='visionCheckDate" + vcIndex + "' lay-verify='required' placeholder='请选择检查日期' lay-reqText='请选择检查日期！' readonly>" +
                        "   </td>" +
                        "   <td>" +
                        "       <input id='PC-db-CA" + vcIndex + "' type='text' readonly>" +
                        "       <input id='PC-db-CGAW" + vcIndex + "' type='hidden' name='cgaWeek" + vcIndex + "'>" +
                        "       <input id='PC-db-CGAD" + vcIndex + "' type='hidden' name='cgaDay" + vcIndex + "'>" +
                        "       <input id='PC-db-CAM" + vcIndex + "' type='hidden' name='correctedAgeMonth" + vcIndex + "'>" +
                        "       <input id='PC-db-CAD" + vcIndex + "' type='hidden' name='correctedAgeDay" + vcIndex + "'>" +
                        "   </td>" +
                        "   <td>" +
                        "       <select name='leftEyeScreening" + vcIndex + "' lay-reqText='请选择左眼筛查结果！' lay-verify='required'>" +
                        "           <option value=''>请选择左眼筛查结果</option>" +
                        "           <option value='未查'>未查</option>" +
                        "           <option value='正常'>正常</option>" +
                        "           <option value='ROP1期'>ROP1期</option>" +
                        "           <option value='ROP2期'>ROP2期</option>" +
                        "           <option value='ROP3期'>ROP3期</option>" +
                        "           <option value='ROP4期'>ROP4期</option>" +
                        "           <option value='ROP5期'>ROP5期</option>" +
                        "           <option value='不详'>不详</option>" +
                        "       </select>" +
                        "   </td>" +
                        "   <td>" +
                        "       <select name='leftEyePlus" + vcIndex + "' lay-reqText='请选择是否左眼Plus！' lay-verify='required'>" +
                        "           <option value=''>请选择是否左眼Plus</option>" +
                        "           <option value='是'>是</option>" +
                        "           <option value='否'>否</option>" +
                        "           <option value='不详'>不详</option>" +
                        "       </select>" +
                        "   </td>" +
                        "   <td>" +
                        "       <select name='leftEyeTreatment" + vcIndex + "' lay-reqText='请选择左眼治疗！' lay-verify='required'>" +
                        "           <option value=''>请选择左眼治疗</option>" +
                        "           <option value='无'>无</option>" +
                        "           <option value='激光'>激光</option>" +
                        "           <option value='药物注射'>药物注射</option>" +
                        "           <option value='激光和药物'>激光和药物</option>" +
                        "           <option value='手术'>手术</option>" +
                        "           <option value='其它'>其它</option>" +
                        "       </select>" +
                        "   </td>" +
                        "   <td>" +
                        "       <select name='leftEyeVisualEvokedPotential" + vcIndex + "' lay-reqText='请选择左眼视觉诱发电位！' lay-verify='required'>" +
                        "           <option value=''>请选择左眼视觉诱发电位</option>" +
                        "           <option value='未查'>未查</option>" +
                        "           <option value='正常'>正常</option>" +
                        "           <option value='异常'>异常</option>" +
                        "           <option value='不详'>不详</option>" +
                        "       </select>" +
                        "   </td>" +
                        "   <td>" +
                        "       <select name='rightEyeScreening" + vcIndex + "' lay-reqText='请选择右眼筛查结果！' lay-verify='required'>" +
                        "           <option value=''>请选择右眼筛查结果</option>" +
                        "           <option value='未查'>未查</option>" +
                        "           <option value='正常'>正常</option>" +
                        "           <option value='ROP1期'>ROP1期</option>" +
                        "           <option value='ROP2期'>ROP2期</option>" +
                        "           <option value='ROP3期'>ROP3期</option>" +
                        "           <option value='ROP4期'>ROP4期</option>" +
                        "           <option value='ROP5期'>ROP5期</option>" +
                        "           <option value='不详'>不详</option>" +
                        "       </select>" +
                        "   </td>" +
                        "   <td>" +
                        "       <select name='rightEyePlus" + vcIndex + "' lay-reqText='请选择是否右眼Plus！' lay-verify='required'>" +
                        "           <option value=''>请选择是否右眼Plus</option>" +
                        "           <option value='是'>是</option>" +
                        "           <option value='否'>否</option>" +
                        "           <option value='不详'>不详</option>" +
                        "       </select>" +
                        "   </td>" +
                        "   <td>" +
                        "       <select name='rightEyeTreatment" + vcIndex + "' lay-reqText='请选择右眼治疗！' lay-verify='required'>" +
                        "           <option value=''>请选择右眼治疗</option>" +
                        "           <option value='无'>无</option>" +
                        "           <option value='激光'>激光</option>" +
                        "           <option value='药物注射'>药物注射</option>" +
                        "           <option value='激光和药物'>激光和药物</option>" +
                        "           <option value='手术'>手术</option>" +
                        "           <option value='其它'>其它</option>" +
                        "       </select>" +
                        "   </td>" +
                        "   <td>" +
                        "       <select name='rightEyeVisualEvokedPotential" + vcIndex + "' lay-reqText='请选择右眼视觉诱发电位！' lay-verify='required'>" +
                        "           <option value=''>请选择右眼视觉诱发电位</option>" +
                        "           <option value='未查'>未查</option>" +
                        "           <option value='正常'>正常</option>" +
                        "           <option value='异常'>异常</option>" +
                        "           <option value='不详'>不详</option>" +
                        "       </select>" +
                        "   </td>" +
                        "   <td>" +
                        "       <button id='PC-db-vcDelete" + vcIndex + "' class='pc-btn pc-btn-danger'><i class='iconfont icon-delete'></i></button>" +
                        "   </td>" +
                        "</tr>");
                }, function () {
                    form.render("select");
                }, function () {
                    const thisVcIndex = vcIndex;
                    laydate.render({
                        elem: "#PC-db-VCD" + thisVcIndex,
                        type: "date",
                        format: "yyyy-MM-dd",
                        min: cga40WeekDateStamp,
                        max: 0,
                        done: function (value) {
                            if (value !== "") {
                                // 计算 矫正年龄
                                computeCa(birthdayStamp, gestationalAgeWeek, gestationalAgeDay, cga40WeekDateStamp, thisVcIndex, value);
                            }
                        }
                    });
                    // 计算 视力检查 次数
                    const vcTimes = $(".pc-db-FDDLVI .pc-db-table>tbody>tr").length - 1;
                    $("#PC-db-VCN").val(vcTimes);
                    // 删除 视力检查 行
                    $("#PC-db-vcDelete" + thisVcIndex).on("click", function () {
                        const that = this;
                        layer.msg("确定要 <span class='pc-db-status-color-no'>删除</span> 此条视力检查信息吗?", {
                            icon: 7,
                            time: 0,
                            anim: 6,
                            btn: ["确定", "取消"],
                            resize: false,
                            shade: 0.8,
                            yes: function (index) {
                                $(that).parents("tr").remove();
                                // 计算 视力检查 次数
                                const vcTimes = $(".pc-db-FDDLVI .pc-db-table>tbody>tr").length - 1;
                                $("#PC-db-VCN").val(vcTimes);
                                layer.close(index);
                            }
                        });
                    });
                });
            });

            // 随访数据库 发育水平 视力 添加/编辑 信息 提交
            form.on("submit(DLVI)", function (data) {
                const doing = "保存信息";
                loading(doing);
                let field = data.field, vcArray = [];
                for (let i = 1; i <= vcIndex; i++) {
                    if (notNullTool(field["visionCheckDate" + i])) {
                        vcArray.push({
                            visionCheckDate: field["visionCheckDate" + i],
                            cgaWeek: field["cgaWeek" + i],
                            cgaDay: field["cgaDay" + i],
                            correctedAgeMonth: field["correctedAgeMonth" + i],
                            correctedAgeDay: field["correctedAgeDay" + i],
                            leftEyeScreening: field["leftEyeScreening" + i],
                            leftEyePlus: field["leftEyePlus" + i],
                            leftEyeTreatment: field["leftEyeTreatment" + i],
                            leftEyeVisualEvokedPotential: field["leftEyeVisualEvokedPotential" + i],
                            rightEyeScreening: field["rightEyeScreening" + i],
                            rightEyePlus: field["rightEyePlus" + i],
                            rightEyeTreatment: field["rightEyeTreatment" + i],
                            rightEyeVisualEvokedPotential: field["rightEyeVisualEvokedPotential" + i]
                        });
                        delete field["visionCheckDate" + i];
                        delete field["cgaWeek" + i];
                        delete field["cgaDay" + i];
                        delete field["correctedAgeMonth" + i];
                        delete field["correctedAgeDay" + i];
                        delete field["leftEyeScreening" + i];
                        delete field["leftEyePlus" + i];
                        delete field["leftEyeTreatment" + i];
                        delete field["leftEyeVisualEvokedPotential" + i];
                        delete field["rightEyeScreening" + i];
                        delete field["rightEyePlus" + i];
                        delete field["rightEyeTreatment" + i];
                        delete field["rightEyeVisualEvokedPotential" + i];
                    }
                }
                field.vcArray = JSON.stringify(vcArray);
                $.post("/perinatalPlatform/followDatabase/write/DL/VI/post", field, function (back, status) {
                    if(status === "success") {
                        if(back.code) {
                            successNext();
                        }else {failMsg(doing)}
                    }else {errorMsg1()}
                }, "json").fail(function () {errorMsg2()});
            });
        }

        // 随访数据库 发育水平 听力
        if ($(".pc-db-FDDLHR").length > 0) {
            let hcIndex = 0;
            // 初始化 听力检查
            const hcIndexInput = $(".pc-db-FDDLHR .pc-db-table>tbody").attr("data-num");
            if (notNullTool(hcIndexInput)) {
                hcIndex = parseInt(hcIndexInput);
                // 为 日期 选择 初始化
                for (let i = 1; i <= hcIndex; i++) {
                    const thisHcIndex = i;
                    // 计算 矫正年龄
                    computeCa(birthdayStamp, gestationalAgeWeek, gestationalAgeDay, cga40WeekDateStamp, thisHcIndex, $("#PC-db-HCD" + thisHcIndex).val());
                    laydate.render({
                        elem: "#PC-db-HCD" + thisHcIndex,
                        type: "date",
                        format: "yyyy-MM-dd",
                        min: cga40WeekDateStamp,
                        max: 0,
                        done: function (value) {
                            if (value !== "") {
                                // 计算 矫正年龄
                                computeCa(birthdayStamp, gestationalAgeWeek, gestationalAgeDay, cga40WeekDateStamp, thisHcIndex, value);
                            }
                        }
                    });
                    // 删除 听力检查 行
                    $("#PC-db-hcDelete" + thisHcIndex).on("click", function () {
                        const that = this;
                        layer.msg("确定要 <span class='pc-db-status-color-no'>删除</span> 此条听力检查信息吗?", {
                            icon: 7,
                            time: 0,
                            anim: 6,
                            btn: ["确定", "取消"],
                            resize: false,
                            shade: 0.8,
                            yes: function (index) {
                                $(that).parents("tr").remove();
                                // 计算 听力检查 次数
                                const hcTimes = $(".pc-db-FDDLHR .pc-db-table>tbody>tr").length - 1;
                                $("#PC-db-HCN").val(hcTimes);
                                layer.close(index);
                            }
                        });
                    });
                }
            }
            // 增加 听力检查
            $("#PC-db-addHC").on("click", function () {
                const that = this;
                hcIndex++;
                sequentialExecution(function () {
                    $(that).parents("tr").before(
                        "<tr>" +
                        "   <td>" +
                        "       <input id='PC-db-HCD" + hcIndex + "' type='text' name='hearingCheckDate" + hcIndex + "' lay-verify='required' placeholder='请选择检查日期' lay-reqText='请选择检查日期！' readonly>" +
                        "   </td>" +
                        "   <td>" +
                        "       <input id='PC-db-CA" + hcIndex + "' type='text' readonly>" +
                        "       <input id='PC-db-CGAW" + hcIndex + "' type='hidden' name='cgaWeek" + hcIndex + "'>" +
                        "       <input id='PC-db-CGAD" + hcIndex + "' type='hidden' name='cgaDay" + hcIndex + "'>" +
                        "       <input id='PC-db-CAM" + hcIndex + "' type='hidden' name='correctedAgeMonth" + hcIndex + "'>" +
                        "       <input id='PC-db-CAD" + hcIndex + "' type='hidden' name='correctedAgeDay" + hcIndex + "'>" +
                        "   </td>" +
                        "   <td>" +
                        "       <select name='leftEarAabr" + hcIndex + "' lay-reqText='请选择左耳AABR！' lay-verify='required'>" +
                        "           <option value=''>请选择左耳AABR</option>" +
                        "           <option value='未查'>未查</option>" +
                        "           <option value='通过'>通过</option>" +
                        "           <option value='未通过'>未通过</option>" +
                        "           <option value='不详'>不详</option>" +
                        "       </select>" +
                        "   </td>" +
                        "   <td>" +
                        "       <select name='leftEarDiagnosis" + hcIndex + "' lay-reqText='请选择左耳诊断！' lay-verify='required'>" +
                        "           <option value=''>请选择左耳诊断</option>" +
                        "           <option value='未查'>未查</option>" +
                        "           <option value='正常'>正常</option>" +
                        "           <option value='听力受损'>听力受损</option>" +
                        "           <option value='助听器或人工耳蜗'>助听器或人工耳蜗</option>" +
                        "           <option value='不详'>不详</option>" +
                        "       </select>" +
                        "   </td>" +
                        "   <td>" +
                        "       <select name='rightEarAabr" + hcIndex + "' lay-reqText='请选择右耳AABR！' lay-verify='required'>" +
                        "           <option value=''>请选择右耳AABR</option>" +
                        "           <option value='未查'>未查</option>" +
                        "           <option value='通过'>通过</option>" +
                        "           <option value='未通过'>未通过</option>" +
                        "           <option value='不详'>不详</option>" +
                        "       </select>" +
                        "   </td>" +
                        "   <td>" +
                        "       <select name='rightEarDiagnosis" + hcIndex + "' lay-reqText='请选择右耳诊断！' lay-verify='required'>" +
                        "           <option value=''>请选择右耳诊断</option>" +
                        "           <option value='未查'>未查</option>" +
                        "           <option value='正常'>正常</option>" +
                        "           <option value='听力受损'>听力受损</option>" +
                        "           <option value='助听器或人工耳蜗'>助听器或人工耳蜗</option>" +
                        "           <option value='不详'>不详</option>" +
                        "       </select>" +
                        "   </td>" +
                        "   <td>" +
                        "       <button id='PC-db-hcDelete" + hcIndex + "' class='pc-btn pc-btn-danger'><i class='iconfont icon-delete'></i></button>" +
                        "   </td>" +
                        "</tr>");
                }, function () {
                    form.render("select");
                }, function () {
                    const thisHcIndex = hcIndex;
                    laydate.render({
                        elem: "#PC-db-HCD" + thisHcIndex,
                        type: "date",
                        format: "yyyy-MM-dd",
                        min: cga40WeekDateStamp,
                        max: 0,
                        done: function (value) {
                            if (value !== "") {
                                // 计算 矫正年龄
                                computeCa(birthdayStamp, gestationalAgeWeek, gestationalAgeDay, cga40WeekDateStamp, thisHcIndex, value);
                            }
                        }
                    });
                    // 计算 听力检查 次数
                    const hcTimes = $(".pc-db-FDDLHR .pc-db-table>tbody>tr").length - 1;
                    $("#PC-db-HCN").val(hcTimes);
                    // 删除 听力检查 行
                    $("#PC-db-hcDelete" + thisHcIndex).on("click", function () {
                        const that = this;
                        layer.msg("确定要 <span class='pc-db-status-color-no'>删除</span> 此条听力检查信息吗?", {
                            icon: 7,
                            time: 0,
                            anim: 6,
                            btn: ["确定", "取消"],
                            resize: false,
                            shade: 0.8,
                            yes: function (index) {
                                $(that).parents("tr").remove();
                                // 计算 听力检查 次数
                                const hcTimes = $(".pc-db-FDDLHR .pc-db-table>tbody>tr").length - 1;
                                $("#PC-db-HCN").val(hcTimes);
                                layer.close(index);
                            }
                        });
                    });
                });
            });

            // 随访数据库 发育水平 听力 添加/编辑 信息 提交
            form.on("submit(DLHR)", function (data) {
                const doing = "保存信息";
                loading(doing);
                let field = data.field, hcArray = [];
                for (let i = 1; i <= hcIndex; i++) {
                    if (notNullTool(field["hearingCheckDate" + i])) {
                        hcArray.push({
                            hearingCheckDate: field["hearingCheckDate" + i],
                            cgaWeek: field["cgaWeek" + i],
                            cgaDay: field["cgaDay" + i],
                            correctedAgeMonth: field["correctedAgeMonth" + i],
                            correctedAgeDay: field["correctedAgeDay" + i],
                            leftEarAabr: field["leftEarAabr" + i],
                            leftEarDiagnosis: field["leftEarDiagnosis" + i],
                            rightEarAabr: field["rightEarAabr" + i],
                            rightEarDiagnosis: field["rightEarDiagnosis" + i]
                        });
                        delete field["hearingCheckDate" + i];
                        delete field["cgaWeek" + i];
                        delete field["cgaDay" + i];
                        delete field["correctedAgeMonth" + i];
                        delete field["correctedAgeDay" + i];
                        delete field["leftEarAabr" + i];
                        delete field["leftEarDiagnosis" + i];
                        delete field["rightEarAabr" + i];
                        delete field["rightEarDiagnosis" + i];
                    }
                }
                field.hcArray = JSON.stringify(hcArray);
                $.post("/perinatalPlatform/followDatabase/write/DL/HR/post", field, function (back, status) {
                    if(status === "success") {
                        if(back.code) {
                            successNext();
                        }else {failMsg(doing)}
                    }else {errorMsg1()}
                }, "json").fail(function () {errorMsg2()});
            });
        }

        // 随访数据库 发育水平 Gesell量表
        if ($(".pc-db-FDDLGS").length > 0) {
            let gcIndex = 0;
            // 初始化 Gesell检查
            const gcIndexInput = $(".pc-db-FDDLGS .pc-db-table>tbody").attr("data-num");
            if (notNullTool(gcIndexInput)) {
                gcIndex = parseInt(gcIndexInput);
                // 为 日期 选择 初始化
                for (let i = 1; i <= gcIndex; i++) {
                    const thisGcIndex = i;
                    // 计算 矫正年龄
                    computeCa(birthdayStamp, gestationalAgeWeek, gestationalAgeDay, cga40WeekDateStamp, thisGcIndex, $("#PC-db-GCD" + thisGcIndex).val());
                    laydate.render({
                        elem: "#PC-db-GCD" + thisGcIndex,
                        type: "date",
                        format: "yyyy-MM-dd",
                        min: cga40WeekDateStamp,
                        max: 0,
                        done: function (value) {
                            if (value !== "") {
                                // 计算 矫正年龄
                                computeCa(birthdayStamp, gestationalAgeWeek, gestationalAgeDay, cga40WeekDateStamp, thisGcIndex, value);
                            }
                        }
                    });
                    // 删除 Gesell检查 行
                    $("#PC-db-gcDelete" + thisGcIndex).on("click", function () {
                        const that = this;
                        layer.msg("确定要 <span class='pc-db-status-color-no'>删除</span> 此条Gesell量表信息吗?", {
                            icon: 7,
                            time: 0,
                            anim: 6,
                            btn: ["确定", "取消"],
                            resize: false,
                            shade: 0.8,
                            yes: function (index) {
                                $(that).parents("tr").remove();
                                // 计算 Gesell检查 次数
                                const gcTimes = $(".pc-db-FDDLGS .pc-db-table>tbody>tr").length - 1;
                                $("#PC-db-GCN").val(gcTimes);
                                layer.close(index);
                            }
                        });
                    });
                }
            }
            // 增加 Gesell检查
            $("#PC-db-addGC").on("click", function () {
                const that = this;
                gcIndex++;
                sequentialExecution(function () {
                    $(that).parents("tr").before(
                        "<tr>" +
                        "   <td>" +
                        "       <input id='PC-db-GCD" + gcIndex + "' type='text' name='gesellCheckDate" + gcIndex + "' lay-verify='required' placeholder='请选择检查日期' lay-reqText='请选择检查日期！' readonly>" +
                        "   </td>" +
                        "   <td>" +
                        "       <input id='PC-db-CA" + gcIndex + "' type='text' readonly>" +
                        "       <input id='PC-db-CGAW" + gcIndex + "' type='hidden' name='cgaWeek" + gcIndex + "'>" +
                        "       <input id='PC-db-CGAD" + gcIndex + "' type='hidden' name='cgaDay" + gcIndex + "'>" +
                        "       <input id='PC-db-CAM" + gcIndex + "' type='hidden' name='correctedAgeMonth" + gcIndex + "'>" +
                        "       <input id='PC-db-CAD" + gcIndex + "' type='hidden' name='correctedAgeDay" + gcIndex + "'>" +
                        "   </td>" +
                        "   <td>" +
                        "       <input type='number' name='adaptability" + gcIndex + "' lay-verify='required' placeholder='请填写适应性结果' lay-reqText='请填写适应性结果！'>" +
                        "   </td>" +
                        "   <td>" +
                        "       <input type='number' name='bigMovement" + gcIndex + "' lay-verify='required' placeholder='请填写大运动结果' lay-reqText='请填写大运动结果！'>" +
                        "   </td>" +
                        "   <td>" +
                        "       <input type='number' name='fineMotor" + gcIndex + "' lay-verify='required' placeholder='请填写精细运动结果' lay-reqText='请填写精细运动动结果！'>" +
                        "   </td>" +
                        "   <td>" +
                        "       <input type='number' name='language" + gcIndex + "' lay-verify='required' placeholder='请填写语言结果' lay-reqText='请填写语言结果！'>" +
                        "   </td>" +
                        "   <td>" +
                        "       <input type='number' name='personalSocial" + gcIndex + "' lay-verify='required' placeholder='请填写个人-社交结果' lay-reqText='请填写个人-社交结果！'>" +
                        "   </td>" +
                        "   <td>" +
                        "       <button id='PC-db-gcDelete" + gcIndex + "' class='pc-btn pc-btn-danger'><i class='iconfont icon-delete'></i></button>" +
                        "   </td>" +
                        "</tr>");
                }, function () {
                    const thisGcIndex = gcIndex;
                    laydate.render({
                        elem: "#PC-db-GCD" + thisGcIndex,
                        type: "date",
                        format: "yyyy-MM-dd",
                        min: cga40WeekDateStamp,
                        max: 0,
                        done: function (value) {
                            if (value !== "") {
                                // 计算 矫正年龄
                                computeCa(birthdayStamp, gestationalAgeWeek, gestationalAgeDay, cga40WeekDateStamp, thisGcIndex, value);
                            }
                        }
                    });
                    // 计算 Gesell检查 次数
                    const gcTimes = $(".pc-db-FDDLGS .pc-db-table>tbody>tr").length - 1;
                    $("#PC-db-GCN").val(gcTimes);
                    // 删除 Gesell检查 行
                    $("#PC-db-gcDelete" + thisGcIndex).on("click", function () {
                        const that = this;
                        layer.msg("确定要 <span class='pc-db-status-color-no'>删除</span> 此条Gesell量表信息吗?", {
                            icon: 7,
                            time: 0,
                            anim: 6,
                            btn: ["确定", "取消"],
                            resize: false,
                            shade: 0.8,
                            yes: function (index) {
                                $(that).parents("tr").remove();
                                // 计算 Gesell检查 次数
                                const gcTimes = $(".pc-db-FDDLGS .pc-db-table>tbody>tr").length - 1;
                                $("#PC-db-GCN").val(gcTimes);
                                layer.close(index);
                            }
                        });
                    });
                });
            });

            // 随访数据库 发育水平 Gesell量表 添加/编辑 信息 提交
            form.on("submit(DLGS)", function (data) {
                const doing = "保存信息";
                loading(doing);
                let field = data.field, gcArray = [];
                for (let i = 1; i <= gcIndex; i++) {
                    if (notNullTool(field["gesellCheckDate" + i])) {
                        gcArray.push({
                            gesellCheckDate: field["gesellCheckDate" + i],
                            cgaWeek: field["cgaWeek" + i],
                            cgaDay: field["cgaDay" + i],
                            correctedAgeMonth: field["correctedAgeMonth" + i],
                            correctedAgeDay: field["correctedAgeDay" + i],
                            adaptability: field["adaptability" + i],
                            bigMovement: field["bigMovement" + i],
                            fineMotor: field["fineMotor" + i],
                            language: field["language" + i],
                            personalSocial: field["personalSocial" + i]
                        });
                        delete field["gesellCheckDate" + i];
                        delete field["cgaWeek" + i];
                        delete field["cgaDay" + i];
                        delete field["correctedAgeMonth" + i];
                        delete field["correctedAgeDay" + i];
                        delete field["adaptability" + i];
                        delete field["bigMovement" + i];
                        delete field["fineMotor" + i];
                        delete field["language" + i];
                        delete field["personalSocial" + i];
                    }
                }
                field.gcArray = JSON.stringify(gcArray);
                $.post("/perinatalPlatform/followDatabase/write/DL/GS/post", field, function (back, status) {
                    if(status === "success") {
                        if(back.code) {
                            successNext();
                        }else {failMsg(doing)}
                    }else {errorMsg1()}
                }, "json").fail(function () {errorMsg2()});
            });
        }

        // 随访数据库 发育水平 Griffiths量表
        if ($(".pc-db-FDDLGF").length > 0) {
            let gcIndex = 0;
            // 初始化 Griffiths量表
            const gcIndexInput = $(".pc-db-FDDLGF .pc-db-table>tbody").attr("data-num");
            if (notNullTool(gcIndexInput)) {
                gcIndex = parseInt(gcIndexInput);
                // 为 日期 选择 初始化
                for (let i = 1; i <= gcIndex; i++) {
                    const thisGcIndex = i;
                    // 计算 矫正年龄
                    computeCa(birthdayStamp, gestationalAgeWeek, gestationalAgeDay, cga40WeekDateStamp, thisGcIndex, $("#PC-db-GCD" + thisGcIndex).val());
                    laydate.render({
                        elem: "#PC-db-GCD" + thisGcIndex,
                        type: "date",
                        format: "yyyy-MM-dd",
                        min: cga40WeekDateStamp,
                        max: 0,
                        done: function (value) {
                            if (value !== "") {
                                // 计算 矫正年龄
                                computeCa(birthdayStamp, gestationalAgeWeek, gestationalAgeDay, cga40WeekDateStamp, thisGcIndex, value);
                            }
                        }
                    });
                    // 计算 总评分
                    $(".pc-db-gfs").on("focusout", function () {
                        const gfsElem = $(this).parents("tr").find(".pc-db-gfs");
                        let isOk = true, totalScore = 0;
                        for (let i = 0; i < gfsElem.length; i ++) {
                            const scoreInput = $(gfsElem[i]).val();
                            if (notNullTool(scoreInput)) {
                                totalScore += parseInt(scoreInput);
                            } else {
                                isOk = false;
                            }
                        }
                        if (isOk) {
                            $("#PC-db-TS" + thisGcIndex).val(totalScore);
                        }
                    });
                    // 删除 Griffiths量表 行
                    $("#PC-db-gcDelete" + thisGcIndex).on("click", function () {
                        const that = this;
                        layer.msg("确定要 <span class='pc-db-status-color-no'>删除</span> 此条Griffiths量表信息吗?", {
                            icon: 7,
                            time: 0,
                            anim: 6,
                            btn: ["确定", "取消"],
                            resize: false,
                            shade: 0.8,
                            yes: function (index) {
                                $(that).parents("tr").remove();
                                // 计算 Griffiths量表 次数
                                const gcTimes = $(".pc-db-FDDLGF .pc-db-table>tbody>tr").length - 1;
                                $("#PC-db-GCN").val(gcTimes);
                                layer.close(index);
                            }
                        });
                    });
                }
            }
            // 增加 Griffiths量表
            $("#PC-db-addGC").on("click", function () {
                const that = this;
                gcIndex++;
                sequentialExecution(function () {
                    $(that).parents("tr").before(
                        "<tr>" +
                        "   <td>" +
                        "       <input id='PC-db-GCD" + gcIndex + "' type='text' name='griffithsCheckDate" + gcIndex + "' lay-verify='required' placeholder='请选择检查日期' lay-reqText='请选择检查日期！' readonly>" +
                        "   </td>" +
                        "   <td>" +
                        "       <input id='PC-db-CA" + gcIndex + "' type='text' readonly>" +
                        "       <input id='PC-db-CGAW" + gcIndex + "' type='hidden' name='cgaWeek" + gcIndex + "'>" +
                        "       <input id='PC-db-CGAD" + gcIndex + "' type='hidden' name='cgaDay" + gcIndex + "'>" +
                        "       <input id='PC-db-CAM" + gcIndex + "' type='hidden' name='correctedAgeMonth" + gcIndex + "'>" +
                        "       <input id='PC-db-CAD" + gcIndex + "' type='hidden' name='correctedAgeDay" + gcIndex + "'>" +
                        "   </td>" +
                        "   <td>" +
                        "       <input class='pc-db-gfs' type='number' name='sport" + gcIndex + "' lay-verify='required' placeholder='请填写运动评分' lay-reqText='请填写运动评分！'>" +
                        "   </td>" +
                        "   <td>" +
                        "       <input class='pc-db-gfs' type='number' name='individualSociety" + gcIndex + "' lay-verify='required' placeholder='请填写个人-社会评分' lay-reqText='请填写个人-社会评分！'>" +
                        "   </td>" +
                        "   <td>" +
                        "       <input class='pc-db-gfs' type='number' name='listeningSpeakingAbility" + gcIndex + "' lay-verify='required' placeholder='请填写听说能力评分' lay-reqText='请填写听说能力评分！'>" +
                        "   </td>" +
                        "   <td>" +
                        "       <input class='pc-db-gfs' type='number' name='handEyeCoordination" + gcIndex + "' lay-verify='required' placeholder='请填写手眼协调评分' lay-reqText='请填写手眼协调评分！'>" +
                        "   </td>" +
                        "   <td>" +
                        "       <input class='pc-db-gfs' type='number' name='visualManipulationAbility" + gcIndex + "' lay-verify='required' placeholder='请填写视觉操作能力评分' lay-reqText='请填写视觉操作能力评分！'>" +
                        "   </td>" +
                        "   <td>" +
                        "       <input id='PC-db-TS" + gcIndex +"' type='number' name='totalScore" + gcIndex + "' lay-verify='required' readonly>" +
                        "   </td>" +
                        "   <td>" +
                        "       <button id='PC-db-gcDelete" + gcIndex + "' class='pc-btn pc-btn-danger'><i class='iconfont icon-delete'></i></button>" +
                        "   </td>" +
                        "</tr>");
                }, function () {
                    const thisGcIndex = gcIndex;
                    laydate.render({
                        elem: "#PC-db-GCD" + thisGcIndex,
                        type: "date",
                        format: "yyyy-MM-dd",
                        min: cga40WeekDateStamp,
                        max: 0,
                        done: function (value) {
                            if (value !== "") {
                                // 计算 矫正年龄
                                computeCa(birthdayStamp, gestationalAgeWeek, gestationalAgeDay, cga40WeekDateStamp, thisGcIndex, value);
                            }
                        }
                    });
                    // 计算 总评分
                    $(".pc-db-gfs").on("focusout", function () {
                        const gfsElem = $(this).parents("tr").find(".pc-db-gfs");
                        let isOk = true, totalScore = 0;
                        for (let i = 0; i < gfsElem.length; i ++) {
                            const scoreInput = $(gfsElem[i]).val();
                            if (notNullTool(scoreInput)) {
                                totalScore += parseInt(scoreInput);
                            } else {
                                isOk = false;
                            }
                        }
                        if (isOk) {
                            $("#PC-db-TS" + thisGcIndex).val(totalScore);
                        }
                    });
                    // 计算 Griffiths量表 次数
                    const gcTimes = $(".pc-db-FDDLGF .pc-db-table>tbody>tr").length - 1;
                    $("#PC-db-GCN").val(gcTimes);
                    // 删除 Griffiths量表 行
                    $("#PC-db-gcDelete" + thisGcIndex).on("click", function () {
                        const that = this;
                        layer.msg("确定要 <span class='pc-db-status-color-no'>删除</span> 此条Griffiths量表信息吗?", {
                            icon: 7,
                            time: 0,
                            anim: 6,
                            btn: ["确定", "取消"],
                            resize: false,
                            shade: 0.8,
                            yes: function (index) {
                                $(that).parents("tr").remove();
                                // 计算 Griffiths量表 次数
                                const gcTimes = $(".pc-db-FDDLGF .pc-db-table>tbody>tr").length - 1;
                                $("#PC-db-GCN").val(gcTimes);
                                layer.close(index);
                            }
                        });
                    });
                });
            });

            // 随访数据库 发育水平 Griffiths量表 添加/编辑 信息 提交
            form.on("submit(DLGF)", function (data) {
                const doing = "保存信息";
                loading(doing);
                let field = data.field, gcArray = [];
                for (let i = 1; i <= gcIndex; i++) {
                    if (notNullTool(field["griffithsCheckDate" + i])) {
                        gcArray.push({
                            griffithsCheckDate: field["griffithsCheckDate" + i],
                            cgaWeek: field["cgaWeek" + i],
                            cgaDay: field["cgaDay" + i],
                            correctedAgeMonth: field["correctedAgeMonth" + i],
                            correctedAgeDay: field["correctedAgeDay" + i],
                            sport: field["sport" + i],
                            individualSociety: field["individualSociety" + i],
                            listeningSpeakingAbility: field["listeningSpeakingAbility" + i],
                            handEyeCoordination: field["handEyeCoordination" + i],
                            visualManipulationAbility: field["visualManipulationAbility" + i],
                            totalScore: field["totalScore" + i]
                        });
                        delete field["griffithsCheckDate" + i];
                        delete field["cgaWeek" + i];
                        delete field["cgaDay" + i];
                        delete field["correctedAgeMonth" + i];
                        delete field["correctedAgeDay" + i];
                        delete field["sport" + i];
                        delete field["individualSociety" + i];
                        delete field["listeningSpeakingAbility" + i];
                        delete field["handEyeCoordination" + i];
                        delete field["visualManipulationAbility" + i];
                        delete field["totalScore" + i];
                    }
                }
                field.gcArray = JSON.stringify(gcArray);
                $.post("/perinatalPlatform/followDatabase/write/DL/GF/post", field, function (back, status) {
                    if(status === "success") {
                        if(back.code) {
                            successNext();
                        }else {failMsg(doing)}
                    }else {errorMsg1()}
                }, "json").fail(function () {errorMsg2()});
            });
        }

        // 随访数据库 发育水平 GMFCS
        if ($(".pc-db-FDDLGM").length > 0) {
            let gcIndex = 0;
            // 初始化 GMFCS
            const gcIndexInput = $(".pc-db-FDDLGM .pc-db-table>tbody").attr("data-num");
            if (notNullTool(gcIndexInput)) {
                gcIndex = parseInt(gcIndexInput);
                // 为 日期 选择 初始化
                for (let i = 1; i <= gcIndex; i++) {
                    const thisGcIndex = i;
                    // 计算 矫正年龄
                    computeCa(birthdayStamp, gestationalAgeWeek, gestationalAgeDay, cga40WeekDateStamp, thisGcIndex, $("#PC-db-GCD" + thisGcIndex).val());
                    laydate.render({
                        elem: "#PC-db-GCD" + thisGcIndex,
                        type: "date",
                        format: "yyyy-MM-dd",
                        min: cga40WeekDateStamp,
                        max: 0,
                        done: function (value) {
                            if (value !== "") {
                                // 计算 矫正年龄
                                computeCa(birthdayStamp, gestationalAgeWeek, gestationalAgeDay, cga40WeekDateStamp, thisGcIndex, value);
                            }
                        }
                    });
                    // 删除 GMFCS 行
                    $("#PC-db-gcDelete" + thisGcIndex).on("click", function () {
                        const that = this;
                        layer.msg("确定要 <span class='pc-db-status-color-no'>删除</span> 此条GMFCS信息吗?", {
                            icon: 7,
                            time: 0,
                            anim: 6,
                            btn: ["确定", "取消"],
                            resize: false,
                            shade: 0.8,
                            yes: function (index) {
                                $(that).parents("tr").remove();
                                // 计算 GMFCS 次数
                                const gcTimes = $(".pc-db-FDDLGM .pc-db-table>tbody>tr").length - 1;
                                $("#PC-db-GCN").val(gcTimes);
                                layer.close(index);
                            }
                        });
                    });
                }
            }
            // 增加 GMFCS
            $("#PC-db-addGC").on("click", function () {
                const that = this;
                gcIndex++;
                sequentialExecution(function () {
                    $(that).parents("tr").before(
                        "<tr>" +
                        "   <td>" +
                        "       <input id='PC-db-GCD" + gcIndex + "' type='text' name='gmfcsCheckDate" + gcIndex + "' lay-verify='required' placeholder='请选择检查日期' lay-reqText='请选择检查日期！' readonly>" +
                        "   </td>" +
                        "   <td>" +
                        "       <input id='PC-db-CA" + gcIndex + "' type='text' readonly>" +
                        "       <input id='PC-db-CGAW" + gcIndex + "' type='hidden' name='cgaWeek" + gcIndex + "'>" +
                        "       <input id='PC-db-CGAD" + gcIndex + "' type='hidden' name='cgaDay" + gcIndex + "'>" +
                        "       <input id='PC-db-CAM" + gcIndex + "' type='hidden' name='correctedAgeMonth" + gcIndex + "'>" +
                        "       <input id='PC-db-CAD" + gcIndex + "' type='hidden' name='correctedAgeDay" + gcIndex + "'>" +
                        "   </td>" +
                        "   <td>" +
                        "       <select name='gmfcsResult" + gcIndex + "' lay-reqText='请选择GMFCS结果！' lay-verify='required'>" +
                        "           <option value=''>请选择GMFCS结果</option>" +
                        "           <option value='正常'>正常</option>" +
                        "           <option value='1级'>1级</option>" +
                        "           <option value='2级'>2级</option>" +
                        "           <option value='3级'>3级</option>" +
                        "           <option value='4级'>4级</option>" +
                        "           <option value='5级'>5级</option>" +
                        "       </select>" +
                        "   </td>" +
                        "   <td>" +
                        "       <select name='sitAlone" + gcIndex + "' lay-reqText='请选择独坐情况！' lay-verify='required'>" +
                        "           <option value=''>请选择独坐情况</option>" +
                        "           <option value='是'>是</option>" +
                        "           <option value='需要支持可以独坐'>需要支持可以独坐</option>" +
                        "           <option value='有支持也不能独坐'>有支持也不能独坐</option>" +
                        "       </select>" +
                        "   </td>" +
                        "   <td>" +
                        "       <select name='tenStepsAlone" + gcIndex + "' lay-reqText='请选择独走10步情况！' lay-verify='required'>" +
                        "           <option value=''>请选择独走10步情况</option>" +
                        "           <option value='是'>是</option>" +
                        "           <option value='有支持可以走10步'>有支持可以走10步</option>" +
                        "           <option value='有支持也不能走10步'>有支持也不能走10步</option>" +
                        "       </select>" +
                        "   </td>" +
                        "   <td>" +
                        "       <select name='cerebralPalsy" + gcIndex + "' lay-reqText='请选择脑瘫情况！' lay-verify='required'>" +
                        "           <option value=''>请选择脑瘫情况</option>" +
                        "           <option value='否'>否</option>" +
                        "           <option value='双侧瘫痪'>双侧瘫痪</option>" +
                        "           <option value='偏瘫'>偏瘫</option>" +
                        "           <option value='四肢瘫痪'>四肢瘫痪</option>" +
                        "       </select>" +
                        "   </td>" +
                        "   <td>" +
                        "       <select name='cerebralPalsyTendency" + gcIndex + "' lay-reqText='请选择脑性瘫痪倾向！' lay-verify='required'>" +
                        "           <option value=''>请选择脑性瘫痪倾向</option>" +
                        "           <option value='否'>否</option>" +
                        "           <option value='运动发育正常'>运动发育正常</option>" +
                        "           <option value='异常，肌张力异常'>异常，肌张力异常</option>" +
                        "           <option value='异常，姿势正常'>异常，姿势正常</option>" +
                        "           <option value='异常，神经反射正常'>异常，神经反射正常</option>" +
                        "           <option value='正常'>正常</option>" +
                        "       </select>" +
                        "   </td>" +
                        "   <td>" +
                        "       <button id='PC-db-gcDelete" + gcIndex + "' class='pc-btn pc-btn-danger'><i class='iconfont icon-delete'></i></button>" +
                        "   </td>" +
                        "</tr>");
                }, function () {
                    form.render("select");
                }, function () {
                    const thisGcIndex = gcIndex;
                    laydate.render({
                        elem: "#PC-db-GCD" + thisGcIndex,
                        type: "date",
                        format: "yyyy-MM-dd",
                        min: cga40WeekDateStamp,
                        max: 0,
                        done: function (value) {
                            if (value !== "") {
                                // 计算 矫正年龄
                                computeCa(birthdayStamp, gestationalAgeWeek, gestationalAgeDay, cga40WeekDateStamp, thisGcIndex, value);
                            }
                        }
                    });
                    // 计算 GMFCS 次数
                    const gcTimes = $(".pc-db-FDDLGM .pc-db-table>tbody>tr").length - 1;
                    $("#PC-db-GCN").val(gcTimes);
                    // 删除 GMFCS 行
                    $("#PC-db-gcDelete" + thisGcIndex).on("click", function () {
                        const that = this;
                        layer.msg("确定要 <span class='pc-db-status-color-no'>删除</span> 此条GMFCS信息吗?", {
                            icon: 7,
                            time: 0,
                            anim: 6,
                            btn: ["确定", "取消"],
                            resize: false,
                            shade: 0.8,
                            yes: function (index) {
                                $(that).parents("tr").remove();
                                // 计算 GMFCS 次数
                                const gcTimes = $(".pc-db-FDDLGM .pc-db-table>tbody>tr").length - 1;
                                $("#PC-db-GCN").val(gcTimes);
                                layer.close(index);
                            }
                        });
                    });
                });
            });

            // 随访数据库 发育水平 GMFCS 添加/编辑 信息 提交
            form.on("submit(DLGM)", function (data) {
                const doing = "保存信息";
                loading(doing);
                let field = data.field, gcArray = [];
                for (let i = 1; i <= gcIndex; i++) {
                    if (notNullTool(field["gmfcsCheckDate" + i])) {
                        gcArray.push({
                            gmfcsCheckDate: field["gmfcsCheckDate" + i],
                            cgaWeek: field["cgaWeek" + i],
                            cgaDay: field["cgaDay" + i],
                            correctedAgeMonth: field["correctedAgeMonth" + i],
                            correctedAgeDay: field["correctedAgeDay" + i],
                            gmfcsResult: field["gmfcsResult" + i],
                            sitAlone: field["sitAlone" + i],
                            tenStepsAlone: field["tenStepsAlone" + i],
                            cerebralPalsy: field["cerebralPalsy" + i],
                            cerebralPalsyTendency: field["cerebralPalsyTendency" + i]
                        });
                        delete field["gmfcsCheckDate" + i];
                        delete field["cgaWeek" + i];
                        delete field["cgaDay" + i];
                        delete field["correctedAgeMonth" + i];
                        delete field["correctedAgeDay" + i];
                        delete field["gmfcsResult" + i];
                        delete field["sitAlone" + i];
                        delete field["tenStepsAlone" + i];
                        delete field["cerebralPalsy" + i];
                        delete field["cerebralPalsyTendency" + i];
                    }
                }
                field.gcArray = JSON.stringify(gcArray);
                $.post("/perinatalPlatform/followDatabase/write/DL/GM/post", field, function (back, status) {
                    if(status === "success") {
                        if(back.code) {
                            successNext();
                        }else {failMsg(doing)}
                    }else {errorMsg1()}
                }, "json").fail(function () {errorMsg2()});
            });
        }

        // 随访数据库 发育水平 CBCL量表
        if ($(".pc-db-FDDLCB").length > 0) {
            let ccIndex = 0;
            // 初始化 CBCL量表
            const ccIndexInput = $(".pc-db-FDDLCB .pc-db-table>tbody").attr("data-num");
            if (notNullTool(ccIndexInput)) {
                ccIndex = parseInt(ccIndexInput);
                // 为 日期 选择 初始化
                for (let i = 1; i <= ccIndex; i++) {
                    const thisCcIndex = i;
                    // 计算 矫正年龄
                    computeCa(birthdayStamp, gestationalAgeWeek, gestationalAgeDay, cga40WeekDateStamp, thisCcIndex, $("#PC-db-CCD" + thisCcIndex).val());
                    laydate.render({
                        elem: "#PC-db-CCD" + thisCcIndex,
                        type: "date",
                        format: "yyyy-MM-dd",
                        min: cga40WeekDateStamp,
                        max: 0,
                        done: function (value) {
                            if (value !== "") {
                                // 计算 矫正年龄
                                computeCa(birthdayStamp, gestationalAgeWeek, gestationalAgeDay, cga40WeekDateStamp, thisCcIndex, value);
                            }
                        }
                    });
                    // 计算 总的问题
                    $(".pc-db-cbs").on("focusout", function () {
                        const cbsElem = $(this).parents("tr").find(".pc-db-cbs");
                        let isOk = true, totalScore = 0;
                        for (let i = 0; i < cbsElem.length; i ++) {
                            const scoreInput = $(cbsElem[i]).val();
                            if (notNullTool(scoreInput)) {
                                if (i === 6) {
                                    totalScore += 2 * parseInt(scoreInput);
                                } else {
                                    totalScore += parseInt(scoreInput);
                                }
                            } else {
                                isOk = false;
                            }
                        }
                        if (isOk) {
                            $("#PC-db-GP" + thisCcIndex).val(totalScore);
                        }
                    });
                    // 删除 CBCL量表 行
                    $("#PC-db-ccDelete" + thisCcIndex).on("click", function () {
                        const that = this;
                        layer.msg("确定要 <span class='pc-db-status-color-no'>删除</span> 此条CBCL量表信息吗?", {
                            icon: 7,
                            time: 0,
                            anim: 6,
                            btn: ["确定", "取消"],
                            resize: false,
                            shade: 0.8,
                            yes: function (index) {
                                $(that).parents("tr").remove();
                                // 计算 CBCL量表 次数
                                const ccTimes = $(".pc-db-FDDLCB .pc-db-table>tbody>tr").length - 1;
                                $("#PC-db-CCN").val(ccTimes);
                                layer.close(index);
                            }
                        });
                    });
                }
            }
            // 增加 CBCL量表
            $("#PC-db-addCC").on("click", function () {
                const that = this;
                ccIndex++;
                sequentialExecution(function () {
                    $(that).parents("tr").before(
                        "<tr>" +
                        "   <td>" +
                        "       <input id='PC-db-CCD" + ccIndex + "' type='text' name='cbclCheckDate" + ccIndex + "' lay-verify='required' placeholder='请选择检查日期' lay-reqText='请选择检查日期！' readonly>" +
                        "   </td>" +
                        "   <td>" +
                        "       <input id='PC-db-CA" + ccIndex + "' type='text' readonly>" +
                        "       <input id='PC-db-CGAW" + ccIndex + "' type='hidden' name='cgaWeek" + ccIndex + "'>" +
                        "       <input id='PC-db-CGAD" + ccIndex + "' type='hidden' name='cgaDay" + ccIndex + "'>" +
                        "       <input id='PC-db-CAM" + ccIndex + "' type='hidden' name='correctedAgeMonth" + ccIndex + "'>" +
                        "       <input id='PC-db-CAD" + ccIndex + "' type='hidden' name='correctedAgeDay" + ccIndex + "'>" +
                        "   </td>" +
                        "   <td>" +
                        "       <input class='pc-db-cbs' type='number' name='emotionalResponse" + ccIndex + "' lay-verify='required' placeholder='请填写情感反应' lay-reqText='请填写情感反应！'>" +
                        "   </td>" +
                        "   <td>" +
                        "       <input class='pc-db-cbs' type='number' name='anxietyDepression" + ccIndex + "' lay-verify='required' placeholder='请填写焦虑抑郁' lay-reqText='请填写焦虑抑郁！'>" +
                        "   </td>" +
                        "   <td>" +
                        "       <input class='pc-db-cbs' type='number' name='somaticComplaints" + ccIndex + "' lay-verify='required' placeholder='请填写躯体主诉' lay-reqText='请填写躯体主诉！'>" +
                        "   </td>" +
                        "   <td>" +
                        "       <input class='pc-db-cbs' type='number' name='backOff" + ccIndex + "' lay-verify='required' placeholder='请填写退缩' lay-reqText='请填写退缩！'>" +
                        "   </td>" +
                        "   <td>" +
                        "       <input class='pc-db-cbs' type='number' name='sleepProblems" + ccIndex + "' lay-verify='required' placeholder='请填写睡眠问题' lay-reqText='请填写睡眠问题！'>" +
                        "   </td>" +
                        "   <td>" +
                        "       <input class='pc-db-cbs' type='number' name='aggressiveBehavior" + ccIndex + "' lay-verify='required' placeholder='请填写攻击行为' lay-reqText='请填写攻击行为！'>" +
                        "   </td>" +
                        "   <td>" +
                        "       <input class='pc-db-cbs' type='number' name='attentionProblem" + ccIndex + "' lay-verify='required' placeholder='请填写注意问题' lay-reqText='请填写注意问题！'>" +
                        "   </td>" +
                        "   <td>" +
                        "       <input class='pc-db-cbs' type='number' name='internalizationProblem" + ccIndex + "' lay-verify='required' placeholder='请填写内同化问题' lay-reqText='请填写内同化问题！'>" +
                        "   </td>" +
                        "   <td>" +
                        "       <input class='pc-db-cbs' type='number' name='externalAssimilationProblem" + ccIndex + "' lay-verify='required' placeholder='请填写外同化问题' lay-reqText='请填写外同化问题！'>" +
                        "   </td>" +
                        "   <td>" +
                        "       <input id='PC-db-GP" + ccIndex + "' type='number' name='generalProblem" + ccIndex + "' lay-verify='required' readonly>" +
                        "   </td>" +
                        "   <td>" +
                        "       <button id='PC-db-ccDelete" + ccIndex + "' class='pc-btn pc-btn-danger'><i class='iconfont icon-delete'></i></button>" +
                        "   </td>" +
                        "</tr>");
                }, function () {
                    const thisCcIndex = ccIndex;
                    laydate.render({
                        elem: "#PC-db-CCD" + thisCcIndex,
                        type: "date",
                        format: "yyyy-MM-dd",
                        min: cga40WeekDateStamp,
                        max: 0,
                        done: function (value) {
                            if (value !== "") {
                                // 计算 矫正年龄
                                computeCa(birthdayStamp, gestationalAgeWeek, gestationalAgeDay, cga40WeekDateStamp, thisCcIndex, value);
                            }
                        }
                    });
                    // 计算 总的问题
                    $(".pc-db-cbs").on("focusout", function () {
                        const cbsElem = $(this).parents("tr").find(".pc-db-cbs");
                        let isOk = true, totalScore = 0;
                        for (let i = 0; i < cbsElem.length; i ++) {
                            const scoreInput = $(cbsElem[i]).val();
                            if (notNullTool(scoreInput)) {
                                if (i === 6) {
                                    totalScore += 2 * parseInt(scoreInput);
                                } else {
                                    totalScore += parseInt(scoreInput);
                                }
                            } else {
                                isOk = false;
                            }
                        }
                        if (isOk) {
                            $("#PC-db-GP" + thisCcIndex).val(totalScore);
                        }
                    });
                    // 计算 CBCL检查 次数
                    const ccTimes = $(".pc-db-FDDLCB .pc-db-table>tbody>tr").length - 1;
                    $("#PC-db-CCN").val(ccTimes);
                    // 删除 CBCL检查 行
                    $("#PC-db-ccDelete" + thisCcIndex).on("click", function () {
                        const that = this;
                        layer.msg("确定要 <span class='pc-db-status-color-no'>删除</span> 此条CBCL量表信息吗?", {
                            icon: 7,
                            time: 0,
                            anim: 6,
                            btn: ["确定", "取消"],
                            resize: false,
                            shade: 0.8,
                            yes: function (index) {
                                $(that).parents("tr").remove();
                                // 计算 CBCL检查 次数
                                const ccTimes = $(".pc-db-FDDLCB .pc-db-table>tbody>tr").length - 1;
                                $("#PC-db-CCN").val(ccTimes);
                                layer.close(index);
                            }
                        });
                    });
                });
            });

            // 随访数据库 发育水平 CBCL量表 添加/编辑 信息 提交
            form.on("submit(DLCB)", function (data) {
                const doing = "保存信息";
                loading(doing);
                let field = data.field, ccArray = [];
                for (let i = 1; i <= ccIndex; i++) {
                    if (notNullTool(field["cbclCheckDate" + i])) {
                        ccArray.push({
                            cbclCheckDate: field["cbclCheckDate" + i],
                            cgaWeek: field["cgaWeek" + i],
                            cgaDay: field["cgaDay" + i],
                            correctedAgeMonth: field["correctedAgeMonth" + i],
                            correctedAgeDay: field["correctedAgeDay" + i],
                            emotionalResponse: field["emotionalResponse" + i],
                            anxietyDepression: field["anxietyDepression" + i],
                            somaticComplaints: field["somaticComplaints" + i],
                            backOff: field["backOff" + i],
                            sleepProblems: field["sleepProblems" + i],
                            aggressiveBehavior: field["aggressiveBehavior" + i],
                            attentionProblem: field["attentionProblem" + i],
                            internalizationProblem: field["internalizationProblem" + i],
                            externalAssimilationProblem: field["externalAssimilationProblem" + i],
                            generalProblem: field["generalProblem" + i]
                        });
                        delete field["cbclCheckDate" + i];
                        delete field["cgaWeek" + i];
                        delete field["cgaDay" + i];
                        delete field["correctedAgeMonth" + i];
                        delete field["correctedAgeDay" + i];
                        delete field["emotionalResponse" + i];
                        delete field["anxietyDepression" + i];
                        delete field["somaticComplaints" + i];
                        delete field["backOff" + i];
                        delete field["sleepProblems" + i];
                        delete field["aggressiveBehavior" + i];
                        delete field["attentionProblem" + i];
                        delete field["internalizationProblem" + i];
                        delete field["externalAssimilationProblem" + i];
                        delete field["generalProblem" + i];
                    }
                }
                field.ccArray = JSON.stringify(ccArray);
                $.post("/perinatalPlatform/followDatabase/write/DL/CB/post", field, function (back, status) {
                    if(status === "success") {
                        if(back.code) {
                            successNext();
                        }else {failMsg(doing)}
                    }else {errorMsg1()}
                }, "json").fail(function () {errorMsg2()});
            });
        }

        // 随访数据库 成长历程 门诊就诊
        if ($(".pc-db-FDGPOV").length > 0) {
            let ovIndex = 0;
            // 初始化 门诊就诊
            const ovIndexInput = $(".pc-db-FDGPOV .pc-db-table>tbody").attr("data-num");
            if (notNullTool(ovIndexInput)) {
                ovIndex = parseInt(ovIndexInput);
                // 为 日期 选择 初始化
                for (let i = 1; i <= ovIndex; i++) {
                    const thisOvIndex = i;
                    // 计算 矫正年龄
                    computeCa(birthdayStamp, gestationalAgeWeek, gestationalAgeDay, cga40WeekDateStamp, thisOvIndex, $("#PC-db-VD" + thisOvIndex).val());
                    laydate.render({
                        elem: "#PC-db-VD" + thisOvIndex,
                        type: "date",
                        format: "yyyy-MM-dd",
                        min: cga40WeekDateStamp,
                        max: 0,
                        done: function (value) {
                            if (value !== "") {
                                // 计算 矫正年龄
                                computeCa(birthdayStamp, gestationalAgeWeek, gestationalAgeDay, cga40WeekDateStamp, thisOvIndex, value);
                            }
                        }
                    });
                    // 删除 门诊就诊 行
                    $("#PC-db-ovDelete" + thisOvIndex).on("click", function () {
                        const that = this;
                        layer.msg("确定要 <span class='pc-db-status-color-no'>删除</span> 此条就诊信息吗?", {
                            icon: 7,
                            time: 0,
                            anim: 6,
                            btn: ["确定", "取消"],
                            resize: false,
                            shade: 0.8,
                            yes: function (index) {
                                $(that).parents("tr").remove();
                                // 计算 门诊就诊 次数
                                const ovTimes = $(".pc-db-FDGPOV .pc-db-table>tbody>tr").length - 1;
                                $("#PC-db-VN").val(ovTimes);
                                layer.close(index);
                            }
                        });
                    });
                }
            }
            // 增加 门诊就诊
            $("#PC-db-addOV").on("click", function () {
                const that = this;
                ovIndex++;
                sequentialExecution(function () {
                    $(that).parents("tr").before(
                        "<tr>" +
                        "   <td>" +
                        "       <input id='PC-db-VD" + ovIndex + "' type='text' name='visitDate" + ovIndex + "' lay-verify='required' placeholder='请选择就诊日期' lay-reqText='请选择就诊日期！' readonly>" +
                        "   </td>" +
                        "   <td>" +
                        "       <input id='PC-db-CA" + ovIndex + "' type='text' readonly>" +
                        "       <input id='PC-db-CGAW" + ovIndex + "' type='hidden' name='cgaWeek" + ovIndex + "'>" +
                        "       <input id='PC-db-CGAD" + ovIndex + "' type='hidden' name='cgaDay" + ovIndex + "'>" +
                        "       <input id='PC-db-CAM" + ovIndex + "' type='hidden' name='correctedAgeMonth" + ovIndex + "'>" +
                        "       <input id='PC-db-CAD" + ovIndex + "' type='hidden' name='correctedAgeDay" + ovIndex + "'>" +
                        "   </td>" +
                        "   <td>" +
                        "       <select name='visitReason" + ovIndex + "' lay-reqText='请选择就诊原因！' lay-verify='required'>" +
                        "           <option value=''>请选择就诊原因</option>" +
                        "           <option value='呼吸道疾病'>呼吸道疾病</option>" +
                        "           <option value='胃肠消化疾病'>胃肠消化疾病</option>" +
                        "           <option value='感染发热'>感染发热</option>" +
                        "           <option value='惊厥神经疾病'>惊厥神经疾病</option>" +
                        "           <option value='意外伤害'>意外伤害</option>" +
                        "           <option value='哭闹'>哭闹</option>" +
                        "           <option value='父母关切'>父母关切</option>" +
                        "           <option value='皮肤或皮疹'>皮肤或皮疹</option>" +
                        "       </select>" +
                        "   </td>" +
                        "   <td>" +
                        "       <input type='text' name='otherReasons" + ovIndex + "' placeholder='请填写其他原因'>" +
                        "   </td>" +
                        "   <td>" +
                        "       <input type='text' name='doctorAdvice" + ovIndex + "' placeholder='请填写医生建议'>" +
                        "   </td>" +
                        "   <td>" +
                        "       <button id='PC-db-ovDelete" + ovIndex + "' class='pc-btn pc-btn-danger'><i class='iconfont icon-delete'></i></button>" +
                        "   </td>" +
                        "</tr>");
                }, function () {
                    form.render("select");
                }, function () {
                    const thisOvIndex = ovIndex;
                    laydate.render({
                        elem: "#PC-db-VD" + thisOvIndex,
                        type: "date",
                        format: "yyyy-MM-dd",
                        min: cga40WeekDateStamp,
                        max: 0,
                        done: function (value) {
                            if (value !== "") {
                                // 计算 矫正年龄
                                computeCa(birthdayStamp, gestationalAgeWeek, gestationalAgeDay, cga40WeekDateStamp, thisOvIndex, value);
                            }
                        }
                    });
                    // 计算 门诊就诊 次数
                    const ovTimes = $(".pc-db-FDGPOV .pc-db-table>tbody>tr").length - 1;
                    $("#PC-db-VN").val(ovTimes);
                    // 删除 门诊就诊 行
                    $("#PC-db-ovDelete" + thisOvIndex).on("click", function () {
                        const that = this;
                        layer.msg("确定要 <span class='pc-db-status-color-no'>删除</span> 此条就诊信息吗?", {
                            icon: 7,
                            time: 0,
                            anim: 6,
                            btn: ["确定", "取消"],
                            resize: false,
                            shade: 0.8,
                            yes: function (index) {
                                $(that).parents("tr").remove();
                                // 计算 门诊就诊 次数
                                const ovTimes = $(".pc-db-FDGPOV .pc-db-table>tbody>tr").length - 1;
                                $("#PC-db-VN").val(ovTimes);
                                layer.close(index);
                            }
                        });
                    });
                });
            });

            // 随访数据库 成长历程 门诊就诊 添加/编辑 信息 提交
            form.on("submit(GPOV)", function (data) {
                const doing = "保存信息";
                loading(doing);
                let field = data.field, ovArray = [];
                for (let i = 1; i <= ovIndex; i++) {
                    if (notNullTool(field["visitDate" + i])) {
                        ovArray.push({
                            visitDate: field["visitDate" + i],
                            cgaWeek: field["cgaWeek" + i],
                            cgaDay: field["cgaDay" + i],
                            correctedAgeMonth: field["correctedAgeMonth" + i],
                            correctedAgeDay: field["correctedAgeDay" + i],
                            visitReason: field["visitReason" + i],
                            otherReasons: field["otherReasons" + i],
                            doctorAdvice: field["doctorAdvice" + i]
                        });
                        delete field["visitDate" + i];
                        delete field["cgaWeek" + i];
                        delete field["cgaDay" + i];
                        delete field["correctedAgeMonth" + i];
                        delete field["correctedAgeDay" + i];
                        delete field["visitReason" + i];
                        delete field["otherReasons" + i];
                        delete field["doctorAdvice" + i];
                    }
                }
                field.ovArray = JSON.stringify(ovArray);
                $.post("/perinatalPlatform/followDatabase/write/GP/OV/post", field, function (back, status) {
                    if(status === "success") {
                        if(back.code) {
                            successNext();
                        }else {failMsg(doing)}
                    }else {errorMsg1()}
                }, "json").fail(function () {errorMsg2()});
            });
        }

        // 随访数据库 成长历程 住院治疗
        if ($(".pc-db-FDGPHT").length > 0) {
            let htIndex = 0;
            // 初始化 门诊就诊
            const htIndexInput = $(".pc-db-FDGPHT .pc-db-table>tbody").attr("data-num");
            if (notNullTool(htIndexInput)) {
                htIndex = parseInt(htIndexInput);
                // 为 日期 选择 初始化
                for (let i = 1; i <= htIndex; i++) {
                    const thisHtIndex = i;
                    // 计算 矫正年龄
                    computeCa(birthdayStamp, gestationalAgeWeek, gestationalAgeDay, cga40WeekDateStamp, thisHtIndex, $("#PC-db-HD" + thisHtIndex).val());
                    laydate.render({
                        elem: "#PC-db-HD" + thisHtIndex,
                        type: "date",
                        format: "yyyy-MM-dd",
                        min: cga40WeekDateStamp,
                        max: 0,
                        done: function (value) {
                            if (value !== "") {
                                // 计算 矫正年龄
                                computeCa(birthdayStamp, gestationalAgeWeek, gestationalAgeDay, cga40WeekDateStamp, thisHtIndex, value);
                            }
                        }
                    });
                    // 删除 住院治疗 行
                    $("#PC-db-htDelete" + thisHtIndex).on("click", function () {
                        const that = this;
                        layer.msg("确定要 <span class='pc-db-status-color-no'>删除</span> 此条住院信息吗?", {
                            icon: 7,
                            time: 0,
                            anim: 6,
                            btn: ["确定", "取消"],
                            resize: false,
                            shade: 0.8,
                            yes: function (index) {
                                $(that).parents("tr").remove();
                                // 计算 住院治疗 次数
                                const htTimes = $(".pc-db-FDGPHT .pc-db-table>tbody>tr").length - 1;
                                $("#PC-db-HN").val(htTimes);
                                layer.close(index);
                            }
                        });
                    });
                }
            }
            // 增加 门诊就诊
            $("#PC-db-addHT").on("click", function () {
                const that = this;
                htIndex++;
                sequentialExecution(function () {
                    $(that).parents("tr").before(
                        "<tr>" +
                        "   <td>" +
                        "       <input id='PC-db-HD" + htIndex + "' type='text' name='hospitalizationDate" + htIndex + "' lay-verify='required' placeholder='请选择住院日期' lay-reqText='请选择住院日期！' readonly>" +
                        "   </td>" +
                        "   <td>" +
                        "       <input id='PC-db-CA" + htIndex + "' type='text' readonly>" +
                        "       <input id='PC-db-CGAW" + htIndex + "' type='hidden' name='cgaWeek" + htIndex + "'>" +
                        "       <input id='PC-db-CGAD" + htIndex + "' type='hidden' name='cgaDay" + htIndex + "'>" +
                        "       <input id='PC-db-CAM" + htIndex + "' type='hidden' name='correctedAgeMonth" + htIndex + "'>" +
                        "       <input id='PC-db-CAD" + htIndex + "' type='hidden' name='correctedAgeDay" + htIndex + "'>" +
                        "   </td>" +
                        "   <td>" +
                        "       <select name='hospitalizationReason" + htIndex + "' lay-reqText='请选择住院原因！' lay-verify='required'>" +
                        "           <option value=''>请选择住院原因</option>" +
                        "           <option value='呼吸道疾病'>呼吸道疾病</option>" +
                        "           <option value='胃肠消化疾病'>胃肠消化疾病</option>" +
                        "           <option value='感染发热'>感染发热</option>" +
                        "           <option value='惊厥神经疾病'>惊厥神经疾病</option>" +
                        "           <option value='意外伤害'>意外伤害</option>" +
                        "           <option value='哭闹'>哭闹</option>" +
                        "           <option value='父母关切'>父母关切</option>" +
                        "           <option value='皮肤或皮疹'>皮肤或皮疹</option>" +
                        "       </select>" +
                        "   </td>" +
                        "   <td>" +
                        "       <input type='text' name='otherReasons" + htIndex + "' placeholder='请填写其他原因'>" +
                        "   </td>" +
                        "   <td>" +
                        "       <input type='text' name='doctorAdvice" + htIndex + "' placeholder='请填写医生建议'>" +
                        "   </td>" +
                        "   <td>" +
                        "       <button id='PC-db-htDelete" + htIndex + "' class='pc-btn pc-btn-danger'><i class='iconfont icon-delete'></i></button>" +
                        "   </td>" +
                        "</tr>");
                }, function () {
                    form.render("select");
                }, function () {
                    const thisHtIndex = htIndex;
                    laydate.render({
                        elem: "#PC-db-HD" + thisHtIndex,
                        type: "date",
                        format: "yyyy-MM-dd",
                        min: cga40WeekDateStamp,
                        max: 0,
                        done: function (value) {
                            if (value !== "") {
                                // 计算 矫正年龄
                                computeCa(birthdayStamp, gestationalAgeWeek, gestationalAgeDay, cga40WeekDateStamp, thisHtIndex, value);
                            }
                        }
                    });
                    // 计算 住院治疗 次数
                    const htTimes = $(".pc-db-FDGPHT .pc-db-table>tbody>tr").length - 1;
                    $("#PC-db-HN").val(htTimes);
                    // 删除 住院治疗 行
                    $("#PC-db-htDelete" + thisHtIndex).on("click", function () {
                        const that = this;
                        layer.msg("确定要 <span class='pc-db-status-color-no'>删除</span> 此条住院信息吗?", {
                            icon: 7,
                            time: 0,
                            anim: 6,
                            btn: ["确定", "取消"],
                            resize: false,
                            shade: 0.8,
                            yes: function (index) {
                                $(that).parents("tr").remove();
                                // 计算 住院治疗 次数
                                const htTimes = $(".pc-db-FDGPHT .pc-db-table>tbody>tr").length - 1;
                                $("#PC-db-HN").val(htTimes);
                                layer.close(index);
                            }
                        });
                    });
                });
            });

            // 随访数据库 成长历程 住院治疗 添加/编辑 信息 提交
            form.on("submit(GPHT)", function (data) {
                const doing = "保存信息";
                loading(doing);
                let field = data.field, htArray = [];
                for (let i = 1; i <= htIndex; i++) {
                    if (notNullTool(field["hospitalizationDate" + i])) {
                        htArray.push({
                            hospitalizationDate: field["hospitalizationDate" + i],
                            cgaWeek: field["cgaWeek" + i],
                            cgaDay: field["cgaDay" + i],
                            correctedAgeMonth: field["correctedAgeMonth" + i],
                            correctedAgeDay: field["correctedAgeDay" + i],
                            hospitalizationReason: field["hospitalizationReason" + i],
                            otherReasons: field["otherReasons" + i],
                            doctorAdvice: field["doctorAdvice" + i]
                        });
                        delete field["hospitalizationDate" + i];
                        delete field["cgaWeek" + i];
                        delete field["cgaDay" + i];
                        delete field["correctedAgeMonth" + i];
                        delete field["correctedAgeDay" + i];
                        delete field["hospitalizationReason" + i];
                        delete field["otherReasons" + i];
                        delete field["doctorAdvice" + i];
                    }
                }
                field.htArray = JSON.stringify(htArray);
                $.post("/perinatalPlatform/followDatabase/write/GP/HT/post", field, function (back, status) {
                    if(status === "success") {
                        if(back.code) {
                            successNext();
                        }else {failMsg(doing)}
                    }else {errorMsg1()}
                }, "json").fail(function () {errorMsg2()});
            });
        }

        // 随访数据库 成长历程 随访计划、疾病防治 点击 设置 完成/未完成
        $(".pc-db-FDGPFP .pc-db-require, .pc-db-FDGPDC .pc-db-require").on("click", function () {
            if ($(this).hasClass("pc-db-success")) {
                if ($(this).hasClass("pc-db-fail")) {
                    $(this).removeClass("pc-db-success pc-db-fail")
                } else {
                    $(this).addClass("pc-db-fail");
                }
            } else {
                $(this).addClass("pc-db-success");
            }
        });

        // 随访数据库 成长历程 随访计划
        if ($(".pc-db-FDGPFP").length > 0) {
            const correctedAge = ["cga40w", "1m", "3m", "6m", "9m", "12m", "18m", "24m", "30m", "36m", "4y", "5y", "6y"],
                followUpContent = ["physicalExamination", "feedingGuidance", "motorDevelopment", "rop", "hearing",
                    "vision", "bloodHgb", "bloodChemistry", "bloodThyroidFunction", "lungFunction", "cranialMri",
                    "cognitiveDevelopmentAssessment", "grandSportGrading", "readmission", "iron", "vitaminD3",
                    "vitaminAd"];

            // 获取 成长历程 随访计划 数据
            $.get("/perinatalPlatform/followDatabase/write/GP/FP/data", function (back, status) {
                if(status === "success") {
                    if (back.code) {
                        const followUpPlanList = back.followUpPlanList;
                        for (let i = 0; i < followUpPlanList.length; i++) {
                            const followUpPlan = followUpPlanList[i],
                                fpCa = followUpPlan.correctedAge,
                                x = correctedAge.indexOf(fpCa);
                            for (const fpType in followUpPlan) {
                                const fpTypeVal = followUpPlan[fpType],
                                    y = followUpContent.indexOf(fpType);
                                if (y > -1) {
                                    const tdElem = $(".pc-db-FDGPFP .pc-db-table>tbody>tr:eq(" + y + ")>td:eq(" + (x + 1) + ")");
                                    if (fpTypeVal == 1) {
                                        $(tdElem).addClass("pc-db-success");
                                    } else if (fpTypeVal == 2) {
                                        $(tdElem).addClass("pc-db-success pc-db-fail");
                                    }
                                }
                            }
                        }
                    }
                }
            }, "json");

            // 随访数据库 成长历程 随访计划 添加/编辑 信息 提交
            form.on("submit(GPFP)", function () {
                const doing = "保存信息";
                loading(doing);
                let fpArray = [], field = {};
                for (let i = 0; i < 13; i++) {
                    let fpJson = {
                        correctedAge: correctedAge[i]
                    };
                    for (let j = 0; j < 17; j++) {
                        const tdElem = $(".pc-db-FDGPFP .pc-db-table>tbody>tr:eq(" + j + ")>td:eq(" + (i + 1) + ")");
                        if ($(tdElem).hasClass("pc-db-fail")) {
                            fpJson[followUpContent[j]] = 2;
                        } else if ($(tdElem).hasClass("pc-db-success")) {
                            fpJson[followUpContent[j]] = 1;
                        } else if ($(tdElem).hasClass("pc-db-require")) {
                            fpJson[followUpContent[j]] = 0;
                        }
                    }
                    fpArray.push(fpJson);
                }
                field.fpArray = JSON.stringify(fpArray);
                $.post("/perinatalPlatform/followDatabase/write/GP/FP/post", field, function (back, status) {
                    if(status === "success") {
                        if(back.code) {
                            successNext();
                        }else {failMsg(doing)}
                    }else {errorMsg1()}
                }, "json").fail(function () {errorMsg2()});
            });
        }

        // 随访数据库 成长历程 疾病防治
        if ($(".pc-db-FDGPDC").length > 0) {
            const correctedAge = ["cga40w", "1m", "3m", "6m", "9m", "12m", "18m", "24m", "30m", "36m", "4y", "5y", "6y"],
                diseaseControlContent = ["anemia", "malnutrition", "rickets", "metabolicBoneDisease", "lungFunction",
                    "leukomalacia", "hearingImpairment", "visualImpairment", "cerebralPalsy", "motorDevelopmentalDelay", "languageDelay",
                    "cognitiveDelay", "psychobehavioralProblems"];

            // 获取 成长历程 疾病防治 数据
            $.get("/perinatalPlatform/followDatabase/write/GP/DC/data", function (back, status) {
                if(status === "success") {
                    if (back.code) {
                        const diseaseControlList = back.diseaseControlList;
                        for (let i = 0; i < diseaseControlList.length; i++) {
                            const diseaseControl = diseaseControlList[i],
                                dcCa = diseaseControl.correctedAge,
                                x = correctedAge.indexOf(dcCa);
                            for (const dcType in diseaseControl) {
                                const dcTypeVal = diseaseControl[dcType],
                                    y = diseaseControlContent.indexOf(dcType);
                                if (y > -1) {
                                    const tdElem = $(".pc-db-FDGPDC .pc-db-table>tbody>tr:eq(" + y + ")>td:eq(" + (x + 1) + ")");
                                    if (dcTypeVal == 1) {
                                        $(tdElem).addClass("pc-db-success");
                                    } else if (dcTypeVal == 2) {
                                        $(tdElem).addClass("pc-db-success pc-db-fail");
                                    }
                                }
                            }
                        }
                    }
                }
            }, "json");

            // 随访数据库 成长历程 疾病防治 添加/编辑 信息 提交
            form.on("submit(GPDC)", function () {
                const doing = "保存信息";
                loading(doing);
                let dcArray = [], field = {};
                for (let i = 0; i < 13; i++) {
                    let dcJson = {
                        correctedAge: correctedAge[i]
                    };
                    for (let j = 0; j < 13; j++) {
                        const tdElem = $(".pc-db-FDGPDC .pc-db-table>tbody>tr:eq(" + j + ")>td:eq(" + (i + 1) + ")");
                        if ($(tdElem).hasClass("pc-db-fail")) {
                            dcJson[diseaseControlContent[j]] = 2;
                        } else if ($(tdElem).hasClass("pc-db-success")) {
                            dcJson[diseaseControlContent[j]] = 1;
                        } else if ($(tdElem).hasClass("pc-db-require")) {
                            dcJson[diseaseControlContent[j]] = 0;
                        }
                    }
                    dcArray.push(dcJson);
                }
                field.dcArray = JSON.stringify(dcArray);
                $.post("/perinatalPlatform/followDatabase/write/GP/DC/post", field, function (back, status) {
                    if(status === "success") {
                        if(back.code) {
                            successNext();
                        }else {failMsg(doing)}
                    }else {errorMsg1()}
                }, "json").fail(function () {errorMsg2()});
            });
        }

        // 研究数据库 审核 信息 提交
        form.on("submit(saveReview)", function (data) {
            const doing = "保存审核";
            loading(doing);
            $.post("/perinatalPlatform/followDatabase/review/post", data.field, function (back, status) {
                if(status === "success") {
                    if(back.code) {
                        successMsg("保存审核成功！", function () {
                            location.reload();
                        });
                    }else {failMsg(doing)}
                }else {errorMsg1()}
            },"json").fail(function () {errorMsg2()});
        });
    });
});