// 删除 表格 泵奶 行
function deleteBmo(that) {
    layer.msg("确定要 <span class='pc-db-status-color-no'>删除</span> 此条泵奶信息吗?",{
        icon: 7,
        time: 0,
        anim: 6,
        btn: ["确定", "取消"],
        resize: false,
        shade: 0.8,
        yes: function (index) {
            const pumpingId = $(that).prev("input[type=hidden]").val();
            if (notNullTool(pumpingId)) {
                $.get("/perinatalPlatform/doctorPatientCommunication/write/BMD/deletePumping?pumpingId=" + pumpingId, function (back, status) {
                    if (status === "success") {
                        if (back.code) {
                            $(that).parents("tr").remove();
                            $("#PC-db-FPT, #PC-db-FLT, #PC-db-LS2ST, #PC-db-ELT").val("");
                            $(".pc-db-DPCBMD .pc-db-table>tbody input[type=number]").focusout();
                        }
                    }
                }, "json");
            } else {
                $(that).parents("tr").remove();
            }
            layer.close(index);
        }
    });
}
// 更新 图表
function updateChart(bmoIndex, pumpNumberChartJson, pumpAmountChartJson, pumpNumberChart, pumpAmountChart, birthdayStamp) {
    let bomDateTimeStamp = [], bomPumpDayNumber = [], bomDateList = [], bomPumpDayAmount = [], bomPumpAmount = [];
    for (let i = 0; i < bmoIndex; i ++) {
        const pumpingDateElem = $("#PC-db-PD" + (i + 1)),
            pumpingDateTimeString = $(pumpingDateElem).val();
        if (notNullTool(pumpingDateTimeString)) {
            bomDateTimeStamp[i] = Date.parse(pumpingDateTimeString);

            // 检测是否有泵奶量输入
            const thisPumpAmountInput = $("#PC-db-PA" + (i + 1)).val();
            if (notNullTool(thisPumpAmountInput)) {
                // 有泵奶量输入则赋值
                bomPumpAmount[i] = parseFloat(thisPumpAmountInput);
            } else {
                bomPumpAmount[i] = 0;
            }
        }
    }

    // 按日期 从小到大 排序
    for (let i = 0; i < bomDateTimeStamp.length; i ++) {
        for (let j = i; j < bomDateTimeStamp.length; j ++) {
            if (bomDateTimeStamp[j] < bomDateTimeStamp[i]) {
                const bomDateTimeStampTemp = bomDateTimeStamp[i],
                    bomPumpAmountTemp = bomPumpAmount[i];
                bomDateTimeStamp[i] = bomDateTimeStamp[j];
                bomPumpAmount[i] = bomPumpAmount[j];
                bomDateTimeStamp[j] = bomDateTimeStampTemp;
                bomPumpAmount[j] = bomPumpAmountTemp;
            }
        }
    }

    // 首次吸乳时间
    const firstPumpingTimeStamp = bomDateTimeStamp[0];
    if (notNullTool(firstPumpingTimeStamp) && (birthdayStamp > 0)) {
        const firstPumpingTime = Math.round((firstPumpingTimeStamp - birthdayStamp) / 60000);
        $("#PC-db-FPT").val(firstPumpingTime);
    }

    // 第一次泌乳时间
    for (let i = 0; i < bomDateTimeStamp.length; i ++) {
        if (bomPumpAmount[i] > 0) {
            const firstLactationTimeStamp = bomDateTimeStamp[i];
            if (notNullTool(firstLactationTimeStamp) && (birthdayStamp > 0)) {
                const firstLactationTime = Math.round((firstLactationTimeStamp - birthdayStamp) / 3600000);
                $("#PC-db-FLT").val(firstLactationTime);
            }
            break;
        }
    }

    // 泌乳Ⅱ期启动时间
    for (let i = 0; i < bomDateTimeStamp.length; i ++) {
        if (bomPumpAmount[i] > 20) {
            if (notNullTool(bomPumpAmount[i + 1]) && notNullTool(bomPumpAmount[i + 2]) && bomPumpAmount[i + 1] > 20 && bomPumpAmount[i + 2] > 20) {
                const lactationStage2StartTimeStamp = bomDateTimeStamp[i];
                if (notNullTool(lactationStage2StartTimeStamp) && (birthdayStamp > 0)) {
                    const lactationStage2StartTime = Math.round((lactationStage2StartTimeStamp - birthdayStamp) / 3600000);
                    $("#PC-db-LS2ST").val(lactationStage2StartTime);
                }
                break;
            }
        }
    }

    // 按排序后的日期 统计每天 泵奶次数、奶量
    let j = 0;
    for (let i = 0; i < bomDateTimeStamp.length; i ++) {
        const thisBomDateTimeStamp = bomDateTimeStamp[i],
            thisBomDateTime = new Date(thisBomDateTimeStamp),
            thisBomDateTimeString = thisBomDateTime.getFullYear() + "-" + (thisBomDateTime.getMonth() + 1) + "-" + thisBomDateTime.getDate();

        if (bomDateList.indexOf(thisBomDateTimeString) === -1) {
            bomDateList[j] = thisBomDateTimeString;
            bomPumpDayNumber[j] = 1;
            bomPumpDayAmount[j] = bomPumpAmount[i];
            j ++;
        } else {
            bomPumpDayNumber[j - 1] += 1;
            bomPumpDayAmount[j - 1] += bomPumpAmount[i];
        }
    }

    let bomDate = [];

    for (let i = 0; i < bomDateList.length; i ++) {
        const thisDate = new Date(bomDateList[i]);
        bomDate[i] = (thisDate.getMonth() + 1) + "/" + thisDate.getDate();
        // 泌乳建立的时间
        if (bomPumpDayAmount[i] > 500) {
            const establishLactationTimeStamp = bomDateTimeStamp[i];
            if (notNullTool(establishLactationTimeStamp) && (birthdayStamp > 0)) {
                const establishLactationTime = Math.floor((establishLactationTimeStamp - birthdayStamp) / 86400000);
                $("#PC-db-ELT").val(establishLactationTime);
            }
        }
    }
    pumpNumberChartJson.data.labels = bomDate;
    pumpNumberChartJson.data.datasets[0].data = bomPumpDayNumber;
    pumpAmountChartJson.data.labels = bomDate;
    pumpAmountChartJson.data.datasets[0].data = bomPumpDayAmount;
    pumpNumberChart.update();
    pumpAmountChart.update();
}
// 删除 医患沟通 数据
function deleteDcpData(that, dcpId) {
    layer.msg("确定要 <span class='pc-db-status-color-no'>删除</span> 此条信息吗?",{
        icon: 7,
        time: 0,
        anim: 6,
        btn: ["确定", "取消"],
        resize: false,
        shade: 0.8,
        yes: function (index) {
            $.get("/perinatalPlatform/doctorPatientCommunication/write/DPC/deleteDpcData?dcpId=" + dcpId, function (back, status) {
                if (status === "success") {
                    if (back.code) {
                        $(that).parents(".pc-db-chat-block").remove();
                    }
                }
            }, "json");
            layer.close(index);
        }
    });
}
function imgLoad(img, callback) {
    let timer = setInterval(function() {
        for (let i = 0; i < img.length; i++) {
            const thisImg = img[i];
            if (thisImg.complete) {
                callback(thisImg);
                clearInterval(timer);
            }
        }
    }, 50);
}
// 获取 医患沟通 数据
function getDpcData() {
    $.get("/perinatalPlatform/doctorPatientCommunication/write/DPC/getDpcData", function (back, status) {
        if (status === "success") {
            if (back.code) {
                const doctorPatientCommunicationList = back.doctorPatientCommunicationList;
                $(".pc-db-DPCDPC>.layui-row>.layui-col-lg7>.pc-db-item>div").remove();
                const todayDatetime = new Date(),
                    todayDateString = dateFormatDay(todayDatetime),
                    todayDateStamp = Date.parse(todayDateString);
                for (let i = 0; i < doctorPatientCommunicationList.length; i++) {
                    const thisDpc = doctorPatientCommunicationList[i],
                        createTimeStamp = thisDpc.createTime,
                        createTime = new Date(createTimeStamp),
                        createDateString = dateFormatDay(createTimeStamp);
                    let isParentsElem, deleteDcpElem = "", name = "", subDate = "";
                    // 消息时间
                    if (todayDateString === createDateString) {
                        subDate = "今天 " + createTime.getHours() + ":" + createTime.getMinutes();
                    } else {
                        if (createTimeStamp === (todayDateStamp - 86400000)) {
                            subDate = "昨天 " + createTime.getHours() + ":" + createTime.getMinutes();
                        } else {
                            subDate = dateFormatMin(createTime);
                        }
                    }

                    // 消息的作者
                    if (thisDpc.isParents === 0) {
                        isParentsElem = " pc-db-right";
                        name = "我";
                        deleteDcpElem = "<button onclick='deleteDcpData(this, " + thisDpc.id + ")'>撤回</button>";
                    } else {
                        isParentsElem = " pc-db-left";
                        name = "家长";
                    }
                    const elem =
                        "<div class='pc-db-chat-block" + isParentsElem + "'>" +
                        "   <div class='pc-db-avatar'>" +
                        "       <h2>" + name + "</h2>" +
                        "   </div>" +
                        "   <div class='pc-db-chat-pop-wrap'>" +
                        "       <div class='pc-db-chat-pop'>" +
                        "           <div>" + thisDpc.text +"</div>" +
                        "           <div>" +
                        "               <span>" + subDate + "</span>" +
                        deleteDcpElem +
                        "           </div>" +
                        "       </div>" +
                        "   </div>" +
                        "</div>";
                    $(".pc-db-DPCDPC>.layui-row>.layui-col-lg7>.pc-db-item").append(elem);
                }
                // 点击查看大图
                $(".pc-db-DPCDPC .pc-db-chat-block img").attr("title", "点击查看大图！").on("click", function () {
                    const imgSrc = $(this).attr("src"),
                        height = $(window).height() - 40,
                        width = $(window).width() - 80,
                        imgCss = "max-height:" + (height - 25) + "px;max-width:" + (width - 52) + "px;";
                    layer.msg("<img src='" + imgSrc + "' style='" + imgCss + "' alt='医患交流图片'>", {
                        time: 0,
                        shade: 0.3,
                        area: [width + "px", height + "px"],
                        shadeClose: true,
                        closeBtn: 2
                    });
                });
                const block = $(".pc-db-DPCDPC .pc-db-chat-block");
                for (let i = 0; i < block.length; i++) {
                    const thisElem = $(block[i]);
                    // 判断图片是否加载完毕
                    if ($(thisElem).find("img").length > 0) {
                        imgLoad($(thisElem).find("img"), function () {
                            // 滚动到底部
                            $(".pc-db-DPCDPC .layui-col-lg7>.pc-db-item").scrollTop(function () {
                                return $(this)[0].scrollHeight;
                            });
                        });
                    } else if ($(thisElem).find("video").length > 0) {
                        const videoElem = $(thisElem).find("video");
                        videoElem.get(0).addEventListener('canplaythrough',function(){
                            // 滚动到底部
                            $(".pc-db-DPCDPC .layui-col-lg7>.pc-db-item").scrollTop(function () {
                                return $(this)[0].scrollHeight;
                            });
                        });
                    }
                }
            }
        }
    }, "json");
}
$(document).ready(function () {
    // 出生日期
    const dpcBmdElem = $(".pc-db-DPCBMD"),
        birthdayInput = $(dpcBmdElem).attr("data-birthday");
    let pumpNumberChart, pumpNumberChartJson, pumpAmountChart, pumpAmountChartJson, birthdayStamp = 0;
    if ($(dpcBmdElem).length > 0) {
        $(".pc-db-DPCBMD .pc-db-panel .layui-form-switch").off("click");
        if (notNullTool(birthdayInput)) {
            birthdayStamp = Date.parse(birthdayInput);

            // 母乳日志 图表
            const pumpNumberChartElem = $(".pc-db-DPCBMD #PC-chart-pumpNumber"),
                pumpAmountChartElem = $(".pc-db-DPCBMD #PC-chart-pumpAmount"),
                options = {
                    aspectRatio: 1,
                    scales: {
                        y: {
                            title: {
                                color: "#FFB7C5",
                                display: true,
                                align: "end"
                            },
                            beginAtZero: true,
                            ticks: {
                                stepSize: 1
                            }
                        }
                    },
                    plugins: {
                        legend: {
                            display: false
                        },
                        title: {
                            display: true,
                            color: "#FFB7C5",
                            font: {
                                size: 16
                            }
                        },
                        annotation: {
                            annotations: {
                                line1: {
                                    type: "line",
                                    borderColor: "#FFB7C5",
                                    borderWidth: 1,
                                    borderDash: [3, 3]
                                },
                                line2: {
                                    type: "line",
                                    borderColor: "#FFB7C5",
                                    borderWidth: 1,
                                    borderDash: [3, 3]
                                }
                            }
                        }
                    }
                },
                chartJson = {
                    type: "line",
                    data: {
                        datasets: [{
                            fill: false,
                            borderWidth: 3,
                            pointRadius: 1,
                            backgroundColor: "#10A64B",
                            borderColor: "#10A64B"
                        }]
                    }
                };
            let pumpNumberOption = JSON.parse(JSON.stringify(options)),
                pumpAmountOption = JSON.parse(JSON.stringify(options));

            // 泵奶次数
            pumpNumberOption.plugins.title.text = "泵奶次数";
            pumpNumberOption.scales.y.title.text = "次";
            pumpNumberOption.plugins.annotation.annotations.line1.yMax = 6;
            pumpNumberOption.plugins.annotation.annotations.line1.yMin = 6;
            pumpNumberOption.plugins.annotation.annotations.line2.yMax = 8;
            pumpNumberOption.plugins.annotation.annotations.line2.yMin = 8;
            pumpNumberChartJson = JSON.parse(JSON.stringify(chartJson));
            pumpNumberChartJson.data.datasets[0].label = "泵奶次数";
            pumpNumberChartJson.options = pumpNumberOption;

            pumpNumberChart = new Chart($(pumpNumberChartElem), pumpNumberChartJson);

            // 泵奶量
            pumpAmountOption.plugins.title.text = "泵奶量";
            pumpAmountOption.scales.y.title.text = "ml";
            pumpAmountOption.plugins.annotation.annotations.line1.yMax = 50;
            pumpAmountOption.plugins.annotation.annotations.line1.yMin = 50;
            pumpAmountOption.plugins.annotation.annotations.line2.yMax = 100;
            pumpAmountOption.plugins.annotation.annotations.line2.yMin = 100;
            pumpAmountChartJson = JSON.parse(JSON.stringify(chartJson));
            pumpAmountChartJson.data.datasets[0].label = "泵奶量（ml）";
            pumpAmountChartJson.options = pumpAmountOption;

            pumpAmountChart = new Chart($(pumpAmountChartElem), pumpAmountChartJson);

            // 查看 大图
            const layerChartElem = $("#PC-layer-chart");
            let pumpNumberLayerChart, pumpAmountLayerChart;
            $("#PC-db-pumpNumber").on("click", function () {
                if (pumpNumberLayerChart !== undefined) {
                    pumpNumberLayerChart.destroy();
                }
                if (pumpAmountLayerChart !== undefined) {
                    pumpAmountLayerChart.destroy();
                }
                pumpNumberLayerChart = new Chart($(layerChartElem), pumpNumberChartJson);
                layer.open({
                    title: "泵奶次数",
                    type: 1,
                    shade: 0.8,
                    area: "660px",
                    content: $("#PC-db-pumping"),
                    resize: false
                });
            });
            $("#PC-db-pumpAmount").on("click", function () {
                if (pumpNumberLayerChart !== undefined) {
                    pumpNumberLayerChart.destroy();
                }
                if (pumpAmountLayerChart !== undefined) {
                    pumpAmountLayerChart.destroy();
                }
                pumpAmountLayerChart = new Chart($(layerChartElem), pumpAmountChartJson);
                layer.open({
                    title: "泵奶量",
                    type: 1,
                    shade: 0.8,
                    area: "660px",
                    content: $("#PC-db-pumping"),
                    resize: false
                });
            });
        } else {
            layer.msg("请先完善 新生儿出生信息！", {
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
    }

    // 医患沟通
    const dpcDpcElem = $(".pc-db-DPCDPC");
    if ($(dpcDpcElem).length > 0) {
        $(dpcDpcElem).height(function () {
            return $(window).height() - 92;
        });
        const E = window.wangEditor;
        try {
            const editor = new E("#PC-db-edit");
            editor.config.showFullScreen = false;

            // 照片配置
            editor.config.showLinkImg = false;
            editor.config.uploadImgMaxLength = 10; // 照片一次上传限制 10 张
            editor.config.uploadFileName = "image";
            editor.config.uploadImgServer = "/perinatalPlatform/doctorPatientCommunication/write/DPC/uploadImg";

            // 视频配置
            editor.config.showLinkVideo = false;
            editor.config.uploadVideoMaxSize = 1024 * 1024 * 256; // 视频大小限制 256MB
            editor.config.uploadVideoName = "video";
            editor.config.uploadVideoServer = "/perinatalPlatform/doctorPatientCommunication/write/DPC/uploadVideo";

            editor.create();

            // 提交 医患沟通
            $(".pc-db-DPCDPC #PC-db-dpcSub").on("click", function () {
                const doing = "提交";
                loading(doing);
                let sub = {};
                sub.text = editor.txt.html();
                if (notNullTool(sub.text)) {
                    $.post("/perinatalPlatform/doctorPatientCommunication/write/DPC/post", sub, function (back, status) {
                        if(status === "success") {
                            if(back.code) {
                                layer.closeAll();
                                editor.txt.clear();
                                // 获取 医患沟通 数据
                                getDpcData();
                            }else {failMsg(doing)}
                        }else {errorMsg1()}
                    },"json").fail(function () {errorMsg2()});
                } else {
                    layer.msg("请输入内容！", {
                        icon: 7,
                        time: 1000,
                        anim: 6,
                        btn: "好!",
                        resize: false,
                        shade: 0.8
                    });
                }
            });
        } catch (e) {}
        // 获取 医患沟通 数据
        getDpcData();
    }

    // 引入 layui
    layui.use(["element", "form", "laydate", "layer"], function () {
        let form = layui.form,
            laydate = layui.laydate,
            layer = layui.layer;

        // 泵奶 项数
        let bmoIndex = 0, bffDisabled = 0;
        // 获取 泵奶 表格长度 初始值
        const bmoIndexInput = $(".pc-db-DPCBMD .pc-db-table>tbody").attr("data-num");
        // 泵奶 初始化
        if (notNullTool(bmoIndexInput)) {
            bmoIndex = parseInt(bmoIndexInput);
            // 为 日期 选择 初始化
            let lastHide = 0;
            if (bmoIndex > 10) {
                lastHide = bmoIndex - 10;
            }
            for (let i = 1; i <= bmoIndex; i++) {
                const thisBmoIndex = i;
                laydate.render({
                    elem: "#PC-db-PD" + thisBmoIndex,
                    type: "datetime",
                    format: "yyyy-MM-dd HH:mm:ss",
                    max: Math.ceil(new Date().getTime() / 3600000) * 3600000,
                    min: birthdayStamp,
                    done: function () {
                        if (form.val("BMD")["breastsFeelFull" + thisBmoIndex] === "是") {
                            let thisVal = {};
                            thisVal["breastsFeelFull" + thisBmoIndex] = "";
                            thisVal.lactationStage2Time = "";
                            thisVal.delayedLactation = false;
                            form.val("BMD", thisVal);
                            $(".pc-db-DPCBMD .pc-db-panel .layui-form-switch").off("click");
                        }
                        setTimeout(function () {
                            updateChart(bmoIndex, pumpNumberChartJson, pumpAmountChartJson, pumpNumberChart, pumpAmountChart, birthdayStamp);
                        }, 200);
                    }
                });

                // 感觉乳房充盈/满胀，泌乳Ⅱ期时间
                form.on("select(BFF)", function (data) {
                    const nextSelects = $(data.elem).parents("tr").nextAll("tr").children("td:nth-last-child(2)").children("select");
                    if (data.value === "是") {
                        bffDisabled = 1;
                        $(nextSelects).val("").removeAttr("lay-verify name value").attr("disabled", true);
                        $(nextSelects).children("option[value='']").text("无需选择");
                        const thisDateTimeInput = $(data.elem).parents("tr").children("td:first-child").children("input").val();
                        if (notNullTool(thisDateTimeInput)) {
                            const thisDateTimeStamp = Date.parse(thisDateTimeInput);
                            if (birthdayStamp > 0) {
                                const lactationStage2Time = Math.round((thisDateTimeStamp - birthdayStamp) / 3600000);
                                $("#PC-db-LS2T").val(lactationStage2Time);
                                if (lactationStage2Time > 72) {
                                    form.val("BMD", {
                                        delayedLactation: true
                                    });
                                }
                            }
                        }
                    } else {
                        bffDisabled = 0;
                        $(nextSelects).removeAttr("disabled").attr("lay-verify", "required").attr("name", function () {
                            return $(this).attr("data-name");
                        });
                        $(nextSelects).children("option[value='']").text("请选择是否感觉乳房充盈/满胀");
                        $("#PC-db-LS2T").val("").removeAttr("value");
                        form.val("BMD", {
                            delayedLactation: false
                        });
                        form.render("select");
                    }
                    form.render("select");
                    $(".pc-db-DPCBMD .pc-db-panel .layui-form-switch").off("click");
                });

                $("#PC-db-PA" + thisBmoIndex).on("focusout", function () {
                    $("#PC-db-FPT, #PC-db-FLT, #PC-db-LS2ST, #PC-db-ELT").val("");
                    updateChart(bmoIndex, pumpNumberChartJson, pumpAmountChartJson, pumpNumberChart, pumpAmountChart, birthdayStamp);
                });
                if (i <= lastHide) {
                    $(".pc-db-DPCBMD .pc-db-table>tbody>tr").eq(i - 1).hide();
                }
            }
        }
        $(".pc-db-DPCBMD .pc-db-table>tbody input[type=number]").eq(bmoIndex - 1).focusout();
        if ($(".pc-db-DPCBMD .pc-db-table>tbody select[disabled]").length > 0) {
            bffDisabled = 1;
        }

        // 显示历史记录
        $(".pc-db-DPCBMD #PC-db-showHistory").on("click", function () {
            $(".pc-db-DPCBMD .pc-db-table>tbody>tr").show();
        });

        // 增加 泵奶
        $("#PC-db-addBMO").on("click", function () {
            const that = this;
            bmoIndex++;
            sequentialExecution(function () {
                let tdHtml =
                    "<tr>" +
                    "   <td>" +
                    "       <input id='PC-db-PD" + bmoIndex + "' type='text' name='pumpingDate" + bmoIndex + "' lay-verify='required' placeholder='请选择泵奶日期' lay-reqText='请选择泵奶日期！' readonly>" +
                    "   </td>" +
                    "   <td>" +
                    "       <input id='PC-db-PA" + bmoIndex + "' type='number' name='pumpingAmount" + bmoIndex + "' lay-verify='required' placeholder='请填写泵奶量' lay-reqText='请填写泵奶量！'>" +
                    "   </td>" +
                    "   <td>" +
                    "       <select name='pumpingWay" + bmoIndex + "' lay-reqText='请选择泵奶方式！' lay-verify='required'>" +
                    "           <option value=''>请选择泵奶方式</option>" +
                    "           <option value='手+电动挤奶'>手+电动挤奶</option>" +
                    "           <option value='手挤奶'>手挤奶</option>" +
                    "           <option value='手动吸乳器'>手动吸乳器</option>" +
                    "           <option value='电动吸乳器'>电动吸乳器</option>" +
                    "       </select>" +
                    "   </td>" +
                    "   <td>" +
                    "       <select name='pumpingLocation" + bmoIndex + "' lay-reqText='请选择泵奶地点！' lay-verify='required'>" +
                    "           <option value=''>请选择泵奶地点</option>" +
                    "           <option value='家庭'>家庭</option>" +
                    "           <option value='ICU'>ICU</option>" +
                    "           <option value='产房'>产房</option>" +
                    "           <option value='病房'>病房</option>" +
                    "       </select>" +
                    "   </td>" +
                    "   <td>";
                if (bffDisabled) {
                    tdHtml = tdHtml.concat(
                        "       <select data-name='breastsFeelFull" + bmoIndex + "' lay-reqText='请选择是否感觉乳房充盈/满胀！' lay-filter='BFF' disabled>" +
                        "           <option value=''>无需选择</option>" +
                        "           <option value='是'>是</option>" +
                        "           <option value='否'>否</option>" +
                        "       </select>");
                } else {
                    tdHtml = tdHtml.concat(
                        "       <select data-name='breastsFeelFull" + bmoIndex + "' name='breastsFeelFull" + bmoIndex + "' lay-reqText='请选择是否感觉乳房充盈/满胀！' lay-filter='BFF' lay-verify='required'>" +
                        "           <option value=''>请选择是否感觉乳房充盈/满胀</option>" +
                        "           <option value='是'>是</option>" +
                        "           <option value='否'>否</option>" +
                        "       </select>");
                }
                tdHtml = tdHtml.concat(
                    "   </td>" +
                    "   <td>" +
                    "       <button onclick='deleteBmo(this);' class='pc-btn pc-btn-danger'><i class='iconfont icon-delete'></i></button>" +
                    "   </td>" +
                    "</tr>");
                $(that).parents("tr").before(tdHtml);
            }, function () {
                form.render("select");
            }, function () {
                const thisBmoIndex = bmoIndex;
                laydate.render({
                    elem: "#PC-db-PD" + thisBmoIndex,
                    type: "datetime",
                    format: "yyyy-MM-dd HH:mm:ss",
                    max: Math.ceil(new Date().getTime() / 3600000) * 3600000,
                    min: birthdayStamp,
                    done: function() {
                        if (form.val("BMD")["breastsFeelFull" + thisBmoIndex] === "是") {
                            let thisVal = {};
                            thisVal["breastsFeelFull" + thisBmoIndex] = "";
                            thisVal.lactationStage2Time = "";
                            thisVal.delayedLactation = false;
                            form.val("BMD", thisVal);
                            $(".pc-db-DPCBMD .pc-db-panel .layui-form-switch").off("click");
                        }
                        setTimeout(function () {
                            updateChart(bmoIndex, pumpNumberChartJson, pumpAmountChartJson, pumpNumberChart, pumpAmountChart, birthdayStamp);
                        },200);
                    }
                });

                // 感觉乳房充盈/满胀，泌乳Ⅱ期时间
                form.on("select(BFF)", function (data) {
                    const nextSelects = $(data.elem).parents("tr").nextAll("tr").children("td:nth-last-child(2)").children("select");
                    if (data.value === "是") {
                        bffDisabled = 1;
                        $(nextSelects).val("").removeAttr("lay-verify name value").attr("disabled", true);
                        $(nextSelects).children("option[value='']").text("无需选择");
                        const thisDateTimeInput = $(data.elem).parents("tr").children("td:first-child").children("input").val();
                        if (notNullTool(thisDateTimeInput)) {
                            const thisDateTimeStamp = Date.parse(thisDateTimeInput);
                            if (birthdayStamp > 0) {
                                const lactationStage2Time = Math.round((thisDateTimeStamp - birthdayStamp) / 3600000);
                                $("#PC-db-LS2T").val(lactationStage2Time);
                                if (lactationStage2Time > 72) {
                                    form.val("BMD", {
                                        delayedLactation: true
                                    });
                                }
                            }
                        }
                    } else {
                        bffDisabled = 0;
                        $(nextSelects).removeAttr("disabled").attr("lay-verify", "required").attr("name", function () {
                            return $(this).attr("data-name");
                        });
                        $(nextSelects).children("option[value='']").text("请选择是否感觉乳房充盈/满胀");
                        $("#PC-db-LS2T").val("").removeAttr("value");
                        form.val("BMD", {
                            delayedLactation: false
                        });
                        form.render("select");
                    }
                    form.render("select");
                    $(".pc-db-DPCBMD .pc-db-panel .layui-form-switch").off("click");
                });

                $("#PC-db-PA" + thisBmoIndex).on("focusout", function () {
                    $("#PC-db-LS2ST, #PC-db-ELT").val("");
                    updateChart(bmoIndex, pumpNumberChartJson, pumpAmountChartJson, pumpNumberChart, pumpAmountChart, birthdayStamp);
                });
            });
        });

        // 医患交流库 母乳日志 添加/编辑 信息 提交
        form.on("submit(BMD)", function (data) {
            const doing = "保存信息";
            loading(doing);
            let field = data.field, pumpingArray = [];
            for (let i = 1; i <= bmoIndex; i++) {
                let thisJson = {};
                if (notNullTool(field["pumpingId" + i])) {
                    thisJson.id = field["pumpingId" + i];
                    delete field["pumpingId" + i];
                }
                if (notNullTool(field["pumpingDate" + i])) {
                    thisJson.pumpingDate = field["pumpingDate" + i];
                    thisJson.pumpingAmount = field["pumpingAmount" + i];
                    thisJson.pumpingWay = field["pumpingWay" + i];
                    thisJson.pumpingLocation = field["pumpingLocation" + i];
                    thisJson.breastsFeelFull = field["breastsFeelFull" + i];
                    pumpingArray.push(thisJson);
                }
                delete field["pumpingDate" + i];
                delete field["pumpingAmount" + i];
                delete field["pumpingWay" + i];
                delete field["pumpingLocation" + i];
                delete field["breastsFeelFull" + i];
            }
            for (const key in field) {
                if (!notNullTool(field[key])) {
                    delete field[key];
                }
            }
            field.pumpingArray = JSON.stringify(pumpingArray);
            $.post("/perinatalPlatform/doctorPatientCommunication/write/BMD/post", field, function (back, status) {
                if(status === "success") {
                    if(back.code) {
                        successNext();
                    }else {failMsg(doing)}
                }else {errorMsg1()}
            }, "json").fail(function () {errorMsg2()});
        });

        let childHospitalizationDate;
        // 奶量情况
        const dpcBfsMqElem = $(".pc-db-DPCBFSMQ");
        childHospitalizationDate = $(dpcBfsMqElem).attr("data-chd");
        if ($(dpcBfsMqElem).length > 0) {
            if (notNullTool(childHospitalizationDate)) {
                const childHospitalizationDateStamp = Date.parse(childHospitalizationDate);
                // 获取 肠内营养 信息
                $.get("/perinatalPlatform/basicDatabase/write/DGS/EN/getData", function (back, status) {
                    if (status === "success") {
                        if (back.code) {
                            const enDataList = back.enDataList;
                            let milkQuantityDate = [], breastMilkData = [], donateBreastMilkData = [],
                                deeplyHydrolyzedMilkData = [],
                                partiallyHydrolyzedMilkData = [], aminoAcidMilkData = [], ordinaryFormulaMilkData = [];
                            // 遍历 奶量
                            for (let i = 0; i < enDataList.length; i++) {
                                const thisEnData = enDataList[i],
                                    day = parseInt(thisEnData.day),
                                    dayIndex = day - 1,
                                    thisChildHospitalizationDateStamp = childHospitalizationDateStamp + 86400000 * dayIndex,
                                    thisChildHospitalizationDate = new Date(thisChildHospitalizationDateStamp);
                                milkQuantityDate[dayIndex] = (thisChildHospitalizationDate.getMonth() + 1) + "/" + thisChildHospitalizationDate.getDate();
                                if (notNullTool(thisEnData.breastMilk)) {
                                    breastMilkData[dayIndex] = parseFloat(thisEnData.breastMilk);
                                }
                                if (notNullTool(thisEnData.donateBreastMilk)) {
                                    donateBreastMilkData[dayIndex] = parseFloat(thisEnData.donateBreastMilk);
                                }
                                if (notNullTool(thisEnData.deeplyHydrolyzedMilk)) {
                                    deeplyHydrolyzedMilkData[dayIndex] = parseFloat(thisEnData.deeplyHydrolyzedMilk);
                                }
                                if (notNullTool(thisEnData.partiallyHydrolyzedMilk)) {
                                    partiallyHydrolyzedMilkData[dayIndex] = parseFloat(thisEnData.partiallyHydrolyzedMilk);
                                }
                                if (notNullTool(thisEnData.aminoAcidMilk)) {
                                    aminoAcidMilkData[dayIndex] = parseFloat(thisEnData.aminoAcidMilk);
                                }
                                if (notNullTool(thisEnData.ordinaryFormulaMilk)) {
                                    ordinaryFormulaMilkData[dayIndex] = parseFloat(thisEnData.ordinaryFormulaMilk);
                                }
                            }
                            // 补上缺失日期
                            for (let i = 0; i < milkQuantityDate.length; i++) {
                                if (milkQuantityDate[i] === undefined) {
                                    const thisChildHospitalizationDateStamp = childHospitalizationDateStamp + 86400000 * i,
                                        thisChildHospitalizationDate = new Date(thisChildHospitalizationDateStamp);
                                    milkQuantityDate[i] = (thisChildHospitalizationDate.getMonth() + 1) + "/" + thisChildHospitalizationDate.getDate();
                                }
                            }
                            // 当日 奶量 信息
                            const todayDate = new Date(),
                                todayDateStamp = todayDate.getTime(),
                                todayIndex = Math.floor((todayDateStamp - childHospitalizationDateStamp) / 86400000);
                            if (milkQuantityDate[todayIndex] !== undefined) {
                                $("#PC-db-BM").val(breastMilkData[todayIndex]);
                                $("#PC-db-DBM").val(donateBreastMilkData[todayIndex]);
                                $("#PC-db-DHM").val(deeplyHydrolyzedMilkData[todayIndex]);
                                $("#PC-db-PHM").val(partiallyHydrolyzedMilkData[todayIndex]);
                                $("#PC-db-AAM").val(aminoAcidMilkData[todayIndex]);
                                $("#PC-db-OFM").val(ordinaryFormulaMilkData[todayIndex]);
                            }
                            // 设置 日期
                            laydate.render({
                                elem: "#PC-db-FD",
                                type: "date",
                                format: "yyyy-MM-dd",
                                max: 0,
                                min: childHospitalizationDateStamp,
                                value: todayDate,
                                done: function (value) {
                                    const thisDateStamp = Date.parse(value),
                                        thisDateIndex = Math.floor((thisDateStamp - childHospitalizationDateStamp) / 86400000);
                                    if (milkQuantityDate[thisDateIndex] !== undefined) {
                                        $("#PC-db-BM").val(breastMilkData[thisDateIndex]);
                                        $("#PC-db-DBM").val(donateBreastMilkData[thisDateIndex]);
                                        $("#PC-db-DHM").val(deeplyHydrolyzedMilkData[thisDateIndex]);
                                        $("#PC-db-PHM").val(partiallyHydrolyzedMilkData[thisDateIndex]);
                                        $("#PC-db-AAM").val(aminoAcidMilkData[thisDateIndex]);
                                        $("#PC-db-OFM").val(ordinaryFormulaMilkData[thisDateIndex]);
                                    }
                                }
                            });
                            // 奶量情况 图表
                            const milkQuantityChartElem = $(".pc-db-DPCBFSMQ #PC-chart-milkQuantity"),
                                milkQuantityOptions = {
                                    aspectRatio: 1.4,
                                    scales: {
                                        y: {
                                            title: {
                                                color: "#FFB7C5",
                                                display: true,
                                                align: "end",
                                                text: "ml/d"
                                            },
                                            beginAtZero: true,
                                            ticks: {
                                                stepSize: 1
                                            }
                                        },
                                        x: {
                                            title: {
                                                color: "#FFB7C5",
                                                display: true,
                                                align: "end",
                                                text: "日期"
                                            }
                                        }
                                    },
                                    plugins: {
                                        annotation: {
                                            annotations: {
                                                line1: {
                                                    type: "line",
                                                    borderColor: "#FFB7C5",
                                                    borderWidth: 1,
                                                    borderDash: [3, 3],
                                                    yMax: 300,
                                                    yMin: 300
                                                }
                                            }
                                        }
                                    }
                                },
                                milkQuantityChartJson = {
                                    type: "line",
                                    data: {
                                        labels: milkQuantityDate,
                                        datasets: [{
                                            label: "亲母母乳",
                                            data: breastMilkData,
                                            fill: false,
                                            borderWidth: 3,
                                            pointRadius: 2,
                                            backgroundColor: "#73C6B6",
                                            borderColor: "#73C6B6"
                                        }, {
                                            label: "捐献母乳",
                                            data: donateBreastMilkData,
                                            fill: false,
                                            borderWidth: 3,
                                            pointRadius: 2,
                                            backgroundColor: "#5DADE2",
                                            borderColor: "#5DADE2"
                                        }, {
                                            label: "深度水解奶",
                                            data: deeplyHydrolyzedMilkData,
                                            fill: false,
                                            borderWidth: 3,
                                            pointRadius: 2,
                                            backgroundColor: "#F5B041",
                                            borderColor: "#F5B041"
                                        }, {
                                            label: "部分水解奶",
                                            data: partiallyHydrolyzedMilkData,
                                            fill: false,
                                            borderWidth: 3,
                                            pointRadius: 2,
                                            backgroundColor: "#AF7AC5",
                                            borderColor: "#AF7AC5"
                                        }, {
                                            label: "氨基酸奶",
                                            data: aminoAcidMilkData,
                                            fill: false,
                                            borderWidth: 3,
                                            pointRadius: 2,
                                            backgroundColor: "#F1948A",
                                            borderColor: "#F1948A"
                                        }, {
                                            label: "普通配方奶",
                                            data: ordinaryFormulaMilkData,
                                            fill: false,
                                            borderWidth: 3,
                                            pointRadius: 2,
                                            backgroundColor: "#DC7633",
                                            borderColor: "#DC7633"
                                        }]
                                    },
                                    options: milkQuantityOptions
                                };
                            new Chart($(milkQuantityChartElem), milkQuantityChartJson);
                        }
                    }
                }, "json");
            } else {
                layer.msg("请先完善 新生儿出生信息！", {
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
        }

        // 母乳强化
        const dpcBfsBmfElem = $(".pc-db-DPCBFSBMF");
        childHospitalizationDate = $(dpcBfsBmfElem).attr("data-chd");
        if ($(dpcBfsBmfElem).length > 0) {
            $(".pc-db-DPCBFSBMF .pc-db-radioBtn-group>li").off("click");
            if (notNullTool(childHospitalizationDate)) {
                const childHospitalizationDateStamp = Date.parse(childHospitalizationDate);
                // 获取 肠内营养 信息
                $.get("/perinatalPlatform/basicDatabase/write/DGS/EN/getData", function (back, status) {
                    if (status === "success") {
                        if (back.code) {
                            const enDataList = back.enDataList;
                            let milkQuantityDate = [], breastMilkFortifier = [];
                            // 遍历 奶量
                            for (let i = 0; i < enDataList.length; i++) {
                                const thisEnData = enDataList[i],
                                    day = parseInt(thisEnData.day),
                                    dayIndex = day - 1,
                                    thisChildHospitalizationDateStamp = childHospitalizationDateStamp + 86400000 * dayIndex,
                                    thisChildHospitalizationDate = new Date(thisChildHospitalizationDateStamp);
                                milkQuantityDate[dayIndex] = (thisChildHospitalizationDate.getMonth() + 1) + "/" + thisChildHospitalizationDate.getDate();
                                if (notNullTool(thisEnData.breastMilkFortifier)) {
                                    breastMilkFortifier[dayIndex] = parseFloat(thisEnData.breastMilkFortifier);
                                }
                            }
                            // 补上缺失日期
                            for (let i = 0; i < milkQuantityDate.length; i++) {
                                if (milkQuantityDate[i] === undefined) {
                                    const thisChildHospitalizationDateStamp = childHospitalizationDateStamp + 86400000 * i,
                                        thisChildHospitalizationDate = new Date(thisChildHospitalizationDateStamp);
                                    milkQuantityDate[i] = (thisChildHospitalizationDate.getMonth() + 1) + "/" + thisChildHospitalizationDate.getDate();
                                }
                            }
                            // 母乳强化 图表
                            const milkQuantityChartElem = $(".pc-db-DPCBFSBMF #PC-chart-BMF"),
                                milkQuantityOptions = {
                                    aspectRatio: 1.4,
                                    scales: {
                                        y: {
                                            title: {
                                                color: "#FFB7C5",
                                                display: true,
                                                align: "end",
                                                text: "强化/d"
                                            },
                                            beginAtZero: true,
                                            ticks: {
                                                stepSize: 0.1
                                            }
                                        },
                                        x: {
                                            title: {
                                                color: "#FFB7C5",
                                                display: true,
                                                align: "end",
                                                text: "日期"
                                            }
                                        }
                                    },
                                    plugins: {
                                        legend: {
                                            display: false
                                        },
                                        annotation: {
                                            annotations: {
                                                line1: {
                                                    type: "line",
                                                    borderColor: "#FFB7C5",
                                                    borderWidth: 1,
                                                    borderDash: [3, 3],
                                                    yMax: 1,
                                                    yMin: 1
                                                }
                                            }
                                        }
                                    }
                                },
                                milkQuantityChartJson = {
                                    type: "line",
                                    data: {
                                        labels: milkQuantityDate,
                                        datasets: [{
                                            data: breastMilkFortifier,
                                            fill: false,
                                            borderWidth: 3,
                                            pointRadius: 2,
                                            backgroundColor: "#73C6B6",
                                            borderColor: "#73C6B6"
                                        }]
                                    },
                                    options: milkQuantityOptions
                                };
                            new Chart($(milkQuantityChartElem), milkQuantityChartJson);
                        }
                    }
                }, "json");
            } else {
                layer.msg("请先完善 新生儿出生信息！", {
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
        }

        // 医患交流库 审核 信息 提交
        form.on("submit(saveReview)", function (data) {
            const doing = "保存审核";
            loading(doing);
            $.post("/perinatalPlatform/doctorPatientCommunication/review/post", data.field, function (back, status) {
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