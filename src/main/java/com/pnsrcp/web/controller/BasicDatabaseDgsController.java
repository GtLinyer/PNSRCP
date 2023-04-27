package com.pnsrcp.web.controller;

import com.pnsrcp.web.entity.perintalPlatform.basicDatabaseDGS.*;
import com.pnsrcp.web.service.BasicDatabaseDgsService;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import javax.servlet.http.HttpSession;

/**
 * @Project: 围产新生儿科研合作平台
 * @Author: Linyer
 * @Email: linyer@linyer.cn
 * @Date: 2021/10/27 23:54 星期三
 * @Description: 基础数据库 消化系统 控制层
 */
@Controller
@RequestMapping("/perinatalPlatform/basicDatabase")
public class BasicDatabaseDgsController {
    // 服务层 注入
    @Resource
    private BasicDatabaseDgsService basicDatabaseDgsService;

    // 基础数据库 消化系统 生长指标 添加/编辑 页面
    @GetMapping(value = "/write/DGS/GI")
    public String bdDgsGrowthIndexEdit(Model model, HttpSession session) {
        try {
            if (session.getAttribute("motherIdBD") != null) {
                try {
                    if (session.getAttribute("childIdBD") != null) {
                        int childIdBD = (Integer) session.getAttribute("childIdBD");
                        int motherIdBD = (Integer) session.getAttribute("motherIdBD");
                        model.addAttribute("birthMsg", basicDatabaseDgsService.getBdBirthMsg(childIdBD, motherIdBD));
                        model.addAttribute("growthIndex", basicDatabaseDgsService.getBdDgsGrowthIndex(childIdBD, motherIdBD));
                        return "perinatalPlatform/basicDatabase/digestiveSystem/GI";
                    }
                } catch (NullPointerException ignored) {}
                return "redirect:/perinatalPlatform/basicDatabase/write/BS";
            }
        } catch (NullPointerException ignored) {}
        return "redirect:/perinatalPlatform/basicDatabase/write/MI";
    }

    // 基础数据库 消化系统 生长指标 获取体重、头围、身长
    @GetMapping(value = "/write/DGS/GI/getWHcBl")
    @ResponseBody
    public String getBdDgsWHcBl(HttpSession session) {
        return basicDatabaseDgsService.getBdDgsGiWHcBl((Integer) session.getAttribute("childIdBD"), (Integer) session.getAttribute("motherIdBD"));
    }

    // 基础数据库 消化系统 生长指标 数据提交
    @PostMapping(value = "/write/DGS/GI/post")
    @ResponseBody
    public String bdDgsGrowthIndexPost(HttpSession session,
                                       BDDGSGrowthIndex BDDGSGrowthIndex,
                                       @RequestParam("wHcBlArray") String wHcBlArray) {
        return basicDatabaseDgsService.saveBDDGSGI(BDDGSGrowthIndex, wHcBlArray, (Integer) session.getAttribute("childIdBD"), (Integer) session.getAttribute("motherIdBD"));
    }

    // 基础数据库 消化系统 肠内营养 添加/编辑 页面
    @GetMapping(value = "/write/DGS/EN")
    public String bdDgsEnteralNutritionEdit(Model model, HttpSession session) {
        try {
            if (session.getAttribute("motherIdBD") != null) {
                try {
                    if (session.getAttribute("childIdBD") != null) {
                        int childIdBD = (Integer) session.getAttribute("childIdBD");
                        int motherIdBD = (Integer) session.getAttribute("motherIdBD");
                        model.addAttribute("birthMsg", basicDatabaseDgsService.getBdBirthMsg(childIdBD, motherIdBD));
                        model.addAttribute("enteralNutrition", basicDatabaseDgsService.getBdDgsEnteralNutrition(childIdBD, motherIdBD));
                        return "perinatalPlatform/basicDatabase/digestiveSystem/EN";
                    }
                } catch (NullPointerException ignored) {}
                return "redirect:/perinatalPlatform/basicDatabase/write/BS";
            }
        } catch (NullPointerException ignored) {}
        return "redirect:/perinatalPlatform/basicDatabase/write/MI";
    }

