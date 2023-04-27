package com.pnsrcp.web.dao.basicDatabase;

import com.pnsrcp.web.entity.patientCase.BDCaseMsg;
import com.pnsrcp.web.entity.perintalPlatform.BDBaseInformation;
import com.pnsrcp.web.entity.perintalPlatform.CaseStatus;
import com.pnsrcp.web.entity.perintalPlatform.Review;
import com.pnsrcp.web.entity.perintalPlatform.basicDatabse.*;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.Date;
import java.util.List;
import java.util.Map;

/**
 * @Project: 围产新生儿科研合作平台
 * @Author: Linyer
 * @Email: linyer@linyer.cn
 * @Date: 2021/8/5 14:53 星期四
 * @Description: 基础数据库 数据层
 */
@Mapper
public interface BasicDatabaseMapper {
    /**
     * 查询 基础数据库 病例基本信息 数据
     * @param page 页面
     * @param limit 限制
     * @param selectType 选择类型
     * @param startDate 入院时间开始
     * @param endDate 入院时间结束
     * @param caseStatus 病例填写状态
     * @param inHospital 是否在院
     * @param hospitalId 医院ID
     * @param hospitalList 医院ID列表
     * @param searchKey 搜索关键字
     * @return 改变的行数
     */
    List<BDCaseMsg> caseQry(@Param("page") int page, @Param("limit") int limit, @Param("selectType") String selectType,
                            @Param("startDate") Date startDate, @Param("endDate") Date endDate,
                            @Param("caseStatus") int caseStatus, @Param("inHospital") int inHospital,
                            @Param("hospitalId") int hospitalId, @Param("hospitalList") List<Integer> hospitalList,
                            @Param("searchKey") String searchKey);

    /**
     * 查询 基础数据库 病例基本信息 数量
     * @param startDate 入院时间开始
     * @param endDate 入院时间结束
     * @param selectType 选择类型
     * @param caseStatus 病例填写状态
     * @param inHospital 是否在院
     * @param hospitalId 医院ID
     * @param hospitalList 医院ID列表
     * @param searchKey 搜索关键字
     * @return 基础数据库 病例基本信息 数量
     */
    int caseCount(@Param("selectType") String selectType, @Param("startDate") Date startDate, @Param("endDate") Date endDate,
                  @Param("caseStatus") int caseStatus, @Param("inHospital") int inHospital, @Param("hospitalId") int hospitalId,
                  @Param("hospitalList") List<Integer> hospitalList, @Param("searchKey") String searchKey);

    /**
     * 查询 基础数据库 病例 围产新生儿科研合作平台编号 本院最大数值
     * @param hid 医院ID
     * @param hospitalizationYear 住院年份
     * @return 最大ID
     */
    Integer maxNumQry(@Param("hid") int hid, @Param("hospitalizationYear") String hospitalizationYear);

    /**
     * 查询 基础数据库 母亲病例下的患儿病例 数量
     * @param motherId 母亲ID
     * @return 改变的行数
     */
    int caseChildNumQry(@Param("motherId") int motherId);

    /**
     * 删除 基础数据库 患儿病例 信息
     * @param childId 患儿ID
     * @return 改变的行数
     */
    int caseChildDelete(@Param("childId") int childId);

    /**
     * 删除 基础数据库 病例 信息
     * @param motherId 母亲ID
     * @return 改变的行数
     */
    int caseDelete(@Param("motherId") int motherId);

    /**
     * 查询 基础数据库 抬头 基本信息
     * @param motherId 母亲ID
     * @param childId 患儿ID
     * @return 抬头 基本信息
     */
    BDBaseInformation bdBaseInformationQry(@Param("motherId") int motherId, @Param("childId") int childId);

    /**
     * 插入 基础数据库 母亲信息 数据
     * @param bdMotherInformation 基础数据库 母亲信息
     * @param writerId 填写人ID
     * @param hospitalId 医院ID
     * @return 改变的行数
     */
    int bdMotherInformationInsert(@Param("bdMotherInformation") BDMotherInformation bdMotherInformation, @Param("writerId") int writerId, @Param("hospitalId") int hospitalId);

    /**
     * 更新 基础数据库 母亲信息 数据
     * @param bdMotherInformation 基础数据库 母亲信息
     * @return 改变的行数
     */
    int bdMotherInformationUpdate(@Param("bdMotherInformation") BDMotherInformation bdMotherInformation);

    /**
     * 插入/更新 基础数据库 宝宝情况 数据
     * @param bdBabySituation 基础数据库 宝宝情况
     * @return 改变的行数
     */
    int bdBabySituationInsertUpdate(@Param("bdBabySituation") BDBabySituation bdBabySituation);

    /**
     * 更新 基础数据库 宝宝情况 新生儿胎数
     * @param fetusesNum 胎数
     * @param motherId 母亲ID
     * @return 改变的行数
     */
    int bdBSFetusesNumUpdate(@Param("motherId") int motherId, @Param("fetusesNum") int fetusesNum);

    /**
     * 查询 基础数据库 宝宝情况 母亲孩子的ID
     * @param motherId 母亲ID
     * @return 改变的行数
     */
    List<Integer> motherChildIdQry(@Param("motherId") int motherId);

    /**
     * 更新 基础数据库 宝宝情况 母亲孩子的围产新生儿科研合作平台编号
     * @param motherId 母亲ID
     * @param childId 患儿ID
     * @param pcNewBornNum 围产新生儿科研合作平台新生儿编号
     * @return 改变的行数
     */
    int bdBSPcNewBornNumUpdate(@Param("motherId") int motherId, @Param("childId") int childId, @Param("pcNewBornNum") String pcNewBornNum);

