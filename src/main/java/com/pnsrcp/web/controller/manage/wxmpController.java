package com.pnsrcp.web.controller.manage;

import com.pnsrcp.web.service.ManageService;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.annotation.Resource;

/**
 * @Project: 围产新生儿科研合作平台
 * @Author: Linyer
 * @Email: linyer@linyer.cn
 * @Date: 2022/04/30 08:07 星期六
 * @Description: 围产新生儿科研合作平台 微信小程序 管理
 */
@Controller
@RequestMapping("/manage/wxmp")
public class wxmpController {
    @Resource
    private ManageService manageService;

    // 小程序管理 页面
    @GetMapping(value = {"/", ""})
    public String wxmp(Model model) {
        model.addAttribute("wxmpAdImageList", manageService.getWxmpAdImages());
        return "manage/wxmp";
    }

    // 小程序管理 上传广告图片
    @PostMapping(value = "/uploadAdImage")
    @ResponseBody
    public String uploadAdImage(@RequestParam("image") MultipartFile image) {
        return manageService.uploadAdImage(image);
    }

    // 小程序管理 删除广告图片
    @GetMapping(value = "/deleteAdImage")
    @ResponseBody
    public String deleteAdImage(@RequestParam("id") String id) {
        return manageService.deleteAdImage(id);
    }
}
