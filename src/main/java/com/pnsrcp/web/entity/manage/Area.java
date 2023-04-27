package com.pnsrcp.web.entity.manage;

import lombok.Getter;
import lombok.Setter;

/**
 * @Project: 围产新生儿科研合作平台
 * @Author: Linyer
 * @Email: linyer@linyer.cn
 * @Date: 2021/6/6 15:11 星期日
 * @Description: 区域实体
 */
@Getter
@Setter
public class Area {
    private int aid;
    private String areaName;
    private String abbreviation;
    private int chargeId;
    private String chargeName;
    private String hospitalNum;
    private String username;
    private String fullName;
    private String phone;
    private int status;
}
