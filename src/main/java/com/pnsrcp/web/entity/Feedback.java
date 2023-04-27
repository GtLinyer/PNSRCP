package com.pnsrcp.web.entity;

import lombok.Getter;
import lombok.Setter;

import java.util.Date;
import java.util.List;

/**
 * @Project: 围产新生儿科研合作平台
 * @Author: Linyer
 * @Email: linyer@linyer.cn
 * @Date: 2021/9/18 14:33 星期六
 * @Description: 围产新生儿科研合作平台 反馈
 */
@Getter
@Setter
public class Feedback {
    private int id;
    private int uid;
    private String hid;
    private String fullName;
    private String hospitalAbbr;
    private String hospitalName;
    private String feedback;
    private String fid;
    private Date createTime;
    private List<Feedback> reply;
}
