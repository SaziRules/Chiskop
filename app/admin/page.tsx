"use client";

import { useEffect, useState, useCallback } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// ─── Types ────────────────────────────────────────────────────────────────────

type Review = {
  id: string;
  name: string;
  title: string;
  message: string;
  rating: number;
  recommend: string;
  productSlug: string;
  brand: string;
  approved: boolean;
  created_at: string;
};

type Subscription = {
  id: string;
  email: string | null;
  phone: string | null;
  brand: string;
  created_at: string;
};

type Contact = {
  id: string;
  name: string;
  email: string;
  message: string;
  brand: string;
  read: boolean;
  status: "open" | "replied";
  ticket_id: string | null;
  created_at: string;
};

type Tab = "reviews" | "subscriptions" | "contacts";

// ─── Helpers ──────────────────────────────────────────────────────────────────

const ADMIN_PASSWORD = process.env.NEXT_PUBLIC_CHISKOP_ADMIN_PASSWORD ?? "chiskop2025";

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-ZA", {
    day: "numeric", month: "short", year: "numeric",
  });
}

function generateTicketId(): string {
  const year = new Date().getFullYear();
  const rand = Math.floor(1000 + Math.random() * 9000);
  return `CSK-${year}-${rand}`;
}

function Stars({ rating }: { rating: number }) {
  return (
    <span className="flex items-center gap-0.5">
      {[1,2,3,4,5].map((s) => (
        <span key={s} className={`text-[15px] leading-none ${s <= rating ? "text-chiskop-red" : "text-gray-300"}`}>★</span>
      ))}
    </span>
  );
}

// ─── Password Gate ────────────────────────────────────────────────────────────

function PasswordGate({ onUnlock }: { onUnlock: () => void }) {
  const [pw, setPw]       = useState("");
  const [error, setError] = useState(false);
  const [shake, setShake] = useState(false);

  const attempt = () => {
    if (pw === ADMIN_PASSWORD) { onUnlock(); }
    else {
      setError(true); setShake(true);
      setTimeout(() => setShake(false), 500);
    }
  };

  return (
    <div className="min-h-screen bg-chiskop-offWhite flex items-center justify-center p-6">
      <div className="w-full max-w-sm">
        <div className="flex flex-col items-center mb-10">
          <div className="w-14 h-14 bg-chiskop-red flex items-center justify-center mb-5">
            <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" className="w-6 h-6">
              <rect x="3" y="11" width="18" height="11" rx="1" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
          </div>
          <p className="text-[11px] tracking-[0.3em] uppercase text-chiskop-gray font-light">Chiskop For Men</p>
          <h1 className="text-[26px] font-bold text-chiskop-black mt-1 uppercase">Admin</h1>
        </div>

        <div className={`transition-transform duration-100 ${shake ? "translate-x-2" : ""}`}>
          <div className={`border-b-2 pb-2 mb-1 transition-colors ${error ? "border-red-400" : "border-chiskop-black/20 focus-within:border-chiskop-red"}`}>
            <input
              type="password"
              placeholder="Enter password"
              value={pw}
              onChange={(e) => { setPw(e.target.value); setError(false); }}
              onKeyDown={(e) => e.key === "Enter" && attempt()}
              className="w-full bg-transparent text-[15px] font-light text-chiskop-black placeholder:text-gray-400 outline-none pb-1 tracking-widest"
              autoFocus
            />
          </div>
          {error && <p className="text-[12px] text-red-500 font-normal mt-2">Incorrect password.</p>}
        </div>

        <button
          onClick={attempt}
          className="mt-6 w-full py-3.5 bg-chiskop-red text-white text-[11px] tracking-[0.25em] uppercase font-bold hover:bg-[#7c1217] transition-colors duration-200 border-0 cursor-pointer rounded-md"
        >
          Enter
        </button>
      </div>
    </div>
  );
}

// ─── Tab Button ───────────────────────────────────────────────────────────────

