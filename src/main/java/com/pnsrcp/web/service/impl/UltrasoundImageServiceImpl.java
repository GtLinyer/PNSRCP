package com.pnsrcp.web.service.impl;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.pnsrcp.web.dao.basicDatabaseNS.BDNsTdMapper;
import com.pnsrcp.web.dao.UltrasoundImageMapper;
import com.pnsrcp.web.entity.perintalPlatform.basicDatabaseNS.BDNSTreatmentDiagnosis;
import com.pnsrcp.web.entity.perintalPlatform.ultrasoundImage.UIBrainUltrasound;
import com.pnsrcp.web.service.UltrasoundImageService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.annotation.Resource;
import javax.imageio.stream.FileImageOutputStream;
import java.io.File;
import java.io.IOException;
import java.util.List;

/**
 * @Project: 围产新生儿科研合作平台
 * @Author: Linyer
 * @Email: linyer@linyer.cn
 * @Date: 2022/07/07 16:18 星期四
 * @Description: 围产新生儿科研合作平台 超声影像库 服务层 实现类
 */
@Service
public class UltrasoundImageServiceImpl implements UltrasoundImageService {
    // 服务层 注入
    @Resource
    private BDNsTdMapper bdNsTdMapper;
    // 数据层 注入
    @Resource
    private UltrasoundImageMapper ultrasoundImageMapper;

    // 超声影像 存储路径
    @Value("${com.perinatalcloud.ultrasound_images_path}")
    private String ultrasoundImagesPath;
    @Value("${com.perinatalcloud.ultrasound_images_url}")
    private String ultrasoundImagesUrl;

    @Override
    public String uiBuUploadImg(String num, String index, MultipartFile imageFile, int childId) {
        JSONObject json = new JSONObject();
        json.put("code", 1);
        if(!imageFile.isEmpty()){
            String fileName = childId + "_ui_bu_" + num + "_" + index; // 图片名

            // 图片 保存路径
            String dirPath =  ultrasoundImagesPath + childId + "/" + fileName;
            File dest = new File(dirPath);
            if (!dest.getParentFile().exists()) {
                dest.getParentFile().mkdirs();
            }

            try {
                byte[] imgByte = imageFile.getBytes();
                FileImageOutputStream imageOutput = new FileImageOutputStream(dest);
                imageOutput.write(imgByte, 0, imgByte.length); // 将byte写入硬盘
                imageOutput.close();
                String url = ultrasoundImagesUrl + childId + "/" + fileName;
                json.put("code", 0);
                json.put("url", url);
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
        return json.toJSONString();
    }

    @Override
    public BDNSTreatmentDiagnosis getUiTreatmentDiagnosis(int childId, int motherId) {
        QueryWrapper<BDNSTreatmentDiagnosis> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("cid", childId);
        queryWrapper.eq("mid", motherId);
        return bdNsTdMapper.selectOne(queryWrapper);
    }

    @Override
    public String getUiUltrasonographyNumber(int childId, int motherId) {
        return ultrasoundImageMapper.uiUltrasonographyNumberQry(childId, motherId);
    }

    @Override
    public List<UIBrainUltrasound> getUiBrainUltrasound(int childId, int motherId) {
        return ultrasoundImageMapper.uiBrainUltrasoundQry(childId, motherId);
    }

    @Override
    public String saveUIBU(BDNSTreatmentDiagnosis bdnsTreatmentDiagnosis, String ultrasonographyNumber, String buArrayInput, int childId, int motherId) {
        JSONObject json = new JSONObject();
        bdnsTreatmentDiagnosis.setCid(childId);
        bdnsTreatmentDiagnosis.setMid(motherId);
        json.put("code", 1);
        if (bdNsTdMapper.insertOrUpdate(bdnsTreatmentDiagnosis) == 0) {
            json.put("code", 0);
        }
        if (ultrasoundImageMapper.uiUltrasonographyNumberInsertUpdate(ultrasonographyNumber, childId, motherId) == 0) {
            json.put("code", 0);
        }

        if (buArrayInput != null) {
            JSONArray buArray = JSONArray.parseArray(buArrayInput);
            ultrasoundImageMapper.uiBrainUltrasoundDelete(childId, motherId);
            for (int i = 0; i < buArray.size(); i++) {
                JSONObject bu = buArray.getJSONObject(i);
                UIBrainUltrasound uiBrainUltrasound = bu.toJavaObject(UIBrainUltrasound.class);
                uiBrainUltrasound.setCid(childId);
                uiBrainUltrasound.setMid(motherId);
                if (ultrasoundImageMapper.uiBrainUltrasoundInsert(uiBrainUltrasound) == 0) {
                    json.put("code", 0);
                }
            }
        }
        return json.toJSONString();
    }
}
