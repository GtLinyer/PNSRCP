package com.pnsrcp.web.service.impl;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.pnsrcp.web.dao.basicDatabase.BasicDatabaseMapper;
import com.pnsrcp.web.dao.basicDatabaseDGS.BDDgsGiMapper;
import com.pnsrcp.web.dao.basicDatabaseDGS.BDDgsGiWHcBlMapper;
import com.pnsrcp.web.dao.doctorPatientCommunication.DPCBmdMapper;
import com.pnsrcp.web.dao.doctorPatientCommunication.DPCBmdPumpingMapper;
import com.pnsrcp.web.dao.doctorPatientCommunication.DoctorPatientCommunicationMapper;
import com.pnsrcp.web.entity.perintalPlatform.CaseStatus;
import com.pnsrcp.web.entity.perintalPlatform.Review;
import com.pnsrcp.web.entity.perintalPlatform.basicDatabaseDGS.BDDGSGiWHcBl;
import com.pnsrcp.web.entity.perintalPlatform.basicDatabaseDGS.BDDGSGrowthIndex;
import com.pnsrcp.web.entity.perintalPlatform.basicDatabse.BDBirthMsg;
import com.pnsrcp.web.entity.perintalPlatform.doctorPatientCommunication.DPCBmdPumping;
import com.pnsrcp.web.entity.perintalPlatform.doctorPatientCommunication.DPCBreastMilkDiary;
import com.pnsrcp.web.service.DoctorPatientCommunicationService;
import com.pnsrcp.web.utils.PicUtils;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.annotation.Resource;
import javax.imageio.stream.FileImageOutputStream;
import java.io.File;
import java.io.IOException;
import java.util.Date;
import java.util.List;

/**
 * @Project: 围产新生儿科研合作平台
 * @Author: Linyer
 * @Email: linyer@linyer.cn
 * @Date: 2022/2/2 21:24 星期三
 * @Description: 围产新生儿科研合作平台 医患交流库 服务层 实现类
 */
@Service
public class DoctorPatientCommunicationServiceImpl implements DoctorPatientCommunicationService {
    // 数据层 注入
    @Resource
    private BasicDatabaseMapper basicDatabaseMapper;
    @Resource
    private DoctorPatientCommunicationMapper doctorPatientCommunicationMapper;
    @Resource
    private DPCBmdMapper dpcBmdMapper;
    @Resource
    private DPCBmdPumpingMapper dpcBmdPumpingMapper;
    @Resource
    private BDDgsGiMapper bdDgsGiMapper;
    @Resource
    private BDDgsGiWHcBlMapper bdDgsGiWHcBlMapper;

    // 图片路径
    @Value("${com.perinatalcloud.dcp_images_path}")
    private String dcpUploadPath;
    @Value("${com.perinatalcloud.dcp_images_url}")
    private String dcpUploadUrl;

    @Override
    public BDBirthMsg getDpcBirthMsg(int childId, int motherId) {
        return basicDatabaseMapper.bdBirthMsgQry(childId, motherId);
    }

    @Override
    public String saveDPCBMD(DPCBreastMilkDiary dpcBreastMilkDiary, String pumpingArrayInput, int childId, int motherId) {
        dpcBreastMilkDiary.setCid(childId);
        dpcBreastMilkDiary.setMid(motherId);
        JSONObject json = new JSONObject();
        json.put("code", 0);
        if (dpcBmdMapper.insertOrUpdate(dpcBreastMilkDiary) > 0) {
            json.put("code", 1);
        }

        JSONArray pumpingArray = JSONArray.parseArray(pumpingArrayInput);
        for (int i = 0; i < pumpingArray.size(); i++) {
            JSONObject pumping = pumpingArray.getJSONObject(i);
            DPCBmdPumping dpcBmdPumping = pumping.toJavaObject(DPCBmdPumping.class);
            dpcBmdPumping.setMid(motherId);
            if (dpcBmdPumpingMapper.insertOrUpdate(dpcBmdPumping) == 0) {
                json.put("code", 0);
            }
        }
        return json.toJSONString();
    }

    @Override
    public String deletePumping(int pumpingId, int motherId) {
        JSONObject json = new JSONObject();
        json.put("code", 0);
        QueryWrapper<DPCBmdPumping> deleteWrapper = new QueryWrapper<>();
        deleteWrapper.eq("id", pumpingId);
        deleteWrapper.eq("mid", motherId);
        if (dpcBmdPumpingMapper.delete(deleteWrapper) > 0) {
            json.put("code", 1);
        }
        return json.toJSONString();
    }

    @Override
    public DPCBreastMilkDiary getDpcBreastMilkDiary(int childId, int motherId) {
        QueryWrapper<DPCBreastMilkDiary> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("cid", childId);
        queryWrapper.eq("mid", motherId);
        return dpcBmdMapper.selectOne(queryWrapper);
    }

    @Override
    public List<DPCBmdPumping> getDpcBmdPumping(int motherId) {
        QueryWrapper<DPCBmdPumping> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("mid", motherId);
        return dpcBmdPumpingMapper.selectList(queryWrapper);
    }

    @Override
    public BDDGSGrowthIndex getDpcGrowthCurve(int childId, int motherId) {
        QueryWrapper<BDDGSGrowthIndex> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("cid", childId);
        queryWrapper.eq("mid", motherId);
        return bdDgsGiMapper.selectOne(queryWrapper);
    }

