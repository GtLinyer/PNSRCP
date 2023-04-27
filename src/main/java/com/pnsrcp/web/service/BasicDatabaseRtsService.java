package com.pnsrcp.web.service;

import com.pnsrcp.web.entity.perintalPlatform.BasicDatabaseRTS.*;
import com.pnsrcp.web.entity.perintalPlatform.basicDatabse.BDBirthMsg;

import java.util.Date;
import java.util.List;
import java.util.Map;

/**
 * @Project: 围产新生儿科研合作平台
 * @Author: Linyer
 * @Email: linyer@linyer.cn
 * @Date: 2021/8/29 15:49 星期日
 * @Description: 围产新生儿科研合作平台 基础数据库 服务层 接口
 */
public interface BasicDatabaseRtsService {
    // 保存 基础数据库 呼吸系统 呼吸支持 页面 数据
    String saveBDRTSRS(BDRTSRespiratorySupport bdRtsRespiratorySupport, String rsModeTimeArray, String ocArray, int childIdBD, int motherIdBD);

    // 根据 患儿ID和母亲ID 获取 患儿出生日期
    Date getBdBirthday(int childIdBD, int motherIdBD);

    // 根据 患儿ID和母亲ID 获取 患儿胎龄
    BDBirthMsg getBdGestationalAge(int childIdBD, int motherIdBD);

    // 根据 患儿ID和母亲ID 获取 呼吸系统 呼吸支持模式 所有时段
    List<BDRTSModeTime> getBdRtsRsModeTime(int childId, int motherId);

    // 根据 患儿ID和母亲ID 获取 呼吸系统 给氧浓度 不同时段
    List<BDRTSRsOxygenConcentration> getBdRtsRsOxygenConcentration(int childId, int motherId);

    // 根据 患儿ID和母亲ID 获取 呼吸系统 呼吸支持
    BDRTSRespiratorySupport getBdRtsRespiratorySupport(int childId, int motherId);

    // 根据 患儿ID和母亲ID 获取 呼吸系统 HFNC失败
    BDRTSHfncFailed getBdRtsHfncFailed(int childId, int motherId);

    // 保存 基础数据库 呼吸系统 HFNC失败 页面 数据
    String saveBDRTSHF(BDRTSHfncFailed bdRtsHfncFailed, int childId, int motherId);

    // 根据 患儿ID和母亲ID 获取 呼吸系统 无创通气失败
    BDRTSNivFailed getBdRtsNivFailed(int childId, int motherId);

    // 保存 基础数据库 呼吸系统 无创通气失败 页面 数据
    String saveBDRTSNVF(BDRTSNivFailed bdrtsNivFailed, int childId, int motherId);

    // 根据 患儿ID和母亲ID 获取 呼吸系统 撤机情况 是否有创通气
    Map<String, String> getBdRtsWfInvasiveVentilation(int childIdBD, int motherIdBD);

    // 根据 患儿ID和母亲ID 获取 呼吸系统 撤机情况 所有有创通气
    List<BDRTSInvasiveVentilation> getBdRtsWeaningFailedIv(int childId, int motherId);

    // 保存 基础数据库 呼吸系统 撤机情况 页面 数据
    String saveBDRTSWS(String data, int childId, int motherId);

    // 保存 基础数据库 呼吸系统 BPD 页面 数据
    String saveBDRTSBPD(BDRTSBpd bdRtsBpd, String gcArray, int childId, int motherId);

    // 根据 患儿ID和母亲ID 获取 呼吸系统 BPD
    BDRTSBpd getBdRtsBpd(int childId, int motherId);

    // 根据 患儿ID和母亲ID 获取 呼吸系统 BPD 所有GC
    List<BDRTSBpdGc> getBdRtsBpdGc(int childId, int motherId);

    // 保存 基础数据库 呼吸系统 RDS 页面 数据
    String saveBDRTSRDS(BDRTSRds bdRtsRds, String psArray, int childId, int motherId);

    // 根据 患儿ID和母亲ID 获取 呼吸系统 RDS
    BDRTSRds getBdRtsRds(int childId, int motherId);

    // 根据 患儿ID和母亲ID 获取 呼吸系统 RDS 所有PS
    List<BDRTSRdsPs> getBdRtsRdsPs(int childId, int motherId);

    // 保存 基础数据库 呼吸系统 呼吸暂停 页面 数据
    String saveBDRTSApnea(BDRTSApnea bdRtsApnea, String apArray, int childId, int motherId);

    // 根据 患儿ID和母亲ID 获取 呼吸系统 呼吸暂停
    BDRTSApnea getBdRtsApnea(int childId, int motherId);

    // 根据 患儿ID和母亲ID 获取 呼吸系统 呼吸暂停 所有咖啡因
    List<BDRTSApneaCaffeine> getBdRtsApneaCaffeine(int childId, int motherId);

    // 根据 患儿ID和母亲ID 获取 呼吸系统 其它诊断与治疗
    BDRTSOtherDiagnosisTreatment getBdRtsOtherDiagnosisTreatment(int childId, int motherId);

    // 保存 基础数据库 呼吸系统 其它诊断与治疗 页面 数据
    String saveBDRTSODT(BDRTSOtherDiagnosisTreatment bdRtsOtherDiagnosisTreatment, int childId, int motherId);
}