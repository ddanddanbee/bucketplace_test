import { Order } from "@/types";

const statusConfig: Record<
  Order["status"],
  { label: string; className: string }
> = {
  pending: {
    label: "결제완료",
    className: "bg-yellow-100 text-yellow-700",
  },
  confirmed: {
    label: "주문확인",
    className: "bg-blue-100 text-blue-700",
  },
  shipping: {
    label: "배송중",
    className: "bg-indigo-100 text-indigo-700",
  },
  delivered: {
    label: "배송완료",
    className: "bg-green-100 text-green-700",
  },
  cancelled: {
    label: "취소됨",
    className: "bg-red-100 text-red-700",
  },
};

const recentOrders: Order[] = [
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
];

export default function RecentOrders() {
  return (
    <div className="bg-white rounded-xl border border-gray-200">
      <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
        <h3 className="font-semibold text-gray-900">최근 주문</h3>
        <a
          href="/orders"
          className="text-xs text-[#3D91FF] hover:underline font-medium"
        >
          전체보기
        </a>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="text-xs text-gray-500 border-b border-gray-100">
              <th className="text-left px-5 py-3 font-medium">주문번호</th>
              <th className="text-left px-5 py-3 font-medium">상품명</th>
              <th className="text-left px-5 py-3 font-medium">구매자</th>
              <th className="text-left px-5 py-3 font-medium">결제금액</th>
              <th className="text-left px-5 py-3 font-medium">주문일</th>
              <th className="text-left px-5 py-3 font-medium">상태</th>
            </tr>
          </thead>
          <tbody>
            {recentOrders.map((order) => {
              const status = statusConfig[order.status];
              return (
                <tr
                  key={order.id}
                  className="border-b border-gray-50 hover:bg-gray-50 transition-colors"
                >
                  <td className="px-5 py-3.5 text-sm font-mono text-[#3D91FF]">
                    {order.orderNumber}
                  </td>
                  <td className="px-5 py-3.5 text-sm text-gray-800 max-w-[180px] truncate">
                    {order.productName}
                  </td>
                  <td className="px-5 py-3.5 text-sm text-gray-600">
                    {order.customerName}
                  </td>
                  <td className="px-5 py-3.5 text-sm font-semibold text-gray-900">
                    {order.totalPrice.toLocaleString()}원
                  </td>
                  <td className="px-5 py-3.5 text-sm text-gray-500">
                    {order.orderedAt}
                  </td>
                  <td className="px-5 py-3.5">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${status.className}`}
                    >
                      {status.label}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
