package com.pnsrcp.web.entity.patientCase;

import lombok.Getter;
import lombok.Setter;

import java.text.SimpleDateFormat;
import java.util.Date;

/**
 * @Project: 围产新生儿科研合作平台
 * @Author: Linyer
 * @Email: linyer@linyer.cn
 * @Date: 2021/8/6 15:42 星期五
 * @Description: 围产新生儿科研合作平台 基本信息
 */
@Getter
@Setter
public class BDCaseMsg {
    private int cid;
    private int mid;
    private String pcMotherNum;
    private String pcNewbornNum;
    private String fullName;
    private String gender;
    private int gestationalAgeWeek;
    private int gestationalAgeDay;
    private double birthWeight;
    private Date motherHospitalizationDate;
    private Date birthday;
    private Date childHospitalizationDate;
    private String childHospitalNum;
    private Date dischargeDate;
    private int status;
    private int whetherHospitalized;

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

    public String getMotherHospitalizationDate() {
        String motherHospitalizationDateString = null;
        if (motherHospitalizationDate != null) {
            SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
            motherHospitalizationDateString = sdf.format(motherHospitalizationDate);
        }
        return motherHospitalizationDateString;
    }

    public String getBirthday() {
        String birthdayString = null;
        if (birthday != null) {
            SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
            birthdayString = sdf.format(birthday);
        }
        return birthdayString;
    }

    public String getChildHospitalizationDate() {
        String childHospitalizationDateString = null;
        if (childHospitalizationDate != null) {
            SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
            childHospitalizationDateString = sdf.format(childHospitalizationDate);
        }
        return childHospitalizationDateString;
    }

    public String getDischargeDate() {
        String dischargeDateString = null;
        if (dischargeDate != null) {
            SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
            dischargeDateString = sdf.format(dischargeDate);
        }
        return dischargeDateString;
    }
}
