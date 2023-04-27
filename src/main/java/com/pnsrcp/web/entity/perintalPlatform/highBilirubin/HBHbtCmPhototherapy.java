package com.pnsrcp.web.entity.perintalPlatform.highBilirubin;

import lombok.Getter;
import lombok.Setter;
import org.springframework.format.annotation.DateTimeFormat;

import java.util.Date;

/**
 * @Project: 围产新生儿科研合作平台
 * @Author: Linyer
 * @Email: linyer@linyer.cn
 * @Date: 2022/05/18 08:39 星期三
 * @Description: 围产新生儿科研合作平台 高胆数据库 高胆治疗 检查指标 光疗
 */
@Getter
@Setter
public class HBHbtCmPhototherapy {
    private int id;
    private int cid;
    private int mid;
    @DateTimeFormat(pattern="yyyy-MM-dd HH:mm:ss")
    private Date pCheckTime;
    private String phototherapyDuration;
    private String pTransdermalBilirubinValue;
    private String pBloodTotalBilirubin;
    private String pDirectBilirubinValue;
    private String pAlt;
    private String pAst;
    private String pAlbumin;
    private String pHgb;
    private String pHct;
}
