package com.pnsrcp.web.dao;

import com.pnsrcp.web.entity.perintalPlatform.CaseStatus;
import com.pnsrcp.web.entity.perintalPlatform.Review;
import com.pnsrcp.web.entity.perintalPlatform.followDatabase.*;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

/**
 * @Project: 围产新生儿科研合作平台
 * @Author: Linyer
 * @Email: linyer@linyer.cn
 * @Date: 2022/06/02 18:03 星期四
 * @Description: 随访数据库 数据层
 */
@Mapper
public interface FollowDatabaseMapper {
    /**
     * 查询 随访数据库 随访信息 初始数据
     * @param childId 患儿ID
     * @param motherId 母亲ID
     * @return 随访数据库 随访信息 初始数据
     */
    FDFollowInformation fdFiMsgQry(@Param("childId") int childId, @Param("motherId") int motherId);

    /**
     * 查询 随访数据库 随访信息 宝宝身份证姓名
     * @param childId 患儿ID
     * @param motherId 母亲ID
     * @return 随访数据库 随访信息 宝宝身份证姓名
     */
    String fdFiChildIdCardNameQry(@Param("childId") int childId, @Param("motherId") int motherId);

    /**
     * 插入/更新 随访数据库 随访信息
     * @param fdFollowInformation 随访信息
     * @param writerId 填写人ID
     * @param hospitalId 医院ID
     * @return 改变的行数
     */
    int fdFollowInformationInsertUpdate(@Param("fdFollowInformation") FDFollowInformation fdFollowInformation, @Param("writerId") int writerId, @Param("hospitalId") int hospitalId);

    /**
     * 插入/更新 随访数据库 生长曲线 体重检查 汇总
     * @param bodyWeight 体重检查 汇总
     * @return 改变的行数
     */
    int fdGcBwSummaryInsertUpdate(FDGcBwSummary bodyWeight);

    /**
     * 插入 随访数据库 生长曲线 体重检查
     * @param fdGcBodyWeight 生长曲线 体重检查
     * @return 改变的行数
     */
    int fdGcBodyWeightInsert(FDGcBodyWeight fdGcBodyWeight);

    /**
     * 删除 随访数据库 生长曲线 体重检查 列表
     * @param childId 患儿ID
     * @param motherId 母亲ID
     * @return 改变的行数
     */
    int fdGcBodyWeightDelete(@Param("childId") int childId, @Param("motherId") int motherId);

    /**
     * 查询 随访数据库 生长曲线 体重检查 次数
     * @param childId 患儿ID
     * @param motherId 母亲ID
     * @return 生长曲线 体重检查 次数
     */
    FDGcBwSummary fdGcBwSummaryQry(@Param("childId") int childId, @Param("motherId") int motherId);

    /**
     * 查询 随访数据库 生长曲线 体重检查 列表
     * @param childId 患儿ID
     * @param motherId 母亲ID
     * @return 生长曲线 体重检查 列表
     */
    List<FDGcBodyWeight> fdGcBodyWeightQry(@Param("childId") int childId, @Param("motherId") int motherId);

    /**
     * 插入/更新 随访数据库 生长曲线 身长检查 汇总
     * @param blSummary 身长检查 汇总
     * @return 改变的行数
     */
    int fdGcBlSummaryInsertUpdate(FDGcBlSummary blSummary);

    /**
     * 插入 随访数据库 生长曲线 身长检查
     * @param fdGcBodyLength 生长曲线 身长检查
     * @return 改变的行数
     */
    int fdGcBodyLengthInsert(FDGcBodyLength fdGcBodyLength);

    /**
     * 删除 随访数据库 生长曲线 身长检查 列表
     * @param childId 患儿ID
     * @param motherId 母亲ID
     * @return 改变的行数
     */
    int fdGcBodyLengthDelete(@Param("childId") int childId, @Param("motherId") int motherId);

    /**
     * 查询 随访数据库 生长曲线 身长检查 汇总
     * @param childId 患儿ID
     * @param motherId 母亲ID
     * @return 生长曲线 身长检查 次数
     */
    FDGcBlSummary fdGcBlSummaryQry(@Param("childId") int childId, @Param("motherId") int motherId);

