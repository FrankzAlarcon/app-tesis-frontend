import '../app/globals.css'

import { Color } from '@tiptap/extension-color'
import ListItem from '@tiptap/extension-list-item'
import TextStyle from '@tiptap/extension-text-style'
import { EditorProvider, useCurrentEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import React from 'react'
import { Button } from './ui/button'
import { Bold, Code, Italic, List, ListOrdered, Redo, TextQuote, Undo } from 'lucide-react'
import { cn } from '@/lib/utils'

const MenuBar = () => {
  const { editor } = useCurrentEditor()

  if (!editor) {
    return null
  }

  return (
    <div className='border-b'>
      <Button
        size='xs'
        variant='ghost'
        onClick={() => editor.chain().focus().undo().run()}
        disabled={
          !editor.can()
            .chain()
            .focus()
            .undo()
            .run()
        }
      >
        <Undo className='w-4 h-4' />
      </Button>
      <Button
        size='xs'
        variant='ghost'
        onClick={() => editor.chain().focus().redo().run()}
        disabled={
          !editor.can()
            .chain()
            .focus()
            .redo()
            .run()
        }
      >
        <Redo className='w-4 h-4' />
      </Button>
      <Button
        size='xs'
        variant='ghost'
        onClick={() => editor.chain().focus().toggleBold().run()}
        disabled={
          !editor.can()
            .chain()
            .focus()
            .toggleBold()
            .run()
        }
        className={cn(editor.isActive('bold') && 'bg-gray-200')}
      >
        <Bold className='w-4 h-4' />
      </Button>
      <Button
        size='xs'
        variant='ghost'
        onClick={() => editor.chain().focus().toggleItalic().run()}
        disabled={
          !editor.can()
            .chain()
            .focus()
            .toggleItalic()
            .run()
        }
        className={cn(editor.isActive('italic') && 'bg-gray-200')}
      >
        <Italic className='w-4 h-4' />
      </Button>
      
      <Button
        size='xs'
        variant='ghost'
        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        disabled={
          !editor.can()
            .chain()
            .focus()
            .toggleCodeBlock()
            .run()
        }
        className={cn(editor.isActive('code') && 'bg-gray-200')}
      >
        <Code className='w-4 h-4' />
      </Button>
      <Button
        size='xs'
        variant='ghost'
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={cn(editor.isActive('bulletList') && 'bg-gray-200')}
      >
        <List className='w-4 h-4' />
      </Button>
      <Button
        size='xs'
        variant='ghost'
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={cn(editor.isActive('orderedList') && 'bg-gray-200')}
      >
        <ListOrdered className='w-4 h-4' />
      </Button>
      <Button
        size='xs'
        variant='ghost'
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        className={cn(editor.isActive('blockquote') && 'bg-gray-200')}
      >
        <TextQuote className='w-4 h-4' />
      </Button>
      <Button
        size='xs'
        variant='ghost'
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        className={cn(editor.isActive('heading', { level: 1 }) && 'bg-gray-200')}
      >
        h1
      </Button>
      <Button
        size='xs'
        variant='ghost'
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={cn(editor.isActive('heading', { level: 2 }) && 'bg-gray-200')}
      >
        h2
      </Button>
      <Button
        size='xs'
        variant='ghost'
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        className={cn(editor.isActive('heading', { level: 3 }) && 'bg-gray-200')}
      >
        h3
      </Button>
    </div>
  )
}

const extensions = [
  Color.configure({ types: [TextStyle.name, ListItem.name] }),
  // TextStyle.configure({ types: [ListItem.name] }),
  StarterKit.configure({
    bulletList: {
      keepMarks: true,
      keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
    },
    orderedList: {
      keepMarks: true,
      keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
    },
  }),
]


interface TipTapEditorProps {
  content?: string
}

const TipTapEditor = ({
  content
}: TipTapEditorProps) => {
  return (
    <div className='shadow-md border'>
      <EditorProvider   slotBefore={<MenuBar />} extensions={extensions} content={content}></EditorProvider>
    </div>
  )
}

export default TipTapEditor