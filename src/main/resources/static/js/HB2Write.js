$(document).ready(function () {

    // 引入 layui
    layui.use(["element", "form", "laydate", "layer"], function () {
        let form = layui.form,
            laydate = layui.laydate,
            layer = layui.layer;

        let mriIndex = 0;
        // 初始化 MRI检查
        const mriIndexInput = $(".pc-db-HBFUEMRIE .pc-db-table>tbody").attr("data-num");
        if (notNullTool(mriIndexInput)) {
            mriIndex = parseInt(mriIndexInput);
            // 为 日期 选择 初始化
            for (let i = 1; i <= mriIndex; i++) {
                const thisMriIndex = i;
                laydate.render({
                    elem: "#PC-db-FUT" + thisMriIndex,
                    type: "datetime",
                    format: "yyyy-MM-dd HH:mm:ss",
                    max: 1
                });
                // 删除 MRI检查 行
                $("#PC-db-mriDelete" + thisMriIndex).on("click", function () {
                    const that = this;
                    layer.msg("确定要 <span class='pc-db-status-color-no'>删除</span> 此条MRI检查信息吗?",{
                        icon: 7,
                        time: 0,
                        anim: 6,
                        btn: ["确定", "取消"],
                        resize: false,
                        shade: 0.8,
                        yes: function (index) {
                            $(that).parents("tr").remove();
                            // 计算 MRI检查 次数
                            const mriTimes = $(".pc-db-HBFUEMRIE .pc-db-table>tbody>tr").length - 1;
                            $("#PC-db-MRIRT").val(mriTimes);
                            layer.close(index);
                        }
                    });
                });
            }
        }
        // 增加 MRI检查
        $("#PC-db-addMRIE").on("click", function () {
            const that = this;
            mriIndex ++;
            sequentialExecution(function () {
                $(that).parents("tr").before(
                    "<tr>" +
                    "   <td>" +
                    "       <input id='PC-db-FUT" + mriIndex + "' type='text' name='followUpTime" + mriIndex + "' lay-verify='required' placeholder='请选择随访时间' lay-reqText='请选择随访时间！' readonly>" +
                    "   </td>" +
                    "   <td class='pc-db-table-select'>" +
                    "       <select name='result" + mriIndex + "' lay-filter='result' lay-reqText='请选择结果！' lay-verify='required'>" +
                    "           <option value=''>请选择结果</option>" +
                    "           <option value='正常'>正常</option>" +
                    "           <option value='苍白球对称性高信号（早期头颅核磁TIWI）'>苍白球对称性高信号（早期头颅核磁TIWI）</option>" +
                    "           <option value='苍白球对称性高信号（早期T1W1）+苍白球对称性高信号（2-3月T2W1）'>苍白球对称性高信号（早期T1W1）+苍白球对称性高信号（2-3月T2W1）</option>" +
                    "           <option value='其他'>其他</option>" +
                    "       </select>" +
                    "       <input id='PC-db-OR" + mriIndex + "' class='pc-db-OR pc-db-none' type='text' name='otherResult" + mriIndex + "' placeholder='请填写其他结果'>" +
                    "   </td>" +
                    "   <td class='pc-db-table-select'>" +
                    "       <select name='followUpAdvice" + mriIndex + "' lay-reqText='请选择随访建议！' lay-verify='required'>" +
                    "           <option value=''>请选择随访建议</option>" +
                    "           <option value='正常，无需随访'>正常，无需随访</option>" +
                    "           <option value='1月'>1月</option>" +
                    "           <option value='2月'>2月</option>" +
                    "           <option value='3月'>3月</option>" +
                    "           <option value='6月'>6月</option>" +
                    "           <option value='1年'>1年</option>" +
                    "       </select>" +
                    "   </td>" +
                    "   <td>" +
                    "       <button id='PC-db-mriDelete" + mriIndex + "' class='pc-btn pc-btn-danger'><i class='iconfont icon-delete'></i></button>" +
                    "   </td>" +
                    "</tr>");
            }, function () {
                const thisMriIndex = mriIndex;
                form.on("select(result)", function (data) {
                    if (data.value === "其他") {
                        $("#PC-db-OR" + thisMriIndex).removeClass("pc-db-none");
                    } else {
                        $("#PC-db-OR" + thisMriIndex).addClass("pc-db-none");
                    }
                });
            }, function () {
                form.render("select");
                const thisMriIndex = mriIndex;
                laydate.render({
                    elem: "#PC-db-FUT" + thisMriIndex,
                    type: "datetime",
                    format: "yyyy-MM-dd HH:mm:ss",
                    max: 1
                });
                // 计算 MRI检查 次数
                const mriTimes = $(".pc-db-HBFUEMRIE .pc-db-table>tbody>tr").length - 1;
                $("#PC-db-MRIRT").val(mriTimes);
                // 删除 MRI检查 行
                $("#PC-db-mriDelete" + thisMriIndex).on("click", function () {
                    const that = this;
                    layer.msg("确定要 <span class='pc-db-status-color-no'>删除</span> 此条MRI检查信息吗?",{
                        icon: 7,
                        time: 0,
                        anim: 6,
                        btn: ["确定", "取消"],
                        resize: false,
                        shade: 0.8,
                        yes: function (index) {
                            $(that).parents("tr").remove();
                            // 计算 MRI检查 次数
                            const mriTimes = $(".pc-db-HBFUEMRIE .pc-db-table>tbody>tr").length - 1;
                            $("#PC-db-MRIRT").val(mriTimes);
                            layer.close(index);
                        }
                    });
                });
            });
        });

        // 高胆数据库 随访检查 MRI检查 添加/编辑 信息 提交
        form.on("submit(MRIE)", function (data) {
            const doing = "保存信息";
            loading(doing);
            let field = data.field, mriArray = [];
            for (let i = 1; i <= mriIndex; i++) {
                let mriJson = {};
                if (notNullTool(field["followUpTime" + i])) {
                    mriJson.followUpTime = field["followUpTime" + i];
                    mriJson.result = field["result" + i];
                    mriJson.followUpAdvice = field["followUpAdvice" + i];
                    delete field["followUpTime" + i];
                    delete field["result" + i];
                    delete field["followUpAdvice" + i];
                }
                if (notNullTool(field["otherResult" + i])) {
                    mriJson.otherResult = field["otherResult" + i];
                    delete field["otherResult" + i];
                }
                mriArray.push(mriJson);
            }
            field.mriArray = JSON.stringify(mriArray);
            $.post("/perinatalPlatform/highBilirubin/write/FUE/MRIE/post", field, function (back, status) {
                if(status === "success") {
                    if(back.code) {
                        hbSuccessNext(function () {
                            location.href = "/perinatalPlatform/highBilirubin/write/FUE/BAEP";
                        });
                    }else {failMsg(doing)}
                }else {errorMsg1()}
            }, "json").fail(function () {errorMsg2()});
        });

        let baepIndex = 0;
        // 初始化 脑干听觉诱发电位
        const baepIndexInput = $(".pc-db-HBFUEBAEP .pc-db-table>tbody").attr("data-num");
        if (notNullTool(baepIndexInput)) {
            baepIndex = parseInt(baepIndexInput);
            // 为 日期 选择 初始化
            for (let i = 1; i <= baepIndex; i++) {
                const thisBaepIndex = i;
                laydate.render({
                    elem: "#PC-db-FUT" + thisBaepIndex,
                    type: "datetime",
                    format: "yyyy-MM-dd HH:mm:ss",
                    max: 1
                });
                // 删除 脑干听觉诱发电位 行
                $("#PC-db-baepDelete" + thisBaepIndex).on("click", function () {
                    const that = this;
                    layer.msg("确定要 <span class='pc-db-status-color-no'>删除</span> 此条脑干听觉诱发电位检查信息吗?",{
                        icon: 7,
                        time: 0,
                        anim: 6,
                        btn: ["确定", "取消"],
                        resize: false,
                        shade: 0.8,
                        yes: function (index) {
                            $(that).parents("tr").remove();
                            // 计算 脑干听觉诱发电位 次数
                            const baepTimes = $(".pc-db-HBFUEBAEP .pc-db-table>tbody>tr").length - 1;
                            $("#PC-db-BAEPT").val(baepTimes);
                            layer.close(index);
                        }
                    });
                });
            }
        }
        // 增加 脑干听觉诱发电位
        $("#PC-db-addBAEP").on("click", function () {
            const that = this;
            baepIndex ++;
            sequentialExecution(function () {
                $(that).parents("tr").before(
                    "<tr>" +
                    "   <td>" +
                    "       <input id='PC-db-FUT" + baepIndex + "' type='text' name='followUpTime" + baepIndex + "' lay-verify='required' placeholder='请选择随访时间' lay-reqText='请选择随访时间！' readonly>" +
                    "   </td>" +
                    "   <td class='pc-db-table-select'>" +
                    "       <select name='resultLeftEar" + baepIndex + "' lay-reqText='请选择结果（左耳）！' lay-verify='required'>" +
                    "           <option value=''>请选择结果（左耳）</option>" +
                    "           <option value='通过'>通过</option>" +
                    "           <option value='不通过'>不通过</option>" +
                    "       </select>" +
                    "   </td>" +
                    "   <td class='pc-db-table-select'>" +
                    "       <select name='resultRightEar" + baepIndex + "' lay-reqText='请选择结果（右耳）！' lay-verify='required'>" +
                    "           <option value=''>请选择结果（右耳）</option>" +
                    "           <option value='通过'>通过</option>" +
                    "           <option value='不通过'>不通过</option>" +
                    "       </select>" +
                    "   </td>" +
                    "   <td class='pc-db-table-select'>" +
                    "       <select name='followUpAdvice" + baepIndex + "' lay-reqText='请选择随访建议！' lay-verify='required'>" +
                    "           <option value=''>请选择随访建议</option>" +
                    "           <option value='正常，无需随访'>正常，无需随访</option>" +
                    "           <option value='1月'>1月</option>" +
                    "           <option value='2月'>2月</option>" +
                    "           <option value='3月'>3月</option>" +
                    "           <option value='6月'>6月</option>" +
                    "           <option value='1年'>1年</option>" +
                    "       </select>" +
                    "   <td>" +
                    "       <button id='PC-db-baepDelete" + baepIndex + "' class='pc-btn pc-btn-danger'><i class='iconfont icon-delete'></i></button>" +
                    "   </td>" +
                    "</tr>");
            }, function () {
                form.render("select");
                const thisBaepIndex = baepIndex;
                laydate.render({
                    elem: "#PC-db-FUT" + thisBaepIndex,
                    type: "datetime",
                    format: "yyyy-MM-dd HH:mm:ss",
                    max: 1
                });
                // 计算 脑干听觉诱发电位 次数
                const baepTimes = $(".pc-db-HBFUEBAEP .pc-db-table>tbody>tr").length - 1;
                $("#PC-db-BAEPT").val(baepTimes);
                // 删除 脑干听觉诱发电位 行
                $("#PC-db-baepDelete" + thisBaepIndex).on("click", function () {
                    const that = this;
                    layer.msg("确定要 <span class='pc-db-status-color-no'>删除</span> 此条脑干听觉诱发电位检查信息吗?",{
                        icon: 7,
                        time: 0,
                        anim: 6,
                        btn: ["确定", "取消"],
                        resize: false,
                        shade: 0.8,
                        yes: function (index) {
                            $(that).parents("tr").remove();
                            // 计算 脑干听觉诱发电位 次数
                            const baepTimes = $(".pc-db-HBFUEBAEP .pc-db-table>tbody>tr").length - 1;
                            $("#PC-db-BAEPT").val(baepTimes);
                            layer.close(index);
                        }
                    });
                });
            });
        });

        // 高胆数据库 随访检查 脑干听觉诱发电位 添加/编辑 信息 提交
        form.on("submit(BAEP)", function (data) {
            const doing = "保存信息";
            loading(doing);
            let field = data.field, baepArray = [];
            for (let i = 1; i <= baepIndex; i++) {
                if (notNullTool(field["followUpTime" + i])) {
                    baepArray.push({
                        followUpTime: field["followUpTime" + i],
                        resultLeftEar: field["resultLeftEar" + i],
                        resultRightEar: field["resultRightEar" + i],
                        followUpAdvice: field["followUpAdvice" + i]
                    });
                    delete field["followUpTime" + i];
                    delete field["resultLeftEar" + i];
                    delete field["resultRightEar" + i];
                    delete field["followUpAdvice" + i];
                }
            }
            field.baepArray = JSON.stringify(baepArray);
            $.post("/perinatalPlatform/highBilirubin/write/FUE/BAEP/post", field, function (back, status) {
                if(status === "success") {
                    if(back.code) {
                        hbSuccessNext(function () {
                            location.href = "";
                        });
                    }else {failMsg(doing)}
                }else {errorMsg1()}
            }, "json").fail(function () {errorMsg2()});
        });

        // 高胆数据库 随访检查 MRI检查 添加/编辑 信息 提交
        form.on("submit(MRIE)", function (data) {
            const doing = "保存信息";
            loading(doing);
            let field = data.field, mriArray = [];
            for (let i = 1; i <= mriIndex; i++) {
                let mriJson = {};
                if (notNullTool(field["followUpTime" + i])) {
                    mriJson.followUpTime = field["followUpTime" + i];
                    mriJson.result = field["result" + i];
                    mriJson.followUpAdvice = field["followUpAdvice" + i];
                    delete field["followUpTime" + i];
                    delete field["result" + i];
                    delete field["followUpAdvice" + i];
                }
                if (notNullTool(field["otherResult" + i])) {
                    mriJson.otherResult = field["otherResult" + i];
                    delete field["otherResult" + i];
                }
                mriArray.push(mriJson);
            }
            field.mriArray = JSON.stringify(mriArray);
            $.post("/perinatalPlatform/highBilirubin/write/FUE/MRIE/post", field, function (back, status) {
                if(status === "success") {
                    if(back.code) {
                        hbSuccessNext(function () {
                            location.href = "/perinatalPlatform/highBilirubin/write/FUE/AIEEG";
                        });
                    }else {failMsg(doing)}
                }else {errorMsg1()}
            }, "json").fail(function () {errorMsg2()});
        });

        let aiEegIndex = 0;
        // 初始化 振幅整合脑电图
        const aiEegIndexInput = $(".pc-db-HBFUEAIEEG .pc-db-table>tbody").attr("data-num");
        if (notNullTool(aiEegIndexInput)) {
            aiEegIndex = parseInt(aiEegIndexInput);
            // 为 日期 选择 初始化
            for (let i = 1; i <= aiEegIndex; i++) {
                const thisAiEegIndex = i;
                laydate.render({
                    elem: "#PC-db-FUT" + thisAiEegIndex,
                    type: "datetime",
                    format: "yyyy-MM-dd HH:mm:ss",
                    max: 1
                });
                // 删除 振幅整合脑电图 行
                $("#PC-db-aiEegDelete" + thisAiEegIndex).on("click", function () {
                    const that = this;
                    layer.msg("确定要 <span class='pc-db-status-color-no'>删除</span> 此条振幅整合脑电图检查信息吗?",{
                        icon: 7,
                        time: 0,
                        anim: 6,
                        btn: ["确定", "取消"],
                        resize: false,
                        shade: 0.8,
                        yes: function (index) {
                            $(that).parents("tr").remove();
                            // 计算 振幅整合脑电图 次数
                            const aiEegTimes = $(".pc-db-HBFUEAIEEG .pc-db-table>tbody>tr").length - 1;
                            $("#PC-db-AIEEGT").val(aiEegTimes);
                            layer.close(index);
                        }
                    });
                });
            }
        }
        // 增加 振幅整合脑电图
        $("#PC-db-addAIEEG").on("click", function () {
            const that = this;
            aiEegIndex ++;
            sequentialExecution(function () {
                $(that).parents("tr").before(
                    "<tr>" +
                    "   <td>" +
                    "       <input id='PC-db-FUT" + aiEegIndex + "' type='text' name='followUpTime" + aiEegIndex + "' lay-verify='required' placeholder='请选择随访时间' lay-reqText='请选择随访时间！' readonly>" +
                    "   </td>" +
                    "   <td class='pc-db-table-select'>" +
                    "       <select name='result" + aiEegIndex + "' lay-reqText='请选择结果！' lay-verify='required'>" +
                    "           <option value=''>请选择结果</option>" +
                    "           <option value='正常'>正常</option>" +
                    "           <option value='轻度异常'>轻度异常</option>" +
                    "           <option value='中度及重度异常'>中度及重度异常</option>" +
                    "       </select>" +
                    "   </td>" +
                    "   <td class='pc-db-table-select'>" +
                    "       <select name='followUpAdvice" + aiEegIndex + "' lay-reqText='请选择随访建议！' lay-verify='required'>" +
                    "           <option value=''>请选择随访建议</option>" +
                    "           <option value='正常，无需随访'>正常，无需随访</option>" +
                    "           <option value='1月'>1月</option>" +
                    "           <option value='2月'>2月</option>" +
                    "           <option value='3月'>3月</option>" +
                    "           <option value='6月'>6月</option>" +
                    "           <option value='1年'>1年</option>" +
                    "       </select>" +
                    "   <td>" +
                    "       <button id='PC-db-aiEegDelete" + aiEegIndex + "' class='pc-btn pc-btn-danger'><i class='iconfont icon-delete'></i></button>" +
                    "   </td>" +
                    "</tr>");
            }, function () {
                form.render("select");
                const thisAiEegIndex = aiEegIndex;
                laydate.render({
                    elem: "#PC-db-FUT" + thisAiEegIndex,
                    type: "datetime",
                    format: "yyyy-MM-dd HH:mm:ss",
                    max: 1
                });
                // 计算 振幅整合脑电图 次数
                const aiEegTimes = $(".pc-db-HBFUEAIEEG .pc-db-table>tbody>tr").length - 1;
                $("#PC-db-AIEEGT").val(aiEegTimes);
                // 删除 振幅整合脑电图 行
                $("#PC-db-aiEegDelete" + thisAiEegIndex).on("click", function () {
                    const that = this;
                    layer.msg("确定要 <span class='pc-db-status-color-no'>删除</span> 此条振幅整合脑电图检查信息吗?",{
                        icon: 7,
                        time: 0,
                        anim: 6,
                        btn: ["确定", "取消"],
                        resize: false,
                        shade: 0.8,
                        yes: function (index) {
                            $(that).parents("tr").remove();
                            // 计算 振幅整合脑电图 次数
                            const aiEegTimes = $(".pc-db-HBFUEAIEEG .pc-db-table>tbody>tr").length - 1;
                            $("#PC-db-AIEEGT").val(aiEegTimes);
                            layer.close(index);
                        }
                    });
                });
            });
        });

        // 高胆数据库 随访检查 振幅整合脑电图 添加/编辑 信息 提交
        form.on("submit(AIEEG)", function (data) {
            const doing = "保存信息";
            loading(doing);
            let field = data.field, aiEegArray = [];
            for (let i = 1; i <= aiEegIndex; i++) {
                if (notNullTool(field["followUpTime" + i])) {
                    aiEegArray.push({
                        followUpTime: field["followUpTime" + i],
                        result: field["result" + i],
                        followUpAdvice: field["followUpAdvice" + i]
                    });
                    delete field["followUpTime" + i];
                    delete field["result" + i];
                    delete field["followUpAdvice" + i];
                }
            }
            field.aiEegArray = JSON.stringify(aiEegArray);
            $.post("/perinatalPlatform/highBilirubin/write/FUE/AIEEG/post", field, function (back, status) {
                if(status === "success") {
                    if(back.code) {
                        hbSuccessNext(function () {
                            location.href = "/perinatalPlatform/highBilirubin/write/FUE/GMS";
                        });
                    }else {failMsg(doing)}
                }else {errorMsg1()}
            }, "json").fail(function () {errorMsg2()});
        });

        let gmsIndex = 0;
        // 初始化 婴儿全身运动评估
        const gmsIndexInput = $(".pc-db-HBFUEGMS .pc-db-table>tbody").attr("data-num");
        if (notNullTool(gmsIndexInput)) {
            gmsIndex = parseInt(gmsIndexInput);
            // 为 日期 选择 初始化
            for (let i = 1; i <= gmsIndex; i++) {
                const thisGmsIndex = i;
                laydate.render({
                    elem: "#PC-db-FUT" + thisGmsIndex,
                    type: "datetime",
                    format: "yyyy-MM-dd HH:mm:ss",
                    max: 1
                });
                // 删除 婴儿全身运动评估 行
                $("#PC-db-gmsDelete" + thisGmsIndex).on("click", function () {
                    const that = this;
                    layer.msg("确定要 <span class='pc-db-status-color-no'>删除</span> 此条婴儿全身运动评估吗?",{
                        icon: 7,
                        time: 0,
                        anim: 6,
                        btn: ["确定", "取消"],
                        resize: false,
                        shade: 0.8,
                        yes: function (index) {
                            $(that).parents("tr").remove();
                            // 计算 婴儿全身运动评估 次数
                            const gmsTimes = $(".pc-db-HBFUEGMS .pc-db-table>tbody>tr").length - 1;
                            $("#PC-db-GMST").val(gmsTimes);
                            layer.close(index);
                        }
                    });
                });
            }
        }
        // 增加 婴儿全身运动评估
        $("#PC-db-addGMS").on("click", function () {
            const that = this;
            gmsIndex ++;
            sequentialExecution(function () {
                $(that).parents("tr").before(
                    "<tr>" +
                    "   <td>" +
                    "       <input id='PC-db-FUT" + gmsIndex + "' type='text' name='followUpTime" + gmsIndex + "' lay-verify='required' placeholder='请选择随访时间' lay-reqText='请选择随访时间！' readonly>" +
                    "   </td>" +
                    "   <td class='pc-db-table-select'>" +
                    "       <select name='resultWrithingMotionStage" + gmsIndex + "' lay-reqText='请选择结果（扭动运动阶段）！' lay-verify='required'>" +
                    "           <option value=''>请选择结果（扭动运动阶段）</option>" +
                    "           <option value='正常'>正常</option>" +
                    "           <option value='PR'>PR</option>" +
                    "           <option value='CS'>CS</option>" +
                    "           <option value='Ch'>Ch</option>" +
                    "       </select>" +
                    "   </td>" +
                    "   <td class='pc-db-table-select'>" +
                    "       <select name='resultRestlessMovementStage" + gmsIndex + "' lay-reqText='请选择结果（不安运动阶段）！' lay-verify='required'>" +
                    "           <option value=''>请选择结果（不安运动阶段）</option>" +
                    "           <option value='正常'>正常</option>" +
                    "           <option value='不安运动缺乏（F-）'>不安运动缺乏（F-）</option>" +
                    "           <option value='异常不安运动（AF）'>异常不安运动（AF）</option>" +
                    "       </select>" +
                    "   </td>" +
                    "   <td class='pc-db-table-select'>" +
                    "       <select name='followUpAdvice" + gmsIndex + "' lay-reqText='请选择随访建议！' lay-verify='required'>" +
                    "           <option value=''>请选择随访建议</option>" +
                    "           <option value='正常，无需随访'>正常，无需随访</option>" +
                    "           <option value='1月'>1月</option>" +
                    "           <option value='2月'>2月</option>" +
                    "           <option value='3月'>3月</option>" +
                    "           <option value='6月'>6月</option>" +
                    "           <option value='1年'>1年</option>" +
                    "       </select>" +
                    "   <td>" +
                    "       <button id='PC-db-gmsDelete" + gmsIndex + "' class='pc-btn pc-btn-danger'><i class='iconfont icon-delete'></i></button>" +
                    "   </td>" +
                    "</tr>");
            }, function () {
                form.render("select");
                const thisGmsIndex = gmsIndex;
                laydate.render({
                    elem: "#PC-db-FUT" + thisGmsIndex,
                    type: "datetime",
                    format: "yyyy-MM-dd HH:mm:ss",
                    max: 1
                });
                // 计算 婴儿全身运动评估 次数
                const gmsTimes = $(".pc-db-HBFUEGMS .pc-db-table>tbody>tr").length - 1;
                $("#PC-db-GMST").val(gmsTimes);
                // 删除 婴儿全身运动评估 行
                $("#PC-db-gmsDelete" + thisGmsIndex).on("click", function () {
                    const that = this;
                    layer.msg("确定要 <span class='pc-db-status-color-no'>删除</span> 此条婴儿全身运动评估吗?",{
                        icon: 7,
                        time: 0,
                        anim: 6,
                        btn: ["确定", "取消"],
                        resize: false,
                        shade: 0.8,
                        yes: function (index) {
                            $(that).parents("tr").remove();
                            // 计算 婴儿全身运动评估 次数
                            const gmsTimes = $(".pc-db-HBFUEGMS .pc-db-table>tbody>tr").length - 1;
                            $("#PC-db-GMST").val(gmsTimes);
                            layer.close(index);
                        }
                    });
                });
            });
        });

        // 高胆数据库 随访检查 婴儿全身运动评估 添加/编辑 信息 提交
        form.on("submit(GMS)", function (data) {
            const doing = "保存信息";
            loading(doing);
            let field = data.field, gmsArray = [];
            for (let i = 1; i <= gmsIndex; i++) {
                if (notNullTool(field["followUpTime" + i])) {
                    gmsArray.push({
                        followUpTime: field["followUpTime" + i],
                        resultWrithingMotionStage: field["resultWrithingMotionStage" + i],
                        resultRestlessMovementStage: field["resultRestlessMovementStage" + i],
                        followUpAdvice: field["followUpAdvice" + i]
                    });
                    delete field["followUpTime" + i];
                    delete field["resultWrithingMotionStage" + i];
                    delete field["resultRestlessMovementStage" + i];
                    delete field["followUpAdvice" + i];
                }
            }
            field.gmsArray = JSON.stringify(gmsArray);
            $.post("/perinatalPlatform/highBilirubin/write/FUE/GMS/post", field, function (back, status) {
                if(status === "success") {
                    if(back.code) {
                        hbSuccessNext(function () {
                            location.href = "/perinatalPlatform/highBilirubin/write/FUE/GS";
                        });
                    }else {failMsg(doing)}
                }else {errorMsg1()}
            }, "json").fail(function () {errorMsg2()});
        });

        let gsIndex = 0;
        // 初始化 Griffiths量表
        const gsIndexInput = $(".pc-db-HBFUEGS .pc-db-table>tbody").attr("data-num");
        if (notNullTool(gsIndexInput)) {
            gsIndex = parseInt(gsIndexInput);
            // 为 日期 选择 初始化
            for (let i = 1; i <= gsIndex; i++) {
                const thisGsIndex = i;
                laydate.render({
                    elem: "#PC-db-GST" + thisGsIndex,
                    type: "datetime",
                    format: "yyyy-MM-dd HH:mm:ss",
                    max: 1
                });
                // 计算 总评分
                let sport, individualSociety, listeningSpeakingAbility, handEyeCoordination, visualManipulationAbility;
                const sportElem = $("#PC-db-sport" + thisGsIndex);
                if (notNullTool($(sportElem).val())) {
                    sport = parseInt($(sportElem).val());
                }
                $(sportElem).on("focusout", function () {
                    const sportInput = $(this).val();
                    if (notNullTool(sportInput)) {
                        sport = parseInt(sportInput);
                        if (notNullTool(individualSociety) && notNullTool(listeningSpeakingAbility) && notNullTool(handEyeCoordination) && notNullTool(visualManipulationAbility)) {
                            $("#PC-db-TS" + thisGsIndex).val(sport + individualSociety + listeningSpeakingAbility + handEyeCoordination + visualManipulationAbility);
                        }
                    }
                });
                const individualSocietyElem = $("#PC-db-IS" + thisGsIndex);
                if (notNullTool($(individualSocietyElem).val())) {
                    individualSociety = parseInt($(individualSocietyElem).val());
                }
                $(individualSocietyElem).on("focusout", function () {
                    const individualSocietyInput = $(this).val();
                    if (notNullTool(individualSocietyInput)) {
                        individualSociety = parseInt(individualSocietyInput);
                        if (notNullTool(sport) && notNullTool(listeningSpeakingAbility) && notNullTool(handEyeCoordination) && notNullTool(visualManipulationAbility)) {
                            $("#PC-db-TS" + thisGsIndex).val(sport + individualSociety + listeningSpeakingAbility + handEyeCoordination + visualManipulationAbility);
                        }
                    }
                });
                const listeningSpeakingAbilityElem = $("#PC-db-LSA" + thisGsIndex);
                if (notNullTool($(listeningSpeakingAbilityElem).val())) {
                    listeningSpeakingAbility = parseInt($(listeningSpeakingAbilityElem).val());
                }
                $(listeningSpeakingAbilityElem).on("focusout", function () {
                    const listeningSpeakingAbilityInput = $(this).val();
                    if (notNullTool(listeningSpeakingAbilityInput)) {
                        listeningSpeakingAbility = parseInt(listeningSpeakingAbilityInput);
                        if (notNullTool(sport) && notNullTool(individualSociety) && notNullTool(handEyeCoordination) && notNullTool(visualManipulationAbility)) {
                            $("#PC-db-TS" + thisGsIndex).val(sport + individualSociety + listeningSpeakingAbility + handEyeCoordination + visualManipulationAbility);
                        }
                    }
                });
                const handEyeCoordinationElem = $("#PC-db-HEC" + thisGsIndex);
                if (notNullTool($(handEyeCoordinationElem).val())) {
                    handEyeCoordination = parseInt($(handEyeCoordinationElem).val());
                }
                $(handEyeCoordinationElem).on("focusout", function () {
                    const handEyeCoordinationInput = $(this).val();
                    if (notNullTool(handEyeCoordinationInput)) {
                        handEyeCoordination = parseInt(handEyeCoordinationInput);
                        if (notNullTool(sport) && notNullTool(individualSociety) && notNullTool(listeningSpeakingAbility) && notNullTool(visualManipulationAbility)) {
                            $("#PC-db-TS" + thisGsIndex).val(sport + individualSociety + listeningSpeakingAbility + handEyeCoordination + visualManipulationAbility);
                        }
                    }
                });
                const visualManipulationAbilityElem = $("#PC-db-VMA" + thisGsIndex);
                if (notNullTool($(visualManipulationAbilityElem).val())) {
                    visualManipulationAbility = parseInt($(visualManipulationAbilityElem).val());
                }
                $(visualManipulationAbilityElem).on("focusout", function () {
                    const visualManipulationAbilityInput = $(this).val();
                    if (notNullTool(visualManipulationAbilityInput)) {
                        visualManipulationAbility = parseInt(visualManipulationAbilityInput);
                        if (notNullTool(sport) && notNullTool(individualSociety) && notNullTool(listeningSpeakingAbility) && notNullTool(handEyeCoordination)) {
                            $("#PC-db-TS" + thisGsIndex).val(sport + individualSociety + listeningSpeakingAbility + handEyeCoordination + visualManipulationAbility);
                        }
                    }
                });
                // 删除 Griffiths量表 行
                $("#PC-db-gsDelete" + thisGsIndex).on("click", function () {
                    const that = this;
                    layer.msg("确定要 <span class='pc-db-status-color-no'>删除</span> 此条Griffiths量表数据吗?",{
                        icon: 7,
                        time: 0,
                        anim: 6,
                        btn: ["确定", "取消"],
                        resize: false,
                        shade: 0.8,
                        yes: function (index) {
                            $(that).parents("tr").remove();
                            // 计算 Griffiths量表 次数
                            const gsTimes = $(".pc-db-HBFUEGS .pc-db-table>tbody>tr").length - 1;
                            $("#PC-db-GST").val(gsTimes);
                            layer.close(index);
                        }
                    });
                });
            }
        }
        // 增加 婴儿全身运动评估
        $("#PC-db-addGS").on("click", function () {
            const that = this;
            gsIndex ++;
            sequentialExecution(function () {
                $(that).parents("tr").before(
                    "<tr>" +
                    "   <td>" +
                    "       <input id='PC-db-GST" + gsIndex + "' type='text' name='griffithsScaleTime" + gsIndex + "' lay-verify='required' placeholder='请选择日期' lay-reqText='请选择日期！' readonly>" +
                    "   </td>" +
                    "   <td>" +
                    "       <input id='PC-db-sport" + gsIndex + "' type='number' name='sport" + gsIndex + "' lay-verify='required' placeholder='请填写运动' lay-reqText='请填写运动！'>" +
                    "   </td>" +
                    "   <td>" +
                    "       <input id='PC-db-IS" + gsIndex + "' type='number' name='individualSociety" + gsIndex + "' lay-verify='required' placeholder='请填写个人-社会' lay-reqText='请填写个人-社会！'>" +
                    "   </td>" +
                    "   <td>" +
                    "       <input id='PC-db-LSA" + gsIndex + "' type='number' name='listeningSpeakingAbility" + gsIndex + "' lay-verify='required' placeholder='请填写听说能力' lay-reqText='请填写听说能力！'>" +
                    "   </td>" +
                    "   <td>" +
                    "       <input id='PC-db-HEC" + gsIndex + "' type='number' name='handEyeCoordination" + gsIndex + "' lay-verify='required' placeholder='请填写手眼协调' lay-reqText='请填写手眼协调！'>" +
                    "   </td>" +
                    "   <td>" +
                    "       <input id='PC-db-VMA" + gsIndex + "' type='number' name='visualManipulationAbility" + gsIndex + "' lay-verify='required' placeholder='请填写视觉操作能力' lay-reqText='请填写视觉操作能力！'>" +
                    "   </td>" +
                    "   <td>" +
                    "       <input id='PC-db-TS" + gsIndex + "' type='number' name='totalScore" + gsIndex + "' lay-verify='required' lay-reqText='请填写总评分！' readonly>" +
                    "   </td>" +
                    "   <td>" +
                    "       <button id='PC-db-gsDelete" + gsIndex + "' class='pc-btn pc-btn-danger'><i class='iconfont icon-delete'></i></button>" +
                    "   </td>" +
                    "</tr>");
            }, function () {
                form.render("select");
                const thisGsIndex = gsIndex;
                laydate.render({
                    elem: "#PC-db-GST" + thisGsIndex,
                    type: "datetime",
                    format: "yyyy-MM-dd HH:mm:ss",
                    max: 1
                });
                // 计算 Griffiths量表 次数
                const gsTimes = $(".pc-db-HBFUEGS .pc-db-table>tbody>tr").length - 1;
                $("#PC-db-GST").val(gsTimes);
                // 计算 总评分
                let sport, individualSociety, listeningSpeakingAbility, handEyeCoordination, visualManipulationAbility;
                $("#PC-db-sport" + thisGsIndex).on("focusout", function () {
                    const sportInput = $(this).val();
                    if (notNullTool(sportInput)) {
                        sport = parseInt(sportInput);
                        if (notNullTool(individualSociety) && notNullTool(listeningSpeakingAbility) && notNullTool(handEyeCoordination) && notNullTool(visualManipulationAbility)) {
                            $("#PC-db-TS" + thisGsIndex).val(sport + individualSociety + listeningSpeakingAbility + handEyeCoordination + visualManipulationAbility);
                        }
                    }
                });
                $("#PC-db-IS" + thisGsIndex).on("focusout", function () {
                    const individualSocietyInput = $(this).val();
                    if (notNullTool(individualSocietyInput)) {
                        individualSociety = parseInt(individualSocietyInput);
                        if (notNullTool(sport) && notNullTool(listeningSpeakingAbility) && notNullTool(handEyeCoordination) && notNullTool(visualManipulationAbility)) {
                            $("#PC-db-TS" + thisGsIndex).val(sport + individualSociety + listeningSpeakingAbility + handEyeCoordination + visualManipulationAbility);
                        }
                    }
                });
                $("#PC-db-LSA" + thisGsIndex).on("focusout", function () {
                    const listeningSpeakingAbilityInput = $(this).val();
                    if (notNullTool(listeningSpeakingAbilityInput)) {
                        listeningSpeakingAbility = parseInt(listeningSpeakingAbilityInput);
                        if (notNullTool(sport) && notNullTool(individualSociety) && notNullTool(handEyeCoordination) && notNullTool(visualManipulationAbility)) {
                            $("#PC-db-TS" + thisGsIndex).val(sport + individualSociety + listeningSpeakingAbility + handEyeCoordination + visualManipulationAbility);
                        }
                    }
                });
                $("#PC-db-HEC" + thisGsIndex).on("focusout", function () {
                    const handEyeCoordinationInput = $(this).val();
                    if (notNullTool(handEyeCoordinationInput)) {
                        handEyeCoordination = parseInt(handEyeCoordinationInput);
                        if (notNullTool(sport) && notNullTool(individualSociety) && notNullTool(listeningSpeakingAbility) && notNullTool(visualManipulationAbility)) {
                            $("#PC-db-TS" + thisGsIndex).val(sport + individualSociety + listeningSpeakingAbility + handEyeCoordination + visualManipulationAbility);
                        }
                    }
                });
                $("#PC-db-VMA" + thisGsIndex).on("focusout", function () {
                    const visualManipulationAbilityInput = $(this).val();
                    if (notNullTool(visualManipulationAbilityInput)) {
                        visualManipulationAbility = parseInt(visualManipulationAbilityInput);
                        if (notNullTool(sport) && notNullTool(individualSociety) && notNullTool(listeningSpeakingAbility) && notNullTool(handEyeCoordination)) {
                            $("#PC-db-TS" + thisGsIndex).val(sport + individualSociety + listeningSpeakingAbility + handEyeCoordination + visualManipulationAbility);
                        }
                    }
                });
                // 删除 Griffiths量表 行
                $("#PC-db-gsDelete" + thisGsIndex).on("click", function () {
                    const that = this;
                    layer.msg("确定要 <span class='pc-db-status-color-no'>删除</span> 此条婴儿全身运动评估吗?",{
                        icon: 7,
                        time: 0,
                        anim: 6,
                        btn: ["确定", "取消"],
                        resize: false,
                        shade: 0.8,
                        yes: function (index) {
                            $(that).parents("tr").remove();
                            // 计算 Griffiths量表 次数
                            const gsTimes = $(".pc-db-HBFUEGS .pc-db-table>tbody>tr").length - 1;
                            $("#PC-db-GST").val(gsTimes);
                            layer.close(index);
                        }
                    });
                });
            });
        });

        // 高胆数据库 随访检查 Griffiths量表 添加/编辑 信息 提交
        form.on("submit(GS)", function (data) {
            const doing = "保存信息";
            loading(doing);
            let field = data.field, gsArray = [];
            for (let i = 1; i <= gsIndex; i++) {
                if (notNullTool(field["griffithsScaleTime" + i])) {
                    gsArray.push({
                        griffithsScaleTime: field["griffithsScaleTime" + i],
                        sport: field["sport" + i],
                        individualSociety: field["individualSociety" + i],
                        listeningSpeakingAbility: field["listeningSpeakingAbility" + i],
                        handEyeCoordination: field["handEyeCoordination" + i],
                        visualManipulationAbility: field["visualManipulationAbility" + i],
                        totalScore: field["totalScore" + i]
                    });
                    delete field["griffithsScaleTime" + i];
                    delete field["sport" + i];
                    delete field["individualSociety" + i];
                    delete field["listeningSpeakingAbility" + i];
                    delete field["handEyeCoordination" + i];
                    delete field["visualManipulationAbility" + i];
                    delete field["totalScore" + i];
                }
            }
            field.gsArray = JSON.stringify(gsArray);
            $.post("/perinatalPlatform/highBilirubin/write/FUE/GS/post", field, function (back, status) {
                if(status === "success") {
                    if(back.code) {
                        hbSuccessNext(function () {
                            location.href = "/perinatalPlatform/highBilirubin/write/FUC";
                        });
                    }else {failMsg(doing)}
                }else {errorMsg1()}
            }, "json").fail(function () {errorMsg2()});
        });

        // 高胆数据库 随访结论 评价日期
        laydate.render({
            elem: "#PC-db-ED",
            type: "datetime",
            format: "yyyy-MM-dd HH:mm:ss",
            max: 1
        });

        // 高胆数据库 随访结论 添加/编辑 信息 提交
        form.on("submit(FUC)", function (data) {
            const doing = "保存信息";
            loading(doing);
            let field = data.field;
            if (!notNullTool(field.others)) {
                delete field.others;
            }
            $.post("/perinatalPlatform/highBilirubin/write/FUC/post", field, function (back, status) {
                if(status === "success") {
                    if(back.code) {
                        hbSuccessNext(function () {
                            location.href = "/perinatalPlatform/highBilirubin/review";
                        });
                    }else {failMsg(doing)}
                }else {errorMsg1()}
            }, "json").fail(function () {errorMsg2()});
        });

        // 高胆数据库 审核 信息 提交
        form.on("submit(saveReview)", function (data) {
            const doing = "保存审核";
            loading(doing);
            $.post("/perinatalPlatform/highBilirubin/review/post", data.field, function (back, status) {
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