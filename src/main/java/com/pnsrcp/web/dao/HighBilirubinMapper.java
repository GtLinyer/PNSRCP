package com.pnsrcp.web.dao;

import com.pnsrcp.web.entity.DataAmount;
import com.pnsrcp.web.entity.patientCase.HBCaseMsg;
import com.pnsrcp.web.entity.perintalPlatform.CaseStatus;
import com.pnsrcp.web.entity.perintalPlatform.HBBaseInformation;
import com.pnsrcp.web.entity.perintalPlatform.Review;
import com.pnsrcp.web.entity.perintalPlatform.highBilirubin.*;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.Date;
import java.util.List;

/**
 * @Project: 围产新生儿科研合作平台
 * @Author: Linyer
 * @Email: linyer@linyer.cn
 * @Date: 2022/05/12 14:27 星期四
 * @Description: 高胆数据库 数据层
 */
@Mapper
public interface HighBilirubinMapper {
    /**
     * 查询 高胆数据库 病例基本信息 数据
     * @param page 页面
     * @param limit 限制
     * @param startDate 入院时间开始
     * @param endDate 入院时间结束
     * @param caseStatus 病例填写状态
     * @param inHospital 是否在院
     * @param hospitalId 医院ID
     * @param hospitalList 医院ID列表
     * @param searchKey 搜索关键字
     * @return 改变的行数
     */
    List<HBCaseMsg> caseQry(@Param("page") int page, @Param("limit") int limit, @Param("startDate") Date startDate,
                            @Param("endDate") Date endDate, @Param("caseStatus") int caseStatus,
                            @Param("inHospital") int inHospital, @Param("hospitalId") int hospitalId,
                            @Param("hospitalList") List<Integer> hospitalList, @Param("searchKey") String searchKey);

    /**
     * 查询 高胆数据库 病例基本信息 数量
     * @param startDate 入院时间开始
     * @param endDate 入院时间结束
     * @param caseStatus 病例填写状态
     * @param inHospital 是否在院
     * @param hospitalId 医院ID
     * @param hospitalList 医院ID列表
     * @param searchKey 搜索关键字
     * @return 高胆数据库 病例基本信息 数量
     */
    int caseCount(@Param("startDate") Date startDate, @Param("endDate") Date endDate, @Param("caseStatus") int caseStatus,
                  @Param("inHospital") int inHospital, @Param("hospitalId") int hospitalId,
                  @Param("hospitalList") List<Integer> hospitalList, @Param("searchKey") String searchKey);

    /**
     * 获取 数据量
     * @param hospitalId 医院ID
     * @param hospitalList 医院ID列表
     * @return 数据量
     */
    List<DataAmount> dataAmountQry(@Param("hospitalId") int hospitalId, @Param("hospitalList") List<Integer> hospitalList);

    /**
     * 查询 高胆数据库 抬头 基本信息
     * @param motherId 母亲ID
     * @param childId 患儿ID
     * @return 抬头 基本信息
     */
    HBBaseInformation hbBaseInformationQry(@Param("motherId") int motherId, @Param("childId") int childId);

    /**
     * 查询 高胆数据库 病例 高胆编号 本院最大数值
     * @param hid 医院ID
     * @return 最大ID
     */
    int maxNumQry(@Param("hid") int hid);

    /**
     * 查询 高胆数据库 母亲病例下的患儿病例 数量
     * @param motherId 母亲ID
     * @return 改变的行数
     */
    int hbCaseChildNumQry(@Param("motherId") int motherId);

    /**
     * 删除 高胆数据库 患儿病例 信息
     * @param childId 患儿ID
     * @return 改变的行数
     */
    int hbCaseChildDelete(@Param("childId") int childId);

    /**
     * 删除 高胆数据库 病例 信息
     * @param motherId 母亲ID
     * @return 改变的行数
     */
    int hbCaseDelete(@Param("motherId") int motherId);

    /**
     * 查询 高胆数据库 母亲信息 是否存在
     * @param motherFullName 母亲姓名
     * @param motherPhone 母亲手机号
     * @param motherHospitalNumber 母亲住院号
     * @return 改变的行数
     */
    int hbPiMiTestQry(@Param("motherFullName") String motherFullName, @Param("motherPhone") String motherPhone, @Param("motherHospitalNumber") String motherHospitalNumber);

