"use client"

import { useState, useRef } from "react"
import { Save, User, Lock, Bell, Eye, EyeOff, Globe, Database, Monitor, Moon, Sun, Laptop, Check, Loader2 } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { 
  Toast,
  ToastAction,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport 
} from "@/components/ui/toast"
import { useToast } from "@/components/ui/use-toast"

export default function SettingsPage() {
  const { toast } = useToast()
  const fileInputRef = useRef<HTMLInputElement>(null)
  
  // Profile state
  const [profileData, setProfileData] = useState({
    firstName: "Officer",
    lastName: "Patel",
    email: "officer.patel@nbi.gov.in",
    phone: "+91 98765 43210",
    designation: "Senior Intelligence Officer",
    bio: "Senior Intelligence Officer with 8 years of experience in narcotics investigation and digital intelligence gathering."
  })
  const [avatarSrc, setAvatarSrc] = useState("/placeholder.svg?height=96&width=96")
  
  // Security state
  const [currentPassword, setCurrentPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showCurrentPassword, setShowCurrentPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(true)
  const [autoLogoutTime, setAutoLogoutTime] = useState("15")
  
  // Notification state
  const [notifications, setNotifications] = useState({
    newSuspectAlerts: true,
    highRiskActivity: true,
    reportSubmissions: true,
    desktopNotifications: true,
    soundAlerts: false
  })
  
  // Appearance state
  const [theme, setTheme] = useState("system")
  const [language, setLanguage] = useState("en")
  
  // System state
  const [systemSettings, setSystemSettings] = useState({
    automaticBackup: true,
    dataRetentionPeriod: "365",
    ipRestriction: true,
    auditLogging: true
  })
  
  // Loading states
  const [isProfileSaving, setIsProfileSaving] = useState(false)
  const [isSecuritySaving, setIsSecuritySaving] = useState(false)
  const [isNotificationSaving, setIsNotificationSaving] = useState(false)
  const [isAppearanceSaving, setIsAppearanceSaving] = useState(false)
  const [isSystemSaving, setIsSystemSaving] = useState(false)

  // Profile functions
  const handleProfileChange = (field: string, value: string) => {
    setProfileData(prev => ({
      ...prev,
      [field]: value
    }))
  }
  
  const handleAvatarChange = () => {
    fileInputRef.current?.click()
  }
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setAvatarSrc(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }
  
  const handleProfileSave = async () => {
    setIsProfileSaving(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    setIsProfileSaving(false)
    toast({
      title: "Profile updated",
      description: "Your profile information has been updated successfully.",
      variant: "default"
    })
  }
  
  // Security functions
  const handlePasswordChange = async () => {
    // Validate passwords
    if (!currentPassword) {
      toast({
        title: "Error",
        description: "Current password is required",
        variant: "destructive"
      })
      return
    }
    
    if (newPassword.length < 8) {
      toast({
        title: "Error",
        description: "New password must be at least 8 characters",
        variant: "destructive"
      })
      return
    }
    
    if (newPassword !== confirmPassword) {
      toast({
        title: "Error",
        description: "New passwords do not match",
        variant: "destructive"
      })
      return
    }
    
    setIsSecuritySaving(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    setIsSecuritySaving(false)
    setCurrentPassword("")
    setNewPassword("")
    setConfirmPassword("")
    
    toast({
      title: "Password updated",
      description: "Your password has been changed successfully.",
      variant: "default"
    })
  }
  
  const handleSecuritySettingsSave = async () => {
    setIsSecuritySaving(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    setIsSecuritySaving(false)
    toast({
      title: "Security settings updated",
      description: "Your security settings have been saved.",
      variant: "default"
    })
  }
  
  // Notification functions
  const toggleNotification = (setting: string) => {
    setNotifications(prev => ({
      ...prev,
      [setting]: !prev[setting as keyof typeof prev]
    }))
  }
  
  const handleNotificationsSave = async () => {
    setIsNotificationSaving(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    setIsNotificationSaving(false)
    toast({
      title: "Notification settings updated",
      description: "Your notification preferences have been saved.",
      variant: "default"
    })
  }
  
  // Appearance functions
  const handleThemeChange = (newTheme: string) => {
    setTheme(newTheme)
    
    // In a real application, you might want to apply the theme immediately
    document.documentElement.classList.remove('light', 'dark')
    if (newTheme === 'light') document.documentElement.classList.add('light')
    if (newTheme === 'dark') document.documentElement.classList.add('dark')
  }
  
  const handleAppearanceSave = async () => {
    setIsAppearanceSaving(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    setIsAppearanceSaving(false)
    toast({
      title: "Appearance settings updated",
      description: "Your appearance preferences have been saved.",
      variant: "default"
    })
  }
  
  // System functions
  const toggleSystemSetting = (setting: string) => {
    setSystemSettings(prev => ({
      ...prev,
      [setting]: !prev[setting as keyof typeof prev]
    }))
  }
  
  const handleSystemSettingChange = (setting: string, value: string) => {
    setSystemSettings(prev => ({
      ...prev,
      [setting]: value
    }))
  }
  
  const handleSystemSettingsSave = async () => {
    setIsSystemSaving(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    setIsSystemSaving(false)
    toast({
      title: "System settings updated",
      description: "Your system settings have been saved.",
      variant: "default"
    })
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hidden file input for avatar upload */}
      <input 
        type="file" 
        ref={fileInputRef} 
        className="hidden" 
        accept="image/*" 
        onChange={handleFileChange}
      />
      
      <header className="bg-background border-b sticky top-0 z-10">
        <div className="flex h-16 items-center px-4 md:px-6 justify-between">
          <div className="flex items-center gap-4">
            <h1 className="text-xl font-semibold">Settings</h1>
          </div>
        </div>
      </header>

      <div className="flex-1 p-4 md:p-6 space-y-6">
        <div className="flex flex-col gap-1">
          <h2 className="text-2xl font-bold">System Settings</h2>
          <p className="text-muted-foreground">Manage your account and system preferences</p>
        </div>

        <Tabs defaultValue="profile" className="w-full">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="md:w-64 flex-shrink-0">
              <TabsList className="flex flex-col w-full h-auto p-0 bg-transparent space-y-1">
                <TabsTrigger value="profile" className="justify-start w-full px-3 py-2 h-9 font-normal">
                  <User className="h-4 w-4 mr-2" />
                  Profile
                </TabsTrigger>
                <TabsTrigger value="security" className="justify-start w-full px-3 py-2 h-9 font-normal">
                  <Lock className="h-4 w-4 mr-2" />
                  Security
                </TabsTrigger>
                <TabsTrigger value="notifications" className="justify-start w-full px-3 py-2 h-9 font-normal">
                  <Bell className="h-4 w-4 mr-2" />
                  Notifications
                </TabsTrigger>
                <TabsTrigger value="appearance" className="justify-start w-full px-3 py-2 h-9 font-normal">
                  <Monitor className="h-4 w-4 mr-2" />
                  Appearance
                </TabsTrigger>
                <TabsTrigger value="system" className="justify-start w-full px-3 py-2 h-9 font-normal">
                  <Database className="h-4 w-4 mr-2" />
                  System
                </TabsTrigger>
              </TabsList>
            </div>

            <div className="flex-1">
              <TabsContent value="profile" className="mt-0">
                <Card>
                  <CardHeader>
                    <CardTitle>Profile Settings</CardTitle>
                    <CardDescription>Manage your personal information</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex flex-col md:flex-row gap-6">
                      <div className="flex flex-col items-center gap-4">
                        <Avatar className="h-24 w-24">
                          <AvatarImage src={avatarSrc} alt="Profile" />
                          <AvatarFallback>OP</AvatarFallback>
                        </Avatar>
                        <Button variant="outline" size="sm" onClick={handleAvatarChange}>
                          Change Avatar
                        </Button>
                      </div>

                      <div className="flex-1 space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="firstName">First Name</Label>
                            <Input 
                              id="firstName" 
                              value={profileData.firstName}
                              onChange={(e) => handleProfileChange("firstName", e.target.value)}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="lastName">Last Name</Label>
                            <Input 
                              id="lastName" 
                              value={profileData.lastName}
                              onChange={(e) => handleProfileChange("lastName", e.target.value)}
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="email">Email</Label>
                          <Input 
                            id="email" 
                            type="email" 
                            value={profileData.email}
                            onChange={(e) => handleProfileChange("email", e.target.value)}
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="phone">Phone Number</Label>
                          <Input 
                            id="phone" 
                            value={profileData.phone}
                            onChange={(e) => handleProfileChange("phone", e.target.value)}
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="designation">Designation</Label>
                          <Input 
                            id="designation" 
                            value={profileData.designation}
                            onChange={(e) => handleProfileChange("designation", e.target.value)}
                          />
                        </div>
                      </div>
                    </div>

                    <Separator />

                    <div className="space-y-2">
                      <Label htmlFor="bio">Bio</Label>
                      <Textarea
                        id="bio"
                        rows={4}
                        value={profileData.bio}
                        onChange={(e) => handleProfileChange("bio", e.target.value)}
                      />
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-end">
                    <Button onClick={handleProfileSave} disabled={isProfileSaving}>
                      {isProfileSaving ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Saving...
                        </>
                      ) : (
                        <>
                          <Save className="mr-2 h-4 w-4" />
                          Save Changes
                        </>
                      )}
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>

              <TabsContent value="security" className="mt-0">
                <Card>
                  <CardHeader>
                    <CardTitle>Security Settings</CardTitle>
                    <CardDescription>Manage your password and security preferences</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Change Password</h3>

                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="currentPassword">Current Password</Label>
                          <div className="relative">
                            <Input
                              id="currentPassword"
                              type={showCurrentPassword ? "text" : "password"}
                              value={currentPassword}
                              onChange={(e) => setCurrentPassword(e.target.value)}
                            />
                            <Button
                              type="button"
                              variant="ghost"
                              size="icon"
                              className="absolute right-0 top-0 h-full"
                              onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                            >
                              {showCurrentPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                            </Button>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="newPassword">New Password</Label>
                          <div className="relative">
                            <Input
                              id="newPassword"
                              type={showNewPassword ? "text" : "password"}
                              value={newPassword}
                              onChange={(e) => setNewPassword(e.target.value)}
                            />
                            <Button
                              type="button"
                              variant="ghost"
                              size="icon"
                              className="absolute right-0 top-0 h-full"
                              onClick={() => setShowNewPassword(!showNewPassword)}
                            >
                              {showNewPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                            </Button>
                          </div>
                          {newPassword && newPassword.length < 8 && (
                            <p className="text-sm text-red-500 mt-1">
                              Password must be at least 8 characters
                            </p>
                          )}
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="confirmPassword">Confirm New Password</Label>
                          <div className="relative">
                            <Input
                              id="confirmPassword"
                              type={showConfirmPassword ? "text" : "password"}
                              value={confirmPassword}
                              onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                            <Button
                              type="button"
                              variant="ghost"
                              size="icon"
                              className="absolute right-0 top-0 h-full"
                              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            >
                              {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                            </Button>
                          </div>
                          {confirmPassword && newPassword !== confirmPassword && (
                            <p className="text-sm text-red-500 mt-1">
                              Passwords do not match
                            </p>
                          )}
                        </div>
                        
                        <Button 
                          onClick={handlePasswordChange}
                          disabled={!currentPassword || newPassword.length < 8 || newPassword !== confirmPassword || isSecuritySaving}
                        >
                          {isSecuritySaving ? (
                            <>
                              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                              Updating...
                            </>
                          ) : (
                            "Update Password"
                          )}
                        </Button>
                      </div>
                    </div>

                    <Separator />

                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Two-Factor Authentication</h3>

                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label>Enable Two-Factor Authentication</Label>
                          <p className="text-sm text-muted-foreground">
                            Add an extra layer of security to your account
                          </p>
                        </div>
                        <Switch 
                          checked={twoFactorEnabled} 
                          onCheckedChange={setTwoFactorEnabled}
                        />
                      </div>
                    </div>

                    <Separator />

                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Session Management</h3>

                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label>Auto Logout After Inactivity</Label>
                          <p className="text-sm text-muted-foreground">
                            Automatically log out after a period of inactivity
                          </p>
                        </div>
                        <Select 
                          value={autoLogoutTime} 
                          onValueChange={setAutoLogoutTime}
                        >
                          <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Select time" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="5">5 minutes</SelectItem>
                            <SelectItem value="10">10 minutes</SelectItem>
                            <SelectItem value="15">15 minutes</SelectItem>
                            <SelectItem value="30">30 minutes</SelectItem>
                            <SelectItem value="60">1 hour</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-end">
                    <Button onClick={handleSecuritySettingsSave} disabled={isSecuritySaving}>
                      {isSecuritySaving ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Saving...
                        </>
                      ) : (
                        <>
                          <Save className="mr-2 h-4 w-4" />
                          Save Changes
                        </>
                      )}
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>

              <TabsContent value="notifications" className="mt-0">
                <Card>
                  <CardHeader>
                    <CardTitle>Notification Settings</CardTitle>
                    <CardDescription>Manage your notification preferences</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Email Notifications</h3>

                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label>New Suspect Alerts</Label>
                            <p className="text-sm text-muted-foreground">
                              Receive alerts when new suspects are identified
                            </p>
                          </div>
                          <Switch 
                            checked={notifications.newSuspectAlerts}
                            onCheckedChange={() => toggleNotification("newSuspectAlerts")}
                          />
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label>High Risk Activity</Label>
                            <p className="text-sm text-muted-foreground">Receive alerts for high risk activities</p>
                          </div>
                          <Switch 
                            checked={notifications.highRiskActivity}
                            onCheckedChange={() => toggleNotification("highRiskActivity")}
                          />
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label>Report Submissions</Label>
                            <p className="text-sm text-muted-foreground">
                              Receive notifications when reports are submitted
                            </p>
                          </div>
                          <Switch 
                            checked={notifications.reportSubmissions}
                            onCheckedChange={() => toggleNotification("reportSubmissions")}
                          />
                        </div>
                      </div>
                    </div>

                    <Separator />

                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">System Notifications</h3>

                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label>Desktop Notifications</Label>
                            <p className="text-sm text-muted-foreground">
                              Show desktop notifications for important alerts
                            </p>
                          </div>
                          <Switch 
                            checked={notifications.desktopNotifications}
                            onCheckedChange={() => toggleNotification("desktopNotifications")}
                          />
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label>Sound Alerts</Label>
                            <p className="text-sm text-muted-foreground">Play sound for critical notifications</p>
                          </div>
                          <Switch 
                            checked={notifications.soundAlerts}
                            onCheckedChange={() => toggleNotification("soundAlerts")}
                          />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-end">
                    <Button onClick={handleNotificationsSave} disabled={isNotificationSaving}>
                      {isNotificationSaving ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Saving...
                        </>
                      ) : (
                        <>
                          <Save className="mr-2 h-4 w-4" />
                          Save Changes
                        </>
                      )}
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>

              <TabsContent value="appearance" className="mt-0">
                <Card>
                  <CardHeader>
                    <CardTitle>Appearance Settings</CardTitle>
                    <CardDescription>Customize the look and feel of the application</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Theme</h3>

                      <div className="grid grid-cols-3 gap-4">
                        <div
                          className={`flex flex-col items-center gap-2 p-4 border rounded-lg cursor-pointer ${theme === "light" ? "border-primary bg-primary/10" : "border-muted"}`}
                          onClick={() => handleThemeChange("light")}
                        >
                          <Sun className="h-6 w-6" />
                          <span>Light</span>
                          {theme === "light" && (
                            <Check className="h-4 w-4 text-primary absolute top-2 right-2" />
                          )}
                        </div>

                        <div
                          className={`flex flex-col items-center gap-2 p-4 border rounded-lg cursor-pointer ${theme === "dark" ? "border-primary bg-primary/10" : "border-muted"}`}
                          onClick={() => handleThemeChange("dark")}
                        >
                          <Moon className="h-6 w-6" />
                          <span>Dark</span>
                          {theme === "dark" && (
                            <Check className="h-4 w-4 text-primary absolute top-2 right-2" />
                          )}
                        </div>

                        <div
                          className={`flex flex-col items-center gap-2 p-4 border rounded-lg cursor-pointer ${theme === "system" ? "border-primary bg-primary/10" : "border-muted"}`}
                          onClick={() => handleThemeChange("system")}
                        >
                          <Laptop className="h-6 w-6" />
                          <span>System</span>
                          {theme === "system" && (
                            <Check className="h-4 w-4 text-primary absolute top-2 right-2" />
                          )}
                        </div>
                      </div>
                    </div>

                    <Separator />

                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Language</h3>

                      <div className="flex items-center gap-4">
                        <Globe className="h-5 w-5 text-muted-foreground" />
                        <Select 
                          value={language}
                          onValueChange={setLanguage}
                        >
                          <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Select language" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="en">English</SelectItem>
                            <SelectItem value="hi">Hindi</SelectItem>
                            <SelectItem value="bn">Bengali</SelectItem>
                            <SelectItem value="te">Telugu</SelectItem>
                            <SelectItem value="ta">Tamil</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-end">
                    <Button onClick={handleAppearanceSave} disabled={isAppearanceSaving}>
                      {isAppearanceSaving ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Saving...
                        </>
                      ) : (
                        <>
                          <Save className="mr-2 h-4 w-4" />
                          Save Changes
                        </>
                      )}
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>

              <TabsContent value="system" className="mt-0">
                <Card>
                  <CardHeader>
                    <CardTitle>System Settings</CardTitle>
                    <CardDescription>Configure system-wide settings</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Data Management</h3>

                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label>Automatic Database Backup</Label>
                            <p className="text-sm text-muted-foreground">Automatically backup database daily</p>
                          </div>
                          <Switch 
                            checked={systemSettings.automaticBackup}
                            onCheckedChange={() => toggleSystemSetting("automaticBackup")}
                          />
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label>Data Retention Period</Label>
                            <p className="text-sm text-muted-foreground">How long to keep historical data</p>
                          </div>
                          <Select 
                            value={systemSettings.dataRetentionPeriod}
                            onValueChange={(value) => handleSystemSettingChange("dataRetentionPeriod", value)}
                          >
                            <SelectTrigger className="w-[180px]">
                              <SelectValue placeholder="Select period" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="30">30 days</SelectItem>
                              <SelectItem value="90">90 days</SelectItem>
                              <SelectItem value="180">6 months</SelectItem>
                              <SelectItem value="365">1 year</SelectItem>
                              <SelectItem value="730">2 years</SelectItem>
                              <SelectItem value="1825">5 years</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>

                    <Separator />

                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Security</h3>

                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label>IP Restriction</Label>
                            <p className="text-sm text-muted-foreground">Restrict access to specific IP addresses</p>
                          </div>
                          <Switch 
                            checked={systemSettings.ipRestriction}
                            onCheckedChange={() => toggleSystemSetting("ipRestriction")}
                          />
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label>Audit Logging</Label>
                            <p className="text-sm text-muted-foreground">Log all user actions for audit purposes</p>
                          </div>
                          <Switch 
                            checked={systemSettings.auditLogging}
                            onCheckedChange={() => toggleSystemSetting("auditLogging")}
                          />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-end">
                    <Button onClick={handleSystemSettingsSave} disabled={isSystemSaving}>
                      {isSystemSaving ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Saving...
                        </>
                      ) : (
                        <>
                          <Save className="mr-2 h-4 w-4" />
                          Save Changes
                        </>
                      )}
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>
            </div>
          </div>
        </Tabs>
      </div>
    </div>
  )
}

