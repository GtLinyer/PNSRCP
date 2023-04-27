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
 * @Description: 围产新生儿科研合作平台 高胆数据库 高胆治疗 检查指标 换血
 */
@Getter
@Setter
public class HBHbtCmExchangeBlood {
    private int id;
    private int cid;
    private int mid;
    @DateTimeFormat(pattern="yyyy-MM-dd HH:mm:ss")
    private Date ebCheckTime;
    private String exchangeBloodVolume;
    private String eTransdermalBilirubinValue;
    private String eBloodTotalBilirubin;
    private String eDirectBilirubinValue;
    private String eAlt;
    private String eAst;
    private String eAlbumin;
    private String eHgb;
    private String eHct;
}
