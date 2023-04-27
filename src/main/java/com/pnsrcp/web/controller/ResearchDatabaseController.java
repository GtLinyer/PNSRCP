package com.pnsrcp.web.controller;

import com.pnsrcp.web.config.MyUserDetails;
import com.pnsrcp.web.entity.manage.User;
import com.pnsrcp.web.entity.perintalPlatform.CaseStatus;
import com.pnsrcp.web.entity.perintalPlatform.Review;
import com.pnsrcp.web.entity.perintalPlatform.researchDatabase.RDHypothermiaQI;
import com.pnsrcp.web.service.ResearchDatabaseService;
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
 * @Date: 2022/05/31 16:47 星期二
 * @Description: 围产新生儿科研合作平台 研究数据库 控制层
 */
@Controller
@RequestMapping("/perinatalPlatform/researchDatabase")
public class ResearchDatabaseController {
    // 服务层 注入
    @Resource
    private ResearchDatabaseService researchDatabaseService;

    // 研究数据库 低体温QI 添加/编辑 页面
    @GetMapping(value = "/write/HQI")
    public String rdHypothermiaQIEdit(Model model, HttpSession session) {
        try {
            if (session.getAttribute("motherIdBD") != null) {
                try {
                    if (session.getAttribute("childIdBD") != null) {
                        int childIdBD = (Integer) session.getAttribute("childIdBD");
                        int motherIdBD = (Integer) session.getAttribute("motherIdBD");
                        model.addAttribute("hqiMsg", researchDatabaseService.getRdHqiMsg(childIdBD, motherIdBD));
                        model.addAttribute("hypothermiaQI", researchDatabaseService.getRdHypothermiaQI(childIdBD, motherIdBD));
                        return "perinatalPlatform/researchDatabase/HQI";
                    }
                } catch (NullPointerException ignored) {}
                return "redirect:/perinatalPlatform/basicDatabase/write/BS";
            }
        } catch (NullPointerException ignored) {}
        return "redirect:/perinatalPlatform/basicDatabase/write/MI";
    }

    // 研究数据库 低体温QI 保存 预产期
    @PostMapping(value = "/write/HQI/post")
    @ResponseBody
    public String rdHypothermiaQIPost(HttpSession session, RDHypothermiaQI rdHypothermiaQI) {
        MyUserDetails userDetails = (MyUserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        User user = userDetails.getUser();
        return researchDatabaseService.saveRDHQI(rdHypothermiaQI, (Integer) session.getAttribute("childIdBD"), (Integer) session.getAttribute("motherIdBD"), user.getUid(), user.getHospitalId());
    }

    // 研究数据库 病例审核 页面
    @GetMapping(value = "/review")
    public String researchDatabaseReview(Model model, HttpSession session) {
        try {
            if (session.getAttribute("motherIdBD") != null) {
                try {
                    if (session.getAttribute("childIdBD") != null) {
                        int childIdBD = (Integer) session.getAttribute("childIdBD");
                        int motherIdBD = (Integer) session.getAttribute("motherIdBD");
                        CaseStatus caseStatus = researchDatabaseService.getRdCaseStatus(childIdBD, motherIdBD);
                        if (caseStatus == null) {
                            return "redirect:/perinatalPlatform/researchDatabase/write/HQI";
                        }
                        model.addAttribute("caseStatus", caseStatus);
                        model.addAttribute("reviewCount", researchDatabaseService.getRdReviewCount(childIdBD, motherIdBD));
                        model.addAttribute("reviewList", researchDatabaseService.getRdReview(childIdBD, motherIdBD));
                        return "perinatalPlatform/researchDatabase/RDReview";
                    }
                } catch (NullPointerException ignored) {}
                return "redirect:/perinatalPlatform/basicDatabase/write/BS";
            }
        } catch (NullPointerException ignored) {}
        return "redirect:/perinatalPlatform/basicDatabase/write/MI";
    }

    // 研究数据库 病例审核 信息提交
    @PostMapping(value = "/review/post")
    @ResponseBody
    public String researchDatabaseReviewPost(HttpSession session,
                                             Review rdReview) {
        return researchDatabaseService.addRdReview(rdReview, (Integer) session.getAttribute("childIdBD"), (Integer) session.getAttribute("motherIdBD"));
    }
}