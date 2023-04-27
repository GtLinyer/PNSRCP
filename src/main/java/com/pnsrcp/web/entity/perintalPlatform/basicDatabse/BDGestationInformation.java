package com.pnsrcp.web.entity.perintalPlatform.basicDatabse;

import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Getter;
import lombok.Setter;

/**
 * @Project: 围产新生儿科研合作平台
 * @Author: Linyer
 * @Email: linyer@linyer.cn
 * @Date: 2021/8/14 22:23 星期六
 * @Description: 基础数据库 孕期信息
 */
@Getter
@Setter
@TableName("pc_bd_gestation_information")
public class BDGestationInformation {
    @TableId
    private Integer mid;
    private String motherOccupation;
    private String motherDegree;
    private String fatherOccupation;
    private String fatherDegree;
    private String greenScore;
    private int motherPaymentMethodLocalResidentsMedicalInsurance = 0;
    private int motherPaymentMethodOffSiteMedicalInsurance = 0;
    private int motherPaymentMethodResidentsMinimumLivingGuarantee = 0;
    private int motherPaymentMethodSocialAssistance = 0;
    private int motherPaymentMethodBusinessInsurance = 0;
    private int motherPaymentMethodOwnExpense = 0;
    private String motherHeight;
    private String weightBeforePregnancy;
    private String bmiBeforePregnancy;
    private String weightBeforeDelivery;
    private String bmiBeforeDelivery;
    private String weightGainDuringPregnancy;
}
