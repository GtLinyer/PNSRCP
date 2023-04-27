package com.pnsrcp.web.service.impl;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.pnsrcp.web.dao.BasicDatabaseRTS.*;
import com.pnsrcp.web.dao.basicDatabase.BasicDatabaseMapper;
import com.pnsrcp.web.entity.perintalPlatform.BasicDatabaseRTS.*;
import com.pnsrcp.web.entity.perintalPlatform.basicDatabse.BDBirthMsg;
import com.pnsrcp.web.service.BasicDatabaseRtsService;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.Date;
import java.util.List;
import java.util.Map;

/**
 * @Project: 围产新生儿科研合作平台
 * @Author: Linyer
 * @Email: linyer@linyer.cn
 * @Date: 2021/8/29 15:49 星期日
 * @Description: 围产新生儿科研合作平台 基础数据库 服务层 实现类
 */
@Service
public class BasicDatabaseRtsServiceImpl implements BasicDatabaseRtsService {
    // 数据层 注入
    @Resource
    private BDRtsRsMapper bdRtsRsMapper;
    @Resource
    private BDRtsRsModeTimeMapper bdRtsRsModeTimeMapper;
    @Resource
    private BDRtsRsOcMapper bdRtsRsOcMapper;
    @Resource
    private BDRtsHfMapper bdRtsHfMapper;
    @Resource
    private BDRtsNvfMapper bdRtsNvfMapper;
    @Resource
    private BDRtsWfMapper bdRtsWfMapper;
    @Resource
    private BDRtsBpdMapper bdRtsBpdMapper;
    @Resource
    private BDRtsBpdGcMapper bdRtsBpdGcMapper;
    @Resource
    private BDRtsRdsMapper bdRtsRdsMapper;
    @Resource
    private BDRtsRdsPsMapper bdRtsRdsPsMapper;
    @Resource
    private BDRtsApneaMapper bdRtsApneaMapper;
    @Resource
    private BDRtsApneaCaffeineMapper bdRtsApneaCaffeineMapper;
    @Resource
    private BDRtsOdtMapper bdRtsOdtMapper;
    @Resource
    private BasicDatabaseRtsMapper basicDatabaseRtsMapper;
    @Resource
    private BasicDatabaseMapper basicDatabaseMapper;

    @Override
    public String saveBDRTSRS(BDRTSRespiratorySupport bdRtsRespiratorySupport, String rsModeTimeArrayInput, String ocArrayInput, int childId, int motherId) {
        bdRtsRespiratorySupport.setCid(childId);
        bdRtsRespiratorySupport.setMid(motherId);
        JSONObject json = new JSONObject();
        json.put("code", 0);
        if (bdRtsRsMapper.insertOrUpdate(bdRtsRespiratorySupport) > 0) {
            json.put("code", 1);
        }

        JSONArray rsModeTimeArray = JSONArray.parseArray(rsModeTimeArrayInput);
        QueryWrapper<BDRTSModeTime> deleteWrapper = new QueryWrapper<>();
        deleteWrapper.eq("cid", childId);
        deleteWrapper.eq("mid", motherId);
        bdRtsRsModeTimeMapper.delete(deleteWrapper);

        boolean hasEndTime = true;
        for (int i = 0; i < rsModeTimeArray.size(); i++) {
            JSONObject rsModeTime = rsModeTimeArray.getJSONObject(i);
            BDRTSModeTime bdRtsModeTime = rsModeTime.toJavaObject(BDRTSModeTime.class);
            bdRtsModeTime.setCid(childId);
            bdRtsModeTime.setMid(motherId);
            if (bdRtsModeTime.getEndRsDate() == null) {
                hasEndTime = false;
            }
            if (bdRtsRsModeTimeMapper.insert(bdRtsModeTime) == 0) {
                json.put("code", 0);
            }
        }
        if (hasEndTime) {
            updateRtsHfNvf(childId, motherId);
        }
        if (ocArrayInput != null) {
            JSONArray ocArray = JSONArray.parseArray(ocArrayInput);
            QueryWrapper<BDRTSRsOxygenConcentration> ocDeleteWrapper = new QueryWrapper<>();
            ocDeleteWrapper.eq("cid", childId);
            ocDeleteWrapper.eq("mid", motherId);
            bdRtsRsOcMapper.delete(ocDeleteWrapper);
            for (int i = 0; i < ocArray.size(); i++) {
                JSONObject oc = ocArray.getJSONObject(i);
                BDRTSRsOxygenConcentration bdRtsRsOxygenConcentration = oc.toJavaObject(BDRTSRsOxygenConcentration.class);
                bdRtsRsOxygenConcentration.setCid(childId);
                bdRtsRsOxygenConcentration.setMid(motherId);
                if (bdRtsRsOcMapper.insert(bdRtsRsOxygenConcentration) == 0) {
                    json.put("code", 0);
                }
            }
        }
        return json.toJSONString();
    }

