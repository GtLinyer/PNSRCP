package com.pnsrcp.web.service.impl;

import com.alibaba.fastjson.JSONObject;
import com.pnsrcp.web.dao.ResearchDatabaseMapper;
import com.pnsrcp.web.entity.perintalPlatform.CaseStatus;
import com.pnsrcp.web.entity.perintalPlatform.Review;
import com.pnsrcp.web.entity.perintalPlatform.researchDatabase.RDHqiMsg;
import com.pnsrcp.web.entity.perintalPlatform.researchDatabase.RDHypothermiaQI;
import com.pnsrcp.web.service.ResearchDatabaseService;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;

/**
 * @Project: 围产新生儿科研合作平台
 * @Author: Linyer
 * @Email: linyer@linyer.cn
 * @Date: 2022/05/31 16:49 星期二
 * @Description: 围产新生儿科研合作平台 研究数据库 服务层 实现类
 */
@Service
public class ResearchDatabaseServiceImpl implements ResearchDatabaseService {
    // 数据层 注入
    @Resource
    private ResearchDatabaseMapper researchDatabaseMapper;

    @Override
    public RDHqiMsg getRdHqiMsg(int childIdHB, int motherIdHB) {
        return researchDatabaseMapper.rdHqiMsgQry(childIdHB, motherIdHB);
    }

    @Override
    public String saveRDHQI(RDHypothermiaQI rdHypothermiaQI, int childId, int motherId, int writerId, int hospitalId) {
        rdHypothermiaQI.setCid(childId);
        rdHypothermiaQI.setMid(motherId);
        JSONObject json = new JSONObject();
        json.put("code", 0);
        if (researchDatabaseMapper.rdHypothermiaQIInsertUpdate(rdHypothermiaQI, writerId, hospitalId) > 0) {
            researchDatabaseMapper.rdStatusUpdate(childId, motherId, 1);
            json.put("code", 1);
        }
        return json.toJSONString();
    }

    @Override
    public RDHypothermiaQI getRdHypothermiaQI(int childId, int motherId) {
        return researchDatabaseMapper.rdHypothermiaQIQry(childId, motherId);
    }

    @Override
    public CaseStatus getRdCaseStatus(int childId, int motherId) {
        return researchDatabaseMapper.rdCaseStatusQry(childId, motherId);
    }

    @Override
    public int getRdReviewCount(int childId, int motherId) {
        return researchDatabaseMapper.rdReviewCount(childId, motherId);
    }

    @Override
    public List<Review> getRdReview(int childId, int motherId) {
        return researchDatabaseMapper.rdReviewQry(childId, motherId);
    }

    @Override
    public String addRdReview(Review rdReview, int childId, int motherId) {
        rdReview.setCid(childId);
        rdReview.setMid(motherId);
        JSONObject json = new JSONObject();
        json.put("code", 0);
        if (researchDatabaseMapper.rdReviewInsert(rdReview) > 0) {
            researchDatabaseMapper.rdStatusUpdate(rdReview.getCid(), rdReview.getMid(), rdReview.getStatus());
            json.put("code", 1);
        }
        return json.toJSONString();
    }
}
