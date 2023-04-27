package com.pnsrcp.web.service.impl;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.pnsrcp.web.dao.basicDatabaseNS.*;
import com.pnsrcp.web.entity.perintalPlatform.basicDatabaseNS.*;
import com.pnsrcp.web.service.BasicDatabaseNsService;
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
 * @Date: 2022/07/19 16:16 星期二
 * @Description: 围产新生儿科研合作平台 基础数据库 神经系统 服务层 实现类
 */
@Service
public class BasicDatabaseNsServiceImpl implements BasicDatabaseNsService {
    // 数据层 注入
    @Resource
    private BasicDatabaseNsMapper basicDatabaseNsMapper;
    @Resource
    private BDNsUsMapper bdNsUsMapper;
    @Resource
    private BDNsMrMapper bdNsMrMapper;
    @Resource
    private BDNsCtMapper bdNsCtMapper;
    @Resource
    private BDNsEegMapper bdNsEegMapper;
    @Resource
    private BDNsAeMapper bdNsAeMapper;
    @Resource
    private BDNsTdMapper bdNsTdMapper;

    // 超声影像 存储路径
    @Value("${com.perinatalcloud.us_images_path}")
    private String usImagesPath;
    @Value("${com.perinatalcloud.us_images_url}")
    private String usImagesUrl;
    // MRI影像 存储路径
    @Value("${com.perinatalcloud.mri_images_path}")
    private String mriImagesPath;
    @Value("${com.perinatalcloud.mri_images_url}")
    private String mriImagesUrl;
    // CT影像 存储路径
    @Value("${com.perinatalcloud.ct_images_path}")
    private String ctImagesPath;
    @Value("${com.perinatalcloud.ct_images_url}")
    private String ctImagesUrl;

    @Override
    public String saveBDNSUS(BDNervousSystemNumber bdNsUltrasonographyNumber, String usArrayInput, int childId, int motherId) {
        JSONObject json = new JSONObject();
        bdNsUltrasonographyNumber.setCid(childId);
        bdNsUltrasonographyNumber.setMid(motherId);
        json.put("code", 1);
        if (basicDatabaseNsMapper.bdNsUltrasonographyNumberInsertUpdate(bdNsUltrasonographyNumber) == 0) {
            json.put("code", 0);
        }

        if (usArrayInput != null) {
            JSONArray usArray = JSONArray.parseArray(usArrayInput);
            QueryWrapper<BDNsUltrasonography> deleteWrapper = new QueryWrapper<>();
            deleteWrapper.eq("cid", childId);
            deleteWrapper.eq("mid", motherId);
            bdNsUsMapper.delete(deleteWrapper);
            for (int i = 0; i < usArray.size(); i++) {
                JSONObject us = usArray.getJSONObject(i);
                BDNsUltrasonography bdNsUltrasonography = us.toJavaObject(BDNsUltrasonography.class);
                bdNsUltrasonography.setCid(childId);
                bdNsUltrasonography.setMid(motherId);
                if (bdNsUsMapper.insert(bdNsUltrasonography) == 0) {
                    json.put("code", 0);
                }
            }
        }
        return json.toJSONString();
    }

