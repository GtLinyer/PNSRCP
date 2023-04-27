package com.pnsrcp.web.dao;

import com.pnsrcp.web.entity.perintalPlatform.CaseStatus;
import com.pnsrcp.web.entity.perintalPlatform.Review;
import com.pnsrcp.web.entity.perintalPlatform.motherBabySameRoom.MBSRBloodOxygenMonitor;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

/**
 * @Project: 围产新生儿科研合作平台
 * @Author: Linyer
 * @Email: linyer@linyer.cn
 * @Date: 2021/8/21 20:48 星期六
 * @Description: 母婴同室库 数据层
 */
@Mapper
public interface MotherBabySameRoomMapper {
    /**
     * 查询 母婴同室库 血氧监测 数据
     * @param childId 患儿ID
     * @param motherId 母亲ID
     * @return 血氧监测 数据
     */
    MBSRBloodOxygenMonitor mbsrBloodOxygenMonitorQry(@Param("childId") int childId, @Param("motherId") int motherId);

    /**
     * 插入/更新 母婴同室库 血氧监测 数据
     * @param mbsrBloodOxygenMonitor 母婴同室库 血氧监测
     * @param writerId 填写人ID
     * @param hospitalId 医院ID
     * @return 改变的行数
     */
    int mbsrBloodOxygenMonitorInsertUpdate(@Param("mbsrBloodOxygenMonitor") MBSRBloodOxygenMonitor mbsrBloodOxygenMonitor, @Param("writerId") int writerId, @Param("hospitalId") int hospitalId);

    /**
     * 更新 母婴同室库 填写状态
     * @param childId 患儿ID
     * @param motherId 母亲ID
     * @param status 病例填写状态
     * @return 改变的行数
     */
    int mbsrStatusUpdate(@Param("childId") int childId, @Param("motherId") int motherId, @Param("status") int status);

    /**
     * 查询 母婴同室库 填写情况
     * @param childId 患儿ID
     * @param motherId 母亲ID
     * @return 填写情况
     */
    CaseStatus mbsrCaseStatusQry(@Param("childId") int childId, @Param("motherId") int motherId);

    /**
     * 查询 母婴同室库 审核次数
     * @param childId 患儿ID
     * @param motherId 母亲ID
     * @return 审核次数
     */
    int mbsrReviewCount(@Param("childId") int childId, @Param("motherId") int motherId);

    /**
     * 查询 母婴同室库 审核情况
     * @param childId 患儿ID
     * @param motherId 母亲ID
     * @return 审核情况
     */
    List<Review> mbsrReviewQry(@Param("childId") int childId, @Param("motherId") int motherId);

    /**
     * 插入 母婴同室库 审核信息
     * @param mbsrReview 审核信息
     * @return 改变的行数
     */
    int mbsrReviewInsert(@Param("mbsrReview") Review mbsrReview);
}
