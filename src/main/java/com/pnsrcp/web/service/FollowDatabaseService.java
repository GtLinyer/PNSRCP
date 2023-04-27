package com.pnsrcp.web.service;

import com.pnsrcp.web.entity.perintalPlatform.CaseStatus;
import com.pnsrcp.web.entity.perintalPlatform.Review;
import com.pnsrcp.web.entity.perintalPlatform.basicDatabse.BDBirthMsg;
import com.pnsrcp.web.entity.perintalPlatform.followDatabase.*;

import java.util.List;

/**
 * @Project: 围产新生儿科研合作平台
 * @Author: Linyer
 * @Email: linyer@linyer.cn
 * @Date: 2022/06/02 18:01 星期四
 * @Description: 围产新生儿科研合作平台 随访数据库 服务层 接口
 */
public interface FollowDatabaseService {
    // 根据 患儿ID和母亲ID 获取 随访数据库 随访信息
    FDFollowInformation getFdFiMsg(int childId, int motherId);

    // 根据 患儿ID和母亲ID 获取 随访数据库 随访信息 宝宝身份证姓名
    String getFdChildIdCardName(int childId, int motherId);

    // 保存 随访数据库 随访信息 页面 数据
    String saveFDFI(FDFollowInformation fdFollowInformation, int childId, int motherId, int writerId, int hospitalId);

    // 根据 患儿ID和母亲ID 获取 随访数据库 生长曲线 出生相关 初始数据
    BDBirthMsg getFdGcBirthMsg(int childId, int motherId);

    // 根据 患儿ID和母亲ID 获取 随访数据库 生长曲线 体重检查 汇总
    FDGcBwSummary getFdGcBwSummary(int childId, int motherId);

    // 根据 患儿ID和母亲ID 获取 随访数据库 生长曲线 体重检查
    List<FDGcBodyWeight> getFdGcBodyWeightCheck(int childId, int motherId);

    // 根据 患儿ID和母亲ID 获取 随访数据库 生长曲线 体重 Fenton曲线 数据
    String getFdGcBwFentonData(int childId, int motherId);

    // 保存 随访数据库 生长曲线 体重 页面 数据
    String saveFDGCBW(FDGcBwSummary bodyWeight, String wcArray, int childId, int motherId);

    // 根据 患儿ID和母亲ID 获取 随访数据库 生长曲线 身长检查 汇总
    FDGcBlSummary getFdGcBlSummary(int childId, int motherId);

    // 根据 患儿ID和母亲ID 获取 随访数据库 生长曲线 身长检查
    List<FDGcBodyLength> getFdGcBodyLength(int childId, int motherId);

    // 保存 随访数据库 生长曲线 身长 页面 数据
    String saveFDGCBL(FDGcBlSummary blSummary, String lcArray, int childId, int motherId);

    // 根据 患儿ID和母亲ID 获取 随访数据库 生长曲线 头围检查 汇总
    FDGcHcSummary getFdGcHcSummary(int childId, int motherId);

    // 根据 患儿ID和母亲ID 获取 随访数据库 生长曲线 头围检查
    List<FDGcHeadCircumference> getFdGcHeadCircumference(int childId, int motherId);

    // 保存 随访数据库 生长曲线 头围 页面 数据
    String saveFDGCHC(FDGcHcSummary hcSummary, String hcArray, int childId, int motherId);

    // 根据 患儿ID和母亲ID 获取 随访数据库 生长曲线 喂养 记录
    String getFdGcFeedingRecordNumber(int childId, int motherId);

    // 根据 患儿ID和母亲ID 获取 随访数据库 生长曲线 喂养
    List<FDGcFeedingRecord> getFdGcFeedingRecord(int childId, int motherId);

    // 保存 随访数据库 生长曲线 喂养 页面 数据
    String saveFDGCFD(String feedingRecordNumber, String frArray, int childId, int motherId);

    // 根据 患儿ID和母亲ID 获取 随访数据库 生长曲线 体重数据
    String getFdGcGetBodyWeight(int childId, int motherId);

    // 根据 患儿ID和母亲ID 获取 随访数据库 生长曲线 身长数据
    String getFdGcGetBodyLength(int childId, int motherId);

    // 根据 患儿ID和母亲ID 获取 随访数据库 生长曲线 头围数据
    String getFdGcGetHeadCircumference(int childId, int motherId);

    // 根据 患儿ID和母亲ID 获取 随访数据库 生长曲线 喂养数据
    String getFdGcGetFeeding(int childId, int motherId);

    // 保存 随访数据库 生长曲线 生长评估 0到12月 页面 数据
    String saveFDGCGA1(String gaArray, int childId, int motherId);

    // 保存 随访数据库 生长曲线 生长评估 13月到6岁 页面 数据
    String saveFDGCGA2(String gaArray, int childId, int motherId);

    // 根据 患儿ID和母亲ID 获取 随访数据库 生长曲线 营养 记录
    String getFdGcNutritionRecordNumber(int childId, int motherId);

    // 根据 患儿ID和母亲ID 获取 随访数据库 生长曲线 营养
    List<FDGcNutritionRecord> getFdGcNutritionRecord(int childId, int motherId);

    // 保存 随访数据库 生长曲线 营养 页面 数据
    String saveFDGCNT(String nutritionRecordNumber, String nrArray, int childId, int motherId);

