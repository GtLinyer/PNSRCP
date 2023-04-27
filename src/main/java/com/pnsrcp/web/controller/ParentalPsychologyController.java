package com.pnsrcp.web.controller;

import com.pnsrcp.web.entity.perintalPlatform.CaseStatus;
import com.pnsrcp.web.entity.perintalPlatform.Review;
import com.pnsrcp.web.entity.perintalPlatform.parentalPsychology.PPPoEpds;
import com.pnsrcp.web.entity.perintalPlatform.parentalPsychology.PPPoSasOrSds;
import com.pnsrcp.web.entity.perintalPlatform.parentalPsychology.PPPrEpds;
import com.pnsrcp.web.entity.perintalPlatform.parentalPsychology.PPPrSasOrSds;
import com.pnsrcp.web.service.ParentalPsychologyService;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import javax.servlet.http.HttpSession;

/**
 * @Project: 围产新生儿科研合作平台
 * @Author: Linyer
 * @Email: linyer@linyer.cn
 * @Date: 2021/8/22 0:15 星期日
 * @Description: 父母心理库 控制层
 */
@Controller
@RequestMapping("/perinatalPlatform/parentalPsychology")
public class ParentalPsychologyController {
    // 服务层 注入
    @Resource
    private ParentalPsychologyService parentalPsychologyService;

    // 父母心理库 产前心理 EPDS 添加/编辑 页面
    @GetMapping(value = "/write/PR/EPDS")
    public String ppPrEpdsEdit(Model model, HttpSession session) {
        try {
            if (session.getAttribute("motherIdBD") != null) {
                int motherIdBD = (Integer) session.getAttribute("motherIdBD");
                model.addAttribute("expectedDeliveryDate", parentalPsychologyService.getEdd(motherIdBD));
                model.addAttribute("evaluationsNumber", parentalPsychologyService.getPrEpdsEvaluationsNumber(motherIdBD));
                model.addAttribute("prEpdsList", parentalPsychologyService.getPpPrEpds(motherIdBD));
                return "perinatalPlatform/parentalPsychology/PREPDS";
            }
        } catch (NullPointerException ignored) {}
        return "redirect:/perinatalPlatform/basicDatabase/write/MI";
    }

    // 父母心理库 产前心理 保存 预产期
    @GetMapping(value = "/write/saveEDD")
    @ResponseBody
    public String saveEDD(HttpSession session,
                          @RequestParam("expectedDeliveryDate") String expectedDeliveryDate) {
        return parentalPsychologyService.saveEdd((Integer) session.getAttribute("motherIdBD"), expectedDeliveryDate);
    }

    // 父母心理库 产前心理 保存 EPDS评估
    @PostMapping(value = "/write/PR/EPDS/save")
    @ResponseBody
    public String savePpPrEPDS(HttpSession session,
                           PPPrEpds ppPrEpds) {
        return parentalPsychologyService.savePpPrEpds(ppPrEpds, (Integer) session.getAttribute("motherIdBD"));
    }

    // 父母心理库 产前心理 删除 EPDS评估
    @GetMapping(value = "/write/PR/RPDS/delete")
    @ResponseBody
    public String deletePpPrEPDS(@RequestParam("id") String id) {
        return parentalPsychologyService.deletePpPrEpds(Integer.parseInt(id));
    }

    // 父母心理库 产前心理 SAS 添加/编辑 页面
    @GetMapping(value = "/write/PR/SAS")
    public String ppPrSASEdit(Model model, HttpSession session) {
        try {
            if (session.getAttribute("motherIdBD") != null) {
                int motherIdBD = (Integer) session.getAttribute("motherIdBD");
                model.addAttribute("expectedDeliveryDate", parentalPsychologyService.getEdd(motherIdBD));
                model.addAttribute("evaluationsNumber", parentalPsychologyService.getPrSasEvaluationsNumber(motherIdBD));
                model.addAttribute("prSasList", parentalPsychologyService.getPpPrSas(motherIdBD));
                return "perinatalPlatform/parentalPsychology/PRSAS";
            }
        } catch (NullPointerException ignored) {}
        return "redirect:/perinatalPlatform/basicDatabase/write/MI";
    }

