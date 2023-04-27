package com.pnsrcp.web.service.impl;

import com.alibaba.fastjson.JSONObject;
import com.pnsrcp.web.dao.ParentalPsychologyMapper;
import com.pnsrcp.web.entity.perintalPlatform.CaseStatus;
import com.pnsrcp.web.entity.perintalPlatform.Review;
import com.pnsrcp.web.entity.perintalPlatform.parentalPsychology.PPPoEpds;
import com.pnsrcp.web.entity.perintalPlatform.parentalPsychology.PPPoSasOrSds;
import com.pnsrcp.web.entity.perintalPlatform.parentalPsychology.PPPrEpds;
import com.pnsrcp.web.entity.perintalPlatform.parentalPsychology.PPPrSasOrSds;
import com.pnsrcp.web.service.ParentalPsychologyService;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

/**
 * @Project: 围产新生儿科研合作平台
 * @Author: Linyer
 * @Email: linyer@linyer.cn
 * @Date: 2021/8/24 18:20 星期二
 * @Description: 围产新生儿科研合作平台 父母心理库 服务层 实现类
 */
@Service
public class ParentalPsychologyServiceImpl implements ParentalPsychologyService {
    // 数据层 注入
    @Resource
    private ParentalPsychologyMapper parentalPsychologyMapper;

    @Override
    public String saveEdd(int motherId, String expectedDeliveryDateString) {
        JSONObject json = new JSONObject();
        json.put("code", 0);
        Date expectedDeliveryDate = null;
        try {
            SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
            expectedDeliveryDate = sdf.parse(expectedDeliveryDateString);
        } catch (ParseException ignored) {}
        if (expectedDeliveryDate != null) {
            if (parentalPsychologyMapper.ppExpectedDeliveryDateInsertUpdate(motherId, expectedDeliveryDate) > 0) {
                json.put("code", 1);
            }
        }
        return json.toJSONString();
    }

    @Override
    public Date getEdd(int motherId) {
        return parentalPsychologyMapper.ppExpectedDeliveryDateQry(motherId);
    }

    @Override
    public List<PPPrEpds> getPpPrEpds(int motherId) {
        return parentalPsychologyMapper.ppPrEpdsQry(motherId);
    }

    @Override
    public String savePpPrEpds(PPPrEpds ppPrEpds, int motherId) {
        JSONObject json = new JSONObject();
        json.put("code", 0);
        ppPrEpds.setMid(motherId);
        if (parentalPsychologyMapper.ppPrEpdsInsertUpdate(ppPrEpds) > 0) {
            json.put("code", 1);
        }
        return json.toJSONString();
    }

    @Override
    public String deletePpPrEpds(int id) {
        JSONObject json = new JSONObject();
        json.put("code", 0);
        if (parentalPsychologyMapper.ppPrEpdsDelete(id) > 0) {
            json.put("code", 1);
        }
        return json.toJSONString();
    }

    @Override
    public int getPrEpdsEvaluationsNumber(int motherId) {
        return parentalPsychologyMapper.ppPrEpdsEvaluationsNumberQry(motherId);
    }

    @Override
    public List<PPPrSasOrSds> getPpPrSas(int motherId) {
        return parentalPsychologyMapper.ppPrSasQry(motherId);
    }

    @Override
    public String savePpPrSas(PPPrSasOrSds ppPrSas, int motherId) {
        JSONObject json = new JSONObject();
        json.put("code", 0);
        ppPrSas.setMid(motherId);
        if (parentalPsychologyMapper.ppPrSasInsertUpdate(ppPrSas) > 0) {
            json.put("code", 1);
        }
        return json.toJSONString();
    }

    @Override
    public String deletePpPrSas(int id) {
        JSONObject json = new JSONObject();
        json.put("code", 0);
        if (parentalPsychologyMapper.ppPrSasDelete(id) > 0) {
            json.put("code", 1);
        }
        return json.toJSONString();
    }

    @Override
    public int getPrSasEvaluationsNumber(int motherId) {
        return parentalPsychologyMapper.ppPrSasEvaluationsNumberQry(motherId);
    }

    @Override
    public List<PPPrSasOrSds> getPpPrSds(int motherId) {
        return parentalPsychologyMapper.ppPrSdsQry(motherId);
    }

    @Override
    public String savePpPrSds(PPPrSasOrSds ppPrSds, int motherId) {
        JSONObject json = new JSONObject();
        json.put("code", 0);
        ppPrSds.setMid(motherId);
        if (parentalPsychologyMapper.ppPrSdsInsertUpdate(ppPrSds) > 0) {
            json.put("code", 1);
        }
        return json.toJSONString();
    }

    @Override
    public String deletePpPrSds(int id) {
        JSONObject json = new JSONObject();
        json.put("code", 0);
        if (parentalPsychologyMapper.ppPrSdsDelete(id) > 0) {
            json.put("code", 1);
        }
        return json.toJSONString();
    }

