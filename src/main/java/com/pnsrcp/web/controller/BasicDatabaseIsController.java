package com.pnsrcp.web.controller;

import com.pnsrcp.web.entity.perintalPlatform.basicDatabaseIS.*;
import com.pnsrcp.web.service.BasicDatabaseIsService;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import javax.servlet.http.HttpSession;
import java.util.List;

/**
 * @Project: 围产新生儿科研合作平台
 * @Author: Linyer
 * @Email: linyer@linyer.cn
 * @Date: 2021/9/18 12:08 星期六
 * @Description: 基础数据库 感染监测 控制层
 */
@Controller
@RequestMapping("/perinatalPlatform/basicDatabase/write/IS")
public class BasicDatabaseIsController {
    // 服务层 注入
    @Resource
    private BasicDatabaseIsService basicDatabaseIsService;

    // 基础数据库 感染监测 EOS流程 添加/编辑 页面
    @GetMapping(value = "/EOS")
    public String bdIsEosEdit(Model model, HttpSession session) {
        try {
            if (session.getAttribute("motherIdBD") != null) {
                try {
                    if (session.getAttribute("childIdBD") != null) {
                        int childIdBD = (Integer) session.getAttribute("childIdBD");
                        int motherIdBD = (Integer) session.getAttribute("motherIdBD");
                        model.addAttribute("birthday", basicDatabaseIsService.getChildBirthday(childIdBD, motherIdBD));
                        model.addAttribute("chorioamnionitis", basicDatabaseIsService.getBdIsChorioamnionitis(motherIdBD));
                        model.addAttribute("eos", basicDatabaseIsService.getBdIsEos(childIdBD, motherIdBD));
                        List<BDISEosAe> bdIsEosAeList = basicDatabaseIsService.getBdIsEosAe(childIdBD, motherIdBD);
                        if (bdIsEosAeList != null && bdIsEosAeList.size() > 0) {
                            model.addAttribute("eosAeList", bdIsEosAeList);
                        }
                        List<BDISEosBc> bdIsEosBcList = basicDatabaseIsService.getBdIsEosBc(childIdBD, motherIdBD);
                        if (bdIsEosAeList != null && bdIsEosBcList.size() > 0) {
                            model.addAttribute("eosBcList", bdIsEosBcList);
                        }
                        List<BDISEosNsi> bdIsEosNsiList = basicDatabaseIsService.getBdIsEosNsi(childIdBD, motherIdBD);
                        if (bdIsEosNsiList != null && bdIsEosNsiList.size() > 0) {
                            model.addAttribute("eosNsiList", bdIsEosNsiList);
                        }
                        List<BDISEosCfc> bdIsEosCfcList = basicDatabaseIsService.getBdIsEosCfc(childIdBD, motherIdBD);
                        if (bdIsEosCfcList != null && bdIsEosCfcList.size() > 0) {
                            model.addAttribute("eosCfcList", bdIsEosCfcList);
                        }
                        return "perinatalPlatform/basicDatabase/infectionSurveillance/EOS";
                    }
                } catch (NullPointerException ignored) {}
                return "redirect:/perinatalPlatform/basicDatabase/write/BS";
            }
        } catch (NullPointerException ignored) {}
        return "redirect:/perinatalPlatform/basicDatabase/write/MI";
    }

    // 基础数据库 EOS流程 数据提交
    @PostMapping(value = "/EOS/post")
    @ResponseBody
    public String bdIsEosPost(HttpSession session,
                              BDISEos bdIsEos,
                              @RequestParam("aeArray") String aeArray,
                              @RequestParam("bcArray") String bcArray,
                              @RequestParam("nsiArray") String nsiArray,
                              @RequestParam("cfcArray") String cfcArray) {
        return basicDatabaseIsService.saveBDISEos(bdIsEos, aeArray, bcArray, nsiArray, cfcArray, (Integer) session.getAttribute("childIdBD"), (Integer) session.getAttribute("motherIdBD"));
    }

