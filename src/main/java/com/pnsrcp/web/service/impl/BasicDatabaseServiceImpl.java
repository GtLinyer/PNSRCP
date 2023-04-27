package com.pnsrcp.web.service.impl;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.pnsrcp.web.dao.basicDatabase.*;
import com.pnsrcp.web.dao.basicDatabaseCS.BDCsMapper;
import com.pnsrcp.web.dao.basicDatabaseCS.BDCsPdaTreatmentMapper;
import com.pnsrcp.web.dao.basicDatabaseCS.BDCsPdaUltrasoundMapper;
import com.pnsrcp.web.dao.basicDatabaseRP.BDRpRopMapper;
import com.pnsrcp.web.dao.basicDatabaseRP.BDRpSaMapper;
import com.pnsrcp.web.dao.basicDatabaseRP.BDRpSsListMapper;
import com.pnsrcp.web.dao.basicDatabaseRP.BDRpSsMapper;
import com.pnsrcp.web.dao.basicDatabaseRS.BDRsDcMapper;
import com.pnsrcp.web.dao.basicDatabaseRS.BDRsDeformityMapper;
import com.pnsrcp.web.dao.basicDatabaseRS.BDRsMapper;
import com.pnsrcp.web.dao.manage.AreaMapper;
import com.pnsrcp.web.dao.manage.HospitalMapper;
import com.pnsrcp.web.entity.perintalPlatform.BDBaseInformation;
import com.pnsrcp.web.entity.perintalPlatform.CaseStatus;
import com.pnsrcp.web.entity.perintalPlatform.Review;
import com.pnsrcp.web.entity.perintalPlatform.basicDatabaseCS.BDCSPdaTreatment;
import com.pnsrcp.web.entity.perintalPlatform.basicDatabaseCS.BDCSPdaUltrasound;
import com.pnsrcp.web.entity.perintalPlatform.basicDatabaseCS.BDCirculatorySystem;
import com.pnsrcp.web.entity.perintalPlatform.basicDatabaseRP.BDRPRopDiagnosis;
import com.pnsrcp.web.entity.perintalPlatform.basicDatabaseRP.BDRPScreeningAssessment;
import com.pnsrcp.web.entity.perintalPlatform.basicDatabaseRP.BDRPScreeningStatus;
import com.pnsrcp.web.entity.perintalPlatform.basicDatabaseRP.BDRPSsList;
import com.pnsrcp.web.entity.perintalPlatform.basicDatabse.*;
import com.pnsrcp.web.service.BasicDatabaseService;
import org.apache.ibatis.binding.BindingException;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import javax.servlet.http.HttpSession;
import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.Objects;

/**
 * @Project: 围产新生儿科研合作平台
 * @Author: Linyer
 * @Email: linyer@linyer.cn
 * @Date: 2021/6/28 17:25 星期一
 * @Description: 围产新生儿科研合作平台 基础数据库 服务层 实现类
 */
@Service
public class BasicDatabaseServiceImpl implements BasicDatabaseService {
    // 数据层 注入
    @Resource
    private BasicDatabaseMapper basicDatabaseMapper;
    @Resource
    private AreaMapper areaMapper;
    @Resource
    private HospitalMapper hospitalMapper;
    @Resource
    private BDGiMapper bdGiMapper;
    @Resource
    private BDPiMapper bdPiMapper;
    @Resource
    private BDRsMapper bdRsMapper;
    @Resource
    private BDCaMapper bdCaMapper;
    @Resource
    private BDRsDcMapper bdRsDcMapper;
    @Resource
    private BDRsDeformityMapper bdRsDeformityMapper;
    @Resource
    private BDCsMapper bdCsMapper;
    @Resource
    private BDCsPdaTreatmentMapper bdCsPdaTreatmentMapper;
    @Resource
    private BDCsPdaUltrasoundMapper bdCsPdaUltrasoundMapper;
    @Resource
    private BDRpSaMapper bdRpSaMapper;
    @Resource
    private BDRpSsMapper bdRpSsMapper;
    @Resource
    private BDRpSsListMapper bdRpSsListMapper;
    @Resource
    private BDRpRopMapper bdRpRopMapper;
    @Resource
    private BDDsMapper bdDsMapper;