    // 根据 患儿ID和母亲ID 获取 随访数据库 发育水平 视力 记录
    String getFdDlVisionCheckNumber(int childId, int motherId);

    // 根据 患儿ID和母亲ID 获取 随访数据库 发育水平 视力
    List<FDDlVisionCheck> getFdDlVisionCheck(int childId, int motherId);

    // 保存 随访数据库 发育水平 视力 页面 数据
    String saveFDDLVI(String visionCheckNumber, String vcArray, int childId, int motherId);

    // 根据 患儿ID和母亲ID 获取 随访数据库 发育水平 听力 记录
    String getFdDlHearingCheckNumber(int childId, int motherId);

    // 根据 患儿ID和母亲ID 获取 随访数据库 发育水平 听力
    List<FDDlHearingCheck> getFdDlHearingCheck(int childId, int motherId);

    // 保存 随访数据库 发育水平 听力 页面 数据
    String saveFDDLHR(String hearingCheckNumber, String hcArray, int childId, int motherId);

    // 根据 患儿ID和母亲ID 获取 随访数据库 发育水平 Gesell量表 记录
    String getFdDlGesellCheckNumber(int childId, int motherId);

    // 根据 患儿ID和母亲ID 获取 随访数据库 发育水平 Gesell量表
    List<FDDlGesellCheck> getFdDlGesellCheck(int childId, int motherId);

    // 保存 随访数据库 发育水平 Gesell量表 页面 数据
    String saveFDDLGS(String gesellCheckNumber, String gcArray, int childId, int motherId);

    // 根据 患儿ID和母亲ID 获取 随访数据库 发育水平 Griffiths量表 记录
    String getFdDlGriffithsCheckNumber(int childId, int motherId);

    // 根据 患儿ID和母亲ID 获取 随访数据库 发育水平 Griffiths量表
    List<FDDlGriffithsCheck> getFdDlGriffithsCheck(int childId, int motherId);

    // 保存 随访数据库 发育水平 Griffiths量表 页面 数据
    String saveFDDLGF(String griffithsCheckNumber, String gcArray, int childId, int motherId);

    // 根据 患儿ID和母亲ID 获取 随访数据库 发育水平 GMFCS 记录
    String getFdDlGmfcsCheckNumber(int childId, int motherId);

    // 根据 患儿ID和母亲ID 获取 随访数据库 发育水平 GMFCS
    List<FDDlGmfcsCheck> getFdDlGmfcsCheck(int childId, int motherId);

    // 保存 随访数据库 发育水平 GMFCS 页面 数据
    String saveFDDLGM(String gmfcsCheckNumber, String gcArray, int childId, int motherId);

    // 根据 患儿ID和母亲ID 获取 随访数据库 发育水平 CBCL量表 记录
    String getFdDlCbclCheckNumber(int childId, int motherId);

    // 根据 患儿ID和母亲ID 获取 随访数据库 发育水平 CBCL量表
    List<FDDlCbclCheck> getFdDlCbclCheck(int childId, int motherId);

    // 保存 随访数据库 发育水平 CBCL量表 页面 数据
    String saveFDDLCB(String cbclCheckNumber, String ccArray, int childId, int motherId);

    // 根据 患儿ID和母亲ID 获取 随访数据库 成长历程 门诊就诊 记录
    String getFdGpVisitNumber(int childId, int motherId);

    // 根据 患儿ID和母亲ID 获取 随访数据库 成长历程 门诊就诊
    List<FDGpOutpatientVisit> getFdGpOutpatientVisit(int childId, int motherId);

    // 保存 随访数据库 成长历程 门诊就诊 页面 数据
    String saveFDGPOV(String visitNumber, String ovArray, int childId, int motherId);

    // 根据 患儿ID和母亲ID 获取 随访数据库 成长历程 住院治疗 记录
    String getFdGpHospitalizationNumber(int childId, int motherId);

    // 根据 患儿ID和母亲ID 获取 随访数据库 成长历程 住院治疗
    List<FDGpHospitalizationTreatment> getFdGpHospitalizationTreatment(int childId, int motherId);

    // 保存 随访数据库 成长历程 住院治疗 页面 数据
    String saveFDGPHT(String hospitalizationNumber, String htArray, int childId, int motherId);

    // 根据 患儿ID和母亲ID 获取 随访数据库 成长历程 随访计划 记录
    String getFdGpFollowUpPlan(int childId, int motherId);

    // 保存 随访数据库 成长历程 随访计划 页面 数据
    String saveFDGPFP(String fpArray, int childId, int motherId);

    // 根据 患儿ID和母亲ID 获取 随访数据库 成长历程 疾病防治 记录
    String getFdGpDiseaseControl(int childId, int motherId);

    // 保存 随访数据库 成长历程 疾病防治 页面 数据
    String saveFDGPDC(String dcArray, int childId, int motherId);

    // 根据 患儿ID和母亲ID 获取 随访数据库 病例填写情况
    CaseStatus getFdCaseStatus(int childId, int motherId);

    // 根据 患儿ID和母亲ID 获取 随访数据库 审核次数
    int getFdReviewCount(int childId, int motherId);

    // 根据 患儿ID和母亲ID 获取 随访数据库 审核情况
    List<Review> getFdReview(int childId, int motherId);

    // 随访数据库 添加 审核信息
    String addFdReview(Review fdReview, int childId, int motherId);
}