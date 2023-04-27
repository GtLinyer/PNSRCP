package com.pnsrcp.web.service.impl;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.pnsrcp.web.config.AccountDeactivationException;
import com.pnsrcp.web.config.MyUserDetails;
import com.pnsrcp.web.dao.MainMapper;
import com.pnsrcp.web.dao.manage.*;
import com.pnsrcp.web.entity.DataAmount;
import com.pnsrcp.web.entity.Feedback;
import com.pnsrcp.web.entity.manage.*;
import com.pnsrcp.web.service.MainService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.annotation.Resource;
import java.io.File;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.*;

/**
 * @Project: 围产新生儿科研合作平台
 * @Author: Linyer
 * @Email: linyer@linyer.cn
 * @Date: 2021/7/5 16:44 星期一
 * @Description: 主页面 服务层 实现类
 */
@Service
public class MainServiceImpl implements MainService {
    // 数据层实例化
    @Resource
    private MainMapper mainMapper;
    @Resource
    private HospitalMapper hospitalMapper;
    @Resource
    private HospitalBDAuthorityMapper hospitalBDAuthorityMapper;
    @Resource
    private HospitalDPCAuthorityMapper hospitalDPCAuthorityMapper;
    @Resource
    private HospitalMBSRAuthorityMapper hospitalMBSRAuthorityMapper;
    @Resource
    private HospitalPPAuthorityMapper hospitalPPAuthorityMapper;
    @Resource
    private HospitalRDAuthorityMapper hospitalRDAuthorityMapper;
    @Resource
    private HospitalUIAuthorityMapper hospitalUIAuthorityMapper;
    @Resource
    private HospitalFDAuthorityMapper hospitalFDAuthorityMapper;
    @Resource
    private HospitalHBAuthorityMapper hospitalHBAuthorityMapper;
    @Resource
    private AreaBDAuthorityMapper areaBDAuthorityMapper;
    @Resource
    private AreaDPCAuthorityMapper areaDPCAuthorityMapper;
    @Resource
    private AreaMBSRAuthorityMapper areaMBSRAuthorityMapper;
    @Resource
    private AreaPPAuthorityMapper areaPPAuthorityMapper;
    @Resource
    private AreaRDAuthorityMapper areaRDAuthorityMapper;
    @Resource
    private AreaUIAuthorityMapper areaUIAuthorityMapper;
    @Resource
    private AreaFDAuthorityMapper areaFDAuthorityMapper;
    @Resource
    private AreaHBAuthorityMapper areaHBAuthorityMapper;
    @Resource
    private AreaMapper areaMapper;
    @Resource
    private UserMapper userMapper;

    // 图片路径
    @Value("${com.perinatalcloud.feedback_images_path}")
    private String feedbackImagesPath;
    @Value("${com.perinatalcloud.feedback_images_url}")
    private String feedbackImagesUrl;

