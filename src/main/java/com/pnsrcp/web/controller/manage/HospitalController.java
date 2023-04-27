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
 * @Date: 2021/9/18 15:44 星期六
 * @Description: 医院管理 控制层
 */
@Controller
@RequestMapping("/manage/hospital")
public class HospitalController {
    @Resource
    private ManageService manageService;

    // 医院管理 页面
    @GetMapping(value = {"/", ""})
    public String hospital(Model model, @RequestParam(value = "aid", required = false) String aid) {
        model.addAttribute("hospitalLevelList", manageService.getHospitalLevel());
        if (aid != null) {
            Area areaMsg = manageService.getAnAreaMsg(Integer.parseInt(aid));
            model.addAttribute("aid", aid);
            model.addAttribute("areaName", areaMsg.getAreaName());
            model.addAttribute("hospitalNum", areaMsg.getHospitalNum());
            model.addAttribute("chargePerson", areaMsg.getFullName());
        }
        return "manage/hospital";
    }

    // 获取 医院信息 json
    @GetMapping(value = "/get")
    @ResponseBody
    public String getHospital(@RequestParam("page") String page,
                              @RequestParam("limit") String limit,
                              @RequestParam(value = "aid", required = false) String aidInput) {
        int aid = 0;
        if (aidInput != null) {
            aid = Integer.parseInt(aidInput);
        }
        return manageService.getHospital(Integer.parseInt(page), Integer.parseInt(limit), aid);
    }

    // 新增 医院
    @PostMapping(value = "/add")
    @ResponseBody
    public String addHospital(Hospital hospital,
                              @RequestParam("password") String pwd) {
        return manageService.addHospital(hospital, pwd);
    }

    // 修改 医院信息
    @PostMapping(value = "/modify")
    @ResponseBody
    public String modifyHospital(Hospital hospital,
                                 @RequestParam("password") String pwd) {
        return manageService.modifyHospital(hospital, pwd);
    }

    // 获取 医院下 用户信息 json
    @GetMapping(value = "/getChargePerson")
    @ResponseBody
    public String getChargePerson(@RequestParam("hid") String hid) {
        return manageService.getChargePerson(Integer.parseInt(hid));
    }

    // 设置 医院 权限
    @PostMapping(value = "/setAuthority")
    @ResponseBody
    public String setHospitalAuthority(HospitalAuthBD hospitalAuthBD, HospitalAuthDPC hospitalAuthDPC, HospitalAuthMBSR hospitalAuthMBSR,
                                       HospitalAuthPP hospitalAuthPP, HospitalAuthRD hospitalAuthRD, HospitalAuthUI hospitalAuthUI,
                                       HospitalAuthFD hospitalAuthFD, HospitalAuthHB hospitalAuthHB) {
        return manageService.setHospitalAuthority(hospitalAuthBD, hospitalAuthDPC, hospitalAuthMBSR, hospitalAuthPP,
                hospitalAuthRD, hospitalAuthUI, hospitalAuthFD, hospitalAuthHB);
    }

    // 获取 医院 权限
    @GetMapping(value = "/getAuthority")
    @ResponseBody
    public String getHospitalAuthority(@RequestParam("hid") String hid) {
        return manageService.getHospitalAuthority(Integer.parseInt(hid));
    }
}