    @Override
    public BDBaseInformation getBdBaseInformation(int motherId, int childId) {
        return basicDatabaseMapper.bdBaseInformationQry(motherId, childId);
    }

    @Override
    public String saveBDMI(HttpSession session, BDMotherInformation bdMotherInformation, int motherId, int userId, int hospitalId) {
        JSONObject json = new JSONObject();
        json.put("code", 0);
        if (motherId > 0) {
            bdMotherInformation.setMid(motherId);
            if (bdMotherInformation.getMotherFullName() != null && !bdMotherInformation.getMotherFullName().equals("")) {
                basicDatabaseMapper.bdMotherInformationUpdate(bdMotherInformation);
            }
            json.put("code", 2);
        } else {
            if (basicDatabaseMapper.bdMotherInformationInsert(bdMotherInformation, userId, hospitalId) > 0) {
                motherId = bdMotherInformation.getMid();
                hospitalMapper.hCaseNumUpdate(hospitalId);
                BDBabySituation iniBdBabySituation = new BDBabySituation();
                iniBdBabySituation.setMid(motherId);
                basicDatabaseMapper.bdBabySituationInsertUpdate(iniBdBabySituation);
                session.setAttribute("pcMotherNum", bdMotherInformation.getPcMotherNum());
                session.setAttribute("motherHospitalNum", bdMotherInformation.getMotherHospitalNumber());
                session.setAttribute("motherIdBD", motherId);
                session.setAttribute("childIdBD", iniBdBabySituation.getCid());
                json.put("code", 1);
            }
        }
        return json.toJSONString();
    }

    @Override
    public String saveBDGI(BDGestationInformation bdGestationInformation, int motherId, int childId) {
        bdGestationInformation.setMid(motherId);
        JSONObject json = new JSONObject();
        json.put("code", 0);
        if (bdGiMapper.insertOrUpdate(bdGestationInformation) > 0) {
            json.put("code", 1);
        }
        return json.toJSONString();
    }

    @Override
    public String saveBDPI(BDPerinatalInformation bdPerinatalInformation, int motherId, int childId) {
        bdPerinatalInformation.setMid(motherId);
        JSONObject json = new JSONObject();
        json.put("code", 0);
        if (bdPiMapper.insertOrUpdate(bdPerinatalInformation) > 0) {
            json.put("code", 1);
        }
        return json.toJSONString();
    }

    @Override
    public String saveBDBS(HttpSession session, BDBabySituation bdBabySituation, int childId, String pcMotherNum, int motherId, int hospitalId) {
        if (childId > 0) {
            bdBabySituation.setCid(childId);
        }
        bdBabySituation.setMid(motherId);
        JSONObject json = new JSONObject();
        json.put("code", 0);
        int multicellularNumber = bdBabySituation.getMulticellularNumber();
        if (multicellularNumber > 1) {
            setMulticellular(motherId, pcMotherNum, multicellularNumber);
        }
        if (basicDatabaseMapper.bdBabySituationInsertUpdate(bdBabySituation) > 0) {
            hospitalMapper.hCaseNumUpdate(hospitalId);
            session.setAttribute("pcChildNum", bdBabySituation.getPcNewbornNum());
            session.setAttribute("childHospitalNum", bdBabySituation.getChildHospitalNum());
            session.setAttribute("childFullName", bdBabySituation.getFullName());
            json.put("code", 1);
        }
        return json.toJSONString();
    }

