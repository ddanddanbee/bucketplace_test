"use client";

import { useState } from "react";
import MainLayout from "@/components/layout/MainLayout";
import { Settlement } from "@/types";
import {
  CreditCard,
  CheckCircle,
  Clock,
  AlertCircle,
  ChevronLeft,
  ChevronRight,
  Download,
  X,
} from "lucide-react";

const mockSettlements: Settlement[] = [
  {
    id: "1",
    period: "2024년 5월",
    totalSales: 38420000,
    commission: 3842000,
    netAmount: 34578000,
    status: "processing",
    settledAt: undefined,
  },
  {
    id: "2",
    period: "2024년 4월",
    totalSales: 42100000,
    commission: 4210000,
    netAmount: 37890000,
    status: "completed",
    settledAt: "2024-05-10",
  },
  {
    id: "3",
    period: "2024년 3월",
    totalSales: 35680000,
    commission: 3568000,
    netAmount: 32112000,
    status: "completed",
    settledAt: "2024-04-10",
  },
  {
    id: "4",
    period: "2024년 2월",
    totalSales: 29340000,
    commission: 2934000,
    netAmount: 26406000,
    status: "completed",
    settledAt: "2024-03-10",
  },
  {
    id: "5",
    period: "2024년 1월",
    totalSales: 31200000,
    commission: 3120000,
    netAmount: 28080000,
    status: "completed",
    settledAt: "2024-02-10",
  },
  {
    id: "6",
    period: "2023년 12월",
    totalSales: 55800000,
    commission: 5580000,
    netAmount: 50220000,
    status: "completed",
    settledAt: "2024-01-10",
  },
];

const statusConfig: Record<Settlement["status"], { label: string; className: string; icon: typeof CheckCircle }> = {
  pending: { label: "정산 대기", className: "bg-yellow-100 text-yellow-700", icon: Clock },
  processing: { label: "정산 처리중", className: "bg-blue-100 text-blue-700", icon: Clock },
  completed: { label: "정산 완료", className: "bg-green-100 text-green-700", icon: CheckCircle },
  requested: { label: "정산 요청", className: "bg-purple-100 text-purple-700", icon: AlertCircle },
};

