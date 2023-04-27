package com.pnsrcp.web.entity.perintalPlatform.doctorPatientCommunication;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Getter;
import lombok.Setter;
import org.springframework.format.annotation.DateTimeFormat;

import java.util.Date;

/**
 * @Project: 围产新生儿科研合作平台
 * @Author: Linyer
 * @Email: linyer@linyer.cn
 * @Date: 2022/2/6 12:39 星期日
 * @Description: 医患交流库 母乳日志 泵奶
 */
@Getter
@Setter
@TableName("pc_dpc_bmd_pumping")
public class DPCBmdPumping {
    @TableId(type = IdType.AUTO)
    private Integer id;
    private int mid;
    @DateTimeFormat(pattern="yyyy-MM-dd HH:mm:ss")
    private Date pumpingDate;
    private String pumpingAmount;
    private String pumpingWay;
    private String pumpingLocation;
    private String breastsFeelFull;
}
