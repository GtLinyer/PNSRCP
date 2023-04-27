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
        xmSelect: "xm-select"
    });

    // 引入 layui
    layui.use(["element", "table", "form", "laydate"], function () {
        let table = layui.table,
            laydate = layui.laydate,
            form = layui.form,
            childId = 0, motherId = 0;

        // 填写日期范围选择
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
            let getCaseInquiryUrl = "/perinatalPlatform/highBilirubin/getCase",
                caseInquiryOptions = {
                    elem: "#PC-db-table-caseInquiry",
                    id: "PC-db-table-caseInquiry",
                    skin: "line",
                    url: getCaseInquiryUrl + "?startDate=" + startDate + "&endDate=" + endDate,
                    even: true,
                    loading: true,
                    page: true,
                    limit: 10,
                    cols: [[
                        {field: "mid", hide: true},
                        {field: "cid", hide: true},
                        {field: "pcHbMotherNum", minWidth: 140, title: "高胆母亲编号", sort: true},
                        {field: "pcHbChildNum", minWidth: 148, title: "高胆患儿编号", sort: true},
                        {field: "childFullName", minWidth: 100, title: "患儿姓名"},
                        {field: "gender", minWidth: 58, width: 58, title: "性别"},
                        {field: "gestationalAge", minWidth: 88, width: 88, title: "胎龄", templet: "#PC-db-gestationalAge"},
                        {field: "birthWeight", minWidth: 126, title: "出生体重（g）", templet: "#PC-db-birthWeight"},
                        {field: "admissionDate", minWidth: 160, title: "患儿入院日期"},
                        {field: "birthday", minWidth: 160, title: "患儿出生日期"},
                        {field: "childHospitalNumber", minWidth: 114, title: "患儿住院号"},
                        {field: "dischargeTime", minWidth: 160, title: "患儿出院日期", templet: "#PC-db-dischargeDate"},
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
                caseInquiryOptions.url = getCaseInquiryUrl + "?startDate=" + fieldData.startDate + "&endDate=" +
                    fieldData.endDate + "&caseStatus=" + fieldData.caseStatus + "&inHospital=" + fieldData.inHospital;
                table.reload("PC-db-table-caseInquiry", caseInquiryOptions);
                return false;
            });

            // 首页 搜索 病历 初始化
            const searchKey = window.sessionStorage.getItem("searchKey");
            if (notNullTool(searchKey)) {
                $("#PC-db-SK").val(searchKey);
                caseInquiryOptions.url = getCaseInquiryUrl + "?searchKey=" + searchKey;
                window.sessionStorage.removeItem("searchKey");
                table.reload("PC-db-table-caseInquiry", caseInquiryOptions);
            }

            // 搜索 病历
            form.on("submit(search)", function (data) {
                caseInquiryOptions.url = getCaseInquiryUrl + "?searchKey=" + data.field.searchKey;
                table.reload("PC-db-table-caseInquiry", caseInquiryOptions);
                return false;
            });

            // 获取 CSV
            $("#PC-db-case-csv").on("click", function () {
                let thisStartDate = "", thisEndDate = "", caseStatus = "", inHospital = "";
                sequentialExecution(function () {
                    let startDateInput = null, endDateInput = null;
                    try {
                        startDateInput = fieldData.startDate;
                    } catch (e) {}
                    try {
                        endDateInput = fieldData.endDate;
                    } catch (e) {}
                    try {
                        caseStatus = fieldData.caseStatus;
                    } catch (e) {}
                    try {
                        inHospital = fieldData.inHospital;
                    } catch (e) {}
                    if (notNullTool(startDateInput) && notNullTool(endDateInput)) {
                        thisStartDate = startDateInput;
                        thisEndDate = endDateInput;
                    } else {
                        thisStartDate = startDate;
                        thisEndDate = endDate;
                    }
                }, function () {
                    document.location.href = "/perinatalPlatform/highBilirubin/getCaseCSV?startDate=" + thisStartDate + "&endDate=" +
                        thisEndDate + "&caseStatus=" + caseStatus + "&inHospital=" + inHospital;
                });
            });

            //工具条事件
            table.on("tool(PC-db-table-caseInquiry)", function (obj) {
                let data = obj.data,
                    layEvent = obj.event;
                if (layEvent === "edit") {
                    $.get("/perinatalPlatform/highBilirubin/setChildIdSession?motherId=" + data.mid + "&childId=" + data.cid, function (back, status) {
                        if (status === "success") {
                            if (back.code) {
                                location.href = "/perinatalPlatform/highBilirubin/write/PI";
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
                    $.post("/perinatalPlatform/highBilirubin/deleteCase", data.field, function (back, status) {
                        if (status === "success") {
                            if (back.code) {
                                successMsg("删除病例成功！", function () {
                                    layer.closeAll();
                                    table.reload("PC-db-table-caseInquiry", caseInquiryOptions, true);
                                });
                            } else {errorMsg(back.errorMsg)}
                        } else {errorMsg1()}
                    }, "json").fail(function () {
                        errorMsg2()
                    });
                }
                return false;
            });
        }
    });
});