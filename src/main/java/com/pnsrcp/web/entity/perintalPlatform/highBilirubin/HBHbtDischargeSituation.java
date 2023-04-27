package com.pnsrcp.web.entity.perintalPlatform.highBilirubin;

import lombok.Getter;
import lombok.Setter;
import org.springframework.format.annotation.DateTimeFormat;

import java.util.Date;

/**
 * @Project: 围产新生儿科研合作平台
 * @Author: Linyer
 * @Email: linyer@linyer.cn
 * @Date: 2022/05/21 21:15 星期六
 * @Description: 围产新生儿科研合作平台 高胆数据库 出院情况 基本信息
 */
@Getter
@Setter
public class HBHbtDischargeSituation {
    private int cid;
    private int mid;
    private String bilirubinLevelsDiagnosis;
    private String bilirubinNeurotoxicity;
    private int whetherEncephalopathySymptomsWhenAdmission = 0;
    @DateTimeFormat(pattern="yyyy-MM-dd HH:mm:ss")
    private Date encephalopathyTime;
    @DateTimeFormat(pattern="yyyy-MM-dd HH:mm:ss")
    private Date dischargeTime;
    private String dischargeWeight;
    private String dischargePrognosis;
    private String hospitalCosts;
}
