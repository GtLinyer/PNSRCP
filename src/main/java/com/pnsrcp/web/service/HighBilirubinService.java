package com.pnsrcp.web.service;

import com.pnsrcp.web.entity.perintalPlatform.CaseStatus;
import com.pnsrcp.web.entity.perintalPlatform.Review;
import com.pnsrcp.web.entity.perintalPlatform.highBilirubin.*;

import javax.servlet.http.HttpSession;
import java.util.List;

/**
 * @Project: 围产新生儿科研合作平台
 * @Author: Linyer
 * @Email: linyer@linyer.cn
 * @Date: 2022/05/12 14:28 星期四
 * @Description: 围产新生儿科研合作平台 高胆数据库 服务层 接口
 */
public interface HighBilirubinService {
    // 根据 用户ID 获取 区域编号
    String getAreaNum(int userId);

    // 获取 高胆数据库 最大ID
    int getHbMaxNum(int hid);

    // 根据 母亲ID 获取 高胆数据库 围产信息
    HBPerinatalInformation getHbPerinatalInformation(int motherIdHB);

    // 获取 母亲信息 重复检测 结果
    String motherInformationTest(String motherFullName, String motherPhone, String motherHospitalNumber);

    // 保存 高胆数据库 围产信息 页面 数据
    String saveHBPI(HttpSession session, HBPerinatalInformation hbPerinatalInformation, int motherIdHB, int userId, int hospitalId);

    // 根据 患儿ID和母亲ID 获取 高胆数据库 高胆治疗 基本信息
    HBHbtBasicInformation getHbHbtBasicInformation(int childIdHB, int motherIdHB);

    // 保存 高胆数据库 高胆治疗 基本信息 页面 数据
    String saveHBTBI(HttpSession session, HBHbtBasicInformation hbHbtBasicInformation, int childIdHB, String pcHbMotherNum, int motherIdHB, int hospitalId);

    // 根据 患儿ID和母亲ID 获取 高胆数据库 高胆治疗 高胆病因
    HBHbtHighBilirubinCauses getHbHbtHighBilirubinCauses(int childIdHB, int motherIdHB);

    // 保存 高胆数据库 高胆治疗 高胆病因 页面 数据
    String saveHBTHBC(HBHbtHighBilirubinCauses hbHbtHighBilirubinCauses, int childIdHB, int motherIdHB);

    // 根据 患儿ID和母亲ID 获取 高胆数据库 高胆治疗 检查指标
    HBHbtCheckMetrics getHbHbtCheckMetrics(int childIdHB, int motherIdHB);

    // 根据 患儿ID和母亲ID 获取 高胆数据库 高胆治疗 检查指标 光疗
    List<HBHbtCmPhototherapy> getHbHbtCmPhototherapy(int childIdHB, int motherIdHB);

    // 根据 患儿ID和母亲ID 获取 高胆数据库 高胆治疗 检查指标 换血
    List<HBHbtCmExchangeBlood> getHbHbtCmExchangeBlood(int childIdHB, int motherIdHB);

    // 保存 高胆数据库 高胆治疗 检查指标 页面 数据
    String saveHBTCM(HBHbtCheckMetrics hbHbtCheckMetrics, String pArray, String ebArray, int childIdHB, int motherIdHB);

    // 根据 患儿ID和母亲ID 获取 高胆数据库 高胆治疗 治疗情况
    HBHbtTreatmentSituation getHbHbtTreatmentSituation(int childIdHB, int motherIdHB);

    // 保存 高胆数据库 高胆治疗 治疗情况 页面 数据
    String saveHBTTS(HBHbtTreatmentSituation hbHbtTreatmentSituation, int childIdHB, int motherIdHB);

    // 获取 患儿 入院日期
    HBBirthMsg getHbBirthMsg(int childIdHB, int motherIdHB);

    // 根据 患儿ID和母亲ID 获取 高胆数据库 高胆治疗 脑病评分
    String getHbHbtEncephalopathyScore(int childIdHB, int motherIdHB);

    // 保存 高胆数据库 高胆治疗 脑病评分 页面 数据
    String saveHBTES(String esDataArray, int childIdHB, int motherIdHB);

    // 根据 患儿ID和母亲ID 获取 高胆数据库 高胆治疗 高胆原因
    HBHbtHighBilirubinReasons getHbHbtHighBilirubinReasons(int childIdHB, int motherIdHB);

    // 保存 高胆数据库 高胆治疗 高胆原因 页面 数据
    String saveHBTHBR(HBHbtHighBilirubinReasons hbHbtHighBilirubinReasons, int childIdHB, int motherIdHB);

    // 根据 患儿ID和母亲ID 获取 高胆数据库 辅助检查 高胆原因
    HBHbtAuxiliaryExamination getHbHbtAuxiliaryExamination(int childIdHB, int motherIdHB);

