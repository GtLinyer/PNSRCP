package com.pnsrcp.web.entity.perintalPlatform.basicDatabse;

import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Getter;
import lombok.Setter;

/**
 * @Project: 围产新生儿科研合作平台
 * @Author: Linyer
 * @Email: linyer@linyer.cn
 * @Date: 2021/8/28 21:55 星期六
 * @Description: 基础数据库 危重评分
 */
@Getter
@Setter
@TableName("pc_bd_critical_assessment")
public class BDCriticalAssessment {
    @TableId
    private Integer cid;
    private int mid;
    private String heartRate;
    private String systolicBloodPressure;
    private String breathe;
    private String paO2;
    private String lowestSerumPH;
    private String naP;
    private String kP;
    private String cr;
    private String bun;
    private String hematocrit;
    private int bloating = 0;
    private int gastrointestinalBleeding = 0;
    private String neonatalCriticalCaseScore;
    private String diastolicBloodPressure;
    private String meanBloodPressure;
    private String minimumBodyTemperature;
    private String inhaledOxygenConcentration;
    private String paO2Fio2Ratio;
    private String seizuresNumber;
    private String urineVolume;
    private String snap2Score;
    private String birthWeight;
    private int childYoungerThanGestationalAge = 0;
    private String apgarScore5Min;
    private String snappe2Score;
    private String gestationalAgeWeek;
    private String congenitalMalformations;
    private String smallestBE;
    private String smallestFiO2;
    private String largestFiO2;
    private String cribScore;
    private String gender;
    private String admissionTemperature;
    private String crib2Score;
    private String lacticAcidHighestValue;
    private String lowestBloodSugar;
    private String highestBloodSugar;
    private String lowestSerumProtein;
    private String lowestPlateletValue;
    private String lowestHemoglobin;
}