    /**
     * 插入 基础数据库 宝宝情况 新的患儿
     * @param bdMotherBabyMsg 新的患儿基本信息
     * @return 改变的行数
     */
    int bdBSChildInsert(@Param("bdMotherBabyMsg") BDMotherBabyMsg bdMotherBabyMsg);

    /**
     * 删除 基础数据库 宝宝情况 多余的病例
     * @param motherId 母亲ID
     * @param pcNewbornNumDel 患儿围产新生儿科研合作平台编号
     * @return 改变的行数
     */
    int bdBSChildDelete(@Param("motherId") int motherId, @Param("pcNewbornNumDel") String pcNewbornNumDel);

    /**
     * 查询 基础数据库 母亲信息 是否存在
     * @param motherFullName 母亲姓名
     * @param motherPhone 母亲手机号
     * @param motherAge 母亲年龄
     * @param motherHospitalNumber 母亲住院号
     * @return 改变的行数
     */
    int bdMotherInformationTestQry(@Param("motherFullName") String motherFullName, @Param("motherPhone") String motherPhone, @Param("motherAge") String motherAge, @Param("motherHospitalNumber") String motherHospitalNumber);

    /**
     * 查询 基础数据库 母亲信息 数据
     * @param motherId 母亲ID
     * @return 母亲信息 数据
     */
    BDMotherInformation bdMotherInformationQry(@Param("motherId") int motherId);

    /**
     * 查询 基础数据库 宝宝情况 数据
     * @param childId 患儿ID
     * @param motherId 母亲ID
     * @return 宝宝情况 数据
     */
    BDBabySituation bdBabySituationQry(@Param("childId") int childId, @Param("motherId") int motherId);

    /**
     * 查询 基础数据库 死因诊断ID和名称
     * @param deathCauseClassificationId 死因分类ID
     * @return 死因诊断ID和名称
     */
    List<Map<String, String>> bdDeathCauseDiagnosisQry(@Param("deathCauseClassificationId") int deathCauseClassificationId);

    /**
     * 查询 基础数据库 畸形类型ID和名称
     * @param deformitySystemId 畸形系统ID
     * @return 畸形类型ID和名称
     */
    List<Map<String, String>> bdDeformityTypeQry(@Param("deformitySystemId") int deformitySystemId);

    /**
     * 查询 基础数据库 孕期信息 母亲孕期体重增加
     * @param motherId 母亲ID
     * @return 母亲孕期体重增加
     */
    String bdWeightGainDuringPregnancyQry(@Param("motherId") int motherId);

    /**
     * 查询 基础数据库 出生相关 初始数据
     * @param childId 患儿ID
     * @param motherId 母亲ID
     * @return 视网膜病 筛查情况 初始数据
     */
    BDBirthMsg bdBirthMsgQry(@Param("childId") int childId, @Param("motherId") int motherId);

    /**
     * 查询 基础数据库 围产情况 分娩日期
     * @param motherId 母亲ID
     * @return 分娩日期
     */
    Date bdDeliveryDateQry(@Param("motherId") int motherId);

    /**
     * 查询 基础数据库 危重评分 初始数据
     * @param childId 患儿ID
     * @param motherId 母亲ID
     * @return 危重评分 初始数据
     */
    BDCAMsg bdCaMsgQry(@Param("childId") int childId, @Param("motherId") int motherId);

    /**
     * 查询 基础数据库 宫外生长迟缓
     * @param childId 患儿ID
     * @param motherId 母亲ID
     * @return 宫外生长迟缓
     */
    String bdEctopicGrowthRetardationQry(@Param("childId") int childId, @Param("motherId") int motherId);

    /**
     * 查询 基础数据库 出生时 体重、头围、身长 数据
     * @param childId 患儿ID
     * @param motherId 母亲ID
     * @return 出生时 体重、头围、身长 数据
     */
    Map<String, Double> bdBirthWHcBlQry(@Param("childId") int childId, @Param("motherId") int motherId);

    /**
     * 查询 基础数据库 绒毛膜羊膜炎
     * @param motherId 母亲ID
     * @return 绒毛膜羊膜炎
     */
    String bdIsChorioamnionitisryQry(@Param("motherId") int motherId);

    /**
     * 更新 基础数据库 病例状态
     * @param childId 患儿ID
     * @param motherId 母亲ID
     * @param status 病例状态
     * @return 改变的行数
     */
    int bdStatusUpdate(@Param("childId") int childId, @Param("motherId") int motherId, @Param("status") int status);

    /**
     * 查询 基础数据库 审核情况
     * @param childId 患儿ID
     * @param motherId 母亲ID
     * @return 审核情况
     */
    List<Review> bdReviewQry(@Param("childId") int childId, @Param("motherId") int motherId);

    /**
     * 查询 基础数据库 病例填写状态
     * @param childId 患儿ID
     * @param motherId 母亲ID
     * @return 填写情况
     */
    CaseStatus bdCaseStatusQry(@Param("childId") int childId, @Param("motherId") int motherId);

    /**
     * 查询 基础数据库 审核次数
     * @param childId 患儿ID
     * @param motherId 母亲ID
     * @return 审核次数
     */
    int bdReviewCount(@Param("childId") int childId, @Param("motherId") int motherId);

    /**
     * 插入 基础数据库 审核信息
     * @param bdReview 审核信息
     * @return 改变的行数
     */
    int bdReviewInsert(@Param("bdReview") Review bdReview);
}
