"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, ChevronDown, ChevronRight, Sun, Moon, User, LogIn, UserPlus, LogOut, BookOpen, ShoppingCart, Receipt, Settings } from 'lucide-react'
import { useTheme } from "next-themes"
import { useLanguage } from "./language-provider"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useAuth } from "@/components/auth/AuthProvider"
import { useRouter } from "next/navigation"

// FIX: Bổ sung các variant animation cần thiết cho mobile menu "xịn"
const mobileNavVariants = {
  open: { transition: { staggerChildren: 0.07, delayChildren: 0.2 } },
  closed: { transition: { staggerChildren: 0.05, staggerDirection: -1 } }
};
const mobileNavItemVariants = {
  open: { y: 0, opacity: 1, transition: { y: { stiffness: 1000, velocity: -100 } } },
  closed: { y: 50, opacity: 0, transition: { y: { stiffness: 1000 } } }
};

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { theme, setTheme } = useTheme()
  const { language, setLanguage, t } = useLanguage()
  const pathname = usePathname()
  const { user, signOut } = useAuth()
  const router = useRouter()

  // FIX: Bổ sung hook để khóa cuộn trang khi mobile menu mở
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => { document.body.style.overflow = 'auto'; };
  }, [isMobileMenuOpen]);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50)
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener("scroll", handleScroll)
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    }
  }, [])

  const navItems = [
    { href: "/gioi-thieu", label: t("nav.about") },
    { href: "/dao-tao", label: t("nav.training") },
    { href: "/du-an", label: t("nav.projects") },
    { href: "/mentors", label: t("nav.mentors") },
    { href: "/mscer", label: t("nav.mscer") },
    { href: "/dong-hanh", label: t("nav.partners") },
    { href: "/chia-se", label: t("nav.blog") },
    { href: "/lien-he", label: t("nav.contact") },
  ]

  // FIX: Bổ sung logic activePath để mobile menu nhận diện đúng trang active
  const activePath = navItems.find(item => pathname.startsWith(item.href))?.href || null;

  const TOPBAR_HEIGHT = 36
  const HEADER_BASE_HEIGHT = 100 // Tăng chiều cao để logo to hơn
  const HEADER_SCROLLED_HEIGHT = 72 // Chiều cao khi cuộn

  return (
    <>
      {/* Topbar đã tốt, giữ nguyên */}
      <AnimatePresence>
        {!isScrolled && (
          <motion.div key="topbar" initial={{ y: -TOPBAR_HEIGHT, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -TOPBAR_HEIGHT, opacity: 0 }} transition={{ duration: 0.4, ease: "easeInOut" }} className="fixed top-0 left-0 right-0 z-[60] bg-gradient-to-r from-blue-600 via-blue-700 to-teal-600 text-white text-sm shadow-md" style={{ height: TOPBAR_HEIGHT }}>
            <div className="absolute inset-0 opacity-30"><motion.div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent" animate={{ x: ["-100%", "100%"] }} transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}/></div>
            <div className="container mx-auto flex justify-between items-center h-full px-4 sm:px-6 lg:px-8 relative z-10">
              <div className="flex items-center space-x-4 text-xs flex-wrap"><span className="hidden sm:block">📧 msc.edu.vn@gmail.com</span><span className="hidden md:block">📞 (+84) 329 381 489</span><span className="block">🌟 Mekong Skill Center</span></div>
              <div className="flex items-center space-x-2">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="flex items-center space-x-1 text-white hover:bg-white/20 h-7"><span className="text-sm">{language === "vi" ? "🇻🇳" : "🇬🇧"}</span><ChevronDown className="h-3 w-3" /></Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem onClick={() => setLanguage("vi")}>🇻🇳 Tiếng Việt</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setLanguage("en")}>🇬🇧 English</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                {!user ? (
                  <>
                    <Link href="/login" className="hidden sm:block"><Button variant="ghost" size="sm" className="text-white hover:bg-white/20 h-7 text-xs"><LogIn className="h-3 w-3 mr-1" />{t("nav.login")}</Button></Link>
                    <Link href="/register" className="hidden sm:block"><Button size="sm" className="bg-white text-blue-600 hover:bg-blue-50 h-7 text-xs"><UserPlus className="h-3 w-3 mr-1" />{t("nav.register")}</Button></Link>
                  </>
                ) : (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm" className="text-white hover:bg-white/20 h-7 text-xs flex items-center">
                        <Avatar className="h-5 w-5">
                          <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                          <AvatarFallback>{user.name.slice(0,2).toUpperCase()}</AvatarFallback>
                        </Avatar>
                        <span className="ml-2 max-w-[120px] truncate hidden md:inline">{user.name}</span>
                        <ChevronDown className="h-3 w-3 ml-1" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-56">
                      <DropdownMenuItem asChild><Link href="/student/dashboard"><User className="w-4 h-4 mr-2" />Tổng quan</Link></DropdownMenuItem>
                      <DropdownMenuItem asChild><Link href="/student/my-courses"><BookOpen className="w-4 h-4 mr-2" />Khóa học của tôi</Link></DropdownMenuItem>
                      <DropdownMenuItem asChild><Link href="/cart"><ShoppingCart className="w-4 h-4 mr-2" />Giỏ hàng</Link></DropdownMenuItem>
                      <DropdownMenuItem asChild><Link href="/student/orders"><Receipt className="w-4 h-4 mr-2" />Đơn hàng</Link></DropdownMenuItem>
                      <DropdownMenuItem asChild><Link href="/student/settings"><Settings className="w-4 h-4 mr-2" />Cài đặt</Link></DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={() => { signOut(); router.push("/") }}>
                        <LogOut className="w-4 h-4 mr-2" /> Đăng xuất
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header đã được tinh chỉnh */}
      <motion.header className={`fixed left-0 right-0 z-50 w-full transition-all duration-300 ${isScrolled ? "bg-white/95 dark:bg-gray-900/95 backdrop-blur-lg shadow-lg" : "bg-white/90 dark:bg-gray-900/90 backdrop-blur-md"}`} style={{ top: isScrolled ? 0 : `${TOPBAR_HEIGHT}px`, height: isScrolled ? `${HEADER_SCROLLED_HEIGHT}px` : `${HEADER_BASE_HEIGHT}px` }} transition={{ duration: 0.3, ease: "easeInOut" }}>
        <div className="container mx-auto flex h-full items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link href="/" className="flex-shrink-0">
            <motion.div animate={{ scale: isScrolled ? 0.75 : 1 }} transition={{ duration: 0.4, ease: "circOut" }} className="flex items-center origin-left">
              <Image src="/logo.webp" alt="Mekong Skill Center" width={240} height={72} className="h-auto transition-all duration-300" style={{ width: isScrolled ? '270px' : '280px' }} priority />
            </motion.div>
          </Link>

          <nav className="hidden items-center font-medium lg:flex lg:space-x-2 xl:space-x-4">
            {navItems.map((item) => (<Link key={item.href} href={item.href} className={`relative group rounded-md py-2 text-gray-700 transition-colors duration-300 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 lg:px-2 xl:px-3 lg:text-[11px] xl:text-[12px] 2xl:text-sm uppercase tracking-wider ${item.href === activePath ? "text-blue-600 dark:text-blue-400" : ""}`}>{item.label}<span className={`absolute -bottom-1 left-1/2 h-0.5 -translate-x-1/2 rounded-full bg-blue-600 transition-all duration-300 ${item.href === activePath ? 'w-1/2' : 'w-0 group-hover:w-full'}`} /></Link>))}
          </nav>

          <div className="flex items-center space-x-2 sm:space-x-3">
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <Button variant="ghost" size="icon" onClick={() => setTheme(theme === "dark" ? "light" : "dark")} className="h-9 w-9 rounded-full bg-slate-100 dark:bg-slate-800"><Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" /><Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" /><span className="sr-only">Toggle theme</span></Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              {/* Nút này giờ chỉ có một nhiệm vụ là mở menu */}
              <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full bg-slate-100 dark:bg-slate-800 lg:hidden" onClick={() => setIsMobileMenuOpen(true)} aria-label="Open menu">
                <Menu className="h-5 w-5" />
              </Button>
            </motion.div>
          </div>
        </div>
        
        {/* FIX: ĐÃ XÓA HOÀN TOÀN KHỐI MENU MOBILE CŨ GÂY LỖI Ở ĐÂY */}

      </motion.header>
      
      {/* ================================================================ */}
      {/* KHỐI MENU MOBILE "XỊN" DUY NHẤT, ĐẶT BÊN NGOÀI HEADER */}
      {/* ================================================================ */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }} className="fixed inset-0 z-[90] bg-black/70 backdrop-blur-sm lg:hidden" onClick={() => setIsMobileMenuOpen(false)} />
            <motion.div key="mobile-menu-panel" className="fixed top-0 left-0 bottom-0 z-[100] w-4/5 max-w-sm bg-gradient-to-b from-slate-50 to-blue-50 dark:from-gray-900 dark:to-blue-900/20 shadow-2xl lg:hidden" initial={{ x: "-100%" }} animate={{ x: 0 }} exit={{ x: "-100%" }} transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}>
              <div className="flex h-full flex-col">
                <div className="flex items-center justify-between p-4 border-b border-slate-200/70 dark:border-gray-700/70">
                   <Link href="/" onClick={() => setIsMobileMenuOpen(false)}><Image src="/logo.webp" alt="Mekong Skill Center" width={140} height={37} /></Link>
                   <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(false)} className="rounded-full"><X className="h-5 w-5" /></Button>
                </div>
                <motion.nav className="flex-1 p-4 sm:p-6 space-y-2" variants={mobileNavVariants} initial="closed" animate="open">
                  {navItems.map((item) => (
                    <motion.div key={item.href} variants={mobileNavItemVariants}>
                      <Link href={item.href} className={`group flex items-center justify-between p-3 rounded-xl transition-all duration-200 ${item.href === activePath ? "bg-blue-100 dark:bg-blue-900/50" : "hover:bg-slate-200/50 dark:hover:bg-gray-800/50"}`} onClick={() => setIsMobileMenuOpen(false)}>
                        <span className={`font-bold text-sm ${item.href === activePath ? 'text-blue-600 dark:text-blue-300' : 'text-gray-800 dark:text-gray-200'}`}>{item.label}</span>
                        <ChevronRight className={`h-4 w-4 transition-transform duration-200 ${item.href === activePath ? 'text-blue-500' : 'text-gray-400 group-hover:translate-x-1'}`} />
                      </Link>
                    </motion.div>
                  ))}
                </motion.nav>
                <div className="p-4 sm:p-6 mt-auto border-t border-slate-200/70 dark:border-gray-700/70">
                    {!user ? (
                      <div className="grid grid-cols-2 gap-3">
                        <Link href="/login" onClick={() => setIsMobileMenuOpen(false)}><Button variant="outline" className="w-full"><LogIn className="w-4 h-4 mr-2" />{t("nav.login")}</Button></Link>
                        <Link href="/register" onClick={() => setIsMobileMenuOpen(false)}><Button className="w-full bg-blue-600 hover:bg-blue-700 text-white"><UserPlus className="w-4 h-4 mr-2" />{t("nav.register")}</Button></Link>
                      </div>
                    ) : (
                      <div className="grid grid-cols-2 gap-3">
                        <Link href="/student/dashboard" onClick={() => setIsMobileMenuOpen(false)}><Button variant="outline" className="w-full"><User className="w-4 h-4 mr-2" />Tổng quan</Button></Link>
                        <Link href="/student/my-courses" onClick={() => setIsMobileMenuOpen(false)}><Button variant="outline" className="w-full"><BookOpen className="w-4 h-4 mr-2" />Khóa học</Button></Link>
                        <Link href="/cart" onClick={() => setIsMobileMenuOpen(false)}><Button variant="outline" className="w-full"><ShoppingCart className="w-4 h-4 mr-2" />Giỏ hàng</Button></Link>
                        <Link href="/student/orders" onClick={() => setIsMobileMenuOpen(false)}><Button variant="outline" className="w-full"><Receipt className="w-4 h-4 mr-2" />Đơn hàng</Button></Link>
                        <Link href="/student/settings" onClick={() => setIsMobileMenuOpen(false)} className="col-span-2"><Button variant="outline" className="w-full mt-2"><Settings className="w-4 h-4 mr-2" />Cài đặt</Button></Link>
                        <Button variant="outline" className="col-span-2 w-full" onClick={() => { signOut(); setIsMobileMenuOpen(false); router.push("/") }}><LogOut className="w-4 h-4 mr-2" />Đăng xuất</Button>
                      </div>
                    )}
                    <p className="text-center text-xs text-slate-500 dark:text-gray-500 mt-4">© {new Date().getFullYear()} Mekong Skill Center.</p>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Spacer */}
      <div className="transition-all duration-300" style={{ height: isScrolled ? `${HEADER_SCROLLED_HEIGHT}px` : `${TOPBAR_HEIGHT + HEADER_BASE_HEIGHT}px` }} />
    </>
  )
}

export default Header