    /**
     * 查询 高胆数据库 围产信息 数据
     * @param motherId 母亲ID
     * @return 围产信息 数据
     */
    HBPerinatalInformation hbPerinatalInformationQry(@Param("motherId") int motherId);

    /**
     * 插入 高胆数据库 围产信息 数据
     * @param hbPerinatalInformation 高胆数据库 围产信息
     * @param writerId 填写人ID
     * @param hospitalId 医院ID
     * @return 改变的行数
     */
    int hbPerinatalInformationInsert(@Param("hbPerinatalInformation") HBPerinatalInformation hbPerinatalInformation,
                                     @Param("writerId") int writerId, @Param("hospitalId") int hospitalId);

    /**
     * 更新 高胆数据库 围产信息 数据
     * @param hbPerinatalInformation 高胆数据库 围产信息
     * @return 改变的行数
     */
    int hbPerinatalInformationUpdate(@Param("hbPerinatalInformation") HBPerinatalInformation hbPerinatalInformation);

    /**
     * 插入/更新 高胆数据库 高胆治疗 基本信息 数据
     * @param hbHbtBasicInformation 高胆治疗 基本信息
     * @return 改变的行数
     */
    int hbHbtBasicInformationInsertUpdate(@Param("hbHbtBasicInformation") HBHbtBasicInformation hbHbtBasicInformation);

    /**
     * 查询 高胆数据库 高胆治疗 基本信息 数据
     * @param childId 患儿ID
     * @param motherId 母亲ID
     * @return 高胆治疗 基本信息 数据
     */
    HBHbtBasicInformation hbHbtBasicInformationQry(@Param("childId") int childId, @Param("motherId") int motherId);

    /**
     * 插入 高胆数据库 高胆治疗 基本信息 新的患儿
     * @param motherId 母亲ID
     * @param multicellularNumber 胎数
     * @param pcHbChildNum 高胆编号
     * @return 改变的行数
     */
    int hbHbtBiChildInsert(@Param("motherId") int motherId, @Param("multicellularNumber") int multicellularNumber, @Param("pcHbChildNum") String pcHbChildNum);

    /**
     * 更新 高胆数据库 高胆治疗 基本信息 新生儿胎数
     * @param fetusesNum 胎数
     * @param motherId 母亲ID
     * @return 改变的行数
     */
    int hbHbtBiFetusesNumUpdate(@Param("motherId") int motherId, @Param("fetusesNum") int fetusesNum);

    /**
     * 查询 高胆数据库 高胆治疗 基本信息 母亲孩子的ID
     * @param motherId 母亲ID
     * @return 改变的行数
     */
    List<Integer> motherChildIdQry(@Param("motherId") int motherId);

    /**
     * 更新 高胆数据库 高胆治疗 基本信息 母亲孩子的围产新生儿科研合作平台编号
     * @param motherId 母亲ID
     * @param childId 患儿ID
     * @param pcHbChildNum 围产新生儿科研合作平台新生儿编号
     * @return 改变的行数
     */
    int hbHbtBiPcHbChildNumUpdate(@Param("motherId") int motherId, @Param("childId") int childId, @Param("pcHbChildNum") String pcHbChildNum);

    /**
     * 插入/更新 高胆数据库 高胆治疗 高胆病因 数据
     * @param hbHbtHighBilirubinCauses 高胆治疗 高胆病因
     * @return 改变的行数
     */
    int hbHbtHighBilirubinCausesInsertUpdate(@Param("hbHbtBasicInformation") HBHbtHighBilirubinCauses hbHbtHighBilirubinCauses);

    /**
     * 查询 高胆数据库 高胆治疗 高胆病因
     * @param childId 患儿ID
     * @param motherId 母亲ID
     * @return 高胆治疗 高胆病因
     */
    HBHbtHighBilirubinCauses hbHbtHighBilirubinCausesQry(@Param("childId") int childId, @Param("motherId") int motherId);

    /**
     * 插入/更新 高胆数据库 高胆治疗 检查指标 数据
     * @param hbHbtCheckMetrics 高胆治疗 检查指标
     * @return 改变的行数
     */
    int hbHbtCheckMetricsInsertUpdate(@Param("hbHbtCheckMetrics") HBHbtCheckMetrics hbHbtCheckMetrics);

