package com.pnsrcp.web.service;

import com.pnsrcp.web.entity.perintalPlatform.BDBaseInformation;
import com.pnsrcp.web.entity.perintalPlatform.CaseStatus;
import com.pnsrcp.web.entity.perintalPlatform.Review;
import com.pnsrcp.web.entity.perintalPlatform.basicDatabaseCS.BDCSPdaTreatment;
import com.pnsrcp.web.entity.perintalPlatform.basicDatabaseCS.BDCSPdaUltrasound;
import com.pnsrcp.web.entity.perintalPlatform.basicDatabaseCS.BDCirculatorySystem;
import com.pnsrcp.web.entity.perintalPlatform.basicDatabaseRP.BDRPRopDiagnosis;
import com.pnsrcp.web.entity.perintalPlatform.basicDatabaseRP.BDRPScreeningAssessment;
import com.pnsrcp.web.entity.perintalPlatform.basicDatabaseRP.BDRPScreeningStatus;
import com.pnsrcp.web.entity.perintalPlatform.basicDatabaseRP.BDRPSsList;
import com.pnsrcp.web.entity.perintalPlatform.basicDatabse.*;

import javax.servlet.http.HttpSession;
import java.util.Date;
import java.util.List;

/**
 * @Project: 围产新生儿科研合作平台
 * @Author: Linyer
 * @Email: linyer@linyer.cn
 * @Date: 2021/6/28 17:23 星期一
 * @Description: 围产新生儿科研合作平台 基础数据库 服务层 接口
 */
public interface BasicDatabaseService {
    // 根据 母亲ID和患儿ID 获取 抬头 基本信息
    BDBaseInformation getBdBaseInformation(int motherId, int childId);

    // 保存 基础数据库 母亲信息 页面 数据
    String saveBDMI(HttpSession session, BDMotherInformation bdMotherInformation, int motherId, int userId, int hospitalId);

    // 保存 基础数据库 围产信息 页面 数据
    String saveBDGI(BDGestationInformation bdGestationInformation, int motherId, int childId);

    // 保存 基础数据库 围产信息 页面 数据
    String saveBDPI(BDPerinatalInformation bdPerinatalInformation, int motherId, int childId);

    // 保存 基础数据库 宝宝情况 页面 数据
    String saveBDBS(HttpSession session, BDBabySituation bdBabySituation, int childId, String pcMotherNum, int motherId, int hospitalId);

    // 保存 基础数据库 复苏情况 页面 数据
    String saveBDRS(BDRecoverySituation bdRecoverySituation, String deathCauseArray, String deformityArray, int motherId, int childId);

    // 获取 基础数据库 最大ID
    String getBdMaxNum(int hid, String hospitalizationYear);

    // 获取 母亲信息 重复检测 结果
    String motherInformationTest(String motherFullName, String motherPhone, String motherAge, String motherHospitalNumber);

    // 根据 母亲ID 获取 基础数据库 母亲信息
    BDMotherInformation getBdMotherInformation(int motherId);

    // 根据 母亲ID 获取 基础数据库 孕期信息
    BDGestationInformation getBdGestationInformation(int motherId);

    // 根据 母亲ID 获取 基础数据库 围产信息
    BDPerinatalInformation getBdPerinatalInformation(int motherId);

    // 根据 患儿ID 获取 基础数据库 孕期信息 母亲孕期体重增加
    double getBdWeightGainDuringPregnancy(int motherId);

    // 根据 母亲ID 获取 基础数据库 围产信息 分娩日期
    Date getDeliveryDate(int motherId);

    // 根据 患儿ID和母亲ID 获取 基础数据库 宝宝情况
    BDBabySituation getBdBabySituation(int childId, int motherId);

    // 根据 患儿ID和母亲ID 获取 基础数据库 死因
    List<BDRSDeathCause> getBdRSDeathCause(int childId, int motherId);

    // 根据 患儿ID和母亲ID 获取 基础数据库 畸形
    List<BDRSDeformity> getBdRSDeformity(int childId, int motherId);

    // 根据 死因分类ID 获取 死因诊断ID和名称
    String getBdDeathCauseDiagnosis(int deathCauseClassificationId);