function TabBtn({ label, active, count, onClick }: { label: string; active: boolean; count?: number; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 px-6 py-4 text-[11px] tracking-[0.2em] uppercase font-bold border-0 cursor-pointer transition-all duration-150
        ${active
          ? "bg-chiskop-red text-white"
          : "bg-transparent text-chiskop-gray hover:text-chiskop-black hover:bg-chiskop-red/5"
        }`}
    >
      {label}
      {count !== undefined && (
        <span className={`text-[10px] px-1.5 py-0.5 rounded-full min-w-4.5 text-center ${active ? "bg-white/20 text-white" : "bg-chiskop-black/10 text-chiskop-gray"}`}>
          {count}
        </span>
      )}
    </button>
  );
}

// ─── Filter Pill ──────────────────────────────────────────────────────────────

function FilterPill({ label, active, count, onClick }: { label: string; active: boolean; count?: number; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 px-4 py-2 text-[11px] tracking-[0.15em] uppercase font-bold border transition-colors duration-150 cursor-pointer rounded-md
        ${active ? "bg-chiskop-red border-chiskop-red text-white" : "border-gray-300 text-chiskop-gray hover:border-chiskop-red hover:text-chiskop-black bg-transparent"}`}
    >
      {label}
      {count !== undefined && (
        <span className={`text-[10px] px-1.5 py-0.5 rounded-full min-w-4.5 text-center ${active ? "bg-white/20 text-white" : "bg-chiskop-black/8 text-chiskop-gray"}`}>
          {count}
        </span>
      )}
    </button>
  );
}

// ─── Empty State ──────────────────────────────────────────────────────────────

function EmptyState({ label }: { label: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <div className="w-12 h-12 border border-gray-200 flex items-center justify-center mb-4 rounded-md">
        <svg viewBox="0 0 24 24" fill="none" stroke="#ccc" strokeWidth="1.5" strokeLinecap="round" className="w-5 h-5">
          <path d="M9 17H5a2 2 0 0 0-2 2v1h18v-1a2 2 0 0 0-2-2h-4" /><path d="M12 3v10" /><path d="M8 7l4-4 4 4" />
        </svg>
      </div>
      <p className="text-[13px] font-normal text-gray-400 tracking-wide">{label}</p>
    </div>
  );
}

// ─── Pagination ───────────────────────────────────────────────────────────────

function Pagination({ page, totalPages, onPrev, onNext }: {
  page: number; totalPages: number; onPrev: () => void; onNext: () => void;
}) {
  if (totalPages <= 1) return null;
  return (
    <div className="flex items-center justify-between pt-6 mt-6 border-t border-gray-100">
      <button
        onClick={onPrev}
        disabled={page === 1}
        className="flex items-center gap-2 px-4 py-2 text-[11px] tracking-[0.15em] uppercase font-bold border border-gray-300 text-chiskop-gray hover:border-chiskop-red hover:text-chiskop-red transition-colors disabled:opacity-30 disabled:cursor-not-allowed bg-transparent cursor-pointer rounded-md"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className="w-3.5 h-3.5">
          <path d="M15 18l-6-6 6-6" />
        </svg>
        Prev
      </button>
      <span className="text-[12px] font-normal text-gray-400">
        Page <span className="text-chiskop-black font-bold">{page}</span> of <span className="text-chiskop-black font-bold">{totalPages}</span>
      </span>
      <button
        onClick={onNext}
        disabled={page === totalPages}
        className="flex items-center gap-2 px-4 py-2 text-[11px] tracking-[0.15em] uppercase font-bold border border-gray-300 text-chiskop-gray hover:border-chiskop-red hover:text-chiskop-red transition-colors disabled:opacity-30 disabled:cursor-not-allowed bg-transparent cursor-pointer rounded-md"
      >
        Next
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className="w-3.5 h-3.5">
          <path d="M9 18l6-6-6-6" />
        </svg>
      </button>
    </div>
  );
}

// ─── Reviews Tab ──────────────────────────────────────────────────────────────

const REVIEWS_PER_PAGE = 15;

