package com.pnsrcp.web.entity.perintalPlatform.BasicDatabaseRTS;

import com.baomidou.mybatisplus.annotation.IdType;
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
 * @Date: 2021/9/11 13:56 星期六
 * @Description: 基础数据库 呼吸系统 有创通气
 */
@Getter
@Setter
@TableName("pc_bd_rts_weaning_situation")
public class BDRTSInvasiveVentilation {
    @TableId(type = IdType.AUTO)
    private Integer id;
    private int cid;
    private int mid;
    private String ivMethod;
    @DateTimeFormat(pattern="yyyy-MM-dd HH:mm:ss")
    private Date ivStartTime;
    private String ivInterval;
    private int ivWeaningFailed = 0;
    @DateTimeFormat(pattern="yyyy-MM-dd HH:mm:ss")
    private Date ivEndTime;
    private String ivUseTimeDay;
    private String ivUseTimeHour;
    private int bloodGasAnalysisWhenWeaning = 0;
    private String bgaIvWeaningPh;
    private String bgaIvWeaningBloodOxygenSaturation;
    private String bgaIvWeaningLacticAcid;
    private String bgaIvWeaningPaO2;
    private String bgaIvWeaningPaCO2;
    private String bgaIvWeaningBE;
    private String bgaIvWeaningHCO3;
    private String bgaIvWeaningHgb;
    private String ivWeaningParamFiO2;
    private String ivWeaningParamMap;
    private String ivWeaningParamPip;
    private String ivWeaningParamPeep;
    private String ivWeaningParamDeltaP;
    private String ivWeaningParamHfho;
    private String ivWeaningParamOI;
    private String afterWeaningNivMethod;
    private String afterWeaningNivParamFiO2;
    private String afterWeaningNivParamPeep;
    private String afterWeaningNivParamPip;
}
