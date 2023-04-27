// green 职业评分
function greenScoreOcc(occVal) {
    let occScore;
    if (occVal === "国家机关、党群组织、企业、事业单位负责人") {
        occScore = 63;
    } else if (occVal === "专业技术人员") {
        occScore = 59;
    } else if (occVal === "商业及服务业人员") {
        occScore = 56;
    } else if (occVal === "军人") {
        occScore = 53;
    } else if (occVal === "办事人员") {
        occScore = 49;
    } else if (occVal === "运输设备操作人员") {
        occScore = 42;
    } else {
        occScore = 34;
    }
    return occScore;
}
// green 学历评分
function greenScoreDeg(degVal) {
    let degScore = 0;
    if (degVal === "大学及以上") {
        degScore = 70;
    } else if (degVal === "大专") {
        degScore = 61;
    } else if (degVal === "高中" || degVal === "中专") {
        degScore = 49;
    } else if (degVal === "初中") {
        degScore = 40;
    } else if (degVal === "小学") {
        degScore = 32;
    } else if (degVal === "文盲") {
        degScore = 28;
    }
    return degScore;
}
// 开关后面 多选框
function switchCheckbox(form, switchFilter) {
    form.on("switch(" + switchFilter + ")", function (data) {
        if (data.elem.checked) {
            sequentialExecution(function () {
                $(data.elem).nextAll(".pc-db-attach").children("input").removeAttr("disabled").attr("name", function () {
                    return $(this).attr("data-name");
                });
            }, function () {
                setTimeout(function () {
                    form.render("checkbox");
                },200);
            });
        } else {
            sequentialExecution(function () {
                let checkboxElem = $(data.elem).nextAll(".pc-db-attach").children(".layui-form-checkbox");
                for (let i = 0; i < $(checkboxElem).length; i++) {
                    if ($(checkboxElem[i]).hasClass("layui-form-checked")) {
                        $(checkboxElem[i]).click();
                    }
                }
            }, function () {
                $(data.elem).nextAll(".pc-db-attach").children("input").attr("disabled", true).removeAttr("name");
            }, function () {
                setTimeout(function () {
                    form.render("checkbox");
                },200);
            });
        }
    });
}
// 是否 显示 输入框
function isInputShowInRbg(thisElem, inputElem, isShow) {
    const hasActive = $(thisElem).hasClass("pc-db-active");
    if (hasActive) {
        if (isShow()) {
            $(inputElem).removeAttr("disabled").attr("lay-verify", "requiredDB").attr("name", function () {
                return $(this).attr("data-name");
            });
        } else {
            $(inputElem).removeAttr("name lay-verify").attr("disabled", true).val("");
        }
    } else {
        $(inputElem).removeAttr("name lay-verify").attr("disabled", true).val("");
    }
}
function isContinue(motherFullName, motherPhone, motherAge, motherHospitalNumber) {
    if (notNullTool(motherFullName) && notNullTool(motherPhone) && notNullTool(motherAge) && notNullTool(motherHospitalNumber)) {
        $.post("/perinatalPlatform/basicDatabase/testMI", {
            motherFullName: motherFullName,
            motherPhone: motherPhone,
            motherAge: motherAge,
            motherHospitalNumber: motherHospitalNumber
        }, function (back, status) {
            if (status === "success") {
                if (!back.code) {
                    layer.msg("此母亲信息已存在，确认继续输入吗？",{
                        icon: 0,
                        time: 0,
                        anim: 6,
                        btn: ["继续", "刷新页面"],
                        resize: false,
                        shade: 0.8,
                        btn2: function(){
                            location.reload();
                        }
                    });
                }
            }
        }, "json");
    }
}
// 连线 增加
function connectAdd(thisLi, evenType) {
    const lastId = $(thisLi).attr("data-last");
    if (notNullTool(lastId)) {
        const lastVerId = $(thisLi).attr("data-last-ver");
        if (notNullTool(lastVerId)) {
            $(thisLi).parents("ul").find("li[data-id=" + lastVerId + "]").addClass(evenType + "Left");
        }
        const lastLi = $(thisLi).parents(".pc-db-connect").find("li[data-id=" + lastId + "]");
        $(lastLi).addClass(evenType).addClass(evenType + "Behind");
        connectAdd(lastLi, evenType);
    }
}
// 连线 移除
function connectRemove(thisLi, evenType) {
    const lastId = $(thisLi).attr("data-last");
    if (notNullTool(lastId)) {
        const lastVerId = $(thisLi).attr("data-last-ver");
        if (notNullTool(lastVerId)) {
            $(thisLi).parents("ul").find("li[data-id=" + lastVerId + "]").removeClass(evenType + "Left");
        }
        const lastLi = $(thisLi).parents(".pc-db-connect").find("li[data-id=" + lastId + "]");
        $(lastLi).removeClass(evenType + " " + evenType + "Behind");
        connectRemove(lastLi, evenType);
    }
}
// 计算Z评分
function computeZScore(that, cgaWeek, gender, boyCompute, girlCompute) {
    const data = $(that).val();
    if (notNullTool(data)) {
        if (cgaWeek > 0) {
            if (cgaWeek >= 22 && cgaWeek <= 50) {
                const index = cgaWeek - 22;
                if (notNullTool(gender)) {
                    if (gender === "男") {
                        boyCompute(data, index);
                    } else if (gender === "女") {
                        girlCompute(data, index);
                    }
                } else {
                    layer.msg("未录入性别！",{
                        icon: 2,
                        time: 1000,
                        anim: 6,
                        btn: "好!",
                        resize: false,
                        shade: 0.8
                    }, function () {
                        $("#PC-db-DW").val("");
                    });
                }
            } else {
                layer.msg("纠正胎龄超出范围！",{
                    icon: 2,
                    time: 1000,
                    anim: 6,
                    btn: "好!",
                    resize: false,
                    shade: 0.8
                }, function () {
                    $("#PC-db-DW").val("");
                });
            }
        } else {
            layer.msg("请先填写出院日期！",{
                icon: 2,
                time: 1000,
                anim: 6,
                btn: "好!",
                resize: false,
                shade: 0.8
            }, function () {
                $("#PC-db-DW").val("");
            });
        }
    }
}
// 删除 表格 行
function deleteTr(that, type) {
    layer.msg("确定要 <span class='pc-db-status-color-no'>删除</span> 此" + type + "信息吗?",{
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
function deformityTypeSelectUpdate(form) {
    form.on("select(DS)", function (data) {
        const deformitySystemId = data.value, deformityTypeElem = $(data.elem).parent("td").next("td").children("select");
        if (notNullTool(deformitySystemId)) {
            $.get("/perinatalPlatform/basicDatabase/getDeformityType?deformitySystemId=" + deformitySystemId, function (back, status) {
                if (status === "success") {
                    if (back.code) {
                        $(deformityTypeElem).children("option[value!='']").remove();
                        $.each(back.deformityType, function (index, thisDeformityType) {
                            $(deformityTypeElem).append("<option value='" + thisDeformityType.id + "'>" + thisDeformityType.deformitySystem + "</option>");
                        });
                        form.render("select");
                    }
                }
            }, "json");
        }
    });
}
function deathCauseDiagnosisSelectUpdate(form) {
    form.on("select(DCC)", function (data) {
        const deathCauseClassificationId = data.value,
            deathCauseDiagnosisElem = $(data.elem).parent("td").next("td").children("select");
        if (notNullTool(deathCauseClassificationId)) {
            $.get("/perinatalPlatform/basicDatabase/getDeathCauseDiagnosis?deathCauseClassificationId=" + deathCauseClassificationId, function (back, status) {
                if (status === "success") {
                    if (back.code) {
                        $(deathCauseDiagnosisElem).children("option[value!='']").remove();
                        $.each(back.deathCauseDiagnosis, function (index, thisDeathCauseDiagnosis) {
                            $(deathCauseDiagnosisElem).append("<option value='" + thisDeathCauseDiagnosis.id + "'>" + thisDeathCauseDiagnosis.deathCauseDiagnosis + "</option>");
                        });
                        form.render("select");
                    }
                }
            }, "json");
        }
    });
}
$(document).ready(function () {
    // 获取 窗口宽度
    const windowWidth = $(window).width();

    if (windowWidth < 1438) {
        // 母亲信息 母亲居住区域 平板排版
        const mlaElem = $(".pc-db-BDMIH .mla");
        $(mlaElem).prev().removeClass("layui-col-lg6");
        $(mlaElem).removeClass("layui-col-lg3");
        $(mlaElem).next().removeClass("layui-col-lg3");
        // 母亲信息 糖尿病 平板排版
        const bddgElem = $(".pc-db-item.bddg").parent();
        $(bddgElem).removeClass("layui-col-lg9");
        $(bddgElem).next().removeClass("layui-col-lg3");
    }

    // 每一项 高度
    $(".pc-db-item").height(function () {
        let height = null;
        const rbgElem = $(this).find(".pc-db-radioBtn-group"),
            attachElem = $(this).find(".pc-db-attach"),
            spanItemElem = $(this).find(".pc-db-spanItem"),
            blockElem = $(this).find(".pc-db-block");

        if (windowWidth > 768) {
            if (attachElem.length > 0 && $(attachElem).height() > 30) {
                $(attachElem).addClass("shrink");
                height = $(attachElem).height();
            }
            if (rbgElem.length > 0 && $(rbgElem).height() > 30) {
                height = $(rbgElem).height();
            }
            if (spanItemElem.length > 0 && $(spanItemElem).height() > 30) {
                $(spanItemElem).addClass("shrink");
                height = $(spanItemElem).height();
            }
            if (blockElem.length > 0 && $(blockElem).height() > 30) {
                height = $(blockElem).height();
            }
        }
        return height;
    });

    // 引入 layui
    layui.use(["element", "form", "layer", "laydate"], function () {
        let form = layui.form,
            layer = layui.layer,
            laydate = layui.laydate;

        // 围产新生儿科研合作平台 基础数据库 母亲信息
        if ($(".pc-db-BDMI").length > 0) {
            let nCities, nCounties, bCities, bCounties, hospitalizationYear,
                motherFullName = null, motherPhone = null, motherAge = null, motherHospitalNumber = null,
                bmilProvenceCode, bmilCityCode, bmilCountyCode;

            if (windowWidth < 768) {
                // 母亲信息 糖尿病项 高度
                const bddgAttach = $(".pc-db-BDMI .pc-db-attach.bddg"),
                    bddg = $(bddgAttach).parent(".pc-db-item"),
                    bddgRBG = $(bddgAttach).prev(".pc-db-radioBtn-group");
                $(bddg).height(function () {
                    return $(bddgAttach).height() + $(bddgRBG).height() + 30;
                });
            }

            // 母亲 信息 重复提醒
            // 母亲 姓名
            $("#PC-db-motherFullName").on("focusout", function () {
                const motherFullNameInput = $(this).val();
                if (notNullTool(motherFullNameInput)) {
                    motherFullName = motherFullNameInput;
                    isContinue(motherFullName, motherPhone, motherAge, motherHospitalNumber);
                }
            });
            // 母亲 母亲手机号
            $("#PC-db-motherPhone").on("focusout", function () {
                const motherPhoneInput = $(this).val();
                if (notNullTool(motherPhoneInput)) {
                    motherPhone = motherPhoneInput;
                    isContinue(motherFullName, motherPhone, motherAge, motherHospitalNumber);
                }
            });
            // 母亲 母亲年龄
            $("#PC-db-motherAge").on("focusout", function () {
                const motherAgeInput = $(this).val();
                if (notNullTool(motherAgeInput)) {
                    motherAge = motherAgeInput;
                    isContinue(motherFullName, motherPhone, motherAge, motherHospitalNumber);
                }
            });
            // 母亲 母亲住院号
            $("#PC-db-motherHospitalNumber").on("focusout", function () {
                const motherHospitalNumberInput = $(this).val();
                if (notNullTool(motherHospitalNumberInput)) {
                    motherHospitalNumber = motherHospitalNumberInput;
                    isContinue(motherFullName, motherPhone, motherAge, motherHospitalNumber);
                }
            });

            // 母亲信息 母亲民族 其他输入框
            $("#PC-db-motherNation>li").on("click", function () {
                if ($(this).hasClass("pc-db-active")) {
                    if ($(this).attr("data-value") === "其他") {
                        $("#PC-db-motherNation").prev("input").removeAttr("name");
                        $("#PC-db-motherNationOther").removeAttr("disabled").attr("lay-verify", "requiredDB").attr("name", "motherNation");
                    } else {
                        $("#PC-db-motherNation").prev("input").attr("name", "motherNation");
                        $("#PC-db-motherNationOther").removeAttr("name lay-verify").attr("disabled", true).val("");
                    }
                } else {
                    $("#PC-db-motherNation").prev("input").attr("name", "motherNation");
                    $("#PC-db-motherNationOther").removeAttr("name lay-verify").attr("disabled", true).val("");
                }
            });

            // 母亲信息 糖尿病 糖尿病等级、胰岛素治疗 按钮组
            $("#PC-db-diabetes>.pc-db-radioBtn-group>li").on("click", function () {
                const that = this,
                    value = $(that).attr("data-value");
                isRbgShowInRbg(that, $("#PC-db-diabetesGrade, #PC-db-insulinTherapy"), function () {
                    return (value === "妊娠期糖尿病" || value === "Ⅰ型糖尿病" || value === "Ⅱ型糖尿病");
                });
            });

            // 母亲信息 妊娠风险筛查等级 按钮组
            $("#PC-db-PRS>.pc-db-radioBtn-group>li").on("click", function () {
                const that = this,
                    value = $(that).attr("data-value");
                isRbgShowInRbg(that, $("#PC-db-PRSL"), function () {
                    return (value === "有");
                });
            });

            // 母亲信息 产前检查 输入框
            $("#PC-db-prenatalCare>.pc-db-radioBtn-group>li").on("click", function () {
                const that = this,
                    value = $(that).attr("data-value"),
                    hasActive = $(this).hasClass("pc-db-active");
                if (hasActive) {
                    if (value === "有") {
                        $("#PC-db-FPCUC, #PC-db-prenatalCareNumber, #PC-db-fullInspectionsNumber").removeAttr("disabled").attr("name", function () {
                            return $(this).attr("data-name");
                        });
                    } else {
                        $("#PC-db-FPCUC, #PC-db-prenatalCareNumber, #PC-db-fullInspectionsNumber").removeAttr("name").attr("disabled", true).val("");
                    }
                } else {
                    $("#PC-db-FPCUC, #PC-db-prenatalCareNumber, #PC-db-fullInspectionsNumber").removeAttr("name").attr("disabled", true).val("");
                }
            });

            // 产生 母亲 围产新生儿科研合作平台编号
            let pcMotherNumInput = $("#PC-db-pcMotherNum"), pcMNhead;
            if ($(pcMotherNumInput).val() !== null && $(pcMotherNumInput).val() !== "") {
                pcMNhead = $(pcMotherNumInput).val();
            }

            let hasPcNum = false;
            const hasPcNumString = $("#PC-db-hospitalizationDate").attr("data-hasPcNum");
            if (notNullTool(hasPcNumString) && hasPcNumString === "true") {
                hasPcNum = true;
            }

            // 母亲信息 住院日期
            laydate.render({
                elem: "#PC-db-hospitalizationDate",
                type: "datetime",
                format: "yyyy-MM-dd HH:mm:ss",
                max: 1,
                done: function(value, date) {
                    hospitalizationYear = date.year;
                    $.get("/perinatalPlatform/basicDatabase/getPcMotherNumMaxNum?hospitalizationYear=" + hospitalizationYear,
                        function (back, status) {
                        if (status === "success") {
                            if (!hasPcNum) {
                                if (back.code) {
                                    let hCaseNum = (back.maxId + 1).toString();
                                    if (notNullTool(hCaseNum)) {
                                        $(pcMotherNumInput).val(function () {
                                            if (hCaseNum.length < 4) {
                                                let zero = "";
                                                for (let i = 0; i < (4 - hCaseNum.length); i++) {
                                                    zero = zero + "0"
                                                }
                                                hCaseNum = zero + hCaseNum;
                                            }
                                            hospitalizationYear = date.year;
                                            return pcMNhead + hospitalizationYear + hCaseNum;
                                        });
                                    }
                                } else {
                                    failMsg("围产新生儿科研合作平台编号生成")
                                }
                            }
                        }
                    }, "json");
                }
            });

            // 母亲信息 母亲居住地 城市 选择
            form.on("select(MLP)", function (data) {
                $("#PC-db-ML-city>option[value!='']").remove();
                $("#PC-db-ML-county>option[value!='']").remove();
                const provinceCode = data.value;
                if(notNullTool(provinceCode)) {
                    $.get("/js/utils/region.json", function (back, status) {
                        if (status === "success") {
                            $.each(back, function (index, thisProvince) {
                                if (thisProvince.code === provinceCode) {
                                    nCities = thisProvince.children;
                                    const citySelect = $("#PC-db-ML-city");
                                    $.each(nCities, function (index, thisCity) {
                                        $(citySelect).append("<option value='" + thisCity.code + "'>" + thisCity.name + "</option>");
                                        form.render("select");
                                    });
                                }
                            });
                        }
                    }, "json");
                }
            });

            // 母亲信息 母亲居住地 县区 选择
            form.on("select(MLC)", function (data) {
                $("#PC-db-ML-county>option[value!='']").remove();
                const cityCode = data.value;
                if(notNullTool(cityCode)) {
                    $.each(nCities, function (index, thisCity) {
                        if(thisCity.code === cityCode) {
                            nCounties = thisCity.children;
                            const countySelect = $("#PC-db-ML-county");
                            $.each(nCounties, function (index, thisCounty) {
                                $(countySelect).append("<option value='" + thisCounty.code + "'>" + thisCounty.name + "</option>");
                            });
                            form.render("select");
                        }
                    });
                }
            });

            // 查看数据时 母亲信息 母亲居住地 城市 选择
            const mlProvinceElem = $("#PC-db-ML-province"),
                mlCityElem = $("#PC-db-ML-city"),
                mlCountyElem = $("#PC-db-ML-county"),
                nCity = $(mlCityElem).attr("data-value");
            if (nCity !== null) {
                $(mlCityElem).children("option[value!='']").remove();
                $(mlCountyElem).children("option[value!='']").remove();
                let provinceCode = $(mlProvinceElem).attr("data-value");
                if(notNullTool(provinceCode)) {
                    $.get("/js/utils/region.json", function (back, status) {
                        if (status === "success") {
                            $.each(back, function (index, thisProvince) {
                                if (thisProvince.code === provinceCode) {
                                    nCities = thisProvince.children;
                                    $.each(nCities, function (index, thisCity) {
                                        if (nCity === thisCity.code) {
                                            $(mlCityElem).append("<option value='" + thisCity.code + "' selected>" + thisCity.name + "</option>");
                                        } else {
                                            $(mlCityElem).append("<option value='" + thisCity.code + "'>" + thisCity.name + "</option>");
                                        }
                                    });
                                }
                            });
                            // 查看数据时 母亲信息 母亲居住地 县区 选择
                            const nCounty = $(mlCountyElem).attr("data-value");
                            if (nCounty !== null) {
                                $(mlCountyElem).children("option[value!='']").remove();
                                const cityCode = nCity;
                                if(notNullTool(cityCode)) {
                                    $.each(nCities, function (index, thisCity) {
                                        if(thisCity.code === cityCode) {
                                            nCounties = thisCity.children;
                                            $.each(nCounties, function (index, thisCounty) {
                                                if (nCounty === thisCounty.code) {
                                                    $(mlCountyElem).append("<option value='" + thisCounty.code + "' selected>" + thisCounty.name + "</option>");
                                                } else {
                                                    $(mlCountyElem).append("<option value='" + thisCounty.code + "'>" + thisCounty.name + "</option>");
                                                }
                                            });
                                        }
                                    });
                                }
                            }
                            form.render("select");
                        }
                    }, "json");
                }
            }

            // 母亲信息 迁入年份
            laydate.render({
                elem: "#PC-db-moveInYear",
                type: "year",
                format: "yyyy",
                max: 1,
                done: function (value, date) {
                    if (notNullTool(hospitalizationYear)) {
                        const intervalYear = parseInt(hospitalizationYear) - parseInt(date.year);
                        $("#PC-db-moveInPeriod").val(intervalYear);
                    } else {
                        const intervalYear = new Date().getFullYear() - parseInt(date.year);
                        $("#PC-db-moveInPeriod").val(intervalYear);
                    }
                }
            });

            // 母亲信息 迁入前居住地 城市 选择
            form.on("select(BMILP)", function (data) {
                $("#PC-db-BMIL-city>option[value!='']").remove();
                $("#PC-db-BMIL-county>option[value!='']").remove();
                bmilProvenceCode = data.value;
                if(notNullTool(bmilProvenceCode)) {
                    $.get("/js/utils/region.json", function (back, status) {
                        if (status === "success") {
                            $.each(back, function (index, thisProvince) {
                                if (thisProvince.code === bmilProvenceCode) {
                                    bCities = thisProvince.children;
                                    const citySelect = $("#PC-db-BMIL-city");
                                    $.each(bCities, function (index, thisCity) {
                                        $(citySelect).append("<option value='" + thisCity.code + "'>" + thisCity.name + "</option>");
                                    });
                                }
                            });
                            form.render("select");
                        }
                    }, "json");
                }
            });

            // 母亲信息 迁入前居住地 县区 选择
            form.on("select(BMILC)", function (data) {
                $("#PC-db-BMIL-county>option[value!='']").remove();
                bmilCityCode = data.value;
                if(notNullTool(bmilCityCode)) {
                    $.each(bCities, function (index, thisCity) {
                        if(thisCity.code === bmilCityCode) {
                            bCounties = thisCity.children;
                            const countySelect = $("#PC-db-BMIL-county");
                            $.each(bCounties, function (index, thisCounty) {
                                $(countySelect).append("<option value='" + thisCounty.code + "'>" + thisCounty.name + "</option>");
                            });
                        }
                    });
                    form.render("select");
                }
            });

            // 母亲信息 迁入前居住地 县区 赋值
            form.on("select(BMILCO)", function (data) {
                bmilCountyCode = data.value;
            });

            // 查看数据时 母亲信息 迁入前居住地 城市 选择
            const bmilProvinceElem = $("#PC-db-BMIL-province"),
                bmilCityElem = $("#PC-db-BMIL-city"),
                bmilCountyElem = $("#PC-db-BMIL-county"),
                bCity = $(bmilCityElem).attr("data-value");
            if (bCity !== null) {
                $(bmilCityElem).children("option[value!='']").remove();
                $(bmilCountyElem).children("option[value!='']").remove();
                const provinceCode = $(bmilProvinceElem).attr("data-value");
                if(notNullTool(provinceCode)) {
                    $.get("/js/utils/region.json", function (back, status) {
                        if (status === "success") {
                            $.each(back, function (index, thisProvince) {
                                if (thisProvince.code === provinceCode) {
                                    bCities = thisProvince.children;
                                    $.each(bCities, function (index, thisCity) {
                                        if (bCity === thisCity.code) {
                                            $(bmilCityElem).append("<option value='" + thisCity.code + "' selected>" + thisCity.name + "</option>");
                                        } else {
                                            $(bmilCityElem).append("<option value='" + thisCity.code + "'>" + thisCity.name + "</option>");
                                        }
                                    });
                                }
                            });
                            // 查看数据时 母亲信息 迁入前居住地 县区 选择
                            const bCounty = $(bmilCountyElem).attr("data-value");
                            if (bCounty !== null) {
                                $(bmilCountyElem).children("option[value!='']").remove();
                                const cityCode = bCity;
                                if(notNullTool(cityCode)) {
                                    $.each(bCities, function (index, thisCity) {
                                        if(thisCity.code === cityCode) {
                                            bCounties = thisCity.children;
                                            $.each(bCounties, function (index, thisCounty) {
                                                if (bCounty === thisCounty.code) {
                                                    $(bmilCountyElem).append("<option value='" + thisCounty.code + "' selected>" + thisCounty.name + "</option>");
                                                } else {
                                                    $(bmilCountyElem).append("<option value='" + thisCounty.code + "'>" + thisCounty.name + "</option>");
                                                }
                                            });
                                        }
                                    });
                                }
                            }
                            form.render("select");
                        }
                    }, "json");
                }
            }

            // 母亲信息 母亲迁入前 居住城乡区域 按钮组
            form.on("switch(TRPH)", function (data) {
                const inputMoveInYPL = $("#PC-db-moveInYear, #PC-db-moveInPeriod, #PC-db-BMILA"),
                    inputBMLA = $("#PC-db-BMLA>input"),
                    selectBMIL = $("#PC-db-BMIL select"),
                    rbgBMLA = $("#PC-db-BMLA>.pc-db-radioBtn-group"),
                    rbgLiBMLA = $("#PC-db-BMLA>.pc-db-radioBtn-group>li");
                if (data.elem.checked) {
                    // 迁入年限、迁入年份、迁入前 海拔
                    $(inputMoveInYPL).removeAttr("class disabled").attr("lay-verify", "requiredDB").attr("name", function () {
                        return $(this).attr("data-name");
                    });

                    // 迁入前 母亲居住城乡区域
                    $(inputBMLA).attr("lay-verify", "requiredRadioGroup").attr("name", function () {
                        return $(this).attr("data-name");
                    });
                    $(rbgBMLA).removeClass("rbgOff");
                    $(rbgLiBMLA).on("click", function () {
                        activeRBGChoice(this);
                    });

                    // 迁入前 母亲居住地
                    sequentialExecution(function () {
                        $(selectBMIL).removeAttr("disabled").attr("lay-verify", "required");
                    }, function () {
                        form.render("select");
                    });
                } else {
                    // 迁入年限、迁入年份、迁入前 海拔
                    $(inputMoveInYPL).removeAttr("name lay-verify").attr("disabled", true).val("");

                    // 迁入前 母亲居住城乡区域
                    $(inputBMLA).removeAttr("name lay-verify").val("");
                    $(rbgBMLA).addClass("rbgOff");
                    $(rbgLiBMLA).removeAttr("class").off("click");

                    // 迁入前 母亲居住地
                    sequentialExecution(function () {
                        $(selectBMIL).removeAttr("name lay-verify").attr("disabled", true).val("");
                    }, function () {
                        form.render("select");
                    });
                }
            });

            // 母亲信息 妊娠期其它合并症 输入框
            form.on("switch(OCDP)", function (data) {
                if (data.elem.checked) {
                    $(data.elem).nextAll(".pc-db-attach").children("input").removeAttr("disabled").attr("name", function () {
                        return $(this).attr("data-name");
                    });
                } else {
                    $(data.elem).nextAll(".pc-db-attach").children("input").removeAttr("name").attr("disabled", true).val("");
                }
            });

            // 基础数据库 母亲信息 添加/编辑 信息 提交
            form.on("submit(MI)", function (data) {
                const doing = "保存信息",
                    field = data.field;
                loading(doing);
                if (notNullTool(bmilProvenceCode)) {
                    field.beforeMovingInLiveProvince = bmilProvenceCode;
                }
                if (notNullTool(bmilCityCode)) {
                    field.beforeMovingInLiveCity = bmilCityCode;
                }
                if (notNullTool(bmilCountyCode)) {
                    field.beforeMovingInLiveCounty = bmilCountyCode;
                }
                for (let i in field) {
                    if (!notNullTool(field[i])) {
                        delete field[i];
                    }
                }
                $.post("/perinatalPlatform/basicDatabase/write/MI/post", field, function (back, status) {
                    if(status === "success") {
                        if(back.code) {
                            successNext();
                        }else {failMsg(doing)}
                    }else {errorMsg1()}
                },"json").fail(function () {errorMsg2()});
            });
        }


        // 围产新生儿科研合作平台 基础数据库 孕期信息
        if ($(".pc-db-BDGI").length > 0) {
            // 孕期信息 Green评分计算
            let moOcc = 0, moDeg = 0, faOcc = 0, faDeg = 0;
            const moOccInput = $("#PC-db-moOcc>input").val(),
                faOccInput = $("#PC-db-faOcc>input").val(),
                moDegInput = $("#PC-db-moDeg>input").val(),
                faDegInput = $("#PC-db-faDeg>input").val();
            if (notNullTool(moOccInput)) {
                moOcc = greenScoreOcc(moOccInput);
            }
            if (notNullTool(faOccInput)) {
                faOcc = greenScoreOcc(faOccInput);
            }
            if (notNullTool(moDegInput)) {
                moDeg = greenScoreDeg(moDegInput);
            }
            if (notNullTool(faDegInput)) {
                faDeg = greenScoreDeg(faDegInput);
            }
            $("#PC-db-moOcc>.pc-db-radioBtn-group>li").on("click", function () {
                moOcc = greenScoreOcc($(this).attr("data-value"));
                if (moOcc > 0 && moDeg > 0 && faOcc > 0 && faDeg > 0) {
                    $("#PC-db-greenScore").val(((faDeg*0.7+faOcc*0.4+moDeg*0.7+moOcc*0.4)/2).toFixed(2));
                }
            });
            $("#PC-db-faOcc>.pc-db-radioBtn-group>li").on("click", function () {
                faOcc = greenScoreOcc($(this).attr("data-value"));
                if (moOcc > 0 && moDeg > 0 && faOcc > 0 && faDeg > 0) {
                    $("#PC-db-greenScore").val(((faDeg*0.7+faOcc*0.4+moDeg*0.7+moOcc*0.4)/2).toFixed(2));
                }
            });
            $("#PC-db-moDeg>.pc-db-radioBtn-group>li").on("click", function () {
                moDeg = greenScoreDeg($(this).attr("data-value"));
                if (moOcc > 0 && moDeg > 0 && faOcc > 0 && faDeg > 0) {
                    $("#PC-db-greenScore").val(((faDeg*0.7+faOcc*0.4+moDeg*0.7+moOcc*0.4)/2).toFixed(2));
                }
            });
            $("#PC-db-faDeg>.pc-db-radioBtn-group>li").on("click", function () {
                faDeg = greenScoreDeg($(this).attr("data-value"));
                if (moOcc > 0 && moDeg > 0 && faOcc > 0 && faDeg > 0) {
                    $("#PC-db-greenScore").val(((faDeg*0.7+faOcc*0.4+moDeg*0.7+moOcc*0.4)/2).toFixed(2));
                }
            });

            // 孕期信息 母亲身高提示
            const motherHeightElem = $("#PC-db-motherHeight");
            $(motherHeightElem).on("focusout", function () {
                const motherHeightInput = $(this).val();
                if (notNullTool(motherHeightInput)) {
                    const motherHeight = parseFloat(motherHeightInput);
                    if (motherHeight > 3) {
                        layer.msg("请注意母亲身高单位为 <span class='layui-badge layui-bg-red'>m</span> ！", {
                            icon: 5,
                            time: 3000,
                            anim: 6,
                            btn: "好",
                            resize: false,
                            shade: 0.8
                        }, function () {
                            $("#PC-db-motherHeight").val("");
                        });
                    }
                }
            });
            // 孕期信息 孕前BMI 分娩前BMI 孕期体重增加 计算
            let motherHeight = 0, weightBeforePregnancy = 0, weightBeforeDelivery = 0;
            const motherHeightInput = $(motherHeightElem),
                weightBeforePregnancyInput = $("#PC-db-WBP"),
                weightBeforeDeliveryInput = $("#PC-db-WBD"),
                bmiBeforePregnancy = $("#PC-db-BMIBP"),
                bmiBeforeDelivery = $("#PC-db-BMIBD"),
                weightGainDuringPregnancy = $("#PC-db-WGDP");
            if (notNullTool($(motherHeightInput).val())) {
                motherHeight = $(motherHeightInput).val();
            }
            if (notNullTool($(weightBeforePregnancyInput).val())) {
                weightBeforePregnancy = $(weightBeforePregnancyInput).val();
            }
            if (notNullTool($(weightBeforeDeliveryInput).val())) {
                weightBeforeDelivery = $(weightBeforeDeliveryInput).val();
            }
            $(motherHeightInput).on("focusout", function () {
                if (notNullTool($(this).val())) {
                    motherHeight = $(this).val();
                    if (weightBeforePregnancy > 0 && weightBeforeDelivery > 0) {
                        $(weightGainDuringPregnancy).val(weightBeforeDelivery - weightBeforePregnancy);
                    }
                    if (motherHeight > 0) {
                        if (weightBeforePregnancy > 0) {
                            $(bmiBeforePregnancy).val((weightBeforePregnancy/motherHeight/motherHeight).toFixed(1));
                        }
                        if (weightBeforeDelivery) {
                            $(bmiBeforeDelivery).val((weightBeforeDelivery/motherHeight/motherHeight).toFixed(1));
                        }
                    }
                }
            });
            $(weightBeforePregnancyInput).on("focusout", function () {
                if (notNullTool($(this).val())) {
                    weightBeforePregnancy = $(this).val();
                    if (weightBeforePregnancy > 0 && weightBeforeDelivery > 0) {
                        $(weightGainDuringPregnancy).val(weightBeforeDelivery - weightBeforePregnancy);
                    }
                    if (motherHeight > 0) {
                        if (weightBeforePregnancy > 0) {
                            $(bmiBeforePregnancy).val((weightBeforePregnancy/motherHeight/motherHeight).toFixed(1));
                        }
                        if (weightBeforeDelivery) {
                            $(bmiBeforeDelivery).val((weightBeforeDelivery/motherHeight/motherHeight).toFixed(1));
                        }
                    }
                }
            });
            $(weightBeforeDeliveryInput).on("focusout", function () {
                if (notNullTool($(this).val())) {
                    weightBeforeDelivery = $(this).val();
                    if (weightBeforePregnancy > 0 && weightBeforeDelivery > 0) {
                        $(weightGainDuringPregnancy).val(weightBeforeDelivery - weightBeforePregnancy);
                    }
                    if (motherHeight > 0) {
                        if (weightBeforePregnancy > 0) {
                            $(bmiBeforePregnancy).val((weightBeforePregnancy/motherHeight/motherHeight).toFixed(1));
                        }
                        if (weightBeforeDelivery) {
                            $(bmiBeforeDelivery).val((weightBeforeDelivery/motherHeight/motherHeight).toFixed(1));
                        }
                    }
                }
            });

            // 基础数据库 孕期信息 添加/编辑 信息 提交
            form.on("submit(GI)", function (data) {
                const doing = "保存信息",
                    field = data.field;
                loading(doing);
                for (let i in field) {
                    if (!notNullTool(field[i])) {
                        delete field[i];
                    }
                }
                $.post("/perinatalPlatform/basicDatabase/write/GI/post", field, function (back, status) {
                    if(status === "success") {
                        if(back.code) {
                            successNext();
                        }else {failMsg(doing)}
                    }else {errorMsg1()}
                },"json").fail(function () {errorMsg2()});
            });
        }

        // 围产新生儿科研合作平台 基础数据库 围产信息
        if ($(".pc-db-BDPI").length > 0) {
            // 围产信息 抗生素 高度
            if (windowWidth > 768 && windowWidth < 1251) {
                $(".pc-db-BDPI .pc-db-item.ar").height(function () {
                    return $(this).children(".pc-db-spanItem").height() + $(this).children("label").height() + 10;
                });
            }

            // 围产信息 产前皮质醇 后面的输入框
            $("#PC-db-AC>.pc-db-radioBtn-group>li").on("click", function () {
                const that = this,
                    value = $(that).attr("data-value");
                isInputShowInRbg(that, $("#PC-db-ACST, #PC-db-ACET, #PC-db-ACF"), function () {
                    return value === "是";
                });
            });

            // 围产信息 组织病理学检查 结果 按钮组
            $("#PC-db-HE>.pc-db-radioBtn-group>li").on("click", function () {
                const that = this,
                    value = $(that).attr("data-value");
                isRbgShowInRbg(that, $("#PC-db-HEO"), function () {
                    return value === "是";
                });
                if (value === "未回报") {
                    $(this).parent().addClass("pc-db-hasnt");
                } else {
                    $(this).parent().removeClass("pc-db-hasnt");
                }
            });

            // 围产信息 受孕方式 体外受精 按钮组
            $("#PC-db-CM>.pc-db-radioBtn-group>li").on("click", function () {
                const that = this,
                    value = $(that).attr("data-value");
                isRbgShowInRbg(that, $("#PC-db-IVF"), function () {
                    return value === "体外受精（IVF）";
                });
            });

            // 围产信息 宫颈环扎 环扎胎龄
            $("#PC-db-CC .pc-db-radioBtn-group>li").on("click", function () {
                const that = this,
                    value = $(that).attr("data-value");
                isInputShowInRbg(this, "#PC-db-CGA", function () {
                    return value === "是";
                });
            });

            // 日期数据存在 则获取
            const startDateInput = $("#PC-db-ACST"), endDateInput = $("#PC-db-ACET");
            let startDate = null, endDate = null, startDateStamp = 0, endDateStamp = 0;
            if (notNullTool($(startDateInput).val())) {
                startDate = $(startDateInput).val();
                endDateStamp = Date.parse(startDate);
            }
            if (notNullTool($(endDateInput).val())) {
                endDate = $(endDateInput).val();
                endDateStamp = Date.parse(endDate);
            }
            // 围产信息 产前皮质醇 开始日期
            laydate.render({
                elem: "#PC-db-ACST",
                type: "datetime",
                format: "yyyy-MM-dd HH:mm:ss",
                max: 1,
                done: function(value, date) {
                    if(value !== "") {
                        startDate = date.year + "-" + date.month + "-" + date.date +  ' ' + date.hours + ':' + date.minutes + ':' + date.seconds;
                        startDateStamp = Date.parse(startDate);
                        if(endDate !== null) {
                            if(startDateStamp > endDateStamp) {
                                layer.msg("开始日期必须<span class='layui-badge'>早于</span>结束日期！", {
                                    icon: 5,
                                    time: 3000,
                                    anim: 6,
                                    btn: "好",
                                    resize: false,
                                    shade: 0.8
                                }, function () {
                                    $("#PC-db-ACST").val("");
                                    startDate = null;
                                    startDateStamp = 0;
                                });
                            }
                        }
                    }else {
                        startDate = null;
                        startDateStamp = 0;
                    }
                }
            });

            // 围产信息 产前皮质醇 结束日期
            laydate.render({
                elem: "#PC-db-ACET",
                type: "datetime",
                format: "yyyy-MM-dd HH:mm:ss",
                max: 1,
                done: function(value, date) {
                    if(value !== "") {
                        endDate = date.year + "-" + date.month + "-" + date.date +  ' ' + date.hours + ':' + date.minutes + ':' + date.seconds;
                        endDateStamp = Date.parse(endDate);
                        if (startDate !== null) {
                            if (startDateStamp > endDateStamp) {
                                layer.msg("结束日期必须<span class='layui-badge'>晚于</span>开始日期！", {
                                    icon: 5,
                                    time: 3000,
                                    anim: 6,
                                    btn: "好",
                                    resize: false,
                                    shade: 0.8
                                }, function () {
                                    $("#PC-db-ACET").val("");
                                    endDate = null;
                                    endDateStamp = 0;
                                });
                            }
                        }
                    }else {
                        endDate = null;
                        endDateStamp = 0;
                    }
                }
            });

            //  围产信息 分娩前24小时内抗生素使用 抗生素使用日期、分娩日期 存在则获取
            const antibioticUseDateInput = $("#PC-db-AUD"), deliveryDateInput = $("#PC-db-deliveryDat");
            let antibioticUseDate = null, deliveryDate = null, antibioticUseDateStamp = 0, deliveryDateStamp = 0;
            if (notNullTool($(antibioticUseDateInput).val())) {
                antibioticUseDate = $(antibioticUseDateInput).val();
                antibioticUseDateStamp = Date.parse(antibioticUseDate);
            }
            if (notNullTool($(deliveryDateInput).val())) {
                deliveryDate = $(deliveryDateInput).val();
                deliveryDateStamp = Date.parse(deliveryDate);
            }
            // 围产信息 分娩前24小时内抗生素使用 抗生素使用日期
            laydate.render({
                elem: "#PC-db-AUD",
                type: "datetime",
                format: "yyyy-MM-dd HH:mm:ss",
                max: 1,
                done: function(value, date) {
                    if(value !== "") {
                        antibioticUseDate = date.year + "-" + date.month + "-" + date.date +  ' ' + date.hours + ':' + date.minutes + ':' + date.seconds;
                        antibioticUseDateStamp = Date.parse(antibioticUseDate);
                        if(deliveryDate !== null) {
                            if(antibioticUseDateStamp <= deliveryDateStamp) {
                                $("#PC-db-AUL").val(Math.round((deliveryDateStamp - antibioticUseDateStamp) / 3600000));
                            } else {
                                layer.msg("抗生素使用日期必须<span class='layui-badge'>早于</span>分娩日期！", {
                                    icon: 5,
                                    time: 3000,
                                    anim: 6,
                                    btn: "好",
                                    resize: false,
                                    shade: 0.8
                                }, function () {
                                    $("#PC-db-AUD").val("");
                                    antibioticUseDate = null;
                                    antibioticUseDateStamp = 0;
                                });
                            }
                        }
                    }else {
                        antibioticUseDate = null;
                        antibioticUseDateStamp = 0;
                    }
                }
            });

            // 围产信息 分娩日期存在 结束日期
            laydate.render({
                elem: "#PC-db-deliveryDate",
                type: "datetime",
                format: "yyyy-MM-dd HH:mm:ss",
                max: 1,
                done: function(value, date) {
                    if(value !== "") {
                        deliveryDate = date.year + "-" + date.month + "-" + date.date +  ' ' + date.hours + ':' + date.minutes + ':' + date.seconds;
                        deliveryDateStamp = Date.parse(deliveryDate);
                        if (antibioticUseDate !== null) {
                            if (antibioticUseDateStamp <= deliveryDateStamp) {
                                $("#PC-db-AUL").val(Math.round((deliveryDateStamp - antibioticUseDateStamp) / 3600000));
                            } else {
                                layer.msg("分娩日期必须<span class='layui-badge'>晚于</span>抗生素使用日期！", {
                                    icon: 5,
                                    time: 3000,
                                    anim: 6,
                                    btn: "好",
                                    resize: false,
                                    shade: 0.8
                                }, function () {
                                    $("#PC-db-deliveryDate").val("");
                                    deliveryDate = null;
                                    deliveryDateStamp = 0;
                                });
                            }
                        }
                    }else {
                        deliveryDate = null;
                        deliveryDateStamp = 0;
                    }
                }
            });

            // 围产信息 分娩前24小时内抗生素使用 后面的输入
            $("#PC-db-AUW24HBD>.pc-db-radioBtn-group>li").on("click", function () {
                const value = $(this).attr("data-value"),
                    hasActive = $(this).hasClass("pc-db-active");

                if (hasActive) {
                    if (value === "是") {
                        sequentialExecution(function () {
                            $("#PC-db-AUD, #PC-db-deliveryDate, #PC-db-AUL").removeAttr("disabled").attr("lay-verify", "requiredDB").attr("name", function () {
                                return $(this).attr("data-name");
                            });
                            $("#PC-db-antibioticTypes>.pc-db-enter>select, #PC-db-antibioticTypes>.pc-db-enter>input, #PC-db-antibioticReasons>.pc-db-enter>select").removeAttr("disabled").attr("name", function () {
                                return $(this).attr("data-name");
                            });
                        }, function () {
                            form.render("select");
                        });
                    } else {
                        sequentialExecution(function () {
                            $("#PC-db-AUD, #PC-db-deliveryDate, #PC-db-AUL").removeAttr("name lay-verify").attr("disabled", true).val("");
                            $("#PC-db-antibioticTypes>.pc-db-enter>select, #PC-db-antibioticTypes>.pc-db-enter>input, #PC-db-antibioticReasons>.pc-db-enter>select").removeAttr("name").attr("disabled", true).val("");
                        }, function () {
                            form.render("select");
                        });
                    }
                } else {
                    sequentialExecution(function () {
                        $("#PC-db-AUD, #PC-db-deliveryDate, #PC-db-AUL").removeAttr("name lay-verify").attr("disabled", true).val("");
                        $("#PC-db-antibioticTypes>.pc-db-enter>select, #PC-db-antibioticTypes>.pc-db-enter>input, #PC-db-antibioticReasons>.pc-db-enter>select").removeAttr("name").attr("disabled", true).val("");
                    }, function () {
                        form.render("select");
                    });
                }
            });

            // 围产信息 分娩前24小时内抗生素使用 抗生素使用类型
            let antibioticType1 = null, antibioticType2 = null, antibioticType3 = null, antibioticType4 = null;
            form.on("select(AT1)", function (data) {
                const value = data.value;
                if (notNullTool(value)) {
                    antibioticType1 = value;
                    if (antibioticType1 === antibioticType2 || antibioticType1 === antibioticType3 || antibioticType1 === antibioticType4) {
                        layer.msg("不能选择相同的抗生素类型！", {
                            icon: 5,
                            time: 3000,
                            anim: 6,
                            btn: "好",
                            resize: false,
                            shade: 0.8
                        }, function () {
                            form.val("BDPI", {
                                "antibioticType1" : ""
                            });
                        });
                    }
                }
            });
            form.on("select(AT2)", function (data) {
                const value = data.value;
                if (notNullTool(value)) {
                    antibioticType2 = value;
                    if (antibioticType2 === antibioticType1 || antibioticType2 === antibioticType3 || antibioticType2 === antibioticType4) {
                        layer.msg("不能选择相同的抗生素类型！", {
                            icon: 5,
                            time: 3000,
                            anim: 6,
                            btn: "好",
                            resize: false,
                            shade: 0.8
                        }, function () {
                            form.val("BDPI", {
                                "antibioticType2" : ""
                            });
                        });
                    }
                }
            });
            form.on("select(AT3)", function (data) {
                const value = data.value;
                if (notNullTool(value)) {
                    antibioticType3 = value;
                    if (antibioticType3 === antibioticType1 || antibioticType3 === antibioticType2 || antibioticType3 === antibioticType4) {
                        layer.msg("不能选择相同的抗生素类型！", {
                            icon: 5,
                            time: 3000,
                            anim: 6,
                            btn: "好",
                            resize: false,
                            shade: 0.8
                        }, function () {
                            form.val("BDPI", {
                                "antibioticType3" : ""
                            });
                        });
                    }
                }
            });
            $("#PC-db-antibioticType4").on("focusout", function () {
                if (notNullTool($(this).val())) {
                    antibioticType4 = $(this).val();
                    if (antibioticType4 === antibioticType1 || antibioticType4 === antibioticType2 || antibioticType4 === antibioticType3) {
                        layer.msg("不能选择相同的抗生素类型！", {
                            icon: 5,
                            time: 3000,
                            anim: 6,
                            btn: "好",
                            resize: false,
                            shade: 0.8
                        }, function () {
                            form.val("BDPI", {
                                "antibioticType4" : ""
                            });
                        });
                    }
                }
            });

            // 围产信息 分娩前24小时内抗生素使用 抗生素使用原因
            let antibioticReason1 = null, antibioticReason2 = null, antibioticReason3 = null;
            form.on("select(AR1)", function (data) {
                const value = data.value;
                if (notNullTool(value)) {
                    antibioticReason1 = value;
                    if (antibioticReason1 === antibioticReason2 || antibioticReason1 === antibioticReason3) {
                        layer.msg("不能选择相同的抗生素使用原因！", {
                            icon: 5,
                            time: 3000,
                            anim: 6,
                            btn: "好",
                            resize: false,
                            shade: 0.8
                        }, function () {
                            form.val("BDPI", {
                                "antibioticReason1" : ""
                            });
                        });
                    }
                }
            });
            form.on("select(AR2)", function (data) {
                const value = data.value;
                if (notNullTool(value)) {
                    antibioticReason2 = value;
                    if (antibioticReason2 === antibioticReason1 || antibioticReason2 === antibioticReason3) {
                        layer.msg("不能选择相同的抗生素使用原因！", {
                            icon: 5,
                            time: 3000,
                            anim: 6,
                            btn: "好",
                            resize: false,
                            shade: 0.8
                        }, function () {
                            form.val("BDPI", {
                                "antibioticReason2" : ""
                            });
                        });
                    }
                }
            });
            form.on("select(AR3)", function (data) {
                const value = data.value;
                if (notNullTool(value)) {
                    antibioticReason3 = value;
                    if (antibioticReason3 === antibioticReason1 || antibioticReason3 === antibioticReason2) {
                        layer.msg("不能选择相同的抗生素使用原因！", {
                            icon: 5,
                            time: 3000,
                            anim: 6,
                            btn: "好",
                            resize: false,
                            shade: 0.8
                        }, function () {
                            form.val("BDPI", {
                                "antibioticReason3" : ""
                            });
                        });
                    }
                }
            });

            // 产妇不明原因发热 后面的输入框
            form.on("switch(MUOF)", function (data) {
                if (data.elem.checked) {
                    $("#PC-db-BTMUOF, #PC-db-HRMUOF").removeAttr("disabled").attr("lay-verify", "requiredBD").attr("name", function () {
                        return $(this).attr("data-name");
                    });
                } else {
                    $("#PC-db-BTMUOF, #PC-db-HRMUOF").removeAttr("name lay-verify").attr("disabled", true).val("");
                }
            });

            // 胎儿心率增快 后面的输入框
            form.on("switch(IFHR)", function (data) {
                if (data.elem.checked) {
                    $("#PC-db-HRIFHR").removeAttr("disabled").attr("lay-verify", "requiredBD").attr("name", function () {
                        return $(this).attr("data-name");
                    });
                } else {
                    $("#PC-db-HRIFHR").removeAttr("name lay-verify").attr("disabled", true).val("");
                }
            });

            // 围产信息 产前干预 后面的输入
            $("#PC-db-PI>.pc-db-radioBtn-group>li").on("click", function () {
                const value = $(this).attr("data-value"),
                    hasActive = $(this).hasClass("pc-db-active");

                if (hasActive) {
                    if (value === "是") {
                        sequentialExecution(function () {
                            $("#PC-db-PI>.pc-db-attach>input").removeAttr("disabled").attr("name", function () {
                                return $(this).attr("data-name");
                            });
                            $("#PC-db-PIWD input").removeAttr("disabled").attr("lay-verify", "required").attr("name", function () {
                                return $(this).attr("data-name");
                            });
                        }, function () {
                            form.render("checkbox");
                        });
                    } else {
                        sequentialExecution(function () {
                            let checkboxElem = $("#PC-db-PI>.pc-db-attach>.layui-form-checkbox");
                            for (let i = 0; i < $(checkboxElem).length; i++) {
                                if ($(checkboxElem[i]).hasClass("layui-form-checked")) {
                                    $(checkboxElem[i]).click();
                                }
                            }
                        }, function () {
                            $("#PC-db-PI>.pc-db-attach>input").removeAttr("name").attr("disabled", true);
                            $("#PC-db-PIWD input").removeAttr("name lay-verify").attr("disabled", true).val("");
                        }, function () {
                            form.render("checkbox");
                        });
                    }
                } else {
                    sequentialExecution(function () {
                        let checkboxElem = $("#PC-db-PI>.pc-db-attach>.layui-form-checkbox");
                        for (let i = 0; i < $(checkboxElem).length; i++) {
                            if ($(checkboxElem[i]).hasClass("layui-form-checked")) {
                                $(checkboxElem[i]).click();
                            }
                        }
                    }, function () {
                        $("#PC-db-PI>.pc-db-attach>input").removeAttr("name").attr("disabled", true);
                        $("#PC-db-PIWD input").removeAttr("name lay-verify").attr("disabled", true).val("");
                    }, function () {
                        form.render("checkbox");
                    });
                }
            });

            // 围产信息 产前出血 后面的 多选框
            switchCheckbox(form, "PH");

            // 基础数据库 围产信息 添加/编辑 信息 提交
            form.on("submit(PI)", function (data) {
                const doing = "保存信息",
                    field = data.field;
                loading(doing);
                for (let i in field) {
                    if (!notNullTool(field[i])) {
                        delete field[i];
                    }
                }
                $.post("/perinatalPlatform/basicDatabase/write/PI/post", field, function (back, status) {
                    if(status === "success") {
                        if(back.code) {
                            successNext();
                        }else {failMsg(doing)}
                    }else {errorMsg1()}
                },"json").fail(function () {errorMsg2()});
            });
        }

        // 围产新生儿科研合作平台 基础数据库 宝宝情况
        if ($(".pc-db-BDBS").length > 0) {
            // 基础数据库 宝宝情况 多胞情况 多胞输入框
            const rbgLiMS = $("#PC-db-MS>.pc-db-radioBtn-group>li"),
                inputMS = $("#PC-db-MS>input"),
                rbgTwins = $("#PC-db-twins>.pc-db-radioBtn-group"),
                rbgLiTwins = $(rbgTwins).children("li"),
                inputTwins = $("#PC-db-twins>input"),
                rbgThreeBirths = $("#PC-db-threeBirths>.pc-db-radioBtn-group"),
                rbgLiThreeBirths = $(rbgThreeBirths).children("li"),
                inputThreeBirths = $("#PC-db-threeBirths>input"),
                pcNewBornNumInput = $("#PC-db-pcNewbornNum");
            let pcNewBornNum = $(pcNewBornNumInput).val();
            let pcNewBornNumList = pcNewBornNum.split("-");
            if (pcNewBornNumList.length === 2) {
                pcNewBornNum = pcNewBornNumList[0];
            }
            $(rbgLiMS).on("click", function () {
                const value = $(this).attr("data-value"),
                    hasActive = $(this).hasClass("pc-db-active");
                if (hasActive) {
                    if (value === "多胎") {
                        $("#PC-db-MN").removeAttr("disabled").attr("lay-verify", "required").attr("name", function () {
                            return $(this).attr("data-name");
                        });
                        $(inputMS).removeAttr("name");
                        $(inputTwins).removeAttr("name lay-verify").val("");
                        $(rbgTwins).addClass("rbgOff");
                        $(rbgLiTwins).removeAttr("class").off("click");
                        $(inputThreeBirths).removeAttr("name lay-verify").val("");
                        $(rbgThreeBirths).addClass("rbgOff");
                        $(rbgLiThreeBirths).removeAttr("class").off("click");
                        $(pcNewBornNumInput).val(function () {
                            return pcNewBornNum + "-1";
                        });
                    } else {
                        $("#PC-db-MN").removeAttr("name lay-verify").attr("disabled", true).val("");
                        $(inputMS).attr("name", function () {
                            return $(this).attr("data-name");
                        });
                        if (value === "1") {
                            $(pcNewBornNumInput).val(function () {
                                return pcNewBornNum;
                            });
                            $(inputTwins).attr("lay-verify", "requiredRadioGroup").attr("name", function () {
                                return $(this).attr("data-name");
                            });
                            $(rbgTwins).removeClass("rbgOff");
                            $(rbgLiTwins).on("click", function () {
                                activeRBGChoice(this);
                            });
                            $(inputTwins).removeAttr("name lay-verify").val("");
                            $(rbgTwins).addClass("rbgOff");
                            $(rbgLiTwins).removeAttr("class").off("click");
                            $(inputThreeBirths).removeAttr("name lay-verify").val("");
                            $(rbgThreeBirths).addClass("rbgOff");
                            $(rbgLiThreeBirths).removeAttr("class").off("click");
                        } else {
                            $(pcNewBornNumInput).val(function () {
                                return pcNewBornNum + "-1";
                            });
                            if (value === "2") {
                                $(inputTwins).attr("lay-verify", "requiredRadioGroup").attr("name", function () {
                                    return $(this).attr("data-name");
                                });
                                $(rbgTwins).removeClass("rbgOff");
                                $(rbgLiTwins).on("click", function () {
                                    activeRBGChoice(this);
                                });
                                $(inputThreeBirths).removeAttr("name lay-verify").val("");
                                $(rbgThreeBirths).addClass("rbgOff");
                                $(rbgLiThreeBirths).removeAttr("class").off("click");
                            } else if (value === "3") {
                                $(inputThreeBirths).attr("lay-verify", "requiredRadioGroup").attr("name", function () {
                                    return $(this).attr("data-name");
                                });
                                $(rbgThreeBirths).removeClass("rbgOff");
                                $(rbgLiThreeBirths).on("click", function () {
                                    activeRBGChoice(this);
                                });
                                $(inputTwins).removeAttr("name lay-verify").val("");
                                $(rbgTwins).addClass("rbgOff");
                                $(rbgLiTwins).removeAttr("class").off("click");
                            } else {
                                $(inputTwins).removeAttr("name lay-verify").val("");
                                $(rbgTwins).addClass("rbgOff");
                                $(rbgLiTwins).removeAttr("class").off("click");
                                $(inputThreeBirths).removeAttr("name lay-verify").val("");
                                $(rbgThreeBirths).addClass("rbgOff");
                                $(rbgLiThreeBirths).removeAttr("class").off("click");
                            }
                        }
                    }
                } else {
                    $("#PC-db-MN").removeAttr("name lay-verify").attr("disabled", true).val("");
                    $(inputTwins).removeAttr("name lay-verify").val("");
                    $(rbgTwins).addClass("rbgOff");
                    $(rbgLiTwins).removeAttr("class").off("click");
                    $(inputThreeBirths).removeAttr("name lay-verify").val("");
                    $(rbgThreeBirths).addClass("rbgOff");
                    $(rbgLiThreeBirths).removeAttr("class").off("click");
                }
            });
            const inputMN = $("#PC-db-MN");
            $(inputMN).on("focusout", function () {
                let inputMNVal = $(this).val();
                if (notNullTool(inputMNVal)) {
                    const inputMNValInt = parseInt(inputMNVal),
                        inputMNValFloat = parseFloat(inputMNVal);
                    if (inputMNValInt === inputMNValFloat) {
                        if (inputMNValInt <= 3) {
                            layer.msg("填写的数值必须 <span class='layui-badge layui-bg-red'>大于</span> 3！", {
                                icon: 5,
                                anim: 6,
                                btn: "好！",
                                resize: false,
                                shade: 0.8
                            }, function () {
                                $(inputMN).val("");
                            });
                        }
                    } else {
                        layer.msg("请输入 <span class='layui-badge layui-bg-red'>整数</span> ！", {
                            icon: 5,
                            anim: 6,
                            btn: "好！",
                            resize: false,
                            shade: 0.8
                        }, function () {
                            $(inputMN).val("");
                        });
                    }
                }
            });

            // 宝宝情况 分娩方式 剖宫产原因
            $("#PC-db-DM .pc-db-radioBtn-group>li").on("click", function () {
                const that = this,
                    value = $(that).attr("data-value");
                isRbgShowInRbg(that, $("#PC-db-CSR"), function () {
                    return value === "剖宫产";
                });
            });

            // 宝宝情况 来源外院 出生医院
            $("#PC-db-childSource .pc-db-radioBtn-group>li").on("click", function () {
                const that = this,
                    value = $(that).attr("data-value");
                isInputShowInRbg(this, "#PC-db-BH", function () {
                    return value === "外院";
                });
            });

            // 基础数据库 宝宝情况 多胞情况 提示
            layer.tips("多胞情况一旦填写后只能增加；若要减少，请直接从病例查询删除！2胎及以上保存信息后自动生成其他新生儿信息。", "#PC-db-MSA", {
                time: 5000,
                tips: [2, "#FF5722"]
            });

            let rDateInput = $("#PC-db-ruptureDate"), bDateInput = $("#PC-db-birthday"),
                nerdDate = null, rDate = null, bDate = null, hDate = null,
                nerdDateStamp = 0, rDateStamp = 0, bDateStamp = 0, hDateStamp = 0;
            if (notNullTool($(rDateInput).val())) {
                rDate = $(rDateInput).val();
                rDateStamp = Date.parse(rDate);
            }
            if (notNullTool($(bDateInput).val())) {
                bDate = $(bDateInput).val();
                bDateStamp = Date.parse(bDate);
            }

            // 基础数据库 宝宝情况 破膜日期
            laydate.render({
                elem: "#PC-db-ruptureDate",
                type: "datetime",
                format: "yyyy-MM-dd HH:mm:ss",
                max: 1,
                done: function (value, date) {
                    if (value !== "") {
                        rDate = date.year + "-" + date.month + "-" + date.date + ' ' + date.hours + ':' + date.minutes + ':' + date.seconds;
                        rDateStamp = Date.parse(rDate);
                        if (bDate !== null) {
                            if (rDateStamp <= bDateStamp) {
                                $("#PC-db-ruptureTime").val(Math.round((bDateStamp - rDateStamp) / 3600000));
                            } else {
                                layer.msg("破膜日期必须<span class='layui-badge'>早于</span>出生日期！", {
                                    icon: 5,
                                    time: 3000,
                                    anim: 6,
                                    btn: "好",
                                    resize: false,
                                    shade: 0.8
                                }, function () {
                                    $("#PC-db-ruptureDate").val("");
                                    rDate = null;
                                    rDateStamp = 0;
                                });
                            }
                        }
                    } else {
                        rDate = null;
                        rDateStamp = 0;
                    }
                }
            });

            // 宝宝情况 出生日期
            laydate.render({
                elem: "#PC-db-birthday",
                type: "datetime",
                format: "yyyy-MM-dd HH:mm:ss",
                max: 1,
                done: function (value, date) {
                    if (value !== "") {
                        bDate = date.year + "-" + date.month + "-" + date.date + ' ' + date.hours + ':' + date.minutes + ':' + date.seconds;
                        bDateStamp = Date.parse(bDate);
                        if (rDate !== null) {
                            if (rDateStamp <= bDateStamp) {
                                $("#PC-db-ruptureTime").val(Math.round((bDateStamp - rDateStamp) / 3600000));
                            } else {
                                layer.msg("出生日期必须<span class='layui-badge'>晚于</span>破膜日期！", {
                                    icon: 5,
                                    time: 3000,
                                    anim: 6,
                                    btn: "好",
                                    resize: false,
                                    shade: 0.8
                                }, function () {
                                    $("#PC-db-birthday").val("");
                                    bDate = null;
                                    bDateStamp = 0;
                                });
                            }
                        }
                    } else {
                        bDate = null;
                        bDateStamp = 0;
                    }
                }
            });

            // 宝宝情况 计算 母亲孕期体重增加
            const gaWeekElem = $("#PC-db-GAW"),
                gaWeekInput = $(gaWeekElem).val();
            if (notNullTool(gaWeekInput)) {
                const gaWeek = parseInt(gaWeekInput),
                    mwgrElem = $("#PC-db-MWGR");
                if (notNullTool($(mwgrElem).attr("data-wgdp"))) {
                    $(mwgrElem).val((parseFloat($(mwgrElem).attr("data-wgdp")) / gaWeek).toFixed(3));
                }
            }
            $(gaWeekElem).on("focusout", function () {
                if (notNullTool($(this).val())) {
                    const gaWeek = parseInt($(this).val()),
                        mwgrElem = $("#PC-db-MWGR");
                    if (notNullTool($(mwgrElem).attr("data-wgdp"))) {
                        $(mwgrElem).val((parseFloat($(mwgrElem).attr("data-wgdp")) / gaWeek).toFixed(3));
                    } else {
                        layer.msg("请先填写<span class='layui-badge layui-bg-blue'>孕期信息</span>页面的<span class='layui-badge layui-bg-blue'>母亲体重信息</span>，才能进行母亲体重增加率计算！", {
                            icon: 5,
                            time: 3000,
                            anim: 6,
                            btn: "好",
                            resize: false,
                            shade: 0.8
                        });
                    }
                }
            });

            // 宝宝情况 胎龄日 不大于6
            $("#PC-db-GAD").on("focusout", function () {
                const gestationalAgeDayInput = $(this).val();
                if (notNullTool(gestationalAgeDayInput)) {
                    const gestationalAgeDay = parseInt(gestationalAgeDayInput);
                    if (gestationalAgeDay < 0 || gestationalAgeDay > 6) {
                        layer.msg("胎龄（日）超出范围！", {
                            icon: 5,
                            time: 3000,
                            anim: 6,
                            btn: "好",
                            resize: false,
                            shade: 0.8
                        }, function () {
                            $("#PC-db-GAD").val("");
                        });
                    }
                }
            });

            // 宝宝情况 是否住院 后面的输入框
            form.on("switch(whetherHospitalized)", function (data) {
                const inputChildSource = $("#PC-db-childSource>input"),
                    rbgChildSource = $("#PC-db-childSource .pc-db-radioBtn-group"),
                    rbgLiChildSource = $("#PC-db-childSource .pc-db-radioBtn-group>li");

                if (data.elem.checked) {
                    $("#PC-db-NERD, #PC-db-CHD, #PC-db-CHN").removeAttr("disabled").attr("lay-verify", "requiredDB").attr("name", function () {
                        return $(this).attr("data-name");
                    });
                    $("#PC-db-CPM>.pc-db-spanItem>input").removeAttr("disabled");
                    $(inputChildSource).attr("lay-verify", "requiredRadioGroup").attr("name", function () {
                        return $(this).attr("data-name");
                    });
                    $(rbgChildSource).removeClass("rbgOff");
                    $(rbgLiChildSource).on("click", function () {
                        const that = this,
                            value = $(that).attr("data-value");
                        activeRBGChoice(that);
                        isInputShowInRbg(this, "#PC-db-BH", function () {
                            return value === "外院";
                        });
                    });
                } else {
                    $("#PC-db-NERD, #PC-db-CHD, #PC-db-CHN").removeAttr("name lay-verify").attr("disabled", true).val("");
                    $("#PC-db-CPM>.pc-db-spanItem>input").attr("disabled", true);
                    $(inputChildSource).removeAttr("name lay-verify").val("");
                    $(rbgChildSource).addClass("rbgOff");
                    $(rbgLiChildSource).removeAttr("class").off("click");
                    $("#PC-db-BH").removeAttr("name lay-verify").attr("disabled", true).val("");
                }
                setTimeout(function () {
                    form.render("checkbox");
                }, 200);
            });

            // 宝宝情况 新生儿入室日期
            laydate.render({
                elem: "#PC-db-NERD",
                type: "datetime",
                format: "yyyy-MM-dd HH:mm:ss",
                max: 1,
                done: function (value, date) {
                    if (value !== "") {
                        nerdDate = date.year + "-" + date.month + "-" + date.date + ' ' + date.hours + ':' + date.minutes + ':' + date.seconds;
                        nerdDateStamp = Date.parse(nerdDate);
                        if (bDate !== null) {
                            if (nerdDateStamp < bDateStamp) {
                                layer.msg("新生儿入室日期必须<span class='layui-badge'>晚于</span>出生日期！", {
                                    icon: 5,
                                    time: 3000,
                                    anim: 6,
                                    btn: "好",
                                    resize: false,
                                    shade: 0.8
                                }, function () {
                                    $("#PC-db-NERD").val("");
                                    nerdDate = null;
                                    nerdDateStamp = 0;
                                });
                            }
                        }
                    } else {
                        nerdDate = null;
                        nerdDateStamp = 0;
                    }
                }
            });

            // 宝宝情况 住院日期
            laydate.render({
                elem: "#PC-db-CHD",
                type: "datetime",
                format: "yyyy-MM-dd HH:mm:ss",
                max: 1,
                done: function (value, date) {
                    if (value !== "") {
                        hDate = date.year + "-" + date.month + "-" + date.date + ' ' + date.hours + ':' + date.minutes + ':' + date.seconds;
                        hDateStamp = Date.parse(hDate);
                        if (bDate !== null) {
                            if (hDateStamp < bDateStamp) {
                                layer.msg("住院日期必须<span class='layui-badge'>晚于</span>出生日期！", {
                                    icon: 5,
                                    time: 3000,
                                    anim: 6,
                                    btn: "好",
                                    resize: false,
                                    shade: 0.8
                                }, function () {
                                    $("#PC-db-CHD").val("");
                                    hDate = null;
                                    hDateStamp = 0;
                                });
                            }
                        }
                    } else {
                        hDate = null;
                        hDateStamp = 0;
                    }
                }
            });

            // 基础数据库 宝宝情况 添加/编辑 信息 提交
            form.on("submit(BS)", function (data) {
                const doing = "保存信息",
                    field = data.field;
                loading(doing);
                for (let i in field) {
                    if (!notNullTool(field[i])) {
                        delete field[i];
                    }
                }
                $.post("/perinatalPlatform/basicDatabase/write/BS/post", field, function (back, status) {
                    if (status === "success") {
                        if (back.code) {
                            successNext();
                        } else {failMsg(doing)}
                    } else {errorMsg1()}
                }, "json").fail(function () {errorMsg2()});
            });
        }


        const bdRsElem = $(".pc-db-BDRS"),
            bdDsElem = $(".pc-db-BDDS");
        if ($(bdRsElem).length > 0 || $(bdDsElem).length > 0) {
            // 新增 死亡原因
            let dcIndex = 1;
            $("#PC-db-addDeathCause").on("click", function () {
                const that = this;
                sequentialExecution(function () {
                    $(that).parents("tr").before(
                        "<tr>" +
                        "   <td class='pc-db-table-leftTitle pc-db-table-select'>" +
                        "       <select name='deathCauseClassification" + dcIndex + "' lay-filter='DCC' lay-search lay-reqText='请选择死因分类！' lay-verify='required'>" +
                        "           <option value=''>请选择死因分类</option>" +
                        "           <option value='1'>先天疾病</option>" +
                        "           <option value='2'>胎儿生长相关疾病</option>" +
                        "           <option value='3'>分娩损伤</option>" +
                        "           <option value='4'>围产窒息</option>" +
                        "           <option value='5'>神经系统疾病</option>" +
                        "           <option value='6'>重症感染</option>" +
                        "           <option value='7'>呼吸和心血管疾病</option>" +
                        "           <option value='8'>其他疾病</option>" +
                        "           <option value='9'>ELBW/EPI</option>" +
                        "           <option value='10'>罕见疾病</option>" +
                        "           <option value='11'>未明确疾病</option>" +
                        "       </select>" +
                        "   </td>" +
                        "   <td class='pc-db-table-select'>" +
                        "       <select id='PC-db-DCD" + dcIndex + "' name='deathCauseDiagnosis" + dcIndex + "' lay-search lay-reqText='请选择死因诊断！' lay-verify='required'>" +
                        "           <option value=''>请选择死因诊断</option>" +
                        "   </td>" +
                        "   <td>" +
                        "       <button onclick='deleteTr(this, \"死因\");' class='pc-btn pc-btn-danger'><i class='iconfont icon-delete'></i></button>" +
                        "   </td>" +
                        "</tr>");
                }, function () {
                    form.render("select");
                    deathCauseDiagnosisSelectUpdate(form);
                });
                dcIndex++;
            });

            // 死因 初始填充
            const dcTrLengthInput = $("#PC-db-DCT tbody").attr("data-length");
            if (notNullTool(dcTrLengthInput)) {
                const dcTrLength = parseInt(dcTrLengthInput);
                dcIndex = dcTrLength + 1;
                for (let i=1; i <= dcTrLength; i++) {
                    const deathCauseClassificationId = $("#PC-db-DCT tbody .pc-db-table-select>select[name=deathCauseClassification" + i + "]").attr("data-value"),
                        deathCauseDiagnosisElem = $("#PC-db-DCT tbody .pc-db-table-select>select[name=deathCauseDiagnosis" + i + "]"),
                        deathCauseDiagnosisId = $(deathCauseDiagnosisElem).attr("data-value");
                    if (notNullTool(deathCauseClassificationId) && notNullTool(deathCauseDiagnosisId)) {
                        $.get("/perinatalPlatform/basicDatabase/getDeathCauseDiagnosis?deathCauseClassificationId=" + deathCauseClassificationId, function (back, status) {
                            if (status === "success") {
                                if (back.code) {
                                    $(deathCauseDiagnosisElem).children("option[value!='']").remove();
                                    $.each(back.deathCauseDiagnosis, function (index, thisDeathCauseDiagnosise) {
                                        if (thisDeathCauseDiagnosise.id === parseInt(deathCauseDiagnosisId)) {
                                            $(deathCauseDiagnosisElem).append("<option value='" + thisDeathCauseDiagnosise.id + "' selected>" + thisDeathCauseDiagnosise.deathCauseDiagnosis + "</option>");
                                        } else {
                                            $(deathCauseDiagnosisElem).append("<option value='" + thisDeathCauseDiagnosise.id + "'>" + thisDeathCauseDiagnosise.deathCauseDiagnosis + "</option>");
                                        }
                                    });
                                    form.render("select");
                                }
                            }
                        }, "json");
                    }
                }
            }
            deathCauseDiagnosisSelectUpdate(form);


            // 围产新生儿科研合作平台 基础数据库 复苏情况
            if ($(bdRsElem).length > 0) {
                // 多选框 高度
                $(".pc-db-item").height(function () {
                    let height = null;
                    const checkboxItemElem = $(this).find(".pc-db-item-checkbox");

                    if (windowWidth > 768) {
                        if (checkboxItemElem.length > 0 && $(checkboxItemElem).height() > 30) {
                            height = $(checkboxItemElem).height();
                        }
                    } else {
                        // 复苏情况 Apgar评分 高度
                        $(".pc-db-BDRS .pc-db-item.apgars").height(function () {
                            return $(this).children(".pc-db-spanItem").height();
                        });
                    }
                    return height;
                });

                // 复苏初始气体 为氧气
                $("#PC-db-RIG>.pc-db-radioBtn-group>li").on("click", function () {
                    const value = $(this).attr("data-value"),
                        hasActive = $(this).hasClass("pc-db-active");

                    if (hasActive) {
                        if (value === "氧气") {
                            $("#PC-db-IOC, #PC-db-RMOC").removeAttr("disabled").attr("lay-verify", "requiredBD").attr("name", function () {
                                return $(this).attr("data-name");
                            });
                        } else {
                            $("#PC-db-IOC, #PC-db-RMOC").removeAttr("name lay-verify").attr("disabled", true).val("");
                        }
                    } else {
                        $("#PC-db-IOC, #PC-db-RMOC").removeAttr("name lay-verify").attr("disabled", true).val("");
                    }
                });

                // 复苏情况 脐带延迟结扎 时长输入框
                $("#PC-db-DUCL>.pc-db-radioBtn-group>li").on("click", function () {
                    const thisValue = $(this).attr("data-value"),
                        hasActive = $(this).hasClass("pc-db-active");
                    if (hasActive) {
                        if (thisValue === "有") {
                            $("#PC-db-DUCLT").removeAttr("disabled").attr("lay-verify", "required").attr("name", function () {
                                return $(this).attr("data-name");
                            });
                        } else {
                            $("#PC-db-DUCLT").removeAttr("name lay-verify").attr("disabled", true).val("");
                        }
                    } else {
                        $("#PC-db-DUCLT").removeAttr("name lay-verify").attr("disabled", true).val("");
                    }
                });

                // 是否有复苏措施 后面的显示
                let apgar1m = 5, apgar5m = 5, apgar10m = 5;
                const apgar1mInput = $("#PC-db-APGARAS1M"), apgar5mInput = $("#PC-db-APGARAS5M"), apgar10mInput = $("#PC-db-APGARAS10M");
                $("#PC-db-RM>.pc-db-radioBtn-group>li").on("click", function () {
                    const value = $(this).attr("data-value"),
                        hasActive = $(this).hasClass("pc-db-active");

                    if (hasActive) {
                        if (value === "有") {
                            sequentialExecution(function () {
                                // 单选输入 按钮组
                                $(".pc-db-BDRSC .pc-db-item>.pc-db-radioBtn-group").removeClass("rbgOff");
                                $(".pc-db-BDRSC .pc-db-item>.pc-db-radioBtn-group>li").on("click", function () {
                                    activeRBGChoice(this);
                                });
                                // 为输入 赋name
                                $(".pc-db-BDRSC .pc-db-item[id!=PC-db-ARR]>input[type=hidden], .pc-db-BDRSC .pc-db-item>input[type=checkbox], .pc-db-BDRSC .pc-db-item>input[type=number][id!=PC-db-IOC][id!=PC-db-RMOC], .pc-db-BDRSC .pc-db-spanItem>input[type=number], #PC-db-SRT").attr("name", function () {
                                    return $(this).attr("data-name");
                                });
                                // 为输入 去disabled
                                $(".pc-db-BDRSC .pc-db-item>input[type=checkbox], .pc-db-BDRSC .pc-db-item>.pc-db-spanItem>input[type=checkbox], .pc-db-BDRSC .pc-db-item>input[type=number][id!=PC-db-IOC][id!=PC-db-RMOC], .pc-db-BDRSC .pc-db-spanItem>input[type=number], #PC-db-SRT").removeAttr("disabled");
                                // 为输入 赋required
                                $(".pc-db-BDRSC .pc-db-item>input[type=number], .pc-db-BDRSC .pc-db-spanItem>input[type=number][id!=PC-db-IOC][id!=PC-db-RMOC], #PC-db-SRT").attr("lay-verify", "requiredDB");
                                // 复苏情况 面罩正压通气 方法
                                switchCheckbox(form, "PMV");
                                // 复苏情况 持续气道正压 方法
                                form.on("switch(CPAP)", function (data) {
                                    const rbgInputCPAPM = $("#PC-db-CPAPM>input"),
                                        rbgCPAPM = $("#PC-db-CPAPM>.pc-db-radioBtn-group"),
                                        rbgLiCPAPM = $("#PC-db-CPAPM>.pc-db-radioBtn-group>li");

                                    if (data.elem.checked) {
                                        $(rbgInputCPAPM).attr("lay-verify", "requiredRadioGroup").attr("name", function () {
                                            return $(this).attr("data-name");
                                        });
                                        $(rbgCPAPM).removeClass("rbgOff");
                                        $(rbgLiCPAPM).on("click", function () {
                                            activeRBGChoice(this);
                                        });
                                    } else {
                                        $(rbgInputCPAPM).removeAttr("name lay-verify").val("");
                                        $(rbgCPAPM).addClass("rbgOff");
                                        $(rbgLiCPAPM).removeAttr("class").off("click");
                                    }
                                });
                                // 复苏初始气体 为氧气
                                $("#PC-db-RIG>.pc-db-radioBtn-group>li").on("click", function () {
                                    const value = $(this).attr("data-value"),
                                        hasActive = $(this).hasClass("pc-db-active");

                                    if (hasActive) {
                                        if (value === "氧气") {
                                            $("#PC-db-IOC, #PC-db-RMOC").removeAttr("disabled").attr("lay-verify", "requiredBD").attr("name", function () {
                                                return $(this).attr("data-name");
                                            });
                                        } else {
                                            $("#PC-db-IOC, #PC-db-RMOC").removeAttr("name lay-verify").attr("disabled", true).val("");
                                        }
                                    } else {
                                        $("#PC-db-IOC, #PC-db-RMOC").removeAttr("name lay-verify").attr("disabled", true).val("");
                                    }
                                });
                            }, function () {
                                // apgar 辅助分数初值
                                $(apgar1mInput).val(apgar1m);
                                $(apgar5mInput).val(apgar5m);
                                $(apgar10mInput).val(apgar10m);
                            }, function () {
                                form.render("checkbox");
                            });
                        } else {
                            sequentialExecution(function () {
                                $(".pc-db-BDRSC .pc-db-item>input[type=hidden]").removeAttr("name").val("");
                                $(".pc-db-BDRSC .pc-db-item>.pc-db-radioBtn-group").addClass("rbgOff");
                                $(".pc-db-BDRSC .pc-db-item>.pc-db-radioBtn-group>li").removeAttr("class").off("click");
                                $("#PC-db-DUCLT, #PC-db-SRT").removeAttr("name lay-verify").attr("disabled", true).val("");
                                $(".pc-db-BDRSC .pc-db-item>input[type=checkbox], .pc-db-BDRSC .pc-db-item>input[type=number], .pc-db-BDRSC .pc-db-spanItem>input[type=number]").removeAttr("name").attr("disabled", true);
                                $(".pc-db-BDRSC .pc-db-item>input[type=number], .pc-db-BDRSC .pc-db-spanItem>input[type=number]").removeAttr("lay-verify").val("");
                                $(".pc-db-BDRSC .pc-db-item>input[type=checkbox], .pc-db-BDRSC .pc-db-item>.pc-db-spanItem>input[type=checkbox], #PC-db-ARR>.pc-db-item-checkbox>input").attr("disabled", true);
                                form.val("RS", {
                                    abandonRecoveryReasonUltraImmature: false,
                                    piFetalBloodTransfusionCongenitalMalformations: false,
                                    piFetalBloodTransfusionEconomicReasons: false,
                                    piFetalBloodTransfusionWorryPrognosis: false,
                                    piFetalBloodTransfusionOther: false,
                                    administrationModeUmbilicalVein: false,
                                    administrationModeUmbilicalArtery: false,
                                    administrationModePeripheralVein: false,
                                    administrationModeTrachealTube: false
                                });
                            }, function () {
                                form.render("checkbox");
                            });
                        }
                    } else {
                        sequentialExecution(function () {
                            $(".pc-db-BDRSC .pc-db-item>input[type=hidden]").removeAttr("name").val("");
                            $(".pc-db-BDRSC .pc-db-item>.pc-db-radioBtn-group").addClass("rbgOff");
                            $(".pc-db-BDRSC .pc-db-item>.pc-db-radioBtn-group>li").removeAttr("class").off("click");
                            $("#PC-db-DUCLT, #PC-db-SRT").removeAttr("name lay-verify").attr("disabled", true).val("");
                            $(".pc-db-BDRSC .pc-db-item>input[type=checkbox], .pc-db-BDRSC .pc-db-item>input[type=number], .pc-db-BDRSC .pc-db-spanItem>input[type=number]").removeAttr("name").attr("disabled", true);
                            $(".pc-db-BDRSC .pc-db-item>input[type=number], .pc-db-BDRSC .pc-db-spanItem>input[type=number]").removeAttr("lay-verify").val("");
                            $(".pc-db-BDRSC .pc-db-item>input[type=checkbox], .pc-db-BDRSC .pc-db-item>.pc-db-spanItem>input[type=checkbox], #PC-db-ARR>.pc-db-item-checkbox>input").attr("disabled", true);
                            form.val("RS", {
                                abandonRecoveryReasonUltraImmature: false,
                                piFetalBloodTransfusionCongenitalMalformations: false,
                                piFetalBloodTransfusionEconomicReasons: false,
                                piFetalBloodTransfusionWorryPrognosis: false,
                                piFetalBloodTransfusionOther: false,
                                administrationModeUmbilicalVein: false,
                                administrationModeUmbilicalArtery: false,
                                administrationModePeripheralVein: false,
                                administrationModeTrachealTube: false
                            });
                        }, function () {
                            form.render("checkbox");
                        });
                    }
                });
                // 复苏情况 复苏结局 放弃复苏原因
                $("#PC-db-recoveryEnd>.pc-db-radioBtn-group>li").on("click", function () {
                    const valueRE = $(this).attr("data-value"),
                        hasActiveRE = $(this).hasClass("pc-db-active");

                    if (hasActiveRE) {
                        if (valueRE === "家属放弃复苏") {
                            $("#PC-db-ARR>.pc-db-item-checkbox>input").removeAttr("disabled");
                        } else {
                            form.val("RS", {
                                abandonRecoveryReasonUltraImmature: false,
                                abandonRecoveryReasonCongenitalMalformations: false,
                                abandonRecoveryReasonEconomicReasons: false,
                                abandonRecoveryReasonWorryPrognosis: false,
                                abandonRecoveryReasonOther: false
                            });
                            $("#PC-db-ARR>.pc-db-item-checkbox>input").attr("disabled", true);
                        }
                    } else {
                        form.val("RS", {
                            abandonRecoveryReasonUltraImmature: false,
                            abandonRecoveryReasonCongenitalMalformations: false,
                            abandonRecoveryReasonEconomicReasons: false,
                            abandonRecoveryReasonWorryPrognosis: false,
                            abandonRecoveryReasonOther: false
                        });
                        $("#PC-db-ARR>.pc-db-item-checkbox>input").attr("disabled", true);
                    }
                    form.render("checkbox");
                });

                if ($("#PC-db-RM>input").val() === "有") {
                    // 复苏情况 面罩正压通气 方法
                    switchCheckbox(form, "PMV");

                    // 复苏情况 持续气道正压 方法
                    form.on("switch(CPAP)", function (data) {
                        const rbgInputCPAPM = $("#PC-db-CPAPM>input"),
                            rbgCPAPM = $("#PC-db-CPAPM>.pc-db-radioBtn-group"),
                            rbgLiCPAPM = $("#PC-db-CPAPM>.pc-db-radioBtn-group>li");

                        if (data.elem.checked) {
                            $(rbgInputCPAPM).attr("lay-verify", "requiredRadioGroup").attr("name", function () {
                                return $(this).attr("data-name");
                            });
                            $(rbgCPAPM).removeClass("rbgOff");
                            $(rbgLiCPAPM).on("click", function () {
                                activeRBGChoice(this);
                            });
                        } else {
                            $(rbgInputCPAPM).removeAttr("name lay-verify").val("");
                            $(rbgCPAPM).addClass("rbgOff");
                            $(rbgLiCPAPM).removeAttr("class").off("click");
                        }
                    });
                }

                // 复苏情况 计算apgar分数
                let apgar1MPpvOrCppv = 0, apgar5MPpvOrCppv = 0, apgar10MPpvOrCppv = 0;
                form.on("switch(APGARAS1M)", function (data) {
                    const name = $(data.elem).attr("name");
                    if (data.elem.checked) {
                        if (name === "apgarAuxiliaryScoring1MinPositivePressureVentilation" || name === "apgarAuxiliaryScoring1MinContinuousPositivePressureVentilation") {
                            apgar1MPpvOrCppv ++;
                            if (apgar1MPpvOrCppv === 1) {
                                apgar1m --;
                                $(apgar1mInput).val(apgar1m);
                            }
                        } else {
                            apgar1m --;
                            $(apgar1mInput).val(apgar1m);
                        }
                    } else {
                        if (name === "apgarAuxiliaryScoring1MinPositivePressureVentilation" || name === "apgarAuxiliaryScoring1MinContinuousPositivePressureVentilation") {
                            apgar1MPpvOrCppv --;
                            if (apgar1MPpvOrCppv === 0) {
                                apgar1m ++;
                                $(apgar1mInput).val(apgar1m);
                            }
                        } else {
                            apgar1m ++;
                            $(apgar1mInput).val(apgar1m);
                        }
                    }
                });
                form.on("switch(APGARAS5M)", function (data) {
                    const name = $(data.elem).attr("name");
                    if (data.elem.checked) {
                        if (name === "apgarAuxiliaryScoring5MinPositivePressureVentilation" || name === "apgarAuxiliaryScoring5MinContinuousPositivePressureVentilation") {
                            apgar5MPpvOrCppv ++;
                            if (apgar5MPpvOrCppv === 1) {
                                apgar5m --;
                                $(apgar5mInput).val(apgar5m);
                            }
                        } else {
                            apgar5m --;
                            $(apgar1mInput).val(apgar5m);
                        }
                    } else {
                        if (name === "apgarAuxiliaryScoring5MinPositivePressureVentilation" || name === "apgarAuxiliaryScoring5MinContinuousPositivePressureVentilation") {
                            apgar5MPpvOrCppv --;
                            if (apgar5MPpvOrCppv === 0) {
                                apgar5m ++;
                                $(apgar5mInput).val(apgar5m);
                            }
                        } else {
                            apgar5m ++;
                            $(apgar5mInput).val(apgar5m);
                        }
                    }
                });
                form.on("switch(APGARAS10M)", function (data) {
                    const name = $(data.elem).attr("name");
                    if (data.elem.checked) {
                        if (name === "apgarAuxiliaryScoring10MinPositivePressureVentilation" || name === "apgarAuxiliaryScoring10MinContinuousPositivePressureVentilation") {
                            apgar10MPpvOrCppv ++;
                            if (apgar10MPpvOrCppv === 1) {
                                apgar10m --;
                                $(apgar10mInput).val(apgar10m);
                            }
                        } else {
                            apgar10m --;
                            $(apgar10mInput).val(apgar10m);
                        }
                    } else {
                        if (name === "apgarAuxiliaryScoring10MinPositivePressureVentilation" || name === "apgarAuxiliaryScoring10MinContinuousPositivePressureVentilation") {
                            apgar10MPpvOrCppv --;
                            if (apgar10MPpvOrCppv === 0) {
                                apgar10m ++;
                                $(apgar10mInput).val(apgar10m);
                            }
                        } else {
                            apgar10m ++;
                            $(apgar10mInput).val(apgar10m);
                        }
                    }
                });

                // 复苏情况 脐动脉血血气
                form.on("switch(UABG)", function (data) {
                    if (data.elem.checked) {
                        $("#PC-db-UABGPH, #PC-db-UABGBOS, #PC-db-UABGLA, #PC-db-UABGPAO2, #PC-db-UABGPACO2, #PC-db-UABGBE, #PC-db-UABGHCO3, #PC-db-UABGHGB").removeAttr("disabled").attr("lay-verify", "requiredBD").attr("name", function () {
                            return $(this).attr("data-name");
                        });
                    } else {
                        $("#PC-db-UABGPH, #PC-db-UABGBOS, #PC-db-UABGLA, #PC-db-UABGPAO2, #PC-db-UABGPACO2, #PC-db-UABGBE, #PC-db-UABGHCO3, #PC-db-UABGHGB").removeAttr("name lay-verify").attr("disabled", true).val("");
                    }
                });

                // 复苏情况 出生后转归 死亡时间 输入框、死亡原因 表格
                $("#PC-db-FAB>.pc-db-radioBtn-group>li").on("click", function () {
                    const value = $(this).attr("data-value"),
                        hasActive = $(this).hasClass("pc-db-active");
                    if (hasActive) {
                        if (value === "死亡") {
                            $("#PC-db-deathTime").removeAttr("disabled").attr("lay-verify", "requiredDB").attr("name", function () {
                                return $(this).attr("data-name");
                            });
                            $(".pc-db-BDRS #PC-db-DCT>.pc-db-table").removeClass("pc-db-table-off");
                            $(".pc-db-BDRS #PC-db-DCT>.pc-db-table>tbody>tr button").removeAttr("disabled");
                        } else {
                            $("#PC-db-deathTime").removeAttr("name lay-verify").attr("disabled", true).val("");
                            $(".pc-db-BDRS #PC-db-DCT>.pc-db-table").addClass("pc-db-table-off");
                            $(".pc-db-BDRS #PC-db-DCT>.pc-db-table>tbody>tr button").attr("disabled", true);
                            $("#PC-db-addDeathCause").parents("tr").siblings().remove();
                        }
                    } else {
                        $("#PC-db-deathTime").removeAttr("name lay-verify").attr("disabled", true).val("");
                        $(".pc-db-BDRS #PC-db-DCT>.pc-db-table").addClass("pc-db-table-off");
                        $(".pc-db-BDRS #PC-db-DCT>.pc-db-table>tbody>tr button").attr("disabled", true);
                        $("#PC-db-addDeathCause").parents("tr").siblings().remove();
                    }
                });

                // 复苏情况 死亡时间
                const birthdayInput = $(bdRsElem).attr("data-birthday");
                let deathTimeMin = '1970-1-1';
                if (notNullTool(birthdayInput)) {
                    deathTimeMin = birthdayInput;
                }
                laydate.render({
                    elem: "#PC-db-deathTime",
                    type: "datetime",
                    format: "yyyy-MM-dd HH:mm:ss",
                    min: deathTimeMin,
                    max: 1
                });

                // 复苏情况 先天畸形 表格
                form.on("switch(CMF)", function (data) {
                    if (data.elem.checked) {
                        $(".pc-db-BDRS #PC-db-deformityTable>.pc-db-table").removeClass("pc-db-table-off");
                        $(".pc-db-BDRS #PC-db-deformityTable>.pc-db-table>tbody>tr button").removeAttr("disabled");
                    } else {
                        $(".pc-db-BDRS #PC-db-deformityTable>.pc-db-table").addClass("pc-db-table-off");
                        $(".pc-db-BDRS #PC-db-deformityTable>.pc-db-table>tbody>tr button").attr("disabled", true);
                        $("#PC-db-addDeformity").parents("tr").siblings().remove();
                    }
                });

                // 新增 畸形
                let deformityIndex = 1;
                $("#PC-db-addDeformity").on("click", function () {
                    const that = this;
                    sequentialExecution(function () {
                        $(that).parents("tr").before(
                            "<tr>" +
                            "   <td class='pc-db-table-leftTitle pc-db-table-select'>" +
                            "       <select name='deformitySystem" + deformityIndex + "' lay-filter='DS' lay-reqText='请选择畸形系统！' lay-verify='required'>" +
                            "           <option value=''>请选择畸形系统</option>" +
                            "           <option value='1'>心腔及循环</option>" +
                            "           <option value='2'>神经系统</option>" +
                            "           <option value='3'>消化系统</option>" +
                            "           <option value='4'>呼吸系统</option>" +
                            "           <option value='5'>生殖系统</option>" +
                            "           <option value='6'>泌尿系统</option>" +
                            "           <option value='7'>肌肉骨骼系统</option>" +
                            "           <option value='8'>染色体异常</option>" +
                            "           <option value='9'>眼睛</option>" +
                            "           <option value='10'>耳朵</option>" +
                            "           <option value='11'>脸部及颈部</option>" +
                            "           <option value='12'>其他先天畸形</option>" +
                            "       </select>" +
                            "   </td>" +
                            "   <td class='pc-db-table-select'>" +
                            "       <select id='PC-db-DT" + deformityIndex + "' name='deformityType" + deformityIndex + "' lay-reqText='请选择畸形类型！' lay-verify='required'>" +
                            "           <option value=''>请选择畸形类型</option>" +
                            "   </td>" +
                            "   <td>" +
                            "       <button onclick='deleteTr(this, \"畸形\");' class='pc-btn pc-btn-danger'><i class='iconfont icon-delete'></i></button>" +
                            "   </td>" +
                            "</tr>");
                    }, function () {
                        form.render("select");
                        deformityTypeSelectUpdate(form);
                    });
                    deformityIndex++;
                });

                // 畸形类型 初始填充
                const dTrLengthInput = $("#PC-db-deformityTable tbody").attr("data-length");
                if (notNullTool(dTrLengthInput)) {
                    const dTrLength = parseInt(dTrLengthInput);
                    deformityIndex = dTrLength + 1;
                    for (let i=1; i <= dTrLength; i++) {
                        const deformitySystemId = $("#PC-db-deformityTable tbody .pc-db-table-select>select[name=deformitySystem" + i + "]").attr("data-value");
                        const deformityTypeElem = $("#PC-db-deformityTable tbody .pc-db-table-select>select[name=deformityType" + i + "]");
                        const deformityTypeId = $(deformityTypeElem).attr("data-value");
                        if (notNullTool(deformitySystemId) && notNullTool(deformityTypeId)) {
                            $.get("/perinatalPlatform/basicDatabase/getDeformityType?deformitySystemId=" + deformitySystemId, function (back, status) {
                                if (status === "success") {
                                    if (back.code) {
                                        $(deformityTypeElem).children("option[value!='']").remove();
                                        $.each(back.deformityType, function (index, thisDeformityType) {
                                            if (thisDeformityType.id === parseInt(deformityTypeId)) {
                                                $(deformityTypeElem).append("<option value='" + thisDeformityType.id + "' selected>" + thisDeformityType.deformitySystem + "</option>");
                                            } else {
                                                $(deformityTypeElem).append("<option value='" + thisDeformityType.id + "'>" + thisDeformityType.deformitySystem + "</option>");
                                            }
                                        });
                                        form.render("select");
                                    }
                                }
                            }, "json");
                        }
                    }
                }
                deformityTypeSelectUpdate(form);

                // 基础数据库 复苏情况 添加/编辑 信息 提交
                form.on("submit(RS)", function (data) {
                    const doing = "保存信息";
                    loading(doing);
                    let field = data.field, deathCauseArray = [], deformityArray = [];
                    for (let i = 1; i <= dcIndex; i++) {
                        if (notNullTool(field["deathCauseClassification" + i]) && notNullTool(field["deathCauseDiagnosis" + i])) {
                            deathCauseArray.push({
                                deathCauseClassification: field["deathCauseClassification" + i],
                                deathCauseDiagnosis: field["deathCauseDiagnosis" + i],
                            });
                            delete field["deathCauseClassification" + i];
                            delete field["deathCauseDiagnosis" + i];
                        }
                    }
                    field.deathCauseArray = JSON.stringify(deathCauseArray);
                    for (let i = 1; i <= deformityIndex; i++) {
                        if (notNullTool(field["deformitySystem" + i]) && notNullTool(field["deformityType" + i])) {
                            deformityArray.push({
                                deformitySystem: field["deformitySystem" + i],
                                deformityType: field["deformityType" + i],
                            });
                            delete field["deformitySystem" + i];
                            delete field["deformityType" + i];
                        }
                    }
                    field.deformityArray = JSON.stringify(deformityArray);
                    for (let i in field) {
                        if (!notNullTool(field[i])) {
                            delete field[i];
                        }
                    }
                    $.post("/perinatalPlatform/basicDatabase/write/RS/post", field, function (back, status) {
                        if(status === "success") {
                            if(back.code) {
                                successNext();
                            }else {failMsg(doing)}
                        }else {errorMsg1()}
                    },"json").fail(function () {errorMsg2()});
                });
            }


            // 围产新生儿科研合作平台 基础数据库 出院情况
            if ($(bdDsElem).length > 0) {
                // 出院情况 Z评分
                const boyWeightMean = [496, 571, 651, 742, 841, 953, 1079, 1223, 1389, 1579, 1791, 2019, 2255, 2493, 2726, 2948, 3158, 3362, 3570, 3787, 4105, 4252, 4492, 4732, 4970, 5196, 5419, 5630, 5836],
                    boyWeightDS = [64.8, 84.4, 105.8, 130.0, 156.6, 185.0, 216.7, 249.0, 280.4, 316.0, 350.0, 379.0, 407.0, 424.0, 439.0, 450.0, 458.0, 468.0, 482.0, 501.0, 529.0, 556.0, 590.0, 624.0, 647.0, 670.0, 689.0, 712.0, 735.0],
                    boyLengthMean = [28.13, 29.53, 30.93, 32.32, 33.71, 35.08, 36.45,37.83, 39.21, 40.61, 42.01, 43.39, 44.73, 46.00, 47.18, 48.27, 49.28,50.25, 51.16, 52.06, 52.95, 53.82, 54.68, 55.52, 56.32, 57.11, 57.88, 58.63, 59.37],
                    boyLengthSD = [1.7, 1.8, 2.0, 2.1, 2.2, 2.3, 2.4, 2.5, 2.5, 2.5, 2.5, 2.5, 2.5, 2.5, 2.4, 2.4, 2.4, 2.3, 2.2, 2.2, 2.2, 2.1, 2.1, 2.1, 2.1, 2.1, 2.0, 2.0, 2.0],
                    boyHeadCircumferenceMean = [19.79, 20.77, 21.75, 22.73, 23.71, 24.67, 25.63, 26.59, 27.53, 28.47, 29.39, 30.28, 31.13, 31.93, 32.66, 33.33, 33.95, 34.51, 35.05, 35.55, 36.04, 36.51, 36.97, 37.41, 37.84, 38.27, 38.68, 39.09, 39.50],
                    boyHeadCircumferenceSD = [1.2, 1.2, 1.3, 1.3, 1.3, 1.4, 1.4, 1.4, 1.4, 1.5, 1.5, 1.5, 1.5, 1.5, 1.5, 1.5, 1.5, 1.4, 1.4, 1.4, 1.4, 1.4, 1.3, 1.3, 1.3, 1.3, 1.3, 1.2, 1.2],
                    girlWeightMean = [482, 537, 606, 694, 792, 899, 1018, 1152, 1306, 1482, 1681, 1897, 2126, 2364, 2602, 2835, 3050, 3240, 3416, 3598, 3790, 3990, 4193, 4400, 4603, 4800, 4995, 5183, 5363],
                    girlWeightSD = [70.4, 83.4, 101.7, 126.6, 155.8, 186.8, 220.6, 258.0, 296.0, 333.7, 368.0, 396.7, 420.0, 442.0, 462.0, 525.8, 500.0, 514.0, 530.0, 548.0, 566.0, 590.0, 607.4, 632.0, 656.0, 677.7, 695.0, 713.0, 727.0],
                    girlLengthMean = [27.59, 28.93, 30.27, 31.61, 32.96, 34.32, 35.69, 37.06, 38.45, 39.86, 41.27, 42.66, 44.00, 45.28, 46.47, 47.58, 48.59, 49.55, 50.44, 51.30, 52.12, 52.92, 53.68, 54.43, 55.15, 55.86, 56.56, 57.24, 57.92],
                    girlLengthSD = [1.6, 1.7, 1.9, 2.0, 2.1, 2.3, 2.4, 2.5, 2.6, 2.6, 2.6, 2.6, 2.6, 2.6, 2.6, 2.5, 2.4, 2.3, 2.3, 2.2, 2.2, 2.1, 2.1, 2.1, 2.0, 2.0, 2.0, 2.0, 2.0],
                    girlHeadCircumferenceMean = [19.49, 20.42, 21.34, 22.27, 23.20, 24.14, 25.07, 26.01, 26.95, 27.90, 28.84, 29.76, 30.65, 31.48, 32.25, 32.95, 33.58, 34.16, 34.70, 35.20, 35.66, 36.10, 36.51, 36.91, 37.28, 37.64, 37.98, 38.32, 38.66],
                    girlHeadCircumferenceSD = [1.1, 1.2, 1.2, 1.2, 1.3, 1.3, 1.4, 1.4, 1.4, 1.5, 1.5, 1.5, 1.5, 1.5, 1.5, 1.4, 1.4, 1.4, 1.4, 1.3, 1.3, 1.3, 1.3, 1.3, 1.3, 1.3, 1.2, 1.2, 1.2];

                // 合计奶量计算
                const fafmElem = $("#PC-db-FAFM"), fambmElem = $("#PC-db-FAMBM"), fadbmElem = $("#PC-db-FADBM");
                let feedingAmountFormulaMilk, feedingAmountMotherBreastMilk, feedingAmountDonatedBreastMilk;
                const feedingAmountFormulaMilkInput = $(fafmElem).val();
                if (notNullTool(feedingAmountFormulaMilkInput)) {
                    feedingAmountFormulaMilk = parseFloat(feedingAmountFormulaMilkInput);
                }
                const feedingAmountMotherBreastMilkInput = $(fambmElem).val();
                if (notNullTool(feedingAmountMotherBreastMilkInput)) {
                    feedingAmountMotherBreastMilk = parseFloat(feedingAmountMotherBreastMilkInput);
                }
                const feedingAmountDonatedBreastMilkInput = $(fadbmElem).val();
                if (notNullTool(feedingAmountDonatedBreastMilkInput)) {
                    feedingAmountDonatedBreastMilk = parseFloat(feedingAmountDonatedBreastMilkInput);
                }
                $(fafmElem).on("focusout", function () {
                    const feedingAmountFormulaMilkInput = $(this).val();
                    if (notNullTool(feedingAmountFormulaMilkInput)) {
                        feedingAmountFormulaMilk = parseFloat(feedingAmountFormulaMilkInput);
                        if (notNullTool(feedingAmountMotherBreastMilk) && notNullTool(feedingAmountDonatedBreastMilk)) {
                            $("#PC-db-TM").val(feedingAmountFormulaMilk + feedingAmountMotherBreastMilk + feedingAmountDonatedBreastMilk);
                        }
                    }
                });
                $(fambmElem).on("focusout", function () {
                    const feedingAmountMotherBreastMilkInput = $(this).val();
                    if (notNullTool(feedingAmountMotherBreastMilkInput)) {
                        feedingAmountMotherBreastMilk = parseFloat(feedingAmountMotherBreastMilkInput);
                        if (notNullTool(feedingAmountFormulaMilk) && notNullTool(feedingAmountDonatedBreastMilk)) {
                            $("#PC-db-TM").val(feedingAmountFormulaMilk + feedingAmountMotherBreastMilk + feedingAmountDonatedBreastMilk);
                        }
                    }
                });
                $(fadbmElem).on("focusout", function () {
                    const feedingAmountDonatedBreastMilkInput = $(this).val();
                    if (notNullTool(feedingAmountDonatedBreastMilkInput)) {
                        feedingAmountDonatedBreastMilk = parseFloat(feedingAmountDonatedBreastMilkInput);
                        if (notNullTool(feedingAmountFormulaMilk) && notNullTool(feedingAmountMotherBreastMilk)) {
                            $("#PC-db-TM").val(feedingAmountFormulaMilk + feedingAmountMotherBreastMilk + feedingAmountDonatedBreastMilk);
                        }
                    }
                });

                // 新生儿预后 连线选择 hover
                const wrapElem = $(".pc-db-BDDS .pc-db-connect .wrap");
                $(wrapElem).hover(function () {
                    const that = this,
                        thisLi = $(that).parent("li");
                    $(thisLi).addClass("hover");
                    connectAdd(thisLi, "hover");
                }, function () {
                    const that = this,
                        thisLi = $(that).parent("li");
                    $(thisLi).removeClass("hover");
                    connectRemove(thisLi, "hover");
                });

                // 获取 出生日期、胎龄
                const childHospitalizationDateInput = $(bdDsElem).attr("data-chd");
                let childHospitalizationDate = null, childHospitalizationDateStamp = 0, gaWeek = 0, gaDay = -1;
                if (notNullTool(childHospitalizationDateInput)) {
                    childHospitalizationDate = childHospitalizationDateInput;
                    childHospitalizationDateStamp = Date.parse(childHospitalizationDate);
                    const gaWeekInput = $(bdDsElem).attr("data-gaWeek"),
                        gaDayInput = $(bdDsElem).attr("data-gaDay");
                    if (notNullTool(gaWeekInput)) {
                        gaWeek = parseInt(gaWeekInput);
                    }
                    if (notNullTool(gaDayInput)) {
                        gaDay = parseInt(gaDayInput);
                    }
                }

                // 出院日期
                let dischargeDate = null, dischargeDateStamp = 0, cgaWeek = 0;
                laydate.render({
                    elem: "#PC-db-dischargeDate",
                    type: "datetime",
                    format: "yyyy-MM-dd HH:mm:ss",
                    max: 1,
                    done: function (value, date) {
                        if(value !== "") {
                            dischargeDate = date.year + "-" + date.month + "-" + date.date +  ' ' + date.hours + ':' + date.minutes + ':' + date.seconds;
                            dischargeDateStamp = Date.parse(dischargeDate);
                            if (notNullTool(childHospitalizationDate)) {
                                if (dischargeDateStamp < childHospitalizationDateStamp) {
                                    layer.msg("出院日期必须<span class='layui-badge'>晚于</span>入院日期！", {
                                        icon: 5,
                                        time: 1000,
                                        anim: 6,
                                        btn: "好",
                                        resize: false,
                                        shade: 0.8
                                    }, function () {
                                        $("#PC-db-dischargeDate").val("");
                                        dischargeDate = null;
                                        dischargeDateStamp = 0;
                                    });
                                } else {
                                    // 住院时间
                                    const hospitalStay = Math.ceil((dischargeDateStamp - childHospitalizationDateStamp) / 86400000);
                                    $("#PC-db-HS").val(hospitalStay);
                                    // 纠正胎龄
                                    cgaWeek = gaWeek + Math.floor(hospitalStay/7);
                                    let cgaDay = gaDay + hospitalStay%7;
                                    if (cgaDay > 6) {
                                        cgaWeek = cgaWeek + Math.ceil(cgaDay/7);
                                        cgaDay = cgaDay%7;
                                    }
                                    $("#PC-db-CGAW").val(cgaWeek);
                                    $("#PC-db-CGAD").val(cgaDay);
                                }
                            }
                        }else {
                            dischargeDate = null;
                            dischargeDateStamp = 0;
                        }
                    }
                });

                // 纠正胎龄 初始化
                const cgaWeekInput = $("#PC-db-CGAW").val();
                if (notNullTool(cgaWeekInput)) {
                    cgaWeek = parseInt(cgaWeekInput);
                }

                // 出院体重 Z评分
                const gender = $(bdDsElem).attr("data-gender");
                $("#PC-db-DW").on("focusout", function () {
                    computeZScore(this, cgaWeek, gender, function (weight, weightIndex) {
                        $("#PC-db-DWP").val(((weight - boyWeightMean[weightIndex]) / boyWeightDS[weightIndex]).toFixed(2));
                    }, function (weight, weightIndex) {
                        $("#PC-db-DWP").val(((weight - girlWeightMean[weightIndex]) / girlWeightSD[weightIndex]).toFixed(2));
                    });
                });

                // 出院身长 Z评分
                $("#PC-db-DL").on("focusout", function () {
                    computeZScore(this, cgaWeek, gender, function (length, lengthIndex) {
                        $("#PC-db-DLP").val(((length - boyLengthMean[lengthIndex]) / boyLengthSD[lengthIndex]).toFixed(2));
                    }, function (length, lengthIndex) {
                        $("#PC-db-DLP").val(((length - girlLengthMean[lengthIndex]) / girlLengthSD[lengthIndex]).toFixed(2));
                    });
                });

                // 出院头围 Z评分
                $("#PC-db-DHC").on("focusout", function () {
                    computeZScore(this, cgaWeek, gender, function (headCircumference, headCircumferenceIndex) {
                        $("#PC-db-DHCP").val(((headCircumference - boyHeadCircumferenceMean[headCircumferenceIndex]) / boyHeadCircumferenceSD[headCircumferenceIndex]).toFixed(2));
                    }, function (headCircumference, headCircumferenceIndex) {
                        $("#PC-db-DHCP").val(((headCircumference - girlHeadCircumferenceMean[headCircumferenceIndex]) / girlHeadCircumferenceSD[headCircumferenceIndex]).toFixed(2));
                    });
                });

                // 宫外生长迟缓 生成
                if ($(bdDsElem).length > 0) {
                    const ectopicGrowthRetardationInput = $("#PC-db-EGR>input").attr("data-dgsValue");
                    if (notNullTool(ectopicGrowthRetardationInput)) {
                        const ectopicGrowthRetardation = parseInt(ectopicGrowthRetardationInput);
                        if (ectopicGrowthRetardation === 1) {
                            form.val("BDDS", {
                                ectopicGrowthRetardation: true
                            });
                            $("#PC-db-EGR>.layui-form-switch").off("click");
                        }
                    }
                }

                // 呼吸支持情况 选择 吸氧浓度显示
                form.on("select(RS)", function (data) {
                    if (data.value !== "") {
                        $("#PC-db-OC").removeAttr("disabled").attr("lay-verify", "requiredDB").attr("name", function () {
                            return $(this).attr("data-name");
                        });
                    } else {
                        $("#PC-db-OC").attr("disabled", true).removeAttr("name lay-verify").val("");
                    }
                });

                // 出院情况 死亡日期
                const birthdayInput = $(bdDsElem).attr("data-birthday");
                let deathTimeMin = '1970-1-1';
                if (notNullTool(birthdayInput)) {
                    deathTimeMin = birthdayInput;
                }
                laydate.render({
                    elem: "#PC-db-DD",
                    type: "date",
                    format: "yyyy-MM-dd",
                    min: deathTimeMin,
                    max: 0
                });

                // 初始化 连线选择
                const fateInput = $("#PC-db-fate").val(),
                    liElem = $(".pc-db-BDDS .pc-db-connect ul>li");
                if (notNullTool(fateInput)) {
                    const fate = parseInt(fateInput),
                        thisLi = $(".pc-db-BDDS .pc-db-connect ul>li[data-id=" + fate + "]");
                    $(liElem).removeClass("active activeLeft activeBehind");
                    $(thisLi).addClass("active");
                    connectAdd(thisLi, "active");
                    if (fate !== 4 && fate !== 9 && fate !== 11 && fate !== 12) {
                        $("#PC-db-GUR>ul>li").off("click");
                    }
                } else {
                    $("#PC-db-GUR>ul>li").off("click");
                }

                // 新生儿预后 连线选择 点击事件
                $(wrapElem).on("click", function () {
                    const that = this,
                        thisLi = $(that).parent("li");
                    $(liElem).removeClass("active activeLeft activeBehind");
                    $(thisLi).addClass("active");
                    connectAdd(thisLi, "active");
                    const liIdInput = $(thisLi).attr("data-id");
                    if (notNullTool(liIdInput)) {
                        const liId = parseInt(liIdInput);
                        if (liId > 0) {
                            $("#PC-db-fate").val(liId);
                            // 死亡
                            if (liId === 2 || liId === 4 || liId === 5 || liId === 7 || liId === 9 || liId === 10) {
                                $("#PC-db-DD, #PC-db-DCO").removeAttr("disabled").attr("name", function () {
                                    return $(this).attr("data-name");
                                });
                                $("#PC-db-DCT>.pc-db-table").removeClass("pc-db-table-off");
                                $("#PC-db-DCT>.pc-db-table>tbody>tr button").removeAttr("disabled");
                            } else {
                                $("#PC-db-GUR>.pc-db-item-checkbox>input").attr("disabled", true);
                                $("#PC-db-DD, #PC-db-DCO").attr("disabled", true).removeAttr("name").val("");
                                $("#PC-db-DCT>.pc-db-table").addClass("pc-db-table-off");
                                $("#PC-db-DCT>.pc-db-table>tbody>tr button").attr("disabled", true);
                                $("#PC-db-addDeathCause").parents("tr").siblings().remove();
                            }
                            // 放弃
                            if ((liId >= 3 && liId <= 5) || (liId >= 8 && liId <= 12)) {
                                $("#PC-db-GUR>.pc-db-item-checkbox>input").removeAttr("disabled");
                            } else {
                                $("#PC-db-GUR>.pc-db-item-checkbox>input").attr("disabled", true);
                                form.val("BDDS", {
                                    giveUpReasonUltraImmature: false,
                                    giveUpReasonCongenitalMalformations: false,
                                    giveUpReasonEconomicReasons: false,
                                    giveUpReasonWorryPrognosis: false,
                                    giveUpReasonOther: false
                                });
                            }
                            form.render("checkbox");
                            // 转诊
                            if ((liId >= 6 && liId <= 10) || liId === 12 || liId === 13) {
                                $("#PC-db-RH").removeAttr("disabled").attr("lay-verify", "requiredDB").attr("name", function () {
                                    return $(this).attr("data-name");
                                });
                            } else {
                                $("#PC-db-RH").removeAttr("name lay-verify").attr("disabled", true).val("");
                            }
                        } else {
                            $("#PC-db-fate").val("").removeAttr("value");
                            $(liElem).removeClass("active activeLeft activeBehind");
                        }
                    }
                });

                // 基础数据库 出院情况 添加/编辑 信息 提交
                form.on("submit(DS)", function (data) {
                    const doing = "保存信息";
                    loading(doing);
                    let field = data.field, deathCauseArray = [];
                    for (let i = 1; i <= dcIndex; i++) {
                        if (notNullTool(field["deathCauseClassification" + i]) && notNullTool(field["deathCauseDiagnosis" + i])) {
                            deathCauseArray.push({
                                deathCauseClassification: field["deathCauseClassification" + i],
                                deathCauseDiagnosis: field["deathCauseDiagnosis" + i],
                            });
                            delete field["deathCauseClassification" + i];
                            delete field["deathCauseDiagnosis" + i];
                        }
                    }
                    field.deathCauseArray = JSON.stringify(deathCauseArray);
                    for (let i in field) {
                        if (!notNullTool(field[i])) {
                            delete field[i];
                        }
                    }
                    $.post("/perinatalPlatform/basicDatabase/write/DS/post", field, function (back, status) {
                        if(status === "success") {
                            if(back.code) {
                                successNext();
                            }else {failMsg(doing)}
                        }else {errorMsg1()}
                    }, "json").fail(function () {errorMsg2()});
                });
            }
        }

        // 基础数据库 审核 信息 提交
        form.on("submit(saveReview)", function (data) {
            const doing = "保存审核";
            loading(doing);
            $.post("/perinatalPlatform/basicDatabase/review/post", data.field, function (back, status) {
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