function ReviewsTab() {
  const [reviews, setReviews]   = useState<Review[]>([]);
  const [loading, setLoading]   = useState(true);
  const [filter, setFilter]     = useState<"all" | "pending" | "approved">("pending");
  const [expanded, setExpanded] = useState<string | null>(null);
  const [counts, setCounts]     = useState({ all: 0, pending: 0, approved: 0 });
  const [page, setPage]         = useState(1);
  const [total, setTotal]       = useState(0);
  const totalPages              = Math.ceil(total / REVIEWS_PER_PAGE);

  const fetchCounts = useCallback(async () => {
    const [{ count: all }, { count: pending }, { count: approved }] = await Promise.all([
      supabase.from("product_reviews").select("*", { count: "exact", head: true }).eq("brand", "chiskop"),
      supabase.from("product_reviews").select("*", { count: "exact", head: true }).eq("brand", "chiskop").eq("approved", false),
      supabase.from("product_reviews").select("*", { count: "exact", head: true }).eq("brand", "chiskop").eq("approved", true),
    ]);
    setCounts({ all: all ?? 0, pending: pending ?? 0, approved: approved ?? 0 });
  }, []);

  const fetchReviews = useCallback(async () => {
    setLoading(true);
    setExpanded(null);
    const from = (page - 1) * REVIEWS_PER_PAGE;
    const to   = from + REVIEWS_PER_PAGE - 1;
    const q = supabase
      .from("product_reviews")
      .select("*", { count: "exact" })
      .eq("brand", "chiskop")
      .order("created_at", { ascending: false })
      .range(from, to);
    if (filter === "pending")  q.eq("approved", false);
    if (filter === "approved") q.eq("approved", true);
    const { data, count } = await q;
    setReviews(data ?? []);
    setTotal(count ?? 0);
    setLoading(false);
  }, [filter, page]);

  useEffect(() => { setPage(1); }, [filter]);
  useEffect(() => { fetchCounts(); fetchReviews(); }, [fetchCounts, fetchReviews]);

  const approve = async (id: string, val: boolean) => {
    await supabase.from("product_reviews").update({ approved: val }).eq("id", id);
    setReviews((prev) => prev.map((r) => r.id === id ? { ...r, approved: val } : r));
    fetchCounts();
  };

  const remove = async (id: string) => {
    await supabase.from("product_reviews").delete().eq("id", id);
    setReviews((prev) => prev.filter((r) => r.id !== id));
    setTotal((t) => t - 1);
    fetchCounts();
  };

  return (
    <div>
      <div className="flex items-center gap-2 mb-7 flex-wrap">
        <FilterPill label="Pending"  active={filter === "pending"}  count={counts.pending}  onClick={() => setFilter("pending")} />
        <FilterPill label="Approved" active={filter === "approved"} count={counts.approved} onClick={() => setFilter("approved")} />
        <FilterPill label="All"      active={filter === "all"}      count={counts.all}      onClick={() => setFilter("all")} />
        <button onClick={() => { fetchCounts(); fetchReviews(); }} className="ml-auto text-[11px] tracking-[0.15em] uppercase font-bold text-gray-400 hover:text-chiskop-red transition-colors bg-transparent border-0 cursor-pointer">
          Refresh
        </button>
      </div>

      {loading ? (
        <div className="py-16 flex justify-center">
          <div className="w-5 h-5 border-2 border-chiskop-red/20 border-t-chiskop-red rounded-full animate-spin" />
        </div>
      ) : reviews.length === 0 ? (
        <EmptyState label={`No ${filter === "all" ? "" : filter + " "}reviews`} />
      ) : (
        <>
          <div className="flex flex-col divide-y divide-gray-100">
            {reviews.map((r) => (
              <div key={r.id} className="py-6">
                <div className="flex items-start gap-5">
                  <div className="shrink-0 flex flex-col items-center gap-1.5 w-12 pt-0.5">
                    <span className="text-[22px] font-bold text-chiskop-black leading-none">{r.rating}</span>
                    <Stars rating={r.rating} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-baseline gap-2 flex-wrap mb-1">
                      <span className="text-[14px] font-bold text-chiskop-black">{r.name}</span>
                      <span className="text-[12px] text-gray-300">·</span>
                      <span className="text-[12px] font-normal text-gray-500 font-mono">{r.productSlug}</span>
                      <span className="text-[12px] text-gray-300">·</span>
                      <span className="text-[12px] font-normal text-gray-400">{formatDate(r.created_at)}</span>
                    </div>
                    <p className="text-[14px] font-bold text-chiskop-black mb-1.5">{r.title}</p>
                    <p className={`text-[13px] font-normal text-chiskop-gray leading-relaxed ${expanded === r.id ? "" : "line-clamp-2"}`}>
                      {r.message}
                    </p>
                    {r.message.length > 120 && (
                      <button onClick={() => setExpanded(expanded === r.id ? null : r.id)}
                        className="text-[11px] tracking-wide text-chiskop-red/60 hover:text-chiskop-red transition-colors mt-1.5 bg-transparent border-0 cursor-pointer underline underline-offset-2">
                        {expanded === r.id ? "Show less" : "Read more"}
                      </button>
                    )}
                    <div className="flex items-center gap-2 mt-2.5">
                      <span className={`text-[10px] tracking-[0.15em] uppercase px-2.5 py-1 font-bold rounded-sm ${r.recommend === "yes" ? "bg-green-50 text-green-700" : "bg-red-50 text-red-500"}`}>
                        {r.recommend === "yes" ? "Recommends" : "Doesn't recommend"}
                      </span>
                      <span className={`text-[10px] tracking-[0.15em] uppercase px-2.5 py-1 font-bold rounded-sm ${r.approved ? "bg-chiskop-red/8 text-chiskop-red" : "bg-amber-50 text-amber-700"}`}>
                        {r.approved ? "Live" : "Pending"}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 shrink-0 pt-0.5">
                    {!r.approved ? (
                      <button onClick={() => approve(r.id, true)}
                        className="px-4 py-2 bg-chiskop-red text-white text-[10px] tracking-[0.15em] uppercase font-bold hover:bg-[#7c1217] transition-colors border-0 cursor-pointer rounded-md">
                        Approve
                      </button>
                    ) : (
                      <button onClick={() => approve(r.id, false)}
                        className="px-4 py-2 border border-gray-300 text-chiskop-gray text-[10px] tracking-[0.15em] uppercase font-bold hover:border-amber-400 hover:text-amber-700 transition-colors bg-transparent cursor-pointer rounded-md">
                        Unpublish
                      </button>
                    )}
                    <button onClick={() => remove(r.id)}
                      className="w-8 h-8 flex items-center justify-center text-gray-300 hover:text-red-500 transition-colors bg-transparent border-0 cursor-pointer">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className="w-4 h-4">
                        <polyline points="3 6 5 6 21 6" /><path d="M19 6l-1 14H6L5 6" /><path d="M10 11v6M14 11v6" /><path d="M9 6V4h6v2" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <Pagination page={page} totalPages={totalPages} onPrev={() => setPage((p) => p - 1)} onNext={() => setPage((p) => p + 1)} />
        </>
      )}
    </div>
  );
}

// ─── Subscriptions Tab ────────────────────────────────────────────────────────

const SUBS_PER_PAGE = 20;

function SubscriptionsTab() {
  const [subs, setSubs]       = useState<Subscription[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter]   = useState<"all" | "email" | "phone">("all");
  const [page, setPage]       = useState(1);
  const [total, setTotal]     = useState(0);
  const totalPages            = Math.ceil(total / SUBS_PER_PAGE);
  const [allSubs, setAllSubs] = useState<Subscription[]>([]);

  const fetchAll = useCallback(async () => {
    const { data } = await supabase
      .from("subscriptions")
      .select("*")
      .eq("brand", "chiskop")
      .order("created_at", { ascending: false });
    setAllSubs(data ?? []);
  }, []);

  const fetchPage = useCallback(async () => {
    setLoading(true);
    const from = (page - 1) * SUBS_PER_PAGE;
    const to   = from + SUBS_PER_PAGE - 1;
    const { data, count } = await supabase
      .from("subscriptions")
      .select("*", { count: "exact" })
      .eq("brand", "chiskop")
      .order("created_at", { ascending: false })
      .range(from, to);
    setSubs(data ?? []);
    setTotal(count ?? 0);
    setLoading(false);
  }, [page]);

  useEffect(() => { setPage(1); }, [filter]);
  useEffect(() => { fetchAll(); fetchPage(); }, [fetchAll, fetchPage]);

  const remove = async (id: string) => {
    await supabase.from("subscriptions").delete().eq("id", id);
    setSubs((prev) => prev.filter((s) => s.id !== id));
    setAllSubs((prev) => prev.filter((s) => s.id !== id));
    setTotal((t) => t - 1);
  };

  const displayed = filter === "all" ? subs : subs.filter((s) => {
    if (filter === "email") return s.email && !s.phone;
    if (filter === "phone") return s.phone && !s.email;
    return true;
  });

  const emailOnly = allSubs.filter((s) => s.email && !s.phone).length;
  const phoneOnly = allSubs.filter((s) => s.phone && !s.email).length;
  const both      = allSubs.filter((s) => s.email && s.phone).length;

  return (
    <div>
      {!loading && allSubs.length > 0 && (
        <div className="grid grid-cols-4 gap-3 mb-7">
          {[
            { label: "Total",      value: allSubs.length },
            { label: "Email only", value: emailOnly      },
            { label: "Phone only", value: phoneOnly      },
            { label: "Both",       value: both           },
          ].map(({ label, value }) => (
            <div key={label} className="border border-gray-200 p-4 text-center rounded-md bg-chiskop-offWhite">
              <p className="text-[30px] font-bold text-chiskop-red leading-none mb-1.5">{value}</p>
              <p className="text-[11px] tracking-[0.15em] uppercase font-bold text-chiskop-gray">{label}</p>
            </div>
          ))}
        </div>
      )}

      <div className="flex items-center gap-2 mb-7 flex-wrap">
        <FilterPill label="All"   active={filter === "all"}   onClick={() => setFilter("all")} />
        <FilterPill label="Email" active={filter === "email"} onClick={() => setFilter("email")} />
        <FilterPill label="Phone" active={filter === "phone"} onClick={() => setFilter("phone")} />
        <button onClick={() => { fetchAll(); fetchPage(); }} className="ml-auto text-[11px] tracking-[0.15em] uppercase font-bold text-gray-400 hover:text-chiskop-red transition-colors bg-transparent border-0 cursor-pointer">
          Refresh
        </button>
      </div>

      {loading ? (
        <div className="py-16 flex justify-center">
          <div className="w-5 h-5 border-2 border-chiskop-red/20 border-t-chiskop-red rounded-full animate-spin" />
        </div>
      ) : displayed.length === 0 ? (
        <EmptyState label="No subscribers yet" />
      ) : (
        <>
          <div className="border border-gray-200 overflow-hidden rounded-md">
            <div className="grid grid-cols-[1fr_1fr_130px_40px] gap-4 px-5 py-3.5 bg-chiskop-offWhite border-b border-gray-200">
              {["Email", "Phone", "Subscribed", ""].map((h) => (
                <p key={h} className="text-[11px] tracking-[0.2em] uppercase font-bold text-chiskop-gray">{h}</p>
              ))}
            </div>
            {displayed.map((s) => (
              <div key={s.id} className="grid grid-cols-[1fr_1fr_130px_40px] gap-4 px-5 py-4 border-b border-gray-100 last:border-0 hover:bg-chiskop-offWhite transition-colors items-center">
                <p className="text-[13px] font-normal text-chiskop-black truncate">{s.email ?? <span className="text-gray-300">—</span>}</p>
                <p className="text-[13px] font-normal text-chiskop-black truncate font-mono">{s.phone ?? <span className="text-gray-300">—</span>}</p>
                <p className="text-[12px] font-normal text-chiskop-gray">{formatDate(s.created_at)}</p>
                <button onClick={() => remove(s.id)}
                  className="w-8 h-8 flex items-center justify-center text-gray-300 hover:text-red-500 transition-colors bg-transparent border-0 cursor-pointer">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className="w-4 h-4">
                    <polyline points="3 6 5 6 21 6" /><path d="M19 6l-1 14H6L5 6" /><path d="M10 11v6M14 11v6" /><path d="M9 6V4h6v2" />
                  </svg>
                </button>
              </div>
            ))}
          </div>
          <Pagination page={page} totalPages={totalPages} onPrev={() => setPage((p) => p - 1)} onNext={() => setPage((p) => p + 1)} />
        </>
      )}
    </div>
  );
}

// ─── Contacts Tab ─────────────────────────────────────────────────────────────

const CONTACTS_PER_PAGE = 15;

function ContactsTab() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading]   = useState(true);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [filter, setFilter]     = useState<"open" | "replied" | "all">("open");
  const [counts, setCounts]     = useState({ open: 0, replied: 0, all: 0 });
  const [page, setPage]         = useState(1);
  const [total, setTotal]       = useState(0);
  const totalPages              = Math.ceil(total / CONTACTS_PER_PAGE);

  const fetchCounts = useCallback(async () => {
    const [{ count: open }, { count: replied }, { count: all }] = await Promise.all([
      supabase.from("contact_submissions").select("*", { count: "exact", head: true }).eq("brand", "chiskop").eq("status", "open"),
      supabase.from("contact_submissions").select("*", { count: "exact", head: true }).eq("brand", "chiskop").eq("status", "replied"),
      supabase.from("contact_submissions").select("*", { count: "exact", head: true }).eq("brand", "chiskop"),
    ]);
    setCounts({ open: open ?? 0, replied: replied ?? 0, all: all ?? 0 });
  }, []);

  const fetchContacts = useCallback(async () => {
    setLoading(true);
    setExpanded(null);
    const from = (page - 1) * CONTACTS_PER_PAGE;
    const to   = from + CONTACTS_PER_PAGE - 1;
    const q = supabase
      .from("contact_submissions")
      .select("*", { count: "exact" })
      .eq("brand", "chiskop")
      .order("created_at", { ascending: false })
      .range(from, to);
    if (filter === "open")    q.eq("status", "open");
    if (filter === "replied") q.eq("status", "replied");
    const { data, count } = await q;
    setContacts((data ?? []) as Contact[]);
    setTotal(count ?? 0);
    setLoading(false);
  }, [filter, page]);

  useEffect(() => { setPage(1); }, [filter]);
  useEffect(() => { fetchCounts(); fetchContacts(); }, [fetchCounts, fetchContacts]);

  const markRead = async (id: string) => {
    await supabase.from("contact_submissions").update({ read: true }).eq("id", id);
    setContacts((prev) => prev.map((c) => c.id === id ? { ...c, read: true } : c));
  };

  const remove = async (id: string) => {
    await supabase.from("contact_submissions").delete().eq("id", id);
    setContacts((prev) => prev.filter((c) => c.id !== id));
    setTotal((t) => t - 1);
    fetchCounts();
  };

  const handleReply = async (contact: Contact) => {
    let ticketId = contact.ticket_id;
    if (!ticketId) {
      ticketId = generateTicketId();
      await supabase
        .from("contact_submissions")
        .update({ ticket_id: ticketId, status: "replied", read: true })
        .eq("id", contact.id);
      setContacts((prev) =>
        prev.map((c) => c.id === contact.id
          ? { ...c, ticket_id: ticketId!, status: "replied", read: true }
          : c
        )
      );
      fetchCounts();
    }
    const subject = encodeURIComponent(`Re: Your Chiskop For Men enquiry [${ticketId}]`);
    const body    = encodeURIComponent(
      `Hi ${contact.name},\n\nThank you for reaching out to Chiskop For Men.\n\n` +
      `─────────────────────────────\n` +
      `Your original message (${ticketId}):\n` +
      `"${contact.message}"\n` +
      `─────────────────────────────\n\n` +
      `[Your reply here]\n\n` +
      `Regards,\nChiskop For Men`
    );
    window.open(`mailto:${contact.email}?subject=${subject}&body=${body}`);
  };

  const toggleExpand = (c: Contact) => {
    if (!c.read) markRead(c.id);
    setExpanded(expanded === c.id ? null : c.id);
  };

  return (
    <div>
      <div className="flex items-center gap-2 mb-7 flex-wrap">
        <FilterPill label="Open"    active={filter === "open"}    count={counts.open}    onClick={() => setFilter("open")} />
        <FilterPill label="Replied" active={filter === "replied"} count={counts.replied} onClick={() => setFilter("replied")} />
        <FilterPill label="All"     active={filter === "all"}     count={counts.all}     onClick={() => setFilter("all")} />
        <button onClick={() => { fetchCounts(); fetchContacts(); }} className="ml-auto text-[11px] tracking-[0.15em] uppercase font-bold text-gray-400 hover:text-chiskop-red transition-colors bg-transparent border-0 cursor-pointer">
          Refresh
        </button>
      </div>

      {loading ? (
        <div className="py-16 flex justify-center">
          <div className="w-5 h-5 border-2 border-chiskop-red/20 border-t-chiskop-red rounded-full animate-spin" />
        </div>
      ) : contacts.length === 0 ? (
        <EmptyState label={filter === "replied" ? "No replied messages" : "No open messages"} />
      ) : (
        <>
          <div className="flex flex-col divide-y divide-gray-100">
            {contacts.map((c) => (
              <div key={c.id} className={`py-5 transition-colors ${c.status === "open" && !c.read ? "bg-red-50/30" : ""}`}>
                <div className="flex items-start gap-4">
                  <div className="w-5 flex items-center justify-center pt-2 shrink-0">
                    {c.status === "open" && !c.read
                      ? <div className="w-2 h-2 rounded-full bg-chiskop-red" />
                      : c.status === "replied"
                      ? <div className="w-2 h-2 rounded-full bg-green-400" />
                      : <div className="w-2 h-2 rounded-full bg-gray-200" />
                    }
                  </div>
                  <div className="flex-1 min-w-0 cursor-pointer" onClick={() => toggleExpand(c)}>
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      <span className={`text-[14px] text-chiskop-black ${!c.read && c.status === "open" ? "font-bold" : "font-normal"}`}>
                        {c.name}
                      </span>
                      <span className="text-[12px] text-gray-300">·</span>
                      <span className="text-[13px] font-normal text-chiskop-gray">{c.email}</span>
                      <span className="text-[12px] text-gray-300">·</span>
                      <span className="text-[12px] font-normal text-gray-400">{formatDate(c.created_at)}</span>
                      {c.ticket_id && (
                        <>
                          <span className="text-[12px] text-gray-300">·</span>
                          <span className="text-[11px] font-mono font-normal text-chiskop-red/60 bg-chiskop-red/5 px-2 py-0.5 rounded">
                            {c.ticket_id}
                          </span>
                        </>
                      )}
                    </div>
                    <p className={`text-[13px] font-normal leading-relaxed ${expanded === c.id ? "text-chiskop-black" : "text-chiskop-gray line-clamp-1"}`}>
                      {c.message}
                    </p>
                  </div>
                  <div className="flex items-center gap-1 shrink-0">
                    <button onClick={() => remove(c.id)}
                      className="w-8 h-8 flex items-center justify-center text-gray-300 hover:text-red-500 transition-colors bg-transparent border-0 cursor-pointer">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className="w-4 h-4">
                        <polyline points="3 6 5 6 21 6" /><path d="M19 6l-1 14H6L5 6" /><path d="M10 11v6M14 11v6" /><path d="M9 6V4h6v2" />
                      </svg>
                    </button>
                  </div>
                </div>
                {expanded === c.id && (
                  <div className="mt-4 ml-9 pl-5 border-l-2 border-chiskop-red/20">
                    <p className="text-[13px] font-normal text-chiskop-black leading-relaxed whitespace-pre-wrap mb-4">
                      {c.message}
                    </p>
                    <div className="flex items-center gap-3 flex-wrap">
                      <button
                        onClick={() => handleReply(c)}
                        className="inline-flex items-center gap-2 px-5 py-2.5 bg-chiskop-red text-white text-[11px] tracking-[0.2em] uppercase font-bold hover:bg-[#7c1217] transition-colors border-0 cursor-pointer rounded-md"
                      >
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className="w-3.5 h-3.5">
                          <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        {c.status === "replied" ? "Reply again" : "Reply via email"}
                      </button>
                      {c.ticket_id ? (
                        <span className="text-[12px] font-normal text-gray-400">
                          Ticket <span className="font-mono text-chiskop-red/60">{c.ticket_id}</span> · marked as replied
                        </span>
                      ) : (
                        <span className="text-[12px] font-normal text-gray-400">
                          A ticket number will be assigned on first reply
                        </span>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
          <Pagination page={page} totalPages={totalPages} onPrev={() => setPage((p) => p - 1)} onNext={() => setPage((p) => p + 1)} />
        </>
      )}
    </div>
  );
}

// ─── Dashboard ────────────────────────────────────────────────────────────────

function Dashboard({ onLogout, onRefresh }: { onLogout: () => void; onRefresh: () => void }) {
  const [tab, setTab]       = useState<Tab>("reviews");
  const [counts, setCounts] = useState({ reviews: 0, subscriptions: 0, contacts: 0 });

  useEffect(() => {
    const loadCounts = async () => {
      const [{ count: r }, { count: s }, { count: c }] = await Promise.all([
        supabase.from("product_reviews").select("*", { count: "exact", head: true }).eq("brand", "chiskop").eq("approved", false),
        supabase.from("subscriptions").select("*", { count: "exact", head: true }).eq("brand", "chiskop"),
        supabase.from("contact_submissions").select("*", { count: "exact", head: true }).eq("brand", "chiskop").eq("status", "open").eq("read", false),
      ]);
      setCounts({ reviews: r ?? 0, subscriptions: s ?? 0, contacts: c ?? 0 });
    };
    loadCounts();
  }, [tab]);

  return (
    <div className="min-h-screen bg-chiskop-offWhite">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-6 md:px-10 flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 bg-chiskop-red flex items-center justify-center shrink-0 rounded-sm">
              <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" className="w-3.5 h-3.5">
                <rect x="3" y="11" width="18" height="11" rx="1" /><path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
            </div>
            <span className="text-[12px] tracking-[0.25em] uppercase font-bold text-chiskop-black">Chiskop Admin</span>
          </div>
          <div className="flex items-center gap-4">
            <button onClick={onRefresh} className="text-[11px] tracking-[0.2em] uppercase font-bold text-gray-400 hover:text-chiskop-red transition-colors bg-transparent border-0 cursor-pointer">
              Refresh
            </button>
            <button onClick={onLogout} className="text-[11px] tracking-[0.2em] uppercase font-bold text-gray-400 hover:text-chiskop-red transition-colors bg-transparent border-0 cursor-pointer">
              Log out
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-6 md:px-10 py-10">
        <div className="flex items-center gap-0 mb-9 border border-gray-200 bg-white w-fit rounded-md overflow-hidden">
          <TabBtn label="Reviews"       active={tab === "reviews"}       count={counts.reviews}       onClick={() => setTab("reviews")} />
          <TabBtn label="Subscriptions" active={tab === "subscriptions"} count={counts.subscriptions} onClick={() => setTab("subscriptions")} />
          <TabBtn label="Contact"       active={tab === "contacts"}      count={counts.contacts}      onClick={() => setTab("contacts")} />
        </div>

        <div className="mb-7">
          <h2 className="text-[26px] font-bold text-chiskop-black uppercase">
            {tab === "reviews" ? "Product Reviews" : tab === "subscriptions" ? "Subscribers" : "Contact Messages"}
          </h2>
          <p className="text-[13px] font-normal text-chiskop-gray mt-1">
            {tab === "reviews"       && "Approve or remove customer reviews before they appear on the site."}
            {tab === "subscriptions" && "Everyone who has subscribed via the website."}
            {tab === "contacts"      && "Messages submitted through the contact form. Click any message to expand, reply, and track it."}
          </p>
        </div>

        <div className="bg-white border border-gray-200 p-6 md:p-8 rounded-md">
          {tab === "reviews"       && <ReviewsTab />}
          {tab === "subscriptions" && <SubscriptionsTab />}
          {tab === "contacts"      && <ContactsTab />}
        </div>
      </div>
    </div>
  );
}

// ─── Root ─────────────────────────────────────────────────────────────────────

export default function AdminPage() {
  const [unlocked, setUnlocked] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
    if (sessionStorage.getItem("chiskop_admin") === "1") setUnlocked(true);
  }, []);

  const unlock = () => {
    sessionStorage.setItem("chiskop_admin", "1");
    setUnlocked(true);
  };

  const logout = () => {
    sessionStorage.removeItem("chiskop_admin");
    setUnlocked(false);
  };

  const [refreshKey, setRefreshKey] = useState(0);
  const onRefresh = () => setRefreshKey((k) => k + 1);

  if (!hydrated) return null;
  if (!unlocked) return <PasswordGate onUnlock={unlock} />;
  return <Dashboard key={refreshKey} onLogout={logout} onRefresh={onRefresh} />;
}