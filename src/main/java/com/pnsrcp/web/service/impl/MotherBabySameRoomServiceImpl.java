package com.pnsrcp.web.service.impl;

import com.alibaba.fastjson.JSONObject;
import com.pnsrcp.web.dao.basicDatabase.BasicDatabaseMapper;
import com.pnsrcp.web.dao.MotherBabySameRoomMapper;
import com.pnsrcp.web.entity.perintalPlatform.CaseStatus;
import com.pnsrcp.web.entity.perintalPlatform.Review;
import com.pnsrcp.web.entity.perintalPlatform.motherBabySameRoom.MBSRBloodOxygenMonitor;
import com.pnsrcp.web.service.MotherBabySameRoomService;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.Date;
import java.util.List;

/**
 * @Project: 围产新生儿科研合作平台
 * @Author: Linyer
 * @Email: linyer@linyer.cn
 * @Date: 2021/8/21 20:49 星期六
 * @Description: 围产新生儿科研合作平台 母婴同室库 服务层 实现类
 */
@Service
public class MotherBabySameRoomServiceImpl implements MotherBabySameRoomService {
    // 数据层 注入
    @Resource
    private MotherBabySameRoomMapper motherBabySameRoomMapper;
    @Resource
    private BasicDatabaseMapper basicDatabaseMapper;

    @Override
    public String saveMbsrBOM(MBSRBloodOxygenMonitor mbsrBloodOxygenMonitor, int childId, int motherId, int writerId, int hospitalId) {
        mbsrBloodOxygenMonitor.setCid(childId);
        mbsrBloodOxygenMonitor.setMid(motherId);
        JSONObject json = new JSONObject();
        json.put("code", 0);
        if (motherBabySameRoomMapper.mbsrBloodOxygenMonitorInsertUpdate(mbsrBloodOxygenMonitor, writerId, hospitalId) > 0) {
            motherBabySameRoomMapper.mbsrStatusUpdate(childId, motherId, 1);
            json.put("code", 1);
        }
        return json.toJSONString();
    }

    @Override
    public MBSRBloodOxygenMonitor getMBSRBloodOxygenMonitor(int childId, int motherId) {
        return motherBabySameRoomMapper.mbsrBloodOxygenMonitorQry(childId, motherId);
    }

    @Override
    public Date getChildBirthday(int childId, int motherId) {
        return basicDatabaseMapper.bdBirthMsgQry(childId, motherId).getBirthday();
    }

    @Override
    public CaseStatus getMbsrCaseStatus(int childId, int motherId) {
        return motherBabySameRoomMapper.mbsrCaseStatusQry(childId, motherId);
    }

    @Override
    public int getMbsrReviewCount(int childId, int motherId) {
        return motherBabySameRoomMapper.mbsrReviewCount(childId, motherId);
    }

    @Override
    public List<Review> getMbsrReview(int childId, int motherId) {
        return motherBabySameRoomMapper.mbsrReviewQry(childId, motherId);
    }

    @Override
    public String addMbsrReview(Review mbsrReview) {
        JSONObject json = new JSONObject();
        json.put("code", 0);
        if (motherBabySameRoomMapper.mbsrReviewInsert(mbsrReview) > 0) {
            motherBabySameRoomMapper.mbsrStatusUpdate(mbsrReview.getCid(), mbsrReview.getMid(), mbsrReview.getStatus());
            json.put("code", 1);
        }
        return json.toJSONString();
    }
}
