package com.pnsrcp.web.entity.perintalPlatform.BasicDatabaseRTS;

import com.baomidou.mybatisplus.annotation.FieldStrategy;
import com.baomidou.mybatisplus.annotation.TableField;
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
 * @Date: 2021/9/10 12:20 星期五
 * @Description: 基础数据库 呼吸系统 无创通气失败
 */
@Getter
@Setter
@TableName("pc_bd_rts_niv_failed")
public class BDRTSNivFailed {
    @TableId
    private Integer cid;
    @TableField(updateStrategy = FieldStrategy.NEVER)
    private Integer mid;
    private int initialNIV = 0;
    private int initialNivFailed = 0;
    private String startNivMethod;
    @DateTimeFormat(pattern="yyyy-MM-dd HH:mm:ss")
    private Date startNivTime;
    @DateTimeFormat(pattern="yyyy-MM-dd HH:mm:ss")
    private Date endNivTime;
    private String nivUseTimeDay;
    private String nivUseTimeHour;
    private String stopAfterHour;
    private String respiratorySupportMethodAfterNIV;
    private String nivStopReason;
    private int beginNonInvasiveVentilationBloodGasAnalysis = 0;
    private String bgaBeginNivPh;
    private String bgaBeginNivBloodOxygenSaturation;
    private String bgaBeginNivLacticAcid;
    private String bgaBeginNivPaO2;
    private String bgaBeginNivPaCO2;
    private String bgaBeginNivBE;
    private String bgaBeginNivHCO3;
    private String bgaBeginNivHgb;
    private String startNivParamFiO2;
    private String startNivParamPeep;
    private String startNivParamOI;
    private int stopNonInvasiveVentilationBloodGasAnalysis = 0;
    private String bgaStopNivPh;
    private String bgaStopNivBloodOxygenSaturation;
    private String bgaStopNivLacticAcid;
    private String bgaStopNivPaO2;
    private String bgaStopNivPaCO2;
    private String bgaStopNivBE;
    private String bgaStopNivHCO3;
    private String bgaStopNivHgb;
    private String endNivParamFiO2;
    private String endNivParamPeep;
    private String endNivParamOI;
}