    // 父母心理库 产前心理 保存 SAS评估
    @PostMapping(value = "/write/PR/SAS/save")
    @ResponseBody
    public String savePpPrSAS(HttpSession session,
                           PPPrSasOrSds ppPrSas) {
        return parentalPsychologyService.savePpPrSas(ppPrSas, (Integer) session.getAttribute("motherIdBD"));
    }

    // 父母心理库 产前心理 删除 SAS评估
    @GetMapping(value = "/write/PR/SAS/delete")
    @ResponseBody
    public String deletePpPrSAS(@RequestParam("id") String id) {
        return parentalPsychologyService.deletePpPrSas(Integer.parseInt(id));
    }

    // 父母心理库 产前心理 SDS 添加/编辑 页面
    @GetMapping(value = "/write/PR/SDS")
    public String ppPrSDSEdit(Model model, HttpSession session) {
        try {
            if (session.getAttribute("motherIdBD") != null) {
                int motherIdBD = (Integer) session.getAttribute("motherIdBD");
                model.addAttribute("expectedDeliveryDate", parentalPsychologyService.getEdd(motherIdBD));
                model.addAttribute("evaluationsNumber", parentalPsychologyService.getPrSdsEvaluationsNumber(motherIdBD));
                model.addAttribute("prSdsList", parentalPsychologyService.getPpPrSds(motherIdBD));
                return "perinatalPlatform/parentalPsychology/PRSDS";
            }
        } catch (NullPointerException ignored) {}
        return "redirect:/perinatalPlatform/basicDatabase/write/MI";
    }

    // 父母心理库 产前心理 保存 SDS评估
    @PostMapping(value = "/write/PR/SDS/save")
    @ResponseBody
    public String savePpPrSDS(HttpSession session,
                              PPPrSasOrSds ppPrSds) {
        return parentalPsychologyService.savePpPrSds(ppPrSds, (Integer) session.getAttribute("motherIdBD"));
    }

    // 父母心理库 产前心理 删除 SDS评估
    @GetMapping(value = "/write/PR/SDS/delete")
    @ResponseBody
    public String deletePpPrSDS(@RequestParam("id") String id) {
        return parentalPsychologyService.deletePpPrSds(Integer.parseInt(id));
    }

    // 父母心理库 产后心理 EPDS 添加/编辑 页面
    @GetMapping(value = "/write/PO/EPDS")
    public String ppPoEpdsEdit(Model model, HttpSession session) {
        try {
            if (session.getAttribute("motherIdBD") != null) {
                int motherIdBD = (Integer) session.getAttribute("motherIdBD");
                model.addAttribute("birthday", parentalPsychologyService.getBirthday(motherIdBD));
                model.addAttribute("evaluationsNumber", parentalPsychologyService.getPoEpdsEvaluationsNumber(motherIdBD));
                model.addAttribute("poEpdsList", parentalPsychologyService.getPpPoEpds(motherIdBD));
                return "perinatalPlatform/parentalPsychology/POEPDS";
            }
        } catch (NullPointerException ignored) {}
        return "redirect:/perinatalPlatform/basicDatabase/write/MI";
    }

    // 父母心理库 产后心理 保存 预产期
    @GetMapping(value = "/write/saveBirthday")
    @ResponseBody
    public String saveBirthday(HttpSession session,
                               @RequestParam("birthday") String birthday) {
        return parentalPsychologyService.saveBirthday((Integer) session.getAttribute("motherIdBD"), birthday);
    }

    // 父母心理库 产后心理 保存 EPDS评估
    @PostMapping(value = "/write/PO/EPDS/save")
    @ResponseBody
    public String savePpPoEPDS(HttpSession session,
                              PPPoEpds poEpds) {
        return parentalPsychologyService.savePpPoEpds(poEpds, (Integer) session.getAttribute("motherIdBD"));
    }

    // 父母心理库 产后心理 删除 EPDS评估
    @GetMapping(value = "/write/PO/EPDS/delete")
    @ResponseBody
    public String deletePpPoEPDS(@RequestParam("id") String id) {
        return parentalPsychologyService.deletePpPoEpds(Integer.parseInt(id));
    }

