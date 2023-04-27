// 删除 表格 行
function deleteABD(that) {
    layer.msg("确定要 <span class='pc-db-status-color-no'>删除</span> 此行数据吗?",{
        icon: 7,
        time: 0,
        anim: 6,
        btn: ["确定", "取消"],
        resize: false,
        shade: 0.8,
        yes: function (index) {
            $(that).parents("tr").remove();
            $("#PC-db-TADN").val($(".pc-db-BDISAD .pc-db-item-table .pc-db-table tbody>tr").length - 1);
            totalDOT();
            totalLOT();
            layer.close(index);
        }
    });
}
// 选择 抗菌药物
function selectABD(form, antibacterialDrug) {
    form.on("select(ABDT)", function (data) {
        const value = data.value;
        if (notNullTool(value)) {
            $(data.elem).parent("td").next("td").find("option[value!='']").remove();
            const selectADBT = $(data.elem).parent("td").next("td").children("select");
            if (value === "青霉素类（非限制级）") {
                $.each(antibacterialDrug.unrestPenicillinList, function (index, unrestPenicillin) {
                    $(selectADBT).append("<option value='" + unrestPenicillin + "'>" + unrestPenicillin + "</option>");
                });
            } else if (value === "青霉素类（限制级）") {
                $.each(antibacterialDrug.restPenicillinList, function (index, restPenicillin) {
                    $(selectADBT).append("<option value='" + restPenicillin + "'>" + restPenicillin + "</option>");
                });
            } else if (value === "一代头孢（非限制级）") {
                $.each(antibacterialDrug.unrestFirstGCephalosporinList, function (index, unrestFirstGCephalosporin) {
                    $(selectADBT).append("<option value='" + unrestFirstGCephalosporin + "'>" + unrestFirstGCephalosporin + "</option>");
                });
            } else if (value === "一代头孢（限制级）") {
                $.each(antibacterialDrug.restFirstGCephalosporinList, function (index, restFirstGCephalosporin) {
                    $(selectADBT).append("<option value='" + restFirstGCephalosporin + "'>" + restFirstGCephalosporin + "</option>");
                });
            } else if (value === "一代头孢（特殊使用级）") {
                $.each(antibacterialDrug.ssgFirstGCephalosporinList, function (index, ssgFirstGCephalosporin) {
                    $(selectADBT).append("<option value='" + ssgFirstGCephalosporin + "'>" + ssgFirstGCephalosporin + "</option>");
                });
            } else if (value === "二代头孢（非限制级）") {
                $.each(antibacterialDrug.unrestSecondGCephalosporinList, function (index, unrestSecondGCephalosporin) {
                    $(selectADBT).append("<option value='" + unrestSecondGCephalosporin + "'>" + unrestSecondGCephalosporin + "</option>");
                });
            } else if (value === "二代头孢（限制级）") {
                $.each(antibacterialDrug.restSecondGCephalosporinList, function (index, restSecondGCephalosporin) {
                    $(selectADBT).append("<option value='" + restSecondGCephalosporin + "'>" + restSecondGCephalosporin + "</option>");
                });
            } else if (value === "二代头孢（特殊使用级）") {
                $.each(antibacterialDrug.ssgSecondGCephalosporinList, function (index, ssgSecondGCephalosporin) {
                    $(selectADBT).append("<option value='" + ssgSecondGCephalosporin + "'>" + ssgSecondGCephalosporin + "</option>");
                });
            } else if (value === "三代头孢（非限制级）") {
                $.each(antibacterialDrug.unrestThirdGCephalosporinList, function (index, unrestThirdGCephalosporin) {
                    $(selectADBT).append("<option value='" + unrestThirdGCephalosporin + "'>" + unrestThirdGCephalosporin + "</option>");
                });
            } else if (value === "三代头孢（限制级）") {
                $.each(antibacterialDrug.restThirdGCephalosporinList, function (index, restThirdGCephalosporin) {
                    $(selectADBT).append("<option value='" + restThirdGCephalosporin + "'>" + restThirdGCephalosporin + "</option>");
                });
            } else if (value === "四代头孢（特殊使用级）") {
                $.each(antibacterialDrug.ssgForthGCephalosporinList, function (index, ssgForthGCephalosporin) {
                    $(selectADBT).append("<option value='" + ssgForthGCephalosporin + "'>" + ssgForthGCephalosporin + "</option>");
                });
            } else if (value === "大环内酯类（非限制级）") {
                $.each(antibacterialDrug.unrestMacrolidesList, function (index, unrestMacrolides) {
                    $(selectADBT).append("<option value='" + unrestMacrolides + "'>" + unrestMacrolides + "</option>");
                });
            } else if (value === "大环内酯类（限制级）") {
                $.each(antibacterialDrug.restMacrolidesList, function (index, restMacrolides) {
                    $(selectADBT).append("<option value='" + restMacrolides + "'>" + restMacrolides + "</option>");
                });
            } else if (value === "碳青霉烯类（特殊使用级）") {
                $.each(antibacterialDrug.ssgCarbapenemsList, function (index, ssgCarbapenems) {
                    $(selectADBT).append("<option value='" + ssgCarbapenems + "'>" + ssgCarbapenems + "</option>");
                });
            } else if (value === "糖肽类（特殊使用级）") {
                $.each(antibacterialDrug.glycopeptidesList, function (index, glycopeptides) {
                    $(selectADBT).append("<option value='" + glycopeptides + "'>" + glycopeptides + "</option>");
                });
            } else if (value === "抗真菌治疗（限制级）") {
                $.each(antibacterialDrug.restAntifungalTreatmentList, function (index, restAntifungalTreatment) {
                    $(selectADBT).append("<option value='" + restAntifungalTreatment + "'>" + restAntifungalTreatment + "</option>");
                });
            } else if (value === "抗真菌治疗（特殊使用级）") {
                $.each(antibacterialDrug.ssgAntifungalTreatmentList, function (index, ssgAntifungalTreatment) {
                    $(selectADBT).append("<option value='" + ssgAntifungalTreatment + "'>" + ssgAntifungalTreatment + "</option>");
                });
            }
        }
        form.render("select");
    });
}
// 抗菌药物(DOT)合计
function totalDOT() {
    const dotElem = $(".pc-db-BDISAD .pc-db-item-table .pc-db-table tbody .pc-db-DOT");
    if (notNullTool(dotElem) && dotElem.length > 0) {
        let dotSum = 0;
        for (let i = 0; i < dotElem.length; i++) {
            const dot = $(dotElem[i]).val();
            if (notNullTool(dot)) {
                dotSum += parseInt(dot);
            }
        }
        $("#PC-db-TADDOTN").val(dotSum);
    }
}
// 抗菌药物(LOT)合计
function totalLOT() {
    const trElem = $(".pc-db-BDISAD .pc-db-item-table .pc-db-table tbody>tr");
    // 找出 起止 日期
    if (trElem.length > 1) {
        let dateStampList = [];
        for (let i = 0; i < (trElem.length - 1); i++) {
            const thisTrElem = trElem[i],
                startDate = $(thisTrElem).find(".pc-db-startDate").val(),
                endDate = $(thisTrElem).find(".pc-db-endDate").val(),
                abdUseReason = $(thisTrElem).children("td:eq(7)").find("dl.layui-anim").find("dd.layui-this").attr("lay-value");
            if (notNullTool(startDate) && notNullTool(endDate) && !/预防/.test(abdUseReason)) {
                const startDateStamp = Date.parse(startDate),
                    endDateStamp = Date.parse(endDate);
                for (let dateStamp = startDateStamp; dateStamp <= endDateStamp; dateStamp += 86400000) {
                    let flag = 0;
                    for (let j = 0; j < dateStampList.length; j++) {
                        if (dateStampList[j] === dateStamp) {
                            flag = 1;
                            break;
                        }
                    }
                    if (flag === 0) {
                        dateStampList.push(dateStamp);
                    }
                }
            }
        }
        $("#PC-db-TADLOTN").val(dateStampList.length);
    }
}
$(document).ready(function () {
    // 抗菌药物
    const antibacterialDrug = {
        unrestPenicillinList: ["青霉素", "美洛西林", "苯唑西林", "氨苄西林", "阿莫西林", "哌拉西林", "氧哌嗪青霉素", "磺苄西林"],
        restPenicillinList: ["阿莫西林克拉维酸钾", "哌拉西林舒巴坦/他唑巴坦", "氨苄西林舒巴坦"],
        unrestFirstGCephalosporinList: ["五水头孢", "头孢氨苄"],
        restFirstGCephalosporinList: ["头孢硫脒"],
        ssgFirstGCephalosporinList: ["头孢噻吩"],
        unrestSecondGCephalosporinList: ["头孢呋辛"],
        restSecondGCephalosporinList: ["头孢美唑", "头孢尼西", "阿莫西林", "头孢西丁", "头孢替安"],
        ssgSecondGCephalosporinList: ["头孢孟多"],
        unrestThirdGCephalosporinList: ["头孢曲松", "拉氧头孢"],
        restThirdGCephalosporinList: ["头孢他啶", "头孢哌酮及头孢哌酮舒巴坦及其他"],
        ssgForthGCephalosporinList: ["头孢吡肟", "头孢噻利", "头孢匹罗"],
        unrestMacrolidesList: ["红霉素"],
        restMacrolidesList: ["阿奇霉素或希舒美"],
        ssgCarbapenemsList: ["亚胺培南", "美罗培南", "厄他培南", "氨曲南"],
        glycopeptidesList: ["万古霉素"],
        restAntifungalTreatmentList: ["氟康唑"],
        ssgAntifungalTreatmentList: ["两性霉素", "伏立康唑", "伊曲康唑", "卡泊芬净"]
    };

    // 引入 layui
    layui.use(["element", "form", "laydate"], function () {
        let form = layui.form,
            laydate = layui.laydate;

        // 抗菌药物 项数
        let adIndex = 0, adStartDate = [], adEndDate = [], adStartDateStamp = [0], adEndDateStamp = [0];
        // 初始化 抗菌药物
        const adIndexInput = $(".pc-db-BDISAD .pc-db-table>tbody").attr("data-num");
        if (notNullTool(adIndexInput)) {
            adIndex = parseInt(adIndexInput);
            // 为 日期 选择 初始化
            for (let i = 1; i <= adIndex; i++) {
                const thisAdIndex = i;
                adStartDate[thisAdIndex] = $("#PC-db-ABDSD" + thisAdIndex).val();
                adStartDateStamp[thisAdIndex] = Date.parse(adStartDate[thisAdIndex]);
                laydate.render({
                    elem: "#PC-db-ABDSD" + thisAdIndex,
                    type: "date",
                    format: "yyyy-MM-dd",
                    max: 0,
                    done: function(value, date) {
                        if(value !== "") {
                            adStartDate[thisAdIndex] = date.year + "-" + date.month + "-" + date.date;
                            adStartDateStamp[thisAdIndex] = Date.parse(adStartDate[thisAdIndex]);
                            if (notNullTool(adEndDate[thisAdIndex])) {
                                if (adStartDateStamp[thisAdIndex] <= adEndDateStamp[thisAdIndex]) {
                                    $("#PC-db-ABDDOT" + thisAdIndex).val(Math.round((adEndDateStamp[thisAdIndex] - adStartDateStamp[thisAdIndex])/86400000) + 1);
                                    totalDOT();
                                    totalLOT();
                                } else {
                                    layer.msg("开始必须<span class='layui-badge'>早于</span>结束时间！", {
                                        icon: 5,
                                        time: 3000,
                                        anim: 6,
                                        btn: "好",
                                        resize: false,
                                        shade: 0.8
                                    }, function () {
                                        $("#PC-db-ABDST" + thisAdIndex).val("");
                                        adStartDate[thisAdIndex] = null;
                                        adStartDateStamp[thisAdIndex] = 0;
                                    });
                                }
                            }
                        }else {
                            adStartDate[thisAdIndex] = null;
                            adStartDateStamp[thisAdIndex] = 0;
                        }
                    }
                });
                adEndDate[thisAdIndex] = $("#PC-db-ABDED" + thisAdIndex).val();
                adEndDateStamp[thisAdIndex] = Date.parse(adEndDate[thisAdIndex]);
                laydate.render({
                    elem: "#PC-db-ABDED" + thisAdIndex,
                    type: "date",
                    format: "yyyy-MM-dd",
                    max: 0,
                    done: function(value, date) {
                        if(value !== "") {
                            adEndDate[thisAdIndex] = date.year + "-" + date.month + "-" + date.date;
                            adEndDateStamp[thisAdIndex] = Date.parse(adEndDate[thisAdIndex]);
                            if (notNullTool(adStartDate[thisAdIndex])) {
                                if (adStartDateStamp[thisAdIndex] <= adEndDateStamp[thisAdIndex]) {
                                    $("#PC-db-ABDDOT" + thisAdIndex).val(Math.round((adEndDateStamp[thisAdIndex] - adStartDateStamp[thisAdIndex])/86400000) + 1);
                                    totalDOT();
                                    totalLOT();
                                } else {
                                    layer.msg("结束时间必须<span class='layui-badge'>晚于</span>开始时间！", {
                                        icon: 5,
                                        time: 3000,
                                        anim: 6,
                                        btn: "好",
                                        resize: false,
                                        shade: 0.8
                                    }, function () {
                                        $("#PC-db-ABDET" + thisAdIndex).val("");
                                        adEndDate[thisAdIndex] = null;
                                        adEndDateStamp[thisAdIndex] = 0;
                                    });
                                }
                            }
                        }else {
                            adEndDate[thisAdIndex] = null;
                            adEndDateStamp[thisAdIndex] = 0;
                        }
                    }
                });
                // 初数化 抗菌药物类型
                const thisAntibacterialDrugType = $("#PC-db-ADT" + thisAdIndex).attr("data-value");
                let adtJson = {};
                if (notNullTool(thisAntibacterialDrugType)) {
                    adtJson["antibacterialDrugType" + thisAdIndex] = thisAntibacterialDrugType;
                    form.val("AD", adtJson);
                    // 选择 抗菌药物
                    const selectADBT = $("#PC-db-ABD" + thisAdIndex),
                        thisAntibacterialDrug = $(selectADBT).attr("data-value");
                    $(selectADBT).children("option[value!='']").remove();
                    if (notNullTool(thisAntibacterialDrug)) {
                        if (thisAntibacterialDrugType === "青霉素类（非限制级）") {
                            $.each(antibacterialDrug.unrestPenicillinList, function (index, unrestPenicillin) {
                                if (thisAntibacterialDrug === unrestPenicillin) {
                                    $(selectADBT).append("<option value='" + unrestPenicillin + "' selected>" + unrestPenicillin + "</option>");
                                } else {
                                    $(selectADBT).append("<option value='" + unrestPenicillin + "'>" + unrestPenicillin + "</option>");
                                }
                            });
                        } else if (thisAntibacterialDrugType === "青霉素类（限制级）") {
                            $.each(antibacterialDrug.restPenicillinList, function (index, restPenicillin) {
                                if (thisAntibacterialDrug === restPenicillin) {
                                    $(selectADBT).append("<option value='" + restPenicillin + "' selected>" + restPenicillin + "</option>");
                                } else {
                                    $(selectADBT).append("<option value='" + restPenicillin + "'>" + restPenicillin + "</option>");
                                }
                            });
                        } else if (thisAntibacterialDrugType === "一代头孢（非限制级）") {
                            $.each(antibacterialDrug.unrestFirstGCephalosporinList, function (index, unrestFirstGCephalosporin) {
                                if (thisAntibacterialDrug === unrestFirstGCephalosporin) {
                                    $(selectADBT).append("<option value='" + unrestFirstGCephalosporin + "' selected>" + unrestFirstGCephalosporin + "</option>");
                                } else {
                                    $(selectADBT).append("<option value='" + unrestFirstGCephalosporin + "'>" + unrestFirstGCephalosporin + "</option>");
                                }
                            });
                        } else if (thisAntibacterialDrugType === "一代头孢（限制级）") {
                            $.each(antibacterialDrug.restFirstGCephalosporinList, function (index, restFirstGCephalosporin) {
                                if (thisAntibacterialDrug === restFirstGCephalosporin) {
                                    $(selectADBT).append("<option value='" + restFirstGCephalosporin + "' selected>" + restFirstGCephalosporin + "</option>");
                                } else {
                                    $(selectADBT).append("<option value='" + restFirstGCephalosporin + "'>" + restFirstGCephalosporin + "</option>");
                                }
                            });
                        } else if (thisAntibacterialDrugType === "一代头孢（特殊使用级）") {
                            $.each(antibacterialDrug.ssgFirstGCephalosporinList, function (index, ssgFirstGCephalosporin) {
                                if (thisAntibacterialDrug === ssgFirstGCephalosporin) {
                                    $(selectADBT).append("<option value='" + ssgFirstGCephalosporin + "' selected>" + ssgFirstGCephalosporin + "</option>");
                                } else {
                                    $(selectADBT).append("<option value='" + ssgFirstGCephalosporin + "'>" + ssgFirstGCephalosporin + "</option>");
                                }
                            });
                        } else if (thisAntibacterialDrugType === "二代头孢（非限制级）") {
                            $.each(antibacterialDrug.unrestSecondGCephalosporinList, function (index, unrestSecondGCephalosporin) {
                                if (thisAntibacterialDrug === unrestSecondGCephalosporin) {
                                    $(selectADBT).append("<option value='" + unrestSecondGCephalosporin + "' selected>" + unrestSecondGCephalosporin + "</option>");
                                } else {
                                    $(selectADBT).append("<option value='" + unrestSecondGCephalosporin + "'>" + unrestSecondGCephalosporin + "</option>");
                                }
                            });
                        } else if (thisAntibacterialDrugType === "二代头孢（限制级）") {
                            $.each(antibacterialDrug.restSecondGCephalosporinList, function (index, restSecondGCephalosporin) {
                                if (thisAntibacterialDrug === restSecondGCephalosporin) {
                                    $(selectADBT).append("<option value='" + restSecondGCephalosporin + "' selected>" + restSecondGCephalosporin + "</option>");
                                } else {
                                    $(selectADBT).append("<option value='" + restSecondGCephalosporin + "'>" + restSecondGCephalosporin + "</option>");
                                }
                            });
                        } else if (thisAntibacterialDrugType === "二代头孢（特殊使用级）") {
                            $.each(antibacterialDrug.ssgSecondGCephalosporinList, function (index, ssgSecondGCephalosporin) {
                                if (thisAntibacterialDrug === ssgSecondGCephalosporin) {
                                    $(selectADBT).append("<option value='" + ssgSecondGCephalosporin + "' selected>" + ssgSecondGCephalosporin + "</option>");
                                } else {
                                    $(selectADBT).append("<option value='" + ssgSecondGCephalosporin + "'>" + ssgSecondGCephalosporin + "</option>");
                                }
                            });
                        } else if (thisAntibacterialDrugType === "三代头孢（非限制级）") {
                            $.each(antibacterialDrug.unrestThirdGCephalosporinList, function (index, unrestThirdGCephalosporin) {
                                if (thisAntibacterialDrug === unrestThirdGCephalosporin) {
                                    $(selectADBT).append("<option value='" + unrestThirdGCephalosporin + "' selected>" + unrestThirdGCephalosporin + "</option>");
                                } else {
                                    $(selectADBT).append("<option value='" + unrestThirdGCephalosporin + "'>" + unrestThirdGCephalosporin + "</option>");
                                }
                            });
                        } else if (thisAntibacterialDrugType === "三代头孢（限制级）") {
                            $.each(antibacterialDrug.restThirdGCephalosporinList, function (index, restThirdGCephalosporin) {
                                if (thisAntibacterialDrug === restThirdGCephalosporin) {
                                    $(selectADBT).append("<option value='" + restThirdGCephalosporin + "' selected>" + restThirdGCephalosporin + "</option>");
                                } else {
                                    $(selectADBT).append("<option value='" + restThirdGCephalosporin + "'>" + restThirdGCephalosporin + "</option>");
                                }
                            });
                        } else if (thisAntibacterialDrugType === "四代头孢（特殊使用级）") {
                            $.each(antibacterialDrug.ssgForthGCephalosporinList, function (index, ssgForthGCephalosporin) {
                                if (thisAntibacterialDrug === ssgForthGCephalosporin) {
                                    $(selectADBT).append("<option value='" + ssgForthGCephalosporin + "' selected>" + ssgForthGCephalosporin + "</option>");
                                } else {
                                    $(selectADBT).append("<option value='" + ssgForthGCephalosporin + "'>" + ssgForthGCephalosporin + "</option>");
                                }
                            });
                        } else if (thisAntibacterialDrugType === "大环内酯类（非限制级）") {
                            $.each(antibacterialDrug.unrestMacrolidesList, function (index, unrestMacrolides) {
                                if (thisAntibacterialDrug === unrestMacrolides) {
                                    $(selectADBT).append("<option value='" + unrestMacrolides + "' selected>" + unrestMacrolides + "</option>");
                                } else {
                                    $(selectADBT).append("<option value='" + unrestMacrolides + "'>" + unrestMacrolides + "</option>");
                                }
                            });
                        } else if (thisAntibacterialDrugType === "大环内酯类（限制级）") {
                            $.each(antibacterialDrug.restMacrolidesList, function (index, restMacrolides) {
                                if (thisAntibacterialDrug === restMacrolides) {
                                    $(selectADBT).append("<option value='" + restMacrolides + "' selected>" + restMacrolides + "</option>");
                                } else {
                                    $(selectADBT).append("<option value='" + restMacrolides + "'>" + restMacrolides + "</option>");
                                }
                            });
                        } else if (thisAntibacterialDrugType === "碳青霉烯类（特殊使用级）") {
                            $.each(antibacterialDrug.ssgCarbapenemsList, function (index, ssgCarbapenems) {
                                if (thisAntibacterialDrug === ssgCarbapenems) {
                                    $(selectADBT).append("<option value='" + ssgCarbapenems + "' selected>" + ssgCarbapenems + "</option>");
                                } else {
                                    $(selectADBT).append("<option value='" + ssgCarbapenems + "'>" + ssgCarbapenems + "</option>");
                                }
                            });
                        } else if (thisAntibacterialDrugType === "糖肽类（特殊使用级）") {
                            $.each(antibacterialDrug.glycopeptidesList, function (index, glycopeptides) {
                                if (thisAntibacterialDrug === glycopeptides) {
                                    $(selectADBT).append("<option value='" + glycopeptides + "' selected>" + glycopeptides + "</option>");
                                } else {
                                    $(selectADBT).append("<option value='" + glycopeptides + "'>" + glycopeptides + "</option>");
                                }
                            });
                        } else if (thisAntibacterialDrugType === "抗真菌治疗（限制级）") {
                            $.each(antibacterialDrug.restAntifungalTreatmentList, function (index, restAntifungalTreatment) {
                                if (thisAntibacterialDrug === restAntifungalTreatment) {
                                    $(selectADBT).append("<option value='" + restAntifungalTreatment + "' selected>" + restAntifungalTreatment + "</option>");
                                } else {
                                    $(selectADBT).append("<option value='" + restAntifungalTreatment + "'>" + restAntifungalTreatment + "</option>");
                                }
                            });
                        } else if (thisAntibacterialDrugType === "抗真菌治疗（特殊使用级）") {
                            $.each(antibacterialDrug.ssgAntifungalTreatmentList, function (index, ssgAntifungalTreatment) {
                                if (thisAntibacterialDrug === ssgAntifungalTreatment) {
                                    $(selectADBT).append("<option value='" + ssgAntifungalTreatment + "' selected>" + ssgAntifungalTreatment + "</option>");
                                } else {
                                    $(selectADBT).append("<option value='" + ssgAntifungalTreatment + "'>" + ssgAntifungalTreatment + "</option>");
                                }
                            });
                        }
                    }
                    selectABD(form, antibacterialDrug);
                    form.on("select(ADUR)", function () {
                        totalLOT();
                    });
                    form.render("select");
                }
                // 初数化 频次
                const thisAbdFrequency = $("#PC-db-ABDF" + thisAdIndex).attr("data-value");
                let adfJson = {};
                if (notNullTool(thisAbdFrequency)) {
                    adfJson["abdFrequency" + thisAdIndex] = thisAbdFrequency;
                    form.val("AD", adfJson);
                }
                // 初数化 使用原因
                const thisAbdUseReason = $("#PC-db-ABDUR" + thisAdIndex).attr("data-value");
                let adurJson = {};
                if (notNullTool(thisAbdUseReason)) {
                    adurJson["abdUseReason" + thisAdIndex] = thisAbdUseReason;
                    form.val("AD", adurJson);
                }
                // 初数化 是否合理
                const thisAbdReasonable = $("#PC-db-ABDR" + thisAdIndex).attr("data-value");
                let adrJson = {};
                if (notNullTool(thisAbdReasonable)) {
                    adrJson["abdReasonable" + thisAdIndex] = thisAbdReasonable;
                    form.val("AD", adrJson);
                }
            }
        }
        // 增加 抗菌药物
        $("#PC-db-AddAD").on("click", function () {
            const that = this;
            adIndex++;
            sequentialExecution(function () {
                $(that).parents("tr").before(
                    "<tr>" +
                    "   <td>" +
                    "       <select name='antibacterialDrugType" + adIndex + "' lay-filter='ABDT' lay-reqText='请选择抗菌药物类型！' lay-verify='required'>" +
                    "           <option value=''>请选择抗菌药物类型</option>" +
                    "           <option value='青霉素类（非限制级）'>青霉素类（非限制级）</option>" +
                    "           <option value='青霉素类（限制级）'>青霉素类（限制级）</option>" +
                    "           <option value='一代头孢（非限制级）'>一代头孢（非限制级）</option>" +
                    "           <option value='一代头孢（限制级）'>一代头孢（限制级）</option>" +
                    "           <option value='一代头孢（特殊使用级）'>一代头孢（特殊使用级）</option>" +
                    "           <option value='二代头孢（非限制级）'>二代头孢（非限制级）</option>" +
                    "           <option value='二代头孢（限制级）'>二代头孢（限制级）</option>" +
                    "           <option value='二代头孢（特殊使用级）'>二代头孢（特殊使用级）</option>" +
                    "           <option value='三代头孢（非限制级）'>三代头孢（非限制级）</option>" +
                    "           <option value='三代头孢（限制级）'>三代头孢（限制级）</option>" +
                    "           <option value='四代头孢（特殊使用级）'>四代头孢（特殊使用级）</option>" +
                    "           <option value='大环内酯类（非限制级）'>大环内酯类（非限制级）</option>" +
                    "           <option value='大环内酯类（限制级）'>大环内酯类（限制级）</option>" +
                    "           <option value='碳青霉烯类（特殊使用级）'>碳青霉烯类（特殊使用级）</option>" +
                    "           <option value='糖肽类（特殊使用级）'>糖肽类（特殊使用级）</option>" +
                    "           <option value='抗真菌治疗（限制级）'>抗真菌治疗（限制级）</option>" +
                    "           <option value='抗真菌治疗（特殊使用级）'>抗真菌治疗（特殊使用级）</option>" +
                    "       </select>" +
                    "   </td>" +
                    "   <td class='pc-db-ADB'>" +
                    "       <select id='PC-db-ABD' name='antibacterialDrug" + adIndex + "' lay-filter='AD' lay-reqText='请选择抗菌药物种类！' lay-verify='required'>" +
                    "           <option value=''>请选择抗菌药物种类</option>" +
                    "       </select>" +
                    "   </td>" +
                    "   <td>" +
                    "       <input id='PC-db-ABDSD" + adIndex + "' class='pc-db-startDate' type='text' name='abdStartDate" + adIndex + "' lay-verify='required' placeholder='请选择开始日期' lay-reqText='请选择开始日期！' readonly>" +
                    "   </td>" +
                    "   <td>" +
                    "       <input id='PC-db-ABDED" + adIndex + "' class='pc-db-endDate' type='text' name='abdEndDate" + adIndex + "' placeholder='请选择结束日期' readonly>" +
                    "   </td>" +
                    "   <td>" +
                    "       <input id='PC-db-ABDD" + adIndex + "' type='number' name='abdDose" + adIndex + "' placeholder='请填写剂量'>" +
                    "   </td>" +
                    "   <td>" +
                    "       <select id='PC-db-ABDF" + adIndex + "' name='abdFrequency" + adIndex + "'>" +
                    "           <option value=''>请选择频次</option>" +
                    "           <option value='q72h'>q72h</option>" +
                    "           <option value='q48h'>q48h</option>" +
                    "           <option value='q24h'>q24h</option>" +
                    "           <option value='q12h'>q12h</option>" +
                    "           <option value='q8h'>q8h</option>" +
                    "           <option value='q6h'>q6h</option>" +
                    "       </select>" +
                    "   </td>" +
                    "   <td>" +
                    "       <input id='PC-db-ABDDOT" + adIndex + "' class='pc-db-DOT' type='number' name='abdDot" + adIndex + "' value='0' readonly>" +
                    "   </td>" +
                    "   <td>" +
                    "       <select name='abdUseReason" + adIndex + "' lay-filter='ADUR'>" +
                    "           <option value=''>请选择使用原因</option>" +
                    "           <option value='怀疑EOS，预防性治疗'>怀疑EOS，预防性治疗</option>" +
                    "           <option value='怀疑LOS，预防性治疗'>怀疑LOS，预防性治疗</option>" +
                    "           <option value='确诊EOS，确诊治疗'>确诊EOS，确诊治疗</option>" +
                    "           <option value='确诊LOS，确诊治疗'>确诊LOS，确诊治疗</option>" +
                    "           <option value='预防抗真菌治疗'>预防抗真菌治疗</option>" +
                    "           <option value='抗真菌治疗'>抗真菌治疗</option>" +
                    "           <option value='怀疑NEC，预防治疗'>怀疑NEC，预防治疗</option>" +
                    "           <option value='确诊NEC，确诊治疗'>确诊NEC，确诊治疗</option>" +
                    "           <option value='新生儿肺炎'>新生儿肺炎</option>" +
                    "           <option value='尿路感染'>尿路感染</option>" +
                    "           <option value='呼吸机相关肺炎'>呼吸机相关肺炎</option>" +
                    "           <option value='导管相关血流感染'>导管相关血流感染</option>" +
                    "           <option value='其他'>其他</option>" +
                    "       </select>" +
                    "   </td>" +
                    "   <td>" +
                    "       <select name='abdReasonable" + adIndex + "'>" +
                    "           <option value=''>请选择是否合理</option>" +
                    "           <option value='预防用药不合理'>预防用药不合理</option>" +
                    "           <option value='种类选择不合理'>种类选择不合理</option>" +
                    "           <option value='预防使用合理'>预防使用合理</option>" +
                    "           <option value='治疗疗程合理'>治疗疗程合理</option>" +
                    "       </select>" +
                    "   </td>" +
                    "   <td>" +
                    "       <button onclick='deleteABD(this);' class='pc-btn pc-btn-danger'><i class='iconfont icon-delete'></i></button>" +
                    "   </td>" +
                    "</tr>");
            }, function () {
                form.render("select");
                const thisAdIndex = adIndex;
                laydate.render({
                    elem: "#PC-db-ABDSD" + thisAdIndex,
                    type: "date",
                    format: "yyyy-MM-dd",
                    max: 0,
                    done: function(value, date) {
                        if(value !== "") {
                            adStartDate[thisAdIndex] = date.year + "-" + date.month + "-" + date.date;
                            adStartDateStamp[thisAdIndex] = Date.parse(adStartDate[thisAdIndex]);
                            if (notNullTool(adEndDate[thisAdIndex])) {
                                if (adStartDateStamp[thisAdIndex] <= adEndDateStamp[thisAdIndex]) {
                                    $("#PC-db-ABDDOT" + thisAdIndex).val(Math.round((adEndDateStamp[thisAdIndex] - adStartDateStamp[thisAdIndex])/86400000) + 1);
                                    totalDOT();
                                    totalLOT();
                                } else {
                                    layer.msg("开始必须<span class='layui-badge'>早于</span>结束时间！", {
                                        icon: 5,
                                        time: 3000,
                                        anim: 6,
                                        btn: "好",
                                        resize: false,
                                        shade: 0.8
                                    }, function () {
                                        $("#PC-db-ABDST" + thisAdIndex).val("");
                                        adStartDate[thisAdIndex] = null;
                                        adStartDateStamp[thisAdIndex] = 0;
                                    });
                                }
                            }
                        }else {
                            adStartDate[thisAdIndex] = null;
                            adStartDateStamp[thisAdIndex] = 0;
                        }
                    }
                });
                laydate.render({
                    elem: "#PC-db-ABDED" + thisAdIndex,
                    type: "date",
                    format: "yyyy-MM-dd",
                    max: 0,
                    done: function(value, date) {
                        if(value !== "") {
                            adEndDate[thisAdIndex] = date.year + "-" + date.month + "-" + date.date;
                            adEndDateStamp[thisAdIndex] = Date.parse(adEndDate[thisAdIndex]);
                            if (notNullTool(adStartDate[thisAdIndex])) {
                                if (adStartDateStamp[thisAdIndex] <= adEndDateStamp[thisAdIndex]) {
                                    $("#PC-db-ABDDOT" + thisAdIndex).val(Math.round((adEndDateStamp[thisAdIndex] - adStartDateStamp[thisAdIndex])/86400000) + 1);
                                    totalDOT();
                                    totalLOT();
                                } else {
                                    layer.msg("结束时间必须<span class='layui-badge'>晚于</span>开始时间！", {
                                        icon: 5,
                                        time: 3000,
                                        anim: 6,
                                        btn: "好",
                                        resize: false,
                                        shade: 0.8
                                    }, function () {
                                        $("#PC-db-ABDET" + thisAdIndex).val("");
                                        adEndDate[thisAdIndex] = null;
                                        adEndDateStamp[thisAdIndex] = 0;
                                    });
                                }
                            }
                        }else {
                            adEndDate[thisAdIndex] = null;
                            adEndDateStamp[thisAdIndex] = 0;
                        }
                    }
                });
                // 选择 抗菌药物
                selectABD(form, antibacterialDrug);
                // 抗菌药物 名称
                form.on("select(AD)", function (data) {
                    const value = data.value;
                    if (notNullTool(value)) {
                        $(data.elem).attr("data-value", value);
                    }
                });
                form.on("select(ADUR)", function () {
                    totalLOT();
                });
                // 计算 抗菌药物合计
                $("#PC-db-TADN").val($(".pc-db-BDISAD .pc-db-item-table .pc-db-table tbody>tr").length - 1);
            });
        });

        // 打开 抗菌药物图
        $("#PC-db-openABDPicture").on("click", function () {
            // 获取 所有 起止 日期输入框DOM
            const startDateList = $(".pc-db-BDISAD .pc-db-table tbody .pc-db-startDate"),
                endDateList = $(".pc-db-BDISAD .pc-db-table tbody .pc-db-endDate");
            if (notNullTool(startDateList) && notNullTool(endDateList) && startDateList.length > 0 && endDateList.length > 0) {
                let startDateStampList = [],
                    endDateStampList = [];
                // 获取 所有 开始日期
                for (let i = 0; i < startDateList.length; i++) {
                    if (notNullTool($(startDateList[i]).val())) {
                        startDateStampList[i] = Date.parse($(startDateList[i]).val());
                    }
                }
                // 获取 所有 结束日期
                for (let i = 0; i < endDateList.length; i++) {
                    if (notNullTool($(endDateList[i]).val())) {
                        endDateStampList[i] = Date.parse($(endDateList[i]).val());
                    }
                }
                // 找出 开始日期 中的 最小日期，找出 结束日期 中的 最大日期
                const minDateStamp = Math.min.apply(null, startDateStampList),
                    maxDateStamp = Math.max.apply(null, endDateStampList),
                    startDateStamp = minDateStamp, endDateStamp = maxDateStamp;

                if (startDateStamp !== Infinity && startDateStamp !== -Infinity && endDateStamp !== Infinity && endDateStamp !== -Infinity) {
                    // 生成 表头 日期
                    let j = 0, thElem = "", thisDate;
                    for (let thisDateStamp = startDateStamp; thisDateStamp <= endDateStamp; thisDateStamp += 86400000) {
                        thisDate = new Date(thisDateStamp);
                        const thisDateTh = "<th>" + (thisDate.getFullYear() % 100) + "/" + (thisDate.getMonth() + 1) + "/" + thisDate.getDate() + "</th>";
                        thElem += thisDateTh;
                        j++;
                    }
                    if (notNullTool(thisDate)) {
                        sequentialExecution(function () {
                            const allDateLength = j,
                                adTr = $(".pc-db-BDISAD .pc-db-table tbody>tr"),
                                drugNum = $(adTr).length - 1;
                            let drugList = [], drugTr = "";

                            // 找出 所有 药物种类
                            for (let i = 0; i < drugNum; i++) {
                                const drugName = $(adTr[i]).find("td.pc-db-ADB").children("select").attr("data-value");
                                let flag = 0;
                                for (let j = 0; j < drugList.length; j++) {
                                    if (drugList[j] === drugName) {
                                        flag = 1;
                                        break;
                                    }
                                }
                                if (flag === 0) {
                                    drugList.push(drugName);
                                }
                            }

                            // 每种药的 tr
                            let use7DayDOT = [0], use14DayDOT = [0], useAllDayDOT = [0], lot = [0];
                            for (let i = 0; i < drugList.length; i++) {
                                use7DayDOT[i] = 0;
                                use14DayDOT[i] = 0;
                                useAllDayDOT[i] = 0;
                                drugTr += "<tr>";
                                const aDrugList = $(".pc-db-BDISAD .pc-db-table tbody>tr>td.pc-db-ADB>select[data-value='" + drugList[i] + "']").parents("tr");
                                for (let dateStamp = startDateStamp, k = 0; dateStamp <= endDateStamp; dateStamp += 86400000, k++) {
                                    let flag = 0;
                                    for (let j = 0; j < aDrugList.length; j++) {
                                        const thisDrugStartDate = $(aDrugList[j]).find(".pc-db-startDate").val(),
                                            thisDrugEndDate = $(aDrugList[j]).find(".pc-db-endDate").val();
                                        if (notNullTool(thisDrugStartDate) && notNullTool(thisDrugEndDate)) {
                                            const thisDrugStartDateStamp = Date.parse(thisDrugStartDate),
                                                thisDrugEndDateStamp = Date.parse(thisDrugEndDate);
                                            if (dateStamp >= thisDrugStartDateStamp && dateStamp <= thisDrugEndDateStamp) {
                                                flag = 1;
                                                if (k < 7) {
                                                    use7DayDOT[i]++;
                                                }
                                                if (k < 14) {
                                                    use14DayDOT[i]++;
                                                }
                                                useAllDayDOT[i]++;
                                            }
                                        }
                                    }
                                    if (flag === 1) {
                                        drugTr += "<td class='pc-db-active'></td>";
                                        lot[k] = 1;
                                    } else {
                                        drugTr += "<td></td>";
                                    }
                                }
                                drugTr += "</tr>";
                            }

                            let daysTitle = "", blockTd = "", drugDtTr = "",
                                marginLeftCss = "margin-left: 420px";
                            daysTitle += "<th>7日内<br>DOT</th>";
                            daysTitle += "<th>7日内<br>LOT</th>";
                            blockTd += "<td></td><td></td>";
                            for (let j = 0; j < drugList.length; j++) {
                                drugDtTr += "<tr><td>" + drugList[j] + "</td><td>" + use7DayDOT[j] + "</td><td></td>";
                                if (allDateLength > 7) {
                                    if (j === 0) {
                                        daysTitle += "<th>14日内<br>DOT</th>";
                                        daysTitle += "<th>14日内<br>LOT</th>";
                                        blockTd += "<td></td><td></td>";
                                    }
                                    drugDtTr += "<td>" + use14DayDOT[j] + "</td><td></td>";
                                    marginLeftCss = "margin-left: 564px";
                                }
                                if (j === 0) {
                                    daysTitle += "<th>合计<br>DOT</th>";
                                    daysTitle += "<th>合计<br>LOT</th>";
                                    blockTd += "<td></td><td></td>";
                                }
                                drugDtTr += "<td>" + use14DayDOT[j] + "</td><td></td>";
                                drugDtTr += "</tr>";
                            }

                            // 几日内 天数 汇总
                            let total7DayDot = 0, total14DayDot = 0, totalAllDayDot = 0, totalDotTr = "",
                                total7DayLot = 0, total14DayLot = 0, totalAllDayLot = 0, totalLotTr = "";
                            for (let i = 0; i < drugList.length; i++) {
                                total7DayDot += use7DayDOT[i];
                            }
                            totalDotTr += "<td>" + total7DayDot + "</td><td></td>";
                            for (let i = 0; i < 7; i ++) {
                                if (lot[i] === 1) {
                                    total7DayLot++;
                                }
                            }
                            totalLotTr += "<td></td><td>" + total7DayLot + "</td>";
                            if (allDateLength > 7) {
                                for (let i = 0; i < drugList.length; i++) {
                                    total14DayDot += use14DayDOT[i];
                                }
                                totalDotTr += "<td>" + total14DayDot + "</td><td></td>";
                                for (let i = 0; i < 14; i ++) {
                                    if (lot[i] === 1) {
                                        total14DayLot++;
                                    }
                                }
                                totalLotTr += "<td></td><td>" + total14DayLot + "</td>";
                            }
                            for (let i = 0; i < drugList.length; i++) {
                                totalAllDayDot += useAllDayDOT[i];
                            }
                            totalDotTr += "<td>" + totalAllDayDot + "</td><td></td>";
                            for (let i = 0; i < lot.length; i ++) {
                                if (lot[i] === 1) {
                                    totalAllDayLot++;
                                }
                            }
                            totalLotTr += "<td></td><td>" + totalAllDayLot + "</td>";


                            // 使用 天数 th元素
                            let useTrTimeElem = "", trBlockElem = "";
                            for (let i = 0; i < allDateLength; i++) {
                                useTrTimeElem += "<td>" + (i + 1) + "</td>";
                                trBlockElem += "<td></td>";
                            }

                            // 生成 html
                            let tableHtml =
                                "<table class='pc-db-table tableLeft'>" +
                                "    <thead>" +
                                "    <tr>" +
                                "        <th>抗菌药物种类</th>" +
                                daysTitle +
                                "    </tr>" +
                                "    </thead>" +
                                "    <tbody>" +
                                "    <tr>" +
                                "        <td>使用天数</td>" +
                                blockTd +
                                "    </tr>" +
                                drugDtTr +
                                "    <tr>" +
                                "        <td>DOT</td>" +
                                totalDotTr +
                                "    </tr>" +
                                "    <tr>" +
                                "        <td>LOT</td>" +
                                totalLotTr +
                                "    </tr>" +
                                "    </tbody>" +
                                "</table>" +
                                "<table class='pc-db-table tableRight' style='" + marginLeftCss + "'>" +
                                "    <thead>" +
                                "    <tr>" +
                                thElem +
                                "    </tr>" +
                                "    </thead>" +
                                "    <tbody>" +
                                "    <tr>" +
                                useTrTimeElem +
                                "    </tr>" +
                                drugTr +
                                "    <tr class='pc-db-table-block'>" +
                                trBlockElem +
                                "    </tr>" +
                                "    <tr class='pc-db-table-block'>" +
                                trBlockElem +
                                "    </tr>" +
                                "    </tbody>" +
                                "</table>";
                            $("#PC-db-ADP>.pc-db-layer-table").html(tableHtml);
                        }, function () {
                            const tableLeftTr = $("#PC-db-ADP>.pc-db-layer-table .pc-db-table.tableRight tbody>tr"),
                                tableLeftTrLength = $(tableLeftTr).length,
                                tableLeftTdLength = $("#PC-db-ADP>.pc-db-layer-table .pc-db-table.tableRight thead>tr>th").length;
                            for (let i = 0; i < tableLeftTdLength; i++) {
                                let sum = 0, flag = 0;
                                for (j = 1; j < tableLeftTrLength - 1; j++) {
                                    $(tableLeftTr[j]).find("td:eq(" + i + ")").each(function () {
                                        if ($(this).hasClass("pc-db-active")) {
                                            flag = 1;
                                            sum++;
                                        }
                                    });
                                }
                                $(tableLeftTr[tableLeftTrLength - 2]).find("td:eq(" + i + ")").text(sum);
                                $(tableLeftTr[tableLeftTrLength - 1]).find("td:eq(" + i + ")").text(flag);
                            }
                        }, function () {
                            layer.open({
                                title: "<i class='iconfont icon-'></i> 抗菌药物图",
                                type: 1,
                                shade: 0.8,
                                area: "auto",
                                maxWidth: 1024,
                                content: $("#PC-db-ADP"),
                                resize: false
                            });
                        });
                    } else {
                        layer.msg("起止日期不能相同！", {
                            icon: 5,
                            time: 3000,
                            anim: 6,
                            btn: "好",
                            resize: false,
                            shade: 0.8
                        });
                    }
                } else {
                    layer.msg("无数据或数据不全！", {
                        icon: 5,
                        time: 3000,
                        anim: 6,
                        btn: "好",
                        resize: false,
                        shade: 0.8
                    });
                }
            } else {
                layer.msg("无数据！", {
                    icon: 5,
                    time: 3000,
                    anim: 6,
                    btn: "好",
                    resize: false,
                    shade: 0.8
                });
            }
        });

        // 基础数据库 感染监测 抗菌药物 添加/编辑 信息 提交
        form.on("submit(ISAD)", function (data) {
            const doing = "保存信息";
            loading(doing);
            let field = data.field, adArray = [];
            for (let i = 1; i <= adIndex; i++) {
                let adJson = {};
                if (field["antibacterialDrugType" + i] !== undefined) {
                    adJson.antibacterialDrugType = field["antibacterialDrugType" + i];
                    adJson.antibacterialDrug = field["antibacterialDrug" + i];
                    adJson.abdStartDate = field["abdStartDate" + i];
                    if (notNullTool(field["abdEndDate" + i])) {
                        adJson.abdEndDate = field["abdEndDate" + i];
                    }
                    if (notNullTool(field["abdDose" + i])) {
                        adJson.abdDose = field["abdDose" + i];
                    }
                    if (notNullTool(field["abdFrequency" + i])) {
                        adJson.abdFrequency = field["abdFrequency" + i];
                    }
                    if (notNullTool(field["abdDot" + i])) {
                        adJson.abdDot = field["abdDot" + i];
                    }
                    if (notNullTool(field["abdUseReason" + i])) {
                        adJson.abdUseReason = field["abdUseReason" + i];
                    }
                    if (notNullTool(field["abdReasonable" + i])) {
                        adJson.abdReasonable = field["abdReasonable" + i];
                    }
                    adArray.push(adJson);
                    delete field["antibacterialDrugType" + i];
                    delete field["antibacterialDrug" + i];
                    delete field["abdStartDate" + i];
                    delete field["abdEndDate" + i];
                    delete field["abdDose" + i];
                    delete field["abdFrequency" + i];
                    delete field["abdDot" + i];
                    delete field["abdUseReason" + i];
                    delete field["abdReasonable" + i];
                }
            }
            field.adArray = JSON.stringify(adArray);
            $.post("/perinatalPlatform/basicDatabase/write/IS/AD/post", field, function (back, status) {
                if(status === "success") {
                    if(back.code) {
                        successNext();
                    }else {failMsg(doing)}
                }else {errorMsg1()}
            }, "json").fail(function () {errorMsg2()});
        });

        // 基础数据库 感染监测 评价指标 添加/编辑 信息 提交
        form.on("submit(ISEI)", function (data) {
            const doing = "保存信息";
            loading(doing);
            $.post("/perinatalPlatform/basicDatabase/write/IS/EI/post", data.field, function (back, status) {
                if(status === "success") {
                    if(back.code) {
                        successNext();
                    }else {failMsg(doing)}
                }else {errorMsg1()}
            }, "json").fail(function () {errorMsg2()});
        });

        // 尿路感染 确诊日期
        laydate.render({
            elem: "#PC-db-UTIDT",
            type: "datetime",
            format: "yyyy-MM-dd HH:mm:ss",
            max: 1
        });
        // 化脓性脑膜炎 确诊日期
        laydate.render({
            elem: "#PC-db-PMDT",
            type: "datetime",
            format: "yyyy-MM-dd HH:mm:ss",
            max: 1
        });
        // 病毒性脑膜炎 确诊日期
        laydate.render({
            elem: "#PC-db-VMDT",
            type: "datetime",
            format: "yyyy-MM-dd HH:mm:ss",
            max: 1
        });
        // 导管相关血流感染 确诊日期
        laydate.render({
            elem: "#PC-db-CRBIDT",
            type: "datetime",
            format: "yyyy-MM-dd HH:mm:ss",
            max: 1
        });

        // 其它感染诊断 开关
        form.on("switch(UTI)", function (data) {
            const utidtElem = $("#PC-db-UTIDT");
            if (data.elem.checked) {
                $(utidtElem).removeAttr("disabled").attr("lay-verify", "requiredDB").attr("name", function () {
                    return $(this).attr("data-name");
                });
            } else {
                $(utidtElem).removeAttr("name lay-verify").attr("disabled", true).val("");
            }
        });
        form.on("switch(PM)", function (data) {
            const pmdtElem = $("#PC-db-PMDT");
            if (data.elem.checked) {
                $(pmdtElem).removeAttr("disabled").attr("lay-verify", "requiredDB").attr("name", function () {
                    return $(this).attr("data-name");
                });
            } else {
                $(pmdtElem).removeAttr("name lay-verify").attr("disabled", true).val("");
            }
        });
        form.on("switch(VM)", function (data) {
            const vmdtElem = $("#PC-db-VMDT");
            if (data.elem.checked) {
                $(vmdtElem).removeAttr("disabled").attr("lay-verify", "requiredDB").attr("name", function () {
                    return $(this).attr("data-name");
                });
            } else {
                $(vmdtElem).removeAttr("name lay-verify").attr("disabled", true).val("");
            }
        });
        form.on("switch(CRBI)", function (data) {
            const crbidtElem = $("#PC-db-CRBIDT");
            if (data.elem.checked) {
                $(crbidtElem).removeAttr("disabled").attr("lay-verify", "requiredDB").attr("name", function () {
                    return $(this).attr("data-name");
                });
            } else {
                $(crbidtElem).removeAttr("name lay-verify").attr("disabled", true).val("");
            }
        });

        // 基础数据库 感染监测 其它感染诊断 添加/编辑 信息 提交
        form.on("submit(ISOID)", function (data) {
            const doing = "保存信息";
            loading(doing);
            $.post("/perinatalPlatform/basicDatabase/write/IS/OID/post", data.field, function (back, status) {
                if(status === "success") {
                    if(back.code) {
                        successNext();
                    }else {failMsg(doing)}
                }else {errorMsg1()}
            }, "json").fail(function () {errorMsg2()});
        });

        // 表格 选项问题
        const tableItem = $(".pc-db-item-table");
        for (let i = 0; i < tableItem.length; i++) {
            if ($(tableItem[i]).width() < $(tableItem[i]).children(".pc-db-table").width()) {
                $(tableItem[i]).css("overflow", "scroll");
                $(tableItem[i]).find(".layui-anim.layui-anim-upbit").css("position", "static");
            } else {
                $(tableItem[i]).css("overflow", "visible");
            }
        }
    });
});