package com.pnsrcp.web.entity.perintalPlatform.basicDatabse;

import lombok.Getter;
import lombok.Setter;
import org.springframework.format.annotation.DateTimeFormat;

import java.util.Date;

/**
 * @Project: 围产新生儿科研合作平台
 * @Author: Linyer
 * @Email: linyer@linyer.cn
 * @Date: 2021/8/2 17:41 星期一
 * @Description: 基础数据库 母亲信息
 */
@Getter
@Setter
public class BDMotherInformation {
    private int mid;
    private String pcMotherNum;
    private String motherFullName;
    private String motherPhone;
    @DateTimeFormat(pattern="yyyy-MM-dd HH:mm:ss")
    private Date hospitalizationDate;
    private String motherHospitalNumber;
    private String motherAge;
    private String motherNation;
    private String motherLiveProvince;
    private String motherLiveCity;
    private String motherLiveCounty;
    private String motherLiveArea;
    private String motherLiveAltitude;
    private int toResidencePlaceHistory = 0;
    private String moveInYear;
    private String moveInPeriod;
    private String beforeMovingInLiveProvince;
    private String beforeMovingInLiveCity;
    private String beforeMovingInLiveCounty;
    private String beforeMovingInLiveArea;
    private String beforeMovingInLiveAltitude;
    private String diabetes;
    private String diabetesGrade;
    private String insulinTherapy;
    private String hypertension;
    private String pregnancyCholestasisIntrahepatic;
    private String abnormalMotherSThyroidFunction;
    private int otherComplicationsDuringPregnancy = 0;
    private String otherComplicationsDuringPregnancy1;
    private String otherComplicationsDuringPregnancy2;
    private String otherComplicationsDuringPregnancy3;
    private String otherComplicationsDuringPregnancy4;
    private String pregnancyRiskScreening;
    private String pregnancyRiskScreeningLevel;
    private String prenatalCare;
    private String firstPregnancyCheckUpCard;
    private String prenatalCareNumber;
    private String fullInspectionsNumber;
}
