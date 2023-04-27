package com.pnsrcp.web.entity.perintalPlatform.highBilirubin;

import lombok.Getter;
import lombok.Setter;

import java.util.Date;

/**
 * @Project: 围产新生儿科研合作平台
 * @Author: Linyer
 * @Email: linyer@linyer.cn
 * @Date: 2022/05/21 19:24 星期六
 * @Description: 高胆数据库 出生数据
 */
@Getter
@Setter
public class HBBirthMsg {
    private Date birthday;
    private Date admissionDate;
}
