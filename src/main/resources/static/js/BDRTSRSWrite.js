function dateFormatHour(time) {
    const datetime = new Date();
    datetime.setTime(time);
    const year = datetime.getFullYear(),
        month = datetime.getMonth() + 1 < 10 ? "0" + (datetime.getMonth() + 1) : datetime.getMonth() + 1,
        date = datetime.getDate() < 10 ? "0" + datetime.getDate() : datetime.getDate(),
        hour = datetime.getHours() < 10 ? "0" + datetime.getHours() : datetime.getHours();
    return year + "-" + month + "-" + date + " " + hour + ":00:00";
}
// 删除 表格 呼吸支持 行
function deleteRS(that, rsIndex) {
    layer.msg("确定要 <span class='pc-db-status-color-no'>删除</span> 此呼吸支持信息吗?", {
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
                $("#PC-db-RSN").val($(".pc-db-BDRTSRSL .pc-db-table tbody>tr").length - 1);
                let sum = 0;
                for (let i = rsIndex; i > 0; i--) {
                    const totalDaysElem = $("#PC-db-totalHours" + i);
                    if ($(totalDaysElem).length > 0) {
                        const daysInput = $(totalDaysElem).val();
                        if (notNullTool(daysInput)) {
                            sum += parseInt(daysInput);
                        }
                    }
                }
                const sumDay = Math.floor(sum/24);
                const sumHour = Math.floor(sum%24);
                $("#PC-db-RSD").val(sumDay);
                $("#PC-db-RSH").val(sumHour);
            });
            layer.close(index);
        }
    });
}
// 删除 表格 给氧浓度 行
function deleteOC(that, ocIndex) {
    layer.msg("确定要 <span class='pc-db-status-color-no'>删除</span> 此给氧浓度信息吗?", {
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
                $("#PC-db-OCCN").val($(".pc-db-BDRTSRSL1 .pc-db-table tbody>tr").length - 1);
                let sum = 0;
                for (let i = ocIndex; i > 0; i--) {
                    const totalDaysElem = $("#PC-db-totalOcHours" + i);
                    if ($(totalDaysElem).length > 0) {
                        const daysInput = $(totalDaysElem).val();
                        if (notNullTool(daysInput)) {
                            sum += parseInt(daysInput);
                        }
                    }
                }
                const sumDay = Math.floor(sum/24);
                const sumHour = Math.floor(sum%24);
                $("#PC-db-TOSTD").val(sumDay);
                $("#PC-db-TOSTH").val(sumHour);
            });
            layer.close(index);
        }
    });
}
function getHourFlag(trClass, intervalHourList, allHourLength) {
    // 获取 一种呼吸支持模式 所有行
    const rsTrElemList = $(".pc-db-BDRTSRSL .pc-db-table tbody>tr." + trClass);
    let flag = [];
    // 生成 所有 这种呼吸支持模式 日期
    if (notNullTool(rsTrElemList) && rsTrElemList.length > 0) {
        // 遍历 这种呼吸支持模式 每一行
        for (let ii = 0; ii < rsTrElemList.length; ii++) {
            // 找出 此行 这种呼吸支持模式 开始日期 结束日期
            const thisStartDateInput = $(rsTrElemList[ii]).find("td.startDate").children("input").val();
            const thisEndDateInput = $(rsTrElemList[ii]).find("td.endDate").children("input").val();
            // 如果 两个日期都存在 继续
            if (notNullTool(thisStartDateInput) && notNullTool(thisEndDateInput)) {
                // 转为 yy-MM-dd HH:mm:ss 形式
                const thisStartDate = dateFormatHour(new Date(thisStartDateInput)),
                    thisEndDate = dateFormatHour(new Date(thisEndDateInput));
                // 遍历 最大范围的 日期
                for (let iii = 0; iii < allHourLength; iii++) {
                    const thisIntervalDate = dateFormatHour(intervalHourList[iii]);
                    // 如果 有创高频 开始日期 和 遍历到的 大范围日期 相同，那么生成新的遍历 并将旧的遍历终止
                    if (thisIntervalDate === thisStartDate) {
                        // 新的遍历，直到这种呼吸支持模式 结束日期 为止，并给标记数组 相应日期的位置 置1
                        for (let xx = iii; xx < allHourLength; xx++) {
                            const thisIntervalDateHour  = dateFormatHour(intervalHourList[xx]);
                            // 如果 是终止日期，截断循环
                            if (thisEndDate === thisIntervalDateHour) {
                                break;
                            }
                            flag[xx] = 1;
                        }
                        break;
                    }
                }
            }
        }
    }
    return flag;
}
function getTrTimeElem(flag, allDateLength) {
    let json = {},
        trTimeElem = "", total14Hour = 0, total28Hour = 0, totalHour = 0;
    for (let k = 0; k < allDateLength; k++) {
        if (k === 0) {
            trTimeElem += "<td class='pc-row'>";
        } else if (k === allDateLength) {
            trTimeElem += "</td>";
        } else if (k%24 === 0) {
            trTimeElem += "</td><td class='pc-row'>";
        }
        if (flag[k] === 1) {
            trTimeElem += "<div class='pc-db-active'></div>";
            if (Math.ceil(k/24) <= 14) {
                total14Hour++;
            }
            if (Math.ceil(k/24) <= 28) {
                total28Hour++;
            }
            totalHour++;
        } else {
            trTimeElem += "<div></div>";
        }
    }
    json.trTimeElem = trTimeElem;
    json.total14Day = Math.round(total14Hour/24);
    json.total28Day = Math.round(total28Hour/24);
    json.totalDay = Math.floor(totalHour/24);
    json.totalDayMoreHour = totalHour%24;
    return json;
}
$(document).ready(function () {
    // 单选项后面的 输入框
    $(".pc-db-BDRTSRSH .pc-db-item>.pc-db-radioBtn-group>li").on("click", function () {
        const that = this,
            hasActive = $(that).hasClass("pc-db-active");
        if (hasActive) {
            if ($(that).attr("data-value") === "无") {
                $(that).parents(".layui-col-sm12").next(".layui-col-sm4").find("input").removeAttr("name lay-verify").attr("disabled", true);
                $(that).parents(".layui-col-sm12").next().next(".layui-col-sm4").find("input").removeAttr("name lay-verify").attr("disabled", true);
                $(that).parents(".layui-col-sm12").next().next().next(".layui-col-sm4").find("input").removeAttr("name lay-verify").attr("disabled", true);
            } else if ($(that).attr("data-value") === "有创高频" || $(that).attr("data-value") === "有创常频") {
                $(that).parents(".layui-col-sm12").next(".layui-col-sm4").find("input").removeAttr("disabled").attr("lay-verify", "requiredDB").attr("name", function () {
                    return $(this).attr("data-name");
                });
                $(that).parents(".layui-col-sm12").next().next(".layui-col-sm4").find("input").removeAttr("disabled").attr("lay-verify", "requiredDB").attr("name", function () {
                    return $(this).attr("data-name");
                });
                $(that).parents(".layui-col-sm12").next().next().next(".layui-col-sm4").find("input").removeAttr("disabled").attr("lay-verify", "requiredDB").attr("name", function () {
                    return $(this).attr("data-name");
                });
            } else {
                $(that).parents(".layui-col-sm12").next(".layui-col-sm4").find("input").removeAttr("disabled").attr("lay-verify", "requiredDB").attr("name", function () {
                    return $(this).attr("data-name");
                });
                $(that).parents(".layui-col-sm12").next().next(".layui-col-sm4").find("input").removeAttr("disabled").attr("lay-verify", "requiredDB").attr("name", function () {
                    return $(this).attr("data-name");
                });
                $(that).parents(".layui-col-sm12").next().next().next(".layui-col-sm4").find("input").removeAttr("name lay-verify").attr("disabled", true);
            }
        } else {
            $(that).parents(".layui-col-sm12").next(".layui-col-sm4").find("input").removeAttr("name lay-verify").attr("disabled", true);
            $(that).parents(".layui-col-sm12").next().next(".layui-col-sm4").find("input").removeAttr("name lay-verify").attr("disabled", true);
            $(that).parents(".layui-col-sm12").next().next().next(".layui-col-sm4").find("input").removeAttr("name lay-verify").attr("disabled", true);
        }
    });

    // 引入 layui
    layui.use(["element", "form", "laydate", "layer"], function () {
        let form = layui.form,
            laydate = layui.laydate,
            layer = layui.layer;

        // 获取 出生日期、胎龄
        const bdRtsTsElem = $(".pc-db-BDRTSRSH"),
            birthday = $(bdRtsTsElem).attr("data-birthday"),
            gaWeekInput = $(bdRtsTsElem).attr("data-gaWeek"),
            gaDayInput = $(bdRtsTsElem).attr("data-gaDay");
        if (notNullTool(birthday) && notNullTool(gaWeekInput) && notNullTool(gaDayInput)) {
            const birthdayStamp = Date.parse(birthday);
            // 计算 生后 28 天 日期、胎龄
            const afterBirth28DaysDateStamp = birthdayStamp + 28*86400000,
                afterBirth28DaysDate = new Date(afterBirth28DaysDateStamp),
                gaWeek = parseInt(gaWeekInput),
                gaDay = parseInt(gaDayInput);
            $("#PC-db-AB28DD").val(dateFormatDay(afterBirth28DaysDate));
            $("#PC-db-AB28DCGAW").val(gaWeek + 4);
            $("#PC-db-AB28DCGAD").val(gaDay);
            // 计算 矫正胎龄 36周 日期
            const interval36WeekBirthDays = 36*7 - gaWeek*7 - gaDay,
                interval36WeekBirthDaysStamp = interval36WeekBirthDays*86400000,
                correctGestationalAge36WeekDateStamp = birthdayStamp + interval36WeekBirthDaysStamp,
                correctGestationalAge36WeekDate = new Date(correctGestationalAge36WeekDateStamp);
            $("#PC-db-CGA36WD").val(dateFormatDay(correctGestationalAge36WeekDate));
            // 计算 矫正胎龄 40周 日期
            const interval40WeekBirthDays = 40*7 - gaWeek*7 - gaDay,
                interval40WeekBirthDaysStamp = interval40WeekBirthDays*86400000,
                correctGestationalAge40WeekDateStamp = birthdayStamp + interval40WeekBirthDaysStamp,
                correctGestationalAge40WeekDate = new Date(correctGestationalAge40WeekDateStamp);
            $("#PC-db-CGA40WD").val(dateFormatDay(correctGestationalAge40WeekDate));
            // 计算 出院时 胎龄
            laydate.render({
                elem: "#PC-db-dischargeDate",
                type: "date",
                format: "yyyy-MM-dd",
                max: 0,
                done: function(value, date) {
                    const dischargeDate = date.year + "-" + date.month + "-" + date.date,
                        dischargeDateStamp = Date.parse(dischargeDate),
                        gaAllDay = gaWeek*7 + gaDay,
                        dischargeGestationalAgeAllDays = Math.floor((dischargeDateStamp - birthdayStamp)/86400000) + gaAllDay,
                        dischargeGestationalAgeWeek = Math.floor(dischargeGestationalAgeAllDays/7),
                        dischargeGestationalAgeDay = dischargeGestationalAgeAllDays%7;
                    $("#PC-db-DCGAW").val(dischargeGestationalAgeWeek);
                    $("#PC-db-DCGAD").val(dischargeGestationalAgeDay);
                }
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
        },30000);

        // 新增 呼吸支持
        let rsIndex = 0, startRsDate = [], endRsDate = [], startRsDateStamp = [0], endRsDateStamp = [0];
        const dataLength = $(".pc-db-BDRTSRSL .pc-db-table>tbody").attr("data-num");
        // 初始化 呼吸支持表 长度
        if (notNullTool(dataLength)) {
            rsIndex = parseInt(dataLength);
        }
        // 初始化 日期选择器
        for (let i = 1; i <= rsIndex; i++) {
            const thisRsIndex = i;
            // 初始化 日期
            startRsDate[thisRsIndex] = $("#PC-db-startRsDate" + thisRsIndex).val();
            startRsDateStamp[thisRsIndex] = Date.parse(startRsDate[thisRsIndex]);
            laydate.render({
                elem: "#PC-db-startRsDate" + thisRsIndex,
                type: "datetime",
                format: "yyyy-MM-dd HH:mm:ss",
                max: 1,
                done: function(value, date) {
                    if(value !== "") {
                        startRsDate[thisRsIndex] = date.year + "-" + date.month + "-" + date.date +  ' ' + date.hours + ':' + date.minutes + ':' + date.seconds;
                        startRsDateStamp[thisRsIndex] = Date.parse(startRsDate[thisRsIndex]);
                        if (notNullTool(endRsDate[thisRsIndex])) {
                            if (startRsDateStamp[thisRsIndex] <= endRsDateStamp[thisRsIndex]) {
                                $("#PC-db-totalHours" + thisRsIndex).val(Math.round((endRsDateStamp[thisRsIndex] - startRsDateStamp[thisRsIndex]) / 3600000));
                                $("#PC-db-totalDays" + thisRsIndex).val(Math.floor((endRsDateStamp[thisRsIndex] - startRsDateStamp[thisRsIndex]) / 86400000));
                                $("#PC-db-totalDaysMoreHours" + thisRsIndex).val(Math.floor(((endRsDateStamp[thisRsIndex] - startRsDateStamp[thisRsIndex]) % 86400000) / 3600000));
                                let sum = 0;
                                for (let j = rsIndex; j > 0; j--) {
                                    const totalDaysElem = $("#PC-db-totalHours" + j);
                                    if ($(totalDaysElem).length > 0) {
                                        const daysInput = $(totalDaysElem).val();
                                        if (notNullTool(daysInput)) {
                                            sum += parseInt(daysInput);
                                        }
                                    }
                                }
                                const sumDay = Math.floor(sum/24);
                                const sumHour = Math.floor(sum%24);
                                $("#PC-db-RSD").val(sumDay);
                                $("#PC-db-RSH").val(sumHour);
                            } else {
                                layer.msg("开始日期必须<span class='layui-badge'>早于</span>结束日期！", {
                                    icon: 5,
                                    time: 3000,
                                    anim: 6,
                                    btn: "好",
                                    resize: false,
                                    shade: 0.8
                                }, function () {
                                    $("#PC-db-startRsDate" + thisRsIndex).val("");
                                });
                            }
                        }
                    }else {
                        startRsDate[thisRsIndex] = null;
                        startRsDateStamp[thisRsIndex] = 0;
                    }
                }
            });
            endRsDate[thisRsIndex] = $("#PC-db-endRsDate" + thisRsIndex).val();
            endRsDateStamp[thisRsIndex] = Date.parse(endRsDate[thisRsIndex]);
            laydate.render({
                elem: "#PC-db-endRsDate" + thisRsIndex,
                type: "datetime",
                format: "yyyy-MM-dd HH:mm:ss",
                max: 1,
                done: function(value, date) {
                    if(value !== "") {
                        endRsDate[thisRsIndex] = date.year + "-" + date.month + "-" + date.date +  ' ' + date.hours + ':' + date.minutes + ':' + date.seconds;
                        endRsDateStamp[thisRsIndex] = Date.parse(endRsDate[thisRsIndex]);
                        if (notNullTool(startRsDateStamp[thisRsIndex])) {
                            if (startRsDateStamp[thisRsIndex] <= endRsDateStamp[thisRsIndex]) {
                                $("#PC-db-totalHours" + thisRsIndex).val(Math.round((endRsDateStamp[thisRsIndex] - startRsDateStamp[thisRsIndex]) / 3600000));
                                $("#PC-db-totalDays" + thisRsIndex).val(Math.floor((endRsDateStamp[thisRsIndex] - startRsDateStamp[thisRsIndex]) / 86400000));
                                $("#PC-db-totalDaysMoreHours" + thisRsIndex).val(Math.floor(((endRsDateStamp[thisRsIndex] - startRsDateStamp[thisRsIndex]) % 86400000) / 3600000));
                                let sum = 0;
                                for (let j = rsIndex; j > 0; j--) {
                                    const totalDaysElem = $("#PC-db-totalHours" + j);
                                    if ($(totalDaysElem).length > 0) {
                                        const daysInput = $(totalDaysElem).val();
                                        if (notNullTool(daysInput)) {
                                            sum += parseInt(daysInput);
                                        }
                                    }
                                }
                                const sumDay = Math.floor(sum/24);
                                const sumHour = Math.floor(sum%24);
                                $("#PC-db-RSD").val(sumDay);
                                $("#PC-db-RSH").val(sumHour);
                            } else {
                                layer.msg("结束日期必须<span class='layui-badge'>晚于</span>开始日期！", {
                                    icon: 5,
                                    time: 3000,
                                    anim: 6,
                                    btn: "好",
                                    resize: false,
                                    shade: 0.8
                                }, function () {
                                    $("#PC-db-endRsDate" + thisRsIndex).val("");
                                });
                            }
                        }
                    }else {
                        endRsDate[thisRsIndex] = null;
                        endRsDateStamp[thisRsIndex] = 0;
                    }
                }
            });
        }
        $("#PC-db-addRS").on("click", function () {
            const that = this;
            sequentialExecution(function () {
                rsIndex++;
            }, function () {
                $(that).parents("tr").before(
                    "<tr>" +
                    "   <td class='pc-db-table-select'>" +
                    "       <select name='respiratorySupportMode" + rsIndex + "' lay-filter='DRSM' lay-reqText='请选择呼吸支持模式！' lay-verify='required'>" +
                    "           <option value=''>请选择呼吸支持模式</option>" +
                    "           <option value='有创高频'>有创高频</option>" +
                    "           <option value='有创常频'>有创常频</option>" +
                    "           <option value='无创高频'>无创高频</option>" +
                    "           <option value='NIPPV'>NIPPV</option>" +
                    "           <option value='BIPAP'>BIPAP</option>" +
                    "           <option value='NCPAP'>NCPAP</option>" +
                    "           <option value='HFNC'>HFNC</option>" +
                    "           <option value='鼻导管'>鼻导管</option>" +
                    "           <option value='头罩'>头罩</option>" +
                    "           <option value='有创NAVA'>有创NAVA</option>" +
                    "           <option value='无创NAVA'>无创NAVA</option>" +
                    "           <option value='箱式吸氧'>箱式吸氧</option>" +
                    "       </select>" +
                    "   </td>" +
                    "   <td class='startDate'>" +
                    "       <input id='PC-db-startRsDate" + rsIndex + "' type='text' name='startRsDate" + rsIndex + "' lay-verify='required' placeholder='请选择开始日期' lay-reqText='请选择开始日期！' readonly>" +
                    "   </td>" +
                    "   <td class='endDate'>" +
                    "       <input id='PC-db-endRsDate" + rsIndex + "' type='text' name='endRsDate" + rsIndex + "' placeholder='请选择结束日期' readonly>" +
                    "   </td>" +
                    "   <td>" +
                    "       <input id='PC-db-totalHours" + rsIndex + "' type='number' name='totalHours" + rsIndex + "' readonly>" +
                    "   </td>" +
                    "   <td>" +
                    "       <input id='PC-db-totalDays" + rsIndex + "' type='number' name='totalDays" + rsIndex + "' readonly>" +
                    "   </td>" +
                    "   <td>" +
                    "       <input id='PC-db-totalDaysMoreHours" + rsIndex + "' type='number' name='totalDaysMoreHours" + rsIndex + "' readonly>" +
                    "   </td>" +
                    "   <td>" +
                    "       <button onclick='deleteRS(this, " + rsIndex + ");' class='pc-btn pc-btn-danger'><i class='iconfont icon-delete'></i></button>" +
                    "   </td>" +
                    "</tr>");
                form.on("select(DRSM)", function (data) {
                    $(data.elem).parents("tr").removeClass();
                    if (data.value === "有创高频") {
                        $(data.elem).parents("tr").addClass("IHF");
                    } else if (data.value === "有创常频") {
                        $(data.elem).parents("tr").addClass("IF");
                    } else if (data.value === "无创高频") {
                        $(data.elem).parents("tr").addClass("NIHF");
                    } else if (data.value === "鼻导管") {
                        $(data.elem).parents("tr").addClass("NC");
                    } else if (data.value === "头罩") {
                        $(data.elem).parents("tr").addClass("Hood");
                    } else {
                        $(data.elem).parents("tr").addClass(data.value);
                    }
                });
            }, function () {
                form.render("select");
                const thisRsIndex = rsIndex;
                laydate.render({
                    elem: "#PC-db-startRsDate" + thisRsIndex,
                    type: "datetime",
                    format: "yyyy-MM-dd HH:mm:ss",
                    max: 1,
                    done: function(value, date) {
                        if(value !== "") {
                            startRsDate[thisRsIndex] = date.year + "-" + date.month + "-" + date.date +  ' ' + date.hours + ':' + date.minutes + ':' + date.seconds;
                            startRsDateStamp[thisRsIndex] = Date.parse(startRsDate[thisRsIndex]);
                            if (notNullTool(endRsDate[thisRsIndex])) {
                                if (startRsDateStamp[thisRsIndex] <= endRsDateStamp[thisRsIndex]) {
                                    $("#PC-db-totalHours" + thisRsIndex).val(Math.round((endRsDateStamp[thisRsIndex] - startRsDateStamp[thisRsIndex]) / 3600000));
                                    $("#PC-db-totalDays" + thisRsIndex).val(Math.floor((endRsDateStamp[thisRsIndex] - startRsDateStamp[thisRsIndex]) / 86400000));
                                    $("#PC-db-totalDaysMoreHours" + thisRsIndex).val(Math.floor(((endRsDateStamp[thisRsIndex] - startRsDateStamp[thisRsIndex]) % 86400000) / 3600000));
                                    let sum = 0;
                                    for (let i = rsIndex; i > 0; i--) {
                                        const totalDaysElem = $("#PC-db-totalHours" + i);
                                        if ($(totalDaysElem).length > 0) {
                                            const daysInput = $(totalDaysElem).val();
                                            if (notNullTool(daysInput)) {
                                                sum += parseInt(daysInput);
                                            }
                                        }
                                    }
                                    const sumDay = Math.floor(sum/24);
                                    const sumHour = Math.floor(sum%24);
                                    $("#PC-db-RSD").val(sumDay);
                                    $("#PC-db-RSH").val(sumHour);
                                } else {
                                    layer.msg("开始日期必须<span class='layui-badge'>早于</span>结束日期！", {
                                        icon: 5,
                                        time: 3000,
                                        anim: 6,
                                        btn: "好",
                                        resize: false,
                                        shade: 0.8
                                    }, function () {
                                        $("#PC-db-startRsDate" + thisRsIndex).val("");
                                    });
                                }
                            }
                        }else {
                            startRsDate[thisRsIndex] = null;
                            startRsDateStamp[thisRsIndex] = 0;
                        }
                    }
                });
                laydate.render({
                    elem: "#PC-db-endRsDate" + thisRsIndex,
                    type: "datetime",
                    format: "yyyy-MM-dd HH:mm:ss",
                    max: 1,
                    done: function(value, date) {
                        if(value !== "") {
                            endRsDate[thisRsIndex] = date.year + "-" + date.month + "-" + date.date +  ' ' + date.hours + ':' + date.minutes + ':' + date.seconds;
                            endRsDateStamp[thisRsIndex] = Date.parse(endRsDate[thisRsIndex]);
                            if (notNullTool(startRsDateStamp[thisRsIndex])) {
                                if (startRsDateStamp[thisRsIndex] <= endRsDateStamp[thisRsIndex]) {
                                    $("#PC-db-totalHours" + thisRsIndex).val(Math.round((endRsDateStamp[thisRsIndex] - startRsDateStamp[thisRsIndex]) / 3600000));
                                    $("#PC-db-totalDays" + thisRsIndex).val(Math.floor((endRsDateStamp[thisRsIndex] - startRsDateStamp[thisRsIndex]) / 86400000));
                                    $("#PC-db-totalDaysMoreHours" + thisRsIndex).val(Math.floor(((endRsDateStamp[thisRsIndex] - startRsDateStamp[thisRsIndex]) % 86400000) / 3600000));
                                    let sum = 0;
                                    for (let i = rsIndex; i > 0; i--) {
                                        const totalDaysElem = $("#PC-db-totalHours" + i);
                                        if ($(totalDaysElem).length > 0) {
                                            const daysInput = $(totalDaysElem).val();
                                            if (notNullTool(daysInput)) {
                                                sum += parseInt(daysInput);
                                            }
                                        }
                                    }
                                    const sumDay = Math.floor(sum/24);
                                    const sumHour = Math.floor(sum%24);
                                    $("#PC-db-RSD").val(sumDay);
                                    $("#PC-db-RSH").val(sumHour);
                                } else {
                                    layer.msg("结束日期必须<span class='layui-badge'>晚于</span>开始日期！", {
                                        icon: 5,
                                        time: 3000,
                                        anim: 6,
                                        btn: "好",
                                        resize: false,
                                        shade: 0.8
                                    }, function () {
                                        $("#PC-db-endRsDate" + thisRsIndex).val("");
                                    });
                                }
                            }
                        }else {
                            endRsDate[thisRsIndex] = null;
                            endRsDateStamp[thisRsIndex] = 0;
                        }
                    }
                });
                $("#PC-db-RSN").val($(".pc-db-BDRTSRSL .pc-db-item-table .pc-db-table tbody>tr").length - 1);
            });
        });

        // 打开 呼吸管理图
        $("#PC-db-openRespManage").on("click", function () {
            // 获取 所有 起止 日期输入框DOM
            const startDateList = $(".pc-db-BDRTSRSL .pc-db-table tbody .startDate>input"),
                endDateList = $(".pc-db-BDRTSRSL .pc-db-table tbody .endDate>input");
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
                    maxDateStamp = Math.max.apply(null, endDateStampList);
                let startDateStamp = minDateStamp, endDateStamp = maxDateStamp;
                // 取 最小日期的 当天00:00:00
                if ((minDateStamp - 57600000)%86400000 !== 0) {
                    startDateStamp = (Math.floor((minDateStamp - 57600000)/86400000))*86400000 + 57600000;
                }
                // 取最大日期的 下一天00:00:00
                if ((maxDateStamp - 57600000)%86400000 !== 0) {
                    endDateStamp = (Math.floor((maxDateStamp - 57600000)/86400000) + 1)*86400000 + 57600000;
                }
                if (startDateStamp !== Infinity && startDateStamp !== -Infinity && endDateStamp !== Infinity && endDateStamp !== -Infinity) {
                    // 生成 表头 日期
                    let j = 0, thElem = "", thisDate;
                    for (let thisDateStamp = startDateStamp; thisDateStamp < endDateStamp; thisDateStamp += 86400000) {
                        thisDate = new Date(thisDateStamp);
                        const thisDateTh = "<th>" + (thisDate.getFullYear() % 100) + "/" + (thisDate.getMonth() + 1) + "/" + thisDate.getDate() + "</th>";
                        thElem += thisDateTh;
                        j++;
                    }
                    // 生成 每个小时的 时间戳
                    let k = 0, intervalHourList = [];
                    for (let thisHourStamp = startDateStamp; thisHourStamp < endDateStamp; thisHourStamp += 3600000) {
                        intervalHourList[k] = new Date(thisHourStamp);
                        k++;
                    }
                    if (notNullTool(thisDate)) {
                        sequentialExecution(function () {
                            const allDateLength = j, allHourLength = k;
                            const ihfFlag = getHourFlag("IHF", intervalHourList, allHourLength),  // 生成 有创高频 flag
                                ifFlag = getHourFlag("IF", intervalHourList, allHourLength),  // 生成 有创常频 flag
                                nihfFlag = getHourFlag("NIHF", intervalHourList, allHourLength),  // 生成 无创高频 flag
                                nippvFlag = getHourFlag("NIPPV", intervalHourList, allHourLength),  // 生成 NIPPV flag
                                bipapFlag = getHourFlag("BIPAP", intervalHourList, allHourLength),  // 生成 BIPAP flag
                                ncpapFlag = getHourFlag("NCPAP", intervalHourList, allHourLength),  // 生成 NCPAP flag
                                hfncFlag = getHourFlag("HFNC", intervalHourList, allHourLength),  // 生成 HFNC flag
                                ncFlag = getHourFlag("NC", intervalHourList, allHourLength),  // 生成 鼻导管 flag
                                hoodFlag = getHourFlag("Hood", intervalHourList, allHourLength);  // 生成 头罩 flag
                            let liveTrTimeElem = "";

                            // 生成 每种模式 th标签，以及 合计 14、28日内 支持天数
                            const ihfTrTimeJson = getTrTimeElem(ihfFlag, allHourLength),
                                ifTrTimeJson = getTrTimeElem(ifFlag, allHourLength),
                                nihfTrTimeJson = getTrTimeElem(nihfFlag, allHourLength),
                                nippvTrTimeJson = getTrTimeElem(nippvFlag, allHourLength),
                                bipapTrTimeJson = getTrTimeElem(bipapFlag, allHourLength),
                                ncpapTrTimeJson = getTrTimeElem(ncpapFlag, allHourLength),
                                hfncTrTimeJson = getTrTimeElem(hfncFlag, allHourLength),
                                ncTrTimeJson = getTrTimeElem(ncFlag, allHourLength),
                                hoodTrTimeJson = getTrTimeElem(hoodFlag, allHourLength),
                                // DOM td元素
                                ihfTrTimeElem = ihfTrTimeJson.trTimeElem,
                                ifTrTimeElem = ifTrTimeJson.trTimeElem,
                                nihfTrTimeElem = nihfTrTimeJson.trTimeElem,
                                nippvTrTimeElem = nippvTrTimeJson.trTimeElem,
                                bipapTrTimeElem = bipapTrTimeJson.trTimeElem,
                                ncpapTrTimeElem = ncpapTrTimeJson.trTimeElem,
                                hfncTrTimeElem = hfncTrTimeJson.trTimeElem,
                                ncTrTimeElem = ncTrTimeJson.trTimeElem,
                                hoodTrTimeElem = hoodTrTimeJson.trTimeElem,
                                // 14天
                                ihfTrTime14Day = ihfTrTimeJson.total14Day,
                                ifTrTime14Day = ifTrTimeJson.total14Day,
                                nihfTrTime14Day = nihfTrTimeJson.total14Day,
                                nippvTrTime14Day = nippvTrTimeJson.total14Day,
                                bipapTrTime14Day = bipapTrTimeJson.total14Day,
                                ncpapTrTime14Day = ncpapTrTimeJson.total14Day,
                                hfncTrTime14Day = hfncTrTimeJson.total14Day,
                                ncTrTime14Day = ncTrTimeJson.total14Day,
                                hoodTrTime14Day = hoodTrTimeJson.total14Day,
                                // 28天
                                ihfTrTime28Day = ihfTrTimeJson.total28Day,
                                ifTrTime28Day = ifTrTimeJson.total28Day,
                                nihfTrTime28Day = nihfTrTimeJson.total28Day,
                                nippvTrTime28Day = nippvTrTimeJson.total28Day,
                                bipapTrTime28Day = bipapTrTimeJson.total28Day,
                                ncpapTrTime28Day = ncpapTrTimeJson.total28Day,
                                hfncTrTime28Day = hfncTrTimeJson.total28Day,
                                ncTrTime28Day = ncTrTimeJson.total28Day,
                                hoodTrTime28Day = hoodTrTimeJson.total28Day,
                                // 总计天
                                ihfTrTimeDay = ihfTrTimeJson.totalDay,
                                ifTrTimeDay = ifTrTimeJson.totalDay,
                                nihfTrTimeDay = nihfTrTimeJson.totalDay,
                                nippvTrTimeDay = nippvTrTimeJson.totalDay,
                                bipapTrTimeDay = bipapTrTimeJson.totalDay,
                                ncpapTrTimeDay = ncpapTrTimeJson.totalDay,
                                hfncTrTimeDay = hfncTrTimeJson.totalDay,
                                ncTrTimeDay = ncTrTimeJson.totalDay,
                                hoodTrTimeDay = hoodTrTimeJson.totalDay,
                                // 总计小时
                                ihfTrTimeHour = ihfTrTimeJson.totalDayMoreHour,
                                ifTrTimeHour = ifTrTimeJson.totalDayMoreHour,
                                nihfTrTimeHour = nihfTrTimeJson.totalDayMoreHour,
                                nippvTrTimeHour = nippvTrTimeJson.totalDayMoreHour,
                                bipapTrTimeHour = bipapTrTimeJson.totalDayMoreHour,
                                ncpapTrTimeHour = ncpapTrTimeJson.totalDayMoreHour,
                                hfncTrTimeHour = hfncTrTimeJson.totalDayMoreHour,
                                ncTrTimeHour = ncTrTimeJson.totalDayMoreHour,
                                hoodTrTimeHour = hoodTrTimeJson.totalDayMoreHour;
                            let daysTitle = "", blockTd = "", ihfDayTd = "", ifDayTd = "", nihfDayTd = "",
                                nippvDayTd = "", bipapDayTd = "", ncpapDayTd = "", hfncDayTd = "", ncDayTd = "", hoodDayTd = "", totalSumTd = "",
                                marginLeftCss = "margin-left: 266px",  total14DaySum = 0, total28DaySum = 0, totalDaySum, totalHourSum;
                            if (allDateLength >= 14) {
                                daysTitle += "<th>14日内天数</th>";
                                blockTd += "<td></td>";
                                ihfDayTd += "<td>" + ihfTrTime14Day + "</td>";
                                ifDayTd += "<td>" + ifTrTime14Day + "</td>";
                                nihfDayTd += "<td>" + nihfTrTime14Day + "</td>";
                                nippvDayTd += "<td>" + nippvTrTime14Day + "</td>";
                                bipapDayTd += "<td>" + bipapTrTime14Day + "</td>";
                                ncpapDayTd += "<td>" + ncpapTrTime14Day + "</td>";
                                hfncDayTd += "<td>" + hfncTrTime14Day + "</td>";
                                ncDayTd += "<td>" + ncTrTime14Day + "</td>";
                                hoodDayTd += "<td>" + hoodTrTime14Day + "</td>";
                                total14DaySum = ihfTrTime14Day + ifTrTime14Day + nihfTrTime14Day + nippvTrTime14Day + bipapTrTime14Day +
                                    ncpapTrTime14Day + hfncTrTime14Day + ncTrTime14Day + hoodTrTime14Day;
                                totalSumTd += "<td>" + total14DaySum + "</td>";
                                marginLeftCss = "margin-left: 338px";
                                if (allDateLength >= 28) {
                                    daysTitle += "<th>28日内天数</th>";
                                    blockTd += "<td></td>";
                                    ihfDayTd += "<td>" + ihfTrTime28Day + "</td>";
                                    ifDayTd += "<td>" + ifTrTime28Day + "</td>";
                                    nihfDayTd += "<td>" + nihfTrTime28Day + "</td>";
                                    nippvDayTd += "<td>" + nippvTrTime28Day + "</td>";
                                    bipapDayTd += "<td>" + bipapTrTime28Day + "</td>";
                                    ncpapDayTd += "<td>" + ncpapTrTime28Day + "</td>";
                                    hfncDayTd += "<td>" + hfncTrTime28Day + "</td>";
                                    ncDayTd += "<td>" + ncTrTime28Day + "</td>";
                                    hoodDayTd += "<td>" + hoodTrTime28Day + "</td>";
                                    total28DaySum = ihfTrTime28Day + ifTrTime28Day + nihfTrTime28Day + nippvTrTime28Day + bipapTrTime28Day +
                                        ncpapTrTime28Day + hfncTrTime28Day + ncTrTime28Day + hoodTrTime28Day;
                                    totalSumTd += "<td>" + total28DaySum + "</td>";
                                    marginLeftCss = "margin-left: 410px";
                                }
                            }
                            daysTitle += "<th>合计（d）</th>";
                            blockTd += "<td></td>";
                            ihfDayTd += "<td>" + ihfTrTimeDay + "</td>";
                            ifDayTd += "<td>" + ifTrTimeDay + "</td>";
                            nihfDayTd += "<td>" + nihfTrTimeDay + "</td>";
                            nippvDayTd += "<td>" + nippvTrTimeDay + "</td>";
                            bipapDayTd += "<td>" + bipapTrTimeDay + "</td>";
                            ncpapDayTd += "<td>" + ncpapTrTimeDay + "</td>";
                            hfncDayTd += "<td>" + hfncTrTimeDay + "</td>";
                            ncDayTd += "<td>" + ncTrTimeDay + "</td>";
                            hoodDayTd += "<td>" + hoodTrTimeDay + "</td>";
                            daysTitle += "<th>合计（h）</th>";
                            blockTd += "<td></td>";
                            ihfDayTd += "<td>" + ihfTrTimeHour + "</td>";
                            ifDayTd += "<td>" + ifTrTimeHour + "</td>";
                            nihfDayTd += "<td>" + nihfTrTimeHour + "</td>";
                            nippvDayTd += "<td>" + nippvTrTimeHour + "</td>";
                            bipapDayTd += "<td>" + bipapTrTimeHour + "</td>";
                            ncpapDayTd += "<td>" + ncpapTrTimeHour + "</td>";
                            hfncDayTd += "<td>" + hfncTrTimeHour + "</td>";
                            ncDayTd += "<td>" + ncTrTimeHour + "</td>";
                            hoodDayTd += "<td>" + hoodTrTimeHour + "</td>";
                            totalDaySum = ihfTrTimeDay + ifTrTimeDay + nihfTrTimeDay + nippvTrTimeDay + bipapTrTimeDay +
                                ncpapTrTimeDay + hfncTrTimeDay + ncTrTimeDay + hoodTrTimeDay;
                            totalSumTd += "<td>" + totalDaySum + "</td>";
                            totalHourSum = ihfTrTimeHour + ifTrTimeHour + nihfTrTimeHour + nippvTrTimeHour + bipapTrTimeHour +
                                ncpapTrTimeHour + hfncTrTimeHour + ncTrTimeHour + hoodTrTimeHour;
                            totalSumTd += "<td>" + totalHourSum + "</td>";

                            let trBlockElem = "";
                            // 住院 天数 th元素
                            for (let jj = 0; jj < allDateLength; jj++) {
                                liveTrTimeElem += "<td>" + (jj + 1) + "</td>";
                                trBlockElem += "<td></td>";
                            }
                            // 生成 html
                            let tableHtml =
                                "<table class='pc-db-table tableLeft'>" +
                                "    <thead>" +
                                "    <tr>" +
                                "        <th>呼吸支持模式</th>" +
                                daysTitle +
                                "    </tr>" +
                                "    </thead>" +
                                "    <tbody>" +
                                "    <tr>" +
                                "        <td>住院天数</td>" +
                                blockTd +
                                "    </tr>" +
                                "    <tr>" +
                                "        <td>有创高频</td>" +
                                ihfDayTd +
                                "    </tr>" +
                                "    <tr>" +
                                "        <td>有创常频</td>" +
                                ifDayTd +
                                "    </tr>" +
                                "    <tr>" +
                                "        <td>无创高频</td>" +
                                nihfDayTd +
                                "    </tr>" +
                                "    <tr>" +
                                "        <td>NIPPV</td>" +
                                nippvDayTd +
                                "    </tr>" +
                                "    <tr>" +
                                "        <td>BIPAP</td>" +
                                bipapDayTd +
                                "    </tr>" +
                                "    <tr>" +
                                "        <td>NCPAP</td>" +
                                ncpapDayTd +
                                "    </tr>" +
                                "    <tr>" +
                                "        <td>HFNC</td>" +
                                hfncDayTd +
                                "    </tr>" +
                                "    <tr>" +
                                "        <td>鼻导管</td>" +
                                ncDayTd +
                                "    </tr>" +
                                "    <tr>" +
                                "        <td>头罩</td>" +
                                hoodDayTd +
                                "    </tr>" +
                                "    <tr>" +
                                "        <td>总计</td>" +
                                totalSumTd +
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
                                liveTrTimeElem +
                                "    </tr>" +
                                "    <tr>" +
                                ihfTrTimeElem +
                                "    </tr>" +
                                "    <tr>" +
                                ifTrTimeElem +
                                "    </tr>" +
                                "    <tr>" +
                                nihfTrTimeElem +
                                "    </tr>" +
                                "    <tr>" +
                                nippvTrTimeElem +
                                "    </tr>" +
                                "    <tr>" +
                                bipapTrTimeElem +
                                "    </tr>" +
                                "    <tr>" +
                                ncpapTrTimeElem +
                                "    </tr>" +
                                "    <tr>" +
                                hfncTrTimeElem +
                                "    </tr>" +
                                "    <tr>" +
                                ncTrTimeElem +
                                "    </tr>" +
                                "    <tr>" +
                                hoodTrTimeElem +
                                "    </tr>" +
                                "    <tr>" +
                                trBlockElem +
                                "    </tr>" +
                                "    </tbody>" +
                                "</table>";
                            $("#PC-db-RespManage>.pc-db-layer-table").html(tableHtml);
                        }, function () {
                            const tableLeftTr = $("#PC-db-RespManage>.pc-db-layer-table .pc-db-table.tableRight tbody>tr"),
                                tableLeftTrLength = $(tableLeftTr).length,
                                tableLeftTdLength = $("#PC-db-RespManage>.pc-db-layer-table .pc-db-table.tableRight thead>tr>th").length;
                            for (let i = 0; i < tableLeftTdLength; i++) {
                                let sum = 0;
                                for (j = 1; j < tableLeftTrLength - 1; j++) {
                                    $(tableLeftTr[j]).find("td:eq(" + i + ")").each(function () {
                                        if ($(this).children("div").hasClass("pc-db-active")) {
                                            sum++;
                                        }
                                    });
                                }
                                $(tableLeftTr[tableLeftTrLength - 1]).find("td:eq(" + i + ")").text(sum);
                            }
                        }, function () {
                            layer.open({
                                title: "呼吸管理",
                                type: 1,
                                shade: 0.8,
                                area: "auto",
                                maxmin: true,
                                maxWidth: 1024,
                                content: $("#PC-db-RespManage"),
                                resize: false,
                                success: function () {
                                    $(".layui-layer.layui-layer-page>.layui-layer-setwin>.layui-layer-min").remove();
                                }
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

        // 打开 呼吸管理图2
        $("#PC-db-openRespManage2").on("click", function () {
            // 获取 所有 起止 日期输入框DOM
            const trList = $(".pc-db-BDRTSRSL .pc-db-table>tbody>tr:not(:last-child)");
            let startDateStampList = [];
            if (trList.length > 0) {
                sequentialExecution(function () {
                    for (let i = 0; i < trList.length; i++) {
                        const thisTr = trList[i],
                            startDate = $(thisTr).children(".startDate").children("input").val();
                        if (notNullTool(startDate)) {
                            startDateStampList[i] = Date.parse(startDate);
                        }
                    }
                    const minDateStamp_o = Math.min.apply(null, startDateStampList),
                        minDateString = dateFormatDay(minDateStamp_o),
                        minDateStamp = Date.parse(minDateString);

                    let html = "", rsMode = [], invasive = false, invasiveNum = 0, j = 0;
                    for (let i = 0; i < trList.length; i++) {
                        const idx = (j % 6) + 1,
                            thisTr = trList[i],
                            startDate = $(thisTr).children("td.startDate").children("input").val(),
                            startDateStamp_o = Date.parse(startDate),
                            startDateString = dateFormatDay(startDateStamp_o),
                            startDateStamp = Date.parse(startDateString),
                            interval = (startDateStamp - minDateStamp) / 86400000 + 1;
                        let respiratorySupportMode = $(thisTr).children("td:first-child").find("input").val();

                        if (respiratorySupportMode === "有创高频" || respiratorySupportMode === "有创常频") {
                            respiratorySupportMode = "有创通气";
                            rsMode[i] = "有创通气";
                            invasive = true;
                            if (i > 0) {
                                if (rsMode[i - 1] === "有创通气") {
                                    continue;
                                } else {
                                    respiratorySupportMode = (invasiveNum + 1) + "次上机";
                                }
                            }
                            invasiveNum ++;
                            j ++;
                        } else {
                            rsMode[i] = respiratorySupportMode;
                            j ++;
                        }

                        html +=
                            "<li class='color" + idx + "'>" +
                            "<div>" + respiratorySupportMode + "<br/>（D" + interval + "）</div>" +
                            "</li>";
                    }

                    // 是否 带氧出院
                    const dischargeDate = $("#PC-db-dischargeDate").val(),
                        respiratorySupportMode = $("#PC-db-DRSM>input").val();
                    if (notNullTool(respiratorySupportMode)) {
                        if (respiratorySupportMode !== "无") {
                            if (notNullTool(dischargeDate)) {
                                const dischargeDateStamp = Date.parse(dischargeDate),
                                    interval = (dischargeDateStamp - minDateStamp) / 86400000 + 1;
                                html +=
                                    "<li class='color" + ((j % 6) + 1) + "'>" +
                                    "<div>带氧出院<br/>（D" + interval + "）</div>" +
                                    "</li>";
                            }
                        }
                    }
                    $("#PC-db-RespManage2>.pc-db-pic>ul").html(html);

                }, function () {
                    layer.open({
                        title: "呼吸管理2",
                        type: 1,
                        shade: 0.8,
                        area: "auto",
                        maxmin: true,
                        maxWidth: 1024,
                        content: $("#PC-db-RespManage2"),
                        resize: false,
                        success: function () {
                            $(".layui-layer.layui-layer-page>.layui-layer-setwin>.layui-layer-min").remove();
                        }
                    });
                });
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

        // 初始化 氧气浓度变动
        let ocIndex = 0, startOcDate = [], endOcDate = [], startOcDateStamp = [0], endOcDateStamp = [0];
        const ocIndexInput = $(".pc-db-BDRTSRSL1 .pc-db-table>tbody").attr("data-num");
        if (notNullTool(ocIndexInput)) {
            ocIndex = parseInt(ocIndexInput);
            // 为 日期 选择 初始化
            for (let i = 1; i <= ocIndex; i++) {
                const thisOcIndex = i;
                startOcDate[thisOcIndex] = $("#PC-db-startOcDate" + thisOcIndex).val();
                startOcDateStamp[thisOcIndex] = Date.parse(startOcDate[thisOcIndex]);
                laydate.render({
                    elem: "#PC-db-startOcDate" + thisOcIndex,
                    type: "datetime",
                    format: "yyyy-MM-dd HH:mm:ss",
                    max: 1,
                    done: function(value, date) {
                        if(value !== "") {
                            startOcDate[thisOcIndex] = date.year + "-" + date.month + "-" + date.date +  ' ' + date.hours + ':' + date.minutes + ':' + date.seconds;
                            startOcDateStamp[thisOcIndex] = Date.parse(startOcDate[thisOcIndex]);
                            if (notNullTool(endOcDate[thisOcIndex])) {
                                if (startOcDateStamp[thisOcIndex] <= endOcDateStamp[thisOcIndex]) {
                                    $("#PC-db-totalOcHours" + thisOcIndex).val(Math.round((endOcDateStamp[thisOcIndex] - startOcDateStamp[thisOcIndex]) / 3600000));
                                    $("#PC-db-totalOcDays" + thisOcIndex).val(Math.floor((endOcDateStamp[thisOcIndex] - startOcDateStamp[thisOcIndex]) / 86400000));
                                    $("#PC-db-TOCDMH" + thisOcIndex).val(Math.floor(((endOcDateStamp[thisOcIndex] - startOcDateStamp[thisOcIndex]) % 86400000) / 3600000));
                                    let sum = 0;
                                    for (let j = ocIndex; j > 0; j--) {
                                        const totalDaysElem = $("#PC-db-totalOcHours" + j);
                                        if ($(totalDaysElem).length > 0) {
                                            const daysInput = $(totalDaysElem).val();
                                            if (notNullTool(daysInput)) {
                                                sum += parseInt(daysInput);
                                            }
                                        }
                                    }
                                    const sumDay = Math.floor(sum/24);
                                    const sumHour = Math.floor(sum%24);
                                    $("#PC-db-TOSTD").val(sumDay);
                                    $("#PC-db-TOSTH").val(sumHour);
                                } else {
                                    layer.msg("开始日期必须<span class='layui-badge'>早于</span>结束日期！", {
                                        icon: 5,
                                        time: 3000,
                                        anim: 6,
                                        btn: "好",
                                        resize: false,
                                        shade: 0.8
                                    }, function () {
                                        $("#PC-db-startOcDate" + thisOcIndex).val("");
                                    });
                                }
                            }
                        } else {
                            startOcDate[thisOcIndex] = null;
                            startOcDateStamp[thisOcIndex] = 0;
                        }
                    }
                });
                endOcDate[thisOcIndex] = $("#PC-db-endOcDate" + thisOcIndex).val();
                endOcDateStamp[thisOcIndex] = Date.parse(endOcDate[thisOcIndex]);
                laydate.render({
                    elem: "#PC-db-endOcDate" + thisOcIndex,
                    type: "datetime",
                    format: "yyyy-MM-dd HH:mm:ss",
                    max: 1,
                    done: function(value, date) {
                        if(value !== "") {
                            endOcDate[thisOcIndex] = date.year + "-" + date.month + "-" + date.date +  ' ' + date.hours + ':' + date.minutes + ':' + date.seconds;
                            endOcDateStamp[thisOcIndex] = Date.parse(endOcDate[thisOcIndex]);
                            if (notNullTool(startOcDateStamp[thisOcIndex])) {
                                if (startOcDateStamp[thisOcIndex] <= endOcDateStamp[thisOcIndex]) {
                                    $("#PC-db-totalOcHours" + thisOcIndex).val(Math.round((endOcDateStamp[thisOcIndex] - startOcDateStamp[thisOcIndex]) / 3600000));
                                    $("#PC-db-totalOcDays" + thisOcIndex).val(Math.floor((endOcDateStamp[thisOcIndex] - startOcDateStamp[thisOcIndex]) / 86400000));
                                    $("#PC-db-TOCDMH" + thisOcIndex).val(Math.floor(((endOcDateStamp[thisOcIndex] - startOcDateStamp[thisOcIndex]) % 86400000) / 3600000));
                                    let sum = 0;
                                    for (let j = ocIndex; j > 0; j--) {
                                        const totalDaysElem = $("#PC-db-totalOcHours" + j);
                                        if ($(totalDaysElem).length > 0) {
                                            const daysInput = $(totalDaysElem).val();
                                            if (notNullTool(daysInput)) {
                                                sum += parseInt(daysInput);
                                            }
                                        }
                                    }
                                    const sumDay = Math.floor(sum/24);
                                    const sumHour = Math.floor(sum%24);
                                    $("#PC-db-TOSTD").val(sumDay);
                                    $("#PC-db-TOSTH").val(sumHour);
                                } else {
                                    layer.msg("结束日期必须<span class='layui-badge'>晚于</span>开始日期！", {
                                        icon: 5,
                                        time: 3000,
                                        anim: 6,
                                        btn: "好",
                                        resize: false,
                                        shade: 0.8
                                    }, function () {
                                        $("#PC-db-endOcDate" + thisOcIndex).val("");
                                    });
                                }
                            }
                        } else {
                            endOcDate[thisOcIndex] = null;
                            endOcDateStamp[thisOcIndex] = 0;
                        }
                    }
                });
            }
        }
        // 新增 氧气浓度变动
        $("#PC-db-addOC").on("click", function () {
            const that = this;
            sequentialExecution(function () {
                ocIndex++;
            }, function () {
                $(that).parents("tr").before(
                    "<tr>" +
                    "   <td>" +
                    "       <input type='number' name='oxygenConcentration" + ocIndex + "' lay-verify='required' placeholder='请填写给氧浓度' lay-reqText='请填写给氧浓度！'>" +
                    "   </td>" +
                    "   <td class='startDate'>" +
                    "       <input id='PC-db-startOcDate" + ocIndex + "' type='text' name='startOcDate" + ocIndex + "' lay-verify='required' placeholder='请选择开始日期' lay-reqText='请选择开始日期！' readonly>" +
                    "   </td>" +
                    "   <td class='endDate'>" +
                    "       <input id='PC-db-endOcDate" + ocIndex + "' type='text' name='endOcDate" + ocIndex + "' placeholder='请选择结束日期' readonly>" +
                    "   </td>" +
                    "   <td>" +
                    "       <input id='PC-db-totalOcHours" + ocIndex + "' type='number' name='totalOcHours" + ocIndex + "' readonly>" +
                    "   </td>" +
                    "   <td>" +
                    "       <input id='PC-db-totalOcDays" + ocIndex + "' type='number' name='totalOcDays" + ocIndex + "' readonly>" +
                    "   </td>" +
                    "   <td>" +
                    "       <input id='PC-db-TOCDMH" + ocIndex + "' type='number' name='totalOcDaysMoreHours" + ocIndex + "' readonly>" +
                    "   </td>" +
                    "   <td>" +
                    "       <button onclick='deleteOC(this, " + ocIndex + ");' class='pc-btn pc-btn-danger'><i class='iconfont icon-delete'></i></button>" +
                    "   </td>" +
                    "</tr>");
            }, function () {
                const thisOcIndex = ocIndex;
                laydate.render({
                    elem: "#PC-db-startOcDate" + thisOcIndex,
                    type: "datetime",
                    format: "yyyy-MM-dd HH:mm:ss",
                    max: 1,
                    done: function(value, date) {
                        if(value !== "") {
                            startOcDate[thisOcIndex] = date.year + "-" + date.month + "-" + date.date +  ' ' + date.hours + ':' + date.minutes + ':' + date.seconds;
                            startOcDateStamp[thisOcIndex] = Date.parse(startOcDate[thisOcIndex]);
                            if (notNullTool(endOcDate[thisOcIndex])) {
                                if (startOcDateStamp[thisOcIndex] <= endOcDateStamp[thisOcIndex]) {
                                    $("#PC-db-totalOcHours" + thisOcIndex).val(Math.round((endOcDateStamp[thisOcIndex] - startOcDateStamp[thisOcIndex]) / 3600000));
                                    $("#PC-db-totalOcDays" + thisOcIndex).val(Math.floor((endOcDateStamp[thisOcIndex] - startOcDateStamp[thisOcIndex]) / 86400000));
                                    $("#PC-db-TOCDMH" + thisOcIndex).val(Math.floor(((endOcDateStamp[thisOcIndex] - startOcDateStamp[thisOcIndex]) % 86400000) / 3600000));
                                    let sum = 0;
                                    for (let i = ocIndex; i > 0; i--) {
                                        const totalDaysElem = $("#PC-db-totalOcHours" + i);
                                        if ($(totalDaysElem).length > 0) {
                                            const daysInput = $(totalDaysElem).val();
                                            if (notNullTool(daysInput)) {
                                                sum += parseInt(daysInput);
                                            }
                                        }
                                    }
                                    const sumDay = Math.floor(sum/24);
                                    const sumHour = Math.floor(sum%24);
                                    $("#PC-db-TOSTD").val(sumDay);
                                    $("#PC-db-TOSTH").val(sumHour);
                                } else {
                                    layer.msg("开始日期必须<span class='layui-badge'>早于</span>结束日期！", {
                                        icon: 5,
                                        time: 3000,
                                        anim: 6,
                                        btn: "好",
                                        resize: false,
                                        shade: 0.8
                                    }, function () {
                                        $("#PC-db-startOcDate" + thisOcIndex).val("");
                                    });
                                }
                            }
                        } else {
                            startOcDate[thisOcIndex] = null;
                            startOcDateStamp[thisOcIndex] = 0;
                        }
                    }
                });
                laydate.render({
                    elem: "#PC-db-endOcDate" + thisOcIndex,
                    type: "datetime",
                    format: "yyyy-MM-dd HH:mm:ss",
                    max: 1,
                    done: function(value, date) {
                        if(value !== "") {
                            endOcDate[thisOcIndex] = date.year + "-" + date.month + "-" + date.date +  ' ' + date.hours + ':' + date.minutes + ':' + date.seconds;
                            endOcDateStamp[thisOcIndex] = Date.parse(endOcDate[thisOcIndex]);
                            if (notNullTool(startOcDateStamp[thisOcIndex])) {
                                if (startOcDateStamp[thisOcIndex] <= endOcDateStamp[thisOcIndex]) {
                                    $("#PC-db-totalOcHours" + thisOcIndex).val(Math.round((endOcDateStamp[thisOcIndex] - startOcDateStamp[thisOcIndex]) / 3600000));
                                    $("#PC-db-totalOcDays" + thisOcIndex).val(Math.floor((endOcDateStamp[thisOcIndex] - startOcDateStamp[thisOcIndex]) / 86400000));
                                    $("#PC-db-TOCDMH" + thisOcIndex).val(Math.floor(((endOcDateStamp[thisOcIndex] - startOcDateStamp[thisOcIndex]) % 86400000) / 3600000));
                                    let sum = 0;
                                    for (let i = ocIndex; i > 0; i--) {
                                        const totalDaysElem = $("#PC-db-totalOcHours" + i);
                                        if ($(totalDaysElem).length > 0) {
                                            const daysInput = $(totalDaysElem).val();
                                            if (notNullTool(daysInput)) {
                                                sum += parseInt(daysInput);
                                            }
                                        }
                                    }
                                    const sumDay = Math.floor(sum/24);
                                    const sumHour = Math.floor(sum%24);
                                    $("#PC-db-TOSTD").val(sumDay);
                                    $("#PC-db-TOSTH").val(sumHour);
                                } else {
                                    layer.msg("结束日期必须<span class='layui-badge'>晚于</span>开始日期！", {
                                        icon: 5,
                                        time: 3000,
                                        anim: 6,
                                        btn: "好",
                                        resize: false,
                                        shade: 0.8
                                    }, function () {
                                        $("#PC-db-endOcDate" + thisOcIndex).val("");
                                    });
                                }
                            }
                        } else {
                            endOcDate[thisOcIndex] = null;
                            endOcDateStamp[thisOcIndex] = 0;
                        }
                    }
                });
                $("#PC-db-OCCN").val($(".pc-db-BDRTSRSL1 .pc-db-item-table .pc-db-table tbody>tr").length - 1);
            });
        });

        // 给氧浓度 图表
        const options = {
            aspectRatio: 1.3,
            scales: {
                x: {
                    title: {
                        color: "#FFB7C5",
                        display: true,
                        align: "end",
                        text: "日期"
                    }
                },
                y: {
                    beginAtZero: true,
                    ticks: {
                        stepSize: 5
                    }
                }
            },
            plugins: {
                legend: {
                    display: false
                },
                title: {
                    color: "#FFB7C5",
                    display: true,
                    align: "start",
                    position: "top",
                    text: "%"
                },
            }
        };
        let ocChart,
            datasetJson = {
                fill: false,
                borderWidth: 4,
                pointRadius: 3,
                backgroundColor: "#10A64B",
                borderColor: "#10A64B"
            },
            chartJson = {
                type: "line",
                data: {
                    datasets: []
                },
                options: options
            };
        // 打开 给氧浓度图
        $("#PC-db-oxygenConcentration").on("click", function () {
            if (ocChart !== undefined) {
                ocChart.destroy();
            }
            // 获取 所有 起止 日期输入框DOM
            const startDateList = $(".pc-db-BDRTSRSL1 .pc-db-table tbody .startDate>input"),
                endDateList = $(".pc-db-BDRTSRSL1 .pc-db-table tbody .endDate>input");
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
                    maxDateStamp1 = Math.max.apply(null, startDateStampList);
                let maxDateStamp = Math.max.apply(null, endDateStampList);
                if (maxDateStamp1 > maxDateStamp) {
                    maxDateStamp = maxDateStamp1;
                }
                let startDateStamp = minDateStamp, endDateStamp = maxDateStamp;
                // 取 最小日期的 当天00:00:00
                if ((minDateStamp - 57600000) % 86400000 !== 0) {
                    startDateStamp = (Math.floor((minDateStamp - 57600000) / 86400000)) * 86400000 + 57600000;
                }
                // 取最大日期的 下一天00:00:00
                if ((maxDateStamp - 57600000) % 86400000 !== 0) {
                    endDateStamp = (Math.floor((maxDateStamp - 57600000) / 86400000) + 1) * 86400000 + 57600000;
                }
                if (startDateStamp !== Infinity && startDateStamp !== -Infinity && endDateStamp !== Infinity && endDateStamp !== -Infinity) {
                    // 生成 日期
                    let j = 0, dateLabel = [], thisDate;
                    for (let thisDateStamp = startDateStamp; thisDateStamp <= endDateStamp; thisDateStamp += 86400000) {
                        thisDate = new Date(thisDateStamp);
                        dateLabel.push((thisDate.getFullYear() % 100) + "/" + (thisDate.getMonth() + 1) + "/" + thisDate.getDate());
                        j++;
                    }

                    const ocTr = $(".pc-db-BDRTSRSL1 .pc-db-table tbody>tr"),
                        ocChartJson = JSON.parse(JSON.stringify(chartJson));
                    for (let i = 0; i < ocTr.length - 1; i ++) {
                        const oxygenConcentrationString = $(ocTr[i]).children("td:eq(0)").children("input").val(),
                            oxygenConcentration = parseFloat(oxygenConcentrationString),
                            startDateTimeString = $(ocTr[i]).children("td:eq(1)").children("input").val(),
                            startDateTime = new Date(startDateTimeString),
                            startDate = (startDateTime.getFullYear() % 100) + "/" + (startDateTime.getMonth() + 1) + "/" + startDateTime.getDate(),
                            startIndex = dateLabel.indexOf(startDate),
                            endDateTimeString = $(ocTr[i]).children("td:eq(2)").children("input").val();
                        if (notNullTool(endDateTimeString)) {
                            const endDateTime = new Date(endDateTimeString),
                                endDate = (endDateTime.getFullYear() % 100) + "/" + (endDateTime.getMonth() + 1) + "/" + endDateTime.getDate(),
                                endIndex = dateLabel.indexOf(endDate);
                            let data = [];
                            for (let i = startIndex; i <= endIndex; i ++) {
                                data[i] = oxygenConcentration;
                            }
                            const dataset = JSON.parse(JSON.stringify(datasetJson));
                            dataset.data = data;
                            ocChartJson.data.datasets.push(dataset);
                        } else {
                            let data = [];
                            data[startIndex] = oxygenConcentration;
                            const dataset = JSON.parse(JSON.stringify(datasetJson));
                            dataset.data = data;
                            ocChartJson.data.datasets.push(dataset);
                        }
                    }
                    ocChartJson.data.labels = dateLabel;
                    ocChart = new Chart($("#PC-layer-chart"), ocChartJson);
                    layer.open({
                        title: "给氧浓度图",
                        type: 1,
                        shade: 0.8,
                        area: "auto",
                        maxWidth: 1024,
                        maxmin: true,
                        content: $("#PC-db-OCP"),
                        resize: false,
                        success: function () {
                            $(".layui-layer.layui-layer-page>.layui-layer-setwin>.layui-layer-min").remove();
                        }
                    });
                }  else {
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

        // 基础数据库 呼吸系统 呼吸支持 添加/编辑 信息 提交
        form.on("submit(RTSRS)", function (data) {
            const doing = "保存信息";
            loading(doing);
            let field = data.field, rsArray = [], ocArray = [];
            for (let i = 1; i <= rsIndex; i++) {
                if (notNullTool(field["respiratorySupportMode" + i]) &&  notNullTool(field["startRsDate" + i])) {
                    let rsJson = {};
                    rsJson.respiratorySupportMode = field["respiratorySupportMode" + i];
                    rsJson.startRsDate = field["startRsDate" + i];
                    if (notNullTool(field["endRsDate" + i])) {
                        rsJson.endRsDate = field["endRsDate" + i];
                    }
                    if (notNullTool(field["totalHours" + i])) {
                        rsJson.totalHours = field["totalHours" + i];
                    }
                    if (notNullTool(field["totalDays" + i])) {
                        rsJson.totalDays = field["totalDays" + i];
                    }
                    if (notNullTool(field["totalDaysMoreHours" + i])) {
                        rsJson.totalDaysMoreHours = field["totalDaysMoreHours" + i];
                    }
                    rsArray.push(rsJson);
                    delete field["respiratorySupportMode" + i];
                    delete field["startRsDate" + i];
                    delete field["endRsDate" + i];
                    delete field["totalHours" + i];
                    delete field["totalDays" + i];
                    delete field["totalDaysMoreHours" + i];
                }
            }
            field.rsArray = JSON.stringify(rsArray);
            for (let i = 1; i <= ocIndex; i++) {
                if (notNullTool(field["oxygenConcentration" + i]) &&  notNullTool(field["startOcDate" + i])) {
                    let ocJson = {};
                    ocJson.oxygenConcentration = field["oxygenConcentration" + i];
                    ocJson.startOcDate = field["startOcDate" + i];
                    if (notNullTool(field["endOcDate" + i])) {
                        ocJson.endOcDate = field["endOcDate" + i];
                    }
                    if (notNullTool(field["totalOcHours" + i])) {
                        ocJson.totalOcHours = field["totalOcHours" + i];
                    }
                    if (notNullTool(field["totalOcDays" + i])) {
                        ocJson.totalOcDays = field["totalOcDays" + i];
                    }
                    if (notNullTool(field["totalOcDaysMoreHours" + i])) {
                        ocJson.totalOcDaysMoreHours = field["totalOcDaysMoreHours" + i];
                    }
                    ocArray.push(ocJson);
                    delete field["oxygenConcentration" + i];
                    delete field["startOcDate" + i];
                    delete field["endOcDate" + i];
                    delete field["totalHours" + i];
                    delete field["totalDays" + i];
                    delete field["totalOcDaysMoreHours" + i];
                }
            }
            field.ocArray = JSON.stringify(ocArray);
            $.post("/perinatalPlatform/basicDatabase/write/RTS/RS/post", field, function (back, status) {
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
                $(tableItem[i]).css("overflow-x", "scroll");
                $(tableItem[i]).find(".layui-anim.layui-anim-upbit").css("position", "unset");
            } else {
                $(tableItem[i]).css("overflow", "visible");
            }
        }
    });
});