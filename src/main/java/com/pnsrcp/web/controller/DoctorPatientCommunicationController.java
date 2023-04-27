package com.pnsrcp.web.controller;

import com.pnsrcp.web.entity.perintalPlatform.CaseStatus;
import com.pnsrcp.web.entity.perintalPlatform.Review;
import com.pnsrcp.web.entity.perintalPlatform.doctorPatientCommunication.DPCBreastMilkDiary;
import com.pnsrcp.web.service.DoctorPatientCommunicationService;
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
 * @Date: 2022/1/29 1:05 星期六
 * @Description: 围产新生儿科研合作平台 医患交流库 控制层
 */
@Controller
@RequestMapping("/perinatalPlatform/doctorPatientCommunication")
public class DoctorPatientCommunicationController {
    // 服务层 注入
    @Resource
    private DoctorPatientCommunicationService doctorPatientCommunicationService;

    // 医患交流库 母乳日志 添加/编辑 页面
    @GetMapping(value = "/write/BMD")
    public String dpcBreastMilkDiaryEdit(Model model, HttpSession session) {
        try {
            if (session.getAttribute("motherIdBD") != null) {
                try {
                    if (session.getAttribute("childIdBD") != null) {
                        int childIdBD = (Integer) session.getAttribute("childIdBD");
                        int motherIdBD = (Integer) session.getAttribute("motherIdBD");
                        model.addAttribute("birthday", doctorPatientCommunicationService.getDpcBirthMsg(childIdBD, motherIdBD).getBirthday());
                        model.addAttribute("breastMilkDiary", doctorPatientCommunicationService.getDpcBreastMilkDiary(childIdBD, motherIdBD));
                        model.addAttribute("bmdPumpingList", doctorPatientCommunicationService.getDpcBmdPumping(motherIdBD));
                        return "perinatalPlatform/doctorPatientCommunication/BMD";
                    }
                } catch (NullPointerException ignored) {}
                return "redirect:/perinatalPlatform/basicDatabase/write/BS";
            }
        } catch (NullPointerException ignored) {}
        return "redirect:/perinatalPlatform/basicDatabase/write/MI";
    }

    // 医患交流库 母乳日志 数据提交
    @PostMapping(value = "/write/BMD/post")
    @ResponseBody
    public String dpcBreastMilkDiaryPost(HttpSession session,
                                         DPCBreastMilkDiary dpcBreastMilkDiary,
                                         @RequestParam("pumpingArray") String pumpingArray) {
        return doctorPatientCommunicationService.saveDPCBMD(dpcBreastMilkDiary, pumpingArray, (Integer) session.getAttribute("childIdBD"), (Integer) session.getAttribute("motherIdBD"));
    }

    // 医患交流库 母乳日志 数据删除
    @GetMapping(value = "/write/BMD/deletePumping")
    @ResponseBody
    public String dpcBmdDeletePumping(HttpSession session, @RequestParam("pumpingId") String pumpingIdString) {
        int pumpingId = 0;
        if (pumpingIdString != null && !pumpingIdString.equals("")) {
            pumpingId = Integer.parseInt(pumpingIdString);
        }
        return doctorPatientCommunicationService.deletePumping(pumpingId, (Integer) session.getAttribute("motherIdBD"));
    }

    // 医患交流库 生长曲线 添加/编辑 页面
    @GetMapping(value = "/write/GC")
    public String dpcGrowthCurveEdit(Model model, HttpSession session) {
        try {
            if (session.getAttribute("motherIdBD") != null) {
                try {
                    if (session.getAttribute("childIdBD") != null) {
                        int childIdBD = (Integer) session.getAttribute("childIdBD");
                        int motherIdBD = (Integer) session.getAttribute("motherIdBD");
                        model.addAttribute("birthMsg", doctorPatientCommunicationService.getDpcBirthMsg(childIdBD, motherIdBD));
                        model.addAttribute("growthIndex", doctorPatientCommunicationService.getDpcGrowthCurve(childIdBD, motherIdBD));
                        return "perinatalPlatform/doctorPatientCommunication/GC";
                    }
                } catch (NullPointerException ignored) {}
                return "redirect:/perinatalPlatform/basicDatabase/write/BS";
            }
        } catch (NullPointerException ignored) {}
        return "redirect:/perinatalPlatform/basicDatabase/write/MI";
    }

    // 医患交流库 生长曲线 数据提交
    @PostMapping(value = "/write/GC/post")
    @ResponseBody
    public String dpcGrowthCurvePost(HttpSession session, @RequestParam("wHcBlArray") String wHcBlArray) {
        return doctorPatientCommunicationService.saveDPCGC(wHcBlArray, (Integer) session.getAttribute("childIdBD"), (Integer) session.getAttribute("motherIdBD"));
    }

    // 医患交流库 喂养情况 奶量情况 添加/编辑 页面
    @GetMapping(value = "/write/FS/MQ")
    public String dpcFsMilkQuantityEdit(Model model, HttpSession session) {
        try {
            if (session.getAttribute("motherIdBD") != null) {
                try {
                    if (session.getAttribute("childIdBD") != null) {
                        int childIdBD = (Integer) session.getAttribute("childIdBD");
                        int motherIdBD = (Integer) session.getAttribute("motherIdBD");
                        model.addAttribute("childHospitalizationDate", doctorPatientCommunicationService.getDpcBirthMsg(childIdBD, motherIdBD).getChildHospitalizationDate());
                        return "perinatalPlatform/doctorPatientCommunication/feedingSituation/MQ";
                    }
                } catch (NullPointerException ignored) {}
                return "redirect:/perinatalPlatform/basicDatabase/write/BS";
            }
        } catch (NullPointerException ignored) {}
        return "redirect:/perinatalPlatform/basicDatabase/write/MI";
    }

