package com.pnsrcp.web.controller;

import com.pnsrcp.web.config.MyUserDetails;
import com.pnsrcp.web.entity.Feedback;
import com.pnsrcp.web.entity.manage.Area;
import com.pnsrcp.web.entity.manage.Hospital;
import com.pnsrcp.web.entity.manage.User;
import com.pnsrcp.web.service.MainService;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.annotation.Resource;
import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

/**
 * @Project: 围产新生儿科研合作平台
 * @Author: Linyer
 * @Email: linyer@linyer.cn
 * @Date: 2021/5/21 23:08 星期五
 * @Description: 主页面 控制层
 */
@Controller
public class MainController {
    // 服务层 注入
    @Resource
    private MainService mainService;

    @GetMapping(value = "/main")
    public String main(Model model) {
        MyUserDetails userDetails = (MyUserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        User user = userDetails.getUser();
        Hospital hospitalMsg = mainService.getHospitalMsg(user.getHospitalId());
        if (hospitalMsg != null) {
            model.addAttribute("hospitalLocation", hospitalMsg.getLocation());
            model.addAttribute("hospitalName", hospitalMsg.getHospitalName());
            model.addAttribute("hospitalAbbreviation", hospitalMsg.getAbbreviation());
        }
        Area areaMsg = mainService.getAreaMsg(user.getUid());
        if (areaMsg != null) {
            model.addAttribute("areaName", areaMsg.getAreaName());
            model.addAttribute("areaAbbreviation", areaMsg.getAbbreviation());
        }
        int hospitalId = 0, userId;
        List<Integer> hospitalIdList = new ArrayList<>();
        // 用户/医院 权限
        if (user.getLevel() == 2) {
            hospitalId = user.getHospitalId();
        } else if(user.getLevel() == 3) {
            userId = user.getUid();
            hospitalIdList = mainService.getAreaHospitalId(userId);
        }
        model.addAttribute("dataAmountList", mainService.getDataAmount(hospitalId, hospitalIdList));
        return "main";
    }

    @GetMapping(value = "/main/data")
    @ResponseBody
    public String mainData(@RequestParam(value = "selectType") String selectType,
                           @RequestParam(value = "startDate", required = false) String startDateString,
                           @RequestParam(value = "endDate", required = false) String endDateString,
                           @RequestParam(value = "inHospital", required = false) String inHospitalString) {
        MyUserDetails userDetails = (MyUserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        User user = userDetails.getUser();
        Date startDate = null, endDate = null;
        int inHospital = -1, hospitalId = 0;
        DateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        List<Integer> hospitalIdList = new ArrayList<>();
        // 用户/医院 权限
        if (user.getLevel() == 2) {
            hospitalId = user.getHospitalId();
        } else if(user.getLevel() == 3) {
            hospitalIdList = mainService.getAreaHospitalId(user.getUid());
        }
        if (inHospitalString != null && !inHospitalString.equals("")) {
            inHospital = Integer.parseInt(inHospitalString);
        }

        // 日期范围
        if (startDateString != null && endDateString != null && !startDateString.equals("") && !endDateString.equals("")) {
            try {
                startDate = df.parse(startDateString);
                endDate = df.parse(endDateString);
            }catch (ParseException ignored) {}
        }
        return mainService.getData(selectType, startDate, endDate, inHospital, hospitalId, hospitalIdList);
    }

    // 反馈
    @GetMapping(value = "/feedback")
    public String feedback(Model model) {
        MyUserDetails userDetails = (MyUserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        User user = userDetails.getUser();
        List<Feedback> feedbackList = mainService.getFeedback(user.getUid());
        for (Feedback feedback : feedbackList) {
            List<Feedback> replyList = mainService.getFeedbackReply(feedback.getId());
            if (replyList != null && replyList.size() > 0) {
                feedback.setReply(replyList);
            }
        }
        model.addAttribute("feedbackList", feedbackList);
        return "feedback";
    }

    // 新增反馈
    @GetMapping(value = "/feedback/add")
    public String adFfeedback(Model model) {
        MyUserDetails userDetails = (MyUserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        User user = userDetails.getUser();
        Hospital hospitalMsg = mainService.getHospitalMsg(user.getHospitalId());
        model.addAttribute("fullName", user.getFullName());
        model.addAttribute("hospitalAbbreviation", hospitalMsg.getAbbreviation());
        model.addAttribute("hospitalName", hospitalMsg.getHospitalName());
        return "addFeedback";
    }

    // 反馈 上传图片
    @PostMapping(value = "/feedback/uploadImg")
    @ResponseBody
    public String feedbackImg(@RequestParam("image") MultipartFile file) {
        return mainService.uploadImg(file);
    }

    // 反馈 提交
    @PostMapping(value = "/feedback/post")
    @ResponseBody
    public String feedbackPost(Feedback feedback) {
        MyUserDetails userDetails = (MyUserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        User user = userDetails.getUser();
        return mainService.saveFeedback(feedback, user);
    }
}