package com.pnsrcp.web.controller;

import com.pnsrcp.web.entity.perintalPlatform.basicDatabaseNS.BDNSAuxiliaryExamination;
import com.pnsrcp.web.entity.perintalPlatform.basicDatabaseNS.BDNSTreatmentDiagnosis;
import com.pnsrcp.web.entity.perintalPlatform.basicDatabaseNS.BDNervousSystemNumber;
import com.pnsrcp.web.service.BasicDatabaseNsService;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.annotation.Resource;
import javax.servlet.http.HttpSession;

/**
 * @Project: 围产新生儿科研合作平台
 * @Author: Linyer
 * @Email: linyer@linyer.cn
 * @Date: 2022/07/19 16:12 星期二
 * @Description: 基础数据库 神经系统 控制层
 */
@Controller
@RequestMapping("/perinatalPlatform/basicDatabase/write/NS")
public class BasicDatabaseNsController {
    // 服务层 注入
    @Resource
    private BasicDatabaseNsService basicDatabaseNsService;

    // 基础数据库 神经系统 超声 添加/编辑 页面
    @GetMapping(value = "/US")
    public String bdNsUltrasoundEdit(Model model, HttpSession session) {
        try {
            if (session.getAttribute("motherIdBD") != null) {
                try {
                    if (session.getAttribute("childIdBD") != null) {
                        int childIdBD = (Integer) session.getAttribute("childIdBD");
                        int motherIdBD = (Integer) session.getAttribute("motherIdBD");
                        model.addAttribute("ultrasonographyNumber", basicDatabaseNsService.getBdNsUltrasonographyNumber(childIdBD, motherIdBD));
                        model.addAttribute("usList", basicDatabaseNsService.getBdNsUltrasonography(childIdBD, motherIdBD));
                        return "perinatalPlatform/basicDatabase/nervousSystem/US";
                    }
                } catch (NullPointerException ignored) {}
                return "redirect:/perinatalPlatform/basicDatabase/write/BS";
            }
        } catch (NullPointerException ignored) {}
        return "redirect:/perinatalPlatform/basicDatabase/write/MI";
    }

    // 基础数据库 神经系统 超声 上传超声图片
    @PostMapping(value = "/US/uploadUsImg")
    @ResponseBody
    public String bdNsUsUploadImg(HttpSession session,
                                  @RequestParam("num") String num,
                                  @RequestParam("index") String index,
                                  @RequestParam("image") MultipartFile image) {
        return basicDatabaseNsService.bdNsUsUploadImg(num, index, image, (Integer) session.getAttribute("childIdBD"));
    }

    // 基础数据库 神经系统 超声 数据提交
    @PostMapping(value = "/US/post")
    @ResponseBody
    public String bdNsUltrasoundPost(HttpSession session,
                                     BDNervousSystemNumber bdNervousSystemNumber,
                                     @RequestParam(value = "usArray") String usArray) {
        return basicDatabaseNsService.saveBDNSUS(bdNervousSystemNumber, usArray, (Integer) session.getAttribute("childIdBD"), (Integer) session.getAttribute("motherIdBD"));
    }

    // 基础数据库 神经系统 MRI 添加/编辑 页面
    @GetMapping(value = "/MR")
    public String bdNsMriEdit(Model model, HttpSession session) {
        try {
            if (session.getAttribute("motherIdBD") != null) {
                try {
                    if (session.getAttribute("childIdBD") != null) {
                        int childIdBD = (Integer) session.getAttribute("childIdBD");
                        int motherIdBD = (Integer) session.getAttribute("motherIdBD");
                        model.addAttribute("mriNumber", basicDatabaseNsService.getBdNsMriNumber(childIdBD, motherIdBD));
                        model.addAttribute("mriList", basicDatabaseNsService.getBdNsMri(childIdBD, motherIdBD));
                        return "perinatalPlatform/basicDatabase/nervousSystem/MRI";
                    }
                } catch (NullPointerException ignored) {}
                return "redirect:/perinatalPlatform/basicDatabase/write/BS";
            }
        } catch (NullPointerException ignored) {}
        return "redirect:/perinatalPlatform/basicDatabase/write/MI";
    }

