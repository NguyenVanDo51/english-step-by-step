import React from "react"
import { Form, Input, Button, Select, Space } from "antd"
import { PlusOutlined, MinusCircleOutlined } from "@ant-design/icons"
import { CKEditor } from "@ckeditor/ckeditor5-react"
import {
  ClassicEditor,
  Bold,
  Essentials,
  Heading,
  Indent,
  IndentBlock,
  Italic,
  Link,
  List,
  MediaEmbed,
  Paragraph,
  Table,
  Undo,
} from "ckeditor5"
const { TextArea } = Input
const { Option } = Select

import "ckeditor5/ckeditor5.css"

export const CKEditorFormItem = ({ value = "", onChange }: any) => (
  <CKEditor
    editor={ClassicEditor}
    config={{
      toolbar: [
        "undo",
        "redo",
        "|",
        "heading",
        "|",
        "bold",
        "italic",
        "|",
        "link",
        "insertTable",
        "mediaEmbed",
        "|",
        "bulletedList",
        "numberedList",
        "indent",
        "outdent",
      ],
      plugins: [
        Bold,
        Essentials,
        Heading,
        Indent,
        IndentBlock,
        Italic,
        Link,
        List,
        MediaEmbed,
        Paragraph,
        Table,
        Undo,
      ],
      initialData: value,
    }}
    data={value}
    onChange={(event, editor) => {
      const data = editor.getData()
      onChange(data)
    }}
  />
)
