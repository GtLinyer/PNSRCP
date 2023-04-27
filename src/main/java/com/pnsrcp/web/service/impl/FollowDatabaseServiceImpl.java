package com.pnsrcp.web.service.impl;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.pnsrcp.web.dao.FollowDatabaseMapper;
import com.pnsrcp.web.dao.basicDatabase.BasicDatabaseMapper;
import com.pnsrcp.web.dao.basicDatabaseDGS.BDDgsGiWHcBlMapper;
import com.pnsrcp.web.dao.followDatabaseGC.FDGcFdMapper;
import com.pnsrcp.web.entity.perintalPlatform.CaseStatus;
import com.pnsrcp.web.entity.perintalPlatform.Review;
import com.pnsrcp.web.entity.perintalPlatform.basicDatabaseDGS.BDDGSGiWHcBl;
import com.pnsrcp.web.entity.perintalPlatform.basicDatabse.BDBirthMsg;
import com.pnsrcp.web.entity.perintalPlatform.followDatabase.*;
import com.pnsrcp.web.service.FollowDatabaseService;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;

/**
 * @Project: 围产新生儿科研合作平台
 * @Author: Linyer
 * @Email: linyer@linyer.cn
 * @Date: 2022/06/02 18:01 星期四
 * @Description: 围产新生儿科研合作平台 随访数据库 服务层 实现类
 */
@Service
public class FollowDatabaseServiceImpl implements FollowDatabaseService {
    // 数据层 注入
    @Resource
    private FDGcFdMapper fdGcFdMapper;
    @Resource
    private FollowDatabaseMapper followDatabaseMapper;
    @Resource
    private BasicDatabaseMapper basicDatabaseMapper;
    @Resource
    private BDDgsGiWHcBlMapper bdDgsGiWHcBlMapper;

    @Override
    public FDFollowInformation getFdFiMsg(int childId, int motherId) {
        return followDatabaseMapper.fdFiMsgQry(childId, motherId);
    }

    @Override
    public String getFdChildIdCardName(int childId, int motherId) {
        return followDatabaseMapper.fdFiChildIdCardNameQry(childId, motherId);
    }

    @Override
    public String saveFDFI(FDFollowInformation fdFollowInformation, int childId, int motherId, int writerId, int hospitalId) {
        fdFollowInformation.setCid(childId);
        fdFollowInformation.setMid(motherId);
        JSONObject json = new JSONObject();
        json.put("code", 0);
        if (followDatabaseMapper.fdFollowInformationInsertUpdate(fdFollowInformation, writerId, hospitalId) > 0) {
            followDatabaseMapper.fdStatusUpdate(childId, motherId, 1);
            json.put("code", 1);
        }
        return json.toJSONString();
    }

    @Override
    public BDBirthMsg getFdGcBirthMsg(int childId, int motherId) {
        return basicDatabaseMapper.bdBirthMsgQry(childId, motherId);
    }

    @Override
    public FDGcBwSummary getFdGcBwSummary(int childId, int motherId) {
        return followDatabaseMapper.fdGcBwSummaryQry(childId, motherId);
    }

    @Override
    public List<FDGcBodyWeight> getFdGcBodyWeightCheck(int childId, int motherId) {
        return followDatabaseMapper.fdGcBodyWeightQry(childId, motherId);
    }

    @Override
    public String getFdGcBwFentonData(int childId, int motherId) {
        JSONObject json = new JSONObject();
        json.put("code", 0);
        try {
            QueryWrapper<BDDGSGiWHcBl> queryWrapper = new QueryWrapper<>();
            queryWrapper.eq("cid", childId);
            queryWrapper.eq("mid", motherId);
            json.put("bwBlHcList", bdDgsGiWHcBlMapper.selectList(queryWrapper));
            json.put("code", 1);
        } catch (Exception ignored) {}
        return json.toJSONString();
    }

