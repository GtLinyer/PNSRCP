package com.pnsrcp.web.entity.perintalPlatform.highBilirubin;

import lombok.Getter;
import lombok.Setter;
import org.springframework.format.annotation.DateTimeFormat;

import java.util.Date;

/**
 * @Project: 围产新生儿科研合作平台
 * @Author: Linyer
 * @Email: linyer@linyer.cn
 * @Date: 2022/05/25 07:45 星期三
 * @Description: 围产新生儿科研合作平台 高胆数据库 随访检查 Griffiths量表
 */
@Getter
@Setter
public class HBFueGriffithsScale {
    private int id;
    private int cid;
    private int mid;
    @DateTimeFormat(pattern="yyyy-MM-dd HH:mm:ss")
    private Date griffithsScaleTime;
    private String sport;
    private String individualSociety;
    private String listeningSpeakingAbility;
    private String handEyeCoordination;
    private String visualManipulationAbility;
    private String totalScore;
}