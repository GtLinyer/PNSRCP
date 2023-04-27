package com.pnsrcp.web.entity.perintalPlatform.highBilirubin;

import lombok.Getter;
import lombok.Setter;

/**
 * @Project: 围产新生儿科研合作平台
 * @Author: Linyer
 * @Email: linyer@linyer.cn
 * @Date: 2022/05/17 19:06 星期二
 * @Description: 围产新生儿科研合作平台 高胆数据库 高胆治疗 高胆病因
 */
@Getter
@Setter
public class HBHbtHighBilirubinCauses {
    private int cid;
    private int mid;
    private int cmvVirusInfection = 0;
    private int congenitalSyphilis = 0;
    private int diagnosedSepsis = 0;
    private int otherCausesBacterialInfections = 0;
    private int clinicalSepsis = 0;
    private int otherTorchInfections = 0;
    private int headHematoma = 0;
    private int intracranialHemorrhage = 0;
    private int abdominalOrganHemorrhage = 0;
    private int aboHemolysis = 0;
    private int rhHemolysis = 0;
    private int g6pdDefect = 0;
    private int otherCausesHemolysis = 0;
    private int skinEcchymosis = 0;
    private int breastMilkJaundice = 0;
    private int tooLittleIntakeIncreasedEnterohepaticCirculation = 0;
    private int metabolicAcidosis = 0;
    private int hypothyroidism = 0;
    private int tpnRelatedCholestasis = 0;
    private int isGeneticFactors = 0;
    private String geneticFactors;
    private String geneticFactorsOther;
}