    // 基础数据库 神经系统 MRI 上传超声图片
    @PostMapping(value = "/MR/uploadMriImg")
    @ResponseBody
    public String bdNsMriUploadImg(HttpSession session,
                                   @RequestParam("num") String num,
                                   @RequestParam("index") String index,
                                   @RequestParam("image") MultipartFile image) {
        return basicDatabaseNsService.bdNsMriUploadImg(num, index, image, (Integer) session.getAttribute("childIdBD"));
    }

    // 基础数据库 神经系统 MRI 数据提交
    @PostMapping(value = "/MR/post")
    @ResponseBody
    public String bdNsMriPost(HttpSession session,
                              BDNervousSystemNumber bdNervousSystemNumber,
                              @RequestParam(value = "mriArray") String mriArray) {
        return basicDatabaseNsService.saveBDNSMRI(bdNervousSystemNumber, mriArray, (Integer) session.getAttribute("childIdBD"), (Integer) session.getAttribute("motherIdBD"));
    }

    // 基础数据库 神经系统 CT 添加/编辑 页面
    @GetMapping(value = "/CT")
    public String bdNsCtEdit(Model model, HttpSession session) {
        try {
            if (session.getAttribute("motherIdBD") != null) {
                try {
                    if (session.getAttribute("childIdBD") != null) {
                        int childIdBD = (Integer) session.getAttribute("childIdBD");
                        int motherIdBD = (Integer) session.getAttribute("motherIdBD");
                        model.addAttribute("ctNumber", basicDatabaseNsService.getBdNsCtNumber(childIdBD, motherIdBD));
                        model.addAttribute("ctList", basicDatabaseNsService.getBdNsCt(childIdBD, motherIdBD));
                        return "perinatalPlatform/basicDatabase/nervousSystem/CT";
                    }
                } catch (NullPointerException ignored) {}
                return "redirect:/perinatalPlatform/basicDatabase/write/BS";
            }
        } catch (NullPointerException ignored) {}
        return "redirect:/perinatalPlatform/basicDatabase/write/MI";
    }

    // 基础数据库 神经系统 CT 上传超声图片
    @PostMapping(value = "/CT/uploadCtImg")
    @ResponseBody
    public String bdNsCtUploadImg(HttpSession session,
                                  @RequestParam("num") String num,
                                  @RequestParam("index") String index,
                                  @RequestParam("image") MultipartFile image) {
        return basicDatabaseNsService.bdNsCtUploadImg(num, index, image, (Integer) session.getAttribute("childIdBD"));
    }

    // 基础数据库 神经系统 CT 数据提交
    @PostMapping(value = "/CT/post")
    @ResponseBody
    public String bdNsCtPost(HttpSession session,
                              BDNervousSystemNumber bdNervousSystemNumber,
                              @RequestParam(value = "ctArray") String ctArray) {
        return basicDatabaseNsService.saveBDNSCT(bdNervousSystemNumber, ctArray, (Integer) session.getAttribute("childIdBD"), (Integer) session.getAttribute("motherIdBD"));
    }

    // 基础数据库 神经系统 脑电图 添加/编辑 页面
    @GetMapping(value = "/EEG")
    public String bdNsEegEdit(Model model, HttpSession session) {
        try {
            if (session.getAttribute("motherIdBD") != null) {
                try {
                    if (session.getAttribute("childIdBD") != null) {
                        int childIdBD = (Integer) session.getAttribute("childIdBD");
                        int motherIdBD = (Integer) session.getAttribute("motherIdBD");
                        model.addAttribute("eegNumber", basicDatabaseNsService.getBdNsEegNumber(childIdBD, motherIdBD));
                        model.addAttribute("eegList", basicDatabaseNsService.getBdNsEeg(childIdBD, motherIdBD));
                        return "perinatalPlatform/basicDatabase/nervousSystem/EEG";
                    }
                } catch (NullPointerException ignored) {}
                return "redirect:/perinatalPlatform/basicDatabase/write/BS";
            }
        } catch (NullPointerException ignored) {}
        return "redirect:/perinatalPlatform/basicDatabase/write/MI";
    }

