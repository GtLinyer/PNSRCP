package com.pnsrcp.web.entity.perintalPlatform.followDatabase;

import lombok.Getter;
import lombok.Setter;

/**
 * @Project: 围产新生儿科研合作平台
 * @Author: Linyer
 * @Email: linyer@linyer.cn
 * @Date: 2022/06/15 14:31 星期三
 * @Description: 随访数据库 生长曲线 体重 汇总
 */
@Getter
@Setter
public class FDGcBwSummary {
    private int cid;
    private int mid;
    private String weightCheckNumber;
    private String weightGainRate;
}
