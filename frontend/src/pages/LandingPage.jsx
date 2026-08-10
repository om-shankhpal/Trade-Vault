import { Link } from "react-router-dom";
import {
  BookOpen,
  TrendingUp,
  Calendar,
  Brain,
  Camera,
  BarChart3,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";

function LandingPage() {
  const currentYear = new Date().getFullYear();

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans">
      {/* 1. Minimal Header */}
      <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/90 backdrop-blur-sm">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-2.5">
            <div className="flex h-7 w-7 items-center justify-center rounded bg-slate-900 text-xs font-bold text-white">
              TV
            </div>
            <span className="text-base font-bold tracking-tight text-slate-900">
              TradeVault
            </span>
          </div>

          <nav className="hidden items-center gap-8 text-xs font-medium text-slate-600 md:flex">
            <button
              onClick={() => scrollToSection("features")}
              className="transition hover:text-slate-900"
            >
              Features
            </button>
            <button
              onClick={() => scrollToSection("analytics")}
              className="transition hover:text-slate-900"
            >
              Analytics
            </button>
            <button
              onClick={() => scrollToSection("how-it-works")}
              className="transition hover:text-slate-900"
            >
              How It Works
            </button>
          </nav>

          <div className="flex items-center gap-3">
            <Link
              to="/login"
              className="text-xs font-medium text-slate-600 transition hover:text-slate-900 px-3 py-1.5"
            >
              Sign In
            </Link>
            <Link
              to="/register"
              className="rounded-lg bg-slate-900 px-4 py-2 text-xs font-semibold text-white transition hover:bg-slate-800"
            >
              Start Journaling
            </Link>
          </div>
        </div>
      </header>

      {/* 2. Minimal Hero Section */}
      <section className="mx-auto max-w-4xl px-6 pt-20 pb-16 text-center md:pt-24 md:pb-20">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3.5 py-1 text-xs font-medium text-slate-700">
          <ShieldCheck className="h-3.5 w-3.5 text-slate-900" />
          <span>Professional Trading Journal & Analytics</span>
        </div>

        <h1 className="text-4xl font-extrabold tracking-tight text-slate-950 sm:text-5xl md:text-6xl leading-tight">
          Trade with intention. <br />
          Learn from every trade.
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-sm leading-relaxed text-slate-600 sm:text-base">
          TradeVault is a minimal, data-focused trading journal built for serious traders to record completed executions, evaluate risk-to-reward ratios, and master market discipline.
        </p>

        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            to="/register"
            className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-6 py-3 text-xs font-semibold text-white transition hover:bg-slate-800"
          >
            <span>Start Journaling</span>
            <ArrowRight className="h-4 w-4" />
          </Link>

          <Link
            to="/login"
            className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-6 py-3 text-xs font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            Sign In
          </Link>
        </div>
      </section>

      {/* 3. Product Preview Card */}
      <section className="px-6 pb-20">
        <div className="mx-auto max-w-5xl">
          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 p-4 shadow-sm sm:p-6">
            <div className="mb-4 flex items-center justify-between border-b border-slate-200/80 pb-3">
              <div className="flex items-center gap-1.5">
                <div className="h-2.5 w-2.5 rounded-full bg-slate-300" />
                <div className="h-2.5 w-2.5 rounded-full bg-slate-300" />
                <div className="h-2.5 w-2.5 rounded-full bg-slate-300" />
                <span className="ml-2 text-[11px] font-mono text-slate-400">
                  tradevault.app/dashboard
                </span>
              </div>
              <span className="rounded border border-slate-200 bg-white px-2 py-0.5 text-[10px] font-semibold text-slate-700">
                Dashboard Preview
              </span>
            </div>

            {/* Dashboard Mock */}
            <div className="space-y-4 text-left">
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                <div className="rounded-xl border border-slate-200 bg-white p-3.5">
                  <p className="text-[11px] font-medium text-slate-500 uppercase">Total Trades</p>
                  <p className="mt-1 text-xl font-bold text-slate-900">128</p>
                </div>
                <div className="rounded-xl border border-slate-200 bg-white p-3.5">
                  <p className="text-[11px] font-medium text-slate-500 uppercase">Win Rate</p>
                  <p className="mt-1 text-xl font-bold text-slate-900">64.5%</p>
                </div>
                <div className="rounded-xl border border-slate-200 bg-white p-3.5">
                  <p className="text-[11px] font-medium text-slate-500 uppercase">Net P&L</p>
                  <p className="mt-1 text-xl font-bold text-emerald-600">+₹42,850</p>
                </div>
                <div className="rounded-xl border border-slate-200 bg-white p-3.5">
                  <p className="text-[11px] font-medium text-slate-500 uppercase">Average R</p>
                  <p className="mt-1 text-xl font-bold text-slate-900">2.1R</p>
                </div>
              </div>

              <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white">
                <table className="w-full text-left text-xs">
                  <thead className="border-b border-slate-100 bg-slate-50 text-slate-500 uppercase tracking-wider text-[10px] font-semibold">
                    <tr>
                      <th className="p-3">Symbol</th>
                      <th className="p-3">Direction</th>
                      <th className="p-3">Strategy</th>
                      <th className="p-3">Status</th>
                      <th className="p-3 text-right">Net P&L</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-medium">
                    <tr>
                      <td className="p-3 font-semibold text-slate-900">NIFTY24AUGFUT</td>
                      <td className="p-3"><span className="rounded border border-teal-200 bg-teal-50 px-2 py-0.5 text-teal-700 text-[10px]">LONG</span></td>
                      <td className="p-3 text-slate-600">ORB Breakout</td>
                      <td className="p-3"><span className="rounded border border-emerald-200 bg-emerald-50 px-2 py-0.5 text-emerald-700 text-[10px]">WIN</span></td>
                      <td className="p-3 text-right font-bold text-emerald-600">+₹12,400</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-semibold text-slate-900">BANKNIFTY48000CE</td>
                      <td className="p-3"><span className="rounded border border-teal-200 bg-teal-50 px-2 py-0.5 text-teal-700 text-[10px]">LONG</span></td>
                      <td className="p-3 text-slate-600">Pullback</td>
                      <td className="p-3"><span className="rounded border border-emerald-200 bg-emerald-50 px-2 py-0.5 text-emerald-700 text-[10px]">WIN</span></td>
                      <td className="p-3 text-right font-bold text-emerald-600">+₹8,150</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-semibold text-slate-900">RELIANCE24AUG</td>
                      <td className="p-3"><span className="rounded border border-amber-200 bg-amber-50 px-2 py-0.5 text-amber-700 text-[10px]">SHORT</span></td>
                      <td className="p-3 text-slate-600">Reversal</td>
                      <td className="p-3"><span className="rounded border border-rose-200 bg-rose-50 px-2 py-0.5 text-rose-700 text-[10px]">LOSS</span></td>
                      <td className="p-3 text-right font-bold text-rose-600">-₹3,200</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Features Section */}
      <section className="border-t border-slate-200 bg-slate-50 py-20" id="features">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">
              Features built for disciplined traders
            </h2>
            <p className="mt-3 text-xs text-slate-600">
              Everything you need to track execution quality, manage risk, and refine setups.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-xl border border-slate-200 bg-white p-5">
              <BookOpen className="h-5 w-5 text-slate-900" />
              <h3 className="mt-4 text-sm font-bold text-slate-900">Trade Journal</h3>
              <p className="mt-1.5 text-xs text-slate-600 leading-relaxed">
                Log symbols, execution timestamps, entry/exit prices, fees, and lot sizing accurately.
              </p>
            </div>

            <div className="rounded-xl border border-slate-200 bg-white p-5" id="analytics">
              <BarChart3 className="h-5 w-5 text-slate-900" />
              <h3 className="mt-4 text-sm font-bold text-slate-900">Performance Analytics</h3>
              <p className="mt-1.5 text-xs text-slate-600 leading-relaxed">
                Track net profit, win rate, expectancy, and cumulative equity curve trends.
              </p>
            </div>

            <div className="rounded-xl border border-slate-200 bg-white p-5">
              <Calendar className="h-5 w-5 text-slate-900" />
              <h3 className="mt-4 text-sm font-bold text-slate-900">Trading Calendar</h3>
              <p className="mt-1.5 text-xs text-slate-600 leading-relaxed">
                P&L heatmap calendar providing immediate visibility into daily profit and loss results.
              </p>
            </div>

            <div className="rounded-xl border border-slate-200 bg-white p-5">
              <Brain className="h-5 w-5 text-slate-900" />
              <h3 className="mt-4 text-sm font-bold text-slate-900">Trading Psychology</h3>
              <p className="mt-1.5 text-xs text-slate-600 leading-relaxed">
                Record emotional states at entry, during trade, and at exit to identify psychological leaks.
              </p>
            </div>

            <div className="rounded-xl border border-slate-200 bg-white p-5">
              <Camera className="h-5 w-5 text-slate-900" />
              <h3 className="mt-4 text-sm font-bold text-slate-900">Trade Screenshots</h3>
              <p className="mt-1.5 text-xs text-slate-600 leading-relaxed">
                Attach chart screenshots to inspect execution quality and technical triggers.
              </p>
            </div>

            <div className="rounded-xl border border-slate-200 bg-white p-5">
              <TrendingUp className="h-5 w-5 text-slate-900" />
              <h3 className="mt-4 text-sm font-bold text-slate-900">Performance Tracking</h3>
              <p className="mt-1.5 text-xs text-slate-600 leading-relaxed">
                Filter trades by strategy, market segment, or direction to identify winning setups.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. How It Works Section */}
      <section className="py-20" id="how-it-works">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <h2 className="text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">
            How It Works
          </h2>
          <p className="mt-3 text-xs text-slate-600">
            A simple 3-step process to build trading consistency.
          </p>

          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
            <div className="rounded-xl border border-slate-200 bg-slate-50/50 p-6">
              <div className="mx-auto flex h-9 w-9 items-center justify-center rounded-lg bg-slate-900 text-xs font-bold text-white">
                1
              </div>
              <h3 className="mt-4 text-sm font-bold text-slate-900">Record your trade</h3>
              <p className="mt-1.5 text-xs text-slate-600">
                Log entry, exit, price levels, strategy, and emotional state after execution.
              </p>
            </div>

            <div className="rounded-xl border border-slate-200 bg-slate-50/50 p-6">
              <div className="mx-auto flex h-9 w-9 items-center justify-center rounded-lg bg-slate-900 text-xs font-bold text-white">
                2
              </div>
              <h3 className="mt-4 text-sm font-bold text-slate-900">Review performance</h3>
              <p className="mt-1.5 text-xs text-slate-600">
                Analyze equity curves, monthly P&L charts, and calendar heatmaps.
              </p>
            </div>

            <div className="rounded-xl border border-slate-200 bg-slate-50/50 p-6">
              <div className="mx-auto flex h-9 w-9 items-center justify-center rounded-lg bg-slate-900 text-xs font-bold text-white">
                3
              </div>
              <h3 className="mt-4 text-sm font-bold text-slate-900">Improve process</h3>
              <p className="mt-1.5 text-xs text-slate-600">
                Eliminate unhelpful habits and double down on setups with positive expectancy.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Final CTA */}
      <section className="border-t border-slate-200 bg-slate-900 py-16 text-center text-white">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
            Your trades already contain the lessons. Start recording them.
          </h2>
          <p className="mt-3 text-xs text-slate-300">
            Join disciplined traders who track every trade with TradeVault.
          </p>

          <div className="mt-6 flex justify-center">
            <Link
              to="/register"
              className="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 text-xs font-semibold text-slate-950 transition hover:bg-slate-100"
            >
              <span>Create your journal</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* 7. Footer */}
      <footer className="border-t border-slate-800 bg-slate-950 py-6 text-slate-400">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 text-xs">
          <span className="font-bold text-white">TradeVault</span>
          <p>© {currentYear} TradeVault. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default LandingPage;
