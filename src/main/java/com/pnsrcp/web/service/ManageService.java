package com.pnsrcp.web.service;

import com.pnsrcp.web.entity.Feedback;
import com.pnsrcp.web.entity.manage.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

/**
 * @Project: 围产新生儿科研合作平台
 * @Author: Linyer
 * @Email: linyer@linyer.cn
 * @Date: 2021/5/28 14:08 星期五
 * @Description: 管理 服务层 接口
 */
public interface ManageService {
    // 获取 医院信息
    String getHospital(int page, int limit, int aid);

    // 添加 医院
    String addHospital(Hospital hospital, String pwd);

    // 修改 医院信息
    String modifyHospital(Hospital hospital, String pwd);

    // 获取 医院等级
    List<HospitalLevel> getHospitalLevel();

    // 根据ID 获取 区域 信息
    Area getAnAreaMsg(int aid);

    // 根据id 获取 医院名称
    String getHospitalNameByHid(int hid);

    // 根据医院id 获取 医院下用户
    String getChargePerson(int hid);

    // 设置 医院 权限
    String setHospitalAuthority(HospitalAuthBD hospitalAuthBD, HospitalAuthDPC hospitalAuthDPC, HospitalAuthMBSR hospitalAuthMBSR,
                                HospitalAuthPP hospitalAuthPP, HospitalAuthRD hospitalAuthRD, HospitalAuthUI hospitalAuthUI,
                                HospitalAuthFD hospitalAuthFD, HospitalAuthHB hospitalAuthHB);

    // 获取 医院 权限
    String getHospitalAuthority(int hid);

    // 获取 医院下的用户
    String getUserByHospital(int page, int limit, int hospitalId);

    // 获取 用户数量
    int getUserCount(int hospitalId);

    // 修改 用户
    String modifyUser(User user);

    // 获取 区域 信息
    List<Area> getArea();

    // 增加 区域
    String addArea(Area area, String pwd);

    // 根据ID 获取 区域 信息 json
    String getThisAreaMsg(int aid);

    // 修改 区域
    String modifyArea(Area area, String pwd);

    // 设置 区域状态
    String setStatus(int status, int areaId);

    // 获取 用于区域设置医院 的医院信息
    List<AreaHospital> getAreaHospital(int uid);

    // 获取 此区域 下属医院 json
    String getThisAreaHospital(int aid);

    // 区域 设置医院
    String setHospital(int aid, String[] hospitalIdArray);

    // 设置 区域 权限
    String setAreaAuthority(AreaAuthBD areaAuthBD, AreaAuthDPC areaAuthDPC, AreaAuthMBSR areaAuthMBSR,
                            AreaAuthPP areaAuthPP, AreaAuthRD areaAuthRD, AreaAuthUI areaAuthUI,
                            AreaAuthFD areaAuthFD, AreaAuthHB areaAuthHB);

    // 获取 区域 权限 json
    String getAreaAuthority(int aid);

    // 获取 小程序 广告图片信息
    List<Advertisement> getWxmpAdImages();

    // 上传 小程序 广告图片
    String uploadAdImage(MultipartFile image);

    // 删除 小程序 广告图片
    String deleteAdImage(String id);

    // 获取 所有 反馈
    List<Feedback> getAllFeedback();

    // 获取 反馈 回复
    List<Feedback> getReply(int fid);

    // 保存 反馈 回复
    String saveFeedback(Feedback feedback, User user);
}
