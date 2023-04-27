package com.pnsrcp.web.entity.perintalPlatform.highBilirubin;

import lombok.Getter;
import lombok.Setter;
import org.springframework.format.annotation.DateTimeFormat;

import java.util.Date;

/**
 * @Project: 围产新生儿科研合作平台
 * @Author: Linyer
 * @Email: linyer@linyer.cn
 * @Date: 2022/05/22 12:10 星期日
 * @Description: 围产新生儿科研合作平台 高胆数据库 随访检查 脑干听觉诱发电位
 */
@Getter
@Setter
public class HBFueBrainstemAuditoryEvokedPotential {
    private int id;
    private int cid;
    private int mid;
    @DateTimeFormat(pattern="yyyy-MM-dd HH:mm:ss")
    private Date followUpTime;
    private String resultLeftEar;
    private String resultRightEar;
    private String followUpAdvice;
}
