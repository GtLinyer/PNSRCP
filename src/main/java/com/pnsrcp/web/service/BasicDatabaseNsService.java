package com.pnsrcp.web.service;

import com.pnsrcp.web.entity.perintalPlatform.basicDatabaseNS.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

/**
 * @Project: 围产新生儿科研合作平台
 * @Author: Linyer
 * @Email: linyer@linyer.cn
 * @Date: 2022/07/19 16:13 星期二
 * @Description: 围产新生儿科研合作平台 基础数据库 神经系统 服务层 接口
 */
public interface BasicDatabaseNsService {
    // 保存 基础数据库 神经系统 超声 页面 数据
    String saveBDNSUS(BDNervousSystemNumber bdNsUltrasonographyNumber, String usArray, int childId, int motherId);

    // 基础数据库 神经系统 超声 上传超声图片
    String bdNsUsUploadImg(String num, String index, MultipartFile imageFile, int childId);

    // 根据 患儿ID和母亲ID 获取 基础数据库 神经系统 超声检查 记录
    BDNervousSystemNumber getBdNsUltrasonographyNumber(int childId, int motherId);

    // 根据 患儿ID和母亲ID 获取 基础数据库 神经系统 超声检查
    List<BDNsUltrasonography> getBdNsUltrasonography(int childId, int motherId);

    // 保存 基础数据库 神经系统 MRI 页面 数据
    String saveBDNSMRI(BDNervousSystemNumber bdNsMriNumber, String mriArray, int childId, int motherId);

    // 基础数据库 神经系统 上传MRI图片
    String bdNsMriUploadImg(String num, String index, MultipartFile imageFile, int childId);

    // 根据 患儿ID和母亲ID 获取 基础数据库 神经系统 MRI检查 记录
    BDNervousSystemNumber getBdNsMriNumber(int childId, int motherId);

    // 根据 患儿ID和母亲ID 获取 基础数据库 神经系统 MRI检查
    List<BDNsMri> getBdNsMri(int childId, int motherId);

    // 保存 基础数据库 神经系统 CT 页面 数据
    String saveBDNSCT(BDNervousSystemNumber bdNsCtNumber, String ctArray, int childId, int motherId);

    // 基础数据库 神经系统 上传CT图片
    String bdNsCtUploadImg(String num, String index, MultipartFile imageFile, int childId);

    // 根据 患儿ID和母亲ID 获取 基础数据库 神经系统 CT检查 记录
    BDNervousSystemNumber getBdNsCtNumber(int childId, int motherId);

    // 根据 患儿ID和母亲ID 获取 基础数据库 神经系统 CT检查
    List<BDNsCt> getBdNsCt(int childId, int motherId);

    // 保存 基础数据库 神经系统 脑电图 页面 数据
    String saveBDNSEEG(BDNervousSystemNumber bdNsEegNumber, String eegArray, int childId, int motherId);

    // 根据 患儿ID和母亲ID 获取 基础数据库 神经系统 脑电图检查 记录
    BDNervousSystemNumber getBdNsEegNumber(int childId, int motherId);

    // 根据 患儿ID和母亲ID 获取 基础数据库 神经系统 脑电图检查
    List<BDNsEeg> getBdNsEeg(int childId, int motherId);

    // 保存 基础数据库 神经系统 辅助检查 页面 数据
    String saveBDNSAE(BDNSAuxiliaryExamination bdNsAuxiliaryExamination, int childId, int motherId);

    // 根据 患儿ID和母亲ID 获取 神经系统 辅助检查
    BDNSAuxiliaryExamination getBdNsAuxiliaryExamination(int childId, int motherId);

    // 保存 基础数据库 神经系统 治疗及诊断 页面 数据
    String saveBDNSTD(BDNSTreatmentDiagnosis bdNsTreatmentDiagnosis, int childId, int motherId);

    // 根据 患儿ID和母亲ID 获取 神经系统 治疗及诊断
    BDNSTreatmentDiagnosis getBdNsTreatmentDiagnosis(int childId, int motherId);
}
