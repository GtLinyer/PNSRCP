package com.pnsrcp.web.service.impl;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.pnsrcp.web.dao.basicDatabase.BDDsMapper;
import com.pnsrcp.web.dao.basicDatabase.BasicDatabaseMapper;
import com.pnsrcp.web.dao.basicDatabaseDGS.*;
import com.pnsrcp.web.entity.perintalPlatform.basicDatabaseDGS.*;
import com.pnsrcp.web.entity.perintalPlatform.basicDatabse.BDBirthMsg;
import com.pnsrcp.web.entity.perintalPlatform.basicDatabse.BDDischargeSituation;
import com.pnsrcp.web.service.BasicDatabaseDgsService;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.Date;
import java.util.List;

/**
 * @Project: 围产新生儿科研合作平台
 * @Author: Linyer
 * @Email: linyer@linyer.cn
 * @Date: 2021/10/28 0:13 星期四
 * @Description: 围产新生儿科研合作平台 基础数据库 消化系统 服务层 实现类
 */
@Service
public class BasicDatabaseDgsServiceImpl implements BasicDatabaseDgsService {
    // 数据层 注入
    @Resource
    private BDDsMapper bdDsMapper;
    @Resource
    private BDDgsGiMapper bdDgsGiMapper;
    @Resource
    private BDDgsGiWHcBlMapper bdDgsGiWHcBlMapper;
    @Resource
    private BDDgsEnMapper bdDgsEnMapper;
    @Resource
    private BDDgsPnMapper bdDgsPnMapper;
    @Resource
    private BDDgsEnDataMapper bdDgsEnDataMapper;
    @Resource
    private BDDgsPnDataMapper bdDgsPnDataMapper;
    @Resource
    private BDDgsPnTpMapper bdDgsPnTpMapper;
    @Resource
    private BDDgsFrMapper bdDgsFrMapper;
    @Resource
    private BDDgsFrDataMapper bdDgsFrDataMapper;
    @Resource
    private BDDgsFinMapper bdDgsFinMapper;
    @Resource
    private BDDgsOdtMapper bdDgsOdtMapper;
    @Resource
    private BDDgsEnmMapper bdDgsEnmMapper;
    @Resource
    private BDDgsEnmDataMapper bdDgsEnmDataMapper;
    @Resource
    private BDDgsPnmMapper bdDgsPnmMapper;
    @Resource
    private BDDgsPnmDataMapper bdDgsPnmDataMapper;
    @Resource
    private BDDgsTnmDataMapper bdDgsTnmDataMapper;
    @Resource
    private BDDgsNeMapper bdDgsNeMapper;
    @Resource
    private BasicDatabaseMapper basicDatabaseMapper;

    @Override
    public BDBirthMsg getBdBirthMsg(int childId, int motherId) {
        return basicDatabaseMapper.bdBirthMsgQry(childId, motherId);
    }

    @Override
    public BDDGSGrowthIndex getBdDgsGrowthIndex(int childId, int motherId) {
        QueryWrapper<BDDGSGrowthIndex> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("cid", childId);
        queryWrapper.eq("mid", motherId);
        return bdDgsGiMapper.selectOne(queryWrapper);
    }

    @Override
    public String getBdDgsGiWHcBl(int childId, int motherId) {
        JSONObject json = new JSONObject();
        json.put("code", 0);
        try {
            QueryWrapper<BDDGSGiWHcBl> queryWrapper = new QueryWrapper<>();
            queryWrapper.eq("cid", childId);
            queryWrapper.eq("mid", motherId);
            List<BDDGSGiWHcBl> wHcBlList = bdDgsGiWHcBlMapper.selectList(queryWrapper);
            json.put("wHcBlList", wHcBlList);
            json.put("code", 1);
        } catch (Exception ignored) {}
        return json.toJSONString();
    }

