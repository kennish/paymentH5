<template>
    <div class="body">
        <div class="flow">
            <div>
                <img class="topImg" src="../assets/img/SignStep1_on@3x.png" />
                <span style="color: #FE6138;">完善信息</span>
            </div>
            <span class="line line1"></span>
            <div>
                <img class="topImg" src="../assets/img/SignStep2_on@3x.png" />
                <span  style="color: #FE6138;">租赁合同</span>
            </div>
            <span class="line lineHalf"></span>
            <div>
                <img class="topImg" src="../assets/img/SignStep3_off@2x.png" />
                <span style="color: #C0C0C0;">电子签约</span>
            </div>
        </div>
        <section class="main">
            <h2 style="text-align:center">房 屋 租 赁 合 同</h2>
            <p class="bold black">出租方：<span name="landlordHouse_companyName">{{data.landlordHouse.companyName}}</span> (以下简称甲方)</p>
            <p class="bold black">地址：<span name="landlordHouse_companyAddress">{{data.landlordDetail.companyAddress}}</span>
            <p class="bold black">承租方： <span name="tenantsInfo_name">{{data.tenantsInfo.name}}</span> (以下简称乙方)</p>
            <p class="bold black"> 证件号码： <span name="tenantsInfo_idCard">{{data.tenantsInfo.idCard}}</span> </p>
            <p class="bold black"> 地址：<span name="tenantsInfo_address">{{data.tenantsInfo.address}}</span> </p>
            <p class="bold black"> 电话：<span name="tenantsInfo_mobile">{{data.tenantsInfo.mobile}}</span> </p>
            <p> 甲乙双方根据中华人民共和国法律和上海市有关法规，就租赁『<span name="tenantsInfo_address">{{houseAddress}}</span> 』房屋事宜，经双方协商一致订立租赁合同如下：</p>
            <p class="bold black little-large">第一条：出租物业 </p>
            <p> 1.名称：『 <span name="tenantsInfo_areaname">{{data.landlordHouse.areaName}}</span> 』(以下简称该物业)</p>
            <p>2.地址： <span name="tenantsInfo_fulladdress">{{houseAddress}}</span></p>
            <p class="bold black little-large"> 第二条：租赁部位及面积</p>
            <p>甲方将该物业在完全装修且良好状态下出租给乙方。 </p>
            <p class="bold black little-large"> 第三条：租赁目的</p>
            <p> 3.1乙方向甲方承诺，租赁该房屋作为 居住 使用，并遵守国家和本市有关房屋使用和物业管理的规定。</p>
            <p> 3.2 乙方保证：在租赁期内未征得甲方书面同意以及按规定须经有关部门审批核准前，不擅自改变上款约定的使用用途，不得群租，不得作为商用，否则将视为违约赔偿两个月的租金为违约金。</p>
            <p class="bold black little-large">第四条：租赁期限 </p>
            <p> 1. 租赁期 24 个月 自<span name="leaseTime">{{leaseTime}}</span></p>
            <p>固定期自 <span name="fixationTime">{{fixationTime}}</span></p>
            <p>非固定期自 <span name="noFixationTime">{{noFixationTime}}</span></p>
            <p>非固定期内，甲方可以提前 1 个月书面通知对方解除合同，租金支付至合同解除日。双方最早可于固定期的最后一个月起提供书面退租通知，并最早可于固定期到期日（即第12个月底）解除合同。 </p>
            <p>该情况下甲方应将押金不计利息全额退还。 </p>
            <p>2.乙方须在起租前10天与甲方签署此合同，供甲方安排家具及配套事宜，如由于不足10天所引起的配套问题，甲方概不负责。 </p>
            <p> 3.租赁期满，甲方有权收回全部出租房屋，乙方应如期或提前交还；乙方若要求续租或退租该房屋，须在本合同期满前一个月向甲方提出书面申请，经双方洽商并同意新租约条件后重新签订租赁合同或续租合同。</p>
            <p class="bold black little-large"> 第五条：租金与费用</p>
            <p>1租金与支付 </p>
            <p>1.1 自<span name="leaseTime">{{leaseTime}}</span>止，每月人民币 <span name="rent">{{data.rent}}</span>元</p>
            <p>1.2 乙方支付租金的支付方式为{{data.rentPayTypeStr}}, 乙方应当于每月{{data.payDay}}日前向甲方支付房租. </p>
            <p>2所有的租金税费、物业管理费、有线电视安装及收视费不包括在房屋租金内。甲方应提供正式财税发票给乙方。</p>
            <p>3甲方提供的第三方房屋增值服务平台为【盈家生活】及对应提供的APP、400电话和相关其指定的服务页面。</p>
            <p>4其他费用：</p>
            <p>4.1 乙方在租赁期间所用水、电、煤气、电话 等费用，按账单由乙方支付(如有)。 </p>
            <p> 租赁场所内的清洁工作，由乙方负责。</p>
            <p>5租房押金</p>
            <p>5.1 签订本合同时，乙方向甲方交付人民币 <span name="deposit">{{data.deposit}}</span>元 作押金 。</p>
            <p>5.2 押金不计利息，租赁期满并结清所有费用后，以人民币币种金额形式退还至乙方提供的指定银行账号。</p>
            <p>5.3 乙方如逾期未付租金或未按本合同规定支付费用时，甲方可先将押金的一部分(相当于逾期未付之费用)扣除后通知乙方，并保留索赔权。</p>
            <p>5.4 押金扣除被没收部分后，乙方应在收到甲方通知后7天内，补足其被没收部分的押金。</p>
            <p>5.5 本合同终止时，乙方须将租赁场所全部归还甲方。乙方在清偿应承担的一切费用后，甲方于一个月内把押金退还给乙方指定的银行账户。</p>
            <p>5.6 乙方的所有应缴租金与费用都必须以乙方的名义付款。租金支付到甲方指定帐户。</p>
            <p>5.7 乙方未按照合同前述约定的日期向甲方支付租金的，甲方有权对乙方租赁的该房屋采取以下措施：<br />
                (1)逾期24小时后仍未支付租金的，甲方有权切断对乙方租赁的该房屋的电力供应；<br />
                (2)逾期48小时后仍未支付租金的，甲方有权封锁乙方租赁的该房屋的房门；<br />
                (3)逾期72小时后仍未支付租金的，甲方有权直接通知乙方解除本合同并清退乙方、办理结算手续，由此产生的一切损失和责任由乙方负责。<br />
                乙方在上述（1）、（2）情形发生的24小时内支付相应租金的，甲方将在收到租金后24小时内会及时恢复该房屋供电或解锁门锁等，乙方可继续正常使用该房屋。
            </p>
            <p class="bold black little-large">第六条：甲方的权利和义务</p>
            <p>1.租赁期内甲方不得无故收回该物业。</p>
            <p>2.甲方定期对房屋设备进行维修保养。</p>
            <p>3.甲方应做好房屋的安全管理工作。</p>
            <p>4.甲方由于房屋的保养、维修、防盗防火、救护或其他管理上的需要，须进入乙方场所检查时，应事先通知乙方，必要时可采取必要的措施。但遇到紧急情况，可告知乙方，乙方应予协助和支持。</p>
            <p>5.因自然灾害及不可抗力事件，或非甲方故意造成，或非甲方重大过失造成火灾、盗窃而引起的损害，甲方不负任何责任。</p>
            <p>6.乙方因被其它客户牵连而蒙受损失时，甲方不负任何责任。</p>
            <p class="bold black little-large">第七条：乙方的权力和义务</p>
            <p>1.乙方应按本合同各项规定缴付费用。</p>
            <p>2.乙方不能将租赁的房屋全部或部分转租给第三者或让第三者使用。</p>
            <p>3.乙方必须遵守
                &lt;管理公约&gt;。</p>
            <p>4.除房屋内已有的装饰和设施之外，乙方需重新装修时，必须事先报请有关部门批准，并得到甲方的书面同意后才可实施。租赁期满必须回复原状(合理损耗除外)并承担一切费用。经甲方验收合格后归还甲方。</p>
            <p>5.乙方有义务妥善使用所租赁房屋内的家具及电器，若因使用不当而造成损坏，乙方须照价赔偿。如乙方不支付，甲方有权扣除部分或全部押金并保留索赔权。</p>
            <p>6.乙方承诺放弃优先购买权。</p>
            <p class="bold black little-large">第八条：合同解除及索赔</p>
            <p>乙方如发生以下行为时，甲方在协商不成的情况下可通知乙方解除本合同，甲方除有权没收乙方的租房押金外，同时可封存所租赁房屋内的所有物品，并保留索赔权：</p>
            <p>1.租金及其他费用超过3个工作日以上未付。</p>
            <p>2.租赁场所的使用违反本合同第三条规定。</p>
            <p class="bold black little-large">第九条：协商解约</p>
            <p>1.在租赁期的固定期内，甲乙双方均不得解除本合同。若要解除，视为违约。如甲方违约，甲方将赔偿给乙方相当于租房押金的违约金。如乙方违约，乙方除付清解除合同时应付款项外，租房押金作为违约金。</p>
            <p>2.合同签订后，租赁期开始前由于乙方的原因解除合同，乙方须向甲方偿付相当于已缴纳租房押金额的违约金和其他补偿。</p>
            <p class="bold black little-large">第十条：不可抗力</p>
            <p>因自然灾害及不可抗力事件致使房屋的全部或一部分毁坏，导致乙方租赁场所不能正常使用时，甲方不负赔偿责任，但甲方应协同乙方共同处理善后事宜。</p>
            <p class="bold black little-large">第十一条：通知的义务</p>
            <p>1.甲、乙双方所发的通知均采用书面形式。</p>
            <p>2.乙方的联系方式若发生变更时，须及时直接书面通知甲方。</p>
            <p>3.双方理解相互配合的重要意义，在本合同到期前的一个月内，乙方理解并同意甲方在该租赁期间可以带看该套房屋，而且会尽力配合好甲方的工作。</p>
            <p class="bold black little-large">第十二条：租赁场所的归还</p>
            <p>1.合同终止时，乙方应将租赁场所属于乙方所有的一切物品(包括装修、各类设备)全部撤出，使租赁场所恢复原状，经甲方验收后归还甲方。</p>
            <p>2.租赁场所归还给甲方后，乙方若仍有物品遗留在租赁场所内，则视为乙方丢弃物品，甲方可自由处置。</p>
            <p>3.合同终止时，乙方如不能将租赁场所及时归还，甲方除没收乙方的租房押金外，乙方还必须赔偿甲方的所有直接和间接损失。</p>
            <p class="bold black little-large">第十三条：滞纳金</p>
            <p>乙方若未按合同规定支付各种费用，甲方有权委托第三方在规定期限后向乙方按日收取逾期费，逾期费用=月租金*逾期天数*0.05%。</p>
            <p class="bold black little-large">第十四条：违约事件</p>
            <p>乙方违约事件发生后，甲方无论收取租金或其他费用与否，都会追究乙方违约责任的权利，乙方未按合同规定付足租金或其他费用，甲方拥有对这些不足部分的支付的要求权，也有按本合同法律规定采取其他措施的权利。</p>
            <p class="bold black little-large">第十五条：陈述</p>
            <p>本合同是在甲、乙双方完全自愿基础上签订的，定约前所有的议案、约束，声明均无效。</p>
            <p class="bold black little-large">第十六条：争议的解决</p>
            <p>甲、乙双方在执行本合同的过程中发生争议时，由双方友好协商解决；协商不成，应向有管辖权的中华人民共和国法院提出诉讼。</p>
            <p class="bold black little-large">第十七条：法律依据</p>
            <p>本合同受中华人民共和国的法律管辖。</p>
            <p class="bold black little-large">第十八条：附件</p>
            <p>本合同附件、《家具及物品清单》与本合同具有同等法律效力，并作为本合同之附件。若附件与本合同有冲突，以附件为准。</p>
            <p class="bold black little-large">第十九条：未尽事宜</p>
            <p>未尽事宜，由甲、乙双方协商解决。所签订的补充协议与本合同具有同等法律效力，并作为本合同之附件。</p>
            <p class="bold black little-large">第二十条：效用</p>
            <p>本合同自甲、乙双方签订之日起生效，一式三份，甲乙双方及房屋管理委托方（如有）各执一份。</p>
            <p class="bold black little-large">第二十一条：文字</p>
            <p>本合同为中文、英文（如有）两种文本，如中、英文版发生冲突，以中文版为准。</p>
            <p class="bold black little-large">第二十二条：甲方指定收款方式</p>
            <p>公司名称：研耀（上海）信息科技有限公司</p>
            <p>公司账号开户行：03150120210001476</p>
            <p>开户行：南京银行上海静安支行一般户</p>
            <p class="bold black little-large">第二十三条：乙方联系方式</p>
            <p>联系电话：<span name="tenantsInfo_mobile">{{data.tenantsInfo.mobile}}</span> </p>
            <p>紧急联系人：<span name="tenantsInfo_contactName">{{data.tenantsInfo.contactName}}</span> </p>
            <p>紧急联系人关系：<span name="tenantsInfo_contactRelationship">{{data.tenantsInfo.contactRelationship}}</span></p>
            <p>2.退款指定银行账户：<span name="tenantsInfo_bankAccount">{{data.tenantsInfo.bankAccount}}</span> </p>
            <p>如果乙方上述信息有变更，应不少于30天内通知甲方。</p>
            <p>补充条款</p>
            <p name="supplement">{{data.supplement}}</p>
            <p>{{data.zengyidiscription}}</p>
        </section>
    </div>
