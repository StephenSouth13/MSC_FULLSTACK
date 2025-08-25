"use client"

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Alert, AlertDescription } from '@/components/ui/alert'
import TiptapEditor from '@/components/editor/TiptapEditor'
import { generateSlug } from '@/lib/utils'
import { CreateCourseRequest, Course } from '@/types'

const courseSchema = z.object({
  title: z.string().min(1, 'Tiêu đề là bắt buộc'),
  slug: z.string().min(1, 'Slug là bắt buộc'),
  description: z.string().optional(),
  thumbnail_url: z.string().url().optional().or(z.literal('')),
  category: z.string().optional(),
  status: z.enum(['draft', 'pending_review', 'published', 'archived']).default('draft'),
})

type CourseFormData = z.infer<typeof courseSchema>

interface CourseFormProps {
  course?: Course
  onSubmit: (data: CreateCourseRequest) => Promise<void>
  loading?: boolean
  userRole?: string
}

export default function CourseForm({ course, onSubmit, loading = false, userRole }: CourseFormProps) {
  const [description, setDescription] = useState(course?.description || '')
  const [error, setError] = useState('')

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<CourseFormData>({
    resolver: zodResolver(courseSchema),
    defaultValues: {
      title: course?.title || '',
      slug: course?.slug || '',
      description: course?.description || '',
      thumbnail_url: course?.thumbnail_url || '',
      category: course?.category || '',
      status: course?.status || (userRole === 'partner' ? 'pending_review' : 'draft'),
    },
  })

  const watchTitle = watch('title')

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value
    setValue('title', title)
    
    // Auto-generate slug if this is a new course
    if (!course) {
      const slug = generateSlug(title)
      setValue('slug', slug)
    }
  }

  const handleFormSubmit = async (data: CourseFormData) => {
    try {
      setError('')
      await onSubmit({
        ...data,
        description,
      })
    } catch (err: any) {
      setError(err.message || 'Có lỗi xảy ra')
    }
  }

  const statusOptions = [
    { value: 'draft', label: 'Bản nháp' },
    { value: 'pending_review', label: 'Chờ phê duyệt' },
    { value: 'published', label: 'Đã xuất bản' },
    { value: 'archived', label: 'Đã lưu trữ' },
  ]

  // Filter status options based on user role
  const availableStatusOptions = statusOptions.filter(option => {
    if (userRole === 'partner') {
      return ['draft', 'pending_review'].includes(option.value)
    }
    return true
  })

  return (
    <Card>
      <CardHeader>
        <CardTitle>{course ? 'Chỉnh sửa khóa học' : 'Tạo khóa học mới'}</CardTitle>
        <CardDescription>
          {course ? 'Cập nhật thông tin khóa học' : 'Nhập thông tin để tạo khóa học mới'}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="title">Tiêu đề khóa học *</Label>
              <Input
                id="title"
                {...register('title')}
                onChange={handleTitleChange}
                placeholder="Nhập tiêu đề khóa học"
                disabled={loading}
              />
              {errors.title && (
                <p className="text-sm text-destructive">{errors.title.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="slug">Slug *</Label>
              <Input
                id="slug"
                {...register('slug')}
                placeholder="khoa-hoc-slug"
                disabled={loading}
              />
              {errors.slug && (
                <p className="text-sm text-destructive">{errors.slug.message}</p>
              )}
              <p className="text-xs text-muted-foreground">
                URL thân thiện cho khóa học
              </p>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="category">Danh mục</Label>
              <Input
                id="category"
                {...register('category')}
                placeholder="Ví dụ: Lập trình, Thiết kế..."
                disabled={loading}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="status">Trạng thái</Label>
              <Select 
                defaultValue={course?.status || (userRole === 'partner' ? 'pending_review' : 'draft')}
                onValueChange={(value) => setValue('status', value as any)}
                disabled={loading}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Chọn trạng thái" />
                </SelectTrigger>
                <SelectContent>
                  {availableStatusOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="thumbnail_url">URL hình ảnh thumbnail</Label>
            <Input
              id="thumbnail_url"
              {...register('thumbnail_url')}
              placeholder="https://example.com/image.jpg"
              disabled={loading}
            />
            {errors.thumbnail_url && (
              <p className="text-sm text-destructive">{errors.thumbnail_url.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label>Mô tả khóa học</Label>
            <TiptapEditor
              content={description}
              onChange={setDescription}
              placeholder="Nhập mô tả chi tiết về khóa học..."
              editable={!loading}
            />
          </div>

          <div className="flex justify-end space-x-4">
            <Button type="button" variant="outline" disabled={loading}>
              Hủy
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? 'Đang xử lý...' : course ? 'Cập nhật' : 'Tạo khóa học'}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
