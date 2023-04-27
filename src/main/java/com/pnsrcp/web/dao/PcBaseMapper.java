package com.pnsrcp.web.dao;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import org.apache.ibatis.annotations.Mapper;

/**
 * @Project: 围产新生儿科研合作平台
 * @Author: Linyer
 * @Email: linyer@linyer.cn
 * @Date: 2022/07/30 16:15 星期六
 * @Description: 围产新生儿科研合作平台 对于 Mybatis-Plus 拓展BaseMapper类
 */
@Mapper
public interface PcBaseMapper<T> extends BaseMapper<T> {
    /**
     * 主键 不存在 插入数据， 不存在 则 更新数据
     * @param t 实体类
     * @return 改变的行数
     */
    int insertOrUpdate(T t);
}