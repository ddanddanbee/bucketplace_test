"use client";

import { useState } from "react";
import MainLayout from "@/components/layout/MainLayout";
import {
  User,
  Building2,
  CreditCard,
  Bell,
  Lock,
  CheckCircle,
  Camera,
} from "lucide-react";

type TabType = "basic" | "business" | "bank" | "notification" | "security";

interface ProfileData {
  name: string;
  email: string;
  phone: string;
  companyName: string;
  businessNumber: string;
  ceoName: string;
  address: string;
  category: string;
  bankName: string;
  accountNumber: string;
  accountHolder: string;
}

const defaultProfile: ProfileData = {
  name: "어반리빙 스토어",
  email: "partner@ohouse.kr",
  phone: "02-1234-5678",
  companyName: "어반리빙 주식회사",
  businessNumber: "123-45-67890",
  ceoName: "김대표",
  address: "서울특별시 강남구 테헤란로 123, 4층",
  category: "가구/인테리어",
  bankName: "국민은행",
  accountNumber: "123-456-789012",
  accountHolder: "어반리빙 주식회사",
};

const tabs: { id: TabType; label: string; icon: typeof User }[] = [
  { id: "basic", label: "기본 정보", icon: User },
  { id: "business", label: "사업자 정보", icon: Building2 },
  { id: "bank", label: "정산 계좌", icon: CreditCard },
  { id: "notification", label: "알림 설정", icon: Bell },
  { id: "security", label: "보안", icon: Lock },
];

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState<TabType>("basic");
  const [profile, setProfile] = useState<ProfileData>(defaultProfile);
  const [editedProfile, setEditedProfile] = useState<ProfileData>(defaultProfile);
  const [isSaved, setIsSaved] = useState(false);
  const [emailNotif, setEmailNotif] = useState(true);
  const [smsNotif, setSmsNotif] = useState(true);
  const [orderNotif, setOrderNotif] = useState(true);
  const [settlementNotif, setSettlementNotif] = useState(false);

  const handleSave = () => {
    setProfile(editedProfile);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2500);
  };

  return (
    <MainLayout title="파트너 정보">
      <div className="flex flex-col lg:flex-row gap-5">
        {/* Sidebar Tabs */}
        <div className="lg:w-56 flex-shrink-0">
          {/* Profile Card */}
          <div className="bg-white rounded-xl border border-gray-200 p-5 mb-3 text-center">
            <div className="relative inline-block">
              <div className="w-16 h-16 bg-[#3D91FF] rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto">
                A
              </div>
              <button className="absolute -bottom-0.5 -right-0.5 w-6 h-6 bg-white border border-gray-200 rounded-full flex items-center justify-center hover:bg-gray-50 transition-colors">
                <Camera className="w-3 h-3 text-gray-600" />
              </button>
            </div>
            <p className="font-semibold text-gray-900 mt-3">{profile.name}</p>
            <p className="text-xs text-gray-500 mt-0.5">{profile.email}</p>
            <div className="mt-3 px-3 py-1.5 bg-green-50 rounded-lg">
              <p className="text-xs text-green-700 font-medium">파트너 활성 상태</p>
            </div>
            <p className="text-xs text-gray-400 mt-2">파트너 ID: P-10234</p>
          </div>

          {/* Tab List */}
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium transition-colors border-b border-gray-100 last:border-b-0 ${
                    activeTab === tab.id
                      ? "bg-blue-50 text-[#3D91FF]"
                      : "text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  <Icon
                    className={`w-4 h-4 ${
                      activeTab === tab.id ? "text-[#3D91FF]" : "text-gray-400"
                    }`}
                  />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1">
          {/* Save Success Toast */}
          {isSaved && (
            <div className="flex items-center gap-2.5 bg-green-50 border border-green-100 rounded-xl px-4 py-3 mb-4">
              <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
              <p className="text-sm text-green-700 font-medium">변경사항이 저장되었습니다.</p>
            </div>
          )}

          {/* Basic Info Tab */}
          {activeTab === "basic" && (
            <div className="bg-white rounded-xl border border-gray-200">
              <div className="px-6 py-4 border-b border-gray-100">
                <h3 className="font-semibold text-gray-900">기본 정보</h3>
                <p className="text-xs text-gray-500 mt-0.5">파트너 계정의 기본 정보를 수정합니다.</p>
              </div>
              <div className="p-6 space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      파트너 이름
                    </label>
                    <input
                      type="text"
                      value={editedProfile.name}
                      onChange={(e) =>
                        setEditedProfile({ ...editedProfile, name: e.target.value })
                      }
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#3D91FF]/20 focus:border-[#3D91FF] transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      이메일
                    </label>
                    <input
                      type="email"
                      value={editedProfile.email}
                      onChange={(e) =>
                        setEditedProfile({ ...editedProfile, email: e.target.value })
                      }
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#3D91FF]/20 focus:border-[#3D91FF] transition-all"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    연락처
                  </label>
                  <input
                    type="tel"
                    value={editedProfile.phone}
                    onChange={(e) =>
                      setEditedProfile({ ...editedProfile, phone: e.target.value })
                    }
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#3D91FF]/20 focus:border-[#3D91FF] transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    판매 카테고리
                  </label>
                  <select
                    value={editedProfile.category}
                    onChange={(e) =>
                      setEditedProfile({ ...editedProfile, category: e.target.value })
                    }
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#3D91FF]/20 focus:border-[#3D91FF] transition-all bg-white"
                  >
                    <option>가구/인테리어</option>
                    <option>패브릭/텍스타일</option>
                    <option>조명</option>
                    <option>주방용품</option>
                    <option>욕실용품</option>
                    <option>소품/데코</option>
                  </select>
                </div>
              </div>
              <div className="px-6 py-4 border-t border-gray-100 flex justify-end">
                <button
                  onClick={handleSave}
                  className="px-5 py-2.5 bg-[#3D91FF] hover:bg-[#1A7AFF] text-white text-sm font-medium rounded-xl transition-colors"
                >
                  변경사항 저장
                </button>
              </div>
            </div>
          )}

          {/* Business Info Tab */}
          {activeTab === "business" && (
            <div className="bg-white rounded-xl border border-gray-200">
              <div className="px-6 py-4 border-b border-gray-100">
                <h3 className="font-semibold text-gray-900">사업자 정보</h3>
                <p className="text-xs text-gray-500 mt-0.5">사업자 등록 정보를 확인하고 수정합니다.</p>
              </div>
              <div className="p-6 space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      상호명
                    </label>
                    <input
                      type="text"
                      value={editedProfile.companyName}
                      onChange={(e) =>
                        setEditedProfile({ ...editedProfile, companyName: e.target.value })
                      }
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#3D91FF]/20 focus:border-[#3D91FF] transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      사업자 등록번호
                    </label>
                    <input
                      type="text"
                      value={editedProfile.businessNumber}
                      onChange={(e) =>
                        setEditedProfile({ ...editedProfile, businessNumber: e.target.value })
                      }
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#3D91FF]/20 focus:border-[#3D91FF] transition-all"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    대표자명
                  </label>
                  <input
                    type="text"
                    value={editedProfile.ceoName}
                    onChange={(e) =>
                      setEditedProfile({ ...editedProfile, ceoName: e.target.value })
                    }
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#3D91FF]/20 focus:border-[#3D91FF] transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    사업장 주소
                  </label>
                  <input
                    type="text"
                    value={editedProfile.address}
                    onChange={(e) =>
                      setEditedProfile({ ...editedProfile, address: e.target.value })
                    }
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#3D91FF]/20 focus:border-[#3D91FF] transition-all"
                  />
                </div>
                <div className="bg-yellow-50 border border-yellow-100 rounded-xl px-4 py-3">
                  <p className="text-xs text-yellow-700">
                    사업자 등록정보 변경 시 관련 서류를 함께 제출해야 합니다.{" "}
                    <a href="#" className="underline font-medium">고객센터 문의</a>
                  </p>
                </div>
              </div>
              <div className="px-6 py-4 border-t border-gray-100 flex justify-end">
                <button
                  onClick={handleSave}
                  className="px-5 py-2.5 bg-[#3D91FF] hover:bg-[#1A7AFF] text-white text-sm font-medium rounded-xl transition-colors"
                >
                  변경사항 저장
                </button>
              </div>
            </div>
          )}

          {/* Bank Info Tab */}
          {activeTab === "bank" && (
            <div className="bg-white rounded-xl border border-gray-200">
              <div className="px-6 py-4 border-b border-gray-100">
                <h3 className="font-semibold text-gray-900">정산 계좌 정보</h3>
                <p className="text-xs text-gray-500 mt-0.5">정산 받을 계좌를 등록하고 관리합니다.</p>
              </div>
              <div className="p-6 space-y-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    은행명
                  </label>
                  <select
                    value={editedProfile.bankName}
                    onChange={(e) =>
                      setEditedProfile({ ...editedProfile, bankName: e.target.value })
                    }
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#3D91FF]/20 focus:border-[#3D91FF] transition-all bg-white"
                  >
                    {["국민은행", "신한은행", "우리은행", "하나은행", "기업은행", "농협", "카카오뱅크", "토스뱅크"].map(
                      (b) => <option key={b}>{b}</option>
                    )}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    계좌번호
                  </label>
                  <input
                    type="text"
                    value={editedProfile.accountNumber}
                    onChange={(e) =>
                      setEditedProfile({ ...editedProfile, accountNumber: e.target.value })
                    }
                    placeholder="계좌번호를 입력하세요 (- 없이)"
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#3D91FF]/20 focus:border-[#3D91FF] transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    예금주명
                  </label>
                  <input
                    type="text"
                    value={editedProfile.accountHolder}
                    onChange={(e) =>
                      setEditedProfile({ ...editedProfile, accountHolder: e.target.value })
                    }
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#3D91FF]/20 focus:border-[#3D91FF] transition-all"
                  />
                </div>
                <div className="bg-blue-50 border border-blue-100 rounded-xl px-4 py-3">
                  <p className="text-xs text-blue-700">
                    계좌 변경은 본인 인증 후 가능합니다. 변경 후 다음 정산일부터 적용됩니다.
                  </p>
                </div>
              </div>
              <div className="px-6 py-4 border-t border-gray-100 flex justify-end gap-2">
                <button className="px-4 py-2.5 border border-gray-200 text-gray-600 text-sm font-medium rounded-xl hover:bg-gray-50 transition-colors">
                  계좌 인증
                </button>
                <button
                  onClick={handleSave}
                  className="px-5 py-2.5 bg-[#3D91FF] hover:bg-[#1A7AFF] text-white text-sm font-medium rounded-xl transition-colors"
                >
                  변경사항 저장
                </button>
              </div>
            </div>
          )}

          {/* Notification Tab */}
          {activeTab === "notification" && (
            <div className="bg-white rounded-xl border border-gray-200">
              <div className="px-6 py-4 border-b border-gray-100">
                <h3 className="font-semibold text-gray-900">알림 설정</h3>
                <p className="text-xs text-gray-500 mt-0.5">알림 수신 방법과 유형을 설정합니다.</p>
              </div>
              <div className="p-6 space-y-1">
                {[
                  {
                    label: "이메일 알림",
                    desc: "주요 알림을 이메일로 수신합니다",
                    value: emailNotif,
                    setValue: setEmailNotif,
                  },
                  {
                    label: "SMS 알림",
                    desc: "긴급 알림을 문자로 수신합니다",
                    value: smsNotif,
                    setValue: setSmsNotif,
                  },
                  {
                    label: "주문 알림",
                    desc: "새 주문 및 주문 상태 변경 알림",
                    value: orderNotif,
                    setValue: setOrderNotif,
                  },
                  {
                    label: "정산 알림",
                    desc: "정산 완료 및 정산 일정 알림",
                    value: settlementNotif,
                    setValue: setSettlementNotif,
                  },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="flex items-center justify-between py-4 border-b border-gray-100 last:border-b-0"
                  >
                    <div>
                      <p className="text-sm font-medium text-gray-900">{item.label}</p>
                      <p className="text-xs text-gray-500 mt-0.5">{item.desc}</p>
                    </div>
                    <button
                      onClick={() => item.setValue(!item.value)}
                      className={`relative w-11 h-6 rounded-full transition-colors ${
                        item.value ? "bg-[#3D91FF]" : "bg-gray-200"
                      }`}
                    >
                      <div
                        className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow-sm transition-transform ${
                          item.value ? "translate-x-5" : "translate-x-0.5"
                        }`}
                      />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Security Tab */}
          {activeTab === "security" && (
            <div className="space-y-4">
              <div className="bg-white rounded-xl border border-gray-200">
                <div className="px-6 py-4 border-b border-gray-100">
                  <h3 className="font-semibold text-gray-900">비밀번호 변경</h3>
                </div>
                <div className="p-6 space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">현재 비밀번호</label>
                    <input
                      type="password"
                      placeholder="현재 비밀번호"
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#3D91FF]/20 focus:border-[#3D91FF] transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">새 비밀번호</label>
                    <input
                      type="password"
                      placeholder="8자 이상, 영문/숫자/특수문자 조합"
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#3D91FF]/20 focus:border-[#3D91FF] transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">새 비밀번호 확인</label>
                    <input
                      type="password"
                      placeholder="새 비밀번호를 다시 입력하세요"
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#3D91FF]/20 focus:border-[#3D91FF] transition-all"
                    />
                  </div>
                </div>
                <div className="px-6 py-4 border-t border-gray-100 flex justify-end">
                  <button className="px-5 py-2.5 bg-[#3D91FF] hover:bg-[#1A7AFF] text-white text-sm font-medium rounded-xl transition-colors">
                    비밀번호 변경
                  </button>
                </div>
              </div>

              <div className="bg-white rounded-xl border border-gray-200">
                <div className="px-6 py-4 border-b border-gray-100">
                  <h3 className="font-semibold text-gray-900">계정 보안</h3>
                </div>
                <div className="p-6 space-y-3">
                  <div className="flex items-center justify-between py-3 border-b border-gray-100">
                    <div>
                      <p className="text-sm font-medium text-gray-900">2단계 인증</p>
                      <p className="text-xs text-gray-500 mt-0.5">로그인 시 추가 인증을 요구합니다</p>
                    </div>
                    <button className="px-3.5 py-2 text-xs font-medium text-[#3D91FF] border border-[#3D91FF] rounded-lg hover:bg-blue-50 transition-colors">
                      설정하기
                    </button>
                  </div>
                  <div className="flex items-center justify-between py-3">
                    <div>
                      <p className="text-sm font-medium text-gray-900">로그인 기록</p>
                      <p className="text-xs text-gray-500 mt-0.5">최근 로그인 활동을 확인합니다</p>
                    </div>
                    <button className="px-3.5 py-2 text-xs font-medium text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                      확인하기
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
}
