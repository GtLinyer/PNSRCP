package com.pnsrcp.web.controller;

import com.pnsrcp.web.entity.perintalPlatform.BasicDatabaseRTS.*;
import com.pnsrcp.web.entity.perintalPlatform.basicDatabse.BDBirthMsg;
import com.pnsrcp.web.service.BasicDatabaseRtsService;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import javax.servlet.http.HttpSession;
import java.util.List;
import java.util.Map;

/**
 * @Project: 围产新生儿科研合作平台
 * @Author: Linyer
 * @Email: linyer@linyer.cn
 * @Date: 2021/8/27 16:48 星期五
 * @Description: 基础数据库 控制层
 */
@Controller
@RequestMapping("/perinatalPlatform/basicDatabase")
public class BasicDatabaseRtsController {
    // 服务层 注入
    @Resource
    private BasicDatabaseRtsService basicDatabaseRtsService;

    // 基础数据库 呼吸系统 呼吸支持 添加/编辑 页面
    @GetMapping(value = "/write/RTS/RS")
    public String bdRtsRespiratorySupportEdit(Model model, HttpSession session) {
        try {
            if (session.getAttribute("motherIdBD") != null) {
                try {
                    if (session.getAttribute("childIdBD") != null) {
                        int childIdBD = (Integer) session.getAttribute("childIdBD");
                        int motherIdBD = (Integer) session.getAttribute("motherIdBD");
                        model.addAttribute("birthday", basicDatabaseRtsService.getBdBirthday(childIdBD, motherIdBD));
                        BDBirthMsg bdBirthMsg = basicDatabaseRtsService.getBdGestationalAge(childIdBD, motherIdBD);
                        model.addAttribute("gaWeek", bdBirthMsg.getGestationalAgeWeek());
                        model.addAttribute("gaDay", bdBirthMsg.getGestationalAgeDay());
                        model.addAttribute("respiratorySupport", basicDatabaseRtsService.getBdRtsRespiratorySupport(childIdBD, motherIdBD));
                        model.addAttribute("rsModeTimeList", basicDatabaseRtsService.getBdRtsRsModeTime(childIdBD, motherIdBD));
                        model.addAttribute("oxygenConcentrationList", basicDatabaseRtsService.getBdRtsRsOxygenConcentration(childIdBD, motherIdBD));
                        return "perinatalPlatform/basicDatabase/respiratorySystem/RS";
                    }
                } catch (NullPointerException ignored) {}
                return "redirect:/perinatalPlatform/basicDatabase/write/BS";
            }
        } catch (NullPointerException ignored) {}
        return "redirect:/perinatalPlatform/basicDatabase/write/MI";
    }

    // 基础数据库 呼吸系统 呼吸支持 数据提交
    @PostMapping(value = "/write/RTS/RS/post")
    @ResponseBody
    public String bdRtsRespiratorySupportPost(HttpSession session,
                                              BDRTSRespiratorySupport bdRtsRespiratorySupport,
                                              @RequestParam("rsArray") String rsModeTimeArray,
                                              @RequestParam("ocArray") String ocArray) {
        return basicDatabaseRtsService.saveBDRTSRS(bdRtsRespiratorySupport, rsModeTimeArray, ocArray, (Integer) session.getAttribute("childIdBD"), (Integer) session.getAttribute("motherIdBD"));
    }

    // 基础数据库 呼吸系统 HFNC失败 添加/编辑 页面
    @GetMapping(value = "/write/RTS/HF")
    public String bdRtsHfncFailedEdit(Model model, HttpSession session) {
        try {
            if (session.getAttribute("motherIdBD") != null) {
                try {
                    if (session.getAttribute("childIdBD") != null) {
                        int childIdBD = (Integer) session.getAttribute("childIdBD");
                        int motherIdBD = (Integer) session.getAttribute("motherIdBD");
                        BDRTSHfncFailed bdRtsHfncFailed = basicDatabaseRtsService.getBdRtsHfncFailed(childIdBD, motherIdBD);
                        if (bdRtsHfncFailed != null) {
                            model.addAttribute("hfncFailed", bdRtsHfncFailed);
                            return "perinatalPlatform/basicDatabase/respiratorySystem/HF";
                        }
                        return "redirect:/perinatalPlatform/basicDatabase/write/RTS/RS";
                    }
                } catch (NullPointerException ignored) {}
                return "redirect:/perinatalPlatform/basicDatabase/write/BS";
            }
        } catch (NullPointerException ignored) {}
        return "redirect:/perinatalPlatform/basicDatabase/write/MI";
    }

