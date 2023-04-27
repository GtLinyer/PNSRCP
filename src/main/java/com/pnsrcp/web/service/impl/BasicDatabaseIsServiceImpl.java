package com.pnsrcp.web.service.impl;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.pnsrcp.web.dao.basicDatabase.BasicDatabaseMapper;
import com.pnsrcp.web.dao.basicDatabaseIs.*;
import com.pnsrcp.web.entity.perintalPlatform.basicDatabaseIS.*;
import com.pnsrcp.web.service.BasicDatabaseIsService;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.Date;
import java.util.List;

/**
 * @Project: 围产新生儿科研合作平台
 * @Author: Linyer
 * @Email: linyer@linyer.cn
 * @Date: 2021/9/20 1:02 星期一
 * @Description: 围产新生儿科研合作平台 基础数据库 感染监测 服务层 实现类
 */
@Service
public class BasicDatabaseIsServiceImpl implements BasicDatabaseIsService {
    // 数据层 注入
    @Resource
    private BasicDatabaseMapper basicDatabaseMapper;
    @Resource
    private BDIsEosMapper bdIsEosMapper;
    @Resource
    private BDIsEosAeMapper bdIsEosAeMapper;
    @Resource
    private BDIsEosBcMapper bdIsEosBcMapper;
    @Resource
    private BDIsEosNsiMapper bdIsEosNsiMapper;
    @Resource
    private BDIsEosCfcMapper bdIsEosCfcMapper;
    @Resource
    private BDIsLosMapper bdIsLosMapper;
    @Resource
    private BDIsLosRfMapper bdIsLosRfMapper;
    @Resource
    private BDIsLosAeMapper bdIsLosAeMapper;
    @Resource
    private BDIsLosBcMapper bdIsLosBcMapper;
    @Resource
    private BDIsLosNsiMapper bdIsLosNsiMapper;
    @Resource
    private BDIsLosCfcMapper bdIsLosCfcMapper;
    @Resource
    private BDIsAdMapper bdIsAdMapper;
    @Resource
    private BDIsAdUseMapper bdIsAdUseMapper;
    @Resource
    private BDIsEvaluationIndexMapper bdIsEvaluationIndexMapper;
    @Resource
    private BDIsOidMapper BDIsOidMapper;

    @Override
    public Date getChildBirthday(int childId, int motherId) {
        return basicDatabaseMapper.bdBirthMsgQry(childId, motherId).getBirthday();
    }

    @Override
    public String getBdIsChorioamnionitis(int motherId) {
        return basicDatabaseMapper.bdIsChorioamnionitisryQry(motherId);
    }

