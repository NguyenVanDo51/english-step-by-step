"use client"
import { LoadingScreen } from "@/components/level1/Loading"
import { AppSelect } from "@/components/level1/antd/AppSelect"
import { useMounted } from "@/hooks/helpers/use-mounted"
import { useSettings } from "@/hooks/helpers/use-settings"
import { ISetting, SettingLangMapping, SettingLangEnum } from "@/types/setting"
import { Form, Switch } from "antd"
import { useEffect } from "react"

export const SettingTemplate = () => {
  const { settings, setSettings, isLoading } = useSettings()
  const isMounted = useMounted()
  const [form] = Form.useForm()

  useEffect(() => {
    form.setFieldsValue(settings)
  }, [form, settings])

  if (!isMounted) {
    return <LoadingScreen noLogo />
  }

  return (
    <Form<ISetting>
      labelCol={{ flex: "160px" }}
      onValuesChange={(changedValues = {}) => {
        setSettings({ ...settings, ...changedValues })
      }}
      form={form}
    >
      <Form.Item<ISetting> label="Your native language" name="lang">
        <AppSelect
          options={Object.keys(SettingLangMapping).map((key) => ({
            value: key,
            label: SettingLangMapping[key as SettingLangEnum],
          }))}
          className="w-fit"
          size="middle"
        />
      </Form.Item>

      {/* <Form.Item<ISetting> label="Autiomation mode" shouldUpdate>
        <Switch
          className="bg-[rgba(0,0,0,0.45)]"
          checked={settings.automationMode}
          onChange={(checked) =>
            setSettings({ ...settings, automationMode: checked })
          }
        />
      </Form.Item> */}
    </Form>
  )
}