    // 保存 高胆数据库 高胆治疗 辅助检查 页面 数据
    String saveHBTAE(HBHbtAuxiliaryExamination hbHbtAuxiliaryExamination, int childIdHB, int motherIdHB);

    // 根据 患儿ID和母亲ID 获取 高胆数据库 高胆治疗 出院情况
    HBHbtDischargeSituation getHbHbtDischargeSituation(int childIdHB, int motherIdHB);

    // 保存 高胆数据库 高胆治疗 出院情况 页面 数据
    String saveHBTDS(HBHbtDischargeSituation hbHbtDischargeSituation, int childIdHB, int motherIdHB);

    // 根据 患儿ID和母亲ID 获取 高胆数据库 随访检查 MRI检查 次数
    String getHbFueMrieMriResultTimes(int childIdHB, int motherIdHB);

    // 根据 患儿ID和母亲ID 获取 高胆数据库 随访检查 MRI检查
    List<HBFueMriExamination> getHbFueMriExamination(int childIdHB, int motherIdHB);

    // 保存 高胆数据库 随访检查 MRI检查 页面 数据
    String saveHBFUEMRIE(String mriResultTimes, String mriArray, int childIdHB, int motherIdHB);

    // 根据 患儿ID和母亲ID 获取 高胆数据库 随访检查 脑干听觉诱发电位 次数
    String getHbFueBaepTimes(int childIdHB, int motherIdHB);

    // 根据 患儿ID和母亲ID 获取 高胆数据库 随访检查 脑干听觉诱发电位
    List<HBFueBrainstemAuditoryEvokedPotential> getHbFueBaep(int childIdHB, int motherIdHB);

    // 保存 高胆数据库 随访检查 脑干听觉诱发电位 页面 数据
    String saveHBFUEBAEP(String brainstemAuditoryEvokedPotentialTimes, String baepArray, int childIdHB, int motherIdHB);

    // 根据 患儿ID和母亲ID 获取 高胆数据库 随访检查 振幅整合脑电图 次数
    String getHbFueAmplitudeIntegratedEegTimes(int childIdHB, int motherIdHB);

    // 根据 患儿ID和母亲ID 获取 高胆数据库 随访检查 振幅整合脑电图
    List<HBFueAmplitudeIntegratedEeg> getHbFueAmplitudeIntegratedEeg(int childIdHB, int motherIdHB);

    // 保存 高胆数据库 随访检查 振幅整合脑电图 页面 数据
    String saveHBFUEAIEEG(String amplitudeIntegratedEegTimes, String aiEegArray, int childIdHB, int motherIdHB);

    // 根据 患儿ID和母亲ID 获取 高胆数据库 随访检查 婴儿全身运动评估 次数
    String getHbFueGmsTimes(int childIdHB, int motherIdHB);

    // 根据 患儿ID和母亲ID 获取 高胆数据库 随访检查 婴儿全身运动评估
    List<HBFueGms> getHbFueGms(int childIdHB, int motherIdHB);

    // 保存 高胆数据库 随访检查 婴儿全身运动评估 页面 数据
    String saveHBFUEGMS(String gmsTimes, String gmsArray, int childIdHB, int motherIdHB);

    // 根据 患儿ID和母亲ID 获取 高胆数据库 随访检查 Griffiths量表 次数
    String getHbFueGsTimes(int childIdHB, int motherIdHB);

    // 根据 患儿ID和母亲ID 获取 高胆数据库 随访检查 Griffiths量表
    List<HBFueGriffithsScale> getHbFueGs(int childIdHB, int motherIdHB);

    // 保存 高胆数据库 随访检查 Griffiths量表 页面 数据
    String saveHBFUEGS(String griffithsScaleTimes, String gsArray, int childIdHB, int motherIdHB);

    // 根据 患儿ID和母亲ID 获取 高胆数据库 随访结论
    HBFollowUpConclusion getHbFollowUpConclusion(int childIdHB, int motherIdHB);

    // 保存 高胆数据库 随访结论 页面 数据
    String saveHBFUC(HBFollowUpConclusion hbFollowUpConclusion, int childIdHB, int motherIdHB);

    // 根据 患儿ID和母亲ID 获取 高胆数据库 病例填写情况
    CaseStatus getHbCaseStatus(int childIdHB, int motherIdHB);

    // 根据 患儿ID和母亲ID 获取 高胆数据库 审核次数
    int getHbReviewCount(int childIdHB, int motherIdHB);

    // 根据 患儿ID和母亲ID 获取 高胆数据库 审核情况
    List<Review> getHbReview(int childIdHB, int motherIdHB);

    // 高胆数据库 添加 审核信息
    String addHbReview(Review hbReview, int childIdHB, int motherIdHB);
}