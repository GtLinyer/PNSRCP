package com.pnsrcp.web.dao.manage;

import com.pnsrcp.web.entity.manage.AreaHospital;
import com.pnsrcp.web.entity.manage.Hospital;
import com.pnsrcp.web.entity.manage.HospitalLevel;
import com.pnsrcp.web.entity.patientCase.ReportExport;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.Date;
import java.util.List;

/**
 * @Project: 围产新生儿科研合作平台
 * @Author: Linyer
 * @Email: linyer@linyer.cn
 * @Date: 2021/5/28 16:23 星期五
 * @Description: 医院信息 数据层
 */
@Mapper
public interface HospitalMapper {
    /**
     * 获取 医院信息
     * @param page 页面
     * @param limit 限制
     * @param hid 医院ID
     * @param aid 区域ID
     * @return 医院信息
     */
    List<Hospital> hospitalQry(@Param("page") int page, @Param("limit") int limit, @Param("hid") int hid, @Param("aid") int aid);

    /**
     * 获取 所有医院ID
     * @return 所有医院ID
     */
    List<Integer> hospitalIdQry();

    /**
     * 获取 医院数量
     * @return 改变的行数
     */
    int hospitalCount();

    /**
     * 获取 医院 状态
     * @param hid 医院ID
     * @return 医院状态
     */
    int hospitalStatusQry(@Param("hid") int hid);

    /**
     * 插入 医院信息
     * @param hospital 医院信息
     * @return 改变的行数
     */
    int hospitalInsert(@Param("hospital") Hospital hospital);

    /**
     * 设置 医院负责人
     * @param hid 医院ID
     * @param chargePersonId 负责人ID
     * @return 改变的行数
     */
    int hospitalChargePersonUpdate(@Param("hid") int hid, @Param("chargePersonId") int chargePersonId);

    /**
     * 更新 医院信息
     * @param hospital 医院信息
     * @return 改变的行数
     */
    int hospitalUpdate(@Param("hospital") Hospital hospital);

    /**
     * 获取 医院等级
     * @return 医院等级
     */
    List<HospitalLevel> hospitalLevelQuery();

    /**
     * 根据id 获取 医院名称
     * @param hid 医院ID
     * @return 医院名称
     */
    String hospitalNameQuery(@Param("hid") int hid);

    /**
     * 获取 以省分组的 医院信息
     * @param hidList 医院ID列表
     * @return 医院信息
     */
    List<AreaHospital> areaHospitalQuery(@Param("hidList") List<Integer> hidList);

    /**
     * 获取 此区域下 所属医院ID
     * @param aid 区域ID
     * @return 医院ID
     */
    List<Integer> thisAreaHospitalQuery(@Param("aid") int aid);

    /**
     * 删除 此区域下 所有医院
     * @param aid 区域ID
     * @return 改变的行数
     */
    int thisAreaHospitalDelete(@Param("aid") int aid);

    /**
     * 设置 医院所属区域
     * @param aid 区域ID
     * @param hid 医院ID
     * @return 改变的行数
     */
    int hospitalAreaUpdate(@Param("aid") int aid, @Param("hid") int hid);

    /**
     * 更新 医院 录入病例数
     * @param hid 医院ID
     * @return 改变的行数
     */
    int hCaseNumUpdate(@Param("hid") int hid);

    /**
     * 获取 医院报表信息
     * @param hid 医院ID
     * @param startDate 开始时间
     * @param endDate 借宿时间
     * @param selectType 选择类型
     * @param inHospital 是否住院
     * @return 医院报表信息
     */
    ReportExport reportExportQry(@Param("hid") int hid, @Param("startDate") Date startDate,
                                 @Param("endDate") Date endDate, @Param("selectType") String selectType,
                                 @Param("inHospital") int inHospital);
}