    // 根据 畸形系统类型ID 获取 畸形类型ID和名称
    String getBdDeformityType(int deformitySystemId);

    // 根据 患儿ID和母亲ID 获取 基础数据库 复苏情况
    BDRecoverySituation getBdRecoverySituation(int childId, int motherId);

    // 保存 基础数据库 危重评分 页面 数据
    String saveBDCA(BDCriticalAssessment bdCriticalAssessment, int childIdBD, int motherIdBD);

    // 根据 患儿ID和母亲ID 获取 基础数据库 危重评分 初始信息
    BDCAMsg getBdCAMsg(int childId, int motherId);

    // 根据 患儿ID和母亲ID 获取 基础数据库 危重评分
    BDCriticalAssessment getBdCriticalAssessment(int childId, int motherId);

    // 保存 基础数据库 循环系统 页面 数据
    String saveBDCS(BDCirculatorySystem bdCirculatorySystem, String pdaUArray, String pdaArray, int childId, int motherId);

    // 根据 患儿ID和母亲ID 获取 循环系统
    BDCirculatorySystem getBdCirculatorySystem(int childId, int motherId);

    // 根据 患儿ID和母亲ID 获取 循环系统 所有PDA超声
    List<BDCSPdaUltrasound> getBdCsPdaUltrasoundList(int childId, int motherId);

    // 根据 患儿ID和母亲ID 获取 循环系统 所有PDA治疗
    List<BDCSPdaTreatment> getBdCsPdaTreatmentList(int childId, int motherId);

    // 根据 患儿ID和母亲ID 获取 出生相关 初始数据
    BDBirthMsg getBdBirthMsg(int childId, int motherId);

    // 保存 基础数据库 视网膜病 筛查情况 页面 数据
    String saveBDRPSS(BDRPScreeningStatus bdRpScreeningStatus, String ssArray, int childId, int motherId);

    // 根据 患儿ID和母亲ID 获取 视网膜病 筛查情况
    BDRPScreeningStatus getBdRpScreeningStatus(int childId, int motherId);

    // 根据 患儿ID和母亲ID 获取 视网膜病 筛查情况 所有筛查列表
    List<BDRPSsList> getBdRpSsList(int childId, int motherId);

    // 根据 患儿ID和母亲ID 获取 视网膜病 筛查评估 矫正胎龄45周日期
    Date get45WeekDate(int childId, int motherId);

    // 保存 基础数据库 视网膜病 筛查评估 页面 数据
    String saveBDRPSA(BDRPScreeningAssessment bdRpScreeningAssessment, int childId, int motherId);

    // 根据 患儿ID和母亲ID 获取 视网膜病 筛查评估
    BDRPScreeningAssessment getBdRpScreeningAssessment(int childId, int motherId);

    // 保存 基础数据库 视网膜病 ROP诊断 页面 数据
    String saveBDRPROP(BDRPRopDiagnosis bdRpRopDiagnosis, int childId, int motherId);

    // 根据 患儿ID和母亲ID 获取 ROP诊断 筛查评估
    BDRPRopDiagnosis getBdRpRopDiagnosis(int childId, int motherId);

    // 保存 基础数据库 出院情况 页面 数据
    String saveBDDS(BDDischargeSituation bdDischargeSituation, String deathCauseArray, int childId, int motherId);

    // 根据 患儿ID和母亲ID 获取 出院情况
    BDDischargeSituation getBdDischargeSituation(int childId, int motherId);

    // 根据 患儿ID和母亲ID 获取 宫外生长迟缓
    String getBdEctopicGrowthRetardation(int childId, int motherId);

    // 根据 患儿ID和母亲ID 获取 基础数据库 审核情况
    List<Review> getBdReview(int childId, int motherId);

    // 根据 患儿ID和母亲ID 获取 基础数据库 病例填写情况
    CaseStatus getBdCaseStatus(int childId, int motherId);

    // 根据 患儿ID和母亲ID 获取 基础数据库 审核次数
    int getBdReviewCount(int childId, int motherId);

    // 基础数据库 添加 审核信息
    String addBdReview(Review bdReview);
}