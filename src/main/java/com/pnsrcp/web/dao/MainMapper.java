package com.pnsrcp.web.dao;

import com.pnsrcp.web.entity.DataAmount;
import com.pnsrcp.web.entity.Feedback;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.Date;
import java.util.List;
import java.util.Map;

/**
 * @Project: 围产新生儿科研合作平台
 * @Author: Linyer
 * @Email: linyer@linyer.cn
 * @Date: 2021/7/30 14:39 星期五
 * @Description: 主页数据 数据层
 */
@Mapper
public interface MainMapper {
    /**
     * 获取 数据量
     * @param hospitalId 医院ID
     * @param hospitalList 医院ID列表
     * @return 数据量
     */
    List<DataAmount> dataAmountQry(@Param("hospitalId") int hospitalId, @Param("hospitalList") List<Integer> hospitalList);

    /**
     * 检测 病例是否符合 医院ID
     * @param motherId 母亲ID
     * @param hospitalId 医院ID
     * @param hospitalIdList 医院ID
     * @return 总病例数
     */
    int motherIdCheck(@Param("motherId") int motherId, @Param("hospitalId") int hospitalId, @Param("hospitalList") List<Integer> hospitalIdList);

    /**
     * 获取 总 病例数
     * @param selectType 选择类型
     * @param startDate 开始日期
     * @param endDate 结束日期
     * @param inHospital 是否在院
     * @param hospitalId 医院ID
     * @param hospitalList 医院ID列表
     * @return 总病例数
     */
    int casesTotalNumberQry(@Param("selectType") String selectType, @Param("startDate") Date startDate,
                            @Param("endDate") Date endDate, @Param("inHospital") int inHospital,
                            @Param("hospitalId") int hospitalId, @Param("hospitalList") List<Integer> hospitalList);

    /**
     * 获取 胎龄小于32周 病例数
     * @param selectType 选择类型
     * @param startDate 开始日期
     * @param endDate 结束日期
     * @param inHospital 是否在院
     * @param hospitalId 医院ID
     * @param hospitalList 医院ID列表
     * @return 胎龄小于32周 病例数
     */
    int ga32wQry(@Param("selectType") String selectType, @Param("startDate") Date startDate,
                 @Param("endDate") Date endDate, @Param("inHospital") int inHospital,
                 @Param("hospitalId") int hospitalId, @Param("hospitalList") List<Integer> hospitalList);

    /**
     * 获取 出生体重小于1500g 病例数
     * @param selectType 选择类型
     * @param startDate 开始日期
     * @param endDate 结束日期
     * @param inHospital 是否在院
     * @param hospitalId 医院ID
     * @param hospitalList 医院ID列表
     * @return 出生体重小于1500g 病例数
     */
    int bw1500gQry(@Param("selectType") String selectType, @Param("startDate") Date startDate,
                   @Param("endDate") Date endDate, @Param("inHospital") int inHospital,
                   @Param("hospitalId") int hospitalId, @Param("hospitalList") List<Integer> hospitalList);

    /**
     * 获取 今日新增 病例数
     * @param todayStart 今日开始时间
     * @param todayNow 当前时间
     * @param inHospital 是否在院
     * @param hospitalId 医院ID
     * @param hospitalList 医院ID列表
     * @return 今日新增 病例数
     */
    int todayAddQry(@Param("todayStart") String todayStart, @Param("todayNow") Date todayNow,
                    @Param("inHospital") int inHospital, @Param("hospitalId") int hospitalId,
                    @Param("hospitalList") List<Integer> hospitalList);

    /**
     * 获取 填写中 病例数
     * @param selectType 选择类型
     * @param startDate 开始日期
     * @param endDate 结束日期
     * @param inHospital 是否在院
     * @param hospitalId 医院ID
     * @param hospitalList 医院ID列表
     * @return 填写中 病例数
     */
    int writingQry(@Param("selectType") String selectType, @Param("startDate") Date startDate,
                   @Param("endDate") Date endDate, @Param("inHospital") int inHospital,
                   @Param("hospitalId") int hospitalId, @Param("hospitalList") List<Integer> hospitalList);