    // 基础数据库 呼吸系统 HFNC失败 数据提交
    @PostMapping(value = "/write/RTS/HF/post")
    @ResponseBody
    public String bdRtsHfncFailedPost(HttpSession session,
                                      BDRTSHfncFailed bdRtsHfncFailed) {
        return basicDatabaseRtsService.saveBDRTSHF(bdRtsHfncFailed, (Integer) session.getAttribute("childIdBD"), (Integer) session.getAttribute("motherIdBD"));
    }

    // 基础数据库 呼吸系统 无创通气失败 添加/编辑 页面
    @GetMapping(value = "/write/RTS/NVF")
    public String bdRtsNivFailedEdit(Model model, HttpSession session) {
        try {
            if (session.getAttribute("motherIdBD") != null) {
                try {
                    if (session.getAttribute("childIdBD") != null) {
                        int childIdBD = (Integer) session.getAttribute("childIdBD");
                        int motherIdBD = (Integer) session.getAttribute("motherIdBD");
                        BDRTSNivFailed bdRtsNivFailed = basicDatabaseRtsService.getBdRtsNivFailed(childIdBD, motherIdBD);
                        if (bdRtsNivFailed != null) {
                            model.addAttribute("nivFailed", bdRtsNivFailed);
                            return "perinatalPlatform/basicDatabase/respiratorySystem/NVF";
                        }
                        return "redirect:/perinatalPlatform/basicDatabase/write/RTS/RS";
                    }
                } catch (NullPointerException ignored) {}
                return "redirect:/perinatalPlatform/basicDatabase/write/BS";
            }
        } catch (NullPointerException ignored) {}
        return "redirect:/perinatalPlatform/basicDatabase/write/MI";
    }

    // 基础数据库 呼吸系统 无创通气失败 数据提交
    @PostMapping(value = "/write/RTS/NVF/post")
    @ResponseBody
    public String bdRtsNivFailedPost(HttpSession session,
                                     BDRTSNivFailed bdrtsNivFailed) {
        return basicDatabaseRtsService.saveBDRTSNVF(bdrtsNivFailed, (Integer) session.getAttribute("childIdBD"), (Integer) session.getAttribute("motherIdBD"));
    }

    // 基础数据库 呼吸系统 撤机情况 添加/编辑 页面
    @GetMapping(value = "/write/RTS/WS")
    public String bdRtsWeaningSituationEdit(Model model, HttpSession session) {
        try {
            if (session.getAttribute("motherIdBD") != null) {
                try {
                    if (session.getAttribute("childIdBD") != null) {
                        int childIdBD = (Integer) session.getAttribute("childIdBD");
                        int motherIdBD = (Integer) session.getAttribute("motherIdBD");
                        Map<String, String> invasiveVentilation = basicDatabaseRtsService.getBdRtsWfInvasiveVentilation(childIdBD, motherIdBD);
                        if (invasiveVentilation != null) {
                            model.addAttribute("invasiveVentilation", invasiveVentilation.get("invasiveVentilation"));
                            model.addAttribute("invasiveVentilationTimes", invasiveVentilation.get("invasiveVentilationTimes"));
                            List<BDRTSInvasiveVentilation> bdRtsInvasiveVentilationList = basicDatabaseRtsService.getBdRtsWeaningFailedIv(childIdBD, motherIdBD);
                            if (bdRtsInvasiveVentilationList != null && bdRtsInvasiveVentilationList.size() > 0) {
                                BDRTSInvasiveVentilation bdRtsInvasiveVentilation1 = bdRtsInvasiveVentilationList.get(0);
                                model.addAttribute("invasiveVentilationData1", bdRtsInvasiveVentilation1);
                                bdRtsInvasiveVentilationList.remove(0);
                                model.addAttribute("bdRtsInvasiveVentilationDataList", bdRtsInvasiveVentilationList);
                            }
                            return "perinatalPlatform/basicDatabase/respiratorySystem/WS";
                        }
                        return "redirect:/perinatalPlatform/basicDatabase/write/RTS/RS";
                    }
                } catch (NullPointerException ignored) {}
                return "redirect:/perinatalPlatform/basicDatabase/write/BS";
            }
        } catch (NullPointerException ignored) {}
        return "redirect:/perinatalPlatform/basicDatabase/write/MI";
    }