    @Override
    public String saveFDGCBW(FDGcBwSummary bwSummary, String wcArrayInput, int childId, int motherId) {
        bwSummary.setCid(childId);
        bwSummary.setMid(motherId);
        JSONObject json = new JSONObject();
        json.put("code", 1);
        if (followDatabaseMapper.fdGcBwSummaryInsertUpdate(bwSummary) == 0) {
            json.put("code", 0);
        }

        if (wcArrayInput != null) {
            JSONArray wcArray = JSONArray.parseArray(wcArrayInput);
            followDatabaseMapper.fdGcBodyWeightDelete(childId, motherId);
            for (int i = 0; i < wcArray.size(); i++) {
                JSONObject wc = wcArray.getJSONObject(i);
                FDGcBodyWeight fdGcBodyWeight = wc.toJavaObject(FDGcBodyWeight.class);
                fdGcBodyWeight.setCid(childId);
                fdGcBodyWeight.setMid(motherId);
                if (followDatabaseMapper.fdGcBodyWeightInsert(fdGcBodyWeight) == 0) {
                    json.put("code", 0);
                }
            }
        }
        return json.toJSONString();
    }

    @Override
    public FDGcBlSummary getFdGcBlSummary(int childId, int motherId) {
        return followDatabaseMapper.fdGcBlSummaryQry(childId, motherId);
    }

    @Override
    public List<FDGcBodyLength> getFdGcBodyLength(int childId, int motherId) {
        return followDatabaseMapper.fdGcBodyLengthQry(childId, motherId);
    }

    @Override
    public String saveFDGCBL(FDGcBlSummary blSummary, String lcArrayInput, int childId, int motherId) {
        blSummary.setCid(childId);
        blSummary.setMid(motherId);
        JSONObject json = new JSONObject();
        json.put("code", 1);
        if (followDatabaseMapper.fdGcBlSummaryInsertUpdate(blSummary) == 0) {
            json.put("code", 0);
        }

        if (lcArrayInput != null) {
            JSONArray lcArray = JSONArray.parseArray(lcArrayInput);
            followDatabaseMapper.fdGcBodyLengthDelete(childId, motherId);
            for (int i = 0; i < lcArray.size(); i++) {
                JSONObject lc = lcArray.getJSONObject(i);
                FDGcBodyLength fdGcBodyLength = lc.toJavaObject(FDGcBodyLength.class);
                fdGcBodyLength.setCid(childId);
                fdGcBodyLength.setMid(motherId);
                if (followDatabaseMapper.fdGcBodyLengthInsert(fdGcBodyLength) == 0) {
                    json.put("code", 0);
                }
            }
        }
        return json.toJSONString();
    }

    @Override
    public FDGcHcSummary getFdGcHcSummary(int childId, int motherId) {
        return followDatabaseMapper.fdGcHcSummaryQry(childId, motherId);
    }

    @Override
    public List<FDGcHeadCircumference> getFdGcHeadCircumference(int childId, int motherId) {
        return followDatabaseMapper.fdGcHeadCircumferenceQry(childId, motherId);
    }

    @Override
    public String saveFDGCHC(FDGcHcSummary hcSummary, String hcArrayInput, int childId, int motherId) {
        hcSummary.setCid(childId);
        hcSummary.setMid(motherId);
        JSONObject json = new JSONObject();
        json.put("code", 1);
        if (followDatabaseMapper.fdGcHcSummaryInsertUpdate(hcSummary) == 0) {
            json.put("code", 0);
        }

        if (hcArrayInput != null) {
            JSONArray hcArray = JSONArray.parseArray(hcArrayInput);
            followDatabaseMapper.fdGcHeadCircumferenceDelete(childId, motherId);
            for (int i = 0; i < hcArray.size(); i++) {
                JSONObject hc = hcArray.getJSONObject(i);
                FDGcHeadCircumference fdGcHeadCircumference = hc.toJavaObject(FDGcHeadCircumference.class);
                fdGcHeadCircumference.setCid(childId);
                fdGcHeadCircumference.setMid(motherId);
                if (followDatabaseMapper.fdGcHeadCircumferenceInsert(fdGcHeadCircumference) == 0) {
                    json.put("code", 0);
                }
            }
        }
        return json.toJSONString();
    }

    @Override
    public String getFdGcFeedingRecordNumber(int childId, int motherId) {
        return followDatabaseMapper.fdGcFeedingRecordNumberQry(childId, motherId);
    }

    @Override
    public List<FDGcFeedingRecord> getFdGcFeedingRecord(int childId, int motherId) {
        QueryWrapper<FDGcFeedingRecord> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("cid", childId);
        queryWrapper.eq("mid", motherId);
        return fdGcFdMapper.selectList(queryWrapper);
    }