    // 基础数据库 消化系统 肠内营养 获取表格数据
    @GetMapping(value = "/write/DGS/EN/getData")
    @ResponseBody
    public String getBdDgsEnData(HttpSession session) {
        return basicDatabaseDgsService.getBdDgsEnData((Integer) session.getAttribute("childIdBD"), (Integer) session.getAttribute("motherIdBD"));
    }

    // 基础数据库 消化系统 肠内营养 数据提交
    @PostMapping(value = "/write/DGS/EN/post")
    @ResponseBody
    public String bdDgsEnteralNutritionPost(HttpSession session,
                                            BDDGSEnteralNutrition bdDgsEnteralNutrition,
                                            @RequestParam("enDataArray") String enDataArray) {
        return basicDatabaseDgsService.saveBDDGSEN(bdDgsEnteralNutrition, enDataArray, (Integer) session.getAttribute("childIdBD"), (Integer) session.getAttribute("motherIdBD"));
    }

    // 基础数据库 消化系统 肠外营养 添加/编辑 页面
    @GetMapping(value = "/write/DGS/PN")
    public String bdDgsParenteralNutritionEdit(Model model, HttpSession session) {
        try {
            if (session.getAttribute("motherIdBD") != null) {
                try {
                    if (session.getAttribute("childIdBD") != null) {
                        int childIdBD = (Integer) session.getAttribute("childIdBD");
                        int motherIdBD = (Integer) session.getAttribute("motherIdBD");
                        model.addAttribute("birthMsg", basicDatabaseDgsService.getBdBirthMsg(childIdBD, motherIdBD));
                        model.addAttribute("pnTpList", basicDatabaseDgsService.getBdDgsPnTp(childIdBD, motherIdBD));
                        return "perinatalPlatform/basicDatabase/digestiveSystem/PN";
                    }
                } catch (NullPointerException ignored) {}
                return "redirect:/perinatalPlatform/basicDatabase/write/BS";
            }
        } catch (NullPointerException ignored) {}
        return "redirect:/perinatalPlatform/basicDatabase/write/MI";
    }

    // 基础数据库 消化系统 肠外营养 获取表格数据
    @GetMapping(value = "/write/DGS/PN/getData")
    @ResponseBody
    public String getBdDgsPnData(HttpSession session) {
        return basicDatabaseDgsService.getBdDgsPnData((Integer) session.getAttribute("childIdBD"), (Integer) session.getAttribute("motherIdBD"));
    }

    // 基础数据库 消化系统 肠外营养 数据提交
    @PostMapping(value = "/write/DGS/PN/post")
    @ResponseBody
    public String bdDgsParenteralNutritionPost(HttpSession session,
                                               BDDGSParenteralNutrition bdDgsParenteralNutrition,
                                               @RequestParam("pnDataArray") String pnDataArray,
                                               @RequestParam("pnTpArray") String pnTpArray) {
        return basicDatabaseDgsService.saveBDDGSPN(bdDgsParenteralNutrition, pnDataArray, pnTpArray, (Integer) session.getAttribute("childIdBD"), (Integer) session.getAttribute("motherIdBD"));
    }

    // 基础数据库 消化系统 禁食原因 添加/编辑 页面
    @GetMapping(value = "/write/DGS/FR")
    public String bdDgsFastingReasonsEdit(Model model, HttpSession session) {
        try {
            if (session.getAttribute("motherIdBD") != null) {
                try {
                    if (session.getAttribute("childIdBD") != null) {
                        int childIdBD = (Integer) session.getAttribute("childIdBD");
                        int motherIdBD = (Integer) session.getAttribute("motherIdBD");
                        model.addAttribute("fastingReasons", basicDatabaseDgsService.getBdDgsFastingReasons(childIdBD, motherIdBD));
                        model.addAttribute("frList", basicDatabaseDgsService.getBdDgsFrData(childIdBD, motherIdBD));
                        return "perinatalPlatform/basicDatabase/digestiveSystem/FR";
                    }
                } catch (NullPointerException ignored) {}
                return "redirect:/perinatalPlatform/basicDatabase/write/BS";
            }
        } catch (NullPointerException ignored) {}
        return "redirect:/perinatalPlatform/basicDatabase/write/MI";
    }

