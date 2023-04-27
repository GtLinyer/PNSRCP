package com.pnsrcp.web.entity.perintalPlatform.basicDatabaseNS;

import lombok.Getter;
import lombok.Setter;

/**
 * @Project: 围产新生儿科研合作平台
 * @Author: Linyer
 * @Email: linyer@linyer.cn
 * @Date: 2022/07/19 16:30 星期二
 * @Description: 基础数据库 循环系统 检查（异常）次数
 */
@Getter
@Setter
public class BDNervousSystemNumber {
    private int cid;
    private int mid;
    private int checkNumber;
    private int checkAbnormalNumber;
}