    /**
     * 插入 高胆数据库 高胆治疗 检查指标 光疗 数据
     * @param hbHbtCmPhototherapy 检查指标 光疗 数据
     * @return 改变的行数
     */
    int hbHbtCmPhototherapyInsert(@Param("hbHbtCmPhototherapy") HBHbtCmPhototherapy hbHbtCmPhototherapy);

    /**
     * 删除 高胆数据库 高胆治疗 检查指标 光疗 数据
     * @param childId 患儿ID
     * @param motherId 母亲ID
     * @return 改变的行数
     */
    int hbHbtCmPhototherapyDelete(@Param("childId") int childId, @Param("motherId") int motherId);

    /**
     * 插入 高胆数据库 高胆治疗 检查指标 换血 数据
     * @param hbHbtCmExchangeBlood 检查指标 换血 数据
     * @return 改变的行数
     */
    int hbHbtCmExchangeBloodInsert(@Param("hbHbtCmExchangeBlood") HBHbtCmExchangeBlood hbHbtCmExchangeBlood);

    /**
     * 删除 高胆数据库 高胆治疗 检查指标 换血 数据
     * @param childId 患儿ID
     * @param motherId 母亲ID
     * @return 改变的行数
     */
    int hbHbtCmExchangeBloodDelete(@Param("childId") int childId, @Param("motherId") int motherId);

    /**
     * 查询 高胆数据库 高胆治疗 检查指标
     * @param childId 患儿ID
     * @param motherId 母亲ID
     * @return 高胆治疗 检查指标
     */
    HBHbtCheckMetrics hbHbtCheckMetricsQry(@Param("childId") int childId, @Param("motherId") int motherId);

    /**
     * 查询 高胆数据库 高胆治疗 检查指标 光疗
     * @param childId 患儿ID
     * @param motherId 母亲ID
     * @return 高胆治疗 检查指标 光疗
     */
    List<HBHbtCmPhototherapy> hbHbtCmPhototherapyQry(@Param("childId") int childId, @Param("motherId") int motherId);

    /**
     * 查询 高胆数据库 高胆治疗 检查指标 换血
     * @param childId 患儿ID
     * @param motherId 母亲ID
     * @return 高胆治疗 检查指标 换血
     */
    List<HBHbtCmExchangeBlood> hbHbtCmExchangeBloodQry(@Param("childId") int childId, @Param("motherId") int motherId);

    /**
     * 插入/更新 高胆数据库 高胆治疗 治疗情况 数据
     * @param hbHbtTreatmentSituation 高胆治疗 治疗情况
     * @return 改变的行数
     */
    int hbHbtTreatmentSituationInsertUpdate(@Param("hbHbtTreatmentSituation") HBHbtTreatmentSituation hbHbtTreatmentSituation);

    /**
     * 查询 高胆数据库 高胆治疗 治疗情况
     * @param childId 患儿ID
     * @param motherId 母亲ID
     * @return 高胆治疗 治疗情况
     */
    HBHbtTreatmentSituation hbHbtTreatmentSituationQry(@Param("childId") int childId, @Param("motherId") int motherId);

    /**
     * 查询 高胆数据库 患儿 出生数据
     * @param childId 患儿ID
     * @param motherId 母亲ID
     * @return 患儿 出生数据
     */
    HBBirthMsg birthMsgQry(@Param("childId") int childId, @Param("motherId") int motherId);

    /**
     * 插入 高胆数据库 高胆治疗 脑病评分 数据
     * @param hbHbtEncephalopathyScore 高胆治疗 脑病评分
     * @return 改变的行数
     */
    int hbHbtEncephalopathyScoreInsert(@Param("hbHbtEncephalopathyScore") HBHbtEncephalopathyScore hbHbtEncephalopathyScore);

    /**
     * 删除 高胆数据库 高胆治疗 脑病评分 数据
     * @param childId 患儿ID
     * @param motherId 母亲ID
     * @return 改变的行数
     */
    int hbHbtEncephalopathyScoreDelete(@Param("childId") int childId, @Param("motherId") int motherId);

    /**
     * 查询 高胆数据库 高胆治疗 脑病评分
     * @param childId 患儿ID
     * @param motherId 母亲ID
     * @return 高胆治疗 脑病评分
     */
    List<HBHbtEncephalopathyScore> hbHbtEncephalopathyScoreQry(@Param("childId") int childId, @Param("motherId") int motherId);