    // 基础数据库 呼吸系统 撤机情况 数据提交
    @PostMapping(value = "/write/RTS/WS/post")
    @ResponseBody
    public String bdRtsWeaningSituationPost(HttpSession session,
                                            @RequestParam(value = "data") String data) {
        return basicDatabaseRtsService.saveBDRTSWS(data, (Integer) session.getAttribute("childIdBD"), (Integer) session.getAttribute("motherIdBD"));
    }

    // 基础数据库 呼吸系统 BPD 添加/编辑 页面
    @GetMapping(value = "/write/RTS/BPD")
    public String bdRtsBpdEdit(Model model, HttpSession session) {
        try {
            if (session.getAttribute("motherIdBD") != null) {
                try {
                    if (session.getAttribute("childIdBD") != null) {
                        int childIdBD = (Integer) session.getAttribute("childIdBD");
                        int motherIdBD = (Integer) session.getAttribute("motherIdBD");
                        BDRTSBpd bdRtsBpd = basicDatabaseRtsService.getBdRtsBpd(childIdBD, motherIdBD);
                        model.addAttribute("bpd", bdRtsBpd);
                        List<BDRTSBpdGc> bdRtsBpdGcList = basicDatabaseRtsService.getBdRtsBpdGc(childIdBD, motherIdBD);
                        if (bdRtsBpdGcList != null && bdRtsBpdGcList.size() > 0) {
                            model.addAttribute("bpdGcList", bdRtsBpdGcList);
                        }
                        return "perinatalPlatform/basicDatabase/respiratorySystem/BPD";
                    }
                } catch (NullPointerException ignored) {}
                return "redirect:/perinatalPlatform/basicDatabase/write/BS";
            }
        } catch (NullPointerException ignored) {}
        return "redirect:/perinatalPlatform/basicDatabase/write/MI";
    }

    // 基础数据库 呼吸系统 BPD 数据提交
    @PostMapping(value = "/write/RTS/BPD/post")
    @ResponseBody
    public String bdRtsBpdPost(HttpSession session, BDRTSBpd bdRtsBpd,
                               @RequestParam(value = "gcArray") String gcArray) {
        return basicDatabaseRtsService.saveBDRTSBPD(bdRtsBpd, gcArray, (Integer) session.getAttribute("childIdBD"), (Integer) session.getAttribute("motherIdBD"));
    }

    // 基础数据库 呼吸系统 RDS 添加/编辑 页面
    @GetMapping(value = "/write/RTS/RDS")
    public String bdRtsRdsEdit(Model model, HttpSession session) {
        try {
            if (session.getAttribute("motherIdBD") != null) {
                try {
                    if (session.getAttribute("childIdBD") != null) {
                        int childIdBD = (Integer) session.getAttribute("childIdBD");
                        int motherIdBD = (Integer) session.getAttribute("motherIdBD");
                        BDRTSRds bdRtsRds = basicDatabaseRtsService.getBdRtsRds(childIdBD, motherIdBD);
                        model.addAttribute("rds", bdRtsRds);
                        List<BDRTSRdsPs> bdRtsRdsPsList = basicDatabaseRtsService.getBdRtsRdsPs(childIdBD, motherIdBD);
                        if (bdRtsRdsPsList != null && bdRtsRdsPsList.size() > 0) {
                            model.addAttribute("rdsPsList", bdRtsRdsPsList);
                        }
                        return "perinatalPlatform/basicDatabase/respiratorySystem/RDS";
                    }
                } catch (NullPointerException ignored) {}
                return "redirect:/perinatalPlatform/basicDatabase/write/BS";
            }
        } catch (NullPointerException ignored) {}
        return "redirect:/perinatalPlatform/basicDatabase/write/MI";
    }

