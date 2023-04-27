package com.pnsrcp.web.controller;

import com.pnsrcp.web.config.MyUserDetails;
import com.pnsrcp.web.entity.manage.Hospital;
import com.pnsrcp.web.entity.manage.User;
import com.pnsrcp.web.entity.perintalPlatform.Review;
import com.pnsrcp.web.entity.perintalPlatform.highBilirubin.*;
import com.pnsrcp.web.service.HighBilirubinService;
import com.pnsrcp.web.service.MainService;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import javax.servlet.http.HttpSession;

/**
 * @Project: 围产新生儿科研合作平台
 * @Author: Linyer
 * @Email: linyer@linyer.cn
 * @Date: 2022/05/12 14:26 星期四
 * @Description: 高胆数据库 控制层
 */
@Controller
@RequestMapping("/perinatalPlatform/highBilirubin")
public class HighBilirubinController {
    // 服务层 注入
    @Resource
    private MainService mainService;
    @Resource
    private HighBilirubinService highBilirubinService;

    // 高胆数据库 围产信息 添加/编辑 页面
    @GetMapping(value = "/write/PI")
    public String hbPerinatalInformationEdit(Model model, HttpSession session) {
        MyUserDetails userDetails = (MyUserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        try {
            if (session.getAttribute("motherIdHB") != null) {
                int motherIdHB = (Integer) session.getAttribute("motherIdHB");
                HBPerinatalInformation perinatalInformation = highBilirubinService.getHbPerinatalInformation(motherIdHB);
                model.addAttribute("perinatalInformation", perinatalInformation);
            } else {
                User user = userDetails.getUser();
                Hospital hospitalMsg = mainService.getHospitalMsg(user.getHospitalId());
                String hospitalAbbr = null;
                int hbNumber = highBilirubinService.getHbMaxNum(hospitalMsg.getHid()) + 1;
                if (hospitalMsg != null) {
                    hospitalAbbr = hospitalMsg.getAbbreviation();
                } else {
                    if (user.getLevel() == 1) {
                        hospitalAbbr = "admin";
                    } else if (user.getLevel() == 3) {
                        hospitalAbbr = highBilirubinService.getAreaNum(user.getUid());
                    }
                }
                model.addAttribute("hospitalAbbr", hospitalAbbr);
                model.addAttribute("hbNumber", hbNumber);
            }
        } catch (NullPointerException ignored) {}
        return "perinatalPlatform/highBilirubin/PI";
    }

    // 高胆数据库 围产信息 母亲信息 重复检测
    @PostMapping(value = "/testMI")
    @ResponseBody
    public String hbMotherInformationTest(@RequestParam("motherFullName") String motherFullName,
                                          @RequestParam("motherPhone") String motherPhone,
                                          @RequestParam("motherHospitalNumber") String motherHospitalNumber) {
        return highBilirubinService.motherInformationTest(motherFullName, motherPhone, motherHospitalNumber);
    }

    // 高胆数据库 围产信息 数据提交
    @PostMapping(value = "/write/PI/post")
    @ResponseBody
    public String hbPerinatalInformationPost(HttpSession session, HBPerinatalInformation hbPerinatalInformation) {
        MyUserDetails userDetails = (MyUserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        User user = userDetails.getUser();
        int motherIdHB = 0;
        try {
            motherIdHB = (Integer) session.getAttribute("motherIdHB");
        } catch (NullPointerException ignored) {}
        return highBilirubinService.saveHBPI(session, hbPerinatalInformation, motherIdHB, user.getUid(), user.getHospitalId());
    }

    // 高胆数据库 高胆治疗 基本信息 添加/编辑 页面
    @GetMapping(value = "/write/HBT/BI")
    public String hbHbtBasicInformationEdit(Model model, HttpSession session) {
        try {
            if (session.getAttribute("motherIdHB") != null) {
                int motherIdHB = (Integer) session.getAttribute("motherIdHB");
                String pcHbMotherNum = (String) session.getAttribute("pcMotherNum");
                String pcHbChildNum = pcHbMotherNum.substring(2);
                model.addAttribute("pcHbChildNum", "hn" + pcHbChildNum);
                try {
                    int childIdHB = (Integer) session.getAttribute("childIdHB");
                    model.addAttribute("basicInformation", highBilirubinService.getHbHbtBasicInformation(childIdHB, motherIdHB));
                } catch (NullPointerException ignored) {}
                return "perinatalPlatform/highBilirubin/highBilirubinTreatment/BI";
            }
        } catch (NullPointerException ignored) {}
        return "redirect:/perinatalPlatform/highBilirubin/write/PI";
    }

    // 高胆数据库 高胆治疗 基本信息 数据提交
    @PostMapping(value = "/write/HBT/BI/post")
    @ResponseBody
    public String hbHbtBasicInformationPost(HttpSession session,
                                            HBHbtBasicInformation hbHbtBasicInformation) {
        MyUserDetails userDetails = (MyUserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        int childIdHB = 0;
        String pcHbMotherNum = null;
        try {
            if (session.getAttribute("childIdHB") != null) {
                childIdHB = (Integer) session.getAttribute("childIdHB");
            }
        } catch (NullPointerException ignored) {}
        try {
            if (session.getAttribute("pcMotherNum") != null) {
                pcHbMotherNum = (String) session.getAttribute("pcMotherNum");
            }
        } catch (NullPointerException ignored) {}
        return highBilirubinService.saveHBTBI(session, hbHbtBasicInformation, childIdHB, pcHbMotherNum, (Integer) session.getAttribute("motherIdHB"), userDetails.getUser().getHospitalId());
    }

    // 高胆数据库 高胆治疗 高胆病因 添加/编辑 页面
    @GetMapping(value = "/write/HBT/HBC")
    public String hbHbtHighBilirubinCausesEdit(Model model, HttpSession session) {
        try {
            if (session.getAttribute("motherIdHB") != null) {
                try {
                    if (session.getAttribute("childIdHB") != null) {
                        int childIdHB = (Integer) session.getAttribute("childIdHB");
                        int motherIdHB = (Integer) session.getAttribute("motherIdHB");
                        model.addAttribute("highBilirubinCauses", highBilirubinService.getHbHbtHighBilirubinCauses(childIdHB, motherIdHB));
                        return "perinatalPlatform/highBilirubin/highBilirubinTreatment/HBC";
                    }
                } catch (NullPointerException ignored) {}
                return "redirect:/perinatalPlatform/highBilirubin/write/HBT/BI";
            }
        } catch (NullPointerException ignored) {}
        return "redirect:/perinatalPlatform/highBilirubin/write/PI";
    }

    // 高胆数据库 高胆治疗 高胆病因 数据提交
    @PostMapping(value = "/write/HBT/HBC/post")
    @ResponseBody
    public String hbHbtHighBilirubinCausesPost(HttpSession session,
                                               HBHbtHighBilirubinCauses hbHbtHighBilirubinCauses) {
        return highBilirubinService.saveHBTHBC(hbHbtHighBilirubinCauses, (Integer) session.getAttribute("childIdHB"), (Integer) session.getAttribute("motherIdHB"));
    }

    // 高胆数据库 高胆治疗 检查指标 添加/编辑 页面
    @GetMapping(value = "/write/HBT/CM")
    public String hbHbtCheckMetricsEdit(Model model, HttpSession session) {
        try {
            if (session.getAttribute("motherIdHB") != null) {
                try {
                    if (session.getAttribute("childIdHB") != null) {
                        int childIdHB = (Integer) session.getAttribute("childIdHB");
                        int motherIdHB = (Integer) session.getAttribute("motherIdHB");
                        model.addAttribute("checkMetrics", highBilirubinService.getHbHbtCheckMetrics(childIdHB, motherIdHB));
                        model.addAttribute("cmPhototherapyList", highBilirubinService.getHbHbtCmPhototherapy(childIdHB, motherIdHB));
                        model.addAttribute("cmExchangeBloodList", highBilirubinService.getHbHbtCmExchangeBlood(childIdHB, motherIdHB));
                        return "perinatalPlatform/highBilirubin/highBilirubinTreatment/CM";
                    }
                } catch (NullPointerException ignored) {}
                return "redirect:/perinatalPlatform/highBilirubin/write/HBT/BI";
            }
        } catch (NullPointerException ignored) {}
        return "redirect:/perinatalPlatform/highBilirubin/write/PI";
    }

    // 高胆数据库 高胆治疗 检查指标 数据提交
    @PostMapping(value = "/write/HBT/CM/post")
    @ResponseBody
    public String hbHbtCheckMetricsPost(HttpSession session,
                                        @RequestParam("pArray") String pArray,
                                        @RequestParam("ebArray") String ebArray,
                                        HBHbtCheckMetrics hbHbtCheckMetrics) {
        return highBilirubinService.saveHBTCM(hbHbtCheckMetrics, pArray, ebArray, (Integer) session.getAttribute("childIdHB"), (Integer) session.getAttribute("motherIdHB"));
    }

    // 高胆数据库 高胆治疗 治疗情况 添加/编辑 页面
    @GetMapping(value = "/write/HBT/TS")
    public String hbHbtTreatmentSituationEdit(Model model, HttpSession session) {
        try {
            if (session.getAttribute("motherIdHB") != null) {
                try {
                    if (session.getAttribute("childIdHB") != null) {
                        int childIdHB = (Integer) session.getAttribute("childIdHB");
                        int motherIdHB = (Integer) session.getAttribute("motherIdHB");
                        model.addAttribute("treatmentSituation", highBilirubinService.getHbHbtTreatmentSituation(childIdHB, motherIdHB));
                        return "perinatalPlatform/highBilirubin/highBilirubinTreatment/TS";
                    }
                } catch (NullPointerException ignored) {}
                return "redirect:/perinatalPlatform/highBilirubin/write/HBT/BI";
            }
        } catch (NullPointerException ignored) {}
        return "redirect:/perinatalPlatform/highBilirubin/write/PI";
    }

    // 高胆数据库 高胆治疗 治疗情况 数据提交
    @PostMapping(value = "/write/HBT/TS/post")
    @ResponseBody
    public String hbHbtTreatmentSituationPost(HttpSession session,
                                              HBHbtTreatmentSituation hbHbtTreatmentSituation) {
        return highBilirubinService.saveHBTTS(hbHbtTreatmentSituation, (Integer) session.getAttribute("childIdHB"), (Integer) session.getAttribute("motherIdHB"));
    }

    // 高胆数据库 高胆治疗 脑病评分 添加/编辑 页面
    @GetMapping(value = "/write/HBT/ES")
    public String hbHbtEncephalopathyScoreEdit(Model model, HttpSession session) {
        try {
            if (session.getAttribute("motherIdHB") != null) {
                try {
                    if (session.getAttribute("childIdHB") != null) {
                        int childIdHB = (Integer) session.getAttribute("childIdHB");
                        int motherIdHB = (Integer) session.getAttribute("motherIdHB");
                        model.addAttribute("admissionDate", highBilirubinService.getHbBirthMsg(childIdHB, motherIdHB).getAdmissionDate());
                        return "perinatalPlatform/highBilirubin/highBilirubinTreatment/ES";
                    }
                } catch (NullPointerException ignored) {}
                return "redirect:/perinatalPlatform/highBilirubin/write/HBT/BI";
            }
        } catch (NullPointerException ignored) {}
        return "redirect:/perinatalPlatform/highBilirubin/write/PI";
    }

    // 高胆数据库 高胆治疗 脑病评分 获取表格数据
    @GetMapping(value = "/write/HBT/ES/getData")
    @ResponseBody
    public String getHbHbtEncephalopathyScore(HttpSession session) {
        return highBilirubinService.getHbHbtEncephalopathyScore((Integer) session.getAttribute("childIdHB"), (Integer) session.getAttribute("motherIdHB"));
    }

    // 高胆数据库 高胆治疗 脑病评分 数据提交
    @PostMapping(value = "/write/HBT/ES/post")
    @ResponseBody
    public String hbHbtEncephalopathyScorePost(HttpSession session,
                                               String esDataArray) {
        return highBilirubinService.saveHBTES(esDataArray, (Integer) session.getAttribute("childIdHB"), (Integer) session.getAttribute("motherIdHB"));
    }

    // 高胆数据库 高胆治疗 高胆原因 添加/编辑 页面
    @GetMapping(value = "/write/HBT/HBR")
    public String hbHbtHighBilirubinReasonsEdit(Model model, HttpSession session) {
        try {
            if (session.getAttribute("motherIdHB") != null) {
                try {
                    if (session.getAttribute("childIdHB") != null) {
                        int childIdHB = (Integer) session.getAttribute("childIdHB");
                        int motherIdHB = (Integer) session.getAttribute("motherIdHB");
                        HBBirthMsg hbBirthMsg = highBilirubinService.getHbBirthMsg(childIdHB, motherIdHB);
                        model.addAttribute("birthday", hbBirthMsg.getBirthday());
                        model.addAttribute("highBilirubinReasons", highBilirubinService.getHbHbtHighBilirubinReasons(childIdHB, motherIdHB));
                        return "perinatalPlatform/highBilirubin/highBilirubinTreatment/HBR";
                    }
                } catch (NullPointerException ignored) {}
                return "redirect:/perinatalPlatform/highBilirubin/write/HBT/BI";
            }
        } catch (NullPointerException ignored) {}
        return "redirect:/perinatalPlatform/highBilirubin/write/PI";
    }

    // 高胆数据库 高胆治疗 高胆原因 数据提交
    @PostMapping(value = "/write/HBT/HBR/post")
    @ResponseBody
    public String hbHbtHighBilirubinReasonsPost(HttpSession session,
                                                HBHbtHighBilirubinReasons hbHbtHighBilirubinReasons) {
        return highBilirubinService.saveHBTHBR(hbHbtHighBilirubinReasons, (Integer) session.getAttribute("childIdHB"), (Integer) session.getAttribute("motherIdHB"));
    }

    // 高胆数据库 高胆治疗 辅助检查 添加/编辑 页面
    @GetMapping(value = "/write/HBT/AE")
    public String hbHbtAuxiliaryExaminationEdit(Model model, HttpSession session) {
        try {
            if (session.getAttribute("motherIdHB") != null) {
                try {
                    if (session.getAttribute("childIdHB") != null) {
                        int childIdHB = (Integer) session.getAttribute("childIdHB");
                        int motherIdHB = (Integer) session.getAttribute("motherIdHB");
                        model.addAttribute("auxiliaryExamination", highBilirubinService.getHbHbtAuxiliaryExamination(childIdHB, motherIdHB));
                        return "perinatalPlatform/highBilirubin/highBilirubinTreatment/AE";
                    }
                } catch (NullPointerException ignored) {}
                return "redirect:/perinatalPlatform/highBilirubin/write/HBT/BI";
            }
        } catch (NullPointerException ignored) {}
        return "redirect:/perinatalPlatform/highBilirubin/write/PI";
    }

    // 高胆数据库 高胆治疗 辅助检查 数据提交
    @PostMapping(value = "/write/HBT/AE/post")
    @ResponseBody
    public String hbHbtAuxiliaryExaminationPost(HttpSession session,
                                                HBHbtAuxiliaryExamination hbHbtAuxiliaryExamination) {
        return highBilirubinService.saveHBTAE(hbHbtAuxiliaryExamination, (Integer) session.getAttribute("childIdHB"), (Integer) session.getAttribute("motherIdHB"));
    }

    // 高胆数据库 高胆治疗 出院情况 添加/编辑 页面
    @GetMapping(value = "/write/HBT/DS")
    public String hbHbtDischargeSituationEdit(Model model, HttpSession session) {
        try {
            if (session.getAttribute("motherIdHB") != null) {
                try {
                    if (session.getAttribute("childIdHB") != null) {
                        int childIdHB = (Integer) session.getAttribute("childIdHB");
                        int motherIdHB = (Integer) session.getAttribute("motherIdHB");
                        model.addAttribute("dischargeSituation", highBilirubinService.getHbHbtDischargeSituation(childIdHB, motherIdHB));
                        return "perinatalPlatform/highBilirubin/highBilirubinTreatment/DS";
                    }
                } catch (NullPointerException ignored) {}
                return "redirect:/perinatalPlatform/highBilirubin/write/HBT/BI";
            }
        } catch (NullPointerException ignored) {}
        return "redirect:/perinatalPlatform/highBilirubin/write/PI";
    }

    // 高胆数据库 高胆治疗 出院情况 数据提交
    @PostMapping(value = "/write/HBT/DS/post")
    @ResponseBody
    public String hbHbtDischargeSituationPost(HttpSession session,
                                              HBHbtDischargeSituation hbHbtDischargeSituation) {
        return highBilirubinService.saveHBTDS(hbHbtDischargeSituation, (Integer) session.getAttribute("childIdHB"), (Integer) session.getAttribute("motherIdHB"));
    }

    // 高胆数据库 随访检查 MRI检查 添加/编辑 页面
    @GetMapping(value = "/write/FUE/MRIE")
    public String hbFueMriExaminationEdit(Model model, HttpSession session) {
        try {
            if (session.getAttribute("motherIdHB") != null) {
                try {
                    if (session.getAttribute("childIdHB") != null) {
                        int childIdHB = (Integer) session.getAttribute("childIdHB");
                        int motherIdHB = (Integer) session.getAttribute("motherIdHB");
                        model.addAttribute("mriResultTimes", highBilirubinService.getHbFueMrieMriResultTimes(childIdHB, motherIdHB));
                        model.addAttribute("mriExaminationList", highBilirubinService.getHbFueMriExamination(childIdHB, motherIdHB));
                        return "perinatalPlatform/highBilirubin/followUpExamination/MRIE";
                    }
                } catch (NullPointerException ignored) {}
                return "redirect:/perinatalPlatform/highBilirubin/write/HBT/BI";
            }
        } catch (NullPointerException ignored) {}
        return "redirect:/perinatalPlatform/highBilirubin/write/PI";
    }

    // 高胆数据库 随访检查 MRI检查 数据提交
    @PostMapping(value = "/write/FUE/MRIE/post")
    @ResponseBody
    public String hbFueMriExaminationPost(HttpSession session,
                                          @RequestParam(value = "mriResultTimes") String mriResultTimes,
                                          @RequestParam(value = "mriArray") String mriArray) {
        return highBilirubinService.saveHBFUEMRIE(mriResultTimes, mriArray, (Integer) session.getAttribute("childIdHB"), (Integer) session.getAttribute("motherIdHB"));
    }

    // 高胆数据库 随访检查 脑干听觉诱发电位 添加/编辑 页面
    @GetMapping(value = "/write/FUE/BAEP")
    public String hbFueBaepEdit(Model model, HttpSession session) {
        try {
            if (session.getAttribute("motherIdHB") != null) {
                try {
                    if (session.getAttribute("childIdHB") != null) {
                        int childIdHB = (Integer) session.getAttribute("childIdHB");
                        int motherIdHB = (Integer) session.getAttribute("motherIdHB");
                        model.addAttribute("brainstemAuditoryEvokedPotentialTimes", highBilirubinService.getHbFueBaepTimes(childIdHB, motherIdHB));
                        model.addAttribute("brainstemAuditoryEvokedPotentialList", highBilirubinService.getHbFueBaep(childIdHB, motherIdHB));
                        return "perinatalPlatform/highBilirubin/followUpExamination/BAEP";
                    }
                } catch (NullPointerException ignored) {}
                return "redirect:/perinatalPlatform/highBilirubin/write/HBT/BI";
            }
        } catch (NullPointerException ignored) {}
        return "redirect:/perinatalPlatform/highBilirubin/write/PI";
    }

    // 高胆数据库 随访检查 脑干听觉诱发电位 数据提交
    @PostMapping(value = "/write/FUE/BAEP/post")
    @ResponseBody
    public String hbFueBaepPost(HttpSession session,
                                @RequestParam(value = "brainstemAuditoryEvokedPotentialTimes") String brainstemAuditoryEvokedPotentialTimes,
                                @RequestParam(value = "baepArray") String baepArray) {
        return highBilirubinService.saveHBFUEBAEP(brainstemAuditoryEvokedPotentialTimes, baepArray, (Integer) session.getAttribute("childIdHB"), (Integer) session.getAttribute("motherIdHB"));
    }

    // 高胆数据库 随访检查 振幅整合脑电图 添加/编辑 页面
    @GetMapping(value = "/write/FUE/AIEEG")
    public String hbFueAmplitudeIntegratedEegEdit(Model model, HttpSession session) {
        try {
            if (session.getAttribute("motherIdHB") != null) {
                try {
                    if (session.getAttribute("childIdHB") != null) {
                        int childIdHB = (Integer) session.getAttribute("childIdHB");
                        int motherIdHB = (Integer) session.getAttribute("motherIdHB");
                        model.addAttribute("amplitudeIntegratedEegTimes", highBilirubinService.getHbFueAmplitudeIntegratedEegTimes(childIdHB, motherIdHB));
                        model.addAttribute("amplitudeIntegratedEegList", highBilirubinService.getHbFueAmplitudeIntegratedEeg(childIdHB, motherIdHB));
                        return "perinatalPlatform/highBilirubin/followUpExamination/AIEEG";
                    }
                } catch (NullPointerException ignored) {}
                return "redirect:/perinatalPlatform/highBilirubin/write/HBT/BI";
            }
        } catch (NullPointerException ignored) {}
        return "redirect:/perinatalPlatform/highBilirubin/write/PI";
    }

    // 高胆数据库 随访检查 振幅整合脑电图 数据提交
    @PostMapping(value = "/write/FUE/AIEEG/post")
    @ResponseBody
    public String hbFueAmplitudeIntegratedEegPost(HttpSession session,
                                                  @RequestParam(value = "amplitudeIntegratedEegTimes") String amplitudeIntegratedEegTimes,
                                                  @RequestParam(value = "aiEegArray") String aiEegArray) {
        return highBilirubinService.saveHBFUEAIEEG(amplitudeIntegratedEegTimes, aiEegArray, (Integer) session.getAttribute("childIdHB"), (Integer) session.getAttribute("motherIdHB"));
    }

    // 高胆数据库 随访检查 婴儿全身运动评估 添加/编辑 页面
    @GetMapping(value = "/write/FUE/GMS")
    public String hbFueGmsEdit(Model model, HttpSession session) {
        try {
            if (session.getAttribute("motherIdHB") != null) {
                try {
                    if (session.getAttribute("childIdHB") != null) {
                        int childIdHB = (Integer) session.getAttribute("childIdHB");
                        int motherIdHB = (Integer) session.getAttribute("motherIdHB");
                        model.addAttribute("gmsTimes", highBilirubinService.getHbFueGmsTimes(childIdHB, motherIdHB));
                        model.addAttribute("gmsList", highBilirubinService.getHbFueGms(childIdHB, motherIdHB));
                        return "perinatalPlatform/highBilirubin/followUpExamination/GMS";
                    }
                } catch (NullPointerException ignored) {}
                return "redirect:/perinatalPlatform/highBilirubin/write/HBT/BI";
            }
        } catch (NullPointerException ignored) {}
        return "redirect:/perinatalPlatform/highBilirubin/write/PI";
    }

    // 高胆数据库 随访检查 婴儿全身运动评估 数据提交
    @PostMapping(value = "/write/FUE/GMS/post")
    @ResponseBody
    public String hbFueGmsPost(HttpSession session,
                               @RequestParam(value = "gmsTimes") String gmsTimes,
                               @RequestParam(value = "gmsArray") String gmsArray) {
        return highBilirubinService.saveHBFUEGMS(gmsTimes, gmsArray, (Integer) session.getAttribute("childIdHB"), (Integer) session.getAttribute("motherIdHB"));
    }

    // 高胆数据库 随访检查 Griffiths量表 添加/编辑 页面
    @GetMapping(value = "/write/FUE/GS")
    public String hbFueGriffithsScaleEdit(Model model, HttpSession session) {
        try {
            if (session.getAttribute("motherIdHB") != null) {
                try {
                    if (session.getAttribute("childIdHB") != null) {
                        int childIdHB = (Integer) session.getAttribute("childIdHB");
                        int motherIdHB = (Integer) session.getAttribute("motherIdHB");
                        model.addAttribute("griffithsScaleTimes", highBilirubinService.getHbFueGsTimes(childIdHB, motherIdHB));
                        model.addAttribute("gsList", highBilirubinService.getHbFueGs(childIdHB, motherIdHB));
                        return "perinatalPlatform/highBilirubin/followUpExamination/GS";
                    }
                } catch (NullPointerException ignored) {}
                return "redirect:/perinatalPlatform/highBilirubin/write/HBT/BI";
            }
        } catch (NullPointerException ignored) {}
        return "redirect:/perinatalPlatform/highBilirubin/write/PI";
    }

    // 高胆数据库 随访检查 Griffiths量表 数据提交
    @PostMapping(value = "/write/FUE/GS/post")
    @ResponseBody
    public String hbFueGriffithsScalePost(HttpSession session,
                                          @RequestParam(value = "griffithsScaleTimes") String griffithsScaleTimes,
                                          @RequestParam(value = "gsArray") String gsArray) {
        return highBilirubinService.saveHBFUEGS(griffithsScaleTimes, gsArray, (Integer) session.getAttribute("childIdHB"), (Integer) session.getAttribute("motherIdHB"));
    }

    // 高胆数据库 随访检查 随访结论 添加/编辑 页面
    @GetMapping(value = "/write/FUC")
    public String hbFollowUpConclusionEdit(Model model, HttpSession session) {
        try {
            if (session.getAttribute("motherIdHB") != null) {
                try {
                    if (session.getAttribute("childIdHB") != null) {
                        int childIdHB = (Integer) session.getAttribute("childIdHB");
                        int motherIdHB = (Integer) session.getAttribute("motherIdHB");
                        model.addAttribute("followUpConclusion", highBilirubinService.getHbFollowUpConclusion(childIdHB, motherIdHB));
                        return "perinatalPlatform/highBilirubin/FUC";
                    }
                } catch (NullPointerException ignored) {}
                return "redirect:/perinatalPlatform/highBilirubin/write/HBT/BI";
            }
        } catch (NullPointerException ignored) {}
        return "redirect:/perinatalPlatform/highBilirubin/write/PI";
    }

    // 高胆数据库 随访检查 随访结论 数据提交
    @PostMapping(value = "/write/FUC/post")
    @ResponseBody
    public String hbFueFollowUpConclusionPost(HttpSession session, HBFollowUpConclusion hbFollowUpConclusion) {
        return highBilirubinService.saveHBFUC(hbFollowUpConclusion, (Integer) session.getAttribute("childIdHB"), (Integer) session.getAttribute("motherIdHB"));
    }

    // 高胆数据库 病例审核 页面
    @GetMapping(value = "/review")
    public String highBilirubinReview(Model model, HttpSession session) {
        try {
            if (session.getAttribute("motherIdHB") != null) {
                try {
                    if (session.getAttribute("childIdHB") != null) {
                        int childIdBD = (Integer) session.getAttribute("childIdHB");
                        int motherIdBD = (Integer) session.getAttribute("motherIdHB");
                        model.addAttribute("caseStatus", highBilirubinService.getHbCaseStatus(childIdBD, motherIdBD));
                        model.addAttribute("reviewCount", highBilirubinService.getHbReviewCount(childIdBD, motherIdBD));
                        model.addAttribute("reviewList", highBilirubinService.getHbReview(childIdBD, motherIdBD));
                        return "perinatalPlatform/highBilirubin/HBReview";
                    }
                } catch (NullPointerException ignored) {
                }
                return "redirect:/perinatalPlatform/highBilirubin/write/HBT/BI";
            }
        } catch (NullPointerException ignored) {}
        return "redirect:/perinatalPlatform/highBilirubin/write/PI";
    }

    // 高胆数据库 病例审核 信息提交
    @PostMapping(value = "/review/post")
    @ResponseBody
    public String highBilirubinReviewPost(HttpSession session,
                                          Review hbReview) {
        return highBilirubinService.addHbReview(hbReview, (Integer) session.getAttribute("childIdHB"), (Integer) session.getAttribute("motherIdHB"));
    }
}