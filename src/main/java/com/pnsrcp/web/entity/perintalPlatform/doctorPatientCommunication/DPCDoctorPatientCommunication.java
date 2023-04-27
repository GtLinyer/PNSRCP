package com.pnsrcp.web.entity.perintalPlatform.doctorPatientCommunication;

import lombok.Getter;
import lombok.Setter;

import java.util.Date;

/**
 * @Project: 围产新生儿科研合作平台
 * @Author: Linyer
 * @Email: linyer@linyer.cn
 * @Date: 2022/2/7 20:13 星期一
 * @Description: 医患交流库 医患沟通
 */
@Getter
@Setter
public class DPCDoctorPatientCommunication {
    private int id;
    private int cid;
    private int mid;
    private int isParents;
    private String text;
    private Date createTime;
}