    // 基础数据库 感染监测 LOS流程 添加/编辑 页面
    @GetMapping(value = "/LOS")
    public String bdIsLosEdit(Model model, HttpSession session) {
        try {
            if (session.getAttribute("motherIdBD") != null) {
                try {
                    if (session.getAttribute("childIdBD") != null) {
                        int childIdBD = (Integer) session.getAttribute("childIdBD");
                        int motherIdBD = (Integer) session.getAttribute("motherIdBD");
                        model.addAttribute("birthday", basicDatabaseIsService.getChildBirthday(childIdBD, motherIdBD));
                        model.addAttribute("los", basicDatabaseIsService.getBdIsLos(childIdBD, motherIdBD));
                        List<BDISLosRf> bdIsLosRfList = basicDatabaseIsService.getBdIsLosRf(childIdBD, motherIdBD);
                        if (bdIsLosRfList != null && bdIsLosRfList.size() > 0) {
                            model.addAttribute("losRfList", bdIsLosRfList);
                        }
                        List<BDISLosAe> bdIsLosAeList = basicDatabaseIsService.getBdIsLosAe(childIdBD, motherIdBD);
                        if (bdIsLosAeList != null && bdIsLosAeList.size() > 0) {
                            model.addAttribute("losAeList", bdIsLosAeList);
                        }
                        List<BDISLosBc> bdIsLosBcList = basicDatabaseIsService.getBdIsLosBc(childIdBD, motherIdBD);
                        if (bdIsLosBcList != null && bdIsLosBcList.size() > 0) {
                            model.addAttribute("losBcList", bdIsLosBcList);
                        }
                        List<BDISLosNsi> bdIsLosNsiList = basicDatabaseIsService.getBdIsLosNsi(childIdBD, motherIdBD);
                        if (bdIsLosNsiList != null && bdIsLosNsiList.size() > 0) {
                            model.addAttribute("losNsiList", bdIsLosNsiList);
                        }
                        List<BDISLosCfc> bdIsLosCfcList = basicDatabaseIsService.getBdIsLosCfc(childIdBD, motherIdBD);
                        if (bdIsLosCfcList != null && bdIsLosCfcList.size() > 0) {
                            model.addAttribute("losCfcList", bdIsLosCfcList);
                        }
                        return "perinatalPlatform/basicDatabase/infectionSurveillance/LOS";
                    }
                } catch (NullPointerException ignored) {}
                return "redirect:/perinatalPlatform/basicDatabase/write/BS";
            }
        } catch (NullPointerException ignored) {}
        return "redirect:/perinatalPlatform/basicDatabase/write/MI";
    }

    // 基础数据库 LOS流程 数据提交
    @PostMapping(value = "/LOS/post")
    @ResponseBody
    public String bdIsLosPost(HttpSession session,
                              BDISLos bdIsLos,
                              @RequestParam("rfArray") String rfArray,
                              @RequestParam("aeArray") String aeArray,
                              @RequestParam("bcArray") String bcArray,
                              @RequestParam("nsiArray") String nsiArray,
                              @RequestParam("cfcArray") String cfcArray) {
        return basicDatabaseIsService.saveBDISLos(bdIsLos, rfArray, aeArray, bcArray, nsiArray, cfcArray, (Integer) session.getAttribute("childIdBD"), (Integer) session.getAttribute("motherIdBD"));
    }

