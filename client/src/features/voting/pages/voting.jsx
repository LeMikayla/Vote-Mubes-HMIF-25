"use client";
import { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom"; // ← TAMBAHKAN INI
import { electionService } from "../services/electionService";
import { candidateService } from "../services/candidateService";
import { voteService } from "../services/voteService";
import { useCountdown } from "../../../shared/hooks/useCountdown";
import {
  ConfirmContent,
  SuccessContent,
  LoginWarningContent,
  VotingWarningContent,
} from "../../../shared/components/modal/content";
import { DiamondIcon } from "../components/icons/mergedIcon";

import VotingHeader from "../components/votingHeader";
import CandidateSlider from "../components/candidateSlider";
import VotingFooter from "../components/votingFooter";
import Loader from "../../../shared/components/loader";
import { toast } from "sonner";

function Voting() {
  const location = useLocation(); // ← TAMBAHKAN INI
  
  const [candidates, setCandidates] = useState([]);
  const [deadline, setDeadline] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [modal, setModal] = useState(null);

  const swiperRef = useRef(null);
  const timeLeftObj = useCountdown(deadline);

  const formatTimeText = () => {
    if (!timeLeftObj) return "DITUTUP";
    const { hours, minutes, seconds } = timeLeftObj;
    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  };

  useEffect(() => {
    const initData = async () => {
      try {
        setLoading(true);
        const [candidateData, configData] = await Promise.all([
          candidateService.getAllCandidates(),
          electionService.getConfig(),
        ]);
        setCandidates(candidateData);
        if (configData.endDate) setDeadline(configData.endDate);
      } catch (error) {
        console.error("Gagal memuat data:", error);
        toast.error("Gagal memuat data.");
      } finally {
        setLoading(false);
      }
    };
    initData();
  }, []);

  // ✅ TAMBAHKAN INI - Cek apakah ada warning dari redirect
  useEffect(() => {
    if (location.state?.showWarning) {
      setModal("voting-warning");
      // Clear state setelah ditampilkan
      window.history.replaceState({}, document.title);
    }
  }, [location]);

  const handleVote = async () => {
    const selectedCandidate = candidates[activeIndex];
    if (!selectedCandidate) return;
    setSubmitting(true);
    try {
      await voteService.castVote(selectedCandidate.id);
      setModal("success");
      toast.success("Suara berhasil dicatat!");
    } catch (error) {
      toast.error(error.response?.data?.message || "Gagal mengirim suara.");
      setModal(null);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <Loader />;

  return (
    <>
      <main className="flex-1 flex flex-col items-center justify-center min-h-0">
        <VotingHeader timeLeftText={formatTimeText()} />
        <CandidateSlider
          candidates={candidates}
          setSwiperRef={(swiper) => {
            swiperRef.current = swiper;
          }}
          onSlideChange={setActiveIndex}
        />
        <div className="flex space-x-3 mt-2 shrink-0 z-20">
          {candidates.map((_, idx) => (
            <button
              key={idx}
              onClick={() => swiperRef.current?.slideTo(idx)}
              className="cursor-pointer"
            >
              <DiamondIcon
                filled={idx === activeIndex}
                className={`transition-colors duration-300 ${
                  idx === activeIndex
                    ? "bg-royal-red"
                    : "bg-transparent border-royal-red"
                }`}
              />
            </button>
          ))}
        </div>
      </main>

      <VotingFooter
        isDisabled={!timeLeftObj || submitting}
        isLoading={submitting}
        onVote={() => setModal("confirm")}
      />

      {/* Modal System */}
      {modal && (
        <>
          <div
            className="fixed inset-0 bg-black/30 backdrop-blur-[1px] z-40"
            onClick={() => !submitting && setModal(null)}
          />
          <div className="fixed inset-0 flex items-center justify-center z-50">
            {modal === "confirm" && (
              <ConfirmContent
                candidateName={candidates[activeIndex]?.name}
                onCancel={() => setModal(null)}
                onConfirm={handleVote}
                isLoading={submitting}
              />
            )}
            {modal === "success" && (
              <SuccessContent
                onCancel={() => setModal(null)}
                onConfirm={() => (window.location.href = "/results")}
              />
            )}
            {modal === "login-warning" && (
              <LoginWarningContent onCancel={() => setModal(null)} />
            )}
            {modal === "voting-warning" && (
              <VotingWarningContent onCancel={() => setModal(null)} />
            )}
          </div>
        </>
      )}
    </>
  );
}

export default Voting;