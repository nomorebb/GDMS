export default {

	//类似于事件注册
	//设置用户
	SET_USER:(state,user)=>{
		state.user=user
	},
	SET_USERINFO:(state,userInfo)=>{
		state.userInfo=userInfo
	},
	SET_NOTIFICATION:(state,notification)=>{
		state.notification=notification
	},
	SHOW_SNACKBAR:(state,showSnackbar)=>{
		state.showSnackbar=showSnackbar
	},
	SET_SNACKBAR_CONTENT:(state,snackbarText)=>{
		state.snackbarText=snackbarText
	},
	//将课题表填充进总数组中
	SET_STU_TOPICS:(state,stuTopics)=>{
		state.topicsData=stuTopics
	},
	SET_STU_FINAL_TOPIC:(state,affirmativeTopic)=>{
		state.affirmativeTopic=affirmativeTopic
	},
	//将选好的课题放入cart中
	SET_TOPICS_IN_CART:(state,selectedInCart)=>{
		state.selectedInCart=selectedInCart
	},
	//老师创建选题
	TCH_CREATE_TOPIC:(state,createdTopic)=>{
		state.createdTopic=createdTopic
	},
	TCH_GET_CREATED_TOPICS:(state,createdTopics)=>{
		state.createdTopics=createdTopics
	},
	SET_TCH_TOPIC_CARD:(state,tchTopics)=>{
		state.cardData=tchTopics
	},
	SET_TCH_SELECTION_RESULT:(state,resultData)=>{
		state.resultData=resultData
	},
	//开始进度条显示
	LOADING_TOGGLE:(state,isLoading)=>{
		state.isLoading=isLoading
	}
}