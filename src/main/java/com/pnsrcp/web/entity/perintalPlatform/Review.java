package com.pnsrcp.web.entity.perintalPlatform;

import lombok.Getter;
import lombok.Setter;

import java.util.Date;

/**
 * @Project: 围产新生儿科研合作平台
 * @Author: Linyer
 * @Email: linyer@linyer.cn
 * @Date: 2021/7/12 19:59 星期一
 * @Description: 围产平台 审核 实体类
 */
@Getter
@Setter
public class Review {
    private int id;
    private int mid;
    private int cid;
    private String reviewerName;
    private int status;
    private String problem;
    private Date createTime;

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
