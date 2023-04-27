package com.pnsrcp.web.entity.perintalPlatform.basicDatabse;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Getter;
import lombok.Setter;

/**
 * @Project: 围产新生儿科研合作平台
 * @Author: Linyer
 * @Email: linyer@linyer.cn
 * @Date: 2021/8/30 2:52 星期一
 * @Description: 基础数据库 复苏情况 畸形
 */
@Getter
@Setter
@TableName("pc_bd_rs_deformity")
public class BDRSDeformity {
    @TableId(type = IdType.AUTO)
    private Integer id;
    private int cid;
    private int mid;
    private int deformitySystem;
    private int deformityType;
}
