package com.pnsrcp.web.controller;

import com.pnsrcp.web.config.MyUserDetails;
import com.pnsrcp.web.entity.manage.Hospital;
import com.pnsrcp.web.entity.manage.User;
import com.pnsrcp.web.entity.perintalPlatform.BDBaseInformation;
import com.pnsrcp.web.entity.perintalPlatform.Review;
import com.pnsrcp.web.entity.perintalPlatform.basicDatabaseCS.BDCirculatorySystem;
import com.pnsrcp.web.entity.perintalPlatform.basicDatabaseRP.BDRPRopDiagnosis;
import com.pnsrcp.web.entity.perintalPlatform.basicDatabaseRP.BDRPScreeningAssessment;
import com.pnsrcp.web.entity.perintalPlatform.basicDatabaseRP.BDRPScreeningStatus;
import com.pnsrcp.web.service.BasicDatabaseService;
import com.pnsrcp.web.service.MainService;
import com.pnsrcp.web.entity.perintalPlatform.basicDatabse.*;
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
 * @Date: 2021/5/21 14:55 星期五
 * @Description: 围产新生儿科研合作平台 基础数据库 控制层
 */
@Controller
@RequestMapping("/perinatalPlatform/basicDatabase")
public class BasicDatabaseController {
    // 服务层 注入
    @Resource
    private BasicDatabaseService basicDatabaseService;

    @Resource
    private MainService mainService;

