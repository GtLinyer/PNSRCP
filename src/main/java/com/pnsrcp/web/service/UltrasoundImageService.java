package com.pnsrcp.web.service;

import com.pnsrcp.web.entity.perintalPlatform.basicDatabaseNS.BDNSTreatmentDiagnosis;
import com.pnsrcp.web.entity.perintalPlatform.ultrasoundImage.UIBrainUltrasound;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

/**
 * @Project: 围产新生儿科研合作平台
 * @Author: Linyer
 * @Email: linyer@linyer.cn
 * @Date: 2022/07/07 16:18 星期四
 * @Description: 围产新生儿科研合作平台 超声影像库 服务层 接口
 */
public interface UltrasoundImageService {
    // 超声影像库 颅脑超声 上传超声图片
    String uiBuUploadImg(String num, String index, MultipartFile imageFile, int childId);

    // 根据 患儿ID和母亲ID 获取 基础数据库 神经系统
    BDNSTreatmentDiagnosis getUiTreatmentDiagnosis(int childId, int motherId);

    // 根据 患儿ID和母亲ID 获取 超声影像库 颅脑超声 超声检查 记录
    String getUiUltrasonographyNumber(int childId, int motherId);

    // 根据 患儿ID和母亲ID 获取 超声影像库 颅脑超声 超声检查
    List<UIBrainUltrasound> getUiBrainUltrasound(int childId, int motherId);

    // 保存 超声影像库 颅脑超声 页面 数据
    String saveUIBU(BDNSTreatmentDiagnosis bdnsTreatmentDiagnosis, String ultrasonographyNumber, String buArray, int childId, int motherId);
}