    // 基础数据库 消化系统 禁食原因 数据提交
    @PostMapping(value = "/write/DGS/FR/post")
    @ResponseBody
    public String bdDgsFastingReasonsPost(HttpSession session,
                                          BDDGSFastingReasons bdDgsFastingReasons,
                                          @RequestParam("frArray") String frArray) {
        return basicDatabaseDgsService.saveBDDGSFR(bdDgsFastingReasons, frArray, (Integer) session.getAttribute("childIdBD"), (Integer) session.getAttribute("motherIdBD"));
    }

    // 基础数据库 消化系统 喂养不耐受与NEC 添加/编辑 页面
    @GetMapping(value = "/write/DGS/FIN")
    public String bdDgsFeedingIntoleranceAndNecEdit(Model model, HttpSession session) {
        try {
            if (session.getAttribute("motherIdBD") != null) {
                try {
                    if (session.getAttribute("childIdBD") != null) {
                        int childIdBD = (Integer) session.getAttribute("childIdBD");
                        int motherIdBD = (Integer) session.getAttribute("motherIdBD");
                        model.addAttribute("fin", basicDatabaseDgsService.getBdDgsFeedingIntoleranceAndNec(childIdBD, motherIdBD));
                        return "perinatalPlatform/basicDatabase/digestiveSystem/FIN";
                    }
                } catch (NullPointerException ignored) {}
                return "redirect:/perinatalPlatform/basicDatabase/write/BS";
            }
        } catch (NullPointerException ignored) {}
        return "redirect:/perinatalPlatform/basicDatabase/write/MI";
    }

    // 基础数据库 消化系统 喂养不耐受与NEC 数据提交
    @PostMapping(value = "/write/DGS/FIN/post")
    @ResponseBody
    public String bdDgsFeedingIntoleranceAndNecPost(HttpSession session, BDDGSFeedingIntoleranceAndNec bdDgsFeedingIntoleranceAndNec) {
        return basicDatabaseDgsService.saveBDDGSFIN(bdDgsFeedingIntoleranceAndNec, (Integer) session.getAttribute("childIdBD"), (Integer) session.getAttribute("motherIdBD"));
    }

    // 基础数据库 消化系统 其它诊断与治疗 添加/编辑 页面
    @GetMapping(value = "/write/DGS/ODT")
    public String bdDgsOtherDiagnosisAndTreatmentEdit(Model model, HttpSession session) {
        try {
            if (session.getAttribute("motherIdBD") != null) {
                try {
                    if (session.getAttribute("childIdBD") != null) {
                        int childIdBD = (Integer) session.getAttribute("childIdBD");
                        int motherIdBD = (Integer) session.getAttribute("motherIdBD");
                        model.addAttribute("odt", basicDatabaseDgsService.getBdDgsOtherDiagnosisAndTreatment(childIdBD, motherIdBD));
                        return "perinatalPlatform/basicDatabase/digestiveSystem/ODT";
                    }
                } catch (NullPointerException ignored) {}
                return "redirect:/perinatalPlatform/basicDatabase/write/BS";
            }
        } catch (NullPointerException ignored) {}
        return "redirect:/perinatalPlatform/basicDatabase/write/MI";
    }

    // 基础数据库 消化系统 其它诊断与治疗 数据提交
    @PostMapping(value = "/write/DGS/ODT/post")
    @ResponseBody
    public String bdDgsOtherDiagnosisAndTreatmentPost(HttpSession session, BDDGSOtherDiagnosisAndTreatment bdDgsOtherDiagnosisAndTreatment) {
        return basicDatabaseDgsService.saveBDDGSODT(bdDgsOtherDiagnosisAndTreatment, (Integer) session.getAttribute("childIdBD"), (Integer) session.getAttribute("motherIdBD"));
    }