    @Override
    public String saveBDDGSGI(BDDGSGrowthIndex bdDgsGrowthIndex, String wHcBlArrayString, int childId, int motherId) {
        bdDgsGrowthIndex.setCid(childId);
        bdDgsGrowthIndex.setMid(motherId);
        JSONObject json = new JSONObject();
        json.put("code", 0);
        if (bdDgsGiMapper.insertOrUpdate(bdDgsGrowthIndex) > 0) {
            json.put("code", 1);
        }
        if (wHcBlArrayString != null) {
            JSONArray wHcBlArray = JSONArray.parseArray(wHcBlArrayString);
            QueryWrapper<BDDGSGiWHcBl> deleteWrapper = new QueryWrapper<>();
            deleteWrapper.eq("cid", childId);
            deleteWrapper.eq("mid", motherId);
            bdDgsGiWHcBlMapper.delete(deleteWrapper);
            for (int i = 0; i < wHcBlArray.size(); i++) {
                JSONObject wHcBl = wHcBlArray.getJSONObject(i);
                BDDGSGiWHcBl bdGiWHcBl = wHcBl.toJavaObject(BDDGSGiWHcBl.class);
                bdGiWHcBl.setCid(childId);
                bdGiWHcBl.setMid(motherId);
                if (bdDgsGiWHcBlMapper.insert(bdGiWHcBl) == 0) {
                    json.put("code", 0);
                }
            }
        }
        return json.toJSONString();
    }

    @Override
    public BDDGSEnteralNutrition getBdDgsEnteralNutrition(int childId, int motherId) {
        QueryWrapper<BDDGSEnteralNutrition> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("cid", childId);
        queryWrapper.eq("mid", motherId);
        return bdDgsEnMapper.selectOne(queryWrapper);
    }

    @Override
    public String getBdDgsEnData(int childId, int motherId) {
        JSONObject json = new JSONObject();
        json.put("code", 0);
        try {
            QueryWrapper<BDDGSEnData> queryWrapper = new QueryWrapper<>();
            queryWrapper.eq("cid", childId);
            queryWrapper.eq("mid", motherId);
            json.put("enDataList", bdDgsEnDataMapper.selectList(queryWrapper));
            json.put("code", 1);
        } catch (Exception ignored) {}
        return json.toJSONString();
    }

    @Override
    public String saveBDDGSEN(BDDGSEnteralNutrition bdDgsEnteralNutrition, String enDataArrayInput, int childId, int motherId) {
        bdDgsEnteralNutrition.setCid(childId);
        bdDgsEnteralNutrition.setMid(motherId);
        JSONObject json = new JSONObject();
        json.put("code", 0);
        if (bdDgsEnMapper.insertOrUpdate(bdDgsEnteralNutrition) > 0) {
            json.put("code", 1);
        }
        if (enDataArrayInput != null) {
            JSONArray enDataArray = JSONArray.parseArray(enDataArrayInput);
            QueryWrapper<BDDGSEnData> deleteWrapper = new QueryWrapper<>();
            deleteWrapper.eq("cid", childId);
            deleteWrapper.eq("mid", motherId);
            bdDgsEnDataMapper.delete(deleteWrapper);
            for (int i = 0; i < enDataArray.size(); i++) {
                JSONObject enData = enDataArray.getJSONObject(i);
                BDDGSEnData bdDgsEnData = enData.toJavaObject(BDDGSEnData.class);
                bdDgsEnData.setCid(childId);
                bdDgsEnData.setMid(motherId);
                if (bdDgsEnDataMapper.insert(bdDgsEnData) == 0) {
                    json.put("code", 0);
                }
            }
        }
        return json.toJSONString();
    }

    @Override
    public String getBdDgsPnData(int childId, int motherId) {
        JSONObject json = new JSONObject();
        json.put("code", 0);
        try {
            QueryWrapper<BDDGSPnData> queryWrapper = new QueryWrapper<>();
            queryWrapper.eq("cid", childId);
            queryWrapper.eq("mid", motherId);
            json.put("pnDataList", bdDgsPnDataMapper.selectList(queryWrapper));
            json.put("code", 1);
        } catch (Exception ignored) {}
        return json.toJSONString();
    }

    @Override
    public List<BDDGSPnTp> getBdDgsPnTp(int childId, int motherId) {
        QueryWrapper<BDDGSPnTp> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("cid", childId);
        queryWrapper.eq("mid", motherId);
        return bdDgsPnTpMapper.selectList(queryWrapper);
    }

