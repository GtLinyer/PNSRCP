package com.pnsrcp.web.entity.perintalPlatform.followDatabase;

import lombok.Getter;
import lombok.Setter;
import org.springframework.format.annotation.DateTimeFormat;

import java.util.Date;

/**
 * @Project: 围产新生儿科研合作平台
 * @Author: Linyer
 * @Email: linyer@linyer.cn
 * @Date: 2022/06/03 23:58 星期五
 * @Description: 随访数据库 随访信息
 */
@Getter
@Setter
public class FDFollowInformation {
    private int cid;
    private int mid;
    private String childFullName;
    private String childIdCardName;
    private String motherPhone;
    private String childHospitalNum;
    @DateTimeFormat(pattern="yyyy-MM-dd HH:mm:ss")
    private Date birthday;
    private int multicellularNumber;
    private String gender;
    private String gestationalAgeWeek;
    private String gestationalAgeDay;
    private String birthWeight;
    private String birthHeadCircumference;
    private String birthBodyLength;
}
