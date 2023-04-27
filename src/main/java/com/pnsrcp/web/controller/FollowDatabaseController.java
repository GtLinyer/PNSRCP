package com.pnsrcp.web.controller;

import com.pnsrcp.web.config.MyUserDetails;
import com.pnsrcp.web.entity.manage.User;
import com.pnsrcp.web.entity.perintalPlatform.CaseStatus;
import com.pnsrcp.web.entity.perintalPlatform.Review;
import com.pnsrcp.web.entity.perintalPlatform.followDatabase.FDFollowInformation;
import com.pnsrcp.web.entity.perintalPlatform.followDatabase.FDGcBlSummary;
import com.pnsrcp.web.entity.perintalPlatform.followDatabase.FDGcBwSummary;
import com.pnsrcp.web.entity.perintalPlatform.followDatabase.FDGcHcSummary;
import com.pnsrcp.web.service.FollowDatabaseService;
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
 * @Date: 2022/06/02 17:59 星期四
 * @Description: 随访数据库 控制层
 */
@Controller
@RequestMapping("/perinatalPlatform/followDatabase")
public class FollowDatabaseController {
    // 服务层 注入
    @Resource
    private FollowDatabaseService followDatabaseService;

    // 随访数据库 随访信息 添加/编辑 页面
    @GetMapping(value = "/write/FI")
    public String fdFollowInformationEdit(Model model, HttpSession session) {
        try {
            if (session.getAttribute("motherIdBD") != null) {
                try {
                    if (session.getAttribute("childIdBD") != null) {
                        int childIdBD = (Integer) session.getAttribute("childIdBD");
                        int motherIdBD = (Integer) session.getAttribute("motherIdBD");
                        model.addAttribute("fiMsg", followDatabaseService.getFdFiMsg(childIdBD, motherIdBD));
                        model.addAttribute("childIdCardName", followDatabaseService.getFdChildIdCardName(childIdBD, motherIdBD));
                        return "perinatalPlatform/followDatabase/FI";
                    }
                } catch (NullPointerException ignored) {}
                return "redirect:/perinatalPlatform/basicDatabase/write/BS";
            }
        } catch (NullPointerException ignored) {}
        return "redirect:/perinatalPlatform/basicDatabase/write/MI";
    }

