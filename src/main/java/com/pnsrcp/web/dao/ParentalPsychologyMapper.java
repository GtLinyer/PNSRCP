package com.pnsrcp.web.dao;

import com.pnsrcp.web.entity.perintalPlatform.CaseStatus;
import com.pnsrcp.web.entity.perintalPlatform.Review;
import com.pnsrcp.web.entity.perintalPlatform.parentalPsychology.PPPoEpds;
import com.pnsrcp.web.entity.perintalPlatform.parentalPsychology.PPPoSasOrSds;
import com.pnsrcp.web.entity.perintalPlatform.parentalPsychology.PPPrEpds;
import com.pnsrcp.web.entity.perintalPlatform.parentalPsychology.PPPrSasOrSds;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.Date;
import java.util.List;

/**
 * @Project: 围产新生儿科研合作平台
 * @Author: Linyer
 * @Email: linyer@linyer.cn
 * @Date: 2021/8/25 15:33 星期三
 * @Description: 父母心理库 数据层
 */
@Mapper
public interface ParentalPsychologyMapper {
    /**
     * 插入/更新 父母心理库 预产期
     * @param motherId 母亲ID
     * @param expectedDeliveryDate 预产期
     * @return 改变的行数
     */
    int ppExpectedDeliveryDateInsertUpdate(@Param("motherId") int motherId, @Param("expectedDeliveryDate") Date expectedDeliveryDate);

    /**
     * 查询 父母心理库 预产期
     * @param motherId 母亲ID
     * @return 预产期
     */
    Date ppExpectedDeliveryDateQry(@Param("motherId") int motherId);

    /**
     * 查询 父母心理库 产前心理 EPDS评估 数据
     * @param motherId 母亲ID
     * @return EPDS评估 数据
     */
    List<PPPrEpds> ppPrEpdsQry(@Param("motherId") int motherId);

    /**
     * 插入/更新 父母心理库 产前心理 EPDS评估
     * @param ppPrEpds EPDS评估
     * @return 改变的行数
     */
    int ppPrEpdsInsertUpdate(@Param("ppPrEpds") PPPrEpds ppPrEpds);

    /**
     * 查询 父母心理库 产前心理 EPDS评估 次数
     * @param motherId 母亲ID
     * @return 改变的行数
     */
    int ppPrEpdsEvaluationsNumberQry(@Param("motherId") int motherId);

    /**
     * 删除 父母心理库 产前心理 EPDS评估
     * @param id EPDS评估id
     * @return 改变的行数
     */
    int ppPrEpdsDelete(@Param("id") int id);

    /**
     * 查询 父母心理库 产前心理 SAS评估 数据
     * @param motherId 母亲ID
     * @return SAS评估 数据
     */
    List<PPPrSasOrSds> ppPrSasQry(@Param("motherId") int motherId);

    /**
     * 查询 父母心理库 产前心理 SAS评估 次数
     * @param motherId 母亲ID
     * @return 改变的行数
     */
    int ppPrSasEvaluationsNumberQry(@Param("motherId") int motherId);

    /**
     * 插入/更新 父母心理库 产前心理 SAS评估
     * @param ppPrSas SAS评估
     * @return 改变的行数
     */
    int ppPrSasInsertUpdate(@Param("ppPrSas") PPPrSasOrSds ppPrSas);

    /**
     * 删除 父母心理库 产前心理 SAS评估
     * @param id SAS评估id
     * @return 改变的行数
     */
    int ppPrSasDelete(@Param("id") int id);

    /**
     * 查询 父母心理库 产前心理 SDS评估 数据
     * @param motherId 母亲ID
     * @return SDS评估 数据
     */
    List<PPPrSasOrSds> ppPrSdsQry(@Param("motherId") int motherId);

    /**
     * 查询 父母心理库 产前心理 SDS评估 次数
     * @param motherId 母亲ID
     * @return 改变的行数
     */
    int ppPrSdsEvaluationsNumberQry(@Param("motherId") int motherId);

    /**
     * 插入/更新 父母心理库 产前心理 SDS评估
     * @param ppPrSds SDS评估
     * @return 改变的行数
     */
    int ppPrSdsInsertUpdate(@Param("ppPrSds") PPPrSasOrSds ppPrSds);

    /**
     * 删除 父母心理库 产前心理 SDS评估
     * @param id SDS评估id
     * @return 改变的行数
     */
    int ppPrSdsDelete(@Param("id") int id);

