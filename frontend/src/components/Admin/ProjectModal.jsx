// src/components/ProjectModal.jsx
import React, { useEffect } from "react";
import { Modal, Form, Input, Upload, Select, Space, message, Spin } from "antd";
import { UploadOutlined, PlusOutlined } from "@ant-design/icons";
import {
  useLazyGetProjectByIdQuery,
  useCreateProjectMutation,
  useUpdateProjectMutation,
} from "../../api/rippotaiApi";

const { TextArea } = Input;
const { Option } = Select;

const ProjectModal = ({
  visible,
  onClose,
  projectToEdit = null, // the partial project from list (for fallback)
  onSuccess, // callback after save
}) => {
  const [form] = Form.useForm();
  const [mainFileList, setMainFileList] = React.useState([]);
  const [galleryFileList, setGalleryFileList] = React.useState([]);

  const [
    triggerGetProject,
    { data: fullProject, isFetching: isDetailFetching },
  ] = useLazyGetProjectByIdQuery();

  const [createProject, { isLoading: creating }] = useCreateProjectMutation();
  const [updateProject, { isLoading: updating }] = useUpdateProjectMutation();

  const isSaving = creating || updating;
  const isEditMode = !!projectToEdit?._id;

  // Load full project data when modal opens in edit mode
  useEffect(() => {
    if (!visible) return;
    form.resetFields();
    setMainFileList([]);
    setGalleryFileList([]);

    if (isEditMode && projectToEdit._id) {
      triggerGetProject(projectToEdit._id)
        .unwrap()
        .then((data) => {
          console.log("Full project loaded:", data);

          form.setFieldsValue({
            title: data.title || "",
            category: data.category || "",
            description: data.description || "",
            details: data.details || "",
            status: data.status || "draft",
            location: data.location || "",
            scope: data.scope || "",
          });

          setMainFileList(
            data.image
              ? [
                  {
                    uid: "-main",
                    name: "main",
                    status: "done",
                    url: data.image,
                  },
                ]
              : [],
          );

          setGalleryFileList(
            (data.images || []).map((url, i) => ({
              uid: `img-${i}`,
              name: `gallery-${i + 1}`,
              status: "done",
              url,
            })),
          );
        })
        .catch((err) => {
          console.error("Failed to load full project:", err);
          message.error("Could not load full details. Using available info.");

          // Fallback
          form.setFieldsValue({
            title: projectToEdit.title || "",
            category: projectToEdit.category || "",
            description: projectToEdit.description || "",
            status: projectToEdit.status || "draft",
            location: projectToEdit.location || "",
            scope: projectToEdit.scope || "",
          });

          setMainFileList(
            projectToEdit.image
              ? [
                  {
                    uid: "-main",
                    name: "main",
                    status: "done",
                    url: projectToEdit.image,
                  },
                ]
              : [],
          );

          setGalleryFileList(
            (projectToEdit.images || []).map((url, i) => ({
              uid: `fb-${i}`,
              name: `gallery-${i + 1}`,
              status: "done",
              url,
            })),
          );
        });
    } else {
      // New project → default values
      form.setFieldsValue({ status: "draft" });
    }
  }, [visible, projectToEdit, triggerGetProject, form]);

  const handleSave = async () => {
    try {
      const values = await form.validateFields();

      const formData = new FormData();
      formData.append("title", values.title);
      formData.append("category", values.category);
      formData.append("description", values.description);
      formData.append("details", values.details || "");
      formData.append("status", values.status);
      if (values.location?.trim())
        formData.append("location", values.location.trim());
      if (values.scope?.trim()) formData.append("scope", values.scope.trim());

      // Main image
      if (mainFileList[0]?.originFileObj) {
        formData.append("image", mainFileList[0].originFileObj);
      }

      // New gallery images
      galleryFileList.forEach((file) => {
        if (file.originFileObj) {
          formData.append("images", file.originFileObj);
        }
      });

      // For edit: send kept existing images
      if (isEditMode) {
        const keptUrls = galleryFileList
          .filter((f) => !f.originFileObj && f.url)
          .map((f) => f.url);
        formData.append("existingImages", JSON.stringify(keptUrls));

        await updateProject({ id: projectToEdit._id, formData }).unwrap();
        message.success("Project updated successfully");
      } else {
        await createProject(formData).unwrap();
        message.success("Project created successfully");
      }

      onSuccess?.(); // refresh list, etc.
      onClose();
    } catch (err) {
      console.error("Save failed:", err);
      message.error("Failed to save project");
    }
  };

  const mainUploadProps = {
    onRemove: () => setMainFileList([]),
    beforeUpload: (file) => {
      const isImage = file.type.startsWith("image/");
      const isLt5M = file.size / 1024 / 1024 < 5;
      if (!isImage) {
        message.error("Only image files allowed!");
        return false;
      }
      if (!isLt5M) {
        message.error("Image must be < 5MB!");
        return false;
      }
      setMainFileList([file]);
      return false;
    },
    fileList: mainFileList,
    maxCount: 1,
    accept: "image/*",
    listType: "picture",
  };

  const galleryUploadProps = {
    onRemove: (file) => {
      setGalleryFileList((prev) => prev.filter((f) => f.uid !== file.uid));
    },
    beforeUpload: (file) => {
      const isImage = file.type.startsWith("image/");
      const isLt5M = file.size / 1024 / 1024 < 5;
      if (!isImage || !isLt5M) {
        message.error("Only images < 5MB allowed");
        return false;
      }
      setGalleryFileList((prev) => [...prev, file]);
      return false;
    },
    fileList: galleryFileList,
    multiple: true,
    accept: "image/*",
    listType: "picture-card",
  };

  return (
    <Modal
      title={isEditMode ? "Edit Project" : "Create New Project"}
      open={visible}
      onOk={handleSave}
      okText={isEditMode ? "Save Changes" : "Create Project"}
      confirmLoading={isSaving}
      onCancel={onClose}
      width={1000}
      destroyOnClose
    >
      {isDetailFetching ? (
        <div style={{ textAlign: "center", padding: "60px 0" }}>
          <Spin size="large" tip="Loading project details..." />
        </div>
      ) : (
        <Form form={form} layout="vertical">
          <Form.Item
            name="title"
            label="Project Title"
            rules={[{ required: true, message: "Title is required" }]}
          >
            <Input placeholder="e.g. Luxury Villa in Gurgaon" />
          </Form.Item>

          <Form.Item
            name="category"
            label="Category"
            rules={[{ required: true, message: "Category is required" }]}
          >
            <Select placeholder="Select category">
              <Option value="Residential">Residential</Option>
              <Option value="Commercial">Commercial</Option>
              <Option value="Hospitality">Hospitality</Option>
              <Option value="Institutional">Institutional</Option>
              <Option value="Industrial">Industrial</Option>
            </Select>
          </Form.Item>

          <Form.Item name="status" label="Status" rules={[{ required: true }]}>
            <Select>
              <Option value="draft">Draft</Option>
              <Option value="prunned">Prunned</Option>
              <Option value="working">Working</Option>
              <Option value="completed">Completed</Option>
            </Select>
          </Form.Item>

          <Form.Item name="location" label="Location">
            <Input placeholder="e.g. Gurgaon, Delhi NCR" />
          </Form.Item>

          <Form.Item name="scope" label="Scope / Size">
            <Input placeholder="e.g. 5000 sq ft, 3 BHK, Full Interior" />
          </Form.Item>

          <Form.Item
            name="description"
            label="Short Description"
            rules={[
              { required: true, message: "Short description is required" },
            ]}
          >
            <TextArea
              rows={3}
              placeholder="Brief summary (appears in listing)"
            />
          </Form.Item>

          <Form.Item name="details" label="Detailed Description">
            <TextArea
              rows={6}
              placeholder="Full project details, features, materials, timeline, etc."
            />
          </Form.Item>

          <Space direction="vertical" style={{ width: "100%", marginTop: 16 }}>
            <label>Main Image (cover / featured) *</label>
            <Upload {...mainUploadProps}>
              {mainFileList.length === 0 && (
                <div>
                  <UploadOutlined style={{ fontSize: 32, color: "#888" }} />
                  <div style={{ marginTop: 8 }}>Click or drag main image</div>
                </div>
              )}
            </Upload>
          </Space>

          <Space direction="vertical" style={{ width: "100%", marginTop: 32 }}>
            <label>Gallery Images (additional photos)</label>
            <Upload {...galleryUploadProps} listType="picture-card">
              <div>
                <PlusOutlined />
                <div style={{ marginTop: 8 }}>Upload</div>
              </div>
            </Upload>
            <div style={{ color: "#888", fontSize: 13, marginTop: 8 }}>
              Remove existing images by clicking ×. New images will be appended.
            </div>
          </Space>
        </Form>
      )}
    </Modal>
  );
};

export default ProjectModal;
