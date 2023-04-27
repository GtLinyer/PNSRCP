// 计算 最低体温(时间)、恢复正常时体温(时间)
function computeBodyTemp(bodyTemperature) {
    let minBodyTemperature = 99, minBodyTemperatureTime, returnsNormalBodyTemperature, bodyTemperatureReturnsNormalTime;
    if (notNullTool(bodyTemperature[0]) && notNullTool(bodyTemperature[1]) && notNullTool(bodyTemperature[2]) && notNullTool(bodyTemperature[3])) {
        let isLow = 0;
        for (let i = 0; i < 4; i ++) {
            if (bodyTemperature[i] < minBodyTemperature) {
                minBodyTemperature = bodyTemperature[i];
                minBodyTemperatureTime = (i + 1) * 30;
                if (bodyTemperature[i] < 36.5) {
                    isLow = 1;
                }
            } else {
                if (isLow && bodyTemperature[i] >= 36.5) {
                    returnsNormalBodyTemperature = bodyTemperature[i];
                    bodyTemperatureReturnsNormalTime = (i + 1) * 30;
                }
            }
        }
        // 最低体温时间
        $("#PC-db-MBTT").val(minBodyTemperatureTime);
        // 最低体温
        $("#PC-db-MBT").val(minBodyTemperature);
        // 体温恢复正常≥36.5℃时间
        $("#PC-db-BTRNT").val(bodyTemperatureReturnsNormalTime);
        // 恢复正常时体温
        $("#PC-db-RNBT").val(returnsNormalBodyTemperature);
    }
}
$(document).ready(function () {
    // 研究数据库 低体温QI 计算 最低体温时间
    let bodyTemperature = [];
    const aeb30mbtElem = $("#PC-db-AEB30MBT"),
        aeb60mbtElem = $("#PC-db-AEB60MBT"),
        aeb90mbtElem = $("#PC-db-AEB90MBT"),
        aeb120mbtElem = $("#PC-db-AEB120MBT");
    if (notNullTool($(aeb30mbtElem).val())) {
        bodyTemperature[0] = parseFloat($(aeb30mbtElem).val())
    }
    $(aeb30mbtElem).on("focusout", function () {
        if (notNullTool($(this).val())) {
            bodyTemperature[0] = parseFloat($(this).val());
            computeBodyTemp(bodyTemperature);
        }
    });
    if (notNullTool($(aeb60mbtElem).val())) {
        bodyTemperature[1] = parseFloat($(aeb60mbtElem).val())
    }
    $(aeb60mbtElem).on("focusout", function () {
        if (notNullTool($(this).val())) {
            bodyTemperature[1] = parseFloat($(this).val());
            computeBodyTemp(bodyTemperature);
        }
    });
    if (notNullTool($(aeb90mbtElem).val())) {
        bodyTemperature[2] = parseFloat($(aeb90mbtElem).val())
    }
    $(aeb90mbtElem).on("focusout", function () {
        if (notNullTool($(this).val())) {
            bodyTemperature[2] = parseFloat($(this).val());
            computeBodyTemp(bodyTemperature);
        }
    });
    if (notNullTool($(aeb120mbtElem).val())) {
        bodyTemperature[3] = parseFloat($(aeb120mbtElem).val())
    }
    $(aeb120mbtElem).on("focusout", function () {
        if (notNullTool($(this).val())) {
            bodyTemperature[3] = parseFloat($(this).val());
            computeBodyTemp(bodyTemperature);
        }
    });

    // 引入 layui
    layui.use(["element", "form", "layer"], function () {
        let form = layui.form,
            layer = layui.layer;

        if ($(".pc-db-RDHQI").length > 0) {
            // 研究数据库 低体温QI 获取 出生时间、入室时间
            const birthdayInput = $("#PC-db-birthday").val(),
                newbornEnterRoomDateInput = $("#PC-db-NBERD").val();
            if (notNullTool(birthdayInput) && notNullTool(newbornEnterRoomDateInput)) {
                // 研究数据库 低体温QI 计算 入室时龄、生后10min时间
                const birthdayStamp = Date.parse(birthdayInput),
                    newbornEnterRoomDateStamp = Date.parse(newbornEnterRoomDateInput),
                    newbornEnterRoomTimeAge = Math.floor((newbornEnterRoomDateStamp - birthdayStamp) / 60000),
                    afterBirth10MinTimeStamp = Math.floor(birthdayStamp + 600000);
                // 入室时龄
                $("#PC-db-NBERTA").val(newbornEnterRoomTimeAge);
                // 生后10min时间
                $("#PC-db-AB10MT").val(dateFormat(afterBirth10MinTimeStamp))
            } else {
                layer.msg("请先完善 患儿入室日期！", {
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

            // 研究数据库 低体温QI 添加/编辑 信息 提交
            form.on("submit(HQI)", function (data) {
                const doing = "保存信息";
                loading(doing);
                let field = data.field;
                for (let i in field) {
                    if (!notNullTool(field[i])) {
                        delete field[i];
                    }
                }
                $.post("/perinatalPlatform/researchDatabase/write/HQI/post", field, function (back, status) {
                    if (status === "success") {
                        if (back.code) {
                            successNext();
                        } else {failMsg(doing)}
                    } else {errorMsg1()}
                }, "json").fail(function () {errorMsg2()});
            });
        }

        // 研究数据库 审核 信息 提交
        form.on("submit(saveReview)", function (data) {
            const doing = "保存审核";
            loading(doing);
            $.post("/perinatalPlatform/researchDatabase/review/post", data.field, function (back, status) {
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