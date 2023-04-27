package com.pnsrcp.web.dao.manage;

import com.pnsrcp.web.entity.manage.Area;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

/**
 * @Project: 围产新生儿科研合作平台
 * @Author: Linyer
 * @Email: linyer@linyer.cn
 * @Date: 2021/7/5 16:53 星期一
 * @Description: 区域信息 数据层
 */
@Mapper
public interface AreaMapper {
    /**
     * 获取 区域信息
     * @param aid 区域ID
     * @param uid 用户ID
     * @return 区域信息
     */
    List<Area> areaQuery(@Param("aid") int aid, @Param("uid") int uid);

    /**
     * 获取 区域 状态
     * @param aid 区域ID
     * @return 区域 状态
     */
    int areaStatusQry(@Param("aid") int aid);

    /**
     * 插入 区域
     * @param area 区域
     * @return 改变的行数
     */
    int areaInsert(@Param("area") Area area);

    /**
     * 更新 区域信息
     * @param area 区域
     * @return 改变的行数
     */
    int areaUpdate(@Param("area") Area area);

    /**
     * 更新 区域状态
     * @param status 区域状态
     * @param aid 区域ID
     * @return 改变的行数
     */
    int areaStatusUpdate(@Param("status") int status, @Param("aid") int aid);

    /**
     * 更新 区域下属医院数量
     * @param aid 区域ID
     * @return 改变的行数
     */
    int areaHospitalNumUpdate(@Param("aid") int aid);

    /**
     * 获取 此医院所属 所有区域ID
     * @param hid 医院ID
     * @return 区域ID
     */
    List<Integer> thisHospitalAreaQry(@Param("hid") int hid);

    /**
     * 根据区域负责人ID 获取 趋区域ID
     * @param uid 用户ID
     * @return 区域ID
     */
    int areaChargePersonId(@Param("uid") int uid);
}