    /**
     * 获取 已完成 病例数
     * @param selectType 选择类型
     * @param startDate 开始日期
     * @param endDate 结束日期
     * @param inHospital 是否在院
     * @param hospitalId 医院ID
     * @param hospitalList 医院ID列表
     * @return 填写中 病例数
     */
    int completedQry(@Param("selectType") String selectType, @Param("startDate") Date startDate,
                     @Param("endDate") Date endDate, @Param("inHospital") int inHospital,
                     @Param("hospitalId") int hospitalId, @Param("hospitalList") List<Integer> hospitalList);

    /**
     * 获取 审核通过 病例数
     * @param selectType 选择类型
     * @param startDate 开始日期
     * @param endDate 结束日期
     * @param inHospital 是否在院
     * @param hospitalId 医院ID
     * @param hospitalList 医院ID列表
     * @return 审核通过 病例数
     */
    int reviewPassQry(@Param("selectType") String selectType, @Param("startDate") Date startDate,
                      @Param("endDate") Date endDate, @Param("inHospital") int inHospital,
                      @Param("hospitalId") int hospitalId, @Param("hospitalList") List<Integer> hospitalList);

    /**
     * 获取 审核不通过 病例数
     * @param selectType 选择类型
     * @param startDate 开始日期
     * @param endDate 结束日期
     * @param inHospital 是否在院
     * @param hospitalId 医院ID
     * @param hospitalList 医院ID列表
     * @return 审核不通过 病例数
     */
    int reviewRejectQry(@Param("selectType") String selectType, @Param("startDate") Date startDate,
                        @Param("endDate") Date endDate, @Param("inHospital") int inHospital,
                        @Param("hospitalId") int hospitalId, @Param("hospitalList") List<Integer> hospitalList);

    /**
     * 获取 胎龄小于26周 病例数
     * @param selectType 选择类型
     * @param startDate 开始日期
     * @param endDate 结束日期
     * @param inHospital 是否在院
     * @param hospitalId 医院ID
     * @param hospitalList 医院ID列表
     * @return 胎龄小于26周 病例数
     */
    int gestationalAgeL26Qry(@Param("selectType") String selectType, @Param("startDate") Date startDate,
                             @Param("endDate") Date endDate, @Param("inHospital") int inHospital,
                             @Param("hospitalId") int hospitalId, @Param("hospitalList") List<Integer> hospitalList);

    /**
     * 获取 胎龄介于26-27周 病例数
     * @param selectType 选择类型
     * @param startDate 开始日期
     * @param endDate 结束日期
     * @param inHospital 是否在院
     * @param hospitalId 医院ID
     * @param hospitalList 医院ID列表
     * @return 胎龄介于27-28周 病例数
     */
    int gestationalAge26To27Qry(@Param("selectType") String selectType, @Param("startDate") Date startDate,
                                @Param("endDate") Date endDate, @Param("inHospital") int inHospital,
                                @Param("hospitalId") int hospitalId, @Param("hospitalList") List<Integer> hospitalList);

    /**
     * 获取 胎龄介于28-31周 病例数
     * @param selectType 选择类型
     * @param startDate 开始日期
     * @param endDate 结束日期
     * @param inHospital 是否在院
     * @param hospitalId 医院ID
     * @param hospitalList 医院ID列表
     * @return 胎龄介于27-28周 病例数
     */
    int gestationalAge28To31Qry(@Param("selectType") String selectType, @Param("startDate") Date startDate,
                                @Param("endDate") Date endDate, @Param("inHospital") int inHospital,
                                @Param("hospitalId") int hospitalId, @Param("hospitalList") List<Integer> hospitalList);

    /**
     * 获取 胎龄介于32-33周 病例数
     * @param selectType 选择类型
     * @param startDate 开始日期
     * @param endDate 结束日期
     * @param inHospital 是否在院
     * @param hospitalId 医院ID
     * @param hospitalList 医院ID列表
     * @return 胎龄介于27-28周 病例数
     */
    int gestationalAge32To33Qry(@Param("selectType") String selectType, @Param("startDate") Date startDate,
                                @Param("endDate") Date endDate, @Param("inHospital") int inHospital,
                                @Param("hospitalId") int hospitalId, @Param("hospitalList") List<Integer> hospitalList);