    /**
     * 插入/更新 父母心理库 预产期
     * @param motherId 母亲ID
     * @param birthday 出生日期
     * @return 改变的行数
     */
    int poBirthdayInsertUpdate(@Param("motherId") int motherId, @Param("birthday") Date birthday);

    /**
     * 查询 父母心理库 出生日期
     * @param motherId 母亲ID
     * @return 出生日期
     */
    Date poBirthdayQry(@Param("motherId") int motherId);

    /**
     * 查询 父母心理库 产后心理 EPDS评估 数据
     * @param motherId 母亲ID
     * @return EPDS评估 数据
     */
    List<PPPoEpds> ppPoEpdsQry(@Param("motherId") int motherId);

    /**
     * 插入/更新 父母心理库 产后心理 EPDS评估
     * @param ppPoEpds EPDS评估
     * @return 改变的行数
     */
    int ppPoEpdsInsertUpdate(@Param("ppPoEpds") PPPoEpds ppPoEpds);

    /**
     * 查询 父母心理库 产后心理 EPDS评估 次数
     * @param motherId 母亲ID
     * @return 改变的行数
     */
    int ppPoEpdsEvaluationsNumberQry(@Param("motherId") int motherId);

    /**
     * 删除 父母心理库 产后心理 EPDS评估
     * @param id EPDS评估id
     * @return 改变的行数
     */
    int ppPoEpdsDelete(@Param("id") int id);

    /**
     * 查询 父母心理库 产后心理 SAS评估 数据
     * @param motherId 母亲ID
     * @return SAS评估 数据
     */
    List<PPPoSasOrSds> ppPoSasQry(@Param("motherId") int motherId);

    /**
     * 插入/更新 父母心理库 产后心理 SAS评估
     * @param ppPoSas SAS评估
     * @return 改变的行数
     */
    int ppPoSasInsertUpdate(@Param("ppPoSas") PPPoSasOrSds ppPoSas);

    /**
     * 查询 父母心理库 产后心理 SAS评估 次数
     * @param motherId 母亲ID
     * @return 改变的行数
     */
    int ppPoSasEvaluationsNumberQry(@Param("motherId") int motherId);

    /**
     * 删除 父母心理库 产后心理 SAS评估
     * @param id SAS评估id
     * @return 改变的行数
     */
    int ppPoSasDelete(@Param("id") int id);
    /**
     * 查询 父母心理库 产后心理 SDS评估 数据
     * @param motherId 母亲ID
     * @return SDS评估 数据
     */
    List<PPPoSasOrSds> ppPoSdsQry(@Param("motherId") int motherId);

    /**
     * 插入/更新 父母心理库 产后心理 SDS评估
     * @param ppPoSds SDS评估
     * @return 改变的行数
     */
    int ppPoSdsInsertUpdate(@Param("ppPoSds") PPPoSasOrSds ppPoSds);

    /**
     * 查询 父母心理库 产后心理 SDS评估 次数
     * @param motherId 母亲ID
     * @return 改变的行数
     */
    int ppPoSdsEvaluationsNumberQry(@Param("motherId") int motherId);

    /**
     * 删除 父母心理库 产后心理 SDS评估
     * @param id SDS评估id
     * @return 改变的行数
     */
    int ppPoSdsDelete(@Param("id") int id);

    /**
     * 查询 父母心理库 病例填写状态
     * @param motherId 母亲ID
     * @return 改变的行数
     */
    CaseStatus ppCaseStatusQry(@Param("motherId") int motherId);

    /**
     * 查询 父母心理库 审核次数
     * @param motherId 母亲ID
     * @return 改变的行数
     */
    int ppReviewCount(@Param("motherId") int motherId);

    /**
     * 查询 父母心理库 审核情况
     * @param motherId 母亲ID
     * @return 改变的行数
     */
    List<Review> ppReviewQry(@Param("motherId") int motherId);

    /**
     * 插入 父母心理库 审核情况
     * @param ppReview 审核情况
     * @return 改变的行数
     */
    int ppReviewInsert(@Param("ppReview") Review ppReview);

    /**
     * 更新 父母心理库 填写状态
     * @param motherId 母亲ID
     * @param status 填写状态
     * @return 改变的行数
     */
    int ppStatusUpdate(@Param("motherId") int motherId, @Param("status") int status);
}
