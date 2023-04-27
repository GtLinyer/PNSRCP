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
 * @Date: 2021/11/13 0:12 星期六
 * @Description: 基础数据库 消化系统 肠外营养 置管
 */
@Getter
@Setter
@TableName("pc_bd_dgs_pn_tp")
public class BDDGSPnTp {
    @TableId(type = IdType.AUTO)
    private Integer id;
    private int cid;
    private int mid;
    private String tubePlacement;
    @DateTimeFormat(pattern="yyyy-MM-dd HH:mm:ss")
    private Date startTpDate;
    @DateTimeFormat(pattern="yyyy-MM-dd HH:mm:ss")
    private Date endTpDate;
    private String totalDays;
}