    @Override
    public String saveDPCGC(String wHcBlArrayInput, int childId, int motherId) {
        JSONObject json = new JSONObject();
        json.put("code", 0);
        if (wHcBlArrayInput != null) {
            JSONArray wHcBlArray = JSONArray.parseArray(wHcBlArrayInput);
            QueryWrapper<BDDGSGiWHcBl> deleteWrapper = new QueryWrapper<>();
            deleteWrapper.eq("cid", childId);
            deleteWrapper.eq("mid", motherId);
            bdDgsGiWHcBlMapper.delete(deleteWrapper);
            for (int i = 0; i < wHcBlArray.size(); i++) {
                JSONObject wHcBl = wHcBlArray.getJSONObject(i);
                BDDGSGiWHcBl bdGiWHcBl = wHcBl.toJavaObject(BDDGSGiWHcBl.class);
                bdGiWHcBl.setCid(childId);
                bdGiWHcBl.setMid(motherId);
                if (bdDgsGiWHcBlMapper.insert(bdGiWHcBl) == 0) {
                    json.put("code", 0);
                }
            }
        }
        return json.toJSONString();
    }

    @Override
    public String getEnhancerType(int childId, int motherId) {
        return doctorPatientCommunicationMapper.enhancerTypeQry(childId, motherId);
    }

    @Override
    public String dpcUploadImg(MultipartFile imageFile, int childId) {
        JSONObject json = new JSONObject();
        json.put("errno", 1);
        if(!imageFile.isEmpty()){
            String fileName = imageFile.getOriginalFilename();
            String suffixName = fileName.substring(fileName.lastIndexOf(".")); // 后缀名
            fileName = new Date().getTime() + suffixName; // 图片名

            // 图片 保存路径
            String dirPath =  dcpUploadPath + childId + "/" + fileName;
            File dest = new File(dirPath);
            if (!dest.getParentFile().exists()) {
                dest.getParentFile().mkdirs();
            }

            JSONArray dataArray = new JSONArray();
            JSONObject dataJson = new JSONObject();
            try {
                // 压缩图片
                byte[] imgByte = PicUtils.compressPicForScale(imageFile.getBytes(), 512);
                FileImageOutputStream imageOutput = new FileImageOutputStream(dest);
                imageOutput.write(imgByte, 0, imgByte.length); // 将byte写入硬盘
                imageOutput.close();
                String url = dcpUploadUrl + childId + "/" + fileName;
                json.put("errno", 0);
                dataJson.put("url", url);
                dataArray.add(dataJson);
                json.put("data", dataArray);
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
        return json.toJSONString();
    }

    @Override
    public String dpcUploadVideo(MultipartFile videoFile, int childId) {
        JSONObject json = new JSONObject();
        json.put("errno", 1);
        if(!videoFile.isEmpty()){
            String fileName = videoFile.getOriginalFilename();
            String suffixName = fileName.substring(fileName.lastIndexOf(".")); // 后缀名
            fileName = new Date().getTime() + suffixName; // 视频名

            // 视频 保存路径
            String dirPath =  dcpUploadPath + childId + "\\" + fileName;
            File dest = new File(dirPath);
            if (!dest.getParentFile().exists()) {
                dest.getParentFile().mkdirs();
            }

            JSONObject dataJson = new JSONObject();
            try {
                videoFile.transferTo(dest);
                String url = dcpUploadUrl + childId + "/" + fileName;
                json.put("errno", 0);
                dataJson.put("url", url);
                json.put("data", dataJson);
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
        return json.toJSONString();
    }

    @Override
    public String getDoctorPatientCommunication(int childId, int motherId) {
        JSONObject json = new JSONObject();
        json.put("code", 0);
        try {
            json.put("doctorPatientCommunicationList", doctorPatientCommunicationMapper.dpcDoctorPatientCommunicationQry(childId, motherId));
            json.put("code", 1);
        } catch (Exception ignored) {}
        return json.toJSONString();
    }

    @Override
    public String deleteDoctorPatientCommunication(int dcpId, int childId, int motherId) {
        JSONObject json = new JSONObject();
        json.put("code", 0);
        if (doctorPatientCommunicationMapper.dpcDoctorPatientCommunicationDelete(dcpId, 0, childId, motherId) > 0) {
            json.put("code", 1);
        }
        return json.toJSONString();
    }

    @Override
    public String saveDPCDPC(String text, int childId, int motherId) {
        JSONObject json = new JSONObject();
        json.put("code", 0);
        if (doctorPatientCommunicationMapper.dpcDoctorPatientCommunicationInsert(text, 0, childId, motherId) > 0) {
            json.put("code", 1);
        }
        return json.toJSONString();
    }

    @Override
    public CaseStatus getDpcCaseStatus(int childId, int motherId) {
        return doctorPatientCommunicationMapper.dpcCaseStatusQry(childId, motherId);
    }

    @Override
    public int getDpcReviewCount(int childId, int motherId) {
        return doctorPatientCommunicationMapper.dpcReviewCount(childId, motherId);
    }

    @Override
    public List<Review> getDpcReview(int childId, int motherId) {
        return doctorPatientCommunicationMapper.dpcReviewQry(childId, motherId);
    }

    @Override
    public String addDpcReview(Review dpcReview, int childId, int motherId) {
        dpcReview.setCid(childId);
        dpcReview.setMid(motherId);
        JSONObject json = new JSONObject();
        json.put("code", 0);
        if (doctorPatientCommunicationMapper.dpcReviewInsert(dpcReview) > 0) {
            doctorPatientCommunicationMapper.dpcStatusUpdate(dpcReview.getCid(), dpcReview.getMid(), dpcReview.getStatus());
            json.put("code", 1);
        }
        return json.toJSONString();
    }
}
