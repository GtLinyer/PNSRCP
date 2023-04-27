package com.pnsrcp.web.service;

import com.pnsrcp.web.entity.perintalPlatform.CaseStatus;
import com.pnsrcp.web.entity.perintalPlatform.Review;
import com.pnsrcp.web.entity.perintalPlatform.parentalPsychology.PPPoEpds;
import com.pnsrcp.web.entity.perintalPlatform.parentalPsychology.PPPoSasOrSds;
import com.pnsrcp.web.entity.perintalPlatform.parentalPsychology.PPPrEpds;
import com.pnsrcp.web.entity.perintalPlatform.parentalPsychology.PPPrSasOrSds;

import java.util.Date;
import java.util.List;

/**
 * @Project: 围产新生儿科研合作平台
 * @Author: Linyer
 * @Email: linyer@linyer.cn
 * @Date: 2021/8/24 18:19 星期二
 * @Description: 围产新生儿科研合作平台 父母心理库 服务层 接口
 */
public interface ParentalPsychologyService {
    // 保存 父母心理库 预产期 数据
    String saveEdd(int motherId, String expectedDeliveryDate);

    // 获取 父母心理库 预产期
    Date getEdd(int motherId);

    // 根据 母亲ID 获取 父母心理库 产前心理 EPDS评估
    List<PPPrEpds> getPpPrEpds(int motherId);

    // 保存 父母心理库 产前心理 EPDS评估
    String savePpPrEpds(PPPrEpds ppPrEpds, int motherId);

    // 根据ID 删除 父母心理库 产前心理 EPDS评估
    String deletePpPrEpds(int id);

    // 根据 母亲ID 获取 父母心理库 产前心理 EPDS评估 次数
    int getPrEpdsEvaluationsNumber(int motherId);

    // 根据 母亲ID 获取 父母心理库 产前心理 SAS评估
    List<PPPrSasOrSds> getPpPrSas(int motherId);

    // 保存 父母心理库 产前心理 SAS评估
    String savePpPrSas(PPPrSasOrSds ppPrSas, int motherId);

    // 根据ID 删除 父母心理库 产前心理 SAS评估
    String deletePpPrSas(int id);

    // 根据 母亲ID 获取 父母心理库 产前心理 SDS评估 次数
    int getPrSasEvaluationsNumber(int motherId);

    // 根据 母亲ID 获取 父母心理库 产前心理 SDS评估
    List<PPPrSasOrSds> getPpPrSds(int motherId);

    // 保存 父母心理库 产前心理 SDS评估
    String savePpPrSds(PPPrSasOrSds ppPrSds, int motherId);

    // 根据ID 删除 父母心理库 产前心理 SDS评估
    String deletePpPrSds(int id);

    // 根据 母亲ID 获取 父母心理库 产前心理 SDS评估 次数
    int getPrSdsEvaluationsNumber(int motherId);

    // 保存 父母心理库 出生日期 数据
    String saveBirthday(int motherId, String birthday);

    // 获取 父母心理库 出生日期
    Date getBirthday(int motherId);

    // 根据 母亲ID 获取 父母心理库 产后心理 EPDS评估
    List<PPPoEpds> getPpPoEpds(int motherId);

    // 保存 父母心理库 产后心理 EPDS评估
    String savePpPoEpds(PPPoEpds ppPoEpds, int motherId);

    // 根据ID 删除 父母心理库 产后心理 EPDS评估
    String deletePpPoEpds(int id);

    // 根据 母亲ID 获取 父母心理库 产后心理 EPDS评估 次数
    int getPoEpdsEvaluationsNumber(int motherId);

    // 根据 母亲ID 获取 父母心理库 产后心理 SAS评估
    List<PPPoSasOrSds> getPpPoSas(int motherId);

    // 保存 父母心理库 产后心理 SAS评估
    String savePpPoSas(PPPoSasOrSds ppPoSas, int motherId);

    // 根据ID 删除 父母心理库 产后心理 SAS评估
    String deletePpPoSas(int id);

    // 根据 母亲ID 获取 父母心理库 产后心理 SAS评估 次数
    int getPoSasEvaluationsNumber(int motherId);

    // 根据 母亲ID 获取 父母心理库 产后心理 SDS评估
    List<PPPoSasOrSds> getPpPoSds(int motherId);

    // 保存 父母心理库 产后心理 SDS评估
    String savePpPoSds(PPPoSasOrSds ppPoSds, int motherId);

    // 根据ID 删除 父母心理库 产后心理 SDS评估
    String deletePpPoSds(int id);

    // 根据 母亲ID 获取 父母心理库 产后心理 SDS评估 次数
    int getPoSdsEvaluationsNumber(int motherId);

    // 根据 患儿ID和母亲ID 获取 父母心理库 病例填写情况
    CaseStatus getPpCaseStatus(int motherIdBD);

    // 根据 患儿ID和母亲ID 获取 父母心理库 审核次数
    int getPpReviewCount(int motherIdBD);

    // 根据 患儿ID和母亲ID 获取 父母心理库 审核情况
    List<Review> getPpReview(int motherIdBD);

    // 母婴同室库 添加 审核信息
    String addPpReview(Review bdReview);
}