    @Override
    public String bdNsUsUploadImg(String num, String index, MultipartFile imageFile, int childId) {
        JSONObject json = new JSONObject();
        json.put("code", 1);
        if(!imageFile.isEmpty()){
            String fileName = childId + "_bd_ns_us_" + index + "_" + num; // 图片名

            // 图片 保存路径
            String dirPath =  usImagesPath + childId + "/" + fileName;
            File dest = new File(dirPath);
            if (!dest.getParentFile().exists()) {
                dest.getParentFile().mkdirs();
            }

            try {
                byte[] imgByte = imageFile.getBytes();
                FileImageOutputStream imageOutput = new FileImageOutputStream(dest);
                imageOutput.write(imgByte, 0, imgByte.length); // 将byte写入硬盘
                imageOutput.close();
                String url = usImagesUrl + childId + "/" + fileName;
                json.put("code", 0);
                json.put("url", url);
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
        return json.toJSONString();
    }

    @Override
    public BDNervousSystemNumber getBdNsUltrasonographyNumber(int childId, int motherId) {
        return basicDatabaseNsMapper.bdNsUltrasonographyNumberQry(childId, motherId);
    }

    @Override
    public List<BDNsUltrasonography> getBdNsUltrasonography(int childId, int motherId) {
        QueryWrapper<BDNsUltrasonography> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("cid", childId);
        queryWrapper.eq("mid", motherId);
        return bdNsUsMapper.selectList(queryWrapper);
    }

    @Override
    public String saveBDNSMRI(BDNervousSystemNumber bdNsMriNumber, String mriArrayInput, int childId, int motherId) {
        JSONObject json = new JSONObject();
        bdNsMriNumber.setCid(childId);
        bdNsMriNumber.setMid(motherId);
        json.put("code", 1);
        if (basicDatabaseNsMapper.bdNsMriNumberInsertUpdate(bdNsMriNumber) == 0) {
            json.put("code", 0);
        }

        if (mriArrayInput != null) {
            JSONArray mriArray = JSONArray.parseArray(mriArrayInput);
            QueryWrapper<BDNsMri> deleteWrapper = new QueryWrapper<>();
            deleteWrapper.eq("cid", childId);
            deleteWrapper.eq("mid", motherId);
            bdNsMrMapper.delete(deleteWrapper);
            for (int i = 0; i < mriArray.size(); i++) {
                JSONObject mri = mriArray.getJSONObject(i);
                BDNsMri bdNsMri = mri.toJavaObject(BDNsMri.class);
                bdNsMri.setCid(childId);
                bdNsMri.setMid(motherId);
                if (bdNsMrMapper.insert(bdNsMri) == 0) {
                    json.put("code", 0);
                }
            }
        }
        return json.toJSONString();
    }

    @Override
    public String bdNsMriUploadImg(String num, String index, MultipartFile imageFile, int childId) {
        JSONObject json = new JSONObject();
        json.put("code", 1);
        if(!imageFile.isEmpty()){
            String fileName = childId + "_bd_ns_mri_" + index + "_" + num; // 图片名

            // 图片 保存路径
            String dirPath =  mriImagesPath + childId + "/" + fileName;
            File dest = new File(dirPath);
            if (!dest.getParentFile().exists()) {
                dest.getParentFile().mkdirs();
            }

            try {
                byte[] imgByte = imageFile.getBytes();
                FileImageOutputStream imageOutput = new FileImageOutputStream(dest);
                imageOutput.write(imgByte, 0, imgByte.length); // 将byte写入硬盘
                imageOutput.close();
                String url = mriImagesUrl + childId + "/" + fileName;
                json.put("code", 0);
                json.put("url", url);
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
        return json.toJSONString();
    }

    @Override
    public BDNervousSystemNumber getBdNsMriNumber(int childId, int motherId) {
        return basicDatabaseNsMapper.bdNsMriNumberQry(childId, motherId);
    }

    @Override
    public List<BDNsMri> getBdNsMri(int childId, int motherId) {
        QueryWrapper<BDNsMri> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("cid", childId);
        queryWrapper.eq("mid", motherId);
        return bdNsMrMapper.selectList(queryWrapper);
    }

    @Override
    public String saveBDNSCT(BDNervousSystemNumber bdNsCtNumber, String ctArrayInput, int childId, int motherId) {
        JSONObject json = new JSONObject();
        bdNsCtNumber.setCid(childId);
        bdNsCtNumber.setMid(motherId);
        json.put("code", 1);
        if (basicDatabaseNsMapper.bdNsCtNumberInsertUpdate(bdNsCtNumber) == 0) {
            json.put("code", 0);
        }

        if (ctArrayInput != null) {
            JSONArray ctArray = JSONArray.parseArray(ctArrayInput);
            QueryWrapper<BDNsCt> deleteWrapper = new QueryWrapper<>();
            deleteWrapper.eq("cid", childId);
            deleteWrapper.eq("mid", motherId);
            bdNsCtMapper.delete(deleteWrapper);
            for (int i = 0; i < ctArray.size(); i++) {
                JSONObject ct = ctArray.getJSONObject(i);
                BDNsCt bdNsCt = ct.toJavaObject(BDNsCt.class);
                bdNsCt.setCid(childId);
                bdNsCt.setMid(motherId);
                if (bdNsCtMapper.insert(bdNsCt) == 0) {
                    json.put("code", 0);
                }
            }
        }
        return json.toJSONString();
    }

    @Override
    public String bdNsCtUploadImg(String num, String index, MultipartFile imageFile, int childId) {
        JSONObject json = new JSONObject();
        json.put("code", 1);
        if(!imageFile.isEmpty()){
            String fileName = childId + "_bd_ns_ct_" + index + "_" + num; // 图片名

            // 图片 保存路径
            String dirPath =  ctImagesPath + childId + "/" + fileName;
            File dest = new File(dirPath);
            if (!dest.getParentFile().exists()) {
                dest.getParentFile().mkdirs();
            }

            try {
                byte[] imgByte = imageFile.getBytes();
                FileImageOutputStream imageOutput = new FileImageOutputStream(dest);
                imageOutput.write(imgByte, 0, imgByte.length); // 将byte写入硬盘
                imageOutput.close();
                String url = ctImagesUrl + childId + "/" + fileName;
                json.put("code", 0);
                json.put("url", url);
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
        return json.toJSONString();
    }

    @Override
    public BDNervousSystemNumber getBdNsCtNumber(int childId, int motherId) {
        return basicDatabaseNsMapper.bdNsCtNumberQry(childId, motherId);
    }

    @Override
    public List<BDNsCt> getBdNsCt(int childId, int motherId) {
        QueryWrapper<BDNsCt> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("cid", childId);
        queryWrapper.eq("mid", motherId);
        return bdNsCtMapper.selectList(queryWrapper);
    }

    @Override
    public String saveBDNSEEG(BDNervousSystemNumber bdNsEegNumber, String eegArrayInput, int childId, int motherId) {
        JSONObject json = new JSONObject();
        bdNsEegNumber.setCid(childId);
        bdNsEegNumber.setMid(motherId);
        json.put("code", 1);
        if (basicDatabaseNsMapper.bdNsEegNumberInsertUpdate(bdNsEegNumber) == 0) {
            json.put("code", 0);
        }

        if (eegArrayInput != null) {
            JSONArray eegArray = JSONArray.parseArray(eegArrayInput);
            QueryWrapper<BDNsEeg> deleteWrapper = new QueryWrapper<>();
            deleteWrapper.eq("cid", childId);
            deleteWrapper.eq("mid", motherId);
            bdNsEegMapper.delete(deleteWrapper);
            for (int i = 0; i < eegArray.size(); i++) {
                JSONObject eeg = eegArray.getJSONObject(i);
                BDNsEeg bdNsEeg = eeg.toJavaObject(BDNsEeg.class);
                bdNsEeg.setCid(childId);
                bdNsEeg.setMid(motherId);
                if (bdNsEegMapper.insert(bdNsEeg) == 0) {
                    json.put("code", 0);
                }
            }
        }
        return json.toJSONString();
    }

    @Override
    public BDNervousSystemNumber getBdNsEegNumber(int childId, int motherId) {
        return basicDatabaseNsMapper.bdNsEegNumberQry(childId, motherId);
    }

    @Override
    public List<BDNsEeg> getBdNsEeg(int childId, int motherId) {
        QueryWrapper<BDNsEeg> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("cid", childId);
        queryWrapper.eq("mid", motherId);
        return bdNsEegMapper.selectList(queryWrapper);
    }

    @Override
    public String saveBDNSAE(BDNSAuxiliaryExamination bdNsAuxiliaryExamination, int childId, int motherId) {
        bdNsAuxiliaryExamination.setCid(childId);
        bdNsAuxiliaryExamination.setMid(motherId);
        JSONObject json = new JSONObject();
        json.put("code", 0);
        if (bdNsAeMapper.insertOrUpdate(bdNsAuxiliaryExamination) > 0) {
            json.put("code", 1);
        }
        return json.toJSONString();
    }

    @Override
    public BDNSAuxiliaryExamination getBdNsAuxiliaryExamination(int childId, int motherId) {
        QueryWrapper<BDNSAuxiliaryExamination> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("cid", childId);
        queryWrapper.eq("mid", motherId);
        return bdNsAeMapper.selectOne(queryWrapper);
    }

    @Override
    public String saveBDNSTD(BDNSTreatmentDiagnosis bdNsTreatmentDiagnosis, int childId, int motherId) {
        bdNsTreatmentDiagnosis.setCid(childId);
        bdNsTreatmentDiagnosis.setMid(motherId);
        JSONObject json = new JSONObject();
        json.put("code", 0);
        if (bdNsTdMapper.insertOrUpdate(bdNsTreatmentDiagnosis) > 0) {
            json.put("code", 1);
        }
        return json.toJSONString();
    }

    @Override
    public BDNSTreatmentDiagnosis getBdNsTreatmentDiagnosis(int childId, int motherId) {
        QueryWrapper<BDNSTreatmentDiagnosis> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("cid", childId);
        queryWrapper.eq("mid", motherId);
        return bdNsTdMapper.selectOne(queryWrapper);
    }
}