    private void setMulticellular(int motherId, String pcMotherNum, int num) {
        String pcNewbornNum = pcMotherNum.substring(1);
        if (motherId > 0 && num > 0) {
            int childNum = basicDatabaseMapper.caseChildNumQry(motherId);
            if (childNum == 0) {
                // 原本 没有 新生儿数据
                if (num > 1) {
                    for (int i = 1; i <= num; i++) {
                        BDMotherBabyMsg motherBabyMsg = new BDMotherBabyMsg();
                        motherBabyMsg.setMid(motherId);
                        motherBabyMsg.setMulticellularNumber(num);
                        motherBabyMsg.setPcNewbornNum("n" + pcNewbornNum + "-" + i);
                        basicDatabaseMapper.bdBSChildInsert(motherBabyMsg);
                    }
                }
            } else {
                // 原本 有 新生儿数据
                // 填写的胎数 大于 原来新生儿数量
                if (num > childNum) {
                    basicDatabaseMapper.bdBSFetusesNumUpdate(motherId, num);
                    List<Integer> motherChildId = basicDatabaseMapper.motherChildIdQry(motherId);
                    int childIndex = 1;
                    for (int childId : motherChildId) {
                        basicDatabaseMapper.bdBSPcNewBornNumUpdate(motherId, childId, "n" + pcNewbornNum + "-" + childIndex);
                        childIndex ++;
                    }
                    for (int i = childNum + 1; i <= num; i ++) {
                        BDMotherBabyMsg motherBabyMsg = new BDMotherBabyMsg();
                        motherBabyMsg.setMid(motherId);
                        motherBabyMsg.setMulticellularNumber(num);
                        motherBabyMsg.setPcNewbornNum("n" + pcNewbornNum + "-" + i);
                        basicDatabaseMapper.bdBSChildInsert(motherBabyMsg);
                    }
                } else {
                    for (int i = num; i <= childNum; i ++) {
                        String pcNewbornNumDel = pcNewbornNum + "-" + i;
                        basicDatabaseMapper.bdBSChildDelete(motherId, pcNewbornNumDel);
                    }
                }
            }
        }
    }

    @Override
    public String saveBDRS(BDRecoverySituation bdRecoverySituation, String deathCauseArrayInput, String deformityArrayInput, int motherId, int childId) {
        bdRecoverySituation.setCid(childId);
        bdRecoverySituation.setMid(motherId);
        JSONObject json = new JSONObject();
        json.put("code", 0);
        if (bdRsMapper.insertOrUpdate(bdRecoverySituation) > 0) {
            json.put("code", 1);
        }
        JSONArray deathCauseArray = JSONArray.parseArray(deathCauseArrayInput);
        QueryWrapper<BDRSDeathCause> dcDeleteWrapper = new QueryWrapper<>();
        dcDeleteWrapper.eq("cid", childId);
        dcDeleteWrapper.eq("mid", motherId);
        bdRsDcMapper.delete(dcDeleteWrapper);
        for (int i = 0; i<deathCauseArray.size(); i++) {
            JSONObject deathCause = deathCauseArray.getJSONObject(i);
            BDRSDeathCause bdRsDeathCause = deathCause.toJavaObject(BDRSDeathCause.class);
            bdRsDeathCause.setCid(childId);
            bdRsDeathCause.setMid(motherId);
            if (bdRsDcMapper.insert(bdRsDeathCause) == 0) {
                json.put("code", 0);
            }
        }
        JSONArray deformityArray = JSONArray.parseArray(deformityArrayInput);
        QueryWrapper<BDRSDeformity> dfDeleteWrapper = new QueryWrapper<>();
        dfDeleteWrapper.eq("cid", childId);
        dfDeleteWrapper.eq("mid", motherId);
        bdRsDeformityMapper.delete(dfDeleteWrapper);
        for (int i = 0; i<deformityArray.size(); i++) {
            JSONObject deformity = deformityArray.getJSONObject(i);
            BDRSDeformity bdRsDeformity = deformity.toJavaObject(BDRSDeformity.class);
            bdRsDeformity.setCid(childId);
            bdRsDeformity.setMid(motherId);
            if (bdRsDeformityMapper.insert(bdRsDeformity) == 0) {
                json.put("code", 0);
            }
        }
        return json.toJSONString();
    }