    /**
     * 查询 随访数据库 生长曲线 身长检查 列表
     * @param childId 患儿ID
     * @param motherId 母亲ID
     * @return 生长曲线 身长检查 列表
     */
    List<FDGcBodyLength> fdGcBodyLengthQry(@Param("childId") int childId, @Param("motherId") int motherId);

    /**
     * 插入/更新 随访数据库 生长曲线 头围检查 汇总
     * @param hcSummary 头围检查 汇总
     * @return 改变的行数
     */
    int fdGcHcSummaryInsertUpdate(FDGcHcSummary hcSummary);

    /**
     * 插入 随访数据库 生长曲线 头围检查
     * @param fdGcHeadCircumference 生长曲线 头围检查
     * @return 改变的行数
     */
    int fdGcHeadCircumferenceInsert(FDGcHeadCircumference fdGcHeadCircumference);

    /**
     * 删除 随访数据库 生长曲线 头围检查 列表
     * @param childId 患儿ID
     * @param motherId 母亲ID
     * @return 改变的行数
     */
    int fdGcHeadCircumferenceDelete(@Param("childId") int childId, @Param("motherId") int motherId);

    /**
     * 查询 随访数据库 生长曲线 头围检查 汇总
     * @param childId 患儿ID
     * @param motherId 母亲ID
     * @return 生长曲线 头围检查 汇总
     */
    FDGcHcSummary fdGcHcSummaryQry(@Param("childId") int childId, @Param("motherId") int motherId);

    /**
     * 查询 随访数据库 生长曲线 头围检查 列表
     * @param childId 患儿ID
     * @param motherId 母亲ID
     * @return 生长曲线 头围检查 列表
     */
    List<FDGcHeadCircumference> fdGcHeadCircumferenceQry(@Param("childId") int childId, @Param("motherId") int motherId);

    /**
     * 插入/更新 随访数据库 生长曲线 喂养记录
     * @param childId 患儿ID
     * @param motherId 母亲ID
     * @param feedingRecordNumber 喂养记录
     * @return 改变的行数
     */
    int fdGcFdFeedingRecordNumberInsertUpdate(@Param("feedingRecordNumber") String feedingRecordNumber, @Param("childId") int childId, @Param("motherId") int motherId);

    /**
     * 查询 随访数据库 生长曲线 喂养记录
     * @param childId 患儿ID
     * @param motherId 母亲ID
     * @return 生长曲线 喂养记录
     */
    String fdGcFeedingRecordNumberQry(@Param("childId") int childId, @Param("motherId") int motherId);

    /**
     * 插入 随访数据库 生长曲线 生长评估 0到12月
     * @param fdGcGrowthAssessment 生长曲线 生长评估 0到12月
     * @return 改变的行数
     */
    int fdGcGrowthAssessment1Insert(FDGcGrowthAssessment fdGcGrowthAssessment);

    /**
     * 删除 随访数据库 生长曲线 生长评估 0到12月
     * @param childId 患儿ID
     * @param motherId 母亲ID
     * @return 改变的行数
     */
    int fdGcGrowthAssessment1Delete(@Param("childId") int childId, @Param("motherId") int motherId);

    /**
     * 插入 随访数据库 生长曲线 生长评估 13月到6岁
     * @param fdGcGrowthAssessment 生长曲线 生长评估 13月到6岁
     * @return 改变的行数
     */
    int fdGcGrowthAssessment2Insert(FDGcGrowthAssessment fdGcGrowthAssessment);

    /**
     * 删除 随访数据库 生长曲线 生长评估 13月到6岁
     * @param childId 患儿ID
     * @param motherId 母亲ID
     * @return 改变的行数
     */
    int fdGcGrowthAssessment2Delete(@Param("childId") int childId, @Param("motherId") int motherId);

    /**
     * 插入/更新 随访数据库 生长曲线 营养记录
     * @param childId 患儿ID
     * @param motherId 母亲ID
     * @param nutritionRecordNumber 营养记录
     * @return 改变的行数
     */
    int fdGcNutritionRecordNumberInsertUpdate(@Param("nutritionRecordNumber") String nutritionRecordNumber, @Param("childId") int childId, @Param("motherId") int motherId);

