package com.pnsrcp.web.dao;

import com.pnsrcp.web.entity.perintalPlatform.ultrasoundImage.UIBrainUltrasound;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

/**
 * @Project: 围产新生儿科研合作平台
 * @Author: Linyer
 * @Email: linyer@linyer.cn
 * @Date: 2022/07/07 21:43 星期四
 * @Description: 超声影像库 数据层
 */
@Mapper
public interface UltrasoundImageMapper {
    /**
     * 插入/更新 超声影像库 颅脑超声 超声检查次数
     * @param childId 患儿ID
     * @param motherId 母亲ID
     * @param ultrasonographyNumber 超声检查次数
     * @return 改变的行数
     */
    int uiUltrasonographyNumberInsertUpdate(@Param("ultrasonographyNumber") String ultrasonographyNumber, @Param("childId") int childId, @Param("motherId") int motherId);

    /**
     * 插入 超声影像库 颅脑超声 超声检查
     * @param uiBrainUltrasound 颅脑超声 超声检查
     * @return 改变的行数
     */
    int uiBrainUltrasoundInsert(UIBrainUltrasound uiBrainUltrasound);

    /**
     * 删除 超声影像库 颅脑超声 超声检查 列表
     * @param childId 患儿ID
     * @param motherId 母亲ID
     * @return 改变的行数
     */
    int uiBrainUltrasoundDelete(@Param("childId") int childId, @Param("motherId") int motherId);

    /**
     * 查询 超声影像库 颅脑超声 超声检查次数
     * @param childId 患儿ID
     * @param motherId 母亲ID
     * @return 成长历程 超声检查次数
     */
    String uiUltrasonographyNumberQry(@Param("childId") int childId, @Param("motherId") int motherId);

    /**
     * 查询 超声影像库 颅脑超声 超声检查 列表
     * @param childId 患儿ID
     * @param motherId 母亲ID
     * @return 颅脑超声 超声检查 列表
     */
    List<UIBrainUltrasound> uiBrainUltrasoundQry(@Param("childId") int childId, @Param("motherId") int motherId);
}