    @Override
    public MyUserDetails doLogin(String username) {
        MyUserDetails userDetails = new MyUserDetails();
        User loginUser = userMapper.userQuery(username);

        if (loginUser == null) {  // 检查能否查询到账户
            throw new UsernameNotFoundException("");
        } else if (loginUser.getStatus() == 0) {  // 检查账户是否停用
            throw new AccountDeactivationException("该账户已停用！");
        }

        userDetails.setUsername(loginUser.getUsername());
        userDetails.setPassword(loginUser.getPassword());
        userDetails.setUser(loginUser);

        // 设置用户权限
        List<SimpleGrantedAuthority> authorities = new ArrayList<>();
        if (loginUser.getLevel() == 1) {
            authorities.add(new SimpleGrantedAuthority("ROLE_ADMIN"));
            authorities.add(new SimpleGrantedAuthority("ROLE_CHARGE"));
        } else if (loginUser.getLevel() == 2) {
            authorities.add(new SimpleGrantedAuthority("ROLE_HC"));
            authorities.add(new SimpleGrantedAuthority("ROLE_USER"));
        } else if (loginUser.getLevel() == 3) {
            authorities.add(new SimpleGrantedAuthority("ROLE_AC"));
            authorities.add(new SimpleGrantedAuthority("ROLE_USER"));
        }

        int basicDatabase = 0, bdMotherInformation = 0, bdGestationInformation = 0, bdPerinatalInformation = 0, bdBabySituation = 0, bdRecoverySituation = 0,
                bdCriticalAssessment = 0, bdRespiratorySystem = 0, bdDigestiveSystem = 0, bdInfectionSurveillance = 0, bdCirculatorySystem = 0, bdNervousSystem = 0,
                bdRetinopathy = 0, bdDischargeSituation = 0,
                doctorPatientCommunication = 0, dpcBreastMilkDiary = 0, dpcGrowthCurve = 0, dpcFeedingSituation = 0, dpcDoctorPatientCommunication = 0,
                motherBabySameRoom = 0, mbsrBloodOxygenMonitor = 0,
                parentalPsychology = 0, ppPrenatalPsychology = 0, ppPostpartumPsychology = 0,
                researchDatabase = 0, rdHypothermiaQI = 0,
                ultrasoundImage = 0, uiBrainUltrasound = 0,
                followDatabase = 0, fdFollowInformation = 0, fdGrowthCurve = 0, fdDevelopmentalLevel = 0, fdGrowthProcess = 0, fdGrowthExchange = 0, fdSpecialDisease = 0,
                highBilirubin = 0, hbPerinatalInformation = 0, hbTreatment = 0, hbFollowUpExamination = 0, hbFollowUpConclusion = 0;

        // 设置 医院管理员 权限
        if (loginUser.getLevel() == 2) {
            // 获取 用户所属医院 所属的所有区域ID
            List<Integer> aidList = areaMapper.thisHospitalAreaQry(loginUser.getHospitalId());
            // 检测 所属医院 状态
            if (hospitalMapper.hospitalStatusQry(loginUser.getHospitalId()) == 0) {
                throw new AccountDeactivationException("该账户所属医院已停用！");
            }

            // 获取 医院 权限
            QueryWrapper<HospitalAuthBD> queryBdWrapper = new QueryWrapper<>();
            queryBdWrapper.eq("hid", loginUser.getHospitalId());
            HospitalAuthBD hospitalAuthBD = hospitalBDAuthorityMapper.selectOne(queryBdWrapper);
            QueryWrapper<HospitalAuthDPC> queryDpcWrapper = new QueryWrapper<>();
            queryDpcWrapper.eq("hid", loginUser.getHospitalId());
            HospitalAuthDPC hospitalAuthDPC = hospitalDPCAuthorityMapper.selectOne(queryDpcWrapper);
            QueryWrapper<HospitalAuthMBSR> queryMbsrWrapper = new QueryWrapper<>();
            queryMbsrWrapper.eq("hid", loginUser.getHospitalId());
            HospitalAuthMBSR hospitalAuthMBSR = hospitalMBSRAuthorityMapper.selectOne(queryMbsrWrapper);
            QueryWrapper<HospitalAuthPP> queryPpWrapper = new QueryWrapper<>();
            queryPpWrapper.eq("hid", loginUser.getHospitalId());
            HospitalAuthPP hospitalAuthPP = hospitalPPAuthorityMapper.selectOne(queryPpWrapper);
            QueryWrapper<HospitalAuthRD> queryRdWrapper = new QueryWrapper<>();
            queryRdWrapper.eq("hid", loginUser.getHospitalId());
            HospitalAuthRD hospitalAuthRD = hospitalRDAuthorityMapper.selectOne(queryRdWrapper);
            QueryWrapper<HospitalAuthUI> queryUiWrapper = new QueryWrapper<>();
            queryUiWrapper.eq("hid", loginUser.getHospitalId());
            HospitalAuthUI hospitalAuthUI = hospitalUIAuthorityMapper.selectOne(queryUiWrapper);
            QueryWrapper<HospitalAuthFD> queryFdWrapper = new QueryWrapper<>();
            queryFdWrapper.eq("hid", loginUser.getHospitalId());
            HospitalAuthFD hospitalAuthFD = hospitalFDAuthorityMapper.selectOne(queryFdWrapper);
            QueryWrapper<HospitalAuthHB> queryHbWrapper = new QueryWrapper<>();
            queryHbWrapper.eq("hid", loginUser.getHospitalId());
            HospitalAuthHB hospitalAuthHB = hospitalHBAuthorityMapper.selectOne(queryHbWrapper);
            // 获取 区域 权限、检测所属 区域 状态
            List<AreaAuthBD> areaAuthBDList = new ArrayList<>();
            List<AreaAuthDPC> areaAuthDPCList = new ArrayList<>();
            List<AreaAuthMBSR> areaAuthMBSRList = new ArrayList<>();
            List<AreaAuthPP> areaAuthPPList = new ArrayList<>();
            List<AreaAuthRD> areaAuthRDList = new ArrayList<>();
            List<AreaAuthUI> areaAuthUIList = new ArrayList<>();
            List<AreaAuthFD> areaAuthFDList = new ArrayList<>();
            List<AreaAuthHB> areaAuthHBList = new ArrayList<>();
            int areaStatus = 0;
            for (int aid : aidList) {
                // 检测 所属 区域 状态
                if (areaMapper.areaStatusQry(aid) == 1) {
                    areaStatus = 1;
                }
                // 获取 区域 权限
                QueryWrapper<AreaAuthBD> queryBdLWrapper = new QueryWrapper<>();
                queryBdLWrapper.eq("aid", aid);
                areaAuthBDList.add(areaBDAuthorityMapper.selectOne(queryBdLWrapper));
                QueryWrapper<AreaAuthDPC> queryDpcLWrapper = new QueryWrapper<>();
                queryDpcLWrapper.eq("aid", aid);
                areaAuthDPCList.add(areaDPCAuthorityMapper.selectOne(queryDpcLWrapper));
                QueryWrapper<AreaAuthMBSR> queryMbsrLWrapper = new QueryWrapper<>();
                queryMbsrLWrapper.eq("aid", aid);
                areaAuthMBSRList.add(areaMBSRAuthorityMapper.selectOne(queryMbsrLWrapper));
                QueryWrapper<AreaAuthPP> queryPpLWrapper = new QueryWrapper<>();
                queryPpLWrapper.eq("aid", aid);
                areaAuthPPList.add(areaPPAuthorityMapper.selectOne(queryPpLWrapper));
                QueryWrapper<AreaAuthRD> queryRdLWrapper = new QueryWrapper<>();
                queryRdLWrapper.eq("aid", aid);
                areaAuthRDList.add(areaRDAuthorityMapper.selectOne(queryRdLWrapper));
                QueryWrapper<AreaAuthUI> queryUiLWrapper = new QueryWrapper<>();
                queryUiLWrapper.eq("aid", aid);
                areaAuthUIList.add(areaUIAuthorityMapper.selectOne(queryUiLWrapper));
                QueryWrapper<AreaAuthFD> queryFdLWrapper = new QueryWrapper<>();
                queryFdLWrapper.eq("aid", aid);
                areaAuthFDList.add(areaFDAuthorityMapper.selectOne(queryFdLWrapper));
                QueryWrapper<AreaAuthHB> queryHbLWrapper = new QueryWrapper<>();
                queryHbLWrapper.eq("aid", aid);
                areaAuthHBList.add(areaHBAuthorityMapper.selectOne(queryHbLWrapper));
            }
            if (areaStatus == 0) {
                throw new AccountDeactivationException("该账户所属所有区域已停用！");
            }

            // 区域 权限
            if (aidList.size() == 0) {
                // 基础数据库 区域 权限
                basicDatabase = 1;
                bdMotherInformation = 1;
                bdGestationInformation = 1;
                bdPerinatalInformation = 1;
                bdBabySituation = 1;
                bdRecoverySituation = 1;
                bdCriticalAssessment = 1;
                bdRespiratorySystem = 1;
                bdDigestiveSystem = 1;
                bdInfectionSurveillance = 1;
                bdCirculatorySystem = 1;
                bdNervousSystem = 1;
                bdRetinopathy = 1;
                bdDischargeSituation = 1;

                // 医患交流库 区域 权限
                doctorPatientCommunication = 1;
                dpcBreastMilkDiary = 1;
                dpcGrowthCurve = 1;
                dpcFeedingSituation = 1;
                dpcDoctorPatientCommunication = 1;

                // 母婴同室库 区域 权限
                motherBabySameRoom = 1;
                mbsrBloodOxygenMonitor = 1;

                // 父母心理库 区域 权限
                parentalPsychology = 1;
                ppPrenatalPsychology = 1;
                ppPostpartumPsychology = 1;

                // 研究数据库 区域 权限
                researchDatabase = 1;
                rdHypothermiaQI = 1;

                // 超声影像库 区域 权限
                ultrasoundImage = 1;
                uiBrainUltrasound = 1;

                // 随访数据库 区域 权限
                followDatabase = 1;
                fdFollowInformation = 1;
                fdGrowthCurve = 1;
                fdDevelopmentalLevel = 1;
                fdGrowthProcess = 1;
                fdGrowthExchange = 1;
                fdSpecialDisease = 1;

                // 高胆数据库 区域 权限
                highBilirubin = 1;
                hbPerinatalInformation = 1;
                hbTreatment = 1;
                hbFollowUpExamination = 1;
                hbFollowUpConclusion = 1;
            } else {
                // 基础数据库 区域 权限
                for (AreaAuthBD areaAuthBD : areaAuthBDList) {
                    try {
                        if (areaAuthBD.getBasicDatabase() == 1) {
                            basicDatabase = 1;
                        }
                        if (areaAuthBD.getBdMotherInformation() == 1) {
                            bdMotherInformation = 1;
                        }
                        if (areaAuthBD.getBdGestationInformation() == 1) {
                            bdGestationInformation = 1;
                        }
                        if (areaAuthBD.getBdPerinatalInformation() == 1) {
                            bdPerinatalInformation = 1;
                        }
                        if (areaAuthBD.getBdBabySituation() == 1) {
                            bdBabySituation = 1;
                        }
                        if (areaAuthBD.getBdRecoverySituation() == 1) {
                            bdRecoverySituation = 1;
                        }
                        if (areaAuthBD.getBdCriticalAssessment() == 1) {
                            bdCriticalAssessment = 1;
                        }
                        if (areaAuthBD.getBdRespiratorySystem() == 1) {
                            bdRespiratorySystem = 1;
                        }
                        if (areaAuthBD.getBdDigestiveSystem() == 1) {
                            bdDigestiveSystem = 1;
                        }
                        if (areaAuthBD.getBdInfectionSurveillance() == 1) {
                            bdInfectionSurveillance = 1;
                        }
                        if (areaAuthBD.getBdCirculatorySystem() == 1) {
                            bdCirculatorySystem = 1;
                        }
                        if (areaAuthBD.getBdNervousSystem() == 1) {
                            bdNervousSystem = 1;
                        }
                        if (areaAuthBD.getBdRetinopathy() == 1) {
                            bdRetinopathy = 1;
                        }
                        if (areaAuthBD.getBdDischargeSituation() == 1) {
                            bdDischargeSituation = 1;
                        }
                    } catch (NullPointerException ignored) {}
                }

                // 医患交流库 区域 权限
                for (AreaAuthDPC areaAuthDPC : areaAuthDPCList) {
                    try {
                        if (areaAuthDPC.getDoctorPatientCommunication() == 1) {
                            doctorPatientCommunication = 1;
                        }
                        if (areaAuthDPC.getDpcBreastMilkDiary() == 1) {
                            dpcBreastMilkDiary = 1;
                        }
                        if (areaAuthDPC.getDpcGrowthCurve() == 1) {
                            dpcGrowthCurve = 1;
                        }
                        if (areaAuthDPC.getDpcFeedingSituation() == 1) {
                            dpcFeedingSituation = 1;
                        }
                        if (areaAuthDPC.getDpcDoctorPatientCommunication() == 1) {
                            dpcDoctorPatientCommunication = 1;
                        }
                    } catch (NullPointerException ignored) {}
                }

                // 母婴同室库 区域 权限
                for (AreaAuthMBSR areaAuthMBSR : areaAuthMBSRList) {
                    try {
                        if (areaAuthMBSR.getMotherBabySameRoom() == 1) {
                            motherBabySameRoom = 1;
                        }
                        if (areaAuthMBSR.getMbsrBloodOxygenMonitor() == 1) {
                            mbsrBloodOxygenMonitor = 1;
                        }
                    } catch (NullPointerException ignored) {}
                }

                // 父母心理库 区域 权限
                for (AreaAuthPP areaAuthPP : areaAuthPPList) {
                    try {
                        if (areaAuthPP.getParentalPsychology() == 1) {
                            parentalPsychology = 1;
                        }
                        if (areaAuthPP.getPpPrenatalPsychology() == 1) {
                            ppPrenatalPsychology = 1;
                        }
                        if (areaAuthPP.getPpPostpartumPsychology() == 1) {
                            ppPostpartumPsychology = 1;
                        }
                    } catch (NullPointerException ignored) {}
                }

                // 研究数据库 区域 权限
                for (AreaAuthRD areaAuthRD : areaAuthRDList) {
                    try {
                        if (areaAuthRD.getResearchDatabase() == 1) {
                            researchDatabase = 1;
                        }
                        if (areaAuthRD.getRdHypothermiaQI() == 1) {
                            rdHypothermiaQI = 1;
                        }
                    } catch (NullPointerException ignored) {}
                }

                // 超声影像库 区域 权限
                for (AreaAuthUI areaAuthUI : areaAuthUIList) {
                    try {
                        if (areaAuthUI.getUltrasoundImage() == 1) {
                            ultrasoundImage = 1;
                        }
                        if (areaAuthUI.getUiBrainUltrasound() == 1) {
                            uiBrainUltrasound = 1;
                        }
                    } catch (NullPointerException ignored) {}
                }

                // 随访数据库 区域 权限
                for (AreaAuthFD areaAuthFD : areaAuthFDList) {
                    try {
                        if (areaAuthFD.getFollowDatabase() == 1) {
                            followDatabase = 1;
                        }
                        if (areaAuthFD.getFdFollowInformation() == 1) {
                            fdFollowInformation = 1;
                        }
                        if (areaAuthFD.getFdGrowthCurve() == 1) {
                            fdGrowthCurve = 1;
                        }
                        if (areaAuthFD.getFdDevelopmentalLevel() == 1) {
                            fdDevelopmentalLevel = 1;
                        }
                        if (areaAuthFD.getFdGrowthProcess() == 1) {
                            fdGrowthProcess = 1;
                        }
                        if (areaAuthFD.getFdGrowthExchange() == 1) {
                            fdGrowthExchange = 1;
                        }
                        if (areaAuthFD.getFdSpecialDisease() == 1) {
                            fdSpecialDisease = 1;
                        }
                    } catch (NullPointerException ignored) {}
                }

                // 高胆数据库 区域 权限
                for (AreaAuthHB areaAuthHB : areaAuthHBList) {
                    try {
                        if (areaAuthHB.getHighBilirubin() == 1) {
                            highBilirubin = 1;
                        }
                        if (areaAuthHB.getHbPerinatalInformation() == 1) {
                            hbPerinatalInformation = 1;
                        }
                        if (areaAuthHB.getHbTreatment() == 1) {
                            hbTreatment = 1;
                        }
                        if (areaAuthHB.getHbFollowUpExamination() == 1) {
                            hbFollowUpExamination = 1;
                        }
                        if (areaAuthHB.getHbFollowUpConclusion() == 1) {
                            hbFollowUpConclusion = 1;
                        }
                    } catch (NullPointerException ignored) {}
                }
            }

            // 基础数据库 医院 权限
            if (hospitalAuthBD == null) {
                basicDatabase = 0;
                bdMotherInformation = 0;
                bdGestationInformation = 0;
                bdPerinatalInformation = 0;
                bdBabySituation = 0;
                bdRecoverySituation = 0;
                bdCriticalAssessment = 0;
                bdRespiratorySystem = 0;
                bdDigestiveSystem = 0;
                bdInfectionSurveillance = 0;
                bdCirculatorySystem = 0;
                bdNervousSystem = 0;
                bdRetinopathy = 0;
                bdDischargeSituation = 0;
            } else {
                if (hospitalAuthBD.getBasicDatabase() == 0) {
                    basicDatabase = 0;
                }
                if (hospitalAuthBD.getBdMotherInformation() == 0) {
                    bdMotherInformation = 0;
                }
                if (hospitalAuthBD.getBdGestationInformation() == 0) {
                    bdGestationInformation = 0;
                }
                if (hospitalAuthBD.getBdPerinatalInformation() == 0) {
                    bdPerinatalInformation = 0;
                }
                if (hospitalAuthBD.getBdBabySituation() == 0) {
                    bdBabySituation = 0;
                }
                if (hospitalAuthBD.getBdRecoverySituation() == 0) {
                    bdRecoverySituation = 0;
                }
                if (hospitalAuthBD.getBdCriticalAssessment() == 0) {
                    bdCriticalAssessment = 0;
                }
                if (hospitalAuthBD.getBdRespiratorySystem() == 0) {
                    bdRespiratorySystem = 0;
                }
                if (hospitalAuthBD.getBdDigestiveSystem() == 0) {
                    bdDigestiveSystem = 0;
                }
                if (hospitalAuthBD.getBdInfectionSurveillance() == 0) {
                    bdInfectionSurveillance = 0;
                }
                if (hospitalAuthBD.getBdCirculatorySystem() == 0) {
                    bdCirculatorySystem = 0;
                }
                if (hospitalAuthBD.getBdNervousSystem() == 0) {
                    bdNervousSystem = 0;
                }
                if (hospitalAuthBD.getBdRetinopathy() == 0) {
                    bdRetinopathy = 0;
                }
                if (hospitalAuthBD.getBdDischargeSituation() == 0) {
                    bdDischargeSituation = 0;
                }
            }
            // 医患交流库 医院 权限
            if (hospitalAuthDPC == null) {
                doctorPatientCommunication = 0;
                dpcBreastMilkDiary = 0;
                dpcGrowthCurve = 0;
                dpcFeedingSituation = 0;
                dpcDoctorPatientCommunication = 0;
            } else {
                if (hospitalAuthDPC.getDoctorPatientCommunication() == 0) {
                    doctorPatientCommunication = 0;
                }
                if (hospitalAuthDPC.getDpcBreastMilkDiary() == 0) {
                    dpcBreastMilkDiary = 0;
                }
                if (hospitalAuthDPC.getDpcGrowthCurve() == 0) {
                    dpcGrowthCurve = 0;
                }
                if (hospitalAuthDPC.getDpcFeedingSituation() == 0) {
                    dpcFeedingSituation = 0;
                }
                if (hospitalAuthDPC.getDpcDoctorPatientCommunication() == 0) {
                    dpcDoctorPatientCommunication = 0;
                }
            }
            // 母婴同室库 医院 权限
            if (hospitalAuthMBSR == null) {
                motherBabySameRoom = 0;
                mbsrBloodOxygenMonitor = 0;
            } else {
                if (hospitalAuthMBSR.getMotherBabySameRoom() == 0) {
                    motherBabySameRoom = 0;
                }
                if (hospitalAuthMBSR.getMbsrBloodOxygenMonitor() == 0) {
                    mbsrBloodOxygenMonitor = 0;
                }
            }
            // 父母心理库 医院 权限
            if (hospitalAuthPP == null) {
                parentalPsychology = 0;
                ppPrenatalPsychology = 0;
                ppPostpartumPsychology = 0;
            } else {
                if (hospitalAuthPP.getParentalPsychology() == 0) {
                    parentalPsychology = 0;
                }
                if (hospitalAuthPP.getPpPrenatalPsychology() == 0) {
                    ppPrenatalPsychology = 0;
                }
                if (hospitalAuthPP.getPpPostpartumPsychology() == 0) {
                    ppPostpartumPsychology = 0;
                }
            }
            // 研究数据库 医院 权限
            if (hospitalAuthRD == null) {
                researchDatabase = 0;
                rdHypothermiaQI = 0;
            } else {
                if (hospitalAuthRD.getResearchDatabase() == 0) {
                    researchDatabase = 0;
                }
                if (hospitalAuthRD.getRdHypothermiaQI() == 0) {
                    rdHypothermiaQI = 0;
                }
            }
            // 超声影像库 医院 权限
            if (hospitalAuthUI == null) {
                ultrasoundImage = 0;
                uiBrainUltrasound = 0;
            } else {
                if (hospitalAuthUI.getUltrasoundImage() == 0) {
                    ultrasoundImage = 0;
                }
                if (hospitalAuthUI.getUiBrainUltrasound() == 0) {
                    uiBrainUltrasound = 0;
                }
            }
            // 随访数据库 医院 权限
            if (hospitalAuthFD == null) {
                followDatabase = 0;
                fdFollowInformation = 0;
                fdGrowthCurve = 0;
                fdDevelopmentalLevel = 0;
                fdGrowthProcess = 0;
                fdGrowthExchange = 0;
                fdSpecialDisease = 0;
            } else {
                if (hospitalAuthFD.getFollowDatabase() == 0) {
                    followDatabase = 0;
                }
                if (hospitalAuthFD.getFdFollowInformation() == 0) {
                    fdFollowInformation = 0;
                }
                if (hospitalAuthFD.getFdGrowthCurve() == 0) {
                    fdGrowthCurve = 0;
                }
                if (hospitalAuthFD.getFdDevelopmentalLevel() == 0) {
                    fdDevelopmentalLevel = 0;
                }
                if (hospitalAuthFD.getFdGrowthProcess() == 0) {
                    fdGrowthProcess = 0;
                }
                if (hospitalAuthFD.getFdGrowthExchange() == 0) {
                    fdGrowthExchange = 0;
                }
                if (hospitalAuthFD.getFdSpecialDisease() == 0) {
                    fdSpecialDisease = 0;
                }
            }
            // 高胆数据库 医院 权限
            if (hospitalAuthHB == null) {
                highBilirubin = 0;
                hbPerinatalInformation = 0;
                hbTreatment = 0;
                hbFollowUpExamination = 0;
                hbFollowUpConclusion = 0;
            } else {
                if (hospitalAuthHB.getHighBilirubin() == 0) {
                    highBilirubin = 0;
                }
                if (hospitalAuthHB.getHbPerinatalInformation() == 0) {
                    hbPerinatalInformation = 0;
                }
                if (hospitalAuthHB.getHbTreatment() == 0) {
                    hbTreatment = 0;
                }
                if (hospitalAuthHB.getHbFollowUpExamination() == 0) {
                    hbFollowUpExamination = 0;
                }
                if (hospitalAuthHB.getHbFollowUpConclusion() == 0) {
                    hbFollowUpConclusion = 0;
                }
            }
        } else if (loginUser.getLevel() == 1) {  // 超级管理员权限
            // 基础数据库
            basicDatabase = 1;
            bdMotherInformation = 1;
            bdGestationInformation = 1;
            bdPerinatalInformation = 1;
            bdBabySituation = 1;
            bdRecoverySituation = 1;
            bdCriticalAssessment = 1;
            bdRespiratorySystem = 1;
            bdDigestiveSystem = 1;
            bdInfectionSurveillance = 1;
            bdCirculatorySystem = 1;
            bdNervousSystem = 1;
            bdRetinopathy = 1;
            bdDischargeSituation = 1;
            // 医患交流库
            doctorPatientCommunication = 1;
            dpcBreastMilkDiary = 1;
            dpcGrowthCurve = 1;
            dpcFeedingSituation = 1;
            dpcDoctorPatientCommunication = 1;
            // 母婴同室库
            motherBabySameRoom = 1;
            mbsrBloodOxygenMonitor = 1;
            // 父母心理库
            parentalPsychology = 1;
            ppPrenatalPsychology = 1;
            ppPostpartumPsychology = 1;
            // 研究数据库
            researchDatabase = 1;
            rdHypothermiaQI = 1;
            // 超声影像库
            ultrasoundImage = 1;
            uiBrainUltrasound = 1;
            // 随访数据库
            followDatabase = 1;
            fdFollowInformation = 1;
            fdGrowthCurve = 1;
            fdDevelopmentalLevel = 1;
            fdGrowthProcess = 1;
            fdGrowthExchange = 1;
            fdSpecialDisease = 1;
            // 高胆数据库
            highBilirubin = 1;
            hbPerinatalInformation = 1;
            hbTreatment = 1;
            hbFollowUpExamination = 1;
            hbFollowUpConclusion = 1;
        } else if (loginUser.getLevel() == 3) {  // 区域管理员权限
            // 获取 区域ID
            int areaId = areaMapper.areaChargePersonId(loginUser.getUid());
            // 检测 区域 状态
            if (areaMapper.areaStatusQry(areaId) == 0) {
                throw new AccountDeactivationException("该区域已停用！");
            }

            // 获取 区域 权限
            QueryWrapper<AreaAuthBD> queryBdWrapper = new QueryWrapper<>();
            queryBdWrapper.eq("aid", areaId);
            AreaAuthBD areaManagerAuthBD = areaBDAuthorityMapper.selectOne(queryBdWrapper);
            QueryWrapper<AreaAuthDPC> queryDpcWrapper = new QueryWrapper<>();
            queryDpcWrapper.eq("aid", areaId);
            AreaAuthDPC areaManagerAuthDPC = areaDPCAuthorityMapper.selectOne(queryDpcWrapper);
            QueryWrapper<AreaAuthMBSR> queryMbsrWrapper = new QueryWrapper<>();
            queryMbsrWrapper.eq("aid", areaId);
            AreaAuthMBSR areaManagerAuthMBSR = areaMBSRAuthorityMapper.selectOne(queryMbsrWrapper);
            QueryWrapper<AreaAuthPP> queryPpWrapper = new QueryWrapper<>();
            queryPpWrapper.eq("aid", areaId);
            AreaAuthPP areaManagerAuthPP = areaPPAuthorityMapper.selectOne(queryPpWrapper);
            QueryWrapper<AreaAuthRD> queryRdWrapper = new QueryWrapper<>();
            queryRdWrapper.eq("aid", areaId);
            AreaAuthRD areaManagerAuthRD = areaRDAuthorityMapper.selectOne(queryRdWrapper);
            QueryWrapper<AreaAuthUI> queryUiWrapper = new QueryWrapper<>();
            queryUiWrapper.eq("aid", areaId);
            AreaAuthUI areaManagerAuthUI = areaUIAuthorityMapper.selectOne(queryUiWrapper);
            QueryWrapper<AreaAuthFD> queryFdWrapper = new QueryWrapper<>();
            queryFdWrapper.eq("aid", areaId);
            AreaAuthFD areaManagerAuthFD = areaFDAuthorityMapper.selectOne(queryFdWrapper);
            QueryWrapper<AreaAuthHB> queryHbWrapper = new QueryWrapper<>();
            queryHbWrapper.eq("aid", areaId);
            AreaAuthHB areaManagerAuthHB = areaHBAuthorityMapper.selectOne(queryHbWrapper);

            // 基础数据库 区域 权限
            if (areaManagerAuthBD != null) {
                if (areaManagerAuthBD.getBasicDatabase() == 1) {
                    basicDatabase = 1;
                }
                if (areaManagerAuthBD.getBdMotherInformation() == 1) {
                    bdMotherInformation = 1;
                }
                if (areaManagerAuthBD.getBdGestationInformation() == 1) {
                    bdGestationInformation = 1;
                }
                if (areaManagerAuthBD.getBdPerinatalInformation() == 1) {
                    bdPerinatalInformation = 1;
                }
                if (areaManagerAuthBD.getBdBabySituation() == 1) {
                    bdBabySituation = 1;
                }
                if (areaManagerAuthBD.getBdRecoverySituation() == 1) {
                    bdRecoverySituation = 1;
                }
                if (areaManagerAuthBD.getBdCriticalAssessment() == 1) {
                    bdCriticalAssessment = 1;
                }
                if (areaManagerAuthBD.getBdRespiratorySystem() == 1) {
                    bdRespiratorySystem = 1;
                }
                if (areaManagerAuthBD.getBdDigestiveSystem() == 1) {
                    bdDigestiveSystem = 1;
                }
                if (areaManagerAuthBD.getBdInfectionSurveillance() == 1) {
                    bdInfectionSurveillance = 1;
                }
                if (areaManagerAuthBD.getBdCirculatorySystem() == 1) {
                    bdCirculatorySystem = 1;
                }
                if (areaManagerAuthBD.getBdNervousSystem() == 1) {
                    bdNervousSystem = 1;
                }
                if (areaManagerAuthBD.getBdRetinopathy() == 1) {
                    bdRetinopathy = 1;
                }
                if (areaManagerAuthBD.getBdDischargeSituation() == 1) {
                    bdDischargeSituation = 1;
                }
            }
            // 医患交流库 区域 权限
            if (areaManagerAuthDPC != null) {
                if (areaManagerAuthDPC.getDoctorPatientCommunication() == 1) {
                    doctorPatientCommunication = 1;
                }
                if (areaManagerAuthDPC.getDpcBreastMilkDiary() == 1) {
                    dpcBreastMilkDiary = 1;
                }
                if (areaManagerAuthDPC.getDpcGrowthCurve() == 1) {
                    dpcGrowthCurve = 1;
                }
                if (areaManagerAuthDPC.getDpcFeedingSituation() == 1) {
                    dpcFeedingSituation = 1;
                }
                if (areaManagerAuthDPC.getDpcDoctorPatientCommunication() == 1) {
                    dpcDoctorPatientCommunication = 1;
                }
            }
            // 母婴同室库 区域 权限
            if (areaManagerAuthMBSR != null) {
                if (areaManagerAuthMBSR.getMotherBabySameRoom() == 1) {
                    motherBabySameRoom = 1;
                }
                if (areaManagerAuthMBSR.getMbsrBloodOxygenMonitor() == 1) {
                    mbsrBloodOxygenMonitor = 1;
                }
            }
            // 父母心理库 区域 权限
            if (areaManagerAuthPP != null) {
                if (areaManagerAuthPP.getParentalPsychology() == 1) {
                    parentalPsychology = 1;
                }
                if (areaManagerAuthPP.getPpPrenatalPsychology() == 1) {
                    ppPrenatalPsychology = 1;
                }
                if (areaManagerAuthPP.getPpPostpartumPsychology() == 1) {
                    ppPostpartumPsychology = 1;
                }
            }
            // 研究数据库 区域 权限
            if (areaManagerAuthRD != null) {
                if (areaManagerAuthRD.getResearchDatabase() == 1) {
                    researchDatabase = 1;
                }
                if (areaManagerAuthRD.getRdHypothermiaQI() == 1) {
                    rdHypothermiaQI = 1;
                }
            }
            // 超声影像库 区域 权限
            if (areaManagerAuthUI != null) {
                if (areaManagerAuthUI.getUltrasoundImage() == 1) {
                    ultrasoundImage = 1;
                }
                if (areaManagerAuthUI.getUiBrainUltrasound() == 1) {
                    uiBrainUltrasound = 1;
                }
            }
            // 随访数据库 区域 权限
            if (areaManagerAuthFD != null) {
                if (areaManagerAuthFD.getFollowDatabase() == 1) {
                    followDatabase = 1;
                }
                if (areaManagerAuthFD.getFdFollowInformation() == 1) {
                    fdFollowInformation = 1;
                }
                if (areaManagerAuthFD.getFdGrowthCurve() == 1) {
                    fdGrowthCurve = 1;
                }
                if (areaManagerAuthFD.getFdDevelopmentalLevel() == 1) {
                    fdDevelopmentalLevel = 1;
                }
                if (areaManagerAuthFD.getFdGrowthProcess() == 1) {
                    fdGrowthProcess = 1;
                }
                if (areaManagerAuthFD.getFdGrowthExchange() == 1) {
                    fdGrowthExchange = 1;
                }
                if (areaManagerAuthFD.getFdSpecialDisease() == 1) {
                    fdSpecialDisease = 1;
                }
            }
            // 高胆数据库 区域 权限
            if (areaManagerAuthHB != null) {
                if (areaManagerAuthHB.getHighBilirubin() == 1) {
                    highBilirubin = 1;
                }
                if (areaManagerAuthHB.getHbPerinatalInformation() == 1) {
                    hbPerinatalInformation = 1;
                }
                if (areaManagerAuthHB.getHbTreatment() == 1) {
                    hbTreatment = 1;
                }
                if (areaManagerAuthHB.getHbFollowUpExamination() == 1) {
                    hbFollowUpExamination = 1;
                }
                if (areaManagerAuthHB.getHbFollowUpConclusion() == 1) {
                    hbFollowUpConclusion = 1;
                }
            }
        }

        // 各数据库 每一项 权限列表
        Map<String, List<String>> authMapList = new HashMap<>();
        if (basicDatabase == 1) {
            authorities.add(new SimpleGrantedAuthority("ROLE_BD"));
        }
        if (bdMotherInformation == 1) {
            authorities.add(new SimpleGrantedAuthority("ROLE_BDMI"));
        }
        if (bdGestationInformation == 1) {
            authorities.add(new SimpleGrantedAuthority("ROLE_BDGI"));
        }
        if (bdPerinatalInformation == 1) {
            authorities.add(new SimpleGrantedAuthority("ROLE_BDPI"));
        }
        if (bdBabySituation == 1) {
            authorities.add(new SimpleGrantedAuthority("ROLE_BDBS"));
        }
        if (bdRecoverySituation == 1) {
            authorities.add(new SimpleGrantedAuthority("ROLE_BDRS"));
        }
        if (bdCriticalAssessment == 1) {
            authorities.add(new SimpleGrantedAuthority("ROLE_BDCA"));
        }
        if (bdRespiratorySystem == 1) {
            authorities.add(new SimpleGrantedAuthority("ROLE_BDRST"));
        }
        if (bdDigestiveSystem == 1) {
            authorities.add(new SimpleGrantedAuthority("ROLE_BDDGS"));
        }
        if (bdInfectionSurveillance == 1) {
            authorities.add(new SimpleGrantedAuthority("ROLE_BDIS"));
        }
        if (bdCirculatorySystem == 1) {
            authorities.add(new SimpleGrantedAuthority("ROLE_BDCS"));
        }
        if (bdNervousSystem == 1) {
            authorities.add(new SimpleGrantedAuthority("ROLE_BDNS"));
        }
        if (bdRetinopathy == 1) {
            authorities.add(new SimpleGrantedAuthority("ROLE_BDRP"));
        }
        if (bdDischargeSituation == 1) {
            authorities.add(new SimpleGrantedAuthority("ROLE_BDDS"));
        }
        // 为登录用户 设置 医患交流库 权限
        if (doctorPatientCommunication == 1) {
            authorities.add(new SimpleGrantedAuthority("ROLE_DPC"));
        }
        if (dpcBreastMilkDiary == 1) {
            authorities.add(new SimpleGrantedAuthority("ROLE_DPCBMD"));
        }
        if (dpcGrowthCurve == 1) {
            authorities.add(new SimpleGrantedAuthority("ROLE_DPCGC"));
        }
        if (dpcFeedingSituation == 1) {
            authorities.add(new SimpleGrantedAuthority("ROLE_DPCFS"));
        }
        if (dpcDoctorPatientCommunication == 1) {
            authorities.add(new SimpleGrantedAuthority("ROLE_DPCDPC"));
        }
        // 为登录用户 设置 母婴同室库 权限
        if (motherBabySameRoom == 1) {
            authorities.add(new SimpleGrantedAuthority("ROLE_MBSR"));
        }
        if (mbsrBloodOxygenMonitor == 1) {
            authorities.add(new SimpleGrantedAuthority("ROLE_MBSRBOM"));
        }
        // 为登录用户 设置 父母心理库 权限
        List<String> authPPList = new ArrayList<>();
        if (parentalPsychology == 1) {
            authorities.add(new SimpleGrantedAuthority("ROLE_PP"));
        }
        if (ppPrenatalPsychology == 1) {
            authorities.add(new SimpleGrantedAuthority("ROLE_PPPR"));
            authPPList.add("pc_pp_prenatal_psychology");
        }
        if (ppPostpartumPsychology == 1) {
            authorities.add(new SimpleGrantedAuthority("ROLE_PPPO"));
            authPPList.add("pc_pp_postpartum_psychology");
        }
        // 为登录用户 设置 研究数据库 权限
        if (researchDatabase == 1) {
            authorities.add(new SimpleGrantedAuthority("ROLE_RD"));
        }
        if (rdHypothermiaQI == 1) {
            authorities.add(new SimpleGrantedAuthority("ROLE_RDHQI"));
        }
        // 为登录用户 设置 超声影像库 权限
        if (ultrasoundImage == 1) {
            authorities.add(new SimpleGrantedAuthority("ROLE_UI"));
        }
        if (uiBrainUltrasound == 1) {
            authorities.add(new SimpleGrantedAuthority("ROLE_UIBU"));
        }
        // 为登录用户 设置 随访数据库 权限
        if (followDatabase == 1) {
            authorities.add(new SimpleGrantedAuthority("ROLE_FD"));
        }
        if (fdFollowInformation == 1) {
            authorities.add(new SimpleGrantedAuthority("ROLE_FDFI"));
        }
        if (fdGrowthCurve == 1) {
            authorities.add(new SimpleGrantedAuthority("ROLE_FDGC"));
        }
        if (fdDevelopmentalLevel == 1) {
            authorities.add(new SimpleGrantedAuthority("ROLE_FDDL"));
        }
        if (fdGrowthProcess == 1) {
            authorities.add(new SimpleGrantedAuthority("ROLE_FDGP"));
        }
        if (fdGrowthExchange == 1) {
            authorities.add(new SimpleGrantedAuthority("ROLE_FDGE"));
        }
        if (fdSpecialDisease == 1) {
            authorities.add(new SimpleGrantedAuthority("ROLE_FDSD"));
        }
        // 为登录用户 设置 高胆数据库 权限
        if (highBilirubin == 1) {
            authorities.add(new SimpleGrantedAuthority("ROLE_HB"));
        }
        if (hbPerinatalInformation == 1) {
            authorities.add(new SimpleGrantedAuthority("ROLE_HBPI"));
        }
        if (hbTreatment == 1) {
            authorities.add(new SimpleGrantedAuthority("ROLE_HBT"));
        }
        if (hbFollowUpExamination == 1) {
            authorities.add(new SimpleGrantedAuthority("ROLE_HBFUE"));
        }
        if (hbFollowUpConclusion == 1) {
            authorities.add(new SimpleGrantedAuthority("ROLE_HBFUC"));
        }

        userDetails.setAuthorities(authorities);
        authMapList.put("ppAuthList", authPPList);
        userDetails.setAuthMapList(authMapList);

        return userDetails;
    }

