function buildData(findData, data, i, index) {
    if (i < index.length) {
        const findKey = findData[index[i]].key,
            findLabel = findData[index[i]].label;
        let thisIndex = -1;
        if (notNullTool(data) && data.length > 0) {
            for (let j = 0; j < data.length; j++) {
                if (data[j].key === findKey) {
                    thisIndex = j;
                    break;
                }
            }
            if (thisIndex > -1) {
                data[thisIndex].children = buildData(findData[index[i]].children, data[thisIndex].children, ++i, index);
                return data;
            } else {
                let json = {};
                json.key = findKey;
                json.label = findLabel;
                json.children = buildData(findData[index[i]].children, null, ++i, index);
                data.push(json);
                return data;
            }
        } else {
            let data = [], json = {};
            json.key = findKey;
            json.label = findLabel;
            json.children = buildData(findData[index[i]].children, null, ++i, index);
            data.push(json);
            return data;
        }
    } else {
        if (notNullTool(findData) && findData.length > 0) {
            return findData;
        }
    }
}
function deleteData(findData, data, i, index) {
    if (i < index.length) {
        const findKey = findData[index[i]].key;
        let thisIndex = -1;
        if (data.length > 0) {
            for (let j = 0; j < data.length; j++) {
                if (data[j].key === findKey) {
                    thisIndex = j;
                    break;
                }
            }
            if (thisIndex > -1) {
                if (data[thisIndex].hasOwnProperty("children") && data[thisIndex].children !== undefined) {
                    const children = deleteData(findData[index[i]].children, data[thisIndex].children, ++i, index);
                    if (children !== undefined) {
                        data[thisIndex].children = children;
                    } else {
                        data.splice(thisIndex, 1);
                    }
                } else {
                    data.splice(thisIndex, 1);
                }
                if (data.length > 0) {
                    return data;
                }
            }
        }
    }
}
$(document).ready(function() {
    const date = new Date(),
        startDate = date.getFullYear() + "-01-01 00:00:00",
        endDate = dateFormat(date);
    // 填充 入院 日期范围
    $("#PC-db-dateInput-start").val(startDate);
    $("#PC-db-dateInput-end").val(endDate);

    // layui 设置
    layui.config({
        base: "/utils/layui/extend/"
    }).extend({
        eleTree: "eleTree",
        xmSelect:"xm-select"
    });

    // 引入 layui
    layui.use(["element", "table", "form", "laydate", "xmSelect", "eleTree"], function () {
        let table = layui.table,
            laydate = layui.laydate,
            layer = layui.layer,
            form = layui.form,
            xmSelect = layui.xmSelect,
            eleTree = layui.eleTree,
            childId = 0, motherId = 0;

        // 入院日期范围选择
        laydate.render({
            elem: "#PC-db-date",
            type: "datetime",
            format: "yyyy-MM-dd HH:mm:ss",
            max: 1,
            range: ["#PC-db-dateInput-start", "#PC-db-dateInput-end"]
        });

        // 查询病例
        if ($("#PC-db-table-caseInquiry").length > 0) {
            // 查询病例表格
            let getCaseInquiryUrl = "/perinatalPlatform/getCase",
                caseInquiryOptions = {
                    elem: "#PC-db-table-caseInquiry",
                    id: "PC-db-table-caseInquiry",
                    skin: "line",
                    url: getCaseInquiryUrl + "?selectType=motherHospitalizationDate&startDate=" + startDate + "&endDate=" + endDate,
                    even: true,
                    loading: true,
                    page: true,
                    limit: 10,
                    cols: [[
                        {field: "mid", hide: true},
                        {field: "cid", hide: true},
                        {field: "pcMotherNum", minWidth: 144, title: "围产新生儿科研合作平台母亲编号", sort: true},
                        {field: "pcNewbornNum", minWidth: 158, title: "围产新生儿科研合作平台新生儿编号", sort: true},
                        {field: "fullName", minWidth: 100, title: "新生儿姓名"},
                        {field: "gender", minWidth: 58, width: 58, title: "性别"},
                        {field: "gestationalAge", minWidth: 88, width: 88, title: "胎龄", templet: "#PC-db-gestationalAge"},
                        {field: "birthWeight", minWidth: 94, title: "体重（g）", templet: "#PC-db-birthWeight"},
                        {field: "motherHospitalizationDate", minWidth: 160, title: "母亲入院时间"},
                        {field: "birthday", minWidth: 160, title: "新生儿出生日期"},
                        {field: "childHospitalizationDate", minWidth: 160, title: "新生儿住院日期"},
                        {field: "childHospitalNum", minWidth: 114, title: "新生儿住院号"},
                        {field: "dischargeDate", minWidth: 160, title: "新生儿出院日期", templet: "#PC-db-hospitalized"},
                        {field: "status", minWidth: 100, title: "状态", templet: "#PC-db-status"},
                        {
                            field: "tool",
                            minWidth: 100,
                            title: "编辑&nbsp;&nbsp;&nbsp;删除",
                            fixed: "right",
                            toolbar: "#PC-db-toolbar"
                        }
                    ]]
                };

            table.render(caseInquiryOptions);

            // 筛选 表格
            let fieldData;
            form.on("submit(dbFilter)", function (data) {
                fieldData = data.field;
                caseInquiryOptions.url = getCaseInquiryUrl + "?selectType=" + fieldData.selectType + "&startDate=" + fieldData.startDate + "&endDate=" +
                    fieldData.endDate + "&caseStatus=" + fieldData.caseStatus + "&inHospital=" + fieldData.inHospital;
                table.reload(caseInquiryOptions.id, caseInquiryOptions);
                return false;
            });

            // 首页 搜索 病历 初始化
            const searchKey = window.sessionStorage.getItem("searchKey");
            if (notNullTool(searchKey)) {
                $("#PC-db-SK").val(searchKey);
                caseInquiryOptions.url = getCaseInquiryUrl + "?searchKey=" + searchKey;
                window.sessionStorage.removeItem("searchKey");
                table.reload(caseInquiryOptions.id, caseInquiryOptions);
            }
            // 搜索 病历
            form.on("submit(search)", function (data) {
                caseInquiryOptions.url = getCaseInquiryUrl + "?searchKey=" + data.field.searchKey;
                table.reload(caseInquiryOptions.id, caseInquiryOptions);
                return false;
            });

            // 获取 CSV
            $("#PC-db-case-csv").on("click", function () {
                loading("导出病例");
                let thisStartDate = "", thisEndDate = "", caseStatus = "", inHospital = "", selectType = "";
                sequentialExecution(function () {
                    let startDateInput = null, endDateInput = null;
                    try {
                        startDateInput = $("#PC-db-dateInput-start").val();
                    } catch (e) {}
                    try {
                        endDateInput = $("#PC-db-dateInput-end").val();
                    } catch (e) {}
                    try {
                        caseStatus = $("select[name=caseStatus]").val();
                    } catch (e) {}
                    try {
                        inHospital = $("select[name=inHospital]").val();
                    } catch (e) {}
                    if (notNullTool(startDateInput) && notNullTool(endDateInput)) {
                        thisStartDate = startDateInput;
                        thisEndDate = endDateInput;
                    } else {
                        thisStartDate = startDate;
                        thisEndDate = endDate;
                    }
                    selectType = $("select[name=selectType]").val();
                }, function () {
                    $.get(getCaseInquiryUrl + "?selectType=" + selectType + "&startDate=" + thisStartDate + "&endDate=" +
                        thisEndDate + "&caseStatus=" + caseStatus + "&inHospital=" + inHospital, function (back, status) {
                        if (status === "success") {
                            if (!back.code) {
                                let backData = back.data, data = [];
                                for (let i in backData) {
                                    const thisBackData = backData[i];
                                    let gestationalAge = "", birthWeight = "", motherHospitalizationDate = "",
                                        birthday = "", childHospitalizationDate = "", dischargeSituation = "", status = "";
                                    // 胎龄
                                    if (notNullTool(thisBackData.gestationalAgeWeek) && thisBackData.gestationalAgeWeek > 0) {
                                        gestationalAge = thisBackData.gestationalAgeWeek + "周" + thisBackData.gestationalAgeDay + "天";
                                    }
                                    // 体重
                                    if (notNullTool(thisBackData.birthWeight) && thisBackData.birthWeight > 0) {
                                        birthWeight = thisBackData.birthWeight;
                                    }
                                    // 出院情况
                                    if (thisBackData.whetherHospitalized == 1) {
                                        if (notNullTool(thisBackData.dischargeDate)) {
                                            dischargeSituation = "\t" + dateFormat(Date.parse(thisBackData.dischargeDate)) + "\t";
                                        } else {
                                            dischargeSituation = "在院";
                                        }
                                    } else {
                                        dischargeSituation = "未住院";
                                    }
                                    // 填写情况
                                    if (thisBackData.status === 0) {
                                        status = "正在填写";
                                    }else if (thisBackData.status === 1) {
                                        status = "填写完成";
                                    }else if (thisBackData.status === 2) {
                                        status = "审核不通过";
                                    }else if (thisBackData.status === 3) {
                                        status = "审核通过";
                                    }
                                    if (notNullTool(thisBackData.motherHospitalizationDate)) {
                                        motherHospitalizationDate = "\t" + dateFormat(Date.parse(thisBackData.motherHospitalizationDate)) + "\t";
                                    }
                                    if (notNullTool(thisBackData.birthday)) {
                                        birthday = "\t" + dateFormat(Date.parse(thisBackData.motherHospitalizationDate)) + "\t";
                                    }
                                    if (notNullTool(thisBackData.childHospitalizationDate)) {
                                        childHospitalizationDate = "\t" + dateFormat(Date.parse(thisBackData.childHospitalizationDate)) + "\t" ;
                                    }
                                    data.push([hasOrEmpty(thisBackData.pcMotherNum), hasOrEmpty(thisBackData.pcNewbornNum), hasOrEmpty(thisBackData.fullName),
                                        hasOrEmpty(thisBackData.gender), gestationalAge, birthWeight, motherHospitalizationDate,
                                        birthday, childHospitalizationDate, hasOrEmpty(thisBackData.childHospitalNum), dischargeSituation, status]);
                                }
                                layer.closeAll();
                                const date = new Date();
                                table.exportFile(["围产新生儿科研合作平台母亲编号", "围产新生儿科研合作平台新生儿编号", "新生儿姓名", "性别", "胎龄", "体重（g）",
                                    "母亲入院时间", "新生儿出生日期", "新生儿住院日期", "新生儿住院号", "新生儿出院日期", "状态"], data,
                                    {
                                        type: "csv",
                                        title: "病例信息_" + date.getFullYear() + "年" + (date.getMonth() + 1) + "月" + date.getDate() + "日" +
                                            date.getHours() + "时" + date.getMinutes() + "分" + date.getSeconds() + "秒"
                                    });
                            } else {failMsg("导出数据")}
                        } else {errorMsg1()}
                    }, "json").fail(function () {errorMsg2()});
                });
            });

            //工具条事件
            table.on("tool(PC-db-table-caseInquiry)", function (obj) {
                let data = obj.data,
                    layEvent = obj.event;
                if (layEvent === "edit") {
                    $.get("/perinatalPlatform/setChildIdSession?motherId=" + data.mid + "&childId=" + data.cid, function (back, status) {
                        if (status === "success") {
                            if (back.code) {
                                location.href = "/perinatalPlatform/basicDatabase/write/MI";
                            } else {errorMsg1()}
                        } else {errorMsg1()}
                    }, "json").fail(function () {errorMsg2()});
                } else if (layEvent === "delete") {
                    let caseNum;
                    if (data.pcNewbornNum !== null && data.pcNewbornNum !== "" && data.pcNewbornNum !== undefined) {
                        caseNum = data.pcNewbornNum;
                    } else if (data.pcMotherNum !== null && data.pcMotherNum !== "" && data.pcMotherNum !== undefined) {
                        caseNum = data.pcMotherNum;
                    }
                    layer.msg("确定要 <span class='pc-db-status-color-no'>删除</span> 编号<span class='layui-badge layui-bg-blue'> " + caseNum + "</span>的病例信息吗?", {
                        icon: 7,
                        time: 0,
                        anim: 6,
                        btn: ["确定", "取消"],
                        resize: false,
                        shade: 0.8,
                        yes: function (index) {
                            layer.close(index);
                            childId = data.cid;
                            motherId = data.mid;
                            layer.open({
                                title: "请输入密码！",
                                type: 1,
                                shade: 0.8,
                                content: $("#PC-db-deletePwd"),
                                resize: false
                            });
                        }
                    });
                }
            });

            // 提交 删除 密码
            form.on("submit(deleteMsg)", function (data) {
                if (childId > 0 || motherId > 0) {
                    data.field.childId = childId;
                    data.field.motherId = motherId;
                    $.post("/perinatalPlatform/deleteCase", data.field, function (back, status) {
                        if (status === "success") {
                            if (back.code) {
                                successMsg("删除病例成功！", function () {
                                    layer.closeAll();
                                    table.reload("PC-db-table-caseInquiry", caseInquiryOptions, true);
                                })
                            } else {errorMsg(back.errorMsg)}
                        } else {errorMsg1()}
                    }, "json").fail(function () {errorMsg2()});
                }
                return false;
            });
        }

        // 报表导出
        if ($("#PC-db-table-reportExport").length > 0) {
            // 报表导出 表格
            let getReportExportUrl = "/perinatalPlatform/reportExport/getReportExport",
                reportExportOptions = {
                    elem: "#PC-db-table-reportExport",
                    id: "PC-db-table-reportExport",
                    skin: "line",
                    url: getReportExportUrl + "?selectType=motherHospitalizationDate&startDate=" + startDate + "&endDate=" + endDate,
                    even: true,
                    loading: true,
                    page: true,
                    limit: 10,
                    cols: [[
                        {field: "hid", hide: true},
                        {field: "abbreviation", minWidth: 144, width: 144, title: "医院编号", sort: true},
                        {field: "hospitalName", minWidth: 158, title: "医院名称"},
                        {field: "caseNumber", minWidth: 144, width: 144, title: "合计", sort: true},
                        {field: "writing", minWidth: 144, width: 144, title: "正在填写", sort: true},
                        {field: "completed", minWidth: 144, width: 144, title: "填写完成", sort: true},
                        {field: "reviewPass", minWidth: 144, width: 144, title: "审核通过", sort: true},
                        {field: "reviewReject", minWidth: 144, width: 144, title: "审核不通过", sort: true}
                    ]]
                };

            table.render(reportExportOptions);

            // 获取 总数据
            $.get("/perinatalPlatform/reportExport/getTotalReportExport?selectType=motherHospitalizationDate&startDate=" +
                startDate + "&endDate=" + endDate, function (back, status) {
                if (status === "success") {
                    if (back.code) {
                        let data = back.data;
                        $("#PC-re-casesTotalNumber").text(data.caseNumber);
                        $("#PC-re-writing").text(data.writing);
                        $("#PC-re-completed").text(data.completed);
                        $("#PC-re-reviewPass").text(data.reviewPass);
                        $("#PC-re-reviewReject").text(data.reviewReject);
                    }
                }
            }, "json").fail(function () {errorMsg2()});

            // 筛选 表格
            let fieldData;
            form.on("submit(reFilter)", function (data) {
                fieldData = data.field;
                // 表格 重载
                reportExportOptions.url = getReportExportUrl + "?selectType=" + fieldData.selectType + "&startDate=" +
                    fieldData.startDate + "&endDate=" + fieldData.endDate + "&inHospital=" + fieldData.inHospital;
                table.reload("PC-db-table-reportExport", reportExportOptions);
                // 总数据 重载
                $.get("/perinatalPlatform/reportExport/getTotalReportExport?selectType=motherHospitalizationDate&startDate=" +
                    fieldData.startDate + "&endDate=" + fieldData.endDate + "&inHospital=" + fieldData.inHospital, function (back, status) {
                    if (status === "success") {
                        if (back.code) {
                            let data = back.data;
                            $("#PC-re-casesTotalNumber").text(data.caseNumber);
                            $("#PC-re-writing").text(data.writing);
                            $("#PC-re-completed").text(data.completed);
                            $("#PC-re-reviewPass").text(data.reviewPass);
                            $("#PC-re-reviewReject").text(data.reviewReject);
                        }
                    }
                }, "json").fail(function () {errorMsg2()});
                return false;
            });

            // 获取 CSV
            $("#PC-db-re-csv").on("click", function () {
                let thisStartDate = "", thisEndDate = "", inHospital = "", selectType = "";
                sequentialExecution(function () {
                    let startDateInput = null, endDateInput = null;
                    try {
                        startDateInput = $("#PC-db-dateInput-start").val();
                    } catch (e) {}
                    try {
                        endDateInput = $("#PC-db-dateInput-end").val();
                    } catch (e) {}
                    if (notNullTool(startDateInput) && notNullTool(endDateInput)) {
                        thisStartDate = startDateInput;
                        thisEndDate = endDateInput;
                    } else {
                        thisStartDate = startDate;
                        thisEndDate = endDate;
                    }
                    try {
                        inHospital = $("select[name=inHospital]").val();
                    } catch (e) {}
                    selectType = $("select[name=selectType]").val();
                }, function () {
                    $.get(getReportExportUrl + "?selectType=" + selectType + "&startDate=" + thisStartDate + "&endDate=" +
                        thisEndDate + "&inHospital=" + inHospital, function (back, status) {
                        if (status === "success") {
                            if (!back.code) {
                                let backData = back.data, data = [];
                                for (let i in backData) {
                                    const thisBackData = backData[i];
                                    data.push([hasOrEmpty(thisBackData.abbreviation), hasOrEmpty(thisBackData.hospitalName),
                                        hasOrEmpty(thisBackData.caseNumber), hasOrEmpty(thisBackData.writing),
                                        hasOrEmpty(thisBackData.completed), hasOrEmpty(thisBackData.reviewPass),
                                        hasOrEmpty(thisBackData.reviewReject)]);
                                }
                                layer.closeAll();
                                const date = new Date();
                                table.exportFile(["医院编号", "医院名称", "合计", "正在填写", "填写完成", "审核通过","审核不通过"], data,
                                    {
                                        type: "csv",
                                        title: "报表导出_" + date.getFullYear() + "年" + (date.getMonth() + 1) + "月" + date.getDate() + "日" +
                                            date.getHours() + "时" + date.getMinutes() + "分" + date.getSeconds() + "秒"
                                    });
                            } else {failMsg("导出数据")}
                        } else {errorMsg1()}
                    }, "json").fail(function () {errorMsg2()});
                });
            });
        }

        // 选择 区域 下属医院
        form.on("checkbox(hospitalCheckboxAll)", function (data) {
            let hospitalCheckboxArray = $(data.elem).parents(".layui-row").children(".layui-col-xs8").children(".pc-admin-hospitalCheckbox").children(".layui-form-checkbox");
            if (data.elem.checked) {
                for (let i = 0; i < hospitalCheckboxArray.length; i++) {
                    if (!$(hospitalCheckboxArray[i]).hasClass("layui-form-checked")) {
                        $(hospitalCheckboxArray[i]).click();
                    }
                }
            } else {
                for (let i = 0; i < hospitalCheckboxArray.length; i++) {
                    if ($(hospitalCheckboxArray[i]).hasClass("layui-form-checked")) {
                        $(hospitalCheckboxArray[i]).click();
                    }
                }
            }
        });

        // 选择 区域 下属医院 时 处理 区域选择
        form.on("checkbox(allHospital)", function (data) {
            let hospitalArray = $(data.elem).parent(".pc-admin-hospitalCheckbox").siblings(".pc-admin-hospitalCheckbox").children(".layui-form-checkbox"),
                j = 0;
            const areaCheckboxElem = $(data.elem).parent(".pc-admin-hospitalCheckbox").parent("div").prev("div").children(".layui-form-checkbox");
            if (data.elem.checked) {
                for (let i = 0; i < hospitalArray.length; i++) {
                    if (!$(hospitalArray[i]).hasClass("layui-form-checked")) {
                        j++;
                    }
                }
                if (j === 0 && !$(areaCheckboxElem).hasClass("layui-form-checked")) {
                    $(areaCheckboxElem).addClass("layui-form-checked");
                }
            } else {
                for (let i = 0; i < hospitalArray.length; i++) {
                    if ($(hospitalArray[i]).hasClass("layui-form-checked")) {
                        j++;
                    }
                }
                if (j === 0 && $(areaCheckboxElem).hasClass("layui-form-checked")) {
                    $(areaCheckboxElem).removeClass("layui-form-checked");
                }
            }
        });

        // 医院选择 下拉框
        $(".pc-case-export .pc-select-board.board1>.pc-select-board-title>div:first-child").on("click", function () {
            const boardElem = $(".pc-case-export .pc-select-board.board1");
            if ($(boardElem).hasClass("lg")) {
                $(boardElem).removeClass("lg").height(36);
            } else {
                $(boardElem).addClass("lg").height(function () {
                    const boardChildrenElem = $(boardElem).children("div");
                    let heightSum = 0;
                    for (let i = 0; i < $(boardChildrenElem).length; i++) {
                        heightSum += $(boardChildrenElem[i]).height();
                    }
                    return heightSum + 20;
                });
            }
        });

        // 数据 导出
        if ($(".pc-case-export.data").length > 0) {
            // 模板 数据
            const basicDatabase = {
                data: [{
                    label: "基础数据库",
                    key: "pc_bd_",
                    children: [{
                        label: "母亲信息",
                        key: "mother_information",
                        children: [{
                            label: "母亲姓名",
                            key: "motherFullName"
                        }, {
                            label: "母亲手机号",
                            key: "motherPhone"
                        }, {
                            label: "母亲年龄",
                            key: "motherAge"
                        }, {
                            label: "母亲住院号",
                            key: "motherHospitalNumber"
                        }, {
                            label: "母亲民族",
                            key: "motherNation"
                        }, {
                            label: "母亲居住地（省级行政区）",
                            key: "motherLiveProvince"
                        }, {
                            label: "母亲居住地（地级行政区）",
                            key: "motherLiveCity"
                        }, {
                            label: "母亲居住地（县级行政区）",
                            key: "motherLiveCounty"
                        }, {
                            label: "母亲居住区域",
                            key: "motherLiveArea"
                        }, {
                            label: "母亲居住区域海拔",
                            key: "motherLiveAltitude"
                        }, {
                            label: "迁入居住地史",
                            key: "toResidencePlaceHistory"
                        }, {
                            label: "迁入年份",
                            key: "moveInYear"
                        }, {
                            label: "迁入年限",
                            key: "moveInPeriod"
                        }, {
                            label: "迁入前居住地（省级行政区）",
                            key: "beforeMovingInLiveProvince"
                        }, {
                            label: "迁入前居住地（地级行政区）",
                            key: "beforeMovingInLiveCity"
                        }, {
                            label: "迁入前居住地（县级行政区）",
                            key: "beforeMovingInLiveCounty"
                        }, {
                            label: "迁入前居住地海拔",
                            key: "beforeMovingInLiveAltitude"
                        }, {
                            label: "糖尿病",
                            key: "diabetes"
                        }, {
                            label: "糖尿病（等级）",
                            key: "diabetesGrade"
                        }, {
                            label: "胰岛素治疗",
                            key: "insulinTherapy"
                        }, {
                            label: "高血压",
                            key: "hypertension"
                        }, {
                            label: "妊娠期肝内胆汁淤积症",
                            key: "pregnancyCholestasisIntrahepatic"
                        }, {
                            label: "母亲甲状腺功能异常",
                            key: "abnormalMotherSThyroidFunction"
                        }, {
                            label: "妊娠期其它合并症",
                            key: "otherComplicationsDuringPregnancy"
                        }, {
                            label: "妊娠期其它合并症1",
                            key: "otherComplicationsDuringPregnancy1"
                        }, {
                            label: "妊娠期其它合并症2",
                            key: "otherComplicationsDuringPregnancy2"
                        }, {
                            label: "妊娠期其它合并症3",
                            key: "otherComplicationsDuringPregnancy3"
                        }, {
                            label: "妊娠期其它合并症4",
                            key: "otherComplicationsDuringPregnancy4"
                        }, {
                            label: "妊娠风险筛查",
                            key: "pregnancyRiskScreening"
                        }, {
                            label: "妊娠风险等级",
                            key: "pregnancyRiskScreeningLevel"
                        }, {
                            label: "胰岛素治疗",
                            key: "insulinTherapy"
                        }, {
                            label: "产前检查",
                            key: "prenatalCare"
                        }, {
                            label: "第一次产检建卡妊娠（周）",
                            key: "firstPregnancyCheckUpCard"
                        }, {
                            label: "产检前检查次数",
                            key: "prenatalCareNumber"
                        }, {
                            label: "进行全面产检的次数",
                            key: "fullInspectionsNumber"
                        }]
                    }, {
                        label: "孕期信息",
                        key: "gestation_information",
                        children: [{
                            label: "母亲职业",
                            key: "motherOccupation"
                        }, {
                            label: "母亲学历",
                            key: "motherDegree"
                        }, {
                            label: "父亲职业",
                            key: "fatherOccupation"
                        }, {
                            label: "父亲学历",
                            key: "fatherDegree"
                        }, {
                            label: "Green评分",
                            key: "greenScore"
                        }, {
                            label: "母亲医疗付费方式（本地居民医保）",
                            key: "motherPaymentMethodLocalResidentsMedicalInsurance"
                        }, {
                            label: "母亲医疗付费方式（异地医保）",
                            key: "motherPaymentMethodOffSiteMedicalInsurance"
                        }, {
                            label: "母亲医疗付费方式（低保）",
                            key: "motherPaymentMethodResidentsMinimumLivingGuarantee"
                        }, {
                            label: "母亲医疗付费方式（社会救助）",
                            key: "motherPaymentMethodSocialAssistance"
                        }, {
                            label: "母亲医疗付费方式（商业保险）",
                            key: "motherPaymentMethodBusinessInsurance"
                        }, {
                            label: "母亲医疗付费方式（自费）",
                            key: "motherPaymentMethodOwnExpense"
                        }, {
                            label: "母亲身高",
                            key: "motherHeight"
                        }, {
                            label: "孕前体重",
                            key: "weightBeforePregnancy"
                        }, {
                            label: "孕前BMI",
                            key: "bmiBeforePregnancy"
                        }, {
                            label: "分娩前体重",
                            key: "weightBeforeDelivery"
                        }, {
                            label: "分娩前BMI",
                            key: "bmiBeforeDelivery"
                        }, {
                            label: "孕期体重增加",
                            key: "weightGainDuringPregnancy"
                        }]
                    }, {
                        label: "围产信息",
                        key: "perinatal_information",
                        children: [{
                            label: "产前皮质醇",
                            key: "antenatalCortisol"
                        }, {
                            label: "产前皮质醇（开始时间）",
                            key: "antenatalCortisolStartTime"
                        }, {
                            label: "产前皮质醇（结束时间）",
                            key: "antenatalCortisolEndTime"
                        }, {
                            label: "产前皮质醇（次数）",
                            key: "antenatalCortisolFrequency"
                        }, {
                            label: "产前硫酸镁",
                            key: "prenatalMagnesiumSulfate"
                        }, {
                            label: "分娩前24小时内抗生素使用",
                            key: "antibioticUseWithin24HoursBeforeDelivery"
                        }, {
                            label: "抗生素使用日期",
                            key: "antibioticUseDate"
                        }, {
                            label: "分娩日期",
                            key: "deliveryDate"
                        }, {
                            label: "抗生素使用（于产前时长）",
                            key: "antibioticUseLength"
                        }, {
                            label: "抗生素使用类型-1",
                            key: "antibioticType1"
                        }, {
                            label: "抗生素使用类型-2",
                            key: "antibioticType2"
                        }, {
                            label: "抗生素使用类型-3",
                            key: "antibioticType3"
                        }, {
                            label: "抗生素使用原因-1",
                            key: "antibioticReason1"
                        }, {
                            label: "抗生素使用原因-2",
                            key: "antibioticReason2"
                        }, {
                            label: "抗生素使用原因-3",
                            key: "antibioticReason3"
                        }, {
                            label: "产妇不明原因发热",
                            key: "maternalUnknownOriginFever"
                        }, {
                            label: "产妇不明原因发热（体温）",
                            key: "bodyTemperatureMUOF"
                        }, {
                            label: "产妇不明原因发热（心率）",
                            key: "heartRateMUOF"
                        }, {
                            label: "胎儿心率增快",
                            key: "increasedFetalHeartRate"
                        }, {
                            label: "胎儿心率增快（心率）",
                            key: "heartRateIFHR"
                        }, {
                            label: "羊水异味",
                            key: "amnioticFluidPeculiarSmell"
                        }, {
                            label: "羊水指数",
                            key: "amnioticFluidIndex"
                        }, {
                            label: "子宫压痛",
                            key: "uterineTenderness"
                        }, {
                            label: "母亲血常规（WBC）",
                            key: "motherBRWbc"
                        }, {
                            label: "母亲血常规（中性粒细胞比例）",
                            key: "motherBRNeutrophilRatio"
                        }, {
                            label: "母亲血常规（Hgb）",
                            key: "motherBRHgb"
                        }, {
                            label: "母亲血常规（PLT）",
                            key: "motherBRPlt"
                        }, {
                            label: "组织病理学检查",
                            key: "histopathologicalExamination"
                        }, {
                            label: "组织病理学检查（结果）",
                            key: "histopathologicalExaminationOutcome"
                        }, {
                            label: "绒毛膜羊膜炎",
                            key: "chorioamnionitis"
                        }, {
                            label: "GBS感染",
                            key: "gbsInfection"
                        }, {
                            label: "受孕方式",
                            key: "conceptionMethod"
                        }, {
                            label: "体外受精",
                            key: "inVitroFertilization"
                        }, {
                            label: "宫颈环扎",
                            key: "cervicalCerclage"
                        }, {
                            label: "环扎胎龄",
                            key: "cerclageGestationalAge"
                        }, {
                            label: "产前干预",
                            key: "prenatalIntervention"
                        }, {
                            label: "产前干预（胎儿输血）",
                            key: "piFetalBloodTransfusion"
                        }, {
                            label: "产前干预（激光消融术）",
                            key: "piLaserAblation"
                        }, {
                            label: "产前干预（减羊水术）",
                            key: "piAmnioticFluidReduction"
                        }, {
                            label: "产前干预（引流管置入术）",
                            key: "piDrainageCatheterPlacement"
                        }, {
                            label: "产前干预（减胎术）",
                            key: "piFetalReduction"
                        }, {
                            label: "产前干预（绒毛膜绒毛取样）",
                            key: "piChorionicVillusSampling"
                        }, {
                            label: "产前干预（羊水穿刺＜20周）",
                            key: "piAmnioticFluidPunctureLT20W"
                        }, {
                            label: "产前干预（开放性胎儿手术）",
                            key: "piOpenFetalSurgery"
                        }, {
                            label: "产前干预（其他）",
                            key: "piOther"
                        }, {
                            label: "干预孕周（周）",
                            key: "piWeek"
                        }, {
                            label: "干预孕周（天）",
                            key: "piDay"
                        }, {
                            label: "产前出血",
                            key: "prenatalHemorrhage"
                        }, {
                            label: "产前出血（胎盘前置）",
                            key: "placentaAnterior"
                        }, {
                            label: "产前出血（胎盘早剥）",
                            key: "placentalAbruption"
                        }, {
                            label: "产前出血（前置血管）",
                            key: "vascularPrevia"
                        }, {
                            label: "产前出血（胎盘植入）",
                            key: "placenta"
                        }, {
                            label: "产前出血（其他/不详）",
                            key: "otherOrUnknown"
                        }]
                    }, {
                        label: "宝宝情况",
                        key: "baby_situation",
                        children: [{
                            label: "多胞情况",
                            key: "multicellularNumber"
                        }, {
                            label: "破膜日期",
                            key: "ruptureDate"
                        }, {
                            label: "破膜时间",
                            key: "ruptureTime"
                        }, {
                            label: "胎方位",
                            key: "fetalPosition"
                        }, {
                            label: "胎次",
                            key: "pregnancyNumber"
                        }, {
                            label: "产次",
                            key: "birthNumber"
                        }, {
                            label: "流产次数",
                            key: "abortionNumber"
                        }, {
                            label: "双胎",
                            key: "twins"
                        }, {
                            label: "三胎",
                            key: "threeBirths"
                        }, {
                            label: "分娩方式",
                            key: "deliveryMethod"
                        }, {
                            label: "剖宫产原因",
                            key: "cesareanSectionReason"
                        }, {
                            label: "出生头围",
                            key: "birthHeadCircumference"
                        }, {
                            label: "出生身长",
                            key: "birthLength"
                        }, {
                            label: "出生后1h内体温",
                            key: "bodyTemperatureWithin1hAfterBirth"
                        }, {
                            label: "母亲孕期体重增加",
                            key: "maternalWeightGainRate"
                        }, {
                            label: "新生儿是否住院",
                            key: "whetherHospitalized"
                        }, {
                            label: "患儿来源",
                            key: "childSource"
                        }, {
                            label: "新生儿入室日期",
                            key: "newbornEnterRoomDate"
                        }, {
                            label: "出生医院",
                            key: "birthHospital"
                        }, {
                            label: "患儿医疗付费方式（本地居民医保）",
                            key: "childrenPaymentMethodLocalResidentsMedicalInsurance"
                        }, {
                            label: "患儿医疗付费方式（异地医保）",
                            key: "childrenPaymentMethodOffSiteMedicalInsurance"
                        }, {
                            label: "患儿医疗付费方式（低保）",
                            key: "childrenPaymentMethodResidentsMinimumLivingGuarantee"
                        }, {
                            label: "患儿医疗付费方式（社会救助）",
                            key: "childrenPaymentMethodSocialAssistance"
                        }, {
                            label: "患儿医疗付费方式（商业保险）",
                            key: "childrenPaymentMethodBusinessInsurance"
                        }, {
                            label: "患儿医疗付费方式（自费）",
                            key: "childrenPaymentMethodOwnExpense"
                        }]
                    }, {
                        label: "复苏情况",
                        key: "recovery_situation",
                        children: [{
                            label: "复苏措施",
                            key: "recoveryMeasures"
                        }, {
                            label: "吸引、轻度刺激",
                            key: "attractionMildStimulation"
                        }, {
                            label: "鼻导管吸氧",
                            key: "nasalCannulaOxygen"
                        }, {
                            label: "面罩正压通气",
                            key: "positiveMaskVentilation"
                        }, {
                            label: "面罩正压通气（复苏囊）",
                            key: "pmvResuscitationBag"
                        }, {
                            label: "面罩正压通气（T组合器）",
                            key: "pmvTCombiner"
                        }, {
                            label: "持续气道正压",
                            key: "continuousPositiveAirwayPressure"
                        }, {
                            label: "持续气道正压（方式）",
                            key: "cpapMothed"
                        }, {
                            label: "气管插管",
                            key: "trachealIntubation"
                        }, {
                            label: "胸外按压>60s",
                            key: "chestCompressionH60S"
                        }, {
                            label: "肾上腺素",
                            key: "adrenaline"
                        }, {
                            label: "生理盐水",
                            key: "normalSaline"
                        }, {
                            label: "复苏初始气体",
                            key: "resuscitateInitialGas"
                        }, {
                            label: "初始氧浓度",
                            key: "initialOxygenConcentration"
                        }, {
                            label: "复苏最高氧浓度",
                            key: "resuscitationMaxO2Concentration"
                        }, {
                            label: "给药方式（脐静脉）",
                            key: "administrationModeUmbilicalVein"
                        }, {
                            label: "给药方式（脐动脉）",
                            key: "administrationModeUmbilicalArtery"
                        }, {
                            label: "给药方式（外周静脉）",
                            key: "administrationModePeripheralVein"
                        }, {
                            label: "给药方式（气管导管）",
                            key: "administrationModeTrachealTube"
                        }, {
                            label: "Apgar评分的辅助评分（1min）（给氧）",
                            key: "apgarAuxiliaryScoring1MinGiveOxygen"
                        }, {
                            label: "Apgar评分的辅助评分（1min）（正压通气）",
                            key: "apgarAuxiliaryScoring1MinPositivePressureVentilation"
                        }, {
                            label: "Apgar评分的辅助评分（1min）（持续正压通气）",
                            key: "apgarAuxiliaryScoring1MinContinuousPositivePressureVentilation"
                        }, {
                            label: "Apgar评分的辅助评分（1min）（气管插管）",
                            key: "apgarAuxiliaryScoring1MinTrachealIntubation"
                        }, {
                            label: "Apgar评分的辅助评分（1min）（胸外按压>60s）",
                            key: "apgarAuxiliaryScoring1MinChestCompressionsH60S"
                        }, {
                            label: "Apgar评分的辅助评分（1min）（肾上腺素）",
                            key: "apgarAuxiliaryScoring1MinAdrenaline"
                        }, {
                            label: "Apgar评分的辅助评分（1min）（评分）",
                            key: "apgarAuxiliaryScoring1Min"
                        }, {
                            label: "Apgar评分的辅助评分（5min）（给氧）",
                            key: "apgarAuxiliaryScoring5MinGiveOxygen"
                        }, {
                            label: "Apgar评分的辅助评分（5min）（正压通气）",
                            key: "apgarAuxiliaryScoring5MinPositivePressureVentilation"
                        }, {
                            label: "Apgar评分的辅助评分（5min）（持续正压通气）",
                            key: "apgarAuxiliaryScoring5MinContinuousPositivePressureVentilation"
                        }, {
                            label: "Apgar评分的辅助评分（5min）（气管插管）",
                            key: "apgarAuxiliaryScoring5MinTrachealIntubation"
                        }, {
                            label: "Apgar评分的辅助评分（5min）（胸外按压>60s）",
                            key: "apgarAuxiliaryScoring5MinChestCompressionsH60S"
                        }, {
                            label: "Apgar评分的辅助评分（5min）（肾上腺素）",
                            key: "apgarAuxiliaryScoring5MinAdrenaline"
                        }, {
                            label: "Apgar评分的辅助评分（5min）（评分）",
                            key: "apgarAuxiliaryScoring5Min"
                        }, {
                            label: "Apgar评分的辅助评分（10min）（给氧）",
                            key: "apgarAuxiliaryScoring10MinGiveOxygen"
                        }, {
                            label: "Apgar评分的辅助评分（10min）（正压通气）",
                            key: "apgarAuxiliaryScoring10MinPositivePressureVentilation"
                        }, {
                            label: "Apgar评分的辅助评分（10min）（持续正压通气）",
                            key: "apgarAuxiliaryScoring10MinContinuousPositivePressureVentilation"
                        }, {
                            label: "Apgar评分的辅助评分（10min）（气管插管）",
                            key: "apgarAuxiliaryScoring10MinTrachealIntubation"
                        }, {
                            label: "Apgar评分的辅助评分（10min）（胸外按压>60s）",
                            key: "apgarAuxiliaryScoring10MinChestCompressionsH60S"
                        }, {
                            label: "Apgar评分的辅助评分（10min）（肾上腺素）",
                            key: "apgarAuxiliaryScoring10MinAdrenaline"
                        }, {
                            label: "Apgar评分的辅助评分（10min）（评分）",
                            key: "apgarAuxiliaryScoring10Min"
                        }, {
                            label: "停止复苏的时间（生后）",
                            key: "stopRecoveryTime"
                        }, {
                            label: "复苏结局",
                            key: "recoveryEnd"
                        }, {
                            label: "放弃复苏原因（超未成熟）",
                            key: "abandonRecoveryReasonUltraImmature"
                        }, {
                            label: "放弃复苏原因（先天畸形）",
                            key: "abandonRecoveryReasonCongenitalMalformations"
                        }, {
                            label: "放弃复苏原因（经济原因）",
                            key: "abandonRecoveryReasonEconomicReasons"
                        }, {
                            label: "放弃复苏原因（担心预后）",
                            key: "abandonRecoveryReasonWorryPrognosis"
                        }, {
                            label: "放弃复苏原因（其他）",
                            key: "abandonRecoveryReasonOther"
                        }, {
                            label: "脐带延迟结扎",
                            key: "delayedUmbilicalCordLigation"
                        }, {
                            label: "脐带延迟结扎（时长）",
                            key: "delayedUmbilicalCordLigationTime"
                        }, {
                            label: "脐带挤压",
                            key: "umbilicalCordSqueeze"
                        }, {
                            label: "脐动脉血血气",
                            key: "umbilicalArterialBloodGas"
                        }, {
                            label: "脐动脉血血气（PH）",
                            key: "uabgPH"
                        }, {
                            label: "脐动脉血血气（血氧饱和度）",
                            key: "uabgBloodOxygenSaturation"
                        }, {
                            label: "脐动脉血血气（乳酸）",
                            key: "uabgLacticAcid"
                        }, {
                            label: "脐动脉血血气（PaO<sub>2</sub>）",
                            key: "uabgPaO2"
                        }, {
                            label: "脐动脉血血气（PaCO<sub>2</sub>）",
                            key: "uabgPaCO2"
                        }, {
                            label: "脐动脉血血气（BE）",
                            key: "uabgBE"
                        }, {
                            label: "脐动脉血血气（HCO<sub>3</sub>）",
                            key: "uabgHCO3"
                        }, {
                            label: "脐动脉血血气（Hgb）",
                            key: "uabgHgb"
                        }, {
                            label: "Apgar评分（1分钟）",
                            key: "apgarScore1Min"
                        }, {
                            label: "Apgar评分（5分钟）",
                            key: "apgarScore5Min"
                        }, {
                            label: "Apgar评分（10分钟）",
                            key: "apgarScore10Min"
                        }, {
                            label: "新生儿窒息",
                            key: "neonatalAsphyxia"
                        }, {
                            label: "出生后转归",
                            key: "fateAfterBirth"
                        }, {
                            label: "死亡时间",
                            key: "deathTime"
                        }, {
                            label: "先天畸形",
                            key: "congenitalMalformations"
                        }]
                    }, {
                        label: "危重评估",
                        key: "critical_assessment",
                        children: [{
                            label: "心率（次/分）",
                            key: "heartRate"
                        }, {
                            label: "收缩压（mmHg）",
                            key: "systolicBloodPressure"
                        }, {
                            label: "呼吸（次/分）",
                            key: "breathe"
                        }, {
                            label: "PaO<sub>2</sub>（mmHg）",
                            key: "paO2"
                        }, {
                            label: "最低血清 PH 值",
                            key: "lowestSerumPH"
                        }, {
                            label: "Na<sup>+</sup>（mmol/L）",
                            key: "naP"
                        }, {
                            label: "K<sup>+</sup>（mmol/L）",
                            key: "kP"
                        }, {
                            label: "Cr（μmol/L）",
                            key: "cr"
                        }, {
                            label: "BUN（mmol/L）",
                            key: "bun"
                        }, {
                            label: "红细胞压积",
                            key: "hematocrit"
                        }, {
                            label: "腹胀",
                            key: "bloating"
                        }, {
                            label: "消化道出血",
                            key: "gastrointestinalBleeding"
                        }, {
                            label: "新生儿危重病例评分",
                            key: "neonatalCriticalCaseScore"
                        }, {
                            label: "舒张压（mmHg）",
                            key: "diastolicBloodPressure"
                        }, {
                            label: "平均血压（mmHg）",
                            key: "meanBloodPressure"
                        }, {
                            label: "最低体温（℃）",
                            key: "minimumBodyTemperature"
                        }, {
                            label: "吸入氧浓度（%）",
                            key: "inhaledOxygenConcentration"
                        }, {
                            label: "PaO<sub>2</sub> 与 FiO<sub>2</sub> 比值",
                            key: "paO2Fio2Ratio"
                        }, {
                            label: "惊厥发作（次/24h）",
                            key: "seizuresNumber"
                        }, {
                            label: "尿量 (ml/kg/h)",
                            key: "urineVolume"
                        }, {
                            label: "SNAP-Ⅱ 评分",
                            key: "snap2Score"
                        }, {
                            label: "出生体重（g）",
                            key: "birthWeight"
                        }, {
                            label: "小于胎龄儿",
                            key: "childYoungerThanGestationalAge"
                        }, {
                            label: "5分钟 Apgar 评分",
                            key: "apgarScore5Min"
                        }, {
                            label: "SNAPPE-Ⅱ 评分",
                            key: "snappe2Score"
                        }, {
                            label: "胎龄（w）",
                            key: "gestationalAgeWeek"
                        }, {
                            label: "先天畸形",
                            key: "congenitalMalformations"
                        }, {
                            label: "最低的碱剩余（mmol/L）",
                            key: "smallestBE"
                        }, {
                            label: "最小的 FiO<sub>2</sub>",
                            key: "smallestFiO2"
                        }, {
                            label: "最大的 FiO<sub>2</sub>",
                            key: "largestFiO2"
                        }, {
                            label: "CRIB 评分",
                            key: "cribScore"
                        }, {
                            label: "性别",
                            key: "gender"
                        }, {
                            label: "入院体温（℃）",
                            key: "admissionTemperature"
                        }, {
                            label: "CRIB-Ⅱ 评分",
                            key: "crib2Score"
                        }, {
                            label: "乳酸最高值",
                            key: "lacticAcidHighestValue"
                        }, {
                            label: "最低血糖",
                            key: "lowestBloodSugar"
                        }, {
                            label: "最高血糖",
                            key: "highestBloodSugar"
                        }, {
                            label: "最低的血清蛋白",
                            key: "lowestSerumProtein"
                        }, {
                            label: "血小板最低值",
                            key: "lowestPlateletValue"
                        }, {
                            label: "血红蛋白最低值",
                            key: "lowestHemoglobin"
                        }]
                    }, {
                        label: "呼吸系统",
                        key: "rts_",
                        children: [{
                            label: "呼吸支持",
                            key: "respiratory_support",
                            children: [{
                                label: "生后28天（日期）",
                                key: "afterBirth28DaysDate"
                            }, {
                                label: "生后28天（矫正胎龄）（周）",
                                key: "ab28dCorrectGestationalAgeWeek"
                            }, {
                                label: "生后28天（矫正胎龄）（天）",
                                key: "ab28dCorrectGestationalAgeDay"
                            }, {
                                label: "生后28天（呼吸支持模式）",
                                key: "ab28dRespiratorySupportMode"
                            }, {
                                label: "生后28天（FiO<sub>2</sub>）",
                                key: "ab28dFiO2"
                            }, {
                                label: "生后28天（流量）",
                                key: "ab28dFlow"
                            }, {
                                label: "生后28天（MAP）",
                                key: "ab28dMap"
                            }, {
                                label: "纠正胎龄36周（日期）",
                                key: "correctGestationalAge36WeekDate"
                            }, {
                                label: "纠正胎龄36周（呼吸支持模式）",
                                key: "cga36wRespiratorySupportMode"
                            }, {
                                label: "纠正胎龄36周（FiO<sub>2</sub>）",
                                key: "cga36wFiO2"
                            }, {
                                label: "纠正胎龄36周（流量）",
                                key: "cga36wFlow"
                            }, {
                                label: "纠正胎龄36周（MAP）",
                                key: "cga36wMap"
                            }, {
                                label: "纠正胎龄40周（日期）",
                                key: "correctGestationalAge40WeekDate"
                            }, {
                                label: "纠正胎龄40周（呼吸支持模式）",
                                key: "cga40wRespiratorySupportMode"
                            }, {
                                label: "纠正胎龄40周（FiO<sub>2</sub>）",
                                key: "cga40wFiO2"
                            }, {
                                label: "纠正胎龄40周（流量）",
                                key: "cga40wFlow"
                            }, {
                                label: "纠正胎龄40周（MAP）",
                                key: "cga40wMap"
                            }, {
                                label: "出院时（日期）",
                                key: "dischargeDate"
                            }, {
                                label: "出院时（矫正胎龄）（周）",
                                key: "dischargeCorrectGestationalAgeWeek"
                            }, {
                                label: "出院时（矫正胎龄）（天）",
                                key: "dischargeCorrectGestationalAgeDay"
                            }, {
                                label: "出院时（呼吸支持模式）",
                                key: "dischargeRespiratorySupportMode"
                            }, {
                                label: "出院时（FiO<sub>2</sub>）",
                                key: "dischargeFiO2"
                            }, {
                                label: "出院时（流量）",
                                key: "dischargeFlow"
                            }, {
                                label: "出院时（MAP）",
                                key: "dischargeMap"
                            }, {
                                label: "呼吸支持合计（次数）",
                                key: "respiratorySupportNum"
                            }, {
                                label: "呼吸支持合计（天）",
                                key: "respiratorySupportDays"
                            }, {
                                label: "呼吸支持合计（小时）",
                                key: "respiratorySupportHours"
                            }, {
                                label: "给氧浓度变动（次数）",
                                key: "oxygenConcentrationChangeNum"
                            }, {
                                label: "给氧时间合计（天）",
                                key: "totalOxygenSupplyTimeDays"
                            }, {
                                label: "给氧时间合计（小时）",
                                key: "totalOxygenSupplyTimeHours"
                            }]
                        }, {
                            label: "HFNC失败",
                            key: "hfnc_failed",
                            children: [{
                                label: "初始HFNC",
                                key: "initialHFNC"
                            }, {
                                label: "初始HFNC失败",
                                key: "initialHfncFailed"
                            }, {
                                label: "开始HFNC时间",
                                key: "startHfncTime"
                            }, {
                                label: "停止HFNC时间（天）",
                                key: "endHfncTime"
                            }, {
                                label: "HFNC使用时间（h）",
                                key: "hfncUseTimeHour"
                            }, {
                                label: "HFNC停止后呼吸支持方式",
                                key: "respiratorySupportMethodAfterHFNC"
                            }, {
                                label: "HFNC停止的原因",
                                key: "hfncStopReason"
                            }, {
                                label: "开始HFNC时的血气分析",
                                key: "beginHfncBloodGasAnalysis"
                            }, {
                                label: "开始HFNC时的血气分析（PH）",
                                key: "bgaBeginHfncPh"
                            }, {
                                label: "开始HFNC时的血气分析（血氧饱和度）",
                                key: "bgaBeginHfncBloodOxygenSaturation"
                            }, {
                                label: "开始HFNC时的血气分析（乳酸）",
                                key: "bgaBeginHfncLacticAcid"
                            }, {
                                label: "开始HFNC时的血气分析（PaO<sub>2</sub>）",
                                key: "bgaBeginHfncPaO2"
                            }, {
                                label: "开始HFNC时的血气分析（PaCO<sub>2</sub>）",
                                key: "bgaBeginHfncPaCO2"
                            }, {
                                label: "开始HFNC时的血气分析（BE）",
                                key: "bgaBeginHfncBE"
                            }, {
                                label: "开始HFNC时的血气分析（HCO<sub>3</sub>）",
                                key: "bgaBeginHfncHCO3"
                            }, {
                                label: "开始HFNC时的血气分析（Hgb）",
                                key: "bgaBeginHfncHgb"
                            }, {
                                label: "开始HFNC时的参数（流量）",
                                key: "startHfncParamFlow"
                            }, {
                                label: "开始HFNC时的参数（FiO<sub>2</sub>）",
                                key: "startHfncParamFiO2"
                            }, {
                                label: "开始HFNC时的参数（OI）",
                                key: "startHfncParamOI"
                            }, {
                                label: "停止HFNC时的血气分析",
                                key: "stopHfncBloodGasAnalysis"
                            }, {
                                label: "停止HFNC时的血气分析（PH）",
                                key: "bgaStopHfncPh"
                            }, {
                                label: "停止HFNC时的血气分析（血氧饱和度）",
                                key: "bgaStopHfncBloodOxygenSaturation"
                            }, {
                                label: "停止HFNC时的血气分析（乳酸）",
                                key: "bgaStopHfncLacticAcid"
                            }, {
                                label: "停止HFNC时的血气分析（PaO<sub>2</sub>）",
                                key: "bgaStopHfncPaO2"
                            }, {
                                label: "停止HFNC时的血气分析（PaCO<sub>2</sub>）",
                                key: "bgaStopHfncPaCO2"
                            }, {
                                label: "停止HFNC时的血气分析（BE）",
                                key: "bgaStopHfncBE"
                            }, {
                                label: "停止HFNC时的血气分析（HCO<sub>3</sub>）",
                                key: "bgaStopHfncHCO3"
                            }, {
                                label: "停止HFNC时的血气分析（Hgb）",
                                key: "bgaStopHfncHgb"
                            }, {
                                label: "停止HFNC时的参数（流量）",
                                key: "endHfncParamFlow"
                            }, {
                                label: "停止HFNC时的参数（FiO<sub>2</sub>）",
                                key: "endHfncParamFiO2"
                            }, {
                                label: "停止HFNC时的参数（OI）",
                                key: "endHfncParamOI"
                            }]
                        }, {
                            label: "无创通气失败",
                            key: "niv_failed",
                            children: [{
                                label: "初始无创通气",
                                key: "initialNIV"
                            }, {
                                label: "初始无创通气失败",
                                key: "initialNivFailed"
                            }, {
                                label: "开始无创通气的呼吸支持方式",
                                key: "startNivMethod"
                            }, {
                                label: "无创通气停止于生后",
                                key: "stopAfterHour"
                            }, {
                                label: "开始无创通气时间",
                                key: "startNivTime"
                            }, {
                                label: "停止无创通气时间",
                                key: "endNivTime"
                            }, {
                                label: "无创通气持续时间（天）",
                                key: "nivUseTimeDay"
                            }, {
                                label: "无创通气持续时间（h）",
                                key: "nivUseTimeHour"
                            }, {
                                label: "无创通气停止后呼吸支持方式",
                                key: "respiratorySupportMethodAfterNIV"
                            }, {
                                label: "无创通气停止的原因",
                                key: "nivStopReason"
                            }, {
                                label: "开始无创通气时的血气分析",
                                key: "beginNonInvasiveVentilationBloodGasAnalysis"
                            }, {
                                label: "开始无创通气时的血气分析（PH）",
                                key: "bgaBeginNivPh"
                            }, {
                                label: "开始无创通气时的血气分析（血氧饱和度）",
                                key: "bgaBeginNivBloodOxygenSaturation"
                            }, {
                                label: "开始无创通气时的血气分析（乳酸）",
                                key: "bgaBeginNivLacticAcid"
                            }, {
                                label: "开始无创通气时的血气分析（PaO<sub>2</sub>）",
                                key: "bgaBeginNivPaO2"
                            }, {
                                label: "开始无创通气时的血气分析（PaCO<sub>2</sub>）",
                                key: "bgaBeginNivPaCO2"
                            }, {
                                label: "开始无创通气时的血气分析（BE）",
                                key: "bgaBeginNivBE"
                            }, {
                                label: "开始无创通气时的血气分析（HCO<sub>3</sub>）",
                                key: "bgaBeginNivHCO3"
                            }, {
                                label: "开始无创通气时的血气分析（Hgb）",
                                key: "bgaBeginNivHgb"
                            }, {
                                label: "开始无创通气时的参数（FiO<sub>2</sub>）",
                                key: "startNivParamFiO2"
                            }, {
                                label: "开始无创通气时的参数（PEEP）",
                                key: "startNivParamPeep"
                            }, {
                                label: "开始无创通气时的参数（OI）",
                                key: "startNivParamOI"
                            }, {
                                label: "停止无创通气时的血气分析",
                                key: "stopNonInvasiveVentilationBloodGasAnalysis"
                            }, {
                                label: "停止无创通气时的血气分析（PH）",
                                key: "bgaStopNivPh"
                            }, {
                                label: "停止无创通气时的血气分析（血氧饱和度）",
                                key: "bgaStopNivBloodOxygenSaturation"
                            }, {
                                label: "停止无创通气时的血气分析（乳酸）",
                                key: "bgaStopNivLacticAcid"
                            }, {
                                label: "停止无创通气时的血气分析（PaO<sub>2</sub>）",
                                key: "bgaStopNivPaO2"
                            }, {
                                label: "停止无创通气时的血气分析（PaCO<sub>2</sub>）",
                                key: "bgaStopNivPaCO2"
                            }, {
                                label: "停止无创通气时的血气分析（BE）",
                                key: "bgaStopNivBE"
                            }, {
                                label: "停止无创通气时的血气分析（HCO<sub>3</sub>）",
                                key: "bgaStopNivHCO3"
                            }, {
                                label: "停止无创通气时的血气分析（Hgb）",
                                key: "bgaStopNivHgb"
                            }, {
                                label: "停止无创通气时的参数（FiO<sub>2</sub>）",
                                key: "endNivParamFiO2"
                            }, {
                                label: "停止无创通气时的参数（PEEP）",
                                key: "endNivParamPeep"
                            }, {
                                label: "停止无创通气时的参数（OI）",
                                key: "endNivParamOI"
                            }]
                        }, {
                            label: "撤机情况",
                            key: "ws_invasive_ventilation",
                            children: [{
                                label: "有创通气",
                                key: "invasiveVentilation"
                            }, {
                                label: "有创通气次数",
                                key: "invasiveVentilationTimes"
                            }]
                        }, {
                            label: "BPD",
                            key: "bpd",
                            children: [{
                                label: "2001诊断标准",
                                key: "diagnosticCriteria2001"
                            }, {
                                label: "2018诊断标准",
                                key: "diagnosticCriteria2018"
                            }, {
                                label: "2019诊断标准",
                                key: "diagnosticCriteria2019"
                            }, {
                                label: "治疗次数",
                                key: "treatmentsNumber"
                            }, {
                                label: "口服（天）",
                                key: "oralDays"
                            }, {
                                label: "静脉给药（天）",
                                key: "intravenousAdministrationDays"
                            }, {
                                label: "雾化吸入（天）",
                                key: "aerosolInhalationDays"
                            }]
                        }, {
                            label: "RDS",
                            key: "rds",
                            children: [{
                                label: "RDS",
                                key: "hasRds"
                            }, {
                                label: "诊断时间",
                                key: "diagnosisTime"
                            }, {
                                label: "分级",
                                key: "grade"
                            }, {
                                label: "诊断依据（临床）",
                                key: "diagnosisBasisClinical"
                            }, {
                                label: "诊断依据（影像）",
                                key: "diagnosisBasisImage"
                            }, {
                                label: "PS使用",
                                key: "usePS"
                            }, {
                                label: "固尔苏",
                                key: "gulsuTime"
                            }, {
                                label: "珂立苏",
                                key: "kelisuTime"
                            }]
                        }, {
                            label: "呼吸暂停",
                            key: "apnea",
                            children: [{
                                label: "呼吸暂停",
                                key: "hasApnea"
                            }, {
                                label: "诊断时间",
                                key: "diagnosisTime"
                            }, {
                                label: "咖啡因使用",
                                key: "useCaffeine"
                            }, {
                                label: "咖啡因使用次数",
                                key: "caffeineTime"
                            }]
                        }, {
                            label: "其它诊断与治疗",
                            key: "other_diagnosis_treatment",
                            children: [{
                                label: "新生儿胎粪吸入综合征",
                                key: "newbornMeconiumAspirationSyndrome"
                            }, {
                                label: "羊水吸入综合征",
                                key: "amnioticFluidAspirationSyndrome"
                            }, {
                                label: "乳汁吸入综合征",
                                key: "milkAspirationSyndrome"
                            }, {
                                label: "新生儿湿肺",
                                key: "neonatalWetLung"
                            }, {
                                label: "新生儿肺炎",
                                key: "neonatalPneumonia"
                            }, {
                                label: "新生儿肺炎（诊断时间）",
                                key: "neonatalPneumoniaDiagnosisTime"
                            }, {
                                label: "气胸",
                                key: "pneumothorax"
                            }, {
                                label: "气胸（诊断时间）",
                                key: "pneumothoraxDiagnosisTime"
                            }, {
                                label: "胸腔穿刺术",
                                key: "pneumothoraxThoracentesis"
                            }, {
                                label: "胸腔闭式引流",
                                key: "pneumothoraxClosedThoracicDrainage"
                            }, {
                                label: "胸腔积液",
                                key: "pleuralEffusion"
                            }, {
                                label: "胸腔积液（诊断时间）",
                                key: "pleuralEffusionDiagnosisTime"
                            }, {
                                label: "胸腔穿刺术",
                                key: "pleuralEffusionThoracentesis"
                            }, {
                                label: "胸腔闭式引流",
                                key: "pneumothoraxClosedThoracicDrainage"
                            }, {
                                label: "呼吸机相关性肺炎",
                                key: "ventilatorAssociatedPneumonia"
                            }, {
                                label: "呼吸机相关性肺炎（诊断时间）",
                                key: "vapDiagnosisTime"
                            }, {
                                label: "呼吸机相关血流感染",
                                key: "ventilatorRelatedBloodstreamInfection"
                            }, {
                                label: "呼吸机相关血流感染（诊断时间）",
                                key: "vrbiDiagnosisTime"
                            }, {
                                label: "肺出血",
                                key: "pulmonaryHemorrhage"
                            }, {
                                label: "肺出血（诊断时间）",
                                key: "pulmonaryHemorrhageDiagnosisTime"
                            }, {
                                label: "ARDS",
                                key: "ards"
                            }, {
                                label: "ARDS（诊断时间）",
                                key: "ardsDiagnosisTime"
                            }, {
                                label: "呼吸衰竭",
                                key: "respiratoryFailure"
                            }, {
                                label: "呼吸衰竭（诊断时间）",
                                key: "respiratoryFailureDiagnosisTime"
                            }]
                        }]
                    }, {
                        label: "消化系统",
                        key: "dgs_",
                        children: [{
                            label: "生长指标",
                            key: "growth_index",
                            children: [{
                                label: "出生体重下降最低时间",
                                key: "birthWeightLossMinimumTime"
                            }, {
                                label: "出生体重下降最低值",
                                key: "birthWeightLossMinimumValue"
                            }, {
                                label: "恢复出生体重时间",
                                key: "regainBirthWeightTime"
                            }, {
                                label: "恢复出生体重日龄",
                                key: "regainBirthWeightDayAge"
                            }]
                        }, {
                            label: "肠内营养",
                            key: "enteral_nutrition",
                            children: [{
                                label: "深度水解奶（热量）",
                                key: "deeplyHydrolyzedMilkCalories"
                            }, {
                                label: "深度水解奶（蛋白质）",
                                key: "deeplyHydrolyzedMilkContent"
                            }, {
                                label: "部分水解奶（热量）",
                                key: "partiallyHydrolyzedMilkCalories"
                            }, {
                                label: "部分水解奶（蛋白质）",
                                key: "partiallyHydrolyzedMilkContent"
                            }, {
                                label: "深度水解奶（蛋白质）",
                                key: "deeplyHydrolyzedMilkContent"
                            }, {
                                label: "氨基酸奶（热量）",
                                key: "aminoAcidMilkCalories"
                            }, {
                                label: "氨基酸奶（蛋白质）",
                                key: "aminoAcidMilkContent"
                            }, {
                                label: "普通配方奶（热量）",
                                key: "ordinaryFormulaMilkCalories"
                            }, {
                                label: "普通配方奶（蛋白质）",
                                key: "ordinaryFormulaMilkContent"
                            }, {
                                label: "强化剂种类",
                                key: "enhancerType"
                            }, {
                                label: "添加母乳强化剂的时间",
                                key: "addBreastMilkFortifierTime"
                            }, {
                                label: "达全量强化的时间",
                                key: "fullEnhancementTime"
                            }, {
                                label: "母乳强化剂使用合计（天）",
                                key: "breastMilkFortifiersTotalUse"
                            }, {
                                label: "开始喂养时间",
                                key: "startFeedingTime"
                            }, {
                                label: "开始经口喂养时间",
                                key: "startOralFeedingTime"
                            }, {
                                label: "开始喂养种类",
                                key: "startFeedingType"
                            }, {
                                label: "亲母母乳喂养开始时间",
                                key: "breastFeedingStartTime"
                            }, {
                                label: "完全经口奶瓶喂养时间",
                                key: "fullOralBottleFeedingTime"
                            }, {
                                label: "肠内喂养启动时间",
                                key: "enteralFeedingStartTime"
                            }, {
                                label: "肠内喂养的启动量",
                                key: "enteralFeedingInitiation"
                            }, {
                                label: "禁食1-7d",
                                key: "fasting1to7d"
                            }, {
                                label: "禁食8-14d",
                                key: "fasting8to14d"
                            }, {
                                label: "禁食15-21d",
                                key: "fasting15to21d"
                            }, {
                                label: "禁食22-28d",
                                key: "fasting22to28d"
                            }, {
                                label: "禁食合计",
                                key: "fastingTotal"
                            }, {
                                label: "管饲1-7d",
                                key: "tubeFeeding1to7d"
                            }, {
                                label: "管饲8-14d",
                                key: "tubeFeeding8to14d"
                            }, {
                                label: "管饲15-21d",
                                key: "tubeFeeding15to21d"
                            }, {
                                label: "管饲22-28d",
                                key: "tubeFeeding22to28d"
                            }, {
                                label: "管饲合计",
                                key: "tubeFeedingTotal"
                            }, {
                                label: "部分鼻饲1-7d",
                                key: "partialNasalFeeding1to7d"
                            }, {
                                label: "部分鼻饲8-14d",
                                key: "partialNasalFeeding8to14d"
                            }, {
                                label: "部分鼻饲15-21d",
                                key: "partialNasalFeeding15to21d"
                            }, {
                                label: "部分鼻饲22-28d",
                                key: "partialNasalFeeding22to28d"
                            }, {
                                label: "部分鼻饲合计",
                                key: "partialNasalFeedingTotal"
                            }, {
                                label: "奶瓶喂养1-7d",
                                key: "bottleFeeding1to7d"
                            }, {
                                label: "奶瓶喂养8-14d",
                                key: "bottleFeeding8to14d"
                            }, {
                                label: "奶瓶喂养15-21d",
                                key: "bottleFeeding15to21d"
                            }, {
                                label: "奶瓶喂养22-28d",
                                key: "bottleFeeding22to28d"
                            }, {
                                label: "奶瓶喂养合计",
                                key: "bottleFeedingTotal"
                            }, {
                                label: "部分哺乳1-7d",
                                key: "partBreastFeeding1to7d"
                            }, {
                                label: "部分哺乳8-14d",
                                key: "partBreastFeeding8to14d"
                            }, {
                                label: "部分哺乳15-21d",
                                key: "partBreastFeeding15to21d"
                            }, {
                                label: "部分哺乳22-28d",
                                key: "partBreastFeeding22to28d"
                            }, {
                                label: "部分哺乳合计",
                                key: "partBreastFeedingTotal"
                            }, {
                                label: "直接哺乳1-7d",
                                key: "directBreastFeeding1to7d"
                            }, {
                                label: "直接哺乳8-14d",
                                key: "directBreastFeeding8to14d"
                            }, {
                                label: "直接哺乳15-21d",
                                key: "directBreastFeeding15to21d"
                            }, {
                                label: "直接哺乳22-28d",
                                key: "directBreastFeeding22to28d"
                            }, {
                                label: "直接哺乳合计",
                                key: "directBreastFeedingTotal"
                            }, {
                                label: "亲母母乳1-7d（ml/d）",
                                key: "breastMilk1to7d"
                            }, {
                                label: "亲母母乳8-14d（ml/d）",
                                key: "breastMilk8to14d"
                            }, {
                                label: "亲母母乳15-21d（ml/d）",
                                key: "breastMilk15to21d"
                            }, {
                                label: "亲母母乳22-28d（ml/d）",
                                key: "breastMilk22to28d"
                            }, {
                                label: "亲母母乳合计（ml/d）",
                                key: "breastMilkTotal"
                            }, {
                                label: "捐献母乳1-7d（ml/d）",
                                key: "donatedBreastMilk1to7d"
                            }, {
                                label: "捐献母乳8-14d（ml/d）",
                                key: "donatedBreastMilk8to14d"
                            }, {
                                label: "捐献母乳15-21d（ml/d）",
                                key: "donatedBreastMilk15to21d"
                            }, {
                                label: "捐献母乳22-28d（ml/d）",
                                key: "donatedBreastMilk22to28d"
                            }, {
                                label: "捐献母乳合计（ml/d）",
                                key: "donatedBreastMilkTotal"
                            }, {
                                label: "母乳强化剂1-7d（强化/d）",
                                key: "breastMilkFortifier1to7d"
                            }, {
                                label: "母乳强化剂8-14d（强化/d）",
                                key: "breastMilkFortifier8to14d"
                            }, {
                                label: "母乳强化剂15-21d（强化/d）",
                                key: "breastMilkFortifier15to21d"
                            }, {
                                label: "母乳强化剂22-28d（强化/d）",
                                key: "breastMilkFortifier22to28d"
                            }, {
                                label: "母乳强化剂合计（强化/d）",
                                key: "breastMilkFortifierTotal"
                            }, {
                                label: "深度水解奶1-7d（ml/d）",
                                key: "deeplyHydrolyzedMilk1to7d"
                            }, {
                                label: "深度水解奶8-14d（ml/d）",
                                key: "deeplyHydrolyzedMilk8to14d"
                            }, {
                                label: "深度水解奶15-21d（ml/d）",
                                key: "deeplyHydrolyzedMilk15to21d"
                            }, {
                                label: "深度水解奶22-28d（ml/d）",
                                key: "deeplyHydrolyzedMilk22to28d"
                            }, {
                                label: "深度水解奶合计（ml/d）",
                                key: "deeplyHydrolyzedMilkTotal"
                            }, {
                                label: "部分水解奶1-7d（ml/d）",
                                key: "partiallyHydrolyzedMilk1to7d"
                            }, {
                                label: "部分水解奶8-14d（ml/d）",
                                key: "partiallyHydrolyzedMilk8to14d"
                            }, {
                                label: "部分水解奶15-21d（ml/d）",
                                key: "partiallyHydrolyzedMilk15to21d"
                            }, {
                                label: "部分水解奶22-28d（ml/d）",
                                key: "partiallyHydrolyzedMilk22to28d"
                            }, {
                                label: "部分水解奶合计（ml/d）",
                                key: "partiallyHydrolyzedMilkTotal"
                            }, {
                                label: "部分水解奶1-7d（ml/d）",
                                key: "aminoAcidMilk1to7d"
                            }, {
                                label: "部分水解奶8-14d（ml/d）",
                                key: "aminoAcidMilk8to14d"
                            }, {
                                label: "部分水解奶15-21d（ml/d）",
                                key: "aminoAcidMilk15to21d"
                            }, {
                                label: "部分水解奶22-28d（ml/d）",
                                key: "aminoAcidMilk22to28d"
                            }, {
                                label: "部分水解奶合计（ml/d）",
                                key: "aminoAcidMilkTotal"
                            }, {
                                label: "普通配方奶1-7d（ml/d）",
                                key: "regularFormulaMilk1to7d"
                            }, {
                                label: "普通配方奶8-14d（ml/d）",
                                key: "regularFormulaMilk8to14d"
                            }, {
                                label: "普通配方奶15-21d（ml/d）",
                                key: "regularFormulaMilk15to21d"
                            }, {
                                label: "普通配方奶22-28d（ml/d）",
                                key: "regularFormulaMilk22to28d"
                            }, {
                                label: "普通配方奶合计（ml/d）",
                                key: "regularFormulaMilkTotal"
                            }, {
                                label: "合计每日奶量1-7d（ml/d）",
                                key: "totalDailyMilkVolume1to7d"
                            }, {
                                label: "合计每日奶量8-14d（ml/d）",
                                key: "totalDailyMilkVolume8to14d"
                            }, {
                                label: "合计每日奶量15-21d（ml/d）",
                                key: "totalDailyMilkVolume15to21d"
                            }, {
                                label: "合计每日奶量22-28d（ml/d）",
                                key: "totalDailyMilkVolume22to28d"
                            }, {
                                label: "合计每日奶量合计（ml/d）",
                                key: "totalDailyMilkVolumeTotal"
                            }]
                        }, {
                            label: "肠外营养",
                            key: "parenteral_nutrition",
                            children: [{
                                label: "置管合计天数",
                                key: "catheterizationTotalDays"
                            }, {
                                label: "50%葡萄糖1-7d（ml/d）",
                                key: "glucose50p1to7d"
                            }, {
                                label: "50%葡萄糖8-14d（ml/d）",
                                key: "glucose50p8to14d"
                            }, {
                                label: "50%葡萄糖15-21d（ml/d）",
                                key: "glucose50p15to21d"
                            }, {
                                label: "50%葡萄糖22-28d（ml/d）",
                                key: "glucose50p22to28d"
                            }, {
                                label: "50%葡萄糖合计（ml/d）",
                                key: "glucose50pTotal"
                            }, {
                                label: "10%葡萄糖1-7d（ml/d）",
                                key: "glucose10p1to7d"
                            }, {
                                label: "10%葡萄糖8-14d（ml/d）",
                                key: "glucose10p8to14d"
                            }, {
                                label: "10%葡萄糖15-21d（ml/d）",
                                key: "glucose10p15to21d"
                            }, {
                                label: "10%葡萄糖22-28d（ml/d）",
                                key: "glucose10p22to28d"
                            }, {
                                label: "10%葡萄糖合计（ml/d）",
                                key: "glucose10pTotal"
                            }, {
                                label: "5%葡萄糖1-7d（ml/d）",
                                key: "glucose5p1to7d"
                            }, {
                                label: "5%葡萄糖8-14d（ml/d）",
                                key: "glucose5p8to14d"
                            }, {
                                label: "5%葡萄糖15-21d（ml/d）",
                                key: "glucose5p15to21d"
                            }, {
                                label: "5%葡萄糖22-28d（ml/d）",
                                key: "glucose5p22to28d"
                            }, {
                                label: "5%葡萄糖合计（ml/d）",
                                key: "glucose5pTotal"
                            }, {
                                label: "50%灭菌水1-7d（ml/d）",
                                key: "sterilizedWater50p1to7d"
                            }, {
                                label: "50%灭菌水8-14d（ml/d）",
                                key: "sterilizedWater50p8to14d"
                            }, {
                                label: "50%灭菌水15-21d（ml/d）",
                                key: "sterilizedWater50p15to21d"
                            }, {
                                label: "50%灭菌水22-28d（ml/d）",
                                key: "sterilizedWater50p22to28d"
                            }, {
                                label: "50%灭菌水合计（ml/d）",
                                key: "sterilizedWater50pTotal"
                            }, {
                                label: "6%氨基酸1-7d（ml/d）",
                                key: "aminoAcid6p1to7d"
                            }, {
                                label: "6%氨基酸8-14d（ml/d）",
                                key: "aminoAcid6p8to14d"
                            }, {
                                label: "6%氨基酸15-21d（ml/d）",
                                key: "aminoAcid6p15to21d"
                            }, {
                                label: "6%氨基酸22-28d（ml/d）",
                                key: "aminoAcid6p22to28d"
                            }, {
                                label: "6%氨基酸合计（ml/d）",
                                key: "aminoAcid6pTotal"
                            }, {
                                label: "20%脂肪乳1-7d（ml/d）",
                                key: "fatEmulsion20p1to7d"
                            }, {
                                label: "20%脂肪乳8-14d（ml/d）",
                                key: "fatEmulsion20p8to14d"
                            }, {
                                label: "20%脂肪乳15-21d（ml/d）",
                                key: "fatEmulsion20p15to21d"
                            }, {
                                label: "20%脂肪乳22-28d（ml/d）",
                                key: "fatEmulsion20p22to28d"
                            }, {
                                label: "20%脂肪乳合计（ml/d）",
                                key: "fatEmulsion20pTotal"
                            }, {
                                label: "非PN液体1-7d（ml/d）",
                                key: "nonPNLiquid1to7d"
                            }, {
                                label: "非PN液体8-14d（ml/d）",
                                key: "nonPNLiquid8to14d"
                            }, {
                                label: "非PN液体15-21d（ml/d）",
                                key: "nonPNLiquid15to21d"
                            }, {
                                label: "非PN液体22-28d（ml/d）",
                                key: "nonPNLiquid22to28d"
                            }, {
                                label: "非PN液体合计（ml/d）",
                                key: "nonPNLiquidTotal"
                            }, {
                                label: "合计液体量1-7d（ml/d）",
                                key: "totalLiquidVolume1to7d"
                            }, {
                                label: "合计液体量8-14d（ml/d）",
                                key: "totalLiquidVolume8to14d"
                            }, {
                                label: "合计液体量15-21d（ml/d）",
                                key: "totalLiquidVolume15to21d"
                            }, {
                                label: "合计液体量22-28d（ml/d）",
                                key: "totalLiquidVolume22to28d"
                            }, {
                                label: "合计液体量合计（ml/d）",
                                key: "totalLiquidVolumeTotal"
                            }]
                        }, {
                            label: "禁食原因",
                            key: "fasting_reasons",
                            children: [{
                                label: "禁食",
                                key: "fasting"
                            }, {
                                label: "禁食次数",
                                key: "fastingTimes"
                            }, {
                                label: "禁食合计（天）",
                                key: "fastingDays"
                            }]
                        }, {
                            label: "喂养不耐受与NEC",
                            key: "feeding_intolerance_and_nec",
                            children: [{
                                label: "喂养不耐受或胃肠道症状开始时间",
                                key: "feedingIntoleranceOrGastrointestinalSymptomsStartTime"
                            }, {
                                label: "喂养不耐受或胃肠道症状结束时间",
                                key: "feedingIntoleranceOrGastrointestinalSymptomsEndTime"
                            }, {
                                label: "喂养不耐受表现（呕吐）",
                                key: "feedingIntoleranceManifestationVomit"
                            }, {
                                label: "喂养不耐受表现（腹胀）",
                                key: "feedingIntoleranceManifestationBloating"
                            }, {
                                label: "喂养不耐受表现（胃潴留）",
                                key: "feedingIntoleranceManifestationGastricRetention"
                            }, {
                                label: "喂养不耐受表现（胆汁样潴留）",
                                key: "feedingIntoleranceManifestationBileLikeRetention"
                            }, {
                                label: "喂养不耐受表现（咖啡色胃内容物）",
                                key: "feedingIntoleranceManifestationBrownStomachContents"
                            }, {
                                label: "喂养不耐受表现（血便）",
                                key: "feedingIntoleranceManifestationBloodyStools"
                            }, {
                                label: "喂养不耐受表现（肠型）",
                                key: "feedingIntoleranceManifestationIntestinalType"
                            }, {
                                label: "喂养不耐受表现（其他）",
                                key: "feedingIntoleranceManifestationOther"
                            }, {
                                label: "禁食原因（进行性腹胀）",
                                key: "fastingReasonProgressiveBloating"
                            }, {
                                label: "禁食原因（反复潴留）",
                                key: "fastingReasonRepeatedRetention"
                            }, {
                                label: "禁食原因（咖啡色胃内容物）",
                                key: "fastingReasonBrownStomachContents"
                            }, {
                                label: "禁食原因（血便）",
                                key: "fastingReasonBloodyStools"
                            }, {
                                label: "禁食原因（血氧不稳定）",
                                key: "fastingReasonBloodOxygenInstability"
                            }, {
                                label: "禁食原因（确诊感染）",
                                key: "fastingReasonConfirmedInfection"
                            }, {
                                label: "禁食原因（疑似感染）",
                                key: "fastingReasonSuspectedInfection"
                            }, {
                                label: "禁食原因（确诊NEC）",
                                key: "fastingReasonConfirmedNEC"
                            }, {
                                label: "禁食原因（疑似NEC）",
                                key: "fastingReasonSuspectedNEC"
                            }, {
                                label: "禁食原因（输血）",
                                key: "fastingReasonBloodTransfusion"
                            }, {
                                label: "禁食原因（其他）",
                                key: "fastingReasonOther"
                            }, {
                                label: "胃肠减压",
                                key: "gastrointestinalDecompression"
                            }, {
                                label: "胃肠减压（开始时间）",
                                key: "gastrointestinalDecompressionStartTime"
                            }, {
                                label: "胃肠减压（结束时间）",
                                key: "gastrointestinalDecompressionEndTime"
                            }, {
                                label: "NEC",
                                key: "nec"
                            }, {
                                label: "NEC（分期）",
                                key: "necStaging"
                            }, {
                                label: "NEC（诊断日期）",
                                key: "necDiagnosisDate"
                            }, {
                                label: "发生NEC前（血管活性药）",
                                key: "beforeNecVasoactiveDrugs"
                            }, {
                                label: "发生NEC前（液体复苏）",
                                key: "beforeNecFluidResuscitation"
                            }, {
                                label: "发生NEC前（肝素）",
                                key: "beforeNecHeparin"
                            }, {
                                label: "发生NEC前（输血）",
                                key: "beforeNecBloodTransfusion"
                            }, {
                                label: "发生NEC前（丙球）",
                                key: "beforeNecCBall"
                            }, {
                                label: "发生NEC前（糖皮质激素）",
                                key: "beforeNecGlucocorticoid"
                            }, {
                                label: "诊断依据（临床症状）",
                                key: "diagnosisBasisClinicalSymptoms"
                            }, {
                                label: "诊断依据（辅助检查）",
                                key: "diagnosisBasisAuxiliaryExamination"
                            }, {
                                label: "消化道症状（肠鸣音减弱、消失）",
                                key: "digestiveSymptomsBowelSoundsWeakenAndDisappear"
                            }, {
                                label: "消化道症状（肉眼血便）",
                                key: "digestiveSymptomsGrossBloodyStool"
                            }, {
                                label: "消化道症状（大便潜血）",
                                key: "digestiveSymptomsFecalOccultBlood"
                            }, {
                                label: "消化道症状（上消化道出血）",
                                key: "digestiveSymptomsUpperGastrointestinalBleeding"
                            }, {
                                label: "消化道症状（腹壁紧张）",
                                key: "digestiveSymptomsTightAbdominalWall"
                            }, {
                                label: "消化道症状（腹部触痛）",
                                key: "digestiveSymptomsAbdominalTenderness"
                            }, {
                                label: "腹片（肠间隙增宽）",
                                key: "abdominalRadiographWidenedIntestinalSpace"
                            }, {
                                label: "腹片（肠壁积气）",
                                key: "abdominalRadiographBowelWallGas"
                            }, {
                                label: "腹片（肝门积气）",
                                key: "abdominalRadiographHilarPneumoperitoneum"
                            }, {
                                label: "腹片（肠梗阻）",
                                key: "abdominalRadiographIntestinalObstruction"
                            }, {
                                label: "腹片（肠穿孔）",
                                key: "abdominalRadiographBowelPerforation"
                            }, {
                                label: "彩超（门静脉积气）",
                                key: "colorUltrasoundPneumaticPortalVein"
                            }, {
                                label: "彩超（腹水）",
                                key: "colorUltrasoundAscites"
                            }, {
                                label: "内科保守治疗",
                                key: "internalMedicineConservativeTreatment"
                            }, {
                                label: "内科保守治疗（转归）",
                                key: "internalMedicineConservativeTreatmentFate"
                            }, {
                                label: "手术治疗",
                                key: "operationTreatment"
                            }, {
                                label: "手术治疗（原因）",
                                key: "operationTreatmentReason"
                            }, {
                                label: "手术治疗（转归）",
                                key: "operationTreatmentFate"
                            }]
                        }, {
                            label: "其它诊断与治疗",
                            key: "other_diagnosis_and_treatment",
                            children: [{
                                label: "新生儿咽下综合征",
                                key: "neonatalSwallowingSyndrome"
                            }, {
                                label: "新生儿胃食管反流",
                                key: "neonatalGastroesophagealReflux"
                            }, {
                                label: "新生儿腹泻",
                                key: "neonatalDiarrhea"
                            }, {
                                label: "感染性肠炎",
                                key: "infectiousEnteritis"
                            }, {
                                label: "过敏性肠炎",
                                key: "allergicEnteritis"
                            }, {
                                label: "脐静脉置管",
                                key: "umbilicalVeinCatheter"
                            }, {
                                label: "消化道穿孔",
                                key: "digestiveTractPerforation"
                            }, {
                                label: "NEC相关消化道穿孔诊断时间",
                                key: "necRelatedDigestiveTractPerforationDiagnosisTime"
                            }, {
                                label: "首次自发性穿孔发生时间",
                                key: "firstSpontaneousPerforationTime"
                            }, {
                                label: "消化道穿孔（治疗）",
                                key: "digestiveTractPerforationTreatment"
                            }, {
                                label: "消化道出血",
                                key: "gastrointestinalBleeding"
                            }, {
                                label: "新生儿胆汁淤积综合征",
                                key: "neonatalCholestasisSyndrome"
                            }, {
                                label: "新生儿胆汁淤积综合征（诊断时间）",
                                key: "neonatalCholestasisSyndromeDiagnosisTime"
                            }, {
                                label: "新生儿胆汁淤积综合征（总胆红素）",
                                key: "totalBilirubin"
                            }, {
                                label: "新生儿胆汁淤积综合征（直接胆红素）",
                                key: "directBilirubin"
                            }, {
                                label: "新生儿胆汁淤积综合征（AST）",
                                key: "ast"
                            }, {
                                label: "新生儿胆汁淤积综合征（ALT）",
                                key: "alt"
                            }, {
                                label: "新生儿胆汁淤积综合征（TBA）",
                                key: "tba"
                            }]
                        }, {
                            label: "肠内营养管理",
                            key: "enm",
                            children: [{
                                label: "微量喂养结束时间",
                                key: "microfeedingEndTime"
                            }, {
                                label: "微量喂养持续时间",
                                key: "microfeedingDuration"
                            }, {
                                label: "奶量达30ml/kg/d的时间",
                                key: "milkVolumeReach30MlPKgPDTime"
                            }, {
                                label: "奶量达80ml/kg/d的时间",
                                key: "milkVolumeReach80MlPKgPDTime"
                            }, {
                                label: "奶量达120ml/kg/d的时间",
                                key: "milkVolumeReach120MlPKgPDTime"
                            }, {
                                label: "奶量达150ml/kg/d的时间",
                                key: "milkVolumeReach150MlPKgPDTime"
                            }, {
                                label: "喂养增加速度",
                                key: "feedingIncreaseRate"
                            }, {
                                label: "亲母母乳1-7d（ml/kg/d）",
                                key: "breastMilk1to7d"
                            }, {
                                label: "亲母母乳8-14d（ml/kg/d）",
                                key: "breastMilk8to14d"
                            }, {
                                label: "亲母母乳15-21d（ml/kg/d）",
                                key: "breastMilk15to21d"
                            }, {
                                label: "亲母母乳22-28d（ml/kg/d）",
                                key: "breastMilk22to28d"
                            }, {
                                label: "亲母母乳合计（ml/kg/d）",
                                key: "breastMilkTotal"
                            }, {
                                label: "捐献母乳1-7d（ml/kg/d）",
                                key: "donateBreastMilk1to7d"
                            }, {
                                label: "捐献母乳8-14d（ml/kg/d）",
                                key: "donateBreastMilk8to14d"
                            }, {
                                label: "捐献母乳15-21d（ml/kg/d）",
                                key: "donateBreastMilk15to21d"
                            }, {
                                label: "捐献母乳22-28d（ml/kg/d）",
                                key: "donateBreastMilk22to28d"
                            }, {
                                label: "捐献母乳合计（ml/kg/d）",
                                key: "donateBreastMilkTotal"
                            }, {
                                label: "深度水解奶1-7d（ml/kg/d）",
                                key: "deeplyHydrolyzedMilk1to7d"
                            }, {
                                label: "深度水解奶8-14d（ml/kg/d）",
                                key: "deeplyHydrolyzedMilk8to14d"
                            }, {
                                label: "深度水解奶15-21d（ml/kg/d）",
                                key: "deeplyHydrolyzedMilk15to21d"
                            }, {
                                label: "深度水解奶22-28d（ml/kg/d）",
                                key: "deeplyHydrolyzedMilk22to28d"
                            }, {
                                label: "深度水解奶合计（ml/kg/d）",
                                key: "deeplyHydrolyzedMilkTotal"
                            }, {
                                label: "部分水解奶1-7d（ml/kg/d）",
                                key: "partiallyHydrolyzedMilk1to7d"
                            }, {
                                label: "部分水解奶8-14d（ml/kg/d）",
                                key: "partiallyHydrolyzedMilk8to14d"
                            }, {
                                label: "部分水解奶15-21d（ml/kg/d）",
                                key: "partiallyHydrolyzedMilk15to21d"
                            }, {
                                label: "部分水解奶22-28d（ml/kg/d）",
                                key: "partiallyHydrolyzedMilk22to28d"
                            }, {
                                label: "部分水解奶合计（ml/kg/d）",
                                key: "partiallyHydrolyzedMilkTotal"
                            }, {
                                label: "氨基酸奶1-7d（ml/kg/d）",
                                key: "aminoAcidMilk1to7d"
                            }, {
                                label: "氨基酸奶8-14d（ml/kg/d）",
                                key: "aminoAcidMilk8to14d"
                            }, {
                                label: "氨基酸奶15-21d（ml/kg/d）",
                                key: "aminoAcidMilk15to21d"
                            }, {
                                label: "氨基酸奶22-28d（ml/kg/d）",
                                key: "aminoAcidMilk22to28d"
                            }, {
                                label: "氨基酸奶合计（ml/kg/d）",
                                key: "aminoAcidMilkTotal"
                            }, {
                                label: "普通配方奶1-7d（ml/kg/d）",
                                key: "regularFormulaMilk1to7d"
                            }, {
                                label: "普通配方奶8-14d（ml/kg/d）",
                                key: "regularFormulaMilk8to14d"
                            }, {
                                label: "普通配方奶15-21d（ml/kg/d）",
                                key: "regularFormulaMilk15to21d"
                            }, {
                                label: "普通配方奶22-28d（ml/kg/d）",
                                key: "regularFormulaMilk22to28d"
                            }, {
                                label: "普通配方奶合计（ml/kg/d）",
                                key: "regularFormulaMilkTotal"
                            }, {
                                label: "合计每日奶量1-7d（ml/kg/d）",
                                key: "totalDailyMilkVolume1to7d"
                            }, {
                                label: "合计每日奶量8-14d（ml/kg/d）",
                                key: "totalDailyMilkVolume8to14d"
                            }, {
                                label: "合计每日奶量15-21d（ml/kg/d）",
                                key: "totalDailyMilkVolume15to21d"
                            }, {
                                label: "合计每日奶量22-28d（ml/kg/d）",
                                key: "totalDailyMilkVolume22to28d"
                            }, {
                                label: "合计每日奶量合计（ml/kg/d）",
                                key: "totalDailyMilkVolumeTotal"
                            }, {
                                label: "肠内营养蛋白质1-7d（g/d）",
                                key: "enteralNutritionProteinGPD1to7d"
                            }, {
                                label: "肠内营养蛋白质8-14d（g/d）",
                                key: "enteralNutritionProteinGPD8to14d"
                            }, {
                                label: "肠内营养蛋白质15-21d（g/d）",
                                key: "enteralNutritionProteinGPD15to21d"
                            }, {
                                label: "肠内营养蛋白质22-28d（g/d）",
                                key: "enteralNutritionProteinGPD22to28d"
                            }, {
                                label: "肠内营养蛋白质合计（g/d）",
                                key: "enteralNutritionProteinGPDTotal"
                            }, {
                                label: "肠内营养蛋白质1-7d（g/kg/d）",
                                key: "enteralNutritionProteinGPKgPD1to7d"
                            }, {
                                label: "肠内营养蛋白质8-14d（g/kg/d）",
                                key: "enteralNutritionProteinGPKgPD8to14d"
                            }, {
                                label: "肠内营养蛋白质15-21d（g/kg/d）",
                                key: "enteralNutritionProteinGPKgPD15to21d"
                            }, {
                                label: "肠内营养蛋白质22-28d（g/kg/d）",
                                key: "enteralNutritionProteinGPKgPD22to28d"
                            }, {
                                label: "肠内营养蛋白质合计（g/kg/d）",
                                key: "enteralNutritionProteinGPKgPDTotal"
                            }, {
                                label: "奶量合计热卡1-7d（kcal/d）",
                                key: "totalMilkCaloriesKcalPD1to7d"
                            }, {
                                label: "奶量合计热卡8-14d（kcal/d）",
                                key: "totalMilkCaloriesKcalPD8to14d"
                            }, {
                                label: "奶量合计热卡15-21d（kcal/d）",
                                key: "totalMilkCaloriesKcalPD15to21d"
                            }, {
                                label: "奶量合计热卡22-28d（kcal/d）",
                                key: "totalMilkCaloriesKcalPD22to28d"
                            }, {
                                label: "奶量合计热卡合计（kcal/d）",
                                key: "totalMilkCaloriesKcalPDTotal"
                            }, {
                                label: "奶量合计热卡1-7d（kcal/kg/d）",
                                key: "totalMilkCaloriesKcalPKgPD1to7d"
                            }, {
                                label: "奶量合计热卡8-14d（kcal/kg/d）",
                                key: "totalMilkCaloriesKcalPKgPD8to14d"
                            }, {
                                label: "奶量合计热卡15-21d（kcal/kg/d）",
                                key: "totalMilkCaloriesKcalPKgPD15to21d"
                            }, {
                                label: "奶量合计热卡22-28d（kcal/kg/d）",
                                key: "totalMilkCaloriesKcalPKgPD22to28d"
                            }, {
                                label: "奶量合计热卡合计（kcal/kg/d）",
                                key: "totalMilkCaloriesKcalPKgPDTotal"
                            }]
                        }, {
                            label: "肠外营养管理",
                            key: "pnm",
                            children: [{
                                label: "氨基酸开始使用的时间",
                                key: "aminoAcidStartTime"
                            }, {
                                label: "氨基酸开始使用剂量",
                                key: "aminoAcidStartingDose"
                            }, {
                                label: "氨基酸最高剂量的时间",
                                key: "highestAminoAcidDoseTime"
                            }, {
                                label: "氨基酸最高剂量",
                                key: "highestAminoAcidDose"
                            }, {
                                label: "氨基酸停止使用的时间",
                                key: "stopAminoAcidsTime"
                            }, {
                                label: "氨基酸使用总量",
                                key: "totalAminoAcidUsed"
                            }, {
                                label: "脂肪乳开始使用的时间",
                                key: "fatEmulsionStartTime"
                            }, {
                                label: "脂肪乳开始使用剂量",
                                key: "fatEmulsionStartDose"
                            }, {
                                label: "脂肪乳使用最高剂量的时间",
                                key: "highestFatEmulsionDoseTime"
                            }, {
                                label: "脂肪乳最高剂量",
                                key: "highestFatEmulsionDose"
                            }, {
                                label: "脂肪乳停止使用的时间",
                                key: "stopFatEmulsionTime"
                            }, {
                                label: "脂肪乳使用总量",
                                key: "totalFatEmulsionUsed"
                            }, {
                                label: "静脉营养时间",
                                key: "intravenousNutritionTime"
                            }, {
                                label: "氨基酸停止使用时热卡",
                                key: "aminoAcidsStopUsingCalorie"
                            }, {
                                label: "合计热卡达30kcal/kg/d的时间",
                                key: "totalCaloricReach30KcalPKgPDTime"
                            }, {
                                label: "合计热卡达80kcal/kg/d的时间",
                                key: "totalCaloricReach80KcalPKgPDTime"
                            }, {
                                label: "合计热卡达120kcal/kg/d的时间",
                                key: "totalCaloricReach120KcalPKgPDTime"
                            }, {
                                label: "合计热卡达150kcal/kg/d的时间",
                                key: "totalCaloricReach150KcalPKgPDTime"
                            }, {
                                label: "碳水化合物1-7d（g/d）",
                                key: "carbohydrateGPD1to7d"
                            }, {
                                label: "碳水化合物8-14d（g/d）",
                                key: "carbohydrateGPD8to14d"
                            }, {
                                label: "碳水化合物15-21d（g/d）",
                                key: "carbohydrateGPD15to21d"
                            }, {
                                label: "碳水化合物22-28d（g/d）",
                                key: "carbohydrateGPD22to28d"
                            }, {
                                label: "碳水化合物合计（g/d）",
                                key: "carbohydrateGPDTotal"
                            }, {
                                label: "碳水化合物1-7d（g/kg/d）",
                                key: "carbohydrateGPKgPD1to7d"
                            }, {
                                label: "碳水化合物8-14d（g/kg/d）",
                                key: "carbohydrateGPKgPD8to14d"
                            }, {
                                label: "碳水化合物15-21d（g/kg/d）",
                                key: "carbohydrateGPKgPD15to21d"
                            }, {
                                label: "碳水化合物22-28d（g/kg/d）",
                                key: "carbohydrateGPKgPD22to28d"
                            }, {
                                label: "碳水化合物合计（g/kg/d）",
                                key: "carbohydrateGPKgPDTotal"
                            }, {
                                label: "碳水化合物热卡1-7d（kcal/d）",
                                key: "carbohydrateCalorie1to7d"
                            }, {
                                label: "碳水化合物热卡8-14d（kcal/d）",
                                key: "carbohydrateCalorie8to14d"
                            }, {
                                label: "碳水化合物热卡15-21d（kcal/d）",
                                key: "carbohydrateCalorie15to21d"
                            }, {
                                label: "碳水化合物热卡22-28d（kcal/d）",
                                key: "carbohydrateCalorie22to28d"
                            }, {
                                label: "碳水化合物热卡合计（kcal/d）",
                                key: "carbohydrateCalorieTotal"
                            }, {
                                label: "氨基酸1-7d（g/d）",
                                key: "aminoAcidGPD1to7d"
                            }, {
                                label: "氨基酸8-14d（g/d）",
                                key: "aminoAcidGPD8to14d"
                            }, {
                                label: "氨基酸15-21d（g/d）",
                                key: "aminoAcidGPD15to21d"
                            }, {
                                label: "氨基酸22-28d（g/d）",
                                key: "aminoAcidGPD22to28d"
                            }, {
                                label: "氨基酸合计（g/d）",
                                key: "aminoAcidGPDTotal"
                            }, {
                                label: "氨基酸1-7d（g/kg/d）",
                                key: "aminoAcidGPKgPD1to7d"
                            }, {
                                label: "氨基酸8-14d（g/kg/d）",
                                key: "aminoAcidGPKgPD8to14d"
                            }, {
                                label: "氨基酸15-21d（g/kg/d）",
                                key: "aminoAcidGPKgPD15to21d"
                            }, {
                                label: "氨基酸22-28d（g/kg/d）",
                                key: "aminoAcidGPKgPD22to28d"
                            }, {
                                label: "氨基酸合计（g/kg/d）",
                                key: "aminoAcidGPKgPDTotal"
                            }, {
                                label: "氨基酸热卡1-7d（kcal/d）",
                                key: "aminoAcidCalorie1to7d"
                            }, {
                                label: "氨基酸热卡8-14d（kcal/d）",
                                key: "aminoAcidCalorie8to14d"
                            }, {
                                label: "氨基酸热卡15-21d（kcal/d）",
                                key: "aminoAcidCalorie15to21d"
                            }, {
                                label: "氨基酸热卡21-28d（kcal/d）",
                                key: "aminoAcidCalorie22to28d"
                            }, {
                                label: "氨基酸热卡合计（kcal/d）",
                                key: "aminoAcidCalorieTotal"
                            }, {
                                label: "脂肪乳1-7d（g/d）",
                                key: "fatEmulsionGPD1to7d"
                            }, {
                                label: "脂肪乳8-14d（g/d）",
                                key: "fatEmulsionGPD8to14d"
                            }, {
                                label: "脂肪乳15-21d（g/d）",
                                key: "fatEmulsionGPD15to21d"
                            }, {
                                label: "脂肪乳22-28d（g/d）",
                                key: "fatEmulsionGPD22to28d"
                            }, {
                                label: "脂肪乳合计（g/d）",
                                key: "fatEmulsionGPDTotal"
                            }, {
                                label: "脂肪乳1-7d（g/kg/d）",
                                key: "fatEmulsionGPKgPD1to7d"
                            }, {
                                label: "脂肪乳8-14d（g/kg/d）",
                                key: "fatEmulsionGPKgPD8to14d"
                            }, {
                                label: "脂肪乳15-21d（g/kg/d）",
                                key: "fatEmulsionGPKgPD15to21d"
                            }, {
                                label: "脂肪乳22-28d（g/kg/d）",
                                key: "fatEmulsionGPKgPD22to28d"
                            }, {
                                label: "脂肪乳合计（g/kg/d）",
                                key: "fatEmulsionGPKgPDTotal"
                            }, {
                                label: "脂肪乳热卡1-7d（kcal/d）",
                                key: "fatEmulsionCalorie1to7d"
                            }, {
                                label: "脂肪乳热卡8-14d（kcal/d）",
                                key: "fatEmulsionCalorie8to14d"
                            }, {
                                label: "脂肪乳热卡15-21d（kcal/d）",
                                key: "fatEmulsionCalorie15to21d"
                            }, {
                                label: "脂肪乳热卡22-28d（kcal/d）",
                                key: "fatEmulsionCalorie22to28d"
                            }, {
                                label: "脂肪乳热卡合计（kcal/d）",
                                key: "fatEmulsionCalorieTotal"
                            }, {
                                label: "静脉营养热卡1-7d（kcal/d）",
                                key: "intravenousNutritionCalorieKcalPD1to7d"
                            }, {
                                label: "静脉营养热卡8-14d（kcal/d）",
                                key: "intravenousNutritionCalorieKcalPD8to14d"
                            }, {
                                label: "静脉营养热卡15-21d（kcal/d）",
                                key: "intravenousNutritionCalorieKcalPD15to21d"
                            }, {
                                label: "静脉营养热卡22-28d（kcal/d）",
                                key: "intravenousNutritionCalorieKcalPD22to28d"
                            }, {
                                label: "静脉营养热卡合计（kcal/d）",
                                key: "intravenousNutritionCalorieKcalPDTotal"
                            }, {
                                label: "静脉营养热卡1-7d（kcal/kg/d）",
                                key: "intravenousNutritionCalorieKcalPKgPD1to7d"
                            }, {
                                label: "静脉营养热卡8-14d（kcal/kg/d）",
                                key: "intravenousNutritionCalorieKcalPKgPD8to14d"
                            }, {
                                label: "静脉营养热卡15-21d（kcal/kg/d）",
                                key: "intravenousNutritionCalorieKcalPKgPD15to21d"
                            }, {
                                label: "静脉营养热卡22-28d（kcal/kg/d）",
                                key: "intravenousNutritionCalorieKcalPKgPD22to28d"
                            }, {
                                label: "静脉营养热卡合计（kcal/kg/d）",
                                key: "intravenousNutritionCalorieKcalPKgPDTotal"
                            }, {
                                label: "合计热卡1-7d（kcal/d）",
                                key: "totalCalorieKcalPD1to7d"
                            }, {
                                label: "合计热卡8-14d（kcal/d）",
                                key: "totalCalorieKcalPD8to14d"
                            }, {
                                label: "合计热卡15-21d（kcal/d）",
                                key: "totalCalorieKcalPD15to21d"
                            }, {
                                label: "合计热卡22-28d（kcal/d）",
                                key: "totalCalorieKcalPD22to28d"
                            }, {
                                label: "合计热卡合计（kcal/d）",
                                key: "totalCalorieKcalPDTotal"
                            }, {
                                label: "合计热卡1-7d（kcal/kg/d）",
                                key: "totalCalorieKcalPKgPD1to7d"
                            }, {
                                label: "合计热卡8-14d（kcal/kg/d）",
                                key: "totalCalorieKcalPKgPD8to14d"
                            }, {
                                label: "合计热卡15-21d（kcal/kg/d）",
                                key: "totalCalorieKcalPKgPD15to21d"
                            }, {
                                label: "合计热卡22-28d（kcal/kg/d）",
                                key: "totalCalorieKcalPKgPD22to28d"
                            }, {
                                label: "合计热卡合计（kcal/kg/d）",
                                key: "totalCalorieKcalPKgPDTotal"
                            }, {
                                label: "合计液体量1-7d（ml/kg/d）",
                                key: "totalLiquidVolume1to7d"
                            }, {
                                label: "合计液体量8-14d（ml/kg/d）",
                                key: "totalLiquidVolume8to14d"
                            }, {
                                label: "合计液体量15-21d（ml/kg/d）",
                                key: "totalLiquidVolume15to21d"
                            }, {
                                label: "合计液体量22-28d（ml/kg/d）",
                                key: "totalLiquidVolume22to28d"
                            }, {
                                label: "合计液体量合计（ml/kg/d）",
                                key: "totalLiquidVolumeTotal"
                            }]
                        }, {
                            label: "营养评价",
                            key: "nutritional_evaluation",
                            children: [{
                                label: "出生时间",
                                key: "birthTime"
                            }, {
                                label: "出生体重",
                                key: "birthWeight"
                            }, {
                                label: "出生体重z评分",
                                key: "birthWeightZScore"
                            }, {
                                label: "出生胎龄（周）",
                                key: "birthGestationalAgeWeek"
                            }, {
                                label: "出生胎龄（天）",
                                key: "birthGestationalAgeDay"
                            }, {
                                label: "小于胎龄儿",
                                key: "smallForGestationalAge"
                            }, {
                                label: "恢复出生体重日龄",
                                key: "birthWeightRecoveryDayAge"
                            }, {
                                label: "出生头围",
                                key: "birthHeadCircumference"
                            }, {
                                label: "出生头围z评分",
                                key: "birthHeadCircumferenceZScore"
                            }, {
                                label: "宫内头围发育迟缓",
                                key: "intrauterineHeadCircumferenceGrowthRetardation"
                            }, {
                                label: "出生身长",
                                key: "birthBodyLength"
                            }, {
                                label: "出生身长z评分",
                                key: "birthBodyLengthZScore"
                            }, {
                                label: "宫内身长发育迟缓",
                                key: "intrauterineBodyLengthGrowthRetardation"
                            }, {
                                label: "生后7d时间",
                                key: "afterBirth7DayTime"
                            }, {
                                label: "生后7d体重",
                                key: "afterBirth7DayWeight"
                            }, {
                                label: "生后7d体重z评分",
                                key: "afterBirth7DayWeightZScore"
                            }, {
                                label: "生后7d胎龄（周）",
                                key: "afterBirth7DayGestationalAgeWeek"
                            }, {
                                label: "生后7d胎龄（天）",
                                key: "afterBirth7DayGestationalAgeDay"
                            }, {
                                label: "生后7d体重z评分的变化值（Δz）",
                                key: "afterBirth7DayWeightZScoreChange"
                            }, {
                                label: "生后7d（恢复到出生体重后）平均体重增长速度",
                                key: "afterBirth7DayAverageWeightGain"
                            }, {
                                label: "生后7d宫外发育迟缓",
                                key: "afterBirth7DayExtrauterineGrowthRetardation"
                            }, {
                                label: "生后7d头围",
                                key: "afterBirth7DayHeadCircumference"
                            }, {
                                label: "生后7d头围z评分",
                                key: "afterBirth7DayHeadCircumferenceZScore"
                            }, {
                                label: "生后7d头围z评分的变化值（Δz）",
                                key: "afterBirth7DayHeadCircumferenceZScoreChange"
                            }, {
                                label: "生后7d头围发育迟缓",
                                key: "afterBirth7DayHeadCircumferenceGrowthRetardation"
                            }, {
                                label: "生后7d身长",
                                key: "afterBirth7DayBodyLength"
                            }, {
                                label: "生后7d身长z评分",
                                key: "afterBirth7DayBodyLengthZScore"
                            }, {
                                label: "生后7d身长z评分的变化值（Δz）",
                                key: "afterBirth7DayBodyLengthZScoreChange"
                            }, {
                                label: "生后7d身长发育迟缓",
                                key: "afterBirth7DayBodyLengthGrowthRetardation"
                            }, {
                                label: "生后14d时间",
                                key: "afterBirth14DayTime"
                            }, {
                                label: "生后14d体重",
                                key: "afterBirth14DayWeight"
                            }, {
                                label: "生后14d体重z评分",
                                key: "afterBirth14DayWeightZScore"
                            }, {
                                label: "生后14d胎龄（周）",
                                key: "afterBirth14DayGestationalAgeWeek"
                            }, {
                                label: "生后14d胎龄（天）",
                                key: "afterBirth14DayGestationalAgeDay"
                            }, {
                                label: "生后14d体重z评分的变化值（Δz）",
                                key: "afterBirth14DayWeightZScoreChange"
                            }, {
                                label: "生后14d（恢复到出生体重后）平均体重增长速度",
                                key: "afterBirth14DayAverageWeightGain"
                            }, {
                                label: "生后14d宫外发育迟缓",
                                key: "afterBirth14DayExtrauterineGrowthRetardation"
                            }, {
                                label: "生后14d头围",
                                key: "afterBirth14DayHeadCircumference"
                            }, {
                                label: "生后14d头围z评分",
                                key: "afterBirth14DayHeadCircumferenceZScore"
                            }, {
                                label: "生后14d头围z评分的变化值（Δz）",
                                key: "afterBirth14DayHeadCircumferenceZScoreChange"
                            }, {
                                label: "生后14d头围发育迟缓",
                                key: "afterBirth14DayHeadCircumferenceGrowthRetardation"
                            }, {
                                label: "生后14d身长",
                                key: "afterBirth14DayBodyLength"
                            }, {
                                label: "生后14d身长z评分",
                                key: "afterBirth14DayBodyLengthZScore"
                            }, {
                                label: "生后14d身长z评分的变化值（Δz）",
                                key: "afterBirth14DayBodyLengthZScoreChange"
                            }, {
                                label: "生后14d身长发育迟缓",
                                key: "afterBirth14DayBodyLengthGrowthRetardation"
                            }, {
                                label: "生后21d时间",
                                key: "afterBirth21DayTime"
                            }, {
                                label: "生后21d体重",
                                key: "afterBirth21DayWeight"
                            }, {
                                label: "生后21d体重z评分",
                                key: "afterBirth21DayWeightZScore"
                            }, {
                                label: "生后21d胎龄（周）",
                                key: "afterBirth21DayGestationalAgeWeek"
                            }, {
                                label: "生后21d胎龄（天）",
                                key: "afterBirth21DayGestationalAgeDay"
                            }, {
                                label: "生后21d体重z评分的变化值（Δz）",
                                key: "afterBirth21DayWeightZScoreChange"
                            }, {
                                label: "生后21d（恢复到出生体重后）平均体重增长速度",
                                key: "afterBirth21DayAverageWeightGain"
                            }, {
                                label: "生后21d宫外发育迟缓",
                                key: "afterBirth21DayExtrauterineGrowthRetardation"
                            }, {
                                label: "生后21d头围",
                                key: "afterBirth21DayHeadCircumference"
                            }, {
                                label: "生后21d头围z评分",
                                key: "afterBirth21DayHeadCircumferenceZScore"
                            }, {
                                label: "生后21d头围z评分的变化值（Δz）",
                                key: "afterBirth21DayHeadCircumferenceZScoreChange"
                            }, {
                                label: "生后21d头围发育迟缓",
                                key: "afterBirth21DayHeadCircumferenceGrowthRetardation"
                            }, {
                                label: "生后21d身长",
                                key: "afterBirth21DayBodyLength"
                            }, {
                                label: "生后21d身长z评分",
                                key: "afterBirth21DayBodyLengthZScore"
                            }, {
                                label: "生后21d身长z评分的变化值（Δz）",
                                key: "afterBirth21DayBodyLengthZScoreChange"
                            }, {
                                label: "生后21d身长发育迟缓",
                                key: "afterBirth21DayBodyLengthGrowthRetardation"
                            }, {
                                label: "生后28d时间",
                                key: "afterBirth28DayTime"
                            }, {
                                label: "生后28d体重",
                                key: "afterBirth28DayWeight"
                            }, {
                                label: "生后28d体重z评分",
                                key: "afterBirth28DayWeightZScore"
                            }, {
                                label: "生后28d胎龄（周）",
                                key: "afterBirth28DayGestationalAgeWeek"
                            }, {
                                label: "生后28d胎龄（天）",
                                key: "afterBirth28DayGestationalAgeDay"
                            }, {
                                label: "生后28d体重z评分的变化值（Δz）",
                                key: "afterBirth28DayWeightZScoreChange"
                            }, {
                                label: "生后28d（恢复到出生体重后）平均体重增长速度",
                                key: "afterBirth28DayAverageWeightGain"
                            }, {
                                label: "生后28d宫外发育迟缓",
                                key: "afterBirth28DayExtrauterineGrowthRetardation"
                            }, {
                                label: "生后28d头围",
                                key: "afterBirth28DayHeadCircumference"
                            }, {
                                label: "生后28d头围z评分",
                                key: "afterBirth28DayHeadCircumferenceZScore"
                            }, {
                                label: "生后28d头围z评分的变化值（Δz）",
                                key: "afterBirth28DayHeadCircumferenceZScoreChange"
                            }, {
                                label: "生后28d头围发育迟缓",
                                key: "afterBirth28DayHeadCircumferenceGrowthRetardation"
                            }, {
                                label: "生后28d身长",
                                key: "afterBirth28DayBodyLength"
                            }, {
                                label: "生后28d身长z评分",
                                key: "afterBirth28DayBodyLengthZScore"
                            }, {
                                label: "生后28d身长z评分的变化值（Δz）",
                                key: "afterBirth28DayBodyLengthZScoreChange"
                            }, {
                                label: "生后28d身长发育迟缓",
                                key: "afterBirth28DayBodyLengthGrowthRetardation"
                            }, {
                                label: "出院时间",
                                key: "dischargeTime"
                            }, {
                                label: "出院日龄",
                                key: "dischargeDayAge"
                            }, {
                                label: "出院体重",
                                key: "dischargeWeight"
                            }, {
                                label: "出院体重z评分",
                                key: "dischargeWeightZScore"
                            }, {
                                label: "出院纠正胎龄（周）",
                                key: "dischargeGestationalAgeWeek"
                            }, {
                                label: "出院纠正胎龄（天）",
                                key: "dischargeGestationalAgeDay"
                            }, {
                                label: "出院体重z评分的变化值（Δz）",
                                key: "dischargeWeightZScoreChange"
                            }, {
                                label: "住院期间（恢复到出生体重后）平均体重增长速度",
                                key: "duringHospitalizationAverageWeightGain"
                            }, {
                                label: "出院宫外发育迟缓",
                                key: "dischargeExtrauterineGrowthRetardation"
                            }, {
                                label: "出院头围",
                                key: "dischargeHeadCircumference"
                            }, {
                                label: "出院头围z评分",
                                key: "dischargeHeadCircumferenceZScore"
                            }, {
                                label: "出院头围z评分的变化值（Δz）",
                                key: "dischargeHeadCircumferenceZScoreChange"
                            }, {
                                label: "出院头围发育迟缓",
                                key: "dischargeHeadCircumferenceGrowthRetardation"
                            }, {
                                label: "出院身长",
                                key: "dischargeBodyLength"
                            }, {
                                label: "出院身长z评分",
                                key: "dischargeBodyLengthZScore"
                            }, {
                                label: "出院身长z评分的变化值（Δz）",
                                key: "dischargeBodyLengthZScoreChange"
                            }, {
                                label: "出院身长发育迟缓",
                                key: "dischargeBodyLengthGrowthRetardation"
                            }]
                        }]
                    }, {
                        label: "感染检测",
                        key: "is_",
                        children: [{
                            label: "EOS流程",
                            key: "eos",
                            children: [{
                                label: "生后72h",
                                key: "afterBirth72hDate"
                            }, {
                                label: "72h内是否需要评估",
                                key: "needEvaluateWithin72h"
                            }, {
                                label: "评估次数",
                                key: "evaluationsNumber"
                            }, {
                                label: "早产",
                                key: "prematureDelivery"
                            }, {
                                label: "胎膜早破≥18h",
                                key: "prematureRuptureMembranesGt18h"
                            }, {
                                label: "低出生体重儿",
                                key: "lowBirthWeightInfant"
                            }, {
                                label: "绒毛膜羊膜炎",
                                key: "chorioamnionitis"
                            }, {
                                label: "血培养",
                                key: "bloodCulture"
                            }, {
                                label: "血培养次数",
                                key: "bloodCultureNumber"
                            }, {
                                label: "血培养阳性次数",
                                key: "positiveBloodCultureNumber"
                            }, {
                                label: "血培养阴性次数",
                                key: "negativeBloodCultureNumber"
                            }, {
                                label: "确诊早发型败血症",
                                key: "diagnosedEarlyOnsetSepsis"
                            }, {
                                label: "非特异性检查",
                                key: "nonSpecificInspection"
                            }, {
                                label: "72h内/生后（血常规检查次数）",
                                key: "routineBloodTestNumber"
                            }, {
                                label: "72h内/生后（CRP检查次数）",
                                key: "crpInspectionsNumber"
                            }, {
                                label: "72h内/生后（PCT检查次数）",
                                key: "pctInspectionsNumber"
                            }, {
                                label: "72h内/生后（临床早发型败血症）",
                                key: "clinicalEarlyOnsetSepsis"
                            }, {
                                label: "72h内/生后（脑脊液培养次数）",
                                key: "cerebrospinalFluidCultureNumber"
                            }, {
                                label: "72h内/生后（脑脊液培养阴性次数）",
                                key: "negativeCerebrospinalFluidCultureNumber"
                            }, {
                                label: "化脓性脑膜炎",
                                key: "purulentMeningitis"
                            }, {
                                label: "化脓性脑膜炎（确诊日期）",
                                key: "purulentMeningitisDiagnosisDate"
                            }, {
                                label: "病毒性脑膜炎",
                                key: "viralMeningitis"
                            }, {
                                label: "病毒性脑膜炎（确诊日期）",
                                key: "viralMeningitisDiagnosisDate"
                            }]
                        }, {
                            label: "LOS流程",
                            key: "los",
                            children: [{
                                label: "生后是否需要评估",
                                key: "needEvaluateAfterBirth"
                            }, {
                                label: "评估次数",
                                key: "evaluationsNumber"
                            }, {
                                label: "早产",
                                key: "prematureDelivery"
                            }, {
                                label: "低出生体重儿",
                                key: "lowBirthWeightInfant"
                            }, {
                                label: "确诊晚发型败血症",
                                key: "diagnosedLateOnsetSepsis"
                            }, {
                                label: "晚发型败血症（诊断次数）",
                                key: "dlosDiagnoseNumber"
                            }, {
                                label: "晚发型败血症（诊断时间）",
                                key: "dlosDiagnoseTime"
                            }, {
                                label: "血培养",
                                key: "bloodCulture"
                            }, {
                                label: "血培养次数",
                                key: "bloodCultureNumber"
                            }, {
                                label: "血培养阳性次数",
                                key: "positiveBloodCultureNumber"
                            }, {
                                label: "血培养阴性次数",
                                key: "negativeBloodCultureNumber"
                            }, {
                                label: "非特异性检查",
                                key: "nonSpecificInspection"
                            }, {
                                label: "≥72h/生后（血常规检查次数）",
                                key: "routineBloodTestNumber"
                            }, {
                                label: "≥72h/生后（CRP检查次数）",
                                key: "crpInspectionsNumber"
                            }, {
                                label: "≥72h/生后（PCT检查次数）",
                                key: "pctInspectionsNumber"
                            }, {
                                label: "临床晚发型败血症",
                                key: "clinicalLateOnsetSepsis"
                            }, {
                                label: "临床晚发型败血症（诊断）",
                                key: "closDiagnoseNumber"
                            }, {
                                label: "临床晚发型败血症（诊断时间）",
                                key: "closDiagnoseTime"
                            }, {
                                label: "≥72h/生后（脑脊液培养次数）",
                                key: "cerebrospinalFluidCultureNumber"
                            }, {
                                label: "≥72h/生后（脑脊液培养阳性次数）",
                                key: "positiveCerebrospinalFluidCultureNumber"
                            }, {
                                label: "≥72h/生后（脑脊液培养阴性次数）",
                                key: "negativeCerebrospinalFluidCultureNumber"
                            }, {
                                label: "化脓性脑膜炎",
                                key: "purulentMeningitis"
                            }, {
                                label: "化脓性脑膜炎（确诊日期）",
                                key: "purulentMeningitisDiagnosisDate"
                            }, {
                                label: "病毒性脑膜炎",
                                key: "viralMeningitis"
                            }, {
                                label: "病毒性脑膜炎（确诊日期）",
                                key: "viralMeningitisDiagnosisDate"
                            }]
                        }, {
                            label: "抗菌药物",
                            key: "ad",
                            children: [{
                                label: "抗菌药物合计",
                                key: "totalAntibacterialDrugNumber"
                            }, {
                                label: "抗菌药物(DOT)合计",
                                key: "totalAntibacterialDrugDotNumber"
                            }, {
                                label: "抗菌药物(LOT)合计",
                                key: "totalAntibacterialDrugLotNumber"
                            }]
                        }, {
                            label: "评价指标",
                            key: "evaluation_index",
                            children: [{
                                label: "住院期间是否使用抗生素治疗",
                                key: "whetherUseAntibioticsDuringHospitalization"
                            }, {
                                label: "限制级抗生素使用",
                                key: "restrictedAntibioticsUse"
                            }, {
                                label: "特殊级抗生素使用",
                                key: "specialGradeAntibioticsUse"
                            }]
                        }, {
                            label: "其它感染诊断",
                            key: "oid",
                            children: [{
                                label: "尿路感染",
                                key: "urinaryTractInfection"
                            }, {
                                label: "尿路感染（诊断时间）",
                                key: "utiDiagnosisTime"
                            }, {
                                label: "化脓性脑膜炎",
                                key: "purulentMeningitis"
                            }, {
                                label: "化脓性脑膜炎（诊断时间）",
                                key: "pmDiagnosisTime"
                            }, {
                                label: "病毒性脑膜炎",
                                key: "viralMeningitis"
                            }, {
                                label: "病毒性脑膜炎（诊断时间）",
                                key: "vmDiagnosisTime"
                            }, {
                                label: "导管相关血流感染",
                                key: "catheterRelatedBloodstreamInfection"
                            }, {
                                label: "导管相关血流感染（诊断时间）",
                                key: "crbiDiagnosisTime"
                            }]
                        }]
                    }, {
                        label: "循环系统",
                        key: "circulatory_system",
                        children: [{
                            label: "PPHN",
                            key: "pphn"
                        }, {
                            label: "诊断日期",
                            key: "pphnDiagnosisDate"
                        }, {
                            label: "最高FiO<sub>2</sub>",
                            key: "highestFiO2"
                        }, {
                            label: "西地那非",
                            key: "sildenafil"
                        }, {
                            label: "西地那非（开始时间）",
                            key: "sildenafilStartTime"
                        }, {
                            label: "西地那非（结束时间）",
                            key: "sildenafilEndTime"
                        }, {
                            label: "NO吸入",
                            key: "noInhalation"
                        }, {
                            label: "NO吸入（开始时间）",
                            key: "noInhalationStartTime"
                        }, {
                            label: "NO吸入（结束时间）",
                            key: "noInhalationEndTime"
                        }, {
                            label: "不良反应（高铁血红蛋白）",
                            key: "methemoglobin"
                        }, {
                            label: "不良反应（凝血功能异常）",
                            key: "abnormalBloodClottingFunction"
                        }, {
                            label: "不良反应（Hb最低值）",
                            key: "minimumHb"
                        }, {
                            label: "动脉导管未闭",
                            key: "patentDuctusArteriosus"
                        }, {
                            label: "PDA治疗",
                            key: "pdaTreatment"
                        }, {
                            label: "PDA治疗（次数）",
                            key: "pdaTreatmentNumber"
                        }, {
                            label: "心律失常",
                            key: "arrhythmia"
                        }, {
                            label: "心律失常（诊断日期）",
                            key: "arrhythmiaDiagnosisDate"
                        }, {
                            label: "休克",
                            key: "shock"
                        }, {
                            label: "休克（诊断日期）",
                            key: "shockDiagnosisDate"
                        }, {
                            label: "心力衰竭",
                            key: "heartFailure"
                        }, {
                            label: "心力衰竭（诊断日期）",
                            key: "heartFailureDiagnosisDate"
                        }, {
                            label: "缺血缺氧性心肌损害",
                            key: "ischemicHypoxicMyocardialDamage"
                        }, {
                            label: "缺血缺氧性心肌损害（诊断日期）",
                            key: "ihmdDiagnosisDate"
                        }]
                    }, {
                        label: "神经系统",
                        key: "ns_",
                        children: [{
                            label: "辅助检查",
                            key: "ae",
                            children: [{
                                label: "左侧（最重）（检查技术）（彩超）",
                                key: "leftInspectionTechnologyColorDoppler"
                            }, {
                                label: "左侧（最重）（检查技术）（MRI）",
                                key: "leftInspectionTechnologyMRI"
                            }, {
                                label: "左侧（最重）（检查技术）（CT）",
                                key: "leftInspectionTechnologyCT"
                            }, {
                                label: "左侧（最重）（检查时间）",
                                key: "leftInspectionTime"
                            }, {
                                label: "左侧（最重）（检查结果）",
                                key: "leftInspectionResult"
                            }, {
                                label: "左侧（最重）（生发层出血）",
                                key: "leftGerminalHemorrhage"
                            }, {
                                label: "左侧（最重）（脑室内出血）",
                                key: "leftIntraventricularHemorrhage"
                            }, {
                                label: "左侧（最重）（脑实质病变）",
                                key: "leftParenchymalBrainDisease"
                            }, {
                                label: "左侧（最重）（脑室旁白质软化）",
                                key: "leftPeriventricularWhiteMatterSoftening"
                            }, {
                                label: "左侧（最重）（脑室扩增）",
                                key: "leftVentricularExpansion"
                            }, {
                                label: "左侧（最重）（脑室扩增大小）",
                                key: "leftVentricularExpansionSize"
                            }, {
                                label: "左侧（最重）（其他中枢病变）（蛛网膜下腔出血）",
                                key: "leftOtherCentralDiseaseSubarachnoidHemorrhage"
                            }, {
                                label: "左侧（最重）（其他中枢病变）（硬膜下出血）",
                                key: "leftOtherCentralDiseaseSubduralHemorrhage"
                            }, {
                                label: "左侧（最重）（其他中枢病变）（小脑幕出血）",
                                key: "leftOtherCentralDiseaseTentoriumHemorrhage"
                            }, {
                                label: "左侧（最重）（其他中枢病变）（脑积水）",
                                key: "leftOtherCentralDiseaseHydrocephalus"
                            }, {
                                label: "左侧（最重）（其他中枢病变）（蛛网膜囊肿）",
                                key: "leftOtherCentralDiseaseArachnoidCyst"
                            }, {
                                label: "左侧（最重）（其他中枢病变）（尾状沟囊肿）",
                                key: "leftOtherCentralDiseaseCaudateSulcusCyst"
                            }, {
                                label: "左侧（最重）（其他中枢病变）（脉络丛囊肿）",
                                key: "leftOtherCentralDiseaseChoroidPlexusCyst"
                            }, {
                                label: "左侧（最重）（其他中枢病变）（室管膜下囊肿）",
                                key: "leftOtherCentralDiseaseSubependymalCyst"
                            }, {
                                label: "左侧（最重）（其他中枢病变）（其它脑实质囊肿）",
                                key: "leftOtherCentralDiseaseOtherBrainParenchymalCysts"
                            }, {
                                label: "左侧（最重）（脑电图）",
                                key: "leftEeg"
                            }, {
                                label: "左侧（最重）（脑电图）（时间）",
                                key: "leftEegTime"
                            }, {
                                label: "左侧（最重）（脑电图）（结果）",
                                key: "leftEegResult"
                            }, {
                                label: "右侧（最重）（检查技术）（彩超）",
                                key: "rightInspectionTechnologyColorDoppler"
                            }, {
                                label: "右侧（最重）（检查技术）（MRI）",
                                key: "rightInspectionTechnologyMRI"
                            }, {
                                label: "右侧（最重）（检查技术）（CT）",
                                key: "rightInspectionTechnologyCT"
                            }, {
                                label: "右侧（最重）（检查时间）",
                                key: "rightInspectionTechnologyCT"
                            }, {
                                label: "右侧（最重）（检查结果）",
                                key: "rightInspectionResult"
                            }, {
                                label: "右侧（最重）（生发层出血）",
                                key: "rightGerminalHemorrhage"
                            }, {
                                label: "右侧（最重）（脑室内出血）",
                                key: "rightIntraventricularHemorrhage"
                            }, {
                                label: "右侧（最重）（脑实质病变）",
                                key: "rightParenchymalBrainDisease"
                            }, {
                                label: "右侧（最重）（脑室旁白质软化）",
                                key: "rightPeriventricularWhiteMatterSoftening"
                            }, {
                                label: "右侧（最重）（脑室扩增）",
                                key: "rightVentricularExpansion"
                            }, {
                                label: "右侧（最重）（脑室扩增大小）",
                                key: "rightVentricularExpansionSize"
                            }, {
                                label: "右侧（最重）（其他中枢病变）（蛛网膜下腔出血）",
                                key: "rightOtherCentralDiseaseSubarachnoidHemorrhage"
                            }, {
                                label: "右侧（最重）（其他中枢病变）（硬膜下出血）",
                                key: "rightOtherCentralDiseaseSubduralHemorrhage"
                            }, {
                                label: "右侧（最重）（其他中枢病变）（小脑幕出血）",
                                key: "rightOtherCentralDiseaseTentoriumHemorrhage"
                            }, {
                                label: "右侧（最重）（其他中枢病变）（脑积水）",
                                key: "rightOtherCentralDiseaseHydrocephalus"
                            }, {
                                label: "右侧（最重）（其他中枢病变）（蛛网膜囊肿）",
                                key: "rightOtherCentralDiseaseArachnoidCyst"
                            }, {
                                label: "右侧（最重）（其他中枢病变）（尾状沟囊肿）",
                                key: "rightOtherCentralDiseaseCaudateSulcusCyst"
                            }, {
                                label: "右侧（最重）（其他中枢病变）（脉络丛囊肿）",
                                key: "rightOtherCentralDiseaseChoroidPlexusCyst"
                            }, {
                                label: "右侧（最重）（其他中枢病变）（室管膜下囊肿）",
                                key: "rightOtherCentralDiseaseSubependymalCyst"
                            }, {
                                label: "右侧（最重）（其他中枢病变）（其它脑实质囊肿）",
                                key: "rightOtherCentralDiseaseOtherBrainParenchymalCysts"
                            }, {
                                label: "右侧（最重）（脑电图）",
                                key: "rightEeg"
                            }, {
                                label: "右侧（最重）（脑电图）（时间）",
                                key: "rightEegTime"
                            }, {
                                label: "右侧（最重）（脑电图）（结果）",
                                key: "rightEegResult"
                            }]
                        }, {
                            label: "治疗及诊断",
                            key: "td",
                            children: [{
                                label: "新生儿缺血缺氧性脑病",
                                key: "neonatalHypoxicIschemicEncephalopathy"
                            }, {
                                label: "新生儿缺血缺氧性脑病（诊断日期）",
                                key: "nhieDiagnosisDate"
                            }, {
                                label: "亚低温",
                                key: "mildHypothermia"
                            }, {
                                label: "亚低温（开始时间）",
                                key: "mhStartTime"
                            }, {
                                label: "亚低温（到达目标温度时间）",
                                key: "mhReachTargetTemperatureTime"
                            }, {
                                label: "不良反应（呼吸暂停）",
                                key: "adverseReactionsApnea"
                            }, {
                                label: "不良反应（心动过缓）",
                                key: "adverseReactionsBradycardia"
                            }, {
                                label: "不良反应（皮下坏疽）",
                                key: "adverseReactionsSubcutaneousGangrene"
                            }, {
                                label: "不良反应（血小板减少）",
                                key: "adverseReactionsThrombocytopenia"
                            }, {
                                label: "不良反应（凝血功能异常）",
                                key: "adverseReactionsAbnormalBloodClottingFunction"
                            }, {
                                label: "脑室出血",
                                key: "ventricularHemorrhage"
                            }, {
                                label: "脑室出血（诊断日期）",
                                key: "vhDiagnosisDate"
                            }, {
                                label: "其他脑出血（小脑出血）",
                                key: "otherCerebralHemorrhageCerebellar"
                            }, {
                                label: "其他脑出血（硬膜下出血）",
                                key: "otherCerebralHemorrhageSubdural"
                            }, {
                                label: "其他脑出血（蛛网膜下腔出血）",
                                key: "otherCerebralHemorrhageSubarachnoid"
                            }, {
                                label: "其他脑出血（诊断日期）",
                                key: "ochDiagnosisDate"
                            }, {
                                label: "其他脑出血（治疗）（观察）",
                                key: "treatmentObserve"
                            }, {
                                label: "其他脑出血（治疗）（反复腰穿）",
                                key: "treatmentRepeatedWaistWear"
                            }, {
                                label: "其他脑出血（治疗）（储液囊）",
                                key: "treatmentReservoir"
                            }, {
                                label: "其他脑出血（治疗）（脑室外引流）",
                                key: "treatmentVentricularDrainage"
                            }, {
                                label: "其他脑出血（治疗）（VP分流）",
                                key: "treatmentVpShunt"
                            }, {
                                label: "脑室周围白质软化",
                                key: "periventricularWhiteMatterSoftening"
                            }, {
                                label: "脑室周围白质软化（诊断日期）",
                                key: "pwmsDiagnosisDate"
                            }]
                        }]
                    }, {
                        label: "视网膜病",
                        key: "rp_",
                        children: [{
                            label: "筛查情况",
                            key: "screening_status",
                            children: [{
                                label: "是否需要进行ROP筛查",
                                key: "whetherNeedRopScreening"
                            }, {
                                label: "首次筛查日期（生后4周）",
                                key: "firstScreeningDate4WeeksAfterBirth"
                            }, {
                                label: "首次筛查日期（生后4周）（矫正胎龄）（周）",
                                key: "correctGestationalAge4WeeksAfterBirthWeek"
                            }, {
                                label: "首次筛查日期（生后4周）（矫正胎龄）（周）",
                                key: "correctGestationalAge4WeeksAfterBirthDay"
                            }, {
                                label: "首次筛查日期（生后6周）",
                                key: "firstScreeningDate6WeeksAfterBirth"
                            }, {
                                label: "首次筛查日期（生后6周）（矫正胎龄）（周）",
                                key: "correctGestationalAge6WeeksAfterBirthWeek"
                            }, {
                                label: "首次筛查日期（生后6周）（矫正胎龄）（周）",
                                key: "correctGestationalAge6WeeksAfterBirthDay"
                            }, {
                                label: "筛查次数",
                                key: "screeningNumber"
                            }, {
                                label: "治疗次数",
                                key: "treatmentsNumber"
                            }]
                        }, {
                            label: "筛查评估",
                            key: "screening_assessment",
                            children: [{
                                label: "是否需要干预",
                                key: "whetherNeedIntervene"
                            }, {
                                label: "确诊干预时间",
                                key: "confirmedInterventionTime"
                            }, {
                                label: "实际干预时间",
                                key: "actualInterventionTime"
                            }, {
                                label: "确诊到治疗的时间",
                                key: "timeFromDiagnosisToTreatment"
                            }, {
                                label: "是否按照间隔进行筛查",
                                key: "whetherScreenAtIntervals"
                            }, {
                                label: "Ⅰ区无ROP，1期或2期ROP每周检查1次",
                                key: "noRopInZone1"
                            }, {
                                label: "Ⅰ区退行ROP，可以1-2周检查1次",
                                key: "regressiveRopInZone1"
                            }, {
                                label: "Ⅱ区2期或3期病变，可以每周检查1次",
                                key: "stage2Or3DiseaseInZone2"
                            }, {
                                label: "Ⅱ区1期病变，可以1-2周检查1次",
                                key: "stage1DiseaseInZone2"
                            }, {
                                label: "Ⅱ区1期或无ROP，或Ⅲ区1期、2期，可以2-3周随诊",
                                key: "stage1DiseaseOrNoRopInZone2"
                            }, {
                                label: "终止检查日期",
                                key: "inspectionTerminationDate"
                            }, {
                                label: "矫正胎龄45周",
                                key: "correctedGestationalAge45WeeksDate"
                            }, {
                                label: "视网膜血管化（鼻侧已达锯齿缘，颞侧锯齿缘1个视乳头直径）",
                                key: "retinalVascularization"
                            }, {
                                label: "矫正胎龄45周，无阈值前病变或阈值病变，视网膜血管已发育到Ⅲ区",
                                key: "cga45wNoPreOrThresholdLesionRetinalBloodVesselsDevelopZone3"
                            }, {
                                label: "视网膜病变退行",
                                key: "retinopathyRegression"
                            }]
                        }, {
                            label: "ROP诊断",
                            key: "rop_diagnosis",
                            children: [{
                                label: "左眼（诊断日期）",
                                key: "leftEyeDiagnosisDate"
                            }, {
                                label: "左眼（最高分期）（分期）",
                                key: "leftEyeStaging"
                            }, {
                                label: "左眼（最高分期）（分区）",
                                key: "leftEyeZone"
                            }, {
                                label: "左眼（最高分期）（plus病变）",
                                key: "leftEyePlusLesion"
                            }, {
                                label: "左眼（最高分期）（AP-ROP）",
                                key: "leftEyeApRop"
                            }, {
                                label: "左眼（最高分期）（最高级别治疗日期）",
                                key: "leftEyeHighestLevelTreatmentDate"
                            }, {
                                label: "左眼（最高分期）（最高级别治疗）",
                                key: "leftEyeHighestLevelTreatment"
                            }, {
                                label: "右眼（诊断日期）",
                                key: "leftEyeDiagnosisDate"
                            }, {
                                label: "右眼（最高分期）（分期）",
                                key: "leftEyeStaging"
                            }, {
                                label: "右眼（最高分期）（分区）",
                                key: "leftEyeZone"
                            }, {
                                label: "右眼（最高分期）（plus病变）",
                                key: "leftEyePlusLesion"
                            }, {
                                label: "右眼（最高分期）（AP-ROP）",
                                key: "leftEyeApRop"
                            }, {
                                label: "右眼（最高分期）（最高级别治疗日期）",
                                key: "leftEyeHighestLevelTreatmentDate"
                            }, {
                                label: "右眼（最高分期）（最高级别治疗）",
                                key: "leftEyeHighestLevelTreatment"
                            }]
                        }]
                    }, {
                        label: "出院情况",
                        key: "discharge_situation",
                        children: [{
                            label: "纠正胎龄（周）",
                            key: "correctGestationalAgeWeek"
                        }, {
                            label: "纠正胎龄（天）",
                            key: "correctGestationalAgeDay"
                        }, {
                            label: "住院时长",
                            key: "hospitalStay"
                        }, {
                            label: "出院体重",
                            key: "dischargeWeight"
                        }, {
                            label: "出院体重Z评分",
                            key: "dischargeWeightZScore"
                        }, {
                            label: "出院头围",
                            key: "dischargeHeadCircumference"
                        }, {
                            label: "出院头围Z评分",
                            key: "dischargeHeadCircumferenceZScore"
                        }, {
                            label: "出院身长",
                            key: "dischargeLength"
                        }, {
                            label: "出院身长Z评分",
                            key: "dischargeLengthZScore"
                        }, {
                            label: "宫外生长迟缓（EUGR）",
                            key: "ectopicGrowthRetardation"
                        }, {
                            label: "呼吸支持情况",
                            key: "respiratorySupport"
                        }, {
                            label: "吸氧浓度",
                            key: "oxygenConcentration"
                        }, {
                            label: "住院费用",
                            key: "hospitalCosts"
                        }, {
                            label: "喂养方式",
                            key: "feedingMethod"
                        }, {
                            label: "喂养量（配方奶）",
                            key: "feedingAmountFormulaMilk"
                        }, {
                            label: "喂养量（亲母母乳）",
                            key: "feedingAmountMotherBreastMilk"
                        }, {
                            label: "喂养量（捐献母乳）",
                            key: "feedingAmountDonatedBreastMilk"
                        }, {
                            label: "喂养量（合计奶量）",
                            key: "totalMilk"
                        }, {
                            label: "转归",
                            key: "fate"
                        }, {
                            label: "转诊医院",
                            key: "referralHospital"
                        }, {
                            label: "放弃原因（超未成熟）",
                            key: "giveUpReasonUltraImmature"
                        }, {
                            label: "放弃原因（先天畸形）",
                            key: "giveUpReasonCongenitalMalformations"
                        }, {
                            label: "放弃原因（经济原因）",
                            key: "giveUpReasonEconomicReasons"
                        }, {
                            label: "放弃原因（担心预后）",
                            key: "giveUpReasonWorryPrognosis"
                        }, {
                            label: "放弃原因（其他）",
                            key: "giveUpReasonOther"
                        }, {
                            label: "死亡日期",
                            key: "deathDate"
                        }]
                    }]
                }]
            }, motherBabySameRoom = {
                data: [{
                    label: "母婴同室库",
                    key: "pc_mbsr_",
                    children: [{
                        label: "血氧监测",
                        key: "blood_oxygen_monitor",
                        children: [{
                            label: "测量时间",
                            key: "measuringTime"
                        }, {
                            label: "测量时间（生后）",
                            key: "measuringTimeAfterBirth"
                        }, {
                            label: "测量时患儿情况",
                            key: "measuringChildrenCondition"
                        }, {
                            label: "右手经皮氧饱和度",
                            key: "rightHandTranscutaneousOxygenSaturation"
                        }, {
                            label: "任意一脚经皮氧饱和度",
                            key: "anyFootTranscutaneousOxygenSaturation"
                        }, {
                            label: "心率",
                            key: "heartRate"
                        }, {
                            label: "呼吸",
                            key: "breathe"
                        }, {
                            label: "收缩压",
                            key: "systolicBloodPressure"
                        }, {
                            label: "舒张压",
                            key: "diastolicBloodPressure"
                        }, {
                            label: "平均动脉压",
                            key: "meanArterialPressure"
                        }, {
                            label: "先心筛查结果",
                            key: "heartRate"
                        }, {
                            label: "氧饱和度筛查结果",
                            key: "oxygenSaturationScreeningResults"
                        }, {
                            label: "心脏杂音检查结果",
                            key: "heartMurmurTestResults"
                        }, {
                            label: "心超检查",
                            key: "heartUltrasoundExamination"
                        }, {
                            label: "心超检查时间",
                            key: "heartUltrasoundExaminationTime"
                        }, {
                            label: "心超检查结果",
                            key: "heartMurmurTestResults"
                        }]
                    }]
                }]
            };

            // 树形组件 初始化
            let treeList = eleTree.render({
                elem: "#PC-select-list",
                showCheckbox: true,
                showLine: true,
                indent: 32
            });

            // 树形组件 初始化
            let treeList1 = eleTree.render({
                elem: "#PC-selected-list",
                defaultExpandAll: true
            });

            // 选择 模板
            form.on("select(model)", function (data) {
                // 基础数据库
                if (data.value === "basicDatabase") {
                    let data = [];
                    treeList.reload(basicDatabase);
                    treeList1.reload({data: data});

                    eleTree.on("nodeChecked()",function(d) {
                        const thisData = d.data,
                            index = thisData.index,
                            findData = basicDatabase.data;
                        if (d.isChecked) {
                            data = buildData(findData, data,0 , index);
                        } else {
                            data = deleteData(findData, data,0 , index);
                        }
                        treeList1.reload({data: data});
                    });
                } else if (data.value === "motherBabySameRoom") {
                    let data = [];
                    treeList.reload(motherBabySameRoom);
                    treeList1.reload({data: data});

                    eleTree.on("nodeChecked()",function(d) {
                        const thisData = d.data,
                            index = thisData.index,
                            findData = motherBabySameRoom.data;
                        if (d.isChecked) {
                            data = buildData(findData, data,0 , index);
                        } else {
                            data = deleteData(findData, data,0 , index);
                        }
                        treeList1.reload({data: data});
                    });
                }
            });

            const hospitalNum = $(".pc-admin-hospitalCheckbox").length;
            // 选择范围
            form.on("submit(filter)", function (data) {
                let field = data.field, hospitalIdArray = [];
                for (let i = 0; i < hospitalNum; i++) {
                    hospitalIdArray.push(field["hospitalId[" + i + "]"]);
                    delete field["hospitalId[" + i + "]"];
                }
                field.hospitalIdArray = JSON.stringify(hospitalIdArray);
                $.post("/perinatalPlatform/filterDataExport", field, function (back, status) {
                    if(status === "success") {
                        if(back.code) {
                            $("#PC-case-number").text(back.caseNum);
                        }
                    }
                }, "json");
            });

            // 提交字段 获取 CSV
            form.on("submit(dataExport)", function (data) {
                const doing = "导出数据";
                loading(doing);
                let field = data.field, hospitalIdArray = [];
                for (let i = 0; i < hospitalNum; i++) {
                    if (notNullTool(field["hospitalId[" + i + "]"])) {
                        hospitalIdArray.push(field["hospitalId[" + i + "]"]);
                    }
                }

                let subData = {};
                subData.selectType = field.selectType;
                if (notNullTool(field.startDate)) {
                    subData.startDate = field.startDate;
                }
                if (notNullTool(field.endDate)) {
                    subData.endDate = field.endDate;
                }
                if (notNullTool(field.patientClassification)) {
                    subData.patientClassification = field.patientClassification;
                }
                if (notNullTool(field.diagnosisTreatment)) {
                    subData.diagnosisTreatment =field.diagnosisTreatment;
                }
                if (notNullTool(field.outcomeIndicator)) {
                    subData.outcomeIndicator = field.outcomeIndicator;
                }
                if (hospitalIdArray.length > 0) {
                    subData.hospitalIdArray = JSON.stringify(hospitalIdArray);
                }
                const databaseField = treeList1.getAllNodeData()[0];
                if (databaseField !== undefined) {
                    let allTables = [], allFields = ["pcMotherNum", "pcNewbornNum", "fullName", "gender", "gestationalAgeWeek",
                            "gestationalAgeDay", "birthWeight", "hospitalizationDate", "birthday", "childHospitalizationDate",
                            "childHospitalNum", "dischargeDate", "status"],
                        allTableFields = [], allLabels = ["围产新生儿科研合作平台母亲编号", "围产新生儿科研合作平台新生儿编号", "新生儿姓名", "性别", "胎龄（周）",
                            "胎龄（日）", "出生体重（g）", "母亲入院时间", "新生儿出生日期", "新生儿住院日期", "新生儿住院号", "新生儿出院日期", "状态"];
                    const databaseName = databaseField.key,
                        mainTables = databaseField.children;
                    for (const i in mainTables) {
                        const mainTable = mainTables[i],
                            mainTableName = mainTable.key,
                            mainTableNextArray = mainTable.children;
                        for (let j in mainTableNextArray) {
                            const mainTableNext = mainTableNextArray[j];
                            if (mainTableNext.hasOwnProperty("children") && mainTableNext.children !== undefined) {
                                const tableName = mainTableNext.key,
                                    fields = mainTableNext.children;
                                allTables.push(databaseName + mainTableName + tableName);
                                for (let k in fields) {
                                    const field = fields[k];
                                    allTableFields.push(databaseName + mainTableName + tableName + "." + field.key);
                                    allFields.push(field.key);
                                    allLabels.push(field.label);
                                }
                            } else {
                                if (allTables.indexOf(databaseName + mainTableName) === -1) {
                                    allTables.push(databaseName + mainTableName);
                                }
                                allTableFields.push(databaseName + mainTableName + "." + mainTableNext.key);
                                allFields.push(mainTableNext.key);
                                allLabels.push(mainTableNext.label);
                            }
                        }
                    }
                    subData.allTables = JSON.stringify(allTables);
                    subData.allTableFields = JSON.stringify(allTableFields);
                    $.post("/perinatalPlatform/dataExportCSV", subData, function (back, status) {
                        if(status === "success") {
                            if(back.code) {
                                let backData = back.dataExportList, exportData = [];
                                $.get("/js/utils/region.json", function (regionBack, status) {
                                    if (status === "success") {
                                        const regionJson = regionBack;
                                        for (const i in backData) {
                                            const thisBackData = backData[i];
                                            let thisData = [];
                                            for (const j in allFields) {
                                                const thisField = allFields[j];
                                                let value = thisBackData[thisField];
                                                if (notNullTool(value)) {
                                                    // 状态
                                                    if (thisField === "status") {
                                                        if (value === 0) {
                                                            value = "正在填写";
                                                        } else if (value === 1) {
                                                            value = "填写完成";
                                                        } else if (value === 2) {
                                                            value = "审核不通过";
                                                        } else if (value === 3) {
                                                            value = "审核通过";
                                                        }
                                                    }
                                                    // 获取 省份
                                                    if (thisField === "motherLiveProvince" || thisField === "beforeMovingInLiveProvince") {
                                                        if (notNullTool(regionJson)) {
                                                            for (const i in regionJson) {
                                                                const thisProvince = regionJson[i];
                                                                if (value === thisProvince.code) {
                                                                    value = thisProvince.name;
                                                                    break;
                                                                }
                                                            }
                                                        }
                                                    }
                                                    // 获取 城市
                                                    if (thisField === "motherLiveCity" || thisField === "beforeMovingInLiveCity") {
                                                        const provinceCode = value.slice(0, 2);
                                                        if (notNullTool(regionJson)) {
                                                            for (const i in regionJson) {
                                                                const thisProvince = regionJson[i];
                                                                if (provinceCode === thisProvince.code) {
                                                                    const cities = thisProvince.children;
                                                                    for (const j in cities) {
                                                                        const thisCity = cities[j];
                                                                        if (value === thisCity.code) {
                                                                            value = thisCity.name;
                                                                            break;
                                                                        }
                                                                    }
                                                                    break;
                                                                }
                                                            }
                                                        }
                                                    }
                                                    // 获取 区县
                                                    if (thisField === "motherLiveCounty" || thisField === "beforeMovingInLiveCounty") {
                                                        const provinceCode = value.slice(0, 2),
                                                            cityCode = value.slice(0, 4);
                                                        if (notNullTool(regionJson)) {
                                                            for (const i in regionJson) {
                                                                const thisProvince = regionJson[i];
                                                                if (provinceCode === thisProvince.code) {
                                                                    const cities = thisProvince.children;
                                                                    for (const j in cities) {
                                                                        const thisCity = cities[j];
                                                                        if (cityCode === thisCity.code) {
                                                                            const counties = thisCity.children;
                                                                            for (const k in counties) {
                                                                                const thisCounty = counties[k];
                                                                                if (value === thisCounty.code) {
                                                                                    value = thisCity.name;
                                                                                    break;
                                                                                }
                                                                            }
                                                                        }
                                                                    }
                                                                    break;
                                                                }
                                                            }
                                                        }
                                                    }
                                                    // 出院情况 转归
                                                    if (thisField === "fate") {
                                                        const fate = value;
                                                        if (fate === 1) {
                                                            value = "1.治愈好转";
                                                        } else if (fate === 2) {
                                                            value = "2.院内死亡";
                                                        } else if (fate === 3) {
                                                            value = "3.出院存活";
                                                        } else if (fate === 4) {
                                                            value = "4.放弃死亡";
                                                        } else if (fate === 5) {
                                                            value = "5.救治无效";
                                                        } else if (fate === 6) {
                                                            value = "6.治愈好转";
                                                        } else if (fate === 7) {
                                                            value = "7.院内死亡";
                                                        } else if (fate === 8) {
                                                            value = "8.出院存活";
                                                        } else if (fate === 9) {
                                                            value = "9.放弃死亡";
                                                        } else if (fate === 10) {
                                                            value = "10.救治无效";
                                                        } else if (fate === 11) {
                                                            value = "11.放弃治疗";
                                                        } else if (fate === 12) {
                                                            value = "12.放弃治疗";
                                                        } else if (fate === 13) {
                                                            value = "13.转院治疗";
                                                        }
                                                    }
                                                    if (thisField === "motherPhone" || thisField === "motherHospitalNumber" || thisField === "childHospitalNum") {
                                                        value = "\t" + value + "\t";
                                                    }
                                                    // 日期 格式化
                                                    if (typeof value === "string" && /[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}:[0-9]{2}/.test(value)) {
                                                        value = dateFormat(Date.parse(value));
                                                    }
                                                } else {
                                                    value = "";
                                                }
                                                thisData.push(value);
                                            }
                                            exportData.push(thisData);
                                        }
                                        layer.closeAll();
                                        const date = new Date(),
                                            fileType = $(data.elem).attr("data-type");
                                        table.exportFile(allLabels, exportData, {
                                            type: fileType,
                                            title: "数据导出_" + date.getFullYear() + "年" + (date.getMonth() + 1) + "月" + date.getDate() + "日" +
                                                date.getHours() + "时" + date.getMinutes() + "分" + date.getSeconds() + "秒"
                                        });
                                    }
                                });
                            } else {failMsg(doing)}
                        } else {errorMsg1()}
                    },"json").fail(function () {errorMsg2()});
                } else {
                    alertMsg("请选择字段！");
                }
            });
            $(".pc-select-board-title button").click();
        }

        // 专题 导出
        if ($(".pc-case-export.topic").length > 0) {
            const pc_bd_rs_deformity = {
                data: [{
                    label: "复苏情况-先天畸形",
                    key: "pc_bd_rs_deformity",
                    checked: true,
                    children: [{
                        label: "畸形系统",
                        key: "deformitySystem"
                    }, {
                        label: "畸形类型",
                        key: "deformityType"
                    }]
                }]
            }, pc_bd_rs_death_cause = {
                data: [{
                    label: "复苏情况-死亡原因",
                    key: "pc_bd_rs_death_cause",
                    children: [{
                        label: "死因分类",
                        key: "deathCauseClassification",
                        checked: true
                    }, {
                        label: "死因诊断",
                        key: "deathCauseDiagnosis",
                        checked: true
                    }]
                }]
            }, pc_bd_rts_respiratory_support_mode_time = {
                data: [{
                    label: "呼吸系统-呼吸支持-呼吸支持模式",
                    key: "pc_bd_rts_respiratory_support_mode_time",
                    checked: true,
                    children: [{
                        label: "呼吸支持模式",
                        key: "respiratorySupportMode"
                    }, {
                        label: "开始时间",
                        key: "startRsDate"
                    }, {
                        label: "结束时间",
                        key: "endRsDate"
                    }, {
                        label: "总计（h）",
                        key: "totalHours"
                    }, {
                        label: "天",
                        key: "totalDays"
                    }, {
                        label: "小时",
                        key: "totalDaysMoreHours"
                    }]
                }]
            }, pc_bd_rts_oxygen_concentration = {
                data: [{
                    label: "呼吸系统-呼吸支持-给氧浓度",
                    key: "pc_bd_rts_oxygen_concentration",
                    checked: true,
                    children: [{
                        label: "给氧浓度",
                        key: "oxygenConcentration"
                    }, {
                        label: "开始时间",
                        key: "startOcDate"
                    }, {
                        label: "结束时间",
                        key: "endOcDate"
                    }, {
                        label: "总计（h）",
                        key: "totalOcHours"
                    }, {
                        label: "天",
                        key: "totalOcDays"
                    }, {
                        label: "小时",
                        key: "totalOcDaysMoreHours"
                    }]
                }]
            }, pc_bd_rts_weaning_situation = {
                data: [{
                    label: "呼吸系统-呼吸支持-撤机情况-有创通气情况",
                    key: "pc_bd_rts_weaning_situation",
                    children: [{
                        label: "有创通气方式",
                        key: "ivMethod",
                        checked: true
                    }, {
                        label: "有创通气开始时间",
                        key: "ivStartTime",
                        checked: true
                    }, {
                        label: "撤机时间",
                        key: "ivEndTime",
                        checked: true
                    }, {
                        label: "创通气持续时间（天）",
                        key: "ivUseTimeDay",
                        checked: true
                    }, {
                        label: "创通气持续时间（h）",
                        key: "ivUseTimeHour",
                        checked: true
                    }, {
                        label: "撤机时的血气分析",
                        key: "bloodGasAnalysisWhenWeaning",
                        checked: true
                    }, {
                        label: "撤机时的血气分析（PH）",
                        key: "bgaIvWeaningPh",
                        checked: true
                    }, {
                        label: "撤机时的血气分析（血氧饱和度）",
                        key: "bgaIvWeaningBloodOxygenSaturation",
                        checked: true
                    }, {
                        label: "撤机时的血气分析（乳酸）",
                        key: "bgaIvWeaningLacticAcid",
                        checked: true
                    }, {
                        label: "撤机时的血气分析（PaO<sub>2</sub>）",
                        key: "bgaIvWeaningPaO2",
                        checked: true
                    }, {
                        label: "撤机时的血气分析（PaCO<sub>2</sub>）",
                        key: "bgaIvWeaningPaCO2",
                        checked: true
                    }, {
                        label: "撤机时的血气分析（BE）",
                        key: "bgaIvWeaningBE",
                        checked: true
                    }, {
                        label: "撤机时的血气分析（HCO<sub>3</sub>）",
                        key: "bgaIvWeaningHCO3",
                        checked: true
                    }, {
                        label: "撤机时的血气分析（Hgb）",
                        key: "bgaIvWeaningHgb",
                        checked: true
                    }, {
                        label: "撤机时的有创通气的参数（FiO<sub>2</sub>）",
                        key: "ivWeaningParamFiO2",
                        checked: true
                    }, {
                        label: "撤机时的血气分析（MAP）",
                        key: "ivWeaningParamMap",
                        checked: true
                    }, {
                        label: "撤机时的血气分析（PIP）（仅有创常频）",
                        key: "ivWeaningParamPip",
                        checked: true
                    }, {
                        label: "撤机时的血气分析（PEEP）（仅有创常频）",
                        key: "ivWeaningParamPeep",
                        checked: true
                    }, {
                        label: "撤机时的血气分析（ΔP）（仅有创高频）",
                        key: "ivWeaningParamDeltaP",
                        checked: true
                    }, {
                        label: "撤机时的血气分析（HFHO）（仅有创高频）",
                        key: "ivWeaningParamHfho",
                        checked: true
                    }, {
                        label: "撤机时的血气分析（OI）",
                        key: "ivWeaningParamOI",
                        checked: true
                    }, {
                        label: "撤机后无创通气方式",
                        key: "afterWeaningNivMethod",
                        checked: true
                    }, {
                        label: "撤机后（FiO<sub>2</sub>）",
                        key: "afterWeaningNivParamFiO2",
                        checked: true
                    }, {
                        label: "撤机后（PEEP）",
                        key: "afterWeaningNivParamPeep",
                        checked: true
                    }]
                }]
            }, pc_bd_rts_bpd_gc = {
                data: [{
                    label: "呼吸系统-呼吸支持-BPD-糖皮质激素情况",
                    key: "pc_bd_rts_bpd_gc",
                    children: [{
                        label: "糖皮质激素类型",
                        key: "gcType",
                        checked: true
                    }, {
                        label: "给药方式",
                        key: "administrationMode",
                        checked: true
                    }, {
                        label: "给药指征",
                        key: "dosingIndication",
                        checked: true
                    }, {
                        label: "开始时间",
                        key: "startGcDate",
                        checked: true
                    }, {
                        label: "结束时间",
                        key: "endGcDate",
                        checked: true
                    }, {
                        label: "天数",
                        key: "totalDays",
                        checked: true
                    }]
                }]
            }, pc_bd_rts_rds_ps = {
                data: [{
                label: "呼吸系统-呼吸支持-RDS-给药情况",
                    key: "pc_bd_rts_rds_ps",
                    children: [{
                        label: "给药时间",
                        key: "administrationTime",
                        checked: true
                    }, {
                        label: "PS类型",
                        key: "psType",
                        checked: true
                    }, {
                        label: "给药方式",
                        key: "administrationMode",
                        checked: true
                    }, {
                        label: "给药总剂量（mg）",
                        key: "totalDoseAdministered",
                        checked: true
                    }, {
                        label: "体重（kg）",
                        key: "weight",
                        checked: true
                    }, {
                        label: "给药剂量（mg/kg）",
                        key: "dosage",
                        checked: true
                    }]
                }]
            }, pc_bd_rts_apnea_caffeine = {
                data: [{
                    label: "呼吸系统-呼吸支持-呼吸暂停-咖啡因使用情况",
                    key: "pc_bd_rts_apnea_caffeine",
                    children: [{
                        label: "开始时间",
                        key: "startApDate",
                        checked: true
                    }, {
                        label: "结束时间",
                        key: "endApDate",
                        checked: true
                    }, {
                        label: "天数",
                        key: "totalDays",
                        checked: true
                    }, {
                        label: "使用原因",
                        key: "useReason",
                        checked: true
                    }, {
                        label: "首次剂量（mg/kg）",
                        key: "firstDose",
                        checked: true
                    }, {
                        label: "维持剂量（mg/kg）",
                        key: "maintenanceDose",
                        checked: true
                    }]
                }]
            }, pc_bd_dgs_gi_whcbl = {
                data: [{
                    label: "消化系统-生长指标",
                    key: "pc_bd_dgs_gi_whcbl",
                    children: [{
                        label: "住院天数",
                        key: "day",
                        checked: true
                    }, {
                        label: "日期",
                        key: "thisDate",
                        checked: true
                    }, {
                        label: "体重（kg）",
                        key: "weight",
                        checked: true
                    }, {
                        label: "头围（cm）",
                        key: "headCircumference",
                        checked: true
                    }, {
                        label: "身长（cm）",
                        key: "bodyLength",
                        checked: true
                    }, {
                        label: "纠正胎龄（周）",
                        key: "cgaWeek",
                        checked: true
                    }, {
                        label: "纠正胎龄（日）",
                        key: "cgaDay",
                        checked: true
                    }]
                }]
            }, pc_bd_dgs_en_data = {
                data: [{
                    label: "消化系统-肠内营养",
                    key: "pc_bd_dgs_en_data",
                    children: [{
                        label: "住院天数",
                        key: "day",
                        checked: true
                    }, {
                        label: "禁食",
                        key: "fasting",
                        checked: true
                    }, {
                        label: "管饲",
                        key: "tubeFeeding",
                        checked: true
                    }, {
                        label: "部分鼻饲",
                        key: "partialNasalFeeding",
                        checked: true
                    }, {
                        label: "奶瓶喂养",
                        key: "bottleFeeding",
                        checked: true
                    }, {
                        label: "部分哺乳",
                        key: "partialBreastfeeding",
                        checked: true
                    }, {
                        label: "直接哺乳",
                        key: "directBreastfeeding",
                        checked: true
                    }, {
                        label: "亲母母乳（ml/d）",
                        key: "breastMilk",
                        checked: true
                    }, {
                        label: "捐献母乳（ml/d）",
                        key: "donateBreastMilk",
                        checked: true
                    }, {
                        label: "母乳强化剂（强化/d）",
                        key: "breastMilkFortifier",
                        checked: true
                    }, {
                        label: "深度水解奶（ml/d）",
                        key: "deeplyHydrolyzedMilk",
                        checked: true
                    }, {
                        label: "部分水解奶（ml/d）",
                        key: "partiallyHydrolyzedMilk",
                        checked: true
                    }, {
                        label: "氨基酸奶（ml/d）",
                        key: "aminoAcidMilk",
                        checked: true
                    }, {
                        label: "普通配方奶（ml/d）",
                        key: "ordinaryFormulaMilk",
                        checked: true
                    }]
                }]
            }, pc_bd_dgs_pn_data = {
                data: [{
                    label: "消化系统-肠外营养-肠外营养情况",
                    key: "pc_bd_dgs_pn_data",
                    children: [{
                        label: "住院天数",
                        key: "day",
                        checked: true
                    }, {
                        label: "50% 葡萄糖（ml/d）",
                        key: "glucose50Percent",
                        checked: true
                    }, {
                        label: "10% 葡萄糖（ml/d）",
                        key: "glucose10Percent",
                        checked: true
                    }, {
                        label: "5% 葡萄糖（ml/d）",
                        key: "glucose5Percent",
                        checked: true
                    }, {
                        label: "50% 灭菌水（ml/d）",
                        key: "sterilizedWater50Percent",
                        checked: true
                    }, {
                        label: "6% 氨基酸（ml/d）",
                        key: "aminoAcid6Percent",
                        checked: true
                    }, {
                        label: "20% 脂肪乳（ml/d）",
                        key: "fatMilk20Percent",
                        checked: true
                    }, {
                        label: "非PN液体（ml/d）",
                        key: "nonPNLiquid",
                        checked: true
                    }]
                }]
            }, pc_bd_dgs_pn_tp = {
                data: [{
                    label: "消化系统-肠外营养-置管情况",
                    key: "pc_bd_dgs_pn_tp",
                    children: [{
                        label: "置管方式",
                        key: "tubePlacement",
                        checked: true
                    }, {
                        label: "开始时间",
                        key: "startTpDate",
                        checked: true
                    }, {
                        label: "结束时间",
                        key: "endTpDate",
                        checked: true
                    }, {
                        label: "合计（天数）",
                        key: "totalDays",
                        checked: true
                    }]
                }]
            }, pc_bd_dgs_fr_data = {
                data: [{
                    label: "消化系统-禁食原因",
                    key: "pc_bd_dgs_fr_data",
                    children: [{
                        label: "禁食（次）",
                        key: "fastTime",
                        checked: true
                    }, {
                        label: "开始时间",
                        key: "fastStartTime",
                        checked: true
                    }, {
                        label: "结束时间",
                        key: "fastEndTime",
                        checked: true
                    }, {
                        label: "天数",
                        key: "fastDays",
                        checked: true
                    }, {
                        label: "禁食原因（呼吸不稳定）",
                        key: "fastReasonsUnstableBreathing",
                        checked: true
                    }, {
                        label: "禁食原因（胃潴留）",
                        key: "fastReasonsGastricRetention",
                        checked: true
                    }, {
                        label: "禁食原因（PDA治疗）",
                        key: "fastReasonsPdaTreatment",
                        checked: true
                    }, {
                        label: "禁食原因（脐静脉置管）",
                        key: "fastReasonsUmbilicalVeinCatheter",
                        checked: true
                    }, {
                        label: "禁食原因（腹胀）",
                        key: "fastReasonsBloating",
                        checked: true
                    }, {
                        label: "禁食原因（便血）",
                        key: "fastReasonsBloodInStool",
                        checked: true
                    }, {
                        label: "禁食原因（呕吐）",
                        key: "fastReasonsVomit",
                        checked: true
                    }, {
                        label: "禁食原因（胃食管反流）",
                        key: "fastReasonsGastroesophagealReflux",
                        checked: true
                    }, {
                        label: "禁食原因（其他）",
                        key: "fastReasonsOther",
                        checked: true
                    }]
                }]
            }, pc_bd_dgs_enm_data = {
                data: [{
                    label: "消化系统-肠内营养管理",
                    key: "pc_bd_dgs_enm_data",
                    children: [{
                        label: "住院天数",
                        key: "day",
                        checked: true
                    }, {
                        label: "亲母母乳（ml/kg/d）",
                        key: "breastMilkPKg",
                        checked: true
                    }, {
                        label: "捐献母乳（ml/kg/d）",
                        key: "donateBreastMilkPKg",
                        checked: true
                    }, {
                        label: "深度水解奶（ml/kg/d）",
                        key: "deeplyHydrolyzedMilkPKg",
                        checked: true
                    }, {
                        label: "部分水解奶（ml/kg/d）",
                        key: "partiallyHydrolyzedMilkPKg",
                        checked: true
                    }, {
                        label: "氨基酸奶（ml/kg/d）",
                        key: "aminoAcidMilkPKg",
                        checked: true
                    }, {
                        label: "普通配方奶（ml/kg/d）",
                        key: "ordinaryFormulaMilkPKg",
                        checked: true
                    }, {
                        label: "合计每日奶量（ml/kg/d）",
                        key: "totalDailyMilkVolumePKg",
                        checked: true
                    }, {
                        label: "肠内营养蛋白质（g/d）",
                        key: "enteralNutritionalProteinGPD",
                        checked: true
                    }, {
                        label: "肠内营养蛋白质（g/kg/d）",
                        key: "enteralNutritionalProteinGPKgPD",
                        checked: true
                    }, {
                        label: "奶量合计热卡（kcal/d）",
                        key: "totalMilkCaloriesKcalPD",
                        checked: true
                    }, {
                        label: "奶量合计热卡（kcal/kg/d）",
                        key: "totalMilkCaloriesKcalPKgPD",
                        checked: true
                    }]
                }]
            }, pc_bd_dgs_pnm_data = {
                data: [{
                    label: "消化系统-肠外营养管理",
                    key: "pc_bd_dgs_pnm_data",
                    children: [{
                        label: "住院天数",
                        key: "day",
                        checked: true
                    }, {
                        label: "碳水化合物（g/d）",
                        key: "carbohydrateGPD",
                        checked: true
                    }, {
                        label: "碳水化合物（g/kg/d）",
                        key: "carbohydrateGPKgPD",
                        checked: true
                    }, {
                        label: "碳水化合物热卡（kcal/d）",
                        key: "carbohydrateCalorie",
                        checked: true
                    }, {
                        label: "氨基酸（g/d）",
                        key: "aminoAcidGPD",
                        checked: true
                    }, {
                        label: "氨基酸（g/kg/d）",
                        key: "aminoAcidGPKgPD",
                        checked: true
                    }, {
                        label: "氨基酸热卡（kcal/d）",
                        key: "aminoAcidCalorie",
                        checked: true
                    }, {
                        label: "脂肪乳（g/d）",
                        key: "fatEmulsionGPD",
                        checked: true
                    }, {
                        label: "脂肪乳（g/kg/d）",
                        key: "fatEmulsionGPKgPD",
                        checked: true
                    }, {
                        label: "脂肪乳热卡（kcal/d）",
                        key: "fatEmulsionCalorie",
                        checked: true
                    }, {
                        label: "静脉营养热卡（kcal/d）",
                        key: "intravenousNutritionCalorieKcalPD",
                        checked: true
                    }, {
                        label: "静脉营养热卡（kcal/kg/d）",
                        key: "intravenousNutritionCalorieKcalPKgPD",
                        checked: true
                    }, {
                        label: "合计热卡（kcal/d）",
                        key: "totalCalorieKcalPD",
                        checked: true
                    }, {
                        label: "合计热卡（kcal/kg/d）",
                        key: "totalCalorieKcalPKgPD",
                        checked: true
                    }, {
                        label: "合计液体量（ml/kg/d）",
                        key: "totalLiquidVolume",
                        checked: true
                    }]
                }]
            }, pc_bd_dgs_tnm_data = {
                data: [{
                    label: "消化系统-过渡期营养管理",
                    key: "pc_bd_dgs_tnm_data",
                    children: [{
                        label: "合计奶量（ml/kg/d）",
                        key: "day",
                        checked: true
                    }, {
                        label: "日期",
                        key: "milkToNDate",
                        checked: true
                    }, {
                        label: "生后天数",
                        key: "milkToNDaysAfterBirth",
                        checked: true
                    }, {
                        label: "纠正胎龄（周）",
                        key: "milkToNCorrectGestationalAgeWeek",
                        checked: true
                    }, {
                        label: "纠正胎龄（天）",
                        key: "milkToNCorrectGestationalAgeDay",
                        checked: true
                    }, {
                        label: "体重（kg）",
                        key: "milkToNWeight",
                        checked: true
                    }, {
                        label: "体重z评分",
                        key: "milkToNWeightZScore",
                        checked: true
                    }, {
                        label: "实际肠内营养（ml/kg/d）",
                        key: "milkToNActualEnteralNutrition",
                        checked: true
                    }, {
                        label: "肠内氨基酸（g/d）",
                        key: "milkToNEnteralAminoAcidsGPD",
                        checked: true
                    }, {
                        label: "肠内氨基酸（g/kg/d）",
                        key: "milkToNEnteralAminoAcidsGPKgPD",
                        checked: true
                    }, {
                        label: "肠内热卡（kcal/d）",
                        key: "milkToNEnteralCalorieKcalPD",
                        checked: true
                    }, {
                        label: "肠内热卡（kcal/kg/d）",
                        key: "milkToNEnteralCalorieKcalPKgPD",
                        checked: true
                    }, {
                        label: "肠外氨基酸（g/d）",
                        key: "milkToNParenteralAminoAcidsGPD",
                        checked: true
                    }, {
                        label: "肠外氨基酸（g/kg/d）",
                        key: "milkToNParenteralAminoAcidsGPKgPD",
                        checked: true
                    }, {
                        label: "肠外热卡（kcal/d）",
                        key: "milkToNParenteralCalorieKcalPD",
                        checked: true
                    }, {
                        label: "肠外热卡（kcal/kg/d）",
                        key: "milkToNParenteralCalorieKcalPKgPD",
                        checked: true
                    }, {
                        label: "合计蛋白（g/d）",
                        key: "milkToNTotalProteinGPD",
                        checked: true
                    }, {
                        label: "合计蛋白（g/kg/d））",
                        key: "milkToNTotalProteinGPKgPD",
                        checked: true
                    }, {
                        label: "合计热卡（kcal/d）",
                        key: "milkToNTotalCalorieKcalPD",
                        checked: true
                    }, {
                        label: "合计热卡（kcal/kg/d）",
                        key: "milkToNTotalCalorieKcalPKgPD",
                        checked: true
                    }]
                }]
            }, pc_bd_is_eos_ae = {
                data: [{
                    label: "感染监测-EOS流程-异常临床表现",
                    key: "pc_bd_is_eos_ae",
                    children: [{
                        label: "评估时间",
                        key: "aeTime",
                        checked: true
                    }, {
                        label: "系统位置",
                        key: "aeSystemLocation",
                        checked: true
                    }, {
                        label: "异常临床表现",
                        key: "aeAbnormalClinicalManifestation",
                        checked: true
                    }]
                }]
            }, pc_bd_is_eos_bc = {
                data: [{
                    label: "感染监测-EOS流程-血培养",
                    key: "pc_bd_is_eos_bc",
                    children: [{
                        label: "检查时间",
                        key: "bcInspectionTime",
                        checked: true
                    }, {
                        label: "结果时间",
                        key: "bcResultTime",
                        checked: true
                    }, {
                        label: "检查结果",
                        key: "bcInspectionResult",
                        checked: true
                    }, {
                        label: "阳性菌",
                        key: "bcPositiveBacteria",
                        checked: true
                    }]
                }]
            }, pc_bd_is_eos_nsi = {
                data: [{
                    label: "感染监测-EOS流程-血常规检查",
                    key: "pc_bd_is_eos_nsi",
                    children: [{
                        label: "检查时间",
                        key: "nsiTime",
                        checked: true
                    }, {
                        label: "WBC（×10<sup>9</sup>/L）",
                        key: "nsiWbc",
                        checked: true
                    }, {
                        label: "I/T",
                        key: "nsiIOrT",
                        checked: true
                    }, {
                        label: "CRP（mg/L）",
                        key: "nsiCrp",
                        checked: true
                    }, {
                        label: "PCT（ng/mL）",
                        key: "nsiPct",
                        checked: true
                    }, {
                        label: "阳性项数",
                        key: "nsiPositiveItemNumber",
                        checked: true
                    }]
                }]
            }, pc_bd_is_eos_cfc = {
                data: [{
                    label: "感染监测-EOS流程-脑脊液培养",
                    key: "pc_bd_is_eos_cfc",
                    children: [{
                        label: "检查时间",
                        key: "cfcInspectionTime",
                        checked: true
                    }, {
                        label: "结果时间",
                        key: "cfcResultTime",
                        checked: true
                    }, {
                        label: "检查结果",
                        key: "cfcInspectionResult",
                        checked: true
                    }, {
                        label: "阳性菌",
                        key: "cfcPositiveBacteria",
                        checked: true
                    }]
                }]
            }, pc_bd_is_los_rf = {
                data: [{
                    label: "感染监测-LOS流程-危险因素",
                    key: "pc_bd_is_los_rf",
                    children: [{
                        label: "评估时间",
                        key: "rfEvaluationTime",
                        checked: true
                    }, {
                        label: "危险因素",
                        key: "riskFactor",
                        checked: true
                    }]
                }]
            }, pc_bd_is_los_ae = {
                data: [{
                    label: "感染监测-LOS流程-异常临床表现",
                    key: "pc_bd_is_los_ae",
                    children: [{
                        label: "评估时间",
                        key: "aeTime",
                        checked: true
                    }, {
                        label: "系统位置",
                        key: "aeSystemLocation",
                        checked: true
                    }, {
                        label: "异常临床表现",
                        key: "aeAbnormalClinicalManifestation",
                        checked: true
                    }]
                }]
            }, pc_bd_is_los_bc = {
                data: [{
                    label: "感染监测-LOS流程-血培养",
                    key: "pc_bd_is_los_bc",
                    children: [{
                        label: "检查时间",
                        key: "bcInspectionTime",
                        checked: true
                    }, {
                        label: "结果时间",
                        key: "bcResultTime",
                        checked: true
                    }, {
                        label: "检查结果",
                        key: "bcInspectionResult",
                        checked: true
                    }, {
                        label: "阳性菌",
                        key: "bcPositiveBacteria",
                        checked: true
                    }]
                }]
            }, pc_bd_is_los_nsi = {
                data: [{
                    label: "感染监测-LOS流程-血常规检查",
                    key: "pc_bd_is_los_nsi",
                    children: [{
                        label: "检查时间",
                        key: "nsiTime",
                        checked: true
                    }, {
                        label: "WBC（×10<sup>9</sup>/L）",
                        key: "nsiWbc",
                        checked: true
                    }, {
                        label: "I/T",
                        key: "nsiIOrT",
                        checked: true
                    }, {
                        label: "CRP（mg/L）",
                        key: "nsiCrp",
                        checked: true
                    }, {
                        label: "PCT（ng/mL）",
                        key: "nsiPct",
                        checked: true
                    }, {
                        label: "阳性项数",
                        key: "nsiPositiveItemNumber",
                        checked: true
                    }]
                }]
            }, pc_bd_is_los_cfc = {
                data: [{
                    label: "感染监测-LOS流程-脑脊液培养",
                    key: "pc_bd_is_los_cfc",
                    children: [{
                        label: "检查时间",
                        key: "cfcInspectionTime",
                        checked: true
                    }, {
                        label: "结果时间",
                        key: "cfcResultTime",
                        checked: true
                    }, {
                        label: "检查结果",
                        key: "cfcInspectionResult",
                        checked: true
                    }, {
                        label: "阳性菌",
                        key: "cfcPositiveBacteria",
                        checked: true
                    }]
                }]
            }, pc_bd_cs_pda_ultrasound = {
                data: [{
                    label: "循环系统-超声检查",
                    key: "pc_bd_cs_pda_ultrasound",
                    children: [{
                        label: "超声时间",
                        key: "ultrasoundTime",
                        checked: true
                    }, {
                        label: "超声结果",
                        key: "ultrasoundResult",
                        checked: true
                    }, {
                        label: "动脉导管内径（mm）",
                        key: "arterialCatheterInnerDiameter",
                        checked: true
                    }, {
                        label: "左房内径/主动脉内径",
                        key: "leftAtriumOrAortaInnerDiameter",
                        checked: true
                    }, {
                        label: "肺动脉瓣舒张期反流",
                        key: "pulmonaryValveDiastolicRegurgitation",
                        checked: true
                    }, {
                        label: "以左向右分流为主",
                        key: "mainlyDivertFromLeftToRight",
                        checked: true
                    }]
                }]
            }, pc_bd_cs_pda_treatment = {
                data: [{
                    label: "循环系统-PDA治疗",
                    key: "pc_bd_cs_pda_treatment",
                    children: [{
                        label: "名称",
                        key: "pdaName",
                        checked: true
                    }, {
                        label: "用药途径",
                        key: "pdaMedicationRoute",
                        checked: true
                    }, {
                        label: "开始时间",
                        key: "pdaStartTime",
                        checked: true
                    }, {
                        label: "结束时间",
                        key: "pdaEndTime",
                        checked: true
                    }, {
                        label: "疗程",
                        key: "pdaTreatmentCourse",
                        checked: true
                    }, {
                        label: "治疗后PDA是否关闭",
                        key: "isPdaClosesAfterTreatment",
                        checked: true
                    }]
                }]
            }, pc_bd_rp_ss_list = {
                data: [{
                    label: "视网膜病-筛查情况",
                    key: "pc_bd_rp_ss_list",
                    checked: true,
                    children: [{
                        label: "筛查日期",
                        key: "screeningDate",
                        checked: true
                    }, {
                        label: "生后时间（天）",
                        key: "timeAfterBirth",
                        checked: true
                    }, {
                        label: "矫正胎龄（周）",
                        key: "correctGestationalAgeWeek",
                        checked: true
                    }, {
                        label: "矫正胎龄（天）",
                        key: "correctGestationalAgeDay",
                        checked: true
                    }, {
                        label: "间隔时间（天）",
                        key: "`interval`",
                        checked: true
                    }, {
                        label: "左眼分期",
                        key: "leftEyeStaging",
                        checked: true
                    }, {
                        label: "左眼分区",
                        key: "leftEyeZone",
                        checked: true
                    }, {
                        label: "左眼plus",
                        key: "leftEyePlus",
                        checked: true
                    }, {
                        label: "左眼AP-ROP",
                        key: "leftEyeApRop",
                        checked: true
                    }, {
                        label: "左眼治疗",
                        key: "leftEyeTreatment",
                        checked: true
                    }, {
                        label: "右眼分期",
                        key: "rightEyeStaging",
                        checked: true
                    }, {
                        label: "右眼分区",
                        key: "rightEyeZone",
                        checked: true
                    }, {
                        label: "右眼plus",
                        key: "rightEyePlus",
                        checked: true
                    }, {
                        label: "右眼AP-ROP",
                        key: "rightEyeApRop",
                        checked: true
                    }, {
                        label: "右眼治疗",
                        key: "rightEyeTreatment",
                        checked: true
                    }]
                }]
            }, pc_dpc_bmd_pumping = {
                data: [{
                    label: "母乳日志-泵奶情况",
                    key: "pc_dpc_bmd_pumping",
                    checked: true,
                    children: [{
                        label: "泵奶时间",
                        key: "pumpingDate",
                        checked: true
                    }, {
                        label: "泵奶量（ml）",
                        key: "pumpingAmount",
                        checked: true
                    }, {
                        label: "泵奶方式",
                        key: "pumpingWay",
                        checked: true
                    }, {
                        label: "泵奶地点",
                        key: "pumpingLocation",
                        checked: true
                    }, {
                        label: "感觉乳房充盈/满胀",
                        key: "`breastsFeelFull`",
                        checked: true
                    }]
                }]
            };

            // 树形组件 初始化
            let treeList = eleTree.render({
                elem: "#PC-select-list",
                showCheckbox: true,
                indent: 32,
                defaultExpandAll: true
            }), hasCid = 1;

            xmSelect.render({
                el: "#PC-case-model",
                size: "mini",
                cascader: {
                    show: true,
                    indent: 200,
                },
                theme: {
                  color: "#FFB7C5"
                },
                model: {
                    icon: "hidden",
                    label: {
                        type: "text"
                    }
                },
                radio: true,
                clickClose: true,
                data(){
                    return [
                        {name: "复苏情况", value: -1, children: [
                                {name: '先天畸形', value: "pc_bd_rs_deformity"},
                                {name: '死亡原因', value: "pc_bd_rs_death_cause"}
                            ]},
                        {name: "呼吸系统", value: -2, children: [
                            {name: "呼吸支持", value: -3, children: [
                                {name: "呼吸支持模式", value: "pc_bd_rts_respiratory_support_mode_time"},
                                {name: "给氧浓度", value: "pc_bd_rts_oxygen_concentration"}
                            ]},
                            {name: "撤机情况-有创通气情况", value: "pc_bd_rts_weaning_situation"},
                            {name: "BPD-糖皮质激素情况", value: "pc_bd_rts_bpd_gc"},
                            {name: "RDS-给药情况", value: "pc_bd_rts_rds_ps"},
                            {name: "呼吸暂停-咖啡因使用情况", value: "pc_bd_rts_apnea_caffeine"}
                        ]},
                        {name: "消化系统", value: -4, children: [
                            {name: "生长指标", value: "pc_bd_dgs_gi_whcbl"},
                            {name: "肠内营养", value: "pc_bd_dgs_en_data"},
                            {name: "肠外营养", value: -5, children: [
                                {name: "肠外营养情况", value: "pc_bd_dgs_pn_data"},
                                {name: "置管情况", value: "pc_bd_dgs_pn_tp"}
                            ]},
                            {name: "禁食原因", value: "pc_bd_dgs_fr_data"},
                            {name: "肠内营养管理", value: "pc_bd_dgs_enm_data"},
                            {name: "肠外营养管理", value: "pc_bd_dgs_pnm_data"},
                            {name: "过渡期营养管理", value: "pc_bd_dgs_tnm_data"}
                        ]},
                        {name: "感染监测", value: -6, children: [
                            {name: "EOS流程", value: -7, children: [
                                {name: "异常临床表现", value: "pc_bd_is_eos_ae"},
                                {name: "血培养", value: "pc_bd_is_eos_bc"},
                                {name: "血常规检查", value: "pc_bd_is_eos_nsi"},
                                {name: "脑脊液培养", value: "pc_bd_is_eos_cfc"}
                            ]},
                            {name: "LOS流程", value: -8, children: [
                                {name: "危险因素", value: "pc_bd_is_los_rf"},
                                {name: "异常临床表现", value: "pc_bd_is_los_ae"},
                                {name: "血培养", value: "pc_bd_is_los_bc"},
                                {name: "血常规检查", value: "pc_bd_is_los_nsi"},
                                {name: "脑脊液培养", value: "pc_bd_is_los_cfc"}
                            ]}
                        ]},
                        {name: "循环系统", value: -9, children: [
                            {name: "超声检查", value: "pc_bd_cs_pda_ultrasound"},
                            {name: "PDA治疗", value: "pc_bd_cs_pda_treatment"}
                        ]},
                        {name: "视网膜病", value: -10, children: [
                            {name: "筛查情况", value: "pc_bd_rp_ss_list"}
                        ]},
                        {name: "母乳日志", value: -11, children: [
                            {name: "泵奶情况", value: "pc_dpc_bmd_pumping"}
                        ]}
                    ]
                },
                on: function(data) {
                    hasCid = 1;
                    const selectedTable = data.arr[0].value;
                    if (selectedTable === "pc_bd_rs_deformity") {
                        treeList.reload(pc_bd_rs_deformity);
                    } else if (selectedTable === "pc_bd_rs_death_cause") {
                        treeList.reload(pc_bd_rs_death_cause);
                    } else if (selectedTable === "pc_bd_rts_respiratory_support_mode_time") {
                        treeList.reload(pc_bd_rts_respiratory_support_mode_time);
                    } else if (selectedTable === "pc_bd_rts_oxygen_concentration") {
                        treeList.reload(pc_bd_rts_oxygen_concentration);
                    } else if (selectedTable === "pc_bd_rts_weaning_situation") {
                        treeList.reload(pc_bd_rts_weaning_situation);
                    } else if (selectedTable === "pc_bd_rts_bpd_gc") {
                        treeList.reload(pc_bd_rts_bpd_gc);
                    } else if (selectedTable === "pc_bd_rts_rds_ps") {
                        treeList.reload(pc_bd_rts_rds_ps);
                    } else if (selectedTable === "pc_bd_rts_apnea_caffeine") {
                        treeList.reload(pc_bd_rts_apnea_caffeine);
                    } else if (selectedTable === "pc_bd_dgs_gi_whcbl") {
                        treeList.reload(pc_bd_dgs_gi_whcbl);
                    } else if (selectedTable === "pc_bd_dgs_en_data") {
                        treeList.reload(pc_bd_dgs_en_data);
                    } else if (selectedTable === "pc_bd_dgs_pn_data") {
                        treeList.reload(pc_bd_dgs_pn_data);
                    } else if (selectedTable === "pc_bd_dgs_pn_tp") {
                        treeList.reload(pc_bd_dgs_pn_tp);
                    } else if (selectedTable === "pc_bd_dgs_fr_data") {
                        treeList.reload(pc_bd_dgs_fr_data);
                    } else if (selectedTable === "pc_bd_dgs_enm_data") {
                        treeList.reload(pc_bd_dgs_enm_data);
                    } else if (selectedTable === "pc_bd_dgs_pnm_data") {
                        treeList.reload(pc_bd_dgs_pnm_data);
                    } else if (selectedTable === "pc_bd_dgs_tnm_data") {
                        treeList.reload(pc_bd_dgs_tnm_data);
                    } else if (selectedTable === "pc_bd_is_eos_ae") {
                        treeList.reload(pc_bd_is_eos_ae);
                    } else if (selectedTable === "pc_bd_is_eos_bc") {
                        treeList.reload(pc_bd_is_eos_bc);
                    } else if (selectedTable === "pc_bd_is_eos_nsi") {
                        treeList.reload(pc_bd_is_eos_nsi);
                    } else if (selectedTable === "pc_bd_is_eos_cfc") {
                        treeList.reload(pc_bd_is_eos_cfc);
                    } else if (selectedTable === "pc_bd_is_los_rf") {
                        treeList.reload(pc_bd_is_los_rf);
                    } else if (selectedTable === "pc_bd_is_los_ae") {
                        treeList.reload(pc_bd_is_los_ae);
                    } else if (selectedTable === "pc_bd_is_los_bc") {
                        treeList.reload(pc_bd_is_los_bc);
                    } else if (selectedTable === "pc_bd_is_los_nsi") {
                        treeList.reload(pc_bd_is_los_nsi);
                    } else if (selectedTable === "pc_bd_is_los_cfc") {
                        treeList.reload(pc_bd_is_los_cfc);
                    } else if (selectedTable === "pc_bd_cs_pda_ultrasound") {
                        treeList.reload(pc_bd_cs_pda_ultrasound);
                    } else if (selectedTable === "pc_bd_cs_pda_treatment") {
                        treeList.reload(pc_bd_cs_pda_treatment);
                    } else if (selectedTable === "pc_bd_rp_ss_list") {
                        treeList.reload(pc_bd_rp_ss_list);
                    } else if (selectedTable === "pc_dpc_bmd_pumping") {
                        hasCid = 0;
                        treeList.reload(pc_dpc_bmd_pumping);
                    }
                },
            });

            const hospitalNum = $(".pc-admin-hospitalCheckbox").length;
            // 选择范围
            form.on("submit(filter)", function (data) {
                let field = data.field, hospitalIdArray = [];
                for (let i = 0; i < hospitalNum; i++) {
                    hospitalIdArray.push(field["hospitalId[" + i + "]"]);
                    delete field["hospitalId[" + i + "]"];
                }
                field.hospitalIdArray = JSON.stringify(hospitalIdArray);
                $.post("/perinatalPlatform/filterDataExport", field, function (back, status) {
                    if(status === "success") {
                        if(back.code) {
                            $("#PC-case-number").text(back.caseNum);
                        }
                    }
                }, "json");
            });

            // 提交字段 获取 CSV
            form.on("submit(topicExport)", function (data) {
                const doing = "导出专题";
                loading(doing);
                let field = data.field, hospitalIdArray = [];
                for (let i = 0; i < hospitalNum; i++) {
                    if (notNullTool(field["hospitalId[" + i + "]"])) {
                        hospitalIdArray.push(field["hospitalId[" + i + "]"]);
                    }
                }

                let subData = {
                    hasCid: hasCid
                };
                if (notNullTool(field.selectType)) {
                    subData.selectType = field.selectType;
                }
                if (notNullTool(field.startDate)) {
                    subData.startDate = field.startDate;
                }
                if (notNullTool(field.endDate)) {
                    subData.endDate = field.endDate
                }
                if (notNullTool(field.patientClassification)) {
                    subData.patientClassification = field.patientClassification;
                }
                if (notNullTool(field.diagnosisTreatment)) {
                    subData.diagnosisTreatment =field.diagnosisTreatment;
                }
                if (notNullTool(field.outcomeIndicator)) {
                    subData.outcomeIndicator = field.outcomeIndicator;
                }
                if (hospitalIdArray.length > 0) {
                    subData.hospitalIdArray = JSON.stringify(hospitalIdArray)
                }
                const databaseField = treeList.getAllNodeData()[0];

                if (databaseField !== undefined) {
                    let allFields = [], allLabels = ["围产新生儿科研合作平台母亲编号"];
                    if (hasCid === 1) {
                        allLabels.push("围产新生儿科研合作平台新生儿编号");
                    }
                    const fields = databaseField.children;
                    for (const i in fields) {
                        const thisField = fields[i],
                            fieldName = thisField.key,
                            fieldLabel = thisField.label;
                        allFields.push(fieldName);
                        allLabels.push(fieldLabel);
                    }
                    subData.allFields = JSON.stringify(allFields);
                    subData.table = databaseField.key;

                    $.post("/perinatalPlatform/topicExportCSV", subData, function (back, status) {
                        if(status === "success") {
                            if(back.code) {
                                let backData = back.dataExportList, exportData = [];
                                for (const i in backData) {
                                    const thisBackData = backData[i];
                                    let thisData = [], realFields = ["pcMotherNum"];
                                    if (hasCid === 1) {
                                        realFields.push("pcNewbornNum");
                                    }
                                    realFields = realFields.concat(allFields);
                                    for (const j in realFields) {
                                        const thisField = realFields[j];
                                        let value = thisBackData[thisField];
                                        if (notNullTool(value)) {
                                            // 日期 格式化
                                            if (typeof value === "string" && /[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}:[0-9]{2}/.test(value)) {
                                                value = dateFormat(Date.parse(value));
                                            }
                                            value = "\t" + value + "\t";
                                        } else {
                                            value = "";
                                        }
                                        thisData.push(value);
                                    }
                                    exportData.push(thisData);
                                }
                                layer.closeAll();
                                const date = new Date(),
                                    fileType = $(data.elem).attr("data-type");
                                table.exportFile(allLabels, exportData, {
                                    type: fileType,
                                    title: "专题导出_" + date.getFullYear() + "年" + (date.getMonth() + 1) + "月" + date.getDate() + "日" +
                                        date.getHours() + "时" + date.getMinutes() + "分" + date.getSeconds() + "秒"
                                });
                            } else {failMsg(doing)}
                        } else {errorMsg1()}
                    },"json").fail(function () {errorMsg2()});
                } else {
                    alertMsg("请选择字段！");
                }
            });
            $(".pc-select-board-title button").click();
        }
    });
});