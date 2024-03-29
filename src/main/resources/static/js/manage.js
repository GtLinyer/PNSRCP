let hospitalDoing, areaDoing, authorityId = 0,form;
function removePwdReq() {
    let pwdInput = $("#PC-admin-pwd");
    let rePwdInput = $("#PC-admin-rePwd");
    if($(pwdInput).attr("required") !== undefined) {
        $(pwdInput).removeAttr("required");
    }
    if($(pwdInput).attr("lay-verify") !== undefined) {
        $(pwdInput).removeAttr("lay-verify");
    }
    if($(rePwdInput).attr("required") !== undefined) {
        $(rePwdInput).removeAttr("required");
    }
    if($(rePwdInput).attr("lay-verify") !== undefined) {
        $(rePwdInput).removeAttr("lay-verify");
    }
}
function addPwdReq() {
    let pwdInput = $("#PC-admin-pwd");
    let rePwdInput = $("#PC-admin-rePwd");
    if($(pwdInput).attr("required") === undefined) {
        $(pwdInput).attr("required", "required");
    }
    if($(pwdInput).attr("lay-verify") === undefined) {
        $(pwdInput).attr("lay-verify", "required");
    }
    if($(rePwdInput).attr("required") === undefined) {
        $(rePwdInput).attr("required", "required");
    }
    if($(rePwdInput).attr("lay-verify") === undefined) {
        $(rePwdInput).attr("lay-verify", "required");
    }
}
function addHospital() {
    sequentialExecution(function () {
        hospitalDoing = "保存新增医院";
        $("#PC-admin-hid").removeAttr("name");
        $("#PC-admin-uid").removeAttr("name");
        $("#PC-admin-edit>form")[0].reset();
        $("#PC-admin-select-city>option[value!='']").remove();
        $("#PC-admin-select-county>option[value!='']").remove();

        // 添加医院信息时 密码框 加上required
        addPwdReq();
    }, function () {
        form.render();
    }, function () {
        layer.open({
            title: "<i class='iconfont icon-zengjia'></i> 新增医院",
            type: 1,
            shade: 0.8,
            content: $("#PC-admin-edit"),
            resize: false
        });
    });
}
function addArea() {
    $("#PC-admin-aid").removeAttr("name");
    $("#PC-admin-chargeId").removeAttr("name");
    $("#PC-admin-edit>form")[0].reset();
    // 添加区域信息时 密码框 加上required
    addPwdReq();
    areaDoing = "保存新增区域";
    layer.open({
        title: "<i class='iconfont icon-quyuguanli1'></i> 新增区域",
        type: 1,
        shade: 0.8,
        content: $("#PC-admin-edit"),
        resize: false
    });
}
function editArea(aid) {
    $("#PC-admin-aid").attr("name", "aid");
    $("#PC-admin-chargeId").attr("name", "chargeId");
    $("#PC-admin-edit>form")[0].reset();

    // 修改区域信息时 密码框 去除required
    removePwdReq();
    $.get("/manage/area/getAreaMsg?aid=" + aid, function (back, status) {
        if (status === "success") {
            if(back.code) {
                let areaMsg = back.areaMsg;
                sequentialExecution(function () {
                    form.val("editArea", {
                        "aid" : aid,
                        "areaName": areaMsg.areaName,
                        "abbreviation" : areaMsg.abbreviation,
                        "status" : areaMsg.status,
                        "chargeId" : areaMsg.chargeId,
                        "fullName" : areaMsg.fullName,
                        "phone" : areaMsg.phone,
                        "username" : areaMsg.username
                    });
                    areaDoing = "保存修改区域信息";
                }, function () {
                    layer.open({
                        title: "<i class='iconfont icon-bianji'></i> 查看编辑 — <span class='pc-admin-panel-title-name'>" + areaMsg.areaName + "</span>",
                        type: 1,
                        shade: 0.8,
                        content: $("#PC-admin-edit"),
                        resize: false
                    });
                });
            }
        }
    }, "json");
}
function setAuthority(aid, areaName) {
    $("#PC-admin-authority>form input").removeAttr("checked");
    $("#PC-admin-authority>form")[0].reset();
    authorityId = aid;
    $.get("/manage/area/getAuthority?aid=" + authorityId, function (back, status) {
        if (status === "success") {
            if(back.code) {
                sequentialExecution(function () {
                    let areaBDAuth = back.areaBDAuth,
                        flag = 0;
                    for(let aba in areaBDAuth){
                        if(areaBDAuth[aba] === 1){
                            $("#ABDA input[name=" + aba + "]").attr("checked", true);
                        }else {
                            flag++;
                        }
                    }
                    if(flag === 1) {
                        $("#ABDA>input:first-child").attr("checked", true);
                    }
                }, function () {
                    let areaDPCAuth = back.areaDPCAuth,
                        flag = 0;
                    for(let ada in areaDPCAuth){
                        if(areaDPCAuth[ada] === 1){
                            $("#ADPCA input[name=" + ada + "]").attr("checked", true);
                        }else {
                            flag++;
                        }
                    }
                    if(flag === 1) {
                        $("#ADPCA>input:first-child").attr("checked", true);
                    }
                }, function () {
                    let areaMBSRAuth = back.areaMBSRAuth,
                        flag = 0;
                    for(let ama in areaMBSRAuth){
                        if(areaMBSRAuth[ama] === 1){
                            $("#AMBSRA input[name=" + ama + "]").attr("checked", true);
                        }else {
                            flag++;
                        }
                    }
                    if(flag === 1) {
                        $("#AMBSRA>input:first-child").attr("checked", true);
                    }
                }, function () {
                    let areaPPAuth = back.areaPPAuth,
                        flag = 0;
                    for(let apa in areaPPAuth){
                        if(areaPPAuth[apa] === 1){
                            $("#APPA input[name=" + apa + "]").attr("checked", true);
                        }else {
                            flag++;
                        }
                    }
                    if(flag === 1) {
                        $("#APPA>input:first-child").attr("checked", true);
                    }
                }, function () {
                    let areaRDAuth = back.areaRDAuth,
                        flag = 0;
                    for(let ara in areaRDAuth){
                        if(areaRDAuth[ara] === 1){
                            $("#ARDA input[name=" + ara + "]").attr("checked", true);
                        }else {
                            flag++;
                        }
                    }
                    if(flag === 1) {
                        $("#ARDA>input:first-child").attr("checked", true);
                    }
                }, function () {
                    let areaUIAuth = back.areaUIAuth,
                        flag = 0;
                    for(let aua in areaUIAuth){
                        if(areaUIAuth[aua] === 1){
                            $("#AUIA input[name=" + aua + "]").attr("checked", true);
                        }else {
                            flag++;
                        }
                    }
                    if(flag === 1) {
                        $("#AUIA>input:first-child").attr("checked", true);
                    }
                }, function () {
                    let areaFDAuth = back.areaFDAuth,
                        flag = 0;
                    for(let afa in areaFDAuth){
                        if(areaFDAuth[afa] === 1){
                            $("#AFDA input[name=" + afa + "]").attr("checked", true);
                        }else {
                            flag++;
                        }
                    }
                    if(flag === 1) {
                        $("#AFDA>input:first-child").attr("checked", true);
                    }
                }, function () {
                    let areaHBAuth = back.areaHBAuth,
                        flag = 0;
                    for(let aha in areaHBAuth){
                        if(areaHBAuth[aha] === 1){
                            $("#AHBA input[name=" + aha + "]").attr("checked", true);
                        }else {
                            flag++;
                        }
                    }
                    if(flag === 1) {
                        $("#AHBA>input:first-child").attr("checked", true);
                    }
                }, function () {
                    form.render("checkbox");
                }, function () {
                    let area;
                    if($(window).width() < 768) {
                        area = "352px";
                    }else {
                        area = "520px";
                    }
                    layer.open({
                        title: "<i class='iconfont icon-quanxian'></i> 权限管理 — <span class='pc-admin-panel-title-name'>" + areaName + "</span>",
                        type: 1,
                        shade: 0.8,
                        area: area,
                        content: $("#PC-admin-authority"),
                        resize: false
                    });
                });
            }
        }
    }, "json");
}
function setHospital(aid, areaName) {
    let setHospitalForm = $("#PC-admin-setHospital>form");
    $(setHospitalForm).find("input").removeAttr("checked");
    $(setHospitalForm)[0].reset();
    $.get("/manage/area/getAreaHospital?aid=" + aid, function (back, status) {
        if (status === "success") {
            if (back.code) {
                sequentialExecution(function () {
                    let hospitalIdList = [],areaHospitalCBList = null;
                    if(back.hospitalIdList.length > 0) {
                        hospitalIdList = back.hospitalIdList;
                        areaHospitalCBList = $("#PC-admin-setHospital>form").find("input[name='hospitalId[]']");

                        // 勾选下属医院
                        for(let i=0; i<hospitalIdList.length; i++) {
                            for(let j=0; j<areaHospitalCBList.length; j++) {
                                if(hospitalIdList[i] === parseInt($(areaHospitalCBList[j]).val())) {
                                    $(areaHospitalCBList[j]).attr("checked", true);
                                }
                            }
                        }
                        // 判断省份内是否全选
                        let aCBRowList = $("#PC-admin-setHospital>form .layui-row");
                        for(let k=0; k<aCBRowList.length; k++) {
                            let aCBList = $(aCBRowList[k]).find("input[name='hospitalId[]']"),
                                kk = 0;
                            for(let ii=0; ii<aCBList.length; ii++) {
                                if($(aCBList[ii]).attr("checked") === undefined) {
                                    kk++;
                                }
                            }
                            if(kk === 0) {
                                $(aCBRowList[k]).find("input[name!='hospitalId[]']").attr("checked", true);
                            }else {
                                $(aCBRowList[k]).find("input[name!='hospitalId[]']").removeAttr("checked");
                            }
                        }
                    }
                }, function () {
                    form.render("checkbox");
                }, function () {
                    let area;
                    if($(window).width() < 768) {
                        area = "350px";
                    }else {
                        area = "900px";
                    }
                    layer.open({
                        title: "<i class='iconfont icon-yiyuan'></i> 设置医院 — <span class='pc-admin-panel-title-name'>" + areaName + "</span>",
                        type: 1,
                        shade: 0.8,
                        area: area,
                        content: $("#PC-admin-setHospital"),
                        resize: false
                    });
                });
            }
        }
    },"json");
}
$(document).ready(function() {
    let areaId = 0;
    // 区域管理激活面板
    $(".pc-admin-areaPanel").click(function () {
        $(".pc-admin-areaPanel").removeClass("pc-admin-active");  // 移除所有active
        $(this).addClass("pc-admin-active");  // 激活点击的active
        areaId = $(this).attr("areaId");
    });

    // 引入 layui
    layui.use(["element", "form", "table"], function () {
        form = layui.form;
        let table = layui.table, cities, counties;

        // 选择城市
        form.on("select(provinces)", function (data) {
            $("#PC-admin-select-city>option[value!='']").remove();
            $("#PC-admin-select-county>option[value!='']").remove();
            let provinceCode = data.value;
            if(notNullTool(provinceCode)) {
                $.get("/js/utils/region.json", function (back, status) {
                    if (status === "success") {
                        $.each(back, function (index, thisProvince) {
                            if (thisProvince.code === provinceCode) {
                                cities = thisProvince.children;
                                let citySelect = $("#PC-admin-select-city");
                                $.each(cities, function (index, thisCity) {
                                    $(citySelect).append("<option value='" + thisCity.code + "'>" + thisCity.name + "</option>");
                                    form.render("select");
                                });
                            }
                        });
                    }
                }, "json");
            }
        });

        // 选择县区
        form.on("select(cities)", function (data) {
            $("#PC-admin-select-county>option[value!='']").remove();
            const cityCode = data.value;
            if(notNullTool(cityCode) && notNullTool(cities)) {
                $.each(cities, function (index, thisCity) {
                    if(thisCity.code === cityCode) {
                        counties = thisCity.children;
                        let countySelect = $("#PC-admin-select-county");
                        $.each(counties, function (index, thisCounty) {
                            $(countySelect).append("<option value='" + thisCounty.code + "'>" + thisCounty.name + "</option>");
                            form.render("select");
                        });
                    }
                });
            }
        });

        // 管理医院表格
        let getHospitalUrl = "/manage/hospital/get",
            data_aid = $("#PC-manage-table-hospital").attr("data-aid");
        if (data_aid !== undefined) {
            getHospitalUrl = getHospitalUrl + "?aid=" + data_aid;
        }
        let hospitalOptions = {
            elem: "#PC-manage-table-hospital",
            id: "PC-manage-table-hospital",
            skin: "line",
            url: getHospitalUrl,
            even: true,
            loading: true,
            page: true,
            limit: 10,
            cols: [[
                {field:"hid", hide:true},
                {field:"abbreviation", width:76, title: "编号", sort:true},
                {field:"hospitalName", minWidth:160, title:"医院名称"},
                {field:"hospitalLevel", width:90, title:"等级"},
                {field:"location", minWidth:180, width: 224, title:"所属城市"},
                {field:"status", title:"状态", hide:true},
                {field:"statusString", width:90, title:"状态"},
                {field:"caseNumber", width:120, title:"录入病例数", sort:true},
                {field:"uid", title:"用户ID", hide:true},
                {field:"username", title:"用户名", hide:true},
                {field:"phone", title:"联系方式", hide:true},
                {field:"fullName", width:120, title:"负责人"},
                {field:"tool", title:"操作", width:280, toolbar:"#PC-manage-toolbar"}
            ]]
        };

        // 管理用户表格
        let getUserUrl = "/manage/user/get",
            data_hid = $("#PC-manage-table-user").attr("data-hid");
        if (data_hid !== undefined) {
            getUserUrl = getUserUrl + "?hid=" + data_hid;
        }
        let userOptions = {
            elem: "#PC-manage-table-user",
            id: "PC-manage-table-user",
            skin: "line",
            url: getUserUrl,
            even: true,
            loading: true,
            page: true,
            limit: 10,
            cols: [[
                {field:"uid", width:78, title: "编号", sort:true},
                {field:"username", width:80, title:"账号"},
                {field:"fullName", minWidth:100, title:"姓名"},
                {field:"level", title:"等级", hide:true},
                {field:"levelString", minWidth:100, title:"等级"},
                {field:"hospitalId", title:"所属医院ID", hide:true},
                {field:"hospitalName", minWidth:160, title:"医院名称"},
                {field:"status", title:"状态", hide:true},
                {field:"statusString", width:90, title:"状态"},
                {field:"tool", title:"操作", width:100, toolbar:"#PC-manage-toolbar"}
            ]]
        };

        // 表格初始化
        table.render(hospitalOptions);
        table.render(userOptions);

        // 提交 添加/修改 医院信息
        form.on("submit(editHospital)", function(data) {
            let hUrl = "/manage/hospital/";
            loading(hospitalDoing);
            if(hospitalDoing === "保存修改医院信息") {
                hUrl = hUrl + "modify";
            }else {
                hUrl = hUrl + "add";
            }
            if(data.field.password === data.field.rePwd) {
                $.post(hUrl, data.field, function (back, status) {
                    if (status === "success") {
                        if (back.code) {
                            successMsg(hospitalDoing + "成功！", function () {
                                layer.closeAll();
                                table.reload("PC-manage-table-hospital", hospitalOptions);
                                hospitalDoing = null;
                            });
                        } else {failMsg(hospitalDoing)}
                    } else {errorMsg1()}
                }, "json").fail(function () {errorMsg2()});
            } else {
                errorMsg("两次输入密码不一致！")
            }
            return false;
        });

        // 医院信息表格工具条事件
        table.on("tool(PC-manage-table-hospital)", function(obj) {
            let data = obj.data,
                layEvent = obj.event;

            // 查看编辑
            if (layEvent === "edit") {
                $("#PC-admin-hid").attr("name", "hid");
                $("#PC-admin-uid").attr("name", "uid");
                $("#PC-admin-edit>form")[0].reset();
                let provinceCode = data.province,
                    cityCode = data.city,
                    countyCode = data.county;

                // 修改医院信息时 密码框 去除required
                removePwdReq();

                $("#PC-admin-select-city>option[value!='']").remove();
                // 选择城市
                if(notNullTool(provinceCode)) {
                    $.get("/js/utils/region.json", function (back, status) {
                        if (status === "success") {
                            $.each(back, function (index, thisProvince) {
                                if (thisProvince.code === provinceCode) {
                                    cities = thisProvince.children;
                                    let citySelect = $("#PC-admin-select-city");
                                    $.each(cities, function (index, thisCity) {
                                        if(cityCode === thisCity.code) {
                                            $(citySelect).append("<option value='" + thisCity.code + "' selected>" + thisCity.name + "</option>");
                                        }else {
                                            $(citySelect).append("<option value='" + thisCity.code + "'>" + thisCity.name + "</option>");
                                        }
                                        form.render("select");
                                    });
                                }
                            });
                            if(notNullTool(cityCode)) {
                                $("#PC-admin-select-county>option[value!='']").remove();
                                $.each(cities, function (index, thisCity) {
                                    if(thisCity.code === cityCode) {
                                        counties = thisCity.children;
                                        let countySelect = $("#PC-admin-select-county");
                                        $.each(counties, function (index, thisCounty) {
                                            if(countyCode === thisCounty.code) {
                                                $(countySelect).append("<option value='" + thisCounty.code + "' selected>" + thisCounty.name + "</option>");
                                            }else {
                                                $(countySelect).append("<option value='" + thisCounty.code + "'>" + thisCounty.name + "</option>");
                                            }
                                            form.render("select");
                                        })
                                    }
                                });
                            }
                        }
                    }, "json");
                }

                form.val("editHospital", {
                    "hid": data.hid,
                    "uid": data.uid,
                    "hospitalName": data.hospitalName,
                    "abbreviation": data.abbreviation,
                    "hlId": data.hlId,
                    "province": data.province,
                    "username": data.username,
                    "fullName": data.fullName,
                    "phone": data.phone
                });
                hospitalDoing = "保存修改医院信息";
                layer.open({
                    title: "<i class='iconfont icon-bianji'></i> 查看编辑 — <span class='pc-admin-panel-title-name'>" + data.hospitalName + "</span>",
                    type: 1,
                    shade: 0.8,
                    content: $("#PC-admin-edit"),
                    resize: false,
                    cancel: function () {
                        $(".layui-table-click").removeClass("layui-table-click");
                    }
                });
            }else if(layEvent === "authority") {
                $("#PC-admin-authority>form input").removeAttr("checked");
                $("#PC-admin-authority>form")[0].reset();
                authorityId = data.hid;
                $.get("/manage/hospital/getAuthority?hid=" + authorityId, function (back, status) {
                    if (status === "success") {
                        if(back.code) {
                            sequentialExecution(function () {
                                let hospitalBDAuth = back.hospitalBDAuth,
                                    flag = 0;
                                for (let hba in hospitalBDAuth) {
                                    if (hospitalBDAuth[hba] === 1) {
                                        $("#HBDA input[name=" + hba + "]").attr("checked", true);
                                    } else {
                                        flag++;
                                    }
                                }
                                if (flag === 1) {
                                    $("#HBDA>input:first-child").attr("checked", true);
                                }
                            }, function () {
                                let hospitalDPCAuth = back.hospitalDPCAuth,
                                    flag = 0;
                                for(let hda in hospitalDPCAuth){
                                    if(hospitalDPCAuth[hda] === 1){
                                        $("#HDPCA input[name=" + hda + "]").attr("checked", true);
                                    }else {
                                        flag++;
                                    }
                                }
                                if(flag === 1) {
                                    $("#HDPCA>input:first-child").attr("checked", true);
                                }
                            }, function () {
                                let hospitalMBSRAuth = back.hospitalMBSRAuth,
                                    flag = 0;
                                for (let hma in hospitalMBSRAuth) {
                                    if (hospitalMBSRAuth[hma] === 1) {
                                        $("#HMBSRA input[name=" + hma + "]").attr("checked", true);
                                    } else {
                                        flag++;
                                    }
                                }
                                if (flag === 1) {
                                    $("#HMBSRA>input:first-child").attr("checked", true);
                                }
                            }, function () {
                                let hospitalPPAuth = back.hospitalPPAuth,
                                    flag = 0;
                                for (let hpa in hospitalPPAuth) {
                                    if (hospitalPPAuth[hpa] === 1) {
                                        $("#HPPA input[name=" + hpa + "]").attr("checked", true);
                                    } else {
                                        flag++;
                                    }
                                }
                                if (flag === 1) {
                                    $("#HPPA>input:first-child").attr("checked", true);
                                }
                            }, function () {
                                let hospitalRDAuth = back.hospitalRDAuth,
                                    flag = 0;
                                for (let hra in hospitalRDAuth) {
                                    if (hospitalRDAuth[hra] === 1) {
                                        $("#HRDA input[name=" + hra + "]").attr("checked", true);
                                    } else {
                                        flag++;
                                    }
                                }
                                if (flag === 1) {
                                    $("#HRDA>input:first-child").attr("checked", true);
                                }
                            }, function () {
                                let hospitalUIAuth = back.hospitalUIAuth,
                                    flag = 0;
                                for (let hua in hospitalUIAuth) {
                                    if (hospitalUIAuth[hua] === 1) {
                                        $("#HUIA input[name=" + hua + "]").attr("checked", true);
                                    } else {
                                        flag++;
                                    }
                                }
                                if (flag === 1) {
                                    $("#HUIA>input:first-child").attr("checked", true);
                                }
                            }, function () {
                                let hospitalFDAuth = back.hospitalFDAuth,
                                    flag = 0;
                                for (let hfa in hospitalFDAuth) {
                                    if (hospitalFDAuth[hfa] === 1) {
                                        $("#HFDA input[name=" + hfa + "]").attr("checked", true);
                                    } else {
                                        flag++;
                                    }
                                }
                                if (flag === 1) {
                                    $("#HFDA>input:first-child").attr("checked", true);
                                }
                            }, function () {
                                let hospitalHBAuth = back.hospitalHBAuth,
                                    flag = 0;
                                for (let hha in hospitalHBAuth) {
                                    if (hospitalHBAuth[hha] === 1) {
                                        $("#HHBA input[name=" + hha + "]").attr("checked", true);
                                    } else {
                                        flag++;
                                    }
                                }
                                if (flag === 1) {
                                    $("#HHBA>input:first-child").attr("checked", true);
                                }
                            }, function () {
                                form.render("checkbox");
                            }, function () {
                                let area;
                                if($(window).width() < 768) {
                                    area = "352px";
                                }else {
                                    area = "520px";
                                }
                                layer.open({
                                    title: "<i class='iconfont icon-quanxian'></i> 权限管理 — <span class='pc-admin-panel-title-name'>" + data.hospitalName + "</span>",
                                    type: 1,
                                    shade: 0.8,
                                    area: area,
                                    content: $("#PC-admin-authority"),
                                    resize: false,
                                    cancel: function () {
                                        $(".layui-table-click").removeClass("layui-table-click");
                                    }
                                });
                            });
                        }
                    }
                }, "json");
            }else if(layEvent === "user") {
                location.href = "/manage/user?hid=" + data.hid;
            }
        });

        // 权限表单 选择所有复选框 事件
        form.on("checkbox(authCheckboxAll)", function(data){
            let authCheckboxArray = $(data.elem).nextAll(".pc-admin-authority-item").children(".layui-form-checkbox");
            if(data.elem.checked) {
                if ($(data.elem).nextAll(".pc-admin-authority-item").children(".layui-form-checkbox.layui-form-checked").length === 0) {
                    for (let i = 0; i < authCheckboxArray.length; i++) {
                        if (!$(authCheckboxArray[i]).hasClass("layui-form-checked")) {
                            $(authCheckboxArray[i]).click();
                        }
                    }
                }
            }else {
                for(let i=0; i<authCheckboxArray.length; i++) {
                    if($(authCheckboxArray[i]).hasClass("layui-form-checked")) {
                        $(authCheckboxArray[i]).click();
                    }
                }
            }

        });

        // 权限表单 取消 全选按钮 选择 事件
        form.on("checkbox(authCheckbox)", function(data){
            let authCheckboxAllInput = $(data.elem).parents(".pc-admin-authority").children("input"),
                authCheckboxNum = parseInt($(data.elem).parent().children(".layui-form-checkbox.layui-form-checked").length),
                authCheckboxAll = $(authCheckboxAllInput).next(".layui-form-checkbox"),
                authCheckboxChecked = $(authCheckboxAll).hasClass("layui-form-checked");

            if(data.elem.checked) {
                if(authCheckboxNum > 0 && !authCheckboxChecked) {
                    $(authCheckboxAll).click();
                }
            }else {
                if (authCheckboxNum === 0 && authCheckboxChecked) {
                    $(authCheckboxAll).click();
                }
            }
        });

        // 提交 医院权限 表单
        form.on("submit(setHospitalAuthority)", function (data) {
            data.field.hid = authorityId;
            let doing = "保存医院权限";
            loading(doing);
            $.post("/manage/hospital/setAuthority", data.field, function (back, status) {
                if(status === "success") {
                    if(back.code) {
                        successMsg(doing + "成功！", function () {
                            layer.closeAll();
                        });
                    }else {errorMsg(back.errorMsg)}
                }else {errorMsg1()}
            },"json").fail(function () {errorMsg2()});
            return false;
        });

        // 提交 修改 用户信息
        form.on("submit(editUser)", function(data) {
            loading("保存修改用户信息");
            if(data.field.password === data.field.rePwd) {
                $.post("/manage/user/modify", data.field, function (back, status) {
                    if(status === "success") {
                        if(back.code) {
                            successMsg("保存修改用户信息成功！", function () {
                                layer.closeAll();
                                table.reload("PC-manage-table-user", userOptions);
                            });
                        }else {errorMsg(back.errorMsg)}
                    }else {errorMsg1()}
                },"json").fail(function () {errorMsg2()});
            }else {
                errorMsg("两次输入密码不一致！");
            }
            return false;
        });

        // 用户信息表格工具条事件
        table.on("tool(PC-manage-table-user)", function(obj) {
            let data = obj.data,
                layEvent = obj.event;

            // 查看编辑
            if (layEvent === "edit") {
                $("#PC-admin-uid").attr("name", "uid");
                $("#PC-admin-hid").removeAttr("name");
                $("#PC-admin-edit>form")[0].reset();

                // 修改用户信息时 密码框 去除required
                removePwdReq();

                form.val("editUser", {
                    "uid": data.uid,
                    "username": data.username,
                    "fullName": data.fullName,
                    "phone": data.phone,
                    "level": data.level,
                    "status": data.status
                });
                layer.open({
                    title: "<i class='iconfont icon-bianji'></i> 查看编辑 — <span class='pc-admin-panel-title-name'>" + data.username + "</span>",
                    type: 1,
                    shade: 0.8,
                    content: $("#PC-admin-edit"),
                    resize: false,
                    cancel: function () {
                        $(".layui-table-click").removeClass("layui-table-click");
                    }
                });
            }
        });

        // 提交 添加/修改 区域信息
        form.on("submit(editArea)", function(data) {
            let aUrl = "/manage/area/";
            if (areaDoing === "保存新增区域") {
                aUrl = aUrl + "add";
            } else if (areaDoing === "保存修改区域信息") {
                aUrl = aUrl + "modify";
            }
            if(data.field.password === data.field.rePwd) {
                $.post(aUrl, data.field, function (back, status) {
                    if (status === "success") {
                        if (back.code) {
                            successMsg(areaDoing + "成功！", function () {
                                layer.closeAll();
                                location.reload();
                                areaDoing = null;
                            });
                        } else {errorMsg(back.errorMsg)}
                    } else {errorMsg1()}
                }, "json").fail(function () {errorMsg2()});
            } else {
                errorMsg("两次输入密码不一致！");
            }
            return false;
        });

        // 设置 区域状态
        form.on("select(PC-admin-area-status)", function (data) {
            $.get("/manage/area/setStatus?status=" + data.value + "&areaId=" + areaId, function (back, status) {
                if(status === "success") {
                    if(!back.code) {errorMsg1()}
                }else {errorMsg1()}
            },"json").fail(function () {errorMsg2()});
        });

        // 选择 区域 下属医院
        form.on("checkbox(hospitalCheckboxAll)", function(data) {
            let hospitalCheckboxArray = $(data.elem).parents(".layui-row").children(".layui-col-xs8").children(".pc-admin-hospitalCheckbox").children(".layui-form-checkbox");
            if(data.elem.checked) {
                for(let i=0; i<hospitalCheckboxArray.length; i++) {
                    if(!$(hospitalCheckboxArray[i]).hasClass("layui-form-checked")) {
                        $(hospitalCheckboxArray[i]).click();
                    }
                }
            }else {
                for(let i=0; i<hospitalCheckboxArray.length; i++) {
                    if($(hospitalCheckboxArray[i]).hasClass("layui-form-checked")) {
                        $(hospitalCheckboxArray[i]).click();
                    }
                }
            }
        });

        // 提交 设置 区域 下属医院
        form.on("submit(setHospital)", function(data) {
            let doing = "设置医院";
            if(areaId > 0) {
                let msg = {},
                    hospitalIdArray = [],
                    areaHospitalCBList = $(data.form).find("input[name='hospitalId[]']");
                msg.aid = areaId;
                for(let i=0; i<areaHospitalCBList.length; i++) {
                    if($(areaHospitalCBList[i]).next().hasClass("layui-form-checked")) {
                        hospitalIdArray.push($(areaHospitalCBList[i]).val());
                    }
                }
                msg.hospitalId = hospitalIdArray;
                $.post("/manage/area/setHospital", msg, function (back, status) {
                    if(status === "success") {
                        if(back.code) {
                            successMsg(doing + "成功！", function () {
                                location.reload();
                            });
                        }else {errorMsg(back.errorMsg)}
                    }else {errorMsg1()}
                },"json").fail(function () {errorMsg2()});
            }
            return false;
        });

        // 提交 区域权限 表单
        form.on("submit(setAreaAuthority)", function (data) {
            data.field.aid = authorityId;
            let doing = "保存区域权限";
            loading(doing);
            $.post("/manage/area/setAuthority", data.field, function (back, status) {
                if(status === "success") {
                    if(back.code) {
                        successMsg(doing + "成功！", function () {
                            layer.closeAll();
                        });
                    }else {errorMsg(back.errorMsg)}
                }else {errorMsg1()}
            },"json").fail(function () {errorMsg2()});
            return false;
        });
    });
});