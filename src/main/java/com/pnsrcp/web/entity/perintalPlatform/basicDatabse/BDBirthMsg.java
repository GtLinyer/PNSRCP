package com.pnsrcp.web.entity.perintalPlatform.basicDatabse;

import lombok.Getter;
import lombok.Setter;

import java.util.Date;

/**
 * @Project: 围产新生儿科研合作平台
 * @Author: Linyer
 * @Email: linyer@linyer.cn
 * @Date: 2021/10/13 17:29 星期三
 * @Description: 基础数据库 出生数据
 */
@Getter
@Setter
public class BDBirthMsg {
    private Date birthday;
    private Date childHospitalizationDate;
    private String gender;
    private String birthWeight;
    private int gestationalAgeWeek;
    private int gestationalAgeDay;
}
