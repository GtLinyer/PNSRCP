package com.pnsrcp.web.entity.perintalPlatform.parentalPsychology;

import lombok.Getter;
import lombok.Setter;
import org.springframework.format.annotation.DateTimeFormat;

import java.util.Date;

/**
 * @Project: 围产新生儿科研合作平台
 * @Author: Linyer
 * @Email: linyer@linyer.cn
 * @Date: 2021/8/24 18:21 星期二
 * @Description: 围产新生儿科研合作平台 父母心理库 产后 EPDE评分
 */
@Getter
@Setter
public class PPPoEpds {
    private int id;
    private int mid;
    @DateTimeFormat(pattern="yyyy-MM-dd")
    private Date evaluationDate;
    private int daysAfterBirth;
    private String evaluationMethod;
    private int epdsScore;
}
