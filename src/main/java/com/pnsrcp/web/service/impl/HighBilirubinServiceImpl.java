package com.pnsrcp.web.service.impl;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.pnsrcp.web.dao.HighBilirubinMapper;
import com.pnsrcp.web.dao.manage.AreaMapper;
import com.pnsrcp.web.entity.manage.Area;
import com.pnsrcp.web.entity.perintalPlatform.CaseStatus;
import com.pnsrcp.web.entity.perintalPlatform.Review;
import com.pnsrcp.web.entity.perintalPlatform.highBilirubin.*;
import com.pnsrcp.web.service.HighBilirubinService;
import org.apache.ibatis.binding.BindingException;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import javax.servlet.http.HttpSession;
import java.util.List;

/**
 * @Project: 围产新生儿科研合作平台
 * @Author: Linyer
 * @Email: linyer@linyer.cn
 * @Date: 2022/05/12 14:28 星期四
 * @Description: 围产新生儿科研合作平台 高胆数据库 服务层 实现类
 */
@Service
public class HighBilirubinServiceImpl implements HighBilirubinService {
    // 数据层 注入
    @Resource
    private HighBilirubinMapper highBilirubinMapper;
    @Resource
    private AreaMapper areaMapper;

    @Override
    public String getAreaNum(int userId) {
        List<Area> areaList = areaMapper.areaQuery(0, userId);
        Area area = new Area();
        if (areaList.size() > 0) {
            area = areaList.get(0);
        }
        return area.getAbbreviation();
    }

    @Override
    public int getHbMaxNum(int hid) {
        int maxId = 0;
        try {
            maxId = highBilirubinMapper.maxNumQry(hid);
        } catch (BindingException ignored) {}
        return maxId;
    }

    @Override
    public HBPerinatalInformation getHbPerinatalInformation(int motherIdHB) {
        return highBilirubinMapper.hbPerinatalInformationQry(motherIdHB);
    }

    @Override
    public String motherInformationTest(String motherFullName, String motherPhone, String motherHospitalNumber) {
        JSONObject json = new JSONObject();
        json.put("code", 0);
        if (highBilirubinMapper.hbPiMiTestQry(motherFullName, motherPhone, motherHospitalNumber) == 0) {
            json.put("code", 1);
        }
        return json.toJSONString();
    }

    @Override
    public String saveHBPI(HttpSession session, HBPerinatalInformation hbPerinatalInformation, int motherId, int userId, int hospitalId) {
        JSONObject json = new JSONObject();
        json.put("code", 0);
        if (motherId > 0) {
            hbPerinatalInformation.setMid(motherId);
            if (hbPerinatalInformation.getMotherFullName() != null && !hbPerinatalInformation.getMotherFullName().equals("")) {
                highBilirubinMapper.hbPerinatalInformationUpdate(hbPerinatalInformation);
            }
            json.put("code", 2);
        } else {
            if (highBilirubinMapper.hbPerinatalInformationInsert(hbPerinatalInformation, userId, hospitalId) > 0) {
                motherId = hbPerinatalInformation.getMid();
                session.setAttribute("pcMotherNum", hbPerinatalInformation.getPcHbMotherNum());
                session.setAttribute("motherIdHB", motherId);
                json.put("code", 1);
            }
        }
        return json.toJSONString();
    }

    @Override
    public HBHbtBasicInformation getHbHbtBasicInformation(int childIdHB, int motherIdHB) {
        return highBilirubinMapper.hbHbtBasicInformationQry(childIdHB, motherIdHB);
    }

    @Override
    public String saveHBTBI(HttpSession session, HBHbtBasicInformation hbHbtBasicInformation, int childIdHB, String pcMotherNum, int motherIdHB, int hospitalId) {
        if (childIdHB > 0) {
            hbHbtBasicInformation.setCid(childIdHB);
        }
        hbHbtBasicInformation.setMid(motherIdHB);
        JSONObject json = new JSONObject();
        json.put("code", 0);
        int multicellularNumber = hbHbtBasicInformation.getMulticellularNumber();
        if (highBilirubinMapper.hbHbtBasicInformationInsertUpdate(hbHbtBasicInformation) > 0) {
            session.setAttribute("childIdHB", hbHbtBasicInformation.getCid());
            session.setAttribute("pcChildNum", hbHbtBasicInformation.getPcHbChildNum());
            session.setAttribute("childHospitalNum", hbHbtBasicInformation.getChildHospitalNumber());
            session.setAttribute("childFullName", hbHbtBasicInformation.getChildFullName());
            json.put("code", 1);
        }
        if (multicellularNumber > 1) {
            setMulticellular(motherIdHB, pcMotherNum, multicellularNumber);
        }
        return json.toJSONString();
    }

