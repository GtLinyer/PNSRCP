// 计算 小于胎铃儿 Snappe2 评分
function computeCYTGASnappe2Score(gender, gestationalAge, birthWeight, form) {
    let childYoungerThanGestationalAge = 0;
    switch (gestationalAge) {
        case 22:
            if (gender === "男" && birthWeight < 418) {
                childYoungerThanGestationalAge = 1;
            } else if (gender === "女" && birthWeight < 405) {
                childYoungerThanGestationalAge = 1;
            }
            break;
        case 23:
            if (gender === "男" && birthWeight < 468) {
                childYoungerThanGestationalAge = 1;
            } else if (gender === "女" && birthWeight < 444) {
                childYoungerThanGestationalAge = 1;
            }
            break;
        case 24:
            if (gender === "男" && birthWeight < 516) {
                childYoungerThanGestationalAge = 1;
            } else if (gender === "女" && birthWeight < 486) {
                childYoungerThanGestationalAge = 1;
            }
            break;
        case 25:
            if (gender === "男" && birthWeight < 568) {
                childYoungerThanGestationalAge = 1;
            } else if (gender === "女" && birthWeight < 536) {
                childYoungerThanGestationalAge = 1;
            }
            break;
        case 26:
            if (gender === "男" && birthWeight < 627) {
                childYoungerThanGestationalAge = 1;
            } else if (gender === "女" && birthWeight < 590) {
                childYoungerThanGestationalAge = 1;
            }
            break;
        case 27:
            if (gender === "男" && birthWeight < 700) {
                childYoungerThanGestationalAge = 1;
            } else if (gender === "女" && birthWeight < 642) {
                childYoungerThanGestationalAge = 1;
            }
            break;
        case 28:
            if (gender === "男" && birthWeight < 781) {
                childYoungerThanGestationalAge = 1;
            } else if (gender === "女" && birthWeight < 712) {
                childYoungerThanGestationalAge = 1;
            }
            break;
        case 29:
            if (gender === "男" && birthWeight < 874) {
                childYoungerThanGestationalAge = 1;
            } else if (gender === "女" && birthWeight < 800) {
                childYoungerThanGestationalAge = 1;
            }
            break;
        case 30:
            if (gender === "男" && birthWeight < 990) {
                childYoungerThanGestationalAge = 1;
            } else if (gender === "女" && birthWeight < 900) {
                childYoungerThanGestationalAge = 1;
            }
            break;
        case 31:
            if (gender === "男" && birthWeight < 1124) {
                childYoungerThanGestationalAge = 1;
            } else if (gender === "女" && birthWeight < 1040) {
                childYoungerThanGestationalAge = 1;
            }
            break;
        case 32:
            if (gender === "男" && birthWeight < 1300) {
                childYoungerThanGestationalAge = 1;
            } else if (gender === "女" && birthWeight < 1200) {
                childYoungerThanGestationalAge = 1;
            }
            break;
        case 33:
            if (gender === "男" && birthWeight < 1500) {
                childYoungerThanGestationalAge = 1;
            } else if (gender === "女" && birthWeight < 1400) {
                childYoungerThanGestationalAge = 1;
            }
            break;
        case 34:
            if (gender === "男" && birthWeight < 1720) {
                childYoungerThanGestationalAge = 1;
            } else if (gender === "女" && birthWeight < 1620) {
                childYoungerThanGestationalAge = 1;
            }
            break;
        case 35:
            if (gender === "男" && birthWeight < 1960) {
                childYoungerThanGestationalAge = 1;
            } else if (gender === "女" && birthWeight < 1850) {
                childYoungerThanGestationalAge = 1;
            }
            break;
        case 36:
            if (gender === "男" && birthWeight < 2180) {
                childYoungerThanGestationalAge = 1;
            } else if (gender === "女" && birthWeight < 2070) {
                childYoungerThanGestationalAge = 1;
            }
            break;
        case 37:
            if (gender === "男" && birthWeight < 1390) {
                childYoungerThanGestationalAge = 1;
            } else if (gender === "女" && birthWeight < 2290) {
                childYoungerThanGestationalAge = 1;
            }
            break;
        case 38:
            if (gender === "男" && birthWeight < 2590) {
                childYoungerThanGestationalAge = 1;
            } else if (gender === "女" && birthWeight < 2490) {
                childYoungerThanGestationalAge = 1;
            }
            break;
        case 39:
            if (gender === "男" && birthWeight < 2800) {
                childYoungerThanGestationalAge = 1;
            } else if (gender === "女" && birthWeight < 2670) {
                childYoungerThanGestationalAge = 1;
            }
            break;
        case 40:
            if (gender === "男" && birthWeight < 2980) {
                childYoungerThanGestationalAge = 1;
            } else if (gender === "女" && birthWeight < 2820) {
                childYoungerThanGestationalAge = 1;
            }
            break;
        case 41:
            if (gender === "男" && birthWeight < 3190) {
                childYoungerThanGestationalAge = 1;
            } else if (gender === "女" && birthWeight < 2980) {
                childYoungerThanGestationalAge = 1;
            }
            break;
        case 42:
            if (gender === "男" && birthWeight < 3390) {
                childYoungerThanGestationalAge = 1;
            } else if (gender === "女" && birthWeight < 3150) {
                childYoungerThanGestationalAge = 1;
            }
            break;
        case 43:
            if (gender === "男" && birthWeight < 3600) {
                childYoungerThanGestationalAge = 1;
            } else if (gender === "女" && birthWeight < 3320) {
                childYoungerThanGestationalAge = 1;
            }
            break;
        case 44:
            if (gender === "男" && birthWeight < 3800) {
                childYoungerThanGestationalAge = 1;
            } else if (gender === "女" && birthWeight < 3510) {
                childYoungerThanGestationalAge = 1;
            }
            break;
        case 45:
            if (gender === "男" && birthWeight < 4000) {
                childYoungerThanGestationalAge = 1;
            } else if (gender === "女" && birthWeight < 3690) {
                childYoungerThanGestationalAge = 1;
            }
            break;
        case 46:
            if (gender === "男" && birthWeight < 4220) {
                childYoungerThanGestationalAge = 1;
            } else if (gender === "女" && birthWeight < 3880) {
                childYoungerThanGestationalAge = 1;
            }
            break;
        case 47:
            if (gender === "男" && birthWeight < 4420) {
                childYoungerThanGestationalAge = 1;
            } else if (gender === "女" && birthWeight < 4040) {
                childYoungerThanGestationalAge = 1;
            }
            break;
        case 48:
            if (gender === "男" && birthWeight < 4620) {
                childYoungerThanGestationalAge = 1;
            } else if (gender === "女" && birthWeight < 4220) {
                childYoungerThanGestationalAge = 1;
            }
            break;
        case 49:
            if (gender === "男" && birthWeight < 4800) {
                childYoungerThanGestationalAge = 1;
            } else if (gender === "女" && birthWeight < 4390) {
                childYoungerThanGestationalAge = 1;
            }
            break;
        case 50:
            if (gender === "男" && birthWeight < 5000) {
                childYoungerThanGestationalAge = 1;
            } else if (gender === "女" && birthWeight < 4550) {
                childYoungerThanGestationalAge = 1;
            }
            break;
        default:
            layer.msg("胎龄超出计算 小于胎龄儿 范围！", {
                icon: 5,
                time: 3000,
                anim: 6,
                btn: "好",
                resize: false,
                shade: 0.8
            });
    }
    if (childYoungerThanGestationalAge === 1) {
        try {
            form.val("BDCA", {
                "childYoungerThanGestationalAge": true
            });
        } catch (e) {}
        return 12;
    } else {
        return 0;
    }
}
// 计算 小于胎铃儿 Snappe2 评分
function computeCrib2Score(gender, gestationalAge, birthWeight) {
    switch (gestationalAge) {
        case 22:
            if (gender === "男") {
                if (birthWeight > 250 && birthWeight <= 500) {
                    return 15;
                } else if (birthWeight > 500 && birthWeight <= 750) {
                    return 14;
                }
            } else if (gender === "女") {
                if (birthWeight > 250 && birthWeight <= 500) {
                    return 14;
                } else if (birthWeight > 500 && birthWeight <= 750) {
                    return 13;
                }
            }
            break;
        case 23:
            if (gender === "男") {
                if (birthWeight > 250 && birthWeight <= 500) {
                    return 14;
                } else if (birthWeight > 500 && birthWeight <= 750) {
                    return 13;
                } else if (birthWeight > 750 && birthWeight <= 1250) {
                    return 12;
                }
            } else if (gender === "女") {
                if (birthWeight > 250 && birthWeight <= 500) {
                    return 13;
                } else if (birthWeight > 500 && birthWeight <= 750) {
                    return 12;
                } else if (birthWeight > 750 && birthWeight <= 1250) {
                    return 11;
                }
            }
            break;
        case 24:
            if (gender === "男") {
                if (birthWeight > 250 && birthWeight <= 500) {
                    return 13;
                } else if (birthWeight > 500 && birthWeight <= 750) {
                    return 12;
                } else if (birthWeight > 750 && birthWeight <= 1000) {
                    return 11;
                } else if (birthWeight > 1000 && birthWeight <= 1250) {
                    return 10;
                }
            } else if (gender === "女") {
                if (birthWeight > 250 && birthWeight <= 500) {
                    return 12;
                } else if (birthWeight > 500 && birthWeight <= 750) {
                    return 11;
                } else if (birthWeight > 750 && birthWeight <= 1250) {
                    return 10;
                }
            }
            break;
        case 25:
            if (gender === "男") {
                if (birthWeight > 250 && birthWeight <= 500) {
                    return 12;
                } else if (birthWeight > 500 && birthWeight <= 750) {
                    return 11;
                } else if (birthWeight > 750 && birthWeight <= 1000) {
                    return 10;
                } else if (birthWeight > 1000 && birthWeight <= 1250) {
                    return 9;
                }
            } else if (gender === "女") {
                if (birthWeight > 250 && birthWeight <= 500) {
                    return 11;
                } else if (birthWeight > 500 && birthWeight <= 750) {
                    return 10;
                } else if (birthWeight > 750 && birthWeight <= 1000) {
                    return 9;
                } else if (birthWeight > 1000 && birthWeight <= 1250) {
                    return 8;
                }
            }
            break;
        case 26:
            if (gender === "男") {
                if (birthWeight > 250 && birthWeight <= 500) {
                    return 11;
                } else if (birthWeight > 500 && birthWeight <= 750) {
                    return 10;
                } else if (birthWeight > 750 && birthWeight <= 1500) {
                    return 8;
                }
            } else if (gender === "女") {
                if (birthWeight > 250 && birthWeight <= 500) {
                    return 10;
                } else if (birthWeight > 500 && birthWeight <= 750) {
                    return 9;
                } else if (birthWeight > 750 && birthWeight <= 1000) {
                    return 8;
                } else if (birthWeight > 1000 && birthWeight <= 1500) {
                    return 7;
                }
            }
            break;
        case 27:
            if (gender === "男") {
                if (birthWeight > 250 && birthWeight <= 500) {
                    return 10;
                } else if (birthWeight > 500 && birthWeight <= 750) {
                    return 9;
                } else if (birthWeight > 750 && birthWeight <= 1250) {
                    return 7;
                } else if (birthWeight > 1250 && birthWeight <= 1750) {
                    return 6;
                }
            } else if (gender === "女") {
                if (birthWeight > 250 && birthWeight <= 500) {
                    return 10;
                } else if (birthWeight > 500 && birthWeight <= 750) {
                    return 8;
                } else if (birthWeight > 750 && birthWeight <= 1000) {
                    return 7;
                } else if ((birthWeight > 1000 && birthWeight <= 1250) || (birthWeight > 1500 && birthWeight <= 1750)) {
                    return 6;
                } else if (birthWeight > 1250 && birthWeight <= 1500) {
                    return 5;
                }
            }
            break;
        case 28:
            if (gender === "男") {
                if (birthWeight > 250 && birthWeight <= 500) {
                    return 10;
                } else if (birthWeight > 500 && birthWeight <= 750) {
                    return 8;
                } else if (birthWeight > 750 && birthWeight <= 1000) {
                    return 7;
                } else if (birthWeight > 1000 && birthWeight <= 1250) {
                    return 6;
                } else if (birthWeight > 1250 && birthWeight <= 1750) {
                    return 5;
                }
            } else if (gender === "女") {
                if (birthWeight > 250 && birthWeight <= 500) {
                    return 10;
                } else if (birthWeight > 500 && birthWeight <= 750) {
                    return 8;
                } else if (birthWeight > 750 && birthWeight <= 1000) {
                    return 6;
                } else if (birthWeight > 1000 && birthWeight <= 1250) {
                    return 5;
                } else if (birthWeight > 1250 && birthWeight <= 1750) {
                    return 4;
                }
            }
            break;
        case 29:
            if (gender === "男") {
                if (birthWeight > 500 && birthWeight <= 750) {
                    return 8;
                } else if (birthWeight > 750 && birthWeight <= 1000) {
                    return 6;
                } else if (birthWeight > 1000 && birthWeight <= 1250) {
                    return 5;
                } else if (birthWeight > 1250 && birthWeight <= 2000) {
                    return 3;
                }
            } else if (gender === "女") {
                if (birthWeight > 500 && birthWeight <= 750) {
                    return 7;
                } else if (birthWeight > 750 && birthWeight <= 1000) {
                    return 5;
                } else if (birthWeight > 1000 && birthWeight <= 1250) {
                    return 4;
                } else if (birthWeight > 1250 && birthWeight <= 2000) {
                    return 3;
                }
            }
            break;
        case 30:
            if (gender === "男") {
                if (birthWeight > 500 && birthWeight <= 750) {
                    return 8;
                } else if (birthWeight > 750 && birthWeight <= 1000) {
                    return 6;
                } else if (birthWeight > 1000 && birthWeight <= 1250) {
                    return 4;
                } else if ((birthWeight > 1250 && birthWeight <= 1500) || (birthWeight > 2250 && birthWeight <= 2500)) {
                    return 3;
                } else if ((birthWeight > 1500 && birthWeight <= 1750) || (birthWeight > 2000 && birthWeight <= 2250)) {
                    return 2;
                } else if (birthWeight > 1750 && birthWeight <= 2000) {
                    return 1;
                }
            } else if (gender === "女") {
                if (birthWeight > 500 && birthWeight <= 750) {
                    return 7;
                } else if (birthWeight > 750 && birthWeight <= 1000) {
                    return 5;
                } else if (birthWeight > 1000 && birthWeight <= 1250) {
                    return 3;
                } else if ((birthWeight > 1250 && birthWeight <= 1500) || (birthWeight > 2250 && birthWeight <= 2500)) {
                    return 2;
                } else if (birthWeight > 1500 && birthWeight <= 2250) {
                    return 1;
                }
            }
            break;
        case 31:
            if (gender === "男") {
                if (birthWeight > 500 && birthWeight <= 750) {
                    return 8;
                } else if (birthWeight > 750 && birthWeight <= 1000) {
                    return 6;
                } else if (birthWeight > 1000 && birthWeight <= 1250) {
                    return 3;
                } else if (birthWeight > 1250 && birthWeight <= 1500) {
                    return 2;
                } else if ((birthWeight > 1500 && birthWeight <= 1750) || (birthWeight > 2500 && birthWeight <= 2750)) {
                    return 1;
                } else if (birthWeight > 1750 && birthWeight <= 2500) {
                    return 0;
                }
            } else if (gender === "女") {
                if (birthWeight > 500 && birthWeight <= 750) {
                    return 7;
                } else if (birthWeight > 750 && birthWeight <= 1000) {
                    return 5;
                } else if (birthWeight > 1000 && birthWeight <= 1250) {
                    return 3;
                } else if ((birthWeight > 1250 && birthWeight <= 1500) || (birthWeight > 2500 && birthWeight <= 2750)) {
                    return 1;
                } else if (birthWeight > 1500 && birthWeight <= 2500) {
                    return 0;
                }
            }
            break;
        case 32:
            if (gender === "男") {
                if (birthWeight > 750 && birthWeight <= 1000) {
                    return 6;
                } else if (birthWeight > 1000 && birthWeight <= 1250) {
                    return 3;
                } else if (birthWeight > 1250 && birthWeight <= 1500) {
                    return 1;
                } else if (birthWeight > 1500 && birthWeight <= 3000) {
                    return 0;
                }
            } else if (gender === "女") {
                if (birthWeight > 750 && birthWeight <= 1000) {
                    return 5;
                } else if (birthWeight > 1000 && birthWeight <= 1250) {
                    return 3;
                } else if (birthWeight > 1250 && birthWeight <= 1500) {
                    return 1;
                } else if (birthWeight > 1500 && birthWeight <= 3000) {
                    return 0;
                }
            }
            break;
        default:
            layer.msg("胎龄超出计算 CRIB-Ⅱ评分 范围！", {
                icon: 5,
                time: 3000,
                anim: 6,
                btn: "好",
                resize: false,
                shade: 0.8
            });
    }
    return -1;
}
$(document).ready(function () {
    // 引入 layui
    layui.use(["element", "form", "layer"], function () {
        let form = layui.form,
            layer = layui.layer;

        // 移除 rbg sm
        $(".pc-db-radioBtn-group").removeClass("sm");
        // 所有输入 不能小于0
        $(".pc-db-BDCA input").on("focusout", function () {
            const that = this;
            if ($(that).attr("name") !== "smallestBE" && $(that).attr("name") !== "baseExcess" && $(that).attr("id") !== "PC-db-smallestBE1") {
                if (notNullTool($(that).val())) {
                    const thisVal = parseFloat($(that).val());
                    if (thisVal < 0) {
                        layer.msg("填写的值不能 <span class='layui-badge'>小于0</span>！", {
                            icon: 5,
                            time: 3000,
                            anim: 6,
                            btn: "好",
                            resize: false,
                            shade: 0.8
                        }, function () {
                            $(that).val("");
                        });
                    }
                }
            }
        });
        // 禁止 性别输入
        $("#PC-db-gender>.pc-db-radioBtn-group>li").off("click");
        // 禁止 小与胎龄儿
        $("#PC-db-CYTGA>.layui-form-switch").off("click");

        // 危重评分 新生儿危重病例评分
        let heartRate, systolicBloodPressure, breathe, paO2, lowestSerumPH, naP, kP, cr, bun, hematocrit, bloating, gastrointestinalBleeding,
            diastolicBloodPressure, meanBloodPressure, minimumBodyTemperature, inhaledOxygenConcentration, paO2Fio2Ratio, seizuresNumber, urineVolume,
            birthWeight, apgar5MinScore, gestationalAge, congenitalMalformations, smallestBE, smallestFiO2, largestFiO2, gender, admissionTemperature,
            heartRateCaScore = 0, systolicBloodPressureCaScore = 0, breatheCaScore = 0, paO2CaScore = 0, lowestSerumPHCaScore = 0,
            naPCaScore = 0, kPCaScore = 0, crCaScore = 0, bunCaScore = 0, hematocritCaScore = 0, digestiveSystemCaScore = 10,
            meanBloodPressureSnapScore = 0, minimumBodyTemperatureSnapScore = 0, paO2Fio2RatioSnapScore = 0, lowestSerumPHSnapScore = 0,
            seizuresNumberSnapScore = 0, urineVolumeSnapScore = 0,
            birthWeightSnappeScore = 0, childYoungerThanGestationalAgeSnappeScore = 0, apgar5MinScoreSnappeScore = 0,
            birthWeightCribScore = 0, gestationalAgeCribScore = 0, congenitalMalformationsCribScore = 0, smallestBECribScore = 0,
            smallestFiO2CribScore = 0, largestFiO2CribScore = 0, birthWeightCrib2Score = 0, admissionTemperatureCrib2Score = 0, smallestBeCrib2Score = 0;

        // 所有 数据 初始化
        const heartRateElem = $("#PC-db-heartRate"), systolicBloodPressureElem = $("#PC-db-SBP"), breatheElem = $("#PC-db-breathe"),
            paO2Elem = $("#PC-db-PaO2"), lowestSerumPhElem = $("#PC-db-LSPH"), naPElem = $("#PC-db-NaP"), kPElem = $("#PC-db-KP"),
            crElem = $("#PC-db-Cr"), bunElem = $("#PC-db-BUN"), hematocritElem = $("#PC-db-hematocrit"), diastolicBloodPressureElem = $("#PC-db-DBP"),
            minimumBodyTemperatureElem = $("#PC-db-MBT"), inhaledOxygenConcentrationElem = $("#PC-db-IOC"), seizuresNumberElem = $("#PC-db-seizuresNumber"),
            urineVolumeElem = $("#PC-db-urineVolume"), smallestBeElem = $("#PC-db-smallestBE"), smallestFiO2Elem = $("#PC-db-smallestFiO2"),
            largestFiO2Elem = $("#PC-db-largestFiO2"), bloatingElem = $(".pc-db-BDCA input[name=bloating]"),
            gastrointestinalBleedingElem = $(".pc-db-BDCA input[name=gastrointestinalBleeding]"), apgar5MinScoreInput = $("#PC-db-APGAR5MS").val(),
            admissionTemperatureInput = $("#PC-db-AT").val(), birthWeightInput = $("#PC-db-birthWeight").val(), genderInput = $("#PC-db-gender>input").val(),
            gestationalAgeInput = $("#PC-db-gestationalAge").val();
        if (notNullTool($(heartRateElem).val()) && notNullTool($(systolicBloodPressureElem).val()) && notNullTool($(breatheElem).val()) &&
            notNullTool($(paO2Elem).val()) && notNullTool($(lowestSerumPhElem).val()) && notNullTool($(naPElem).val()) && notNullTool($(kPElem).val()) &&
            notNullTool($(crElem).val()) && notNullTool($(bunElem).val()) && notNullTool($(hematocritElem).val()) && notNullTool($(diastolicBloodPressureElem).val()) &&
            notNullTool($(minimumBodyTemperatureElem).val()) && notNullTool($(inhaledOxygenConcentrationElem).val()) && notNullTool($(seizuresNumberElem).val()) &&
            notNullTool($(urineVolumeElem).val()) && notNullTool($(smallestBeElem).val()) && notNullTool($(smallestFiO2Elem).val()) && notNullTool($(largestFiO2Elem).val()) &&
            notNullTool(apgar5MinScoreInput) && notNullTool(admissionTemperatureInput) && notNullTool(birthWeightInput) && notNullTool(genderInput) &&
            notNullTool(gestationalAgeInput)) {
            heartRate = parseInt($(heartRateElem).val());  // 心率 数据 初始化
            systolicBloodPressure = parseInt($(systolicBloodPressureElem).val());  // 收缩压 数据 初始化
            breathe = parseInt($(breatheElem).val());  // 呼吸 数据 初始化
            paO2 = parseFloat($(paO2Elem).val());  // PaO2 数据 初始化
            lowestSerumPH = parseFloat($(lowestSerumPhElem).val());  // 最低血清PH值 数据 初始化
            naP = parseInt($(naPElem).val());  // 最低血清PH值 数据 初始化
            kP = parseFloat($(kPElem).val());  // K+ 数据 初始化
            cr = parseFloat($(crElem).val());  // Cr 数据 初始化
            bun = parseFloat($(bunElem).val());  // BUN 数据 初始化
            hematocrit = parseFloat($(hematocritElem).val());  // 红细胞压积 数据 初始化
            diastolicBloodPressure = parseInt($(diastolicBloodPressureElem).val());  // 舒张压 数据 初始化
            minimumBodyTemperature = parseFloat($(minimumBodyTemperatureElem).val());  // 最低体温 数据 初始化
            inhaledOxygenConcentration = parseFloat($(inhaledOxygenConcentrationElem).val());  // 吸入氧浓度 数据 初始化
            seizuresNumber = parseFloat($(seizuresNumberElem).val());  // 惊厥发作 数据 初始化
            urineVolume = parseFloat($(urineVolumeElem).val());  // 尿量 数据 初始化
            smallestBE = parseFloat($(smallestBeElem).val());  // 最低的碱剩余 数据 初始化
            smallestFiO2 = parseFloat($(smallestFiO2Elem).val());  // 最小的FiO2 数据 初始化
            largestFiO2 = parseFloat($(largestFiO2Elem).val());  // 最大的FiO2 数据 初始化
            apgar5MinScore = parseInt(apgar5MinScoreInput);  // 获取 5分钟Apgar评分
            congenitalMalformations = $("#PC-db-CM>select").attr("data-value");  // 获取 先天畸形
            admissionTemperature = parseFloat(admissionTemperatureInput);  // 获取 入院体温
            birthWeight = parseInt(birthWeightInput);  // 获取 出生体重
            gender = genderInput;  // 获取 性别
            gestationalAge = parseInt(gestationalAgeInput);  // 获取 胎龄
            if ($(bloatingElem).attr("checked")) {  // 消化道系统 腹胀 数据 初始化
                bloating = 1;
            } else {
                bloating = 0;
            }
            if ($(gastrointestinalBleedingElem).attr("checked")) {  // 消化道系统 消化道出血 数据 初始化
                gastrointestinalBleeding = 1;
            } else {
                gastrointestinalBleeding = 0;
            }

            // 计算 心率 CA评分
            if (heartRate < 80 || heartRate > 180) {
                heartRateCaScore = 4;
            } else if (heartRate >= 100 && heartRate <= 160) {
                heartRateCaScore = 10;
            } else {
                heartRateCaScore = 6;
            }
            // 计算 收缩压 CA评分
            if (systolicBloodPressure < 40 || systolicBloodPressure > 100) {
                systolicBloodPressureCaScore = 4;
            } else if (systolicBloodPressure >= 50 && systolicBloodPressure <= 90) {
                systolicBloodPressureCaScore = 10;
            } else {
                systolicBloodPressureCaScore = 6;
            }
            // 计算 平均血压
            meanBloodPressure = Math.round((systolicBloodPressure + diastolicBloodPressure*2)/3);
            // 计算 平均血压 SNAP评分
            if (meanBloodPressure > 30) {
                meanBloodPressureSnapScore = 0;
            } else if (meanBloodPressure < 20) {
                meanBloodPressureSnapScore = 19;
            } else {
                meanBloodPressureSnapScore = 9;
            }
            // 计算 呼吸 CA评分
            if (breathe < 20 || breathe > 100) {
                breatheCaScore = 4;
            } else if (breathe >= 25 && breathe <= 60) {
                breatheCaScore = 10;
            } else {
                breatheCaScore = 6;
            }
            // 计算 PaO2 CA评分
            if (paO2 < 50) {
                paO2CaScore = 4;
            } else if (paO2 >= 50 && paO2 <= 60) {
                paO2CaScore = 6;
            } else {
                paO2CaScore = 10;
            }
            // 计算 PaO2与FiO2 比值
            paO2Fio2Ratio = (paO2/inhaledOxygenConcentration).toFixed(2);
            // 计算 PaO2与FiO2 SNAP评分
            if (paO2Fio2Ratio > 2.5) {
                paO2Fio2RatioSnapScore = 0;
            } else if (paO2Fio2Ratio > 1 && paO2Fio2Ratio <= 2.5) {
                paO2Fio2RatioSnapScore = 5;
            } else if (paO2Fio2Ratio < 0.3) {
                paO2Fio2RatioSnapScore = 28;
            } else {
                paO2Fio2RatioSnapScore = 16;
            }
            // 计算 最低血清PH值 CA评分
            if (lowestSerumPH < 7.25 || lowestSerumPH > 7.55) {
                lowestSerumPHCaScore = 4;
            } else if (lowestSerumPH >= 7.3 && lowestSerumPH <= 7.5) {
                lowestSerumPHCaScore = 10;
            } else {
                lowestSerumPHCaScore = 6;
            }
            // 计算 最低血清PH值 SNAP评分
            if (lowestSerumPH > 7.2) {
                lowestSerumPHSnapScore = 0;
            } else if (lowestSerumPH < 7.1) {
                lowestSerumPHSnapScore = 16;
            } else {
                lowestSerumPHSnapScore = 7;
            }
            // 计算 Na+ CA评分
            if (naP < 120 || naP > 160) {
                naPCaScore = 4;
            } else if (naP >= 130 && naP <= 150) {
                naPCaScore = 10;
            } else {
                naPCaScore = 6;
            }
            // 计算 K+ CA评分
            if (kP < 2 || kP > 9) {
                kPCaScore = 4;
            } else if (kP >= 2.5 && kP <= 7.5) {
                kPCaScore = 10;
            } else {
                kPCaScore = 6;
            }
            // 计算 Cr+ CA评分
            if (cr > 132.6) {
                crCaScore = 4;
            } else if (cr >= 87 && cr <= 114) {
                crCaScore = 10;
            } else {
                crCaScore = 6;
            }
            // 计算 BUN CA评分
            if (bun > 14.3) {
                bunCaScore = 4;
            } else if (bun < 7.1) {
                bunCaScore = 10;
            } else {
                bunCaScore = 6;
            }
            // 计算 红细胞压积 CA评分
            if (hematocrit < 0.2) {
                hematocritCaScore = 4;
            } else if (hematocrit > 0.4) {
                hematocritCaScore = 10;
            } else {
                hematocritCaScore = 6;
            }
            // 计算 最低体温 SNAP评分
            if (meanBloodPressure > 35.5) {
                minimumBodyTemperatureSnapScore = 0;
            } else if (meanBloodPressure < 35) {
                minimumBodyTemperatureSnapScore = 15;
            } else {
                minimumBodyTemperatureSnapScore = 8;
            }
            // 计算 惊厥发作 SNAP评分
            if (seizuresNumber <= 1) {
                seizuresNumberSnapScore = 0;
            } else {
                seizuresNumberSnapScore = 19;
            }
            // 计算 尿量 SNAP评分
            if (urineVolume > 1) {
                urineVolumeSnapScore = 0;
            } else if (urineVolume < 0.1) {
                urineVolumeSnapScore = 18;
            } else {
                urineVolumeSnapScore = 5;
            }
            // 计算 5分钟Apgar评分 SNAPPE2评分
            if (apgar5MinScore > 7) {
                apgar5MinScoreSnappeScore = 0;
            } else {
                apgar5MinScoreSnappeScore = 18;
            }
            // 计算 先天畸形 CRIB评分
            if (congenitalMalformations === "无") {
                congenitalMalformationsCribScore = 0;
            } else if (congenitalMalformations === "不危及生命") {
                congenitalMalformationsCribScore = 1;
            } else {
                congenitalMalformationsCribScore = 3;
            }
            // 计算 最大的BE CRIB评分
            if (smallestBE > -7.0) {
                smallestBECribScore = 0;
            } else if (smallestBE > -10 && smallestBE <= -7) {
                smallestBECribScore = 1;
            } else if (smallestBE <= -15) {
                smallestBECribScore = 4;
            } else {
                smallestBECribScore = 2;
            }
            // 计算 碱剩余 CRIB2评分
            if (smallestBE < -26) {
                smallestBeCrib2Score = 7;
            } else if (smallestBE > -26 && smallestBE <= -23) {
                smallestBeCrib2Score = 6;
            } else if (smallestBE > -23 && smallestBE <= -18) {
                smallestBeCrib2Score = 5;
            } else if (smallestBE > -18 && smallestBE <= -13) {
                smallestBeCrib2Score = 4;
            } else if (smallestBE > -13 && smallestBE <= -8) {
                smallestBeCrib2Score = 3;
            } else if (smallestBE > -8 && smallestBE <= -3) {
                smallestBeCrib2Score = 2;
            } else if (smallestBE > -3 && smallestBE <= 2) {
                smallestBeCrib2Score = 1;
            } else {
                smallestBeCrib2Score = 0;
            }
            // 计算 最小的FiO2 CRIB评分
            if (smallestFiO2 < 0.4) {
                smallestFiO2CribScore = 0;
            } else if (smallestFiO2 >= 0.4 && smallestFiO2 <= 0.8) {
                smallestFiO2CribScore = 2;
            } else if (smallestFiO2 > 0.8 && smallestFiO2 <= 0.9) {
                smallestFiO2CribScore = 3;
            } else if (smallestFiO2 > 0.9 && smallestFiO2 <= 1) {
                smallestFiO2CribScore = 4;
            }
            // 计算 最大的FiO2 CRIB评分
            if (largestFiO2 < 0.4) {
                largestFiO2CribScore = 0;
            } else if (largestFiO2 >= 0.4 && largestFiO2 <= 0.8) {
                largestFiO2CribScore = 1;
            } else if (largestFiO2 > 0.8 && largestFiO2 <= 0.9) {
                largestFiO2CribScore = 3;
            } else if (largestFiO2 > 0.9 && largestFiO2 <= 1) {
                largestFiO2CribScore = 5;
            }
            // 计算 入院体温 CRIB2评分
            if (admissionTemperature <= 29.6) {
                admissionTemperatureCrib2Score = 5;
            } else if (admissionTemperature > 29.6 && admissionTemperature <= 31.2) {
                admissionTemperatureCrib2Score = 4;
            } else if (admissionTemperature > 31.2 && admissionTemperature <= 32.8 || admissionTemperature > 40.7) {
                admissionTemperatureCrib2Score = 3;
            } else if ((admissionTemperature > 32.8 && admissionTemperature <= 34.4) || (admissionTemperature > 39.1 && admissionTemperature <= 40.7)) {
                admissionTemperatureCrib2Score = 2;
            } else if ((admissionTemperature > 34.4 && admissionTemperature <= 36) || (admissionTemperature > 37.5 && admissionTemperature <= 39.1)) {
                admissionTemperatureCrib2Score = 1;
            } else if (admissionTemperature > 36 && admissionTemperature <= 37.5) {
                admissionTemperatureCrib2Score = 0;
            }
            // 计算 消化道系统 CA评分
            if (bloating === 1 && gastrointestinalBleeding === 1) {
                digestiveSystemCaScore = 4;
            } else if (bloating === 1 || gastrointestinalBleeding === 1) {
                digestiveSystemCaScore = 6;
            } else {
                digestiveSystemCaScore = 10;
            }
            // 计算 出生体重 SNAPPE2评分
            if (birthWeight > 1000) {
                birthWeightSnappeScore = 0;
            } else if (birthWeight < 750) {
                birthWeightSnappeScore = 17;
            } else {
                birthWeightSnappeScore = 10;
            }
            // 计算 小于胎龄儿 SNAPPE2评分
            childYoungerThanGestationalAgeSnappeScore = computeCYTGASnappe2Score(gender, gestationalAge, birthWeight);
            // 计算 性别/出生体重/胎龄 CRIB2评分
            const birthWeightCrib2ScoreInput = computeCrib2Score(gender, gestationalAge, birthWeight);
            if (birthWeightCrib2ScoreInput > -1) {
                birthWeightCrib2Score = birthWeightCrib2ScoreInput;
            }
            // 计算 出生体重 CRIB评分
            if (birthWeight > 1350) {
                birthWeightCribScore = 0;
            } else if (birthWeight > 850 && birthWeight <= 1350) {
                birthWeightCribScore = 1;
            } else if (birthWeight <= 700) {
                birthWeightCribScore = 7;
            } else {
                birthWeightCribScore = 4;
            }
            // 计算 胎龄 CRIB评分
            if (gestationalAge > 24) {
                gestationalAgeCribScore = 0;
            } else {
                gestationalAgeCribScore = 1;
            }
        }

        // 计算 心率 CA评分
        $(heartRateElem).on("focusout input", function () {
            if (notNullTool($(this).val())) {
                heartRate = parseInt($(this).val());
                if (heartRate < 80 || heartRate > 180) {
                    heartRateCaScore = 4;
                } else if (heartRate >= 100 && heartRate <= 160) {
                    heartRateCaScore = 10;
                } else {
                    heartRateCaScore = 6;
                }
                $("#PC-db-NCCS").val(heartRateCaScore + systolicBloodPressureCaScore + breatheCaScore + paO2CaScore +
                    lowestSerumPHCaScore + naPCaScore + kPCaScore + crCaScore + bunCaScore + hematocritCaScore + digestiveSystemCaScore);
            }
        });
        // 计算 收缩压 CA评分，计算 平均血压，计算 平均血压 SNAP评分
        $(systolicBloodPressureElem).on("focusout input", function () {
            if (notNullTool($(this).val())) {
                systolicBloodPressure = parseInt($(this).val());
                $("#PC-db-SBP1").val(systolicBloodPressure);
                if (systolicBloodPressure < 40 || systolicBloodPressure > 100) {
                    systolicBloodPressureCaScore = 4;
                } else if (systolicBloodPressure >= 50 && systolicBloodPressure <= 90) {
                    systolicBloodPressureCaScore = 10;
                } else {
                    systolicBloodPressureCaScore = 6;
                }
                $("#PC-db-NCCS").val(heartRateCaScore + systolicBloodPressureCaScore + breatheCaScore + paO2CaScore +
                    lowestSerumPHCaScore + naPCaScore + kPCaScore + crCaScore + bunCaScore + hematocritCaScore + digestiveSystemCaScore);
                if (notNullTool(diastolicBloodPressure)) {
                    meanBloodPressure = Math.round((systolicBloodPressure + diastolicBloodPressure*2)/3);
                    $("#PC-db-MBP").val(meanBloodPressure);
                    if (meanBloodPressure > 30) {
                        meanBloodPressureSnapScore = 0;
                    } else if (meanBloodPressure < 20) {
                        meanBloodPressureSnapScore = 19;
                    } else {
                        meanBloodPressureSnapScore = 9;
                    }
                    $("#PC-db-snap2Score").val(meanBloodPressureSnapScore + minimumBodyTemperatureSnapScore + paO2Fio2RatioSnapScore +
                        lowestSerumPHSnapScore + seizuresNumberSnapScore + urineVolumeSnapScore);
                }
            }
        });
        // 计算 呼吸 CA评分
        $(breatheElem).on("focusout input", function () {
            if (notNullTool($(this).val())) {
                breathe = parseInt($(this).val());
                if (breathe < 20 || breathe > 100) {
                    breatheCaScore = 4;
                } else if (breathe >= 25 && breathe <= 60) {
                    breatheCaScore = 10;
                } else {
                    breatheCaScore = 6;
                }
                $("#PC-db-NCCS").val(heartRateCaScore + systolicBloodPressureCaScore + breatheCaScore + paO2CaScore +
                    lowestSerumPHCaScore + naPCaScore + kPCaScore + crCaScore + bunCaScore + hematocritCaScore + digestiveSystemCaScore);
            }
        });
        // 计算 PaO2 CA评分，计算 PO2与FiO2 比值，计算 PaO2与FiO2 SNAP评分
        $(paO2Elem).on("focusout input", function () {
            if (notNullTool($(this).val())) {
                paO2 = parseInt($(this).val());
                $("#PC-db-PaO2-1").val(paO2);
                if (paO2 < 50) {
                    paO2CaScore = 4;
                } else if (paO2 >= 50 && paO2 <= 60) {
                    paO2CaScore = 6;
                } else {
                    paO2CaScore = 10;
                }
                $("#PC-db-NCCS").val(heartRateCaScore + systolicBloodPressureCaScore + breatheCaScore + paO2CaScore +
                    lowestSerumPHCaScore + naPCaScore + kPCaScore + crCaScore + bunCaScore + hematocritCaScore + digestiveSystemCaScore);
                if (notNullTool(inhaledOxygenConcentration)) {
                    paO2Fio2Ratio = (paO2/inhaledOxygenConcentration).toFixed(2);
                    $("#PC-db-PaO2RFiO2").val(paO2Fio2Ratio);
                    if (paO2Fio2Ratio > 2.5) {
                        paO2Fio2RatioSnapScore = 0;
                    } else if (paO2Fio2Ratio > 1 && paO2Fio2Ratio <= 2.5) {
                        paO2Fio2RatioSnapScore = 5;
                    } else if (paO2Fio2Ratio < 0.3) {
                        paO2Fio2RatioSnapScore = 28;
                    } else {
                        paO2Fio2RatioSnapScore = 16;
                    }
                    $("#PC-db-snap2Score").val(meanBloodPressureSnapScore + minimumBodyTemperatureSnapScore + paO2Fio2RatioSnapScore +
                        lowestSerumPHSnapScore + seizuresNumberSnapScore + urineVolumeSnapScore);
                }
            }
        });
        // 计算 最低血清PH值 CA评分，计算 最低血清PH值 SNAP评分
        $(lowestSerumPhElem).on("focusout input", function () {
            if (notNullTool($(this).val())) {
                lowestSerumPH = parseFloat($(this).val());
                $("#PC-db-LSPH1").val(lowestSerumPH);
                if (lowestSerumPH < 7.25 || lowestSerumPH > 7.55) {
                    lowestSerumPHCaScore = 4;
                } else if (lowestSerumPH >= 7.3 && lowestSerumPH <= 7.5) {
                    lowestSerumPHCaScore = 10;
                } else {
                    lowestSerumPHCaScore = 6;
                }
                $("#PC-db-NCCS").val(heartRateCaScore + systolicBloodPressureCaScore + breatheCaScore + paO2CaScore +
                    lowestSerumPHCaScore + naPCaScore + kPCaScore + crCaScore + bunCaScore + hematocritCaScore + digestiveSystemCaScore);
                if (lowestSerumPH > 7.2) {
                    lowestSerumPHSnapScore = 0;
                } else if (lowestSerumPH < 7.1) {
                    lowestSerumPHSnapScore = 16;
                } else {
                    lowestSerumPHSnapScore = 7;
                }
                $("#PC-db-snap2Score").val(meanBloodPressureSnapScore + minimumBodyTemperatureSnapScore + paO2Fio2RatioSnapScore +
                    lowestSerumPHSnapScore + seizuresNumberSnapScore + urineVolumeSnapScore);
            }
        });
        // 计算 Na+ CA评分
        $(naPElem).on("focusout input", function () {
            if (notNullTool($(this).val())) {
                naP = parseInt($(this).val());
                if (naP < 120 || naP > 160) {
                    naPCaScore = 4;
                } else if (naP >= 130 && naP <= 150) {
                    naPCaScore = 10;
                } else {
                    naPCaScore = 6;
                }
                $("#PC-db-NCCS").val(heartRateCaScore + systolicBloodPressureCaScore + breatheCaScore + paO2CaScore +
                    lowestSerumPHCaScore + naPCaScore + kPCaScore + crCaScore + bunCaScore + hematocritCaScore + digestiveSystemCaScore);
            }
        });
        // 计算 K+ CA评分
        $(kPElem).on("focusout input", function () {
            if (notNullTool($(this).val())) {
                kP = parseFloat($(this).val());
                if (kP < 2 || kP > 9) {
                    kPCaScore = 4;
                } else if (kP >= 2.5 && kP <= 7.5) {
                    kPCaScore = 10;
                } else {
                    kPCaScore = 6;
                }
                $("#PC-db-NCCS").val(heartRateCaScore + systolicBloodPressureCaScore + breatheCaScore + paO2CaScore +
                    lowestSerumPHCaScore + naPCaScore + kPCaScore + crCaScore + bunCaScore + hematocritCaScore + digestiveSystemCaScore);
            }
        });
        // 计算 Cr+ CA评分
        $(crElem).on("focusout input", function () {
            if (notNullTool($(this).val())) {
                cr = parseFloat($(this).val());
                if (cr > 132.6) {
                    crCaScore = 4;
                } else if (cr >= 87 && cr <= 114) {
                    crCaScore = 10;
                } else {
                    crCaScore = 6;
                }
                $("#PC-db-NCCS").val(heartRateCaScore + systolicBloodPressureCaScore + breatheCaScore + paO2CaScore +
                    lowestSerumPHCaScore + naPCaScore + kPCaScore + crCaScore + bunCaScore + hematocritCaScore + digestiveSystemCaScore);
            }
        });
        // 计算 BUN CA评分
        $(bunElem).on("focusout input", function () {
            if (notNullTool($(this).val())) {
                bun = parseFloat($(this).val());
                if (bun > 14.3) {
                    bunCaScore = 4;
                } else if (bun < 7.1) {
                    bunCaScore = 10;
                } else {
                    bunCaScore = 6;
                }
                $("#PC-db-NCCS").val(heartRateCaScore + systolicBloodPressureCaScore + breatheCaScore + paO2CaScore +
                    lowestSerumPHCaScore + naPCaScore + kPCaScore + crCaScore + bunCaScore + hematocritCaScore + digestiveSystemCaScore);
            }
        });
        // 计算 红细胞压积 CA评分
        $(hematocritElem).on("focusout", function () {
            if (notNullTool($(this).val())) {
                hematocrit = parseFloat($(this).val());
                if (hematocrit >= 0 && hematocrit <= 1) {
                    if (hematocrit < 0.2) {
                        hematocritCaScore = 4;
                    } else if (hematocrit > 0.4) {
                        hematocritCaScore = 10;
                    } else {
                        hematocritCaScore = 6;
                    }
                    $("#PC-db-NCCS").val(heartRateCaScore + systolicBloodPressureCaScore + breatheCaScore + paO2CaScore +
                        lowestSerumPHCaScore + naPCaScore + kPCaScore + crCaScore + bunCaScore + hematocritCaScore + digestiveSystemCaScore);
                } else {
                    layer.msg("红细胞压积 超出（0-1）范围！", {
                        icon: 7,
                        time: 0,
                        anim: 6,
                        btn: "好!",
                        resize: false,
                        shade: 0.8
                    }, function () {
                        $(hematocritElem).val("");
                    });
                }
            }
        });
        // 舒张压 计算 平均血压，计算 平均血压 SNAP评分
        $(diastolicBloodPressureElem).on("focusout input", function () {
            if (notNullTool($(this).val())) {
                diastolicBloodPressure = parseInt($(this).val());
                if (notNullTool(systolicBloodPressure)) {
                    meanBloodPressure = Math.round((systolicBloodPressure + diastolicBloodPressure*2)/3);
                    $("#PC-db-MBP").val(meanBloodPressure);
                    if (meanBloodPressure > 30) {
                        meanBloodPressureSnapScore = 0;
                    } else if (meanBloodPressure < 20) {
                        meanBloodPressureSnapScore = 19;
                    } else {
                        meanBloodPressureSnapScore = 9;
                    }
                    $("#PC-db-snap2Score").val(meanBloodPressureSnapScore + minimumBodyTemperatureSnapScore + paO2Fio2RatioSnapScore +
                        lowestSerumPHSnapScore + seizuresNumberSnapScore + urineVolumeSnapScore);
                }
            }
        });
        // 计算 最低体温 SNAP评分
        $(minimumBodyTemperatureElem).on("focusout input", function () {
            if (notNullTool($(this).val())) {
                minimumBodyTemperature = parseFloat($(this).val());
                if (meanBloodPressure > 35.5) {
                    minimumBodyTemperatureSnapScore = 0;
                } else if (meanBloodPressure < 35) {
                    minimumBodyTemperatureSnapScore = 15;
                } else {
                    minimumBodyTemperatureSnapScore = 8;
                }
                $("#PC-db-snap2Score").val(meanBloodPressureSnapScore + minimumBodyTemperatureSnapScore + paO2Fio2RatioSnapScore +
                    lowestSerumPHSnapScore + seizuresNumberSnapScore + urineVolumeSnapScore);
            }
        });
        // 计算 PaO2与FiO2 比值, 计算 PaO2与FiO2 SNAP评分
        $(inhaledOxygenConcentrationElem).on("focusout input", function () {
            if (notNullTool($(this).val())) {
                inhaledOxygenConcentration = parseFloat($(this).val());
                if (notNullTool(paO2)) {
                    paO2Fio2Ratio = (paO2/inhaledOxygenConcentration).toFixed(2);
                    $("#PC-db-PaO2RFiO2").val(paO2Fio2Ratio);
                    if (paO2Fio2Ratio > 2.5) {
                        paO2Fio2RatioSnapScore = 0;
                    } else if (paO2Fio2Ratio > 1 && paO2Fio2Ratio <= 2.5) {
                        paO2Fio2RatioSnapScore = 5;
                    } else if (paO2Fio2Ratio < 0.3) {
                        paO2Fio2RatioSnapScore = 28;
                    } else {
                        paO2Fio2RatioSnapScore = 16;
                    }
                    $("#PC-db-snap2Score").val(meanBloodPressureSnapScore + minimumBodyTemperatureSnapScore + paO2Fio2RatioSnapScore +
                        lowestSerumPHSnapScore + seizuresNumberSnapScore + urineVolumeSnapScore);
                }
            }
        });
        // 计算 惊厥发作 SNAP评分
        $(seizuresNumberElem).on("focusout input", function () {
            if (notNullTool($(this).val())) {
                seizuresNumber = parseInt($(this).val());
                if (seizuresNumber <= 1) {
                    seizuresNumberSnapScore = 0;
                } else {
                    seizuresNumberSnapScore = 19;
                }
                $("#PC-db-snap2Score").val(meanBloodPressureSnapScore + minimumBodyTemperatureSnapScore + paO2Fio2RatioSnapScore +
                    lowestSerumPHSnapScore + seizuresNumberSnapScore + urineVolumeSnapScore);
            }
        });
        // 计算 尿量 SNAP评分
        $(urineVolumeElem).on("focusout input", function () {
            if (notNullTool($(this).val())) {
                urineVolume = parseFloat($(this).val());
                if (urineVolume > 1) {
                    urineVolumeSnapScore = 0;
                } else if (urineVolume < 0.1) {
                    urineVolumeSnapScore = 18;
                } else {
                    urineVolumeSnapScore = 5;
                }
                $("#PC-db-snap2Score").val(meanBloodPressureSnapScore + minimumBodyTemperatureSnapScore + paO2Fio2RatioSnapScore +
                    lowestSerumPHSnapScore + seizuresNumberSnapScore + urineVolumeSnapScore);
            }
        });
        // 计算 5分钟Apgar评分 SNAPPE2评分
        if (notNullTool(apgar5MinScoreInput)) {
            apgar5MinScore = parseInt(apgar5MinScoreInput);
            if (apgar5MinScore > 7) {
                apgar5MinScoreSnappeScore = 0;
            } else {
                apgar5MinScoreSnappeScore = 18;
            }
            $("#PC-db-snappe2Score").val(meanBloodPressureSnapScore + minimumBodyTemperatureSnapScore + paO2Fio2RatioSnapScore +
                lowestSerumPHSnapScore + seizuresNumberSnapScore + urineVolumeSnapScore + birthWeightSnappeScore +
                childYoungerThanGestationalAgeSnappeScore + apgar5MinScoreSnappeScore);
        }
        // 计算 最大的BE CRIB评分，计算 碱剩余 CRIB2评分
        $(smallestBeElem).on("focusout input", function () {
            if (notNullTool($(this).val())) {
                smallestBE = parseFloat($(this).val());
                $("#PC-db-smallestBE1").val(smallestBE);
                if (smallestBE > -7.0) {
                    smallestBECribScore = 0;
                } else if (smallestBE > -10 && smallestBE <= -7) {
                    smallestBECribScore = 1;
                } else if (smallestBE <= -15) {
                    smallestBECribScore = 4;
                } else {
                    smallestBECribScore = 2;
                }
                $("#PC-db-CRIBS").val(birthWeightCribScore + gestationalAgeCribScore + congenitalMalformationsCribScore +
                    smallestBECribScore + smallestFiO2CribScore + largestFiO2CribScore);
                if (smallestBE < -26) {
                    smallestBeCrib2Score = 7;
                } else if (smallestBE > -26 && smallestBE <= -23) {
                    smallestBeCrib2Score = 6;
                } else if (smallestBE > -23 && smallestBE <= -18) {
                    smallestBeCrib2Score = 5;
                } else if (smallestBE > -18 && smallestBE <= -13) {
                    smallestBeCrib2Score = 4;
                } else if (smallestBE > -13 && smallestBE <= -8) {
                    smallestBeCrib2Score = 3;
                } else if (smallestBE > -8 && smallestBE <= -3) {
                    smallestBeCrib2Score = 2;
                } else if (smallestBE > -3 && smallestBE <= 2) {
                    smallestBeCrib2Score = 1;
                } else {
                    smallestBeCrib2Score = 0;
                }
                $("#PC-db-CRIB2S").val(birthWeightCrib2Score + smallestBeCrib2Score + admissionTemperatureCrib2Score);
            }
        });
        // 计算 最小的FiO2 CRIB评分
        $(smallestFiO2Elem).on("focusout input", function () {
            if (notNullTool($(this).val())) {
                smallestFiO2 = parseFloat($(this).val());
                if (smallestFiO2 < 0.4) {
                    smallestFiO2CribScore = 0;
                } else if (smallestFiO2 >= 0.4 && smallestFiO2 <= 0.8) {
                    smallestFiO2CribScore = 2;
                } else if (smallestFiO2 > 0.8 && smallestFiO2 <= 0.9) {
                    smallestFiO2CribScore = 3;
                } else if (smallestFiO2 > 0.9 && smallestFiO2 <= 1) {
                    smallestFiO2CribScore = 4;
                }
                $("#PC-db-CRIBS").val(birthWeightCribScore + gestationalAgeCribScore + congenitalMalformationsCribScore +
                    smallestBECribScore + smallestFiO2CribScore + largestFiO2CribScore);
            }
        });
        // 计算 最大的FiO2 CRIB评分
        $(largestFiO2Elem).on("focusout input", function () {
            if (notNullTool($(this).val())) {
                largestFiO2 = parseFloat($(this).val());
                if (largestFiO2 < 0.4) {
                    largestFiO2CribScore = 0;
                } else if (largestFiO2 >= 0.4 && largestFiO2 <= 0.8) {
                    largestFiO2CribScore = 1;
                } else if (largestFiO2 > 0.8 && largestFiO2 <= 0.9) {
                    largestFiO2CribScore = 3;
                } else if (largestFiO2 > 0.9 && largestFiO2 <= 1) {
                    largestFiO2CribScore = 5;
                }
                $("#PC-db-CRIBS").val(birthWeightCribScore + gestationalAgeCribScore + congenitalMalformationsCribScore +
                    smallestBECribScore + smallestFiO2CribScore + largestFiO2CribScore);
            }
        });
        // 计算 入院体温 CRIB2评分
        if (notNullTool(admissionTemperatureInput)) {
            admissionTemperature = parseFloat(admissionTemperatureInput);
            if (admissionTemperature <= 29.6) {
                admissionTemperatureCrib2Score = 5;
            } else if (admissionTemperature > 29.6 && admissionTemperature <= 31.2) {
                admissionTemperatureCrib2Score = 4;
            } else if (admissionTemperature > 31.2 && admissionTemperature <= 32.8 || admissionTemperature > 40.7) {
                admissionTemperatureCrib2Score = 3;
            } else if ((admissionTemperature > 32.8 && admissionTemperature <= 34.4) || (admissionTemperature > 39.1 && admissionTemperature <= 40.7)) {
                admissionTemperatureCrib2Score = 2;
            } else if ((admissionTemperature > 34.4 && admissionTemperature <= 36) || (admissionTemperature > 37.5 && admissionTemperature <= 39.1)) {
                admissionTemperatureCrib2Score = 1;
            } else if (admissionTemperature > 36 && admissionTemperature <= 37.5) {
                admissionTemperatureCrib2Score = 0;
            }
            $("#PC-db-CRIB2S").val(birthWeightCrib2Score + smallestBeCrib2Score + admissionTemperatureCrib2Score);
        }

        // 计算 消化道系统 CA评分
        form.on("switch(bloating)", function (data) {
            if (data.elem.checked) {
                bloating = 1;
            } else {
                bloating = 0;
            }
            if (bloating === 1 && gastrointestinalBleeding === 1) {
                digestiveSystemCaScore = 4;
            } else if (bloating === 1 || gastrointestinalBleeding === 1) {
                digestiveSystemCaScore = 6;
            } else {
                digestiveSystemCaScore = 10;
            }
            $("#PC-db-NCCS").val(heartRateCaScore + systolicBloodPressureCaScore + breatheCaScore + paO2CaScore +
                lowestSerumPHCaScore + naPCaScore + kPCaScore + crCaScore + bunCaScore + hematocritCaScore + digestiveSystemCaScore);
        });
        form.on("switch(GB)", function (data) {
            if (data.elem.checked) {
                gastrointestinalBleeding = 1;
            } else {
                gastrointestinalBleeding = 0;
            }
            if (bloating === 1 && gastrointestinalBleeding === 1) {
                digestiveSystemCaScore = 4;
            } else if (bloating === 1 || gastrointestinalBleeding === 1) {
                digestiveSystemCaScore = 6;
            } else {
                digestiveSystemCaScore = 10;
            }
            $("#PC-db-NCCS").val(heartRateCaScore + systolicBloodPressureCaScore + breatheCaScore + paO2CaScore +
                lowestSerumPHCaScore + naPCaScore + kPCaScore + crCaScore + bunCaScore + hematocritCaScore + digestiveSystemCaScore);
        });
        // 计算 出生体重 SNAPPE2评分，计算 小于胎龄儿 SNAPPE2评分，计算 出生体重 CRIB评分，计算 性别/出生体重/胎龄 CRIB2评分
        if (notNullTool(birthWeightInput)) {
            birthWeight = parseInt(birthWeightInput);
            if (birthWeight > 1000) {
                birthWeightSnappeScore = 0;
            } else if (birthWeight < 750) {
                birthWeightSnappeScore = 17;
            } else {
                birthWeightSnappeScore = 10;
            }
            const snappe2ScoreElem = $("#PC-db-snappe2Score");
            $(snappe2ScoreElem).val(meanBloodPressureSnapScore + minimumBodyTemperatureSnapScore + paO2Fio2RatioSnapScore +
                lowestSerumPHSnapScore + seizuresNumberSnapScore + urineVolumeSnapScore + birthWeightSnappeScore +
                childYoungerThanGestationalAgeSnappeScore + apgar5MinScoreSnappeScore);
            if (notNullTool(gender)) {
                if (notNullTool(gestationalAge)) {
                    childYoungerThanGestationalAgeSnappeScore = computeCYTGASnappe2Score(gender, gestationalAge, birthWeight, form);
                    $(snappe2ScoreElem).val(meanBloodPressureSnapScore + minimumBodyTemperatureSnapScore + paO2Fio2RatioSnapScore +
                        lowestSerumPHSnapScore + seizuresNumberSnapScore + urineVolumeSnapScore + birthWeightSnappeScore +
                        childYoungerThanGestationalAgeSnappeScore + apgar5MinScoreSnappeScore);
                    const birthWeightCrib2ScoreInput = computeCrib2Score(gender, gestationalAge, birthWeight);
                    if (birthWeightCrib2ScoreInput > -1) {
                        birthWeightCrib2Score = birthWeightCrib2ScoreInput;
                        $("#PC-db-CRIB2S").val(birthWeightCrib2Score + smallestBeCrib2Score + admissionTemperatureCrib2Score);
                    }
                }
            }
            if (birthWeight > 1350) {
                birthWeightCribScore = 0;
            } else if (birthWeight > 850 && birthWeight <= 1350) {
                birthWeightCribScore = 1;
            } else if (birthWeight <= 700) {
                birthWeightCribScore = 7;
            } else {
                birthWeightCribScore = 4;
            }
            $("#PC-db-CRIBS").val(birthWeightCribScore + gestationalAgeCribScore + congenitalMalformationsCribScore +
                smallestBECribScore + smallestFiO2CribScore + largestFiO2CribScore);
        }
        // 计算 小于胎铃儿 snappe2评分，计算 性别/出生体重/胎龄 CRIB2评分
        if (notNullTool(genderInput)) {
            gender = genderInput;
            if (notNullTool(gestationalAge)) {
                if (notNullTool(birthWeight)) {
                    childYoungerThanGestationalAgeSnappeScore = computeCYTGASnappe2Score(gender, gestationalAge, birthWeight, form);
                    $("#PC-db-snappe2Score").val(meanBloodPressureSnapScore + minimumBodyTemperatureSnapScore + paO2Fio2RatioSnapScore +
                        lowestSerumPHSnapScore + seizuresNumberSnapScore + urineVolumeSnapScore + birthWeightSnappeScore +
                        childYoungerThanGestationalAgeSnappeScore + apgar5MinScoreSnappeScore);
                    birthWeightCrib2Score = computeCrib2Score(gender, gestationalAge, birthWeight);
                    $("#PC-db-CRIB2S").val(birthWeightCrib2Score + smallestBeCrib2Score + admissionTemperatureCrib2Score);
                }
            }
        }
        // 计算 小于胎铃儿 snappe2评分，计算 胎龄 CRIB评分
        if (notNullTool(gestationalAgeInput)) {
            gestationalAge = parseInt(gestationalAgeInput);
            if (notNullTool(gender)) {
                if (notNullTool(birthWeight)) {
                    childYoungerThanGestationalAgeSnappeScore = computeCYTGASnappe2Score(gender, gestationalAge, birthWeight, form);
                    $("#PC-db-snappe2Score").val(meanBloodPressureSnapScore + minimumBodyTemperatureSnapScore + paO2Fio2RatioSnapScore +
                        lowestSerumPHSnapScore + seizuresNumberSnapScore + urineVolumeSnapScore + birthWeightSnappeScore +
                        childYoungerThanGestationalAgeSnappeScore + apgar5MinScoreSnappeScore);
                    birthWeightCrib2Score = computeCrib2Score(gender, gestationalAge, birthWeight);
                    $("#PC-db-CRIB2S").val(birthWeightCrib2Score + smallestBeCrib2Score + admissionTemperatureCrib2Score);
                }
            }
            if (gestationalAge > 24) {
                gestationalAgeCribScore = 0;
            } else {
                gestationalAgeCribScore = 1;
            }
            $("#PC-db-CRIBS").val(birthWeightCribScore + gestationalAgeCribScore + congenitalMalformationsCribScore +
                smallestBECribScore + smallestFiO2CribScore + largestFiO2CribScore);
        }


        // 先天畸形 数据 初始化
        const congenitalMalformationsElem = $("#PC-db-CM>select");
        if (notNullTool($(congenitalMalformationsElem).attr("data-value"))) {
            congenitalMalformations = $(congenitalMalformationsElem).attr("data-value");
        }
        // 计算 先天畸形 CRIB评分
        form.on("select(CM)", function (data) {
            congenitalMalformations = data.value;
            $(data.elem).attr("data-value", congenitalMalformations);
            if (congenitalMalformations === "无") {
                congenitalMalformationsCribScore = 0;
            } else if (congenitalMalformations === "不危及生命") {
                congenitalMalformationsCribScore = 1;
            } else {
                congenitalMalformationsCribScore = 3;
            }
            $("#PC-db-CRIBS").val(birthWeightCribScore + gestationalAgeCribScore + congenitalMalformationsCribScore +
                smallestBECribScore + smallestFiO2CribScore + largestFiO2CribScore);
        });

        // 基础数据库 危重评分 添加/编辑 信息 提交
        form.on("submit(CA)", function (data) {
            const doing = "保存信息";
            loading(doing);
            for (let i in data.field) {
                if (!notNullTool(data.field[i])) {
                    delete data.field[i];
                }
            }
            $.post("/perinatalPlatform/basicDatabase/write/CA/post", data.field, function (back, status) {
                if(status === "success") {
                    if(back.code) {
                        successNext();
                    }else {failMsg(doing)}
                }else {errorMsg1()}
            },"json").fail(function () {errorMsg2()});
        });
    });
});