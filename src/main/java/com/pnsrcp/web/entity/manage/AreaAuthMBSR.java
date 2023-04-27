package com.pnsrcp.web.entity.manage;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Getter;
import lombok.Setter;

/**
 * @Project: 围产新生儿科研合作平台
 * @Author: Linyer
 * @Email: linyer@linyer.cn
 * @Date: 2021/8/21 21:08 星期六
 * @Description: 区域 母婴同室库权限 实体
 */
@Getter
@Setter
@TableName("pc_area_auth_mbsr")
public class AreaAuthMBSR {
    @TableId(type = IdType.AUTO)
    private Integer aid;
    private int motherBabySameRoom = 0;
    private int mbsrBloodOxygenMonitor = 0;
}
