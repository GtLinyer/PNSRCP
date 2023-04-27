package com.pnsrcp.web.entity.perintalPlatform.highBilirubin;

import lombok.Getter;
import lombok.Setter;
import org.springframework.format.annotation.DateTimeFormat;

import java.util.Date;

/**
 * @Project: 围产新生儿科研合作平台
 * @Author: Linyer
 * @Email: linyer@linyer.cn
 * @Date: 2022/05/19 15:05 星期四
 * @Description: 围产新生儿科研合作平台 高胆数据库 高胆治疗 脑病评分
 */
@Getter
@Setter
public class HBHbtEncephalopathyScore {
    private int id;
    private int cid;
    private int mid;
    private String day;
    @DateTimeFormat(pattern="yyyy-MM-dd")
    private Date thisDate;
    private int mindState0 = 0;
    private int mindState1 = 0;
    private int mindState2 = 0;
    private int mindState3 = 0;
    private int  muscleTension0 = 0;
    private int  muscleTension1 = 0;
    private int muscleTension2 = 0;
    private int muscleTension3 = 0;
    private int cryForm0 = 0;
    private int cryForm1 = 0;
    private int cryForm2 = 0;
    private int cryForm3 = 0;
    private int allSum = 0;
}
