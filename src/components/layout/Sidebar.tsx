"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  CreditCard,
  User,
  ChevronRight,
  Home,
} from "lucide-react";

const navItems = [
  {
    href: "/",
    label: "대시보드",
    icon: LayoutDashboard,
  },
  {
    href: "/products",
    label: "상품 관리",
    icon: Package,
  },
  {
    href: "/orders",
    label: "주문 관리",
    icon: ShoppingCart,
  },
  {
    href: "/settlements",
    label: "정산 관리",
    icon: CreditCard,
  },
  {
    href: "/profile",
    label: "파트너 정보",
    icon: User,
  },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 min-h-screen bg-white border-r border-gray-200 flex flex-col">
      {/* Logo */}
      <div className="h-16 flex items-center px-6 border-b border-gray-200">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-[#3D91FF] rounded-lg flex items-center justify-center">
            <Home className="w-4 h-4 text-white" />
          </div>
          <div>
            <div className="text-sm font-bold text-gray-900">오늘의집</div>
            <div className="text-xs text-gray-500">파트너센터</div>
          </div>
        </div>
      </div>

      {/* Partner Info */}
      <div className="px-4 py-4 border-b border-gray-100">
        <div className="bg-blue-50 rounded-lg p-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-[#3D91FF] rounded-full flex items-center justify-center text-white text-xs font-bold">
              A
            </div>
            <div>
              <div className="text-sm font-medium text-gray-800">어반리빙 스토어</div>
              <div className="text-xs text-gray-500">파트너 ID: P-10234</div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 group ${
                isActive
                  ? "bg-[#3D91FF] text-white shadow-sm"
                  : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon
                  className={`w-4 h-4 ${
                    isActive ? "text-white" : "text-gray-400 group-hover:text-gray-600"
                  }`}
                />
                {item.label}
              </div>
              {isActive && <ChevronRight className="w-3.5 h-3.5 text-white/70" />}
            </Link>
          );
        })}
      </nav>

      {/* Bottom Links */}
      <div className="px-4 py-4 border-t border-gray-100">
        <div className="text-xs text-gray-400 space-y-1.5">
          <div className="flex items-center gap-1.5 cursor-pointer hover:text-gray-600 transition-colors">
            <span>이용약관</span>
          </div>
          <div className="flex items-center gap-1.5 cursor-pointer hover:text-gray-600 transition-colors">
            <span>개인정보처리방침</span>
          </div>
          <div className="mt-3 text-gray-300">© 2024 오늘의집</div>
        </div>
      </div>
    </aside>
  );
}
