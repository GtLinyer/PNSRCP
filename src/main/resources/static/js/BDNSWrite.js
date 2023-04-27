function ocdHeight(lr, index) {
    if (notNullTool(index)) {
        for (let i = 1; i <= index; i ++) {
            const ocdHeight = $("#PC-db-" + lr + "OCD" + i + ">.pc-db-item-checkbox").height();
            if (ocdHeight > 32) {
                $("#PC-db-" + lr + "OCD" + i).height(ocdHeight);
                $("#PC-db-" + lr + "OCD" + i + ">.pc-db-item-checkbox>.layui-form-checkbox").css("margin-bottom", "10px");
            }
        }
    } else {
        const ocdHeight = $("#PC-db-" + lr + "OCD>.pc-db-item-checkbox").height();
        if (ocdHeight > 32) {
            $("#PC-db-" + lr + "OCD").height(ocdHeight);
            $("#PC-db-" + lr + "OCD>.pc-db-item-checkbox>.layui-form-checkbox").css("margin-bottom", "10px");
        }
    }
}
$(document).ready(function () {
    // 引入 layui
    layui.use(["element", "form", "laydate", "upload"], function () {
        let form = layui.form,
            laydate = layui.laydate,
            upload = layui.upload;

        // 基础数据库 神经系统 超声
        if ($(".pc-db-BDNSUS").length > 0) {
            // 初始化 神经系统 超声
            let usIndex = $(".pc-db-us").length;
            for (let i = 1; i <= usIndex; i++) {
                const thisUsIndex = i;
                ocdHeight("L", thisUsIndex);
                ocdHeight("R", thisUsIndex);
                // 为 日期 选择 初始化
                laydate.render({
                    elem: "#PC-db-LIT" + thisUsIndex,
                    type: "datetime",
                    format: "yyyy-MM-dd HH:mm:ss",
                    max: 1
                });
                laydate.render({
                    elem: "#PC-db-RIT" + thisUsIndex,
                    type: "datetime",
                    format: "yyyy-MM-dd HH:mm:ss",
                    max: 1
                });
                // 左侧 其他中枢病变 其他
                form.on("checkbox(LOCDO" + thisUsIndex + ")", function (data) {
                    if (data.elem.checked) {
                        $("#PC-db-LOCDO" + thisUsIndex).removeAttr("disabled").attr("name", function () {
                            return $(this).attr("data-name");
                        });
                    } else {
                        $("#PC-db-LOCDO" + thisUsIndex).removeAttr("name").attr("disabled", true).val("");
                    }
                });
                // 右侧 其他中枢病变 其他
                form.on("checkbox(ROCDO" + thisUsIndex + ")", function (data) {
                    if (data.elem.checked) {
                        $("#PC-db-ROCDO" + thisUsIndex).removeAttr("disabled").attr("name", function () {
                            return $(this).attr("data-name");
                        });
                    } else {
                        $("#PC-db-ROCDO" + thisUsIndex).removeAttr("name").attr("disabled", true).val("");
                    }
                });
                upload.render({
                    elem: "#PC-db-CS-FL" + thisUsIndex + " button",
                    accept: "images",
                    acceptMime: "image/*",
                    field: "image",
                    url: "/perinatalPlatform/basicDatabase/write/NS/US/uploadUsImg?num=1&index=" + thisUsIndex,
                    done: function(res) {
                        const imgElem = $("#PC-db-CS-FL" + thisUsIndex + " img");
                        if (res.code === 0) {
                            const url = res.url;
                            $("#PC-db-CS-FL-URL" + thisUsIndex).val(url);
                            $(imgElem).attr("src", url).attr("layer-src", url);
                            layer.photos({
                                photos: "#PC-db-CS-FL" + thisUsIndex,
                                anim: 5
                            });
                        } else {
                            $(imgElem).removeAttr("src layer-src");
                            return layer.msg("上传失败");
                        }
                    }
                });
                upload.render({
                    elem: "#PC-db-CS-LVAHL" + thisUsIndex + " button",
                    accept: "images",
                    acceptMime: "image/*",
                    field: "image",
                    url: "/perinatalPlatform/basicDatabase/write/NS/US/uploadUsImg?num=2&index=" + thisUsIndex,
                    done: function(res) {
                        const imgElem = $("#PC-db-CS-LVAHL" + thisUsIndex + " img");
                        if (res.code === 0) {
                            const url = res.url;
                            $("#PC-db-CS-LVAHL-URL" + thisUsIndex).val(url);
                            $(imgElem).attr("src", url).attr("layer-src", url);
                            layer.photos({
                                photos: "#PC-db-CS-LVAHL" + thisUsIndex,
                                anim: 5
                            });
                        } else {
                            $(imgElem).removeAttr("src layer-src");
                            return layer.msg("上传失败");
                        }
                    }
                });
                upload.render({
                    elem: "#PC-db-CS-TVL" + thisUsIndex + " button",
                    accept: "images",
                    acceptMime: "image/*",
                    field: "image",
                    url: "/perinatalPlatform/basicDatabase/write/NS/US/uploadUsImg?num=3&index=" + thisUsIndex,
                    done: function(res) {
                        const imgElem = $("#PC-db-CS-TVL" + thisUsIndex + " img");
                        if (res.code === 0) {
                            const url = res.url;
                            $("#PC-db-CS-TVL-URL" + thisUsIndex).val(url);
                            $(imgElem).attr("src", url).attr("layer-src", url);
                            layer.photos({
                                photos: "#PC-db-CS-TVL" + thisUsIndex,
                                anim: 5
                            });
                        } else {
                            $(imgElem).removeAttr("src layer-src");
                            return layer.msg("上传失败");
                        }
                    }
                });
                upload.render({
                    elem: "#PC-db-CS-LVCP-PHL" + thisUsIndex + " button",
                    accept: "images",
                    acceptMime: "image/*",
                    field: "image",
                    url: "/perinatalPlatform/basicDatabase/write/NS/US/uploadUsImg?num=4&index=" + thisUsIndex,
                    done: function(res) {
                        const imgElem = $("#PC-db-CS-LVCP-PHL" + thisUsIndex + " img");
                        if (res.code === 0) {
                            const url = res.url;
                            $("#PC-db-CS-LVCP-PHL-URL" + thisUsIndex).val(url);
                            $(imgElem).attr("src", url).attr("layer-src", url);
                            layer.photos({
                                photos: "#PC-db-CS-LVCP-PHL" + thisUsIndex,
                                anim: 5
                            });
                        } else {
                            $(imgElem).removeAttr("src layer-src");
                            return layer.msg("上传失败");
                        }
                    }
                });
                upload.render({
                    elem: "#PC-db-CS-OLL" + thisUsIndex + " button",
                    accept: "images",
                    acceptMime: "image/*",
                    field: "image",
                    url: "/perinatalPlatform/basicDatabase/write/NS/US/uploadUsImg?num=5&index=" + thisUsIndex,
                    done: function(res) {
                        const imgElem = $("#PC-db-CS-OLL" + thisUsIndex + " img");
                        if (res.code === 0) {
                            const url = res.url;
                            $("#PC-db-CS-OLL-URL" + thisUsIndex).val(url);
                            $(imgElem).attr("src", url).attr("layer-src", url);
                            layer.photos({
                                photos: "#PC-db-CS-OLL" + thisUsIndex,
                                anim: 5
                            });
                        } else {
                            $(imgElem).removeAttr("src layer-src");
                            return layer.msg("上传失败");
                        }
                    }
                });
                upload.render({
                    elem: "#PC-db-CS-CL" + thisUsIndex + " button",
                    accept: "images",
                    acceptMime: "image/*",
                    field: "image",
                    url: "/perinatalPlatform/basicDatabase/write/NS/US/uploadUsImg?num=6&index=" + thisUsIndex,
                    done: function(res) {
                        const imgElem = $("#PC-db-CS-CL" + thisUsIndex + " img");
                        if (res.code === 0) {
                            const url = res.url;
                            $("#PC-db-CS-CL-URL" + thisUsIndex).val(url);
                            $(imgElem).attr("src", url).attr("layer-src", url);
                            layer.photos({
                                photos: "#PC-db-CS-CL" + thisUsIndex,
                                anim: 5
                            });
                        } else {
                            $(imgElem).removeAttr("src layer-src");
                            return layer.msg("上传失败");
                        }
                    }
                });
                upload.render({
                    elem: "#PC-db-SS-MP" + thisUsIndex + " button",
                    accept: "images",
                    acceptMime: "image/*",
                    field: "image",
                    url: "/perinatalPlatform/basicDatabase/write/NS/US/uploadUsImg?num=7&index=" + thisUsIndex,
                    done: function(res) {
                        const imgElem = $("#PC-db-SS-MP" + thisUsIndex + " img");
                        if (res.code === 0) {
                            const url = res.url;
                            $("#PC-db-SS-MP-URL" + thisUsIndex).val(url);
                            $(imgElem).attr("src", url).attr("layer-src", url);
                            layer.photos({
                                photos: "#PC-db-SS-MP" + thisUsIndex,
                                anim: 5
                            });
                        } else {
                            $(imgElem).removeAttr("src layer-src");
                            return layer.msg("上传失败");
                        }
                    }
                });
                upload.render({
                    elem: "#PC-db-SS-LVAHL" + thisUsIndex + " button",
                    accept: "images",
                    acceptMime: "image/*",
                    field: "image",
                    url: "/perinatalPlatform/basicDatabase/write/NS/US/uploadUsImg?num=8&index=" + thisUsIndex,
                    done: function(res) {
                        const imgElem = $("#PC-db-SS-LVAHL" + thisUsIndex + " img");
                        if (res.code === 0) {
                            const url = res.url;
                            $("#PC-db-SS-LVAHL-URL" + thisUsIndex).val(url);
                            $(imgElem).attr("src", url).attr("layer-src", url);
                            layer.photos({
                                photos: "#PC-db-SS-LVAHL" + thisUsIndex,
                                anim: 5
                            });
                        } else {
                            $(imgElem).removeAttr("src layer-src");
                            return layer.msg("上传失败");
                        }
                    }
                });
                upload.render({
                    elem: "#PC-db-SS-LVCP-PHL" + thisUsIndex + " button",
                    accept: "images",
                    acceptMime: "image/*",
                    field: "image",
                    url: "/perinatalPlatform/basicDatabase/write/NS/US/uploadUsImg?num=9&index=" + thisUsIndex,
                    done: function(res) {
                        const imgElem = $("#PC-db-SS-LVCP-PHL" + thisUsIndex + " img");
                        if (res.code === 0) {
                            const url = res.url;
                            $("#PC-db-SS-LVCP-PHL-URL" + thisUsIndex).val(url);
                            $(imgElem).attr("src", url).attr("layer-src", url);
                            layer.photos({
                                photos: "#PC-db-SS-LVCP-PHL" + thisUsIndex,
                                anim: 5
                            });
                        } else {
                            $(imgElem).removeAttr("src layer-src");
                            return layer.msg("上传失败");
                        }
                    }
                });
                upload.render({
                    elem: "#PC-db-SS-ITLL" + thisUsIndex + " button",
                    accept: "images",
                    acceptMime: "image/*",
                    field: "image",
                    url: "/perinatalPlatform/basicDatabase/write/NS/US/uploadUsImg?num=10&index=" + thisUsIndex,
                    done: function(res) {
                        const imgElem = $("#PC-db-SS-ITLL" + thisUsIndex + " img");
                        if (res.code === 0) {
                            const url = res.url;
                            $("#PC-db-SS-ITLL-URL" + thisUsIndex).val(url);
                            $(imgElem).attr("src", url).attr("layer-src", url);
                            layer.photos({
                                photos: "#PC-db-SS-ITLL" + thisUsIndex,
                                anim: 5
                            });
                        } else {
                            $(imgElem).removeAttr("src layer-src");
                            return layer.msg("上传失败");
                        }
                    }
                });
                layer.photos({
                    photos: "#PC-db-CS-FL" + thisUsIndex,
                    anim: 5
                });
                layer.photos({
                    photos: "#PC-db-CS-LVAHL" + thisUsIndex,
                    anim: 5
                });
                layer.photos({
                    photos: "#PC-db-CS-TVL" + thisUsIndex,
                    anim: 5
                });
                layer.photos({
                    photos: "#PC-db-CS-LVCP-PHL" + thisUsIndex,
                    anim: 5
                });
                layer.photos({
                    photos: "#PC-db-CS-OLL" + thisUsIndex,
                    anim: 5
                });
                layer.photos({
                    photos: "#PC-db-CS-CL" + thisUsIndex,
                    anim: 5
                });
                layer.photos({
                    photos: "#PC-db-SS-MP" + thisUsIndex,
                    anim: 5
                });
                layer.photos({
                    photos: "#PC-db-SS-LVAHL" + thisUsIndex,
                    anim: 5
                });
                layer.photos({
                    photos: "#PC-db-SS-LVCP-PHL" + thisUsIndex,
                    anim: 5
                });
                layer.photos({
                    photos: "#PC-db-SS-ITLL" + thisUsIndex,
                    anim: 5
                });
                // 脑室扩增大小
                form.on("switch(LVE)", function (data) {
                    if (data.elem.checked) {
                        $("#PC-db-LVES" + thisUsIndex).removeAttr("disabled").attr("name", function () {
                            return $(this).attr("data-name");
                        });
                    } else {
                        $("#PC-db-LVES" + thisUsIndex).removeAttr("name").attr("disabled", true).val("");
                    }
                });
                form.on("switch(RVE)", function (data) {
                    if (data.elem.checked) {
                        $("#PC-db-RVES" + thisUsIndex).removeAttr("disabled").attr("name", function () {
                            return $(this).attr("data-name");
                        });
                    } else {
                        $("#PC-db-RVES" + thisUsIndex).removeAttr("name").attr("disabled", true).val("");
                    }
                });
                // 计算 神经系统 超声 异常次数
                $("#PC-db-LIR" + thisUsIndex + ">.pc-db-radioBtn-group>li").on("click", function () {
                    const value = $(this).parents(".pc-db-radioBtn-group").prev("input").val();
                    if (value === "异常") {
                        $(this).parents(".pc-db-us").addClass("pc-db-us-ab");
                    } else if (value === "正常") {
                        const rirVal = $("#PC-db-RIR" + thisUsIndex + ">input").val();
                        if (rirVal === "正常" || rirVal === "") {
                            $(this).parents(".pc-db-us").removeClass("pc-db-us-ab");
                        }
                    }
                    $("#PC-db-UAN").val($(".pc-db-us-ab").length);
                });
                $("#PC-db-RIR" + thisUsIndex + ">.pc-db-radioBtn-group>li").on("click", function () {
                    const value = $(this).parents(".pc-db-radioBtn-group").prev("input").val();
                    if (value === "异常") {
                        $(this).parents(".pc-db-us").addClass("pc-db-us-ab");
                    } else if (value === "正常") {
                        const lirVal = $("#PC-db-LIR" + thisUsIndex + ">input").val();
                        if (lirVal === "正常" || lirVal === "") {
                            $(this).parents(".pc-db-us").removeClass("pc-db-us-ab");
                        }
                    }
                    $("#PC-db-UAN").val($(".pc-db-us-ab").length);
                });
                // 删除 神经系统 超声
                $("#PC-db-usDelete" + thisUsIndex).on("click", function () {
                    const that = this;
                    layer.msg("确定要 <span class='pc-db-status-color-no'>删除</span> 此条超声检查信息吗?", {
                        icon: 7,
                        time: 0,
                        anim: 6,
                        btn: ["确定", "取消"],
                        resize: false,
                        shade: 0.8,
                        yes: function (index) {
                            $(that).parents(".pc-db-us").remove();
                            // 计算 神经系统 超声 次数
                            const usTimes = $(".pc-db-BDNSUS .pc-db-us").length;
                            $("#PC-db-UN").val(usTimes);
                            // 计算 神经系统 超声 异常 次数
                            const usAbTimes = $(".pc-db-BDNSUS .pc-db-ab-us").length;
                            $("#PC-db-UAN").val(usAbTimes);
                            layer.close(index);
                        }
                    });
                });
            }
            // 增加 神经系统 超声
            $("#PC-db-addUS").on("click", function () {
                const that = this;
                usIndex++;
                sequentialExecution(function () {
                    $(that).parent("div").before(
                        "<div id='PC-db-US" + usIndex + "' class='layui-row pc-db-us'>" +
                        "    <hr/>" +
                        "    <div class='layui-col-lg12'>" +
                        "        <div class='pc-db-h1-wrap'>" +
                        "            <h1>左侧</h1>" +
                        "        </div>" +
                        "    </div>" +
                        "    <div class='layui-col-lg4'>" +
                        "        <div class='pc-db-item pc-db-item-datetime'>" +
                        "            <label for='PC-db-LIT" + usIndex + "'>检查时间</label>" +
                        "            <input id='PC-db-LIT" + usIndex + "' type='text' name='leftInspectionTime" + usIndex + "' readonly>" +
                        "            <i class='iconfont icon-rili'></i>" +
                        "        </div>" +
                        "    </div>" +
                        "    <div class='layui-col-lg4'>" +
                        "        <div id='PC-db-LIR" + usIndex + "' class='pc-db-item'>" +
                        "            <label>结果</label>" +
                        "            <input type='hidden' name='leftInspectionResult" + usIndex + "'>" +
                        "            <ul class='pc-db-radioBtn-group pc-db-enter'>" +
                        "                <li data-value='正常'>" +
                        "                    <button>正常</button>" +
                        "                </li>" +
                        "                <li data-value='异常'>" +
                        "                    <button>异常</button>" +
                        "                </li>" +
                        "            </ul>" +
                        "        </div>" +
                        "    </div>" +
                        "    <div class='layui-col-lg4'>" +
                        "        <div class='pc-db-item'>" +
                        "            <button id='PC-db-usDelete" + usIndex + "' class='pc-btn pc-btn-danger' type='button'><i class='iconfont icon-delete'></i> 删除此条超声检查</button>" +
                        "        </div>" +
                        "    </div>" +
                        "    <div class='layui-col-lg4'>" +
                        "        <div class='pc-db-item'>" +
                        "            <label>生发层出血</label>" +
                        "            <input type='hidden' name='leftGerminalHemorrhage" + usIndex + "'>" +
                        "            <ul class='pc-db-radioBtn-group pc-db-enter'>" +
                        "                <li data-value='确诊'>" +
                        "                    <button>确诊</button>" +
                        "                </li>" +
                        "                <li data-value='疑似'>" +
                        "                    <button>疑似</button>" +
                        "                </li>" +
                        "                <li data-value='无'>" +
                        "                    <button>无</button>" +
                        "                </li>" +
                        "                <li data-value='不详'>" +
                        "                    <button>不详</button>" +
                        "                </li>" +
                        "            </ul>" +
                        "        </div>" +
                        "    </div>" +
                        "    <div class='layui-col-lg4'>" +
                        "        <div class='pc-db-item'>" +
                        "            <label>脑室内出血</label>" +
                        "            <input type='hidden' name='leftIntraventricularHemorrhage" + usIndex + "'>" +
                        "            <ul class='pc-db-radioBtn-group pc-db-enter'>" +
                        "                <li data-value='确诊'>" +
                        "                    <button>确诊</button>" +
                        "                </li>" +
                        "                <li  data-value='疑似'>" +
                        "                    <button>疑似</button>" +
                        "                </li>" +
                        "                <li data-value='无'>" +
                        "                    <button>无</button>" +
                        "                </li>" +
                        "                <li data-value='不详'>" +
                        "                    <button>不详</button>" +
                        "                </li>" +
                        "            </ul>" +
                        "        </div>" +
                        "    </div>" +
                        "    <div class='layui-col-lg4'>" +
                        "        <div class='pc-db-item'>" +
                        "            <label>脑实质病变</label>" +
                        "            <input type='hidden' name='leftParenchymalBrainDisease" + usIndex + "'>" +
                        "            <ul class='pc-db-radioBtn-group pc-db-enter'>" +
                        "                <li data-value='确诊'>" +
                        "                    <button>确诊</button>" +
                        "                </li>" +
                        "                <li data-value='疑似'>" +
                        "                    <button>疑似</button>" +
                        "                </li>" +
                        "                <li data-value='无'>" +
                        "                    <button>无</button>" +
                        "                </li>" +
                        "                <li data-value='不详'>" +
                        "                    <button>不详</button>" +
                        "                </li>" +
                        "            </ul>" +
                        "        </div>" +
                        "    </div>" +
                        "    <div class='layui-col-lg4'>" +
                        "        <div class='pc-db-item'>" +
                        "            <label>脑室旁白质软化</label>" +
                        "            <input type='hidden' name='leftPeriventricularWhiteMatterSoftening" + usIndex + "'>" +
                        "            <ul class='pc-db-radioBtn-group pc-db-enter'>" +
                        "                <li data-value='确诊'>" +
                        "                    <button>确诊</button>" +
                        "                </li>" +
                        "                <li data-value='疑似'>" +
                        "                    <button>疑似</button>" +
                        "                </li>" +
                        "                <li data-value='无'>" +
                        "                    <button>无</button>" +
                        "                </li>" +
                        "                <li data-value='不详'>" +
                        "                    <button>不详</button>" +
                        "                </li>" +
                        "            </ul>" +
                        "        </div>" +
                        "    </div>" +
                        "    <div class='layui-col-lg4'>" +
                        "        <div class='pc-db-item'>" +
                        "            <label class='pc-switch-label'>脑室扩增</label>" +
                        "            <input type='checkbox' name='leftVentricularExpansion" + usIndex + "' lay-filter='LVE' lay-skin='switch' lay-text='有|无' value='1'>" +
                        "        </div>" +
                        "    </div>" +
                        "    <div class='layui-col-lg4'>" +
                        "        <div class='pc-db-item pc-db-item-unit-lg'>" +
                        "            <label for='PC-db-LVES" + usIndex +"'>脑室扩增大小</label>" +
                        "            <input id='PC-db-LVES" + usIndex +"' type='number' data-name='leftVentricularExpansionSize" + usIndex + "' disabled>" +
                        "            <span>mm</span>" +
                        "        </div>" +
                        "    </div>" +
                        "    <div class='layui-col-lg4'>" +
                        "        <div class='pc-db-item'>" +
                        "            <label class='pc-switch-label'>脑梗塞</label>" +
                        "            <input type='checkbox' name='leftCerebralInfarction" + usIndex + "' lay-skin='switch' lay-text='有|无' value='1'>" +
                        "        </div>" +
                        "    </div>" +
                        "    <div class='layui-col-lg4'>" +
                        "        <div class='pc-db-item'>" +
                        "            <label class='pc-switch-label'>脑积水</label>" +
                        "            <input type='checkbox' name='leftHydrocephalus" + usIndex + "' lay-skin='switch' lay-text='有|无' value='1'>" +
                        "        </div>" +
                        "    </div>" +
                        "    <div class='layui-col-lg4'>" +
                        "        <div class='pc-db-item lg'>" +
                        "            <label class='pc-switch-label'>新生儿缺氧缺血性脑病</label>" +
                        "            <input type='checkbox' name='leftNeonatalHypoxicIschemicEncephalopathy" + usIndex + "' lay-skin='switch' lay-text='有|无' value='1'>" +
                        "        </div>" +
                        "    </div>" +
                        "    <div class='layui-col-lg12'>" +
                        "        <div id='PC-db-LOCD" + usIndex + "' class='pc-db-item'>" +
                        "            <label>其他中枢病变</label>" +
                        "            <div class='pc-db-item-checkbox'>" +
                        "                <input type='checkbox' name='leftOtherCentralDiseaseSubarachnoidHemorrhage" + usIndex + "' value='1' title='蛛网膜下腔出血'>" +
                        "                <input type='checkbox' name='leftOtherCentralDiseaseSubduralHemorrhage" + usIndex + "' value='1' title='硬膜下出血'>" +
                        "                <input type='checkbox' name='leftOtherCentralDiseaseTentoriumHemorrhage" + usIndex + "' value='1' title='小脑幕出血'>" +
                        "                <input type='checkbox' name='leftOtherCentralDiseaseHydrocephalus" + usIndex + "' value='1' title='脑积水'>" +
                        "                <input type='checkbox' name='leftOtherCentralDiseaseArachnoidCyst" + usIndex + "' value='1' title='蛛网膜囊肿'>" +
                        "                <input type='checkbox' name='leftOtherCentralDiseaseCaudateSulcusCyst" + usIndex + "' value='1' title='尾状沟囊肿'>" +
                        "                <input type='checkbox' name='leftOtherCentralDiseaseChoroidPlexusCyst" + usIndex + "' value='1' title='脉络丛囊肿'>" +
                        "                <input type='checkbox' name='leftOtherCentralDiseaseSubependymalCyst" + usIndex + "' value='1' title='室管膜下囊肿'>" +
                        "                <input type='checkbox' name='leftOtherCentralDiseaseOtherBrainParenchymalCysts" + usIndex + "' value='1' title='其它脑实质囊肿'>" +
                        "                <input type='checkbox' lay-filter='LOCDO" + usIndex + "' title='其它'>" +
                        "                <input id='PC-db-LOCDO" + usIndex + "' type='text' data-name='leftOtherCentralDiseaseOther" + usIndex + "' disabled>" +
                        "            </div>" +
                        "        </div>" +
                        "    </div>" +
                        "    <div class='layui-col-lg12'>" +
                        "        <div class='pc-db-h1-wrap'>" +
                        "            <h1>右侧</h1>" +
                        "        </div>" +
                        "    </div>" +
                        "    <div class='layui-col-lg4'>" +
                        "        <div class='pc-db-item pc-db-item-datetime'>" +
                        "            <label for='PC-db-RIT" + usIndex + "'>检查时间</label>" +
                        "            <input id='PC-db-RIT" + usIndex + "' type='text' name='rightInspectionTime" + usIndex + "' readonly>" +
                        "            <i class='iconfont icon-rili'></i>" +
                        "        </div>" +
                        "    </div>" +
                        "    <div class='layui-col-lg8'>" +
                        "        <div id='PC-db-RIR" + usIndex + "' class='pc-db-item'>" +
                        "            <label>结果</label>" +
                        "            <input type='hidden' name='rightInspectionResult" + usIndex + "'>" +
                        "            <ul class='pc-db-radioBtn-group pc-db-enter'>" +
                        "                <li data-value='正常'>" +
                        "                    <button>正常</button>" +
                        "                </li>" +
                        "                <li data-value='异常'>" +
                        "                    <button>异常</button>" +
                        "                </li>" +
                        "            </ul>" +
                        "        </div>" +
                        "    </div>" +
                        "    <div class='layui-col-lg4'>" +
                        "        <div class='pc-db-item'>" +
                        "            <label>生发层出血</label>" +
                        "            <input type='hidden' name='rightGerminalHemorrhage" + usIndex + "'>" +
                        "            <ul class='pc-db-radioBtn-group pc-db-enter'>" +
                        "                <li data-value='确诊'>" +
                        "                    <button>确诊</button>" +
                        "                </li>" +
                        "                <li data-value='疑似'>" +
                        "                    <button>疑似</button>" +
                        "                </li>" +
                        "                <li data-value='无'>" +
                        "                    <button>无</button>" +
                        "                </li>" +
                        "                <li data-value='不详'>" +
                        "                    <button>不详</button>" +
                        "                </li>" +
                        "            </ul>" +
                        "        </div>" +
                        "    </div>" +
                        "    <div class='layui-col-lg4'>" +
                        "        <div class='pc-db-item'>" +
                        "            <label>脑室内出血</label>" +
                        "            <input type='hidden' name='rightIntraventricularHemorrhage" + usIndex + "'>" +
                        "            <ul class='pc-db-radioBtn-group pc-db-enter'>" +
                        "                <li data-value='确诊'>" +
                        "                    <button>确诊</button>" +
                        "                </li>" +
                        "                <li  data-value='疑似'>" +
                        "                    <button>疑似</button>" +
                        "                </li>" +
                        "                <li data-value='无'>" +
                        "                    <button>无</button>" +
                        "                </li>" +
                        "                <li data-value='不详'>" +
                        "                    <button>不详</button>" +
                        "                </li>" +
                        "            </ul>" +
                        "        </div>" +
                        "    </div>" +
                        "    <div class='layui-col-lg4'>" +
                        "        <div class='pc-db-item'>" +
                        "            <label>脑实质病变</label>" +
                        "            <input type='hidden' name='rightParenchymalBrainDisease" + usIndex + "'>" +
                        "            <ul class='pc-db-radioBtn-group pc-db-enter'>" +
                        "                <li data-value='确诊'>" +
                        "                    <button>确诊</button>" +
                        "                </li>" +
                        "                <li data-value='疑似'>" +
                        "                    <button>疑似</button>" +
                        "                </li>" +
                        "                <li data-value='无'>" +
                        "                    <button>无</button>" +
                        "                </li>" +
                        "                <li data-value='不详'>" +
                        "                    <button>不详</button>" +
                        "                </li>" +
                        "            </ul>" +
                        "        </div>" +
                        "    </div>" +
                        "    <div class='layui-col-lg4'>" +
                        "        <div class='pc-db-item'>" +
                        "            <label>脑室旁白质软化</label>" +
                        "            <input type='hidden' name='rightPeriventricularWhiteMatterSoftening" + usIndex + "'>" +
                        "            <ul class='pc-db-radioBtn-group pc-db-enter'>" +
                        "                <li data-value='确诊'>" +
                        "                    <button>确诊</button>" +
                        "                </li>" +
                        "                <li data-value='疑似'>" +
                        "                    <button>疑似</button>" +
                        "                </li>" +
                        "                <li data-value='无'>" +
                        "                    <button>无</button>" +
                        "                </li>" +
                        "                <li data-value='不详'>" +
                        "                    <button>不详</button>" +
                        "                </li>" +
                        "            </ul>" +
                        "        </div>" +
                        "    </div>" +
                        "    <div class='layui-col-lg4'>" +
                        "        <div class='pc-db-item'>" +
                        "            <label class='pc-switch-label'>脑室扩增</label>" +
                        "            <input type='checkbox' name='rightVentricularExpansion" + usIndex + "' lay-filter='RVE' lay-skin='switch' lay-text='有|无' value='1'>" +
                        "        </div>" +
                        "    </div>" +
                        "    <div class='layui-col-lg4'>" +
                        "        <div class='pc-db-item pc-db-item-unit-lg'>" +
                        "            <label for='PC-db-RVES" + usIndex + "'>脑室扩增大小</label>" +
                        "            <input id='PC-db-RVES" + usIndex + "' type='number' data-name='rightVentricularExpansionSize" + usIndex + "' disabled>" +
                        "            <span>mm</span>" +
                        "        </div>" +
                        "    </div>" +
                        "    <div class='layui-col-lg4'>" +
                        "        <div class='pc-db-item'>" +
                        "            <label class='pc-switch-label'>脑梗塞</label>" +
                        "            <input type='checkbox' name='rightCerebralInfarction" + usIndex + "' lay-skin='switch' lay-text='有|无' value='1'>" +
                        "        </div>" +
                        "    </div>" +
                        "    <div class='layui-col-lg4'>" +
                        "        <div class='pc-db-item'>" +
                        "            <label class='pc-switch-label'>脑积水</label>" +
                        "            <input type='checkbox' name='rightHydrocephalus" + usIndex + "' lay-skin='switch' lay-text='有|无' value='1'>" +
                        "        </div>" +
                        "    </div>" +
                        "    <div class='layui-col-lg4'>" +
                        "        <div class='pc-db-item lg'>" +
                        "            <label class='pc-switch-label'>新生儿缺氧缺血性脑病</label>" +
                        "            <input type='checkbox' name='rightNeonatalHypoxicIschemicEncephalopathy" + usIndex + "' lay-skin='switch' lay-text='有|无' value='1'>" +
                        "        </div>" +
                        "    </div>" +
                        "    <div class='layui-col-lg12'>" +
                        "        <div id='PC-db-ROCD" + usIndex + "' class='pc-db-item'>" +
                        "            <label>其他中枢病变</label>" +
                        "            <div class='pc-db-item-checkbox'>" +
                        "                <input type='checkbox' name='rightOtherCentralDiseaseSubarachnoidHemorrhage" + usIndex + "' value='1' title='蛛网膜下腔出血'>" +
                        "                <input type='checkbox' name='rightOtherCentralDiseaseSubduralHemorrhage" + usIndex + "' value='1' title='硬膜下出血'>" +
                        "                <input type='checkbox' name='rightOtherCentralDiseaseTentoriumHemorrhage" + usIndex + "' value='1' title='小脑幕出血'>" +
                        "                <input type='checkbox' name='rightOtherCentralDiseaseHydrocephalus" + usIndex + "' value='1' title='脑积水'>" +
                        "                <input type='checkbox' name='rightOtherCentralDiseaseArachnoidCyst" + usIndex + "' value='1' title='蛛网膜囊肿'>" +
                        "                <input type='checkbox' name='rightOtherCentralDiseaseCaudateSulcusCyst" + usIndex + "' value='1' title='尾状沟囊肿'>" +
                        "                <input type='checkbox' name='rightOtherCentralDiseaseChoroidPlexusCyst" + usIndex + "' value='1' title='脉络丛囊肿'>" +
                        "                <input type='checkbox' name='rightOtherCentralDiseaseSubependymalCyst" + usIndex + "' value='1' title='室管膜下囊肿'>" +
                        "                <input type='checkbox' name='rightOtherCentralDiseaseOtherBrainParenchymalCysts" + usIndex + "' value='1' title='其它脑实质囊肿'>" +
                        "                <input type='checkbox' lay-filter='ROCDO" + usIndex + "' title='其它'>" +
                        "                <input id='PC-db-ROCDO" + usIndex + "' type='text' data-name='rightOtherCentralDiseaseOther" + usIndex + "' disabled>" +
                        "            </div>" +
                        "        </div>" +
                        "    </div>" +
                        "    <div class='layui-col-lg12'>" +
                        "        <div class='pc-db-h1-wrap'>" +
                        "            <h1>超声10个层面图像</h1>" +
                        "        </div>" +
                        "    </div>" +
                        "    <div class='layui-col-lg12'>" +
                        "        <div>" +
                        "            <div class='pc-db-head'>" +
                        "                <label>冠状面扫描</label>" +
                        "            </div>" +
                        "            <div id='PC-db-CS-FL" + usIndex + "' class='pc-db-images'>" +
                        "                <div>额叶层面</div>" +
                        "                <div>" +
                        "                    <button class='pc-btn' type='button'>点击上传图片</button>" +
                        "                </div>" +
                        "                <img src=''/>" +
                        "                <input id='PC-db-CS-FL-URL" + usIndex + "' type='hidden' name='csFlUrl" + usIndex + "'>" +
                        "            </div>" +
                        "            <div id='PC-db-CS-LVAHL" + usIndex + "' class='pc-db-images'>" +
                        "                <div>侧脑室前角层面</div>" +
                        "                <div>" +
                        "                    <button class='pc-btn' type='button'>点击上传图片</button>" +
                        "                </div>" +
                        "                <img src=''/>" +
                        "                <input id='PC-db-CS-LVAHL-URL" + usIndex + "' type='hidden' name='csLvahlUrl" + usIndex + "'>" +
                        "            </div>" +
                        "            <div id='PC-db-CS-TVL" + usIndex + "' class='pc-db-images'>" +
                        "                <div>第3脑室层面</div>" +
                        "                <div>" +
                        "                    <button class='pc-btn' type='button'>点击上传图片</button>" +
                        "                </div>" +
                        "                <img src=''/>" +
                        "                <input id='PC-db-CS-TVL-URL" + usIndex + "' type='hidden' name='csTvlUrl" + usIndex + "'>" +
                        "            </div>" +
                        "            <div id='PC-db-CS-LVCP-PHL" + usIndex + "' class='pc-db-images'>" +
                        "                <div>侧脑室中央部——后角层面</div>" +
                        "                <div>" +
                        "                    <button class='pc-btn' type='button'>点击上传图片</button>" +
                        "                </div>" +
                        "                <img src=''/>" +
                        "                <input id='PC-db-CS-LVCP-PHL-URL" + usIndex + "' type='hidden' name='csLvcpPhlUrl" + usIndex + "'>" +
                        "            </div>" +
                        "            <div id='PC-db-CS-OLL" + usIndex + "' class='pc-db-images'>" +
                        "                <div>枕叶层面</div>" +
                        "                <div>" +
                        "                    <button class='pc-btn' type='button'>点击上传图片</button>" +
                        "                </div>" +
                        "                <img src=''/>" +
                        "                <input id='PC-db-CS-OLL-URL" + usIndex + "' type='hidden' name='csOllUrl" + usIndex + "'>" +
                        "            </div>" +
                        "            <div id='PC-db-CS-CL" + usIndex + "' class='pc-db-images'>" +
                        "                <div>小脑层面</div>" +
                        "                <div>" +
                        "                    <button class='pc-btn' type='button'>点击上传图片</button>" +
                        "                </div>" +
                        "                <img src=''/>" +
                        "                <input id='PC-db-CS-CL-URL" + usIndex + "' type='hidden' name='csClUrl" + usIndex + "'>" +
                        "            </div>" +
                        "        </div>" +
                        "        <div>" +
                        "            <div class='pc-db-head'>" +
                        "                <label>矢状面扫描</label>" +
                        "            </div>" +
                        "            <div id='PC-db-SS-MP" + usIndex + "' class='pc-db-images'>" +
                        "                <div>正中矢状面</div>" +
                        "                <div>" +
                        "                    <button class='pc-btn' type='button'>点击上传图片</button>" +
                        "                </div>" +
                        "                <img src=''/>" +
                        "                <input id='PC-db-SS-MP-URL" + usIndex + "' type='hidden' name='ssMpUrl" + usIndex + "'>" +
                        "            </div>" +
                        "            <div id='PC-db-SS-LVAHL" + usIndex + "' class='pc-db-images'>" +
                        "                <div>侧脑室前角层面</div>" +
                        "                <div>" +
                        "                    <button class='pc-btn' type='button'>点击上传图片</button>" +
                        "                </div>" +
                        "                <img src=''/>" +
                        "                <input id='PC-db-SS-LVAHL-URL" + usIndex + "' type='hidden' name='ssLvahlUrl" + usIndex + "'>" +
                        "            </div>" +
                        "            <div id='PC-db-SS-LVCP-PHL" + usIndex + "' class='pc-db-images'>" +
                        "                <div>侧脑室中央部——后角层面</div>" +
                        "                <div>" +
                        "                    <button class='pc-btn' type='button'>点击上传图片</button>" +
                        "                </div>" +
                        "                <img src=''/>" +
                        "                <input id='PC-db-SS-LVCP-PHL-URL" + usIndex + "' type='hidden' name='ssLvcpPhlUrl" + usIndex + "'>" +
                        "            </div>" +
                        "            <div id='PC-db-SS-ITLL" + usIndex + "' class='pc-db-images'>" +
                        "                <div>脑岛颞叶层面</div>" +
                        "                <div>" +
                        "                    <button class='pc-btn' type='button'>点击上传图片</button>" +
                        "                </div>" +
                        "                <img src=''/>" +
                        "                <input id='PC-db-SS-ITLL-URL" + usIndex + "' type='hidden' name='ssItllUrl" + usIndex + "'>" +
                        "            </div>" +
                        "        </div>" +
                        "    </div>" +
                        "    <div class='layui-col-lg12'>" +
                        "        <div class='pc-db-h1-wrap'>" +
                        "            <h1>说明</h1>" +
                        "        </div>" +
                        "    </div>" +
                        "    <div class='layui-col-lg12'>" +
                        "        <div class='pc-db-item'>" +
                        "            <textarea rows='6' cols='40' name='ultrasoundExplanation" + usIndex + "'></textarea>" +
                        "        </div>" +
                        "    </div>" +
                        "</div>");
                }, function () {
                    form.render("checkbox");
                }, function () {
                    const thisUsIndex = usIndex;
                    $("#PC-db-US" + thisUsIndex + " .pc-db-radioBtn-group>li").on("click", function () {
                        activeRBGChoice(this);
                    });
                    ocdHeight("L", thisUsIndex);
                    ocdHeight("R", thisUsIndex);
                    // 点击label实现switch开关
                    $(".pc-switch-label").on("click", function () {
                        $(this).nextAll(".layui-form-switch").click();
                    });
                }, function () {
                    const thisUsIndex = usIndex;
                    laydate.render({
                        elem: "#PC-db-LIT" + thisUsIndex,
                        type: "datetime",
                        format: "yyyy-MM-dd HH:mm:ss",
                        max: 1
                    });
                    laydate.render({
                        elem: "#PC-db-RIT" + thisUsIndex,
                        type: "datetime",
                        format: "yyyy-MM-dd HH:mm:ss",
                        max: 1
                    });
                    // 左侧 其他中枢病变 其他
                    form.on("checkbox(LOCDO" + thisUsIndex + ")", function (data) {
                        if (data.elem.checked) {
                            $("#PC-db-LOCDO" + thisUsIndex).removeAttr("disabled").attr("name", function () {
                               return $(this).attr("data-name");
                            });
                        } else {
                            $("#PC-db-LOCDO" + thisUsIndex).removeAttr("name").attr("disabled", true).val("");
                        }
                    });
                    // 右侧 其他中枢病变 其他
                    form.on("checkbox(ROCDO" + thisUsIndex + ")", function (data) {
                        if (data.elem.checked) {
                            $("#PC-db-ROCDO" + thisUsIndex).removeAttr("disabled").attr("name", function () {
                                return $(this).attr("data-name");
                            });
                        } else {
                            $("#PC-db-ROCDO" + thisUsIndex).removeAttr("name").attr("disabled", true).val("");
                        }
                    });
                    upload.render({
                        elem: "#PC-db-CS-FL" + thisUsIndex + " button",
                        accept: "images",
                        acceptMime: "image/*",
                        field: "image",
                        url: "/perinatalPlatform/basicDatabase/write/NS/US/uploadUsImg?num=1&index=" + thisUsIndex,
                        done: function(res) {
                            const imgElem = $("#PC-db-CS-FL" + thisUsIndex + " img");
                            if (res.code === 0) {
                                const url = res.url;
                                $("#PC-db-CS-FL-URL" + thisUsIndex).val(url);
                                $(imgElem).attr("src", url).attr("layer-src", url);
                                layer.photos({
                                    photos: "#PC-db-CS-FL" + thisUsIndex,
                                    anim: 5
                                });
                            } else {
                                $(imgElem).removeAttr("src layer-src");
                                return layer.msg("上传失败");
                            }
                        }
                    });
                    upload.render({
                        elem: "#PC-db-CS-LVAHL" + thisUsIndex + " button",
                        accept: "images",
                        acceptMime: "image/*",
                        field: "image",
                        url: "/perinatalPlatform/basicDatabase/write/NS/US/uploadUsImg?num=2&index=" + thisUsIndex,
                        done: function(res) {
                            const imgElem = $("#PC-db-CS-LVAHL" + thisUsIndex + " img");
                            if (res.code === 0) {
                                const url = res.url;
                                $("#PC-db-CS-LVAHL-URL" + thisUsIndex).val(url);
                                $(imgElem).attr("src", url).attr("layer-src", url);
                                layer.photos({
                                    photos: "#PC-db-CS-LVAHL" + thisUsIndex,
                                    anim: 5
                                });
                            } else {
                                $(imgElem).removeAttr("src layer-src");
                                return layer.msg("上传失败");
                            }
                        }
                    });
                    upload.render({
                        elem: "#PC-db-CS-TVL" + thisUsIndex + " button",
                        accept: "images",
                        acceptMime: "image/*",
                        field: "image",
                        url: "/perinatalPlatform/basicDatabase/write/NS/US/uploadUsImg?num=3&index=" + thisUsIndex,
                        done: function(res) {
                            const imgElem = $("#PC-db-CS-TVL" + thisUsIndex + " img");
                            if (res.code === 0) {
                                const url = res.url;
                                $("#PC-db-CS-TVL-URL" + thisUsIndex).val(url);
                                $(imgElem).attr("src", url).attr("layer-src", url);
                                layer.photos({
                                    photos: "#PC-db-CS-TVL" + thisUsIndex,
                                    anim: 5
                                });
                            } else {
                                $(imgElem).removeAttr("src layer-src");
                                return layer.msg("上传失败");
                            }
                        }
                    });
                    upload.render({
                        elem: "#PC-db-CS-LVCP-PHL" + thisUsIndex + " button",
                        accept: "images",
                        acceptMime: "image/*",
                        field: "image",
                        url: "/perinatalPlatform/basicDatabase/write/NS/US/uploadUsImg?num=4&index=" + thisUsIndex,
                        done: function(res) {
                            const imgElem = $("#PC-db-CS-LVCP-PHL" + thisUsIndex + " img");
                            if (res.code === 0) {
                                const url = res.url;
                                $("#PC-db-CS-LVCP-PHL-URL" + thisUsIndex).val(url);
                                $(imgElem).attr("src", url).attr("layer-src", url);
                                layer.photos({
                                    photos: "#PC-db-CS-LVCP-PHL" + thisUsIndex,
                                    anim: 5
                                });
                            } else {
                                $(imgElem).removeAttr("src layer-src");
                                return layer.msg("上传失败");
                            }
                        }
                    });
                    upload.render({
                        elem: "#PC-db-CS-OLL" + thisUsIndex + " button",
                        accept: "images",
                        acceptMime: "image/*",
                        field: "image",
                        url: "/perinatalPlatform/basicDatabase/write/NS/US/uploadUsImg?num=5&index=" + thisUsIndex,
                        done: function(res) {
                            const imgElem = $("#PC-db-CS-OLL" + thisUsIndex + " img");
                            if (res.code === 0) {
                                const url = res.url;
                                $("#PC-db-CS-OLL-URL" + thisUsIndex).val(url);
                                $(imgElem).attr("src", url).attr("layer-src", url);
                                layer.photos({
                                    photos: "#PC-db-CS-OLL" + thisUsIndex,
                                    anim: 5
                                });
                            } else {
                                $(imgElem).removeAttr("src layer-src");
                                return layer.msg("上传失败");
                            }
                        }
                    });
                    upload.render({
                        elem: "#PC-db-CS-CL" + thisUsIndex + " button",
                        accept: "images",
                        acceptMime: "image/*",
                        field: "image",
                        url: "/perinatalPlatform/basicDatabase/write/NS/US/uploadUsImg?num=6&index=" + thisUsIndex,
                        done: function(res) {
                            const imgElem = $("#PC-db-CS-CL" + thisUsIndex + " img");
                            if (res.code === 0) {
                                const url = res.url;
                                $("#PC-db-CS-CL-URL" + thisUsIndex).val(url);
                                $(imgElem).attr("src", url).attr("layer-src", url);
                                layer.photos({
                                    photos: "#PC-db-CS-CL" + thisUsIndex,
                                    anim: 5
                                });
                            } else {
                                $(imgElem).removeAttr("src layer-src");
                                return layer.msg("上传失败");
                            }
                        }
                    });
                    upload.render({
                        elem: "#PC-db-SS-MP" + thisUsIndex + " button",
                        accept: "images",
                        acceptMime: "image/*",
                        field: "image",
                        url: "/perinatalPlatform/basicDatabase/write/NS/US/uploadUsImg?num=7&index=" + thisUsIndex,
                        done: function(res) {
                            const imgElem = $("#PC-db-SS-MP" + thisUsIndex + " img");
                            if (res.code === 0) {
                                const url = res.url;
                                $("#PC-db-SS-MP-URL" + thisUsIndex).val(url);
                                $(imgElem).attr("src", url).attr("layer-src", url);
                                layer.photos({
                                    photos: "#PC-db-SS-MP" + thisUsIndex,
                                    anim: 5
                                });
                            } else {
                                $(imgElem).removeAttr("src layer-src");
                                return layer.msg("上传失败");
                            }
                        }
                    });
                    upload.render({
                        elem: "#PC-db-SS-LVAHL" + thisUsIndex + " button",
                        accept: "images",
                        acceptMime: "image/*",
                        field: "image",
                        url: "/perinatalPlatform/basicDatabase/write/NS/US/uploadUsImg?num=8&index=" + thisUsIndex,
                        done: function(res) {
                            const imgElem = $("#PC-db-SS-LVAHL" + thisUsIndex + " img");
                            if (res.code === 0) {
                                const url = res.url;
                                $("#PC-db-SS-LVAHL-URL" + thisUsIndex).val(url);
                                $(imgElem).attr("src", url).attr("layer-src", url);
                                layer.photos({
                                    photos: "#PC-db-SS-LVAHL" + thisUsIndex,
                                    anim: 5
                                });
                            } else {
                                $(imgElem).removeAttr("src layer-src");
                                return layer.msg("上传失败");
                            }
                        }
                    });
                    upload.render({
                        elem: "#PC-db-SS-LVCP-PHL" + thisUsIndex + " button",
                        accept: "images",
                        acceptMime: "image/*",
                        field: "image",
                        url: "/perinatalPlatform/basicDatabase/write/NS/US/uploadUsImg?num=9&index=" + thisUsIndex,
                        done: function(res) {
                            const imgElem = $("#PC-db-SS-LVCP-PHL" + thisUsIndex + " img");
                            if (res.code === 0) {
                                const url = res.url;
                                $("#PC-db-SS-LVCP-PHL-URL" + thisUsIndex).val(url);
                                $(imgElem).attr("src", url).attr("layer-src", url);
                                layer.photos({
                                    photos: "#PC-db-SS-LVCP-PHL" + thisUsIndex,
                                    anim: 5
                                });
                            } else {
                                $(imgElem).removeAttr("src layer-src");
                                return layer.msg("上传失败");
                            }
                        }
                    });
                    upload.render({
                        elem: "#PC-db-SS-ITLL" + thisUsIndex + " button",
                        accept: "images",
                        acceptMime: "image/*",
                        field: "image",
                        url: "/perinatalPlatform/basicDatabase/write/NS/US/uploadUsImg?num=10&index=" + thisUsIndex,
                        done: function(res) {
                            const imgElem = $("#PC-db-SS-ITLL" + thisUsIndex + " img");
                            if (res.code === 0) {
                                const url = res.url;
                                $("#PC-db-SS-ITLL-URL" + thisUsIndex).val(url);
                                $(imgElem).attr("src", url).attr("layer-src", url);
                                layer.photos({
                                    photos: "#PC-db-SS-ITLL" + thisUsIndex,
                                    anim: 5
                                });
                            } else {
                                $(imgElem).removeAttr("src layer-src");
                                return layer.msg("上传失败");
                            }
                        }
                    });
                    // 脑室扩增大小
                    form.on("switch(LVE)", function (data) {
                        if (data.elem.checked) {
                            $("#PC-db-LVES" + thisUsIndex).removeAttr("disabled").attr("name", function () {
                                return $(this).attr("data-name");
                            });
                        } else {
                            $("#PC-db-LVES" + thisUsIndex).removeAttr("name").attr("disabled", true).val("");
                        }
                    });
                    form.on("switch(RVE)", function (data) {
                        if (data.elem.checked) {
                            $("#PC-db-RVES" + thisUsIndex).removeAttr("disabled").attr("name", function () {
                               return $(this).attr("data-name");
                            });
                        } else {
                            $("#PC-db-RVES" + thisUsIndex).removeAttr("name").attr("disabled", true).val("");
                        }
                    });
                    // 计算 神经系统 超声 异常次数
                    $("#PC-db-LIR" + thisUsIndex + ">.pc-db-radioBtn-group>li").on("click", function () {
                        const value = $(this).parents(".pc-db-radioBtn-group").prev("input").val();
                        if (value === "异常") {
                            $(this).parents(".pc-db-us").addClass("pc-db-us-ab");
                        } else if (value === "正常") {
                            const rirVal = $("#PC-db-RIR" + thisUsIndex + ">input").val();
                            if (rirVal === "正常" || rirVal === "") {
                                $(this).parents(".pc-db-us").removeClass("pc-db-us-ab");
                            }
                        }
                        $("#PC-db-UAN").val($(".pc-db-us-ab").length);
                    });
                    $("#PC-db-RIR" + thisUsIndex + ">.pc-db-radioBtn-group>li").on("click", function () {
                        const value = $(this).parents(".pc-db-radioBtn-group").prev("input").val();
                        if (value === "异常") {
                            $(this).parents(".pc-db-us").addClass("pc-db-us-ab");
                        } else if (value === "正常") {
                            const lirVal = $("#PC-db-LIR" + thisUsIndex + ">input").val();
                            if (lirVal === "正常" || lirVal === "") {
                                $(this).parents(".pc-db-us").removeClass("pc-db-us-ab");
                            }
                        }
                        $("#PC-db-UAN").val($(".pc-db-us-ab").length);
                    });
                    // 计算 神经系统 超声 次数
                    const usTimes = $(".pc-db-BDNSUS .pc-db-us").length;
                    $("#PC-db-UN").val(usTimes);
                    // 删除 神经系统 超声
                    $("#PC-db-usDelete" + thisUsIndex).on("click", function () {
                        const that = this;
                        layer.msg("确定要 <span class='pc-db-status-color-no'>删除</span> 此条超声检查信息吗?", {
                            icon: 7,
                            time: 0,
                            anim: 6,
                            btn: ["确定", "取消"],
                            resize: false,
                            shade: 0.8,
                            yes: function (index) {
                                $(that).parents(".pc-db-us").remove();
                                // 计算 神经系统 超声 次数
                                const usTimes = $(".pc-db-BDNSUS .pc-db-us").length;
                                $("#PC-db-UN").val(usTimes);
                                // 计算 神经系统 超声 异常 次数
                                const usAbTimes = $(".pc-db-BDNSUS .pc-db-ab-us").length;
                                $("#PC-db-UAN").val(usAbTimes);
                                layer.close(index);
                            }
                        });
                    });
                });
            });

            // 基础数据库 神经系统 超声 添加/编辑 信息 提交
            form.on("submit(NSUS)", function (data) {
                const doing = "保存信息";
                loading(doing);
                let field = data.field, subData = {}, usArray = [], flag = false;
                for (let i = 1; i <= usIndex; i++) {
                    let usJson = {};
                    if (notNullTool(field["leftInspectionTime" + i])) {
                        usJson.leftInspectionTime = field["leftInspectionTime" + i];
                    }
                    if (notNullTool(field["leftInspectionResult" + i])) {
                        usJson.leftInspectionResult = field["leftInspectionResult" + i];
                    }
                    if (notNullTool(field["leftGerminalHemorrhage" + i])) {
                        usJson.leftGerminalHemorrhage = field["leftGerminalHemorrhage" + i];
                    }
                    if (notNullTool(field["leftIntraventricularHemorrhage" + i])) {
                        usJson.leftIntraventricularHemorrhage = field["leftIntraventricularHemorrhage" + i];
                    }
                    if (notNullTool(field["leftParenchymalBrainDisease" + i])) {
                        usJson.leftParenchymalBrainDisease = field["leftParenchymalBrainDisease" + i];
                    }
                    if (notNullTool(field["leftPeriventricularWhiteMatterSoftening" + i])) {
                        usJson.leftPeriventricularWhiteMatterSoftening = field["leftPeriventricularWhiteMatterSoftening" + i];
                    }
                    if (notNullTool(field["leftVentricularExpansion" + i])) {
                        usJson.leftVentricularExpansion = field["leftVentricularExpansion" + i];
                    }
                    if (notNullTool(field["leftVentricularExpansionSize" + i])) {
                        usJson.leftVentricularExpansionSize = field["leftVentricularExpansionSize" + i];
                    }
                    if (notNullTool(field["leftCerebralInfarction" + i])) {
                        usJson.leftCerebralInfarction = field["leftCerebralInfarction" + i];
                    }
                    if (notNullTool(field["leftHydrocephalus" + i])) {
                        usJson.leftHydrocephalus = field["leftHydrocephalus" + i];
                    }
                    if (notNullTool(field["leftNeonatalHypoxicIschemicEncephalopathy" + i])) {
                        usJson.leftNeonatalHypoxicIschemicEncephalopathy = field["leftNeonatalHypoxicIschemicEncephalopathy" + i];
                    }
                    if (notNullTool(field["leftOtherCentralDiseaseSubarachnoidHemorrhage" + i])) {
                        usJson.leftOtherCentralDiseaseSubarachnoidHemorrhage = field["leftOtherCentralDiseaseSubarachnoidHemorrhage" + i];
                    }
                    if (notNullTool(field["leftOtherCentralDiseaseSubduralHemorrhage" + i])) {
                        usJson.leftOtherCentralDiseaseSubduralHemorrhage = field["leftOtherCentralDiseaseSubduralHemorrhage" + i];
                    }
                    if (notNullTool(field["leftOtherCentralDiseaseTentoriumHemorrhage" + i])) {
                        usJson.leftOtherCentralDiseaseTentoriumHemorrhage = field["leftOtherCentralDiseaseTentoriumHemorrhage" + i];
                    }
                    if (notNullTool(field["leftOtherCentralDiseaseHydrocephalus" + i])) {
                        usJson.leftOtherCentralDiseaseHydrocephalus = field["leftOtherCentralDiseaseHydrocephalus" + i];
                    }
                    if (notNullTool(field["leftOtherCentralDiseaseArachnoidCyst" + i])) {
                        usJson.leftOtherCentralDiseaseArachnoidCyst = field["leftOtherCentralDiseaseArachnoidCyst" + i];
                    }
                    if (notNullTool(field["leftOtherCentralDiseaseCaudateSulcusCyst" + i])) {
                        usJson.leftOtherCentralDiseaseCaudateSulcusCyst = field["leftOtherCentralDiseaseCaudateSulcusCyst" + i];
                    }
                    if (notNullTool(field["leftOtherCentralDiseaseChoroidPlexusCyst" + i])) {
                        usJson.leftOtherCentralDiseaseChoroidPlexusCyst = field["leftOtherCentralDiseaseChoroidPlexusCyst" + i];
                    }
                    if (notNullTool(field["leftOtherCentralDiseaseSubependymalCyst" + i])) {
                        usJson.leftOtherCentralDiseaseSubependymalCyst = field["leftOtherCentralDiseaseSubependymalCyst" + i];
                    }
                    if (notNullTool(field["leftOtherCentralDiseaseOtherBrainParenchymalCysts" + i])) {
                        usJson.leftOtherCentralDiseaseOtherBrainParenchymalCysts = field["leftOtherCentralDiseaseOtherBrainParenchymalCysts" + i];
                    }
                    if (notNullTool(field["leftOtherCentralDiseaseOther" + i])) {
                        usJson.leftOtherCentralDiseaseOther = field["leftOtherCentralDiseaseOther" + i];
                    }
                    if (notNullTool(field["rightInspectionTime" + i])) {
                        usJson.rightInspectionTime = field["rightInspectionTime" + i];
                    }
                    if (notNullTool(field["rightInspectionResult" + i])) {
                        usJson.rightInspectionResult = field["rightInspectionResult" + i];
                    }
                    if (notNullTool(field["rightGerminalHemorrhage" + i])) {
                        usJson.rightGerminalHemorrhage = field["rightGerminalHemorrhage" + i];
                    }
                    if (notNullTool(field["rightIntraventricularHemorrhage" + i])) {
                        usJson.rightIntraventricularHemorrhage = field["rightIntraventricularHemorrhage" + i];
                    }
                    if (notNullTool(field["rightParenchymalBrainDisease" + i])) {
                        usJson.rightParenchymalBrainDisease = field["rightParenchymalBrainDisease" + i];
                    }
                    if (notNullTool(field["rightPeriventricularWhiteMatterSoftening" + i])) {
                        usJson.rightPeriventricularWhiteMatterSoftening = field["rightPeriventricularWhiteMatterSoftening" + i];
                    }
                    if (notNullTool(field["rightVentricularExpansion" + i])) {
                        usJson.rightVentricularExpansion = field["rightVentricularExpansion" + i];
                    }
                    if (notNullTool(field["rightVentricularExpansionSize" + i])) {
                        usJson.rightVentricularExpansionSize = field["rightVentricularExpansionSize" + i];
                    }
                    if (notNullTool(field["rightCerebralInfarction" + i])) {
                        usJson.rightCerebralInfarction = field["rightCerebralInfarction" + i];
                    }
                    if (notNullTool(field["rightHydrocephalus" + i])) {
                        usJson.rightHydrocephalus = field["rightHydrocephalus" + i];
                    }
                    if (notNullTool(field["rightNeonatalHypoxicIschemicEncephalopathy" + i])) {
                        usJson.rightNeonatalHypoxicIschemicEncephalopathy = field["rightNeonatalHypoxicIschemicEncephalopathy" + i];
                    }
                    if (notNullTool(field["rightOtherCentralDiseaseSubarachnoidHemorrhage" + i])) {
                        usJson.rightOtherCentralDiseaseSubarachnoidHemorrhage = field["rightOtherCentralDiseaseSubarachnoidHemorrhage" + i];
                    }
                    if (notNullTool(field["rightOtherCentralDiseaseSubduralHemorrhage" + i])) {
                        usJson.rightOtherCentralDiseaseSubduralHemorrhage = field["rightOtherCentralDiseaseSubduralHemorrhage" + i];
                    }
                    if (notNullTool(field["rightOtherCentralDiseaseTentoriumHemorrhage" + i])) {
                        usJson.rightOtherCentralDiseaseTentoriumHemorrhage = field["rightOtherCentralDiseaseTentoriumHemorrhage" + i];
                    }
                    if (notNullTool(field["rightOtherCentralDiseaseHydrocephalus" + i])) {
                        usJson.rightOtherCentralDiseaseHydrocephalus = field["rightOtherCentralDiseaseHydrocephalus" + i];
                    }
                    if (notNullTool(field["rightOtherCentralDiseaseArachnoidCyst" + i])) {
                        usJson.rightOtherCentralDiseaseArachnoidCyst = field["rightOtherCentralDiseaseArachnoidCyst" + i];
                    }
                    if (notNullTool(field["rightOtherCentralDiseaseCaudateSulcusCyst" + i])) {
                        usJson.rightOtherCentralDiseaseCaudateSulcusCyst = field["rightOtherCentralDiseaseCaudateSulcusCyst" + i];
                    }
                    if (notNullTool(field["rightOtherCentralDiseaseChoroidPlexusCyst" + i])) {
                        usJson.rightOtherCentralDiseaseChoroidPlexusCyst = field["rightOtherCentralDiseaseChoroidPlexusCyst" + i];
                    }
                    if (notNullTool(field["rightOtherCentralDiseaseSubependymalCyst" + i])) {
                        usJson.rightOtherCentralDiseaseSubependymalCyst = field["rightOtherCentralDiseaseSubependymalCyst" + i];
                    }
                    if (notNullTool(field["rightOtherCentralDiseaseOtherBrainParenchymalCysts" + i])) {
                        usJson.rightOtherCentralDiseaseOtherBrainParenchymalCysts = field["rightOtherCentralDiseaseOtherBrainParenchymalCysts" + i];
                    }
                    if (notNullTool(field["rightOtherCentralDiseaseOther" + i])) {
                        usJson.rightOtherCentralDiseaseOther = field["rightOtherCentralDiseaseOther" + i];
                    }
                    if (notNullTool(field["csFlUrl" + i])) {
                        usJson.csFlUrl = field["csFlUrl" + i];
                    }
                    if (notNullTool(field["csLvahlUrl" + i])) {
                        usJson.csLvahlUrl = field["csLvahlUrl" + i];
                    }
                    if (notNullTool(field["csTvlUrl" + i])) {
                        usJson.csTvlUrl = field["csTvlUrl" + i];
                    }
                    if (notNullTool(field["csLvcpPhlUrl" + i])) {
                        usJson.csLvcpPhlUrl = field["csLvcpPhlUrl" + i];
                    }
                    if (notNullTool(field["csOllUrl" + i])) {
                        usJson.csOllUrl = field["csOllUrl" + i];
                    }
                    if (notNullTool(field["csClUrl" + i])) {
                        usJson.csClUrl = field["csClUrl" + i];
                    }
                    if (notNullTool(field["ssMpUrl" + i])) {
                        usJson.ssMpUrl = field["ssMpUrl" + i];
                    }
                    if (notNullTool(field["ssLvahlUrl" + i])) {
                        usJson.ssLvahlUrl = field["ssLvahlUrl" + i];
                    }
                    if (notNullTool(field["ssLvcpPhlUrl" + i])) {
                        usJson.ssLvcpPhlUrl = field["ssLvcpPhlUrl" + i];
                    }
                    if (notNullTool(field["ssItllUrl" + i])) {
                        usJson.ssItllUrl = field["ssItllUrl" + i];
                    }
                    if (notNullTool(field["ultrasoundExplanation" + i])) {
                        usJson.ultrasoundExplanation = field["ultrasoundExplanation" + i];
                    }
                    if (Object.keys(usJson).length > 0) {
                        usArray.push(usJson);
                    }
                }
                subData.checkNumber = field.ultrasonographyNumber;
                subData.checkAbnormalNumber = field.ultrasonographyAbnormalNumber;
                subData.usArray = JSON.stringify(usArray);
                $.post("/perinatalPlatform/basicDatabase/write/NS/US/post", subData, function (back, status) {
                    if(status === "success") {
                        if(back.code) {
                            successNext();
                        }else {failMsg(doing)}
                    }else {errorMsg1()}
                }, "json").fail(function () {errorMsg2()});
            });
        }

        // 基础数据库 神经系统 MRI
        if ($(".pc-db-BDNSMR").length > 0) {
            // 初始化 神经系统 MRI
            let mriIndex = $(".pc-db-mri").length;
            for (let i = 1; i <= mriIndex; i++) {
                const thisMriIndex = i;
                ocdHeight("L", thisMriIndex);
                ocdHeight("R", thisMriIndex);
                // 为 日期 选择 初始化
                laydate.render({
                    elem: "#PC-db-LIT" + thisMriIndex,
                    type: "datetime",
                    format: "yyyy-MM-dd HH:mm:ss",
                    max: 1
                });
                laydate.render({
                    elem: "#PC-db-RIT" + thisMriIndex,
                    type: "datetime",
                    format: "yyyy-MM-dd HH:mm:ss",
                    max: 1
                });
                // 左侧 其他中枢病变 其他
                form.on("checkbox(LOCDO" + thisMriIndex + ")", function (data) {
                    if (data.elem.checked) {
                        $("#PC-db-LOCDO" + thisMriIndex).removeAttr("disabled").attr("name", function () {
                            return $(this).attr("data-name");
                        });
                    } else {
                        $("#PC-db-LOCDO" + thisMriIndex).removeAttr("name").attr("disabled", true).val("");
                    }
                });
                // 右侧 其他中枢病变 其他
                form.on("checkbox(ROCDO" + thisMriIndex + ")", function (data) {
                    if (data.elem.checked) {
                        $("#PC-db-ROCDO" + thisMriIndex).removeAttr("disabled").attr("name", function () {
                            return $(this).attr("data-name");
                        });
                    } else {
                        $("#PC-db-ROCDO" + thisMriIndex).removeAttr("name").attr("disabled", true).val("");
                    }
                });
                upload.render({
                    elem: "#PC-db-section1" + thisMriIndex + " button",
                    accept: "images",
                    acceptMime: "image/*",
                    field: "image",
                    url: "/perinatalPlatform/basicDatabase/write/NS/MR/uploadMriImg?num=1&index=" + thisMriIndex,
                    done: function(res) {
                        const imgElem = $("#PC-db-section1" + thisMriIndex + " img");
                        if (res.code === 0) {
                            const url = res.url;
                            $("#PC-db-section1-URL" + thisMriIndex).val(url);
                            $(imgElem).attr("src", url).attr("layer-src", url);
                            layer.photos({
                                photos: "#PC-db-section1" + thisMriIndex,
                                anim: 5
                            });
                        } else {
                            $(imgElem).removeAttr("src layer-src");
                            return layer.msg("上传失败");
                        }
                    }
                });
                upload.render({
                    elem: "#PC-db-section2" + thisMriIndex + " button",
                    accept: "images",
                    acceptMime: "image/*",
                    field: "image",
                    url: "/perinatalPlatform/basicDatabase/write/NS/MR/uploadMriImg?num=2&index=" + thisMriIndex,
                    done: function(res) {
                        const imgElem = $("#PC-db-section2" + thisMriIndex + " img");
                        if (res.code === 0) {
                            const url = res.url;
                            $("#PC-db-section2-URL" + thisMriIndex).val(url);
                            $(imgElem).attr("src", url).attr("layer-src", url);
                            layer.photos({
                                photos: "#PC-db-section2" + thisMriIndex,
                                anim: 5
                            });
                        } else {
                            $(imgElem).removeAttr("src layer-src");
                            return layer.msg("上传失败");
                        }
                    }
                });
                layer.photos({
                    photos: "#PC-db-section1" + thisMriIndex,
                    anim: 5
                });
                layer.photos({
                    photos: "#PC-db-section2" + thisMriIndex,
                    anim: 5
                });
                // 脑室扩增大小
                form.on("switch(LVE)", function (data) {
                    if (data.elem.checked) {
                        $("#PC-db-LVES" + thisMriIndex).removeAttr("disabled").attr("name", function () {
                            return $(this).attr("data-name");
                        });
                    } else {
                        $("#PC-db-LVES" + thisMriIndex).removeAttr("name").attr("disabled", true).val("");
                    }
                });
                form.on("switch(RVE)", function (data) {
                    if (data.elem.checked) {
                        $("#PC-db-RVES" + thisMriIndex).removeAttr("disabled").attr("name", function () {
                            return $(this).attr("data-name");
                        });
                    } else {
                        $("#PC-db-RVES" + thisMriIndex).removeAttr("name").attr("disabled", true).val("");
                    }
                });
                // 计算 神经系统 MRI 异常次数
                $("#PC-db-LIR" + thisMriIndex + ">.pc-db-radioBtn-group>li").on("click", function () {
                    const value = $(this).parents(".pc-db-radioBtn-group").prev("input").val();
                    if (value === "异常") {
                        $(this).parents(".pc-db-mri").addClass("pc-db-mri-ab");
                    } else if (value === "正常") {
                        const rirVal = $("#PC-db-RIR" + thisMriIndex + ">input").val();
                        if (rirVal === "正常" || rirVal === "") {
                            $(this).parents(".pc-db-mri").removeClass("pc-db-mri-ab");
                        }
                    }
                    $("#PC-db-MAN").val($(".pc-db-mri-ab").length);
                });
                $("#PC-db-RIR" + thisMriIndex + ">.pc-db-radioBtn-group>li").on("click", function () {
                    const value = $(this).parents(".pc-db-radioBtn-group").prev("input").val();
                    if (value === "异常") {
                        $(this).parents(".pc-db-mri").addClass("pc-db-mri-ab");
                    } else if (value === "正常") {
                        const lirVal = $("#PC-db-LIR" + thisMriIndex + ">input").val();
                        if (lirVal === "正常" || lirVal === "") {
                            $(this).parents(".pc-db-mri").removeClass("pc-db-mri-ab");
                        }
                    }
                    $("#PC-db-MAN").val($(".pc-db-mri-ab").length);
                });
                // 删除 神经系统 MRI
                $("#PC-db-mriDelete" + thisMriIndex).on("click", function () {
                    const that = this;
                    layer.msg("确定要 <span class='pc-db-status-color-no'>删除</span> 此条MRI检查信息吗?", {
                        icon: 7,
                        time: 0,
                        anim: 6,
                        btn: ["确定", "取消"],
                        resize: false,
                        shade: 0.8,
                        yes: function (index) {
                            $(that).parents(".pc-db-mri").remove();
                            // 计算 神经系统 MRI 次数
                            const mriTimes = $(".pc-db-BDNSMR .pc-db-mri").length;
                            $("#PC-db-MN").val(mriTimes);
                            // 计算 神经系统 MRI 异常 次数
                            const mriAbTimes = $(".pc-db-BDNSMR .pc-db-ab-mri").length;
                            $("#PC-db-MAN").val(mriAbTimes);
                            layer.close(index);
                        }
                    });
                });
            }
            // 增加 神经系统 MRI
            $("#PC-db-addMRI").on("click", function () {
                const that = this;
                mriIndex++;
                sequentialExecution(function () {
                    $(that).parent("div").before(
                        "<div id='PC-db-MRI" + mriIndex + "' class='layui-row pc-db-mri'>" +
                        "    <hr/>" +
                        "    <div class='layui-col-lg12'>" +
                        "        <div class='pc-db-h1-wrap'>" +
                        "            <h1>左侧</h1>" +
                        "        </div>" +
                        "    </div>" +
                        "    <div class='layui-col-lg4'>" +
                        "        <div class='pc-db-item pc-db-item-datetime'>" +
                        "            <label for='PC-db-LIT" + mriIndex + "'>检查时间</label>" +
                        "            <input id='PC-db-LIT" + mriIndex + "' type='text' name='leftInspectionTime" + mriIndex + "' readonly>" +
                        "            <i class='iconfont icon-rili'></i>" +
                        "        </div>" +
                        "    </div>" +
                        "    <div class='layui-col-lg4'>" +
                        "        <div id='PC-db-LIR" + mriIndex + "' class='pc-db-item'>" +
                        "            <label>结果</label>" +
                        "            <input type='hidden' name='leftInspectionResult" + mriIndex + "'>" +
                        "            <ul class='pc-db-radioBtn-group pc-db-enter'>" +
                        "                <li data-value='正常'>" +
                        "                    <button>正常</button>" +
                        "                </li>" +
                        "                <li data-value='异常'>" +
                        "                    <button>异常</button>" +
                        "                </li>" +
                        "            </ul>" +
                        "        </div>" +
                        "    </div>" +
                        "    <div class='layui-col-lg4'>" +
                        "        <div class='pc-db-item'>" +
                        "            <button id='PC-db-mriDelete" + mriIndex + "' class='pc-btn pc-btn-danger' type='button'><i class='iconfont icon-delete'></i> 删除此条MRI检查</button>" +
                        "        </div>" +
                        "    </div>" +
                        "    <div class='layui-col-lg4'>" +
                        "        <div class='pc-db-item'>" +
                        "            <label>生发层出血</label>" +
                        "            <input type='hidden' name='leftGerminalHemorrhage" + mriIndex + "'>" +
                        "            <ul class='pc-db-radioBtn-group pc-db-enter'>" +
                        "                <li data-value='确诊'>" +
                        "                    <button>确诊</button>" +
                        "                </li>" +
                        "                <li data-value='疑似'>" +
                        "                    <button>疑似</button>" +
                        "                </li>" +
                        "                <li data-value='无'>" +
                        "                    <button>无</button>" +
                        "                </li>" +
                        "                <li data-value='不详'>" +
                        "                    <button>不详</button>" +
                        "                </li>" +
                        "            </ul>" +
                        "        </div>" +
                        "    </div>" +
                        "    <div class='layui-col-lg4'>" +
                        "        <div class='pc-db-item'>" +
                        "            <label>脑室内出血</label>" +
                        "            <input type='hidden' name='leftIntraventricularHemorrhage" + mriIndex + "'>" +
                        "            <ul class='pc-db-radioBtn-group pc-db-enter'>" +
                        "                <li data-value='确诊'>" +
                        "                    <button>确诊</button>" +
                        "                </li>" +
                        "                <li  data-value='疑似'>" +
                        "                    <button>疑似</button>" +
                        "                </li>" +
                        "                <li data-value='无'>" +
                        "                    <button>无</button>" +
                        "                </li>" +
                        "                <li data-value='不详'>" +
                        "                    <button>不详</button>" +
                        "                </li>" +
                        "            </ul>" +
                        "        </div>" +
                        "    </div>" +
                        "    <div class='layui-col-lg4'>" +
                        "        <div class='pc-db-item'>" +
                        "            <label>脑实质病变</label>" +
                        "            <input type='hidden' name='leftParenchymalBrainDisease" + mriIndex + "'>" +
                        "            <ul class='pc-db-radioBtn-group pc-db-enter'>" +
                        "                <li data-value='确诊'>" +
                        "                    <button>确诊</button>" +
                        "                </li>" +
                        "                <li data-value='疑似'>" +
                        "                    <button>疑似</button>" +
                        "                </li>" +
                        "                <li data-value='无'>" +
                        "                    <button>无</button>" +
                        "                </li>" +
                        "                <li data-value='不详'>" +
                        "                    <button>不详</button>" +
                        "                </li>" +
                        "            </ul>" +
                        "        </div>" +
                        "    </div>" +
                        "    <div class='layui-col-lg4'>" +
                        "        <div class='pc-db-item'>" +
                        "            <label>脑室旁白质软化</label>" +
                        "            <input type='hidden' name='leftPeriventricularWhiteMatterSoftening" + mriIndex + "'>" +
                        "            <ul class='pc-db-radioBtn-group pc-db-enter'>" +
                        "                <li data-value='确诊'>" +
                        "                    <button>确诊</button>" +
                        "                </li>" +
                        "                <li data-value='疑似'>" +
                        "                    <button>疑似</button>" +
                        "                </li>" +
                        "                <li data-value='无'>" +
                        "                    <button>无</button>" +
                        "                </li>" +
                        "                <li data-value='不详'>" +
                        "                    <button>不详</button>" +
                        "                </li>" +
                        "            </ul>" +
                        "        </div>" +
                        "    </div>" +
                        "    <div class='layui-col-lg4'>" +
                        "        <div class='pc-db-item'>" +
                        "            <label class='pc-switch-label'>脑室扩增</label>" +
                        "            <input type='checkbox' name='leftVentricularExpansion" + mriIndex + "' lay-filter='LVE' lay-skin='switch' lay-text='有|无' value='1'>" +
                        "        </div>" +
                        "    </div>" +
                        "    <div class='layui-col-lg4'>" +
                        "        <div class='pc-db-item pc-db-item-unit-lg'>" +
                        "            <label for='PC-db-LVES" + mriIndex +"'>脑室扩增大小</label>" +
                        "            <input id='PC-db-LVES" + mriIndex +"' type='number' data-name='leftVentricularExpansionSize" + mriIndex + "' disabled>" +
                        "            <span>mm</span>" +
                        "        </div>" +
                        "    </div>" +
                        "    <div class='layui-col-lg4'>" +
                        "        <div class='pc-db-item'>" +
                        "            <label class='pc-switch-label'>脑梗塞</label>" +
                        "            <input type='checkbox' name='leftCerebralInfarction" + mriIndex + "' lay-skin='switch' lay-text='有|无' value='1'>" +
                        "        </div>" +
                        "    </div>" +
                        "    <div class='layui-col-lg4'>" +
                        "        <div class='pc-db-item'>" +
                        "            <label class='pc-switch-label'>脑积水</label>" +
                        "            <input type='checkbox' name='leftHydrocephalus" + mriIndex + "' lay-skin='switch' lay-text='有|无' value='1'>" +
                        "        </div>" +
                        "    </div>" +
                        "    <div class='layui-col-lg4'>" +
                        "        <div class='pc-db-item lg'>" +
                        "            <label class='pc-switch-label'>新生儿缺氧缺血性脑病</label>" +
                        "            <input type='checkbox' name='leftNeonatalHypoxicIschemicEncephalopathy" + mriIndex + "' lay-skin='switch' lay-text='有|无' value='1'>" +
                        "        </div>" +
                        "    </div>" +
                        "    <div class='layui-col-lg12'>" +
                        "        <div id='PC-db-LOCD" + mriIndex + "' class='pc-db-item'>" +
                        "            <label>其他中枢病变</label>" +
                        "            <div class='pc-db-item-checkbox'>" +
                        "                <input type='checkbox' name='leftOtherCentralDiseaseSubarachnoidHemorrhage" + mriIndex + "' value='1' title='蛛网膜下腔出血'>" +
                        "                <input type='checkbox' name='leftOtherCentralDiseaseSubduralHemorrhage" + mriIndex + "' value='1' title='硬膜下出血'>" +
                        "                <input type='checkbox' name='leftOtherCentralDiseaseTentoriumHemorrhage" + mriIndex + "' value='1' title='小脑幕出血'>" +
                        "                <input type='checkbox' name='leftOtherCentralDiseaseHydrocephalus" + mriIndex + "' value='1' title='脑积水'>" +
                        "                <input type='checkbox' name='leftOtherCentralDiseaseArachnoidCyst" + mriIndex + "' value='1' title='蛛网膜囊肿'>" +
                        "                <input type='checkbox' name='leftOtherCentralDiseaseCaudateSulcusCyst" + mriIndex + "' value='1' title='尾状沟囊肿'>" +
                        "                <input type='checkbox' name='leftOtherCentralDiseaseChoroidPlexusCyst" + mriIndex + "' value='1' title='脉络丛囊肿'>" +
                        "                <input type='checkbox' name='leftOtherCentralDiseaseSubependymalCyst" + mriIndex + "' value='1' title='室管膜下囊肿'>" +
                        "                <input type='checkbox' name='leftOtherCentralDiseaseOtherBrainParenchymalCysts" + mriIndex + "' value='1' title='其它脑实质囊肿'>" +
                        "                <input type='checkbox' lay-filter='LOCDO" + mriIndex + "' title='其它'>" +
                        "                <input id='PC-db-LOCDO" + mriIndex + "' type='text' data-name='leftOtherCentralDiseaseOther" + mriIndex + "' disabled>" +
                        "            </div>" +
                        "        </div>" +
                        "    </div>" +
                        "    <div class='layui-col-lg12'>" +
                        "        <div class='pc-db-h1-wrap'>" +
                        "            <h1>右侧</h1>" +
                        "        </div>" +
                        "    </div>" +
                        "    <div class='layui-col-lg4'>" +
                        "        <div class='pc-db-item pc-db-item-datetime'>" +
                        "            <label for='PC-db-RIT" + mriIndex + "'>检查时间</label>" +
                        "            <input id='PC-db-RIT" + mriIndex + "' type='text' name='rightInspectionTime" + mriIndex + "' readonly>" +
                        "            <i class='iconfont icon-rili'></i>" +
                        "        </div>" +
                        "    </div>" +
                        "    <div class='layui-col-lg8'>" +
                        "        <div id='PC-db-RIR" + mriIndex + "' class='pc-db-item'>" +
                        "            <label>结果</label>" +
                        "            <input type='hidden' name='rightInspectionResult" + mriIndex + "'>" +
                        "            <ul class='pc-db-radioBtn-group pc-db-enter'>" +
                        "                <li data-value='正常'>" +
                        "                    <button>正常</button>" +
                        "                </li>" +
                        "                <li data-value='异常'>" +
                        "                    <button>异常</button>" +
                        "                </li>" +
                        "            </ul>" +
                        "        </div>" +
                        "    </div>" +
                        "    <div class='layui-col-lg4'>" +
                        "        <div class='pc-db-item'>" +
                        "            <label>生发层出血</label>" +
                        "            <input type='hidden' name='rightGerminalHemorrhage" + mriIndex + "'>" +
                        "            <ul class='pc-db-radioBtn-group pc-db-enter'>" +
                        "                <li data-value='确诊'>" +
                        "                    <button>确诊</button>" +
                        "                </li>" +
                        "                <li data-value='疑似'>" +
                        "                    <button>疑似</button>" +
                        "                </li>" +
                        "                <li data-value='无'>" +
                        "                    <button>无</button>" +
                        "                </li>" +
                        "                <li data-value='不详'>" +
                        "                    <button>不详</button>" +
                        "                </li>" +
                        "            </ul>" +
                        "        </div>" +
                        "    </div>" +
                        "    <div class='layui-col-lg4'>" +
                        "        <div class='pc-db-item'>" +
                        "            <label>脑室内出血</label>" +
                        "            <input type='hidden' name='rightIntraventricularHemorrhage" + mriIndex + "'>" +
                        "            <ul class='pc-db-radioBtn-group pc-db-enter'>" +
                        "                <li data-value='确诊'>" +
                        "                    <button>确诊</button>" +
                        "                </li>" +
                        "                <li  data-value='疑似'>" +
                        "                    <button>疑似</button>" +
                        "                </li>" +
                        "                <li data-value='无'>" +
                        "                    <button>无</button>" +
                        "                </li>" +
                        "                <li data-value='不详'>" +
                        "                    <button>不详</button>" +
                        "                </li>" +
                        "            </ul>" +
                        "        </div>" +
                        "    </div>" +
                        "    <div class='layui-col-lg4'>" +
                        "        <div class='pc-db-item'>" +
                        "            <label>脑实质病变</label>" +
                        "            <input type='hidden' name='rightParenchymalBrainDisease" + mriIndex + "'>" +
                        "            <ul class='pc-db-radioBtn-group pc-db-enter'>" +
                        "                <li data-value='确诊'>" +
                        "                    <button>确诊</button>" +
                        "                </li>" +
                        "                <li data-value='疑似'>" +
                        "                    <button>疑似</button>" +
                        "                </li>" +
                        "                <li data-value='无'>" +
                        "                    <button>无</button>" +
                        "                </li>" +
                        "                <li data-value='不详'>" +
                        "                    <button>不详</button>" +
                        "                </li>" +
                        "            </ul>" +
                        "        </div>" +
                        "    </div>" +
                        "    <div class='layui-col-lg4'>" +
                        "        <div class='pc-db-item'>" +
                        "            <label>脑室旁白质软化</label>" +
                        "            <input type='hidden' name='rightPeriventricularWhiteMatterSoftening" + mriIndex + "'>" +
                        "            <ul class='pc-db-radioBtn-group pc-db-enter'>" +
                        "                <li data-value='确诊'>" +
                        "                    <button>确诊</button>" +
                        "                </li>" +
                        "                <li data-value='疑似'>" +
                        "                    <button>疑似</button>" +
                        "                </li>" +
                        "                <li data-value='无'>" +
                        "                    <button>无</button>" +
                        "                </li>" +
                        "                <li data-value='不详'>" +
                        "                    <button>不详</button>" +
                        "                </li>" +
                        "            </ul>" +
                        "        </div>" +
                        "    </div>" +
                        "    <div class='layui-col-lg4'>" +
                        "        <div class='pc-db-item'>" +
                        "            <label class='pc-switch-label'>脑室扩增</label>" +
                        "            <input type='checkbox' name='rightVentricularExpansion" + mriIndex + "' lay-filter='RVE' lay-skin='switch' lay-text='有|无' value='1'>" +
                        "        </div>" +
                        "    </div>" +
                        "    <div class='layui-col-lg4'>" +
                        "        <div class='pc-db-item pc-db-item-unit-lg'>" +
                        "            <label for='PC-db-RVES" + mriIndex + "'>脑室扩增大小</label>" +
                        "            <input id='PC-db-RVES" + mriIndex + "' type='number' data-name='rightVentricularExpansionSize" + mriIndex + "' disabled>" +
                        "            <span>mm</span>" +
                        "        </div>" +
                        "    </div>" +
                        "    <div class='layui-col-lg4'>" +
                        "        <div class='pc-db-item'>" +
                        "            <label class='pc-switch-label'>脑梗塞</label>" +
                        "            <input type='checkbox' name='rightCerebralInfarction" + mriIndex + "' lay-skin='switch' lay-text='有|无' value='1'>" +
                        "        </div>" +
                        "    </div>" +
                        "    <div class='layui-col-lg4'>" +
                        "        <div class='pc-db-item'>" +
                        "            <label class='pc-switch-label'>脑积水</label>" +
                        "            <input type='checkbox' name='rightHydrocephalus" + mriIndex + "' lay-skin='switch' lay-text='有|无' value='1'>" +
                        "        </div>" +
                        "    </div>" +
                        "    <div class='layui-col-lg4'>" +
                        "        <div class='pc-db-item lg'>" +
                        "            <label class='pc-switch-label'>新生儿缺氧缺血性脑病</label>" +
                        "            <input type='checkbox' name='rightNeonatalHypoxicIschemicEncephalopathy" + mriIndex + "' lay-skin='switch' lay-text='有|无' value='1'>" +
                        "        </div>" +
                        "    </div>" +
                        "    <div class='layui-col-lg12'>" +
                        "        <div id='PC-db-ROCD" + mriIndex + "' class='pc-db-item'>" +
                        "            <label>其他中枢病变</label>" +
                        "            <div class='pc-db-item-checkbox'>" +
                        "                <input type='checkbox' name='rightOtherCentralDiseaseSubarachnoidHemorrhage" + mriIndex + "' value='1' title='蛛网膜下腔出血'>" +
                        "                <input type='checkbox' name='rightOtherCentralDiseaseSubduralHemorrhage" + mriIndex + "' value='1' title='硬膜下出血'>" +
                        "                <input type='checkbox' name='rightOtherCentralDiseaseTentoriumHemorrhage" + mriIndex + "' value='1' title='小脑幕出血'>" +
                        "                <input type='checkbox' name='rightOtherCentralDiseaseHydrocephalus" + mriIndex + "' value='1' title='脑积水'>" +
                        "                <input type='checkbox' name='rightOtherCentralDiseaseArachnoidCyst" + mriIndex + "' value='1' title='蛛网膜囊肿'>" +
                        "                <input type='checkbox' name='rightOtherCentralDiseaseCaudateSulcusCyst" + mriIndex + "' value='1' title='尾状沟囊肿'>" +
                        "                <input type='checkbox' name='rightOtherCentralDiseaseChoroidPlexusCyst" + mriIndex + "' value='1' title='脉络丛囊肿'>" +
                        "                <input type='checkbox' name='rightOtherCentralDiseaseSubependymalCyst" + mriIndex + "' value='1' title='室管膜下囊肿'>" +
                        "                <input type='checkbox' name='rightOtherCentralDiseaseOtherBrainParenchymalCysts" + mriIndex + "' value='1' title='其它脑实质囊肿'>" +
                        "                <input type='checkbox' lay-filter='ROCDO" + mriIndex + "' title='其它'>" +
                        "                <input id='PC-db-ROCDO" + mriIndex + "' type='text' data-name='rightOtherCentralDiseaseOther" + mriIndex + "' disabled>" +
                        "            </div>" +
                        "        </div>" +
                        "    </div>" +
                        "    <div class='layui-col-lg12'>" +
                        "        <div class='pc-db-h1-wrap'>" +
                        "            <h1>MRI2个层面图像</h1>" +
                        "        </div>" +
                        "    </div>" +
                        "    <div class='layui-col-lg12'>" +
                        "        <div>" +
                        "            <div id='PC-db-section1" + mriIndex + "' class='pc-db-images'>" +
                        "                <div>层面1</div>" +
                        "                <div>" +
                        "                    <button class='pc-btn' type='button'>点击上传图片</button>" +
                        "                </div>" +
                        "                <img src=''/>" +
                        "                <input id='PC-db-section1-URL" + mriIndex + "' type='hidden' name='section1Url" + mriIndex + "'>" +
                        "            </div>" +
                        "            <div id='PC-db-section2" + mriIndex + "' class='pc-db-images'>" +
                        "                <div>层面2</div>" +
                        "                <div>" +
                        "                    <button class='pc-btn' type='button'>点击上传图片</button>" +
                        "                </div>" +
                        "                <img src=''/>" +
                        "                <input id='PC-db-section2-URL" + mriIndex + "' type='hidden' name='section2Url" + mriIndex + "'>" +
                        "            </div>" +
                        "        </div>" +
                        "    </div>" +
                        "    <div class='layui-col-lg12'>" +
                        "        <div class='pc-db-h1-wrap'>" +
                        "            <h1>说明</h1>" +
                        "        </div>" +
                        "    </div>" +
                        "    <div class='layui-col-lg12'>" +
                        "        <div class='pc-db-item'>" +
                        "            <textarea rows='6' cols='40' name='mriExplanation" + mriIndex + "'></textarea>" +
                        "        </div>" +
                        "    </div>" +
                        "</div>");
                }, function () {
                    form.render("checkbox");
                }, function () {
                    const thisMriIndex = mriIndex;
                    $("#PC-db-MRI" + thisMriIndex + " .pc-db-radioBtn-group>li").on("click", function () {
                        activeRBGChoice(this);
                    });
                    ocdHeight("L", thisMriIndex);
                    ocdHeight("R", thisMriIndex);
                    // 点击label实现switch开关
                    $(".pc-switch-label").on("click", function () {
                        $(this).nextAll(".layui-form-switch").click();
                    });
                }, function () {
                    const thisMriIndex = mriIndex;
                    laydate.render({
                        elem: "#PC-db-LIT" + thisMriIndex,
                        type: "datetime",
                        format: "yyyy-MM-dd HH:mm:ss",
                        max: 1
                    });
                    laydate.render({
                        elem: "#PC-db-RIT" + thisMriIndex,
                        type: "datetime",
                        format: "yyyy-MM-dd HH:mm:ss",
                        max: 1
                    });
                    // 左侧 其他中枢病变 其他
                    form.on("checkbox(LOCDO" + thisMriIndex + ")", function (data) {
                        if (data.elem.checked) {
                            $("#PC-db-LOCDO" + thisMriIndex).removeAttr("disabled").attr("name", function () {
                                return $(this).attr("data-name");
                            });
                        } else {
                            $("#PC-db-LOCDO" + thisMriIndex).removeAttr("name").attr("disabled", true).val("");
                        }
                    });
                    // 右侧 其他中枢病变 其他
                    form.on("checkbox(ROCDO" + thisMriIndex + ")", function (data) {
                        if (data.elem.checked) {
                            $("#PC-db-ROCDO" + thisMriIndex).removeAttr("disabled").attr("name", function () {
                                return $(this).attr("data-name");
                            });
                        } else {
                            $("#PC-db-ROCDO" + thisMriIndex).removeAttr("name").attr("disabled", true).val("");
                        }
                    });
                    upload.render({
                        elem: "#PC-db-section1" + thisMriIndex + " button",
                        accept: "images",
                        acceptMime: "image/*",
                        field: "image",
                        url: "/perinatalPlatform/basicDatabase/write/NS/MR/uploadMriImg?num=1&index=" + thisMriIndex,
                        done: function(res) {
                            const imgElem = $("#PC-db-section1" + thisMriIndex + " img");
                            if (res.code === 0) {
                                const url = res.url;
                                $("#PC-db-section1-URL" + thisMriIndex).val(url);
                                $(imgElem).attr("src", url).attr("layer-src", url);
                                layer.photos({
                                    photos: "#PC-db-section1" + thisMriIndex,
                                    anim: 5
                                });
                            } else {
                                $(imgElem).removeAttr("src layer-src");
                                return layer.msg("上传失败");
                            }
                        }
                    });
                    upload.render({
                        elem: "#PC-db-section2" + thisMriIndex + " button",
                        accept: "images",
                        acceptMime: "image/*",
                        field: "image",
                        url: "/perinatalPlatform/basicDatabase/write/NS/MR/uploadMriImg?num=2&index=" + thisMriIndex,
                        done: function(res) {
                            const imgElem = $("#PC-db-section2" + thisMriIndex + " img");
                            if (res.code === 0) {
                                const url = res.url;
                                $("#PC-db-section2-URL" + thisMriIndex).val(url);
                                $(imgElem).attr("src", url).attr("layer-src", url);
                                layer.photos({
                                    photos: "#PC-db-section2" + thisMriIndex,
                                    anim: 5
                                });
                            } else {
                                $(imgElem).removeAttr("src layer-src");
                                return layer.msg("上传失败");
                            }
                        }
                    });
                    // 脑室扩增大小
                    form.on("switch(LVE)", function (data) {
                        if (data.elem.checked) {
                            $("#PC-db-LVES" + thisMriIndex).removeAttr("disabled").attr("name", function () {
                                return $(this).attr("data-name");
                            });
                        } else {
                            $("#PC-db-LVES" + thisMriIndex).removeAttr("name").attr("disabled", true).val("");
                        }
                    });
                    form.on("switch(RVE)", function (data) {
                        if (data.elem.checked) {
                            $("#PC-db-RVES" + thisMriIndex).removeAttr("disabled").attr("name", function () {
                                return $(this).attr("data-name");
                            });
                        } else {
                            $("#PC-db-RVES" + thisMriIndex).removeAttr("name").attr("disabled", true).val("");
                        }
                    });
                    // 计算 神经系统 MRI 异常次数
                    $("#PC-db-LIR" + thisMriIndex + ">.pc-db-radioBtn-group>li").on("click", function () {
                        const value = $(this).parents(".pc-db-radioBtn-group").prev("input").val();
                        if (value === "异常") {
                            $(this).parents(".pc-db-mri").addClass("pc-db-mri-ab");
                        } else if (value === "正常") {
                            const rirVal = $("#PC-db-RIR" + thisMriIndex + ">input").val();
                            if (rirVal === "正常" || rirVal === "") {
                                $(this).parents(".pc-db-mri").removeClass("pc-db-mri-ab");
                            }
                        }
                        $("#PC-db-MAN").val($(".pc-db-mri-ab").length);
                    });
                    $("#PC-db-RIR" + thisMriIndex + ">.pc-db-radioBtn-group>li").on("click", function () {
                        const value = $(this).parents(".pc-db-radioBtn-group").prev("input").val();
                        if (value === "异常") {
                            $(this).parents(".pc-db-mri").addClass("pc-db-mri-ab");
                        } else if (value === "正常") {
                            const lirVal = $("#PC-db-LIR" + thisMriIndex + ">input").val();
                            if (lirVal === "正常" || lirVal === "") {
                                $(this).parents(".pc-db-mri").removeClass("pc-db-mri-ab");
                            }
                        }
                        $("#PC-db-MAN").val($(".pc-db-mri-ab").length);
                    });
                    // 计算 神经系统 MRI 次数
                    const mriTimes = $(".pc-db-BDNSMR .pc-db-mri").length;
                    $("#PC-db-MN").val(mriTimes);
                    // 删除 神经系统 MRI
                    $("#PC-db-mriDelete" + thisMriIndex).on("click", function () {
                        const that = this;
                        layer.msg("确定要 <span class='pc-db-status-color-no'>删除</span> 此条MRI检查信息吗?", {
                            icon: 7,
                            time: 0,
                            anim: 6,
                            btn: ["确定", "取消"],
                            resize: false,
                            shade: 0.8,
                            yes: function (index) {
                                $(that).parents(".pc-db-mri").remove();
                                // 计算 神经系统 MRI 次数
                                const mriTimes = $(".pc-db-BDNSMR .pc-db-mri").length;
                                $("#PC-db-MN").val(mriTimes);
                                // 计算 神经系统 MRI 异常 次数
                                const mriAbTimes = $(".pc-db-BDNSMR .pc-db-ab-mri").length;
                                $("#PC-db-MAN").val(mriAbTimes);
                                layer.close(index);
                            }
                        });
                    });
                });
            });

            // 基础数据库 神经系统 MRI 添加/编辑 信息 提交
            form.on("submit(NSMR)", function (data) {
                const doing = "保存信息";
                loading(doing);
                let field = data.field, subData = {}, mriArray = [], flag = false;
                for (let i = 1; i <= mriIndex; i++) {
                    let mriJson = {};
                    if (notNullTool(field["leftInspectionTime" + i])) {
                        mriJson.leftInspectionTime = field["leftInspectionTime" + i];
                    }
                    if (notNullTool(field["leftInspectionResult" + i])) {
                        mriJson.leftInspectionResult = field["leftInspectionResult" + i];
                    }
                    if (notNullTool(field["leftGerminalHemorrhage" + i])) {
                        mriJson.leftGerminalHemorrhage = field["leftGerminalHemorrhage" + i];
                    }
                    if (notNullTool(field["leftIntraventricularHemorrhage" + i])) {
                        mriJson.leftIntraventricularHemorrhage = field["leftIntraventricularHemorrhage" + i];
                    }
                    if (notNullTool(field["leftParenchymalBrainDisease" + i])) {
                        mriJson.leftParenchymalBrainDisease = field["leftParenchymalBrainDisease" + i];
                    }
                    if (notNullTool(field["leftPeriventricularWhiteMatterSoftening" + i])) {
                        mriJson.leftPeriventricularWhiteMatterSoftening = field["leftPeriventricularWhiteMatterSoftening" + i];
                    }
                    if (notNullTool(field["leftVentricularExpansion" + i])) {
                        mriJson.leftVentricularExpansion = field["leftVentricularExpansion" + i];
                    }
                    if (notNullTool(field["leftVentricularExpansionSize" + i])) {
                        mriJson.leftVentricularExpansionSize = field["leftVentricularExpansionSize" + i];
                    }
                    if (notNullTool(field["leftCerebralInfarction" + i])) {
                        mriJson.leftCerebralInfarction = field["leftCerebralInfarction" + i];
                    }
                    if (notNullTool(field["leftHydrocephalus" + i])) {
                        mriJson.leftHydrocephalus = field["leftHydrocephalus" + i];
                    }
                    if (notNullTool(field["leftNeonatalHypoxicIschemicEncephalopathy" + i])) {
                        mriJson.leftNeonatalHypoxicIschemicEncephalopathy = field["leftNeonatalHypoxicIschemicEncephalopathy" + i];
                    }
                    if (notNullTool(field["leftOtherCentralDiseaseSubarachnoidHemorrhage" + i])) {
                        mriJson.leftOtherCentralDiseaseSubarachnoidHemorrhage = field["leftOtherCentralDiseaseSubarachnoidHemorrhage" + i];
                    }
                    if (notNullTool(field["leftOtherCentralDiseaseSubduralHemorrhage" + i])) {
                        mriJson.leftOtherCentralDiseaseSubduralHemorrhage = field["leftOtherCentralDiseaseSubduralHemorrhage" + i];
                    }
                    if (notNullTool(field["leftOtherCentralDiseaseTentoriumHemorrhage" + i])) {
                        mriJson.leftOtherCentralDiseaseTentoriumHemorrhage = field["leftOtherCentralDiseaseTentoriumHemorrhage" + i];
                    }
                    if (notNullTool(field["leftOtherCentralDiseaseHydrocephalus" + i])) {
                        mriJson.leftOtherCentralDiseaseHydrocephalus = field["leftOtherCentralDiseaseHydrocephalus" + i];
                    }
                    if (notNullTool(field["leftOtherCentralDiseaseArachnoidCyst" + i])) {
                        mriJson.leftOtherCentralDiseaseArachnoidCyst = field["leftOtherCentralDiseaseArachnoidCyst" + i];
                    }
                    if (notNullTool(field["leftOtherCentralDiseaseCaudateSulcusCyst" + i])) {
                        mriJson.leftOtherCentralDiseaseCaudateSulcusCyst = field["leftOtherCentralDiseaseCaudateSulcusCyst" + i];
                    }
                    if (notNullTool(field["leftOtherCentralDiseaseChoroidPlexusCyst" + i])) {
                        mriJson.leftOtherCentralDiseaseChoroidPlexusCyst = field["leftOtherCentralDiseaseChoroidPlexusCyst" + i];
                    }
                    if (notNullTool(field["leftOtherCentralDiseaseSubependymalCyst" + i])) {
                        mriJson.leftOtherCentralDiseaseSubependymalCyst = field["leftOtherCentralDiseaseSubependymalCyst" + i];
                    }
                    if (notNullTool(field["leftOtherCentralDiseaseOtherBrainParenchymalCysts" + i])) {
                        mriJson.leftOtherCentralDiseaseOtherBrainParenchymalCysts = field["leftOtherCentralDiseaseOtherBrainParenchymalCysts" + i];
                    }
                    if (notNullTool(field["leftOtherCentralDiseaseOther" + i])) {
                        mriJson.leftOtherCentralDiseaseOther = field["leftOtherCentralDiseaseOther" + i];
                    }
                    if (notNullTool(field["rightInspectionTime" + i])) {
                        mriJson.rightInspectionTime = field["rightInspectionTime" + i];
                    }
                    if (notNullTool(field["rightInspectionResult" + i])) {
                        mriJson.rightInspectionResult = field["rightInspectionResult" + i];
                    }
                    if (notNullTool(field["rightGerminalHemorrhage" + i])) {
                        mriJson.rightGerminalHemorrhage = field["rightGerminalHemorrhage" + i];
                    }
                    if (notNullTool(field["rightIntraventricularHemorrhage" + i])) {
                        mriJson.rightIntraventricularHemorrhage = field["rightIntraventricularHemorrhage" + i];
                    }
                    if (notNullTool(field["rightParenchymalBrainDisease" + i])) {
                        mriJson.rightParenchymalBrainDisease = field["rightParenchymalBrainDisease" + i];
                    }
                    if (notNullTool(field["rightPeriventricularWhiteMatterSoftening" + i])) {
                        mriJson.rightPeriventricularWhiteMatterSoftening = field["rightPeriventricularWhiteMatterSoftening" + i];
                    }
                    if (notNullTool(field["rightVentricularExpansion" + i])) {
                        mriJson.rightVentricularExpansion = field["rightVentricularExpansion" + i];
                    }
                    if (notNullTool(field["rightVentricularExpansionSize" + i])) {
                        mriJson.rightVentricularExpansionSize = field["rightVentricularExpansionSize" + i];
                    }
                    if (notNullTool(field["rightCerebralInfarction" + i])) {
                        mriJson.rightCerebralInfarction = field["rightCerebralInfarction" + i];
                    }
                    if (notNullTool(field["rightHydrocephalus" + i])) {
                        mriJson.rightHydrocephalus = field["rightHydrocephalus" + i];
                    }
                    if (notNullTool(field["rightNeonatalHypoxicIschemicEncephalopathy" + i])) {
                        mriJson.rightNeonatalHypoxicIschemicEncephalopathy = field["rightNeonatalHypoxicIschemicEncephalopathy" + i];
                    }
                    if (notNullTool(field["rightOtherCentralDiseaseSubarachnoidHemorrhage" + i])) {
                        mriJson.rightOtherCentralDiseaseSubarachnoidHemorrhage = field["rightOtherCentralDiseaseSubarachnoidHemorrhage" + i];
                    }
                    if (notNullTool(field["rightOtherCentralDiseaseSubduralHemorrhage" + i])) {
                        mriJson.rightOtherCentralDiseaseSubduralHemorrhage = field["rightOtherCentralDiseaseSubduralHemorrhage" + i];
                    }
                    if (notNullTool(field["rightOtherCentralDiseaseTentoriumHemorrhage" + i])) {
                        mriJson.rightOtherCentralDiseaseTentoriumHemorrhage = field["rightOtherCentralDiseaseTentoriumHemorrhage" + i];
                    }
                    if (notNullTool(field["rightOtherCentralDiseaseHydrocephalus" + i])) {
                        mriJson.rightOtherCentralDiseaseHydrocephalus = field["rightOtherCentralDiseaseHydrocephalus" + i];
                    }
                    if (notNullTool(field["rightOtherCentralDiseaseArachnoidCyst" + i])) {
                        mriJson.rightOtherCentralDiseaseArachnoidCyst = field["rightOtherCentralDiseaseArachnoidCyst" + i];
                    }
                    if (notNullTool(field["rightOtherCentralDiseaseCaudateSulcusCyst" + i])) {
                        mriJson.rightOtherCentralDiseaseCaudateSulcusCyst = field["rightOtherCentralDiseaseCaudateSulcusCyst" + i];
                    }
                    if (notNullTool(field["rightOtherCentralDiseaseChoroidPlexusCyst" + i])) {
                        mriJson.rightOtherCentralDiseaseChoroidPlexusCyst = field["rightOtherCentralDiseaseChoroidPlexusCyst" + i];
                    }
                    if (notNullTool(field["rightOtherCentralDiseaseSubependymalCyst" + i])) {
                        mriJson.rightOtherCentralDiseaseSubependymalCyst = field["rightOtherCentralDiseaseSubependymalCyst" + i];
                    }
                    if (notNullTool(field["rightOtherCentralDiseaseOtherBrainParenchymalCysts" + i])) {
                        mriJson.rightOtherCentralDiseaseOtherBrainParenchymalCysts = field["rightOtherCentralDiseaseOtherBrainParenchymalCysts" + i];
                    }
                    if (notNullTool(field["rightOtherCentralDiseaseOther" + i])) {
                        mriJson.rightOtherCentralDiseaseOther = field["rightOtherCentralDiseaseOther" + i];
                    }
                    if (notNullTool(field["section1Url" + i])) {
                        mriJson.section1Url = field["section1Url" + i];
                    }
                    if (notNullTool(field["section2Url" + i])) {
                        mriJson.section2Url = field["section2Url" + i];
                    }
                    if (notNullTool(field["mriExplanation" + i])) {
                        mriJson.mriExplanation = field["mriExplanation" + i];
                    }
                    if (Object.keys(mriJson).length > 0) {
                        mriArray.push(mriJson);
                    }
                }
                subData.checkNumber = field.mriNumber;
                subData.checkAbnormalNumber = field.mriAbnormalNumber;
                subData.mriArray = JSON.stringify(mriArray);
                $.post("/perinatalPlatform/basicDatabase/write/NS/MR/post", subData, function (back, status) {
                    if(status === "success") {
                        if(back.code) {
                            successNext();
                        }else {failMsg(doing)}
                    }else {errorMsg1()}
                }, "json").fail(function () {errorMsg2()});
            });
        }

        // 基础数据库 神经系统 CT
        if ($(".pc-db-BDNSCT").length > 0) {
            // 初始化 神经系统 CT
            let ctIndex = $(".pc-db-ct").length;
            for (let i = 1; i <= ctIndex; i++) {
                const thisCtIndex = i;
                ocdHeight("L", thisCtIndex);
                ocdHeight("R", thisCtIndex);
                // 为 日期 选择 初始化
                laydate.render({
                    elem: "#PC-db-LIT" + thisCtIndex,
                    type: "datetime",
                    format: "yyyy-MM-dd HH:mm:ss",
                    max: 1
                });
                laydate.render({
                    elem: "#PC-db-RIT" + thisCtIndex,
                    type: "datetime",
                    format: "yyyy-MM-dd HH:mm:ss",
                    max: 1
                });
                // 左侧 其他中枢病变 其他
                form.on("checkbox(LOCDO" + thisCtIndex + ")", function (data) {
                    if (data.elem.checked) {
                        $("#PC-db-LOCDO" + thisCtIndex).removeAttr("disabled").attr("name", function () {
                            return $(this).attr("data-name");
                        });
                    } else {
                        $("#PC-db-LOCDO" + thisCtIndex).removeAttr("name").attr("disabled", true).val("");
                    }
                });
                // 右侧 其他中枢病变 其他
                form.on("checkbox(ROCDO" + thisCtIndex + ")", function (data) {
                    if (data.elem.checked) {
                        $("#PC-db-ROCDO" + thisCtIndex).removeAttr("disabled").attr("name", function () {
                            return $(this).attr("data-name");
                        });
                    } else {
                        $("#PC-db-ROCDO" + thisCtIndex).removeAttr("name").attr("disabled", true).val("");
                    }
                });
                upload.render({
                    elem: "#PC-db-section1" + thisCtIndex + " button",
                    accept: "images",
                    acceptMime: "image/*",
                    field: "image",
                    url: "/perinatalPlatform/basicDatabase/write/NS/CT/uploadCtImg?num=1&index=" + thisCtIndex,
                    done: function(res) {
                        const imgElem = $("#PC-db-section1" + thisCtIndex + " img");
                        if (res.code === 0) {
                            const url = res.url;
                            $("#PC-db-section1-URL" + thisCtIndex).val(url);
                            $(imgElem).attr("src", url).attr("layer-src", url);
                            layer.photos({
                                photos: "#PC-db-section1" + thisCtIndex,
                                anim: 5
                            });
                        } else {
                            $(imgElem).removeAttr("src layer-src");
                            return layer.msg("上传失败");
                        }
                    }
                });
                upload.render({
                    elem: "#PC-db-section2" + thisCtIndex + " button",
                    accept: "images",
                    acceptMime: "image/*",
                    field: "image",
                    url: "/perinatalPlatform/basicDatabase/write/NS/CT/uploadCtImg?num=2&index=" + thisCtIndex,
                    done: function(res) {
                        const imgElem = $("#PC-db-section2" + thisCtIndex + " img");
                        if (res.code === 0) {
                            const url = res.url;
                            $("#PC-db-section2-URL" + thisCtIndex).val(url);
                            $(imgElem).attr("src", url).attr("layer-src", url);
                            layer.photos({
                                photos: "#PC-db-section2" + thisCtIndex,
                                anim: 5
                            });
                        } else {
                            $(imgElem).removeAttr("src layer-src");
                            return layer.msg("上传失败");
                        }
                    }
                });
                layer.photos({
                    photos: "#PC-db-section1" + thisCtIndex,
                    anim: 5
                });
                layer.photos({
                    photos: "#PC-db-section2" + thisCtIndex,
                    anim: 5
                });
                // 脑室扩增大小
                form.on("switch(LVE)", function (data) {
                    if (data.elem.checked) {
                        $("#PC-db-LVES" + thisCtIndex).removeAttr("disabled").attr("name", function () {
                            return $(this).attr("data-name");
                        });
                    } else {
                        $("#PC-db-LVES" + thisCtIndex).removeAttr("name").attr("disabled", true).val("");
                    }
                });
                form.on("switch(RVE)", function (data) {
                    if (data.elem.checked) {
                        $("#PC-db-RVES" + thisCtIndex).removeAttr("disabled").attr("name", function () {
                            return $(this).attr("data-name");
                        });
                    } else {
                        $("#PC-db-RVES" + thisCtIndex).removeAttr("name").attr("disabled", true).val("");
                    }
                });
                // 计算 神经系统 CT 异常次数
                $("#PC-db-LIR" + thisCtIndex + ">.pc-db-radioBtn-group>li").on("click", function () {
                    const value = $(this).parents(".pc-db-radioBtn-group").prev("input").val();
                    if (value === "异常") {
                        $(this).parents(".pc-db-ct").addClass("pc-db-ct-ab");
                    } else if (value === "正常") {
                        const rirVal = $("#PC-db-RIR" + thisCtIndex + ">input").val();
                        if (rirVal === "正常" || rirVal === "") {
                            $(this).parents(".pc-db-ct").removeClass("pc-db-ct-ab");
                        }
                    }
                    $("#PC-db-CAN").val($(".pc-db-ct-ab").length);
                });
                $("#PC-db-RIR" + thisCtIndex + ">.pc-db-radioBtn-group>li").on("click", function () {
                    const value = $(this).parents(".pc-db-radioBtn-group").prev("input").val();
                    if (value === "异常") {
                        $(this).parents(".pc-db-ct").addClass("pc-db-ct-ab");
                    } else if (value === "正常") {
                        const lirVal = $("#PC-db-LIR" + thisCtIndex + ">input").val();
                        if (lirVal === "正常" || lirVal === "") {
                            $(this).parents(".pc-db-ct").removeClass("pc-db-ct-ab");
                        }
                    }
                    $("#PC-db-CAN").val($(".pc-db-ct-ab").length);
                });
                // 删除 神经系统 CT
                $("#PC-db-ctDelete" + thisCtIndex).on("click", function () {
                    const that = this;
                    layer.msg("确定要 <span class='pc-db-status-color-no'>删除</span> 此条CT检查信息吗?", {
                        icon: 7,
                        time: 0,
                        anim: 6,
                        btn: ["确定", "取消"],
                        resize: false,
                        shade: 0.8,
                        yes: function (index) {
                            $(that).parents(".pc-db-ct").remove();
                            // 计算 神经系统 CT 次数
                            const ctTimes = $(".pc-db-BDNSCT .pc-db-ct").length;
                            $("#PC-db-CN").val(ctTimes);
                            // 计算 神经系统 CT 异常 次数
                            const ctAbTimes = $(".pc-db-BDNSCT .pc-db-ct-ab").length;
                            $("#PC-db-CAN").val(ctAbTimes);
                            layer.close(index);
                        }
                    });
                });
            }
            // 增加 神经系统 CT
            $("#PC-db-addCT").on("click", function () {
                const that = this;
                ctIndex++;
                sequentialExecution(function () {
                    $(that).parent("div").before(
                        "<div id='PC-db-CT" + ctIndex + "' class='layui-row pc-db-ct'>" +
                        "    <hr/>" +
                        "    <div class='layui-col-lg12'>" +
                        "        <div class='pc-db-h1-wrap'>" +
                        "            <h1>左侧</h1>" +
                        "        </div>" +
                        "    </div>" +
                        "    <div class='layui-col-lg4'>" +
                        "        <div class='pc-db-item pc-db-item-datetime'>" +
                        "            <label for='PC-db-LIT" + ctIndex + "'>检查时间</label>" +
                        "            <input id='PC-db-LIT" + ctIndex + "' type='text' name='leftInspectionTime" + ctIndex + "' readonly>" +
                        "            <i class='iconfont icon-rili'></i>" +
                        "        </div>" +
                        "    </div>" +
                        "    <div class='layui-col-lg4'>" +
                        "        <div id='PC-db-LIR" + ctIndex + "' class='pc-db-item'>" +
                        "            <label>结果</label>" +
                        "            <input type='hidden' name='leftInspectionResult" + ctIndex + "'>" +
                        "            <ul class='pc-db-radioBtn-group pc-db-enter'>" +
                        "                <li data-value='正常'>" +
                        "                    <button>正常</button>" +
                        "                </li>" +
                        "                <li data-value='异常'>" +
                        "                    <button>异常</button>" +
                        "                </li>" +
                        "            </ul>" +
                        "        </div>" +
                        "    </div>" +
                        "    <div class='layui-col-lg4'>" +
                        "        <div class='pc-db-item'>" +
                        "            <button id='PC-db-ctDelete" + ctIndex + "' class='pc-btn pc-btn-danger' type='button'><i class='iconfont icon-delete'></i> 删除此条CT检查</button>" +
                        "        </div>" +
                        "    </div>" +
                        "    <div class='layui-col-lg4'>" +
                        "        <div class='pc-db-item'>" +
                        "            <label>生发层出血</label>" +
                        "            <input type='hidden' name='leftGerminalHemorrhage" + ctIndex + "'>" +
                        "            <ul class='pc-db-radioBtn-group pc-db-enter'>" +
                        "                <li data-value='确诊'>" +
                        "                    <button>确诊</button>" +
                        "                </li>" +
                        "                <li data-value='疑似'>" +
                        "                    <button>疑似</button>" +
                        "                </li>" +
                        "                <li data-value='无'>" +
                        "                    <button>无</button>" +
                        "                </li>" +
                        "                <li data-value='不详'>" +
                        "                    <button>不详</button>" +
                        "                </li>" +
                        "            </ul>" +
                        "        </div>" +
                        "    </div>" +
                        "    <div class='layui-col-lg4'>" +
                        "        <div class='pc-db-item'>" +
                        "            <label>脑室内出血</label>" +
                        "            <input type='hidden' name='leftIntraventricularHemorrhage" + ctIndex + "'>" +
                        "            <ul class='pc-db-radioBtn-group pc-db-enter'>" +
                        "                <li data-value='确诊'>" +
                        "                    <button>确诊</button>" +
                        "                </li>" +
                        "                <li  data-value='疑似'>" +
                        "                    <button>疑似</button>" +
                        "                </li>" +
                        "                <li data-value='无'>" +
                        "                    <button>无</button>" +
                        "                </li>" +
                        "                <li data-value='不详'>" +
                        "                    <button>不详</button>" +
                        "                </li>" +
                        "            </ul>" +
                        "        </div>" +
                        "    </div>" +
                        "    <div class='layui-col-lg4'>" +
                        "        <div class='pc-db-item'>" +
                        "            <label>脑实质病变</label>" +
                        "            <input type='hidden' name='leftParenchymalBrainDisease" + ctIndex + "'>" +
                        "            <ul class='pc-db-radioBtn-group pc-db-enter'>" +
                        "                <li data-value='确诊'>" +
                        "                    <button>确诊</button>" +
                        "                </li>" +
                        "                <li data-value='疑似'>" +
                        "                    <button>疑似</button>" +
                        "                </li>" +
                        "                <li data-value='无'>" +
                        "                    <button>无</button>" +
                        "                </li>" +
                        "                <li data-value='不详'>" +
                        "                    <button>不详</button>" +
                        "                </li>" +
                        "            </ul>" +
                        "        </div>" +
                        "    </div>" +
                        "    <div class='layui-col-lg4'>" +
                        "        <div class='pc-db-item'>" +
                        "            <label>脑室旁白质软化</label>" +
                        "            <input type='hidden' name='leftPeriventricularWhiteMatterSoftening" + ctIndex + "'>" +
                        "            <ul class='pc-db-radioBtn-group pc-db-enter'>" +
                        "                <li data-value='确诊'>" +
                        "                    <button>确诊</button>" +
                        "                </li>" +
                        "                <li data-value='疑似'>" +
                        "                    <button>疑似</button>" +
                        "                </li>" +
                        "                <li data-value='无'>" +
                        "                    <button>无</button>" +
                        "                </li>" +
                        "                <li data-value='不详'>" +
                        "                    <button>不详</button>" +
                        "                </li>" +
                        "            </ul>" +
                        "        </div>" +
                        "    </div>" +
                        "    <div class='layui-col-lg4'>" +
                        "        <div class='pc-db-item'>" +
                        "            <label class='pc-switch-label'>脑室扩增</label>" +
                        "            <input type='checkbox' name='leftVentricularExpansion" + ctIndex + "' lay-filter='LVE' lay-skin='switch' lay-text='有|无' value='1'>" +
                        "        </div>" +
                        "    </div>" +
                        "    <div class='layui-col-lg4'>" +
                        "        <div class='pc-db-item pc-db-item-unit-lg'>" +
                        "            <label for='PC-db-LVES" + ctIndex +"'>脑室扩增大小</label>" +
                        "            <input id='PC-db-LVES" + ctIndex +"' type='number' data-name='leftVentricularExpansionSize" + ctIndex + "' disabled>" +
                        "            <span>mm</span>" +
                        "        </div>" +
                        "    </div>" +
                        "    <div class='layui-col-lg4'>" +
                        "        <div class='pc-db-item'>" +
                        "            <label class='pc-switch-label'>脑梗塞</label>" +
                        "            <input type='checkbox' name='leftCerebralInfarction" + ctIndex + "' lay-skin='switch' lay-text='有|无' value='1'>" +
                        "        </div>" +
                        "    </div>" +
                        "    <div class='layui-col-lg4'>" +
                        "        <div class='pc-db-item'>" +
                        "            <label class='pc-switch-label'>脑积水</label>" +
                        "            <input type='checkbox' name='leftHydrocephalus" + ctIndex + "' lay-skin='switch' lay-text='有|无' value='1'>" +
                        "        </div>" +
                        "    </div>" +
                        "    <div class='layui-col-lg4'>" +
                        "        <div class='pc-db-item lg'>" +
                        "            <label class='pc-switch-label'>新生儿缺氧缺血性脑病</label>" +
                        "            <input type='checkbox' name='leftNeonatalHypoxicIschemicEncephalopathy" + ctIndex + "' lay-skin='switch' lay-text='有|无' value='1'>" +
                        "        </div>" +
                        "    </div>" +
                        "    <div class='layui-col-lg12'>" +
                        "        <div id='PC-db-LOCD" + ctIndex + "' class='pc-db-item'>" +
                        "            <label>其他中枢病变</label>" +
                        "            <div class='pc-db-item-checkbox'>" +
                        "                <input type='checkbox' name='leftOtherCentralDiseaseSubarachnoidHemorrhage" + ctIndex + "' value='1' title='蛛网膜下腔出血'>" +
                        "                <input type='checkbox' name='leftOtherCentralDiseaseSubduralHemorrhage" + ctIndex + "' value='1' title='硬膜下出血'>" +
                        "                <input type='checkbox' name='leftOtherCentralDiseaseTentoriumHemorrhage" + ctIndex + "' value='1' title='小脑幕出血'>" +
                        "                <input type='checkbox' name='leftOtherCentralDiseaseHydrocephalus" + ctIndex + "' value='1' title='脑积水'>" +
                        "                <input type='checkbox' name='leftOtherCentralDiseaseArachnoidCyst" + ctIndex + "' value='1' title='蛛网膜囊肿'>" +
                        "                <input type='checkbox' name='leftOtherCentralDiseaseCaudateSulcusCyst" + ctIndex + "' value='1' title='尾状沟囊肿'>" +
                        "                <input type='checkbox' name='leftOtherCentralDiseaseChoroidPlexusCyst" + ctIndex + "' value='1' title='脉络丛囊肿'>" +
                        "                <input type='checkbox' name='leftOtherCentralDiseaseSubependymalCyst" + ctIndex + "' value='1' title='室管膜下囊肿'>" +
                        "                <input type='checkbox' name='leftOtherCentralDiseaseOtherBrainParenchymalCysts" + ctIndex + "' value='1' title='其它脑实质囊肿'>" +
                        "                <input type='checkbox' lay-filter='LOCDO" + ctIndex + "' title='其它'>" +
                        "                <input id='PC-db-LOCDO" + ctIndex + "' type='text' data-name='leftOtherCentralDiseaseOther" + ctIndex + "' disabled>" +
                        "            </div>" +
                        "        </div>" +
                        "    </div>" +
                        "    <div class='layui-col-lg12'>" +
                        "        <div class='pc-db-h1-wrap'>" +
                        "            <h1>右侧</h1>" +
                        "        </div>" +
                        "    </div>" +
                        "    <div class='layui-col-lg4'>" +
                        "        <div class='pc-db-item pc-db-item-datetime'>" +
                        "            <label for='PC-db-RIT" + ctIndex + "'>检查时间</label>" +
                        "            <input id='PC-db-RIT" + ctIndex + "' type='text' name='rightInspectionTime" + ctIndex + "' readonly>" +
                        "            <i class='iconfont icon-rili'></i>" +
                        "        </div>" +
                        "    </div>" +
                        "    <div class='layui-col-lg8'>" +
                        "        <div id='PC-db-RIR" + ctIndex + "' class='pc-db-item'>" +
                        "            <label>结果</label>" +
                        "            <input type='hidden' name='rightInspectionResult" + ctIndex + "'>" +
                        "            <ul class='pc-db-radioBtn-group pc-db-enter'>" +
                        "                <li data-value='正常'>" +
                        "                    <button>正常</button>" +
                        "                </li>" +
                        "                <li data-value='异常'>" +
                        "                    <button>异常</button>" +
                        "                </li>" +
                        "            </ul>" +
                        "        </div>" +
                        "    </div>" +
                        "    <div class='layui-col-lg4'>" +
                        "        <div class='pc-db-item'>" +
                        "            <label>生发层出血</label>" +
                        "            <input type='hidden' name='rightGerminalHemorrhage" + ctIndex + "'>" +
                        "            <ul class='pc-db-radioBtn-group pc-db-enter'>" +
                        "                <li data-value='确诊'>" +
                        "                    <button>确诊</button>" +
                        "                </li>" +
                        "                <li data-value='疑似'>" +
                        "                    <button>疑似</button>" +
                        "                </li>" +
                        "                <li data-value='无'>" +
                        "                    <button>无</button>" +
                        "                </li>" +
                        "                <li data-value='不详'>" +
                        "                    <button>不详</button>" +
                        "                </li>" +
                        "            </ul>" +
                        "        </div>" +
                        "    </div>" +
                        "    <div class='layui-col-lg4'>" +
                        "        <div class='pc-db-item'>" +
                        "            <label>脑室内出血</label>" +
                        "            <input type='hidden' name='rightIntraventricularHemorrhage" + ctIndex + "'>" +
                        "            <ul class='pc-db-radioBtn-group pc-db-enter'>" +
                        "                <li data-value='确诊'>" +
                        "                    <button>确诊</button>" +
                        "                </li>" +
                        "                <li  data-value='疑似'>" +
                        "                    <button>疑似</button>" +
                        "                </li>" +
                        "                <li data-value='无'>" +
                        "                    <button>无</button>" +
                        "                </li>" +
                        "                <li data-value='不详'>" +
                        "                    <button>不详</button>" +
                        "                </li>" +
                        "            </ul>" +
                        "        </div>" +
                        "    </div>" +
                        "    <div class='layui-col-lg4'>" +
                        "        <div class='pc-db-item'>" +
                        "            <label>脑实质病变</label>" +
                        "            <input type='hidden' name='rightParenchymalBrainDisease" + ctIndex + "'>" +
                        "            <ul class='pc-db-radioBtn-group pc-db-enter'>" +
                        "                <li data-value='确诊'>" +
                        "                    <button>确诊</button>" +
                        "                </li>" +
                        "                <li data-value='疑似'>" +
                        "                    <button>疑似</button>" +
                        "                </li>" +
                        "                <li data-value='无'>" +
                        "                    <button>无</button>" +
                        "                </li>" +
                        "                <li data-value='不详'>" +
                        "                    <button>不详</button>" +
                        "                </li>" +
                        "            </ul>" +
                        "        </div>" +
                        "    </div>" +
                        "    <div class='layui-col-lg4'>" +
                        "        <div class='pc-db-item'>" +
                        "            <label>脑室旁白质软化</label>" +
                        "            <input type='hidden' name='rightPeriventricularWhiteMatterSoftening" + ctIndex + "'>" +
                        "            <ul class='pc-db-radioBtn-group pc-db-enter'>" +
                        "                <li data-value='确诊'>" +
                        "                    <button>确诊</button>" +
                        "                </li>" +
                        "                <li data-value='疑似'>" +
                        "                    <button>疑似</button>" +
                        "                </li>" +
                        "                <li data-value='无'>" +
                        "                    <button>无</button>" +
                        "                </li>" +
                        "                <li data-value='不详'>" +
                        "                    <button>不详</button>" +
                        "                </li>" +
                        "            </ul>" +
                        "        </div>" +
                        "    </div>" +
                        "    <div class='layui-col-lg4'>" +
                        "        <div class='pc-db-item'>" +
                        "            <label class='pc-switch-label'>脑室扩增</label>" +
                        "            <input type='checkbox' name='rightVentricularExpansion" + ctIndex + "' lay-filter='RVE' lay-skin='switch' lay-text='有|无' value='1'>" +
                        "        </div>" +
                        "    </div>" +
                        "    <div class='layui-col-lg4'>" +
                        "        <div class='pc-db-item pc-db-item-unit-lg'>" +
                        "            <label for='PC-db-RVES" + ctIndex + "'>脑室扩增大小</label>" +
                        "            <input id='PC-db-RVES" + ctIndex + "' type='number' data-name='rightVentricularExpansionSize" + ctIndex + "' disabled>" +
                        "            <span>mm</span>" +
                        "        </div>" +
                        "    </div>" +
                        "    <div class='layui-col-lg4'>" +
                        "        <div class='pc-db-item'>" +
                        "            <label class='pc-switch-label'>脑梗塞</label>" +
                        "            <input type='checkbox' name='rightCerebralInfarction" + ctIndex + "' lay-skin='switch' lay-text='有|无' value='1'>" +
                        "        </div>" +
                        "    </div>" +
                        "    <div class='layui-col-lg4'>" +
                        "        <div class='pc-db-item'>" +
                        "            <label class='pc-switch-label'>脑积水</label>" +
                        "            <input type='checkbox' name='rightHydrocephalus" + ctIndex + "' lay-skin='switch' lay-text='有|无' value='1'>" +
                        "        </div>" +
                        "    </div>" +
                        "    <div class='layui-col-lg4'>" +
                        "        <div class='pc-db-item lg'>" +
                        "            <label class='pc-switch-label'>新生儿缺氧缺血性脑病</label>" +
                        "            <input type='checkbox' name='rightNeonatalHypoxicIschemicEncephalopathy" + ctIndex + "' lay-skin='switch' lay-text='有|无' value='1'>" +
                        "        </div>" +
                        "    </div>" +
                        "    <div class='layui-col-lg12'>" +
                        "        <div id='PC-db-ROCD" + ctIndex + "' class='pc-db-item'>" +
                        "            <label>其他中枢病变</label>" +
                        "            <div class='pc-db-item-checkbox'>" +
                        "                <input type='checkbox' name='rightOtherCentralDiseaseSubarachnoidHemorrhage" + ctIndex + "' value='1' title='蛛网膜下腔出血'>" +
                        "                <input type='checkbox' name='rightOtherCentralDiseaseSubduralHemorrhage" + ctIndex + "' value='1' title='硬膜下出血'>" +
                        "                <input type='checkbox' name='rightOtherCentralDiseaseTentoriumHemorrhage" + ctIndex + "' value='1' title='小脑幕出血'>" +
                        "                <input type='checkbox' name='rightOtherCentralDiseaseHydrocephalus" + ctIndex + "' value='1' title='脑积水'>" +
                        "                <input type='checkbox' name='rightOtherCentralDiseaseArachnoidCyst" + ctIndex + "' value='1' title='蛛网膜囊肿'>" +
                        "                <input type='checkbox' name='rightOtherCentralDiseaseCaudateSulcusCyst" + ctIndex + "' value='1' title='尾状沟囊肿'>" +
                        "                <input type='checkbox' name='rightOtherCentralDiseaseChoroidPlexusCyst" + ctIndex + "' value='1' title='脉络丛囊肿'>" +
                        "                <input type='checkbox' name='rightOtherCentralDiseaseSubependymalCyst" + ctIndex + "' value='1' title='室管膜下囊肿'>" +
                        "                <input type='checkbox' name='rightOtherCentralDiseaseOtherBrainParenchymalCysts" + ctIndex + "' value='1' title='其它脑实质囊肿'>" +
                        "                <input type='checkbox' lay-filter='ROCDO" + ctIndex + "' title='其它'>" +
                        "                <input id='PC-db-ROCDO" + ctIndex + "' type='text' data-name='rightOtherCentralDiseaseOther" + ctIndex + "' disabled>" +
                        "            </div>" +
                        "        </div>" +
                        "    </div>" +
                        "    <div class='layui-col-lg12'>" +
                        "        <div class='pc-db-h1-wrap'>" +
                        "            <h1>CT2个层面图像</h1>" +
                        "        </div>" +
                        "    </div>" +
                        "    <div class='layui-col-lg12'>" +
                        "        <div>" +
                        "            <div id='PC-db-section1" + ctIndex + "' class='pc-db-images'>" +
                        "                <div>层面1</div>" +
                        "                <div>" +
                        "                    <button class='pc-btn' type='button'>点击上传图片</button>" +
                        "                </div>" +
                        "                <img src=''/>" +
                        "                <input id='PC-db-section1-URL" + ctIndex + "' type='hidden' name='section1Url" + ctIndex + "'>" +
                        "            </div>" +
                        "            <div id='PC-db-section2" + ctIndex + "' class='pc-db-images'>" +
                        "                <div>层面2</div>" +
                        "                <div>" +
                        "                    <button class='pc-btn' type='button'>点击上传图片</button>" +
                        "                </div>" +
                        "                <img src=''/>" +
                        "                <input id='PC-db-section2-URL" + ctIndex + "' type='hidden' name='section2Url" + ctIndex + "'>" +
                        "            </div>" +
                        "        </div>" +
                        "    </div>" +
                        "    <div class='layui-col-lg12'>" +
                        "        <div class='pc-db-h1-wrap'>" +
                        "            <h1>说明</h1>" +
                        "        </div>" +
                        "    </div>" +
                        "    <div class='layui-col-lg12'>" +
                        "        <div class='pc-db-item'>" +
                        "            <textarea rows='6' cols='40' name='ctExplanation" + ctIndex + "'></textarea>" +
                        "        </div>" +
                        "    </div>" +
                        "</div>");
                }, function () {
                    form.render("checkbox");
                }, function () {
                    const thisCtIndex = ctIndex;
                    $("#PC-db-CT" + thisCtIndex + " .pc-db-radioBtn-group>li").on("click", function () {
                        activeRBGChoice(this);
                    });
                    ocdHeight("L", thisCtIndex);
                    ocdHeight("R", thisCtIndex);
                    // 点击label实现switch开关
                    $(".pc-switch-label").on("click", function () {
                        $(this).nextAll(".layui-form-switch").click();
                    });
                }, function () {
                    const thisCtIndex = ctIndex;
                    laydate.render({
                        elem: "#PC-db-LIT" + thisCtIndex,
                        type: "datetime",
                        format: "yyyy-MM-dd HH:mm:ss",
                        max: 1
                    });
                    laydate.render({
                        elem: "#PC-db-RIT" + thisCtIndex,
                        type: "datetime",
                        format: "yyyy-MM-dd HH:mm:ss",
                        max: 1
                    });
                    // 左侧 其他中枢病变 其他
                    form.on("checkbox(LOCDO" + thisCtIndex + ")", function (data) {
                        if (data.elem.checked) {
                            $("#PC-db-LOCDO" + thisCtIndex).removeAttr("disabled").attr("name", function () {
                                return $(this).attr("data-name");
                            });
                        } else {
                            $("#PC-db-LOCDO" + thisCtIndex).removeAttr("name").attr("disabled", true).val("");
                        }
                    });
                    // 右侧 其他中枢病变 其他
                    form.on("checkbox(ROCDO" + thisCtIndex + ")", function (data) {
                        if (data.elem.checked) {
                            $("#PC-db-ROCDO" + thisCtIndex).removeAttr("disabled").attr("name", function () {
                                return $(this).attr("data-name");
                            });
                        } else {
                            $("#PC-db-ROCDO" + thisCtIndex).removeAttr("name").attr("disabled", true).val("");
                        }
                    });
                    upload.render({
                        elem: "#PC-db-section1" + thisCtIndex + " button",
                        accept: "images",
                        acceptMime: "image/*",
                        field: "image",
                        url: "/perinatalPlatform/basicDatabase/write/NS/CT/uploadCtImg?num=1&index=" + thisCtIndex,
                        done: function(res) {
                            const imgElem = $("#PC-db-section1" + thisCtIndex + " img");
                            if (res.code === 0) {
                                const url = res.url;
                                $("#PC-db-section1-URL" + thisCtIndex).val(url);
                                $(imgElem).attr("src", url).attr("layer-src", url);
                                layer.photos({
                                    photos: "#PC-db-section1" + thisCtIndex,
                                    anim: 5
                                });
                            } else {
                                $(imgElem).removeAttr("src layer-src");
                                return layer.msg("上传失败");
                            }
                        }
                    });
                    upload.render({
                        elem: "#PC-db-section2" + thisCtIndex + " button",
                        accept: "images",
                        acceptMime: "image/*",
                        field: "image",
                        url: "/perinatalPlatform/basicDatabase/write/NS/CT/uploadCtImg?num=2&index=" + thisCtIndex,
                        done: function(res) {
                            const imgElem = $("#PC-db-section2" + thisCtIndex + " img");
                            if (res.code === 0) {
                                const url = res.url;
                                $("#PC-db-section2-URL" + thisCtIndex).val(url);
                                $(imgElem).attr("src", url).attr("layer-src", url);
                                layer.photos({
                                    photos: "#PC-db-section2" + thisCtIndex,
                                    anim: 5
                                });
                            } else {
                                $(imgElem).removeAttr("src layer-src");
                                return layer.msg("上传失败");
                            }
                        }
                    });
                    // 脑室扩增大小
                    form.on("switch(LVE)", function (data) {
                        if (data.elem.checked) {
                            $("#PC-db-LVES" + thisCtIndex).removeAttr("disabled").attr("name", function () {
                                return $(this).attr("data-name");
                            });
                        } else {
                            $("#PC-db-LVES" + thisCtIndex).removeAttr("name").attr("disabled", true).val("");
                        }
                    });
                    form.on("switch(RVE)", function (data) {
                        if (data.elem.checked) {
                            $("#PC-db-RVES" + thisCtIndex).removeAttr("disabled").attr("name", function () {
                                return $(this).attr("data-name");
                            });
                        } else {
                            $("#PC-db-RVES" + thisCtIndex).removeAttr("name").attr("disabled", true).val("");
                        }
                    });
                    // 计算 神经系统 CT 异常次数
                    $("#PC-db-LIR" + thisCtIndex + ">.pc-db-radioBtn-group>li").on("click", function () {
                        const value = $(this).parents(".pc-db-radioBtn-group").prev("input").val();
                        if (value === "异常") {
                            $(this).parents(".pc-db-ct").addClass("pc-db-ct-ab");
                        } else if (value === "正常") {
                            const rirVal = $("#PC-db-RIR" + thisCtIndex + ">input").val();
                            if (rirVal === "正常" || rirVal === "") {
                                $(this).parents(".pc-db-ct").removeClass("pc-db-ct-ab");
                            }
                        }
                        $("#PC-db-CAN").val($(".pc-db-ct-ab").length);
                    });
                    $("#PC-db-RIR" + thisCtIndex + ">.pc-db-radioBtn-group>li").on("click", function () {
                        const value = $(this).parents(".pc-db-radioBtn-group").prev("input").val();
                        if (value === "异常") {
                            $(this).parents(".pc-db-ct").addClass("pc-db-ct-ab");
                        } else if (value === "正常") {
                            const lirVal = $("#PC-db-LIR" + thisCtIndex + ">input").val();
                            if (lirVal === "正常" || lirVal === "") {
                                $(this).parents(".pc-db-ct").removeClass("pc-db-ct-ab");
                            }
                        }
                        $("#PC-db-CAN").val($(".pc-db-ct-ab").length);
                    });
                    // 计算 神经系统 CT 次数
                    const ctTimes = $(".pc-db-BDNSCT .pc-db-ct").length;
                    $("#PC-db-CN").val(ctTimes);
                    // 删除 神经系统 CT
                    $("#PC-db-ctDelete" + thisCtIndex).on("click", function () {
                        const that = this;
                        layer.msg("确定要 <span class='pc-db-status-color-no'>删除</span> 此条CT检查信息吗?", {
                            icon: 7,
                            time: 0,
                            anim: 6,
                            btn: ["确定", "取消"],
                            resize: false,
                            shade: 0.8,
                            yes: function (index) {
                                $(that).parents(".pc-db-ct").remove();
                                // 计算 神经系统 CT 次数
                                const ctTimes = $(".pc-db-BDNSCT .pc-db-ct").length;
                                $("#PC-db-CN").val(ctTimes);
                                // 计算 神经系统 CT 异常 次数
                                const ctAbTimes = $(".pc-db-BDNSCT .pc-db-ct-ab").length;
                                $("#PC-db-CAN").val(ctAbTimes);
                                layer.close(index);
                            }
                        });
                    });
                });
            });

            // 基础数据库 神经系统 CT 添加/编辑 信息 提交
            form.on("submit(NSCT)", function (data) {
                const doing = "保存信息";
                loading(doing);
                let field = data.field, subData = {}, ctArray = [], flag = false;
                for (let i = 1; i <= ctIndex; i++) {
                    let ctJson = {};
                    if (notNullTool(field["leftInspectionTime" + i])) {
                        ctJson.leftInspectionTime = field["leftInspectionTime" + i];
                    }
                    if (notNullTool(field["leftInspectionResult" + i])) {
                        ctJson.leftInspectionResult = field["leftInspectionResult" + i];
                    }
                    if (notNullTool(field["leftGerminalHemorrhage" + i])) {
                        ctJson.leftGerminalHemorrhage = field["leftGerminalHemorrhage" + i];
                    }
                    if (notNullTool(field["leftIntraventricularHemorrhage" + i])) {
                        ctJson.leftIntraventricularHemorrhage = field["leftIntraventricularHemorrhage" + i];
                    }
                    if (notNullTool(field["leftParenchymalBrainDisease" + i])) {
                        ctJson.leftParenchymalBrainDisease = field["leftParenchymalBrainDisease" + i];
                    }
                    if (notNullTool(field["leftPeriventricularWhiteMatterSoftening" + i])) {
                        ctJson.leftPeriventricularWhiteMatterSoftening = field["leftPeriventricularWhiteMatterSoftening" + i];
                    }
                    if (notNullTool(field["leftVentricularExpansion" + i])) {
                        ctJson.leftVentricularExpansion = field["leftVentricularExpansion" + i];
                    }
                    if (notNullTool(field["leftVentricularExpansionSize" + i])) {
                        ctJson.leftVentricularExpansionSize = field["leftVentricularExpansionSize" + i];
                    }
                    if (notNullTool(field["leftCerebralInfarction" + i])) {
                        ctJson.leftCerebralInfarction = field["leftCerebralInfarction" + i];
                    }
                    if (notNullTool(field["leftHydrocephalus" + i])) {
                        ctJson.leftHydrocephalus = field["leftHydrocephalus" + i];
                    }
                    if (notNullTool(field["leftNeonatalHypoxicIschemicEncephalopathy" + i])) {
                        ctJson.leftNeonatalHypoxicIschemicEncephalopathy = field["leftNeonatalHypoxicIschemicEncephalopathy" + i];
                    }
                    if (notNullTool(field["leftOtherCentralDiseaseSubarachnoidHemorrhage" + i])) {
                        ctJson.leftOtherCentralDiseaseSubarachnoidHemorrhage = field["leftOtherCentralDiseaseSubarachnoidHemorrhage" + i];
                    }
                    if (notNullTool(field["leftOtherCentralDiseaseSubduralHemorrhage" + i])) {
                        ctJson.leftOtherCentralDiseaseSubduralHemorrhage = field["leftOtherCentralDiseaseSubduralHemorrhage" + i];
                    }
                    if (notNullTool(field["leftOtherCentralDiseaseTentoriumHemorrhage" + i])) {
                        ctJson.leftOtherCentralDiseaseTentoriumHemorrhage = field["leftOtherCentralDiseaseTentoriumHemorrhage" + i];
                    }
                    if (notNullTool(field["leftOtherCentralDiseaseHydrocephalus" + i])) {
                        ctJson.leftOtherCentralDiseaseHydrocephalus = field["leftOtherCentralDiseaseHydrocephalus" + i];
                    }
                    if (notNullTool(field["leftOtherCentralDiseaseArachnoidCyst" + i])) {
                        ctJson.leftOtherCentralDiseaseArachnoidCyst = field["leftOtherCentralDiseaseArachnoidCyst" + i];
                    }
                    if (notNullTool(field["leftOtherCentralDiseaseCaudateSulcusCyst" + i])) {
                        ctJson.leftOtherCentralDiseaseCaudateSulcusCyst = field["leftOtherCentralDiseaseCaudateSulcusCyst" + i];
                    }
                    if (notNullTool(field["leftOtherCentralDiseaseChoroidPlexusCyst" + i])) {
                        ctJson.leftOtherCentralDiseaseChoroidPlexusCyst = field["leftOtherCentralDiseaseChoroidPlexusCyst" + i];
                    }
                    if (notNullTool(field["leftOtherCentralDiseaseSubependymalCyst" + i])) {
                        ctJson.leftOtherCentralDiseaseSubependymalCyst = field["leftOtherCentralDiseaseSubependymalCyst" + i];
                    }
                    if (notNullTool(field["leftOtherCentralDiseaseOtherBrainParenchymalCysts" + i])) {
                        ctJson.leftOtherCentralDiseaseOtherBrainParenchymalCysts = field["leftOtherCentralDiseaseOtherBrainParenchymalCysts" + i];
                    }
                    if (notNullTool(field["leftOtherCentralDiseaseOther" + i])) {
                        ctJson.leftOtherCentralDiseaseOther = field["leftOtherCentralDiseaseOther" + i];
                    }
                    if (notNullTool(field["rightInspectionTime" + i])) {
                        ctJson.rightInspectionTime = field["rightInspectionTime" + i];
                    }
                    if (notNullTool(field["rightInspectionResult" + i])) {
                        ctJson.rightInspectionResult = field["rightInspectionResult" + i];
                    }
                    if (notNullTool(field["rightGerminalHemorrhage" + i])) {
                        ctJson.rightGerminalHemorrhage = field["rightGerminalHemorrhage" + i];
                    }
                    if (notNullTool(field["rightIntraventricularHemorrhage" + i])) {
                        ctJson.rightIntraventricularHemorrhage = field["rightIntraventricularHemorrhage" + i];
                    }
                    if (notNullTool(field["rightParenchymalBrainDisease" + i])) {
                        ctJson.rightParenchymalBrainDisease = field["rightParenchymalBrainDisease" + i];
                    }
                    if (notNullTool(field["rightPeriventricularWhiteMatterSoftening" + i])) {
                        ctJson.rightPeriventricularWhiteMatterSoftening = field["rightPeriventricularWhiteMatterSoftening" + i];
                    }
                    if (notNullTool(field["rightVentricularExpansion" + i])) {
                        ctJson.rightVentricularExpansion = field["rightVentricularExpansion" + i];
                    }
                    if (notNullTool(field["rightVentricularExpansionSize" + i])) {
                        ctJson.rightVentricularExpansionSize = field["rightVentricularExpansionSize" + i];
                    }
                    if (notNullTool(field["rightCerebralInfarction" + i])) {
                        ctJson.rightCerebralInfarction = field["rightCerebralInfarction" + i];
                    }
                    if (notNullTool(field["rightHydrocephalus" + i])) {
                        ctJson.rightHydrocephalus = field["rightHydrocephalus" + i];
                    }
                    if (notNullTool(field["rightNeonatalHypoxicIschemicEncephalopathy" + i])) {
                        ctJson.rightNeonatalHypoxicIschemicEncephalopathy = field["rightNeonatalHypoxicIschemicEncephalopathy" + i];
                    }
                    if (notNullTool(field["rightOtherCentralDiseaseSubarachnoidHemorrhage" + i])) {
                        ctJson.rightOtherCentralDiseaseSubarachnoidHemorrhage = field["rightOtherCentralDiseaseSubarachnoidHemorrhage" + i];
                    }
                    if (notNullTool(field["rightOtherCentralDiseaseSubduralHemorrhage" + i])) {
                        ctJson.rightOtherCentralDiseaseSubduralHemorrhage = field["rightOtherCentralDiseaseSubduralHemorrhage" + i];
                    }
                    if (notNullTool(field["rightOtherCentralDiseaseTentoriumHemorrhage" + i])) {
                        ctJson.rightOtherCentralDiseaseTentoriumHemorrhage = field["rightOtherCentralDiseaseTentoriumHemorrhage" + i];
                    }
                    if (notNullTool(field["rightOtherCentralDiseaseHydrocephalus" + i])) {
                        ctJson.rightOtherCentralDiseaseHydrocephalus = field["rightOtherCentralDiseaseHydrocephalus" + i];
                    }
                    if (notNullTool(field["rightOtherCentralDiseaseArachnoidCyst" + i])) {
                        ctJson.rightOtherCentralDiseaseArachnoidCyst = field["rightOtherCentralDiseaseArachnoidCyst" + i];
                    }
                    if (notNullTool(field["rightOtherCentralDiseaseCaudateSulcusCyst" + i])) {
                        ctJson.rightOtherCentralDiseaseCaudateSulcusCyst = field["rightOtherCentralDiseaseCaudateSulcusCyst" + i];
                    }
                    if (notNullTool(field["rightOtherCentralDiseaseChoroidPlexusCyst" + i])) {
                        ctJson.rightOtherCentralDiseaseChoroidPlexusCyst = field["rightOtherCentralDiseaseChoroidPlexusCyst" + i];
                    }
                    if (notNullTool(field["rightOtherCentralDiseaseSubependymalCyst" + i])) {
                        ctJson.rightOtherCentralDiseaseSubependymalCyst = field["rightOtherCentralDiseaseSubependymalCyst" + i];
                    }
                    if (notNullTool(field["rightOtherCentralDiseaseOtherBrainParenchymalCysts" + i])) {
                        ctJson.rightOtherCentralDiseaseOtherBrainParenchymalCysts = field["rightOtherCentralDiseaseOtherBrainParenchymalCysts" + i];
                    }
                    if (notNullTool(field["rightOtherCentralDiseaseOther" + i])) {
                        ctJson.rightOtherCentralDiseaseOther = field["rightOtherCentralDiseaseOther" + i];
                    }
                    if (notNullTool(field["section1Url" + i])) {
                        ctJson.section1Url = field["section1Url" + i];
                    }
                    if (notNullTool(field["section2Url" + i])) {
                        ctJson.section2Url = field["section2Url" + i];
                    }
                    if (notNullTool(field["ctExplanation" + i])) {
                        ctJson.ctExplanation = field["ctExplanation" + i];
                    }
                    if (Object.keys(ctJson).length > 0) {
                        ctArray.push(ctJson);
                    }
                }
                subData.checkNumber = field.ctNumber;
                subData.checkAbnormalNumber = field.ctAbnormalNumber;
                subData.ctArray = JSON.stringify(ctArray);
                $.post("/perinatalPlatform/basicDatabase/write/NS/CT/post", subData, function (back, status) {
                    if(status === "success") {
                        if(back.code) {
                            successNext();
                        }else {failMsg(doing)}
                    }else {errorMsg1()}
                }, "json").fail(function () {errorMsg2()});
            });
        }

        // 基础数据库 神经系统 脑电图检查
        if ($(".pc-db-BDNSEEG").length > 0) {
            let eegIndex = 0;
            // 初始化 脑电图检查
            const eegIndexInput = $(".pc-db-BDNSEEG .pc-db-table>tbody").attr("data-num");
            if (notNullTool(eegIndexInput)) {
                eegIndex = parseInt(eegIndexInput);
                // 为 日期 选择 初始化
                for (let i = 1; i <= eegIndex; i++) {
                    const thisEegIndex = i;
                    laydate.render({
                        elem: "#PC-db-IT" + thisEegIndex,
                        type: "datetime",
                        format: "yyyy-MM-dd HH:mm:ss",
                        max: 1
                    });
                    // 计算 神经系统 脑电图检查 异常次数
                    form.on("select(IR)", function (data) {
                        const value = data.value;
                        if (notNullTool(value)) {
                            if (value === "正常") {
                                $(data.elem).parents("tr").removeClass("pc-db-eeg-ab");
                            } else {
                                $(data.elem).parents("tr").addClass("pc-db-eeg-ab");
                            }
                            $("#PC-db-EAN").val($(".pc-db-eeg-ab").length);
                        }
                    });
                    // 删除 脑电图检查 行
                    $("#PC-db-eegDelete" + thisEegIndex).on("click", function () {
                        const that = this;
                        layer.msg("确定要 <span class='pc-db-status-color-no'>删除</span> 此条脑电图检查信息吗?", {
                            icon: 7,
                            time: 0,
                            anim: 6,
                            btn: ["确定", "取消"],
                            resize: false,
                            shade: 0.8,
                            yes: function (index) {
                                $(that).parents("tr").remove();
                                // 计算 脑电图检查 次数
                                const eegTimes = $(".pc-db-BDNSEEG .pc-db-table>tbody>tr").length - 1;
                                $("#PC-db-EN").val(eegTimes);
                                layer.close(index);
                            }
                        });
                    });
                }
            }
            // 增加 脑电图检查
            $("#PC-db-addEEG").on("click", function () {
                const that = this;
                eegIndex++;
                sequentialExecution(function () {
                    $(that).parents("tr").before(
                        "<tr>" +
                        "   <td>" +
                        "       <input id='PC-db-IT" + eegIndex + "' type='text' name='inspectionTime" + eegIndex + "' lay-verify='required' placeholder='请选择检查时间' lay-reqText='请选择检查时间！' readonly>" +
                        "   </td>" +
                        "   <td>" +
                        "       <select name='inspectionResult" + eegIndex + "' lay-reqText='请选择检查结果！' lay-filter='IR' lay-verify='required'>" +
                        "           <option value=''>请选择检查结果</option>" +
                        "           <option value='正常'>正常</option>" +
                        "           <option value='轻度异常'>轻度异常</option>" +
                        "           <option value='中度异常'>中度异常</option>" +
                        "           <option value='重度异常'>重度异常</option>" +
                        "       </select>" +
                        "   </td>" +
                        "   <td>" +
                        "       <input type='text' name='waveformSituation" + eegIndex + "' placeholder='请填写波形情况'>" +
                        "   </td>" +
                        "   <td>" +
                        "       <button id='PC-db-eegDelete" + eegIndex + "' class='pc-btn pc-btn-danger'><i class='iconfont icon-delete'></i></button>" +
                        "   </td>" +
                        "</tr>");
                }, function () {
                    form.render("select");
                }, function () {
                    const thisEegIndex = eegIndex;
                    laydate.render({
                        elem: "#PC-db-IT" + thisEegIndex,
                        type: "datetime",
                        format: "yyyy-MM-dd HH:mm:ss",
                        max: 1
                    });
                    // 计算 神经系统 脑电图检查 异常次数
                    form.on("select(IR)", function (data) {
                        const value = data.value;
                        if (notNullTool(value)) {
                            if (value === "正常") {
                                $(data.elem).parents("tr").removeClass("pc-db-eeg-ab");
                            } else {
                                $(data.elem).parents("tr").addClass("pc-db-eeg-ab");
                            }
                            $("#PC-db-EAN").val($(".pc-db-eeg-ab").length);
                        }
                    });
                    // 计算 脑电图检查 次数
                    const eegTimes = $(".pc-db-BDNSEEG .pc-db-table>tbody>tr").length - 1;
                    $("#PC-db-EN").val(eegTimes);
                    // 删除 脑电图检查 行
                    $("#PC-db-eegDelete" + thisEegIndex).on("click", function () {
                        const that = this;
                        layer.msg("确定要 <span class='pc-db-status-color-no'>删除</span> 此条脑电图检查信息吗?", {
                            icon: 7,
                            time: 0,
                            anim: 6,
                            btn: ["确定", "取消"],
                            resize: false,
                            shade: 0.8,
                            yes: function (index) {
                                $(that).parents("tr").remove();
                                // 计算 脑电图检查 次数
                                const eegTimes = $(".pc-db-BDNSEEG .pc-db-table>tbody>tr").length - 1;
                                $("#PC-db-EN").val(eegTimes);
                                layer.close(index);
                            }
                        });
                    });
                });
            });

            // 基础数据库 神经系统 脑电图检查过 添加/编辑 信息 提交
            form.on("submit(NSEEG)", function (data) {
                const doing = "保存信息";
                loading(doing);
                let field = data.field, subData = {}, eegArray = [];
                for (let i = 1; i <= eegIndex; i++) {
                    let eegJson = {};
                    if (notNullTool(field["inspectionTime" + i])) {
                        eegJson.inspectionTime = field["inspectionTime" + i];
                    }
                    if (notNullTool(field["inspectionResult" + i])) {
                        eegJson.inspectionResult = field["inspectionResult" + i];
                    }
                    if (notNullTool(field["waveformSituation" + i])) {
                        eegJson.waveformSituation = field["waveformSituation" + i];
                    }
                    if (Object.keys(eegJson).length > 0) {
                        eegArray.push(eegJson);
                    }
                }
                subData.checkNumber = field.eegNumber;
                subData.checkAbnormalNumber = field.eegAbnormalNumber;
                subData.eegArray = JSON.stringify(eegArray);
                $.post("/perinatalPlatform/basicDatabase/write/NS/EEG/post", subData, function (back, status) {
                    if(status === "success") {
                        if(back.code) {
                            successNext();
                        }else {failMsg(doing)}
                    }else {errorMsg1()}
                }, "json").fail(function () {errorMsg2()});
            });
        }

        // 基础数据库 神经系统 辅助检查
        if ($(".pc-db-BDNSAE").length > 0) {
            ocdHeight("L", "");
            ocdHeight("R", "");
            // 左侧 检查时间
            laydate.render({
                elem: "#PC-db-LIT",
                type: "datetime",
                format: "yyyy-MM-dd HH:mm:ss",
                max: 1
            });

            // 左侧 脑电图 检查时间
            laydate.render({
                elem: "#PC-db-LEEGT",
                type: "datetime",
                format: "yyyy-MM-dd HH:mm:ss",
                max: 1
            });

            // 左侧 其他中枢病变 其他
            form.on("checkbox(LOCDO)", function (data) {
                if (data.elem.checked) {
                    $("#PC-db-LOCDO").removeAttr("disabled").attr("name", function () {
                        return $(this).attr("data-name");
                    });
                } else {
                    $("#PC-db-LOCDO").removeAttr("name").attr("disabled", true).val("");
                }
            });

            // 左侧 脑室扩增 开关
            form.on("switch(LVE)", function (data) {
                if (data.elem.checked) {
                    $("#PC-db-LVES").removeAttr("disabled").attr("lay-verify", "requiredDB").attr("name", function () {
                        return $(this).attr("data-name");
                    });
                } else {
                    $("#PC-db-LVES").removeAttr("name lay-verify").attr("disabled", true).val("");
                }
            });

            // 左侧 脑电图 开关
            $("#PC-db-LEEGR>.pc-db-radioBtn-group>li").off("click");
            form.on("switch(LEEG)", function (data) {
                if (data.elem.checked) {
                    $("#PC-db-LEEGT").removeAttr("disabled").attr("lay-verify", "requiredDB").attr("name", function () {
                        return $(this).attr("data-name");
                    });
                    $("#PC-db-LEEGR>input").attr("lay-verify", "requiredRadioGroup").attr("name", function () {
                        return $(this).attr("data-name");
                    });
                    $("#PC-db-LEEGR>.pc-db-radioBtn-group").removeClass("rbgOff");
                    $("#PC-db-LEEGR>.pc-db-radioBtn-group>li").on("click", function () {
                        const that = this;
                        activeRBGChoice(that);
                    });
                } else {
                    $("#PC-db-LEEGT").removeAttr("name lay-verify").attr("disabled", true).val("");
                    $("#PC-db-LEEGR>input").removeAttr("name lay-verify").val("");
                    $("#PC-db-LEEGR>.pc-db-radioBtn-group").addClass("rbgOff");
                    $("#PC-db-LEEGR>.pc-db-radioBtn-group>li").removeClass("pc-db-active").off("click");
                }
            });

            // 右侧 检查时间
            laydate.render({
                elem: "#PC-db-RIT",
                type: "datetime",
                format: "yyyy-MM-dd HH:mm:ss",
                max: 1
            });

            // 右侧 脑电图 检查时间
            laydate.render({
                elem: "#PC-db-REEGT",
                type: "datetime",
                format: "yyyy-MM-dd HH:mm:ss",
                max: 1
            });

            // 右侧 其他中枢病变 其他
            form.on("checkbox(ROCDO)", function (data) {
                if (data.elem.checked) {
                    $("#PC-db-ROCDO").removeAttr("disabled").attr("name", function () {
                        return $(this).attr("data-name");
                    });
                } else {
                    $("#PC-db-ROCDO").removeAttr("name").attr("disabled", true).val("");
                }
            });

            // 右侧 脑室扩增 开关
            form.on("switch(RVE)", function (data) {
                if (data.elem.checked) {
                    $("#PC-db-RVES").removeAttr("disabled").attr("lay-verify", "requiredDB").attr("name", function () {
                        return $(this).attr("data-name");
                    });
                } else {
                    $("#PC-db-RVES").removeAttr("name lay-verify").attr("disabled", true).val("");
                }
            });

            // 右侧 脑电图 开关
            $("#PC-db-REEGR>.pc-db-radioBtn-group>li").off("click");
            form.on("switch(REEG)", function (data) {
                if (data.elem.checked) {
                    $("#PC-db-REEGT").removeAttr("disabled").attr("lay-verify", "requiredDB").attr("name", function () {
                        return $(this).attr("data-name");
                    });
                    $("#PC-db-REEGR>input").attr("lay-verify", "requiredRadioGroup").attr("name", function () {
                        return $(this).attr("data-name");
                    });
                    $("#PC-db-REEGR>.pc-db-radioBtn-group").removeClass("rbgOff");
                    $("#PC-db-REEGR>.pc-db-radioBtn-group>li").on("click", function () {
                        const that = this;
                        activeRBGChoice(that);
                    });
                } else {
                    $("#PC-db-REEGT").removeAttr("name lay-verify").attr("disabled", true).val("");
                    $("#PC-db-REEGR>input").removeAttr("name lay-verify").val("");
                    $("#PC-db-REEGR>.pc-db-radioBtn-group").addClass("rbgOff");
                    $("#PC-db-REEGR>.pc-db-radioBtn-group>li").removeClass("pc-db-active").off("click");
                }
            });

            // 基础数据库 神经系统 辅助检查 添加/编辑 信息 提交
            form.on("submit(NSAE)", function (data) {
                const doing = "保存信息";
                loading(doing);
                $.post("/perinatalPlatform/basicDatabase/write/NS/AE/post",data.field, function (back, status) {
                    if(status === "success") {
                        if(back.code) {
                            successNext();
                        }else {failMsg(doing)}
                    }else {errorMsg1()}
                }, "json").fail(function () {errorMsg2()});
            });
        }

        // 基础数据库 神经系统 治疗及诊断
        if ($(".pc-db-BDNSTD")) {
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

            // 新生儿缺血缺氧性脑病 诊断日期
            laydate.render({
                elem: "#PC-db-NHIEDD",
                type: "date",
                format: "yyyy-MM-dd",
                max: 0
            });

            // 新生儿缺血缺氧性脑病 开关
            form.on("switch(NHIE)", function (data) {
                if (data.elem.checked) {
                    $("#PC-db-NHIEDD").removeAttr("disabled").attr("lay-verify", "requiredDB").attr("name", function () {
                        return $(this).attr("data-name");
                    });
                } else {
                    $("#PC-db-NHIEDD").removeAttr("name lay-verify").attr("disabled", true).val("");
                }
            });

            // 亚低温 开始时间
            laydate.render({
                elem: "#PC-db-MHST",
                type: "datetime",
                format: "yyyy-MM-dd HH:mm:ss",
                max: 1
            });

            // 亚低温 到达目标温度时间
            laydate.render({
                elem: "#PC-db-MHRTTT",
                type: "datetime",
                format: "yyyy-MM-dd HH:mm:ss",
                max: 1
            });

            // 新生儿缺血缺氧性脑病 开关
            form.on("switch(MH)", function (data) {
                if (data.elem.checked) {
                    $("#PC-db-MHST, #PC-db-MHRTTT").removeAttr("disabled").attr("lay-verify", "requiredDB").attr("name", function () {
                        return $(this).attr("data-name");
                    });
                } else {
                    $("#PC-db-MHST, #PC-db-MHRTTT").removeAttr("name lay-verify").attr("disabled", true).val("");
                }
            });

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

            // 基础数据库 神经系统 治疗及诊断 添加/编辑 信息 提交
            form.on("submit(NSTD)", function (data) {
                const doing = "保存信息";
                let field = data.field;
                for (const i in field) {
                    if (!notNullTool(field[i])) {
                        delete field[i];
                    }
                }
                loading(doing);
                $.post("/perinatalPlatform/basicDatabase/write/NS/TD/post",field, function (back, status) {
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