    @Override
    public String saveFDGCFD(String feedingRecordNumber, String frArrayInput, int childId, int motherId) {
        JSONObject json = new JSONObject();
        json.put("code", 1);
        if (followDatabaseMapper.fdGcFdFeedingRecordNumberInsertUpdate(feedingRecordNumber, childId, motherId) == 0) {
            json.put("code", 0);
        }

        if (frArrayInput != null) {
            JSONArray frArray = JSONArray.parseArray(frArrayInput);
            QueryWrapper<FDGcFeedingRecord> deleteWrapper = new QueryWrapper<>();
            deleteWrapper.eq("cid", childId);
            deleteWrapper.eq("mid", motherId);
            fdGcFdMapper.delete(deleteWrapper);
            for (int i = 0; i < frArray.size(); i++) {
                JSONObject fr = frArray.getJSONObject(i);
                FDGcFeedingRecord fdGcFeedingRecord = fr.toJavaObject(FDGcFeedingRecord.class);
                fdGcFeedingRecord.setCid(childId);
                fdGcFeedingRecord.setMid(motherId);
                if (fdGcFdMapper.insert(fdGcFeedingRecord) == 0) {
                    json.put("code", 0);
                }
            }
        }
        return json.toJSONString();
    }

    @Override
    public String getFdGcGetBodyWeight(int childId, int motherId) {
        JSONObject json = new JSONObject();
        json.put("code", 0);
        try {
            json.put("bodyWeightList", followDatabaseMapper.fdGcBodyWeightQry(childId, motherId));
            json.put("code", 1);
        } catch (Exception ignored) {}
        return json.toJSONString();
    }

    @Override
    public String getFdGcGetBodyLength(int childId, int motherId) {
        JSONObject json = new JSONObject();
        json.put("code", 0);
        try {
            json.put("bodyLengthList", followDatabaseMapper.fdGcBodyLengthQry(childId, motherId));
            json.put("code", 1);
        } catch (Exception ignored) {}
        return json.toJSONString();
    }

    @Override
    public String getFdGcGetHeadCircumference(int childId, int motherId) {
        JSONObject json = new JSONObject();
        json.put("code", 0);
        try {
            json.put("headCircumferenceList", followDatabaseMapper.fdGcHeadCircumferenceQry(childId, motherId));
            json.put("code", 1);
        } catch (Exception ignored) {}
        return json.toJSONString();
    }

    @Override
    public String getFdGcGetFeeding(int childId, int motherId) {
        JSONObject json = new JSONObject();
        json.put("code", 0);
        try {
            QueryWrapper<FDGcFeedingRecord> queryWrapper = new QueryWrapper<>();
            queryWrapper.eq("cid", childId);
            queryWrapper.eq("mid", motherId);
            json.put("feedingList", fdGcFdMapper.selectList(queryWrapper));
            json.put("code", 1);
        } catch (Exception ignored) {}
        return json.toJSONString();
    }

    @Override
    public String saveFDGCGA1(String gaArrayInput, int childId, int motherId) {
        JSONObject json = new JSONObject();
        json.put("code", 1);
        if (gaArrayInput != null) {
            JSONArray gaArray = JSONArray.parseArray(gaArrayInput);
            followDatabaseMapper.fdGcGrowthAssessment1Delete(childId, motherId);
            for (int i = 0; i < gaArray.size(); i++) {
                JSONObject ga = gaArray.getJSONObject(i);
                FDGcGrowthAssessment fdGcGrowthAssessment = ga.toJavaObject(FDGcGrowthAssessment.class);
                fdGcGrowthAssessment.setCid(childId);
                fdGcGrowthAssessment.setMid(motherId);
                if (followDatabaseMapper.fdGcGrowthAssessment1Insert(fdGcGrowthAssessment) == 0) {
                    json.put("code", 0);
                }
            }
        }
        return json.toJSONString();
    }

    @Override
    public String saveFDGCGA2(String gaArrayInput, int childId, int motherId) {
        JSONObject json = new JSONObject();
        json.put("code", 1);
        if (gaArrayInput != null) {
            JSONArray gaArray = JSONArray.parseArray(gaArrayInput);
            followDatabaseMapper.fdGcGrowthAssessment2Delete(childId, motherId);
            for (int i = 0; i < gaArray.size(); i++) {
                JSONObject ga = gaArray.getJSONObject(i);
                FDGcGrowthAssessment fdGcGrowthAssessment = ga.toJavaObject(FDGcGrowthAssessment.class);
                fdGcGrowthAssessment.setCid(childId);
                fdGcGrowthAssessment.setMid(motherId);
                if (followDatabaseMapper.fdGcGrowthAssessment2Insert(fdGcGrowthAssessment) == 0) {
                    json.put("code", 0);
                }
            }
        }
        return json.toJSONString();
    }