    @Override
    public String saveBDDGSPN(BDDGSParenteralNutrition bdDgsParenteralNutrition,
                              String pnDataArrayInput, String pnTpArrayInput, int childId, int motherId) {
        bdDgsParenteralNutrition.setCid(childId);
        bdDgsParenteralNutrition.setMid(motherId);
        JSONObject json = new JSONObject();
        json.put("code", 0);
        if (bdDgsPnMapper.insertOrUpdate(bdDgsParenteralNutrition) > 0) {
            json.put("code", 1);
        }

        if (pnDataArrayInput != null) {
            JSONArray pnDataArray = JSONArray.parseArray(pnDataArrayInput);
            QueryWrapper<BDDGSPnData> pnDataDeleteWrapper = new QueryWrapper<>();
            pnDataDeleteWrapper.eq("cid", childId);
            pnDataDeleteWrapper.eq("mid", motherId);
            bdDgsPnDataMapper.delete(pnDataDeleteWrapper);
            for (int i = 0; i < pnDataArray.size(); i++) {
                JSONObject pnData = pnDataArray.getJSONObject(i);
                BDDGSPnData bdDgsPnData = pnData.toJavaObject(BDDGSPnData.class);
                bdDgsPnData.setCid(childId);
                bdDgsPnData.setMid(motherId);
                if (bdDgsPnDataMapper.insert(bdDgsPnData) == 0) {
                    json.put("code", 0);
                }
            }
        }
        if (pnTpArrayInput != null) {
            JSONArray pnTpArray = JSONArray.parseArray(pnTpArrayInput);
            QueryWrapper<BDDGSPnTp> pnTpDeleteWrapper = new QueryWrapper<>();
            pnTpDeleteWrapper.eq("cid", childId);
            pnTpDeleteWrapper.eq("mid", motherId);
            bdDgsPnTpMapper.delete(pnTpDeleteWrapper);
            for (int i = 0; i < pnTpArray.size(); i++) {
                JSONObject pnTp = pnTpArray.getJSONObject(i);
                BDDGSPnTp bdDgsPnTp = pnTp.toJavaObject(BDDGSPnTp.class);
                bdDgsPnTp.setCid(childId);
                bdDgsPnTp.setMid(motherId);
                if (bdDgsPnTpMapper.insert(bdDgsPnTp) == 0) {
                    json.put("code", 0);
                }
            }
        }
        return json.toJSONString();
    }

    @Override
    public String saveBDDGSFR(BDDGSFastingReasons bdDgsFastingReasons, String frArrayInput, int childId, int motherId) {
        bdDgsFastingReasons.setCid(childId);
        bdDgsFastingReasons.setMid(motherId);
        JSONObject json = new JSONObject();
        json.put("code", 1);
        if (bdDgsFrMapper.insertOrUpdate(bdDgsFastingReasons) == 0) {
            json.put("code", 0);
        }

        if (frArrayInput != null) {
            JSONArray frArray = JSONArray.parseArray(frArrayInput);
            QueryWrapper<BDDGSFrData> dataDeleteWrapper = new QueryWrapper<>();
            dataDeleteWrapper.eq("cid", childId);
            dataDeleteWrapper.eq("mid", motherId);
            bdDgsFrDataMapper.delete(dataDeleteWrapper);
            for (int i = 0; i < frArray.size(); i++) {
                JSONObject fr = frArray.getJSONObject(i);
                BDDGSFrData bdDgsFrData = fr.toJavaObject(BDDGSFrData.class);
                bdDgsFrData.setCid(childId);
                bdDgsFrData.setMid(motherId);
                if (bdDgsFrDataMapper.insert(bdDgsFrData) == 0) {
                    json.put("code", 0);
                }
            }
        }
        return json.toJSONString();
    }

    @Override
    public BDDGSFastingReasons getBdDgsFastingReasons(int childId, int motherId) {
        QueryWrapper<BDDGSFastingReasons> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("cid", childId);
        queryWrapper.eq("mid", motherId);
        return bdDgsFrMapper.selectOne(queryWrapper);
    }

    @Override
    public List<BDDGSFrData> getBdDgsFrData(int childId, int motherId) {
        QueryWrapper<BDDGSFrData> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("cid", childId);
        queryWrapper.eq("mid", motherId);
        return bdDgsFrDataMapper.selectList(queryWrapper);
    }

    @Override
    public String saveBDDGSFIN(BDDGSFeedingIntoleranceAndNec bdDgsFeedingIntoleranceAndNec, int childId, int motherId) {
        bdDgsFeedingIntoleranceAndNec.setCid(childId);
        bdDgsFeedingIntoleranceAndNec.setMid(motherId);
        JSONObject json = new JSONObject();
        json.put("code", 0);
        if (bdDgsFinMapper.insertOrUpdate(bdDgsFeedingIntoleranceAndNec) > 0) {
            json.put("code", 1);
        }
        return json.toJSONString();
    }

