"use client";

import { useState } from "react";
import MainLayout from "@/components/layout/MainLayout";
import { Product } from "@/types";
import {
  Plus,
  Search,
  Filter,
  Edit2,
  Trash2,
  MoreVertical,
  Package,
  ChevronLeft,
  ChevronRight,
  X,
} from "lucide-react";

const mockProducts: Product[] = [
  {
    id: "1",
    name: "모던 소파 3인용 (그레이)",
    category: "소파/거실",
    price: 890000,
    stock: 12,
    status: "sale",
    createdAt: "2024-03-15",
  },
  {
    id: "2",
    name: "원목 식탁 세트 4인용",
    category: "식탁/의자",
    price: 1250000,
    stock: 0,
    status: "soldout",
    createdAt: "2024-03-10",
  },
  {
    id: "3",
    name: "미드센추리 암체어",
    category: "의자/스툴",
    price: 280000,
    stock: 34,
    status: "sale",
    createdAt: "2024-03-08",
  },
  {
    id: "4",
    name: "북유럽 책장 5단",
    category: "수납/책장",
    price: 320000,
    stock: 8,
    status: "sale",
    createdAt: "2024-03-05",
  },
  {
    id: "5",
    name: "패브릭 침대 프레임 퀸",
    category: "침대/매트리스",
    price: 720000,
    stock: 0,
    status: "hidden",
    createdAt: "2024-02-28",
  },
  {
    id: "6",
    name: "대리석 커피 테이블",
    category: "테이블/서랍",
    price: 450000,
    stock: 6,
    status: "sale",
    createdAt: "2024-02-20",
  },
  {
    id: "7",
    name: "스칸디나비안 행거 랙",
    category: "행거/드레스룸",
    price: 95000,
    stock: 52,
    status: "sale",
    createdAt: "2024-02-15",
  },
  {
    id: "8",
    name: "조명 펜던트 원형",
    category: "조명",
    price: 68000,
    stock: 0,
    status: "soldout",
    createdAt: "2024-02-10",
  },
];

const statusConfig: Record<Product["status"], { label: string; className: string }> = {
  sale: { label: "판매중", className: "bg-green-100 text-green-700" },
  soldout: { label: "품절", className: "bg-red-100 text-red-700" },
  hidden: { label: "숨김", className: "bg-gray-100 text-gray-600" },
};

type ModalMode = "add" | "edit" | null;

interface ProductFormData {
  name: string;
  category: string;
  price: string;
  stock: string;
  status: Product["status"];
}

