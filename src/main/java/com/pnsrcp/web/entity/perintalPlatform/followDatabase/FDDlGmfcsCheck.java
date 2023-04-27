package com.pnsrcp.web.entity.perintalPlatform.followDatabase;

import lombok.Getter;
import lombok.Setter;
import org.springframework.format.annotation.DateTimeFormat;

import java.util.Date;

/**
 * @Project: 围产新生儿科研合作平台
 * @Author: Linyer
 * @Email: linyer@linyer.cn
 * @Date: 2022/07/06 12:48 星期三
 * @Description: 随访数据库 发育水平 GMFCS 检查
 */
@Getter
@Setter
public class FDDlGmfcsCheck {
    private int id;
    private int cid;
    private int mid;
    @DateTimeFormat(pattern="yyyy-MM-dd")
    private Date gmfcsCheckDate;
    private String cgaWeek;
    private String cgaDay;
    private String correctedAgeMonth;
    private String correctedAgeDay;
    private String gmfcsResult;
    private String sitAlone;
    private String tenStepsAlone;
    private String cerebralPalsy;
    private String cerebralPalsyTendency;
}