    @Override
    public BDDGSFeedingIntoleranceAndNec getBdDgsFeedingIntoleranceAndNec(int childId, int motherId) {
        QueryWrapper<BDDGSFeedingIntoleranceAndNec> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("cid", childId);
        queryWrapper.eq("mid", motherId);
        return bdDgsFinMapper.selectOne(queryWrapper);
    }

    @Override
    public String saveBDDGSODT(BDDGSOtherDiagnosisAndTreatment bdDgsOtherDiagnosisAndTreatment, int childId, int motherId) {
        bdDgsOtherDiagnosisAndTreatment.setCid(childId);
        bdDgsOtherDiagnosisAndTreatment.setMid(motherId);
        JSONObject json = new JSONObject();
        json.put("code", 0);
        if (bdDgsOdtMapper.insertOrUpdate(bdDgsOtherDiagnosisAndTreatment) > 0) {
            json.put("code", 1);
        }
        return json.toJSONString();
    }

    @Override
    public BDDGSOtherDiagnosisAndTreatment getBdDgsOtherDiagnosisAndTreatment(int childId, int motherId) {
        QueryWrapper<BDDGSOtherDiagnosisAndTreatment> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("cid", childId);
        queryWrapper.eq("mid", motherId);
        return bdDgsOdtMapper.selectOne(queryWrapper);
    }

    @Override
    public BDDGSEnm getBdDgsEnm(int childId, int motherId) {
        QueryWrapper<BDDGSEnm> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("cid", childId);
        queryWrapper.eq("mid", motherId);
        return bdDgsEnmMapper.selectOne(queryWrapper);
    }

    @Override
    public String getBdDgsEnmInitialData(int childId, int motherId) {
        JSONObject json = new JSONObject();
        json.put("code", 0);
        try {
            JSONObject initialData = new JSONObject();

            QueryWrapper<BDDGSEnteralNutrition> dgsEnQueryWrapper = new QueryWrapper<>();
            dgsEnQueryWrapper.eq("cid", childId);
            dgsEnQueryWrapper.eq("mid", motherId);
            initialData.put("en", bdDgsEnMapper.selectOne(dgsEnQueryWrapper));

            QueryWrapper<BDDGSEnData> dgsEnDataQueryWrapper = new QueryWrapper<>();
            dgsEnDataQueryWrapper.eq("cid", childId);
            dgsEnDataQueryWrapper.eq("mid", motherId);
            initialData.put("enList", bdDgsEnDataMapper.selectList(dgsEnDataQueryWrapper));

            QueryWrapper<BDDGSGiWHcBl> dgsGiWHcBlQueryWrapper = new QueryWrapper<>();
            dgsGiWHcBlQueryWrapper.eq("cid", childId);
            dgsGiWHcBlQueryWrapper.eq("mid", motherId);
            initialData.put("giList", bdDgsGiWHcBlMapper.selectList(dgsGiWHcBlQueryWrapper));

            json.put("initialData", initialData);
            json.put("code", 1);
        } catch (Exception ignored) {}
        return json.toJSONString();
    }

    @Override
    public String saveBDDGSENM(BDDGSEnm bdDgsEnm, String enmDataArrayInput, int childId, int motherId) {
        bdDgsEnm.setCid(childId);
        bdDgsEnm.setMid(motherId);
        JSONObject json = new JSONObject();
        json.put("code", 0);
        if (bdDgsEnmMapper.insertOrUpdate(bdDgsEnm) > 0) {
            json.put("code", 1);
        }
        if (enmDataArrayInput != null) {
            JSONArray enmDataArray = JSONArray.parseArray(enmDataArrayInput);
            QueryWrapper<BDDGSEnmData> deleteWrapper = new QueryWrapper<>();
            deleteWrapper.eq("cid", childId);
            deleteWrapper.eq("mid", motherId);
            bdDgsEnmDataMapper.delete(deleteWrapper);
            for (int i = 0; i < enmDataArray.size(); i++) {
                JSONObject enmData = enmDataArray.getJSONObject(i);
                BDDGSEnmData bdDgsEnmData = enmData.toJavaObject(BDDGSEnmData.class);
                bdDgsEnmData.setCid(childId);
                bdDgsEnmData.setMid(motherId);
                if (bdDgsEnmDataMapper.insert(bdDgsEnmData) == 0) {
                    json.put("code", 0);
                }
            }
        }
        return json.toJSONString();
    }

