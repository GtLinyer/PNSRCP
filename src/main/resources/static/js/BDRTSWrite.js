// 删除 表格 GC类型 行
function deleteGc(that) {
    layer.msg("确定要 <span class='pc-db-status-color-no'>删除</span> 此条GC信息吗?",{
        icon: 7,
        time: 0,
        anim: 6,
        btn: ["确定", "取消"],
        resize: false,
        shade: 0.8,
        yes: function (index) {
            $(that).parents("tr").remove();
            computeTotalDays("oral", "oralDays");
            computeTotalDays("IA", "IAD");
            computeTotalDays("AI", "AID");
            layer.close(index);
        }
    });
}
// 计算 每种 给药方式 总天数
function computeTotalDays(am, amd) {
    const totalDaysElem = $(".pc-db-BDRTSBPD ." + am + " .totalDays");
    if (notNullTool(totalDaysElem)) {
        let allTotalDays = 0;
        for (let i = 0; i < totalDaysElem.length; i++) {
            const thisTotalDaysInput = $(totalDaysElem[i]).val();
            if (notNullTool(thisTotalDaysInput)) {
                const thisTotalDays = parseInt(thisTotalDaysInput);
                allTotalDays += thisTotalDays;
            }
        }
        $("#PC-db-" + amd).val(allTotalDays);
    }
}
function computePsUseTimes(psType) {
    const useTimes = $(".pc-db-BDRTSRDS .pc-db-table>tbody>tr." + psType).length;
    if (notNullTool(useTimes)) {
        $("#PC-db-" + psType + "Time").val(useTimes);
    }
}
$(document).ready(function () {
    // 无创通气/HFNC 失败 计算 开始 无创通气/HFNC 时OI
    let startPaO2 = 0.0, startFiO2 = 0.0;
    $("#PC-db-BGABNIVPO2, #PC-db-BGABHFNCPO2").on("focusout", function () {
        const startPaO2Input = $(this).val();
        if (notNullTool(startPaO2Input)) {
            startPaO2 = parseFloat(startPaO2Input);
            if (startFiO2 > 0) {
                $("#PC-db-SNIVPOI, #PC-db-SHFNCOI").val((startPaO2 / (startFiO2 / 100)).toFixed(2));
            }
        }
    });
    $("#PC-db-SNIVPFO2, #PC-db-SHFNCFO2").on("focusout", function () {
        const startFiO2Input = $(this).val();
        if (notNullTool(startFiO2Input)) {
            startFiO2 = parseFloat(startFiO2Input);
            if (startPaO2 > 0) {
                $("#PC-db-SNIVPOI, #PC-db-SHFNCOI").val((startPaO2 / (startFiO2 / 100)).toFixed(2));
            }
        }
    });
    // 无创通气/HFNC 失败 计算 停止 无创通气/HFNC 时OI
    let endPaO2 = 0.0, endFiO2 = 0.0;
    $("#PC-db-BGASNIVPO2, #PC-db-BGASHFNCPO2").on("focusout", function () {
        const endPaO2Input = $(this).val();
        if (notNullTool(endPaO2Input)) {
            endPaO2 = parseFloat(endPaO2Input);
            if (endFiO2 > 0) {
                $("#PC-db-ENIVPOI, #PC-db-EHFNCOI").val((endPaO2 / (endFiO2 / 100)).toFixed(2));
            }
        }
    });
    $("#PC-db-ENIVPFO2, #PC-db-EHFNCFO2").on("focusout", function () {
        const endFiO2Input = $(this).val();
        if (notNullTool(endFiO2Input)) {
            endFiO2 = parseFloat(endFiO2Input);
            if (endPaO2 > 0) {
                $("#PC-db-ENIVPOI, #PC-db-EHFNCOI").val((endPaO2 / (endFiO2 / 100)).toFixed(2));
            }
        }
    });

    // 撤机情况 计算OI
    const ivTimesInput = $("#PC-db-invasiveVentilationTimes").val();
    if (notNullTool(ivTimesInput)) {
        const ivTimes = parseInt(ivTimesInput);
        for (let i = 1; i <= ivTimes; i++) {
            let thisPaO2 = 0.0, thisFiO2 = 0.0;
            $("#PC-db-BGAIV" + i + "WPO2").on("focusout", function () {
                const thisPaO2Input = $(this).val();
                if (notNullTool(thisPaO2Input)) {
                    thisPaO2 = parseFloat(thisPaO2Input);
                    if (thisFiO2 > 0) {
                        $("#PC-db-IV" + i + "WPOI").val((thisPaO2 / (thisFiO2 / 100)).toFixed(2));
                    }
                }
            });
            $("#PC-db-IV" + i + "WPFO2").on("focusout", function () {
                const thisFiO2Input = $(this).val();
                if (notNullTool(thisFiO2Input)) {
                    thisFiO2 = parseFloat(thisFiO2Input);
                    if (thisPaO2 > 0) {
                        $("#PC-db-IV" + i + "WPOI").val((thisPaO2 / (thisFiO2 / 100)).toFixed(2));
                    }
                }
            });
        }
    }

    // 引入 layui
    layui.use(["element", "form", "laydate"], function () {
        let form = layui.form,
            laydate = layui.laydate;

        // HFNC失败 开始HFNC时的血气分析
        form.on("switch(BHBGA)", function (data) {
            if (data.elem.checked) {
                $("#PC-db-BGABHFNCPH, #PC-db-BGABHFNCBOS, #PC-db-BGABHFNCLA, #PC-db-BGABHFNCPO2, #PC-db-BGABHFNCPCO2, #PC-db-BGABHFNCBE, #PC-db-BGABHFNCHCO3, #PC-db-BGABHFNCH").removeAttr("disabled").attr("lay-verify", "requiredDB").attr("name", function () {
                    return $(this).attr("data-name");
                });
            } else {
                $("#PC-db-BGABHFNCPH, #PC-db-BGABHFNCBOS, #PC-db-BGABHFNCLA, #PC-db-BGABHFNCPO2, #PC-db-BGABHFNCPCO2, #PC-db-BGABHFNCBE, #PC-db-BGABHFNCHCO3, #PC-db-BGABHFNCH").removeAttr("name lay-verify").attr("disabled", true).val("");
            }
        });

        // HFNC失败 停止HFNC时的血气分析
        form.on("switch(SHBGA)", function (data) {
            if (data.elem.checked) {
                $("#PC-db-BGASHFNCPH, #PC-db-BGASHFNCBOS, #PC-db-BGASHFNCLA, #PC-db-BGASHFNCPO2, #PC-db-BGASHFNCPCO2, #PC-db-BGASHFNCBE, #PC-db-BGASHFNCHCO3, #PC-db-BGASHFNCH").removeAttr("disabled").attr("lay-verify", "requiredDB").attr("name", function () {
                    return $(this).attr("data-name");
                });
            } else {
                $("#PC-db-BGASHFNCPH, #PC-db-BGASHFNCBOS, #PC-db-BGASHFNCLA, #PC-db-BGASHFNCPO2, #PC-db-BGASHFNCPCO2, #PC-db-BGASHFNCBE, #PC-db-BGASHFNCHCO3, #PC-db-BGASHFNCH").removeAttr("name lay-verify").attr("disabled", true).val("");
            }
        });

        // 基础数据库 呼吸系统 HFNC失败 添加/编辑 信息 提交
        form.on("submit(RTSHF)", function (data) {
            const doing = "保存信息";
            loading(doing);
            for (let key in data.field) {
                if (!notNullTool(data.field[key])) {
                    delete data.field[key];
                }
            }
            $.post("/perinatalPlatform/basicDatabase/write/RTS/HF/post", data.field, function (back, status) {
                if(status === "success") {
                    if(back.code) {
                        successNext();
                    }else {failMsg(doing)}
                }else {errorMsg1()}
            },"json").fail(function () {errorMsg2()});
        });

        // 无创通气失败 开始无创通气时的血气分析
        form.on("switch(BNIVBGA)", function (data) {
            if (data.elem.checked) {
                $("#PC-db-BGABNIVPH, #PC-db-BGABNIVBOS, #PC-db-BGABNIVLA, #PC-db-BGABNIVPO2, #PC-db-BGABNIVPCO2, #PC-db-BGABNIVBE, #PC-db-BGABNIVHCO3, #PC-db-BGABNIVH").removeAttr("disabled").attr("lay-verify", "requiredDB").attr("name", function () {
                    return $(this).attr("data-name");
                });
            } else {
                $("#PC-db-BGABNIVPH, #PC-db-BGABNIVBOS, #PC-db-BGABNIVLA, #PC-db-BGABNIVPO2, #PC-db-BGABNIVPCO2, #PC-db-BGABNIVBE, #PC-db-BGABNIVHCO3, #PC-db-BGABNIVH").removeAttr("name lay-verify").attr("disabled", true).val("");
            }
        });

        // 无创通气失败 停止无创通气时的血气分析
        form.on("switch(SNIVBGA)", function (data) {
            if (data.elem.checked) {
                $("#PC-db-BGASNIVPH, #PC-db-BGASNIVBOS, #PC-db-BGASNIVLA, #PC-db-BGASNIVPO2, #PC-db-BGASNIVPCO2, #PC-db-BGASNIVBE, #PC-db-BGASNIVHCO3, #PC-db-BGASNIVH").removeAttr("disabled").attr("lay-verify", "requiredDB").attr("name", function () {
                    return $(this).attr("data-name");
                });
            } else {
                $("#PC-db-BGASNIVPH, #PC-db-BGASNIVBOS, #PC-db-BGASNIVLA, #PC-db-BGASNIVPO2, #PC-db-BGASNIVPCO2, #PC-db-BGASNIVBE, #PC-db-BGASNIVHCO3, #PC-db-BGASNIVH").removeAttr("name lay-verify").attr("disabled", true).val("");
            }
        });

        // 基础数据库 呼吸系统 无创通气失败 添加/编辑 信息 提交
        form.on("submit(RTSNVF)", function (data) {
            const doing = "保存信息";
            loading(doing);
            for (let key in data.field) {
                if (!notNullTool(data.field[key])) {
                    delete data.field[key];
                }
            }
            $.post("/perinatalPlatform/basicDatabase/write/RTS/NVF/post", data.field, function (back, status) {
                if(status === "success") {
                    if(back.code) {
                        successNext();
                    }else {failMsg(doing)}
                }else {errorMsg1()}
            },"json").fail(function () {errorMsg2()});
        });

        // 无创通气失败 撤机时的血气分析
        for (let i = 1; i <= ivNum; i++) {
            form.on("switch(BGAWW" + i + ")", function (data) {
                if (data.elem.checked) {
                    $("#PC-db-BGAIV" + i + "WPH, #PC-db-BGAIV" + i + "WBOS, #PC-db-BGAIV" + i + "WLA, #PC-db-BGAIV" + i + "WPO2, #PC-db-BGAIV" + i + "WPCO2, #PC-db-BGAIV" + i + "WBE, #PC-db-BGAIV" + i + "WHCO3, #PC-db-BGAIV" + i + "WH").removeAttr("disabled").attr("lay-verify", "requiredDB").attr("name", function () {
                        return $(this).attr("data-name");
                    });
                } else {
                    $("#PC-db-BGAIV" + i + "WPH, #PC-db-BGAIV" + i + "WBOS, #PC-db-BGAIV" + i + "WLA, #PC-db-BGAIV" + i + "WPO2, #PC-db-BGAIV" + i + "WPCO2, #PC-db-BGAIV" + i + "WBE, #PC-db-BGAIV" + i + "WHCO3, #PC-db-BGAIV" + i + "WH").removeAttr("name lay-verify").attr("disabled", true).val("");
                }
            });
        }

        // 基础数据库 呼吸系统 撤机情况 添加/编辑 信息 提交
        form.on("submit(RTSWS)", function (data) {
            const doing = "保存信息";
            loading(doing);
            let field = data.field, ivArray = [], sub = {};
            for (let i = 1; i <= ivNum; i++) {
                let iv = {};
                iv.ivMethod = field["iv" + i + "Method"];
                iv.ivStartTime = field["iv" + i + "StartTime"];
                if (field["iv" + i + "Interval"] !== undefined) {
                    iv.ivInterval = field["iv" + i + "Interval"];
                } else {
                    iv.ivInterval = null;
                }
                if (field["iv" + i + "WeaningFailed"] !== undefined) {
                    iv.ivWeaningFailed = field["iv" + i + "WeaningFailed"];
                } else {
                    iv.ivWeaningFailed = null;
                }
                if (notNullTool(field["iv" + i + "EndTime"])) {
                    iv.ivEndTime = field["iv" + i + "EndTime"];
                }
                if (notNullTool(field["iv" + i + "UseTimeDay"])) {
                    iv.ivUseTimeDay = field["iv" + i + "UseTimeDay"];
                }
                if (notNullTool(field["iv" + i + "UseTimeHour"])) {
                    iv.ivUseTimeHour = field["iv" + i + "UseTimeHour"];
                }
                if (notNullTool(field["bloodGasAnalysisWhenWeaning" + i])) {
                    iv.bloodGasAnalysisWhenWeaning = field["bloodGasAnalysisWhenWeaning" + i];
                }
                if (notNullTool(field["bgaIv" + i + "WeaningPh"])) {
                    iv.bgaIvWeaningPh = field["bgaIv" + i + "WeaningPh"];
                }
                if (notNullTool(field["bgaIv" + i + "WeaningBloodOxygenSaturation"])) {
                    iv.bgaIvWeaningBloodOxygenSaturation = field["bgaIv" + i + "WeaningBloodOxygenSaturation"];
                }
                if (notNullTool(field["bgaIv" + i + "WeaningLacticAcid"])) {
                    iv.bgaIvWeaningLacticAcid = field["bgaIv" + i + "WeaningLacticAcid"];
                }
                if (notNullTool(field["bgaIv" + i + "WeaningPaO2"])) {
                    iv.bgaIvWeaningPaO2 = field["bgaIv" + i + "WeaningPaO2"];
                }
                if (notNullTool(field["bgaIv" + i + "WeaningPaCO2"])) {
                    iv.bgaIvWeaningPaCO2 = field["bgaIv" + i + "WeaningPaCO2"];
                }
                if (notNullTool(field["bgaIv" + i + "WeaningBE"])) {
                    iv.bgaIvWeaningBE = field["bgaIv" + i + "WeaningBE"];
                }
                if (notNullTool(field["bgaIv" + i + "WeaningHCO3"])) {
                    iv.bgaIvWeaningHCO3 = field["bgaIv" + i + "WeaningHCO3"];
                }
                if (notNullTool(field["bgaIv" + i + "WeaningHgb"])) {
                    iv.bgaIvWeaningHgb = field["bgaIv" + i + "WeaningHgb"];
                }
                if (notNullTool(field["iv" + i + "WeaningParamFiO2"])) {
                    iv.ivWeaningParamFiO2 = field["iv" + i + "WeaningParamFiO2"];
                }
                if (notNullTool(field["iv" + i + "WeaningParamMap"])) {
                    iv.ivWeaningParamMap = field["iv" + i + "WeaningParamMap"];
                }
                if (notNullTool(field["iv" + i + "WeaningParamPip"])) {
                    iv.ivWeaningParamPip = field["iv" + i + "WeaningParamPip"];
                }
                if (notNullTool(field["iv" + i + "WeaningParamPeep"])) {
                    iv.ivWeaningParamPeep = field["iv" + i + "WeaningParamPeep"];
                }
                if (notNullTool(field["iv" + i + "WeaningParamDeltaP"])) {
                    iv.ivWeaningParamDeltaP = field["iv" + i + "WeaningParamDeltaP"];
                }
                if (notNullTool(field["iv" + i + "WeaningParamHfho"])) {
                    iv.ivWeaningParamHfho = field["iv" + i + "WeaningParamHfho"];
                }
                if (notNullTool(field["iv" + i + "WeaningParamOI"])) {
                    iv.ivWeaningParamOI = field["iv" + i + "WeaningParamOI"];
                }
                if (notNullTool(field["afterWeaning" + i + "NivMethod"])) {
                    iv.afterWeaningNivMethod = field["afterWeaning" + i + "NivMethod"];
                }
                if (notNullTool(field["afterWeaning" + i + "NivParamFiO2"])) {
                    iv.afterWeaningNivParamFiO2 = field["afterWeaning" + i + "NivParamFiO2"];
                }
                if (notNullTool(field["afterWeaning" + i + "NivParamPeep"])) {
                    iv.afterWeaningNivParamPeep = field["afterWeaning" + i + "NivParamPeep"];
                }
                if (notNullTool(field["afterWeaning" + i + "NivParamPip"])) {
                    iv.afterWeaningNivParamPip = field["afterWeaning" + i + "NivParamPip"];
                }
                ivArray.push(iv);
            }
            sub.data = JSON.stringify(ivArray);
            $.post("/perinatalPlatform/basicDatabase/write/RTS/WS/post", sub, function (back, status) {
                if(status === "success") {
                    if(back.code) {
                        successNext();
                    }else {failMsg(doing)}
                }else {errorMsg1()}
            },"json").fail(function () {errorMsg2()});
        });

        let gcIndex = 0, startGcDate = [], endGcDate = [], startGcDateStamp = [0], endGcDateStamp = [0];
        // 获取 表格长度 初始值
        const gcIndexInput = $(".pc-db-BDRTSBPD .pc-db-table>tbody").attr("data-num");
        if (notNullTool(gcIndexInput)) {
            gcIndex = parseInt(gcIndexInput);
            // 为 日期 选择 初始化
            for (let i = 1; i <= gcIndex; i++) {
                let totalDays = 0, administrationMode = null;
                const thisGcIndex = i, administrationModeInput = $(".pc-db-BDRTSBPD .pc-db-table>tbody>tr>td>select[name=administrationMode" + i + "]+.layui-form-select>.layui-select-title>input").val();
                if (notNullTool(administrationModeInput)) {
                    administrationMode = administrationModeInput;
                }
                // 为 日期 初始化
                const thisStartGcDateInput = $("#PC-db-startGcDate" + thisGcIndex).val(),
                    thisEndGcDateInput = $("#PC-db-endGcDate" + thisGcIndex).val();
                if (notNullTool(thisStartGcDateInput)) {
                    startGcDate[thisGcIndex] = thisStartGcDateInput;
                    startGcDateStamp[thisGcIndex] = Date.parse(startGcDate[thisGcIndex]);
                }
                if (notNullTool(thisEndGcDateInput)) {
                    endGcDate[thisGcIndex] = thisEndGcDateInput;
                    endGcDateStamp[thisGcIndex] = Date.parse(endGcDate[thisGcIndex]);
                }
                laydate.render({
                    elem: "#PC-db-startGcDate" + thisGcIndex,
                    type: "datetime",
                    format: "yyyy-MM-dd HH:mm:ss",
                    max: 1,
                    done: function(value, date) {
                        if(value !== "") {
                            startGcDate[thisGcIndex] = date.year + "-" + date.month + "-" + date.date +  ' ' + date.hours + ':' + date.minutes + ':' + date.seconds;
                            startGcDateStamp[thisGcIndex] = Date.parse(startGcDate[thisGcIndex]);
                            if (notNullTool(endGcDate[thisGcIndex])) {
                                if (startGcDateStamp[thisGcIndex] <= endGcDateStamp[thisGcIndex]) {
                                    totalDays = Math.floor((endGcDateStamp[thisGcIndex] - startGcDateStamp[thisGcIndex]) / 86400000);
                                    $("#PC-db-totalDays" + thisGcIndex).val(totalDays);
                                    if (administrationMode === "口服") {
                                        computeTotalDays("oral", "oralDays");
                                    } else if (administrationMode === "静脉给药") {
                                        computeTotalDays("IA", "IAD");
                                    } else if (administrationMode === "雾化吸入") {
                                        computeTotalDays("AI", "AID");
                                    }
                                } else {
                                    layer.msg("开始日期必须<span class='layui-badge'>早于</span>结束日期！", {
                                        icon: 5,
                                        time: 3000,
                                        anim: 6,
                                        btn: "好",
                                        resize: false,
                                        shade: 0.8
                                    }, function () {
                                        $("#PC-db-startGcDate" + thisGcIndex).val("");
                                    });
                                }
                            }
                        }else {
                            startGcDate[thisGcIndex] = null;
                            startGcDateStamp[thisGcIndex] = 0;
                        }
                    }
                });
                laydate.render({
                    elem: "#PC-db-endGcDate" + thisGcIndex,
                    type: "datetime",
                    format: "yyyy-MM-dd HH:mm:ss",
                    max: 1,
                    done: function(value, date) {
                        if(value !== "") {
                            endGcDate[thisGcIndex] = date.year + "-" + date.month + "-" + date.date +  ' ' + date.hours + ':' + date.minutes + ':' + date.seconds;
                            endGcDateStamp[thisGcIndex] = Date.parse(endGcDate[thisGcIndex]);
                            if (notNullTool(startGcDateStamp[thisGcIndex])) {
                                if (startGcDateStamp[thisGcIndex] <= endGcDateStamp[thisGcIndex]) {
                                    totalDays = Math.floor((endGcDateStamp[thisGcIndex] - startGcDateStamp[thisGcIndex]) / 86400000);
                                    $("#PC-db-totalDays" + thisGcIndex).val(totalDays);
                                    if (administrationMode === "口服") {
                                        computeTotalDays("oral", "oralDays");
                                    } else if (administrationMode === "静脉给药") {
                                        computeTotalDays("IA", "IAD");
                                    } else if (administrationMode === "雾化吸入") {
                                        computeTotalDays("AI", "AID");
                                    }
                                } else {
                                    layer.msg("结束日期必须<span class='layui-badge'>晚于</span>开始日期！", {
                                        icon: 5,
                                        time: 3000,
                                        anim: 6,
                                        btn: "好",
                                        resize: false,
                                        shade: 0.8
                                    }, function () {
                                        $("#PC-db-endGcDate" + thisGcIndex).val("");
                                    });
                                }
                            }
                        }else {
                            endGcDate[thisGcIndex] = null;
                            endGcDateStamp[thisGcIndex] = 0;
                        }
                    }
                });
            }
        }
        // 增加 GC类型
        $("#PC-db-addBPD").on("click", function () {
            const that = this;
            let administrationMode = null, totalDays = 0;
            gcIndex++;
            sequentialExecution(function () {
                $(that).parents("tr").before(
                    "<tr>" +
                    "   <td>" +
                    "       <select name='gcType" + gcIndex + "' lay-filter='GCT' lay-reqText='请选择激素类型！' lay-verify='required'>" +
                    "           <option value=''>请选择激素类型</option>" +
                    "           <option value='地塞米松'>地塞米松</option>" +
                    "           <option value='布地奈德'>布地奈德</option>" +
                    "           <option value='氢化可的松'>氢化可的松</option>" +
                    "           <option value='甲强龙'>甲强龙</option>" +
                    "           <option value='倍他米松'>倍他米松</option>" +
                    "           <option value='其他'>其他</option>" +
                    "       </select>" +
                    "   </td>" +
                    "   <td>" +
                    "       <select name='administrationMode" + gcIndex + "' lay-filter='AM' lay-reqText='请选择给药方式！' lay-verify='required'>" +
                    "           <option value=''>请选择给药方式</option>" +
                    "           <option value='口服'>口服</option>" +
                    "           <option value='静脉给药'>静脉给药</option>" +
                    "           <option value='雾化吸入'>雾化吸入</option>" +
                    "       </select>" +
                    "   </td>" +
                    "   <td>" +
                    "       <select name='dosingIndication" + gcIndex + "' lay-filter='DI' lay-reqText='请选择给药指征！' lay-verify='required'>" +
                    "           <option value=''>请选择给药指征</option>" +
                    "           <option value='低血压'>低血压</option>" +
                    "           <option value='替代疗法（用于肾上腺功能不全）'>替代疗法（用于肾上腺功能不全）</option>" +
                    "           <option value='治疗BPD'>治疗BPD</option>" +
                    "           <option value='其他'>其他</option>" +
                    "           <option value='不详'>不详</option>" +
                    "       </select>" +
                    "   </td>" +
                    "   <td class='startDate'>" +
                    "       <input id='PC-db-startGcDate" + gcIndex + "' type='text' name='startGcDate" + gcIndex + "' lay-verify='required' placeholder='请选择开始日期' lay-reqText='请选择开始日期！' readonly>" +
                    "   </td>" +
                    "   <td class='endDate'>" +
                    "       <input id='PC-db-endGcDate" + gcIndex + "' type='text' name='endGcDate" + gcIndex + "' placeholder='请选择结束日期' readonly>" +
                    "   </td>" +
                    "   <td>" +
                    "       <input id='PC-db-totalDays" + gcIndex + "' type='number' name='totalDays" + gcIndex + "' class='totalDays' readonly>" +
                    "   </td>" +
                    "   <td>" +
                    "       <button onclick='deleteGc(this);' class='pc-btn pc-btn-danger'><i class='iconfont icon-delete'></i></button>" +
                    "   </td>" +
                    "</tr>");
            }, function () {
                const thisGcIndex = gcIndex;
                laydate.render({
                    elem: "#PC-db-startGcDate" + thisGcIndex,
                    type: "datetime",
                    format: "yyyy-MM-dd HH:mm:ss",
                    max: 1,
                    done: function(value, date) {
                        if(value !== "") {
                            startGcDate[thisGcIndex] = date.year + "-" + date.month + "-" + date.date +  ' ' + date.hours + ':' + date.minutes + ':' + date.seconds;
                            startGcDateStamp[thisGcIndex] = Date.parse(startGcDate[thisGcIndex]);
                            if (notNullTool(endGcDate[thisGcIndex])) {
                                if (startGcDateStamp[thisGcIndex] <= endGcDateStamp[thisGcIndex]) {
                                    totalDays = Math.floor((endGcDateStamp[thisGcIndex] - startGcDateStamp[thisGcIndex]) / 86400000);
                                    $("#PC-db-totalDays" + thisGcIndex).val(totalDays);
                                    if (administrationMode === "口服") {
                                        computeTotalDays("oral", "oralDays");
                                    } else if (administrationMode === "静脉给药") {
                                        computeTotalDays("IA", "IAD");
                                    } else if (administrationMode === "雾化吸入") {
                                        computeTotalDays("AI", "AID");
                                    }
                                } else {
                                    layer.msg("开始日期必须<span class='layui-badge'>早于</span>结束日期！", {
                                        icon: 5,
                                        time: 3000,
                                        anim: 6,
                                        btn: "好",
                                        resize: false,
                                        shade: 0.8
                                    }, function () {
                                        $("#PC-db-startGcDate" + thisGcIndex).val("");
                                    });
                                }
                            }
                        }else {
                            startGcDate[thisGcIndex] = null;
                            startGcDateStamp[thisGcIndex] = 0;
                        }
                    }
                });
                laydate.render({
                    elem: "#PC-db-endGcDate" + thisGcIndex,
                    type: "datetime",
                    format: "yyyy-MM-dd HH:mm:ss",
                    max: 1,
                    done: function(value, date) {
                        if(value !== "") {
                            endGcDate[thisGcIndex] = date.year + "-" + date.month + "-" + date.date +  ' ' + date.hours + ':' + date.minutes + ':' + date.seconds;
                            endGcDateStamp[thisGcIndex] = Date.parse(endGcDate[thisGcIndex]);
                            if (notNullTool(startGcDateStamp[thisGcIndex])) {
                                if (startGcDateStamp[thisGcIndex] <= endGcDateStamp[thisGcIndex]) {
                                    totalDays = Math.floor((endGcDateStamp[thisGcIndex] - startGcDateStamp[thisGcIndex]) / 86400000);
                                    $("#PC-db-totalDays" + thisGcIndex).val(totalDays);
                                    if (administrationMode === "口服") {
                                        computeTotalDays("oral", "oralDays");
                                    } else if (administrationMode === "静脉给药") {
                                        computeTotalDays("IA", "IAD");
                                    } else if (administrationMode === "雾化吸入") {
                                        computeTotalDays("AI", "AID");
                                    }
                                } else {
                                    layer.msg("结束日期必须<span class='layui-badge'>晚于</span>开始日期！", {
                                        icon: 5,
                                        time: 3000,
                                        anim: 6,
                                        btn: "好",
                                        resize: false,
                                        shade: 0.8
                                    }, function () {
                                        $("#PC-db-endGcDate" + thisGcIndex).val("");
                                    });
                                }
                            }
                        }else {
                            endGcDate[thisGcIndex] = null;
                            endGcDateStamp[thisGcIndex] = 0;
                        }
                    }
                });
                // 选择 给药方式统计
                form.on("select(AM)", function (data) {
                    const value = data.value;
                    $(data.elem).parents("tr").removeClass();
                    if (value !== "") {
                        administrationMode = value;
                        if (administrationMode === "口服") {
                            $(data.elem).parents("tr").addClass("oral");
                        } else if (administrationMode === "静脉给药") {
                            $(data.elem).parents("tr").addClass("IA");
                        } else if (administrationMode === "雾化吸入") {
                            $(data.elem).parents("tr").addClass("AI");
                        }
                        computeTotalDays("oral", "oralDays");
                        computeTotalDays("IA", "IAD");
                        computeTotalDays("AI", "AID");
                    }
                });
            }, function () {
                form.render("select");
                $("#PC-db-TR").val($(".pc-db-BDRTSBPD .pc-db-item-table .pc-db-table tbody>tr").length - 1);
            });
        });

        // 基础数据库 呼吸系统 BPD 添加/编辑 信息 提交
        form.on("submit(RTSBPD)", function (data) {
            let field = data.field, gcArray = [];
            const doing = "保存信息";
            loading(doing);
            for (let i = 1; i <= gcIndex; i++) {
                let gcJson = {};
                if (field["gcType" + i] !== undefined) {
                    gcJson.gcType = field["gcType" + i];
                    gcJson.administrationMode = field["administrationMode" + i];
                    gcJson.dosingIndication = field["dosingIndication" + i];
                    gcJson.startGcDate = field["startGcDate" + i];
                    if (notNullTool(field["endGcDate" + i])) {
                        gcJson.endGcDate = field["endGcDate" + i];
                    }
                    if (notNullTool(field["totalDays" + i])) {
                        gcJson.totalDays = field["totalDays" + i];
                    }
                    gcArray.push(gcJson);
                    delete field["gcType" + i];
                    delete field["administrationMode" + i];
                    delete field["dosingIndication" + i];
                    delete field["startGcDate" + i];
                    delete field["endGcDate" + i];
                    delete field["totalDays" + i];
                }
            }
            field.gcArray = JSON.stringify(gcArray);
            $.post("/perinatalPlatform/basicDatabase/write/RTS/BPD/post", field, function (back, status) {
                if(status === "success") {
                    if(back.code) {
                        successNext();
                    }else {failMsg(doing)}
                }else {errorMsg1()}
            },"json").fail(function () {errorMsg2()});
        });

        // 诊断时间
        laydate.render({
            elem: "#PC-db-DT",
            type: "datetime",
            format: "yyyy-MM-dd HH:mm:ss",
            max: 1,
        });

        $("#PC-db-usePS .layui-form-switch").off("click");
        let psIndex = 0, totalDoseAdministeredList = [0], weightList = [0];
        // 获取 RDS PS 表格长度 初始值
        const psIndexInput = $(".pc-db-BDRTSRDS .pc-db-table>tbody").attr("data-num");
        if (notNullTool(psIndexInput)) {
            psIndex = parseInt(psIndexInput);
            // 为 日期 选择 初始化
            for (let i = 1; i <= psIndex; i++) {
                const thisPsIndex = i;
                // 为 日期 初始化
                laydate.render({
                    elem: "#PC-db-AT" + thisPsIndex,
                    type: "datetime",
                    format: "yyyy-MM-dd HH:mm:ss",
                    max: 1,
                });
                let totalDoseAdministered, weight;
                // 初始化 给药总剂量
                const tdaElem = $("#PC-db-TDA" + thisPsIndex),
                    totalDoseAdministeredInput =  $(tdaElem).val();
                if (notNullTool(totalDoseAdministeredInput)) {
                    totalDoseAdministered = parseInt(totalDoseAdministeredInput);
                }
                // 初始化 体重
                const weightElem =  $("#PC-db-weight" + thisPsIndex),
                    weightInput = $(weightElem).val();
                if (notNullTool(weightInput)) {
                    weight = parseInt(weightInput);
                }
                // 计算 给药剂量
                $(tdaElem).on("focusout input", function () {
                    totalDoseAdministered = $(this).val();
                    if (notNullTool(totalDoseAdministered)) {
                        if (notNullTool(weight)) {
                            $("#PC-db-dosage" + thisPsIndex).val((totalDoseAdministered/weight).toFixed(3));
                        }
                    }
                });
                $(weightElem).on("focusout input", function () {
                    weight = $(this).val();
                    if (notNullTool(weight)) {
                        if (notNullTool(totalDoseAdministered)) {
                            $("#PC-db-dosage" + thisPsIndex).val((totalDoseAdministered/weight).toFixed(3));
                        }
                    }
                });
                // 删除 PS 行
                $("#PC-db-psDelete" + thisPsIndex).on("click", function () {
                    const that = this;
                    layer.msg("确定要 <span class='pc-db-status-color-no'>删除</span> 此条PS信息吗?",{
                        icon: 7,
                        time: 0,
                        anim: 6,
                        btn: ["确定", "取消"],
                        resize: false,
                        shade: 0.8,
                        yes: function (index) {
                            sequentialExecution(function () {
                                $(that).parents("tr").remove();
                            }, function () {
                                const trLength = $(".pc-db-BDRTSRDS .pc-db-table>tbody>tr").length;
                                if (notNullTool(trLength)) {
                                    if (parseInt(trLength) > 0) {
                                        form.val("RDS", {
                                            usePS: false
                                        });
                                    }
                                }
                                computePsUseTimes("gulsu");
                                computePsUseTimes("kelisu");
                            }, function () {
                                $("#PC-db-usePS .layui-form-switch").off("click");
                                layer.close(index);
                            });
                        }
                    });
                });
            }
            // 选择 PS类型 统计
            form.on("select(PST)", function (data) {
                const value = data.value;
                $(data.elem).parents("tr").removeClass();
                if (value !== "") {
                    if (value === "固尔苏") {
                        $(data.elem).parents("tr").addClass("gulsu");
                    } else if (value === "珂立苏") {
                        $(data.elem).parents("tr").addClass("kelisu");
                    }
                    computePsUseTimes("gulsu");
                    computePsUseTimes("kelisu");
                }
            });
        }
        // 增加 PS类型
        $("#PC-db-addRDS").on("click", function () {
            const that = this;
            let psType = null;
            psIndex++;
            sequentialExecution(function () {
                $(that).parents("tr").before(
                    "<tr>" +
                    "   <td>" +
                    "       <input id='PC-db-AT" + psIndex + "' type='text' name='administrationTime" + psIndex + "' lay-verify='required' placeholder='请选择给药时间' lay-reqText='请选择给药时间！' readonly>" +
                    "   </td>" +
                    "   <td>" +
                    "       <select name='psType" + psIndex + "' lay-filter='PST' lay-reqText='请选择PS类型！' lay-verify='required'>" +
                    "           <option value=''>请选择PS类型</option>" +
                    "           <option value='固尔苏'>固尔苏</option>" +
                    "           <option value='珂立苏'>珂立苏</option>" +
                    "       </select>" +
                    "   </td>" +
                    "   <td>" +
                    "       <select name='administrationMode" + psIndex + "' lay-reqText='请选择给药方式！' lay-verify='required'>" +
                    "           <option value=''>请选择给药方式</option>" +
                    "           <option value='气管插管'>气管插管</option>" +
                    "           <option value='INSURE'>INSURE</option>" +
                    "           <option value='LISA'>LISA</option>" +
                    "       </select>" +
                    "   </td>" +
                    "   <td>" +
                    "       <input id='PC-db-TDA" + psIndex + "' type='number' name='totalDoseAdministered" + psIndex + "' lay-verify='required' placeholder='请填写给药总剂量' lay-reqText='请填写给药总剂量！'>" +
                    "   </td>" +
                    "   <td>" +
                    "       <input id='PC-db-weight" + psIndex + "' type='number' name='weight" + psIndex + "' lay-verify='required' placeholder='请填写体重' lay-reqText='请填写体重！'>" +
                    "   </td>" +
                    "   <td>" +
                    "       <input id='PC-db-dosage" + psIndex + "' type='number' name='dosage" + psIndex + "' lay-verify='required' readonly>" +
                    "   </td>" +
                    "   <td>" +
                    "       <button id='PC-db-psDelete" + psIndex + "' class='pc-btn pc-btn-danger'><i class='iconfont icon-delete'></i></button>" +
                    "   </td>" +
                    "</tr>");
            }, function () {
                const thisPsIndex = psIndex;
                laydate.render({
                    elem: "#PC-db-AT" + thisPsIndex,
                    type: "datetime",
                    format: "yyyy-MM-dd HH:mm:ss",
                    max: 1,
                });
                // 选择 PS类型 统计
                form.on("select(PST)", function (data) {
                    const value = data.value;
                    $(data.elem).parents("tr").removeClass();
                    if (value !== "") {
                        psType = value;
                        if (psType === "固尔苏") {
                            $(data.elem).parents("tr").addClass("gulsu");
                        } else if (psType === "珂立苏") {
                            $(data.elem).parents("tr").addClass("kelisu");
                        }
                        computePsUseTimes("gulsu");
                        computePsUseTimes("kelisu");
                    }
                });
                // 计算 给药剂量
                $("#PC-db-TDA" + thisPsIndex).on("focusout input", function () {
                    const totalDoseAdministered = $(this).val();
                    if (notNullTool(totalDoseAdministered)) {
                        totalDoseAdministeredList[thisPsIndex] = parseInt(totalDoseAdministered);
                        if (notNullTool(weightList[thisPsIndex])) {
                            const weight = weightList[thisPsIndex];
                            $("#PC-db-dosage" + thisPsIndex).val((totalDoseAdministered/weight).toFixed(3));
                        }
                    }
                });
                $("#PC-db-weight" + thisPsIndex).on("focusout input", function () {
                    const weight = $(this).val();
                    if (notNullTool(weight)) {
                        weightList[thisPsIndex] = parseFloat(weight);
                        if (notNullTool(totalDoseAdministeredList[thisPsIndex])) {
                            const totalDoseAdministered = totalDoseAdministeredList[thisPsIndex];
                            $("#PC-db-dosage" + thisPsIndex).val((totalDoseAdministered/weight).toFixed(3));
                        }
                    }
                });
                // 设置 是否使用 PS
                const trLength = $(".pc-db-BDRTSRDS .pc-db-table>tbody>tr").length;
                if (notNullTool(trLength)) {
                    if (parseInt(trLength) > 0) {
                        form.val("RDS", {
                            usePS: true
                        });
                    }
                }
                // 删除 PS 行
                $("#PC-db-psDelete" + thisPsIndex).on("click", function () {
                    const that = this;
                    layer.msg("确定要 <span class='pc-db-status-color-no'>删除</span> 此条PS信息吗?",{
                        icon: 7,
                        time: 0,
                        anim: 6,
                        btn: ["确定", "取消"],
                        resize: false,
                        shade: 0.8,
                        yes: function (index) {
                            sequentialExecution(function () {
                                $(that).parents("tr").remove();
                            }, function () {
                                const trLength = $(".pc-db-BDRTSRDS .pc-db-table>tbody>tr").length;
                                if (notNullTool(trLength)) {
                                    if (parseInt(trLength) === 1) {
                                        form.val("RDS", {
                                            usePS: false
                                        });
                                    }
                                }
                                computePsUseTimes("gulsu");
                                computePsUseTimes("kelisu");
                            }, function () {
                                $("#PC-db-usePS .layui-form-switch").off("click");
                                layer.close(index);
                            });
                        }
                    });
                });
            }, function () {
                form.render("select");
                $("#PC-db-usePS .layui-form-switch").off("click");
                computePsUseTimes("gulsu");
                computePsUseTimes("kelisu");
                const useTimes = $(".pc-db-BDRTSRDS .pc-db-table ." + psType).length;
                if (notNullTool(useTimes)) {
                    $("#PC-db-" + psType).val(useTimes);
                }
            });
        });

        // 是否 RDS 后面输入
        form.on("switch(RDS)", function (data) {
            if (data.elem.checked) {
                $("#PC-db-DT").removeAttr("disabled").attr("lay-verify", "requiredDB").attr("name", function () {
                    return $(this).attr("data-name");
                });
                $("#PC-db-grade>input").attr("lay-verify", "requiredRadioGroup").attr("name", function () {
                    return $(this).attr("data-name");
                });
                $("#PC-db-grade>ul").removeClass("rbgOff");
                $("#PC-db-grade>ul>li").on("click", function () {
                    activeRBGChoice(this);
                });
                $("#PC-db-DB>.pc-db-item-checkbox>input").removeAttr("disabled");
            } else {
                $("#PC-db-DT").removeAttr("name lay-verify").attr("disabled", true).val("");
                $("#PC-db-grade>input").removeAttr("name lay-verify");
                $("#PC-db-grade>ul").addClass("rbgOff");
                $("#PC-db-grade>ul>li").off("click");
                $("#PC-db-DB>.pc-db-item-checkbox>input").attr("disabled", true);
            }
            setTimeout(function () {
                form.render("checkbox");
            },200);
        });

        // 基础数据库 呼吸系统 RDS 添加/编辑 信息 提交
        form.on("submit(RTSRDS)", function (data) {
            let field = data.field, psArray = [];
            const doing = "保存信息";
            loading(doing);
            for (let i = 1; i <= psIndex; i++) {
                if (field["administrationTime" + i] !== undefined) {
                    psArray.push({
                        administrationTime: field["administrationTime" + i],
                        psType: field["psType" + i],
                        administrationMode: field["administrationMode" + i],
                        totalDoseAdministered: field["totalDoseAdministered" + i],
                        weight: field["weight" + i],
                        dosage: field["dosage" + i]
                    });
                    delete field["administrationTime" + i];
                    delete field["psType" + i];
                    delete field["administrationMode" + i];
                    delete field["totalDoseAdministered" + i];
                    delete field["weight" + i];
                    delete field["dosage" + i];
                }
            }
            field.psArray = JSON.stringify(psArray);
            $.post("/perinatalPlatform/basicDatabase/write/RTS/RDS/post", field, function (back, status) {
                if(status === "success") {
                    if(back.code) {
                        successNext();
                    }else {failMsg(doing)}
                }else {errorMsg1()}
            },"json").fail(function () {errorMsg2()});
        });

        let apIndex = 0, startApDate = [], endApDate = [], startApDateStamp = [0], endApDateStamp = [0];
        // 获取 呼吸暂停 表格长度 初始值
        const apIndexInput = $(".pc-db-BDRTSAP .pc-db-table>tbody").attr("data-num");
        if (notNullTool(apIndexInput)) {
            apIndex = parseInt(apIndexInput);
            // 为 日期 选择 初始化
            for (let i = 1; i <= apIndex; i++) {
                const thisApIndex = i;
                // 为 日期 初始化
                const thisStartApDateInput = $("#PC-db-startApDate" + thisApIndex).val(),
                    thisEndApDateInput = $("#PC-db-endApDate" + thisApIndex).val();
                if (notNullTool(thisStartApDateInput)) {
                    startApDate[thisApIndex] = thisStartApDateInput;
                    startApDateStamp[thisApIndex] = Date.parse(startApDate[thisApIndex]);
                }
                if (notNullTool(thisEndApDateInput)) {
                    endApDate[thisApIndex] = thisEndApDateInput;
                    endApDateStamp[thisApIndex] = Date.parse(endApDate[thisApIndex]);
                }
                laydate.render({
                    elem: "#PC-db-startApDate" + thisApIndex,
                    type: "datetime",
                    format: "yyyy-MM-dd HH:mm:ss",
                    max: 1,
                    done: function(value, date) {
                        if(value !== "") {
                            startApDate[thisApIndex] = date.year + "-" + date.month + "-" + date.date +  ' ' + date.hours + ':' + date.minutes + ':' + date.seconds;
                            startApDateStamp[thisApIndex] = Date.parse(startApDate[thisApIndex]);
                            if (notNullTool(endApDate[thisApIndex])) {
                                if (startApDateStamp[thisApIndex] <= endApDateStamp[thisApIndex]) {
                                    $("#PC-db-totalDays" + thisApIndex).val(Math.floor((endApDateStamp[thisApIndex] - startApDateStamp[thisApIndex]) / 86400000));
                                } else {
                                    layer.msg("开始日期必须<span class='layui-badge'>早于</span>结束日期！", {
                                        icon: 5,
                                        time: 3000,
                                        anim: 6,
                                        btn: "好",
                                        resize: false,
                                        shade: 0.8
                                    }, function () {
                                        $("#PC-db-startApDate" + thisApIndex).val("");
                                    });
                                }
                            }
                        }else {
                            startApDate[thisApIndex] = null;
                            startApDateStamp[thisApIndex] = 0;
                        }
                    }
                });
                laydate.render({
                    elem: "#PC-db-endApDate" + thisApIndex,
                    type: "datetime",
                    format: "yyyy-MM-dd HH:mm:ss",
                    max: 1,
                    done: function(value, date) {
                        if(value !== "") {
                            endApDate[thisApIndex] = date.year + "-" + date.month + "-" + date.date +  ' ' + date.hours + ':' + date.minutes + ':' + date.seconds;
                            endApDateStamp[thisApIndex] = Date.parse(endApDate[thisApIndex]);
                            if (notNullTool(startApDateStamp[thisApIndex])) {
                                if (startApDateStamp[thisApIndex] <= endApDateStamp[thisApIndex]) {
                                    $("#PC-db-totalDays" + thisApIndex).val(Math.floor((endApDateStamp[thisApIndex] - startApDateStamp[thisApIndex]) / 86400000));
                                } else {
                                    layer.msg("结束日期必须<span class='layui-badge'>晚于</span>开始日期！", {
                                        icon: 5,
                                        time: 3000,
                                        anim: 6,
                                        btn: "好",
                                        resize: false,
                                        shade: 0.8
                                    }, function () {
                                        $("#PC-db-endApDate" + thisApIndex).val("");
                                    });
                                }
                            }
                        }else {
                            endApDate[thisApIndex] = null;
                            endApDateStamp[thisApIndex] = 0;
                        }
                    }
                });
                // 删除 咖啡因 行
                $("#PC-db-apDelete" + thisApIndex).on("click", function () {
                    const that = this;
                    layer.msg("确定要 <span class='pc-db-status-color-no'>删除</span> 此条咖啡因信息吗?",{
                        icon: 7,
                        time: 0,
                        anim: 6,
                        btn: ["确定", "取消"],
                        resize: false,
                        shade: 0.8,
                        yes: function (index) {
                            sequentialExecution(function () {
                                $(that).parents("tr").remove();
                            }, function () {
                                const trLength = $(".pc-db-BDRTSAP .pc-db-table>tbody>tr").length;
                                if (notNullTool(trLength)) {
                                    if (parseInt(trLength) === 1) {
                                        form.val("AP", {
                                            useCaffeine: false
                                        });
                                    }
                                }
                                $("#PC-db-caffeineTime").val(trLength - 1);
                            }, function () {
                                $("#PC-db-usePS .layui-form-switch").off("click");
                                layer.close(index);
                            });
                        }
                    });
                });
            }
        }
        // 取消 咖啡因使用 选择
        $("#PC-db-useCaffeine .layui-form-switch").off("click");
        // 增加 咖啡因 治疗
        $("#PC-db-addAP").on("click", function () {
            const that = this;
            apIndex++;
            sequentialExecution(function () {
                $(that).parents("tr").before(
                    "<tr>" +
                    "   <td class='startDate'>" +
                    "       <input id='PC-db-startApDate" + apIndex + "' type='text' name='startApDate" + apIndex + "' lay-verify='required' placeholder='请选择开始日期' lay-reqText='请选择开始日期！' readonly>" +
                    "   </td>" +
                    "   <td class='endDate'>" +
                    "       <input id='PC-db-endApDate" + apIndex + "' type='text' name='endApDate" + apIndex + "' lay-verify='required' placeholder='请选择结束日期' lay-reqText='请选择结束日期！' readonly>" +
                    "   </td>" +
                    "   <td>" +
                    "       <input id='PC-db-totalDays" + apIndex + "' type='number' name='totalDays" + apIndex + "' class='totalDays' lay-verify='required' readonly>" +
                    "   </td>" +
                    "   <td>" +
                    "       <select name='useReason" + apIndex + "' lay-filter='UR' lay-reqText='请选择使用原因！' lay-verify='required'>" +
                    "           <option value=''>请选择使用原因</option>" +
                    "           <option value='预防用药'>预防用药</option>" +
                    "           <option value='治疗呼吸暂停'>治疗呼吸暂停</option>" +
                    "       </select>" +
                    "   </td>" +
                    "   <td>" +
                    "       <input type='number' name='firstDose" + apIndex + "' lay-verify='required' placeholder='请填写首次剂量' lay-reqText='请填写首次剂量！'>" +
                    "   </td>" +
                    "   <td>" +
                    "       <input type='number' name='maintenanceDose" + apIndex + "' lay-verify='required' placeholder='请填写维持剂量' lay-reqText='请填写维持剂量！'>" +
                    "   </td>" +
                    "   <td>" +
                    "       <button id='PC-db-apDelete" + apIndex + "' class='pc-btn pc-btn-danger'><i class='iconfont icon-delete'></i></button>" +
                    "   </td>" +
                    "</tr>");
            }, function () {
                const thisApIndex = apIndex;
                laydate.render({
                    elem: "#PC-db-startApDate" + thisApIndex,
                    type: "datetime",
                    format: "yyyy-MM-dd HH:mm:ss",
                    max: 1,
                    done: function(value, date) {
                        if(value !== "") {
                            startApDate[thisApIndex] = date.year + "-" + date.month + "-" + date.date +  ' ' + date.hours + ':' + date.minutes + ':' + date.seconds;
                            startApDateStamp[thisApIndex] = Date.parse(startApDate[thisApIndex]);
                            if (notNullTool(endApDate[thisApIndex])) {
                                if (startApDateStamp[thisApIndex] <= endApDateStamp[thisApIndex]) {
                                    $("#PC-db-totalDays" + thisApIndex).val(Math.floor((endApDateStamp[thisApIndex] - startApDateStamp[thisApIndex]) / 86400000));
                                } else {
                                    layer.msg("开始日期必须<span class='layui-badge'>早于</span>结束日期！", {
                                        icon: 5,
                                        time: 3000,
                                        anim: 6,
                                        btn: "好",
                                        resize: false,
                                        shade: 0.8
                                    }, function () {
                                        $("#PC-db-startApDate" + thisApIndex).val("");
                                    });
                                }
                            }
                        }else {
                            startApDate[thisApIndex] = null;
                            startApDateStamp[thisApIndex] = 0;
                        }
                    }
                });
                laydate.render({
                    elem: "#PC-db-endApDate" + thisApIndex,
                    type: "datetime",
                    format: "yyyy-MM-dd HH:mm:ss",
                    max: 1,
                    done: function(value, date) {
                        if(value !== "") {
                            endApDate[thisApIndex] = date.year + "-" + date.month + "-" + date.date +  ' ' + date.hours + ':' + date.minutes + ':' + date.seconds;
                            endApDateStamp[thisApIndex] = Date.parse(endApDate[thisApIndex]);
                            if (notNullTool(startApDateStamp[thisApIndex])) {
                                if (startApDateStamp[thisApIndex] <= endApDateStamp[thisApIndex]) {
                                    $("#PC-db-totalDays" + thisApIndex).val(Math.floor((endApDateStamp[thisApIndex] - startApDateStamp[thisApIndex]) / 86400000));
                                } else {
                                    layer.msg("结束日期必须<span class='layui-badge'>晚于</span>开始日期！", {
                                        icon: 5,
                                        time: 3000,
                                        anim: 6,
                                        btn: "好",
                                        resize: false,
                                        shade: 0.8
                                    }, function () {
                                        $("#PC-db-endApDate" + thisApIndex).val("");
                                    });
                                }
                            }
                        }else {
                            endApDate[thisApIndex] = null;
                            endApDateStamp[thisApIndex] = 0;
                        }
                    }
                });
                // 删除 咖啡因 行
                $("#PC-db-apDelete" + thisApIndex).on("click", function () {
                    const that = this;
                    layer.msg("确定要 <span class='pc-db-status-color-no'>删除</span> 此条咖啡因信息吗?",{
                        icon: 7,
                        time: 0,
                        anim: 6,
                        btn: ["确定", "取消"],
                        resize: false,
                        shade: 0.8,
                        yes: function (index) {
                            sequentialExecution(function () {
                                $(that).parents("tr").remove();
                            }, function () {
                                const trLength = $(".pc-db-BDRTSAP .pc-db-table>tbody>tr").length;
                                if (notNullTool(trLength)) {
                                    if (parseInt(trLength) === 1) {
                                        form.val("AP", {
                                            useCaffeine: false
                                        });
                                    }
                                }
                                $("#PC-db-caffeineTime").val(trLength - 1);
                            }, function () {
                                $("#PC-db-usePS .layui-form-switch").off("click");
                                layer.close(index);
                            });
                        }
                    });
                });
            }, function () {
                form.render("select");
                const trLength = $(".pc-db-BDRTSAP .pc-db-table>tbody>tr").length;
                if (notNullTool(trLength)) {
                    if (parseInt(trLength) > 0) {
                        form.val("AP", {
                            useCaffeine: true
                        });
                    }
                }
                $("#PC-db-usePS .layui-form-switch").off("click");
                $("#PC-db-caffeineTime").val($(".pc-db-BDRTSAP .pc-db-item-table .pc-db-table tbody>tr").length - 1);
            });
        });

        // 是否 呼吸暂停 后面输入
        form.on("switch(AP)", function (data) {
            if (data.elem.checked) {
                $("#PC-db-DT").removeAttr("disabled").attr("lay-verify", "requiredDB").attr("name", function () {
                    return $(this).attr("data-name");
                });
            } else {
                $("#PC-db-DT").removeAttr("name lay-verify").attr("disabled", true).val("");
            }
        });

        // 基础数据库 呼吸系统 呼吸暂停 添加/编辑 信息 提交
        form.on("submit(RTSAP)", function (data) {
            let field = data.field, apArray = [];
            const doing = "保存信息";
            loading(doing);
            for (let i = 1; i <= apIndex; i++) {
                if (field["startApDate" + i] !== undefined && field["endApDate" + i] !== undefined) {
                    apArray.push({
                        startApDate: field["startApDate" + i],
                        endApDate: field["endApDate" + i],
                        totalDays: field["totalDays" + i],
                        useReason: field["useReason" + i],
                        firstDose: field["firstDose" + i],
                        maintenanceDose: field["maintenanceDose" + i]
                    });
                    delete field["startApDate" + i];
                    delete field["endApDate" + i];
                    delete field["totalDays" + i];
                    delete field["useReason" + i];
                    delete field["firstDose" + i];
                    delete field["maintenanceDose" + i];
                }
            }
            field.apArray = JSON.stringify(apArray);
            $.post("/perinatalPlatform/basicDatabase/write/RTS/AP/post", field, function (back, status) {
                if(status === "success") {
                    if(back.code) {
                        successNext();
                    }else {failMsg(doing)}
                }else {errorMsg1()}
            },"json").fail(function () {errorMsg2()});
        });

        // 新生儿肺炎 开关 诊断日期
        form.on("switch(NP)", function (data) {
           if (data.elem.checked) {
                $("#PC-db-NPDT").removeAttr("disabled").attr("lay-verify", "requiredDB").attr("name", function () {
                   return $(this).attr("data-name");
                });
           } else {
               $("#PC-db-NPDT").removeAttr("name lay-verify").attr("disabled", true).val("");
           }
        });

        // 新生儿肺炎 诊断日期
        laydate.render({
            elem: "#PC-db-NPDT",
            type: "date",
            format: "yyyy-MM-dd",
            max: 0
        });

        // 气胸 开关 诊断日期
        form.on("switch(PN)", function (data) {
            if (data.elem.checked) {
                $("#PC-db-PDT").removeAttr("disabled").attr("lay-verify", "requiredDB").attr("name", function () {
                    return $(this).attr("data-name");
                });
                $("#PC-db-PT>input, #PC-db-PCTD>input").removeAttr("disabled");
                setTimeout(function () {
                    form.render("checkbox");
                },200);
            } else {
                $("#PC-db-PDT").removeAttr("name lay-verify").attr("disabled", true).val("");
                $("#PC-db-PT>input, #PC-db-PCTD>input").attr("disabled", true);
                setTimeout(function () {
                    form.val("BDRTSODT", {
                        pneumothoraxThoracentesis: false,
                        pneumothoraxClosedThoracicDrainage: false
                    });
                },200);
            }
        });

        // 气胸 诊断日期
        laydate.render({
            elem: "#PC-db-PDT",
            type: "date",
            format: "yyyy-MM-dd",
            max: 0
        });

        // 胸腔积液 开关 诊断日期
        form.on("switch(PE)", function (data) {
            if (data.elem.checked) {
                $("#PC-db-PEDT").removeAttr("disabled").attr("lay-verify", "requiredDB").attr("name", function () {
                    return $(this).attr("data-name");
                });
                $("#PC-db-PET>input, #PC-db-PECTD>input").removeAttr("disabled");
                setTimeout(function () {
                    form.render("checkbox");
                },200);
            } else {
                $("#PC-db-PEDT").removeAttr("name lay-verify").attr("disabled", true).val("");
                $("#PC-db-PET>input, #PC-db-PECTD>input").attr("disabled", true);
                setTimeout(function () {
                    form.val("BDRTSODT", {
                        pleuralEffusionThoracentesis: false,
                        pleuralEffusionClosedThoracicDrainage: false
                    });
                },200);
            }
        });

        // 胸腔积液 诊断日期
        laydate.render({
            elem: "#PC-db-PEDT",
            type: "date",
            format: "yyyy-MM-dd",
            max: 0
        });

        // 呼吸机相关性肺炎 开关 诊断日期
        form.on("switch(VAP)", function (data) {
            if (data.elem.checked) {
                $("#PC-db-VAPDT").removeAttr("disabled").attr("lay-verify", "requiredDB").attr("name", function () {
                    return $(this).attr("data-name");
                });
            } else {
                $("#PC-db-VAPDT").removeAttr("name lay-verify").attr("disabled", true).val("");
            }
        });

        // 呼吸机相关性肺炎 诊断日期
        laydate.render({
            elem: "#PC-db-VAPDT",
            type: "date",
            format: "yyyy-MM-dd",
            max: 0
        });

        // 呼吸机相关血流感染 开关 诊断日期
        form.on("switch(VRBI)", function (data) {
            if (data.elem.checked) {
                $("#PC-db-VRBIDT").removeAttr("disabled").attr("lay-verify", "requiredDB").attr("name", function () {
                    return $(this).attr("data-name");
                });
            } else {
                $("#PC-db-VRBIDT").removeAttr("name lay-verify").attr("disabled", true).val("");
            }
        });

        // 呼吸机相关血流感染 诊断日期
        laydate.render({
            elem: "#PC-db-VRBIDT",
            type: "date",
            format: "yyyy-MM-dd",
            max: 0
        });

        // 肺出血 开关 诊断日期
        form.on("switch(PH)", function (data) {
            if (data.elem.checked) {
                $("#PC-db-PHDT").removeAttr("disabled").attr("lay-verify", "requiredDB").attr("name", function () {
                    return $(this).attr("data-name");
                });
            } else {
                $("#PC-db-PHDT").removeAttr("name lay-verify").attr("disabled", true).val("");
            }
        });

        // 肺出血 诊断日期
        laydate.render({
            elem: "#PC-db-PHDT",
            type: "date",
            format: "yyyy-MM-dd",
            max: 0
        });

        // ARDS 开关 诊断日期
        form.on("switch(ARDS)", function (data) {
            if (data.elem.checked) {
                $("#PC-db-ARDSDT").removeAttr("disabled").attr("lay-verify", "requiredDB").attr("name", function () {
                    return $(this).attr("data-name");
                });
            } else {
                $("#PC-db-ARDSDT").removeAttr("name lay-verify").attr("disabled", true).val("");
            }
        });

        // ARDS 诊断日期
        laydate.render({
            elem: "#PC-db-ARDSDT",
            type: "date",
            format: "yyyy-MM-dd",
            max: 1,
        });

        // 呼吸衰竭 开关 诊断日期
        form.on("switch(RF)", function (data) {
            if (data.elem.checked) {
                $("#PC-db-RFDT").removeAttr("disabled").attr("lay-verify", "requiredDB").attr("name", function () {
                    return $(this).attr("data-name");
                });
            } else {
                $("#PC-db-RFDT").removeAttr("name lay-verify").attr("disabled", true).val("");
            }
        });

        // 呼吸衰竭 诊断日期
        laydate.render({
            elem: "#PC-db-RFDT",
            type: "date",
            format: "yyyy-MM-dd",
            max: 0
        });

        // 基础数据库 呼吸系统 其它诊断与治疗 添加/编辑 信息 提交
        form.on("submit(RTSODT)", function (data) {
            const doing = "保存信息";
            loading(doing);
            $.post("/perinatalPlatform/basicDatabase/write/RTS/ODT/post", data.field, function (back, status) {
                if(status === "success") {
                    if(back.code) {
                        successNext();
                    }else {failMsg(doing)}
                }else {errorMsg1()}
            },"json").fail(function () {errorMsg2()});
        });

        // 表格 选项问题
        const tableItem = $(".pc-db-item-table");
        for (let i = 0; i < tableItem.length; i++) {
            if ($(tableItem[i]).width() < $(tableItem[i]).children(".pc-db-table").width()) {
                $(tableItem[i]).css("overflow", "scroll");
                $(tableItem[i]).find(".layui-anim.layui-anim-upbit").css("position", "unset");
            } else {
                $(tableItem[i]).css("overflow", "visible");
            }
        }
    });

    // 取消 HFNC失败 初始值 按钮 点击事件
    $("#PC-db-initialHFNC>.layui-form-switch, #PC-db-IHFNCF>.layui-form-switch, #PC-db-RSMAHFNC>.pc-db-radioBtn-group>li").off("click");

    // 取消 无创通气失败 初始值 按钮 点击事件
    $("#PC-db-initialNIV>.layui-form-switch, #PC-db-INIVF>.layui-form-switch, #PC-db-SNIVM>.pc-db-radioBtn-group>li, #PC-db-RSMANIV>.pc-db-radioBtn-group>li").off("click");

    // 取消 撤机失败 初始值 单选按钮组 点击事件
    $("#PC-db-invasiveVentilation>.layui-form-switch").off("click");
    const ivNum = $(".pc-db-BDRTSWSS .ivNum").length;
    for (let i = 1; i <= ivNum; i++) {
        $("#PC-db-IV" + i + "M>.pc-db-radioBtn-group>li, #PC-db-IV" + i + "WS>.layui-form-switch").off("click");
    }
});