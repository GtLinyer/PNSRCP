package com.pnsrcp.web.entity.perintalPlatform.followDatabase;

import lombok.Getter;
import lombok.Setter;

/**
 * @Project: 围产新生儿科研合作平台
 * @Author: Linyer
 * @Email: linyer@linyer.cn
 * @Date: 2022/07/12 14:02 星期二
 * @Description: 随访数据库 成长历程 随访计划
 */
@Getter
@Setter
public class FDGpFollowUpPlan {
    private int id;
    private int cid;
    private int mid;
    private String correctedAge;
    private String physicalExamination;
    private String feedingGuidance;
    private String motorDevelopment;
    private String rop;
    private String hearing;
    private String vision;
    private String bloodHgb;
    private String bloodChemistry;
    private String bloodThyroidFunction;
    private String lungFunction;
    private String cranialMri;
    private String cognitiveDevelopmentAssessment;
    private String grandSportGrading;
    private String readmission;
    private String iron;
    private String vitaminD3;
    private String vitaminAd;
}
