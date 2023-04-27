// 删除 表格 置管 行
function deleteTp(that) {
    layer.msg("确定要 <span class='pc-db-status-color-no'>删除</span> 此条置管信息吗?",{
        icon: 7,
        time: 0,
        anim: 6,
        btn: ["确定", "取消"],
        resize: false,
        shade: 0.8,
        yes: function (index) {
            $(that).parents("tr").remove();
            layer.close(index);
        }
    });
}
// 生成14天日期
function date14Day(elem) {
    const childHospitalizationDateInput = $(elem).attr("data-chd");
    if (notNullTool(childHospitalizationDateInput)) {
        const childHospitalizationDate = childHospitalizationDateInput,
            childHospitalizationDateStamp = Date.parse(childHospitalizationDate);
        let date14DayTdElem = "", thisDateStamp = childHospitalizationDateStamp, allDateStamp = [];
        let i = 0;
        while (i < 14) {
            const thisDate = new Date(thisDateStamp),
                thisDateString = (thisDate.getFullYear() % 100) + "/" + (thisDate.getMonth() + 1) + "/" + thisDate.getDate();
            date14DayTdElem += "<th>" + thisDateString + "</th>";
            allDateStamp[i] = thisDateStamp;
            thisDateStamp += 86400000;
            i++;
        }
        allDateStamp[i] = thisDateStamp;
        $(elem).find(".pc-db-table.tableRight").children("thead").find("th.blockTh").before(date14DayTdElem);
        return allDateStamp;
    }else {
        layer.msg("请先完善 新生儿入院日期！", {
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
// 增加7-22天总计
function add7To22DayTotal(max, elem, left14, left28) {
    if (max === 22) {
        $(elem + " .pc-db-table.tableLeft>thead>tr>th:eq(3)").before("<th>15-21d</th>");
        $(elem + " .pc-db-table.tableLeft>tbody>tr>td[colspan=4]").attr("colspan", 5);
        const allLTTr = $(elem + " .pc-db-table.tableLeft>tbody>tr");
        for (let i = 0; i < allLTTr.length; i++) {
            $(allLTTr[i]).find("td:eq(3)").before("<td>0</td>");
        }
        $(elem + " .pc-db-item-table>.pc-db-table.tableRight").css("margin-left", left14 + "px");
    } else if (max === 29) {
        $(elem + " .pc-db-table.tableLeft>thead>tr>th:eq(4)").before("<th>22-28d</th>");
        $(elem + " .pc-db-table.tableLeft>tbody>tr>td[colspan=5]").attr("colspan", 6);
        const allLTTr = $(elem + " .pc-db-table.tableLeft>tbody>tr");
        for (let i = 0; i < allLTTr.length; i++) {
            $(allLTTr[i]).find("td:eq(4)").before("<td>0</td>");
        }
        $(elem + " .pc-db-item-table>.pc-db-table.tableRight").css("margin-left", left28 + "px");
    }
}
// 返回2位小数或整数
function get2DOrI(num) {
    let y = String(num).indexOf(".") + 1;
    if(y > 0) {
        return num.toFixed(2);
    } else {
        return num;
    }
}
// 表格 数据 填入 计算1-7天，8-14天，15-21天，22-28天，总计，下方合计
function inputFocusout(elem) {
    $(elem + " .pc-db-table.tableRight>tbody td.pc-db-table-textInput>input").on("focusout", function () {
        const that = this,
            tdNum = $(that).parent("td").prevAll().length,
            thisTr = $(that).parents("tr"),
            inputElem = $(thisTr).find("input"),
            trNum = $(thisTr).prevAll().length;
        let day7Sum = 0, day14Sum = 0, day21Sum = 0, day28Sum = 0, allSum = 0;
        for (let i = 0; i < inputElem.length; i++) {
            if (notNullTool($(inputElem[i]).val())) {
                const thisInput = parseFloat($(inputElem[i]).val());
                allSum += thisInput;
                if (i >= 0 && i < 7) {
                    day7Sum += thisInput;
                } else if (i >= 7 && i < 14) {
                    day14Sum += thisInput;
                } else if (i >= 14 && i < 21) {
                    day21Sum += thisInput;
                } else if (i >= 21 && i < 28) {
                    day28Sum += thisInput;
                }
            }
        }
        $(elem + " .pc-db-item-table>.pc-db-table.tableLeft>tbody>tr:eq(" + trNum + ")>td:eq(1)").text(get2DOrI(day7Sum));
        $(elem + " .pc-db-item-table>.pc-db-table.tableLeft>tbody>tr:eq(" + trNum + ")>td:eq(2)").text(get2DOrI(day14Sum));

        if (inputElem.length > 14) {
            $(elem + " .pc-db-item-table>.pc-db-table.tableLeft>tbody>tr:eq(" + trNum + ")>td:eq(3)").text(get2DOrI(day21Sum));
            if (inputElem.length > 21) {
                $(elem + " .pc-db-item-table>.pc-db-table.tableLeft>tbody>tr:eq(" + trNum + ")>td:eq(4)").text(get2DOrI(day28Sum));
                $(elem + " .pc-db-item-table>.pc-db-table.tableLeft>tbody>tr:eq(" + trNum + ")>td:eq(5)").text(get2DOrI(allSum));
            } else {
                $(elem + " .pc-db-item-table>.pc-db-table.tableLeft>tbody>tr:eq(" + trNum + ")>td:eq(4)").text(get2DOrI(allSum));
            }
        } else {
            $(elem + " .pc-db-item-table>.pc-db-table.tableLeft>tbody>tr:eq(" + trNum + ")>td:eq(3)").text(get2DOrI(allSum));
        }
        const trWidNum = $(".pc-db-BDDGSPN .pc-db-item-table>.pc-db-table.tableLeft>tbody>tr:last-child>td").length;
        // 肠外营养 左边每日奶量
        if ($(".pc-db-BDDGSPN").length > 0) {
            for (let i = 1; i < trWidNum; i++) {
                let thisColSum = 0;
                for (let j = 1; j < 8; j++) {
                    const numText = $(".pc-db-BDDGSPN .pc-db-item-table>.pc-db-table.tableLeft>tbody>tr:eq(" + j + ")>td:eq(" + i + ")").text();
                    if (notNullTool(numText)) {
                        const num = parseFloat(numText);
                        thisColSum += num;
                    }
                }
                $(".pc-db-BDDGSPN .pc-db-item-table>.pc-db-table.tableLeft>tbody>tr:eq(8)>td:eq(" + i + ")").text(get2DOrI(thisColSum));
            }
            // 肠外营养 右边每日奶量
            let thisColSum = 0;
            for (let i = 1; i < 8; i++) {
                const numInput = $(".pc-db-BDDGSPN .pc-db-item-table>.pc-db-table.tableRight>tbody>tr:eq(" + i +")>td:eq(" + tdNum + ")>input").val();
                if (notNullTool(numInput)) {
                    const num = parseFloat(numInput);
                    thisColSum += num;
                }
            }
            $(".pc-db-BDDGSPN .pc-db-item-table>.pc-db-table.tableRight>tbody>tr:eq(8)>td:eq(" + tdNum + ")").text(get2DOrI(thisColSum));
        }
    });
}
$(document).ready(function () {
    // 引入 layui
    layui.use(["element", "form", "laydate", "layer"], function () {
        let form = layui.form,
            laydate = layui.laydate,
            layer = layui.layer;

        let index = 15;
        // 肠外营养管理
        const pnmElem = $(".pc-db-BDDGSPNM");
        if (pnmElem.length > 0) {
            layer.msg("肠外营养修改后，请务必保存此页！");
            // 获取 肠内营养 初始化数据
            $.get("/perinatalPlatform/basicDatabase/write/DGS/PNM/getInitialData", function (back, status) {
                if (status === "success") {
                    if (back.code) {
                        const initialData = back.initialData,
                            pnList = initialData.pnList,
                            enmList = initialData.enmList,
                            giList = initialData.giList;

                        if (pnList.length > 0) {
                            // 产生 14 天日期
                            let allDateStamp = date14Day(pnmElem),
                                maxDateStamp = allDateStamp[index - 1];
                            // 表格 数据 填入 计算1-7天，8-14天，15-21天，22-28天，总计，下方合计
                            inputFocusout(".pc-db-BDDGSPNM");

                            // 消化系统 肠外营养管理 增加 7 天
                            $(".pc-db-BDDGSPNM #PC-db-add").on("click", function () {
                                const that = this;
                                // 增加 7天
                                let pnm7DayTdElem = "", max = index + 7, pnm7DateTdElem = "", thisDateStamp = maxDateStamp,
                                    pnm7CarbohydrateGPDTdElem = "", pnm7CarbohydrateGPKgPDTdElem = "",
                                    pnm7CarbohydrateCalorieTdElem = "",
                                    pnm7AminoAcidGPDTdElem = "", pnm7AminoAcidGPKgPDTdElem = "",
                                    pnm7AminoAcidCalorieTdElem = "",
                                    pnm7FatEmulsionGPDTdElem = "", pnm7FatEmulsionGPKgPDTdElem = "",
                                    pnm7FatEmulsionCalorieTdElem = "",
                                    pnm7IntravenousNutritionCalorieKcalPDTdElem = "",
                                    pnm7IntravenousNutritionCalorieKcalPKgPDTdElem = "",
                                    pnm7TotalCalorieKcalPDTdElem = "", pnm7TotalCalorieKcalPKgPDTdElem = "",
                                    pnm7TotalLiquidVolumeTdElem = "";
                                while (index < max) {
                                    // 天
                                    pnm7DayTdElem += "<td>" + index + "</td>";
                                    // 增加 7天 日期
                                    const thisDate = new Date(thisDateStamp),
                                        thisDateString = (thisDate.getFullYear() % 100) + "/" + (thisDate.getMonth() + 1) + "/" + thisDate.getDate();
                                    pnm7DateTdElem += "<th>" + thisDateString + "</th>";
                                    allDateStamp[index - 1] = thisDateStamp;
                                    thisDateStamp += 86400000;
                                    // 增加 7天 碳水化合物（g/d）
                                    pnm7CarbohydrateGPDTdElem += "<td class='pc-db-table-textInput'><input type='number' name='carbohydrateGPD" + index + "' readonly></td>";
                                    // 增加 7天 碳水化合物（g/kg/d）
                                    pnm7CarbohydrateGPKgPDTdElem += "<td class='pc-db-table-textInput'><input type='number' name='carbohydrateGPKgPD" + index + "' readonly></td>";
                                    // 增加 7天 碳水化合物热卡（kcal/d）
                                    pnm7CarbohydrateCalorieTdElem += "<td class='pc-db-table-textInput'><input type='number' name='carbohydrateCalorie" + index + "' readonly></td>";
                                    // 增加 7天 氨基酸（g/d）
                                    pnm7AminoAcidGPDTdElem += "<td class='pc-db-table-textInput'><input type='number' name='aminoAcidGPD" + index + "' readonly></td>";
                                    // 增加 7天 氨基酸（g/kg/d）
                                    pnm7AminoAcidGPKgPDTdElem += "<td class='pc-db-table-textInput'><input type='number' name='aminoAcidGPKgPD" + index + "' readonly></td>";
                                    // 增加 7天 氨基酸热卡（kcal/d）
                                    pnm7AminoAcidCalorieTdElem += "<td class='pc-db-table-textInput'><input type='number' name='aminoAcidCalorie" + index + "' readonly></td>";
                                    // 增加 7天 脂肪乳（g/d）
                                    pnm7FatEmulsionGPDTdElem += "<td class='pc-db-table-textInput'><input type='number' name='fatEmulsionGPD" + index + "' readonly></td>";
                                    // 增加 7天 脂肪乳（g/kg/d）
                                    pnm7FatEmulsionGPKgPDTdElem += "<td class='pc-db-table-textInput'><input type='number' name='fatEmulsionGPKgPD" + index + "' readonly></td>";
                                    // 增加 7天 脂肪乳热卡（kcal/d）
                                    pnm7FatEmulsionCalorieTdElem += "<td class='pc-db-table-textInput'><input type='number' name='fatEmulsionCalorie" + index + "' readonly></td>";
                                    // 增加 7天 静脉营养热卡（kcal/d）
                                    pnm7IntravenousNutritionCalorieKcalPDTdElem += "<td class='pc-db-table-textInput'><input type='number' name='intravenousNutritionCalorieKcalPD" + index + "' readonly></td>";
                                    // 增加 7天 静脉营养热卡（kcal/kg/d）
                                    pnm7IntravenousNutritionCalorieKcalPKgPDTdElem += "<td class='pc-db-table-textInput'><input type='number' name='intravenousNutritionCalorieKcalPKgPD" + index + "' readonly></td>";
                                    // 增加 7天 合计热卡（kcal/d）
                                    pnm7TotalCalorieKcalPDTdElem += "<td class='pc-db-table-textInput'><input type='number' name='totalCalorieKcalPD" + index + "' readonly></td>";
                                    // 增加 7天 合计热卡（kcal/kg/d）
                                    pnm7TotalCalorieKcalPKgPDTdElem += "<td class='pc-db-table-textInput'><input type='number' name='totalCalorieKcalPKgPD" + index + "' readonly></td>";
                                    // 增加 7天 合计热卡（kcal/kg/d）
                                    pnm7TotalLiquidVolumeTdElem += "<td class='pc-db-table-textInput'><input type='number' name='totalLiquidVolume" + index + "' readonly></td>";
                                    index++;
                                }
                                $(that).parents("td").before(pnm7DayTdElem);
                                maxDateStamp = thisDateStamp;
                                $(".pc-db-BDDGSPNM .pc-db-table.tableRight>thead>tr>.blockTh").before(pnm7DateTdElem);
                                $(".pc-db-BDDGSPNM .pc-db-table.tableRight>tbody>tr.pc-db-CGPD").append(pnm7CarbohydrateGPDTdElem);
                                $(".pc-db-BDDGSPNM .pc-db-table.tableRight>tbody>tr.pc-db-CGPKPD").append(pnm7CarbohydrateGPKgPDTdElem);
                                $(".pc-db-BDDGSPNM .pc-db-table.tableRight>tbody>tr.pc-db-CC").append(pnm7CarbohydrateCalorieTdElem);
                                $(".pc-db-BDDGSPNM .pc-db-table.tableRight>tbody>tr.pc-db-AAGPD").append(pnm7AminoAcidGPDTdElem);
                                $(".pc-db-BDDGSPNM .pc-db-table.tableRight>tbody>tr.pc-db-AAGPKPD").append(pnm7AminoAcidGPKgPDTdElem);
                                $(".pc-db-BDDGSPNM .pc-db-table.tableRight>tbody>tr.pc-db-AAC").append(pnm7AminoAcidCalorieTdElem);
                                $(".pc-db-BDDGSPNM .pc-db-table.tableRight>tbody>tr.pc-db-FEGPD").append(pnm7FatEmulsionGPDTdElem);
                                $(".pc-db-BDDGSPNM .pc-db-table.tableRight>tbody>tr.pc-db-FEGPKPD").append(pnm7FatEmulsionGPKgPDTdElem);
                                $(".pc-db-BDDGSPNM .pc-db-table.tableRight>tbody>tr.pc-db-FEC").append(pnm7FatEmulsionCalorieTdElem);
                                $(".pc-db-BDDGSPNM .pc-db-table.tableRight>tbody>tr.pc-db-INCKPD").append(pnm7IntravenousNutritionCalorieKcalPDTdElem);
                                $(".pc-db-BDDGSPNM .pc-db-table.tableRight>tbody>tr.pc-db-INCKPKPD").append(pnm7IntravenousNutritionCalorieKcalPKgPDTdElem);
                                $(".pc-db-BDDGSPNM .pc-db-table.tableRight>tbody>tr.pc-db-TCKPD").append(pnm7TotalCalorieKcalPDTdElem);
                                $(".pc-db-BDDGSPNM .pc-db-table.tableRight>tbody>tr.pc-db-TCKPKPD").append(pnm7TotalCalorieKcalPKgPDTdElem);
                                $(".pc-db-BDDGSPNM .pc-db-table.tableRight>tbody>tr.pc-db-TLV").append(pnm7TotalLiquidVolumeTdElem);
                                // 表格 数据 填入 计算1-7天，8-14天，15-21天，22-28天，总计，下方合计
                                inputFocusout(".pc-db-BDDGSPNM");
                                // 增加7-21天总计
                                add7To22DayTotal(max, ".pc-db-BDDGSPNM", 460, 532);
                            });

                            let aminoAcidStartTimeFlag = 0, fatEmulsionStartTimeFlag = 0, aminoAcidUseDays = 0,
                                highestAminoAcidDose = 0, highestAminoAcidDoseTimeStamp = 0,
                                highestFatEmulsionDose = 0, highestFatEmulsionDoseTimeStamp = 0,
                                totalCaloricReach30KcalPKgPDTimeFlag = 0, highestAminoAcidDosePKg = 0,
                                highestFatEmulsionDosePKg = 0, totalCaloricReach80KcalPKgPDTimeFlag = 0,
                                totalCaloricReach120KcalPKgPDTimeFlag = 0,
                                totalCaloricReach150KcalPKgPDTimeFlag = 0, totalAminoAcidUsed = 0, totalFatEmulsionUsed = 0;
                            // 消化系统 肠外营养管理 数据 初始化
                            for (const i in pnList) {
                                const day = pnList[i].day,
                                    glucose50PercentInput = pnList[i].glucose50Percent,
                                    glucose10PercentInput = pnList[i].glucose10Percent,
                                    glucose5PercentInput = pnList[i].glucose5Percent,
                                    sterilizedWater50PercentInput = pnList[i].sterilizedWater50Percent,
                                    aminoAcid6PercentInput = pnList[i].aminoAcid6Percent,
                                    fatMilk20PercentInput = pnList[i].fatMilk20Percent,
                                    nonPNLiquidInput = pnList[i].nonPNLiquid;
                                let weightInput = null, glucose50Percent = 0, glucose10Percent = 0, glucose5Percent = 0,
                                    sterilizedWater50Percent = 0, aminoAcid6Percent = 0, fatMilk20Percent = 0,
                                    nonPNLiquid = 0,
                                    totalMilkCaloriesKcalPDInput = null, totalMilkCaloriesKcalPD = 0,
                                    totalLiquidVolume = 0, totalDailyMilkVolumePKgInput = null, totalDailyMilkVolumePKg = 0;
                                // 找出 本日 体重
                                for (const j in giList) {
                                    if (giList[j].day == day) {
                                        weightInput = giList[j].weight;
                                        break;
                                    }
                                }
                                // 找出 本日 奶量热卡，合计奶量
                                for (const j in enmList) {
                                    if (enmList[j].day == day) {
                                        totalMilkCaloriesKcalPDInput = enmList[j].totalMilkCaloriesKcalPD;
                                        totalDailyMilkVolumePKgInput = enmList[j].totalDailyMilkVolumePKg;
                                        break;
                                    }
                                }
                                let inputLength = $(".pc-db-BDDGSPNM .pc-db-table tr.pc-db-CGPD input").length,
                                    inputBlockLength = inputLength / 7;
                                // 检测 是否 要增加7天
                                while (Math.ceil(day / 7) > inputBlockLength) {
                                    $("#PC-db-add").click();
                                    inputLength = $(".pc-db-BDDGSPNM .pc-db-table tr.pc-db-CGPD input").length;
                                    inputBlockLength = inputLength / 7;
                                }

                                if (notNullTool(weightInput)) {
                                    const weight = parseFloat(weightInput);
                                    let carbohydrateGPD = 0, intravenousNutritionCalorieKcalPD = 0;
                                    // 计算 碳水化合物（g/d）
                                    if (notNullTool(glucose50PercentInput)) {
                                        glucose50Percent = parseFloat(glucose50PercentInput);
                                        carbohydrateGPD += glucose50Percent * 0.5;
                                        // 合计液体量 累加
                                        totalLiquidVolume += glucose50Percent;
                                    }
                                    if (notNullTool(glucose10PercentInput)) {
                                        glucose10Percent = parseFloat(glucose10PercentInput);
                                        carbohydrateGPD += glucose10Percent * 0.1;
                                        // 合计液体量 累加
                                        totalLiquidVolume += glucose10Percent;
                                    }
                                    if (notNullTool(glucose5PercentInput)) {
                                        glucose5Percent = parseFloat(glucose5PercentInput);
                                        carbohydrateGPD += glucose5Percent * 0.05;
                                        // 合计液体量 累加
                                        totalLiquidVolume += glucose5Percent;
                                    }
                                    if (carbohydrateGPD > 0) {
                                        $(".pc-db-BDDGSPNM .pc-db-table tr.pc-db-CGPD>td>input[name=carbohydrateGPD" + day + "]").val(carbohydrateGPD.toFixed(2)).focusout();
                                        // 计算 碳水化合物（g/kg/d）、碳水化合物热卡（kcal/d）
                                        const carbohydrateGPKgPD = carbohydrateGPD / weight,
                                            carbohydrateCalorie = carbohydrateGPD * 4;
                                        $(".pc-db-BDDGSPNM .pc-db-table tr.pc-db-CGPKPD>td>input[name=carbohydrateGPKgPD" + day + "]").val(carbohydrateGPKgPD.toFixed(2)).focusout();
                                        $(".pc-db-BDDGSPNM .pc-db-table tr.pc-db-CC>td>input[name=carbohydrateCalorie" + day + "]").val(carbohydrateCalorie.toFixed(2)).focusout();
                                        // 静脉营养热卡 累加
                                        intravenousNutritionCalorieKcalPD += carbohydrateCalorie;
                                    }
                                    if (notNullTool(aminoAcid6PercentInput)) {
                                        // 计算 氨基酸（g/d）、氨基酸（g/kg/d）、氨基酸热卡（kcal/d）
                                        aminoAcid6Percent = parseFloat(aminoAcid6PercentInput);
                                        const aminoAcidGPD = aminoAcid6Percent * 0.06,
                                            aminoAcidGPKgPD = aminoAcidGPD / weight,
                                            aminoAcidCalorie = aminoAcidGPD * 4;
                                        $(".pc-db-BDDGSPNM .pc-db-table tr.pc-db-AAGPD>td>input[name=aminoAcidGPD" + day + "]").val(aminoAcidGPD.toFixed(2)).focusout();
                                        $(".pc-db-BDDGSPNM .pc-db-table tr.pc-db-AAGPKPD>td>input[name=aminoAcidGPKgPD" + day + "]").val(aminoAcidGPKgPD.toFixed(2)).focusout();
                                        $(".pc-db-BDDGSPNM .pc-db-table tr.pc-db-AAC>td>input[name=aminoAcidCalorie" + day + "]").val(aminoAcidCalorie.toFixed(2)).focusout();
                                        // 静脉营养热卡 累加
                                        intravenousNutritionCalorieKcalPD += aminoAcidCalorie;
                                        // 合计液体量 累加
                                        totalLiquidVolume += aminoAcid6Percent;
                                        // 氨基酸 开始使用时间
                                        if (aminoAcidStartTimeFlag === 0) {
                                            $("#PC-db-AAST").val(dateFormatDay(allDateStamp[day - 1]));
                                            // 氨基酸 开始使用剂量
                                            $("#PC-db-AASD").val(aminoAcidGPKgPD.toFixed(2));
                                            aminoAcidStartTimeFlag = 1;
                                        }
                                        // 使用氨基酸天数（静脉营养时间）
                                        aminoAcidUseDays++;
                                        // 找出 氨基酸最大值时 的日期、值
                                        if (aminoAcid6Percent > highestAminoAcidDose) {
                                            highestAminoAcidDose = aminoAcid6Percent;
                                            // 氨基酸最大值时 的日期
                                            highestAminoAcidDoseTimeStamp = allDateStamp[day - 1];
                                            // 氨基酸最大值时 的值
                                            highestAminoAcidDosePKg = aminoAcidGPKgPD;
                                        }
                                        // 氨基酸停止使用的时间
                                        $("#PC-db-SAAT").val(dateFormatDay(allDateStamp[day - 1]));
                                        // 氨基酸使用总量 累加
                                        totalAminoAcidUsed += aminoAcidGPD;
                                    }
                                    if (notNullTool(fatMilk20PercentInput)) {
                                        // 计算 脂肪乳（g/d）、脂肪乳（g/kg/d）、脂肪乳热卡（kcal/d）
                                        fatMilk20Percent = parseFloat(fatMilk20PercentInput);
                                        const fatEmulsionGPD = fatMilk20Percent * 0.2,
                                            fatEmulsionGPKgPD = fatEmulsionGPD / weight,
                                            fatEmulsionCalorie = fatEmulsionGPD * 9;
                                        $(".pc-db-BDDGSPNM .pc-db-table tr.pc-db-FEGPD>td>input[name=fatEmulsionGPD" + day + "]").val(fatEmulsionGPD.toFixed(2)).focusout();
                                        $(".pc-db-BDDGSPNM .pc-db-table tr.pc-db-FEGPKPD>td>input[name=fatEmulsionGPKgPD" + day + "]").val(fatEmulsionGPKgPD.toFixed(2)).focusout();
                                        $(".pc-db-BDDGSPNM .pc-db-table tr.pc-db-FEC>td>input[name=fatEmulsionCalorie" + day + "]").val(fatEmulsionCalorie.toFixed(2)).focusout();
                                        // 静脉营养热卡 累加
                                        intravenousNutritionCalorieKcalPD += fatEmulsionCalorie;
                                        // 合计液体量 累加
                                        totalLiquidVolume += fatMilk20Percent;
                                        // 脂肪乳 开始使用时间
                                        if (fatEmulsionStartTimeFlag === 0) {
                                            const fatEmulsionStartTimeStamp = allDateStamp[day - 1],
                                                fatEmulsionStartTime = new Date(fatEmulsionStartTimeStamp);
                                            $("#PC-db-FEST").val(dateFormatDay(fatEmulsionStartTime));
                                            // 脂肪乳 开始使用剂量
                                            $("#PC-db-FESD").val(fatEmulsionGPKgPD.toFixed(2));
                                            fatEmulsionStartTimeFlag = 1;
                                        }
                                        // 找出 脂肪乳最大值时 的日期、值
                                        if (fatMilk20Percent > highestFatEmulsionDose) {
                                            highestFatEmulsionDose = fatMilk20Percent;
                                            // 脂肪乳最大值时 的日期
                                            highestFatEmulsionDoseTimeStamp = allDateStamp[day - 1];
                                            // 脂肪乳最大值时 的值
                                            highestFatEmulsionDosePKg = fatEmulsionGPKgPD;
                                        }
                                        // 脂肪乳停止使用的时间
                                        $("#PC-db-SFET").val(dateFormatDay(allDateStamp[day - 1]));
                                        // 脂肪乳使用总量 累加
                                        totalFatEmulsionUsed += fatEmulsionGPD;
                                    }
                                    // 计算 静脉营养热卡（kcal/d）
                                    if (intravenousNutritionCalorieKcalPD > 0) {
                                        $(".pc-db-BDDGSPNM .pc-db-table tr.pc-db-INCKPD>td>input[name=intravenousNutritionCalorieKcalPD" + day + "]").val(intravenousNutritionCalorieKcalPD.toFixed(2)).focusout();
                                        // 计算 静脉营养热卡（kcal/d）
                                        const intravenousNutritionCalorieKcalPKgPD = intravenousNutritionCalorieKcalPD / weight;
                                        $(".pc-db-BDDGSPNM .pc-db-table tr.pc-db-INCKPKPD>td>input[name=intravenousNutritionCalorieKcalPKgPD" + day + "]").val(intravenousNutritionCalorieKcalPKgPD.toFixed(2)).focusout();
                                    }
                                    // 奶量热卡
                                    if (notNullTool(totalMilkCaloriesKcalPDInput)) {
                                        totalMilkCaloriesKcalPD = parseFloat(totalMilkCaloriesKcalPDInput);
                                    }
                                    // 合计奶量
                                    if (notNullTool(totalDailyMilkVolumePKgInput)) {
                                        totalDailyMilkVolumePKg = parseFloat(totalDailyMilkVolumePKgInput);
                                    }
                                    // 50% 灭菌水 液体量
                                    if (notNullTool(sterilizedWater50PercentInput)) {
                                        sterilizedWater50Percent = parseFloat(sterilizedWater50PercentInput);
                                        // 合计液体量 累加
                                        totalLiquidVolume += sterilizedWater50Percent;
                                    }
                                    // 非PN液体 液体量
                                    if (notNullTool(nonPNLiquidInput)) {
                                        nonPNLiquid = parseFloat(nonPNLiquidInput);
                                        // 合计液体量 累加
                                        totalLiquidVolume += nonPNLiquid;
                                    }
                                    // 计算 合计热卡（kcal/d）
                                    if (intravenousNutritionCalorieKcalPD > 0) {
                                        const totalCalorieKcalPD = intravenousNutritionCalorieKcalPD + totalMilkCaloriesKcalPD;
                                        $(".pc-db-BDDGSPNM .pc-db-table tr.pc-db-TCKPD>td>input[name=totalCalorieKcalPD" + day + "]").val(totalCalorieKcalPD.toFixed(2)).focusout();
                                        // 计算 合计热卡（kcal/kg/d）
                                        const totalCalorieKcalPKgPD = totalCalorieKcalPD / weight;
                                        $(".pc-db-BDDGSPNM .pc-db-table tr.pc-db-TCKPKPD>td>input[name=totalCalorieKcalPKgPD" + day + "]").val(totalCalorieKcalPKgPD.toFixed(2)).focusout();
                                        // 计算 氨基酸停止使用时热卡（循环到最后一个氨基酸）
                                        if (notNullTool(aminoAcid6PercentInput)) {
                                            $("#PC-db-AASUC").val(totalCalorieKcalPKgPD.toFixed(2));
                                        }
                                        // 计算 合计热卡达30kcal/kg/d的时间
                                        if (totalCalorieKcalPKgPD >= 30 && totalCaloricReach30KcalPKgPDTimeFlag === 0) {
                                            $("#PC-db-TCR30KPKPDT").val(dateFormatDay(allDateStamp[day - 1]));
                                            totalCaloricReach30KcalPKgPDTimeFlag = 1;
                                        }
                                        // 计算 合计热卡达80kcal/kg/d的时间
                                        if (totalCalorieKcalPKgPD >= 80 && totalCaloricReach80KcalPKgPDTimeFlag === 0) {
                                            $("#PC-db-TCR80KPKPDT").val(dateFormatDay(allDateStamp[day - 1]));
                                            totalCaloricReach80KcalPKgPDTimeFlag = 1;
                                        }
                                        // 计算 合计热卡达120kcal/kg/d的时间
                                        if (totalCalorieKcalPKgPD >= 120 && totalCaloricReach120KcalPKgPDTimeFlag === 0) {
                                            $("#PC-db-TCR120KPKPDT").val(dateFormatDay(allDateStamp[day - 1]));
                                            totalCaloricReach120KcalPKgPDTimeFlag = 1;
                                        }
                                        // 计算 合计热卡达150kcal/kg/d的时间
                                        if (totalCalorieKcalPKgPD >= 150 && totalCaloricReach150KcalPKgPDTimeFlag === 0) {
                                            $("#PC-db-TCR150KPKPDT").val(dateFormatDay(allDateStamp[day - 1]));
                                            totalCaloricReach150KcalPKgPDTimeFlag = 1;
                                        }
                                    }
                                    // 计算 合计液体量（ml/kg/d）
                                    if (totalLiquidVolume > 0) {
                                        const totalLiquidVolumePKg = totalLiquidVolume / weight + totalDailyMilkVolumePKg;
                                        $(".pc-db-BDDGSPNM .pc-db-table tr.pc-db-TLV>td>input[name=totalLiquidVolume" + day + "]").val(totalLiquidVolumePKg.toFixed(2)).focusout();
                                    }
                                } else {
                                    layer.msg("请先填写 第" + day + "天新生儿体重！", {
                                        icon: 7,
                                        time: 0,
                                        anim: 6,
                                        btn: "好!",
                                        resize: false,
                                        shade: 0.8
                                    });
                                }
                            }
                            // 静脉营养时间
                            if (aminoAcidUseDays > 0) {
                                $("#PC-db-INT").val(aminoAcidUseDays);
                            }
                            // 氨基酸最高剂量的时间
                            if (highestAminoAcidDoseTimeStamp > 0) {
                                $("#PC-db-HAADT").val(dateFormatDay(highestAminoAcidDoseTimeStamp));
                            }
                            // 脂肪乳最高剂量的时间
                            if (highestFatEmulsionDoseTimeStamp > 0) {
                                $("#PC-db-HFEDT").val(dateFormatDay(highestFatEmulsionDoseTimeStamp));
                            }
                            // 氨基酸最高剂量
                            if (highestAminoAcidDosePKg > 0) {
                                $("#PC-db-HAAD").val(highestAminoAcidDosePKg.toFixed(2));
                            }
                            // 脂肪乳最高剂量
                            if (highestFatEmulsionDosePKg > 0) {
                                $("#PC-db-HFED").val(highestFatEmulsionDosePKg.toFixed(2));
                            }
                            // 氨基酸使用总量
                            if (totalAminoAcidUsed > 0) {
                                $("#PC-db-TAAU").val(totalAminoAcidUsed.toFixed(2));
                            }
                            // 脂肪乳使用总量
                            if (totalFatEmulsionUsed > 0) {
                                $("#PC-db-TFEU").val(totalFatEmulsionUsed.toFixed(2));
                            }
                        } else {
                            layer.msg("请先填写 肠外营养！", {
                                icon: 7,
                                time: 0,
                                anim: 6,
                                btn: "好!",
                                resize: false,
                                shade: 0.8
                            }, function () {
                                location.href="/perinatalPlatform/basicDatabase/write/DGS/PN";
                            });
                        }
                    }
                }
            }, "json");
        }

        // 肠外营养
        let tpIndex = 0;
        const pnElem = $(".pc-db-BDDGSPN");
        if (pnElem.length > 0) {
            //let maxDateStamp = 0;
            // 产生 14 天日期
            let allDateStamp = date14Day(pnElem),
                maxDateStamp = allDateStamp[index - 1];
            // 表格 数据 填入 计算1-7天，8-14天，15-21天，22-28天，总计，下方合计
            inputFocusout(".pc-db-BDDGSPN");

            // 消化系统 肠外营养 增加 7 天
            $(".pc-db-BDDGSPN #PC-db-add").on("click", function () {
                const that = this;
                // 增加 7天
                let pn7DayTdElem = "", max = index + 7, pn7DateTdElem = "", thisDateStamp = maxDateStamp,
                    pn7Glucose50PercentTdElem = "", pn7Glucose10PercentTdElem = "", pn7Glucose5PercentTdElem = "", pn7SterilizedWater50PercentTdElem = "",
                    pn7AminoAcid6PercentTdElem = "", pn7FatMilk20PercentTdElem  = "", pn7NonPNLiquidTdElem  = "", pnColSumElem = "";
                while (index < max) {
                    // 天
                    pn7DayTdElem += "<td>" + index + "</td>";
                    // 增加 7天 日期
                    const thisDate = new Date(thisDateStamp),
                        thisDateString = (thisDate.getFullYear() % 100) + "/" + (thisDate.getMonth() + 1) + "/" + thisDate.getDate();
                    pn7DateTdElem += "<th>" + thisDateString + "</th>";
                    thisDateStamp += 86400000;
                    // 增加 7天 50%葡萄糖
                    pn7Glucose50PercentTdElem += "<td class='pc-db-table-textInput'><input type='number' name='glucose50Percent" + index + "'></td>";
                    // 增加 7天 10%葡萄糖
                    pn7Glucose10PercentTdElem += "<td class='pc-db-table-textInput'><input type='number' name='glucose10Percent" + index + "'></td>";
                    // 增加 7天 5%葡萄糖
                    pn7Glucose5PercentTdElem += "<td class='pc-db-table-textInput'><input type='number' name='glucose5Percent" + index + "'></td>";
                    // 增加 7天 50%灭菌水
                    pn7SterilizedWater50PercentTdElem += "<td class='pc-db-table-textInput'><input type='number' name='sterilizedWater50Percent" + index + "'></td>";
                    // 增加 7天 6%氨基酸
                    pn7AminoAcid6PercentTdElem += "<td class='pc-db-table-textInput'><input type='number' name='aminoAcid6Percent" + index + "'></td>";
                    // 增加 7天 20%脂肪乳
                    pn7FatMilk20PercentTdElem += "<td class='pc-db-table-textInput'><input type='number' name='fatMilk20Percent" + index + "'></td>";
                    // 增加 7天 非PN液体
                    pn7NonPNLiquidTdElem += "<td class='pc-db-table-textInput'><input type='number' name='nonPNLiquid" + index + "'></td>";
                    pnColSumElem += "<td>0</td>";
                    index++;
                }
                $(that).parents("td").before(pn7DayTdElem);
                maxDateStamp = thisDateStamp;
                $(".pc-db-BDDGSPN .pc-db-table.tableRight>thead>tr>.blockTh").before(pn7DateTdElem);
                $(".pc-db-BDDGSPN .pc-db-table.tableRight>tbody>tr.pc-db-G50P").append(pn7Glucose50PercentTdElem);
                $(".pc-db-BDDGSPN .pc-db-table.tableRight>tbody>tr.pc-db-G10P").append(pn7Glucose10PercentTdElem);
                $(".pc-db-BDDGSPN .pc-db-table.tableRight>tbody>tr.pc-db-G5P").append(pn7Glucose5PercentTdElem);
                $(".pc-db-BDDGSPN .pc-db-table.tableRight>tbody>tr.pc-db-SW").append(pn7SterilizedWater50PercentTdElem);
                $(".pc-db-BDDGSPN .pc-db-table.tableRight>tbody>tr.pc-db-AA6P").append(pn7AminoAcid6PercentTdElem);
                $(".pc-db-BDDGSPN .pc-db-table.tableRight>tbody>tr.pc-db-FM20P").append(pn7FatMilk20PercentTdElem);
                $(".pc-db-BDDGSPN .pc-db-table.tableRight>tbody>tr.pc-db-NPNL").append(pn7NonPNLiquidTdElem);
                $(".pc-db-BDDGSPN .pc-db-table.tableRight>tbody>tr.pc-db-colSum").append(pnColSumElem);
                // 表格 数据 填入 计算1-7天，8-14天，15-21天，22-28天，总计，下方合计
                inputFocusout(".pc-db-BDDGSPN");
                // 增加7-21天总计
                add7To22DayTotal(max, ".pc-db-BDDGSPN", 418, 490);
            });

            // 获取 肠外营养 信息 初始化
            $.get("/perinatalPlatform/basicDatabase/write/DGS/PN/getData", function (back, status) {
                if (status === "success") {
                    if (back.code) {
                        const pnDataList = back.pnDataList;
                        if (pnDataList.length > 0) {
                            layer.msg("出生日期、胎龄、入院日期等信息 修改后，请务必再次保存此页！");
                        }
                        // 遍历 列表
                        for (const i in pnDataList) {
                            const day = pnDataList[i].day,
                                glucose50Percent = pnDataList[i].glucose50Percent,
                                glucose10Percent = pnDataList[i].glucose10Percent,
                                glucose5Percent = pnDataList[i].glucose5Percent,
                                sterilizedWater50Percent = pnDataList[i].sterilizedWater50Percent,
                                aminoAcid6Percent = pnDataList[i].aminoAcid6Percent,
                                fatMilk20Percent = pnDataList[i].fatMilk20Percent,
                                nonPNLiquid = pnDataList[i].nonPNLiquid;
                            let inputLength = $(".pc-db-BDDGSPN .pc-db-table tr.pc-db-G50P input").length,
                                inputBlockLength = inputLength / 7;
                            // 检测 是否 要增加7天
                            while (Math.ceil(day / 7) > inputBlockLength) {
                                $("#PC-db-add").click();
                                inputLength = $(".pc-db-BDDGSPN .pc-db-table tr.pc-db-G50P input").length;
                                inputBlockLength = inputLength / 7;
                            }
                            if (notNullTool(glucose50Percent)) {
                                const thisInputElem = $(".pc-db-BDDGSPN .pc-db-table tr.pc-db-G50P>td>input[name=glucose50Percent" + day + "]");
                                $(thisInputElem).val(glucose50Percent);
                                $(thisInputElem).focusout();
                            }
                            if (notNullTool(glucose10Percent)) {
                                const thisInputElem = $(".pc-db-BDDGSPN .pc-db-table tr.pc-db-G10P>td>input[name=glucose10Percent" + day + "]");
                                $(thisInputElem).val(glucose10Percent);
                                $(thisInputElem).focusout();
                            }
                            if (notNullTool(glucose5Percent)) {
                                const thisInputElem = $(".pc-db-BDDGSPN .pc-db-table tr.pc-db-G5P>td>input[name=glucose5Percent" + day + "]");
                                $(thisInputElem).val(glucose5Percent);
                                $(thisInputElem).focusout();
                            }
                            if (notNullTool(sterilizedWater50Percent)) {
                                const thisInputElem = $(".pc-db-BDDGSPN .pc-db-table tr.pc-db-SW>td>input[name=sterilizedWater50Percent" + day + "]");
                                $(thisInputElem).val(sterilizedWater50Percent);
                                $(thisInputElem).focusout();
                            }
                            if (notNullTool(aminoAcid6Percent)) {
                                const thisInputElem = $(".pc-db-BDDGSPN .pc-db-table tr.pc-db-AA6P>td>input[name=aminoAcid6Percent" + day + "]");
                                $(thisInputElem).val(aminoAcid6Percent);
                                $(thisInputElem).focusout();
                            }
                            if (notNullTool(fatMilk20Percent)) {
                                const thisInputElem = $(".pc-db-BDDGSPN .pc-db-table tr.pc-db-FM20P>td>input[name=fatMilk20Percent" + day + "]");
                                $(thisInputElem).val(fatMilk20Percent);
                                $(thisInputElem).focusout();
                            }
                            if (notNullTool(nonPNLiquid)) {
                                const thisInputElem = $(".pc-db-BDDGSPN .pc-db-table tr.pc-db-NPNL>td>input[name=nonPNLiquid" + day + "]");
                                $(thisInputElem).val(nonPNLiquid);
                                $(thisInputElem).focusout();
                            }
                        }
                        inputFocusout(".pc-db-BDDGSPN");
                    }
                }
            }, "json");

            let startTpDate = [], endTpDate = [], startTpDateStamp = [0], endTpDateStamp = [0];
            // 获取 置管 表格长度 初始值
            const tpIndexInput = $(".pc-db-BDDGSPN .pc-db-item-table.addList>.pc-db-table>tbody").attr("data-num");
            if (notNullTool(tpIndexInput)) {
                tpIndex = parseInt(tpIndexInput);
                let intubationTotalDays = 0;
                // 为 日期 选择 初始化
                for (let i = 1; i <= tpIndex; i++) {
                    const thisTpIndex = i;
                    // 为 日期 初始化
                    const thisStartTpDateInput = $("#PC-db-startTpDate" + thisTpIndex).val(),
                        thisEndTpDateInput = $("#PC-db-endTpDate" + thisTpIndex).val();
                    if (notNullTool(thisStartTpDateInput)) {
                        startTpDate[thisTpIndex] = thisStartTpDateInput;
                        startTpDateStamp[thisTpIndex] = Date.parse(startTpDate[thisTpIndex]);
                    }
                    if (notNullTool(thisEndTpDateInput)) {
                        endTpDate[thisTpIndex] = thisEndTpDateInput;
                        endTpDateStamp[thisTpIndex] = Date.parse(endTpDate[thisTpIndex]);
                    }
                    laydate.render({
                        elem: "#PC-db-startTpDate" + thisTpIndex,
                        type: "datetime",
                        format: "yyyy-MM-dd HH:mm:ss",
                        max: 1,
                        done: function(value, date) {
                            if(value !== "") {
                                startTpDate[thisTpIndex] = date.year + "-" + date.month + "-" + date.date +  ' ' + date.hours + ':' + date.minutes + ':' + date.seconds;
                                startTpDateStamp[thisTpIndex] = Date.parse(startTpDate[thisTpIndex]);
                                if (notNullTool(endTpDate[thisTpIndex])) {
                                    if (startTpDateStamp[thisTpIndex] <= endTpDateStamp[thisTpIndex]) {
                                        $("#PC-db-totalDays" + thisTpIndex).val(Math.floor((endTpDateStamp[thisTpIndex] - startTpDateStamp[thisTpIndex]) / 86400000));
                                    } else {
                                        layer.msg("开始时间必须<span class='layui-badge'>早于</span>结束时间！", {
                                            icon: 5,
                                            time: 3000,
                                            anim: 6,
                                            btn: "好",
                                            resize: false,
                                            shade: 0.8
                                        }, function () {
                                            $("#PC-db-startTpDate" + thisTpIndex).val("");
                                            startTpDate[thisTpIndex] = null;
                                            startTpDateStamp[thisTpIndex] = 0;
                                        });
                                    }
                                }
                            }else {
                                startTpDate[thisTpIndex] = null;
                                startTpDateStamp[thisTpIndex] = 0;
                            }
                        }
                    });
                    laydate.render({
                        elem: "#PC-db-endTpDate" + thisTpIndex,
                        type: "datetime",
                        format: "yyyy-MM-dd HH:mm:ss",
                        max: 1,
                        done: function(value, date) {
                            if(value !== "") {
                                endTpDate[thisTpIndex] = date.year + "-" + date.month + "-" + date.date +  ' ' + date.hours + ':' + date.minutes + ':' + date.seconds;
                                endTpDateStamp[thisTpIndex] = Date.parse(endTpDate[thisTpIndex]);
                                if (notNullTool(startTpDateStamp[thisTpIndex])) {
                                    if (startTpDateStamp[thisTpIndex] <= endTpDateStamp[thisTpIndex]) {
                                        $("#PC-db-totalDays" + thisTpIndex).val(Math.floor((endTpDateStamp[thisTpIndex] - startTpDateStamp[thisTpIndex]) / 86400000));
                                    } else {
                                        layer.msg("结束时间必须<span class='layui-badge'>晚于</span>开始时间！", {
                                            icon: 5,
                                            time: 3000,
                                            anim: 6,
                                            btn: "好",
                                            resize: false,
                                            shade: 0.8
                                        }, function () {
                                            $("#PC-db-endTpDate" + thisTpIndex).val("");
                                            endTpDate[thisTpIndex] = null;
                                            endTpDateStamp[thisTpIndex] = 0;
                                        });
                                    }
                                }
                            }else {
                                endTpDate[thisTpIndex] = null;
                                endTpDateStamp[thisTpIndex] = 0;
                            }
                        }
                    });
                    const totalDaysInput = $("#PC-db-totalDays" + thisTpIndex).val();
                    if (notNullTool(totalDaysInput)) {
                        const totalDays = parseInt(totalDaysInput);
                        intubationTotalDays += totalDays;
                    }
                }
                $("#PC-db-CTD").val(intubationTotalDays);
            }

            // 置管 表格 增加
            let intubationTotalDays = 0;
            $("#PC-db-addTP").on("click", function () {
                const that = this;
                tpIndex++;
                sequentialExecution(function () {
                    $(that).parents("tr").before(
                        "<tr>" +
                        "   <td>" +
                        "       <select name='tubePlacement" + tpIndex + "' lay-reqText='请选择置管方式！' lay-verify='required'>" +
                        "           <option value=''>请选择置管方式</option>" +
                        "           <option value='脐静脉置管'>脐静脉置管</option>" +
                        "           <option value='脐动脉置管'>脐动脉置管</option>" +
                        "           <option value='PICC'>PICC</option>" +
                        "           <option value='外周静脉置管'>外周静脉置管</option>" +
                        "           <option value='外周动脉置管'>外周动脉置管</option>" +
                        "           <option value='外科中心静脉置管'>外科中心静脉置管</option>" +
                        "       </select>" +
                        "   </td>" +
                        "   <td class='startDate'>" +
                        "       <input id='PC-db-startTpDate" + tpIndex + "' type='text' name='startTpDate" + tpIndex + "' lay-verify='required' placeholder='请选择开始时间' lay-reqText='请选择开始时间！' readonly>" +
                        "   </td>" +
                        "   <td class='endDate'>" +
                        "       <input id='PC-db-endTpDate" + tpIndex + "' type='text' name='endTpDate" + tpIndex + "' lay-verify='required' placeholder='请选择结束时间' lay-reqText='请选择结束时间！' readonly>" +
                        "   </td>" +
                        "   <td>" +
                        "       <input id='PC-db-totalDays" + tpIndex + "' type='number' name='totalDays" + tpIndex + "' class='totalDays' lay-verify='required' readonly>" +
                        "   </td>" +
                        "   <td>" +
                        "       <button onclick='deleteTp(this);' class='pc-btn pc-btn-danger'><i class='iconfont icon-delete'></i></button>" +
                        "   </td>" +
                        "</tr>");
                }, function () {
                    const thisTpIndex = tpIndex;
                    laydate.render({
                        elem: "#PC-db-startTpDate" + thisTpIndex,
                        type: "datetime",
                        format: "yyyy-MM-dd HH:mm:ss",
                        max: 1,
                        done: function(value, date) {
                            if(value !== "") {
                                startTpDate[thisTpIndex] = date.year + "-" + date.month + "-" + date.date +  ' ' + date.hours + ':' + date.minutes + ':' + date.seconds;
                                startTpDateStamp[thisTpIndex] = Date.parse(startTpDate[thisTpIndex]);
                                if (notNullTool(endTpDate[thisTpIndex])) {
                                    if (startTpDateStamp[thisTpIndex] <= endTpDateStamp[thisTpIndex]) {
                                        $("#PC-db-totalDays" + thisTpIndex).val(Math.floor((endTpDateStamp[thisTpIndex] - startTpDateStamp[thisTpIndex]) / 86400000));
                                        for (let i = 1; i <= tpIndex; i++) {
                                            const totalDaysInput = $("#PC-db-totalDays" + i).val();
                                            if (notNullTool(totalDaysInput)) {
                                                const totalDays = parseInt(totalDaysInput);
                                                intubationTotalDays += totalDays;
                                            }
                                        }
                                        $("#PC-db-CTD").val(intubationTotalDays);
                                    } else {
                                        layer.msg("开始时间必须<span class='layui-badge'>早于</span>结束时间！", {
                                            icon: 5,
                                            time: 3000,
                                            anim: 6,
                                            btn: "好",
                                            resize: false,
                                            shade: 0.8
                                        }, function () {
                                            $("#PC-db-startTpDate" + thisTpIndex).val("");
                                            startTpDate[thisTpIndex] = null;
                                            startTpDateStamp[thisTpIndex] = 0;
                                        });
                                    }
                                }
                            }else {
                                startTpDate[thisTpIndex] = null;
                                startTpDateStamp[thisTpIndex] = 0;
                            }
                        }
                    });
                    laydate.render({
                        elem: "#PC-db-endTpDate" + thisTpIndex,
                        type: "datetime",
                        format: "yyyy-MM-dd HH:mm:ss",
                        max: 1,
                        done: function(value, date) {
                            if(value !== "") {
                                endTpDate[thisTpIndex] = date.year + "-" + date.month + "-" + date.date +  ' ' + date.hours + ':' + date.minutes + ':' + date.seconds;
                                endTpDateStamp[thisTpIndex] = Date.parse(endTpDate[thisTpIndex]);
                                if (notNullTool(startTpDateStamp[thisTpIndex])) {
                                    if (startTpDateStamp[thisTpIndex] <= endTpDateStamp[thisTpIndex]) {
                                        $("#PC-db-totalDays" + thisTpIndex).val(Math.floor((endTpDateStamp[thisTpIndex] - startTpDateStamp[thisTpIndex]) / 86400000));
                                        for (let i = 1; i <= tpIndex; i++) {
                                            const totalDaysInput = $("#PC-db-totalDays" + i).val();
                                            if (notNullTool(totalDaysInput)) {
                                                const totalDays = parseInt(totalDaysInput);
                                                intubationTotalDays += totalDays;
                                            }
                                        }
                                        $("#PC-db-CTD").val(intubationTotalDays);
                                    } else {
                                        layer.msg("结束时间必须<span class='layui-badge'>晚于</span>开始时间！", {
                                            icon: 5,
                                            time: 3000,
                                            anim: 6,
                                            btn: "好",
                                            resize: false,
                                            shade: 0.8
                                        }, function () {
                                            $("#PC-db-endTpDate" + thisTpIndex).val("");
                                            endTpDate[thisTpIndex] = null;
                                            endTpDateStamp[thisTpIndex] = 0;
                                        });
                                    }
                                }
                            }else {
                                endTpDate[thisTpIndex] = null;
                                endTpDateStamp[thisTpIndex] = 0;
                            }
                        }
                    });
                }, function () {
                    form.render("select");
                });
            });
        }

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

        // 基础数据库 消化系统 肠外营养 添加/编辑 信息 提交
        form.on("submit(DGSPN)", function (data) {
            const doing = "保存信息";
            loading(doing);
            let field = data.field, pnDataArray = [], pnTpArray = [];
            for (let i = 1; i <= index; i++) {
                if (notNullTool(field["glucose50Percent" + i]) || notNullTool(field["glucose10Percent" + i]) || notNullTool(field["glucose5Percent" + i]) ||
                    notNullTool(field["sterilizedWater50Percent" + i]) || notNullTool(field["aminoAcid6Percent" + i]) || notNullTool(field["fatMilk20Percent" + i]) ||
                    notNullTool(field["nonPNLiquid" + i])) {
                    pnDataArray.push({
                        day: i,
                        glucose50Percent: field["glucose50Percent" + i],
                        glucose10Percent: field["glucose10Percent" + i],
                        glucose5Percent: field["glucose5Percent" + i],
                        sterilizedWater50Percent: field["sterilizedWater50Percent" + i],
                        aminoAcid6Percent: field["aminoAcid6Percent" + i],
                        fatMilk20Percent: field["fatMilk20Percent" + i],
                        nonPNLiquid: field["nonPNLiquid" + i]
                    });
                }
                delete field["glucose50Percent" + i];
                delete field["glucose10Percent" + i];
                delete field["glucose5Percent" + i];
                delete field["sterilizedWater50Percent" + i];
                delete field["aminoAcid6Percent" + i];
                delete field["fatMilk20Percent" + i];
                delete field["nonPNLiquid" + i];
            }
            field.pnDataArray = JSON.stringify(pnDataArray);
            for (let i = 1; i <= tpIndex; i++) {
                if (field["tubePlacement" + i] !== undefined) {
                    pnTpArray.push({
                        tubePlacement: field["tubePlacement" + i],
                        startTpDate: field["startTpDate" + i],
                        endTpDate: field["endTpDate" + i],
                        totalDays: field["totalDays" + i]
                    });
                    delete field["tubePlacement" + i];
                    delete field["startTpDate" + i];
                    delete field["endTpDate" + i];
                    delete field["totalDays" + i];
                }
            }
            field.pnTpArray = JSON.stringify(pnTpArray);

            // 左边 统计数据
            let dataTypeList = ["glucose50p", "glucose10p", "glucose5p", "sterilizedWater50p", "aminoAcid6p",
                "fatEmulsion20p", "nonPNLiquid", "totalLiquidVolume"];
            const tdLength = $(".pc-db-BDDGSPN .pc-db-item-table>.pc-db-table.tableLeft>tbody>tr:eq(1)>td").length;
            for (let i = 0; i < dataTypeList.length; i ++) {
                const trNum = i + 1;
                for (let j = 0; j < tdLength - 1; j ++) {
                    const tdNum = j + 1,
                        num = $(".pc-db-BDDGSPN .pc-db-item-table>.pc-db-table.tableLeft>tbody>tr:eq(" + trNum + ")>td:eq(" + tdNum + ")").text();
                    if (notNullTool(num)) {
                        if (j < tdLength - 2) {
                            field[dataTypeList[i] + (j * 7 + 1) + "to" + ((j + 1) * 7) + "d"] = parseFloat(num);
                        } else {
                            field[dataTypeList[i] + "Total"] = parseFloat(num);
                        }
                    }
                }
            }

            $.post("/perinatalPlatform/basicDatabase/write/DGS/PN/post", field, function (back, status) {
                if(status === "success") {
                    if(back.code) {
                        successNext();
                    }else {failMsg(doing)}
                }else {errorMsg1()}
            }, "json").fail(function () {errorMsg2()});
        });

        // 基础数据库 消化系统 肠外营养管理 添加/编辑 信息 提交
        form.on("submit(DGSPNM)", function (data) {
            const doing = "保存信息";
            loading(doing);
            let field = data.field, pnmDataArray = [];
            for (let i = 1; i <= index; i++) {
                if (notNullTool(field["carbohydrateGPD" + i]) || notNullTool(field["carbohydrateGPKgPD" + i]) || notNullTool(field["carbohydrateCalorie" + i]) ||
                    notNullTool(field["aminoAcidGPD" + i]) || notNullTool(field["aminoAcidGPKgPD" + i]) || notNullTool(field["aminoAcidCalorie" + i]) ||
                    notNullTool(field["fatEmulsionGPD" + i]) || notNullTool(field["fatEmulsionGPKgPD" + i]) || notNullTool(field["fatEmulsionCalorie" + i]) ||
                    notNullTool(field["intravenousNutritionCalorieKcalPD" + i]) || notNullTool(field["intravenousNutritionCalorieKcalPKgPD" + i]) ||
                    notNullTool(field["totalCalorieKcalPD" + i]) || notNullTool(field["totalCalorieKcalPKgPD" + i]) || notNullTool(field["totalLiquidVolume" + i])) {
                    pnmDataArray.push({
                        day: i,
                        carbohydrateGPD: field["carbohydrateGPD" + i],
                        carbohydrateGPKgPD: field["carbohydrateGPKgPD" + i],
                        carbohydrateCalorie: field["carbohydrateCalorie" + i],
                        aminoAcidGPD: field["aminoAcidGPD" + i],
                        aminoAcidGPKgPD: field["aminoAcidGPKgPD" + i],
                        aminoAcidCalorie: field["aminoAcidCalorie" + i],
                        fatEmulsionGPD: field["fatEmulsionGPD" + i],
                        fatEmulsionGPKgPD: field["fatEmulsionGPKgPD" + i],
                        fatEmulsionCalorie: field["fatEmulsionCalorie" + i],
                        intravenousNutritionCalorieKcalPD: field["intravenousNutritionCalorieKcalPD" + i],
                        intravenousNutritionCalorieKcalPKgPD: field["intravenousNutritionCalorieKcalPKgPD" + i],
                        totalCalorieKcalPD: field["totalCalorieKcalPD" + i],
                        totalCalorieKcalPKgPD: field["totalCalorieKcalPKgPD" + i],
                        totalLiquidVolume: field["totalLiquidVolume" + i]
                    });
                }
                delete field["carbohydrateGPD" + i];
                delete field["carbohydrateGPKgPD" + i];
                delete field["carbohydrateCalorie" + i];
                delete field["aminoAcidGPD" + i];
                delete field["aminoAcidGPKgPD" + i];
                delete field["aminoAcidCalorie" + i];
                delete field["fatEmulsionGPD" + i];
                delete field["fatEmulsionGPKgPD" + i];
                delete field["fatEmulsionCalorie" + i];
                delete field["intravenousNutritionCalorieKcalPD" + i];
                delete field["intravenousNutritionCalorieKcalPKgPD" + i];
                delete field["totalCalorieKcalPD" + i];
                delete field["totalCalorieKcalPKgPD" + i];
                delete field["totalLiquidVolume" + i];
            }

            // 清除 空数据
            for (const key in field) {
                if (!notNullTool(field[key])) {
                    delete field[key];
                }
            }

            // 左边 统计数据
            let dataTypeList = ["carbohydrateGPD", "carbohydrateGPKgPD", "carbohydrateCalorie", "aminoAcidGPD", "aminoAcidGPKgPD",
                "aminoAcidCalorie", "fatEmulsionGPD", "fatEmulsionGPKgPD", "fatEmulsionCalorie",
                "intravenousNutritionCalorieKcalPD", "intravenousNutritionCalorieKcalPKgPD", "totalCalorieKcalPD",
                "totalCalorieKcalPKgPD", "totalLiquidVolume"];
            const tdLength = $(".pc-db-BDDGSPNM .pc-db-item-table>.pc-db-table.tableLeft>tbody>tr:eq(1)>td").length;
            for (let i = 0; i < dataTypeList.length; i ++) {
                const trNum = i + 1;
                for (let j = 0; j < tdLength - 1; j ++) {
                    const tdNum = j + 1,
                        num = $(".pc-db-BDDGSPNM .pc-db-item-table>.pc-db-table.tableLeft>tbody>tr:eq(" + trNum + ")>td:eq(" + tdNum + ")").text();
                    if (notNullTool(num)) {
                        if (j < tdLength - 2) {
                            field[dataTypeList[i] + (j * 7 + 1) + "to" + ((j + 1) * 7) + "d"] = parseFloat(num);
                        } else {
                            field[dataTypeList[i] + "Total"] = parseFloat(num);
                        }
                    }
                }
            }
            field.pnmDataArray = JSON.stringify(pnmDataArray);
            $.post("/perinatalPlatform/basicDatabase/write/DGS/PNM/post", field, function (back, status) {
                if(status === "success") {
                    if(back.code) {
                        successNext();
                    }else {failMsg(doing)}
                }else {errorMsg1()}
            }, "json").fail(function () {errorMsg2()});
        });
    });
});