    private void setMulticellular(int motherId, String pcHbMotherNum, int num) {
        String pcHbChildNum = pcHbMotherNum.substring(2);
        if (motherId > 0 && num > 0) {
            int childNum = highBilirubinMapper.hbCaseChildNumQry(motherId);
            if (childNum == 0) {
                // 原本 没有 新生儿数据
                if (num > 1) {
                    for (int i = 1; i <= num; i++) {
                        highBilirubinMapper.hbHbtBiChildInsert(motherId, num, "hn" + pcHbChildNum + "-" + i);
                    }
                }
            } else {
                // 原本 有 新生儿数据
                // 填写的胎数 大于 原来新生儿数量
                if (num > childNum) {
                    highBilirubinMapper.hbHbtBiFetusesNumUpdate(motherId, num);
                    List<Integer> motherChildId = highBilirubinMapper.motherChildIdQry(motherId);
                    int childIndex = 1;
                    for (int childId : motherChildId) {
                        highBilirubinMapper.hbHbtBiPcHbChildNumUpdate(motherId, childId, "hn" + pcHbChildNum + "-" + childIndex);
                        childIndex ++;
                    }
                    for (int i = childNum + 1; i <= num; i ++) {
                        highBilirubinMapper.hbHbtBiChildInsert(motherId, num, "hn" + pcHbChildNum + "-" + i);
                    }
                }
            }
        }
    }

    @Override
    public HBHbtHighBilirubinCauses getHbHbtHighBilirubinCauses(int childIdHB, int motherIdHB) {
        return highBilirubinMapper.hbHbtHighBilirubinCausesQry(childIdHB, motherIdHB);
    }

    @Override
    public String saveHBTHBC(HBHbtHighBilirubinCauses hbHbtHighBilirubinCauses, int childIdHB, int motherIdHB) {
        hbHbtHighBilirubinCauses.setCid(childIdHB);
        hbHbtHighBilirubinCauses.setMid(motherIdHB);
        JSONObject json = new JSONObject();
        json.put("code", 0);
        if (highBilirubinMapper.hbHbtHighBilirubinCausesInsertUpdate(hbHbtHighBilirubinCauses) > 0) {
            json.put("code", 1);
        }
        return json.toJSONString();
    }

    @Override
    public HBHbtCheckMetrics getHbHbtCheckMetrics(int childIdHB, int motherIdHB) {
        return highBilirubinMapper.hbHbtCheckMetricsQry(childIdHB, motherIdHB);
    }

    @Override
    public List<HBHbtCmPhototherapy> getHbHbtCmPhototherapy(int childIdHB, int motherIdHB) {
        return highBilirubinMapper.hbHbtCmPhototherapyQry(childIdHB, motherIdHB);
    }

    @Override
    public List<HBHbtCmExchangeBlood> getHbHbtCmExchangeBlood(int childIdHB, int motherIdHB) {
        return highBilirubinMapper.hbHbtCmExchangeBloodQry(childIdHB, motherIdHB);
    }

