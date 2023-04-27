package com.pnsrcp.web.service.impl;

import com.alibaba.fastjson.JSONObject;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.pnsrcp.web.dao.MainMapper;
import com.pnsrcp.web.dao.manage.*;
import com.pnsrcp.web.entity.Feedback;
import com.pnsrcp.web.entity.manage.*;
import com.pnsrcp.web.service.ManageService;
import com.pnsrcp.web.utils.PicUtils;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.annotation.Resource;
import javax.imageio.stream.FileImageOutputStream;
import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

/**
 * @Project: 围产新生儿科研合作平台
 * @Author: Linyer
 * @Email: linyer@linyer.cn
 * @Date: 2021/5/28 14:11 星期五
 * @Description: 管理服务层实现类
 */
@Service
public class ManageServiceImpl implements ManageService {
    // 数据层注入
    @Resource
    private MainMapper mainMapper;
    @Resource
    private UserMapper userMapper;
    @Resource
    private HospitalMapper hospitalMapper;
    @Resource
    private HospitalBDAuthorityMapper hospitalBDAuthorityMapper;
    @Resource
    private HospitalDPCAuthorityMapper hospitalDPCAuthorityMapper;
    @Resource
    private HospitalMBSRAuthorityMapper hospitalMBSRAuthorityMapper;
    @Resource
    private HospitalPPAuthorityMapper hospitalPPAuthorityMapper;
    @Resource
    private HospitalRDAuthorityMapper hospitalRDAuthorityMapper;
    @Resource
    private HospitalUIAuthorityMapper hospitalUIAuthorityMapper;
    @Resource
    private HospitalFDAuthorityMapper hospitalFDAuthorityMapper;
    @Resource
    private HospitalHBAuthorityMapper hospitalHBAuthorityMapper;
    @Resource
    private AreaBDAuthorityMapper areaBDAuthorityMapper;
    @Resource
    private AreaDPCAuthorityMapper areaDPCAuthorityMapper;
    @Resource
    private AreaMBSRAuthorityMapper areaMBSRAuthorityMapper;
    @Resource
    private AreaPPAuthorityMapper areaPPAuthorityMapper;
    @Resource
    private AreaRDAuthorityMapper areaRDAuthorityMapper;
    @Resource
    private AreaUIAuthorityMapper areaUIAuthorityMapper;
    @Resource
    private AreaFDAuthorityMapper areaFDAuthorityMapper;
    @Resource
    private AreaHBAuthorityMapper areaHBAuthorityMapper;
    @Resource
    private AreaMapper areaMapper;
    @Resource
    private WxmpMapper wxmpMapper;

    // 图片路径
    @Value("${com.perinatalcloud.wxmp_ad_images_path}")
    private String wxmpAdImagesPath;
    @Value("${com.perinatalcloud.wxmp_ad_images_url}")
    private String wxmpAdImagesUrl;

    @Override
    public String getHospital(int page, int limit, int aid) {
        JSONObject json = new JSONObject();
        json.put("msg", "");
        json.put("count", hospitalMapper.hospitalCount());
        if (page > -1) {
            int pageA = (page-1)*limit;
            List<Hospital> hospitalList = hospitalMapper.hospitalQry(pageA, limit, 0, aid);
            json.put("data", hospitalList);
        }
        json.put("code", 0);
        return json.toJSONString();
    }

    @Override
    public String addHospital(Hospital hospital, String pwd) {
        JSONObject json = new JSONObject();
        json.put("code", 0);
        if (hospitalMapper.hospitalInsert(hospital) > 0) {
            BCryptPasswordEncoder pwdEncoder = new BCryptPasswordEncoder();
            User user = new User();
            user.setHospitalId(hospital.getHid());
            user.setUsername(hospital.getUsername());
            user.setPassword(pwdEncoder.encode(pwd));
            user.setFullName(hospital.getFullName());
            user.setPhone(hospital.getPhone());
            user.setStatus(hospital.getStatus());
            user.setLevel(2);

            if (userMapper.userInsert(user) > 0) {
                if (hospitalMapper.hospitalChargePersonUpdate(hospital.getHid(), user.getUid()) > 0) {
                    json.put("code", 1);
                }
            }
        }
        return json.toJSONString();
    }

