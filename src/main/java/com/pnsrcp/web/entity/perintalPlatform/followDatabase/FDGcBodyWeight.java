package com.pnsrcp.web.entity.perintalPlatform.followDatabase;

import lombok.Getter;
import lombok.Setter;
import org.springframework.format.annotation.DateTimeFormat;

import java.util.Date;

/**
 * @Project: 围产新生儿科研合作平台
 * @Author: Linyer
 * @Email: linyer@linyer.cn
 * @Date: 2022/06/04 07:43 星期六
 * @Description: 随访数据库 生长曲线 体重
 */
@Getter
@Setter
public class FDGcBodyWeight {
    private int id;
    private int cid;
    private int mid;
    @DateTimeFormat(pattern="yyyy-MM-dd")
    private Date weightCheckDate;
    private String cgaWeek;
    private String cgaDay;
    private String correctedAgeMonth;
    private String correctedAgeDay;
    private String bodyWeight;
}