    @Override
    public String changePwd(User user, String oldPwd, String newPwd, String reNewPwd) {
        JSONObject json = new JSONObject();
        BCryptPasswordEncoder pwdEncoder = new BCryptPasswordEncoder();
        json.put("code", 0);
        String newPwdCode = pwdEncoder.encode(newPwd);

        if (!newPwd.equals(reNewPwd)) {
            json.put("errorMsg", "两次输入新密码不一致！");
        } else if (!pwdEncoder.matches(oldPwd, user.getPassword())) {
            json.put("errorMsg", "原密码错误！");
        } else if (userMapper.userPwdUpdate(user.getUid(), newPwdCode) > 0){
            json.put("code", 1);
        } else {
            json.put("code", 0);
            json.put("errorMsg", "修改密码失败！");
        }
        return json.toJSONString();
    }

    @Override
    public List<DataAmount> getDataAmount(int hospitalId, List<Integer> hospitalList) {
        return mainMapper.dataAmountQry(hospitalId, hospitalList);
    }


    public Hospital getHospitalMsg(int hid) {
        Hospital hospital = null;
        if (hid > 0) {
            List<Hospital> hospitals = hospitalMapper.hospitalQry(-1, -1, hid, 0);
            if (hospitals.size() != 0) {
                hospital = hospitals.get(0);
            }
        }
        return hospital;
    }

