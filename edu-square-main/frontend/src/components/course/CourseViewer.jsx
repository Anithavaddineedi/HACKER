import React, { useState } from 'react';
import { PlayCircle, FileText, CheckCircle2, Award, Download, ArrowLeft } from 'lucide-react';

export const CourseViewer = ({ course, onBack }) => {
  const [activeLecture, setActiveLecture] = useState(course.lectures?.[0] || {
    title: 'Introduction to Course Architecture',
    duration: '24:10',
    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
    pdfUrl: '#'
  });
  const [completedLectures, setCompletedLectures] = useState(['lec_1', 'lec_2', 'lec_201']);
  const [showCertificate, setShowCertificate] = useState(false);

  const toggleLectureCompletion = (id) => {
    if (completedLectures.includes(id)) {
      setCompletedLectures(completedLectures.filter(l => l !== id));
    } else {
      setCompletedLectures([...completedLectures, id]);
    }
  };

  const totalLectures = course.lectures?.length || 4;
  const progressPercent = Math.round((completedLectures.length / totalLectures) * 100);

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Top Controls */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs font-semibold text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Catalog
        </button>

        {progressPercent >= 50 && (
          <button
            onClick={() => setShowCertificate(true)}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl gradient-bg-primary text-white text-xs font-bold shadow-glow-blue hover:opacity-90 transition-opacity"
          >
            <Award className="w-4 h-4" /> Claim Certificate
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left 2 Cols: Video Player & Lecture Notes */}
        <div className="lg:col-span-2 space-y-6">
          {/* Video Player Container */}
          <div className="glass-card rounded-3xl overflow-hidden border border-slate-800 bg-black">
            <div className="aspect-video relative w-full bg-slate-950 flex items-center justify-center">
              <video
                key={activeLecture.id || activeLecture.title}
                controls
                autoPlay={false}
                className="w-full h-full object-cover"
                poster={course.thumbnail}
              >
                <source src={activeLecture.videoUrl || 'https://www.w3schools.com/html/mov_bbb.mp4'} type="video/mp4" />
                Your browser does not support HTML5 video.
              </video>
            </div>

            <div className="p-6">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <span className="text-[10px] font-bold text-blue-400 uppercase tracking-wider bg-blue-500/10 px-2 py-0.5 rounded border border-blue-500/20">
                    Now Playing • {activeLecture.duration}
                  </span>
                  <h2 className="text-lg font-bold text-white mt-1">{activeLecture.title}</h2>
                  <p className="text-xs text-slate-400 mt-1">{course.title} • Instructed by {course.instructorName}</p>
                </div>

                <a
                  href={activeLecture.pdfUrl || '#'}
                  download="Lecture_Notes_EduSphere.pdf"
                  onClick={(e) => { e.preventDefault(); alert('Downloading PDF Lecture Notes...'); }}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 border border-slate-700 flex items-center gap-2 transition-colors"
                >
                  <Download className="w-4 h-4 text-purple-400" />
                  Notes PDF
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Right 1 Col: Lecture Playlist & Syllabus */}
        <div className="space-y-6">
          <div className="glass-card p-6 rounded-3xl border border-slate-800">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-bold text-white">Course Syllabus</h3>
              <span className="text-xs font-bold text-blue-400">{progressPercent}% Progress</span>
            </div>

            <div className="w-full bg-slate-800 h-2 rounded-full mb-6 overflow-hidden">
              <div className="bg-gradient-to-r from-blue-500 to-purple-500 h-full rounded-full transition-all duration-500" style={{ width: `${progressPercent}%` }} />
            </div>

            <div className="space-y-3 max-h-[500px] overflow-y-auto pr-1">
              {course.lectures?.map((lec, idx) => {
                const isSelected = activeLecture.title === lec.title;
                const isDone = completedLectures.includes(lec.id);
                return (
                  <div
                    key={lec.id || idx}
                    onClick={() => setActiveLecture(lec)}
                    className={`p-3.5 rounded-2xl border cursor-pointer transition-all ${
                      isSelected
                        ? 'bg-blue-900/30 border-blue-500/50 shadow-glow-blue'
                        : 'bg-slate-900/60 border-slate-800/80 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-start gap-3">
                        <button
                          onClick={(e) => { e.stopPropagation(); toggleLectureCompletion(lec.id); }}
                          className="mt-0.5 text-slate-500 hover:text-emerald-400 transition-colors"
                        >
                          <CheckCircle2 className={`w-4 h-4 ${isDone ? 'text-emerald-400 fill-emerald-500/20' : ''}`} />
                        </button>
                        <div>
                          <p className={`text-xs font-semibold ${isSelected ? 'text-white' : 'text-slate-300'}`}>
                            {idx + 1}. {lec.title}
                          </p>
                          <span className="text-[10px] text-slate-500 flex items-center gap-1 mt-1">
                            <PlayCircle className="w-3 h-3 text-blue-400" /> {lec.duration}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Certificate Modal */}
      {showCertificate && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="glass-card w-full max-w-2xl p-8 rounded-3xl border border-amber-500/40 shadow-2xl relative animate-in zoom-in-95 text-center bg-gradient-to-b from-slate-900 via-slate-900 to-amber-950/20">
            <button onClick={() => setShowCertificate(false)} className="absolute top-4 right-4 text-slate-400 hover:text-white">✕</button>

            <Award className="w-16 h-16 text-amber-400 mx-auto mb-4 animate-bounce" />
            <h3 className="text-2xl font-black text-white tracking-wider uppercase">Certificate of Completion</h3>
            <p className="text-xs text-amber-400 font-semibold uppercase tracking-widest mt-1">EduSphere AI Learning Platform</p>

            <div className="my-6 py-6 border-y border-amber-500/30">
              <p className="text-xs text-slate-400">This is to certify that</p>
              <h2 className="text-2xl font-bold gradient-text my-2">Alex Johnson</h2>
              <p className="text-xs text-slate-300">has successfully completed all coursework, video lectures, and assessments for</p>
              <h4 className="text-base font-bold text-white mt-2">{course.title} ({course.code})</h4>
            </div>

            <div className="flex items-center justify-between text-xs text-slate-400 px-6">
              <div>
                <p className="font-semibold text-slate-200">Dr. Sarah Vance</p>
                <p className="text-[10px]">Lead Faculty Instructor</p>
              </div>
              <div>
                <p className="font-semibold text-slate-200">2026-07-30</p>
                <p className="text-[10px]">Issue Date</p>
              </div>
            </div>

            <button
              onClick={() => { alert('Certificate downloaded as PDF!'); setShowCertificate(false); }}
              className="mt-6 px-6 py-3 rounded-xl bg-amber-500 text-slate-950 font-bold text-xs shadow-lg hover:bg-amber-400 transition-colors inline-flex items-center gap-2"
            >
              <Download className="w-4 h-4" /> Download Official PDF Certificate
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
