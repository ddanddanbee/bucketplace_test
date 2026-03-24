"use client";

import { useState } from "react";
import MainLayout from "@/components/layout/MainLayout";
import { Order } from "@/types";
import { Search, ShoppingBag, ChevronDown, ChevronLeft, ChevronRight, Download } from "lucide-react";

const mockOrders: Order[] = [
  {
    id: "1",
    orderNumber: "ORD-2024-001234",
    productName: "모던 소파 3인용 (그레이)",
    customerName: "김민준",
    quantity: 1,
    totalPrice: 890000,
    status: "shipping",
    orderedAt: "2024-05-20",
  },
  {
    id: "2",
    orderNumber: "ORD-2024-001235",
    productName: "원목 식탁 세트 4인용",
    customerName: "이서연",
    quantity: 1,
    totalPrice: 1250000,
    status: "confirmed",
    orderedAt: "2024-05-20",
  },
  {
    id: "3",
    orderNumber: "ORD-2024-001236",
    productName: "미드센추리 암체어",
    customerName: "박지호",
    quantity: 2,
    totalPrice: 560000,
    status: "pending",
    orderedAt: "2024-05-19",
  },
  {
    id: "4",
    orderNumber: "ORD-2024-001237",
    productName: "북유럽 책장 5단",
    customerName: "최수아",
    quantity: 1,
    totalPrice: 320000,
    status: "delivered",
    orderedAt: "2024-05-19",
  },
  {
    id: "5",
    orderNumber: "ORD-2024-001238",
    productName: "패브릭 침대 프레임 퀸",
    customerName: "정예준",
    quantity: 1,
    totalPrice: 720000,
    status: "cancelled",
    orderedAt: "2024-05-18",
  },
  {
    id: "6",
    orderNumber: "ORD-2024-001239",
    productName: "대리석 커피 테이블",
    customerName: "한지수",
    quantity: 1,
    totalPrice: 450000,
    status: "delivered",
    orderedAt: "2024-05-17",
  },
  {
    id: "7",
    orderNumber: "ORD-2024-001240",
    productName: "스칸디나비안 행거 랙",
    customerName: "오민석",
    quantity: 3,
    totalPrice: 285000,
    status: "shipping",
    orderedAt: "2024-05-17",
  },
  {
    id: "8",
    orderNumber: "ORD-2024-001241",
    productName: "조명 펜던트 원형",
    customerName: "강다영",
    quantity: 2,
    totalPrice: 136000,
    status: "pending",
    orderedAt: "2024-05-16",
  },
  {
    id: "9",
    orderNumber: "ORD-2024-001242",
    productName: "모던 소파 3인용 (그레이)",
    customerName: "윤서진",
    quantity: 1,
    totalPrice: 890000,
    status: "confirmed",
    orderedAt: "2024-05-16",
  },
  {
    id: "10",
    orderNumber: "ORD-2024-001243",
    productName: "원목 식탁 세트 4인용",
    customerName: "임채원",
    quantity: 1,
    totalPrice: 1250000,
    status: "delivered",
    orderedAt: "2024-05-15",
  },
];

const statusConfig: Record<Order["status"], { label: string; className: string }> = {
  pending: { label: "결제완료", className: "bg-yellow-100 text-yellow-700" },
  confirmed: { label: "주문확인", className: "bg-blue-100 text-blue-700" },
  shipping: { label: "배송중", className: "bg-indigo-100 text-indigo-700" },
  delivered: { label: "배송완료", className: "bg-green-100 text-green-700" },
  cancelled: { label: "취소됨", className: "bg-red-100 text-red-700" },
};

const statusCounts = {
  all: mockOrders.length,
  pending: mockOrders.filter((o) => o.status === "pending").length,
  confirmed: mockOrders.filter((o) => o.status === "confirmed").length,
  shipping: mockOrders.filter((o) => o.status === "shipping").length,
  delivered: mockOrders.filter((o) => o.status === "delivered").length,
  cancelled: mockOrders.filter((o) => o.status === "cancelled").length,
};

