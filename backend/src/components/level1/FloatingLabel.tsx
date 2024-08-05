import {
  FC,
  ForwardRefExoticComponent,
  RefAttributes,
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react'
import { Form, FormInstance, FormItemProps, Input, InputProps, InputRef } from 'antd'

interface IProps extends FormItemProps {
  form: FormInstance
  type?: 'password'
  inputProps?: InputProps
}

// eslint-disable-next-line react/display-name
export const FloatingLabel: ForwardRefExoticComponent<IProps & RefAttributes<InputRef>> = forwardRef(
  ({ children, form, label, type, inputProps = {}, ...props }: IProps, ref: any) => {
    const { name = '' } = props
    const [focus, setFocus] = useState(false)
    const value = Form.useWatch(name, form)
    const labelClass = focus || value ? 'float' : ''

    const customInputProps: InputProps = {
      size: 'large',
      onBlur: () => setFocus(false),
      onFocus: () => setFocus(true),
      ...inputProps,
    }

    const inputRef: any = useRef(null)

    useImperativeHandle(ref, () => ({
      focus: () => inputRef.current?.focus(),
    }))

    useEffect(() => {
      if (inputProps.autoFocus) {
        setTimeout(() => {
          inputRef.current?.focus()
        }, 200)
      }
    }, [inputProps.autoFocus])

    return (
      <Form.Item className={`floating-label ${labelClass}`} label={label} {...props}>
        {type === 'password' ? (
          <Input.Password {...customInputProps} iconRender={iconRenderInputPassword} />
        ) : (
          <Input {...customInputProps} ref={inputRef} />
        )}
      </Form.Item>
    )
  }
)
const iconRenderInputPassword = (visible: boolean) => (
  <span>
    <i className={`fa-regular ${visible ? 'fa-eye' : 'fa-eye-slash'} text-secondary text-sm`} />
  </span>
)
