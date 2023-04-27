// 表格 方块 点击
function blockClick(allFasting, allTubeFeeding, allPartialNasalFeeding, allBottleFeeding, allPartialBreastfeeding, allDirectBreastfeeding) {
    const blocksElem = $(".pc-db-BDDGSEN .pc-db-table>tbody td.pc-db-table-click");
    $(blocksElem).off("click");
    $(blocksElem).on("click", function () {
        let that = this;
        const thisTr = $(that).parent("tr"),
            tdElem = $(thisTr).children("td"),
            trNum = $(thisTr).prevAll().length;
        if ($(that).hasClass("pc-db-active")) {
            $(that).removeClass("pc-db-active");
            const tdNum = $(that).prevAll().length;
            if (trNum === 1) {
                allFasting[tdNum] = 0;
            } else if (trNum === 2) {
                allTubeFeeding[tdNum] = 0;
            } else if (trNum === 3) {
                allPartialNasalFeeding[tdNum] = 0;
            } else if (trNum === 4) {
                allBottleFeeding[tdNum] = 0;
            } else if (trNum === 5) {
                allPartialBreastfeeding[tdNum] = 0;
            } else if (trNum === 6) {
                allDirectBreastfeeding[tdNum] = 0;
            }
        } else {
            $(that).addClass("pc-db-active");
            for (let i = 0; i < tdElem.length; i++) {
                if ($(tdElem[i]).hasClass("pc-db-active")) {
                    if (trNum === 1) {
                        allFasting[i] = 1;
                    } else if (trNum === 2) {
                        allTubeFeeding[i] = 1;
                    } else if (trNum === 3) {
                        allPartialNasalFeeding[i] = 1;
                    } else if (trNum === 4) {
                        allBottleFeeding[i] = 1;
                    } else if (trNum === 5) {
                        allPartialBreastfeeding[i] = 1;
                    } else if (trNum === 6) {
                        allDirectBreastfeeding[i] = 1;
                    }
                }
            }
        }
        // 计算1-7天，8-14天，总计
        let fasting7Num = 0, fasting14Num = 0, fasting21Num = 0, fasting28Num = 0, fastingNum = 0,
            tubeFeeding7Num = 0, tubeFeeding14Num = 0, tubeFeeding21Num = 0, tubeFeeding28Num = 0, tubeFeedingNum = 0,
            partialNasalFeeding7Num = 0, partialNasalFeeding14Num = 0, partialNasalFeeding21Num = 0, partialNasalFeeding28Num = 0, partialNasalFeedingNum = 0,
            bottleFeeding7Num = 0, bottleFeeding14Num = 0, bottleFeeding21Num = 0, bottleFeeding28Num = 0, bottleFeedingNum = 0,
            partialBreastfeeding7Num = 0, partialBreastfeeding14Num = 0, partialBreastfeeding21Num = 0, partialBreastfeeding28Num = 0, partialBreastfeedingNum = 0,
            directBreastfeeding7Num = 0, directBreastfeeding14Num = 0, directBreastfeeding21Num = 0, directBreastfeeding28Num = 0, directBreastfeedingNum = 0;
        if (trNum === 1) {
            for (let i = 0; i < tdElem.length; i++) {
                if (allFasting[i] === 1) {
                    fastingNum++;
                    if (i >= 0 && i < 7) {
                        fasting7Num++;
                    } else if (i >= 7 && i < 14) {
                        fasting14Num++;
                    } else if (i >= 14 && i < 21) {
                        fasting21Num++;
                    } else if (i >= 21 && i < 28) {
                        fasting28Num++;
                    }
                }
            }
            $(".pc-db-BDDGSEN .pc-db-item-table>.pc-db-table.tableLeft>tbody>tr:eq(1)>td:eq(1)").text(fasting7Num);
            $(".pc-db-BDDGSEN .pc-db-item-table>.pc-db-table.tableLeft>tbody>tr:eq(1)>td:eq(2)").text(fasting14Num);
            if (tdElem.length > 14) {
                $(".pc-db-BDDGSEN .pc-db-item-table>.pc-db-table.tableLeft>tbody>tr:eq(1)>td:eq(3)").text(fasting21Num);
                if (tdElem.length > 21) {
                    $(".pc-db-BDDGSEN .pc-db-item-table>.pc-db-table.tableLeft>tbody>tr:eq(1)>td:eq(4)").text(fasting28Num);
                    $(".pc-db-BDDGSEN .pc-db-item-table>.pc-db-table.tableLeft>tbody>tr:eq(1)>td:eq(5)").text(fastingNum);
                } else {
                    $(".pc-db-BDDGSEN .pc-db-item-table>.pc-db-table.tableLeft>tbody>tr:eq(1)>td:eq(4)").text(fastingNum);
                }
            } else {
                $(".pc-db-BDDGSEN .pc-db-item-table>.pc-db-table.tableLeft>tbody>tr:eq(1)>td:eq(3)").text(fastingNum);
            }
        } else if (trNum === 2) {
            for (let i = 0; i < tdElem.length; i++) {
                if (allTubeFeeding[i] === 1) {
                    tubeFeedingNum++;
                    if (i >= 0 && i < 7) {
                        tubeFeeding7Num++;
                    } else if (i >= 7 && i < 14) {
                        tubeFeeding14Num++;
                    } else if (i >= 14 && i < 21) {
                        tubeFeeding21Num++;
                    } else if (i >= 21 && i < 28) {
                        tubeFeeding28Num++;
                    }
                }
            }
            $(".pc-db-BDDGSEN .pc-db-item-table>.pc-db-table.tableLeft>tbody>tr:eq(2)>td:eq(1)").text(tubeFeeding7Num);
            $(".pc-db-BDDGSEN .pc-db-item-table>.pc-db-table.tableLeft>tbody>tr:eq(2)>td:eq(2)").text(tubeFeeding14Num);
            if (tdElem.length > 14) {
                $(".pc-db-BDDGSEN .pc-db-item-table>.pc-db-table.tableLeft>tbody>tr:eq(2)>td:eq(3)").text(tubeFeeding21Num);
                if (tdElem.length > 21) {
                    $(".pc-db-BDDGSEN .pc-db-item-table>.pc-db-table.tableLeft>tbody>tr:eq(2)>td:eq(4)").text(tubeFeeding28Num);
                    $(".pc-db-BDDGSEN .pc-db-item-table>.pc-db-table.tableLeft>tbody>tr:eq(2)>td:eq(5)").text(tubeFeedingNum);
                } else {
                    $(".pc-db-BDDGSEN .pc-db-item-table>.pc-db-table.tableLeft>tbody>tr:eq(2)>td:eq(4)").text(tubeFeedingNum);
                }
            } else {
                $(".pc-db-BDDGSEN .pc-db-item-table>.pc-db-table.tableLeft>tbody>tr:eq(2)>td:eq(3)").text(tubeFeedingNum);
            }
        } else if (trNum === 3) {
            for (let i = 0; i < tdElem.length; i++) {
                if (allPartialNasalFeeding[i] === 1) {
                    partialNasalFeedingNum++;
                    if (i >= 0 && i < 7) {
                        partialNasalFeeding7Num++;
                    } else if (i >= 7 && i < 14) {
                        partialNasalFeeding14Num++;
                    } else if (i >= 14 && i < 21) {
                        partialNasalFeeding21Num++;
                    } else if (i >= 21 && i < 28) {
                        partialNasalFeeding28Num++;
                    }
                }
            }
            $(".pc-db-BDDGSEN .pc-db-item-table>.pc-db-table.tableLeft>tbody>tr:eq(3)>td:eq(1)").text(partialNasalFeeding7Num);
            $(".pc-db-BDDGSEN .pc-db-item-table>.pc-db-table.tableLeft>tbody>tr:eq(3)>td:eq(2)").text(partialNasalFeeding14Num);
            if (tdElem.length > 14) {
                $(".pc-db-BDDGSEN .pc-db-item-table>.pc-db-table.tableLeft>tbody>tr:eq(3)>td:eq(3)").text(partialNasalFeeding21Num);
                if (tdElem.length > 21) {
                    $(".pc-db-BDDGSEN .pc-db-item-table>.pc-db-table.tableLeft>tbody>tr:eq(3)>td:eq(4)").text(partialNasalFeeding28Num);
                    $(".pc-db-BDDGSEN .pc-db-item-table>.pc-db-table.tableLeft>tbody>tr:eq(3)>td:eq(5)").text(partialNasalFeedingNum);
                } else {
                    $(".pc-db-BDDGSEN .pc-db-item-table>.pc-db-table.tableLeft>tbody>tr:eq(3)>td:eq(4)").text(partialNasalFeedingNum);
                }
            } else {
                $(".pc-db-BDDGSEN .pc-db-item-table>.pc-db-table.tableLeft>tbody>tr:eq(3)>td:eq(3)").text(partialNasalFeedingNum);
            }
        } else if (trNum === 4) {
            for (let i = 0; i < tdElem.length; i++) {
                if (allBottleFeeding[i] === 1) {
                    bottleFeedingNum++;
                    if (i >= 0 && i < 7) {
                        bottleFeeding7Num++;
                    } else if (i >= 7 && i < 14) {
                        bottleFeeding14Num++;
                    } else if (i >= 14 && i < 21) {
                        bottleFeeding21Num++;
                    } else if (i >= 21 && i < 28) {
                        bottleFeeding28Num++;
                    }
                }
            }
            $(".pc-db-BDDGSEN .pc-db-item-table>.pc-db-table.tableLeft>tbody>tr:eq(4)>td:eq(1)").text(bottleFeeding7Num);
            $(".pc-db-BDDGSEN .pc-db-item-table>.pc-db-table.tableLeft>tbody>tr:eq(4)>td:eq(2)").text(bottleFeeding14Num);
            if (tdElem.length > 14) {
                $(".pc-db-BDDGSEN .pc-db-item-table>.pc-db-table.tableLeft>tbody>tr:eq(4)>td:eq(3)").text(bottleFeeding21Num);
                if (tdElem.length > 21) {
                    $(".pc-db-BDDGSEN .pc-db-item-table>.pc-db-table.tableLeft>tbody>tr:eq(4)>td:eq(4)").text(bottleFeeding28Num);
                    $(".pc-db-BDDGSEN .pc-db-item-table>.pc-db-table.tableLeft>tbody>tr:eq(4)>td:eq(5)").text(bottleFeedingNum);
                } else {
                    $(".pc-db-BDDGSEN .pc-db-item-table>.pc-db-table.tableLeft>tbody>tr:eq(4)>td:eq(4)").text(bottleFeedingNum);
                }
            } else {
                $(".pc-db-BDDGSEN .pc-db-item-table>.pc-db-table.tableLeft>tbody>tr:eq(4)>td:eq(3)").text(bottleFeedingNum);
            }
        } else if (trNum === 5) {
            for (let i = 0; i < tdElem.length; i++) {
                if (allPartialBreastfeeding[i] === 1) {
                    partialBreastfeedingNum++;
                    if (i >= 0 && i < 7) {
                        partialBreastfeeding7Num++;
                    } else if (i >= 7 && i < 14) {
                        partialBreastfeeding14Num++;
                    } else if (i >= 14 && i < 21) {
                        partialBreastfeeding21Num++;
                    } else if (i >= 21 && i < 28) {
                        partialBreastfeeding28Num++;
                    }
                }
            }
            $(".pc-db-BDDGSEN .pc-db-item-table>.pc-db-table.tableLeft>tbody>tr:eq(5)>td:eq(1)").text(partialBreastfeeding7Num);
            $(".pc-db-BDDGSEN .pc-db-item-table>.pc-db-table.tableLeft>tbody>tr:eq(5)>td:eq(2)").text(partialBreastfeeding14Num);
            if (tdElem.length > 14) {
                $(".pc-db-BDDGSEN .pc-db-item-table>.pc-db-table.tableLeft>tbody>tr:eq(5)>td:eq(3)").text(partialBreastfeeding21Num);
                if (tdElem.length > 21) {
                    $(".pc-db-BDDGSEN .pc-db-item-table>.pc-db-table.tableLeft>tbody>tr:eq(5)>td:eq(4)").text(partialBreastfeeding28Num);
                    $(".pc-db-BDDGSEN .pc-db-item-table>.pc-db-table.tableLeft>tbody>tr:eq(5)>td:eq(5)").text(partialBreastfeedingNum);
                } else {
                    $(".pc-db-BDDGSEN .pc-db-item-table>.pc-db-table.tableLeft>tbody>tr:eq(5)>td:eq(4)").text(partialBreastfeedingNum);
                }
            } else {
                $(".pc-db-BDDGSEN .pc-db-item-table>.pc-db-table.tableLeft>tbody>tr:eq(5)>td:eq(3)").text(partialBreastfeedingNum);
            }
        } else if (trNum === 6) {
            for (let i = 0; i < tdElem.length; i++) {
                if (allDirectBreastfeeding[i] === 1) {
                    directBreastfeedingNum++;
                    if (i >= 0 && i < 7) {
                        directBreastfeeding7Num++;
                    } else if (i >= 7 && i < 14) {
                        directBreastfeeding14Num++;
                    } else if (i >= 14 && i < 21) {
                        directBreastfeeding21Num++;
                    } else if (i >= 21 && i < 28) {
                        directBreastfeeding28Num++;
                    }
                }
            }
            $(".pc-db-BDDGSEN .pc-db-item-table>.pc-db-table.tableLeft>tbody>tr:eq(6)>td:eq(1)").text(directBreastfeeding7Num);
            $(".pc-db-BDDGSEN .pc-db-item-table>.pc-db-table.tableLeft>tbody>tr:eq(6)>td:eq(2)").text(directBreastfeeding14Num);
            if (tdElem.length > 14) {
                $(".pc-db-BDDGSEN .pc-db-item-table>.pc-db-table.tableLeft>tbody>tr:eq(6)>td:eq(3)").text(directBreastfeeding21Num);
                if (tdElem.length > 21) {
                    $(".pc-db-BDDGSEN .pc-db-item-table>.pc-db-table.tableLeft>tbody>tr:eq(6)>td:eq(4)").text(directBreastfeeding28Num);
                    $(".pc-db-BDDGSEN .pc-db-item-table>.pc-db-table.tableLeft>tbody>tr:eq(6)>td:eq(5)").text(directBreastfeedingNum);
                } else {
                    $(".pc-db-BDDGSEN .pc-db-item-table>.pc-db-table.tableLeft>tbody>tr:eq(6)>td:eq(4)").text(directBreastfeedingNum);
                }
            } else {
                $(".pc-db-BDDGSEN .pc-db-item-table>.pc-db-table.tableLeft>tbody>tr:eq(6)>td:eq(3)").text(directBreastfeedingNum);
            }
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
// 返回1位小数或整数
function get1DOrI(num) {
    let y = String(num).indexOf(".") + 1;
    if(y > 0) {
        return num.toFixed(1);
    } else {
        return num;
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
// 肠内营养 表格 数据 填入 计算1-7天，8-14天，15-21天，22-28天，总计，下方合计
function enInputFocusout(allDateStamp) {
    $(".pc-db-BDDGSEN .pc-db-table.tableRight>tbody td.pc-db-table-textInput>input").on("focusout", function () {
        const that = this,
            tdNum = $(that).parent("td").prevAll().length,
            thisTr = $(that).parents("tr"),
            inputElem = $(thisTr).find("input"),
            trNum = $(thisTr).prevAll().length;
        let day7Sum = 0, day14Sum = 0, day21Sum = 0, day28Sum = 0, allSum = 0, abmfFlag = 0, feFlag = 0, breastMilkFortifiersTotalUseDay = 0;
        for (let i = 0; i < inputElem.length; i++) {
            if (notNullTool($(inputElem[i]).val())) {
                const thisInput = parseFloat($(inputElem[i]).val());
                if (trNum === 10) {
                    // 添加母乳强化剂的时间
                    if (abmfFlag === 0 && thisInput > 0) {
                        abmfFlag = 1;
                        const addBreastMilkFortifierTime = allDateStamp[i],
                            addBreastMilkFortifier = new Date(addBreastMilkFortifierTime),
                            addBreastMilkFortifierString = dateFormatDay(addBreastMilkFortifier);
                        $("#PC-db-ABMFT").val(addBreastMilkFortifierString);
                    }
                    // 达全量强化的时间
                    if (feFlag === 0 && thisInput === 1) {
                        feFlag = 1;
                        const fullEnhancementTime = allDateStamp[i],
                            fullEnhancement = new Date(fullEnhancementTime),
                            fullEnhancementString = dateFormatDay(fullEnhancement);
                        $("#PC-db-FET").val(fullEnhancementString);
                    }
                    // 母乳强化剂 不能超过1
                    if (thisInput > 1) {
                        layer.msg("母乳强化剂 不能超过 1！", {
                            icon: 7,
                            time: 3000,
                            anim: 6,
                            btn: "好!",
                            resize: false,
                            shade: 0.8
                        }, function () {
                            $(inputElem[i]).val("");
                        });
                    } else if (thisInput > 0) {
                        breastMilkFortifiersTotalUseDay++;
                    }
                }
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
        // 母乳强化剂使用合计 天数
        if (trNum === 10) {
            $("#PC-db-BMFTU").val(breastMilkFortifiersTotalUseDay);
        }
        // 1-14天总计
        $(".pc-db-BDDGSEN .pc-db-item-table>.pc-db-table.tableLeft>tbody>tr:eq(" + trNum + ")>td:eq(1)").text(get1DOrI(day7Sum));
        $(".pc-db-BDDGSEN .pc-db-item-table>.pc-db-table.tableLeft>tbody>tr:eq(" + trNum + ")>td:eq(2)").text(get1DOrI(day14Sum));
        if (inputElem.length > 14) {
            // 15-21天总计
            $(".pc-db-BDDGSEN .pc-db-item-table>.pc-db-table.tableLeft>tbody>tr:eq(" + trNum + ")>td:eq(3)").text(get1DOrI(day21Sum));
            if (inputElem.length > 21) {
                // 22-28天总计
                $(".pc-db-BDDGSEN .pc-db-item-table>.pc-db-table.tableLeft>tbody>tr:eq(" + trNum + ")>td:eq(4)").text(get1DOrI(day28Sum));
                $(".pc-db-BDDGSEN .pc-db-item-table>.pc-db-table.tableLeft>tbody>tr:eq(" + trNum + ")>td:eq(5)").text(get1DOrI(allSum));
            } else {
                $(".pc-db-BDDGSEN .pc-db-item-table>.pc-db-table.tableLeft>tbody>tr:eq(" + trNum + ")>td:eq(4)").text(get1DOrI(allSum));
            }
        } else {
            $(".pc-db-BDDGSEN .pc-db-item-table>.pc-db-table.tableLeft>tbody>tr:eq(" + trNum + ")>td:eq(3)").text(get1DOrI(allSum));
        }
        // 肠内营养 左边每日奶量
        const trWidNum = $(".pc-db-BDDGSEN .pc-db-item-table>.pc-db-table.tableLeft>tbody>tr:last-child>td").length;
        // 检测 是否有 深度水解奶
        if (trNum === 10) {
            if (allSum > 0) {
                $("#PC-db-ET>input").attr("lay-verify", "requiredRadioGroup");
            } else {
                $("#PC-db-ET>input").removeAttr("lay-verify");
            }
        } else if (trNum === 11) {
            if (allSum > 0) {
                $("#PC-db-DHMCa, #PC-db-DHMCo").attr("lay-verify", "requiredDB");
            } else {
                $("#PC-db-DHMCa, #PC-db-DHMCo").removeAttr("lay-verify");
            }
        } else if (trNum === 12) {
            if (allSum > 0) {
                $("#PC-db-PHMCa, #PC-db-PHMCo").attr("lay-verify", "requiredDB");
            } else {
                $("#PC-db-PHMCa, #PC-db-PHMCo").removeAttr("lay-verify");
            }
        } else if (trNum === 13) {
            if (allSum > 0) {
                $("#PC-db-ACMCa, #PC-db-ACMCo").attr("lay-verify", "requiredDB");
            } else {
                $("#PC-db-ACMCa, #PC-db-ACMCo").removeAttr("lay-verify");
            }
        } else if (trNum === 14) {
            if (allSum > 0) {
                $("#PC-db-OFMCa, #PC-db-OFMCo").attr("lay-verify", "requiredDB");
            } else {
                $("#PC-db-OFMCa, #PC-db-OFMCo").removeAttr("lay-verify");
            }
        }
        for (let i = 1; i < trWidNum; i++) {
            let thisColSum = 0;
            for (let j = 8; j < 15; j++) {
                if (j !== 10) {
                    const numText = $(".pc-db-BDDGSEN .pc-db-item-table>.pc-db-table.tableLeft>tbody>tr:eq(" + j + ")>td:eq(" + i + ")").text();
                    if (notNullTool(numText)) {
                        const num = parseFloat(numText);
                        thisColSum += num;
                    }
                }
            }
            $(".pc-db-BDDGSEN .pc-db-item-table>.pc-db-table.tableLeft>tbody>tr:eq(15)>td:eq(" + i + ")").text(get1DOrI(thisColSum));
        }
        // 肠内营养 右边每日奶量
        let thisColSum = 0;
        for (let i = 8; i < 15; i++) {
            if (i !== 10) {
                const numInput = $(".pc-db-BDDGSEN .pc-db-item-table>.pc-db-table.tableRight>tbody>tr:eq(" + i + ")>td:eq(" + tdNum + ")>input").val();
                if (notNullTool(numInput)) {
                    const num = parseFloat(numInput);
                    thisColSum += num;
                }
            }
        }
        $(".pc-db-BDDGSEN .pc-db-item-table>.pc-db-table.tableRight>tbody>tr:eq(15)>td:eq(" + tdNum + ")").text(get1DOrI(thisColSum));
    });
}
// 肠内营养管理 表格 数据 填入 计算1-7天，8-14天，15-21天，22-28天，总计
function enmInputFocusout() {
    $(".pc-db-BDDGSENM .pc-db-table.tableRight>tbody td.pc-db-table-textInput>input").on("focusout", function () {
        const that = this,
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
        // 1-14天总计
        $(".pc-db-BDDGSENM .pc-db-item-table>.pc-db-table.tableLeft>tbody>tr:eq(" + trNum + ")>td:eq(1)").text(get2DOrI(day7Sum));
        $(".pc-db-BDDGSENM .pc-db-item-table>.pc-db-table.tableLeft>tbody>tr:eq(" + trNum + ")>td:eq(2)").text(get2DOrI(day14Sum));
        if (inputElem.length > 14) {
            // 15-21天总计
            $(".pc-db-BDDGSENM .pc-db-item-table>.pc-db-table.tableLeft>tbody>tr:eq(" + trNum + ")>td:eq(3)").text(get2DOrI(day21Sum));
            if (inputElem.length > 21) {
                // 22-28天总计
                $(".pc-db-BDDGSENM .pc-db-item-table>.pc-db-table.tableLeft>tbody>tr:eq(" + trNum + ")>td:eq(4)").text(get2DOrI(day28Sum));
                $(".pc-db-BDDGSENM .pc-db-item-table>.pc-db-table.tableLeft>tbody>tr:eq(" + trNum + ")>td:eq(5)").text(get2DOrI(allSum));
            } else {
                $(".pc-db-BDDGSENM .pc-db-item-table>.pc-db-table.tableLeft>tbody>tr:eq(" + trNum + ")>td:eq(4)").text(get2DOrI(allSum));
            }
        } else {
            $(".pc-db-BDDGSENM .pc-db-item-table>.pc-db-table.tableLeft>tbody>tr:eq(" + trNum + ")>td:eq(3)").text(get2DOrI(allSum));
        }
    });
}
$(document).ready(function () {
    // 引入 layui
    layui.use(["element", "layer", "form", "laydate"], function () {
        let form = layui.form,
            laydate = layui.laydate,
            layer = layui.layer;

        // 肠内营养
        let index = 15;
        const enElem = $(".pc-db-BDDGSEN");
        let allFasting = [], allTubeFeeding = [], allPartialNasalFeeding = [], allBottleFeeding = [], allPartialBreastfeeding = [], allDirectBreastfeeding = [];
        if (enElem.length > 0) {
            // 产生 14 天日期
            let allDateStamp = date14Day(enElem),
                maxDateStamp = allDateStamp[index - 1];
            // 表格 方块 点击
            blockClick(allFasting, allTubeFeeding, allPartialNasalFeeding, allBottleFeeding, allPartialBreastfeeding, allDirectBreastfeeding);
            // 表格 数据 填入 计算1-7天，8-14天，15-21天，22-28天，总计，下方合计
            enInputFocusout(allDateStamp);

            // 消化系统 肠内营养 增加 7 天
            $(".pc-db-BDDGSEN #PC-db-add").on("click", function () {
                const that = this;
                // 增加 7天
                let en7DayTdElem = "", max = index + 7, en7DateTdElem = "", thisDateStamp = maxDateStamp,
                    fastingTdElem = "", tubeFeedingTdElem = "", partialNasalFeedingTdElem = "",
                    bottleFeedingTdElem = "", partialBreastfeedingTdElem = "", directBreastfeedingTdElem = "",
                    en7BreastMilkTdElem = "", en7DonateBreastMilkTdElem = "", en7BreastMilkFortifierTdElem = "", en7DeeplyHydrolyzedMilkTdElem = "",
                    en7PartiallyHydrolyzedMilkTdElem = "", en7AminoAcidMilkTdElem = "", en7OrdinaryFormulaMilk1TdElem  = "", enColSumElem = "";
                while (index < max) {
                    // 天
                    en7DayTdElem += "<td>" + index + "</td>";
                    // 增加 7天 日期
                    const thisDate = new Date(thisDateStamp),
                        thisDateString = (thisDate.getFullYear() % 100) + "/" + (thisDate.getMonth() + 1) + "/" + thisDate.getDate();
                    en7DateTdElem += "<th>" + thisDateString + "</th>";
                    allDateStamp[index - 1] = thisDateStamp;
                    thisDateStamp += 86400000;
                    // 增加 7天 禁食、管饲、部分鼻饲、奶瓶喂养
                    fastingTdElem += "<td class='pc-db-table-click'></td>";
                    tubeFeedingTdElem += "<td class='pc-db-table-click'></td>";
                    partialNasalFeedingTdElem += "<td class='pc-db-table-click'></td>";
                    bottleFeedingTdElem += "<td class='pc-db-table-click'></td>";
                    partialBreastfeedingTdElem += "<td class='pc-db-table-click'></td>";
                    directBreastfeedingTdElem += "<td class='pc-db-table-click'></td>";
                    // 增加 7天 亲母母乳
                    en7BreastMilkTdElem += "<td class='pc-db-table-textInput'><input type='number' name='breastMilk" + index + "'></td>";
                    // 增加 7天 捐献母乳
                    en7DonateBreastMilkTdElem += "<td class='pc-db-table-textInput'><input type='number' name='donateBreastMilk" + index + "'></td>";
                    // 增加 7天 母乳强化剂
                    en7BreastMilkFortifierTdElem += "<td class='pc-db-table-textInput'><input type='number' name='breastMilkFortifier" + index + "'></td>";
                    // 增加 7天 深度水解奶
                    en7DeeplyHydrolyzedMilkTdElem += "<td class='pc-db-table-textInput'><input type='number' name='deeplyHydrolyzedMilk" + index + "'></td>";
                    // 增加 7天 部分水解奶
                    en7PartiallyHydrolyzedMilkTdElem += "<td class='pc-db-table-textInput'><input type='number' name='partiallyHydrolyzedMilk" + index + "'></td>";
                    // 增加 7天 氨基酸奶
                    en7AminoAcidMilkTdElem += "<td class='pc-db-table-textInput'><input type='number' name='aminoAcidMilk" + index + "'></td>";
                    // 增加 7天 普通配方奶
                    en7OrdinaryFormulaMilk1TdElem += "<td class='pc-db-table-textInput'><input type='number' name='ordinaryFormulaMilk" + index + "'></td>";
                    enColSumElem += "<td>0</td>";
                    index++;
                }
                $(that).parents("td").before(en7DayTdElem);
                maxDateStamp = thisDateStamp;
                $(".pc-db-BDDGSEN .pc-db-table.tableRight>thead>tr>.blockTh").before(en7DateTdElem);
                $(".pc-db-BDDGSEN .pc-db-table.tableRight>tbody>tr.pc-db-fasting").append(fastingTdElem);
                $(".pc-db-BDDGSEN .pc-db-table.tableRight>tbody>tr.pc-db-TF").append(tubeFeedingTdElem);
                $(".pc-db-BDDGSEN .pc-db-table.tableRight>tbody>tr.pc-db-PNF").append(partialNasalFeedingTdElem);
                $(".pc-db-BDDGSEN .pc-db-table.tableRight>tbody>tr.pc-db-BF").append(bottleFeedingTdElem);
                $(".pc-db-BDDGSEN .pc-db-table.tableRight>tbody>tr.pc-db-PBF").append(partialBreastfeedingTdElem);
                $(".pc-db-BDDGSEN .pc-db-table.tableRight>tbody>tr.pc-db-DBF").append(directBreastfeedingTdElem);
                $(".pc-db-BDDGSEN .pc-db-table.tableRight>tbody>tr>td.pc-db-colBlock").attr("colspan", index);
                $(".pc-db-BDDGSEN .pc-db-table.tableRight>tbody>tr.pc-db-BM").append(en7BreastMilkTdElem);
                $(".pc-db-BDDGSEN .pc-db-table.tableRight>tbody>tr.pc-db-DBM").append(en7DonateBreastMilkTdElem);
                $(".pc-db-BDDGSEN .pc-db-table.tableRight>tbody>tr.pc-db-BMF").append(en7BreastMilkFortifierTdElem);
                $(".pc-db-BDDGSEN .pc-db-table.tableRight>tbody>tr.pc-db-DHM").append(en7DeeplyHydrolyzedMilkTdElem);
                $(".pc-db-BDDGSEN .pc-db-table.tableRight>tbody>tr.pc-db-PHM").append(en7PartiallyHydrolyzedMilkTdElem);
                $(".pc-db-BDDGSEN .pc-db-table.tableRight>tbody>tr.pc-db-AAM").append(en7AminoAcidMilkTdElem);
                $(".pc-db-BDDGSEN .pc-db-table.tableRight>tbody>tr.pc-db-OFM").append(en7OrdinaryFormulaMilk1TdElem);
                $(".pc-db-BDDGSEN .pc-db-table.tableRight>tbody>tr.pc-db-colSum").append(enColSumElem);

                // 表格 方块 点击
                blockClick(allFasting, allTubeFeeding, allPartialNasalFeeding, allBottleFeeding, allPartialBreastfeeding, allDirectBreastfeeding);
                // 表格 数据 填入 计算1-7天，8-14天，15-21天，22-28天，总计，下方合计
                enInputFocusout(allDateStamp);
                // 增加7-21天总计
                add7To22DayTotal(max, ".pc-db-BDDGSEN", 438, 510);
            });

            // 获取 肠内营养 信息 初始化
            $.get("/perinatalPlatform/basicDatabase/write/DGS/EN/getData", function (back, status) {
                if (status === "success") {
                    if (back.code) {
                        const enDataList = back.enDataList;
                        if (enDataList.length > 0) {
                            layer.msg("出生日期、胎龄、入院日期等信息 修改后，请务必再次保存此页！");
                        }
                        // 遍历 列表
                        for (const i in enDataList) {
                            const day = enDataList[i].day,
                                fasting = enDataList[i].fasting,
                                tubeFeeding = enDataList[i].tubeFeeding,
                                partialNasalFeeding = enDataList[i].partialNasalFeeding,
                                bottleFeeding = enDataList[i].bottleFeeding,
                                partialBreastfeeding = enDataList[i].partialBreastfeeding,
                                directBreastfeeding = enDataList[i].directBreastfeeding,
                                breastMilk = enDataList[i].breastMilk,
                                donateBreastMilk = enDataList[i].donateBreastMilk,
                                breastMilkFortifier = enDataList[i].breastMilkFortifier,
                                deeplyHydrolyzedMilk = enDataList[i].deeplyHydrolyzedMilk,
                                partiallyHydrolyzedMilk = enDataList[i].partiallyHydrolyzedMilk,
                                aminoAcidMilk = enDataList[i].aminoAcidMilk,
                                ordinaryFormulaMilk = enDataList[i].ordinaryFormulaMilk;
                            let inputLength = $(".pc-db-BDDGSEN .pc-db-table tr.pc-db-BM input").length,
                                inputBlockLength = inputLength / 7;
                            // 检测 是否 要增加7天
                            while (Math.ceil(day / 7) > inputBlockLength) {
                                $("#PC-db-add").click();
                                inputLength = $(".pc-db-BDDGSEN .pc-db-table tr.pc-db-BM input").length;
                                inputBlockLength = inputLength / 7;
                            }
                            // 填充 表格
                            if (notNullTool(fasting) && fasting == 1) {
                                allFasting[day - 1] = 1;
                                const thisTdElem = $(".pc-db-BDDGSEN .pc-db-table tr.pc-db-fasting>td:eq(" + (day - 1) + ")");
                                if (!$(thisTdElem).hasClass("pc-db-active")) {
                                    $(thisTdElem).click();
                                }
                            }
                            if (notNullTool(tubeFeeding) && tubeFeeding == 1) {
                                allTubeFeeding[day - 1] = 1;
                                const thisTdElem = $(".pc-db-BDDGSEN .pc-db-table tr.pc-db-TF>td:eq(" + (day - 1) + ")");
                                if (!$(thisTdElem).hasClass("pc-db-active")) {
                                    $(thisTdElem).click();
                                }
                            }
                            if (notNullTool(partialNasalFeeding) && partialNasalFeeding == 1) {
                                allPartialNasalFeeding[day - 1] = 1;
                                const thisTdElem = $(".pc-db-BDDGSEN .pc-db-table tr.pc-db-PNF>td:eq(" + (day - 1) + ")");
                                if (!$(thisTdElem).hasClass("pc-db-active")) {
                                    $(thisTdElem).click();
                                }
                            }
                            if (notNullTool(bottleFeeding) && bottleFeeding == 1) {
                                allBottleFeeding[day - 1] = 1;
                                const thisTdElem = $(".pc-db-BDDGSEN .pc-db-table tr.pc-db-BF>td:eq(" + (day - 1) + ")");
                                if (!$(thisTdElem).hasClass("pc-db-active")) {
                                    $(thisTdElem).click();
                                }
                            }
                            if (notNullTool(partialBreastfeeding) && partialBreastfeeding == 1) {
                                allPartialBreastfeeding[day - 1] = 1;
                                const thisTdElem = $(".pc-db-BDDGSEN .pc-db-table tr.pc-db-PBF>td:eq(" + (day - 1) + ")");
                                if (!$(thisTdElem).hasClass("pc-db-active")) {
                                    $(thisTdElem).click();
                                }
                            }
                            if (notNullTool(directBreastfeeding) && directBreastfeeding == 1) {
                                allDirectBreastfeeding[day - 1] = 1;
                                const thisTdElem = $(".pc-db-BDDGSEN .pc-db-table tr.pc-db-DBF>td:eq(" + (day - 1) + ")");
                                if (!$(thisTdElem).hasClass("pc-db-active")) {
                                    $(thisTdElem).click();
                                }
                            }
                            if (notNullTool(breastMilk)) {
                                const thisInputElem = $(".pc-db-BDDGSEN .pc-db-table tr.pc-db-BM>td>input[name=breastMilk" + day + "]");
                                $(thisInputElem).val(breastMilk);
                                $(thisInputElem).focusout();
                            }
                            if (notNullTool(donateBreastMilk)) {
                                const thisInputElem = $(".pc-db-BDDGSEN .pc-db-table tr.pc-db-DBM>td>input[name=donateBreastMilk" + day + "]");
                                $(thisInputElem).val(donateBreastMilk);
                                $(thisInputElem).focusout();
                            }
                            if (notNullTool(breastMilkFortifier)) {
                                const thisInputElem = $(".pc-db-BDDGSEN .pc-db-table tr.pc-db-BMF>td>input[name=breastMilkFortifier" + day + "]");
                                $(thisInputElem).val(breastMilkFortifier);
                                $(thisInputElem).focusout();
                            }
                            if (notNullTool(deeplyHydrolyzedMilk)) {
                                const thisInputElem = $(".pc-db-BDDGSEN .pc-db-table tr.pc-db-DHM>td>input[name=deeplyHydrolyzedMilk" + day + "]");
                                $(thisInputElem).val(deeplyHydrolyzedMilk);
                                $(thisInputElem).focusout();
                            }
                            if (notNullTool(partiallyHydrolyzedMilk)) {
                                const thisInputElem = $(".pc-db-BDDGSEN .pc-db-table tr.pc-db-PHM>td>input[name=partiallyHydrolyzedMilk" + day + "]");
                                $(thisInputElem).val(partiallyHydrolyzedMilk);
                                $(thisInputElem).focusout();
                            }
                            if (notNullTool(aminoAcidMilk)) {
                                const thisInputElem = $(".pc-db-BDDGSEN .pc-db-table tr.pc-db-AAM>td>input[name=aminoAcidMilk" + day + "]");
                                $(thisInputElem).val(aminoAcidMilk);
                                $(thisInputElem).focusout();
                            }
                            if (notNullTool(ordinaryFormulaMilk)) {
                                const thisInputElem = $(".pc-db-BDDGSEN .pc-db-table tr.pc-db-OFM>td>input[name=ordinaryFormulaMilk" + day + "]");
                                $(thisInputElem).val(ordinaryFormulaMilk);
                                $(thisInputElem).focusout();
                            }
                        }
                        enInputFocusout(allDateStamp);
                    }
                }
            }, "json");
        }

        // 肠内营养管理
        const enmElem = $(".pc-db-BDDGSENM");
        if (enmElem.length > 0) {
            layer.msg("肠内营养修改后，请务必保存此页！");
            // 获取 肠内营养 初始化数据
            $.get("/perinatalPlatform/basicDatabase/write/DGS/ENM/getInitialData", function (back, status) {
                if (status === "success") {
                    if (back.code) {
                        const initialData = back.initialData,
                            en = initialData.en,
                            enList = initialData.enList,
                            giList = initialData.giList;

                        if (notNullTool(en)) {
                            const enhancerType = en.enhancerType,
                                deeplyHydrolyzedMilkCaloriesInput = en.deeplyHydrolyzedMilkCalories,
                                deeplyHydrolyzedMilkContentInput = en.deeplyHydrolyzedMilkContent,
                                partiallyHydrolyzedMilkCaloriesInput = en.partiallyHydrolyzedMilkCalories,
                                partiallyHydrolyzedMilkContentInput = en.partiallyHydrolyzedMilkContent,
                                aminoAcidMilkCaloriesInput = en.aminoAcidMilkCalories,
                                aminoAcidMilkContentInput = en.aminoAcidMilkContent,
                                ordinaryFormulaMilkCaloriesInput = en.ordinaryFormulaMilkCalories,
                                ordinaryFormulaMilkContentInput = en.ordinaryFormulaMilkContent,
                                startFeedingTimeStamp = en.startFeedingTime,
                                enteralFeedingInitiationInput = en.enteralFeedingInitiation;
                            // 产生 14 天日期
                            let allDateStamp = date14Day(enmElem),
                                maxDateStamp = allDateStamp[index - 1];
                            // 表格 数据 填入 计算1-7天，8-14天，15-21天，22-28天，总计
                            enmInputFocusout();

                            // 消化系统 肠内营养管理 增加 7 天
                            $(".pc-db-BDDGSENM #PC-db-add").on("click", function () {
                                const that = this;
                                // 增加 7天
                                let enm7DayTdElem = "", max = index + 7, enm7DateTdElem = "", thisDateStamp = maxDateStamp,
                                    enm7BreastMilkPKgTdElem = "", enm7DonateBreastMilkPKgTdElem = "",
                                    enm7DeeplyHydrolyzedMilkPKgTdElem = "",
                                    enm7PartiallyHydrolyzedMilkPKgTdElem = "", enm7AminoAcidMilkPKgTdElem = "",
                                    enm7OrdinaryFormulaMilkPKgTdElem = "",
                                    enm7TotalDailyMilkVolumePKgTrElem = "", enm7EnteralNutritionalProteinGPDTdElem = "",
                                    enm7EnteralNutritionalProteinGPKgPDTdElem = "", enm7TotalMilkCaloriesKcalPDTdElem = "",
                                    enm7TotalMilkCaloriesKcalPKgPDTdElem = "";
                                while (index < max) {
                                    // 天
                                    enm7DayTdElem += "<td>" + index + "</td>";
                                    // 增加 7天 日期
                                    const thisDate = new Date(thisDateStamp),
                                        thisDateString = (thisDate.getFullYear() % 100) + "/" + (thisDate.getMonth() + 1) + "/" + thisDate.getDate();
                                    enm7DateTdElem += "<th>" + thisDateString + "</th>";
                                    allDateStamp[index - 1] = thisDateStamp;
                                    thisDateStamp += 86400000;
                                    // 增加 7天 亲母母乳
                                    enm7BreastMilkPKgTdElem += "<td class='pc-db-table-textInput'><input type='number' name='breastMilkPKg" + index + "' readonly></td>";
                                    // 增加 7天 捐献母乳
                                    enm7DonateBreastMilkPKgTdElem += "<td class='pc-db-table-textInput'><input type='number' name='donateBreastMilkPKg" + index + "' readonly></td>";
                                    // 增加 7天 深度水解奶
                                    enm7DeeplyHydrolyzedMilkPKgTdElem += "<td class='pc-db-table-textInput'><input type='number' name='deeplyHydrolyzedMilkPKg" + index + "' readonly></td>";
                                    // 增加 7天 部分水解奶
                                    enm7PartiallyHydrolyzedMilkPKgTdElem += "<td class='pc-db-table-textInput'><input type='number' name='partiallyHydrolyzedMilkPKg" + index + "' readonly></td>";
                                    // 增加 7天 氨基酸奶
                                    enm7AminoAcidMilkPKgTdElem += "<td class='pc-db-table-textInput'><input type='number' name='aminoAcidMilkPKg" + index + "' readonly></td>";
                                    // 增加 7天 普通配方奶
                                    enm7OrdinaryFormulaMilkPKgTdElem += "<td class='pc-db-table-textInput'><input type='number' name='ordinaryFormulaMilkPKg" + index + "' readonly></td>";
                                    // 增加 7天 合计每日奶量
                                    enm7TotalDailyMilkVolumePKgTrElem += "<td class='pc-db-table-textInput'><input type='number' name='totalDailyMilkVolumePKg" + index + "' readonly></td>";
                                    // 增加 7天 肠内营养蛋白质
                                    enm7EnteralNutritionalProteinGPDTdElem += "<td class='pc-db-table-textInput'><input type='number' name='enteralNutritionalProteinGPD" + index + "' readonly></td>";
                                    enm7EnteralNutritionalProteinGPKgPDTdElem += "<td class='pc-db-table-textInput'><input type='number' name='enteralNutritionalProteinGPKgPD" + index + "' readonly></td>";
                                    // 增加 7天 奶量合计热卡
                                    enm7TotalMilkCaloriesKcalPDTdElem += "<td class='pc-db-table-textInput'><input type='number' name='totalMilkCaloriesKcalPD" + index + "' readonly></td>";
                                    enm7TotalMilkCaloriesKcalPKgPDTdElem += "<td class='pc-db-table-textInput'><input type='number' name='totalMilkCaloriesKcalPKgPD" + index + "' readonly></td>";
                                    index++;
                                }
                                $(that).parents("td").before(enm7DayTdElem);
                                maxDateStamp = thisDateStamp;
                                $(".pc-db-BDDGSENM .pc-db-table.tableRight>thead>tr>.blockTh").before(enm7DateTdElem);
                                $(".pc-db-BDDGSENM .pc-db-table.tableRight>tbody>tr.pc-db-BM").append(enm7BreastMilkPKgTdElem);
                                $(".pc-db-BDDGSENM .pc-db-table.tableRight>tbody>tr.pc-db-DBM").append(enm7DonateBreastMilkPKgTdElem);
                                $(".pc-db-BDDGSENM .pc-db-table.tableRight>tbody>tr.pc-db-DHM").append(enm7DeeplyHydrolyzedMilkPKgTdElem);
                                $(".pc-db-BDDGSENM .pc-db-table.tableRight>tbody>tr.pc-db-PHM").append(enm7PartiallyHydrolyzedMilkPKgTdElem);
                                $(".pc-db-BDDGSENM .pc-db-table.tableRight>tbody>tr.pc-db-AAM").append(enm7AminoAcidMilkPKgTdElem);
                                $(".pc-db-BDDGSENM .pc-db-table.tableRight>tbody>tr.pc-db-OFM").append(enm7OrdinaryFormulaMilkPKgTdElem);
                                $(".pc-db-BDDGSENM .pc-db-table.tableRight>tbody>tr.pc-db-TDMVPK").append(enm7TotalDailyMilkVolumePKgTrElem);
                                $(".pc-db-BDDGSENM .pc-db-table.tableRight>tbody>tr.pc-db-ENPGPD").append(enm7EnteralNutritionalProteinGPDTdElem);
                                $(".pc-db-BDDGSENM .pc-db-table.tableRight>tbody>tr.pc-db-ENPGPKPD").append(enm7EnteralNutritionalProteinGPKgPDTdElem);
                                $(".pc-db-BDDGSENM .pc-db-table.tableRight>tbody>tr.pc-db-TMCKPD").append(enm7TotalMilkCaloriesKcalPDTdElem);
                                $(".pc-db-BDDGSENM .pc-db-table.tableRight>tbody>tr.pc-db-TMCKPKPD").append(enm7TotalMilkCaloriesKcalPKgPDTdElem);
                                // 表格 数据 填入 计算1-7天，8-14天，15-21天，22-28天，总计
                                enmInputFocusout();
                                // 增加7-21天总计
                                add7To22DayTotal(max, ".pc-db-BDDGSENM", 462, 534);
                            });

                            let microfeedingEndTimeFlag = 0, milkVolumeReach30MlPKgPDTimeFlag = 0,
                                milkVolumeReach80MlPKgPDTimeFlag = 0,
                                milkVolumeReach120MlPKgPDTimeFlag = 0, milkVolumeReach150MlPKgPDTimeFlag = 0;
                            // 消化系统 肠内营养管理 数据 初始化
                            for (const i in enList) {
                                const day = enList[i].day,
                                    breastMilkInput = enList[i].breastMilk,
                                    donateBreastMilkInput = enList[i].donateBreastMilk,
                                    breastMilkFortifierInput = enList[i].breastMilkFortifier,
                                    deeplyHydrolyzedMilkInput = enList[i].deeplyHydrolyzedMilk,
                                    partiallyHydrolyzedMilkInput = enList[i].partiallyHydrolyzedMilk,
                                    aminoAcidMilkInput = enList[i].aminoAcidMilk,
                                    ordinaryFormulaMilkInput = enList[i].ordinaryFormulaMilk;
                                let weightInput = null;
                                // 找出 本日 体重
                                for (const j in giList) {
                                    if (giList[j].day == day) {
                                        weightInput = giList[j].weight;
                                        break;
                                    }
                                }
                                let inputLength = $(".pc-db-BDDGSENM .pc-db-table tr.pc-db-BM input").length,
                                    inputBlockLength = inputLength / 7;
                                // 检测 是否 要增加7天
                                while (Math.ceil(day / 7) > inputBlockLength) {
                                    $("#PC-db-add").click();
                                    inputLength = $(".pc-db-BDDGSENM .pc-db-table tr.pc-db-BM input").length;
                                    inputBlockLength = inputLength / 7;
                                }

                                if (notNullTool(weightInput)) {
                                    const weight = parseFloat(weightInput);
                                    let breastMilkPKg = 0, donateBreastMilkPKg = 0, deeplyHydrolyzedMilkPKg = 0,
                                        partiallyHydrolyzedMilkPKg = 0, aminoAcidMilkPKg = 0, ordinaryFormulaMilkPKg = 0;
                                    if (notNullTool(breastMilkInput)) {
                                        const breastMilk = parseFloat(breastMilkInput);
                                        // 亲母母乳（ml/kg/d）
                                        breastMilkPKg = breastMilk / weight;
                                        $(".pc-db-BDDGSENM .pc-db-table tr.pc-db-BM>td>input[name=breastMilkPKg" + day + "]").val(breastMilkPKg.toFixed(2)).focusout();
                                    }
                                    if (notNullTool(donateBreastMilkInput)) {
                                        // 捐献母乳（ml/kg/d）
                                        const donateBreastMilk = parseFloat(donateBreastMilkInput);
                                        donateBreastMilkPKg = donateBreastMilk / weight;
                                        $(".pc-db-BDDGSENM .pc-db-table tr.pc-db-DBM>td>input[name=donateBreastMilkPKg" + day + "]").val(donateBreastMilkPKg.toFixed(2)).focusout();
                                    }
                                    if (notNullTool(deeplyHydrolyzedMilkInput)) {
                                        // 深度水解奶（ml/kg/d）
                                        const deeplyHydrolyzedMilk = parseFloat(deeplyHydrolyzedMilkInput);
                                        deeplyHydrolyzedMilkPKg = deeplyHydrolyzedMilk / weight;
                                        $(".pc-db-BDDGSENM .pc-db-table tr.pc-db-DHM>td>input[name=deeplyHydrolyzedMilkPKg" + day + "]").val(deeplyHydrolyzedMilkPKg.toFixed(2)).focusout();
                                    }
                                    if (notNullTool(partiallyHydrolyzedMilkInput)) {
                                        // 部分水解奶（ml/kg/d）
                                        const partiallyHydrolyzedMilk = parseFloat(partiallyHydrolyzedMilkInput);
                                        partiallyHydrolyzedMilkPKg = partiallyHydrolyzedMilk / weight;
                                        $(".pc-db-BDDGSENM .pc-db-table tr.pc-db-PHM>td>input[name=partiallyHydrolyzedMilkPKg" + day + "]").val(partiallyHydrolyzedMilkPKg.toFixed(2)).focusout();
                                    }
                                    if (notNullTool(aminoAcidMilkInput)) {
                                        // 普通配方奶（ml/kg/d）
                                        const aminoAcidMilk = parseFloat(aminoAcidMilkInput);
                                        aminoAcidMilkPKg = aminoAcidMilk / weight;
                                        $(".pc-db-BDDGSENM .pc-db-table tr.pc-db-AAM>td>input[name=aminoAcidMilkPKg" + day + "]").val(aminoAcidMilkPKg.toFixed(2)).focusout();
                                    }
                                    if (notNullTool(ordinaryFormulaMilkInput)) {
                                        // 氨基酸奶（ml/kg/d）
                                        const ordinaryFormulaMilk = parseFloat(ordinaryFormulaMilkInput);
                                        ordinaryFormulaMilkPKg = ordinaryFormulaMilk / weight;
                                        $(".pc-db-BDDGSENM .pc-db-table tr.pc-db-OFM>td>input[name=ordinaryFormulaMilkPKg" + day + "]").val(ordinaryFormulaMilkPKg.toFixed(2)).focusout();
                                    }
                                    // 计算 合计每日奶量
                                    const totalDailyMilkVolumePKg = breastMilkPKg + donateBreastMilkPKg + deeplyHydrolyzedMilkPKg + partiallyHydrolyzedMilkPKg + aminoAcidMilkPKg + ordinaryFormulaMilkPKg;
                                    if (totalDailyMilkVolumePKg > 0) {
                                        $(".pc-db-BDDGSENM .pc-db-table tr.pc-db-TDMVPK>td>input[name=totalDailyMilkVolumePKg" + day + "]").val(totalDailyMilkVolumePKg.toFixed(2)).focusout();
                                        // 找出 微量喂养结束时间
                                        if (totalDailyMilkVolumePKg > 20 && microfeedingEndTimeFlag === 0) {
                                            const microfeedingEndTimeStamp = allDateStamp[day - 1];
                                            $("#PC-db-MFET").val(dateFormatDay(microfeedingEndTimeStamp));
                                            // 计算 微量喂养持续时间
                                            $("#PC-db-MD").val(Math.ceil((microfeedingEndTimeStamp - startFeedingTimeStamp) / 86400000));
                                            microfeedingEndTimeFlag = 1;
                                        }
                                        // 找出 奶量达30ml/kg/d的时间
                                        if (totalDailyMilkVolumePKg >= 30 && milkVolumeReach30MlPKgPDTimeFlag === 0) {
                                            $("#PC-db-MVR30MPKPDT").val(dateFormatDay(allDateStamp[day - 1]));
                                            milkVolumeReach30MlPKgPDTimeFlag = 1;
                                        }
                                        // 找出 奶量达80ml/kg/d的时间
                                        if (totalDailyMilkVolumePKg >= 80 && milkVolumeReach80MlPKgPDTimeFlag === 0) {
                                            $("#PC-db-MVR80MPKPDT").val(dateFormatDay(allDateStamp[day - 1]));
                                            milkVolumeReach80MlPKgPDTimeFlag = 1;
                                        }
                                        // 找出 奶量达120ml/kg/d的时间
                                        if (totalDailyMilkVolumePKg >= 120 && milkVolumeReach120MlPKgPDTimeFlag === 0) {
                                            $("#PC-db-MVR120MPKPDT").val(dateFormatDay(allDateStamp[day - 1]));
                                            // 计算 喂养增加速度
                                            if (notNullTool(enteralFeedingInitiationInput)) {
                                                const enteralFeedingInitiation = parseFloat(enteralFeedingInitiationInput),
                                                    feedingIncreaseRate = (totalDailyMilkVolumePKg - enteralFeedingInitiation) / Math.ceil((allDateStamp[day - 1] - startFeedingTimeStamp) / 86400000);
                                                $("#PC-db-FIR").val(feedingIncreaseRate.toFixed(2));
                                            } else {
                                                layer.msg("请先填写 肠内喂养的启动量！", {
                                                    icon: 7,
                                                    time: 0,
                                                    anim: 6,
                                                    btn: "好!",
                                                    resize: false,
                                                    shade: 0.8
                                                });
                                            }
                                            milkVolumeReach120MlPKgPDTimeFlag = 1;
                                        }
                                        // 找出 奶量达150ml/kg/d的时间
                                        if (totalDailyMilkVolumePKg >= 150 && milkVolumeReach150MlPKgPDTimeFlag === 0) {
                                            $("#PC-db-MVR150MPKPDT").val(dateFormatDay(allDateStamp[day - 1]));
                                            milkVolumeReach150MlPKgPDTimeFlag = 1;
                                        }
                                        // 肠内营养管理 右边计算 肠内营养蛋白质、奶量合计热卡
                                        let allBreastMilk = 0, enteralNutritionalProtein = 0, totalMilkCalories = 0,
                                            isOk = 1;
                                        // 亲母母乳
                                        if (notNullTool(breastMilkInput)) {
                                            const breastMilk = parseFloat(breastMilkInput);
                                            allBreastMilk += breastMilk;
                                            if (day <= 14) {
                                                enteralNutritionalProtein += breastMilk / 100 * 1.5;
                                                totalMilkCalories += breastMilk / 100 * 65;
                                            } else {
                                                enteralNutritionalProtein += breastMilk / 100 * 1.2;
                                                totalMilkCalories += breastMilk / 100 * 72;
                                            }
                                        }
                                        // 捐献母乳
                                        if (notNullTool(donateBreastMilkInput)) {
                                            const donateBreastMilk = parseFloat(donateBreastMilkInput);
                                            allBreastMilk += donateBreastMilk;
                                            enteralNutritionalProtein += donateBreastMilk / 100 * 0.9;
                                            totalMilkCalories += donateBreastMilk / 100 * 66;
                                        }
                                        // 所有母乳 不为0 且 有强化剂
                                        if (allBreastMilk > 0 && notNullTool(breastMilkFortifierInput)) {
                                            // 强化量
                                            const breastMilkFortifier = parseFloat(breastMilkFortifierInput);
                                            // 强化剂 不能为空
                                            if (notNullTool(enhancerType)) {
                                                if (enhancerType === "雀巢") {
                                                    enteralNutritionalProtein += breastMilkFortifier * allBreastMilk / 100 * 1.42;
                                                    totalMilkCalories += allBreastMilk / 100 * 17.4;
                                                } else if (enhancerType === "雅培") {
                                                    enteralNutritionalProtein += breastMilkFortifier * allBreastMilk / 100;
                                                    totalMilkCalories += allBreastMilk / 100 * 14;
                                                } else if (enhancerType === "美赞臣") {
                                                    enteralNutritionalProtein += breastMilkFortifier * allBreastMilk / 100 * 1.1;
                                                    totalMilkCalories += allBreastMilk / 100 * 14;
                                                } else if (enhancerType === "圣元") {
                                                    enteralNutritionalProtein += breastMilkFortifier * allBreastMilk / 100 * 1.3;
                                                    totalMilkCalories += allBreastMilk / 100 * 19.47;
                                                } else if (enhancerType === "惠氏") {
                                                    enteralNutritionalProtein += breastMilkFortifier * allBreastMilk / 100 * 1.44;
                                                    totalMilkCalories += allBreastMilk / 100 * 17.2;
                                                }
                                            }
                                        }
                                        // 深度水解奶
                                        if (notNullTool(deeplyHydrolyzedMilkInput)) {
                                            const deeplyHydrolyzedMilk = parseFloat(deeplyHydrolyzedMilkInput);
                                            if (notNullTool(deeplyHydrolyzedMilkContentInput) && notNullTool(deeplyHydrolyzedMilkCaloriesInput)) {
                                                const deeplyHydrolyzedMilkContent = parseFloat(deeplyHydrolyzedMilkContentInput);
                                                const deeplyHydrolyzedMilkCalories = parseFloat(deeplyHydrolyzedMilkCaloriesInput);

                                                enteralNutritionalProtein += deeplyHydrolyzedMilk / 100 * deeplyHydrolyzedMilkContent;
                                                totalMilkCalories += deeplyHydrolyzedMilk / 100 * deeplyHydrolyzedMilkCalories;
                                            } else {
                                                layer.msg("请先填写 深度水解奶所含 蛋白质、热量 规格！", {
                                                    icon: 7,
                                                    time: 0,
                                                    anim: 6,
                                                    btn: "好!",
                                                    resize: false,
                                                    shade: 0.8
                                                });
                                                isOk = 0;
                                            }
                                        }
                                        // 部分水解奶
                                        if (notNullTool(partiallyHydrolyzedMilkInput)) {
                                            const partiallyHydrolyzedMilk = parseFloat(partiallyHydrolyzedMilkInput);
                                            if (notNullTool(partiallyHydrolyzedMilkContentInput) && notNullTool(partiallyHydrolyzedMilkCaloriesInput)) {
                                                const partiallyHydrolyzedMilkContent = parseFloat(partiallyHydrolyzedMilkContentInput);
                                                const partiallyHydrolyzedMilkCalories = parseFloat(partiallyHydrolyzedMilkCaloriesInput);

                                                enteralNutritionalProtein += partiallyHydrolyzedMilk / 100 * partiallyHydrolyzedMilkContent;
                                                totalMilkCalories += partiallyHydrolyzedMilk / 100 * partiallyHydrolyzedMilkCalories;
                                            } else {
                                                layer.msg("请先填写 部分水解奶所含 蛋白质、热量 规格！", {
                                                    icon: 7,
                                                    time: 0,
                                                    anim: 6,
                                                    btn: "好!",
                                                    resize: false,
                                                    shade: 0.8
                                                });
                                                isOk = 0;
                                            }
                                        }
                                        // 氨基酸奶
                                        if (notNullTool(aminoAcidMilkInput)) {
                                            const aminoAcidMilk = parseFloat(aminoAcidMilkInput);
                                            if (notNullTool(aminoAcidMilkCaloriesInput) && notNullTool(aminoAcidMilkContentInput)) {
                                                const aminoAcidMilkContent = parseFloat(aminoAcidMilkContentInput);
                                                const aminoAcidMilkCalories = parseFloat(aminoAcidMilkCaloriesInput);

                                                enteralNutritionalProtein += aminoAcidMilk / 100 * aminoAcidMilkContent;
                                                totalMilkCalories += aminoAcidMilk / 100 * aminoAcidMilkCalories;
                                            } else {
                                                layer.msg("请先填写 氨基酸奶所含 蛋白质、热量 规格！", {
                                                    icon: 7,
                                                    time: 0,
                                                    anim: 6,
                                                    btn: "好!",
                                                    resize: false,
                                                    shade: 0.8
                                                });
                                                isOk = 0;
                                            }
                                        }
                                        // 普通配方奶
                                        if (notNullTool(ordinaryFormulaMilkInput)) {
                                            const ordinaryFormulaMilk = parseFloat(ordinaryFormulaMilkInput);
                                            if (notNullTool(ordinaryFormulaMilkCaloriesInput) && notNullTool(ordinaryFormulaMilkContentInput)) {
                                                const ordinaryFormulaMilkContent = parseFloat(ordinaryFormulaMilkContentInput);
                                                const ordinaryFormulaMilkCalories = parseFloat(ordinaryFormulaMilkCaloriesInput);

                                                enteralNutritionalProtein += ordinaryFormulaMilk / 100 * ordinaryFormulaMilkContent;
                                                totalMilkCalories += ordinaryFormulaMilk / 100 * ordinaryFormulaMilkCalories;
                                            } else {
                                                layer.msg("请先填写 普通配方奶所含 蛋白质、热量 规格！", {
                                                    icon: 7,
                                                    time: 0,
                                                    anim: 6,
                                                    btn: "好!",
                                                    resize: false,
                                                    shade: 0.8
                                                });
                                                isOk = 0;
                                            }
                                        }
                                        // 肠内营养蛋白质
                                        if (enteralNutritionalProtein > 0) {
                                            $(".pc-db-BDDGSENM .pc-db-table tr.pc-db-ENPGPD>td>input[name=enteralNutritionalProteinGPD" + day + "]").val(enteralNutritionalProtein.toFixed(2)).focusout();
                                            $(".pc-db-BDDGSENM .pc-db-table tr.pc-db-ENPGPKPD>td>input[name=enteralNutritionalProteinGPKgPD" + day + "]").val((enteralNutritionalProtein / weight).toFixed(2)).focusout();
                                        }
                                        // 奶量合计热卡
                                        if (totalMilkCalories > 0) {
                                            $(".pc-db-BDDGSENM .pc-db-table tr.pc-db-TMCKPD>td>input[name=totalMilkCaloriesKcalPD" + day + "]").val(totalMilkCalories.toFixed(2)).focusout();
                                            $(".pc-db-BDDGSENM .pc-db-table tr.pc-db-TMCKPKPD>td>input[name=totalMilkCaloriesKcalPKgPD" + day + "]").val((totalMilkCalories / weight).toFixed(2)).focusout();
                                        }
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
                            enmInputFocusout();
                        } else {
                            layer.msg("请先填写 肠内营养！", {
                                icon: 7,
                                time: 0,
                                anim: 6,
                                btn: "好!",
                                resize: false,
                                shade: 0.8
                            }, function () {
                                location.href="/perinatalPlatform/basicDatabase/write/DGS/EN";
                            });
                        }
                    }
                }
            }, "json");
        }

        // 开始喂养时间
        laydate.render({
            elem: "#PC-db-DFT",
            type: "datetime",
            format: "yyyy-MM-dd HH:mm:ss",
            max: 1
        });

        // 开始经口喂养时间
        laydate.render({
            elem: "#PC-db-SOFT",
            type: "datetime",
            format: "yyyy-MM-dd HH:mm:ss",
            max: 1
        });

        // 亲母母乳喂养时间
        laydate.render({
            elem: "#PC-db-BFT",
            type: "datetime",
            format: "yyyy-MM-dd HH:mm:ss",
            max: 1
        });

        // 完全经口奶瓶喂养时间
        laydate.render({
            elem: "#PC-db-FOBFT",
            type: "datetime",
            format: "yyyy-MM-dd HH:mm:ss",
            max: 1
        });

        // 肠内喂养启动时间
        laydate.render({
            elem: "#PC-db-EFST",
            type: "datetime",
            format: "yyyy-MM-dd HH:mm:ss",
            max: 1
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

        // 基础数据库 消化系统 肠内营养 添加/编辑 信息 提交
        form.on("submit(DGSEN)", function (data) {
            const doing = "保存信息";
            loading(doing);
            let field = data.field, enDataArray = [];
            for (let i = 1; i <= index; i++) {
                if (notNullTool(allFasting[i - 1]) || notNullTool(allTubeFeeding[i - 1]) || notNullTool(allPartialNasalFeeding[i - 1]) || notNullTool(allBottleFeeding[i - 1]) ||
                    notNullTool(allPartialBreastfeeding[i - 1]) || notNullTool(allDirectBreastfeeding[i - 1]) || notNullTool(field["breastMilk" + i]) || notNullTool(field["donateBreastMilk" + i]) ||
                    notNullTool(field["breastMilkFortifier" + i]) || notNullTool(field["deeplyHydrolyzedMilk" + i]) || notNullTool(field["partiallyHydrolyzedMilk" + i]) ||
                    notNullTool(field["aminoAcidMilk" + i]) || notNullTool(field["ordinaryFormulaMilk" + i])) {
                    enDataArray.push({
                        day: i,
                        fasting: allFasting[i - 1],
                        tubeFeeding: allTubeFeeding[i - 1],
                        partialNasalFeeding: allPartialNasalFeeding[i - 1],
                        bottleFeeding: allBottleFeeding[i - 1],
                        partialBreastfeeding: allPartialBreastfeeding[i - 1],
                        directBreastfeeding: allDirectBreastfeeding[i - 1],
                        breastMilk: field["breastMilk" + i],
                        donateBreastMilk: field["donateBreastMilk" + i],
                        breastMilkFortifier: field["breastMilkFortifier" + i],
                        deeplyHydrolyzedMilk: field["deeplyHydrolyzedMilk" + i],
                        partiallyHydrolyzedMilk: field["partiallyHydrolyzedMilk" + i],
                        aminoAcidMilk: field["aminoAcidMilk" + i],
                        ordinaryFormulaMilk: field["ordinaryFormulaMilk" + i]
                    });
                }
                delete field["breastMilk" + i];
                delete field["donateBreastMilk" + i];
                delete field["breastMilkFortifier" + i];
                delete field["deeplyHydrolyzedMilk" + i];
                delete field["partiallyHydrolyzedMilk" + i];
                delete field["aminoAcidMilk" + i];
                delete field["ordinaryFormulaMilk" + i];
            }

            // 清除 空数据
            for (const key in field) {
                if (!notNullTool(field[key])) {
                    delete field[key];
                }
            }

            // 左边 统计数据
            let dataTypeList = ["fasting", "tubeFeeding", "partialNasalFeeding", "bottleFeeding", "partBreastFeeding",
                "directBreastFeeding", "breastMilk", "donatedBreastMilk", "breastMilkFortifier", "deeplyHydrolyzedMilk",
                "partiallyHydrolyzedMilk", "aminoAcidMilk", "regularFormulaMilk", "totalDailyMilkVolume"];
            const tdLength = $(".pc-db-BDDGSEN .pc-db-item-table>.pc-db-table.tableLeft>tbody>tr:eq(1)>td").length;
            for (let i = 0; i < dataTypeList.length; i ++) {
                let trNum = i + 1;
                if (i > 5) {
                    trNum = i + 2;
                }
                for (let j = 0; j < tdLength - 1; j ++) {
                    const tdNum = j + 1,
                        numString = $(".pc-db-BDDGSEN .pc-db-item-table>.pc-db-table.tableLeft>tbody>tr:eq(" + trNum + ")>td:eq(" + tdNum + ")").text();
                    if (notNullTool(numString)) {
                        let num = parseFloat(numString);
                        if (i < 6) {
                            num = parseInt(numString);
                        }
                        if (j < tdLength - 2) {
                            field[dataTypeList[i] + (j * 7 + 1) + "to" + ((j + 1) * 7) + "d"] = num;
                        } else {
                            field[dataTypeList[i] + "Total"] = num;
                        }
                    }
                }
            }

            field.enDataArray = JSON.stringify(enDataArray);
            $.post("/perinatalPlatform/basicDatabase/write/DGS/EN/post",field, function (back, status) {
                if(status === "success") {
                    if(back.code) {
                        successNext();
                    }else {failMsg(doing)}
                }else {errorMsg1()}
            }, "json").fail(function () {errorMsg2()});
        });

        // 基础数据库 消化系统 肠内营养管理 添加/编辑 信息 提交
        form.on("submit(DGSENM)", function (data) {
            const doing = "保存信息";
            loading(doing);
            let field = data.field, enmDataArray = [];
            for (let i = 1; i <= index; i++) {
                if (notNullTool(field["breastMilkPKg" + i]) || notNullTool(field["donateBreastMilkPKg" + i]) || notNullTool(field["deeplyHydrolyzedMilkPKg" + i]) ||
                    notNullTool(field["partiallyHydrolyzedMilkPKg" + i]) || notNullTool(field["aminoAcidMilkPKg" + i]) || notNullTool(field["ordinaryFormulaMilkPKg" + i]) ||
                    notNullTool(field["totalDailyMilkVolumePKg" + i]) || notNullTool(field["enteralNutritionalProteinGPD" + i]) || notNullTool(field["enteralNutritionalProteinQuality" + i]) ||
                    notNullTool(field["totalMilkCaloriesSpecification" + i]) || notNullTool(field["totalMilkCaloriesQuality" + i])) {
                    enmDataArray.push({
                        day: i,
                        breastMilkPKg: field["breastMilkPKg" + i],
                        donateBreastMilkPKg: field["donateBreastMilkPKg" + i],
                        deeplyHydrolyzedMilkPKg: field["deeplyHydrolyzedMilkPKg" + i],
                        partiallyHydrolyzedMilkPKg: field["partiallyHydrolyzedMilkPKg" + i],
                        aminoAcidMilkPKg: field["aminoAcidMilkPKg" + i],
                        ordinaryFormulaMilkPKg: field["ordinaryFormulaMilkPKg" + i],
                        totalDailyMilkVolumePKg: field["totalDailyMilkVolumePKg" + i],
                        enteralNutritionalProteinGPD: field["enteralNutritionalProteinGPD" + i],
                        enteralNutritionalProteinGPKgPD: field["enteralNutritionalProteinGPKgPD" + i],
                        totalMilkCaloriesKcalPD: field["totalMilkCaloriesKcalPD" + i],
                        totalMilkCaloriesKcalPKgPD: field["totalMilkCaloriesKcalPKgPD" + i]
                    });
                }
                delete field["breastMilkPKg" + i];
                delete field["donateBreastMilkPKg" + i];
                delete field["deeplyHydrolyzedMilkPKg" + i];
                delete field["partiallyHydrolyzedMilkPKg" + i];
                delete field["aminoAcidMilkPKg" + i];
                delete field["ordinaryFormulaMilkPKg" + i];
                delete field["totalDailyMilkVolumePKg" + i];
                delete field["enteralNutritionalProteinGPD" + i];
                delete field["enteralNutritionalProteinGPKgPD" + i];
                delete field["totalMilkCaloriesKcalPD" + i];
                delete field["totalMilkCaloriesKcalPKgPD" + i];
            }

            // 清除 空数据
            for (const key in field) {
                if (!notNullTool(field[key])) {
                    delete field[key];
                }
            }

            // 左边 统计数据
            let dataTypeList = ["breastMilk", "donateBreastMilk", "deeplyHydrolyzedMilk", "partiallyHydrolyzedMilk",
                "aminoAcidMilk", "regularFormulaMilk", "totalDailyMilkVolume", "enteralNutritionProteinGPD",
                "enteralNutritionProteinGPKgPD", "totalMilkCaloriesKcalPD", "totalMilkCaloriesKcalPKgPD"];
            const tdLength = $(".pc-db-BDDGSENM .pc-db-item-table>.pc-db-table.tableLeft>tbody>tr:eq(1)>td").length;
            for (let i = 0; i < dataTypeList.length; i ++) {
                const trNum = i + 1;
                for (let j = 0; j < tdLength - 1; j ++) {
                    const tdNum = j + 1,
                        num = $(".pc-db-BDDGSENM .pc-db-item-table>.pc-db-table.tableLeft>tbody>tr:eq(" + trNum + ")>td:eq(" + tdNum + ")").text();
                    if (notNullTool(num)) {
                        if (j < tdLength - 2) {
                            field[dataTypeList[i] + (j * 7 + 1) + "to" + ((j + 1) * 7) + "d"] = parseFloat(num);
                        } else {
                            field[dataTypeList[i] + "Total"] = parseFloat(num);
                        }
                    }
                }
            }
            field.enmDataArray = JSON.stringify(enmDataArray);
            $.post("/perinatalPlatform/basicDatabase/write/DGS/ENM/post",field, function (back, status) {
                if(status === "success") {
                    if(back.code) {
                        successNext();
                    }else {failMsg(doing)}
                }else {errorMsg1()}
            }, "json").fail(function () {errorMsg2()});
        });
    });
});