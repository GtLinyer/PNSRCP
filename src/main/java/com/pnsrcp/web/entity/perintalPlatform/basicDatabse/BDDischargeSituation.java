package com.pnsrcp.web.entity.perintalPlatform.basicDatabse;

import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Getter;
import lombok.Setter;
import org.springframework.format.annotation.DateTimeFormat;

import java.util.Date;

/**
 * @Project: 围产新生儿科研合作平台
 * @Author: Linyer
 * @Email: linyer@linyer.cn
 * @Date: 2021/10/18 23:32 星期一
 * @Description: 基础数据库 出院情况
 */
@Getter
@Setter
@TableName("pc_bd_discharge_situation")
public class BDDischargeSituation {
    @TableId
    private Integer cid;
    private int mid;
    @DateTimeFormat(pattern="yyyy-MM-dd HH:mm:ss")
    private Date dischargeDate;
    private String correctGestationalAgeWeek;
    private String correctGestationalAgeDay;
    private String hospitalStay;
    private String dischargeWeight;
    private String dischargeWeightZScore;
    private String dischargeHeadCircumference;
    private String dischargeHeadCircumferenceZScore;
    private String dischargeLength;
    private String dischargeLengthZScore;
    private int ectopicGrowthRetardation = 0;
    private String respiratorySupport;
    private String oxygenConcentration;
    private String hospitalCosts;
    private String feedingMethod;
    private String feedingAmountFormulaMilk;
    private String feedingAmountMotherBreastMilk;
    private String feedingAmountDonatedBreastMilk;
    private String totalMilk;
    private String fate;
    private String referralHospital;
    private int giveUpReasonUltraImmature = 0;
    private int giveUpReasonCongenitalMalformations = 0;
    private int giveUpReasonEconomicReasons = 0;
    private int giveUpReasonWorryPrognosis = 0;
    private int giveUpReasonOther = 0;
    @DateTimeFormat(pattern="yyyy-MM-dd")
    private String deathDate;
    private String firstLineTubeBedDoctor;
    private String secondLineTubeBedDoctor;
}
