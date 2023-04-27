package com.pnsrcp.web.entity.perintalPlatform.highBilirubin;

import lombok.Getter;
import lombok.Setter;
import org.springframework.format.annotation.DateTimeFormat;

import java.util.Date;

/**
 * @Project: 围产新生儿科研合作平台
 * @Author: Linyer
 * @Email: linyer@linyer.cn
 * @Date: 2022/05/18 08:36 星期三
 * @Description: 围产新生儿科研合作平台 高胆数据库 高胆治疗 检查指标
 */
@Getter
@Setter
public class HBHbtCheckMetrics {
    private int cid;
    private int mid;
    private String admissionTransdermalBilirubinValue;
    private String phototherapyNumber;
    private String phototherapyTotalDuration;
    @DateTimeFormat(pattern="yyyy-MM-dd HH:mm:ss")
    private Date peakTime;
    private String peakBloodTotalBilirubin;
    private String exchangeBloodNumber;
    private String exchangeBloodTotalAmount;
}
