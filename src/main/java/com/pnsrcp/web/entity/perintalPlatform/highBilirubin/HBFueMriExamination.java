package com.pnsrcp.web.entity.perintalPlatform.highBilirubin;

import lombok.Getter;
import lombok.Setter;
import org.springframework.format.annotation.DateTimeFormat;

import java.util.Date;

/**
 * @Project: 围产新生儿科研合作平台
 * @Author: Linyer
 * @Email: linyer@linyer.cn
 * @Date: 2022/05/22 09:30 星期日
 * @Description: 围产新生儿科研合作平台 高胆数据库 随访检查 MRI检查
 */
@Getter
@Setter
public class HBFueMriExamination {
    private int id;
    private int cid;
    private int mid;
    @DateTimeFormat(pattern="yyyy-MM-dd HH:mm:ss")
    private Date followUpTime;
    private String result;
    private String otherResult;
    private String followUpAdvice;
}
