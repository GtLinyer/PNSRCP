package com.pnsrcp.web.entity.perintalPlatform;

import lombok.Getter;
import lombok.Setter;

/**
 * @Project: 围产新生儿科研合作平台
 * @Author: Linyer
 * @Email: linyer@linyer.cn
 * @Date: 2022/05/14 20:42 星期六
 * @Description: 高胆 抬头 基本数据
 */
@Getter
@Setter
public class HBBaseInformation {
    private String pcHbMotherNum;
    private String pcHbChildNum;
    private String motherHospitalNumber;
    private String childHospitalNumber;
    private String childFullName;
}