    @Override
    public String modifyHospital(Hospital hospital, String pwd) {
        JSONObject json = new JSONObject();
        json.put("code", 0);
        if (hospitalMapper.hospitalUpdate(hospital) > 0) {
            BCryptPasswordEncoder pwdEncoder = new BCryptPasswordEncoder();
            User user = new User();
            user.setUid(hospital.getUid());
            user.setUsername(hospital.getUsername());
            user.setFullName(hospital.getFullName());
            if (pwd != null && !pwd.equals("")) {
                user.setPassword(pwdEncoder.encode(pwd));
            }
            user.setPhone(hospital.getPhone());
            user.setStatus(hospital.getStatus());

            if (userMapper.userUpdate(user) > 0) {
                json.put("code", 1);
            }
        }
        return json.toJSONString();
    }

    @Override
    public List<HospitalLevel> getHospitalLevel() {
        return hospitalMapper.hospitalLevelQuery();
    }

    @Override
    public Area getAnAreaMsg(int aid) {
        return areaMapper.areaQuery(aid, 0).get(0);
    }

    @Override
    public String getHospitalNameByHid(int hid) {
        return hospitalMapper.hospitalNameQuery(hid);
    }

    @Override
    public String getChargePerson(int hid) {
        JSONObject json = new JSONObject();
        json.put("chargePerson", userMapper.usersQuery(hid, -1, -1));
        json.put("code", 1);
        return json.toJSONString();
    }

    @Override
    public String setHospitalAuthority(HospitalAuthBD hospitalAuthBD, HospitalAuthDPC hospitalAuthDPC, HospitalAuthMBSR hospitalAuthMBSR,
                                       HospitalAuthPP hospitalAuthPP, HospitalAuthRD hospitalAuthRD, HospitalAuthUI hospitalAuthUI,
                                       HospitalAuthFD hospitalAuthFD, HospitalAuthHB hospitalAuthHB) {
        JSONObject json = new JSONObject();
        json.put("code", 0);
        hospitalBDAuthorityMapper.insertOrUpdate(hospitalAuthBD);
        hospitalDPCAuthorityMapper.insertOrUpdate(hospitalAuthDPC);
        hospitalMBSRAuthorityMapper.insertOrUpdate(hospitalAuthMBSR);
        hospitalPPAuthorityMapper.insertOrUpdate(hospitalAuthPP);
        hospitalRDAuthorityMapper.insertOrUpdate(hospitalAuthRD);
        hospitalUIAuthorityMapper.insertOrUpdate(hospitalAuthUI);
        hospitalFDAuthorityMapper.insertOrUpdate(hospitalAuthFD);
        hospitalHBAuthorityMapper.insertOrUpdate(hospitalAuthHB);
        json.put("code", 1);
        return json.toJSONString();
    }