</template>

<script>
export default {
  name: '',
  data () {
    return {
      
    }
  },
  props: {
    data: null
  },
  computed: {
    houseAddress: function () {
      return this.data.landlordHouse.roomProvince + this.data.landlordHouse.roomCity + this.data.landlordHouse.roomCounty + this.data.landlordHouse.roomAddress + this.data.landlordHouse.areaName + this.data.landlordHouse.roomCode
    },
    leaseTime: function () {
      return this.data.leaseStartTime.split(' ')[0].replace('-','年').replace('-','月')+'日 至 ' + this.data.leaseEndTime.split(' ')[0].replace('-','年').replace('-','月') + '日'
    },
    fixationTime: function () {
      var start = this.data.fixationStartTime;
      var end = this.data.fixationEndTime;
      if (start != '-') {
        start = this.data.fixationStartTime.split(' ')[0].replace('-','年').replace('-','月')+'日'
      }
      if (end != '-') {
        end = this.data.fixationEndTime.split(' ')[0].replace('-','年').replace('-','月')+'日'
      }
      return  start + ' 至 ' + end
    },
    noFixationTime: function () {
      var start = this.data.noFixationStartTime;
      var end = this.data.noFixationEndTime;
      if (start != '-') {
        start = this.data.noFixationStartTime.split(' ')[0].replace('-','年').replace('-','月')+'日'
      }
      if (end != '-') {
        end = this.data.noFixationEndTime.split(' ')[0].replace('-','年').replace('-','月')+'日'
      }
      return  start + ' 至 ' + end
    }
  }
}
</script>

