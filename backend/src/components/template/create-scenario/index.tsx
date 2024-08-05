"use client"

import { Form, Input, message } from "antd"
import { FC, useEffect, useRef, useState } from "react"
import { AppButton } from "@/components/level1/antd/AppButton"
import { ImageUpload } from "@/components/inputs/image-upload"
import { ScenarioInterface } from "@/types/lesson/type"
import { BotService } from "@/service/bot/index.service"
import { useRouter } from "next/navigation"
import { LoadingScreen } from "@/components/level1/Loading"
import { useMounted } from "@/hooks/helpers/use-mounted"
import { AppInput, AppInputTextarea } from "@/components/level1/antd/AppInput"
import { AppSelect } from "@/components/level1/antd/AppSelect"
import { TranslationService } from "@/service/translation/index.service"

export const tagOptions = [
  "Working",
  "Social",
  "School",
  "Family",
  "Travel",
  "Health",
  "Technology",
  "Entertainment",
  "Relationships",
  "Hobbies",
  "Finance",
  "Culture",
  "Food",
  "Environment",
  "Fashion",
  "Sports",
  "Personal Development",
  "Challenges",
  "Pets",
  "Mindfulness",
  "Other",
]
export type ImageBots = { image: string }
export const imageBots: string[] = [
  "/images/bot/8.jpeg",
  "/images/bot/1.jpeg",
  "/images/bot/2.jpeg",
  "/images/bot/3.jpeg",
  "/images/bot/4.jpeg",
  "/images/bot/5.jpeg",
  "/images/bot/6.jpeg",
  "/images/bot/7.jpeg",
  "/images/bot/cat.jpeg",
  "/images/bot/dog.jpeg",
  "/images/bot/gau.jpeg",
]
interface CreateScenarioProps {
  scenario?: ScenarioInterface
}

