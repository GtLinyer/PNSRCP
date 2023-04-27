package com.pnsrcp.web.entity.perintalPlatform.researchDatabase;

import lombok.Getter;
import lombok.Setter;
import org.springframework.format.annotation.DateTimeFormat;

import java.util.Date;

/**
 * @Project: 围产新生儿科研合作平台
 * @Author: Linyer
 * @Email: linyer@linyer.cn
 * @Date: 2022/06/01 17:43 星期三
 * @Description: 围产新生儿科研合作平台 研究数据库 低体温QI
 */
@Getter
@Setter
public class RDHypothermiaQI {
    private int cid;
    private int mid;
    @DateTimeFormat(pattern="yyyy-MM-dd HH:mm:ss")
    private Date birthday;
    private String newbornEnterRoomTimeAge;
    @DateTimeFormat(pattern="yyyy-MM-dd HH:mm:ss")
    private Date newbornEnterRoomDate;
    private String newbornEnterRoomBodyTemperature;
    @DateTimeFormat(pattern="yyyy-MM-dd HH:mm:ss")
    private Date afterBirth10MinTime;
    private String afterBirth10MinBodyTemperature;
    private String afterEnterRoom30MinBodyTemperature;
    private String afterEnterRoom60MinBodyTemperature;
    private String afterEnterRoom90MinBodyTemperature;
    private String afterEnterRoom120MinBodyTemperature;
    private String minimumBodyTemperatureTime;
    private String minimumBodyTemperature;
    private String bodyTemperatureReturnsNormalTime;
    private String returnsNormalBodyTemperature;
}