    // 基础数据库 母亲信息 添加/编辑 页面
    @GetMapping(value = "/write/MI")
    public String bdMotherInformationEdit(Model model, HttpSession session) {
        MyUserDetails userDetails = (MyUserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        try {
            if (session.getAttribute("motherIdBD") != null) {
                int motherIdBD = (Integer) session.getAttribute("motherIdBD");
                int childIdBD = 0;
                try {
                    childIdBD = (Integer) session.getAttribute("childIdBD");
                } catch (NullPointerException ignored) {}
                BDBaseInformation baseInformation = basicDatabaseService.getBdBaseInformation(motherIdBD, childIdBD);
                session.setAttribute("motherHospitalNum", baseInformation.getMotherHospitalNum());
                session.setAttribute("pcMotherNum", baseInformation.getPcMotherNum());
                session.setAttribute("childHospitalNum", baseInformation.getChildHospitalNum());
                session.setAttribute("pcChildNum", baseInformation.getPcChildNum());
                session.setAttribute("childFullName", baseInformation.getChildFullName());
                BDMotherInformation motherInformation = basicDatabaseService.getBdMotherInformation(motherIdBD);
                model.addAttribute("motherInformation", motherInformation);
            } else {
                User user = userDetails.getUser();
                Hospital hospitalMsg = mainService.getHospitalMsg(user.getHospitalId());
                String hospitalAbbr = hospitalMsg.getAbbreviation();
                model.addAttribute("hospitalAbbr", hospitalAbbr);
            }
        } catch (NullPointerException ignored) {}
        return "perinatalPlatform/basicDatabase/MI";
    }

    // 基础数据库 母亲信息 重复检测
    @PostMapping(value = "/testMI")
    @ResponseBody
    public String bdMotherInformationTest(@RequestParam("motherFullName") String motherFullName,
                                          @RequestParam("motherPhone") String motherPhone,
                                          @RequestParam("motherAge") String motherAge,
                                          @RequestParam("motherHospitalNumber") String motherHospitalNumber) {
        return basicDatabaseService.motherInformationTest(motherFullName, motherPhone, motherAge, motherHospitalNumber);
    }

    // 基础数据库 母亲信息 获取 编号最新数字
    @GetMapping(value = "/getPcMotherNumMaxNum")
    @ResponseBody
    public String getPcMotherNumMaxNum(@RequestParam("hospitalizationYear") String hospitalizationYear) {
        MyUserDetails userDetails = (MyUserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        User user = userDetails.getUser();
        Hospital hospitalMsg = mainService.getHospitalMsg(user.getHospitalId());
        return basicDatabaseService.getBdMaxNum(hospitalMsg.getHid(), hospitalizationYear);
    }

    // 基础数据库 母亲信息 数据提交
    @PostMapping(value = "/write/MI/post")
    @ResponseBody
    public String bdMotherInformationPost(HttpSession session, BDMotherInformation bdMotherInformation) {
        MyUserDetails userDetails = (MyUserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        User user = userDetails.getUser();
        int motherIdBD = 0;
        try {
            motherIdBD = (Integer) session.getAttribute("motherIdBD");
        } catch (NullPointerException ignored) {}
        return basicDatabaseService.saveBDMI(session, bdMotherInformation, motherIdBD, user.getUid(), user.getHospitalId());
    }

    // 基础数据库 孕期信息 添加/编辑 页面
    @GetMapping(value = "/write/GI")
    public String bdGestationInformationEdit(Model model, HttpSession session) {
        try {
            if (session.getAttribute("motherIdBD") != null) {
                int motherIdBD = (Integer) session.getAttribute("motherIdBD");
                model.addAttribute("gestationInformation", basicDatabaseService.getBdGestationInformation(motherIdBD));
                return "perinatalPlatform/basicDatabase/GI";
            }
        } catch (NullPointerException ignored) {}
        return "redirect:/perinatalPlatform/basicDatabase/write/MI";
    }

    // 基础数据库 孕期信息 数据提交
    @PostMapping(value = "/write/GI/post")
    @ResponseBody
    public String bdGestationInformationPost(HttpSession session,
                                             BDGestationInformation bdGestationInformation) {
        int childIdBD = 0;
        try {
            childIdBD = (Integer) session.getAttribute("childIdBD");
        } catch (NullPointerException ignored) {}
        return basicDatabaseService.saveBDGI(bdGestationInformation, (Integer) session.getAttribute("motherIdBD"), childIdBD);
    }

    // 基础数据库 围产信息 添加/编辑 页面
    @GetMapping(value = "/write/PI")
    public String bdPerinatalInformationEdit(Model model, HttpSession session) {
        try {
            if (session.getAttribute("motherIdBD") != null) {
                int motherIdBD = (Integer) session.getAttribute("motherIdBD");
                model.addAttribute("perinatalInformation", basicDatabaseService.getBdPerinatalInformation(motherIdBD));
                return "perinatalPlatform/basicDatabase/PI";
            }
        } catch (NullPointerException ignored) {}
        return "redirect:/perinatalPlatform/basicDatabase/write/MI";
    }

    // 基础数据库 围产信息 数据提交
    @PostMapping(value = "/write/PI/post")
    @ResponseBody
    public String bdPerinatalInformationPost(HttpSession session,
                                             BDPerinatalInformation bdPerinatalInformation) {
        int childIdBD = 0;
        try {
            childIdBD = (Integer) session.getAttribute("childIdBD");
        } catch (NullPointerException ignored) {}
        return basicDatabaseService.saveBDPI(bdPerinatalInformation, (Integer) session.getAttribute("motherIdBD"), childIdBD);
    }

    // 基础数据库 宝宝情况 添加/编辑 页面
    @GetMapping(value = "/write/BS")
    public String bdBabySituationEdit(Model model, HttpSession session) {
        try {
            if (session.getAttribute("motherIdBD") != null) {
                int motherIdBD = (Integer) session.getAttribute("motherIdBD");
                String pcMotherNum = (String) session.getAttribute("pcMotherNum");
                String pcNewbornNum = pcMotherNum.substring(1);
                model.addAttribute("pcNewbornNum", "n" + pcNewbornNum);
                try {
                    int childIdBD = (Integer) session.getAttribute("childIdBD");
                    model.addAttribute("babySituation", basicDatabaseService.getBdBabySituation(childIdBD, motherIdBD));
                } catch (NullPointerException ignored) {}
                model.addAttribute("weightGainDuringPregnancy", basicDatabaseService.getBdWeightGainDuringPregnancy(motherIdBD));
                model.addAttribute("deliveryDate", basicDatabaseService.getDeliveryDate(motherIdBD));
                return "perinatalPlatform/basicDatabase/BS";
            }
        } catch (NullPointerException ignored) {}
        return "redirect:/perinatalPlatform/basicDatabase/write/MI";
    }

    // 基础数据库 宝宝情况 数据提交
    @PostMapping(value = "/write/BS/post")
    @ResponseBody
    public String bdBabySituationPost(HttpSession session,
                                      BDBabySituation bdBabySituation) {
        MyUserDetails userDetails = (MyUserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        int childId = 0;
        String pcMotherNum = null;
        try {
            if (session.getAttribute("childIdBD") != null) {
                childId = (Integer) session.getAttribute("childIdBD");
            }
        } catch (NullPointerException ignored) {}
        try {
            if (session.getAttribute("pcMotherNum") != null) {
                pcMotherNum = (String) session.getAttribute("pcMotherNum");
            }
        } catch (NullPointerException ignored) {}
        return basicDatabaseService.saveBDBS(session, bdBabySituation, childId, pcMotherNum, (Integer) session.getAttribute("motherIdBD"), userDetails.getUser().getHospitalId());
    }

    // 基础数据库 复苏情况 添加/编辑 页面
    @GetMapping(value = "/write/RS")
    public String bdRecoverySituationEdit(Model model, HttpSession session) {
        try {
            if (session.getAttribute("motherIdBD") != null) {
                try {
                    if (session.getAttribute("childIdBD") != null) {
                        int childIdBD = (Integer) session.getAttribute("childIdBD");
                        int motherIdBD = (Integer) session.getAttribute("motherIdBD");
                        model.addAttribute("birthday", basicDatabaseService.getBdBirthMsg(childIdBD, motherIdBD).getBirthday());
                        BDRecoverySituation bdRecoverySituation = basicDatabaseService.getBdRecoverySituation(childIdBD, motherIdBD);
                        boolean hasRecoveryMeasures = false;
                        try {
                            String recoveryMeasures = bdRecoverySituation.getRecoveryMeasures();
                            if (recoveryMeasures != null && recoveryMeasures.equals("有")) {
                                hasRecoveryMeasures = true;
                            }
                            model.addAttribute("recoverySituation", bdRecoverySituation);
                            model.addAttribute("hasRM", hasRecoveryMeasures);
                            model.addAttribute("rsDeathCauseList", basicDatabaseService.getBdRSDeathCause(childIdBD, motherIdBD));
                            model.addAttribute("rsDeformityList", basicDatabaseService.getBdRSDeformity(childIdBD, motherIdBD));
                        } catch (NullPointerException ignored) {}
                        return "perinatalPlatform/basicDatabase/RS";
                    }
                } catch (NullPointerException ignored) {}
                return "redirect:/perinatalPlatform/basicDatabase/write/BS";
            }
        } catch (NullPointerException ignored) {}
        return "redirect:/perinatalPlatform/basicDatabase/write/MI";
    }

    // 基础数据库 复苏情况 根据死因类型 获取死因诊断
    @GetMapping(value = "/getDeathCauseDiagnosis")
    @ResponseBody
    public String bdGetDeathCauseDiagnosis(@RequestParam("deathCauseClassificationId") String deathCauseClassificationIdString) {
        int deathCauseClassificationId = 0;
        if (deathCauseClassificationIdString != null && !deathCauseClassificationIdString.equals("")) {
            deathCauseClassificationId = Integer.parseInt(deathCauseClassificationIdString);
        }
        return basicDatabaseService.getBdDeathCauseDiagnosis(deathCauseClassificationId);
    }

    // 基础数据库 复苏情况 根据畸形系统 获取畸形类型
    @GetMapping(value = "/getDeformityType")
    @ResponseBody
    public String bdGetDeformityType(@RequestParam("deformitySystemId") String deformitySystemIdString) {
        int deformitySystemId = 0;
        if (deformitySystemIdString != null && !deformitySystemIdString.equals("")) {
            deformitySystemId = Integer.parseInt(deformitySystemIdString);
        }
        return basicDatabaseService.getBdDeformityType(deformitySystemId);
    }

    // 基础数据库 复苏情况 数据提交
    @PostMapping(value = "/write/RS/post")
    @ResponseBody
    public String bdRecoverySituationPost(HttpSession session,
                                          @RequestParam(value = "deathCauseArray", required = false) String deathCauseArray,
                                          @RequestParam(value = "deformityArray", required = false) String deformityArray,
                                          BDRecoverySituation bdRecoverySituation) {
        return basicDatabaseService.saveBDRS(bdRecoverySituation, deathCauseArray, deformityArray, (Integer) session.getAttribute("motherIdBD"), (Integer) session.getAttribute("childIdBD"));
    }

    // 基础数据库 危重评估 添加/编辑 页面
    @GetMapping(value = "/write/CA")
    public String bdCriticalAssessmentEdit(Model model, HttpSession session) {
        try {
            if (session.getAttribute("motherIdBD") != null) {
                try {
                    if (session.getAttribute("childIdBD") != null) {
                        int childIdBD = (Integer) session.getAttribute("childIdBD");
                        int motherIdBD = (Integer) session.getAttribute("motherIdBD");
                        model.addAttribute("caMsg", basicDatabaseService.getBdCAMsg(childIdBD, motherIdBD));
                        model.addAttribute("criticalAssessment", basicDatabaseService.getBdCriticalAssessment(childIdBD, motherIdBD));
                        return "perinatalPlatform/basicDatabase/CA";
                    }
                } catch (NullPointerException ignored) {}
                return "redirect:/perinatalPlatform/basicDatabase/write/BS";
            }
        } catch (NullPointerException ignored) {}
        return "redirect:/perinatalPlatform/basicDatabase/write/MI";
    }

    // 基础数据库 危重评估 数据提交
    @PostMapping(value = "/write/CA/post")
    @ResponseBody
    public String bdCriticalAssessmentPost(HttpSession session,
                                           BDCriticalAssessment bdCriticalAssessment) {
        return basicDatabaseService.saveBDCA(bdCriticalAssessment, (Integer) session.getAttribute("childIdBD"), (Integer) session.getAttribute("motherIdBD"));
    }

    // 基础数据库 循环系统 添加/编辑 页面
    @GetMapping(value = "/write/CS")
    public String bdCirculatorySystemEdit(Model model, HttpSession session) {
        try {
            if (session.getAttribute("motherIdBD") != null) {
                try {
                    if (session.getAttribute("childIdBD") != null) {
                        int childIdBD = (Integer) session.getAttribute("childIdBD");
                        int motherIdBD = (Integer) session.getAttribute("motherIdBD");
                        model.addAttribute("circulatorySystem", basicDatabaseService.getBdCirculatorySystem(childIdBD, motherIdBD));
                        model.addAttribute("csPdaUltrasoundList", basicDatabaseService.getBdCsPdaUltrasoundList(childIdBD, motherIdBD));
                        model.addAttribute("csPdaTreatmentList", basicDatabaseService.getBdCsPdaTreatmentList(childIdBD, motherIdBD));
                        return "perinatalPlatform/basicDatabase/CS";
                    }
                } catch (NullPointerException ignored) {}
                return "redirect:/perinatalPlatform/basicDatabase/write/BS";
            }
        } catch (NullPointerException ignored) {}
        return "redirect:/perinatalPlatform/basicDatabase/write/MI";
    }

    // 基础数据库 循环系统 数据提交
    @PostMapping(value = "/write/CS/post")
    @ResponseBody
    public String bdCirculatorySystemPost(HttpSession session,
                                          BDCirculatorySystem bdCirculatorySystem,
                                          @RequestParam("pdaUArray") String pdaUArray,
                                          @RequestParam("pdaArray") String pdaArray) {
        return basicDatabaseService.saveBDCS(bdCirculatorySystem, pdaUArray, pdaArray, (Integer) session.getAttribute("childIdBD"), (Integer) session.getAttribute("motherIdBD"));
    }

    // 基础数据库 视网膜病 筛查情况 添加/编辑 页面
    @GetMapping(value = "/write/RP/SS")
    public String bdRpScreeningStatusEdit(Model model, HttpSession session) {
        try {
            if (session.getAttribute("motherIdBD") != null) {
                try {
                    if (session.getAttribute("childIdBD") != null) {
                        int childIdBD = (Integer) session.getAttribute("childIdBD");
                        int motherIdBD = (Integer) session.getAttribute("motherIdBD");
                        BDBirthMsg birthMsg = basicDatabaseService.getBdBirthMsg(childIdBD, motherIdBD);
                        if (birthMsg != null) {
                            model.addAttribute("msg", birthMsg);
                        } else {
                            throw new NullPointerException();
                        }
                        model.addAttribute("screeningStatus", basicDatabaseService.getBdRpScreeningStatus(childIdBD, motherIdBD));
                        model.addAttribute("ssList", basicDatabaseService.getBdRpSsList(childIdBD, motherIdBD));
                        return "perinatalPlatform/basicDatabase/retinopathy/SS";
                    }
                } catch (NullPointerException ignored) {}
                return "redirect:/perinatalPlatform/basicDatabase/write/BS";
            }
        } catch (NullPointerException ignored) {}
        return "redirect:/perinatalPlatform/basicDatabase/write/MI";
    }

    // 基础数据库 视网膜病 筛查情况 治疗及诊断 数据提交
    @PostMapping(value = "/write/RP/SS/post")
    @ResponseBody
    public String bdRpScreeningStatusPost(HttpSession session,
                                          BDRPScreeningStatus bdRpScreeningStatus,
                                          @RequestParam("ssArray") String ssArray) {
        return basicDatabaseService.saveBDRPSS(bdRpScreeningStatus, ssArray, (Integer) session.getAttribute("childIdBD"), (Integer) session.getAttribute("motherIdBD"));
    }

    // 基础数据库 视网膜病 筛查评估 添加/编辑 页面
    @GetMapping(value = "/write/RP/SA")
    public String bdRpScreeningAssessmentEdit(Model model, HttpSession session) {
        try {
            if (session.getAttribute("motherIdBD") != null) {
                try {
                    if (session.getAttribute("childIdBD") != null) {
                        int childIdBD = (Integer) session.getAttribute("childIdBD");
                        int motherIdBD = (Integer) session.getAttribute("motherIdBD");
                        model.addAttribute("cga45WeekDate", basicDatabaseService.get45WeekDate(childIdBD, motherIdBD));
                        model.addAttribute("screeningAssessment", basicDatabaseService.getBdRpScreeningAssessment(childIdBD, motherIdBD));
                        return "perinatalPlatform/basicDatabase/retinopathy/SA";
                    }
                } catch (NullPointerException ignored) {}
                return "redirect:/perinatalPlatform/basicDatabase/write/BS";
            }
        } catch (NullPointerException ignored) {}
        return "redirect:/perinatalPlatform/basicDatabase/write/MI";
    }

    // 基础数据库 视网膜病 筛查评估 数据提交
    @PostMapping(value = "/write/RP/SA/post")
    @ResponseBody
    public String bdRpScreeningAssessmentPost(HttpSession session,
                                              BDRPScreeningAssessment bdRpScreeningAssessment) {
        return basicDatabaseService.saveBDRPSA(bdRpScreeningAssessment, (Integer) session.getAttribute("childIdBD"), (Integer) session.getAttribute("motherIdBD"));
    }

    // 基础数据库 视网膜病 ROP诊断 添加/编辑 页面
    @GetMapping(value = "/write/RP/ROP")
    public String bdRpRopDiagnosisEdit(Model model, HttpSession session) {
        try {
            if (session.getAttribute("motherIdBD") != null) {
                try {
                    if (session.getAttribute("childIdBD") != null) {
                        int childIdBD = (Integer) session.getAttribute("childIdBD");
                        int motherIdBD = (Integer) session.getAttribute("motherIdBD");
                        model.addAttribute("ropDiagnosis", basicDatabaseService.getBdRpRopDiagnosis(childIdBD, motherIdBD));
                        return "perinatalPlatform/basicDatabase/retinopathy/ROP";
                    }
                } catch (NullPointerException ignored) {}
                return "redirect:/perinatalPlatform/basicDatabase/write/BS";
            }
        } catch (NullPointerException ignored) {}
        return "redirect:/perinatalPlatform/basicDatabase/write/MI";
    }

    // 基础数据库 视网膜病 ROP诊断 数据提交
    @PostMapping(value = "/write/RP/ROP/post")
    @ResponseBody
    public String bdRpRopDiagnosisPost(HttpSession session,
                                       BDRPRopDiagnosis bdRpRopDiagnosis) {
        return basicDatabaseService.saveBDRPROP(bdRpRopDiagnosis, (Integer) session.getAttribute("childIdBD"), (Integer) session.getAttribute("motherIdBD"));
    }

    // 基础数据库 出院情况 添加/编辑 页面
    @GetMapping(value = "/write/DS")
    public String bdDischargeSituationEdit(Model model, HttpSession session) {
        try {
            if (session.getAttribute("motherIdBD") != null) {
                try {
                    if (session.getAttribute("childIdBD") != null) {
                        int childIdBD = (Integer) session.getAttribute("childIdBD");
                        int motherIdBD = (Integer) session.getAttribute("motherIdBD");
                        BDBirthMsg birthMsg = basicDatabaseService.getBdBirthMsg(childIdBD, motherIdBD);
                        if (birthMsg != null) {
                            model.addAttribute("birthMsg", birthMsg);
                        } else {
                            throw new NullPointerException();
                        }
                        model.addAttribute("ectopicGrowthRetardation", basicDatabaseService.getBdEctopicGrowthRetardation(childIdBD, motherIdBD));
                        model.addAttribute("dischargeSituation", basicDatabaseService.getBdDischargeSituation(childIdBD, motherIdBD));
                        model.addAttribute("rsDeathCauseList", basicDatabaseService.getBdRSDeathCause(childIdBD, motherIdBD));
                        return "perinatalPlatform/basicDatabase/DS";
                    }
                } catch (NullPointerException ignored) {}
                return "redirect:/perinatalPlatform/basicDatabase/write/BS";
            }
        } catch (NullPointerException ignored) {}
        return "redirect:/perinatalPlatform/basicDatabase/write/MI";
    }

    // 基础数据库 出院情况 数据提交
    @PostMapping(value = "/write/DS/post")
    @ResponseBody
    public String bdDischargeSituationPost(HttpSession session,
                                           @RequestParam(value = "deathCauseArray", required = false) String deathCauseArray,
                                           BDDischargeSituation bdDischargeSituation) {
        return basicDatabaseService.saveBDDS(bdDischargeSituation, deathCauseArray, (Integer) session.getAttribute("childIdBD"), (Integer) session.getAttribute("motherIdBD"));
    }

    // 基础数据库 病例审核 页面
    @GetMapping(value = "/review")
    public String basicDatabaseReview(Model model, HttpSession session) {
        try {
            if (session.getAttribute("motherIdBD") != null) {
                try {
                    if (session.getAttribute("childIdBD") != null) {
                        int childIdBD = (Integer) session.getAttribute("childIdBD");
                        int motherIdBD = (Integer) session.getAttribute("motherIdBD");
                        model.addAttribute("caseStatus", basicDatabaseService.getBdCaseStatus(childIdBD, motherIdBD));
                        model.addAttribute("reviewCount", basicDatabaseService.getBdReviewCount(childIdBD, motherIdBD));
                        model.addAttribute("reviewList", basicDatabaseService.getBdReview(childIdBD, motherIdBD));
                        return "perinatalPlatform/basicDatabase/BDReview";
                    }
                } catch (NullPointerException ignored) {
                }
                return "redirect:/perinatalPlatform/basicDatabase/write/BS";
            }
        } catch (NullPointerException ignored) {}
        return "redirect:/perinatalPlatform/basicDatabase/write/MI";
    }

    // 基础数据库 病例审核 信息提交
    @PostMapping(value = "/review/post")
    @ResponseBody
    public String basicDatabaseReviewPost(HttpSession session,
                                          Review nsReview) {
        nsReview.setCid((Integer) session.getAttribute("childIdBD"));
        nsReview.setMid((Integer) session.getAttribute("motherIdBD"));
        return basicDatabaseService.addBdReview(nsReview);
    }
}