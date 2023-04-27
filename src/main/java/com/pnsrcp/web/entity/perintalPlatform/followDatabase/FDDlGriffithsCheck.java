package com.pnsrcp.web.entity.perintalPlatform.followDatabase;

import lombok.Getter;
import lombok.Setter;
import org.springframework.format.annotation.DateTimeFormat;

import java.util.Date;

/**
 * @Project: 围产新生儿科研合作平台
 * @Author: Linyer
 * @Email: linyer@linyer.cn
 * @Date: 2022/07/05 14:02 星期二
 * @Description: 随访数据库 发育水平 Griffiths量表 检查
 */
@Getter
@Setter
public class FDDlGriffithsCheck {
    private int id;
    private int cid;
    private int mid;
    @DateTimeFormat(pattern="yyyy-MM-dd")
    private Date griffithsCheckDate;
    private String cgaWeek;
    private String cgaDay;
    private String correctedAgeMonth;
    private String correctedAgeDay;
    private String sport;
    private String individualSociety;
    private String listeningSpeakingAbility;
    private String handEyeCoordination;
    private String visualManipulationAbility;
    private String totalScore;
}
