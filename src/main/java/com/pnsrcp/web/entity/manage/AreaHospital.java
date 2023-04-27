package com.pnsrcp.web.entity.manage;

import com.pnsrcp.web.utils.RegionUtil;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

/**
 * @Project: 围产新生儿科研合作平台
 * @Author: Linyer
 * @Email: linyer@linyer.cn
 * @Date: 2021/6/10 21:20 星期四
 * @Description: 区域设置医院实体
 */
@Getter
@Setter
public class AreaHospital {
    private String province;
    private List<Hospital> hospitalList;

    public String getProvince() {
        return RegionUtil.getProvinceByCode(province);
    }
}
