package com.pnsrcp.web.controller;

import com.alibaba.fastjson.JSONObject;
import com.pnsrcp.web.config.MyUserDetails;
import com.pnsrcp.web.entity.manage.Area;
import com.pnsrcp.web.entity.manage.Hospital;
import com.pnsrcp.web.entity.manage.User;
import com.pnsrcp.web.entity.perintalPlatform.HBBaseInformation;
import com.pnsrcp.web.service.CaseService;
import com.pnsrcp.web.service.MainService;
import com.pnsrcp.web.service.ManageService;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import javax.servlet.http.HttpSession;
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
 * @Date: 2021/12/9 20:32 星期四
 * @Description: 病例查询 控制层
 */
@Controller
@RequestMapping("/perinatalPlatform")
public class CaseController {
    // 服务层 注入
    @Resource
    private CaseService caseService;
    @Resource
    private MainService mainService;
    @Resource
    private ManageService manageService;

    // 病例查询 页面
    @GetMapping(value = "/case")
    public String caseInquiry(Model model, HttpSession session) {
        session.removeAttribute("childIdBD");
        session.removeAttribute("motherIdBD");
        session.removeAttribute("motherHospitalNum");
        session.removeAttribute("pcMotherNum");
        session.removeAttribute("childFullName");
        session.removeAttribute("childHospitalNum");
        session.removeAttribute("pcChildNum");
        session.removeAttribute("weightGainDuringPregnancy");

        MyUserDetails userDetails = (MyUserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        User user = userDetails.getUser();
        int hospitalId = 0;
        List<Integer> hospitalIdList = new ArrayList<>();
        // 用户 权限
        if (user.getLevel() == 2) {
            hospitalId = user.getHospitalId();
        } else if(user.getLevel() == 3) {
            hospitalIdList = caseService.getAreaHospitalId(user.getUid());
        }
        model.addAttribute("dataAmountList", caseService.getDataAmount(hospitalId, hospitalIdList));
        return "perinatalPlatform/case/caseInquiry";
    }

    // 在session中 设置motherId childId
    @GetMapping(value = "/setChildIdSession")
    @ResponseBody
    public String setChildId(HttpSession session,
                             @RequestParam("motherId") String motherIdBD,
                             @RequestParam("childId") String childIdBD) {
        MyUserDetails userDetails = (MyUserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        User user = userDetails.getUser();
        int hospitalId = 0;
        List<Integer> hospitalIdList = new ArrayList<>();

        // 用户/医院 权限
        if (user.getLevel() == 2) {
            hospitalId = user.getHospitalId();
        } else if(user.getLevel() == 3) {
            hospitalIdList = caseService.getAreaHospitalId(user.getUid());
        }
        return caseService.setChildId(motherIdBD, childIdBD, user.getLevel(), hospitalId, hospitalIdList, session);
    }

    // 病例查询
    @GetMapping(value = "/getCase")
    @ResponseBody
    public String getCase(@RequestParam(value = "page", required = false) String pageString,
                          @RequestParam(value = "limit", required = false) String limitString,
                          @RequestParam(value = "selectType", required = false) String selectType,
                          @RequestParam(value = "startDate", required = false) String startDateString,
                          @RequestParam(value = "endDate", required = false) String endDateString,
                          @RequestParam(value = "caseStatus", required = false) String caseStatusString,
                          @RequestParam(value = "inHospital", required = false) String inHospitalString,
                          @RequestParam(value = "searchKey", required = false) String searchKey) {
        MyUserDetails userDetails = (MyUserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        User user = userDetails.getUser();
        int hospitalId = 0;
        List<Integer> hospitalIdList = new ArrayList<>();

        // 用户/医院 权限
        if (user.getLevel() == 2) {
            hospitalId = user.getHospitalId();
        } else if(user.getLevel() == 3) {
            hospitalIdList = caseService.getAreaHospitalId(user.getUid());
        }
        return caseService.getCase(pageString, limitString, selectType, startDateString, endDateString, caseStatusString, inHospitalString,
                user.getLevel(), hospitalId, hospitalIdList, searchKey);
    }

    // 删除病例
    @PostMapping(value = "/deleteCase")
    @ResponseBody
    public String deleteCase(@RequestParam("deletePwd") String deletePwd,
                             @RequestParam("motherId") String motherIdBD,
                             @RequestParam("childId") String childIdNBD) {
        MyUserDetails userDetails = (MyUserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        User user = userDetails.getUser();
        return caseService.deleteCase(Integer.parseInt(motherIdBD), Integer.parseInt(childIdNBD), user.getHospitalId(), deletePwd);
    }

    // 病例 填写完成
    @GetMapping(value = "/caseCompleted")
    @ResponseBody
    public String caseCompleted(HttpSession session) {
        return caseService.caseCompleted((Integer) session.getAttribute("motherIdBD"), (Integer) session.getAttribute("childIdBD"));
    }

    // 报表导出 页面
    @GetMapping(value = "/reportExport")
    public String reportExport(Model model) {
        MyUserDetails userDetails = (MyUserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        User user = userDetails.getUser();
        int hospitalId = 0;
        List<Integer> hospitalIdList = new ArrayList<>();
        // 用户/医院 权限
        if (user.getLevel() == 2) {
            hospitalId = user.getHospitalId();
        } else if(user.getLevel() == 3) {
            hospitalIdList = caseService.getAreaHospitalId(user.getUid());
        }
        model.addAttribute("dataAmountList", caseService.getDataAmount(hospitalId, hospitalIdList));
        return "perinatalPlatform/case/reportExport";
    }

    // 报表导出 查询
    @GetMapping(value = "/reportExport/getReportExport")
    @ResponseBody
    public String getReportExport(@RequestParam(value = "page", required = false) String pageString,
                                  @RequestParam(value = "limit", required = false) String limitString,
                                  @RequestParam(value = "selectType", required = false) String selectType,
                                  @RequestParam(value = "startDate", required = false) String startDateString,
                                  @RequestParam(value = "endDate", required = false) String endDateString,
                                  @RequestParam(value = "inHospital", required = false) String inHospitalString) {
        MyUserDetails userDetails = (MyUserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        User user = userDetails.getUser();
        List<Integer> hospitalIdList = new ArrayList<>();

        // 用户/医院 权限
        if (user.getLevel() == 1) {
            hospitalIdList = caseService.getAllHospitalId();
        } else if(user.getLevel() == 3) {
            hospitalIdList = caseService.getAreaHospitalId(user.getUid());
        }
        return caseService.getReportExport(pageString, limitString, startDateString, endDateString, selectType, hospitalIdList, inHospitalString);
    }

    // 报表导出 总数据
    @GetMapping(value = "/reportExport/getTotalReportExport")
    @ResponseBody
    public String getTotalReportExport(@RequestParam(value = "selectType", required = false) String selectType,
                                       @RequestParam(value = "startDate", required = false) String startDateString,
                                       @RequestParam(value = "endDate", required = false) String endDateString,
                                       @RequestParam(value = "inHospital", required = false) String inHospitalString) {
        MyUserDetails userDetails = (MyUserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        User user = userDetails.getUser();
        Date startDate = null, endDate = null;
        int inHospital = -1;
        DateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        List<Integer> hospitalIdList = new ArrayList<>();

        // 用户/医院 权限
        if (user.getLevel() == 1) {
            hospitalIdList = caseService.getAllHospitalId();
        } else if (user.getLevel() == 3) {
            hospitalIdList = caseService.getAreaHospitalId(user.getUid());
        }
        // 日期范围
        if (startDateString != null && endDateString != null && !startDateString.equals("") && !endDateString.equals("")) {
            try {
                startDate = df.parse(startDateString);
                endDate = df.parse(endDateString);
            } catch (ParseException ignored) {}
        }
        if (inHospitalString != null && !inHospitalString.equals("")) {
            inHospital = Integer.parseInt(inHospitalString);
        }
        return caseService.getTotalReportExport(startDate, endDate, selectType, hospitalIdList, inHospital);
    }

    // 数据导出 页面
    @GetMapping(value = "/dataExport")
    public String dataExport(Model model) {
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
        int hospitalId = 0;
        List<Integer> hospitalIdList = new ArrayList<>();
        // 用户/医院 权限
        if (user.getLevel() == 1) {
            model.addAttribute("areaHospitalList", manageService.getAreaHospital(0));
        } else if(user.getLevel() == 2) {
            hospitalId = user.getHospitalId();
        } else if(user.getLevel() == 3) {
            model.addAttribute("areaHospitalList", manageService.getAreaHospital(user.getUid()));
        }
        model.addAttribute("dataAmountList", caseService.getDataAmount(hospitalId, hospitalIdList));
        return "perinatalPlatform/case/dataExport";
    }

    // 数据导出 筛选
    @PostMapping(value = "/filterDataExport")
    @ResponseBody
    public String filterDataExport(@RequestParam(value = "selectType") String selectType,
                                   @RequestParam(value = "startDate", required = false) String startDateString,
                                   @RequestParam(value = "endDate", required = false) String endDateString,
                                   @RequestParam(value = "patientClassification", required = false) String patientClassificationString,
                                   @RequestParam(value = "diagnosisTreatment", required = false) String diagnosisTreatmentString,
                                   @RequestParam(value = "outcomeIndicator", required = false) String outcomeIndicatorString,
                                   @RequestParam(value = "hospitalIdArray", required = false) String hospitalIdArrayString) {
        MyUserDetails userDetails = (MyUserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        return caseService.filterDataExport(selectType, startDateString, endDateString, patientClassificationString, diagnosisTreatmentString,
                outcomeIndicatorString, hospitalIdArrayString, userDetails.getUser());
    }

    // 导出 数据 CSV
    @PostMapping(value = "/dataExportCSV")
    @ResponseBody
    public String dataExportCSV(@RequestParam(value = "selectType") String selectType,
                                @RequestParam(value = "startDate", required = false) String startDateString,
                                @RequestParam(value = "endDate", required = false) String endDateString,
                                @RequestParam(value = "patientClassification", required = false) String patientClassificationString,
                                @RequestParam(value = "diagnosisTreatment", required = false) String diagnosisTreatmentString,
                                @RequestParam(value = "outcomeIndicator", required = false) String outcomeIndicatorString,
                                @RequestParam(value = "hospitalIdArray", required = false) String hospitalIdArrayString,
                                @RequestParam(value = "allTables", required = false) String allTablesString,
                                @RequestParam(value = "allTableFields", required = false) String allTableFieldsString) {
        MyUserDetails userDetails = (MyUserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        return caseService.dataExportCSV(selectType, startDateString, endDateString, patientClassificationString, diagnosisTreatmentString,
                outcomeIndicatorString, hospitalIdArrayString, allTablesString, allTableFieldsString, userDetails.getUser());
    }

    // 专题导出 页面
    @GetMapping(value = "/topicExport")
    public String topicExport(Model model) {
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
        int hospitalId = 0;
        List<Integer> hospitalIdList = new ArrayList<>();
        // 用户/医院 权限
        if (user.getLevel() == 1) {
            model.addAttribute("areaHospitalList", manageService.getAreaHospital(0));
        } else if(user.getLevel() == 2) {
            hospitalId = user.getHospitalId();
        } else if(user.getLevel() == 3) {
            model.addAttribute("areaHospitalList", manageService.getAreaHospital(user.getUid()));
        }
        model.addAttribute("dataAmountList", caseService.getDataAmount(hospitalId, hospitalIdList));
        return "perinatalPlatform/case/topicExport";
    }

    // 导出 专题 CSV
    @PostMapping(value = "/topicExportCSV")
    @ResponseBody
    public String topicExportCSV(@RequestParam(value = "selectType") String selectType,
                                 @RequestParam(value = "startDate", required = false) String startDateString,
                                 @RequestParam(value = "endDate", required = false) String endDateString,
                                 @RequestParam(value = "patientClassification", required = false) String patientClassificationString,
                                 @RequestParam(value = "diagnosisTreatment", required = false) String diagnosisTreatmentString,
                                 @RequestParam(value = "outcomeIndicator", required = false) String outcomeIndicatorString,
                                 @RequestParam(value = "hospitalIdArray", required = false) String hospitalIdArrayString,
                                 @RequestParam(value = "allFields", required = false) String allFieldsString,
                                 @RequestParam(value = "table", required = false) String table,
                                 @RequestParam(value = "hasCid") String hasCidString) {
        MyUserDetails userDetails = (MyUserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        return caseService.topicExportCSV(selectType, startDateString, endDateString, patientClassificationString, diagnosisTreatmentString,
                outcomeIndicatorString, hospitalIdArrayString, allFieldsString, table, hasCidString, userDetails.getUser());
    }

    // 高胆病例 查询页面
    @GetMapping(value = "/highBilirubin/case")
    public String hbCaseInquiry(Model model, HttpSession session) {
        session.removeAttribute("childIdHB");
        session.removeAttribute("motherIdHB");
        session.removeAttribute("motherHospitalNum");
        session.removeAttribute("pcMotherNum");
        session.removeAttribute("childHospitalNum");
        session.removeAttribute("pcChildNum");

        MyUserDetails userDetails = (MyUserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        User user = userDetails.getUser();
        int hospitalId = 0;
        List<Integer> hospitalIdList = new ArrayList<>();
        // 用户 权限
        if (user.getLevel() == 2) {
            hospitalId = user.getHospitalId();
        } else if(user.getLevel() == 3) {
            hospitalIdList = caseService.getAreaHospitalId(user.getUid());
        }
        model.addAttribute("dataAmountList", caseService.getHbDataAmount(hospitalId, hospitalIdList));
        return "perinatalPlatform/case/hbCaseInquiry";
    }

    // 在session中 设置motherId childId
    @GetMapping(value = "/highBilirubin/setChildIdSession")
    @ResponseBody
    public String setHbChildId(HttpSession session,
                               @RequestParam("motherId") String motherIdHB,
                               @RequestParam("childId") String childIdHBString) {
        JSONObject json = new JSONObject();
        json.put("code", 0);
        session.setAttribute("motherIdHB", Integer.parseInt(motherIdHB));
        int childIdHB = Integer.parseInt(childIdHBString);
        if (childIdHB > 0) {
            session.setAttribute("childIdHB", childIdHB);
        }
        HBBaseInformation baseInformation = caseService.getHbBaseInformation(Integer.parseInt(motherIdHB), childIdHB);
        session.setAttribute("motherHospitalNum", baseInformation.getMotherHospitalNumber());
        session.setAttribute("pcMotherNum", baseInformation.getPcHbMotherNum());
        session.setAttribute("childHospitalNum", baseInformation.getChildHospitalNumber());
        session.setAttribute("pcChildNum", baseInformation.getPcHbChildNum());
        session.setAttribute("childFullName", baseInformation.getChildFullName());
        json.put("code", 1);
        return json.toJSONString();
    }

    // 高胆病例 查询
    @GetMapping(value = "/highBilirubin/getCase")
    @ResponseBody
    public String getHbCase(@RequestParam("page") String page, @RequestParam("limit") String limit,
                            @RequestParam(value = "startDate", required = false) String startDateString,
                            @RequestParam(value = "endDate", required = false) String endDateString,
                            @RequestParam(value = "caseStatus", required = false) String caseStatusString,
                            @RequestParam(value = "inHospital", required = false) String inHospitalString,
                            @RequestParam(value = "searchKey", required = false) String searchKey) {
        MyUserDetails userDetails = (MyUserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        User user = userDetails.getUser();
        Date startDate = null, endDate = null;
        int hospitalId = 0, caseStatus = -1, inHospital = -1;
        DateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        List<Integer> hospitalIdList = new ArrayList<>();

        // 用户/医院 权限
        if (user.getLevel() == 2) {
            hospitalId = user.getHospitalId();
        } else if(user.getLevel() == 3) {
            hospitalIdList = caseService.getAreaHospitalId(user.getUid());
        }
        // 日期范围
        if (startDateString != null && endDateString != null && !startDateString.equals("") && !endDateString.equals("")) {
            try {
                startDate = df.parse(startDateString);
                endDate = df.parse(endDateString);
            }catch (ParseException ignored) {}
        }
        // 病例状态
        if (caseStatusString != null && !caseStatusString.equals("")) {
            caseStatus = Integer.parseInt(caseStatusString);
        }
        // 是否在院
        if (inHospitalString != null && !inHospitalString.equals("")) {
            inHospital = Integer.parseInt(inHospitalString);
        }
        return caseService.getHbCase(Integer.parseInt(page), Integer.parseInt(limit), startDate, endDate, caseStatus, inHospital, user.getLevel(), hospitalId, hospitalIdList, searchKey);
    }

    // 删除 高胆病例
    @PostMapping(value = "/highBilirubin/deleteCase")
    @ResponseBody
    public String deleteHbCase(@RequestParam("deletePwd") String deletePwd,
                               @RequestParam("motherId") String motherIdBD,
                               @RequestParam("childId") String childIdNBD) {
        MyUserDetails userDetails = (MyUserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        User user = userDetails.getUser();
        return caseService.deleteHbCase(Integer.parseInt(motherIdBD), Integer.parseInt(childIdNBD), user.getHospitalId(), deletePwd);
    }
}