    // 基础数据库 神经系统 脑电图 数据提交
    @PostMapping(value = "/EEG/post")
    @ResponseBody
    public String bdNsEegPost(HttpSession session,
                              BDNervousSystemNumber bdNervousSystemNumber,
                              @RequestParam(value = "eegArray") String eegArray) {
        return basicDatabaseNsService.saveBDNSEEG(bdNervousSystemNumber, eegArray, (Integer) session.getAttribute("childIdBD"), (Integer) session.getAttribute("motherIdBD"));
    }

    // 基础数据库 神经系统 辅助检查 添加/编辑 页面
    @GetMapping(value = "/AE")
    public String bdNsAuxiliaryExaminationEdit(Model model, HttpSession session) {
        try {
            if (session.getAttribute("motherIdBD") != null) {
                try {
                    if (session.getAttribute("childIdBD") != null) {
                        int childIdBD = (Integer) session.getAttribute("childIdBD");
                        int motherIdBD = (Integer) session.getAttribute("motherIdBD");
                        model.addAttribute("auxiliaryExamination", basicDatabaseNsService.getBdNsAuxiliaryExamination(childIdBD, motherIdBD));
                        return "perinatalPlatform/basicDatabase/nervousSystem/AE";
                    }
                } catch (NullPointerException ignored) {}
                return "redirect:/perinatalPlatform/basicDatabase/write/BS";
            }
        } catch (NullPointerException ignored) {}
        return "redirect:/perinatalPlatform/basicDatabase/write/MI";
    }

    // 基础数据库 神经系统 辅助检查 数据提交
    @PostMapping(value = "/AE/post")
    @ResponseBody
    public String bdNsAuxiliaryExaminationPost(HttpSession session,
                                               BDNSAuxiliaryExamination bdNsAuxiliaryExamination) {
        return basicDatabaseNsService.saveBDNSAE(bdNsAuxiliaryExamination, (Integer) session.getAttribute("childIdBD"), (Integer) session.getAttribute("motherIdBD"));
    }

    // 基础数据库 神经系统 治疗及诊断 添加/编辑 页面
    @GetMapping(value = "/TD")
    public String bdNsTreatmentDiagnosisEdit(Model model, HttpSession session) {
        try {
            if (session.getAttribute("motherIdBD") != null) {
                try {
                    if (session.getAttribute("childIdBD") != null) {
                        int childIdBD = (Integer) session.getAttribute("childIdBD");
                        int motherIdBD = (Integer) session.getAttribute("motherIdBD");
                        model.addAttribute("treatmentDiagnosis", basicDatabaseNsService.getBdNsTreatmentDiagnosis(childIdBD, motherIdBD));
                        return "perinatalPlatform/basicDatabase/nervousSystem/TD";
                    }
                } catch (NullPointerException ignored) {}
                return "redirect:/perinatalPlatform/basicDatabase/write/BS";
            }
        } catch (NullPointerException ignored) {}
        return "redirect:/perinatalPlatform/basicDatabase/write/MI";
    }

    // 基础数据库 神经系统 治疗及诊断 数据提交
    @PostMapping(value = "/TD/post")
    @ResponseBody
    public String bdNsTreatmentDiagnosisPost(HttpSession session,
                                             BDNSTreatmentDiagnosis bdNsTreatmentDiagnosis) {
        return basicDatabaseNsService.saveBDNSTD(bdNsTreatmentDiagnosis, (Integer) session.getAttribute("childIdBD"), (Integer) session.getAttribute("motherIdBD"));
    }
}
