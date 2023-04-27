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
 * @Date: 2021/9/9 20:32 星期四
 * @Description: 基础数据库 呼吸系统 HFNC失败
 */
@Getter
@Setter
@TableName("pc_bd_rts_hfnc_failed")
public class BDRTSHfncFailed {
    @TableId
    private Integer cid;
    private int mid;
    private int initialHFNC = 0;
    private int initialHfncFailed = 0;
    @DateTimeFormat(pattern="yyyy-MM-dd HH:mm:ss")
    private Date startHfncTime;
    @DateTimeFormat(pattern="yyyy-MM-dd HH:mm:ss")
    private Date endHfncTime;
    private String hfncUseTimeDay;
    private String hfncUseTimeHour;
    private String respiratorySupportMethodAfterHFNC;
    private String hfncStopReason;
    private int beginHfncBloodGasAnalysis = 0;
    private String bgaBeginHfncPh;
    private String bgaBeginHfncBloodOxygenSaturation;
    private String bgaBeginHfncLacticAcid;
    private String bgaBeginHfncPaO2;
    private String bgaBeginHfncPaCO2;
    private String bgaBeginHfncBE;
    private String bgaBeginHfncHCO3;
    private String bgaBeginHfncHgb;
    private String startHfncParamFlow;
    private String startHfncParamFiO2;
    private String startHfncParamOI;
    private int stopHfncBloodGasAnalysis = 0;
    private String bgaStopHfncPh;
    private String bgaStopHfncBloodOxygenSaturation;
    private String bgaStopHfncLacticAcid;
    private String bgaStopHfncPaO2;
    private String bgaStopHfncPaCO2;
    private String bgaStopHfncBE;
    private String bgaStopHfncHCO3;
    private String bgaStopHfncHgb;
    private String endHfncParamFlow;
    private String endHfncParamFiO2;
    private String endHfncParamOI;
}
