import React, { Component } from 'react';
import { Upload, message, Modal } from 'antd';
import ImgCrop from 'antd-img-crop';
import { PlusOutlined } from '@ant-design/icons';

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}
function beforeUpload(file) {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('文件格式必须是JPG/PNG!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('文件大小不能超过2MB!');
  }
  return isJpgOrPng && isLt2M;
}
class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      previewVisible: false,
      previewImage: '',
      previewTitle: '',
      fileList: []
    }
  }
  componentWillReceiveProps = (nextProps) => {
    if (nextProps.fileList !== this.props.fileList) {
      this.setState({
        fileList: nextProps.fileList
      })
    }
  }
  componentDidMount = () => {

  }
  // 轮播
  handleCancel = () =>
    this.setState({
      previewVisible: false
    });
  handlePreview = async file => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    this.setState({
      previewImage: file.url || file.preview,
      previewVisible: true,
      previewTitle: file.name || file.url.substring(file.url.lastIndexOf('/') + 1)
    });
  };
  handleChange = ({ fileList }) => {
    this.setState({
      fileList: fileList
    });
    let successFileList = fileList.filter(item => {
      return item.url || item.response && item.status === 'done'
    })
    let urlList = successFileList.map(item => {
      return item.url || item.response.data
    })
    this.props.onChange && this.props.onChange({
      name: this.props.name,
      fileList: urlList
    })
  }
  beforeCrop = () => {

  }
  render() {
    const { previewVisible, previewImage, fileList, previewTitle } = this.state;
    const { maxLength = 1, aspect = 1 / 1, grid = false } = this.props
    const uploadButton = (
      <div>
        <PlusOutlined />
        <div style={{ marginTop: 8 }}>上传图片</div>
      </div>
    );
    return (
      <>
        <ImgCrop grid={grid} aspect={aspect} modalOk="确定" modalCancel="取消">
          <Upload
            action="图片上传地址"
            name='images'
            listType="picture-card"
            fileList={fileList}
            headers="设置headers"
            onPreview={this.handlePreview}
            onChange={this.handleChange}
          >
            {fileList.length >= maxLength ? null : uploadButton}
          </Upload>
        </ImgCrop>
        <Modal
          visible={previewVisible}
          title={previewTitle}
          footer={null}
          onCancel={this.handleCancel}
        >
          <img alt="example" style={{ width: '100%' }} src={previewImage} />
        </Modal>
      </>
    );
  }
}

export default index;