    @Override
    public String getBdMaxNum(int hid, String hospitalizationYear) {
        JSONObject json = new JSONObject();
        json.put("code", 0);
        try {
            Integer maxId = basicDatabaseMapper.maxNumQry(hid, hospitalizationYear);
            json.put("maxId", Objects.requireNonNullElse(maxId, 1));
            json.put("code", 1);
        } catch (BindingException ignored) {}
        return json.toJSONString();
    }

    @Override
    public String motherInformationTest(String motherFullName, String motherPhone, String motherAge, String motherHospitalNumber) {
        JSONObject json = new JSONObject();
        json.put("code", 0);
        if (basicDatabaseMapper.bdMotherInformationTestQry(motherFullName, motherPhone, motherAge, motherHospitalNumber) == 0) {
            json.put("code", 1);
        }
        return json.toJSONString();
    }

    @Override
    public BDMotherInformation getBdMotherInformation(int motherId) {
        return basicDatabaseMapper.bdMotherInformationQry(motherId);
    }

    @Override
    public BDGestationInformation getBdGestationInformation(int motherId) {
        QueryWrapper<BDGestationInformation> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("mid", motherId);
        return bdGiMapper.selectOne(queryWrapper);
    }

    @Override
    public BDPerinatalInformation getBdPerinatalInformation(int motherId) {
        QueryWrapper<BDPerinatalInformation> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("mid", motherId);
        return bdPiMapper.selectOne(queryWrapper);
    }

    @Override
    public Date getDeliveryDate(int motherId) {
        return basicDatabaseMapper.bdDeliveryDateQry(motherId);
    }

    @Override
    public double getBdWeightGainDuringPregnancy(int motherId) {
        double motherWeightGainDuringPregnancy = 0;
        String motherWeightGainDuringPregnancyString = basicDatabaseMapper.bdWeightGainDuringPregnancyQry(motherId);
        if (motherWeightGainDuringPregnancyString != null) {
            motherWeightGainDuringPregnancy = Double.parseDouble(motherWeightGainDuringPregnancyString);
        }
        return motherWeightGainDuringPregnancy;
    }

    @Override
    public BDBabySituation getBdBabySituation(int childId, int motherId) {
        return basicDatabaseMapper.bdBabySituationQry(childId, motherId);
    }

    @Override
    public List<BDRSDeathCause> getBdRSDeathCause(int childId, int motherId) {
        QueryWrapper<BDRSDeathCause> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("cid", childId);
        queryWrapper.eq("mid", motherId);
        return bdRsDcMapper.selectList(queryWrapper);
    }

    @Override
    public List<BDRSDeformity> getBdRSDeformity(int childId, int motherId) {
        QueryWrapper<BDRSDeformity> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("cid", childId);
        queryWrapper.eq("mid", motherId);
        return bdRsDeformityMapper.selectList(queryWrapper);
    }

    @Override
    public String getBdDeathCauseDiagnosis(int deathCauseClassificationId) {
        JSONObject json = new JSONObject();
        json.put("code", 0);
        List<Map<String, String>> deathCauseDiagnosis = basicDatabaseMapper.bdDeathCauseDiagnosisQry(deathCauseClassificationId);
        json.put("deathCauseDiagnosis", deathCauseDiagnosis);
        json.put("code", 1);
        return json.toJSONString();
    }

    @Override
    public String getBdDeformityType(int deformitySystemId) {
        JSONObject json = new JSONObject();
        json.put("code", 0);
        List<Map<String, String>> deformityType = basicDatabaseMapper.bdDeformityTypeQry(deformitySystemId);
        json.put("deformityType", deformityType);
        json.put("code", 1);
        return json.toJSONString();
    }

