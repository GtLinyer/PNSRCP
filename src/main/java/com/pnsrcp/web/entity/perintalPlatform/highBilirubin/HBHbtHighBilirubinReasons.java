package com.pnsrcp.web.entity.perintalPlatform.highBilirubin;

import lombok.Getter;
import lombok.Setter;
import org.springframework.format.annotation.DateTimeFormat;

import java.util.Date;

/**
 * @Project: 围产新生儿科研合作平台
 * @Author: Linyer
 * @Email: linyer@linyer.cn
 * @Date: 2022/05/18 22:19 星期三
 * @Description: 围产新生儿科研合作平台 高胆数据库 高胆原因 高胆病因
 */
@Getter
@Setter
public class HBHbtHighBilirubinReasons {
    private int cid;
    private int mid;
    @DateTimeFormat(pattern="yyyy-MM-dd HH:mm:ss")
    private Date mbsrDischargeTime;
    private int mbsrDischargeTimeAfterBirth;
    private int jaundiceEducationDuringPregnancy = 0;
    private int mbsrReceiveEducationBeforeDischarge = 0;
    private int parentsAwareHyperbilirubinemiaDangers = 0;
    private String mcAssessmentJaundiceRiskRemindFollowUpBeforeDischarge;
    private String whetherMcRemindFollowUpAfterMbsrDischarge;
    private int whetherFollowUpRequired = 0;
    private String followUpAdmission;
    private String afterDischargeToPreClinicBilirubinFollowUpNumber;
}
