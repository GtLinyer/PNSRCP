package com.pnsrcp.web.service;

import com.pnsrcp.web.entity.perintalPlatform.CaseStatus;
import com.pnsrcp.web.entity.perintalPlatform.Review;
import com.pnsrcp.web.entity.perintalPlatform.researchDatabase.RDHqiMsg;
import com.pnsrcp.web.entity.perintalPlatform.researchDatabase.RDHypothermiaQI;

import java.util.List;

/**
 * @Project: 围产新生儿科研合作平台
 * @Author: Linyer
 * @Email: linyer@linyer.cn
 * @Date: 2022/05/31 16:49 星期二
 * @Description: 围产新生儿科研合作平台 研究数据库 服务层 接口
 */
public interface ResearchDatabaseService {
    // 根据 患儿ID和母亲ID 获取 研究数据库 低体温QI 信息
    RDHqiMsg getRdHqiMsg(int childIdHB, int motherIdHB);

    // 保存 研究数据库 低体温QI 页面 数据
    String saveRDHQI(RDHypothermiaQI rdHypothermiaQI, int childId, int motherId, int writerId, int hospitalId);

    // 根据 患儿ID和母亲ID 获取 研究数据库 低体温QI
    RDHypothermiaQI getRdHypothermiaQI(int childId, int motherId);

    // 根据 患儿ID和母亲ID 获取 研究数据库 病例填写情况
    CaseStatus getRdCaseStatus(int childId, int motherId);

    // 根据 患儿ID和母亲ID 获取 研究数据库 审核次数
    int getRdReviewCount(int childId, int motherId);

    // 根据 患儿ID和母亲ID 获取 研究数据库 审核情况
    List<Review> getRdReview(int childId, int motherId);

    // 研究数据库 添加 审核信息
    String addRdReview(Review rdReview, int childId, int motherId);

}