    /**
     * 插入 随访数据库 生长曲线 营养记录
     * @param fdGcNutritionRecord 生长曲线 营养记录
     * @return 改变的行数
     */
    int fdGcNutritionRecordInsert(FDGcNutritionRecord fdGcNutritionRecord);

    /**
     * 删除 随访数据库 生长曲线 营养记录 列表
     * @param childId 患儿ID
     * @param motherId 母亲ID
     * @return 改变的行数
     */
    int fdGcNutritionRecordDelete(@Param("childId") int childId, @Param("motherId") int motherId);

    /**
     * 查询 随访数据库 生长曲线 营养记录
     * @param childId 患儿ID
     * @param motherId 母亲ID
     * @return 生长曲线 营养记录
     */
    String fdGcNutritionRecordNumberQry(@Param("childId") int childId, @Param("motherId") int motherId);

    /**
     * 查询 随访数据库 生长曲线 营养记录 列表
     * @param childId 患儿ID
     * @param motherId 母亲ID
     * @return 生长曲线 营养记录 列表
     */
    List<FDGcNutritionRecord> fdGcNutritionRecordQry(@Param("childId") int childId, @Param("motherId") int motherId);

    /**
     * 插入/更新 随访数据库 发育水平 视力检查
     * @param childId 患儿ID
     * @param motherId 母亲ID
     * @param visionCheckNumber 视力检查
     * @return 改变的行数
     */
    int fdDlVisionCheckNumberInsertUpdate(@Param("visionCheckNumber") String visionCheckNumber, @Param("childId") int childId, @Param("motherId") int motherId);

    /**
     * 插入 随访数据库 发育水平 视力检查
     * @param fdDlVisionCheck 生长曲线 视力检查
     * @return 改变的行数
     */
    int fdDlVisionCheckInsert(FDDlVisionCheck fdDlVisionCheck);

    /**
     * 删除 随访数据库 发育水平 视力检查 列表
     * @param childId 患儿ID
     * @param motherId 母亲ID
     * @return 改变的行数
     */
    int fdDlVisionCheckDelete(@Param("childId") int childId, @Param("motherId") int motherId);

    /**
     * 查询 随访数据库 发育水平 视力检查
     * @param childId 患儿ID
     * @param motherId 母亲ID
     * @return 发育水平 视力检查
     */
    String fdDlVisionCheckNumberQry(@Param("childId") int childId, @Param("motherId") int motherId);

    /**
     * 查询 随访数据库 发育水平 视力检查 列表
     * @param childId 患儿ID
     * @param motherId 母亲ID
     * @return 发育水平 视力检查 列表
     */
    List<FDDlVisionCheck> fdDlVisionCheckQry(@Param("childId") int childId, @Param("motherId") int motherId);

    /**
     * 插入/更新 随访数据库 发育水平 听力检查
     * @param childId 患儿ID
     * @param motherId 母亲ID
     * @param hearingCheckNumber 听力检查
     * @return 改变的行数
     */
    int fdDlHearingCheckNumberInsertUpdate(@Param("hearingCheckNumber") String hearingCheckNumber, @Param("childId") int childId, @Param("motherId") int motherId);

    /**
     * 插入 随访数据库 发育水平 听力检查
     * @param fdDlHearingCheck 生长曲线 听力检查
     * @return 改变的行数
     */
    int fdDlHearingCheckInsert(FDDlHearingCheck fdDlHearingCheck);

    /**
     * 删除 随访数据库 发育水平 听力检查 列表
     * @param childId 患儿ID
     * @param motherId 母亲ID
     * @return 改变的行数
     */
    int fdDlHearingCheckDelete(@Param("childId") int childId, @Param("motherId") int motherId);

    /**
     * 查询 随访数据库 发育水平 听力检查
     * @param childId 患儿ID
     * @param motherId 母亲ID
     * @return 发育水平 听力检查
     */
    String fdDlHearingCheckNumberQry(@Param("childId") int childId, @Param("motherId") int motherId);

    /**
     * 查询 随访数据库 发育水平 听力检查 列表
     * @param childId 患儿ID
     * @param motherId 母亲ID
     * @return 发育水平 听力检查 列表
     */
    List<FDDlHearingCheck> fdDlHearingCheckQry(@Param("childId") int childId, @Param("motherId") int motherId);

