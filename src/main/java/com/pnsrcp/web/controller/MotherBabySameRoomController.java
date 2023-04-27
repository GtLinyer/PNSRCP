package com.pnsrcp.web.controller;

import com.pnsrcp.web.config.MyUserDetails;
import com.pnsrcp.web.entity.manage.User;
import com.pnsrcp.web.entity.perintalPlatform.CaseStatus;
import com.pnsrcp.web.entity.perintalPlatform.Review;
import com.pnsrcp.web.entity.perintalPlatform.motherBabySameRoom.MBSRBloodOxygenMonitor;
import com.pnsrcp.web.service.MotherBabySameRoomService;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.annotation.Resource;
import javax.servlet.http.HttpSession;

/**
 * @Project: 围产新生儿科研合作平台
 * @Author: Linyer
 * @Email: linyer@linyer.cn
 * @Date: 2021/8/21 20:47 星期六
 * @Description: 母婴同室库 控制层
 */
@Controller
@RequestMapping("/perinatalPlatform/motherBabySameRoom")
public class MotherBabySameRoomController {
    // 服务层 注入
    @Resource
    private MotherBabySameRoomService motherBabySameRoomService;

    // 母婴同室库 血氧监测 添加/编辑 页面
    @GetMapping(value = "/write/BOM")
    public String mbsrBloodOxygenMonitorEdit(Model model, HttpSession session) {
        try {
            if (session.getAttribute("motherIdBD") != null) {
                try {
                    if (session.getAttribute("childIdBD") != null) {
                        int childIdBD = (Integer) session.getAttribute("childIdBD");
                        int motherIdBD = (Integer) session.getAttribute("motherIdBD");
                        model.addAttribute("birthday", motherBabySameRoomService.getChildBirthday(childIdBD, motherIdBD));
                        model.addAttribute("bloodOxygenMonitor", motherBabySameRoomService.getMBSRBloodOxygenMonitor(childIdBD, motherIdBD));
                        return "perinatalPlatform/motherBabySameRoom/BOM";
                    }
                } catch (NullPointerException ignored) {}
                return "redirect:/perinatalPlatform/basicDatabase/write/BS";
            }
        } catch (NullPointerException ignored) {}
        return "redirect:/perinatalPlatform/basicDatabase/write/MI";
    }

    // 母婴同室库 血氧监测 数据提交
    @PostMapping(value = "/write/BOM/post")
    @ResponseBody
    public String mbsrBloodOxygenMonitorBOMPost(HttpSession session,
                                                MBSRBloodOxygenMonitor mbsrBloodOxygenMonitor) {
        MyUserDetails userDetails = (MyUserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        User user = userDetails.getUser();
        return motherBabySameRoomService.saveMbsrBOM(mbsrBloodOxygenMonitor, (Integer) session.getAttribute("childIdBD"), (Integer) session.getAttribute("motherIdBD"), user.getUid(), user.getHospitalId());
    }

    // 母婴同室库 病例审核 页面
    @GetMapping(value = "/review")
    public String basicDatabaseReview(Model model, HttpSession session) {
        try {
            if (session.getAttribute("motherIdBD") != null) {
                try {
                    if (session.getAttribute("childIdBD") != null) {
                        int childIdBD = (Integer) session.getAttribute("childIdBD");
                        int motherIdBD = (Integer) session.getAttribute("motherIdBD");
                        CaseStatus caseStatus = motherBabySameRoomService.getMbsrCaseStatus(childIdBD, motherIdBD);
                        if (caseStatus == null) {
                            return "redirect:/perinatalPlatform/motherBabySameRoom/write/BOM";
                        }
                        model.addAttribute("caseStatus", caseStatus);
                        model.addAttribute("reviewCount", motherBabySameRoomService.getMbsrReviewCount(childIdBD, motherIdBD));
                        model.addAttribute("reviewList", motherBabySameRoomService.getMbsrReview(childIdBD, motherIdBD));
                        return "perinatalPlatform/motherBabySameRoom/MBSRReview";
                    }
                } catch (NullPointerException ignored) {}
                return "redirect:/perinatalPlatform/basicDatabase/write/BS";
            }
        } catch (NullPointerException ignored) {}
        return "redirect:/perinatalPlatform/basicDatabase/write/MI";
    }

    // 母婴同室库 病例审核 信息提交
    @PostMapping(value = "/review/post")
    @ResponseBody
    public String basicDatabaseReviewPost(HttpSession session,
                                          Review mbsrReview) {
        mbsrReview.setCid((Integer) session.getAttribute("childIdBD"));
        mbsrReview.setMid((Integer) session.getAttribute("motherIdBD"));
        return motherBabySameRoomService.addMbsrReview(mbsrReview);
    }
}
