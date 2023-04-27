package com.pnsrcp.web.dao.doctorPatientCommunication;

import com.pnsrcp.web.entity.perintalPlatform.CaseStatus;
import com.pnsrcp.web.entity.perintalPlatform.Review;
import com.pnsrcp.web.entity.perintalPlatform.doctorPatientCommunication.DPCDoctorPatientCommunication;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

/**
 * @Project: 围产新生儿科研合作平台
 * @Author: Linyer
 * @Email: linyer@linyer.cn
 * @Date: 2022/2/6 12:43 星期日
 * @Description: 医患交流库 数据层
 */
@Mapper
public interface DoctorPatientCommunicationMapper {
    /**
     * 为 医患交流库 查询 消化系统 肠内营养 强化剂种类 数据
     * @param childId 患儿ID
     * @param motherId 母亲ID
     * @return 强化剂种类 数据
     */
    String enhancerTypeQry(@Param("childId") int childId, @Param("motherId") int motherId);

    /**
     * 插入 医患交流库 医患沟通 数据
     * @param text 沟通数据
     * @param isParents 是否家长发送
     * @param childId 患儿ID
     * @param motherId 母亲ID
     * @return 改变的行数
     */
    int dpcDoctorPatientCommunicationInsert(@Param("text") String text, @Param("isParents") int isParents, @Param("childId") int childId, @Param("motherId") int motherId);

    /**
     * 删除 医患交流库 医患沟通 数据
     * @param dcpId 医患沟通数据ID
     * @param isParents 是否家长发送
     * @param childId 患儿ID
     * @param motherId 母亲ID
     * @return 改变的行数
     */
    int dpcDoctorPatientCommunicationDelete(@Param("dcpId") int dcpId, @Param("isParents") int isParents, @Param("childId") int childId, @Param("motherId") int motherId);

    /**
     * 查询 医患交流库 医患沟通 数据
     * @param childId 患儿ID
     * @param motherId 母亲ID
     * @return 医患沟通 数据
     */
    List<DPCDoctorPatientCommunication> dpcDoctorPatientCommunicationQry(@Param("childId") int childId, @Param("motherId") int motherId);

    /**
     * 查询 医患交流库 填写情况
     * @param childId 患儿ID
     * @param motherId 母亲ID
     * @return 填写情况
     */
    CaseStatus dpcCaseStatusQry(@Param("childId") int childId, @Param("motherId") int motherId);

    /**
     * 查询 医患交流库 审核次数
     * @param childId 患儿ID
     * @param motherId 母亲ID
     * @return 审核次数
     */
    int dpcReviewCount(@Param("childId") int childId, @Param("motherId") int motherId);

    /**
     * 查询 医患交流库 审核情况
     * @param childId 患儿ID
     * @param motherId 母亲ID
     * @return 审核情况
     */
    List<Review> dpcReviewQry(@Param("childId") int childId, @Param("motherId") int motherId);

    /**
     * 插入 医患交流库 审核信息
     * @param dpcReview 审核信息
     * @return 改变的行数
     */
    int dpcReviewInsert(@Param("dpcReview") Review dpcReview);

    /**
     * 更新 医患交流库 填写状态
     * @param childId 患儿ID
     * @param motherId 母亲ID
     * @param status 填写状态
     * @return 改变的行数
     */
    int dpcStatusUpdate(@Param("childId") int childId, @Param("motherId") int motherId, @Param("status") int status);
}