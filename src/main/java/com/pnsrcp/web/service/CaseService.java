package com.pnsrcp.web.service;

import com.pnsrcp.web.entity.DataAmount;
import com.pnsrcp.web.entity.manage.User;
import com.pnsrcp.web.entity.perintalPlatform.HBBaseInformation;

import javax.servlet.http.HttpSession;
import java.util.Date;
import java.util.List;

/**
 * @Project: 围产新生儿科研合作平台
 * @Author: Linyer
 * @Email: linyer@linyer.cn
 * @Date: 2021/12/9 20:45 星期四
 * @Description: 围产新生儿科研合作平台 病例查询 服务层 接口
 */
public interface CaseService {
    // 根据 区域负责人ID 获取区域下 所有医院ID
    List<Integer> getAreaHospitalId(int uid);

    // 获取 病历量
    List<DataAmount> getDataAmount(int hospitalId, List<Integer> hospitalList);

    // 设置 患儿 ID
    String setChildId(String motherId, String childId, int userLevel, int hospitalId, List<Integer> hospitalIdList, HttpSession session);

    // 获取 病例信息
    String getCase(String pageString, String limitString, String selectType, String startDateString, String endDateString,
                   String caseStatusString, String inHospitalString, int userLevel, int hospitalId,
                   List<Integer> hospitalIdList, String searchKey);

    // 删除 病例信息
    String deleteCase(int motherId, int childId, int hospitalId, String deletePwd);

    // 病例 填写完成
    String caseCompleted(int motherIdBD, int childIdBD);

    // 根据 区域负责人ID 获取区域下 所有医院ID
    List<Integer> getAllHospitalId();

    // 获取 报表导出信息
    String getReportExport(String pageString, String limitString, String startDateString, String endDateString,
                           String selectType, List<Integer> hospitalIdList, String inHospitalString);

    // 获取 报表导出 总数据
    String getTotalReportExport(Date startDate, Date endDate, String selectType, List<Integer> hospitalIdList, int inHospital);

    // 数据导出 筛选
    String filterDataExport(String selectType, String startDateString, String endDateString, String patientClassificationString,
                            String diagnosisTreatmentString, String outcomeIndicatorString, String hospitalIdArrayString, User user);

    // 数据导出 CSV
    String dataExportCSV(String selectType, String startDateString, String endDateString, String patientClassificationString, String diagnosisTreatmentString,
                         String outcomeIndicatorString, String hospitalIdArrayString, String allTablesString, String allTableFieldsString, User user);

    // 专题导出 CSV
    String topicExportCSV(String selectType, String startDateString, String endDateString, String patientClassificationString, String diagnosisTreatmentString,
                          String outcomeIndicatorString, String hospitalIdArrayString, String allFieldsString, String table, String hasCidString, User user);

    // 根据 母亲ID和患儿ID 获取 抬头 高胆基本信息
    HBBaseInformation getHbBaseInformation(int motherIdHB, int childIdHB);

    // 获取 高胆 病例信息
    String getHbCase(int page, int limit, Date startDate, Date endDate, int caseStatus, int inHospital, int userLevel,
                     int hospitalId, List<Integer> hospitalIdList, String searchKey);

    // 获取 病历量
    List<DataAmount> getHbDataAmount(int hospitalId, List<Integer> hospitalList);

    // 删除 高胆病例信息
    String deleteHbCase(int motherId, int childId, int hospitalId, String deletePwd);
}