    @Override
    public String saveBDISEos(BDISEos bdIsEos, String aeArrayInput, String bcArrayInput, String nsiArrayInput, String cfcArrayInput, int childId, int motherId) {
        JSONObject json = new JSONObject();
        json.put("code", 1);
        bdIsEos.setCid(childId);
        bdIsEos.setMid(motherId);
        if (bdIsEosMapper.insertOrUpdate(bdIsEos) == 0) {
            json.put("code", 0);
        }

        if (aeArrayInput != null) {
            JSONArray aeArray = JSONArray.parseArray(aeArrayInput);
            QueryWrapper<BDISEosAe> deleteWrapper = new QueryWrapper<>();
            deleteWrapper.eq("cid", childId);
            deleteWrapper.eq("mid", motherId);
            bdIsEosAeMapper.delete(deleteWrapper);
            for (int i = 0; i < aeArray.size(); i++) {
                JSONObject ae = aeArray.getJSONObject(i);
                BDISEosAe bdIsEosAe = ae.toJavaObject(BDISEosAe.class);
                bdIsEosAe.setCid(childId);
                bdIsEosAe.setMid(motherId);
                if (bdIsEosAeMapper.insert(bdIsEosAe) == 0) {
                    json.put("code", 0);
                }
            }
        }
        if (bcArrayInput != null) {
            JSONArray bcArray = JSONArray.parseArray(bcArrayInput);
            QueryWrapper<BDISEosBc> deleteWrapper = new QueryWrapper<>();
            deleteWrapper.eq("cid", childId);
            deleteWrapper.eq("mid", motherId);
            bdIsEosBcMapper.delete(deleteWrapper);
            for (int i = 0; i < bcArray.size(); i++) {
                JSONObject bc = bcArray.getJSONObject(i);
                BDISEosBc bdIsEosBc = bc.toJavaObject(BDISEosBc.class);
                bdIsEosBc.setCid(childId);
                bdIsEosBc.setMid(motherId);
                if (bdIsEosBcMapper.insert(bdIsEosBc) == 0) {
                    json.put("code", 0);
                }
            }
        }
        if (nsiArrayInput != null) {
            JSONArray nsiArray = JSONArray.parseArray(nsiArrayInput);
            QueryWrapper<BDISEosNsi> deleteWrapper = new QueryWrapper<>();
            deleteWrapper.eq("cid", childId);
            deleteWrapper.eq("mid", motherId);
            bdIsEosNsiMapper.delete(deleteWrapper);
            for (int i = 0; i < nsiArray.size(); i++) {
                JSONObject nsi = nsiArray.getJSONObject(i);
                BDISEosNsi bdIsEosNsi = nsi.toJavaObject(BDISEosNsi.class);
                bdIsEosNsi.setCid(childId);
                bdIsEosNsi.setMid(motherId);
                if (bdIsEosNsiMapper.insert(bdIsEosNsi) == 0) {
                    json.put("code", 0);
                }
            }
        }
        if (cfcArrayInput != null) {
            JSONArray cfcArray = JSONArray.parseArray(cfcArrayInput);
            QueryWrapper<BDISEosCfc> deleteWrapper = new QueryWrapper<>();
            deleteWrapper.eq("cid", childId);
            deleteWrapper.eq("mid", motherId);
            bdIsEosCfcMapper.delete(deleteWrapper);
            for (int i = 0; i < cfcArray.size(); i++) {
                JSONObject cfc = cfcArray.getJSONObject(i);
                BDISEosCfc bdIsEosCfc = cfc.toJavaObject(BDISEosCfc.class);
                bdIsEosCfc.setCid(childId);
                bdIsEosCfc.setMid(motherId);
                if (bdIsEosCfcMapper.insert(bdIsEosCfc) == 0) {
                    json.put("code", 0);
                }
            }
        }
        return json.toJSONString();
    }

    @Override
    public BDISEos getBdIsEos(int childId, int motherId) {
        QueryWrapper<BDISEos> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("cid", childId);
        queryWrapper.eq("mid", motherId);
        return bdIsEosMapper.selectOne(queryWrapper);
    }

    @Override
    public List<BDISEosAe> getBdIsEosAe(int childId, int motherId) {
        QueryWrapper<BDISEosAe> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("cid", childId);
        queryWrapper.eq("mid", motherId);
        return bdIsEosAeMapper.selectList(queryWrapper);
    }

    @Override
    public List<BDISEosBc> getBdIsEosBc(int childId, int motherId) {
        QueryWrapper<BDISEosBc> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("cid", childId);
        queryWrapper.eq("mid", motherId);
        return bdIsEosBcMapper.selectList(queryWrapper);
    }

    @Override
    public List<BDISEosNsi> getBdIsEosNsi(int childId, int motherId) {
        QueryWrapper<BDISEosNsi> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("cid", childId);
        queryWrapper.eq("mid", motherId);
        return bdIsEosNsiMapper.selectList(queryWrapper);
    }

    @Override
    public List<BDISEosCfc> getBdIsEosCfc(int childId, int motherId) {
        QueryWrapper<BDISEosCfc> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("cid", childId);
        queryWrapper.eq("mid", motherId);
        return bdIsEosCfcMapper.selectList(queryWrapper);
    }

