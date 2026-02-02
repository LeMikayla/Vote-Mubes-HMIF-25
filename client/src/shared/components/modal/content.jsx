"use client";
import { AlertTriangle, Zap } from "lucide-react";
import { useNavigate } from "react-router-dom";

// Import komponen pecahan kita
import Layout from "./layout";
import Button from "./button";

// 1. CONFIRMATION MODAL
export function ConfirmContent({ candidateName, onCancel, onConfirm, isLoading }) {
  return (
    <Layout icon={AlertTriangle}>
      <p className="text-[20px] font-serif text-[#9D1016] leading-snug mb-2.5">
        Apakah Anda yakin memilih
        <br />
        <span className="font-bold uppercase">{candidateName || "Kandidat ini"}</span>?
      </p>

      <div className="flex gap-5.75">
        <Button onClick={onCancel} variant="outline" disabled={isLoading}>
          Batal
        </Button>
        <Button onClick={onConfirm} variant="primary" disabled={isLoading}>
          {isLoading ? "..." : "Pilih"}
        </Button>
      </div>
    </Layout>
  );
}

// 2. SUCCESS MODAL
export function SuccessContent({ onCancel, onConfirm }) {
  const navigate = useNavigate();

  const handleConfirm = () => {
    if (onConfirm) onConfirm();
    navigate("/live-count"); // Default redirect
  };

  return (
    <Layout icon={Zap}>
      <p className="text-[20px] font-serif text-[#9D1016] leading-snug mb-2.5">
        Suara Anda telah dicatat dalam
        <br />
        catatan senat
      </p>

      <div className="flex gap-5.75">
        <Button onClick={onCancel} variant="outline">
          Kembali
        </Button>
        <Button onClick={handleConfirm} variant="primary">
          Live Count
        </Button>
      </div>
    </Layout>
  );
}

// 3. LOGIN WARNING
export function LoginWarningContent({ onCancel }) {
  return (
    <Layout icon={AlertTriangle}>
      <p className="text-[20px] font-serif text-[#9D1016] leading-snug mb-2.5">
        Mohon Login terlebih dahulu
      </p>

      <div className="flex justify-center">
        <Button onClick={onCancel} variant="primary">
          Kembali
        </Button>
      </div>
    </Layout>
  );
}

// 4. VOTING WARNING
export function VotingWarningContent({ onCancel }) {
  return (
    <Layout icon={AlertTriangle}>
      <p className="text-[20px] font-serif text-[#9D1016] leading-snug mb-2.5">
        Mohon Voting terlebih dahulu
      </p>

      <div className="flex justify-center">
        <Button onClick={onCancel} variant="primary">
          Kembali
        </Button>
      </div>
    </Layout>
  );
}