package com.pnsrcp.web.entity.perintalPlatform;

import lombok.Getter;
import lombok.Setter;

/**
 * @Project: 围产新生儿科研合作平台
 * @Author: Linyer
 * @Email: linyer@linyer.cn
 * @Date: 2021/8/26 17:11 星期四
 * @Description: 围产平台 审核 病例状态 实体类
 */
@Getter
@Setter
public class CaseStatus {
    private int status;

    public String getStatusString() {
        String statusString = null;
        if (status == 0) {
            statusString = "正在填写";
        } else if (status == 1) {
            statusString = "填写完成";
        } else if (status == 2) {
            statusString = "审核不通过";
        } else if (status == 3) {
            statusString = "审核通过";
        }
        return statusString;
    }
}