    // 随访数据库 随访信息 保存 预产期
    @PostMapping(value = "/write/FI/post")
    @ResponseBody
    public String fdHypothermiaQIPost(HttpSession session, FDFollowInformation fdFollowInformation) {
        MyUserDetails userDetails = (MyUserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        User user = userDetails.getUser();
        return followDatabaseService.saveFDFI(fdFollowInformation, (Integer) session.getAttribute("childIdBD"), (Integer) session.getAttribute("motherIdBD"), user.getUid(), user.getHospitalId());
    }

    // 随访数据库 生长曲线 体重 添加/编辑 页面
    @GetMapping(value = "/write/GC/BW")
    public String fdGcBodyWeightEdit(Model model, HttpSession session) {
        try {
            if (session.getAttribute("motherIdBD") != null) {
                try {
                    if (session.getAttribute("childIdBD") != null) {
                        int childIdBD = (Integer) session.getAttribute("childIdBD");
                        int motherIdBD = (Integer) session.getAttribute("motherIdBD");
                        model.addAttribute("birthMsg", followDatabaseService.getFdGcBirthMsg(childIdBD, motherIdBD));
                        model.addAttribute("bwSummary", followDatabaseService.getFdGcBwSummary(childIdBD, motherIdBD));
                        model.addAttribute("wcList", followDatabaseService.getFdGcBodyWeightCheck(childIdBD, motherIdBD));
                        return "perinatalPlatform/followDatabase/growthCurve/BW";
                    }
                } catch (NullPointerException ignored) {}
                return "redirect:/perinatalPlatform/basicDatabase/write/BS";
            }
        } catch (NullPointerException ignored) {}
        return "redirect:/perinatalPlatform/basicDatabase/write/MI";
    }

    // 随访数据库 生长曲线 获取 Fenton曲线 体重数据
    @GetMapping(value = "/write/GC/BW/fentonData")
    @ResponseBody
    public String fdGcBwFentonData(HttpSession session) {
        return followDatabaseService.getFdGcBwFentonData((Integer) session.getAttribute("childIdBD"), (Integer) session.getAttribute("motherIdBD"));
    }

    // 随访数据库 生长曲线 体重 数据提交
    @PostMapping(value = "/write/GC/BW/post")
    @ResponseBody
    public String fdGcBodyWeightPost(HttpSession session,
                                     FDGcBwSummary bwSummary,
                                     @RequestParam(value = "wcArray") String wcArray) {
        return followDatabaseService.saveFDGCBW(bwSummary, wcArray, (Integer) session.getAttribute("childIdBD"), (Integer) session.getAttribute("motherIdBD"));
    }

    // 随访数据库 生长曲线 身长 添加/编辑 页面
    @GetMapping(value = "/write/GC/BL")
    public String fdGcBodyLengthEdit(Model model, HttpSession session) {
        try {
            if (session.getAttribute("motherIdBD") != null) {
                try {
                    if (session.getAttribute("childIdBD") != null) {
                        int childIdBD = (Integer) session.getAttribute("childIdBD");
                        int motherIdBD = (Integer) session.getAttribute("motherIdBD");
                        model.addAttribute("birthMsg", followDatabaseService.getFdGcBirthMsg(childIdBD, motherIdBD));
                        model.addAttribute("blSummary", followDatabaseService.getFdGcBlSummary(childIdBD, motherIdBD));
                        model.addAttribute("lcList", followDatabaseService.getFdGcBodyLength(childIdBD, motherIdBD));
                        return "perinatalPlatform/followDatabase/growthCurve/BL";
                    }
                } catch (NullPointerException ignored) {}
                return "redirect:/perinatalPlatform/basicDatabase/write/BS";
            }
        } catch (NullPointerException ignored) {}
        return "redirect:/perinatalPlatform/basicDatabase/write/MI";
    }

    // 随访数据库 生长曲线 身长 数据提交
    @PostMapping(value = "/write/GC/BL/post")
    @ResponseBody
    public String fdGcBodyLengthPost(HttpSession session,
                                     FDGcBlSummary blSummary,
                                     @RequestParam(value = "lcArray") String lcArray) {
        return followDatabaseService.saveFDGCBL(blSummary, lcArray, (Integer) session.getAttribute("childIdBD"), (Integer) session.getAttribute("motherIdBD"));
    }

    // 随访数据库 生长曲线 头围 添加/编辑 页面
    @GetMapping(value = "/write/GC/HC")
    public String fdGcHeadCircumferenceEdit(Model model, HttpSession session) {
        try {
            if (session.getAttribute("motherIdBD") != null) {
                try {
                    if (session.getAttribute("childIdBD") != null) {
                        int childIdBD = (Integer) session.getAttribute("childIdBD");
                        int motherIdBD = (Integer) session.getAttribute("motherIdBD");
                        model.addAttribute("birthMsg", followDatabaseService.getFdGcBirthMsg(childIdBD, motherIdBD));
                        model.addAttribute("hcSummary", followDatabaseService.getFdGcHcSummary(childIdBD, motherIdBD));
                        model.addAttribute("hcList", followDatabaseService.getFdGcHeadCircumference(childIdBD, motherIdBD));
                        return "perinatalPlatform/followDatabase/growthCurve/HC";
                    }
                } catch (NullPointerException ignored) {}
                return "redirect:/perinatalPlatform/basicDatabase/write/BS";
            }
        } catch (NullPointerException ignored) {}
        return "redirect:/perinatalPlatform/basicDatabase/write/MI";
    }

    // 随访数据库 生长曲线 头围 数据提交
    @PostMapping(value = "/write/GC/HC/post")
    @ResponseBody
    public String fdGcHeadCircumferencePost(HttpSession session,
                                            FDGcHcSummary hcSummary,
                                            @RequestParam(value = "hcArray") String lcArray) {
        return followDatabaseService.saveFDGCHC(hcSummary, lcArray, (Integer) session.getAttribute("childIdBD"), (Integer) session.getAttribute("motherIdBD"));
    }

    // 随访数据库 生长曲线 喂养 添加/编辑 页面
    @GetMapping(value = "/write/GC/FD")
    public String fdGcFeedEdit(Model model, HttpSession session) {
        try {
            if (session.getAttribute("motherIdBD") != null) {
                try {
                    if (session.getAttribute("childIdBD") != null) {
                        int childIdBD = (Integer) session.getAttribute("childIdBD");
                        int motherIdBD = (Integer) session.getAttribute("motherIdBD");
                        model.addAttribute("birthMsg", followDatabaseService.getFdGcBirthMsg(childIdBD, motherIdBD));
                        model.addAttribute("feedingRecordNumber", followDatabaseService.getFdGcFeedingRecordNumber(childIdBD, motherIdBD));
                        model.addAttribute("frList", followDatabaseService.getFdGcFeedingRecord(childIdBD, motherIdBD));
                        return "perinatalPlatform/followDatabase/growthCurve/FD";
                    }
                } catch (NullPointerException ignored) {}
                return "redirect:/perinatalPlatform/basicDatabase/write/BS";
            }
        } catch (NullPointerException ignored) {}
        return "redirect:/perinatalPlatform/basicDatabase/write/MI";
    }

    // 随访数据库 生长曲线 喂养 数据提交
    @PostMapping(value = "/write/GC/FD/post")
    @ResponseBody
    public String fdGcFeedPost(HttpSession session,
                               @RequestParam(value = "feedingRecordNumber") String feedingRecordNumber,
                               @RequestParam(value = "frArray") String frArray) {
        return followDatabaseService.saveFDGCFD(feedingRecordNumber, frArray, (Integer) session.getAttribute("childIdBD"), (Integer) session.getAttribute("motherIdBD"));
    }

    // 随访数据库 生长曲线 生长评估 0到12月 添加/编辑 页面
    @GetMapping(value = "/write/GC/GA/0mTo12m")
    public String fdGcGrowthAssessment1Edit(Model model, HttpSession session) {
        try {
            if (session.getAttribute("motherIdBD") != null) {
                try {
                    if (session.getAttribute("childIdBD") != null) {
                        int childIdBD = (Integer) session.getAttribute("childIdBD");
                        int motherIdBD = (Integer) session.getAttribute("motherIdBD");
                        model.addAttribute("birthMsg", followDatabaseService.getFdGcBirthMsg(childIdBD, motherIdBD));
                        return "perinatalPlatform/followDatabase/growthCurve/GA1";
                    }
                } catch (NullPointerException ignored) {}
                return "redirect:/perinatalPlatform/basicDatabase/write/BS";
            }
        } catch (NullPointerException ignored) {}
        return "redirect:/perinatalPlatform/basicDatabase/write/MI";
    }

    // 随访数据库 生长曲线 生长评估 获取 体重数据
    @GetMapping(value = "/write/GC/GA/getBodyWeight")
    @ResponseBody
    public String fdGcGetBodyWeightData(HttpSession session) {
        return followDatabaseService.getFdGcGetBodyWeight((Integer) session.getAttribute("childIdBD"), (Integer) session.getAttribute("motherIdBD"));
    }

    // 随访数据库 生长曲线 生长评估 获取 身长数据
    @GetMapping(value = "/write/GC/GA/getBodyLength")
    @ResponseBody
    public String fdGcGetBodyLengthData(HttpSession session) {
        return followDatabaseService.getFdGcGetBodyLength((Integer) session.getAttribute("childIdBD"), (Integer) session.getAttribute("motherIdBD"));
    }

    // 随访数据库 生长曲线 生长评估 获取 头围数据
    @GetMapping(value = "/write/GC/GA/getHeadCircumference")
    @ResponseBody
    public String fdGcGetHeadCircumferenceData(HttpSession session) {
        return followDatabaseService.getFdGcGetHeadCircumference((Integer) session.getAttribute("childIdBD"), (Integer) session.getAttribute("motherIdBD"));
    }

    // 随访数据库 生长曲线 生长评估 获取 喂养数据
    @GetMapping(value = "/write/GC/GA/getFeeding")
    @ResponseBody
    public String fdGcGetFeedingData(HttpSession session) {
        return followDatabaseService.getFdGcGetFeeding((Integer) session.getAttribute("childIdBD"), (Integer) session.getAttribute("motherIdBD"));
    }

    // 随访数据库 生长曲线 生长评估 0到12月 数据提交
    @PostMapping(value = "/write/GC/GA/0mTo12m/post")
    @ResponseBody
    public String fdGcGrowthAssessment1Post(HttpSession session,
                                            @RequestParam(value = "gaArray") String gaArray) {
        return followDatabaseService.saveFDGCGA1(gaArray, (Integer) session.getAttribute("childIdBD"), (Integer) session.getAttribute("motherIdBD"));
    }

    // 随访数据库 生长曲线 生长评估 13月到6岁 添加/编辑 页面
    @GetMapping(value = "/write/GC/GA/13mTo6y")
    public String fdGcGrowthAssessment2Edit(Model model, HttpSession session) {
        try {
            if (session.getAttribute("motherIdBD") != null) {
                try {
                    if (session.getAttribute("childIdBD") != null) {
                        int childIdBD = (Integer) session.getAttribute("childIdBD");
                        int motherIdBD = (Integer) session.getAttribute("motherIdBD");
                        model.addAttribute("birthMsg", followDatabaseService.getFdGcBirthMsg(childIdBD, motherIdBD));
                        return "perinatalPlatform/followDatabase/growthCurve/GA2";
                    }
                } catch (NullPointerException ignored) {}
                return "redirect:/perinatalPlatform/basicDatabase/write/BS";
            }
        } catch (NullPointerException ignored) {}
        return "redirect:/perinatalPlatform/basicDatabase/write/MI";
    }

    // 随访数据库 生长曲线 生长评估 13月到6岁 数据提交
    @PostMapping(value = "/write/GC/GA/13mTo6y/post")
    @ResponseBody
    public String fdGcGrowthAssessment3Post(HttpSession session,
                                            @RequestParam(value = "gaArray") String gaArray) {
        return followDatabaseService.saveFDGCGA2(gaArray, (Integer) session.getAttribute("childIdBD"), (Integer) session.getAttribute("motherIdBD"));
    }

    // 随访数据库 生长曲线 营养 添加/编辑 页面
    @GetMapping(value = "/write/GC/NT")
    public String fdGcNutritionEdit(Model model, HttpSession session) {
        try {
            if (session.getAttribute("motherIdBD") != null) {
                try {
                    if (session.getAttribute("childIdBD") != null) {
                        int childIdBD = (Integer) session.getAttribute("childIdBD");
                        int motherIdBD = (Integer) session.getAttribute("motherIdBD");
                        model.addAttribute("birthMsg", followDatabaseService.getFdGcBirthMsg(childIdBD, motherIdBD));
                        model.addAttribute("nutritionRecordNumber", followDatabaseService.getFdGcNutritionRecordNumber(childIdBD, motherIdBD));
                        model.addAttribute("nrList", followDatabaseService.getFdGcNutritionRecord(childIdBD, motherIdBD));
                        return "perinatalPlatform/followDatabase/growthCurve/NT";
                    }
                } catch (NullPointerException ignored) {}
                return "redirect:/perinatalPlatform/basicDatabase/write/BS";
            }
        } catch (NullPointerException ignored) {}
        return "redirect:/perinatalPlatform/basicDatabase/write/MI";
    }

    // 随访数据库 生长曲线 喂养 数据提交
    @PostMapping(value = "/write/GC/NT/post")
    @ResponseBody
    public String fdGcNutritionPost(HttpSession session,
                                    @RequestParam(value = "nutritionRecordNumber") String nutritionRecordNumber,
                                    @RequestParam(value = "nrArray") String nrArray) {
        return followDatabaseService.saveFDGCNT(nutritionRecordNumber, nrArray, (Integer) session.getAttribute("childIdBD"), (Integer) session.getAttribute("motherIdBD"));
    }

    // 随访数据库 发育水平 视力 添加/编辑 页面
    @GetMapping(value = "/write/DL/VI")
    public String fdDlVisionEdit(Model model, HttpSession session) {
        try {
            if (session.getAttribute("motherIdBD") != null) {
                try {
                    if (session.getAttribute("childIdBD") != null) {
                        int childIdBD = (Integer) session.getAttribute("childIdBD");
                        int motherIdBD = (Integer) session.getAttribute("motherIdBD");
                        model.addAttribute("birthMsg", followDatabaseService.getFdGcBirthMsg(childIdBD, motherIdBD));
                        model.addAttribute("visionCheckNumber", followDatabaseService.getFdDlVisionCheckNumber(childIdBD, motherIdBD));
                        model.addAttribute("vcList", followDatabaseService.getFdDlVisionCheck(childIdBD, motherIdBD));
                        return "perinatalPlatform/followDatabase/developmentalLevel/VI";
                    }
                } catch (NullPointerException ignored) {}
                return "redirect:/perinatalPlatform/basicDatabase/write/BS";
            }
        } catch (NullPointerException ignored) {}
        return "redirect:/perinatalPlatform/basicDatabase/write/MI";
    }

    // 随访数据库 发育水平 视力 数据提交
    @PostMapping(value = "/write/DL/VI/post")
    @ResponseBody
    public String fdDlVisionPost(HttpSession session,
                                 @RequestParam(value = "visionCheckNumber") String visionCheckNumber,
                                 @RequestParam(value = "vcArray") String vcArray) {
        return followDatabaseService.saveFDDLVI(visionCheckNumber, vcArray, (Integer) session.getAttribute("childIdBD"), (Integer) session.getAttribute("motherIdBD"));
    }

    // 随访数据库 发育水平 听力 添加/编辑 页面
    @GetMapping(value = "/write/DL/HR")
    public String fdDlHearingEdit(Model model, HttpSession session) {
        try {
            if (session.getAttribute("motherIdBD") != null) {
                try {
                    if (session.getAttribute("childIdBD") != null) {
                        int childIdBD = (Integer) session.getAttribute("childIdBD");
                        int motherIdBD = (Integer) session.getAttribute("motherIdBD");
                        model.addAttribute("birthMsg", followDatabaseService.getFdGcBirthMsg(childIdBD, motherIdBD));
                        model.addAttribute("hearingCheckNumber", followDatabaseService.getFdDlHearingCheckNumber(childIdBD, motherIdBD));
                        model.addAttribute("hcList", followDatabaseService.getFdDlHearingCheck(childIdBD, motherIdBD));
                        return "perinatalPlatform/followDatabase/developmentalLevel/HR";
                    }
                } catch (NullPointerException ignored) {}
                return "redirect:/perinatalPlatform/basicDatabase/write/BS";
            }
        } catch (NullPointerException ignored) {}
        return "redirect:/perinatalPlatform/basicDatabase/write/MI";
    }

    // 随访数据库 发育水平 听力 数据提交
    @PostMapping(value = "/write/DL/HR/post")
    @ResponseBody
    public String fdDlHearingPost(HttpSession session,
                                  @RequestParam(value = "hearingCheckNumber") String hearingCheckNumber,
                                  @RequestParam(value = "hcArray") String hcArray) {
        return followDatabaseService.saveFDDLHR(hearingCheckNumber, hcArray, (Integer) session.getAttribute("childIdBD"), (Integer) session.getAttribute("motherIdBD"));
    }

    // 随访数据库 发育水平 Gesell量表 添加/编辑 页面
    @GetMapping(value = "/write/DL/GS")
    public String fdDlGesellEdit(Model model, HttpSession session) {
        try {
            if (session.getAttribute("motherIdBD") != null) {
                try {
                    if (session.getAttribute("childIdBD") != null) {
                        int childIdBD = (Integer) session.getAttribute("childIdBD");
                        int motherIdBD = (Integer) session.getAttribute("motherIdBD");
                        model.addAttribute("birthMsg", followDatabaseService.getFdGcBirthMsg(childIdBD, motherIdBD));
                        model.addAttribute("gesellCheckNumber", followDatabaseService.getFdDlGesellCheckNumber(childIdBD, motherIdBD));
                        model.addAttribute("gcList", followDatabaseService.getFdDlGesellCheck(childIdBD, motherIdBD));
                        return "perinatalPlatform/followDatabase/developmentalLevel/GS";
                    }
                } catch (NullPointerException ignored) {}
                return "redirect:/perinatalPlatform/basicDatabase/write/BS";
            }
        } catch (NullPointerException ignored) {}
        return "redirect:/perinatalPlatform/basicDatabase/write/MI";
    }

    // 随访数据库 发育水平 Gesell量表 数据提交
    @PostMapping(value = "/write/DL/GS/post")
    @ResponseBody
    public String fdDlGesellPost(HttpSession session,
                                 @RequestParam(value = "gesellCheckNumber") String gesellCheckNumber,
                                 @RequestParam(value = "gcArray") String gcArray) {
        return followDatabaseService.saveFDDLGS(gesellCheckNumber, gcArray, (Integer) session.getAttribute("childIdBD"), (Integer) session.getAttribute("motherIdBD"));
    }

    // 随访数据库 发育水平 Griffiths量表 添加/编辑 页面
    @GetMapping(value = "/write/DL/GF")
    public String fdDlGriffithsEdit(Model model, HttpSession session) {
        try {
            if (session.getAttribute("motherIdBD") != null) {
                try {
                    if (session.getAttribute("childIdBD") != null) {
                        int childIdBD = (Integer) session.getAttribute("childIdBD");
                        int motherIdBD = (Integer) session.getAttribute("motherIdBD");
                        model.addAttribute("birthMsg", followDatabaseService.getFdGcBirthMsg(childIdBD, motherIdBD));
                        model.addAttribute("griffithsCheckNumber", followDatabaseService.getFdDlGriffithsCheckNumber(childIdBD, motherIdBD));
                        model.addAttribute("gcList", followDatabaseService.getFdDlGriffithsCheck(childIdBD, motherIdBD));
                        return "perinatalPlatform/followDatabase/developmentalLevel/GF";
                    }
                } catch (NullPointerException ignored) {}
                return "redirect:/perinatalPlatform/basicDatabase/write/BS";
            }
        } catch (NullPointerException ignored) {}
        return "redirect:/perinatalPlatform/basicDatabase/write/MI";
    }

    // 随访数据库 发育水平 Griffiths量表 数据提交
    @PostMapping(value = "/write/DL/GF/post")
    @ResponseBody
    public String fdDlGriffithsPost(HttpSession session,
                                    @RequestParam(value = "griffithsCheckNumber") String griffithsCheckNumber,
                                    @RequestParam(value = "gcArray") String gcArray) {
        return followDatabaseService.saveFDDLGF(griffithsCheckNumber, gcArray, (Integer) session.getAttribute("childIdBD"), (Integer) session.getAttribute("motherIdBD"));
    }

    // 随访数据库 发育水平 GMFCS 添加/编辑 页面
    @GetMapping(value = "/write/DL/GM")
    public String fdDlGmfcsEdit(Model model, HttpSession session) {
        try {
            if (session.getAttribute("motherIdBD") != null) {
                try {
                    if (session.getAttribute("childIdBD") != null) {
                        int childIdBD = (Integer) session.getAttribute("childIdBD");
                        int motherIdBD = (Integer) session.getAttribute("motherIdBD");
                        model.addAttribute("birthMsg", followDatabaseService.getFdGcBirthMsg(childIdBD, motherIdBD));
                        model.addAttribute("gmfcsCheckNumber", followDatabaseService.getFdDlGmfcsCheckNumber(childIdBD, motherIdBD));
                        model.addAttribute("gcList", followDatabaseService.getFdDlGmfcsCheck(childIdBD, motherIdBD));
                        return "perinatalPlatform/followDatabase/developmentalLevel/GMFCS";
                    }
                } catch (NullPointerException ignored) {}
                return "redirect:/perinatalPlatform/basicDatabase/write/BS";
            }
        } catch (NullPointerException ignored) {}
        return "redirect:/perinatalPlatform/basicDatabase/write/MI";
    }

    // 随访数据库 发育水平 GMFCS 数据提交
    @PostMapping(value = "/write/DL/GM/post")
    @ResponseBody
    public String fdDlGmfcsPost(HttpSession session,
                                @RequestParam(value = "gmfcsCheckNumber") String gmfcsCheckNumber,
                                @RequestParam(value = "gcArray") String gcArray) {
        return followDatabaseService.saveFDDLGM(gmfcsCheckNumber, gcArray, (Integer) session.getAttribute("childIdBD"), (Integer) session.getAttribute("motherIdBD"));
    }

    // 随访数据库 发育水平 CBCL量表 添加/编辑 页面
    @GetMapping(value = "/write/DL/CB")
    public String fdDlCbclEdit(Model model, HttpSession session) {
        try {
            if (session.getAttribute("motherIdBD") != null) {
                try {
                    if (session.getAttribute("childIdBD") != null) {
                        int childIdBD = (Integer) session.getAttribute("childIdBD");
                        int motherIdBD = (Integer) session.getAttribute("motherIdBD");
                        model.addAttribute("birthMsg", followDatabaseService.getFdGcBirthMsg(childIdBD, motherIdBD));
                        model.addAttribute("cbclCheckNumber", followDatabaseService.getFdDlCbclCheckNumber(childIdBD, motherIdBD));
                        model.addAttribute("ccList", followDatabaseService.getFdDlCbclCheck(childIdBD, motherIdBD));
                        return "perinatalPlatform/followDatabase/developmentalLevel/CBCL";
                    }
                } catch (NullPointerException ignored) {}
                return "redirect:/perinatalPlatform/basicDatabase/write/BS";
            }
        } catch (NullPointerException ignored) {}
        return "redirect:/perinatalPlatform/basicDatabase/write/MI";
    }

    // 随访数据库 发育水平 CBCL量表 数据提交
    @PostMapping(value = "/write/DL/CB/post")
    @ResponseBody
    public String fdDlCbclPost(HttpSession session,
                               @RequestParam(value = "cbclCheckNumber") String cbclCheckNumber,
                               @RequestParam(value = "ccArray") String ccArray) {
        return followDatabaseService.saveFDDLCB(cbclCheckNumber, ccArray, (Integer) session.getAttribute("childIdBD"), (Integer) session.getAttribute("motherIdBD"));
    }

    // 随访数据库 成长历程 门诊就诊 添加/编辑 页面
    @GetMapping(value = "/write/GP/OV")
    public String fdGpOutpatientVisitEdit(Model model, HttpSession session) {
        try {
            if (session.getAttribute("motherIdBD") != null) {
                try {
                    if (session.getAttribute("childIdBD") != null) {
                        int childIdBD = (Integer) session.getAttribute("childIdBD");
                        int motherIdBD = (Integer) session.getAttribute("motherIdBD");
                        model.addAttribute("birthMsg", followDatabaseService.getFdGcBirthMsg(childIdBD, motherIdBD));
                        model.addAttribute("visitNumber", followDatabaseService.getFdGpVisitNumber(childIdBD, motherIdBD));
                        model.addAttribute("ovList", followDatabaseService.getFdGpOutpatientVisit(childIdBD, motherIdBD));
                        return "perinatalPlatform/followDatabase/growthProcess/OV";
                    }
                } catch (NullPointerException ignored) {}
                return "redirect:/perinatalPlatform/basicDatabase/write/BS";
            }
        } catch (NullPointerException ignored) {}
        return "redirect:/perinatalPlatform/basicDatabase/write/MI";
    }

    // 随访数据库 成长历程 门诊就诊 数据提交
    @PostMapping(value = "/write/GP/OV/post")
    @ResponseBody
    public String fdGpOutpatientVisitPost(HttpSession session,
                                          @RequestParam(value = "visitNumber") String visitNumber,
                                          @RequestParam(value = "ovArray") String ovArray) {
        return followDatabaseService.saveFDGPOV(visitNumber, ovArray, (Integer) session.getAttribute("childIdBD"), (Integer) session.getAttribute("motherIdBD"));
    }

    // 随访数据库 成长历程 住院治疗 添加/编辑 页面
    @GetMapping(value = "/write/GP/HT")
    public String fdGpHospitalizationTreatmentVisitEdit(Model model, HttpSession session) {
        try {
            if (session.getAttribute("motherIdBD") != null) {
                try {
                    if (session.getAttribute("childIdBD") != null) {
                        int childIdBD = (Integer) session.getAttribute("childIdBD");
                        int motherIdBD = (Integer) session.getAttribute("motherIdBD");
                        model.addAttribute("birthMsg", followDatabaseService.getFdGcBirthMsg(childIdBD, motherIdBD));
                        model.addAttribute("hospitalizationNumber", followDatabaseService.getFdGpHospitalizationNumber(childIdBD, motherIdBD));
                        model.addAttribute("htList", followDatabaseService.getFdGpHospitalizationTreatment(childIdBD, motherIdBD));
                        return "perinatalPlatform/followDatabase/growthProcess/HT";
                    }
                } catch (NullPointerException ignored) {}
                return "redirect:/perinatalPlatform/basicDatabase/write/BS";
            }
        } catch (NullPointerException ignored) {}
        return "redirect:/perinatalPlatform/basicDatabase/write/MI";
    }

    // 随访数据库 成长历程 住院治疗 数据提交
    @PostMapping(value = "/write/GP/HT/post")
    @ResponseBody
    public String fdGpHospitalizationTreatmentVisitPost(HttpSession session,
                                                        @RequestParam(value = "hospitalizationNumber") String hospitalizationNumber,
                                                        @RequestParam(value = "htArray") String htArray) {
        return followDatabaseService.saveFDGPHT(hospitalizationNumber, htArray, (Integer) session.getAttribute("childIdBD"), (Integer) session.getAttribute("motherIdBD"));
    }

    // 随访数据库 成长历程 随访计划 添加/编辑 页面
    @GetMapping(value = "/write/GP/FP")
    public String fdGpFollowUpPlanEdit(HttpSession session) {
        try {
            if (session.getAttribute("motherIdBD") != null) {
                try {
                    if (session.getAttribute("childIdBD") != null) {
                        return "perinatalPlatform/followDatabase/growthProcess/FP";
                    }
                } catch (NullPointerException ignored) {}
                return "redirect:/perinatalPlatform/basicDatabase/write/BS";
            }
        } catch (NullPointerException ignored) {}
        return "redirect:/perinatalPlatform/basicDatabase/write/MI";
    }

    // 随访数据库 成长历程 随访计划 获取数据
    @GetMapping(value = "/write/GP/FP/data")
    @ResponseBody
    public String fdGpFollowUpPlanData(HttpSession session) {
        return followDatabaseService.getFdGpFollowUpPlan((Integer) session.getAttribute("childIdBD"), (Integer) session.getAttribute("motherIdBD"));
    }

    // 随访数据库 成长历程 随访计划 数据提交
    @PostMapping(value = "/write/GP/FP/post")
    @ResponseBody
    public String fdGpFollowUpPlanPost(HttpSession session, @RequestParam(value = "fpArray") String fpArray) {
        return followDatabaseService.saveFDGPFP(fpArray, (Integer) session.getAttribute("childIdBD"), (Integer) session.getAttribute("motherIdBD"));
    }

    // 随访数据库 成长历程 疾病防治 添加/编辑 页面
    @GetMapping(value = "/write/GP/DC")
    public String fdGpDiseaseControlEdit(HttpSession session) {
        try {
            if (session.getAttribute("motherIdBD") != null) {
                try {
                    if (session.getAttribute("childIdBD") != null) {
                        return "perinatalPlatform/followDatabase/growthProcess/DC";
                    }
                } catch (NullPointerException ignored) {}
                return "redirect:/perinatalPlatform/basicDatabase/write/BS";
            }
        } catch (NullPointerException ignored) {}
        return "redirect:/perinatalPlatform/basicDatabase/write/MI";
    }

    // 随访数据库 成长历程 疾病防治 获取数据
    @GetMapping(value = "/write/GP/DC/data")
    @ResponseBody
    public String fdGpDiseaseControlData(HttpSession session) {
        return followDatabaseService.getFdGpDiseaseControl((Integer) session.getAttribute("childIdBD"), (Integer) session.getAttribute("motherIdBD"));
    }

    // 随访数据库 成长历程 疾病防治 数据提交
    @PostMapping(value = "/write/GP/DC/post")
    @ResponseBody
    public String fdGpDiseaseControlPost(HttpSession session, @RequestParam(value = "dcArray") String dcArray) {
        return followDatabaseService.saveFDGPDC(dcArray, (Integer) session.getAttribute("childIdBD"), (Integer) session.getAttribute("motherIdBD"));
    }

    // 随访数据库 病例审核 页面
    @GetMapping(value = "/review")
    public String followDatabaseReview(Model model, HttpSession session) {
        try {
            if (session.getAttribute("motherIdBD") != null) {
                try {
                    if (session.getAttribute("childIdBD") != null) {
                        int childIdBD = (Integer) session.getAttribute("childIdBD");
                        int motherIdBD = (Integer) session.getAttribute("motherIdBD");
                        CaseStatus caseStatus = followDatabaseService.getFdCaseStatus(childIdBD, motherIdBD);
                        if (caseStatus == null) {
                            return "redirect:/perinatalPlatform/followDatabase/write/FI";
                        }
                        model.addAttribute("caseStatus", caseStatus);
                        model.addAttribute("reviewCount", followDatabaseService.getFdReviewCount(childIdBD, motherIdBD));
                        model.addAttribute("reviewList", followDatabaseService.getFdReview(childIdBD, motherIdBD));
                        return "perinatalPlatform/followDatabase/FDReview";
                    }
                } catch (NullPointerException ignored) {}
                return "redirect:/perinatalPlatform/basicDatabase/write/BS";
            }
        } catch (NullPointerException ignored) {}
        return "redirect:/perinatalPlatform/basicDatabase/write/MI";
    }

    // 随访数据库 病例审核 信息提交
    @PostMapping(value = "/review/post")
    @ResponseBody
    public String basicDatabaseReviewPost(HttpSession session,
                                          Review fdReview) {
        return followDatabaseService.addFdReview(fdReview, (Integer) session.getAttribute("childIdBD"), (Integer) session.getAttribute("motherIdBD"));
    }
}