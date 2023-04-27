function ocdHeight(lr) {
    const ocdHeight = $("#PC-db-" + lr + "OCD>.pc-db-item-checkbox").height();
    if (ocdHeight > 32) {
        $("#PC-db-" + lr + "OCD").height(ocdHeight);
        $("#PC-db-" + lr + "OCD>.pc-db-item-checkbox>.layui-form-checkbox").css("margin-bottom", "10px");
    }
}
function computeTreatmentTimes() {
    const letLength = $(".pc-db-BDRPSS .pc-db-table>tbody>tr.let").length,
        retLength = $(".pc-db-BDRPSS .pc-db-table>tbody>tr.ret").length;
    $("#PC-db-TN").val(letLength + retLength);
}
function computeIntervals() {
    const trList = $(".pc-db-BDRPSS .pc-db-table>tbody>tr"),
        length = trList.length - 1;
    let index = [], screeningDate = [], screeningDateStamp = [];
    for (let i = 0; i < length; i ++) {
        screeningDate[i] = $(trList[i]).find(".pc-db-sd").val();
        if (notNullTool(screeningDate[i])) {
            screeningDateStamp[i] = Date.parse(screeningDate[i]);
            index[i] = i;
        }
    }
    for (let i = length - 1; i > 0; i--) {
        for (let j = 0; j < i; j++) {
            if (screeningDateStamp[j] > screeningDateStamp[j + 1]) {
                [screeningDateStamp[j], screeningDateStamp[j + 1]] = [screeningDateStamp[j + 1], screeningDateStamp[j]];
                [index[j], index[j + 1]] = [index[j + 1], index[j]];
            }
        }
    }
    for (let i = 1; i < length; i ++) {
        $(trList[index[i]]).find(".pc-db-interval").val((screeningDateStamp[i] - screeningDateStamp[i - 1])/86400000);
    }
}
$(document).ready(function () {
    // 设置 多行 多选框 高度
    ocdHeight("L");
    ocdHeight("R");

    // 引入 layui
    layui.use(["element", "form", "laydate"], function () {
        let form = layui.form,
            laydate = layui.laydate;

        // 基础数据库 循环系统
        if ($(".pc-db-BDCS").length > 0) {
            // PPHN 开关
            form.on("switch(PPHN)", function (data) {
                if (data.elem.checked) {
                    $("#PC-db-PPHNDD, #PC-db-HFO2").removeAttr("disabled").attr("lay-verify", "requiredDB").attr("name", function () {
                        return $(this).attr("data-name");
                    });
                } else {
                    $("#PC-db-PPHNDD, #PC-db-HFO2").removeAttr("name lay-verify").attr("disabled", true).val("");
                }
            });
            // PPHN 诊断日期
            laydate.render({
                elem: "#PC-db-PPHNDD",
                type: "date",
                format: "yyyy-MM-dd",
                max: 0
            });

            // 超声时间
            laydate.render({
                elem: "#PC-db-UT",
                type: "datetime",
                format: "yyyy-MM-dd HH:mm:ss",
                max: 0
            });

            // 西地那非 开关
            form.on("switch(sildenafil)", function (data) {
                if (data.elem.checked) {
                    $("#PC-db-SST, #PC-db-SET").removeAttr("disabled").attr("lay-verify", "requiredDB").attr("name", function () {
                        return $(this).attr("data-name");
                    });
                } else {
                    $("#PC-db-SST, #PC-db-SET").removeAttr("name lay-verify").attr("disabled", true).val("");
                }
            });
            // 西地那非 开始时间、结束时间
            let sildenafilStartTime, sildenafilEndTime, sildenafilStartTimeStamp = 0, sildenafilEndTimeStamp = 0;
            laydate.render({
                elem: "#PC-db-SST",
                type: "datetime",
                format: "yyyy-MM-dd HH:mm:ss",
                max: 1,
                done: function (value, date) {
                    if (value !== "") {
                        sildenafilStartTime = date.year + "-" + date.month + "-" + date.date + ' ' + date.hours + ':' + date.minutes + ':' + date.seconds;
                        sildenafilStartTimeStamp = Date.parse(sildenafilStartTime);
                        if (notNullTool(sildenafilEndTime)) {
                            if (sildenafilStartTimeStamp > sildenafilEndTimeStamp) {
                                layer.msg("开始时间必须<span class='layui-badge'>早于</span>结束时间！", {
                                    icon: 5,
                                    time: 1000,
                                    anim: 6,
                                    btn: "好",
                                    resize: false,
                                    shade: 0.8
                                }, function () {
                                    $("#PC-db-SST").val("");
                                    sildenafilStartTime = null;
                                    sildenafilStartTimeStamp = 0;
                                });
                            }
                        }
                    } else {
                        sildenafilStartTime = null;
                        sildenafilStartTimeStamp = 0;
                    }
                }
            });
            laydate.render({
                elem: "#PC-db-SET",
                type: "datetime",
                format: "yyyy-MM-dd HH:mm:ss",
                max: 1,
                done: function (value, date) {
                    if (value !== "") {
                        sildenafilEndTime = date.year + "-" + date.month + "-" + date.date + ' ' + date.hours + ':' + date.minutes + ':' + date.seconds;
                        sildenafilEndTimeStamp = Date.parse(sildenafilEndTime);
                        if (notNullTool(sildenafilStartTime)) {
                            if (sildenafilStartTimeStamp > sildenafilEndTimeStamp) {
                                layer.msg("结束时间必须<span class='layui-badge'>晚于</span>开始时间！", {
                                    icon: 5,
                                    time: 1000,
                                    anim: 6,
                                    btn: "好",
                                    resize: false,
                                    shade: 0.8
                                }, function () {
                                    $("#PC-db-SET").val("");
                                    sildenafilEndTime = null;
                                    sildenafilEndTimeStamp = 0;
                                });
                            }
                        }
                    } else {
                        sildenafilEndTime = null;
                        sildenafilEndTimeStamp = 0;
                    }
                }
            });

            // NO吸入 开关
            form.on("switch(NOI)", function (data) {
                if (data.elem.checked) {
                    $("#PC-db-NOIST, #PC-db-NOIET, #PC-db-MH").removeAttr("disabled").attr("lay-verify", "requiredDB").attr("name", function () {
                        return $(this).attr("data-name");
                    });
                    $("#PC-db-ME>input, #PC-db-ABCF>input").removeAttr("disabled");
                    setTimeout(function () {
                        form.render("checkbox");
                    }, 200);
                } else {
                    $("#PC-db-NOIST, #PC-db-NOIET, #PC-db-MH").removeAttr("name lay-verify").attr("disabled", true).val("");
                    $("#PC-db-ME>input, #PC-db-ABCF>input").attr("disabled", true);

                    setTimeout(function () {
                        form.val("BDCS", {
                            methemoglobin: false,
                            abnormalBloodClottingFunction: false
                        });
                    }, 200);
                }
            });
            // NO吸入 开始时间、结束时间
            let noInhalationStartTime, noInhalationEndTime, noInhalationStartTimeStamp = 0,
                noInhalationEndTimeStamp = 0;
            laydate.render({
                elem: "#PC-db-NOIST",
                type: "datetime",
                format: "yyyy-MM-dd HH:mm:ss",
                max: 1,
                done: function (value, date) {
                    if (value !== "") {
                        noInhalationStartTime = date.year + "-" + date.month + "-" + date.date + ' ' + date.hours + ':' + date.minutes + ':' + date.seconds;
                        noInhalationStartTimeStamp = Date.parse(noInhalationStartTime);
                        if (notNullTool(noInhalationEndTime)) {
                            if (noInhalationStartTimeStamp > noInhalationEndTimeStamp) {
                                layer.msg("开始时间必须<span class='layui-badge'>早于</span>结束时间！", {
                                    icon: 5,
                                    time: 1000,
                                    anim: 6,
                                    btn: "好",
                                    resize: false,
                                    shade: 0.8
                                }, function () {
                                    $("#PC-db-SST").val("");
                                    noInhalationStartTime = null;
                                    noInhalationStartTimeStamp = 0;
                                });
                            }
                        }
                    } else {
                        noInhalationStartTime = null;
                        noInhalationStartTimeStamp = 0;
                    }
                }
            });
            laydate.render({
                elem: "#PC-db-NOIET",
                type: "datetime",
                format: "yyyy-MM-dd HH:mm:ss",
                max: 1,
                done: function (value, date) {
                    if (value !== "") {
                        noInhalationEndTime = date.year + "-" + date.month + "-" + date.date + ' ' + date.hours + ':' + date.minutes + ':' + date.seconds;
                        noInhalationEndTimeStamp = Date.parse(noInhalationEndTime);
                        if (notNullTool(noInhalationStartTime)) {
                            if (noInhalationStartTimeStamp > noInhalationEndTimeStamp) {
                                layer.msg("结束时间必须<span class='layui-badge'>晚于</span>开始时间！", {
                                    icon: 5,
                                    time: 1000,
                                    anim: 6,
                                    btn: "好",
                                    resize: false,
                                    shade: 0.8
                                }, function () {
                                    $("#PC-db-NOIET").val("");
                                    noInhalationEndTime = null;
                                    noInhalationEndTimeStamp = 0;
                                });
                            }
                        }
                    } else {
                        noInhalationEndTime = null;
                        noInhalationEndTimeStamp = 0;
                    }
                }
            });

            // 心律失常 开关
            form.on("switch(arrhythmia)", function (data) {
                if (data.elem.checked) {
                    $("#PC-db-ADD").removeAttr("disabled").attr("lay-verify", "requiredDB").attr("name", function () {
                        return $(this).attr("data-name");
                    });
                } else {
                    $("#PC-db-ADD").removeAttr("name lay-verify").attr("disabled", true).val("");
                }
            });
            // 心律失常 诊断日期
            laydate.render({
                elem: "#PC-db-ADD",
                type: "date",
                format: "yyyy-MM-dd",
                max: 0
            });

            // 休克 开关
            form.on("switch(shock)", function (data) {
                if (data.elem.checked) {
                    $("#PC-db-SDD").removeAttr("disabled").attr("lay-verify", "requiredDB").attr("name", function () {
                        return $(this).attr("data-name");
                    });
                } else {
                    $("#PC-db-SDD").removeAttr("name lay-verify").attr("disabled", true).val("");
                }
            });
            // 休克 诊断日期
            laydate.render({
                elem: "#PC-db-SDD",
                type: "date",
                format: "yyyy-MM-dd",
                max: 0
            });

            // 心力衰竭 开关
            form.on("switch(HF)", function (data) {
                if (data.elem.checked) {
                    $("#PC-db-HFDD").removeAttr("disabled").attr("lay-verify", "requiredDB").attr("name", function () {
                        return $(this).attr("data-name");
                    });
                } else {
                    $("#PC-db-HFDD").removeAttr("name lay-verify").attr("disabled", true).val("");
                }
            });
            // 心力衰竭 诊断日期
            laydate.render({
                elem: "#PC-db-HFDD",
                type: "date",
                format: "yyyy-MM-dd",
                max: 0
            });

            // 缺血缺氧性心肌损害 开关
            form.on("switch(IHMD)", function (data) {
                if (data.elem.checked) {
                    $("#PC-db-IHMDDD").removeAttr("disabled").attr("lay-verify", "requiredDB").attr("name", function () {
                        return $(this).attr("data-name");
                    });
                } else {
                    $("#PC-db-IHMDDD").removeAttr("name lay-verify").attr("disabled", true).val("");
                }
            });
            // 缺血缺氧性心肌损害 诊断日期
            laydate.render({
                elem: "#PC-db-IHMDDD",
                type: "date",
                format: "yyyy-MM-dd",
                max: 0
            });

            // 动脉导管未闭 超声
            const pdaChecked = $("#PC-db-PDA").attr("checked");
            if (notNullTool(pdaChecked)) {
                $("#PC-db-PDAUT").show();
            }
            form.on("switch(PDAU)", function (data) {
                if (data.elem.checked) {
                    $("#PC-db-PDAUT>.pc-db-table").removeClass("pc-db-table-off");
                    $("#PC-db-PDAUT>.pc-db-table>tbody>tr button").removeAttr("disabled");
                } else {
                    $("#PC-db-PDAUT>.pc-db-table").addClass("pc-db-table-off");
                    $("#PC-db-PDAUT>.pc-db-table>tbody>tr button").attr("disabled", true);
                    $("#PC-db-PDAUT>.pc-db-table>tbody>tr:not(:last-of-type)").remove();
                    $(".pc-db-BDCS #PC-db-PDAUN").val(0);
                }
            });

            let pdaUIndex = 0;
            // 获取 PDA 超声 表格长度 初始值
            const pdaUIndexInput = $(".pc-db-BDCS #PC-db-PDAUT>.pc-db-table>tbody").attr("data-num");
            if (notNullTool(pdaUIndexInput)) {
                pdaUIndex = parseInt(pdaUIndexInput);
                // 为 日期 选择 初始化
                for (let i = 1; i <= pdaUIndex; i++) {
                    const thisPdaUIndex = i;
                    // 为 日期 初始化
                    laydate.render({
                        elem: "#PC-db-UT" + thisPdaUIndex,
                        type: "datetime",
                        format: "yyyy-MM-dd HH:mm:ss",
                        max: 1
                    });
                    // 删除 PDA超声 行
                    $("#PC-db-pdaUDelete" + thisPdaUIndex).on("click", function () {
                        const that = this;
                        layer.msg("确定要 <span class='pc-db-status-color-no'>删除</span> 此条超声结果吗?", {
                            icon: 7,
                            time: 0,
                            anim: 6,
                            btn: ["确定", "取消"],
                            resize: false,
                            shade: 0.8,
                            yes: function (index) {
                                $(that).parents("tr").remove();
                                $(".pc-db-BDCS #PC-db-PDAUN").val($("#PC-db-PDAUT>.pc-db-table>tbody>tr").length - 1);
                                layer.close(index);
                            }
                        });
                    });
                }
            }
            // 增加 PDA 超声
            $("#PC-db-addPDAU").on("click", function () {
                const that = this;
                pdaUIndex++;
                sequentialExecution(function () {
                    $(that).parents("tr").before(
                        "<tr>" +
                        "   <td>" +
                        "       <input id='PC-db-UT" + pdaUIndex + "' type='text' name='ultrasoundTime" + pdaUIndex + "' lay-verify='required' placeholder='请选择超声时间' lay-reqText='请选择超声时间！' readonly>" +
                        "   </td>" +
                        "   <td>" +
                        "       <input id='PC-db-UR" + pdaUIndex + "' type='text' name='ultrasoundResult" + pdaUIndex + "' lay-verify='required' placeholder='请填写超声结果' lay-reqText='请填写超声结果！'>" +
                        "   </td>" +
                        "   <td>" +
                        "       <input id='PC-db-ACID" + pdaUIndex + "' type='number' name='arterialCatheterInnerDiameter" + pdaUIndex + "' lay-verify='required' placeholder='请填写动脉导管内径' lay-reqText='请填写动脉导管内径！'>" +
                        "   </td>" +
                        "   <td>" +
                        "       <input id='PC-db-LAOAID" + pdaUIndex + "' type='number' name='leftAtriumOrAortaInnerDiameter" + pdaUIndex + "' lay-verify='required' placeholder='请填写左房内径/主动脉内径' lay-reqText='请填写左房内径/主动脉内径！'>" +
                        "   </td>" +
                        "   <td>" +
                        "       <select name='pulmonaryValveDiastolicRegurgitation" + pdaUIndex + "' lay-reqText='请选择肺动脉瓣舒张期是否反流！' lay-verify='required'>" +
                        "           <option value=''>请选择肺动脉瓣舒张期是否反流</option>" +
                        "           <option value='是'>是</option>" +
                        "           <option value='否'>否</option>" +
                        "       </select>" +
                        "   </td>" +
                        "   <td>" +
                        "       <select name='mainlyDivertFromLeftToRight" + pdaUIndex + "' lay-reqText='请选择是否以左向右分流为主！' lay-verify='required'>" +
                        "           <option value=''>请选择是否以左向右分流为主</option>" +
                        "           <option value='是'>是</option>" +
                        "           <option value='否'>否</option>" +
                        "       </select>" +
                        "   </td>" +
                        "   <td>" +
                        "       <button id='PC-db-pdaUDelete" + pdaUIndex + "' class='pc-btn pc-btn-danger'><i class='iconfont icon-delete'></i></button>" +
                        "   </td>" +
                        "</tr>");
                }, function () {
                    form.render("select");
                    const thisPdaUIndex = pdaUIndex;
                    laydate.render({
                        elem: "#PC-db-UT" + thisPdaUIndex,
                        type: "datetime",
                        format: "yyyy-MM-dd HH:mm:ss",
                        max: 1
                    });
                    // PDA超声 次数
                    $(".pc-db-BDCS #PC-db-PDAUN").val($("#PC-db-PDAUT>.pc-db-table>tbody>tr").length - 1);
                    // 删除 PDA超声 行
                    $("#PC-db-pdaUDelete" + thisPdaUIndex).on("click", function () {
                        const that = this;
                        layer.msg("确定要 <span class='pc-db-status-color-no'>删除</span> 此条超声结果吗?", {
                            icon: 7,
                            time: 0,
                            anim: 6,
                            btn: ["确定", "取消"],
                            resize: false,
                            shade: 0.8,
                            yes: function (index) {
                                $(that).parents("tr").remove();
                                $(".pc-db-BDCS #PC-db-PDAUN").val($("#PC-db-PDAUT>.pc-db-table>tbody>tr").length - 1);
                                layer.close(index);
                            }
                        });
                    });
                });
            });

            // PDA 治疗 开关
            const pdaTChecked = $("#PC-db-PDAT").attr("checked");
            if (notNullTool(pdaTChecked)) {
                $("#PC-db-PDATT").show();
            }
            form.on("switch(PDAT)", function (data) {
                if (data.elem.checked) {
                    $("#PC-db-PDASL, #PC-db-PDAIB, #PC-db-PDACAT").removeAttr("disabled");
                    form.render("checkbox");
                    $("#PC-db-PDATT>.pc-db-table").removeClass("pc-db-table-off");
                    $("#PC-db-PDATT>.pc-db-table>tbody>tr button").removeAttr("disabled");
                } else {
                    $("#PC-db-PDASL, #PC-db-PDAIB, #PC-db-PDACAT").attr("disabled", true);
                    form.render("checkbox");
                    $("#PC-db-PDATT>.pc-db-table>tbody>tr:not(:last-of-type)").remove();
                    $("#PC-db-PDATT>.pc-db-table").addClass("pc-db-table-off");
                    $("#PC-db-PDATT>.pc-db-table>tbody>tr button").attr("disabled", true);
                    $(".pc-db-BDCS #PC-db-PDATN").val(0);
                }
            });

            let pdaIndex = 0, pdaStartTime = [], pdaEndTime = [], pdaStartTimeStamp = [0], pdaEndTimeStamp = [0];
            // 获取 PDA 治疗 表格长度 初始值
            const pdaIndexInput = $(".pc-db-BDCS #PC-db-PDATT>.pc-db-table>tbody").attr("data-num");
            if (notNullTool(pdaIndexInput)) {
                pdaIndex = parseInt(pdaIndexInput);
                // 为 日期 选择 初始化
                for (let i = 1; i <= pdaIndex; i++) {
                    const thisPdaIndex = i;
                    // 为 日期 初始化
                    laydate.render({
                        elem: "#PC-db-PDAST" + thisPdaIndex,
                        type: "datetime",
                        format: "yyyy-MM-dd HH:mm:ss",
                        max: 1,
                        done: function (value, date) {
                            if (value !== "") {
                                pdaStartTime[thisPdaIndex] = date.year + "-" + date.month + "-" + date.date + ' ' + date.hours + ':' + date.minutes + ':' + date.seconds;
                                pdaStartTimeStamp[thisPdaIndex] = Date.parse(pdaStartTime[thisPdaIndex]);
                                if (notNullTool(pdaEndTime[thisPdaIndex])) {
                                    if (pdaStartTimeStamp[thisPdaIndex] > pdaEndTimeStamp[thisPdaIndex]) {
                                        layer.msg("开始时间必须<span class='layui-badge'>早于</span>结束时间！", {
                                            icon: 5,
                                            time: 1000,
                                            anim: 6,
                                            btn: "好",
                                            resize: false,
                                            shade: 0.8
                                        }, function () {
                                            $("#PC-db-PDAST" + thisPdaIndex).val("");
                                            pdaStartTime[thisPdaIndex] = null;
                                            pdaStartTimeStamp[thisPdaIndex] = 0;
                                        });
                                    }
                                }
                            } else {
                                pdaStartTime[thisPdaIndex] = null;
                                pdaStartTimeStamp[thisPdaIndex] = 0;
                            }
                        }
                    });
                    laydate.render({
                        elem: "#PC-db-PDAET" + thisPdaIndex,
                        type: "datetime",
                        format: "yyyy-MM-dd HH:mm:ss",
                        max: 1,
                        done: function (value, date) {
                            if (value !== "") {
                                pdaEndTime[thisPdaIndex] = date.year + "-" + date.month + "-" + date.date + ' ' + date.hours + ':' + date.minutes + ':' + date.seconds;
                                pdaEndTimeStamp[thisPdaIndex] = Date.parse(pdaEndTime[thisPdaIndex]);
                                if (notNullTool(pdaStartTime[thisPdaIndex])) {
                                    if (pdaStartTimeStamp[thisPdaIndex] > pdaEndTimeStamp[thisPdaIndex]) {
                                        layer.msg("结果时间必须<span class='layui-badge'>晚于</span>检查时间！", {
                                            icon: 5,
                                            time: 1000,
                                            anim: 6,
                                            btn: "好",
                                            resize: false,
                                            shade: 0.8
                                        }, function () {
                                            $("#PC-db-PDAET" + thisPdaIndex).val("");
                                            pdaEndTime[thisPdaIndex] = null;
                                            pdaEndTimeStamp[thisPdaIndex] = 0;
                                        });
                                    }
                                }
                            } else {
                                pdaEndTime[thisPdaIndex] = null;
                                pdaEndTimeStamp[thisPdaIndex] = 0;
                            }
                        }
                    });
                    // 删除 PDA治疗 行
                    $("#PC-db-pdaTDelete" + thisPdaIndex).on("click", function () {
                        const that = this;
                        layer.msg("确定要 <span class='pc-db-status-color-no'>删除</span> 此条PDA治疗信息吗?", {
                            icon: 7,
                            time: 0,
                            anim: 6,
                            btn: ["确定", "取消"],
                            resize: false,
                            shade: 0.8,
                            yes: function (index) {
                                sequentialExecution(function () {
                                    $(that).parents("tr").remove();
                                    $(".pc-db-BDCS #PC-db-PDATN").val($(".pc-db-BDCS .pc-db-item-table .pc-db-table tbody>tr").length - 1);
                                    layer.close(index);
                                });
                            }
                        });
                    });
                }
            }
            // 增加 PDA治疗
            $("#PC-db-addPDAT").on("click", function () {
                const that = this;
                pdaIndex++;
                sequentialExecution(function () {
                    $(that).parents("tr").before(
                        "<tr>" +
                        "   <td>" +
                        "       <select name='pdaName" + pdaIndex + "' lay-reqText='请选择名称！' lay-verify='required'>" +
                        "           <option value=''>请选择名称</option>" +
                        "           <option value='布洛芬'>布洛芬</option>" +
                        "           <option value='对乙酰氨基酚'>对乙酰氨基酚</option>" +
                        "           <option value='吲哚美辛'>吲哚美辛</option>" +
                        "           <option value='手术'>手术</option>" +
                        "       </select>" +
                        "   </td>" +
                        "   <td>" +
                        "       <select name='pdaMedicationRoute" + pdaIndex + "' lay-reqText='请选择用药途径！' lay-verify='required'>" +
                        "           <option value=''>请选择用药途径</option>" +
                        "           <option value='静脉'>静脉</option>" +
                        "           <option value='口服'>口服</option>" +
                        "       </select>" +
                        "   </td>" +
                        "   <td>" +
                        "       <input id='PC-db-PDAST" + pdaIndex + "' type='text' name='pdaStartTime" + pdaIndex + "' lay-verify='required' placeholder='请选择开始时间' lay-reqText='请选择开始时间！' readonly>" +
                        "   </td>" +
                        "   <td>" +
                        "       <input id='PC-db-PDAET" + pdaIndex + "' type='text' name='pdaEndTime" + pdaIndex + "' lay-verify='required' placeholder='请选择结束时间' lay-reqText='请选择结束时间！' readonly>" +
                        "   </td>" +
                        "   <td>" +
                        "       <input type='text' name='pdaTreatmentCourse" + pdaIndex + "' lay-verify='required' placeholder='请输入疗程' lay-reqText='请输入疗程！'>" +
                        "   </td>" +
                        "   <td>" +
                        "       <select name='isPdaClosesAfterTreatment" + pdaIndex + "' lay-reqText='请选择治疗后PDA是否关闭！' lay-verify='required'>" +
                        "           <option value=''>请选择请选择治疗后PDA是否关闭</option>" +
                        "           <option value='是'>是</option>" +
                        "           <option value='否'>否</option>" +
                        "       </select>" +
                        "   </td>" +
                        "   <td>" +
                        "       <button id='PC-db-pdaTDelete" + pdaIndex + "' class='pc-btn pc-btn-danger'><i class='iconfont icon-delete'></i></button>" +
                        "   </td>" +
                        "</tr>");
                }, function () {
                    form.render("select");
                    const thisPdaIndex = pdaIndex;
                    laydate.render({
                        elem: "#PC-db-PDAST" + thisPdaIndex,
                        type: "datetime",
                        format: "yyyy-MM-dd HH:mm:ss",
                        max: 1,
                        done: function (value, date) {
                            if (value !== "") {
                                pdaStartTime[thisPdaIndex] = date.year + "-" + date.month + "-" + date.date + ' ' + date.hours + ':' + date.minutes + ':' + date.seconds;
                                pdaStartTimeStamp[thisPdaIndex] = Date.parse(pdaStartTime[thisPdaIndex]);
                                if (notNullTool(pdaEndTime[thisPdaIndex])) {
                                    if (pdaStartTimeStamp[thisPdaIndex] > pdaEndTimeStamp[thisPdaIndex]) {
                                        layer.msg("开始时间必须<span class='layui-badge'>早于</span>结束时间！", {
                                            icon: 5,
                                            time: 1000,
                                            anim: 6,
                                            btn: "好",
                                            resize: false,
                                            shade: 0.8
                                        }, function () {
                                            $("#PC-db-PDAST" + thisPdaIndex).val("");
                                            pdaStartTime[thisPdaIndex] = null;
                                            pdaStartTimeStamp[thisPdaIndex] = 0;
                                        });
                                    }
                                }
                            } else {
                                pdaStartTime[thisPdaIndex] = null;
                                pdaStartTimeStamp[thisPdaIndex] = 0;
                            }
                        }
                    });
                    laydate.render({
                        elem: "#PC-db-PDAET" + thisPdaIndex,
                        type: "datetime",
                        format: "yyyy-MM-dd HH:mm:ss",
                        max: 1,
                        done: function (value, date) {
                            if (value !== "") {
                                pdaEndTime[thisPdaIndex] = date.year + "-" + date.month + "-" + date.date + ' ' + date.hours + ':' + date.minutes + ':' + date.seconds;
                                pdaEndTimeStamp[thisPdaIndex] = Date.parse(pdaEndTime[thisPdaIndex]);
                                if (notNullTool(pdaStartTime[thisPdaIndex])) {
                                    if (pdaStartTimeStamp[thisPdaIndex] > pdaEndTimeStamp[thisPdaIndex]) {
                                        layer.msg("结果时间必须<span class='layui-badge'>晚于</span>检查时间！", {
                                            icon: 5,
                                            time: 1000,
                                            anim: 6,
                                            btn: "好",
                                            resize: false,
                                            shade: 0.8
                                        }, function () {
                                            $("#PC-db-PDAET" + thisPdaIndex).val("");
                                            pdaEndTime[thisPdaIndex] = null;
                                            pdaEndTimeStamp[thisPdaIndex] = 0;
                                        });
                                    }
                                }
                            } else {
                                pdaEndTime[thisPdaIndex] = null;
                                pdaEndTimeStamp[thisPdaIndex] = 0;
                            }
                        }
                    });
                    // PDA治疗 次数
                    $(".pc-db-BDCS #PC-db-PDATN").val($("#PC-db-PDATT>.pc-db-table>tbody>tr").length - 1);
                    // 删除 PDA治疗 行
                    $("#PC-db-pdaTDelete" + thisPdaIndex).on("click", function () {
                        const that = this;
                        layer.msg("确定要 <span class='pc-db-status-color-no'>删除</span> 此条PDA治疗信息吗?", {
                            icon: 7,
                            time: 0,
                            anim: 6,
                            btn: ["确定", "取消"],
                            resize: false,
                            shade: 0.8,
                            yes: function (index) {
                                sequentialExecution(function () {
                                    $(that).parents("tr").remove();
                                    $(".pc-db-BDCS #PC-db-PDATN").val($("#PC-db-PDATT>.pc-db-table>tbody>tr").length - 1);
                                    layer.close(index);
                                });
                            }
                        });
                    });
                });
            });

            // 基础数据库 循环系统 添加/编辑 信息 提交
            form.on("submit(CS)", function (data) {
                const doing = "保存信息";
                loading(doing);
                let field = data.field, pdaUArray = [], pdaArray = [];
                for (let i = 1; i <= pdaUIndex; i++) {
                    if (field["ultrasoundTime" + i] !== undefined) {
                        pdaUArray.push({
                            ultrasoundTime: field["ultrasoundTime" + i],
                            ultrasoundResult: field["ultrasoundResult" + i],
                            arterialCatheterInnerDiameter: field["arterialCatheterInnerDiameter" + i],
                            leftAtriumOrAortaInnerDiameter: field["leftAtriumOrAortaInnerDiameter" + i],
                            pulmonaryValveDiastolicRegurgitation: field["pulmonaryValveDiastolicRegurgitation" + i],
                            mainlyDivertFromLeftToRight: field["mainlyDivertFromLeftToRight" + i]
                        });
                        delete field["ultrasoundTime" + i];
                        delete field["ultrasoundResult" + i];
                        delete field["arterialCatheterInnerDiameter" + i];
                        delete field["leftAtriumOrAortaInnerDiameter" + i];
                        delete field["pulmonaryValveDiastolicRegurgitation" + i];
                        delete field["mainlyDivertFromLeftToRight" + i];
                    }
                }
                field.pdaUArray = JSON.stringify(pdaUArray);
                for (let i = 1; i <= pdaIndex; i++) {
                    if (field["pdaName" + i] !== undefined) {
                        pdaArray.push({
                            pdaName: field["pdaName" + i],
                            pdaMedicationRoute: field["pdaMedicationRoute" + i],
                            pdaStartTime: field["pdaStartTime" + i],
                            pdaEndTime: field["pdaEndTime" + i],
                            pdaTreatmentCourse: field["pdaTreatmentCourse" + i],
                            isPdaClosesAfterTreatment: field["isPdaClosesAfterTreatment" + i]
                        });
                        delete field["pdaName" + i];
                        delete field["pdaMedicationRoute" + i];
                        delete field["pdaStartTime" + i];
                        delete field["pdaEndTime" + i];
                        delete field["pdaTreatmentCourse" + i];
                        delete field["isPdaClosesAfterTreatment" + i];
                    }
                }
                field.pdaArray = JSON.stringify(pdaArray);
                $.post("/perinatalPlatform/basicDatabase/write/CS/post", field, function (back, status) {
                    if (status === "success") {
                        if (back.code) {
                            successNext();
                        } else {
                            failMsg(doing)
                        }
                    } else {errorMsg1()}
                }, "json").fail(function () {errorMsg2()});
            });
        }

        // 基础数据库 视网膜病 筛选情况
        const rpSsElem = $(".pc-db-BDRPSS");
        if ($(rpSsElem).length > 0) {
            // 获取 出生日期
            const birthdayString = $(rpSsElem).attr("data-birthday"),
                gaWeekString = $(rpSsElem).attr("data-gaWeek"),
                gaDayString = $(rpSsElem).attr("data-gaDay");
            let birthdayStamp = 0, gaWeek = 0;
            if (notNullTool(birthdayString) && notNullTool(gaWeekString) && notNullTool(gaDayString)) {
                birthdayStamp = Date.parse(birthdayString);
                gaWeek = parseInt(gaWeekString);
                const afterBirth4WeekDateStamp = birthdayStamp + 4*7*86400000,
                    afterBirth4WeekDate = new Date(afterBirth4WeekDateStamp),
                    afterBirth4WeekDateString = dateFormatDay(afterBirth4WeekDate),
                    afterBirth6WeekDateStamp = birthdayStamp + 6*7*86400000,
                    afterBirth6WeekDate = new Date(afterBirth6WeekDateStamp),
                    afterBirth6WeekDateString = dateFormatDay(afterBirth6WeekDate),
                    gaDay = parseInt(gaDayString),
                    afterBirth4WeekGA = gaWeek + 4,
                    afterBirth6WeekGA = gaWeek + 6;
                $("#PC-db-FSD4WAB").val(afterBirth4WeekDateString);
                $("#PC-db-CGA4WABW").val(afterBirth4WeekGA);
                $("#PC-db-CGA4WABD").val(gaDay);
                $("#PC-db-FSD6WAB").val(afterBirth6WeekDateString);
                $("#PC-db-CGA6WABW").val(afterBirth6WeekGA);
                $("#PC-db-CGA6WABD").val(gaDay);
            }

            $("#PC-db-WNROPS .layui-form-switch").off("click");
            // 增加 ROP筛查
            let ssIndex = 0;
            $("#PC-db-addRPSS").on("click", function () {
                const that = this;
                ssIndex ++;
                sequentialExecution(function () {
                    $(that).parents("tr").before(
                        "<tr>" +
                        "   <td>" +
                        "       <input id='PC-db-SD" + ssIndex + "' class='pc-db-sd' type='text' name='screeningDate" + ssIndex + "' lay-verify='required' placeholder='请选择筛查日期' lay-reqText='请选择筛查日期！' readonly>" +
                        "   </td>" +
                        "   <td>" +
                        "       <input id='PC-db-TAB" + ssIndex + "' type='number' name='timeAfterBirth" + ssIndex + "' lay-verify='required' readonly>" +
                        "   </td>" +
                        "   <td>" +
                        "       <div class='layui-row ga'>" +
                        "           <div class='layui-col-xs6'>" +
                        "               <input id='PC-db-CGAW" + ssIndex + "' type='number' name='correctGestationalAgeWeek" + ssIndex + "' lay-verify='required' readonly>" +
                        "               <span>周</span>" +
                        "           </div>" +
                        "           <div class='layui-col-xs6'>" +
                        "               <input id='PC-db-CGAD" + ssIndex + "' type='number' name='correctGestationalAgeDay" + ssIndex + "' lay-verify='required' readonly>" +
                        "               <span>日</span>" +
                        "           </div>" +
                        "       </div>" +
                        "   </td>" +
                        "   <td>" +
                        "       <input class='pc-db-interval' type='number' name='interval" + ssIndex + "' readonly>" +
                        "   </td>" +
                        "   <td>" +
                        "       <select name='leftEyeStaging" + ssIndex + "' lay-reqText='请选择左眼分期！' lay-verify='required'>" +
                        "           <option value=''>请选择左眼分期</option>" +
                        "           <option value='无'>无</option>" +
                        "           <option value='1'>1</option>" +
                        "           <option value='2'>2</option>" +
                        "           <option value='3'>3</option>" +
                        "           <option value='4'>4</option>" +
                        "           <option value='5'>5</option>" +
                        "       </select>" +
                        "   </td>" +
                        "   <td>" +
                        "       <select name='leftEyeZone" + ssIndex + "' lay-reqText='请选择左眼分区！' lay-verify='required'>" +
                        "           <option value=''>请选择左眼分区</option>" +
                        "           <option value='1'>1</option>" +
                        "           <option value='2'>2</option>" +
                        "           <option value='3'>3</option>" +
                        "           <option value='NA'>NA</option>" +
                        "       </select>" +
                        "   </td>" +
                        "   <td>" +
                        "       <select name='leftEyePlus" + ssIndex + "' lay-reqText='请选择左眼plus！' lay-verify='required'>" +
                        "           <option value=''>请选择左眼plus</option>" +
                        "           <option value='无'>无</option>" +
                        "           <option value='有'>有</option>" +
                        "           <option value='不适应'>不适应</option>" +
                        "       </select>" +
                        "   </td>" +
                        "   <td>" +
                        "       <select name='leftEyeApRop" + ssIndex + "' lay-reqText='请选择左眼AP-ROP！' lay-verify='required'>" +
                        "           <option value=''>请选择左眼AP-ROP</option>" +
                        "           <option value='无'>无</option>" +
                        "           <option value='有'>有</option>" +
                        "       </select>" +
                        "   </td>" +
                        "   <td>" +
                        "       <select name='leftEyeTreatment" + ssIndex + "' lay-filter='LET' lay-reqText='请选择左眼治疗！' lay-verify='required'>" +
                        "           <option value=''>请选择左眼治疗</option>" +
                        "           <option value='无'>无</option>" +
                        "           <option value='激光'>激光</option>" +
                        "           <option value='玻璃体注药术'>玻璃体注药术</option>" +
                        "           <option value='视网膜剥离术'>视网膜剥离术</option>" +
                        "       </select>" +
                        "   </td>" +
                        "   <td>" +
                        "       <select name='rightEyeStaging" + ssIndex + "' lay-reqText='请选择右眼分期！' lay-verify='required'>" +
                        "           <option value=''>请选择右眼分期</option>" +
                        "           <option value='无'>无</option>" +
                        "           <option value='1'>1</option>" +
                        "           <option value='2'>2</option>" +
                        "           <option value='3'>3</option>" +
                        "           <option value='4'>4</option>" +
                        "           <option value='5'>5</option>" +
                        "       </select>" +
                        "   </td>" +
                        "   <td>" +
                        "       <select name='rightEyeZone" + ssIndex + "' lay-reqText='请选择右眼分区！' lay-verify='required'>" +
                        "           <option value=''>请选择右眼分区</option>" +
                        "           <option value='1'>1</option>" +
                        "           <option value='2'>2</option>" +
                        "           <option value='3'>3</option>" +
                        "           <option value='NA'>NA</option>" +
                        "       </select>" +
                        "   </td>" +
                        "   <td>" +
                        "       <select name='rightEyePlus" + ssIndex + "' lay-reqText='请选择右眼plus！' lay-verify='required'>" +
                        "           <option value=''>请选择右眼plus</option>" +
                        "           <option value='无'>无</option>" +
                        "           <option value='有'>有</option>" +
                        "           <option value='不适应'>不适应</option>" +
                        "       </select>" +
                        "   </td>" +
                        "   <td>" +
                        "       <select name='rightEyeApRop" + ssIndex + "' lay-reqText='请选择右眼AP-ROP！' lay-verify='required'>" +
                        "           <option value=''>请选择右眼AP-ROP</option>" +
                        "           <option value='无'>无</option>" +
                        "           <option value='有'>有</option>" +
                        "       </select>" +
                        "   </td>" +
                        "   <td>" +
                        "       <select name='rightEyeTreatment" + ssIndex + "' lay-filter='RET' lay-reqText='请选择右眼治疗！' lay-verify='required'>" +
                        "           <option value=''>请选择右眼治疗</option>" +
                        "           <option value='无'>无</option>" +
                        "           <option value='激光'>激光</option>" +
                        "           <option value='玻璃体注药术'>玻璃体注药术</option>" +
                        "           <option value='视网膜剥离术'>视网膜剥离术</option>" +
                        "       </select>" +
                        "   </td>" +
                        "   <td>" +
                        "       <button id='PC-db-ssDelete" + ssIndex + "' class='pc-btn pc-btn-danger'><i class='iconfont icon-delete'></i></button>" +
                        "   </td>" +
                        "</tr>");
                }, function () {
                    form.render("select");
                    const thisSsIndex = ssIndex;
                    // 筛查日期
                    laydate.render({
                        elem: "#PC-db-SD" + thisSsIndex,
                        type: "date",
                        format: "yyyy-MM-dd",
                        min: birthdayString,
                        max: 0,
                        done: function(value, date) {
                            if(value !== "") {
                                const screeningDate = date.year + "-" + date.month + "-" + date.date,
                                    screeningDateStamp = Date.parse(screeningDate);
                                if (birthdayStamp > 0) {
                                    if (birthdayStamp > screeningDateStamp) {
                                        layer.msg("筛查日期必须<span class='layui-badge'>晚于</span>出生日期！", {
                                            icon: 5,
                                            time: 1000,
                                            anim: 6,
                                            btn: "好",
                                            resize: false,
                                            shade: 0.8
                                        }, function () {
                                            $("#PC-db-SD" + thisSsIndex).val("");
                                        });
                                    } else {
                                        const daysAfterBirth = Math.ceil((screeningDateStamp - birthdayStamp) / 86400000);
                                        $("#PC-db-TAB" + ssIndex).val(daysAfterBirth);
                                        const week = Math.floor(daysAfterBirth / 7),
                                            day = daysAfterBirth % 7;
                                        $("#PC-db-CGAW" + ssIndex).val(gaWeek + week);
                                        $("#PC-db-CGAD" + ssIndex).val(day);
                                        computeIntervals();
                                    }
                                }
                            }
                        }
                    });

                    // 是否 治疗
                    form.on("select(LET)", function (data) {
                        if (notNullTool(data.value) && data.value !== "无") {
                            $(data.elem).parents("tr").addClass("let");
                        } else {
                            $(data.elem).parents("tr").removeClass("let");
                        }
                        computeTreatmentTimes();
                    });
                    form.on("select(RET)", function (data) {
                        if (notNullTool(data.value) && data.value !== "无") {
                            $(data.elem).parents("tr").addClass("ret");
                        } else {
                            $(data.elem).parents("tr").removeClass("ret");
                        }
                        computeTreatmentTimes();
                    });
                    // 删除 PS 行
                    $("#PC-db-ssDelete" + thisSsIndex).on("click", function () {
                        const that = this;
                        layer.msg("确定要 <span class='pc-db-status-color-no'>删除</span> 此条筛查信息吗?",{
                            icon: 7,
                            time: 0,
                            anim: 6,
                            btn: ["确定", "取消"],
                            resize: false,
                            shade: 0.8,
                            yes: function (index) {
                                $(that).parents("tr").remove();
                                const trLength = $(".pc-db-BDRPSS .pc-db-table>tbody>tr").length;
                                if (notNullTool(trLength)) {
                                    if (parseInt(trLength) === 1) {
                                        form.val("RPSS", {
                                            whetherNeedRopScreening: false
                                        });
                                        $("#PC-db-WNROPS .layui-form-switch").off("click");
                                    }
                                }
                                $("#PC-db-SN").val(trLength - 1);
                                computeTreatmentTimes();
                                computeIntervals();
                                layer.close(index);
                            }
                        });
                    });
                    const trLength = $(".pc-db-BDRPSS .pc-db-table>tbody>tr").length;
                    if (notNullTool(trLength)) {
                        if (parseInt(trLength) > 1) {
                            form.val("RPSS", {
                                whetherNeedRopScreening: true
                            });
                            $("#PC-db-WNROPS .layui-form-switch").off("click");
                        }
                    }
                    $("#PC-db-SN").val(trLength - 1);
                    computeTreatmentTimes();
                    computeIntervals();
                });
            });

            // ROP筛查 初始化
            const ropTableNum = $(".pc-db-BDRPSS .pc-db-item-table>.pc-db-table>tbody").attr("data-num");
            if (notNullTool(ropTableNum)) {
                ssIndex = parseInt(ropTableNum);
                for (let i = 0; i < ssIndex; i++) {
                    const thisSsIndex = i + 1;
                    // 筛查日期
                    laydate.render({
                        elem: "#PC-db-SD" + thisSsIndex,
                        type: "date",
                        format: "yyyy-MM-dd",
                        min: birthdayString,
                        max: 0,
                        done: function(value, date) {
                            if(value !== "") {
                                const screeningDate = date.year + "-" + date.month + "-" + date.date,
                                    screeningDateStamp = Date.parse(screeningDate);
                                if (birthdayStamp > 0) {
                                    if (birthdayStamp > screeningDateStamp) {
                                        layer.msg("筛查日期必须<span class='layui-badge'>晚于</span>出生日期！", {
                                            icon: 5,
                                            time: 1000,
                                            anim: 6,
                                            btn: "好",
                                            resize: false,
                                            shade: 0.8
                                        }, function () {
                                            $("#PC-db-SD" + thisSsIndex).val("");
                                        });
                                    } else {
                                        const daysAfterBirth = Math.ceil((screeningDateStamp - birthdayStamp) / 86400000);
                                        $("#PC-db-TAB" + ssIndex).val(daysAfterBirth);
                                        const week = Math.floor(daysAfterBirth / 7),
                                            day = daysAfterBirth % 7;
                                        $("#PC-db-CGAW" + ssIndex).val(gaWeek + week);
                                        $("#PC-db-CGAD" + ssIndex).val(day);
                                        computeIntervals();
                                    }
                                }
                            }
                        }
                    });

                    // 是否 治疗
                    computeTreatmentTimes();
                    form.on("select(LET)", function (data) {
                        if (notNullTool(data.value) && data.value !== "无") {
                            $(data.elem).parents("tr").addClass("let");
                        } else {
                            $(data.elem).parents("tr").removeClass("let");
                        }
                        computeTreatmentTimes();
                    });
                    form.on("select(RET)", function (data) {
                        if (notNullTool(data.value) && data.value !== "无") {
                            $(data.elem).parents("tr").addClass("ret");
                        } else {
                            $(data.elem).parents("tr").removeClass("ret");
                        }
                        computeTreatmentTimes();
                    });
                    // 删除 PS 行
                    $("#PC-db-ssDelete" + thisSsIndex).on("click", function () {
                        const that = this;
                        layer.msg("确定要 <span class='pc-db-status-color-no'>删除</span> 此条筛查信息吗?",{
                            icon: 7,
                            time: 0,
                            anim: 6,
                            btn: ["确定", "取消"],
                            resize: false,
                            shade: 0.8,
                            yes: function (index) {
                                $(that).parents("tr").remove();
                                const trLength = $(".pc-db-BDRPSS .pc-db-table>tbody>tr").length;
                                if (notNullTool(trLength)) {
                                    if (parseInt(trLength) === 1) {
                                        form.val("RPSS", {
                                            whetherNeedRopScreening: false
                                        });
                                        $("#PC-db-WNROPS .layui-form-switch").off("click");
                                    }
                                }
                                $("#PC-db-SN").val(trLength - 1);
                                computeTreatmentTimes();
                                computeIntervals();
                                layer.close(index);
                            }
                        });
                    });
                    const trLength = $(".pc-db-BDRPSS .pc-db-table>tbody>tr").length;
                    if (notNullTool(trLength)) {
                        if (parseInt(trLength) > 1) {
                            form.val("RPSS", {
                                whetherNeedRopScreening: true
                            });
                            $("#PC-db-WNROPS .layui-form-switch").off("click");
                        }
                    }
                    $("#PC-db-SN").val(trLength - 1);
                    computeTreatmentTimes();
                    computeIntervals();
                }
            }

            // 基础数据库 视网膜病 筛选情况 添加/编辑 信息 提交
            form.on("submit(RPSS)", function (data) {
                const doing = "保存信息";
                loading(doing);
                let field = data.field, ssArray = [];
                for (let i = 1; i <= ssIndex; i++) {
                    let ssJson = {};
                    if (notNullTool(field["screeningDate" + i])) {
                        ssJson.screeningDate = field["screeningDate" + i];
                    }
                    ssJson.timeAfterBirth = field["timeAfterBirth" + i];
                    ssJson.correctGestationalAgeWeek = field["correctGestationalAgeWeek" + i];
                    ssJson.correctGestationalAgeDay = field["correctGestationalAgeDay" + i];
                    if (notNullTool(field["interval" + i])) {
                        ssJson.interval = field["interval" + i];
                    }
                    ssJson.leftEyeStaging = field["leftEyeStaging" + i];
                    ssJson.leftEyeZone = field["leftEyeZone" + i];
                    ssJson.leftEyePlus = field["leftEyePlus" + i];
                    ssJson.leftEyeApRop = field["leftEyeApRop" + i];
                    ssJson.leftEyeTreatment = field["leftEyeTreatment" + i];
                    ssJson.rightEyeStaging = field["rightEyeStaging" + i];
                    ssJson.rightEyeZone = field["rightEyeZone" + i];
                    ssJson.rightEyePlus = field["rightEyePlus" + i];
                    ssJson.rightEyeApRop = field["rightEyeApRop" + i];
                    ssJson.rightEyeTreatment = field["rightEyeTreatment" + i];
                    ssArray.push(ssJson);
                    delete field["screeningDate" + i];
                    delete field["timeAfterBirth" + i];
                    delete field["correctGestationalAgeWeek" + i];
                    delete field["correctGestationalAgeDay" + i];
                    delete field["interval" + i];
                    delete field["leftEyeStaging" + i];
                    delete field["leftEyeZone" + i];
                    delete field["leftEyePlus" + i];
                    delete field["leftEyeApRop" + i];
                    delete field["leftEyeTreatment" + i];
                    delete field["rightEyeStaging" + i];
                    delete field["rightEyeZone" + i];
                    delete field["rightEyePlus" + i];
                    delete field["rightEyeApRop" + i];
                    delete field["rightEyeTreatment" + i];
                }
                field.ssArray = JSON.stringify(ssArray);
                $.post("/perinatalPlatform/basicDatabase/write/RP/SS/post",field, function (back, status) {
                    if(status === "success") {
                        if(back.code) {
                            successNext();
                        }else {failMsg(doing)}
                    }else {errorMsg1()}
                }, "json").fail(function () {errorMsg2()});
            });
        }

        // 基础数据库 视网膜病 筛选评估
        if ($(".pc-db-BDRPSA").length > 0) {
            // 筛查评估 是否需要干预
            form.on("switch(WNI)", function (data) {
               if (data.elem.checked) {
                   $("#PC-db-CIT, #PC-db-AIT, #PC-db-TFDTT, #PC-db-TH").removeAttr("disabled").attr("lay-verify", "requiredDB").attr("name", function () {
                      return $(this).attr("data-name");
                   });
               } else {
                   $("#PC-db-CIT, #PC-db-AIT, #PC-db-TFDTT, #PC-db-TH").removeAttr("name lay-verify").attr("disabled", true).val("");
               }
            });

            let confirmedInterventionTime, confirmedInterventionTimeStamp = 0, actualInterventionTime, actualInterventionTimeStamp = 0;
            // 确诊干预时间
            laydate.render({
                elem: "#PC-db-CIT",
                type: "datetime",
                format: "yyyy-MM-dd HH:mm:ss",
                max: 1,
                done: function(value, date) {
                    if(value !== "") {
                        confirmedInterventionTime = date.year + "-" + date.month + "-" + date.date;
                        confirmedInterventionTimeStamp = Date.parse(confirmedInterventionTime);
                        if (actualInterventionTime != null) {
                            if (confirmedInterventionTimeStamp < actualInterventionTimeStamp) {
                                $("#PC-db-TFDTT").val(Math.round((actualInterventionTimeStamp - confirmedInterventionTimeStamp)/3600000))
                            } else {
                                layer.msg("确诊干预时间必须<span class='layui-badge'>早于</span>实际干预时间！", {
                                    icon: 5,
                                    time: 1000,
                                    anim: 6,
                                    btn: "好",
                                    resize: false,
                                    shade: 0.8
                                }, function () {
                                    $("#PC-db-CIT").val("");
                                    confirmedInterventionTime = null;
                                    confirmedInterventionTimeStamp = 0;
                                });
                            }
                        }
                    } else {
                        confirmedInterventionTime = null;
                        confirmedInterventionTimeStamp = 0;
                    }
                }
            });

            // 实际干预时间
            laydate.render({
                elem: "#PC-db-AIT",
                type: "datetime",
                format: "yyyy-MM-dd HH:mm:ss",
                max: 1,
                done: function(value, date) {
                    if(value !== "") {
                        actualInterventionTime = date.year + "-" + date.month + "-" + date.date;
                        actualInterventionTimeStamp = Date.parse(actualInterventionTime);
                        if (confirmedInterventionTime != null) {
                            if (confirmedInterventionTimeStamp < actualInterventionTimeStamp) {
                                $("#PC-db-TFDTT").val(Math.round((actualInterventionTimeStamp - confirmedInterventionTimeStamp)/3600000))
                            } else {
                                layer.msg("实际干预时间必须<span class='layui-badge'>晚于</span>确诊干预时间！", {
                                    icon: 5,
                                    time: 1000,
                                    anim: 6,
                                    btn: "好",
                                    resize: false,
                                    shade: 0.8
                                }, function () {
                                    $("#PC-db-AIT").val("");
                                    actualInterventionTime = null;
                                    actualInterventionTimeStamp = 0;
                                });
                            }
                        }
                    } else {
                        actualInterventionTime = null;
                        actualInterventionTimeStamp = 0;
                    }
                }
            });

            // 终止检查日期
            laydate.render({
                elem: "#PC-db-ITD",
                type: "date",
                format: "yyyy-MM-dd",
                max: 0
            });

            // 基础数据库 视网膜病 筛选评估 添加/编辑 信息 提交
            form.on("submit(RPSA)", function (data) {
                const doing = "保存信息";
                loading(doing);
                $.post("/perinatalPlatform/basicDatabase/write/RP/SA/post", data.field, function (back, status) {
                    if(status === "success") {
                        if(back.code) {
                            successNext();
                        }else {failMsg(doing)}
                    }else {errorMsg1()}
                }, "json").fail(function () {errorMsg2()});
            });
        }

        // 基础数据库 视网膜病 ROP诊断
        if ($(".pc-db-BDRPROP").length > 0) {
            // 左眼 AP-ROP
            form.on("switch(LAPROP)", function (data) {
                if (data.elem.checked) {
                    $("#PC-db-LEHLTD").removeAttr("disabled").attr("lay-verify", "requiredDB").attr("name", function () {
                       return $(this).attr("data-name");
                    });
                    $("#PC-db-LEHLT>input").attr("lay-verify", "requiredRadioGroup").attr("name", function () {
                        return $(this).attr("data-name");
                    });
                    $("#PC-db-LEHLT>ul").removeClass("rbgOff");
                    $("#PC-db-LEHLT>ul>li").on("click", function () {
                        activeRBGChoice(this);
                    });
                } else {
                    $("#PC-db-LEHLTD").removeAttr("name lay-verify").attr("disabled", true).val("");
                    $("#PC-db-LEHLT>input").removeAttr("lay-verify name value");
                    $("#PC-db-LEHLT>ul").addClass("rbgOff");
                    $("#PC-db-LEHLT>ul>li").off("click");
                }
            });

            // 左眼 诊断日期
            laydate.render({
                elem: "#PC-db-LEDD",
                type: "date",
                format: "yyyy-MM-dd",
                max: 0
            });

            // 左眼 最高级别治疗日期
            laydate.render({
                elem: "#PC-db-LEHLTD",
                type: "date",
                format: "yyyy-MM-dd",
                max: 0
            });

            // 右眼 AP-ROP
            form.on("switch(RAPROP)", function (data) {
                if (data.elem.checked) {
                    $("#PC-db-REHLTD").removeAttr("disabled").attr("lay-verify", "requiredDB").attr("name", function () {
                        return $(this).attr("data-name");
                    });
                    $("#PC-db-REHLT>input").attr("lay-verify", "requiredRadioGroup").attr("name", function () {
                        return $(this).attr("data-name");
                    });
                    $("#PC-db-REHLT>ul").removeClass("rbgOff");
                    $("#PC-db-REHLT>ul>li").on("click", function () {
                        activeRBGChoice(this);
                    });
                } else {
                    $("#PC-db-REHLTD").removeAttr("name lay-verify").attr("disabled", true).val("");
                    $("#PC-db-REHLT>input").removeAttr("lay-verify name value");
                    $("#PC-db-REHLT>ul").addClass("rbgOff");
                    $("#PC-db-REHLT>ul>li").off("click");
                }
            });

            // 右眼 诊断日期
            laydate.render({
                elem: "#PC-db-REDD",
                type: "date",
                format: "yyyy-MM-dd",
                max: 0
            });

            // 右眼 最高级别治疗日期
            laydate.render({
                elem: "#PC-db-REHLTD",
                type: "date",
                format: "yyyy-MM-dd",
                max: 0
            });

            // 基础数据库 视网膜病 ROP诊断 添加/编辑 信息 提交
            form.on("submit(RPROP)", function (data) {
                const doing = "保存信息";
                loading(doing);
                $.post("/perinatalPlatform/basicDatabase/write/RP/ROP/post", data.field, function (back, status) {
                    if(status === "success") {
                        if(back.code) {
                            successNext();
                        }else {failMsg(doing)}
                    }else {errorMsg1()}
                }, "json").fail(function () {errorMsg2()});
            });
        }
    });
});