webpackJsonp([7],{"2WVf":function(t,i,a){"use strict";var e=a("XLwt"),n=a.n(e),r={data:function(){return{chart:{},legendData:[],todoData:[],doingData:[],doneData:[]}},computed:{curSprint:function(){return this.$store.state.sprint.curSprint},backlogList:function(){return this.$store.state.sprint.backlogList}},methods:{initParam:function(){this.onresizeDraw()},initData:function(){this.curSprint.id&&(this.countType(),this.drawChart())},onresizeDraw:function(){var t=this;window.onresize=function(){t.refresh()}},refresh:function(){try{this.chart.dispose()}catch(t){}try{this.initData()}catch(t){}},countType:function(){this.legendData=[],this.todoData=[],this.doingData=[],this.doneData=[];for(var t=[],i=[],a=[],e=[],n={},r=0,s=this.backlogList.length;r<s;r++)for(var o=0,c=(e=this.backlogList[r].tasks).length;o<c;o++)t[(n=e[o]).type]>=0?n.startDate?n.startDate&&!n.endDate?i[n.type]+=n.estimate:a[n.type]+=n.estimate:t[n.type]+=n.estimate:(t[n.type]=0,i[n.type]=0,a[n.type]=0,n.startDate?n.startDate&&!n.endDate?i[n.type]=n.estimate:a[n.type]=n.estimate:t[n.type]=n.estimate);for(var u in t)this.legendData.push(u),this.todoData.push(t[u]),this.doingData.push(i[u]),this.doneData.push(a[u])},drawChart:function(){this.chart=n.a.init(document.getElementById("task-type-pie")),this.chart.setOption({tooltip:{trigger:"axis",axisPointer:{type:"shadow"}},legend:{data:["待认领","进行中","已完成"],right:10},grid:{top:40,left:0,right:10,bottom:0,containLabel:!0},xAxis:[{type:"category",data:this.legendData}],yAxis:[{type:"value"}],series:[{name:"待认领",type:"bar",stack:"1",data:this.todoData},{name:"进行中",type:"bar",stack:"1",data:this.doingData},{name:"已完成",type:"bar",stack:"1",data:this.doneData}]})}}},s={render:function(){var t=this.$createElement,i=this._self._c||t;return i("el-row",{staticStyle:{height:"100%",width:"100%"}},[i("el-col",{staticStyle:{height:"100%"},attrs:{span:24}},[i("div",{attrs:{id:"task-type-pie"}})])],1)},staticRenderFns:[]};var o=a("VU/8")(r,s,!1,function(t){a("6Jkr")},"data-v-777fd434",null);i.a=o.exports},"6Jkr":function(t,i){},E5a8:function(t,i,a){"use strict";var e=a("XLwt"),n=a.n(e),r={data:function(){return{dateList:[],taskRateList:[],sprintRateList:[],rateOfDay:0,chart:{}}},computed:{curSprint:function(){return this.$store.state.sprint.curSprint},backlogList:function(){return this.$store.state.sprint.backlogList}},methods:{initParam:function(){this.onresizeDraw()},initData:function(){this.curSprint.id&&(this.calcRateOfDay(),this.calcDateAndTime(),this.drawChart())},onresizeDraw:function(){var t=this;window.onresize=function(){t.refresh()}},refresh:function(){try{this.chart.dispose()}catch(t){}try{this.initData()}catch(t){}},calcDateAndTime:function(){this.sprintRateList=[],this.taskRateList=[],this.dateList=[],this.rateList=[];for(var t=new Date(this.curSprint.startDate),i=(new Date(this.curSprint.publishDate).getTime()-t.getTime())/1e3/60/60/24,a=[t.getFullYear(),t.getMonth(),t.getDate()],e=a[0],n=a[1],r=a[2],s=void 0,o=0;o<=i;o++)if(0!==(s=new Date(e,n,r+o)).getDay()){this.dateList.push(s.getDate());var c=0,u=0,h=void 0,d=void 0,l=void 0;if((new Date).getTime()-s.getTime()>0){for(var f=0,p=this.backlogList.length;f<p;f++){for(var g=0,D=(h=(l=this.backlogList[f]).tasks).length;g<D;g++)d=h[g],new Date(d.endDate).getMonth()===s.getMonth()&&new Date(d.endDate).getDate()===s.getDate()&&(u+=d.estimate);new Date(l.endTestDate).getMonth()===s.getMonth()&&new Date(l.endTestDate).getDate()===s.getDate()&&(c+=d.estimate)}this.taskRateList.push((u/this.rateOfDay).toFixed(1)),this.sprintRateList.push((c/this.rateOfDay).toFixed(1))}}},calcRateOfDay:function(){this.rateOfDay=0;for(var t=this.curSprint.teams,i=0,a=0,e=t.length;a<e;a++)i+=t[a].rate||1;this.rateOfDay=i},drawChart:function(){this.chart=n.a.init(document.getElementById("team-rate-chart")),this.chart.setOption({legend:{data:["任务生产率","故事生产率"],right:"4%"},grid:{top:40,left:0,right:10,bottom:0,containLabel:!0},tooltip:{trigger:"axis",axisPointer:{type:"shadow"}},xAxis:{type:"category",boundaryGap:!1,data:this.dateList},yAxis:[{type:"value"}],series:[{name:"任务生产率",type:"line",label:{normal:{show:!0,position:"top",formatter:"{c}",color:"black"}},data:this.taskRateList},{name:"故事生产率",type:"line",label:{normal:{show:!0,position:"top",formatter:"{c}",color:"black"}},data:this.sprintRateList}]})}}},s={render:function(){var t=this.$createElement;return(this._self._c||t)("div",{attrs:{id:"team-rate-chart"}})},staticRenderFns:[]};var o=a("VU/8")(r,s,!1,function(t){a("SutS")},"data-v-bac39264",null);i.a=o.exports},F4v2:function(t,i){},"O+cz":function(t,i){},QGcI:function(t,i){},SutS:function(t,i){},aoOt:function(t,i){},cHCn:function(t,i,a){"use strict";var e=a("XLwt"),n=a.n(e),r={data:function(){return{chart:{},dateList:[],planDataList:[],actualDataList:[],testDataList:[],totalTime:0,rateOfDay:0}},computed:{curSprint:function(){return this.$store.state.sprint.curSprint},backlogList:function(){return this.$store.state.sprint.backlogList}},methods:{initParam:function(){this.onresizeDraw()},initData:function(){this.curSprint.id&&(this.calcTotalTime(),this.calcRateOfDay(),this.calcDateAndTime(),this.drawChart())},onresizeDraw:function(){var t=this;window.onresize=function(){t.refresh()}},refresh:function(){try{this.chart.dispose()}catch(t){}try{this.initData()}catch(t){}},calcTotalTime:function(){var t=this;this.totalTime=0,this.backlogList.forEach(function(i){t.totalTime+=i.estimate})},calcDateAndTime:function(){this.dateList=[],this.planDataList=[],this.actualDataList=[],this.testDataList=[];for(var t=new Date(this.curSprint.startDate),i=(new Date(this.curSprint.publishDate).getTime()-t.getTime())/1e3/60/60/24,a=[t.getFullYear(),t.getMonth(),t.getDate()],e=a[0],n=a[1],r=a[2],s=0,o=1,c=0,u=0,h=void 0,d=0;d<=i;d++)if(0!==(h=new Date(e,n,r+d)).getDay()){this.dateList.push(h.getDate()),o>0&&(6!==h.getDay()&&(s+=this.rateOfDay),(o=this.totalTime-s)<0&&(o=0),this.planDataList.push(o.toFixed(1)));var l=0,f=0,p=void 0,g=void 0,D=void 0;if((new Date).getTime()-h.getTime()>0){l=0;for(var m=0,v=this.backlogList.length;m<v;m++){for(var b=0,w=(p=(D=this.backlogList[m]).tasks).length;b<w;b++)g=p[b],new Date(g.endDate).getMonth()===h.getMonth()&&new Date(g.endDate).getDate()===h.getDate()&&(l+=g.estimate);new Date(D.endTestDate).getMonth()===h.getMonth()&&new Date(D.endTestDate).getDate()===h.getDate()&&(f+=D.estimate)}c+=l,u+=f,this.actualDataList.push((this.totalTime-c).toFixed(1)),this.testDataList.push((this.totalTime-u).toFixed(1))}}},calcRateOfDay:function(){for(var t=this.curSprint.teams,i=0,a=0,e=t.length;a<e;a++)i+=t[a].rate||1;this.rateOfDay=i},drawChart:function(){this.chart=n.a.init(document.getElementById("burn-down-chart")),this.chart.setOption({legend:{data:["标准","实际","测试"],right:10},grid:{top:40,left:0,right:10,bottom:0,containLabel:!0},tooltip:{trigger:"axis",axisPointer:{type:"shadow"}},xAxis:{type:"category",boundaryGap:!1,data:this.dateList},yAxis:[{type:"value",max:this.totalTime}],series:[{name:"标准",type:"line",label:{normal:{show:!0,position:"top",formatter:"{c}",color:"black"}},data:this.planDataList},{name:"实际",type:"line",label:{normal:{show:!0,position:"top",formatter:"{c}",color:"black"}},data:this.actualDataList},{name:"测试",type:"line",label:{normal:{show:!0,position:"top",formatter:"{c}",color:"black"}},data:this.testDataList}]})}}},s={render:function(){var t=this.$createElement;return(this._self._c||t)("div",{attrs:{id:"burn-down-chart"}})},staticRenderFns:[]};var o=a("VU/8")(r,s,!1,function(t){a("QGcI")},"data-v-28d754e0",null);i.a=o.exports},fZoa:function(t,i){},kXgn:function(t,i){},"lu+i":function(t,i){},malJ:function(t,i,a){"use strict";Object.defineProperty(i,"__esModule",{value:!0});var e=a("Dd8w"),n=a.n(e),r=a("NYxO"),s={data:function(){return{bugCount:0,taskCount:0,uiTaskCount:0,testBacklogCount:0}},methods:n()({initData:function(){this.findBugCount(),this.findTaskCount()},findBugCount:function(){var t=this,i={curUserId:this.user.email,state:{$ne:5}};this.$dataService.findCount("bugs",i).then(function(i){t.bugCount=i})},findTaskCount:function(){var t=this,i={"tasks.userId":this.user.email,state:{$ne:3}};this.$dataService.find(this.$apiUrl.BASE_FIND+"backlogs",i).then(function(i){i&&i.length>0&&i.forEach(function(i){i.tasks.forEach(function(i){i.endDate||i.userId!==t.user.email||(t.taskCount=t.taskCount+1)})})})},findUiTaskCount:function(){var t=this,i={uiUserId:this.user.email,state:{$in:[1,2]}};this.$dataService.findCount("backlogs",i).then(function(i){t.uiTaskCount=i})},findTestCount:function(){var t=this,i={testUserId:this.user.email,endTestDate:{$exists:!1}};this.$dataService.findCount("backlogs",i).then(function(i){t.testBacklogCount=i})},onLink:function(t){this.setCurMenu(t),this.$router.push({path:t})}},Object(r.d)(["setCurMenu"]))},o={render:function(){var t=this,i=t.$createElement,a=t._self._c||i;return a("div",{staticClass:"todo-board"},[t.bugCount?a("span",{on:{click:function(i){t.onLink("/todo/list")}}},[t._v("\n    待办缺陷（"),a("b",[t._v(t._s(t.bugCount))]),t._v("）\n  ")]):t._e(),t._v(" "),t.taskCount?a("span",{on:{click:function(i){t.onLink("/sprint/board")}}},[t._v("\n    待办任务（"),a("b",[t._v(t._s(t.taskCount))]),t._v("）\n  ")]):t._e(),t._v(" "),t.uiTaskCount?a("span",{on:{click:function(i){t.onLink("/product/backlog")}}},[t._v("\n    设计任务（"),a("b",[t._v(t._s(t.uiTaskCount))]),t._v("）\n  ")]):t._e(),t._v(" "),t.testBacklogCount?a("span",{on:{click:function(i){t.onLink("/sprint/board")}}},[t._v("\n    测试任务（"),a("b",[t._v(t._s(t.testBacklogCount))]),t._v("）\n  ")]):t._e()])},staticRenderFns:[]};var c=a("VU/8")(s,o,!1,function(t){a("kXgn")},"data-v-f793838c",null).exports,u={data:function(){return{}},components:{sprintBurndown:a("cHCn").a},computed:{curSprint:function(){return this.$store.state.sprint.curSprint}},watch:{curSprint:function(){this.$refs.burnDownChart.refresh()}}},h={render:function(){var t=this.$createElement,i=this._self._c||t;return i("ew-card",{staticStyle:{height:"350px"},attrs:{title:"项目状态"}},[i("sprint-burndown",{ref:"burnDownChart"})],1)},staticRenderFns:[]};var d=a("VU/8")(u,h,!1,function(t){a("F4v2")},"data-v-4a8f3b0b",null).exports,l={components:{teamRateChart:a("E5a8").a},computed:{curSprint:function(){return this.$store.state.sprint.curSprint}},watch:{curSprint:function(){this.$refs.teamRateChart.refresh()}},methods:{}},f={render:function(){var t=this.$createElement,i=this._self._c||t;return i("ew-card",{staticStyle:{height:"350px"},attrs:{title:"团队效率"}},[i("team-rate-chart",{ref:"teamRateChart"})],1)},staticRenderFns:[]};var p=a("VU/8")(l,f,!1,function(t){a("aoOt")},"data-v-24c8344e",null).exports,g={data:function(){return{}},components:{sprintBugChart:a("wlg0").a},computed:{curSprint:function(){return this.$store.state.sprint.curSprint}},watch:{curSprint:function(){this.$refs.bugChart.refresh()}}},D={render:function(){var t=this.$createElement,i=this._self._c||t;return i("ew-card",{staticClass:"margin-top-10",staticStyle:{height:"300px"},attrs:{title:"缺陷趋势"}},[i("sprint-bug-chart",{ref:"bugChart"})],1)},staticRenderFns:[]};var m=a("VU/8")(g,D,!1,function(t){a("uE9o")},"data-v-71778246",null).exports,v={data:function(){return{}},components:{sprintTaskAnalyse:a("2WVf").a},computed:{curSprint:function(){return this.$store.state.sprint.curSprint}},watch:{curSprint:function(){this.$refs.taskAnalyse.refresh()}}},b={render:function(){var t=this.$createElement,i=this._self._c||t;return i("ew-card",{staticClass:"margin-top-10",staticStyle:{height:"300px"},attrs:{title:"任务统计"}},[i("sprint-task-analyse",{ref:"taskAnalyse"})],1)},staticRenderFns:[]};var w={data:function(){return{curSprint:{},sprintList:[]}},computed:{userList:function(){return this.$store.state.userList}},components:{todoBoard:c,sprintBoard:d,teamRateBoard:p,sprintBugBoard:m,sprintTaskBoard:a("VU/8")(v,b,!1,function(t){a("lu+i")},"data-v-6943d96d",null).exports},watch:{curSprint:function(){this.switchSprint(this.curSprint)}},methods:n()({initData:function(){this.findCurSprint()},findCurSprint:function(){var t=this,i={state:{$in:[1,2]},orgId:this.user.orgId||-1};this.$dataService.find(this.$apiUrl.BASE_FIND+"sprints",i).then(function(i){t.sprintList=i,t.sprintList.length>0&&(t.curSprint=t.sprintList[0])})}},Object(r.b)(["switchSprint"]))},y={render:function(){var t=this,i=t.$createElement,a=t._self._c||i;return a("panel",[a("div",{staticClass:"personal-board"},[a("div",{staticClass:"personal-board-toolbar"},[a("todo-board",{staticClass:"todo-board"}),t._v(" "),a("radio-group",{staticClass:"sprint-radio-group",attrs:{list:t.sprintList},model:{value:t.curSprint,callback:function(i){t.curSprint=i},expression:"curSprint"}})],1),t._v(" "),a("el-row",{attrs:{gutter:10}},[a("el-col",{attrs:{span:12}},[a("sprint-board")],1),t._v(" "),a("el-col",{attrs:{span:12}},[a("team-rate-board")],1),t._v(" "),a("el-col",{attrs:{span:8}},[a("sprint-task-board")],1),t._v(" "),a("el-col",{attrs:{span:16}},[a("sprint-bug-board")],1)],1)],1)])},staticRenderFns:[]};var k=a("VU/8")(w,y,!1,function(t){a("O+cz")},"data-v-6e105258",null);i.default=k.exports},uE9o:function(t,i){},wlg0:function(t,i,a){"use strict";var e=a("//Fk"),n=a.n(e),r=a("XLwt"),s=a.n(r),o={data:function(){return{bugOrbit:[],dates:[],newData:[],leaveData:[]}},computed:{curSprint:function(){return this.$store.state.sprint.curSprint}},methods:{initParam:function(){this.onresizeDraw()},initData:function(){var t=this;this.curSprint.id&&this.fingBugList().then(function(){return t.fintBugOrbit()}).then(function(i){t.bugOrbit=i,t.setBugOrbit(),t.calcData(),t.drawChart()})},onresizeDraw:function(){var t=this;window.onresize=function(){t.refresh()}},refresh:function(){try{this.chart.dispose()}catch(t){}try{this.initData()}catch(t){}},findCurSprint:function(){var t=this;return this.findCondition={id:this.curSprintId},new n.a(function(i,a){t.findDataByCondition("sprints").then(function(a){a&&1===a.length&&(t.curSprint=a[0],i())})})},fingBugList:function(){return this.findCondition={productId:this.curSprint.productId,sprintId:this.curSprint.id},this.findDataByCondition("bugs")},fintBugOrbit:function(){var t={optTime:{$gte:this.curSprint.startDate,$lte:this.curSprint.publishDate}};return this.$dataService.find(this.$apiUrl.BASE_FIND+"bugOrbit",t)},setBugOrbit:function(){var t=this;this.dataList.forEach(function(i){i.orbit=t.bugOrbit.filter(function(t){return t.bugId===i.id})})},calcData:function(){this.dates=[],this.newData=[],this.leaveData=[];for(var t=new Date(this.curSprint.startDate),i=((new Date).getTime()-t.getTime())/1e3/60/60/24,a=[t.getFullYear(),t.getMonth(),t.getDate()],e=a[0],n=a[1],r=a[2],s=void 0,o=0;o<=i;o++)s=new Date(e,n,r+o),this.dates.push(this.$utils.formatDateTime(s,"MM-dd")),this.newData.push(this.findNewCount(s)),this.leaveData.push(this.findLeaveCount(s))},findNewCount:function(t){for(var i={},a=0,e=0,n=this.dataList.length;e<n;e++)i=this.dataList[e],this.$utils.eqDate(i.createTime,t)&&(a+=1);return a},findLeaveCount:function(t){for(var i={},a=0,e=0,n=this.dataList.length;e<n;e++)i=this.dataList[e],this.$utils.lteDate(i.createTime,t)&&(5!==i.state?a+=1:this.$utils.ltDate(t,i.orbit[i.orbit.length-1].optTime)&&(a+=1));return a},drawChart:function(){this.chart=s.a.init(document.getElementById("sprint-bug-chart")),this.chart.setOption({tooltip:{trigger:"axis"},legend:{data:["新增","遗留"],right:"4%"},grid:{top:40,left:0,right:10,bottom:0,containLabel:!0},xAxis:{type:"category",boundaryGap:!1,data:this.dates},yAxis:{type:"value"},series:[{name:"新增",type:"line",stack:"总量",data:this.newData},{name:"遗留",type:"line",stack:"总量",data:this.leaveData}]})}}},c={render:function(){var t=this.$createElement;return(this._self._c||t)("div",{attrs:{id:"sprint-bug-chart"}})},staticRenderFns:[]};var u=a("VU/8")(o,c,!1,function(t){a("fZoa")},"data-v-89bfcd6c",null);i.a=u.exports}});
//# sourceMappingURL=7.7d02a8ea8be2b5e81a8a.js.map