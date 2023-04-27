package com.pnsrcp.web.entity.perintalPlatform.basicDatabaseCS;

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
 * @Date: 2022/1/19 0:56 星期三
 * @Description: 基础数据库 循环系统 PDA超声
 */
@Getter
@Setter
@TableName("pc_bd_cs_pda_ultrasound")
public class BDCSPdaUltrasound {
    @TableId(type = IdType.AUTO)
    private Integer id;
    private int cid;
    private int mid;
    @DateTimeFormat(pattern="yyyy-MM-dd HH:mm:ss")
    private Date ultrasoundTime;
    private String ultrasoundResult;
    private String arterialCatheterInnerDiameter;
    private String leftAtriumOrAortaInnerDiameter;
    private String pulmonaryValveDiastolicRegurgitation;
    private String mainlyDivertFromLeftToRight;
}
