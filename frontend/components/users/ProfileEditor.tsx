"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { X, Save, Upload, Camera, MapPin, Globe, Phone, Briefcase, User } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

interface ProfileEditorProps {
  user: any
  onClose: () => void
  onSave: (user: any) => void
}

const ProfileEditor = ({ user, onClose, onSave }: ProfileEditorProps) => {
  const [isLoading, setIsLoading] = useState(false)
  const [profileData, setProfileData] = useState({
    fullName: user.fullName,
    bio: user.bio || "",
    location: user.location || "",
    website: user.website || "",
    phone: user.phone || "",
    occupation: user.occupation || "",
    company: user.company || "",
    skills: user.skills || [],
    interests: user.interests || [],
  })
  const [newSkill, setNewSkill] = useState("")
  const [newInterest, setNewInterest] = useState("")

  const handleSave = async () => {
    setIsLoading(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      onSave({
        ...user,
        ...profileData,
      })
    } catch (error) {
      console.error("Error saving profile:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const addSkill = () => {
    if (newSkill.trim() && !profileData.skills.includes(newSkill.trim())) {
      setProfileData({
        ...profileData,
        skills: [...profileData.skills, newSkill.trim()],
      })
      setNewSkill("")
    }
  }

  const removeSkill = (skill: string) => {
    setProfileData({
      ...profileData,
      // FIX 1: Explicitly type 's' as string
      skills: profileData.skills.filter((s: string) => s !== skill),
    })
  }

  const addInterest = () => {
    if (newInterest.trim() && !profileData.interests.includes(newInterest.trim())) {
      setProfileData({
        ...profileData,
        interests: [...profileData.interests, newInterest.trim()],
      })
      setNewInterest("")
    }
  }

  const removeInterest = (interest: string) => {
    setProfileData({
      ...profileData,
      // FIX 2: Explicitly type 'i' as string
      interests: profileData.interests.filter((i: string) => i !== interest),
    })
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <Card className="border-0 shadow-none">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5 text-blue-600" />
              Chỉnh sửa hồ sơ
            </CardTitle>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Avatar Section */}
            <div className="flex items-center gap-4">
              <div className="relative">
                <Avatar className="h-20 w-20">
                  <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.fullName} />
                  <AvatarFallback className="text-lg">
                    {user.fullName
                      .split(" ")
                      .map((n: string) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <Button size="sm" className="absolute -bottom-1 -right-1 rounded-full h-7 w-7 p-0">
                  <Camera className="h-3 w-3" />
                </Button>
              </div>
              <div>
                <h3 className="font-medium">{user.fullName}</h3>
                <p className="text-sm text-gray-600">{user.email}</p>
                <Button variant="outline" size="sm" className="mt-2 bg-transparent">
                  <Upload className="h-4 w-4 mr-2" />
                  Thay đổi ảnh
                </Button>
              </div>
            </div>

            {/* Basic Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="fullName">Họ và tên</Label>
                <Input
                  id="fullName"
                  value={profileData.fullName}
                  onChange={(e) => setProfileData({ ...profileData, fullName: e.target.value })}
                  placeholder="Nhập họ và tên"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Số điện thoại</Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    id="phone"
                    value={profileData.phone}
                    onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                    placeholder="Nhập số điện thoại"
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="occupation">Nghề nghiệp</Label>
                <div className="relative">
                  <Briefcase className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    id="occupation"
                    value={profileData.occupation}
                    onChange={(e) => setProfileData({ ...profileData, occupation: e.target.value })}
                    placeholder="Nhập nghề nghiệp"
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="company">Công ty</Label>
                <Input
                  id="company"
                  value={profileData.company}
                  onChange={(e) => setProfileData({ ...profileData, company: e.target.value })}
                  placeholder="Nhập tên công ty"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="location">Địa chỉ</Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    id="location"
                    value={profileData.location}
                    onChange={(e) => setProfileData({ ...profileData, location: e.target.value })}
                    placeholder="Nhập địa chỉ"
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="website">Website</Label>
                <div className="relative">
                  <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    id="website"
                    value={profileData.website}
                    onChange={(e) => setProfileData({ ...profileData, website: e.target.value })}
                    placeholder="https://example.com"
                    className="pl-10"
                  />
                </div>
              </div>
            </div>

            {/* Bio */}
            <div className="space-y-2">
              <Label htmlFor="bio">Giới thiệu bản thân</Label>
              <Textarea
                id="bio"
                value={profileData.bio}
                onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })}
                placeholder="Viết vài dòng giới thiệu về bản thân..."
                rows={4}
                maxLength={500}
              />
              <p className="text-sm text-gray-500">{profileData.bio.length}/500 ký tự</p>
            </div>

            {/* Skills */}
            <div className="space-y-3">
              <Label>Kỹ năng</Label>
              <div className="flex gap-2">
                <Input
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  placeholder="Thêm kỹ năng mới"
                  onKeyPress={(e) => e.key === "Enter" && addSkill()}
                />
                <Button type="button" onClick={addSkill} variant="outline">
                  Thêm
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {/* FIX 3: Explicitly type 'skill' as string */}
                {profileData.skills.map((skill: string) => (
                  <Badge key={skill} variant="secondary" className="cursor-pointer hover:bg-red-100">
                    {skill}
                    <X className="h-3 w-3 ml-1" onClick={() => removeSkill(skill)} />
                  </Badge>
                ))}
              </div>
            </div>

            {/* Interests */}
            <div className="space-y-3">
              <Label>Sở thích</Label>
              <div className="flex gap-2">
                <Input
                  value={newInterest}
                  onChange={(e) => setNewInterest(e.target.value)}
                  placeholder="Thêm sở thích mới"
                  onKeyPress={(e) => e.key === "Enter" && addInterest()}
                />
                <Button type="button" onClick={addInterest} variant="outline">
                  Thêm
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {/* FIX 4: Explicitly type 'interest' as string */}
                {profileData.interests.map((interest: string) => (
                  <Badge key={interest} variant="outline" className="cursor-pointer hover:bg-red-100">
                    {interest}
                    <X className="h-3 w-3 ml-1" onClick={() => removeInterest(interest)} />
                  </Badge>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-4">
              <Button onClick={handleSave} disabled={isLoading} className="flex-1 btn-primary">
                {isLoading ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                    className="h-4 w-4 border-2 border-white border-t-transparent rounded-full mr-2"
                  />
                ) : (
                  <Save className="h-4 w-4 mr-2" />
                )}
                {isLoading ? "Đang lưu..." : "Lưu thay đổi"}
              </Button>
              <Button variant="outline" onClick={onClose} className="flex-1 bg-transparent">
                Hủy
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  )
}

export default ProfileEditor