package com.pnsrcp.web.service.impl;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.pnsrcp.web.dao.HighBilirubinMapper;
import com.pnsrcp.web.dao.MainMapper;
import com.pnsrcp.web.dao.basicDatabase.BasicDatabaseMapper;
import com.pnsrcp.web.dao.manage.AreaMapper;
import com.pnsrcp.web.dao.manage.HospitalMapper;
import com.pnsrcp.web.entity.DataAmount;
import com.pnsrcp.web.entity.manage.User;
import com.pnsrcp.web.entity.patientCase.ReportExport;
import com.pnsrcp.web.entity.perintalPlatform.HBBaseInformation;
import com.pnsrcp.web.service.CaseService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import javax.servlet.http.HttpSession;
import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;

/**
 * @Project: 围产新生儿科研合作平台
 * @Author: Linyer
 * @Email: linyer@linyer.cn
 * @Date: 2021/12/9 20:47 星期四
 * @Description: 围产新生儿科研合作平台 病例查询 服务层 实现类
 */
@Service
public class CaseServiceImpl implements CaseService {
    // 数据层 注入
    @Resource
    private MainMapper mainMapper;
    @Resource
    private BasicDatabaseMapper basicDatabaseMapper;
    @Resource
    private HighBilirubinMapper highBilirubinMapper;
    @Resource
    private HospitalMapper hospitalMapper;
    @Resource
    private AreaMapper areaMapper;

    // 删除 数据 密码
    @Value("${com.perinatalcloud.delete_password}")
    private String deletePassword;

    @Override
    public List<Integer> getAreaHospitalId(int uid) {
        return hospitalMapper.thisAreaHospitalQuery(areaMapper.areaChargePersonId(uid));
    }

    @Override
    public List<DataAmount> getDataAmount(int hospitalId, List<Integer> hospitalList) {
        return mainMapper.dataAmountQry(hospitalId, hospitalList);
    }

    @Override
    public String setChildId(String motherIdString, String childIdString, int userLevel, int hospitalId,
                             List<Integer> hospitalIdList, HttpSession session) {
        JSONObject json = new JSONObject();
        json.put("code", 0);
        int motherId = Integer.parseInt(motherIdString);
        if (userLevel == 1 || (userLevel == 2 && mainMapper.motherIdCheck(motherId, hospitalId, null) > 0) ||
                (userLevel == 3) && mainMapper.motherIdCheck(motherId, -1, hospitalIdList) > 0) {
            session.setAttribute("motherIdBD", motherId);
            int childIdBD = Integer.parseInt(childIdString);
            if (childIdBD > 0) {
                session.setAttribute("childIdBD", childIdBD);
            }
            json.put("code", 1);
        }
        return json.toJSONString();
    }

