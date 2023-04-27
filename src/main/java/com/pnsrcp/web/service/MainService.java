package com.pnsrcp.web.service;

import com.pnsrcp.web.config.MyUserDetails;
import com.pnsrcp.web.entity.DataAmount;
import com.pnsrcp.web.entity.Feedback;
import com.pnsrcp.web.entity.manage.Area;
import com.pnsrcp.web.entity.manage.Hospital;
import com.pnsrcp.web.entity.manage.User;
import org.springframework.web.multipart.MultipartFile;

import java.util.Date;
import java.util.List;

/**
 * @Project: 围产新生儿科研合作平台
 * @Author: Linyer
 * @Email: linyer@linyer.cn
 * @Date: 2021/7/5 16:31 星期一
 * @Description: 主页面 服务层 接口
 */
public interface MainService {
    // 登录 处理
    MyUserDetails doLogin(String username);

    // 修改 密码
    String changePwd(User user, String oldPwd, String newPwd, String reNewPwd);

    // 获取 病历量
    List<DataAmount> getDataAmount(int hospitalId, List<Integer> hospitalList);

    // 根据 医院ID 获取 医院信息
    Hospital getHospitalMsg(int hid);

    // 根据 用户ID 获取 区域信息
    Area getAreaMsg(int uid);

    // 根据 区域负责人ID 获取区域下 所有医院ID
    List<Integer> getAreaHospitalId(int uid);

    // 获取 首页 数据
    String getData(String selectType, Date startDate, Date endDate, int inHospital, int hospitalId, List<Integer> hospitalList);

    // 反馈 上传 图片
    String uploadImg(MultipartFile file);

    // 反馈 保存
    String saveFeedback(Feedback feedback, User user);

    // 根据 用户ID 获取 反馈信息
    List<Feedback> getFeedback(int uid);

    // 根据 用户ID 获取 反馈 回复
    List<Feedback> getFeedbackReply(int fid);
}