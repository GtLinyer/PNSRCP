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
 * @Date: 2021/8/5 15:28 星期四
 * @Description: 基础数据库 围产信息
 */
@Getter
@Setter
@TableName("pc_bd_perinatal_information")
public class BDPerinatalInformation {
    @TableId
    private Integer mid;
    private String antenatalCortisol;
    @DateTimeFormat(pattern="yyyy-MM-dd HH:mm:ss")
    private Date antenatalCortisolStartTime;
    @DateTimeFormat(pattern="yyyy-MM-dd HH:mm:ss")
    private Date antenatalCortisolEndTime;
    private String antenatalCortisolFrequency;
    private String prenatalMagnesiumSulfate;
    private String antibioticUseWithin24HoursBeforeDelivery;
    @DateTimeFormat(pattern="yyyy-MM-dd HH:mm:ss")
    private Date deliveryDate;
    @DateTimeFormat(pattern="yyyy-MM-dd HH:mm:ss")
    private Date antibioticUseDate;
    private String antibioticUseLength;
    private String antibioticType1;
    private String antibioticType2;
    private String antibioticType3;
    private String antibioticType4;
    private String antibioticReason1;
    private String antibioticReason2;
    private String antibioticReason3;
    private int maternalUnknownOriginFever = 0;
    private String bodyTemperatureMUOF;
    private String heartRateMUOF;
    private int increasedFetalHeartRate = 0;
    private String heartRateIFHR;
    private int amnioticFluidPeculiarSmell = 0;
    private String amnioticFluidIndex;
    private int uterineTenderness = 0;
    private String motherBRWbc;
    private String motherBRNeutrophilRatio;
    private String motherBRHgb;
    private String motherBRHct;
    private String motherBRPlt;
    private String histopathologicalExamination;
    private String histopathologicalExaminationOutcome;
    private String chorioamnionitis;
    private String gbsInfection;
    private String conceptionMethod;
    private String inVitroFertilization;
    private String cervicalCerclage;
    private String cerclageGestationalAge;
    private String prenatalIntervention;
    private int piFetalBloodTransfusion = 0;
    private int piLaserAblation = 0;
    private int piAmnioticFluidReduction = 0;
    private int piDrainageCatheterPlacement = 0;
    private int piFetalReduction = 0;
    private int piChorionicVillusSampling = 0;
    private int piAmnioticFluidPunctureLT20W = 0;
    private int piOpenFetalSurgery = 0;
    private int piOther = 0;
    private String piWeek;
    private String piDay;
    private int prenatalHemorrhage = 0;
    private int placentaAnterior = 0;
    private int placentalAbruption = 0;
    private int vascularPrevia = 0;
    private int placenta = 0;
    private int otherOrUnknown = 0;
}