    @Override
    public Area getAreaMsg(int uid) {
        List<Area> areas = areaMapper.areaQuery(0 , uid);
        Area area = null;
        if (areas.size() != 0) {
            area = areas.get(0);
        }
        return area;
    }

    @Override
    public List<Integer> getAreaHospitalId(int uid) {
        return hospitalMapper.thisAreaHospitalQuery(areaMapper.areaChargePersonId(uid));
    }

    @Override
    public String getData(String selectType, Date startDate, Date endDate, int inHospital, int hospitalId, List<Integer> hospitalList) {
        JSONObject json = new JSONObject();
        json.put("casesTotalNumber", mainMapper.casesTotalNumberQry(selectType, startDate, endDate, inHospital, hospitalId, hospitalList));
        json.put("ga32w", mainMapper.ga32wQry(selectType, startDate, endDate, inHospital, hospitalId, hospitalList));
        json.put("bw1500g", mainMapper.bw1500gQry(selectType, startDate, endDate, inHospital, hospitalId, hospitalList));
        Date todayNow = new Date();
        String format = "yyyy-MM-dd";
        SimpleDateFormat sdf = new SimpleDateFormat(format);
        String todayStart = sdf.format(todayNow) + " 00:00:00";
        json.put("todayAdd", mainMapper.todayAddQry(todayStart, todayNow, inHospital, hospitalId, hospitalList));
        json.put("writing", mainMapper.writingQry(selectType, startDate, endDate, inHospital, hospitalId, hospitalList));
        json.put("completed", mainMapper.completedQry(selectType, startDate, endDate, inHospital, hospitalId, hospitalList));
        json.put("reviewPass", mainMapper.reviewPassQry(selectType, startDate, endDate, inHospital, hospitalId, hospitalList));
        json.put("reviewReject", mainMapper.reviewRejectQry(selectType, startDate, endDate, inHospital, hospitalId, hospitalList));
        json.put("gestationalAgeL26", mainMapper.gestationalAgeL26Qry(selectType, startDate, endDate, inHospital, hospitalId, hospitalList));
        json.put("gestationalAge26To27", mainMapper.gestationalAge26To27Qry(selectType, startDate, endDate, inHospital, hospitalId, hospitalList));
        json.put("gestationalAge28To31", mainMapper.gestationalAge28To31Qry(selectType, startDate, endDate, inHospital, hospitalId, hospitalList));
        json.put("gestationalAge32To33", mainMapper.gestationalAge32To33Qry(selectType, startDate, endDate, inHospital, hospitalId, hospitalList));
        json.put("gestationalAge34To36", mainMapper.gestationalAge34To36Qry(selectType, startDate, endDate, inHospital, hospitalId, hospitalList));
        json.put("gestationalAgeHE37", mainMapper.gestationalAgeHE37Qry(selectType, startDate, endDate, inHospital, hospitalId, hospitalList));
        json.put("birthWeightL750", mainMapper.birthWeightL750Qry(selectType, startDate, endDate, inHospital, hospitalId, hospitalList));
        json.put("birthWeight750To999", mainMapper.birthWeight750To999Qry(selectType, startDate, endDate, inHospital, hospitalId, hospitalList));
        json.put("birthWeight1000To1249", mainMapper.birthWeight1000To1249Qry(selectType, startDate, endDate, inHospital, hospitalId, hospitalList));
        json.put("birthWeight1250To1499", mainMapper.birthWeight1250To1499Qry(selectType, startDate, endDate, inHospital, hospitalId, hospitalList));
        json.put("birthWeight1500To2499", mainMapper.birthWeight1500To2449Qry(selectType, startDate, endDate, inHospital, hospitalId, hospitalList));
        json.put("birthWeightHE2500", mainMapper.birthWeightHE2500Qry(selectType, startDate, endDate, inHospital, hospitalId, hospitalList));
        json.put("complicationBPD", mainMapper.complicationBPDQry(selectType, startDate, endDate, inHospital, hospitalId, hospitalList));
        json.put("complicationNEC", mainMapper.complicationNECQry(selectType, startDate, endDate, inHospital, hospitalId, hospitalList));
        json.put("complicationROP", mainMapper.complicationROPQry(selectType, startDate, endDate, inHospital, hospitalId, hospitalList));
        json.put("complicationIVH", mainMapper.complicationIVHQry(selectType, startDate, endDate, inHospital, hospitalId, hospitalList));
        json.put("complicationPVL", mainMapper.complicationPVLQry(selectType, startDate, endDate, inHospital, hospitalId, hospitalList));
        json.put("complicationRDS", mainMapper.complicationRDSQry(selectType, startDate, endDate, inHospital, hospitalId, hospitalList));
        json.put("complicationEOS", mainMapper.complicationEOSQry(selectType, startDate, endDate, inHospital, hospitalId, hospitalList));
        json.put("complicationLOS", mainMapper.complicationLOSQry(selectType, startDate, endDate, inHospital, hospitalId, hospitalList));
        json.put("prognosisCured", mainMapper.prognosisCuredQry(selectType, startDate, endDate, inHospital, hospitalId, hospitalList));
        json.put("prognosisDeathInHospital", mainMapper.prognosisDeathInHospitalQry(selectType, startDate, endDate, inHospital, hospitalId, hospitalList));
        json.put("prognosisGiveUpDeath", mainMapper.prognosisGiveUpDeathQry(selectType, startDate, endDate, inHospital, hospitalId, hospitalList));
        json.put("prognosisIneffectiveTreatment", mainMapper.prognosisIneffectiveTreatmentQry(selectType, startDate, endDate, inHospital, hospitalId, hospitalList));
        json.put("prognosisTransfer", mainMapper.prognosisTransferQry(selectType, startDate, endDate, inHospital, hospitalId, hospitalList));
        json.put("code", 1);
        return json.toJSONString();
    }

