$(document).ready(function () {
    // 计算 平均动脉压=[收缩压+(舒张压*2)]/3
    let systolicBloodPressure = 0, diastolicBloodPressure = 0;
    $("#PC-db-SBP").on("focusout input", function () {  // 收缩压
        if ($(this).val() !== null && $(this).val() !== "") {
            systolicBloodPressure = parseInt($(this).val());
            console.log("systolicBloodPressure=" + systolicBloodPressure);
            if (diastolicBloodPressure > 0) {
                $("#PC-db-MAP").val(Math.round((systolicBloodPressure + diastolicBloodPressure*2)/3));
            }
        }
    });
    $("#PC-db-DBP").on("focusout input", function () {  // 舒张压
        if ($(this).val() !== null && $(this).val() !== "") {
            diastolicBloodPressure = parseInt($(this).val());
           if (systolicBloodPressure > 0) {
                $("#PC-db-MAP").val(Math.round((systolicBloodPressure + diastolicBloodPressure*2)/3));
            }
        }
    });

    // 引入 layui
    layui.use(["element", "laydate", "form"], function () {
        let form = layui.form,
            laydate = layui.laydate,
            measuringTime = null, measuringTimeStamp = 0;

        // 计算 测量时间是 生后多久
        const birthday = $("#PC-db-measuringTime").attr("data-birthday");
        let birthdayStamp = 0;
        if (birthday !== null && birthday !== "" && birthday !== undefined) {
            birthdayStamp = Date.parse(birthday);
        }
        laydate.render({
            elem: "#PC-db-measuringTime",
            type: "datetime",
            format: "yyyy-MM-dd HH:mm:ss",
            max: 1,
            done: function(value, date) {
                if(value !== "") {
                    measuringTime = date.year + "-" + date.month + "-" + date.date + ' ' + date.hours + ':' + date.minutes + ':' + date.seconds;
                    measuringTimeStamp = Date.parse(measuringTime);
                    if (birthdayStamp > 0) {
                        if (measuringTimeStamp  > birthdayStamp) {
                            $("#PC-db-MTAB").val(Math.round((measuringTimeStamp - birthdayStamp) / 3600000));
                        } else {
                            layer.msg("测量时间必须<span class='layui-badge'>晚于</span>出生时间！", {
                                icon: 5,
                                time: 3000,
                                anim: 6,
                                btn: "好",
                                resize: false,
                                shade: 0.8
                            }, function () {
                                $("#PC-db-measuringTime").val("");
                            });
                        }
                    } else {
                        layer.msg("请先填写出生日期，否则无法自动计算生后时间！", {
                            icon: 5,
                            time: 3000,
                            anim: 6,
                            btn: "好",
                            resize: false,
                            shade: 0.8
                        });
                    }
                }
            }
        });

        // 心超 开关 后面的输入框
        form.on("switch(HUE)", function (data) {
            if (data.elem.checked) {
                $("#PC-db-HUET, #PC-db-HUER").removeAttr("disabled").attr("lay-verify", "requiredDB").attr("name", function () {
                    return $(this).attr("data-name");
                })
            } else {
                $("#PC-db-HUET, #PC-db-HUER").removeAttr("lay-verify name").attr("disabled", true).val("");
            }
        });

        // 心超 检查时间
        laydate.render({
            elem: "#PC-db-HUET",
            type: "datetime",
            format: "yyyy-MM-dd HH:mm:ss",
            max: 1,
        });

        // 母婴同室库 血氧监测 添加/编辑 信息 提交
        form.on("submit(BOM)", function (data) {
            const doing = "保存信息";
            loading(doing);
            $.post("/perinatalPlatform/motherBabySameRoom/write/BOM/post", data.field, function (back, status) {
                if(status === "success") {
                    if(back.code) {
                        successNext();
                    }else {failMsg(doing)}
                }else {errorMsg1()}
            },"json").fail(function () {errorMsg2()});
        });

        // 母婴同室库 审核 信息 提交
        form.on("submit(saveReview)", function (data) {
            const doing = "保存审核";
            loading(doing);
            $.post("/perinatalPlatform/motherBabySameRoom/review/post", data.field, function (back, status) {
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