    @Override
    public String getBdDgsPnmInitialData(int childId, int motherId) {
        JSONObject json = new JSONObject();
        json.put("code", 0);
        try {
            JSONObject initialData = new JSONObject();

            QueryWrapper<BDDGSPnData> dgsPnDataQueryWrapper = new QueryWrapper<>();
            dgsPnDataQueryWrapper.eq("cid", childId);
            dgsPnDataQueryWrapper.eq("mid", motherId);
            initialData.put("pnList", bdDgsPnDataMapper.selectList(dgsPnDataQueryWrapper));

            QueryWrapper<BDDGSEnmData> dgsEnmDataQueryWrapper = new QueryWrapper<>();
            dgsEnmDataQueryWrapper.eq("cid", childId);
            dgsEnmDataQueryWrapper.eq("mid", motherId);
            initialData.put("enmList", bdDgsEnmDataMapper.selectList(dgsEnmDataQueryWrapper));

            QueryWrapper<BDDGSGiWHcBl> dgsGiWHcBlQueryWrapper = new QueryWrapper<>();
            dgsGiWHcBlQueryWrapper.eq("cid", childId);
            dgsGiWHcBlQueryWrapper.eq("mid", motherId);
            initialData.put("giList", bdDgsGiWHcBlMapper.selectList(dgsGiWHcBlQueryWrapper));

            json.put("initialData", initialData);
            json.put("code", 1);
        } catch (Exception ignored) {}
        return json.toJSONString();
    }

    @Override
    public BDDGSPnm getBdDgsPnm(int childId, int motherId) {
        QueryWrapper<BDDGSPnm> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("cid", childId);
        queryWrapper.eq("mid", motherId);
        return bdDgsPnmMapper.selectOne(queryWrapper);
    }

    @Override
    public String saveBDDGSPNM(BDDGSPnm bdDgsPnm, String pnmDataArrayInput, int childId, int motherId) {
        bdDgsPnm.setCid(childId);
        bdDgsPnm.setMid(motherId);
        JSONObject json = new JSONObject();
        json.put("code", 0);
        if (bdDgsPnmMapper.insertOrUpdate(bdDgsPnm) > 0) {
            json.put("code", 1);
        }
        if (pnmDataArrayInput != null) {
            JSONArray pnmDataArray = JSONArray.parseArray(pnmDataArrayInput);
            QueryWrapper<BDDGSPnmData> deleteWrapper = new QueryWrapper<>();
            deleteWrapper.eq("cid", childId);
            deleteWrapper.eq("mid", motherId);
            bdDgsPnmDataMapper.delete(deleteWrapper);
            for (int i = 0; i < pnmDataArray.size(); i++) {
                JSONObject pnmData = pnmDataArray.getJSONObject(i);
                BDDGSPnmData bdDgsPnmData = pnmData.toJavaObject(BDDGSPnmData.class);
                bdDgsPnmData.setCid(childId);
                bdDgsPnmData.setMid(motherId);
                if (bdDgsPnmDataMapper.insert(bdDgsPnmData) == 0) {
                    json.put("code", 0);
                }
            }
        }
        return json.toJSONString();
    }

    @Override
    public String getBdDgsTnmInitialData(int childId, int motherId) {
        JSONObject json = new JSONObject();
        json.put("code", 0);
        try {
            JSONObject initialData = new JSONObject();

            QueryWrapper<BDDGSGiWHcBl> dgsGiWHcBlQueryWrapper = new QueryWrapper<>();
            dgsGiWHcBlQueryWrapper.eq("cid", childId);
            dgsGiWHcBlQueryWrapper.eq("mid", motherId);
            initialData.put("giList", bdDgsGiWHcBlMapper.selectList(dgsGiWHcBlQueryWrapper));

            QueryWrapper<BDDGSEnmData> dgsEnmDataQueryWrapper = new QueryWrapper<>();
            dgsEnmDataQueryWrapper.eq("cid", childId);
            dgsEnmDataQueryWrapper.eq("mid", motherId);
            initialData.put("enmList", bdDgsEnmDataMapper.selectList(dgsEnmDataQueryWrapper));

            QueryWrapper<BDDGSPnmData> dgsPnmDataQueryWrapper = new QueryWrapper<>();
            dgsPnmDataQueryWrapper.eq("cid", childId);
            dgsPnmDataQueryWrapper.eq("mid", motherId);
            initialData.put("pnmList", bdDgsPnmDataMapper.selectList(dgsPnmDataQueryWrapper));

            json.put("initialData", initialData);
            json.put("code", 1);
        } catch (Exception ignored) {}
        return json.toJSONString();
    }

