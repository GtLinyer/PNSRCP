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
 * @Date: 2021/9/20 0:53 星期一
 * @Description: 基础数据库 感染监测 EOS流程
 */
@Getter
@Setter
@TableName("pc_bd_is_eos")
public class BDISEos {
    @TableId
    private Integer cid;
    private int mid;
    @DateTimeFormat(pattern="yyyy-MM-dd HH:mm:ss")
    private Date afterBirth72hDate;
    private int needEvaluateWithin72h = 0;
    private String evaluationsNumber;
    private int prematureDelivery = 0;
    private int prematureRuptureMembranesGt18h = 0;
    private int lowBirthWeightInfant = 0;
    private String chorioamnionitis;
    private int bloodCulture = 0;
    private String bloodCultureNumber;
    private String positiveBloodCultureNumber;
    private String negativeBloodCultureNumber;
    private int diagnosedEarlyOnsetSepsis = 0;
    private int nonSpecificInspection = 0;
    private String routineBloodTestNumber;
    private String crpInspectionsNumber;
    private String pctInspectionsNumber;
    private int clinicalEarlyOnsetSepsis = 0;
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
