package com.pnsrcp.web.entity.perintalPlatform.doctorPatientCommunication;

import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Getter;
import lombok.Setter;

/**
 * @Project: 围产新生儿科研合作平台
 * @Author: Linyer
 * @Email: linyer@linyer.cn
 * @Date: 2022/2/6 12:34 星期日
 * @Description: 医患交流库 母乳日志
 */
@Getter
@Setter
@TableName("pc_dpc_breast_milk_diary")
public class DPCBreastMilkDiary {
    @TableId
    private Integer cid;
    private int mid;
    private String firstPumpingTime;
    private String firstLactationTime;
    private String lactationStage2Time;
    private String lactationStage2StartTime;
    private String establishLactationTime;
    private int delayedLactation = 0;
}