export const CreateScenario: FC<CreateScenarioProps> = ({ scenario }) => {
  const isMounted = useMounted()
  const [botImage, setBotImage] = useState("/bot_placeholder.png")
  const [isLoading, setIsLoading] = useState(false)
  const [textTranslating, setTextTranslating] = useState("")
  const router = useRouter()

  console.log(botImage)
  const nameRef = useRef<HTMLInputElement>()

  const [form] = Form.useForm<ScenarioInterface>()

  const history = useRouter()

  const handleCancel = () => {
    history.back()
  }

  const onFinish = (values: ScenarioInterface) => {
    if (isLoading) return
    setIsLoading(true)

    BotService.create({ ...(scenario ?? {}), ...values, botImage })
      .then(() => {
        message.success("Success")
        router.push("/")
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  const translate = (field: keyof ScenarioInterface) => {
    const value = form.getFieldValue(field)?.trim()

    setTextTranslating(value)
    if (!value) return
    if (textTranslating === value) return

    TranslationService.translate(value, "", "en").then((result) => {
      form.setFieldValue(field, result)
    })
  }

  useEffect(() => {
    if (!scenario) return
    nameRef.current?.focus()

    setBotImage(scenario.botImage)
    form.setFieldsValue({
      name: scenario.name,
      tags: scenario.tags,
      public: scenario.public,
      assistantInstruction: scenario.assistantInstruction,
      userInstruction: scenario.userInstruction,
      assistantFirstMessage: scenario.assistantFirstMessage,
    })
  }, [form, scenario])

  if (!isMounted) return <LoadingScreen noLogo />

  return (
    <div className="container max-w-4xl my-0 mx-auto">
      <div className="p-4">
        <div>
          <div className="flex items-center justify-center mb-4">
            <ImageUpload
              value={botImage}
              onChange={(src: string) => setBotImage(src)}
            />
          </div>
          <div className="flex items-center justify-center gap-2 mb-7">
            {imageBots.map((item, index) => {
              return (
                <div
                  key={index}
                  className={`${
                    botImage === item
                      ? "border-2 rounded-lg px-1 py-1 border-blue-400"
                      : ""
                  }`}
                  onClick={() => {
                    setBotImage(item)
                  }}
                >
                  <img className="h-16 w-16" src={item} alt="upload1" />
                </div>
              )
            })}
          </div>
        </div>

        <Form<ScenarioInterface>
          onFinish={onFinish}
          className="grid gap-2"
          layout="vertical"
          requiredMark="optional"
          form={form}
          onValuesChange={(changedValue, values) => {
            if (changedValue.tags && changedValue.tags.length > 0) {
              form.setFieldValue(
                "tags",
                (changedValue.tags as string[]).slice(0, 3)
              )
            }
          }}
        >
          <Form.Item<ScenarioInterface>
            label={
              <span>
                Name of the sutiation
                <i
                  onClick={() => translate("name")}
                  className="fa-regular fa-language cursor-pointer ml-1"
                ></i>
              </span>
            }
            name="name"
            rules={[
              { required: true, message: "" },
              { min: 10, message: "Name must be at least 10 characters" },
            ]}
          >
            <AppInput
              ref={nameRef as any}
              min={10}
              max={50}
              placeholder="e.g. Introduce yourself to a foreigner"
            />
          </Form.Item>

          <Form.Item<ScenarioInterface>
            label={
              <span>
                Description
                <i
                  onClick={() => translate("userInstruction")}
                  className="fa-regular fa-language cursor-pointer ml-1"
                ></i>
              </span>
            }
            name="userInstruction"
            help="Describe briefly the situation and your role in the situation."
            rules={[{ required: true, message: "" }]}
          >
            <Input.TextArea
              maxLength={400}
              placeholder="e.g. In class, there's a friend from the United States. Introduce yourself and make friends with him."
            />
          </Form.Item>

          <div className="grid grid-cols-2 gap-4">
            <Form.Item<ScenarioInterface> label="Tags" name="tags">
              <AppSelect
                mode="multiple"
                allowClear
                placeholder="Select tags"
                maxLength={3}
                options={tagOptions.map((t) => ({ value: t, label: t }))}
              />
            </Form.Item>

            <Form.Item<ScenarioInterface>
              label="Public access"
              name="public"
              initialValue={true}
            >
              <AppSelect
                placeholder="Select tags"
                options={[
                  { value: false as any, label: "Private" },
                  { value: true, label: "Public" },
                ]}
              />
            </Form.Item>
          </div>

          <Form.Item<ScenarioInterface>
            label={
              <span>
                Bot instruction
                <i
                  onClick={() => translate("assistantInstruction")}
                  className="fa-regular fa-language cursor-pointer ml-1"
                ></i>
              </span>
            }
            name="assistantInstruction"
            help="Describe in detail about the bot (name, hobbies, personality, etc.), the bot's task (how it should act, what it should ask, etc.) in the situation."
            rules={[{ required: true, message: "" }]}
          >
            <AppInputTextarea
              rows={5}
              placeholder="e.g. Since you're from the United States and the user wants to introduce themselves and make friends with you, you should ask the user to introduce themselves and inquire about their information."
            />
          </Form.Item>

          <Form.Item<ScenarioInterface>
            label={
              <span>
                Greeting message
                <i
                  onClick={() => translate("assistantFirstMessage")}
                  className="fa-regular fa-language cursor-pointer ml-1"
                ></i>
              </span>
            }
            name="assistantFirstMessage"
            help="The bot will send this message at the beginning of every conversation."
          >
            <AppInput placeholder="e.g. Hello! What's your name?" />
          </Form.Item>
          <div className="flex gap-2 justify-center">
            {scenario && (
              <button
                type="button"
                onClick={handleCancel}
                className="border mt-2 rounded-lg text-base border-gray-400 w-[80px] h-[40px]"
              >
                Cancel
              </button>
            )}
            <Form.Item<ScenarioInterface> className="flex justify-center mt-2">
              <AppButton
                htmlType="submit"
                className="inline-flex !h-10"
                size="large"
                icon={
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-4 h-4"
                  >
                    <path d="m21.64 3.64-1.28-1.28a1.21 1.21 0 0 0-1.72 0L2.36 18.64a1.21 1.21 0 0 0 0 1.72l1.28 1.28a1.2 1.2 0 0 0 1.72 0L21.64 5.36a1.2 1.2 0 0 0 0-1.72Z"></path>
                    <path d="m14 7 3 3"></path>
                    <path d="M5 6v4"></path>
                    <path d="M19 14v4"></path>
                    <path d="M10 2v2"></path>
                    <path d="M7 8H3"></path>
                    <path d="M21 16h-4"></path>
                    <path d="M11 3H9"></path>
                  </svg>
                }
                loading={isLoading}
              >
                {scenario ? "Update" : "Create"} your Situation
              </AppButton>
            </Form.Item>
          </div>
        </Form>
      </div>
    </div>
  )
}