    /**
     * 获取 胎龄介于34-36周 病例数
     * @param selectType 选择类型
     * @param startDate 开始日期
     * @param endDate 结束日期
     * @param inHospital 是否在院
     * @param hospitalId 医院ID
     * @param hospitalList 医院ID列表
     * @return 胎龄介于27-28周 病例数
     */
    int gestationalAge34To36Qry(@Param("selectType") String selectType, @Param("startDate") Date startDate,
                                @Param("endDate") Date endDate, @Param("inHospital") int inHospital,
                                @Param("hospitalId") int hospitalId, @Param("hospitalList") List<Integer> hospitalList);

    /**
     * 获取 胎龄大于等于37周 病例数
     * @param selectType 选择类型
     * @param startDate 开始日期
     * @param endDate 结束日期
     * @param inHospital 是否在院
     * @param hospitalId 医院ID
     * @param hospitalList 医院ID列表
     * @return 胎龄介于27-28周 病例数
     */
    int gestationalAgeHE37Qry(@Param("selectType") String selectType, @Param("startDate") Date startDate,
                              @Param("endDate") Date endDate, @Param("inHospital") int inHospital,
                              @Param("hospitalId") int hospitalId, @Param("hospitalList") List<Integer> hospitalList);

    /**
     * 获取 出生体重低于750g 病例数
     * @param selectType 选择类型
     * @param startDate 开始日期
     * @param endDate 结束日期
     * @param inHospital 是否在院
     * @param hospitalId 医院ID
     * @param hospitalList 医院ID列表
     * @return 出生体重低于750g 病例数
     */
    int birthWeightL750Qry(@Param("selectType") String selectType, @Param("startDate") Date startDate,
                           @Param("endDate") Date endDate, @Param("inHospital") int inHospital,
                           @Param("hospitalId") int hospitalId, @Param("hospitalList") List<Integer> hospitalList);

    /**
     * 获取 出生体重介于750-999g 病例数
     * @param selectType 选择类型
     * @param startDate 开始日期
     * @param endDate 结束日期
     * @param inHospital 是否在院
     * @param hospitalId 医院ID
     * @param hospitalList 医院ID列表
     * @return 出生体重介于750-999g 病例数
     */
    int birthWeight750To999Qry(@Param("selectType") String selectType, @Param("startDate") Date startDate,
                               @Param("endDate") Date endDate, @Param("inHospital") int inHospital,
                               @Param("hospitalId") int hospitalId, @Param("hospitalList") List<Integer> hospitalList);

    /**
     * 获取 出生体重介于1000-1249g 病例数
     * @param selectType 选择类型
     * @param startDate 开始日期
     * @param endDate 结束日期
     * @param inHospital 是否在院
     * @param hospitalId 医院ID
     * @param hospitalList 医院ID列表
     * @return 出生体重介于1000-1249g 病例数
     */
    int birthWeight1000To1249Qry(@Param("selectType") String selectType, @Param("startDate") Date startDate,
                                 @Param("endDate") Date endDate, @Param("inHospital") int inHospital,
                                 @Param("hospitalId") int hospitalId, @Param("hospitalList") List<Integer> hospitalList);

    /**
     * 获取 出生体重介于1250-1499g 病例数
     * @param selectType 选择类型
     * @param startDate 开始日期
     * @param endDate 结束日期
     * @param inHospital 是否在院
     * @param hospitalId 医院ID
     * @param hospitalList 医院ID列表
     * @return 出生体重介于1500-2499g 病例数
     */
    int birthWeight1250To1499Qry(@Param("selectType") String selectType, @Param("startDate") Date startDate,
                                 @Param("endDate") Date endDate, @Param("inHospital") int inHospital,
                                 @Param("hospitalId") int hospitalId, @Param("hospitalList") List<Integer> hospitalList);

    /**
     * 获取 出生体重介于1500-2499g 病例数
     * @param selectType 选择类型
     * @param startDate 开始日期
     * @param endDate 结束日期
     * @param inHospital 是否在院
     * @param hospitalId 医院ID
     * @param hospitalList 医院ID列表
     * @return 出生体重介于1500-2499g 病例数
     */
    int birthWeight1500To2449Qry(@Param("selectType") String selectType, @Param("startDate") Date startDate,
                                 @Param("endDate") Date endDate, @Param("inHospital") int inHospital,
                                 @Param("hospitalId") int hospitalId, @Param("hospitalList") List<Integer> hospitalList);

