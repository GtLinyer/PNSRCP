package com.pnsrcp.web.entity.patientCase;

import lombok.Getter;
import lombok.Setter;

/**
 * @Project: 围产新生儿科研合作平台
 * @Author: Linyer
 * @Email: linyer@linyer.cn
 * @Date: 2021/12/9 23:16 星期四
 * @Description: 报表信息
 */
@Getter
@Setter
public class ReportExport {
    private int hid;
    private String hospitalName;
    private String abbreviation;
    private String caseNumber;
    private String writing;
    private String completed;
    private String reviewPass;
    private String reviewReject;
}
