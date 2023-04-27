$(document).ready(function () {
    // 脑室出血 开关
    $("#PC-db-VH>.pc-db-radioBtn-group>li").on("click", function () {
        const value = $(this).attr("data-value"),
            hasActive = $(this).hasClass("pc-db-active");
        if (hasActive) {
            if (value === "无") {
                $("#PC-db-VHDD").removeAttr("name lay-verify").attr("disabled", true).val("");
            } else {
                $("#PC-db-VHDD").removeAttr("disabled").attr("lay-verify", "requiredDB").attr("name", function () {
                    return $(this).attr("data-name");
                });
            }
        } else {
            $("#PC-db-VHDD").removeAttr("name lay-verify").attr("disabled", true).val("");
        }
    });

    // 脑室周围白质软化 开关
    $("#PC-db-PWMS>.pc-db-radioBtn-group>li").on("click", function () {
        const value = $(this).attr("data-value"),
            hasActive = $(this).hasClass("pc-db-active");
        if (hasActive) {
            if (value === "无") {
                $("#PC-db-PWMSDD").removeAttr("name lay-verify").attr("disabled", true).val("");
            } else {
                $("#PC-db-PWMSDD").removeAttr("disabled").attr("lay-verify", "requiredDB").attr("name", function () {
                    return $(this).attr("data-name");
                });
            }
        } else {
            $("#PC-db-PWMSDD").removeAttr("name lay-verify").attr("disabled", true).val("");
        }
    });

    // 引入 layui
    layui.use(["element", "form", "laydate", "layer", "upload"], function () {
        let form = layui.form,
            laydate = layui.laydate,
            layer = layui.layer,
            upload = layui.upload;

        // 脑室出血 诊断日期
        laydate.render({
            elem: "#PC-db-VHDD",
            type: "date",
            format: "yyyy-MM-dd",
            max: 0
        });

        // 其他脑出血 诊断日期
        laydate.render({
            elem: "#PC-db-OCHDD",
            type: "date",
            format: "yyyy-MM-dd",
            max: 0
        });

        // 其他脑出血 开关
        form.on("checkbox(OCH)", function (data) {
            const allCheckbox = $(data.elem).siblings(".layui-form-checkbox");
            if ($(allCheckbox).hasClass("layui-form-checked")) {
                $("#PC-db-OCHDD").removeAttr("disabled").attr("lay-verify", "requiredDB").attr("name", function () {
                    return $(this).attr("data-name");
                });
            } else {
                $("#PC-db-OCHDD").removeAttr("name lay-verify").attr("disabled", true).val("");
            }
        });

        // 脑室周围白质软化 诊断日期
        laydate.render({
            elem: "#PC-db-PWMSDD",
            type: "date",
            format: "yyyy-MM-dd",
            max: 0
        });

        // 超声影像库 颅脑超声
        if ($(".pc-db-UIBU").length > 0) {
            let buIndex = 0;
            // 初始化 颅脑超声
            const buIndexInput = $(".pc-db-UIBU .pc-db-table>tbody").attr("data-num");
            if (notNullTool(buIndexInput)) {
                buIndex = parseInt(buIndexInput);
                // 为 日期 选择 初始化
                for (let i = 1; i <= buIndex; i++) {
                    const thisBuIndex = i;
                    laydate.render({
                        elem: "#PC-db-UT" + thisBuIndex,
                        type: "datetime",
                        format: "yyyy-MM-dd HH:mm:ss",
                        max: 1
                    });
                    upload.render({
                        elem: "#PC-db-LVAH" + thisBuIndex + " button",
                        accept: "images",
                        acceptMime: "image/*",
                        field: "image",
                        url: "/perinatalPlatform/ultrasoundImage/write/BU/uploadImg?num=1&index=" + thisBuIndex,
                        done: function(res) {
                            const imgElem = $("#PC-db-LVAH" + thisBuIndex + " img");
                            if (res.code === 0) {
                                const url = res.url;
                                console.log()
                                $("#PC-db-LVAHURL" + thisBuIndex).val(url);
                                $(imgElem).attr("src", url).attr("layer-src", url);
                                layer.photos({
                                    photos: "#PC-db-LVAH" + thisBuIndex,
                                    anim: 5
                                });
                            } else {
                                $(imgElem).removeAttr("src layer-src");
                                return layer.msg("上传失败");
                            }
                        }
                    });
                    upload.render({
                        elem: "#PC-db-LVTS" + thisBuIndex + " button",
                        accept: "images",
                        acceptMime: "image/*",
                        field: "image",
                        url: "/perinatalPlatform/ultrasoundImage/write/BU/uploadImg?num=2&index=" + thisBuIndex,
                        done: function(res) {
                            const imgElem = $("#PC-db-LVTS" + thisBuIndex + " img");
                            if (res.code === 0) {
                                const url = res.url;
                                $("#PC-db-LVTSURL" + thisBuIndex).val(url);
                                $(imgElem).attr("src", url).attr("layer-src", url);
                                layer.photos({
                                    photos: "#PC-db-LVTS" + thisBuIndex,
                                    anim: 5
                                });
                            } else {
                                $(imgElem).removeAttr("src layer-src");
                                return layer.msg("上传失败");
                            }
                        }
                    });
                    upload.render({
                        elem: "#PC-db-RPVS" + thisBuIndex + " button",
                        accept: "images",
                        acceptMime: "image/*",
                        field: "image",
                        url: "/perinatalPlatform/ultrasoundImage/write/BU/uploadImg?num=3&index=" + thisBuIndex,
                        done: function(res) {
                            const imgElem = $("#PC-db-RPVS" + thisBuIndex + " img");
                            if (res.code === 0) {
                                const url = res.url;
                                $("#PC-db-RPVSURL" + thisBuIndex).val(url);
                                $(imgElem).attr("src", url).attr("layer-src", url);
                                layer.photos({
                                    photos: "#PC-db-RPVS" + thisBuIndex,
                                    anim: 5
                                });
                            } else {
                                $(imgElem).removeAttr("src layer-src");
                                return layer.msg("上传失败");
                            }
                        }
                    });
                    upload.render({
                        elem: "#PC-db-LPVS" + thisBuIndex + " button",
                        accept: "images",
                        acceptMime: "image/*",
                        field: "image",
                        url: "/perinatalPlatform/ultrasoundImage/write/BU/uploadImg?num=4&index=" + thisBuIndex,
                        done: function(res) {
                            const imgElem = $("#PC-db-LPVS" + thisBuIndex + " img");
                            if (res.code === 0) {
                                const url = res.url;
                                $("#PC-db-LPVSURL" + thisBuIndex).val(url);
                                $(imgElem).attr("src", url).attr("layer-src", url);
                                layer.photos({
                                    photos: "#PC-db-LPVS" + thisBuIndex,
                                    anim: 5
                                });
                            } else {
                                $(imgElem).removeAttr("src layer-src");
                                return layer.msg("上传失败");
                            }
                        }
                    });
                    layer.photos({
                        photos: "#PC-db-LVAH" + thisBuIndex,
                        anim: 5
                    });
                    layer.photos({
                        photos: "#PC-db-LVTS" + thisBuIndex,
                        anim: 5
                    });
                    layer.photos({
                        photos: "#PC-db-RPVS" + thisBuIndex,
                        anim: 5
                    });
                    layer.photos({
                        photos: "#PC-db-LPVS" + thisBuIndex,
                        anim: 5
                    });
                    // 删除 颅脑超声 行
                    $("#PC-db-buDelete" + thisBuIndex).on("click", function () {
                        const that = this;
                        layer.msg("确定要 <span class='pc-db-status-color-no'>删除</span> 此条超声检查信息吗?", {
                            icon: 7,
                            time: 0,
                            anim: 6,
                            btn: ["确定", "取消"],
                            resize: false,
                            shade: 0.8,
                            yes: function (index) {
                                $(that).parents("tr").remove();
                                // 计算 颅脑超声 次数
                                const buTimes = $(".pc-db-UIBU .pc-db-table>tbody>tr").length - 1;
                                $("#PC-db-UN").val(buTimes);
                                layer.close(index);
                            }
                        });
                    });
                }
            }
            // 增加 颅脑超声
            $("#PC-db-addBU").on("click", function () {
                const that = this;
                buIndex++;
                sequentialExecution(function () {
                    $(that).parents("tr").before(
                        "<tr>" +
                        "   <td>" +
                        "       <input id='PC-db-UT" + buIndex + "' type='text' name='ultrasonographyTime" + buIndex + "' lay-verify='required' placeholder='请选择超声检查时间' lay-reqText='请选择超声检查时间！' readonly>" +
                        "   </td>" +
                        "   <td>" +
                        "       <div id='PC-db-LVAH" + buIndex + "' class='pc-db-upload'>" +
                        "           <button class='pc-btn'>点击上传图片</button>" +
                        "           <img>" +
                        "       </div>" +
                        "       <input id='PC-db-LVAHURL" + buIndex + "' type='hidden' name='lvahUrl" + buIndex + "'>" +
                        "   </td>" +
                        "   <td>" +
                        "       <div id='PC-db-LVTS" + buIndex + "' class='pc-db-upload'>" +
                        "           <button class='pc-btn'>点击上传图片</button>" +
                        "           <img>" +
                        "       </div>" +
                        "       <input id='PC-db-LVTSURL" + buIndex + "' type='hidden' name='lvtsUrl" + buIndex + "'>" +
                        "   </td>" +
                        "   <td>" +
                        "       <div id='PC-db-RPVS" + buIndex + "' class='pc-db-upload'>" +
                        "           <button class='pc-btn'>点击上传图片</button>" +
                        "           <img>" +
                        "       </div>" +
                        "       <input id='PC-db-RPVSURL" + buIndex + "' type='hidden' name='rpvsUrl" + buIndex + "'>" +
                        "   </td>" +
                        "   <td>" +
                        "       <div id='PC-db-LPVS" + buIndex + "' class='pc-db-upload'>" +
                        "           <button class='pc-btn'>点击上传图片</button>" +
                        "           <img>" +
                        "       </div>" +
                        "       <input id='PC-db-LPVSURL" + buIndex + "' type='hidden' name='lpvsUrl" + buIndex + "'>" +
                        "   </td>" +
                        "   <td>" +
                        "       <textarea name='resultInterpretation" + buIndex + "' placeholder='请填写结果解释' rows='12'></textarea>" +
                        "   </td>" +
                        "   <td>" +
                        "       <button id='PC-db-buDelete" + buIndex + "' class='pc-btn pc-btn-danger'><i class='iconfont icon-delete'></i></button>" +
                        "   </td>" +
                        "</tr>");
                }, function () {
                    const thisBuIndex = buIndex;
                    laydate.render({
                        elem: "#PC-db-UT" + thisBuIndex,
                        type: "datetime",
                        format: "yyyy-MM-dd HH:mm:ss",
                        max: 1
                    });
                    upload.render({
                        elem: "#PC-db-LVAH" + thisBuIndex + " button",
                        accept: "images",
                        acceptMime: "image/*",
                        field: "image",
                        url: "/perinatalPlatform/ultrasoundImage/write/BU/uploadImg?num=1&index=" + thisBuIndex,
                        done: function(res) {
                            const imgElem = $("#PC-db-LVAH" + thisBuIndex + " img");
                            if (res.code === 0) {
                                const url = res.url;
                                console.log()
                                $("#PC-db-LVAHURL" + thisBuIndex).val(url);
                                $(imgElem).attr("src", url).attr("layer-src", url);
                                layer.photos({
                                    photos: "#PC-db-LVAH" + thisBuIndex,
                                    anim: 5
                                });
                            } else {
                                $(imgElem).removeAttr("src layer-src");
                                return layer.msg("上传失败");
                            }
                        }
                    });
                    upload.render({
                        elem: "#PC-db-LVTS" + thisBuIndex + " button",
                        accept: "images",
                        acceptMime: "image/*",
                        field: "image",
                        url: "/perinatalPlatform/ultrasoundImage/write/BU/uploadImg?num=2&index=" + thisBuIndex,
                        done: function(res) {
                            const imgElem = $("#PC-db-LVTS" + thisBuIndex + " img");
                            if (res.code === 0) {
                                const url = res.url;
                                $("#PC-db-LVTSURL" + thisBuIndex).val(url);
                                $(imgElem).attr("src", url).attr("layer-src", url);
                                layer.photos({
                                    photos: "#PC-db-LVTS" + thisBuIndex,
                                    anim: 5
                                });
                            } else {
                                $(imgElem).removeAttr("src layer-src");
                                return layer.msg("上传失败");
                            }
                        }
                    });
                    upload.render({
                        elem: "#PC-db-RPVS" + thisBuIndex + " button",
                        accept: "images",
                        acceptMime: "image/*",
                        field: "image",
                        url: "/perinatalPlatform/ultrasoundImage/write/BU/uploadImg?num=3&index=" + thisBuIndex,
                        done: function(res) {
                            const imgElem = $("#PC-db-RPVS" + thisBuIndex + " img");
                            if (res.code === 0) {
                                const url = res.url;
                                $("#PC-db-RPVSURL" + thisBuIndex).val(url);
                                $(imgElem).attr("src", url).attr("layer-src", url);
                                layer.photos({
                                    photos: "#PC-db-RPVS" + thisBuIndex,
                                    anim: 5
                                });
                            } else {
                                $(imgElem).removeAttr("src layer-src");
                                return layer.msg("上传失败");
                            }
                        }
                    });
                    upload.render({
                        elem: "#PC-db-LPVS" + thisBuIndex + " button",
                        accept: "images",
                        acceptMime: "image/*",
                        field: "image",
                        url: "/perinatalPlatform/ultrasoundImage/write/BU/uploadImg?num=4&index=" + thisBuIndex,
                        done: function(res) {
                            const imgElem = $("#PC-db-LPVS" + thisBuIndex + " img");
                            if (res.code === 0) {
                                const url = res.url;
                                $("#PC-db-LPVSURL" + thisBuIndex).val(url);
                                $(imgElem).attr("src", url).attr("layer-src", url);
                                layer.photos({
                                    photos: "#PC-db-LPVS" + thisBuIndex,
                                    anim: 5
                                });
                            } else {
                                $(imgElem).removeAttr("src layer-src");
                                return layer.msg("上传失败");
                            }
                        }
                    });
                    // 计算 颅脑超声 次数
                    const buTimes = $(".pc-db-UIBU .pc-db-table>tbody>tr").length - 1;
                    $("#PC-db-UN").val(buTimes);
                    // 删除 颅脑超声 行
                    $("#PC-db-buDelete" + thisBuIndex).on("click", function () {
                        const that = this;
                        layer.msg("确定要 <span class='pc-db-status-color-no'>删除</span> 此条超声检查信息吗?", {
                            icon: 7,
                            time: 0,
                            anim: 6,
                            btn: ["确定", "取消"],
                            resize: false,
                            shade: 0.8,
                            yes: function (index) {
                                $(that).parents("tr").remove();
                                // 计算 颅脑超声 次数
                                const buTimes = $(".pc-db-UIBU .pc-db-table>tbody>tr").length - 1;
                                $("#PC-db-UN").val(buTimes);
                                layer.close(index);
                            }
                        });
                    });
                });
            });

            // 超声影像库 颅脑超声 添加/编辑 信息 提交
            form.on("submit(BU)", function (data) {
                const doing = "保存信息";
                loading(doing);
                let field = data.field, buArray = [];
                for (let i = 1; i <= buIndex; i++) {
                    if (notNullTool(field["ultrasonographyTime" + i])) {
                        buArray.push({
                            ultrasonographyTime: field["ultrasonographyTime" + i],
                            lvahUrl: field["lvahUrl" + i],
                            lvtsUrl: field["lvtsUrl" + i],
                            rpvsUrl: field["rpvsUrl" + i],
                            lpvsUrl: field["lpvsUrl" + i],
                            resultInterpretation: field["resultInterpretation" + i]
                        });
                        delete field["ultrasonographyTime" + i];
                        delete field["lvahUrl" + i];
                        delete field["lvtsUrl" + i];
                        delete field["rpvsUrl" + i];
                        delete field["lpvsUrl" + i];
                        delete field["resultInterpretation" + i];
                    }
                }
                field.buArray = JSON.stringify(buArray);
                $.post("/perinatalPlatform/ultrasoundImage/write/BU/post", field, function (back, status) {
                    if(status === "success") {
                        if(back.code) {
                            successNext();
                        }else {failMsg(doing)}
                    }else {errorMsg1()}
                }, "json").fail(function () {errorMsg2()});
            });
        }
    });
});