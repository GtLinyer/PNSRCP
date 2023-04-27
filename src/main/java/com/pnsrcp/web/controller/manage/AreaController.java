package com.pnsrcp.web.controller.manage;

import com.pnsrcp.web.entity.manage.*;
import com.pnsrcp.web.service.ManageService;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;

/**
 * @Project: 围产新生儿科研合作平台
 * @Author: Linyer
 * @Email: linyer@linyer.cn
 * @Date: 2021/5/27 23:12 星期四
 * @Description: 区域管理 控制层
 */
@Controller
@RequestMapping("/manage/area")
public class AreaController {
    @Resource
    private ManageService manageService;

    // 区域管理 页面
    @GetMapping(value = {"/", ""})
    public String area(Model model) {
        model.addAttribute("areaList", manageService.getArea());
        model.addAttribute("areaHospitalList", manageService.getAreaHospital(0));
        return "manage/area";
    }

    // 新增 区域
    @PostMapping(value = "/add")
    @ResponseBody
    public String addArea(Area area,
                          @RequestParam("password") String pwd) {
        return manageService.addArea(area, pwd);
    }

    // 获取 此区域 信息
    @GetMapping(value = "/getAreaMsg")
    @ResponseBody
    public String getThisAreaMsg(@RequestParam("aid") String aid) {
        return manageService.getThisAreaMsg(Integer.parseInt(aid));
    }

    // 修改 区域信息
    @PostMapping(value = "/modify")
    @ResponseBody
    public String modifyArea(Area area,
                             @RequestParam("password") String pwd) {
        return manageService.modifyArea(area, pwd);
    }

    // 设置 区域状态
    @GetMapping(value = "/setStatus")
    @ResponseBody
    public String setStatus(@RequestParam("status") String status,
                            @RequestParam("areaId") String areaId) {
        return manageService.setStatus(Integer.parseInt(status), Integer.parseInt(areaId));
    }

    // 获取 此区域 下属医院
    @GetMapping(value = "/getAreaHospital")
    @ResponseBody
    public String getAreaHospital(@RequestParam("aid") String aid) {
        return manageService.getThisAreaHospital(Integer.parseInt(aid));
    }

    // 设置 区域 下属医院
    @PostMapping(value = "/setHospital")
    @ResponseBody
    public String setHospital(@RequestParam("aid") String aid,
                              @RequestParam(value = "hospitalId[]", required = false) String[] hospitalIdArray) {
        return manageService.setHospital(Integer.parseInt(aid), hospitalIdArray);
    }

    // 设置 区域 权限
    @PostMapping(value = "/setAuthority")
    @ResponseBody
    public String setAreaAuthority(AreaAuthBD areaAuthBD, AreaAuthDPC areaAuthDPC, AreaAuthMBSR areaAuthMBSR,
                                   AreaAuthPP areaAuthPP, AreaAuthRD areaAuthRD, AreaAuthUI areaAuthUI,
                                   AreaAuthFD areaAuthFD, AreaAuthHB areaAuthHB) {
        return manageService.setAreaAuthority(areaAuthBD, areaAuthDPC, areaAuthMBSR, areaAuthPP, areaAuthRD, areaAuthUI,
                areaAuthFD, areaAuthHB);
    }

    // 获取 区域 权限
    @GetMapping(value = "/getAuthority")
    @ResponseBody
    public String getAreaAuthority(@RequestParam("aid") String aid) {
        return manageService.getAreaAuthority(Integer.parseInt(aid));
    }
}