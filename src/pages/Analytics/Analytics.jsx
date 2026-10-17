import { useState, useMemo } from "react";
import {
  FaChartLine,
  FaDollarSign,
  FaCalendarAlt,
  FaGlobeAmericas,
  FaCreditCard,
  FaPlaneDeparture,
  FaUsers
} from "react-icons/fa";

export default function Analytics() {
  const [timeframe, setTimeframe] = useState("Year 2026");

  const monthlyRevenue = [
    { month: "Jan", revenue: 14200, bookings: 12 },
    { month: "Feb", revenue: 18500, bookings: 15 },
    { month: "Mar", revenue: 22100, bookings: 19 },
    { month: "Apr", revenue: 19800, bookings: 16 },
    { month: "May", revenue: 28400, bookings: 24 },
    { month: "Jun", revenue: 34900, bookings: 29 },
    { month: "Jul", revenue: 42100, bookings: 36 },
    { month: "Aug", revenue: 39500, bookings: 33 },
    { month: "Sep", revenue: 31200, bookings: 26 },
    { month: "Oct", revenue: 27800, bookings: 23 },
    { month: "Nov", revenue: 33500, bookings: 28 },
    { month: "Dec", revenue: 48200, bookings: 41 }
  ];

  const maxRev = Math.max(...monthlyRevenue.map((m) => m.revenue));

  const destinationStats = [
    { name: "Bali, Indonesia", share: 32, revenue: "$115,200", growth: "+24%" },
    { name: "Swiss Alps, Switzerland", share: 26, revenue: "$93,600", growth: "+18%" },
    { name: "Maldives Islands", share: 22, revenue: "$79,200", growth: "+15%" },
    { name: "Dubai, UAE", share: 14, revenue: "$50,400", growth: "+11%" },
    { name: "Paris, France", share: 6, revenue: "$21,600", growth: "+7%" }
  ];

  const paymentBreakdown = [
    { method: "Credit / Debit Card", percent: 58, color: "bg-sky-500" },
    { method: "PayPal", percent: 24, color: "bg-blue-600" },
    { method: "Apple Pay / Google Pay", percent: 12, color: "bg-emerald-500" },
    { method: "Bank Wire Transfer", percent: 6, color: "bg-indigo-500" }
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
            Financial & Performance Analytics
          </h2>
          <p className="text-xs text-slate-400">
            Real-time business intelligence, revenue forecasting, and customer retention metrics.
          </p>
        </div>
        <select
          value={timeframe}
          onChange={(e) => setTimeframe(e.target.value)}
          className="bg-slate-900 border border-slate-800 text-xs font-bold text-white rounded-xl px-3.5 py-2 outline-none cursor-pointer self-start sm:self-auto"
        >
          <option value="Year 2026">Fiscal Year 2026</option>
          <option value="Last 90 Days">Last 90 Days</option>
          <option value="Last 30 Days">Last 30 Days</option>
        </select>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
          <span className="text-xs font-bold uppercase text-slate-400 tracking-wider">
            Gross Bookings Value
          </span>
          <div className="text-2xl font-extrabold text-white mt-2">$360,200</div>
          <span className="text-xs text-emerald-400 font-semibold mt-1 block">
            ↑ 22.4% vs last year
          </span>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
          <span className="text-xs font-bold uppercase text-slate-400 tracking-wider">
            Average Order Value
          </span>
          <div className="text-2xl font-extrabold text-white mt-2">$1,280</div>
          <span className="text-xs text-sky-400 font-semibold mt-1 block">
            Across 281 bookings
          </span>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
          <span className="text-xs font-bold uppercase text-slate-400 tracking-wider">
            Cart Conversion Rate
          </span>
          <div className="text-2xl font-extrabold text-white mt-2">4.82%</div>
          <span className="text-xs text-emerald-400 font-semibold mt-1 block">
            ↑ 0.6% this quarter
          </span>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
          <span className="text-xs font-bold uppercase text-slate-400 tracking-wider">
            Repeat Customers
          </span>
          <div className="text-2xl font-extrabold text-white mt-2">38.4%</div>
          <span className="text-xs text-indigo-400 font-semibold mt-1 block">
            High loyalty index
          </span>
        </div>
      </div>

      {/* Revenue Chart Widget (Visual Bar Chart) */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base sm:text-lg font-bold text-white">
              Monthly Revenue Growth
            </h3>
            <p className="text-xs text-slate-400">
              Gross sales generated across all active package offerings
            </p>
          </div>
          <span className="px-3 py-1 rounded-full text-xs font-extrabold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            $360.2k Total
          </span>
        </div>

        {/* Bar chart visual */}
        <div className="h-64 flex items-end gap-2 sm:gap-4 pt-8">
          {monthlyRevenue.map((item) => {
            const heightPercent = Math.round((item.revenue / maxRev) * 100);
            return (
              <div
                key={item.month}
                className="flex-1 flex flex-col items-center gap-2 h-full justify-end group"
              >
                {/* Tooltip on hover */}
                <span className="text-[10px] font-bold text-sky-300 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                  ${(item.revenue / 1000).toFixed(1)}k
                </span>
                {/* Bar */}
                <div
                  className="w-full bg-slate-800 group-hover:bg-gradient-to-t group-hover:from-blue-600 group-hover:to-sky-400 rounded-t-lg transition-all duration-300 cursor-pointer relative"
                  style={{ height: `${heightPercent}%` }}
                />
                {/* Month label */}
                <span className="text-[11px] font-semibold text-slate-400 group-hover:text-white">
                  {item.month}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Destination Shares & Payment Channels */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Destination Revenue Share */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
          <h3 className="text-base font-bold text-white">
            Top Destination Revenue Share
          </h3>
          <div className="space-y-4">
            {destinationStats.map((dest) => (
              <div key={dest.name} className="space-y-1.5">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-white">{dest.name}</span>
                  <div className="space-x-2">
                    <span className="text-emerald-400 font-bold">{dest.revenue}</span>
                    <span className="text-slate-400">({dest.share}%)</span>
                  </div>
                </div>
                <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-blue-600 to-sky-400 rounded-full"
                    style={{ width: `${dest.share}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Payment Channels */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
          <h3 className="text-base font-bold text-white">
            Payment Methods Used
          </h3>
          <div className="space-y-4">
            {paymentBreakdown.map((item) => (
              <div key={item.method} className="space-y-1.5">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-white">{item.method}</span>
                  <span className="text-sky-400 font-bold">{item.percent}%</span>
                </div>
                <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                  <div
                    className={`h-full ${item.color} rounded-full`}
                    style={{ width: `${item.percent}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="pt-4 border-t border-slate-800 text-xs text-slate-400">
            💡 100% of payment gateways are active and PCI-DSS compliant.
          </div>
        </div>
      </div>
    </div>
  );
}

