import { Button, Form, Input, Modal, Tabs, Upload, message } from "antd";
import React, { useState } from "react";
import { antvalidationError } from "../../../helpers";
import { SetLoading } from "../../../redux/loaderSlice";
import { useDispatch } from "react-redux";
import { AddArtist, updateArtist } from "../../../apis/artist";
import moment from "moment";
import { UploadImage } from "../../../apis/images";

function ArtistForm({
  showArtistForm,
  setShowArtistForm,
  selectedArtist,
  reloadData,
}) {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const [file, setFile] = useState(null);
  const [selectedTab, setSelectedTab] = useState();

  if (selectedArtist) {
    selectedArtist.dob = moment(selectedArtist.dob).format("YYYY-MM-DD");
  }

  const onFinish = async (values) => {
    console.log("values=>", values);
    try {
      dispatch(SetLoading(true));
      values.dob = values.dob.split("-").reverse().join("/");

      let response;
      if (selectedArtist) {
        response = await updateArtist(selectedArtist._id, values);
        console.log("response =>", response);
      } else {
        response = await AddArtist(values);
      }

      // console.log("values->", values);
      // const response = await AddArtist(values);
      reloadData();
      dispatch(SetLoading(false));
      message.success(response.message);
      setShowArtistForm(false);
    } catch (error) {
      message.error(error.message);
      dispatch(SetLoading(false));
    }
  };
  const onImageUpload = async () => {
    try {
      const formData = new FormData();
      formData.append("image", file);
      dispatch(SetLoading(true));
      const response = await UploadImage(formData);
      if (response.success) {
        await updateArtist(selectedArtist._id, {
          ...selectedArtist,
          images: [...(selectedArtist?.images || []), response.data],
        });
      }
      dispatch(SetLoading(false));
      message.success(response.message);
      setShowArtistForm(false);
    } catch (error) {
      message.error(error.message);
      dispatch(SetLoading(false));
    }
  };
  return (
    <Modal
      open={showArtistForm}
      onCancel={() => setShowArtistForm(false)}
      title={selectedArtist ? "Edit Artist " : "Add Artist"}
      centered
      width={600}
      okText={selectedArtist ? "Update" : "Add"}
      onOk={() => {
        if (selectedTab === "1") {
          form.submit();
        } else {
          onImageUpload();
        }
      }}
    >
      <>
        <div className="h1 text-center font-semi text-gray-600 text-x1 uppercase">
          {selectedArtist ? "Update" : "Add"} Artist
        </div>
        <Tabs defaultActiveKey="1" onChange={(key) => setSelectedTab(key)}>
          <Tabs.TabPane tab="Basic Info" key="1">
            <Form
              layout="vertical"
              className="flex flex-col gap-5"
              onFinish={onFinish}
              form={form}
              initialValues={selectedArtist}
            >
              <Form.Item rules={antvalidationError} label="Name" name="name">
                <Input />
              </Form.Item>
              <div className="grid grid-cols-2 gap-5">
                <Form.Item label="DOB" name="dob">
                  <Input type="date" />
                </Form.Item>
                <Form.Item
                  rules={antvalidationError}
                  label="Debut Year"
                  name="debutyear"
                >
                  <Input type="number" />
                </Form.Item>
              </div>
              <div className="grid grid-cols-2 gap-5">
                <Form.Item
                  rules={antvalidationError}
                  label="Profession"
                  name="profession"
                >
                  <select name="" id="">
                    <option value="">Select</option>
                    <option value="">Actor</option>
                    <option value="Artist">Actress</option>
                    <option value="Director">Director</option>
                    <option value="Producer">Producer</option>
                    <option value="Muic Director">Music Director</option>
                    <option value="Singer">Singer</option>
                    <option value="Lyricist">Lyricist</option>
                    <option value="Cinemaatographer">Cinemaatographer</option>
                    <option value="Editor">Editor</option>
                  </select>
                </Form.Item>
                <Form.Item
                  rules={antvalidationError}
                  label="Debut movie"
                  name="debutmovie"
                >
                  <Input type="text" />
                </Form.Item>
              </div>
              <Form.Item rules={antvalidationError} label="bio" name="bio">
                <Input.TextArea />
              </Form.Item>
              <Form.Item
                rules={antvalidationError}
                label="Profile Pic"
                name="profilepic"
              >
                <Input type="text" />
              </Form.Item>
            </Form>
          </Tabs.TabPane>
          <Tabs.TabPane tab="Images" key="2" disabled={!selectedArtist}>
            <Upload
              onChange={(info) => {
                setFile(info.file);
              }}
              beforeUpload={() => false}
              listType="picture"
            >
              <Button>Click to upload</Button>
            </Upload>
          </Tabs.TabPane>
        </Tabs>
      </>
    </Modal>
  );
}

export default ArtistForm;
