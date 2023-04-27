package com.pnsrcp.web.entity.perintalPlatform.highBilirubin;

import lombok.Getter;
import lombok.Setter;

/**
 * @Project: 围产新生儿科研合作平台
 * @Author: Linyer
 * @Email: linyer@linyer.cn
 * @Date: 2022/05/14 17:35 星期六
 * @Description: 围产新生儿科研合作平台 高胆数据库 围产信息
 */
@Setter
@Getter
public class HBPerinatalInformation {
    private int mid;
    private String motherFullName;
    private String motherPhone;
    private String motherHospitalNumber;
    private String pcHbMotherNum;
    private String motherAge;
    private String motherNation;
    private String motherAboBloodType;
    private String motherRhBloodType;
    private String motherEducationalLevel;
    private String fatherAge;
    private String fatherNation;
    private String fatherAboBloodType;
    private String fatherRhBloodType;
    private String fatherEducationalLevel;
    private String pregnancyNumber;
    private String birthNumber;
    private String abortionNumber;
    private String deliveryMode;
    private String motherHypertension;
    private String pregnancyDiabetes;
    private String pregnancyIntrahepaticCholestasis;
    private String pregnancyHypothyroidism;
    private String childrenNumber;
    private String previousChildrenPhototherapy;
    private String previousChildrenExchangeBlood;
}
