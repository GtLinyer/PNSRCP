package com.pnsrcp.web.entity.perintalPlatform.basicDatabse;

import lombok.Getter;
import lombok.Setter;

/**
 * @Project: 围产新生儿科研合作平台
 * @Author: Linyer
 * @Email: linyer@linyer.cn
 * @Date: 2021/8/28 21:56 星期六
 * @Description: 基础数据库 危重评分 获取初始数据
 */
@Getter
@Setter
public class BDCAMsg {
    private int cid;
    private int mid;
    private String gender;
    private int birthWeight;
    private int gestationalAgeWeek;
    private double bodyTemperatureWithin1hAfterBirth;
    private int apgarScore5Min;
}
