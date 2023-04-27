package com.pnsrcp.web.entity.perintalPlatform.BasicDatabaseRTS;

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
 * @Date: 2021/9/3 0:31 星期五
 * @Description: 基础数据库 呼吸系统 呼吸支持
 */
@Getter
@Setter
@TableName("pc_bd_rts_respiratory_support")
public class BDRTSRespiratorySupport {
    @TableId
    private Integer cid;
    private int mid;
    @DateTimeFormat(pattern="yyyy-MM-dd")
    private Date afterBirth28DaysDate;
    private int ab28dCorrectGestationalAgeWeek;
    private int ab28dCorrectGestationalAgeDay;
    private String ab28dRespiratorySupportMode;
    private String ab28dFiO2;
    private String ab28dFlow;
    private String ab28dMap;
    @DateTimeFormat(pattern="yyyy-MM-dd")
    private Date correctGestationalAge36WeekDate;
    private String cga36wRespiratorySupportMode;
    private String cga36wFiO2;
    private String cga36wFlow;
    private String cga36wMap;
    @DateTimeFormat(pattern="yyyy-MM-dd")
    private Date correctGestationalAge40WeekDate;
    private String cga40wRespiratorySupportMode;
    private String cga40wFiO2;
    private String cga40wFlow;
    private String cga40wMap;
    @DateTimeFormat(pattern="yyyy-MM-dd")
    private Date dischargeDate;
    private String dischargeCorrectGestationalAgeWeek;
    private String dischargeCorrectGestationalAgeDay;
    private String dischargeRespiratorySupportMode;
    private String dischargeFiO2;
    private String dischargeFlow;
    private String dischargeMap;
    private int respiratorySupportNum;
    private int respiratorySupportDays;
    private int respiratorySupportHours;
    private int oxygenConcentrationChangeNum;
    private int totalOxygenSupplyTimeDays;
    private int totalOxygenSupplyTimeHours;

    public void setDischargeCorrectGestationalAgeWeek(String dischargeCorrectGestationalAgeWeek) {
        if (!dischargeCorrectGestationalAgeWeek.equals("")) {
            this.dischargeCorrectGestationalAgeWeek = dischargeCorrectGestationalAgeWeek;
        }
    }

    public void setDischargeCorrectGestationalAgeDay(String dischargeCorrectGestationalAgeDay) {
        if (!dischargeCorrectGestationalAgeDay.equals("")) {
            this.dischargeCorrectGestationalAgeDay = dischargeCorrectGestationalAgeDay;
        }
    }
}