    @Override
    public String getFdGcNutritionRecordNumber(int childId, int motherId) {
        return followDatabaseMapper.fdGcNutritionRecordNumberQry(childId, motherId);
    }

    @Override
    public List<FDGcNutritionRecord> getFdGcNutritionRecord(int childId, int motherId) {
        return followDatabaseMapper.fdGcNutritionRecordQry(childId, motherId);
    }

    @Override
    public String saveFDGCNT(String nutritionRecordNumber, String nrArrayInput, int childId, int motherId) {
        JSONObject json = new JSONObject();
        json.put("code", 1);
        if (followDatabaseMapper.fdGcNutritionRecordNumberInsertUpdate(nutritionRecordNumber, childId, motherId) == 0) {
            json.put("code", 0);
        }

        if (nrArrayInput != null) {
            JSONArray nrArray = JSONArray.parseArray(nrArrayInput);
            followDatabaseMapper.fdGcNutritionRecordDelete(childId, motherId);
            for (int i = 0; i < nrArray.size(); i++) {
                JSONObject nr = nrArray.getJSONObject(i);
                FDGcNutritionRecord fdGcNutritionRecord = nr.toJavaObject(FDGcNutritionRecord.class);
                fdGcNutritionRecord.setCid(childId);
                fdGcNutritionRecord.setMid(motherId);
                if (followDatabaseMapper.fdGcNutritionRecordInsert(fdGcNutritionRecord) == 0) {
                    json.put("code", 0);
                }
            }
        }
        return json.toJSONString();
    }

    @Override
    public String getFdDlVisionCheckNumber(int childId, int motherId) {
        return followDatabaseMapper.fdDlVisionCheckNumberQry(childId, motherId);
    }

    @Override
    public List<FDDlVisionCheck> getFdDlVisionCheck(int childId, int motherId) {
        return followDatabaseMapper.fdDlVisionCheckQry(childId, motherId);
    }

    @Override
    public String saveFDDLVI(String nutritionRecordNumber, String vcArrayInput, int childId, int motherId) {
        JSONObject json = new JSONObject();
        json.put("code", 1);
        if (followDatabaseMapper.fdDlVisionCheckNumberInsertUpdate(nutritionRecordNumber, childId, motherId) == 0) {
            json.put("code", 0);
        }

        if (vcArrayInput != null) {
            JSONArray vcArray = JSONArray.parseArray(vcArrayInput);
            followDatabaseMapper.fdDlVisionCheckDelete(childId, motherId);
            for (int i = 0; i < vcArray.size(); i++) {
                JSONObject vc = vcArray.getJSONObject(i);
                FDDlVisionCheck fdDlVisionCheck = vc.toJavaObject(FDDlVisionCheck.class);
                fdDlVisionCheck.setCid(childId);
                fdDlVisionCheck.setMid(motherId);
                if (followDatabaseMapper.fdDlVisionCheckInsert(fdDlVisionCheck) == 0) {
                    json.put("code", 0);
                }
            }
        }
        return json.toJSONString();
    }

    @Override
    public String getFdDlHearingCheckNumber(int childId, int motherId) {
        return followDatabaseMapper.fdDlHearingCheckNumberQry(childId, motherId);
    }

    @Override
    public List<FDDlHearingCheck> getFdDlHearingCheck(int childId, int motherId) {
        return followDatabaseMapper.fdDlHearingCheckQry(childId, motherId);
    }

    @Override
    public String saveFDDLHR(String hearingCheckNumber, String hcArrayInput, int childId, int motherId) {
        JSONObject json = new JSONObject();
        json.put("code", 1);
        if (followDatabaseMapper.fdDlHearingCheckNumberInsertUpdate(hearingCheckNumber, childId, motherId) == 0) {
            json.put("code", 0);
        }

        if (hcArrayInput != null) {
            JSONArray hcArray = JSONArray.parseArray(hcArrayInput);
            followDatabaseMapper.fdDlHearingCheckDelete(childId, motherId);
            for (int i = 0; i < hcArray.size(); i++) {
                JSONObject hc = hcArray.getJSONObject(i);
                FDDlHearingCheck fdDlHearingCheck = hc.toJavaObject(FDDlHearingCheck.class);
                fdDlHearingCheck.setCid(childId);
                fdDlHearingCheck.setMid(motherId);
                if (followDatabaseMapper.fdDlHearingCheckInsert(fdDlHearingCheck) == 0) {
                    json.put("code", 0);
                }
            }
        }
        return json.toJSONString();
    }