    private void updateRtsHfNvf(int childId, int motherId) {
        // 查找所有 呼吸模式 起止时间
        QueryWrapper<BDRTSModeTime> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("cid", childId);
        queryWrapper.eq("mid", motherId);
        List<BDRTSModeTime> bdRtsModeTimeOrderList = bdRtsRsModeTimeMapper.selectList(queryWrapper);
        // 如果 有数据
        if (bdRtsModeTimeOrderList != null && bdRtsModeTimeOrderList.size() > 0) {
            // 取 呼吸模式 起止时间 第一个数据
            BDRTSModeTime bdRtsModeTime1st = bdRtsModeTimeOrderList.get(0);
            // 如果是 HFNC模式
            if (bdRtsModeTime1st.getRespiratorySupportMode().equals("HFNC")) {
                BDRTSHfncFailed bdRtsHfncFailed = new BDRTSHfncFailed();
                // 如果 时间大于一周 HFNC成功，否则 HFNC失败
                if (bdRtsModeTime1st.getTotalHours() != null && !bdRtsModeTime1st.getTotalHours().equals("")) {
                    int hours = Integer.parseInt(bdRtsModeTime1st.getTotalHours());
                    if (hours > 168) {
                        basicDatabaseRtsMapper.bdRtsHfInitialHfncInsertUpdate(childId, motherId, 1, 0);
                    } else {
                        basicDatabaseRtsMapper.bdRtsHfInitialHfncInsertUpdate(childId, motherId, 1, 1);
                    }
                    bdRtsHfncFailed.setCid(childId);
                    bdRtsHfncFailed.setMid(motherId);
                    bdRtsHfncFailed.setStartHfncTime(bdRtsModeTime1st.getStartRsDate());
                    bdRtsHfncFailed.setEndHfncTime(bdRtsModeTime1st.getEndRsDate());
                    bdRtsHfncFailed.setHfncUseTimeDay(String.valueOf(bdRtsModeTime1st.getTotalDays()));
                    bdRtsHfncFailed.setHfncUseTimeHour(String.valueOf(bdRtsModeTime1st.getTotalDaysMoreHours()));
                    // 如果 呼吸模式 起止时间 数据 不止一条，取第二条数据
                    if (bdRtsModeTimeOrderList.size() > 1) {
                        BDRTSModeTime bdRtsModeTime2nd = bdRtsModeTimeOrderList.get(1);
                        bdRtsHfncFailed.setRespiratorySupportMethodAfterHFNC(bdRtsModeTime2nd.getRespiratorySupportMode());
                    }
                    basicDatabaseRtsMapper.bdRtsHfncFailedInitialUpdate(bdRtsHfncFailed);
                    basicDatabaseRtsMapper.bdRtsNvfInitialNivInsertUpdate(childId, motherId, 0, 0);
                }
            } else {
                // 如果 呼吸模式 起止时间 第一个数据 不是 HFNC模式
                basicDatabaseRtsMapper.bdRtsHfInitialHfncInsertUpdate(childId, motherId, 0, 0);
                // 如果 呼吸模式 起止时间 第一个数据 是 无创高频/NIPPV/BIPAP/NCPAP
                if (bdRtsModeTime1st.getRespiratorySupportMode().equals("无创高频") || bdRtsModeTime1st.getRespiratorySupportMode().equals("NIPPV") ||  bdRtsModeTime1st.getRespiratorySupportMode().equals("BIPAP") ||  bdRtsModeTime1st.getRespiratorySupportMode().equals("NCPAP")) {
                    Date birthday = basicDatabaseMapper.bdBirthMsgQry(childId, motherId).getBirthday();
                    basicDatabaseRtsMapper.bdRtsNvfInitialNivInsertUpdate(childId, motherId, 1, 0);
                    BDRTSNivFailed bdRtsNivFailed = new BDRTSNivFailed();
                    bdRtsNivFailed.setCid(childId);
                    bdRtsNivFailed.setMid(motherId);
                    bdRtsNivFailed.setStartNivMethod(bdRtsModeTime1st.getRespiratorySupportMode());
                    bdRtsNivFailed.setStartNivTime(bdRtsModeTime1st.getStartRsDate());
                    bdRtsNivFailed.setEndNivTime(bdRtsModeTime1st.getEndRsDate());
                    bdRtsNivFailed.setNivUseTimeDay(String.valueOf(bdRtsModeTime1st.getTotalDays()));
                    bdRtsNivFailed.setNivUseTimeHour(String.valueOf(bdRtsModeTime1st.getTotalDaysMoreHours()));
                    // 无创通气 在生后h 停止
                    long stopAfterHour = (bdRtsModeTime1st.getEndRsDate().getTime() - birthday.getTime())/3600000;
                    bdRtsNivFailed.setStopAfterHour(String.valueOf(stopAfterHour));
                    if (bdRtsModeTimeOrderList.size() > 1) {
                        BDRTSModeTime bdRtsModeTime2nd = bdRtsModeTimeOrderList.get(1);
                        bdRtsNivFailed.setRespiratorySupportMethodAfterNIV(bdRtsModeTime2nd.getRespiratorySupportMode());

                        if (stopAfterHour < 72) {
                            if (bdRtsModeTime2nd.getRespiratorySupportMode().equals("有创高频") || bdRtsModeTime2nd.getRespiratorySupportMode().equals("有创常频")) {
                                bdRtsNivFailed.setInitialNivFailed(1);
                            } else {
                                bdRtsNivFailed.setInitialNivFailed(0);
                            }
                        } else {
                            bdRtsNivFailed.setInitialNivFailed(0);
                        }
                    } else {
                        bdRtsNivFailed.setInitialNivFailed(0);
                    }
                    basicDatabaseRtsMapper.bdRtsNivFailedInitialUpdate(bdRtsNivFailed);
                } else {
                    basicDatabaseRtsMapper.bdRtsNvfInitialNivInsertUpdate(childId, motherId, 0, 0);
                }
            }
            // 有创通气 次数
            int ivTimes = 0;
            long lastEndTime = 0;
            int bdRtsWfNum = basicDatabaseRtsMapper.bdRtsWfNumQry(childId, motherId);
            for (int i = 0; i < bdRtsModeTimeOrderList.size(); i++) {
                BDRTSInvasiveVentilation bdRtsInvasiveVentilation = new BDRTSInvasiveVentilation();
                BDRTSModeTime bdrtsModeTime = bdRtsModeTimeOrderList.get(i);
                // 有创通气
                if (bdrtsModeTime.getRespiratorySupportMode().equals("有创高频") || bdrtsModeTime.getRespiratorySupportMode().equals("有创常频")) {
                    ivTimes++;
                    BDRTSModeTime bdrtsModeTimeNext;
                    if (i < bdRtsModeTimeOrderList.size() - 1) {
                        bdrtsModeTimeNext = bdRtsModeTimeOrderList.get(i + 1);
                        if (bdrtsModeTimeNext.getRespiratorySupportMode().equals("无创高频") || bdrtsModeTimeNext.getRespiratorySupportMode().equals("NIPPV") ||  bdrtsModeTimeNext.getRespiratorySupportMode().equals("BIPAP") ||  bdrtsModeTimeNext.getRespiratorySupportMode().equals("NCPAP")) {
                            bdRtsInvasiveVentilation.setAfterWeaningNivMethod(bdrtsModeTimeNext.getRespiratorySupportMode());
                        }
                    }

                    bdRtsInvasiveVentilation.setCid(childId);
                    bdRtsInvasiveVentilation.setMid(motherId);
                    bdRtsInvasiveVentilation.setIvMethod(bdrtsModeTime.getRespiratorySupportMode());
                    if (lastEndTime > 0) {
                        long ivInterval = (bdrtsModeTime.getStartRsDate().getTime() - lastEndTime)/3600000;
                        bdRtsInvasiveVentilation.setIvInterval(String.valueOf(ivInterval));
                        if (ivInterval > 0 && ivInterval < 168) {
                            bdRtsInvasiveVentilation.setIvWeaningFailed(1);
                        } else {
                            bdRtsInvasiveVentilation.setIvWeaningFailed(0);
                        }
                    }
                    bdRtsInvasiveVentilation.setIvStartTime(bdrtsModeTime.getStartRsDate());
                    bdRtsInvasiveVentilation.setIvEndTime(bdrtsModeTime.getEndRsDate());
                    bdRtsInvasiveVentilation.setIvUseTimeDay(String.valueOf(bdrtsModeTime.getTotalDays()));
                    bdRtsInvasiveVentilation.setIvUseTimeHour(String.valueOf(bdrtsModeTime.getTotalDaysMoreHours()));
                    if (i > bdRtsWfNum) {
                        bdRtsWfMapper.insert(bdRtsInvasiveVentilation);
                    }
                    lastEndTime = bdrtsModeTime.getEndRsDate().getTime();
                }
            }
            if (ivTimes > 0) {
                basicDatabaseRtsMapper.bdRtsWfInvasiveVentilationInsertUpdate(childId, motherId, 1, ivTimes);
            } else {
                basicDatabaseRtsMapper.bdRtsWfInvasiveVentilationInsertUpdate(childId, motherId, 0, 0);
            }
        }
    }

