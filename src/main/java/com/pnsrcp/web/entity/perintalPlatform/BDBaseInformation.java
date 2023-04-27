package com.pnsrcp.web.entity.perintalPlatform;

import lombok.Getter;
import lombok.Setter;

/**
 * @Project: 围产新生儿科研合作平台
 * @Author: Linyer
 * @Email: linyer@linyer.cn
 * @Date: 2021/10/26 13:48 星期二
 * @Description: 围产新生儿科研合作平台 抬头 基本数据
 */
@Getter
@Setter
public class BDBaseInformation {
    private String pcMotherNum;
    private String pcChildNum;
    private String motherHospitalNum;
    private String childHospitalNum;
    private String childFullName;
}