    @Override
    public String getFdDlGesellCheckNumber(int childId, int motherId) {
        return followDatabaseMapper.fdDlGesellCheckNumberQry(childId, motherId);
    }

    @Override
    public List<FDDlGesellCheck> getFdDlGesellCheck(int childId, int motherId) {
        return followDatabaseMapper.fdDlGesellCheckQry(childId, motherId);
    }

    @Override
    public String saveFDDLGS(String gesellCheckNumber, String gcArrayInput, int childId, int motherId) {
        JSONObject json = new JSONObject();
        json.put("code", 1);
        if (followDatabaseMapper.fdDlGesellCheckNumberInsertUpdate(gesellCheckNumber, childId, motherId) == 0) {
            json.put("code", 0);
        }

        if (gcArrayInput != null) {
            JSONArray gcArray = JSONArray.parseArray(gcArrayInput);
            followDatabaseMapper.fdDlGesellCheckDelete(childId, motherId);
            for (int i = 0; i < gcArray.size(); i++) {
                JSONObject gc = gcArray.getJSONObject(i);
                FDDlGesellCheck fdDlGesellCheck = gc.toJavaObject(FDDlGesellCheck.class);
                fdDlGesellCheck.setCid(childId);
                fdDlGesellCheck.setMid(motherId);
                if (followDatabaseMapper.fdDlGesellCheckInsert(fdDlGesellCheck) == 0) {
                    json.put("code", 0);
                }
            }
        }
        return json.toJSONString();
    }

    @Override
    public String getFdDlGriffithsCheckNumber(int childId, int motherId) {
        return followDatabaseMapper.fdDlGriffithsCheckNumberQry(childId, motherId);
    }

    @Override
    public List<FDDlGriffithsCheck> getFdDlGriffithsCheck(int childId, int motherId) {
        return followDatabaseMapper.fdDlGriffithsCheckQry(childId, motherId);
    }

    @Override
    public String saveFDDLGF(String griffithsCheckNumber, String gcArrayInput, int childId, int motherId) {
        JSONObject json = new JSONObject();
        json.put("code", 1);
        if (followDatabaseMapper.fdDlGriffithsCheckNumberInsertUpdate(griffithsCheckNumber, childId, motherId) == 0) {
            json.put("code", 0);
        }

        if (gcArrayInput != null) {
            JSONArray gcArray = JSONArray.parseArray(gcArrayInput);
            followDatabaseMapper.fdDlGriffithsCheckDelete(childId, motherId);
            for (int i = 0; i < gcArray.size(); i++) {
                JSONObject gc = gcArray.getJSONObject(i);
                FDDlGriffithsCheck fdDlGriffithsCheck = gc.toJavaObject(FDDlGriffithsCheck.class);
                fdDlGriffithsCheck.setCid(childId);
                fdDlGriffithsCheck.setMid(motherId);
                if (followDatabaseMapper.fdDlGriffithsCheckInsert(fdDlGriffithsCheck) == 0) {
                    json.put("code", 0);
                }
            }
        }
        return json.toJSONString();
    }

    @Override
    public String getFdDlGmfcsCheckNumber(int childId, int motherId) {
        return followDatabaseMapper.fdDlGmfcsCheckNumberQry(childId, motherId);
    }

    @Override
    public List<FDDlGmfcsCheck> getFdDlGmfcsCheck(int childId, int motherId) {
        return followDatabaseMapper.fdDlGmfcsCheckQry(childId, motherId);
    }

