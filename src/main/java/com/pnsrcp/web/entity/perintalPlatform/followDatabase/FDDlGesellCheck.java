package com.pnsrcp.web.entity.perintalPlatform.followDatabase;

import lombok.Getter;
import lombok.Setter;
import org.springframework.format.annotation.DateTimeFormat;

import java.util.Date;

/**
 * @Project: 围产新生儿科研合作平台
 * @Author: Linyer
 * @Email: linyer@linyer.cn
 * @Date: 2022/07/04 14:53 星期一
 * @Description: 随访数据库 发育水平 Gesell量表 检查
 */
@Getter
@Setter
public class FDDlGesellCheck {
    private int id;
    private int cid;
    private int mid;
    @DateTimeFormat(pattern="yyyy-MM-dd")
    private Date gesellCheckDate;
    private String cgaWeek;
    private String cgaDay;
    private String correctedAgeMonth;
    private String correctedAgeDay;
    private String adaptability;
    private String bigMovement;
    private String fineMotor;
    private String language;
    private String personalSocial;
}