    @Override
    public Date getBdBirthday(int childIdBD, int motherIdBD) {
        return basicDatabaseMapper.bdBirthMsgQry(childIdBD, motherIdBD).getBirthday();
    }

    @Override
    public BDBirthMsg getBdGestationalAge(int childIdBD, int motherIdBD) {
        return basicDatabaseMapper.bdBirthMsgQry(childIdBD, motherIdBD);
    }

    @Override
    public List<BDRTSModeTime> getBdRtsRsModeTime(int childId, int motherId) {
        QueryWrapper<BDRTSModeTime> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("cid", childId);
        queryWrapper.eq("mid", motherId);
        return bdRtsRsModeTimeMapper.selectList(queryWrapper);
    }

    @Override
    public List<BDRTSRsOxygenConcentration> getBdRtsRsOxygenConcentration(int childId, int motherId) {
        QueryWrapper<BDRTSRsOxygenConcentration> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("cid", childId);
        queryWrapper.eq("mid", motherId);
        return bdRtsRsOcMapper.selectList(queryWrapper);
    }

    @Override
    public BDRTSRespiratorySupport getBdRtsRespiratorySupport(int childId, int motherId) {
        QueryWrapper<BDRTSRespiratorySupport> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("cid", childId);
        queryWrapper.eq("mid", motherId);
        return bdRtsRsMapper.selectOne(queryWrapper);
    }

