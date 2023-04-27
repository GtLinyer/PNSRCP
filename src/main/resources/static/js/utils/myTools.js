// 自定义弹出层
function successMsg(msg, afterDo) {
    layer.msg(msg,{
        icon: 1,
        time: 3000,
        anim: 1,
        btn: "好!",
        resize: false,
        shade: 0.8
    }, afterDo);
}
function successNext() {
    layer.msg("保存信息成功！<br>如全部填写完成，请点击 <span class='layui-badge layui-bg-green'>填写完成</span>！",{
        icon: 1,
        time: 0,
        anim: 1,
        btn: ["下一步", "刷新页面", "填写完成"],
        resize: false,
        shade: 0.8,
        yes: function () {
            let nextUrl = $(".layui-body>.pc-body-framework>.layui-breadcrumb>a[href='#']+span+a").attr("href");
            if (notNullTool(nextUrl)) {
                window.location.href = nextUrl;
            } else {
                nextUrl = $(".pc-side-menu .layui-nav>.layui-nav-itemed dd.layui-this+dd>a").attr("href");
                if (notNullTool(nextUrl)) {
                    window.location.href = nextUrl;
                } else {
                    window.location.reload();
                }
            }
        },
        btn2: function(){
            window.location.reload();
        },
        btn3: function () {
            $.get("/perinatalPlatform/caseCompleted", function (back, status) {
                if (status === "success") {
                    if (back.code) {
                        successBack();
                    }
                }
            }, "json");
        }
    });
}
function successBack() {
    layer.msg("此病历已成功设置为 <span class='layui-badge layui-bg-green'>填写完成</span>！",{
        icon: 1,
        time: 0,
        anim: 1,
        btn: ["回到病历查询", "取消"],
        resize: false,
        shade: 0.8,
        yes: function () {
            window.location.href = "/perinatalPlatform/case";
        }
    });
}
function hbSuccessNext(afterDo) {
    layer.msg("保存信息成功！<br>如全部填写完成，请点击 <span class='layui-badge layui-bg-green'>填写完成</span>！",{
        icon: 1,
        time: 0,
        anim: 1,
        btn: ["下一步", "刷新页面", "填写完成"],
        resize: false,
        shade: 0.8,
        yes: afterDo,
        btn2: function(){
            window.location.reload();
        },
        btn3: function () {
            $.get("/perinatalPlatform/highBilirubin/caseCompleted", function (back, status) {
                if (status === "success") {
                    if (back.code) {
                        hbSuccessBack();
                    }
                }
            }, "json");
        }
    });
}
function hbSuccessBack() {
    layer.msg("此病历已成功设置为 <span class='layui-badge layui-bg-green'>填写完成</span>！",{
        icon: 1,
        time: 0,
        anim: 1,
        btn: ["回到病历查询", "取消"],
        resize: false,
        shade: 0.8,
        yes: function () {
            window.location.href = "/perinatalPlatform/highBilirubin/case";
        }
    });
}
function errorMsg(msg) {
    layer.msg(msg,{
        icon: 2,
        time: 3000,
        anim: 6,
        btn: "好!",
        resize: false,
        shade: 0.8
    });
}
function failMsg(doing) {
    layer.msg(doing + "失败！",{
        icon: 2,
        time: 3000,
        anim: 6,
        btn: "了解！",
        resize: false,
        shade: 0.8
    });
}
function errorMsg1() {
    const time = new Date(),
        timeFa = dateFormat(time),
        pathname = window.location.pathname;
    layer.msg("服务器错误，请求提交失败，<br/>发生路径：" + pathname + "<br/>发生时间：" + timeFa + "<br/>请将发生路径及发生时间告知管理员。",{
        icon: 2,
        time: 3000,
        anim: 6,
        btn: "了解！",
        resize: false,
        shade: 0.8
    });
}
function errorMsg2() {
    const time = new Date(),
        timeFa = dateFormat(time),
        pathname = window.location.pathname;
    layer.msg("发生了错误，请求提交失败，<br/>发生路径：" + pathname + "<br/>发生时间：" + timeFa + "<br/>请将发生路径及发生时间告知管理员。",{
        icon: 2,
        time: 3000,
        anim: 6,
        btn: "了解！",
        resize: false,
        shade: 0.8
    });
}
function alertMsg(msg) {
    layer.msg(msg,{
        icon: 7,
        time: 3000,
        anim: 6,
        btn: "了解！",
        resize: false,
        shade: 0.8
    });
}
function loading(doing) {
    layer.msg("<img src='/utils/layui/css/modules/layer/default/loading-0.gif' alt='loading'/><p>&emsp;" + doing + "中...</p>",{
        time: 0,
        closeBtn: false,
        shade: 0.8,
        resize: false
    });
}
function notNullTool(value) {
    return value !== null && value !== "" && value !== undefined;
}
function hasOrEmpty(value) {
    if (value !== null && value !== undefined) {
        return value;
    } else {
        return "";
    }
}
// 点击复制功能
function copyTool(str) {
    str.select();
    let state;
    try {
        state = document.execCommand("copy");
    }catch(str) {
        state = false;
    }
    if(state){
        layer.msg("复制成功", {
            time: 1000,
            shadeClose: true,
            icon: 1,
            shade: 0.8
        });
    }else{
        layer.msg("复制失败", {
            time: 1000,
            shadeClose: true,
            icon: 2,
            shade: 0.8
        });
    }
}
// 递归延时
function myDelay(isOK, doing) {
    setTimeout(function () {
        if(isOK()) {
            doing();
        }else {
            myDelay(isOK, doing);
        }
    },100);
}
// 顺序执行
function sequentialExecution(first, second, third, fourth, fifth, sixth, seventh, eighth, ninth, tenth) {
    first();
    try {
        second();
        third();
        fourth();
        fifth();
        sixth();
        seventh();
        eighth();
        ninth();
        tenth();
    } catch (e) {}
}