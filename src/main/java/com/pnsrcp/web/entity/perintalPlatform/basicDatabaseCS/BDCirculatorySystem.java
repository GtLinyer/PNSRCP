package com.pnsrcp.web.entity.perintalPlatform.basicDatabaseCS;

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
 * @Date: 2021/10/6 16:11 星期三
 * @Description: 基础数据库 循环系统
 */
@Getter
@Setter
@TableName("pc_bd_circulatory_system")
public class BDCirculatorySystem {
    @TableId
    private Integer cid;
    private Integer mid;
    private int pphn = 0;
    @DateTimeFormat(pattern="yyyy-MM-dd")
    private Date pphnDiagnosisDate;
    private String highestFiO2;
    private int sildenafil = 0;
    @DateTimeFormat(pattern="yyyy-MM-dd HH:mm:ss")
    private Date sildenafilStartTime;
    @DateTimeFormat(pattern="yyyy-MM-dd HH:mm:ss")
    private Date sildenafilEndTime;
    private int noInhalation = 0;
    @DateTimeFormat(pattern="yyyy-MM-dd HH:mm:ss")
    private Date noInhalationStartTime;
    @DateTimeFormat(pattern="yyyy-MM-dd HH:mm:ss")
    private Date noInhalationEndTime;
    private int methemoglobin = 0;
    private int abnormalBloodClottingFunction = 0;
    private String minimumHb;
    private int patentDuctusArteriosus = 0;
    private String pdaUltrasoundNumber;
    private int pdaTreatment = 0;
    private String pdaTreatmentNumber;
    private int pdaSurgicalLigation = 0;
    private int pdaInterventionalBlockage = 0;
    private int pdaClosesAfterTreatment = 0;
    private int arrhythmia = 0;
    @DateTimeFormat(pattern="yyyy-MM-dd")
    private Date arrhythmiaDiagnosisDate;
    private int shock = 0;
    @DateTimeFormat(pattern="yyyy-MM-dd")
    private Date shockDiagnosisDate;
    private int heartFailure = 0;
    @DateTimeFormat(pattern="yyyy-MM-dd")
    private Date heartFailureDiagnosisDate;
    private int ischemicHypoxicMyocardialDamage = 0;
    @DateTimeFormat(pattern="yyyy-MM-dd")
    private Date ihmdDiagnosisDate;
}
