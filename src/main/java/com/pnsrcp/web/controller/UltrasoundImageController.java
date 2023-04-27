package com.pnsrcp.web.controller;

import com.pnsrcp.web.entity.perintalPlatform.basicDatabaseNS.BDNSTreatmentDiagnosis;
import com.pnsrcp.web.service.UltrasoundImageService;
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
 * @Date: 2022/07/07 16:16 星期四
 * @Description: 超声影像库 控制层
 */
@Controller
@RequestMapping("/perinatalPlatform/ultrasoundImage")
public class UltrasoundImageController {
    // 服务层 注入
    @Resource
    UltrasoundImageService ultrasoundImageService;

    // 超声影像库 颅脑超声 添加/编辑 页面
    @GetMapping(value = "/write/BU")
    public String uiBrainUltrasoundEdit(Model model, HttpSession session) {
        try {
            if (session.getAttribute("motherIdBD") != null) {
                try {
                    if (session.getAttribute("childIdBD") != null) {
                        int childIdBD = (Integer) session.getAttribute("childIdBD");
                        int motherIdBD = (Integer) session.getAttribute("motherIdBD");
                        model.addAttribute("treatmentDiagnosis", ultrasoundImageService.getUiTreatmentDiagnosis(childIdBD, motherIdBD));
                        model.addAttribute("ultrasonographyNumber", ultrasoundImageService.getUiUltrasonographyNumber(childIdBD, motherIdBD));
                        model.addAttribute("buList", ultrasoundImageService.getUiBrainUltrasound(childIdBD, motherIdBD));
                        return "perinatalPlatform/ultrasoundImage/BU";
                    }
                } catch (NullPointerException ignored) {}
                return "redirect:/perinatalPlatform/basicDatabase/write/BS";
            }
        } catch (NullPointerException ignored) {}
        return "redirect:/perinatalPlatform/basicDatabase/write/MI";
    }

    // 超声影像库 颅脑超声 上传超声图片
    @PostMapping(value = "/write/BU/uploadImg")
    @ResponseBody
    public String uiBuUploadImg(HttpSession session,
                                @RequestParam("num") String num,
                                @RequestParam("index") String index,
                                @RequestParam("image") MultipartFile image) {
        return ultrasoundImageService.uiBuUploadImg(num, index, image, (Integer) session.getAttribute("childIdBD"));
    }

    // 超声影像库 颅脑超声 数据提交
    @PostMapping(value = "/write/BU/post")
    @ResponseBody
    public String uiBrainUltrasoundPost(HttpSession session,
                                        BDNSTreatmentDiagnosis bdnsTreatmentDiagnosis,
                                        @RequestParam(value = "ultrasonographyNumber") String ultrasonographyNumber,
                                        @RequestParam(value = "buArray") String buArray) {
        return ultrasoundImageService.saveUIBU(bdnsTreatmentDiagnosis, ultrasonographyNumber, buArray, (Integer) session.getAttribute("childIdBD"), (Integer) session.getAttribute("motherIdBD"));
    }
}