    @Override
    public String saveBDISLos(BDISLos bdIsLos, String rfArrayInput, String aeArrayInput, String bcArrayInput, String nsiArrayInput, String cfcArrayInput, int childId, int motherId) {
        JSONObject json = new JSONObject();
        json.put("code", 1);
        bdIsLos.setCid(childId);
        bdIsLos.setMid(motherId);
        if (bdIsLosMapper.insertOrUpdate(bdIsLos) == 0) {
            json.put("code", 0);
        }

        if (rfArrayInput != null) {
            JSONArray rfArray = JSONArray.parseArray(rfArrayInput);
            QueryWrapper<BDISLosRf> deleteWrapper = new QueryWrapper<>();
            deleteWrapper.eq("cid", childId);
            deleteWrapper.eq("mid", motherId);
            bdIsLosRfMapper.delete(deleteWrapper);
            for (int i = 0; i < rfArray.size(); i++) {
                JSONObject rf = rfArray.getJSONObject(i);
                BDISLosRf bdIsLosrf = rf.toJavaObject(BDISLosRf.class);
                bdIsLosrf.setCid(childId);
                bdIsLosrf.setMid(motherId);
                if (bdIsLosRfMapper.insert(bdIsLosrf) == 0) {
                    json.put("code", 0);
                }
            }
        }
        if (aeArrayInput != null) {
            JSONArray aeArray = JSONArray.parseArray(aeArrayInput);
            QueryWrapper<BDISLosAe> deleteWrapper = new QueryWrapper<>();
            deleteWrapper.eq("cid", childId);
            deleteWrapper.eq("mid", motherId);
            bdIsLosAeMapper.delete(deleteWrapper);
            for (int i = 0; i < aeArray.size(); i++) {
                JSONObject ae = aeArray.getJSONObject(i);
                BDISLosAe bdIsLosAe = ae.toJavaObject(BDISLosAe.class);
                bdIsLosAe.setCid(childId);
                bdIsLosAe.setMid(motherId);
                if (bdIsLosAeMapper.insert(bdIsLosAe) == 0) {
                    json.put("code", 0);
                }
            }
        }
        if (bcArrayInput != null) {
            JSONArray bcArray = JSONArray.parseArray(bcArrayInput);
            QueryWrapper<BDISLosBc> deleteWrapper = new QueryWrapper<>();
            deleteWrapper.eq("cid", childId);
            deleteWrapper.eq("mid", motherId);
            bdIsLosBcMapper.delete(deleteWrapper);
            for (int i = 0; i < bcArray.size(); i++) {
                JSONObject bc = bcArray.getJSONObject(i);
                BDISLosBc bdIsLosBc = bc.toJavaObject(BDISLosBc.class);
                bdIsLosBc.setCid(childId);
                bdIsLosBc.setMid(motherId);
                if (bdIsLosBcMapper.insert(bdIsLosBc) == 0) {
                    json.put("code", 0);
                }
            }
        }
        if (nsiArrayInput != null) {
            JSONArray nsiArray = JSONArray.parseArray(nsiArrayInput);
            QueryWrapper<BDISLosNsi> deleteWrapper = new QueryWrapper<>();
            deleteWrapper.eq("cid", childId);
            deleteWrapper.eq("mid", motherId);
            bdIsLosNsiMapper.delete(deleteWrapper);
            for (int i = 0; i < nsiArray.size(); i++) {
                JSONObject nsi = nsiArray.getJSONObject(i);
                BDISLosNsi bdIsLosNsi = nsi.toJavaObject(BDISLosNsi.class);
                bdIsLosNsi.setCid(childId);
                bdIsLosNsi.setMid(motherId);
                if (bdIsLosNsiMapper.insert(bdIsLosNsi) == 0) {
                    json.put("code", 0);
                }
            }
        }
        if (cfcArrayInput != null) {
            JSONArray cfcArray = JSONArray.parseArray(cfcArrayInput);
            QueryWrapper<BDISLosCfc> deleteWrapper = new QueryWrapper<>();
            deleteWrapper.eq("cid", childId);
            deleteWrapper.eq("mid", motherId);
            bdIsLosCfcMapper.delete(deleteWrapper);
            for (int i = 0; i < cfcArray.size(); i++) {
                JSONObject cfc = cfcArray.getJSONObject(i);
                BDISLosCfc bdIsLosCfc = cfc.toJavaObject(BDISLosCfc.class);
                bdIsLosCfc.setCid(childId);
                bdIsLosCfc.setMid(motherId);
                if (bdIsLosCfcMapper.insert(bdIsLosCfc) == 0) {
                    json.put("code", 0);
                }
            }
        }
        return json.toJSONString();
    }

    @Override
    public BDISLos getBdIsLos(int childId, int motherId) {
        QueryWrapper<BDISLos> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("cid", childId);
        queryWrapper.eq("mid", motherId);
        return bdIsLosMapper.selectOne(queryWrapper);
    }

    @Override
    public List<BDISLosRf> getBdIsLosRf(int childId, int motherId) {
        QueryWrapper<BDISLosRf> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("cid", childId);
        queryWrapper.eq("mid", motherId);
        return bdIsLosRfMapper.selectList(queryWrapper);
    }