    @Override
    public BDRecoverySituation getBdRecoverySituation(int childId, int motherId) {
        QueryWrapper<BDRecoverySituation> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("cid", childId);
        queryWrapper.eq("mid", motherId);
        return bdRsMapper.selectOne(queryWrapper);
    }

    @Override
    public String saveBDCA(BDCriticalAssessment bdCriticalAssessment, int childIdBD, int motherIdBD) {
        bdCriticalAssessment.setCid(childIdBD);
        bdCriticalAssessment.setMid(motherIdBD);
        JSONObject json = new JSONObject();
        json.put("code", 0);
        if (bdCaMapper.insertOrUpdate(bdCriticalAssessment) > 0) {
            json.put("code", 1);
        }
        return json.toJSONString();
    }

    @Override
    public BDCAMsg getBdCAMsg(int childId, int motherId) {
        return basicDatabaseMapper.bdCaMsgQry(childId, motherId);
    }

    @Override
    public BDCriticalAssessment getBdCriticalAssessment(int childId, int motherId) {
        QueryWrapper<BDCriticalAssessment> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("cid", childId);
        queryWrapper.eq("mid", motherId);
        return bdCaMapper.selectOne(queryWrapper);
    }

    @Override
    public List<Review> getBdReview(int childId, int motherId) {
        return basicDatabaseMapper.bdReviewQry(childId, motherId);
    }

    @Override
    public String saveBDCS(BDCirculatorySystem bdCirculatorySystem, String pdaUArrayInput, String pdaArrayInput, int childId, int motherId) {
        bdCirculatorySystem.setCid(childId);
        bdCirculatorySystem.setMid(motherId);
        JSONObject json = new JSONObject();
        json.put("code", 0);
        if (bdCsMapper.insertOrUpdate(bdCirculatorySystem) > 0 ) {
            json.put("code", 1);
        }
        JSONArray pdaUArray = JSONArray.parseArray(pdaUArrayInput);
        QueryWrapper<BDCSPdaUltrasound> pdaUsDeleteWrapper = new QueryWrapper<>();
        pdaUsDeleteWrapper.eq("cid", childId);
        pdaUsDeleteWrapper.eq("mid", motherId);
        bdCsPdaUltrasoundMapper.delete(pdaUsDeleteWrapper);
        for (int i = 0; i < pdaUArray.size(); i++) {
            JSONObject pdaUltrasound = pdaUArray.getJSONObject(i);
            BDCSPdaUltrasound bdCsPdaUltrasound = pdaUltrasound.toJavaObject(BDCSPdaUltrasound.class);
            bdCsPdaUltrasound.setCid(childId);
            bdCsPdaUltrasound.setMid(motherId);
            if (bdCsPdaUltrasoundMapper.insert(bdCsPdaUltrasound) == 0) {
                json.put("code", 0);
            }
        }
        JSONArray pdaArray = JSONArray.parseArray(pdaArrayInput);
        QueryWrapper<BDCSPdaTreatment> pdaTmDeleteWrapper = new QueryWrapper<>();
        pdaTmDeleteWrapper.eq("cid", childId);
        pdaTmDeleteWrapper.eq("mid", motherId);
        bdCsPdaTreatmentMapper.delete(pdaTmDeleteWrapper);
        for (int i = 0; i < pdaArray.size(); i++) {
            JSONObject pda = pdaArray.getJSONObject(i);
            BDCSPdaTreatment bdCsPdaTreatment = pda.toJavaObject(BDCSPdaTreatment.class);
            bdCsPdaTreatment.setCid(childId);
            bdCsPdaTreatment.setMid(motherId);
            if (bdCsPdaTreatmentMapper.insert(bdCsPdaTreatment) == 0) {
                json.put("code", 0);
            }
        }
        return json.toJSONString();
    }

