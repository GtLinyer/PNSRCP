$(document).ready(function() {
    let isVerCodeRight = false,
        tipHasClosed = true,
        lbInput = $(".pc-login-input"),
        checkVerCodeIcon = $(".pc-checkVerCode-icon"),
        verCodeImg = $("#PC-login-verCode-img"),
        verCode = $("#PC-login-verCode");

    // 输入框效果
    lbInput.after("<div class='pc-login-input-line'></div>");
    lbInput.on("focus", function () {
        $(this).prev().addClass("active");
        if($(this).hasClass("layui-form-danger")) {
            // 警告输入框时
            $(this).prev().css("color","#FF5722");
        }else {
            $(this).prev().css("color","#FAC2C2");
        }
    }).blur(function () {
        $(this).prev().css("color","");
        if(!$(this).val()) {
            $(this).prev().removeClass("active");
        }
    });

    // 换验证码
    verCodeImg.click(function () {
        $(this).attr("src", "/login/verCodeImg?d=" + new Date()*1);
    });

    // 实时校验码验证
    verCode.on("input keyup", function () {
        let inputVerCode = $(this).val();
        if (inputVerCode.length === 4) {
            $.post("/login/checkVerCode", "verCode=" + inputVerCode, function (back, status) {
                if (status === "success") {
                    if (back === true) {
                        checkVerCodeIcon.removeClass("layui-layer-ico2").addClass("layui-layer-ico1");
                        isVerCodeRight = true;
                    } else {
                        checkVerCodeIcon.removeClass("layui-layer-ico1").addClass("layui-layer-ico2");
                    }
                }
            }, "json");
        }else{
            checkVerCodeIcon.removeClass("layui-layer-ico1").addClass("layui-layer-ico layui-layer-ico2");
        }
    });

    // 密码框密码可见隐藏
    $(".pc-login-pwd .pc-login-eye").click(function () {
        if($(this).hasClass("icon-eye")){
            $(this).removeClass("icon-eye").addClass("icon-eye-slash");
            $(this).parent().children("input").prop("type","text");
        }else{
            $(this).removeClass("icon-eye-slash").addClass("icon-eye");
            $(this).parent().children("input").prop("type","password");
        }
    });

    // layui组件
    layui.use(["form", "layer"], function() {
        let layer = layui.layer,
            form = layui.form;

        let windowWidth = $(window).width();
        // 提示框
        verCode.on("focus", function () {
            if(tipHasClosed && windowWidth > 992) {
                layer.tips("看不清？点击图片刷新！", "#PC-login-verCode-img", {
                    tips: [2, "#FAC2C2"],
                    success: function () {
                        tipHasClosed = false;
                    },
                    end: function () {
                        tipHasClosed = true;
                    }
                });
            }
        });
        verCodeImg.hover(function () {
            if(tipHasClosed && windowWidth > 992) {
                layer.tips("看不清？点击图片刷新！", "#PC-login-verCode-img", {
                    tips: [2, "#FAC2C2"],
                    success: function () {
                        tipHasClosed = false;
                    },
                    end: function () {
                        tipHasClosed = true;
                    }
                });
            }
        },function () {
            layer.closeAll("tips");
        });

        // 登录表单提交
        form.on("submit(login)", function(data){
            // 确认验证码正确
            if(isVerCodeRight) {
                loading("登录");

                // 向后台提交登录数据
                $.post("/login/post",data.field,function (back, status) {
                    if(status === "success") {
                        if(back.code) {
                            window.location.href = "/main";
                        }else {
                            errorMsg(back.errorMsg);
                        }
                    }else {errorMsg1()}
                },"json").fail(function () {errorMsg2()});
            }else {
                errorMsg("验证码错误！");
                verCodeImg.click();
            }
        });
    });
});