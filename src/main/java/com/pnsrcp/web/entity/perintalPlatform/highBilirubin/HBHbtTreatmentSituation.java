package com.pnsrcp.web.entity.perintalPlatform.highBilirubin;

import lombok.Getter;
import lombok.Setter;

/**
 * @Project: 围产新生儿科研合作平台
 * @Author: Linyer
 * @Email: linyer@linyer.cn
 * @Date: 2022/05/18 13:21 星期三
 * @Description: 围产新生儿科研合作平台 高胆数据库 高胆治疗 治疗情况
 */
@Getter
@Setter
public class HBHbtTreatmentSituation {
    private int cid;
    private int mid;
    private int antibiotic = 0;
    private int ivig = 0;
    private int albumin = 0;
    private int phenobarbital = 0;
    private int glucocorticoids = 0;
    private int probiotics = 0;
    private int oralChineseMedicineTreatment = 0;
    private int androdeoxycholicAcid = 0;
    private int rehydration = 0;
    private String rehydrationDuration;
    private int hasOtherDrugs = 0;
    private String otherDrugs;
}
