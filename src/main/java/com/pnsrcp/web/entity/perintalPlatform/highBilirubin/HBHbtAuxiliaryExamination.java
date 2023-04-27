package com.pnsrcp.web.entity.perintalPlatform.highBilirubin;

import lombok.Getter;
import lombok.Setter;

/**
 * @Project: 围产新生儿科研合作平台
 * @Author: Linyer
 * @Email: linyer@linyer.cn
 * @Date: 2022/05/21 20:15 星期六
 * @Description: 围产新生儿科研合作平台 高胆数据库 高胆治疗 辅助检查
 */
@Getter
@Setter
public class HBHbtAuxiliaryExamination {
    private int cid;
    private int mid;
    private String baepRightEar;
    private String baepLeftEar;
    private String baepResult;
    private String baepFollowUpAdvice;
    private String mriResult;
    private String mriResultOther;
    private String mriFollowUpAdvice;
    private String aiEegResult;
    private String aiEegFollowUpAdvice;
    private String gmsWrithingMotionStage;
    private String gmsRestlessMovementStage;
    private String gmsFollowUpAdvice;
}
