package com.pnsrcp.web.entity.perintalPlatform.basicDatabaseNS;

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
 * @Date: 2022/07/26 01:52 星期二
 * @Description: 基础数据库 循环系统 脑电图
 */
@Getter
@Setter
@TableName("pc_bd_ns_eeg")
public class BDNsEeg {
    @TableId(type = IdType.AUTO)
    private Integer id;
    private int cid;
    private int mid;
    @DateTimeFormat(pattern="yyyy-MM-dd HH:mm:ss")
    private Date inspectionTime;
    private String inspectionResult;
    private String waveformSituation;
}