const defaultForm: ProductFormData = {
  name: "",
  category: "소파/거실",
  price: "",
  stock: "",
  status: "sale",
};

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>(mockProducts);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | Product["status"]>("all");
  const [modalMode, setModalMode] = useState<ModalMode>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [formData, setFormData] = useState<ProductFormData>(defaultForm);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  const filtered = products.filter((p) => {
    const matchSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchStatus = statusFilter === "all" || p.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const openAdd = () => {
    setFormData(defaultForm);
    setSelectedProduct(null);
    setModalMode("add");
  };

  const openEdit = (product: Product) => {
    setFormData({
      name: product.name,
      category: product.category,
      price: product.price.toString(),
      stock: product.stock.toString(),
      status: product.status,
    });
    setSelectedProduct(product);
    setModalMode("edit");
  };

  const closeModal = () => {
    setModalMode(null);
    setSelectedProduct(null);
  };

  const handleSave = () => {
    if (!formData.name || !formData.price) return;
    if (modalMode === "add") {
      const newProduct: Product = {
        id: Date.now().toString(),
        name: formData.name,
        category: formData.category,
        price: parseInt(formData.price),
        stock: parseInt(formData.stock) || 0,
        status: formData.status,
        createdAt: new Date().toISOString().split("T")[0],
      };
      setProducts([newProduct, ...products]);
    } else if (modalMode === "edit" && selectedProduct) {
      setProducts(
        products.map((p) =>
          p.id === selectedProduct.id
            ? {
                ...p,
                name: formData.name,
                category: formData.category,
                price: parseInt(formData.price),
                stock: parseInt(formData.stock) || 0,
                status: formData.status,
              }
            : p
        )
      );
    }
    closeModal();
  };

  const handleDelete = (id: string) => {
    setProducts(products.filter((p) => p.id !== id));
    setDeleteConfirmId(null);
  };

  return (
    <MainLayout title="상품 관리">
      {/* Header Actions */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-5">
        <div className="flex items-center gap-2 flex-wrap">
          {/* Search */}
          <div className="relative">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="상품명 검색..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 pr-4 py-2 text-sm bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3D91FF]/20 focus:border-[#3D91FF] w-52 transition-all"
            />
          </div>

          {/* Status Filter */}
          <div className="flex items-center gap-1 bg-white border border-gray-200 rounded-lg p-1">
            {(["all", "sale", "soldout", "hidden"] as const).map((s) => (
              <button
                key={s}
                onClick={() => setStatusFilter(s)}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all ${
                  statusFilter === s
                    ? "bg-[#3D91FF] text-white shadow-sm"
                    : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
                }`}
              >
                {s === "all" ? "전체" : statusConfig[s].label}
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={openAdd}
          className="flex items-center gap-2 bg-[#3D91FF] hover:bg-[#1A7AFF] text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors shadow-sm shadow-blue-200"
        >
          <Plus className="w-4 h-4" />
          상품 등록
        </button>
      </div>

      {/* Summary */}
      <div className="text-xs text-gray-500 mb-3">
        총 <span className="font-semibold text-gray-700">{filtered.length}</span>개의 상품
      </div>

      {/* Product Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="text-left px-5 py-3 text-xs font-medium text-gray-500">상품명</th>
                <th className="text-left px-5 py-3 text-xs font-medium text-gray-500">카테고리</th>
                <th className="text-left px-5 py-3 text-xs font-medium text-gray-500">판매가</th>
                <th className="text-left px-5 py-3 text-xs font-medium text-gray-500">재고</th>
                <th className="text-left px-5 py-3 text-xs font-medium text-gray-500">상태</th>
                <th className="text-left px-5 py-3 text-xs font-medium text-gray-500">등록일</th>
                <th className="text-left px-5 py-3 text-xs font-medium text-gray-500">관리</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center py-16 text-gray-400">
                    <Package className="w-10 h-10 mx-auto mb-2 text-gray-200" />
                    <p className="text-sm">등록된 상품이 없습니다.</p>
                  </td>
                </tr>
              ) : (
                filtered.map((product) => {
                  const st = statusConfig[product.status];
                  return (
                    <tr key={product.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                            <Package className="w-4 h-4 text-gray-400" />
                          </div>
                          <span className="text-sm font-medium text-gray-900">{product.name}</span>
                        </div>
                      </td>
                      <td className="px-5 py-4 text-sm text-gray-500">{product.category}</td>
                      <td className="px-5 py-4 text-sm font-semibold text-gray-900">
                        {product.price.toLocaleString()}원
                      </td>
                      <td className="px-5 py-4 text-sm text-gray-600">
                        <span className={product.stock === 0 ? "text-red-500 font-medium" : ""}>
                          {product.stock}개
                        </span>
                      </td>
                      <td className="px-5 py-4">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${st.className}`}
                        >
                          {st.label}
                        </span>
                      </td>
                      <td className="px-5 py-4 text-sm text-gray-500">{product.createdAt}</td>
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => openEdit(product)}
                            className="p-1.5 text-gray-400 hover:text-[#3D91FF] hover:bg-blue-50 rounded-lg transition-colors"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => setDeleteConfirmId(product.id)}
                            className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between px-5 py-3.5 border-t border-gray-100">
          <p className="text-xs text-gray-500">
            {filtered.length}개 중 1-{Math.min(filtered.length, 10)}개 표시
          </p>
          <div className="flex items-center gap-1">
            <button className="p-1.5 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors">
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button className="px-3 py-1.5 rounded-lg text-xs font-medium bg-[#3D91FF] text-white">
              1
            </button>
            <button className="px-3 py-1.5 rounded-lg text-xs font-medium text-gray-500 hover:bg-gray-100 transition-colors">
              2
            </button>
            <button className="p-1.5 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors">
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Add/Edit Modal */}
      {modalMode && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
              <h2 className="font-semibold text-gray-900">
                {modalMode === "add" ? "상품 등록" : "상품 수정"}
              </h2>
              <button
                onClick={closeModal}
                className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">상품명 *</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="상품명을 입력하세요"
                  className="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#3D91FF]/20 focus:border-[#3D91FF] transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">카테고리</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#3D91FF]/20 focus:border-[#3D91FF] transition-all bg-white"
                >
                  {["소파/거실", "식탁/의자", "의자/스툴", "수납/책장", "침대/매트리스", "테이블/서랍", "행거/드레스룸", "조명"].map((c) => (
                    <option key={c}>{c}</option>
                  ))}
                </select>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">판매가 *</label>
                  <input
                    type="number"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    placeholder="0"
                    className="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#3D91FF]/20 focus:border-[#3D91FF] transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">재고</label>
                  <input
                    type="number"
                    value={formData.stock}
                    onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                    placeholder="0"
                    className="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#3D91FF]/20 focus:border-[#3D91FF] transition-all"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">상태</label>
                <div className="flex gap-2">
                  {(["sale", "soldout", "hidden"] as const).map((s) => (
                    <button
                      key={s}
                      onClick={() => setFormData({ ...formData, status: s })}
                      className={`flex-1 py-2 rounded-lg text-xs font-medium border transition-all ${
                        formData.status === s
                          ? "bg-[#3D91FF] border-[#3D91FF] text-white"
                          : "border-gray-200 text-gray-600 hover:border-gray-300"
                      }`}
                    >
                      {statusConfig[s].label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex gap-2 px-6 pb-6">
              <button
                onClick={closeModal}
                className="flex-1 py-2.5 rounded-xl border border-gray-200 text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors"
              >
                취소
              </button>
              <button
                onClick={handleSave}
                className="flex-1 py-2.5 rounded-xl bg-[#3D91FF] hover:bg-[#1A7AFF] text-white text-sm font-medium transition-colors"
              >
                {modalMode === "add" ? "등록하기" : "저장하기"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirm Modal */}
      {deleteConfirmId && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm p-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Trash2 className="w-5 h-5 text-red-500" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">상품을 삭제하시겠습니까?</h3>
              <p className="text-sm text-gray-500 mb-5">삭제된 상품은 복구할 수 없습니다.</p>
              <div className="flex gap-2">
                <button
                  onClick={() => setDeleteConfirmId(null)}
                  className="flex-1 py-2.5 rounded-xl border border-gray-200 text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors"
                >
                  취소
                </button>
                <button
                  onClick={() => handleDelete(deleteConfirmId)}
                  className="flex-1 py-2.5 rounded-xl bg-red-500 hover:bg-red-600 text-white text-sm font-medium transition-colors"
                >
                  삭제
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </MainLayout>
  );
}
