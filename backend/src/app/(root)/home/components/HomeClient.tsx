"use client"
import { httpClient } from "@/service/httpClient"
import { useQuery } from "@tanstack/react-query"
import { Button, Form, Input, Menu, message, Modal, Space } from "antd"
import { CreateOrEditLesson } from "../../lessons/LessonsClient"
import { Lesson, Section } from "@shared/types"
import { useMemo, useState } from "react"

export const HomeClient = () => {
  const { data: sections, refetch: refecthSections } = useQuery<Section[]>({
    queryKey: ["sections"],
    queryFn: () => httpClient.get("/api/sections").then((r) => r.data),
    refetchOnWindowFocus: false,
  })

  const { data: lessons, refetch: refecthLesson } = useQuery<Lesson[]>({
    queryKey: ["lessons"],
    queryFn: () => httpClient.get("/api/lessons").then((r) => r.data),
    refetchOnWindowFocus: false,
  })

  const [lessonToEdit, setLessonToEdit] = useState<Lesson>()

  const sectionIdToLessons = useMemo(() => {
    const obj: { [key: string]: Lesson[] } = {}
    lessons?.forEach((lesson) => {
      if (obj[lesson.sectionId]) {
        obj[lesson.sectionId].push(lesson)
      } else {
        obj[lesson.sectionId] = [lesson]
      }
    })
    return obj
  }, [lessons])

  const createOrEditSection = (section?: Section) => {
    Modal.info({
      title: "Thêm section",
      content: (
        <div>
          <Form
            onFinish={(values) => {
              ;(section
                ? httpClient.put(`api/sections/${section.id}`, {
                    ...section,
                    ...values,
                  })
                : httpClient.post("/api/sections", values)
              ).then(() => {
                Modal.destroyAll()
                message.success("Thành công")
                refecthSections()
              })
            }}
          >
            <Form.Item
              label="Tên section"
              name="title"
              initialValue={section?.title}
            >
              <Input />
            </Form.Item>

            <Space>
              <Button htmlType="reset" onClick={() => Modal.destroyAll()}>
                Huỷ
              </Button>

              <Form.Item noStyle>
                <Button type="primary" htmlType="submit">
                  Lưu
                </Button>
              </Form.Item>
            </Space>
          </Form>
        </div>
      ),
      footer: null,
    })
  }

  return (
    <div className="flex flex-row gap-4">
      <div className="flex flex-col">
        <Menu
          mode="inline"
          defaultSelectedKeys={["231"]}
          style={{ width: 256 }}
          items={sections?.map((section) => ({
            key: section.id,
            label: (
              <div
                key={section.id}
                className="flex justify-between items-center "
              >
                {section.title}{" "}
                <Button
                  size="small"
                  onClick={() => createOrEditSection(section)}
                >
                  Sửa
                </Button>
              </div>
            ),
            children: [
              ...(sectionIdToLessons[section.id] || [])?.map((lesson) => ({
                key: section.id + lesson.id,
                label: (
                  <span className="flex justify-between items-center">
                    {lesson.title}{" "}
                    <Button
                      size="small"
                      onClick={() => setLessonToEdit(lesson)}
                    >
                      Sửa
                    </Button>
                  </span>
                ),
              })),
              {
                key: section.id + "add",
                label: "Thêm bài học",
                onClick: () => {
                  setLessonToEdit(undefined)
                  console.log("HIi")
                },
              },
            ],
          }))}
        />

        <div className="p-2">
          <Button onClick={() => createOrEditSection()}>Thêm section</Button>
        </div>
      </div>

      <div className="flex-1">
        <CreateOrEditLesson
          sections={sections || []}
          refecthLesson={refecthLesson}
          lessonToEdit={lessonToEdit}
          clearLessonToEdit={() => setLessonToEdit(undefined)}
        />
      </div>
    </div>
  )
}
