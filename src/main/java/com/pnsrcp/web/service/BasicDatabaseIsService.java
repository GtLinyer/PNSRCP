package com.pnsrcp.web.service;

import com.pnsrcp.web.entity.perintalPlatform.basicDatabaseIS.*;

import java.util.Date;
import java.util.List;

/**
 * @Project: 围产新生儿科研合作平台
 * @Author: Linyer
 * @Email: linyer@linyer.cn
 * @Date: 2021/9/20 1:02 星期一
 * @Description: 围产新生儿科研合作平台 基础数据库 感染监测 服务层 接口
 */
public interface BasicDatabaseIsService {
    // 根据 患儿ID和母亲ID 获取 患儿出生日期
    Date getChildBirthday(int childId, int motherId);

    // 根据 患儿ID和母亲ID 获取 绒毛膜羊膜炎
    String getBdIsChorioamnionitis(int motherId);

    // 保存 基础数据库 感染监测 EOS流程 页面 数据
    String saveBDISEos(BDISEos bdIsEos, String aeArray, String bcArray, String nsiArray, String cfcArray, int childId, int motherId);

    // 根据 患儿ID和母亲ID 获取 感染监测 EOS流程
    BDISEos getBdIsEos(int childId, int motherId);

    // 根据 患儿ID和母亲ID 获取 感染监测 EOS流程 系统评估
    List<BDISEosAe> getBdIsEosAe(int childId, int motherId);

    // 根据 患儿ID和母亲ID 获取 感染监测 EOS流程 血培养
    List<BDISEosBc> getBdIsEosBc(int childId, int motherId);

    // 根据 患儿ID和母亲ID 获取 感染监测 EOS流程 非特异性检查
    List<BDISEosNsi> getBdIsEosNsi(int childId, int motherId);

    // 根据 患儿ID和母亲ID 获取 感染监测 EOS流程 脑脊液培养
    List<BDISEosCfc> getBdIsEosCfc(int childId, int motherId);

    // 保存 基础数据库 感染监测 LOS流程 页面 数据
    String saveBDISLos(BDISLos bdIsLos, String rfArray, String aeArray, String bcArray, String nsiArray, String cfcArray, int childId, int motherId);

    // 根据 患儿ID和母亲ID 获取 感染监测 LOS流程
    BDISLos getBdIsLos(int childId, int motherId);

    // 根据 患儿ID和母亲ID 获取 感染监测 LOS流程 危险因素
    List<BDISLosRf> getBdIsLosRf(int childId, int motherId);

    // 根据 患儿ID和母亲ID 获取 感染监测 LOS流程 系统评估
    List<BDISLosAe> getBdIsLosAe(int childId, int motherId);

    // 根据 患儿ID和母亲ID 获取 感染监测 LOS流程 血培养
    List<BDISLosBc> getBdIsLosBc(int childId, int motherId);

    // 根据 患儿ID和母亲ID 获取 感染监测 LOS流程 非特异性检查
    List<BDISLosNsi> getBdIsLosNsi(int childId, int motherId);

    // 根据 患儿ID和母亲ID 获取 感染监测 LOS流程 脑脊液培养
    List<BDISLosCfc> getBdIsLosCfc(int childId, int motherId);

    // 保存 基础数据库 感染监测 抗菌药物 页面 数据
    String saveBDISAd(BDISAd bdIsAd, String adArray, int childId, int motherId);

    // 根据 患儿ID和母亲ID 获取 感染监测 抗菌药物
    BDISAd getBdIsAd(int childId, int motherId);

    // 根据 患儿ID和母亲ID 获取 感染监测 抗菌药物 使用
    List<BDISAdUse> getBdIsAdUse(int childId, int motherId);

    // 根据 患儿ID和母亲ID 获取 感染监测 评价指标
    BDISEvaluationIndex getBdIsEvaluationIndex(int childId, int motherId);

    // 保存 基础数据库 感染监测 评价指标 页面 数据
    String saveBDISEI(BDISEvaluationIndex bdIsEvaluationIndex, int childId, int motherId);

    // 根据 患儿ID和母亲ID 获取 感染监测 其它感染诊断
    BDISOid getBdIsOid(int childId, int motherId);

    // 保存 基础数据库 感染监测 其它感染诊断 页面 数据
    String saveBDISOID(BDISOid bdIsOid, int childId, int motherId);
}