    @Override
    public String getCase(String pageString, String limitString, String selectType, String startDateString,
                          String endDateString, String caseStatusString, String inHospitalString,
                          int userLevel, int hospitalId, List<Integer> hospitalIdList, String searchKey) {
        JSONObject json = new JSONObject();
        json.put("msg", "");
        json.put("code", 1);
        Date startDate = null, endDate = null;
        int page = -1, limit = -1, pageA = -1, caseStatus = -1, inHospital = -1;
        DateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        // 页面，限制
        if (pageString != null && !pageString.equals("")) {
            page = Integer.parseInt(pageString);
        }
        if (limitString != null && !limitString.equals("")) {
            limit = Integer.parseInt(limitString);
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
        if (page > -1 && limit > -1) {
            pageA = (page-1)*limit;
        }
        try {
            if (userLevel == 3) {
                json.put("count", basicDatabaseMapper.caseCount(selectType, startDate, endDate, caseStatus, inHospital, 0, hospitalIdList, searchKey));
                json.put("data", basicDatabaseMapper.caseQry(pageA, limit, selectType, startDate, endDate, caseStatus, inHospital, 0, hospitalIdList, searchKey));
            } else {
                json.put("count", basicDatabaseMapper.caseCount(selectType, startDate, endDate, caseStatus, inHospital, hospitalId, null, searchKey));
                json.put("data", basicDatabaseMapper.caseQry(pageA, limit, selectType, startDate, endDate, caseStatus, inHospital, hospitalId, null, searchKey));
            }
            json.put("code", 0);
        } catch (Exception e) {
            e.printStackTrace();
            json.put("code", 1);
        }
        return json.toJSONString();
    }

    @Override
    public String deleteCase(int motherId, int childId, int hospitalId, String deletePwd) {
        JSONObject json = new JSONObject();
        json.put("code", 0);
        if (deletePwd.equals(deletePassword)) {
            if (basicDatabaseMapper.caseChildNumQry(motherId) > 1) {
                if (basicDatabaseMapper.caseChildDelete(childId) > 0) {
                    hospitalMapper.hCaseNumUpdate(hospitalId);
                    json.put("code", 1);
                } else {
                    json.put("errorMsg", "删除病例失败！");
                }
            } else {
                if (basicDatabaseMapper.caseDelete(motherId) > 0) {
                    hospitalMapper.hCaseNumUpdate(hospitalId);
                    json.put("code", 1);
                } else {
                    json.put("errorMsg", "删除病例失败！");
                }
            }
        } else {
            json.put("errorMsg", "密码错误！");
        }
        return json.toJSONString();
    }

    @Override
    public String caseCompleted(int motherIdBD, int childIdBD) {
        JSONObject json = new JSONObject();
        json.put("code", 0);
        if (basicDatabaseMapper.bdStatusUpdate(childIdBD, motherIdBD, 1) > 0) {
            json.put("code", 1);
        }
        return json.toJSONString();
    }

    @Override
    public List<Integer> getAllHospitalId() {
        return hospitalMapper.hospitalIdQry();
    }

    @Override
    public String getReportExport(String pageString, String limitString, String startDateString, String endDateString,
                                  String selectType, List<Integer> hospitalIdList, String inHospitalString) {
        JSONObject json = new JSONObject();
        json.put("msg", "");
        Date startDate = null, endDate = null;
        int page = -1, limit = -1, pageA = -1, inHospital = -1;
        DateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        // 页面、限制
        if (pageString != null && !pageString.equals("")) {
            page = Integer.parseInt(pageString);
        }
        if (limitString != null && !limitString.equals("")) {
            limit = Integer.parseInt(limitString);
        }
        // 日期范围
        if (startDateString != null && endDateString != null && !startDateString.equals("") && !endDateString.equals("")) {
            try {
                startDate = df.parse(startDateString);
                endDate = df.parse(endDateString);
            } catch (ParseException ignored) {}
        }
        // 是否在院
        if (inHospitalString != null && !inHospitalString.equals("")) {
            inHospital = Integer.parseInt(inHospitalString);
        }
        if (page > -1 && limit > -1) {
            pageA = (page-1)*limit;
        }
        try {
            json.put("count", hospitalIdList.size());
            Collections.sort(hospitalIdList);
            List<ReportExport> reportExportList = new ArrayList<>();
            for (int i = 0; i < hospitalIdList.size(); i ++) {
                if (pageA > -1) {
                    if (i >= pageA && i < (pageA + limit)) {
                        reportExportList.add(hospitalMapper.reportExportQry(hospitalIdList.get(i), startDate, endDate, selectType, inHospital));
                    }
                } else {
                    reportExportList.add(hospitalMapper.reportExportQry(hospitalIdList.get(i), startDate, endDate, selectType, inHospital));
                }
            }
            json.put("data", reportExportList);
            json.put("code", 0);
        } catch (Exception e) {
            e.printStackTrace();
            json.put("code", 1);
        }
        return json.toJSONString();
    }

    @Override
    public String getTotalReportExport(Date startDate, Date endDate, String selectType, List<Integer> hospitalIdList, int inHospital) {
        JSONObject json = new JSONObject();
        json.put("code", 0);
        try {
            int caseNumber = 0, writing = 0, completed = 0, reviewPass = 0, reviewReject = 0;
            Map<String, Integer> reportExportMap = new HashMap<>();
            for (Integer hid : hospitalIdList) {
                ReportExport thisReportExport = hospitalMapper.reportExportQry(hid, startDate, endDate, selectType, inHospital);
                if (thisReportExport != null) {
                    if (thisReportExport.getCaseNumber() != null && !thisReportExport.getCaseNumber().equals("")) {
                        int thisCaseNumber = Integer.parseInt(thisReportExport.getCaseNumber());
                        if (thisCaseNumber > 0) {
                            caseNumber += thisCaseNumber;
                        }
                    }
                    if (thisReportExport.getWriting() != null && !thisReportExport.getWriting().equals("")) {
                        int thisWriting = Integer.parseInt(thisReportExport.getWriting());
                        if (thisWriting > 0) {
                            writing += thisWriting;
                        }
                    }
                    if (thisReportExport.getCompleted() != null && !thisReportExport.getCompleted().equals("")) {
                        int thisCaseCompleted = Integer.parseInt(thisReportExport.getCompleted());
                        if (thisCaseCompleted > 0) {
                            completed += thisCaseCompleted;
                        }
                    }
                    if (thisReportExport.getReviewPass() != null && !thisReportExport.getReviewPass().equals("")) {
                        int thisCaseReviewPass = Integer.parseInt(thisReportExport.getReviewPass());
                        if (thisCaseReviewPass > 0) {
                            reviewPass += thisCaseReviewPass;
                        }
                    }
                    if (thisReportExport.getReviewReject() != null && !thisReportExport.getReviewReject().equals("")) {
                        int thisCaseReviewReject = Integer.parseInt(thisReportExport.getReviewReject());
                        if (thisCaseReviewReject > 0) {
                            reviewReject += thisCaseReviewReject;
                        }
                    }
                }
            }
            reportExportMap.put("caseNumber", caseNumber);
            reportExportMap.put("writing", writing);
            reportExportMap.put("completed", completed);
            reportExportMap.put("reviewPass", reviewPass);
            reportExportMap.put("reviewReject", reviewReject);
            json.put("data", reportExportMap);
            json.put("code", 1);
        } catch (Exception ignored) {}
        return json.toJSONString();
    }

    @Override
    public String filterDataExport(String selectType, String startDateString, String endDateString, String patientClassificationString,
                                   String diagnosisTreatmentString, String outcomeIndicatorString, String hospitalIdArrayString, User user) {
        JSONObject json = new JSONObject();
        json.put("code", 0);
        DateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        Date startDate = null, endDate = null;
        int patientClassification = -1, diagnosisTreatment = -1, outcomeIndicator = -1;
        List<Integer> hospitalIdList = null;
        try {
            startDate = df.parse(startDateString);
            endDate = df.parse(endDateString);
        } catch (ParseException ignored) {}
        if (patientClassificationString != null && !patientClassificationString.equals("")) {
            patientClassification = Integer.parseInt(patientClassificationString);
        }
        if (diagnosisTreatmentString != null && !diagnosisTreatmentString.equals("")) {
            diagnosisTreatment = Integer.parseInt(diagnosisTreatmentString);
        }
        if (outcomeIndicatorString != null && !outcomeIndicatorString.equals("")) {
            outcomeIndicator = Integer.parseInt(outcomeIndicatorString);
        }
        try {
            // 用户/医院 权限
            if (user.getLevel() == 1 || user.getLevel() == 3) {
                if (hospitalIdArrayString != null) {
                    JSONArray hospitalIdArray = JSONArray.parseArray(hospitalIdArrayString);
                    hospitalIdList = hospitalIdArray.toJavaList(Integer.class);
                }
                if (user.getLevel() == 1) {
                    json.put("caseNum", mainMapper.casesFilterNumberQry(selectType, startDate, endDate, patientClassification, diagnosisTreatment, outcomeIndicator, hospitalIdList));
                } else {
                    List<Integer> areaHospitalIdList = hospitalMapper.thisAreaHospitalQuery(areaMapper.areaChargePersonId(user.getUid()));
                    if (hospitalIdList != null) {
                        for (Integer hid : hospitalIdList) {
                            if (!areaHospitalIdList.contains(hid)) {
                                areaHospitalIdList.remove(hid);
                            }
                        }
                        json.put("caseNum", mainMapper.casesFilterNumberQry(selectType, startDate, endDate, patientClassification, diagnosisTreatment, outcomeIndicator, hospitalIdList));
                    }
                }
                json.put("code", 1);
            } else if(user.getLevel() == 2) {
                hospitalIdList = new ArrayList<>();
                hospitalIdList.add(user.getHospitalId());
                json.put("caseNum", mainMapper.casesFilterNumberQry(selectType, startDate, endDate, patientClassification, diagnosisTreatment, outcomeIndicator, hospitalIdList));
                json.put("code", 1);
            } else {
                json.put("code", 0);
            }
        } catch (Exception ignored) {}
        return json.toJSONString();
    }

    @Override
    public String dataExportCSV(String selectType, String startDateString, String endDateString, String patientClassificationString,
                                String diagnosisTreatmentString, String outcomeIndicatorString, String hospitalIdArrayString,
                                String allTablesString, String allTableFieldsString, User user) {
        JSONObject json = new JSONObject();
        try {
            int patientClassification = -1, diagnosisTreatment = -1, outcomeIndicator = -1;
            List<Integer> hospitalIdList = new ArrayList<>();

            if (patientClassificationString != null && !patientClassificationString.equals("")) {
                patientClassification = Integer.parseInt(patientClassificationString);
            }
            if (patientClassificationString != null && !patientClassificationString.equals("")) {
                patientClassification = Integer.parseInt(patientClassificationString);
            }
            if (diagnosisTreatmentString != null && !diagnosisTreatmentString.equals("")) {
                diagnosisTreatment = Integer.parseInt(diagnosisTreatmentString);
            }
            if (outcomeIndicatorString != null && !outcomeIndicatorString.equals("")) {
                outcomeIndicator = Integer.parseInt(outcomeIndicatorString);
            }
            if (hospitalIdArrayString != null && !hospitalIdArrayString.equals("")) {
                JSONArray hospitalIdArray = JSONArray.parseArray(hospitalIdArrayString);
                hospitalIdList = hospitalIdArray.toJavaList(Integer.class);
            }

            if (allTableFieldsString != null && !allTableFieldsString.equals("")) {
                JSONArray allTableFieldsJson = JSONArray.parseArray(allTableFieldsString),
                        allTablesJson = JSONArray.parseArray(allTablesString);
                List<String> allTableFields = allTableFieldsJson.toJavaList(String.class);
                List<String> allTables = allTablesJson.toJavaList(String.class);
                allTables.remove("pc_bd_mother_information");
                allTables.remove("pc_bd_gestation_information");
                allTables.remove("pc_bd_perinatal_information");
                allTables.remove("pc_bd_baby_situation");
                allTables.remove("pc_bd_recovery_situation");
                allTables.remove("pc_bd_circulatory_system");
                allTables.remove("pc_bd_discharge_situation");
                // 用户/医院 权限
                if (user.getLevel() == 1 || user.getLevel() == 3) {
                    if (hospitalIdArrayString != null) {
                        JSONArray hospitalIdArray = JSONArray.parseArray(hospitalIdArrayString);
                        hospitalIdList = hospitalIdArray.toJavaList(Integer.class);
                    }
                    if (user.getLevel() == 1) {
                        json.put("dataExportList", mainMapper.dataExportQry(selectType, startDateString, endDateString, patientClassification, diagnosisTreatment, outcomeIndicator, hospitalIdList, allTables, allTableFields));
                    } else {
                        List<Integer> areaHospitalIdList = hospitalMapper.thisAreaHospitalQuery(areaMapper.areaChargePersonId(user.getUid()));
                        if (hospitalIdList != null && hospitalIdList.size() > 0) {
                            for (Integer hid : hospitalIdList) {
                                if (!areaHospitalIdList.contains(hid)) {
                                    areaHospitalIdList.remove(hid);
                                }
                            }
                            json.put("dataExportList", mainMapper.dataExportQry(selectType, startDateString, endDateString, patientClassification, diagnosisTreatment, outcomeIndicator, hospitalIdList, allTables, allTableFields));
                        }
                    }
                } else if (user.getLevel() == 2) {
                    hospitalIdList = new ArrayList<>();
                    hospitalIdList.add(user.getHospitalId());
                    json.put("dataExportList", mainMapper.dataExportQry(selectType, startDateString, endDateString, patientClassification, diagnosisTreatment, outcomeIndicator, hospitalIdList, allTables, allTableFields));
                }
            }
            json.put("code", 1);
        } catch (Exception e) {
            e.printStackTrace();
            json.put("code", 0);
        }
        return json.toJSONString();
    }

    @Override
    public String topicExportCSV(String selectType, String startDateString, String endDateString, String patientClassificationString,
                                 String diagnosisTreatmentString, String outcomeIndicatorString, String hospitalIdArrayString,
                                 String allFieldsString, String table, String hasCidString, User user) {
        JSONObject json = new JSONObject();
        try {
            int patientClassification = -1, diagnosisTreatment = -1, outcomeIndicator = -1, hasCid = 1;
            List<Integer> hospitalIdList = new ArrayList<>();

            if (patientClassificationString != null && !patientClassificationString.equals("")) {
                patientClassification = Integer.parseInt(patientClassificationString);
            }
            if (patientClassificationString != null && !patientClassificationString.equals("")) {
                patientClassification = Integer.parseInt(patientClassificationString);
            }
            if (diagnosisTreatmentString != null && !diagnosisTreatmentString.equals("")) {
                diagnosisTreatment = Integer.parseInt(diagnosisTreatmentString);
            }
            if (outcomeIndicatorString != null && !outcomeIndicatorString.equals("")) {
                outcomeIndicator = Integer.parseInt(outcomeIndicatorString);
            }
            if (hasCidString != null && !hasCidString.equals("")) {
                hasCid = Integer.parseInt(hasCidString);
            }
            if (hospitalIdArrayString != null && !hospitalIdArrayString.equals("")) {
                JSONArray hospitalIdArray = JSONArray.parseArray(hospitalIdArrayString);
                hospitalIdList = hospitalIdArray.toJavaList(Integer.class);
            }
            if (allFieldsString != null && !allFieldsString.equals("")) {
                JSONArray allFieldsJson = JSONArray.parseArray(allFieldsString);
                List<String> allFields = allFieldsJson.toJavaList(String.class);

                // 用户/医院 权限
                if (user.getLevel() == 1 || user.getLevel() == 3) {
                    if (hospitalIdArrayString != null) {
                        JSONArray hospitalIdArray = JSONArray.parseArray(hospitalIdArrayString);
                        hospitalIdList = hospitalIdArray.toJavaList(Integer.class);
                    }
                    if (user.getLevel() == 1) {
                        json.put("dataExportList", dataExportProcess(table, mainMapper.topicExportQry(selectType, startDateString, endDateString, patientClassification, diagnosisTreatment, outcomeIndicator, hospitalIdList, table, hasCid, allFields)));
                    } else {
                        List<Integer> areaHospitalIdList = hospitalMapper.thisAreaHospitalQuery(areaMapper.areaChargePersonId(user.getUid()));
                        if (hospitalIdList != null && hospitalIdList.size() > 0) {
                            for (Integer hid : hospitalIdList) {
                                if (!areaHospitalIdList.contains(hid)) {
                                    areaHospitalIdList.remove(hid);
                                }
                            }
                            json.put("dataExportList", dataExportProcess(table, mainMapper.topicExportQry(selectType, startDateString, endDateString, patientClassification, diagnosisTreatment, outcomeIndicator, hospitalIdList, table, hasCid, allFields)));
                        }
                    }
                } else if (user.getLevel() == 2) {
                    hospitalIdList = new ArrayList<>();
                    hospitalIdList.add(user.getHospitalId());
                    json.put("dataExportList", dataExportProcess(table, mainMapper.topicExportQry(selectType, startDateString, endDateString, patientClassification, diagnosisTreatment, outcomeIndicator, hospitalIdList, table, hasCid, allFields)));
                }
            }
            json.put("code", 1);
        } catch (Exception e) {
            e.printStackTrace();
            json.put("code", 0);
        }
        return json.toJSONString();
    }

    private List<Map<String, Object>> dataExportProcess(String table, List<Map<String, Object>> dataExportList) {
        if (table.equals("pc_bd_rs_deformity")) {
            for (Map<String, Object> dataExportMap : dataExportList) {
                Long deformitySystemId = (Long) dataExportMap.get("deformitySystem");
                if (deformitySystemId != null) {
                    String deformitySystem = mainMapper.deformitySystemQry(Math.toIntExact(deformitySystemId));
                    dataExportMap.put("deformitySystem", deformitySystem);
                    Long deformityTypeId = (Long) dataExportMap.get("deformityType");
                    String deformityType = mainMapper.deformityTypeQry(Math.toIntExact(deformityTypeId));
                    dataExportMap.put("deformityType", deformityType);
                }
            }
        } else if (table.equals("pc_bd_rs_death_cause")) {
            for (Map<String, Object> dataExportMap : dataExportList) {
                Long deathCauseClassificationId = (Long) dataExportMap.get("deathCauseClassification");
                if (deathCauseClassificationId != null) {
                    String deathCauseClassification = mainMapper.deathCauseClassificationQry(Math.toIntExact(deathCauseClassificationId));
                    dataExportMap.put("deathCauseClassification", deathCauseClassification);
                    Long deathCauseDiagnosisId = (Long) dataExportMap.get("deathCauseDiagnosis");
                    String deathCauseDiagnosis = mainMapper.deathCauseDiagnosisQry(Math.toIntExact(deathCauseDiagnosisId));
                    dataExportMap.put("deathCauseDiagnosis", deathCauseDiagnosis);
                }
            }
        }
        return dataExportList;
    }

    public HBBaseInformation getHbBaseInformation(int motherId, int childId) {
        return highBilirubinMapper.hbBaseInformationQry(motherId, childId);
    }

    @Override
    public String getHbCase(int page, int limit, Date startDate, Date endDate, int caseStatus, int inHospital,
                            int userLevel, int hospitalId, List<Integer> hospitalIdList, String searchKey) {
        JSONObject json = new JSONObject();
        json.put("msg", "");
        json.put("code", 1);
        if (page > -1) {
            int pageA = (page-1)*limit;
            try {
                if (userLevel == 3) {
                    json.put("count", highBilirubinMapper.caseCount(startDate, endDate, caseStatus, inHospital, 0, hospitalIdList, searchKey));
                    json.put("data", highBilirubinMapper.caseQry(pageA, limit, startDate, endDate, caseStatus, inHospital, 0, hospitalIdList, searchKey));
                } else {
                    json.put("count", highBilirubinMapper.caseCount(startDate, endDate, caseStatus, inHospital, hospitalId, null, searchKey));
                    json.put("data", highBilirubinMapper.caseQry(pageA, limit, startDate, endDate, caseStatus, inHospital, hospitalId, null, searchKey));
                }
                json.put("code", 0);
            } catch (Exception ignored) {}
        } else {
            json.put("code", 1);
        }
        return json.toJSONString();
    }

    @Override
    public List<DataAmount> getHbDataAmount(int hospitalId, List<Integer> hospitalList) {
        return highBilirubinMapper.dataAmountQry(hospitalId, hospitalList);
    }

    @Override
    public String deleteHbCase(int motherId, int childId, int hospitalId, String deletePwd) {
        JSONObject json = new JSONObject();
        json.put("code", 0);
        if (deletePwd.equals(deletePassword)) {
            if (highBilirubinMapper.hbCaseChildNumQry(motherId) > 1) {
                if (highBilirubinMapper.hbCaseChildDelete(childId) > 0) {
                    json.put("code", 1);
                } else {
                    json.put("errorMsg", "删除病例失败！");
                }
            } else {
                if (highBilirubinMapper.hbCaseDelete(motherId) > 0) {
                    json.put("code", 1);
                } else {
                    json.put("errorMsg", "删除病例失败！");
                }
            }
        } else {
            json.put("errorMsg", "密码错误！");
        }
        return json.toJSONString();
    }
}
