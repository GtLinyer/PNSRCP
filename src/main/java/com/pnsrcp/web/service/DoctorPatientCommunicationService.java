package com.pnsrcp.web.service;

import com.pnsrcp.web.entity.perintalPlatform.CaseStatus;
import com.pnsrcp.web.entity.perintalPlatform.Review;
import com.pnsrcp.web.entity.perintalPlatform.basicDatabse.BDBirthMsg;
import com.pnsrcp.web.entity.perintalPlatform.basicDatabaseDGS.BDDGSGrowthIndex;
import com.pnsrcp.web.entity.perintalPlatform.doctorPatientCommunication.DPCBmdPumping;
import com.pnsrcp.web.entity.perintalPlatform.doctorPatientCommunication.DPCBreastMilkDiary;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

/**
 * @Project: 围产新生儿科研合作平台
 * @Author: Linyer
 * @Email: linyer@linyer.cn
 * @Date: 2022/2/2 21:20 星期三
 * @Description: 围产新生儿科研合作平台 医患交流库 服务层 接口
 */
public interface DoctorPatientCommunicationService {
    // 根据 患儿ID和母亲ID 获取 出生相关 初始数据
    BDBirthMsg getDpcBirthMsg(int childId, int motherId);

    // 保存 医患交流库 母乳日志 页面 数据
    String saveDPCBMD(DPCBreastMilkDiary dpcBreastMilkDiary, String pumpingArray, int childId, int motherId);

    // 根据 泵奶ID 以及 患儿ID和母亲ID 删除 泵奶
    String deletePumping(int pumpingId, int motherId);

    // 根据 患儿ID和母亲ID 获取 母乳日志
    DPCBreastMilkDiary getDpcBreastMilkDiary(int childId, int motherId);

    // 根据 母亲ID 获取 母乳日志 泵奶
    List<DPCBmdPumping> getDpcBmdPumping(int motherId);

    // 根据 患儿ID和母亲ID 获取 生长曲线 生长指标
    BDDGSGrowthIndex getDpcGrowthCurve(int childId, int motherId);

    // 保存 医患交流库 生长曲线 生长指标 页面 数据
    String saveDPCGC(String wHcBlArray, int childId, int motherId);

    // 根据 患儿ID和母亲ID 获取 母乳强化 强化剂种类
    String getEnhancerType(int childId, int motherId);

    // 医患交流 上传图片
    String dpcUploadImg(MultipartFile imageFile, int childId);

    // 医患交流 上传视频
    String dpcUploadVideo(MultipartFile videoFile, int childId);

    // 根据 患儿ID和母亲ID 获取 医患沟通 数据
    String getDoctorPatientCommunication(int childId, int motherId);

    // 根据 医患沟通数据ID 以及 患儿ID和母亲ID 删除 医患沟通数据
    String deleteDoctorPatientCommunication(int dcpId, int childId, int motherId);

    // 保存 医患交流库 医患沟通 页面 数据
    String saveDPCDPC(String text, int childId, int motherId);

    // 根据 患儿ID和母亲ID 获取 医患交流库 病例填写情况
    CaseStatus getDpcCaseStatus(int childId, int motherId);

    // 根据 患儿ID和母亲ID 获取 医患交流库 审核次数
    int getDpcReviewCount(int childId, int motherId);

    // 根据 患儿ID和母亲ID 获取 医患交流库 审核情况
    List<Review> getDpcReview(int childId, int motherIdBD);

    // 医患交流库 添加 审核信息
    String addDpcReview(Review dpcReview, int childId, int motherId);
}
