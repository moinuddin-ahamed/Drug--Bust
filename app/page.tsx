"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Shield, Eye, EyeOff, Loader2, Lock, User, AlertTriangle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Define user credentials for demo - in a real app, this would be from a database
const VALID_USERS = [
  { username: "AdminM", password: "Moin@2025", role: "admin", needsMfa: true },
  { username: "AdminW", password: "Wujjwal@2025", role: "admin", needsMfa: false },
]

// Define login attempts tracking
const MAX_LOGIN_ATTEMPTS = 3
const LOCKOUT_TIME = 5 * 60 * 1000 // 5 minutes in milliseconds

export default function LoginPage() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)
  const [loginStep, setLoginStep] = useState<"credentials" | "mfa">("credentials")
  const [mfaCode, setMfaCode] = useState("")
  const [loginAttempts, setLoginAttempts] = useState(0)
  const [lockoutUntil, setLockoutUntil] = useState<number | null>(null)
  const [timeRemaining, setTimeRemaining] = useState("")
  
  const router = useRouter()

  // Password validation
  const hasMinLength = password.length >= 8
  const hasUppercase = /[A-Z]/.test(password)
  const hasLowercase = /[a-z]/.test(password)
  const hasNumber = /[0-9]/.test(password)
  const hasSpecialChar = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password)
  const isPasswordStrong = hasMinLength && hasUppercase && hasLowercase && hasNumber && hasSpecialChar

  // Handle lockout timer
  useEffect(() => {
    if (!lockoutUntil) return
    
    const intervalId = setInterval(() => {
      const now = Date.now()
      if (now >= lockoutUntil) {
        setLockoutUntil(null)
        setLoginAttempts(0)
        setTimeRemaining("")
        clearInterval(intervalId)
      } else {
        const remainingSecs = Math.ceil((lockoutUntil - now) / 1000)
        const mins = Math.floor(remainingSecs / 60)
        const secs = remainingSecs % 60
        setTimeRemaining(`${mins}:${secs.toString().padStart(2, '0')}`)
      }
    }, 1000)
    
    return () => clearInterval(intervalId)
  }, [lockoutUntil])

  // Check for saved credentials on load
  useEffect(() => {
    const savedUsername = localStorage.getItem("nbi_username")
    if (savedUsername) {
      setUsername(savedUsername)
      setRememberMe(true)
    }
  }, [])

  const handleCredentialsSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    
    // Check if account is locked
    if (lockoutUntil && Date.now() < lockoutUntil) {
      setError(`Account temporarily locked. Try again in ${timeRemaining}.`)
      return
    }
    
    setIsLoading(true)
    
    try {
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Find matching user
      const user = VALID_USERS.find(u => u.username === username)
      
      if (!user || user.password !== password) {
        // Increment login attempts
        const newAttempts = loginAttempts + 1
        setLoginAttempts(newAttempts)
        
        // Check if we should lock the account
        if (newAttempts >= MAX_LOGIN_ATTEMPTS) {
          const lockoutTime = Date.now() + LOCKOUT_TIME
          setLockoutUntil(lockoutTime)
          setError(`Too many failed attempts. Account locked for 5 minutes.`)
        } else {
          setError(`Invalid credentials. ${MAX_LOGIN_ATTEMPTS - newAttempts} attempts remaining.`)
        }
        setIsLoading(false)
        return
      }
      
      // Reset login attempts on successful login
      setLoginAttempts(0)
      
      // Save username if "Remember me" is checked
      if (rememberMe) {
        localStorage.setItem("nbi_username", username)
      } else {
        localStorage.removeItem("nbi_username")
      }
      
      // Check if MFA is required
      if (user.needsMfa) {
        setLoginStep("mfa")
        setIsLoading(false)
      } else {
        // Simulate successful login without MFA
        await new Promise(resolve => setTimeout(resolve, 500))
        router.push("/dashboard")
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again.")
      setIsLoading(false)
    }
  }

  const handleMfaSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)
    
    try {
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Simulate MFA validation - in a real app, this would verify against a server
      if (mfaCode === "123456") {
        router.push("/dashboard")
      } else {
        setError("Invalid verification code. Please try again.")
        setIsLoading(false)
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again.")
      setIsLoading(false)
    }
  }

  // Function to simulate sending MFA code
  const handleResendCode = async () => {
    setIsLoading(true)
    await new Promise(resolve => setTimeout(resolve, 1000))
    setIsLoading(false)
    alert("A new verification code has been sent to your registered mobile number.")
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900 bg-[url('/placeholder.svg?height=800&width=1200')] bg-cover bg-center bg-blend-overlay">
      <Card className="w-full max-w-md mx-auto">
        <CardHeader className="space-y-1 text-center">
          <div className="flex justify-center mb-2">
            <Shield className="h-12 w-12 text-primary" />
          </div>
          <CardTitle className="text-2xl font-bold">Drug Bust</CardTitle>
          <CardDescription>Narcotics Bureau of India - Secure Access</CardDescription>
        </CardHeader>
        
        <CardContent>
          {loginStep === "credentials" ? (
            <form onSubmit={handleCredentialsSubmit} className="space-y-4">
              {error && (
                <Alert variant="destructive" className="mb-4">
                  <AlertTriangle className="h-4 w-4 mr-2" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
              
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="username"
                    className="pl-10"
                    placeholder="Enter your username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    disabled={isLoading || (lockoutUntil !== null && Date.now() < lockoutUntil)}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    className="pl-10"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    disabled={isLoading || (lockoutUntil !== null && Date.now() < lockoutUntil)}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-1 top-1 h-8 w-8"
                    onClick={() => setShowPassword(!showPassword)}
                    disabled={isLoading}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    <span className="sr-only">
                      {showPassword ? "Hide password" : "Show password"}
                    </span>
                  </Button>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="rememberMe" 
                  checked={rememberMe} 
                  onCheckedChange={(checked) => setRememberMe(checked === true)}
                  disabled={isLoading}
                />
                <Label htmlFor="rememberMe" className="text-sm cursor-pointer">Remember me</Label>
              </div>
              
              <Button 
                className="w-full" 
                type="submit"
                disabled={isLoading || (lockoutUntil !== null && Date.now() < lockoutUntil)}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Authenticating...
                  </>
                ) : (
                  "Secure Login"
                )}
              </Button>
            </form>
          ) : (
            <form onSubmit={handleMfaSubmit} className="space-y-4">
              {error && (
                <Alert variant="destructive" className="mb-4">
                  <AlertTriangle className="h-4 w-4 mr-2" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
              
              <div className="text-center mb-2">
                <p className="font-semibold">Two-Factor Authentication</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Enter the 6-digit code sent to your registered mobile number
                </p>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="mfaCode">Verification Code</Label>
                <Input
                  id="mfaCode"
                  placeholder="6-digit code"
                  value={mfaCode}
                  onChange={(e) => setMfaCode(e.target.value.replace(/\D/g, '').substring(0, 6))}
                  required
                  className="text-center text-lg tracking-widest"
                  maxLength={6}
                  disabled={isLoading}
                />
              </div>
              
              <div className="flex justify-between items-center">
                <Button 
                  type="button" 
                  variant="ghost" 
                  size="sm"
                  onClick={() => setLoginStep("credentials")}
                  disabled={isLoading}
                >
                  Back
                </Button>
                <Button 
                  type="button" 
                  variant="link" 
                  size="sm"
                  onClick={handleResendCode}
                  disabled={isLoading}
                >
                  Resend Code
                </Button>
              </div>
              
              <Button 
                className="w-full" 
                type="submit"
                disabled={isLoading || mfaCode.length !== 6}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Verifying...
                  </>
                ) : (
                  "Verify & Login"
                )}
              </Button>
            </form>
          )}
        </CardContent>
        
        <CardFooter className="flex flex-col">
          <p className="text-xs text-center text-muted-foreground mt-2">
            This is a secure government system. Unauthorized access is prohibited and may result in criminal
            prosecution.
          </p>
          
          {/* Security info - optional */}
          <div className="mt-4 pt-4 border-t w-full">
            <details className="text-xs">
              <summary className="cursor-pointer text-muted-foreground">Security Information</summary>
              <ul className="mt-2 space-y-1 text-muted-foreground">
                <li>• Your connection is encrypted</li>
                <li>• Last login: 10-May-2024 09:45 IST from 192.168.1.1</li>
                <li>• This system is monitored for security purposes</li>
              </ul>
            </details>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}

