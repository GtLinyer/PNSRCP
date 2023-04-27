package com.pnsrcp.web.controller.manage;

import com.pnsrcp.web.config.MyUserDetails;
import com.pnsrcp.web.entity.Feedback;
import com.pnsrcp.web.entity.manage.User;
import com.pnsrcp.web.service.ManageService;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.annotation.Resource;
import java.util.List;

/**
 * @Project: 围产新生儿科研合作平台
 * @Author: Linyer
 * @Email: linyer@linyer.cn
 * @Date: 2021/9/18 15:50 星期六
 * @Description: 反馈处理 控制层
 */
@Controller
@RequestMapping("/manage/feedback")
public class FeedbackController {
    @Resource
    private ManageService manageService;

    // 反馈处理 页面
    @GetMapping(value = {"/", ""})
    public String feedback(Model model) {
        List<Feedback> feedbackList = manageService.getAllFeedback();
        for (Feedback feedback : feedbackList) {
            List<Feedback> replyList = manageService.getReply(feedback.getId());
            if (replyList != null && replyList.size() > 0) {
                feedback.setReply(replyList);
            }
        }
        model.addAttribute("feedbackList", feedbackList);
        return "manage/feedback";
    }

    // 回复 提交
    @PostMapping(value = "/reply")
    @ResponseBody
    public String feedbackReply(Feedback feedback) {
        MyUserDetails userDetails = (MyUserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        User user = userDetails.getUser();
        return manageService.saveFeedback(feedback, user);
    }
}
