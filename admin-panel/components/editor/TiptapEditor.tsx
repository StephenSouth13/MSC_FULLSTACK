"use client"

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Image from '@tiptap/extension-image'
import Link from '@tiptap/extension-link'
import TextAlign from '@tiptap/extension-text-align'
import Underline from '@tiptap/extension-underline'
import TextStyle from '@tiptap/extension-text-style'
import Color from '@tiptap/extension-color'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import {
  Bold,
  Italic,
  Underline as UnderlineIcon,
  Strikethrough,
  Code,
  Heading1,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  Quote,
  Undo,
  Redo,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  ImageIcon,
  LinkIcon,
  Unlink
} from 'lucide-react'

interface TiptapEditorProps {
  content: string
  onChange: (content: string) => void
  placeholder?: string
  editable?: boolean
}

export default function TiptapEditor({ 
  content, 
  onChange, 
  placeholder = "Nhập nội dung...",
  editable = true 
}: TiptapEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Image.configure({
        allowBase64: true,
        HTMLAttributes: {
          class: 'max-w-full h-auto rounded-lg my-4',
        },
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: 'text-blue-600 hover:text-blue-800 underline',
        },
      }),
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      Underline,
      TextStyle,
      Color,
    ],
    content,
    editable,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML())
    },
    editorProps: {
      attributes: {
        class: 'prose prose-sm sm:prose lg:prose-lg xl:prose-2xl mx-auto focus:outline-none tiptap',
        'data-placeholder': placeholder,
      },
    },
  })

  if (!editor) {
    return null
  }

  const addImage = () => {
    const url = window.prompt('Nhập URL hình ảnh:')
    if (url) {
      editor.chain().focus().setImage({ src: url }).run()
    }
  }

  const setLink = () => {
    const previousUrl = editor.getAttributes('link').href
    const url = window.prompt('Nhập URL liên kết:', previousUrl)

    if (url === null) {
      return
    }

    if (url === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink().run()
      return
    }

    editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run()
  }

  const toolbarButtons = [
    {
      icon: Bold,
      action: () => editor.chain().focus().toggleBold().run(),
      isActive: editor.isActive('bold'),
      label: 'Bold'
    },
    {
      icon: Italic,
      action: () => editor.chain().focus().toggleItalic().run(),
      isActive: editor.isActive('italic'),
      label: 'Italic'
    },
    {
      icon: UnderlineIcon,
      action: () => editor.chain().focus().toggleUnderline().run(),
      isActive: editor.isActive('underline'),
      label: 'Underline'
    },
    {
      icon: Strikethrough,
      action: () => editor.chain().focus().toggleStrike().run(),
      isActive: editor.isActive('strike'),
      label: 'Strikethrough'
    },
    {
      icon: Code,
      action: () => editor.chain().focus().toggleCode().run(),
      isActive: editor.isActive('code'),
      label: 'Code'
    },
  ]

  const headingButtons = [
    {
      icon: Heading1,
      action: () => editor.chain().focus().toggleHeading({ level: 1 }).run(),
      isActive: editor.isActive('heading', { level: 1 }),
      label: 'Heading 1'
    },
    {
      icon: Heading2,
      action: () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
      isActive: editor.isActive('heading', { level: 2 }),
      label: 'Heading 2'
    },
    {
      icon: Heading3,
      action: () => editor.chain().focus().toggleHeading({ level: 3 }).run(),
      isActive: editor.isActive('heading', { level: 3 }),
      label: 'Heading 3'
    },
  ]

  const listButtons = [
    {
      icon: List,
      action: () => editor.chain().focus().toggleBulletList().run(),
      isActive: editor.isActive('bulletList'),
      label: 'Bullet List'
    },
    {
      icon: ListOrdered,
      action: () => editor.chain().focus().toggleOrderedList().run(),
      isActive: editor.isActive('orderedList'),
      label: 'Ordered List'
    },
    {
      icon: Quote,
      action: () => editor.chain().focus().toggleBlockquote().run(),
      isActive: editor.isActive('blockquote'),
      label: 'Blockquote'
    },
  ]

  const alignButtons = [
    {
      icon: AlignLeft,
      action: () => editor.chain().focus().setTextAlign('left').run(),
      isActive: editor.isActive({ textAlign: 'left' }),
      label: 'Align Left'
    },
    {
      icon: AlignCenter,
      action: () => editor.chain().focus().setTextAlign('center').run(),
      isActive: editor.isActive({ textAlign: 'center' }),
      label: 'Align Center'
    },
    {
      icon: AlignRight,
      action: () => editor.chain().focus().setTextAlign('right').run(),
      isActive: editor.isActive({ textAlign: 'right' }),
      label: 'Align Right'
    },
    {
      icon: AlignJustify,
      action: () => editor.chain().focus().setTextAlign('justify').run(),
      isActive: editor.isActive({ textAlign: 'justify' }),
      label: 'Align Justify'
    },
  ]

  const utilityButtons = [
    {
      icon: ImageIcon,
      action: addImage,
      isActive: false,
      label: 'Add Image'
    },
    {
      icon: LinkIcon,
      action: setLink,
      isActive: editor.isActive('link'),
      label: 'Add Link'
    },
    {
      icon: Unlink,
      action: () => editor.chain().focus().unsetLink().run(),
      isActive: false,
      label: 'Remove Link',
      disabled: !editor.isActive('link')
    },
  ]

  const historyButtons = [
    {
      icon: Undo,
      action: () => editor.chain().focus().undo().run(),
      isActive: false,
      label: 'Undo',
      disabled: !editor.can().undo()
    },
    {
      icon: Redo,
      action: () => editor.chain().focus().redo().run(),
      isActive: false,
      label: 'Redo',
      disabled: !editor.can().redo()
    },
  ]

  if (!editable) {
    return (
      <div className="border rounded-lg p-4">
        <EditorContent editor={editor} />
      </div>
    )
  }

  return (
    <div className="border rounded-lg">
      {/* Toolbar */}
      <div className="border-b p-2 flex flex-wrap items-center gap-1">
        {/* Text Formatting */}
        {toolbarButtons.map((button, index) => (
          <Button
            key={index}
            variant={button.isActive ? "default" : "ghost"}
            size="sm"
            onClick={button.action}
            title={button.label}
            className="h-8 w-8 p-0"
          >
            <button.icon className="h-4 w-4" />
          </Button>
        ))}

        <Separator orientation="vertical" className="h-6 mx-1" />

        {/* Headings */}
        {headingButtons.map((button, index) => (
          <Button
            key={index}
            variant={button.isActive ? "default" : "ghost"}
            size="sm"
            onClick={button.action}
            title={button.label}
            className="h-8 w-8 p-0"
          >
            <button.icon className="h-4 w-4" />
          </Button>
        ))}

        <Separator orientation="vertical" className="h-6 mx-1" />

        {/* Lists */}
        {listButtons.map((button, index) => (
          <Button
            key={index}
            variant={button.isActive ? "default" : "ghost"}
            size="sm"
            onClick={button.action}
            title={button.label}
            className="h-8 w-8 p-0"
          >
            <button.icon className="h-4 w-4" />
          </Button>
        ))}

        <Separator orientation="vertical" className="h-6 mx-1" />

        {/* Alignment */}
        {alignButtons.map((button, index) => (
          <Button
            key={index}
            variant={button.isActive ? "default" : "ghost"}
            size="sm"
            onClick={button.action}
            title={button.label}
            className="h-8 w-8 p-0"
          >
            <button.icon className="h-4 w-4" />
          </Button>
        ))}

        <Separator orientation="vertical" className="h-6 mx-1" />

        {/* Utilities */}
        {utilityButtons.map((button, index) => (
          <Button
            key={index}
            variant={button.isActive ? "default" : "ghost"}
            size="sm"
            onClick={button.action}
            title={button.label}
            className="h-8 w-8 p-0"
            disabled={button.disabled}
          >
            <button.icon className="h-4 w-4" />
          </Button>
        ))}

        <Separator orientation="vertical" className="h-6 mx-1" />

        {/* History */}
        {historyButtons.map((button, index) => (
          <Button
            key={index}
            variant="ghost"
            size="sm"
            onClick={button.action}
            title={button.label}
            className="h-8 w-8 p-0"
            disabled={button.disabled}
          >
            <button.icon className="h-4 w-4" />
          </Button>
        ))}
      </div>

      {/* Editor Content */}
      <div className="p-4">
        <EditorContent editor={editor} />
      </div>
    </div>
  )
}