    /**
     * 插入/更新 随访数据库 发育水平 Gesell量表
     * @param childId 患儿ID
     * @param motherId 母亲ID
     * @param gesellCheckNumber Gesell量表
     * @return 改变的行数
     */
    int fdDlGesellCheckNumberInsertUpdate(@Param("gesellCheckNumber") String gesellCheckNumber, @Param("childId") int childId, @Param("motherId") int motherId);

    /**
     * 插入 随访数据库 发育水平 Gesell量表
     * @param fdDlGesellCheck 生长曲线 Gesell量表
     * @return 改变的行数
     */
    int fdDlGesellCheckInsert(FDDlGesellCheck fdDlGesellCheck);

    /**
     * 删除 随访数据库 发育水平 Gesell量表 列表
     * @param childId 患儿ID
     * @param motherId 母亲ID
     * @return 改变的行数
     */
    int fdDlGesellCheckDelete(@Param("childId") int childId, @Param("motherId") int motherId);

    /**
     * 查询 随访数据库 发育水平 Gesell量表
     * @param childId 患儿ID
     * @param motherId 母亲ID
     * @return 发育水平 Gesell量表
     */
    String fdDlGesellCheckNumberQry(@Param("childId") int childId, @Param("motherId") int motherId);

    /**
     * 查询 随访数据库 发育水平 Gesell量表 列表
     * @param childId 患儿ID
     * @param motherId 母亲ID
     * @return 发育水平 Gesell量表 列表
     */
    List<FDDlGesellCheck> fdDlGesellCheckQry(@Param("childId") int childId, @Param("motherId") int motherId);

    /**
     * 插入/更新 随访数据库 发育水平 Griffiths量表
     * @param childId 患儿ID
     * @param motherId 母亲ID
     * @param griffithsCheckNumber Griffiths量表
     * @return 改变的行数
     */
    int fdDlGriffithsCheckNumberInsertUpdate(@Param("griffithsCheckNumber") String griffithsCheckNumber, @Param("childId") int childId, @Param("motherId") int motherId);

    /**
     * 插入 随访数据库 发育水平 Griffiths量表
     * @param fdDlGriffithsCheck 生长曲线 Griffiths量表
     * @return 改变的行数
     */
    int fdDlGriffithsCheckInsert(FDDlGriffithsCheck fdDlGriffithsCheck);

    /**
     * 删除 随访数据库 发育水平 Griffiths量表 列表
     * @param childId 患儿ID
     * @param motherId 母亲ID
     * @return 改变的行数
     */
    int fdDlGriffithsCheckDelete(@Param("childId") int childId, @Param("motherId") int motherId);

    /**
     * 查询 随访数据库 发育水平 Griffiths量表
     * @param childId 患儿ID
     * @param motherId 母亲ID
     * @return 发育水平 Griffiths量表
     */
    String fdDlGriffithsCheckNumberQry(@Param("childId") int childId, @Param("motherId") int motherId);

    /**
     * 查询 随访数据库 发育水平 Griffiths量表 列表
     * @param childId 患儿ID
     * @param motherId 母亲ID
     * @return 发育水平 Griffiths量表 列表
     */
    List<FDDlGriffithsCheck> fdDlGriffithsCheckQry(@Param("childId") int childId, @Param("motherId") int motherId);

    /**
     * 插入/更新 随访数据库 发育水平 GMFCS
     * @param childId 患儿ID
     * @param motherId 母亲ID
     * @param gmfcsCheckNumber GMFCS
     * @return 改变的行数
     */
    int fdDlGmfcsCheckNumberInsertUpdate(@Param("gmfcsCheckNumber") String gmfcsCheckNumber, @Param("childId") int childId, @Param("motherId") int motherId);

    /**
     * 插入 随访数据库 发育水平 GMFCS
     * @param fdDlGmfcsCheck 生长曲线 GMFCS
     * @return 改变的行数
     */
    int fdDlGmfcsCheckInsert(FDDlGmfcsCheck fdDlGmfcsCheck);

    /**
     * 删除 随访数据库 发育水平 GMFCS 列表
     * @param childId 患儿ID
     * @param motherId 母亲ID
     * @return 改变的行数
     */
    int fdDlGmfcsCheckDelete(@Param("childId") int childId, @Param("motherId") int motherId);

