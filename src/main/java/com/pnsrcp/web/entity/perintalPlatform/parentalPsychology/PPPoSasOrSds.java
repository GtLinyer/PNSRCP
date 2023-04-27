package com.pnsrcp.web.entity.perintalPlatform.parentalPsychology;

import lombok.Getter;
import lombok.Setter;
import org.springframework.format.annotation.DateTimeFormat;

import java.util.Date;

/**
 * @Project: 围产新生儿科研合作平台
 * @Author: Linyer
 * @Email: linyer@linyer.cn
 * @Date: 2021/8/26 11:57 星期四
 * @Description: 围产新生儿科研合作平台 父母心理库 产后 SAS或SDS评分
 */
@Getter
@Setter
public class PPPoSasOrSds {
    private int id;
    private int mid;
    @DateTimeFormat(pattern="yyyy-MM-dd")
    private Date evaluationDate;
    private int daysAfterBirth;
    private String evaluationMethod;
    private int totalRoughScore;
    private int standardScore;
}