    @Override
    public String getHospitalAuthority(int hid) {
        JSONObject json = new JSONObject();

        QueryWrapper<HospitalAuthBD> queryBdWrapper = new QueryWrapper<>();
        queryBdWrapper.eq("hid", hid);
        json.put("hospitalBDAuth", hospitalBDAuthorityMapper.selectOne(queryBdWrapper));

        QueryWrapper<HospitalAuthDPC> queryDpcWrapper = new QueryWrapper<>();
        queryDpcWrapper.eq("hid", hid);
        json.put("hospitalDPCAuth", hospitalDPCAuthorityMapper.selectOne(queryDpcWrapper));

        QueryWrapper<HospitalAuthMBSR> queryMbsrWrapper = new QueryWrapper<>();
        queryMbsrWrapper.eq("hid", hid);
        json.put("hospitalMBSRAuth", hospitalMBSRAuthorityMapper.selectOne(queryMbsrWrapper));

        QueryWrapper<HospitalAuthPP> queryPpWrapper = new QueryWrapper<>();
        queryPpWrapper.eq("hid", hid);
        json.put("hospitalPPAuth", hospitalPPAuthorityMapper.selectOne(queryPpWrapper));

        QueryWrapper<HospitalAuthRD> queryRdWrapper = new QueryWrapper<>();
        queryRdWrapper.eq("hid", hid);
        json.put("hospitalRDAuth", hospitalRDAuthorityMapper.selectOne(queryRdWrapper));

        QueryWrapper<HospitalAuthUI> queryUiWrapper = new QueryWrapper<>();
        queryUiWrapper.eq("hid", hid);
        json.put("hospitalUIAuth", hospitalUIAuthorityMapper.selectOne(queryUiWrapper));

        QueryWrapper<HospitalAuthFD> queryFdWrapper = new QueryWrapper<>();
        queryFdWrapper.eq("hid", hid);
        json.put("hospitalFDAuth", hospitalFDAuthorityMapper.selectOne(queryFdWrapper));

        QueryWrapper<HospitalAuthHB> queryHbWrapper = new QueryWrapper<>();
        queryHbWrapper.eq("hid", hid);
        json.put("hospitalHBAuth", hospitalHBAuthorityMapper.selectOne(queryHbWrapper));

        json.put("code", 1);
        return json.toJSONString();
    }

    @Override
    public String getUserByHospital(int page, int limit, int hospitalId) {
        JSONObject json = new JSONObject();
        json.put("msg", "");
        json.put("count", userMapper.userCount(hospitalId));
        if (page > -1) {
            int pageA = (page-1)*limit;
            json.put("data", userMapper.usersQuery(hospitalId, pageA, limit));
        }
        json.put("code", 0);
        return json.toJSONString();
    }

    @Override
    public int getUserCount(int hospitalId) {
        return userMapper.userCount(hospitalId);
    }

    @Override
    public String modifyUser(User user) {
        JSONObject json = new JSONObject();
        json.put("code", 0);
        if(user.getPassword() != null && !user.getPassword().equals("")) {
            BCryptPasswordEncoder pwdEncoder = new BCryptPasswordEncoder();
            user.setPassword(pwdEncoder.encode(user.getPassword()));
        }
        if (userMapper.userUpdate(user) > 0) {
            json.put("code", 1);
        }
        return json.toJSONString();
    }

    @Override
    public List<Area> getArea() {
        return areaMapper.areaQuery(0, 0);
    }

    @Override
    public String addArea(Area area, String pwd) {
        JSONObject json = new JSONObject();
        json.put("code", 0);

        User user = new User();
        BCryptPasswordEncoder pwdEncoder = new BCryptPasswordEncoder();

        user.setUsername(area.getUsername());
        user.setFullName(area.getFullName());
        user.setPassword(pwdEncoder.encode(pwd));
        user.setLevel(3);
        user.setPhone(area.getPhone());
        user.setStatus(area.getStatus());

        if (userMapper.userInsert(user) > 0) {
            area.setChargeId(user.getUid());
            if (areaMapper.areaInsert(area) > 0) {
                json.put("code", 1);
            }
        }
        return json.toJSONString();
    }

    @Override
    public String getThisAreaMsg(int aid) {
        JSONObject json = new JSONObject();
        json.put("areaMsg", areaMapper.areaQuery(aid, 0).get(0));
        json.put("code", 1);
        return json.toJSONString();
    }

    @Override
    public String modifyArea(Area area, String pwd) {
        JSONObject json = new JSONObject();
        json.put("code", 0);
        if (areaMapper.areaUpdate(area) > 0) {
            BCryptPasswordEncoder pwdEncoder = new BCryptPasswordEncoder();
            User user = new User();
            user.setUid(area.getChargeId());
            user.setUsername(area.getUsername());
            user.setFullName(area.getFullName());
            user.setPassword(pwdEncoder.encode(pwd));
            user.setPhone(area.getPhone());
            user.setStatus(area.getStatus());

            if (userMapper.userUpdate(user) > 0) {
                json.put("code", 1);
            }
        }
        return json.toJSONString();
    }

