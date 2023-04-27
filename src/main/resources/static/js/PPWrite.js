function addPrEpds() {
    sequentialExecution(function () {
        $("#PC-db-epdsId").removeAttr("name");
        $("#PC-db-addPrEpds>form")[0].reset();
        $("#PC-db-evaluationMethod>.pc-db-radioBtn-group>li").removeAttr("class");
    }, function () {
        layer.open({
            title: "<i class='iconfont icon-zengjia'></i> 新增EPDS评估",
            type: 1,
            shade: 0.8,
            area: "270px",
            content: $("#PC-db-addPrEpds"),
            resize: false
        });
    });
}
function editPrEpds(elem) {
    const epdsIdElem = $("#PC-db-epdsId");
    sequentialExecution(function () {
        $(epdsIdElem).attr("name", "id");
        $("#PC-db-addPrEpds>form")[0].reset();
        $("#PC-db-evaluationMethod>.pc-db-radioBtn-group>li").removeAttr("class");
    }, function () {
        $(epdsIdElem).val($(elem).attr("data-id"));
        $("#PC-db-prED").val($(elem).attr("data-evaluationDate"));
        $("#PC-db-GAW").val($(elem).attr("data-gestationalAgeWeek"));
        $("#PC-db-GAD").val($(elem).attr("data-gestationalAgeDay"));
        $("#PC-db-evaluationMethod>input").val($(elem).attr("data-evaluationMethod"));
        const evaluationMethodElemList = $("#PC-db-evaluationMethod>.pc-db-radioBtn-group>li");
        for (let i = 0; i < evaluationMethodElemList.length; i++) {
            if ($(evaluationMethodElemList[i]).attr("data-value") === $(elem).attr("data-evaluationMethod")) {
                $(evaluationMethodElemList[i]).addClass("pc-db-active");
            }
        }
        $("#PC-db-epdsScore").val($(elem).attr("data-epdsScore"));
    }, function () {
        layer.open({
            title: "<i class='iconfont icon-bianji'></i> 编辑EPDS评估",
            type: 1,
            shade: 0.8,
            area: "270px",
            content: $("#PC-db-addPrEpds"),
            resize: false
        });
    });
}
function deletePrEpds(id) {
    layer.msg("确定要 <span class='pc-db-status-color-no'>删除</span> 这条EPDS评估吗?",{
        icon: 7,
        time: 0,
        anim: 6,
        btn: ["确定", "取消"],
        resize: false,
        shade: 0.8,
        yes: function () {
            const doing = "删除EPDS评估";
            loading(doing);
            $.get("/perinatalPlatform/parentalPsychology/write/PR/RPDS/delete?id=" + id, function (back ,status) {
                if (status === "success") {
                    if (back.code) {
                        successMsg(doing + "成功！", function () {
                            location.reload();
                        });
                    }
                }
            }, "json");
        }
    });
}
function addPrSas() {
    sequentialExecution(function () {
        $("#PC-db-sasId").removeAttr("name");
        $("#PC-db-addPrSas>form")[0].reset();
        $("#PC-db-evaluationMethod>.pc-db-radioBtn-group>li").removeAttr("class");
    }, function () {
        layer.open({
            title: "<i class='iconfont icon-zengjia'></i> 新增SAS评估",
            type: 1,
            shade: 0.8,
            area: "270px",
            content: $("#PC-db-addPrSas"),
            resize: false
        });
    });
}function editPrSas(elem) {
    const sasIdElem = $("#PC-db-sasId");
    sequentialExecution(function () {
        $(sasIdElem).attr("name", "id");
        $("#PC-db-addPrSas>form")[0].reset();
        $("#PC-db-evaluationMethod>.pc-db-radioBtn-group>li").removeAttr("class");
    }, function () {
        $(sasIdElem).val($(elem).attr("data-id"));
        $("#PC-db-prED").val($(elem).attr("data-evaluationDate"));
        $("#PC-db-GAW").val($(elem).attr("data-gestationalAgeWeek"));
        $("#PC-db-GAD").val($(elem).attr("data-gestationalAgeDay"));
        $("#PC-db-evaluationMethod>input").val($(elem).attr("data-evaluationMethod"));
        const evaluationMethodElemList = $("#PC-db-evaluationMethod>.pc-db-radioBtn-group>li");
        for (let i = 0; i < evaluationMethodElemList.length; i++) {
            if ($(evaluationMethodElemList[i]).attr("data-value") === $(elem).attr("data-evaluationMethod")) {
                $(evaluationMethodElemList[i]).addClass("pc-db-active");
            }
        }
        $("#PC-db-sasTRS").val($(elem).attr("data-totalRoughScore"));
        $("#PC-db-sasSS").val($(elem).attr("data-standardScore"));
    }, function () {
        layer.open({
            title: "<i class='iconfont icon-bianji'></i> 编辑SAS评估",
            type: 1,
            shade: 0.8,
            area: "270px",
            content: $("#PC-db-addPrSas"),
            resize: false
        });
    });
}
function deletePrSas(id) {
    layer.msg("确定要 <span class='pc-db-status-color-no'>删除</span> 这条SAS评估吗?",{
        icon: 7,
        time: 0,
        anim: 6,
        btn: ["确定", "取消"],
        resize: false,
        shade: 0.8,
        yes: function () {
            const doing = "删除SAS评估";
            loading(doing);
            $.get("/perinatalPlatform/parentalPsychology/write/PR/SAS/delete?id=" + id, function (back ,status) {
                if (status === "success") {
                    if (back.code) {
                        successMsg(doing + "成功！", function () {
                            location.reload();
                        });
                    }
                }
            }, "json");
        }
    });
}
function addPrSds() {
    sequentialExecution(function () {
        $("#PC-db-sdsId").removeAttr("name");
        $("#PC-db-addPrSds>form")[0].reset();
        $("#PC-db-evaluationMethod>.pc-db-radioBtn-group>li").removeAttr("class");
    }, function () {
        layer.open({
            title: "<i class='iconfont icon-zengjia'></i> 新增SDS评估",
            type: 1,
            shade: 0.8,
            area: "270px",
            content: $("#PC-db-addPrSds"),
            resize: false
        });
    });
}function editPrSds(elem) {
    const sdsIdElem = $("#PC-db-sdsId");
    sequentialExecution(function () {
        $(sdsIdElem).attr("name", "id");
        $("#PC-db-addPrSds>form")[0].reset();
        $("#PC-db-evaluationMethod>.pc-db-radioBtn-group>li").removeAttr("class");
    }, function () {
        $(sdsIdElem).val($(elem).attr("data-id"));
        $("#PC-db-prED").val($(elem).attr("data-evaluationDate"));
        $("#PC-db-GAW").val($(elem).attr("data-gestationalAgeWeek"));
        $("#PC-db-GAD").val($(elem).attr("data-gestationalAgeDay"));
        $("#PC-db-evaluationMethod>input").val($(elem).attr("data-evaluationMethod"));
        const evaluationMethodElemList = $("#PC-db-evaluationMethod>.pc-db-radioBtn-group>li");
        for (let i = 0; i < evaluationMethodElemList.length; i++) {
            if ($(evaluationMethodElemList[i]).attr("data-value") === $(elem).attr("data-evaluationMethod")) {
                $(evaluationMethodElemList[i]).addClass("pc-db-active");
            }
        }
        $("#PC-db-sdsTRS").val($(elem).attr("data-totalRoughScore"));
        $("#PC-db-sdsSS").val($(elem).attr("data-standardScore"));
    }, function () {
        layer.open({
            title: "<i class='iconfont icon-bianji'></i> 编辑SDS评估",
            type: 1,
            shade: 0.8,
            area: "270px",
            content: $("#PC-db-addPrSds"),
            resize: false
        });
    });
}
function deletePrSds(id) {
    layer.msg("确定要 <span class='pc-db-status-color-no'>删除</span> 这条SDS评估吗?",{
        icon: 7,
        time: 0,
        anim: 6,
        btn: ["确定", "取消"],
        resize: false,
        shade: 0.8,
        yes: function () {
            const doing = "删除SDS评估";
            loading(doing);
            $.get("/perinatalPlatform/parentalPsychology/write/PR/SDS/delete?id=" + id, function (back ,status) {
                if (status === "success") {
                    if (back.code) {
                        successMsg(doing + "成功！", function () {
                            location.reload();
                        });
                    }
                }
            }, "json");
        }
    });
}
function addPoEpds() {
    sequentialExecution(function () {
        $("#PC-db-epdsId").removeAttr("name");
        $("#PC-db-addPoEpds>form")[0].reset();
        $("#PC-db-evaluationMethod>.pc-db-radioBtn-group>li").removeAttr("class");
    }, function () {
        layer.open({
            title: "<i class='iconfont icon-zengjia'></i> 新增EPDS评估",
            type: 1,
            shade: 0.8,
            area: "270px",
            content: $("#PC-db-addPoEpds"),
            resize: false
        });
    });
}
function editPoEpds(elem) {
    const epdsIdElem = $("#PC-db-epdsId");
    sequentialExecution(function () {
        $(epdsIdElem).attr("name", "id");
        $("#PC-db-addPoEpds>form")[0].reset();
        $("#PC-db-evaluationMethod>.pc-db-radioBtn-group>li").removeAttr("class");
    }, function () {
        $(epdsIdElem).val($(elem).attr("data-id"));
        $("#PC-db-poED").val($(elem).attr("data-evaluationDate"));
        $("#PC-db-DAB").val($(elem).attr("data-daysAfterBirth"));
        $("#PC-db-evaluationMethod>input").val($(elem).attr("data-evaluationMethod"));
        const evaluationMethodElemList = $("#PC-db-evaluationMethod>.pc-db-radioBtn-group>li");
        for (let i = 0; i < evaluationMethodElemList.length; i++) {
            if ($(evaluationMethodElemList[i]).attr("data-value") === $(elem).attr("data-evaluationMethod")) {
                $(evaluationMethodElemList[i]).addClass("pc-db-active");
            }
        }
        $("#PC-db-epdsScore").val($(elem).attr("data-epdsScore"));
    }, function () {
        layer.open({
            title: "<i class='iconfont icon-bianji'></i> 编辑EPDS评估",
            type: 1,
            shade: 0.8,
            area: "270px",
            content: $("#PC-db-addPoEpds"),
            resize: false
        });
    });
}
function deletePoEpds(id) {
    layer.msg("确定要 <span class='pc-db-status-color-no'>删除</span> 这条EPDS评估吗?",{
        icon: 7,
        time: 0,
        anim: 6,
        btn: ["确定", "取消"],
        resize: false,
        shade: 0.8,
        yes: function () {
            const doing = "删除EPDS评估";
            loading(doing);
            $.get("/perinatalPlatform/parentalPsychology/write/PO/RPDS/delete?id=" + id, function (back ,status) {
                if (status === "success") {
                    if (back.code) {
                        successMsg(doing + "成功！", function () {
                            location.reload();
                        });
                    }
                }
            }, "json");
        }
    });
}
function addPoSas() {
    sequentialExecution(function () {
        $("#PC-db-sasId").removeAttr("name");
        $("#PC-db-addPoSas>form")[0].reset();
        $("#PC-db-evaluationMethod>.pc-db-radioBtn-group>li").removeAttr("class");
    }, function () {
        layer.open({
            title: "<i class='iconfont icon-zengjia'></i> 新增SAS评估",
            type: 1,
            shade: 0.8,
            area: "270px",
            content: $("#PC-db-addPoSas"),
            resize: false
        });
    });
}function editPoSas(elem) {
    const sasIdElem = $("#PC-db-sasId");
    sequentialExecution(function () {
        $(sasIdElem).attr("name", "id");
        $("#PC-db-addPoSas>form")[0].reset();
        $("#PC-db-evaluationMethod>.pc-db-radioBtn-group>li").removeAttr("class");
    }, function () {
        $(sasIdElem).val($(elem).attr("data-id"));
        $("#PC-db-poED").val($(elem).attr("data-evaluationDate"));
        $("#PC-db-DAB").val($(elem).attr("data-daysAfterBirth"));
        $("#PC-db-evaluationMethod>input").val($(elem).attr("data-evaluationMethod"));
        const evaluationMethodElemList = $("#PC-db-evaluationMethod>.pc-db-radioBtn-group>li");
        for (let i = 0; i < evaluationMethodElemList.length; i++) {
            if ($(evaluationMethodElemList[i]).attr("data-value") === $(elem).attr("data-evaluationMethod")) {
                $(evaluationMethodElemList[i]).addClass("pc-db-active");
            }
        }
        $("#PC-db-sasTRS").val($(elem).attr("data-totalRoughScore"));
        $("#PC-db-sasSS").val($(elem).attr("data-standardScore"));
    }, function () {
        layer.open({
            title: "<i class='iconfont icon-bianji'></i> 编辑SAS评估",
            type: 1,
            shade: 0.8,
            area: "270px",
            content: $("#PC-db-addPoSas"),
            resize: false
        });
    });
}
function deletePoSas(id) {
    layer.msg("确定要 <span class='pc-db-status-color-no'>删除</span> 这条SAS评估吗?",{
        icon: 7,
        time: 0,
        anim: 6,
        btn: ["确定", "取消"],
        resize: false,
        shade: 0.8,
        yes: function () {
            const doing = "删除SAS评估";
            loading(doing);
            $.get("/perinatalPlatform/parentalPsychology/write/PO/SAS/delete?id=" + id, function (back ,status) {
                if (status === "success") {
                    if (back.code) {
                        successMsg(doing + "成功！", function () {
                            location.reload();
                        });
                    }
                }
            }, "json");
        }
    });
}
function addPoSds() {
    sequentialExecution(function () {
        $("#PC-db-sdsId").removeAttr("name");
        $("#PC-db-addPoSds>form")[0].reset();
        $("#PC-db-evaluationMethod>.pc-db-radioBtn-group>li").removeAttr("class");
    }, function () {
        layer.open({
            title: "<i class='iconfont icon-zengjia'></i> 新增SDS评估",
            type: 1,
            shade: 0.8,
            area: "270px",
            content: $("#PC-db-addPoSds"),
            resize: false
        });
    });
}function editPoSds(elem) {
    const sasIdElem = $("#PC-db-sdsId");
    sequentialExecution(function () {
        $(sasIdElem).attr("name", "id");
        $("#PC-db-addPoSds>form")[0].reset();
        $("#PC-db-evaluationMethod>.pc-db-radioBtn-group>li").removeAttr("class");
    }, function () {
        $(sasIdElem).val($(elem).attr("data-id"));
        $("#PC-db-poED").val($(elem).attr("data-evaluationDate"));
        $("#PC-db-DAB").val($(elem).attr("data-daysAfterBirth"));
        $("#PC-db-evaluationMethod>input").val($(elem).attr("data-evaluationMethod"));
        const evaluationMethodElemList = $("#PC-db-evaluationMethod>.pc-db-radioBtn-group>li");
        for (let i = 0; i < evaluationMethodElemList.length; i++) {
            if ($(evaluationMethodElemList[i]).attr("data-value") === $(elem).attr("data-evaluationMethod")) {
                $(evaluationMethodElemList[i]).addClass("pc-db-active");
            }
        }
        $("#PC-db-sdsTRS").val($(elem).attr("data-totalRoughScore"));
        $("#PC-db-sdsSS").val($(elem).attr("data-standardScore"));
    }, function () {
        layer.open({
            title: "<i class='iconfont icon-bianji'></i> 编辑SDS评估",
            type: 1,
            shade: 0.8,
            area: "270px",
            content: $("#PC-db-addPoSds"),
            resize: false
        });
    });
}
function deletePoSds(id) {
    layer.msg("确定要 <span class='pc-db-status-color-no'>删除</span> 这条SDS评估吗?",{
        icon: 7,
        time: 0,
        anim: 6,
        btn: ["确定", "取消"],
        resize: false,
        shade: 0.8,
        yes: function () {
            const doing = "删除SAS评估";
            loading(doing);
            $.get("/perinatalPlatform/parentalPsychology/write/PO/SDS/delete?id=" + id, function (back ,status) {
                if (status === "success") {
                    if (back.code) {
                        successMsg(doing + "成功！", function () {
                            location.reload();
                        });
                    }
                }
            }, "json");
        }
    });
}
$(document).ready(function () {
    // 计算 标准分
    $("#PC-db-sasTRS, #PC-db-sdsTRS").on("focusout input", function () {
        $("#PC-db-sasSS, #PC-db-sdsSS").val(Math.round(parseInt($(this).val())*1.25));
    });

    // 引入 layui
    layui.use(["element", "laydate"], function () {
        let form = layui.form,
            laydate = layui.laydate,
            expectedDeliveryDate, birthday, poEvaluationDate = null, poEvaluationDateStamp = 0;

        // 预产期
        laydate.render({
            elem: "#PC-db-EDD",
            type: "date",
            format: "yyyy-MM-dd",
            max: 0,
            done: function(value, date) {
                if (value !== "") {
                    expectedDeliveryDate = date.year + "-" + date.month + "-" + date.date;
                    $.get("/perinatalPlatform/parentalPsychology/write/saveEDD?expectedDeliveryDate=" + expectedDeliveryDate, function (back ,status) {
                        if (status === "success") {
                            if (back.code) {
                                sequentialExecution(function () {
                                    $(".pc-db-saveEDD>span").fadeIn();
                                }, function () {
                                    setTimeout(function () {
                                        $(".pc-db-saveEDD>span").fadeOut("slow");
                                    }, 2000);
                                });
                            }
                        }
                    }, "json");
                }
            }
        });

        // 出生日期
        laydate.render({
            elem: "#PC-db-birthday",
            type: "date",
            format: "yyyy-MM-dd",
            max: 0,
            done: function(value, date) {
                if (value !== "") {
                    birthday = date.year + "-" + date.month + "-" + date.date;
                    $.get("/perinatalPlatform/parentalPsychology/write/saveBirthday?birthday=" + birthday, function (back ,status) {
                        if (status === "success") {
                            if (back.code) {
                                sequentialExecution(function () {
                                    $(".pc-db-saveBirthday>span").fadeIn();
                                }, function () {
                                    setTimeout(function () {
                                        $(".pc-db-saveBirthday>span").fadeOut("slow");
                                    }, 2000);
                                });
                            }
                        }
                    }, "json");
                }
            }
        });

        // 产前 评估日期
        laydate.render({
            elem: "#PC-db-prED",
            type: "date",
            format: "yyyy-MM-dd",
            max: 0
        });

        // 产后 评估日期
        laydate.render({
            elem: "#PC-db-poED",
            type: "date",
            format: "yyyy-MM-dd",
            max: 0,
            done: function (value, date) {
                if (value !== "") {
                    const birthday = $("#PC-db-birthday").val();
                    if (birthday !== null && birthday !== "") {
                        const birthdayStamp = Date.parse(birthday);
                        poEvaluationDate = date.year + "-" + date.month + "-" + date.date + ' ' + date.hours + ':' + date.minutes + ':' + date.seconds;
                        poEvaluationDateStamp = Date.parse(poEvaluationDate);
                        if (birthdayStamp > poEvaluationDateStamp) {
                            layer.msg("评估时间必须<span class='layui-badge'>晚于</span>出生日期！", {
                                icon: 5,
                                time: 3000,
                                anim: 6,
                                btn: "好",
                                resize: false,
                                shade: 0.8
                            }, function () {
                                $("#PC-db-poED").val("");
                            });
                        } else {
                            $("#PC-db-DAB").val(Math.round((poEvaluationDateStamp - birthdayStamp)/86400000));
                        }
                    }
                }
            }
        });

        // 父母心理库 产前心理 添加/编辑 EPDS评估 提交
        form.on("submit(savePrEpds)", function (data) {
            const doing = "保存信息";
            loading(doing);
            $.post("/perinatalPlatform/parentalPsychology/write/PR/EPDS/save", data.field, function (back, status) {
                if(status === "success") {
                    if(back.code) {
                        successMsg("保存信息成功！", function () {
                            location.reload();
                        });
                    }else {failMsg(doing)}
                }else {errorMsg1()}
            },"json").fail(function () {errorMsg2()});
        });

        // 父母心理库 产前心理 添加/编辑 SAS评估 提交
        form.on("submit(savePrSas)", function (data) {
            const doing = "保存信息";
            loading(doing);
            $.post("/perinatalPlatform/parentalPsychology/write/PR/SAS/save", data.field, function (back, status) {
                if(status === "success") {
                    if(back.code) {
                        successMsg(function () {
                            location.reload();
                        });
                    }else {failMsg(doing)}
                }else {errorMsg1()}
            },"json").fail(function () {errorMsg2()});
        });

        // 父母心理库 产前心理 添加/编辑 SDS评估 提交
        form.on("submit(savePrSds)", function (data) {
            const doing = "保存信息";
            loading(doing);
            $.post("/perinatalPlatform/parentalPsychology/write/PR/SDS/save", data.field, function (back, status) {
                if(status === "success") {
                    if(back.code) {
                        successMsg(function () {
                            location.reload();
                        });
                    }else {failMsg(doing)}
                }else {errorMsg1()}
            },"json").fail(function () {errorMsg2()});
        });

        // 父母心理库 产后心理 添加/编辑 EPDS评估 提交
        form.on("submit(savePoEpds)", function (data) {
            const doing = "保存信息";
            loading(doing);
            $.post("/perinatalPlatform/parentalPsychology/write/PO/EPDS/save", data.field, function (back, status) {
                if(status === "success") {
                    if(back.code) {
                        successMsg(function () {
                            location.reload();
                        });
                    }else {failMsg(doing)}
                }else {errorMsg1()}
            },"json").fail(function () {errorMsg2()});
        });

        // 父母心理库 产后心理 添加/编辑 SAS评估 提交
        form.on("submit(savePoSas)", function (data) {
            const doing = "保存信息";
            loading(doing);
            $.post("/perinatalPlatform/parentalPsychology/write/PO/SAS/save", data.field, function (back, status) {
                if(status === "success") {
                    if(back.code) {
                        successMsg(function () {
                            location.reload();
                        });
                    }else {failMsg(doing)}
                }else {errorMsg1()}
            },"json").fail(function () {errorMsg2()});
        });

        // 父母心理库 产后心理 添加/编辑 SDS评估 提交
        form.on("submit(savePoSds)", function (data) {
            const doing = "保存信息";
            loading(doing);
            $.post("/perinatalPlatform/parentalPsychology/write/PO/SDS/save", data.field, function (back, status) {
                if(status === "success") {
                    if(back.code) {
                        successMsg(function () {
                            location.reload();
                        });
                    }else {failMsg(doing)}
                }else {errorMsg1()}
            },"json").fail(function () {errorMsg2()});
        });

        // 父母心理库 审核 信息 提交
        form.on("submit(saveReview)", function (data) {
            const doing = "保存审核";
            loading(doing);
            $.post("/perinatalPlatform/parentalPsychology/review/post", data.field, function (back, status) {
                if(status === "success") {
                    if(back.code) {
                        successMsg("保存审核成功！", function () {
                            location.reload();
                        });
                    }else {failMsg(doing)}
                }else {errorMsg1()}
            },"json").fail(function () {errorMsg2()});
        });
    });
});