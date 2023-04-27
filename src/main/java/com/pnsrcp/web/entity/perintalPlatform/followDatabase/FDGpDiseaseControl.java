package com.pnsrcp.web.entity.perintalPlatform.followDatabase;

import lombok.Getter;
import lombok.Setter;

/**
 * @Project: 围产新生儿科研合作平台
 * @Author: Linyer
 * @Email: linyer@linyer.cn
 * @Date: 2022/07/13 12:56 星期三
 * @Description: 随访数据库 成长历程 疾病防治
 */
@Getter
@Setter
public class FDGpDiseaseControl {
    private int id;
    private int cid;
    private int mid;
    private String correctedAge;
    private String anemia;
    private String malnutrition;
    private String rickets;
    private String metabolicBoneDisease;
    private String lungFunction;
    private String leukomalacia;
    private String hearingImpairment;
    private String visualImpairment;
    private String cerebralPalsy;
    private String motorDevelopmentalDelay;
    private String languageDelay;
    private String cognitiveDelay;
    private String psychobehavioralProblems;
}
