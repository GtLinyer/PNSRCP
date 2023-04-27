package com.pnsrcp.web.entity.perintalPlatform.followDatabase;

import lombok.Getter;
import lombok.Setter;
import org.springframework.format.annotation.DateTimeFormat;

import java.util.Date;

/**
 * @Project: 围产新生儿科研合作平台
 * @Author: Linyer
 * @Email: linyer@linyer.cn
 * @Date: 2022/07/06 23:43 星期三
 * @Description: 随访数据库 成长历程 门诊就诊
 */
@Getter
@Setter
public class FDGpOutpatientVisit {
    private int id;
    private int cid;
    private int mid;
    @DateTimeFormat(pattern="yyyy-MM-dd")
    private Date visitDate;
    private String cgaWeek;
    private String cgaDay;
    private String correctedAgeMonth;
    private String correctedAgeDay;
    private String visitReason;
    private String otherReasons;
    private String doctorAdvice;
}