    @Override
    public String saveHBTCM(HBHbtCheckMetrics hbHbtCheckMetrics, String pArrayInput, String ebArrayInput, int childIdHB, int motherIdHB) {
        JSONObject json = new JSONObject();
        json.put("code", 1);
        hbHbtCheckMetrics.setCid(childIdHB);
        hbHbtCheckMetrics.setMid(motherIdHB);
        if (highBilirubinMapper.hbHbtCheckMetricsInsertUpdate(hbHbtCheckMetrics) == 0) {
            json.put("code", 0);
        }

        if (pArrayInput != null) {
            JSONArray pArray = JSONArray.parseArray(pArrayInput);
            highBilirubinMapper.hbHbtCmPhototherapyDelete(childIdHB, motherIdHB);
            for (int i = 0; i < pArray.size(); i++) {
                JSONObject phototherapy = pArray.getJSONObject(i);
                HBHbtCmPhototherapy hbHbtCmPhototherapy = phototherapy.toJavaObject(HBHbtCmPhototherapy.class);
                hbHbtCmPhototherapy.setCid(childIdHB);
                hbHbtCmPhototherapy.setMid(motherIdHB);
                if (highBilirubinMapper.hbHbtCmPhototherapyInsert(hbHbtCmPhototherapy) == 0) {
                    json.put("code", 0);
                }
            }
        }
        if (ebArrayInput != null) {
            JSONArray ebArray = JSONArray.parseArray(ebArrayInput);
            highBilirubinMapper.hbHbtCmExchangeBloodDelete(childIdHB, motherIdHB);
            for (int i = 0; i < ebArray.size(); i++) {
                JSONObject exchangeBlood = ebArray.getJSONObject(i);
                HBHbtCmExchangeBlood hbHbtCmExchangeBlood = exchangeBlood.toJavaObject(HBHbtCmExchangeBlood.class);
                hbHbtCmExchangeBlood.setCid(childIdHB);
                hbHbtCmExchangeBlood.setMid(motherIdHB);
                if (highBilirubinMapper.hbHbtCmExchangeBloodInsert(hbHbtCmExchangeBlood) == 0) {
                    json.put("code", 0);
                }
            }
        }
        return json.toJSONString();
    }

    @Override
    public HBHbtTreatmentSituation getHbHbtTreatmentSituation(int childIdHB, int motherIdHB) {
        return highBilirubinMapper.hbHbtTreatmentSituationQry(childIdHB, motherIdHB);
    }

    @Override
    public String saveHBTTS(HBHbtTreatmentSituation hbHbtTreatmentSituation, int childIdHB, int motherIdHB) {
        hbHbtTreatmentSituation.setCid(childIdHB);
        hbHbtTreatmentSituation.setMid(motherIdHB);
        JSONObject json = new JSONObject();
        json.put("code", 0);
        if (highBilirubinMapper.hbHbtTreatmentSituationInsertUpdate(hbHbtTreatmentSituation) > 0) {
            json.put("code", 1);
        }
        return json.toJSONString();
    }

    @Override
    public HBBirthMsg getHbBirthMsg(int childIdHB, int motherIdHB) {
        return highBilirubinMapper.birthMsgQry(childIdHB, motherIdHB);
    }

    @Override
    public String getHbHbtEncephalopathyScore(int childIdHB, int motherIdHB) {
        JSONObject json = new JSONObject();
        json.put("code", 0);
        try {
            json.put("esDataList", highBilirubinMapper.hbHbtEncephalopathyScoreQry(childIdHB, motherIdHB));
            json.put("code", 1);
        } catch (Exception ignored) {}
        return json.toJSONString();
    }

    @Override
    public String saveHBTES(String esDataArrayString, int childIdHB, int motherIdHB) {
        JSONObject json = new JSONObject();
        json.put("code", 1);
        if (esDataArrayString != null) {
            JSONArray esDataArray = JSONArray.parseArray(esDataArrayString);
            highBilirubinMapper.hbHbtEncephalopathyScoreDelete(childIdHB, motherIdHB);
            for (int i = 0; i < esDataArray.size(); i++) {
                JSONObject esData = esDataArray.getJSONObject(i);
                HBHbtEncephalopathyScore hbHbtEncephalopathyScore = esData.toJavaObject(HBHbtEncephalopathyScore.class);
                hbHbtEncephalopathyScore.setCid(childIdHB);
                hbHbtEncephalopathyScore.setMid(motherIdHB);
                if (highBilirubinMapper.hbHbtEncephalopathyScoreInsert(hbHbtEncephalopathyScore) == 0) {
                    json.put("code", 0);
                }
            }
        }
        return json.toJSONString();
    }

    @Override
    public HBHbtHighBilirubinReasons getHbHbtHighBilirubinReasons(int childIdHB, int motherIdHB) {
        return highBilirubinMapper.hbHbtHighBilirubinReasonsQry(childIdHB, motherIdHB);
    }

