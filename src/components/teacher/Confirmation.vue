<template>
  <div class="confirmation-container">
     <div class="help paper" v-if="isHelp">
      <div class="help-title">帮助</div>
      <mu-icon-button icon="clear" @click="closeHelp" />
      <p class="help-content">
        每张卡片是您创建的选题
        <br/> 右边的圆点表示您设定能够选择的人数
        <br/> 红色代表女生 蓝色代表男生
        <br/> 一旦确认选择后无法更改</p>
      <mu-icon value="help" :size="36" />
    </div>
    <div class="teacher-status-card">
    <div class="grid">
      <figure class="single-card paper" v-for="(topic,index) in _tch_StudentInCard">
            <div class="card-title">
              {{topic._id}}. {{topic.title}}
              <mu-avatar class="no-selection" slot="right" backgroundColor="red500" :size="24">{{topic.available}}</mu-avatar>
            </div>
            <ul>
              <li v-for="(student,i) in topic.students" class="student-list">
                <student-card :student="student" @select="selectStudent(student,topic)" :isSelected="student.isselected"></student-card>
              </li>
            </ul>
        </figure>
    </div>
        
    </div>
    <mu-dialog :open="openDialog" title="确认选择" @close="closeDialog">
      你确定要选择{{currentStudent.name}}吗？
    <mu-flat-button slot="actions" @click="closeDialog" accent label="取消"/>
    <mu-flat-button slot="actions" secondary @click.native="finalConfirm" label="确定"/>
    </mu-dialog>

  </div>
</template>


<script>
import StudentCard from '../utils/StudentCard.vue'
import { mapActions, mapState ,mapMutations } from 'vuex'
export default {
  data() {
      return {
        isHelp: true,
        openDialog:false,
        currentStudent:{},
        currentTopic:{},
      }
    },
    computed: {
      ...mapState(['_tch_StudentInCard'])
    },
    methods: {
      selectStudent(student,topic){
        this.openDialog=true
        this.currentStudent=student
        this.currentTopic=topic
      },
      finalConfirm(){
        let tchId=cookie.get('user') 
        
        if (tchId) {
          let tchSelection = {
            teacherId:tchId,
            studentId: this.currentStudent._id, 
            topicId: this.currentTopic._id 
          }
          this.tchConfirmStudent(tchSelection)
          .then(()=>{
            this.showSnackbar('成功选择了'+this.currentStudent.name)
            this.TCH_SET_STU_SELECTED(this.currentStudent)
            this.openDialog = false
            this.currentTopic.count++
            if(this.currentTopic.count === this.currentTopic.available){
              this.TCH_DELETE_STUDENT(this.currentTopic)
            }
          })
        }
      },
      closeDialog(){
        this.openDialog=false
      },
      closeHelp() {
        this.isHelp = false
      },
      ...mapActions(['tchConfirmStudent', 'tchGetTopics', 'showSnackbar']),
      ...mapMutations(['TCH_SET_STU_SELECTED','TCH_DELETE_STUDENT'])
    },
    created() {
        this.tchGetTopics({ teacherId: cookie.get('user') })
        _.forEach(this._tch_StudentInCard,(topic)=>{
          topic.count = 0
        })
    },
    components: {
      StudentCard
    }
}


</script>

<style lang="sass" rel="stylesheet/scss">
@import '../../style/variables.scss';

.help
{
    position: relative;

    display: inline-block;
    .help-title
    {
        font-size: 20px;

        padding: 8px;

        color: #fff;
        background-color: $teal;
    }
    .help-content
    {
        padding: 8px;
    }
    .mu-icon-button
    {
        position: absolute;
        top: -8px;
        right: -8px;

        color: #fff;
    }
    > .mu-icon
    {
        position: absolute;
        right: 0;
        bottom: 0;

        color: rgba(0,0,0,.12);
    }
}
.teacher-status-card
{
    margin: 8px 0;

    transition: $material-enter;
    .student-list
    {
        margin: 0;
    }
    .grid
    {
        display: flex;

        flex-wrap: wrap;
        align-content: space-between;
        align-items: flex-start;
    }
    .single-card
    {
        z-index: 200;

        margin: 12px;

        flex: 0 0 25%;
        .card-title
        {
            font-size: 16px;

            position: relative;

            min-width: 496px;
            padding: 8px 10px;

            color: white;
            border-top-left-radius: 4px;
            border-top-right-radius: 4px;
            background-color: $teal;
            .mu-avatar
            {
                font-family: $fontCenturyGothic;

                position: absolute;
                top: -12px;
                right: -12px;
            }
        }
    }
}

</style>