    // 医患交流库 喂养情况 母乳强化 添加/编辑 页面
    @GetMapping(value = "/write/FS/BMF")
    public String dpcFsBreastMilkFortificationEdit(Model model, HttpSession session) {
        try {
            if (session.getAttribute("motherIdBD") != null) {
                try {
                    if (session.getAttribute("childIdBD") != null) {
                        int childIdBD = (Integer) session.getAttribute("childIdBD");
                        int motherIdBD = (Integer) session.getAttribute("motherIdBD");
                        model.addAttribute("childHospitalizationDate", doctorPatientCommunicationService.getDpcBirthMsg(childIdBD, motherIdBD).getChildHospitalizationDate());
                        model.addAttribute("enhancerType", doctorPatientCommunicationService.getEnhancerType(childIdBD, motherIdBD));
                        return "perinatalPlatform/doctorPatientCommunication/feedingSituation/BMF";
                    }
                } catch (NullPointerException ignored) {}
                return "redirect:/perinatalPlatform/basicDatabase/write/BS";
            }
        } catch (NullPointerException ignored) {}
        return "redirect:/perinatalPlatform/basicDatabase/write/MI";
    }

    // 医患交流库 医患沟通 添加/编辑 页面
    @GetMapping(value = "/write/DPC")
    public String dpcDoctorPatientCommunicationEdit(Model model, HttpSession session) {
        try {
            if (session.getAttribute("motherIdBD") != null) {
                try {
                    if (session.getAttribute("childIdBD") != null) {
                        return "perinatalPlatform/doctorPatientCommunication/DPC";
                    }
                } catch (NullPointerException ignored) {}
                return "redirect:/perinatalPlatform/basicDatabase/write/BS";
            }
        } catch (NullPointerException ignored) {}
        return "redirect:/perinatalPlatform/basicDatabase/write/MI";
    }

    // 医患交流库 医患沟通 上传图片
    @PostMapping(value = "/write/DPC/uploadImg")
    @ResponseBody
    public String dpcDoctorPatientCommunicationImg(HttpSession session, @RequestParam("image") MultipartFile image) {
        return doctorPatientCommunicationService.dpcUploadImg(image, (Integer) session.getAttribute("childIdBD"));
    }

    // 医患交流库 医患沟通 上传视频
    @PostMapping(value = "/write/DPC/uploadVideo")
    @ResponseBody
    public String dpcDoctorPatientCommunicationVideo(HttpSession session, @RequestParam("video") MultipartFile video) {
        return doctorPatientCommunicationService.dpcUploadVideo(video, (Integer) session.getAttribute("childIdBD"));
    }

    // 医患交流库 医患沟通 数据获取
    @GetMapping(value = "/write/DPC/getDpcData")
    @ResponseBody
    public String dpcDoctorPatientCommunicationGet(HttpSession session) {
        return doctorPatientCommunicationService.getDoctorPatientCommunication((Integer) session.getAttribute("childIdBD"), (Integer) session.getAttribute("motherIdBD"));
    }

    // 医患交流库 医患沟通 数据删除
    @GetMapping(value = "/write/DPC/deleteDpcData")
    @ResponseBody
    public String dpcDoctorPatientCommunicationDelete(HttpSession session, @RequestParam("dcpId") String dcpIdString) {
        int dcpId = 0;
        if (dcpIdString != null && !dcpIdString.equals("")) {
            dcpId = Integer.parseInt(dcpIdString);
        }
        return doctorPatientCommunicationService.deleteDoctorPatientCommunication(dcpId, (Integer) session.getAttribute("childIdBD"), (Integer) session.getAttribute("motherIdBD"));
    }

    // 医患交流库 医患沟通 提交
    @PostMapping(value = "/write/DPC/post")
    @ResponseBody
    public String dpcDoctorPatientCommunicationPost(HttpSession session, @RequestParam("text") String text) {
        return doctorPatientCommunicationService.saveDPCDPC(text, (Integer) session.getAttribute("childIdBD"), (Integer) session.getAttribute("motherIdBD"));
    }

    // 医患交流库 病例审核 页面
    @GetMapping(value = "/review")
    public String doctorPatientCommunicationReview(Model model, HttpSession session) {
        try {
            if (session.getAttribute("motherIdBD") != null) {
                try {
                    if (session.getAttribute("childIdBD") != null) {
                        int childId = (Integer) session.getAttribute("childIdBD");
                        int motherId = (Integer) session.getAttribute("motherIdBD");
                        CaseStatus caseStatus = doctorPatientCommunicationService.getDpcCaseStatus(childId, motherId);
                        if (caseStatus == null) {
                            return "redirect:/perinatalPlatform/doctorPatientCommunication/write/BMD";
                        }
                        model.addAttribute("caseStatus", caseStatus);
                        model.addAttribute("reviewCount", doctorPatientCommunicationService.getDpcReviewCount(childId, motherId));
                        model.addAttribute("reviewList", doctorPatientCommunicationService.getDpcReview(childId, motherId));
                        return "perinatalPlatform/doctorPatientCommunication/DPCReview";
                    }
                } catch (NullPointerException ignored) {}
                return "redirect:/perinatalPlatform/basicDatabase/write/BS";
            }
        } catch (NullPointerException ignored) {}
        return "redirect:/perinatalPlatform/basicDatabase/write/MI";
    }

    // 医患交流库 病例审核 信息提交
    @PostMapping(value = "/review/post")
    @ResponseBody
    public String doctorPatientCommunicationReviewPost(HttpSession session,
                                                       Review dpcReview) {
        return doctorPatientCommunicationService.addDpcReview(dpcReview, (Integer) session.getAttribute("childIdBD"), (Integer) session.getAttribute("motherIdBD"));
    }
}