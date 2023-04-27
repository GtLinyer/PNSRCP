package com.pnsrcp.web.entity.perintalPlatform.researchDatabase;

import lombok.Getter;
import lombok.Setter;
import org.springframework.format.annotation.DateTimeFormat;

import java.util.Date;

/**
 * @Project: 围产新生儿科研合作平台
 * @Author: Linyer
 * @Email: linyer@linyer.cn
 * @Date: 2022/05/31 20:39 星期二
 * @Description: 围产新生儿科研合作平台 研究数据库 低体温QI 信息
 */
@Getter
@Setter
public class RDHqiMsg {
    private int id;
    private int mid;
    @DateTimeFormat(pattern="yyyy-MM-dd HH:mm:ss")
    private Date birthday;
    @DateTimeFormat(pattern="yyyy-MM-dd HH:mm:ss")
    private Date newbornEnterRoomDate;
    private Double bodyTemperatureWithin1hAfterBirth;
}
