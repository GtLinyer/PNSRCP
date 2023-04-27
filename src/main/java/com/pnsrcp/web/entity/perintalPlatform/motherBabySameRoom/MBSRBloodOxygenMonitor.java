package com.pnsrcp.web.entity.perintalPlatform.motherBabySameRoom;

import lombok.Getter;
import lombok.Setter;
import org.springframework.format.annotation.DateTimeFormat;

import java.util.Date;

/**
 * @Project: 围产新生儿科研合作平台
 * @Author: Linyer
 * @Email: linyer@linyer.cn
 * @Date: 2021/8/21 20:58 星期六
 * @Description: 围产新生儿科研合作平台 母婴同室库 血氧监测
 */
@Getter
@Setter
public class MBSRBloodOxygenMonitor {
    private int cid;
    private int mid;
    @DateTimeFormat(pattern="yyyy-MM-dd HH:mm:ss")
    private Date measuringTime;
    private int measuringTimeAfterBirth;
    private String measuringChildrenCondition;
    private double rightHandTranscutaneousOxygenSaturation;
    private double anyFootTranscutaneousOxygenSaturation;
    private int heartRate;
    private int breathe;
    private int systolicBloodPressure;
    private int diastolicBloodPressure;
    private int meanArterialPressure;
    private String congenitalScreeningResults;
    private String oxygenSaturationScreeningResults;
    private String heartMurmurTestResults;
    private int heartUltrasoundExamination = 0;
    @DateTimeFormat(pattern="yyyy-MM-dd HH:mm:ss")
    private Date heartUltrasoundExaminationTime;
    private String heartUltrasoundExaminationResult;
}
