// 计算体重Z评分
function computeWeightZScore(weight, gaWeek, gender) {
    if (gaWeek >= 22 && gaWeek <= 50) {
        const weightIndex = gaWeek - 22;
        if (notNullTool(gender)) {
            if (gender === "男") {
                const boyWeightMean = [496, 571, 651, 742, 841, 953, 1079, 1223, 1389, 1579, 1791, 2019, 2255, 2493, 2726, 2948, 3158, 3362, 3570, 3787, 4105, 4252, 4492, 4732, 4970, 5196, 5419, 5630, 5836],
                    boyWeightDS = [64.8, 84.4, 105.8, 130.0, 156.6, 185.0, 216.7, 249.0, 280.4, 316.0, 350.0, 379.0, 407.0, 424.0, 439.0, 450.0, 458.0, 468.0, 482.0, 501.0, 529.0, 556.0, 590.0, 624.0, 647.0, 670.0, 689.0, 712.0, 735.0];
                return ((weight * 1000 - boyWeightMean[weightIndex]) / boyWeightDS[weightIndex]).toFixed(2);
            } else if (gender === "女") {
                const girlWeightMean = [482, 537, 606, 694, 792, 899, 1018, 1152, 1306, 1482, 1681, 1897, 2126, 2364, 2602, 2835, 3050, 3240, 3416, 3598, 3790, 3990, 4193, 4400, 4603, 4800, 4995, 5183, 5363],
                    girlWeightSD = [70.4, 83.4, 101.7, 126.6, 155.8, 186.8, 220.6, 258.0, 296.0, 333.7, 368.0, 396.7, 420.0, 442.0, 462.0, 525.8, 500.0, 514.0, 530.0, 548.0, 566.0, 590.0, 607.4, 632.0, 656.0, 677.7, 695.0, 713.0, 727.0];
                return ((weight * 1000 - girlWeightMean[weightIndex]) / girlWeightSD[weightIndex]).toFixed(2)
            }
        }
    }
}
// 计算头围Z评分
function computeHeadCircumferenceZScore(headCircumference, gaWeek, gender) {
    if (gaWeek >= 22 && gaWeek <= 50) {
        const headCircumferenceIndex = gaWeek - 22;
        if (notNullTool(gender)) {
            if (gender === "男") {
                const boyHeadCircumferenceMean = [19.79, 20.77, 21.75, 22.73, 23.71, 24.67, 25.63, 26.59, 27.53, 28.47, 29.39, 30.28, 31.13, 31.93, 32.66, 33.33, 33.95, 34.51, 35.05, 35.55, 36.04, 36.51, 36.97, 37.41, 37.84, 38.27, 38.68, 39.09, 39.50],
                    boyHeadCircumferenceSD = [1.2, 1.2, 1.3, 1.3, 1.3, 1.4, 1.4, 1.4, 1.4, 1.5, 1.5, 1.5, 1.5, 1.5, 1.5, 1.5, 1.5, 1.4, 1.4, 1.4, 1.4, 1.4, 1.3, 1.3, 1.3, 1.3, 1.3, 1.2, 1.2];
                return ((headCircumference - boyHeadCircumferenceMean[headCircumferenceIndex]) / boyHeadCircumferenceSD[headCircumferenceIndex]).toFixed(2);
            } else if (gender === "女") {
                const girlHeadCircumferenceMean = [19.49, 20.42, 21.34, 22.27, 23.20, 24.14, 25.07, 26.01, 26.95, 27.90, 28.84, 29.76, 30.65, 31.48, 32.25, 32.95, 33.58, 34.16, 34.70, 35.20, 35.66, 36.10, 36.51, 36.91, 37.28, 37.64, 37.98, 38.32, 38.66],
                    girlHeadCircumferenceSD = [1.1, 1.2, 1.2, 1.2, 1.3, 1.3, 1.4, 1.4, 1.4, 1.5, 1.5, 1.5, 1.5, 1.5, 1.5, 1.4, 1.4, 1.4, 1.4, 1.3, 1.3, 1.3, 1.3, 1.3, 1.3, 1.3, 1.2, 1.2, 1.2];
                return ((headCircumference - girlHeadCircumferenceMean[headCircumferenceIndex]) / girlHeadCircumferenceSD[headCircumferenceIndex]).toFixed(2)
            }
        }
    }
}
// 计算身长Z评分
function computeBodyLengthZScore(bodyLength, gaWeek, gender) {
    if (gaWeek >= 22 && gaWeek <= 50) {
        const bodyLengthIndex = gaWeek - 22;
        if (notNullTool(gender)) {
            if (gender === "男") {
                const boyBodyLengthMean = [28.13, 29.53, 30.93, 32.32, 33.71, 35.08, 36.45,37.83, 39.21, 40.61, 42.01, 43.39, 44.73, 46.00, 47.18, 48.27, 49.28,50.25, 51.16, 52.06, 52.95, 53.82, 54.68, 55.52, 56.32, 57.11, 57.88, 58.63, 59.37],
                    boyBodyLengthSD = [1.7, 1.8, 2.0, 2.1, 2.2, 2.3, 2.4, 2.5, 2.5, 2.5, 2.5, 2.5, 2.5, 2.5, 2.4, 2.4, 2.4, 2.3, 2.2, 2.2, 2.2, 2.1, 2.1, 2.1, 2.1, 2.1, 2.0, 2.0, 2.0];
                return ((bodyLength - boyBodyLengthMean[bodyLengthIndex]) / boyBodyLengthSD[bodyLengthIndex]).toFixed(2);
            } else if (gender === "女") {
                const girlBodyLengthMean = [27.59, 28.93, 30.27, 31.61, 32.96, 34.32, 35.69, 37.06, 38.45, 39.86, 41.27, 42.66, 44.00, 45.28, 46.47, 47.58, 48.59, 49.55, 50.44, 51.30, 52.12, 52.92, 53.68, 54.43, 55.15, 55.86, 56.56, 57.24, 57.92],
                    girlBodyLengthSD = [1.6, 1.7, 1.9, 2.0, 2.1, 2.3, 2.4, 2.5, 2.6, 2.6, 2.6, 2.6, 2.6, 2.6, 2.6, 2.5, 2.4, 2.3, 2.3, 2.2, 2.2, 2.1, 2.1, 2.1, 2.0, 2.0, 2.0, 2.0, 2.0];
                return ((bodyLength - girlBodyLengthMean[bodyLengthIndex]) / girlBodyLengthSD[bodyLengthIndex]).toFixed(2);
            }
        }
    }
}
// 计算体重发育迟缓、小于胎龄儿
function computeWeightRetardation(weight, gaWeek, gender) {
    if (gaWeek >= 22 && gaWeek <= 50) {
        if (gender === "男") {
            const boyWeight10PercentData = [0.418, 0.468, 0.516, 0.568, 0.627, 0.7, 0.781, 0.874, 0.99, 1.124, 1.3, 1.5, 1.72, 1.96, 2.18, 2.39, 2.59, 2.8, 2.98, 3.19, 3.39, 3.6, 3.8, 4, 4.22, 4.42, 4.62, 4.8, 5],
                boyWeight10Percent = boyWeight10PercentData[gaWeek - 22];
            return (weight / 1000) < boyWeight10Percent;
        } else if (gender === "女") {
            const girlWeight10PercentData = [0.405, 0.444, 0.486, 0.536, 0.59, 0.642, 0.712, 0.8, 0.9, 1.04, 1.2, 1.4, 1.62, 1.85, 2.07, 2.29, 2.49, 2.67, 2.82, 2.98, 3.15, 3.32, 3.51, 3.69, 3.88, 4.04, 4.22, 4.39, 4.55],
                girlWeight10Percent = girlWeight10PercentData[gaWeek - 22];
            return (weight / 1000) < girlWeight10Percent;
        }
    }
}
// 计算（宫内）头围发育迟缓
function computeHeadCircumferenceRetardation(headCircumference, gaWeek, gender) {
    if (gaWeek >= 22 && gaWeek <= 50) {
        if (gender === "男") {
            const boyHeadCircumference10PercentData = [18.3, 19.21, 20.11, 21.1, 22, 22.9, 23.84, 24.8, 25.7, 26.6, 27.5, 28.4, 29.2, 30, 30.75, 31.4, 32.1, 32.7, 33.2, 33.75, 34.3, 34.8, 35.25, 35.7, 36.2, 36.6, 37.1, 37.5, 37.95],
                boyHeadCircumference10Percent = boyHeadCircumference10PercentData[gaWeek - 22];
            return headCircumference < boyHeadCircumference10Percent;
        } else if (gender === "女") {
            const girlHeadCircumference10PercentData = [19.5, 20.4, 21.34, 22.26, 23.2, 24.14, 25.06, 26, 26.95, 27.9, 28.84, 29.76, 30.66, 31.48, 32.25, 32.95, 33.57, 34.15, 34.7, 35.2, 35.65, 36.1, 36.5, 36.9, 37.28, 37.65, 37.98, 38.32, 38.65],
                girlHeadCircumference10Percent = girlHeadCircumference10PercentData[gaWeek - 22];
            return headCircumference < girlHeadCircumference10Percent;
        }
    }
}
// 计算（宫内）身长发育迟缓
function computeBodyLengthRetardation(bodyLength, gaWeek, gender) {
    if (gaWeek >= 22 && gaWeek <= 50) {
        if (gender === "男") {
            const boyBodyLength10PercentData = [26, 27.2, 28.3, 29.65, 30.8, 32.1, 33.3, 34.7, 36, 37.4, 38.8, 40.1, 41.5, 42.8, 44, 45.2, 46.3, 47.3, 48.3, 49.2, 50.2, 51.1, 52, 52.9, 53.7, 54.5, 55.2, 56, 56.8],
                boyBodyLength10Percent = boyBodyLength10PercentData[gaWeek - 22];
            return bodyLength < boyBodyLength10Percent;
        } else if (gender === "女") {
            const girlBodyLength10PercentData = [25.5, 26.7, 27.9, 29, 30.2, 31.4, 32.8, 33.9, 35.2, 36.5, 37.9, 39.18, 40.6, 41.9, 43.2, 44.2, 45.5, 46.5, 47.5, 48.45, 49.3, 50.2, 51, 51.8, 52.5, 53.2, 54, 54.6, 55.3],
                girlBodyLength10Percent = girlBodyLength10PercentData[gaWeek - 22];
            return bodyLength < girlBodyLength10Percent;
        }
    }
}
function startEndDatetime(laydate, startElem, endElem) {
    let startTime, endTime, startTimeStamp = 0, endTimeStamp = 0;
    // 开始时间
    laydate.render({
        elem: "#PC-db-" + startElem,
        type: "datetime",
        format: "yyyy-MM-dd HH:mm:ss",
        max: 1,
        done: function (value, date) {
            if(value !== "") {
                startTime = date.year + "-" + date.month + "-" + date.date +  ' ' + date.hours + ':' + date.minutes + ':' + date.seconds;
                startTimeStamp = Date.parse(startTime);
                if (notNullTool(endTime)) {
                    if (startTimeStamp > endTime) {
                        layer.msg("开始时间必须<span class='layui-badge'>早于</span>结束时间！", {
                            icon: 5,
                            time: 1000,
                            anim: 6,
                            btn: "好",
                            resize: false,
                            shade: 0.8
                        }, function () {
                            $("#PC-db-" + startElem).val("");
                            startTime = null;
                            startTimeStamp = 0;
                        });
                    }
                }
            }else {
                startTime = null;
                startTimeStamp = 0;
            }
        }
    });

    // 结束时间
    laydate.render({
        elem: "#PC-db-" + endElem,
        type: "datetime",
        format: "yyyy-MM-dd HH:mm:ss",
        max: 1,
        done: function (value, date) {
            if(value !== "") {
                endTime = date.year + "-" + date.month + "-" + date.date +  ' ' + date.hours + ':' + date.minutes + ':' + date.seconds;
                endTimeStamp = Date.parse(endTime);
                if (notNullTool(startTime)) {
                    if (startTimeStamp > endTimeStamp) {
                        layer.msg("结束时间必须<span class='layui-badge'>晚于</span>开始时间！", {
                            icon: 5,
                            time: 1000,
                            anim: 6,
                            btn: "好",
                            resize: false,
                            shade: 0.8
                        }, function () {
                            $("#PC-db-" + endElem).val("");
                            endTime = null;
                            endTimeStamp = 0;
                        });
                    }
                }
            }else {
                endTime = null;
                endTimeStamp = 0;
            }
        }
    });
}
$(document).ready(function () {
    // 获取 窗口宽度
    const windowWidth = $(window).width();

    // 每一项 高度
    if (windowWidth > 768) {
        const itemElem = $(".pc-db-item");
        for (let i = 0; i < itemElem.length; i++) {
            const checkboxElem = $(itemElem[i]).children(".pc-db-item-checkbox"),
                rbgElem = $(itemElem[i]).children(".pc-db-radioBtn-group");
            if (checkboxElem.length > 0 && $(checkboxElem).height() > 30) {
                $(checkboxElem).addClass("shrink");
                $(itemElem[i]).height($(checkboxElem).height());
            } else if (rbgElem.length > 0 && $(rbgElem).height() > 30) {
                $(itemElem[i]).height($(rbgElem).height());
            }
        }
    }

    // 禁食 开关
    $("#PC-db-fasting>.layui-form-switch").off("click");

    // 消化道穿孔单选按钮组 后面的输入
    $("#PC-db-DTP>.pc-db-radioBtn-group>li").on("click", function () {
        const that = this;
        if ($(that).hasClass("pc-db-active")) {
            if ($(that).attr("data-value") === "自发性穿孔") {
                $("#PC-db-FSPT").removeAttr("disabled").attr("lay-verify", "requiredDB").attr("name", function () {
                    return $(this).attr("data-name");
                });
                $("#PC-db-NECRDTPDT").attr("disabled", true).removeAttr("name lay-verify").val("");
                $("#PC-db-DTPT>input").attr("lay-verify", "requiredRadioGroup").attr("name", function () {
                    return $(this).attr("data-name");
                });
                $("#PC-db-DTPT>.pc-db-radioBtn-group").removeClass("rbgOff");
                $("#PC-db-DTPT>.pc-db-radioBtn-group>li").on("click", function () {
                    activeRBGChoice(this);
                });
            } else if ($(that).attr("data-value") === "NEC相关") {
                $("#PC-db-NECRDTPDT").removeAttr("disabled").attr("lay-verify", "requiredDB").attr("name", function () {
                    return $(this).attr("data-name");
                });
                $("#PC-db-FSPT").attr("disabled", true).removeAttr("name lay-verify").val("");
                $("#PC-db-DTPT>input").attr("lay-verify", "requiredRadioGroup").attr("name", function () {
                    return $(this).attr("data-name");
                });
                $("#PC-db-DTPT>.pc-db-radioBtn-group").removeClass("rbgOff");
                $("#PC-db-DTPT>.pc-db-radioBtn-group>li").on("click", function () {
                    activeRBGChoice(this);
                });
            } else {
                $("#PC-db-FSPT").attr("disabled", true).removeAttr("name lay-verify").val("");
                $("#PC-db-NECRDTPDT").attr("disabled", true).removeAttr("name lay-verify").val("");
                $("#PC-db-DTPT>input").removeAttr("name value lay-verify");
                $("#PC-db-DTPT>.pc-db-radioBtn-group").addClass("rbgOff");
                $("#PC-db-DTPT>.pc-db-radioBtn-group>li").off("click").removeAttr("class");
            }
        } else {
            $("#PC-db-FSPT").attr("disabled", true).removeAttr("name lay-verify").val("");
            $("#PC-db-NECRDTPDT").attr("disabled", true).removeAttr("name lay-verify").val("");
            $("#PC-db-DTPT>input").removeAttr("name value lay-verify");
            $("#PC-db-DTPT>.pc-db-radioBtn-group").addClass("rbgOff");
            $("#PC-db-DTPT>.pc-db-radioBtn-group>li").off("click").removeAttr("class");
        }
    });

    // 引入 layui
    layui.use(["element", "layer", "form", "laydate"], function () {
        let form = layui.form,
            laydate = layui.laydate,
            layer = layui.layer;

        // 过渡期营养管理
        const tnmElem = $(".pc-db-BDDGSTNM"),
            tnmBirthdayInput = $(tnmElem).attr("data-birthday"),
            tnmGender = $(tnmElem).attr("data-gender");

        if (tnmElem.length > 0) {
            if (notNullTool(tnmBirthdayInput) && notNullTool(tnmGender)) {
                const birthdayStamp = Date.parse(tnmBirthdayInput),
                    gender = tnmGender;
                layer.msg("肠内、肠外营养修改后，请务必保存！");
                // 获取 过渡期营养管理 初始化数据
                $.get("/perinatalPlatform/basicDatabase/write/DGS/TNM/getInitialData", function (back, status) {
                    if (status === "success") {
                        if (back.code) {
                            const initialData = back.initialData,
                                giList = initialData.giList,
                                enmList = initialData.enmList,
                                pnmList = initialData.pnmList;

                            let milkToNFlag = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
                            // 遍历 肠内营养管理 数据
                            for (const i in enmList) {
                                const thisEnm = enmList[i],
                                    thisTotalDailyMilkVolumePKgInput = thisEnm.totalDailyMilkVolumePKg;

                                // 每日奶量总计存在
                                if (notNullTool(thisTotalDailyMilkVolumePKgInput)) {
                                    const thisTotalDailyMilkVolumePKg = parseFloat(thisTotalDailyMilkVolumePKgInput);
                                    // 每日奶量 10~150 循环
                                    for (let j = 10; j <= 150; j += 10) {
                                        if (thisTotalDailyMilkVolumePKg >= j && milkToNFlag[(j / 10) - 1] === 0) {
                                            // 获取 天数
                                            const day = thisEnm.day;
                                            let thisDateStamp = 0, cgaWeek, cgaDay, weight,
                                                aminoAcidGPDInput, aminoAcidGPKgPDInput, intravenousNutritionCalorieKcalPD,
                                                intravenousNutritionCalorieKcalPKgPD,
                                                totalCalorieKcalPD, totalCalorieKcalPKgPD, totalProteinGPD = 0,
                                                totalProteinGPKgPD = 0;
                                            // 找出 本日 体重
                                            for (const k in giList) {
                                                if (giList[k].day == day) {
                                                    thisDateStamp = giList[k].thisDate;
                                                    weight = giList[k].weight;
                                                    cgaWeek = giList[k].cgaWeek;
                                                    cgaDay = giList[k].cgaDay;
                                                    break;
                                                }
                                            }
                                            // 找出 本日 肠外氨基酸、肠外热卡、合计热卡
                                            for (const k in giList) {
                                                if (pnmList[k].day == day) {
                                                    aminoAcidGPDInput = pnmList[k].aminoAcidGPD;
                                                    aminoAcidGPKgPDInput = pnmList[k].aminoAcidGPKgPD;
                                                    intravenousNutritionCalorieKcalPD = pnmList[k].intravenousNutritionCalorieKcalPD;
                                                    intravenousNutritionCalorieKcalPKgPD = pnmList[k].intravenousNutritionCalorieKcalPKgPD;
                                                    totalCalorieKcalPD = pnmList[k].totalCalorieKcalPD;
                                                    totalCalorieKcalPKgPD = pnmList[k].totalCalorieKcalPKgPD;
                                                    break;
                                                }
                                            }
                                            // 日期
                                            $(".pc-db-BDDGSTNM .pc-db-item-table>table.pc-db-table>tbody>tr>td.pc-db-table-textInput>input[name=milkTo" + j + "Date]").val(dateFormatDay(thisDateStamp));
                                            // 生后天数
                                            $(".pc-db-BDDGSTNM .pc-db-item-table>table.pc-db-table>tbody>tr>td.pc-db-table-textInput>input[name=milkTo" + j + "DaysAfterBirth]").val(Math.ceil((thisDateStamp - birthdayStamp) / 86400000));
                                            // 纠正胎龄（周）
                                            $(".pc-db-BDDGSTNM .pc-db-item-table>table.pc-db-table>tbody>tr>td.pc-db-table-textInput>input[name=milkTo" + j + "CorrectGestationalAgeWeek]").val(cgaWeek);
                                            // 纠正胎龄（天）
                                            $(".pc-db-BDDGSTNM .pc-db-item-table>table.pc-db-table>tbody>tr>td.pc-db-table-textInput>input[name=milkTo" + j + "CorrectGestationalAgeDay]").val(cgaDay);
                                            // 体重（kg）
                                            if (notNullTool(weight)) {
                                                $(".pc-db-BDDGSTNM .pc-db-item-table>table.pc-db-table>tbody>tr>td.pc-db-table-textInput>input[name=milkTo" + j + "Weight]").val(weight);
                                                // 体重z评分
                                                $(".pc-db-BDDGSTNM .pc-db-item-table>table.pc-db-table>tbody>tr>td.pc-db-table-textInput>input[name=milkTo" + j + "WeightZScore]").val(computeWeightZScore(weight, cgaWeek, gender));
                                            }
                                            // 实际肠内营养（ml/kg/d）
                                            $(".pc-db-BDDGSTNM .pc-db-item-table>table.pc-db-table>tbody>tr>td.pc-db-table-textInput>input[name=milkTo" + j + "ActualEnteralNutrition]").val(thisTotalDailyMilkVolumePKg);
                                            // 肠内氨基酸（g/d）
                                            $(".pc-db-BDDGSTNM .pc-db-item-table>table.pc-db-table>tbody>tr>td.pc-db-table-textInput>input[name=milkTo" + j + "EnteralAminoAcidsGPD]").val(thisEnm.enteralNutritionalProteinGPD);
                                            // 肠内氨基酸（g/kg/d）
                                            $(".pc-db-BDDGSTNM .pc-db-item-table>table.pc-db-table>tbody>tr>td.pc-db-table-textInput>input[name=milkTo" + j + "EnteralAminoAcidsGPKgPD]").val(thisEnm.enteralNutritionalProteinGPKgPD);
                                            // 肠内热卡（kcal/d）
                                            $(".pc-db-BDDGSTNM .pc-db-item-table>table.pc-db-table>tbody>tr>td.pc-db-table-textInput>input[name=milkTo" + j + "EnteralCalorieKcalPD]").val(thisEnm.totalMilkCaloriesKcalPD);
                                            // 肠内热卡（kcal/kg/d）
                                            $(".pc-db-BDDGSTNM .pc-db-item-table>table.pc-db-table>tbody>tr>td.pc-db-table-textInput>input[name=milkTo" + j + "EnteralCalorieKcalPKgPD]").val(thisEnm.totalMilkCaloriesKcalPKgPD);
                                            // 肠外氨基酸（g/d）
                                            if (notNullTool(aminoAcidGPDInput)) {
                                                const aminoAcidGPD = parseFloat(aminoAcidGPDInput);
                                                totalProteinGPD += aminoAcidGPD;
                                                $(".pc-db-BDDGSTNM .pc-db-item-table>table.pc-db-table>tbody>tr>td.pc-db-table-textInput>input[name=milkTo" + j + "ParenteralAminoAcidsGPD]").val(aminoAcidGPD);
                                            }
                                            // 肠外氨基酸（g/kg/d）
                                            if (notNullTool(aminoAcidGPKgPDInput)) {
                                                const aminoAcidGPKgPD = parseFloat(aminoAcidGPKgPDInput);
                                                totalProteinGPKgPD += aminoAcidGPKgPD;
                                                $(".pc-db-BDDGSTNM .pc-db-item-table>table.pc-db-table>tbody>tr>td.pc-db-table-textInput>input[name=milkTo" + j + "ParenteralAminoAcidsGPKgPD]").val(aminoAcidGPKgPD);
                                            }
                                            // 肠外热卡（kcal/d）
                                            if (notNullTool(intravenousNutritionCalorieKcalPD)) {
                                                $(".pc-db-BDDGSTNM .pc-db-item-table>table.pc-db-table>tbody>tr>td.pc-db-table-textInput>input[name=milkTo" + j + "ParenteralCalorieKcalPD]").val(intravenousNutritionCalorieKcalPD);
                                            }
                                            // 肠外热卡（kcal/kg/d）
                                            if (notNullTool(intravenousNutritionCalorieKcalPKgPD)) {
                                                $(".pc-db-BDDGSTNM .pc-db-item-table>table.pc-db-table>tbody>tr>td.pc-db-table-textInput>input[name=milkTo" + j + "ParenteralCalorieKcalPKgPD]").val(intravenousNutritionCalorieKcalPKgPD);
                                            }
                                            // 合计蛋白（g/d）
                                            if (totalProteinGPD > 0) {
                                                $(".pc-db-BDDGSTNM .pc-db-item-table>table.pc-db-table>tbody>tr>td.pc-db-table-textInput>input[name=milkTo" + j + "TotalProteinGPD]").val(totalProteinGPD);
                                            }
                                            // 合计蛋白（g/kg/d）
                                            if (totalProteinGPKgPD > 0) {
                                                $(".pc-db-BDDGSTNM .pc-db-item-table>table.pc-db-table>tbody>tr>td.pc-db-table-textInput>input[name=milkTo" + j + "TotalProteinGPKgPD]").val(totalProteinGPKgPD);
                                            }
                                            // 合计热卡（kcal/d）
                                            if (notNullTool(totalCalorieKcalPD)) {
                                                $(".pc-db-BDDGSTNM .pc-db-item-table>table.pc-db-table>tbody>tr>td.pc-db-table-textInput>input[name=milkTo" + j + "TotalCalorieKcalPD]").val(totalCalorieKcalPD);
                                            }
                                            // 合计热卡（kcal/kg/d）
                                            if (notNullTool(totalCalorieKcalPKgPD)) {
                                                $(".pc-db-BDDGSTNM .pc-db-item-table>table.pc-db-table>tbody>tr>td.pc-db-table-textInput>input[name=milkTo" + j + "TotalCalorieKcalPKgPD]").val(totalCalorieKcalPKgPD);
                                            }
                                            milkToNFlag[(j / 10) - 1] = 1;
                                        }
                                    }
                                }
                            }
                        }
                    }
                }, "json");
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
        }

        // 增加 禁食
        let frIndex = 0, fastStartTime = [], fastEndTime = [], fastStartTimeStamp = [0], fastEndTimeStamp = [0];
        $("#PC-db-addFR").on("click", function () {
            const that = this;
            frIndex++;
            sequentialExecution(function () {
                $(that).before(
                    "<div class='layui-col-lg12'>" +
                    "    <div class='pc-db-head'>" +
                    "        <label>第" + frIndex + "次禁食</label>" +
                    "    </div>" +
                    "    <div class='layui-col-lg3'>" +
                    "        <div class='pc-db-item pc-db-item-datetime'>" +
                    "            <label for='PC-db-F" + frIndex + "ST'>开始时间</label>" +
                    "            <input id='PC-db-F" + frIndex + "ST' type='text' name='fast" + frIndex + "StartTime' lay-verify='requiredDB' readonly>" +
                    "            <i class='iconfont icon-rili'></i>" +
                    "        </div>" +
                    "    </div>" +
                    "    <div class='layui-col-lg3'>" +
                    "        <div class='pc-db-item pc-db-item-datetime'>" +
                    "            <label for='PC-db-F" + frIndex + "ET'>结束时间</label>" +
                    "            <input id='PC-db-F" + frIndex + "ET' type='text' name='fast" + frIndex + "EndTime' lay-verify='requiredDB' readonly>" +
                    "            <i class='iconfont icon-rili'></i>" +
                    "        </div>" +
                    "    </div>" +
                    "    <div class='layui-col-lg3'>" +
                    "        <div class='pc-db-item pc-db-item-unit'>" +
                    "            <label for='PC-db-F" + frIndex + "D'>天数</label>" +
                    "            <input id='PC-db-F" + frIndex + "D' type='number' name='fast" + frIndex + "Days' lay-verify='requiredDB' readonly>" +
                    "            <span>天</span>" +
                    "        </div>" +
                    "    </div>" +
                    "    <div class='layui-col-lg3'>" +
                    "       <button id='PC-db-fr" + frIndex + "Delete' class='pc-btn pc-btn-danger'><i class='iconfont icon-delete'></i> 删除</button>" +
                    "    </div>" +
                    "    <div class='layui-col-lg12'>" +
                    "        <div id='PC-db-FRF' class='pc-db-item'>" +
                    "            <label>禁食原因</label>" +
                    "            <div class='pc-db-item-checkbox'>" +
                    "                <input type='checkbox' name='fast" + frIndex + "ReasonsUnstableBreathing' value='1' title='呼吸不稳定''>" +
                    "                <input type='checkbox' name='fast" + frIndex + "ReasonsGastricRetention' value='1' title='胃潴留'>" +
                    "                <input type='checkbox' name='fast" + frIndex + "ReasonsPdaTreatment' value='1' title='PDA治疗'>" +
                    "                <input type='checkbox' name='fast" + frIndex + "ReasonsUmbilicalVeinCatheter' value='1' title='脐静脉置管'>" +
                    "                <input type='checkbox' name='fast" + frIndex + "ReasonsBloating' value='1' title='腹胀'>" +
                    "                <input type='checkbox' name='fast" + frIndex + "ReasonsBloodInStool' value='1' title='便血'>" +
                    "                <input type='checkbox' name='fast" + frIndex + "ReasonsVomit' value='1' title='呕吐'>" +
                    "                <input type='checkbox' name='fast" + frIndex + "ReasonsGastroesophagealReflux' value='1' title='胃食管反流'>" +
                    "                <input type='checkbox' title='其他' lay-filter='other'>" +
                    "                <input type='text' data-name='fast" + frIndex + "ReasonsOther' disabled>" +
                    "            </div>" +
                    "        </div>" +
                    "    </div>" +
                    "</div>");
            }, function () {
                form.render("select");
                const i = frIndex;
                laydate.render({
                    elem: "#PC-db-F" + i + "ST",
                    type: "datetime",
                    format: "yyyy-MM-dd HH:mm:ss",
                    max: 1,
                    done: function (value, date) {
                        if(value !== "") {
                            fastStartTime[i] = date.year + "-" + date.month + "-" + date.date +  ' ' + date.hours + ':' + date.minutes + ':' + date.seconds;
                            fastStartTimeStamp[i] = Date.parse(fastStartTime[i]);
                            if (notNullTool(fastEndTime[i])) {
                                if (fastStartTimeStamp[i] <= fastEndTimeStamp[i]) {
                                    $("#PC-db-F" + i + "D").val(Math.ceil((fastEndTimeStamp[i] - fastStartTimeStamp[i])/86400000));
                                    // 禁食时长合计
                                    let daySum = 0;
                                    for (let j = 1; j <= frIndex; j++) {
                                        const fastDaysInput = $("#PC-db-F" + j + "D").val();
                                        if (notNullTool(fastDaysInput)) {
                                            daySum += parseInt(fastDaysInput);
                                        }
                                    }
                                    $("#PC-db-FD").val(daySum);
                                } else {
                                    layer.msg("开始时间必须<span class='layui-badge'>早于</span>结束时间！", {
                                        icon: 5,
                                        time: 1000,
                                        anim: 6,
                                        btn: "好",
                                        resize: false,
                                        shade: 0.8
                                    }, function () {
                                        $("#PC-db-F" + i + "ST").val("");
                                        fastStartTime[i] = null;
                                        fastStartTimeStamp[i] = 0;
                                    });
                                }
                            }
                        }else {
                            fastStartTime[i] = null;
                            fastStartTimeStamp[i] = 0;
                        }
                    }
                });
                laydate.render({
                    elem: "#PC-db-F" + i + "ET",
                    type: "datetime",
                    format: "yyyy-MM-dd HH:mm:ss",
                    max: 1,
                    done: function (value, date) {
                        if(value !== "") {
                            fastEndTime[i] = date.year + "-" + date.month + "-" + date.date +  ' ' + date.hours + ':' + date.minutes + ':' + date.seconds;
                            fastEndTimeStamp[i] = Date.parse(fastEndTime[i]);
                            if (notNullTool(fastStartTime[i])) {
                                if (fastStartTimeStamp[i] <= fastEndTimeStamp[i]) {
                                    $("#PC-db-F" + i + "D").val(Math.ceil((fastEndTimeStamp[i] - fastStartTimeStamp[i])/86400000));
                                    // 禁食时长合计
                                    let daySum = 0;
                                    for (let j = 1; j <= frIndex; j++) {
                                        const fastDaysInput = $("#PC-db-F" + j + "D").val();
                                        if (notNullTool(fastDaysInput)) {
                                            daySum += parseInt(fastDaysInput);
                                        }
                                    }
                                    $("#PC-db-FD").val(daySum);
                                } else {
                                    layer.msg("结束时间必须<span class='layui-badge'>晚于</span>开始时间！", {
                                        icon: 5,
                                        time: 1000,
                                        anim: 6,
                                        btn: "好",
                                        resize: false,
                                        shade: 0.8
                                    }, function () {
                                        $("#PC-db-F" + i + "ET").val("");
                                        fastEndTime[i] = null;
                                        fastEndTimeStamp[i] = 0;
                                    });
                                }
                            }
                        }else {
                            fastEndTime[i] = null;
                            fastEndTimeStamp[i] = 0;
                        }
                    }
                });
                // 禁食原因其他选择 后面的输入
                form.on("checkbox(other)", function (data) {
                    if (data.elem.checked) {
                        $(data.elem).nextAll("input[type=text]").removeAttr("disabled").attr("lay-verify", "requiredDB").attr("name", function () {
                            return $(this).attr("data-name");
                        });
                    } else {
                        $(data.elem).nextAll("input[type=text]").attr("disabled", true).removeAttr("name lay-verify").val("");
                    }
                });
                $("#PC-db-fr" + i + "Delete").on("click", function () {
                    layer.msg("确定要 <span class='pc-db-status-color-no'>删除</span> 此条数据吗?",{
                        icon: 7,
                        time: 0,
                        anim: 6,
                        btn: ["确定", "取消"],
                        resize: false,
                        shade: 0.8,
                        yes: function (index) {
                            $("#PC-db-fr" + i + "Delete").parent("div").parent("div").remove();
                            // 禁食次数
                            const fastingTimes = $(".pc-db-BDDGSFR>div.layui-col-lg12").length;
                            $("#PC-db-FT").val(fastingTimes);
                            if (fastingTimes === 0) {
                                form.val("DGSFR", {fasting: false});
                            } else {
                                form.val("DGSFR", {fasting: true});
                            }
                            // 禁食时长合计
                            let daySum = 0;
                            for (let j = 1; j <= frIndex; j++) {
                                const fastDaysInput = $("#PC-db-fast" + j + "Days").val();
                                if (notNullTool(fastDaysInput)) {
                                    daySum += parseInt(fastDaysInput);
                                }
                            }
                            $("#PC-db-FD").val(daySum);
                            $("#PC-db-fasting>.layui-form-switch").off("click");
                            layer.close(index);
                        }
                    });
                });
                // 禁食次数
                const fastingTimes = $(".pc-db-BDDGSFR>div.layui-col-lg12").length;
                $("#PC-db-FT").val(fastingTimes);
                if (fastingTimes === 0) {
                    form.val("DGSFR", {fasting: false});
                } else {
                    form.val("DGSFR", {fasting: true});
                }
                $("#PC-db-fasting>.layui-form-switch").off("click");
            });
        });

        // 禁食 初始化
        const dataLenInput = $(".pc-db-BDDGSFR").attr("data-dataLen");
        if (notNullTool(dataLenInput)) {
            frIndex = parseInt(dataLenInput);
            for (let i = 0; i < frIndex; i++) {
                const index = i + 1;
                const fastStartTimeInput = $("#PC-db-F" + index + "ST").val();
                if (notNullTool(fastStartTimeInput)) {
                    fastStartTime[index] = fastStartTimeInput;
                    fastStartTimeStamp[index] = Date.parse(fastStartTime[index]);
                }
                laydate.render({
                    elem: "#PC-db-F" + index + "ST",
                    type: "datetime",
                    format: "yyyy-MM-dd HH:mm:ss",
                    max: 1,
                    done: function (value, date) {
                        if(value !== "") {
                            fastStartTime[index] = date.year + "-" + date.month + "-" + date.date +  ' ' + date.hours + ':' + date.minutes + ':' + date.seconds;
                            fastStartTimeStamp[index] = Date.parse(fastStartTime[index]);
                            if (notNullTool(fastEndTime[index])) {
                                if (fastStartTimeStamp[index] <= fastEndTimeStamp[index]) {
                                    $("#PC-db-F" + index + "D").val(Math.ceil((fastEndTimeStamp[index] - fastStartTimeStamp[index])/86400000));
                                    // 禁食时长合计
                                    let daySum = 0;
                                    for (let j = 1; j <= frIndex; j++) {
                                        const fastDaysInput = $("#PC-db-F" + j + "D").val();
                                        if (notNullTool(fastDaysInput)) {
                                            daySum += parseInt(fastDaysInput);
                                        }
                                    }
                                    $("#PC-db-FD").val(daySum);
                                } else {
                                    layer.msg("开始时间必须<span class='layui-badge'>早于</span>结束时间！", {
                                        icon: 5,
                                        time: 1000,
                                        anim: 6,
                                        btn: "好",
                                        resize: false,
                                        shade: 0.8
                                    }, function () {
                                        $("#PC-db-F" + index + "ST").val("");
                                        fastStartTime[index] = null;
                                        fastStartTimeStamp[index] = 0;
                                    });
                                }
                            }
                        } else {
                            fastStartTime[index] = null;
                            fastStartTimeStamp[index] = 0;
                        }
                    }
                });
                laydate.render({
                    elem: "#PC-db-F" + index + "ET",
                    type: "datetime",
                    format: "yyyy-MM-dd HH:mm:ss",
                    max: 1,
                    done: function (value, date) {
                        if(value !== "") {
                            fastEndTime[index] = date.year + "-" + date.month + "-" + date.date +  ' ' + date.hours + ':' + date.minutes + ':' + date.seconds;
                            fastEndTimeStamp[index] = Date.parse(fastEndTime[index]);
                            if (notNullTool(fastStartTime[index])) {
                                if (fastStartTimeStamp[index] <= fastEndTimeStamp[index]) {
                                    $("#PC-db-F" + index + "D").val(Math.ceil((fastEndTimeStamp[index] - fastStartTimeStamp[index])/86400000));
                                    // 禁食时长合计
                                    let daySum = 0;
                                    for (let j = 1; j <= frIndex; j++) {
                                        const fastDaysInput = $("#PC-db-F" + j + "D").val();
                                        if (notNullTool(fastDaysInput)) {
                                            daySum += parseInt(fastDaysInput);
                                        }
                                    }
                                    $("#PC-db-FD").val(daySum);
                                } else {
                                    layer.msg("结束时间必须<span class='layui-badge'>晚于</span>开始时间！", {
                                        icon: 5,
                                        time: 1000,
                                        anim: 6,
                                        btn: "好",
                                        resize: false,
                                        shade: 0.8
                                    }, function () {
                                        $("#PC-db-F" + index + "ET").val("");
                                        fastEndTime[index] = null;
                                        fastEndTimeStamp[index] = 0;
                                    });
                                }
                            }
                        } else {
                            fastEndTime[index] = null;
                            fastEndTimeStamp[index] = 0;
                        }
                    }
                });
                // 禁食原因其他选择 后面的输入
                form.on("checkbox(other)", function (data) {
                    if (data.elem.checked) {
                        $(data.elem).nextAll("input[type=text]").removeAttr("disabled").attr("lay-verify", "requiredDB").attr("name", function () {
                            return $(this).attr("data-name");
                        });
                    } else {
                        $(data.elem).nextAll("input[type=text]").attr("disabled", true).removeAttr("name lay-verify").val("");
                    }
                });
                $("#PC-db-fr" + index + "Delete").on("click", function () {
                    layer.msg("确定要 <span class='pc-db-status-color-no'>删除</span> 此条数据吗?",{
                        icon: 7,
                        time: 0,
                        anim: 6,
                        btn: ["确定", "取消"],
                        resize: false,
                        shade: 0.8,
                        yes: function (index) {
                            $("#PC-db-fr" + index + "Delete").parent("div").parent("div").remove();
                            // 禁食次数
                            const fastingTimes = $(".pc-db-BDDGSFR>div.layui-col-lg12").length;
                            $("#PC-db-FT").val(fastingTimes);
                            if (fastingTimes === 0) {
                                form.val("DGSFR", {fasting: false});
                            } else {
                                form.val("DGSFR", {fasting: true});
                            }
                            // 禁食时长合计
                            let daySum = 0;
                            for (let j = 1; j <= frIndex; j++) {
                                const fastDaysInput = $("#PC-db-fast" + j + "Days").val();
                                if (notNullTool(fastDaysInput)) {
                                    daySum += parseInt(fastDaysInput);
                                }
                            }
                            $("#PC-db-FD").val(daySum);
                            $("#PC-db-fasting>.layui-form-switch").off("click");
                            layer.close(index);
                        }
                    });
                });
            }
        }

        // 基础数据库 消化系统 禁食原因 添加/编辑 信息 提交
        form.on("submit(DGSFR)", function (data) {
            const doing = "保存信息";
            loading(doing);
            let field = data.field, frArray = [];
            for (let i = 1; i <= frIndex; i++) {
                if (field["fast" + i + "StartTime"] !== undefined) {
                    let thisJson = {};
                    thisJson.fastTime = field["fast" + i + "Time"];
                    thisJson.fastStartTime = field["fast" + i + "StartTime"];
                    thisJson.fastEndTime = field["fast" + i + "EndTime"];
                    thisJson.fastDays = field["fast" + i + "Days"];
                    delete field["fast" + i + "StartTime"];
                    delete field["fast" + i + "EndTime"];
                    delete field["fast" + i + "Days"];
                    if (field["fast" + i + "ReasonsUnstableBreathing"] !== undefined) {
                        thisJson.fastReasonsUnstableBreathing = field["fast" + i + "ReasonsUnstableBreathing"];
                        delete field["fast" + i + "ReasonsUnstableBreathing"];
                    }
                    if (field["fast" + i + "ReasonsGastricRetention"] !== undefined) {
                        thisJson.fastReasonsGastricRetention = field["fast" + i + "ReasonsGastricRetention"];
                        delete field["fast" + i + "ReasonsGastricRetention"];
                    }
                    if (field["fast" + i + "ReasonsPdaTreatment"] !== undefined) {
                        thisJson.fastReasonsPdaTreatment = field["fast" + i + "ReasonsPdaTreatment"];
                        delete field["fast" + i + "ReasonsPdaTreatment"];
                    }
                    if (field["fast" + i + "ReasonsUmbilicalVeinCatheter"] !== undefined) {
                        thisJson.fastReasonsUmbilicalVeinCatheter = field["fast" + i + "ReasonsUmbilicalVeinCatheter"];
                        delete field["fast" + i + "ReasonsUmbilicalVeinCatheter"];
                    }
                    if (field["fast" + i + "ReasonsBloating"] !== undefined) {
                        thisJson.fastReasonsBloating = field["fast" + i + "ReasonsBloating"];
                        delete field["fast" + i + "ReasonsBloating"];
                    }
                    if (field["fast" + i + "ReasonsBloodInStool"] !== undefined) {
                        thisJson.fastReasonsBloodInStool = field["fast" + i + "ReasonsBloodInStool"];
                        delete field["fast" + i + "ReasonsBloodInStool"];
                    }
                    if (field["fast" + i + "ReasonsVomit"] !== undefined) {
                        thisJson.fastReasonsVomit = field["fast" + i + "ReasonsVomit"];
                        delete field["fast" + i + "ReasonsVomit"];
                    }
                    if (field["fast" + i + "ReasonsGastroesophagealReflux"] !== undefined) {
                        thisJson.fastReasonsGastroesophagealReflux = field["fast" + i + "ReasonsGastroesophagealReflux"];
                        delete field["fast" + i + "ReasonsGastroesophagealReflux"];
                    }
                    if (field["fast" + i + "ReasonsOther"] !== undefined) {
                        thisJson.fastReasonsOther = field["fast" + i + "ReasonsOther"];
                        delete field["fast" + i + "ReasonsOther"];
                    }
                    frArray.push(thisJson);
                }
            }
            field.frArray = JSON.stringify(frArray);
            $.post("/perinatalPlatform/basicDatabase/write/DGS/FR/post", field, function (back, status) {
                if(status === "success") {
                    if(back.code) {
                        successNext();
                    }else {failMsg(doing)}
                }else {errorMsg1()}
            }, "json").fail(function () {errorMsg2()});
        });

        // 喂养不耐受或胃肠道症状 开始结束时间
        startEndDatetime(laydate, "FIOGSST", "FIOGSET");

        // 胃肠减压开关 后面的时间
        form.on("switch(GD)", function (data) {
            if (data.elem.checked) {
                $("#PC-db-GDST, #PC-db-GDET").removeAttr("disabled").attr("lay-verify", "requiredDB").attr("name", function () {
                   return $(this).attr("data-name");
                });
            } else {
                $("#PC-db-GDST, #PC-db-GDET").removeAttr("name lay-verify").attr("disabled", true).val("");
            }
        });

        // 胃肠减压 开始结束时间
        startEndDatetime(laydate, "GDST", "GDET");

        // NEC开关 后面所有输入框
        form.on("switch(NEC)", function (data) {
            if (data.elem.checked) {
                $("#PC-db-NECDD").removeAttr("disabled").attr("lay-verify", "requiredDB").attr("name", function () {
                    return $(this).attr("data-name");
                });
                $("#PC-db-NECS>input").attr("lay-verify", "requiredRadioGroup").attr("name", function () {
                    return $(this).attr("data-name");
                });
                $("#PC-db-NECS>.pc-db-radioBtn-group").removeClass("rbgOff");
                $("#PC-db-NECS>.pc-db-radioBtn-group>li").on("click", function () {
                    activeRBGChoice(this);
                });
                $("#PC-db-BNEC>.pc-db-item-checkbox>input[type=checkbox], #PC-db-DB>.pc-db-item-checkbox>input[type=checkbox], #PC-db-DS>.pc-db-item-checkbox>input[type=checkbox], #PC-db-AR>.pc-db-item-checkbox>input[type=checkbox], #PC-db-CU>.pc-db-item-checkbox>input[type=checkbox], #PC-db-IMCT, #PC-db-OT").removeAttr("disabled");
                setTimeout(function () {
                    form.render();
                }, 200);
            } else {
                $("#PC-db-NECDD, #PC-db-GDET").removeAttr("name lay-verify").attr("disabled", true).val("");
                $("#PC-db-NECS>input, #PC-db-IMCTF>input, #PC-db-OTR>input, #PC-db-OTF>input").removeAttr("name value lay-verify");
                $("#PC-db-NECS>.pc-db-radioBtn-group, #PC-db-IMCTF>.pc-db-radioBtn-group, #PC-db-OTR>.pc-db-radioBtn-group, #PC-db-OTF>.pc-db-radioBtn-group").addClass("rbgOff");
                $("#PC-db-NECS>.pc-db-radioBtn-group>li, #PC-db-IMCTF>.pc-db-radioBtn-group>li, #PC-db-OTR>.pc-db-radioBtn-group>li, #PC-db-OTF>.pc-db-radioBtn-group>li").removeAttr("class").off("click");
                $("#PC-db-BNEC>.pc-db-item-checkbox>input[type=checkbox], #PC-db-DB>.pc-db-item-checkbox>input[type=checkbox], #PC-db-DS>.pc-db-item-checkbox>input[type=checkbox], #PC-db-AR>.pc-db-item-checkbox>input[type=checkbox], #PC-db-CU>.pc-db-item-checkbox>input[type=checkbox], #PC-db-IMCT, #PC-db-OT").attr("disabled", true);
                setTimeout(function () {
                    form.val("BDDGSFIN", {
                        beforeNecVasoactiveDrugs: false,
                        beforeNecFluidResuscitation: false,
                        beforeNecHeparin: false,
                        beforeNecBloodTransfusion: false,
                        beforeNecCBall: false,
                        beforeNecGlucocorticoid: false,
                        diagnosisBasisClinicalSymptoms: false,
                        diagnosisBasisAuxiliaryExamination: false,
                        digestiveSymptomsBowelSoundsWeakenAndDisappear: false,
                        digestiveSymptomsGrossBloodyStool: false,
                        digestiveSymptomsFecalOccultBlood: false,
                        digestiveSymptomsUpperGastrointestinalBleeding: false,
                        digestiveSymptomsTightAbdominalWall: false,
                        digestiveSymptomsAbdominalTenderness: false,
                        abdominalRadiographWidenedIntestinalSpace: false,
                        abdominalRadiographBowelWallGas: false,
                        abdominalRadiographHilarPneumoperitoneum: false,
                        abdominalRadiographIntestinalObstruction: false,
                        abdominalRadiographBowelPerforation: false,
                        colorUltrasoundPneumaticPortalVein: false,
                        colorUltrasoundAscites: false,
                        internalMedicineConservativeTreatment: false,
                        operationTreatment: false
                    });
                    form.render();
                }, 200);
            }
        });

        // 内科保守治疗开关 后面所有输入框
        form.on("switch(IMCT)", function (data) {
            if (data.elem.checked) {
                $("#PC-db-IMCTF>input").attr("lay-verify", "requiredRadioGroup").attr("name", function () {
                    return $(this).attr("data-name");
                });
                $("#PC-db-IMCTF>.pc-db-radioBtn-group").removeClass("rbgOff");
                $("#PC-db-IMCTF>.pc-db-radioBtn-group>li").on("click", function () {
                    activeRBGChoice(this);
                });
            } else {
                $("#PC-db-IMCTF>input").removeAttr("name value lay-verify");
                $("#PC-db-IMCTF>.pc-db-radioBtn-group").addClass("rbgOff");
                $("#PC-db-IMCTF>.pc-db-radioBtn-group>li").removeAttr("class").off("click");
            }
        });

        // 手术治疗开关 后面所有输入框
        form.on("switch(OT)", function (data) {
            if (data.elem.checked) {
                $("#PC-db-OTR>input, #PC-db-OTF>input").attr("lay-verify", "requiredRadioGroup").attr("name", function () {
                    return $(this).attr("data-name");
                });
                $("#PC-db-OTR>.pc-db-radioBtn-group, #PC-db-OTF>.pc-db-radioBtn-group").removeClass("rbgOff");
                $("#PC-db-OTR>.pc-db-radioBtn-group>li, #PC-db-OTF>.pc-db-radioBtn-group>li").on("click", function () {
                    activeRBGChoice(this);
                });
            } else {
                $("#PC-db-OTR>input, #PC-db-OTF>input").removeAttr("name value lay-verify");
                $("#PC-db-OTR>.pc-db-radioBtn-group, #PC-db-OTF>.pc-db-radioBtn-group").addClass("rbgOff");
                $("#PC-db-OTR>.pc-db-radioBtn-group>li, #PC-db-OTF>.pc-db-radioBtn-group>li").removeAttr("class").off("click");
            }
        });

        // NEC 诊断日期
        laydate.render({
            elem: "#PC-db-NECDD",
            type: "datetime",
            format: "yyyy-MM-dd HH:mm:ss",
            max: 1
        });

        // 基础数据库 消化系统 喂养不耐受与NEC 添加/编辑 信息 提交
        form.on("submit(DGSFIN)", function (data) {
            const doing = "保存信息";
            loading(doing);
            $.post("/perinatalPlatform/basicDatabase/write/DGS/FIN/post", data.field, function (back, status) {
                if(status === "success") {
                    if(back.code) {
                        successNext();
                    }else {failMsg(doing)}
                }else {errorMsg1()}
            }, "json").fail(function () {errorMsg2()});
        });

        // NEC相关消化道穿孔诊断时间
        laydate.render({
            elem: "#PC-db-NECRDTPDT",
            type: "datetime",
            format: "yyyy-MM-dd HH:mm:ss",
            max: 1
        });

        // 首次自发性穿孔发生时间
        laydate.render({
            elem: "#PC-db-FSPT",
            type: "datetime",
            format: "yyyy-MM-dd HH:mm:ss",
            max: 1
        });

        // 新生儿胆汁淤积综合征开关 后面所有输入框
        form.on("switch(NCS)", function (data) {
            if (data.elem.checked) {
                $("#PC-db-NCSDT, #PC-db-TB, #PC-db-DB, #PC-db-AST, #PC-db-ALT, #PC-db-TBA").removeAttr("disabled").attr("lay-verify", "requiredDB").attr("name", function () {
                    return $(this).attr("data-name");
                });
            } else {
                $("#PC-db-NCSDT, #PC-db-TB, #PC-db-DB, #PC-db-AST, #PC-db-ALT, #PC-db-TBA").removeAttr("name lay-verify").attr("disabled", true).val("");
            }
        });

        // 新生儿胆汁淤积综合征 诊断时间
        laydate.render({
            elem: "#PC-db-NCSDT",
            type: "datetime",
            format: "yyyy-MM-dd HH:mm:ss",
            max: 1
        });

        // 基础数据库 消化系统 其它诊断与治疗 添加/编辑 信息 提交
        form.on("submit(DGSODT)", function (data) {
            const doing = "保存信息";
            loading(doing);
            $.post("/perinatalPlatform/basicDatabase/write/DGS/ODT/post", data.field, function (back, status) {
                if(status === "success") {
                    if(back.code) {
                        successNext();
                    }else {failMsg(doing)}
                }else {errorMsg1()}
            }, "json").fail(function () {errorMsg2()});
        });

        // 基础数据库 消化系统 过渡期营养管理 添加/编辑 信息 提交
        form.on("submit(DGSTNM)", function (data) {
            const doing = "保存信息";
            loading(doing);
            let field = data.field, tnmDataArray = [];
            for (let i = 10; i <= 150; i += 10) {
                if (notNullTool(field["milkTo" + i + "Date"]) || notNullTool(field["milkTo" + i + "DaysAfterBirth"]) || notNullTool(field["milkTo" + i + "CorrectGestationalAgeWeek"]) ||
                    notNullTool(field["milkTo" + i + "CorrectGestationalAgeDay"]) || notNullTool(field["milkTo" + i + "Weight"]) || notNullTool(field["milkTo" + i + "WeightZScore"]) ||
                    notNullTool(field["milkTo" + i + "ActualEnteralNutrition"]) || notNullTool(field["milkTo" + i + "EnteralAminoAcidsGPD"]) ||
                    notNullTool(field["milkTo" + i + "EnteralAminoAcidsGPKgPD"]) || notNullTool(field["milkTo" + i + "EnteralCalorieKcalPD"]) ||
                    notNullTool(field["milkTo" + i + "EnteralCalorieKcalPKgPD"]) || notNullTool(field["milkTo" + i + "ParenteralAminoAcidsGPD"]) ||
                    notNullTool(field["milkTo" + i + "ParenteralAminoAcidsGPKgPD"]) || notNullTool(field["milkTo" + i + "ParenteralCalorieKcalPD"]) ||
                    notNullTool(field["milkTo" + i + "ParenteralCalorieKcalPKgPD"]) || notNullTool(field["milkTo" + i + "TotalProteinGPKgPD"]) ||
                    notNullTool(field["milkTo" + i + "TotalProteinGPD"]) || notNullTool(field["milkTo" + i + "TotalCalorieKcalPD"]) ||
                    notNullTool(field["milkTo" + i + "TotalCalorieKcalPKgPD"])) {
                    tnmDataArray.push({
                        milkToN: i,
                        milkToNDate: field["milkTo" + i + "Date"],
                        milkToNDaysAfterBirth: field["milkTo" + i + "DaysAfterBirth"],
                        milkToNCorrectGestationalAgeWeek: field["milkTo" + i + "CorrectGestationalAgeWeek"],
                        milkToNCorrectGestationalAgeDay: field["milkTo" + i + "CorrectGestationalAgeDay"],
                        milkToNWeight: field["milkTo" + i + "Weight"],
                        milkToNWeightZScore: field["milkTo" + i + "WeightZScore"],
                        milkToNActualEnteralNutrition: field["milkTo" + i + "ActualEnteralNutrition"],
                        milkToNEnteralAminoAcidsGPD: field["milkTo" + i + "EnteralAminoAcidsGPD"],
                        milkToNEnteralAminoAcidsGPKgPD: field["milkTo" + i + "EnteralAminoAcidsGPKgPD"],
                        milkToNEnteralCalorieKcalPD: field["milkTo" + i + "EnteralCalorieKcalPD"],
                        milkToNEnteralCalorieKcalPKgPD: field["milkTo" + i + "EnteralCalorieKcalPKgPD"],
                        milkToNParenteralAminoAcidsGPD: field["milkTo" + i + "ParenteralAminoAcidsGPD"],
                        milkToNParenteralAminoAcidsGPKgPD: field["milkTo" + i + "ParenteralAminoAcidsGPKgPD"],
                        milkToNParenteralCalorieKcalPD: field["milkTo" + i + "ParenteralCalorieKcalPD"],
                        milkToNParenteralCalorieKcalPKgPD: field["milkTo" + i + "ParenteralCalorieKcalPKgPD"],
                        milkToNTotalProteinGPKgPD: field["milkTo" + i + "TotalProteinGPKgPD"],
                        milkToNTotalProteinGPD: field["milkTo" + i + "TotalProteinGPD"],
                        milkToNTotalCalorieKcalPD: field["milkTo" + i + "TotalCalorieKcalPD"],
                        milkToNTotalCalorieKcalPKgPD: field["milkTo" + i + "TotalCalorieKcalPKgPD"]
                    });
                }
                delete field["milkTo" + i + "Date"];
                delete field["milkTo" + i + "DaysAfterBirth"];
                delete field["milkTo" + i + "CorrectGestationalAgeWeek"];
                delete field["milkTo" + i + "CorrectGestationalAgeDay"];
                delete field["milkTo" + i + "Weight"];
                delete field["milkTo" + i + "WeightZScore"];
                delete field["milkTo" + i + "ActualEnteralNutrition"];
                delete field["milkTo" + i + "EnteralAminoAcidsGPD"];
                delete field["milkTo" + i + "EnteralAminoAcidsGPKgPD"];
                delete field["milkTo" + i + "EnteralCalorieKcalPD"];
                delete field["milkTo" + i + "EnteralCalorieKcalPKgPD"];
                delete field["milkTo" + i + "ParenteralAminoAcidsGPD"];
                delete field["milkTo" + i + "ParenteralAminoAcidsGPKgPD"];
                delete field["milkTo" + i + "ParenteralCalorieKcalPD"];
                delete field["milkTo" + i + "ParenteralCalorieKcalPKgPD"];
                delete field["milkTo" + i + "TotalProteinGPKgPD"];
                delete field["milkTo" + i + "TotalProteinGPD"];
                delete field["milkTo" + i + "TotalCalorieKcalPD"];
                delete field["milkTo" + i + "TotalCalorieKcalPKgPD"];
            }
            field.tnmDataArray = JSON.stringify(tnmDataArray);
            $.post("/perinatalPlatform/basicDatabase/write/DGS/TNM/post", field, function (back, status) {
                if(status === "success") {
                    if(back.code) {
                        successNext();
                    }else {failMsg(doing)}
                }else {errorMsg1()}
            }, "json").fail(function () {errorMsg2()});
        });

        // 营养评价
        const neElem = $(".pc-db-BDDGSNE:eq(0)"),
            neBirthdayInput = $(neElem).attr("data-birthday"),
            childHospitalizationDateInput = $(neElem).attr("data-chd"),
            genderInput = $(neElem).attr("data-gender"),
            gaWeekInput = $(neElem).attr("data-gaWeek"), gaDayInput = $(neElem).attr("data-gaDay");

        if (neElem.length > 0) {
            if (notNullTool(neBirthdayInput) && notNullTool(childHospitalizationDateInput) && notNullTool(genderInput) && notNullTool(gaWeekInput) && notNullTool(gaDayInput)) {
                const birthdayStamp = Date.parse(neBirthdayInput),
                    childHospitalizationDateStamp = Date.parse(childHospitalizationDateInput),
                    gender = genderInput, birthGestationalAgeWeek = parseInt(gaWeekInput), birthGestationalAgeDay = parseInt(gaDayInput);

                // 获取 营养评价 初始化数据
                $.get("/perinatalPlatform/basicDatabase/write/DGS/NE/getInitialData", function (back, status) {
                    if (status === "success") {
                        if (back.code) {
                            layer.msg("出生日期、胎龄、入院日期等信息 修改后，请务必再次保存此页！");
                            const initialData = back.initialData,
                                birthWHcBl = initialData.birthWHcBl,
                                giList = initialData.giList,
                                regainBirthWeightTimeStamp = initialData.regainBirthWeightTime,
                                dischargeSituation = initialData.dischargeSituation;

                            let birthWeightRecoveryDayAge = 0, formJson = {};
                            // 出生日期
                            formJson.birthTime = dateFormatDay(birthdayStamp);
                            // 出生体重
                            const birthWeight = parseFloat(birthWHcBl.birthWeight);
                            formJson.birthWeight = birthWeight;
                            // 出生胎龄（周）
                            formJson.birthGestationalAgeWeek = birthGestationalAgeWeek;
                            // 出生胎龄（天）
                            formJson.birthGestationalAgeDay = birthGestationalAgeDay;
                            // 出生体重Z评分
                            const birthWeightZScore = computeWeightZScore(birthWeight / 1000, birthGestationalAgeWeek, gender);
                            formJson.birthWeightZScore = birthWeightZScore;
                            // 小于胎龄儿
                            formJson.smallForGestationalAge = computeWeightRetardation(birthWeight, birthGestationalAgeWeek, gender);
                            if (notNullTool(regainBirthWeightTimeStamp)) {
                                // 恢复出生体重日龄
                                birthWeightRecoveryDayAge = Math.ceil((regainBirthWeightTimeStamp - birthdayStamp) / 86400000);
                                formJson.birthWeightRecoveryDayAge = birthWeightRecoveryDayAge;
                            }
                            // 出生头围
                            const birthHeadCircumference = parseFloat(birthWHcBl.birthHeadCircumference);
                            formJson.birthHeadCircumference = birthHeadCircumference;
                            // 出生头围z评分
                            const birthHeadCircumferenceZScore = computeHeadCircumferenceZScore(birthHeadCircumference, birthGestationalAgeWeek, gender);
                            formJson.birthHeadCircumferenceZScore = birthHeadCircumferenceZScore;
                            // 宫内头围发育迟缓
                            formJson.intrauterineHeadCircumferenceGrowthRetardation = computeHeadCircumferenceRetardation(birthHeadCircumference, birthGestationalAgeWeek, gender);
                            // 出生身长
                            const birthBodyLength = parseFloat(birthWHcBl.birthLength);
                            formJson.birthBodyLength = birthBodyLength;
                            // 出生身长z评分
                            const birthBodyLengthZScore = computeBodyLengthZScore(birthBodyLength, birthGestationalAgeWeek, gender);
                            formJson.birthBodyLengthZScore = birthBodyLengthZScore;
                            // 宫内身长发育迟缓
                            formJson.intrauterineBodyLengthGrowthRetardation = computeBodyLengthRetardation(birthHeadCircumference, birthGestationalAgeWeek, gender);

                            let birthAfterNDay = "";
                            for (let i = 1; i <= 4; i++) {
                                // 计算生后n天日期、在入院后的天数
                                const dayAfterBirth = i * 7,
                                    afterBirthNDayTimeStamp = birthdayStamp + (dayAfterBirth - 1) * 86400000,
                                    dayAfterHospitalization = Math.ceil((afterBirthNDayTimeStamp - childHospitalizationDateStamp) / 86400000) + 1,
                                    afterBirthNDayGestationalAgeWeek = birthGestationalAgeWeek + i;
                                // 生后n天日期
                                formJson["afterBirth" + dayAfterBirth + "DayTime"] = dateFormatDay(afterBirthNDayTimeStamp);
                                // 生后n天胎龄（周）
                                formJson["afterBirth" + dayAfterBirth + "DayGestationalAgeWeek"] = afterBirthNDayGestationalAgeWeek;
                                // 生后n天胎龄（天）
                                formJson["afterBirth" + dayAfterBirth + "DayGestationalAgeDay"] = birthGestationalAgeDay;

                                if (dayAfterHospitalization > 0) {
                                    let afterBirthNDayWHcBl, afterBirthNDayWeightInput, afterBirthNDayHeadCircumferenceInput, afterBirthNDayBodyLengthInput;
                                    for (let i in giList) {
                                        if (dayAfterHospitalization == giList[i].day) {
                                            afterBirthNDayWHcBl = giList[i];
                                            break;
                                        }
                                    }
                                    if (notNullTool(afterBirthNDayWHcBl)) {
                                        afterBirthNDayWeightInput = afterBirthNDayWHcBl.weight;
                                        afterBirthNDayHeadCircumferenceInput = afterBirthNDayWHcBl.headCircumference;
                                        afterBirthNDayBodyLengthInput = afterBirthNDayWHcBl.bodyLength;
                                    }

                                    if (notNullTool(afterBirthNDayWeightInput)) {
                                        const afterBirthNDayWeightKg = parseFloat(afterBirthNDayWeightInput),
                                            afterBirthNDayWeight = afterBirthNDayWeightKg * 1000;
                                        // 生后n天体重
                                        formJson["afterBirth" + dayAfterBirth + "DayWeight"] = afterBirthNDayWeight;
                                        // 生后n天体重z评分
                                        const afterBirthNDayWeightZScore = computeWeightZScore(afterBirthNDayWeightKg, afterBirthNDayGestationalAgeWeek, gender);
                                        formJson["afterBirth" + dayAfterBirth + "DayWeightZScore"] = afterBirthNDayWeightZScore;
                                        // 生后n天体重z评分的变化值（Δz）
                                        formJson["afterBirth" + dayAfterBirth + "DayWeightZScoreChange"] = (afterBirthNDayWeightZScore - birthWeightZScore).toFixed(2);
                                        // 生后n天 恢复到出生体重后）平均体重增长速度
                                        if (dayAfterBirth - birthWeightRecoveryDayAge !== 0) {
                                            formJson["afterBirth" + dayAfterBirth + "DayAverageWeightGain"] = (1000 * Math.log(afterBirthNDayWeight / birthWeight) / (dayAfterBirth - birthWeightRecoveryDayAge)).toFixed(2);
                                        }
                                    }

                                    if (notNullTool(afterBirthNDayHeadCircumferenceInput)) {
                                        // 生后n天头围
                                        const afterBirthNDayHeadCircumference = parseFloat(afterBirthNDayHeadCircumferenceInput);
                                        formJson["afterBirth" + dayAfterBirth + "DayHeadCircumference"] = afterBirthNDayHeadCircumference;
                                        // 生后n天头围z评分
                                        const afterBirthNDayHeadCircumferenceZScore = computeHeadCircumferenceZScore(afterBirthNDayHeadCircumference, afterBirthNDayGestationalAgeWeek, gender);
                                        formJson["afterBirth" + dayAfterBirth + "DayHeadCircumferenceZScore"] = afterBirthNDayHeadCircumferenceZScore;
                                        // 生后n天头围z评分的变化值（Δz）
                                        formJson["afterBirth" + dayAfterBirth + "DayHeadCircumferenceZScoreChange"] = (afterBirthNDayHeadCircumferenceZScore - birthHeadCircumferenceZScore).toFixed(2);
                                        // 生后n天头围发育迟缓
                                        formJson["afterBirth" + dayAfterBirth + "DayHeadCircumferenceGrowthRetardation"] = computeHeadCircumferenceRetardation(afterBirthNDayHeadCircumferenceZScore, afterBirthNDayGestationalAgeWeek, gender);
                                    }

                                    if (notNullTool(afterBirthNDayBodyLengthInput)) {
                                        // 生后n天身长
                                        const afterBirthNDayBodyLength = parseFloat(afterBirthNDayBodyLengthInput);
                                        formJson["afterBirth" + dayAfterBirth + "DayBodyLength"] = afterBirthNDayBodyLength;
                                        // 生后n天身长z评分
                                        const afterBirthNDayBodyLengthZScore = computeBodyLengthZScore(afterBirthNDayBodyLength, afterBirthNDayGestationalAgeWeek, gender);
                                        formJson["afterBirth" + dayAfterBirth + "DayBodyLengthZScore"] = afterBirthNDayBodyLengthZScore;
                                        // 生后n天身长z评分的变化值（Δz）
                                        formJson["afterBirth" + dayAfterBirth + "DayBodyLengthZScoreChange"] = (afterBirthNDayBodyLengthZScore - birthBodyLengthZScore).toFixed(2);
                                        // 生后n天身长发育迟缓
                                        formJson["afterBirth" + dayAfterBirth + "DayBodyLengthGrowthRetardation"] = computeBodyLengthRetardation(afterBirthNDayBodyLength, afterBirthNDayGestationalAgeWeek, gender);
                                    }
                                } else {
                                    birthAfterNDay += (i * 7);
                                }
                            }

                            if (notNullTool(dischargeSituation)) {
                                const dischargeTimeStamp = dischargeSituation.dischargeDate,
                                    dischargeDayAge = Math.ceil((dischargeTimeStamp - birthdayStamp) / 86400000);
                                // 出院时间
                                formJson.dischargeTime = dateFormatDay(dischargeTimeStamp);
                                // 出院日龄
                                formJson.dischargeDayAge = dischargeDayAge;
                                // 出院体重
                                const dischargeWeight = dischargeSituation.dischargeWeight;
                                formJson.dischargeWeight = dischargeWeight;
                                // 出院体重z评分
                                const dischargeWeightZScore = dischargeSituation.dischargeWeightZScore;
                                formJson.dischargeWeightZScore = dischargeWeightZScore;
                                // 出院纠正胎龄（周）
                                const dischargeGestationalAgeWeek = dischargeSituation.correctGestationalAgeWeek;
                                formJson.dischargeGestationalAgeWeek = dischargeGestationalAgeWeek;
                                // 出院纠正胎龄（天）
                                formJson.dischargeGestationalAgeDay = dischargeSituation.correctGestationalAgeDay;
                                if (notNullTool(dischargeWeightZScore)) {
                                    // 出院体重z评分的变化值（Δz）
                                    formJson.dischargeWeightZScoreChange = (dischargeWeightZScore - birthWeightZScore).toFixed(2);
                                }
                                if (notNullTool(dischargeWeight)) {
                                    // 住院期间（恢复到出生体重后）平均体重增长速度
                                    if (notNullTool(dischargeDayAge)) {
                                        formJson.duringHospitalizationAverageWeightGain = (1000 * Math.log(dischargeWeight / birthWeight) / (dischargeDayAge - birthWeightRecoveryDayAge)).toFixed(2);
                                    }
                                    // 出院宫外发育迟缓
                                    if (notNullTool(dischargeGestationalAgeWeek)) {
                                        formJson.dischargeExtrauterineGrowthRetardation = computeWeightRetardation(dischargeWeight, dischargeGestationalAgeWeek, gender);
                                    }
                                }
                                // 出院头围
                                const dischargeHeadCircumference = dischargeSituation.dischargeHeadCircumference;
                                formJson.dischargeHeadCircumference = dischargeHeadCircumference;
                                // 出院头围z评分
                                const dischargeHeadCircumferenceZScore = dischargeSituation.dischargeHeadCircumferenceZScore;
                                formJson.dischargeHeadCircumferenceZScore = dischargeHeadCircumferenceZScore;
                                if (notNullTool(dischargeHeadCircumferenceZScore)) {
                                    // 出院头围z评分的变化值（Δz）
                                    formJson.dischargeHeadCircumferenceZScoreChange = (dischargeHeadCircumferenceZScore - birthWeightZScore).toFixed(2);
                                }
                                if (notNullTool(dischargeHeadCircumference) && notNullTool(dischargeGestationalAgeWeek)) {
                                    // 出院头围发育迟缓
                                    formJson.dischargeHeadCircumferenceGrowthRetardation = computeHeadCircumferenceRetardation(dischargeHeadCircumference, dischargeGestationalAgeWeek, gender);
                                }
                                // 出院身长
                                const dischargeBodyLength = dischargeSituation.dischargeLength;
                                formJson.dischargeBodyLength = dischargeBodyLength;
                                // 出院身长z评分
                                const dischargeBodyLengthZScore = dischargeSituation.dischargeLengthZScore;
                                formJson.dischargeBodyLengthZScore = dischargeBodyLengthZScore;
                                if (notNullTool(dischargeBodyLengthZScore)) {
                                    // 出院身长z评分的变化值（Δz）
                                    formJson.dischargeBodyLengthZScoreChange = (dischargeBodyLengthZScore - birthWeightZScore).toFixed(2);
                                }
                                if (notNullTool(dischargeBodyLength) && notNullTool(dischargeGestationalAgeWeek)) {
                                    // 出院身长发育迟缓
                                    formJson.dischargeBodyLengthGrowthRetardation = computeBodyLengthRetardation(dischargeBodyLength, dischargeGestationalAgeWeek, gender);
                                }
                            }

                            // 表单 赋值
                            form.val("DGSNE", formJson);
                            $(".pc-db-BDDGSNE .pc-db-item>.layui-form-switch").off("click");
                        }
                    }
                }, "json");

                // 基础数据库 消化系统 营养评价 添加/编辑 信息 提交
                form.on("submit(DGSNE)", function (data) {
                    const doing = "保存信息", field = data.field;
                    loading(doing);
                    for (const key in field) {
                        if (!notNullTool(field[key])) {
                            delete field[key];
                        }
                    }
                    $.post("/perinatalPlatform/basicDatabase/write/DGS/NE/post", field, function (back, status) {
                        if(status === "success") {
                            if(back.code) {
                                successNext();
                            }else {failMsg(doing)}
                        }else {errorMsg1()}
                    },"json").fail(function () {errorMsg2()});
                });
            }
        }
    });
});