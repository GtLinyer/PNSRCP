package com.pnsrcp.web.entity.perintalPlatform.followDatabase;

import lombok.Getter;
import lombok.Setter;
import org.springframework.format.annotation.DateTimeFormat;

import java.util.Date;

/**
 * @Project: 围产新生儿科研合作平台
 * @Author: Linyer
 * @Email: linyer@linyer.cn
 * @Date: 2022/06/29 15:56 星期三
 * @Description: 随访数据库 生长曲线 营养 记录
 */
@Getter
@Setter
public class FDGcNutritionRecord {
    private int id;
    private int cid;
    private int mid;
    @DateTimeFormat(pattern="yyyy-MM-dd")
    private Date nutritionRecordDate;
    private String cgaWeek;
    private String cgaDay;
    private String correctedAgeMonth;
    private String correctedAgeDay;
    private String hgb;
    private String ironTherapy;
    private String oh25D3;
    private String vitaminAd;
    private String vitaminD3;
    private String diarrhea;
    private String rash;
    private String bloodyStools;
    private String respite;
    private String doctorAdvice;
}