<style scoped>
    .flow {
        margin-top: .21rem;
        display: flex;
        display: -webkit-flex;
        flex-flow: row;
        -webkit-flex-flow: row;
        width: 100%;
        height: 5.33rem;
        background-color: #fff;
        justify-content: space-around;
        -webkit-justify-content: space-around;
        align-items: center;
        -webkit-align-items: center;
    }
    .flow > div {
        width:2.2rem;
        text-align: center;
    }
    img {
        width:1.91rem;
        height:1.91rem;
    }
    img + span {
        font-size: .5rem;
    }
    .line {
        width:1.5rem;
        height:.33rem;
    }
    .line0 {
        background: url("../assets/img/SignLine0.png") no-repeat 100% 100%;
    }
    .lineHalf {
        background: url("../assets/img/SignLineHalf.png")no-repeat 100% 100%;
    }
    .line1 {
        background: url("../assets/img/SignLine1.png")no-repeat 100% 100%;
    }
    .body {
        flex:1;
        overflow: auto;
        -webkit-overflow-scrolling: touch;
    }
    h2 {
        font-size:.83rem;
    }
    .main {
        margin-top:.21rem;
        padding:.75rem;
        background-color: white;
    }
    .bold {
        font-weight: bold;
    }
    .black {
        color:#212121 !important;
    }
    .little-large {
        font-size: .625rem;
    }
    .main > * {
        font-size: .58rem;
        line-height: 1rem;
        color:#606060;
    }
    p > span {
        font-weight: normal;
    }
</style>
