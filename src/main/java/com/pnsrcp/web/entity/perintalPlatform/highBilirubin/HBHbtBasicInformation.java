package com.pnsrcp.web.entity.perintalPlatform.highBilirubin;

import lombok.Getter;
import lombok.Setter;
import org.springframework.format.annotation.DateTimeFormat;

import java.util.Date;

/**
 * @Project: 围产新生儿科研合作平台
 * @Author: Linyer
 * @Email: linyer@linyer.cn
 * @Date: 2022/05/14 18:02 星期六
 * @Description: 围产新生儿科研合作平台 高胆数据库 高胆治疗 基本信息
 */
@Getter
@Setter
public class HBHbtBasicInformation {
    private int cid;
    private int mid;
    private int multicellularNumber;
    private String childFullName;
    private String childHospitalNumber;
    private String pcHbChildNum;
    private String gender;
    private String gestationalAgeWeek;
    private String gestationalAgeDay;
    @DateTimeFormat(pattern="yyyy-MM-dd HH:mm:ss")
    private Date birthday;
    private String birthWeight;
    private String birthHeadCircumference;
    private String birthLength;
    private String birthApgarScore1Min;
    private String birthApgarScore5Min;
    private String birthApgarScore10Min;
    @DateTimeFormat(pattern="yyyy-MM-dd HH:mm:ss")
    private Date admissionDate;
    private String admissionDayAge;
    private String admissionWeight;
    private String admissionBodyTemperature;
}