    // 基础数据库 感染监测 抗菌药物 添加/编辑 页面
    @GetMapping(value = "/AD")
    public String bdIsAdEdit(Model model, HttpSession session) {
        try {
            if (session.getAttribute("motherIdBD") != null) {
                try {
                    if (session.getAttribute("childIdBD") != null) {
                        int childIdBD = (Integer) session.getAttribute("childIdBD");
                        int motherIdBD = (Integer) session.getAttribute("motherIdBD");
                        model.addAttribute("ad", basicDatabaseIsService.getBdIsAd(childIdBD, motherIdBD));
                        List<BDISAdUse> bdIsAdUseList = basicDatabaseIsService.getBdIsAdUse(childIdBD, motherIdBD);
                        if (bdIsAdUseList != null && bdIsAdUseList.size() > 0) {
                            model.addAttribute("adUseList", bdIsAdUseList);
                        }
                        return "perinatalPlatform/basicDatabase/infectionSurveillance/AD";
                    }
                } catch (NullPointerException ignored) {}
                return "redirect:/perinatalPlatform/basicDatabase/write/BS";
            }
        } catch (NullPointerException ignored) {}
        return "redirect:/perinatalPlatform/basicDatabase/write/MI";
    }

    // 基础数据库 感染监测 抗菌药物 数据提交
    @PostMapping(value = "/AD/post")
    @ResponseBody
    public String bdIsAdPost(HttpSession session,
                             BDISAd bdIsAd,
                             @RequestParam("adArray") String adArray) {
        return basicDatabaseIsService.saveBDISAd(bdIsAd, adArray, (Integer) session.getAttribute("childIdBD"), (Integer) session.getAttribute("motherIdBD"));
    }

    // 基础数据库 感染监测 评价指标 添加/编辑 页面
    @GetMapping(value = "/EI")
    public String bdIsEvaluationIndexEdit(Model model, HttpSession session) {
        try {
            if (session.getAttribute("motherIdBD") != null) {
                try {
                    if (session.getAttribute("childIdBD") != null) {
                        int childIdBD = (Integer) session.getAttribute("childIdBD");
                        int motherIdBD = (Integer) session.getAttribute("motherIdBD");
                        model.addAttribute("evaluationIndex", basicDatabaseIsService.getBdIsEvaluationIndex(childIdBD, motherIdBD));
                        return "perinatalPlatform/basicDatabase/infectionSurveillance/EI";
                    }
                } catch (NullPointerException ignored) {}
                return "redirect:/perinatalPlatform/basicDatabase/write/BS";
            }
        } catch (NullPointerException ignored) {}
        return "redirect:/perinatalPlatform/basicDatabase/write/MI";
    }

    // 基础数据库 感染监测 评价指标 数据提交
    @PostMapping(value = "/EI/post")
    @ResponseBody
    public String bdIsEvaluationIndexPost(HttpSession session,
                             BDISEvaluationIndex bdIsEvaluationIndex) {
        return basicDatabaseIsService.saveBDISEI(bdIsEvaluationIndex, (Integer) session.getAttribute("childIdBD"), (Integer) session.getAttribute("motherIdBD"));
    }

    // 基础数据库 感染监测 其它感染诊断 添加/编辑 页面
    @GetMapping(value = "/OID")
    public String bdIsOidEdit(Model model, HttpSession session) {
        try {
            if (session.getAttribute("motherIdBD") != null) {
                try {
                    if (session.getAttribute("childIdBD") != null) {
                        int childIdBD = (Integer) session.getAttribute("childIdBD");
                        int motherIdBD = (Integer) session.getAttribute("motherIdBD");
                        model.addAttribute("oid", basicDatabaseIsService.getBdIsOid(childIdBD, motherIdBD));
                        return "perinatalPlatform/basicDatabase/infectionSurveillance/OID";
                    }
                } catch (NullPointerException ignored) {}
                return "redirect:/perinatalPlatform/basicDatabase/write/BS";
            }
        } catch (NullPointerException ignored) {}
        return "redirect:/perinatalPlatform/basicDatabase/write/MI";
    }

    // 基础数据库 感染监测 其它感染诊断 数据提交
    @PostMapping(value = "/OID/post")
    @ResponseBody
    public String bdIsOidPost(HttpSession session,
                              BDISOid bdIsOid) {
        return basicDatabaseIsService.saveBDISOID(bdIsOid, (Integer) session.getAttribute("childIdBD"), (Integer) session.getAttribute("motherIdBD"));
    }
}