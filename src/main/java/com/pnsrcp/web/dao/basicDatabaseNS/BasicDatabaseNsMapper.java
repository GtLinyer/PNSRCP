package com.pnsrcp.web.dao.basicDatabaseNS;

import com.pnsrcp.web.entity.perintalPlatform.basicDatabaseNS.BDNervousSystemNumber;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

/**
 * @Project: 围产新生儿科研合作平台
 * @Author: Linyer
 * @Email: linyer@linyer.cn
 * @Date: 2022/07/19 16:17 星期二
 * @Description: 基础数据库 神经系统 数据层
 */
@Mapper
public interface BasicDatabaseNsMapper {
    /**
     * 插入/更新 基础数据库 神经系统 超声检查（异常）次数
     * @param bdNsUltrasonographyNumber 超声检查（异常）次数
     * @return 改变的行数
     */
    int bdNsUltrasonographyNumberInsertUpdate(BDNervousSystemNumber bdNsUltrasonographyNumber);

    /**
     * 查询 基础数据库 神经系统 超声检查次数
     * @param childId 患儿ID
     * @param motherId 母亲ID
     * @return 神经系统 超声检查次数
     */
    BDNervousSystemNumber bdNsUltrasonographyNumberQry(@Param("childId") int childId, @Param("motherId") int motherId);

    /**
     * 插入/更新 基础数据库 神经系统 MRI检查（异常）次数
     * @param bdNsMriNumber MRI检查（异常）次数
     * @return 改变的行数
     */
    int bdNsMriNumberInsertUpdate(BDNervousSystemNumber bdNsMriNumber);

    /**
     * 查询 基础数据库 神经系统 MRI检查次数
     * @param childId 患儿ID
     * @param motherId 母亲ID
     * @return 神经系统 MRI检查次数
     */
    BDNervousSystemNumber bdNsMriNumberQry(@Param("childId") int childId, @Param("motherId") int motherId);

    /**
     * 插入/更新 基础数据库 神经系统 CT检查（异常）次数
     * @param bdNsCtNumber CT检查（异常）次数
     * @return 改变的行数
     */
    int bdNsCtNumberInsertUpdate(BDNervousSystemNumber bdNsCtNumber);

    /**
     * 查询 基础数据库 神经系统 CT检查次数
     * @param childId 患儿ID
     * @param motherId 母亲ID
     * @return 神经系统 CT检查次数
     */
    BDNervousSystemNumber bdNsCtNumberQry(@Param("childId") int childId, @Param("motherId") int motherId);

    /**
     * 插入/更新 基础数据库 神经系统 脑电图检查（异常）次数
     * @param bdNsEegNumber 脑电图检查（异常）次数
     * @return 改变的行数
     */
    int bdNsEegNumberInsertUpdate(BDNervousSystemNumber bdNsEegNumber);

    /**
     * 查询 基础数据库 神经系统 脑电图检查次数
     * @param childId 患儿ID
     * @param motherId 母亲ID
     * @return 神经系统 脑电图检查次数
     */
    BDNervousSystemNumber bdNsEegNumberQry(@Param("childId") int childId, @Param("motherId") int motherId);
}
