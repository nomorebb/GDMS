<template>
  <div class="evaluation-card">
    <div class="teacher-wrapper paper">
      <div class="teacher-info">
        <span class="name">{{name}}</span>
        <span class="grade">{{grade}}</span>
      </div>
      <div class="grade-content">
        <mu-slider v-model="grade" :step="1" class="grade-slider" />
        <mu-text-field hintText="评语" v-model="evaMsg" multiLine type="text" icon="thumb_up"/><br/>
         <mu-raised-button @click="commitGrade" secondary label="提交评价">
           <wyvonj-tooltip>{{msg}}</wyvonj-tooltip>
         </mu-raised-button>
      </div>
      <ul @click="handleClick">
        <li>11111111</li>
        <li>222222</li>
        <li>333333</li>
        <li>4444444</li>
        <li>555555</li>
      </ul>
    </div>
  </div>
</template>


<script>
import { mapActions } from 'vuex'
export default {
  data() {
      return {
        grade: 100,
        name: '导师',
        isOpenForEva: false,
        evaMsg:'',
        msg:'现在还不能评分'
      }
    },
    methods: {
      commitGrade() {
        let id = _c.getCookie('user')
        if (!id)
          {
            alert('登录超时，请重新登录后操作')
            this.$router.push('/')
          } 
        this.stuEvaluationToTch({
          studentId: id,
          grade: this.grade,
          content:this.evaMsg
        })
      },
      handleClick($event){
        lg($event)
      },
      ...mapActions(['stuEvaluationToTch'])
    },
    mounted(){
      let id = cookie.get('user')
      this.POST('/student/stuSelectionResult',{studentId:id})
        .then((res)=>{
          if(res.data.state === 1){
            this.isOpenForEva=false
            this.msg=''
            this.name=res.data.name
          }
        })
    }
}

</script>

<style lang="sass" stylesheet="scss" scoped>
@import '../../style/variables.scss';
.wyvonj-tooltip{
  background-color: rgba(0,0,0,.6);
  color: white;
}
.evaluation-card
{
    .teacher-wrapper{
        border-radius: 3px;
        width: 480px;
    }
    .teacher-info
    {
        position: relative;

        padding: 16px;
        height: 32px;
        .name
        {
            float: left;
            font-size: 24px;
        }
        .grade
        {
            font-size: 24px;
            float: right;
        }
    }
    .grade-content
    {
        padding: 8px 16px;
        .grade-slider
        {
            margin-top: 16px;
        }
        .red span{
            position: relative;
            top: 4px;
        }
    }
}
.mu-text-field{
  width: 420px;
}
	
</style>