    @Override
    public String saveHBTHBR(HBHbtHighBilirubinReasons hbHbtHighBilirubinReasons, int childIdHB, int motherIdHB) {
        hbHbtHighBilirubinReasons.setCid(childIdHB);
        hbHbtHighBilirubinReasons.setMid(motherIdHB);
        JSONObject json = new JSONObject();
        json.put("code", 0);
        if (highBilirubinMapper.hbHbtHighBilirubinReasonsInsertUpdate(hbHbtHighBilirubinReasons) > 0) {
            json.put("code", 1);
        }
        return json.toJSONString();
    }

    @Override
    public HBHbtAuxiliaryExamination getHbHbtAuxiliaryExamination(int childIdHB, int motherIdHB) {
        return highBilirubinMapper.hbHbtAuxiliaryExaminationQry(childIdHB, motherIdHB);
    }

    @Override
    public String saveHBTAE(HBHbtAuxiliaryExamination hbHbtAuxiliaryExamination, int childIdHB, int motherIdHB) {
        hbHbtAuxiliaryExamination.setCid(childIdHB);
        hbHbtAuxiliaryExamination.setMid(motherIdHB);
        JSONObject json = new JSONObject();
        json.put("code", 0);
        if (highBilirubinMapper.hbHbtAuxiliaryExaminationInsertUpdate(hbHbtAuxiliaryExamination) > 0) {
            json.put("code", 1);
        }
        return json.toJSONString();
    }

    @Override
    public HBHbtDischargeSituation getHbHbtDischargeSituation(int childIdHB, int motherIdHB) {
        return highBilirubinMapper.hbHbtDischargeSituationQry(childIdHB, motherIdHB);
    }

    @Override
    public String saveHBTDS(HBHbtDischargeSituation hbHbtDischargeSituation, int childIdHB, int motherIdHB) {
        hbHbtDischargeSituation.setCid(childIdHB);
        hbHbtDischargeSituation.setMid(motherIdHB);
        JSONObject json = new JSONObject();
        json.put("code", 0);
        if (highBilirubinMapper.hbHbtDischargeSituationInsertUpdate(hbHbtDischargeSituation) > 0) {
            json.put("code", 1);
        }
        return json.toJSONString();
    }

    @Override
    public String getHbFueMrieMriResultTimes(int childIdHB, int motherIdHB) {
        return highBilirubinMapper.hbFueMrieMriResultTimesQry(childIdHB, motherIdHB);
    }

    @Override
    public List<HBFueMriExamination> getHbFueMriExamination(int childIdHB, int motherIdHB) {
        return highBilirubinMapper.hbFueMriExaminationQry(childIdHB, motherIdHB);
    }

    @Override
    public String saveHBFUEMRIE(String mriResultTimes, String mriArrayInput, int childIdHB, int motherIdHB) {
        JSONObject json = new JSONObject();
        json.put("code", 1);
        if (highBilirubinMapper.hbFueMrieMriResultTimesInsertUpdate(mriResultTimes, childIdHB, motherIdHB) == 0) {
            json.put("code", 0);
        }

        if (mriArrayInput != null) {
            JSONArray mriArray = JSONArray.parseArray(mriArrayInput);
            highBilirubinMapper.hbFueMriExaminationDelete(childIdHB, motherIdHB);
            for (int i = 0; i < mriArray.size(); i++) {
                JSONObject mri = mriArray.getJSONObject(i);
                HBFueMriExamination hbFueMriExamination = mri.toJavaObject(HBFueMriExamination.class);
                hbFueMriExamination.setCid(childIdHB);
                hbFueMriExamination.setMid(motherIdHB);
                if (highBilirubinMapper.hbFueMriExaminationInsert(hbFueMriExamination) == 0) {
                    json.put("code", 0);
                }
            }
        }
        return json.toJSONString();
    }

    @Override
    public String getHbFueBaepTimes(int childIdHB, int motherIdHB) {
        return highBilirubinMapper.hbFueBaepTimesQry(childIdHB, motherIdHB);
    }

    @Override
    public List<HBFueBrainstemAuditoryEvokedPotential> getHbFueBaep(int childIdHB, int motherIdHB) {
        return highBilirubinMapper.hbFueBaepQry(childIdHB, motherIdHB);
    }