    /**
     * 获取 出生体重大于等于2500g 病例数
     * @param selectType 选择类型
     * @param startDate 开始日期
     * @param endDate 结束日期
     * @param inHospital 是否在院
     * @param hospitalId 医院ID
     * @param hospitalList 医院ID列表
     * @return 出生体重大于等于2500g 病例数
     */
    int birthWeightHE2500Qry(@Param("selectType") String selectType, @Param("startDate") Date startDate,
                             @Param("endDate") Date endDate, @Param("inHospital") int inHospital,
                             @Param("hospitalId") int hospitalId, @Param("hospitalList") List<Integer> hospitalList);

    /**
     * 获取 并发症BPD 病例数
     * @param selectType 选择类型
     * @param startDate 开始日期
     * @param endDate 结束日期
     * @param inHospital 是否在院
     * @param hospitalId 医院ID
     * @param hospitalList 医院ID列表
     * @return 并发症BPD 病例数
     */
    int complicationBPDQry(@Param("selectType") String selectType, @Param("startDate") Date startDate,
                           @Param("endDate") Date endDate, @Param("inHospital") int inHospital,
                           @Param("hospitalId") int hospitalId, @Param("hospitalList") List<Integer> hospitalList);

    /**
     * 获取 并发症NEC 病例数
     * @param selectType 选择类型
     * @param startDate 开始日期
     * @param endDate 结束日期
     * @param inHospital 是否在院
     * @param hospitalId 医院ID
     * @param hospitalList 医院ID列表
     * @return 并发症NEC 病例数
     */
    int complicationNECQry(@Param("selectType") String selectType, @Param("startDate") Date startDate,
                           @Param("endDate") Date endDate, @Param("inHospital") int inHospital,
                           @Param("hospitalId") int hospitalId, @Param("hospitalList") List<Integer> hospitalList);

    /**
     * 获取 并发症ROP 病例数
     * @param selectType 选择类型
     * @param startDate 开始日期
     * @param endDate 结束日期
     * @param inHospital 是否在院
     * @param hospitalId 医院ID
     * @param hospitalList 医院ID列表
     * @return 并发症ROP 病例数
     */
    int complicationROPQry(@Param("selectType") String selectType, @Param("startDate") Date startDate,
                           @Param("endDate") Date endDate, @Param("inHospital") int inHospital,
                           @Param("hospitalId") int hospitalId, @Param("hospitalList") List<Integer> hospitalList);

    /**
     * 获取 并发症IVH 病例数
     * @param selectType 选择类型
     * @param startDate 开始日期
     * @param endDate 结束日期
     * @param inHospital 是否在院
     * @param hospitalId 医院ID
     * @param hospitalList 医院ID列表
     * @return 并发症IVH 病例数
     */
    int complicationIVHQry(@Param("selectType") String selectType, @Param("startDate") Date startDate,
                           @Param("endDate") Date endDate, @Param("inHospital") int inHospital,
                           @Param("hospitalId") int hospitalId, @Param("hospitalList") List<Integer> hospitalList);

    /**
     * 获取 并发症PVL 病例数
     * @param selectType 选择类型
     * @param startDate 开始日期
     * @param endDate 结束日期
     * @param inHospital 是否在院
     * @param hospitalId 医院ID
     * @param hospitalList 医院ID列表
     * @return 并发症PVL 病例数
     */
    int complicationPVLQry(@Param("selectType") String selectType, @Param("startDate") Date startDate,
                           @Param("endDate") Date endDate, @Param("inHospital") int inHospital,
                           @Param("hospitalId") int hospitalId, @Param("hospitalList") List<Integer> hospitalList);

    /**
     * 获取 并发症RDS 病例数
     * @param selectType 选择类型
     * @param startDate 开始日期
     * @param endDate 结束日期
     * @param inHospital 是否在院
     * @param hospitalId 医院ID
     * @param hospitalList 医院ID列表
     * @return 并发症RDS 病例数
     */
    int complicationRDSQry(@Param("selectType") String selectType, @Param("startDate") Date startDate,
                           @Param("endDate") Date endDate, @Param("inHospital") int inHospital,
                           @Param("hospitalId") int hospitalId, @Param("hospitalList") List<Integer> hospitalList);