    @Override
    public BDRTSHfncFailed getBdRtsHfncFailed(int childId, int motherId) {
        QueryWrapper<BDRTSHfncFailed> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("cid", childId);
        queryWrapper.eq("mid", motherId);
        return bdRtsHfMapper.selectOne(queryWrapper);
    }

    @Override
    public String saveBDRTSHF(BDRTSHfncFailed bdRtsHfncFailed, int childId, int motherId) {
        JSONObject json = new JSONObject();
        json.put("code", 0);
        QueryWrapper<BDRTSHfncFailed> updateWrapper = new QueryWrapper<>();
        updateWrapper.eq("cid", childId);
        updateWrapper.eq("mid", motherId);
        if (bdRtsHfMapper.update(bdRtsHfncFailed, updateWrapper) > 0) {
            json.put("code", 1);
        }
        return json.toJSONString();
    }

    @Override
    public BDRTSNivFailed getBdRtsNivFailed(int childId, int motherId) {
        QueryWrapper<BDRTSNivFailed> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("cid", childId);
        queryWrapper.eq("mid", motherId);
        return bdRtsNvfMapper.selectOne(queryWrapper);
    }

    @Override
    public String saveBDRTSNVF(BDRTSNivFailed bdrtsNivFailed, int childId, int motherId) {
        JSONObject json = new JSONObject();
        json.put("code", 0);
        QueryWrapper<BDRTSNivFailed> updateWrapper = new QueryWrapper<>();
        updateWrapper.eq("cid", childId);
        updateWrapper.eq("mid", motherId);
        if (bdRtsNvfMapper.update(bdrtsNivFailed, updateWrapper) > 0) {
            json.put("code", 1);
        }
        return json.toJSONString();
    }

