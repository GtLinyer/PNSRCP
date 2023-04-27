package com.pnsrcp.web.service;

import com.pnsrcp.web.entity.perintalPlatform.basicDatabaseDGS.*;
import com.pnsrcp.web.entity.perintalPlatform.basicDatabse.BDBirthMsg;

import java.util.List;

/**
 * @Project: 围产新生儿科研合作平台
 * @Author: Linyer
 * @Email: linyer@linyer.cn
 * @Date: 2021/10/28 0:13 星期四
 * @Description: 围产新生儿科研合作平台 基础数据库 消化系统 服务层 接口
 */
public interface BasicDatabaseDgsService {
    // 根据 患儿ID和母亲ID 获取 出生相关 初始数据
    BDBirthMsg getBdBirthMsg(int childId, int motherId);

    // 根据 患儿ID和母亲ID 获取 消化系统 生长指标
    BDDGSGrowthIndex getBdDgsGrowthIndex(int childId, int motherId);

    // 根据 患儿ID和母亲ID 获取 消化系统 生长指标 所有体重、头围、身长
    String getBdDgsGiWHcBl(int childId, int motherId);

    // 保存 基础数据库 消化系统 生长指标 页面 数据
    String saveBDDGSGI(BDDGSGrowthIndex bdDgsGrowthIndex, String wHcBlArray, int childId, int motherId);

    // 根据 患儿ID和母亲ID 获取 消化系统 肠内营养
    BDDGSEnteralNutrition getBdDgsEnteralNutrition(int childId, int motherId);

    // 根据 患儿ID和母亲ID 获取 消化系统 肠内营养 所有表格数据
    String getBdDgsEnData(int childId, int motherId);

    // 保存 基础数据库 消化系统 肠内营养 页面 数据
    String saveBDDGSEN(BDDGSEnteralNutrition bdDgsEnteralNutrition, String enDataArray, int childId, int motherId);

    // 根据 患儿ID和母亲ID 获取 消化系统 肠外营养 所有表格数据
    String getBdDgsPnData(int childId, int motherId);

    // 根据 患儿ID和母亲ID 获取 消化系统 肠外营养 置管数据
    List<BDDGSPnTp> getBdDgsPnTp(int childId, int motherId);

    // 保存 基础数据库 消化系统 肠外营养 页面 数据
    String saveBDDGSPN(BDDGSParenteralNutrition bdDgsParenteralNutrition, String pnDataArray, String pnTpArray, int childId, int motherId);

    // 保存 基础数据库 消化系统 禁食原因 页面 数据
    String saveBDDGSFR(BDDGSFastingReasons bdDgsFastingReasons, String frArray, int childId, int motherId);

    // 根据 患儿ID和母亲ID 获取 消化系统 禁食原因
    BDDGSFastingReasons getBdDgsFastingReasons(int childId, int motherId);

    // 根据 患儿ID和母亲ID 获取 消化系统 禁食原因 数据
    List<BDDGSFrData> getBdDgsFrData(int childId, int motherId);

    // 保存 基础数据库 消化系统 喂养不耐受与NEC 页面 数据
    String saveBDDGSFIN(BDDGSFeedingIntoleranceAndNec bdDgsFeedingIntoleranceAndNec, int childId, int motherId);

    // 根据 患儿ID和母亲ID 获取 消化系统 喂养不耐受与NEC
    BDDGSFeedingIntoleranceAndNec getBdDgsFeedingIntoleranceAndNec(int childId, int motherId);

    // 保存 基础数据库 消化系统 其它诊断与治疗 页面 数据
    String saveBDDGSODT(BDDGSOtherDiagnosisAndTreatment bdDgsOtherDiagnosisAndTreatment, int childId, int motherId);

    // 根据 患儿ID和母亲ID 获取 消化系统 其它诊断与治疗
    BDDGSOtherDiagnosisAndTreatment getBdDgsOtherDiagnosisAndTreatment(int childId, int motherId);

    // 根据 患儿ID和母亲ID 获取 消化系统 肠内营养管理 初始化数据
    String getBdDgsEnmInitialData(int childId, int motherId);

    // 根据 患儿ID和母亲ID 获取 消化系统 肠内营养管理
    BDDGSEnm getBdDgsEnm(int childId, int motherId);

    // 保存 基础数据库 消化系统 肠内营养管理 页面 数据
    String saveBDDGSENM(BDDGSEnm bdDgsEnm, String enmDataArray, int childId, int motherId);

    // 根据 患儿ID和母亲ID 获取 消化系统 肠外营养管理 初始化数据
    String getBdDgsPnmInitialData(int childId, int motherId);

    // 根据 患儿ID和母亲ID 获取 消化系统 肠外营养管理
    BDDGSPnm getBdDgsPnm(int childId, int motherId);

    // 保存 基础数据库 消化系统 肠外营养管理 页面 数据
    String saveBDDGSPNM(BDDGSPnm bdDgsPnm, String pnmDataArray, int childId, int motherId);

    // 根据 患儿ID和母亲ID 获取 消化系统 过渡期营养管理 初始化数据
    String getBdDgsTnmInitialData(int childId, int motherId);

    // 保存 基础数据库 消化系统 过渡期营养管理 页面 数据
    String saveBDDGSTNM(String tnmDataArray, int childId, int motherId);

    // 根据 患儿ID和母亲ID 获取 消化系统 营养评价 初始化数据
    String getBdDgsNeInitialData(int childId, int motherId);

    // 保存 基础数据库 消化系统 营养评价 页面 数据
    String saveBDDGSNE(BDDGSNutritionalEvaluation bdDgsNutritionalEvaluation, int childId, int motherId);

    // 根据 患儿ID和母亲ID 获取 消化系统 营养评价
    BDDGSNutritionalEvaluation getBdDgsNutritionalEvaluation(int childId, int motherId);
}