    @Override
    public String setStatus(int status, int areaId) {
        JSONObject json = new JSONObject();
        json.put("code", 0);
        if (areaMapper.areaStatusUpdate(status, areaId) > 0) {
            json.put("code", 1);
        }
        return json.toJSONString();
    }

    @Override
    public List<AreaHospital> getAreaHospital(int uid) {
        List<Integer> hospitalIdList = new ArrayList<>();
        if (uid > 0) {
            int aid = areaMapper.areaChargePersonId(uid);
            if (aid > 0) {
                hospitalIdList = hospitalMapper.thisAreaHospitalQuery(aid);
            }
        }
        return hospitalMapper.areaHospitalQuery(hospitalIdList);
    }

    @Override
    public String getThisAreaHospital(int aid) {
        JSONObject json = new JSONObject();
        json.put("hospitalIdList", hospitalMapper.thisAreaHospitalQuery(aid));
        json.put("code", 1);
        return json.toJSONString();
    }

    @Override
    public String setHospital(int aid, String[] hospitalIdArray) {
        JSONObject json = new JSONObject();
        json.put("code", 0);
        hospitalMapper.thisAreaHospitalDelete(aid);
        if(hospitalIdArray != null) {
            for(String hospitalId : hospitalIdArray) {
                hospitalMapper.hospitalAreaUpdate(aid, Integer.parseInt(hospitalId));
            }
        }
        areaMapper.areaHospitalNumUpdate(aid);
        json.put("code", 1);
        return json.toJSONString();
    }

    @Override
    public String setAreaAuthority(AreaAuthBD areaAuthBD, AreaAuthDPC areaAuthDPC, AreaAuthMBSR areaAuthMBSR,
                                   AreaAuthPP areaAuthPP, AreaAuthRD areaAuthRD, AreaAuthUI areaAuthUI,
                                   AreaAuthFD areaAuthFD, AreaAuthHB areaAuthHB) {
        JSONObject json = new JSONObject();
        json.put("code", 0);
        areaBDAuthorityMapper.insertOrUpdate(areaAuthBD);
        areaDPCAuthorityMapper.insertOrUpdate(areaAuthDPC);
        areaMBSRAuthorityMapper.insertOrUpdate(areaAuthMBSR);
        areaPPAuthorityMapper.insertOrUpdate(areaAuthPP);
        areaRDAuthorityMapper.insertOrUpdate(areaAuthRD);
        areaUIAuthorityMapper.insertOrUpdate(areaAuthUI);
        areaFDAuthorityMapper.insertOrUpdate(areaAuthFD);
        areaHBAuthorityMapper.insertOrUpdate(areaAuthHB);
        json.put("code", 1);
        return json.toJSONString();
    }