    /**
     * 插入/更新 高胆数据库 高胆治疗 高胆原因 数据
     * @param hbHbtHighBilirubinReasons 高胆治疗 高胆原因
     * @return 改变的行数
     */
    int hbHbtHighBilirubinReasonsInsertUpdate(@Param("hbHbtHighBilirubinReasons") HBHbtHighBilirubinReasons hbHbtHighBilirubinReasons);

    /**
     * 查询 高胆数据库 高胆治疗 高胆原因
     * @param childId 患儿ID
     * @param motherId 母亲ID
     * @return 高胆治疗 高胆原因
     */
    HBHbtHighBilirubinReasons hbHbtHighBilirubinReasonsQry(@Param("childId") int childId, @Param("motherId") int motherId);

    /**
     * 插入/更新 高胆数据库 高胆治疗 辅助检查 数据
     * @param hbHbtAuxiliaryExamination 高胆治疗 辅助检查
     * @return 改变的行数
     */
    int hbHbtAuxiliaryExaminationInsertUpdate(@Param("hbHbtAuxiliaryExamination") HBHbtAuxiliaryExamination hbHbtAuxiliaryExamination);

    /**
     * 查询 高胆数据库 高胆治疗 辅助检查
     * @param childId 患儿ID
     * @param motherId 母亲ID
     * @return 高胆治疗 辅助检查
     */
    HBHbtAuxiliaryExamination hbHbtAuxiliaryExaminationQry(@Param("childId") int childId, @Param("motherId") int motherId);

    /**
     * 插入/更新 高胆数据库 高胆治疗 出院情况 数据
     * @param hbHbtDischargeSituation 高胆治疗 出院情况
     * @return 改变的行数
     */
    int hbHbtDischargeSituationInsertUpdate(@Param("hbHbtDischargeSituation") HBHbtDischargeSituation hbHbtDischargeSituation);

    /**
     * 查询 高胆数据库 高胆治疗 出院情况
     * @param childId 患儿ID
     * @param motherId 母亲ID
     * @return 高胆治疗 出院情况
     */
    HBHbtDischargeSituation hbHbtDischargeSituationQry(@Param("childId") int childId, @Param("motherId") int motherId);

    /**
     * 插入/更新 高胆数据库 随访检查 MRI检查 次数
     * @param childId 患儿ID
     * @param motherId 母亲ID
     * @param mriResultTimes 随访检查 MRI检查 次数
     * @return 改变的行数
     */
    int hbFueMrieMriResultTimesInsertUpdate(@Param("mriResultTimes") String mriResultTimes, @Param("childId") int childId, @Param("motherId") int motherId);

    /**
     * 插入 高胆数据库 随访检查 MRI检查
     * @param hbFueMriExamination 随访检查 MRI检查
     * @return 改变的行数
     */
    int hbFueMriExaminationInsert(@Param("hbFueMriExamination") HBFueMriExamination hbFueMriExamination);

    /**
     * 删除 高胆数据库 随访检查 MRI检查 列表
     * @param childId 患儿ID
     * @param motherId 母亲ID
     * @return 改变的行数
     */
    int hbFueMriExaminationDelete(@Param("childId") int childId, @Param("motherId") int motherId);

    /**
     * 查询 高胆数据库 随访检查 MRI检查 次数
     * @param childId 患儿ID
     * @param motherId 母亲ID
     * @return 随访检查 MRI检查 次数
     */
    String hbFueMrieMriResultTimesQry(@Param("childId") int childId, @Param("motherId") int motherId);

    /**
     * 查询 高胆数据库 随访检查 MRI检查 列表
     * @param childId 患儿ID
     * @param motherId 母亲ID
     * @return 随访检查 MRI检查 列表
     */
    List<HBFueMriExamination> hbFueMriExaminationQry(@Param("childId") int childId, @Param("motherId") int motherId);

    /**
     * 插入/更新 高胆数据库 随访检查 脑干听觉诱发电位 次数
     * @param childId 患儿ID
     * @param motherId 母亲ID
     * @param brainstemAuditoryEvokedPotentialTimes 随访检查 脑干听觉诱发电位 次数
     * @return 改变的行数
     */
    int hbFueBaepTimesInsertUpdate(@Param("brainstemAuditoryEvokedPotentialTimes") String brainstemAuditoryEvokedPotentialTimes, @Param("childId") int childId, @Param("motherId") int motherId);

