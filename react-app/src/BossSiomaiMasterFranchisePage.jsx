import React from "react";
import { motion } from "framer-motion";
import {
  CheckCircle2,
  Store,
  ShieldCheck,
  MapPinned,
  Wallet,
  BadgeDollarSign,
  Clock3,
  TrendingUp,
  Package,
  Users,
} from "lucide-react";

const cartIncome = {
  pcsPerCartPerDay: 300,
  servingsFrom300Pcs: 75,
  pricePerServing: 45,
  grossPerCartPerDay: 3375,
  estimatedDailyExpensePerCart: 2400,
  cleanProfitPerCartPerDay: 975,
  operatingDaysPerMonth: 26,
  carts: 3,
};

const monthlyNetIncome =
  cartIncome.cleanProfitPerCartPerDay *
  cartIncome.operatingDaysPerMonth *
  cartIncome.carts;

const largeDistribution = [
  { product: "Pork", retail: 185, moqPacks: 4, total: 740 },
  { product: "Chicken", retail: 185, moqPacks: 4, total: 740 },
  { product: "Cheesy Inferno", retail: 190, moqPacks: 4, total: 760 },
  { product: "Beefy", retail: 195, moqPacks: 4, total: 780 },
  { product: "Tokyo Bites", retail: 210, moqPacks: 4, total: 840 },
];

const jumboDistribution = [
  { product: "Pork", retail: 195, moqPacks: 4, total: 780 },
  { product: "Chicken", retail: 195, moqPacks: 4, total: 780 },
  { product: "Cheesy Inferno", retail: 200, moqPacks: 4, total: 800 },
  { product: "Beefy", retail: 205, moqPacks: 4, total: 820 },
  { product: "Tokyo Bites", retail: 220, moqPacks: 4, total: 880 },
];

const sum = (arr) => arr.reduce((acc, item) => acc + item.total, 0);

const formatPHP = (value) =>
  new Intl.NumberFormat("en-PH", {
    style: "currency",
    currency: "PHP",
    maximumFractionDigits: 0,
  }).format(value);

const cardMotion = {
  initial: { opacity: 0, y: 10 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.25 },
};

function DistributionTable({ title, rows, capital, profit }) {
  return (
    <motion.article {...cardMotion} className="rounded-2xl border border-slate-200 bg-white/85 p-5 shadow-sm backdrop-blur">
      <h3 className="text-lg font-black text-slate-900">{title}</h3>
      <p className="mt-1 text-sm text-slate-600">MOQ: 20 packs | 5 flavors x 4 packs</p>
      <div className="mt-4 overflow-x-auto rounded-xl border border-slate-200">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-slate-50 text-slate-600">
            <tr>
              <th className="px-3 py-2">Product</th>
              <th className="px-3 py-2">Retail</th>
              <th className="px-3 py-2">MOQ</th>
              <th className="px-3 py-2 text-right">Total</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.product} className="border-t border-slate-100">
                <td className="px-3 py-2 font-semibold text-slate-800">{r.product}</td>
                <td className="px-3 py-2 text-slate-700">{formatPHP(r.retail)}</td>
                <td className="px-3 py-2 text-slate-700">{r.moqPacks} packs</td>
                <td className="px-3 py-2 text-right font-bold text-slate-900">{formatPHP(r.total)}</td>
              </tr>
            ))}
          </tbody>
          <tfoot className="border-t-2 border-slate-200 bg-slate-50">
            <tr>
              <td className="px-3 py-2 font-semibold text-slate-700" colSpan={3}>
                Sample reseller total
              </td>
              <td className="px-3 py-2 text-right font-black text-slate-900">{formatPHP(sum(rows))}</td>
            </tr>
          </tfoot>
        </table>
      </div>
      <div className="mt-3 grid gap-2 sm:grid-cols-2">
        <div className="rounded-lg border border-blue-100 bg-blue-50 p-3">
          <p className="text-xs font-semibold uppercase tracking-wide text-blue-700">Your Capital</p>
          <p className="mt-1 text-base font-black text-blue-900">{capital}</p>
        </div>
        <div className="rounded-lg border border-red-100 bg-red-50 p-3">
          <p className="text-xs font-semibold uppercase tracking-wide text-red-700">Sample Clean Profit</p>
          <p className="mt-1 text-base font-black text-red-900">{profit}</p>
        </div>
      </div>
    </motion.article>
  );
}

export default function BossSiomaiMasterFranchisePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#fff7ed] via-[#f8fafc] to-[#eef2ff] text-slate-900">
      <header className="sticky top-0 z-20 border-b border-white/60 bg-white/70 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <div className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-blue-600 to-red-500 text-white shadow">
              <Store className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm font-black text-slate-900">BOSS SIOMAI</p>
              <p className="text-xs text-slate-500">Master Franchise Opportunity</p>
            </div>
          </div>
          <nav className="hidden gap-2 md:flex">
            {["Overview", "Rights", "Cart Income", "Distribution", "Package"].map((label) => (
              <a
                key={label}
                href={`#${label.toLowerCase().replace(" ", "-")}`}
                className="rounded-lg px-3 py-2 text-sm font-semibold text-slate-600 hover:bg-white hover:text-slate-900"
              >
                {label}
              </a>
            ))}
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 pb-16 pt-10 sm:px-6 lg:px-8">
        <section id="overview" className="grid gap-6 lg:grid-cols-2">
          <motion.article {...cardMotion} className="rounded-3xl border border-white/70 bg-white/85 p-6 shadow backdrop-blur">
            <p className="inline-flex items-center gap-2 rounded-full border border-red-200 bg-red-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-red-700">
              <BadgeDollarSign className="h-4 w-4" /> Investment and Revenue Model
            </p>
            <h1 className="mt-4 text-4xl font-black tracking-tight text-slate-900 sm:text-5xl">
              Master Franchise Web Page
              <span className="block bg-gradient-to-r from-blue-600 to-red-500 bg-clip-text text-transparent">for Boss Siomai</span>
            </h1>
            <p className="mt-4 text-sm leading-7 text-slate-600 sm:text-base">
              A modern, responsive presentation page that organizes your franchise information into a clean sales-ready UI.
            </p>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {[
                [Wallet, "Package Cost", formatPHP(2000000)],
                [Clock3, "Contract", "5 Years (Renewable)"],
                [MapPinned, "Territory", "Exclusive City / Municipality"],
                [Users, "Sub-Franchise", "Recruit + Manage Network"],
              ].map(([Icon, label, value]) => (
                <div key={label} className="rounded-xl border border-slate-200 bg-white p-3">
                  <div className="mb-2 inline-flex h-9 w-9 items-center justify-center rounded-lg bg-slate-100 text-slate-700">
                    <Icon className="h-4 w-4" />
                  </div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">{label}</p>
                  <p className="mt-1 font-black text-slate-900">{value}</p>
                </div>
              ))}
            </div>
          </motion.article>

          <motion.article {...cardMotion} className="rounded-3xl border border-slate-200 bg-gradient-to-br from-slate-900 to-slate-800 p-6 text-white shadow-lg">
            <h2 className="text-xl font-black">Quick Snapshot</h2>
            <p className="mt-2 text-sm text-slate-300">Estimated Monthly Net (3 Carts / 26 Days)</p>
            <p className="mt-1 text-4xl font-black text-red-300">{formatPHP(monthlyNetIncome)}</p>
            <div className="mt-5 space-y-2">
              {[
                "Exclusive rights within city/municipality",
                "Authority to recruit and manage sub-franchise networks",
                "Operate branches and support sub-franchisees",
                "Multiple revenue streams (cart + distribution)",
              ].map((item) => (
                <div key={item} className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 p-3 text-sm">
                  <CheckCircle2 className="h-4 w-4 text-red-300" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </motion.article>
        </section>

        <section id="rights" className="mt-12">
          <h2 className="text-3xl font-black tracking-tight text-slate-900">Franchise Rights and Exclusivity</h2>
          <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {[
              [ShieldCheck, "Exclusive Operational Territory", "Protected area for operations and expansion."],
              [Clock3, "5-Year Renewable Contract", "Longer runway for growth with renewal option."],
              [Users, "Develop and Manage Network", "Scale through local recruitment and support."],
              [TrendingUp, "Multiple Revenue Streams", "Cart and distribution income."],
            ].map(([Icon, title, desc]) => (
              <motion.article key={title} {...cardMotion} className="rounded-2xl border border-slate-200 bg-white/90 p-4 shadow-sm">
                <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-red-500 to-blue-600 text-white">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="font-black text-slate-900">{title}</h3>
                <p className="mt-1 text-sm text-slate-600">{desc}</p>
              </motion.article>
            ))}
          </div>
        </section>

        <section id="cart-income" className="mt-12 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <motion.article {...cardMotion} className="rounded-2xl border border-slate-200 bg-white/90 p-5 shadow-sm">
            <h2 className="text-2xl font-black text-slate-900">How You Earn Through Carts</h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-3"><p className="text-xs text-slate-500">Siomai Per Cart / Day</p><strong>{cartIncome.pcsPerCartPerDay} pcs</strong></div>
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-3"><p className="text-xs text-slate-500">Servings From 300 pcs</p><strong>{cartIncome.servingsFrom300Pcs} servings</strong></div>
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-3"><p className="text-xs text-slate-500">Price Per Serving</p><strong>{formatPHP(cartIncome.pricePerServing)}</strong></div>
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-3"><p className="text-xs text-slate-500">Gross Per Cart / Day</p><strong>{formatPHP(cartIncome.grossPerCartPerDay)}</strong></div>
            </div>
            <div className="mt-4 grid gap-3 sm:grid-cols-3">
              <div className="rounded-xl border border-blue-100 bg-blue-50 p-3"><p className="text-xs text-blue-700">Estimated Daily Expense</p><strong>{formatPHP(cartIncome.estimatedDailyExpensePerCart)}</strong></div>
              <div className="rounded-xl border border-red-100 bg-red-50 p-3"><p className="text-xs text-red-700">Clean Profit / Cart / Day</p><strong>{formatPHP(cartIncome.cleanProfitPerCartPerDay)}</strong></div>
              <div className="rounded-xl border border-indigo-100 bg-indigo-50 p-3"><p className="text-xs text-indigo-700">Monthly Net (3 Carts)</p><strong>{formatPHP(monthlyNetIncome)}</strong></div>
            </div>
          </motion.article>
          <motion.article {...cardMotion} className="rounded-2xl border border-slate-200 bg-white/90 p-5 shadow-sm">
            <h3 className="text-lg font-black text-slate-900">Sample Monthly Computation</h3>
            <div className="mt-4 space-y-2">
              {[1, 2, 3].map((cart) => (
                <div key={cart} className="rounded-lg border border-slate-200 bg-slate-50 p-3 text-sm text-slate-700">
                  Cart {cart}: {formatPHP(cartIncome.cleanProfitPerCartPerDay)} x {cartIncome.operatingDaysPerMonth} days ={" "}
                  <span className="font-bold text-slate-900">{formatPHP(cartIncome.cleanProfitPerCartPerDay * cartIncome.operatingDaysPerMonth)}</span>
                </div>
              ))}
            </div>
            <div className="mt-4 rounded-xl border border-red-100 bg-red-50 p-4">
              <p className="text-xs uppercase tracking-wide text-red-700">Estimated Monthly Net Income</p>
              <p className="mt-1 text-2xl font-black text-red-900">{formatPHP(monthlyNetIncome)} / month</p>
            </div>
          </motion.article>
        </section>

        <section id="distribution" className="mt-12">
          <h2 className="text-3xl font-black tracking-tight text-slate-900">How You Earn Through Distribution</h2>
          <div className="mt-5 grid gap-5">
            <DistributionTable title="Large Size (25 pcs / pack)" rows={largeDistribution} capital="PHP 2,780" profit="PHP 1,080 per reseller (sample)" />
            <DistributionTable title="Jumbo Size (16 pcs / pack)" rows={jumboDistribution} capital="PHP 2,960" profit="PHP 1,100 per reseller (sample)" />
          </div>
        </section>

        <section id="package" className="mt-12 grid gap-5 lg:grid-cols-2">
          <motion.article {...cardMotion} className="rounded-2xl border border-slate-200 bg-white/90 p-5 shadow-sm">
            <h2 className="text-2xl font-black text-slate-900">What's Included in the Master Franchise Package</h2>
            <div className="mt-4 grid gap-3">
              {[
                ["Franchise Rights and Exclusivity", "Exclusive Territory", ShieldCheck],
                ["Food Cart Package", "PHP 1,000,000 worth", Store],
                ["Products and Supplies", "PHP 500,000 worth", Package],
                ["Additional Allocation", "PHP 500,000 worth", Package],
              ].map(([title, value, Icon]) => (
                <div key={title} className="flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 p-3">
                  <div className="grid h-10 w-10 place-items-center rounded-lg bg-white text-slate-700 shadow-sm">
                    <Icon className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-900">{title}</p>
                    <p className="text-sm text-slate-600">{value}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.article>

          <motion.article {...cardMotion} className="rounded-2xl border border-slate-200 bg-white/90 p-5 shadow-sm">
            <h3 className="text-2xl font-black text-slate-900">Best Use of This Webpage</h3>
            <p className="mt-2 text-sm text-slate-600">
              This format is ideal for sales discussions, investor walkthroughs, franchise presentations, and mobile sharing.
            </p>
            <ul className="mt-4 space-y-2 text-sm text-slate-700">
              {[
                "Present franchise value proposition in a cleaner UI",
                "Show cart and distribution earning models in one page",
                "Use on phones/tablets during meetings",
                "Convert into live website with inquiry form and CTA",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2 rounded-lg border border-slate-200 bg-slate-50 p-3">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-red-500" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </motion.article>
        </section>
      </main>
    </div>
  );
}