    @Override
    public String getAreaAuthority(int aid) {
        JSONObject json = new JSONObject();

        QueryWrapper<AreaAuthBD> queryBdWrapper = new QueryWrapper<>();
        queryBdWrapper.eq("aid", aid);
        json.put("areaBDAuth", areaBDAuthorityMapper.selectOne(queryBdWrapper));

        QueryWrapper<AreaAuthDPC> queryDpcWrapper = new QueryWrapper<>();
        queryDpcWrapper.eq("aid", aid);
        json.put("areaDPCAuth", areaDPCAuthorityMapper.selectOne(queryDpcWrapper));

        QueryWrapper<AreaAuthMBSR> queryMbsrWrapper = new QueryWrapper<>();
        queryMbsrWrapper.eq("aid", aid);
        json.put("areaMBSRAuth", areaMBSRAuthorityMapper.selectOne(queryMbsrWrapper));

        QueryWrapper<AreaAuthPP> queryPpWrapper = new QueryWrapper<>();
        queryPpWrapper.eq("aid", aid);
        json.put("areaPPAuth", areaPPAuthorityMapper.selectOne(queryPpWrapper));

        QueryWrapper<AreaAuthRD> queryRdWrapper = new QueryWrapper<>();
        queryRdWrapper.eq("aid", aid);
        json.put("areaRDAuth", areaRDAuthorityMapper.selectOne(queryRdWrapper));

        QueryWrapper<AreaAuthUI> queryUiWrapper = new QueryWrapper<>();
        queryUiWrapper.eq("aid", aid);
        json.put("areaUIAuth", areaUIAuthorityMapper.selectOne(queryUiWrapper));

        QueryWrapper<AreaAuthFD> queryFdWrapper = new QueryWrapper<>();
        queryRdWrapper.eq("aid", aid);
        json.put("areaFDAuth", areaFDAuthorityMapper.selectOne(queryFdWrapper));

        QueryWrapper<AreaAuthHB> queryHbWrapper = new QueryWrapper<>();
        queryHbWrapper.eq("aid", aid);
        json.put("areaHBAuth", areaHBAuthorityMapper.selectOne(queryHbWrapper));

        json.put("code", 1);
        return json.toJSONString();
    }

    @Override
    public List<Advertisement> getWxmpAdImages() {
        QueryWrapper<Advertisement> queryWrapper = new QueryWrapper<>();
        return wxmpMapper.selectList(queryWrapper);
    }

    @Override
    public String uploadAdImage(MultipartFile imageFile) {
        JSONObject json = new JSONObject();
        json.put("code", 0);
        if(!imageFile.isEmpty()){
            String fileName = imageFile.getOriginalFilename();
            String suffixName = fileName.substring(fileName.lastIndexOf(".")); // 后缀名
            fileName = new Date().getTime() + suffixName; // 图片名

            // 图片 保存路径
            String dirPath =  wxmpAdImagesPath + fileName;
            File dest = new File(dirPath);
            if (!dest.getParentFile().exists()) {
                dest.getParentFile().mkdirs();
            }

            try {
                // 压缩图片
                byte[] imgByte = PicUtils.compressPicForScale(imageFile.getBytes(), 512);
                FileImageOutputStream imageOutput = new FileImageOutputStream(dest);
                imageOutput.write(imgByte, 0, imgByte.length); // 将byte写入硬盘
                imageOutput.close();
                String url = wxmpAdImagesUrl + fileName;
                Advertisement advertisement = new Advertisement();
                advertisement.setUrl(url);
                if (wxmpMapper.insert(advertisement) > 0) {
                    json.put("code", 1);
                }
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
        return json.toJSONString();
    }

    @Override
    public String deleteAdImage(String id) {
        JSONObject json = new JSONObject();
        json.put("code", 0);
        QueryWrapper<Advertisement> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("id", id);
        Advertisement advertisement = wxmpMapper.selectOne(queryWrapper);
        if (advertisement != null) {
            String url = advertisement.getUrl();
            String[] urls = url.split("/");
            String imgName = urls[urls.length - 1];
            File imageFile = new File(wxmpAdImagesPath + imgName);
            if (imageFile.delete()) {
                json.put("code", 1);
            }
            if (wxmpMapper.delete(queryWrapper) > 0) {
                json.put("code", 1);
            }
        }
        return json.toJSONString();
    }

    @Override
    public List<Feedback> getAllFeedback() {
        return mainMapper.feedbackQry(-1);
    }

    @Override
    public List<Feedback> getReply(int fid) {
        return mainMapper.feedbackReplyQry(fid);
    }

    @Override
    public String saveFeedback(Feedback feedback, User user) {
        JSONObject json = new JSONObject();
        json.put("code", 0);
        feedback.setUid(user.getUid());
        feedback.setFullName("超级管理员");
        if (mainMapper.feedbackInsert(feedback) > 0) {
            json.put("code", 1);
        }
        return json.toJSONString();
    }
}