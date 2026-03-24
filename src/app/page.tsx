"use client";

import MainLayout from "@/components/layout/MainLayout";
import StatsCard from "@/components/dashboard/StatsCard";
import RecentOrders from "@/components/dashboard/RecentOrders";
import { DollarSign, ShoppingBag, Users, TrendingUp } from "lucide-react";

const chartData = [
  { label: "1월", value: 42 },
  { label: "2월", value: 58 },
  { label: "3월", value: 51 },
  { label: "4월", value: 67 },
  { label: "5월", value: 82 },
  { label: "6월", value: 74 },
  { label: "7월", value: 91 },
  { label: "8월", value: 88 },
  { label: "9월", value: 95 },
  { label: "10월", value: 103 },
  { label: "11월", value: 118 },
  { label: "12월", value: 134 },
];

const maxValue = Math.max(...chartData.map((d) => d.value));

export default function DashboardPage() {
  return (
    <MainLayout title="대시보드">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
        <StatsCard
          title="이번 달 매출"
          value="₩134,200,000"
          change={12.5}
          changeLabel="전월 대비"
          icon={DollarSign}
          iconColor="text-[#3D91FF]"
          iconBg="bg-blue-50"
        />
        <StatsCard
          title="이번 달 주문수"
          value="1,248건"
          change={8.3}
          changeLabel="전월 대비"
          icon={ShoppingBag}
          iconColor="text-green-600"
          iconBg="bg-green-50"
        />
        <StatsCard
          title="총 파트너수"
          value="342명"
          change={5.1}
          changeLabel="전월 대비"
          icon={Users}
          iconColor="text-purple-600"
          iconBg="bg-purple-50"
        />
        <StatsCard
          title="전환율"
          value="3.84%"
          change={-0.6}
          changeLabel="전월 대비"
          icon={TrendingUp}
          iconColor="text-orange-600"
          iconBg="bg-orange-50"
        />
      </div>

      {/* Chart + Summary Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
        {/* Sales Chart */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200 p-5">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h3 className="font-semibold text-gray-900">월별 매출 현황</h3>
              <p className="text-xs text-gray-500 mt-0.5">2024년 전체 매출 추이</p>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded-sm bg-[#3D91FF]" />
                <span className="text-xs text-gray-500">매출액 (백만원)</span>
              </div>
            </div>
          </div>
          <div className="flex items-end gap-2 h-44">
            {chartData.map((item) => (
              <div key={item.label} className="flex-1 flex flex-col items-center gap-1">
                <div className="w-full relative flex items-end" style={{ height: "152px" }}>
                  <div
                    className="w-full bg-[#3D91FF] rounded-t-md hover:bg-[#1A7AFF] transition-colors cursor-pointer relative group"
                    style={{ height: `${(item.value / maxValue) * 100}%` }}
                  >
                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-10">
                      {item.value}백만원
                    </div>
                  </div>
                </div>
                <span className="text-xs text-gray-400">{item.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Summary */}
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <h3 className="font-semibold text-gray-900 mb-4">빠른 현황</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between py-3 border-b border-gray-100">
              <div>
                <div className="text-xs text-gray-500">처리 대기 주문</div>
                <div className="text-xl font-bold text-yellow-500 mt-0.5">28건</div>
              </div>
              <a
                href="/orders"
                className="text-xs text-[#3D91FF] hover:underline font-medium bg-blue-50 px-2.5 py-1.5 rounded-lg"
              >
                확인하기
              </a>
            </div>
            <div className="flex items-center justify-between py-3 border-b border-gray-100">
              <div>
                <div className="text-xs text-gray-500">품절 상품</div>
                <div className="text-xl font-bold text-red-500 mt-0.5">5개</div>
              </div>
              <a
                href="/products"
                className="text-xs text-[#3D91FF] hover:underline font-medium bg-blue-50 px-2.5 py-1.5 rounded-lg"
              >
                확인하기
              </a>
            </div>
            <div className="flex items-center justify-between py-3 border-b border-gray-100">
              <div>
                <div className="text-xs text-gray-500">이번 달 정산 예정</div>
                <div className="text-xl font-bold text-green-600 mt-0.5">₩12,340,000</div>
              </div>
              <a
                href="/settlements"
                className="text-xs text-[#3D91FF] hover:underline font-medium bg-blue-50 px-2.5 py-1.5 rounded-lg"
              >
                확인하기
              </a>
            </div>
            <div className="flex items-center justify-between py-3">
              <div>
                <div className="text-xs text-gray-500">누적 상품 등록</div>
                <div className="text-xl font-bold text-gray-800 mt-0.5">184개</div>
              </div>
              <a
                href="/products"
                className="text-xs text-[#3D91FF] hover:underline font-medium bg-blue-50 px-2.5 py-1.5 rounded-lg"
              >
                확인하기
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Orders */}
      <RecentOrders />
    </MainLayout>
  );
}