    // 父母心理库 产后心理 SAS 添加/编辑 页面
    @GetMapping(value = "/write/PO/SAS")
    public String ppPoSASEdit(Model model, HttpSession session) {
        try {
            if (session.getAttribute("motherIdBD") != null) {
                int motherIdBD = (Integer) session.getAttribute("motherIdBD");
                model.addAttribute("birthday", parentalPsychologyService.getBirthday(motherIdBD));
                model.addAttribute("evaluationsNumber", parentalPsychologyService.getPoSasEvaluationsNumber(motherIdBD));
                model.addAttribute("poSasList", parentalPsychologyService.getPpPoSas(motherIdBD));
                return "perinatalPlatform/parentalPsychology/POSAS";
            }
        } catch (NullPointerException ignored) {}
        return "redirect:/perinatalPlatform/basicDatabase/write/MI";
    }

    // 父母心理库 产后心理 保存 SAS评估
    @PostMapping(value = "/write/PO/SAS/save")
    @ResponseBody
    public String savePpPoSAS(HttpSession session,
                              PPPoSasOrSds ppPoSas) {
        return parentalPsychologyService.savePpPoSas(ppPoSas, (Integer) session.getAttribute("motherIdBD"));
    }

    // 父母心理库 产后心理 删除 SAS评估
    @GetMapping(value = "/write/PO/SAS/delete")
    @ResponseBody
    public String deletePpPoSAS(@RequestParam("id") String id) {
        return parentalPsychologyService.deletePpPoSas(Integer.parseInt(id));
    }
    // 父母心理库 产后心理 SDS 添加/编辑 页面
    @GetMapping(value = "/write/PO/SDS")
    public String ppPoSDSEdit(Model model, HttpSession session) {
        try {
            if (session.getAttribute("motherIdBD") != null) {
                int motherIdBD = (Integer) session.getAttribute("motherIdBD");
                model.addAttribute("birthday", parentalPsychologyService.getBirthday(motherIdBD));
                model.addAttribute("evaluationsNumber", parentalPsychologyService.getPoSdsEvaluationsNumber(motherIdBD));
                model.addAttribute("poSdsList", parentalPsychologyService.getPpPoSds(motherIdBD));
                return "perinatalPlatform/parentalPsychology/POSDS";
            }
        } catch (NullPointerException ignored) {}
        return "redirect:/perinatalPlatform/basicDatabase/write/MI";
    }

    // 父母心理库 产后心理 保存 SDS评估
    @PostMapping(value = "/write/PO/SDS/save")
    @ResponseBody
    public String savePpPoSDS(HttpSession session,
                              PPPoSasOrSds ppPoSds) {
        return parentalPsychologyService.savePpPoSds(ppPoSds, (Integer) session.getAttribute("motherIdBD"));
    }

    // 父母心理库 产后心理 删除 SDS评估
    @GetMapping(value = "/write/PO/SDS/delete")
    @ResponseBody
    public String deletePpPoSDS(@RequestParam("id") String id) {
        return parentalPsychologyService.deletePpPoSds(Integer.parseInt(id));
    }

    // 父母心理库 病例审核 页面
    @GetMapping(value = "/review")
    public String parentalPsychologyReview(Model model, HttpSession session) {
        try {
            if (session.getAttribute("motherIdBD") != null) {
                int motherIdBD = (Integer) session.getAttribute("motherIdBD");
                CaseStatus caseStatus = parentalPsychologyService.getPpCaseStatus(motherIdBD);
                if (caseStatus == null) {
                    return "redirect:/perinatalPlatform/parentalPsychology/write/PR/EPDS";
                }
                model.addAttribute("caseStatus", caseStatus);
                model.addAttribute("reviewCount", parentalPsychologyService.getPpReviewCount(motherIdBD));
                model.addAttribute("reviewList", parentalPsychologyService.getPpReview(motherIdBD));
                return "perinatalPlatform/parentalPsychology/PPReview";
            }
        } catch (NullPointerException ignored) {}
        return "redirect:/perinatalPlatform/basicDatabase/write/MI";
    }

    // 父母心理库 病例审核 信息提交
    @PostMapping(value = "/review/post")
    @ResponseBody
    public String parentalPsychologyReviewPost(HttpSession session,
                                               Review ppReview) {
        ppReview.setMid((Integer) session.getAttribute("motherIdBD"));
        return parentalPsychologyService.addPpReview(ppReview);
    }
}