    @Override
    public int getPrSdsEvaluationsNumber(int motherId) {
        return parentalPsychologyMapper.ppPrSdsEvaluationsNumberQry(motherId);
    }

    @Override
    public String saveBirthday(int motherId, String birthdayString) {
        JSONObject json = new JSONObject();
        json.put("code", 0);
        Date birthday = null;
        try {
            SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
            birthday = sdf.parse(birthdayString);
        } catch (ParseException ignored) {}
        if (birthday != null) {
            if (parentalPsychologyMapper.poBirthdayInsertUpdate(motherId, birthday) > 0) {
                json.put("code", 1);
            }
        }
        return json.toJSONString();
    }

    @Override
    public Date getBirthday(int motherId) {
        return parentalPsychologyMapper.poBirthdayQry(motherId);
    }

    @Override
    public List<PPPoEpds> getPpPoEpds(int motherId) {
        return parentalPsychologyMapper.ppPoEpdsQry(motherId);
    }

    @Override
    public String savePpPoEpds(PPPoEpds ppPoEpds, int motherId) {
        JSONObject json = new JSONObject();
        json.put("code", 0);
        ppPoEpds.setMid(motherId);
        if (parentalPsychologyMapper.ppPoEpdsInsertUpdate(ppPoEpds) > 0) {
            json.put("code", 1);
        }
        return json.toJSONString();
    }

    @Override
    public String deletePpPoEpds(int id) {
        JSONObject json = new JSONObject();
        json.put("code", 0);
        if (parentalPsychologyMapper.ppPoEpdsDelete(id) > 0) {
            json.put("code", 1);
        }
        return json.toJSONString();
    }

    @Override
    public int getPoEpdsEvaluationsNumber(int motherId) {
        return parentalPsychologyMapper.ppPoEpdsEvaluationsNumberQry(motherId);
    }

    @Override
    public List<PPPoSasOrSds> getPpPoSas(int motherId) {
        return parentalPsychologyMapper.ppPoSasQry(motherId);
    }

    @Override
    public String savePpPoSas(PPPoSasOrSds ppPoSas, int motherId) {
        JSONObject json = new JSONObject();
        json.put("code", 0);
        ppPoSas.setMid(motherId);
        if (parentalPsychologyMapper.ppPoSasInsertUpdate(ppPoSas) > 0) {
            json.put("code", 1);
        }
        return json.toJSONString();
    }

    @Override
    public String deletePpPoSas(int id) {
        JSONObject json = new JSONObject();
        json.put("code", 0);
        if (parentalPsychologyMapper.ppPoSasDelete(id) > 0) {
            json.put("code", 1);
        }
        return json.toJSONString();
    }

    @Override
    public int getPoSasEvaluationsNumber(int motherId) {
        return parentalPsychologyMapper.ppPoSasEvaluationsNumberQry(motherId);
    }

    @Override
    public List<PPPoSasOrSds> getPpPoSds(int motherId) {
        return parentalPsychologyMapper.ppPoSdsQry(motherId);
    }

    @Override
    public String savePpPoSds(PPPoSasOrSds ppPoSds, int motherId) {
        JSONObject json = new JSONObject();
        json.put("code", 0);
        ppPoSds.setMid(motherId);
        if (parentalPsychologyMapper.ppPoSdsInsertUpdate(ppPoSds) > 0) {
            json.put("code", 1);
        }
        return json.toJSONString();
    }

    @Override
    public String deletePpPoSds(int id) {
        JSONObject json = new JSONObject();
        json.put("code", 0);
        if (parentalPsychologyMapper.ppPoSdsDelete(id) > 0) {
            json.put("code", 1);
        }
        return json.toJSONString();
    }

    @Override
    public int getPoSdsEvaluationsNumber(int motherId) {
        return parentalPsychologyMapper.ppPoSdsEvaluationsNumberQry(motherId);
    }
    @Override
    public CaseStatus getPpCaseStatus(int motherIdBD) {
        return parentalPsychologyMapper.ppCaseStatusQry(motherIdBD);
    }

    @Override
    public int getPpReviewCount(int motherId) {
        return parentalPsychologyMapper.ppReviewCount(motherId);
    }

    @Override
    public List<Review> getPpReview(int motherId) {
        return parentalPsychologyMapper.ppReviewQry(motherId);
    }

    @Override
    public String addPpReview(Review ppReview) {
        JSONObject json = new JSONObject();
        json.put("code", 0);
        if (parentalPsychologyMapper.ppReviewInsert(ppReview) > 0) {
            parentalPsychologyMapper.ppStatusUpdate(ppReview.getMid(), ppReview.getStatus());
            json.put("code", 1);
        }
        return json.toJSONString();
    }

}