    // 基础数据库 呼吸系统 RDS 数据提交
    @PostMapping(value = "/write/RTS/RDS/post")
    @ResponseBody
    public String bdRtsRdsPost(HttpSession session, BDRTSRds bdRtsRds,
                               @RequestParam(value = "psArray") String psArray) {
        return basicDatabaseRtsService.saveBDRTSRDS(bdRtsRds, psArray, (Integer) session.getAttribute("childIdBD"), (Integer) session.getAttribute("motherIdBD"));
    }

    // 基础数据库 呼吸系统 呼吸暂停 添加/编辑 页面
    @GetMapping(value = "/write/RTS/AP")
    public String bdRtsApneaEdit(Model model, HttpSession session) {
        try {
            if (session.getAttribute("motherIdBD") != null) {
                try {
                    if (session.getAttribute("childIdBD") != null) {
                        int childIdBD = (Integer) session.getAttribute("childIdBD");
                        int motherIdBD = (Integer) session.getAttribute("motherIdBD");
                        BDRTSApnea bdRtsApnea = basicDatabaseRtsService.getBdRtsApnea(childIdBD, motherIdBD);
                        model.addAttribute("apnea", bdRtsApnea);
                        List<BDRTSApneaCaffeine> bdRtsApneaCaffeineList = basicDatabaseRtsService.getBdRtsApneaCaffeine(childIdBD, motherIdBD);
                        if (bdRtsApneaCaffeineList != null && bdRtsApneaCaffeineList.size() > 0) {
                            model.addAttribute("apneaCaffeineList", bdRtsApneaCaffeineList);
                        }
                        return "perinatalPlatform/basicDatabase/respiratorySystem/AP";
                    }
                } catch (NullPointerException ignored) {}
                return "redirect:/perinatalPlatform/basicDatabase/write/BS";
            }
        } catch (NullPointerException ignored) {}
        return "redirect:/perinatalPlatform/basicDatabase/write/MI";
    }

    // 基础数据库 呼吸系统 呼吸暂停 数据提交
    @PostMapping(value = "/write/RTS/AP/post")
    @ResponseBody
    public String bdRtsApneaPost(HttpSession session, BDRTSApnea bdRtsApnea,
                                 @RequestParam(value = "apArray") String apArray) {
        return basicDatabaseRtsService.saveBDRTSApnea(bdRtsApnea, apArray, (Integer) session.getAttribute("childIdBD"), (Integer) session.getAttribute("motherIdBD"));
    }

    // 基础数据库 呼吸系统 其它诊断与治疗 添加/编辑 页面
    @GetMapping(value = "/write/RTS/ODT")
    public String bdRtsOdtEdit(Model model, HttpSession session) {
        try {
            if (session.getAttribute("motherIdBD") != null) {
                try {
                    if (session.getAttribute("childIdBD") != null) {
                        int childIdBD = (Integer) session.getAttribute("childIdBD");
                        int motherIdBD = (Integer) session.getAttribute("motherIdBD");
                        BDRTSOtherDiagnosisTreatment bdRtsOtherDiagnosisTreatment = basicDatabaseRtsService.getBdRtsOtherDiagnosisTreatment(childIdBD, motherIdBD);
                        model.addAttribute("otherDiagnosisTreatment", bdRtsOtherDiagnosisTreatment);
                        return "perinatalPlatform/basicDatabase/respiratorySystem/ODT";
                    }
                } catch (NullPointerException ignored) {}
                return "redirect:/perinatalPlatform/basicDatabase/write/BS";
            }
        } catch (NullPointerException ignored) {}
        return "redirect:/perinatalPlatform/basicDatabase/write/MI";
    }

    // 基础数据库 呼吸系统 其它诊断与治疗 数据提交
    @PostMapping(value = "/write/RTS/ODT/post")
    @ResponseBody
    public String bdRtsOdtPost(HttpSession session, BDRTSOtherDiagnosisTreatment bdRtsOtherDiagnosisTreatment) {
        return basicDatabaseRtsService.saveBDRTSODT(bdRtsOtherDiagnosisTreatment, (Integer) session.getAttribute("childIdBD"), (Integer) session.getAttribute("motherIdBD"));
    }
}