    @Override
    public String uploadImg(MultipartFile file) {
        JSONObject json = new JSONObject();
        json.put("errno", 1);
        if(!file.isEmpty()){
            String fileName = file.getOriginalFilename();
            String suffixName = fileName.substring(fileName.lastIndexOf(".")); // 后缀名
            fileName = UUID.randomUUID() + suffixName; // 图片名

            String dirPath =  feedbackImagesPath + fileName;
            File dest = new File(dirPath);
            if (!dest.getParentFile().exists()) {
                dest.getParentFile().mkdirs();
            }
            JSONArray dataArray = new JSONArray();
            JSONObject dataJson = new JSONObject();
            try {
                file.transferTo(dest);
                String url = feedbackImagesUrl + fileName;
                json.put("errno", 0);
                dataJson.put("url", url);
                dataArray.add(dataJson);
                json.put("data", dataArray);
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
        return json.toJSONString();
    }

    @Override
    public String saveFeedback(Feedback feedback, User user) {
        JSONObject json = new JSONObject();
        json.put("code", 0);
        feedback.setUid(user.getUid());
        feedback.setHid(String.valueOf(user.getHospitalId()));
        if (mainMapper.feedbackInsert(feedback) > 0) {
            json.put("code", 1);
        }
        return json.toJSONString();
    }

    @Override
    public List<Feedback> getFeedback(int uid) {
        return mainMapper.feedbackQry(uid);
    }

    @Override
    public List<Feedback> getFeedbackReply(int fid) {
        return mainMapper.feedbackReplyQry(fid);
    }
}
