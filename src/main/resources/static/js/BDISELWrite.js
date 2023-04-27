// 删除 表格 危险因素 行
function deleteRf(that) {
    layer.msg("确定要 <span class='pc-db-status-color-no'>删除</span> 此条评估信息吗?",{
        icon: 7,
        time: 0,
        anim: 6,
        btn: ["确定", "取消"],
        resize: false,
        shade: 0.8,
        yes: function (index) {
            $(that).parents("tr").remove();
            layer.close(index);
        }
    });
}
// 删除 表格 系统评估 行
function deleteAe(that) {
    layer.msg("确定要 <span class='pc-db-status-color-no'>删除</span> 此条评估信息吗?",{
        icon: 7,
        time: 0,
        anim: 6,
        btn: ["确定", "取消"],
        resize: false,
        shade: 0.8,
        yes: function (index) {
            $(that).parents("tr").remove();
            $(".pc-db-BDISEOS #PC-db-evaluationsNumber").val($(".pc-db-BDISEOST1 .pc-db-item-table .pc-db-table tbody>tr").length - 1);
            $(".pc-db-BDISLOS #PC-db-evaluationsNumber").val($(".pc-db-BDISLOST1 .pc-db-item-table.table2 .pc-db-table tbody>tr").length - 1);
            layer.close(index);
        }
    });
}
// 获取 血培养 表格长度
function computeTrLength(num) {
    const eosTr = $(".pc-db-BDISEOST" + num + " .pc-db-item-table .pc-db-table tbody>tr"),
        losTr = $(".pc-db-BDISLOST" + num + " .pc-db-item-table .pc-db-table tbody>tr");
    if (notNullTool(eosTr) && $(eosTr).length > 0) {
        return eosTr.length - 1;
    } else if (notNullTool(losTr) && $(losTr).length > 0) {
        return losTr.length - 1;
    }
}
// 计算 血培养/脑脊液培养 阴阳性 次数
function computePn(bcPnId, bcPnClass, num) {
    const eosElem = $(".pc-db-BDISEOST" + num),
        losElem = $(".pc-db-BDISLOST" + num);
    if (notNullTool(eosElem) && $(eosElem).length > 0) {
        const trEosElem = $(eosElem).find(".pc-db-table").find("tbody").find("tr." + bcPnClass);
        $("#PC-db-" + bcPnId).val(trEosElem.length);
    } else if (notNullTool(losElem) && $(losElem).length > 0) {
        const trLosElem = $(losElem).find(".pc-db-table").find("tbody").find("tr." + bcPnClass);
        $("#PC-db-" + bcPnId).val(trLosElem.length);
    }
}
// 删除 表格 脑脊液培养 行
function deleteCfc(that) {
    layer.msg("确定要 <span class='pc-db-status-color-no'>删除</span> 此条脑脊液培养信息吗?",{
        icon: 7,
        time: 0,
        anim: 6,
        btn: ["确定", "取消"],
        resize: false,
        shade: 0.8,
        yes: function (index) {
            $(that).parents("tr").remove();
            $("#PC-db-CFCN").val(computeTrLength(4));
            computePn("PCFCN", "positive", 4);
            computePn("NCFCN", "negative", 4);
            layer.close(index);
        }
    });
}
// 选择 系统位置
function selectAESL(form, aeAcmJson) {
    form.on("select(AESL)", function (data) {
        const value = data.value;
        if (notNullTool(value)) {
            $(data.elem).parent("td").next("td").find("option[value!='']").remove();
            const selectAECM = $(data.elem).parent("td").next("td").children("select");
            if (value === "全身") {
                $.each(aeAcmJson.wholeBodyList, function (index, wholeBody) {
                    $(selectAECM).append("<option value='" + wholeBody + "'>" + wholeBody + "</option>");
                });
            } else if (value === "消化系统") {
                $.each(aeAcmJson.digestiveSystemList, function (index, digestiveSystem) {
                    $(selectAECM).append("<option value='" + digestiveSystem + "'>" + digestiveSystem + "</option>");
                });
            } else if (value === "呼吸系统") {
                $.each(aeAcmJson.respiratorySystemList, function (index, respiratorySystem) {
                    $(selectAECM).append("<option value='" + respiratorySystem + "'>" + respiratorySystem + "</option>");
                });
            } else if (value === "循环系统") {
                $.each(aeAcmJson.circulatorySystemList, function (index, circulatorySystem) {
                    $(selectAECM).append("<option value='" + circulatorySystem + "'>" + circulatorySystem + "</option>");
                });
            } else if (value === "泌尿系统") {
                $.each(aeAcmJson.urinarySystemList, function (index, urinarySystem) {
                    $(selectAECM).append("<option value='" + urinarySystem + "'>" + urinarySystem + "</option>");
                });
            } else if (value === "血液系统") {
                $.each(aeAcmJson.bloodSystemList, function (index, bloodSystem) {
                    $(selectAECM).append("<option value='" + bloodSystem + "'>" + bloodSystem + "</option>");
                });
            }
        }
        form.render("select");
    });
}
$(document).ready(function () {
    const aeAcmJson = {
        wholeBodyList: ["发热", "体温不稳", "反应差", "喂养差", "水肿", "Apgar评分低"],
        digestiveSystemList: ["黄疸", "腹胀", "呕吐或胃潴留", "腹泻及肝脾肿大", "消化道出血"],
        respiratorySystemList: ["呼吸困难", "呼吸暂停", "发绀"],
        circulatorySystemList: ["面色苍白", "四肢冷", "心动过速、过缓", "皮肤大理石样花纹", "低血压或毛细血管充盈时间＞3S"],
        urinarySystemList: ["少尿及肾功能衰竭"],
        bloodSystemList: ["出血", "紫癜"]
    },
        positiveBacteriaList = ["大肠埃希菌", "肺炎克雷伯菌", "鲍曼不动杆菌", "绿脓假单细胞君", "木糖氧化无色杆菌/木糖氧化产碱杆菌",
            "金黄色葡萄杆菌（甲氧西林敏感，MSSA）", "金黄色葡萄杆菌（耐甲氧西林，MRSA）", "B族链球菌（无乳链球菌，GBS）", "凝固酶阴性葡萄球菌（未分类）",
            "表皮葡萄球菌", "人葡萄球菌", "溶血葡萄球菌", "头葡萄球菌", "沃氏葡萄球菌", "路邓葡萄球菌", "肠球菌", "屎肠球菌", "粪肠球菌",
            "李斯特菌（产单核李斯特菌）", "白色念珠菌", "光滑假丝酵母菌", "近平滑假丝酵母菌", "季也蒙假丝酵母菌", "热带假丝酵母菌", "β溶血链球菌", "α溶血链球菌",
            "肠道链球菌", "咽峡链球菌", "米勒链条君", "草绿色链条君", "肺炎链条君", "鸟肠球菌", "鹑鸡肠球菌", "牛链条君", "醋酸钙不动杆菌",
            "鲁菲不动杆菌或鲁氏不动杆菌", "不动杆菌属（其他或未分类）", "异型柠檬酸菌", "弗氏枸橼酸杆菌", "聚团肠杆菌", "阪崎肠杆菌", "产气真细菌",
            "克雷伯菌（其他或未分类）", "产酸克雷伯菌", "莫拉氏菌", "产气巴斯德菌", "变形菌属", "产碱假单胞菌", "荧光假单胞菌", "阿哥拉沙门菌", "鼠伤寒沙门菌",
            "粘质沙雷菌", "嗜麦芽窄养单胞菌", "流感嗜血杆菌", "棒状杆菌属", "空肠弯曲杆菌", "放线菌属", "双歧杆菌属", "白喉杆菌", "乳酸杆菌", "乳酸乳球菌",
            "奈瑟菌属", "蜡样芽孢杆菌", "饲料类芽孢杆菌", "葡萄牙假丝酵母菌", "菌膜假丝酵母菌", "脑膜脓毒黄杆菌", "栖稻黄色单胞菌", "浅黄金色单胞菌",
            "少动鞘氨醇单胞菌", "洋葱伯克霍尔德菌", "糠秕马拉色氏霉菌", "深红酵母菌", "巨细胞病毒", "单纯性疱疹病毒1型", "单纯性疱疹病毒2型", "肠道病毒",
            "革兰阳性球菌（其他或未分类）", "革兰阳性杆菌（其他或未分类）", "革兰阳性菌（其他或未分类）", "革兰阴性球菌（其他或未分类）", "革兰阴性厌氧菌",
            "念珠菌属（其他或未分类）", "真菌（其他或未分类）", "其他病原", "木糖氧化无色杆菌/木糖氧化产碱杆菌", "腺病毒", "洋葱伯克霍尔德菌", "念珠菌",
            "菌膜假丝酵母菌", "脑膜脓毒黄杆菌", "浅黄金色单胞菌", "沙眼衣原体", "屎肠球菌", "栖稻黄色单胞菌", "革兰阴性菌", "流感病毒", "B型流感病毒", "支原体",
            "副流感病毒", "呼吸道合胞病毒", "少动鞘胺醇单胞菌", "甲氧西林敏感金黄色葡萄球菌", "葡萄球菌", "葡萄球菌属", "嗜麦芽窄养单胞菌", "咽峡链球菌",
            "解脲脲原体", "酵母菌"];

    // 计算 生后72小时
    const ab72hdElem = $("#PC-db-AB72HD, #PC-db-ABOGE72HD"),
        birthday1 = $(ab72hdElem).attr("data-birthday");
    if (notNullTool(birthday1) && !notNullTool($(ab72hdElem).val())) {
        const birthdayStamp = Date.parse(birthday1),
            ab72hdStamp = birthdayStamp + 72*3600000,
            ab72hd = new Date(ab72hdStamp);
        $(ab72hdElem).val(dateFormat(ab72hd));
    }

    // 引入 layui
    layui.use(["element", "form", "laydate"], function () {
        let form = layui.form,
            laydate = layui.laydate;

        // 确诊临床早发型败血症 诊断时间
        laydate.render({
            elem: "#PC-db-DLOSDT",
            type: "datetime",
            format: "yyyy-MM-dd HH:mm:ss",
            max: 1
        });
        // 确诊临床早发型败血症 后面的 诊断次数、时间
        form.on("switch(DLOS)", function (data) {
            const dceosElem = $("#PC-db-DLOSDN, #PC-db-DLOSDT");
            if (data.elem.checked) {
                $(dceosElem).removeAttr("disabled").attr("lay-verify", "requiredDB").attr("name", function () {
                    return $(this).attr("data-name");
                });
            } else {
                $(dceosElem).removeAttr("lay-verify name").attr("disabled", true).val("");
            }
        });

        // 危险因素 项数
        let rfIndex = 0;
        // 增加 危险因素
        $("#PC-db-addLOSRF").on("click", function () {
            const that = this;
            rfIndex++;
            sequentialExecution(function () {
                $(that).parents("tr").before(
                    "<tr>" +
                    "   <td>" +
                    "       <input id='PC-db-RFET" + rfIndex + "' type='text' name='rfEvaluationTime" + rfIndex + "' lay-verify='required' placeholder='请选择评估时间' lay-reqText='请选危险因素评估时间！' readonly>" +
                    "   </td>" +
                    "   <td>" +
                    "       <select name='riskFactor" + rfIndex + "' lay-reqText='请选择危险因素！' lay-verify='required'>" +
                    "           <option value=''>请选择危险因素</option>" +
                    "           <option value='机械通气'>机械通气</option>" +
                    "           <option value='中心静脉置管'>中心静脉置管</option>" +
                    "           <option value='脐动脉或静脉置管'>脐动脉或静脉置管</option>" +
                    "           <option value='肠外营养'>肠外营养</option>" +
                    "           <option value='不合理应用抗菌药物'>不合理应用抗菌药物</option>" +
                    "           <option value='不恰当的新生儿处理'>不恰当的新生儿处理</option>" +
                    "       </select>" +
                    "   </td>" +
                    "   <td>" +
                    "       <button onclick='deleteRf(this);' class='pc-btn pc-btn-danger'><i class='iconfont icon-delete'></i></button>" +
                    "   </td>" +
                    "</tr>");
            }, function () {
                form.render("select");
                laydate.render({
                    elem: "#PC-db-RFET" + rfIndex,
                    type: "datetime",
                    format: "yyyy-MM-dd HH:mm:ss",
                    max: 1
                });
            });
        });

        // 系统评估 项数
        let aeIndex = 0;
        // 初始化 系统评估
        const aeIndexInput = $(".pc-db-BDISEOST1 .pc-db-table>tbody, .pc-db-BDISLOST1 .table2>.pc-db-table>tbody").attr("data-num");
        if (notNullTool(aeIndexInput)) {
            aeIndex = parseInt(aeIndexInput);
            // 为 日期 选择 初始化
            for (let i = 1; i <= aeIndex; i++) {
                const thisAeIndex = i;
                // 为 日期 初始化
                laydate.render({
                    elem: "#PC-db-AET" + thisAeIndex,
                    type: "datetime",
                    format: "yyyy-MM-dd HH:mm:ss",
                    max: 1
                });
                // 获取 系统位置
                const aeSystemLocation = $("#PC-db-AESL" + thisAeIndex).attr("data-value");
                if (notNullTool(aeSystemLocation)) {
                    const selectAECM = $("#PC-db-AEACM" + thisAeIndex),
                        aeAbnormalClinicalManifestation = $(selectAECM).attr("data-value");
                    if (notNullTool(aeAbnormalClinicalManifestation)) {
                        $("#PC-db-AEACM" + thisAeIndex + ">option[value!='']").remove();
                        if (aeSystemLocation === "全身") {
                            $.each(aeAcmJson.wholeBodyList, function (index, wholeBody) {
                                if (wholeBody === aeAbnormalClinicalManifestation) {
                                    $(selectAECM).append("<option value='" + wholeBody + "' selected>" + wholeBody + "</option>");
                                } else {
                                    $(selectAECM).append("<option value='" + wholeBody + "'>" + wholeBody + "</option>");
                                }
                            });
                        } else if (aeSystemLocation === "消化系统") {
                            $.each(aeAcmJson.digestiveSystemList, function (index, digestiveSystem) {
                                if (digestiveSystem === aeAbnormalClinicalManifestation) {
                                    $(selectAECM).append("<option value='" + digestiveSystem + "' selected>" + digestiveSystem + "</option>");
                                } else {
                                    $(selectAECM).append("<option value='" + digestiveSystem + "'>" + digestiveSystem + "</option>");
                                }
                            });
                        } else if (aeSystemLocation === "呼吸系统") {
                            $.each(aeAcmJson.respiratorySystemList, function (index, respiratorySystem) {
                                if (respiratorySystem === aeAbnormalClinicalManifestation) {
                                    $(selectAECM).append("<option value='" + respiratorySystem + "' selected>" + respiratorySystem + "</option>");
                                } else {
                                    $(selectAECM).append("<option value='" + respiratorySystem + "'>" + respiratorySystem + "</option>");
                                }
                            });
                        } else if (aeSystemLocation === "循环系统") {
                            $.each(aeAcmJson.circulatorySystemList, function (index, circulatorySystem) {
                                if (circulatorySystem === aeAbnormalClinicalManifestation) {
                                    $(selectAECM).append("<option value='" + circulatorySystem + "' selected>" + circulatorySystem + "</option>");
                                } else {
                                    $(selectAECM).append("<option value='" + circulatorySystem + "'>" + circulatorySystem + "</option>");
                                }
                            });
                        } else if (aeSystemLocation === "泌尿系统") {
                            $.each(aeAcmJson.urinarySystemList, function (index, urinarySystem) {
                                if (urinarySystem === aeAbnormalClinicalManifestation) {
                                    $(selectAECM).append("<option value='" + urinarySystem + "' selected>" + urinarySystem + "</option>");
                                } else {
                                    $(selectAECM).append("<option value='" + urinarySystem + "'>" + urinarySystem + "</option>");
                                }
                            });
                        } else if (aeSystemLocation === "血液系统") {
                            $.each(aeAcmJson.bloodSystemList, function (index, bloodSystem) {
                                if (bloodSystem === aeAbnormalClinicalManifestation) {
                                    $(selectAECM).append("<option value='" + bloodSystem + "' selected>" + bloodSystem + "</option>");
                                } else {
                                    $(selectAECM).append("<option value='" + bloodSystem + "'>" + bloodSystem + "</option>");
                                }
                            });
                        }
                        form.render("select");
                    }
                }
                // 选择 系统位置
                selectAESL(form, aeAcmJson);
            }
        }
        // 增加 系统评估 评估
        $("#PC-db-addEOSAE, #PC-db-addLOSAE").on("click", function () {
            const that = this;
            aeIndex++;
            sequentialExecution(function () {
                $(that).parents("tr").before(
                    "<tr>" +
                    "   <td>" +
                    "       <input id='PC-db-AET" + aeIndex + "' type='text' name='aeTime" + aeIndex + "' lay-verify='requiredDB' placeholder='请选择评估时间' lay-reqText='请选择异常评估时间！' readonly>" +
                    "   </td>" +
                    "   <td>" +
                    "       <select name='aeSystemLocation" + aeIndex + "' lay-filter='AESL' lay-reqText='请选择系统位置！' lay-verify='required'>" +
                    "           <option value=''>请选择系统位置</option>" +
                    "           <option value='全身'>全身</option>" +
                    "           <option value='消化系统'>消化系统</option>" +
                    "           <option value='呼吸系统'>呼吸系统</option>" +
                    "           <option value='循环系统'>循环系统</option>" +
                    "           <option value='泌尿系统'>泌尿系统</option>" +
                    "           <option value='血液系统'>血液系统</option>" +
                    "       </select>" +
                    "   </td>" +
                    "   <td>" +
                    "       <select id='PC-db-AEACM" + aeIndex + "' name='aeAbnormalClinicalManifestation" + aeIndex + "' lay-reqText='请选择异常临床表现！' lay-verify='required'>" +
                    "           <option value=''>请选择异常临床表现</option>" +
                    "       </select>" +
                    "   </td>" +
                    "   <td>" +
                    "       <button onclick='deleteAe(this);' class='pc-btn pc-btn-danger'><i class='iconfont icon-delete'></i></button>" +
                    "   </td>" +
                    "</tr>");
            }, function () {
                laydate.render({
                    elem: "#PC-db-AET" + aeIndex,
                    type: "datetime",
                    format: "yyyy-MM-dd HH:mm:ss",
                    max: 1
                });
                // 选择 系统位置
                selectAESL(form, aeAcmJson);
            }, function () {
                form.render("select");
                $(".pc-db-BDISEOS #PC-db-evaluationsNumber").val($(".pc-db-BDISEOST1 .pc-db-item-table .pc-db-table tbody>tr").length - 1);
                $(".pc-db-BDISLOS #PC-db-evaluationsNumber").val($(".pc-db-BDISLOST1 .pc-db-item-table.table2 .pc-db-table tbody>tr").length - 1);
            });
        });

        $("#PC-db-bloodCulture .layui-form-switch").off("click");
        let bcIndex = 0, bcInspectionTime = [], bcResultTime = [], bcInspectionTimeStamp = [0], bcResultTimeStamp = [0];
        // 初始化 血培养
        const bcIndexInput = $(".pc-db-BDISEOST2 .pc-db-table>tbody, .pc-db-BDISLOST2 .pc-db-table>tbody").attr("data-num");
        if (notNullTool(bcIndexInput)) {
            bcIndex = parseInt(bcIndexInput);
            // 为 日期 选择 初始化
            for (let i = 1; i <= bcIndex; i++) {
                const thisBcIndex = i;
                // 为 日期 初始化
                laydate.render({
                    elem: "#PC-db-BCIT" + thisBcIndex,
                    type: "datetime",
                    format: "yyyy-MM-dd HH:mm:ss",
                    max: 1,
                    done: function(value, date) {
                        if(value !== "") {
                            bcInspectionTime[thisBcIndex] = date.year + "-" + date.month + "-" + date.date +  ' ' + date.hours + ':' + date.minutes + ':' + date.seconds;
                            bcInspectionTimeStamp[thisBcIndex] = Date.parse(bcInspectionTime[thisBcIndex]);
                            if (notNullTool(bcResultTime[thisBcIndex])) {
                                if (bcInspectionTimeStamp[thisBcIndex] > bcResultTimeStamp[thisBcIndex]) {
                                    layer.msg("检查时间必须<span class='layui-badge'>早于</span>结果时间！", {
                                        icon: 5,
                                        time: 3000,
                                        anim: 6,
                                        btn: "好",
                                        resize: false,
                                        shade: 0.8
                                    }, function () {
                                        $("#PC-db-BCIT" + thisBcIndex).val("");
                                        bcInspectionTime[thisBcIndex] = null;
                                        bcInspectionTimeStamp[thisBcIndex] = 0;
                                    });
                                }
                            }
                        }else {
                            bcInspectionTime[thisBcIndex] = null;
                            bcInspectionTimeStamp[thisBcIndex] = 0;
                        }
                    }
                });
                laydate.render({
                    elem: "#PC-db-BCRT" + thisBcIndex,
                    type: "datetime",
                    format: "yyyy-MM-dd HH:mm:ss",
                    max: 1,
                    done: function(value, date) {
                        if(value !== "") {
                            bcResultTime[thisBcIndex] = date.year + "-" + date.month + "-" + date.date +  ' ' + date.hours + ':' + date.minutes + ':' + date.seconds;
                            bcResultTimeStamp[thisBcIndex] = Date.parse(bcResultTime[thisBcIndex]);
                            if (notNullTool(bcInspectionTime[thisBcIndex])) {
                                if (bcInspectionTimeStamp[thisBcIndex] > bcResultTimeStamp[thisBcIndex]) {
                                    layer.msg("结果时间必须<span class='layui-badge'>晚于</span>检查时间！", {
                                        icon: 5,
                                        time: 3000,
                                        anim: 6,
                                        btn: "好",
                                        resize: false,
                                        shade: 0.8
                                    }, function () {
                                        $("#PC-db-BCRT" + thisBcIndex).val("");
                                        bcResultTime[thisBcIndex] = null;
                                        bcResultTimeStamp[thisBcIndex] = 0;
                                    });
                                }
                            }
                        }else {
                            bcResultTime[thisBcIndex] = null;
                            bcResultTimeStamp[thisBcIndex] = 0;
                        }
                    }
                });
                // 初始化 阳性菌
                const bcPbElem = $("#PC-db-BCPB" + thisBcIndex);
                const bcPositiveBacteria = $(bcPbElem).attr("data-value");
                let bcPbOpElem = "<option value=''>输入关键字可搜索阳性菌</option>";
                if (notNullTool(bcPositiveBacteria)) {
                    $.each(positiveBacteriaList, function (index, positiveBacteria) {
                        if (bcPositiveBacteria === positiveBacteria) {
                            bcPbOpElem += "<option value='" + positiveBacteria + "' selected>" + positiveBacteria + "</option>";
                        } else {
                            bcPbOpElem += "<option value='" + positiveBacteria + "'>" + positiveBacteria + "</option>";
                        }
                    });
                    $(bcPbElem).attr("lay-verify", "required");
                    $(bcPbElem).attr("lay-reqText", "请选择阳性菌！");
                }
                $(bcPbElem).append(bcPbOpElem);
                form.render("select");
                // 删除 血培养 行
                $("#PC-db-bcDelete" + thisBcIndex).on("click", function () {
                    const that = this;
                    layer.msg("确定要 <span class='pc-db-status-color-no'>删除</span> 此条血培养信息吗?",{
                        icon: 7,
                        time: 0,
                        anim: 6,
                        btn: ["确定", "取消"],
                        resize: false,
                        shade: 0.8,
                        yes: function (index) {
                            $(that).parents("tr").remove();
                            const trLength = computeTrLength(2);
                            $("#PC-db-BCN").val(trLength);
                            if (trLength === 0) {
                                form.val("EOS", {
                                    bloodCulture: false
                                });
                                form.val("LOS", {
                                    bloodCulture: false
                                });
                            }
                            computePn("PBCN", "positive", 2);
                            computePn("NBCN", "negative", 2);
                            $("#PC-db-bloodCulture .layui-form-switch").off("click");
                            layer.close(index);
                        }
                    });
                });
            }
        }
        // 选择 检查结果
        form.on("select(BCIR)", function (data) {
            const value = data.value;
            $(data.elem).parents("tr").removeClass();
            if (notNullTool(value)) {
                if (value === "阳性") {
                    $(data.elem).parents("tr").addClass("positive");
                    $(data.elem).parent("td").next("td").children("select").children("option").remove();
                    let bcPbOpElem = "<option value=''>输入关键字可搜索阳性菌</option>";
                    $.each(positiveBacteriaList, function (index, positiveBacteria) {
                        bcPbOpElem += "<option value='" + positiveBacteria + "'>" + positiveBacteria + "</option>";
                    });
                    $(data.elem).parent("td").next("td").children("select").attr("lay-verify", "required");
                    $(data.elem).parent("td").next("td").children("select").attr("lay-reqText", "请选择阳性菌！");
                    $(data.elem).parent("td").next("td").children("select").append(bcPbOpElem);
                    form.render("select");
                } else if (value === "阴性") {
                    $(data.elem).parents("tr").addClass("negative");
                    $(data.elem).parents("tr").addClass("negative");
                    $(data.elem).parent("td").next("td").children("select").children("option").remove();
                    $(data.elem).parent("td").next("td").children("select").removeAttr("lay-verify");
                    $(data.elem).parent("td").next("td").children("select").removeAttr("lay-reqText");
                    $(data.elem).parent("td").next("td").children("select").append("<option value=''>输入关键字可搜索阳性菌</option>");
                    form.render("select");
                }
                computePn("PBCN", "positive", 2);
                computePn("NBCN", "negative", 2);
            }
        });
        // 增加 血培养
        $("#PC-db-addEOSBC, #PC-db-addLOSBC").on("click", function () {
            const that = this;
            bcIndex ++;
            sequentialExecution(function () {
                $(that).parents("tr").before(
                    "<tr>" +
                    "   <td>" +
                    "       <input id='PC-db-BCIT" + bcIndex + "' type='text' name='bcInspectionTime" + bcIndex + "' lay-verify='required' placeholder='请选择检查时间' lay-reqText='请选择检查时间！' readonly>" +
                    "   </td>" +
                    "   <td>" +
                    "       <input id='PC-db-BCRT" + bcIndex + "' type='text' name='bcResultTime" + bcIndex + "' lay-verify='required' placeholder='请选择结果时间' lay-reqText='请选择结果时间！' readonly>" +
                    "   </td>" +
                    "   <td>" +
                    "       <select name='bcInspectionResult" + bcIndex + "' lay-filter='BCIR' lay-reqText='请选择检查结果！' lay-verify='required'>" +
                    "           <option value=''>请选择检查结果</option>" +
                    "           <option value='阴性'>阴性</option>" +
                    "           <option value='阳性'>阳性</option>" +
                    "       </select>" +
                    "   </td>" +
                    "   <td>" +
                    "       <select name='bcPositiveBacteria" + bcIndex + "' lay-search>" +
                    "           <option value=''>输入关键字可搜索阳性菌</option>" +
                    "       </select>" +
                    "   </td>" +
                    "   <td>" +
                    "       <button id='PC-db-bcDelete" + bcIndex + "' class='pc-btn pc-btn-danger'><i class='iconfont icon-delete'></i></button>" +
                    "   </td>" +
                    "</tr>");
            }, function () {
                form.render("select");
                const thisBcIndex = bcIndex;
                laydate.render({
                    elem: "#PC-db-BCIT" + thisBcIndex,
                    type: "datetime",
                    format: "yyyy-MM-dd HH:mm:ss",
                    max: 1,
                    done: function(value, date) {
                        if(value !== "") {
                            bcInspectionTime[thisBcIndex] = date.year + "-" + date.month + "-" + date.date +  ' ' + date.hours + ':' + date.minutes + ':' + date.seconds;
                            bcInspectionTimeStamp[thisBcIndex] = Date.parse(bcInspectionTime[thisBcIndex]);
                            if (notNullTool(bcResultTime[thisBcIndex])) {
                                if (bcInspectionTimeStamp[thisBcIndex] > bcResultTimeStamp[thisBcIndex]) {
                                    layer.msg("检查时间必须<span class='layui-badge'>早于</span>结果时间！", {
                                        icon: 5,
                                        time: 3000,
                                        anim: 6,
                                        btn: "好",
                                        resize: false,
                                        shade: 0.8
                                    }, function () {
                                        $("#PC-db-BCIT" + thisBcIndex).val("");
                                        bcInspectionTime[thisBcIndex] = null;
                                        bcInspectionTimeStamp[thisBcIndex] = 0;
                                    });
                                }
                            }
                        }else {
                            bcInspectionTime[thisBcIndex] = null;
                            bcInspectionTimeStamp[thisBcIndex] = 0;
                        }
                    }
                });
                laydate.render({
                    elem: "#PC-db-BCRT" + thisBcIndex,
                    type: "datetime",
                    format: "yyyy-MM-dd HH:mm:ss",
                    max: 1,
                    done: function(value, date) {
                        if(value !== "") {
                            bcResultTime[thisBcIndex] = date.year + "-" + date.month + "-" + date.date +  ' ' + date.hours + ':' + date.minutes + ':' + date.seconds;
                            bcResultTimeStamp[thisBcIndex] = Date.parse(bcResultTime[thisBcIndex]);
                            if (notNullTool(bcInspectionTime[thisBcIndex])) {
                                if (bcInspectionTimeStamp[thisBcIndex] > bcResultTimeStamp[thisBcIndex]) {
                                    layer.msg("结果时间必须<span class='layui-badge'>晚于</span>检查时间！", {
                                        icon: 5,
                                        time: 3000,
                                        anim: 6,
                                        btn: "好",
                                        resize: false,
                                        shade: 0.8
                                    }, function () {
                                        $("#PC-db-BCRT" + thisBcIndex).val("");
                                        bcResultTime[thisBcIndex] = null;
                                        bcResultTimeStamp[thisBcIndex] = 0;
                                    });
                                }
                            }
                        }else {
                            bcResultTime[thisBcIndex] = null;
                            bcResultTimeStamp[thisBcIndex] = 0;
                        }
                    }
                });
                // 选择 检查结果
                form.on("select(BCIR)", function (data) {
                    const value = data.value;
                    $(data.elem).parents("tr").removeClass();
                    if (notNullTool(value)) {
                        if (value === "阳性") {
                            $(data.elem).parents("tr").addClass("positive");
                            $(data.elem).parent("td").next("td").children("select").children("option").remove();
                            let bcPbOpElem = "<option value=''>输入关键字可搜索阳性菌</option>";
                            $.each(positiveBacteriaList, function (index, positiveBacteria) {
                                bcPbOpElem += "<option value='" + positiveBacteria + "'>" + positiveBacteria + "</option>";
                            });
                            $(data.elem).parent("td").next("td").children("select").attr("lay-verify", "required");
                            $(data.elem).parent("td").next("td").children("select").attr("lay-reqText", "请选择阳性菌！");
                            $(data.elem).parent("td").next("td").children("select").append(bcPbOpElem);
                            form.render("select");
                        } else if (value === "阴性") {
                            $(data.elem).parents("tr").addClass("negative");
                            $(data.elem).parents("tr").addClass("negative");
                            $(data.elem).parent("td").next("td").children("select").children("option").remove();
                            $(data.elem).parent("td").next("td").children("select").removeAttr("lay-verify");
                            $(data.elem).parent("td").next("td").children("select").removeAttr("lay-reqText");
                            $(data.elem).parent("td").next("td").children("select").append("<option value=''>输入关键字可搜索阳性菌</option>");
                            form.render("select");
                        }
                        computePn("PBCN", "positive", 2);
                        computePn("NBCN", "negative", 2);
                    }
                });
                const trLength = computeTrLength(2);
                $("#PC-db-BCN").val(trLength);
                if (trLength > 0) {
                    form.val("EOS", {
                        bloodCulture: true
                    });
                    form.val("LOS", {
                        bloodCulture: true
                    });
                } else {
                    form.val("EOS", {
                        bloodCulture: false
                    });
                    form.val("LOS", {
                        bloodCulture: false
                    });
                }
                $("#PC-db-bloodCulture .layui-form-switch").off("click");
                // 删除 血培养 行
                $("#PC-db-bcDelete" + thisBcIndex).on("click", function () {
                    const that = this;
                    layer.msg("确定要 <span class='pc-db-status-color-no'>删除</span> 此条血培养信息吗?",{
                        icon: 7,
                        time: 0,
                        anim: 6,
                        btn: ["确定", "取消"],
                        resize: false,
                        shade: 0.8,
                        yes: function (index) {
                            $(that).parents("tr").remove();
                            const trLength = computeTrLength(2);
                            $("#PC-db-BCN").val(trLength);
                            if (trLength === 0) {
                                form.val("EOS", {
                                    bloodCulture: false
                                });
                                form.val("LOS", {
                                    bloodCulture: false
                                });
                            }
                            computePn("PBCN", "positive", 2);
                            computePn("NBCN", "negative", 2);
                            $("#PC-db-bloodCulture .layui-form-switch").off("click");
                            layer.close(index);
                        }
                    });
                });
            });
        });

        $("#PC-db-NSI .layui-form-switch").off("click");
        let nsiIndex = 0;
        // 初始化 非特异性检查
        const nsiIndexInput = $(".pc-db-BDISEOST3 .pc-db-table>tbody, .pc-db-BDISLOST3 .pc-db-table>tbody").attr("data-num");
        if (notNullTool(nsiIndexInput)) {
            nsiIndex = parseInt(nsiIndexInput);
            // 为 日期 选择 初始化
            for (let i = 1; i <= nsiIndex; i++) {
                const thisNsiIndex = i;
                laydate.render({
                    elem: "#PC-db-NSIT" + thisNsiIndex,
                    type: "datetime",
                    format: "yyyy-MM-dd HH:mm:ss",
                    max: 1
                });
                // 删除 非特异性检查 行
                $("#PC-db-nsiDelete" + thisNsiIndex).on("click", function () {
                    const that = this;
                    layer.msg("确定要 <span class='pc-db-status-color-no'>删除</span> 此条非特异性检查信息吗?",{
                        icon: 7,
                        time: 0,
                        anim: 6,
                        btn: ["确定", "取消"],
                        resize: false,
                        shade: 0.8,
                        yes: function (index) {
                            $(that).parents("tr").remove();
                            const trLength = computeTrLength(3);
                            $("#PC-db-RBN").val(trLength);
                            $("#PC-db-CRPIN").val(trLength);
                            $("#PC-db-PCTIN").val(trLength);
                            if (trLength === 0) {
                                form.val("EOS", {
                                    nonSpecificInspection: false
                                });
                                form.val("LOS", {
                                    nonSpecificInspection: false
                                });
                            }
                            $("#PC-db-NSI .layui-form-switch").off("click");
                            layer.close(index);
                        }
                    });
                });
            }
        }
        // 增加 非特异性检查
        $("#PC-db-addEOSNSI, #PC-db-addLOSNSI").on("click", function () {
            const that = this;
            nsiIndex ++;
            sequentialExecution(function () {
                $(that).parents("tr").before(
                    "<tr>" +
                    "   <td>" +
                    "       <input id='PC-db-NSIT" + nsiIndex + "' type='text' name='nsiTime" + nsiIndex + "' lay-verify='required' placeholder='请选择检查时间' lay-reqText='请选择检查时间！' readonly>" +
                    "   </td>" +
                    "   <td>" +
                    "       <input type='number' name='nsiWbc" + nsiIndex + "' placeholder='请填写WBC'>" +
                    "   </td>" +
                    "   <td>" +
                    "       <input type='number' name='nsiIOrT" + nsiIndex + "' placeholder='请填写I/T'>" +
                    "   </td>" +
                    "   <td>" +
                    "       <input type='number' name='nsiPlt" + nsiIndex + "' placeholder='请填写PLT'>" +
                    "   </td>" +
                    "   <td>" +
                    "       <input type='number' name='nsiCrp" + nsiIndex + "' placeholder='请填写CRP'>" +
                    "   </td>" +
                    "   <td>" +
                    "       <input type='number' name='nsiPct" + nsiIndex + "' placeholder='请填写PCT'>" +
                    "   </td>" +
                    "   <td>" +
                    "       <input type='number' name='nsiPositiveItemNumber" + nsiIndex + "' placeholder='请填写阳性项数'>" +
                    "   </td>" +
                    "   <td>" +
                    "       <button id='PC-db-nsiDelete" + nsiIndex + "' class='pc-btn pc-btn-danger'><i class='iconfont icon-delete'></i></button>" +
                    "   </td>" +
                    "</tr>");
            }, function () {
                form.render("select");
                const thisNsiIndex = nsiIndex;
                laydate.render({
                    elem: "#PC-db-NSIT" + thisNsiIndex,
                    type: "datetime",
                    format: "yyyy-MM-dd HH:mm:ss",
                    max: 1
                });
                const trLength = computeTrLength(3);
                $("#PC-db-RBN").val(trLength);
                $("#PC-db-CRPIN").val(trLength);
                $("#PC-db-PCTIN").val(trLength);
                if (trLength > 0) {
                    form.val("EOS", {
                        nonSpecificInspection: true
                    });
                    form.val("LOS", {
                        nonSpecificInspection: true
                    });
                } else {
                    form.val("EOS", {
                        nonSpecificInspection: false
                    });
                    form.val("LOS", {
                        nonSpecificInspection: false
                    });
                }
                $("#PC-db-NSI .layui-form-switch").off("click");
                // 删除 非特异性检查 行
                $("#PC-db-nsiDelete" + thisNsiIndex).on("click", function () {
                    const that = this;
                    layer.msg("确定要 <span class='pc-db-status-color-no'>删除</span> 此条非特异性检查信息吗?",{
                        icon: 7,
                        time: 0,
                        anim: 6,
                        btn: ["确定", "取消"],
                        resize: false,
                        shade: 0.8,
                        yes: function (index) {
                            $(that).parents("tr").remove();
                            const trLength = computeTrLength(3);
                            $("#PC-db-RBN").val(trLength);
                            $("#PC-db-CRPIN").val(trLength);
                            $("#PC-db-PCTIN").val(trLength);
                            if (trLength === 0) {
                                form.val("EOS", {
                                    nonSpecificInspection: false
                                });
                                form.val("LOS", {
                                    nonSpecificInspection: false
                                });
                            }
                            $("#PC-db-NSI .layui-form-switch").off("click");
                            layer.close(index);
                        }
                    });
                });
            });
        });

        // 确诊临床晚发型败血症 诊断时间
        laydate.render({
            elem: "#PC-db-CLOSDT",
            type: "datetime",
            format: "yyyy-MM-dd HH:mm:ss",
            max: 1
        });
        // 确诊临床晚发型败血症 后面的 诊断次数、时间
        form.on("switch(CLOS)", function (data) {
            const dceosElem = $("#PC-db-CLOSDN, #PC-db-CLOSDT");
            if (data.elem.checked) {
                $(dceosElem).removeAttr("disabled").attr("lay-verify", "requiredDB").attr("name", function () {
                    return $(this).attr("data-name");
                });
            } else {
                $(dceosElem).removeAttr("lay-verify name").attr("disabled", true).val("");
            }
        });

        let cfcIndex = 0, cfcInspectionTime = [], cfcResultTime = [], cfcInspectionTimeStamp = [0], cfcResultTimeStamp = [0];
        // 初始化 脑脊液培养
        const cfcIndexInput = $(".pc-db-BDISEOST4 .pc-db-table>tbody, .pc-db-BDISLOST4 .pc-db-table>tbody").attr("data-num");
        if (notNullTool(cfcIndexInput)) {
            cfcIndex = parseInt(cfcIndexInput);
            // 为 日期 选择 初始化
            for (let i = 1; i <= cfcIndex; i++) {
                const thisCfcIndex = i;
                // 为 日期 初始化
                laydate.render({
                    elem: "#PC-db-CFCIT" + thisCfcIndex,
                    type: "datetime",
                    format: "yyyy-MM-dd HH:mm:ss",
                    max: 1,
                    done: function (value, date) {
                        if (value !== "") {
                            cfcInspectionTime[thisCfcIndex] = date.year + "-" + date.month + "-" + date.date + ' ' + date.hours + ':' + date.minutes + ':' + date.seconds;
                            cfcInspectionTimeStamp[thisCfcIndex] = Date.parse(cfcInspectionTime[thisCfcIndex]);
                            if (notNullTool(cfcResultTime[thisCfcIndex])) {
                                if (cfcInspectionTimeStamp[thisCfcIndex] > cfcResultTimeStamp[thisCfcIndex]) {
                                    layer.msg("检查时间必须<span class='layui-badge'>早于</span>结果时间！", {
                                        icon: 5,
                                        time: 3000,
                                        anim: 6,
                                        btn: "好",
                                        resize: false,
                                        shade: 0.8
                                    }, function () {
                                        $("#PC-db-CFCIT" + thisCfcIndex).val("");
                                        cfcInspectionTime[thisCfcIndex] = null;
                                        cfcInspectionTimeStamp[thisCfcIndex] = 0;
                                    });
                                }
                            }
                        } else {
                            cfcInspectionTime[thisCfcIndex] = null;
                            cfcInspectionTimeStamp[thisCfcIndex] = 0;
                        }
                    }
                });
                laydate.render({
                    elem: "#PC-db-CFCRT" + thisCfcIndex,
                    type: "datetime",
                    format: "yyyy-MM-dd HH:mm:ss",
                    max: 1,
                    done: function (value, date) {
                        if (value !== "") {
                            cfcResultTime[thisCfcIndex] = date.year + "-" + date.month + "-" + date.date + ' ' + date.hours + ':' + date.minutes + ':' + date.seconds;
                            cfcResultTimeStamp[thisCfcIndex] = Date.parse(cfcResultTime[thisCfcIndex]);
                            if (notNullTool(cfcInspectionTime[thisCfcIndex])) {
                                if (cfcInspectionTimeStamp[thisCfcIndex] > cfcResultTimeStamp[thisCfcIndex]) {
                                    layer.msg("结果时间必须<span class='layui-badge'>晚于</span>检查时间！", {
                                        icon: 5,
                                        time: 3000,
                                        anim: 6,
                                        btn: "好",
                                        resize: false,
                                        shade: 0.8
                                    }, function () {
                                        $("#PC-db-CFCRT" + thisCfcIndex).val("");
                                        cfcResultTime[thisCfcIndex] = null;
                                        cfcResultTimeStamp[thisCfcIndex] = 0;
                                    });
                                }
                            }
                        } else {
                            cfcResultTime[thisCfcIndex] = null;
                            cfcResultTimeStamp[thisCfcIndex] = 0;
                        }
                    }
                });
                // 初始化 阳性菌
                const cfcPbElem = $("#PC-db-CFCPB" + thisCfcIndex);
                const cfcPositiveBacteria = $(cfcPbElem).attr("data-value");
                let cfcPbOpElem = "<option value=''>输入关键字可搜索阳性菌</option>";
                if (notNullTool(cfcPositiveBacteria)) {
                    $.each(positiveBacteriaList, function (index, positiveBacteria) {
                        if (cfcPositiveBacteria === positiveBacteria) {
                            cfcPbOpElem += "<option value='" + positiveBacteria + "' selected>" + positiveBacteria + "</option>";
                        } else {
                            cfcPbOpElem += "<option value='" + positiveBacteria + "'>" + positiveBacteria + "</option>";
                        }
                    });
                    $(cfcPbElem).attr("lay-verify", "required");
                    $(cfcPbElem).attr("lay-reqText", "请选择阳性菌！");
                }
                $(cfcPbElem).append(cfcPbOpElem);
                form.render("select");
            }
        }
        // 选择 检查结果
        form.on("select(CFCIR)", function (data) {
            const value = data.value;
            $(data.elem).parents("tr").removeClass();
            if (notNullTool(value)) {
                if (value === "阳性") {
                    $(data.elem).parents("tr").addClass("positive");
                    $(data.elem).parent("td").next("td").children("select").children("option").remove();
                    let bcPbOpElem = "<option value=''>输入关键字可搜索阳性菌</option>";
                    $.each(positiveBacteriaList, function (index, positiveBacteria) {
                        bcPbOpElem += "<option value='" + positiveBacteria + "'>" + positiveBacteria + "</option>";
                    });
                    $(data.elem).parent("td").next("td").children("select").attr("lay-verify", "required");
                    $(data.elem).parent("td").next("td").children("select").attr("lay-reqText", "请选择阳性菌！");
                    $(data.elem).parent("td").next("td").children("select").append(bcPbOpElem);
                    form.render("select");
                } else if (value === "阴性") {
                    $(data.elem).parents("tr").addClass("negative");
                    $(data.elem).parents("tr").addClass("negative");
                    $(data.elem).parent("td").next("td").children("select").children("option").remove();
                    $(data.elem).parent("td").next("td").children("select").removeAttr("lay-verify");
                    $(data.elem).parent("td").next("td").children("select").removeAttr("lay-reqText");
                    $(data.elem).parent("td").next("td").children("select").append("<option value=''>输入关键字可搜索阳性菌</option>");
                    form.render("select");
                }
                computePn("PBCN", "positive", 2);
                computePn("NBCN", "negative", 2);
            }
        });
        // 增加 脑脊液培养
        $("#PC-db-addEOSCFC, #PC-db-addLOSCFC").on("click", function () {
            const that = this;
            cfcIndex ++;
            sequentialExecution(function () {
                $(that).parents("tr").before(
                    "<tr>" +
                    "   <td>" +
                    "       <input id='PC-db-CFCIT" + cfcIndex + "' type='text' name='cfcInspectionTime" + cfcIndex + "' lay-verify='requiredDB' placeholder='请选择检查时间' lay-reqText='请选择检查时间！' readonly>" +
                    "   </td>" +
                    "   <td>" +
                    "       <input id='PC-db-CFCRT" + cfcIndex + "' type='text' name='cfcResultTime" + cfcIndex + "' lay-verify='requiredDB' placeholder='请选择结果时间' lay-reqText='请选择结果时间！' readonly>" +
                    "   </td>" +
                    "   <td>" +
                    "       <select name='cfcInspectionResult" + cfcIndex + "' lay-filter='CFCIR' lay-reqText='请选择检查结果！' lay-verify='required'>" +
                    "           <option value=''>请选择检查结果</option>" +
                    "           <option value='阴性'>阴性</option>" +
                    "           <option value='阳性'>阳性</option>" +
                    "       </select>" +
                    "   </td>" +
                    "   <td>" +
                    "       <select name='cfcPositiveBacteria" + cfcIndex + "' lay-search>" +
                    "           <option value=''>输入关键字可搜索阳性菌</option>" +
                    "       </select>" +
                    "   </td>" +
                    "   <td>" +
                    "       <button onclick='deleteCfc(this)' class='pc-btn pc-btn-danger'><i class='iconfont icon-delete'></i></button>" +
                    "   </td>" +
                    "</tr>");
            }, function () {
                form.render("select");
                const thisCfcIndex = cfcIndex;
                laydate.render({
                    elem: "#PC-db-CFCIT" + thisCfcIndex,
                    type: "datetime",
                    format: "yyyy-MM-dd HH:mm:ss",
                    max: 1,
                    done: function(value, date) {
                        if(value !== "") {
                            cfcInspectionTime[thisCfcIndex] = date.year + "-" + date.month + "-" + date.date +  ' ' + date.hours + ':' + date.minutes + ':' + date.seconds;
                            cfcInspectionTimeStamp[thisCfcIndex] = Date.parse(cfcInspectionTime[thisCfcIndex]);
                            if (notNullTool(cfcResultTime[thisCfcIndex])) {
                                if (cfcInspectionTimeStamp[thisCfcIndex] > cfcResultTimeStamp[thisCfcIndex]) {
                                    layer.msg("检查时间必须<span class='layui-badge'>早于</span>结果时间！", {
                                        icon: 5,
                                        time: 3000,
                                        anim: 6,
                                        btn: "好",
                                        resize: false,
                                        shade: 0.8
                                    }, function () {
                                        $("#PC-db-CFCIT" + thisCfcIndex).val("");
                                        cfcInspectionTime[thisCfcIndex] = null;
                                        cfcInspectionTimeStamp[thisCfcIndex] = 0;
                                    });
                                }
                            }
                        }else {
                            cfcInspectionTime[thisCfcIndex] = null;
                            cfcInspectionTimeStamp[thisCfcIndex] = 0;
                        }
                    }
                });
                laydate.render({
                    elem: "#PC-db-CFCRT" + thisCfcIndex,
                    type: "datetime",
                    format: "yyyy-MM-dd HH:mm:ss",
                    max: 1,
                    done: function(value, date) {
                        if(value !== "") {
                            cfcResultTime[thisCfcIndex] = date.year + "-" + date.month + "-" + date.date +  ' ' + date.hours + ':' + date.minutes + ':' + date.seconds;
                            cfcResultTimeStamp[thisCfcIndex] = Date.parse(cfcResultTime[thisCfcIndex]);
                            if (notNullTool(cfcInspectionTime[thisCfcIndex])) {
                                if (cfcInspectionTimeStamp[thisCfcIndex] > cfcResultTimeStamp[thisCfcIndex]) {
                                    layer.msg("结果时间必须<span class='layui-badge'>晚于</span>检查时间！", {
                                        icon: 5,
                                        time: 3000,
                                        anim: 6,
                                        btn: "好",
                                        resize: false,
                                        shade: 0.8
                                    }, function () {
                                        $("#PC-db-CFCRT" + thisCfcIndex).val("");
                                        cfcResultTime[thisCfcIndex] = null;
                                        cfcResultTimeStamp[thisCfcIndex] = 0;
                                    });
                                }
                            }
                        }else {
                            cfcResultTime[thisCfcIndex] = null;
                            cfcResultTimeStamp[thisCfcIndex] = 0;
                        }
                    }
                });
                // 选择 检查结果
                form.on("select(CFCIR)", function (data) {
                    const value = data.value;
                    $(data.elem).parents("tr").removeClass();
                    if (notNullTool(value)) {
                        if (value === "阳性") {
                            $(data.elem).parents("tr").addClass("positive");
                            $(data.elem).parent("td").next("td").children("select").children("option").remove();
                            let bcPbOpElem = "<option value=''>输入关键字可搜索阳性菌</option>";
                            $.each(positiveBacteriaList, function (index, positiveBacteria) {
                                bcPbOpElem += "<option value='" + positiveBacteria + "'>" + positiveBacteria + "</option>";
                            });
                            $(data.elem).parent("td").next("td").children("select").attr("lay-verify", "required");
                            $(data.elem).parent("td").next("td").children("select").attr("lay-reqText", "请选择阳性菌！");
                            $(data.elem).parent("td").next("td").children("select").append(bcPbOpElem);
                            form.render("select");
                        } else if (value === "阴性") {
                            $(data.elem).parents("tr").addClass("negative");
                            $(data.elem).parents("tr").addClass("negative");
                            $(data.elem).parent("td").next("td").children("select").children("option").remove();
                            $(data.elem).parent("td").next("td").children("select").removeAttr("lay-verify");
                            $(data.elem).parent("td").next("td").children("select").removeAttr("lay-reqText");
                            $(data.elem).parent("td").next("td").children("select").append("<option value=''>输入关键字可搜索阳性菌</option>");
                            form.render("select");
                        }
                        computePn("PCFCN", "positive", 4);
                        computePn("NCFCN", "negative", 4);
                    }
                });
                $("#PC-db-CFCN").val(computeTrLength(4));
            });
        });

        // 化脓性脑膜炎 确诊日期
        laydate.render({
            elem: "#PC-db-PMDD",
            type: "datetime",
            format: "yyyy-MM-dd HH:mm:ss",
            max: 1,
        });
        // 病毒性脑膜炎 确诊日期
        laydate.render({
            elem: "#PC-db-VMDD",
            type: "datetime",
            format: "yyyy-MM-dd HH:mm:ss",
            max: 1,
        });

        // 化脓性 脑膜炎
        form.on("switch(PM)", function (data) {
            const pmddElem = $("#PC-db-PMDD");
            if (data.elem.checked) {
                $(pmddElem).removeAttr("disabled").attr("lay-verify", "requiredDB").attr("name", function () {
                    return $(this).attr("data-name");
                });
            } else {
                $(pmddElem).removeAttr("name lay-verify").attr("disabled", true).val("");
            }
        });
        // 病毒性 脑膜炎
        form.on("switch(VM)", function (data) {
            const vmddElem = $("#PC-db-VMDD");
            if (data.elem.checked) {
                $(vmddElem).removeAttr("disabled").attr("lay-verify", "requiredDB").attr("name", function () {
                    return $(this).attr("data-name");
                });
            } else {
                $(vmddElem).removeAttr("name lay-verify").attr("disabled", true).val("");
            }
        });

        // 基础数据库 感染监测 EOS流程 添加/编辑 信息 提交
        form.on("submit(ISEOS)", function (data) {
            const doing = "保存信息";
            loading(doing);
            let field = data.field, aeArray = [], bcArray = [], nsiArray = [], cfcArray = [];
            for (let i = 1; i <= aeIndex; i++) {
                if (field["aeTime" + i] !== undefined) {
                    aeArray.push({
                        aeTime: field["aeTime" + i],
                        aeSystemLocation: field["aeSystemLocation" + i],
                        aeAbnormalClinicalManifestation: field["aeAbnormalClinicalManifestation" + i]
                    });
                    delete field["aeTime" + i];
                    delete field["aeSystemLocation" + i];
                    delete field["aeAbnormalClinicalManifestation" + i];
                }
            }
            field.aeArray = JSON.stringify(aeArray);
            for (let i = 1; i <= bcIndex; i++) {
                if (field["bcInspectionTime" + i] !== undefined) {
                    bcArray.push({
                        bcInspectionTime: field["bcInspectionTime" + i],
                        bcResultTime: field["bcResultTime" + i],
                        bcInspectionResult: field["bcInspectionResult" + i],
                        bcPositiveBacteria: field["bcPositiveBacteria" + i]
                    });
                    delete field["bcInspectionTime" + i];
                    delete field["bcResultTime" + i];
                    delete field["bcInspectionResult" + i];
                    delete field["bcPositiveBacteria" + i];
                }
            }
            field.bcArray = JSON.stringify(bcArray);
            for (let i = 1; i <= nsiIndex; i++) {
                let nsiJson = {};
                if (notNullTool(field["nsiTime" + i])) {
                    nsiJson.nsiTime = field["nsiTime" + i];
                    if (notNullTool(field["nsiWbc" + i])) {
                        nsiJson.nsiWbc = field["nsiWbc" + i];
                    }
                    if (notNullTool(field["nsiIOrT" + i])) {
                        nsiJson.nsiIOrT = field["nsiIOrT" + i];
                    }
                    if (notNullTool(field["nsiPlt" + i])) {
                        nsiJson.nsiPlt = field["nsiPlt" + i];
                    }
                    if (notNullTool(field["nsiCrp" + i])) {
                        nsiJson.nsiCrp = field["nsiCrp" + i];
                    }
                    if (notNullTool(field["nsiPct" + i])) {
                        nsiJson.nsiPct = field["nsiPct" + i];
                    }
                    if (notNullTool(field["nsiPositiveItemNumber" + i])) {
                        nsiJson.nsiPositiveItemNumber = field["nsiPositiveItemNumber" + i];
                    }
                    delete field["nsiTime" + i];
                    delete field["nsiWbc" + i];
                    delete field["nsiIOrT" + i];
                    delete field["nsiPlt" + i];
                    delete field["nsiCrp" + i];
                    delete field["nsiPct" + i];
                    delete field["nsiPositiveItemNumber" + i];
                    nsiArray.push(nsiJson);
                }
            }
            field.nsiArray = JSON.stringify(nsiArray);
            for (let i = 1; i <= cfcIndex; i++) {
                if (field["cfcInspectionTime" + i] !== undefined) {
                    cfcArray.push({
                        cfcInspectionTime: field["cfcInspectionTime" + i],
                        cfcResultTime: field["cfcResultTime" + i],
                        cfcInspectionResult: field["cfcInspectionResult" + i],
                        cfcPositiveBacteria: field["cfcPositiveBacteria" + i]
                    });
                    delete field["cfcInspectionTime" + i];
                    delete field["cfcResultTime" + i];
                    delete field["cfcInspectionResult" + i];
                    delete field["cfcPositiveBacteria" + i];
                }
            }
            field.cfcArray = JSON.stringify(cfcArray);
            $.post("/perinatalPlatform/basicDatabase/write/IS/EOS/post", field, function (back, status) {
                if(status === "success") {
                    if(back.code) {
                        successNext();
                    }else {failMsg(doing)}
                }else {errorMsg1()}
            }, "json").fail(function () {errorMsg2()});
        });

        // 基础数据库 感染监测 LOS流程 添加/编辑 信息 提交
        form.on("submit(ISLOS)", function (data) {
            const doing = "保存信息";
            loading(doing);
            let field = data.field, rfArray = [], aeArray = [], bcArray = [], nsiArray = [], cfcArray = [];
            for (let i = 1; i <= rfIndex; i++) {
                if (field["rfEvaluationTime" + i] !== undefined) {
                    rfArray.push({
                        rfEvaluationTime: field["rfEvaluationTime" + i],
                        riskFactor: field["riskFactor" + i]
                    });
                    delete field["rfEvaluationTime" + i];
                    delete field["riskFactor" + i];
                }
            }
            field.rfArray = JSON.stringify(rfArray);
            for (let i = 1; i <= aeIndex; i++) {
                if (field["aeTime" + i] !== undefined) {
                    aeArray.push({
                        aeTime: field["aeTime" + i],
                        aeSystemLocation: field["aeSystemLocation" + i],
                        aeAbnormalClinicalManifestation: field["aeAbnormalClinicalManifestation" + i]
                    });
                    delete field["aeTime" + i];
                    delete field["aeSystemLocation" + i];
                    delete field["aeAbnormalClinicalManifestation" + i];
                }
            }
            field.aeArray = JSON.stringify(aeArray);
            for (let i = 1; i <= bcIndex; i++) {
                if (field["bcInspectionTime" + i] !== undefined) {
                    bcArray.push({
                        bcInspectionTime: field["bcInspectionTime" + i],
                        bcResultTime: field["bcResultTime" + i],
                        bcInspectionResult: field["bcInspectionResult" + i],
                        bcPositiveBacteria: field["bcPositiveBacteria" + i]
                    });
                    delete field["bcInspectionTime" + i];
                    delete field["bcResultTime" + i];
                    delete field["bcInspectionResult" + i];
                    delete field["bcPositiveBacteria" + i];
                }
            }
            field.bcArray = JSON.stringify(bcArray);
            for (let i = 1; i <= nsiIndex; i++) {
                let nsiJson = {};
                if (notNullTool(field["nsiTime" + i])) {
                    nsiJson.nsiTime = field["nsiTime" + i];
                    if (notNullTool(field["nsiWbc" + i])) {
                        nsiJson.nsiWbc = field["nsiWbc" + i];
                    }
                    if (notNullTool(field["nsiIOrT" + i])) {
                        nsiJson.nsiIOrT = field["nsiIOrT" + i];
                    }
                    if (notNullTool(field["nsiPlt" + i])) {
                        nsiJson.nsiPlt = field["nsiPlt" + i];
                    }
                    if (notNullTool(field["nsiCrp" + i])) {
                        nsiJson.nsiCrp = field["nsiCrp" + i];
                    }
                    if (notNullTool(field["nsiPct" + i])) {
                        nsiJson.nsiPct = field["nsiPct" + i];
                    }
                    if (notNullTool(field["nsiPositiveItemNumber" + i])) {
                        nsiJson.nsiPositiveItemNumber = field["nsiPositiveItemNumber" + i];
                    }
                    delete field["nsiTime" + i];
                    delete field["nsiWbc" + i];
                    delete field["nsiIOrT" + i];
                    delete field["nsiPlt" + i];
                    delete field["nsiCrp" + i];
                    delete field["nsiPct" + i];
                    delete field["nsiPositiveItemNumber" + i];
                    nsiArray.push(nsiJson);
                }
            }
            field.nsiArray = JSON.stringify(nsiArray);
            for (let i = 1; i <= cfcIndex; i++) {
                if (field["cfcInspectionTime" + i] !== undefined) {
                    cfcArray.push({
                        cfcInspectionTime: field["cfcInspectionTime" + i],
                        cfcResultTime: field["cfcResultTime" + i],
                        cfcInspectionResult: field["cfcInspectionResult" + i],
                        cfcPositiveBacteria: field["cfcPositiveBacteria" + i]
                    });
                    delete field["cfcInspectionTime" + i];
                    delete field["cfcResultTime" + i];
                    delete field["cfcInspectionResult" + i];
                    delete field["cfcPositiveBacteria" + i];
                }
            }
            field.cfcArray = JSON.stringify(cfcArray);
            $.post("/perinatalPlatform/basicDatabase/write/IS/LOS/post", field, function (back, status) {
                if(status === "success") {
                    if(back.code) {
                        successNext();
                    }else {failMsg(doing)}
                }else {errorMsg1()}
            }, "json").fail(function () {errorMsg2()});
        });

        // 表格 选项问题
        const tableItem = $(".pc-db-item-table");
        for (let i = 0; i < tableItem.length; i++) {
            if ($(tableItem[i]).width() < $(tableItem[i]).children(".pc-db-table").width()) {
                $(tableItem[i]).css("overflow", "scroll");
                $(tableItem[i]).find(".layui-anim.layui-anim-upbit").css("position", "static");
            } else {
                $(tableItem[i]).css("overflow", "visible");
            }
        }
    });
});