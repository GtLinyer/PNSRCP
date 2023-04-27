package com.pnsrcp.web.entity.patientCase;

import lombok.Getter;
import lombok.Setter;

import java.text.SimpleDateFormat;
import java.util.Date;

/**
 * @Project: 围产新生儿科研合作平台
 * @Author: Linyer
 * @Email: linyer@linyer.cn
 * @Date: 2022/05/14 20:09 星期六
 * @Description: 高胆 基本信息
 */
@Getter
@Setter
public class HBCaseMsg {
    private int cid;
    private int mid;
    private String pcHbMotherNum;
    private String pcHbChildNum;
    private String childFullName;
    private String gender;
    private int gestationalAgeWeek;
    private int gestationalAgeDay;
    private double birthWeight;
    private Date admissionDate;
    private Date birthday;
    private String childHospitalNumber;
    private Date dischargeTime;
    private int status;

    public String getStatusString() {
        String statusString = null;
        if (status == 0) {
            statusString = "正在填写";
        } else if (status == 1) {
            statusString = "填写完成";
        } else if (status == 2) {
            statusString = "审核不通过";
        } else if (status == 3) {
            statusString = "审核通过";
        }
        return statusString;
    }

    public String getAdmissionDate() {
        String admissionDateString = null;
        if (admissionDate != null) {
            SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
            admissionDateString = sdf.format(admissionDate);
        }
        return admissionDateString;
    }

    public String getBirthday() {
        String birthdayString = null;
        if (birthday != null) {
            SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
            birthdayString = sdf.format(birthday);
        }
        return birthdayString;
    }

    public String getDischargeTime() {
        String dischargeTimeString = null;
        if (dischargeTime != null) {
            SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
            dischargeTimeString = sdf.format(dischargeTime);
        }
        return dischargeTimeString;
    }
}
