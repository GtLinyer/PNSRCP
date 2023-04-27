package com.pnsrcp.web.entity.perintalPlatform.basicDatabaseDGS;

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
 * @Date: 2021/12/30 1:40 星期四
 * @Description: 基础数据库 消化系统 禁食原因 数据
 */
@Getter
@Setter
@TableName("pc_bd_dgs_fr_data")
public class BDDGSFrData {
    @TableId(type = IdType.AUTO)
    private Integer id;
    private int cid;
    private int mid;
    private int fastTime;
    @DateTimeFormat(pattern="yyyy-MM-dd HH:mm:ss")
    private Date fastStartTime;
    @DateTimeFormat(pattern="yyyy-MM-dd HH:mm:ss")
    private Date fastEndTime;
    private String fastDays;
    private int fastReasonsUnstableBreathing = 0;
    private int fastReasonsGastricRetention = 0;
    private int fastReasonsPdaTreatment = 0;
    private int fastReasonsUmbilicalVeinCatheter = 0;
    private int fastReasonsBloating = 0;
    private int fastReasonsBloodInStool = 0;
    private int fastReasonsVomit = 0;
    private int fastReasonsGastroesophagealReflux = 0;
    private String fastReasonsOther;
}