export default function OrdersPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | Order["status"]>("all");
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);

  const filtered = mockOrders.filter((o) => {
    const matchSearch =
      o.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      o.customerName.includes(searchQuery) ||
      o.productName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchStatus = statusFilter === "all" || o.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const totalAmount = filtered.reduce((sum, o) => sum + o.totalPrice, 0);

  return (
    <MainLayout title="주문 관리">
      {/* Status Filter Tabs */}
      <div className="flex items-center gap-1 bg-white border border-gray-200 rounded-xl p-1.5 mb-5 overflow-x-auto">
        {(["all", "pending", "confirmed", "shipping", "delivered", "cancelled"] as const).map(
          (s) => (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              className={`flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium rounded-lg transition-all whitespace-nowrap ${
                statusFilter === s
                  ? "bg-[#3D91FF] text-white shadow-sm"
                  : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
              }`}
            >
              {s === "all" ? "전체" : statusConfig[s].label}
              <span
                className={`px-1.5 py-0.5 rounded-full text-xs font-semibold ${
                  statusFilter === s ? "bg-white/20 text-white" : "bg-gray-100 text-gray-600"
                }`}
              >
                {statusCounts[s]}
              </span>
            </button>
          )
        )}
      </div>

      {/* Search + Actions */}
      <div className="flex items-center justify-between gap-3 mb-4">
        <div className="relative">
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="주문번호, 상품명, 구매자 검색..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 pr-4 py-2 text-sm bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3D91FF]/20 focus:border-[#3D91FF] w-64 transition-all"
          />
        </div>
        <button className="flex items-center gap-1.5 px-3.5 py-2 text-sm text-gray-600 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
          <Download className="w-4 h-4" />
          엑셀 다운로드
        </button>
      </div>

      {/* Summary Bar */}
      <div className="bg-blue-50 border border-blue-100 rounded-xl px-5 py-3 mb-4 flex items-center justify-between">
        <p className="text-sm text-blue-700">
          조회된 주문 <span className="font-bold">{filtered.length}건</span>
        </p>
        <p className="text-sm text-blue-700">
          합계금액:{" "}
          <span className="font-bold">{totalAmount.toLocaleString()}원</span>
        </p>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="text-left px-5 py-3 text-xs font-medium text-gray-500">주문번호</th>
                <th className="text-left px-5 py-3 text-xs font-medium text-gray-500">상품명</th>
                <th className="text-left px-5 py-3 text-xs font-medium text-gray-500">구매자</th>
                <th className="text-left px-5 py-3 text-xs font-medium text-gray-500">수량</th>
                <th className="text-left px-5 py-3 text-xs font-medium text-gray-500">결제금액</th>
                <th className="text-left px-5 py-3 text-xs font-medium text-gray-500">주문일</th>
                <th className="text-left px-5 py-3 text-xs font-medium text-gray-500">상태</th>
                <th className="px-5 py-3 text-xs font-medium text-gray-500"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={8} className="text-center py-16 text-gray-400">
                    <ShoppingBag className="w-10 h-10 mx-auto mb-2 text-gray-200" />
                    <p className="text-sm">조회된 주문이 없습니다.</p>
                  </td>
                </tr>
              ) : (
                filtered.map((order) => {
                  const st = statusConfig[order.status];
                  const isExpanded = expandedOrder === order.id;
                  return (
                    <>
                      <tr
                        key={order.id}
                        className="hover:bg-gray-50 transition-colors cursor-pointer"
                        onClick={() => setExpandedOrder(isExpanded ? null : order.id)}
                      >
                        <td className="px-5 py-3.5 text-sm font-mono text-[#3D91FF]">
                          {order.orderNumber}
                        </td>
                        <td className="px-5 py-3.5 text-sm text-gray-800 max-w-[160px] truncate">
                          {order.productName}
                        </td>
                        <td className="px-5 py-3.5 text-sm text-gray-600">{order.customerName}</td>
                        <td className="px-5 py-3.5 text-sm text-gray-600">{order.quantity}개</td>
                        <td className="px-5 py-3.5 text-sm font-semibold text-gray-900">
                          {order.totalPrice.toLocaleString()}원
                        </td>
                        <td className="px-5 py-3.5 text-sm text-gray-500">{order.orderedAt}</td>
                        <td className="px-5 py-3.5">
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${st.className}`}
                          >
                            {st.label}
                          </span>
                        </td>
                        <td className="px-5 py-3.5">
                          <ChevronDown
                            className={`w-4 h-4 text-gray-400 transition-transform ${
                              isExpanded ? "rotate-180" : ""
                            }`}
                          />
                        </td>
                      </tr>
                      {isExpanded && (
                        <tr key={`${order.id}-detail`} className="bg-blue-50/40">
                          <td colSpan={8} className="px-5 py-4">
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm">
                              <div>
                                <p className="text-xs text-gray-500 mb-1">주문번호</p>
                                <p className="font-mono text-gray-800">{order.orderNumber}</p>
                              </div>
                              <div>
                                <p className="text-xs text-gray-500 mb-1">배송지</p>
                                <p className="text-gray-800">서울특별시 강남구</p>
                              </div>
                              <div>
                                <p className="text-xs text-gray-500 mb-1">연락처</p>
                                <p className="text-gray-800">010-****-5678</p>
                              </div>
                              <div>
                                <p className="text-xs text-gray-500 mb-1">결제수단</p>
                                <p className="text-gray-800">신용카드</p>
                              </div>
                            </div>
                            <div className="flex gap-2 mt-4">
                              {order.status === "pending" && (
                                <button className="px-3 py-1.5 bg-[#3D91FF] text-white text-xs font-medium rounded-lg hover:bg-[#1A7AFF] transition-colors">
                                  주문 확인
                                </button>
                              )}
                              {order.status === "confirmed" && (
                                <button className="px-3 py-1.5 bg-indigo-500 text-white text-xs font-medium rounded-lg hover:bg-indigo-600 transition-colors">
                                  배송 시작
                                </button>
                              )}
                              <button className="px-3 py-1.5 bg-white border border-gray-200 text-gray-600 text-xs font-medium rounded-lg hover:bg-gray-50 transition-colors">
                                상세보기
                              </button>
                            </div>
                          </td>
                        </tr>
                      )}
                    </>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between px-5 py-3.5 border-t border-gray-100">
          <p className="text-xs text-gray-500">
            총 {filtered.length}개 주문
          </p>
          <div className="flex items-center gap-1">
            <button className="p-1.5 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors">
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button className="px-3 py-1.5 rounded-lg text-xs font-medium bg-[#3D91FF] text-white">1</button>
            <button className="px-3 py-1.5 rounded-lg text-xs font-medium text-gray-500 hover:bg-gray-100 transition-colors">2</button>
            <button className="p-1.5 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors">
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