    @Override
    public BDCirculatorySystem getBdCirculatorySystem(int childId, int motherId) {
        QueryWrapper<BDCirculatorySystem> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("cid", childId);
        queryWrapper.eq("mid", motherId);
        return bdCsMapper.selectOne(queryWrapper);
    }

    @Override
    public List<BDCSPdaUltrasound> getBdCsPdaUltrasoundList(int childId, int motherId) {
        QueryWrapper<BDCSPdaUltrasound> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("cid", childId);
        queryWrapper.eq("mid", motherId);
        return bdCsPdaUltrasoundMapper.selectList(queryWrapper);
    }

    @Override
    public List<BDCSPdaTreatment> getBdCsPdaTreatmentList(int childId, int motherId) {
        QueryWrapper<BDCSPdaTreatment> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("cid", childId);
        queryWrapper.eq("mid", motherId);
        return bdCsPdaTreatmentMapper.selectList(queryWrapper);
    }

    @Override
    public BDBirthMsg getBdBirthMsg(int childId, int motherId) {
        return basicDatabaseMapper.bdBirthMsgQry(childId, motherId);
    }

    @Override
    public String saveBDRPSS(BDRPScreeningStatus bdRpScreeningStatus, String ssArrayInput, int childId, int motherId) {
        bdRpScreeningStatus.setCid(childId);
        bdRpScreeningStatus.setMid(motherId);
        JSONObject json = new JSONObject();
        json.put("code", 0);
        if (bdRpSsMapper.insertOrUpdate(bdRpScreeningStatus) > 0) {
            json.put("code", 1);
        }
        JSONArray ssArray = JSONArray.parseArray(ssArrayInput);
        QueryWrapper<BDRPSsList> deleteWrapper = new QueryWrapper<>();
        deleteWrapper.eq("cid", childId);
        deleteWrapper.eq("mid", motherId);
        bdRpSsListMapper.delete(deleteWrapper);
        for (int i = 0; i < ssArray.size(); i ++) {
            JSONObject ss = ssArray.getJSONObject(i);
            BDRPSsList bdRpSsList = ss.toJavaObject(BDRPSsList.class);
            bdRpSsList.setCid(childId);
            bdRpSsList.setMid(motherId);
            if (bdRpSsListMapper.insert(bdRpSsList) == 0) {
                json.put("code", 0);
            }
        }
        return json.toJSONString();
    }

    @Override
    public BDRPScreeningStatus getBdRpScreeningStatus(int childId, int motherId) {
        QueryWrapper<BDRPScreeningStatus> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("cid", childId);
        queryWrapper.eq("mid", motherId);
        return bdRpSsMapper.selectOne(queryWrapper);
    }

    @Override
    public List<BDRPSsList> getBdRpSsList(int childId, int motherId) {
        QueryWrapper<BDRPSsList> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("cid", childId);
        queryWrapper.eq("mid", motherId);
        return bdRpSsListMapper.selectList(queryWrapper);
    }

    @Override
    public Date get45WeekDate(int childId, int motherId) {
        BDBirthMsg bdBirthMsg = basicDatabaseMapper.bdBirthMsgQry(childId, motherId);
        Date birthday = bdBirthMsg.getBirthday();
        int gaWeek = bdBirthMsg.getGestationalAgeWeek(),
                gaDay = bdBirthMsg.getGestationalAgeDay(), addDays;
        long birthdayStamp = birthday.getTime();
        if (gaDay == 0) {
            addDays = (45 - gaWeek)*7;
        } else {
            addDays = (7 - gaDay) + (44 - gaWeek)*7;
        }
        long cga45WeekStamp = birthdayStamp + addDays* 86400000L;
        return new Date(cga45WeekStamp);
    }