export default function SettlementsPage() {
  const [showRequestModal, setShowRequestModal] = useState(false);

  const totalCompleted = mockSettlements
    .filter((s) => s.status === "completed")
    .reduce((sum, s) => sum + s.netAmount, 0);

  const thisMonth = mockSettlements.find((s) => s.period === "2024년 5월");
  const pendingAmount = thisMonth?.netAmount ?? 0;

  return (
    <MainLayout title="정산 관리">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <div className="flex items-center justify-between mb-3">
            <p className="text-sm text-gray-500">이번 달 정산 예정</p>
            <div className="w-9 h-9 bg-blue-50 rounded-xl flex items-center justify-center">
              <CreditCard className="w-4.5 h-4.5 text-[#3D91FF]" />
            </div>
          </div>
          <p className="text-2xl font-bold text-gray-900">
            {pendingAmount.toLocaleString()}원
          </p>
          <p className="text-xs text-gray-400 mt-1">정산일: 매월 10일</p>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <div className="flex items-center justify-between mb-3">
            <p className="text-sm text-gray-500">누적 정산 완료</p>
            <div className="w-9 h-9 bg-green-50 rounded-xl flex items-center justify-center">
              <CheckCircle className="w-4.5 h-4.5 text-green-600" />
            </div>
          </div>
          <p className="text-2xl font-bold text-gray-900">
            {totalCompleted.toLocaleString()}원
          </p>
          <p className="text-xs text-gray-400 mt-1">총 {mockSettlements.filter((s) => s.status === "completed").length}건 완료</p>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <div className="flex items-center justify-between mb-3">
            <p className="text-sm text-gray-500">평균 수수료율</p>
            <div className="w-9 h-9 bg-orange-50 rounded-xl flex items-center justify-center">
              <AlertCircle className="w-4.5 h-4.5 text-orange-500" />
            </div>
          </div>
          <p className="text-2xl font-bold text-gray-900">10%</p>
          <p className="text-xs text-gray-400 mt-1">판매금액 기준</p>
        </div>
      </div>

      {/* Info Banner */}
      <div className="bg-blue-50 border border-blue-100 rounded-xl px-5 py-4 mb-5 flex items-start justify-between gap-3">
        <div className="flex items-start gap-3">
          <AlertCircle className="w-4.5 h-4.5 text-[#3D91FF] flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-medium text-blue-800">정산 안내</p>
            <p className="text-xs text-blue-600 mt-0.5">
              정산은 매월 10일에 등록하신 계좌로 자동 이체됩니다. 정산 주기: 전월 1일 ~ 말일 판매분 기준
            </p>
          </div>
        </div>
        <button
          onClick={() => setShowRequestModal(true)}
          className="flex-shrink-0 px-3.5 py-2 bg-[#3D91FF] text-white text-xs font-medium rounded-lg hover:bg-[#1A7AFF] transition-colors"
        >
          정산 요청
        </button>
      </div>

      {/* Settlements Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
          <h3 className="font-semibold text-gray-900">정산 내역</h3>
          <button className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-gray-600 bg-gray-50 border border-gray-200 rounded-lg hover:bg-gray-100 transition-colors">
            <Download className="w-3.5 h-3.5" />
            내역 다운로드
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="text-left px-5 py-3 text-xs font-medium text-gray-500">정산 기간</th>
                <th className="text-left px-5 py-3 text-xs font-medium text-gray-500">총 매출액</th>
                <th className="text-left px-5 py-3 text-xs font-medium text-gray-500">수수료</th>
                <th className="text-left px-5 py-3 text-xs font-medium text-gray-500">정산 금액</th>
                <th className="text-left px-5 py-3 text-xs font-medium text-gray-500">정산일</th>
                <th className="text-left px-5 py-3 text-xs font-medium text-gray-500">상태</th>
                <th className="px-5 py-3 text-xs font-medium text-gray-500"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {mockSettlements.map((settlement) => {
                const st = statusConfig[settlement.status];
                const StatusIcon = st.icon;
                return (
                  <tr key={settlement.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-5 py-4 text-sm font-medium text-gray-900">
                      {settlement.period}
                    </td>
                    <td className="px-5 py-4 text-sm text-gray-700">
                      {settlement.totalSales.toLocaleString()}원
                    </td>
                    <td className="px-5 py-4 text-sm text-red-500 font-medium">
                      -{settlement.commission.toLocaleString()}원
                    </td>
                    <td className="px-5 py-4 text-sm font-bold text-gray-900">
                      {settlement.netAmount.toLocaleString()}원
                    </td>
                    <td className="px-5 py-4 text-sm text-gray-500">
                      {settlement.settledAt ?? "-"}
                    </td>
                    <td className="px-5 py-4">
                      <span
                        className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium ${st.className}`}
                      >
                        <StatusIcon className="w-3 h-3" />
                        {st.label}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <button className="text-xs text-[#3D91FF] hover:underline font-medium">
                        상세보기
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between px-5 py-3.5 border-t border-gray-100">
          <p className="text-xs text-gray-500">총 {mockSettlements.length}건</p>
          <div className="flex items-center gap-1">
            <button className="p-1.5 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors">
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button className="px-3 py-1.5 rounded-lg text-xs font-medium bg-[#3D91FF] text-white">1</button>
            <button className="p-1.5 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors">
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Settlement Request Modal */}
      {showRequestModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
              <h2 className="font-semibold text-gray-900">정산 요청</h2>
              <button
                onClick={() => setShowRequestModal(false)}
                className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div className="bg-blue-50 rounded-xl p-4 border border-blue-100">
                <p className="text-sm text-blue-700 font-medium mb-1">정산 요청 가능 금액</p>
                <p className="text-2xl font-bold text-blue-900">
                  {pendingAmount.toLocaleString()}원
                </p>
                <p className="text-xs text-blue-600 mt-1">2024년 5월 판매분 기준</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  정산 받을 계좌
                </label>
                <div className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-700">
                  국민은행 123-456-789012 (어반리빙 스토어)
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  요청 금액
                </label>
                <input
                  type="text"
                  defaultValue={pendingAmount.toLocaleString()}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#3D91FF]/20 focus:border-[#3D91FF] transition-all"
                />
              </div>
              <p className="text-xs text-gray-500">
                * 정산 요청 후 영업일 3-5일 이내 입금됩니다.
              </p>
            </div>
            <div className="flex gap-2 px-6 pb-6">
              <button
                onClick={() => setShowRequestModal(false)}
                className="flex-1 py-2.5 rounded-xl border border-gray-200 text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors"
              >
                취소
              </button>
              <button
                onClick={() => setShowRequestModal(false)}
                className="flex-1 py-2.5 rounded-xl bg-[#3D91FF] hover:bg-[#1A7AFF] text-white text-sm font-medium transition-colors"
              >
                정산 요청하기
              </button>
            </div>
          </div>
        </div>
      )}
    </MainLayout>
  );
}