    @Override
    public Map<String, String> getBdRtsWfInvasiveVentilation(int childIdBD, int motherIdBD) {
        return basicDatabaseRtsMapper.bdRtsWfInvasiveVentilationQry(childIdBD, motherIdBD);
    }

    @Override
    public List<BDRTSInvasiveVentilation> getBdRtsWeaningFailedIv(int childId, int motherId) {
        QueryWrapper<BDRTSInvasiveVentilation> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("cid", childId);
        queryWrapper.eq("mid", motherId);
        return bdRtsWfMapper.selectList(queryWrapper);
    }

    @Override
    public String saveBDRTSWS(String data, int childId, int motherId) {
        JSONObject json = new JSONObject();
        json.put("code", 1);
        if (data != null) {
            JSONArray dataArray = JSONArray.parseArray(data);
            QueryWrapper<BDRTSInvasiveVentilation> deleteWrapper = new QueryWrapper<>();
            deleteWrapper.eq("cid", childId);
            deleteWrapper.eq("mid", motherId);
            bdRtsWfMapper.delete(deleteWrapper);
            for (int i = 0; i < dataArray.size(); i++) {
                JSONObject ivData = dataArray.getJSONObject(i);
                BDRTSInvasiveVentilation bdRtsInvasiveVentilation = ivData.toJavaObject(BDRTSInvasiveVentilation.class);
                bdRtsInvasiveVentilation.setCid(childId);
                bdRtsInvasiveVentilation.setMid(motherId);
                if (bdRtsWfMapper.insert(bdRtsInvasiveVentilation) == 0) {
                    json.put("code", 0);
                }
            }
        }
        return json.toJSONString();
    }

    @Override
    public String saveBDRTSBPD(BDRTSBpd bdRtsBpd, String gcArrayInput, int childId, int motherId) {
        JSONObject json = new JSONObject();
        json.put("code", 1);
        bdRtsBpd.setCid(childId);
        bdRtsBpd.setMid(motherId);
        if (bdRtsBpdMapper.insertOrUpdate(bdRtsBpd) == 0) {
            json.put("code", 0);
        }

        if (gcArrayInput != null) {
            JSONArray gcArray = JSONArray.parseArray(gcArrayInput);
            QueryWrapper<BDRTSBpdGc> deleteWrapper = new QueryWrapper<>();
            deleteWrapper.eq("cid", childId);
            deleteWrapper.eq("mid", motherId);
            bdRtsBpdGcMapper.delete(deleteWrapper);
            for (int i = 0; i < gcArray.size(); i++) {
                JSONObject gc = gcArray.getJSONObject(i);
                BDRTSBpdGc bdRtsBpdGc = gc.toJavaObject(BDRTSBpdGc.class);
                bdRtsBpdGc.setCid(childId);
                bdRtsBpdGc.setMid(motherId);
                if (bdRtsBpdGcMapper.insert(bdRtsBpdGc) == 0) {
                    json.put("code", 0);
                }
            }
        }
        return json.toJSONString();
    }

    @Override
    public BDRTSBpd getBdRtsBpd(int childId, int motherId) {
        QueryWrapper<BDRTSBpd> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("cid", childId);
        queryWrapper.eq("mid", motherId);
        return bdRtsBpdMapper.selectOne(queryWrapper);
    }

    @Override
    public List<BDRTSBpdGc> getBdRtsBpdGc(int childId, int motherId) {
        QueryWrapper<BDRTSBpdGc> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("cid", childId);
        queryWrapper.eq("mid", motherId);
        return bdRtsBpdGcMapper.selectList(queryWrapper);
    }

