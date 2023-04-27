package com.pnsrcp.web.controller.manage;

import com.pnsrcp.web.entity.manage.User;
import com.pnsrcp.web.service.ManageService;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;

/**
 * @Project: 围产新生儿科研合作平台
 * @Author: Linyer
 * @Email: linyer@linyer.cn
 * @Date: 2021/9/18 15:46 星期六
 * @Description: 用户管理 控制层
 */
@Controller
@RequestMapping("/manage/user")
public class UserController {
    @Resource
    private ManageService manageService;

    // 用户管理 页面
    @GetMapping(value = {"/", ""})
    public String user(Model model, @RequestParam(value = "hid", required = false) String hidInput) {
        int hospitalId = 0;
        if (hidInput != null) {
            hospitalId = Integer.parseInt(hidInput);
            model.addAttribute("hospitalId", hospitalId);
            model.addAttribute("hospitalName", manageService.getHospitalNameByHid(hospitalId));
            model.addAttribute("userCount", manageService.getUserCount(hospitalId));
        }
        return "manage/user";
    }

    // 获取 用户信息 json
    @GetMapping(value = "/get")
    @ResponseBody
    public String getUser(@RequestParam("page") String page,
                          @RequestParam("limit") String limit,
                          @RequestParam(value = "hid", required = false) String hidInput) {
        int hospitalId = 0;
        if (hidInput != null) {
            hospitalId = Integer.parseInt(hidInput);
        }
        return manageService.getUserByHospital(Integer.parseInt(page), Integer.parseInt(limit), hospitalId);
    }

    // 修改 用户
    @PostMapping(value = "/modify")
    @ResponseBody
    public String modifyUser(User user) {
        return manageService.modifyUser(user);
    }
}
