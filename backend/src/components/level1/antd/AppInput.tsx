"use client"

import {
  FC,
  ForwardRefExoticComponent,
  MutableRefObject,
  ReactNode,
  RefAttributes,
  forwardRef,
  useEffect,
  useMemo,
} from "react"
import { Input, InputProps, InputRef } from "antd"
import { TextAreaProps, TextAreaRef } from "antd/lib/input/TextArea"
import { uniqueId } from "lodash"

interface IProps extends InputProps {
  onEnter?: () => void
}

// eslint-disable-next-line react/display-name
export const AppInput: ForwardRefExoticComponent<
  IProps & RefAttributes<InputRef>
> = forwardRef(function a(
  { onEnter, size = "large", className = "", ...props }: IProps,
  ref: any
) {
  return (
    <Input
      ref={ref}
      size={size}
      placeholder="Please type"
      className={`${className}`}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          onEnter?.()
        }
      }}
      {...props}
    />
  )
})

interface TextArea extends TextAreaProps {
  onEnter?: () => void
}

export const AppInputTextarea: ForwardRefExoticComponent<
  TextArea & RefAttributes<any>
> = forwardRef(function TextArea(
  { onEnter, size = "large", className = "", ...props }: TextArea,
  ref: any
) {
  return (
    <Input.TextArea
      ref={ref}
      size={size}
      placeholder="Please type"
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          onEnter?.()
        }
      }}
      {...props}
    />
  )
})