    @Override
    public String saveBDRTSRDS(BDRTSRds bdRtsRds, String psArrayInput, int childId, int motherId) {
        JSONObject json = new JSONObject();
        json.put("code", 1);
        bdRtsRds.setCid(childId);
        bdRtsRds.setMid(motherId);
        if (bdRtsRdsMapper.insertOrUpdate(bdRtsRds) == 0) {
            json.put("code", 0);
        }

        if (psArrayInput != null) {
            JSONArray psArray = JSONArray.parseArray(psArrayInput);
            QueryWrapper<BDRTSRdsPs> deleteWrapper = new QueryWrapper<>();
            deleteWrapper.eq("cid", childId);
            deleteWrapper.eq("mid", motherId);
            bdRtsRdsPsMapper.delete(deleteWrapper);
            for (int i = 0; i < psArray.size(); i++) {
                JSONObject ps = psArray.getJSONObject(i);
                BDRTSRdsPs bdRtsRdsPs = ps.toJavaObject(BDRTSRdsPs.class);
                bdRtsRdsPs.setCid(childId);
                bdRtsRdsPs.setMid(motherId);
                if (bdRtsRdsPsMapper.insert(bdRtsRdsPs) == 0) {
                    json.put("code", 0);
                }
            }
        }
        return json.toJSONString();
    }

    @Override
    public BDRTSRds getBdRtsRds(int childId, int motherId) {
        QueryWrapper<BDRTSRds> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("cid", childId);
        queryWrapper.eq("mid", motherId);
        return bdRtsRdsMapper.selectOne(queryWrapper);
    }

    @Override
    public List<BDRTSRdsPs> getBdRtsRdsPs(int childId, int motherId) {
        QueryWrapper<BDRTSRdsPs> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("cid", childId);
        queryWrapper.eq("mid", motherId);
        return bdRtsRdsPsMapper.selectList(queryWrapper);
    }

    @Override
    public String saveBDRTSApnea(BDRTSApnea bdRtsApnea, String apArrayInput, int childId, int motherId) {
        JSONObject json = new JSONObject();
        json.put("code", 1);
        bdRtsApnea.setCid(childId);
        bdRtsApnea.setMid(motherId);
        if (bdRtsApneaMapper.insertOrUpdate(bdRtsApnea) == 0) {
            json.put("code", 0);
        }

        if (apArrayInput != null) {
            JSONArray apArray = JSONArray.parseArray(apArrayInput);
            QueryWrapper<BDRTSApneaCaffeine> deleteWrapper = new QueryWrapper<>();
            deleteWrapper.eq("cid", childId);
            deleteWrapper.eq("mid", motherId);
            bdRtsApneaCaffeineMapper.delete(deleteWrapper);
            for (int i = 0; i < apArray.size(); i++) {
                JSONObject ap = apArray.getJSONObject(i);
                BDRTSApneaCaffeine bdRtsApneaCaffeine = ap.toJavaObject(BDRTSApneaCaffeine.class);
                bdRtsApneaCaffeine.setCid(childId);
                bdRtsApneaCaffeine.setMid(motherId);
                if (bdRtsApneaCaffeineMapper.insert(bdRtsApneaCaffeine) == 0) {
                    json.put("code", 0);
                }
            }
        }
        return json.toJSONString();
    }

    @Override
    public BDRTSApnea getBdRtsApnea(int childId, int motherId) {
        QueryWrapper<BDRTSApnea> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("cid", childId);
        queryWrapper.eq("mid", motherId);
        return bdRtsApneaMapper.selectOne(queryWrapper);
    }

    @Override
    public List<BDRTSApneaCaffeine> getBdRtsApneaCaffeine(int childId, int motherId) {
        QueryWrapper<BDRTSApneaCaffeine> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("cid", childId);
        queryWrapper.eq("mid", motherId);
        return bdRtsApneaCaffeineMapper.selectList(queryWrapper);
    }

    @Override
    public BDRTSOtherDiagnosisTreatment getBdRtsOtherDiagnosisTreatment(int childId, int motherId) {
        QueryWrapper<BDRTSOtherDiagnosisTreatment> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("cid", childId);
        queryWrapper.eq("mid", motherId);
        return bdRtsOdtMapper.selectOne(queryWrapper);
    }

    @Override
    public String saveBDRTSODT(BDRTSOtherDiagnosisTreatment bdRtsOtherDiagnosisTreatment, int childId, int motherId) {
        JSONObject json = new JSONObject();
        json.put("code", 0);
        bdRtsOtherDiagnosisTreatment.setCid(childId);
        bdRtsOtherDiagnosisTreatment.setMid(motherId);
        if (bdRtsOdtMapper.insertOrUpdate(bdRtsOtherDiagnosisTreatment) > 0) {
            json.put("code", 1);
        }
        return json.toJSONString();
    }
}