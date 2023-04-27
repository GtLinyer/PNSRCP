package com.pnsrcp.web.service;

import com.pnsrcp.web.entity.perintalPlatform.CaseStatus;
import com.pnsrcp.web.entity.perintalPlatform.Review;
import com.pnsrcp.web.entity.perintalPlatform.motherBabySameRoom.MBSRBloodOxygenMonitor;

import java.util.Date;
import java.util.List;

/**
 * @Project: 围产新生儿科研合作平台
 * @Author: Linyer
 * @Email: linyer@linyer.cn
 * @Date: 2021/8/21 20:49 星期六
 * @Description: 围产新生儿科研合作平台 母婴同室库 服务层 接口
 */
public interface MotherBabySameRoomService {
    // 保存 母婴同室库 血氧监测 页面 数据
    String saveMbsrBOM(MBSRBloodOxygenMonitor mbsrBloodOxygenMonitor, int childIdBD, int motherIdBD, int writerId, int hospitalId);

    // 根据 患儿ID和母亲ID 获取 母婴同室库 血氧监测
    MBSRBloodOxygenMonitor getMBSRBloodOxygenMonitor(int childIdBD, int motherIdBD);

    // 根据 患儿ID和母亲ID 获取 患儿出生日期
    Date getChildBirthday(int childIdBD, int motherIdBD);

    // 根据 患儿ID和母亲ID 获取 母婴同室库 病例填写情况
    CaseStatus getMbsrCaseStatus(int childIdBD, int motherIdBD);

    // 根据 患儿ID和母亲ID 获取 母婴同室库 审核次数
    int getMbsrReviewCount(int childIdBD, int motherIdBD);

    // 根据 患儿ID和母亲ID 获取 母婴同室库 审核情况
    List<Review> getMbsrReview(int childId, int motherIdBD);

    // 母婴同室库 添加 审核信息
    String addMbsrReview(Review mbsrReview);
}
