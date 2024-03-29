function seeLarge(that) {
    const url = $(that).attr("data-url");
    layer.photos({
        photos: {
            "title": "查看大图",
            "id": 1,
            "start": 0,
            "data": [
                {
                    "alt": "广告图片",
                    "pid": 1,
                    "src": url,
                    "thumb": ""
                }
            ]
        },
        anim: 5
    });
}
function deleteImage(id) {
    layer.msg("确定要 <span class='pc-db-status-color-no'>删除</span> 此图片吗?",{
        icon: 7,
        time: 0,
        anim: 6,
        btn: ["确定", "取消"],
        resize: false,
        shade: 0.8,
        yes: function () {
            $.get("/manage/wxmp/deleteAdImage?id=" + id, function (back, status) {
                if(status === "success") {
                    if(back.code) {
                        successMsg("删除成功！", function () {
                            location.reload();
                        });
                    }else {failMsg("删除失败！")}
                }else {errorMsg1()}
            },"json").fail(function () {errorMsg2()});
        }
    });
}
$(document).ready(function () {
    const E = window.wangEditor;
    try {
        const editor = new E("#PC-main-edit");
        editor.config.showFullScreen = false;
        editor.config.excludeMenus = [
            "video"
        ];
        editor.config.showLinkImg = false;
        editor.config.uploadFileName = "image";
        editor.config.uploadImgServer = "/feedback/uploadImg";
        editor.create();

        // 提交 反馈
        $("#PC-fb-submit").on("click", function () {
            const doing = "提交反馈";
            loading(doing);
            const hospitalAbbreviation = $("#PC-db-HA").val();
            const hospitalName = $("#PC-db-HN").val();
            const fullName = $("#PC-db-fullName").val();
            const context = editor.txt.html();
            const subCon = {
                hospitalAbbr: hospitalAbbreviation,
                hospitalName: hospitalName,
                fullName: fullName,
                feedback: context
            };
            $.post("/feedback/post", subCon, function (back, status) {
                if(status === "success") {
                    if(back.code) {
                        successMsg("提交反馈成功！", function () {
                            location.href = "/feedback";
                        });
                    }else {failMsg(doing)}
                }else {errorMsg1()}
            },"json").fail(function () {errorMsg2()});
        });
    } catch (e) {}

    // 引入 layui
    layui.use(["element", "form", "layer", "upload"], function () {
        let form = layui.form,
            layer = layui.layer,
            upload = layui.upload;

        // 显示 回复 框
        let feedbackId = -1;
        $(".pc-feedback-reply button").on("click", function () {
            feedbackId = parseInt($(this).attr("data-id"));
            $("#PC-feedback-id").val(feedbackId);
            const hospitalName = $(this).attr("data-hospital");
            layer.open({
                title: "<i class='iconfont icon-fankui'></i> 回复 " + hospitalName,
                type: 1,
                shade: 0.8,
                content: $("#PC-feedback-reply"),
                resize: false,
            });
        });

        // 保存 回复信息
        form.on("submit(addReply)", function (data) {
            const doing = "保存回复";
            loading(doing);
            $.post("/manage/feedback/reply", data.field, function (back, status) {
                if(status === "success") {
                    if(back.code) {
                        successNext("保存回复成功！", function () {
                            layer.closeAll();
                        });
                    }else {failMsg(doing)}
                }else {errorMsg1()}
            },"json").fail(function () {errorMsg2()});
        });

        // 微信小程序管理
        if ($(".pc-admin-wxmp").length > 0) {
            // 上传 广告 图片
            upload.render({
                elem: "#PC-admin-ad-image-upload",
                url: "/manage/wxmp/uploadAdImage",
                acceptMime: 'image/*',
                field: "image",
                done: function(res) {
                    if (res.code) {
                        location.reload();
                    }
                }
            });

            const imgWraps = $(".pc-admin-wxmp .pc-admin-wxmp-adImages>div");
            for (let i = 0; i < imgWraps.length; i ++) {
                const imgElem =  $(imgWraps[i]).children("img"),
                    imgWidth = $(imgElem).width(),
                    imgHeight = $(imgElem).height(),
                    shadeElem = $(imgWraps[i]).children(".pc-admin-shade");
                $(shadeElem).width(imgWidth).height(imgHeight);


                $(imgWraps[i]).hover(function () {
                    $(shadeElem).addClass("pc-active");
                }, function () {
                    $(shadeElem).removeClass("pc-active");
                });
            }
        }
    });
});