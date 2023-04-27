package com.pnsrcp.web.entity.manage;

import com.pnsrcp.web.utils.RegionUtil;
import lombok.Getter;
import lombok.Setter;

/**
 * @Project: 围产新生儿科研合作平台
 * @Author: Linyer
 * @Email: linyer@linyer.cn
 * @Date: 2021/5/28 11:34 星期五
 * @Description: 医院实体
 */
@Getter
@Setter
public class Hospital {
    private int hid;
    private String hospitalName;
    private String abbreviation;
    private String province;
    private String city;
    private String county;
    private int hlId;
    private String hospitalLevel;
    private int uid;
    private String username;
    private String fullName;
    private String phone;
    private int status;
    private int caseNumber;

    public String getLocation() {
        return RegionUtil.getProvinceByCode(province) + ' ' + RegionUtil.getCityByCode(province, city) + ' ' + RegionUtil.getCountyByCode(province, city, county);
    }

    public String getStatusString() {
        if(status == 0) {
            return "停用";
        }else if(status == 1) {
            return "正常使用";
        }else {
            return null;
        }
    }
}