    /**
     * 插入 高胆数据库 随访检查 脑干听觉诱发电位
     * @param hbFueBrainstemAuditoryEvokedPotential 随访检查 脑干听觉诱发电位
     * @return 改变的行数
     */
    int hbFueBaepInsert(@Param("hbFueBrainstemAuditoryEvokedPotential") HBFueBrainstemAuditoryEvokedPotential hbFueBrainstemAuditoryEvokedPotential);

    /**
     * 删除 高胆数据库 随访检查 脑干听觉诱发电位 列表
     * @param childId 患儿ID
     * @param motherId 母亲ID
     * @return 改变的行数
     */
    int hbFueBaepDelete(@Param("childId") int childId, @Param("motherId") int motherId);

    /**
     * 查询 高胆数据库 随访检查 脑干听觉诱发电位 次数
     * @param childId 患儿ID
     * @param motherId 母亲ID
     * @return 随访检查 脑干听觉诱发电位 次数
     */
    String hbFueBaepTimesQry(@Param("childId") int childId, @Param("motherId") int motherId);

    /**
     * 查询 高胆数据库 随访检查 脑干听觉诱发电位 列表
     * @param childId 患儿ID
     * @param motherId 母亲ID
     * @return 随访检查 脑干听觉诱发电位 列表
     */
    List<HBFueBrainstemAuditoryEvokedPotential> hbFueBaepQry(@Param("childId") int childId, @Param("motherId") int motherId);

    /**
     * 插入/更新 高胆数据库 随访检查 振幅整合脑电图 次数
     * @param childId 患儿ID
     * @param motherId 母亲ID
     * @param amplitudeIntegratedEegTimes 随访检查 振幅整合脑电图 次数
     * @return 改变的行数
     */
    int hbFueAmplitudeIntegratedEegTimesInsertUpdate(@Param("amplitudeIntegratedEegTimes") String amplitudeIntegratedEegTimes, @Param("childId") int childId, @Param("motherId") int motherId);

    /**
     * 插入 高胆数据库 随访检查 振幅整合脑电图
     * @param hbFueAmplitudeIntegratedEeg 随访检查 振幅整合脑电图
     * @return 改变的行数
     */
    int hbFueAmplitudeIntegratedEegInsert(@Param("hbFueAmplitudeIntegratedEeg") HBFueAmplitudeIntegratedEeg hbFueAmplitudeIntegratedEeg);

    /**
     * 删除 高胆数据库 随访检查 振幅整合脑电图 列表
     * @param childId 患儿ID
     * @param motherId 母亲ID
     * @return 改变的行数
     */
    int hbFueAmplitudeIntegratedEegDelete(@Param("childId") int childId, @Param("motherId") int motherId);

    /**
     * 查询 高胆数据库 随访检查 振幅整合脑电图 次数
     * @param childId 患儿ID
     * @param motherId 母亲ID
     * @return 随访检查 振幅整合脑电图 次数
     */
    String hbFueAmplitudeIntegratedEegTimesQry(@Param("childId") int childId, @Param("motherId") int motherId);

    /**
     * 查询 高胆数据库 随访检查 振幅整合脑电图 列表
     * @param childId 患儿ID
     * @param motherId 母亲ID
     * @return 随访检查 振幅整合脑电图 列表
     */
    List<HBFueAmplitudeIntegratedEeg> hbFueAmplitudeIntegratedEegQry(@Param("childId") int childId, @Param("motherId") int motherId);

    /**
     * 插入/更新 高胆数据库 随访检查 婴儿全身运动评估 次数
     * @param childId 患儿ID
     * @param motherId 母亲ID
     * @param gmsTimes 随访检查 婴儿全身运动评估 次数
     * @return 改变的行数
     */
    int hbFueGmsTimesInsertUpdate(@Param("gmsTimes") String gmsTimes, @Param("childId") int childId, @Param("motherId") int motherId);

    /**
     * 插入 高胆数据库 随访检查 婴儿全身运动评估
     * @param hbFueGms 随访检查 婴儿全身运动评估
     * @return 改变的行数
     */
    int hbFueGmsInsert(@Param("hbFueGms") HBFueGms hbFueGms);

    /**
     * 删除 高胆数据库 随访检查 婴儿全身运动评估 列表
     * @param childId 患儿ID
     * @param motherId 母亲ID
     * @return 改变的行数
     */
    int hbFueGmsDelete(@Param("childId") int childId, @Param("motherId") int motherId);