    /**
     * 查询 随访数据库 发育水平 GMFCS
     * @param childId 患儿ID
     * @param motherId 母亲ID
     * @return 发育水平 GMFCS
     */
    String fdDlGmfcsCheckNumberQry(@Param("childId") int childId, @Param("motherId") int motherId);

    /**
     * 查询 随访数据库 发育水平 GMFCS 列表
     * @param childId 患儿ID
     * @param motherId 母亲ID
     * @return 发育水平 GMFCS 列表
     */
    List<FDDlGmfcsCheck> fdDlGmfcsCheckQry(@Param("childId") int childId, @Param("motherId") int motherId);

    /**
     * 插入/更新 随访数据库 发育水平 CBCL量表
     * @param childId 患儿ID
     * @param motherId 母亲ID
     * @param cbclCheckNumber CBCL量表
     * @return 改变的行数
     */
    int fdDlCbclCheckNumberInsertUpdate(@Param("cbclCheckNumber") String cbclCheckNumber, @Param("childId") int childId, @Param("motherId") int motherId);

    /**
     * 插入 随访数据库 发育水平 CBCL量表
     * @param fdDlCbclCheck 生长曲线 CBCL量表
     * @return 改变的行数
     */
    int fdDlCbclCheckInsert(FDDlCbclCheck fdDlCbclCheck);

    /**
     * 删除 随访数据库 发育水平 CBCL量表 列表
     * @param childId 患儿ID
     * @param motherId 母亲ID
     * @return 改变的行数
     */
    int fdDlCbclCheckDelete(@Param("childId") int childId, @Param("motherId") int motherId);

    /**
     * 查询 随访数据库 发育水平 CBCL量表
     * @param childId 患儿ID
     * @param motherId 母亲ID
     * @return 发育水平 CBCL量表
     */
    String fdDlCbclCheckNumberQry(@Param("childId") int childId, @Param("motherId") int motherId);

    /**
     * 查询 随访数据库 发育水平 CBCL量表 列表
     * @param childId 患儿ID
     * @param motherId 母亲ID
     * @return 发育水平 CBCL量表 列表
     */
    List<FDDlCbclCheck> fdDlCbclCheckQry(@Param("childId") int childId, @Param("motherId") int motherId);

    /**
     * 插入/更新 随访数据库 成长历程 门诊就诊次数
     * @param childId 患儿ID
     * @param motherId 母亲ID
     * @param visitNumber 门诊就诊次数
     * @return 改变的行数
     */
    int fdGpVisitNumberInsertUpdate(@Param("visitNumber") String visitNumber, @Param("childId") int childId, @Param("motherId") int motherId);

    /**
     * 插入 随访数据库 成长历程 门诊就诊
     * @param fdGpOutpatientVisit 成长历程 门诊就诊
     * @return 改变的行数
     */
    int fdGpOutpatientVisitInsert(FDGpOutpatientVisit fdGpOutpatientVisit);

    /**
     * 删除 随访数据库 成长历程 门诊就诊 列表
     * @param childId 患儿ID
     * @param motherId 母亲ID
     * @return 改变的行数
     */
    int fdGpOutpatientVisitDelete(@Param("childId") int childId, @Param("motherId") int motherId);

    /**
     * 查询 随访数据库 成长历程 门诊就诊次数
     * @param childId 患儿ID
     * @param motherId 母亲ID
     * @return 成长历程 门诊就诊次数
     */
    String fdGpVisitNumberQry(@Param("childId") int childId, @Param("motherId") int motherId);

    /**
     * 查询 随访数据库 成长历程 门诊就诊 列表
     * @param childId 患儿ID
     * @param motherId 母亲ID
     * @return 成长历程 门诊就诊 列表
     */
    List<FDGpOutpatientVisit> fdGpOutpatientVisitQry(@Param("childId") int childId, @Param("motherId") int motherId);

    /**
     * 插入/更新 随访数据库 成长历程 住院治疗次数
     * @param childId 患儿ID
     * @param motherId 母亲ID
     * @param hospitalizationNumber 住院治疗次数
     * @return 改变的行数
     */
    int fdGpHospitalizationNumberInsertUpdate(@Param("hospitalizationNumber") String hospitalizationNumber, @Param("childId") int childId, @Param("motherId") int motherId);