    @Override
    public String saveHBFUEBAEP(String brainstemAuditoryEvokedPotentialTimes, String baepArrayInput, int childIdHB, int motherIdHB) {
        JSONObject json = new JSONObject();
        json.put("code", 1);
        if (highBilirubinMapper.hbFueBaepTimesInsertUpdate(brainstemAuditoryEvokedPotentialTimes, childIdHB, motherIdHB) == 0) {
            json.put("code", 0);
        }

        if (baepArrayInput != null) {
            JSONArray baepArray = JSONArray.parseArray(baepArrayInput);
            highBilirubinMapper.hbFueBaepDelete(childIdHB, motherIdHB);
            for (int i = 0; i < baepArray.size(); i++) {
                JSONObject baep = baepArray.getJSONObject(i);
                HBFueBrainstemAuditoryEvokedPotential hbFueBrainstemAuditoryEvokedPotential = baep.toJavaObject(HBFueBrainstemAuditoryEvokedPotential.class);
                hbFueBrainstemAuditoryEvokedPotential.setCid(childIdHB);
                hbFueBrainstemAuditoryEvokedPotential.setMid(motherIdHB);
                if (highBilirubinMapper.hbFueBaepInsert(hbFueBrainstemAuditoryEvokedPotential) == 0) {
                    json.put("code", 0);
                }
            }
        }
        return json.toJSONString();
    }

    @Override
    public String getHbFueAmplitudeIntegratedEegTimes(int childIdHB, int motherIdHB) {
        return highBilirubinMapper.hbFueAmplitudeIntegratedEegTimesQry(childIdHB, motherIdHB);
    }

    @Override
    public List<HBFueAmplitudeIntegratedEeg> getHbFueAmplitudeIntegratedEeg(int childIdHB, int motherIdHB) {
        return highBilirubinMapper.hbFueAmplitudeIntegratedEegQry(childIdHB, motherIdHB);
    }

    @Override
    public String saveHBFUEAIEEG(String amplitudeIntegratedEegTimes, String aiEegArrayInput, int childIdHB, int motherIdHB) {
        JSONObject json = new JSONObject();
        json.put("code", 1);
        if (highBilirubinMapper.hbFueAmplitudeIntegratedEegTimesInsertUpdate(amplitudeIntegratedEegTimes, childIdHB, motherIdHB) == 0) {
            json.put("code", 0);
        }

        if (aiEegArrayInput != null) {
            JSONArray aiEegArray = JSONArray.parseArray(aiEegArrayInput);
            highBilirubinMapper.hbFueAmplitudeIntegratedEegDelete(childIdHB, motherIdHB);
            for (int i = 0; i < aiEegArray.size(); i++) {
                JSONObject aiEeg = aiEegArray.getJSONObject(i);
                HBFueAmplitudeIntegratedEeg hbFueAmplitudeIntegratedEeg = aiEeg.toJavaObject(HBFueAmplitudeIntegratedEeg.class);
                hbFueAmplitudeIntegratedEeg.setCid(childIdHB);
                hbFueAmplitudeIntegratedEeg.setMid(motherIdHB);
                if (highBilirubinMapper.hbFueAmplitudeIntegratedEegInsert(hbFueAmplitudeIntegratedEeg) == 0) {
                    json.put("code", 0);
                }
            }
        }
        return json.toJSONString();
    }

    @Override
    public String getHbFueGmsTimes(int childIdHB, int motherIdHB) {
        return highBilirubinMapper.hbFueGmsTimesQry(childIdHB, motherIdHB);
    }

    @Override
    public List<HBFueGms> getHbFueGms(int childIdHB, int motherIdHB) {
        return highBilirubinMapper.hbFueGmsQry(childIdHB, motherIdHB);
    }