    /**
     * 查询 高胆数据库 随访检查 婴儿全身运动评估 次数
     * @param childId 患儿ID
     * @param motherId 母亲ID
     * @return 随访检查 婴儿全身运动评估 次数
     */
    String hbFueGmsTimesQry(@Param("childId") int childId, @Param("motherId") int motherId);

    /**
     * 查询 高胆数据库 随访检查 婴儿全身运动评估 列表
     * @param childId 患儿ID
     * @param motherId 母亲ID
     * @return 随访检查 婴儿全身运动评估 列表
     */
    List<HBFueGms> hbFueGmsQry(@Param("childId") int childId, @Param("motherId") int motherId);

    /**
     * 插入/更新 高胆数据库 随访检查 Griffiths量表 次数
     * @param childId 患儿ID
     * @param motherId 母亲ID
     * @param griffithsScaleTimes 随访检查 Griffiths量表 次数
     * @return 改变的行数
     */
    int hbFueGriffithsScaleTimesInsertUpdate(@Param("griffithsScaleTimes") String griffithsScaleTimes, @Param("childId") int childId, @Param("motherId") int motherId);

    /**
     * 插入 高胆数据库 随访检查 Griffiths量表
     * @param hbFueGriffithsScale 随访检查 Griffiths量表
     * @return 改变的行数
     */
    int hbFueGriffithsScaleInsert(@Param("hbFueGriffithsScale") HBFueGriffithsScale hbFueGriffithsScale);

    /**
     * 删除 高胆数据库 随访检查 Griffiths量表 列表
     * @param childId 患儿ID
     * @param motherId 母亲ID
     * @return 改变的行数
     */
    int hbFueGriffithsScaleDelete(@Param("childId") int childId, @Param("motherId") int motherId);

    /**
     * 查询 高胆数据库 随访检查 Griffiths量表 次数
     * @param childId 患儿ID
     * @param motherId 母亲ID
     * @return 随访检查 Griffiths量表 次数
     */
    String hbFueGriffithsScaleTimesQry(@Param("childId") int childId, @Param("motherId") int motherId);

    /**
     * 查询 高胆数据库 随访检查 Griffiths量表 列表
     * @param childId 患儿ID
     * @param motherId 母亲ID
     * @return 随访检查 Griffiths量表 列表
     */
    List<HBFueGriffithsScale> hbFueGriffithsScaleQry(@Param("childId") int childId, @Param("motherId") int motherId);

    /**
     * 插入/更新 高胆数据库 随访结论
     * @param hbFollowUpConclusion 随访结论
     * @return 改变的行数
     */
    int hbFollowUpConclusionInsertUpdate(@Param("hbFollowUpConclusion") HBFollowUpConclusion hbFollowUpConclusion);

    /**
     * 查询 高胆数据库 随访结论
     * @param childId 患儿ID
     * @param motherId 母亲ID
     * @return 随访结论
     */
    HBFollowUpConclusion hbFollowUpConclusionQry(@Param("childId") int childId, @Param("motherId") int motherId);

    /**
     * 查询 高胆数据库 填写情况
     * @param childId 患儿ID
     * @param motherId 母亲ID
     * @return 填写情况
     */
    CaseStatus hbCaseStatusQry(@Param("childId") int childId, @Param("motherId") int motherId);

    /**
     * 查询 高胆数据库 审核次数
     * @param childId 患儿ID
     * @param motherId 母亲ID
     * @return 审核次数
     */
    int hbReviewCount(@Param("childId") int childId, @Param("motherId") int motherId);

    /**
     * 查询 高胆数据库 审核情况
     * @param childId 患儿ID
     * @param motherId 母亲ID
     * @return 审核情况
     */
    List<Review> hbReviewQry(@Param("childId") int childId, @Param("motherId") int motherId);

    /**
     * 插入 高胆数据库 审核信息
     * @param hbReview 审核信息
     * @return 改变的行数
     */
    int hbReviewInsert(@Param("hbReview") Review hbReview);

    /**
     * 更新 高胆数据库 填写状态
     * @param childId 患儿ID
     * @param motherId 母亲ID
     * @param status 填写状态
     * @return 改变的行数
     */
    int hbStatusUpdate(@Param("childId") int childId, @Param("motherId") int motherId, @Param("status") int status);
}
