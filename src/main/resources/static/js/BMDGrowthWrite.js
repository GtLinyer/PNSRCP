$(document).ready(function () {
    // 引入 layui
    layui.use(["element", "form", "layer"], function () {
        let form = layui.form,
            layer = layui.layer;

        const elem = $(".pc-db-BDDGSGI, .pc-db-DPCGC"),
            birthdayInput = $(elem).attr("data-birthday"), childHospitalizationDateInput = $(elem).attr("data-chd"),
            genderInput = $(elem).attr("data-gender"), birthWeightInput = $(elem).attr("data-birthWeight"),
            gaWeekInput = $(elem).attr("data-gaWeek"), gaDayInput = $(elem).attr("data-gaDay"),
            labels = ["22", "23", "24", "25", "26", "27", "28", "29", "30", "31", "32", "33", "34", "35", "36", "37", "38", "39", "40", "41", "42", "43", "44", "45", "46", "47", "48", "49", "50"];
        let index = 15,
            birthday, birthdayStamp = 0, childHospitalizationDate, childHospitalizationDateStamp = 0, gender,
            birthWeight, gaWeek = 0, gaDay = 0,
            maxDateStamp, maxCgaWeek, maxCgaDay, allDate = [], allCgaWeek = [],
            weightChart, headCircumferenceChart, bodyLengthChart,
            weight3ChartData, weight10ChartData, weight50ChartData, weight90ChartData, weight97ChartData,
            weightRealChartData = [], weightChartJson,
            headCircumference3ChartData, headCircumference10ChartData, headCircumference50ChartData,
            headCircumference90ChartData, headCircumference97ChartData, headCircumferenceRealChartData = [],
            headCircumferenceChartJson,
            bodyLength3ChartData, bodyLength10ChartData, bodyLength50ChartData, bodyLength90ChartData,
            bodyLength97ChartData, bodyLengthRealChartData = [], bodyLengthChartJson;
        if (notNullTool(birthdayInput) && notNullTool(childHospitalizationDateInput) && notNullTool(genderInput) && notNullTool(gaWeekInput) && notNullTool(gaDayInput) && notNullTool(birthWeightInput)) {
            // 消化系统 生长指标 获取出生日期、住院日期、性别、胎龄
            birthday = birthdayInput;
            birthdayStamp = Date.parse(birthday);
            childHospitalizationDate = childHospitalizationDateInput;
            childHospitalizationDateStamp = Date.parse(childHospitalizationDate);
            gender = genderInput;
            birthWeight = parseFloat(birthWeightInput) / 1000;
            gaWeek = parseInt(gaWeekInput);
            gaDay = parseInt(gaDayInput);

            // 矫正胎龄
            const beforeHospitalDay = (childHospitalizationDateStamp - birthdayStamp) / 86400000,
                cgAllDay = gaWeek * 7 + gaDay + beforeHospitalDay,
                cgaWeek = Math.floor(cgAllDay / 7),
                cgaDay = cgAllDay % 7;

            // 14天
            let gi14DateTdElem = "", thisDateStamp = childHospitalizationDateStamp, thisCgaWeek = cgaWeek,
                thisCgaDay = cgaDay;
            for (let i = 0; i < 14; i++) {
                // 14天 日期
                const thisDate = new Date(thisDateStamp),
                    thisDateString = (thisDate.getFullYear() % 100) + "/" + (thisDate.getMonth() + 1) + "/" + thisDate.getDate();
                allDate[i] = dateFormatDay(thisDate);
                gi14DateTdElem += "<th>" + thisDateString + "</th>";
                thisDateStamp += 86400000;

                // 14天 胎龄
                if (thisCgaDay === 7) {
                    thisCgaDay = 0;
                    thisCgaWeek++;
                }
                allCgaWeek[i] = thisCgaWeek;
                $(".pc-db-BDDGSGI .pc-db-table.tableRight>tbody>tr.pc-db-cgaWeek>td>input[name=cgaWeek" + (i + 1) + "]," +
                    ".pc-db-DPCGC .pc-db-table.tableRight>tbody>tr.pc-db-cgaWeek>td>input[name=cgaWeek" + (i + 1) + "]").val(thisCgaWeek);
                $(".pc-db-BDDGSGI .pc-db-table.tableRight>tbody>tr.pc-db-cgaDay>td>input[name=cgaDay" + (i + 1) + "]," +
                    ".pc-db-DPCGC .pc-db-table.tableRight>tbody>tr.pc-db-cgaDay>td>input[name=cgaDay" + (i + 1) + "]").val(thisCgaDay);
                thisCgaDay++;
            }
            maxDateStamp = thisDateStamp;
            $(".pc-db-BDDGSGI .pc-db-table.tableRight>thead>tr>.blockTh," +
                ".pc-db-DPCGC .pc-db-table.tableRight>thead>tr>.blockTh").before(gi14DateTdElem);
            maxCgaWeek = thisCgaWeek;
            maxCgaDay = thisCgaDay;

            // Fenton 曲线图
            if (gender === "男") {
                weight3ChartData = [0.38, 0.422, 0.46, 0.482, 0.516, 0.57, 0.61, 0.69, 0.79, 0.9, 1.08, 1.25, 1.49, 1.69, 1.91, 2.13, 2.35, 2.54, 2.72, 2.92, 3.11, 3.3, 3.5, 3.7, 3.9, 4.08, 4.29, 4.47, 4.65];
                weight10ChartData = [0.418, 0.468, 0.516, 0.568, 0.627, 0.7, 0.781, 0.874, 0.99, 1.124, 1.3, 1.5, 1.72, 1.96, 2.18, 2.39, 2.59, 2.8, 2.98, 3.19, 3.39, 3.6, 3.8, 4, 4.22, 4.42, 4.62, 4.8, 5];
                weight50ChartData = [0.495, 0.57, 0.65, 0.74, 0.841, 0.953, 1.079, 1.223, 1.388, 1.578, 1.79, 2.018, 2.255, 2.495, 2.73, 2.95, 3.16, 3.36, 3.57, 3.78, 4.01, 4.25, 4.49, 4.73, 4.97, 5.2, 5.41, 5.63, 5.83];
                weight90ChartData = [0.58, 0.681, 0.786, 0.908, 1.039, 1.19, 1.348, 1.536, 1.75, 1.98, 2.23, 2.5, 2.766, 3.05, 3.29, 3.52, 3.75, 3.98, 4.19, 4.43, 4.7, 4.96, 5.25, 5.54, 5.82, 6.08, 6.3, 6.55, 6.8];
                weight97ChartData = [0.62, 0.731, 0.845, 0.979, 1.145, 1.3, 1.49, 1.68, 1.9, 2.18, 2.42, 2.71, 3, 3.3, 3.56, 3.8, 4.04, 4.3, 4.5, 4.76, 5.04, 5.35, 5.68, 5.96, 6.24, 6.5, 6.76, 7.03, 7.28];
                headCircumference3ChartData = [17.6, 18.4, 19.3, 20.2, 21.1, 22.1, 23, 23.9, 24.9, 25.8, 26.7, 27.5, 28.2, 29.1, 29.9, 30.6, 31.1, 31.8, 32.3, 33, 33.5, 34, 34.5, 35, 35.4, 35.9, 36.4, 36.8, 37.2];
                headCircumference10ChartData = [18.3, 19.21, 20.11, 21.1, 22, 22.9, 23.84, 24.8, 25.7, 26.6, 27.5, 28.4, 29.2, 30, 30.75, 31.4, 32.1, 32.7, 33.2, 33.75, 34.3, 34.8, 35.25, 35.7, 36.2, 36.6, 37.1, 37.5, 37.95];
                headCircumference50ChartData = [19.28, 20.76, 21.76, 22.72, 23.7, 24.67, 25.64, 26.6, 27.54, 28.46, 29.4, 30.26, 31.14, 31.93, 32.65, 33.33, 33.95, 34.5, 35.05, 35.55, 36.05, 36.5, 36.98, 37.4, 37.85, 38.25, 38.68, 39.1, 39.5];
                headCircumference90ChartData = [21.3, 22.3, 23.35, 24.36, 25.4, 26.4, 27.4, 28.4, 29.4, 30.34, 31.3, 32.2, 33, 33.8, 34.6, 35.2, 35.8, 36.4, 36.9, 37.35, 37.8, 38.25, 38.7, 39.1, 39.5, 39.9, 40.3, 40.65, 41.05];
                headCircumference97ChartData = [21.96, 23, 24.1, 25.2, 26.2, 27.2, 28.2, 29.3, 30.2, 31.2, 32.1, 33, 34, 34.8, 35.4, 36.1, 36.8, 37.3, 37.8, 38.2, 38.7, 39.1, 39.5, 39.8, 40.2, 40.7, 41, 41.4, 41.8];
                bodyLength3ChartData = [25, 26, 27.2, 28.3, 29.5, 30.7, 32, 33.2, 34.6, 36, 37.2, 38.6, 40, 41.2, 42.5, 43.9, 45, 46, 47, 47.9, 49, 49.9, 50.8, 51.7, 52.5, 53.3, 54.1, 54.9, 55.6];
                bodyLength10ChartData = [26, 27.2, 28.3, 29.65, 30.8, 32.1, 33.3, 34.7, 36, 37.4, 38.8, 40.1, 41.5, 42.8, 44, 45.2, 46.3, 47.3, 48.3, 49.2, 50.2, 51.1, 52, 52.9, 53.7, 54.5, 55.2, 56, 56.8];
                bodyLength50ChartData = [28.16, 29.51, 30.9, 32.3, 33.7, 35.1, 36.44, 37.8, 39.2, 40.6, 42, 43.4, 44.7, 46, 47.2, 48.25, 49.3, 50.25, 51.15, 52.05, 52.95, 53.8, 54.7, 55.5, 56.3, 57.1, 57.85, 58.6, 59.35];
                bodyLength90ChartData = [30.24, 31.9, 33.4, 35, 36.6, 38, 39.6, 41, 42.4, 43.9, 45.2, 46.7, 48, 49.2, 50.3, 51.3, 52.3, 53.2, 54, 54.9, 55.7, 56.6, 57.4, 58.2, 59, 59.7, 60.5, 61.2, 62];
                bodyLength97ChartData = [31.2, 32.9, 34.6, 36.2, 37.9, 39.5, 40.9, 42.3, 44, 45.2, 46.9, 48, 49.6, 50.8, 51.9, 52.8, 53.8, 54.7, 55.3, 56.2, 57, 57.9, 58.7, 59.3, 60.2, 61.1, 61.8, 62.4, 63.1];
            } else if (gender === "女") {
                weight3ChartData = [0.376, 0.4, 0.44, 0.472, 0.5, 0.52, 0.55, 0.6, 0.7, 0.82, 0.99, 1.18, 1.39, 1.6, 1.83, 2.04, 2.25, 2.42, 2.58, 2.72, 2.9, 3.05, 3.22, 3.39, 3.58, 3.71, 3.9, 4.04, 4.2];
                weight10ChartData = [0.405, 0.444, 0.486, 0.536, 0.59, 0.642, 0.712, 0.8, 0.9, 1.04, 1.2, 1.4, 1.62, 1.85, 2.07, 2.29, 2.49, 2.67, 2.82, 2.98, 3.15, 3.32, 3.51, 3.69, 3.88, 4.04, 4.22, 4.39, 4.55];
                weight50ChartData = [0.482, 0.537, 0.606, 0.694, 0.792, 0.899, 1.017, 1.152, 1.306, 1.482, 1.681, 1.897, 2.126, 2.36, 2.6, 2.83, 3.05, 3.24, 3.41, 3.6, 3.79, 3.99, 4.19, 4.4, 4.6, 4.8, 5, 5.18, 5.36];
                weight90ChartData = [0.573, 0.645, 0.74, 0.86, 0.99, 1.136, 1.3, 1.48, 1.69, 1.9, 2.15, 2.4, 2.67, 2.94, 3.2, 3.45, 3.7, 3.92, 4.1, 4.3, 4.52, 4.76, 5, 5.21, 5.47, 5.68, 5.9, 6.1, 6.3];
                weight97ChartData = [0.62, 0.7, 0.8, 0.928, 1.09, 1.24, 1.43, 1.61, 1.85, 2.1, 2.37, 2.64, 2.94, 3.22, 3.5, 3.79, 4.03, 4.28, 4.47, 4.69, 4.91, 5.16, 5.4, 5.64, 5.9, 6.12, 6.38, 6.6, 6.8];
                headCircumference3ChartData = [17.4, 18.2, 19, 19.9, 20.8, 21.6, 22.4, 23.3, 24.2, 25.1, 26, 27, 27.9, 28.6, 29.4, 30.2, 30.8, 31.5, 32.1, 32.7, 33.2, 33.7, 34.1, 34.5, 34.9, 35.3, 35.7, 36, 36.3];
                headCircumference10ChartData = [18.06, 18.9, 19.78, 20.67, 21.5, 22.4, 23.28, 24.2, 25.1, 26, 26.9, 27.84, 28.7, 29.6, 30.4, 31.1, 31.75, 32.4, 32.9, 33.5, 33.95, 34.4, 34.85, 35.25, 35.65, 36, 36.4, 36.7, 37.1];
                headCircumference50ChartData = [19.5, 20.4, 21.34, 22.26, 23.2, 24.14, 25.06, 26, 26.95, 27.9, 28.84, 29.76, 30.66, 31.48, 32.25, 32.95, 33.57, 34.15, 34.7, 35.2, 35.65, 36.1, 36.5, 36.9, 37.28, 37.65, 37.98, 38.32, 38.65];
                headCircumference90ChartData = [20.9, 21.9, 22.9, 23.9, 24.9, 25.84, 26.8, 27.8, 28.76, 29.8, 30.7, 31.7, 32.54, 33.4, 34.1, 34.8, 35.4, 35.95, 36.45, 36.9, 37.4, 37.8, 38.2, 38.55, 38.9, 39.25, 39.6, 39.9, 40.2];
                headCircumference97ChartData = [21.6, 22.6, 23.6, 24.6, 25.6, 26.7, 27.7, 28.7, 29.7, 30.6, 31.7, 32.5, 33.4, 34.2, 35, 35.6, 36.2, 36.9, 37.3, 37.8, 38.1, 38.5, 39, 39.3, 39.7, 40, 40.4, 40.7, 41];
                bodyLength3ChartData = [24.6, 25.6, 26.8, 27.9, 28.9, 30, 31.1, 32.3, 33.8, 34.9, 36.2, 37.8, 39, 40.2, 41.8, 42.9, 44, 45.1, 46.1, 47.2, 48, 48.9, 49.9, 50.6, 51.3, 52, 52.8, 53.4, 54.2];
                bodyLength10ChartData = [25.5, 26.7, 27.9, 29, 30.2, 31.4, 32.8, 33.9, 35.2, 36.5, 37.9, 39.18, 40.6, 41.9, 43.2, 44.2, 45.5, 46.5, 47.5, 48.45, 49.3, 50.2, 51, 51.8, 52.5, 53.2, 54, 54.6, 55.3];
                bodyLength50ChartData = [27.6, 28.91, 30.26, 31.6, 32.94, 34.3, 35.7, 37.04, 38.45, 39.84, 41.24, 42.66, 44, 45.3, 46.45, 47.55, 48.6, 49.55, 50.45, 51.3, 52.1, 52.9, 53.7, 54.4, 55.15, 55.85, 56.55, 57.25, 57.9];
                bodyLength90ChartData = [29.6, 31.1, 32.67, 34.2, 35.7, 37.2, 38.7, 40.2, 41.7, 43.2, 44.7, 46, 47.36, 48.6, 49.7, 50.8, 51.7, 52.5, 53.3, 54.1, 54.9, 55.6, 56.3, 57, 57.8, 58.5, 59.1, 59.9, 60.5];
                bodyLength97ChartData = [30.6, 32.3, 33.9, 35.4, 37, 38.6, 40.1, 41.8, 43.1, 44.9, 46.1, 47.8, 49, 50.1, 51.2, 52.1, 53.1, 54, 54.8, 55.4, 56.2, 57, 57.7, 58.3, 59.1, 59.8, 60.4, 61.2, 61.9];
            }

            const weightChartElem = $("#PC-chart-weight"),
                headCircumferenceChartElem = $("#PC-chart-HC"),
                bodyLengthChartElem = $("#PC-chart-BL"),
                options = {
                    aspectRatio: 0.8,
                    scales: {
                        x: {
                            title: {
                                color: "#FFB7C5",
                                display: true,
                                align: "end",
                                text: "胎龄（周）"
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
                chartJson = {
                    type: "line",
                    data: {
                        labels: labels,
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
                };
            let weightOption = JSON.parse(JSON.stringify(options)),
                headCircumferenceOption = JSON.parse(JSON.stringify(options)),
                bodyLengthOption = JSON.parse(JSON.stringify(options));
            // 体重 Fenton曲线
            weightOption.plugins.title.text = "体重（kg）";
            weightOption.scales.y.title.text = "kg";
            weightChartJson = JSON.parse(JSON.stringify(chartJson));
            weightChartJson.data.datasets[1].data = weight3ChartData;
            weightChartJson.data.datasets[2].data = weight10ChartData;
            weightChartJson.data.datasets[3].data = weight50ChartData;
            weightChartJson.data.datasets[4].data = weight90ChartData;
            weightChartJson.data.datasets[5].data = weight97ChartData;
            weightChartJson.options = weightOption;
            weightChart = new Chart($(weightChartElem), weightChartJson);
            // 头围 Fenton曲线
            headCircumferenceOption.plugins.title.text = "头围（cm）";
            headCircumferenceOption.scales.y.title.text = "cm";
            headCircumferenceChartJson = JSON.parse(JSON.stringify(chartJson));
            headCircumferenceChartJson.data.datasets[1].data = headCircumference3ChartData;
            headCircumferenceChartJson.data.datasets[2].data = headCircumference10ChartData;
            headCircumferenceChartJson.data.datasets[3].data = headCircumference50ChartData;
            headCircumferenceChartJson.data.datasets[4].data = headCircumference90ChartData;
            headCircumferenceChartJson.data.datasets[5].data = headCircumference97ChartData;
            headCircumferenceChartJson.options = headCircumferenceOption;
            headCircumferenceChart = new Chart($(headCircumferenceChartElem), headCircumferenceChartJson);
            // 身长 Fenton曲线
            bodyLengthOption.plugins.title.text = "身长（cm）";
            bodyLengthOption.scales.y.title.text = "cm";
            bodyLengthChartJson = JSON.parse(JSON.stringify(chartJson));
            bodyLengthChartJson.data.datasets[1].data = bodyLength3ChartData;
            bodyLengthChartJson.data.datasets[2].data = bodyLength10ChartData;
            bodyLengthChartJson.data.datasets[3].data = bodyLength50ChartData;
            bodyLengthChartJson.data.datasets[4].data = bodyLength90ChartData;
            bodyLengthChartJson.data.datasets[5].data = bodyLength97ChartData;
            bodyLengthChartJson.options = bodyLengthOption;
            bodyLengthChart = new Chart($(bodyLengthChartElem), bodyLengthChartJson);

            // 输入框 失去焦点
            $(".pc-db-BDDGSGI .pc-db-table input, .pc-db-DPCGC .pc-db-table input").on("focusout", function () {
                const that = this,
                    thisName = $(that).attr("name"),
                    inputs = $(that).parents("tr").find("input");  // 获取 这一排 所有的输入框
                let allWeightNum = [], firstBlockIndex = -1, firstNum = 0, lastBlockIndex = -1, lastNum = 0;
                for (let i = 0; i < inputs.length; i++) {
                    // 获取 每个输入框 输入值
                    const thisVal = $(inputs[i]).val();
                    if (thisVal !== "") {
                        allWeightNum[i] = thisVal;
                        const thisCgaWeek = allCgaWeek[i];
                        // 如果 表格最后一列 或者 下一天的周大于今日的周 或者 下一天无数据
                        if (notNullTool(allCgaWeek[i + 1]) || thisCgaWeek < allCgaWeek[i + 1] || !notNullTool($(inputs[i + 1]).val())) {
                            if (/weight/.test(thisName)) {
                                weightRealChartData[thisCgaWeek - 22] = thisVal;
                            } else if (/headCircumference/.test(thisName)) {
                                headCircumferenceRealChartData[thisCgaWeek - 22] = thisVal;
                            } else if (/bodyLength/.test(thisName)) {
                                bodyLengthRealChartData[thisCgaWeek - 22] = thisVal;
                            }
                        }
                    } else if (i > 0) {
                        const nextNum = $(inputs[i + 1]).val();
                        // 第一个 空格
                        if (firstBlockIndex === -1) {
                            firstBlockIndex = i;
                            firstNum = parseFloat(allWeightNum[i - 1]);
                            if (notNullTool(nextNum) && lastBlockIndex === -1) {
                                lastBlockIndex = i;
                                lastNum = parseFloat(nextNum);
                            }
                        } else {
                            // 最后一个 空格
                            if (notNullTool(nextNum) && lastBlockIndex === -1) {
                                lastBlockIndex = i;
                                lastNum = parseFloat(nextNum);
                            }
                        }
                    }
                }
                // 填补 中间空缺值
                if (firstNum > 0 && lastNum > 0) {
                    const firstNumIndex = firstBlockIndex - 1, lastNumIndex = lastBlockIndex + 1,
                        blockMean = (lastNum - firstNum) / (lastNumIndex - firstNumIndex);
                    let thisNum = firstNum;
                    for (let i = firstBlockIndex; i <= lastBlockIndex; i++) {
                        thisNum += blockMean;
                        $(inputs[i]).val(thisNum.toFixed(2));
                    }
                }
                $(inputs[lastBlockIndex]).focusout();
                // 根据输入数据 更新 图表
                if (/weight/.test(thisName)) {
                    weightChartJson.data.datasets[0].data = weightRealChartData;
                    weightChart.update();
                } else if (/headCircumference/.test(thisName)) {
                    headCircumferenceChartJson.data.datasets[0].data = headCircumferenceRealChartData;
                    headCircumferenceChart.update();
                } else if (/bodyLength/.test(thisName)) {
                    bodyLengthChartJson.data.datasets[0].data = bodyLengthRealChartData;
                    bodyLengthChart.update();
                }
                // 根据输入数据 更新 出生体重下降最低时间
                let minWeight = 10, minIndex, j = 0, firstIndex;
                for (let i = 0; i < allWeightNum.length; i++) {
                    if (notNullTool(allWeightNum[i])) {
                        j++;
                        if (j === 1) {
                            firstIndex = i;
                        }
                        if (allWeightNum[i] < minWeight) {
                            minWeight = allWeightNum[i];
                            minIndex = i;
                        }
                    }
                }
                // 如果 体重最低值 不是第一个输入值
                if (minIndex > firstIndex) {
                    $("#PC-db-BWLMT").val(allDate[minIndex]);
                    $("#PC-db-BWLMV").val(minWeight);

                    // 寻找 体重恢复到出生体重的 时间
                    for (let i = minIndex; i < allWeightNum.length; i++) {
                        if (notNullTool(allWeightNum[i])) {
                            if (allWeightNum[i] >= birthWeight) {
                                $("#PC-db-RBWT").val(allDate[i]);
                                const thisDateStamp = Date.parse(allDate[i]),
                                    dayAgeStamp = thisDateStamp - birthdayStamp;
                                $("#PC-db-RBWDA").val(dayAgeStamp / 86400000);
                                break;
                            }
                        }
                    }
                }
            });
        } else {
            layer.msg("请先完善 新生儿出生日期、入院日期、性别、胎龄等信息！", {
                icon: 7,
                time: 0,
                anim: 6,
                btn: "好!",
                resize: false,
                shade: 0.8
            }, function () {
                location.href = "/perinatalPlatform/basicDatabase/write/BS";
            });
        }

        // 消化系统 生长指标 增加 7 天
        $(".pc-db-BDDGSGI #PC-db-add, .pc-db-DPCGC #PC-db-add").on("click", function () {
            const that = this;
            // 增加 7天
            let gi7DayTdElem = "", max = index + 7, gi7DateTdElem = "", thisDateStamp = maxDateStamp,
                gi7WeightTdElem = "", gi7HeadCircumferenceTdElem = "", gi7bodyLengthTdElem = "",
                gi7gaWeekTdElem = "", gi7gaDayTdElem = "", thisCgaWeek = maxCgaWeek, thisCgaDay = maxCgaDay;
            while (index < max) {
                // 天
                gi7DayTdElem += "<td>" + index + "</td>";
                // 增加 7天 日期
                const thisDate = new Date(thisDateStamp),
                    thisDateString = (thisDate.getFullYear() % 100) + "/" + (thisDate.getMonth() + 1) + "/" + thisDate.getDate();
                allDate[index - 1] = dateFormatDay(thisDate);
                gi7DateTdElem += "<th>" + thisDateString + "</th>";
                thisDateStamp += 86400000;
                // 增加 7天 体重
                gi7WeightTdElem += "<td class='pc-db-table-textInput'><input type='number' name='weight" + index + "'></td>";
                // 增加 7天 头围
                gi7HeadCircumferenceTdElem += "<td class='pc-db-table-textInput'><input type='number' name='headCircumference" + index + "'></td>";
                // 增加 7天 身长
                gi7bodyLengthTdElem += "<td class='pc-db-table-textInput'><input type='number' name='bodyLength" + index + "'></td>";
                // 增加 7天 胎龄
                if (thisCgaDay === 7) {
                    thisCgaDay = 0;
                    thisCgaWeek++;
                }
                allCgaWeek[index - 1] = thisCgaWeek;
                gi7gaWeekTdElem += "<td class='pc-db-table-textInput'><input type='number' name='cgaWeek" + index + "' value='" + thisCgaWeek + "' readonly></td>";
                gi7gaDayTdElem += "<td class='pc-db-table-textInput'><input type='number' name='cgaDay" + index + "' value='" + thisCgaDay + "' readonly></td>";
                thisCgaDay++;
                index++;
            }
            $(that).parents("td").before(gi7DayTdElem);
            maxDateStamp = thisDateStamp;
            $(".pc-db-BDDGSGI .pc-db-table.tableRight>thead>tr>.blockTh," +
                ".pc-db-DPCGC .pc-db-table.tableRight>thead>tr>.blockTh").before(gi7DateTdElem);
            $(".pc-db-BDDGSGI .pc-db-table.tableRight>tbody>tr.pc-db-weight," +
                ".pc-db-DPCGC .pc-db-table.tableRight>tbody>tr.pc-db-weight").append(gi7WeightTdElem);
            $(".pc-db-BDDGSGI .pc-db-table.tableRight>tbody>tr.pc-db-HC," +
                ".pc-db-DPCGC .pc-db-table.tableRight>tbody>tr.pc-db-HC").append(gi7HeadCircumferenceTdElem);
            $(".pc-db-BDDGSGI .pc-db-table.tableRight>tbody>tr.pc-db-BL," +
                ".pc-db-DPCGC .pc-db-table.tableRight>tbody>tr.pc-db-BL").append(gi7bodyLengthTdElem);
            maxCgaWeek = thisCgaWeek;
            maxCgaDay = thisCgaDay;
            $(".pc-db-BDDGSGI .pc-db-table.tableRight>tbody>tr.pc-db-cgaWeek," +
                ".pc-db-DPCGC .pc-db-table.tableRight>tbody>tr.pc-db-cgaWeek").append(gi7gaWeekTdElem);
            $(".pc-db-BDDGSGI .pc-db-table.tableRight>tbody>tr.pc-db-cgaDay," +
                ".pc-db-DPCGC .pc-db-table.tableRight>tbody>tr.pc-db-cgaDay").append(gi7gaDayTdElem);
            // 输入框 失去焦点
            $(".pc-db-BDDGSGI .pc-db-table input, .pc-db-DPCGC .pc-db-table input").on("focusout", function () {
                const that = this,
                    thisName = $(that).attr("name"),
                    inputs = $(that).parents("tr").find("input");  // 获取 这一排 所有的输入框
                let allWeightNum = [], firstBlockIndex = -1, firstNum = 0, lastBlockIndex = -1, lastNum = 0;
                for (let i = 0; i < inputs.length; i++) {
                    // 获取 每个输入框 输入值
                    const thisVal = $(inputs[i]).val();
                    if (thisVal !== "") {
                        allWeightNum[i] = thisVal;
                        const thisCgaWeek = allCgaWeek[i];
                        // 如果 表格最后一列 或者 下一天的周大于今日的周 或者 下一天无数据
                        if (notNullTool(allCgaWeek[i + 1]) || thisCgaWeek < allCgaWeek[i + 1] || !notNullTool($(inputs[i + 1]).val())) {
                            if (/weight/.test(thisName)) {
                                weightRealChartData[thisCgaWeek - 22] = thisVal;
                            } else if (/headCircumference/.test(thisName)) {
                                headCircumferenceRealChartData[thisCgaWeek - 22] = thisVal;
                            } else if (/bodyLength/.test(thisName)) {
                                bodyLengthRealChartData[thisCgaWeek - 22] = thisVal;
                            }
                        }
                    } else if (i > 0) {
                        // 第一个 空格
                        if (firstBlockIndex === -1) {
                            firstBlockIndex = i;
                            firstNum = parseFloat(allWeightNum[i - 1]);
                        } else {
                            // 最后一个 空格
                            const nextNum = $(inputs[i + 1]).val();
                            if (notNullTool(nextNum) && lastBlockIndex === -1) {
                                lastBlockIndex = i;
                                lastNum = parseFloat(nextNum);
                            }
                        }
                    }
                }
                // 填补 中间空缺值
                if (firstNum > 0 && lastNum > 0) {
                    const firstNumIndex = firstBlockIndex - 1, lastNumIndex = lastBlockIndex + 1,
                        blockMean = (lastNum - firstNum) / (lastNumIndex - firstNumIndex);
                    let thisNum = firstNum;
                    for (let i = firstBlockIndex; i <= lastBlockIndex; i++) {
                        thisNum += blockMean;
                        $(inputs[i]).val(thisNum.toFixed(2));
                    }
                }
                $(inputs[lastBlockIndex]).focusout();
                // 根据输入数据 更新 图表
                if (/weight/.test(thisName)) {
                    weightChartJson.data.datasets[0].data = weightRealChartData;
                    weightChart.update();
                } else if (/headCircumference/.test(thisName)) {
                    headCircumferenceChartJson.data.datasets[0].data = headCircumferenceRealChartData;
                    headCircumferenceChart.update();
                } else if (/bodyLength/.test(thisName)) {
                    bodyLengthChartJson.data.datasets[0].data = bodyLengthRealChartData;
                    bodyLengthChart.update();
                }
                // 根据输入数据 更新 出生体重下降最低时间
                let minWeight = 10, minIndex, j = 0, firstIndex;
                for (let i = 0; i < allWeightNum.length; i++) {
                    if (notNullTool(allWeightNum[i])) {
                        j++;
                        if (j === 1) {
                            firstIndex = i;
                        }
                        if (allWeightNum[i] < minWeight) {
                            minWeight = allWeightNum[i];
                            minIndex = i;
                        }
                    }
                }
                if (minIndex > firstIndex) {
                    $("#PC-db-BWLMT").val(allDate[minIndex]);
                    $("#PC-db-BWLMV").val(minWeight);
                }
            });
        });

        // 获取 信息 初始化 体重
        $.get("/perinatalPlatform/basicDatabase/write/DGS/GI/getWHcBl", function (back, status) {
            if (status === "success") {
                if (back.code) {
                    const wHcBlList = back.wHcBlList;
                    if (wHcBlList.length > 0) {
                        layer.msg("出生日期、胎龄、入院日期等信息 修改后，请务必再次保存此页！");
                    }
                    // 遍历 体重、头围、身长
                    for (const i in wHcBlList) {
                        const day = wHcBlList[i].day,
                            weight = wHcBlList[i].weight,
                            headCircumference = wHcBlList[i].headCircumference,
                            bodyLength = wHcBlList[i].bodyLength;
                        let inputLength = $(".pc-db-BDDGSGI .pc-db-table .pc-db-weight input, .pc-db-DPCGC .pc-db-table .pc-db-weight input").length,
                            inputBlockLength = inputLength / 7;
                        // 检测 是否 要增加7天
                        while (Math.ceil(day / 7) > inputBlockLength) {
                            $("#PC-db-add").click();
                            inputLength = $(".pc-db-BDDGSGI .pc-db-table .pc-db-weight input, .pc-db-DPCGC .pc-db-table .pc-db-weight input").length;
                            inputBlockLength = inputLength / 7;
                        }
                        // 填充 表格
                        if (notNullTool(weight)) {
                            $(".pc-db-BDDGSGI .pc-db-table .pc-db-weight input[name=weight" + day + "]," +
                                ".pc-db-DPCGC .pc-db-table .pc-db-weight input[name=weight" + day + "]").val(weight);
                        }
                        if (notNullTool(headCircumference)) {
                            $(".pc-db-BDDGSGI .pc-db-table .pc-db-HC input[name=headCircumference" + day + "]," +
                                ".pc-db-DPCGC .pc-db-table .pc-db-HC input[name=headCircumference" + day + "]").val(headCircumference);
                        }
                        if (notNullTool(bodyLength)) {
                            $(".pc-db-BDDGSGI .pc-db-table .pc-db-BL input[name=bodyLength" + day + "]," +
                                ".pc-db-DPCGC .pc-db-table .pc-db-BL input[name=bodyLength" + day + "]").val(bodyLength);
                        }
                    }
                    $(".pc-db-BDDGSGI .pc-db-table .pc-db-weight>td:first-child>input, .pc-db-DPCGC .pc-db-table .pc-db-weight>td:first-child>input").focusout();
                    $(".pc-db-BDDGSGI .pc-db-table .pc-db-HC>td:first-child>input, .pc-db-DPCGC .pc-db-table .pc-db-HC>td:first-child>input").focusout();
                    $(".pc-db-BDDGSGI .pc-db-table .pc-db-BL>td:first-child>input, .pc-db-DPCGC .pc-db-table .pc-db-BL>td:first-child>input").focusout();
                }
            }
        }, "json");

        // 查看 大图
        const layerChartElem = $("#PC-layer-chart"),
            options = {
                aspectRatio: 0.8,
                scales: {
                    x: {
                        title: {
                            color: "#FFB7C5",
                            display: true,
                            align: "end",
                            text: "胎龄（周）"
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
                }
            };
        let weightLayerChart, headCircumferenceLayerChart, bodyLengthLayerChart,
            chartJson = {
                type: "line",
                data: {
                    labels: labels,
                    datasets: [{
                        label: "实际值",
                        fill: false,
                        borderWidth: 4,
                        pointRadius: 3,
                        backgroundColor: "#10A64B",
                        borderColor: "#10A64B"
                    }, {
                        label: "3%",
                        fill: false,
                        borderWidth: 2,
                        pointRadius: 2,
                        backgroundColor: "#FADBD8",
                        borderColor: "#FADBD8"
                    }, {
                        label: "10%",
                        fill: false,
                        borderWidth: 2,
                        pointRadius: 2,
                        backgroundColor: "#E8DAEF",
                        borderColor: "#E8DAEF"
                    }, {
                        label: "50%",
                        fill: false,
                        borderWidth: 2,
                        pointRadius: 2,
                        backgroundColor: "#D6EAF8",
                        borderColor: "#D6EAF8"
                    }, {
                        label: "90%",
                        fill: false,
                        borderWidth: 2,
                        pointRadius: 2,
                        backgroundColor: "#D0ECE7",
                        borderColor: "#D0ECE7"
                    }, {
                        label: "97%",
                        fill: false,
                        borderWidth: 2,
                        pointRadius: 2,
                        backgroundColor: "#FDEBD0",
                        borderColor: "#FDEBD0"
                    }]
                },
                options: options
            };
        $("#PC-db-weight").on("click", function () {
            if (weightLayerChart !== undefined) {
                weightLayerChart.destroy();
            }
            if (headCircumferenceLayerChart !== undefined) {
                headCircumferenceLayerChart.destroy();
            }
            if (bodyLengthLayerChart !== undefined) {
                bodyLengthLayerChart.destroy();
            }
            chartJson.data.datasets[0].data = weightRealChartData;
            chartJson.data.datasets[1].data = weight3ChartData;
            chartJson.data.datasets[2].data = weight10ChartData;
            chartJson.data.datasets[3].data = weight50ChartData;
            chartJson.data.datasets[4].data = weight90ChartData;
            chartJson.data.datasets[5].data = weight97ChartData;
            chartJson.options.scales.y.title.text = "kg";
            weightLayerChart = new Chart($(layerChartElem), chartJson);
            layer.open({
                title: "体重 Fenton 曲线",
                type: 1,
                shade: 0.8,
                area: "800px",
                content: $("#PC-db-fenton"),
                resize: false
            });
        });
        $("#PC-db-HC").on("click", function () {
            if (weightLayerChart !== undefined) {
                weightLayerChart.destroy();
            }
            if (headCircumferenceLayerChart !== undefined) {
                headCircumferenceLayerChart.destroy();
            }
            if (bodyLengthLayerChart !== undefined) {
                bodyLengthLayerChart.destroy();
            }
            chartJson.data.datasets[0].data = headCircumferenceRealChartData;
            chartJson.data.datasets[1].data = headCircumference3ChartData;
            chartJson.data.datasets[2].data = headCircumference10ChartData;
            chartJson.data.datasets[3].data = headCircumference50ChartData;
            chartJson.data.datasets[4].data = headCircumference90ChartData;
            chartJson.data.datasets[5].data = headCircumference97ChartData;
            chartJson.options.scales.y.title.text = "cm";
            headCircumferenceLayerChart = new Chart($(layerChartElem), chartJson);
            layer.open({
                title: "头围 Fenton 曲线",
                type: 1,
                shade: 0.8,
                area: "800px",
                content: $("#PC-db-fenton"),
                resize: false
            });
        });
        $("#PC-db-BL").on("click", function () {
            if (weightLayerChart !== undefined) {
                weightLayerChart.destroy();
            }
            if (headCircumferenceLayerChart !== undefined) {
                headCircumferenceLayerChart.destroy();
            }
            if (bodyLengthLayerChart !== undefined) {
                bodyLengthLayerChart.destroy();
            }
            chartJson.data.datasets[0].data = bodyLengthRealChartData;
            chartJson.data.datasets[1].data = bodyLength3ChartData;
            chartJson.data.datasets[2].data = bodyLength10ChartData;
            chartJson.data.datasets[3].data = bodyLength50ChartData;
            chartJson.data.datasets[4].data = bodyLength90ChartData;
            chartJson.data.datasets[5].data = bodyLength97ChartData;
            chartJson.options.scales.y.title.text = "cm";
            bodyLengthLayerChart = new Chart($(layerChartElem), chartJson);
            layer.open({
                title: "身长 Fenton 曲线",
                type: 1,
                shade: 0.8,
                area: "800px",
                content: $("#PC-db-fenton"),
                resize: false
            });
        });

        // 定时 提醒 保存
        setInterval(function () {
            layer.msg("是否保存信息？",{
                icon: 3,
                time: 0,
                anim: 6,
                btn: ["是", "否"],
                resize: false,
                shade: 0.6,
                yes: function () {
                    $(".pc-db-save>.pc-btn-save").click();
                }
            });
        },300000);

        // 基础数据库 消化系统 生长指标 添加/编辑 信息 提交
        form.on("submit(DGSGI)", function (data) {
            const doing = "保存信息";
            loading(doing);
            let field = data.field, wHcBlArray = [];
            for (let i = 1; i < index; i++) {
                const thisDateString = $(".pc-db-BDDGSGI .pc-db-item-table>table.pc-db-table>thead>tr>th:eq(" + i + ")").text(),
                    thisDate = new Date("20" + thisDateString);
                if (notNullTool(field["weight" + i]) || notNullTool(field["headCircumference" + i]) || notNullTool(field["bodyLength" + i])) {
                    wHcBlArray.push({
                        day: i,
                        thisDate: dateFormatDay(thisDate),
                        weight: field["weight" + i],
                        headCircumference: field["headCircumference" + i],
                        bodyLength: field["bodyLength" + i],
                        cgaWeek: field["cgaWeek" + i],
                        cgaDay: field["cgaDay" + i]
                    });
                }
                delete field["weight" + i];
                delete field["headCircumference" + i];
                delete field["bodyLength" + i];
                delete field["cgaWeek" + i];
                delete field["cgaDay" + i];
            }
            for (const key in field) {
                if (!notNullTool(field[key])) {
                    delete field[key];
                }
            }
            field.wHcBlArray = JSON.stringify(wHcBlArray);
            $.post("/perinatalPlatform/basicDatabase/write/DGS/GI/post",field, function (back, status) {
                if(status === "success") {
                    if(back.code) {
                        successNext();
                    }else {failMsg(doing)}
                }else {errorMsg1()}
            }, "json").fail(function () {errorMsg2()});
        });

        // 医患交流库 生长曲线 添加/编辑 信息 提交
        form.on("submit(GC)", function (data) {
            const doing = "保存信息";
            loading(doing);
            let field = data.field, wHcBlArray = [];
            for (let i = 1; i < index; i++) {
                const thisDateString = $(".pc-db-DPCGC .pc-db-item-table>table.pc-db-table>thead>tr>th:eq(" + i + ")").text(),
                    thisDate = new Date("20" + thisDateString);
                if (notNullTool(field["weight" + i]) || notNullTool(field["headCircumference" + i]) || notNullTool(field["bodyLength" + i])) {
                    wHcBlArray.push({
                        day: i,
                        thisDate: dateFormatDay(thisDate),
                        weight: field["weight" + i],
                        headCircumference: field["headCircumference" + i],
                        bodyLength: field["bodyLength" + i],
                        cgaWeek: field["cgaWeek" + i],
                        cgaDay: field["cgaDay" + i]
                    });
                }
                delete field["weight" + i];
                delete field["headCircumference" + i];
                delete field["bodyLength" + i];
                delete field["cgaWeek" + i];
                delete field["cgaDay" + i];
            }
            for (const key in field) {
                if (!notNullTool(field[key])) {
                    delete field[key];
                }
            }
            field.wHcBlArray = JSON.stringify(wHcBlArray);
            $.post("/perinatalPlatform/doctorPatientCommunication/write/BMD/post",field, function (back, status) {
                if(status === "success") {
                    if(back.code) {
                        successNext();
                    }else {failMsg(doing)}
                }else {errorMsg1()}
            }, "json").fail(function () {errorMsg2()});
        });
    });
});