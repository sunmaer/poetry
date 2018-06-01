<template>
  <el-row>
    <el-form :inline="true" :model="formInline" size="small" class="question__form">
      <el-form-item class="form__item">
        <el-input v-model="formInline.name" placeholder="题目名称"></el-input>
      </el-form-item>
      <el-form-item class="form__item">
        <el-button type="primary" @click="search()">查询</el-button>
        <el-button type="primary" @click="addDialogVisible = true">新增</el-button>
      </el-form-item>
    </el-form>

    <el-table
      ref="multipleTable"
      :data="tableData3.slice((currentPage-1)*pagesize,currentPage*pagesize)"
      :default-sort = "{prop: 'id'}"
      tooltip-effect="dark"
      style="width: 100%; border: 1px solid rgb(230, 235, 245); border-bottom: none;"
      header-row-style="color: #000000; background-color: #eef1f6;"
      @selection-change="handleSelectionChange">
      <el-table-column
        type="selection"
        width="50">
      </el-table-column>
      <el-table-column
        type="index"
        width="50">
      </el-table-column>
      <el-table-column
        prop="type"
        label="题目类型"
        width="100"
        :filters="[{ text: '选择题', value: '0' }, { text: '判断题', value: '1' }, { text: '欣赏题', value: '2' }]"
        :filter-method="filterTag"
        filter-placement="bottom-end">
        <template slot-scope="scope">
          <el-tag
            disable-transitions>{{scope.row.type == 0? '选择题':scope.row.type == 1? '判断题':'欣赏题'}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        prop="question"
        label="题目内容"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop="image"
        label="题目图片"
        width="120">
        <template slot-scope="scope" v-if="scope.row.type != 2 && scope.row.image">
          <el-popover trigger="hover" placement="top">
            <img :src="'//' + scope.row.image" alt="古诗配图" style="width: 150px;height: 150px">
            <div slot="reference" class="name-wrapper">
              <el-tag size="medium">查看图片</el-tag>
            </div>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column
        prop="option"
        label="题目选项"
        width="120">
        <template slot-scope="scope" v-if="scope.row.type != 1">
          <el-popover trigger="hover" placement="top">
            <p>A: {{scope.row.option[0]}} </p>
            <p>B: {{scope.row.option[1]}}</p>
            <p>C: {{scope.row.option[2]}}</p>
            <p>D: {{scope.row.option[3]}}</p>
            <div slot="reference" class="name-wrapper">
              <el-tag size="medium">查看选项</el-tag>
            </div>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column
        prop="answer"
        label="题目答案"
        width="100">
        <template slot-scope="scope">
          <span v-if="scope.row.type != 1">{{String.fromCharCode(parseInt(scope.row.answer)+64)}}</span>
          <span v-if="scope.row.type == 1">{{scope.row.answer == 0?'F':'T'}}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="150">
        <template slot-scope="scope">
          <el-button
            size="small"
            type="primary"
            @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button
            size="small"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-row class="question__footer">
      <el-pagination
        @size-change="handleSizeChange"
        background
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="pagesize"
        layout="total, sizes, prev, pager, next"
        :total="tableData3.length"
        class="question__page">
      </el-pagination>
    </el-row>

    <!-- 新增界面 -->
    <el-dialog
      title="添加题目"
      :visible.sync="addDialogVisible"
      width="50%">
      <el-form ref="form" :model="form" label-width="70px" label-position="right">
        <el-form-item label="题目类型">
          <el-select v-model="form.region" placeholder="请选择题目类型" @change="selectVal">
            <el-option label="选择题" value="choice"></el-option>
            <el-option label="判断题" value="judge"></el-option>
            <el-option label="欣赏题" value="admiring"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="题目内容">
          <el-input type="textarea" :autosize="{ minRows: 3}" v-model="form.desc"></el-input>
        </el-form-item>
        <el-form-item label="选项 A">
          <el-input v-model="form.order[0]" :disabled="form.disabled[0]"></el-input>
        </el-form-item>
        <el-form-item label="选项 B">
          <el-input v-model="form.order[1]" :disabled="form.disabled[1]"></el-input>
        </el-form-item>
        <el-form-item label="选项 C">
          <el-input v-model="form.order[2]" :disabled="form.disabled[2]"></el-input>
        </el-form-item>
        <el-form-item label="选项 D">
          <el-input v-model="form.order[3]" :disabled="form.disabled[3]"></el-input>
        </el-form-item>
        <el-form-item label="答案">
          <el-select v-model="form.answer" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.index"
              :label="item.label"
              :value="item.value"
              :disabled="item.disabled">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="解释">
           <el-input v-model="form.analysis"></el-input>
        </el-form-item>
        <el-form-item label="题目附件">
          <el-upload
            class="upload-demo"
            :data="formatData()"
            ref="upload"
            :name="this.form.region == 'admiring' ? 'video':'image' "
            :action="API_HOST+'Poetry/Add'"
            :on-change="fileChange"
            show-file-list
            :limit="1"
            :file-list="filelist"
            :on-remove="removefile"
            :before-upload="beforeUpload"
            :auto-upload="false">
            <el-button size="small" type="primary">点击上传</el-button>
<!--            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div> -->
          </el-upload>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="addDialogVisible = false">取 消</el-button>
        <el-button size="small" type="primary" @click="onSubmit">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 编辑界面 -->
    <el-dialog
      title="修改题目"
      :visible.sync="editQuestion"
      width="50%">
      <el-form ref="form" :model="newform" label-width="70px" label-position="right">
        <el-form-item label="题目类型">
          <el-input v-model="newform.region" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="题目内容">
          <el-input type="textarea" :autosize="{ minRows: 3}" v-model="newform.desc"></el-input>
        </el-form-item>
        <el-form-item label="选项 A">
          <el-input v-model="newform.order[0]"></el-input>
        </el-form-item>
        <el-form-item label="选项 B">
          <el-input v-model="newform.order[1]"></el-input>
        </el-form-item>
        <el-form-item label="选项 C">
          <el-input v-model="newform.order[2]"></el-input>
        </el-form-item>
        <el-form-item label="选项 D">
          <el-input v-model="newform.order[3]"></el-input>
        </el-form-item>
        <el-form-item label="答案">
          <el-select v-model="newform.answer" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.index"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="解释">
           <el-input v-model="newform.analysis"></el-input>
        </el-form-item>
        <el-form-item label="题目附件">
          <el-upload
            class="upload-demo"
            :data="editformatData()"
            ref="editupload"
            :name="this.form.region == 'admiring' ? 'video':'image' "
            :action="API_HOST+'Poetry/Update'"
            :on-change="handleChange"
            show-file-list
            :limit="1"
            :file-list="editfilelist"
            :on-remove="removeEditfile"
            :before-upload="beforeEditUpload"
            :auto-upload="false">
            <el-button size="small" type="primary">点击上传</el-button>
<!--            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div> -->
          </el-upload>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="editQuestion = false">取 消</el-button>
        <el-button size="small" type="primary" @click="editSubmit">修 改</el-button>
      </span>
    </el-dialog>
  </el-row>
</template>

<script>
import axios from 'axios'
  export default {
    data () {
      return {
        API_HOST: window.API_HOST,
        addDialogVisible: false,
        editQuestion:false,
        currentPage:1,
        filelist:[],
        editfilelist:[],
        editid:'',
        pagesize:10,
        formInline: {
          name: ''
        },
        isjudge:false,
        isUploadShow: false,  // 是否显示upload组件
        supportWebp: false,   // 是否支持webp
        bucketHost: '',   // 上传图片的外链域名
        answerarr:['0','A','B','C','D'],
        form: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: '',
          order:[],
          disabled:[true,true,true,true],
          image:''
        },
        newform: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: '',
          order:[],
          disabled:[true,true,true,true],
          image:''
        },
        param:"",
        options:[{
          value: '1',
          label: 'A',
          disabled: true
        }, {
          value: '2',
          label: 'B',
          disabled: true
        }, {
          value: '3',
          label: 'C',
          disabled: true
        }, {
          value: '4',
          label: 'D',
          disabled: true
        }, {
          value: 'T',
          label: 'T',
          disabled: true
        },{
          value: 'F',
          label: 'F',
          disabled: true
        }],
        tableData3: [],
        oldtableData:[]
      }
    },

    methods: {
      search:function(){
        if(this.formInline.name == ''){
          this.tableData3 = this.oldtableData;
        }else{
          this.tableData3 = this.oldtableData.filter(item => (~item.question.indexOf(this.formInline.name)));
        }
      },
      selectVal:function(){
        if(this.form.region == 'choice' || this.form.region == 'admiring'){
          if(this.form.answer == 'T' || this.form.answer == 'F'){
            this.form.answer = '';
          }
          for(var i=0;i<4;i++){
            this.options[i].disabled = false;
            this.form.disabled[i] = false;
          }
          this.options[4].disabled = true;
          this.options[5].disabled = true;
        }else if(this.form.region == 'judge'){
          if(this.form.answer == '1' || this.form.answer == '2' || this.form.answer == '3' || this.form.answer == '4'){
            this.form.answer = '';
          }
          for(var i=0;i<4;i++){
            this.options[i].disabled = true;
            this.form.disabled[i] = true;
          }
          this.options[4].disabled = false;
          this.options[5].disabled = false;
        }
      },
      
      AddQuestion:function(){
        if(this.form.region == 'choice'){
          axios.post(API_HOST+'Poetry/Add',{
            type:0,
            question:this.form.desc,
            option:this.form.order,
            answer:this.form.answer,
            analysis:this.form.analysis,
            image:this.form.image
          })
          .then(function(res){
            res = res.data;
            if(res.status = true){
              this.$message.success(res.msg);
            }
          })
          .catch(function(err){
            this.$message.error(err);
          });
        }
        if(this.form.region == 'admiring'){
          axios.post(API_HOST+'Poetry/Add',{
            type:2,
            question:this.form.desc,
            option:this.form.order,
            answer:this.form.answer,
            analysis:this.form.analysis,
            video:this.form.image
          })
          .then(function(res){
          res = res.data;           
            if(res.status = true){
              this.$message.success(res.msg);
            }
          })
          .catch(function(err){
            this.$message.error(err);
          });
        }
        if(this.form.region == 'judge'){
          if(this.form.answer == 'T'){
            var answerm = 1;
          }else if(this.form.answer == 'F'){
            var answerm = 0;
          }
          axios.post(API_HOST+'Poetry/Add',{
            type:1,
            question:this.form.desc,
            answer:answerm,
            analysis:this.form.analysis,
          })
          .then(function(res){
          res = res.data;
            console.log(res);
            if(res.status = true){
              this.$message.success(res.msg)
            }
          })
          .catch(function(err){
            this.$message.error(err)          
          });
        }
      },
      getQuestion:function(){
        var questionArray = new Array();
        var newNode = new Array({
          id:'',
          type:'',
          question:'',
          option:[],
          answer:'',
          analysis:'',
          image:''
        });
        let self = this;
        this.$axios.get(API_HOST+'QuestionList')
        .then(function(res){
          res = res.data;
          if(res.status == true){
            for(var i=0;i<res.data.choice.length;i++){
              newNode = res.data.choice[i];
              newNode.type = '0';
              questionArray.push(newNode);
            }
            for(var i=0;i<res.data.judge.length;i++){
              newNode = res.data.judge[i];
              newNode.type = '1'
              questionArray.push(newNode);
            }
            for(var i=0;i<res.data.admiring.length;i++){
              newNode = res.data.admiring[i];
              newNode.type = '2'
              questionArray.push(newNode);
            }
            self.tableData3 = questionArray;
            self.oldtableData = self.tableData3;
          }
        })
      },
      handleSizeChange: function (size) {
        this.pagesize = size;
      },
      handleCurrentChange: function(currentPage){
          this.currentPage = currentPage;
      },
      filterTag(value, row) {
        return row.type === value;
      },
      handleEdit(index, row) {
        this.editid = row.id
        this.editQuestion = true;
        this.newform.region = row.type == 0? '选择题':row.type== 1 ? '判断题': '欣赏题';
        this.newform.desc = row.question;
        if(row.type != 1){
          this.newform.order = row.option;
        }else{
          this.newform.order = [];
        }
        if(row.type == 1){
          var rightarr = new Array('F','T');
          this.$set(this.newform,'answer',rightarr[parseInt(row.answer)]);
        }else{
//          var rightarr = new Array(0,'A','B','C','D');
          this.$set(this.newform,'answer',row.answer);
        }
        this.newform.analysis = row.analysis;
      },
      fileChange(file, fileList){
        this.filelist = fileList.slice(-3)
      },
      handleChange(file, fileList){
        this.editfilelist = fileList.slice(-3)
      },
      removefile(file){
        this.filelist = []
      },
      removeEditfile(file){
        this.editfilelist = [];
      },

      editSubmit(){
        if(!this.newform.desc || !this.newform.desc || !this.newform.answer || !this.newform.analysis){
          this.$message.error('请完整的填写信息')
          return false
        }
        if(this.editfilelist.length){
          //有文件时
          this.$refs.editupload.submit();
        }else{
          //没有文件时
          var type = this.newform.region == '选择题'?'0':this.newform.region == '判断题'?'1':'2';
          var question = this.newform.desc;
          var option = this.newform.order;
          var id = this.editid
          if(this.newform.answer == 'T'){
            var answer = 1;
          }else if(this.newform.answer == 'F'){
            var answer = 0;
          }else{
            var answer = this.newform.answer;
          }
          var analysis = this.newform.analysis;

          let fd = new FormData()
          fd.append('id',id)
          fd.append('type',type)
          fd.append('question',question)
          fd.append('option',option)
          fd.append('answer',answer)
          fd.append('analysis',analysis)

          this.$axios.post(API_HOST+"Poetry/UpdateN",{
            id:id,
            type:type,
            question:question,
            option:option,
            answer:answer,
            analysis:analysis
          })
          .then((res) => {
            if(res.data.status){
              this.$message.success(res.data.msg)
            }else{
              this.$message.error('修改失败')
            }
          })
          .catch((err) => {
            this.$message.error(err)
          })
        }
        
      },
      handleDelete(index, row){
        axios.post(API_HOST+"Poetry/Delete",{
          type:row.type,
          id:row.id,
        })
        .then(function(res) {
          res = res.data;
          if(res.status == true){
            this.$message.success(res.msg)
          }
        })
        .catch(function(err){
          this.$message.error(err)
        });
      },
      beforeUpload(file) {
        console.log(file);
        //重新写一个表单上传的方法
        if(this.form.region == 'admiring'){
          this.param.append('video', file, file.name);
        }else{
          this.param.append('image', file, file.name);
        }        
      },
      //覆盖默认的上传行为
      httprequest() {

      },
      formatData(){//表单提交的事件
          var type = this.form.region == 'choice'?'0':this.form.region == 'judge'?'1':'2';
          var question = this.form.desc;
          var option = this.form.order;
          if(this.form.answer == 'T'){
            var answer = 1;
          }else if(this.form.answer == 'F'){
            var answer = 0;
          }else{
            var answer = this.form.answer;
          }
          var analysis = this.form.analysis;
          
          return {
            type,
            question,
            option,
            answer,
            analysis
          }
      },
      editformatData(){//表单提交的事件
          var type = this.newform.region == '选择题'?0:this.newform.region == '判断题'?1:2;
          var question = this.newform.desc;
          var option = this.newform.order;
          var id = this.editid
          if(this.newform.answer == 'T'){
            var answer = 1;
          }else if(this.newform.answer == 'F'){
            var answer = 0;
          }else{
            var answer = this.newform.answer;
          }
          var analysis = this.newform.analysis;
          
          return {
            type,
            id,
            question,
            option,
            answer,
            analysis
          }
      },
      onSubmit() {
        if(!this.form.region || !this.form.desc || !this.form.answer || !this.form.analysis){
          if(this.form.region != 'judge' && !this.form.option){
            this.$message.error('请完整的填写信息')
            return false
          }
        }
        if(this.filelist.length){
          this.$refs.upload.submit();
        }else{
          var type = this.form.region == 'choice'?'0':this.form.region == 'judge'?'1':'2';
          var question = this.form.desc;
          var option = this.form.order;
          if(this.form.answer == 'T'){
            var answer = 1;
          }else if(this.form.answer == 'F'){
            var answer = 0;
          }else{
            var answer = this.form.answer;
          }
          var analysis = this.form.analysis;

          let fd = new FormData()
          fd.append('type',type)
          fd.append('question',question)
          fd.append('option',option)
          fd.append('answer',answer)
          fd.append('analysis',analysis)


          this.$axios.post(API_HOST+"Poetry/AddN", {
            type:type,
            question:question,
            option:option,
            answer:answer,
            analysis:analysis
          })
          .then((res) => {
            if(res.data.status){
              this.$message.success(res.data.msg)
            }else{
              this.$message.error('添加失败')
            }
          })
          .catch((err) => {
            this.$message.error(err)
          })
        }
      }
    },
    mounted(){
      this.getQuestion();
      this.param = new FormData();
    }
  }
</script>

<style lang="scss" scoped>
  .question__form {
    padding: 10px;
    margin-bottom: 10px;
    background-color: #eef1f6;
    .form__item {
      margin-bottom: 0px;
    }
  }
  .question__footer {
    padding: 10px;
    margin-top: 10px;
    background-color: #eef1f6;
  }
  .question__page {
    float: right;
  }
</style>