    @Override
    public String saveFDDLGM(String gmfcsCheckNumber, String gcArrayInput, int childId, int motherId) {
        JSONObject json = new JSONObject();
        json.put("code", 1);
        if (followDatabaseMapper.fdDlGmfcsCheckNumberInsertUpdate(gmfcsCheckNumber, childId, motherId) == 0) {
            json.put("code", 0);
        }

        if (gcArrayInput != null) {
            JSONArray gcArray = JSONArray.parseArray(gcArrayInput);
            followDatabaseMapper.fdDlGmfcsCheckDelete(childId, motherId);
            for (int i = 0; i < gcArray.size(); i++) {
                JSONObject gc = gcArray.getJSONObject(i);
                FDDlGmfcsCheck fdDlGmfcsCheck = gc.toJavaObject(FDDlGmfcsCheck.class);
                fdDlGmfcsCheck.setCid(childId);
                fdDlGmfcsCheck.setMid(motherId);
                if (followDatabaseMapper.fdDlGmfcsCheckInsert(fdDlGmfcsCheck) == 0) {
                    json.put("code", 0);
                }
            }
        }
        return json.toJSONString();
    }

    @Override
    public String getFdDlCbclCheckNumber(int childId, int motherId) {
        return followDatabaseMapper.fdDlCbclCheckNumberQry(childId, motherId);
    }

    @Override
    public List<FDDlCbclCheck> getFdDlCbclCheck(int childId, int motherId) {
        return followDatabaseMapper.fdDlCbclCheckQry(childId, motherId);
    }

    @Override
    public String saveFDDLCB(String cbclCheckNumber, String ccArrayInput, int childId, int motherId) {
        JSONObject json = new JSONObject();
        json.put("code", 1);
        if (followDatabaseMapper.fdDlCbclCheckNumberInsertUpdate(cbclCheckNumber, childId, motherId) == 0) {
            json.put("code", 0);
        }

        if (ccArrayInput != null) {
            JSONArray ccArray = JSONArray.parseArray(ccArrayInput);
            followDatabaseMapper.fdDlCbclCheckDelete(childId, motherId);
            for (int i = 0; i < ccArray.size(); i++) {
                JSONObject cc = ccArray.getJSONObject(i);
                FDDlCbclCheck fdDlCbclCheck = cc.toJavaObject(FDDlCbclCheck.class);
                fdDlCbclCheck.setCid(childId);
                fdDlCbclCheck.setMid(motherId);
                if (followDatabaseMapper.fdDlCbclCheckInsert(fdDlCbclCheck) == 0) {
                    json.put("code", 0);
                }
            }
        }
        return json.toJSONString();
    }

    @Override
    public String getFdGpVisitNumber(int childId, int motherId) {
        return followDatabaseMapper.fdGpVisitNumberQry(childId, motherId);
    }

    @Override
    public List<FDGpOutpatientVisit> getFdGpOutpatientVisit(int childId, int motherId) {
        return followDatabaseMapper.fdGpOutpatientVisitQry(childId, motherId);
    }

    @Override
    public String saveFDGPOV(String visitNumber, String ovArrayInput, int childId, int motherId) {
        JSONObject json = new JSONObject();
        json.put("code", 1);
        if (followDatabaseMapper.fdGpVisitNumberInsertUpdate(visitNumber, childId, motherId) == 0) {
            json.put("code", 0);
        }

        if (ovArrayInput != null) {
            JSONArray ovArray = JSONArray.parseArray(ovArrayInput);
            followDatabaseMapper.fdGpOutpatientVisitDelete(childId, motherId);
            for (int i = 0; i < ovArray.size(); i++) {
                JSONObject ov = ovArray.getJSONObject(i);
                FDGpOutpatientVisit fdGpOutpatientVisit = ov.toJavaObject(FDGpOutpatientVisit.class);
                fdGpOutpatientVisit.setCid(childId);
                fdGpOutpatientVisit.setMid(motherId);
                if (followDatabaseMapper.fdGpOutpatientVisitInsert(fdGpOutpatientVisit) == 0) {
                    json.put("code", 0);
                }
            }
        }
        return json.toJSONString();
    }

    @Override
    public String getFdGpHospitalizationNumber(int childId, int motherId) {
        return followDatabaseMapper.fdGpHospitalizationNumberQry(childId, motherId);
    }

    @Override
    public List<FDGpHospitalizationTreatment> getFdGpHospitalizationTreatment(int childId, int motherId) {
        return followDatabaseMapper.fdGpHospitalizationTreatmentQry(childId, motherId);
    }