    /**
     * 获取 并发症EOS 病例数
     * @param selectType 选择类型
     * @param startDate 开始日期
     * @param endDate 结束日期
     * @param inHospital 是否在院
     * @param hospitalId 医院ID
     * @param hospitalList 医院ID列表
     * @return 并发症EOS 病例数
     */
    int complicationEOSQry(@Param("selectType") String selectType, @Param("startDate") Date startDate,
                           @Param("endDate") Date endDate, @Param("inHospital") int inHospital,
                           @Param("hospitalId") int hospitalId, @Param("hospitalList") List<Integer> hospitalList);

    /**
     * 获取 并发症LOS 病例数
     * @param selectType 选择类型
     * @param startDate 开始日期
     * @param endDate 结束日期
     * @param inHospital 是否在院
     * @param hospitalId 医院ID
     * @param hospitalList 医院ID列表
     * @return 并发症LOS 病例数
     */
    int complicationLOSQry(@Param("selectType") String selectType, @Param("startDate") Date startDate,
                           @Param("endDate") Date endDate, @Param("inHospital") int inHospital,
                           @Param("hospitalId") int hospitalId, @Param("hospitalList") List<Integer> hospitalList);

    /**
     * 获取 预后治愈好转 病例数
     * @param selectType 选择类型
     * @param startDate 开始日期
     * @param endDate 结束日期
     * @param inHospital 是否在院
     * @param hospitalId 医院ID
     * @param hospitalList 医院ID列表
     * @return 预后治愈好转 病例数
     */
    int prognosisCuredQry(@Param("selectType") String selectType, @Param("startDate") Date startDate,
                          @Param("endDate") Date endDate, @Param("inHospital") int inHospital,
                          @Param("hospitalId") int hospitalId, @Param("hospitalList") List<Integer> hospitalList);

    /**
     * 获取 预后院内死亡 病例数
     * @param selectType 选择类型
     * @param startDate 开始日期
     * @param endDate 结束日期
     * @param inHospital 是否在院
     * @param hospitalId 医院ID
     * @param hospitalList 医院ID列表
     * @return 预后院内死亡 病例数
     */
    int prognosisDeathInHospitalQry(@Param("selectType") String selectType, @Param("startDate") Date startDate,
                                    @Param("endDate") Date endDate, @Param("inHospital") int inHospital,
                                    @Param("hospitalId") int hospitalId, @Param("hospitalList") List<Integer> hospitalList);

    /**
     * 获取 预后放弃死亡 病例数
     * @param selectType 选择类型
     * @param startDate 开始日期
     * @param endDate 结束日期
     * @param inHospital 是否在院
     * @param hospitalId 医院ID
     * @param hospitalList 医院ID列表
     * @return 预后放弃死亡 病例数
     */
    int prognosisGiveUpDeathQry(@Param("selectType") String selectType, @Param("startDate") Date startDate,
                                @Param("endDate") Date endDate, @Param("inHospital") int inHospital,
                                @Param("hospitalId") int hospitalId, @Param("hospitalList") List<Integer> hospitalList);

    /**
     * 获取 预后救治无效 病例数
     * @param selectType 选择类型
     * @param startDate 开始日期
     * @param endDate 结束日期
     * @param inHospital 是否在院
     * @param hospitalId 医院ID
     * @param hospitalList 医院ID列表
     * @return 预后救治无效 病例数
     */
    int prognosisIneffectiveTreatmentQry(@Param("selectType") String selectType, @Param("startDate") Date startDate,
                                         @Param("endDate") Date endDate, @Param("inHospital") int inHospital,
                                         @Param("hospitalId") int hospitalId, @Param("hospitalList") List<Integer> hospitalList);

    /**
     * 获取 预后转院 病例数
     * @param selectType 选择类型
     * @param startDate 开始日期
     * @param endDate 结束日期
     * @param inHospital 是否在院
     * @param hospitalId 医院ID
     * @param hospitalList 医院ID列表
     * @return 预后转院 病例数
     */
    int prognosisTransferQry(@Param("selectType") String selectType, @Param("startDate") Date startDate,
                             @Param("endDate") Date endDate, @Param("inHospital") int inHospital,
                             @Param("hospitalId") int hospitalId, @Param("hospitalList") List<Integer> hospitalList);

