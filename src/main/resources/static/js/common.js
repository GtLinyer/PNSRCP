let layer; // 弹出层全局变量
// let e = "%c",
//     n = "background:linear-gradient(to right,#FFB7C5,#FF5733);padding:10px;font-weight:bolder;font-size:28px;border-radius:0 25px 0 25px;";
// console.info(e + "围产新生儿科研合作平台", n);
// console.info("围产新生儿科研合作平台 PNSRCP 版权所有！");
// function t() {
//     const r = "V",
//         n = "5",
//         e = "8";
//
//     function o(r) {
//         if (!r) return "";
//         for (var t = "", n = 44106, e = 0; e < r.length; e++) {
//             let o = r.charCodeAt(e) ^ n;
//             n = n * e % 256 + 2333, t += String.fromCharCode(o);
//         }
//         return t;
//     }
//     try {
//         const a = ["r", o("갯"), "g", o("갭"), function (t) {
//             if (!t) return "";
//             for (var o = "", a = r + n + e + "7", c = 45860, f = 0; f < t.length; f++) {
//                 let i = t.charCodeAt(f);
//                 c = (c + 1) % a.length, i ^= a.charCodeAt(c), o += String.fromCharCode(i);
//             }
//             return o;
//         }("@"), "b", "e", "d"].reverse().join("");
//         ! function c(r) {
//             (1 !== ("" + r / r).length || 0 === r) && function () {}.constructor(a)(), c(++r)
//         }(0)
//     } catch (a) {
//         setTimeout(t, 50);
//     }
// }
// ((function() {
//     var callbacks = [],
//         timeLimit = 50,
//         open = false;
//     setInterval(loop, 1);
//     return {
//         addListener: function(fn) {
//             callbacks.push(fn);
//         },
//         cancleListenr: function(fn) {
//             callbacks = callbacks.filter(function(v) {
//                 return v !== fn;
//             });
//         }
//     };
//     function loop() {
//         var startTime = new Date();
//         debugger;
//         if (new Date() - startTime > timeLimit) {
//             if (!open) {
//                 callbacks.forEach(function(fn) {
//                     fn.call(null);
//                 });
//             }
//             open = true;
//             document.body.innerHTML = "";
//         } else {
//             open = false;
//         }
//     }
// })()).addListener(function() {
//     window.location.href = "/favicon.svg";
// });
// document.onkeydown = function () {
//     const e = window.event || arguments[0];
//     // 屏蔽F12
//     if (e.keyCode === 123) {
//         return false;
//         // 屏蔽Ctrl+Shift+I
//     } else if ((e.ctrlKey) && (e.shiftKey) && (e.keyCode === 73)) {
//         return false;
//         // 屏蔽Shift+F10
//     } else if ((e.shiftKey) && (e.keyCode === 121)) {
//         return false;
//         // 屏蔽Ctrl+S
//     } else if ((e.ctrlKey) && (e.keyCode === 83)) {
//         return false;
//     }
// };
// t();
// 日期格式化
function dateFormat(time) {
    const datetime = new Date();
    datetime.setTime(time);
    const year = datetime.getFullYear(),
        month = datetime.getMonth() + 1 < 10 ? "0" + (datetime.getMonth() + 1) : datetime.getMonth() + 1,
        date = datetime.getDate() < 10 ? "0" + datetime.getDate() : datetime.getDate(),
        hour = datetime.getHours() < 10 ? "0" + datetime.getHours() : datetime.getHours(),
        minute = datetime.getMinutes() < 10 ? "0" + datetime.getMinutes() : datetime.getMinutes(),
        second = datetime.getSeconds() < 10 ? "0" + datetime.getSeconds() : datetime.getSeconds();
    return year + "-" + month + "-" + date + " " + hour + ":" + minute + ":" + second;
}
function dateFormatDay(time) {
    const datetime = new Date();
    datetime.setTime(time);
    const year = datetime.getFullYear(),
        month = datetime.getMonth() + 1 < 10 ? "0" + (datetime.getMonth() + 1) : datetime.getMonth() + 1,
        date = datetime.getDate() < 10 ? "0" + datetime.getDate() : datetime.getDate();
    return year + "-" + month + "-" + date;
}
function dateFormatMin(time) {
    const datetime = new Date();
    datetime.setTime(time);
    const year = datetime.getFullYear(),
        month = datetime.getMonth() + 1 < 10 ? "0" + (datetime.getMonth() + 1) : datetime.getMonth() + 1,
        date = datetime.getDate() < 10 ? "0" + datetime.getDate() : datetime.getDate(),
        hour = datetime.getHours() < 10 ? "0" + datetime.getHours() : datetime.getHours(),
        minute = datetime.getMinutes() < 10 ? "0" + datetime.getMinutes() : datetime.getMinutes();
    return year + "-" + month + "-" + date + " " + hour + ":" + minute;
}
function modifyPwd() {
    layer.open({
        title: "<i class='iconfont icon-mima'></i> 修改密码",
        type: 1,
        shade: 0.8,
        tipsMore: true,
        content:
            "<div class='pc-layer-panel' style='display: block'>" +
            "   <form class='layui-form'>" +
            "       <div class='layui-form-item'>" +
            "           <label class='layui-form-label'>原密码</label>" +
            "           <div class='layui-input-block'>" +
            "               <input class='layui-input' type='password' name='oldPwd' placeholder='请输入原密码' lay-filter='required' required>" +
            "           </div>" +
            "       </div>" +
            "       <div class='layui-form-item'>" +
            "           <label class='layui-form-label'>新密码</label>" +
            "           <div class='layui-input-block'>" +
            "               <input class='layui-input' type='password' name='newPwd' placeholder='请输入新密码' lay-filter='required' required>" +
            "           </div>" +
            "       </div>" +
            "       <div class='layui-form-item'>" +
            "           <label class='layui-form-label'>确认新密码</label>" +
            "           <div class='layui-input-block'>" +
            "               <input class='layui-input' type='password' name='reNewPwd' placeholder='请再次输入新密码' lay-filter='required' required>" +
            "           </div>" +
            "       </div>" +
            "       <div class='layui-form-item'>" +
            "           <div class='layui-input-block'>" +
            "               <button class='pc-btn pc-btn-save' type='submit' lay-filter='cgPwd' lay-submit>提交</button>" +
            "           </div>" +
            "       </div>" +
            "   </form>" +
            "</div>",
        resize: false
    });
}
// 单选框 激活选项
function activeRBGChoice(thisElem) {
    let inputElem = $(thisElem).parent().parent().find("input[type=hidden]");
    if ($(thisElem).hasClass("pc-db-active")) {
        $(thisElem).removeClass("pc-db-active");
        $(inputElem).val("");
    } else {
        $(thisElem).siblings().removeClass("pc-db-active");
        $(thisElem).addClass("pc-db-active");
        if (inputElem.length > 0) {
            $(inputElem).val($(thisElem).attr("data-value"));
        } else {
            $(thisElem).parent().parent().find("input").val($(thisElem).attr("data-value"));
        }
    }
}
// 是否 显示 单选按钮组
function isRbgShowInRbg(thisElem, rbgElem, isShow) {
    const hasActive = $(thisElem).hasClass("pc-db-active"),
        input = $(rbgElem).children("input"),
        rbg = $(rbgElem).children(".pc-db-radioBtn-group"),
        rbgLi = $(rbgElem).children(".pc-db-radioBtn-group").children("li");
    if (hasActive) {
        if (isShow()) {
            $(input).attr("lay-verify", "requiredRadioGroup").attr("name", function () {
                return $(this).attr("data-name");
            });
            $(rbg).removeClass("rbgOff");
            $(rbgLi).on("click", function () {
                activeRBGChoice(this);
            });
        } else {
            $(input).removeAttr("name lay-verify").val("");
            $(rbg).addClass("rbgOff");
            $(rbgLi).removeAttr("class").off("click");
        }
    } else {
        $(input).removeAttr("name lay-verify").val("");
        $(rbg).addClass("rbgOff");
        $(rbgLi).removeAttr("class").off("click");
    }
}
// 添加审核
function addReview() {
    $("#PC-db-addReview>form")[0].reset();
    $("#PC-db-addReview .pc-db-item>.pc-db-radioBtn-group>li").removeAttr("class");
    let area = "500px";
    if ($(window).width() < 768) {
        area = "90%";
    }
    layer.open({
        title: "<i class='iconfont icon-shenhe'></i> 病例审核",
        type: 1,
        shade: 0.8,
        area: area,
        content: $("#PC-db-addReview"),
        resize: false
    });
}
// DOM准备完成
$(document).ready(function() {
    // let inputElem;
    // $(document).contextmenu(function(e){
    //     $(".pc-right-menu").remove();
    //     e.preventDefault();
    //     $("body").append("<div class='pc-right-menu' style='left:" + e.pageX + "px;top:" + e.pageY + "px'><ul><li><i class='iconfont icon-shuaxin'></i><p>刷新</p><p>Ctrl+R</p></li>" +
    //         "</li><li><i class='iconfont icon-ai-copy'></i><p>复制</p><p>Ctrl+C</p></li><li><i class='iconfont icon-jianqie'></i><p>剪切</p><p>Ctrl+X</p></li>" +
    //         "<li><i class='iconfont icon-niantie'></i><p>粘贴</p><p>Ctrl+V</p></li></ul></div>");
    //     if ($(e.target).is("input")) {
    //         inputElem = e.target;
    //     }
    // });
    // document.onmousedown = function(e){
    //     if(e.button === 0) {
    //         let flag = 0, menuFlag;
    //         for (const i in e.path) {
    //             if($(e.path[i]).hasClass("pc-right-menu")) {
    //                 flag = 1;
    //                 menuFlag = i;
    //             }
    //         }
    //         if (flag === 1) {
    //             const liNum = $(e.path[menuFlag - 2]).prevAll().length;
    //             if (liNum === 0) {
    //                 location.reload();
    //             } else if (liNum === 1) {
    //                 document.execCommand("copy");
    //             } else if (liNum === 2) {
    //                 document.execCommand("cut");
    //             } else if (liNum === 3) {
    //                 navigator.clipboard.readText().then(clipText => {
    //                     if ($(inputElem).attr("readonly") === undefined) {
    //                         $(inputElem).val(clipText);
    //                     }
    //                 });
    //             }
    //             $(".pc-right-menu").remove();
    //         } else {
    //             inputElem = null;
    //             $(".pc-right-menu").remove();
    //         }
    //     } else if (e.button === 1) {
    //         $(".pc-right-menu").remove();
    //         inputElem = null;
    //     }
    // };
    // 获取窗口宽度
    let winWith = $(window).width();

    // 单选 按钮组
    $(".pc-db-radioBtn-group>li").on("click", function () {
        let inputElem = $(this).parent().parent().find("input[type=hidden]");
        if ($(this).hasClass("pc-db-active")) {
            $(this).removeClass("pc-db-active");
            $(inputElem).val("");
        } else {
            $(this).siblings().removeClass("pc-db-active");
            $(this).addClass("pc-db-active");
            if (inputElem.length > 0) {
                $(inputElem).val($(this).attr("data-value"));
            } else {
                $(this).parent().parent().find("input").val($(this).attr("data-value"));
            }
        }
    });
    // 单选 按钮组 禁止 点按
    $(".pc-db-radioBtn-group.rbgOff>li").off("click");

    // 移除 单选按钮组 的必填指示色
    const rbg = $(".pc-db-radioBtn-group");
    // 单选按钮组 形态
    for (let i = 0; i < rbg.length; i++) {
        if ($(rbg[i]).height() > 54) {
            $(rbg[i]).addClass("sm");
        } else {
            $(rbg[i]).removeClass("sm");
        }
    }

    // 设置 审核 多行文本输入框 高度
    $(".pc-db-textarea").parent(".pc-db-item").height(53.6);
    $("#PC-db-problem").on("mousedown mousemove", function () {
        $(this).parents(".pc-db-item").height(function () {
            return $("#PC-db-problem").height() + 20;
        });
    });

    // 点击label实现switch开关
    $(".pc-switch-label").on("click", function () {
        $(this).nextAll(".layui-form-switch").click();
    });
    $(".pc-table-switch-label").on("click", function () {
        $(this).parent("td").next("td").children(".layui-form-switch").click();
    });

    // 引入 layui
    layui.use(["element", "layer", "form"], function() {
        let form = layui.form;
        layer = layui.layer;

        // 侧边导航伸缩
        const flexible = $("#PC-side-flexible i"),
            main = $("#PC-main"),
            shade = $("#PC-shade");
        let hasShrink, hasSpread;

        // 对按钮方向初始化 - 针对移动模式
        if (winWith < 992) {
            flexible.addClass("layui-icon-spread-left").removeClass("layui-icon-shrink-right");
        }

        // 监听窗口变化
        $(window).resize(function () {
            winWith = $(window).width();
            // 变为移动模式
            if (winWith < 992) {
                hasShrink = main.hasClass("pc-side-shrink");
                if (hasShrink) {
                    main.removeClass("pc-side-shrink");
                } else {
                    flexible.addClass("layui-icon-spread-left").removeClass("layui-icon-shrink-right");
                }
            } else {
                // 变为桌面模式
                flexible.addClass("layui-icon-shrink-right").removeClass("layui-icon-spread-left");
                hasSpread = main.hasClass("pc-side-spread-sm");
                if (hasSpread) {
                    main.removeClass("pc-side-spread-sm");
                    shade.removeClass("pc-body-shade");
                }
            }
        });

        // 伸缩按钮监听 - 侧边导航伸缩
        $("#PC-side-flexible").click(function () {
            if (winWith > 992) {
                // 针对桌面模式
                hasShrink = main.hasClass("pc-side-shrink");
                if (hasShrink) {
                    main.removeClass("pc-side-shrink");
                    flexible.addClass("layui-icon-shrink-right").removeClass("layui-icon-spread-left");
                } else {
                    main.addClass("pc-side-shrink");
                    flexible.addClass("layui-icon-spread-left").removeClass("layui-icon-shrink-right");
                }
            } else {
                // 针对移动模式
                hasSpread = main.hasClass("pc-side-spread-sm");
                if (!hasSpread) {
                    main.addClass("pc-side-spread-sm");
                    shade.addClass("pc-body-shade");
                    flexible.addClass("layui-icon-shrink-right").removeClass("layui-icon-spread-left");
                }
            }
        });

        // 点击侧边导航 - 侧边导航展开
        const item = $(".pc-item");
        item.click(function () {
            // 针对桌面模式
            if (winWith > 992) {
                hasShrink = main.hasClass("pc-side-shrink");
                if (hasShrink) {
                    main.removeClass("pc-side-shrink");
                    flexible.addClass("layui-icon-shrink-right").removeClass("layui-icon-spread-left");
                }
            }
        });

        // 展开侧边导航遮罩 - 移动模式
        shade.click(function () {
            main.removeClass("pc-side-spread-sm");
            $(this).removeClass("pc-body-shade");
            flexible.addClass("layui-icon-spread-left").removeClass("layui-icon-shrink-right");
        });

        // 全屏
        const fullscreen = $("#PC-fullscreen i");
        const getBody = document.body
            , getDoc = document;

        $("#PC-fullscreen").click(function () {
            if (fullscreen.hasClass("layui-icon-screen-full")) {
                if (getBody.webkitRequestFullScreen) {
                    getBody.webkitRequestFullScreen();
                } else if (getBody.mozRequestFullScreen) {
                    getBody.mozRequestFullScreen();
                } else if (getBody.requestFullScreen) {
                    getBody.requestFullscreen();
                }
                fullscreen.addClass("layui-icon-screen-restore").removeClass("layui-icon-screen-full");
            } else {
                if (getDoc.webkitCancelFullScreen) {
                    getDoc.webkitCancelFullScreen();
                } else if (getDoc.mozCancelFullScreen) {
                    getDoc.mozCancelFullScreen();
                } else if (getDoc.cancelFullScreen) {
                    getDoc.cancelFullScreen();
                } else if (getDoc.exitFullscreen) {
                    getDoc.exitFullscreen();
                }
                fullscreen.addClass("layui-icon-screen-full").removeClass("layui-icon-screen-restore");
            }
        });

        // 提交 修改 密码
        form.on("submit(cgPwd)", function (data) {
            let field = data.field;
            if (field.newPwd === field.reNewPwd) {
                $.post("/changePwd", field, function (back, status) {
                    if (status === "success") {
                        if (back.code) {
                            successMsg("修改密码成功！<br/>下次登录时生效。", function () {
                                layer.closeAll();
                            })
                        } else {errorMsg(back.errorMsg)}
                    } else {errorMsg1()}
                }, "json").fail(function () {errorMsg2()});
            } else {
                errorMsg("两次输入新密码不一致！");
            }
            return false;
        });

        // 必填检测
        form.verify({
            requiredDB: function (value, item) {
                if (value === "") {
                    return "请填写" + $(item).prev().html() + "！";
                } else if ($(item).attr("type") === "number") {
                    if (parseFloat(value).toString() === "NaN") {
                        return "不是一个数值！";
                    } else {
                        const regPos = /^\d+(\.\d+)?$/,
                            regNeg = /^(-(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*)))$/;
                        if(!regPos.test(value) && !regNeg.test(value)){
                            return "不是合法的数值！";
                        }
                    }
                }
            },
            requiredRadioGroup: function (value, item) {
                if (value === "") {
                    $(item).next().children().addClass("pc-form-danger-hover pc-form-danger-btn-focus");
                    $(item).next().find("button").focus();
                    let labelName;
                    if ($(item).prev().html() !== undefined) {
                        labelName = $(item).prev().html();
                    } else {
                        labelName = $(item).attr("title");
                    }
                    return "请选择" + labelName + "！";
                }
            },
            requiredCG: function (value, item) {
                if (!$(item).find(".layui-form-radio").hasClass("layui-form-radioed")) {
                    $(item).focus();
                    return "请选择" + $(item).attr("data-title") + "！";
                } else {
                    if ($(item).find(".layui-form-radioed").find("div").html() === "") {
                        if (!$(item).find(".layui-form-checkbox").hasClass("layui-form-checked")) {
                            $(item).focus();
                            return "请选择" + $(item).attr("data-title") + "非正常原因！";
                        }
                    }
                }
            }
        });
    });

    // 日期选择 在移动端 居中
    $(".pc-date").focus(function () {
        if (winWith < 548) {
            myDelay(function () {
                return $(".layui-laydate").length > 0;
            }, function () {
                $(".layui-laydate").css("left", (winWith - 283)/2 + "px");
            });
        }
    });
});