    @Override
    public String saveFDGPHT(String hospitalizationNumber, String htArrayInput, int childId, int motherId) {
        JSONObject json = new JSONObject();
        json.put("code", 1);
        if (followDatabaseMapper.fdGpHospitalizationNumberInsertUpdate(hospitalizationNumber, childId, motherId) == 0) {
            json.put("code", 0);
        }

        if (htArrayInput != null) {
            JSONArray htArray = JSONArray.parseArray(htArrayInput);
            followDatabaseMapper.fdGpHospitalizationTreatmentDelete(childId, motherId);
            for (int i = 0; i < htArray.size(); i++) {
                JSONObject ht = htArray.getJSONObject(i);
                FDGpHospitalizationTreatment fdGpHospitalizationTreatment = ht.toJavaObject(FDGpHospitalizationTreatment.class);
                fdGpHospitalizationTreatment.setCid(childId);
                fdGpHospitalizationTreatment.setMid(motherId);
                if (followDatabaseMapper.fdGpHospitalizationTreatmentInsert(fdGpHospitalizationTreatment) == 0) {
                    json.put("code", 0);
                }
            }
        }
        return json.toJSONString();
    }

    @Override
    public String getFdGpFollowUpPlan(int childId, int motherId) {
        JSONObject json = new JSONObject();
        json.put("code", 0);
        try {
            json.put("followUpPlanList", followDatabaseMapper.fdGpFollowUpPlanQry(childId, motherId));
            json.put("code", 1);
        } catch (Exception ignored) {}
        return json.toJSONString();
    }

    @Override
    public String saveFDGPFP(String fpArrayInput, int childId, int motherId) {
        JSONObject json = new JSONObject();
        json.put("code", 1);
        if (fpArrayInput != null) {
            JSONArray fpArray = JSONArray.parseArray(fpArrayInput);
            followDatabaseMapper.fdGpFollowUpPlanDelete(childId, motherId);
            for (int i = 0; i < fpArray.size(); i++) {
                JSONObject fp = fpArray.getJSONObject(i);
                FDGpFollowUpPlan fdGpFollowUpPlan = fp.toJavaObject(FDGpFollowUpPlan.class);
                fdGpFollowUpPlan.setCid(childId);
                fdGpFollowUpPlan.setMid(motherId);
                if (followDatabaseMapper.fdGpFollowUpPlanInsert(fdGpFollowUpPlan) == 0) {
                    json.put("code", 0);
                }
            }
        }
        return json.toJSONString();
    }

    @Override
    public String getFdGpDiseaseControl(int childId, int motherId) {
        JSONObject json = new JSONObject();
        json.put("code", 0);
        try {
            json.put("diseaseControlList", followDatabaseMapper.fdGpDiseaseControlQry(childId, motherId));
            json.put("code", 1);
        } catch (Exception ignored) {}
        return json.toJSONString();
    }

    @Override
    public String saveFDGPDC(String dcArrayInput, int childId, int motherId) {
        JSONObject json = new JSONObject();
        json.put("code", 1);
        if (dcArrayInput != null) {
            JSONArray dcArray = JSONArray.parseArray(dcArrayInput);
            followDatabaseMapper.fdGpDiseaseControlDelete(childId, motherId);
            for (int i = 0; i < dcArray.size(); i++) {
                JSONObject dc = dcArray.getJSONObject(i);
                FDGpDiseaseControl fdGpDiseaseControl = dc.toJavaObject(FDGpDiseaseControl.class);
                fdGpDiseaseControl.setCid(childId);
                fdGpDiseaseControl.setMid(motherId);
                if (followDatabaseMapper.fdGpDiseaseControlInsert(fdGpDiseaseControl) == 0) {
                    json.put("code", 0);
                }
            }
        }
        return json.toJSONString();
    }

    @Override
    public CaseStatus getFdCaseStatus(int childId, int motherId) {
        return followDatabaseMapper.fdCaseStatusQry(childId, motherId);
    }

    @Override
    public int getFdReviewCount(int childId, int motherId) {
        return followDatabaseMapper.fdReviewCount(childId, motherId);
    }

    @Override
    public List<Review> getFdReview(int childId, int motherId) {
        return followDatabaseMapper.fdReviewQry(childId, motherId);
    }

    @Override
    public String addFdReview(Review fdReview, int childId, int motherId) {
        fdReview.setCid(childId);
        fdReview.setMid(motherId);
        JSONObject json = new JSONObject();
        json.put("code", 0);
        if (followDatabaseMapper.fdReviewInsert(fdReview) > 0) {
            followDatabaseMapper.fdStatusUpdate(fdReview.getCid(), fdReview.getMid(), fdReview.getStatus());
            json.put("code", 1);
        }
        return json.toJSONString();
    }
}