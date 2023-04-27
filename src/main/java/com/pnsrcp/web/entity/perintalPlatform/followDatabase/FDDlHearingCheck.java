package com.pnsrcp.web.entity.perintalPlatform.followDatabase;

import lombok.Getter;
import lombok.Setter;
import org.springframework.format.annotation.DateTimeFormat;

import java.util.Date;

/**
 * @Project: 围产新生儿科研合作平台
 * @Author: Linyer
 * @Email: linyer@linyer.cn
 * @Date: 2022/07/04 13:50 星期一
 * @Description: 随访数据库 发育水平 听力 检查
 */
@Getter
@Setter
public class FDDlHearingCheck {
    private int id;
    private int cid;
    private int mid;
    @DateTimeFormat(pattern="yyyy-MM-dd")
    private Date hearingCheckDate;
    private String cgaWeek;
    private String cgaDay;
    private String correctedAgeMonth;
    private String correctedAgeDay;
    private String leftEarAabr;
    private String leftEarDiagnosis;
    private String rightEarAabr;
    private String rightEarDiagnosis;
}
