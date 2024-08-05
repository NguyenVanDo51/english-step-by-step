"use client"

import React, { FC, useEffect, useState } from "react"
import { Form, Input, Button, List, Space, Select, message, Spin } from "antd"
import { PlusOutlined, MinusCircleOutlined } from "@ant-design/icons"
import { CKEditorFormItem } from "@/components/inputs/RichText"
import { Section } from "@shared/types/section"
import { useMutation, useQuery } from "@tanstack/react-query"
import { httpClient } from "@/service/httpClient"
import { Lesson } from "@shared/types"
const { TextArea } = Input
const { Option } = Select

type Props = {
  sections: Section[]
  lessonToEdit: Lesson | undefined
  refecthLesson: () => void
  clearLessonToEdit: () => void
}

export const CreateOrEditLesson: FC<Props> = ({
  sections,
  lessonToEdit,
  refecthLesson,
  clearLessonToEdit,
}) => {
  const [loading, setLoading] = useState(false)
  const { mutate: createLesson, isPending } = useMutation({
    mutationKey: ["createLesson"],
    mutationFn: (payload) => {
      return httpClient.post("/api/lessons", payload)
    },
    onSuccess: () => {
      refecthLesson()
      message.success("Thành công")
      form.resetFields()
      clearLessonToEdit()
    },
  })

  const [form] = Form.useForm()

  const onFinish = (values: any) => {
    console.log(values)
    createLesson(values)
  }

  useEffect(() => {
    if (lessonToEdit) {
      form.setFieldsValue(lessonToEdit)
    } else {
      form.resetFields()
    }
  }, [form, lessonToEdit])

  return (
    <div>
      <h2 className="text-lg font-medium">
        {lessonToEdit ? `Chỉnh sửa: ${lessonToEdit.title}` : "Thêm bài học"}
      </h2>
      <Spin spinning={isPending || loading}>
        <Form form={form} onFinish={onFinish} layout="vertical">
          <Form.Item
            label="Section"
            name="sectionId"
            rules={[
              { required: true, message: "Please input the Section ID!" },
            ]}
          >
            <Select
              options={sections}
              fieldNames={{
                value: "id",
                label: "title",
              }}
            />
          </Form.Item>

          <Form.Item
            label="Title"
            name="title"
            rules={[{ required: true, message: "Please input the title!" }]}
          >
            <Input />
          </Form.Item>

          <Button
            className="mb-4"
            onClick={() => {
              setLoading(true)
              const sectionId = form.getFieldValue("sectionId")
              const lesson = form.getFieldValue("title")
              if (!sectionId || !lesson) {
                message.warning(
                  "Vui lòng chọn Section và nhập tiêu đề cho bài học"
                )
              }

              httpClient
                .get("/api/lessons/auto", {
                  params: {
                    section: sections.find((s) => s.id === sectionId)?.title,
                    lesson,
                  },
                })
                .then((res) => {
                  const content = JSON.parse(res.data.data)
                  delete content.id
                  delete content.sectionId
                  delete content.title

                  console.log("content", content)
                  form.setFieldsValue(content)
                })
                .finally(() => {
                  setLoading(false)
                })
            }}
          >
            AI Generate
          </Button>

          <Form.Item
            label="Short Description"
            name="shortDescription"
            rules={[
              {
                required: true,
                message: "Please input the short description!",
              },
            ]}
          >
            <TextArea rows={2} />
          </Form.Item>

          <Form.Item label="Long Description" name="longDescription">
            <CKEditorFormItem />
          </Form.Item>

          <Form.List name="lessonPart">
            {(fields, { add, remove }) => (
              <>
                <List
                  header={<div>Nội dung</div>}
                  bordered
                  dataSource={fields}
                  renderItem={({ key: fieldKey, ...field }, index) => (
                    <List.Item key={`${fieldKey}_${index}`}>
                      <Space direction="vertical" style={{ width: "100%" }}>
                        <Form.Item
                          {...field}
                          label="Type"
                          name={[field.name, "type"]}
                          rules={[
                            {
                              required: true,
                              message: "Please select a type!",
                            },
                          ]}
                        >
                          <Select placeholder="Select lesson part type">
                            <Option value="HTML_PAGE">HTML Page</Option>
                            <Option value="PICK_CORRECT_ANSWER">
                              Pick Correct Answer
                            </Option>
                          </Select>
                        </Form.Item>
                        <Form.Item
                          shouldUpdate={(prevValues, currentValues) =>
                            prevValues.lessonPart?.[index]?.type !==
                            currentValues.lessonPart?.[index]?.type
                          }
                          noStyle
                        >
                          {({ getFieldValue }) => {
                            const type = getFieldValue([
                              "lessonPart",
                              index,
                              "type",
                            ])

                            if (type === "HTML_PAGE") {
                              return (
                                <>
                                  <Form.List
                                    name={[field.name, "data", "content"]}
                                  >
                                    {(
                                      contentFields,
                                      { add: addContent, remove: removeContent }
                                    ) => (
                                      <>
                                        {contentFields.map(
                                          (
                                            {
                                              key: contentKey,
                                              ...contentField
                                            },
                                            contentIndex
                                          ) => (
                                            <div
                                              key={`${contentKey}_${contentIndex}`}
                                              className="flex gap-2"
                                            >
                                              <Form.Item
                                                {...contentField}
                                                label={`Content ${
                                                  contentIndex + 1
                                                }`}
                                                className="flex-1"
                                                name={[contentField.name]}
                                                rules={[
                                                  {
                                                    required: true,
                                                    message:
                                                      "Please input content!",
                                                  },
                                                ]}
                                              >
                                                <CKEditorFormItem />
                                              </Form.Item>

                                              <MinusCircleOutlined
                                                onClick={() =>
                                                  removeContent(
                                                    contentField.name
                                                  )
                                                }
                                              />
                                            </div>
                                          )
                                        )}
                                        <Form.Item>
                                          <Button
                                            type="dashed"
                                            onClick={() => addContent()}
                                            block
                                            icon={<PlusOutlined />}
                                          >
                                            Add Content
                                          </Button>
                                        </Form.Item>
                                      </>
                                    )}
                                  </Form.List>
                                </>
                              )
                            }

                            if (type === "PICK_CORRECT_ANSWER") {
                              return (
                                <>
                                  <Form.Item
                                    {...field}
                                    label="Question"
                                    name={[field.name, "data", "question"]}
                                    rules={[
                                      {
                                        required: true,
                                        message: "Please input the question!",
                                      },
                                    ]}
                                  >
                                    <TextArea rows={2} placeholder="Question" />
                                  </Form.Item>
                                  <Form.Item
                                    {...field}
                                    label="Correct Answer"
                                    name={[field.name, "data", "correctAnswer"]}
                                    rules={[
                                      {
                                        required: true,
                                        message:
                                          "Please input the correct answer!",
                                      },
                                    ]}
                                  >
                                    <Input placeholder="Correct Answer" />
                                  </Form.Item>
                                  <Form.List
                                    name={[field.name, "data", "wrongAnswer"]}
                                  >
                                    {(
                                      wrongAnswerFields,
                                      {
                                        add: addWrongAnswer,
                                        remove: removeWrongAnswer,
                                      }
                                    ) => (
                                      <>
                                        {wrongAnswerFields.map(
                                          (
                                            {
                                              key: wrongAnswerFieldKey,
                                              ...wrongAnswerField
                                            },
                                            wrongAnswerIndex
                                          ) => (
                                            <Space
                                              key={`${wrongAnswerFieldKey}_${wrongAnswerIndex}`}
                                              style={{
                                                display: "flex",
                                                marginBottom: 8,
                                              }}
                                              align="baseline"
                                            >
                                              <Form.Item
                                                {...wrongAnswerField}
                                                label={`Wrong Answer ${
                                                  wrongAnswerIndex + 1
                                                }`}
                                                name={[wrongAnswerField.name]}
                                                rules={[
                                                  {
                                                    required: true,
                                                    message:
                                                      "Please input a wrong answer!",
                                                  },
                                                ]}
                                              >
                                                <Input placeholder="Wrong Answer" />
                                              </Form.Item>

                                              <MinusCircleOutlined
                                                onClick={() =>
                                                  removeWrongAnswer(
                                                    wrongAnswerField.name
                                                  )
                                                }
                                              />
                                            </Space>
                                          )
                                        )}

                                        <Form.Item>
                                          <Button
                                            type="dashed"
                                            onClick={() => addWrongAnswer()}
                                            block
                                            icon={<PlusOutlined />}
                                          >
                                            Add Wrong Answer
                                          </Button>
                                        </Form.Item>
                                      </>
                                    )}
                                  </Form.List>
                                </>
                              )
                            }
                            return null
                          }}
                        </Form.Item>
                        <MinusCircleOutlined
                          onClick={() => remove(field.name)}
                        />
                      </Space>
                    </List.Item>
                  )}
                />

                <Button
                  type="dashed"
                  onClick={() => add()}
                  block
                  icon={<PlusOutlined />}
                >
                  Add Lesson Part
                </Button>
              </>
            )}
          </Form.List>

          <Form.List name="vocabularies">
            {(fields, { add, remove }) => (
              <>
                <List
                  header={<div>Vocabularies</div>}
                  bordered
                  dataSource={fields}
                  className="mt-4"
                  renderItem={({ key: fieldKey, ...field }, index) => (
                    <List.Item key={`${fieldKey}_${index}`}>
                      <Space direction="vertical" style={{ width: "100%" }}>
                        <Form.Item
                          {...field}
                          label={`Vocabulary ${index + 1}`}
                          name={[field.name, "en"]}
                          rules={[
                            {
                              required: true,
                              message: "Please input the word!",
                            },
                          ]}
                        >
                          <Input placeholder="Word" />
                        </Form.Item>

                        <Form.Item
                          {...field}
                          label={`Meaning ${index + 1}`}
                          name={[field.name, "vi"]}
                          rules={[
                            {
                              required: true,
                              message: "Please input the meaning!",
                            },
                          ]}
                        >
                          <Input placeholder="Meaning" />
                        </Form.Item>
                        <MinusCircleOutlined
                          onClick={() => remove(field.name)}
                        />
                      </Space>
                    </List.Item>
                  )}
                />

                <Button
                  type="dashed"
                  onClick={() => add()}
                  block
                  icon={<PlusOutlined />}
                >
                  Add Vocabulary
                </Button>
              </>
            )}
          </Form.List>
          <Space className="mt-4 flex justify-end">
            <Button
              htmlType="reset"
              onClick={() => {
                clearLessonToEdit()
              }}
            >
              Cancel
            </Button>

            <Form.Item noStyle>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Space>
        </Form>
      </Spin>
    </div>
  )
}