    /**
     * 插入 随访数据库 成长历程 住院治疗
     * @param fdGpHospitalizationTreatment 成长历程 住院治疗
     * @return 改变的行数
     */
    int fdGpHospitalizationTreatmentInsert(FDGpHospitalizationTreatment fdGpHospitalizationTreatment);

    /**
     * 删除 随访数据库 成长历程 住院治疗 列表
     * @param childId 患儿ID
     * @param motherId 母亲ID
     * @return 改变的行数
     */
    int fdGpHospitalizationTreatmentDelete(@Param("childId") int childId, @Param("motherId") int motherId);

    /**
     * 查询 随访数据库 成长历程 住院治疗次数
     * @param childId 患儿ID
     * @param motherId 母亲ID
     * @return 成长历程 住院治疗次数
     */
    String fdGpHospitalizationNumberQry(@Param("childId") int childId, @Param("motherId") int motherId);

    /**
     * 查询 随访数据库 成长历程 住院治疗 列表
     * @param childId 患儿ID
     * @param motherId 母亲ID
     * @return 成长历程 住院治疗 列表
     */
    List<FDGpHospitalizationTreatment> fdGpHospitalizationTreatmentQry(@Param("childId") int childId, @Param("motherId") int motherId);

    /**
     * 插入 随访数据库 成长历程 随访计划
     * @param fdGpFollowUpPlan 成长历程 随访计划
     * @return 改变的行数
     */
    int fdGpFollowUpPlanInsert(FDGpFollowUpPlan fdGpFollowUpPlan);

    /**
     * 删除 随访数据库 成长历程 随访计划 列表
     * @param childId 患儿ID
     * @param motherId 母亲ID
     * @return 改变的行数
     */
    int fdGpFollowUpPlanDelete(@Param("childId") int childId, @Param("motherId") int motherId);

    /**
     * 查询 随访数据库 成长历程 随访计划 列表
     * @param childId 患儿ID
     * @param motherId 母亲ID
     * @return 成长历程 随访计划 列表
     */
    List<FDGpFollowUpPlan> fdGpFollowUpPlanQry(@Param("childId") int childId, @Param("motherId") int motherId);

    /**
     * 插入 随访数据库 成长历程 疾病防治
     * @param fdGpDiseaseControl 成长历程 疾病防治
     * @return 改变的行数
     */
    int fdGpDiseaseControlInsert(FDGpDiseaseControl fdGpDiseaseControl);

    /**
     * 删除 随访数据库 成长历程 疾病防治 列表
     * @param childId 患儿ID
     * @param motherId 母亲ID
     * @return 改变的行数
     */
    int fdGpDiseaseControlDelete(@Param("childId") int childId, @Param("motherId") int motherId);

    /**
     * 查询 随访数据库 成长历程 疾病防治 列表
     * @param childId 患儿ID
     * @param motherId 母亲ID
     * @return 成长历程 疾病防治 列表
     */
    List<FDGpDiseaseControl> fdGpDiseaseControlQry(@Param("childId") int childId, @Param("motherId") int motherId);

    /**
     * 更新 随访数据库 填写状态
     * @param childId 患儿ID
     * @param motherId 母亲ID
     * @param status 病例填写状态
     * @return 改变的行数
     */
    int fdStatusUpdate(@Param("childId") int childId, @Param("motherId") int motherId, @Param("status") int status);

    /**
     * 查询 随访数据库 填写情况
     * @param childId 患儿ID
     * @param motherId 母亲ID
     * @return 填写情况
     */
    CaseStatus fdCaseStatusQry(@Param("childId") int childId, @Param("motherId") int motherId);

    /**
     * 查询 随访数据库 审核次数
     * @param childId 患儿ID
     * @param motherId 母亲ID
     * @return 审核次数
     */
    int fdReviewCount(@Param("childId") int childId, @Param("motherId") int motherId);

    /**
     * 查询 随访数据库 审核情况
     * @param childId 患儿ID
     * @param motherId 母亲ID
     * @return 审核情况
     */
    List<Review> fdReviewQry(@Param("childId") int childId, @Param("motherId") int motherId);

    /**
     * 插入 随访数据库 审核信息
     * @param fdReview 审核信息
     * @return 改变的行数
     */
    int fdReviewInsert(Review fdReview);
}
