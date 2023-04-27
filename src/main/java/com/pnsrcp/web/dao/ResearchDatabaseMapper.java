package com.pnsrcp.web.dao;

import com.pnsrcp.web.entity.perintalPlatform.CaseStatus;
import com.pnsrcp.web.entity.perintalPlatform.Review;
import com.pnsrcp.web.entity.perintalPlatform.researchDatabase.RDHqiMsg;
import com.pnsrcp.web.entity.perintalPlatform.researchDatabase.RDHypothermiaQI;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

/**
 * @Project: 围产新生儿科研合作平台
 * @Author: Linyer
 * @Email: linyer@linyer.cn
 * @Date: 2022/05/31 16:51 星期二
 * @Description: 研究数据库 数据层
 */
@Mapper
public interface ResearchDatabaseMapper {
    /**
     * 查询 研究数据库 低体温QI 初始数据
     * @param childId 患儿ID
     * @param motherId 母亲ID
     * @return 研究数据库 低体温QI 初始数据
     */
    RDHqiMsg rdHqiMsgQry(@Param("childId") int childId, @Param("motherId") int motherId);

    /**
     * 插入/更新 研究数据库 低体温QI
     * @param rdHypothermiaQI 低体温QI
     * @param writerId 填写人ID
     * @param hospitalId 医院ID
     * @return 改变的行数
     */
    int rdHypothermiaQIInsertUpdate(@Param("rdHypothermiaQI") RDHypothermiaQI rdHypothermiaQI, @Param("writerId") int writerId, @Param("hospitalId") int hospitalId);

    /**
     * 查询 研究数据库 感染监测 低体温QI
     * @param childId 患儿ID
     * @param motherId 母亲ID
     * @return 低体温QI 数据
     */
    RDHypothermiaQI rdHypothermiaQIQry(@Param("childId") int childId, @Param("motherId") int motherId);

    /**
     * 更新 研究数据库 填写状态
     * @param childId 患儿ID
     * @param motherId 母亲ID
     * @param status 病例填写状态
     * @return 改变的行数
     */
    int rdStatusUpdate(@Param("childId") int childId, @Param("motherId") int motherId, @Param("status") int status);

    /**
     * 查询 研究数据库 填写情况
     * @param childId 患儿ID
     * @param motherId 母亲ID
     * @return 填写情况
     */
    CaseStatus rdCaseStatusQry(@Param("childId") int childId, @Param("motherId") int motherId);

    /**
     * 查询 研究数据库 审核次数
     * @param childId 患儿ID
     * @param motherId 母亲ID
     * @return 审核次数
     */
    int rdReviewCount(@Param("childId") int childId, @Param("motherId") int motherId);

    /**
     * 查询 研究数据库 审核情况
     * @param childId 患儿ID
     * @param motherId 母亲ID
     * @return 审核情况
     */
    List<Review> rdReviewQry(@Param("childId") int childId, @Param("motherId") int motherId);

    /**
     * 插入 研究数据库 审核信息
     * @param rdReview 审核信息
     * @return 改变的行数
     */
    int rdReviewInsert(@Param("rdReview") Review rdReview);
}
