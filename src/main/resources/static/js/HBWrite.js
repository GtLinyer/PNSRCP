// 判断 母亲信息 是否重复
function isContinue(motherFullName, motherPhone, motherHospitalNumber) {
    if (notNullTool(motherFullName) && notNullTool(motherPhone) && notNullTool(motherHospitalNumber)) {
        $.post("/perinatalPlatform/highBilirubin/testMI", {
            motherFullName: motherFullName,
            motherPhone: motherPhone,
            motherHospitalNumber: motherHospitalNumber
        }, function (back, status) {
            if (status === "success") {
                if (!back.code) {
                    layer.msg("此母亲信息已存在，确认继续输入吗？",{
                        icon: 0,
                        time: 0,
                        anim: 6,
                        btn: ["继续", "刷新页面"],
                        resize: false,
                        shade: 0.8,
                        btn2: function(){
                            location.reload();
                        }
                    });
                }
            }
        }, "json");
    }
}
// 计算 光疗 总时长
function computePhototherapyTotalDuration() {
    const pdList = $(".pc-db-HBTCMP .pc-db-table .pc-db-pd");
    let pdSum = 0;
    for (let i = 0; i < pdList.length; i ++) {
        const pdInput = $(pdList[i]).val();
        if (notNullTool(pdInput)) {
            const pd = parseInt(pdInput);
            pdSum += pd;
        }
    }
    $("#PC-db-PTD").val(pdSum);
}
// 计算 换血 总量
function computeExchangeBloodTotalAmount() {
    const ebvList = $(".pc-db-HBTCME .pc-db-table .pc-db-EBV");
    let ebvSum = 0;
    for (let i = 0; i < ebvList.length; i++) {
        const ebvInput = $(ebvList[i]).val();
        if (notNullTool(ebvInput)) {
            const ebv = parseInt(ebvInput);
            ebvSum += ebv;
        }
    }
    $("#PC-db-EBTA").val(ebvSum);
}
// 计算 血总胆红素峰值、峰值时间
function computePeakBloodTotalBilirubin() {
    const trList = $(".pc-db-HBTCME .pc-db-table>tbody>tr");
    let maxEbBloodTotalBilirubin = 0, maxEbCheckTimeString = "";
    for (let i = 0; i < (trList.length - 1); i++) {
        const trElem = $(trList[i]),
            ebCheckTimeElem = $(trElem).children("td:eq(0)").children("input"),
            ebCheckTimeInput = $(ebCheckTimeElem).val(),
            eBloodTotalBilirubinElem = $(trElem).children("td:eq(3)").children("input"),
            eBloodTotalBilirubinInput = $(eBloodTotalBilirubinElem).val();
        if (notNullTool(eBloodTotalBilirubinInput) && notNullTool(ebCheckTimeInput)) {
            const eBloodTotalBilirubin = parseFloat(eBloodTotalBilirubinInput);
            if (eBloodTotalBilirubin > maxEbBloodTotalBilirubin) {
                maxEbBloodTotalBilirubin = eBloodTotalBilirubin;
                maxEbCheckTimeString = ebCheckTimeInput;
            }
        }
    }
    if (maxEbBloodTotalBilirubin > 0) {
        $("#PC-db-PBTB").val(maxEbBloodTotalBilirubin);
        $("#PC-db-PT").val(maxEbCheckTimeString);
    }
}
// 生成14天日期
function date14Day(elem) {
    const childAdmissionDateInput = $(elem).attr("data-ad");
    if (notNullTool(childAdmissionDateInput)) {
        const childAdmissionDate = childAdmissionDateInput,
            childAdmissionDateStamp = Date.parse(childAdmissionDate);
        let date14DayTdElem = "", thisDateStamp = childAdmissionDateStamp, allDateStamp = [];
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
    } else {
        layer.msg("请先完善 患儿入院日期！", {
            icon: 7,
            time: 0,
            anim: 6,
            btn: "好!",
            resize: false,
            shade: 0.8
        }, function () {
            location.href = "/perinatalPlatform/highBilirubin/write/HBT/BI";
        });
    }
}
// 表格 方块 点击
function blockClick(ms0, ms1, ms2, ms3, mt0, mt1, mt2, mt3, cf0, cf1, cf2, cf3, allSum) {
    const blocksElem = $(".pc-db-HBTES .pc-db-table>tbody td.pc-db-table-click");
    $(blocksElem).off("click");
    $(blocksElem).on("click", function () {
        let that = this;
        const thisTr = $(that).parent("tr"),
            tdElem = $(thisTr).children("td"),
            trNum = $(thisTr).prevAll().length,
            tdNum = $(that).prevAll().length;
        if ($(that).hasClass("pc-db-active")) {
            $(that).removeClass("pc-db-active");
            if (trNum === 1) {
                ms0[tdNum] = 0;
            } else if (trNum === 2) {
                ms1[tdNum] = 0;
            } else if (trNum === 3) {
                ms2[tdNum] = 0;
            } else if (trNum === 4) {
                ms3[tdNum] = 0;
            } else if (trNum === 6) {
                mt0[tdNum] = 0;
            } else if (trNum === 7) {
                mt1[tdNum] = 0;
            } else if (trNum === 8) {
                mt2[tdNum] = 0;
            } else if (trNum === 9) {
                mt3[tdNum] = 0;
            } else if (trNum === 11) {
                cf0[tdNum] = 0;
            } else if (trNum === 12) {
                cf1[tdNum] = 0;
            } else if (trNum === 13) {
                cf2[tdNum] = 0;
            } else if (trNum === 14) {
                cf3[tdNum] = 0;
            }
        } else {
            $(that).addClass("pc-db-active");
            for (let i = 0; i < tdElem.length; i++) {
                if ($(tdElem[i]).hasClass("pc-db-active")) {
                    if (trNum === 1) {
                        ms0[i] = 1;
                    } else if (trNum === 2) {
                        ms1[i] = 1;
                    } else if (trNum === 3) {
                        ms2[i] = 1;
                    } else if (trNum === 4) {
                        ms3[i] = 1;
                    } else if (trNum === 6) {
                        mt0[i] = 1;
                    } else if (trNum === 7) {
                        mt1[i] = 1;
                    } else if (trNum === 8) {
                        mt2[i] = 1;
                    } else if (trNum === 9) {
                        mt3[i] = 1;
                    } else if (trNum === 11) {
                        cf0[i] = 1;
                    } else if (trNum === 12) {
                        cf1[i] = 1;
                    } else if (trNum === 13) {
                        cf2[i] = 1;
                    } else if (trNum === 14) {
                        cf3[i] = 1;
                    }
                }
            }
        }
        const tbody = $(thisTr).parent("tbody");
        let sum = 0;
        for (let i = 1; i <= 14; i ++) {
            if ($(tbody).children("tr:eq(" + i +")").children("td:eq(" + tdNum +")").hasClass("pc-db-active")) {
                if (i === 2) {
                    sum += 1;
                } else if (i === 3) {
                    sum += 2;
                } else if (i === 4) {
                    sum += 3;
                } else if (i === 7) {
                    sum += 1;
                } else if (i === 8) {
                    sum += 2;
                } else if (i === 9) {
                    sum += 3;
                } else if (i === 12) {
                    sum += 1;
                } else if (i === 13) {
                    sum += 2;
                } else if (i === 14) {
                    sum += 3;
                }
            }
        }
        $(tbody).children("tr:eq(15)").children("td:eq(" + tdNum +")").text(sum);
        allSum[tdNum] = sum;
    });
}
$(document).ready(function () {
    // 母亲 信息 重复提醒
    let motherFullName = null, motherPhone = null, motherHospitalNumber = null;
    // 母亲 姓名
    $("#PC-db-MFN").on("focusout", function () {
        const motherFullNameInput = $(this).val();
        if (notNullTool(motherFullNameInput)) {
            motherFullName = motherFullNameInput;
            isContinue(motherFullName, motherPhone, motherHospitalNumber);
        }
    });
    // 母亲 母亲手机号
    $("#PC-db-MP").on("focusout", function () {
        const motherPhoneInput = $(this).val();
        if (notNullTool(motherPhoneInput)) {
            motherPhone = motherPhoneInput;
            isContinue(motherFullName, motherPhone, motherHospitalNumber);
        }
    });
    // 母亲 母亲住院号
    $("#PC-db-MHN").on("focusout", function () {
        const motherHospitalNumberInput = $(this).val();
        if (notNullTool(motherHospitalNumberInput)) {
            motherHospitalNumber = motherHospitalNumberInput;
            isContinue(motherFullName, motherPhone, motherHospitalNumber);
        }
    });

    // 引入 layui
    layui.use(["element", "form", "laydate", "layer"], function () {
        let form = layui.form,
            laydate = layui.laydate,
            layer = layui.layer;

        // 产生 母亲 高胆编号
        let pcHbMotherNumInput = $("#PC-db-pcHbMotherNum"), pcHbMNhead;
        if ($(pcHbMotherNumInput).val() !== null && $(pcHbMotherNumInput).val() !== "") {
            pcHbMNhead = $(pcHbMotherNumInput).val();
            let hCaseNum = $(pcHbMotherNumInput).attr("data-num");
            if (hCaseNum !== undefined) {
                $(pcHbMotherNumInput).val(function () {
                    if (hCaseNum.length < 4) {
                        let zero = "";
                        for (let i = 0; i < (4 - hCaseNum.length); i++) {
                            zero = zero + "0";
                        }
                        hCaseNum = zero + hCaseNum;
                    }
                    const newYear = new Date().getFullYear();
                    return pcHbMNhead + newYear + hCaseNum;
                });
            }
        }

        // 高胆数据库 围产信息 添加/编辑 信息 提交
        form.on("submit(PI)", function (data) {
            const doing = "保存信息";
            loading(doing);
            $.post("/perinatalPlatform/highBilirubin/write/PI/post", data.field, function (back, status) {
                if(status === "success") {
                    if(back.code) {
                        hbSuccessNext(function () {
                            location.href = "/perinatalPlatform/highBilirubin/write/HBT/BI";
                        });
                    }else {failMsg(doing)}
                }else {errorMsg1()}
            },"json").fail(function () {errorMsg2()});
        });

        // 高胆数据库 高胆治疗 基本信息 出生时间
        let birthday, admissionDate, birthdayStamp = 0, admissionDateStamp = 0;
        // 初始化
        const birthdayInput = $("#PC-db-birthday").val(),
            admissionInput = $("#PC-db-AD").val();
        if (notNullTool(birthdayInput)) {
            birthday = birthdayInput;
            birthdayStamp = Date.parse(birthday);
        }
        if (notNullTool(admissionInput)) {
            admissionDate = admissionInput;
            admissionDateStamp = Date.parse(admissionDate);
        }
        laydate.render({
            elem: "#PC-db-birthday",
            type: "datetime",
            format: "yyyy-MM-dd HH:mm:ss",
            max: 1,
            done: function(value, date) {
                if(value !== "") {
                    birthday = date.year + "-" + date.month + "-" + date.date +  ' ' + date.hours + ':' + date.minutes + ':' + date.seconds;
                    birthdayStamp = Date.parse(birthday);
                    if (notNullTool(admissionDate)) {
                        if (birthdayStamp <= admissionDateStamp) {
                            // 计算 入院时日龄
                            $("#PC-db-ADA").val(Math.floor((admissionDateStamp - birthdayStamp) / 86400000));
                        } else {
                            layer.msg("出生时间必须<span class='layui-badge'>早于</span>入院日期！", {
                                icon: 5,
                                time: 1000,
                                anim: 6,
                                btn: "好",
                                resize: false,
                                shade: 0.8
                            }, function () {
                                $("#PC-db-birthday").val("");
                                birthday = null;
                                birthdayStamp = 0;
                            });
                        }
                    }
                }else {
                    birthday = null;
                    birthdayStamp = 0;
                }
            }
        });
        // 高胆数据库 高胆治疗 基本信息 入院日期
        laydate.render({
            elem: "#PC-db-AD",
            type: "datetime",
            format: "yyyy-MM-dd HH:mm:ss",
            max: 1,
            done: function(value, date) {
                if(value !== "") {
                    admissionDate = date.year + "-" + date.month + "-" + date.date +  ' ' + date.hours + ':' + date.minutes + ':' + date.seconds;
                    admissionDateStamp = Date.parse(admissionDate);
                    if (notNullTool(birthday)) {
                        if (admissionDateStamp >= birthdayStamp) {
                            // 计算 入院时日龄
                            $("#PC-db-ADA").val(Math.floor((admissionDateStamp - birthdayStamp) / 86400000));
                        }
                    } else {
                        layer.msg("入院日期必须<span class='layui-badge'>晚于</span>出生时间！", {
                            icon: 5,
                            time: 1000,
                            anim: 6,
                            btn: "好",
                            resize: false,
                            shade: 0.8
                        }, function () {
                            $("#PC-db-AD").val("");
                            admissionDate = null;
                            admissionDateStamp = 0;
                        });
                    }
                }else {
                    admissionDate = null;
                    admissionDateStamp = 0;
                }
            }
        });

        // 基本信息 胎龄日 不大于6
        $("#PC-db-GAD").on("focusout", function () {
            const gestationalAgeDayInput = $(this).val();
            if (notNullTool(gestationalAgeDayInput)) {
                const gestationalAgeDay = parseInt(gestationalAgeDayInput);
                if (gestationalAgeDay < 0 || gestationalAgeDay > 6) {
                    layer.msg("胎龄（日）超出范围！", {
                        icon: 5,
                        time: 3000,
                        anim: 6,
                        btn: "好",
                        resize: false,
                        shade: 0.8
                    }, function () {
                        $("#PC-db-GAD").val("");
                    });
                }
            }
        });

        // 高胆数据库 高胆治疗 基本信息 多胞情况 多胞输入框
        const rbgLiMS = $("#PC-db-MS>.pc-db-radioBtn-group>li"),
            inputMS = $("#PC-db-MS>input"),
            pcHbChildNumInput = $("#PC-db-pcHbChildNum"),
            pcHbChildNum = $(pcHbChildNumInput).val(),
            inputMN = $("#PC-db-MN");
        // 填写后不可修改
        if (notNullTool($(inputMS).val())) {
            $(rbgLiMS).off("click");
        }
        // 高胆数据库 高胆治疗 基本信息 多胞情况 提示
        layer.tips("多胞情况一旦填写后不可修改！2胎及以上保存信息后自动生成其他新生儿信息。", "#PC-db-MSA", {
            time: 5000,
            tips: [2, "#FF5722"]
        });
        $(rbgLiMS).on("click", function () {
            const value = $(this).attr("data-value"),
                hasActive = $(this).hasClass("pc-db-active");
            if (hasActive) {
                if (value === "多胎") {
                    $(inputMN).removeAttr("disabled").attr("lay-verify", "required").attr("name", function () {
                        return $(this).attr("data-name");
                    });
                    $(inputMS).removeAttr("name");
                    $(pcHbChildNumInput).val(function () {
                        return pcHbChildNum + "-1";
                    });
                } else {
                    $(inputMN).removeAttr("name lay-verify").attr("disabled", true).val("");
                    $(inputMS).attr("name", function () {
                        return $(this).attr("data-name");
                    });
                    if (value === "1") {
                        $(pcHbChildNumInput).val(function () {
                            return pcHbChildNum;
                        });
                    } else {
                        $(pcHbChildNumInput).val(function () {
                            return pcHbChildNum + "-1";
                        });
                    }
                }
            } else {
                $(inputMN).removeAttr("name lay-verify").attr("disabled", true).val("");
            }
        });
        $(inputMN).on("focusout", function () {
            let inputMNVal = $(this).val();
            if (notNullTool(inputMNVal)) {
                const inputMNValInt = parseInt(inputMNVal),
                    inputMNValFloat = parseFloat(inputMNVal);
                if (inputMNValInt === inputMNValFloat) {
                    if (inputMNValInt <= 3) {
                        layer.msg("填写的数值必须 <span class='layui-badge layui-bg-red'>大于</span> 3！", {
                            icon: 5,
                            anim: 6,
                            btn: "好！",
                            resize: false,
                            shade: 0.8
                        }, function () {
                            $(inputMN).val("");
                        });
                    }
                } else {
                    layer.msg("请输入 <span class='layui-badge layui-bg-red'>整数</span> ！", {
                        icon: 5,
                        anim: 6,
                        btn: "好！",
                        resize: false,
                        shade: 0.8
                    }, function () {
                        $(inputMN).val("");
                    });
                }
            }
        });

        // 高胆数据库 高胆治疗 基本信息 添加/编辑 信息 提交
        form.on("submit(HBTBI)", function (data) {
            const doing = "保存信息";
            loading(doing);
            $.post("/perinatalPlatform/highBilirubin/write/HBT/BI/post", data.field, function (back, status) {
                if(status === "success") {
                    if(back.code) {
                        hbSuccessNext(function () {
                            location.href = "/perinatalPlatform/highBilirubin/write/HBT/HBC";
                        });
                    }else {failMsg(doing)}
                }else {errorMsg1()}
            },"json").fail(function () {errorMsg2()});
        });

        // 高胆数据库 高胆治疗 高胆病因 遗传因素
        const inputGF = $("#PC-db-GF>input"),
            rbgGF = $("#PC-db-GF>.pc-db-radioBtn-group"),
            rbgLiGF = $("#PC-db-GF>.pc-db-radioBtn-group>li"),
            gfoInput = $("#PC-db-GF>.pc-db-attach>input");
        if (notNullTool($("#PC-db-isGF").attr("checked"))) {
            $(rbgLiGF).on("click", function () {
                const thisValue = $(this).attr("data-value");
                if (thisValue === "其他") {
                    $(gfoInput).removeAttr("disabled").attr("name", function () {
                        return $(this).attr("data-name");
                    });
                } else {
                    $(gfoInput).attr("disabled", true).removeAttr("name value").val("");
                }
            });
        }
        form.on("switch(GF)", function (data) {
            if (data.elem.checked) {
                $(inputGF).attr("name", function () {
                   return $(this).attr("data-name");
                });
                $(rbgGF).removeClass("rbgOff");
                $(rbgLiGF).on("click", function () {
                    activeRBGChoice(this);
                    const thisValue = $(this).attr("data-value");
                    if (thisValue === "其他") {
                        $(gfoInput).removeAttr("disabled").attr("name", function () {
                           return $(this).attr("data-name");
                        });
                    } else {
                        $(gfoInput).attr("disabled", true).removeAttr("name value").val("");
                    }
                });
            } else {
                $(inputGF).removeAttr("name value");
                $(rbgGF).addClass("rbgOff");
                $(rbgLiGF).removeAttr("class").off("click");
                $(gfoInput).attr("disabled", true).removeAttr("name value").val("");
            }
        });

        // 高胆数据库 高胆治疗 高胆病因 添加/编辑 信息 提交
        form.on("submit(HBTHBC)", function (data) {
            const doing = "保存信息";
            loading(doing);
            $.post("/perinatalPlatform/highBilirubin/write/HBT/HBC/post", data.field, function (back, status) {
                if(status === "success") {
                    if(back.code) {
                        hbSuccessNext(function () {
                            location.href = "/perinatalPlatform/highBilirubin/write/HBT/CM";
                        });
                    }else {failMsg(doing)}
                }else {errorMsg1()}
            },"json").fail(function () {errorMsg2()});
        });

        let pIndex = 0;
        // 初始化 光疗
        const pIndexInput = $(".pc-db-HBTCMP .pc-db-table>tbody").attr("data-num");
        if (notNullTool(pIndexInput)) {
            pIndex = parseInt(pIndexInput);
            // 为 日期 选择 初始化
            for (let i = 1; i <= pIndex; i++) {
                const thisPIndex = i;
                laydate.render({
                    elem: "#PC-db-PCT" + thisPIndex,
                    type: "datetime",
                    format: "yyyy-MM-dd HH:mm:ss",
                    max: 1
                });
                // 计算 光疗 总时长
                $("#PC-db-PD" + thisPIndex).on("focusout", function () {
                    computePhototherapyTotalDuration();
                });
                // 删除 光疗 行
                $("#PC-db-pDelete" + thisPIndex).on("click", function () {
                    const that = this;
                    layer.msg("确定要 <span class='pc-db-status-color-no'>删除</span> 此条光疗信息吗?",{
                        icon: 7,
                        time: 0,
                        anim: 6,
                        btn: ["确定", "取消"],
                        resize: false,
                        shade: 0.8,
                        yes: function (index) {
                            $(that).parents("tr").remove();
                            // 计算 光疗 次数
                            const pTimes = $(".pc-db-HBTCMP .pc-db-table>tbody>tr").length - 1;
                            $("#PC-db-PN").val(pTimes);
                            // 计算 光疗 总时长
                            computePhototherapyTotalDuration();
                            layer.close(index);
                        }
                    });
                });
            }
        }
        // 增加 光疗
        $("#PC-db-addP").on("click", function () {
            const that = this;
            pIndex ++;
            sequentialExecution(function () {
                $(that).parents("tr").before(
                    "<tr>" +
                    "   <td>" +
                    "       <input id='PC-db-PCT" + pIndex + "' type='text' name='pCheckTime" + pIndex + "' lay-verify='required' placeholder='请选择检查时间' lay-reqText='请选择检查时间！' readonly>" +
                    "   </td>" +
                    "   <td>" +
                    "       <input id='PC-db-PD" + pIndex + "' class='pc-db-pd' type='number' name='phototherapyDuration" + pIndex + "' lay-verify='required' placeholder='请填写光疗时长' lay-reqText='请填写光疗时长！'>" +
                    "   </td>" +
                    "   <td>" +
                    "       <input type='number' name='pTransdermalBilirubinValue" + pIndex + "' lay-verify='required' placeholder='请填写经皮胆红素值' lay-reqText='请填写经皮胆红素值！'>" +
                    "   </td>" +
                    "   <td>" +
                    "       <input type='number' name='pBloodTotalBilirubin" + pIndex + "' placeholder='请填写血总胆红素值'>" +
                    "   </td>" +
                    "   <td>" +
                    "       <input type='number' name='pDirectBilirubinValue" + pIndex + "' placeholder='请填写直接胆红素值'>" +
                    "   </td>" +
                    "   <td>" +
                    "       <input type='number' name='pAlt" + pIndex + "' placeholder='请填写ALT'>" +
                    "   </td>" +
                    "   <td>" +
                    "       <input type='number' name='pAst" + pIndex + "' placeholder='请填写AST'>" +
                    "   </td>" +
                    "   <td>" +
                    "       <input type='number' name='pAlbumin" + pIndex + "' placeholder='请填写白蛋白'>" +
                    "   </td>" +
                    "   <td>" +
                    "       <input type='number' name='pHgb" + pIndex + "' placeholder='请填写Hgb'>" +
                    "   </td>" +
                    "   <td>" +
                    "       <input type='number' name='pHct" + pIndex + "' placeholder='请填写HCT'>" +
                    "   </td>" +
                    "   <td>" +
                    "       <button id='PC-db-pDelete" + pIndex + "' class='pc-btn pc-btn-danger'><i class='iconfont icon-delete'></i></button>" +
                    "   </td>" +
                    "</tr>");
            }, function () {
                const thisPIndex = pIndex;
                laydate.render({
                    elem: "#PC-db-PCT" + thisPIndex,
                    type: "datetime",
                    format: "yyyy-MM-dd HH:mm:ss",
                    max: 1
                });
                // 计算 光疗 次数
                const pTimes = $(".pc-db-HBTCMP .pc-db-table>tbody>tr").length - 1;
                $("#PC-db-PN").val(pTimes);
                // 计算 光疗 总时长
                $("#PC-db-PD" + thisPIndex).on("focusout", function () {
                    computePhototherapyTotalDuration();
                });
                // 删除 光疗 行
                $("#PC-db-pDelete" + thisPIndex).on("click", function () {
                    const that = this;
                    layer.msg("确定要 <span class='pc-db-status-color-no'>删除</span> 此条光疗信息吗?",{
                        icon: 7,
                        time: 0,
                        anim: 6,
                        btn: ["确定", "取消"],
                        resize: false,
                        shade: 0.8,
                        yes: function (index) {
                            $(that).parents("tr").remove();
                            // 计算 光疗 次数
                            const pTimes = $(".pc-db-HBTCMP .pc-db-table>tbody>tr").length - 1;
                            $("#PC-db-PN").val(pTimes);
                            // 计算 光疗 总时长
                            computePhototherapyTotalDuration();
                            layer.close(index);
                        }
                    });
                });
            });
        });

        let eIndex = 0;
        // 初始化 换血
        const eIndexInput = $(".pc-db-HBTCME .pc-db-table>tbody").attr("data-num");
        if (notNullTool(eIndexInput)) {
            eIndex = parseInt(eIndexInput);
            // 为 日期 选择 初始化
            for (let i = 1; i <= eIndex; i++) {
                const thisEIndex = i;
                laydate.render({
                    elem: "#PC-db-EBCT" + thisEIndex,
                    type: "datetime",
                    format: "yyyy-MM-dd HH:mm:ss",
                    max: 1,
                    done: function () {
                        // 计算 血总胆红素峰值、峰值时间
                        computePeakBloodTotalBilirubin();
                    }
                });
                // 计算 换血 总量
                $("#PC-db-EBV" + thisEIndex).on("focusout", function () {
                    computeExchangeBloodTotalAmount();
                });
                // 计算 血总胆红素峰值、峰值时间
                $("#PC-db-EBB" + thisEIndex).on("focusout", function () {
                    computePeakBloodTotalBilirubin();
                });
                // 删除 换血 行
                $("#PC-db-eDelete" + thisEIndex).on("click", function () {
                    const that = this;
                    layer.msg("确定要 <span class='pc-db-status-color-no'>删除</span> 此条换血信息吗?",{
                        icon: 7,
                        time: 0,
                        anim: 6,
                        btn: ["确定", "取消"],
                        resize: false,
                        shade: 0.8,
                        yes: function (index) {
                            $(that).parents("tr").remove();
                            // 计算 换血 次数
                            const ebTimes = $(".pc-db-HBTCME .pc-db-table>tbody>tr").length - 1;
                            $("#PC-db-EBN").val(ebTimes);
                            // 计算 换血 总量
                            computeExchangeBloodTotalAmount();
                            // 计算 血总胆红素峰值、峰值时间
                            computePeakBloodTotalBilirubin();
                            layer.close(index);
                        }
                    });
                });
            }
        }
        // 增加 换血
        $("#PC-db-addEB").on("click", function () {
            const that = this;
            eIndex ++;
            sequentialExecution(function () {
                $(that).parents("tr").before(
                    "<tr>" +
                    "   <td>" +
                    "       <input id='PC-db-EBCT" + eIndex + "' type='text' name='ebCheckTime" + eIndex + "' lay-verify='required' placeholder='请选择换血时间' lay-reqText='请选择换血时间！' readonly>" +
                    "   </td>" +
                    "   <td>" +
                    "       <input id='PC-db-EBV" + eIndex + "' class='pc-db-EBV' type='number' name='exchangeBloodVolume" + eIndex + "' lay-verify='required' placeholder='请填写换血量' lay-reqText='请填写换血量！'>" +
                    "   </td>" +
                    "   <td>" +
                    "       <input type='number' name='eTransdermalBilirubinValue" + eIndex + "' lay-verify='required' placeholder='请填写经皮胆红素值' lay-reqText='请填写经皮胆红素值！'>" +
                    "   </td>" +
                    "   <td>" +
                    "       <input id='PC-db-EBB" + eIndex + "' type='number' name='eBloodTotalBilirubin" + eIndex + "' placeholder='请填写血总胆红素值'>" +
                    "   </td>" +
                    "   <td>" +
                    "       <input type='number' name='eDirectBilirubinValue" + eIndex + "' placeholder='请填写直接胆红素值'>" +
                    "   </td>" +
                    "   <td>" +
                    "       <input type='number' name='eAlt" + eIndex + "' placeholder='请填写ALT'>" +
                    "   </td>" +
                    "   <td>" +
                    "       <input type='number' name='eAst" + eIndex + "' placeholder='请填写AST'>" +
                    "   </td>" +
                    "   <td>" +
                    "       <input type='number' name='eAlbumin" + eIndex + "' placeholder='请填写白蛋白'>" +
                    "   </td>" +
                    "   <td>" +
                    "       <input type='number' name='eHgb" + eIndex + "' placeholder='请填写Hgb'>" +
                    "   </td>" +
                    "   <td>" +
                    "       <input type='number' name='eHct" + eIndex + "' placeholder='请填写HCT'>" +
                    "   </td>" +
                    "   <td>" +
                    "       <button id='PC-db-eDelete" + eIndex + "' class='pc-btn pc-btn-danger'><i class='iconfont icon-delete'></i></button>" +
                    "   </td>" +
                    "</tr>");
            }, function () {
                const thisEIndex = eIndex;
                laydate.render({
                    elem: "#PC-db-EBCT" + thisEIndex,
                    type: "datetime",
                    format: "yyyy-MM-dd HH:mm:ss",
                    max: 1,
                    done: function () {
                        // 计算 血总胆红素峰值、峰值时间
                        computePeakBloodTotalBilirubin();
                    }
                });
                // 计算 换血 次数
                const ebTimes = $(".pc-db-HBTCME .pc-db-table>tbody>tr").length - 1;
                $("#PC-db-EBN").val(ebTimes);
                // 计算 换血 总量
                $("#PC-db-EBV" + thisEIndex).on("focusout", function () {
                    computeExchangeBloodTotalAmount();
                });
                // 计算 血总胆红素峰值、峰值时间
                $("#PC-db-EBB" + thisEIndex).on("focusout", function () {
                    computePeakBloodTotalBilirubin();
                });
                // 删除 换血 行
                $("#PC-db-eDelete" + thisEIndex).on("click", function () {
                    const that = this;
                    layer.msg("确定要 <span class='pc-db-status-color-no'>删除</span> 此条换血信息吗?",{
                        icon: 7,
                        time: 0,
                        anim: 6,
                        btn: ["确定", "取消"],
                        resize: false,
                        shade: 0.8,
                        yes: function (index) {
                            $(that).parents("tr").remove();
                            // 计算 换血 次数
                            const ebTimes = $(".pc-db-HBTCME .pc-db-table>tbody>tr").length - 1;
                            $("#PC-db-EBN").val(ebTimes);
                            // 计算 换血 总量
                            computeExchangeBloodTotalAmount();
                            // 计算 血总胆红素峰值、峰值时间
                            computePeakBloodTotalBilirubin();
                            layer.close(index);
                        }
                    });
                });
            });
        });

        // 高胆数据库 高胆治疗 检查指标 添加/编辑 信息 提交
        form.on("submit(HBTCM)", function (data) {
            const doing = "保存信息";
            loading(doing);
            let field = data.field, pArray = [], ebArray = [];
            for (let i = 1; i <= pIndex; i++) {
                if (notNullTool(field["pCheckTime" + i])) {
                    pArray.push({
                        pCheckTime: field["pCheckTime" + i],
                        phototherapyDuration: field["phototherapyDuration" + i],
                        pTransdermalBilirubinValue: field["pTransdermalBilirubinValue" + i],
                        pBloodTotalBilirubin: field["pBloodTotalBilirubin" + i],
                        pDirectBilirubinValue: field["pDirectBilirubinValue" + i],
                        pAlt: field["pAlt" + i],
                        pAst: field["pAst" + i],
                        pAlbumin: field["pAlbumin" + i],
                        pHgb: field["pHgb" + i],
                        pHct: field["pHct" + i]
                    });
                    delete field["pCheckTime" + i];
                    delete field["phototherapyDuration" + i];
                    delete field["pTransdermalBilirubinValue" + i];
                    delete field["pBloodTotalBilirubin" + i];
                    delete field["pDirectBilirubinValue" + i];
                    delete field["pAlt" + i];
                    delete field["pAst" + i];
                    delete field["pAlbumin" + i];
                    delete field["pHgb" + i];
                    delete field["pHct" + i];
                }
            }
            field.pArray = JSON.stringify(pArray);
            for (let i = 1; i <= eIndex; i++) {
                if (notNullTool(field["ebCheckTime" + i])) {
                    ebArray.push({
                        ebCheckTime: field["ebCheckTime" + i],
                        exchangeBloodVolume: field["exchangeBloodVolume" + i],
                        eTransdermalBilirubinValue: field["eTransdermalBilirubinValue" + i],
                        eBloodTotalBilirubin: field["eBloodTotalBilirubin" + i],
                        eDirectBilirubinValue: field["eDirectBilirubinValue" + i],
                        eAlt: field["eAlt" + i],
                        eAst: field["eAst" + i],
                        eAlbumin: field["eAlbumin" + i],
                        eHgb: field["eHgb" + i],
                        eHct: field["eHct" + i]
                    });
                    delete field["ebCheckTime" + i];
                    delete field["exchangeBloodVolume" + i];
                    delete field["eTransdermalBilirubinValue" + i];
                    delete field["eBloodTotalBilirubin" + i];
                    delete field["eDirectBilirubinValue" + i];
                    delete field["eAlt" + i];
                    delete field["eAst" + i];
                    delete field["eAlbumin" + i];
                    delete field["eHgb" + i];
                    delete field["eHct" + i];
                }
            }
            if (!notNullTool(field.peakTime)) {
                delete field.peakTime;
            }
            if (!notNullTool(field.peakBloodTotalBilirubin)) {
                delete field.peakBloodTotalBilirubin;
            }
            field.ebArray = JSON.stringify(ebArray);
            $.post("/perinatalPlatform/highBilirubin/write/HBT/CM/post", data.field, function (back, status) {
                if(status === "success") {
                    if(back.code) {
                        hbSuccessNext(function () {
                            location.href = "/perinatalPlatform/highBilirubin/write/HBT/TS";
                        });
                    }else {failMsg(doing)}
                }else {errorMsg1()}
            }, "json").fail(function () {errorMsg2()});
        });

        // 高胆数据库 高胆治疗 治疗情况 补液持续时间
        form.on("switch(rehydration)", function (data) {
            if (data.elem.checked) {
                $("#PC-db-RD").removeAttr("disabled").attr("name", function () {
                    return $(this).attr("data-name");
                });
            } else {
                $("#PC-db-RD").attr("disabled", true).removeAttr("name value").val("");
            }
        });

        // 高胆数据库 高胆治疗 治疗情况 其他药物
        form.on("switch(OD)", function (data) {
            if (data.elem.checked) {
                $("#PC-db-OD").removeAttr("disabled").attr("lay-verify", "required").attr("name", function () {
                    return $(this).attr("data-name");
                });
            } else {
                $("#PC-db-OD").attr("disabled", true).removeAttr("name lay-verify value").val("");
            }
        });

        // 高胆数据库 高胆治疗 治疗情况 添加/编辑 信息 提交
        form.on("submit(HBTTS)", function (data) {
            const doing = "保存信息",
                field = data.field;
            loading(doing);
            if (!notNullTool(field.rehydrationDuration)) {
                delete field.rehydrationDuration;
            }
            $.post("/perinatalPlatform/highBilirubin/write/HBT/TS/post", field, function (back, status) {
                if(status === "success") {
                    if(back.code) {
                        hbSuccessNext(function () {
                            location.href = "/perinatalPlatform/highBilirubin/write/HBT/ES";
                        });
                    }else {failMsg(doing)}
                }else {errorMsg1()}
            },"json").fail(function () {errorMsg2()});
        });

        // 高胆治疗 脑病评分
        let esIndex = 15;
        const enElem = $(".pc-db-HBTES");
        if (notNullTool(enElem) && enElem.length > 0) {
            let ms0 = [], ms1 = [], ms2 = [], ms3 = [], mt0 = [], mt1 = [], mt2 = [], mt3 = [],
                cf0 = [], cf1 = [], cf2 = [], cf3 = [], allSum = [],
                allDateStamp = date14Day(enElem);
            if (enElem.length > 0) {
                // 产生 14 天日期
                let maxDateStamp = allDateStamp[esIndex - 1];
                // 表格 方块 点击
                blockClick(ms0, ms1, ms2, ms3, mt0, mt1, mt2, mt3, cf0, cf1, cf2, cf3, allSum);

                // 高胆治疗 脑病评分 增加 7 天
                $(".pc-db-HBTES #PC-db-add").on("click", function () {
                    // 增加 7天
                    let max = esIndex + 7, es7DateTdElem = "", thisDateStamp = maxDateStamp,
                        ms0TdElem = "", ms1TdElem = "", ms2TdElem = "", ms3TdElem = "",
                        mt0TdElem = "", mt1TdElem = "", mt2TdElem = "", mt3TdElem = "",
                        cf0TdElem = "", cf1TdElem = "", cf2TdElem  = "", cf3TdElem = "", esColSumElem = "";
                    while (esIndex < max) {
                        // 增加 7天 日期
                        const thisDate = new Date(thisDateStamp),
                            thisDateString = (thisDate.getFullYear() % 100) + "/" + (thisDate.getMonth() + 1) + "/" + thisDate.getDate();
                        es7DateTdElem += "<th>" + thisDateString + "</th>";
                        allDateStamp[esIndex - 1] = thisDateStamp;
                        thisDateStamp += 86400000;
                        // 增加 7天 神志状态
                        ms0TdElem += "<td class='pc-db-table-click'></td>";
                        ms1TdElem += "<td class='pc-db-table-click'></td>";
                        ms2TdElem += "<td class='pc-db-table-click'></td>";
                        ms3TdElem += "<td class='pc-db-table-click'></td>";
                        // 增加 7天 肌张力
                        mt0TdElem += "<td class='pc-db-table-click'></td>";
                        mt1TdElem += "<td class='pc-db-table-click'></td>";
                        mt2TdElem += "<td class='pc-db-table-click'></td>";
                        mt3TdElem += "<td class='pc-db-table-click'></td>";
                        // 增加 7天 哭吵形式
                        cf0TdElem += "<td class='pc-db-table-click'></td>";
                        cf1TdElem += "<td class='pc-db-table-click'></td>";
                        cf2TdElem += "<td class='pc-db-table-click'></td>";
                        cf3TdElem += "<td class='pc-db-table-click'></td>";
                        esColSumElem += "<td>0</td>";
                        esIndex++;
                    }
                    maxDateStamp = thisDateStamp;
                    $(".pc-db-HBTES .pc-db-table.tableRight>thead>tr>.blockTh").before(es7DateTdElem);
                    $(".pc-db-HBTES .pc-db-table.tableRight>tbody>tr.pc-db-MS0").append(ms0TdElem);
                    $(".pc-db-HBTES .pc-db-table.tableRight>tbody>tr.pc-db-MS1").append(ms1TdElem);
                    $(".pc-db-HBTES .pc-db-table.tableRight>tbody>tr.pc-db-MS2").append(ms2TdElem);
                    $(".pc-db-HBTES .pc-db-table.tableRight>tbody>tr.pc-db-MS3").append(mt0TdElem);
                    $(".pc-db-HBTES .pc-db-table.tableRight>tbody>tr.pc-db-MT0").append(mt1TdElem);
                    $(".pc-db-HBTES .pc-db-table.tableRight>tbody>tr.pc-db-MT1").append(mt1TdElem);
                    $(".pc-db-HBTES .pc-db-table.tableRight>tbody>tr.pc-db-MT2").append(mt2TdElem);
                    $(".pc-db-HBTES .pc-db-table.tableRight>tbody>tr.pc-db-MT3").append(mt3TdElem);
                    $(".pc-db-HBTES .pc-db-table.tableRight>tbody>tr.pc-db-CF0").append(cf0TdElem);
                    $(".pc-db-HBTES .pc-db-table.tableRight>tbody>tr.pc-db-CF1").append(cf1TdElem);
                    $(".pc-db-HBTES .pc-db-table.tableRight>tbody>tr.pc-db-CF2").append(cf2TdElem);
                    $(".pc-db-HBTES .pc-db-table.tableRight>tbody>tr.pc-db-CF3").append(cf3TdElem);
                    $(".pc-db-HBTES .pc-db-table.tableRight>tbody>tr>td.pc-db-colBlock").attr("colspan", esIndex - 1);

                    $(".pc-db-HBTES .pc-db-table.tableRight>tbody>tr.pc-db-colSum").append(esColSumElem);

                    // 表格 方块 点击
                    blockClick(ms0, ms1, ms2, ms3, mt0, mt1, mt2, mt3, cf0, cf1, cf2, cf3, allSum);
                });

                // 获取 肠内营养 信息 初始化
                $.get("/perinatalPlatform/highBilirubin/write/HBT/ES/getData", function (back, status) {
                    if (status === "success") {
                        if (back.code) {
                            const esDataList = back.esDataList;
                            if (esDataList.length > 0) {
                                layer.msg("入院日期等信息 修改后，请务必再次保存此页！");
                            }
                            // 遍历 列表
                            for (const i in esDataList) {
                                const thisEsData = esDataList[i],
                                    day = thisEsData.day,
                                    mindState0 = thisEsData.mindState0,
                                    mindState1 = thisEsData.mindState1,
                                    mindState2 = thisEsData.mindState2,
                                    mindState3 = thisEsData.mindState3,
                                    muscleTension0 = thisEsData.muscleTension0,
                                    muscleTension1 = thisEsData.muscleTension1,
                                    muscleTension2 = thisEsData.muscleTension2,
                                    muscleTension3 = thisEsData.muscleTension3,
                                    cryForm0 = thisEsData.cryForm0,
                                    cryForm1 = thisEsData.cryForm1,
                                    cryForm2 = thisEsData.cryForm2,
                                    cryForm3 = thisEsData.cryForm3,
                                    allSum = thisEsData.allSum;
                                let inputLength = $(".pc-db-HBTES .pc-db-table tr.pc-db-MS0>td").length,
                                    inputBlockLength = inputLength / 7;
                                // 检测 是否 要增加7天
                                while (Math.ceil(day / 7) > inputBlockLength) {
                                    $("#PC-db-add").click();
                                    inputLength = $(".pc-db-HBTES .pc-db-table tr.pc-db-MS0>td").length;
                                    inputBlockLength = inputLength / 7;
                                }
                                // 填充 表格
                                if (notNullTool(mindState0) && mindState0 == 1) {
                                    ms0[day - 1] = 1;
                                    const thisTdElem = $(".pc-db-HBTES .pc-db-table tr.pc-db-MS0>td:eq(" + (day - 1) + ")");
                                    if (!$(thisTdElem).hasClass("pc-db-active")) {
                                        $(thisTdElem).click();
                                    }
                                }
                                if (notNullTool(mindState1) && mindState1 == 1) {
                                    ms1[day - 1] = 1;
                                    const thisTdElem = $(".pc-db-HBTES .pc-db-table tr.pc-db-MS1>td:eq(" + (day - 1) + ")");
                                    if (!$(thisTdElem).hasClass("pc-db-active")) {
                                        $(thisTdElem).click();
                                    }
                                }
                                if (notNullTool(mindState2) && mindState2 == 1) {
                                    ms2[day - 1] = 1;
                                    const thisTdElem = $(".pc-db-HBTES .pc-db-table tr.pc-db-MS2>td:eq(" + (day - 1) + ")");
                                    if (!$(thisTdElem).hasClass("pc-db-active")) {
                                        $(thisTdElem).click();
                                    }
                                }
                                if (notNullTool(mindState3) && mindState3 == 1) {
                                    ms3[day - 1] = 1;
                                    const thisTdElem = $(".pc-db-HBTES .pc-db-table tr.pc-db-MS3>td:eq(" + (day - 1) + ")");
                                    if (!$(thisTdElem).hasClass("pc-db-active")) {
                                        $(thisTdElem).click();
                                    }
                                }
                                if (notNullTool(muscleTension0) && muscleTension0 == 1) {
                                    mt0[day - 1] = 1;
                                    const thisTdElem = $(".pc-db-HBTES .pc-db-table tr.pc-db-MT0>td:eq(" + (day - 1) + ")");
                                    if (!$(thisTdElem).hasClass("pc-db-active")) {
                                        $(thisTdElem).click();
                                    }
                                }
                                if (notNullTool(muscleTension1) && muscleTension1 == 1) {
                                    mt1[day - 1] = 1;
                                    const thisTdElem = $(".pc-db-HBTES .pc-db-table tr.pc-db-MT1>td:eq(" + (day - 1) + ")");
                                    if (!$(thisTdElem).hasClass("pc-db-active")) {
                                        $(thisTdElem).click();
                                    }
                                }
                                if (notNullTool(muscleTension2) && muscleTension2 == 1) {
                                    mt2[day - 1] = 1;
                                    const thisTdElem = $(".pc-db-HBTES .pc-db-table tr.pc-db-MT2>td:eq(" + (day - 1) + ")");
                                    if (!$(thisTdElem).hasClass("pc-db-active")) {
                                        $(thisTdElem).click();
                                    }
                                }
                                if (notNullTool(muscleTension3) && muscleTension3 == 1) {
                                    mt3[day - 1] = 1;
                                    const thisTdElem = $(".pc-db-HBTES .pc-db-table tr.pc-db-MT3>td:eq(" + (day - 1) + ")");
                                    if (!$(thisTdElem).hasClass("pc-db-active")) {
                                        $(thisTdElem).click();
                                    }
                                }
                                if (notNullTool(cryForm0) && cryForm0 == 1) {
                                    cf0[day - 1] = 1;
                                    const thisTdElem = $(".pc-db-HBTES .pc-db-table tr.pc-db-CF0>td:eq(" + (day - 1) + ")");
                                    if (!$(thisTdElem).hasClass("pc-db-active")) {
                                        $(thisTdElem).click();
                                    }
                                }
                                if (notNullTool(cryForm1) && cryForm1 == 1) {
                                    cf1[day - 1] = 1;
                                    const thisTdElem = $(".pc-db-HBTES .pc-db-table tr.pc-db-CF1>td:eq(" + (day - 1) + ")");
                                    if (!$(thisTdElem).hasClass("pc-db-active")) {
                                        $(thisTdElem).click();
                                    }
                                }
                                if (notNullTool(cryForm2) && cryForm2 == 1) {
                                    cf2[day - 1] = 1;
                                    const thisTdElem = $(".pc-db-HBTES .pc-db-table tr.pc-db-CF2>td:eq(" + (day - 1) + ")");
                                    if (!$(thisTdElem).hasClass("pc-db-active")) {
                                        $(thisTdElem).click();
                                    }
                                }
                                if (notNullTool(cryForm3) && cryForm3 == 1) {
                                    cf3[day - 1] = 1;
                                    const thisTdElem = $(".pc-db-HBTES .pc-db-table tr.pc-db-CF3>td:eq(" + (day - 1) + ")");
                                    if (!$(thisTdElem).hasClass("pc-db-active")) {
                                        $(thisTdElem).click();
                                    }
                                }
                                if (notNullTool(allSum) && allSum == 1) {
                                    allSum[day - 1] = 1;
                                }
                            }
                        }
                    }
                }, "json");
            }

            // 高胆数据库 高胆治疗 脑病评分 添加/编辑 信息 提交
            form.on("submit(HBTES)", function () {
                const doing = "保存信息";
                loading(doing);
                let esDataArray = [];
                for (let i = 1; i <= esIndex; i++) {
                    if (notNullTool(ms0[i - 1]) || notNullTool(ms1[i - 1]) || notNullTool(ms2[i - 1]) || notNullTool(ms3[i - 1]) ||
                        notNullTool(mt0[i - 1]) || notNullTool(mt1[i - 1]) || notNullTool(mt2[i - 1]) || notNullTool(mt3[i - 1]) ||
                        notNullTool(cf0[i - 1]) || notNullTool(cf1[i - 1]) || notNullTool(cf2[i - 1]) || notNullTool(cf3[i - 1]) ||
                        notNullTool(allSum[i - 1])) {
                        const thisDateStamp = allDateStamp[i - 1],
                            thisDateString = dateFormatDay(thisDateStamp);
                        esDataArray.push({
                            day: i,
                            thisDate: thisDateString,
                            mindState0: ms0[i - 1],
                            mindState1: ms1[i - 1],
                            mindState2: ms2[i - 1],
                            mindState3: ms3[i - 1],
                            muscleTension0: mt0[i - 1],
                            muscleTension1: mt1[i - 1],
                            muscleTension2: mt2[i - 1],
                            muscleTension3: mt3[i - 1],
                            cryForm0: cf0[i - 1],
                            cryForm1: cf1[i - 1],
                            cryForm2: cf2[i - 1],
                            cryForm3: cf3[i - 1],
                            allSum: allSum[i - 1]
                        });
                    }
                }
                const field = {esDataArray: JSON.stringify(esDataArray)};
                $.post("/perinatalPlatform/highBilirubin/write/HBT/ES/post", field, function (back, status) {
                    if(status === "success") {
                        if(back.code) {
                            hbSuccessNext(function () {
                                location.href = "/perinatalPlatform/highBilirubin/write/HBT/HBR";
                            });
                        }else {failMsg(doing)}
                    }else {errorMsg1()}
                },"json").fail(function () {errorMsg2()});
            });
        }

        const hbThBr = $(".pc-db-HBTHBR");
        if (notNullTool(hbThBr) && hbThBr.length > 0) {
            // 高胆数据库 高胆治疗 高胆原因 母婴同室出院时间，计算 母婴同室出院 生后时间
            const birthdayInput = $(hbThBr).attr("data-birthday");
            let birthdayStamp = 0;
            if (notNullTool(birthdayInput)) {
                birthdayStamp = Date.parse(birthdayInput);
            } else {
                layer.msg("请先完善 患儿出生日期！", {
                    icon: 7,
                    time: 0,
                    anim: 6,
                    btn: "好!",
                    resize: false,
                    shade: 0.8
                }, function () {
                    location.href = "/perinatalPlatform/highBilirubin/write/HBT/BI";
                });
            }
            laydate.render({
                elem: "#PC-db-MBSRDT",
                type: "datetime",
                format: "yyyy-MM-dd HH:mm:ss",
                max: 1,
                done: function(value, date) {
                    if(value !== "") {
                        const mbsrDischargeTime = date.year + "-" + date.month + "-" + date.date +  ' ' + date.hours + ':' + date.minutes + ':' + date.seconds,
                            mbsrDischargeTimeStamp = Date.parse(mbsrDischargeTime);
                        if (birthdayStamp > 0) {
                            // 计算 母婴同室出院 生后时间
                           $("#PC-db-MBSRDTAB").val(Math.floor((mbsrDischargeTimeStamp - birthdayStamp) / 3600000));
                        }
                    }
                }
            });

            // 高胆数据库 高胆治疗 高胆原因 添加/编辑 信息 提交
            form.on("submit(HBTHBR)", function (data) {
                const doing = "保存信息";
                loading(doing);
                $.post("/perinatalPlatform/highBilirubin/write/HBT/HBR/post", data.field, function (back, status) {
                    if (status === "success") {
                        if (back.code) {
                            hbSuccessNext(function () {
                                location.href = "/perinatalPlatform/highBilirubin/write/HBT/AE";
                            });
                        } else {failMsg(doing)}
                    } else {errorMsg1()}
                }, "json").fail(function () {errorMsg2()});
            });
        }

        // 高胆数据库 高胆治疗 辅助检查 MRI结果
        $("#PC-db-MRIR>ul>li").on("click", function () {
           if ($(this).attr("data-value") === "其他") {
               $("#PC-db-MRIRO").removeAttr("disabled").attr("lay-verify", "requiredDB").attr("name", function () {
                  return $(this).attr("data-name");
               });
           } else {
               $("#PC-db-MRIRO").removeAttr("lay-verify name value").attr("disabled", true).val("");
           }
        });

        // 高胆数据库 高胆治疗 辅助检查 添加/编辑 信息 提交
        form.on("submit(HBTAE)", function (data) {
            const doing = "保存信息";
            loading(doing);
            let field = data.field;
            for (const i in field) {
                if (!notNullTool(field[i])) {
                    delete field[i];
                }
            }
            $.post("/perinatalPlatform/highBilirubin/write/HBT/AE/post", field, function (back, status) {
                if (status === "success") {
                    if (back.code) {
                        hbSuccessNext(function () {
                            location.href = "/perinatalPlatform/highBilirubin/write/HBT/DS";
                        });
                    } else {failMsg(doing)}
                } else {errorMsg1()}
            }, "json").fail(function () {errorMsg2()});
        });

        // 高胆数据库 高胆治疗 出院情况 脑病发病日龄
        laydate.render({
            elem: "#PC-db-ET",
            type: "datetime",
            format: "yyyy-MM-dd HH:mm:ss",
            max: 1
        });

        // 高胆数据库 高胆治疗 出院情况 出院时间
        laydate.render({
            elem: "#PC-db-DT",
            type: "datetime",
            format: "yyyy-MM-dd HH:mm:ss",
            max: 1
        });

        // 高胆数据库 高胆治疗 出院情况 添加/编辑 信息 提交
        form.on("submit(HBTDS)", function (data) {
            const doing = "保存信息";
            loading(doing);
            $.post("/perinatalPlatform/highBilirubin/write/HBT/DS/post", data.field, function (back, status) {
                if (status === "success") {
                    if (back.code) {
                        hbSuccessNext(function () {
                            location.href = "/perinatalPlatform/highBilirubin/write/FUE/MRIE";
                        });
                    } else {failMsg(doing)}
                } else {errorMsg1()}
            }, "json").fail(function () {errorMsg2()});
        });
    });
});