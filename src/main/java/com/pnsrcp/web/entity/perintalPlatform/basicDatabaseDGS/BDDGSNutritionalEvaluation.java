package com.pnsrcp.web.entity.perintalPlatform.basicDatabaseDGS;

import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Getter;
import lombok.NonNull;
import lombok.Setter;
import org.springframework.format.annotation.DateTimeFormat;

import java.util.Date;

/**
 * @Project: 围产新生儿科研合作平台
 * @Author: Linyer
 * @Email: linyer@linyer.cn
 * @Date: 2021/12/1 17:57 星期三
 * @Description: 基础数据库 消化系统 营养评价
 */
@Getter
@Setter
@TableName("pc_bd_dgs_nutritional_evaluation")
public class BDDGSNutritionalEvaluation {
    @TableId
    private Integer cid;
    private int mid;
    @DateTimeFormat(pattern="yyyy-MM-dd")
    private Date birthTime;
    private String birthWeight;
    private String birthWeightZScore;
    private String birthGestationalAgeWeek;
    private String birthGestationalAgeDay;
    private int smallForGestationalAge = 0;
    private String birthWeightRecoveryDayAge;
    private String birthHeadCircumference;
    private String birthHeadCircumferenceZScore;
    private int intrauterineHeadCircumferenceGrowthRetardation = 0;
    private String birthBodyLength;
    private String birthBodyLengthZScore;
    private int intrauterineBodyLengthGrowthRetardation = 0;
    @DateTimeFormat(pattern="yyyy-MM-dd")
    private Date afterBirth7DayTime;
    private String afterBirth7DayWeight;
    private String afterBirth7DayWeightZScore;
    private String afterBirth7DayGestationalAgeWeek;
    private String afterBirth7DayGestationalAgeDay;
    private String afterBirth7DayWeightZScoreChange;
    private String afterBirth7DayAverageWeightGain;
    private String afterBirth7DayExtrauterineGrowthRetardation;
    private String afterBirth7DayHeadCircumference;
    private String afterBirth7DayHeadCircumferenceZScore;
    private String afterBirth7DayHeadCircumferenceZScoreChange;
    private String afterBirth7DayHeadCircumferenceGrowthRetardation;
    private String afterBirth7DayBodyLength;
    private String afterBirth7DayBodyLengthZScore;
    private String afterBirth7DayBodyLengthZScoreChange;
    private String afterBirth7DayBodyLengthGrowthRetardation;
    @DateTimeFormat(pattern="yyyy-MM-dd")
    private Date afterBirth14DayTime;
    private String afterBirth14DayWeight;
    private String afterBirth14DayWeightZScore;
    private String afterBirth14DayGestationalAgeWeek;
    private String afterBirth14DayGestationalAgeDay;
    private String afterBirth14DayWeightZScoreChange;
    private String afterBirth14DayAverageWeightGain;
    private String afterBirth14DayExtrauterineGrowthRetardation;
    private String afterBirth14DayHeadCircumference;
    private String afterBirth14DayHeadCircumferenceZScore;
    private String afterBirth14DayHeadCircumferenceZScoreChange;
    private String afterBirth14DayHeadCircumferenceGrowthRetardation;
    private String afterBirth14DayBodyLength;
    private String afterBirth14DayBodyLengthZScore;
    private String afterBirth14DayBodyLengthZScoreChange;
    private String afterBirth14DayBodyLengthGrowthRetardation;
    @DateTimeFormat(pattern="yyyy-MM-dd")
    private Date afterBirth21DayTime;
    private String afterBirth21DayWeight;
    private String afterBirth21DayWeightZScore;
    private String afterBirth21DayGestationalAgeWeek;
    private String afterBirth21DayGestationalAgeDay;
    private String afterBirth21DayWeightZScoreChange;
    private String afterBirth21DayAverageWeightGain;
    private String afterBirth21DayExtrauterineGrowthRetardation;
    private String afterBirth21DayHeadCircumference;
    private String afterBirth21DayHeadCircumferenceZScore;
    private String afterBirth21DayHeadCircumferenceZScoreChange;
    private String afterBirth21DayHeadCircumferenceGrowthRetardation;
    private String afterBirth21DayBodyLength;
    private String afterBirth21DayBodyLengthZScore;
    private String afterBirth21DayBodyLengthZScoreChange;
    private String afterBirth21DayBodyLengthGrowthRetardation;
    @DateTimeFormat(pattern="yyyy-MM-dd")
    private Date afterBirth28DayTime;
    private String afterBirth28DayWeight;
    private String afterBirth28DayWeightZScore;
    private String afterBirth28DayGestationalAgeWeek;
    private String afterBirth28DayGestationalAgeDay;
    private String afterBirth28DayWeightZScoreChange;
    private String afterBirth28DayAverageWeightGain;
    private String afterBirth28DayExtrauterineGrowthRetardation;
    private String afterBirth28DayHeadCircumference;
    private String afterBirth28DayHeadCircumferenceZScore;
    private String afterBirth28DayHeadCircumferenceZScoreChange;
    private String afterBirth28DayHeadCircumferenceGrowthRetardation;
    private String afterBirth28DayBodyLength;
    private String afterBirth28DayBodyLengthZScore;
    private String afterBirth28DayBodyLengthZScoreChange;
    private String afterBirth28DayBodyLengthGrowthRetardation;
    @DateTimeFormat(pattern="yyyy-MM-dd")
    private Date dischargeTime;
    private String dischargeDayAge;
    private String dischargeWeight;
    private String dischargeWeightZScore;
    private String dischargeGestationalAgeWeek;
    private String dischargeGestationalAgeDay;
    private String dischargeWeightZScoreChange;
    private String duringHospitalizationAverageWeightGain;
    private String dischargeExtrauterineGrowthRetardation;
    private String dischargeHeadCircumference;
    private String dischargeHeadCircumferenceZScore;
    private String dischargeHeadCircumferenceZScoreChange;
    private String dischargeHeadCircumferenceGrowthRetardation;
    private String dischargeBodyLength;
    private String dischargeBodyLengthZScore;
    private String dischargeBodyLengthZScoreChange;
    private String dischargeBodyLengthGrowthRetardation;
}