    @Override
    public String saveHBFUEGMS(String gmsTimes, String gmsArrayInput, int childIdHB, int motherIdHB) {
        JSONObject json = new JSONObject();
        json.put("code", 1);
        if (highBilirubinMapper.hbFueGmsTimesInsertUpdate(gmsTimes, childIdHB, motherIdHB) == 0) {
            json.put("code", 0);
        }

        if (gmsArrayInput != null) {
            JSONArray gmsArray = JSONArray.parseArray(gmsArrayInput);
            highBilirubinMapper.hbFueGmsDelete(childIdHB, motherIdHB);
            for (int i = 0; i < gmsArray.size(); i++) {
                JSONObject gms = gmsArray.getJSONObject(i);
                HBFueGms hbFueGms = gms.toJavaObject(HBFueGms.class);
                hbFueGms.setCid(childIdHB);
                hbFueGms.setMid(motherIdHB);
                if (highBilirubinMapper.hbFueGmsInsert(hbFueGms) == 0) {
                    json.put("code", 0);
                }
            }
        }
        return json.toJSONString();
    }

    @Override
    public String getHbFueGsTimes(int childIdHB, int motherIdHB) {
        return highBilirubinMapper.hbFueGriffithsScaleTimesQry(childIdHB, motherIdHB);
    }

    @Override
    public List<HBFueGriffithsScale> getHbFueGs(int childIdHB, int motherIdHB) {
        return highBilirubinMapper.hbFueGriffithsScaleQry(childIdHB, motherIdHB);
    }

    @Override
    public String saveHBFUEGS(String griffithsScaleTimes, String gsArrayInput, int childIdHB, int motherIdHB) {
        JSONObject json = new JSONObject();
        json.put("code", 1);
        if (highBilirubinMapper.hbFueGriffithsScaleTimesInsertUpdate(griffithsScaleTimes, childIdHB, motherIdHB) == 0) {
            json.put("code", 0);
        }

        if (gsArrayInput != null) {
            JSONArray gsArray = JSONArray.parseArray(gsArrayInput);
            highBilirubinMapper.hbFueGriffithsScaleDelete(childIdHB, motherIdHB);
            for (int i = 0; i < gsArray.size(); i++) {
                JSONObject gs = gsArray.getJSONObject(i);
                HBFueGriffithsScale hbFueGriffithsScale = gs.toJavaObject(HBFueGriffithsScale.class);
                hbFueGriffithsScale.setCid(childIdHB);
                hbFueGriffithsScale.setMid(motherIdHB);
                if (highBilirubinMapper.hbFueGriffithsScaleInsert(hbFueGriffithsScale) == 0) {
                    json.put("code", 0);
                }
            }
        }
        return json.toJSONString();
    }

    @Override
    public HBFollowUpConclusion getHbFollowUpConclusion(int childIdHB, int motherIdHB) {
        return highBilirubinMapper.hbFollowUpConclusionQry(childIdHB, motherIdHB);
    }

    @Override
    public String saveHBFUC(HBFollowUpConclusion hbFollowUpConclusion, int childIdHB, int motherIdHB) {
        hbFollowUpConclusion.setCid(childIdHB);
        hbFollowUpConclusion.setMid(motherIdHB);
        JSONObject json = new JSONObject();
        json.put("code", 0);
        if (highBilirubinMapper.hbFollowUpConclusionInsertUpdate(hbFollowUpConclusion) > 0) {
            json.put("code", 1);
        }
        return json.toJSONString();
    }

    @Override
    public CaseStatus getHbCaseStatus(int childIdHB, int motherIdHB) {
        return highBilirubinMapper.hbCaseStatusQry(childIdHB, motherIdHB);
    }

    @Override
    public int getHbReviewCount(int childIdHB, int motherIdHB) {
        return highBilirubinMapper.hbReviewCount(childIdHB, motherIdHB);
    }

    @Override
    public List<Review> getHbReview(int childIdHB, int motherIdHB) {
        return highBilirubinMapper.hbReviewQry(childIdHB, motherIdHB);
    }

    @Override
    public String addHbReview(Review hbReview, int childIdHB, int motherIdHB) {
        hbReview.setCid(childIdHB);
        hbReview.setMid(motherIdHB);
        JSONObject json = new JSONObject();
        json.put("code", 0);
        if (highBilirubinMapper.hbReviewInsert(hbReview) > 0) {
            highBilirubinMapper.hbStatusUpdate(hbReview.getCid(), hbReview.getMid(), hbReview.getStatus());
            json.put("code", 1);
        }
        return json.toJSONString();
    }
}
