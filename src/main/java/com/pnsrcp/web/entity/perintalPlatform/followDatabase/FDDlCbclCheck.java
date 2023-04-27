package com.pnsrcp.web.entity.perintalPlatform.followDatabase;

import lombok.Getter;
import lombok.Setter;
import org.springframework.format.annotation.DateTimeFormat;

import java.util.Date;

/**
 * @Project: 围产新生儿科研合作平台
 * @Author: Linyer
 * @Email: linyer@linyer.cn
 * @Date: 2022/07/06 15:04 星期三
 * @Description: 随访数据库 发育水平 CBCL量表 检查
 */
@Getter
@Setter
public class FDDlCbclCheck {
    private int id;
    private int cid;
    private int mid;
    @DateTimeFormat(pattern="yyyy-MM-dd")
    private Date cbclCheckDate;
    private String cgaWeek;
    private String cgaDay;
    private String correctedAgeMonth;
    private String correctedAgeDay;
    private String emotionalResponse;
    private String anxietyDepression;
    private String somaticComplaints;
    private String backOff;
    private String sleepProblems;
    private String aggressiveBehavior;
    private String attentionProblem;
    private String internalizationProblem;
    private String externalAssimilationProblem;
    private String generalProblem;
}
