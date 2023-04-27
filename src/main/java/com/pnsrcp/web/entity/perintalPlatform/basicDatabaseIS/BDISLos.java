package com.pnsrcp.web.entity.perintalPlatform.basicDatabaseIS;

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
 * @Date: 2021/9/23 11:53 星期四
 * @Description: 基础数据库 感染监测 LOS流程
 */
@Getter
@Setter
@TableName("pc_bd_is_los")
public class BDISLos {
    @TableId
    private Integer cid;
    private int mid;
    @DateTimeFormat(pattern="yyyy-MM-dd HH:mm:ss")
    private Date afterBirthOrGe72hDate;
    private int needEvaluateAfterBirth = 0;
    private String evaluationsNumber;
    private int prematureDelivery = 0;
    private int prematureRuptureMembranesGt18h = 0;
    private int lowBirthWeightInfant = 0;
    private int diagnosedLateOnsetSepsis = 0;
    private String dlosDiagnoseNumber;
    @DateTimeFormat(pattern="yyyy-MM-dd HH:mm:ss")
    private Date dlosDiagnoseTime;
    private int bloodCulture = 0;
    private String bloodCultureNumber;
    private String positiveBloodCultureNumber;
    private String negativeBloodCultureNumber;
    private int nonSpecificInspection = 0;
    private String routineBloodTestNumber;
    private String crpInspectionsNumber;
    private String pctInspectionsNumber;
    private int clinicalLateOnsetSepsis = 0;
    private String closDiagnoseNumber;
    @DateTimeFormat(pattern="yyyy-MM-dd HH:mm:ss")
    private String closDiagnoseTime;
    private String cerebrospinalFluidCultureNumber;
    private String positiveCerebrospinalFluidCultureNumber;
    private String negativeCerebrospinalFluidCultureNumber;
    private int purulentMeningitis = 0;
    @DateTimeFormat(pattern="yyyy-MM-dd HH:mm:ss")
    private Date purulentMeningitisDiagnosisDate;
    private int viralMeningitis = 0;
    @DateTimeFormat(pattern="yyyy-MM-dd HH:mm:ss")
    private Date viralMeningitisDiagnosisDate;
}