    /**
     * 插入 反馈
     * @param feedback 反馈
     * @return 改变的行数
     */
    int feedbackInsert(@Param("feedback") Feedback feedback);

    /**
     * 获取 反馈
     * @param uid 用户ID
     * @return 反馈
     */
    List<Feedback> feedbackQry(@Param("uid") int uid);

    /**
     * 获取 反馈 回复
     * @param fid 父反馈ID
     * @return 反馈 回复
     */
    List<Feedback> feedbackReplyQry(@Param("fid") int fid);

    /**
     * 获取 筛选后 病例数
     * @param selectType 选择类型
     * @param startDate 开始日期
     * @param endDate 结束日期
     * @param patientClassification 病人分类
     * @param diagnosisTreatment 诊断治疗
     * @param outcomeIndicator 结局指标
     * @param hospitalList 医院ID列表
     * @return 病例数
     */
    int casesFilterNumberQry(@Param("selectType") String selectType, @Param("startDate") Date startDate,
                             @Param("endDate") Date endDate, @Param("patientClassification") int patientClassification,
                             @Param("diagnosisTreatment") int diagnosisTreatment,
                             @Param("outcomeIndicator") int outcomeIndicator,
                             @Param("hospitalList") List<Integer> hospitalList);

    /**
     * 获取 筛选后 病例导出数据
     * @param selectType 选择类型
     * @param startDate 开始日期
     * @param endDate 结束日期
     * @param patientClassification 病人分类
     * @param diagnosisTreatment 诊断治疗
     * @param outcomeIndicator 结局指标
     * @param hospitalList 医院ID列表
     * @param tableList 表格列表
     * @param fieldList 字段列表
     * @return 病例导出数据
     */
    List<Map<String, Object>> dataExportQry(@Param("selectType") String selectType,
                                            @Param("startDate") String startDate, @Param("endDate") String endDate,
                                            @Param("patientClassification") int patientClassification,
                                            @Param("diagnosisTreatment") int diagnosisTreatment,
                                            @Param("outcomeIndicator") int outcomeIndicator,
                                            @Param("hospitalList") List<Integer> hospitalList,
                                            @Param("tableList") List<String> tableList,
                                            @Param("fieldList") List<String> fieldList);

    /**
     * 获取 筛选后 专题导出数据
     * @param selectType 选择类型
     * @param startDate 开始日期
     * @param endDate 结束日期
     * @param patientClassification 病人分类
     * @param diagnosisTreatment 诊断治疗
     * @param outcomeIndicator 结局指标
     * @param hospitalList 医院ID列表
     * @param table 表名
     * @param allFields 字段列表
     * @return 病例导出专题
     */
    List<Map<String, Object>> topicExportQry(@Param("selectType") String selectType,
                                             @Param("startDate") String startDate, @Param("endDate") String endDate,
                                             @Param("patientClassification") int patientClassification,
                                             @Param("diagnosisTreatment") int diagnosisTreatment,
                                             @Param("outcomeIndicator") int outcomeIndicator,
                                             @Param("hospitalList") List<Integer> hospitalList,
                                             @Param("table") String table, @Param("hasCid") int hasCid,
                                             @Param("allFields") List<String> allFields);

    /**
     * 获取 专题导出 畸形系统 数据
     * @param id 畸形系统 ID
     * @return 畸形系统 数据
     */
    String deformitySystemQry(int id);

    /**
     * 获取 专题导出 畸形类型 数据
     * @param id 畸形类型 ID
     * @return 畸形类型 数据
     */
    String deformityTypeQry(int id);

    /**
     * 获取 专题导出 死因分类 数据
     * @param id 死因分类 ID
     * @return 死因分类 数据
     */
    String deathCauseClassificationQry(int id);

    /**
     * 获取 专题导出 死因诊断 数据
     * @param id 死因诊断 ID
     * @return 死因诊断 数据
     */
    String deathCauseDiagnosisQry(int id);
}