package com.pnsrcp.web.entity.perintalPlatform.highBilirubin;

import lombok.Getter;
import lombok.Setter;
import org.springframework.format.annotation.DateTimeFormat;

import java.util.Date;

/**
 * @Project: 围产新生儿科研合作平台
 * @Author: Linyer
 * @Email: linyer@linyer.cn
 * @Date: 2022/05/25 10:04 星期三
 * @Description: 高胆数据库 随访结论
 */
@Getter
@Setter
public class HBFollowUpConclusion {
    private int cid;
    private int mid;
    @DateTimeFormat(pattern="yyyy-MM-dd HH:mm:ss")
    private Date evaluationDate;
    private String kernicterusCategory;
    private String kernicterusSeverity;
    private int cerebralPalsy = 0;
    private int cerebralPalsyPredisposition = 0;
    private int epilepsy = 0;
    private int cognitiveImpairment = 0;
    private int hearingImpairment = 0;
    private int eyeMovementDisorder = 0;
    private int extrapyramidalMovementDisorder = 0;
    private int toothEnamelDysplasia = 0;
    private int motorRetardation = 0;
    private int neurodevelopmentalDelay = 0;
    private String others;
}
