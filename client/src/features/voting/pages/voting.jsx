"use client";
import { useState, useEffect, useRef } from "react";
import { electionService } from "../services/electionService";
import { candidateService } from "../services/candidateService";
import { voteService } from "../services/voteService";
import { useCountdown } from "../../../shared/hooks/useCountdown";
import {
  ConfirmContent,
  SuccessContent,
} from "../../../shared/components/modal/content";
import { DiamondIcon } from "../components/icons/mergedIcon";

// --- IMPORT KOMPONEN BARU ---
import VotingHeader from "../components/votingHeader";
import CandidateSlider from "../components/candidateSlider";
import VotingFooter from "../components/votingFooter";
import Loader from "../../../shared/components/loader";
import { toast } from "sonner";

function Voting() {
  // --- STATE ---
  const [candidates, setCandidates] = useState([]);
  const [deadline, setDeadline] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [modal, setModal] = useState(null);

  // Ref untuk mengontrol slider dari indikator diamond
  const swiperRef = useRef(null);
  const timeLeftObj = useCountdown(deadline);

  // --- LOGIC ---
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
        {/* 1. Header Bersih */}
        <VotingHeader timeLeftText={formatTimeText()} />

        {/* 2. Slider Bersih */}
        <CandidateSlider
          candidates={candidates}
          setSwiperRef={(swiper) => {
            swiperRef.current = swiper;
          }}
          onSlideChange={setActiveIndex}
        />

        {/* 3. Indikator (Bisa dipisah juga, tapi segini okelah biar deket logicnya) */}
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

      {/* 4. Footer Bersih */}
      <VotingFooter
        isDisabled={!timeLeftObj || submitting}
        isLoading={submitting}
        onVote={() => setModal("confirm")}
      />

      {/* Modal System (Tetap disini karena dia overlay global page ini) */}
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
                onConfirm={() => (window.location.href = "/live-count")}
              />
            )}
          </div>
        </>
      )}
    </>
  );
}

export default Voting;
