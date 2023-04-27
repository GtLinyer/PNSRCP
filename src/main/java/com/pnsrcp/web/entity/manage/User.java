package com.pnsrcp.web.entity.manage;

/**
 * @Project: 围产新生儿科研合作平台
 * @Author: Linyer
 * @Email: linyer@linyer.cn
 * @Date: 2021/5/27 15:40 星期四
 * @Description: 用户实体
 */
public class User {
    private int uid;
    private String username;
    private String password;
    private String fullName;
    private String phone;
    private int level;
    private String levelString;
    private int hospitalId;
    private String hospitalName;
    private int status;
    private String statusString;

    public int getUid() {
        return uid;
    }

    public void setUid(int uid) {
        this.uid = uid;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public int getLevel() {
        return level;
    }

    public void setLevel(int level) {
        this.level = level;
    }

    public String getLevelString() {
        if (level == 1) {
            levelString = "超级管理员";
        } else if (level == 2) {
            levelString = "医院用户";
        } else if (level == 3) {
            levelString = "区域管理员";
        } else if (level == 4) {
            levelString = "普通用户";
        }
        return levelString;
    }

    public int getHospitalId() {
        return hospitalId;
    }

    public void setHospitalId(int hospitalId) {
        this.hospitalId = hospitalId;
    }

    public String getHospitalName() {
        return hospitalName;
    }

    public void setHospitalName(String hospitalName) {
        this.hospitalName = hospitalName;
    }

    public int getStatus() {
        return status;
    }

    public void setStatus(int status) {
        this.status = status;
    }

    public String getStatusString() {
        if(status == 0) {
            statusString = "停用";
        }else if(status == 1) {
            statusString = "正常使用";
        }
        return statusString;
    }
}
