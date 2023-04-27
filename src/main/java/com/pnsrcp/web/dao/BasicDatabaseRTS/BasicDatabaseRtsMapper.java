package com.pnsrcp.web.dao.BasicDatabaseRTS;

import com.pnsrcp.web.entity.perintalPlatform.BasicDatabaseRTS.BDRTSHfncFailed;
import com.pnsrcp.web.entity.perintalPlatform.BasicDatabaseRTS.BDRTSNivFailed;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.Map;

/**
 * @Project: 围产新生儿科研合作平台
 * @Author: Linyer
 * @Email: linyer@linyer.cn
 * @Date: 2021/8/29 16:50 星期日
 * @Description: 基础数据库 数据层
 */
@Mapper
public interface BasicDatabaseRtsMapper {
    /**
     * 插入/更新 基础数据库 呼吸系统 HFNC失败 初始HFNC
     * @param childId 患儿ID
     * @param motherId 母亲ID
     * @param initialHFNC 初始HFNC
     * @param initialHfncFailed 初始HFNC失败
     * @return 改变的行数
     */
    int bdRtsHfInitialHfncInsertUpdate(@Param("childId") int childId, @Param("motherId") int motherId, @Param("initialHFNC") int initialHFNC, @Param("initialHfncFailed") int initialHfncFailed);

    /**
     * 更新 基础数据库 呼吸系统 HFNC失败 初值更新
     * @param bdRtsHfncFailedInitial HFNC失败 初值
     * @return 改变的行数
     */
    int bdRtsHfncFailedInitialUpdate(@Param("bdRtsHfncFailedInitial") BDRTSHfncFailed bdRtsHfncFailedInitial);

    /**
     * 插入/更新 基础数据库 呼吸系统 无创通气失败 初始无创通气
     * @param childId 患儿ID
     * @param motherId 母亲ID
     * @param initialNIV 初始无创通气
     * @param initialNivFailed 初始无创通气失败
     * @return 改变的行数
     */
    int bdRtsNvfInitialNivInsertUpdate(@Param("childId") int childId, @Param("motherId") int motherId, @Param("initialNIV") int initialNIV, @Param("initialNivFailed") int initialNivFailed);

    /**
     * 更新 基础数据库 呼吸系统 无创通气失败 初值更新
     * @param bdRtsNivFailedInitial 无创通气失败 初值
     * @return 改变的行数
     */
    int bdRtsNivFailedInitialUpdate(@Param("bdRtsNivFailedInitial") BDRTSNivFailed bdRtsNivFailedInitial);

    /**
     * 插入/更新 基础数据库 呼吸系统 撤机失败 是否有创通气
     * @param childId 患儿ID
     * @param motherId 母亲ID
     * @param invasiveVentilation 是否有创通气
     * @param invasiveVentilationTimes 有创通气次数
     * @return 改变的行数
     */
    int bdRtsWfInvasiveVentilationInsertUpdate(@Param("childId") int childId, @Param("motherId") int motherId, @Param("invasiveVentilation") int invasiveVentilation, @Param("invasiveVentilationTimes") int invasiveVentilationTimes);

    /**
     * 查询 基础数据库 呼吸系统 撤机失败 是否有创通气
     * @param childId 患儿ID
     * @param motherId 母亲ID
     * @return 是否有创通气
     */
    Map<String, String> bdRtsWfInvasiveVentilationQry(@Param("childId") int childId, @Param("motherId") int motherId);

    /**
     * 查询 基础数据库 呼吸系统 撤机失败 数量
     * @param childId 患儿ID
     * @param motherId 母亲ID
     * @return 是否有创通气
     */
    int bdRtsWfNumQry(@Param("childId") int childId, @Param("motherId") int motherId);
}