    // 基础数据库 消化系统 肠内营养管理 添加/编辑 页面
    @GetMapping(value = "/write/DGS/ENM")
    public String bdDgsEnteralNutritionManageEdit(Model model, HttpSession session) {
        try {
            if (session.getAttribute("motherIdBD") != null) {
                try {
                    if (session.getAttribute("childIdBD") != null) {
                        int childIdBD = (Integer) session.getAttribute("childIdBD");
                        int motherIdBD = (Integer) session.getAttribute("motherIdBD");
                        model.addAttribute("birthMsg", basicDatabaseDgsService.getBdBirthMsg(childIdBD, motherIdBD));
                        model.addAttribute("enm", basicDatabaseDgsService.getBdDgsEnm(childIdBD, motherIdBD));
                        return "perinatalPlatform/basicDatabase/digestiveSystem/ENM";
                    }
                } catch (NullPointerException ignored) {}
                return "redirect:/perinatalPlatform/basicDatabase/write/BS";
            }
        } catch (NullPointerException ignored) {}
        return "redirect:/perinatalPlatform/basicDatabase/write/MI";
    }

    // 基础数据库 消化系统 肠内营养管理 获取 初始化数据
    @GetMapping(value = "/write/DGS/ENM/getInitialData")
    @ResponseBody
    public String getBdDgsEnmInitialData(HttpSession session) {
        return basicDatabaseDgsService.getBdDgsEnmInitialData((Integer) session.getAttribute("childIdBD"), (Integer) session.getAttribute("motherIdBD"));
    }

    // 基础数据库 消化系统 肠内营养管理 数据提交
    @PostMapping(value = "/write/DGS/ENM/post")
    @ResponseBody
    public String bdDgsEnteralNutritionManagePost(HttpSession session,
                                                  BDDGSEnm bdDgsEnm,
                                                  @RequestParam("enmDataArray") String enmDataArray) {
        return basicDatabaseDgsService.saveBDDGSENM(bdDgsEnm, enmDataArray, (Integer) session.getAttribute("childIdBD"), (Integer) session.getAttribute("motherIdBD"));
    }

    // 基础数据库 消化系统 肠外营养管理 添加/编辑 页面
    @GetMapping(value = "/write/DGS/PNM")
    public String bdDgsParenteralNutritionManageEdit(Model model, HttpSession session) {
        try {
            if (session.getAttribute("motherIdBD") != null) {
                try {
                    if (session.getAttribute("childIdBD") != null) {
                        int childIdBD = (Integer) session.getAttribute("childIdBD");
                        int motherIdBD = (Integer) session.getAttribute("motherIdBD");
                        model.addAttribute("birthMsg", basicDatabaseDgsService.getBdBirthMsg(childIdBD, motherIdBD));
                        model.addAttribute("pnm", basicDatabaseDgsService.getBdDgsPnm(childIdBD, motherIdBD));
                        return "perinatalPlatform/basicDatabase/digestiveSystem/PNM";
                    }
                } catch (NullPointerException ignored) {}
                return "redirect:/perinatalPlatform/basicDatabase/write/BS";
            }
        } catch (NullPointerException ignored) {}
        return "redirect:/perinatalPlatform/basicDatabase/write/MI";
    }

    // 基础数据库 消化系统 肠外营养管理 获取 初始化数据
    @GetMapping(value = "/write/DGS/PNM/getInitialData")
    @ResponseBody
    public String getBdDgsPnmInitialData(HttpSession session) {
        return basicDatabaseDgsService.getBdDgsPnmInitialData((Integer) session.getAttribute("childIdBD"), (Integer) session.getAttribute("motherIdBD"));
    }

    // 基础数据库 消化系统 肠外营养管理 数据提交
    @PostMapping(value = "/write/DGS/PNM/post")
    @ResponseBody
    public String bdDgsParenteralNutritionManagePost(HttpSession session,
                                                     BDDGSPnm bdDgsPnm,
                                                     @RequestParam("pnmDataArray") String pnmDataArray) {
        return basicDatabaseDgsService.saveBDDGSPNM(bdDgsPnm, pnmDataArray, (Integer) session.getAttribute("childIdBD"), (Integer) session.getAttribute("motherIdBD"));
    }

