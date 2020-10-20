import React, { Component } from 'react'
// 引入编辑器组件
import BraftEditor from 'braft-editor'
// 引入编辑器样式
import 'braft-editor/dist/index.css'
export default class Editor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editorState: BraftEditor.createEditorState(this.props.editorState) || null
    }
  }
  // editorState
  componentWillReceiveProps = (nextProps) => {
    nextProps.editorState !== this.props.editorState && this.setState({
      editorState: nextProps.editorState
    })
  }
  submitContent = async () => {
    // 在编辑器获得焦点时按下ctrl+s会执行此方法
    // 编辑器内容提交到服务端之前，可直接调用editorState.toHTML()来获取HTML格式的内容
    const htmlContent = this.state.editorState.toHTML()
    // const result = await saveEditorContent(htmlContent)
  }

  handleEditorChange = (editorState) => {
    this.setState({ editorState })
    this.props.editorChange({
      name: this.props.name,
      editorState: editorState.toHTML()
    })
  }
  //5.由于图片上传、视频上传项目中都是单独走的接口，需要一个上传的方法
  myUploadFn = (param) => {
    const xhr = new XMLHttpRequest();
    const fd = new FormData();
    // 区分图片上传和视频上传
    let serverURL = " ";    //接口地址
    // let type = param.file.type
    // if (type.indexOf("image") !== -1) {
    //   serverURL = hostUrl + "/upload/uploadfile/";
    //   fd.append('images', param.file);
    // } else if (type.indexOf("video") !== -1) {
    //   serverURL = hostUrl + "/upload/uploadvideo/";
    //   fd.append('video', param.file);
    // }
    const successFn = (response) => {
      // 假设服务端直接返回文件上传后的地址
      // 上传成功后调用param.success并传入上传后的文件地址
      //console.log('response', response.currentTarget);
      //console.log('xhr.responseText', xhr.responseText);
      const upLoadObject = JSON.parse(response && response.currentTarget && response.currentTarget.response);
      param.success({
        // url: JSON.parse(xhr.responseText).data.fileUrl,
        url: upLoadObject.data,
        meta: {
          id: upLoadObject && upLoadObject.id,
          title: upLoadObject && upLoadObject.fileName,
          alt: upLoadObject && upLoadObject.fileName,
          loop: false, // 指定音视频是否循环播放
          autoPlay: true, // 指定音视频是否自动播放
          controls: true, // 指定音视频是否显示控制栏
          poster: '', // 指定视频播放器的封面
        }
      })
    };

    const progressFn = (event) => {
      // 上传进度发生变化时调用param.progress
      param.progress(event.loaded / event.total * 100)

    };

    const errorFn = (response) => {
      // 上传发生错误时调用param.error
      param.error({
        msg: 'unable to upload.'
      })
    };

    xhr.upload.addEventListener("progress", progressFn, false);
    xhr.addEventListener("load", successFn, false);
    xhr.addEventListener("error", errorFn, false);
    xhr.addEventListener("abort", errorFn, false);
    xhr.open('POST', serverURL, true);
    xhr.setRequestHeader("manageToken", "token");//header中token的设置
    xhr.setRequestHeader("crop", 0)
    xhr.send(fd)
  };

  render() {
    let { editorState } = this.state
    const value = BraftEditor.createEditorState(editorState)
    return (
      <BraftEditor
        value={value}
        style={{ border: '1px solid #e8e8e8' }}
        onChange={this.handleEditorChange}
        onSave={this.submitContent}
        media={{ uploadFn: this.myUploadFn }}
      />
    )
  }
}