package com.pnsrcp.web.entity.perintalPlatform.basicDatabse;

import lombok.Getter;
import lombok.Setter;
import org.springframework.format.annotation.DateTimeFormat;

import java.util.Date;

/**
 * @Project: 围产新生儿科研合作平台
 * @Author: Linyer
 * @Email: linyer@linyer.cn
 * @Date: 2021/8/5 16:45 星期四
 * @Description: 基础数据库 宝宝情况
 */
@Getter
@Setter
public class BDBabySituation {
    private Integer cid;
    private Integer mid;
    private String pcNewbornNum;
    private String fullName;
    @DateTimeFormat(pattern="yyyy-MM-dd HH:mm:ss")
    private Date birthday;
    @DateTimeFormat(pattern="yyyy-MM-dd HH:mm:ss")
    private Date ruptureDate;
    private String ruptureTime;
    private String fetalPosition;
    private String pregnancyNumber;
    private String birthNumber;
    private String abortionNumber;
    private String deliveryMethod;
    private String cesareanSectionReason;
    private int multicellularNumber;
    private String gender;
    private String twins;
    private String threeBirths;
    private String gestationalAgeWeek;
    private String gestationalAgeDay;
    private String birthWeight;
    private String birthHeadCircumference;
    private String birthLength;
    private String bodyTemperatureWithin1hAfterBirth;
    private String maternalWeightGainRate;
    private int whetherHospitalized = 0;
    private String childSource;
    @DateTimeFormat(pattern="yyyy-MM-dd HH:mm:ss")
    private Date childHospitalizationDate;
    @DateTimeFormat(pattern="yyyy-MM-dd HH:mm:ss")
    private Date newbornEnterRoomDate;
    private String childHospitalNum;
    private String birthHospital;
    private int childrenPaymentMethodLocalResidentsMedicalInsurance = 0;
    private int childrenPaymentMethodOffSiteMedicalInsurance = 0;
    private int childrenPaymentMethodResidentsMinimumLivingGuarantee = 0;
    private int childrenPaymentMethodSocialAssistance = 0;
    private int childrenPaymentMethodBusinessInsurance = 0;
    private int childrenPaymentMethodOwnExpense = 0;
}