    @Override
    public String saveBDDGSTNM(String tnmDataArrayInput, int childId, int motherId) {
        JSONObject json = new JSONObject();
        json.put("code", 1);
        if (tnmDataArrayInput != null) {
            JSONArray tnmDataArray = JSONArray.parseArray(tnmDataArrayInput);
            QueryWrapper<BDDGSTnmData> deleteWrapper = new QueryWrapper<>();
            deleteWrapper.eq("cid", childId);
            deleteWrapper.eq("mid", motherId);
            bdDgsTnmDataMapper.delete(deleteWrapper);
            for (int i = 0; i < tnmDataArray.size(); i++) {
                JSONObject tnmData = tnmDataArray.getJSONObject(i);
                BDDGSTnmData bdDgsTnmData = tnmData.toJavaObject(BDDGSTnmData.class);
                bdDgsTnmData.setCid(childId);
                bdDgsTnmData.setMid(motherId);
                if (bdDgsTnmDataMapper.insert(bdDgsTnmData) == 0) {
                    json.put("code", 0);
                }
            }
        }
        return json.toJSONString();
    }

    @Override
    public String getBdDgsNeInitialData(int childId, int motherId) {
        JSONObject json = new JSONObject();
        json.put("code", 0);
        try {
            JSONObject initialData = new JSONObject();
            initialData.put("birthWHcBl", basicDatabaseMapper.bdBirthWHcBlQry(childId, motherId));

            QueryWrapper<BDDGSGrowthIndex> dgsGiQueryWrapper = new QueryWrapper<>();
            dgsGiQueryWrapper.eq("cid", childId);
            dgsGiQueryWrapper.eq("mid", motherId);
            BDDGSGrowthIndex bddgsGrowthIndex = bdDgsGiMapper.selectOne(dgsGiQueryWrapper);
            Date bdDgsGiRegainBirthWeightTime = bddgsGrowthIndex.getRegainBirthWeightTime();
            initialData.put("regainBirthWeightTime", bdDgsGiRegainBirthWeightTime);

            QueryWrapper<BDDischargeSituation> dsQueryWrapper = new QueryWrapper<>();
            dsQueryWrapper.eq("cid", childId);
            dsQueryWrapper.eq("mid", motherId);
            initialData.put("dischargeSituation", bdDsMapper.selectOne(dsQueryWrapper));

            QueryWrapper<BDDGSGiWHcBl> dgsGiWHcBlQueryWrapper = new QueryWrapper<>();
            dgsGiWHcBlQueryWrapper.eq("cid", childId);
            dgsGiWHcBlQueryWrapper.eq("mid", motherId);
            initialData.put("giList", bdDgsGiWHcBlMapper.selectList(dgsGiWHcBlQueryWrapper));

            json.put("initialData", initialData);
            json.put("code", 1);
        } catch (Exception ignored) {}
        return json.toJSONString();
    }

    @Override
    public String saveBDDGSNE(BDDGSNutritionalEvaluation bdDgsNutritionalEvaluation, int childId, int motherId) {
        bdDgsNutritionalEvaluation.setCid(childId);
        bdDgsNutritionalEvaluation.setMid(motherId);
        JSONObject json = new JSONObject();
        json.put("code", 0);
        if (bdDgsNeMapper.insertOrUpdate(bdDgsNutritionalEvaluation) > 0) {
            json.put("code", 1);
        }
        return json.toJSONString();
    }

    @Override
    public BDDGSNutritionalEvaluation getBdDgsNutritionalEvaluation(int childId, int motherId) {
        QueryWrapper<BDDGSNutritionalEvaluation> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("cid", childId);
        queryWrapper.eq("mid", motherId);
        return bdDgsNeMapper.selectOne(queryWrapper);
    }
}