    @Override
    public String saveBDRPSA(BDRPScreeningAssessment bdRpScreeningAssessment, int childId, int motherId) {
        bdRpScreeningAssessment.setCid(childId);
        bdRpScreeningAssessment.setMid(motherId);
        JSONObject json = new JSONObject();
        json.put("code", 0);
        if (bdRpSaMapper.insertOrUpdate(bdRpScreeningAssessment) > 0) {
            json.put("code", 1);
        }
        return json.toJSONString();
    }

    @Override
    public BDRPScreeningAssessment getBdRpScreeningAssessment(int childId, int motherId) {
        QueryWrapper<BDRPScreeningAssessment> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("cid", childId);
        queryWrapper.eq("mid", motherId);
        return bdRpSaMapper.selectOne(queryWrapper);
    }

    @Override
    public String saveBDRPROP(BDRPRopDiagnosis bdRpRopDiagnosis, int childId, int motherId) {
        bdRpRopDiagnosis.setCid(childId);
        bdRpRopDiagnosis.setMid(motherId);
        JSONObject json = new JSONObject();
        json.put("code", 0);
        if (bdRpRopMapper.insertOrUpdate(bdRpRopDiagnosis) > 0) {
            json.put("code", 1);
        }
        return json.toJSONString();
    }

    @Override
    public BDRPRopDiagnosis getBdRpRopDiagnosis(int childId, int motherId) {
        QueryWrapper<BDRPRopDiagnosis> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("cid", childId);
        queryWrapper.eq("mid", motherId);
        return bdRpRopMapper.selectOne(queryWrapper);
    }

    @Override
    public String saveBDDS(BDDischargeSituation bdDischargeSituation, String deathCauseArrayInput, int childId, int motherId) {
        bdDischargeSituation.setCid(childId);
        bdDischargeSituation.setMid(motherId);
        JSONObject json = new JSONObject();
        json.put("code", 0);
        if (bdDsMapper.insertOrUpdate(bdDischargeSituation) > 0) {
            json.put("code", 1);
        }
        JSONArray deathCauseArray = JSONArray.parseArray(deathCauseArrayInput);
        QueryWrapper<BDRSDeathCause> deleteWrapper = new QueryWrapper<>();
        deleteWrapper.eq("cid", childId);
        deleteWrapper.eq("mid", motherId);
        bdRsDcMapper.delete(deleteWrapper);
        for (int i = 0; i<deathCauseArray.size(); i++) {
            JSONObject deathCause = deathCauseArray.getJSONObject(i);
            BDRSDeathCause bdRsDeathCause = deathCause.toJavaObject(BDRSDeathCause.class);
            bdRsDeathCause.setCid(childId);
            bdRsDeathCause.setMid(motherId);
            if (bdRsDcMapper.insert(bdRsDeathCause) == 0) {
                json.put("code", 0);
            }
        }
        return json.toJSONString();
    }

    @Override
    public BDDischargeSituation getBdDischargeSituation(int childId, int motherId) {
        QueryWrapper<BDDischargeSituation> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("cid", childId);
        queryWrapper.eq("mid", motherId);
        return bdDsMapper.selectOne(queryWrapper);
    }

    @Override
    public String getBdEctopicGrowthRetardation(int childId, int motherId) {
        return basicDatabaseMapper.bdEctopicGrowthRetardationQry(childId, motherId);
    }

    @Override
    public CaseStatus getBdCaseStatus(int childId, int motherId) {
        return basicDatabaseMapper.bdCaseStatusQry(childId, motherId);
    }

    @Override
    public int getBdReviewCount(int childId, int motherId) {
        return basicDatabaseMapper.bdReviewCount(childId, motherId);
    }

    @Override
    public String addBdReview(Review bdReview) {
        JSONObject json = new JSONObject();
        json.put("code", 0);
        if (basicDatabaseMapper.bdReviewInsert(bdReview) > 0) {
            basicDatabaseMapper.bdStatusUpdate(bdReview.getCid(), bdReview.getMid(), bdReview.getStatus());
            json.put("code", 1);
        }
        return json.toJSONString();
    }
}