    // 基础数据库 消化系统 过渡期营养管理 添加/编辑 页面
    @GetMapping(value = "/write/DGS/TNM")
    public String bdDgsTransitionalNutritionManageEdit(Model model, HttpSession session) {
        try {
            if (session.getAttribute("motherIdBD") != null) {
                try {
                    if (session.getAttribute("childIdBD") != null) {
                        int childIdBD = (Integer) session.getAttribute("childIdBD");
                        int motherIdBD = (Integer) session.getAttribute("motherIdBD");
                        model.addAttribute("birthMsg", basicDatabaseDgsService.getBdBirthMsg(childIdBD, motherIdBD));
                        return "perinatalPlatform/basicDatabase/digestiveSystem/TNM";
                    }
                } catch (NullPointerException ignored) {}
                return "redirect:/perinatalPlatform/basicDatabase/write/BS";
            }
        } catch (NullPointerException ignored) {}
        return "redirect:/perinatalPlatform/basicDatabase/write/MI";
    }

    // 基础数据库 消化系统 过渡期营养管理 获取 初始化数据
    @GetMapping(value = "/write/DGS/TNM/getInitialData")
    @ResponseBody
    public String getBdDgsTnmInitialData(HttpSession session) {
        return basicDatabaseDgsService.getBdDgsTnmInitialData((Integer) session.getAttribute("childIdBD"), (Integer) session.getAttribute("motherIdBD"));
    }

    // 基础数据库 消化系统 过渡期营养管理 数据提交
    @PostMapping(value = "/write/DGS/TNM/post")
    @ResponseBody
    public String bdDgsTransitionalNutritionManagePost(HttpSession session,
                                                       @RequestParam("tnmDataArray") String tnmDataArray) {
        return basicDatabaseDgsService.saveBDDGSTNM(tnmDataArray, (Integer) session.getAttribute("childIdBD"), (Integer) session.getAttribute("motherIdBD"));
    }

    // 基础数据库 消化系统 营养评价 添加/编辑 页面
    @GetMapping(value = "/write/DGS/NE")
    public String bdDgsNutritionalEvaluationEdit(Model model, HttpSession session) {
        try {
            if (session.getAttribute("motherIdBD") != null) {
                try {
                    if (session.getAttribute("childIdBD") != null) {
                        int childIdBD = (Integer) session.getAttribute("childIdBD");
                        int motherIdBD = (Integer) session.getAttribute("motherIdBD");
                        model.addAttribute("birthMsg", basicDatabaseDgsService.getBdBirthMsg(childIdBD, motherIdBD));
                        model.addAttribute("nutritionalEvaluation", basicDatabaseDgsService.getBdDgsNutritionalEvaluation(childIdBD, motherIdBD));
                        return "perinatalPlatform/basicDatabase/digestiveSystem/NE";
                    }
                } catch (NullPointerException ignored) {}
                return "redirect:/perinatalPlatform/basicDatabase/write/BS";
            }
        } catch (NullPointerException ignored) {}
        return "redirect:/perinatalPlatform/basicDatabase/write/MI";
    }

    // 基础数据库 消化系统 营养评价 获取 初始化数据
    @GetMapping(value = "/write/DGS/NE/getInitialData")
    @ResponseBody
    public String getBdDgsNeInitialData(HttpSession session) {
        return basicDatabaseDgsService.getBdDgsNeInitialData((Integer) session.getAttribute("childIdBD"), (Integer) session.getAttribute("motherIdBD"));
    }

    // 基础数据库 消化系统 营养评价 数据提交
    @PostMapping(value = "/write/DGS/NE/post")
    @ResponseBody
    public String bdDgsNutritionalEvaluationPost(HttpSession session, BDDGSNutritionalEvaluation bdDgsNutritionalEvaluation) {
        return basicDatabaseDgsService.saveBDDGSNE(bdDgsNutritionalEvaluation, (Integer) session.getAttribute("childIdBD"), (Integer) session.getAttribute("motherIdBD"));
    }
}