    @Override
    public List<BDISLosAe> getBdIsLosAe(int childId, int motherId) {
        QueryWrapper<BDISLosAe> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("cid", childId);
        queryWrapper.eq("mid", motherId);
        return bdIsLosAeMapper.selectList(queryWrapper);
    }

    @Override
    public List<BDISLosBc> getBdIsLosBc(int childId, int motherId) {
        QueryWrapper<BDISLosBc> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("cid", childId);
        queryWrapper.eq("mid", motherId);
        return bdIsLosBcMapper.selectList(queryWrapper);
    }

    @Override
    public List<BDISLosNsi> getBdIsLosNsi(int childId, int motherId) {
        QueryWrapper<BDISLosNsi> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("cid", childId);
        queryWrapper.eq("mid", motherId);
        return bdIsLosNsiMapper.selectList(queryWrapper);
    }

    @Override
    public List<BDISLosCfc> getBdIsLosCfc(int childId, int motherId) {
        QueryWrapper<BDISLosCfc> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("cid", childId);
        queryWrapper.eq("mid", motherId);
        return bdIsLosCfcMapper.selectList(queryWrapper);
    }

    @Override
    public String saveBDISAd(BDISAd bdIsAd, String adArrayInput, int childId, int motherId) {
        JSONObject json = new JSONObject();
        json.put("code", 1);
        bdIsAd.setCid(childId);
        bdIsAd.setMid(motherId);
        if (bdIsAdMapper.insertOrUpdate(bdIsAd) == 0) {
            json.put("code", 0);
        }

        if (adArrayInput != null) {
            JSONArray adArray = JSONArray.parseArray(adArrayInput);
            QueryWrapper<BDISAdUse> deleteWrapper = new QueryWrapper<>();
            deleteWrapper.eq("cid", childId);
            deleteWrapper.eq("mid", motherId);
            bdIsAdUseMapper.delete(deleteWrapper);
            for (int i = 0; i < adArray.size(); i++) {
                JSONObject ad = adArray.getJSONObject(i);
                BDISAdUse bdIsAdUse = ad.toJavaObject(BDISAdUse.class);
                bdIsAdUse.setCid(childId);
                bdIsAdUse.setMid(motherId);
                if (bdIsAdUseMapper.insert(bdIsAdUse) == 0) {
                    json.put("code", 0);
                }
            }
        }
        return json.toJSONString();
    }

    @Override
    public BDISAd getBdIsAd(int childId, int motherId) {
        QueryWrapper<BDISAd> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("cid", childId);
        queryWrapper.eq("mid", motherId);
        return bdIsAdMapper.selectOne(queryWrapper);
    }

    @Override
    public List<BDISAdUse> getBdIsAdUse(int childId, int motherId) {
        QueryWrapper<BDISAdUse> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("cid", childId);
        queryWrapper.eq("mid", motherId);
        return bdIsAdUseMapper.selectList(queryWrapper);
    }

    @Override
    public BDISEvaluationIndex getBdIsEvaluationIndex(int childId, int motherId) {
        QueryWrapper<BDISEvaluationIndex> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("cid", childId);
        queryWrapper.eq("mid", motherId);
        return bdIsEvaluationIndexMapper.selectOne(queryWrapper);
    }

    @Override
    public String saveBDISEI(BDISEvaluationIndex bdIsEvaluationIndex, int childId, int motherId) {
        JSONObject json = new JSONObject();
        json.put("code", 0);
        bdIsEvaluationIndex.setCid(childId);
        bdIsEvaluationIndex.setMid(motherId);
        if (bdIsEvaluationIndexMapper.insertOrUpdate(bdIsEvaluationIndex) > 0) {
            json.put("code", 1);
        }
        return json.toJSONString();
    }

    @Override
    public BDISOid getBdIsOid(int childId, int motherId) {
        QueryWrapper<BDISOid> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("cid", childId);
        queryWrapper.eq("mid", motherId);
        return BDIsOidMapper.selectOne(queryWrapper);
    }

    @Override
    public String saveBDISOID(BDISOid bdIsOid, int childId, int motherId) {
        JSONObject json = new JSONObject();
        json.put("code", 0);
        bdIsOid.setCid(childId);
        bdIsOid.setMid(motherId);
        if (BDIsOidMapper.insertOrUpdate(bdIsOid) > 0) {
            json.put("code", 1);
        }
        return json.toJSONString();
    }
}